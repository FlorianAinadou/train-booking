const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const sdk = require('../sdk/paymentsdk');

router.get('/pay/:idCard/:price', async (ctx) => {
  try {
    const bankResponse = await sdk.pay(ctx.params.idCard, ctx.params.price);
    f.success(ctx, bankResponse);
    console.log(bankResponse.toString())
  } catch {
    f.failure(ctx, "failed");
  }
});


router.post('/payment/payReservation', async (ctx) => {
  const bookings = await sdk.payReservationByIdAndEmail(ctx.request.body.bookingId,ctx.request.body.userMail,ctx.request.body.price);
  f.success(ctx, JSON.stringify(bookings));
});



module.exports = router;
