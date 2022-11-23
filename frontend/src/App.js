import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmailVerification from './pages/EmailVerification';
import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/email-verification" element={<EmailVerification />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
