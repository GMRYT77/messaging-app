import { auth, db } from "@/firebase";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { BiMessageAltDetail } from "react-icons/bi";
import * as EmailValidator from "email-validator";
import "firebase/compat/firestore";

function Search() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("Email");

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // we need to add chats in the db
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  return (
    <>
      <div className="w-full py-3">
        <input
          type="text"
          placeholder="Search"
          name="Search"
          id="SEARCH"
          className="w-full py-1 text-sm px-2 rounded border-[2px] border-neutral-400/50 outline-none focus:border-neutral-400"
        />
      </div>
      <button
        onClick={createChat}
        className="w-fit px-5 py-2 flex gap-2 bg-blue-500/70 hover:bg-blue-500 text-white rounded-md items-center mb-1 "
      >
        <BiMessageAltDetail className="text-2xl" />
        <span className="outfit tracking-wide text-md">Start New Chat</span>
      </button>
    </>
  );
}

export default Search;
