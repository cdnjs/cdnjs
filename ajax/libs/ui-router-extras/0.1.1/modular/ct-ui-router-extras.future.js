/**
 * UI-Router Extras: Sticky states, Future States, Deep State Redirect, Transition promise
 * Module: future
 * @version 0.1.0
 * @link http://christopherthielen.github.io/ui-router-extras/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(angular, undefined){
"use strict";
(function(angular, undefined) {
  var app = angular.module('ct.ui.router.extras.future', [ 'ct.ui.router.extras.core' ]);

  _futureStateProvider.$inject = [ '$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', 'uirextras_coreProvider' ];
  function _futureStateProvider($stateProvider, $urlRouterProvider, $urlMatcherFactory, uirextras_coreProvider) {
    var core = uirextras_coreProvider;
    var internalStates = core.internalStates;
    var stateFactories = {}, futureStates = {};
    var lazyloadInProgress = false, resolveFunctions = [], initPromise, initDone = false;
    var provider = this;

    // This function registers a promiseFn, to be resolved before the url/state matching code
    // will reject a route.  The promiseFn is injected/executed using the runtime $injector.
    // The function should return a promise.
    // When all registered promises are resolved, then the route is re-sync'ed.

    // Example: function($http) {
    //  return $http.get('//server.com/api/DynamicFutureStates').then(function(data) {
    //    angular.forEach(data.futureStates, function(fstate) { $futureStateProvider.futureState(fstate); });
    //  };
    // }
    this.addResolve = function (promiseFn) {
      resolveFunctions.push(promiseFn);
    };

    // Register a state factory function for a particular future-state type.  This factory, given a future-state object,
    // should create a ui-router state.
    // The factory function is injected/executed using the runtime $injector.  The future-state is injected as 'futureState'.

    // Example:
    //    $futureStateProvider.stateFactory('test', function(futureState) {
    //      return {
    //        name: futureState.stateName,
    //        url: futureState.urlFragment,
    //        template: '<h3>Future State Template</h3>',
    //        controller: function() {
    //          console.log("Entered state " + futureState.stateName);
    //        }
    //      }
    //    });
    this.stateFactory = function (futureStateType, factory) {
      stateFactories[futureStateType] = factory;
    };

    this.futureState = function (futureState) {
      if (futureState.stateName)  // backwards compat for now
        futureState.name = futureState.stateName;
      if (futureState.urlPrefix)  // backwards compat for now
        futureState.url = "^" + futureState.urlPrefix;

      futureStates[futureState.name] = futureState;
      var parentMatcher,  parentName = futureState.name.split(/\./).slice(0, -1).join("."),
        realParent = findState(futureState.parent || parentName);
      if (realParent) {
        parentMatcher = realParent.url || realParent.navigable && realParent.navigable.url;
      } else if (parentName === "") {
        parentMatcher = $urlMatcherFactory.compile("");
      } else {
        var futureParent = findState((futureState.parent || parentName), true);
        if (!futureParent) throw new Error("Couldn't determine parent state of future state. FutureState:" + angular.toJson(futureState));
        var pattern = futureParent.urlMatcher.source.replace(/\*rest$/, "");
        parentMatcher = $urlMatcherFactory.compile(pattern);
        futureState.parentFutureState = futureParent;
      }
      if (futureState.url) {
        futureState.urlMatcher = futureState.url.charAt(0) === "^" ?
          $urlMatcherFactory.compile(futureState.url.substring(1) + "*rest") :
          parentMatcher.concat(futureState.url + "*rest");
      }
    };

    this.get = function () {
      return angular.extend({}, futureStates);
    };

    function findState(stateOrName, findFutureState) {
      var statename = angular.isObject(stateOrName) ? stateOrName.name : stateOrName;
      return !findFutureState ? internalStates[statename] : futureStates[statename];
    }

    /* options is an object with at least a name or url attribute */
    function findFutureState($state, options) {
      if (options.name) {
        var nameComponents = options.name.split(/\./);
        if (options.name.charAt(0) === '.')
          nameComponents[0] = $state.current.name;
        while (nameComponents.length) {
          var stateName = nameComponents.join(".");
          if ($state.get(stateName, { relative: $state.current }))
            return null; // State is already defined; nothing to do
          if (futureStates[stateName])
            return futureStates[stateName];
          nameComponents.pop();
        }
      }

      if (options.url) {
        var matches = [];
        for(var future in futureStates) {
          var matcher = futureStates[future].urlMatcher;
          if (matcher && matcher.exec(options.url)) {
            matches.push(futureStates[future]);
          }
        }
        // Find most specific by ignoring matching parents from matches
        var copy = matches.slice(0);
        for (var i = matches.length - 1; i >= 0; i--) {
          for (var j = 0; j < copy.length; j++) {
            if (matches[i] === copy[j].parentFutureState) matches.splice(i, 1);
          }
        }
        return matches[0];
      }
    }

    function lazyLoadState($injector, futureState) {
      lazyloadInProgress = true;
      var $q = $injector.get("$q");
      if (!futureState) {
        var deferred = $q.defer();
        deferred.reject("No lazyState passed in " + futureState);
        return deferred.promise;
      }

      var parentPromises = $q.when([]), parentFuture = futureState.parentFutureState;
      if (parentFuture && futureStates[parentFuture.name]) {
        parentPromises = lazyLoadState($injector, futureStates[parentFuture.name]);
      }

      var type = futureState.type;
      var factory = stateFactories[type];
      if (!factory) throw Error("No state factory for futureState.type: " + (futureState && futureState.type));

      var failedLoadPolicy = factory.$options && factory.$options.failedLazyLoadPolicy || "remove";
      function deregisterFutureState() { delete(futureStates[futureState.name]); }
      function errorHandler(err) {
        if (failedLoadPolicy === "remove") deregisterFutureState();
        return $q.reject(err);
      }

      return parentPromises.then(function(array) {
        var factoryPromise = $injector.invoke(factory, factory, { futureState: futureState });

        return factoryPromise.then(function(fullState) {
          deregisterFutureState(); // Success; remove future state
          if (fullState) { array.push(fullState); } // Pass a chain of realized states back
          return array;
        });
      }).catch(errorHandler)
    }

    var otherwiseFunc = [ '$log', '$location',
      function otherwiseFunc($log, $location) {
        //$log.debug("Unable to map " + $location.path());
      }];

    function futureState_otherwise($injector, $location) {
      var resyncing = false;

      var lazyLoadMissingState =
        ['$rootScope', '$urlRouter', '$state',
          function lazyLoadMissingState($rootScope, $urlRouter, $state) {
            function resync() {
              resyncing = true; $urlRouter.sync(); resyncing = false;
            }
            if (!initDone) {
              // Asynchronously load state definitions, then resync URL
              initPromise().then(resync);
              initDone = true;
              return;
            }

            var futureState = findFutureState($state, { url: $location.path() });
            if (!futureState) {
              return $injector.invoke(otherwiseFunc);
            }

            // Config loaded.  Asynchronously lazy-load state definition from URL fragment, if mapped.
            lazyLoadState($injector, futureState).then(function lazyLoadedStateCallback(states) {
              states.forEach(function (state) {
                if (state && (!$state.get(state) || (state.name && !$state.get(state.name))))
                  $stateProvider.state(state);
              });
              lazyloadInProgress = false;
              resync();
            }, function lazyLoadStateAborted() {
              lazyloadInProgress = false;
              resync();
            });
          }];
      if (lazyloadInProgress) return;

      var nextFn = resyncing ? otherwiseFunc : lazyLoadMissingState;
      return $injector.invoke(nextFn);
    }

    $urlRouterProvider.otherwise(futureState_otherwise);

    $urlRouterProvider.otherwise = function(rule) {
      if (angular.isString(rule)) {
        var redirect = rule;
        rule = function () { return redirect; };
      }
      else if (!angular.isFunction(rule)) throw new Error("'rule' must be a function");
      otherwiseFunc = ['$injector', '$location', rule];
      return $urlRouterProvider;
    };

    var serviceObject = {
      getResolvePromise: function () {
        return initPromise();
      }
    };

    // Used in .run() block to init
    this.$get = [ '$injector', '$state', '$q', '$rootScope', '$urlRouter', '$timeout', '$log',
      function futureStateProvider_get($injector, $state, $q, $rootScope, $urlRouter, $timeout, $log) {
        function init() {
          $rootScope.$on("$stateNotFound", function futureState_notFound(event, unfoundState, fromState, fromParams) {
            if (lazyloadInProgress) return;
            //$log.debug("event, unfoundState, fromState, fromParams", event, unfoundState, fromState, fromParams);

            var futureState = findFutureState($state, { name: unfoundState.to });
            if (!futureState) return;

            event.preventDefault();
            var promise = lazyLoadState($injector, futureState);
            promise.then(function (states) {
              states.forEach(function (state) {
                if (state && (!$state.get(state) || (state.name && !$state.get(state.name))))
                  $stateProvider.state(state);
              });
              $state.go(unfoundState.to, unfoundState.toParams);
              lazyloadInProgress = false;
            }, function (error) {
              console.log("failed to lazy load state ", error);
              if (fromState.name) $state.go(fromState, fromParams);
              lazyloadInProgress = false;
            });
          });

          // Do this better.  Want to load remote config once, before everything else
          if (!initPromise) {
            var promises = [];
            angular.forEach(resolveFunctions, function (promiseFn) {
              promises.push($injector.invoke(promiseFn));
            });
            initPromise = function () {
              return $q.all(promises);
            };
          }

          // TODO: analyze this. I'm calling $urlRouter.sync() in two places for retry-initial-transition.
          // TODO: I should only need to do this once.  Pick the better place and remove the extra resync.
          initPromise().then(function retryInitialState() {
            $timeout(function () {
              if ($state.transition) {
                $state.transition.then(retryInitialState, retryInitialState);
              } else {
                $urlRouter.sync();
              }
            });
          });
        }

        init();

        serviceObject.state = $stateProvider.state;
        serviceObject.futureState = provider.futureState;
        serviceObject.get = provider.get;

        return serviceObject;
      }
    ];
  }

  app.provider('$futureState', _futureStateProvider);

  var statesAddedQueue = {
    state: function(state) {
      if (statesAddedQueue.$rootScope)
        statesAddedQueue.$rootScope.$broadcast("$stateAdded", state);
    },
    itsNowRuntimeOhWhatAHappyDay: function($rootScope) {
      statesAddedQueue.$rootScope = $rootScope;
    },
    $rootScope: undefined
  };

  app.config([ '$stateProvider', function($stateProvider) {
    // decorate $stateProvider.state so we can broadcast when a real state was added
    var realStateFn = $stateProvider.state;
    $stateProvider.state = function state_announce() {
      var val = realStateFn.apply($stateProvider, arguments);

      var state = angular.isObject(arguments[0]) ? arguments[0] : arguments[1];
      statesAddedQueue.state(state);
      return val;
    };
  }]);

  // inject $futureState so the service gets initialized via $get();
  app.run(['$futureState', function ($futureState, $rootScope) {
    statesAddedQueue.itsNowRuntimeOhWhatAHappyDay($rootScope);
  } ]);

})(angular);

})(angular);