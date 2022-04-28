/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { queryByLabelText, queryByText } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

import { gradeIt } from "../autograder/utils/grader";
import { initTests } from "./test-helper";
import { mockData, mockWhere, mockDB } from "../__mocks__/mockDB";

let App;

beforeAll(async () => {
  const testContext = await initTests();
  App = testContext.App;
});

beforeEach(async () => {
  jest.clearAllMocks();
  window.history.pushState([], "Title", "/");
  await act(async () => render(<App />));
  await waitFor(() => mockDB());
});

const checkboxLabel = "Aktív felhasználók";
const checkboxLabelRegex = new RegExp(`^${checkboxLabel}$`, "i");

gradeIt({
  title: `Should have a "${checkboxLabel}" non-empty select field with label on the form`,
  score: 0.01,
  test: async function () {
    const checkbox = await queryByLabelText(document.body, checkboxLabelRegex);

    expect(checkbox, `No checkbox in the document`).not.toBeNull();
    expect(
      checkbox,
      `There isn't any 'checkbox' found in the form for label '${checkbox}'`
    ).not.toBeNull();
    expect(checkbox.checked, `checkbox shouldn't be checked by dafault`).toBe(false);
  },
});
