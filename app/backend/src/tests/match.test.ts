import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../database/models/team.model';
import { allTeamsMock } from './mocks/team.mock';
import MatchModel from '../database/models/match.model';
import { allMatchesMock, allMatchesResponse, matchMock } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('match routes tests', () => {
  afterEach(() => {
   sinon.restore();
  });
  
  
  describe('/match get route', function () {
    it('get all matches', async () => {
      const match = MatchModel.build(matchMock);
      match.setDataValue('homeTeam', { teamName: 'São Paulo', id: 1 });
      match.setDataValue('awayTeam', { teamName: 'Grêmio', id: 2 });
      
      sinon.stub(MatchModel, 'findAll').resolves([match, match]);
  
      const response = await chai.request(app)
        .get('/matches')
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allMatchesResponse);
    });

    it('get filtered matches', async () => {
      const match = MatchModel.build(matchMock);
      match.setDataValue('homeTeam', { teamName: 'São Paulo', id: 1 });
      match.setDataValue('awayTeam', { teamName: 'Grêmio', id: 2 });

      sinon.stub(MatchModel, 'findAll').resolves([match, match]);
  
      const response = await chai.request(app)
        .get('/matches?inProgress=false')
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allMatchesResponse);
    });
  });

  describe('/match post route', function () {
    it('match post SUCCESS', async () => {
      const match = MatchModel.build(matchMock);

      sinon.stub(MatchModel, 'create').resolves(match);
      sinon.stub(jwt, 'verify').returns();
      
      const { id, homeTeam, awayTeam, ...sendData } = matchMock;
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', 'test_token')
        .send(sendData)
  
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ ...sendData, id });
    });
  });

  describe('/match post fails cases', function () {
    it('fails when token is missin in request', async function () {
      const { id, homeTeam, awayTeam, ...sendData } = matchMock;
      const response = await chai.request(app)
        .post('/matches')
        .send(sendData)
  
      expect(response.status).to.be.equal(401);
    });

    it('fails when token is not valid', async function () {
      sinon.stub(jwt, 'verify').throws();
      
      const { id, homeTeam, awayTeam, ...sendData } = matchMock;
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', 'test_token')
        .send(sendData)
  
      expect(response.status).to.be.equal(401);
    });

    it('fails when both teams have the same id', async function () {
      sinon.stub(jwt, 'verify').resolves();
      
      const { id, homeTeam, awayTeam, ...sendData } = matchMock;
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', 'test_token')
        .send({ ...sendData, homeTeamId: sendData.awayTeamId })
  
      expect(response.status).to.be.equal(422);
    });

    it('fails when teamId does not exists', async function () {
      sinon.stub(MatchModel, 'create').throws();
      sinon.stub(jwt, 'verify').returns();
      
      const { id, homeTeam, awayTeam, ...sendData } = matchMock;
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', 'test_token')
        .send(sendData)
  
      expect(response.status).to.be.equal(404);
    })
  });

  describe('/match/:id patch new scoreboard', function () {
    it('update scoreboard SUCESS', async function () {
      sinon.stub(MatchModel, 'update').resolves();
      sinon.stub(jwt, 'verify').returns();
      
      const { homeTeamGoals, awayTeamGoals } = matchMock;
      const response = await chai.request(app)
        .patch('/matches/1')
        .set('authorization', 'test_token')
        .send({ homeTeamGoals, awayTeamGoals })
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Scoreboard updated' });
    });
  });

  describe('/match/:id/finish patch new scoreboard', function () {
    it('finish match SUCESS', async function () {
      sinon.stub(MatchModel, 'update').resolves();
      sinon.stub(jwt, 'verify').returns();

      const response = await chai.request(app)
        .patch('/matches/1/finish')
        .set('authorization', 'test_token')
        .send()
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });

    describe('/match/:id/finish patch fails cases', function () {
      it('fails when team id does not exists', async function () {
        sinon.stub(MatchModel, 'findByPk').resolves();
        sinon.stub(jwt, 'verify').returns();

        const response = await chai.request(app)
          .patch('/matches/1/finish')
          .set('authorization', 'test_token')
          .send()
    
        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal({ message: 'match not found' });
      });
    });
  });
});
