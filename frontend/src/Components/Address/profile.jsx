import React from 'react';
import useUserProfileStore from "../../../store/user-profile"


function ProfileInfo() {
  // Get data from store
  const { userProfile } = useUserProfileStore();
  
  return (
    <main className="flex-1 bg-white rounded-lg shadow p-4">
      <section className="mb-4">
        <h2 className="text-lg font-semibold">Profile Information</h2>
        <div className="flex gap-4 mt-2">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded-lg w-1/2 bg-gray-100"
            defaultValue={userProfile?.full_name}
          />
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold">Email Address</h2>
        <input
          type="email"
          placeholder="demo@gmail.com"
          defaultValue={userProfile?.email}
          className="border p-2 rounded-lg w-full bg-gray-100 mt-2"
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold">Mobile Number</h2>
        <input
          type="tel"
          defaultValue={userProfile?.contact_number}
          placeholder="+91 9876543210"
          className="border p-2 rounded-lg w-full bg-gray-100 mt-2"
        />
      </section>
    </main>
  );
}

export default ProfileInfo;