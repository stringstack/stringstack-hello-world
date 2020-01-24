'use strict';

class Core {

  constructor( deps ) {

    this._package = deps.get( './package.json' );
    this._logger = deps.get( 'logger' );

    this._initialized = false;

  }

  init( done ) {
    this._initialized = true;
    done();
  }

  dinit( done ) {
    this._initialized = false;
    done();
  }

  helloWorld( done ) {

    if ( !this._initialized ) {
      return done( new Error( 'not yet initialized' ) );
    }

    done( null, 'Hello, World!' );


  }

  status( done ) {

    if ( !this._package ) {
      return done( new Error( 'could not load package' ) );
    }

    done( null, {
      name: this._package.name,
      version: this._package.version,
      pid: process.pid
    } );

  }

}

module.exports = Core;