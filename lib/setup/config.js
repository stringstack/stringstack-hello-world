'use strict';

const path = require( 'path' );

class SetupConfig {

  constructor( deps ) {

    // ensure this file initializes before any other thing that depends on config
    this._config = deps.inject( 'config' );

    this._logger = deps.get( 'logger' );

  }

  init( done ) {

    const configFile = process.cwd() + path.sep + 'config.json';

    this._logger( 'info', `using config file ${ configFile }` );

    // technically this is a synchronous load, but you could pull config from a service, or any other async location
    this._config
      .argv()
      .env()
      .file( { file: configFile } );

    done();
  }

}

module.exports = SetupConfig;