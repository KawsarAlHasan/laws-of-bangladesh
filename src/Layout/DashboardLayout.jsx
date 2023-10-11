import React from 'react'
import Navbar from '../components/Navbar'
import { Link, Outlet } from 'react-router-dom'
import Footer from "../components/Footer"

function DashboardLayout() {
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
              <Link to="/dashboard">All Laws</Link>
            </li>
                <li>
                  <Link to="/dashboard/addlaws">Add Laws</Link>
                  <Link to="/dashboard/managelaws">Manage Laws</Link>
                  <Link to="/dashboard/category">Category</Link>
                  <Link to="/dashboard">Log Out</Link>
                </li>
          </ul>
        </div>
      </div>
        <Footer />
    </div>
  )
}

export default DashboardLayout