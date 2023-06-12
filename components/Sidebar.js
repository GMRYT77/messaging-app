import { CiMenuKebab } from "react-icons/ci";
import { MdNotifications } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import Search from "./Search";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./Chat";
import Image from "next/image";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot, loading] = useCollection(userChatRef);

  return (
    <div className="w-full  max-w-sm flex flex-col bg-white drop-shadow-md h-[100dvh] px-3 ">
      <div className="flex justify-between items-center py-3 border-b-[.8px] border-b-[#a1a1a1]/60">
        <div className="outfit font-bold text-xl tracking-wide ">Chats</div>

        <div className="flex gap-2 text-[#a1a1a1]">
          <MdNotifications className="text-xl cursor-pointer hover:text-[#333]" />
          <CiMenuKebab className="text-lg cursor-pointer hover:text-[#333]" />
        </div>
      </div>
      <Search />
      <div className="w-full h-[.8px] bg-[#a1a1a1]/60 my-2"></div>
      {/* Chats */}
      <div className="flex flex-col py-3 overflow-scroll scroll-hidden">
        {loading ? (
          <Loading />
        ) : (
          chatSnapshot?.docs.map((chat) => {
            return (
              <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            );
          })
        )}
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <>
      <div className="flex gap-2 w-full py-3 items-center bg-neutral-200 rounded px-3 cursor-pointer mb-2 animate-pulse">
        <div className="relative w-[32px] aspect-square rounded-full overflow-hidden  bg-neutral-300"></div>
        <div className="w-3/5 bg-neutral-300 h-[24px] rounded-full"></div>
      </div>
      <div className="flex gap-2 w-full py-3 items-center bg-neutral-200 rounded px-3 cursor-pointer mb-2 animate-pulse delay-200">
        <div className="relative w-[32px] aspect-square rounded-full overflow-hidden bg-neutral-300"></div>
        <div className="w-3/5 bg-neutral-300 h-[24px] rounded-full"></div>
      </div>
      <div className="flex gap-2 w-full py-3 items-center bg-neutral-200 rounded px-3 cursor-pointer mb-2 animate-pulse">
        <div className="relative w-[32px] aspect-square rounded-full overflow-hidden bg-neutral-300"></div>
        <div className="w-3/5 bg-neutral-300 h-[24px] rounded-full"></div>
      </div>
      <div className="flex gap-2 w-full py-3 items-center bg-neutral-200 rounded px-3 cursor-pointer mb-2 animate-pulse">
        <div className="relative w-[32px] aspect-square rounded-full overflow-hidden bg-neutral-300"></div>
        <div className="w-3/5 bg-neutral-300 h-[24px] rounded-full"></div>
      </div>
      <div className="flex gap-2 w-full py-3 items-center bg-neutral-200 rounded px-3 cursor-pointer mb-2 animate-pulse">
        <div className="relative w-[32px] aspect-square rounded-full overflow-hidden bg-neutral-300"></div>
        <div className="w-3/5 bg-neutral-300 h-[24px] rounded-full"></div>
      </div>
      <div className="flex gap-2 w-full py-3 items-center bg-neutral-200 rounded px-3 cursor-pointer mb-2 animate-pulse">
        <div className="relative w-[32px] aspect-square rounded-full overflow-hidden bg-neutral-300"></div>
        <div className="w-3/5 bg-neutral-300 h-[24px] rounded-full"></div>
      </div>
    </>
  );
};

export default Sidebar;
