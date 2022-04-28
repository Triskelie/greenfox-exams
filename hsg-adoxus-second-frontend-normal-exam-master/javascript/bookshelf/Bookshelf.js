export default class Bookshelf {
    books = [];

    addBook(book) {
        this.books.push(book);
    }

    getBooks(year) {
        return this.books.filter(book => book.getReleaseYear() == year);
    }

    getLightestAuthor() {
        let lightestAutor = this.books[0].getAuthor();
        let lightestBookWeight = this.books[0].getWeightInGram();
        this.books.forEach(book => {
            if (book.getWeightInGram() < lightestBookWeight) {
                lightestBookWeight = book.getWeightInGram();
                lightestAutor = book.getAuthor();
            }
        });
        return lightestAutor;
    }

    getAuthorOfMostWrittenPages() {
        let authors = {};
        this.books.forEach(book => {
            if (authors.hasOwnProperty(book.getAuthor())) {
                authors[book.getAuthor()] += book.getNumberOfPages();
            } else {
                authors[book.getAuthor()] = book.getNumberOfPages();
            }
        });

        let mostAuthor;
        let mostPages;

        for (const author in authors) {
            if (!mostAuthor) {
                mostAuthor = author;
                mostPages = authors[author];
            } else if (mostPages < authors[author]) {
                mostAuthor = author;
                mostPages = authors[author];
            }
        }
        return mostAuthor;
    }

    printBooks() {
        this.books.forEach(book => console.log(book.getBookInfo()));
    }
}
