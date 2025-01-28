import React from 'react';

function ProfileInfo(props) {
    return (
        <main className="flex-1 bg-white rounded-lg shadow p-4">
        <section className="mb-4">
          <h2 className="text-lg font-semibold">Profile Information</h2>
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
    );
}

export default ProfileInfo;