'use strict';

angular.module('pusher-angular', [])

.factory('$pusher', ['$rootScope', '$channel', '$connection',
  function ($rootScope, $channel, $connection) {

    function PusherAngular (pusherClient) {
      if (!(this instanceof PusherAngular)) {
        return new PusherAngular(pusherClient);
      }

      this._assertValidClient(pusherClient);
      this.client = pusherClient;
      this.connection = $connection(pusherClient.connection, pusherClient);
      this.channels = {};
    }

    PusherAngular.prototype = {
      /**
       * Subscribe the client to the specified channelName and returns the channel object.
       * {@link https://pusher.com/docs/client_api_guide/client_public_channels#subscribe}
       *
       * @param {String} channelName name of the channel
       * @returns {Object} channel object
       */
      subscribe: function (channelName) {
        var channel = this.client.channel(channelName);
        if(channel === undefined) {
          channel = this.client.subscribe(channelName);
        }
        channel = $channel(channel, this);
        this.channels[channelName] = channel;
        return channel;
      },

      /**
       * Unsubscribes the client from the specified channel
       * {@link https://pusher.com/docs/client_api_guide/client_public_channels#unsubscribe}
       *
       * @param {String} channelName name of the channel
       */
      unsubscribe: function (channelName) {
        if (this.client.channel(channelName)) {
          this.client.unsubscribe(channelName);
          if (this.channels[channelName]) { delete this.channels[channelName]; }
        }
      },

      /**
       * Binds to global events on the pusher client. You can attach behaviour to these events
       * regardless of the channel the event is broadcast to.
       *
       * @param {String} eventName name of the event you want to bind to
       * @param {Function|undefined} callback callback that you want called upon the event occurring
       * @param {Object} context used as the `this` value when calling a handler
       * @returns {Function} the decorated version of the callback provided
       */
      bind: function (eventName, callback, context) {
        var decoratedCallback = function (data) {
          callback(data);
          $rootScope.$digest();
        };
        this.client.bind(eventName, decoratedCallback, context);
        return decoratedCallback;
      },

      /**
       * Binds to all of the global client messages.
       *
       * @param {Function|undefined} callback callback that you want called upon a message being received
       */
      bind_all: function (callback) {
        this.client.bind_all(function (eventName, data) {
          callback(eventName, data);
          $rootScope.$digest();
        });
      },

      /**
       * Unbinds from global events on the pusher client.
       *
       * @param {String} eventName name of the event you want to bind from
       * @param {Function|undefined} decoratedCallback the decorated version of the callback that you want to unbind
       * @param {Object} context used as the `this` value when calling a handler
       */
      unbind: function (eventName, decoratedCallback, context) {
        this.client.unbind(eventName, decoratedCallback, context);
      },

      /**
       * Disconnects the pusher client.
       * {@link http://pusher.com/docs/client_api_guide/client_connect#disconnecting}
       */
      disconnect: function () {
        this.client.disconnect();
      },

      /**
       * Returns a pusher channel object.
       * {@link https://pusher.com/docs/client_api_guide/client_channels#access}
       *
       * @param {String} channelName name of the channel
       * @returns {Array} channel object
       */
      channel: function (channelName) {
        return this.channels[channelName];
      },

      /**
       * Returns a an array of the channels that the client is subscribed to.
       * {@link https://pusher.com/docs/client_api_guide/client_channels#access}
       *
       * @returns {Array} array of subscribed channels
       */
      allChannels: function () {
        return this.channels;
      },

      /**
       * Asserts that the $pusher object is being initialised with valid pusherClient.
       * Throws an error if pusherClient is invalid.
       *
       * @param {Object} pusherClient members object from base pusher channel object
       */
      _assertValidClient: function (pusherClient) {
        if (!angular.isObject(pusherClient) ||
            !angular.isObject(pusherClient.connection) ||
            typeof(pusherClient.channel) !== 'function') {
          throw new Error('Invalid Pusher client object');
        }
      }
    };

    return PusherAngular;
  }
])

.factory('$channel', ['$rootScope', '$members',
  function ($rootScope, $members) {

    function checkPresenceOrPrivateChannel (channelName) {
      if (channelName.indexOf('presence-') == -1 && channelName.indexOf('private-') == -1) {
        throw new Error('Presence or private channel required');
      }
    }

    function $channel (baseChannel, $pusherClient) {
      if (!(this instanceof $channel)) {
        return new $channel(baseChannel, $pusherClient);
      }

      this._assertValidChannel(baseChannel);
      this.baseChannel = baseChannel;
      this.client = $pusherClient;
      this.name = baseChannel.name;

      if (baseChannel.name.indexOf('presence') == -1) {
        this.members = function () { throw new Error('Members object only exists for presence channels'); }
      } else {
        this.members = $members(baseChannel.members, baseChannel);
      }
    }

    $channel.prototype = {
      /**
       * Binds to the given event name on the channel.
       *
       * @param {String} eventName name of the event you want to bind to
       * @param {Function|undefined} callback callback that you want called upon the event occurring
       * @param {Object} context used as the `this` value when calling a handler
       * @returns {Function} the decorated version of the callback provided
       */
      bind: function (eventName, callback, context) {
        var decoratedCallback = function (data) {
          callback(data);
          $rootScope.$digest();
        };
        this.baseChannel.bind(eventName, decoratedCallback, context);
        return decoratedCallback;
      },

      /**
       * Unbinds from the given event name on the channel.
       *
       * @param {String} eventName name of the event you want to bind from
       * @param {Function|undefined} decoratedCallback the decorated version of the callback that you want to unbind
       * @param {Object} context used as the `this` value when calling a handler
       */
      unbind: function (eventName, decoratedCallback, context) {
        this.baseChannel.unbind(eventName, decoratedCallback, context);
      },

      /**
       * Binds to all of the channel events.
       *
       * @param {Function|undefined} callback callback that you want called upon the event occurring
       */
      bind_all: function (callback) {
        this.baseChannel.bind_all(function (eventName, data) {
          callback(eventName, data);
          $rootScope.$digest();
        });
      },

      /**
       * Triggers a client event.
       * {@link https://pusher.com/docs/client_api_guide/client_events#trigger-events}
       *
       * @param {String} channelName name of the channel
       * @param {String} eventName name of the event
       * @param {Object} obj object that you wish to pass along with your client event
       * @returns {}
       */
      trigger: function (eventName, obj) {
        checkPresenceOrPrivateChannel(this.name);
        if (eventName.indexOf('client-') == -1) { throw new Error('Event name requires \'client-\' prefix'); }
        return this.baseChannel.trigger(eventName, obj);
      },

      /**
       * Asserts that the $channel object is being initialised with valid baseChannel.
       * Throws an error if baseChannel is invalid.
       *
       * @param {Object} baseChannel channel object from base pusher channel object
       */
      _assertValidChannel: function (baseChannel) {
        if (!angular.isObject(baseChannel) ||
            typeof(baseChannel.name) !== 'string') {
          throw new Error('Invalid Pusher channel object');
        }
      }
    };

    return $channel;
  }
])

.factory('$members', ['$rootScope',
  function ($rootScope) {

    function $members (baseMembers, baseChannel) {
      if (!(this instanceof $members)) {
        return new $members(baseMembers, baseChannel);
      }
      var self = this;

      this._assertValidMembers(baseMembers);
      this.baseMembers = baseMembers;
      this.baseChannel = baseChannel;
      this.me = {};
      this.count = 0;
      this.members = {};

      baseChannel.bind('pusher:subscription_succeeded', function (members) {
        self.me = members.me;
        self.count = members.count;
        self.members = members.members;
        $rootScope.$digest();
      });

      baseChannel.bind('pusher:member_added', function (member) {
        self.count++;
        if (member.info) {
          self.members[member.id.toString()] = member.info;
        } else {
          self.members[member.id.toString()] = null;
        }
        $rootScope.$digest();
      });

      baseChannel.bind('pusher:member_removed', function (member) {
        self.count--;
        delete self.members[member.id.toString()];
        $rootScope.$digest();
      });
    }

    $members.prototype = {
     /**
      * Returns member's info for given id. Resulting object containts two fields - id and info.
      *
      * @param {Number} id user's id
      * @return {Object} member's info or null
      */
      get: function (id) {
        return this.baseMembers.get(id);
      },

      /**
       * Calls back for each member in unspecified order.
       *
       * @param {Function} callback callback function
       */
      each: function (callback) {
        this.baseMembers.each(function (member) {
          callback(member);
          $rootScope.$digest();
        });
      },

      /**
       * Asserts that the $members object is being initialised with valid baseMembers.
       * Throws an error if baseMembers is invalid.
       *
       * @param {Object} baseMembers members object from base pusher channel object
       */
      _assertValidMembers: function (baseMembers) {
        if (!angular.isObject(baseMembers) ||
            typeof(baseMembers.me) !== 'object') {
          throw new Error('Invalid Pusher channel members object');
        }
      }
    };

    return $members;
  }
])

.factory('$connection', ['$rootScope',
  function ($rootScope) {

    function $connection (baseConnection, baseClient) {
      if (!(this instanceof $connection)) {
        return new $connection(baseConnection, baseClient);
      }

      this._assertValidConnection(baseConnection);
      this.baseConnection = baseConnection;
      this.baseClient = baseClient;
    }

    $connection.prototype = {
      /**
       * Binds to the given event name on the connection.
       *
       * @param {String} eventName name of the event you want to bind to
       * @param {Function|undefined} callback callback that you want called upon the event occurring
       */
      bind: function (eventName, callback, context) {
        this.baseConnection.bind(eventName, function (data) {
          callback(data);
          $rootScope.$digest();
        }, context);
      },

      /**
       * Binds to all of the global connection events.
       *
       * @param {Function|undefined} callback callback that you want called upon the event occurring
       */
      bind_all: function (callback) {
        this.baseConnection.bind_all(function (eventName, data) {
          callback(eventName, data);
          $rootScope.$digest();
        });
      },

      /**
       * Asserts that the $connection object is being initialised with valid baseConnection.
       * Throws an error if baseConnection is invalid.
       *
       * @param {Object} baseConnection connection object from base pusher object
       */
      _assertValidConnection: function (baseConnection) {
        if (!angular.isObject(baseConnection)) {
          throw new Error('Invalid Pusher connection object');
        }
      }
    };

    return $connection;
  }
]);
