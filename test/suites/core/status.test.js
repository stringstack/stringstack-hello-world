'use strict';

const assert = require( 'assert' );
const async = require( 'async' );
const Core = require( 'stringstack' );

const core = new Core();

describe( 'status', function () {

  it( 'should return status', function ( done ) {

    // model this after what is in app.js
    const App = core.createApp( {
      rootComponents: [
        './lib/core'
      ]
    } );

    let app = null;

    async.waterfall( [
      ( done ) => {
        app = new App( 'test' );
        done();
      },
      ( done ) => {
        app.init( done );
      },
      ( done ) => {

        const packageJson = app.testComponent( './package.json' );
        const core = app.testComponent( './lib/core' );

        core.status( ( err, status ) => {

          try {

            assert.ifError( err );
            assert.deepStrictEqual( status, {
              name: packageJson.name,
              version: packageJson.version,
              pid: process.pid
            }, 'status object' );

          } catch ( e ) {
            return done( e );
          }

          done();

        } );

      },
      ( done ) => {
        app.dinit( done );
      }
    ], done );


  } );

} );