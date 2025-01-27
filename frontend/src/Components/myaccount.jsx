import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent,Button } from "./ui-card/card,button.jsx"
const MyAccount = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">Hello,boss</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row p-4 gap-4">
        {/* Sidebar */}
        <aside className="bg-white w-full md:w-1/4 rounded-lg shadow p-4">
          <nav>
            <ul className="spce-y-4">
              <Link className="font-semibold text-gray-700 hover:text-pink-300">MY ORDERS</Link>
              <Link className="font-semibold text-gray-700 ">ACCOUNT SETTINGS</Link>
              <ul className="ml-4 space-y-2">
                <Link className="hover:text-pink-300">Profile Information</Link>
                <Link className="hover:text-pink-300">Manage Addresses</Link>
                <Link className="hover:text-pink-300">PAN Card Information</Link>
              </ul>
              <Link className="font-semibold text-gray-700">PAYMENTS</Link>
              <ul className="ml-4 space-y-2">
                <Link className="hover:text-pink-300">Gift Cards</Link>
                <Link className="hover:text-pink-300">Saved UPI</Link>
                <br /><br /><br />
                <Link  to="/user" className="hover:text-pink-300"> <img src="assets\images\icons\logout-myaccount.svg" alt="logout-icon " class="logout-img" />Log out</Link>
              </ul>
            </ul>
          </nav>
        </aside>

        {/* Main Section */}
        <main className="flex-1 bg-white rounded-lg shadow p-4">
          <section className="mb-4">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <div className="flex gap-4 mt-2">
              <input
                type="text"
                placeholder="First Name"
                className="border p-2 rounded-lg w-1/2 bg-gray-100"
                
              />
              <input
                type="text"
                placeholder="Last Name"

                className="border p-2 rounded-lg w-1/2 bg-gray-100"
                
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2">Your Gender</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" value="male"  /> Male
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" value="female"  />
                  Female
                </label>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold">Email Address</h2>
            <input
              type="email"
              placeholder="demo@gmail.com"

              className="border p-2 rounded-lg w-full bg-gray-100 mt-2"
            />
          </section>

          <section>
            <h2 className="text-lg font-semibold">Mobile Number</h2>
            <input
              type="tel"
             
              placeholder="+91 9876543210"
              className="border p-2 rounded-lg w-full bg-gray-100 mt-2"
            />
          </section>
        </main>
      </div>

      {/* FAQ Section */}
      <section className="bg-pink-50 p-6 mt-6 rounded-lg shadow">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 ">
              <div>
                <h3 className="font-bold">How do I update my profile information?</h3>
                <p>You can update your profile by clicking the "Edit" buttons next to your details.</p>
              </div>
              <div>
                <h3 className="font-bold">Can I change my email address?</h3>
                <p>Yes, you can edit your email address by clicking the "Edit" button in the Email Address section.</p>
              </div>
              <div>
                <h3 className="font-bold">How do I add a mobile number?</h3>
                <p>Click on the "Edit" button next to the Mobile Number section to add your number.</p>
              </div>
            </div>
            <div className="mt-4 ">
              <Button className="contactSupport-myaccount" onClick={() => alert('Contact Support')}>Contact Support</Button>
            </div>
          </CardContent>
        </Card>
      </section>

    </div>
  );
};

export default MyAccount;
