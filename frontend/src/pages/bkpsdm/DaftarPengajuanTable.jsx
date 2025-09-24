import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../configs/constant";

const DaftarPengajuanTable = ({ pengajuans, loading, onActionComplete }) => {
  // State untuk modal
  const [modalType, setModalType] = useState(null);
  const [selectedUsulanId, setSelectedUsulanId] = useState(null);
  const [catatan, setCatatan] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState({ type: "", text: "" });

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

  // Cek apakah usulan sudah diproses
  const isProcessed = (status) => {
    return (
      status?.toLowerCase() === "disetujui" ||
      status?.toLowerCase() === "ditolak"
    );
  };

  // Buka modal
  const openModal = (type, usulanId) => {
    setModalType(type);
    setSelectedUsulanId(usulanId);
    setCatatan("");
    setModalMessage({ type: "", text: "" });
  };

  // Tutup modal
  const closeModal = () => {
    setModalType(null);
    setSelectedUsulanId(null);
    setCatatan("");
    setModalMessage({ type: "", text: "" });
    onActionComplete(); // Trigger refresh data di parent
  };

  // Handle approve
  const handleApprove = async () => {
    setModalLoading(true);
    setModalMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${baseUrl}/api/bkpsdm/pengajuan/${selectedUsulanId}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setModalMessage({
          type: "success",
          text: "Usulan berhasil disetujui!",
        });
        setTimeout(closeModal, 1500);
      }
    } catch (err) {
      setModalMessage({
        type: "error",
        text: err.response?.data?.message || "Gagal menyetujui usulan",
      });
    } finally {
      setModalLoading(false);
    }
  };

  // Handle reject
  const handleReject = async () => {
    if (!catatan.trim()) {
      setModalMessage({
        type: "error",
        text: "Catatan penolakan wajib diisi",
      });
      return;
    }

    setModalLoading(true);
    setModalMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${baseUrl}/api/bkpsdm/pengajuan/${selectedUsulanId}/reject`,
        { catatan },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setModalMessage({
          type: "success",
          text: "Usulan berhasil ditolak!",
        });
        setTimeout(closeModal, 1500);
      }
    } catch (err) {
      setModalMessage({
        type: "error",
        text: err.response?.data?.message || "Gagal menolak usulan",
      });
    } finally {
      setModalLoading(false);
    }
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
                          href={`${baseUrl}/${pengajuan.dokumenSyarat[0].path_file}`}
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
                            onClick={() =>
                              openModal("approve", pengajuan.usulan_id)
                            }
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            title="Setujui"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() =>
                              openModal("reject", pengajuan.usulan_id)
                            }
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

      {/* Modal untuk Approve/Reject */}
      {modalType && (
        <div className="fixed inset-0 bg-blend-darken shadow-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              {modalType === "approve"
                ? "Konfirmasi Persetujuan"
                : "Konfirmasi Penolakan"}
            </h3>

            {modalMessage.text && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  modalMessage.type === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {modalMessage.text}
              </div>
            )}

            {modalType === "approve" ? (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Apakah Anda yakin ingin menyetujui usulan ini?
              </p>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
                  Catatan Penolakan
                </label>
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Masukkan alasan penolakan..."
                  required
                />
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                disabled={modalLoading}
              >
                Batal
              </button>
              <button
                onClick={modalType === "approve" ? handleApprove : handleReject}
                className={`px-4 py-2 text-sm font-medium text-white rounded transition-colors ${
                  modalLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : modalType === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                disabled={modalLoading}
              >
                {modalLoading
                  ? "Memproses..."
                  : modalType === "approve"
                  ? "Setujui"
                  : "Tolak"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarPengajuanTable;
