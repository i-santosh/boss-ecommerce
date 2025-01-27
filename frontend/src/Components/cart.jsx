import React, { useState } from "react";
import '../css/cart.css'
const products = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 150 },
  { id: 3, name: "Product C", price: 200 },
];

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to calculate the total price
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="app">
      <h1>Shopping Cart</h1>

      <h2>Products</h2>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <span>{product.name} - ${product.price}</span>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <img src="assets\background\emptycart.png" alt="Empty Cart" />
          <p>Your cart is empty!</p>
          <button className="shop-now-btn" onClick={() => alert("Redirect to Shop Page")}>
            Shop Now
          </button>
        </div>
      ) : (
        <div className="cart">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>
                {item.name} - ${item.price} x {item.quantity} = $
                {item.price * item.quantity}
              </span>
            </div>
          ))}
          <h3>Total: ${getTotalPrice()}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
