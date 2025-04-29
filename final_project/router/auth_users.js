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
    const passward = req.body.passward

    //Check if the username or password is missing
    if(!username || !passward) {
        res.status(404).json({ message: "Logging logging in." });
    }

    //Authtenticate user.
    if(authenticatedUser(username, passward)) {
        //Generate JWT access token
        let accessToken = jwt.sign({data: passward}, 'access', { expiresIn: 60*60 });

        //Store the accessToken and username in session
        req.session.authrization = {
            accessToken, username
        }
        return res.status(200).json({ message: "User is successfuly logged in." })
    } else {
        return res.status(208).json({ message: "Invalid loggin. Check username and password." })
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
