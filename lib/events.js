'use strict';
var request = require('request-promise');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var errors = require('./errors');


module.exports = function(main) {

  main.events = {
    token: null,
    server: new EventEmitter(),
    watching: false,
    _request: null,
    _loop: function() {

      console.log("poll");
      var self = this;
      this._getEvents().then(function(events) {
        if(self.watching) {
          _.each(events, function(event) {
              self._processEvent(event);
          });
          self._loop();
        }
      });

    },
    _processEvent: function(event) {
      if(event.payload) {
        return this._getEventPayload(event.payload)
          .bind(this)
          .then(function(payload) {
            event.payload = payload;
            return this.server.emit(event.eventName, event);
          });
      } else {
        return this.server.emit(event.eventName, event);
      }
    },
    _getEventPayload: function(payloadId) {
      var options = {
        url: "https://api.hoi.io/event/payload/" + payloadId,
        "headers" : {
          "Authorization" : "Hoist " + main.apiKey
        },
        json: true
      };
      this._request = request(options).then(function(resp) {
        return resp;
      });
      return this._request;
    },
    _getEvents: function() {

      var self = this;
      var options = {
        url: "https://api.hoi.io/events" + (this.token ? "?token=" + this.token : ""),
        "headers" : {
          "Authorization" : "Hoist " + main.apiKey
        },
        json: true
      };
      return request(options).then(function(resp) {
        self.token = resp.token;
        return resp.events;
      }).catch(function(err) {
        console.log(err);
      });

    }
  };

  main.on = function(event, method) {

    if(!main.apiKey) {
      throw new Error(errors.messages.noApiKey);
    }
    if(!main.events.watching) {
      main.events.watching = true;
      main.events._loop();
    }
    main.events.server.on(event, method);
    return main;

  };

  main.off = function(event, method) {
    
    if(method) {
      this.events.server.removeListener(event, method);
    } else {
      this.events.server.removeAllListeners(event);
    }

    // Test to see if there are any events left, and kill
    // the polling if not. 
    if(Object.keys(this.events.server._events).length === 0) {
      main.events.watching = false;
    }

    return this;

  };

  main.raise = function(event, payload, cb) {

    if(!main.apiKey) {
      throw new Error(errors.messages.noApiKey);
    }
    var self = this;
    var options = {
      url: "https://api.hoi.io/event/" + event,
      "headers" : {
        "Authorization" : "Hoist " + main.apiKey
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

  };



};