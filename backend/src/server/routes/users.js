const Router = require('koa-router');
const router = new Router();
const f = require('../utils/functions');
//const sdk = require('../sdk');

router.get('/users', async (ctx) => {
  try {
    const result = "okay"
    f.success(ctx, result);
    console.log(result)
  } catch {
    f.failure(ctx, "failed");
  }
});



module.exports = router;