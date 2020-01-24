'use strict';

const winston = require( 'winston' );

// A mix of standard syslog and levels, but you can use any you like. See https://www.npmjs.com/package/winston#logging-levels
// Just remember that 3rd party components will expect certain levels to be present, and they typically use syslog
const levels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  verbose: 7,
  debug: 8,
  silly: 9
};

module.exports = function () {

  const logLevel = process.env.NODE_LOG_LEVEL || 'info';

  if ( !Object.hasOwnProperty.call( levels, logLevel ) ) {
    throw new Error( 'NODE_LOG_LEVEL not not one of the valid levels in logger.js' );
  }

  const logger = winston.createLogger( {
    levels: levels,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf( info => {
        return `${ info.timestamp }: ${ info.level }: ${ info.message }`;
      } )
    ),
    transports: [
      new winston.transports.Console( {
        timestamp: true,
        colorize: true,
        level: logLevel // default to info, unless environment overrides
      } )
    ]
  } );

  return function ( level, path, message, meta ) {

    // Syslog and NPM both have a warning log level, but one is short and one is long, map to the one we use
    if ( level === 'warn' ) {
      level = 'warning';
    }

    // map StringStack log event (level, path, message, meta) to our transport of choice: Winston (level, message)
    message = `[${ process.pid }] ${ path }: ${ message }`;

    if ( meta instanceof Error ) {
      meta = `: ${ message.message }: ${ message.stack }`;
    } else if ( typeof meta === 'string' ) {
      meta = `: ${ meta }`;
    } else if ( meta ) {
      meta = `: ${ JSON.stringify( meta ) }`;
    } else {
      meta = '';
    }

    logger.log( level, message + meta );

  };

};
