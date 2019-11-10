;(function() {

  'use strict';

  angular
    .module('auth0.auth0', [])
    .provider('angularAuth0', angularAuth0);
  
  function angularAuth0() {
    if (typeof Auth0 !== 'function') {
      throw new Error('Auth0 must be loaded.');
    }

    this.init = function(config) {
      if (!config) {
        throw new Error('clientID and domain must be provided to auth0');
      }
      this.domain = config.domain;
      this.clientID = config.clientID;
      this.callbackURL = config.callbackURL;
    };

    this.$inject = ['$rootScope'];

    this.$get = function($rootScope) {

      var Auth0Js = new Auth0(
        {
          domain: this.domain,
          clientID: this.clientID,
          callbackURL: this.callbackURL,
          callbackOnLocationHash: true
        }
      );
      var auth0 = {};
      var functions = [];
      for (var i in Auth0Js) {
        if(typeof Auth0Js[i] === 'function') {
          functions.push(i);
        }
      }

      function safeApply(fn) {
        var phase = $rootScope.$root.$$phase;
        if(phase === '$apply' || phase === '$digest') {
          if(fn && (typeof(fn) === 'function')) {
            fn();
          }
        } else {
          $rootScope.$apply(fn);
        }
      }

      function wrapArguments(parameters) {
        var lastIndex = parameters.length - 1,
          func = parameters[lastIndex];
        if(typeof func === 'function') {
          parameters[lastIndex] = function() {
            var args = arguments;
            safeApply(function() {
              func.apply(Auth0Js, args)
            })
          }
        }
        return parameters;
      }

      for (var i = 0; i < functions.length; i++) {
        auth0[functions[i]]  = (function(name){
          var customFunction = function() {
            return Auth0Js[name].apply(Auth0Js, wrapArguments(arguments) );
          };
          return customFunction;
        })(functions[i]);
      }
      return auth0;
    }
  }
})();
