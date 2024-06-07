"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import LeftNav from "./components/LeftNav";
import Image from "next/image";
import logo from "../../public/Eganowlogo.png";
import logo2 from "../../public/Eganowlogo2jpg.jpg";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Amount } from "./constants";
import { usePathname, useRouter, useParams } from "next/navigation";
import { Toaster } from "sonner";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { defaultFormValues } from "./defaultFormValues";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Eganow payment page",
//   description: "payment page with card or mobile money",
// };

export default function RootLayout({ children }) {



 

  

 
  return (
    <html lang="en">
      <Toaster richColors position="top-center" />
      {/* <p className="text-red-500">hello</p>
      <body className={inter.className}>{children}</body> */}
      <body className="grid place-items-center h-screen bg-[#304767] login-bg ">
        <div className="w-full grid place-items-center ">
          <div className="flex  lg:w-[33%] w-[90%] sm:w-[60%] mt-10 sm:mt-0  rounded-lg drop-shadow-xl bg-white ">
            <div className="  sm:min-w-[25%] w-[20%] bg-[#CF122B] text-white rounded-s-lg">
              <ul className="  flex flex-col   p-4  ">
                <li className="font-bold uppercase  hidden sm:block  py-2 my-2 pl-2">
                  pay with{" "}
                </li>
                {/* <hr className="border-gray-300" /> */}
                <LeftNav />
              </ul>
            </div>
            <div className="  w-full shadow-xl p-5 ">
              
              {children}
            </div>
          </div>
          <p className="text-gray-300 pt-5 font-thin inline-flex items-center gap-2">
            <FaLock />
            Secured by <span className="font-bold shadow-xl">Eganow</span>
          </p>
        </div>
      </body>
    </html>
  );
}
