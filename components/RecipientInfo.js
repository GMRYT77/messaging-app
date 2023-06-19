import { auth, db } from "@/firebase";
import getRecipientEmail from "@/utils/getRecipientEmail";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { RxCross1 } from "react-icons/rx";

const RecipientInfo = ({ chat }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const recipientEmail = getRecipientEmail(chat.users, user);
  const [recipientSnapshot] = useCollection(
    db.collection("users")?.where("email", "==", recipientEmail)
  );
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(userChatRef);

  let chatArray = [];
  useEffect(() => {
    chatSnapshot?.docs.map((chat) => {
      chatArray.push(chat.id);
      console.log(chatArray);
    });
  });

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const isRecipientExists = !!recipient;

  const hideRecipientInfoTab = () => {
    const RCTab = document.getElementById("RECIPIENT_INFO_TAB");
    RCTab.classList.remove("flex");
    RCTab.classList.add("hidden");
  };

  const DeleteRecipient = () => {
    if (window.confirm("Are you sure you want to delete this recipient?")) {
      db.collection("chats").doc(chat.id).delete();
      chatArray.filter((e) => e !== chat.id);
      console.log(chatArray);
      if (chatArray.length > 0) {
        router.push(`/chat/${chatArray[0]}`);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div
      id="RECIPIENT_INFO_TAB"
      className="w-2/5 h-[100dvh] bg-white hidden flex-col "
    >
      <div className="h-[60px] flex w-full px-4 justify-between items-center border-b-[.6px] border-b-[#a1a1a1]/40 border-l-[.6px] border-l-[#a1a1a1]/40">
        <span className="text-[#333] sarabun font-semibold">Recient Info</span>
        <RxCross1
          onClick={hideRecipientInfoTab}
          className="text-[#333] text-lg cursor-pointer "
        />
      </div>
      <div className="flex-grow bg-neutral-200/70 flex flex-col items-center p-3 gap-2">
        <div className="relative w-1/4 aspect-square rounded-full overflow-hidden">
          <Image
            src={isRecipientExists ? recipient.photoURL : "/avatar.png"}
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>
        <div className="flex flex-col pb-2 w-full items-center border-b-[.4px] border-b-[#a1a1a1]/30">
          <span className="outfit text-lg">
            {isRecipientExists ? recipient.displayName : "Anonymous"}
          </span>
          <span className="outfit text-sm text-[#a1a1a1]">
            {recipientEmail}
          </span>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <span className="text-[#333] sarabun font-semibold">Bio</span>
          <span className="text-[#333]/70 text-sm oufit">
            {recipient?.bio ? recipient.bio : "No Bio ..."}
          </span>
        </div>
      </div>
      <div className="">ddd</div>
      <div className="h-[68px] flex w-full px-4 justify-between border-t-[.6px] border-t-[#a1a1a1]/40 py-3 gap-3">
        <button className="flex-1 text-center py-2  rounded-lg border-blue-500 border-2 text-blue-500 outfit font-semibold tracking-wide">
          Block
        </button>
        <button
          onClick={DeleteRecipient}
          className="flex-1 text-center py-2  rounded-lg border-red-500 border-2 text-red-500 outfit font-semibold tracking-wide"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipientInfo;
