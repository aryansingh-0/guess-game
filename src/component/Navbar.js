import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const Logout = () => {
    setIsLoggedIn(localStorage.removeItem("login"));
    setUsername(localStorage.removeItem("user"));
    localStorage.removeItem("login");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("score");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("login"));
    setUsername(localStorage.getItem("user"));
  }, []);

  return (
    <div className="w-full z-10 fixed top-0 right-0 h-[10vh] flex items-center justify-center">
      <nav className="w-[80vw] h-[90%] rounded-md shadow-md bg-slate-500 flex justify-between items-center px-4">
        <div className="text-white font-mono font-bold ">Guess the Number</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/signup" className="text-white">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center justify-between w-[45vw]">
              <div className="text-white capitalize ">Welcome, {username}</div>

              <div
                onClick={Logout}
                className="logout hover:text-[#fe8080] duration-75 cursor-pointer  text-white font-semibold "
              >
                LogOut
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
