import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import Applications from "./pages/applications";
import PKE from "./pages/pke";
import ProfileManager from "./pages/profileManager";
import Policies from "./pages/policies";
import DudChequeTeller from "./pages/bankingServices/dudChequeTeller";
import RequestForm from "./pages/bankingServices/dudChequeForm";
import DudChequeApprover from "./pages/bankingServices/dudChequeApprover";
import Reviewer from "./pages/bankingServices/reviewHome";
import CounterfeitNoteTeller from "./pages/bankingServices/counterfeitNoteTeller";
import CounterfeitApprover from "./pages/bankingServices/counterfeitNoteApprover";
// import CounterfeitNoteReport from "./pages/bankingServices/counterfeitNoteReport";

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
          <Route path="/DudChequeTeller" element={<DudChequeTeller />} />
          <Route path="/DudChequeForm" element={<RequestForm />} />
          <Route path="/DudChequeApprover" element={<DudChequeApprover />} />
          {/* <Route path="/bankingServices/reviewer-page" element={<Reviewer />} /> */}
          <Route
            path="/counterfeitNoteTeller"
            element={<CounterfeitNoteTeller />}
          />
          <Route
            path="/counterfeitNoteApprover"
            element={<CounterfeitApprover />}
          />
          {/* <Route
            path="/counterfeitNoteReport"
            element={<CounterfeitNoteReport />}
          /> */}
        </Routes>
      </Layout>
    </div>
  );
};

export default DashboardRoute;
