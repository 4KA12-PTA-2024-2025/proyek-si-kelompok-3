import { Link } from "react-router-dom";
import { FaBars, FaHome, FaHistory } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";

// eslint-disable-next-line react/prop-types
const SidebarComponent = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`bg-gray-800 text-white fixed hidden md:block top-0 left-0 h-screen transition-all duration-300 z-10 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col items-center p-4 mb-10">
        <Link to="/" className="flex items-center mb-4">
          <FaHome className="text-2xl" />
          {sidebarOpen && (
            <h1 className="text-2xl ml-2 cursor-pointer">HeruFlorr</h1>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-white font-bold text-xl"
        >
          {sidebarOpen ? "<<" : <FaBars />}
        </button>
      </div>
      <ul className="flex flex-col items-center ">
        <li className={`p-4 ${sidebarOpen && "justify-start w-[200px]"} `}>
          <Link to="/transaksi" className="flex items-center">
            <GrTransaction className="text-lg" />
            {sidebarOpen && <h1 className="ml-2">Transaksi</h1>}
          </Link>
        </li>
        <li className={`p-4 ${sidebarOpen && "justify-start w-[200px]"} `}>
          <Link to="/riwayat" className="flex items-center">
            <FaHistory className="text-lg" />
            {sidebarOpen && <h1 className="ml-2">Riwayat Transaksi</h1>}
          </Link>
        </li>
        <li className={`p-4 ${sidebarOpen && "justify-start w-[200px]"} `}>
          <Link to="/products" className="flex items-center">
            <AiFillProduct className="text-lg" />
            {sidebarOpen && <h1 className="ml-2">Products</h1>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarComponent;
