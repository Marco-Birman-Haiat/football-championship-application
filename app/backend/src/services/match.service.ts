import { IMatchRepository } from '../repositories/matchRepository';
import { MatchEntity, MatchEntitySimple } from '../Interfaces/entities/matchEntity';
import { ServiceResponse } from '../Interfaces/responses/serviceResponse';

export interface IMatchService {
  getAll(): Promise<ServiceResponse<MatchEntitySimple[]>>;
  getByInProgress(inProgress: boolean): Promise<ServiceResponse<MatchEntity[]>>;
  finishMatch(id: string): Promise<ServiceResponse<{ message: string }>>;
}

export default class MatchService implements IMatchService {
  constructor(private matchRepository: IMatchRepository) {}

  async getAll(): Promise<ServiceResponse<MatchEntitySimple[]>> {
    const allMatches = await this.matchRepository.getAll();

    const allMatchesAdjusted = allMatches.map((match) => MatchService.adjustMatchTeams(match));
    return { status: 'ok', data: allMatchesAdjusted };
  }

  async getByInProgress(inProgress: boolean): Promise<ServiceResponse<MatchEntity[]>> {
    const filterAttribute = { inProgress };
    const filteredMatches = await this.matchRepository.getWithFilter(filterAttribute);

    return { status: 'ok', data: filteredMatches };
  }

  async finishMatch(id: string): Promise<ServiceResponse<{ message: string }>> {
    const matchToFinish = await this.matchRepository.getById(Number(id));
    const filterObject = { id: Number(id) };

    if (!matchToFinish) {
      return { status: 'notFound', data: { message: 'match not found' } };
    }
    this.matchRepository.update({ ...matchToFinish, inProgress: false }, filterObject);

    return { status: 'ok', data: { message: 'Finished' } };
  }

  private static adjustMatchTeams(match: MatchEntity): MatchEntitySimple {
    return {
      ...match,
      homeTeam: { teamName: match.homeTeam?.teamName || 'team' },
      awayTeam: { teamName: match.awayTeam?.teamName || 'team' },
    };
  }
}
