import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const inputEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/password/email`, {
        email
      });
      if (response.status === 200) {
        toast.success("Berhasil mengirim Link, Cek Email Anda");
      }
    } catch (e) {
      toast.error("Gagal mengirimkan Link");
      console.error(e);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-100 flex flex-col items-center justify-center h-screen">
        <h1 className="mb-10 text-2xl text-[#00BB13]">HeruFlorr</h1>
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Lupa Password</h1>
          <form id="resetPasswordForm" className="space-y-4" onSubmit={inputEmail}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                placeholder="Masukkan email Anda"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00BB13] hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
              >
                Kirim Link Reset Password
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm flex justify-center items-center">
            <Link to="/login" className="text-[#00BB13] hover:text-lime-500">
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
  