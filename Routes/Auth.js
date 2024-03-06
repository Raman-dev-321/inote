const express = require('express');
const users = require('../models/User.js'); // Assuming this is your Mongoose User model
const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Router = express.Router();
const seckey = 'helloworld@321'

Router.post('/', [
    body('name', "name is required").isLength({ min: 3, max: 16 }),
    body('email', "email is required").isEmail(),
    body('password', "password is required").isLength({ min: 8, max: 16 })
], async function (req, res) {
    const result = validationResult(req);
    // if (!result.isEmpty()) {: This condition checks if there are any validation errors. If the result object is not empty (meaning there are validation errors), the code inside the if block will be executed.
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    // This code will sent and save data to mongodb
    //    if(users){
    //     return res.send("this user is already authenticated")
    //    }
    const salt = await bcrypt.genSalt(10);
    const authpass = await bcrypt.hash(req.body.password, salt);

    users.create({
        name: req.body.name,
        email: req.body.email,
        password: authpass,
    }).then(users => res.json(users))
    console.log(req.body)

    const payload = {
        id: users.id
    }
    console.log(jwt.sign(payload, seckey))
});
Router.post('/login', [
    body('email', "email is required").isEmail(),
    body('password', "password is required").exists()
], async function (req, res){
    const {email, password} = req.body;
    const user = await users.findOne({email})

    if (!user){
        return res.json({status: "please enter a valid email"});
    }
    const passwordcompare = await bcrypt.compare(password, user.password)
    if(!passwordcompare){
        return res.json({status: "please enter a valid password"});
    }
    const payload = {
        id: users.id
    }
    const token =  jwt.sign(payload, seckey);
    res.send({user,token});
})
module.exports = Router;
