import { Link } from "react-router-dom";
import image from "../assets/home.png";

const GuestComponent = () => {
  return (
    <>
      <div className="flex w-full h-[70vh] mt-[20vh]">
        <div className="w-full px-10 md:w-[50%] flex flex-col justify-center">
          <div className="mx-auto animate__animated animate__bounceInLeft">
            <h3 className="text-slate-500 text-left text-xl md:text-2xl mb-5">
              Halo, Selamat Datang
            </h3>
            <h1 className="text-slate-500 text-left text-2xl md:text-4xl mb-5">
              Percantik Ruanganmu <br /> Dengan Tanamanku
            </h1>
            <h3 className="text-slate-500 text-left text-xl md:text-2xl mb-5">
              Percantik RuangJadikan ruanganmu indah & <br /> sejuk dengan
              tanaman
            </h3>
            <div className="flex gap-5">
              <Link
                to={"/register"}
                className="px-5 py-3 rounded-full border-2 bg-[#00BB13] text-white border-white font-bold hover:bg-white hover:text-[#00BB13] hover:border-[#00BB13] duration-200"
              >
                Daftar
              </Link>
              <Link
                to={"/login"}
                className="px-5 py-3 rounded-full border-2 hover:bg-[#00BB13] hover:text-white hover:border-white font-bold bg-white text-[#00BB13] border-[#00BB13] duration-200"
              >
                Masuk
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-[50%] h-full">
          <img
            src={image}
            alt="cat palm home page "
            className="bg-cover h-full mx-auto animate__animated animate__bounceInRight"
          />
        </div>
      </div>
    </>
  );
};

export default GuestComponent;
