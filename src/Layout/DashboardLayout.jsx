import React from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import auth from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import useAdmin from "../hooks/useAdmin";

function DashboardLayout() {
  const [user] = useAuthState(auth);

  const [isAdmin] = useAdmin(user?.email);

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <li>
              <Link to="/dashboard">Profile</Link>
            </li>

            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/allusers">All Users</Link>
                </li>
                <li>
                  <Link to="/dashboard/managelaws">Manage Laws</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/" onClick={handleSignOut}>
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
