import { describe, it } from 'mocha';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import chai from 'chai';
import server from '../src/index';

let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing the API Requests per second', () => {
  it('Firing the first request', (done) => {
    chai.request(server)
        .get('/api/notifications/sametime')
        .set('user','Andela')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
  });
});

describe('Testing too many request across system', () => {
  it('Firing the first request', (done) => {
    chai.request(server)
        .get('/notifications')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
});
});

describe('Testing specific client request per month', () => {
  it('Firing the first request', (done) => {
    chai.request(server)
        .get('/api/notifications/client')
        .set('user','Andela')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
});
});
