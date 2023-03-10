import logo from "./Photos/Logo.png";
import { Link } from "react-router-dom"
import Chip from '@mui/material/Chip';
import './Links.css';

function Navbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container">
                    <Link to='/Home' class="navbar-brand">
                        <img style={{ backgroundColor: 'transparent' }} src={logo} height="100" width='140' alt="Summit" />
                    </Link>
                    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="navbar-nav"></div>
                        <div class="navbar-nav ms-auto">
                            <Link to="/Home" class="nav-item nav-link link"><Chip label= "Home"/></Link>
                            <Link to="/Hoodies" class="nav-item nav-link link"> <Chip label= "Hoodies"/></Link>
                            <Link to="/About" class="nav-item nav-link link"><Chip label= "About"/></Link>
                            
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
export default Navbar;
