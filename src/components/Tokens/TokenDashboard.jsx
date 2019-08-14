import React, { useState } from "react";
import { CornerBox } from "react-shapes";
import { processTypes } from "./Tokens";

import pay from "../../assets/pay.png";
import add from "../../assets/plus.png";
import close from "../../assets/close.png";
import connect from "../../assets/connect.png";
import "./Tokens.css";

function TokenDashboard({ type }) {
  console.log("tokedashtype", type);
  const getImg = () => {
    switch (type) {
      case processTypes[0]: {
        return pay;
      }
      case processTypes[1]: {
        return add;
      }
      case processTypes[2]: {
        return close;
      }
      default:
        return connect;
    }
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
        </div>
      </div>
    </div>
  );
}

export default TokenDashboard;
