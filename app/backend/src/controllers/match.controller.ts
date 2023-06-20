import { Request, Response } from 'express';
import { IMatchService } from '../services/match.service';
import getErrorCode from '../utils/httpError';

export interface IMatchController {
  getMatches(req: Request, res: Response): void;
  getAll(req: Request, res: Response): Promise<Response>;
  finishMatch(req: Request, res: Response): Promise<Response>;
  getByInProgress(req: Request, res: Response): Promise<Response>;
  updateScoreBoard(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
}

export default class MatchController implements IMatchController {
  constructor(private matchService: IMatchService) {}

  async getMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      this.getAll(req, res);
    } else {
      this.getByInProgress(req, res);
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const allMatches = await this.matchService.getAll();

    return res.status(200).json(allMatches.data);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId } = req.body;

    const createdMatch = await this.matchService
      .create({ homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId });

    if (createdMatch.status === 'notFound' || createdMatch.status === 'uprocessableData') {
      return res.status(getErrorCode(createdMatch.status)).json(createdMatch.data);
    }
    return res.status(201).json(createdMatch.data);
  }

  async updateScoreBoard(req: Request, res: Response): Promise<Response> {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;

    const updatedMatch = await this.matchService
      .updateScoreboard({ homeTeamGoals, awayTeamGoals }, id);

    return res.status(200).json(updatedMatch.data);
  }

  async getByInProgress(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    const inProgressAdjusted = inProgress === 'true';

    const filteredMatches = await this.matchService
      .getByInProgress(inProgressAdjusted);

    return res.status(200).json(filteredMatches.data);
  }

  async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const finishedMatch = await this.matchService.finishMatch(id);

    if (finishedMatch.status === 'notFound') {
      return res.status(getErrorCode(finishedMatch.status)).json(finishedMatch.data);
    }
    return res.status(200).json(finishedMatch.data);
  }
}
