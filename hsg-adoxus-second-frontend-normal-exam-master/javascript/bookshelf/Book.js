export default class Book {
    weightInGram;
    coverWeightInGrams;

    constructor(title, author, releaseYear, numberOfPages) {
        this.title = title;
        this.author = author;
        this.releaseYear = releaseYear;
        this.numberOfPages = numberOfPages;
        this.weightInGram = this.numberOfPages * 10 + this.coverWeightInGrams;
    }

    getBookInfo() {
        return `${this.author}: ${this.title} (${this.releaseYear})`;
    }

    getReleaseYear() {
        return this.releaseYear;
    }

    getAuthor() {
        return this.author;
    }

    getWeightInGram() {
        return this.weightInGram;
    }

    getNumberOfPages() {
        return this.numberOfPages;
    }
}
