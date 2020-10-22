const Router = require('koa-router');
const router = new Router();
const f = require('../utils/functions');
const sdk = require('../sdk/paidsdk');

router.get('/paid/:idCard/:price', async (ctx) => {
  try {
    const paid = await sdk.canPaid(ctx.params.idCard.toString(), ctx.params.price);
    f.success(ctx, paid);
    console.log(paid.toString())
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
