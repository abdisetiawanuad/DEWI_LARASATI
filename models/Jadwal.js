const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Jadwal = sequelize.define("Jadwal", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mataPelajaran: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  waktu: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Jadwal;
