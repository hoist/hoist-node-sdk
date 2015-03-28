'use strict';
require('./bootstrap');
var should = require('chai').should();
var sinon = require('sinon');
var expect = require('chai').expect;
var Hoist = require('../lib');

describe('bouncer tests', function () {

  describe('generateBounceUrl', function() {
    var hoist;
    var url;
    before(function(done) {
      hoist = new Hoist();
      hoist.getBounceUrl({
        organisation: 'showen8635',
        application: 'dev',
        connector: 'mykey',
        bucketKey: 'bucketKey',
        returnUrl: 'https://hoist.io/return'        
      }).then(function(redirect) {
        url = redirect.substr(0, 32);
        done();
      });
    });
    it('should return a url', function() {
      expect(url).to.eql("https://bouncer.hoist.io/bounce/");
    });  
  });
  
});
