"use client";
import React, { useEffect, useRef, useState } from "react";

import Pending from "../components/Pending";
import Success from "../components/Success";
import Failed from "../components/Failed";
import axios from "axios";
import dynamic from "next/dynamic";

function Page() {
  const [transactionStatus, setTransactionStatus] = useState("PENDING");
  const [savedTransactionId, setSavedTransactionId] = useState("");
  const [token, setToken] = useState("");
  const statusRef = useRef(transactionStatus);

  // FUNCTION TO CHECK TRANSACTION STATUS
  const getStats = async () => {
    const data = {
      token: token,
      transactionId: savedTransactionId,
      xAuth: localStorage.getItem("xauth")
    };

    // console.log(data);
    try {
      const response = await axios.post("/api/transactionstatus/", data);
      return response.data.data.TransStatus;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // console.log(transactionStatus);

  useEffect(() => {
    statusRef.current = transactionStatus;
    setSavedTransactionId(localStorage.getItem("transactionId"));
    setToken(localStorage.getItem("token"));
  }, [transactionStatus]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await getStats();
      setTransactionStatus(status);

      if (status === "SUCCESSFUL" || status === "FAILED") {
        clearInterval(interval);
      }
    }, 5000); // Check every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [savedTransactionId, token]);

  const renderStatusComponent = () => {
    switch (transactionStatus) {
      case "SUCCESSFUL":
        return <Success />;
      case "FAILED":
        return <Failed />;
      default:
        return <Pending />;
    }
  };

  return <div>{renderStatusComponent()}</div>;
}

export default Page;
