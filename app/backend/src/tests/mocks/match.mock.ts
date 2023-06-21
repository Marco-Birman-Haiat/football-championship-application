import { Model } from "sequelize"

export const matchMock = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 3,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
        "teamName": "São Paulo",
        "id": 1,
      },
  "awayTeam": {
    "teamName": "Grêmio",
    "id": 2,
  },
}

export const allMatchesMock = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 3,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
        "teamName": "São Paulo",
        "id": 1,
      },
    "awayTeam": {
      "teamName": "Grêmio",
      "id": 2,
    },
  },
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
        "teamName": "São Paulo",
        "id": 1,
      },
    "awayTeam": {
      "teamName": "Grêmio",
      "id": 2,
  },
},  
]

export const allMatchesResponse = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 3,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
        "teamName": "São Paulo",
      },
    "awayTeam": {
      "teamName": "Grêmio",
    },
  },
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 3,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
        "teamName": "São Paulo",
      },
    "awayTeam": {
      "teamName": "Grêmio",
    },
  },  
]
