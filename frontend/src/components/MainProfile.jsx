import React, { useState } from "react";
import EditProfile from "./EditProfile";

function MainProfile() {
  const [editMode, setEditMode] = useState(false);
  const [user, loading] = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Silakan login untuk melihat profil</div>;
  }

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
              userData={user}
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
                  {user.nama}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-100">NIP</dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                  {user.nip}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-100">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                  {user.email}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-100">Jabatan</dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                  {user.jabatan}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-100">OPD</dt>
                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
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
