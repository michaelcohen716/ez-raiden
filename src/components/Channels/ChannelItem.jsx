import React, { useState, useEffect } from "react";
import web3 from "web3";
import ChannelIcons from "./ChannelIcons";
import Tooltip from "../common/Tooltip";
import { _getSymbol } from "../../utils/tokenUtil";
import { addressSlice } from "../../utils/helper";
import clipboard from "../../assets/clipboard.png";
import clipboardWhite from "../../assets/clipboard-white.png";
import doorOpen from "../../assets/door-open.png";
import doorClosed from "../../assets/door-closed.png";
import doorSettled from "../../assets/door-settled.png";
import "./Channels.css";

const BN = web3.utils.BN;

function ChannelItem({ channel, activeDash, setActiveDash, idx }) {
  const [clipboardImage, toggleClipboardImage] = useState(false);
  const [symbol, setSymbol] = useState("");
  const {
    channel_identifier,
    balance,
    partner_address,
    token_address,
    state
  } = channel;

  useEffect(() => {
    const getSymbol = async() => {
      const symbol = await _getSymbol(token_address);
      setSymbol(symbol)
    }

    getSymbol()
  }, [])

  const copyAddress = () => {
    navigator.clipboard.writeText(partner_address);
    toggleClipboardImage(true);
    setTimeout(() => {
      toggleClipboardImage(false);
    }, 500);
  };

  const channelStatusImg =
    state === "opened"
      ? doorOpen
      : state === "closed"
      ? doorClosed
      : doorSettled;

  return (
    <div className="d-flex justify-content-between channel-item p-3 my-3">
      <div className="d-flex my-auto">
        <div className="font-weight-bold mr-2">#{channel_identifier}</div>
        <Tooltip content={`channel state is ${state}`}>
          <img
            src={channelStatusImg}
            className="img-fluid channel-status mb-1"
            alt="status"
          />
        </Tooltip>
        <div className="ml-2 d-flex">
          <div className="font-weight-bold">
            {symbol}
          </div>
          <div className="ml-3">balance:</div>
          <div className="">
            {new BN(balance).toString()}
          </div>
          <div className="ml-3">partner:</div>
          <div>
            {addressSlice(partner_address)}
          </div>
          <Tooltip content="copy address" className="ml-1">
            <img
              onClick={copyAddress}
              src={clipboardImage ? clipboardWhite : clipboard}
              alt="copy"
              className="img-fluid clipboard ml-1 mb-1"
            />
          </Tooltip>
        </div>
      </div>
      <ChannelIcons
        setActiveDash={setActiveDash}
        channel={channel}
        activeDash={activeDash}
        activeDashboard={idx === activeDash["index"] ? true : false}
        channelId={channel_identifier}
        idx={idx}
      />
    </div>
  );
}

export default ChannelItem;
