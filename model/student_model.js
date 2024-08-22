var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    mobile: String,
    address: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    designation: {
        type: String,
        default: ''
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Login' },

});
var user = new mongoose.model('Student', schema);
module.exports = user;
