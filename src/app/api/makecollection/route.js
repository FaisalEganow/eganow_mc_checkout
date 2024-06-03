import axios from "axios";
import { BASE_URL, MERCHANT_AUTH, URL } from "../../constants";
import { NextResponse } from "next/server";
import { response } from "../credentials/route";

/**
 * GET ACCESS TOKEN
 * @returns
 */
export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request) {

  const data = await request.json();
  // console.log(data);
  try {
    const response = await axios.post(
      `${URL}/pay`,
      {
        customer_id: data?.customer_id,
        amount: data?.amount,
        public_key: data?.p_key,
        card_holder_name: data?.accountName || data.name,
        card_number: data.accountNoOrCardNoOrMSISDN, 
        card_expiry_month: data?.expiryMonth || 0,
        card_expiry_year: data?.expiryYear || 0,
        card_cvv: data?.cvv || 0,
      },
      {
        headers: {
          Authorization:
            "Basic " +
            btoa(
              process.env.EGAPAY_CHECKOUT_USERNAME +
                ":" +
                process.env.EGAPAY_CHECKOUT_PASSWORD
            ),
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response.data);
    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
