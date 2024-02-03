exports = module.exports = function(){
    return exports;
}

exports.post = (req, res) => {
    const data = parsePayment(req.body);
    if(!validatePayment(data)) return res.sendStatus(400); 
}

function parsePayment(inputData){
    return {
        creditCard: +inputData.creditCard || null,
        amount: +inputData.amount || null
    };
}