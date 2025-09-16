import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { baseUrl } from "../configs/constant";
import { useParams } from "react-router-dom";

function Profile() {
  const [currentPage, setCurrentPage] = useState("Profile");
  const [data, setData] = useState([]);
  const { user_id } = useParams();

  const getData = async (user_id) => {
    await axios.get(`${baseUrl}/api/profile/${user_id}`).then((res) => {
      setData(res.data.data);
    });
  };
  useEffect(() => {
    if (user_id) getData(user_id);
  }, [user_id]);

  useEffect(() => {
    console.log("Data state berubah:", data);
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col overfolow-hidden">
          <Header />
          <main className="flex-1 p-7">
            <div className="max-w-7xl mx-auto bg-slate-900 rounded-xl shadow-md p-8">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-semibold text-white">
                  Applicant Information
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Personal details and application.
                </p>
              </div>

              <div className="mt-6 border-t border-white/10">
                <dl className="divide-y divide-white/10">
                  <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-100">Nama</dt>
                    <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                      Margot Foster
                    </dd>
                  </div>
                  <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-100">NIP</dt>
                    <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                      Backend Developer
                    </dd>
                  </div>
                  <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-100">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                      margotfoster@example.com
                    </dd>
                  </div>
                  <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-100">
                      Jabatan
                    </dt>
                    <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                      $120,000
                    </dd>
                  </div>
                  <div className="py-4 grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-100">OPD</dt>
                    <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                      $120,000
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* <div className="flex justify-center items-center mt-10">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            <img
              src="https://ui-avatars.com/api/?name=User+Profile"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Nama Pengguna
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mb-4">
              user@email.com
            </p>
            <div className="w-full">
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white"
                  value="Nama Pengguna"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white"
                  value="user@email.com"
                  readOnly
                />
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Profile;
