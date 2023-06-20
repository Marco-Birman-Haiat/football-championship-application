import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../database/models/team.model';
import { allTeamsMock } from './mocks/team.mock';
import MatchModel from '../database/models/match.model';
import { allMatchesMock, matchMock } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('match routes tests', () => {
  afterEach(() => {
   sinon.restore();
  });
  
  
  describe('/match get route', function () {
    it('get all matches', async () => {
      const match = MatchModel.build(matchMock);
      sinon.stub(MatchModel, 'findAll').resolves([match, match]);
  
      const response = await chai.request(app)
        .get('/matches')
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allMatchesMock);
    });

    it('get filtered matches', async () => {
      const match = MatchModel.build(matchMock);
      sinon.stub(MatchModel, 'findAll').resolves([match, match]);
  
      const response = await chai.request(app)
        .get('/matches?inProgress=true')
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allMatchesMock);
    });
  });

  describe('/match post route', function () {
    it('match post SUCCESS', async () => {
      const match = MatchModel.build(matchMock);
      sinon.stub(MatchModel, 'findAll').resolves([match, match]);
  
      const response = await chai.request(app)
        .post('/matches')
        .send()
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allMatchesMock);
    });
  });
});
