const Router = require('koa-router');
const router = new Router();
const f = require('../utils/functions');
const sdk = require('../sdk/trainsList');

router.post('/trainList/removeSeat', async (ctx) => {
  const aTrain = await sdk.removeSeat(ctx.request.body.trainId);
  f.success(ctx,  JSON.stringify(aTrain)) ;
});

router.post('/trainList/removeSeats', async (ctx) => {
  const aTrain = await sdk.removeSeats(ctx.request.body.trainId,ctx.request.body.seats);
  f.success(ctx,  JSON.stringify(aTrain)) ;
});

router.post('/trainList/relieveSeat', async (ctx) => {
  const aTrain = await sdk.relieveSeat(ctx.request.body.trainId);
  f.success(ctx,  JSON.stringify(aTrain)) ;
});

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

router.post('/trainsList',async(ctx) => {
  const newSeats = [
    {seatId: 1,
      seatClasse: 'First',
      price: 50,
      taken: false
    },
    {seatId: 51,
      seatClasse: 'Second',
      price: 25,
      taken: false
    }
]
  const aTrain = await sdk.addATrain(ctx.request.body.trainId, newSeats);
  f.success(ctx,  JSON.stringify(aTrain)) ;
});

module.exports = router;
