import { useState } from "react";
import { Card, CardContent, Button, Dialog, DialogContent, DialogTitle, Input } from "../ui-card/card-button";

const ManageAddress = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, name: "John Doe", address: "123 Main St, City, Country", isDefault: false },
    { id: 2, name: "Jane Smith", address: "456 Elm St, City, Country", isDefault: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", address: "" });


  // saving new address
  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.address) {

      alert("Please fill in all fields")
    }
    else {


      setAddresses([...addresses, { id: Date.now(), ...newAddress, isDefault: false }]);
      setShowModal(false);
      setNewAddress({ name: "", address: "" });
    }

  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map((addr) => ({ ...addr, isDefault: addr.id === id })));
  };



  // save address hover effect
  const [hovered, setHovered] = useState(false);
  const hover = {
    backgroundColor: hovered ? "salmon" : "white",
    color: hovered ? "white" : "salmon",

  }


  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold text-salmon-600">Manage Addresses</h2>
      <div className="grid gap-4 mt-4">
        {addresses.map((addr) => (
          <Card key={addr.id} className={`p-4 border ${addr.isDefault ? "border-salmon-500" : "border-gray-300 "}`}>
            <CardContent>
              <p className="font-semibold">{addr.name}</p>
              <p className="text-gray-600">{addr.address}</p>
              <div className="flex gap-2 mt-2">
                {!addr.isDefault && (
                  <Button className="bg-salmon-500 text-black" onClick={() => handleSetDefault(addr.id)}>
                    Set Default
                  </Button>
                )}
                <Button className="bg-red-500 text-black" onClick={() => handleDelete(addr.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-4 bg-salmon text-black" onClick={() => setShowModal(true)}>
        Add New Address
      </Button>
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogTitle className="border-pink-500">Add New Address</DialogTitle>
            <Input
              placeholder="Name"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              className="border-pink-500"
              required
            />
            <Input
              placeholder="Address"
              value={newAddress.address}
              required
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              className="border-pink-500 mt-2"
            />
            <Button className=" text-black  "

              style={hover}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleAddAddress}>
              Save Address
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ManageAddress;
