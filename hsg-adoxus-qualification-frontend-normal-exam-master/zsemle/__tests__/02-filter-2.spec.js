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
const filteredCategory = "ruházat";
const filterCondition = (a) => a.category === filteredCategory;
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
  title: `Shows the products from the filtered database.`,
  score: 0.01,
  test: async function () {
    for (let product of filteredResult) {
      expect(
        queryByText(document, product.name),
        `Doesn't show a product from the filtered database.`
      ).not.toBeNull();
    }

    for (let product of unfilteredResults) {
      expect(
        queryByText(document, product.name),
        `Shows a product which is not in the filtered database.`
      ).toBeNull();
    }
  },
});
