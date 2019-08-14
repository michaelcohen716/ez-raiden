import React, { useState } from "react";
import Nav from "./components/Nav";
import Channels from "./components/Channels/Channels";
import Tokens from "./components/Tokens/Tokens";
import AddressBook from "./components/AddressBook";
import About from "./components/About";
import "./App.css";

/* 
Noun Project Attributions:
- clipboard by jon trillana from the Noun Project
- doors by Arif Fatoni from the Noun Project
- pay, coin, quit, close  by Yaroslav Samoilov from the Noun Project
- Plus by Alina Oleynik from the Noun Project
- Next by Ilham Fitrotul Hayat from the Noun Project
- Record by Richard Schumann from the Noun Project
- connect by Ralf Schmitzer from the Noun Project
 */

function App() {
  const tabs = ["Channels", "Tokens", "Address Book", "About"];
  const [activeTab, setActiveTab] = useState(tabs[1]);
  // const [activeTab, setActiveTab] = useState(tabs[0]);

  const getView = () => {
    switch (activeTab) {
      case tabs[0]:
        return <Channels />;
      case tabs[1]:
        return <Tokens />;
      case tabs[2]:
        return <AddressBook />
      default:
        return <About />;
    }
  };

  return (
    <div className="app d-flex flex-column">
      <Nav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-3">{getView()}</div>
    </div>
  );
}

export default App;
