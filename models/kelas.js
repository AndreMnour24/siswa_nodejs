'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class kelas extends Model {
    static associate(models) {
      // define association here
      kelas.hasMany(models.siswa, {foreignKey:"kelas_id"})
      kelas.belongsToMany(models.guru, {foreignKey:"kelas_id",through:"guru_kelas"})
    }
  };
  kelas.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    namaKelas: {
      type: Sequelize.STRING,
      allowNull: false
    },
    guru: {
      type: Sequelize.STRING,
      allowNull: false
    },
    mataPelajaran: {
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
      modelName: 'kelas',
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt:'deleted_at'
    });
  return kelas;
};