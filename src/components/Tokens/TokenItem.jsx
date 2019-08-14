import React, { useState, useEffect } from "react";
import tokenImg from "../../assets/token.png";
import Tooltip from "../common/Tooltip";
import TokenDashboard from "./TokenDashboard";
import pay from "../../assets/pay.png";
import add from "../../assets/plus.png";
import close from "../../assets/close.png";
import connect from "../../assets/connect.png";
import { processTypes } from "./Tokens";
import { _getChannelByToken } from "../../raiden";
import { _getSymbol } from "../../utils/tokenUtil";
import { addressSlice } from "../../utils/helper";
import "./Tokens.css";

function TokenItem({ token, connection, activeDash, setActiveDash, idx }) {
  const [symbol, setSymbol] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);

  //   const [processOpen, toggleProcessOpen] = useState(false);
  const [step, incrementStep] = useState(0);
  const [processType, setProcessType] = useState(null);
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    const getChannels = async () => {
      const { data } = await _getChannelByToken(token);
      const balance = data.length
        ? data.map(d => d.balance).reduce((a, b) => a + b)
        : 0;
      setTokenBalance(balance);
      console.log("data", data);
    };

    const getSymbol = async () => {
      const _symbol = await _getSymbol(token);
      setSymbol(_symbol);
    };

    getChannels();
    getSymbol();
  }, []);

  const icon = (src, type, index) => (
    <img
      alt={`${src}`}
      src={src}
      className="img-fluid channel-icon mx-2"
      onClick={() => setActiveDash({ type, index })}
    />
  );

  return (
    <div className="d-flex justify-content-between channel-item p-3 my-3">
      <div className="d-flex my-auto">
        <div className="d-flex token-symbol-area">
          <img src={tokenImg} className="img-fluid channel-status" />
          <div className="font-weight-bold ml-2">{symbol}</div>
        </div>
        <div className="ml-4 font-weight-bold">address: </div>
        <div> {addressSlice(token)}</div>
        <div className="ml-4 font-weight-bold">balance: </div>
        <div> {tokenBalance}</div>
        {connection ? (
          <div className="d-flex">
            <div className="my-auto ml-3">
              <Tooltip content="pay">{icon(pay, processTypes[0], idx)}</Tooltip>
            </div>
            <div className="my-auto ml-3">
              <Tooltip content="add funds">
                {(icon(add, processTypes[1], idx))}
              </Tooltip>
            </div>
            <div className="my-auto ml-3">
              <Tooltip content="leave network">
                {icon(close, processTypes[2], idx)}
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <div className="my-auto connect-icon">
              <Tooltip content="join network">
                {icon(connect, processTypes[3], idx)}
              </Tooltip>
            </div>
          </div>
        )}
      </div>
        {idx === activeDash["index"] && (
          <div className="position-relative">
            <TokenDashboard type={activeDash["type"]} />
          </div>
        )}
    </div>
  );
}

export default TokenItem;
