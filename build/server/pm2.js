"use strict";

var pm2 = require('pm2');

var options = require('./pm2.config');

console.log("Starting server with ".concat(options.instances, " instances."));
pm2.connect(function (err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  pm2.start(options, function (err) {
    if (err) return console.error('Error while launching applications', err.stack || err);
    console.log('PM2 and application has been successfully started'); // Display logs in standard output

    pm2.launchBus(function (err, bus) {
      console.log('[PM2] Log streaming started');
      bus.on('log:out', function (packet) {
        console.log('[App:%s] %s', packet.process.name, packet.data);
      });
      bus.on('log:err', function (packet) {
        console.error('[App:%s][Err] %s', packet.process.name, packet.data);
      });
    });
  });
});