const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require("../config/passport");
const mongoose = require('mongoose');
router.post('/register', (req, res, next) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    User.addUser(user, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: "fail to register user",
                error: err
            })
        } else {
            res.json({
                success: true,
                message: "User " + user.username + " added"
            })
        }
    })
})



router.get('/register', (req, res, next) => {
    res.send("REGISTER PAGE");
})

router.get('/authenticate', (req, res, next) => {
    console.log("GET /authenticate")
    res.status(200).json({ message: 'GET' })
})


router.post('/authenticate', (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        // console.log(user);
        if (err) res.status(400).json({
            error: err
        })
        if (!user) {
            return res.status(200).json({
                msg: "user not found"
            })
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const plainUserObject = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    password: user.password
                }

                //console.log(user);
                const token = jwt.sign({data:user}, 'secret', {
                    expiresIn: 604800
                })
                res.status(200).json({
                    success: true,
                    token: "JWT " + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            }
            else {
                return res.status(400).json({
                    success: false, msg: "wrong password"
                })
            }
        })
    })
})

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
})

router.get('/validate', (req, res, next) => {
    res.send("VALIDATION PAGE");
})


module.exports = router;