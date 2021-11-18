'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, Sequelize) => {
  class guru extends Model {
    
    static associate(models) {
      guru.belongsToMany(models.kelas, {foreignKey:"guru_id",through:"guru_kelas"})
    }
  };
  guru.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nama_guru:{
      allowNull: false,
      type: Sequelize.STRING
    },
    mata_pelajaran: {
      type: Sequelize.STRING,
      allowNull: false
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
    modelName: 'guru',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt:'deleted_at'
  }
  );
  return guru;
};