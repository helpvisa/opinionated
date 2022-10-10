// connect our models and export

const User =require('./User');
const Posts = require('./Posts');
const Comments =require('./Comments');

Posts.belongsTo(User,{
    foreignKey:'user_id'
})

module.exports ={
    User,
    Posts,
    Comments
}