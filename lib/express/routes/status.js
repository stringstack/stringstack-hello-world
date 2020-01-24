'use strict';

class StatusRoute {

  constructor( deps ) {

    this._express = deps.inject( '@stringstack/express' );
    this._core = deps.get( './lib/core' );

  }

  init( done ) {

    const app = this._express.getApp();

    app.get( '/status', ( req, res ) => {

      this._core.status( ( err, status ) => { // we do not pass req or res into the business logic

        // we map the response data back to HTTP response
        if ( err ) {

          res
            .status( 500 )
            .send( status );

          return;
        }

        res
          .send( status );

      } );

    } );

    done();
  }

}

module.exports = StatusRoute;