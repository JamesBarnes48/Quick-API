//MOCK DATABASE
exports = module.exports = function(){
    return exports;
}

exports.queryUsers = () => {
    return [
        {
            username: "JohnSmith26",
            password: "smithyPASSWORD25",
            email: "john@smith.com",
            dob: "2000-10-25",
            creditCard: null
        },
        {
            username: "AndrewGod",
            password: "MyPassword55",
            email: "andrew@gmail.com",
            dob: "1996-10-25",
            creditCard: 123475489654678
        }
    ]
}