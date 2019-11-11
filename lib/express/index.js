'use strict';

class Express {

  constructor( deps ) {

    deps.get( './lib/express/routes/default' );

  }

  init( done ) {
    done();
  }

}

module.exports = Express;