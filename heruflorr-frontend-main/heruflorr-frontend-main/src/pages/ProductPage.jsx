import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import { useState, useEffect } from "react";
import { GetProducts } from "../api/api";
import { FaCartPlus } from "react-icons/fa";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import { Link } from "react-router-dom";

const TanamanPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedProducts, setAddedProducts] = useState(new Set()); // track added products
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await GetProducts();

        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error); // Log any errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setAddedProducts((prevAddedProducts) =>
      new Set(prevAddedProducts).add(product.id)
    );
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.nama} ditambahkan ke keranjang!`, {
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

    // Emit custom event
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Filter products into "Tanaman Besar" and "Tanaman Kecil"
  const tanamanBesar = products.filter(
    (product) => product.jenis === "tanaman besar"
  );
  const tanamanKecil = products.filter(
    (product) => product.jenis === "tanaman kecil"
  );

  return (
    <>
      <NavbarComponent />
      <div className="relative min-h-[100vh] w-full mt-[20vh]">
        <ToastContainer />
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
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
          <>
            {/* Tanaman Besar Section */}
            <div className="w-full px-3 pb-20">
              <h2 className="text-3xl mb-5">Tanaman Besar</h2>
              <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                {tanamanBesar.map((product) => (
                  <div
                    className="flex flex-col border-2 flex-wrap w-full max-w-[300px] h-[400px]  rounded-xl group animate__animated animate__backInLeft"
                    key={product.id}
                  >
                    {/* card */}
                    <div className="w-full h-[70%] py-2 px-2 group-hover:px-0 group-hover:py-0  duration-150">
                      <img
                        src={product.image_url}
                        alt={product.nama} // Provide alt text for accessibility
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="max-h-[30%] h-[30%] flex flex-col items-center justify-between px-2 pb-2">
                      <div>
                        <h1 className="text mb-1 text-xl text-center">
                          {product.nama}
                        </h1>
                        <h1 className="text mb-5 text-center">
                          {formatRupiah(product.harga)}
                        </h1>
                      </div>
                      {!token ? (
                        <Link
                          to={"/login"}
                          className="bg-[#00BB13] text-white p-2 px-2 rounded-xl hover:bg-green-600 w-full flex items-center justify-center gap-4 duration-200"
                        >
                          Masukkan Ke Cart
                        </Link>
                      ) : (
                        <button
                          disabled={addedProducts.has(product.id)}
                          className="bg-[#00BB13] text-white p-2 px-2 rounded-xl hover:bg-green-600 w-full flex items-center justify-center gap-4 duration-200"
                          onClick={() => addToCart(product)}
                        >
                          <FaCartPlus className="text-xl " />
                          <h3>
                            {addedProducts.has(product.id)
                              ? "Ditambahkan"
                              : "Masuk Keranjang"}
                          </h3>
                        </button>
                      )}
                    </div>
                    {/* end of card */}
                  </div>
                ))}
              </div>
            </div>
            {/* end of Tanaman Besar Section */}

            {/* Tanaman Kecil Section */}
            <div className="w-full px-3 pb-[60vh]">
              <h2 className="text-3xl mb-5">Tanaman Kecil</h2>
              <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                {tanamanKecil.map((product) => (
                  <div
                    className="flex flex-col border-2 flex-wrap w-full max-w-[300px] h-[400px] rounded-xl group animate__animated animate__backInLeft"
                    key={product.id}
                  >
                    {/* card */}
                    <div className="w-full h-[70%] py-2 px-2 group-hover:px-0 duration-150 group-hover:py-0 ">
                      <img
                        src={product.image_url}
                        alt={product.nama} // Provide alt text for accessibility
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="max-h-[30%] h-[30%] flex flex-col items-center justify-between px-2 pb-2 ">
                      <div>
                        <h1 className="text mb-1 text-xl text-center">
                          {product.nama}
                        </h1>
                        <h1 className="text mb-5 text-center">
                          {formatRupiah(product.harga)}
                        </h1>
                      </div>
                      {!token ? (
                        <Link
                          to={"/login"}
                          className="bg-[#00BB13] text-white p-2 px-2 rounded-xl hover:bg-green-600 w-full flex items-center justify-center gap-4 duration-200"
                        >
                          Masukkan Ke Cart
                        </Link>
                      ) : (
                        <button
                          disabled={addedProducts.has(product.id)}
                          className="bg-[#00BB13] text-white p-2 px-2 rounded-xl hover:bg-green-600 w-full flex items-center justify-center gap-4 duration-200"
                          onClick={() => addToCart(product)}
                        >
                          <FaCartPlus className="text-xl " />
                          <h3>
                            {addedProducts.has(product.id)
                              ? "Ditambahkan"
                              : "Masuk Keranjang"}
                          </h3>
                        </button>
                      )}
                    </div>
                    {/* end of card */}
                  </div>
                ))}
              </div>
            </div>
            {/* end of Tanaman Kecil Section */}
          </>
        )}
        <FooterComponent />
      </div>
    </>
  );
};

export default TanamanPage;
