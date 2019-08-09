import React, { useState } from "react";
import { CornerBox } from "react-shapes";
import { dashTypes } from "./Channels";
import { _payChannel } from "../../raiden";
import { addressSlice } from "../../utils/helper";
import pay from "../../assets/pay.png";
import deposit from "../../assets/deposit.png";
import withdraw from "../../assets/withdraw.png";
import close from "../../assets/close.png";
import "./Dashboard.css";

function Dashboard({ type, channel, channelId }) {
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

  const { token_address, token_network_address, partner_address } = channel;

  const payChannel = async() => {
    const resp = await _payChannel(token_address, partner_address, (Number(value) * 10**18));
    console.log("resp", resp);
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
            <div className="cta" onClick={payChannel}>
              <img src={getImg()} className="img-fluid cta-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
