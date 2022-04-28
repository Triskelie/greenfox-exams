/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {queryAllColumnCellsByHeaderText} from "testing-library-table-queries";
import {
  fireEvent,
  queryAllByRole,
  queryByText,
  waitFor,
} from "@testing-library/dom";
import {act} from "react-dom/test-utils";

import {gradeIt} from "../autograder/utils/grader";
import {initTests} from "./test-helper";
import {mockDB, mockDoc, mockDeleteDoc} from "../__mocks__/mockDB";

let App;

const getTableCells = async () => {
  const tables = await queryAllByRole(document, "table");
  const users = tables[0];
  const [head, ...cells] = await queryAllColumnCellsByHeaderText(
    users,
    "Műveletek"
  );

  expect(
    cells.length,
    `There are no cells in "Műveletek" column`
  ).toBeGreaterThan(0);
  return cells;
};

describe("Delete", () => {
  beforeAll(async () => {
    const testContext = await initTests();
    App = testContext.App;
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    window.history.pushState([], "Title", "/");
    await act(async () => render(<App/>));
    await waitFor(() => mockDB());
  });

  describe("Products table", () => {
    gradeIt({
      title: `Has a "Műveletek" column`,
      score: 0.01,
      test: async function () {
        const tables = await queryAllByRole(document, "table");

        expect(tables.length, `There is no table`).toBeGreaterThan(0);

        const appointments = tables[0];

        const target = await queryByText(appointments, /Műveletek/i);

        expect(tables, `There is no "Műveletek" column`).not.toBeNull();

        expect(
          target,
          `There is no "Műveletek" column in the table`
        ).not.toBeNull();
      },
    });

    gradeIt({
      title: `Has "Törlés" buttons in all rows`,
      score: 0.01,
      test: async function () {
        const tables = await queryAllByRole(document, "table");

        expect(tables.length, `There is no table`).toBeGreaterThan(0);

        const users = tables[0];
        const [head, ...cells] = await queryAllColumnCellsByHeaderText(
          users,
          "Műveletek"
        );

        expect(
          cells.length,
          `There are no cells in "Műveletek" column`
        ).toBeGreaterThan(0);

        const hasDeleteEverywhere = cells
          .map((cell) => cell.textContent)
          .every((cell) => /Törlés/i.test(cell));

        expect(
          hasDeleteEverywhere,
          `There is no "Törlés" button is all rows`
        ).toBeTruthy();
      },
    });
  });

  describe(`The "Törlés" button`, () => {
    gradeIt({
      title: `Deletes the proper document from Firestore when clicked`,
      score: 0.01,
      test: async function () {
        const cells = await getTableCells();

        const randomCell = cells[Math.floor(Math.random() * cells.length)];
        const randomDeleteButton = [...randomCell.getElementsByTagName("button")].find(
          (button) => button.id.indexOf("delete") > -1
        );
        const expectedId = randomDeleteButton.id.split("-")[1];

        await waitFor(() => fireEvent.click(randomDeleteButton));

        expect(mockDeleteDoc, `Delete was not called`).toHaveBeenCalled();
        expect(mockDoc, `Doc was called with wrong id`).toHaveBeenCalledWith(
          expect.anything(),
          "registrations",
          expectedId
        );
      },
    });

  });


});

