import { auth } from "@/firebase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { TbMessageCircle2 } from "react-icons/tb";
import { MdGroups2, MdCall } from "react-icons/md";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const logOut = () => {
    router.push("/");
    auth.signOut();
  };

  const showProfile = () => {
    let p = document.getElementById("PROFILE_COMPO");
    p.classList.toggle("hidden");
  };
  return (
    <div className="relative max-w-[84px] w-full flex flex-col gap-3 items-center p-2 bg-white">
      <Link href="/" className="relative w-full aspect-square mb-4">
        <Image
          src="/favicon (1).svg"
          layout="fill"
          objectFit="cover"
          alt="Favicon"
        />
      </Link>
      <div className="flex flex-col gap-3 px-2 text-2xl text-[#a1a1a1]">
        <div
          className={`p-3 rounded-lg cursor-pointer  ${
            router.route.split("/")[1] === "chat"
              ? "bg-blue-400/80 text-white"
              : ""
          }`}
        >
          <TbMessageCircle2 />
        </div>
        <div
          className={`p-3 rounded-lg cursor-pointer  ${
            router.route.split("/")[1] === "group"
              ? "bg-blue-400/80 text-white"
              : "hover:bg-neutral-300/70"
          }`}
        >
          <MdGroups2 />
        </div>
        <div
          className={`p-3 rounded-lg cursor-pointer  ${
            router.route.split("/")[1] === "call"
              ? "bg-blue-400/80 text-white"
              : "hover:bg-neutral-300/70"
          }`}
        >
          <MdCall />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white z-[100] flex flex-col gap-3 px-4 pb-3">
        <div className="">
          <input type="checkbox" name="vhs" id="kss" />
        </div>
        <div
          onClick={showProfile}
          className="relative w-full aspect-square group rounded-full overflow-hidden"
        >
          <Image
            src={user.photoURL}
            layout="fill"
            objectFit="cover"
            alt="Favicon"
          />
        </div>
        <div className=" absolute left-full bottom-4 min-w-[200px]">
          <div className="bg-white drop-shadow-lg flex flex-col bottom-0 z-[120] border-[.6px] border-neutral-400/40 rounded-md p-4 w-full">
            <button onClick={logOut}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
