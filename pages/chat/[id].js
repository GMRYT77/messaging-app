import ChatScreen from "@/components/ChatScreen";
import Navbar from "@/components/Navbar";
import RecipientInfo from "@/components/RecipientInfo";
import Sidebar from "@/components/Sidebar";
import { auth, db } from "@/firebase";
import getRecipientEmail from "@/utils/getRecipientEmail";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatTab = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  return (
    <main className="flex max-w-screen-2xl mx-auto">
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Navbar />
      <Sidebar />
      <ChatScreen chat={chat} messages={messages} />
      <RecipientInfo chat={chat} />
    </main>
  );
};

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
  //Prep the MSG
  const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //Prep the chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

export default ChatTab;
