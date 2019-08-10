import React, { useState } from "react";
import { CornerBox } from "react-shapes";
import { dashTypes } from "./Channels";
import {
  _payChannel,
  _depositToChannel,
  _withdrawFromChannel,
  _closeChannel,
  _openChannel
} from "../../raiden";
import { addressSlice } from "../../utils/helper";
import pay from "../../assets/pay.png";
import deposit from "../../assets/deposit.png";
import withdraw from "../../assets/withdraw.png";
import close from "../../assets/close.png";
import next from "../../assets/next.png";
import "./Dashboard.css";

function Dashboard({
  type,
  channel,
  channelId,
  openChannelBool
}) {
  const [value, setValue] = useState("1");

  const getImg = () => {
    switch (type) {
      case dashTypes[0]:
        return pay;
      case dashTypes[1]:
        return deposit;
      case dashTypes[2]:
        return withdraw;
      default:
        return close;
    }
  };

  const getFunc = () => {
    switch (type) {
      case dashTypes[0]:
        return payChannel;
      case dashTypes[1]:
        return depositToChannel;
      case dashTypes[2]:
        return withdrawFromChannel;
      case dashTypes[3]:
        return closeChannel;
      default:
        return null;
    }
  };

  const { token_address, partner_address, deposit: channelDeposit } = channel;

  const payChannel = async () => {
    const resp = await _payChannel(
      token_address,
      partner_address,
      Number(value)
    );
    console.log("pay channel resp", resp);
  };

  const depositToChannel = async () => {
    const resp = await _depositToChannel(
      token_address,
      partner_address,
      Number(value)
    );
    console.log("deposit resp", resp);
  };

  const withdrawFromChannel = async () => {
    const resp = await _withdrawFromChannel(
      token_address,
      partner_address,
      Number(value)
    );
    console.log("withdraw resp", resp);
  };

  const closeChannel = async () => {
    const resp = await _closeChannel(token_address, partner_address);
    console.log("close resp", resp);
  };

  const openChannel = async () => {
    const resp = await _openChannel(
      token_address,
      partner_address,
      channelDeposit
    );
    console.log("open resp", resp);
  };

  return (
    <div
      className={`position-absolute ${
        openChannelBool ? "create-dash " : "dashboard"
      } d-flex animated fadeInDown`}
    >
      <div className="cornerbox">
        <CornerBox
          size={100}
          width={200}
          orientation="topLeft"
          fill={{ color: "blue" }}
          strokeWidth={3}
        />
      </div>
      {openChannelBool ? (
        <div className="d-flex flex-column">
          <div className="mt-4 position-relative">
            <div className="d-flex position-absolute confirm-open">
              <div className="dash-head">channel</div>
            </div>
            <div className="position-absolute dash-main d-flex flex-column px-3">
              <div className="font-weight-bold mt-2">
                partner: {addressSlice(partner_address)}
              </div>
              <div className="font-weight-bold mt-2">
                token: {addressSlice(token_address)}
              </div>
              <div className="font-weight-bold mt-2">deposit: {channelDeposit}</div>
              <div className="open-channel-btn d-flex mt-2 p-2" onClick={openChannel}>
                <div className="font-weight-bold">open</div>
                <img src={next} className="ml-1 img-fluid cta-img" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="dash d-flex flex-column">
          <div className="mt-4 position-relative">
            <div className="d-flex position-absolute head-holder">
              <div className="dash-head">{type}</div>
              <img src={getImg()} className="ml-3 img-fluid dash-icon" />
              <div className="dash-head ml-3">#{channelId}</div>
            </div>
            <div className="position-absolute dash-main d-flex flex-column px-3">
              <div className="font-weight-bold">
                to: {addressSlice(partner_address)}
              </div>
              <div className="font-weight-bold mt-1">
                token: {addressSlice(token_address)}
              </div>
              <input
                className="mt-1 dash-input"
                value={value}
                placeholder="amount"
                onChange={e => setValue(e.target.value)}
              />
              <div className="cta" onClick={getFunc()}>
                <img src={getImg()} className="img-fluid cta-img" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
