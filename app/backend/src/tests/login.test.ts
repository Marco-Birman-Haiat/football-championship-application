import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import UserModel from '../database/models/user.model';
import { registeredUser } from './mocks/user.mock';
import { InvalidLoginBody, validLoginBody } from './mocks/login.mock';
import JwtAuthorization from '../utils/jwtFunctions';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login routes tests', () => {
  afterEach(() => {
   sinon.restore();
  });
  
  
  describe('/login route', function () {
    it('Login SUCCESS', async () => {
      const userMock = UserModel.build(registeredUser);
      sinon.stub(UserModel, 'findOne').resolves(userMock);
  
      const response = await chai.request(app)
        .post('/login')
        .send(validLoginBody)
  
      expect(response.status).to.be.equal(200);
      expect(response.body.token).not.to.be.undefined;
    });
  
    describe('Login fail cases', function () {
      it('fails when email or password is missing in request', async function () {
        const { email, ...invalidLoginBody } = validLoginBody;
        const response = await chai.request(app)
          .post('/login')
          .send(invalidLoginBody)
    
        expect(response.status).to.be.equal(400);
      });

      it('fails when email does not exist', async function () {
        sinon.stub(UserModel, 'findOne').resolves(null);
        
        const response = await chai.request(app)
          .post('/login')
          .send(validLoginBody)
    
        expect(response.status).to.be.equal(401);
      });

      it('fails when email is not valid', async function () {
        const response = await chai.request(app)
          .post('/login')
          .send({ ...InvalidLoginBody, password: validLoginBody.password });
    
        expect(response.status).to.be.equal(401);
      });

      it('fails when password is not valid', async function () {
        const response = await chai.request(app)
          .post('/login')
          .send({ ...InvalidLoginBody, email: validLoginBody.email });
    
        expect(response.status).to.be.equal(401);
      });

      it('fails when password dont match the database', async function () {
        const userMock = UserModel.build(registeredUser);
        sinon.stub(UserModel, 'findOne').resolves(userMock);
        
        const response = await chai.request(app)
          .post('/login')
          .send({ ...validLoginBody, password: '1234567' });
    
        expect(response.status).to.be.equal(401);
      });
    });
  })

  describe('/login/role route', function () {
    it('get role SUCCESS', async () => {
      const userMock = UserModel.build(registeredUser);
      sinon.stub(UserModel, 'findByPk').resolves(userMock);
      sinon.stub(JwtAuthorization, 'verifyToken').returns({ id: 1 });
  
      const response = await chai.request(app)
        .get('/login/role')
        .set('authorization', 'test_token')
        
  
        expect(response.status).to.be.equal(200);
        expect(response.body.role).not.to.be.undefined;
    });

    describe('get login/role fail cases', function () {
      it('fails when authorization is missing in request', async function () {
        const response = await chai.request(app)
        .get('/login/role')
        
        expect(response.status).to.be.equal(401);
      });

      it('fails when token is not valid', async function () {
        sinon.stub(JwtAuthorization, 'verifyToken').throws('error');
        const response = await chai.request(app)
          .get('/login/role')
          .set('authorization', 'test_token')
        
        expect(response.status).to.be.equal(401);
      });
    });
  })
});
