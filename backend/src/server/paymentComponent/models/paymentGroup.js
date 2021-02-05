const mongoose = require('mongoose');
const Schema = mongoose.Schema;

PaymentGroupSchema = new Schema({
    groupName: {
        type: String,
        required: true
    },
    idCard: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        require: true
    },
    users: {
        type: Array,
        require: true
    },
    owner: {
        type: String,
        required: true
    }
});


mongoose.model('paymentGroup', PaymentGroupSchema);
const PaymentGroup = mongoose.model('paymentGroup');

module.exports = PaymentGroup;
