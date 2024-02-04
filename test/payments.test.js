const request = require('supertest');
const chai = require('chai');
const should = chai.should();

describe('POST /payments', () => {
  let testPayment = {
    creditCard: 1234754896546784,
    amount: 123
  };

  it('Make a valid payment', async() => {
    return request('http://localhost:3000')
        .post('/payments')
        .send(testPayment)
        .expect(201)
  });

  it('Make a payment to a card that doesnt exist', async() => {
    return request('http://localhost:3000')
        .post('/payments')
        .send({...testPayment, creditCard: 1234567891234567})
        .expect(404)
  });

  it('Make a payment to an invalid card', async() => {
    return request('http://localhost:3000')
        .post('/payments')
        .send({...testPayment, creditCard: 25})
        .expect(400)
  });

  it('Make a payment of an invalid amount', async() => {
    return request('http://localhost:3000')
        .post('/payments')
        .send({...testPayment, amount: 1})
        .expect(400)
  });

  it('Make a payment with a random string as an amount', async() => {
    return request('http://localhost:3000')
        .post('/payments')
        .send({...testPayment, amount: 'oops'})
        .expect(400)
  });

  it('Make a payment with no information', async() => {
    return request('http://localhost:3000')
        .post('/payments')
        .send({})
        .expect(400)
  });
})