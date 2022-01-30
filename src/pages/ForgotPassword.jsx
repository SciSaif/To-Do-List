import React from "react";
import { useState, useEffect, useContext } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import TodosContext from "../context/TodosContext";
import { AiOutlineLogin } from "react-icons/ai";
import { RiRotateLockFill } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      //toast
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <main className="container flex flex-col items-center rounded-3xl shadow-lg w-fit min-w-[350px]  m-auto p-10  mt-10 ">
        <RiRotateLockFill size="70px" />
        <p className="my-2 text-4xl text">Forgot Password</p>
        <form className="form-control w-full" onSubmit={onSubmit}>
          <label className="label mt-3">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="input input-secondary input-bordered emailInput"
            value={email}
            onChange={onChange}
          />

          <button type="submit" className="btn btn-sm btn-primary mt-4 w-full">
            Send Reset Link
          </button>
        </form>
      </main>

      <div className="container flex flex-col items-center shadow-lg w-full mt-10 p-3">
        <Link to="/sign-in" className="underline text-primary">
          Sign in
        </Link>
      </div>
    </>
  );
}

export default ForgotPassword;
