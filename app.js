'use strict';

const Core = require( 'stringstack' );
const logger = require( './logger' )();

let core = new Core();

const App = core.createApp( {
  log: logger,
  rootComponents: [
    './lib/setup/config',
    './lib/express'
  ]
} );

module.exports = App;