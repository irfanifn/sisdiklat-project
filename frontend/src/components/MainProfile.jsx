import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useUser } from "../contexts/UserContext";

function MainProfile() {
  const [editMode, setEditMode] = useState(false);
  const { user, loading, setUser } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-800 dark:text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <span className="material-symbols-rounded text-6xl text-gray-500 dark:text-gray-400">
              person_off
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Silakan login untuk mengakses halaman ini
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-7">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <div className="px-4 sm:px-0 rounded-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Your personal details
          </p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Batal" : "Edit Profile"}
          </button>
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
          {editMode ? (
            <EditProfile
              userData={user}
              onSave={(updatedData) => {
                setUser(updatedData);
                setEditMode(false);
              }}
            />
          ) : (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-800 dark:text-white">
                  Nama
                </dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {user.nama}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-800 dark:text-white">
                  NIP
                </dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {user.nip}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-800 dark:text-white">
                  Email address
                </dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {user.email}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-800 dark:text-white">
                  Jabatan
                </dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {user.jabatan}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-800 dark:text-white">
                  OPD
                </dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {user.nama_opd}
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
