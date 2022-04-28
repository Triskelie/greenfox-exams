import * as path from "path";

import MetaFunction from "../autograder/utils/metaFunction";
// eslint-disable-next-line jest/no-mocks-import
import { initMocks, mockData } from "../__mocks__/mockDB";

const solutionPath = path.join(__dirname, "..", "src");
const functionName = "App";
const correctlyNamedFn = new MetaFunction({
  pathToScan: solutionPath,
  functionName,
});

const initTests = async (data = mockData) => {
  initMocks();
  const App = await correctlyNamedFn.getFn(["index.js", "loadData.js"]);
  return {
    App,
  };
};

const d2 = (d) => (d < 10 ? `0${d}` : d);

const dateTime = (date) => {
  const YYYY = date.getFullYear();
  const MM = d2(date.getMonth() + 1);
  const DD = d2(date.getDate());
  const hh = d2(date.getHours());
  const mm = d2(date.getMinutes());
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}`;
};

const dateTimeUTC = (date) => {
  const YYYY = date.getUTCFullYear();
  const MM = d2(date.getUTCMonth() + 1);
  const DD = d2(date.getUTCDate());
  const hh = d2(date.getUTCHours());
  const mm = d2(date.getUTCMinutes());
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}:00.000Z`;
};

export { initTests, dateTime, dateTimeUTC };
