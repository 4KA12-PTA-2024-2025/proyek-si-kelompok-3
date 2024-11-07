import NavbarComponent from "../components/NavbarComponent";

import image from "../assets/tentang.png";
import FooterComponent from "../components/FooterComponent";

const TentangPage = () => {
  return (
    <>
      <NavbarComponent />
      <div className="min-h-[100vh] relative">
        <div className="flex flex-col-reverse mt-[20vh] pb-[60vh] md:flex-row  w-full items-center">
          <div className="w-full md:w-[50%] flex flex-col md:justify-center h-full">
            <div className="mx-auto w-3/4 animate__animated animate__bounceInUp">
              <h1 className="text-3xl font-bold mb-10">HeruFlorr</h1>
              <h3>
                Heruflor adalah perusahaan yang bergerak dibidang jasa penyewaan
                tanaman hias. didirikan oleh Bapak Heru sejak tahun 2003 telah
                banyak kantor kantor menggunakan jasa kami. Mulai dari
                perusahaan BUMN, bank, kantor hingga perusahaan swasta.
              </h3>
            </div>
          </div>

          <div className="w-full md:w-[50%] md:h-full mb-20 md:mb-0">
            <img
              src={image}
              alt="cat palm home page "
              className="bg-cover h-full mx-auto animate__animated animate__bounceInDown  "
            />
          </div>
        </div>
        <FooterComponent />
      </div>
    </>
  );
};

export default TentangPage;
