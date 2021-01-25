import React, { useState,useEffect } from 'react';

import './App.scss';
import  Terminal from './Terminal';


function App() {
  const initialCount = () => Number(JSON.parse(sessionStorage.getItem('id')|| 1));
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
        key={i}
        addTerminalHandler={addTerminalHandler}
        killTerminalHandler={killTerminalHandler}
        countTerminals={countTerminals}
      />
    );
  }

  return (
    <div
      className={`App ${countTerminals > 1 && "splited"} ${
        countTerminals >= 2 && "splited-1"
      } ${countTerminals >= 4 && "splited-2"}`}
    >
      {console.log(terminals)}
      {terminals.map((item, index) => {
        return (
          <div className="item" key={index}>
            {item}
          </div>
        );
      })}
    </div>

    // <div className="App">
    //     {appState.terminal.map((item)=> {
    //     return <div className="item" key={item.id} >
    //       {item.terminal}
    //       {...}
    //        this is {item.id}

    //       </div>;})}
    // </div>
  );
}

export default App;





// import React, { useState, useEffect } from "react";

// import "./App.scss";
// import Terminal from "./Terminal";

// function App() {
//   const initialCount = () =>
//     Number(sessionStorage.getItem("terminalCounter") || 0);
//   const [terminal, setTerminal] = useState(initialCount);
//   const date = new Date();
//   const terminalCounter = 1;
//   const [appState, setAppState] = useState({
//     terminal: [
//       {
//         id: terminalCounter,
//         createdAt: date,
//       },
//     ],
//     terminalCounter: terminalCounter,
//   });

//   let id = terminal;

//   useEffect(() => {
//     sessionStorage.setItem("terminal", terminalCounter);
//     sessionStorage.setItem("id", terminalCounter);
//   }, [terminal, id]);

//   // salve in browser history
//   // how to implement terminal sesion
//   // console.log(createRef);
//   function AddTerminal() {
//     return (
//       <Terminal
//         setTerminal={setTerminal}
//         terminal={terminal}
//         id={terminalCounter}
//       />
//     );
//   }

//   return (
//     <div
//       className={`App ${id >= 1 && "splited"} ${id >= 2 && "splited-1"} ${
//         id >= 4 && "splited-2"
//       }`}
//     >
//       {Array(terminalCounter)
//         .fill(<AddTerminal setTerminal={setTerminal} terminal={terminal} />)
//         .map((element, terminal) => {
//           return (
//             <div
//               className={`item ${id === 1 && "item-1"} ${
//                 id === 2 && "item-2"
//               } ${id === 2 && "item-2 addon"}`}
//               key={terminal}
//             >
//               {element}
//               {`${`${id} created at ${new Date()}`}`}
//             </div>
//           );
//         })}
//     </div>
//   );
// }

// export default App;
