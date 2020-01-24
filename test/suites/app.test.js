'use strict';

const assert = require( 'assert' );
const async = require( 'async' );

// reset log level after we pull in app
const initialLogLevel = process.env.NODE_LOG_LEVEL;
process.env.NODE_LOG_LEVEL = 'emerg';

const App = require( '../../app' );

process.env.NODE_LOG_LEVEL = initialLogLevel;

describe( 'app', function () {

  it( 'should start/stop correctly', function ( done ) {

    let app = null;
    let core = null;

    async.waterfall( [
      ( done ) => {

        // This env name is require to access testComponent method.
        // See: https://www.npmjs.com/package/stringstack#testing
        app = new App( 'test' );

        core = app.testComponent( './lib/core' );

        done();
      },
      ( done ) => {

        try {

          assert.strictEqual( core._initialized, false, 'core initialized' );

        } catch ( e ) {
          return done( e );
        }

        done();

      },
      ( done ) => {
        app.init( done );
      },
      ( done ) => {


        try {

          assert.strictEqual( core._initialized, true, 'core initialized' );

        } catch ( e ) {
          return done( e );
        }

        done();

      },
      ( done ) => {
        app.dinit( done );
      },
      ( done ) => {


        try {

          assert.strictEqual( core._initialized, false, 'core initialized' );

        } catch ( e ) {
          return done( e );
        }

        done();

      }
    ], done );

  } );

} );