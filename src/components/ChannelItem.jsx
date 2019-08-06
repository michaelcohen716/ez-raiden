import React, { useState, useEffect } from "react";
import web3 from "web3";
import ChannelIcons from "./ChannelIcons";
import Tooltip from 'react-tooltip-lite';
import { tokenMapping } from "../utils/tokenUtil";
import clipboard from "../assets/clipboard.png";
import clipboardWhite from "../assets/clipboard-white.png";
import doorOpen from "../assets/door-open.png";
import doorClosed from "../assets/door-closed.png";
import doorSettled from "../assets/door-settled.png";
import "./Channels.css";

const BN = web3.utils.BN;

function ChannelItem({ channel }) {
  const [clipboardImage, toggleClipboardImage] = useState(false);
  console.log("channel", channel);
  const {
    channel_identifier,
    balance,
    partner_address,
    token_address,
    state
  } = channel;

  const copyAddress = () => {
    navigator.clipboard.writeText(partner_address);
    toggleClipboardImage(true);
    setTimeout(() => {
      toggleClipboardImage(false)
    }, 500);
  }

  const channelStatusImg = state === "opened" ? doorOpen : (
    state === "closed" ? doorClosed : doorSettled
  )

  return (
    <div className="d-flex channel-item p-3 my-3">
      <div className="d-flex my-auto">
        <div className="font-weight-bold mr-2">#{channel_identifier}</div>
        <Tooltip content={`channel state is ${state}`}>
          <img src={channelStatusImg} className="img-fluid channel-status mb-1" />
        </Tooltip>
        <div className="ml-2 d-flex">
          <div className="font-weight-bold blue-text">
            {tokenMapping[token_address]}
          </div>
          <div className="ml-3">balance:</div>
          <div className="blue-text">
            {new BN(balance).toString() / 10 ** 18}
          </div>
          <div className="ml-3">partner:</div>
          <div className="blue-text">
            {partner_address.slice(0, 4) + "..." + partner_address.slice(38)}
          </div>
          <Tooltip content="copy address" className="ml-1">
            <img
              onClick={copyAddress}
              src={clipboardImage ? clipboardWhite : clipboard}
              className="img-fluid clipboard ml-1 mb-1"
            />
          </Tooltip>
          <ChannelIcons />
        </div>
      </div>
    </div>
  );
}

export default ChannelItem;
