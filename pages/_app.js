import { auth, db } from "@/firebase";
import "@/styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        {
          merge: true,
        }
      );
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}
