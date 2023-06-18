import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import MatchModel from './match.model';
// import OtherModel from './OtherModel';

class TeamModel extends Model<InferAttributes<TeamModel>,
InferCreationAttributes<TeamModel>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

TeamModel.hasMany(MatchModel, { as: 'homeMatches', foreignKey: 'homeTeamId' });
TeamModel.hasMany(MatchModel, { as: 'awayMatches', foreignKey: 'awayTeamId' });

MatchModel.belongsTo(TeamModel, { as: 'homeTeam', foreignKey: 'homeTeamId' });
MatchModel.belongsTo(TeamModel, { as: 'awayTeam', foreignKey: 'awayTeamId' });

export default TeamModel;
