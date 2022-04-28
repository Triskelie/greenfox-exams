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
import { initTests } from "./test-helper";
import {
  sumRoleCount,
  sumProductPrice,
  roleFrequency,
  mockDB,
} from "../__mocks__/mockDB";

let App;
const headTitles = ["Jogkör", "Darab"];

describe("Stats table", () => {
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

  gradeIt({
    title: `Contains a table for the statistics`,
    score: 0.01,
    test: async function () {
      const tables = await queryAllByRole(document, "table");
      expect(
        tables.length,
        `There is no 'table' for stats found in the document'`
      ).toBe(2);
    },
  });

  gradeIt({
    title: `Has correct columns`,
    score: 0.01,
    test: async function () {
      const statsTable = queryAllByRole(document, "table")[1];

      expect(statsTable, `There is no stats table`).not.toBeUndefined();

      const rows = getAllRows(statsTable);
      const head = rows[0];
      const headColumns = queryAllCells(head);
      const headColumnTitles = headColumns.map((c) =>
        c.textContent.toLowerCase()
      );
      const expectedColumnAmount = headTitles.length;

      expect(
        headColumns.length,
        `The number of columns is not ${expectedColumnAmount}'`
      ).toBe(expectedColumnAmount);
      for (let title of headTitles) {
        expect(headColumnTitles, `No "${title}" column title`).toContain(
          title.toLowerCase()
        );
      }
    },
  });

  gradeIt({
    title: `Shows correct values`,
    score: 0.01,
    test: async function () {
      const statsTable = queryAllByRole(document, "table")[1];

      expect(statsTable, `There is no stats table`).not.toBeUndefined();

      const rows = getAllRows(statsTable);

      const roleCounts = roleFrequency();

      // skips first and last rows
      for (let i = 1; i < rows.length - 1; i++) {
        const row = rows[i];
        const cells = queryAllCells(row);
        const category = cells[0].textContent.toLowerCase();
        const count = Number(cells[1].textContent);
        expect(count, `Wrong count for ${category}`).toBe(
          roleCounts[category]
        );
      }
    },
  });

  gradeIt({
    title: `Has correct summary at the end`,
    score: 0.01,
    test: async function () {
      const statsTable = queryAllByRole(document, "table")[1];

      expect(statsTable, `There is no stats table`).not.toBeUndefined();

      const rows = getAllRows(statsTable);
      const summary = rows[rows.length - 1];
      const summaryCells = queryAllCells(summary);
      const expectedCountSum = sumRoleCount();

      expect(
        summaryCells[0].textContent.toLowerCase(),
        `There is no "összesen" cell`
      ).toBe("összesen");
      expect(
        Number(summaryCells[1].textContent),
        `The calculated sum count is wrong`
      ).toBe(expectedCountSum);
    },
  });
});
