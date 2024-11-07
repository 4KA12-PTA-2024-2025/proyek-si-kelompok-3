import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Sort history
        const sortedHistory = response.data.histori.sort((a, b) =>
          a.created_at.localeCompare(b.status)
        );
        setHistory(sortedHistory);
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (id) => {
    const deleteTransaction = async () => {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/beli/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setHistory((prevHistory) =>
            prevHistory.filter((item) => item.id !== id)
          );
          toast.success("Transaction deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);
        toast.error("Failed to delete transaction");
      }
    };

    // Custom confirmation toast
    // eslint-disable-next-line react/prop-types
    const ConfirmDeleteToast = ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete this transaction?</p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              deleteTransaction();
              closeToast();
            }}
            className="mr-2 px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-700"
          >
            No
          </button>
        </div>
      </div>
    );

    toast.info(<ConfirmDeleteToast />, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
  };

  return (
    <>
      <NavbarComponent />
      <ToastContainer />
      <div className="mt-[150px] mb-10 mx-auto w-[90vw] md:w-[50vw]">
        <h1 className="text-2xl text-[#00BB13]">Transaksi</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-start h-screen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="200"
            height="200"
            style={{
              shapeRendering: "auto",
              display: "block",
              background: "rgb(255, 255, 255)",
            }}
          >
            <g>
              <path
                style={{
                  transform: "scale(0.8)",
                  transformOrigin: "50px 50px",
                }}
                strokeLinecap="round"
                d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
                strokeDasharray="42.76482137044271 42.76482137044271"
                strokeWidth="8"
                stroke="#00BB13"
                fill="none"
              >
                <animate
                  values="0;256.58892822265625"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  attributeName="stroke-dashoffset"
                ></animate>
              </path>
            </g>
          </svg>
        </div>
      ) : (
        <div className="w-[90vw] md:w-[50vw] mx-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex w-full h-[200px] py-2 px-2 border mb-4"
            >
              <Link
                to={`/transaksi/${item.id}`}
                className="flex flex-col justify-between flex-1"
              >
                <div className="flex flex-col">
                  <h1>{formatDate(item.created_at)}</h1>
                  <h3>Total Harga: {item.harga}</h3>
                </div>
                <div>
                  <h2>
                    Batas Bayar:{" "}
                    {item.tanggal_eksekusi
                      ? formatDate(item.created_at)
                      : "N/A"}
                  </h2>
                </div>
              </Link>
              <div className="flex flex-col justify-between">
                <div className="flex justify-end px-3">
                  <h1 className="text-end px-4 py-1 border border-[#00BB13]">
                    {item.status}
                  </h1>
                </div>
                {item.status != "SELESAI" &&
                  item.status != "SEDANG DI KIRIM" && (
                    <div className="flex justify-end">
                      <button
                        disabled={item.status === "SELESAI"}
                        onClick={() => handleDelete(item.id)}
                        className="px-4 py-2 z-20 bg-pink-600 rounded-lg text-center text-white hover:bg-pink-700"
                      >
                        Batalkan Transaksi
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HistoryPage;
