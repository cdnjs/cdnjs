/**
 * AngularJS module that adds support for specifying default child views for abstract states when using ui-router.
 *
 * @link https://github.com/nonplus/angular-ui-router-default
 *
 * @license angular-ui-router-default v0.0.6
 * (c) Copyright Stepan Riha <github@nonplus.net>
 * License MIT
 */

(function(angular) {

"use strict";
var moduleName = 'ui.router.default';
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = moduleName;
}
var max_redirects = 10;
angular.module(moduleName, ['ui.router'])
    .config(['$provide', function ($provide) {
        $provide.decorator('$state', ['$delegate', '$injector', '$q', function ($delegate, $injector, $q) {
                var transitionTo = $delegate.transitionTo;
                var pendingPromise;
                $delegate.transitionTo = function (to, toParams, options) {
                    var numRedirects = 0;
                    var $state = this;
                    var nextState = to.name || to;
                    var nextParams = toParams;
                    var nextOptions = options;
                    return fetchTarget();
                    function fetchTarget() {
                        var target = $state.get(nextState, $state.$current);
                        if (!target) {
                            // default specification is invalid, let ui-router report the problem...
                            return transitionTo.call($delegate, nextState, nextParams, nextOptions);
                        }
                        nextState = target.name;
                        var absRedirectPromise = getAbstractRedirect(target);
                        pendingPromise = absRedirectPromise;
                        return $q.when(absRedirectPromise)
                            .then(abstractTargetResolved);
                        function abstractTargetResolved(abstractTarget) {
                            if (absRedirectPromise !== pendingPromise) {
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
                        if (!state || !state.abstract || (state.abstract === true && !state.default)) {
                            return null;
                        }
                        return invokeAbstract(state).then(abstractInvoked);
                        function abstractInvoked(newState) {
                            if (newState[0] === '.') {
                                return nextState + newState;
                            }
                            else {
                                return newState;
                            }
                        }
                    }
                    function invokeAbstract(state) {
                        var defaultState;
                        if (state.default) {
                            defaultState = state.default;
                        }
                        else {
                            defaultState = state.abstract;
                        }
                        if (defaultState instanceof Function || defaultState instanceof Array) {
                            return $q.when($injector.invoke(defaultState));
                        }
                        else {
                            return $q.when(defaultState);
                        }
                    }
                };
                return $delegate;
            }]);
    }]);


})(window.angular);