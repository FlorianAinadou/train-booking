const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');

const PUBLIC_VAPID = 'BNOJyTgwrEwK9lbetRcougxkRgLpPs1DX0YCfA5ZzXu4z9p_Et5EnvMja7MGfCqyFCY4FnFnJVICM4bMUcnrxWg';
const PRIVATE_VAPID = '_kRzHiscHBIGftfA7IehH9EA3RvBl8SBYhXBAMz6GrI';
const webpush = require('web-push');
webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID);

const groupsdk = require('../sdk/groupSdk')

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
        const groupResponse = await groupsdk.getAllGroupsByEmail(ctx.params.email);
        f.success(ctx,groupResponse);
        console.log(groupResponse.toString())   
    } catch {
        f.failure(ctx, "failed");
    }
});

router.post('/groups/addNewMember', async (ctx) => {
    const groups = await groupsdk.addNewMember(ctx.request.body.groupName, ctx.request.body.userName, ctx.request.body.userMail);
    f.success(ctx, groups);
});

router.post('/groups/quitAGroup', async (ctx) => {
    const groups = await groupsdk.quitAGroup(ctx.request.body.groupName, ctx.request.body.userName, ctx.request.body.userMail);
    f.success(ctx, groups);
});

router.post('/groups/createAGroup', async (ctx) => {
    const groups = await groupsdk.createAGroup(ctx.request.body.groupName, ctx.request.body.userName, ctx.request.body.userMail);
    f.success(ctx, groups);
});

router.del('/groups/:email/:groupName', async (ctx) => {
    try {
        const groupResponse = await groupsdk.deleteAGroup(ctx.params.groupName,ctx.params.email);
        f.success(ctx,groupResponse);
        console.log(groupResponse.toString())   
    } catch {
        f.failure(ctx, "failed");
    }
});

module.exports = router;
