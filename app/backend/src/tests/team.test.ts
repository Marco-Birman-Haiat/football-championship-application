import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../database/models/team.model';
import { allTeamsMock } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login routes tests', () => {
  afterEach(() => {
   sinon.restore();
  });
  
  
  describe('/teams get route', function () {
    it('get all teamns SUCCESS', async () => {
      const allTeams = TeamModel.bulkBuild(allTeamsMock);
      sinon.stub(TeamModel, 'findAll').resolves(allTeams);
  
      const response = await chai.request(app)
        .get('/teams')
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allTeamsMock);
    });
  });
  describe('/teams/:id get route', function () {
    it('get team by id SUCCESS', async function () {
      const teamMock = TeamModel.build(allTeamsMock[0]);
      sinon.stub(TeamModel, 'findByPk').resolves(teamMock);
  
      const response = await chai.request(app)
        .get('/teams/1')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allTeamsMock[0]);
    });
    describe('/teams/:id get fail cases', function () {
      it('fails when teamId does not exists', async function () {
        sinon.stub(TeamModel, 'findByPk').resolves();
    
        const response = await chai.request(app)
          .get('/teams/99')

        expect(response.status).to.be.equal(404);
      })
    })
  });
});
