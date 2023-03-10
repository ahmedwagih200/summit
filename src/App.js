import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route ,useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hoodies from './components/Hoodies';
import Home from './components/Home';
import About from './components/About';
import ProductPage from './components/ProductPage';
import './components/HomeStyle.css';

function App() {
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  return (
    <div className={"header"+location} style={{height: '100vh'}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ProductPage" element={<ProductPage />} />
          <Route path="/Hoodies" element={<Hoodies />} />
          <Route path="/About" element={<About />} />
        </Routes>
    </div>
  );
}
export default App;
