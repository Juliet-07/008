import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard";
import Applications from "./pages/applications";
import PKE from "./pages/pke"

const DashboardRoute = () => {
  return (
    <div>
      <Layout>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/premiumKnowledgeExchange" element={<PKE />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default DashboardRoute;
