import MatchRepository from '../repositories/matchRepository';
import { LeaderBoard, TeamScoreboard } from '../Interfaces/entities/teamScoreboardEntity';
import { MatchEntity } from '../Interfaces/entities/matchEntity';

export interface ILeaderboardService {
  getHomeMatchesBoard(): Promise<LeaderBoard>;
  getAwayMatchesBoard(): Promise<LeaderBoard>;
  getAllMatchesBoard(): Promise<LeaderBoard>;
}

export default class LeaderboardService implements ILeaderboardService {
  private leaderBoard: LeaderBoard;

  constructor(private matchRepository: MatchRepository) {
    this.leaderBoard = [];
  }

  async getHomeMatchesBoard(): Promise<LeaderBoard> {
    const finishedMatches = await this.getAllFinishedMatches();

    finishedMatches.forEach((match) => this.feedSideLeaderBoard(match, 'home'));

    this.sortLeaderBoard();
    const result = [...this.leaderBoard];
    this.leaderBoard = [];
    return result;
  }

  async getAwayMatchesBoard(): Promise<LeaderBoard> {
    const finishedMatches = await this.getAllFinishedMatches();

    finishedMatches.forEach((match) => this.feedSideLeaderBoard(match, 'away'));

    this.sortLeaderBoard();
    const result = [...this.leaderBoard];
    this.leaderBoard = [];
    return result;
  }

  async getAllMatchesBoard(): Promise<LeaderBoard> {
    const finishedMatches = await this.getAllFinishedMatches();

    finishedMatches.forEach((match) => {
      this.feedSideLeaderBoard(match, 'home');
      this.feedSideLeaderBoard(match, 'away');
    });

    this.sortLeaderBoard();
    const result = [...this.leaderBoard];
    this.leaderBoard = [];
    return result;
  }

  private feedSideLeaderBoard(match: MatchEntity, type: string): void {
    const homeTeamScoreObject = LeaderboardService.createHomeTeamScoreObject(match);
    const awayTeamScoreObject = LeaderboardService.createAwayTeamScoreObject(match);
    const teamToUse = type === 'home' ? homeTeamScoreObject : awayTeamScoreObject;

    const sideTeamExists = this.isTeamInLeaderBoard(teamToUse.name);

    if (!sideTeamExists) {
      const teamFinalScore = {
        ...teamToUse,
        efficiency: (teamToUse.totalPoints / (1 * 3)) * 100,
      };
      this.leaderBoard.push(teamFinalScore);
    } else {
      this.addMatchToLeaderBoard(teamToUse);
    }
  }

  private addMatchToLeaderBoard(scoreToAdd: TeamScoreboard):
  void {
    const team = this.isTeamInLeaderBoard(scoreToAdd.name) as TeamScoreboard;

    const newScoreObject = {
      ...scoreToAdd,
      totalPoints: scoreToAdd.totalPoints + team.totalPoints,
      totalVictories: scoreToAdd.totalVictories + team.totalVictories,
      totalDraws: scoreToAdd.totalDraws + team.totalDraws,
      goalsFavor: scoreToAdd.goalsFavor + team.goalsFavor,
      goalsOwn: scoreToAdd.goalsOwn + team.goalsOwn,
      goalsBalance: scoreToAdd.goalsBalance + team.goalsBalance,
      totalGames: scoreToAdd.totalGames + team.totalGames,
      totalLosses: scoreToAdd.totalLosses + team.totalLosses,
      efficiency: ((team.totalPoints + scoreToAdd.totalPoints) / ((team.totalGames + 1) * 3)) * 100,
    };

    this.leaderBoard = this.leaderBoard
      .map((currentTeam) => (currentTeam.name === scoreToAdd.name ? newScoreObject : currentTeam));
  }

  private static createAwayTeamScoreObject(match: MatchEntity): TeamScoreboard {
    const { homeTeamGoals, awayTeamGoals, awayTeam } = match;
    const points = LeaderboardService.getPoints(match, 'away');

    return {
      name: awayTeam?.teamName || 'time',
      totalPoints: points,
      totalVictories: awayTeamGoals > homeTeamGoals ? 1 : 0,
      totalDraws: awayTeamGoals === homeTeamGoals ? 1 : 0,
      goalsFavor: awayTeamGoals,
      goalsOwn: homeTeamGoals,
      goalsBalance: awayTeamGoals - homeTeamGoals,
      totalGames: 1,
      totalLosses: awayTeamGoals < homeTeamGoals ? 1 : 0,
      efficiency: 0,
    };
  }

  private static createHomeTeamScoreObject(match: MatchEntity): TeamScoreboard {
    const { homeTeamGoals, awayTeamGoals, homeTeam } = match;

    const points = LeaderboardService.getPoints(match, 'home');

    return {
      name: homeTeam?.teamName || 'time',
      totalPoints: points,
      totalVictories: homeTeamGoals > awayTeamGoals ? 1 : 0,
      totalDraws: homeTeamGoals === awayTeamGoals ? 1 : 0,
      goalsFavor: homeTeamGoals,
      goalsOwn: awayTeamGoals,
      goalsBalance: homeTeamGoals - awayTeamGoals,
      totalGames: 1,
      totalLosses: awayTeamGoals > homeTeamGoals ? 1 : 0,
      efficiency: 0,
    };
  }

  private isTeamInLeaderBoard(teamName: string): TeamScoreboard | boolean {
    const foundTeam = this.leaderBoard.filter((team) => team.name === teamName);

    if (foundTeam.length) return foundTeam[0];
    return false;
  }

  private async getAllFinishedMatches(): Promise<MatchEntity[]> {
    return this.matchRepository.getWithFilter({ inProgress: false });
  }

  private static getPoints(match: MatchEntity, type: string): number {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      return 1;
    }

    if (type === 'home' && match.homeTeamGoals > match.awayTeamGoals) {
      return 3;
    }

    if (type === 'away' && match.homeTeamGoals < match.awayTeamGoals) {
      return 3;
    }
    return 0;
  }

  private sortLeaderBoard(): void {
    this.leaderBoard.sort((a, b) => {
      const pointsDraw = a.totalPoints === b.totalPoints;
      const goalsBalanceDraw = a.goalsBalance === b.goalsBalance;
      if (pointsDraw && goalsBalanceDraw) {
        return b.goalsFavor - a.goalsFavor;
      }
      if (pointsDraw) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.totalPoints - a.totalPoints;
    });
  }
}
