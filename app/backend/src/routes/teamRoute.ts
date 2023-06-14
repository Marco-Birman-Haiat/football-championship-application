import { Router } from 'express';
import TeamController from '../controllers/team.controller';
import TeamService from '../services/team.service';
import TeamRepository from '../repositories/teamRepository';

const teamRoute = Router();

const teamRepository = new TeamRepository();
const teamService = new TeamService(teamRepository);
const teamController = new TeamController(teamService);

teamRoute.get('/', async (req, res) => teamController.findAll(req, res));
teamRoute.get('/:id', async (req, res) => teamController.findById(req, res));

export default teamRoute;
