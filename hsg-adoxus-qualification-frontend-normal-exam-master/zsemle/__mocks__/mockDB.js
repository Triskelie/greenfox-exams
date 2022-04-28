import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { categories } from "../src/utils";

export const mockFirestore = jest.fn();
export const mockCollection = jest.fn();
export const mockQuery = jest.fn();
export const mockWhere = jest.fn();
export const mockDoc = jest.fn();
export const mockGetDocs = jest.fn(() => Promise.resolve(mockDBResponse()));
export const mockAddDoc = jest.fn();
export const mockUpdateDoc = jest.fn();
export const mockDeleteDoc = jest.fn();

export const initMocks = () => {
  jest.mock("firebase/app", () => ({ initializeApp: jest.fn() }));
  jest.mock("firebase/firestore", () => ({
    getFirestore: jest.fn(() => mockFirestore),
    collection: mockCollection,
    query: mockQuery,
    where: mockWhere,
    doc: mockDoc,
    getDocs: mockGetDocs,
    addDoc: mockAddDoc,
    updateDoc: mockUpdateDoc,
    deleteDoc: mockDeleteDoc,
  }));
};

export const mockData = [
  {
    id: "1",
    name: "ing",
    category: "ruházat",
    price: 1000,
    count: 1,
  },
  {
    id: "2",
    name: "nadrág",
    category: "ruházat",
    price: 2000,
    count: 2,
  },
  {
    id: "3",
    name: "sampon",
    category: "vegyiáru",
    price: 500,
    count: 1,
  },
  {
    id: "4",
    name: "olaj",
    category: "élelmiszer",
    price: 300,
    count: 1,
  },
  {
    id: "5",
    name: "mobil",
    category: "elektronika",
    price: 123000,
    count: 1,
  },
];

let mockDBResponse = () => mockDBResponseTemplate();

export const mockDBResponseTemplate = (results = mockData) => ({
  docs: results.map((result) => ({
    data: () => result,
    id: result.id,
  })),
});

export const mockDB = (db = mockData) => {
  mockDBResponse = () => mockDBResponseTemplate(db);
};

export const categoryFrequency = () => {
  return mockData.reduce(
    (freq, p) => {
      freq[p.category] += p.count;
      return freq;
    },
    Object.values(categories).reduce((freq, c) => {
      freq[c] = 0;
      return freq;
    }, {})
  );
};

export const sumProductCount = (category) =>
  mockData
    .filter((p) => (!!category ? p.category === category : true))
    .reduce((sum, p) => sum + p.count, 0);

export const sumProductPrice = (category) =>
  mockData
    .filter((p) => (!!category ? p.category === category : true))
    .reduce((sum, p) => sum + p.price * p.count, 0);
