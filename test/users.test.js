const request = require('supertest');
const chai = require('chai');
const should = chai.should(), expect = chai.expect();

describe('GET /users', () => {
  let usersWithCards, usersWithoutCards, allUsers;
    it('Get users with credit cards', async() => {
      const response = await request('http://localhost:3000')
          .get('/users')
          .send({CreditCard: 'Yes'});
      response.body.should.be.a('object');
      response.body.should.have.all.keys('users');
      response.body.users.map((user) => {return user.creditCard}).forEach((card) => {card.should.be.a('number')});
      usersWithCards = response.body.users.length;
    });
    it('Get users without credit cards', async() => {
      const response = await request('http://localhost:3000')
          .get('/users')
          .send({CreditCard: 'No'});
      response.body.should.be.a('object');
      response.body.should.have.all.keys('users');
      response.body.users.map((user) => {return user.creditCard}).filter((card) => {return card !== null}).length.should.be.equal(0);
      usersWithoutCards = response.body.users.length;
    });
    it('Get all users', async() => {
      const response = await request('http://localhost:3000')
          .get('/users')
      response.body.should.be.a('object');
      response.body.should.have.all.keys('users');
      allUsers = response.body.users.length;
    });
    it('Ensure number of users fetched by non-filtered query equals the sum of the two filtered queries', () => {
      (usersWithCards + usersWithoutCards).should.be.equal(allUsers);
    })
});