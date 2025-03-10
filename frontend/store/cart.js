import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Interface for cart items
// {
//   product_id: number;
//   quantity: number;
//   product?: any; // Optional full product data
// }

const useCartStore = create(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      
      // Get total number of items in cart
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      // Get total price of items in cart (if product data is available)
      get totalPrice() {
        return get().items.reduce((total, item) => {
          if (item.product) {
            return total + (item.product.price * item.quantity)
          }
          return total
        }, 0)
      },

      // Add items to cart
      addToCart: (orderItems) => set((state) => {
        // Create a copy of the current items
        const updatedItems = [...state.items]
        
        // Process each order item
        orderItems.forEach((orderItem) => {
          const { product_id, quantity, product } = orderItem
          
          // Check if the product already exists in the cart
          const existingItemIndex = updatedItems.findIndex(
            (item) => item.product_id === product_id
          )
          
          if (existingItemIndex !== -1) {
            // Update existing item quantity
            updatedItems[existingItemIndex].quantity += quantity
            
            // Update product data if provided
            if (product && !updatedItems[existingItemIndex].product) {
              updatedItems[existingItemIndex].product = product
            }
          } else {
            // Add new item to cart
            updatedItems.push({
              product_id,
              quantity,
              product: product || null, // Store product data if available
            })
          }
        })
        
        return { items: updatedItems }
      }),
      
      // Remove item from cart
      removeFromCart: (product_id) => set((state) => ({
        items: state.items.filter((item) => item.product_id !== product_id)
      })),
      
      // Update item quantity
      updateQuantity: (product_id, quantity) => set((state) => {
        // If quantity is 0 or negative, remove the item
        if (quantity <= 0) {
          return {
            items: state.items.filter((item) => item.product_id !== product_id)
          }
        }
        
        // Otherwise update the quantity
        return {
          items: state.items.map((item) => 
            item.product_id === product_id 
              ? { ...item, quantity } 
              : item
          )
        }
      }),
      
      // Clear cart
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // Name for localStorage
      skipHydration: false, // Enable hydration
    }
  )
)

export default useCartStore 