/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { queryByText, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

import { gradeIt } from "../autograder/utils/grader";
import { mockData, mockDB } from "../__mocks__/mockDB";
import { initTests } from "./test-helper";

let App;
const filteredRole = "admin";
const filterCondition = (a) => a.role === filteredRole;
const filteredResult = mockData.filter((a) => filterCondition(a));
const unfilteredResults = mockData.filter((a) => !filterCondition(a));

beforeAll(async () => {
  const testContext = await initTests(filteredResult);
  App = testContext.App;
});

beforeEach(async () => {
  jest.clearAllMocks();
  window.history.pushState([], "Title", "/");
  await waitFor(() => mockDB(filteredResult));
  await act(async () => render(<App />));
});

gradeIt({
  title: `Shows the users from the filtered database by role`,
  score: 0.01,
  test: async function () {
    for (let user of filteredResult) {
      expect(
        queryByText(document, user.email),
        `Doesn't show a user from the filtered database.`
      ).not.toBeNull();
    }

    for (let user of unfilteredResults) {
      expect(
        queryByText(document, user.email),
        `Shows a user which is not in the filtered database.`
      ).toBeNull();
    }
  },
});
