const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
var host = process.env.npm_package_config_myHost || "localhost";

const http = require('http')

message = ""

function setMessage(newMessage){
    return message = newMessage
}

function getMessage(){
    return message
}

Given('Un customer veut s\'incrire', function () {
    this.today = 'Sunday';
  });
  
  When('il renseigne ses informations {string} {string} {string} {string} {string} {string} {string}',
    function (firstName,lastName,email,password,address,tel,gender) {
        const data = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "address": address,
            "mail": email,
            "password": password,
            "tel":tel,
            "gender": gender
        })

        const options = {
              hostname: host,
              port: 9000,
              path: '/api/user/signup',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
              }
            }

        const req = http.request(options, res => {
            // console.log(`statusCode: ${res.statusCode}`)
            assert.strictEqual(res.statusCode,409)
        
            res.on('data', d => {
                // process.stdout.write(d)
                // setMessage(JSON.parse(d))
                // console.log(getMessage())
            })
        })
        
        req.on('error', error => {
            console.error(error)
        })
        
        req.write(data)
        req.end()
  });
  
  Then('il reçoit le message {string}', function (expectedAnswer) {
    //   console.log(getMessage()+"helooo")
    assert.strictEqual("An user with that email already exists", expectedAnswer);
  });
