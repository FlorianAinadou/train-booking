const Router = require('koa-router');
const router = new Router();
const f = require('../utils/functions');
const sdk = require('../sdk/trainsList');

router.get('/trains', async (ctx) => {
  try {
    const trains = await sdk.getTrainsList();
    f.success(ctx, trains);
    console.log(trains.toString())
  } catch {
    f.failure(ctx, "failed");
  }
});



module.exports = router;
