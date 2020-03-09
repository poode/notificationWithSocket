const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('should');

chai.use(chaiHttp);

it('signaling event  "event 5"', function(done) {
  chai.request('http://localhost:3000')
    .post('/signals')
    .send({
      "event": "event 1",
      "body": "event 1 will be started soon so stay tuned!"
    })
  .end(function(err, res) {
    if (err) {
      throw err;
    }
    res.body.should.be.array
    done();
  });
});