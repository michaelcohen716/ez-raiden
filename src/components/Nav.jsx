import React, { useEffect, useState } from "react";
import clipboardWhite from "../assets/clipboard-white.png";
import clipboard from "../assets/clipboard.png";
import { _getAddress } from "../raiden";
import { addressSlice } from "../utils/helper";
import "./Nav.css";

function NavItem({ text, onClick, activeTab, idx }) {
  return (
    <div
      className={`nav-item my-auto ${idx === 0 ? "mr-4 ml-2" : "mx-4"} ${
        text === activeTab ? "nav-item-active" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

function Nav({ tabs, activeTab, setActiveTab }) {
  const [address, setAddress] = useState("");
  const [clipboardImage, toggleClipboardImage] = useState(false);

  useEffect(() => {
    const getAddress = async () => {
      let addr = await _getAddress();
      console.log("addr", addr);
      setAddress(addr.data.our_address);
    };

    getAddress();
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toggleClipboardImage(true);
    setTimeout(() => {
      toggleClipboardImage(false);
    }, 500);
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        {tabs.map((t, i) => {
          return (
            <NavItem
              text={t}
              activeTab={activeTab}
              onClick={() => setActiveTab(t)}
              idx={i}
              key={i}
            />
          );
        })}
      </div>
      <div className="d-flex flex-column">
        <div className="title-text mr-5">ez-raiden</div>
        <div className="d-flex">
          <img
            onClick={copyAddress}
            src={clipboardImage ? clipboard : clipboardWhite}
            className="img-fluid clipboard mr-2"
          />
          <div>{address.length ? addressSlice(address) : ""}</div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
