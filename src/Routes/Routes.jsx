import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../pages/Home";
import SearchItems from "../pages/SearchItems";
import AllLaws from "../pages/dashboard/AllLaws";
import AddLaws from "../pages/dashboard/AddLaws";
import ManageLaws from "../pages/dashboard/ManageLaws";
import Category from "../pages/dashboard/Category";
import ParentCategory from "../pages/dashboard/ParentCategory";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: "/search",
          element: <SearchItems></SearchItems>,
        }
      ]
    },
    {
      path: "/dashboard",
      element: <DashboardLayout/>,
      children: [
        {
            path: "/dashboard",
            element: <AllLaws/>
        },
        {
            path: "/dashboard/addlaws",
            element: <AddLaws/>
        },
        {
            path: "/dashboard/managelaws",
            element: <ManageLaws/>
        },
        {
            path: "/dashboard/category",
            element: <Category/>
        },
        {
            path: "/dashboard/category/parent/:grandId",
            element: <ParentCategory/>
        },
      ]
    }
  ]);