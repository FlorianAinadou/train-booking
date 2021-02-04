const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');
const trainSelector  = require('./src/server/trainSelector/routes/trainSelectorRoutes');
const customerRegistration  = require('./src/server/customerRegistration/routes/customerRegistration');

const bookingComponent = require('./src/server/bookingComponent/routes/bookingRoutes');
const config = require("./config");
const mongoose = require('mongoose');

const paymentComponent = require('./src/server/paymentComponent/routes/paymentRoute');

const groupComponent = require('./src/server/groupComponent/routes/groupRoute')

const app = new Koa();
const PORT = 9000;

// {
//   publicKey: 'BBRb25x9AhSH8JRJ0Jykc-kbR4M-D0lQuhPScEx69k2fi2qKqt2IUiuWE-k3jdod6rbXgcssZeVHZS03KO5tO6E',
//       privateKey: 'c5eoxjQkimTRUfIBsfbCDbgCtiAZnZOv29B_A0TGo0U'
// }


app.use(bodyParser());
app.use(logger());
app.use(cors({origin: '*', exposeHeaders: '*'}));
app.use(trainSelector.routes());
app.use(bookingComponent.routes());
app.use(customerRegistration.routes());
app.use(paymentComponent.routes());
app.use(groupComponent.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

mongoose.connect(`mongodb+srv://${config.configDB.userName}:${config.configDB.password}@${config.configDB.host}/${config.configDB.name}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);


module.exports = server ;
