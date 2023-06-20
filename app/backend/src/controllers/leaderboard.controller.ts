import { Request, Response } from 'express';
import { ILeaderboardService } from '../services/leaderboard.service';

export interface ILeaderboardController {
  getHomeLeaderBoard(req: Request, res: Response): Promise<Response>;
  getAwayLeaderBoard(req: Request, res: Response): Promise<Response>;
  getLeaderBoard(req: Request, res: Response): Promise<Response>;
}

export default class LeaderboardController implements ILeaderboardController {
  constructor(private leaderboardService: ILeaderboardService) {}

  async getHomeLeaderBoard(req: Request, res: Response): Promise<Response> {
    const homeLeaderBoard = await this.leaderboardService.getHomeMatchesBoard();
    return res.status(200).json(homeLeaderBoard);
  }

  async getAwayLeaderBoard(req: Request, res: Response): Promise<Response> {
    const awayLeaderBoard = await this.leaderboardService.getAwayMatchesBoard();
    return res.status(200).json(awayLeaderBoard);
  }

  async getLeaderBoard(req: Request, res: Response): Promise<Response> {
    const leaderBoard = await this.leaderboardService.getAllMatchesBoard();
    return res.status(200).json(leaderBoard);
  }
}
