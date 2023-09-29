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
//Test that the visible texts in headings, buttons, links... render on the screen

//1
test("renders without errors", () => {
  render(<AppFunctional />);
});

//2
test("renders initial states as expected", () => {
  render(<AppFunctional />);
  const coordinates = screen.queryByText(/coordinates/i);
  const steps = screen.queryByText(/you moved 0 times/i);
  const up = screen.queryByText(/up/i);
  const left = screen.queryByText(/left/i);
  const down = screen.queryByText(/down/i);
  const right = screen.queryByText(/right/i);
  const reset = screen.queryByText(/reset/i);
  const email = screen.getByPlaceholderText(/type email/i);

  //in document
  expect(coordinates).toBeInTheDocument();
  expect(steps).toBeInTheDocument();
  expect(up).toBeInTheDocument();
  expect(left).toBeInTheDocument();
  expect(down).toBeInTheDocument();
  expect(right).toBeInTheDocument();
  expect(reset).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});

//3
//// GOTTA FIX THIS, struggling to locate the submit button and also not sure if fireEvent will suffice as a replacement for userEvent /////
test("email input and submit button work", async () => {
  render(<AppFunctional />);
  const submitButton = screen.getByText(/submit/i);
  const input = screen.getByRole("input");

  fireEvent.type(input, "justinbyrd7@gmail.com");
  fireEvent.click(submitButton);

  await waitFor(() => {
    const messageDisplay = screen.queryByText("justinbyrd7");

    expect(messageDisplay).toBeInTheDocument;
  });
});

//4
test("", () => {
  render(<AppFunctional />);
});

//5
test("", () => {
  render(<AppFunctional />);
});

//Test that typing on the input results in its value changing to the entered text
