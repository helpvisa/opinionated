
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");


class Posts extends Model {}


Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull:false
    },
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:"user",
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
    modelName: "posts",
  }
);

module.exports = Posts;
