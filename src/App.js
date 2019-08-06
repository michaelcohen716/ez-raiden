import React, { useState } from "react";
import Nav from "./components/Nav";
import Channels from "./components/Channels";
import "./App.css";

/* 
Noun Project Attributions:
- clipboard by jon trillana from the Noun Project
- doors by Arif Fatoni from the Noun Project
- pay, coin, quit, close  by Yaroslav Samoilov from the Noun Project
 */

function App() {
  const tabs = ["Channels", "Tokens", "Address Book", "About"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="app d-flex flex-column">
      <Nav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Channels />
    </div>
  );
}

export default App;
