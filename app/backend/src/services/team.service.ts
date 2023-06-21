import { ServiceResponse } from '../Interfaces/responses/serviceResponse';
import { TeamEntity } from '../Interfaces/entities/teamEntity';
import { ITeamRepository } from '../repositories/teamRepository';

export interface ITeamService {
  findAll(): Promise<ServiceResponse<TeamEntity[]>>
  findById(id: string): Promise<ServiceResponse<TeamEntity>>
}

export default class TeamService implements ITeamService {
  constructor(private teamRepository: ITeamRepository) {}

  async findAll(): Promise<ServiceResponse<TeamEntity[]>> {
    const allTeams = await this.teamRepository.findAll();

    return { status: 'successful', data: allTeams };
  }

  async findById(id: string): Promise<ServiceResponse<TeamEntity>> {
    const foundTeam = await this.teamRepository.findById(Number(id));

    if (!foundTeam) return { status: 'notFound', data: { message: 'user not found' } };
    return { status: 'successful', data: foundTeam };
  }
}
