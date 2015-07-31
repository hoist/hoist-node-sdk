'use strict';

module.exports = {
  apiKey: null,
  setApiKey: function(apiKey) {
    this.apiKey = apiKey;
  }
};

require('./bounce')(module.exports);
require('./events')(module.exports);