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
      <div className="max-w-7xl mx-auto bg-gradient-to-br bg-card border-custom rounded-xl shadow-md p-8">
        <div className="px-4 sm:px-0 rounded-lg transition">
          <h3 className="text-lg font-semibold text-primary">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-secondary">Your personal details</p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            className="button inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary bg-btn-primary bg-btn-primary:hover"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="mt-6 border-t text-secondary">
          {editMode ? (
            <EditProfile
              userData={user}
              onSave={(updatedData) => {
                setUser(updatedData);
                setEditMode(false);
              }}
            />
          ) : (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y">
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4 rounded-b-none transition">
                <dt className="text-sm font-medium text-primary">Nama</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0 text-secondary">
                  {user.nama}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4 rounded-b-none  transition">
                <dt className="text-sm font-medium text-primary">NIP</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0 text-secondary">
                  {user.nip}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4 rounded-b-none  transition">
                <dt className="text-sm font-medium text-primary">
                  Email address
                </dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0 text-secondary">
                  {user.email}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4 rounded-b-none  transition">
                <dt className="text-sm font-medium text-primary">Jabatan</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0 text-secondary">
                  {user.jabatan}
                </dd>
              </div>
              <div className="py-4 grid sm:grid-cols-3 sm:gap-4 rounded-b-none  transition">
                <dt className="text-sm font-medium text-primary">OPD</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0 text-secondary">
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
