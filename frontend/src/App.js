import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/Footer';
// import Login from './components/Login/Login';

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
