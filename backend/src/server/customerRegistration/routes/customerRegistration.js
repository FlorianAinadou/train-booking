const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const customerRegistrationSdk = require('../sdk/customerRegistration');
const customerFinderSdk = require('../sdk/customerFinder');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const KEY = "m yincredibl y(!!1!11!)<'SECRET>)Key'!";

/**
 * Récupérer la liste de tous les utilisateurs
 * @author Paul Marie
 * @name Route : Récupération de la liste de tous les utilisateurs
 */
router.get('/api/getUsers', async (ctx) => {
    const users = await customerFinderSdk.getUsers();
    f.success(ctx, users);
});

/**
 * Recherche d'un utilisateur précis
 * @author Paul Marie
 * @name Route : Recherche d'un utilisateur précis (par Email)
 * @bodyparam {String} mail Adresse mail de l'utilisateur
 */
router.get('/api/getUsers/:mail', async (ctx) => {
    const users = await customerFinderSdk.getUserByEmail(ctx.params.mail);
    f.success(ctx, users);
});


/**
 * Recherche d'un utilisateur précis
 * @author Paul Marie
 * @name Route : Recherche d'un utilisateur précis (par Id)
 * @bodyparam {String} id Id de l'utilisateur
 */
router.get('/api/user/:id', async (ctx) => {
    const user = await customerFinderSdk.getUserById(ctx.params.id);
    f.success(ctx, user);
});

/**
 * Inscription d'un utilisateur
 * @author Paul Marie
 * @name Route : Inscription d'un utilisateur
 */
router.post('/api/user/signup', async (ctx) => {
    // console.log("wtf");
    var password = crypto.createHash('sha256').update(ctx.request.body.password).digest('hex');
    const user = await customerFinderSdk.getUserByEmail(ctx.request.body.mail);
    console.table(user);
    if (user !== null) {
        console.error("can't create user " + ctx.request.body.mail);
        f.failure409(ctx, "An user with that email already exists");
    } else {
        console.log("Can create user " + ctx.request.body.mail);
        await customerRegistrationSdk.addUser(ctx.request.body.firstName, ctx.request.body.lastName, ctx.request.body.mail, password, ctx.request.body.tel, ctx.request.body.address, ctx.request.body.gender);
        f.success(ctx, "Success");
    }
});

router.post('/api/user', async (ctx) => {
    // const user = await customerFinderSdk.getUserById(ctx.params.id);
    var password = crypto.createHash('sha256').update(ctx.request.body.password).digest('hex');
    console.log('ici');
    // const user = await customerFinderSdk.getUserByEmail(ctx.request.body.mail);

    const user = await customerFinderSdk.getUserByEmailAndPassword(ctx.request.body.mail, password);
    f.success(ctx, user);
});


/**
 * Login
 * @author Paul Marie
 * @name Route : Login de l'application
 * @route {POST} paulkoffi.com:3000/api/login
 */
router.post('/api/user/login', async (ctx) => {
    console.log('ici');
    var password = crypto.createHash('sha256').update(ctx.request.body.password).digest('hex');
    console.log('ici');

    const user = await customerFinderSdk.getUserByEmailAndPassword(ctx.request.body.mail, password);
    console.log('ici');

    if (user !== null) {
        // await customerFinderSdk.updateFirebaseTokenWeb(ctx.request.body.token, ctx.request.body.mail);
        // console.table(user);
        var payload = {
                email: ctx.request.body.mail,
                // userId: user._id
            }
        ;
        var token = jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: "15d"});
        const response =
            {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "token": token
            }
        console.log("Login Success");
        f.success(ctx, JSON.stringify(response));
    } else {
        console.error("Login Failure");
        f.failure(ctx, JSON.stringify("There's no user matching that"));
    }
});


router.post('/api/user/log', async (ctx) => {
    console.log('ici');
});

router.post('/api/user/updatefirebasetokenmobile', async (ctx) => {
    const rep = await customerFinderSdk.updateFirebaseTokenMobile(ctx.request.body.token, ctx.request.body.mail);
    if (rep) {
        f.success(ctx, JSON.stringify(rep));
    } else {
        console.error("Login Failure");
        f.failure(ctx, JSON.stringify("There's no user matching that"));
    }
});

router.post('/api/user/updatewebpushinformations', async (ctx) => {
    const rep = await customerFinderSdk.updateWepPushToken(ctx.request.body.endpoint, ctx.request.body.p256dh, ctx.request.body.auth,  ctx.request.body.mail);
    if (rep) {
        f.success(ctx, JSON.stringify(rep));
    } else {
        console.error("Login Failure");
        f.failure(ctx, JSON.stringify("There's no user matching that"));
    }
});

// Test
router.post('/api/data', async (ctx) => {
    // var str = ctx.get('Authorization');
    const str = ctx.request.body.password;
    console.log("token " + str);
    try {
        jwt.verify(str, KEY, {algorithm: 'HS256'});
        console.log("getData Success");
        f.success(ctx, "Données secrètes du back end");
    } catch {
        f.failure(ctx, "Bad Token");
    }
});

router.post('/api/user/sign', async (ctx) => {

});


module.exports = router;
