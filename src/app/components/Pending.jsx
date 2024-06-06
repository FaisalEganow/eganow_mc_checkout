import axios from "axios";
import React, { useState } from "react";
import { Grid } from "react-loader-spinner";
import { URL } from "../constants";

function Pending() {
  const [loader, setLoader] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [amount, setAmount] = useState("");


  const redirectContainerRef = React.useRef(); //frame contaner

  // FUNCTION TO CHECK TRANSACTION STATUS 
  async function checkStatus() {
    const getPKey = sessionStorage.getItem('p_key')
    try {
      const response = await axios.post("/api/transactionstatus", {key:getPKey});
      console.log(response.data);
      // return response.data.data.TransStatus;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  React.useEffect(() => {
    checkStatus()
    setAmount(localStorage.getItem("amount"));
    setPaymentUrl(localStorage.getItem("3ds").replace(/\\/g, ''));
    if (redirectContainerRef.current) {
      // Set the HTML content
      redirectContainerRef.current.innerHTML = paymentUrl;

      // Execute the script
      const scriptElement =
        redirectContainerRef.current.querySelector("script");

      // console.log(scriptElement);
      if (scriptElement) {
        // Create a new script element to execute the script
        const newScript = document.createElement("script");
        newScript.innerHTML = scriptElement.innerHTML;
        document.body.appendChild(newScript);

        const divEl = redirectContainerRef.current.querySelector(
          "#threedsChallengeRedirect"
        );

        if (divEl) {
          divEl.style.height = "100%";
        }


        const iFrame =
          redirectContainerRef.current.querySelector("#challengeFrame"); //iframe container
        if (iFrame) {
          // iFrame.style.width = "100%";
          // iFrame.style.height = "100%";

          // Add event listener to detect when iframe has finished loading
          iFrame.addEventListener("load", () => {

            // Show iframe
            redirectContainerRef.current.style.width = "100%";
            redirectContainerRef.current.style.height = "100%";
            redirectContainerRef.current.style.display = "block";
          });
        }

        // Remove the original script element to avoid duplication
        scriptElement.parentNode.removeChild(scriptElement);
      }
    }
  }, [paymentUrl]);

  return (
    <div className="flex flex-col items-center mt-5 h-[500px]">
      {
        !paymentUrl &&

        <div className="w-24 h-[80%] text-center flex justify-center items-center">
          <Grid
            visible={true}
            height="40"
            width="40"
            color="lightgray"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperClass="grid-wrapper"
          />
        </div>
      }
      {!paymentUrl && (
        <div className="text-center pb-2">
          <p className="text-xl font-semibold py-3 text-gray-700">
            Payment Initiated
          </p>
          {/* <small className="text-center text-gray-400 ">
            We've initiated your payment of GH{amount} . Kindly check your phone
            and approved the payment.
          </small> */}
        </div>
      )}
      <div
        // style={{ height: "500px", display: "none" }}
        className="h-[500px]"
        ref={redirectContainerRef}
      ></div>
    </div>
  );
}

export default Pending;
