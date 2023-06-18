import { Identifiable } from '..';
import { TeamEntity } from './teamEntity';

export interface MatchEntity extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: TeamEntity;
  awayTeam?: TeamEntity;
}

export interface MatchEntitySimple extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: { teamName: string };
  awayTeam: { teamName: string };
}
