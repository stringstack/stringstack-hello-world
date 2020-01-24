'use strict';

class HelloWorldRoute {

  constructor( deps ) {

    this._express = deps.inject( '@stringstack/express' );
    this._core = deps.get( './lib/core' );

  }

  init( done ) {

    const app = this._express.getApp();

    app.get( '/', ( req, res ) => {

      this._core.helloWorld( ( err, data ) => {

        if ( err ) {

          res
            .status( 500 )
            .send( data );

          return;
        }

        res
          .send( data );

      } );

    } );

    done();
  }

}

module.exports = HelloWorldRoute;