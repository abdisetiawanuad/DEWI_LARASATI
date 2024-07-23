const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Nilai = sequelize.define("Nilai", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  siswaId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guruId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nilai: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Nilai;
