import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
