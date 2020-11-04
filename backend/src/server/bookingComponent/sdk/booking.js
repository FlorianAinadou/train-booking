const {strRandom} = require("../utils/idGenerator");

let bookingIdSize = 6;

const BookingModel = require('../models/Booking');

async function getBookingByIdAndEmail(bookingId, userMail) {
    return await BookingModel.find({'bookingId': bookingId, 'userMail': userMail});
}

async function getBookingByEmail(userMail) {
    return await BookingModel.find({'userMail': userMail, 'paid': false});
}

<<<<<<< HEAD
async function getPaidBookingByEmail(userMail) {
    return await BookingModel.find({'userMail': userMail, 'paid': true});
}


async function payReservationByIdAndEmail(bookingId, userMail) {
    return BookingModel.findOneAndUpdate({'email': bookingId, 'userMail': userMail}, {'paid': true}, {
        new: true
    });
}

=======
>>>>>>> d51bacd6187109280436d5bb38a8616fe9fa5354
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
    addPaidReservation,
    getBookingByEmail,
    getPaidBookingByEmail
};
