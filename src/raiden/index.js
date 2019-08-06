const axios = require("axios");
const web3 = require("web3");

const url = "http://localhost:5001/api/v1/";

export async function _getTokens() {
  const resp = await axios.get(`${url + "tokens"}`);
  return resp;
}

export async function _getToken(addr) {
  const resp = await axios.get(`${url + "channels/" + addr}`);
  return resp;
}

export async function _getChannels() {
  const resp = await axios.get(`${url + "channels"}`);
  return resp;
}
