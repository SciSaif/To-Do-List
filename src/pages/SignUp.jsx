import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { AiOutlineLogin } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FiUser } from "react-icons/fi";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      console.log("user: ", user);
      updateProfile(auth.currentUser, {
        displayName: username,
      });

      //create a copy of formdata so that we can modify it and put in db
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      //adding user to database in collection "users"
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      const newTodo = {
        userRef: user.uid,
        todos: [],
      };

      //adding newTodo to database
      await setDoc(doc(db, "userData", user.uid), newTodo);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="container flex flex-col items-center rounded-3xl shadow-lg w-fit min-w-[350px]  m-auto p-10  mt-10 ">
        <FiUser size="70px" />
        <p className="my-2 text-4xl text">Sign Up</p>
        <form className="form-control w-full" onSubmit={onSubmit}>
          <label className="label mt-3">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            className="input input-secondary input-bordered"
            value={username}
            onChange={onChange}
          />
          <label className="label mt-3">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input input-secondary input-bordered"
            value={email}
            onChange={onChange}
          />

          <label className="label mt-2">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-secondary input-bordered"
            value={password}
            onChange={onChange}
          />

          <button type="submit" className="btn btn-sm btn-primary mt-4 w-full">
            Sign up
          </button>
        </form>
      </main>

      <div className="container flex flex-col items-center shadow-lg w-full mt-10 p-3">
        <p>
          Already have an account?{" "}
          <Link to="/sign-in" className="underline text-primary">
            Log in
          </Link>
        </p>
        <div className="flex items-center my-4  w-[220px] justify-around cursor-pointer border border-slate-500/50 py-1 px-3 ">
          <FcGoogle size="35px" />
          <p>Sign up with Google</p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
