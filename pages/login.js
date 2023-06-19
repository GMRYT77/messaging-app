import { auth, provider } from "@/firebase";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { FaGoogle } from "react-icons/fa";
const Login = () => {
  const signin = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <div className="w-[100dvw] h-[100dvh] flex justify-center items-center ">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col relative w-full max-w-sm aspect-auto py-10 px-6 gap-4 drop-shadow rounded-md bg-white/90">
        <div className="relative w-[20%] aspect-square mx-auto mb-12">
          <Image
            src="/favicon (1).svg"
            layout="fill"
            objectFit="cover"
            alt="Favicon"
          />
        </div>
        <button
          className="outline-none flex gap-2 items-center justify-center bg-blue-600/80 rounded-md py-3 text-lg text-[#f4f4f4] sarabun"
          onClick={signin}
        >
          <FaGoogle className="text-lg" />
          Sign in with google
        </button>
      </div>
      <div className="absolute w-[100dvw] h-[100dvh] top-0 left-0 modern-gradient -z-10 ">
        {/* <Image
          src="/blob-scene-haikei.svg"
          layout="fill"
          objectFit="cover"
          alt=""
        /> */}
      </div>
    </div>
  );
};

export default Login;
