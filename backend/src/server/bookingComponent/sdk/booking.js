const {strRandom} = require("../utils/idGenerator");
const customerRegistration = require('../../customerRegistration/sdk/customerFinder');
const rpa = require('request-promise');

let bookingIdSize = 6;

const BookingModel = require('../models/Booking');

async function getBookingByIdAndEmail(bookingId, userMail) {
    return await BookingModel.find({'bookingId': bookingId, 'userMail': userMail});
}

async function getBookingByEmail(userMail) {
    return await BookingModel.find({'userMail': userMail, 'paid': false});
}


async function payReservationByIdAndEmail(bookingId, userMail,price) {
    const customer = customerRegistration.getUserByEmail(userMail);
    const url = "http://127.0.0.1:7000/paid/";
    const result = await rpa(url+customer.cardId+"/"+price);
    const rep  = JSON.parse(result);
    if(rep["data"]){
        BookingModel.findOneAndUpdate({'email': bookingId, 'userMail': userMail}, {'paid': true});
        return true;
    }
    return false;
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
