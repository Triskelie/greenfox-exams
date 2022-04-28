import Book from './Book.js';

export default class PaperbackBook extends Book {
    coverWeightInGrams = 20;

    constructor(title, author, releaseYear, numberOfPages) {
        super(title, author, releaseYear, numberOfPages);
        this.weightInGram = this.numberOfPages * 10 + this.coverWeightInGrams;
    }
}
