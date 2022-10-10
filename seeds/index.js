const sequelize = require('../config/connection');
 const userSeeds= require('./user-seeds');
 const postSeeds =require('./posts-seeds');
 const commentSeeds =require('./comment-seeds');

 const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await userSeeds();
    console.log('\n----- User SEEDED -----\n');
  
    await postSeeds();
    console.log('\n----- Posts SEEDED -----\n');
  
    await commentSeeds();
    console.log('\n----- Comment SEEDED -----\n');
  

  
    process.exit(0);
  };

  seedAll();