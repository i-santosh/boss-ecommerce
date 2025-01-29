import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import Faq from './Address/faq';
function LAYOUT2() {



  return (
    <>


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
                <Link to={'myorders'} className="font-semibold text-gray-700 hover:text-pink-300">MY ORDERS</Link>
                <Link className="font-semibold text-gray-700 ">ACCOUNT SETTINGS</Link>
                <ul className="ml-4 space-y-2">
                  <Link to={''} className="hover:text-pink-300">Profile Information</Link>
                  <Link to={'address'} className="hover:text-pink-300">Manage Addresses</Link>
                </ul>
                <Link className="font-semibold text-gray-700">PAYMENTS</Link>
                <ul className="ml-4 space-y-2">
                  {/* <Link className="hover:text-pink-300">Gift Cards</Link> */}
                  <Link to={'savedupi'} className="hover:text-pink-300">Saved UPI</Link>
                  <br /><br /><br />
                  <Link to="/user" className="hover:text-pink-300"> <img src="assets\images\icons\logout-myaccount.svg" alt="logout-icon " class="logout-img" />Log out</Link>
                </ul>
              </ul>
            </nav>
          </aside>

          {/* Main Section */}

          <Outlet />

        </div>

        {/* FAQ Section */}
        <Faq />

      </div>











    </>
  );
}

export default LAYOUT2;