import MatchRepository from '../repositories/matchRepository';
import { LeaderBoard, TeamScoreboard } from '../Interfaces/entities/teamScoreboardEntity';
import { MatchEntity } from '../Interfaces/entities/matchEntity';

export interface ILeaderboardService {
  getHomeMatchesBoard(): Promise<LeaderBoard>;
}

export default class LeaderboardService implements ILeaderboardService {
  constructor(private matchRepository: MatchRepository) {}

  async getHomeMatchesBoard(): Promise<LeaderBoard> {
    const finishedMatches = await this.getAllFinishedMatches();
    const homeTeamsArray = finishedMatches.map((match) => match.homeTeamId);

    homeTeamsArray.map((teamId) => LeaderboardService
      .calculateTeamScoreBoard(teamId, finishedMatches));
  }

  private async getAllFinishedMatches(): Promise<MatchEntity[]> {
    return this.matchRepository.getWithFilter({ inProgress: false });
  }

  private static calculateTeamScoreBoard(teamId: number, matches: MatchEntity[]): TeamScoreboard {
    const accStructure = {
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };

    matches.forEach((match) => {
      if (teamId === match.homeTeamId) {
        accStructure.totalPoints += ()
      }
    });
  }
}
