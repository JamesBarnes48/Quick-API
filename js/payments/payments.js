const database = require('../database.js')

exports = module.exports = function(){
    return exports;
}

exports.post = (req, res) => {
    const data = parsePayment(req.body);
    if(!validatePayment(data)) return res.sendStatus(400); 

    const users = database.queryUsers();
    const matchingUser = users.find((user) => {return +user.creditCard === +data.creditCard});
    if(matchingUser){
        //make payment
        return res.sendStatus(201);
    }else{
        return res.sendStatus(404);
    }
}

function parsePayment(inputData){
    return {
        creditCard: +inputData.creditCard || null,
        amount: +inputData.amount || null
    };
}

function validatePayment(data){
    if(String(data.creditCard)?.length !== 16) return false;
    if(String(data.amount)?.length !== 3) return false;
    return true;
}