import axios from "axios";
import { BASE_URL, MERCHANT_AUTH, URL } from "../../constants";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * GET ACCESS TOKEN
 * @returns
 */

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request) {

  const data = await request.json();
  console.log(data);

  try {
      const response = await axios.post(`${URL}/store`, data , {
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
      });
      // console.log(response.data);
      return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
