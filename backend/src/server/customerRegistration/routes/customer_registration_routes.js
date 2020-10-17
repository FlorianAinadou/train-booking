const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const customer_finder_sdk = require('../sdk/customer_finder');
const customer_registration_sdk = require('../sdk/customer_registration');

router.get('/customer/:id', async (ctx) => {
  try {
    const customer_found = await customer_finder_sdk.getCustomerById(ctx.params.id);
    f.success(ctx, customer_found);
    console.log(customer_found.toString())
  } catch {
    f.failure(ctx, "failed");
  }
});

router.post('/customer', async (ctx) => {
  try {
    const customer_created = await customer_registration_sdk.addCustomer(ctx.request.body);
    f.success(ctx, customer_created);
    console.log(customer_created.toString())
  } catch {
    f.failure(ctx, "failed");
  }
});

module.exports = router