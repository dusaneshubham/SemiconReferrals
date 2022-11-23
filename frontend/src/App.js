import JobsListing from './pages/JobsListing/JobsListing';
import Home from './pages/Home/Home';
import JobDescription from './pages/JobDescription/JobDescription';
import AdminDashboard from './pages/admin/Dashboard/Dashboard';
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/jobslisting" element={<JobsListing />} />
        <Route exact path="/jobdescription" element={<JobDescription />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
