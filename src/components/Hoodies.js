import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom"
import Fab from '@mui/material/Fab';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Chip from '@mui/material/Chip';
import './hoodis.css';
import './Links.css';

function Hoodies() {

  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "Products");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);

  return (
    <div class="container text-center mt-5">
      <div>
      <h3 class="font" >
              <Chip label= "Winter Hoodies"/></h3>  
      </div>

      <div class="d-flex flex-row justify-content-center mb-5">
        {products.map((product) => (
          <div class="card m-2 " style={{ width: '350px', height: '450px' }}>
            <Link to="/ProductPage" state={{ data: product }} >
              <img class="card-img-top h-100" src={product.photo} alt="Card image cap" />
            </Link>
            <div>
              <p class="card-text" style={{ fontFamily: "fantasy", color: 'gray' , margin: '5px'}}>
              <Chip label= {product.name}/></p>  
              <p class="card-text" style={{ fontFamily: "fantasy" }}>
                <Chip label= {product.price } /></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Hoodies;
