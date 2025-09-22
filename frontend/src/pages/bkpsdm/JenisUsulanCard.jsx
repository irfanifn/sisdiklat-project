import React, { useState } from "react";

const JenisUsulanCard = ({ jenisUsulanData, setJenisUsulanData }) => {
  const [editMode, setEditMode] = useState(false);
  const [tempJenisUsulan, setTempJenisUsulan] = useState("");

  // Handle save jenis usulan
  const handleSave = () => {
    if (tempJenisUsulan.trim()) {
      setJenisUsulanData([...jenisUsulanData, tempJenisUsulan.trim()]);
      setTempJenisUsulan("");
    }
    setEditMode(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setEditMode(false);
    setTempJenisUsulan("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Jenis Usulan
        </h2>
        <button
          onClick={() => {
            if (editMode) {
              handleCancel();
            } else {
              setEditMode(true);
            }
          }}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {editMode ? "Batal" : "Edit"}
        </button>
      </div>

      {!editMode ? (
        <div className="space-y-2">
          {jenisUsulanData.map((jenis, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded"
            >
              <span className="text-gray-800 dark:text-white">{jenis}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            {jenisUsulanData.map((jenis, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded"
              >
                <span className="text-gray-800 dark:text-white">{jenis}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tempJenisUsulan}
              onChange={(e) => setTempJenisUsulan(e.target.value)}
              placeholder="Tambah jenis usulan baru"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JenisUsulanCard;
