import qr from "../../assets/csan-qr-a.jpg";

const QrComponent = () => {
  return (
    <>
      <div className="w-full h-[500px] mx-auto flex items-center justify-center">
        <img
          src={qr}
          alt="QR Code"
          className="w-full md:w-[60%] h-[80%] mx-auto bg-cover"
        />
      </div>
    </>
  );
};
export default QrComponent;
