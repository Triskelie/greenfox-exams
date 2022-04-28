/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import {
  fireEvent,
  getByText,
  queryByLabelText,
  queryByText,
  waitFor,
} from "@testing-library/dom";
import { act } from "react-dom/test-utils";

import { gradeIt } from "../autograder/utils/grader";
import { initTests } from "./test-helper";
import { categories } from "../src/utils";
import { mockAddDoc, mockCollection } from "../__mocks__/mockDB";

let App;
const pageTitle = "Új termék felvitele";
const inputs = [
  {
    id: "name",
    type: "text",
    label: "Termék",
  },
  {
    id: "category",
    type: "select",
    label: "Kategória",
    options: ["Válassz!", ...Object.values(categories)],
  },
  {
    id: "price",
    type: "number",
    label: "Egységár",
  },
  {
    id: "count",
    type: "number",
    label: "Darab",
  },
];

const validData = {
  name: "tejföl",
  category: "élelmiszer",
  price: 200,
  count: 5,
};

const fillFormWithValidData = async (except) => {
  for (let [fId, goodValue] of Object.entries(validData)) {
    if (fId === except) continue;
    const f = document.getElementById(fId);
    expect(f, `There is no ${fId} field`).not.toBeNull();
    await waitFor(() => fireEvent.change(f, { target: { value: goodValue } }));
  }
};

const submitForm = async () => {
  waitFor(async () => {
    const saveButton = queryByText(document, /Mentés/i);
    expect(
      saveButton,
      `There is no "Mentés" button in the document'`
    ).not.toBeNull();
    await fireEvent.click(saveButton);
  });
};

const testInput = ({ id, type, label, options }) => {
  const fieldById = document.getElementById(id);
  const fieldByLabel = queryByLabelText(document, label);

  expect(fieldById, `There is no ${id} id`).not.toBeNull();
  expect(fieldByLabel, `There is no "${label}" label`);
  expect(fieldByLabel?.getAttribute("id"), `Wrong label - id connection`).toBe(
    id
  );
  if (type === "select") {
    const definedOptions = Array.from(fieldById.querySelectorAll("option")).map(
      (o) => o.textContent.toLowerCase()
    );

    expect(
      options.every((o) => definedOptions.includes(o.toLowerCase())),
      `Incorrect options: ${definedOptions}`
    ).toBeTruthy();
  } else {
    expect(
      fieldById?.getAttribute("type"),
      `"${label}" is not a ${type} input`
    ).toBe(type);
  }
};

describe("New product page", () => {
  beforeAll(async () => {
    const testContext = await initTests();
    App = testContext.App;
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    window.history.pushState([], "Title", "/products/add");
    await act(async () => render(<App />));
  });

  gradeIt({
    title: `Has a h1 title: ${pageTitle}`,
    score: 0.01,
    test: function () {
      const title = queryByText(document, new RegExp(`^${pageTitle}$`, "i"));

      expect(
        title,
        `There is no "${pageTitle}" text in the document'`
      ).not.toBeNull();
      expect(title.nodeName, `"${pageTitle}" is not h1`).toMatch(/h1/i);
    },
  });

  gradeIt({
    title: `Has <form> tag`,
    score: 0.01,
    test: function () {
      const form = document.querySelector("form");
      expect(form, `There is no <form> tag in the document'`).not.toBeNull();
    },
  });

  describe("Inputs", () => {
    for (let input of inputs) {
      gradeIt({
        title: `Has a correct "${input.label}" input`,
        score: 0.01,
        test: function () {
          testInput(input);
        },
      });
    }
  });

  gradeIt({
    title: `Has a "Mentés" button`,
    score: 0.01,
    test: function () {
      const saveButton = queryByText(document, "Mentés");

      expect(
        saveButton,
        `There is no "Mentés" button in the document'`
      ).not.toBeNull();
    },
  });

  describe("Validations", () => {
    const validationCase = (input, expectedError, onFocusOut = false) => ({
      input,
      expectedError,
      onFocusOut,
    });

    const validations = {
      name: [
        validationCase("", "Kitöltése kötelező"),
        validationCase("a", "Leglább 2 karakter hosszú legyen"),
      ],
      category: [validationCase("", "Kitöltése kötelező")],
      price: [
        validationCase("", "Kitöltése kötelező"),
        validationCase(-1, "Nem lehet negatív"),
      ],
      count: [
        validationCase("", "Kitöltése kötelező"),
        validationCase(-1, "1 és 10 közötti érték legyen"),
        validationCase(0, "1 és 10 közötti érték legyen"),
        validationCase(11, "1 és 10 közötti érték legyen"),
      ],
    };

    gradeIt({
      title: `No error message when all fields are valid`,
      score: 0.01,
      test: async function () {
        await fillFormWithValidData();
        await submitForm();
        const errors = [...document.querySelectorAll(".invalid-feedback")]
          .filter((e) => e.textContent)
          .map((e) => e.textContent);

        expect(errors.length, `Shows errors: ${errors}`).toBe(0);
      },
    });

    for (let [fieldId, cases] of Object.entries(validations)) {
      for (let c of cases) {
        let title = `${fieldId}`;
        title += ` should${
          !c.expectedError.length ? "n't" : ""
        } write error when ${c.input} is given`;
        title += `${!c.expectedError.length ? "" : ": " + c.expectedError}`;

        gradeIt({
          title,
          score: 0.01,
          test: async function () {
            const field = document.getElementById(fieldId);

            expect(field, `There is no ${fieldId} field`).not.toBeNull();

            if (field.getAttribute("type") === "number" && !c.input) {
              await fillFormWithValidData(fieldId);
            } else {
              await fillFormWithValidData();
            }

            await waitFor(() =>
              fireEvent.change(field, { target: { value: c.input } })
            );

            await submitForm();

            const errors = [...document.querySelectorAll(".invalid-feedback")]
              .filter((e) => e.textContent)
              .map((e) => e.textContent);

            if (c.expectedError) {
              expect(
                getByText(document, c.expectedError),
                `"${c.expectedError}" error doesn't appear`
              ).not.toBeNull();
            } else {
              expect(errors.length, `Shows errors: ${errors}`).toBe(0);
            }
          },
        });
      }
    }
  });

  describe("Successful submit", () => {
    gradeIt({
      title: `Shows "Sikeres mentés" message when successful submit`,
      score: 0.01,
      test: async function () {
        await fillFormWithValidData();
        await submitForm();

        const notification = queryByText(document, /Sikeres mentés/i);

        expect(
          notification,
          `There is no "Sikeres mentés" text in the document'`
        ).not.toBeNull();
      },
    });

    gradeIt({
      title: `Resets input field values after successful submit`,
      score: 0.01,
      test: async function () {
        await fillFormWithValidData();
        await submitForm();

        const defaultValues = {
          name: { prop: "value", value: "" },
          category: { prop: "value", value: "" },
          price: { prop: "value", value: "" },
          count: { prop: "value", value: "" },
        };

        Object.entries(defaultValues).forEach(([id, { prop, value }]) => {
          const inputField = document.getElementById(id);

          expect(inputField, `There is no ${id} field`).not.toBeNull();

          expect(
            inputField[prop],
            `${id} input contains "${inputField[prop]}"`
          ).toBe(value);
        });
      },
    });

    gradeIt({
      title: `Saves form data to Firestore`,
      score: 0.01,
      test: async function () {
        const expectedData = { ...validData };

        await fillFormWithValidData();
        await submitForm();

        expect(
          mockCollection,
          `Firestore collection was called wrong`
        ).toHaveBeenCalledWith(expect.anything(), "zsemle");
        expect(
          mockAddDoc,
          `Firestore add was called with incorrect data`
        ).toHaveBeenCalledWith(
          undefined,
          expect.objectContaining(expectedData)
        );
      },
    });
  });
});
