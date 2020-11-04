const rp = require('request-promise');
const customerRegistration = require('../../customerRegistration/sdk/customerFinder');
const bookingReservation = require('../../bookingComponent/sdk/reservation');


//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
url = "http://localhost:7000/paid/";

async function pay(idCard,price) {
    const result = await rp(url+""+idCard+"/"+price);
    bankResponse = JSON.parse(result);
    return bankResponse;
}


async function payReservationByIdAndEmail(bookingId, userMail,price) {
    const customer = await customerRegistration.getUserByEmail(userMail);
    const rep  = await pay(customer.cardId,price);
    // console.table(rep);
    if(rep["data"]){
        await bookingReservation.setBookingPayStatus(bookingId,userMail);
        return true;
    }
    return false;
}

module.exports = {
    pay,
    payReservationByIdAndEmail
};
