// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.

;(function (root, factory) {
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  var root = (objectTypes[typeof window] && window) || this,
    freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
    freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
    moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
    freeGlobal = objectTypes[typeof global] && global;
  
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  // Because of build optimizers
  if (typeof define === 'function' && define.amd) {
    define(['rx', 'angular', 'exports'], function (Rx, angular, exports) {
      root.Rx = factory(root, exports, Rx, angular);
      return root.Rx;
    });
  } else if (typeof module == 'object' && module && module.exports == freeExports) {
    module.exports = factory(root, module.exports, require('rx'), require('angular'));
  } else {
    root.Rx = factory(root, {}, root.Rx, root.angular);
  }
}(this, function (global, exp, Rx, angular, undefined) {

  var observable = Rx.Observable,
    observableProto = observable.prototype,
    observableCreate = observable.create,
    disposableCreate = Rx.Disposable.create,
    SingleAssignmentDisposable = Rx.SingleAssignmentDisposable,
    CompositeDisposable = Rx.CompositeDisposable,
    AnonymousObservable = Rx.AnonymousObservable,
    Scheduler = Rx.Scheduler,
    noop = Rx.helpers.noop;

  // Utilities
  var toString = Object.prototype.toString,
    slice = Array.prototype.slice;

  /**
   * @ngdoc overview
   * @name rx
   *
   * @description
   * The `rx` module contains essential components for reactive extension bindings
   * for Angular apps.
   *
   * Installation of this module is just a cli command away:
   *
   * <pre>
   * bower install rx-angular
   * <pre>
   *
   * Simply declare it as dependency of your app like this:
   *
   * <pre>
   * var app = angular.module('myApp', ['rx']);
   * </pre>
   */
  var rxModule = angular.module('rx', []);

  /**
   * @ngdoc service
   * @name rx.rx
   *
   * @requires $window
   *
   * @description
   * Factory service that exposes the global `Rx` object to the Angular world.
   */
  rxModule.factory('rx', ['$window', function($window) {
    $window.Rx || ($window.Rx = Rx);
    return $window.Rx;
  }]);

  /**
  * @ngdoc service
  * @name rx.observeOnSope
  *
  * @requires rx.rx
  *
  * @description
  * An observer function that returns a function for a given `scope`,
  * `watchExpression` and `objectEquality` object. The returned function
  * delegates to an Angular watcher.
  *
  * @param {object} scope Scope object.
  * @param {(string|object)} watchExpression Watch expression.
  * @param {boolean} objectEquality Object to compare for object equality.
  *
  * @return {function} Factory function that creates obersables.
  */
  rxModule.factory('observeOnScope', ['rx', function(rx) {
    return function(scope, watchExpression, objectEquality) {
      return rx.Observable.create(function (observer) {
        // Create function to handle old and new Value
        function listener (newValue, oldValue) {
          observer.onNext({ oldValue: oldValue, newValue: newValue });
        }

        // Returns function which disconnects the $watch expression
        return scope.$watch(watchExpression, listener, objectEquality);
      });
    };
  }]);

  observableProto.safeApply = function($scope, fn){

    fn = angular.isFunction(fn) ? fn : noop;

    return this['do'](function (data) {
      ($scope.$$phase || $scope.$root.$$phase) ? fn(data) : $scope.$apply(function () {
        fn(data);
      });
    });
  };

  rxModule.config(['$provide', function($provide) {
    /**
     * @ngdoc service
     * @name rx.$rootScope
     *
     * @requires $delegate
     *
     * @description
     * `$rootScope` decorator that extends the existing `$rootScope` service
     * with additional methods. These methods are Rx related methods, such as
     * methods to create observables or observable functions.
     */
    $provide.decorator('$rootScope', ['$delegate', function($delegate) {

      Object.defineProperties($delegate.constructor.prototype, {
        /**
         * @ngdoc property
         * @name rx.$rootScope.$toObservable
         *
         * @description
         * Provides a method to create observable methods.
         */
        '$toObservable': {
          /**
           * @ngdoc function
           * @name rx.$rootScope.$toObservable#value
           *
           * @description
           * Creates an observable from a watchExpression.
           *
           * @param {(function|string)} watchExpression A watch expression.
           * @param {boolean} objectEquality Compare object for equality.
           *
           * @return {object} Observable.
           */
          value: function(watchExpression, objectEquality) {
            var scope = this;
            return observableCreate(function (observer) {
              // Create function to handle old and new Value
              function listener (newValue, oldValue) {
                observer.onNext({ oldValue: oldValue, newValue: newValue });
              }

              // Returns function which disconnects the $watch expression
              var disposable = Rx.Disposable.create(scope.$watch(watchExpression, listener, objectEquality));

              scope.$on('$destroy', function(){
                disposable.dispose();
              });

              return disposable;
            }).publish().refCount();
          },
          /**
           * @ngdoc property
           * @name rx.$rootScope.$toObservable#enumerable
           *
           * @description
           * Enumerable flag.
           */
          enumerable: false,
          configurable: true
        },
        /**
         * @ngdoc property
         * @name rx.$rootScope.$eventToObservable
         *
         * @description
         * Provides a method to create observable methods.
         */
        '$eventToObservable': {
          /**
           * @ngdoc function
           * @name rx.$rootScope.$eventToObservable#value
           *
           * @description
           * Creates an Observable from an event which is fired on the local $scope.
           * Expects an event name as the only input parameter.
           *
           * @param {string} event name
           *
           * @return {object} Observable object.
           */
          value: function(eventName) {
            var scope = this;
            return observableCreate(function (observer) {
              function listener () {
                observer.onNext({
                  'event': arguments[0],
                  'additionalArguments': slice.call(arguments, 1)
                });
              }

              // Returns function which disconnects from the event binding
              var disposable = disposableCreate(scope.$on(eventName, listener));

              scope.$on('$destroy', function(){
                disposable.isDisposed || disposable.dispose();
              });

              return disposable;
            }).publish().refCount();
          },
          /**
           * @ngdoc property
           * @name rx.$rootScope.$eventToObservable#enumerable
           *
           * @description
           * Enumerable flag.
           */
          enumerable: false,
          configurable: true
        },
        /**
         * @ngdoc property
         * @name rx.$rootScope.$createObservableFunction
         *
         * @description
         * Provides a method to create obsersables from functions.
         */
        '$createObservableFunction': {
          /**
           * @ngdoc function
           * @name rx.$rootScope.$createObservableFunction#value
           *
           * @description
           * Creates an observable from a given function.
           *
           * @param {string} functionName A function name to observe.
           * @param {function} listener A listener function that gets executed.
           *
           * @return {function} Remove listener function.
           */
          value: function(functionName, listener) {
            var scope = this;

            return observableCreate(function (observer) {
              scope[functionName] = function () {
                if (listener) {
                  observer.onNext(listener.apply(this, arguments));
                } else if (arguments.length === 1) {
                  observer.onNext(arguments[0]);
                } else {
                  observer.onNext(arguments);
                }
              };

              return function () {
                // Remove our listener function from the scope.
                delete scope[functionName];
              };
            }).publish().refCount();
          },
          /**
           * @ngdoc property
           * @name rx.$rootScope.$createObservableFunction#enumerable
           *
           * @description
           * Enumerable flag.
           */
          enumerable: false,
          configurable: true
        },
        /**
         * @ngdoc function
         * @name rx.$rootScope.$digestObservables#value
         *
         * @description
         * Digests the specified observables when they produce new values.
         * The scope variable specified by the observable's key
         *   is set to the new value.
         *
         * @param {object} obj A map where keys are scope properties
         *   and values are observables.
         *
         * @return {boolean} Reference to obj.
         */
        '$digestObservables': {
          value: function(observables) {
            var scope = this;
            return angular.map(observables, function(observable, key) {
              return observable.digest(scope, key);
            }).publish().refCount();
          },
          /**
           * @ngdoc property
           * @name rx.$rootScope.digestObservables#enumerable
           *
           * @description
           * Enumerable flag.
           */
          enumerable: false,
          configurable: true
        }
      });

      return $delegate;
    }]);
  }]);

  rxModule.run(['$parse', function($parse) {

    observableProto.digest = function($scope, prop) {
      var source = this;
      return new AnonymousObservable(function (observer) {
        var propSetter = $parse(prop).assign;

        var m = new SingleAssignmentDisposable();

        m.setDisposable(source.subscribe(
          function (e) {
            if (!$scope.$$phase) {
              $scope.$apply(propSetter($scope, e));
            } else {
              propSetter($scope, e);
            }
          },
          observer.onError.bind(observer),
          observer.onCompleted.bind(observer)
        ));

        $scope.$on('$destroy', m.dispose.bind(m));

        return m;
      });
    };
  }]);

  var ScopeScheduler = Rx.ScopeScheduler = (function () {

    var now = Date.now || (+new Date());

    function scheduleNow(state, action) {
      var scheduler = this,
        disposable = new SingleAssignmentDisposable();

      safeApply(disposable, scheduler, action, state);

      return disposable;
    }

    function scheduleRelative(state, dueTime, action) {
      var scheduler = this,
        dt = Rx.Scheduler.normalize(dueTime);

      if (dt === 0) {
        return scheduler.scheduleWithState(state, action);
      }

      var disposable = new SingleAssignmentDisposable();
      var id = setTimeout(function () {
        safeApply(disposable, scheduler, action, state);
      }, dt);

      return new CompositeDisposable(disposable, disposableCreate(function () {
        clearTimeout(id);
      }));
    }

    function safeApply(disposable, scheduler, action, state) {
      function fn() {
        !disposable.isDisposed && disposable.setDisposable(action(scheduler, state));
      }

      (scheduler._scope.$$phase || scheduler._scope.$root.$$phase)
        ? fn()
        : scheduler._scope.$apply(fn);
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this.scheduleWithRelativeAndState(state, dueTime - this.now(), action);
    }

    return function (scope) {
      var scheduler = new Scheduler(now, scheduleNow, scheduleRelative, scheduleAbsolute);
      scheduler._scope = scope;
      return scheduler;
    }
  }());

  return Rx;
}));