import React from "react";
import Tooltip from "../common/Tooltip";
import Dashboard from "./Dashboard";
import { dashTypes } from "./Channels";
import pay from "../../assets/pay.png";
import deposit from "../../assets/deposit.png";
import withdraw from "../../assets/withdraw.png";
import close from "../../assets/close.png";
import "./Channels.css";

function ChannelIcons({
  channel,
  setActiveDash,
  activeDash,
  activeDashboard,
  channelId,
  idx
}) {
  const icon = (src, type, index) => (
    <img
      alt={`${src}`}
      src={src}
      className="img-fluid channel-icon mx-2"
      onClick={() => setActiveDash({ type, index })}
    />
  );

  return (
    <div className="d-flex">
      <div className="d-flex ml-5 my-auto">
        <Tooltip content="pay">{icon(pay, dashTypes[0], idx)}</Tooltip>
        <Tooltip content="deposit">{icon(deposit, dashTypes[1], idx)}</Tooltip>
        <Tooltip content="withdraw">
          {icon(withdraw, dashTypes[2], idx)}
        </Tooltip>
        <Tooltip content="close">{icon(close, dashTypes[3], idx)}</Tooltip>
      </div>
      {activeDashboard && (
        <div className="position-relative">
          <Dashboard
            channel={channel}
            channelId={channelId}
            type={activeDash["type"]}
          />
        </div>
      )}
    </div>
  );
}

export default ChannelIcons;
