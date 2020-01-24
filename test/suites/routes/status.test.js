'use strict';

const assert = require( 'assert' );
const async = require( 'async' );
const Core = require( 'stringstack' );
const request = require( 'request' );

const core = new Core();

describe( 'status', function () {

  it( 'should return status object', function ( done ) {

    // model this after what is in app.js
    const App = core.createApp( {
      rootComponents: [
        './lib/setup/config',
        './lib/express'
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

        request( 'http://localhost:8000/status', ( err, response, body ) => {

          try {

            assert.ifError( err );
            assert( response, 'response object' );
            assert.strictEqual( response.statusCode, 200, 'HTTP status' );
            assert.deepStrictEqual( JSON.parse( body ), {
              name: packageJson.name,
              version: packageJson.version,
              pid: process.pid
            }, 'HTTP body' );

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