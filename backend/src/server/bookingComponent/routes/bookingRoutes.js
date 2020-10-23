const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const reservation = require('../sdk/reservation');
const booking = require('../sdk/booking');

router.get('/booking/getBooking/:bookingId/:userMail', async (ctx) => {
    const booking = await booking.getBookingByIdAndEmail(ctx.params.bookingId,ctx.params.userMail);
    f.success(ctx, booking);
});


router.put('/booking/payReservation', async (ctx) => {
    const booking = await booking.payReservationByIdAndEmail(ctx.request.body.bookingId,ctx.request.body.params.userMail);
    f.success(ctx, booking);
});


router.post('/booking/addPaidReservation', async (ctx) => {
    const booking = await booking.addPaidReservation(ctx.request.body.userMail, ctx.request.body.placeNumber, ctx.params.trainId);
    f.success(ctx, booking);
});

router.post('/booking/addReservation', async (ctx) => {
    const booking = await reservation.addReservation(ctx.request.body.userMail, ctx.request.body.placeNumber, ctx.request.body.trainId);
    f.success(ctx, booking);
});

router.del('/booking/removeBookingByBookingId', async (ctx) => {
    const booking = await reservation.removeBookingByBookingId(ctx.request.body.bookingId, ctx.request.body.userMail);
    f.success(ctx, booking);
});

module.exports = router;
