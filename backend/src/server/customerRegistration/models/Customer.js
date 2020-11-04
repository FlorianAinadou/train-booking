const mongoose = require('mongoose');
const Schema = mongoose.Schema;

CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required']
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone_number: {
        type: String,
        require: true
    },
    cardId: {
        type: String,
        require: true
    }
});


mongoose.model('customer', CustomerSchema);
const Customer = mongoose.model('customer');

module.exports = Customer;
