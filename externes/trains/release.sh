PATH="/home/godzilla/.nvm/versions/node/v12.16.3/bin:$PATH"

npm install

pm2 stop externtrainsservice

pm2 delete externtrainsservice

pm2 start app.js --name "externtrainsservice" --instances 5 --max-restarts 5
