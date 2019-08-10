import React, { useState, useEffect } from "react";
import { _getChannels, _getToken } from "../../raiden";
import ChannelItem from "./ChannelItem";
import CreateChannel from "./CreateChannel";
import "./Channels.css";

export const dashTypes = ["pay", "deposit", "withdraw", "close"];

function Channels() {
  const [channels, setChannels] = useState([]);
  const [activeDash, setActiveDash] = useState({
    "type": null,
    "index": null
  });

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
        <div className="page-header my-2 ml-2">my channels</div>
        <div className="d-flex flex-column">
          <CreateChannel  />
          {channels.map((c, i) => {
            return (
              <ChannelItem
                channel={c}
                activeDash={activeDash}
                setActiveDash={setActiveDash}
                key={i}
                idx={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Channels;
