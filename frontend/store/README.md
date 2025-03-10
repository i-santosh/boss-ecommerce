# Cart Store with Zustand

This directory contains Zustand stores for managing global application state. Below is a guide on how to use the cart store.

## Cart Store

The cart store is implemented using Zustand with the persist middleware to maintain cart state across page refreshes.

### Usage

```jsx
import useCartStore from '../store/cart';

function MyComponent() {
  // Access cart state
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  
  // Access cart actions
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  
  // Add items to cart
  const handleAddToCart = (product) => {
    const orderItem = [
      {
        product_id: product.id,
        quantity: 1,
        product: product, // Optional: Include full product data
      }
    ];
    
    addToCart(orderItem);
  };
  
  return (
    <div>
      <p>Total items in cart: {totalItems}</p>
      <p>Total price: {totalPrice}</p>
      {/* Rest of your component */}
    </div>
  );
}
```

### Available Methods

- `addToCart(orderItems)`: Add an array of order items to the cart
- `removeFromCart(product_id)`: Remove an item from the cart by product ID
- `updateQuantity(product_id, quantity)`: Update the quantity of an item
- `clearCart()`: Clear all items from the cart

### Order Item Structure

Order items should follow this structure:

```js
{
  product_id: number,     // Required: ID of the product
  quantity: number,       // Required: Quantity to add
  product: object         // Optional: Full product data object
}
```

### Computed Values

- `totalItems`: Total number of items in the cart
- `totalPrice`: Total price of all items in the cart (requires product data with price) 