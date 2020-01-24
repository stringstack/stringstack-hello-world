'use strict';

const App = require( './app' );
const daemonix = require( 'daemonix' );
const logger = require( './logger' )();

daemonix( {
  app: App,
  log: function ( level, message, meta ) {
    logger( level, 'daemonix', message, meta );
  },
  workers: {
    count: 1,
    restartTimeout: 5000,
    shutdownTimeout: 30000,
    exitOnException: true
  }
} );