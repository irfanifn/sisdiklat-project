import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useUser } from "../contexts/UserContext";

function MainProfile() {
  const [editMode, setEditMode] = useState(false);
  const { user, loading, setUser } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-primary text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main-gradient">
        <div className="text-center bg-card p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <span className="material-symbols-rounded text-6xl text-secondary">
              person_off
            </span>
          </div>
          <h2 className="text-xl font-semibold text-primary mb-2">
            Authentication Required
          </h2>
          <p className="text-secondary mb-4">
            Silakan login untuk mengakses halaman ini
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-btn-primary text-contrast px-4 py-2 rounded-lg hover:bg-btn-primary transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
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
