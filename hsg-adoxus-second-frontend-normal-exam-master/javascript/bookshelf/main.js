// itt kipróbálhatod az osztályokat

import Bookshelf from "./Bookshelf.js";
import HardcoverBook from "./HardcoverBook.js";
import PaperbackBook from "./PaperbackBook.js";

let bookshelf = new Bookshelf();

let hardcoverBook1 = new HardcoverBook("title1", "Valaki1", 2001, 101);
let hardcoverBook2 = new HardcoverBook("title2", "Valaki2", 2002, 12);
let paperbackBook1 = new PaperbackBook("title3", "Valaki3", 2003, 103);
let paperbackBook2 = new PaperbackBook("title4", "Valaki4", 2004, 104);

bookshelf.addBook(hardcoverBook1);
bookshelf.addBook(hardcoverBook2);
bookshelf.addBook(paperbackBook1);
bookshelf.addBook(paperbackBook2);

console.log(bookshelf.getBooks(2001));

console.log(bookshelf.getLightestAuthor());

bookshelf.printBooks();

console.log(bookshelf.getAuthorOfMostWrittenPages());




