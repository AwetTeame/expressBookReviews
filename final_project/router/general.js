const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username
    const password = req.body.password

    //Check if the both the username and password are provided
    if(username && password) {
        //Check if the user doesn't exist
        if(!isValid(username)) {
            //Add the new user
            users.push({"username": username, "password": password})
            return res.status(200).json({ message: "The user is successfuly registered." });
        } else {
            return res.status(404).json({ message: "The user already exists!" });
        }
    }

    //Return if the username or password is missing
    res.status(404).json({ message: "Unable to register the user." });
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
    //Get books with await with simulated delay
    await delay(6000);
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
  const isbn = req.params.isbn
  if(books[isbn]) {
    res.status(200).json(books[isbn].reviews)
  } else {
    res.status(404).json({ message: "Book is not found." })
  }
});

module.exports.general = public_users;
