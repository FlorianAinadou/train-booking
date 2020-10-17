const Router = require('koa-router');
const router = new Router();
const f = require('../utils/functions');
const sdk = require('../sdk');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const KEY = "m yincredibl y(!!1!11!)<'SECRET>)Key'!";

/**
 * Récupérer la liste de tous les utilisateurs
 * @author Paul Koffi
 * @name Route : Récupération de la liste de tous les utilisateurs
 */
router.get('/api/getUsers', async (ctx) => {
    const users = await sdk.getUsers();
    f.success(ctx, users);
});

/**
 * Recherche d'un utilisateur précis
 * @author Paul Koffi
 * @name Route : Recherche d'un utilisateur précis (par Email)
 * @bodyparam {String} mail Adresse mail de l'utilisateur
 */
router.get('/api/getUsers/:mail', async (ctx) => {
    const users = await sdk.getUserByEmail(ctx.params.mail);
    f.success(ctx, users);
});


/**
 * Recherche d'un utilisateur précis
 * @author Paul Koffi
 * @name Route : Recherche d'un utilisateur précis (par Id)
 * @bodyparam {String} id Id de l'utilisateur
 */
router.get('/api/user/:id', async (ctx) => {
    const user = await sdk.getUserById(ctx.params.id);
    f.success(ctx, user);
});

/**
 * Inscription d'un utilisateur
 * @author Paul Koffi
 * @name Route : Inscription d'un utilisateur
 */
router.post('/api/user/signup', async (ctx) => {
    console.log("wtf");
    var password = crypto.createHash('sha256').update(ctx.request.body.password).digest('hex');
    const user = await sdk.getUserByEmail(ctx.request.body.mail);
    if (user === undefined) {
        console.error("can't create user " + ctx.request.body.mail);
        f.failure409(ctx, "An user with that email already exists");
    } else {
        console.log("Can create user " + ctx.request.body.mail);
        await sdk.addUser(ctx.request.body.firstName, ctx.request.body.lastName, ctx.request.body.mail, password, ctx.request.body.nationality, ctx.request.body.birthday, ctx.request.body.gender);
        f.success(ctx, "Success");
    }
});

/**
 * Login
 * @author Paul Koffi
 * @name Route : Login de l'application
 * @route {POST} paulkoffi.com:3000/api/login
 */
router.post('/api/user/login', async (ctx) => {
    var password = crypto.createHash('sha256').update(ctx.request.body.password).digest('hex');
    const user = await sdk.getUserByEmailAndPassword(ctx.request.body.mail, password);
    if (user !== null) {
        // console.table(user);
        var payload = {
                email: ctx.request.body.mail,
                // userId: user._id
            }
        ;
        var token = jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: "15d"});
        console.log("Login Success");
        f.success(ctx, token);
    } else {
        console.error("Login Failure");
        f.failure(ctx, "There's no user matching that");
    }
});


// Test
router.get('/api/data', async (ctx) => {
    var str = ctx.get('Authorization');
    console.log("token " + str);
    try {
        jwt.verify(str, KEY, {algorithm: 'HS256'});
        console.log("getData Success");
        f.success(ctx, "Données secrètes du back end");
    } catch {
        f.failure(ctx, "Bad Token");
    }
});



module.exports = router;
