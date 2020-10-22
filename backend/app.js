const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');



const trainSelector  = require('./src/server/trainSelector/routes/trainSelectorRoutes');
const customerRegistration  = require('./src/server/customerRegistration/routes/customerRegistration');

const app = new Koa();
const PORT = 9000;

app.use(bodyParser());
app.use(logger());
app.use(cors({origin: '*', exposeHeaders: '*'}));
app.use(trainSelector.routes());
app.use(customerRegistration.routes());



const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});


module.exports = {
  server
};
