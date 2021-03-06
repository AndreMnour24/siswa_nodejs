'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class siswa extends Model {
    static associate(models) {
    // define association here
    siswa.belongsTo(models.kelas, {foreignKey:"kelas_id"})
    }
  };
  siswa.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nama: {
      type: Sequelize.STRING,
      allowNull: false
    },
    umur: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10
    },
    alamat: {
      type: Sequelize.TEXT,
      unique: true
    },
    profpic: {
      type: Sequelize.TEXT,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    kelas_id:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    created_at: {
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
    modelName: 'siswa',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt:'deleted_at'
  });
  return siswa;
};