import axios from "axios";
import { BASE_URL,URL  } from "../../constants";
import { NextResponse } from "next/server";

/**
 * GET ACCESS TOKEN
 * @returns
 */
export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request) {
  const res = await request.json();
  console.log(res.key);
  try {
    const response = await axios.get(
      `${URL}/check-status/${res.key}`,
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

    console.log(response.data);
    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
