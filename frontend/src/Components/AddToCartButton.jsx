import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import useCartStore from '../../store/cart'
import { toast } from 'react-fox-toast'

export default function AddToCartButton({ product, quantity = 1 }) {
  const [loading, setLoading] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)
  
  const handleAddToCart = () => {
    if (!product) return;
    
    setLoading(true)
    
    try {
      // Create order item array (similar to the format in product-detail.jsx)
      const orderItem = [
        {
          product_id: product.id,
          quantity: quantity,
          product: product, // Include the full product data for price calculations
        }
      ]
      
      // Add to cart using our Zustand store
      addToCart(orderItem)
      
      // Show success message
      toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart`)
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add to cart')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={handleAddToCart}
      className="relative cursor-pointer h-12 sm:h-14 bg-white! hover:bg-pink-50! text-rose-600! border border-pink-200! hover:border-pink-300! rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-200 group"
      aria-label="Add to cart"
    >
      {loading ? (
        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-rose-600!"></span>
      ) : (
        <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
      )}
      <span>Add to Cart</span>
    </div>
  )
} 