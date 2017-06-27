/*
 *   Copyright (c) 2011-2015 The original author or authors
 *   ------------------------------------------------------
 *   All rights reserved. This program and the accompanying materials
 *   are made available under the terms of the Eclipse Public License v1.0
 *   and Apache License v2.0 which accompanies this distribution.
 *
 *       The Eclipse Public License is available at
 *       http://www.eclipse.org/legal/epl-v10.html
 *
 *       The Apache License v2.0 is available at
 *       http://www.opensource.org/licenses/apache2.0.php
 *
 *   You may elect to redistribute this code under either of these licenses.
 */
!function (factory) {
  if (typeof require === 'function' && typeof module !== 'undefined') {
    // CommonJS loader
    var SockJS = require('sockjs-client');
    if(!SockJS) {
      throw new Error('vertx-eventbus.js requires sockjs-client, see http://sockjs.org');
    }
    factory(SockJS);
  } else if (typeof define === 'function' && define.amd) {
    // AMD loader
    define('vertx3bus', ['sockjs'], factory);
  } else {
    // plain old include
    if (typeof this.SockJS === 'undefined') {
      throw new Error('vertx-eventbus.js requires sockjs-client, see http://sockjs.org');
    }

    EventBus = factory(this.SockJS);
  }
}(function (SockJS) {

  function makeUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a, b) {
      return b = Math.random() * 16, (a == 'y' ? b & 3 | 8 : b | 0).toString(16);
    });
  }

  function mergeHeaders(defaultHeaders, headers) {
    if (defaultHeaders) {
      if(!headers) {
        return defaultHeaders;
      }

      for (var headerName in defaultHeaders) {
        if (defaultHeaders.hasOwnProperty(headerName)) {
          // user can overwrite the default headers
          if (typeof headers[headerName] === 'undefined') {
            headers[headerName] = defaultHeaders[headerName];
          }
        }
      }
    }

    // headers are required to be a object
    return headers || {};
  }

  /**
   * EventBus
   *
   * @param url
   * @param options
   * @constructor
   */
  var EventBus = function (url, options) {
    var self = this;

    options = options || {};

    var pingInterval = options.vertxbus_ping_interval || 5000;
    var pingTimerID;

    // attributes
    this.sockJSConn = new SockJS(url, null, options);
    this.state = EventBus.CONNECTING;
    this.handlers = {};
    this.replyHandlers = {};
    this.defaultHeaders = null;

    // default event handlers
    this.onerror = console.error;

    var sendPing = function () {
      self.sockJSConn.send(JSON.stringify({type: 'ping'}));
    };

    this.sockJSConn.onopen = function () {
      // Send the first ping then send a ping every pingInterval milliseconds
      sendPing();
      pingTimerID = setInterval(sendPing, pingInterval);
      self.state = EventBus.OPEN;
      self.onopen && self.onopen();
    };

    this.sockJSConn.onclose = function () {
      self.state = EventBus.CLOSED;
      if (pingTimerID) clearInterval(pingTimerID);
      self.onclose && self.onclose();
    };

    this.sockJSConn.onmessage = function (e) {
      var json = JSON.parse(e.data);

      // define a reply function on the message itself
      if (json.replyAddress) {
        Object.defineProperty(json, 'reply', {
          value: function (message, headers, callback) {
            self.send(json.replyAddress, message, headers, callback);
          }
        });
      }

      if (self.handlers[json.address]) {
        // iterate all registered handlers
        var handlers = self.handlers[json.address];
        for (var i = 0; i < handlers.length; i++) {
          if (json.type === 'err') {
            handlers[i]({failureCode: json.failureCode, failureType: json.failureType, message: json.message});
          } else {
            handlers[i](null, json);
          }
        }
      } else if (self.replyHandlers[json.address]) {
        // Might be a reply message
        var handler = self.replyHandlers[json.address];
        delete self.replyHandlers[json.address];
        if (json.type === 'err') {
          handler({failureCode: json.failureCode, failureType: json.failureType, message: json.message});
        } else {
          handler(null, json);
        }
      } else {
        if (json.type === 'err') {
          self.onerror(json);
        } else {
          console.warn('No handler found for message: ', json);
        }
      }
    }
  };

  /**
   * Send a message
   *
   * @param {String} address
   * @param {Object} message
   * @param {Object} [headers]
   * @param {Function} [callback]
   */
  EventBus.prototype.send = function (address, message, headers, callback) {
    // are we ready?
    if (this.state != EventBus.OPEN) {
      throw new Error('INVALID_STATE_ERR');
    }

    if (typeof headers === 'function') {
      callback = headers;
      headers = {};
    }

    var envelope = {
      type: 'send',
      address: address,
      headers: mergeHeaders(this.defaultHeaders, headers),
      body: message
    };

    if (callback) {
      var replyAddress = makeUUID();
      envelope.replyAddress = replyAddress;
      this.replyHandlers[replyAddress] = callback;
    }

    this.sockJSConn.send(JSON.stringify(envelope));
  };

  /**
   * Publish a message
   *
   * @param {String} address
   * @param {Object} message
   * @param {Object} [headers]
   */
  EventBus.prototype.publish = function (address, message, headers) {
    // are we ready?
    if (this.state != EventBus.OPEN) {
      throw new Error('INVALID_STATE_ERR');
    }

    this.sockJSConn.send(JSON.stringify({
      type: 'publish',
      address: address,
      headers: mergeHeaders(this.defaultHeaders, headers),
      body: message
    }));
  };

  /**
   * Register a new handler
   *
   * @param {String} address
   * @param {Object} [headers]
   * @param {Function} callback
   */
  EventBus.prototype.registerHandler = function (address, headers, callback) {
    // are we ready?
    if (this.state != EventBus.OPEN) {
      throw new Error('INVALID_STATE_ERR');
    }

    if (typeof headers === 'function') {
      callback = headers;
      headers = {};
    }

    // ensure it is an array
    if (!this.handlers[address]) {
      this.handlers[address] = [];
      // First handler for this address so we should register the connection
      this.sockJSConn.send(JSON.stringify({
        type: 'register',
        address: address,
        headers: mergeHeaders(this.defaultHeaders, headers)
      }));
    }

    this.handlers[address].push(callback);
  };

  /**
   * Unregister a handler
   *
   * @param {String} address
   * @param {Object} [headers]
   * @param {Function} callback
   */
  EventBus.prototype.unregisterHandler = function (address, headers, callback) {
    // are we ready?
    if (this.state != EventBus.OPEN) {
      throw new Error('INVALID_STATE_ERR');
    }

    var handlers = this.handlers[address];

    if (handlers) {

      if (typeof headers === 'function') {
        callback = headers;
        headers = {};
      }

      var idx = handlers.indexOf(callback);
      if (idx != -1) {
        handlers.splice(idx, 1);
        if (handlers.length === 0) {
          // No more local handlers so we should unregister the connection
          this.sockJSConn.send(JSON.stringify({
            type: 'unregister',
            address: address,
            headers: mergeHeaders(this.defaultHeaders, headers)
          }));

          delete this.handlers[address];
        }
      }
    }
  };

  /**
   * Closes the connection to the EvenBus Bridge.
   */
  EventBus.prototype.close = function () {
    this.state = vertx.EventBus.CLOSING;
    this.sockJSConn.close();
  };

  EventBus.CONNECTING = 0;
  EventBus.OPEN = 1;
  EventBus.CLOSING = 2;
  EventBus.CLOSED = 3;

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = EventBus;
    } else {
      exports.EventBus = EventBus;
    }
  } else {
    return EventBus;
  }
});