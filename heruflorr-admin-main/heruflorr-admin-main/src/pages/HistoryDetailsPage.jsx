import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const HistoryDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [dataUser, setDataUser] = useState(null);
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
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/history/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  useEffect(() => {
    if (details) {
      const fetchUserId = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/${details.user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDataUser(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserId();
    }
  }, [details, token]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-10">
      <div className="w-[90vw] md:w-1/2 flex flex-col mx-auto">
        <h1 className="text-2xl mb-4 text-center w-full">Detail Transaksi</h1>
        <Link
          to={details.status === "SELESAI" ? "/riwayat" : "/transaksi"}
          className="px-3 py-2 bg-sky-600 w-fit rounded-xl text-white"
        >
          Go Back
        </Link>
        {/* Transaksi */}
        <div className="flex flex-col gap-2">
          <h1 className="w-full text-center text-2xl">Transaksi</h1>
          <div className="flex flex-row justify-center">
            <h1 className="w-[40%] flex justify-between pr-5">
              ID TRANSAKSI <p>:</p>
            </h1>
            <h1 className="w-[40%]">{details.id}</h1>
          </div>
          <div className="flex flex-row justify-center">
            <h1 className="w-[40%] flex justify-between pr-5">
              Items <p>:</p>
            </h1>
            <h1 className="w-[40%]">{details.item}</h1>
          </div>
          <div className="flex flex-row justify-center">
            <h1 className="w-[40%] flex justify-between pr-5">
              Jenis Pembayaran <p>:</p>
            </h1>
            <h1 className="w-[40%]">{details.jenis_pembayaran}</h1>
          </div>
          <div className="flex flex-row justify-center">
            <h1 className="w-[40%] flex justify-between pr-5">
              Total Harga <p>:</p>
            </h1>
            <h1 className="w-[40%]">{details.harga}</h1>
          </div>
          <div className="flex flex-row justify-center">
            <h1 className="w-[40%] flex justify-between pr-5">
              Tanggal Acara <p>:</p>
            </h1>
            <h1 className="w-[40%]">{details.tanggal_eksekusi}</h1>
          </div>
          <div className="flex flex-row justify-center">
            <h1 className="w-[40%] flex justify-between pr-5">
              Alamat <p>:</p>
            </h1>
            <h1 className="w-[40%]">{details.alamat}</h1>
          </div>
          <div className="flex flex-row justify-center">
            <h1 className="w-[40%] flex justify-between pr-5">
              Invoice <p>:</p>
            </h1>
            <h1 className="w-[40%]">
              {details.invoice_image_url === null ? (
                "Belum Bayar"
              ) : (
                <a
                  href={details.invoice_image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded text-white bg-sky-600"
                >
                  View Invoice
                </a>
              )}
            </h1>
          </div>
          <div className="flex flex-row justify-center">
            <h1 className="w-[40%] flex justify-between pr-5">
              Status <p>:</p>
            </h1>
            <h1 className="w-[40%]">{details.status}</h1>
          </div>
        </div>

        {/* User */}
        {dataUser && (
          <div className="flex flex-col gap-2 mt-10">
            <h1 className="text-center w-full text-2xl">Data User</h1>
            <div className="flex flex-row justify-center">
              <h1 className="w-[40%] flex justify-between pr-5">
                User ID <p>:</p>{" "}
              </h1>
              <h1 className="w-[40%]">{dataUser.id}</h1>
            </div>
            <div className="flex flex-row justify-center">
              <h1 className="w-[40%] flex justify-between pr-5">
                Nama Pembeli <p>:</p>{" "}
              </h1>
              <h1 className="w-[40%]">{dataUser.name}</h1>
            </div>
            <div className="flex flex-row justify-center">
              <h1 className="w-[40%] flex justify-between pr-5">
                Email <p>:</p>{" "}
              </h1>
              <h1 className="w-[40%]">{dataUser.email}</h1>
            </div>
            <div className="flex flex-row justify-center">
              <h1 className="w-[40%] flex justify-between pr-5">
                No Telepon <p>:</p>{" "}
              </h1>
              <h1 className="w-[40%]">{dataUser.no_telp}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryDetails;
