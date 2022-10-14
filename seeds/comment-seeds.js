
const {Comments } = require('../models');

const CommentData = [
  {
    content: 'kitestest comment',
    user_id:1,
    post_id:1,

  },
  {
    content: 'kitestest comment',
    user_id:2,
    post_id:2,
  },

];

const commentSeeds = () => Comments.bulkCreate(CommentData);

module.exports =commentSeeds;
