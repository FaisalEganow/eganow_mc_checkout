import React, { useState } from "react";
import { Grid } from "react-loader-spinner";

function Pending() {
  const [loader, setLoader] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [amount, setAmount] = useState("");
  // const paymentUrl = localStorage.getItem('3ds');
  // const paymentUrl = '';
  //
  const redirectContainerRef = React.useRef(); //frame contaner
  // useEffect(() => {

    
  // },[paymentUrl])

  // console.log(localStorage.getItem("3ds"));
  
  React.useEffect(() => {
    setAmount(localStorage.getItem("amount"));
    setPaymentUrl(localStorage.getItem("3ds"));
    if (redirectContainerRef.current) {
      // Set the HTML content
      redirectContainerRef.current.innerHTML = paymentUrl;

      // Execute the script
      const scriptElement =
        redirectContainerRef.current.querySelector("script");
      if (scriptElement) {
        // Create a new script element to execute the script
        const newScript = document.createElement("script");
        newScript.innerHTML = scriptElement.innerHTML;
        document.body.appendChild(newScript);

        const divEl = redirectContainerRef.current.querySelector(
          "#threedsChallengeRedirect"
        );
        // console.log(divEl);
        if (divEl) {
          divEl.style.height = "100%";
        }

        // const spinner = document.querySelector("#spinner"); //target spinner

        const iFrame =
          redirectContainerRef.current.querySelector("#challengeFrame"); //iframe container
        if (iFrame) {
          //   spinner.style.display = "block";
          //   redirectContainerRef.current.style.display = "none";

          // Add event listener to detect when iframe has finished loading
          iFrame.addEventListener("load", () => {
            // Check if the iframe is loaded from the 3D gateway
            // spinner.style.display = "none";

            // Show iframe
            redirectContainerRef.current.style.display = "block";
          });
        }

        // Remove the original script element to avoid duplication
        scriptElement.parentNode.removeChild(scriptElement);
      }
    }
  }, [paymentUrl]);

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-24 h-24 text-center flex justify-center items-center">
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
      {!paymentUrl && (
        <div className="text-center pb-2">
          <p className="text-xl font-semibold py-3 text-gray-700">
            Payment Initiated
          </p>
          <small className="text-center text-gray-400 ">
            We've initiated your payment of GH{amount} . Kindly check your phone
            and approved the payment.
          </small>
        </div>
      )}
      <div
        style={{ height: "400px", display: "none" }}
        ref={redirectContainerRef}
      ></div>
    </div>
  );
}

export default Pending;
