import request from "superagent";

const rootUrl = "/api/v1/tradeMe";

export async function getTradeMe() {
  try {
    const result = await request.get(rootUrl);
    return result.body;
  } catch (error: any) {
    return error.response.status;
  }
}
