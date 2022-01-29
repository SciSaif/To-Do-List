import React from "react";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="container justify-center rounded-3xl shadow-lg w-100 md-w-75 lg:w-1/2 xl:w-1/3 m-auto p-2 mt-10">
        <p className="mb-2 text-4xl text">Sign In</p>
        <form className="form-control" onSubmit={onSubmit}>
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
            Sign In
          </button>
        </form>
      </main>
    </>
  );
}

export default SignIn;
