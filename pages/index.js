import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user] = useAuthState(auth);
  if (!user) return <Loading />;
  return (
    <main className="flex max-w-screen-2xl mx-auto">
      <Head>
        <title>ChatApp</title>
      </Head>
      <Navbar />
      <Sidebar />
    </main>
  );
}
