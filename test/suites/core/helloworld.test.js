'use strict';

const assert = require( 'assert' );
const async = require( 'async' );
const Core = require( 'stringstack' );

const core = new Core();

describe( 'hello world', function () {

  it( 'should return Hello, World!', function ( done ) {

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

        const core = app.testComponent( './lib/core' );

        core.helloWorld( ( err, data ) => {

          try {

            assert.ifError( err );
            assert.strictEqual( data, 'Hello, World!', 'data' );

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