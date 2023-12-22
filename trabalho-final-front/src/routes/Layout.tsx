import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import React from "react";

function Layout() {
  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <Outlet />
      </div>
    </>
  );
}
export default Layout;
