const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');
const trainSelector  = require('./src/server/trainSelector/routes/trainSelectorRoutes');
const customerRegistration  = require('./src/server/customerRegistration/routes/customerRegistration');

const bookingComponent = require('./src/server/bookingComponent/routes/bookingRoutes');
const config = require("../externes/trains/config");
const mongoose = require('mongoose');

const paymentComponent = require('./src/server/paymentComponent/routes/paymentRoute')

const app = new Koa();
const PORT = 9000;

app.use(bodyParser());
app.use(logger());
app.use(cors({origin: '*', exposeHeaders: '*'}));
app.use(trainSelector.routes());
app.use(bookingComponent.routes());
app.use(customerRegistration.routes());
app.use(paymentComponent.routes());



const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

mongoose.connect(`mongodb+srv://${config.configDB.userName}:${config.configDB.password}@${config.configDB.host}/${config.configDB.name}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.set('debug', true);


module.exports = {
  server
};