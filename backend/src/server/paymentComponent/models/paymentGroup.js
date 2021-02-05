const mongoose = require('mongoose');
const Schema = mongoose.Schema;

PaymentGroupSchema = new Schema({
    bookingId: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        require: true
    },
    customerMail: {
        type: String,
        required: true
    },
    trainId : {
        type: String,
        required: true
    }, 
    placesNumber : {
        type: Array,
        required: true
    }
});


mongoose.model('paymentGroup', PaymentGroupSchema);
const PaymentGroup = mongoose.model('paymentGroup');

module.exports = PaymentGroup;
