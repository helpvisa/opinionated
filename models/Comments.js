
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");


class Comments extends Model {}


Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:"user",
            key:"id"
        }
    },
    post_id:{
        type:DataTypes.INTEGER,
        references:{
            model:"posts",
            key:"id"
        }
    },
    likes:{
        type:DataTypes.INTEGER,
    },
    dislike:{
        type:DataTypes.INTEGER
    }
  },
  {
    sequelize,
    timestamps: true,
    createdAt: "created_date",
    updatedAt: "updated_at",
    freezeTableName: true,
    underscored: true,
    modelName: "comments",
  }
);

module.exports = Comments;
