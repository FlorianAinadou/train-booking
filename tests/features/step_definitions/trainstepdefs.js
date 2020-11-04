const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

const http = require('http')

Given('Un customer veut réverser un train', function () {
    this.today = 'Sunday';
  });
  
  When('il part de {string} vers {string}',
    function (depart,arrivee) {

        const options = {
              hostname: 'localhost',
              port: 9000,
              path: '/trainSelector/'+depart+'/'+arrivee,
              method: 'GET'
            }

        const req = http.request(options, res => {
            assert.strictEqual(res.statusCode,200)
        
            res.on('data', d => {
                process.stdout.write(d)
            })
        })
        
        req.on('error', error => {
            console.error(error)
        })
        req.end()
  });
  
  Then('il reçoit une liste de trains', function () {
  });