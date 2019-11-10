/**
 * UI-Router Extras: Sticky states, Future States, Deep State Redirect, Transition promise
 * Module: previous
 * @version 0.1.0
 * @link http://christopherthielen.github.io/ui-router-extras/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(angular, undefined){
"use strict";
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
        go: function (memoName, options) {
          var to = $previousState.get(memoName);
          if (memoName && !to) {
            return $q.reject(new Error('undefined memo'));
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

})(angular);