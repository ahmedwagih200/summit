import Fab from '@mui/material/Fab';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


function About() {
    const FaceBook = 'https://www.facebook.com/summit.egyp'
    const Instagram = 'https://www.instagram.com/summit.eg'
    return (
        <div >
            <div style={{marginLeft: '30%'}} class='about'>
             <p style={{fontFamily: 'cursive' , fontSize:"20px"}}>
             We are a new egyptian brand trying to reach the summit of fashion <br/> provided with a new level of creativity, designs and quality<br/> and that what keeps us going. 
                </p>  
            </div>
            <div class="btn">
                <a style={{ textDecoration: 'none', margin: '12px' }} target='_blank' href={FaceBook}><Fab variant="extended">
                    <div class="nav-item nav-link link"><FacebookIcon sx={{ mr: 1 }} />FaceBook</div>
                </Fab></a>

                <a style={{ textDecoration: 'none' }} target='_blank' href={Instagram}><Fab variant="extended">
                    <div class="nav-item nav-link link"><InstagramIcon sx={{ mr: 1 }} />Instagram</div>
                </Fab></a>
            </div>
        </div>
    );
}

export default About;
