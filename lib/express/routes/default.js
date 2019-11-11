'use strict';

class Express {

  constructor( deps ) {

    this._express = deps.inject( '@stringstack/express' );

    this._app = this._express.getApp();

  }

  init( done ) {

    this._app.get( '*', ( req, res ) => {

      res.send( 'Hello, World!' );

    } );

    done();
  }

}

module.exports = Express;