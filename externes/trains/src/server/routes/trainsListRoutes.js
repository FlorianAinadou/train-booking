const Router = require('koa-router');
const router = new Router();
const f = require('../utils/functions');
const sdk = require('../sdk/trainsList');


router.get('/trainList', async (ctx) => {
  try {
    const train = await sdk.getTrainsList();
    f.success(ctx, train);
    // console.log(train.toString())
  } catch {
    f.failure(ctx, "failed");
  }
});

router.get('/trainById/:id', async (ctx) => {
  try {
    const train = await sdk.getTrainsById(ctx.params.id);
    f.success(ctx, train);
  } catch {
    f.failure(ctx, "failed");
  }
});

module.exports = router;
