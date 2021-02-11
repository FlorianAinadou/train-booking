const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const sdk = require('../sdk/paymentsdk');
const customerFinderSdk = require('../../customerRegistration/sdk/customerFinder');

const PUBLIC_VAPID = 'BNOJyTgwrEwK9lbetRcougxkRgLpPs1DX0YCfA5ZzXu4z9p_Et5EnvMja7MGfCqyFCY4FnFnJVICM4bMUcnrxWg';
const PRIVATE_VAPID = '_kRzHiscHBIGftfA7IehH9EA3RvBl8SBYhXBAMz6GrI';
const webpush = require('web-push');
webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID);

router.get('/pay/:idCard/:price', async (ctx) => {
    try {
        const bankResponse = await sdk.pay(ctx.params.idCard, ctx.params.price);
        f.success(ctx, bankResponse);
        console.log(bankResponse.toString())
    } catch {
        f.failure(ctx, "failed");
    }
});

router.post('pay'), async (ctx) => {
    try {
        const isGroup = ctx.request.body.isGroup;
        let bankResponse;
        if (isGroup) {
            bankResponse = await sdk.payGroup(ctx.request.body.groupId, ctx.request.body.price, ctx.request.body.userMail);
        } else {
            bankResponse = await sdk.pay(ctx.request.body.idCard, ctx)
        }

    } catch {
        f.failure(ctx, "failed");
    }
}


router.post('/payment/payReservationMobile', async (ctx) => {
    const bookings = await sdk.payReservationByIdAndEmail(ctx.request.body.bookingId, ctx.request.body.userMail, ctx.request.body.price);
    const users = await customerFinderSdk.getUserByEmail(ctx.request.body.userMail);
    if (bookings && users !== null && users !== undefined) {
        const sub = {
            endpoint: users.endpoint,
            expirationTime: null,
            keys: {
                p256dh: users.p256dh,
                auth: users.auth
            }
        };
        const notificationPayload = {
            notification: {
                title: 'Nouvelle réservation effectuée avec succès',
                body: '😎 GO GO GO !!!!',
                icon: 'assets/icons/icon-512x512.png'
            }
        };
        webpush.sendNotification(sub, JSON.stringify(notificationPayload));
    }
    // f.success(ctx, "OK");
    f.success(ctx, JSON.stringify(bookings));
});

router.post('/payment/payReservationWeb', async (ctx) => {
    const bookings = await sdk.payReservationByIdAndEmail(ctx.request.body.bookingId, ctx.request.body.userMail, ctx.request.body.price);
    const users = await customerFinderSdk.getUserByEmail(ctx.request.body.userMail);
    if (bookings && users !== null && users !== undefined) {
        const fireBaseConfig = require('../../../../firebase-config');
        const notification_options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };
        if (users.fireBaseIdMobile !== null) {
            const message_notification = {
                notification: {
                    title: "Nouvelle Reservation !!!",
                    body: "😎 GO GO GO !!!!!",
                    icon: "https://subtlepatterns.com/patterns/geometry2.png",
                    click_action: 'FLUTTER_NOTIFICATION_CLICK',

                }
                // },
                // data: {
                //     groupId: result.groupId,
                //     act: act,
                //     time: result.delay + " min"
                // }
            };
            await fireBaseConfig.admin.messaging().sendToDevice(users.fireBaseIdMobile, message_notification, notification_options)
                .then(response => {
                    console.log("NOTIF SEND OK");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    f.success(ctx, JSON.stringify(bookings));
});

router.post('payment/paygroup', async (ctx) => {
    try {
        const paymentGroup = await sdk.payGroup(ctx.request.body.trainId, ctx.request.body.customer, ctx.request.body.price,
            ctx.request.body.placesNumber, ctx.request.body.groupId);
        f.success(ctx, paymentGroup.toString())
    } catch {
        f.failure(ctx, 'failed')
    }
})


module.exports = router;
