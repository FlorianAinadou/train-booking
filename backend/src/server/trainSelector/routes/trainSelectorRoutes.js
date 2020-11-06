const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const sdk = require('../sdk/trainSelector');

router.get('/trainSelector/:departureStation/:arrivalStation', async (ctx) => {
  try {
    const train = await sdk.getTrainByForm(ctx.params.departureStation, ctx.params.arrivalStation);
    f.success(ctx, train);
  } catch {
    f.failure(ctx, "failed");
  }
});

router.get('/trainSelector/:id', async (ctx) => {
  try {
    const train = await sdk.getTrainById(ctx.params.id);
    f.success(ctx, train);
  } catch {
    f.failure(ctx, "failed");
  }
});


module.exports = router;
