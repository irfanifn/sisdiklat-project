import React from "react";

const DaftarPengajuanTable = ({ pengajuans, loading, onApprove, onReject }) => {
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

  // Function untuk cek apakah usulan sudah diproses
  const isProcessed = (status) => {
    return (
      status?.toLowerCase() === "disetujui" ||
      status?.toLowerCase() === "ditolak"
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Daftar Pengajuan
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Memuat data...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  NIP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Jabatan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  OPD
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Jenis Usulan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Dokumen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {pengajuans.length > 0 ? (
                pengajuans.map((pengajuan) => (
                  <tr
                    key={pengajuan.usulan_id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {pengajuan.user?.nama || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {pengajuan.user?.nip || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {pengajuan.user?.email || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {pengajuan.user?.jabatan || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {pengajuan.user?.nama_opd || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {pengajuan.jenis_usulan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatDate(pengajuan.tanggal_pengajuan)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {pengajuan.dokumenSyarat &&
                      pengajuan.dokumenSyarat.length > 0 ? (
                        <a
                          href={`http://localhost:3000/${pengajuan.dokumenSyarat[0].path_file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Lihat Dokumen
                        </a>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">
                          Tidak ada dokumen
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      {isProcessed(pengajuan.riwayatStatus?.[0]?.status) ? (
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                            pengajuan.riwayatStatus?.[0]?.status
                          )}`}
                        >
                          Sudah diproses (
                          {pengajuan.riwayatStatus?.[0]?.status || "pending"})
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => onApprove(pengajuan.usulan_id)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            title="Setujui"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => onReject(pengajuan.usulan_id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            title="Tolak"
                          >
                            ✗
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400"
                  >
                    Belum ada pengajuan yang masuk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DaftarPengajuanTable;
