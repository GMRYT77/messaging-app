import { auth, provider } from "@/firebase";
import Image from "next/image";
import React from "react";

const Login = () => {
  const signin = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <div className="w-[100dvw] h-[100dvh] flex justify-center items-center ">
      <div className="flex flex-col relative w-full max-w-sm aspect-auto p-6 bg-white drop-shadow rounded-md">
        <div className="relative w-[20%] aspect-square mx-auto mb-12">
          <Image
            src="/favicon (1).svg"
            layout="fill"
            objectFit="cover"
            alt="Favicon"
          />
        </div>
        <button onClick={signin}>Sign in with google</button>
      </div>
    </div>
  );
};

export default Login;
