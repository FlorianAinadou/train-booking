const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const sdk = require('../sdk');

router.get('/customer/:id', async (ctx) => {
  try {
    const customer_found = await sdk.getCustomerById(ctx.params.id);
    f.success(ctx, customer_found);
    console.log(customer_found.toString())
  } catch {
    f.failure(ctx, "failed");
  }
});