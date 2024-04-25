import axios from "axios";

const rootUrl = "/api/v1/trademe";

export async function getTradeMe() {
  try {
    const result = await axios.get(rootUrl);
    return result.data;
  } catch (error: any) {
    return error;
  }
}
