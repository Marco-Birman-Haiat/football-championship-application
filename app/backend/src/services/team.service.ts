import { ITeamModel } from '../Interfaces/entities/teamModel';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import { TeamEntity } from '../Interfaces/entities/teamEntity';

export interface ITeamService {
  findAll(): Promise<ServiceResponse<TeamEntity[]>>
  findById(id: string): Promise<ServiceResponse<TeamEntity>>
}

export default class TeamService implements ITeamService {
  constructor(private teamRepository: ITeamModel) {}

  async findAll(): Promise<ServiceResponse<TeamEntity[]>> {
    const allTeams = await this.teamRepository.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  async findById(id: string): Promise<ServiceResponse<TeamEntity>> {
    const foundTeam = await this.teamRepository.findById(Number(id));

    if (!foundTeam) return { status: 'NOT_FOUND', data: { message: 'user not found' } };
    return { status: 'SUCCESSFUL', data: foundTeam };
  }
}
