import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import Applications from "./pages/applications";
import PKE from "./pages/pke";
import ProfileManager from "./pages/profileManager";
import Policies from "./pages/policies";

const DashboardRoute = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/premiumKnowledgeExchange" element={<PKE />} />
          <Route path="/manager" element={<ProfileManager />} />
          <Route path="/policies" element={<Policies />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default DashboardRoute;
