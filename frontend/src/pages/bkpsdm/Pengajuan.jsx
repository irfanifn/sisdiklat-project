import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import JenisUsulanCard from "./JenisUsulanCard";
import SyaratDokumenCard from "./SyaratDokumenCard";
import DaftarPengajuanTable from "./DaftarPengajuanTable";
import { baseUrl } from "../../configs/constant.js";

function Pengajuan() {
  const [currentPage, setCurrentPage] = useState("Pengajuan");
  const [pengajuans, setPengajuans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State untuk data yang bisa diedit (hardcode dulu)
  const [jenisUsulanData, setJenisUsulanData] = useState(["TB", "IB"]);
  const [syaratDokumenData, setSyaratDokumenData] = useState(
    "Upload file gabungan berisi: KTP, Ijazah, Surat Keterangan Sehat, Surat Rekomendasi Atasan"
  );

  // Fetch semua pengajuan
  const fetchPengajuans = async () => {
    try {
      const token = localStorage.getItem("token");
      // TODO: Buat endpoint khusus admin untuk ambil semua pengajuan
      const response = await axios.get(`${baseUrl}/api/admin/pengajuan`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setPengajuans(response.data.data);
      }
    } catch (err) {
      // Sementara pakai data dummy kalau endpoint belum ada
      console.log("Endpoint admin belum ada, pakai data dummy");
      setError("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPengajuans();
  }, []);

  // Handle approve usulan
  const handleApprove = async (usulanId) => {
    if (
      confirm("Yakin sudah memeriksa dokumen dan akan menyetujui usulan ini?")
    ) {
      try {
        // TODO: API call approve
        console.log("Approve usulan ID:", usulanId);
        alert("Usulan berhasil disetujui!");
        // Refresh data setelah approve
        fetchPengajuans();
      } catch (err) {
        console.error("Error approve:", err);
        alert("Gagal menyetujui usulan");
      }
    }
  };

  // Handle reject usulan
  const handleReject = async (usulanId) => {
    const catatan = prompt("Masukkan alasan penolakan:");
    if (catatan && catatan.trim()) {
      try {
        // TODO: API call reject dengan catatan
        console.log("Reject usulan ID:", usulanId, "Catatan:", catatan);
        alert("Usulan berhasil ditolak!");
        // Refresh data setelah reject
        fetchPengajuans();
      } catch (err) {
        console.error("Error reject:", err);
        alert("Gagal menolak usulan");
      }
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
            <div className="max-w-7xl mx-auto space-y-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Kelola Pengajuan
              </h1>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Card Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <JenisUsulanCard
                  jenisUsulanData={jenisUsulanData}
                  setJenisUsulanData={setJenisUsulanData}
                />

                <SyaratDokumenCard
                  syaratDokumenData={syaratDokumenData}
                  setSyaratDokumenData={setSyaratDokumenData}
                />
              </div>

              {/* Tabel Daftar Pengajuan */}
              <DaftarPengajuanTable
                pengajuans={pengajuans}
                loading={loading}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pengajuan;
