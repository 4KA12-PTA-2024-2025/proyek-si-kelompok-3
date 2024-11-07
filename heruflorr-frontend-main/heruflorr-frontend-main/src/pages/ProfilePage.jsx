import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import NavbarComponent from "../components/NavbarComponent";

const ProfilePage = () => {
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    no_telp: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDataUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
      }
    };

    fetchUserId();
  }, [userId, token]);

  const getInitials = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New Password Doesnt Match ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const updatedData = { ...dataUser };
    if (newPassword) {
      updatedData.password = newPassword;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(true);
      setIsEditing(false);
      // Fetch updated user data
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Data Berhasil Diedit", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      setDataUser(response.data);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating user details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container py-10 mx-auto w-[90vw] md:w-[50vw]">
        <ToastContainer />
        <div className="flex flex-col gap-2 mt-10">
          <div>
            <h1 className="text-center w-full text-2xl">Profil Anda</h1>
          </div>
          <div className="flex justify-center">
            <div className="px-3 py-3 rounded-full bg-lime-600 text-white flex items-center justify-center w-12 h-12 text-xl">
              {getInitials(dataUser.name)}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-row justify-center">
              <label className="w-[40%] flex justify-between pr-5">
                Nama <p>:</p>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={dataUser.name}
                  onChange={handleChange}
                  className="w-[40%] border rounded px-2 py-1"
                />
              ) : (
                <p className="w-[40%]">{dataUser.name}</p>
              )}
            </div>
            <div className="flex flex-row justify-center">
              <label className="w-[40%] flex justify-between pr-5">
                Email <p>:</p>
              </label>

              <p className="w-[40%]">{dataUser.email}</p>
            </div>
            <div className="flex flex-row justify-center">
              <label className="w-[40%] flex justify-between pr-5">
                No Telepon <p>:</p>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="no_telp"
                  value={dataUser.no_telp}
                  onChange={handleChange}
                  className="w-[40%] border rounded px-2 py-1"
                />
              ) : (
                <p className="w-[40%]">{dataUser.no_telp}</p>
              )}
            </div>
            {isEditing && (
              <>
                <div className="flex flex-row justify-center">
                  <label className="w-[40%] flex justify-between pr-5">
                    Password Lama <p>:</p>
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={handlePasswordChange}
                    className="w-[40%] border rounded px-2 py-1"
                  />
                </div>
                <div className="flex flex-row justify-center">
                  <label className="w-[40%] flex justify-between pr-5">
                    Password Baru <p>:</p>
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    className="w-[40%] border rounded px-2 py-1"
                  />
                </div>
                <div className="flex flex-row justify-center">
                  <label className="w-[40%] flex justify-between pr-5">
                    Konfirmasi Password Baru <p>:</p>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-[40%] border rounded px-2 py-1"
                  />
                </div>
              </>
            )}
            {isEditing && (
              <div className="flex justify-center">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  disabled={isLoading}
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded ml-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
          {!isEditing && (
            <div className="flex justify-center">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
