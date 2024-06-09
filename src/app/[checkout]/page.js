"use client";
import { useForm } from "react-hook-form";
import { defaultFormValues } from "../defaultFormValues";
import { validationSchema } from "../validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { GiTakeMyMoney } from "react-icons/gi";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/lib/styles.scss";
import { customAlphabet } from "nanoid";
import { useEffect, useState } from "react";
import { Grid, Rings } from "react-loader-spinner";
import { Amount, URL } from "../constants";
import { useParams, usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import SkeletonLoader from "./SkeletonLoader";
import Image from "next/image";
import logo from "../../../public/Eganowlogo.png";
import logo2 from "../../../public/Eganowlogo2jpg.jpg";
export default function Home({ params }) {
  const [token, setToken] = useState(false);
  const [loader, setLoader] = useState(true);
  const [amount, setAmount] = useState("");

  const pathname = usePathname();

  //NOTE - useform
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultFormValues,
  });
  const router = useRouter();

  const p_key = params.checkout;
  // save key to session storage
  // sessionStorage.setItem("p_key", p_key);

  const nanoid = customAlphabet("0123456789", 12);

  const getTokenData = async () => {
    // setLoader(true);
    try {
      const getData = await axios.get(`api/credentials/${p_key}`);
      if (getData.data.customer_id) {
        setLoader(false);
        setToken(getData.data.token);
        setValue("amount", getData.data.amount);
        setAmount(getData.data.amount);
        localStorage.setItem("customer_id", getData.data.customer_id);
        localStorage.setItem("amount", getData.data.amount);
        localStorage.setItem("ip_address", getData.data.ip_address);
        localStorage.setItem("callBack_url", getData.data.callback_url);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      if (error.response.status == 500) {
        toast.error("something went wrong, please try again");
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem("p_key", p_key);
  }, []);

  useEffect(() => {
    getTokenData();
  }, [token]);

  const onSubmit = async (values) => {
    const data = {
      amount: getValues("amount"),
      customer_id: localStorage.getItem("customer_id"),
      p_key: sessionStorage.getItem("p_key"),
      ...values,
    };

    console.log(data);
    try {
      const response = await axios.post("/api/makecollection/", data);
      if (response?.data.data) {
        localStorage.setItem("3ds", response.data.data.threeds_html);
        router.push("/processing");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    setAmount(watch("amount"));
  }, [watch("amount")]);

  return (
    <div className="">
      {loader ? (
        <SkeletonLoader />
      ) : (
        <div>
         
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg mt-1 pb-5 "
          >
             <div className="flex  justify-between items-center pb-4">
            <Image
              src={logo}
              className="hidden sm:block"
              width={100}
              alt="logo 1"
            />
            <Image
              src={logo2}
              className="block sm:hidden"
              width={30}
              alt="logo 2"
            />
            {pathname !== "/processing" && (
              <div className="text-sm sm:text-base text-gray-600">
                {loader ? (
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                ) : (
                  <p className="">
                    Pay{" "}
                    <span className="text-blue-500 font-medium">
                      GHS {new Intl.NumberFormat().format(amount)}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
            <h1 className="text-center font-semibold text-md mb-3 text-gray-500">
              Enter your card details to pay
            </h1>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 relative">
                <label
                  className=" block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2 relative "
                  htmlFor="grid-password"
                >
                  Amount
                </label>

                <input
                  className={clsx({
                    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                    "border-green-500 border-2":
                      formState.dirtyFields?.amount &&
                      !!!formState.errors?.amount === true,
                    "border-red-500 border-2":
                      !!formState.errors?.amount === true,
                  })}
                  id=""
                  type="number"
                  {...register("amount")}
                  placeholder="Enter amount to pay"
                />

                {formState?.errors?.amount?.message && (
                  <p className="text-sm text-red-500">
                    {formState?.errors?.amount?.message}
                  </p>
                )}
              </div>

              <div className="w-full px-3 relative">
                <label
                  className=" block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2 relative "
                  htmlFor="grid-password"
                >
                  CARD NUMBER
                </label>

                <input
                  className={clsx({
                    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                    "border-green-500 border-2":
                      formState.dirtyFields?.accountNoOrCardNoOrMSISDN &&
                      !!!formState.errors?.accountNoOrCardNoOrMSISDN === true,
                    "border-red-500 border-2":
                      !!formState.errors?.accountNoOrCardNoOrMSISDN === true,
                  })}
                  id=""
                  type="number"
                  {...register("accountNoOrCardNoOrMSISDN")}
                  placeholder="0000 0000 0000 0000"
                />

                <div className="card absolute -top-[49px] -right-[100px]">
                  <Cards
                    number={watch("accountNoOrCardNoOrMSISDN")}
                    expiry={27}
                    cvc={watch("cvv")}
                    name={"leonard adjei"}
                    size={40}
                    // focused={state.focus}
                  />
                </div>
                {formState?.errors?.accountNoOrCardNoOrMSISDN?.message && (
                  <p className="text-sm text-red-500">
                    {formState?.errors?.accountNoOrCardNoOrMSISDN?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 ">
                <label
                  className=" block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2  "
                  htmlFor="grid-password"
                >
                  Name on card
                </label>

                <input
                  className={clsx({
                    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                    "border-green-500 border-2":
                      formState.dirtyFields?.name &&
                      !!!formState.errors?.name === true,
                    "border-red-500 border-2":
                      !!formState.errors?.name === true,
                  })}
                  id=""
                  type="text"
                  {...register("name")}
                  placeholder="Enter your name"
                />

                {formState?.errors?.name?.message && (
                  <p className="text-sm text-red-500">
                    {formState?.errors?.name?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-2 ">
              <div className=" mb-4 md:mb-0 ">
                <label
                  className=" block uppercase tracking-wide text-gray-500 text-xs md: font-medium mb-2 truncate "
                  htmlFor="grid-first-name"
                >
                  EXP MONTH
                </label>
                <input
                  className={clsx({
                    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                    "border-green-500 border-2":
                      formState.dirtyFields?.expiryMonth &&
                      !!!formState.errors?.expiryMonth === true,
                    "border-red-500 border-2":
                      !!formState.errors?.expiryMonth === true,
                  })}
                  id="grid-first-name"
                  type="text"
                  placeholder="MM"
                  {...register("expiryMonth")}
                />
                {formState?.errors?.expiryMonth?.message && (
                  <p className="text-sm text-red-500 hidden sm:block">
                    {formState?.errors?.expiryMonth?.message}hidden sm:block
                  </p>
                )}
              </div>
              <div className="   mb-4">
                <label className=" block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2 truncate">
                  EXP YEAR
                </label>
                <input
                  className={clsx({
                    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                    "border-green-500 border-2":
                      formState.dirtyFields?.expiryYear &&
                      !!!formState.errors?.expiryYear === true,
                    "border-red-500 border-2":
                      !!formState.errors?.expiryYear === true,
                  })}
                  type="number"
                  placeholder="YY"
                  {...register("expiryYear")}
                />
                {formState?.errors?.expiryYear?.message && (
                  <p className="text-sm text-red-500 hidden sm:block">
                    {formState?.errors?.expiryYear?.message}
                  </p>
                )}
              </div>
              <div className="  ">
                <label className=" block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2 truncate">
                  CARD CVV
                </label>
                <input
                  className={clsx({
                    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                    "border-green-500 border-2":
                      formState.dirtyFields?.cvv &&
                      !!!formState.errors?.cvv === true,
                    "border-red-500 border-2": !!formState.errors?.cvv === true,
                  })}
                  type="number"
                  placeholder="123"
                  {...register("cvv")}
                />
                {formState?.errors?.cvv?.message && (
                  <p className="text-sm text-red-500 hidden sm:block">
                    {formState?.errors?.cvv?.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="bg-[#1f8fff] w-full flex justify-center items-center  text-white p-2 rounded-lg cursor-pointer active:bg-green-800"
            >
              {formState.isSubmitting ? (
                <Rings
                  visible={true}
                  height="30"
                  width="30"
                  color="white"
                  ariaLabel="rings-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <GiTakeMyMoney size={25} />
                  Pay
                </div>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
