'use strict';
var bounce = require('./bounce');
var Events = require('./event');

var hoist = function(apiKey) {

  this.hoistEventServer = new Events(apiKey);

  return {
    getBounceUrl: bounce.getBounceUrl,
    on: this.hoistEventServer.on,
    raise: this.hoistEventServer.raise
  }

};

module.exports = hoist;