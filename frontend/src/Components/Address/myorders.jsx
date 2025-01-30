import React, { useState } from 'react';

// Sample orders data (this would typically come from an API)
const ordersData = [
  { id: 1, date: '2025-01-10', status: 'Shipped', items: ['T-shirt', 'Jeans'], total: '$50.00' },
  { id: 2, date: '2025-01-12', status: 'Delivered', items: ['Jacket', 'Shoes'], total: '$120.00' },
  { id: 3, date: '2025-01-15', status: 'Processing', items: ['Sweater'], total: '$40.00' },
];

const MyOrders = () => {
  const [orders, setOrders] = useState(ordersData);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold text-salmon-600">My Orders</h2>
      <div className="grid gap-4 mt-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleOrderClick(order)}
          >
            <h3 className="font-semibold">Order #{order.id}</h3>
            <p className="text-gray-600">Date: {order.date}</p>
            <p className="text-gray-600">Status: {order.status}</p>
            <p className="font-semibold">Total: {order.total}</p>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="mt-8 p-6 border rounded-md bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <p><strong>Order ID:</strong> {selectedOrder.id}</p>
          <p><strong>Date:</strong> {selectedOrder.date}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Total:</strong> {selectedOrder.total}</p>
          <h4 className="mt-4 font-semibold">Items:</h4>
          <ul>
            {selectedOrder.items.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
