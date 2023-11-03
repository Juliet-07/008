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
import CounterfeitNoteReport from "./pages/bankingServices/counterfeitNoteReport";
import IdeaHub from "./pages/ideaHub/landingPage";
import Description from "./pages/ideaHub/description";

const DashboardRoute = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route
            path="/applications/DudChequeTeller"
            element={<DudChequeTeller />}
          />
          <Route path="/applications/DudChequeForm" element={<RequestForm />} />
          <Route
            path="/applications/DudChequeApprover"
            element={<DudChequeApprover />}
          />
          <Route
            path="/applications/DudChequeReviewer"
            element={<Reviewer />}
          />
          <Route
            path="/applications/counterfeitNoteTeller"
            element={<CounterfeitNoteTeller />}
          />
          <Route
            path="/applications/counterfeitNoteApprover"
            element={<CounterfeitApprover />}
          />
          <Route
            path="/applications/counterfeitNoteReport"
            element={<CounterfeitNoteReport />}
          />
          <Route path="/applications/ideaHub" element={<IdeaHub />} />
          <Route path="/applications/ideaDescription" element={<Description />} />
          <Route path="/premiumKnowledgeExchange" element={<PKE />} />
          <Route path="/manager" element={<ProfileManager />} />
          <Route path="/policies" element={<Policies />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default DashboardRoute;
