
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

// bcrypt
const bcrypt = require('bcrypt');


class User extends Model {
  // instance method; check user password asynchronously
  async checkPass(pass) {
    const match = await bcrypt.compare(pass, this.password);
    return match;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [8] // minimum length of 8
      }
    },
  },
  {
    hooks: { // convert input pass to hashed pass before it is stored in database
      async beforeCreate(user) {
        user.password = await bcrypt.hash(user.password, 10);
        return user;
      }
    },
    sequelize,
    timestamps: true,
    createdAt: "created_date",
    updatedAt: "updated_at",
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
