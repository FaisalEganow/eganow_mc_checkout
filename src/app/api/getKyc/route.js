import axios from "axios";
import { BASE_URL } from "../../constants";
import { NextResponse } from "next/server";

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
      `${BASE_URL}/kyc/accountinfo`,
      {
        PayPartnerServiceId: data?.serviceId,
        CustomerAcctNo: data?.accountNoOrCardNoOrMSISDN,
        CountryCode : "GH0233",
        LanguageId: "En",
      },
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
          "X-Auth": data?.xAuth,
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
