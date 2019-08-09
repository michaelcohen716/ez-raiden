const axios = require("axios");

const url = "http://localhost:5001/api/v1/";

export async function _getTokens() {
  const resp = await axios.get(`${url + "tokens"}`);
  return resp;
}

export async function _getToken(addr) {
  const resp = await axios.get(`${url + "tokens/" + addr}`);
  return resp;
}

export async function _getChannels() {
  const resp = await axios.get(`${url + "channels"}`);
  return resp;
}

export async function _payChannel(tokenAddr, counterPartyAddr, amount) {
  const resp = await axios({
    method: "post",
    url: `${url + "payments/" + tokenAddr + "/" + counterPartyAddr}`,
    data: {
      amount
    }
  });

  return resp;
}
