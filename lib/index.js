'use strict';
var bounce = require('./bounce');
var Events = require('./event');

module.exports = {
  setApiKey: function(apiKey) {
    Events.apiKey = apiKey;
  },
  getBounceUrl: bounce.getBounceUrl,
  on: Events.on,
  raise: Events.raise
};