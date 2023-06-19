import { auth, db, storage } from "@/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { RiPencilFill } from "react-icons/ri";

const ProfilePage = () => {
  const [user] = useAuthState(auth);

  const [CurrSnapshot] = useCollection(
    db.collection("users")?.where("email", "==", user.email)
  );
  const currUser = CurrSnapshot?.docs?.[0]?.data();

  const uploadCoverImage = () => {
    const file = document.getElementById("coverImage").files[0];
    const metadata = {
      contentType: file.type,
    };
    const stBar = document.getElementById("st-bar");
    const storageRef = ref(storage, "CoverImages/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        stBar.innerText =
          "Upload is " + progress.toString().slice(0, 5) + "% done";
        // setTimeout(() => {
        //   stBar.innerText = """;
        // }, 5000);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
        if (currUser?.CImgName && currUser.CImgName != file.name) {
          const desertRef = ref(storage, `CoverImages/${currUser.CImgName}`);
          deleteObject(desertRef)
            .then(() => {
              // File deleted successfully
              console.log(`Deleted ${currUser.CImgName} Successfully`);
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
              console.log(error);
            });
        }
        stBar.innerText = "Uploaded";
        setTimeout(() => {
          stBar.innerText = "";
        }, 10000);
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          // ...

          case "storage/unknown":
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          db.collection("users").doc(user.uid).update(
            {
              coverImageURL: downloadURL,
              CImgName: file.name,
            },
            {
              merge: true,
            }
          );
        });
      }
    );
  };

  return (
    <div
      id="PROFILE_COMPO"
      className="absolute top-0 right-0 z-[102] w-full flex flex-col h-[100dvh] bg-[#eeeeee] hidden"
    >
      <div className="w-full h-[186px] absolute top-0 left-0 bg-neutral-800 flex items-center group">
        <Image
          src={
            !currUser?.coverImageURL
              ? "/blob-scene-haikei.svg"
              : currUser.coverImageURL
          }
          objectFit="cover"
          layout="fill"
          alt=""
          className="bg-neutral-700 group-hover:opacity-70 cursor-pointer"
        />
        <form className="absolute flex justify-start flex-row-reverse gap-4 bottom-4 right-5 z-[105] text-white text-xl cursor-pointer">
          <label
            htmlFor="coverImage"
            className="cursor-pointer flex items-end py-1"
          >
            <RiPencilFill />
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            className="hidden"
            onChange={uploadCoverImage}
          />
          <span id="st-bar" className="text-[.8rem] text-neutral-100 "></span>
        </form>
      </div>
      <div className="w-full flex h-[60px] mb-[30px] bg-transparent text-white z-20 px-4 items-center">
        <span className="text-lg outfit tracking-wide  font-semibold">
          Profile
        </span>
      </div>
      <div className="flex gap-6 px-4 py-6 justify-center ">
        <div className="w-[110px] aspect-square relative overflow-hidden rounded-full border-[4px] border-[#eee]">
          <Image src={user.photoURL} objectFit="cover" layout="fill" alt="" />
        </div>
      </div>
      <div className="">save</div>
    </div>
  );
};

export default ProfilePage;
