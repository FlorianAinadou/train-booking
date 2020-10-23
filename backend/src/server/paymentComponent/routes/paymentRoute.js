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



module.exports = router;
