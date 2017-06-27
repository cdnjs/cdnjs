/**
 * Brian Woodward
 *
 * Brian Woodward <http://github.com/doowb>
 * Created and maintained by Brian Woodward
 *
 * Copyright (c) 2014 Brian Woodward.
 * Licensed under the MIT License (MIT).
 */

/**
 * This code and some of the ideas in the code are inspired by the following
 * article from "25 days of AngularJS Calendar | 2013"
 * http://www.ng-newsletter.com/advent2013/#!/day/17
 */

'use strict';

angular.module('doowb.angular-pusher', [])

// create a provider that loads the pusher script from a cdn
.provider('PusherService', function () {
  var scriptUrl = '//js.pusher.com/2.2/pusher.min.js';
  var secureScriptUrl = '//js.pusher.com/2.2/pusher.min.js';
  var scriptId = 'pusher-sdk';
  var apiKey = '';
  var initOptions = {};

  this.setPusherUrl = function (url) {
    if(url) scriptUrl = secureScriptUrl = url;
    return this;
  };

  this.setOptions = function (options) {
    initOptions = options || initOptions;
    return this;
  };

  this.setToken = function (token) {
    apiKey = token || apiKey;
    return this;
  };

  // load the pusher api script async
  function createScript ($document, protocol, callback, success ) {
    var tag = $document.createElement('script');
    tag.type = 'text/javascript';
    tag.async = true;
    tag.id = scriptId;
    tag.src = (protocol == 'https') ? secureScriptUrl : scriptUrl;

    tag.onreadystatechange = tag.onload = function () {
      var state = tag.readState;
      if (!callback.done && (!state || /loaded|complete/.test(state))) {
        callback.done = true;
        callback();
      }
    };

    $document.getElementsByTagName('head')[0].appendChild(tag);
  }

  this.$get = ['$document', '$timeout', '$q', '$rootScope', '$window', '$location',
    function ($document, $timeout, $q, $rootScope, $window, $location) {
      var deferred = $q.defer();
      var pusher;
      var protocol = $location.protocol();

      function onSuccess () {
        pusher = new $window.Pusher(apiKey, initOptions);
      }

      var onScriptLoad = function (callback) {
        onSuccess();
        $timeout(function () {
          deferred.resolve(pusher);
        });
      };

      createScript($document[0], protocol, onScriptLoad);
      return deferred.promise;
    }];

})

.factory('Pusher', ['$rootScope', 'PusherService',
  function ($rootScope, PusherService) {
    return {

      subscribe: function (channelName, eventName, callback) {
        PusherService.then(function (pusher) {
          var channel = pusher.channel(channelName) || pusher.subscribe(channelName);
          channel.bind(eventName, function (data) {
            if (callback) callback(data);
            $rootScope.$broadcast(channelName + ':' + eventName, data);
            $rootScope.$digest();
          });
        });
      },

      unsubscribe: function (channelName) {
        PusherService.then(function (pusher) {
          pusher.unsubscribe(channelName);
        });
      }
    };
  }
]);
