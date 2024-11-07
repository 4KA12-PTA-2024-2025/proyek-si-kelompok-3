import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

const FooterComponent = () => {
  return (
    <>
      <footer className="flex flex-col md:flex-row  absolute bottom-0 justify-around w-full mt- md:h-[25vh] bg-[#00BB13]/50 max-h-[60vh]">
        <div className="w-full md:w-[33%] px-7 py-3">
          <h1 className="mb-5 text-xl font-bold">Tentang Kami</h1>
          <h3 className="">
            Heruflorr Jl Pelangi, komplek angkasa pura, Halim Perdana Kusuma
          </h3>
        </div>
        <div className="w-full md:w-[33%] px-7 py-3 ">
          <h1 className="mb-5  text-xl font-bold">Kontak</h1>
          <h3>
            (+62) 818-732-724 <br />
            (+62) 818-0652-9166 <br />
            heruflorr@gmail.com <br />
            heruflorr@yahoo.com
          </h3>
        </div>
        <div className="w-full md:w-[33%] px-7 py-3 ">
          <h1 className="mb-5  text-xl font-bold">Sosial</h1>
          <div className="flex items-center gap-2">
            <BsInstagram />
            <p>heruflorr</p>
          </div>
          <div className="flex items-center gap-2">
            <BsFacebook />
            <p>heruflorr.art</p>
          </div>
          <div className="flex items-center gap-2">
            <BsWhatsapp />
            <p>0818732724</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterComponent;
