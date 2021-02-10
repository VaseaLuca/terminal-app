import React, { useState, useEffect } from "react";

import "./App.scss";
import Terminal from "./Terminal";

const App = () => {
  const initialCount = JSON.parse(sessionStorage.getItem("id") || 1);
  const [countTerminals, setCountTerminals] = useState(initialCount);
  const terminals = [];

  useEffect(() => {
    sessionStorage.setItem("id", countTerminals);
  }, [countTerminals]);
  function addTerminalHandler() {
    countTerminals <= 5 && setCountTerminals(countTerminals + 1);
  }
  function killTerminalHandler() {
    countTerminals > 1 && setCountTerminals(countTerminals - 1);
  }
  for(let i = 1; i <= countTerminals; i++) {
    terminals.push(
      <Terminal
        addTerminalHandler={addTerminalHandler}
        killTerminalHandler={killTerminalHandler}
        countTerminals={i}
        terminals={terminals}
      />
    );
  }
  return (
    <div
      className={`App ${countTerminals > 1 && "splited"} ${
        countTerminals > 2 && "splited-1"
      } ${countTerminals === 4 && "splited-2"} ${
        countTerminals > 4 && "splited-3"
      } ${countTerminals === 6 && "splited-4"}`}
    >
      {terminals.map((item, index) => {
        return (
          <div className={`box-${index}`} key={index}>
            {item}
          </div>
        );
      })}
    </div>
  );
}
export default App;