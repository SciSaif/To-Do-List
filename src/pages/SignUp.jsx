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
      <main className="container justify-center rounded-3xl shadow-lg w-100 md-w-75 lg:w-1/2 xl:w-1/3 m-auto p-2 mt-10">
        <p className="mb-2 text-4xl text">Sign Up</p>
        <form className="form-control" onSubmit={onSubmit}>
          <label className="label">
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
          <label className="label">
            <span className="label-text-alt">Please enter data</span>
          </label>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="input input-secondary input-bordered"
            value={email}
            onChange={onChange}
          />
          <label className="label">
            <span className="label-text-alt">Please enter data</span>
          </label>

          <label className="label">
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
          <label className="label">
            <span className="label-text-alt">Please enter data</span>
          </label>

          <button
            type="submit"
            className="btn btn-primary mt-2 w-fit pl-5 pr-5"
          >
            Sign Up
          </button>
        </form>
      </main>
    </>
  );
}

export default SignUp;
