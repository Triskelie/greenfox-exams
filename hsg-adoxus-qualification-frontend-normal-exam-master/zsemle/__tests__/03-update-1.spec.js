/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { queryAllByRole } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

import { gradeIt } from "../autograder/utils/grader";
import { initTests } from "./test-helper";
import { mockDB, mockDoc, mockUpdateDoc } from "../__mocks__/mockDB";
import { queryAllColumnCellsByHeaderText } from "testing-library-table-queries";

let App;

const getTableCells = async () => {
  const tables = await queryAllByRole(document, "table");
  const products = tables[0];
  const [head, ...cells] = await queryAllColumnCellsByHeaderText(
    products,
    "Műveletek"
  );

  expect(
    cells.length,
    `There are no cells in "Műveletek" column`
  ).toBeGreaterThan(0);
  return cells;
};

describe("Increment / decrement count", () => {
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
    title: `Has at least one icon in all rows`,
    score: 0.01,
    test: async function () {
      const cells = await getTableCells();

      const hasIconInAllRows = cells.every(
        (cell) => !!cell.getElementsByTagName("i").length
      );

      expect(hasIconInAllRows, `Doesn't have an icon in all rows`).toBeTruthy();
    },
  });

  gradeIt({
    title: `Increments the proper document in Firestore when clicked`,
    score: 0.01,
    test: async function () {
      const cells = await getTableCells();

      const randomCell = cells[Math.floor(Math.random() * cells.length)];
      const randomIncrementButton = randomCell.getElementsByTagName("i")[0];
      const buttonId = randomIncrementButton.id;
      const productId = buttonId.split("-")[1];

      await waitFor(() => fireEvent.click(randomIncrementButton));

      expect(mockDoc, `Doc was not called with proper id`).toHaveBeenCalledWith(
        expect.anything(),
        "zsemle",
        productId
      );
      expect(mockUpdateDoc, `Update was not called`).toHaveBeenCalled();
    },
  });

  gradeIt({
    title: `Has at least 2 icons in all rows`,
    score: 0.01,
    test: async function () {
      const cells = await getTableCells();

      const hasIconInAllRows = cells.every(
        (cell) => cell.getElementsByTagName("i").length > 1
      );

      expect(hasIconInAllRows, `Doesn't have 2 icons in all rows`).toBeTruthy();
    },
  });

  gradeIt({
    title: `Decrements the proper document in Firestore when clicked`,
    score: 0.01,
    test: async function () {
      const cells = await getTableCells();

      const randomCell = cells[Math.floor(Math.random() * cells.length)];
      const randomIncrementButton = randomCell.getElementsByTagName("i")[1];
      const buttonId = randomIncrementButton.id;
      const productId = buttonId.split("-")[1];

      await waitFor(() => fireEvent.click(randomIncrementButton));

      expect(mockDoc, `Doc was not called with proper id`).toHaveBeenCalledWith(
        expect.anything(),
        "zsemle",
        productId
      );
      expect(mockUpdateDoc, `Update was not called`).toHaveBeenCalled();
    },
  });
});
