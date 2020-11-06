const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

function isItFriday(today) {
    if (today === "Friday") {
      return "TGIF"; 
    } else {
      return "Nope";
    }
  }

// const https = require('https')
// const options = {
//   hostname: 'whatever.com',
//   port: 443,
//   path: '/todos',
//   method: 'GET'
// }

// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`)

//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// req.end()
  
  Given('today is Sunday', function () {
    this.today = 'Sunday';
    
  });
  
  When('I ask whether it\'s Friday yet', function () {
    this.actualAnswer = isItFriday(this.today);
  });
  
  Then('I should be told {string}', function (expectedAnswer) {
    assert.equal(this.actualAnswer, expectedAnswer);
  });

  Given('today is Friday', function () {
    this.today = 'Friday';
  });