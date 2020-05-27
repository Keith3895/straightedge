import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MaterialInput } from "../materialInput";
import pretty from "pretty";
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(<MaterialInput />, container);
  });
  expect(container.textContent).toBe("");

  act(() => {
    render(<MaterialInput placeHolder="input 1" />, container);
  });
  expect(container.textContent).toBe("input 1");

  act(() => {
    render(<MaterialInput placeHolder="input 2" />, container);
  });
  expect(container.textContent).toBe("input 2");
});

it("renders with placeholder: snapshot", () => {
  act(() => {
    render(<MaterialInput placeHolder='input placeholder'/>, container);
  });
  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
