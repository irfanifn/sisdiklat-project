import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import { baseUrl } from "../configs/constant";

function MainProfile({ user_id }) {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch single user by id
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/profile/${user_id}`);
        setUserData(res.data);
      } catch (error) {
        setError("Failed to fetch user");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user found</div>;

  return (
    <main className="flex-1 p-7">
      <div className="max-w-7xl mx-auto bg-slate-900 rounded-xl shadow-md p-8">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-semibold text-white">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-gray-400">Your personal details</p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            className="button inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:bg-blue-900 hover:bg-indigo-700"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="mt-6 border-t border-white/10">
          {editMode ? (
            <EditProfile
              userData={userData}
              onSave={(updatedData) => {
                setUserData(updatedData);
                setEditMode(false);
              }}
            />
          ) : (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y divide-white/10">
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-100">Nama</dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                  {userData.nama}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-100">NIP</dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                  {userData.nip}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-100">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                  {userData.email}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-100">Jabatan</dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                  {userData.jabatan}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-100">OPD</dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                  {userData.nama_opd}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </main>
  );
}

export default MainProfile;
