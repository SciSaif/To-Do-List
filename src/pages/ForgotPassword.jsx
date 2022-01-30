import React from "react";
import { useState, useContext } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import TodosContext from "../context/TodosContext";
import { RiRotateLockFill, RiMailCheckLine } from "react-icons/ri";
import Spinner from "../components/assets/Spinner";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const { loading, setLoading } = useContext(TodosContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      setEmailSent(true);
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
      {emailSent === false ? (
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

              <button
                type="submit"
                className="btn btn-sm btn-primary mt-4 w-full"
              >
                Send Reset Link
              </button>
            </form>
          </main>

          <div className="container flex flex-col items-center shadow-lg w-full mt-10 p-3">
            <Link to="/sign-in" className="underline text-primary">
              Sign In
            </Link>
          </div>
        </>
      ) : (
        <main className="container flex flex-col items-center rounded-3xl shadow-lg w-fit min-w-[350px]  m-auto p-9  mt-10 ">
          <RiMailCheckLine size="70px" />
          <p className="my-2 mb-4 text-4xl text">Check your Mail</p>
          <p> We have sent password reset instructions to : </p>
          <p> {email}</p>
          <Link to="/sign-in" className="btn btn-sm btn-primary mt-4 w-full">
            Back to Sign-In
          </Link>
        </main>
      )}

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

export default ForgotPassword;
