import { auth, db } from "@/firebase";
import getRecipientEmail from "@/utils/getRecipientEmail";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <div
      onClick={enterChat}
      className="relative chatBoxSidebar flex gap-2 w-full py-3 items-center hover:bg-neutral-200/70 px-3 cursor-pointer "
    >
      <div className="relative w-[32px] aspect-square rounded-full overflow-hidden">
        {recipient ? (
          <Image
            src={recipient.photoURL}
            layout="fill"
            objectFit="cover"
            alt=""
          />
        ) : (
          <Image src="/avatar.png" layout="fill" objectFit="cover" alt="" />
        )}
      </div>
      <div className="">
        {recipient ? recipient.displayName : recipientEmail}
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-1 p-1 rounded-full hover:bg-neutral-200/60 z-20">
        <MdOutlineArrowDropDown className="text-2xl text-[#7a7a7a] " />
      </div>
    </div>
  );
};

export default Chat;
