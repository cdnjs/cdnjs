/**
 * AngularJS module that adds support for specifying default child views for abstract states when using ui-router.
 *
 * @link https://github.com/nonplus/angular-ui-router-default
 *
 * @license angular-ui-router-default v0.0.4
 * (c) Copyright Stepan Riha <github@nonplus.net>
 * License MIT
 */

(function(angular) {

/* global angular */
"use strict";
var max_redirects = 10;
angular.module('ui.router.default', ['ui.router'])
	.config(['$provide', function($provide) {
		$provide.decorator('$state', ['$delegate', '$injector', '$q', function($delegate, $injector, $q) {
			var transitionTo = $delegate.transitionTo;
			var pendingPromise;
			$delegate.transitionTo = function(to, toParams, options) {
				var numRedirects = 0;
				var $state = this;
				var nextState = to.name || to;
				var nextParams = toParams;
				var nextOptions = options;

				return fetchTarget();

				function fetchTarget() {
					var target = $state.get(nextState, $state.$current);
					nextState = (target|| {}).name;
					
					var absRedirectPromise = getAbstractRedirect(target);
					pendingPromise = absRedirectPromise;
					return $q.when(absRedirectPromise, abstractTargetResolved);

					function abstractTargetResolved(abstractTarget) {
						if(absRedirectPromise !== pendingPromise) {
							return $q.reject(new Error('transition superseded'));
						}
						// we didn't get anything from the abstract target
						if (!abstractTarget) {
							return transitionTo.call($delegate, nextState, nextParams, nextOptions);
						}
						checkForMaxRedirect();
						nextState = abstractTarget;
						return fetchTarget();
					}

					function checkForMaxRedirect() {
						if (numRedirects === max_redirects) {
							throw new Error('Too many abstract state default redirects');
						}
						numRedirects += 1;
					}
				}
				function getAbstractRedirect(state) {
					if (!state || !state.abstract || state.abstract === true) {
						return null;
					}
					return invokeAbstract(state.abstract).then(abstractInvoked);
					function abstractInvoked(newState) {
						if (newState[0] === '.') {
							return nextState + newState;
						} else {
							return newState;
						}
					}

				}
				function invokeAbstract(abstract) {
					if (!angular.isString(abstract)) {
						return $q.when($injector.invoke(abstract));
					} else {
						return $q.when(abstract);
					}
				}

			};
			return $delegate;
		}]);
	}]);

})(window.angular);