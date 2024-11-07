import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import FormComponent from "../../components/Form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditProductPage = () => {
  const { id } = useParams();
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState(0);
  const [jenis, setJenis] = useState("tanaman kecil");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
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
    fetchById();
  }, []);

  const fetchById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/show/${id}`
      );
      setNama(response.data.nama);
      setHarga(response.data.harga);
      setJenis(response.data.jenis);
      // Ensure we are not setting the image from the fetched data
    } catch (err) {
      console.error(err);
    }
  };

  const updateHandle = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("jenis", jenis);
    formData.append("harga", harga);

    if (image) {
      formData.append("image", image); // Ensure the key is "image" as expected in the backend
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Success",
        text: "Berhasil Update",
        icon: "success",
        confirmButtonText: "Oke",
      });
      navigate("/products");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-3/4 mx-auto flex flex-col items-center mt-20 px-10 py-5 justify-center">
        <h1 className="mb-10 text-2xl text-slate-900">Edit Product</h1>
        <Link to={"/products"}>Go Back</Link>
        {loading ? (
          <div
            aria-label="Loading..."
            role="status"
            className="flex items-center space-x-2"
          >
            <svg
              className="h-20 w-20 animate-spin stroke-gray-500"
              viewBox="0 0 256 256"
            >
              <line
                x1="128"
                y1="32"
                x2="128"
                y2="64"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="195.9"
                y1="60.1"
                x2="173.3"
                y2="82.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="224"
                y1="128"
                x2="192"
                y2="128"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="195.9"
                y1="195.9"
                x2="173.3"
                y2="173.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="128"
                y1="224"
                x2="128"
                y2="192"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="60.1"
                y1="195.9"
                x2="82.7"
                y2="173.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="32"
                y1="128"
                x2="64"
                y2="128"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="60.1"
                y1="60.1"
                x2="82.7"
                y2="82.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
            </svg>
            <span className="text-4xl font-medium text-gray-500">
              Loading...
            </span>
          </div>
        ) : (
          <FormComponent
            nama={nama}
            setNama={setNama}
            harga={harga}
            setHarga={setHarga}
            jenis={jenis}
            setJenis={setJenis}
            setImage={setImage}
            handleSubmit={updateHandle}
          />
        )}
      </div>
    </>
  );
};

export default EditProductPage;
