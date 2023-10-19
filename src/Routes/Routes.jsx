import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../pages/Home";
import SearchItems from "../pages/SearchItems";
import ManageLaws from "../pages/dashboard/ManageLaws";
import Category from "../pages/dashboard/Category";
import ParentCategory from "../pages/dashboard/ParentCategory";
import ChildCategory from "../pages/dashboard/ChildCategory";
import ParentLaws from "../components/ParentLaws";
import SectionsLaws from "../components/SectionsLaws";
import FullLaws from "../pages/FullLaws";
import Contact from "../pages/Contact";
import IndexOfLaw from "../pages/IndexOfLaw";
import Profile from "../pages/dashboard/Profile";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";
import PrivateRoute from "./PrivateRoute";
import AllUser from "../pages/dashboard/AllUser";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/search",
        element: <SearchItems></SearchItems>,
      },
      {
        path: "/parent/:grandId",
        element: <ParentLaws />,
      },
      {
        path: "/parent/:grandId/child/:parentId",
        element: <SectionsLaws />,
      },
      {
        path: "/parent/:grandId/child/:parentId/fullLaw",
        element: <FullLaws />,
      },
      {
        path: "/allLaws",
        element: <IndexOfLaw />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allusers",
        element: (
          <PrivateRoute>
            <AllUser />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/managelaws",
        element: (
          <AdminRoute>
            <Category />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/managelaws/parent/:grandId",
        element: (
          <AdminRoute>
            <ParentCategory />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/managelaws/parent/:grandId/child/:parentId",
        element: (
          <AdminRoute>
            <ChildCategory />
          </AdminRoute>
        ),
      },
    ],
  },
]);
