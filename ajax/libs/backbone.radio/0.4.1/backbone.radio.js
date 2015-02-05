// Backbone.Radio v0.4.0
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], function(Backbone, _) {
      return factory(Backbone, _);
    });
  }
  else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    module.exports = factory(Backbone, _);
  }
  else {
    factory(root.Backbone, root._);
  }
}(this, function(Backbone, _) {
  'use strict';

  var previousRadio = Backbone.Radio;

  var Radio = Backbone.Radio = {};

  Radio.VERSION = '0.4.0';

  Radio.noConflict = function () {
    Backbone.Radio = previousRadio;
    return this;
  };

  var slice = Array.prototype.slice;

  /*
   * Backbone.Radio
   * --------------
   * The 'top-level' API for working with Backbone.Radio
   *
   */
  
  _.extend(Radio, {
    _channels: {},
  
    DEBUG: false,
  
    channel: function(channelName) {
      if (!channelName) {
        throw new Error('You must provide a name for the channel.');
      }
      return Radio._getChannel(channelName);
    },
  
    _getChannel: function(channelName) {
      var channel = Radio._channels[channelName];
      if (!channel) {
        channel = new Radio.Channel(channelName);
        Radio._channels[channelName] = channel;
      }
      return channel;
    }
  });
  
  /*
   * tune-in
   * -------
   * Get console logs of a channel's activity
   *
   */
  
  var _logs = {};
  
  // This is to produce an identical function in both tuneIn and tuneOut,
  // so that Backbone.Events unregisters it.
  function _partial(channelName) {
    return _logs[channelName] || (_logs[channelName] = _.partial(Radio.log, channelName));
  }
  
  _.extend(Radio, {
  
    // Log information about the channel and event
    log: function(channelName, eventName) {
      var args = slice.call(arguments, 2);
      console.log('[' + channelName + '] "' + eventName + '"', args);
    },
  
    // Logs all events on this channel to the console. It sets an
    // internal value on the channel telling it we're listening,
    // then sets a listener on the Backbone.Events
    tuneIn: function(channelName) {
      var channel = Radio.channel(channelName);
      channel._tunedIn = true;
      channel.on('all', _partial(channelName));
      return this;
    },
  
    // Stop logging all of the activities on this channel to the console
    tuneOut: function(channelName) {
      var channel = Radio.channel(channelName);
      channel._tunedIn = false;
      channel.off('all', _partial(channelName));
      delete _logs[channelName];
      return this;
    }
  });
  
  /*
   * Backbone.Radio.Commands
   * -----------------------
   * A messaging system for sending orders.
   *
   */
  
  Radio.Commands = {
    command: function(name) {
      var args = slice.call(arguments, 1);
      var channelName = this._channelName;
  
      // Check if we should log the request, and if so, do it
      if (channelName && this._tunedIn) {
        Radio.log.apply(this, [channelName, name].concat(args));
      }
  
      // If the command isn't handled, log it in DEBUG mode and exit
      if (!this._commands || !this._commands[name]) {
        if (Radio.DEBUG) {
          var channelText = channelName ? ' on the ' + channelName + ' channel' : '';
          console.warn('An unhandled event was fired' + channelText + ': "' + name + '"');
        }
      }
      else {
        var handler = this._commands[name];
        handler.callback.apply(handler.context, args);
      }
  
      return this;
    },
  
    react: function(name, callback, context) {
      this._commands || (this._commands = {});
  
      this._commands[name] = {
        callback: callback,
        context: context || this
      };
  
      return this;
    },
  
    reactOnce: function(name, callback, context) {
      var self = this;
      var once = _.once(function() {
        self.stopReacting(name);
        return callback.apply(this, arguments);
      });
      return this.react(name, once, context);
    },
  
    stopReacting: function(name) {
      var store = this._commands;
      if (!name) {
        delete this._commands;
      }
      else if (store && store[name]) {
        delete store[name];
      }
      else if (Radio.DEBUG) {
        var channelName = this._channelName;
        var channelText = channelName ? ' on the ' + channelName + ' channel.' : '';
        console.warn('Attempted to remove the unregistered command "' + name + '"' + channelText);
      }
      return this;
    }
  };
  
  /*
   * Backbone.Radio.Requests
   * -----------------------
   * A messaging system for requesting data.
   *
   */
  
  function makeCallback(callback) {
    return _.isFunction(callback) ? callback : _.constant(callback);
  }
  
  Radio.Requests = {
    request: function(name) {
      var args = slice.call(arguments, 1);
      var channelName = this._channelName;
  
      // Check if we should log the request, and if so, do it
      if (channelName && this._tunedIn) {
        Radio.log.apply(this, [channelName, name].concat(args));
      }
  
      // If the request isn't handled, log it in DEBUG mode and exit
      if (!this._requests || !this._requests[name]) {
        if (Radio.DEBUG) {
          var channelText = channelName ? ' on the ' + channelName + ' channel' : '';
          console.warn('An unhandled event was fired' + channelText + ': "' + name + '"');
        }
        return;
      }
      var handler = this._requests[name];
      return handler.callback.apply(handler.context, args);
    },
  
    reply: function(name, callback, context) {
      this._requests || (this._requests = {});
  
      this._requests[name] = {
        callback: makeCallback(callback),
        context: context || this
      };
  
      return this;
    },
  
    replyOnce: function(name, callback, context) {
      var self = this;
      var once = _.once(function() {
        self.stopReplying(name);
        return makeCallback(callback).apply(this, arguments);
      });
      return this.reply(name, once, context);
    },
  
    stopReplying: function(name) {
      var store = this._requests;
      if (!name) {
        delete this._requests;
      }
      else if (store && store[name]) {
        delete store[name];
      }
      else if (Radio.DEBUG) {
        var channelName = this._channelName;
        var channelText = channelName ? ' on the ' + channelName + ' channel.' : '';
        console.warn('Attempted to remove the unregistered request "' + name + '"' + channelText);
      }
      return this;
    }
  };
  
  /*
   * Backbone.Radio.Channel
   * ----------------------
   * A Channel is an object that extends from Backbone.Events,
   * Radio.Commands, and Radio.Requests.
   *
   */
  
  Radio.Channel = function(channelName) {
    this._channelName = channelName;
    _.extend(this, Backbone.Events, Radio.Commands, Radio.Requests);
  };
  
  _.extend(Radio.Channel.prototype, {
  
    // Remove all handlers from the messaging systems of this channel
    reset: function() {
      this.off();
      this.stopListening();
      this.stopReacting();
      this.stopReplying();
      return this;
    },
  
    connectEvents: function(hash, context) {
      return this._connect('on', hash, context);
    },
  
    connectCommands: function(hash, context) {
      return this._connect('react', hash, context);
    },
  
    connectRequests: function(hash, context) {
      return this._connect('reply', hash, context);
    },
  
    _connect: function(methodName, hash, context) {
      if (!hash) { return; }
  
      _.each(hash, function(fn, eventName) {
        this[methodName](eventName, fn, context || this);
      }, this);
      return this;
    }
  
  });
  
  /*
   * proxy
   * -----
   * Supplies a top-level API.
   *
   */
  
   var channel, args, systems = [Backbone.Events, Radio.Commands, Radio.Requests];
  
   _.each(systems, function(system) {
    _.each(system, function(method, methodName) {
      Radio[methodName] = function(channelName) {
        args = slice.call(arguments, 2);
        channel = this.channel(channelName);
        return channel[methodName].apply(channel, args);
      };
    });
  });
  

  return Radio;
}));
