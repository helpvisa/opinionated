// main server
const express = require('express');
const routes = require('./controllers');
// import sequelize connection
const sequelize = require('./config/connection')

// init express app + port
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});