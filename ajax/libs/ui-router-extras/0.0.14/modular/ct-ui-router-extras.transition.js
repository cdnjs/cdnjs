/**
 * UI-Router Extras: Sticky states, Future States, Deep State Redirect, Transition promise
 * Module: transition
 * @version 0.0.14
 * @link http://christopherthielen.github.io/ui-router-extras/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(angular, undefined){
"use strict";

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

})(angular);