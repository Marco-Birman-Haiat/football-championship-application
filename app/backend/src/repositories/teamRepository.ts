import { TeamEntity } from '../Interfaces/entities/teamEntity';
import TeamModel from '../database/models/team.model';
import { ITeamModel } from '../Interfaces/entities/teamModel';

export default class TeamRepository implements ITeamModel {
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
