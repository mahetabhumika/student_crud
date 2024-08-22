var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    userName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    },
});
var login = new mongoose.model('Login', schema);
module.exports = login;
