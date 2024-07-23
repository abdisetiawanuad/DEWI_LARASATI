const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Kehadiran = sequelize.define("Kehadiran", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  siswaId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("hadir", "tidak hadir"),
    allowNull: false,
  },
});

module.exports = Kehadiran;
