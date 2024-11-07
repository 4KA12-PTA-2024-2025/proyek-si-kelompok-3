import { FaRegCopy } from "react-icons/fa6";
import { useState } from "react";
import logo from "../../assets/BSI (Bank Syariah Indonesia) Logo (PNG480p) - Vector69Com.png";
// import ToastComponent from "./ToastComponent";
// import toast from "solid-toast";

const BsiComponent = () => {
  // eslint-disable-next-line no-unused-vars
  const [copySuccess, setCopySuccess] = useState("");

  const textToCopy = "0192031203913";
  const handleCopyText = () => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
        // toast.success("success copy");
      },
      (err) => {
        setCopySuccess("Failed to copy!");
        setTimeout(() => setCopySuccess(""), 2000); // Reset after 2 seconds
        console.error("Failed to copy text: ", err);
      }
    );
  };
  return (
    <>
      <div className="w-[90%] mx-auto md:w-3/4 h-[30%] flex  flex-col  px-4 py-4">
        {/* <h1 className="text-2xl">Transfer Mandiri</h1> */}
        <div className="flex items-center gap-5 justify-around">
          <img src={`${logo}`} className="w-[70px] h-[50px] bg-cover" alt="" />
          <p className="text-xl">{textToCopy}</p>

          <button onClick={handleCopyText}>
            <FaRegCopy className="text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BsiComponent;
