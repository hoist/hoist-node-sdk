'use strict';
var bounce = require('./bounce');
var Events = require('./event');

module.exports = {
  setApiKey: function(apiKey) {
    Events.apiKey = apiKey;
  },
  getBounceURL: bounce.getBounceURL,
  on: Events.on,
  off: Events.off,
  raise: Events.raise
};