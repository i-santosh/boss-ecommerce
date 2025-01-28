import React from "react";
import "../css/contact.css"


const Contact = () => {

return (
  <>
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-xl rounded-2xl">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2  ">
          <img class="contact-img" src="assets\background\contact-page2.png" alt="Placeholder" className=" object-cover rounded-2xl " />
        </div>

        {/* right form section */}
        <div className="contact-form">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Feel free to contact!!</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%)"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%)"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="Number" className="block text-sm font-medium text-gray-600">Contact</label>
         
          <input
            type="number"
            id="contact"
            name="contact number"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%) "
            placeholder="contact number"
            required
          />

        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">Descripiton</label>
          {/* <input
            type='text'
            id="confirm-password"
            name=" describe your query"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%)"
            placeholder="describe your query"
            required
          /> */}
          <textarea name="" id="text-description"
          type= 'text' 
          rows={3}
          columns={50}
          maxLength={1000}
          placeholder="describe your query" required
          wrap="hard"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%)"
          
          
          ></textarea>
        </div>
        <button
          type="submit"
          class="sumbit-button"
          onClick={()=>alert("Your query has been submitted")}
        >
        Submit
        </button>
      </form>
    </div>
    
    </div>
    </div>


    </>
  );
};





export default Contact;
