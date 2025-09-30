import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { baseUrl } from "../../configs/constant";

function Usulan() {
  const [currentPage, setCurrentPage] = useState("Usulan");
  const [syaratDokumen, setSyaratDokumen] = useState("");
  const [loadingPersyaratan, setLoadingPersyaratan] = useState("false");

  // State untuk form
  const [formData, setFormData] = useState({
    jenisUsulan: "",
    tanggalPengajuan: "",
    dokumen: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const jenisUsulanOptions = ["TB", "IB"];

  // Fetch persyaratan ketika jenis usulan berubah
  useEffect(() => {
    const fetchPersyaratan = async () => {
      if (!formData.jenisUsulan) {
        setSyaratDokumen("");
        return;
      }

      setLoadingPersyaratan("true");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${baseUrl}/api/persyaratan/${formData.jenisUsulan}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setSyaratDokumen(res.data.data.deskripsi);
        }
      } catch (err) {
        console.error("Error fetching persyaratan:", err);
        setSyaratDokumen("Gagal memuat persyaratan");
      } finally {
        setLoadingPersyaratan(false);
      }
    };
    fetchPersyaratan();
  }, [formData.jenisUsulan]);

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

      // Buat FormData untuk mengirim data dan file
      const formDataToSend = new FormData();
      formDataToSend.append("jenisUsulan", formData.jenisUsulan);
      formDataToSend.append("tanggalPengajuan", formData.tanggalPengajuan);
      formDataToSend.append("dokumenSyarat", formData.dokumen);

      const res = await axios.post(`${baseUrl}/api/usulan`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setMessage({
          type: "success",
          text: "Usulan dan dokumen berhasil disubmit! Silahkan cek status di menu Riwayat Status",
        });

        setFormData({
          jenisUsulan: "",
          tanggalPengajuan: "",
          dokumen: null,
        });

        // Reset input file
        document.querySelector('input[name="dokumen"]').value = "";
      }
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message || "Terjadi kesalahan saat submit usulan",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-100 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <div className="flex h-screen overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                Form Usulan
              </h1>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                {/* Success/Error Message */}
                {message.text && (
                  <div
                    className={`mb-4 p-4 rounded-lg ${
                      message.type === "success"
                        ? "bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-200"
                        : "bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Jenis Usulan */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
                      Jenis Usulan
                    </label>
                    <select
                      name="jenisUsulan"
                      value={formData.jenisUsulan}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
                      Tanggal Pengajuan
                    </label>
                    <input
                      type="date"
                      name="tanggalPengajuan"
                      value={formData.tanggalPengajuan}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Upload Dokumen */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
                      Upload Dokumen
                    </label>

                    <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border-l-4 border-blue-400 dark:border-blue-600">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Persyaratan Dokumen:</strong>
                        <br />
                        {syaratDokumen && (
                          <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border-l-4 border-blue-400 dark:border-blue-600">
                            <p className="text-sm text-blue-800 dark:text-blue-200 whitespace-pre-line">
                              <strong>Persyaratan Dokumen:</strong>
                              <br />
                              {loadingPersyaratan ? "Memuat..." : syaratDokumen}
                            </p>
                          </div>
                        )}
                      </p>
                    </div>

                    <input
                      type="file"
                      name="dokumen"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900 dark:file:text-blue-200 hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Format yang diterima: PDF, DOC, DOCX (Max: 5MB)
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex justify-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-2xs px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white ${
                        loading
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      } transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {loading ? "Mengirim..." : "Kirim Usulan"}
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
