import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase.config";

function Login() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const location = useLocation();

  let from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = (even) => {
    even.preventDefault();
    const email = even.target.email.value;
    const password = even.target.password.value;
    console.log(email, password);
    signInWithEmailAndPassword(email, password);
  };

  if (user) {
    navigate(from, { replace: true });
  }
  return (
    <div>
      <div className=" flex justify-center items-center">
        <div className="w-96 p-7">
          <h2 className="text-xl text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
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
                placeholder="Enter Your Password"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                <span className="label-text">Forget Password?</span>
              </label>
            </div>

            {loading ? (
              <button className="btn btn-secondary cursor-not-allowed  w-full mt-3">
                Loading..
              </button>
            ) : (
              <input
                className="btn btn-secondary w-full"
                type="submit"
                value="LOGIN"
              />
            )}
          </form>
          {error && <p className="text-red-600">{error.message}</p>}
          <p>
            New to Laws of BD
            <Link to="/signup" className="text-primary">
              Create new Account
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

export default Login;
