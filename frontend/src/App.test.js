import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./app";

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

it("renders user data", async () => {
  const fakeMessage = {
    message: "Lorem Ipsum",
    created: "2022-03-14 05:30:41",
    name: "Christy Leung",
    id: 1
  };
  jest.spyOn(global, "setComments").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeMessage)
    })
  );

  await act(async () => {
    render(<article id="1" />, container);
  });

  expect(container.querySelector(".main-message").textContent).toBe(fakeMessage.message);
  expect(container.textContent).toContain(fakeMessage.created);

  global.fetch.mockRestore();
});