'use strict';
var request = require('request-promise');
var url = require('url');
var Bluebird = require('bluebird');
var errors = require('./errors');

module.exports = function(main) {

  main.getBounceURL = function(options, cb) {

    return Bluebird.resolve()
       .then(function() {
      
          if(!main.apiKey) {
            throw new Error(errors.messages.noApiKey);
          }
          
          if(!options || !options.connector) {
            throw new Error(errors.messages.noConnectorKey);
          }

          //Build the URL
          var urlOptions = {
            protocol: "https",
            host: "bouncer.hoist.io",
            pathname: "/initiate/" + main.apiKey + "/" + options.connector,
            query: {}
          };

          if(options.bucketKey) {
            urlOptions.query.bucketKey = options.bucketKey;
          }

          if(options.returnUrl) {
            urlOptions.query.returnUrl = options.returnUrl;
          }

          return request({
            uri: url.format(urlOptions),
            followRedirect: false
          }).catch(function(err) {
            return err.response.headers.location;
          }).then(function(url) {
            return url;
          });
      
      }).nodeify(cb);

  };

};