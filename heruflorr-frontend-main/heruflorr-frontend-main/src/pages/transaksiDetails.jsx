import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const TransaksiDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [invoiceImage, setInvoiceImage] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }
    const fetchDetails = async () => {
      setIsLoading(true);
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
        console.error("Error fetching transaction details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, token]);

  const handleImageChange = (e) => {
    setInvoiceImage(e.target.files[0]);
  };

  const handleUploadInvoice = async () => {
    const formData = new FormData();
    formData.append("invoice_image", invoiceImage);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload/${details.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Berhasil mengupload invoice", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error uploading invoice:", error);
      toast.error("Gagal mengupload invoice", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <ToastContainer />
      <div className="w-[90vw] md:w-1/2 flex flex-col mx-auto">
        <h1 className="text-2xl mb-4 text-center w-full">Detail Transaksi</h1>
        <Link
          to={"/transaksi"}
          className="px-3 py-2 bg-sky-600 w-fit rounded-xl text-white"
        >
          Go Back
        </Link>
        {details ? (
          <>
            {/* Transaksi */}
            <div className="flex flex-col gap-2 mt-4">
              <h1 className="w-full text-center text-2xl">Transaksi</h1>
              {[
                { label: "ID TRANSAKSI", value: details.id },
                { label: "Items", value: details.item },
                { label: "Jenis Pembayaran", value: details.jenis_pembayaran },
                { label: "Total Harga", value: details.harga },
                { label: "Tanggal Acara", value: details.tanggal_eksekusi },
                { label: "Alamat", value: details.alamat },
                {
                  label: "Invoice",
                  value:
                    details.invoice_image_url === null ? (
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
                    ),
                },
                { label: "Status", value: details.status },
              ].map((detail, index) => (
                <div
                  className="flex flex-row justify-center items-center"
                  key={index}
                >
                  <h1 className="w-[40%] flex justify-between pr-5">
                    {detail.label} <p>:</p>
                  </h1>
                  <h1 className="w-[40%]">{detail.value}</h1>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-4"
              />
              <button
                disabled={isLoading}
                onClick={handleUploadInvoice}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
              >
                {isLoading ? "Loading..." : "Upload Invoice "}
              </button>
            </div>
          </>
        ) : (
          <p className="text-center mt-4">Details Transaksi Tidak Ditemukan</p>
        )}
      </div>
    </div>
  );
};

export default TransaksiDetails;
