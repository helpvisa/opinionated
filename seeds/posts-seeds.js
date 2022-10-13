
const { Posts } = require('../models');

const PostData = [
  {
    name: 'Kites post',
    content: 'kitestest',
    user_id:1,

  },
  {
    name: 'Non Kites post',
    content: 'Non kitestest',
    user_id:2,
  },

];

const postSeeds = () => Posts.bulkCreate(PostData);

module.exports =postSeeds;
