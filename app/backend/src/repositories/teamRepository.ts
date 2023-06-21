import { TeamEntity } from '../Interfaces/entities/teamEntity';
import TeamModel from '../database/models/team.model';

export interface ITeamRepository {
  findAll(): Promise<TeamEntity[]>;
  findById(id: number): Promise<TeamEntity | null>;
}

export default class TeamRepository implements ITeamRepository {
  private teamModel = TeamModel;

  async findAll(): Promise<TeamEntity[]> {
    const allTeams = await this.teamModel.findAll();
    return allTeams.map((team) => team.dataValues);
  }

  async findById(id: number): Promise<TeamEntity | null> {
    const foundTeam = await this.teamModel.findByPk(id);

    if (!foundTeam) return null;
    return foundTeam.dataValues;
  }
}
