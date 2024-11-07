import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const UserComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear the token from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      // Show success alert
      Swal.fire({
        title: "Success",
        text: "You have been logged out successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirect to the login page
        navigate("/login");
      });
    } catch (error) {
      // Show error alert
      Swal.fire({
        title: "Error",
        text: "There was an error during logout.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <>
      <div className="relative">
        <button
          disabled={loading}
          onClick={confirmLogout}
          className="px-4 py-2 bg-pink-600 text-white rounded"
        >
          {loading ? "Loading.." : "Logout"}
        </button>
      </div>
    </>
  );
};

export default UserComponent;
