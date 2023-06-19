import { auth } from "@/firebase";
import moment from "moment";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message, user }) => {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMsg = user === userLoggedIn?.email;

  function checkDateisValid(date) {
    return date instanceof Date && !isNaN(date);
  }

  return (
    <div
      className={`${
        TypeOfMsg ? "items-end" : "pl-[30px]"
      } flex relative w-full flex-col mt-2`}
    >
      <div
        className={`${
          TypeOfMsg ? "bg-blue-500  text-right" : "bg-green-500"
        } max-w-[80%] w-fit py-2 px-3 rounded-md text-white text-lg roboto tracking-wide flex-col text-left`}
      >
        {message.message}
      </div>
      <div className="w-fit text-sm">
        {checkDateisValid(new Date(message?.timestamp?.seconds * 1000))
          ? moment(new Date(message?.timestamp?.seconds * 1000)).format("LT")
          : "..."}
      </div>
      {!TypeOfMsg ? (
        <div className="absolute top-2 -left-1 w-[28px] h-[28px]  bg-gray-400 overflow-hidden rounded-full">
          <Image
            src={message?.photoURL}
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>
      ) : (
        ""
      )}
    </div>

    // <div className={`${TypeOfMsg}`}>{user.message.message}</div>
    // <div className={`${TypeOfMsg ? "text-right " : "text-left "} text-white`}>
    //   <span
    //     className={`${
    //       TypeOfMsg ? "bg-green-500/80" : "bg-blue-500"
    //     } max-w-[80%]`}
    //   >
    //     {message.message}
    //   </span>
    // </div>
  );
};

export default Message;
