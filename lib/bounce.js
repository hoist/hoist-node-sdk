'use strict';
var request = require('request-promise');

module.exports = {

  getBounceUrl: function(options) {

    var url = "https://bouncer.hoist.io/initiate/" + options.organisation + 
      "/" + options.application + "/" + options.connector + "?bucketKey=" + options.bucketKey;

    if(options.returnUrl) {
      url += "&returnUrl=" + options.returnUrl;
    }

    //The request module throws an error for a redirect
    return request({
      uri: url,
      followRedirect: false
    }).catch(function(err) {
      return err.response.headers.location;
    }).then(function(url) {
      return url;
    });

  }

};