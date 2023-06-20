import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';
import MatchRepository from '../repositories/matchRepository';

const leaderboardRouter = Router();

const matchRepository = new MatchRepository();
const leaderboardService = new LeaderboardService(matchRepository);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get(
  '/home',
  async (req, res) => leaderboardController.getHomeLeaderBoard(req, res),
);

leaderboardRouter.get(
  '/away',
  async (req, res) => leaderboardController.getAwayLeaderBoard(req, res),
);

leaderboardRouter.get(
  '/',
  async (req, res) => leaderboardController.getLeaderBoard(req, res),
);

export default leaderboardRouter;
