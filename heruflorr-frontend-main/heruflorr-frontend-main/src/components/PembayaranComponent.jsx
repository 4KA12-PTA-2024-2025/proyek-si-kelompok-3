import { Link } from "react-router-dom";
import QrComponent from "./utils/qrComponent";
import MandiriComponent from "./utils/mandiriComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import BsiComponent from "./utils/BsiComponent";
import DkiComponent from "./utils/dkiComponent";
import BniComponent from "./utils/BniComponent";

// eslint-disable-next-line react/prop-types
const PembayaranComponent = ({ id }) => {
  const [history, setHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/history/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [id, token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
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
    );
  }

  if (!history) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        No history found.
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[50%] h-auto min-h-[400px] absolute py-4 mx-auto rounded-xl bg-white border flex flex-col justify-around shadow-[1px_10px_20px_1px_#00000024] ">
      <h1 className="text-center text-xl">Pembayaran</h1>

      {/* Conditional Rendering for QRIS and Mandiri Sections */}
      {history.jenis_pembayaran === "QRIS" && <QrComponent />}
      {history.jenis_pembayaran === "MANDIRI" && <MandiriComponent />}
      {history.jenis_pembayaran === "BSI" && <BsiComponent />}
      {history.jenis_pembayaran === "BANK DKI" && <DkiComponent />}
      {history.jenis_pembayaran === "BNI" && <BniComponent />}

      <div className="flex justify-center gap-5 mt-5">
        <Link
          to="/products"
          className="px-4 py-2 bg-[#00BB13] rounded-full text-white"
        >
          Upload Nanti
        </Link>
        <Link
          to="/transaksi"
          className="px-4 py-2 border-2 border-[#00BB13] rounded-full"
        >
          Upload Invoice
        </Link>
      </div>
    </div>
  );
};

export default PembayaranComponent;
