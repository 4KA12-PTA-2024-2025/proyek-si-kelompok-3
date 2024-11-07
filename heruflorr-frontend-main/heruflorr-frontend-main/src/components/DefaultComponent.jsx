import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import image from "../assets/home.png";
import "animate.css";
import wa from "../assets/whatsapp.png";

const DefaultComponent = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          console.error("User ID or token not found in localStorage");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
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
        <div className="relative flex w-full h-[70vh] mt-[20vh]">
          {showWhatsApp && (
            <div className="fixed z-50 bottom-6 right-4 flex items-end flex-col p-2 bg-white rounded">
              <button
                onClick={() => setShowWhatsApp(false)}
                className="text-lime-500 hover:text-lime-700"
              >
                ✖
              </button>
              <a
                href="https://wa.me/+6282122075918"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-2 gap-1"
              >
                <h1 className="px-2 py-2 bg-[#00BB13] rounded text-white md:text-sm">
                  Hubungi Kami
                </h1>
                <img
                  src={wa}
                  alt="whatsapp"
                  className="w-[50px] h-[50px] ml-2"
                />
              </a>
            </div>
          )}
          <div className="w-[50%] flex flex-col justify-center animate__animated animate__backInUp">
            <div className="mx-auto">
              <h3 className="text-slate-500 text-left text-xl md:text-2xl mb-5">
                Halo, {user?.name}
              </h3>
              <h1 className="text-slate-500 text-left text-2xl md:text-4xl mb-5">
                Percantik Ruanganmu <br /> Dengan Tanamanku
              </h1>
              <h3 className="text-slate-500 text-left text-xl md:text-2xl mb-5">
                Jadikan ruanganmu indah & <br /> sejuk dengan tanaman
              </h3>
              <div className="flex gap-5">
                <Link
                  to="/products"
                  className="px-5 py-3 rounded-full border-2 bg-[#00BB13] text-white border-white font-bold hover:bg-white hover:text-[#00BB13] hover:border-[#00BB13] duration-200"
                >
                  Pesan Sekarang
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[50%] h-full animate__animated animate__backInDown">
            <img
              src={image}
              alt="cat palm home page"
              className="bg-cover h-full mx-auto"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DefaultComponent;
