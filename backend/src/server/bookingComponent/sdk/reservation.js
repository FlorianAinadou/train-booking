const BookingModel = require('../models/Booking');
const {strRandom} = require("../utils/idGenerator");
let bookingIdSize = 6

async function addReservation( userMail, placeNumber, trainId) {
    let bookingId;
    if (trainId !== undefined) {
        bookingId = strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: bookingIdSize,
            startsWithLowerCase: false
        })
        await BookingModel.create({
            "bookingId": bookingId,
            "userMail": userMail,
            "paid": false,
            "placeNumber": placeNumber,
            "trainId": trainId
        }, function (err, booking) {
            if (err) console.log(err);
        });
    }
    return bookingId;
}



async function removeBookingByBookingId(bookingId) {
    await BookingModel.findOneAndRemove({
        "bookingId": bookingId
    }, function (err, booking) {
        if (err)
            return false;
    });
    return true;
}





module.exports = {
    addReservation,
    removeBookingByBookingId
};
