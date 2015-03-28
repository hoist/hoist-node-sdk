'use strict';
require('./bootstrap');
var should = require('chai').should();
var sinon = require('sinon');
var expect = require('chai').expect;
var Hoist = require('../lib');

describe('event', function () {
  it('should return true', function() {
    expect(100).to.eql(100);
  });
});
