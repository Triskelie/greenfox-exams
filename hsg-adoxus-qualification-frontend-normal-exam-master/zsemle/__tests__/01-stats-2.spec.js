/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { queryAllCells, getAllRows } from "testing-library-table-queries";
import { queryAllByRole, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

import { gradeIt } from "../autograder/utils/grader";
import {
  categoryFrequency,
  mockData,
  mockDB,
  sumProductPrice,
} from "../__mocks__/mockDB";
import { initTests } from "./test-helper";

let App;
const headTitles = ["Kategória", "Darab", "Összeg"];
const filteredCategory = "ruházat";
const filterCondition = (a) => a.category === filterCondition;
const filteredResult = mockData.filter(filterCondition);

beforeAll(async () => {
  const testContext = await initTests(filteredResult);
  App = testContext.App;
});

beforeEach(async () => {
  jest.clearAllMocks();
  window.history.pushState([], "Title", "/");
  await act(async () => render(<App />));
  await waitFor(() => mockDB(filteredResult));
});

describe("Stats table", () => {
  gradeIt({
    title: `Calculates stats correctly from the filtered database`,
    score: 0.01,
    test: async function () {
      const statsTable = queryAllByRole(document, "table")[1];

      expect(statsTable, `There is no stats table`).not.toBeUndefined();

      const rows = getAllRows(statsTable);

      const categoryCounts = categoryFrequency();

      // skips first row
      for (let i = 1; i < rows.length; i++) {
        const row = rows[1];
        const cells = queryAllCells(row);
        const category = cells[0].textContent.toLowerCase();
        const sumCount = Number(cells[1].textContent);
        const sumPrice = Number(cells[2].textContent.match(/[0-9]+/g).join(""));

        const expectedCount =
          category === filteredCategory ? categoryCounts[category] : 0;
        const expectedPrice =
          category === filteredCategory ? sumProductPrice(filteredCategory) : 0;

        expect(sumCount, `Wrong count sum for ${category}`).toBe(expectedCount);
        expect(sumPrice, `Wrong price sum for ${category}`).toBe(expectedPrice);
      }
    },
  });
});
