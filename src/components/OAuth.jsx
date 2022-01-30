import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      //if user doesn't exist create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          username: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        const newTodo = {
          userRef: user.uid,
          todos: [],
        };

        //adding newTodo to database
        await setDoc(doc(db, "userData", user.uid), newTodo);
      }

      navigate("/");
    } catch (error) {
      toast.error("Oh no! Couldn't authenticate with Google :(", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div
      className="flex items-center my-4  w-[220px] justify-around cursor-pointer border border-slate-500/50 py-1 px-3 "
      onClick={onGoogleClick}
    >
      <FcGoogle size="35px" />
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with Google</p>
    </div>
  );
}

export default OAuth;
