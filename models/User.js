
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");


class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    posts:{
        type:DataTypes.INTEGER,
        references:{
            model:"posts",
            key:"id"
        }
    },
    comments:{
        type:DataTypes.INTEGER,
        references:{
            model:"comments",
            key:"id"
        }
    }
  },
  {
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
