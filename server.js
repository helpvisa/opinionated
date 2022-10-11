// dependencies
require('dotenv').config(); // import .env for session secret pass
const path = require('path');
const session = require('express-session');
// session secret
const secret = process.env.SECRET;
// main server
const express = require('express');
const routes = require('./controllers');
// import sequelize connection
const sequelize = require('./config/connection')

// setup session
// storage
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// init
const sess = {
  secret: secret,
  cookie: {
    maxAge: 60 * 60 * 1000 // session expires after 1 hour
  },
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// init express app + port
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // setup static public folder
app.use(session(sess)); // use our express session

// routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});