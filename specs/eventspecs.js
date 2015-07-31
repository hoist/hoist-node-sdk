'use strict';
require('./bootstrap');
var should = require('chai').should();
var sinon = require('sinon');
var expect = require('chai').expect;
var Hoist = require('../lib');

describe('event', function () {
  var result = 0;
  before(function(done) {
    
    Hoist.setApiKey("my-api-key");
    
    Hoist.on("PING", function(event) {
      
    });
    Hoist.on("REALTIME", function(event) {

      result = event.payload.total;
      done();

    });

    Hoist.raise("REALTIME", {total: 100});

  });
  it('should return a payload of 100', function() {
    expect(result).to.eql(100);
  });
  after(function(done) {
    Hoist.off("PING");
    Hoist.off("REALTIME");
    done();
  });
});
