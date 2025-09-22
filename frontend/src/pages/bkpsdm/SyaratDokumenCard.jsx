import React, { useState } from "react";

const SyaratDokumenCard = ({ syaratDokumenData, setSyaratDokumenData }) => {
  const [editMode, setEditMode] = useState(false);
  const [tempSyaratDokumen, setTempSyaratDokumen] = useState("");

  // Handle save syarat dokumen
  const handleSave = () => {
    setSyaratDokumenData(tempSyaratDokumen);
    setEditMode(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setEditMode(false);
    setTempSyaratDokumen("");
  };

  // Handle edit mode
  const handleEditMode = () => {
    setEditMode(true);
    setTempSyaratDokumen(syaratDokumenData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Syarat Dokumen
        </h2>
        <button
          onClick={() => {
            if (editMode) {
              handleCancel();
            } else {
              handleEditMode();
            }
          }}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {editMode ? "Batal" : "Edit"}
        </button>
      </div>

      {!editMode ? (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-800 dark:text-white text-sm leading-relaxed">
            {syaratDokumenData}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={tempSyaratDokumen}
            onChange={(e) => setTempSyaratDokumen(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Masukkan syarat dokumen..."
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Simpan Perubahan
          </button>
        </div>
      )}
    </div>
  );
};

export default SyaratDokumenCard;
