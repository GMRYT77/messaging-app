import { auth, db } from "@/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import {
  MdKeyboardArrowDown,
  MdCall,
  MdOutlineEmojiEmotions,
  MdVideoCall,
} from "react-icons/md";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import getRecipientEmail from "@/utils/getRecipientEmail";
import ReactTimeago from "react-timeago";
import moment from "moment/moment";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const router = useRouter();
  const endMsgRef = useRef(null);
  console.log(chat, JSON.parse(messages));
  const recipientEmail = getRecipientEmail(chat.users, user);

  const [messageSnapshot, loading] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", recipientEmail)
  );

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastseen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      user: user.email,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    endMsgRef.current.scrollIntoView({
      behavior: "instant",
      block: "end",
    });
  };

  const showRecipientInfoTab = () => {
    const RCTab = document.getElementById("RECIPIENT_INFO_TAB");
    RCTab.classList.remove("hidden");
    RCTab.classList.add("flex");
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  return (
    <div className="relative flex flex-col w-full max-h-[100dvh] bg-blue-200/20">
      <div
        id="CHAT_BAR"
        className="relative flex w-full max-h-[60px] h-full justify-between bg-white px-4 py-2 z-[130] shadow-[#a1a1a1]/60 shadow-b-sm"
      >
        <div className="flex gap-3 items-center">
          <div className="relative rounded-full overflow-hidden">
            <Image
              src={recipient ? recipient.photoURL : "/avatar.png"}
              width={38}
              height={38}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <span className="text-md outfit font-bold tracking-wide text-[#333]">
              {recipient ? recipient.displayName : recipientEmail}
            </span>
            <span className="text-sm text-[#a1a1a1] roboto tracking-wide">
              {recipient?.lastseen?.toDate() ? (
                <>
                  Last Active:{" "}
                  <TimeAgo datetime={recipient?.lastseen?.toDate()} />
                </>
              ) : (
                "Unavailable"
              )}
            </span>
          </div>
        </div>
        <div className="w-fit flex py-1 items-center gap-1 text-[#333]/80">
          <span className="text-2xl px-3 py-2 hover:bg-neutral-300/40 cursor-pointer">
            <MdCall />
          </span>
          <span
            onClick={showRecipientInfoTab}
            className="text-2xl px-3 py-2 hover:bg-neutral-300/40 cursor-pointer"
          >
            <MdKeyboardArrowDown />
          </span>
        </div>
      </div>
      <div className="relative  flex-1 flex-col overflow-auto scroll-hidden px-6 py-3 gap-4 z-30">
        {messageSnapshot?.docs?.length === 0 ? (
          <div className="">No chat</div>
        ) : messageSnapshot ? (
          messageSnapshot.docs.map((message) => {
            return (
              <Message
                key={message.id}
                message={message.data()}
                user={message.data().user}
              />
            );
          })
        ) : (
          JSON.parse(messages).map((e, i) => {
            return (
              <div
                key={i}
                className={`${
                  e.user === user.email ? "items-end" : ""
                } flex relative w-full flex-col mt-2`}
              >
                <div
                  className={`${
                    e.user === user.email
                      ? "bg-blue-500  text-right"
                      : "bg-green-500"
                  } flex max-w-[80%] w-fit p-2 rounded-md text-white text-lg outfit flex-col`}
                >
                  {e.message}
                </div>
                <div className="w-fit text-sm">
                  {e.timestamp ? moment(e.timestamp).format("LT") : "..."}
                </div>
              </div>
            );
          })
        )}
        <div id="REF" className="relative h-[70px]" ref={endMsgRef}></div>
      </div>
      <form
        i="CHAT_MSG"
        className="relative max-h-[68px] h-full  w-full flex py-3 px-4 gap-4 bg-white z-[100] items-center"
      >
        <MdOutlineEmojiEmotions className="text-xl cursor-pointer" />
        <input
          type="text"
          name="msg"
          id="MSG"
          placeholder="Message ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-3 text-lg py-2 outfit outline-none bg-neutral-300/50"
        />
        <button
          disabled={!input}
          type="submit"
          onClick={sendMessage}
          value="Submit"
          className="px-6 h-full rounded-md bg-blue-500/70 hover:bg-blue-700 text-sm roboto tracking-wider text-white"
        >
          Submit
        </button>
      </form>
      {/* <div className="absolute top-0 left-0 overflow-hidden w-full h-full z-10 opacity-60">
        <Image
          src="/low-poly-grid-haikei.svg"
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </div> */}
    </div>
  );
};

export default ChatScreen;
