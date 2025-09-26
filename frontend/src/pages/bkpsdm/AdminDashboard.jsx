import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../configs/constant.js";

function AdminDashboard() {
  const navigate = useNavigate();

  // State untuk data dashboard
  const [stats, setStats] = useState({
    totalPengajuan: 0,
    pendingReview: 0,
    approvedThisMonth: 0,
    rejectedThisMonth: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dashboard admin
  const fetchAdminDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch semua pengajuan
      const pengajuanResponse = await axios.get(
        `${baseUrl}/api/bkpsdm/pengajuan?limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Fetch riwayat status
      const statusResponse = await axios.get(
        `${baseUrl}/api/bkpsdm/status?limit=20`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (pengajuanResponse.data.success) {
        const pengajuans = pengajuanResponse.data.data;
        setRecentSubmissions(pengajuans.slice(0, 5)); // 5 terbaru

        // Hitung statistik
        const totalPengajuan =
          pengajuanResponse.data.pagination?.total || pengajuans.length;
        const pendingReview = pengajuans.filter(
          (p) => (p.riwayatStatus?.[0]?.status || "pending") === "pending"
        ).length;

        // Priority list - usulan pending yang sudah lama
        const priorityItems = pengajuans
          .filter(
            (p) => (p.riwayatStatus?.[0]?.status || "pending") === "pending"
          )
          .sort(
            (a, b) =>
              new Date(a.tanggal_pengajuan) - new Date(b.tanggal_pengajuan)
          )
          .slice(0, 5);
        setPriorityList(priorityItems);

        setStats((prev) => ({
          ...prev,
          totalPengajuan,
          pendingReview,
        }));
      }

      if (statusResponse.data.success) {
        const riwayatStatus = statusResponse.data.data;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const approvedThisMonth = riwayatStatus.filter((r) => {
          const statusDate = new Date(r.tanggal_perubahan);
          return (
            r.status === "disetujui" &&
            statusDate.getMonth() === currentMonth &&
            statusDate.getFullYear() === currentYear
          );
        }).length;

        const rejectedThisMonth = riwayatStatus.filter((r) => {
          const statusDate = new Date(r.tanggal_perubahan);
          return (
            r.status === "ditolak" &&
            statusDate.getMonth() === currentMonth &&
            statusDate.getFullYear() === currentYear
          );
        }).length;

        setStats((prev) => ({
          ...prev,
          approvedThisMonth,
          rejectedThisMonth,
        }));
      }
    } catch (err) {
      console.error("Error fetching admin dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDashboardData();
  }, []);

  // Format tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  // Get status style
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

  // Hitung hari sejak pengajuan
  const getDaysAgo = (dateString) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Dashboard Admin
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Pengajuan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Pengajuan
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {loading ? "-" : stats.totalPengajuan}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <span class="material-symbols-rounded">note_alt</span>
              </div>
            </div>
          </div>

          {/* Pending Review */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Butuh Review
                </h3>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {loading ? "-" : stats.pendingReview}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <span class="material-symbols-rounded">alarm_smart_wake</span>
              </div>
            </div>
          </div>

          {/* Approved This Month */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Disetujui Bulan Ini
                </h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {loading ? "-" : stats.approvedThisMonth}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <span class="material-symbols-rounded">check_box</span>
              </div>
            </div>
          </div>

          {/* Rejected This Month */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ditolak Bulan Ini
                </h3>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {loading ? "-" : stats.rejectedThisMonth}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <span class="material-symbols-rounded">close</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => navigate("/bkpsdm/pengajuan")}
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow-lg transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Kelola Pengajuan</h3>
                <p className="text-purple-100">
                  Review dan proses usulan pegawai
                </p>
              </div>
              <span class="material-symbols-rounded">electric_bolt</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/bkpsdm/status")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-6 rounded-lg shadow-lg transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Riwayat Status</h3>
                <p className="text-indigo-100">
                  Lihat semua aktivitas pengajuan
                </p>
              </div>
              <span class="material-symbols-rounded">chart_data</span>
            </div>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Submissions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Pengajuan Terbaru
              </h2>
            </div>

            {loading ? (
              <div className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Memuat data...
                </p>
              </div>
            ) : recentSubmissions.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Belum ada pengajuan
                </p>
              </div>
            ) : (
              <div className="p-6">
                <div className="space-y-4">
                  {recentSubmissions.map((pengajuan) => (
                    <div
                      key={pengajuan.usulan_id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {pengajuan.user?.nama} - {pengajuan.jenis_usulan}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {pengajuan.user?.nip} •{" "}
                          {formatDate(pengajuan.tanggal_pengajuan)}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          pengajuan.riwayatStatus?.[0]?.status || "pending"
                        )}`}
                      >
                        {pengajuan.riwayatStatus?.[0]?.status || "pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Priority List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Prioritas Review
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Usulan pending yang sudah lama
              </p>
            </div>

            {loading ? (
              <div className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Memuat data...
                </p>
              </div>
            ) : priorityList.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Semua usulan sudah diproses! 🎉
                </p>
              </div>
            ) : (
              <div className="p-6">
                <div className="space-y-4">
                  {priorityList.map((pengajuan) => (
                    <div
                      key={pengajuan.usulan_id}
                      className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {pengajuan.user?.nama} - {pengajuan.jenis_usulan}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {pengajuan.user?.nip} •{" "}
                          {getDaysAgo(pengajuan.tanggal_pengajuan)} hari yang
                          lalu
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">
                          Butuh Review
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
