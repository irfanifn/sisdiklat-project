import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import JenisUsulanCard from "./JenisUsulanCard";
import SyaratDokumenCard from "./SyaratDokumenCard";
import DaftarPengajuanTable from "./DaftarPengajuanTable";
import Filter from "../../components/Filter.jsx";
import Pagination from "../../components/Pagination.jsx";
import { baseUrl } from "../../configs/constant.js";

function Pengajuan() {
  const [currentPage, setCurrentPage] = useState("Pengajuan");
  const [pengajuans, setPengajuans] = useState([]);
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

  // State untuk data yang bisa diedit (hardcode dulu)
  const [jenisUsulanData, setJenisUsulanData] = useState(["TB", "IB"]);
  const [syaratDokumenData, setSyaratDokumenData] = useState(
    "Upload file gabungan berisi: KTP, Ijazah, Surat Keterangan Sehat, Surat Rekomendasi Atasan"
  );

  // Fetch semua pengajuan
  const fetchPengajuans = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/api/bkpsdm/pengajuan`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filters,
      });

      if (response.data.success) {
        setPengajuans(response.data.data);
        setPagination({
          currentPage: response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages,
          totalItems: response.data.pagination.totalItems,
          limit: response.data.pagination.limit,
        });
        setError("");
      }
    } catch (err) {
      console.error("Error fetching pengajuans:", err);
      setError(err.response?.data?.message || "Gagal memuat data pengajuan");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data saat filters berubah
  useEffect(() => {
    fetchPengajuans();
  }, [filters]);

  // Handle filter change dari Filter.jsx
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle page change dari Pagination.jsx
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Handle action complete (approve/reject) untuk refresh data
  const handleActionComplete = () => {
    fetchPengajuans();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-100 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <div className="flex h-screen overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-max mx-auto space-y-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Kelola Pengajuan
              </h1>

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

              {/* Card Section */}
              <div className="grid gap-6">
                {/* <JenisUsulanCard
                  jenisUsulanData={jenisUsulanData}
                  setJenisUsulanData={setJenisUsulanData}
                /> */}
                <SyaratDokumenCard
                  syaratDokumenData={syaratDokumenData}
                  setSyaratDokumenData={setSyaratDokumenData}
                />
              </div>

              {/* Tabel Daftar Pengajuan */}
              <DaftarPengajuanTable
                pengajuans={pengajuans}
                loading={loading}
                onActionComplete={handleActionComplete}
              />

              {/* Pagination */}
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.limit}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pengajuan;
