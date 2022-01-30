import React from "react";
import { useState, useEffect, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import TodosContext from "../context/TodosContext";
import { AiOutlineLogin } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { setLoading } = useContext(TodosContext);

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
      setLoading(true);
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);

      if (userCredentials.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
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

          <Link to="/forgot-password" className="mt-2 mx-auto">
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
        {/* <div className="flex items-center my-4  w-[200px] justify-around cursor-pointer border border-slate-500/50 py-1 px-3 ">
          <FcGoogle size="35px" />
          <p>Sign in with Google</p>
        </div> */}
        <OAuth />
      </div>
    </>
  );
}

export default SignIn;
