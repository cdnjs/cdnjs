/**
 * UI-Router Extras: Sticky states, Future States, Deep State Redirect, Transition promise
 * Monolithic build (all modules)
 * @version 0.1.3
 * @link http://christopherthielen.github.io/ui-router-extras/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['angular'], function (angular) {
            factory(angular);
        });
    } else if (typeof exports === 'object') {
        factory(require('angular'));
    } else {
        factory(root.angular);
    }
}(this, function (angular, undefined) {
    var mod_core = angular.module("ct.ui.router.extras.core", [ "ui.router" ]);

var internalStates = {}, stateRegisteredCallbacks = [];
mod_core.config([ '$stateProvider', '$injector', function ($stateProvider, $injector) {
  // Decorate any state attribute in order to get access to the internal state representation.
  $stateProvider.decorator('parent', function (state, parentFn) {
    // Capture each internal UI-Router state representations as opposed to the user-defined state object.
    // The internal state is, e.g., the state returned by $state.$current as opposed to $state.current
    internalStates[state.self.name] = state;
    // Add an accessor for the internal state from the user defined state
    state.self.$$state = function () {
      return internalStates[state.self.name];
    };

    angular.forEach(stateRegisteredCallbacks, function(callback) { callback(state); });
    return parentFn(state);
  });
}]);

var DEBUG = false;

var forEach = angular.forEach;
var extend = angular.extend;
var isArray = angular.isArray;

var map = function (collection, callback) {
  "use strict";
  var result = [];
  forEach(collection, function (item, index) {
    result.push(callback(item, index));
  });
  return result;
};

var keys = function (collection) {
  "use strict";
  return map(collection, function (collection, key) {
    return key;
  });
};

var filter = function (collection, callback) {
  "use strict";
  var result = [];
  forEach(collection, function (item, index) {
    if (callback(item, index)) {
      result.push(item);
    }
  });
  return result;
};

var filterObj = function (collection, callback) {
  "use strict";
  var result = {};
  forEach(collection, function (item, index) {
    if (callback(item, index)) {
      result[index] = item;
    }
  });
  return result;
};

// Duplicates code in UI-Router common.js
function ancestors(first, second) {
  var path = [];

  for (var n in first.path) {
    if (first.path[n] !== second.path[n]) break;
    path.push(first.path[n]);
  }
  return path;
}

// Duplicates code in UI-Router common.js
function objectKeys(object) {
  if (Object.keys) {
    return Object.keys(object);
  }
  var result = [];

  angular.forEach(object, function (val, key) {
    result.push(key);
  });
  return result;
}

/**
 * like objectKeys, but includes keys from prototype chain.
 * @param object the object whose prototypal keys will be returned
 * @param ignoreKeys an array of keys to ignore
 */
// Duplicates code in UI-Router common.js
function protoKeys(object, ignoreKeys) {
  var result = [];
  for (var key in object) {
    if (!ignoreKeys || ignoreKeys.indexOf(key) === -1)
      result.push(key);
  }
  return result;
}

// Duplicates code in UI-Router common.js
function arraySearch(array, value) {
  if (Array.prototype.indexOf) {
    return array.indexOf(value, Number(arguments[2]) || 0);
  }
  var len = array.length >>> 0, from = Number(arguments[2]) || 0;
  from = (from < 0) ? Math.ceil(from) : Math.floor(from);

  if (from < 0) from += len;

  for (; from < len; from++) {
    if (from in array && array[from] === value) return from;
  }
  return -1;
}

// Duplicates code in UI-Router common.js
// Added compatibility code  (isArray check) to support both 0.2.x and 0.3.x series of UI-Router.
function inheritParams(currentParams, newParams, $current, $to) {
  var parents = ancestors($current, $to), parentParams, inherited = {}, inheritList = [];

  for (var i in parents) {
    if (!parents[i].params) continue;
    // This test allows compatibility with 0.2.x and 0.3.x (optional and object params)
    parentParams = isArray(parents[i].params) ? parents[i].params : objectKeys(parents[i].params);
    if (!parentParams.length) continue;

    for (var j in parentParams) {
      if (arraySearch(inheritList, parentParams[j]) >= 0) continue;
      inheritList.push(parentParams[j]);
      inherited[parentParams[j]] = currentParams[parentParams[j]];
    }
  }
  return extend({}, inherited, newParams);
}

function inherit(parent, extra) {
  return extend(new (extend(function () { }, {prototype: parent}))(), extra);
}

function onStateRegistered(callback) { stateRegisteredCallbacks.push(callback); }

mod_core.provider("uirextras_core", function() {
  var core = {
    internalStates: internalStates,
    onStateRegistered: onStateRegistered,
    forEach: forEach,
    extend: extend,
    isArray: isArray,
    map: map,
    keys: keys,
    filter: filter,
    filterObj: filterObj,
    ancestors: ancestors,
    objectKeys: objectKeys,
    protoKeys: protoKeys,
    arraySearch: arraySearch,
    inheritParams: inheritParams,
    inherit: inherit
  };

  angular.extend(this, core);

  this.$get = function() {
    return core;
  };
});


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
      if (options && options.ignoreDsr) {
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
      var redirect = lastSubstate[state.name];
      if (redirect && redirect[key]) {
        redirect = redirect[key];
      } else {
        redirect = cfg['default'];
      }
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

angular.module("ct.ui.router.extras.sticky", [ 'ct.ui.router.extras.core' ]);

var mod_sticky = angular.module("ct.ui.router.extras.sticky");

$StickyStateProvider.$inject = [ '$stateProvider', 'uirextras_coreProvider' ];
function $StickyStateProvider($stateProvider, uirextras_coreProvider) {
  var core = uirextras_coreProvider;
  var inheritParams = core.inheritParams;
  var objectKeys = core.objectKeys;
  var protoKeys = core.protoKeys;
  var forEach = core.forEach;
  var map = core.map;

  // Holds all the states which are inactivated.  Inactivated states can be either sticky states, or descendants of sticky states.
  var inactiveStates = {}; // state.name -> (state)
  var stickyStates = {}; // state.name -> true
  var $state;
  var DEBUG = false;

  // Called by $stateProvider.registerState();
  // registers a sticky state with $stickyStateProvider
  this.registerStickyState = function (state) {
    stickyStates[state.name] = state;
    // console.log("Registered sticky state: ", state);
  };

  this.enableDebug = this.debugMode = function (enabled) {
    if (angular.isDefined(enabled))
      DEBUG = enabled;
    return DEBUG;
  };

  this.$get = [  '$rootScope', '$state', '$stateParams', '$injector', '$log',
    function ($rootScope, $state, $stateParams, $injector, $log) {
      // Each inactive states is either a sticky state, or a child of a sticky state.
      // This function finds the closest ancestor sticky state, then find that state's parent.
      // Map all inactive states to their closest parent-to-sticky state.
      function mapInactives() {
        var mappedStates = {};
        angular.forEach(inactiveStates, function (state, name) {
          var stickyAncestors = getStickyStateStack(state);
          for (var i = 0; i < stickyAncestors.length; i++) {
            var parent = stickyAncestors[i].parent;
            mappedStates[parent.name] = mappedStates[parent.name] || [];
            mappedStates[parent.name].push(state);
          }
          if (mappedStates['']) {
            // This is necessary to compute Transition.inactives when there are sticky states are children to root state.
            mappedStates['__inactives'] = mappedStates[''];  // jshint ignore:line
          }
        });
        return mappedStates;
      }

      function mapInactivesByImmediateParent() {
        var inactivesByAllParents ={};
        forEach(inactiveStates, function(state) {
          forEach(state.path, function(ancestor) {
            if (ancestor === state) return;
            inactivesByAllParents[ancestor.name] = inactivesByAllParents[ancestor.name] || [];
            inactivesByAllParents[ancestor.name].push(state);
          });
        });
        return inactivesByAllParents;
      }

      // Given a state, returns all ancestor states which are sticky.
      // Walks up the view's state's ancestry tree and locates each ancestor state which is marked as sticky.
      // Returns an array populated with only those ancestor sticky states.
      function getStickyStateStack(state) {
        var stack = [];
        if (!state) return stack;
        do {
          if (state.sticky) stack.push(state);
          state = state.parent;
        } while (state);
        stack.reverse();
        return stack;
      }

      // Returns a sticky transition type necessary to enter the state.
      // Transition can be: reactivate, reload, or enter

      // Note: if a state is being reactivated but params dont match, we treat
      // it as a Exit/Enter, thus the special "reload" transition.
      // If a parent inactivated state has "reload" transition type, then
      // all descendant states must also be exit/entered, thus the first line of this function.
      function getEnterTransition(state, stateParams, reloadStateTree, ancestorReloaded) {
        if (ancestorReloaded) return "reload";
        var inactiveState = inactiveStates[state.self.name];
        if (!inactiveState) return "enter";
        if (state.self === reloadStateTree) return "reload";
        var paramsMatch = paramsEqualForState(state.ownParams, stateParams, inactiveState.locals.globals.$stateParams);
        return paramsMatch ? "reactivate" : "reload";
      }

      // Given a state and (optional) stateParams, returns the inactivated state from the inactive sticky state registry.
      function getInactivatedState(state, stateParams) {
        var inactiveState = inactiveStates[state.name];
        if (!inactiveState) return null;
        if (!stateParams) return inactiveState;
        var paramsMatch = paramsEqualForState(state.ownParams, stateParams, inactiveState.locals.globals.$stateParams);
        return paramsMatch ? inactiveState : null;
      }

      function paramsEqualForState(ownParams, stateParams, stateParams2) {
        if (typeof ownParams.$$equals === 'function')
          return ownParams.$$equals(stateParams, stateParams2);
        return equalForKeys(stateParams, stateParams2, ownParams);
      }

      // Duplicates logic in $state.transitionTo, primarily to find the pivot state (i.e., the "keep" value)
      function equalForKeys(a, b, keys) {
        if (!angular.isArray(keys) && angular.isObject(keys)) {
          keys = protoKeys(keys, ["$$keys", "$$values", "$$equals", "$$validates", "$$new", "$$parent"]);
        }
        if (!keys) {
          keys = [];
          for (var n in a) keys.push(n); // Used instead of Object.keys() for IE8 compatibility
        }

        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          if (a[k] != b[k]) return false; // Not '===', values aren't necessarily normalized
        }
        return true;
      }

      function calcTreeChanges(transition) {
        var fromPath = transition.fromState.path;
        var toPath = transition.toState.path;
        var toParams = transition.toParams;
        var keep = 0, state = toPath[keep];

        if (transition.options && transition.options.inherit) {
          toParams = transition.toParams =
              inheritParams($stateParams, toParams || {}, $state.$current, transition.toState);
        }

        while (state && state === fromPath[keep] && paramsEqualForState(state.ownParams, toParams, transition.fromParams)) {
          // We're "keeping" this state. bump keep var and get the next state in toPath for the next iteration.
          state = toPath[++keep];
        }

        return {
          keep: keep,
          retained: fromPath.slice(0, keep),
          exiting: fromPath.slice(keep),
          entering: toPath.slice(keep)
        };
      }

      function sortByStateDepth(a,b) {
        return a.name.split(".").length - b.name.split(".").length;
      }

      var stickySupport = {
        getInactiveStates: function () {
          return map(inactiveStates, angular.identity).sort(sortByStateDepth);
        },
        getInactiveStatesByParent: function () {
          return mapInactives();
        },
        // Main API for $stickyState, used by $state.
        // Processes a potential transition, returns an object with the following attributes:
        // {
        //    keep: The number of states being "kept"
        //    inactives: Array of all states which will be inactive if the transition is completed.
        //    reactivatingStates: Array of all states which will be reactivated if the transition is completed.
        //    orphans: Array of previously inactive states, which are being orphaned by the transition
        //        Note: Transitioning directly to an inactive state with inactive children will reactivate the state, but exit all the inactive children.
        //    enter: Enter transition type for all added states.  This is a parallel array to "toStates" array in $state.transitionTo.
        //    exit: Exit transition type for all removed states.  This is a parallel array to "fromStates" array in $state.transitionTo.
        // }
        processTransition: function (transition) {
          var treeChanges = calcTreeChanges(transition);
          var currentInactives = stickySupport.getInactiveStates();
          var futureInactives, exitingTypes, enteringTypes;
          var keep = treeChanges.keep;


          /////////////////////////////////////////
          // helper functions
          function notIn(array) { return function (elem) { return array.indexOf(elem) === -1; }; }
          function flattenReduce(memo, list) { return memo.concat(list); }
          function uniqReduce(memo, orphan) { if (notIn(memo)(orphan)) memo.push(orphan); return memo; }
          function prop(attr) { return function(obj) { return obj[attr]; } }
          function typeIs(type) { return function(obj) { return obj.type === type; } }
          function isChildOf(state) { return function(other) { return other.parent === state; }; }
          var notEntering = notIn(treeChanges.entering);
          function notSticky(state) { return !state.sticky; }
          ////////////////////////////////////


          // Calculate the "exit" transition types for states being exited in fromPath
          // Exit types will be either "inactivate" or "exit"
          // Two things must be satisfied in order to inactivate the "exiting" states (instead of exit them):
          // - The first element of the exiting path must be sticky
          // - We must be entering any sibling state of the sticky (we can check this using entering.length)
          var shouldInactivate = treeChanges.exiting[0] && treeChanges.exiting[0].sticky && treeChanges.entering.length > 0;
          exitingTypes = treeChanges.exiting.map(function (state) {
              var stateRentering = treeChanges.entering.indexOf(state) !== -1;
              var type = shouldInactivate && !stateRentering ? "inactivate" : "exit";
              return { type: type, state: state };
          });


          // Calculate the "enter" transition types for states being entered in toPath
          // Enter types will be either "enter", "reactivate", or "reload" where:
          //   enter: full resolve, no special logic
          //   reactivate: use previous locals
          //   reload: like 'enter', except exit the inactive state before entering it.
          var reloaded = transition.options && !!transition.options.reload;
          enteringTypes = treeChanges.entering.map(function(state) {
            var type = getEnterTransition(state, transition.toParams, transition.reloadStateTree, reloaded);
            reloaded = reloaded || type === 'reload';
            return { type: type, state: state };
          });

          // Find all the "orphaned" states.  those states that are :
          //  - are siblings of the entering states
          //  - previously inactive
          //  - are not being reactivated (entered)
          //  - are not sticky
          // unioned with:
          //  - children of the toState
          //  - previously inactive
          //
          // Given:
          //   - states A (sticky: true), B, A.foo, A.bar
          //   - A.foo is currently inactive
          //   - B is currently active
          // Orphan case 1)
          //   - Transition to A.bar orphans the inactive state A.foo; it should be exited
          // Orphan case 2)
          //   - Transition directly to A orphans the inactive state A.foo; it should be exited
          //
          // Given:
          //   - states A (sticky: true), B, A.foo (sticky), A.bar
          //   - A.foo is currently inactive
          //   - B is currently active
          // Orphan case 3)
          //   - Transition directly to A orphans the inactive sticky state A.foo; it should be exited
          // Note: transition from B to A.bar does not orphan A.foo
          // Note 2: each orphaned state might be the parent of a larger inactive subtree.
          var orphanedRoots = treeChanges.entering
              // For each entering state in the path, find all sibling states which are currently inactive
              .map(function (entering) { return currentInactives.filter(isChildOf(entering.parent)); })
              // Flatten nested arrays. Now we have an array of inactive states that are children of the ones being entered.
              .reduce(flattenReduce, [])
              // Consider "orphaned": only those children that are themselves not currently being entered
              .filter(notEntering)
              // Consider "orphaned": only those children that are not themselves sticky states.
              .filter(notSticky)
              // Finally, union that set with any inactive children of the "to state"
              .concat(currentInactives.filter(isChildOf(transition.toState)));

          var currentInactivesByParent = mapInactivesByImmediateParent();
          var allOrphans = orphanedRoots
              .map(function(root) { return currentInactivesByParent[root.name] })
              .filter(angular.isDefined)
              .reduce(flattenReduce, [])
              .concat(orphanedRoots)
              // Sort by depth to exit orphans in proper order
              .sort(sortByStateDepth);

          // Add them to the list of states being exited.
          var exitOrOrphaned = exitingTypes
              .filter(typeIs("exit"))
              .map(prop("state"))
              .concat(allOrphans);

          // Now calculate the states that will be inactive if this transition succeeds.
          // We have already pushed the transitionType == "inactivate" states to 'inactives'.
          // Second, add all the existing inactive states
          futureInactives = currentInactives
              .filter(notIn(exitOrOrphaned))
              .filter(notIn(treeChanges.entering))
              .concat(exitingTypes.filter(typeIs("inactivate")).map(prop("state")))
              .sort(sortByStateDepth);

          return {
            keep: keep,
            enter: new Array(keep).concat(enteringTypes.map(prop("type"))),
            exit: new Array(keep).concat(exitingTypes.map(prop("type"))),
            inactives: futureInactives,
            reactivatingStates: enteringTypes.filter(typeIs("reactivate")).map(prop("state")),
            orphans: allOrphans
          };
        },

        // Adds a state to the inactivated sticky state registry.
        stateInactivated: function (state) {
          // Keep locals around.
          inactiveStates[state.self.name] = state;
          // Notify states they are being Inactivated (i.e., a different
          // sticky state tree is now active).
          state.self.status = 'inactive';
          if (state.self.onInactivate)
            $injector.invoke(state.self.onInactivate, state.self, state.locals.globals);
        },

        // Removes a previously inactivated state from the inactive sticky state registry
        stateReactivated: function (state) {
          if (inactiveStates[state.self.name]) {
            delete inactiveStates[state.self.name];
          }
          state.self.status = 'entered';
//        if (state.locals == null || state.locals.globals == null) debugger;
          if (state.self.onReactivate)
            $injector.invoke(state.self.onReactivate, state.self, state.locals.globals);
        },

        // Exits all inactivated descendant substates when the ancestor state is exited.
        // When transitionTo is exiting a state, this function is called with the state being exited.  It checks the
        // registry of inactivated states for descendants of the exited state and also exits those descendants.  It then
        // removes the locals and de-registers the state from the inactivated registry.
        stateExiting: function (exiting, exitQueue, onExit) {
          var exitingNames = {};
          angular.forEach(exitQueue, function (state) {
            exitingNames[state.self.name] = true;
          });

          angular.forEach(inactiveStates, function (inactiveExiting, name) {
            // TODO: Might need to run the inactivations in the proper depth-first order?
            if (!exitingNames[name] && inactiveExiting.includes[exiting.name]) {
              if (DEBUG) $log.debug("Exiting " + name + " because it's a substate of " + exiting.name + " and wasn't found in ", exitingNames);
              if (inactiveExiting.self.onExit)
                $injector.invoke(inactiveExiting.self.onExit, inactiveExiting.self, inactiveExiting.locals.globals);
              angular.forEach(inactiveExiting.locals, function(localval, key) {
                delete inactivePseudoState.locals[key];
              });
              inactiveExiting.locals = null;
              inactiveExiting.self.status = 'exited';
              delete inactiveStates[name];
            }
          });

          if (onExit)
            $injector.invoke(onExit, exiting.self, exiting.locals.globals);
          exiting.locals = null;
          exiting.self.status = 'exited';
          delete inactiveStates[exiting.self.name];
        },

        // Removes a previously inactivated state from the inactive sticky state registry
        stateEntering: function (entering, params, onEnter, updateParams) {
          var inactivatedState = getInactivatedState(entering);
          if (inactivatedState && (updateParams || !getInactivatedState(entering, params))) {
            var savedLocals = entering.locals;
            this.stateExiting(inactivatedState);
            entering.locals = savedLocals;
          }
          entering.self.status = 'entered';

          if (onEnter)
            $injector.invoke(onEnter, entering.self, entering.locals.globals);
        },
        reset: function reset(inactiveState, params) {
          function resetOne(state) { stickySupport.reset(state); }
          if (inactiveState === "*") {
            angular.forEach(stickySupport.getInactiveStates(), resetOne);
            return true;
          }
          var state = $state.get(inactiveState);
          if (!state) return false;
          var exiting = getInactivatedState(state, params);
          if (!exiting) return false;
          stickySupport.stateExiting(exiting);
          $rootScope.$broadcast("$viewContentLoading");
          return true;
        }
      };

      return stickySupport;
    }];
}

mod_sticky.provider("$stickyState", $StickyStateProvider);

/**
 * Sticky States makes entire state trees "sticky". Sticky state trees are retained until their parent state is
 * exited. This can be useful to allow multiple modules, peers to each other, each module having its own independent
 * state tree.  The peer modules can be activated and inactivated without any loss of their internal context, including
 * DOM content such as unvalidated/partially filled in forms, and even scroll position.
 *
 * DOM content is retained by declaring a named ui-view in the parent state, and filling it in with a named view from the
 * sticky state.
 *
 * Technical overview:
 *
 * ---PATHS---
 * UI-Router uses state paths to manage entering and exiting of individual states.  Each state "A.B.C.X" has its own path, starting
 * from the root state ("") and ending at the state "X".  The path is composed the final state "X"'s ancestors, e.g.,
 * [ "", "A", "B", "C", "X" ].
 *
 * When a transition is processed, the previous path (fromState.path) is compared with the requested destination path
 * (toState.path).  All states that the from and to paths have in common are "kept" during the transition.  The last
 * "kept" element in the path is the "pivot".
 *
 * ---VIEWS---
 * A View in UI-Router consists of a controller and a template.  Each view belongs to one state, and a state can have many
 * views.  Each view plugs into a ui-view element in the DOM of one of the parent state's view(s).
 *
 * View context is managed in UI-Router using a 'state locals' concept. When a state's views are fully loaded, those views
 * are placed on the states 'locals' object.  Each locals object prototypally inherits from its parent state's locals object.
 * This means that state "A.B.C.X"'s locals object also has all of state "A.B.C"'s locals as well as those from "A.B" and "A".
 * The root state ("") defines no views, but it is included in the protypal inheritance chain.
 *
 * The locals object is used by the ui-view directive to load the template, render the content, create the child scope,
 * initialize the controller, etc.  The ui-view directives caches the locals in a closure variable.  If the locals are
 * identical (===), then the ui-view directive exits early, and does no rendering.
 *
 * In stock UI-Router, when a state is exited, that state's locals object is deleted and those views are cleaned up by
 * the ui-view directive shortly.
 *
 * ---Sticky States---
 * UI-Router Extras keeps views for inactive states live, even when UI-Router thinks it has exited them.  It does this
 * by creating a pseudo state called "__inactives" that is the parent of the root state.  It also then defines a locals
 * object on the "__inactives" state, which the root state protoypally inherits from.  By doing this, views for inactive
 * states are accessible through locals object's protoypal inheritance chain from any state in the system.
 *
 * ---Transitions---
 * UI-Router Extras decorates the $state.transitionTo function.  While a transition is in progress, the toState and
 * fromState internal state representations are modified in order to coerce stock UI-Router's transitionTo() into performing
 * the appropriate operations.  When the transition promise is completed, the original toState and fromState values are
 * restored.
 *
 * Stock UI-Router's $state.transitionTo function uses toState.path and fromState.path to manage entering and exiting
 * states.  UI-Router Extras takes advantage of those internal implementation details and prepares a toState.path and
 * fromState.path which coerces UI-Router into entering and exiting the correct states, or more importantly, not entering
 * and not exiting inactive or sticky states.  It also replaces state.self.onEnter and state.self.onExit for elements in
 * the paths when they are being inactivated or reactivated.
 */



// ------------------------ Sticky State module-level variables -----------------------------------------------
var _StickyState; // internal reference to $stickyStateProvider
var internalStates = {}; // Map { statename -> InternalStateObj } holds internal representation of all states
var root, // Root state, internal representation
  pendingTransitions = [], // One transition may supersede another.  This holds references to all pending transitions
  pendingRestore, // The restore function from the superseded transition
  inactivePseudoState, // This pseudo state holds all the inactive states' locals (resolved state data, such as views etc)
  reactivatingLocals = { }, // This is a prent locals to the inactivePseudoState locals, used to hold locals for states being reactivated
  versionHeuristics = { // Heuristics used to guess the current UI-Router Version
    hasParamSet: false
  };

// Creates a blank surrogate state
function SurrogateState(type) {
  return {
    resolve: { },
    locals: {
      globals: root && root.locals && root.locals.globals
    },
    views: { },
    self: { },
    params: { },
    ownParams: ( versionHeuristics.hasParamSet ? { $$equals: function() { return true; } } : []),
    surrogateType: type
  };
}

// ------------------------ Sticky State registration and initialization code ----------------------------------
// Grab a copy of the $stickyState service for use by the transition management code
angular.module("ct.ui.router.extras.sticky").run(["$stickyState", function ($stickyState) {
  _StickyState = $stickyState;
}]);

angular.module("ct.ui.router.extras.sticky").config(
  [ "$provide", "$stateProvider", '$stickyStateProvider', '$urlMatcherFactoryProvider', 'uirextras_coreProvider',
    function ($provide, $stateProvider, $stickyStateProvider, $urlMatcherFactoryProvider, uirextras_coreProvider) {
      var core = uirextras_coreProvider;
      var internalStates = core.internalStates;
      var inherit = core.inherit;
      var inheritParams = core.inheritParams;
      var forEach = core.forEach;
      var map = core.map;
      var filterObj = core.filterObj;

      versionHeuristics.hasParamSet = !!$urlMatcherFactoryProvider.ParamSet;
      // inactivePseudoState (__inactives) holds all the inactive locals which includes resolved states data, i.e., views, scope, etc
      inactivePseudoState = angular.extend(new SurrogateState("__inactives"), { self: {  name: '__inactives'  } });
      // Reset other module scoped variables.  This is to primarily to flush any previous state during karma runs.
      root = pendingRestore = undefined;
      pendingTransitions = [];

      uirextras_coreProvider.onStateRegistered(function(state) {
        // Register the ones marked as "sticky"
        if (state.self.sticky === true) {
          $stickyStateProvider.registerStickyState(state.self);
        }
      });

      var $state_transitionTo; // internal reference to the real $state.transitionTo function
      // Decorate the $state service, so we can decorate the $state.transitionTo() function with sticky state stuff.
      $provide.decorator("$state", ['$delegate', '$log', '$q', function ($state, $log, $q) {
        // Note: this code gets run only on the first state that is decorated
        root = $state.$current;
        internalStates[""] = root;
        root.parent = inactivePseudoState; // Make inactivePsuedoState the parent of root.  "wat"
        inactivePseudoState.parent = undefined; // Make inactivePsuedoState the real root.
        // Add another locals bucket, as a parent to inactivatePseudoState locals.
        // This is for temporary storage of locals of states being reactivated while a transition is pending
        // This is necessary in some cases where $viewContentLoading is triggered before the $state.$current is updated to the toState.
        inactivePseudoState.locals = inherit(reactivatingLocals, inactivePseudoState.locals);
        root.locals = inherit(inactivePseudoState.locals, root.locals); // make root locals extend the __inactives locals.
        delete inactivePseudoState.locals.globals;

        // Hold on to the real $state.transitionTo in a module-scope variable.
        $state_transitionTo = $state.transitionTo;

        // ------------------------ Decorated transitionTo implementation begins here ---------------------------
        $state.transitionTo = function (to, toParams, options) {
          var DEBUG = $stickyStateProvider.debugMode();
          // TODO: Move this to module.run?
          // TODO: I'd rather have root.locals prototypally inherit from inactivePseudoState.locals
          // Link root.locals and inactives.locals.  Do this at runtime, after root.locals has been set.
          if (!inactivePseudoState.locals)
            inactivePseudoState.locals = root.locals;
          var idx = pendingTransitions.length;
          if (pendingRestore) {
            pendingRestore();
            if (DEBUG) {
              $log.debug("Restored paths from pending transition");
            }
          }

          var fromState = $state.$current, fromParams = $state.params;
          var rel = options && options.relative || $state.$current; // Not sure if/when $state.$current is appropriate here.
          var toStateSelf = $state.get(to, rel); // exposes findState relative path functionality, returns state.self
          var savedToStatePath, savedFromStatePath, stickyTransitions;
          var reactivated = [], exited = [], terminalReactivatedState;
          toParams = toParams || {};
          arguments[1] = toParams;

          var noop = function () {
          };
          // Sticky states works by modifying the internal state objects of toState and fromState, especially their .path(s).
          // The restore() function is a closure scoped function that restores those states' definitions to their original values.
          var restore = function () {
            if (savedToStatePath) {
              toState.path = savedToStatePath;
              savedToStatePath = null;
            }

            if (savedFromStatePath) {
              fromState.path = savedFromStatePath;
              savedFromStatePath = null;
            }

            angular.forEach(restore.restoreFunctions, function (restoreFunction) {
              restoreFunction();
            });
            // Restore is done, now set the restore function to noop in case it gets called again.
            restore = noop;
            // pendingRestore keeps track of a transition that is in progress.  It allows the decorated transitionTo
            // method to be re-entrant (for example, when superceding a transition, i.e., redirect).  The decorated
            // transitionTo checks right away if there is a pending transition in progress and restores the paths
            // if so using pendingRestore.
            pendingRestore = null;
            pendingTransitions.splice(idx, 1); // Remove this transition from the list
          };

          // All decorated transitions have their toState.path and fromState.path replaced.  Surrogate states also make
          // additional changes to the states definition before handing the transition off to UI-Router. In particular,
          // certain types of surrogate states modify the state.self object's onEnter or onExit callbacks.
          // Those surrogate states must then register additional restore steps using restore.addRestoreFunction(fn)
          restore.restoreFunctions = [];
          restore.addRestoreFunction = function addRestoreFunction(fn) {
            this.restoreFunctions.push(fn);
          };


          // --------------------- Surrogate State Functions ------------------------
          // During a transition, the .path arrays in toState and fromState are replaced.  Individual path elements
          // (states) which aren't being "kept" are replaced with surrogate elements (states).  This section of the code
          // has factory functions for all the different types of surrogate states.


          function stateReactivatedSurrogatePhase1(state) {
            var surrogate = angular.extend(new SurrogateState("reactivate_phase1"), { locals: state.locals });
            surrogate.self = angular.extend({}, state.self);
            return surrogate;
          }

          function stateReactivatedSurrogatePhase2(state) {
            var surrogate = angular.extend(new SurrogateState("reactivate_phase2"), state);
            var oldOnEnter = surrogate.self.onEnter;
            surrogate.resolve = {}; // Don't re-resolve when reactivating states (fixes issue #22)
            // TODO: Not 100% sure if this is necessary.  I think resolveState will load the views if I don't do this.
            surrogate.views = {}; // Don't re-activate controllers when reactivating states (fixes issue #22)
            surrogate.self.onEnter = function () {
              // ui-router sets locals on the surrogate to a blank locals (because we gave it nothing to resolve)
              // Re-set it back to the already loaded state.locals here.
              surrogate.locals = state.locals;
              _StickyState.stateReactivated(state);
            };
            restore.addRestoreFunction(function () {
              state.self.onEnter = oldOnEnter;
            });
            return surrogate;
          }

          function stateInactivatedSurrogate(state) {
            var surrogate = new SurrogateState("inactivate");
            surrogate.self = state.self;
            var oldOnExit = state.self.onExit;
            surrogate.self.onExit = function () {
              _StickyState.stateInactivated(state);
            };
            restore.addRestoreFunction(function () {
              state.self.onExit = oldOnExit;
            });
            return surrogate;
          }

          function stateEnteredSurrogate(state, toParams) {
            var oldOnEnter = state.self.onEnter;
            state.self.onEnter = function () {
              _StickyState.stateEntering(state, toParams, oldOnEnter);
            };
            restore.addRestoreFunction(function () {
              state.self.onEnter = oldOnEnter;
            });

            return state;
          }

          // TODO: This may be completely unnecessary now that we're using $$uirouterextrasreload temp param
          function stateUpdateParamsSurrogate(state, toParams) {
            var oldOnEnter = state.self.onEnter;
            state.self.onEnter = function () {
              _StickyState.stateEntering(state, toParams, oldOnEnter, true);
            };
            restore.addRestoreFunction(function () {
              state.self.onEnter = oldOnEnter;
            });

            return state;
          }

          function stateExitedSurrogate(state) {
            var oldOnExit = state.self.onExit;
            state.self.onExit = function () {
              _StickyState.stateExiting(state, exited, oldOnExit);
            };
            restore.addRestoreFunction(function () {
              state.self.onExit = oldOnExit;
            });

            return state;
          }


          // --------------------- decorated .transitionTo() logic starts here ------------------------
          if (toStateSelf) {
            var toState = internalStates[toStateSelf.name]; // have the state, now grab the internal state representation
            if (toState) {
              // Save the toState and fromState paths to be restored using restore()
              savedToStatePath = toState.path;
              savedFromStatePath = fromState.path;

              // Try to resolve options.reload to a state.  If so, we'll reload only up to the given state.
              var reload = options && options.reload || false;
              var reloadStateTree = reload && (reload === true ? savedToStatePath[0].self : $state.get(reload, rel));
              // If options.reload is a string or a state, we want to handle reload ourselves and not
              // let ui-router reload the entire toPath.
              if (options && reload && reload !== true)
                delete options.reload;

              var currentTransition = {
                toState: toState,
                toParams: toParams || {},
                fromState: fromState,
                fromParams: fromParams || {},
                options: options,
                reloadStateTree: reloadStateTree
              };

              pendingTransitions.push(currentTransition); // TODO: See if a list of pending transitions is necessary.
              pendingRestore = restore;

              // If we're reloading from a state and below, temporarily add a param to the top of the state tree
              // being reloaded, and add a param value to the transition.  This will cause the "has params changed
              // for state" check to return true, and the states will be reloaded.
              if (reloadStateTree) {
                currentTransition.toParams.$$uirouterextrasreload = Math.random();
                var params = reloadStateTree.$$state().params;
                var ownParams = reloadStateTree.$$state().ownParams;

                if (versionHeuristics.hasParamSet) {
                  var tempParam = new $urlMatcherFactoryProvider.Param('$$uirouterextrasreload');
                  params.$$uirouterextrasreload = ownParams.$$uirouterextrasreload = tempParam;
                  restore.restoreFunctions.push(function() {
                    delete params.$$uirouterextrasreload;
                    delete ownParams.$$uirouterextrasreload;
                  });
                } else {
                  params.push('$$uirouterextrasreload');
                  ownParams.push('$$uirouterextrasreload');
                  restore.restoreFunctions.push(function() {
                    params.length = params.length -1;
                    ownParams.length = ownParams.length -1;
                  });
                }
              }

              // $StickyStateProvider.processTransition analyzes the states involved in the pending transition.  It
              // returns an object that tells us:
              // 1) if we're involved in a sticky-type transition
              // 2) what types of exit transitions will occur for each "exited" path element
              // 3) what types of enter transitions will occur for each "entered" path element
              // 4) which states will be inactive if the transition succeeds.
              stickyTransitions = _StickyState.processTransition(currentTransition);

              if (DEBUG) debugTransition($log, currentTransition, stickyTransitions);

              // Begin processing of surrogate to and from paths.
              var surrogateToPath = toState.path.slice(0, stickyTransitions.keep);
              var surrogateFromPath = fromState.path.slice(0, stickyTransitions.keep);

              // Clear out and reload inactivePseudoState.locals each time transitionTo is called
              angular.forEach(inactivePseudoState.locals, function (local, name) {
                if (name.indexOf("@") != -1) delete inactivePseudoState.locals[name];
              });

              var saveViewsToLocals = function (targetObj) {
                return function(view, name) {
                  if (name.indexOf("@") !== -1) { // Only grab this state's "view" locals
                    targetObj[name] = view; // Add all inactive views not already included.
                  }
                }
              };

              // For each state that will be inactive when the transition is complete, place its view-locals on the
              // __inactives pseudostate's .locals.  This allows the ui-view directive to access them and
              // render the inactive views.
              forEach(stickyTransitions.inactives, function(state) {
                forEach(state.locals, saveViewsToLocals(inactivePseudoState.locals))
              });

              // For each state that will be reactivated during the transition, place its view-locals on a separate
              // locals object (prototypal parent of __inactives.locals, and remove them when the transition is complete.
              // This is necessary when we a transition will reactivate one state, but enter a second.
              // Gory details:
              //   - the entering of a new state causes $view.load() to fire $viewContentLoading while the transition is
              //     still in process
              //   - all ui-view(s) check if they should re-render themselves in response to this event.
              //   - ui-view checks if previousLocals is equal to currentLocals
              //     - it uses $state.$current.locals[myViewName] for previousLocals
              //   - Because the transition is not completed, $state.$current is set to the from state, and
              //     the ui-view for a reactivated state cannot find its previous locals.
              forEach(stickyTransitions.reactivatingStates, function(state) {
                forEach(state.locals, saveViewsToLocals(reactivatingLocals));
              });

              // When the transition is complete, remove the copies of the view locals from reactivatingLocals.
              restore.addRestoreFunction(function clearReactivatingLocals() {
                forEach(reactivatingLocals, function (val, viewname) {
                  delete reactivatingLocals[viewname];
                })
              });

              // Find all the states the transition will be entering.  For each entered state, check entered-state-transition-type
              // Depending on the entered-state transition type, place the proper surrogate state on the surrogate toPath.
              angular.forEach(stickyTransitions.enter, function (value, idx) {
                var surrogate;
                var enteringState = toState.path[idx];
                if (value === "reactivate") {
                  // Reactivated states require TWO surrogates.  The "phase 1 reactivated surrogates" are added to both
                  // to.path and from.path, and as such, are considered to be "kept" by UI-Router.
                  // This is required to get UI-Router to add the surrogate locals to the protoypal locals object
                  surrogate = stateReactivatedSurrogatePhase1(enteringState);
                  surrogateToPath.push(surrogate);
                  surrogateFromPath.push(surrogate);  // so toPath[i] === fromPath[i]

                  // The "phase 2 reactivated surrogate" is added to the END of the .path, after all the phase 1
                  // surrogates have been added.
                  reactivated.push(stateReactivatedSurrogatePhase2(enteringState));
                  terminalReactivatedState = enteringState;
                } else if (value === "reload") {
                  // If the state params have been changed, we need to exit any inactive states and re-enter them.
                  surrogateToPath.push(stateUpdateParamsSurrogate(enteringState));
                  terminalReactivatedState = enteringState;
                } else if (value === "enter") {
                  // Standard enter transition.  We still wrap it in a surrogate.
                  surrogateToPath.push(stateEnteredSurrogate(enteringState));
                }
              });

              // Find all the states the transition will be exiting.  For each exited state, check the exited-state-transition-type.
              // Depending on the exited-state transition type, place a surrogate state on the surrogate fromPath.
              angular.forEach(stickyTransitions.exit, function (value, idx) {
                var exiting = fromState.path[idx];
                if (value === "inactivate") {
                  surrogateFromPath.push(stateInactivatedSurrogate(exiting));
                  exited.push(exiting);
                } else if (value === "exit") {
                  surrogateFromPath.push(stateExitedSurrogate(exiting));
                  exited.push(exiting);
                }
              });

              // Add surrogate states for reactivated to ToPath again (phase 2), this time without a matching FromPath entry
              // This is to get ui-router to call the surrogate's onEnter callback.
              if (reactivated.length) {
                angular.forEach(reactivated, function (surrogate) {
                  surrogateToPath.push(surrogate);
                });
              }

              // We may transition directly to an inactivated state, reactivating it.  In this case, we should
              // exit all of that state's inactivated children.
              var orphans = stickyTransitions.orphans;
              // Add surrogate exited states for all orphaned descendants of the Deepest Reactivated State
              surrogateFromPath = surrogateFromPath.concat(map(orphans, function (exiting) {
                return stateExitedSurrogate(exiting);
              }));
              exited = exited.concat(orphans);

              // Replace the .path variables.  toState.path and fromState.path are now ready for a sticky transition.
              fromState.path = surrogateFromPath;
              toState.path = surrogateToPath;

              var pathMessage = function (state) {
                return (state.surrogateType ? state.surrogateType + ":" : "") + state.self.name;
              };
              if (DEBUG) $log.debug("SurrogateFromPath: ", map(surrogateFromPath, pathMessage));
              if (DEBUG) $log.debug("SurrogateToPath:   ", map(surrogateToPath, pathMessage));
            }
          }

          // toState and fromState are all set up; now run stock UI-Router's $state.transitionTo().
          var transitionPromise = $state_transitionTo.apply($state, arguments);

          // Add post-transition promise handlers, then return the promise to the original caller.
          return transitionPromise.then(function transitionSuccess(state) {
            // First, restore toState and fromState to their original values.
            restore();
            if (DEBUG)  debugViewsAfterSuccess($log, internalStates[state.name], $state);

            state.status = 'active';  // TODO: This status is used in statevis.js, and almost certainly belongs elsewhere.

            return state;
          }, function transitionFailed(err) {
            restore();
            if (DEBUG &&
              err.message !== "transition prevented" &&
              err.message !== "transition aborted" &&
              err.message !== "transition superseded") {
              $log.debug("transition failed", err);
              $log.debug(err.stack);
            }
            return $q.reject(err);
          });
        };
        return $state;
      }]);



      function debugTransition($log, currentTransition, stickyTransition) {
        function message(path, index, state) {
          return (path[index] ? path[index].toUpperCase() + ": " + state.self.name : "(" + state.self.name + ")");
        }

        var inactiveLogVar = map(stickyTransition.inactives, function (state) {
          return state.self.name;
        });
        var enterLogVar = map(currentTransition.toState.path, function (state, index) {
          return message(stickyTransition.enter, index, state);
        });
        var exitLogVar = map(currentTransition.fromState.path, function (state, index) {
          return message(stickyTransition.exit, index, state);
        });

        var transitionMessage = currentTransition.fromState.self.name + ": " +
          angular.toJson(currentTransition.fromParams) + ": " +
          " -> " +
          currentTransition.toState.self.name + ": " +
          angular.toJson(currentTransition.toParams);

        $log.debug("------------------------------------------------------");
        $log.debug("   Current transition: ", transitionMessage);
        $log.debug("Before transition, inactives are:   : ", map(_StickyState.getInactiveStates(), function (s) {
          return s.self.name;
        }));
        $log.debug("After transition,  inactives will be: ", inactiveLogVar);
        $log.debug("Transition will exit:  ", exitLogVar);
        $log.debug("Transition will enter: ", enterLogVar);
      }

      function debugViewsAfterSuccess($log, currentState, $state) {
        $log.debug("Current state: " + currentState.self.name + ", inactive states: ", map(_StickyState.getInactiveStates(), function (s) {
          return s.self.name;
        }));

        var statesOnly = function (local, name) {
          return name != 'globals' && name != 'resolve';
        };

        var viewsForState = function (state) {
          var viewLocals = filterObj(state.locals, statesOnly);

          if (!Object.keys(viewLocals).length) {
            viewLocals[''] = { $$state: { name: null } };
          }

          return map(viewLocals, function(local, name) {
            return {
              localsFor: state.self.name ? state.self.name : "(root)",
              uiViewName: name || null,
              filledByState: local.$$state.name
            };
          });
        };

        var viewsByState = viewsForState(currentState);
        var parent = currentState.parent;
        while (parent && parent !== currentState) {
          viewsByState = viewsByState.concat(viewsForState(parent));
          currentState = parent;
          parent = currentState.parent;
        }

        $log.debug("Views active on each state:");
        console.table(viewsByState.reverse());
      }
    }
  ]
);

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
        var pattern;
        if (futureParent.urlMatcher) {
          pattern = futureParent.urlMatcher.source.replace(/\*rest$/, "");
        }
        else {
          // if the futureParent doesn't have a urlMatcher, then we are still
          // starting from the beginning of the path
          pattern = "";
        }
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
              $state.go(unfoundState.to, unfoundState.toParams, unfoundState.options);
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

angular.module('ct.ui.router.extras.previous', [ 'ct.ui.router.extras.core', 'ct.ui.router.extras.transition' ]).service("$previousState",
  [ '$rootScope', '$state', '$q',
    function ($rootScope, $state, $q) {
      var previous = null, lastPrevious = null, memos = {};

      $rootScope.$on("$transitionStart", function(evt, $transition$) {
        var from = $transition$.from;
        // Check if the fromState is navigable before tracking it.
        // Root state doesn't get decorated with $$state().  Doh.
        var fromState = from.state && from.state.$$state && from.state.$$state();
        function commit() { lastPrevious = null; }
        function revert() { previous = lastPrevious; }
        if (fromState) {
          lastPrevious = previous;
          previous = $transition$.from;

          $transition$.promise.then(commit)['catch'](revert);
        }
      });

      var $previousState = {
        get: function (memoName) {
          return memoName ? memos[memoName] : previous;
        },
        set: function (memoName, previousState, previousParams) {
          memos[memoName] = { state: $state.get(previousState), params: previousParams };
        },
        go: function (memoName, options) {
          var to = $previousState.get(memoName);
          if (!to) {
            return $q.reject(new Error('no previous state ' + (memoName ? 'for memo: ' + memoName : '')));
          }
          return $state.go(to.state, to.params, options);
        },
        memo: function (memoName, defaultStateName, defaultStateParams) {
          memos[memoName] = previous || { state: $state.get(defaultStateName), params: defaultStateParams };
        },
        forget: function (memoName) {
          if (memoName) {
            delete memos[memoName];
          } else {
            previous = undefined;
          }
        }
      };

      return $previousState;
    }
  ]
);

angular.module('ct.ui.router.extras.previous').run(['$previousState', function ($previousState) {
  // Inject $previousState so it can register $rootScope events
}]);


angular.module("ct.ui.router.extras.transition", [ 'ct.ui.router.extras.core' ]).config( [ "$provide",  function ($provide) {
      // Decorate the $state service, so we can replace $state.transitionTo()
      $provide.decorator("$state", ['$delegate', '$rootScope', '$q', '$injector',
        function ($state, $rootScope, $q, $injector) {
          // Keep an internal reference to the real $state.transitionTo function
          var $state_transitionTo = $state.transitionTo;
          // $state.transitionTo can be re-entered.  Keep track of re-entrant stack
          var transitionDepth = -1;
          var tDataStack = [];
          var restoreFnStack = [];

          // This function decorates the $injector, adding { $transition$: tData } to invoke() and instantiate() locals.
          // It returns a function that restores $injector to its previous state.
          function decorateInjector(tData) {
            var oldinvoke = $injector.invoke;
            var oldinstantiate = $injector.instantiate;
            $injector.invoke = function (fn, self, locals) {
              return oldinvoke(fn, self, angular.extend({$transition$: tData}, locals));
            };
            $injector.instantiate = function (fn, locals) {
              return oldinstantiate(fn, angular.extend({$transition$: tData}, locals));
            };

            return function restoreItems() {
              $injector.invoke = oldinvoke;
              $injector.instantiate = oldinstantiate;
            };
          }

          function popStack() {
            restoreFnStack.pop()();
            tDataStack.pop();
            transitionDepth--;
          }

          // This promise callback (for when the real transitionTo is successful) runs the restore function for the
          // current stack level, then broadcasts the $transitionSuccess event.
          function transitionSuccess(deferred, tSuccess) {
            return function successFn(data) {
              popStack();
              $rootScope.$broadcast("$transitionSuccess", tSuccess);
              deferred.resolve(data); // $transition$ deferred
              return data;
            };
          }

          // This promise callback (for when the real transitionTo fails) runs the restore function for the
          // current stack level, then broadcasts the $transitionError event.
          function transitionFailure(deferred, tFail) {
            return function failureFn(error) {
              popStack();
              $rootScope.$broadcast("$transitionError", tFail, error);
              deferred.reject(error);  // $transition$ deferred
              return $q.reject(error);
            };
          }

          // Decorate $state.transitionTo.
          $state.transitionTo = function (to, toParams, options) {
            // Create a deferred/promise which can be used earlier than UI-Router's transition promise.
            var deferred = $q.defer();
            // Place the promise in a transition data, and place it on the stack to be used in $stateChangeStart
            var tData = tDataStack[++transitionDepth] = {
              promise: deferred.promise
            };
            // placeholder restoreFn in case transitionTo doesn't reach $stateChangeStart (state not found, etc)
            restoreFnStack[transitionDepth] = function() { };
            // Invoke the real $state.transitionTo
            var tPromise = $state_transitionTo.apply($state, arguments);

            // insert our promise callbacks into the chain.
            return tPromise.then(transitionSuccess(deferred, tData), transitionFailure(deferred, tData));
          };

          // This event is handled synchronously in transitionTo call stack
          $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
              if (transitionDepth >= tDataStack.length) return;
              var depth = transitionDepth;
              // To/From is now normalized by ui-router.  Add this information to the transition data object.
              var tData = angular.extend(tDataStack[depth], {
                to: { state: toState, params: toParams },
                from: { state: fromState, params: fromParams }
              });

              var restoreFn = decorateInjector(tData);
              restoreFnStack[depth] = restoreFn;
              $rootScope.$broadcast("$transitionStart", tData);
            }
          );

          return $state;
        }]);
    }
  ]
);

// statevis requires d3.
(function () {
  "use strict";
  var app = angular.module("ct.ui.router.extras.statevis", [ 'ct.ui.router.extras.core', 'ct.ui.router.extras.sticky'  ]);

  app.directive('stateVis', [ '$state', '$timeout', '$interval', stateVisDirective ]);

  /**
   * This directive gets all the current states using $state.get() and displays them in a tree using D3 lib.
   * It then listens for state events and updates the tree.
   *
   * Usage:
   * <state-vis height="1000px" width="1000px"></state-vis>
   */
  function stateVisDirective($state, $timeout, $interval) {
    return {
      scope: {
        width: '@',
        height: '@'
      },
      restrict: 'AE',
      template: '<svg></svg>',
      link: function (_scope, _elem, _attrs) {
        var stateMap = {};
        var width = _scope.width || 400,
          height = _scope.height || 400;

        var tree = d3.layout.tree()
            .size([width - 20, height - 20])
            .separation(function (a, b) {
              return a.parent == b.parent ? 10 : 25;
            });

        var root = $state.get().filter(function (state) { return state.name === ""; })[0];
        var nodes = tree(root);

        root.parent = root;
        root.px = root.x = width / 2;
        root.py = root.y = height / 2;

        var activeNode = { };
        activeNode.px = activeNode.x = root.px;
        activeNode.py = activeNode.y = root.py;

        var diagonal = d3.svg.diagonal();

        var svg = d3.select(_elem.find("svg")[0])
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(10, 10)");

        var node = svg.selectAll(".node"),
          link = svg.selectAll(".link"),
          active = svg.selectAll(".active")
          ;

        var updateInterval = 200,
          transLength = 200,
          timer = setInterval(update, updateInterval);

        function addStates(data) {
          // *********** Convert flat data into a nice tree ***************
          data = data.map(function (node) {
            return node.name === "" ? root : angular.copy(node);
          });
          angular.extend(stateMap, data.reduce(function (map, node) {
            map[node.name] = node;
            return map;
          }, {}));

          data.forEach(function (node) {
            // add to parent
            var parentName = node.name.split(/\./).slice(0, -1).join(".");
            var parent = node.name != parentName && stateMap[parentName];
            if (parent) {
              (parent.children || (parent.children = [])).push(node); // create child array if it doesn't exist
              node.px = parent.px;
              node.py = parent.py;
              nodes.push(node);
            }
          });
        }

        $interval(function () {
          _scope.states = $state.get();
          angular.forEach(nodes, function (n) {
            var s = $state.get(n.name);
            if (s) {
              n.status = s.status || 'exited';
            }
          });
//          _scope.futureStates = $futureState.get();
        }, 250);

        _scope.$watchCollection("states", function (newval, oldval) {
          var oldstates = (oldval || []).map(function (s) { return s.name; });
          addStates((newval || []).filter(function(state) { return oldstates.indexOf(state.name) == -1; } ));
//          addStates(_.reject(newval, function (state) { return _.contains(oldstates, state.name); }));
        });

//        addStates($state.get());
        update(updateInterval);

        function update() {
          // Recompute the layout and data join.
          node = node.data(tree.nodes(root), function (d) { return d.name; });
          link = link.data(tree.links(nodes), function (d) { return d.target.name; });
          active = active.data(activeNode);

          nodes.forEach(function (d) { d.y = d.depth * 70; });

          // Add entering nodes in the parent’s old position.
          var nodeEnter = node.enter();

          function stateName(node) {
            var name = node.name.split(".").pop();
            if (node.sticky) { name += " (STICKY)"; }
            if (node.deepStateRedirect) { name += " (DSR)"; }
            return name;
          }

          active.enter()
            .append("circle")
            .attr("class", "active")
            .attr("r", 13)
            .attr("cx", function (d) { return d.parent.px || 100; })
            .attr("cy", function (d) { return d.parent.py || 100; })
          ;

          nodeEnter.append("circle")
            .attr("class", "node")
            .attr("r", 9)
            .attr("cx", function (d) { return d.parent.px; })
            .attr("cy", function (d) { return d.parent.py; });

          nodeEnter.append("text")
            .attr("class", "label")
            .attr("x", function (d) { return d.parent.px; })
            .attr("y", function (d) { return d.parent.py; })
            .attr("text-anchor", function (d) { return "middle"; })
            .text(stateName)
            .style("fill-opacity", 1);


          // Add entering links in the parent’s old position.
          link.enter().insert("path", ".node")
            .attr("class", "link")
            .attr("d", function (d) {
              var o = {x: d.source.px, y: d.source.py};
              return diagonal({source: o, target: o});
            });

          // Transition nodes and links to their new positions.
          var t = svg.transition()
            .duration(transLength);

          t.selectAll(".link")
            .attr("d", diagonal);

          /* jshint -W093 */
          var circleColors = { entered: '#AF0', exited: '#777', active: '#0f0', inactive: '#55F', future: '#009' };
          t.selectAll(".node")
            .attr("cx", function (d) { return d.px = d.x; })
            .attr("cy", function (d) { return d.py = d.y; })
            .attr("r", function (d) { return d.status === 'active' ? 15 : 10; })
            .style("fill", function (d) { return circleColors[d.status] || "#FFF"; });

          t.selectAll(".label")
            .attr("x", function (d) { return d.px = d.x; })
            .attr("y", function (d) { return d.py = d.y - 15; })
            .attr("transform", function (d) { return "rotate(-25 " + d.x + " " + d.y + ")"; })
          ;

          t.selectAll(".active")
            .attr("x", function (d) { return d.px = d.x; })
            .attr("y", function (d) { return d.py = d.y - 15; });
        }
      }
    };
  }
})();


angular.module("ct.ui.router.extras",
  [
    'ct.ui.router.extras.core',
    'ct.ui.router.extras.dsr',
    'ct.ui.router.extras.future',
    'ct.ui.router.extras.previous',
    'ct.ui.router.extras.statevis',
    'ct.ui.router.extras.sticky',
    'ct.ui.router.extras.transition'
  ]);


}));