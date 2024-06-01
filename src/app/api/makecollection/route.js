import axios from "axios";
import { BASE_URL, MERCHANT_AUTH } from "../../constants";
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
      `${BASE_URL}/transfer/debitaccount`,
      {
        PayPartnerServiceId: data?.serviceId,
        Amount: data?.amount,
        AccountNoOrCardNoOrMSISDN: data.accountNoOrCardNoOrMSISDN,
        AccountName: data?.accountName || data.name,
        // AccountName: data.name,
        TransactionId: data?.transactionId,
        Narration: data?.narration,
        TransCurrencyIso: "GHS",
        ExpiryDateMonth: data?.expiryMonth || 0,
        ExpiryDateYear: data?.expiryYear || 0,
        Cvv: data?.cvv || 0,
        LanguageId: "En",
      },
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
          "X-Auth": data.xAuth,
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
