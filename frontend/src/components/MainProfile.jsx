import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useUser } from "../contexts/UserContext";

function MainProfile() {
  const [editMode, setEditMode] = useState(false);
  const { user, loading, setUser } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Silakan login untuk melihat profil</div>;
  }

  return (
    <main className="flex-1 p-7">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-slate-200 via-blue-100 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500 rounded-xl shadow-md p-8">
        <div className="px-4 sm:px-0 text-slate-700 dark:text-slate-200 rounded-lg transition">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <p className="mt-1 text-sm ">Your personal details</p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            className="button inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-slate-700 dark:text-slate-200 bg-blue-300 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-slate-800 transition"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="mt-6 border-t border-blue-200 dark:border-white/10">
          {editMode ? (
            <EditProfile
              userData={user}
              onSave={(updatedData) => {
                setUser(updatedData);
                setEditMode(false);
              }}
            />
          ) : (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y divide-blue-200 dark:divide-white/10">
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4 text-slate-700 dark:text-slate-200 rounded-lg transition">
                <dt className="text-sm font-medium">Nama</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {user.nama}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4 text-slate-700 dark:text-slate-200 rounded-lg transition">
                <dt className="text-sm font-medium">NIP</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {user.nip}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4 text-slate-700 dark:text-slate-200 rounded-lg transition">
                <dt className="text-sm font-medium">Email address</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {user.email}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4 text-slate-700 dark:text-slate-200 rounded-lg transition">
                <dt className="text-sm font-medium">Jabatan</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {user.jabatan}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4 text-slate-700 dark:text-slate-200 rounded-lg transition">
                <dt className="text-sm font-medium">OPD</dt>
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
