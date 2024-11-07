import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RiwayatPage = () => {
  const [history, setHistory] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/beli/show`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const completedHistory = response.data.filter(
          (entry) => entry.status === "SELESAI"
        );
        setHistory(completedHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Riwayat Transaksi</h1>
      <div className="overflow-x-auto">
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
            </tr>
          </thead>

          <tbody>
            {history.map((entry, index) => (
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
                  {entry.invoice_image_url === null ? (
                    "Belum Bayar"
                  ) : (
                    <a
                      href={entry.invoice_image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded text-sky-500 text-center"
                    >
                      View Invoice
                    </a>
                  )}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {entry.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwayatPage;
