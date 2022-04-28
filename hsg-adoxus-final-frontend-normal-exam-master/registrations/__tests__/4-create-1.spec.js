/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { fireEvent, queryByText, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

import { gradeIt } from "../autograder/utils/grader";
import { initTests } from "./test-helper";

let App;
const registrationButtonLabel = "Új felhasználó";
const registrationButtonRegex = new RegExp(`^${registrationButtonLabel}$`, "i");

describe("New user CTA button", () => {
  beforeAll(async () => {
    const testContext = await initTests();
    App = testContext.App;
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    window.history.pushState([], "Title", "/");
    await act(async () => render(<App />));
  });

  gradeIt({
    title: `Has title: "${registrationButtonLabel}"`,
    score: 0.01,
    test: async function () {
      const reservationButton = queryByText(document, registrationButtonRegex);

      expect(
        reservationButton,
        `There is no ${registrationButtonLabel} button`
      ).not.toBeNull();

      expect(
        reservationButton,
        `There is no ${registrationButtonLabel} in the document'`
      ).not.toBeNull();
    },
  });

  gradeIt({
    title: `Redirects correctly when clicked`,
    score: 0.01,
    test: async function () {
      const reservationButton = queryByText(document, registrationButtonRegex);
      const expectedUrl = /users\/new$/;

      expect(
        reservationButton,
        `There is no ${registrationButtonLabel} button`
      ).not.toBeNull();

      await waitFor(() => fireEvent.click(reservationButton));

      expect(window.location.href, `Incorrect redirect url`).toMatch(
        expectedUrl
      );
    },
  });
});
