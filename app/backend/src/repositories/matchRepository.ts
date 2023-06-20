import TeamModel from '../database/models/team.model';
import MatchModel from '../database/models/match.model';
import { MatchEntity } from '../Interfaces/entities/matchEntity';
import { NewEntity } from '../Interfaces';

export interface IMatchRepository {
  getAll(): Promise<MatchEntity[]>;
  create(match: NewEntity<MatchEntity>): Promise<MatchEntity>;
  getWithFilter(filterParams: Partial<MatchEntity>): Promise<MatchEntity[]>;
  getById(id: number): Promise<MatchEntity | null>;
  update(
    matchData: Partial<MatchEntity>,
    filterOptions: Partial<MatchEntity>
  ): Promise<void>;
}

export default class MatchRepository implements IMatchRepository {
  private matchModel = MatchModel;

  async getAll(): Promise<MatchEntity[]> {
    const allMatches = await this.matchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam' },
        { model: TeamModel, as: 'awayTeam' },
      ],
    });

    return allMatches.map((match) => match.dataValues);
  }

  async getById(id: number): Promise<MatchEntity | null> {
    const foundMatch = await this.matchModel.findByPk(id, {
      include: [
        { model: TeamModel, as: 'homeTeam' },
        { model: TeamModel, as: 'awayTeam' },
      ],
    });

    if (!foundMatch) return null;
    return foundMatch.dataValues;
  }

  async getWithFilter(filterParams: Partial<MatchEntity>): Promise<MatchEntity[]> {
    const filteredMatches = await this.matchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam' },
        { model: TeamModel, as: 'awayTeam' },
      ],
      where: filterParams,
    });

    return filteredMatches.map((match) => match.dataValues);
  }

  async create(match: NewEntity<MatchEntity>): Promise<MatchEntity> {
    const newMatch = await this.matchModel.create(match);

    return newMatch.dataValues;
  }

  async update(matchData: Partial<MatchEntity>, filterOptions: Partial<MatchEntity>)
    : Promise<void> {
    await this.matchModel.update(matchData, { where: filterOptions });
  }
}
