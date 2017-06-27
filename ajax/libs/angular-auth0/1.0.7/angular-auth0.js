(function() {

  'use strict';

  angular
    .module('auth0.auth0', [])
    .provider('angularAuth0', angularAuth0);

  function angularAuth0() {
    if (!angular.isFunction(Auth0)) {
      throw new Error('Auth0 must be loaded.');
    }

    this.init = function(config) {
      if (!config) {
        throw new Error('clientID and domain must be provided to auth0');
      }
      this.config = config;
    };

    this.$get = ["$rootScope", function($rootScope) {

      var Auth0Js = new Auth0(this.config);
      var auth0 = {};
      var functions = [];
      for (var i in Auth0Js) {
        if (angular.isFunction(Auth0Js[i])) {
          functions.push(i);
        }
      }

      function wrapArguments(parameters) {
        var lastIndex = parameters.length - 1,
          func = parameters[lastIndex];
        if (angular.isFunction(func)) {
          parameters[lastIndex] = function() {
            var args = arguments;
            $rootScope.$evalAsync(function() {
              func.apply(Auth0Js, args);
            });
          };
        }
        return parameters;
      }

      for (var i = 0; i < functions.length; i++) {
        auth0[functions[i]] = (function(name) {
          var customFunction = function() {
            return Auth0Js[name].apply(Auth0Js, wrapArguments(arguments));
          };
          return customFunction;
        })(functions[i]);
      }
      return auth0;
    }];
  }
})();
