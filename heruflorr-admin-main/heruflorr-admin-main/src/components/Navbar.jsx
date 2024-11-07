import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import UserComponent from "./UserComponent";

const NavbarComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="flex md:hidden justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 w-full z-10 h-[70px]">
        <button onClick={handleMenuToggle}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <UserComponent />
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-3/4 mt-[70px]  bg-white/70 backdrop-blur z-20 flex flex-col items-center justify-center animate__animated animate__fadeInDown">
          <ul className="flex flex-col gap-5 text-center">
            <li>
              <Link to="/" onClick={handleMenuToggle} className="text-2xl">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/transaksi"
                onClick={handleMenuToggle}
                className="text-2xl"
              >
                Transaksi
              </Link>
            </li>
            <li>
              <Link
                to="/riwayat"
                onClick={handleMenuToggle}
                className="text-2xl"
              >
                Riwayat Transaksi
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={handleMenuToggle}
                className="text-2xl"
              >
                Products
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavbarComponent;
