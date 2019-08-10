import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import plus from "../../assets/plus.png";
import next from "../../assets/next.png";
import { _getTokens } from "../../raiden";
import { _getSymbol } from "../../utils/tokenUtil";
import "./Channels.css";

function CreateChannel() {
  const [formOpen, toggleFormOpen] = useState(false);
  const [step, incrementStep] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [targetAddress, setTargetAddress] = useState("");
  const [depositAmount, setDepositAmount] = useState(1);
  const [tokenMapping, setTokenMapping] = useState({});

  useEffect(() => {
    const getTokens = async () => {
      const tokens = await _getTokens();
      const symbols = [];
      const tokenMap = {}

      for (var i = 0; i < tokens.data.length; i++) {
        const symbol = await _getSymbol(tokens.data[i]);
        tokenMap[symbol] = tokens.data[i];
        symbols.push(symbol);
      }

      setTokens(symbols);
      setTokenMapping(tokenMap);
    };

    getTokens();
  }, []);

  const selectToken = token => {
    incrementStep(step + 1);
    setSelectedToken(token);
  };

  const getStep = () => {
    switch (step) {
      case 0: {
        return (
          <div className="d-flex">
            <div className="my-auto mx-3">choose a token</div>
            <div className="symbol-holder d-flex">
              {tokens.map((t, i) => (
                <div
                  onClick={() => selectToken(t)}
                  className="token-symbol m-2 p-1"
                  key={i}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 1: {
        return (
          <div className="d-flex my-auto">
            <div className="ml-3 input-label">target address</div>
            <input
              className="channel-input ml-1"
              value={targetAddress}
              onChange={e => setTargetAddress(e.target.value)}
            />
            <img
              onClick={() => incrementStep(step + 1)}
              src={next}
              className="img-fluid next-icon my-auto"
            />
          </div>
        );
      }

      case 2: {
        return (
          <div className="d-flex my-auto">
            <div className="ml-3 input-label">deposit amount</div>
            <input
              className="channel-input ml-1"
              value={depositAmount}
              onChange={e => setDepositAmount(e.target.value)}
            />
            <img
              onClick={() => incrementStep(step + 1)}
              src={next}
              className="img-fluid next-icon my-auto"
            />
          </div>
        );
      }

      case 3: {
        return (
          <Dashboard
            openChannelBool={true}
            channel={{
                token_address: tokenMapping[selectedToken],
                partner_address: targetAddress,
                deposit: 100
            }}
          />
        );
      }
      default: {
        return null;
      }
    }
  };

  console.log("Selected token", selectedToken);

  return (
    <div className="d-flex channel-item p-3 my-3">
      <img
        onClick={() => toggleFormOpen(true)}
        src={plus}
        className="img-fluid plus-button my-auto"
      />
      {formOpen && getStep()}
    </div>
  );
}

export default CreateChannel;
