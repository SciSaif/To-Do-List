import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaBars, FaAngleRight } from "react-icons/fa";
import { useState, useEffect, useRef, useContext } from "react";
import { getAuth } from "firebase/auth";
import TodosContext from "../context/TodosContext";

function Header({ text }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const { logout } = useContext(TodosContext);

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

  const drawerRef = useRef(null);

  const openDrawer = (e) => {
    drawerRef.current.classList.remove("hidden");
  };

  const closeDrawer = (e) => {
    drawerRef.current.classList.add("hidden");
  };

  const onLogout = () => {
    closeDrawer();
    logout();
  };

  return (
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
              <Link
                to="/"
                className="pl-3 btn btn-sm btn-ghost"
                onClick={onLogout}
              >
                Logout
              </Link>
            )}

            <div
              className="ml-4 profilePic cursor-pointer"
              onClick={openDrawer}
            >
              <FaBars size="25px" />
            </div>
          </div>

          {/* mobile menu */}
          <div
            className="md:hidden mobile-menu-bar cursor-pointer"
            onClick={openDrawer}
          >
            <div>
              <FaBars size="25px" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="hidden absolute top-0 right-0 w-full h-full bg-black/50 z-10"
        ref={drawerRef}
      >
        <div
          className="absolute top-0 left-0 w-1/2 h-full "
          onClick={closeDrawer}
        ></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1c1b2498]/100 z-10 p-2">
          <div
            className="mt-2 ml-2 rounded-full bg-black/25 w-fit p-2 cursor-pointer"
            onClick={closeDrawer}
          >
            <FaAngleRight size="30px" />
          </div>
          <div className="flex flex-col mt-12">
            {user === null ? (
              <>
                <Link
                  to="/sign-in"
                  className="btn btn-ghost mt-5 mb-2"
                  onClick={closeDrawer}
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="btn  btn-outline  btn-accent"
                  onClick={closeDrawer}
                >
                  Sign-Up
                </Link>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center">
                {user ? (
                  <>
                    <FaRegUserCircle size="70px" />
                    <p className="mt-2 text-3xl">{username}</p>
                  </>
                ) : (
                  ""
                )}
                <Link
                  to="/"
                  className="btn btn-outline mt-10"
                  onClick={onLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
