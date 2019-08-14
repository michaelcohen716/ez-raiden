import React, { useState, useEffect } from "react";
import { _getChannels } from "../../raiden";
import ChannelItem from "./ChannelItem";
import CreateChannel from "./CreateChannel";
import "./Channels.css";

export const dashTypes = ["pay", "deposit", "withdraw", "close"];

function Channels() {
  const [channels, setChannels] = useState([]);
  const [activeDash, setActiveDash] = useState({
    type: null,
    index: null
  });

  useEffect(() => {
    const getChannels = async () => {
      const resp = await _getChannels();
      setChannels(resp.data);
    };

    getChannels();
  }, []);

  return (
    <div className="d-flex flex-column">
      <div className="page-header my-2 ml-2">my channels</div>
      <div className="d-flex flex-column">
        <CreateChannel />
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
  );
}

export default Channels;
