import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/Navbar";

const DashboardRoute = () => {
  return (
    <div>
      {/* <Layout> */}
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* </Layout> */}
    </div>
  );
};

export default DashboardRoute;
