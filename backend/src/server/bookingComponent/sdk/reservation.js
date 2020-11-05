const BookingModel = require('../models/Booking');
const {strRandom} = require("../utils/idGenerator");

const request = require('request');
let bookingIdSize = 6;


async function addReservation(userMail, placeNumber, trainId) {
    let bookingId;
    if (trainId !== undefined) {
        bookingId = strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: bookingIdSize,
            startsWithLowerCase: false
        });
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

    request.post({
        url: 'http://127.0.0.1:8000/trainList/removeSeat',
        form: {"trainId": trainId}
    }, function (error, response, body) {
        console.log(body);
    });
    return bookingId;
}


async function removeBookingByBookingId(bookingId) {
    const trainIde = await BookingModel.findOne({"bookingId": bookingId});
    if (trainIde !== undefined) {
        const result = trainIde.trainId;
        console.log(result);

        request.post({
            url: 'http://127.0.0.1:8000/trainList/relieveSeat',
            form: {"trainId": result}
        }, function (error, response, body) {
            console.log(body);
        });
        await BookingModel.findOneAndRemove({
            "bookingId": bookingId
        }, function (err, booking) {
            if (err)
                return false;
        });


        return true;
    }

    return false;

}


async function setBookingPayStatus(bookingId, userMail) {
    await BookingModel.findOneAndUpdate({
        "bookingId": bookingId,
        'userMail': userMail
    }, {
        "paid": true
    }, function (err, booking) {
        if (err)
            return false;
    });
    return true;
}


module.exports = {
    addReservation,
    removeBookingByBookingId,
    setBookingPayStatus
};
