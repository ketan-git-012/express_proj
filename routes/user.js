const { Router } = require('express');
const express = require('express');
const route = express.Router();
const { loginUser, isSignedIn, addToken, signUp } = require('./../controllers/user');

route.post("/signup", signUp);

route.post("/login", loginUser);

route.get("/test", isSignedIn, (req, res)=>{
        res.status(200).json({
            message : "route is authorized"
        })
})


route.get("/getuser", addToken)
module.exports = route;

// , isSignedIn, (req, res=>{
//     res.status(200).json({
//         message : "get User!"
//     })
// })