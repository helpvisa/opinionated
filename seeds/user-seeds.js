const { User } = require('../models');

const UserData = [
  {
    user_name: 'Kite',
    password: 'test',

  },
  {
    user_name: 'NoneKit',
    password: 'test',
  },

];

const userSeeds = () => User.bulkCreate(UserData);

module.exports = userSeeds;
