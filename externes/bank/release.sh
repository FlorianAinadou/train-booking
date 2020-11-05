PATH="/home/godzilla/.nvm/versions/node/v12.16.3/bin:$PATH"

npm install

pm2 stop externbankservice

pm2 delete externbankservice

pm2 start app.js --name "externbankservice" --instances 1 --max-restarts 5
