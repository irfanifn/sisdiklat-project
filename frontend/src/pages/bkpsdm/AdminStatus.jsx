import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { baseUrl } from "../../configs/constant.js";

function AdminStatus() {
  const [currentPage, setCurrentPage] = useState("Status");
  const [riwayatData, setRiwayatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch semua riwayat status
  const fetchRiwayatStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/api/bkpsdm/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setRiwayatData(response.data.data);
      }
    } catch (err) {
      console.log("Endpoint admin status belum ada, pakai data dummy");

      // Dummy data untuk development
      const dummyData = [
        {
          riwayat_id: 1,
          usulan: {
            jenis_usulan: "TB",
            tanggal_pengajuan: "2024-12-20",
            user: {
              nama: "John Doe",
              nip: "123456789",
            },
          },
          status: "disetujui",
          catatan: "Dokumen lengkap dan sesuai persyaratan",
          tanggal_perubahan: "2024-12-25",
        },
        {
          riwayat_id: 2,
          usulan: {
            jenis_usulan: "IB",
            tanggal_pengajuan: "2024-12-22",
            user: {
              nama: "Jane Smith",
              nip: "987654321",
            },
          },
          status: "ditolak",
          catatan:
            "KTP tidak jelas, mohon upload ulang dengan kualitas yang lebih baik",
          tanggal_perubahan: "2024-12-24",
        },
        {
          riwayat_id: 3,
          usulan: {
            jenis_usulan: "TB",
            tanggal_pengajuan: "2024-12-23",
            user: {
              nama: "Bob Wilson",
              nip: "456789123",
            },
          },
          status: "pending",
          catatan: "Usulan baru disubmit, menunggu verifikasi",
          tanggal_perubahan: "2024-12-23",
        },
      ];

      setRiwayatData(dummyData);
      setError("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayatStatus();
  }, []);

  // Format tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  // Function untuk styling status
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "disetujui":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "ditolak":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
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
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Riwayat Status Pengajuan
              </h1>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    Memuat data...
                  </p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {/* Table */}
              {!loading && !error && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  {riwayatData.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400">
                        Belum ada riwayat pengajuan
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Nama Pegawai
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              NIP
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Jenis Usulan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Tanggal Pengajuan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Tanggal Update
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Catatan
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                          {riwayatData.map((riwayat) => (
                            <tr
                              key={riwayat.riwayat_id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {riwayat.usulan?.user?.nama || "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {riwayat.usulan?.user?.nip || "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {riwayat.usulan?.jenis_usulan || "-"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {formatDate(riwayat.usulan?.tanggal_pengajuan)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                                    riwayat.status
                                  )}`}
                                >
                                  {riwayat.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {formatDate(riwayat.tanggal_perubahan)}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                <div
                                  className="max-w-xs truncate"
                                  title={riwayat.catatan}
                                >
                                  {riwayat.catatan || "-"}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStatus;
