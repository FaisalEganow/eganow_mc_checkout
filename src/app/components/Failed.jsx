import React from "react";
import success from "../../../public/sucess.gif";
import failed from "../../../public/remove.png";
import Link from "next/link";
import Image from "next/image";

function Failed() {
  const handleDoneClick = () => {
    // Notify the parent window that payment was successful
    window.parent.postMessage("failed", "*");
  };
  return (
    <div className="flex flex-col items-center mt-5 py-5">
      <div className="w-24 h-24 text-center flex justify-center items-center">
        <Image src={failed} alt="" width={300} height={300} />
      </div>
      <p className="text-xl font-semibold py-2 text-red-700">
        Payment Failed !
      </p>
      <small className="text-center text-gray-400 mb-5">
        Unfortunately, your payment could not be processed. Please try again or
        use a different payment method.
      </small>
      <div>
        <button
          onClick={() => handleDoneClick}
          // href={{
          //   pathname: localStorage.getItem("callBack_url"),
          //   // query: { status: "failed" },
          // }}
          className="bg-blue-500 my-4 md:px-4 md:py-2 p-2 text-sm md:text-base text-white shadow rounded hover:bg-red-500 active:bg-red-700"
        >
          Return to Merchant
        </button>{" "}
      </div>
    </div>
  );
}

export default Failed;
