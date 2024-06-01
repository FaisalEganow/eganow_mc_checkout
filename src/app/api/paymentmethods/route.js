import axios from "axios";
import { BASE_URL } from "../../constants";
import { NextResponse } from "next/server";


/**
 * GET ACCESS TOKEN
 * @returns
 */
export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request) {
    const {token,xAuth} = await request.json()
    try {
    const response = await axios.post(
      `${BASE_URL}/enquiry/collectionservices`,
      {
        LanguageId: "En",
        CountryCode: "GH0233",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Auth": xAuth,
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
