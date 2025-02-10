import React from "react";
import { Card, CardContent } from "../Components/Address/uicomponents";
import { Button } from "../Components/Address/uicomponents";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Components/Address/uicomponents";
import { Plus } from "lucide-react";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-salmon-pink-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-salmon-pink-700">Admin Dashboard</h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Overview Cards */}
        <Card className="bg-salmon-pink-100">
          <CardContent>
            <h2 className="text-xl font-medium text-salmon-pink-800">Total Products</h2>
            <p className="text-2xl font-bold">120</p>
          </CardContent>
        </Card>

        <Card className="bg-salmon-pink-100">
          <CardContent>
            <h2 className="text-xl font-medium text-salmon-pink-800">Total Orders</h2>
            <p className="text-2xl font-bold">85</p>
          </CardContent>
        </Card>

        <Card className="bg-salmon-pink-100">
          <CardContent>
            <h2 className="text-xl font-medium text-salmon-pink-800">Revenue</h2>
            <p className="text-2xl font-bold">$12,340</p>
          </CardContent>
        </Card>

        {/* Product Management */}
        <section className="col-span-1 md:col-span-3">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-medium text-salmon-pink-800">Manage Products</h2>
            <Button className="bg-salmon-pink-600 hover:bg-salmon-pink-700 text-white flex items-center">
              <Plus className="mr-2" /> Add Product
            </Button>
          </header>

          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Sample Product 1</TableCell>
                  <TableCell>Category A</TableCell>
                  <TableCell>$20</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-salmon-pink-700">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                {/* Additional rows here */}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;


