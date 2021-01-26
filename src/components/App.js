import React, { useState,useEffect } from 'react';

import './App.scss';
import  Terminal from './Terminal';


function App() {
  const initialCount = JSON.parse(sessionStorage.getItem('id')|| 1);
  const [countTerminals, setCountTerminals] = useState(initialCount);
  const terminals = [];

  useEffect(() => {
    sessionStorage.setItem('id', countTerminals);
  }, [countTerminals]);
 
  function addTerminalHandler() {
    setCountTerminals(countTerminals + 1);
  }
  function killTerminalHandler() {
    setCountTerminals(countTerminals - 1);
  }

  for (let i = 0; i < countTerminals; i++) {
    terminals.push(
      <Terminal
        i={i}
        addTerminalHandler={addTerminalHandler}
        killTerminalHandler={killTerminalHandler}
        countTerminals={countTerminals}
        terminals={terminals}
      />
    );
  }

  return (
    <div
      className={`App ${countTerminals > 1 && "splited"} ${
        countTerminals >= 2 && "splited-1"
      } ${countTerminals >= 4 && "splited-2"}`}
    >
      {terminals.map((item, index) => {
        return (
          <div className="item" key={index}>
            {item}
          </div>
        );
      })}
    </div>

  );
}

export default App;