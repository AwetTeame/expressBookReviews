const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Get book by isbn
    const isbn = req.params.isbn
    const book = books[isbn]
    res.send(book)
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author
    const bookKeys = Object.keys(books)
    let matchingBooks = []

    for(let key of bookKeys) {
        if(books[key].author == author) {
            matchingBooks.push(books[key])
        }
    }

    if (matchingBooks.length > 0) {
        res.status(200).json({ booksByAuthor: matchingBooks });
    } else {
        res.status(404).json({ message: "No books found for this author." });
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title
    const bookKeys = Object.keys(books)
    let matchingBooks = []

    for(let key of books) {
        if(books[key].title == title) {
            matchingBooks.push(books[key])
        }
    }

    if(matchingBooks.length > 0) {
        res.status(200).json({ booksByTitle: matchingBooks })
    } else {
        res.status(404).json({ message: "No books found for this author." })
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
