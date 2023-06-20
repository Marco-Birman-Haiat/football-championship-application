import * as express from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import MatchRepository from '../repositories/matchRepository';
import TokenValidation from '../middleware/tokenMiddleware';

const matchRoute = express.Router();

const matchRepository = new MatchRepository();
const matchService = new MatchService(matchRepository);
const matchController = new MatchController(matchService);

matchRoute.get('/', async (req, res) => matchController.getMatches(req, res));
matchRoute.patch(
  '/:id/finish',
  TokenValidation.validateToken,
  async (req, res) => matchController.finishMatch(req, res),
);

matchRoute.patch(
  '/:id',
  TokenValidation.validateToken,
  async (req, res) => matchController.updateScoreBoard(req, res),
);

matchRoute.post(
  '/',
  TokenValidation.validateToken,
  async (req, res) => matchController.create(req, res),
);

export default matchRoute;
