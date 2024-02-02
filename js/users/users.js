exports = module.exports = function(){
    return exports;
}

exports.getUsersWithRegisteredCard = (req, res) => {
    const data = parseRequest(req.body);
    if(!validateRequest(data)) return res.sendStatus(400);

    //if user is under age 18 then reject with code 403
    if(calculateAge(data.dob) < 18) return res.sendStatus(403);
}

function validateRequest(data){
    if(!data.username.length || !(/^[a-zA-Z0-9]+$/.test(data.username))) return false;
    if(data.password.length < 8 || !hasLowerCase(data.password) || !hasUpperCase(data.password)) return false;
    if(!data.email.length || !data.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) return false;
    if(!data.dob.length) return false;
    if(data.creditCard && String(data.creditCard).length !== 16) return false;
    return true;
}

function parseRequest(inputData){
    return {
        username: String(inputData.username).replace(/\s/g, "") || '',
        password: inputData.password || '',
        email: inputData.email || '',
        dob: new Date(inputData.dob)? new Date(inputData.dob).toISOString().split('T')[0] || '': '',
        creditCard: +inputData.creditCard || 0
    };
}

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