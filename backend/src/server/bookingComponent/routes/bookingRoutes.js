const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const reservation = require('../sdk/reservation');
const booking = require('../sdk/booking');

router.get('/booking/getBooking/:bookingId/:userMail', async (ctx) => {
    const bookings = await booking.getBookingByIdAndEmail(ctx.params.bookingId,ctx.params.userMail);
    f.success(ctx, bookings);
});

router.get('/booking/getBookingByMail/:userMail', async (ctx) => {
    const bookings = await booking.getBookingByEmail(ctx.params.userMail);
    f.success(ctx, bookings);
});

router.get('/booking/getPaidBookingByMail/:userMail', async (ctx) => {
    const bookings = await booking.getPaidBookingByEmail(ctx.params.userMail);
    f.success(ctx, bookings);
});

router.put('/booking/payReservation', async (ctx) => {
    const bookings = await booking.payReservationByIdAndEmail(ctx.request.body.bookingId,ctx.request.body.params.userMail);
    f.success(ctx, bookings);
});


router.post('/booking/addPaidReservation', async (ctx) => {
    const bookings = await booking.addPaidReservation(ctx.request.body.userMail, ctx.request.body.placeNumber, ctx.params.trainId);
    f.success(ctx, bookings);
});

router.post('/booking/addReservation', async (ctx) => {
    const bookings = await reservation.addReservation(ctx.request.body.userMail, ctx.request.body.placeNumber, ctx.request.body.trainId);
    f.success(ctx,  JSON.stringify(bookings));
});

router.del('/booking/removeBookingByBookingId/:bookingId', async (ctx) => {
    const bookings = await reservation.removeBookingByBookingId(ctx.params.bookingId);
    f.success(ctx, bookings);
});

module.exports = router;
