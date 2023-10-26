import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/signin";
import DashboardRoute from "./DashboardRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/*" element={<DashboardRoute />} />
      </Routes>
    </>
  );
}

export default App;
