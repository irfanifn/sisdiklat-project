import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { baseUrl } from "../../configs/constant";

function Status() {
  const [currentPage, setCurrentPage] = useState("Status");
  const [usulan, setUsulan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data usulan user
  const fetchUsulan = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/api/usulan`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUsulan(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data usulan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsulan();
  }, []);

  // Function untuk format tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  // Function untuk styling status
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "disetujui":
        return "bg-green-100 text-green-800";
      case "ditolak":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
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
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold text-primary mb-3">
                Riwayat Status Usulan
              </h1>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-8">
                  <p className="text-secondary">Memuat data...</p>
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
                <div className="bg-card border-custom rounded-xl shadow-md overflow-hidden">
                  {usulan.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-secondary">
                        Belum ada usulan yang diajukan
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gradient-to-br bg-card">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                                Jenis Usulan
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                                Tanggal Pengajuan
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {usulan.map((usulan) => (
                              <tr
                                key={usulan.usulan_id}
                                className="hover:bg-btn-primary/10 transition"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                                  {usulan.jenis_usulan}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
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

                      {/* Cards untuk Catatan */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-medium text-primary mb-4">
                          Catatan dari Admin
                        </h3>
                        {usulan
                          .filter(
                            (usulan) => usulan.riwayatStatus?.[0]?.catatan
                          )
                          .map((usulan) => (
                            <div
                              key={usulan.usulan_id}
                              className="bg-card border-custom rounded-lg p-4 shadow-sm"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-primary">
                                  {usulan.jenis_usulan} -{" "}
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
                              <p className="text-sm text-secondary">
                                {usulan.riwayatStatus?.[0]?.catatan}
                              </p>
                            </div>
                          ))}
                        {usulan.filter((u) => u.riwayatStatus?.[0]?.catatan)
                          .length === 0 && (
                          <p className="text-secondary text-sm italic">
                            Belum ada catatan dari admin
                          </p>
                        )}
                      </div>
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
