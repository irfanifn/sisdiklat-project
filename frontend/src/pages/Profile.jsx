import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditProfile from "../components/EditProfile";

function Profile() {
  const [currentPage, setCurrentPage] = useState("Profile");
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user);
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col overfolow-hidden">
          <Header />
          <main className="flex-1 p-7">
            <div className="max-w-7xl mx-auto bg-slate-900 rounded-xl shadow-md p-8">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-semibold text-white">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Your personal details
                </p>
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
                      <dt className="text-sm font-medium text-gray-100">
                        Nama
                      </dt>
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
                      <dt className="text-sm font-medium text-gray-100">
                        Jabatan
                      </dt>
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
