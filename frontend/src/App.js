import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmailVerification from "./pages/EmailVerification";
import PageNotFound from "./pages/PageNotFound";
import JobsListing from "./pages/JobsListing/JobsListing";
import Home from "./pages/Home/Home";
import JobDescription from "./pages/JobDescription/JobDescription";
import AdminDashboard from "./pages/admin/Dashboard/Dashboard";

import DashboardComponent from "./components/admin/Dashboard/Dashboard";
import Profile from "./components/admin/Profile/Profile";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/jobslisting" element={<JobsListing />} />
        <Route exact path="/jobdescription" element={<JobDescription />} />
        <Route exact path="/admin" element={<AdminDashboard />} >
          <Route path="dashboard" element={<DashboardComponent />} />
          <Route path="viewprofile" element={<Profile />} />
        </Route>
        <Route
          exact
          path="/email-verification"
          element={<EmailVerification />}
        />
        <Route
          exact
          path="/forget-pass"
          element={<ForgetPassword />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
