import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "animate.css";
import axios from "axios";
import { TiShoppingCart } from "react-icons/ti";

const NavbarComponent = () => {
  const [scroll, setScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
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
        setIsAuth(true);
      } catch (error) {
        console.error("Error fetching user details:", error);
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const logout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("cart");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <nav
        className={`flex fixed top-0 w-full justify-between px-5 md:px-20 py-10 items-center z-[9999] max-h-[20vh] transition-colors duration-300 ${
          scroll ? "bg-white/70 backdrop-blur-md" : "bg-white"
        }`}
      >
        <div>
          <h1 className="text-3xl">HeruFlorr</h1>
        </div>
        <div className="hidden md:flex gap-4 md:gap-6">
          <ul className="flex gap-4 md:gap-6 items-center">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/tentang"}>Tentang</Link>
            </li>
            <li>
              <Link to={"/products"}>Product </Link>
            </li>
            <li>
              {token && (
                <Link to={"/cart"} className="relative">
                  <TiShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -bottom-1 -right-4 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
            </li>
            {isAuth && (
              <li>
                <div className="relative">
                  <button
                    onClick={toggleProfileMenu}
                    className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <CgProfile size={24} className="text-white" />
                  </button>
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[9999]">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <Link
                          to={"/profil"}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Profil
                        </Link>
                        <Link
                          to={"/transaksi"}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Transaksi
                        </Link>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="md:hidden flex items-center gap-4">
          {token && (
            <Link to={"/cart"} className="relative">
              <TiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -bottom-2 -right-3 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
          {token && (
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu-mobile"
                aria-haspopup="true"
              >
                <CgProfile size={24} className="text-white" />
              </button>
              {isProfileMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[9999]">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-mobile"
                  >
                    <Link
                      to={"/profil"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Profil
                    </Link>
                    <Link
                      to={"/transaksi"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Transaksi
                    </Link>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <button onClick={handleMenuToggle}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-3/4 bg-white/70 backdrop-blur z-[9998] flex flex-col items-center justify-center animate__animated animate__fadeInDown">
          <ul className="flex flex-col gap-5 ">
            <li>
              <Link to={"/"} onClick={handleMenuToggle} className="text-2xl">
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/tentang"}
                onClick={handleMenuToggle}
                className="text-2xl"
              >
                Tentang
              </Link>
            </li>
            <li>
              <Link
                to={"/products"}
                onClick={handleMenuToggle}
                className="text-2xl"
              >
                Product
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavbarComponent;
