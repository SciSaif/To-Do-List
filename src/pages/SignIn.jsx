import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import TodosContext from "../context/TodosContext";
import { AiOutlineLogin } from "react-icons/ai";
import OAuth from "../components/OAuth";
import Spinner from "../components/assets/Spinner";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { signIn, loading } = useContext(TodosContext);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <>
      <main className="container flex flex-col items-center rounded-3xl shadow-lg w-fit min-w-[350px]  m-auto p-10  mt-10 ">
        <AiOutlineLogin size="70px" />
        <p className="my-2 text-4xl text">Sign In</p>
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

          <label className="label mt-2">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-secondary input-bordered passwordInput"
            value={password}
            onChange={onChange}
          />

          <button type="submit" className="btn btn-sm btn-primary mt-4 w-full">
            Sign In
          </button>

          <Link to="/forgot-password" className="mt-3 mx-auto">
            Forgot Password
          </Link>
        </form>
      </main>

      <div className="container flex flex-col items-center shadow-lg w-full mt-10 p-3">
        <p>
          Don't have an account?{" "}
          <Link to="/sign-up" className="underline text-primary">
            Sign up
          </Link>
        </p>
        <OAuth />
      </div>
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default SignIn;
