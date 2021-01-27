import React, { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color";
import Slider from "react-input-slider";

import Navbar from "./Navbar";
import NavItem from "./NavItem";
import DropdownMenu from "./DropdownMenu";
import "./Terminal.scss";

function Terminal({
  countTerminals,
  addTerminalHandler,
  killTerminalHandler,
}) {
  const [value, setValue] = useState("");
  const [ws] = useState(new WebSocket("wss://ws-commander.herokuapp.com"));
  let getData = JSON.parse(sessionStorage.getItem(countTerminals));
  const [inputs, setInputs] = useState([]);
  const [commandsArr, setCommandsArr] = useState(
    getData ? getData.commands : []
  );
  const [count, setCount] = useState(0);
  const inputFocus = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(getData ? getData.bgColor : "#00000");
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [textColor, setTextColor] = useState(
    getData ? getData.txtColor : "#fff"
  );
  const [showTextSizeSlider, setShowTextSizeSlider] = useState(false);
  const [changeTextSize, setChangeTextSize] = useState(
    getData ? getData.textSize : "14"
  );

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        console.log(`ws opened on ${new Date()}`);
      };
      ws.onclose = () => console.log("ws closed");
      ws.onmessage = (e) => {
        let msg = JSON.parse(e.data);

        setInputs((inputs) => [...inputs, msg.originalMessage, msg.value]);

        if (msg.command === "clear") {
          setCommandsArr((commandsArr) => [...commandsArr, msg.command]);
          setInputs((inputs) => []);
        }
      };
    }

    const session = {
      id: countTerminals,
      txtColor: textColor,
      bgColor: color,
      textSize: changeTextSize,
      inputs: inputs,
      commands: commandsArr,
    };
    sessionStorage.setItem(countTerminals, JSON.stringify(session));
   
        console.log(countTerminals);
 
  }, [
    ws,
    commandsArr,
    textColor,
    color,
    changeTextSize,
    countTerminals,
    inputs,
  ]);
  // the arrow up and down function
  function onArrowsHandle(e) {
    if (commandsArr.length > 0) {
      if (e.code === "ArrowUp") {
        setValue(commandsArr[count - 1]);
      }
      if (e.code === "ArrowUp" && count >= 2) {
        setCount(count - 1);
      } else {
        setCount(commandsArr.length);
      }
    }
    if (e.code === "ArrowDown") {
      if (commandsArr.length > 0) {
        setValue(commandsArr[count]);
        setCount(count + 1);
      }
      if (count > commandsArr.length - 2) {
        setCount(0);
      }
    }
  }

  function handleChange(e) {
    setValue(e.target.value);
  }
  function execQueue() {
    if (!value) return;
    let valuesArr = value.split("; ");
    setCount(count + valuesArr.length - 1);
    for (let value of valuesArr) {
      setCommandsArr((commandsArr) => [...commandsArr, value]);
      ws.send(value);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (value) {
      execQueue();
      setCount(count + 1);
      setValue("");
    }
  }
  function handleClickFocus() {
    inputFocus.current.focus();
  }

  const ShowOnScrenCommands = () => {
    return (
      <div className="terminal-commands">
        {inputs.map((input, index) => {
          return (
            <div key={index} className="terminal-output">
              {input}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div
      className={`terminal`}
      style={{
        backgroundColor: color,
        color: textColor,
        fontSize: changeTextSize,
      }}
    >
      <nav className="terminal-navbar">
        <Navbar>
          <NavItem name="File">
            <DropdownMenu>
              <div className="dropdown-item-block">
                <div
                  className="dropdown-item"
                  onClick={() => killTerminalHandler()}
                >
                  Kill Terminal
                </div>
              </div>
            </DropdownMenu>
          </NavItem>
          <NavItem name="Edit">
            <DropdownMenu>
              <div className="dropdown-item-block">
                <div
                  className="dropdown-item"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  Background
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => setShowTextColorPicker(true)}
                >
                  Text Color
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => setShowTextSizeSlider(!showTextSizeSlider)}
                >
                  Text Size
                </div>
              </div>
            </DropdownMenu>
          </NavItem>
          <NavItem name="Terminal">
            <DropdownMenu>
              <div className="dropdown-item-block">
                <div
                  className="dropdown-item"
                  onClick={() => addTerminalHandler()}
                >
                  Split Terminal
                </div>
              </div>
            </DropdownMenu>
          </NavItem>
        </Navbar>
        {showColorPicker && (
          <div
            style={{ position: "absolute", width: "225px" }}
            onMouseLeave={() => setShowColorPicker(false)}
          >
            <ChromePicker
              color={color}
              onChange={(updatedColor) => setColor(updatedColor.hex)}
            />
          </div>
        )}
        {showTextColorPicker && (
          <div
            style={{ position: "absolute", width: "225px" }}
            onMouseLeave={() => setShowTextColorPicker(false)}
          >
            <ChromePicker
              styles={{ position: "absolute" }}
              color={textColor}
              onChange={(updatedColor) => setTextColor(updatedColor.hex)}
            />
          </div>
        )}
        {showTextSizeSlider && (
          <div
            style={{ position: "absolute", width: "100%", height: "25px" }}
            onMouseLeave={() => setShowTextSizeSlider(false)}
          >
            <Slider
              style={{ position: "absolute" }}
              axis="x"
              xstep={1}
              xmin={12}
              xmax={18}
              x={changeTextSize}
              onChange={({ x }) => setChangeTextSize(x)}
            />
          </div>
        )}
      </nav>
      <div className="terminal-content" onClick={handleClickFocus}>
        <div className="terminal-commands">
          Type help to see available commands
        </div>
        <div className="terminal-commands">
          To perform multiple commands split them using ';'
        </div>
        <div className="terminal-commands">
          Use arrow up/down to scroll through inserted commands
        </div>
        <div className="terminal-commands">
          If terminal session ends, refresh the browser, it will remember
          previous commands
        </div>
        <ShowOnScrenCommands />
        <div className="command-line">
          <form onSubmit={handleSubmit}>
            <span>$</span>
            <input
              type="text"
              value={value}
              onKeyDown={onArrowsHandle}
              onChange={handleChange}
              autoComplete="off"
              autoFocus="on"
              ref={inputFocus}
              style={{ color: textColor, fontSize: changeTextSize }}
            />
          </form>
          <div id="output"></div>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
