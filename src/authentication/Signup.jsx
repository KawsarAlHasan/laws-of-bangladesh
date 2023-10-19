import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase.config";

function Signup() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const navigate = useNavigate();

  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (even) => {
    even.preventDefault();
    const email = even.target.email.value;
    const password = even.target.password.value;
    createUserWithEmailAndPassword(email, password);
    saveUser(email);
  };

  const saveUser = (email) => {
    const user = { email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  if (user) {
    navigate(from, { replace: true });
  }

  return (
    <div>
      <div className=" flex justify-center items-center">
        <div className="w-96 p-7">
          <h2 className="text-xl text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter Your Name"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="6 digit longer must"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            {loading ? (
              <button className="btn btn-secondary cursor-not-allowed  w-full mt-3">
                Loading..
              </button>
            ) : (
              <input
                className="btn btn-secondary w-full mt-3"
                type="submit"
                value="SIGNUP"
              />
            )}
          </form>

          {error && <p className="text-red-600">{error.message}</p>}
          <p className="mt-4">
            Already have an account?
            <Link to="/login" className="text-primary">
              Please Login
            </Link>
          </p>
          <div className="divider">OR</div>
          <button className="btn btn-outline w-full">
            CONTINUE WITH GOOLE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
