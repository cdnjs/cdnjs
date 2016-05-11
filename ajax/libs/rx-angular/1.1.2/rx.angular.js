// Copyright (c) Microsoft. All rights reserved. See License.txt in the project root for license information.

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

var errorObj = {e: {}};

function tryCatcherGen(tryCatchTarget) {
  return function tryCatcher() {
    try {
      return tryCatchTarget.apply(this, arguments);
    } catch (e) {
      errorObj.e = e;
      return errorObj;
    }
  };
}

function tryCatch(fn) {
  if (!angular.isFunction(fn)) { throw new TypeError('fn must be a function'); }
  return tryCatcherGen(fn);
}

function thrower(e) {
  throw e;
}

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

    var CreateObservableFunction = (function(__super__) {
      Rx.internals.inherits(CreateObservableFunction, __super__);
      function CreateObservableFunction(self, name, fn) {
        this._self = self;
        this._name = name;
        this._fn = fn;
        __super__.call(this);
      }

      CreateObservableFunction.prototype.subscribeCore = function (o) {
        var fn = this._fn;
        this._self[this._name] = function () {
          var len = arguments.length, args = new Array(len);
          for (var i = 0; i < len; i++) { args[i] = arguments[i]; }

          if (angular.isFunction(fn)) {
            var result = tryCatch(fn).apply(this, args);
            if (result === errorObj) { return o.onError(result.e); }
            o.onNext(result);
          } else if (args.length === 1) {
            o.onNext(args[0]);
          } else {
            o.onNext(args);
          }
        };

        return new InnerDisposable(this._self, this._name);
      };

      function InnerDisposable(self, name) {
        this._self = self;
        this._name = name;
        this.isDisposed = false;
      }

      InnerDisposable.prototype.dispose = function () {
        if (!this.isDisposed) {
          this.isDisposed = true;
          delete this._self[this._name];
        }
      };

      return CreateObservableFunction;
    }(Rx.ObservableBase));

    Rx.createObservableFunction = function (self, functionName, listener) {
      return new CreateObservableFunction(self, functionName, listener).publish().refCount();
    };

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
    var ObserveOnScope = (function(__super__) {
      rx.internals.inherits(ObserveOnScope, __super__);
      function ObserveOnScope(scope, expr, eq) {
        this._scope = scope;
        this._expr = expr;
        this._eq = eq;
        __super__.call(this);
      }

      function createListener(o) {
        return function listener(newValue, oldValue) {
          o.onNext({ oldValue: oldValue, newValue: newValue });
        };
      }

      ObserveOnScope.prototype.subscribeCore = function (o) {
        return new InnerDisposable(this._scope.$watch(this._expr, createListener(o), this._eq));
      };

      function InnerDisposable(fn) {
        this._fn = fn;
        this.isDisposed = false;
      }

      InnerDisposable.prototype.dispose = function () {
        if (!this.isDisposed) {
          this._fn();
          this.isDisposed = true;
        }
      };

      return ObserveOnScope;
    }(rx.ObservableBase));

    return function(scope, watchExpression, objectEquality) {
      return new ObserveOnScope(scope, watchExpression, objectEquality);
    };
  }]);

  function noop () { }

  Rx.Observable.prototype.safeApply = function($scope, onNext, onError, onComplete){
    onNext = angular.isFunction(onNext) ? onNext : noop;
    onError = angular.isFunction(onError) ? onError : noop;
    onComplete = angular.isFunction(onComplete) ? onComplete : noop;

    return this
      .takeWhile(function () {
        return !$scope.$$destroyed;
      })
      .tap(
        function (data){
          ($scope.$$phase || $scope.$root.$$phase) ?
            onNext(data) :
            $scope.$apply(function () { onNext(data); });
        },
        function (error){
          ($scope.$$phase || $scope.$root.$$phase) ?
            onError(error) :
            $scope.$apply(function () { onError(error); });
        },
        function (){
          ($scope.$$phase || $scope.$root.$$phase) ?
            onComplete() :
            $scope.$apply(function () { onComplete(); });
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
    $provide.decorator('$rootScope', ['$delegate', 'rx', function($delegate, rx) {

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
                return rx.Observable.create(function (observer) {
                  // Create function to handle old and new Value
                  function listener (newValue, oldValue) {
                    observer.onNext({ oldValue: oldValue, newValue: newValue });
                  }

                  // Returns function which disconnects the $watch expression
                  var disposable = rx.Disposable.create(scope.$watch(watchExpression, listener, objectEquality));

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
              configurable: true,
              writable: true
          },
          /**
           * @ngdoc property
           * @name rx.$rootScope.$toObservableCollection
           *
           * @description
           * Provides a method to create observable methods.
           */
          '$toObservableCollection': {
              /**
               * @ngdoc function
               * @name rx.$rootScope.$toObservableCollection#value
               *
               * @description
               * Creates an observable from a watchExpression.
               *
               * @param {(function|string)} watchExpression A watch expression.
               *
               * @return {object} Observable.
               */
              value: function(watchExpression) {
                var scope = this;
                return rx.Observable.create(function (observer) {
                  // Create function to handle old and new Value
                  function listener (newValue, oldValue) {
                    observer.onNext({ oldValue: oldValue, newValue: newValue });
                  }

                  // Returns function which disconnects the $watch expression
                  var disposable = rx.Disposable.create(scope.$watchCollection(watchExpression, listener));

                  scope.$on('$destroy', function(){
                    disposable.dispose();
                  });

                  return disposable;
                }).publish().refCount();
              },
              /**
               * @ngdoc property
               * @name rx.$rootScope.$toObservableCollection#enumerable
               *
               * @description
               * Enumerable flag.
               */
              enumerable: false,
              configurable: true,
              writable: true
          },
          /**
           * @ngdoc property
           * @name rx.$rootScope.$toObservableGroup
           *
           * @description
           * Provides a method to create observable methods.
           */
          '$toObservableGroup': {
              /**
               * @ngdoc function
               * @name rx.$rootScope.$toObservableGroup#value
               *
               * @description
               * Creates an observable from a watchExpressions.
               *
               * @param {(function|string)} watchExpressions A watch expression.
               *
               * @return {object} Observable.
               */
              value: function(watchExpressions) {
                var scope = this;
                return rx.Observable.create(function (observer) {
                  // Create function to handle old and new Value
                  function listener (newValue, oldValue) {
                    observer.onNext({ oldValue: oldValue, newValue: newValue });
                  }

                  // Returns function which disconnects the $watch expression
                  var disposable = rx.Disposable.create(scope.$watchGroup(watchExpressions, listener));

                  scope.$on('$destroy', function(){
                    disposable.dispose();
                  });

                  return disposable;
                }).publish().refCount();
              },
              /**
               * @ngdoc property
               * @name rx.$rootScope.$toObservableGroup#enumerable
               *
               * @description
               * Enumerable flag.
               */
              enumerable: false,
              configurable: true,
              writable: true
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
          value: function(eventName, selector) {
            var scope = this;
            return rx.Observable.create(function (observer) {
              function listener () {
                var len = arguments.length, args = new Array(len);
                for (var i = 0; i < len; i++) { args[i] = arguments[i]; }
                if (angular.isFunction(selector)) {
                  var result = tryCatch(selector).apply(null, args);
                  if (result === errorObj) { return observer.onError(result.e); }
                  observer.onNext(result);
                } else if (args.length === 1) {
                  observer.onNext(args[0]);
                } else {
                  observer.onNext(args);
                }
              }

              // Returns function which disconnects from the event binding
              var disposable = rx.Disposable.create(scope.$on(eventName, listener));

              scope.$on('$destroy', function(){ disposable.dispose(); });

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
          configurable: true,
          writable: true
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
            return rx.createObservableFunction(this, functionName, listener);
          },
          /**
           * @ngdoc property
           * @name rx.$rootScope.$createObservableFunction#enumerable
           *
           * @description
           * Enumerable flag.
           */
          enumerable: false,
          configurable: true,
          writable: true
        },
        /**
         * @ngdoc function
         * @name rx.$rootScope.$digestObservables#value
         *
         * @description
         * Digests the specified observables when they produce new values.
         * The scope variable / assignable expression specified by the observable's key
         *   is set to the new value.
         *
         * @param {object.<string, Rx.Observable>} obj A map where keys are scope properties
         *   (assignable expressions) and values are observables.
         *
         * @return {Rx.Observable.<{observable: Rx.Observable, expression: string, value: object}>}
         *   Observable of change objects.
         */
        '$digestObservables': {
          value: function(observables) {
            var scope = this;
            return rx.Observable.pairs(observables)
              .flatMap(function(pair) {
                return pair[1].digest(scope, pair[0])
                  .map(function(val) {
                    return {
                      observable: pair[1],
                      expression: pair[0],
                      value: val
                    };
                  });
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
          configurable: true,
          writable: true
        }
      });

      return $delegate;
    }]);
  }]);

  rxModule.run(['$parse', function($parse) {

    var DigestObservable = (function(__super__) {
      Rx.internals.inherits(DigestObservable, __super__);
      function DigestObservable(source, $scope, prop) {
        this.source = source;
        this.$scope = $scope;
        this.prop = prop;
        __super__.call(this);
      }

      DigestObservable.prototype.subscribeCore = function (o) {
        var propSetter = $parse(this.prop).assign;
        if (!propSetter) {
          return o.onError(new Error('Property or expression is not assignable.'));
        }

        var m = new Rx.SingleAssignmentDisposable();
        m.setDisposable(this.source.subscribe(new DigestObserver(o, this.$scope, propSetter)));
        this.$scope.$on('$destroy', function () { m.dispose(); });

        return m;
      };

      return DigestObservable;
    }(Rx.ObservableBase));

    var DigestObserver = (function(__super__) {
      Rx.internals.inherits(DigestObserver, __super__);
      function DigestObserver(o, $scope, propSetter) {
        this.o = o;
        this.$scope = $scope;
        this.propSetter = propSetter;
        __super__.call(this);
      }

      DigestObserver.prototype.next = function (x) {
        if (!this.$scope.$$phase) {
          var _this = this;
          this.$scope.$apply(function() {
            _this.propSetter(_this.$scope, x);
          });
        } else {
          this.propSetter(this.$scope, x);
        }
        this.o.onNext(x);
      };
      DigestObserver.prototype.error = function (e) { this.o.onError(e); };
      DigestObserver.prototype.completed = function () { this.o.onCompleted(); };

      return DigestObserver;
    }(Rx.internals.AbstractObserver));

    Rx.Observable.prototype.digest = function($scope, prop) {
      return new DigestObservable(this, $scope, prop);
    };
  }]);

  var ScopeScheduler = Rx.ScopeScheduler = (function (__super__) {
    function ScopeScheduler($scope) {
      this.$scope = $scope;
      __super__.call(this);
    }

    Rx.internals.inherits(ScopeScheduler, __super__);

    ScopeScheduler.prototype.schedule = function (state, action) {
      if (this.$scope.$$destroyed) { return Rx.Disposable.empty; }

      var sad = new Rx.SingleAssignmentDisposable();
      var $scope = this.$scope;

      if ($scope.$$phase || $scope.$root.$$phase) {
        sad.setDisposable(Rx.Disposable._fixup(state(action)));
      } else {
        $scope.$apply.call(
          $scope,
          function () { sad.setDisposable(Rx.Disposable._fixup(state(action))); }
        );
      }
    };

    ScopeScheduler.prototype._scheduleFuture = function (state, dueTime, action) {
      if (this.$scope.$$destroyed) { return Rx.Disposable.empty; }

      var sad = new Rx.SingleAssignmentDisposable();
      var $scope = this.$scope;

      var id = setTimeout(function () {
        if ($scope.$$destroyed || sad.isDisposed) { return clearTimeout(id); }

        if ($scope.$$phase || $scope.$root.$$phase) {
          sad.setDisposable(Rx.Disposable._fixup(state(action)));
        } else {
          $scope.$apply.call(
            $scope,
            function () { sad.setDisposable(Rx.Disposable._fixup(state(action))); }
          );
        }
      }, dueTime);

      return new Rx.BinaryDisposable(
        sad,
        Rx.Disposable.create(function () { clearTimeout(id); })
      );
    };

    ScopeScheduler.prototype.schedulePeriodic = function (state, period, action) {
      if (this.$scope.$$destroyed) { return Rx.Disposable.empty; }

      period = Rx.Scheduler.normalize(period);

      var $scope = this.$scope;
      var s = state;

      var id = setInterval(function () {
        if ($scope.$$destroyed) { return clearInterval(id); }

        if ($scope.$$phase || $scope.$root.$$phase) {
          s = action(s);
        } else {
          $scope.$apply.call($scope, function () { s = action(s); });
        }
      }, period);

      return Rx.Disposable.create(function () { clearInterval(id); });
    };

    return ScopeScheduler;
  }(Rx.Scheduler));

  return Rx;
}));