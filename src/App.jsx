import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/signin";
import DashboardRoute from "./DashboardRoute";
import Compliance from "./pages/pnd/pndCompliance/home";
import AllPND from "./pages/pnd/pndCompliance/allPND";
import LiftedPND from "./pages/pnd/pndCompliance/liftedPND";
import BulkPND from "./pages/pnd/pndCompliance/bulkPND";
import UserManager from "./pages/pnd/pndCompliance/userManager";
import NewUser from "./pages/pnd/pndCompliance/addNewUser";
import Profile from "./pages/pnd/pndCompliance/profile";


function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/pndCompliance" element={<Compliance />} />
        <Route path="/allPND" element={<AllPND />} />
        <Route path="/liftedPND" element={<LiftedPND />} />
        <Route path="/bulkPND" element={<BulkPND />} />
        <Route path="/userManager" element={<UserManager />} />
        <Route path="/userManager/newUser" element={<NewUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<DashboardRoute />} />
      </Routes>
    </>
  );
}

export default App;
