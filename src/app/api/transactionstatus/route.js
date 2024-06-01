import axios from "axios";
import { BASE_URL,  } from "../../constants";
import { NextResponse } from "next/server";

/**
 * GET ACCESS TOKEN
 * @returns
 */
export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request) {
  const res = await request.json();
  console.log(res);
  try {
    const response = await axios.post(
      `${BASE_URL}/transfer/transstatus`,
      {
        LanguageId: "En",
        TransactionId: res.transactionId,
      },
      {
        headers: {
          Authorization: `Bearer ${res.token}`,
          "Content-Type": "application/json",
          "X-Auth": res.xAuth,
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
