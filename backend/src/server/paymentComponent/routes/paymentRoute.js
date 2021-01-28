const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const sdk = require('../sdk/paymentsdk');
const customerFinderSdk = require('../../customerRegistration/sdk/customerFinder');



router.get('/pay/:idCard/:price', async (ctx) => {
    try {
        const bankResponse = await sdk.pay(ctx.params.idCard, ctx.params.price);
        f.success(ctx, bankResponse);
        console.log(bankResponse.toString())
    } catch {
        f.failure(ctx, "failed");
    }
});


router.post('/payment/payReservationMobile', async (ctx) => {
    const bookings = await sdk.payReservationByIdAndEmail(ctx.request.body.bookingId, ctx.request.body.userMail, ctx.request.body.price);
    f.success(ctx, JSON.stringify(bookings));
});

router.post('/payment/payReservationWeb', async (ctx) => {
    const bookings = await sdk.payReservationByIdAndEmail(ctx.request.body.bookingId, ctx.request.body.userMail, ctx.request.body.price);
    const users = await customerFinderSdk.getUserByEmail(ctx.params.mail);
    if (bookings) {
        const fireBaseConfig = require('../../../../firebase-config');
        const notification_options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };
        if(users.fireBaseIdMobile !== null){
          const message_notification = {
            notification: {
              title: "Nouvelle Reservation !!!",
              body: "😎 GO GO GO !!!!!",
              icon: "https://subtlepatterns.com/patterns/geometry2.png",
              click_action: 'FLUTTER_NOTIFICATION_CLICK'
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


module.exports = router;
