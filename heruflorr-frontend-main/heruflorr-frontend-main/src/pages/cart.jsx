import { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "../components/NavbarComponent";
import { fetchAlamat } from "../api/api";
import PembayaranComponent from "../components/PembayaranComponent";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [hargaSatuan, setHargaSatuan] = useState(0);
  const [total, setTotal] = useState(0);
  const [jenisPembayaran, setJenisPembayaran] = useState("");
  const [tanggalEksekusi, setTanggalEksekusi] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
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
        // eslint-disable-next-line no-unused-vars
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
    calculateTotal(cartItems);
    loadProvinces();
  }, []);

  useEffect(() => {
    if (tanggalEksekusi && tanggalSelesai && cart.length > 0) {
      totalPrice();
    }
  }, [tanggalEksekusi, tanggalSelesai, hargaSatuan]);

  const loadProvinces = async () => {
    try {
      const data = await fetchAlamat("/provinces");
      setProvinces(data);
    } catch (error) {
      console.error("Failed to load provinces:", error);
    }
  };

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    const selectedProvince = provinces.find(
      (province) => province.id === provinceId
    );
    setSelectedProvince(selectedProvince);
    setSelectedCity(null);
    setCities([]);
    setSelectedDistrict(null);
    setDistricts([]);
    setSelectedVillage(null);
    setVillages([]);
    try {
      const data = await fetchAlamat(`/regencies/${provinceId}`);
      setCities(data);
    } catch (error) {
      console.error("Failed to load cities:", error);
    }
  };

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    const selectedCity = cities.find((city) => city.id === cityId);
    setSelectedCity(selectedCity);
    setSelectedDistrict(null);
    setDistricts([]);
    setSelectedVillage(null);
    setVillages([]);
    try {
      const data = await fetchAlamat(`/districts/${cityId}`);
      setDistricts(data);
    } catch (error) {
      console.error("Failed to load districts:", error);
    }
  };

  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    const selectedDistrict = districts.find(
      (district) => district.id === districtId
    );
    setSelectedDistrict(selectedDistrict);
    setSelectedVillage(null);
    setVillages([]);
    try {
      const data = await fetchAlamat(`/villages/${districtId}`);
      setVillages(data);
    } catch (error) {
      console.error("Failed to load villages:", error);
    }
  };

  const handleVillageChange = (e) => {
    const villageId = e.target.value;
    const selectedVillage = villages.find(
      (village) => village.id === villageId
    );
    setSelectedVillage(selectedVillage);
  };

  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.harga, 0);
    setHargaSatuan(totalAmount);
  };

  const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = (end - start) / (1000 * 3600 * 24); // Convert milliseconds to days
    return difference + 1; // Include the start day
  };

  const totalPrice = () => {
    const daysDifference = calculateDaysDifference(
      tanggalEksekusi,
      tanggalSelesai
    );
    if (daysDifference > 0) {
      setTotal(hargaSatuan * daysDifference);
    } else {
      setTotal(0);
      toast.error(
        "Tanggal selesai tidak valid, tidak boleh sebelum tanggal eksekusi",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    toast.error("1 item dihapus dari keranjang!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const checkoutData = cart.map((item) => ({
      user_id: userId,
      item: item.nama,
      harga: total,
      invoice_image_url: null,
      invoice_image_id: null,
      jenis_pembayaran: jenisPembayaran.toUpperCase(),
      tanggal_eksekusi: tanggalEksekusi,
      tanggal_selesai: tanggalSelesai,
      alamat: `${alamat}, ${selectedVillage?.name}, ${selectedDistrict?.name}, ${selectedCity?.name}, ${selectedProvince?.name}`,
    }));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/beli`,
        checkoutData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Berhasil Checkout", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      localStorage.removeItem("cart");
      setCart([]);
      setTotal(0);
      setJenisPembayaran("");
      setTanggalEksekusi("");
      setTanggalSelesai("");
      setAlamat("");
      setSelectedProvince(null);
      setSelectedCity(null);
      setSelectedDistrict(null);
      setSelectedVillage(null);
      setShowPayment(true);
      setTransactionId(response.data.id);

      const event = new Event("cartUpdated");
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Checkout failed:", error.response);
      alert("Checkout failed. Please try again.");
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="relative w-full h-auto">
      {showPayment && (
        <div className="absolute inset-0 flex justify-center items-center z-[25] w-full h-screen bg-black bg-opacity-25">
          <PembayaranComponent id={transactionId} />
        </div>
      )}
      <NavbarComponent />
      <ToastContainer />
      <div className="mt-[20vh] px-5 py-5 w-[90%] md:w-[80%] mx-auto">
        <h1 className="text-2xl mb-4 text-center">Cart</h1>
        <div className="flex flex-row w-full  mx-auto  h-[450px] overflow-y-scroll gap-4 flex-wrap justify-center">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.id}-${index}`} // Use a combination of item id and index as the key
                className="border p-4 mb-4 w-[300px] flex flex-col h-[400px] gap-2 basis-auto"
              >
                <div className="basis-auto w-full h-full">
                  <img
                    src={item.image_url}
                    alt={item.nama}
                    className="w-full h-[190px] object-cover mb-4"
                  />
                </div>
                <div className="basis-1/4 px-5 py-2">
                  <h2 className="text-xl mb-2">{item.nama}</h2>
                  <p className="mb-2">{formatRupiah(item.harga)}</p>
                </div>
                <div className="flex basis-1/4 items-center justify-center">
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <>
            <p className="text-center mt-5 mb-5 text-xl py-5">Checkout</p>
            <form onSubmit={handleCheckout} className="">
              <div className="mb-2">
                <label className="block mb-1">Jenis Pembayaran</label>
                <div className="flex flex-col">
                  {["Qris", "Mandiri", "BNI", "BSI", "Bank DKI"].map(
                    (paymentType) => (
                      <label
                        key={paymentType}
                        className="inline-flex items-center mt-2"
                      >
                        <input
                          type="radio"
                          name="jenisPembayaran"
                          value={paymentType}
                          checked={jenisPembayaran === paymentType}
                          onChange={(e) => setJenisPembayaran(e.target.value)}
                          className="form-radio"
                        />
                        <span className="ml-2">{paymentType}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Tanggal Acara:</label>
                <input
                  type="date"
                  value={tanggalEksekusi}
                  onChange={(e) => setTanggalEksekusi(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Tanggal Selesai:</label>
                <input
                  type="date"
                  value={tanggalSelesai}
                  onChange={(e) => setTanggalSelesai(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Provinsi:</label>
                <select
                  value={selectedProvince?.id || ""}
                  onChange={handleProvinceChange}
                  className="border p-2 w-full"
                  required
                >
                  <option value="">Pilih provinsi</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Kota/Kabupaten:</label>
                <select
                  value={selectedCity?.id || ""}
                  onChange={handleCityChange}
                  className="border p-2 w-full"
                  required
                >
                  <option value="">Pilih kota/kabupaten</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Kecamatan:</label>
                <select
                  value={selectedDistrict?.id || ""}
                  onChange={handleDistrictChange}
                  className="border p-2 w-full"
                  required
                >
                  <option value="">Pilih kecamatan</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Desa/Kelurahan:</label>
                <select
                  value={selectedVillage?.id || ""}
                  onChange={handleVillageChange}
                  className="border p-2 w-full"
                  required
                >
                  <option value="">Pilih desa/kelurahan</option>
                  {villages.map((village) => (
                    <option key={village.id} value={village.id}>
                      {village.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Alamat:</label>
                <input
                  type="text"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <p className="text-center font-bold mt-3 text-xl mb-3">
                Total Harga: {formatRupiah(total)}
              </p>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                Checkout
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
