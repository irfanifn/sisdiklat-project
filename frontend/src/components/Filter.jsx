import React, { useState } from "react";

const Filter = ({
  onFilterChange,
  showUserSearch = false, // untuk admin bisa search nama/NIP
  placeholder = "Cari...",
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10,
    ...initialFilters,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value,
      page: 1, // Reset ke halaman 1 saat filter berubah
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Handle reset filters
  const handleReset = () => {
    const resetFilters = {
      status: "",
      search: "",
      startDate: "",
      endDate: "",
      page: 1,
      limit: 10,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Status options
  const statusOptions = [
    { value: "", label: "Semua Status" },
    { value: "pending", label: "Pending" },
    { value: "disetujui", label: "Disetujui" },
    { value: "ditolak", label: "Ditolak" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Filter & Pencarian
        </h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          {showAdvanced ? "Sembunyikan" : "Filter Lanjutan"}
        </button>
      </div>

      {/* Basic Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {showUserSearch
              ? "Cari Nama/NIP/Jenis Usulan"
              : "Cari Jenis Usulan"}
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Limit per page */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data per halaman
          </label>
          <select
            value={filters.limit}
            onChange={(e) =>
              handleFilterChange("limit", parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters - Collapsible */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tanggal Akhir
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          Reset Filter
        </button>
        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          {(filters.status ||
            filters.search ||
            filters.startDate ||
            filters.endDate) && (
            <span>
              Filter aktif:{" "}
              {[
                filters.status && `Status: ${filters.status}`,
                filters.search && `Pencarian: ${filters.search}`,
                filters.startDate && `Dari: ${filters.startDate}`,
                filters.endDate && `Sampai: ${filters.endDate}`,
              ]
                .filter(Boolean)
                .join(", ")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
