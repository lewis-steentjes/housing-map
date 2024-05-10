import axios from "axios";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// export const dynamic = "force-dynamic";

const RENTAL_URL = "https://api.tmsandbox.co.nz/v1/Search/Property/Rental.JSON";
const CONSUMER_KEY = process.env.TRADEME_OAUTH_CONSUMER_KEY;
const SIGNATURE_METHOD = process.env.TRADEME_OAUTH_SIGNATURE_METHOD;
const SIGNATURE = process.env.TRADEME_OAUTH_SIGNATURE;

// Initially, we just want to get the first page of results from the API
export async function GET(req: NextRequest) {
  // Pass the input search parameters onto the TradeMe API
  const searchParams = req.nextUrl.searchParams;
  const auth_key = `OAuth oauth_consumer_key="${CONSUMER_KEY}",oauth_signature_method="${SIGNATURE_METHOD}",oauth_signature="${SIGNATURE}"`;

  try {
    const response = await axios.get(RENTAL_URL, {
      headers: { Authorization: auth_key },
      params: searchParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
