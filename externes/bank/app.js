const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const app = new Koa();
const PORT = 7000;

const paidRoute  = require('./src/server/routes/checkPaymentStatusRoute');

app.use(bodyParser());
app.use(logger());
app.use(cors({origin: '*', exposeHeaders: '*'}));
app.use(paidRoute.routes());


const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  
  module.exports = {
    server
  };