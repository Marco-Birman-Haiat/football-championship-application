import { IMatchRepository } from '../repositories/matchRepository';
import { MatchComponents, MatchEntity, MatchEntitySimple,
  MatchScoreboard } from '../Interfaces/entities/matchEntity';
import { ServiceResponse } from '../Interfaces/responses/serviceResponse';

export interface IMatchService {
  getAll(): Promise<ServiceResponse<MatchEntitySimple[]>>;
  getByInProgress(inProgress: boolean): Promise<ServiceResponse<MatchEntitySimple[]>>;
  create(match: MatchComponents): Promise<ServiceResponse<MatchEntity>>;
  finishMatch(id: string): Promise<ServiceResponse<{ message: string }>>;
  updateScoreboard(scoreBoard: MatchScoreboard,
    id: string): Promise<ServiceResponse<{ message: string }>>;
}

export default class MatchService implements IMatchService {
  constructor(private matchRepository: IMatchRepository) {}

  async getAll(): Promise<ServiceResponse<MatchEntitySimple[]>> {
    const allMatches = await this.matchRepository.getAll();

    const allMatchesAdjusted = allMatches.map((match) => MatchService.adjustMatchTeams(match));
    return { status: 'ok', data: allMatchesAdjusted };
  }

  async getByInProgress(inProgress: boolean): Promise<ServiceResponse<MatchEntitySimple[]>> {
    const filterAttribute = { inProgress };
    const filteredMatches = await this.matchRepository.getWithFilter(filterAttribute);

    const filteredMatchesAdjusted = filteredMatches
      .map((match) => MatchService.adjustMatchTeams(match));
    return { status: 'ok', data: filteredMatchesAdjusted };
  }

  async create(match: MatchComponents): Promise<ServiceResponse<MatchEntity>> {
    if (match.awayTeamId === match.homeTeamId) {
      return {
        status: 'uprocessableData',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const matchToCreate = {
      ...match,
      inProgress: true,
    };

    try {
      const createdMatch = await this.matchRepository.create(matchToCreate);
      return { status: 'ok', data: createdMatch };
    } catch (error) {
      return { status: 'notFound', data: { message: 'There is no team with such id!' } };
    }
  }

  async updateScoreboard(scoreBoard: MatchScoreboard, id: string):
  Promise<ServiceResponse<{ message: string }>> {
    const filterObject = { id: Number(id) };
    await this.matchRepository.update(scoreBoard, filterObject);

    return { status: 'ok', data: { message: 'Scoreboard updated' } };
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
