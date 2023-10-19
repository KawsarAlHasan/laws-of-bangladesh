import React, { useState } from "react";
import LOB from "../assets/laws-of-bangladesh.png";
import auth from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar({ onSearch }) {
  const [user] = useAuthState(auth);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const search = (
    <form className="form-control" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInput}
        placeholder="Search law..."
        className="input input-bordered input-sm w-full  pl-6 max-w-xs md:w-auto"
      />
    </form>
  );

  const navItems = (
    <>
      <li>
        <a href="/">HOME</a>
      </li>
      <li>
        <a href="/allLaws">LAWS OF BD</a>
      </li>

      <li>
        <a href="/contact">CONTACT</a>
      </li>
      {user ? (
        <li>
          <a href="/dashboard">DASHBOARD</a>
        </li>
      ) : (
        <li>
          <a href="/login">LOGIN</a>
        </li>
      )}
    </>
  );

  return (
    <div className="">
      <div className="navbar bg-base-200 ">
        <div className="navbar-start md:ms-16">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <a href="/" className="">
            <img className="w-12" src={LOB} alt="" />
          </a>
        </div>

        <div className="">{search}</div>

        <div className="navbar-end md:me-16">
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
