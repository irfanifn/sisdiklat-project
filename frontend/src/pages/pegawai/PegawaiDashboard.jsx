import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../configs/constant.js";

function PegawaiDashboard() {
  const navigate = useNavigate();

  // State untuk data dashboard
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    disetujui: 0,
    ditolak: 0,
  });
  const [recentUsulan, setRecentUsulan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dashboard
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/api/usulan?limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const usulans = response.data.data;
        setRecentUsulan(usulans);

        // Hitung statistik
        const totalUsulan = response.data.pagination?.total || usulans.length;
        const pending = usulans.filter(
          (u) => (u.riwayatStatus?.[0]?.status || "pending") === "pending"
        ).length;
        const disetujui = usulans.filter(
          (u) => u.riwayatStatus?.[0]?.status === "disetujui"
        ).length;
        const ditolak = usulans.filter(
          (u) => u.riwayatStatus?.[0]?.status === "ditolak"
        ).length;

        setStats({
          total: totalUsulan,
          pending,
          disetujui,
          ditolak,
        });
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
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

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Dashboard Pegawai
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Usulan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Usulan
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {loading ? "-" : stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <span class="material-symbols-rounded">note_alt</span>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Menunggu Review
                </h3>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {loading ? "-" : stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <span class="material-symbols-rounded">alarm_smart_wake</span>
              </div>
            </div>
          </div>

          {/* Disetujui */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Disetujui
                </h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {loading ? "-" : stats.disetujui}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <span class="material-symbols-rounded">check_box</span>
              </div>
            </div>
          </div>

          {/* Ditolak */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ditolak
                </h3>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {loading ? "-" : stats.ditolak}
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
            onClick={() => navigate("/pegawai/usulan")}
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-lg transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Buat Usulan Baru</h3>
                <p className="text-blue-100">Ajukan usulan TB/IB baru</p>
              </div>
              <span class="material-symbols-rounded">add_2</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/pegawai/status")}
            className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-lg transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Lihat Semua Status
                </h3>
                <p className="text-green-100">Pantau progress usulan Anda</p>
              </div>
              <span class="material-symbols-rounded">chart_data</span>
            </div>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Aktivitas Terbaru
            </h2>
          </div>

          {loading ? (
            <div className="p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">Memuat data...</p>
            </div>
          ) : recentUsulan.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Belum ada usulan yang diajukan
              </p>
              <button
                onClick={() => navigate("/usulan")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buat Usulan Pertama
              </button>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-4">
                {recentUsulan.map((usulan) => (
                  <div
                    key={usulan.usulan_id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {usulan.jenis_usulan}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Diajukan pada {formatDate(usulan.tanggal_pengajuan)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        usulan.riwayatStatus?.[0]?.status || "pending"
                      )}`}
                    >
                      {usulan.riwayatStatus?.[0]?.status || "pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PegawaiDashboard;
