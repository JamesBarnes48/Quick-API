const request = require('supertest');
const chai = require('chai');
const should = chai.should();

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

describe('POST /users', () => {
  let testUser = {
    username: "johnny boy22",
    password: "PasswOrd22",
    email: "johnny@gmail.com",
    dob: "2005-02-01"
  };

  it('Register a valid user without a credit card', async() => {
    return request('http://localhost:3000')
        .post('/users')
        .send(testUser)
        .expect(201)
  });

  it('Register a valid user with a credit card', async() => {
    return request('http://localhost:3000')
        .post('/users')
        .send({...testUser, creditCard: 1234567898765434})
        .expect(201)
  });

  it('Register a user with an invalid password', async() => {
    return request('http://localhost:3000')
        .post('/users')
        .send({...testUser, password: 'password'})
        .expect(400)
  });

  it('Register a user with an invalid email', async() => {
    return request('http://localhost:3000')
        .post('/users')
        .send({...testUser, email: 'mail.com'})
        .expect(400)
  });

  it('Register a user under age 18', async() => {
    return request('http://localhost:3000')
        .post('/users')
        .send({...testUser, dob: "2020-01-20"})
        .expect(403)
  });

  it('Register a user using a valid epoch timestamp date of birth', async() => {
    return request('http://localhost:3000')
        .post('/users')
        .send({...testUser, dob: 1007066467901})
        .expect(201)
  });

  it('Register a user using an invalid credit card', async() => {
    return request('http://localhost:3000')
        .post('/users')
        .send({...testUser, creditCard: 23})
        .expect(400)
  });

  it('Register a user using a non-numeric credit card (should default to no credit card)', async() => {
    return request('http://localhost:3000')
        .post('/users')
        .send({...testUser, creditCard: 'oops'})
        .expect(201)
  });

  it('Register a user who already exists', async() => {
    return request('http://localhost:3000')
        .post('/users')
        .send({...testUser, username: 'AndrewGod'})
        .expect(409)
  });
  
  it('Register a user with no information', async() => {
    return request('http://localhost:3000')
        .post('/users')
        .send({})
        .expect(400)
  });
})