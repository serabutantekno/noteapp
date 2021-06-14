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
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    username: DataTypes.STRING,
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
