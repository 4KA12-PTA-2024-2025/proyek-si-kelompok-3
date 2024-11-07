/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { GetProducts } from "../api/api";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
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
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await GetProducts();
        setLoading(false);
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error); // Log any errors
      }
    };

    fetchProducts();
  }, []);

  const deleteHandle = async (productId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Success",
        text: "Berhasil Menghapus Data",
        icon: "success",
        confirmButtonText: "oke",
      });
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "Gagal Menghapus Data",
        icon: "error",
        confirmButtonText: "oke",
      });
    }
  };

  const confirmDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHandle(productId);
      }
    });
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <div className="mt-[70px] px-5 md:px-20">
        <h1 className="mb-10 text-2xl">Data Product</h1>
        <Link
          to={"/products/add"}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 cursor-pointer mt-5 text-white"
        >
          + Add Product
        </Link>
      </div>
      {loading ? (
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center space-x-2 h-full w-full justify-center"
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
          <span className="text-4xl font-medium text-gray-500">Loading...</span>
        </div>
      ) : (
        <div className="md:pl-20 flex flex-row w-full flex-wrap gap-5 justify-start py-10">
          {products.map((product, i) => (
            <div
              key={i}
              className="w-[90%] md:w-[40%] h-[60vh] flex flex-col flex-wrap justify-center px-4 border rounded-xl group"
            >
              <div className="w-full h-[70%] border-b-2 relative ">
                <img
                  src={product.image_url}
                  alt={product.nama}
                  className="w-full h-full rounded-lg"
                />
                <div className="hidden absolute top-0 right-0 gap-3 px-2 py-2 group-hover:flex">
                  <Link
                    to={`/products/edit/${product.id}`}
                    className="px-3 py-2 bg-sky-600 rounded-lg"
                  >
                    <FaRegEdit />
                  </Link>
                  <button
                    onClick={() => confirmDelete(product.id)}
                    className="px-3 py-2 bg-pink-600 rounded-lg"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{product.nama}</h1>
                <h1>{product.jenis}</h1>
                <h2>{formatRupiah(product.harga)}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsPage;
