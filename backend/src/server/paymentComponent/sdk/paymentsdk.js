const rp = require('request-promise');
const customerRegistration = require('../../customerRegistration/sdk/customerFinder');
const bookingReservation = require('../../bookingComponent/sdk/reservation');

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

module.exports = {
    pay,
    payReservationByIdAndEmail
};
