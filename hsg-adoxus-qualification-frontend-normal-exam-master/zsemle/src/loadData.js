import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Készítsd el a saját config.js fájlodat a config.example.js fájl alapján
import firebaseConfig from "./firebase/config";
import { products, categoryPriceRanges } from "./utils";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

firebase
  .auth()
  .signInAnonymously()
  .then(() => {
    console.log("signed in");
  })
  .catch((error) => {
    console.error(error);
  });

firebase.auth().onAuthStateChanged(async (user) => {
  const promises = [];

  if (user) {
    for (let index = 0; index < 10; index++) {
      const rndProduct = randomProduct();
      const priceRange = categoryPriceRanges[rndProduct.category];
      const product = {
        name: rndProduct.name,
        category: rndProduct.category,
        price: generateRandomInt(priceRange.min, priceRange.max),
        count: generateRandomInt(1, 5),
      };

      const writePromise = db
        .collection("zsemle")
        .doc(index + "")
        .set(product)
        .then(() => {
          console.log("Document written");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      promises.push(writePromise);
    }

    Promise.all(promises).then(() => {
      process.exit(0);
    });
  }
});

function generateRandomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomProduct() {
  return products[Math.floor(Math.random() * products.length)];
}
