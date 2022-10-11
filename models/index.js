// connect our models and export

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const {Like, Dislike} = require('./LikeDislike');

// associations
// user <--> post (one to many)
User.hasMany(Post, {
    foreignKey: 'user_id'
});
Post.belongsTo(User, {
    foreignKey:'user_id'
});

// comment <--> post
Comment.belongsTo(Post, {
    onDelete: 'cascade',
    foreignKey:'post_id'
});
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// comment <--> user
Comment.belongsTo(User, {
    onDelete: 'cascade',
    foreignKey:'user_id'
});
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// users to posts / comments through likes / dislikes
User.belongsToMany(Post, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'user_id'
});
User.belongsToMany(Comment, {
    through: Like,
    as: 'liked_comments',
    foreignKey: 'user_id'
});
User.belongsToMany(Post, {
    through: Dislike,
    as: 'disliked_posts',
    foreignKey: 'user_id'
});
User.belongsToMany(Comment, {
    through: Dislike,
    as: 'disliked_comments',
    foreignKey: 'user_id'
});
//--------------------------
Post.belongsToMany(User, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'post_id'
});
Comment.belongsToMany(User, {
    through: Like,
    as: 'liked_comments',
    foreignKey: 'comment_id'
});
Post.belongsToMany(User, {
    through: Dislike,
    as: 'disliked_posts',
    foreignKey: 'post_id'
});
Comment.belongsToMany(User, {
    through: Dislike,
    as: 'disliked_comments',
    foreignKey: 'comment_id'
});

// likes + dislikes as they belong to posts / comments / users
Like.belongsTo(User, {
    onDelete: 'SET NULL',
    foreignKey: 'user_id'
});
Like.belongsTo(Post, {
    onDelete: 'SET NULL',
    foreignKey: 'post_id'
});
Like.belongsTo(Comment, {
    onDelete: 'SET NULL',
    foreignKey: 'comment_id'
});
//--------------------------
Dislike.belongsTo(User, {
    onDelete: 'SET NULL',
    foreignKey: 'user_id'
});
Dislike.belongsTo(Post, {
    onDelete: 'SET NULL',
    foreignKey: 'post_id'
});
Dislike.belongsTo(Comment, {
    onDelete: 'SET NULL',
    foreignKey: 'comment_id'
});
//--------------------------
User.hasMany(Like, {
    foreignKey: 'user_id'
});
Post.hasMany(Like, {
    foreignKey: 'post_id'
});
Comment.hasMany(Like, {
    foreignKey: 'comment_id'
});
//--------------------------
User.hasMany(Dislike, {
    foreignKey: 'user_id'
});
Post.hasMany(Dislike, {
    foreignKey: 'post_id'
});
Comment.hasMany(Dislike, {
    foreignKey: 'comment_id'
});

// export
module.exports = {
    User,
    Post,
    Comment,
    Like,
    Dislike
};