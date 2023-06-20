import { Identifiable } from '..';
import { TeamEntity } from './teamEntity';

export interface MatchEntity extends Identifiable, MatchComponents {
  inProgress: boolean;
  homeTeam?: TeamEntity;
  awayTeam?: TeamEntity;
}

export interface MatchEntitySimple extends Identifiable, MatchComponents {
  inProgress: boolean;
  homeTeam: { teamName: string };
  awayTeam: { teamName: string };
}

export interface MatchComponents extends MatchTeams, MatchScoreboard {}

export interface MatchTeams {
  homeTeamId: number;
  awayTeamId: number;
}

export interface MatchScoreboard {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
