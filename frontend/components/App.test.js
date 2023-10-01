import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// import userEvent from "@testing-library/user-event";
import AppFunctional from "./AppFunctional";

// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

// write 5 tests
// [x] Test that the visible texts in headings, buttons, links... render on the screen

//1
test("1. renders without errors", () => {
  render(<AppFunctional />);
});

//2
test("2. coordinates and steps render to the screen", () => {
  render(<AppFunctional />);
  const coordinates = screen.queryByText(/coordinates/i);
  const steps = screen.queryByText(/you moved 0 times/i);

  expect(coordinates).toBeInTheDocument();
  expect(steps).toBeInTheDocument();
});

//3
test("3. directions buttons render to the screen", () => {
  render(<AppFunctional />);
  const up = screen.queryByText(/up/i);
  const left = screen.queryByText(/left/i);
  const down = screen.queryByText(/down/i);
  const right = screen.queryByText(/right/i);

  expect(up).toBeInTheDocument();
  expect(left).toBeInTheDocument();
  expect(down).toBeInTheDocument();
  expect(right).toBeInTheDocument();
});

//4
test("4. reset renders to the screen", () => {
  render(<AppFunctional />);
  const reset = screen.queryByText(/reset/i);

  expect(reset).toBeInTheDocument();
});

//5
test("5. typing in the email input changes the value of the input", () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText("type email");

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });

  expect(emailInput.value).toBe("test@example.com");
});

// [x] Test that typing on the input results in its value changing to the entered text
