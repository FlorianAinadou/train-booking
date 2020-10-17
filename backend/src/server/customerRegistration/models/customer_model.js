const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Model definition

CustomerSchema = new Schema({
    idCustomer : {
        type: Number,
        require: true
    },
    name : {
        type: String,
        require: true
    },
    email : {
        type: String,
        require: true,
    },
    address : {
        type : String,
        require: true
    },
    phone_number : {
        type : String,
        require: true
    },
    password : {
        type: String,
        require: true
    }
});


mongoose.model('customer', CustomerSchema);
const Customer = mongoose.model('customer');

module.exports = Customer