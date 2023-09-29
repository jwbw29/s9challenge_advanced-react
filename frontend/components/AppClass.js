import React from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const URL = "http://localhost:9000/api/result";

const initialState = {
  index: initialIndex,
  steps: initialSteps,
};

export default class AppClass extends React.Component {
  state = {
    emailValue: initialState.message,
    indexValue: initialState.index,
    stepsValue: initialState.steps,
    messageValue: initialState.message,
  };
  getXY = () => {
    const x = this.state.indexValue % 3;
    const y = Math.floor(this.state.indexValue / 3);
    return { x, y };
  };

  getXYMessage = () => {
    const { x, y } = this.getXY();
    return `Coordinates (${x + 1}, ${y + 1})`;
  };

  reset = () => {
    this.setState({
      indexValue: initialIndex,
      stepsValue: initialSteps,
      messageValue: "", // Reset the message
      emailValue: "",
    });
  };
  getNextIndex = (direction) => {
    const { indexValue } = this.state;
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

  move = (direction) => {
    const { stepsValue, indexValue } = this.state;
    const newIndex = this.getNextIndex(direction);
    const newSteps = stepsValue + 1;

    if (indexValue === newIndex) {
      // move should not happen and message should display
      this.setState({
        messageValue: `You can't go ${direction}`,
      });
    } else {
      // normal move process should happen
      this.setState({
        indexValue: newIndex,
        stepsValue: newSteps,
      });
    }
  };

  onChange = (evt) => {
    this.setState({
      emailValue: evt.target.value,
    });
  };

  postValues = () => {
    const { x, y } = this.getXY();
    const { stepsValue, emailValue } = this.state;

    const payload = {
      x: x + 1, // Add 1 to x and y to match the server's 1-based indexing
      y: y + 1,
      steps: stepsValue,
      email: emailValue,
    };

    axios
      .post(URL, payload)
      .then((res) => {
        this.setState({ messageValue: res.data.message });
      })
      .catch((err) => {
        this.setState({ messageValue: err.response.data.message });
      });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    if (!this.state.emailValue) {
      this.setState({ messageValue: "Ouch: email is required." });
    }
    this.postValues();
    this.setState({ ...this.state, emailValue: "" });
  };

  render() {
    const { className } = this.props;
    const { messageValue, stepsValue } = this.state;

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">
            You moved {stepsValue} {stepsValue === 1 ? "time" : "times"}
          </h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
            const x = idx % 3;
            const y = Math.floor(idx / 3);
            const isActive = x === this.getXY().x && y === this.getXY().y;

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
          <button onClick={() => this.move("left")} id="left">
            LEFT
          </button>
          <button onClick={() => this.move("up")} id="up">
            UP
          </button>
          <button onClick={() => this.move("right")} id="right">
            RIGHT
          </button>
          <button onClick={() => this.move("down")} id="down">
            DOWN
          </button>
          <button onClick={this.reset} id="reset">
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            value={this.state.emailValue}
            onChange={this.onChange}
          />
          <input id="submit" type="submit" />
        </form>
      </div>
    );
  }
}
