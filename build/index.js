"use strict";

var server = require('./server/server');

server.start()["catch"](function (err) {
  console.error('Error while trying to launch the server', err.stack);
  process.exit(1);
});