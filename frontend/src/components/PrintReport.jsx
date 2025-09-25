import React from "react";

const PrintReport = ({
  data = [],
  filters = {},
  title = "Laporan Pengajuan TB/IB",
  type = "status",
}) => {
  console.log("PrintReport rendered with data:", data, "filters:", filters);

  // Format tanggal untuk print
  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-";
  };

  // Generate filter info text
  const getFilterInfo = () => {
    const filterInfo = [];
    if (filters.status) filterInfo.push(`Status: ${filters.status}`);
    if (filters.search) filterInfo.push(`Pencarian: "${filters.search}"`);
    if (filters.startDate)
      filterInfo.push(`Dari: ${formatDate(filters.startDate)}`);
    if (filters.endDate)
      filterInfo.push(`Sampai: ${formatDate(filters.endDate)}`);
    return filterInfo.length > 0 ? filterInfo.join(", ") : "Semua data";
  };

  return (
    <div className="print-content">
      <div className="print-page">
        {/* Header Laporan */}
        <div className="print-header">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold mb-2">
              PEMERINTAH KOTA SAMARINDA
            </h1>
            <h2 className="text-lg font-semibold mb-2">
              DINAS KOMUNIKASI INFORMASI KOTA SAMARINDA
            </h2>
            <h3 className="text-base font-medium mb-4">{title}</h3>
            <div className="border-b-2 border-black mb-4"></div>
          </div>

          {/* Info Filter */}
          {/* <div className="mb-4">
            <p className="text-sm">
              <strong>Filter:</strong> {getFilterInfo()}
            </p>
            <p className="text-sm">
              <strong>Tanggal Cetak:</strong> {formatDate(new Date())}
            </p>
            <p className="text-sm">
              <strong>Total Data:</strong> {data.length} record
            </p>
          </div> */}
        </div>

        {/* Table Content */}
        <div className="print-table">
          {type === "status" ? (
            <table className="w-full border-collapse border border-black text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black px-2 py-1 text-left">
                    No
                  </th>
                  <th className="border border-black px-2 py-1 text-left">
                    Nama Pegawai
                  </th>
                  <th className="border border-black px-2 py-1 text-left">
                    NIP
                  </th>
                  <th className="border border-black px-2 py-1 text-left">
                    Jenis Usulan
                  </th>
                  <th className="border border-black px-2 py-1 text-left">
                    Tgl Pengajuan
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.riwayat_id || index}>
                      <td className="border border-black px-2 py-1">
                        {index + 1}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {item.usulan?.user?.nama || "-"}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {item.usulan?.user?.nip || "-"}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {item.usulan?.jenis_usulan || "-"}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {formatDate(item.usulan?.tanggal_pengajuan)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="border border-black px-2 py-1 text-center"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full border-collapse border border-black text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black px-2 py-1 text-left">
                    No
                  </th>
                  <th className="border border-black px-2 py-1 text-left">
                    Nama
                  </th>
                  <th className="border border-black px-2 py-1 text-left">
                    NIP
                  </th>
                  <th className="border border-black px-2 py-1 text-left">
                    Email
                  </th>
                  <th className="border border-black px-2 py-1 text-left">
                    Jabatan
                  </th>
                  <th className="border border-black px-2 py-1 text-left">
                    OPD
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.usulan_id || index}>
                      <td className="border border-black px-2 py-1">
                        {index + 1}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {item.user?.nama || "-"}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {item.user?.nip || "-"}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {item.user?.email || "-"}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {item.user?.jabatan || "-"}
                      </td>
                      <td className="border border-black px-2 py-1">
                        {item.user?.nama_opd || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="border border-black px-2 py-1 text-center"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="print-footer mt-6">
          <div className="flex justify-end">
            <div className="text-center">
              <p className="mb-16">Samarinda, {formatDate(new Date())}</p>
              <p className="font-semibold">Kepala BKPSDM</p>
              <p className="text-sm mt-2">Nama Kepala BKPSDM</p>
              <p className="text-sm">NIP. 123456789</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        .print-content {
          display: none;
        }
        @media print {
          * {
            visibility: hidden;
          }
          .print-content,
          .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: block !important;
          }
          .print-page {
            padding: 20px;
            font-family: Arial, sans-serif;
            color: black;
            background: white;
          }
          @page {
            margin: 1cm;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintReport;
