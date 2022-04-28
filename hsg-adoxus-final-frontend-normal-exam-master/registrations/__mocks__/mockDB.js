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
    email: "dek84@mailbox.hu",
    fullName: "Deák Kitti",
    role: "vendég",
    yearOrBirth: 1987,
  },
  {
    id: "2",
    email: "farkas52@mailbox.hu",
    fullName: "Farkas József",
    role: "regisztrált felhasználó",
    yearOrBirth: 1928,
  },
  {
    id: "3",
    email: "szcs.botond@gmail.com",
    fullName: "Szűcs Botond",
    role: "vendég",
    yearOrBirth: 1922,
  },
  {
    id: "4",
    email: "lukcs38@freemail.hu",
    fullName: "Lukács Benedek",
    role: "vendég",
    yearOrBirth: 1994,
  },
  {
    id: "5",
    email: "somogyidvid65@mailbox.hu",
    fullName: "Somogyi Dávid",
    role: "regisztrált felhasználó",
    yearOrBirth: 1945,
  },
];

export const roles = ["admin", "vendég", "regisztrált felhasználó"];

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

export const roleFrequency = () => {
  return mockData.reduce(
    (freq, p) => {
      freq[p.role] += 1;
      return freq;
    },
    Object.values(roles).reduce((freq, c) => {
      freq[c] = 0;
      return freq;
    }, {})
  );
};

export const sumRoleCount = (role) =>
  mockData
    .filter((p) => (!!role ? p.role === role : true))
    .reduce((sum, p) => sum + 1, 0);

export const sumProductPrice = (category) =>
  mockData
    .filter((p) => (!!category ? p.category === category : true))
    .reduce((sum, p) => sum + p.price * p.count, 0);
