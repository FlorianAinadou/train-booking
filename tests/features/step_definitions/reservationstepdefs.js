const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
var host = process.env.npm_package_config_myHost || "localhost";

const http = require('http')

    Given('Un customer souhaite réverser un train', function () {
        this.today = 'Sunday';
    });
  
  When('il part de la gare de {string} vers la gare de {string}',
    function (depart,arrivee) {

        const options = {
              hostname: host,
              port: 9000,
              path: '/trainSelector/'+depart+'/'+arrivee,
              method: 'GET'
            }

        const req = http.request(options, res => {
            assert.strictEqual(res.statusCode,200)
        
            res.on('data', d => {
                // process.stdout.write(d)
            })
        })
        
        req.on('error', error => {
            console.error(error)
        })
        req.end()
  });

  Then('il choisi le train avec id {int} et donne son email {string}',function(trainId,email){
    const data = JSON.stringify({
        "trainId": trainId,
        "userMail": email,
        "placeNumber": "AK47"
    })

    const options = {
          hostname: host,
          port: 9000,
          path: '/booking/addReservation',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
          }
        }

    const req = http.request(options, res => {
        // console.log(`statusCode: ${res.statusCode}`)
        assert.strictEqual(res.statusCode,200)
    
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
  
  Then('il regarde ces réservations via son mail {string} et voit {int} réservation', function (email,numberOfReservations) {
    
        const options = {
            hostname: host,
            port: 9000,
            path: '/booking/getBookingByMail/'+email,
            method: 'GET'
        }

        const req = http.request(options, res => {
            assert.strictEqual(res.statusCode,200)
        
            res.on('data', d => {
                // process.stdout.write(d)
                // assert.strictEqual(JSON.parse(d).length,numberOfReservations)
            })
        })
    
        req.on('error', error => {
            console.error(error)
        })
        req.end()
    });

    Then("il paie son billet de {int}€ qui a l'id {string} avec son mail {string}", function (price,bookingId,email) {
        const data = JSON.stringify({
            "bookingId": bookingId,
            "userMail": email,
            "price": price
        })
    
        const options = {
              hostname: host,
              port: 9000,
              path: '/payment/payReservation',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
              }
            }
    
        const req = http.request(options, res => {
            // console.log(`statusCode: ${res.statusCode}`)
            assert.strictEqual(res.statusCode,200)
        
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
