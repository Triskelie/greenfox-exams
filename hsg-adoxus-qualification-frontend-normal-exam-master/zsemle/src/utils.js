export const categories = {
  food: "élelmiszer",
  electronics: "elektronika",
  clothes: "ruházat",
  chemical: "vegyiáru",
};

export const products = [
  {
    name: "kenyér",
    category: categories.food,
  },
  {
    name: "tej",
    category: categories.food,
  },
  {
    name: "olaj",
    category: categories.food,
  },
  {
    name: "monitor",
    category: categories.electronics,
  },
  {
    name: "mobil",
    category: categories.electronics,
  },
  {
    name: "laptop",
    category: categories.electronics,
  },
  {
    name: "nadrág",
    category: categories.clothes,
  },
  {
    name: "ing",
    category: categories.clothes,
  },
  {
    name: "szoknya",
    category: categories.clothes,
  },
  {
    name: "tusfürdő",
    category: categories.chemical,
  },
  {
    name: "sampon",
    category: categories.chemical,
  },
  {
    name: "mosópor",
    category: categories.chemical,
  },
];

export const categoryPriceRanges = {
  [categories.food]: {
    min: 300,
    max: 1000,
  },
  [categories.electronics]: {
    min: 50000,
    max: 500000,
  },
  [categories.clothes]: {
    min: 1200,
    max: 40000,
  },
  [categories.chemical]: {
    min: 1000,
    max: 4000,
  },
};
