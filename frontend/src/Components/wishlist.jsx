import React from 'react';
import '../css/wishlist.css'
import { useNavigate } from 'react-router-dom';

function Wishlist(props) {

  const navigate = useNavigate();

  const tohome = () => {
    navigate('/')
  }



  return (
    <>

      <div className="App">
        <div className="cartcontainer">
          <div className="image-field">
            <img src="assets\background\emptycart.png" alt="Empty Cart" />
          </div>
          <p>Your wishlist is currently empty.</p>
          <p>Add what you love !!</p>
          <button className="button" onClick={() => { tohome() }}>Shop Now</button>
        </div>
      </div>









    </>
  );
}

export default Wishlist;