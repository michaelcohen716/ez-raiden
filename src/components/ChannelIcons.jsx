import React, { useState } from "react";
import pay from "../assets/pay.png";
import deposit from "../assets/deposit.png";
import withdraw from "../assets/withdraw.png";
import close from "../assets/close.png";
import "./Channels.css";

function ChannelIcons(){
    const icon = src => <img src={src} className="img-fluid channel-icon mx-2" />
    return (
        <div className="d-flex ml-5">
            {icon(pay)}
            {icon(deposit)}
            {icon(withdraw)}
            {icon(close)}
        </div>
    )
}

export default ChannelIcons;