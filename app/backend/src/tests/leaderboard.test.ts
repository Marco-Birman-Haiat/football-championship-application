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
import { awayLeaderboardMock, completeLeaderboardMock, homeLeaderboardMock } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('match routes tests', () => {
  afterEach(() => {
   sinon.restore();
  });

  beforeEach(() => {
    const match1 = MatchModel.build(matchMock);
    const match2 = MatchModel.build({...matchMock, homeTeamGoals: 1 });
    match1.setDataValue('homeTeam', { teamName: 'São Paulo', id: 1 });
    match1.setDataValue('awayTeam', { teamName: 'Grêmio', id: 2 });
    match2.setDataValue('homeTeam', { teamName: 'São Paulo', id: 1 });
    match2.setDataValue('awayTeam', { teamName: 'Grêmio', id: 2 });
    sinon.stub(MatchModel, 'findAll').resolves([match1, match2]);
  })
  
  
  describe('/leaderboard/home get route', function () {
    it('get home leaderboard SUCESS', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/home')
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(homeLeaderboardMock);
    });
  });

  describe('/leaderboard/away get route', function () {
    it('get away leaderboard SUCESS', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/away')
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(awayLeaderboardMock);
    });
  });

  describe('/leaderboard get route', function () {
    it('get all matches leaderboard SUCESS', async () => {
      const match = MatchModel.build(matchMock);
      const response = await chai.request(app)
        .get('/leaderboard')
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(completeLeaderboardMock);
    });
  });
});