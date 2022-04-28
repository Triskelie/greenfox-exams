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
import { categories } from "../src/utils";

let App;
const categoryNames = Object.values(categories);

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

const selectLabel = "Szűrés kategóriára";
const selectLabelRegex = new RegExp(`^${selectLabel}$`, "i");

gradeIt({
  title: `Should have a "${selectLabel}" non-empty select field with label on the form`,
  score: 0.01,
  test: async function () {
    const select = await queryByLabelText(document.body, selectLabelRegex);

    expect(select, `No select in the document`).not.toBeNull();
    expect(
      select,
      `There isn't any 'select' found in the form for label '${selectLabel}'`
    ).not.toBeNull();
    expect(select, `'select' has not empty initial value`).toHaveValue("");
  },
});

gradeIt({
  title: `"${selectLabel}" select should have ${
    categoryNames.length + 1
  } options`,
  score: 0.01,
  test: async function () {
    const optionCount = categoryNames.length + 1;
    const select = await queryByLabelText(document, selectLabelRegex);

    expect(select, `No select in the document`).not.toBeNull();

    const options = Array.from(select?.querySelectorAll("option"));

    expect(
      options,
      `The select should have ${optionCount} options.`
    ).toHaveLength(optionCount);
  },
});

gradeIt({
  title: `"${selectLabel}" select should have correct option texts and values`,
  score: 0.01,
  test: async function () {
    const select = await queryByLabelText(document, selectLabelRegex);

    expect(select, `No select in the document`).not.toBeNull();

    const options = Array.from(select?.querySelectorAll("option"));

    categoryNames.forEach((s) => {
      expect(
        options.find((o) => o.value === s),
        `"${s}" value is not represented`
      ).not.toBeUndefined();
      expect(
        options.find((o) => o.textContent === s),
        `"${s}" text is not represented`
      ).not.toBeUndefined();
    });
    expect(
      options.find((o) => o.textContent === "Válassz!")
    ).not.toBeUndefined();
    expect(options.find((o) => o.textContent === "Válassz!")?.value).toBe("");
  },
});

gradeIt({
  title: `"${selectLabel}" select should show "Válassz!" text content by default`,
  score: 0.01,
  test: async function () {
    const select = await queryByLabelText(document, selectLabelRegex);

    expect(select, `No select in the document`).not.toBeNull();

    let options = [];

    options = Array.from(select?.querySelectorAll("option"));

    expect(
      options[0],
      'The default option is not "Válassz!"'
    ).toHaveTextContent("Válassz!");
  },
});

gradeIt({
  title: `Shows all products when no "${selectLabel}" option is selected.`,
  score: 0.01,
  test: async function () {
    const arePresented = [];
    await waitFor(() => {
      mockData.forEach(async (product) => {
        const ap = await queryByText(document, product.name);
        arePresented.push(!!ap);
      });
    });

    const isAllRepresented = arePresented.every((a) => a);

    expect(isAllRepresented, `Not all products are in the table`).toBeTruthy();
  },
});

gradeIt({
  title: `Filters the products correctly from Firestore when a "${selectLabel}" option is selected.`,
  score: 0.01,
  test: async function () {
    const select = await queryByLabelText(document, selectLabelRegex);

    expect(select, `No select in the document`).not.toBeNull();

    for (let category of categoryNames) {
      await waitFor(() =>
        fireEvent.change(select, { target: { value: category } })
      );
      expect(
        mockWhere,
        `${category} filtering doesn't happen`
      ).toHaveBeenCalledWith("category", "==", category);
    }
  },
});
