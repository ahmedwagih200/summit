import './HomeStyle.css';
import { Link } from "react-router-dom"

import Fab from '@mui/material/Fab';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

function Home() {
    return (
        <div >
            <div class="btn">
                <Fab variant="extended">
                    
                    <Link to="/Hoodies" class="nav-item nav-link link"><LocalGroceryStoreIcon sx={{ mr: 1 }} />Shop Now</Link>
                </Fab>
            </div>
        </div>
    );
}

export default Home;
