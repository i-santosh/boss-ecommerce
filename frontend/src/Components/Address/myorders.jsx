import React, { useState, useEffect } from 'react';
import apiClient from '../../../lib/client-axios';
import { format } from 'date-fns';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/orders/');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-salmon-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold text-salmon-600">My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="mt-8 text-center p-8 border rounded-md bg-gray-50">
          <p className="text-gray-600">You haven't placed any orders yet.</p>
          <a href="/" className="mt-4 inline-block px-4 py-2 bg-salmon-600 text-white rounded-md hover:bg-salmon-700">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="grid gap-4 mt-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleOrderClick(order)}
            >
              <div className="flex justify-between items-center flex-wrap">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600">Date: {formatDate(order.created_at)}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 
                      order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' : 
                      order.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
              <p className="font-semibold mt-2">Total: ₹{order.total_price}</p>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="mt-8 p-6 border rounded-md bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Order Details</h3>
            <button 
              onClick={() => setSelectedOrder(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Date:</strong> {formatDate(selectedOrder.created_at)}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium 
                  ${selectedOrder.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 
                    selectedOrder.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 
                    selectedOrder.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' : 
                    selectedOrder.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {selectedOrder.status.charAt(0) + selectedOrder.status.slice(1).toLowerCase()}
                </span>
              </p>
            </div>
            <div>
              <p><strong>Total:</strong> ₹{selectedOrder.total_price}</p>
              {selectedOrder.payment_id && <p><strong>Payment ID:</strong> {selectedOrder.payment_id}</p>}
              {selectedOrder.razorpay_order_id && <p><strong>Razorpay Order ID:</strong> {selectedOrder.razorpay_order_id}</p>}
            </div>
          </div>
          
          {selectedOrder.shipping_address && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Shipping Address:</h4>
              <p className="text-gray-700 whitespace-pre-line">{selectedOrder.shipping_address}</p>
            </div>
          )}
          
          <h4 className="font-semibold mb-2">Items:</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.products && selectedOrder.products.map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">{product.quantity}</td>
                    <td className="py-2 px-4">₹{product.price}</td>
                    <td className="py-2 px-4">₹{(product.price * product.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
