import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmailVerification from "./pages/EmailVerification";
import PageNotFound from "./pages/PageNotFound";
import JobsListing from "./pages/JobsListing/JobsListing";
import Home from "./pages/Home/Home";
import JobDescription from "./pages/JobDescription/JobDescription";

import AdminDashboard from "./pages/admin/Dashboard/Dashboard";
import AdminDashboardComponent from "./components/admin/Dashboard/Dashboard";
import PendingApplications from "./components/admin/PendingApplications/PendingApplications";
import PendingPost from "./components/admin/PendingPost/PendingPost";

import CandidateDashboard from "./pages/candidate/Dashboard/Dashboard";
import CandidateDashboardComponent from "./components/candidate/Dashboard/Dashboard";
import CandidateProfile from "./pages/candidate/Profile/Profile";
import CandidateUpdateProfile from "./components/candidate/UpdateProfile/UpdateProfile";
import CandidateResumes from "./components/candidate/MyResumes/MyResumes";
import CandidateAppliedJobs from "./components/candidate/AppliedJobs/AppliedJobs";
import CandidateSavedJobs from "./components/candidate/SavedJobs/SavedJobs";
import CandidateFollowedEmployers from "./components/candidate/FollowedEmployers/FollowedEmployers";
import ForgetPassword from "./pages/ForgetPassword";

import EmployerDashboard from "./pages/employer/Dashboard/Dashboard";
import EmployerDashboardComponent from "./components/employer/Dashboard/Dashboard";
import EmployerSavedCandidates from "./components/employer/SavedCandidates/SavedCandidates";
import EmployerFollowers from "./components/employer/Followers/Followers";
import JobPost from "./components/employer/JobPost/JobPost";
import EmployerUpdateProfile from "./components/employer/UpdateProfile/UpdateProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/jobslisting" element={<JobsListing />} />
        <Route exact path="/jobdescription" element={<JobDescription />} />

        <Route exact path="/admin" element={<AdminDashboard />}>
          <Route path="" element={<AdminDashboardComponent />} />
          <Route path="dashboard" element={<AdminDashboardComponent />} />
          <Route path="pendingapplications" element={<PendingApplications />} />
          <Route path="pendingpost" element={<PendingPost />} />
        </Route>

        <Route exact path="/candidate/profile" element={<CandidateProfile />} />
        <Route exact path="/candidate" element={<CandidateDashboard />}>
          <Route path="" element={<CandidateDashboardComponent />} />
          <Route path="dashboard" element={<CandidateDashboardComponent />} />
          {/* <Route path="viewprofile" element={<CandidateProfile />} /> */}
          <Route path="updateprofile" element={<CandidateUpdateProfile />} />
          <Route path="myresumes" element={<CandidateResumes />} />
          <Route path="appliedjobs" element={<CandidateAppliedJobs />} />
          <Route path="savedjobs" element={<CandidateSavedJobs />} />
          <Route
            path="followedemployers"
            element={<CandidateFollowedEmployers />}
          />
        </Route>

        <Route exact path="/employer" element={<EmployerDashboard />}>
          <Route path="" element={<EmployerDashboardComponent />} />
          <Route path="dashboard" element={<EmployerDashboardComponent />} />
          <Route path="jobpost" element={<JobPost />} />
          <Route path="savedcandidates" element={<EmployerSavedCandidates />} />
          <Route path="updateprofile" element={<EmployerUpdateProfile />} />
          <Route path="followers" element={<EmployerFollowers />} />
        </Route>

        <Route
          exact
          path="/email-verification"
          element={<EmailVerification />}
        />
        <Route exact path="/forget-pass" element={<ForgetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
