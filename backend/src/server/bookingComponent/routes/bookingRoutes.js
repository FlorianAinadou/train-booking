const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const reservation = require('../sdk/reservation');
const booking = require('../sdk/booking');
const paymentsSdk = require('../../paymentComponent/sdk/paymentsdk');


router.get('/booking/getBooking/:bookingId/:userMail', async (ctx) => {
    const bookings = await booking.getBookingByIdAndEmail(ctx.params.bookingId, ctx.params.userMail);
    f.success(ctx, bookings);
});

router.get('/booking/getBookingByMail/:userMail', async (ctx) => {
    const bookings = await booking.getBookingByEmail(ctx.params.userMail);
    f.success(ctx, bookings);
});

router.get('/booking/getPaidBookingByMail/:userMail', async (ctx) => {
    const bookings = await booking.getPaidBookingByEmail(ctx.params.userMail);
    const result = [];
    bookings.forEach(function (entry) {
        // console.log(entry);
        result.push({
            "_id": entry._id,
            "bookingId": entry.bookingId,
            "userMail": entry.userMail,
            "paid": true,
            "placeNumber": entry.placeNumber,
            "trainId": entry.trainId,
            "isGroup": false
        });
    });
    const groupPayments = await paymentsSdk.getAllPaymentsGroupByEmail(ctx.params.userMail);
    groupPayments.forEach(function (entry) {
        // console.log(entry);
        result.push(entry);
    });
    f.success(ctx, result);
});


router.post('/booking/addPaidReservation', async (ctx) => {
    const bookings = await booking.addPaidReservation(ctx.request.body.userMail, ctx.request.body.placeNumber, ctx.params.trainId);
    f.success(ctx, bookings);
});

router.post('/booking/addReservation', async (ctx) => {
    const bookings = await reservation.addReservation(ctx.request.body.userMail, ctx.request.body.placeNumber, ctx.request.body.trainId);
    f.success(ctx, JSON.stringify(bookings));
});

// router.post('/booking/addReservationMobile', async (ctx) => {
//     const bookings = await reservation.addReservation(ctx.request.body.userMail, ctx.request.body.placeNumber, ctx.request.body.trainId);
//     f.success(ctx,  JSON.stringify(bookings));
// });

router.del('/booking/removeBookingByBookingId/:bookingId', async (ctx) => {
    const bookings = await reservation.removeBookingByBookingId(ctx.params.bookingId);
    f.success(ctx, bookings);
});

module.exports = router;
