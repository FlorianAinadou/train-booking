const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

const server = require('../app');

describe('routes : customers', () => {

    describe('GET /api/getUsers', () => {
        it('should return all customers', done => {
            chai.request(server)
                .get('/api/getUsers')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('application/json');
                    done();
                });
        });
    });

    describe('GET /api/getUsers/:mail', () => {
        it('should return a customer throught his email', done => {
            chai.request(server)
                .get('/api/getUsers/pkoffi5@gmail.com')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('application/json');
                    expect(res.body.firstName).equal("Paul");
                    expect(res.body.lastName).equal("KOFFI");
                    done();
                });
        });
    });

    describe('POST /api/user/signup', () => {
        it('should return a succes', done => {
            chai.request(server)
                .post('/api/user/signup')
                .set("content-type", "application/json")
                .send({
                    "firstName": "Paul",
                    "lastName": "KOFFI",
                    "mail": "pkoffi5@gmail.com",
                    "address": "ioezbaourbv",
                    "password": "12345",
                    "tel": "014219591",
                    "gender": "M"
                })
                .end((err, res) => {
                    expect(res).to.have.status(409);
                    expect(res.text).equal("An user with that email already exists");
                    done();
                });
        });
    });
});