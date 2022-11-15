import Navbar from './components/Navbar/NavbarComponent';
import { BrowserRouter as Router } from 'react-router-dom';
// import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
