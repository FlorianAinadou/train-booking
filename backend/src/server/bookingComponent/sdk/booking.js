const {strRandom} = require("../utils/idGenerator");
let bookingIdSize = 6;

const BookingModel = require('../models/Booking');

async function getBookingByIdAndEmail(bookingId, userMail) {
    return await BookingModel.find({'bookingId': bookingId, 'userMail': userMail});
}

async function getBookingByEmail(userMail) {
    return await BookingModel.find({'userMail': userMail});
}


async function payReservationByIdAndEmail(bookingId, userMail) {
    return BookingModel.findOneAndUpdate({'email': bookingId, 'userMail': userMail}, {'paid': true}, {
        new: true
    });
}

async function addPaidReservation(userMail, placeNumber, trainId) {
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
            "paid": true,
            "placeNumber": placeNumber,
            "trainId": trainId
        }, function (err, booking) {
            if (err) console.log(err);
        });
    }
    return bookingId;
}


module.exports = {
    getBookingByIdAndEmail,
    payReservationByIdAndEmail,
    addPaidReservation,
    getBookingByEmail
};
