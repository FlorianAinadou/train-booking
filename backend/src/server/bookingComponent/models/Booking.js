const mongoose = require('mongoose');
const Schema = mongoose.Schema;

BookingSchema = new Schema({
    bookingId: {
        type: String,
        required: [true, 'Your booking number is required']
    },
    trainId: {
        type: String,
        required: [true, 'Your booking number is required']
    },
    userMail: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        require: true
    },
    placeNumber: {
        type: String,
        require: true
    }
});


mongoose.model('booking', BookingSchema);
const Booking = mongoose.model('booking');

module.exports = Booking;
