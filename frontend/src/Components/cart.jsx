import { useState } from 'react'
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react'
import useCartStore from '../../store/cart'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const totalItems = useCartStore((state) => state.totalItems)
  const totalPrice = useCartStore((state) => state.totalPrice)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Format price with INR currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  if (items.length === 0) {
    return (
      <div className="relative">
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)} 
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Cart toggle button */}
      <button 
        onClick={() => setIsCartOpen(!isCartOpen)} 
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative"
      >
        <ShoppingCart size={20} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart dropdown */}
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Your Cart ({totalItems})</h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto p-4 space-y-4">
            {items.map((item) => (
              <div key={item.product_id} className="flex space-x-3 border-b border-gray-100 pb-3">
                {/* Product image */}
                {item.product?.images && item.product.images.length > 0 && (
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                
                <div className="flex-1">
                  <h4 className="font-medium text-sm">
                    {item.product?.name || `Product ID: ${item.product_id}`}
                  </h4>
                  
                  {item.product?.price && (
                    <p className="text-gray-700 text-sm">
                      {formatPrice(item.product.price)} × {item.quantity}
                    </p>
                  )}
                  
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="mx-2 text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus size={14} />
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.product_id)}
                      className="ml-auto p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between font-semibold mb-3">
              <span>Total:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            
            <div className="space-y-2">
              <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                Checkout
              </button>
              <button 
                onClick={clearCart}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
