import React, { useEffect } from "react";
import success from "../../../public/sucess.gif";
import animation from "../../../public/Animation.json";
import Lottie from "react-lottie";
import Link from "next/link";
import Image from "next/image";

function Success() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    localStorage.removeItem("amount");
    localStorage.removeItem("token");
    localStorage.removeItem("xauth");
    localStorage.removeItem("transactionId");
  }, []);

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-auto h-24 text-center flex justify-center items-center">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
      <p className="text-xl font-semibold py-2 text-green-500">
        Payment Successful !
      </p>
      <small className="text-center text-gray-400 p-3 mb-4">
        Thank you for your purchase. Your order has been placed successfully and
        is being processed.
      </small>
      <div className="mb-3">
        <Link
          href={{
            pathname: localStorage.getItem("callBack_url"),
            query: { status: "success" },
          }}
          className="bg-blue-500 my-4 md:px-4 md:py-2 p-2 text-sm md:text-base text-white shadow rounded "
        >
          Return to Merchant
        </Link>
      </div>
    </div>
  );
}

export default Success;
