// src/migrations/[timestamp]-create-employee.js

import { Model, QueryInterface, DataTypes } from 'sequelize';
import { TeamEntity } from '../../Interfaces/entities/teamEntity';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<TeamEntity>>('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teamName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'team_name',
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};
