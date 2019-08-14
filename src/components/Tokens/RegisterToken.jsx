import React, { useState, useEffect } from "react";
import { _registerToken } from "../../raiden";
import plus from "../../assets/plus.png";
import next from "../../assets/next.png";

function RegisterToken() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [formOpen, toggleFormOpen] = useState(false);
  const [showMessage, toggleShowMessage] = useState(false);

  const registerToken = async () => {
    toggleShowMessage(true);
    setTimeout(() => {
      toggleShowMessage(false);
    }, 8000);
    const resp = await _registerToken(tokenAddress);
    console.log("register token resp", resp);
  };

  return (
    <div className="d-flex justify-content-between channel-item p-3 my-3">
      <div className="d-flex my-auto">
        <img
          onClick={() => toggleFormOpen(true)}
          src={plus}
          className="img-fluid plus-button my-auto"
        />
        {formOpen && (
          <div className="d-flex ml-2 my-auto">
            <div className="mr-2">register token</div>
            <input
              value={tokenAddress}
              placeholder="token address"
              className="channel-input"
              onChange={e => setTokenAddress(e.target.value)}
            />
            <img
              onClick={() => registerToken()}
              src={next}
              className="img-fluid next-icon my-auto"
            />
            {showMessage && (
              <div className="my-auto ml-3 resp-text animated fadeIn">
                Allow a few moments for token to register
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterToken;
