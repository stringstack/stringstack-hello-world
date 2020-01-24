'use strict';

const assert = require( 'assert' );
const async = require( 'async' );
const Core = require( 'stringstack' );
const request = require( 'request' );

const core = new Core();

describe( 'hello world', function () {

  it( 'should return Hello, World!', function ( done ) {

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

        request( 'http://localhost:8000/', ( err, response, body ) => {

          try {

            assert.ifError( err );
            assert( response, 'response object' );
            assert.strictEqual( response.statusCode, 200, 'HTTP status' );
            assert.strictEqual( body, 'Hello, World!', 'HTTP body' );

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