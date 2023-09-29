import React from "react";
import axios from "axios";
import { useState } from "react";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const URL = "http://localhost:9000/api/result";

export default function AppFunctional(props) {
  const [emailValue, setEmailValue] = useState(initialEmail);
  const [indexValue, setIndexValue] = useState(initialIndex);
  const [stepsValue, setStepsValue] = useState(initialSteps);
  const [messageValue, setMessageValue] = useState(initialMessage);

  const getXY = () => {
    const x = indexValue % 3;
    const y = Math.floor(indexValue / 3);
    return { x, y };
  };

  const getXYMessage = () => {
    const { x, y } = getXY();
    return `Coordinates (${x + 1}, ${y + 1})`;
  };

  const reset = () => {
    setIndexValue(initialIndex),
      setStepsValue(initialSteps),
      setMessageValue("");
    setEmailValue("");
  };

  const getNextIndex = (direction) => {
    let x = indexValue % 3;
    let y = Math.floor(indexValue / 3);

    switch (direction) {
      case "left":
        x = Math.max(x - 1, 0);
        break;
      case "up":
        y = Math.max(y - 1, 0);
        break;
      case "down":
        y = Math.min(y + 1, 2);
        break;
      case "right":
        x = Math.min(x + 1, 2);
        break;
      default:
        break;
    }

    const newIndex = y * 3 + x;
    return newIndex;
  };

  const move = (direction) => {
    const newIndex = getNextIndex(direction);
    const newSteps = stepsValue + 1;

    if (indexValue === newIndex) {
      // move should not happen and message should display
      setMessageValue(`You can't go ${direction}`);
    } else {
      // normal move process should happen
      setIndexValue(newIndex);
      setStepsValue(newSteps);
    }
  };

  const onChange = (evt) => {
    setEmailValue(evt.target.value);
  };

  const postValues = () => {
    const { x, y } = getXY();

    const payload = {
      x: x + 1, // Add 1 to x and y to match the server's 1-based indexing
      y: y + 1,
      steps: stepsValue,
      email: emailValue,
    };

    axios
      .post(URL, payload)
      .then((res) => {
        setMessageValue(res.data.message);
      })
      .catch((err) => {
        setMessageValue(err.response.data.message);
      });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!emailValue) {
      setMessageValue("Ouch: email is required.");
    }
    postValues();
    setEmailValue(initialEmail);
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">
          You moved {stepsValue} {stepsValue === 1 ? "time" : "times"}
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
          const x = idx % 3;
          const y = Math.floor(idx / 3);
          const isActive = x === getXY().x && y === getXY().y;

          return (
            <div key={idx} className={`square${isActive ? " active" : ""}`}>
              {isActive ? "B" : null}
            </div>
          );
        })}
      </div>
      <div className="info">
        <h3 id="message">{messageValue}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => move("left")} id="left">
          LEFT
        </button>
        <button onClick={() => move("up")} id="up">
          UP
        </button>
        <button onClick={() => move("right")} id="right">
          RIGHT
        </button>
        <button onClick={() => move("down")} id="down">
          DOWN
        </button>
        <button onClick={reset} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={emailValue}
          onChange={onChange}
        />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}
