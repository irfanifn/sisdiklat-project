import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../configs/constant";

const SyaratDokumenCard = () => {
  const [editMode, setEditMode] = useState(false);
  const [jenisUsulan, setJenisUsulan] = useState("TB");
  const [deskripsi, setDeskripsi] = useState("");
  const [tempDeskripsi, setTempDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch persyaratan saat component mount atau jenis usulan berubah
  useEffect(() => {
    fetchPersyaratan();
  }, [jenisUsulan]);

  const fetchPersyaratan = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseUrl}/api/persyaratan/${jenisUsulan}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setDeskripsi(res.data.data.deskripsi);
      }
    } catch (err) {
      console.error("Error fetching persyaratan:", err);
      setMessage({ type: "error", text: "Gagal memuat persyaratan" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${baseUrl}/api/persyaratan/${jenisUsulan}`,
        { deskripsi: tempDeskripsi },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setDeskripsi(tempDeskripsi);
        setEditMode(false);
        setMessage({ type: "success", text: "Persyaratan berhasil diupdate" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Gagal mengupdate persyaratan",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditMode = () => {
    setEditMode(true);
    setTempDeskripsi(deskripsi);
  };

  const handleCancel = () => {
    setEditMode(false);
    setTempDeskripsi("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Syarat Dokumen
        </h2>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Pilih Jenis Usulan */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
          Jenis Usulan
        </label>
        <select
          value={jenisUsulan}
          onChange={(e) => setJenisUsulan(e.target.value)}
          disabled={editMode}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="TB">Tugas Belajar (TB)</option>
          <option value="IB">Izin Belajar (IB)</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-4 text-gray-600 dark:text-gray-400">
          Memuat...
        </div>
      ) : !editMode ? (
        <>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-800 dark:text-white text-sm leading-relaxed whitespace-pre-line">
              {deskripsi}
            </p>
          </div>
          <button
            onClick={handleEditMode}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <textarea
            value={tempDeskripsi}
            onChange={(e) => setTempDeskripsi(e.target.value)}
            rows="12"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Masukkan syarat dokumen..."
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyaratDokumenCard;
