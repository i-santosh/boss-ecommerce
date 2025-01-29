import React, { useState } from "react";
import '../css/cart.css'

const Cart = () => {



  return (
    <>
      <div className="App">
        <div className="cartcontainer">
          <div className="image-field">
            <img src="assets\background\emptycart.png" alt="Empty Cart" />
          </div>
          <p>Your cart is currently empty.</p>
          <p>Add what you love !!</p>
          <button className="button" onClick={() => { tohome() }}>Shop Now</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
