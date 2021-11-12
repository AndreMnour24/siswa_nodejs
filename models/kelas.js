'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  kelas.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nama: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    guru: {
      type: Sequelize.STRING,
      allowNull: false
    },
    size: {
      type: Sequelize.INTEGER
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    },
    deleted_at: {
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'kelas',
  });
  return kelas;
};