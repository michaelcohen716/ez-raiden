import React, { useState, useEffect } from "react";
import { _getChannels, _getToken } from "../raiden";
import ChannelItem from "./ChannelItem";
import "./Channels.css";

function Channels() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    const getChannels = async () => {
      const resp = await _getChannels();
      setChannels(resp.data);
      const token = await _getToken(
        "0xd3BA0A3Aafca48489722f17E5ab29E67f9913BAc"
      );
      console.log("token", token);
    };

    getChannels();
  }, []);

  return (
    <div className="mt-3">
      <div className="d-flex flex-column">
        <div className="page-header my-2">my channels</div>
        <div className="d-flex flex-column">
          {channels.map((c, i) => {
            return <ChannelItem channel={c} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Channels;
