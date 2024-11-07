/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

import Swal from "sweetalert2";

const CardProduct = ({ id, nama, jenis, harga, image }) => {
  const token = localStorage.getItem("token");

  // Function to format price to Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

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
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "Gagal Menambahkan Data",
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

  return (
    <div className="w-[90%] md:w-[40%] h-[60vh] flex flex-col flex-wrap justify-center px-4 border rounded-xl group">
      <div className="w-full h-[70%] border-b-2 relative ">
        <img src={image} alt={nama} className="w-full h-full rounded-lg" />
        <div className="hidden absolute top-0 right-0 gap-3 px-2 py-2 group-hover:flex">
          <Link
            to={`/products/edit/${id}`}
            className="px-3 py-2 bg-sky-600 rounded-lg"
          >
            <FaRegEdit />
          </Link>
          <button
            onClick={() => confirmDelete(id)}
            className="px-3 py-2 bg-pink-600 rounded-lg"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{nama}</h1>
        <h1>{jenis}</h1>
        <h2>{formatRupiah(harga)}</h2>
      </div>
    </div>
  );
};

export default CardProduct;
