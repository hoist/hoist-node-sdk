'use strict';
var request = require('request-promise');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var timer;

module.exports = {
  
  token: null,
  apiKey: null,
  server: new EventEmitter(),

  on: function(event, method) {

    if(!this.apiKey) {
      throw new Error('Call hoist.setApiKey before looking for events');
    }
    if(!timer) {
      this._loop();
    }
    this.server.on(event, method);
    return this;

  },
  _loop: function() {

    var self = this;
    this._getEvents().then(function(events) {
      _.each(events, function(event) {
        self.server.emit(event.eventName, event);
      });
      self._loop();
    });

  },
  _getEvents: function() {

    var self = this;
    var options = {
      url: "https://api.hoi.io/events" + (this.token ? "?token=" + this.token : ""),
      "headers" : {
        "Authorization" : "Hoist " + this.apiKey
      },
      json: true
    };
    return request(options).then(function(resp) {
      self.token = resp.token;
      return resp.events;
    }).catch(function(err) {
      console.log(err);
    });

  },
  raise: function(event, payload, cb) {

    if(!this.apiKey) {
      throw new Error('Call hoist.setApiKey before looking for events');
    }
    var self = this;
    var options = {
      url: "https://api.hoi.io/event/" + event,
      "headers" : {
        "Authorization" : "Hoist " + this.apiKey
      },
      json: payload
    };
    return request.post(options).then(function(resp) {
      if(cb) {
        cb(resp);
        return self;
      }
      return resp;
    }).catch(function(err) {
      console.log("Error", err);
    });

  }

};