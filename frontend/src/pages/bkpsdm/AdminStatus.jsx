import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Filter from "../../components/Filter.jsx";
import Pagination from "../../components/Pagination.jsx";
import PrintReport from "../../components/PrintReport.jsx";
import { baseUrl } from "../../configs/constant.js";

function AdminStatus() {
  const [currentPage, setCurrentPage] = useState("Status");
  const [riwayatData, setRiwayatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });

  // Fungsi untuk memicu cetak
  const handlePrint = () => {
    console.log(
      "Print button clicked, riwayatData length:",
      riwayatData.length
    );
    if (riwayatData.length === 0) {
      alert("Tidak ada data untuk dicetak");
      return;
    }
    window.print();
  };

  // Debug riwayatData
  useEffect(() => {
    console.log("riwayatData updated:", riwayatData);
  }, [riwayatData]);

  // Fetch semua riwayat status
  const fetchRiwayatStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }
      console.log("Fetching riwayat status with params:", filters);
      const response = await axios.get(`${baseUrl}/api/bkpsdm/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ...filters,
          page: filters.page || 1,
          limit: filters.limit || 10,
        },
      });

      if (response.data.success) {
        setRiwayatData(response.data.data || []);
        setPagination({
          currentPage: response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages,
          totalItems: response.data.pagination.totalItems,
          limit: response.data.pagination.limit,
        });
        setError("");
      } else {
        throw new Error(response.data.message || "Gagal memuat data");
      }
    } catch (err) {
      console.error("Error fetching riwayat status:", err);
      setError(err.message || "Gagal memuat data riwayat status");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data saat filters berubah
  useEffect(() => {
    fetchRiwayatStatus();
  }, [filters]);

  // Handle filter change dari Filter.jsx
  const handleFilterChange = (newFilters) => {
    console.log("New filters:", newFilters);
    setFilters(newFilters);
  };

  // Handle page change dari Pagination.jsx
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Format tanggal
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString("id-ID") : "-";
  };

  // Styling status
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
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Riwayat Status Pengajuan
                </h1>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <span class="material-symbols-rounded">print</span>
                  Cetak
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Filter */}
              <Filter
                onFilterChange={handleFilterChange}
                showUserSearch={true}
                placeholder="Cari Nama/NIP/Jenis Usulan"
                initialFilters={filters}
              />

              {/* Table */}
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    Memuat data...
                  </p>
                </div>
              ) : (
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
                          {riwayatData.map((riwayat, index) => (
                            <tr
                              key={riwayat.riwayat_id || index}
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
                                  {riwayat.status || "-"}
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

              {/* Pagination */}
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.limit}
                onPageChange={handlePageChange}
              />

              {/* Print Component (Hidden on Screen) */}
              <PrintReport data={riwayatData} filters={filters} type="status" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStatus;
