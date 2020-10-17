const Router = require('koa-router');
const router = new Router();
const f = require('../utils/functions');
const sdk = require('../sdk');

router.get('/trainSelector/:id', async (ctx) => {
  try {
    const train = await sdk.getTrainById(ctx.params.id);
    f.success(ctx, train);
    console.log(train.toString())
  } catch {
    f.failure(ctx, "failed");
  }
});



module.exports = router;