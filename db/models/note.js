'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.belongsTo(models.User, { foreignKey: 'id_user', as: 'owner' })
    }
  };
  Note.init({
    id_notes: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('idea', 'info', 'credential', 'reminder', 'plan', 'journal')
    },
    secret: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Note',
    tableName: 'Notes',
    underscored: true,
    paranoid: true
  });
  return Note;
};
