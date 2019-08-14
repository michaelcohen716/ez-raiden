import React, { useState, useEffect } from "react";
import TokenItem from "./TokenItem";
import { _getTokens, _getConnections } from "../../raiden";

export const processTypes = ["pay", "add", "close", "connect"];

function Tokens() {
  const [tokens, setTokens] = useState([]);
  const [connections, setConnections] = useState([]);
  const [activeDash, setActiveDash] = useState({
    type: null,
    index: null
  });

  useEffect(() => {
    const getTokens = async () => {
      const { data } = await _getTokens();
      setTokens(data);
    };

    const getConnections = async () => {
      const { data } = await _getConnections();
      setConnections(data);
    };

    getTokens();
    getConnections();
  }, []);

  console.log("connections", connections);
  return (
    <div className="d-flex flex-column">
      <div className="page-header my-2 ml-2">my tokens</div>
      <div className="d-flex flex-column">
        {tokens.map((t, i) => {
          return (
            <TokenItem
              token={t}
              activeDash={activeDash}
              setActiveDash={setActiveDash}
              connection={connections[t] && connections[t].channels > 0}
              idx={i}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Tokens;
