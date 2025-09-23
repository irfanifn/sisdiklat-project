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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto py-8 bg-white dark:bg-gray-800 p-6 rounded-lg"
    >
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="nama"
          className="block text-sm font-medium text-gray-800 dark:text-white mb-1"
        >
          Nama
        </label>
        <input
          type="text"
          name="nama"
          id="nama"
          value={form.nama || ""}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="nip"
          className="block text-sm font-medium text-gray-800 dark:text-white mb-1"
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
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-800 dark:text-white mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="jabatan"
          className="block text-sm font-medium text-gray-800 dark:text-white mb-1"
        >
          Jabatan
        </label>
        <input
          type="text"
          name="jabatan"
          id="jabatan"
          value={form.jabatan || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="nama_opd"
          className="block text-sm font-medium text-gray-800 dark:text-white mb-1"
        >
          OPD
        </label>
        <input
          type="text"
          name="nama_opd"
          id="nama_opd"
          value={form.nama_opd || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

export default EditProfile;
