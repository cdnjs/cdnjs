/*!
 * State-based routing for AngularJS
 * @version v1.0.0-alpha.3
 * @link http://angular-ui.github.com/ui-router
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("angular-ui-router", [], factory);
	else if(typeof exports === 'object')
		exports["angular-ui-router"] = factory();
	else
		root["angular-ui-router"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * An event broadcast on `$rootScope` when the state transition **begins**.
	 *
	 * You can use `event.preventDefault()`
	 * to prevent the transition from happening and then the transition promise will be
	 * rejected with a `'transition prevented'` value.
	 *
	 * Additional arguments to the event handler are provided:
	 * - `toState`: the Transition Target state
	 * - `toParams`: the Transition Target Params
	 * - `fromState`: the state the transition is coming from
	 * - `fromParams`: the parameters from the state the transition is coming from
	 * - `options`: any Transition Options
	 * - `$transition$`: the [[Transition]]
	 *
	 * @example
	 * ```
	 *
	 * $rootScope.$on('$stateChangeStart', function(event, transition) {
	 *   event.preventDefault();
	 *   // transitionTo() promise will be rejected with
	 *   // a 'transition prevented' error
	 * })
	 * ```
	 *
	 * @deprecated use [[TransitionService.onStart]]
	 * @event $stateChangeStart
	 */
	var $stateChangeStart;
	/**
	 * An event broadcast on `$rootScope` if a transition is **cancelled**.
	 *
	 * Additional arguments to the event handler are provided:
	 * - `toState`: the Transition Target state
	 * - `toParams`: the Transition Target Params
	 * - `fromState`: the state the transition is coming from
	 * - `fromParams`: the parameters from the state the transition is coming from
	 * - `options`: any Transition Options
	 * - `$transition$`: the [[Transition]] that was cancelled
	 *
	 * @deprecated
	 * @event $stateChangeCancel
	 */
	var $stateChangeCancel;
	/**
	 *
	 * An event broadcast on `$rootScope` once the state transition is **complete**.
	 *
	 * Additional arguments to the event handler are provided:
	 * - `toState`: the Transition Target state
	 * - `toParams`: the Transition Target Params
	 * - `fromState`: the state the transition is coming from
	 * - `fromParams`: the parameters from the state the transition is coming from
	 * - `options`: any Transition Options
	 * - `$transition$`: the [[Transition]] that just succeeded
	 *
	 * @deprecated use [[TransitionService.onStart]] and [[Transition.promise]], or [[Transition.onSuccess]]
	 * @event $stateChangeSuccess
	 */
	var $stateChangeSuccess;
	/**
	 * An event broadcast on `$rootScope` when an **error occurs** during transition.
	 *
	 * It's important to note that if you
	 * have any errors in your resolve functions (javascript errors, non-existent services, etc)
	 * they will not throw traditionally. You must listen for this $stateChangeError event to
	 * catch **ALL** errors.
	 *
	 * Additional arguments to the event handler are provided:
	 * - `toState`: the Transition Target state
	 * - `toParams`: the Transition Target Params
	 * - `fromState`: the state the transition is coming from
	 * - `fromParams`: the parameters from the state the transition is coming from
	 * - `error`: The reason the transition errored.
	 * - `options`: any Transition Options
	 * - `$transition$`: the [[Transition]] that errored
	 *
	 * @deprecated use [[TransitionService.onStart]] and [[Transition.promise]], or [[Transition.onError]]
	 * @event $stateChangeError
	 */
	var $stateChangeError;
	/**
	 * An event broadcast on `$rootScope` when a requested state **cannot be found** using the provided state name.
	 *
	 * The event is broadcast allowing any handlers a single chance to deal with the error (usually by
	 * lazy-loading the unfound state). A `TargetState` object is passed to the listener handler,
	 * you can see its properties in the example. You can use `event.preventDefault()` to abort the
	 * transition and the promise returned from `transitionTo()` will be rejected with a
	 * `'transition aborted'` error.
	 *
	 * Additional arguments to the event handler are provided:
	 * - `unfoundState` Unfound State information. Contains: `to, toParams, options` properties.
	 * - `fromState`: the state the transition is coming from
	 * - `fromParams`: the parameters from the state the transition is coming from
	 * - `options`: any Transition Options
	 * @example
	 *
	 * <pre>
	 * // somewhere, assume lazy.state has not been defined
	 * $state.go("lazy.state", { a: 1, b: 2 }, { inherit: false });
	 *
	 * // somewhere else
	 * $scope.$on('$stateNotFound', function(event, transition) {
	 * function(event, unfoundState, fromState, fromParams){
	 *     console.log(unfoundState.to); // "lazy.state"
	 *     console.log(unfoundState.toParams); // {a:1, b:2}
	 *     console.log(unfoundState.options); // {inherit:false} + default options
	 * });
	 * </pre>
	 *
	 * @deprecated use [[StateProvider.onInvalid]] // TODO: Move to [[StateService.onInvalid]]
	 * @event $stateNotFound
	 */
	var $stateNotFound;
	(function () {
	    var isFunction = angular.isFunction, isString = angular.isString;
	    function applyPairs(memo, keyValTuple) {
	        var key, value;
	        if (Array.isArray(keyValTuple))
	            key = keyValTuple[0], value = keyValTuple[1];
	        if (!isString(key))
	            throw new Error("invalid parameters to applyPairs");
	        memo[key] = value;
	        return memo;
	    }
	    stateChangeStartHandler.$inject = ['$transition$', '$stateEvents', '$rootScope', '$state', '$urlRouter'];
	    function stateChangeStartHandler($transition$, $stateEvents, $rootScope, $state, $urlRouter) {
	        if (!$transition$.options().notify || !$transition$.valid() || $transition$.ignored())
	            return;
	        var enabledEvents = $stateEvents.provider.enabled();
	        var toParams = $transition$.params("to");
	        var fromParams = $transition$.params("from");
	        if (enabledEvents.$stateChangeSuccess) {
	            var startEvent = $rootScope.$broadcast('$stateChangeStart', $transition$.to(), toParams, $transition$.from(), fromParams, $transition$.options(), $transition$);
	            if (startEvent.defaultPrevented) {
	                if (enabledEvents.$stateChangeCancel) {
	                    $rootScope.$broadcast('$stateChangeCancel', $transition$.to(), toParams, $transition$.from(), fromParams, $transition$.options(), $transition$);
	                }
	                //Don't update and resync url if there's been a new transition started. see issue #2238, #600
	                if ($state.transition == null)
	                    $urlRouter.update();
	                return false;
	            }
	            $transition$.promise.then(function () {
	                $rootScope.$broadcast('$stateChangeSuccess', $transition$.to(), toParams, $transition$.from(), fromParams, $transition$.options(), $transition$);
	            });
	        }
	        if (enabledEvents.$stateChangeError) {
	            $transition$.promise["catch"](function (error) {
	                if (error && (error.type === 2 /* RejectType.SUPERSEDED */ || error.type === 3 /* RejectType.ABORTED */))
	                    return;
	                var evt = $rootScope.$broadcast('$stateChangeError', $transition$.to(), toParams, $transition$.from(), fromParams, error, $transition$.options(), $transition$);
	                if (!evt.defaultPrevented) {
	                    $urlRouter.update();
	                }
	            });
	        }
	    }
	    stateNotFoundHandler.$inject = ['$to$', '$from$', '$state', '$rootScope', '$urlRouter'];
	    function stateNotFoundHandler($to$, $from$, $state, $rootScope, $urlRouter) {
	        var redirect = { to: $to$.identifier(), toParams: $to$.params(), options: $to$.options() };
	        var e = $rootScope.$broadcast('$stateNotFound', redirect, $from$.state(), $from$.params());
	        if (e.defaultPrevented || e.retry)
	            $urlRouter.update();
	        function redirectFn() {
	            return $state.target(redirect.to, redirect.toParams, redirect.options);
	        }
	        if (e.defaultPrevented) {
	            return false;
	        }
	        else if (e.retry || !!$state.get(redirect.to)) {
	            return e.retry && isFunction(e.retry.then) ? e.retry.then(redirectFn) : redirectFn();
	        }
	    }
	    $StateEventsProvider.$inject = ['$stateProvider'];
	    function $StateEventsProvider($stateProvider) {
	        $StateEventsProvider.prototype.instance = this;
	        var runtime = false;
	        var allEvents = ['$stateChangeStart', '$stateNotFound', '$stateChangeSuccess', '$stateChangeError'];
	        var enabledStateEvents = allEvents.map(function (e) { return [e, true]; }).reduce(applyPairs, {});
	        function assertNotRuntime() {
	            if (runtime)
	                throw new Error("Cannot enable events at runtime (use $stateEventsProvider");
	        }
	        /**
	         * Enables the deprecated UI-Router 0.2.x State Events
	         * [ '$stateChangeStart', '$stateNotFound', '$stateChangeSuccess', '$stateChangeError' ]
	         */
	        this.enable = function () {
	            var events = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                events[_i - 0] = arguments[_i];
	            }
	            assertNotRuntime();
	            if (!events || !events.length)
	                events = allEvents;
	            events.forEach(function (event) { return enabledStateEvents[event] = true; });
	        };
	        /**
	         * Disables the deprecated UI-Router 0.2.x State Events
	         * [ '$stateChangeStart', '$stateNotFound', '$stateChangeSuccess', '$stateChangeError' ]
	         */
	        this.disable = function () {
	            var events = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                events[_i - 0] = arguments[_i];
	            }
	            assertNotRuntime();
	            if (!events || !events.length)
	                events = allEvents;
	            events.forEach(function (event) { return delete enabledStateEvents[event]; });
	        };
	        this.enabled = function () { return enabledStateEvents; };
	        this.$get = $get;
	        $get.$inject = ['$transitions'];
	        function $get($transitions) {
	            runtime = true;
	            if (enabledStateEvents["$stateNotFound"])
	                $stateProvider.onInvalid(stateNotFoundHandler);
	            if (enabledStateEvents.$stateChangeStart)
	                $transitions.onBefore({}, stateChangeStartHandler, { priority: 1000 });
	            return {
	                provider: $StateEventsProvider.prototype.instance
	            };
	        }
	    }
	    angular.module('ui.router.state.events', ['ui.router.state'])
	        .provider("$stateEvents", $StateEventsProvider)
	        .run(['$stateEvents', function ($stateEvents) {
	        }]);
	})();


/***/ }
/******/ ])
});
;
//# sourceMappingURL=stateEvents.js.map