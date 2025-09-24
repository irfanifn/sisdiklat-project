import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import axios from "axios";
import { baseUrl } from "../../configs/constant";

function Status() {
  const [currentPage, setCurrentPage] = useState("Status");
  const [usulan, setUsulan] = useState([]);
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

  // Fetch data usulan user
  const fetchUsulan = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Fetching usulan with params:", filters);
      const response = await axios.get(`${baseUrl}/api/usulan`, {
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
        setUsulan(response.data.data);
        setPagination({
          currentPage: response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages,
          totalItems: response.data.pagination.totalItems,
          limit: response.data.pagination.limit,
        });
        setError("");
      }
    } catch (err) {
      console.error("Error fetching usulan:", err);
      setError(err.response?.data?.message || "Gagal memuat data usulan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsulan();
  }, [filters]);

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    console.log("New filters:", newFilters);
    setFilters(newFilters);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Format tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID");
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
            <div className="max-w-6xl mx-auto space-y-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                Riwayat Status Usulan
              </h1>

              {/* Filter */}
              <Filter
                onFilterChange={handleFilterChange}
                showUserSearch={false} // Tidak perlu search nama/NIP karena ini halaman pegawai
                placeholder="Cari Jenis Usulan"
                initialFilters={filters}
              />

              {/* Error State */}
              {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Table */}
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    Memuat data...
                  </p>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  {usulan.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400">
                        Belum ada usulan yang diajukan
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 dark:text-white uppercase tracking-wider">
                                Jenis Usulan
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 dark:text-white uppercase tracking-wider">
                                Tanggal Pengajuan
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 dark:text-white uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {usulan.map((usulan) => (
                              <tr
                                key={usulan.usulan_id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                  {usulan.jenis_usulan}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                  {formatDate(usulan.tanggal_pengajuan)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                                      usulan.riwayatStatus?.[0]?.status
                                    )}`}
                                  >
                                    {usulan.riwayatStatus?.[0]?.status ||
                                      "pending"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Catatan Admin */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                          Catatan dari Admin
                        </h3>
                        {usulan
                          .filter(
                            (usulan) => usulan.riwayatStatus?.[0]?.catatan
                          )
                          .map((usulan) => (
                            <div
                              key={usulan.usulan_id}
                              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-gray-800 dark:text-white">
                                  {usulan.jenis_usulan} –{" "}
                                  {formatDate(usulan.tanggal_pengajuan)}
                                </span>
                                <span
                                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                                    usulan.riwayatStatus?.[0]?.status
                                  )}`}
                                >
                                  {usulan.riwayatStatus?.[0]?.status ||
                                    "pending"}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {usulan.riwayatStatus?.[0]?.catatan}
                              </p>
                            </div>
                          ))}
                        {usulan.filter((u) => u.riwayatStatus?.[0]?.catatan)
                          .length === 0 && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                            Belum ada catatan dari admin
                          </p>
                        )}
                      </div>

                      {/* Pagination */}
                      <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        itemsPerPage={pagination.limit}
                        onPageChange={handlePageChange}
                      />
                    </>
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

export default Status;
