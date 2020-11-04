const Router = require('koa-router');
const router = new Router();
const f = require('../utils/functions');
const sdk = require('../sdk/checkPaymentStatusSdk');

router.get('/paid/:idCard/:price', async (ctx) => {
  try {
    const paid = await sdk.checkPaymentStatus(ctx.params.idCard.toString(), ctx.params.price);
    f.success(ctx, paid);
  } catch {
    f.failure(ctx, "failed");
  }
});

router.get('/accounts', async (ctx) => {
  try {
    const accounts = await sdk.getAccounts();
    f.success(ctx, accounts);
    console.log(accounts.toString())
  } catch {
    f.failure(ctx, "failed");
  }
});



module.exports = router;
