# WHAT'S MISSING?

## Class-based

- [x] keypad buttons don't move the B accordingly
  - [x] up
  - [x] down
  - [x] left
  - [x] right
  - [x] reset
- [x] first info box is updated with keypad activity
  - [x] coordinates display coordinates of B/active
  - [x] counter works
  - [x] on reset, b moves to 2,2 and counter goes to 0
- [x] form submit
  - [x] preventDefault
  - [x] post payload
    - [x] email
    - [x] don't submit unless email is valid
    - [x] if email === foo@bar.baz --> should get a 403 Forbidden (but everything else seems to work)
    - [x] count/steps
    - [x] x value
    - [x] y value
- [x] validation to stay inside the box
  - [x] if x == 3, messageValue = "You can't go right" & at next click messageValue = ''
  - [x] if x == 1, messageValue = "You can't go left" & at next click messageValue = ''
  - [x] if y == 1, messageValue = "You can't go up" & at next click messageValue = ''
  - [x] if y == 3, messageValue = "You can't go down" & at next click messageValue = ''

## Functional

- [ ] keypad buttons don't move the B accordingly
  - [ ] up
  - [ ] down
  - [ ] left
  - [ ] right
  - [ ] reset
- [ ] first info box is updated with keypad activity
  - [ ] coordinates display coordinates of B/active
  - [ ] counter works
  - [ ] on reset, b moves to 2,2 and counter goes to 0
- [ ] form submit
  - [] preventDefault
  - [ ] post payload
    - [ ] email
    - [ ] don't submit unless email is valid
    - [ ] if email === foo@bar.baz --> should get a 403 Forbidden (but everything else seems to work)
    - [ ] count/steps
    - [ ] x value
    - [ ] y value

onClick = (id) => {
if (x!==3 && x!== 1 && y!==3 && y!==3){
this.move(id)
messageValue = ''
} else {
messageValue = 'You can't move {direction}'
}
}

handleClick = (direction) => {
const { x, y, messageValue } = this.state;

// Check if the move is valid based on current position
if ((x !== 3 && direction === "right") || (x !== 1 && direction === "left") || (y !== 3 && direction === "down") || (y !== 1 && direction === "up")) {
// Valid move, clear messageValue
this.setState({ messageValue: "" });
this.move(direction);
} else {
// Invalid move, set appropriate messageValue
let invalidMessage = "You can't go ";
if (x === 3 && direction === "right") {
invalidMessage += "right";
} else if (x === 1 && direction === "left") {
invalidMessage += "left";
} else if (y === 3 && direction === "down") {
invalidMessage += "down";
} else if (y === 1 && direction === "up") {
invalidMessage += "up";
}
this.setState({ messageValue: invalidMessage });
}
};

//// GABES TIPS

- If after moving, coordinates are the same as before moving, you mustn't increment the step count, and you must set the error message, "you can't go the direction you tried to go"...

- If the new index is the same as the old index, then it didn't move because it was at the edge

- you're just rushing to increase the step count, and the index

- Before setting state, be like, wait a minute: if the new index is the same as the old index, then the "B" didn't move!
