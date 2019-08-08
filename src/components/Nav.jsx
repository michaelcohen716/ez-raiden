import React from "react";
import "./Nav.css";

function NavItem({ text, onClick, activeTab, idx }) {
  return (
    <div
      className={`nav-item my-auto ${idx === 0 ? "mr-4" : "mx-4"} ${
        text === activeTab ? "nav-item-active" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

function Nav({ tabs, activeTab, setActiveTab }) {
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
      <div className="title-text mr-5">ez-raiden</div>
    </div>
  );
}

export default Nav;
