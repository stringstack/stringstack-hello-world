'use strict';

class Express {

  constructor( deps ) {

    // this import ensures this component initializes before express opens a network port to accept traffic with
    // inject() instead of get()
    this._express = deps.inject( '@stringstack/express' );

    // Load these dependencies and initialize them before this Express class initializes.
    deps.get( './lib/express/routes/helloworld' );
    deps.get( './lib/express/routes/status' );

  }

  init( done ) {

    const app = this._express.getApp();

    // This catch all handler is defined here, after all other routes have been initialized.
    // We do this to ensure this is the last handler added to express, and thus guarantee it is a catch all.
    app.use( ( req, res ) => {

      res
        .status( 404 )
        .send( 'not found' );

    } );

    done();
  }

}

module.exports = Express;