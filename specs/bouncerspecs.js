'use strict';
require('./bootstrap');
var should = require('chai').should();
var sinon = require('sinon');
var expect = require('chai').expect;
var Hoist = require('../lib');
var nock = require('nock');
var errors = require('../lib/errors');

describe('bouncer tests', function () {

  describe('generate Bounce URL with no apiKey', function() {
    it('should throw an error', function() {
      return expect(Hoist.getBounceURL()).to
        .eventually.be.rejectedWith(errors.messages.noApiKey);
    });  
  });
  describe('generate Bounce URL with apiKey set and no connector key', function() {
    before(function(done) {
      Hoist.setApiKey("my-api-key");
      done();
    });
    it('should throw an error', function() {
      return expect(Hoist.getBounceURL()).to
        .eventually.be.rejectedWith(errors.messages.noConnectorKey);
    });  
  });
  describe('generate Bounce URL', function() {
    describe('with promise', function() {
      var url;
      before(function(done) {
        nock('https://bouncer.hoist.io')
          .get('/initiate/my-api-key/mykey')
          .query({bucketKey: 'bucketKey', returnUrl: 'https://hoist.io/return'})
          .reply(403, 'Body', {'location': 'https://bouncer.hoist.io/bounce/'});
        Hoist.getBounceURL({
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
      after(function(done) {
        nock.cleanAll();
        done();
      });
    });
    describe('with callback', function() {
      var url;
      before(function(done) {
        nock('https://bouncer.hoist.io')
          .get('/initiate/my-api-key/mykey')
          .query({bucketKey: 'bucketKey', returnUrl: 'https://hoist.io/return'})
          .reply(403, 'Body', {'location': 'https://bouncer.hoist.io/bounce/'});
        Hoist.getBounceURL({
          connector: 'mykey',
          bucketKey: 'bucketKey',
          returnUrl: 'https://hoist.io/return'        
        }, function(error, redirect) {
          url = redirect.substr(0, 32);
          done();
        });
      });
      it('should return a url', function() {
        expect(url).to.eql("https://bouncer.hoist.io/bounce/");
      });  
      after(function(done) {
        nock.cleanAll();
        done();
      });
    });
  });

  
});
