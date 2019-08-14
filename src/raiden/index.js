const axios = require("axios");

const url = "http://localhost:5001/api/v1/";

/* 
Tokens
 */
export async function _getTokens() {
  const resp = await axios.get(`${url + "tokens"}`);
  return resp;
}

export async function _getToken(addr) {
  const resp = await axios.get(`${url + "tokens/" + addr}`);
  return resp;
}

/*
Channels
 */
export async function _getChannels() {
  const resp = await axios.get(`${url + "channels"}`);
  return resp;
}

export async function _getChannel(tokenAddr, partnerAddr) {
  const resp = await axios.get(
    `${url + "channels/" + tokenAddr + "/" + partnerAddr}`
  );
  return resp;
}

export async function _getChannelByToken(tokenAddr) {
  const resp = await axios.get(
    `${url + "channels/" + tokenAddr}`
  );
  return resp;
}

export async function _openChannel(tokenAddr, partnerAddr, deposit) {
  const resp = await axios({
    method: "put",
    url: `${url + "channels"}`,
    data: {
      partner_address: partnerAddr,
      reveal_timeout: 10,
      settle_timeout: 500,
      token_address: tokenAddr,
      total_deposit: deposit
    }
  });
}

export async function _payChannel(tokenAddr, partnerAddr, amount) {
  const resp = await axios({
    method: "post",
    url: `${url + "payments/" + tokenAddr + "/" + partnerAddr}`,
    data: {
      amount
    }
  });

  return resp;
}

/* 
  @dev total_deposit + newAmount === new total deposit
 */
export async function _depositToChannel(tokenAddr, partnerAddr, newAmount) {
  const {
    data: { total_deposit }
  } = await _getChannel(tokenAddr, partnerAddr);

  const resp = await axios({
    method: "patch",
    url: `${url + "channels/" + tokenAddr + "/" + partnerAddr}`,
    data: {
      total_deposit: total_deposit + newAmount
    }
  });

  return resp;
}

export async function _withdrawFromChannel(tokenAddr, partnerAddr, amount) {
  const {
    data: { total_withdraw }
  } = await _getChannel(tokenAddr, partnerAddr);

  const resp = await axios({
    method: "patch",
    url: `${url + "channels/" + tokenAddr + "/" + partnerAddr}`,
    data: {
      total_withdraw: total_withdraw + amount
    }
  });

  return resp;
}

export async function _closeChannel(tokenAddr, partnerAddr) {
  const resp = await axios({
    method: "patch",
    url: `${url + "channels/" + tokenAddr + "/" + partnerAddr}`,
    data: {
      state: "closed"
    }
  });

  return resp;
}

/*
Connections
 */
export async function _getConnections() {
  const resp = await axios.get(`${url + "connections"}`);
  return resp;
}


/*
Utils
 */
export async function _getAddress() {
  const resp = await axios.get(`${url + "address"}`);
  return resp;
}

