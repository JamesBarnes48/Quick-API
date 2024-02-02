exports = module.exports = function(){
    return exports;
}

exports.getUsersWithRegisteredCard = (req, res, next) => {
    const data = parseRequest(req.body);
    if(!validateRequest(data)) console.log('failed');
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

function hasUpperCase(str){
    return str !== str.toLowerCase();
}

function hasLowerCase(str){
    return str !== str.toUpperCase();
}