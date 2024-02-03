const database = require('../database.js');

exports = module.exports = function(){
    return exports;
}

exports.registerUser = (req, res) => {
    const data = parseRegistration(req.body);
    if(!validateRegisterRequest(data)) return res.sendStatus(400);

    //if user is under age 18 then reject with code 403
    if(calculateAge(data.dob) < 18) return res.sendStatus(403);

    //if username already exists then reject with code 409
    const existingUsers = database.queryUsers();
    if(existingUsers.map((user) => {return user.username}).includes(data.username)) return res.sendStatus(409);

    return res.sendStatus(201);
}

function validateRegisterRequest(data){
    if(!(/^[a-zA-Z0-9]+$/.test(data.username))) return false;
    if(data.password.length < 8 || !hasLowerCase(data.password) || !hasUpperCase(data.password) || !hasNumber(data.password)) return false;
    if(!data.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) return false;
    if(!data.dob.length) return false;
    if(data.creditCard && String(data.creditCard)?.length !== 16) return false;
    return true;
}

function parseRegistration(inputData){
    return {
        username: String(inputData.username).replace(/\s/g, "") || '',
        password: inputData.password || '',
        email: inputData.email || '',
        dob: new Date(inputData.dob)? new Date(inputData.dob).toISOString().split('T')[0] || '': '',
        creditCard: +inputData.creditCard || null
    };
}

//utility functions
//3.15576e+10 milliseconds in a year
function calculateAge(dob){
    return Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10)
}

function hasUpperCase(str){
    return str !== str.toLowerCase();
}

function hasLowerCase(str){
    return str !== str.toUpperCase();
}

function hasNumber(str){
    return /\d/.test(str);
}

exports.get = (req, res) => {
    switch(req.body.CreditCard){
        case "Yes":
            return res.json(database.queryUsers().filter((user) => {return !!user.creditCard}));
        case "No":
            return res.json(database.queryUsers().filter((user) => {return !user.creditCard}));
        default: 
            return res.json(database.queryUsers());
    }
}