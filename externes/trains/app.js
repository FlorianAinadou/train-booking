const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const config = require('./config');

const app = new Koa();
const PORT = 8000;

const trainsList  = require('./src/server/routes/trainsListRoutes');

app.use(bodyParser());
app.use(logger());
app.use(cors({origin: '*', exposeHeaders: '*'}));
app.use(trainsList.routes());

mongoose.connect(`mongodb+srv://${config.configDB.userName}:${config.configDB.password}@${config.configDB.host}/${config.configDB.name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.set('debug', true);

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  
  module.exports = {
    server
  };