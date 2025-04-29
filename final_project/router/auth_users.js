const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    //filter the users array for any user with same user name
    let userwithsamename = users.filter((user) => {
        return user.username === username;
    });

    //Return true if any user is found otherwise false
    if(userwithsamename.length > 0) {
        return true;
    } else {
        return false;
    };
}

const authenticatedUser = (username,password)=>{ //returns boolean
    //Filter the users array for user with the same username and passward.
    let validateduser = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    //Return true if valid user is found otherwise false
    if(validateduser.length) {
        return true;
    } else {
        return false;
    }
}



//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username
    const password = req.body.password

    //Check if the username or password is missing
    if(!username || !password) {
        res.status(404).json({ message: "Logging logging in." });
    }

    //Authtenticate user.
    if(authenticatedUser(username, password)) {
        //Generate JWT access token
        let accessToken = jwt.sign({data: password}, 'access', { expiresIn: 60*60 });

        //Store the accessToken and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).json({ message: "User is successfuly logged in." })
    } else {
        return res.status(208).json({ message: "Invalid loggin. Check username and password." })
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.session.username;
  const isbn = req.params.isbn
  const review = req.body.review

    if(!review) {
        return res.status(404).json({ message: "Review text is required." })
    }

    if(!books[isbn]) {
        return res.status(404).json({ message: "The book with " + isbn +" isbn is not found." })
    }

    books[isbn].reviews[username] = review;
    res.status(200).json({ message: "The review " +  books[isbn].reviews[username] + " is added."})
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
