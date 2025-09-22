import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { baseUrl } from "../../configs/constant";

function Usulan() {
  const [currentPage, setCurrentPage] = useState("Usulan");

  // State untuk form
  const [formData, setFormData] = useState({
    jenisUsulan: "",
    tanggalPengajuan: "",
    dokumen: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Data hardcode
  const jenisUsulanOptions = ["TB", "IB"];
  const syaratDokumen =
    "Upload file gabungan berisi: KTP, Ijazah, Surat Keterangan Sehat, Surat Rekomendasi Atasan";

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      dokumen: e.target.files[0],
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${baseUrl}/api/usulan`,
        {
          jenisUsulan: formData.jenisUsulan,
          tanggalPengajuan: formData.tanggalPengajuan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setMessage({
          type: "success",
          text: "Usulan berhasil disubmit! Silahkan cek status di menu Riwayat Status",
        });

        setFormData({
          jenisUsulan: "",
          tanggalPengajuan: "",
          dokumen: null,
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.res?.data?.message || "Terjadi kesalahan saaat submit usulan",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-main-gradient">
      <div className="flex h-screen overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold text-primary mb-3">
                Form Usulan
              </h1>

              <div className="bg-card rounded-lg shadow-lg p-6">
                {/* Success/Error Message */}
                {message.text && (
                  <div
                    className={`mb-4 p-4 rounded-lg ${
                      message.type === "success"
                        ? "bg-green-200 border border-green-200 text-green-800"
                        : "bg-red-200 border border-red-200 text-red-800"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Jenis Usulan */}
                  <div>
                    <label className="block text-sm font-medium text-primary   mb-2">
                      Jenis Usulan
                    </label>
                    <select
                      name="jenisUsulan"
                      value={formData.jenisUsulan}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-card text-secondary"
                      required
                    >
                      <option value="">Pilih Jenis Usulan</option>
                      {jenisUsulanOptions.map((jenis) => (
                        <option key={jenis} value={jenis}>
                          {jenis}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tanggal Pengajuan */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Tanggal Pengajuan
                    </label>
                    <input
                      type="date"
                      name="tanggalPengajuan"
                      value={formData.tanggalPengajuan}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-card text-secondary"
                      required
                    />
                  </div>

                  {/* Upload Dokumen */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Upload Dokumen
                    </label>

                    {/* Deskripsi Syarat */}
                    <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border-l-4 border-blue-400">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Persyaratan Dokumen:</strong>
                        <br />
                        {syaratDokumen}
                      </p>
                    </div>

                    <input
                      type="file"
                      name="dokumen"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      accept=".pdf,.doc,.docx"
                      required
                    />
                    <p className="text-xs text-secondary mt-1">
                      Format yang diterima: PDF, DOC, DOCX (Max: 5MB)
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-btn-primary text-primary font-medium py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Submit Usulan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usulan;
