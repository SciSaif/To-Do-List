import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";

function Header({ text }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const isMounted = useRef(true);

  const auth = getAuth();

  useEffect(() => {
    if (isMounted) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          setUser(user);
          setUsername(user.displayName);
        } else setUser(null);
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted, auth]);
  const navigate = useNavigate();

  const onLogout = () => {
    try {
      auth.signOut();
      setUser(null);
      console.log("logged out");
    } catch (error) {
      console.log("ooop oh no", error);
    }
    // navigate("/");
  };

  return (
    // <div className="navbar mb-12 shadow-lg flex  bg-[#1c1b2498]">
    //   <h2 className="text-3xl">
    //     <a href="/">{text}</a>
    //   </h2>
    // </div>

    <nav className="bg-[#1c1b2498] shadow-lg">
      <div className=" mx-2  py-3">
        <div className="flex justify-between items-center ">
          <div className="ml-2 text-3xl">To Do List</div>
          <div className="items-center hidden md:flex">
            {user === null ? (
              <>
                <Link to="/sign-in" className="pl-3 btn btn-sm btn-ghost">
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="pl-3  ml-2 btn btn-sm btn-outline  btn-primary"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link to="/" className="pl-3 btn btn-sm btn-ghost">
                Logout
              </Link>
            )}

            <div className="ml-4 profilePic cursor-pointer">
              <FaRegUserCircle size="35px" />
            </div>
          </div>

          {/* mobile menu */}
          <div className="md:hidden">
            <div className="dropdown dropdown-end ">
              <div
                tabIndex="0"
                className="profilePic cursor-pointer rounded-full flex items-center"
              >
                <div className="usernameDiv mr-3">{user ? username : ""}</div>
                <FaRegUserCircle size="35px" />
              </div>
              <ul
                tabIndex="0"
                className="p-3 shadow menu dropdown-content bg-base-100 rounded-box w-52"
              >
                {user === null ? (
                  <>
                    <li className="mb-2">
                      <Link to="/sign-in" className="btn  btn-ghost">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/sign-up"
                        className="btn  btn-outline  btn-primary"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="">
                    <button className="btn  btn-ghost" onClick={onLogout}>
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
