import { Request, Response } from 'express';
import { ITeamService } from '../services/team.service';

export interface ITeamController {
  findAll(req: Request, res: Response): Promise<Response>;
  findById(req: Request, res: Response): Promise<Response>;
}

export default class TeamController implements ITeamController {
  constructor(private teamService: ITeamService) {}

  async findAll(req: Request, res: Response): Promise<Response> {
    const allTeams = await this.teamService.findAll();

    return res.status(200).json(allTeams.data);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const foundTeam = await this.teamService.findById(id);
    return res.status(200).json(foundTeam.data);
  }
}
