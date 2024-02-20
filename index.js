import { readFile, updateFile } from "./fileUtils.js";
//Search and show the book searched by the title or the ISBN
const getBook = (titleOrISBN) => {
    try {
        const books = readFile("books-test.json");
        const foundBook = books.find(book => book.title === titleOrISBN || book.ISBN === titleOrISBN);
        if(foundBook){
            return {
                code: 200,
                body: foundBook,
                msg: "Book '" + foundBook.title + "' found",
            }
        }
        return {
            code: 400,
            body: null,
            msg: "Couldn't find the book",
        }
    } catch (error) {
        console.error(error);
    }
};
//Update the book's title with the ISBN given
const updateBookTitle = (isbn, title) => {
    try {
        const books = readFile("books-test.json");
        let updatedBook;
        const newBooks = books.map((book) => {
            if(book.ISBN === isbn) {
                updatedBook = {...book, title};
                return updatedBook;
            }
            return book;
        });
        updateFile("books-test.json", newBooks);
        return {
            code: 200,
            body: updatedBook,
            msg: "Book '" + updatedBook.title + "' updated",
            //updatedBook;
        }
    } catch (error) {
        console.error(error);
    }
}
//Shows all the books and their information
const getBooks = () => {
    try {
        const books = readFile("books-test.json");
        return {
            code: 200,
            body: books,
            msg: "All books",
        }    
    } catch (error) {
        console.error(error);
    }
}
//Add a new book
const addBook = (newBook) => {
    try {
        const books = readFile("books-test.json");
        books.push(newBook);
        updateFile("books-test.json", books);
        return {
            code: 201,
            body: books,
            msg: "Book added",
        }
    } catch (error) {
        console.error(error);
    }
}
//Remove a book by a given title or ISBN
const removeBookByTitleOrISBN = (searchTerm) => {
    try {
        const books = readFile("books-test.json");
        const index = books.findIndex(book => book.title === searchTerm || book.ISBN === searchTerm);
        if(index !== -1){
            const deletedBookName = books[index].title;
            books.splice(index,1)[0];
            updateFile("books-test.json", books);
            return {
                code: 200,
                body: books,
                msg: "Book " + deletedBookName + " deleted",
            }
        }
        return {
            code: 400,
            body: null,
            msg: "Couldn't find the book",
        }
    } catch (error) {
        console.error(error);
    }
}
//Search and show a boot by a property and term given
const filterBy = (property,searchTerm) => {
    try {
        const books = readFile("books-test.json");
        const filteredBooks = books.filter(book => book[property] === searchTerm);   
        return {
            code: 200,
            body: filteredBooks,
            msg: "Filtered books",
        }
    } catch (error) {
        console.error(error);
    }
}
//Show the whole books in an differente format, only title, author and year
const listBooks = () => {  
    try {
        const books = readFile("books-test.json");
        const formattedBooks = books.map(book => `${book.title} - ${book.author} - ${book.year}`);
        return {
            code: 200,
            body: formattedBooks,
            msg: "Listed books",
        }
    } catch (error) {
        console.error(error);
    }
}
//Search and shows the books from a given year
const getBooksByYear = (year) => {
    try {
        const books = readFile("books-test.json");
        const filteredBooks = books.filter(book => book.year === year);
        return {
            code: 200,
            body: filteredBooks,
            msg: "Filtered books by the year: " + year,
        }
    } catch (error) {
        console.error(error);
    }
}
//Check if there is availability of the whole books from a given genre
const genreFullAvailability = (genre) => {  
    try {
        const books = readFile("books-test.json");
        const allAvailable = books.every(book => book.genre === genre && book.stock > 0);
        if (allAvailable) {
            return {
                code: 200,
                body: "True",
                msg: "Genre " + genre + " is full available",
            }
        }
        return {
            code:   400 ,
            body: "False",
            msg: "Genre " + genre + " is not full available",
        }
    } catch (error) {
        console.error(error);
    }
}
//Check if there is at least one book of the given genre
const genrePartialAvailability = (genre) => {
    try{
        const books = readFile("books-test.json");
        const partialAvailable = books.filter(book => book.genre === genre && book.stock > 0);
        if(partialAvailable.length === 0){
            return {
                code: 400,
                body: "False",
                msg: "Genre" + genre + " is not available",
            }
        }
        return {
            code: 200,
            body: "True",
            msg: "Genre " + genre + " is available at least once",
        }
    } catch (error) {
        console.error(error);
    }
}
//it returns the quantity of propertys that match with the property given
const getCountBy = (property, searchTerm) => {
    try {
        const books = readFile("books-test.json");
        const count = books.filter(book => book[property] === searchTerm).length;
        return {
            code: 200,
            body: count,
            msg: "Count of books by " + property + " " + searchTerm,
        }
    } catch (error) {
        console.error(error);
    } 
}

function main() {
    const args = process.argv.slice(2);
    const endpoint = args[0];
    let titleOrISBN, isbn, title, newBookParam, property, searchTerm, year, genre;
    switch(endpoint) {
        case "getBook":
            titleOrISBN = args[1];
            console.log(getBook(titleOrISBN));
            break;
        case "updateBookTitle":
            isbn = args[1];
            title = args[2];
            console.log(updateBookTitle(isbn, title));
            break;
        case "getBooks":
            console.log(getBooks());
            break;
        case "addBook":
            newBookParam = { "title": args[1], "ISBN": args[2], "year": args[3], "genre": args[4], "author": args[5], "stock": args[6], "publisher": args[7] };
            console.log(addBook(newBookParam));
            break;
        case "removeBookByTitleOrISBN":
            titleOrISBN = args[1];
            removeBookByTitleOrISBN(titleOrISBN);
            break;
        case "filterBy":
            property = args[1];
            searchTerm = args[2];
            console.log(filterBy(property, searchTerm));
            break;
        case "listBooks":
            console.log(listBooks());
            break;
        case "getBooksByYear":
            year = args[1];
            console.log(getBooksByYear(year));
            break;
        case "genreFullAvailability":
            genre = args[1];
            console.log(genreFullAvailability(genre));
            break;
        case "genrePartialAvailability":
            genre = args[1];
            console.log(genrePartialAvailability(genre));
            break;
        case "getCountBy":
            property = args[1];
            searchTerm = args[2];
            console.log(getCountBy(property, searchTerm));
            break;            
        default: 
            console.log("Endpoint no valido");
            break;
    }
}

main();