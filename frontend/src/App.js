import JobsListing from './pages/JobsListing/JobsListing'
import JobDescription from './pages/JobDescription/JobDescription'
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/jobslisting" element={<JobsListing />} />
        <Route exact path="/jobdescription" element={<JobDescription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
