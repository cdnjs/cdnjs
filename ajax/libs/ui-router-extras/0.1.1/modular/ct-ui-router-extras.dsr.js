/**
 * UI-Router Extras: Sticky states, Future States, Deep State Redirect, Transition promise
 * Module: dsr
 * @version 0.1.0
 * @link http://christopherthielen.github.io/ui-router-extras/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(angular, undefined){
"use strict";
var ignoreDsr;
function resetIgnoreDsr() {
  ignoreDsr = undefined;
}

// Decorate $state.transitionTo to gain access to the last transition.options variable.
// This is used to process the options.ignoreDsr option
angular.module('ct.ui.router.extras.dsr', [ 'ct.ui.router.extras.core' ]).config([ "$provide", function ($provide) {
  var $state_transitionTo;
  $provide.decorator("$state", ['$delegate', '$q', function ($state, $q) {
    $state_transitionTo = $state.transitionTo;
    $state.transitionTo = function (to, toParams, options) {
      if (options.ignoreDsr) {
        ignoreDsr = options.ignoreDsr;
      }

      return $state_transitionTo.apply($state, arguments).then(
        function (result) {
          resetIgnoreDsr();
          return result;
        },
        function (err) {
          resetIgnoreDsr();
          return $q.reject(err);
        }
      );
    };
    return $state;
  }]);
}]);

angular.module('ct.ui.router.extras.dsr').service("$deepStateRedirect", [ '$rootScope', '$state', '$injector', function ($rootScope, $state, $injector) {
  var lastSubstate = {};
  var deepStateRedirectsByName = {};

  var REDIRECT = "Redirect", ANCESTOR_REDIRECT = "AncestorRedirect";

  function computeDeepStateStatus(state) {
    var name = state.name;
    if (deepStateRedirectsByName.hasOwnProperty(name))
      return deepStateRedirectsByName[name];
    recordDeepStateRedirectStatus(name);
  }

  function getConfig(state) {
    var declaration = state.deepStateRedirect || state.dsr;
    if (!declaration) return { dsr: false };
    var dsrCfg = { dsr: true };

    if (angular.isFunction(declaration)) {
      dsrCfg.fn = declaration;
    } else if (angular.isObject(declaration)) {
      dsrCfg = angular.extend(dsrCfg, declaration);
    }

    if (angular.isString(dsrCfg['default'])) {
      dsrCfg['default'] = { state: dsrCfg['default'] };
    }

    if (!dsrCfg.fn) {
      dsrCfg.fn = [ '$dsr$', function($dsr$) {
        return $dsr$.redirect.state != $dsr$.to.state;
      } ];
    }
    return dsrCfg;
  }

  function recordDeepStateRedirectStatus(stateName) {
    var state = $state.get(stateName);
    if (!state) return false;
    var cfg = getConfig(state);
    if (cfg.dsr) {
      deepStateRedirectsByName[state.name] = REDIRECT;
      if (lastSubstate[stateName] === undefined)
        lastSubstate[stateName] = {};
    }

    var parent = state.$$state && state.$$state().parent;
    if (parent) {
      var parentStatus = recordDeepStateRedirectStatus(parent.self.name);
      if (parentStatus && deepStateRedirectsByName[state.name] === undefined) {
        deepStateRedirectsByName[state.name] = ANCESTOR_REDIRECT;
      }
    }
    return deepStateRedirectsByName[state.name] || false;
  }

  function getMatchParams(params, dsrParams) {
    if (dsrParams === true) dsrParams = Object.keys(params);
    if (dsrParams === null || dsrParams === undefined) dsrParams = [];

    var matchParams = {};
    angular.forEach(dsrParams.sort(), function(name) { matchParams[name] = params[name]; });
    return matchParams;
  }

  function getParamsString(params, dsrParams) {
    var matchParams = getMatchParams(params, dsrParams);
    function safeString(input) { return !input ? input : input.toString(); }
    var paramsToString = {};
    angular.forEach(matchParams, function(val, name) { paramsToString[name] = safeString(val); });
    return angular.toJson(paramsToString);
  }

  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    var cfg = getConfig(toState);
    if (ignoreDsr || (computeDeepStateStatus(toState) !== REDIRECT) && !cfg['default']) return;
    // We're changing directly to one of the redirect (tab) states.
    // Get the DSR key for this state by calculating the DSRParams option
    var key = getParamsString(toParams, cfg.params);
    var redirect = lastSubstate[toState.name][key] || cfg['default'];
    if (!redirect) return;

    // we have a last substate recorded
    var $dsr$ = { redirect: { state: redirect.state, params: redirect.params}, to: { state: toState.name, params: toParams } };
    var result = $injector.invoke(cfg.fn, toState, { $dsr$: $dsr$ });
    if (!result) return;
    if (result.state) redirect = result;
    event.preventDefault();
    var redirectParams = getMatchParams(toParams, cfg.params);
    $state.go(redirect.state, angular.extend(redirectParams, redirect.params));
  });

  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
    var deepStateStatus = computeDeepStateStatus(toState);
    if (deepStateStatus) {
      var name = toState.name;
      angular.forEach(lastSubstate, function (redirect, dsrState) {
        // update Last-SubState&params for each DSR that this transition matches.
        var cfg = getConfig($state.get(dsrState));
        var key = getParamsString(toParams, cfg.params);
        if (toState.$$state().includes[dsrState]) {
          lastSubstate[dsrState][key] = { state: name, params: angular.copy(toParams) };
        }
      });
    }
  });

  return {
    getRedirect: function(dsrState, params) {
      var state = $state.get(dsrState);
      computeDeepStateStatus(state)
      var cfg = getConfig(state);
      var key = getParamsString(params, cfg.params);
      var redirect = lastSubstate[state.name][key] || cfg['default'];
      return redirect;
    },
    reset: function(stateOrName, params) {
      if (!stateOrName) {
        angular.forEach(lastSubstate, function(redirect, dsrState) { lastSubstate[dsrState] = {}; });
      } else {
        var state = $state.get(stateOrName);
        if (!state) throw new Error("Unknown state: " + stateOrName);
        if (lastSubstate[state.name]) {
          if (params) {
            var key = getParamsString(params, getConfig(state).params);
            delete lastSubstate[state.name][key];
          } else {
            lastSubstate[state.name] = {};
          }
        }
      }
    }
  };
}]);

angular.module('ct.ui.router.extras.dsr').run(['$deepStateRedirect', function ($deepStateRedirect) {
  // Make sure $deepStateRedirect is instantiated
}]);

})(angular);