/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

const TransaksiPage = () => {
  const [history, setHistory] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.role != "admin") {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/beli/show`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHistory(response.data.filter((entry) => entry.status !== "SELESAI"));
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchHistory();
  }, []);

  const handleApprove = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan mengubah status menjadi SEDANG DI PROSES.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, setujui",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/beli-acc/${id}`,
            {
              status: "SEDANG DI PROSES",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setHistory((prevHistory) =>
              prevHistory.map((entry) =>
                entry.id === id
                  ? { ...entry, status: "SEDANG DI PROSES" }
                  : entry
              )
            );
            Swal.fire({
              title: "Success",
              text: "Berhasil mengubah status",
              icon: "success",
              confirmButtonText: "Oke",
            });
          }
        } catch (error) {
          console.error("Error approving item:", error);
          Swal.fire({
            title: "Failed",
            text: "Gagal mengubah status",
            icon: "error",
            confirmButtonText: "Oke",
          });
        }
      }
    });
  };

  const handleSent = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan mengubah status menjadi SEDANG DI KIRIM.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, kirim",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/beli-acc/${id}`,
            {
              status: "SEDANG DI KIRIM",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setHistory((prevHistory) =>
              prevHistory.map((entry) =>
                entry.id === id
                  ? { ...entry, status: "SEDANG DI KIRIM" }
                  : entry
              )
            );
            Swal.fire({
              title: "Success",
              text: "Berhasil mengubah status",
              icon: "success",
              confirmButtonText: "Oke",
            });
          }
        } catch (error) {
          console.error("Error sending item:", error);
          Swal.fire({
            title: "Failed",
            text: "Gagal mengubah status",
            icon: "error",
            confirmButtonText: "Oke",
          });
        }
      }
    });
  };

  const handleFinish = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan mengubah status menjadi SELESAI.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, selesai",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/beli-acc/${id}`,
            {
              status: "SELESAI",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setHistory((prevHistory) =>
              prevHistory.map((entry) =>
                entry.id === id ? { ...entry, status: "SELESAI" } : entry
              )
            );
            Swal.fire({
              title: "Success",
              text: "Berhasil mengubah status",
              icon: "success",
              confirmButtonText: "Oke",
            });
          }
        } catch (error) {
          console.error("Error finishing item:", error);
          Swal.fire({
            title: "Failed",
            text: "Gagal mengubah status",
            icon: "error",
            confirmButtonText: "Oke",
          });
        }
      }
    });
  };

  const filteredHistory = history.filter((entry) => {
    if (activeFilter === "ALL") return true;
    return entry.status === activeFilter;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Transaksi</h1>
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveFilter("ALL")}
          className={`px-4 py-2 rounded ${
            activeFilter === "ALL" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setActiveFilter("MENUNGGU PEMBAYARAN")}
          className={`px-4 py-2 rounded ${
            activeFilter === "MENUNGGU PEMBAYARAN"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          Belum Dibayar
        </button>
        <button
          onClick={() => setActiveFilter("SEDANG DI PROSES")}
          className={`px-4 py-2 rounded ${
            activeFilter === "SEDANG DI PROSES"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          Diproses
        </button>
        <button
          onClick={() => setActiveFilter("SEDANG DI KIRIM")}
          className={`px-4 py-2 rounded ${
            activeFilter === "SEDANG DI KIRIM"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          Dikirim
        </button>
      </div>
      <div className="overflow-x-scroll">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 border border-black">No</th>
              <th className="py-2 border border-black">User ID</th>
              <th className="py-2 border border-black">Items</th>
              <th className="py-2 border border-black">Jenis Pembayaran</th>
              <th className="py-2 border border-black">Total Harga</th>
              <th className="py-2 border border-black">Tanggal Acara</th>
              <th className="py-2 border border-black">Alamat</th>
              <th className="py-2 border border-black">Invoice</th>
              <th className="py-2 border border-black">Status</th>
              <th className="py-2 border border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((entry, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-slate-200" : ""}`}
              >
                <td className="py-2 px-4 border-r border-l border-black">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {entry.user_id}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {entry.item}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {entry.jenis_pembayaran}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {entry.harga}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {entry.tanggal_eksekusi}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {entry.alamat}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {entry.invoice_image_url != null ? (
                    <a
                      href={entry.invoice_image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View Invoice
                    </a>
                  ) : (
                    <p className="text-blue-500 text-center">Belum Diinput</p>
                  )}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {entry.status}
                </td>
                <td className="py-2 px-4 border-r border-black  ">
                  <div className="flex flex-col ">
                    <Link
                      to={`/transaksi/${entry.id}`}
                      className=" bg-yellow-500 mb-5 text-center px-4 py-2 rounded"
                    >
                      Detail
                    </Link>
                    {entry.status === "MENUNGGU PEMBAYARAN" && (
                      <button
                        onClick={() => handleApprove(entry.id)}
                        className="px-4 py-2 bg-sky-500 text-white rounded w-[100px]"
                      >
                        Setujui
                      </button>
                    )}
                    {entry.status === "SEDANG DI PROSES" && (
                      <button
                        onClick={() => handleSent(entry.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded w-[100px]"
                      >
                        Kirim
                      </button>
                    )}
                    {entry.status === "SEDANG DI KIRIM" && (
                      <button
                        onClick={() => handleFinish(entry.id)}
                        className="px-4 py-2 bg-gray-500 text-white rounded w-[100px]"
                      >
                        Selesai
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransaksiPage;
