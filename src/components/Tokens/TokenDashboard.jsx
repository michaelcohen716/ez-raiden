import React, { useState, useEffect } from "react";
import { CornerBox } from "react-shapes";
import { processTypes } from "./Tokens";
import { _payChannel, _addTokens, _leaveNetwork } from "../../raiden";
import { _getSymbol } from "../../utils/tokenUtil";
import pay from "../../assets/pay.png";
import add from "../../assets/plus.png";
import leave from "../../assets/close.png";
import connect from "../../assets/connect.png";
import "./Tokens.css";
import { addressSlice } from "../../utils/helper";

function TokenDashboard({ type, addr }) {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [showResp, toggleShowResp] = useState(false);

  useEffect(() => {
    const getSymbol = async () => {
      const symbol = await _getSymbol(addr);
      setTokenSymbol(symbol);
    };

    getSymbol();
  }, []);

  const getImg = () => {
    switch (type) {
      case processTypes[0]: {
        return pay;
      }
      case processTypes[1]: {
        return add;
      }
      case processTypes[2]: {
        return leave;
      }
      default:
        return connect;
    }
  };

  const getFunc = () => {
    switch (type) {
      case processTypes[0]: {
        return payToken;
      }
      case processTypes[1]: {
        return addToken;
      }
      case processTypes[2]: {
        return leaveNetwork;
      }
      default:
        return joinNetwork;
    }
  };

  const toggleResponse = () => {
    toggleShowResp(true);
    setTimeout(() => {
      toggleShowResp(false);
    }, 5000);
  };

  const payToken = async () => {
    toggleResponse();
    const resp = await _payChannel(addr, receiverAddress, Number(tokenAmount));
    console.log("paytoken resp", resp.errors);
  };

  const addToken = async () => {
    toggleResponse();
    const resp = await _addTokens(addr, Number(tokenAmount));
    console.log("add token resp", resp);
  };

  const leaveNetwork = async () => {
    toggleResponse();
    const resp = await _leaveNetwork(addr);
    console.log("leave resp", resp);
  };

  const joinNetwork = async() => {
    toggleResponse();
    const resp = await _addTokens(addr, Number(tokenAmount))
    console.log("join resp", resp)
  };

  return (
    <div className="position-absolute dashboard d-flex animated fadeInDown">
      <div className="cornerbox">
        <CornerBox
          size={100}
          width={200}
          orientation="topLeft"
          fill={{ color: "blue" }}
          strokeWidth={3}
        />
      </div>
      <div className="dash d-flex flex-column">
        <div className="mt-4 position-relative">
          <div className="d-flex position-absolute head-holder">
            <div className="dash-head">{type}</div>
            <img src={getImg()} className="ml-3 img-fluid dash-icon" />
          </div>
          <div className="position-absolute dash-main d-flex flex-column px-3">
            <div className="font-weight-bold">token: {tokenSymbol}</div>
            <input
              className="dash-input mt-1"
              onChange={e => setTokenAmount(e.target.value)}
              value={type === processTypes[2] ? "-" : tokenAmount}
              placeholder="amount"
            />
            <input
              className="dash-input mt-1"
              onChange={e => setReceiverAddress(e.target.value)}
              value={type === processTypes[0] ? receiverAddress : "-"}
              placeholder="receiver address"
            />
            <div className="cta mt-3" onClick={getFunc()}>
              <img src={getImg()} className="img-fluid cta-img" />
            </div>
            {showResp && (
              <div className="mt-1 resp-text">
                Please see console for response
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenDashboard;
