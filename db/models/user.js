'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    id_user: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    photo: DataTypes.STRING,
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    confirmed_at: DataTypes.DATE,
    role: DataTypes.ENUM('admin', 'user')
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true,
    paranoid: true
  });
  return User;
};
