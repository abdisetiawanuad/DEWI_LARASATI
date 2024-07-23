const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("siswa", "guru", "admin"),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const count = await User.count({ where: { role: user.role } });
        const prefix = user.role.toUpperCase().slice(0, 3);
        user.id = `${prefix}${count + 1}`;
      },
    },
  }
);

module.exports = User;
