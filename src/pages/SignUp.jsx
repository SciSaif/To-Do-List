import React from "react";
import { useState, useContext } from "react";
import TodosContext from "../context/TodosContext";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import OAuth from "../components/OAuth";
import Spinner from "../components/assets/Spinner";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = formData;
  const { signUp, loading } = useContext(TodosContext);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, username);
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
            className="input input-secondary input-bordered usernameInput"
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

export default SignUp;
