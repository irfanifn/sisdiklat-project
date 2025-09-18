import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../configs/constant";

function EditProfile({ userData, onSave }) {
  const [form, setForm] = useState(userData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(`${baseUrl}/api/profile`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        onSave(response.data.data);
      } else {
        setError(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto py-8">
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div>
        <label
          htmlFor="nama"
          className="block text-sm font-medium text-gray-100 mb-1"
        >
          Nama
        </label>
        <input
          type="text"
          name="nama"
          id="nama"
          value={form.nama || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 text-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="nip"
          className="block text-sm font-medium text-gray-100 mb-1"
        >
          NIP
        </label>
        <input
          type="text"
          name="nip"
          id="nip"
          value={form.nip || ""}
          disabled
          onChange={handleChange}
          className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="nip"
          className="block text-sm font-medium text-gray-100 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="nip"
          className="block text-sm font-medium text-gray-100 mb-1"
        >
          Jabatan
        </label>
        <input
          type="text"
          name="jabatan"
          id="jabatan"
          value={form.jabatan || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="nip"
          className="block text-sm font-medium text-gray-100 mb-1"
        >
          OPD
        </label>
        <input
          type="text"
          name="nama_opd"
          id="nama_opd"
          value={form.nama_opd || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:bg-blue-900 hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

export default EditProfile;
