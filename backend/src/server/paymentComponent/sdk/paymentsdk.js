const rp = require('request-promise');
const customerRegistration = require('../../customerRegistration/sdk/customerFinder');
const bookingReservation = require('../../bookingComponent/sdk/reservation');
const PaymentGroupModel = require('../models/paymentGroup');

// var host = process.env.npm_package_config_bankHost;

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
url = "http://localhost:7000/paid/";

async function pay(idCard,price) {
    return await rp(url+""+idCard+"/"+price);
}


async function payReservationByIdAndEmail(bookingId, userMail,price) {
    const customer = await customerRegistration.getUserByEmail(userMail);
    const rep  = await pay(customer.cardId,price);
    if(rep){
        await bookingReservation.setBookingPayStatus(bookingId,userMail);
        return true;
    }
    return false;
}

async function payGroup(trainId, customerMail, price, placesNumber, groupId){
    const customer = await customerRegistration.getUserByEmail(customerMail);
    const rep  = await pay(customer.cardId,price);
    let bookingId;
    if (rep){
        bookingId = strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: bookingIdSize,
            startsWithLowerCase: false
        });
    
        await PaymentGroupModel.create({
            "bookingId": bookingId,
            "customerMail": customerMail,
            "placesNumber": placesNumber,
            "trainId": trainId,
            "price": price,
            "groupId": groupId
        }, function (err, paymentGroup) {
            if (err) console.log(err);
        });

    }
    return bookingId;
}

module.exports = {
    pay,
    payReservationByIdAndEmail,
    payGroup
};
