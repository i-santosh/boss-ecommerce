import React, { useState } from 'react';

// Sample saved UPI data (this would typically come from an API)
const savedUPIsData = [
  { id: 1, upiId: 'john.doe@upi', name: 'John Doe' },
  { id: 2, upiId: 'jane.smith@upi', name: 'Jane Smith' },
  { id: 3, upiId: 'alex.jones@upi', name: 'Alex Jones' },
];

const SavedUPI = () => {
  const [savedUPIs, setSavedUPIs] = useState(savedUPIsData);
  const [showModal, setShowModal] = useState(false);
  const [newUPI, setNewUPI] = useState({ upiId: '', name: '' });

  const handleAddUPI = () => {
    if (!newUPI.upiId || !newUPI.name) {
      alert('Please fill in all fields');
      return;
    }

    const newUPIData = {
      id: Date.now(),
      upiId: newUPI.upiId,
      name: newUPI.name,
    };

    setSavedUPIs([...savedUPIs, newUPIData]);
    setShowModal(false);
    setNewUPI({ upiId: '', name: '' });
  };

  const handleDeleteUPI = (id) => {
    setSavedUPIs(savedUPIs.filter((upi) => upi.id !== id));
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold text-salmon-600">Saved UPI Payment Methods</h2>
      <div className="grid gap-4 mt-4">
        {savedUPIs.map((upi) => (
          <div key={upi.id} className="p-4 border rounded-md flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{upi.name}</h3>
              <p className="text-gray-600">{upi.upiId}</p>
            </div>
            <button
              className="bg-red-500 text-black px-4 py-2 rounded"
              onClick={() => handleDeleteUPI(upi.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        className="mt-4 bg-salmon-500 text-black px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
      >
        Add New UPI
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-white bg-opacity-10 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h3 className="text-xl font-semibold mb-4">Add New UPI</h3>
            <div className="mb-4">
              <label htmlFor="upiId" className="block font-medium">UPI ID</label>
              <input
                type="text"
                id="upiId"
                value={newUPI.upiId}
                onChange={(e) => setNewUPI({ ...newUPI, upiId: e.target.value })}
                className="border rounded w-full p-2"
                placeholder="Enter UPI ID"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium">Name</label>
              <input
                type="text"
                id="name"
                value={newUPI.name}
                onChange={(e) => setNewUPI({ ...newUPI, name: e.target.value })}
                className="border rounded w-full p-2"
                placeholder="Enter name"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-black px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-salmon-500 text-black px-4 py-2 rounded"
                onClick={handleAddUPI}
              >
                Add UPI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedUPI;
