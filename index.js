'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index');
db.sync()
  .then(() => {

    // Start the web server
    require('./src/server.js').startup(process.env.PORT);
  });