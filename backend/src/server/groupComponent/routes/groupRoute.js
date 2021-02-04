const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');

const PUBLIC_VAPID = 'BNOJyTgwrEwK9lbetRcougxkRgLpPs1DX0YCfA5ZzXu4z9p_Et5EnvMja7MGfCqyFCY4FnFnJVICM4bMUcnrxWg';
const PRIVATE_VAPID = '_kRzHiscHBIGftfA7IehH9EA3RvBl8SBYhXBAMz6GrI';
const webpush = require('web-push');
webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID);

router.get('/groups', async (ctx) => {
    try {
        const groupResponse = "List of all groups";
        f.success(ctx, groupResponse);
        console.log(groupResponse.toString())
    } catch {
        f.failure(ctx, "failed");
    }
});

router.get('/groups/:email', async (ctx) => {
    try {
        const groupResponse = ctx.params.email;
        f.success(ctx,groupResponse);
        console.log(groupResponse.toString())   
    } catch {
        f.failure(ctx, "failed");
    }
});

module.exports = router;
