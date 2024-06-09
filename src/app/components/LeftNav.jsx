"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoCard } from "react-icons/io5";
import { MdOutlineMobileScreenShare } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

export default function LeftNav() {
  const pathname = usePathname();
  const [session, setSession] = useState("");
  // console.log(pathname);
console.log(session);
  const items = [
    {
      id: 1,
      title: "Card",
      icon: <IoCard />,
      href: `/${session}`,
    },
    // {
    //   id: 2,
    //   title: "Momo",
    //   icon: <MdOutlineMobileScreenShare />,
    //   href: "/momo",
    // },
  ];

  useEffect(() => {
    setSession(sessionStorage.getItem("p_key"));
  }, [session]);

  const renderItems = () => {
    return items.map((item) => {
      return (
        <Link href={item.href} key={item.id} className="hover:bg-emerald-900">
          {/* <hr className=" border-gray-300"/> */}

          <hr className=" border-gray-300 border-opacity-50" />
          <li
            className={clsx({
              "font-medium  p-2 my-4  rounded  ": true,
              "bg-white text-gray-600 ": pathname === item.href,
            })}
            style={{
              cursor: "pointer",
            }}
          >
            <div className="flex justify-center sm:justify-between items-center ">
              <div className="flex items-center gap-x-1  ">
                {item.icon}
                <p className="hidden sm:block">{item.title}</p>
              </div>
              {/* {pathname === item.href &&  <GoDotFill size={15} className="hidden sm:block" />} */}
            </div>
          </li>
        </Link>
      );
    });
  };

  return <div>{renderItems()}</div>;
}
