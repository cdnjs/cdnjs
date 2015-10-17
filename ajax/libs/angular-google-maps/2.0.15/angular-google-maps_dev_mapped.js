/*! angular-google-maps 2.0.15 2015-03-10
 *  AngularJS directives for Google Maps
 *  git: https://github.com/angular-ui/angular-google-maps.git
 */
;
(function( window, angular, undefined ){
  'use strict';
/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/angular-ui/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
 */

(function() {
  angular.module('uiGmapgoogle-maps.providers', []);

  angular.module('uiGmapgoogle-maps.wrapped', []);

  angular.module('uiGmapgoogle-maps.extensions', ['uiGmapgoogle-maps.wrapped', 'uiGmapgoogle-maps.providers']);

  angular.module('uiGmapgoogle-maps.directives.api.utils', ['uiGmapgoogle-maps.extensions']);

  angular.module('uiGmapgoogle-maps.directives.api.managers', []);

  angular.module('uiGmapgoogle-maps.directives.api.options', ['uiGmapgoogle-maps.directives.api.utils']);

  angular.module('uiGmapgoogle-maps.directives.api.options.builders', []);

  angular.module('uiGmapgoogle-maps.directives.api.models.child', ['uiGmapgoogle-maps.directives.api.utils', 'uiGmapgoogle-maps.directives.api.options', 'uiGmapgoogle-maps.directives.api.options.builders']);

  angular.module('uiGmapgoogle-maps.directives.api.models.parent', ['uiGmapgoogle-maps.directives.api.managers', 'uiGmapgoogle-maps.directives.api.models.child', 'uiGmapgoogle-maps.providers']);

  angular.module('uiGmapgoogle-maps.directives.api', ['uiGmapgoogle-maps.directives.api.models.parent']);

  angular.module('uiGmapgoogle-maps', ['uiGmapgoogle-maps.directives.api', 'uiGmapgoogle-maps.providers']);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.providers').factory('uiGmapMapScriptLoader', [
    '$q', 'uiGmapuuid', function($q, uuid) {
      var getScriptUrl, includeScript, isGoogleMapsLoaded, scriptId;
      scriptId = void 0;
      getScriptUrl = function(options) {
        if (options.china) {
          return 'http://maps.google.cn/maps/api/js?';
        } else {
          return 'https://maps.googleapis.com/maps/api/js?';
        }
      };
      includeScript = function(options) {
        var query, script;
        query = _.map(options, function(v, k) {
          return k + '=' + v;
        });
        if (scriptId) {
          document.getElementById(scriptId).remove();
        }
        query = query.join('&');
        script = document.createElement('script');
        script.id = scriptId = "ui_gmap_map_load_" + (uuid.generate());
        script.type = 'text/javascript';
        script.src = getScriptUrl(options) + query;
        return document.body.appendChild(script);
      };
      isGoogleMapsLoaded = function() {
        return angular.isDefined(window.google) && angular.isDefined(window.google.maps);
      };
      return {
        load: function(options) {
          var deferred, randomizedFunctionName;
          deferred = $q.defer();
          if (isGoogleMapsLoaded()) {
            deferred.resolve(window.google.maps);
            return deferred.promise;
          }
          randomizedFunctionName = options.callback = 'onGoogleMapsReady' + Math.round(Math.random() * 1000);
          window[randomizedFunctionName] = function() {
            window[randomizedFunctionName] = null;
            deferred.resolve(window.google.maps);
          };
          if (window.navigator.connection && window.Connection && window.navigator.connection.type === window.Connection.NONE) {
            document.addEventListener('online', function() {
              if (!isGoogleMapsLoaded()) {
                return includeScript(options);
              }
            });
          } else {
            includeScript(options);
          }
          return deferred.promise;
        }
      };
    }
  ]).provider('uiGmapGoogleMapApi', function() {
    this.options = {
      china: false,
      v: '3.17',
      libraries: '',
      language: 'en',
      sensor: 'false'
    };
    this.configure = function(options) {
      angular.extend(this.options, options);
    };
    this.$get = [
      'uiGmapMapScriptLoader', (function(_this) {
        return function(loader) {
          return loader.load(_this.options);
        };
      })(this)
    ];
    return this;
  });

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.extensions').service('uiGmapExtendGWin', function() {
    return {
      init: _.once(function() {
        if (!(google || (typeof google !== "undefined" && google !== null ? google.maps : void 0) || (google.maps.InfoWindow != null))) {
          return;
        }
        google.maps.InfoWindow.prototype._open = google.maps.InfoWindow.prototype.open;
        google.maps.InfoWindow.prototype._close = google.maps.InfoWindow.prototype.close;
        google.maps.InfoWindow.prototype._isOpen = false;
        google.maps.InfoWindow.prototype.open = function(map, anchor, recurse) {
          if (recurse != null) {
            return;
          }
          this._isOpen = true;
          this._open(map, anchor, true);
        };
        google.maps.InfoWindow.prototype.close = function(recurse) {
          if (recurse != null) {
            return;
          }
          this._isOpen = false;
          this._close(true);
        };
        google.maps.InfoWindow.prototype.isOpen = function(val) {
          if (val == null) {
            val = void 0;
          }
          if (val == null) {
            return this._isOpen;
          } else {
            return this._isOpen = val;
          }
        };

        /*
        Do the same for InfoBox
        TODO: Clean this up so the logic is defined once, wait until develop becomes master as this will be easier
         */
        if (window.InfoBox) {
          window.InfoBox.prototype._open = window.InfoBox.prototype.open;
          window.InfoBox.prototype._close = window.InfoBox.prototype.close;
          window.InfoBox.prototype._isOpen = false;
          window.InfoBox.prototype.open = function(map, anchor) {
            this._isOpen = true;
            this._open(map, anchor);
          };
          window.InfoBox.prototype.close = function() {
            this._isOpen = false;
            this._close();
          };
          window.InfoBox.prototype.isOpen = function(val) {
            if (val == null) {
              val = void 0;
            }
            if (val == null) {
              return this._isOpen;
            } else {
              return this._isOpen = val;
            }
          };
        }
        if (window.MarkerLabel_) {
          return window.MarkerLabel_.prototype.setContent = function() {
            var content;
            content = this.marker_.get('labelContent');
            if (!content || _.isEqual(this.oldContent, content)) {
              return;
            }
            if (typeof (content != null ? content.nodeType : void 0) === 'undefined') {
              this.labelDiv_.innerHTML = content;
              this.eventDiv_.innerHTML = this.labelDiv_.innerHTML;
              this.oldContent = content;
            } else {
              this.labelDiv_.innerHTML = '';
              this.labelDiv_.appendChild(content);
              content = content.cloneNode(true);
              this.labelDiv_.innerHTML = '';
              this.eventDiv_.appendChild(content);
              this.oldContent = content;
            }
          };
        }
      })
    };
  });

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.extensions').service('uiGmapLodash', function() {

    /*
        Author Nick McCready
        Intersection of Objects if the arrays have something in common each intersecting object will be returned
        in an new array.
     */
    this.intersectionObjects = function(array1, array2, comparison) {
      var res;
      if (comparison == null) {
        comparison = void 0;
      }
      res = _.map(array1, (function(_this) {
        return function(obj1) {
          return _.find(array2, function(obj2) {
            if (comparison != null) {
              return comparison(obj1, obj2);
            } else {
              return _.isEqual(obj1, obj2);
            }
          });
        };
      })(this));
      return _.filter(res, function(o) {
        return o != null;
      });
    };
    this.containsObject = _.includeObject = function(obj, target, comparison) {
      if (comparison == null) {
        comparison = void 0;
      }
      if (obj === null) {
        return false;
      }
      return _.any(obj, (function(_this) {
        return function(value) {
          if (comparison != null) {
            return comparison(value, target);
          } else {
            return _.isEqual(value, target);
          }
        };
      })(this));
    };
    this.differenceObjects = function(array1, array2, comparison) {
      if (comparison == null) {
        comparison = void 0;
      }
      return _.filter(array1, (function(_this) {
        return function(value) {
          return !_this.containsObject(array2, value, comparison);
        };
      })(this));
    };
    this.withoutObjects = this.differenceObjects;
    this.indexOfObject = function(array, item, comparison, isSorted) {
      var i, length;
      if (array == null) {
        return -1;
      }
      i = 0;
      length = array.length;
      if (isSorted) {
        if (typeof isSorted === "number") {
          i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
        } else {
          i = _.sortedIndex(array, item);
          return (array[i] === item ? i : -1);
        }
      }
      while (i < length) {
        if (comparison != null) {
          if (comparison(array[i], item)) {
            return i;
          }
        } else {
          if (_.isEqual(array[i], item)) {
            return i;
          }
        }
        i++;
      }
      return -1;
    };
    this["extends"] = function(arrayOfObjectsToCombine) {
      return _.reduce(arrayOfObjectsToCombine, function(combined, toAdd) {
        return _.extend(combined, toAdd);
      }, {});
    };
    this.isNullOrUndefined = function(thing) {
      return _.isNull(thing || _.isUndefined(thing));
    };
    return this;
  });

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.extensions').factory('uiGmapString', function() {
    return function(str) {
      this.contains = function(value, fromIndex) {
        return str.indexOf(value, fromIndex) !== -1;
      };
      return this;
    };
  });

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').service('uiGmap_sync', [
    function() {
      return {
        fakePromise: function() {
          var _cb;
          _cb = void 0;
          return {
            then: function(cb) {
              return _cb = cb;
            },
            resolve: function() {
              return _cb.apply(void 0, arguments);
            }
          };
        }
      };
    }
  ]).service('uiGmap_async', [
    '$timeout', 'uiGmapPromise', 'uiGmapLogger', '$q', 'uiGmapDataStructures', 'uiGmapGmapUtil', function($timeout, uiGmapPromise, $log, $q, uiGmapDataStructures, uiGmapGmapUtil) {
      var ExposedPromise, PromiseQueueManager, SniffedPromise, defaultChunkSize, doChunk, doSkippPromise, each, errorObject, isInProgress, kickPromise, logTryCatch, managePromiseQueue, map, maybeCancelPromises, promiseStatus, promiseTypes, tryCatch, _getArrayAndKeys, _getIterateeValue;
      promiseTypes = uiGmapPromise.promiseTypes;
      isInProgress = uiGmapPromise.isInProgress;
      promiseStatus = uiGmapPromise.promiseStatus;
      ExposedPromise = uiGmapPromise.ExposedPromise;
      SniffedPromise = uiGmapPromise.SniffedPromise;
      kickPromise = function(sniffedPromise, cancelCb) {
        var promise;
        promise = sniffedPromise.promise();
        promise.promiseType = sniffedPromise.promiseType;
        if (promise.$$state) {
          $log.debug("promiseType: " + promise.promiseType + ", state: " + (promiseStatus(promise.$$state.status)));
        }
        promise.cancelCb = cancelCb;
        return promise;
      };
      doSkippPromise = function(sniffedPromise, lastPromise) {
        if (sniffedPromise.promiseType === promiseTypes.create && lastPromise.promiseType !== promiseTypes["delete"] && lastPromise.promiseType !== promiseTypes.init) {
          $log.debug("lastPromise.promiseType " + lastPromise.promiseType + ", newPromiseType: " + sniffedPromise.promiseType + ", SKIPPED MUST COME AFTER DELETE ONLY");
          return true;
        }
        return false;
      };
      maybeCancelPromises = function(queue, sniffedPromise, lastPromise) {
        var first;
        if (sniffedPromise.promiseType === promiseTypes["delete"] && lastPromise.promiseType !== promiseTypes["delete"]) {
          if ((lastPromise.cancelCb != null) && _.isFunction(lastPromise.cancelCb) && isInProgress(lastPromise)) {
            $log.debug("promiseType: " + sniffedPromise.promiseType + ", CANCELING LAST PROMISE type: " + lastPromise.promiseType);
            lastPromise.cancelCb('cancel safe');
            first = queue.peek();
            if ((first != null) && isInProgress(first)) {
              if (first.hasOwnProperty("cancelCb") && _.isFunction(first.cancelCb)) {
                $log.debug("promiseType: " + first.promiseType + ", CANCELING FIRST PROMISE type: " + first.promiseType);
                return first.cancelCb('cancel safe');
              } else {
                return $log.warn('first promise was not cancelable');
              }
            }
          }
        }
      };

      /*
      From a High Level:
        This is a SniffedPromiseQueueManager (looking to rename) where the queue is existingPiecesObj.existingPieces.
        This is a function and should not be considered a class.
        So it is run to manage the state (cancel, skip, link) as needed.
      Purpose:
      The whole point is to check if there is existing async work going on. If so we wait on it.
      
      arguments:
      - existingPiecesObj =  Queue<Promises>
      - sniffedPromise = object wrapper holding a function to a pending (function) promise (promise: fnPromise)
      with its intended type.
      - cancelCb = callback which accepts a string, this string is intended to be returned at the end of _async.each iterator
      
        Where the cancelCb passed msg is 'cancel safe' _async.each will drop out and fall through. Thus canceling the promise
        gracefully without messing up state.
      
      Synopsis:
      
       - Promises have been broken down to 4 states create, update,delete (3 main) and init. (Helps boil down problems in ordering)
        where (init) is special to indicate that it is one of the first or to allow a create promise to work beyond being after a delete
      
       - Every Promise that comes is is enqueue and linked to the last promise in the queue.
      
       - A promise can be skipped or canceled to save cycles.
      
      Saved Cycles:
        - Skipped - This will only happen if async work comes in out of order. Where a pending create promise (un-executed) comes in
          after a delete promise.
        - Canceled - Where an incoming promise (un-executed promise) is of type delete and the any lastPromise is not a delete type.
      
      
      NOTE:
      - You should not muck with existingPieces as its state is dependent on this functional loop.
      - PromiseQueueManager should not be thought of as a class that has a life expectancy (it has none). It's sole
      purpose is to link, skip, and kill promises. It also manages the promise queue existingPieces.
       */
      PromiseQueueManager = function(existingPiecesObj, sniffedPromise, cancelCb) {
        var lastPromise, newPromise;
        if (!existingPiecesObj.existingPieces) {
          existingPiecesObj.existingPieces = new uiGmapDataStructures.Queue();
          return existingPiecesObj.existingPieces.enqueue(kickPromise(sniffedPromise, cancelCb));
        } else {
          lastPromise = _.last(existingPiecesObj.existingPieces._content);
          if (doSkippPromise(sniffedPromise, lastPromise)) {
            return;
          }
          maybeCancelPromises(existingPiecesObj.existingPieces, sniffedPromise, lastPromise);
          newPromise = ExposedPromise(lastPromise["finally"](function() {
            return kickPromise(sniffedPromise, cancelCb);
          }));
          newPromise.cancelCb = cancelCb;
          newPromise.promiseType = sniffedPromise.promiseType;
          existingPiecesObj.existingPieces.enqueue(newPromise);
          return lastPromise["finally"](function() {
            return existingPiecesObj.existingPieces.dequeue();
          });
        }
      };
      managePromiseQueue = function(objectToLock, promiseType, msg, cancelCb, fnPromise) {
        var cancelLogger;
        if (msg == null) {
          msg = '';
        }
        cancelLogger = function(msg) {
          $log.debug("" + msg + ": " + msg);
          return cancelCb(msg);
        };
        return PromiseQueueManager(objectToLock, SniffedPromise(fnPromise, promiseType), cancelLogger);
      };
      defaultChunkSize = 80;
      errorObject = {
        value: null
      };
      tryCatch = function(fn, ctx, args) {
        var e;
        try {
          return fn.apply(ctx, args);
        } catch (_error) {
          e = _error;
          errorObject.value = e;
          return errorObject;
        }
      };
      logTryCatch = function(fn, ctx, deferred, args) {
        var msg, result;
        result = tryCatch(fn, ctx, args);
        if (result === errorObject) {
          msg = "error within chunking iterator: " + errorObject.value;
          $log.error(msg);
          deferred.reject(msg);
        }
        if (result === 'cancel safe') {
          return false;
        }
        return true;
      };
      _getIterateeValue = function(collection, array, index) {
        var valOrKey, _isArray;
        _isArray = collection === array;
        valOrKey = array[index];
        if (_isArray) {
          return valOrKey;
        }
        return collection[valOrKey];
      };
      _getArrayAndKeys = function(collection, keys, bailOutCb, cb) {
        var array;
        if (angular.isArray(collection)) {
          array = collection;
        } else {
          array = keys ? keys : Object.keys(_.omit(collection, ['length', 'forEach', 'map']));
          keys = array;
        }
        if (cb == null) {
          cb = bailOutCb;
        }
        if (angular.isArray(array) && (array === void 0 || (array != null ? array.length : void 0) <= 0)) {
          if (cb !== bailOutCb) {
            return bailOutCb();
          }
        }
        return cb(array, keys);
      };

      /*
        Author: Nicholas McCready & jfriend00
        _async handles things asynchronous-like :), to allow the UI to be free'd to do other things
        Code taken from http://stackoverflow.com/questions/10344498/best-way-to-iterate-over-an-array-without-blocking-the-ui
      
        The design of any functionality of _async is to be like lodash/underscore and replicate it but call things
        asynchronously underneath. Each should be sufficient for most things to be derived from.
      
        Optional Asynchronous Chunking via promises.
       */
      doChunk = function(collection, chunkSizeOrDontChunk, pauseMilli, chunkCb, pauseCb, overallD, index, _keys) {
        return _getArrayAndKeys(collection, _keys, function(array, keys) {
          var cnt, i, keepGoing, val;
          if (chunkSizeOrDontChunk && chunkSizeOrDontChunk < array.length) {
            cnt = chunkSizeOrDontChunk;
          } else {
            cnt = array.length;
          }
          i = index;
          keepGoing = true;
          while (keepGoing && cnt-- && i < (array ? array.length : i + 1)) {
            val = _getIterateeValue(collection, array, i);
            keepGoing = angular.isFunction(val) ? true : logTryCatch(chunkCb, void 0, overallD, [val, i]);
            ++i;
          }
          if (array) {
            if (keepGoing && i < array.length) {
              index = i;
              if (chunkSizeOrDontChunk) {
                if ((pauseCb != null) && _.isFunction(pauseCb)) {
                  logTryCatch(pauseCb, void 0, overallD, []);
                }
                return $timeout(function() {
                  return doChunk(collection, chunkSizeOrDontChunk, pauseMilli, chunkCb, pauseCb, overallD, index, keys);
                }, pauseMilli, false);
              }
            } else {
              return overallD.resolve();
            }
          }
        });
      };
      each = function(collection, chunk, chunkSizeOrDontChunk, pauseCb, index, pauseMilli, _keys) {
        var error, overallD, ret;
        if (chunkSizeOrDontChunk == null) {
          chunkSizeOrDontChunk = defaultChunkSize;
        }
        if (index == null) {
          index = 0;
        }
        if (pauseMilli == null) {
          pauseMilli = 1;
        }
        ret = void 0;
        overallD = uiGmapPromise.defer();
        ret = overallD.promise;
        if (!pauseMilli) {
          error = 'pause (delay) must be set from _async!';
          $log.error(error);
          overallD.reject(error);
          return ret;
        }
        return _getArrayAndKeys(collection, _keys, function() {
          overallD.resolve();
          return ret;
        }, function(array, keys) {
          doChunk(collection, chunkSizeOrDontChunk, pauseMilli, chunk, pauseCb, overallD, index, keys);
          return ret;
        });
      };
      map = function(collection, iterator, chunkSizeOrDontChunk, pauseCb, index, pauseMilli, _keys) {
        var results;
        results = [];
        return _getArrayAndKeys(collection, _keys, function() {
          return uiGmapPromise.resolve(results);
        }, function(array, keys) {
          return each(collection, function(o) {
            return results.push(iterator(o));
          }, chunkSizeOrDontChunk, pauseCb, index, pauseMilli, keys).then(function() {
            return results;
          });
        });
      };
      return {
        each: each,
        map: map,
        managePromiseQueue: managePromiseQueue,
        promiseLock: managePromiseQueue,
        defaultChunkSize: defaultChunkSize,
        chunkSizeFrom: function(fromSize, ret) {
          if (ret == null) {
            ret = void 0;
          }
          if (_.isNumber(fromSize)) {
            ret = fromSize;
          }
          if (uiGmapGmapUtil.isFalse(fromSize) || fromSize === false) {
            ret = false;
          }
          return ret;
        }
      };
    }
  ]);

}).call(this);
;(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module('uiGmapgoogle-maps.directives.api.utils').factory('uiGmapBaseObject', function() {
    var BaseObject, baseObjectKeywords;
    baseObjectKeywords = ['extended', 'included'];
    BaseObject = (function() {
      function BaseObject() {}

      BaseObject.extend = function(obj) {
        var key, value, _ref;
        for (key in obj) {
          value = obj[key];
          if (__indexOf.call(baseObjectKeywords, key) < 0) {
            this[key] = value;
          }
        }
        if ((_ref = obj.extended) != null) {
          _ref.apply(this);
        }
        return this;
      };

      BaseObject.include = function(obj) {
        var key, value, _ref;
        for (key in obj) {
          value = obj[key];
          if (__indexOf.call(baseObjectKeywords, key) < 0) {
            this.prototype[key] = value;
          }
        }
        if ((_ref = obj.included) != null) {
          _ref.apply(this);
        }
        return this;
      };

      return BaseObject;

    })();
    return BaseObject;
  });

}).call(this);
;
/*
    Useful function callbacks that should be defined at later time.
    Mainly to be used for specs to verify creation / linking.

    This is to lead a common design in notifying child stuff.
 */

(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').factory('uiGmapChildEvents', function() {
    return {
      onChildCreation: function(child) {}
    };
  });

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').service('uiGmapCtrlHandle', [
    '$q', function($q) {
      var CtrlHandle;
      return CtrlHandle = {
        handle: function($scope, $element) {
          $scope.$on('$destroy', function() {
            return CtrlHandle.handle($scope);
          });
          $scope.deferred = $q.defer();
          return {
            getScope: function() {
              return $scope;
            }
          };
        },
        mapPromise: function(scope, ctrl) {
          var mapScope;
          mapScope = ctrl.getScope();
          mapScope.deferred.promise.then(function(map) {
            return scope.map = map;
          });
          return mapScope.deferred.promise;
        }
      };
    }
  ]);

}).call(this);
;(function() {
  angular.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapEventsHelper", [
    "uiGmapLogger", function($log) {
      return {
        setEvents: function(gObject, scope, model, ignores) {
          if (angular.isDefined(scope.events) && (scope.events != null) && angular.isObject(scope.events)) {
            return _.compact(_.map(scope.events, function(eventHandler, eventName) {
              var doIgnore;
              if (ignores) {
                doIgnore = _(ignores).contains(eventName);
              }
              if (scope.events.hasOwnProperty(eventName) && angular.isFunction(scope.events[eventName]) && !doIgnore) {
                return google.maps.event.addListener(gObject, eventName, function() {
                  if (!scope.$evalAsync) {
                    scope.$evalAsync = function() {};
                  }
                  return scope.$evalAsync(eventHandler.apply(scope, [gObject, eventName, model, arguments]));
                });
              }
            }));
          }
        },
        removeEvents: function(listeners) {
          if (!listeners) {
            return;
          }
          return listeners.forEach(function(l) {
            if (l) {
              return google.maps.event.removeListener(l);
            }
          });
        }
      };
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').service('uiGmapFitHelper', [
    'uiGmapLogger', 'uiGmap_async', function($log, _async) {
      return {
        fit: function(gMarkers, gMap) {
          var bounds, everSet;
          if (gMap && gMarkers && gMarkers.length > 0) {
            bounds = new google.maps.LatLngBounds();
            everSet = false;
            gMarkers.forEach((function(_this) {
              return function(gMarker) {
                if (gMarker) {
                  if (!everSet) {
                    everSet = true;
                  }
                  return bounds.extend(gMarker.getPosition());
                }
              };
            })(this));
            if (everSet) {
              return gMap.fitBounds(bounds);
            }
          }
        }
      };
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').service('uiGmapGmapUtil', [
    'uiGmapLogger', '$compile', function(Logger, $compile) {
      var getCoords, getLatitude, getLongitude, validateCoords, _isFalse, _isTruthy;
      _isTruthy = function(value, bool, optionsArray) {
        return value === bool || optionsArray.indexOf(value) !== -1;
      };
      _isFalse = function(value) {
        return _isTruthy(value, false, ['false', 'FALSE', 0, 'n', 'N', 'no', 'NO']);
      };
      getLatitude = function(value) {
        if (Array.isArray(value) && value.length === 2) {
          return value[1];
        } else if (angular.isDefined(value.type) && value.type === 'Point') {
          return value.coordinates[1];
        } else {
          return value.latitude;
        }
      };
      getLongitude = function(value) {
        if (Array.isArray(value) && value.length === 2) {
          return value[0];
        } else if (angular.isDefined(value.type) && value.type === 'Point') {
          return value.coordinates[0];
        } else {
          return value.longitude;
        }
      };
      getCoords = function(value) {
        if (!value) {
          return;
        }
        if (Array.isArray(value) && value.length === 2) {
          return new google.maps.LatLng(value[1], value[0]);
        } else if (angular.isDefined(value.type) && value.type === 'Point') {
          return new google.maps.LatLng(value.coordinates[1], value.coordinates[0]);
        } else {
          return new google.maps.LatLng(value.latitude, value.longitude);
        }
      };
      validateCoords = function(coords) {
        if (angular.isUndefined(coords)) {
          return false;
        }
        if (_.isArray(coords)) {
          if (coords.length === 2) {
            return true;
          }
        } else if ((coords != null) && (coords != null ? coords.type : void 0)) {
          if (coords.type === 'Point' && _.isArray(coords.coordinates) && coords.coordinates.length === 2) {
            return true;
          }
        }
        if (coords && angular.isDefined((coords != null ? coords.latitude : void 0) && angular.isDefined(coords != null ? coords.longitude : void 0))) {
          return true;
        }
        return false;
      };
      return {
        setCoordsFromEvent: function(prevValue, newLatLon) {
          if (!prevValue) {
            return;
          }
          if (Array.isArray(prevValue) && prevValue.length === 2) {
            prevValue[1] = newLatLon.lat();
            prevValue[0] = newLatLon.lng();
          } else if (angular.isDefined(prevValue.type) && prevValue.type === 'Point') {
            prevValue.coordinates[1] = newLatLon.lat();
            prevValue.coordinates[0] = newLatLon.lng();
          } else {
            prevValue.latitude = newLatLon.lat();
            prevValue.longitude = newLatLon.lng();
          }
          return prevValue;
        },
        getLabelPositionPoint: function(anchor) {
          var xPos, yPos;
          if (anchor === void 0) {
            return void 0;
          }
          anchor = /^([-\d\.]+)\s([-\d\.]+)$/.exec(anchor);
          xPos = parseFloat(anchor[1]);
          yPos = parseFloat(anchor[2]);
          if ((xPos != null) && (yPos != null)) {
            return new google.maps.Point(xPos, yPos);
          }
        },
        createWindowOptions: function(gMarker, scope, content, defaults) {
          var options;
          if ((content != null) && (defaults != null) && ($compile != null)) {
            options = angular.extend({}, defaults, {
              content: this.buildContent(scope, defaults, content),
              position: defaults.position != null ? defaults.position : angular.isObject(gMarker) ? gMarker.getPosition() : getCoords(scope.coords)
            });
            if ((gMarker != null) && ((options != null ? options.pixelOffset : void 0) == null)) {
              if (options.boxClass == null) {

              } else {
                options.pixelOffset = {
                  height: 0,
                  width: -2
                };
              }
            }
            return options;
          } else {
            if (!defaults) {
              Logger.error('infoWindow defaults not defined');
              if (!content) {
                return Logger.error('infoWindow content not defined');
              }
            } else {
              return defaults;
            }
          }
        },
        buildContent: function(scope, defaults, content) {
          var parsed, ret;
          if (defaults.content != null) {
            ret = defaults.content;
          } else {
            if ($compile != null) {
              content = content.replace(/^\s+|\s+$/g, '');
              parsed = content === '' ? '' : $compile(content)(scope);
              if (parsed.length > 0) {
                ret = parsed[0];
              }
            } else {
              ret = content;
            }
          }
          return ret;
        },
        defaultDelay: 50,
        isTrue: function(value) {
          return _isTruthy(value, true, ['true', 'TRUE', 1, 'y', 'Y', 'yes', 'YES']);
        },
        isFalse: _isFalse,
        isFalsy: function(value) {
          return _isTruthy(value, false, [void 0, null]) || _isFalse(value);
        },
        getCoords: getCoords,
        validateCoords: validateCoords,
        equalCoords: function(coord1, coord2) {
          return getLatitude(coord1) === getLatitude(coord2) && getLongitude(coord1) === getLongitude(coord2);
        },
        validatePath: function(path) {
          var array, i, polygon, trackMaxVertices;
          i = 0;
          if (angular.isUndefined(path.type)) {
            if (!Array.isArray(path) || path.length < 2) {
              return false;
            }
            while (i < path.length) {
              if (!((angular.isDefined(path[i].latitude) && angular.isDefined(path[i].longitude)) || (typeof path[i].lat === 'function' && typeof path[i].lng === 'function'))) {
                return false;
              }
              i++;
            }
            return true;
          } else {
            if (angular.isUndefined(path.coordinates)) {
              return false;
            }
            if (path.type === 'Polygon') {
              if (path.coordinates[0].length < 4) {
                return false;
              }
              array = path.coordinates[0];
            } else if (path.type === 'MultiPolygon') {
              trackMaxVertices = {
                max: 0,
                index: 0
              };
              _.forEach(path.coordinates, function(polygon, index) {
                if (polygon[0].length > this.max) {
                  this.max = polygon[0].length;
                  return this.index = index;
                }
              }, trackMaxVertices);
              polygon = path.coordinates[trackMaxVertices.index];
              array = polygon[0];
              if (array.length < 4) {
                return false;
              }
            } else if (path.type === 'LineString') {
              if (path.coordinates.length < 2) {
                return false;
              }
              array = path.coordinates;
            } else {
              return false;
            }
            while (i < array.length) {
              if (array[i].length !== 2) {
                return false;
              }
              i++;
            }
            return true;
          }
        },
        convertPathPoints: function(path) {
          var array, i, latlng, result, trackMaxVertices;
          i = 0;
          result = new google.maps.MVCArray();
          if (angular.isUndefined(path.type)) {
            while (i < path.length) {
              latlng;
              if (angular.isDefined(path[i].latitude) && angular.isDefined(path[i].longitude)) {
                latlng = new google.maps.LatLng(path[i].latitude, path[i].longitude);
              } else if (typeof path[i].lat === 'function' && typeof path[i].lng === 'function') {
                latlng = path[i];
              }
              result.push(latlng);
              i++;
            }
          } else {
            array;
            if (path.type === 'Polygon') {
              array = path.coordinates[0];
            } else if (path.type === 'MultiPolygon') {
              trackMaxVertices = {
                max: 0,
                index: 0
              };
              _.forEach(path.coordinates, function(polygon, index) {
                if (polygon[0].length > this.max) {
                  this.max = polygon[0].length;
                  return this.index = index;
                }
              }, trackMaxVertices);
              array = path.coordinates[trackMaxVertices.index][0];
            } else if (path.type === 'LineString') {
              array = path.coordinates;
            }
            while (i < array.length) {
              result.push(new google.maps.LatLng(array[i][1], array[i][0]));
              i++;
            }
          }
          return result;
        },
        extendMapBounds: function(map, points) {
          var bounds, i;
          bounds = new google.maps.LatLngBounds();
          i = 0;
          while (i < points.length) {
            bounds.extend(points.getAt(i));
            i++;
          }
          return map.fitBounds(bounds);
        },
        getPath: function(object, key) {
          var obj;
          if ((key == null) || !_.isString(key)) {
            return key;
          }
          obj = object;
          _.each(key.split('.'), function(value) {
            if (obj) {
              return obj = obj[value];
            }
          });
          return obj;
        },
        validateBoundPoints: function(bounds) {
          if (angular.isUndefined(bounds.sw.latitude) || angular.isUndefined(bounds.sw.longitude) || angular.isUndefined(bounds.ne.latitude) || angular.isUndefined(bounds.ne.longitude)) {
            return false;
          }
          return true;
        },
        convertBoundPoints: function(bounds) {
          var result;
          result = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.sw.latitude, bounds.sw.longitude), new google.maps.LatLng(bounds.ne.latitude, bounds.ne.longitude));
          return result;
        },
        fitMapBounds: function(map, bounds) {
          return map.fitBounds(bounds);
        }
      };
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').service('uiGmapIsReady', [
    '$q', '$timeout', function($q, $timeout) {
      var ctr, promises, proms;
      ctr = 0;
      proms = [];
      promises = function() {
        return $q.all(proms);
      };
      return {
        spawn: function() {
          var d;
          d = $q.defer();
          proms.push(d.promise);
          ctr += 1;
          return {
            instance: ctr,
            deferred: d
          };
        },
        promises: promises,
        instances: function() {
          return ctr;
        },
        promise: function(expect) {
          var d, ohCrap;
          if (expect == null) {
            expect = 1;
          }
          d = $q.defer();
          ohCrap = function() {
            return $timeout(function() {
              if (ctr !== expect) {
                return ohCrap();
              } else {
                return d.resolve(promises());
              }
            });
          };
          ohCrap();
          return d.promise;
        },
        reset: function() {
          ctr = 0;
          return proms.length = 0;
        }
      };
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapLinked", [
    "uiGmapBaseObject", function(BaseObject) {
      var Linked;
      Linked = (function(_super) {
        __extends(Linked, _super);

        function Linked(scope, element, attrs, ctrls) {
          this.scope = scope;
          this.element = element;
          this.attrs = attrs;
          this.ctrls = ctrls;
        }

        return Linked;

      })(BaseObject);
      return Linked;
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').service('uiGmapLogger', [
    '$log', function($log) {
      var LEVELS, Logger, log, maybeExecLevel;
      LEVELS = {
        log: 1,
        info: 2,
        debug: 3,
        warn: 4,
        error: 5,
        none: 6
      };
      maybeExecLevel = function(level, current, fn) {
        if (level >= current) {
          return fn();
        }
      };
      log = function(logLevelFnName, msg) {
        if ($log != null) {
          return $log[logLevelFnName](msg);
        } else {
          return console[logLevelFnName](msg);
        }
      };
      Logger = (function() {
        function Logger() {
          var logFns;
          this.doLog = true;
          logFns = {};
          ['log', 'info', 'debug', 'warn', 'error'].forEach((function(_this) {
            return function(level) {
              return logFns[level] = function(msg) {
                if (_this.doLog) {
                  return maybeExecLevel(LEVELS[level], _this.currentLevel, function() {
                    return log(level, msg);
                  });
                }
              };
            };
          })(this));
          this.LEVELS = LEVELS;
          this.currentLevel = LEVELS.error;
          this.log = logFns['log'];
          this.info = logFns['info'];
          this.debug = logFns['debug'];
          this.warn = logFns['warn'];
          this.error = logFns['error'];
        }

        Logger.prototype.spawn = function() {
          return new Logger();
        };

        Logger.prototype.setLog = function(someLogger) {
          return $log = someLogger;
        };

        return Logger;

      })();
      return new Logger();
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.utils').factory('uiGmapModelKey', [
    'uiGmapBaseObject', 'uiGmapGmapUtil', 'uiGmapPromise', '$q', '$timeout', function(BaseObject, GmapUtil, uiGmapPromise, $q, $timeout) {
      var ModelKey;
      return ModelKey = (function(_super) {
        __extends(ModelKey, _super);

        function ModelKey(scope) {
          this.scope = scope;
          this.modelsLength = __bind(this.modelsLength, this);
          this.updateChild = __bind(this.updateChild, this);
          this.destroy = __bind(this.destroy, this);
          this.onDestroy = __bind(this.onDestroy, this);
          this.setChildScope = __bind(this.setChildScope, this);
          this.getChanges = __bind(this.getChanges, this);
          this.getProp = __bind(this.getProp, this);
          this.setIdKey = __bind(this.setIdKey, this);
          this.modelKeyComparison = __bind(this.modelKeyComparison, this);
          ModelKey.__super__.constructor.call(this);
          this["interface"] = {};
          this["interface"].scopeKeys = [];
          this.defaultIdKey = 'id';
          this.idKey = void 0;
        }

        ModelKey.prototype.evalModelHandle = function(model, modelKey) {
          if ((model == null) || (modelKey == null)) {
            return;
          }
          if (modelKey === 'self') {
            return model;
          } else {
            if (_.isFunction(modelKey)) {
              modelKey = modelKey();
            }
            return GmapUtil.getPath(model, modelKey);
          }
        };

        ModelKey.prototype.modelKeyComparison = function(model1, model2) {
          var hasCoords, isEqual, scope;
          hasCoords = _.contains(this["interface"].scopeKeys, 'coords');
          if (hasCoords && (this.scope.coords != null) || !hasCoords) {
            scope = this.scope;
          }
          if (scope == null) {
            throw 'No scope set!';
          }
          if (hasCoords) {
            isEqual = GmapUtil.equalCoords(this.evalModelHandle(model1, scope.coords), this.evalModelHandle(model2, scope.coords));
            if (!isEqual) {
              return isEqual;
            }
          }
          isEqual = _.every(_.without(this["interface"].scopeKeys, 'coords'), (function(_this) {
            return function(k) {
              return _this.evalModelHandle(model1, scope[k]) === _this.evalModelHandle(model2, scope[k]);
            };
          })(this));
          return isEqual;
        };

        ModelKey.prototype.setIdKey = function(scope) {
          return this.idKey = scope.idKey != null ? scope.idKey : this.defaultIdKey;
        };

        ModelKey.prototype.setVal = function(model, key, newValue) {
          var thingToSet;
          thingToSet = this.modelOrKey(model, key);
          thingToSet = newValue;
          return model;
        };

        ModelKey.prototype.modelOrKey = function(model, key) {
          if (key == null) {
            return;
          }
          if (key !== 'self') {
            return model[key];
          }
          return model;
        };

        ModelKey.prototype.getProp = function(propName, model) {
          return this.modelOrKey(model, propName);
        };


        /*
        For the cases were watching a large object we only want to know the list of props
        that actually changed.
        Also we want to limit the amount of props we analyze to whitelisted props that are
        actually tracked by scope. (should make things faster with whitelisted)
         */

        ModelKey.prototype.getChanges = function(now, prev, whitelistedProps) {
          var c, changes, prop;
          if (whitelistedProps) {
            prev = _.pick(prev, whitelistedProps);
            now = _.pick(now, whitelistedProps);
          }
          changes = {};
          prop = {};
          c = {};
          for (prop in now) {
            if (!prev || prev[prop] !== now[prop]) {
              if (_.isArray(now[prop])) {
                changes[prop] = now[prop];
              } else if (_.isObject(now[prop])) {
                c = this.getChanges(now[prop], (prev ? prev[prop] : null));
                if (!_.isEmpty(c)) {
                  changes[prop] = c;
                }
              } else {
                changes[prop] = now[prop];
              }
            }
          }
          return changes;
        };

        ModelKey.prototype.scopeOrModelVal = function(key, scope, model, doWrap) {
          var maybeWrap, modelKey, modelProp, scopeProp;
          if (doWrap == null) {
            doWrap = false;
          }
          maybeWrap = function(isScope, ret, doWrap) {
            if (doWrap == null) {
              doWrap = false;
            }
            if (doWrap) {
              return {
                isScope: isScope,
                value: ret
              };
            }
            return ret;
          };
          scopeProp = scope[key];
          if (_.isFunction(scopeProp)) {
            return maybeWrap(true, scopeProp(model), doWrap);
          }
          if (_.isObject(scopeProp)) {
            return maybeWrap(true, scopeProp, doWrap);
          }
          if (!_.isString(scopeProp)) {
            return maybeWrap(true, scopeProp, doWrap);
          }
          modelKey = scopeProp;
          if (!modelKey) {
            modelProp = model[key];
          } else {
            modelProp = modelKey === 'self' ? model : model[modelKey];
          }
          if (_.isFunction(modelProp)) {
            return maybeWrap(false, modelProp(), doWrap);
          }
          return maybeWrap(false, modelProp, doWrap);
        };

        ModelKey.prototype.setChildScope = function(keys, childScope, model) {
          _.each(keys, (function(_this) {
            return function(name) {
              var isScopeObj, newValue;
              isScopeObj = _this.scopeOrModelVal(name, childScope, model, true);
              if ((isScopeObj != null ? isScopeObj.value : void 0) != null) {
                newValue = isScopeObj.value;
                if (newValue !== childScope[name]) {
                  return childScope[name] = newValue;
                }
              }
            };
          })(this));
          return childScope.model = model;
        };

        ModelKey.prototype.onDestroy = function(scope) {};

        ModelKey.prototype.destroy = function(manualOverride) {
          var _ref;
          if (manualOverride == null) {
            manualOverride = false;
          }
          if ((this.scope != null) && !((_ref = this.scope) != null ? _ref.$$destroyed : void 0) && (this.needToManualDestroy || manualOverride)) {
            return this.scope.$destroy();
          } else {
            return this.clean();
          }
        };

        ModelKey.prototype.updateChild = function(child, model) {
          if (model[this.idKey] == null) {
            this.$log.error("Model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.");
            return;
          }
          return child.updateModel(model);
        };

        ModelKey.prototype.modelsLength = function() {
          var len;
          len = 0;
          if (this.scope.models == null) {
            return len;
          }
          if (angular.isArray(this.scope.models) || (this.scope.models.length != null)) {
            len = this.scope.models.length;
          } else {
            len = Object.keys(this.scope.models).length;
          }
          return len;
        };

        return ModelKey;

      })(BaseObject);
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').factory('uiGmapModelsWatcher', [
    'uiGmapLogger', 'uiGmap_async', '$q', 'uiGmapPromise', function(Logger, _async, $q, uiGmapPromise) {
      return {
        didQueueInitPromise: function(existingPiecesObj, scope) {
          if (scope.models.length === 0) {
            _async.promiseLock(existingPiecesObj, uiGmapPromise.promiseTypes.init, null, null, ((function(_this) {
              return function() {
                return uiGmapPromise.resolve();
              };
            })(this)));
            return true;
          }
          return false;
        },
        figureOutState: function(idKey, scope, childObjects, comparison, callBack) {
          var adds, children, mappedScopeModelIds, removals, updates;
          adds = [];
          mappedScopeModelIds = {};
          removals = [];
          updates = [];
          scope.models.forEach(function(m) {
            var child;
            if (m[idKey] != null) {
              mappedScopeModelIds[m[idKey]] = {};
              if (childObjects.get(m[idKey]) == null) {
                return adds.push(m);
              } else {
                child = childObjects.get(m[idKey]);
                if (!comparison(m, child.clonedModel)) {
                  return updates.push({
                    model: m,
                    child: child
                  });
                }
              }
            } else {
              return Logger.error(' id missing for model #{m.toString()},\ncan not use do comparison/insertion');
            }
          });
          children = childObjects.values();
          children.forEach(function(c) {
            var id;
            if (c == null) {
              Logger.error('child undefined in ModelsWatcher.');
              return;
            }
            if (c.model == null) {
              Logger.error('child.model undefined in ModelsWatcher.');
              return;
            }
            id = c.model[idKey];
            if (mappedScopeModelIds[id] == null) {
              return removals.push(c);
            }
          });
          return {
            adds: adds,
            removals: removals,
            updates: updates
          };
        }
      };
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').service('uiGmapPromise', [
    '$q', '$timeout', 'uiGmapLogger', function($q, $timeout, $log) {
      var ExposedPromise, SniffedPromise, defer, isInProgress, isResolved, promise, promiseStatus, promiseStatuses, promiseTypes, resolve, strPromiseStatuses;
      promiseTypes = {
        create: 'create',
        update: 'update',
        "delete": 'delete',
        init: 'init'
      };
      promiseStatuses = {
        IN_PROGRESS: 0,
        RESOLVED: 1,
        REJECTED: 2
      };
      strPromiseStatuses = (function() {
        var obj;
        obj = {};
        obj["" + promiseStatuses.IN_PROGRESS] = 'in-progress';
        obj["" + promiseStatuses.RESOLVED] = 'resolved';
        obj["" + promiseStatuses.REJECTED] = 'rejected';
        return obj;
      })();
      isInProgress = function(promise) {
        if (promise.$$state) {
          return promise.$$state.status === promiseStatuses.IN_PROGRESS;
        }
        if (!promise.hasOwnProperty("$$v")) {
          return true;
        }
      };
      isResolved = function(promise) {
        if (promise.$$state) {
          return promise.$$state.status === promiseStatuses.RESOLVED;
        }
        if (promise.hasOwnProperty("$$v")) {
          return true;
        }
      };
      promiseStatus = function(status) {
        return strPromiseStatuses[status] || 'done w error';
      };
      ExposedPromise = function(promise) {
        var cancelDeferred, combined, wrapped;
        cancelDeferred = $q.defer();
        combined = $q.all([promise, cancelDeferred.promise]);
        wrapped = $q.defer();
        promise.then(cancelDeferred.resolve, (function() {}), function(notify) {
          cancelDeferred.notify(notify);
          return wrapped.notify(notify);
        });
        combined.then(function(successes) {
          return wrapped.resolve(successes[0] || successes[1]);
        }, function(error) {
          return wrapped.reject(error);
        });
        wrapped.promise.cancel = function(reason) {
          if (reason == null) {
            reason = 'canceled';
          }
          return cancelDeferred.reject(reason);
        };
        wrapped.promise.notify = function(msg) {
          if (msg == null) {
            msg = 'cancel safe';
          }
          wrapped.notify(msg);
          if (promise.hasOwnProperty('notify')) {
            return promise.notify(msg);
          }
        };
        if (promise.promiseType != null) {
          wrapped.promise.promiseType = promise.promiseType;
        }
        return wrapped.promise;
      };
      SniffedPromise = function(fnPromise, promiseType) {
        return {
          promise: fnPromise,
          promiseType: promiseType
        };
      };
      defer = function() {
        return $q.defer();
      };
      resolve = function() {
        var d;
        d = $q.defer();
        d.resolve.apply(void 0, arguments);
        return d.promise;
      };
      promise = function(fnToWrap) {
        var d;
        if (!_.isFunction(fnToWrap)) {
          $log.error("uiGmapPromise.promise() only accepts functions");
          return;
        }
        d = $q.defer();
        $timeout(function() {
          var result;
          result = fnToWrap();
          return d.resolve(result);
        });
        return d.promise;
      };
      return {
        defer: defer,
        promise: promise,
        resolve: resolve,
        promiseTypes: promiseTypes,
        isInProgress: isInProgress,
        isResolved: isResolved,
        promiseStatus: promiseStatus,
        ExposedPromise: ExposedPromise,
        SniffedPromise: SniffedPromise
      };
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapPropMap", function() {

    /*
      Simple Object Map with a length property to make it easy to track length/size
     */
    var PropMap;
    return PropMap = (function() {
      function PropMap() {
        this.removeAll = __bind(this.removeAll, this);
        this.slice = __bind(this.slice, this);
        this.push = __bind(this.push, this);
        this.keys = __bind(this.keys, this);
        this.values = __bind(this.values, this);
        this.remove = __bind(this.remove, this);
        this.put = __bind(this.put, this);
        this.stateChanged = __bind(this.stateChanged, this);
        this.get = __bind(this.get, this);
        this.length = 0;
        this.dict = {};
        this.didValsStateChange = false;
        this.didKeysStateChange = false;
        this.allVals = [];
        this.allKeys = [];
      }

      PropMap.prototype.get = function(key) {
        return this.dict[key];
      };

      PropMap.prototype.stateChanged = function() {
        this.didValsStateChange = true;
        return this.didKeysStateChange = true;
      };

      PropMap.prototype.put = function(key, value) {
        if (this.get(key) == null) {
          this.length++;
        }
        this.stateChanged();
        return this.dict[key] = value;
      };

      PropMap.prototype.remove = function(key, isSafe) {
        var value;
        if (isSafe == null) {
          isSafe = false;
        }
        if (isSafe && !this.get(key)) {
          return void 0;
        }
        value = this.dict[key];
        delete this.dict[key];
        this.length--;
        this.stateChanged();
        return value;
      };

      PropMap.prototype.valuesOrKeys = function(str) {
        var keys, vals;
        if (str == null) {
          str = 'Keys';
        }
        if (!this["did" + str + "StateChange"]) {
          return this['all' + str];
        }
        vals = [];
        keys = [];
        _.each(this.dict, function(v, k) {
          vals.push(v);
          return keys.push(k);
        });
        this.didKeysStateChange = false;
        this.didValsStateChange = false;
        this.allVals = vals;
        this.allKeys = keys;
        return this['all' + str];
      };

      PropMap.prototype.values = function() {
        return this.valuesOrKeys('Vals');
      };

      PropMap.prototype.keys = function() {
        return this.valuesOrKeys();
      };

      PropMap.prototype.push = function(obj, key) {
        if (key == null) {
          key = "key";
        }
        return this.put(obj[key], obj);
      };

      PropMap.prototype.slice = function() {
        return this.keys().map((function(_this) {
          return function(k) {
            return _this.remove(k);
          };
        })(this));
      };

      PropMap.prototype.removeAll = function() {
        return this.slice();
      };

      PropMap.prototype.each = function(cb) {
        return _.each(this.dict, function(v, k) {
          return cb(v);
        });
      };

      PropMap.prototype.map = function(cb) {
        return _.map(this.dict, function(v, k) {
          return cb(v);
        });
      };

      return PropMap;

    })();
  });

}).call(this);
;(function() {
  angular.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapPropertyAction", [
    "uiGmapLogger", function(Logger) {
      var PropertyAction;
      PropertyAction = function(setterFn) {
        this.setIfChange = function(newVal, oldVal) {
          var callingKey;
          callingKey = this.exp;
          if (!_.isEqual(oldVal, newVal)) {
            return setterFn(callingKey, newVal);
          }
        };
        this.sic = this.setIfChange;
        return this;
      };
      return PropertyAction;
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module('uiGmapgoogle-maps.directives.api.managers').factory('uiGmapClustererMarkerManager', [
    'uiGmapLogger', 'uiGmapFitHelper', 'uiGmapPropMap', function($log, FitHelper, PropMap) {
      var ClustererMarkerManager;
      ClustererMarkerManager = (function() {
        ClustererMarkerManager.type = 'ClustererMarkerManager';

        function ClustererMarkerManager(gMap, opt_markers, opt_options, opt_events) {
          if (opt_markers == null) {
            opt_markers = {};
          }
          this.opt_options = opt_options != null ? opt_options : {};
          this.opt_events = opt_events;
          this.checkSync = __bind(this.checkSync, this);
          this.getGMarkers = __bind(this.getGMarkers, this);
          this.fit = __bind(this.fit, this);
          this.destroy = __bind(this.destroy, this);
          this.clear = __bind(this.clear, this);
          this.draw = __bind(this.draw, this);
          this.removeMany = __bind(this.removeMany, this);
          this.remove = __bind(this.remove, this);
          this.addMany = __bind(this.addMany, this);
          this.update = __bind(this.update, this);
          this.add = __bind(this.add, this);
          this.type = ClustererMarkerManager.type;
          this.clusterer = new NgMapMarkerClusterer(gMap, opt_markers, this.opt_options);
          this.propMapGMarkers = new PropMap();
          this.attachEvents(this.opt_events, 'opt_events');
          this.clusterer.setIgnoreHidden(true);
          this.noDrawOnSingleAddRemoves = true;
          $log.info(this);
        }

        ClustererMarkerManager.prototype.checkKey = function(gMarker) {
          var msg;
          if (gMarker.key == null) {
            msg = 'gMarker.key undefined and it is REQUIRED!!';
            return $log.error(msg);
          }
        };

        ClustererMarkerManager.prototype.add = function(gMarker) {
          this.checkKey(gMarker);
          this.clusterer.addMarker(gMarker, this.noDrawOnSingleAddRemoves);
          this.propMapGMarkers.put(gMarker.key, gMarker);
          return this.checkSync();
        };

        ClustererMarkerManager.prototype.update = function(gMarker) {
          this.remove(gMarker);
          return this.add(gMarker);
        };

        ClustererMarkerManager.prototype.addMany = function(gMarkers) {
          return gMarkers.forEach((function(_this) {
            return function(gMarker) {
              return _this.add(gMarker);
            };
          })(this));
        };

        ClustererMarkerManager.prototype.remove = function(gMarker) {
          var exists;
          this.checkKey(gMarker);
          exists = this.propMapGMarkers.get(gMarker.key);
          if (exists) {
            this.clusterer.removeMarker(gMarker, this.noDrawOnSingleAddRemoves);
            this.propMapGMarkers.remove(gMarker.key);
          }
          return this.checkSync();
        };

        ClustererMarkerManager.prototype.removeMany = function(gMarkers) {
          return gMarkers.forEach((function(_this) {
            return function(gMarker) {
              return _this.remove(gMarker);
            };
          })(this));
        };

        ClustererMarkerManager.prototype.draw = function() {
          return this.clusterer.repaint();
        };

        ClustererMarkerManager.prototype.clear = function() {
          this.removeMany(this.getGMarkers());
          return this.clusterer.repaint();
        };

        ClustererMarkerManager.prototype.attachEvents = function(options, optionsName) {
          var eventHandler, eventName, _results;
          if (angular.isDefined(options) && (options != null) && angular.isObject(options)) {
            _results = [];
            for (eventName in options) {
              eventHandler = options[eventName];
              if (options.hasOwnProperty(eventName) && angular.isFunction(options[eventName])) {
                $log.info("" + optionsName + ": Attaching event: " + eventName + " to clusterer");
                _results.push(google.maps.event.addListener(this.clusterer, eventName, options[eventName]));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }
        };

        ClustererMarkerManager.prototype.clearEvents = function(options, optionsName) {
          var eventHandler, eventName, _results;
          if (angular.isDefined(options) && (options != null) && angular.isObject(options)) {
            _results = [];
            for (eventName in options) {
              eventHandler = options[eventName];
              if (options.hasOwnProperty(eventName) && angular.isFunction(options[eventName])) {
                $log.info("" + optionsName + ": Clearing event: " + eventName + " to clusterer");
                _results.push(google.maps.event.clearListeners(this.clusterer, eventName));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }
        };

        ClustererMarkerManager.prototype.destroy = function() {
          this.clearEvents(this.opt_events, 'opt_events');
          return this.clear();
        };

        ClustererMarkerManager.prototype.fit = function() {
          return FitHelper.fit(this.getGMarkers(), this.clusterer.getMap());
        };

        ClustererMarkerManager.prototype.getGMarkers = function() {
          return this.clusterer.getMarkers().values();
        };

        ClustererMarkerManager.prototype.checkSync = function() {};

        return ClustererMarkerManager;

      })();
      return ClustererMarkerManager;
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("uiGmapgoogle-maps.directives.api.managers").factory("uiGmapMarkerManager", [
    "uiGmapLogger", "uiGmapFitHelper", "uiGmapPropMap", function(Logger, FitHelper, PropMap) {
      var MarkerManager;
      MarkerManager = (function() {
        MarkerManager.type = 'MarkerManager';

        function MarkerManager(gMap, opt_markers, opt_options) {
          this.getGMarkers = __bind(this.getGMarkers, this);
          this.fit = __bind(this.fit, this);
          this.handleOptDraw = __bind(this.handleOptDraw, this);
          this.clear = __bind(this.clear, this);
          this.draw = __bind(this.draw, this);
          this.removeMany = __bind(this.removeMany, this);
          this.remove = __bind(this.remove, this);
          this.addMany = __bind(this.addMany, this);
          this.update = __bind(this.update, this);
          this.add = __bind(this.add, this);
          this.type = MarkerManager.type;
          this.gMap = gMap;
          this.gMarkers = new PropMap();
          this.$log = Logger;
          this.$log.info(this);
        }

        MarkerManager.prototype.add = function(gMarker, optDraw) {
          var exists, msg;
          if (optDraw == null) {
            optDraw = true;
          }
          if (gMarker.key == null) {
            msg = "gMarker.key undefined and it is REQUIRED!!";
            Logger.error(msg);
            throw msg;
          }
          exists = this.gMarkers.get(gMarker.key);
          if (!exists) {
            this.handleOptDraw(gMarker, optDraw, true);
            return this.gMarkers.put(gMarker.key, gMarker);
          }
        };

        MarkerManager.prototype.update = function(gMarker, optDraw) {
          if (optDraw == null) {
            optDraw = true;
          }
          this.remove(gMarker, optDraw);
          return this.add(gMarker, optDraw);
        };

        MarkerManager.prototype.addMany = function(gMarkers) {
          return gMarkers.forEach((function(_this) {
            return function(gMarker) {
              return _this.add(gMarker);
            };
          })(this));
        };

        MarkerManager.prototype.remove = function(gMarker, optDraw) {
          if (optDraw == null) {
            optDraw = true;
          }
          this.handleOptDraw(gMarker, optDraw, false);
          if (this.gMarkers.get(gMarker.key)) {
            return this.gMarkers.remove(gMarker.key);
          }
        };

        MarkerManager.prototype.removeMany = function(gMarkers) {
          return gMarkers.forEach((function(_this) {
            return function(marker) {
              return _this.remove(marker);
            };
          })(this));
        };

        MarkerManager.prototype.draw = function() {
          var deletes;
          deletes = [];
          this.gMarkers.each((function(_this) {
            return function(gMarker) {
              if (!gMarker.isDrawn) {
                if (gMarker.doAdd) {
                  gMarker.setMap(_this.gMap);
                  return gMarker.isDrawn = true;
                } else {
                  return deletes.push(gMarker);
                }
              }
            };
          })(this));
          return deletes.forEach((function(_this) {
            return function(gMarker) {
              gMarker.isDrawn = false;
              return _this.remove(gMarker, true);
            };
          })(this));
        };

        MarkerManager.prototype.clear = function() {
          this.gMarkers.each(function(gMarker) {
            return gMarker.setMap(null);
          });
          delete this.gMarkers;
          return this.gMarkers = new PropMap();
        };

        MarkerManager.prototype.handleOptDraw = function(gMarker, optDraw, doAdd) {
          if (optDraw === true) {
            if (doAdd) {
              gMarker.setMap(this.gMap);
            } else {
              gMarker.setMap(null);
            }
            return gMarker.isDrawn = true;
          } else {
            gMarker.isDrawn = false;
            return gMarker.doAdd = doAdd;
          }
        };

        MarkerManager.prototype.fit = function() {
          return FitHelper.fit(this.getGMarkers(), this.gMap);
        };

        MarkerManager.prototype.getGMarkers = function() {
          return this.gMarkers.values();
        };

        return MarkerManager;

      })();
      return MarkerManager;
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps').factory('uiGmapadd-events', [
    '$timeout', function($timeout) {
      var addEvent, addEvents;
      addEvent = function(target, eventName, handler) {
        return google.maps.event.addListener(target, eventName, function() {
          handler.apply(this, arguments);
          return $timeout((function() {}), true);
        });
      };
      addEvents = function(target, eventName, handler) {
        var remove;
        if (handler) {
          return addEvent(target, eventName, handler);
        }
        remove = [];
        angular.forEach(eventName, function(_handler, key) {
          return remove.push(addEvent(target, key, _handler));
        });
        return function() {
          angular.forEach(remove, function(listener) {
            return google.maps.event.removeListener(listener);
          });
          return remove = null;
        };
      };
      return addEvents;
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps').factory('uiGmaparray-sync', [
    'uiGmapadd-events', function(mapEvents) {
      return function(mapArray, scope, pathEval, pathChangedFn) {
        var geojsonArray, geojsonHandlers, geojsonWatcher, isSetFromScope, legacyHandlers, legacyWatcher, mapArrayListener, scopePath, watchListener;
        isSetFromScope = false;
        scopePath = scope.$eval(pathEval);
        if (!scope["static"]) {
          legacyHandlers = {
            set_at: function(index) {
              var value;
              if (isSetFromScope) {
                return;
              }
              value = mapArray.getAt(index);
              if (!value) {
                return;
              }
              if (!value.lng || !value.lat) {
                return scopePath[index] = value;
              } else {
                scopePath[index].latitude = value.lat();
                return scopePath[index].longitude = value.lng();
              }
            },
            insert_at: function(index) {
              var value;
              if (isSetFromScope) {
                return;
              }
              value = mapArray.getAt(index);
              if (!value) {
                return;
              }
              if (!value.lng || !value.lat) {
                return scopePath.splice(index, 0, value);
              } else {
                return scopePath.splice(index, 0, {
                  latitude: value.lat(),
                  longitude: value.lng()
                });
              }
            },
            remove_at: function(index) {
              if (isSetFromScope) {
                return;
              }
              return scopePath.splice(index, 1);
            }
          };
          geojsonArray;
          if (scopePath.type === 'Polygon') {
            geojsonArray = scopePath.coordinates[0];
          } else if (scopePath.type === 'LineString') {
            geojsonArray = scopePath.coordinates;
          }
          geojsonHandlers = {
            set_at: function(index) {
              var value;
              if (isSetFromScope) {
                return;
              }
              value = mapArray.getAt(index);
              if (!value) {
                return;
              }
              if (!value.lng || !value.lat) {
                return;
              }
              geojsonArray[index][1] = value.lat();
              return geojsonArray[index][0] = value.lng();
            },
            insert_at: function(index) {
              var value;
              if (isSetFromScope) {
                return;
              }
              value = mapArray.getAt(index);
              if (!value) {
                return;
              }
              if (!value.lng || !value.lat) {
                return;
              }
              return geojsonArray.splice(index, 0, [value.lng(), value.lat()]);
            },
            remove_at: function(index) {
              if (isSetFromScope) {
                return;
              }
              return geojsonArray.splice(index, 1);
            }
          };
          mapArrayListener = mapEvents(mapArray, angular.isUndefined(scopePath.type) ? legacyHandlers : geojsonHandlers);
        }
        legacyWatcher = function(newPath) {
          var changed, i, l, newLength, newValue, oldArray, oldLength, oldValue;
          isSetFromScope = true;
          oldArray = mapArray;
          changed = false;
          if (newPath) {
            i = 0;
            oldLength = oldArray.getLength();
            newLength = newPath.length;
            l = Math.min(oldLength, newLength);
            newValue = void 0;
            while (i < l) {
              oldValue = oldArray.getAt(i);
              newValue = newPath[i];
              if (typeof newValue.equals === 'function') {
                if (!newValue.equals(oldValue)) {
                  oldArray.setAt(i, newValue);
                  changed = true;
                }
              } else {
                if ((oldValue.lat() !== newValue.latitude) || (oldValue.lng() !== newValue.longitude)) {
                  oldArray.setAt(i, new google.maps.LatLng(newValue.latitude, newValue.longitude));
                  changed = true;
                }
              }
              i++;
            }
            while (i < newLength) {
              newValue = newPath[i];
              if (typeof newValue.lat === 'function' && typeof newValue.lng === 'function') {
                oldArray.push(newValue);
              } else {
                oldArray.push(new google.maps.LatLng(newValue.latitude, newValue.longitude));
              }
              changed = true;
              i++;
            }
            while (i < oldLength) {
              oldArray.pop();
              changed = true;
              i++;
            }
          }
          isSetFromScope = false;
          if (changed) {
            return pathChangedFn(oldArray);
          }
        };
        geojsonWatcher = function(newPath) {
          var array, changed, i, l, newLength, newValue, oldArray, oldLength, oldValue;
          isSetFromScope = true;
          oldArray = mapArray;
          changed = false;
          if (newPath) {
            array;
            if (scopePath.type === 'Polygon') {
              array = newPath.coordinates[0];
            } else if (scopePath.type === 'LineString') {
              array = newPath.coordinates;
            }
            i = 0;
            oldLength = oldArray.getLength();
            newLength = array.length;
            l = Math.min(oldLength, newLength);
            newValue = void 0;
            while (i < l) {
              oldValue = oldArray.getAt(i);
              newValue = array[i];
              if ((oldValue.lat() !== newValue[1]) || (oldValue.lng() !== newValue[0])) {
                oldArray.setAt(i, new google.maps.LatLng(newValue[1], newValue[0]));
                changed = true;
              }
              i++;
            }
            while (i < newLength) {
              newValue = array[i];
              oldArray.push(new google.maps.LatLng(newValue[1], newValue[0]));
              changed = true;
              i++;
            }
            while (i < oldLength) {
              oldArray.pop();
              changed = true;
              i++;
            }
          }
          isSetFromScope = false;
          if (changed) {
            return pathChangedFn(oldArray);
          }
        };
        watchListener;
        if (!scope["static"]) {
          if (angular.isUndefined(scopePath.type)) {
            watchListener = scope.$watchCollection(pathEval, legacyWatcher);
          } else {
            watchListener = scope.$watch(pathEval, geojsonWatcher, true);
          }
        }
        return function() {
          if (mapArrayListener) {
            mapArrayListener();
            mapArrayListener = null;
          }
          if (watchListener) {
            watchListener();
            return watchListener = null;
          }
        };
      };
    }
  ]);

}).call(this);
;(function() {
  angular.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapChromeFixes", [
    '$timeout', function($timeout) {
      return {
        maybeRepaint: function(el) {
          if (el) {
            el.style.opacity = 0.9;
            return $timeout(function() {
              return el.style.opacity = 1;
            });
          }
        }
      };
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps').service('uiGmapObjectIterators', function() {
    var _ignores, _iterators, _slapForEach, _slapMap;
    _ignores = ['length', 'forEach', 'map'];
    _iterators = [];
    _slapForEach = function(object) {
      object.forEach = function(cb) {
        return _.each(_.omit(object, _ignores), function(val) {
          if (!_.isFunction(val)) {
            return cb(val);
          }
        });
      };
      return object;
    };
    _iterators.push(_slapForEach);
    _slapMap = function(object) {
      object.map = function(cb) {
        return _.map(_.omit(object, _ignores), function(val) {
          if (!_.isFunction(val)) {
            return cb(val);
          }
        });
      };
      return object;
    };
    _iterators.push(_slapMap);
    return {
      slapMap: _slapMap,
      slapForEach: _slapForEach,
      slapAll: function(object) {
        _iterators.forEach(function(it) {
          return it(object);
        });
        return object;
      }
    };
  });

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.options.builders').service('uiGmapCommonOptionsBuilder', [
    'uiGmapBaseObject', 'uiGmapLogger', 'uiGmapModelKey', function(BaseObject, $log, ModelKey) {
      var CommonOptionsBuilder;
      return CommonOptionsBuilder = (function(_super) {
        __extends(CommonOptionsBuilder, _super);

        function CommonOptionsBuilder() {
          this.watchProps = __bind(this.watchProps, this);
          this.buildOpts = __bind(this.buildOpts, this);
          return CommonOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        CommonOptionsBuilder.prototype.props = [
          'clickable', 'draggable', 'editable', 'visible', {
            prop: 'stroke',
            isColl: true
          }
        ];

        CommonOptionsBuilder.prototype.getCorrectModel = function(scope) {
          if (angular.isDefined(scope != null ? scope.model : void 0)) {
            return scope.model;
          } else {
            return scope;
          }
        };

        CommonOptionsBuilder.prototype.buildOpts = function(customOpts, cachedEval, forEachOpts) {
          var model, opts, stroke;
          if (customOpts == null) {
            customOpts = {};
          }
          if (forEachOpts == null) {
            forEachOpts = {};
          }
          if (!this.scope) {
            $log.error('this.scope not defined in CommonOptionsBuilder can not buildOpts');
            return;
          }
          if (!this.map) {
            $log.error('this.map not defined in CommonOptionsBuilder can not buildOpts');
            return;
          }
          model = this.getCorrectModel(this.scope);
          stroke = this.scopeOrModelVal('stroke', this.scope, model);
          opts = angular.extend(customOpts, this.DEFAULTS, {
            map: this.map,
            strokeColor: stroke != null ? stroke.color : void 0,
            strokeOpacity: stroke != null ? stroke.opacity : void 0,
            strokeWeight: stroke != null ? stroke.weight : void 0
          });
          angular.forEach(angular.extend(forEachOpts, {
            clickable: true,
            draggable: false,
            editable: false,
            "static": false,
            fit: false,
            visible: true,
            zIndex: 0,
            icons: []
          }), (function(_this) {
            return function(defaultValue, key) {
              var val;
              val = cachedEval ? cachedEval[key] : _this.scopeOrModelVal(key, _this.scope, model);
              if (angular.isUndefined(val)) {
                return opts[key] = defaultValue;
              } else {
                return opts[key] = model[key];
              }
            };
          })(this));
          if (opts["static"]) {
            opts.editable = false;
          }
          return opts;
        };

        CommonOptionsBuilder.prototype.watchProps = function(props) {
          if (props == null) {
            props = this.props;
          }
          return props.forEach((function(_this) {
            return function(prop) {
              if ((_this.attrs[prop] != null) || (_this.attrs[prop != null ? prop.prop : void 0] != null)) {
                if (prop != null ? prop.isColl : void 0) {
                  return _this.scope.$watchCollection(prop.prop, _this.setMyOptions);
                } else {
                  return _this.scope.$watch(prop, _this.setMyOptions);
                }
              }
            };
          })(this));
        };

        return CommonOptionsBuilder;

      })(ModelKey);
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.options.builders').factory('uiGmapPolylineOptionsBuilder', [
    'uiGmapCommonOptionsBuilder', function(CommonOptionsBuilder) {
      var PolylineOptionsBuilder;
      return PolylineOptionsBuilder = (function(_super) {
        __extends(PolylineOptionsBuilder, _super);

        function PolylineOptionsBuilder() {
          return PolylineOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        PolylineOptionsBuilder.prototype.buildOpts = function(pathPoints, cachedEval) {
          return PolylineOptionsBuilder.__super__.buildOpts.call(this, {
            path: pathPoints
          }, cachedEval, {
            geodesic: false
          });
        };

        return PolylineOptionsBuilder;

      })(CommonOptionsBuilder);
    }
  ]).factory('uiGmapShapeOptionsBuilder', [
    'uiGmapCommonOptionsBuilder', function(CommonOptionsBuilder) {
      var ShapeOptionsBuilder;
      return ShapeOptionsBuilder = (function(_super) {
        __extends(ShapeOptionsBuilder, _super);

        function ShapeOptionsBuilder() {
          return ShapeOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        ShapeOptionsBuilder.prototype.buildOpts = function(customOpts, cachedEval, forEachOpts) {
          var fill, model;
          model = this.getCorrectModel(this.scope);
          fill = cachedEval ? cachedEval['fill'] : this.scopeOrModelVal('fill', this.scope, model);
          customOpts = angular.extend(customOpts, {
            fillColor: fill != null ? fill.color : void 0,
            fillOpacity: fill != null ? fill.opacity : void 0
          });
          return ShapeOptionsBuilder.__super__.buildOpts.call(this, customOpts, cachedEval, forEachOpts);
        };

        return ShapeOptionsBuilder;

      })(CommonOptionsBuilder);
    }
  ]).factory('uiGmapPolygonOptionsBuilder', [
    'uiGmapShapeOptionsBuilder', function(ShapeOptionsBuilder) {
      var PolygonOptionsBuilder;
      return PolygonOptionsBuilder = (function(_super) {
        __extends(PolygonOptionsBuilder, _super);

        function PolygonOptionsBuilder() {
          return PolygonOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        PolygonOptionsBuilder.prototype.buildOpts = function(pathPoints, cachedEval) {
          return PolygonOptionsBuilder.__super__.buildOpts.call(this, {
            path: pathPoints
          }, cachedEval, {
            geodesic: false
          });
        };

        return PolygonOptionsBuilder;

      })(ShapeOptionsBuilder);
    }
  ]).factory('uiGmapRectangleOptionsBuilder', [
    'uiGmapShapeOptionsBuilder', function(ShapeOptionsBuilder) {
      var RectangleOptionsBuilder;
      return RectangleOptionsBuilder = (function(_super) {
        __extends(RectangleOptionsBuilder, _super);

        function RectangleOptionsBuilder() {
          return RectangleOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        RectangleOptionsBuilder.prototype.buildOpts = function(bounds, cachedEval) {
          return RectangleOptionsBuilder.__super__.buildOpts.call(this, {
            bounds: bounds
          }, cachedEval);
        };

        return RectangleOptionsBuilder;

      })(ShapeOptionsBuilder);
    }
  ]).factory('uiGmapCircleOptionsBuilder', [
    'uiGmapShapeOptionsBuilder', function(ShapeOptionsBuilder) {
      var CircleOptionsBuilder;
      return CircleOptionsBuilder = (function(_super) {
        __extends(CircleOptionsBuilder, _super);

        function CircleOptionsBuilder() {
          return CircleOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        CircleOptionsBuilder.prototype.buildOpts = function(center, radius, cachedEval) {
          return CircleOptionsBuilder.__super__.buildOpts.call(this, {
            center: center,
            radius: radius
          }, cachedEval);
        };

        return CircleOptionsBuilder;

      })(ShapeOptionsBuilder);
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api.options').service('uiGmapMarkerOptions', [
    'uiGmapLogger', 'uiGmapGmapUtil', function($log, GmapUtil) {
      return _.extend(GmapUtil, {
        createOptions: function(coords, icon, defaults, map) {
          var opts;
          if (defaults == null) {
            defaults = {};
          }
          opts = angular.extend({}, defaults, {
            position: defaults.position != null ? defaults.position : GmapUtil.getCoords(coords),
            visible: defaults.visible != null ? defaults.visible : GmapUtil.validateCoords(coords)
          });
          if ((defaults.icon != null) || (icon != null)) {
            opts = angular.extend(opts, {
              icon: defaults.icon != null ? defaults.icon : icon
            });
          }
          if (map != null) {
            opts.map = map;
          }
          return opts;
        },
        isLabel: function(options) {
          if (options == null) {
            return false;
          }
          return (options.labelContent != null) || (options.labelAnchor != null) || (options.labelClass != null) || (options.labelStyle != null) || (options.labelVisible != null);
        }
      });
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapBasePolyChildModel', [
    'uiGmapLogger', '$timeout', 'uiGmaparray-sync', 'uiGmapGmapUtil', 'uiGmapEventsHelper', function($log, $timeout, arraySync, GmapUtil, EventsHelper) {
      return function(Builder, gFactory) {
        var BasePolyChildModel;
        return BasePolyChildModel = (function(_super) {
          __extends(BasePolyChildModel, _super);

          BasePolyChildModel.include(GmapUtil);

          function BasePolyChildModel(scope, attrs, map, defaults, model) {
            var create;
            this.scope = scope;
            this.attrs = attrs;
            this.map = map;
            this.defaults = defaults;
            this.model = model;
            this.clean = __bind(this.clean, this);
            this.clonedModel = _.clone(this.model, true);
            this.isDragging = false;
            this.internalEvents = {
              dragend: (function(_this) {
                return function() {
                  return _.defer(function() {
                    return _this.isDragging = false;
                  });
                };
              })(this),
              dragstart: (function(_this) {
                return function() {
                  return _this.isDragging = true;
                };
              })(this)
            };
            create = (function(_this) {
              return function() {
                var maybeCachedEval, pathPoints;
                if (_this.isDragging) {
                  return;
                }
                pathPoints = _this.convertPathPoints(_this.scope.path);
                if (_this.gObject != null) {
                  _this.clean();
                }
                if (scope.model != null) {
                  maybeCachedEval = scope;
                }
                if (pathPoints.length > 0) {
                  _this.gObject = gFactory(_this.buildOpts(pathPoints, maybeCachedEval));
                }
                if (_this.gObject) {
                  if (_this.scope.fit) {
                    _this.extendMapBounds(map, pathPoints);
                  }
                  arraySync(_this.gObject.getPath(), _this.scope, 'path', function(pathPoints) {
                    if (_this.scope.fit) {
                      return _this.extendMapBounds(map, pathPoints);
                    }
                  });
                  if (angular.isDefined(scope.events) && angular.isObject(scope.events)) {
                    _this.listeners = _this.model ? EventsHelper.setEvents(_this.gObject, _this.scope, _this.model) : EventsHelper.setEvents(_this.gObject, _this.scope, _this.scope);
                  }
                  return _this.internalListeners = _this.model ? EventsHelper.setEvents(_this.gObject, {
                    events: _this.internalEvents
                  }, _this.model) : EventsHelper.setEvents(_this.gObject, {
                    events: _this.internalEvents
                  }, _this.scope);
                }
              };
            })(this);
            create();
            scope.$watch('path', (function(_this) {
              return function(newValue, oldValue) {
                if (!_.isEqual(newValue, oldValue) || !_this.gObject) {
                  return create();
                }
              };
            })(this), true);
            if (!scope["static"] && angular.isDefined(scope.editable)) {
              scope.$watch('editable', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    newValue = !_this.isFalse(newValue);
                    return (_ref = _this.gObject) != null ? _ref.setEditable(newValue) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.draggable)) {
              scope.$watch('draggable', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    newValue = !_this.isFalse(newValue);
                    return (_ref = _this.gObject) != null ? _ref.setDraggable(newValue) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.visible)) {
              scope.$watch('visible', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    newValue = !_this.isFalse(newValue);
                  }
                  return (_ref = _this.gObject) != null ? _ref.setVisible(newValue) : void 0;
                };
              })(this), true);
            }
            if (angular.isDefined(scope.geodesic)) {
              scope.$watch('geodesic', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    newValue = !_this.isFalse(newValue);
                    return (_ref = _this.gObject) != null ? _ref.setOptions(_this.buildOpts(_this.gObject.getPath())) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.weight)) {
              scope.$watch('stroke.weight', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    return (_ref = _this.gObject) != null ? _ref.setOptions(_this.buildOpts(_this.gObject.getPath())) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.color)) {
              scope.$watch('stroke.color', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    return (_ref = _this.gObject) != null ? _ref.setOptions(_this.buildOpts(_this.gObject.getPath())) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.opacity)) {
              scope.$watch('stroke.opacity', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    return (_ref = _this.gObject) != null ? _ref.setOptions(_this.buildOpts(_this.gObject.getPath())) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.icons)) {
              scope.$watch('icons', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    return (_ref = _this.gObject) != null ? _ref.setOptions(_this.buildOpts(_this.gObject.getPath())) : void 0;
                  }
                };
              })(this), true);
            }
            scope.$on('$destroy', (function(_this) {
              return function() {
                _this.clean();
                return _this.scope = null;
              };
            })(this));
            if (angular.isDefined(scope.fill) && angular.isDefined(scope.fill.color)) {
              scope.$watch('fill.color', (function(_this) {
                return function(newValue, oldValue) {
                  if (newValue !== oldValue) {
                    return _this.gObject.setOptions(_this.buildOpts(_this.gObject.getPath()));
                  }
                };
              })(this));
            }
            if (angular.isDefined(scope.fill) && angular.isDefined(scope.fill.opacity)) {
              scope.$watch('fill.opacity', (function(_this) {
                return function(newValue, oldValue) {
                  if (newValue !== oldValue) {
                    return _this.gObject.setOptions(_this.buildOpts(_this.gObject.getPath()));
                  }
                };
              })(this));
            }
            if (angular.isDefined(scope.zIndex)) {
              scope.$watch('zIndex', (function(_this) {
                return function(newValue, oldValue) {
                  if (newValue !== oldValue) {
                    return _this.gObject.setOptions(_this.buildOpts(_this.gObject.getPath()));
                  }
                };
              })(this));
            }
          }

          BasePolyChildModel.prototype.clean = function() {
            var _ref;
            EventsHelper.removeEvents(this.listeners);
            EventsHelper.removeEvents(this.internalListeners);
            if ((_ref = this.gObject) != null) {
              _ref.setMap(null);
            }
            return this.gObject = null;
          };

          return BasePolyChildModel;

        })(Builder);
      };
    }
  ]);

}).call(this);
;
/*
@authors
Nicholas McCready - https://twitter.com/nmccready
Original idea from: http://stackoverflow.com/questions/22758950/google-map-drawing-freehand  , &
  http://jsfiddle.net/YsQdh/88/
 */

(function() {
  angular.module('uiGmapgoogle-maps.directives.api.models.child').factory('uiGmapDrawFreeHandChildModel', [
    'uiGmapLogger', '$q', function($log, $q) {
      var drawFreeHand, freeHandMgr;
      drawFreeHand = function(map, polys, enable) {
        var move, poly;
        poly = new google.maps.Polyline({
          map: map,
          clickable: false
        });
        move = google.maps.event.addListener(map, 'mousemove', function(e) {
          return poly.getPath().push(e.latLng);
        });
        google.maps.event.addListenerOnce(map, 'mouseup', function(e) {
          var path;
          google.maps.event.removeListener(move);
          path = poly.getPath();
          poly.setMap(null);
          polys.push(new google.maps.Polygon({
            map: map,
            path: path
          }));
          poly = null;
          google.maps.event.clearListeners(map.getDiv(), 'mousedown');
          return enable();
        });
        return void 0;
      };
      freeHandMgr = function(map, defaultOptions) {
        var disableMap, enable;
        this.map = map;
        if (!defaultOptions) {
          defaultOptions = {
            draggable: true,
            zoomControl: true,
            scrollwheel: true,
            disableDoubleClickZoom: true
          };
        }
        enable = (function(_this) {
          return function() {
            var _ref;
            if ((_ref = _this.deferred) != null) {
              _ref.resolve();
            }
            return _.defer(function() {
              return _this.map.setOptions(_.extend(_this.oldOptions, defaultOptions));
            });
          };
        })(this);
        disableMap = (function(_this) {
          return function() {
            $log.info('disabling map move');
            _this.oldOptions = map.getOptions();
            _this.oldOptions.center = map.getCenter();
            return _this.map.setOptions({
              draggable: false,
              zoomControl: false,
              scrollwheel: false,
              disableDoubleClickZoom: false
            });
          };
        })(this);
        this.engage = (function(_this) {
          return function(polys) {
            _this.polys = polys;
            _this.deferred = $q.defer();
            disableMap();
            $log.info('DrawFreeHandChildModel is engaged (drawing).');
            google.maps.event.addDomListener(_this.map.getDiv(), 'mousedown', function(e) {
              return drawFreeHand(_this.map, _this.polys, enable);
            });
            return _this.deferred.promise;
          };
        })(this);
        return this;
      };
      return freeHandMgr;
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.child').factory('uiGmapMarkerChildModel', [
    'uiGmapModelKey', 'uiGmapGmapUtil', 'uiGmapLogger', 'uiGmapEventsHelper', 'uiGmapPropertyAction', 'uiGmapMarkerOptions', 'uiGmapIMarker', 'uiGmapMarkerManager', 'uiGmapPromise', function(ModelKey, GmapUtil, $log, EventsHelper, PropertyAction, MarkerOptions, IMarker, MarkerManager, uiGmapPromise) {
      var MarkerChildModel;
      MarkerChildModel = (function(_super) {
        var destroy;

        __extends(MarkerChildModel, _super);

        MarkerChildModel.include(GmapUtil);

        MarkerChildModel.include(EventsHelper);

        MarkerChildModel.include(MarkerOptions);

        destroy = function(child) {
          if ((child != null ? child.gObject : void 0) != null) {
            child.removeEvents(child.externalListeners);
            child.removeEvents(child.internalListeners);
            if (child != null ? child.gObject : void 0) {
              if (child.removeFromManager) {
                child.gManager.remove(child.gObject);
              }
              child.gObject.setMap(null);
              return child.gObject = null;
            }
          }
        };

        function MarkerChildModel(scope, model, keys, gMap, defaults, doClick, gManager, doDrawSelf, trackModel, needRedraw) {
          var action;
          this.model = model;
          this.keys = keys;
          this.gMap = gMap;
          this.defaults = defaults;
          this.doClick = doClick;
          this.gManager = gManager;
          this.doDrawSelf = doDrawSelf != null ? doDrawSelf : true;
          this.trackModel = trackModel != null ? trackModel : true;
          this.needRedraw = needRedraw != null ? needRedraw : false;
          this.internalEvents = __bind(this.internalEvents, this);
          this.setLabelOptions = __bind(this.setLabelOptions, this);
          this.setOptions = __bind(this.setOptions, this);
          this.setIcon = __bind(this.setIcon, this);
          this.setCoords = __bind(this.setCoords, this);
          this.isNotValid = __bind(this.isNotValid, this);
          this.maybeSetScopeValue = __bind(this.maybeSetScopeValue, this);
          this.createMarker = __bind(this.createMarker, this);
          this.setMyScope = __bind(this.setMyScope, this);
          this.updateModel = __bind(this.updateModel, this);
          this.handleModelChanges = __bind(this.handleModelChanges, this);
          this.destroy = __bind(this.destroy, this);
          this.clonedModel = _.extend({}, this.model);
          this.deferred = uiGmapPromise.defer();
          _.each(this.keys, (function(_this) {
            return function(v, k) {
              return _this[k + 'Key'] = _.isFunction(_this.keys[k]) ? _this.keys[k]() : _this.keys[k];
            };
          })(this));
          this.idKey = this.idKeyKey || 'id';
          if (this.model[this.idKey] != null) {
            this.id = this.model[this.idKey];
          }
          MarkerChildModel.__super__.constructor.call(this, scope);
          this.scope.getGMarker = (function(_this) {
            return function() {
              return _this.gObject;
            };
          })(this);
          this.firstTime = true;
          if (this.trackModel) {
            this.scope.model = this.model;
            this.scope.$watch('model', (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return _this.handleModelChanges(newValue, oldValue);
                }
              };
            })(this), true);
          } else {
            action = new PropertyAction((function(_this) {
              return function(calledKey, newVal) {
                if (!_this.firstTime) {
                  return _this.setMyScope(calledKey, scope);
                }
              };
            })(this), false);
            _.each(this.keys, function(v, k) {
              return scope.$watch(k, action.sic, true);
            });
          }
          this.scope.$on('$destroy', (function(_this) {
            return function() {
              return destroy(_this);
            };
          })(this));
          this.createMarker(this.model);
          $log.info(this);
        }

        MarkerChildModel.prototype.destroy = function(removeFromManager) {
          if (removeFromManager == null) {
            removeFromManager = true;
          }
          this.removeFromManager = removeFromManager;
          return this.scope.$destroy();
        };

        MarkerChildModel.prototype.handleModelChanges = function(newValue, oldValue) {
          var changes, ctr, len;
          changes = this.getChanges(newValue, oldValue, IMarker.keys);
          if (!this.firstTime) {
            ctr = 0;
            len = _.keys(changes).length;
            return _.each(changes, (function(_this) {
              return function(v, k) {
                var doDraw;
                ctr += 1;
                doDraw = len === ctr;
                _this.setMyScope(k, newValue, oldValue, false, true, doDraw);
                return _this.needRedraw = true;
              };
            })(this));
          }
        };

        MarkerChildModel.prototype.updateModel = function(model) {
          this.clonedModel = _.extend({}, model);
          return this.setMyScope('all', model, this.model);
        };

        MarkerChildModel.prototype.renderGMarker = function(doDraw, validCb) {
          var coords;
          if (doDraw == null) {
            doDraw = true;
          }
          coords = this.getProp(this.coordsKey, this.model);
          if (coords != null) {
            if (!this.validateCoords(coords)) {
              $log.debug('MarkerChild does not have coords yet. They may be defined later.');
              return;
            }
            if (validCb != null) {
              validCb();
            }
            if (doDraw && this.gObject) {
              return this.gManager.add(this.gObject);
            }
          } else {
            if (doDraw && this.gObject) {
              return this.gManager.remove(this.gObject);
            }
          }
        };

        MarkerChildModel.prototype.setMyScope = function(thingThatChanged, model, oldModel, isInit, doDraw) {
          var justCreated;
          if (oldModel == null) {
            oldModel = void 0;
          }
          if (isInit == null) {
            isInit = false;
          }
          if (doDraw == null) {
            doDraw = true;
          }
          if (model == null) {
            model = this.model;
          } else {
            this.model = model;
          }
          if (!this.gObject) {
            this.setOptions(this.scope, doDraw);
            justCreated = true;
          }
          switch (thingThatChanged) {
            case 'all':
              return _.each(this.keys, (function(_this) {
                return function(v, k) {
                  return _this.setMyScope(k, model, oldModel, isInit, doDraw);
                };
              })(this));
            case 'icon':
              return this.maybeSetScopeValue('icon', model, oldModel, this.iconKey, this.evalModelHandle, isInit, this.setIcon, doDraw);
            case 'coords':
              return this.maybeSetScopeValue('coords', model, oldModel, this.coordsKey, this.evalModelHandle, isInit, this.setCoords, doDraw);
            case 'options':
              if (!justCreated) {
                return this.createMarker(model, oldModel, isInit, doDraw);
              }
          }
        };

        MarkerChildModel.prototype.createMarker = function(model, oldModel, isInit, doDraw) {
          if (oldModel == null) {
            oldModel = void 0;
          }
          if (isInit == null) {
            isInit = false;
          }
          if (doDraw == null) {
            doDraw = true;
          }
          this.maybeSetScopeValue('options', model, oldModel, this.optionsKey, this.evalModelHandle, isInit, this.setOptions, doDraw);
          return this.firstTime = false;
        };

        MarkerChildModel.prototype.maybeSetScopeValue = function(scopePropName, model, oldModel, modelKey, evaluate, isInit, gSetter, doDraw) {
          if (gSetter == null) {
            gSetter = void 0;
          }
          if (doDraw == null) {
            doDraw = true;
          }
          if (gSetter != null) {
            return gSetter(this.scope, doDraw);
          }
        };

        if (MarkerChildModel.doDrawSelf && doDraw) {
          MarkerChildModel.gManager.draw();
        }

        MarkerChildModel.prototype.isNotValid = function(scope, doCheckGmarker) {
          var hasIdenticalScopes, hasNoGmarker;
          if (doCheckGmarker == null) {
            doCheckGmarker = true;
          }
          hasNoGmarker = !doCheckGmarker ? false : this.gObject === void 0;
          hasIdenticalScopes = !this.trackModel ? scope.$id !== this.scope.$id : false;
          return hasIdenticalScopes || hasNoGmarker;
        };

        MarkerChildModel.prototype.setCoords = function(scope, doDraw) {
          if (doDraw == null) {
            doDraw = true;
          }
          if (this.isNotValid(scope) || (this.gObject == null)) {
            return;
          }
          return this.renderGMarker(doDraw, (function(_this) {
            return function() {
              var newGValue, newModelVal, oldGValue;
              newModelVal = _this.getProp(_this.coordsKey, _this.model);
              newGValue = _this.getCoords(newModelVal);
              oldGValue = _this.gObject.getPosition();
              if ((oldGValue != null) && (newGValue != null)) {
                if (newGValue.lng() === oldGValue.lng() && newGValue.lat() === oldGValue.lat()) {
                  return;
                }
              }
              _this.gObject.setPosition(newGValue);
              return _this.gObject.setVisible(_this.validateCoords(newModelVal));
            };
          })(this));
        };

        MarkerChildModel.prototype.setIcon = function(scope, doDraw) {
          if (doDraw == null) {
            doDraw = true;
          }
          if (this.isNotValid(scope) || (this.gObject == null)) {
            return;
          }
          return this.renderGMarker(doDraw, (function(_this) {
            return function() {
              var coords, newValue, oldValue;
              oldValue = _this.gObject.getIcon();
              newValue = _this.getProp(_this.iconKey, _this.model);
              if (oldValue === newValue) {
                return;
              }
              _this.gObject.setIcon(newValue);
              coords = _this.getProp(_this.coordsKey, _this.model);
              _this.gObject.setPosition(_this.getCoords(coords));
              return _this.gObject.setVisible(_this.validateCoords(coords));
            };
          })(this));
        };

        MarkerChildModel.prototype.setOptions = function(scope, doDraw) {
          var _ref;
          if (doDraw == null) {
            doDraw = true;
          }
          if (this.isNotValid(scope, false)) {
            return;
          }
          this.renderGMarker(doDraw, (function(_this) {
            return function() {
              var coords, icon, _options;
              coords = _this.getProp(_this.coordsKey, _this.model);
              icon = _this.getProp(_this.iconKey, _this.model);
              _options = _this.getProp(_this.optionsKey, _this.model);
              _this.opts = _this.createOptions(coords, icon, _options);
              if (_this.isLabel(_this.gObject) !== _this.isLabel(_this.opts) && (_this.gObject != null)) {
                _this.gManager.remove(_this.gObject);
                _this.gObject = void 0;
              }
              if (_this.gObject != null) {
                _this.gObject.setOptions(_this.setLabelOptions(_this.opts));
              }
              if (!_this.gObject) {
                if (_this.isLabel(_this.opts)) {
                  _this.gObject = new MarkerWithLabel(_this.setLabelOptions(_this.opts));
                } else {
                  _this.gObject = new google.maps.Marker(_this.opts);
                }
                _.extend(_this.gObject, {
                  model: _this.model
                });
              }
              if (_this.externalListeners) {
                _this.removeEvents(_this.externalListeners);
              }
              if (_this.internalListeners) {
                _this.removeEvents(_this.internalListeners);
              }
              _this.externalListeners = _this.setEvents(_this.gObject, _this.scope, _this.model, ['dragend']);
              _this.internalListeners = _this.setEvents(_this.gObject, {
                events: _this.internalEvents(),
                $evalAsync: function() {}
              }, _this.model);
              if (_this.id != null) {
                return _this.gObject.key = _this.id;
              }
            };
          })(this));
          if (this.gObject && (this.gObject.getMap() || this.gManager.type !== MarkerManager.type)) {
            this.deferred.resolve(this.gObject);
          } else {
            if (!this.gObject) {
              return this.deferred.reject('gObject is null');
            }
            if (!(((_ref = this.gObject) != null ? _ref.getMap() : void 0) && this.gManager.type === MarkerManager.type)) {
              $log.debug('gObject has no map yet');
              this.deferred.resolve(this.gObject);
            }
          }
          if (this.model[this.fitKey]) {
            return this.gManager.fit();
          }
        };

        MarkerChildModel.prototype.setLabelOptions = function(opts) {
          opts.labelAnchor = this.getLabelPositionPoint(opts.labelAnchor);
          return opts;
        };

        MarkerChildModel.prototype.internalEvents = function() {
          return {
            dragend: (function(_this) {
              return function(marker, eventName, model, mousearg) {
                var events, modelToSet, newCoords;
                modelToSet = _this.trackModel ? _this.scope.model : _this.model;
                newCoords = _this.setCoordsFromEvent(_this.modelOrKey(modelToSet, _this.coordsKey), _this.gObject.getPosition());
                modelToSet = _this.setVal(model, _this.coordsKey, newCoords);
                events = _this.scope.events;
                if ((events != null ? events.dragend : void 0) != null) {
                  events.dragend(marker, eventName, modelToSet, mousearg);
                }
                return _this.scope.$apply();
              };
            })(this),
            click: (function(_this) {
              return function(marker, eventName, model, mousearg) {
                var click;
                click = _.isFunction(_this.clickKey) ? _this.clickKey : _this.getProp(_this.clickKey, _this.model);
                if (_this.doClick && (click != null)) {
                  return _this.scope.$evalAsync(click(marker, eventName, _this.model, mousearg));
                }
              };
            })(this)
          };
        };

        return MarkerChildModel;

      })(ModelKey);
      return MarkerChildModel;
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapPolygonChildModel', [
    'uiGmapBasePolyChildModel', 'uiGmapPolygonOptionsBuilder', function(BaseGen, Builder) {
      var PolygonChildModel, base, gFactory;
      gFactory = function(opts) {
        return new google.maps.Polygon(opts);
      };
      base = new BaseGen(Builder, gFactory);
      return PolygonChildModel = (function(_super) {
        __extends(PolygonChildModel, _super);

        function PolygonChildModel() {
          return PolygonChildModel.__super__.constructor.apply(this, arguments);
        }

        return PolygonChildModel;

      })(base);
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapPolylineChildModel', [
    'uiGmapBasePolyChildModel', 'uiGmapPolylineOptionsBuilder', function(BaseGen, Builder) {
      var PolylineChildModel, base, gFactory;
      gFactory = function(opts) {
        return new google.maps.Polyline(opts);
      };
      base = BaseGen(Builder, gFactory);
      return PolylineChildModel = (function(_super) {
        __extends(PolylineChildModel, _super);

        function PolylineChildModel() {
          return PolylineChildModel.__super__.constructor.apply(this, arguments);
        }

        return PolylineChildModel;

      })(base);
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.child').factory('uiGmapWindowChildModel', [
    'uiGmapBaseObject', 'uiGmapGmapUtil', 'uiGmapLogger', '$compile', '$http', '$templateCache', 'uiGmapChromeFixes', 'uiGmapEventsHelper', function(BaseObject, GmapUtil, $log, $compile, $http, $templateCache, ChromeFixes, EventsHelper) {
      var WindowChildModel;
      WindowChildModel = (function(_super) {
        __extends(WindowChildModel, _super);

        WindowChildModel.include(GmapUtil);

        WindowChildModel.include(EventsHelper);

        function WindowChildModel(model, scope, opts, isIconVisibleOnClick, mapCtrl, markerScope, element, needToManualDestroy, markerIsVisibleAfterWindowClose) {
          var maybeMarker;
          this.model = model;
          this.scope = scope;
          this.opts = opts;
          this.isIconVisibleOnClick = isIconVisibleOnClick;
          this.mapCtrl = mapCtrl;
          this.markerScope = markerScope;
          this.element = element;
          this.needToManualDestroy = needToManualDestroy != null ? needToManualDestroy : false;
          this.markerIsVisibleAfterWindowClose = markerIsVisibleAfterWindowClose != null ? markerIsVisibleAfterWindowClose : true;
          this.updateModel = __bind(this.updateModel, this);
          this.destroy = __bind(this.destroy, this);
          this.remove = __bind(this.remove, this);
          this.getLatestPosition = __bind(this.getLatestPosition, this);
          this.hideWindow = __bind(this.hideWindow, this);
          this.showWindow = __bind(this.showWindow, this);
          this.handleClick = __bind(this.handleClick, this);
          this.watchOptions = __bind(this.watchOptions, this);
          this.watchCoords = __bind(this.watchCoords, this);
          this.createGWin = __bind(this.createGWin, this);
          this.watchElement = __bind(this.watchElement, this);
          this.watchAndDoShow = __bind(this.watchAndDoShow, this);
          this.doShow = __bind(this.doShow, this);
          this.clonedModel = _.clone(this.model, true);
          this.getGmarker = function() {
            var _ref, _ref1;
            if (((_ref = this.markerScope) != null ? _ref['getGMarker'] : void 0) != null) {
              return (_ref1 = this.markerScope) != null ? _ref1.getGMarker() : void 0;
            }
          };
          this.listeners = [];
          this.createGWin();
          maybeMarker = this.getGmarker();
          if (maybeMarker != null) {
            maybeMarker.setClickable(true);
          }
          this.watchElement();
          this.watchOptions();
          this.watchCoords();
          this.watchAndDoShow();
          this.scope.$on('$destroy', (function(_this) {
            return function() {
              return _this.destroy();
            };
          })(this));
          $log.info(this);
        }

        WindowChildModel.prototype.doShow = function(wasOpen) {
          if (this.scope.show === true || wasOpen) {
            return this.showWindow();
          } else {
            return this.hideWindow();
          }
        };

        WindowChildModel.prototype.watchAndDoShow = function() {
          if (this.model.show != null) {
            this.scope.show = this.model.show;
          }
          this.scope.$watch('show', this.doShow, true);
          return this.doShow();
        };

        WindowChildModel.prototype.watchElement = function() {
          return this.scope.$watch((function(_this) {
            return function() {
              var wasOpen, _ref;
              if (!(_this.element || _this.html)) {
                return;
              }
              if (_this.html !== _this.element.html() && _this.gObject) {
                if ((_ref = _this.opts) != null) {
                  _ref.content = void 0;
                }
                wasOpen = _this.gObject.isOpen();
                _this.remove();
                return _this.createGWin(wasOpen);
              }
            };
          })(this));
        };

        WindowChildModel.prototype.createGWin = function(isOpen) {
          var defaults, maybeMarker, _opts, _ref, _ref1;
          if (isOpen == null) {
            isOpen = false;
          }
          maybeMarker = this.getGmarker();
          defaults = {};
          if (this.opts != null) {
            if (this.scope.coords) {
              this.opts.position = this.getCoords(this.scope.coords);
            }
            defaults = this.opts;
          }
          if (this.element) {
            this.html = _.isObject(this.element) ? this.element.html() : this.element;
          }
          _opts = this.scope.options ? this.scope.options : defaults;
          this.opts = this.createWindowOptions(maybeMarker, this.markerScope || this.scope, this.html, _opts);
          if (this.opts != null) {
            if (!this.gObject) {
              if (this.opts.boxClass && (window.InfoBox && typeof window.InfoBox === 'function')) {
                this.gObject = new window.InfoBox(this.opts);
              } else {
                this.gObject = new google.maps.InfoWindow(this.opts);
              }
              this.listeners.push(google.maps.event.addListener(this.gObject, 'domready', function() {
                return ChromeFixes.maybeRepaint(this.content);
              }));
              this.listeners.push(google.maps.event.addListener(this.gObject, 'closeclick', (function(_this) {
                return function() {
                  if (maybeMarker) {
                    maybeMarker.setAnimation(_this.oldMarkerAnimation);
                    if (_this.markerIsVisibleAfterWindowClose) {
                      _.delay(function() {
                        maybeMarker.setVisible(false);
                        return maybeMarker.setVisible(_this.markerIsVisibleAfterWindowClose);
                      }, 250);
                    }
                  }
                  _this.gObject.close();
                  _this.model.show = false;
                  if (_this.scope.closeClick != null) {
                    return _this.scope.$evalAsync(_this.scope.closeClick());
                  } else {
                    return _this.scope.$evalAsync();
                  }
                };
              })(this)));
            }
            this.gObject.setContent(this.opts.content);
            this.handleClick(((_ref = this.scope) != null ? (_ref1 = _ref.options) != null ? _ref1.forceClick : void 0 : void 0) || isOpen);
            return this.doShow(this.gObject.isOpen());
          }
        };

        WindowChildModel.prototype.watchCoords = function() {
          var scope;
          scope = this.markerScope != null ? this.markerScope : this.scope;
          return scope.$watch('coords', (function(_this) {
            return function(newValue, oldValue) {
              var pos;
              if (newValue !== oldValue) {
                if (newValue == null) {
                  _this.hideWindow();
                } else if (!_this.validateCoords(newValue)) {
                  $log.error("WindowChildMarker cannot render marker as scope.coords as no position on marker: " + (JSON.stringify(_this.model)));
                  return;
                }
                pos = _this.getCoords(newValue);
                _this.gObject.setPosition(pos);
                if (_this.opts) {
                  return _this.opts.position = pos;
                }
              }
            };
          })(this), true);
        };

        WindowChildModel.prototype.watchOptions = function() {
          return this.scope.$watch('options', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                _this.opts = newValue;
                if (_this.gObject != null) {
                  _this.gObject.setOptions(_this.opts);
                  if ((_this.opts.visible != null) && _this.opts.visible) {
                    return _this.showWindow();
                  } else if (_this.opts.visible != null) {
                    return _this.hideWindow();
                  }
                }
              }
            };
          })(this), true);
        };

        WindowChildModel.prototype.handleClick = function(forceClick) {
          var click, maybeMarker;
          if (this.gObject == null) {
            return;
          }
          maybeMarker = this.getGmarker();
          click = (function(_this) {
            return function() {
              if (_this.gObject == null) {
                _this.createGWin();
              }
              _this.showWindow();
              if (maybeMarker != null) {
                _this.initialMarkerVisibility = maybeMarker.getVisible();
                _this.oldMarkerAnimation = maybeMarker.getAnimation();
                return maybeMarker.setVisible(_this.isIconVisibleOnClick);
              }
            };
          })(this);
          if (forceClick) {
            click();
          }
          if (maybeMarker) {
            return this.listeners = this.listeners.concat(this.setEvents(maybeMarker, {
              events: {
                click: click
              }
            }, this.model));
          }
        };

        WindowChildModel.prototype.showWindow = function() {
          var compiled, show, templateScope;
          if (this.gObject != null) {
            show = (function(_this) {
              return function() {
                var isOpen, maybeMarker, pos;
                if (!_this.gObject.isOpen()) {
                  maybeMarker = _this.getGmarker();
                  if ((_this.gObject != null) && (_this.gObject.getPosition != null)) {
                    pos = _this.gObject.getPosition();
                  }
                  if (maybeMarker) {
                    pos = maybeMarker.getPosition();
                  }
                  if (!pos) {
                    return;
                  }
                  _this.gObject.open(_this.mapCtrl, maybeMarker);
                  isOpen = _this.gObject.isOpen();
                  if (_this.model.show !== isOpen) {
                    return _this.model.show = isOpen;
                  }
                }
              };
            })(this);
            if (this.scope.templateUrl) {
              return $http.get(this.scope.templateUrl, {
                cache: $templateCache
              }).then((function(_this) {
                return function(content) {
                  var compiled, templateScope;
                  templateScope = _this.scope.$new();
                  if (angular.isDefined(_this.scope.templateParameter)) {
                    templateScope.parameter = _this.scope.templateParameter;
                  }
                  compiled = $compile(content.data)(templateScope);
                  _this.gObject.setContent(compiled[0]);
                  return show();
                };
              })(this));
            } else if (this.scope.template) {
              templateScope = this.scope.$new();
              if (angular.isDefined(this.scope.templateParameter)) {
                templateScope.parameter = this.scope.templateParameter;
              }
              compiled = $compile(this.scope.template)(templateScope);
              this.gObject.setContent(compiled[0]);
              return show();
            } else {
              return show();
            }
          }
        };

        WindowChildModel.prototype.hideWindow = function() {
          if ((this.gObject != null) && this.gObject.isOpen()) {
            return this.gObject.close();
          }
        };

        WindowChildModel.prototype.getLatestPosition = function(overridePos) {
          var maybeMarker;
          maybeMarker = this.getGmarker();
          if ((this.gObject != null) && (maybeMarker != null) && !overridePos) {
            return this.gObject.setPosition(maybeMarker.getPosition());
          } else {
            if (overridePos) {
              return this.gObject.setPosition(overridePos);
            }
          }
        };

        WindowChildModel.prototype.remove = function() {
          this.hideWindow();
          this.removeEvents(this.listeners);
          this.listeners.length = 0;
          delete this.gObject;
          return delete this.opts;
        };

        WindowChildModel.prototype.destroy = function(manualOverride) {
          var _ref;
          if (manualOverride == null) {
            manualOverride = false;
          }
          this.remove();
          if ((this.scope != null) && !((_ref = this.scope) != null ? _ref.$$destroyed : void 0) && (this.needToManualDestroy || manualOverride)) {
            return this.scope.$destroy();
          }
        };

        WindowChildModel.prototype.updateModel = function(model) {
          this.clonedModel = _.extend({}, model);
          return _.extend(this.model, this.clonedModel);
        };

        return WindowChildModel;

      })(BaseObject);
      return WindowChildModel;
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.parent').factory('uiGmapCircleParentModel', [
    'uiGmapLogger', '$timeout', 'uiGmapGmapUtil', 'uiGmapEventsHelper', 'uiGmapCircleOptionsBuilder', function($log, $timeout, GmapUtil, EventsHelper, Builder) {
      var CircleParentModel;
      return CircleParentModel = (function(_super) {
        __extends(CircleParentModel, _super);

        CircleParentModel.include(GmapUtil);

        CircleParentModel.include(EventsHelper);

        function CircleParentModel(scope, element, attrs, map, DEFAULTS) {
          var clean, gObject, lastRadius;
          this.scope = scope;
          this.attrs = attrs;
          this.map = map;
          this.DEFAULTS = DEFAULTS;
          lastRadius = null;
          clean = (function(_this) {
            return function() {
              lastRadius = null;
              if (_this.listeners != null) {
                _this.removeEvents(_this.listeners);
                return _this.listeners = void 0;
              }
            };
          })(this);
          gObject = new google.maps.Circle(this.buildOpts(GmapUtil.getCoords(scope.center), scope.radius));
          this.setMyOptions = (function(_this) {
            return function(newVals, oldVals) {
              if (!_.isEqual(newVals, oldVals)) {
                return gObject.setOptions(_this.buildOpts(GmapUtil.getCoords(scope.center), scope.radius));
              }
            };
          })(this);
          this.props = this.props.concat([
            {
              prop: 'center',
              isColl: true
            }, {
              prop: 'fill',
              isColl: true
            }, 'radius'
          ]);
          this.watchProps();
          clean();
          this.listeners = this.setEvents(gObject, scope, scope, ['radius_changed']);
          if (this.listeners != null) {
            this.listeners.push(google.maps.event.addListener(gObject, 'radius_changed', function() {

              /*
                possible google bug, and or because a circle has two radii
                radius_changed appears to fire twice (original and new) which is not too helpful
                therefore we will check for radius changes manually and bail out if nothing has changed
               */
              var newRadius, work;
              newRadius = gObject.getRadius();
              if (newRadius === lastRadius) {
                return;
              }
              lastRadius = newRadius;
              work = function() {
                var _ref, _ref1;
                if (newRadius !== scope.radius) {
                  scope.radius = newRadius;
                }
                if (((_ref = scope.events) != null ? _ref.radius_changed : void 0) && _.isFunction((_ref1 = scope.events) != null ? _ref1.radius_changed : void 0)) {
                  return scope.events.radius_changed(gObject, 'radius_changed', scope, arguments);
                }
              };
              if (!angular.mock) {
                return scope.$evalAsync(function() {
                  return work();
                });
              } else {
                return work();
              }
            }));
          }
          if (this.listeners != null) {
            this.listeners.push(google.maps.event.addListener(gObject, 'center_changed', function() {
              return scope.$evalAsync(function() {
                if (angular.isDefined(scope.center.type)) {
                  scope.center.coordinates[1] = gObject.getCenter().lat();
                  return scope.center.coordinates[0] = gObject.getCenter().lng();
                } else {
                  scope.center.latitude = gObject.getCenter().lat();
                  return scope.center.longitude = gObject.getCenter().lng();
                }
              });
            }));
          }
          scope.$on('$destroy', (function(_this) {
            return function() {
              clean();
              return gObject.setMap(null);
            };
          })(this));
          $log.info(this);
        }

        return CircleParentModel;

      })(Builder);
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.parent').factory('uiGmapDrawingManagerParentModel', [
    'uiGmapLogger', '$timeout', 'uiGmapBaseObject', 'uiGmapEventsHelper', function($log, $timeout, BaseObject, EventsHelper) {
      var DrawingManagerParentModel;
      return DrawingManagerParentModel = (function(_super) {
        __extends(DrawingManagerParentModel, _super);

        DrawingManagerParentModel.include(EventsHelper);

        function DrawingManagerParentModel(scope, element, attrs, map) {
          var gObject, listeners;
          this.scope = scope;
          this.attrs = attrs;
          this.map = map;
          gObject = new google.maps.drawing.DrawingManager(this.scope.options);
          gObject.setMap(this.map);
          listeners = void 0;
          if (this.scope.control != null) {
            this.scope.control.getDrawingManager = function() {
              return gObject;
            };
          }
          if (!this.scope["static"] && this.scope.options) {
            this.scope.$watch('options', function(newValue) {
              return gObject != null ? gObject.setOptions(newValue) : void 0;
            }, true);
          }
          if (this.scope.events != null) {
            listeners = this.setEvents(gObject, this.scope, this.scope);
            scope.$watch('events', (function(_this) {
              return function(newValue, oldValue) {
                if (!_.isEqual(newValue, oldValue)) {
                  if (listeners != null) {
                    _this.removeEvents(listeners);
                  }
                  return listeners = _this.setEvents(gObject, _this.scope, _this.scope);
                }
              };
            })(this));
          }
          scope.$on('$destroy', (function(_this) {
            return function() {
              if (listeners != null) {
                _this.removeEvents(listeners);
              }
              gObject.setMap(null);
              return gObject = null;
            };
          })(this));
        }

        return DrawingManagerParentModel;

      })(BaseObject);
    }
  ]);

}).call(this);
;
/*
	- interface for all markers to derrive from
 	- to enforce a minimum set of requirements
 		- attributes
 			- coords
 			- icon
		- implementation needed on watches
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapIMarkerParentModel", [
    "uiGmapModelKey", "uiGmapLogger", function(ModelKey, Logger) {
      var IMarkerParentModel;
      IMarkerParentModel = (function(_super) {
        __extends(IMarkerParentModel, _super);

        IMarkerParentModel.prototype.DEFAULTS = {};

        function IMarkerParentModel(scope, element, attrs, map) {
          this.scope = scope;
          this.element = element;
          this.attrs = attrs;
          this.map = map;
          this.onWatch = __bind(this.onWatch, this);
          this.watch = __bind(this.watch, this);
          this.validateScope = __bind(this.validateScope, this);
          IMarkerParentModel.__super__.constructor.call(this, this.scope);
          this.$log = Logger;
          if (!this.validateScope(scope)) {
            throw new String("Unable to construct IMarkerParentModel due to invalid scope");
          }
          this.doClick = angular.isDefined(attrs.click);
          if (scope.options != null) {
            this.DEFAULTS = scope.options;
          }
          this.watch('coords', this.scope);
          this.watch('icon', this.scope);
          this.watch('options', this.scope);
          scope.$on("$destroy", (function(_this) {
            return function() {
              return _this.onDestroy(scope);
            };
          })(this));
        }

        IMarkerParentModel.prototype.validateScope = function(scope) {
          var ret;
          if (scope == null) {
            this.$log.error(this.constructor.name + ": invalid scope used");
            return false;
          }
          ret = scope.coords != null;
          if (!ret) {
            this.$log.error(this.constructor.name + ": no valid coords attribute found");
            return false;
          }
          return ret;
        };

        IMarkerParentModel.prototype.watch = function(propNameToWatch, scope, equalityCheck) {
          if (equalityCheck == null) {
            equalityCheck = true;
          }
          return scope.$watch(propNameToWatch, (function(_this) {
            return function(newValue, oldValue) {
              if (!_.isEqual(newValue, oldValue)) {
                return _this.onWatch(propNameToWatch, scope, newValue, oldValue);
              }
            };
          })(this), equalityCheck);
        };

        IMarkerParentModel.prototype.onWatch = function(propNameToWatch, scope, newValue, oldValue) {};

        return IMarkerParentModel;

      })(ModelKey);
      return IMarkerParentModel;
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapIWindowParentModel", [
    "uiGmapModelKey", "uiGmapGmapUtil", "uiGmapLogger", function(ModelKey, GmapUtil, Logger) {
      var IWindowParentModel;
      return IWindowParentModel = (function(_super) {
        __extends(IWindowParentModel, _super);

        IWindowParentModel.include(GmapUtil);

        function IWindowParentModel(scope, element, attrs, ctrls, $timeout, $compile, $http, $templateCache) {
          IWindowParentModel.__super__.constructor.call(this, scope);
          this.$log = Logger;
          this.$timeout = $timeout;
          this.$compile = $compile;
          this.$http = $http;
          this.$templateCache = $templateCache;
          this.DEFAULTS = {};
          if (scope.options != null) {
            this.DEFAULTS = scope.options;
          }
        }

        IWindowParentModel.prototype.getItem = function(scope, modelsPropToIterate, index) {
          if (modelsPropToIterate === 'models') {
            return scope[modelsPropToIterate][index];
          }
          return scope[modelsPropToIterate].get(index);
        };

        return IWindowParentModel;

      })(ModelKey);
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.parent').factory('uiGmapLayerParentModel', [
    'uiGmapBaseObject', 'uiGmapLogger', '$timeout', function(BaseObject, Logger, $timeout) {
      var LayerParentModel;
      LayerParentModel = (function(_super) {
        __extends(LayerParentModel, _super);

        function LayerParentModel(scope, element, attrs, gMap, onLayerCreated, $log) {
          this.scope = scope;
          this.element = element;
          this.attrs = attrs;
          this.gMap = gMap;
          this.onLayerCreated = onLayerCreated != null ? onLayerCreated : void 0;
          this.$log = $log != null ? $log : Logger;
          this.createGoogleLayer = __bind(this.createGoogleLayer, this);
          if (this.attrs.type == null) {
            this.$log.info('type attribute for the layer directive is mandatory. Layer creation aborted!!');
            return;
          }
          this.createGoogleLayer();
          this.doShow = true;
          if (angular.isDefined(this.attrs.show)) {
            this.doShow = this.scope.show;
          }
          if (this.doShow && (this.gMap != null)) {
            this.gObject.setMap(this.gMap);
          }
          this.scope.$watch('show', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                _this.doShow = newValue;
                if (newValue) {
                  return _this.gObject.setMap(_this.gMap);
                } else {
                  return _this.gObject.setMap(null);
                }
              }
            };
          })(this), true);
          this.scope.$watch('options', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                _this.gObject.setMap(null);
                _this.gObject = null;
                return _this.createGoogleLayer();
              }
            };
          })(this), true);
          this.scope.$on('$destroy', (function(_this) {
            return function() {
              return _this.gObject.setMap(null);
            };
          })(this));
        }

        LayerParentModel.prototype.createGoogleLayer = function() {
          var _base;
          if (this.attrs.options == null) {
            this.gObject = this.attrs.namespace === void 0 ? new google.maps[this.attrs.type]() : new google.maps[this.attrs.namespace][this.attrs.type]();
          } else {
            this.gObject = this.attrs.namespace === void 0 ? new google.maps[this.attrs.type](this.scope.options) : new google.maps[this.attrs.namespace][this.attrs.type](this.scope.options);
          }
          if ((this.gObject != null) && (this.onLayerCreated != null)) {
            return typeof (_base = this.onLayerCreated(this.scope, this.gObject)) === "function" ? _base(this.gObject) : void 0;
          }
        };

        return LayerParentModel;

      })(BaseObject);
      return LayerParentModel;
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.parent').factory('uiGmapMapTypeParentModel', [
    'uiGmapBaseObject', 'uiGmapLogger', function(BaseObject, Logger) {
      var MapTypeParentModel;
      MapTypeParentModel = (function(_super) {
        __extends(MapTypeParentModel, _super);

        function MapTypeParentModel(scope, element, attrs, gMap, $log) {
          this.scope = scope;
          this.element = element;
          this.attrs = attrs;
          this.gMap = gMap;
          this.$log = $log != null ? $log : Logger;
          this.hideOverlay = __bind(this.hideOverlay, this);
          this.showOverlay = __bind(this.showOverlay, this);
          this.refreshMapType = __bind(this.refreshMapType, this);
          this.createMapType = __bind(this.createMapType, this);
          if (this.attrs.options == null) {
            this.$log.info('options attribute for the map-type directive is mandatory. Map type creation aborted!!');
            return;
          }
          this.id = this.gMap.overlayMapTypesCount = this.gMap.overlayMapTypesCount + 1 || 0;
          this.doShow = true;
          this.createMapType();
          if (angular.isDefined(this.attrs.show)) {
            this.doShow = this.scope.show;
          }
          if (this.doShow && (this.gMap != null)) {
            this.showOverlay();
          }
          this.scope.$watch('show', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                _this.doShow = newValue;
                if (newValue) {
                  return _this.showOverlay();
                } else {
                  return _this.hideOverlay();
                }
              }
            };
          })(this), true);
          this.scope.$watch('options', (function(_this) {
            return function(newValue, oldValue) {
              if (!_.isEqual(newValue, oldValue)) {
                return _this.refreshMapType();
              }
            };
          })(this), true);
          if (angular.isDefined(this.attrs.refresh)) {
            this.scope.$watch('refresh', (function(_this) {
              return function(newValue, oldValue) {
                if (!_.isEqual(newValue, oldValue)) {
                  return _this.refreshMapType();
                }
              };
            })(this), true);
          }
          this.scope.$on('$destroy', (function(_this) {
            return function() {
              _this.hideOverlay();
              return _this.mapType = null;
            };
          })(this));
        }

        MapTypeParentModel.prototype.createMapType = function() {
          if (this.scope.options.getTile != null) {
            this.mapType = this.scope.options;
          } else if (this.scope.options.getTileUrl != null) {
            this.mapType = new google.maps.ImageMapType(this.scope.options);
          } else {
            this.$log.info('options should provide either getTile or getTileUrl methods. Map type creation aborted!!');
            return;
          }
          if (this.attrs.id && this.scope.id) {
            this.gMap.mapTypes.set(this.scope.id, this.mapType);
            if (!angular.isDefined(this.attrs.show)) {
              this.doShow = false;
            }
          }
          return this.mapType.layerId = this.id;
        };

        MapTypeParentModel.prototype.refreshMapType = function() {
          this.hideOverlay();
          this.mapType = null;
          this.createMapType();
          if (this.doShow && (this.gMap != null)) {
            return this.showOverlay();
          }
        };

        MapTypeParentModel.prototype.showOverlay = function() {
          return this.gMap.overlayMapTypes.push(this.mapType);
        };

        MapTypeParentModel.prototype.hideOverlay = function() {
          var found;
          found = false;
          return this.gMap.overlayMapTypes.forEach((function(_this) {
            return function(mapType, index) {
              if (!found && mapType.layerId === _this.id) {
                found = true;
                _this.gMap.overlayMapTypes.removeAt(index);
              }
            };
          })(this));
        };

        return MapTypeParentModel;

      })(BaseObject);
      return MapTypeParentModel;
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapMarkersParentModel", [
    "uiGmapIMarkerParentModel", "uiGmapModelsWatcher", "uiGmapPropMap", "uiGmapMarkerChildModel", "uiGmap_async", "uiGmapClustererMarkerManager", "uiGmapMarkerManager", "$timeout", "uiGmapIMarker", "uiGmapPromise", "uiGmapGmapUtil", "uiGmapLogger", function(IMarkerParentModel, ModelsWatcher, PropMap, MarkerChildModel, _async, ClustererMarkerManager, MarkerManager, $timeout, IMarker, uiGmapPromise, GmapUtil, $log) {
      var MarkersParentModel, _setPlurals;
      _setPlurals = function(val, objToSet) {
        objToSet.plurals = new PropMap();
        objToSet.scope.plurals = objToSet.plurals;
        return objToSet;
      };
      MarkersParentModel = (function(_super) {
        __extends(MarkersParentModel, _super);

        MarkersParentModel.include(GmapUtil);

        MarkersParentModel.include(ModelsWatcher);

        function MarkersParentModel(scope, element, attrs, map) {
          this.onDestroy = __bind(this.onDestroy, this);
          this.newChildMarker = __bind(this.newChildMarker, this);
          this.pieceMeal = __bind(this.pieceMeal, this);
          this.rebuildAll = __bind(this.rebuildAll, this);
          this.createAllNew = __bind(this.createAllNew, this);
          this.createChildScopes = __bind(this.createChildScopes, this);
          this.validateScope = __bind(this.validateScope, this);
          this.onWatch = __bind(this.onWatch, this);
          var self;
          MarkersParentModel.__super__.constructor.call(this, scope, element, attrs, map);
          this["interface"] = IMarker;
          self = this;
          _setPlurals(new PropMap(), this);
          this.scope.pluralsUpdate = {
            updateCtr: 0
          };
          this.$log.info(this);
          this.doRebuildAll = this.scope.doRebuildAll != null ? this.scope.doRebuildAll : false;
          this.setIdKey(scope);
          this.scope.$watch('doRebuildAll', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return _this.doRebuildAll = newValue;
              }
            };
          })(this));
          if (!this.modelsLength()) {
            this.modelsRendered = false;
          }
          this.scope.$watch('models', (function(_this) {
            return function(newValue, oldValue) {
              if (!_.isEqual(newValue, oldValue) || !_this.modelsRendered) {
                if (newValue.length === 0 && oldValue.length === 0) {
                  return;
                }
                _this.modelsRendered = true;
                return _this.onWatch('models', scope, newValue, oldValue);
              }
            };
          })(this), !this.isTrue(attrs.modelsbyref));
          this.watch('doCluster', scope);
          this.watch('clusterOptions', scope);
          this.watch('clusterEvents', scope);
          this.watch('fit', scope);
          this.watch('idKey', scope);
          this.gManager = void 0;
          this.createAllNew(scope);
        }

        MarkersParentModel.prototype.onWatch = function(propNameToWatch, scope, newValue, oldValue) {
          if (propNameToWatch === "idKey" && newValue !== oldValue) {
            this.idKey = newValue;
          }
          if (this.doRebuildAll || propNameToWatch === 'doCluster') {
            return this.rebuildAll(scope);
          } else {
            return this.pieceMeal(scope);
          }
        };

        MarkersParentModel.prototype.validateScope = function(scope) {
          var modelsNotDefined;
          modelsNotDefined = angular.isUndefined(scope.models) || scope.models === void 0;
          if (modelsNotDefined) {
            this.$log.error(this.constructor.name + ": no valid models attribute found");
          }
          return MarkersParentModel.__super__.validateScope.call(this, scope) || modelsNotDefined;
        };


        /*
        Not used internally by this parent
        created for consistency for external control in the API
         */

        MarkersParentModel.prototype.createChildScopes = function(isCreatingFromScratch) {
          if ((this.gMap == null) || (this.scope.models == null)) {
            return;
          }
          if (isCreatingFromScratch) {
            return this.createAllNew(this.scope, false);
          } else {
            return this.pieceMeal(this.scope, false);
          }
        };

        MarkersParentModel.prototype.createAllNew = function(scope) {
          var maybeCanceled, self, _ref, _ref1, _ref2;
          if (this.gManager != null) {
            this.gManager.clear();
            delete this.gManager;
          }
          if (scope.doCluster) {
            if (scope.clusterEvents) {
              self = this;
              if (!this.origClusterEvents) {
                this.origClusterEvents = {
                  click: (_ref = scope.clusterEvents) != null ? _ref.click : void 0,
                  mouseout: (_ref1 = scope.clusterEvents) != null ? _ref1.mouseout : void 0,
                  mouseover: (_ref2 = scope.clusterEvents) != null ? _ref2.mouseover : void 0
                };
              } else {
                angular.extend(scope.clusterEvents, this.origClusterEvents);
              }
              angular.extend(scope.clusterEvents, {
                click: function(cluster) {
                  return self.maybeExecMappedEvent(cluster, 'click');
                },
                mouseout: function(cluster) {
                  return self.maybeExecMappedEvent(cluster, 'mouseout');
                },
                mouseover: function(cluster) {
                  return self.maybeExecMappedEvent(cluster, 'mouseover');
                }
              });
            }
            this.gManager = new ClustererMarkerManager(this.map, void 0, scope.clusterOptions, scope.clusterEvents);
          } else {
            this.gManager = new MarkerManager(this.map);
          }
          if (this.didQueueInitPromise(this, scope)) {
            return;
          }
          maybeCanceled = null;
          return _async.promiseLock(this, uiGmapPromise.promiseTypes.create, 'createAllNew', (function(canceledMsg) {
            return maybeCanceled = canceledMsg;
          }), (function(_this) {
            return function() {
              return _async.each(scope.models, function(model) {
                _this.newChildMarker(model, scope);
                return maybeCanceled;
              }, _async.chunkSizeFrom(scope.chunk)).then(function() {
                _this.modelsRendered = true;
                if (scope.fit) {
                  _this.gManager.fit();
                }
                _this.gManager.draw();
                return _this.scope.pluralsUpdate.updateCtr += 1;
              }, _async.chunkSizeFrom(scope.chunk));
            };
          })(this));
        };

        MarkersParentModel.prototype.rebuildAll = function(scope) {
          var _ref;
          if (!scope.doRebuild && scope.doRebuild !== void 0) {
            return;
          }
          if ((_ref = this.scope.plurals) != null ? _ref.length : void 0) {
            return this.onDestroy(scope).then((function(_this) {
              return function() {
                return _this.createAllNew(scope);
              };
            })(this));
          } else {
            return this.createAllNew(scope);
          }
        };

        MarkersParentModel.prototype.pieceMeal = function(scope) {
          var maybeCanceled, payload;
          if (scope.$$destroyed) {
            return;
          }
          maybeCanceled = null;
          payload = null;
          if (this.modelsLength() && this.scope.plurals.length) {
            return _async.promiseLock(this, uiGmapPromise.promiseTypes.update, 'pieceMeal', (function(canceledMsg) {
              return maybeCanceled = canceledMsg;
            }), (function(_this) {
              return function() {
                return uiGmapPromise.promise((function() {
                  return _this.figureOutState(_this.idKey, scope, _this.scope.plurals, _this.modelKeyComparison);
                })).then(function(state) {
                  payload = state;
                  return _async.each(payload.removals, function(child) {
                    if (child != null) {
                      if (child.destroy != null) {
                        child.destroy();
                      }
                      _this.scope.plurals.remove(child.id);
                      return maybeCanceled;
                    }
                  }, _async.chunkSizeFrom(scope.chunk));
                }).then(function() {
                  return _async.each(payload.adds, function(modelToAdd) {
                    _this.newChildMarker(modelToAdd, scope);
                    return maybeCanceled;
                  }, _async.chunkSizeFrom(scope.chunk));
                }).then(function() {
                  return _async.each(payload.updates, function(update) {
                    _this.updateChild(update.child, update.model);
                    return maybeCanceled;
                  }, _async.chunkSizeFrom(scope.chunk));
                }).then(function() {
                  if (payload.adds.length > 0 || payload.removals.length > 0 || payload.updates.length > 0) {
                    scope.plurals = _this.scope.plurals;
                    if (scope.fit) {
                      _this.gManager.fit();
                    }
                    _this.gManager.draw();
                  }
                  return _this.scope.pluralsUpdate.updateCtr += 1;
                });
              };
            })(this));
          } else {
            this.inProgress = false;
            return this.rebuildAll(scope);
          }
        };

        MarkersParentModel.prototype.newChildMarker = function(model, scope) {
          var child, childScope, doDrawSelf, keys;
          if (model[this.idKey] == null) {
            this.$log.error("Marker model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.");
            return;
          }
          this.$log.info('child', child, 'markers', this.scope.plurals);
          childScope = scope.$new(true);
          childScope.events = scope.events;
          keys = {};
          IMarker.scopeKeys.forEach(function(k) {
            return keys[k] = scope[k];
          });
          child = new MarkerChildModel(childScope, model, keys, this.map, this.DEFAULTS, this.doClick, this.gManager, doDrawSelf = false);
          this.scope.plurals.put(model[this.idKey], child);
          return child;
        };

        MarkersParentModel.prototype.onDestroy = function(scope) {
          MarkersParentModel.__super__.onDestroy.call(this, scope);
          return _async.promiseLock(this, uiGmapPromise.promiseTypes["delete"], void 0, void 0, (function(_this) {
            return function() {
              return _async.each(_this.scope.plurals.values(), function(model) {
                if (model != null) {
                  return model.destroy(false);
                }
              }, _async.chunkSizeFrom(_this.scope.cleanchunk, false)).then(function() {
                if (_this.gManager != null) {
                  _this.gManager.clear();
                }
                _this.plurals.removeAll();
                if (_this.plurals !== _this.scope.plurals) {
                  console.error('plurals out of sync for MarkersParentModel');
                }
                return _this.scope.pluralsUpdate.updateCtr += 1;
              });
            };
          })(this));
        };

        MarkersParentModel.prototype.maybeExecMappedEvent = function(cluster, fnName) {
          var pair, _ref;
          if (_.isFunction((_ref = this.scope.clusterEvents) != null ? _ref[fnName] : void 0)) {
            pair = this.mapClusterToPlurals(cluster);
            if (this.origClusterEvents[fnName]) {
              return this.origClusterEvents[fnName](pair.cluster, pair.mapped);
            }
          }
        };

        MarkersParentModel.prototype.mapClusterToPlurals = function(cluster) {
          var mapped;
          mapped = cluster.getMarkers().map((function(_this) {
            return function(g) {
              return _this.scope.plurals.get(g.key).model;
            };
          })(this));
          return {
            cluster: cluster,
            mapped: mapped
          };
        };

        MarkersParentModel.prototype.getItem = function(scope, modelsPropToIterate, index) {
          if (modelsPropToIterate === 'models') {
            return scope[modelsPropToIterate][index];
          }
          return scope[modelsPropToIterate].get(index);
        };

        return MarkersParentModel;

      })(IMarkerParentModel);
      return MarkersParentModel;
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.parent').factory('uiGmapPolygonsParentModel', [
    '$timeout', 'uiGmapLogger', 'uiGmapModelKey', 'uiGmapModelsWatcher', 'uiGmapPropMap', 'uiGmapPolygonChildModel', 'uiGmap_async', 'uiGmapPromise', 'uiGmapIPolygon', function($timeout, $log, ModelKey, ModelsWatcher, PropMap, PolygonChildModel, _async, uiGmapPromise, IPolygon) {
      var PolygonsParentModel;
      return PolygonsParentModel = (function(_super) {
        __extends(PolygonsParentModel, _super);

        PolygonsParentModel.include(ModelsWatcher);

        function PolygonsParentModel(scope, element, attrs, gMap, defaults) {
          var self;
          this.scope = scope;
          this.element = element;
          this.attrs = attrs;
          this.gMap = gMap;
          this.defaults = defaults;
          this.createChild = __bind(this.createChild, this);
          this.pieceMeal = __bind(this.pieceMeal, this);
          this.createAllNew = __bind(this.createAllNew, this);
          this.watchIdKey = __bind(this.watchIdKey, this);
          this.createChildScopes = __bind(this.createChildScopes, this);
          this.watchDestroy = __bind(this.watchDestroy, this);
          this.onDestroy = __bind(this.onDestroy, this);
          this.rebuildAll = __bind(this.rebuildAll, this);
          this.doINeedToWipe = __bind(this.doINeedToWipe, this);
          this.watchModels = __bind(this.watchModels, this);
          PolygonsParentModel.__super__.constructor.call(this, scope);
          this["interface"] = IPolygon;
          self = this;
          this.$log = $log;
          this.plurals = new PropMap();
          _.each(IPolygon.scopeKeys, (function(_this) {
            return function(name) {
              return _this[name + 'Key'] = void 0;
            };
          })(this));
          this.models = void 0;
          this.firstTime = true;
          this.$log.info(this);
          this.createChildScopes();
        }

        PolygonsParentModel.prototype.watchModels = function(scope) {
          return scope.$watchCollection('models', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                if (_this.doINeedToWipe(newValue) || scope.doRebuildAll) {
                  return _this.rebuildAll(scope, true, true);
                } else {
                  return _this.createChildScopes(false);
                }
              }
            };
          })(this));
        };

        PolygonsParentModel.prototype.doINeedToWipe = function(newValue) {
          var newValueIsEmpty;
          newValueIsEmpty = newValue != null ? newValue.length === 0 : true;
          return this.plurals.length > 0 && newValueIsEmpty;
        };

        PolygonsParentModel.prototype.rebuildAll = function(scope, doCreate, doDelete) {
          return this.onDestroy(doDelete).then((function(_this) {
            return function() {
              if (doCreate) {
                return _this.createChildScopes();
              }
            };
          })(this));
        };

        PolygonsParentModel.prototype.onDestroy = function(scope) {
          PolygonsParentModel.__super__.onDestroy.call(this, this.scope);
          return _async.promiseLock(this, uiGmapPromise.promiseTypes["delete"], void 0, void 0, (function(_this) {
            return function() {
              return _async.each(_this.plurals.values(), function(child) {
                return child.destroy(true);
              }, _async.chunkSizeFrom(_this.scope.cleanchunk, false)).then(function() {
                var _ref;
                return (_ref = _this.plurals) != null ? _ref.removeAll() : void 0;
              });
            };
          })(this));
        };

        PolygonsParentModel.prototype.watchDestroy = function(scope) {
          return scope.$on('$destroy', (function(_this) {
            return function() {
              return _this.rebuildAll(scope, false, true);
            };
          })(this));
        };

        PolygonsParentModel.prototype.createChildScopes = function(isCreatingFromScratch) {
          if (isCreatingFromScratch == null) {
            isCreatingFromScratch = true;
          }
          if (angular.isUndefined(this.scope.models)) {
            this.$log.error('No models to create Polygons from! I Need direct models!');
            return;
          }
          if ((this.gMap == null) || (this.scope.models == null)) {
            return;
          }
          this.watchIdKey(this.scope);
          if (isCreatingFromScratch) {
            return this.createAllNew(this.scope, false);
          } else {
            return this.pieceMeal(this.scope, false);
          }
        };

        PolygonsParentModel.prototype.watchIdKey = function(scope) {
          this.setIdKey(scope);
          return scope.$watch('idKey', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue && (newValue == null)) {
                _this.idKey = newValue;
                return _this.rebuildAll(scope, true, true);
              }
            };
          })(this));
        };

        PolygonsParentModel.prototype.createAllNew = function(scope, isArray) {
          var maybeCanceled;
          if (isArray == null) {
            isArray = false;
          }
          this.models = scope.models;
          if (this.firstTime) {
            this.watchModels(scope);
            this.watchDestroy(scope);
          }
          if (this.didQueueInitPromise(this, scope)) {
            return;
          }
          maybeCanceled = null;
          return _async.promiseLock(this, uiGmapPromise.promiseTypes.create, 'createAllNew', (function(canceledMsg) {
            return maybeCanceled = canceledMsg;
          }), (function(_this) {
            return function() {
              return _async.each(scope.models, function(model) {
                var child;
                child = _this.createChild(model, _this.gMap);
                if (maybeCanceled) {
                  $log.debug('createNew should fall through safely');
                  child.isEnabled = false;
                }
                return maybeCanceled;
              }, _async.chunkSizeFrom(scope.chunk)).then(function() {
                return _this.firstTime = false;
              });
            };
          })(this));
        };

        PolygonsParentModel.prototype.pieceMeal = function(scope, isArray) {
          var maybeCanceled, payload;
          if (isArray == null) {
            isArray = true;
          }
          if (scope.$$destroyed) {
            return;
          }
          maybeCanceled = null;
          payload = null;
          this.models = scope.models;
          if ((scope != null) && this.modelsLength() && this.plurals.length) {
            return _async.promiseLock(this, uiGmapPromise.promiseTypes.update, 'pieceMeal', (function(canceledMsg) {
              return maybeCanceled = canceledMsg;
            }), (function(_this) {
              return function() {
                return uiGmapPromise.promise(function() {
                  return _this.figureOutState(_this.idKey, scope, _this.plurals, _this.modelKeyComparison);
                }).then(function(state) {
                  payload = state;
                  if (payload.updates.length) {
                    $log.warning("polygons updates: " + payload.updates.length + " will be missed");
                  }
                  return _async.each(payload.removals, function(child) {
                    if (child != null) {
                      child.destroy();
                      _this.plurals.remove(child.model[_this.idKey]);
                      return maybeCanceled;
                    }
                  }, _async.chunkSizeFrom(scope.chunk));
                }).then(function() {
                  return _async.each(payload.adds, function(modelToAdd) {
                    if (maybeCanceled) {
                      $log.debug('pieceMeal should fall through safely');
                    }
                    _this.createChild(modelToAdd, _this.gMap);
                    return maybeCanceled;
                  }, _async.chunkSizeFrom(scope.chunk));
                });
              };
            })(this));
          } else {
            this.inProgress = false;
            return this.rebuildAll(this.scope, true, true);
          }
        };

        PolygonsParentModel.prototype.createChild = function(model, gMap) {
          var child, childScope;
          childScope = this.scope.$new(false);
          this.setChildScope(IPolygon.scopeKeys, childScope, model);
          childScope.$watch('model', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return _this.setChildScope(childScope, newValue);
              }
            };
          })(this), true);
          childScope["static"] = this.scope["static"];
          child = new PolygonChildModel(childScope, this.attrs, gMap, this.defaults, model);
          if (model[this.idKey] == null) {
            this.$log.error("Polygon model has no id to assign a child to.\nThis is required for performance. Please assign id,\nor redirect id to a different key.");
            return;
          }
          this.plurals.put(model[this.idKey], child);
          return child;
        };

        return PolygonsParentModel;

      })(ModelKey);
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.parent').factory('uiGmapPolylinesParentModel', [
    '$timeout', 'uiGmapLogger', 'uiGmapModelKey', 'uiGmapModelsWatcher', 'uiGmapPropMap', 'uiGmapPolylineChildModel', 'uiGmap_async', 'uiGmapPromise', 'uiGmapIPolyline', function($timeout, $log, ModelKey, ModelsWatcher, PropMap, PolylineChildModel, _async, uiGmapPromise, IPolyline) {
      var PolylinesParentModel;
      return PolylinesParentModel = (function(_super) {
        __extends(PolylinesParentModel, _super);

        PolylinesParentModel.include(ModelsWatcher);

        function PolylinesParentModel(scope, element, attrs, gMap, defaults) {
          var self;
          this.scope = scope;
          this.element = element;
          this.attrs = attrs;
          this.gMap = gMap;
          this.defaults = defaults;
          this.setChildScope = __bind(this.setChildScope, this);
          this.createChild = __bind(this.createChild, this);
          this.pieceMeal = __bind(this.pieceMeal, this);
          this.createAllNew = __bind(this.createAllNew, this);
          this.watchIdKey = __bind(this.watchIdKey, this);
          this.createChildScopes = __bind(this.createChildScopes, this);
          this.watchOurScope = __bind(this.watchOurScope, this);
          this.watchDestroy = __bind(this.watchDestroy, this);
          this.onDestroy = __bind(this.onDestroy, this);
          this.rebuildAll = __bind(this.rebuildAll, this);
          this.doINeedToWipe = __bind(this.doINeedToWipe, this);
          this.watchModels = __bind(this.watchModels, this);
          this.watch = __bind(this.watch, this);
          PolylinesParentModel.__super__.constructor.call(this, scope);
          this["interface"] = IPolyline;
          self = this;
          this.$log = $log;
          this.plurals = new PropMap();
          _.each(IPolyline.scopeKeys, (function(_this) {
            return function(name) {
              return _this[name + 'Key'] = void 0;
            };
          })(this));
          this.models = void 0;
          this.firstTime = true;
          this.$log.info(this);
          this.watchOurScope(scope);
          this.createChildScopes();
        }

        PolylinesParentModel.prototype.watch = function(scope, name, nameKey) {
          return scope.$watch(name, (function(_this) {
            return function(newValue, oldValue) {
              var maybeCanceled;
              if (newValue !== oldValue) {
                maybeCanceled = null;
                _this[nameKey] = _.isFunction(newValue) ? newValue() : newValue;
                return _async.promiseLock(_this, uiGmapPromise.promiseTypes.update, "watch " + name + " " + nameKey, (function(canceledMsg) {
                  return maybeCanceled = canceledMsg;
                }), function() {
                  return _async.each(_this.plurals.values(), function(model) {
                    model.scope[name] = _this[nameKey] === 'self' ? model : model[_this[nameKey]];
                    return maybeCanceled;
                  }, false);
                });
              }
            };
          })(this));
        };

        PolylinesParentModel.prototype.watchModels = function(scope) {
          return scope.$watchCollection('models', (function(_this) {
            return function(newValue, oldValue) {
              if (!(_.isEqual(newValue, oldValue) && (_this.lastNewValue !== newValue || _this.lastOldValue !== oldValue))) {
                _this.lastNewValue = newValue;
                _this.lastOldValue = oldValue;
                if (_this.doINeedToWipe(newValue)) {
                  return _this.rebuildAll(scope, true, true);
                } else {
                  return _this.createChildScopes(false);
                }
              }
            };
          })(this));
        };

        PolylinesParentModel.prototype.doINeedToWipe = function(newValue) {
          var newValueIsEmpty;
          newValueIsEmpty = newValue != null ? newValue.length === 0 : true;
          return this.plurals.length > 0 && newValueIsEmpty;
        };

        PolylinesParentModel.prototype.rebuildAll = function(scope, doCreate, doDelete) {
          return this.onDestroy(doDelete).then((function(_this) {
            return function() {
              if (doCreate) {
                return _this.createChildScopes();
              }
            };
          })(this));
        };

        PolylinesParentModel.prototype.onDestroy = function(scope) {
          PolylinesParentModel.__super__.onDestroy.call(this, this.scope);
          return _async.promiseLock(this, uiGmapPromise.promiseTypes["delete"], void 0, void 0, (function(_this) {
            return function() {
              return _async.each(_this.plurals.values(), function(child) {
                return child.destroy(true);
              }, _async.chunkSizeFrom(_this.scope.cleanchunk, false)).then(function() {
                var _ref;
                return (_ref = _this.plurals) != null ? _ref.removeAll() : void 0;
              });
            };
          })(this));
        };

        PolylinesParentModel.prototype.watchDestroy = function(scope) {
          return scope.$on('$destroy', (function(_this) {
            return function() {
              return _this.rebuildAll(scope, false, true);
            };
          })(this));
        };

        PolylinesParentModel.prototype.watchOurScope = function(scope) {
          return _.each(IPolyline.scopeKeys, (function(_this) {
            return function(name) {
              var nameKey;
              nameKey = name + 'Key';
              _this[nameKey] = typeof scope[name] === 'function' ? scope[name]() : scope[name];
              return _this.watch(scope, name, nameKey);
            };
          })(this));
        };

        PolylinesParentModel.prototype.createChildScopes = function(isCreatingFromScratch) {
          if (isCreatingFromScratch == null) {
            isCreatingFromScratch = true;
          }
          if (angular.isUndefined(this.scope.models)) {
            this.$log.error('No models to create Polylines from! I Need direct models!');
            return;
          }
          if (this.gMap != null) {
            if (this.scope.models != null) {
              this.watchIdKey(this.scope);
              if (isCreatingFromScratch) {
                return this.createAllNew(this.scope, false);
              } else {
                return this.pieceMeal(this.scope, false);
              }
            }
          }
        };

        PolylinesParentModel.prototype.watchIdKey = function(scope) {
          this.setIdKey(scope);
          return scope.$watch('idKey', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue && (newValue == null)) {
                _this.idKey = newValue;
                return _this.rebuildAll(scope, true, true);
              }
            };
          })(this));
        };

        PolylinesParentModel.prototype.createAllNew = function(scope, isArray) {
          var maybeCanceled;
          if (isArray == null) {
            isArray = false;
          }
          this.models = scope.models;
          if (this.firstTime) {
            this.watchModels(scope);
            this.watchDestroy(scope);
          }
          if (this.didQueueInitPromise(this, scope)) {
            return;
          }
          maybeCanceled = null;
          return _async.promiseLock(this, uiGmapPromise.promiseTypes.create, 'createAllNew', (function(canceledMsg) {
            return maybeCanceled = canceledMsg;
          }), (function(_this) {
            return function() {
              return _async.each(scope.models, function(model) {
                _this.createChild(model, _this.gMap);
                if (maybeCanceled) {
                  $log.debug('createNew should fall through safely');
                }
                return maybeCanceled;
              }).then(function() {
                return _this.firstTime = false;
              });
            };
          })(this));
        };

        PolylinesParentModel.prototype.pieceMeal = function(scope, isArray) {
          var maybeCanceled, payload;
          if (isArray == null) {
            isArray = true;
          }
          if (scope.$$destroyed) {
            return;
          }
          maybeCanceled = null;
          payload = null;
          this.models = scope.models;
          if ((scope != null) && this.modelsLength() && this.plurals.length) {
            return _async.promiseLock(this, uiGmapPromise.promiseTypes.update, 'pieceMeal', (function(canceledMsg) {
              return maybeCanceled = canceledMsg;
            }), (function(_this) {
              return function() {
                return uiGmapPromise.promise(function() {
                  return _this.figureOutState(_this.idKey, scope, _this.plurals, _this.modelKeyComparison);
                }).then(function(state) {
                  payload = state;
                  return _async.each(payload.removals, function(id) {
                    var child;
                    child = _this.plurals.get(id);
                    if (child != null) {
                      child.destroy();
                      _this.plurals.remove(id);
                      return maybeCanceled;
                    }
                  });
                }).then(function() {
                  return _async.each(payload.adds, function(modelToAdd) {
                    if (maybeCanceled) {
                      $log.debug('pieceMeal should fall through safely');
                    }
                    _this.createChild(modelToAdd, _this.gMap);
                    return maybeCanceled;
                  });
                });
              };
            })(this));
          } else {
            this.inProgress = false;
            return this.rebuildAll(this.scope, true, true);
          }
        };

        PolylinesParentModel.prototype.createChild = function(model, gMap) {
          var child, childScope;
          childScope = this.scope.$new(false);
          this.setChildScope(childScope, model);
          childScope.$watch('model', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return _this.setChildScope(childScope, newValue);
              }
            };
          })(this), true);
          childScope["static"] = this.scope["static"];
          child = new PolylineChildModel(childScope, this.attrs, gMap, this.defaults, model);
          if (model[this.idKey] == null) {
            this.$log.error("Polyline model has no id to assign a child to.\nThis is required for performance. Please assign id,\nor redirect id to a different key.");
            return;
          }
          this.plurals.put(model[this.idKey], child);
          return child;
        };

        PolylinesParentModel.prototype.setChildScope = function(childScope, model) {
          IPolyline.scopeKeys.forEach((function(_this) {
            return function(name) {
              var nameKey, newValue;
              nameKey = name + 'Key';
              newValue = _this[nameKey] === 'self' ? model : model[_this[nameKey]];
              if (newValue !== childScope[name]) {
                return childScope[name] = newValue;
              }
            };
          })(this));
          return childScope.model = model;
        };

        return PolylinesParentModel;

      })(ModelKey);
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.parent').factory('uiGmapRectangleParentModel', [
    'uiGmapLogger', 'uiGmapGmapUtil', 'uiGmapEventsHelper', 'uiGmapRectangleOptionsBuilder', function($log, GmapUtil, EventsHelper, Builder) {
      var RectangleParentModel;
      return RectangleParentModel = (function(_super) {
        __extends(RectangleParentModel, _super);

        RectangleParentModel.include(GmapUtil);

        RectangleParentModel.include(EventsHelper);

        function RectangleParentModel(scope, element, attrs, map, DEFAULTS) {
          var bounds, clear, createBounds, dragging, fit, gObject, init, listeners, myListeners, settingBoundsFromScope, updateBounds;
          this.scope = scope;
          this.attrs = attrs;
          this.map = map;
          this.DEFAULTS = DEFAULTS;
          bounds = void 0;
          dragging = false;
          myListeners = [];
          listeners = void 0;
          fit = (function(_this) {
            return function() {
              if (_this.isTrue(attrs.fit)) {
                return _this.fitMapBounds(_this.map, bounds);
              }
            };
          })(this);
          createBounds = (function(_this) {
            return function() {
              var _ref, _ref1;
              if ((scope.bounds != null) && (((_ref = scope.bounds) != null ? _ref.sw : void 0) != null) && (((_ref1 = scope.bounds) != null ? _ref1.ne : void 0) != null) && _this.validateBoundPoints(scope.bounds)) {
                bounds = _this.convertBoundPoints(scope.bounds);
                return $log.info("new new bounds created: " + (JSON.stringify(bounds)));
              } else if ((scope.bounds.getNorthEast != null) && (scope.bounds.getSouthWest != null)) {
                return bounds = scope.bounds;
              } else {
                if (scope.bounds != null) {
                  return $log.error("Invalid bounds for newValue: " + (JSON.stringify(scope != null ? scope.bounds : void 0)));
                }
              }
            };
          })(this);
          createBounds();
          gObject = new google.maps.Rectangle(this.buildOpts(bounds));
          $log.info("gObject (rectangle) created: " + gObject);
          settingBoundsFromScope = false;
          updateBounds = (function(_this) {
            return function() {
              var b, ne, sw;
              b = gObject.getBounds();
              ne = b.getNorthEast();
              sw = b.getSouthWest();
              if (settingBoundsFromScope) {
                return;
              }
              return scope.$evalAsync(function(s) {
                if ((s.bounds != null) && (s.bounds.sw != null) && (s.bounds.ne != null)) {
                  s.bounds.ne = {
                    latitude: ne.lat(),
                    longitude: ne.lng()
                  };
                  s.bounds.sw = {
                    latitude: sw.lat(),
                    longitude: sw.lng()
                  };
                }
                if ((s.bounds.getNorthEast != null) && (s.bounds.getSouthWest != null)) {
                  return s.bounds = b;
                }
              });
            };
          })(this);
          init = (function(_this) {
            return function() {
              fit();
              _this.removeEvents(myListeners);
              myListeners.push(google.maps.event.addListener(gObject, 'dragstart', function() {
                return dragging = true;
              }));
              myListeners.push(google.maps.event.addListener(gObject, 'dragend', function() {
                dragging = false;
                return updateBounds();
              }));
              return myListeners.push(google.maps.event.addListener(gObject, 'bounds_changed', function() {
                if (dragging) {
                  return;
                }
                return updateBounds();
              }));
            };
          })(this);
          clear = (function(_this) {
            return function() {
              _this.removeEvents(myListeners);
              if (listeners != null) {
                _this.removeEvents(listeners);
              }
              return gObject.setMap(null);
            };
          })(this);
          if (bounds != null) {
            init();
          }
          scope.$watch('bounds', (function(newValue, oldValue) {
            var isNew;
            if (_.isEqual(newValue, oldValue) && (bounds != null) || dragging) {
              return;
            }
            settingBoundsFromScope = true;
            if (newValue == null) {
              clear();
              return;
            }
            if (bounds == null) {
              isNew = true;
            } else {
              fit();
            }
            createBounds();
            gObject.setBounds(bounds);
            settingBoundsFromScope = false;
            if (isNew && (bounds != null)) {
              return init();
            }
          }), true);
          this.setMyOptions = (function(_this) {
            return function(newVals, oldVals) {
              if (!_.isEqual(newVals, oldVals)) {
                if ((bounds != null) && (newVals != null)) {
                  return gObject.setOptions(_this.buildOpts(bounds));
                }
              }
            };
          })(this);
          this.props.push('bounds');
          this.watchProps(this.props);
          if (attrs.events != null) {
            listeners = this.setEvents(gObject, scope, scope);
            scope.$watch('events', (function(_this) {
              return function(newValue, oldValue) {
                if (!_.isEqual(newValue, oldValue)) {
                  if (listeners != null) {
                    _this.removeEvents(listeners);
                  }
                  return listeners = _this.setEvents(gObject, scope, scope);
                }
              };
            })(this));
          }
          scope.$on('$destroy', (function(_this) {
            return function() {
              return clear();
            };
          })(this));
          $log.info(this);
        }

        return RectangleParentModel;

      })(Builder);
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.parent').factory('uiGmapSearchBoxParentModel', [
    'uiGmapBaseObject', 'uiGmapLogger', 'uiGmapEventsHelper', '$timeout', '$http', '$templateCache', function(BaseObject, Logger, EventsHelper, $timeout, $http, $templateCache) {
      var SearchBoxParentModel;
      SearchBoxParentModel = (function(_super) {
        __extends(SearchBoxParentModel, _super);

        SearchBoxParentModel.include(EventsHelper);

        function SearchBoxParentModel(scope, element, attrs, gMap, ctrlPosition, template, $log) {
          var controlDiv;
          this.scope = scope;
          this.element = element;
          this.attrs = attrs;
          this.gMap = gMap;
          this.ctrlPosition = ctrlPosition;
          this.template = template;
          this.$log = $log != null ? $log : Logger;
          this.setVisibility = __bind(this.setVisibility, this);
          this.getBounds = __bind(this.getBounds, this);
          this.setBounds = __bind(this.setBounds, this);
          this.createSearchBox = __bind(this.createSearchBox, this);
          this.addToParentDiv = __bind(this.addToParentDiv, this);
          this.addAsMapControl = __bind(this.addAsMapControl, this);
          this.init = __bind(this.init, this);
          if (this.attrs.template == null) {
            this.$log.error('template attribute for the search-box directive is mandatory. Places Search Box creation aborted!!');
            return;
          }
          if (angular.isUndefined(this.scope.options)) {
            this.scope.options = {};
            this.scope.options.visible = true;
          }
          if (angular.isUndefined(this.scope.options.visible)) {
            this.scope.options.visible = true;
          }
          if (angular.isUndefined(this.scope.options.autocomplete)) {
            this.scope.options.autocomplete = false;
          }
          this.visible = scope.options.visible;
          this.autocomplete = scope.options.autocomplete;
          controlDiv = angular.element('<div></div>');
          controlDiv.append(this.template);
          this.input = controlDiv.find('input')[0];
          this.init();
        }

        SearchBoxParentModel.prototype.init = function() {
          this.createSearchBox();
          this.scope.$watch('options', (function(_this) {
            return function(newValue, oldValue) {
              if (angular.isObject(newValue)) {
                if (newValue.bounds != null) {
                  _this.setBounds(newValue.bounds);
                }
                if (newValue.visible != null) {
                  if (_this.visible !== newValue.visible) {
                    return _this.setVisibility(newValue.visible);
                  }
                }
              }
            };
          })(this), true);
          if (this.attrs.parentdiv != null) {
            this.addToParentDiv();
          } else {
            this.addAsMapControl();
          }
          if (this.autocomplete) {
            this.listener = google.maps.event.addListener(this.gObject, 'place_changed', (function(_this) {
              return function() {
                return _this.places = _this.gObject.getPlace();
              };
            })(this));
          } else {
            this.listener = google.maps.event.addListener(this.gObject, 'places_changed', (function(_this) {
              return function() {
                return _this.places = _this.gObject.getPlaces();
              };
            })(this));
          }
          this.listeners = this.setEvents(this.gObject, this.scope, this.scope);
          this.$log.info(this);
          return this.scope.$on('$destroy', (function(_this) {
            return function() {
              return _this.gObject = null;
            };
          })(this));
        };

        SearchBoxParentModel.prototype.addAsMapControl = function() {
          return this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].push(this.input);
        };

        SearchBoxParentModel.prototype.addToParentDiv = function() {
          this.parentDiv = angular.element(document.getElementById(this.scope.parentdiv));
          return this.parentDiv.append(this.input);
        };

        SearchBoxParentModel.prototype.createSearchBox = function() {
          if (this.autocomplete) {
            return this.gObject = new google.maps.places.Autocomplete(this.input, this.scope.options);
          } else {
            return this.gObject = new google.maps.places.SearchBox(this.input, this.scope.options);
          }
        };

        SearchBoxParentModel.prototype.setBounds = function(bounds) {
          if (angular.isUndefined(bounds.isEmpty)) {
            this.$log.error('Error: SearchBoxParentModel setBounds. Bounds not an instance of LatLngBounds.');
          } else {
            if (bounds.isEmpty() === false) {
              if (this.gObject != null) {
                return this.gObject.setBounds(bounds);
              }
            }
          }
        };

        SearchBoxParentModel.prototype.getBounds = function() {
          return this.gObject.getBounds();
        };

        SearchBoxParentModel.prototype.setVisibility = function(val) {
          if (this.attrs.parentdiv != null) {
            if (val === false) {
              this.parentDiv.addClass("ng-hide");
            } else {
              this.parentDiv.removeClass("ng-hide");
            }
          } else {
            if (val === false) {
              this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].clear();
            } else {
              this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].push(this.input);
            }
          }
          return this.visible = val;
        };

        return SearchBoxParentModel;

      })(BaseObject);
      return SearchBoxParentModel;
    }
  ]);

}).call(this);
;
/*
	WindowsChildModel generator where there are many ChildModels to a parent.
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.parent').factory('uiGmapWindowsParentModel', [
    'uiGmapIWindowParentModel', 'uiGmapModelsWatcher', 'uiGmapPropMap', 'uiGmapWindowChildModel', 'uiGmapLinked', 'uiGmap_async', 'uiGmapLogger', '$timeout', '$compile', '$http', '$templateCache', '$interpolate', 'uiGmapPromise', 'uiGmapIWindow', 'uiGmapGmapUtil', function(IWindowParentModel, ModelsWatcher, PropMap, WindowChildModel, Linked, _async, $log, $timeout, $compile, $http, $templateCache, $interpolate, uiGmapPromise, IWindow, GmapUtil) {
      var WindowsParentModel;
      WindowsParentModel = (function(_super) {
        __extends(WindowsParentModel, _super);

        WindowsParentModel.include(ModelsWatcher);

        function WindowsParentModel(scope, element, attrs, ctrls, gMap, markersScope) {
          this.gMap = gMap;
          this.markersScope = markersScope;
          this.modelKeyComparison = __bind(this.modelKeyComparison, this);
          this.interpolateContent = __bind(this.interpolateContent, this);
          this.setChildScope = __bind(this.setChildScope, this);
          this.createWindow = __bind(this.createWindow, this);
          this.setContentKeys = __bind(this.setContentKeys, this);
          this.pieceMeal = __bind(this.pieceMeal, this);
          this.createAllNew = __bind(this.createAllNew, this);
          this.watchIdKey = __bind(this.watchIdKey, this);
          this.createChildScopes = __bind(this.createChildScopes, this);
          this.watchOurScope = __bind(this.watchOurScope, this);
          this.watchDestroy = __bind(this.watchDestroy, this);
          this.onDestroy = __bind(this.onDestroy, this);
          this.rebuildAll = __bind(this.rebuildAll, this);
          this.doINeedToWipe = __bind(this.doINeedToWipe, this);
          this.watchModels = __bind(this.watchModels, this);
          this.go = __bind(this.go, this);
          WindowsParentModel.__super__.constructor.call(this, scope, element, attrs, ctrls, $timeout, $compile, $http, $templateCache);
          this["interface"] = IWindow;
          this.plurals = new PropMap();
          _.each(IWindow.scopeKeys, (function(_this) {
            return function(name) {
              return _this[name + 'Key'] = void 0;
            };
          })(this));
          this.linked = new Linked(scope, element, attrs, ctrls);
          this.models = void 0;
          this.contentKeys = void 0;
          this.isIconVisibleOnClick = void 0;
          this.firstTime = true;
          this.firstWatchModels = true;
          this.$log.info(self);
          this.parentScope = void 0;
          this.go(scope);
        }

        WindowsParentModel.prototype.go = function(scope) {
          this.watchOurScope(scope);
          this.doRebuildAll = this.scope.doRebuildAll != null ? this.scope.doRebuildAll : false;
          scope.$watch('doRebuildAll', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return _this.doRebuildAll = newValue;
              }
            };
          })(this));
          return this.createChildScopes();
        };

        WindowsParentModel.prototype.watchModels = function(scope) {
          var itemToWatch;
          itemToWatch = this.markersScope != null ? 'pluralsUpdate' : 'models';
          return scope.$watch(itemToWatch, (function(_this) {
            return function(newValue, oldValue) {
              var doScratch;
              if (!_.isEqual(newValue, oldValue) || _this.firstWatchModels) {
                _this.firstWatchModels = false;
                if (_this.doRebuildAll || _this.doINeedToWipe(scope.models)) {
                  return _this.rebuildAll(scope, true, true);
                } else {
                  doScratch = _this.plurals.length === 0;
                  if (_this.existingPieces != null) {
                    return _.last(_this.existingPieces._content).then(function() {
                      return _this.createChildScopes(doScratch);
                    });
                  } else {
                    return _this.createChildScopes(doScratch);
                  }
                }
              }
            };
          })(this), true);
        };

        WindowsParentModel.prototype.doINeedToWipe = function(newValue) {
          var newValueIsEmpty;
          newValueIsEmpty = newValue != null ? newValue.length === 0 : true;
          return this.plurals.length > 0 && newValueIsEmpty;
        };

        WindowsParentModel.prototype.rebuildAll = function(scope, doCreate, doDelete) {
          return this.onDestroy(doDelete).then((function(_this) {
            return function() {
              if (doCreate) {
                return _this.createChildScopes();
              }
            };
          })(this));
        };

        WindowsParentModel.prototype.onDestroy = function(scope) {
          WindowsParentModel.__super__.onDestroy.call(this, this.scope);
          return _async.promiseLock(this, uiGmapPromise.promiseTypes["delete"], void 0, void 0, (function(_this) {
            return function() {
              return _async.each(_this.plurals.values(), function(child) {
                return child.destroy();
              }, _async.chunkSizeFrom(_this.scope.cleanchunk, false)).then(function() {
                var _ref;
                return (_ref = _this.plurals) != null ? _ref.removeAll() : void 0;
              });
            };
          })(this));
        };

        WindowsParentModel.prototype.watchDestroy = function(scope) {
          return scope.$on('$destroy', (function(_this) {
            return function() {
              _this.firstWatchModels = true;
              _this.firstTime = true;
              return _this.rebuildAll(scope, false, true);
            };
          })(this));
        };

        WindowsParentModel.prototype.watchOurScope = function(scope) {
          return _.each(IWindow.scopeKeys, (function(_this) {
            return function(name) {
              var nameKey;
              nameKey = name + 'Key';
              return _this[nameKey] = typeof scope[name] === 'function' ? scope[name]() : scope[name];
            };
          })(this));
        };

        WindowsParentModel.prototype.createChildScopes = function(isCreatingFromScratch) {
          var modelsNotDefined, _ref, _ref1;
          if (isCreatingFromScratch == null) {
            isCreatingFromScratch = true;
          }

          /*
          being that we cannot tell the difference in Key String vs. a normal value string (TemplateUrl)
          we will assume that all scope values are string expressions either pointing to a key (propName) or using
          'self' to point the model as container/object of interest.
          
          This may force redundant information into the model, but this appears to be the most flexible approach.
           */
          this.isIconVisibleOnClick = true;
          if (angular.isDefined(this.linked.attrs.isiconvisibleonclick)) {
            this.isIconVisibleOnClick = this.linked.scope.isIconVisibleOnClick;
          }
          modelsNotDefined = angular.isUndefined(this.linked.scope.models);
          if (modelsNotDefined && (this.markersScope === void 0 || (((_ref = this.markersScope) != null ? _ref.plurals : void 0) === void 0 || ((_ref1 = this.markersScope) != null ? _ref1.models : void 0) === void 0))) {
            this.$log.error('No models to create windows from! Need direct models or models derived from markers!');
            return;
          }
          if (this.gMap != null) {
            if (this.linked.scope.models != null) {
              this.watchIdKey(this.linked.scope);
              if (isCreatingFromScratch) {
                return this.createAllNew(this.linked.scope, false);
              } else {
                return this.pieceMeal(this.linked.scope, false);
              }
            } else {
              this.parentScope = this.markersScope;
              this.watchIdKey(this.parentScope);
              if (isCreatingFromScratch) {
                return this.createAllNew(this.markersScope, true, 'plurals', false);
              } else {
                return this.pieceMeal(this.markersScope, true, 'plurals', false);
              }
            }
          }
        };

        WindowsParentModel.prototype.watchIdKey = function(scope) {
          this.setIdKey(scope);
          return scope.$watch('idKey', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue && (newValue == null)) {
                _this.idKey = newValue;
                return _this.rebuildAll(scope, true, true);
              }
            };
          })(this));
        };

        WindowsParentModel.prototype.createAllNew = function(scope, hasGMarker, modelsPropToIterate, isArray) {
          var maybeCanceled;
          if (modelsPropToIterate == null) {
            modelsPropToIterate = 'models';
          }
          if (isArray == null) {
            isArray = false;
          }
          this.models = scope.models;
          if (this.firstTime) {
            this.watchModels(scope);
            this.watchDestroy(scope);
          }
          this.setContentKeys(scope.models);
          if (this.didQueueInitPromise(this, scope)) {
            return;
          }
          maybeCanceled = null;
          return _async.promiseLock(this, uiGmapPromise.promiseTypes.create, 'createAllNew', (function(canceledMsg) {
            return maybeCanceled = canceledMsg;
          }), (function(_this) {
            return function() {
              return _async.each(scope.models, function(model) {
                var gMarker, _ref;
                gMarker = hasGMarker ? (_ref = _this.getItem(scope, modelsPropToIterate, model[_this.idKey])) != null ? _ref.gObject : void 0 : void 0;
                if (!maybeCanceled) {
                  if (!gMarker && _this.markersScope) {
                    $log.error('Unable to get gMarker from markersScope!');
                  }
                  _this.createWindow(model, gMarker, _this.gMap);
                }
                return maybeCanceled;
              }, _async.chunkSizeFrom(scope.chunk)).then(function() {
                return _this.firstTime = false;
              });
            };
          })(this));
        };

        WindowsParentModel.prototype.pieceMeal = function(scope, hasGMarker, modelsPropToIterate, isArray) {
          var maybeCanceled, payload;
          if (modelsPropToIterate == null) {
            modelsPropToIterate = 'models';
          }
          if (isArray == null) {
            isArray = true;
          }
          if (scope.$$destroyed) {
            return;
          }
          maybeCanceled = null;
          payload = null;
          this.models = scope.models;
          if ((scope != null) && this.modelsLength() && this.plurals.length) {
            return _async.promiseLock(this, uiGmapPromise.promiseTypes.update, 'pieceMeal', (function(canceledMsg) {
              return maybeCanceled = canceledMsg;
            }), (function(_this) {
              return function() {
                return uiGmapPromise.promise((function() {
                  return _this.figureOutState(_this.idKey, scope, _this.plurals, _this.modelKeyComparison);
                })).then(function(state) {
                  payload = state;
                  return _async.each(payload.removals, function(child) {
                    if (child != null) {
                      _this.plurals.remove(child.id);
                      if (child.destroy != null) {
                        child.destroy(true);
                      }
                      return maybeCanceled;
                    }
                  }, _async.chunkSizeFrom(scope.chunk));
                }).then(function() {
                  return _async.each(payload.adds, function(modelToAdd) {
                    var gMarker, _ref;
                    gMarker = (_ref = _this.getItem(scope, modelsPropToIterate, modelToAdd[_this.idKey])) != null ? _ref.gObject : void 0;
                    if (!gMarker) {
                      throw 'Gmarker undefined';
                    }
                    _this.createWindow(modelToAdd, gMarker, _this.gMap);
                    return maybeCanceled;
                  });
                }).then(function() {
                  return _async.each(payload.updates, function(update) {
                    _this.updateChild(update.child, update.model);
                    return maybeCanceled;
                  }, _async.chunkSizeFrom(scope.chunk));
                });
              };
            })(this));
          } else {
            $log.debug('pieceMeal: rebuildAll');
            return this.rebuildAll(this.scope, true, true);
          }
        };

        WindowsParentModel.prototype.setContentKeys = function(models) {
          if (this.modelsLength()) {
            return this.contentKeys = Object.keys(models[0]);
          }
        };

        WindowsParentModel.prototype.createWindow = function(model, gMarker, gMap) {
          var child, childScope, fakeElement, opts, _ref, _ref1;
          childScope = this.linked.scope.$new(false);
          this.setChildScope(childScope, model);
          childScope.$watch('model', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return _this.setChildScope(childScope, newValue);
              }
            };
          })(this), true);
          fakeElement = {
            html: (function(_this) {
              return function() {
                return _this.interpolateContent(_this.linked.element.html(), model);
              };
            })(this)
          };
          this.DEFAULTS = this.scopeOrModelVal(this.optionsKey, this.scope, model) || {};
          opts = this.createWindowOptions(gMarker, childScope, fakeElement.html(), this.DEFAULTS);
          child = new WindowChildModel(model, childScope, opts, this.isIconVisibleOnClick, gMap, (_ref = this.markersScope) != null ? (_ref1 = _ref.plurals.get(model[this.idKey])) != null ? _ref1.scope : void 0 : void 0, fakeElement, false, true);
          if (model[this.idKey] == null) {
            this.$log.error('Window model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.');
            return;
          }
          this.plurals.put(model[this.idKey], child);
          return child;
        };

        WindowsParentModel.prototype.setChildScope = function(childScope, model) {
          _.each(IWindow.scopeKeys, (function(_this) {
            return function(name) {
              var nameKey, newValue;
              nameKey = name + 'Key';
              newValue = _this[nameKey] === 'self' ? model : model[_this[nameKey]];
              if (newValue !== childScope[name]) {
                return childScope[name] = newValue;
              }
            };
          })(this));
          return childScope.model = model;
        };

        WindowsParentModel.prototype.interpolateContent = function(content, model) {
          var exp, interpModel, key, _i, _len, _ref;
          if (this.contentKeys === void 0 || this.contentKeys.length === 0) {
            return;
          }
          exp = $interpolate(content);
          interpModel = {};
          _ref = this.contentKeys;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            interpModel[key] = model[key];
          }
          return exp(interpModel);
        };

        WindowsParentModel.prototype.modelKeyComparison = function(model1, model2) {
          var isEqual, scope;
          scope = this.scope.coords != null ? this.scope : this.parentScope;
          if (scope == null) {
            throw 'No scope or parentScope set!';
          }
          isEqual = GmapUtil.equalCoords(this.evalModelHandle(model1, scope.coords), this.evalModelHandle(model2, scope.coords));
          if (!isEqual) {
            return isEqual;
          }
          isEqual = _.every(_.without(this["interface"].scopeKeys, 'coords'), (function(_this) {
            return function(k) {
              return _this.evalModelHandle(model1, scope[k]) === _this.evalModelHandle(model2, scope[k]);
            };
          })(this));
          return isEqual;
        };

        return WindowsParentModel;

      })(IWindowParentModel);
      return WindowsParentModel;
    }
  ]);

}).call(this);
;(function() {
  angular.module("uiGmapgoogle-maps.directives.api").factory("uiGmapCircle", [
    "uiGmapICircle", "uiGmapCircleParentModel", function(ICircle, CircleParentModel) {
      return _.extend(ICircle, {
        link: function(scope, element, attrs, mapCtrl) {
          return mapCtrl.getScope().deferred.promise.then((function(_this) {
            return function(map) {
              return new CircleParentModel(scope, element, attrs, map);
            };
          })(this));
        }
      });
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("uiGmapgoogle-maps.directives.api").factory("uiGmapControl", [
    "uiGmapIControl", "$http", "$templateCache", "$compile", "$controller", 'uiGmapGoogleMapApi', function(IControl, $http, $templateCache, $compile, $controller, GoogleMapApi) {
      var Control;
      return Control = (function(_super) {
        __extends(Control, _super);

        function Control() {
          this.link = __bind(this.link, this);
          Control.__super__.constructor.call(this);
        }

        Control.prototype.link = function(scope, element, attrs, ctrl) {
          return GoogleMapApi.then((function(_this) {
            return function(maps) {
              var index, position;
              if (angular.isUndefined(scope.template)) {
                _this.$log.error('mapControl: could not find a valid template property');
                return;
              }
              index = angular.isDefined(scope.index && !isNaN(parseInt(scope.index))) ? parseInt(scope.index) : void 0;
              position = angular.isDefined(scope.position) ? scope.position.toUpperCase().replace(/-/g, '_') : 'TOP_CENTER';
              if (!maps.ControlPosition[position]) {
                _this.$log.error('mapControl: invalid position property');
                return;
              }
              return IControl.mapPromise(scope, ctrl).then(function(map) {
                var control, controlDiv;
                control = void 0;
                controlDiv = angular.element('<div></div>');
                return $http.get(scope.template, {
                  cache: $templateCache
                }).success(function(template) {
                  var templateCtrl, templateScope;
                  templateScope = scope.$new();
                  controlDiv.append(template);
                  if (angular.isDefined(scope.controller)) {
                    templateCtrl = $controller(scope.controller, {
                      $scope: templateScope
                    });
                    controlDiv.children().data('$ngControllerController', templateCtrl);
                  }
                  control = $compile(controlDiv.children())(templateScope);
                  if (index) {
                    return control[0].index = index;
                  }
                }).error(function(error) {
                  return _this.$log.error('mapControl: template could not be found');
                }).then(function() {
                  return map.controls[google.maps.ControlPosition[position]].push(control[0]);
                });
              });
            };
          })(this));
        };

        return Control;

      })(IControl);
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api').service('uiGmapDragZoom', [
    'uiGmapCtrlHandle', 'uiGmapPropertyAction', function(CtrlHandle, PropertyAction) {
      return {
        restrict: 'EMA',
        transclude: true,
        template: '<div class="angular-google-map-dragzoom" ng-transclude style="display: none"></div>',
        require: '^' + 'uiGmapGoogleMap',
        scope: {
          keyboardkey: '=',
          options: '=',
          spec: '='
        },
        controller: [
          '$scope', '$element', function($scope, $element) {
            $scope.ctrlType = 'uiGmapDragZoom';
            return _.extend(this, CtrlHandle.handle($scope, $element));
          }
        ],
        link: function(scope, element, attrs, ctrl) {
          return CtrlHandle.mapPromise(scope, ctrl).then(function(map) {
            var enableKeyDragZoom, setKeyAction, setOptionsAction;
            enableKeyDragZoom = function(opts) {
              map.enableKeyDragZoom(opts);
              if (scope.spec) {
                return scope.spec.enableKeyDragZoom(opts);
              }
            };
            setKeyAction = new PropertyAction(function(key, newVal) {
              if (newVal) {
                return enableKeyDragZoom({
                  key: newVal
                });
              } else {
                return enableKeyDragZoom();
              }
            });
            setOptionsAction = new PropertyAction(function(key, newVal) {
              if (newVal) {
                return enableKeyDragZoom(newVal);
              }
            });
            scope.$watch('keyboardkey', setKeyAction.sic);
            setKeyAction.sic(scope.keyboardkey);
            scope.$watch('options', setOptionsAction.sic);
            return setOptionsAction.sic(scope.options);
          });
        }
      };
    }
  ]);

}).call(this);
;(function() {
  angular.module("uiGmapgoogle-maps.directives.api").factory("uiGmapDrawingManager", [
    "uiGmapIDrawingManager", "uiGmapDrawingManagerParentModel", function(IDrawingManager, DrawingManagerParentModel) {
      return _.extend(IDrawingManager, {
        link: function(scope, element, attrs, mapCtrl) {
          return mapCtrl.getScope().deferred.promise.then(function(map) {
            return new DrawingManagerParentModel(scope, element, attrs, map);
          });
        }
      });
    }
  ]);

}).call(this);
;
/*
  - Link up Polygons to be sent back to a controller
  - inject the draw function into a controllers scope so that controller can call the directive to draw on demand
  - draw function creates the DrawFreeHandChildModel which manages itself
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapApiFreeDrawPolygons', [
    'uiGmapLogger', 'uiGmapBaseObject', 'uiGmapCtrlHandle', 'uiGmapDrawFreeHandChildModel', 'uiGmapLodash', function($log, BaseObject, CtrlHandle, DrawFreeHandChildModel, uiGmapLodash) {
      var FreeDrawPolygons;
      return FreeDrawPolygons = (function(_super) {
        __extends(FreeDrawPolygons, _super);

        function FreeDrawPolygons() {
          this.link = __bind(this.link, this);
          return FreeDrawPolygons.__super__.constructor.apply(this, arguments);
        }

        FreeDrawPolygons.include(CtrlHandle);

        FreeDrawPolygons.prototype.restrict = 'EMA';

        FreeDrawPolygons.prototype.replace = true;

        FreeDrawPolygons.prototype.require = '^' + 'uiGmapGoogleMap';

        FreeDrawPolygons.prototype.scope = {
          polygons: '=',
          draw: '=',
          revertmapoptions: '='
        };

        FreeDrawPolygons.prototype.link = function(scope, element, attrs, ctrl) {
          return this.mapPromise(scope, ctrl).then((function(_this) {
            return function(map) {
              var freeHand, listener;
              if (!scope.polygons) {
                return $log.error('No polygons to bind to!');
              }
              if (!_.isArray(scope.polygons)) {
                return $log.error('Free Draw Polygons must be of type Array!');
              }
              freeHand = new DrawFreeHandChildModel(map, scope.revertmapoptions);
              listener = void 0;
              return scope.draw = function() {
                if (typeof listener === "function") {
                  listener();
                }
                return freeHand.engage(scope.polygons).then(function() {
                  var firstTime;
                  firstTime = true;
                  return listener = scope.$watchCollection('polygons', function(newValue, oldValue) {
                    var removals;
                    if (firstTime || newValue === oldValue) {
                      firstTime = false;
                      return;
                    }
                    removals = uiGmapLodash.differenceObjects(oldValue, newValue);
                    return removals.forEach(function(p) {
                      return p.setMap(null);
                    });
                  });
                });
              };
            };
          })(this));
        };

        return FreeDrawPolygons;

      })(BaseObject);
    }
  ]);

}).call(this);
;(function() {
  angular.module("uiGmapgoogle-maps.directives.api").service("uiGmapICircle", [
    function() {
      var DEFAULTS;
      DEFAULTS = {};
      return {
        restrict: "EA",
        replace: true,
        require: '^' + 'uiGmapGoogleMap',
        scope: {
          center: "=center",
          radius: "=radius",
          stroke: "=stroke",
          fill: "=fill",
          clickable: "=",
          draggable: "=",
          editable: "=",
          geodesic: "=",
          icons: "=icons",
          visible: "=",
          events: "="
        }
      };
    }
  ]);

}).call(this);
;
/*
 - interface for all controls to derive from
 - to enforce a minimum set of requirements
	- attributes
		- template
		- position
		- controller
		- index
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIControl", [
    "uiGmapBaseObject", "uiGmapLogger", "uiGmapCtrlHandle", function(BaseObject, Logger, CtrlHandle) {
      var IControl;
      return IControl = (function(_super) {
        __extends(IControl, _super);

        IControl.extend(CtrlHandle);

        function IControl() {
          this.restrict = 'EA';
          this.replace = true;
          this.require = '^' + 'uiGmapGoogleMap';
          this.scope = {
            template: '@template',
            position: '@position',
            controller: '@controller',
            index: '@index'
          };
          this.$log = Logger;
        }

        IControl.prototype.link = function(scope, element, attrs, ctrl) {
          throw new Exception("Not implemented!!");
        };

        return IControl;

      })(BaseObject);
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api').service('uiGmapIDrawingManager', [
    function() {
      return {
        restrict: 'EA',
        replace: true,
        require: '^' + 'uiGmapGoogleMap',
        scope: {
          "static": '@',
          control: '=',
          options: '=',
          events: '='
        }
      };
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapIMarker', [
    'uiGmapBaseObject', 'uiGmapCtrlHandle', function(BaseObject, CtrlHandle) {
      var IMarker;
      return IMarker = (function(_super) {
        __extends(IMarker, _super);

        IMarker.scope = {
          coords: '=coords',
          icon: '=icon',
          click: '&click',
          options: '=options',
          events: '=events',
          fit: '=fit',
          idKey: '=idkey',
          control: '=control'
        };

        IMarker.scopeKeys = _.keys(IMarker.scope);

        IMarker.keys = IMarker.scopeKeys;

        IMarker.extend(CtrlHandle);

        function IMarker() {
          this.restrict = 'EMA';
          this.require = '^' + 'uiGmapGoogleMap';
          this.priority = -1;
          this.transclude = true;
          this.replace = true;
          this.scope = _.extend(this.scope || {}, IMarker.scope);
        }

        return IMarker;

      })(BaseObject);
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapIPolygon', [
    'uiGmapGmapUtil', 'uiGmapBaseObject', 'uiGmapLogger', 'uiGmapCtrlHandle', function(GmapUtil, BaseObject, Logger, CtrlHandle) {
      var IPolygon;
      return IPolygon = (function(_super) {
        __extends(IPolygon, _super);

        IPolygon.scope = {
          path: '=path',
          stroke: '=stroke',
          clickable: '=',
          draggable: '=',
          editable: '=',
          geodesic: '=',
          fill: '=',
          icons: '=icons',
          visible: '=',
          "static": '=',
          events: '=',
          zIndex: '=zindex',
          fit: '=',
          control: '=control'
        };

        IPolygon.scopeKeys = _.keys(IPolygon.scope);

        IPolygon.include(GmapUtil);

        IPolygon.extend(CtrlHandle);

        function IPolygon() {}

        IPolygon.prototype.restrict = 'EMA';

        IPolygon.prototype.replace = true;

        IPolygon.prototype.require = '^' + 'uiGmapGoogleMap';

        IPolygon.prototype.scope = IPolygon.scope;

        IPolygon.prototype.DEFAULTS = {};

        IPolygon.prototype.$log = Logger;

        return IPolygon;

      })(BaseObject);
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapIPolyline', [
    'uiGmapGmapUtil', 'uiGmapBaseObject', 'uiGmapLogger', 'uiGmapCtrlHandle', function(GmapUtil, BaseObject, Logger, CtrlHandle) {
      var IPolyline;
      return IPolyline = (function(_super) {
        __extends(IPolyline, _super);

        IPolyline.scope = {
          path: '=',
          stroke: '=',
          clickable: '=',
          draggable: '=',
          editable: '=',
          geodesic: '=',
          icons: '=',
          visible: '=',
          "static": '=',
          fit: '=',
          events: '='
        };

        IPolyline.scopeKeys = _.keys(IPolyline.scope);

        IPolyline.include(GmapUtil);

        IPolyline.extend(CtrlHandle);

        function IPolyline() {}

        IPolyline.prototype.restrict = 'EMA';

        IPolyline.prototype.replace = true;

        IPolyline.prototype.require = '^' + 'uiGmapGoogleMap';

        IPolyline.prototype.scope = IPolyline.scope;

        IPolyline.prototype.DEFAULTS = {};

        IPolyline.prototype.$log = Logger;

        return IPolyline;

      })(BaseObject);
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api').service('uiGmapIRectangle', [
    function() {
      'use strict';
      var DEFAULTS;
      DEFAULTS = {};
      return {
        restrict: 'EMA',
        require: '^' + 'uiGmapGoogleMap',
        replace: true,
        scope: {
          bounds: '=',
          stroke: '=',
          clickable: '=',
          draggable: '=',
          editable: '=',
          fill: '=',
          visible: '=',
          events: '='
        }
      };
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapIWindow', [
    'uiGmapBaseObject', 'uiGmapChildEvents', 'uiGmapCtrlHandle', function(BaseObject, ChildEvents, CtrlHandle) {
      var IWindow;
      return IWindow = (function(_super) {
        __extends(IWindow, _super);

        IWindow.scope = {
          coords: '=coords',
          template: '=template',
          templateUrl: '=templateurl',
          templateParameter: '=templateparameter',
          isIconVisibleOnClick: '=isiconvisibleonclick',
          closeClick: '&closeclick',
          options: '=options',
          control: '=control',
          show: '=show'
        };

        IWindow.scopeKeys = _.keys(IWindow.scope);

        IWindow.include(ChildEvents);

        IWindow.extend(CtrlHandle);

        function IWindow() {
          this.restrict = 'EMA';
          this.template = void 0;
          this.transclude = true;
          this.priority = -100;
          this.require = '^' + 'uiGmapGoogleMap';
          this.replace = true;
          this.scope = _.extend(this.scope || {}, IWindow.scope);
        }

        return IWindow;

      })(BaseObject);
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapMap', [
    '$timeout', '$q', 'uiGmapLogger', 'uiGmapGmapUtil', 'uiGmapBaseObject', 'uiGmapCtrlHandle', 'uiGmapIsReady', 'uiGmapuuid', 'uiGmapExtendGWin', 'uiGmapExtendMarkerClusterer', 'uiGmapGoogleMapsUtilV3', 'uiGmapGoogleMapApi', 'uiGmapEventsHelper', function($timeout, $q, $log, GmapUtil, BaseObject, CtrlHandle, IsReady, uuid, ExtendGWin, ExtendMarkerClusterer, GoogleMapsUtilV3, GoogleMapApi, EventsHelper) {
      'use strict';
      var DEFAULTS, Map, initializeItems;
      DEFAULTS = void 0;
      initializeItems = [GoogleMapsUtilV3, ExtendGWin, ExtendMarkerClusterer];
      return Map = (function(_super) {
        __extends(Map, _super);

        Map.include(GmapUtil);

        function Map() {
          this.link = __bind(this.link, this);
          var ctrlFn, self;
          ctrlFn = function($scope) {
            var ctrlObj, retCtrl;
            retCtrl = void 0;
            $scope.$on('$destroy', function() {
              return IsReady.reset();
            });
            ctrlObj = CtrlHandle.handle($scope);
            $scope.ctrlType = 'Map';
            $scope.deferred.promise.then(function() {
              return initializeItems.forEach(function(i) {
                return i.init();
              });
            });
            ctrlObj.getMap = function() {
              return $scope.map;
            };
            retCtrl = _.extend(this, ctrlObj);
            return retCtrl;
          };
          this.controller = ['$scope', ctrlFn];
          self = this;
        }

        Map.prototype.restrict = 'EMA';

        Map.prototype.transclude = true;

        Map.prototype.replace = false;

        Map.prototype.template = '<div class="angular-google-map"><div class="angular-google-map-container"></div><div ng-transclude style="display: none"></div></div>';

        Map.prototype.scope = {
          center: '=',
          zoom: '=',
          dragging: '=',
          control: '=',
          options: '=',
          events: '=',
          eventOpts: '=',
          styles: '=',
          bounds: '=',
          update: '='
        };

        Map.prototype.link = function(scope, element, attrs) {
          var listeners, unbindCenterWatch;
          listeners = [];
          scope.$on('$destroy', function() {
            return EventsHelper.removeEvents(listeners);
          });
          scope.idleAndZoomChanged = false;
          if (scope.center == null) {
            unbindCenterWatch = scope.$watch('center', (function(_this) {
              return function() {
                if (!scope.center) {
                  return;
                }
                unbindCenterWatch();
                return _this.link(scope, element, attrs);
              };
            })(this));
            return;
          }
          return GoogleMapApi.then((function(_this) {
            return function(maps) {
              var customListeners, disabledEvents, dragging, el, eventName, getEventHandler, mapOptions, maybeHookToEvent, opts, resolveSpawned, settingFromDirective, spawned, type, updateCenter, zoomPromise, _gMap, _ref;
              DEFAULTS = {
                mapTypeId: maps.MapTypeId.ROADMAP
              };
              spawned = IsReady.spawn();
              resolveSpawned = function() {
                return spawned.deferred.resolve({
                  instance: spawned.instance,
                  map: _gMap
                });
              };
              if (!_this.validateCoords(scope.center)) {
                $log.error('angular-google-maps: could not find a valid center property');
                return;
              }
              if (!angular.isDefined(scope.zoom)) {
                $log.error('angular-google-maps: map zoom property not set');
                return;
              }
              el = angular.element(element);
              el.addClass('angular-google-map');
              opts = {
                options: {}
              };
              if (attrs.options) {
                opts.options = scope.options;
              }
              if (attrs.styles) {
                opts.styles = scope.styles;
              }
              if (attrs.type) {
                type = attrs.type.toUpperCase();
                if (google.maps.MapTypeId.hasOwnProperty(type)) {
                  opts.mapTypeId = google.maps.MapTypeId[attrs.type.toUpperCase()];
                } else {
                  $log.error("angular-google-maps: invalid map type '" + attrs.type + "'");
                }
              }
              mapOptions = angular.extend({}, DEFAULTS, opts, {
                center: _this.getCoords(scope.center),
                zoom: scope.zoom,
                bounds: scope.bounds
              });
              _gMap = new google.maps.Map(el.find('div')[1], mapOptions);
              _gMap['uiGmap_id'] = uuid.generate();
              dragging = false;
              listeners.push(google.maps.event.addListenerOnce(_gMap, 'idle', function() {
                scope.deferred.resolve(_gMap);
                return resolveSpawned();
              }));
              disabledEvents = attrs.events && (((_ref = scope.events) != null ? _ref.blacklist : void 0) != null) ? scope.events.blacklist : [];
              if (_.isString(disabledEvents)) {
                disabledEvents = [disabledEvents];
              }
              maybeHookToEvent = function(eventName, fn, prefn) {
                if (!_.contains(disabledEvents, eventName)) {
                  if (prefn) {
                    prefn();
                  }
                  return listeners.push(google.maps.event.addListener(_gMap, eventName, function() {
                    var _ref1;
                    if (!((_ref1 = scope.update) != null ? _ref1.lazy : void 0)) {
                      return fn();
                    }
                  }));
                }
              };
              if (!_.contains(disabledEvents, 'all')) {
                maybeHookToEvent('dragstart', function() {
                  dragging = true;
                  return scope.$evalAsync(function(s) {
                    if (s.dragging != null) {
                      return s.dragging = dragging;
                    }
                  });
                });
                maybeHookToEvent('dragend', function() {
                  dragging = false;
                  return scope.$evalAsync(function(s) {
                    if (s.dragging != null) {
                      return s.dragging = dragging;
                    }
                  });
                });
                updateCenter = function(c, s) {
                  if (c == null) {
                    c = _gMap.center;
                  }
                  if (s == null) {
                    s = scope;
                  }
                  if (_.contains(disabledEvents, 'center')) {
                    return;
                  }
                  if (angular.isDefined(s.center.type)) {
                    if (s.center.coordinates[1] !== c.lat()) {
                      s.center.coordinates[1] = c.lat();
                    }
                    if (s.center.coordinates[0] !== c.lng()) {
                      return s.center.coordinates[0] = c.lng();
                    }
                  } else {
                    if (s.center.latitude !== c.lat()) {
                      s.center.latitude = c.lat();
                    }
                    if (s.center.longitude !== c.lng()) {
                      return s.center.longitude = c.lng();
                    }
                  }
                };
                settingFromDirective = false;
                maybeHookToEvent('idle', function() {
                  var b, ne, sw;
                  b = _gMap.getBounds();
                  ne = b.getNorthEast();
                  sw = b.getSouthWest();
                  settingFromDirective = true;
                  return scope.$evalAsync(function(s) {
                    updateCenter();
                    if (s.bounds !== null && s.bounds !== undefined && s.bounds !== void 0 && !_.contains(disabledEvents, 'bounds')) {
                      s.bounds.northeast = {
                        latitude: ne.lat(),
                        longitude: ne.lng()
                      };
                      s.bounds.southwest = {
                        latitude: sw.lat(),
                        longitude: sw.lng()
                      };
                    }
                    if (!_.contains(disabledEvents, 'zoom')) {
                      s.zoom = _gMap.zoom;
                      scope.idleAndZoomChanged = !scope.idleAndZoomChanged;
                    }
                    return settingFromDirective = false;
                  });
                });
              }
              if (angular.isDefined(scope.events) && scope.events !== null && angular.isObject(scope.events)) {
                getEventHandler = function(eventName) {
                  return function() {
                    return scope.events[eventName].apply(scope, [_gMap, eventName, arguments]);
                  };
                };
                customListeners = [];
                for (eventName in scope.events) {
                  if (scope.events.hasOwnProperty(eventName) && angular.isFunction(scope.events[eventName])) {
                    customListeners.push(google.maps.event.addListener(_gMap, eventName, getEventHandler(eventName)));
                  }
                }
                listeners.concat(customListeners);
              }
              _gMap.getOptions = function() {
                return mapOptions;
              };
              scope.map = _gMap;
              if ((attrs.control != null) && (scope.control != null)) {
                scope.control.refresh = function(maybeCoords) {
                  var coords, _ref1, _ref2;
                  if (_gMap == null) {
                    return;
                  }
                  if (((typeof google !== "undefined" && google !== null ? (_ref1 = google.maps) != null ? (_ref2 = _ref1.event) != null ? _ref2.trigger : void 0 : void 0 : void 0) != null) && (_gMap != null)) {
                    google.maps.event.trigger(_gMap, 'resize');
                  }
                  if (((maybeCoords != null ? maybeCoords.latitude : void 0) != null) && ((maybeCoords != null ? maybeCoords.longitude : void 0) != null)) {
                    coords = _this.getCoords(maybeCoords);
                    if (_this.isTrue(attrs.pan)) {
                      return _gMap.panTo(coords);
                    } else {
                      return _gMap.setCenter(coords);
                    }
                  }
                };
                scope.control.getGMap = function() {
                  return _gMap;
                };
                scope.control.getMapOptions = function() {
                  return mapOptions;
                };
                scope.control.getCustomEventListeners = function() {
                  return customListeners;
                };
                scope.control.removeEvents = function(yourListeners) {
                  return EventsHelper.removeEvents(yourListeners);
                };
              }
              scope.$watch('center', function(newValue, oldValue) {
                var coords, settingCenterFromScope;
                if (newValue === oldValue || settingFromDirective) {
                  return;
                }
                coords = _this.getCoords(scope.center);
                if (coords.lat() === _gMap.center.lat() && coords.lng() === _gMap.center.lng()) {
                  return;
                }
                settingCenterFromScope = true;
                if (!dragging) {
                  if (!_this.validateCoords(newValue)) {
                    $log.error("Invalid center for newValue: " + (JSON.stringify(newValue)));
                  }
                  if (_this.isTrue(attrs.pan) && scope.zoom === _gMap.zoom) {
                    _gMap.panTo(coords);
                  } else {
                    _gMap.setCenter(coords);
                  }
                }
                return settingCenterFromScope = false;
              }, true);
              zoomPromise = null;
              scope.$watch('zoom', function(newValue, oldValue) {
                var settingZoomFromScope, _ref1, _ref2;
                if (newValue == null) {
                  return;
                }
                if (_.isEqual(newValue, oldValue) || (_gMap != null ? _gMap.getZoom() : void 0) === (scope != null ? scope.zoom : void 0) || settingFromDirective) {
                  return;
                }
                settingZoomFromScope = true;
                if (zoomPromise != null) {
                  $timeout.cancel(zoomPromise);
                }
                return zoomPromise = $timeout(function() {
                  _gMap.setZoom(newValue);
                  return settingZoomFromScope = false;
                }, ((_ref1 = scope.eventOpts) != null ? (_ref2 = _ref1.debounce) != null ? _ref2.zoomMs : void 0 : void 0) + 20, false);
              });
              scope.$watch('bounds', function(newValue, oldValue) {
                var bounds, ne, sw, _ref1, _ref2, _ref3, _ref4;
                if (newValue === oldValue) {
                  return;
                }
                if (((newValue != null ? (_ref1 = newValue.northeast) != null ? _ref1.latitude : void 0 : void 0) == null) || ((newValue != null ? (_ref2 = newValue.northeast) != null ? _ref2.longitude : void 0 : void 0) == null) || ((newValue != null ? (_ref3 = newValue.southwest) != null ? _ref3.latitude : void 0 : void 0) == null) || ((newValue != null ? (_ref4 = newValue.southwest) != null ? _ref4.longitude : void 0 : void 0) == null)) {
                  $log.error("Invalid map bounds for new value: " + (JSON.stringify(newValue)));
                  return;
                }
                ne = new google.maps.LatLng(newValue.northeast.latitude, newValue.northeast.longitude);
                sw = new google.maps.LatLng(newValue.southwest.latitude, newValue.southwest.longitude);
                bounds = new google.maps.LatLngBounds(sw, ne);
                return _gMap.fitBounds(bounds);
              });
              return ['options', 'styles'].forEach(function(toWatch) {
                return scope.$watch(toWatch, function(newValue, oldValue) {
                  var watchItem;
                  watchItem = this.exp;
                  if (_.isEqual(newValue, oldValue)) {
                    return;
                  }
                  if (watchItem === 'options') {
                    opts.options = newValue;
                  } else {
                    opts.options[watchItem] = newValue;
                  }
                  if (_gMap != null) {
                    return _gMap.setOptions(opts);
                  }
                }, true);
              });
            };
          })(this));
        };

        return Map;

      })(BaseObject);
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarker", [
    "uiGmapIMarker", "uiGmapMarkerChildModel", "uiGmapMarkerManager", "uiGmapLogger", function(IMarker, MarkerChildModel, MarkerManager, $log) {
      var Marker;
      return Marker = (function(_super) {
        __extends(Marker, _super);

        function Marker() {
          this.link = __bind(this.link, this);
          Marker.__super__.constructor.call(this);
          this.template = '<span class="angular-google-map-marker" ng-transclude></span>';
          $log.info(this);
        }

        Marker.prototype.controller = [
          '$scope', '$element', function($scope, $element) {
            $scope.ctrlType = 'Marker';
            return _.extend(this, IMarker.handle($scope, $element));
          }
        ];

        Marker.prototype.link = function(scope, element, attrs, ctrl) {
          var mapPromise;
          mapPromise = IMarker.mapPromise(scope, ctrl);
          mapPromise.then((function(_this) {
            return function(map) {
              var doClick, doDrawSelf, gManager, keys, m, trackModel;
              gManager = new MarkerManager(map);
              keys = _.object(IMarker.keys, IMarker.keys);
              m = new MarkerChildModel(scope, scope, keys, map, {}, doClick = true, gManager, doDrawSelf = false, trackModel = false);
              m.deferred.promise.then(function(gMarker) {
                return scope.deferred.resolve(gMarker);
              });
              if (scope.control != null) {
                return scope.control.getGMarkers = gManager.getGMarkers;
              }
            };
          })(this));
          return scope.$on('$destroy', (function(_this) {
            return function() {
              var gManager;
              if (typeof gManager !== "undefined" && gManager !== null) {
                gManager.clear();
              }
              return gManager = null;
            };
          })(this));
        };

        return Marker;

      })(IMarker);
    }
  ]);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarkers", [
    "uiGmapIMarker", "uiGmapPlural", "uiGmapMarkersParentModel", "uiGmap_sync", "uiGmapLogger", function(IMarker, Plural, MarkersParentModel, _sync, $log) {
      var Markers;
      return Markers = (function(_super) {
        __extends(Markers, _super);

        function Markers() {
          Markers.__super__.constructor.call(this);
          this.template = '<span class="angular-google-map-markers" ng-transclude></span>';
          Plural.extend(this, {
            doCluster: '=docluster',
            clusterOptions: '=clusteroptions',
            clusterEvents: '=clusterevents',
            modelsByRef: '=modelsbyref'
          });
          $log.info(this);
        }

        Markers.prototype.controller = [
          '$scope', '$element', function($scope, $element) {
            $scope.ctrlType = 'Markers';
            return _.extend(this, IMarker.handle($scope, $element));
          }
        ];

        Markers.prototype.link = function(scope, element, attrs, ctrl) {
          var parentModel, ready;
          parentModel = void 0;
          ready = function() {
            return scope.deferred.resolve();
          };
          return IMarker.mapPromise(scope, ctrl).then(function(map) {
            var mapScope;
            mapScope = ctrl.getScope();
            mapScope.$watch('idleAndZoomChanged', function() {
              return _.defer(parentModel.gManager.draw);
            });
            parentModel = new MarkersParentModel(scope, element, attrs, map);
            Plural.link(scope, parentModel);
            if (scope.control != null) {
              scope.control.getGMarkers = function() {
                var _ref;
                return (_ref = parentModel.gManager) != null ? _ref.getGMarkers() : void 0;
              };
              scope.control.getChildMarkers = function() {
                return parentModel.plurals;
              };
            }
            return _.last(parentModel.existingPieces._content).then(function() {
              return ready();
            });
          });
        };

        return Markers;

      })(IMarker);
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api').service('uiGmapPlural', [
    function() {
      var _initControl;
      _initControl = function(scope, parent) {
        if (scope.control == null) {
          return;
        }
        scope.control.updateModels = function(models) {
          scope.models = models;
          return parent.createChildScopes(false);
        };
        scope.control.newModels = function(models) {
          scope.models = models;
          return parent.rebuildAll(scope, true, true);
        };
        scope.control.clean = function() {
          return parent.rebuildAll(scope, false, true);
        };
        scope.control.getPlurals = function() {
          return parent.plurals;
        };
        scope.control.getManager = function() {
          return parent.gManager;
        };
        scope.control.hasManager = function() {
          return (parent.gManager != null) === true;
        };
        return scope.control.managerDraw = function() {
          var _ref;
          if (scope.control.hasManager()) {
            return (_ref = scope.control.getManager()) != null ? _ref.draw() : void 0;
          }
        };
      };
      return {
        extend: function(obj, obj2) {
          return _.extend(obj.scope || {}, obj2 || {}, {
            idKey: '=idkey',
            doRebuildAll: '=dorebuildall',
            models: '=models',
            chunk: '=chunk',
            cleanchunk: '=cleanchunk',
            control: '=control'
          });
        },
        link: function(scope, parent) {
          return _initControl(scope, parent);
        }
      };
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapPolygon', [
    'uiGmapIPolygon', '$timeout', 'uiGmaparray-sync', 'uiGmapPolygonChildModel', function(IPolygon, $timeout, arraySync, PolygonChild) {
      var Polygon;
      return Polygon = (function(_super) {
        __extends(Polygon, _super);

        function Polygon() {
          this.link = __bind(this.link, this);
          return Polygon.__super__.constructor.apply(this, arguments);
        }

        Polygon.prototype.link = function(scope, element, attrs, mapCtrl) {
          var children, promise;
          children = [];
          promise = IPolygon.mapPromise(scope, mapCtrl);
          if (scope.control != null) {
            scope.control.getInstance = this;
            scope.control.polygons = children;
            scope.control.promise = promise;
          }
          return promise.then((function(_this) {
            return function(map) {
              return children.push(new PolygonChild(scope, attrs, map, _this.DEFAULTS));
            };
          })(this));
        };

        return Polygon;

      })(IPolygon);
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapPolygons', [
    'uiGmapIPolygon', '$timeout', 'uiGmaparray-sync', 'uiGmapPolygonsParentModel', 'uiGmapPlural', function(Interface, $timeout, arraySync, ParentModel, Plural) {
      var Polygons;
      return Polygons = (function(_super) {
        __extends(Polygons, _super);

        function Polygons() {
          this.link = __bind(this.link, this);
          Polygons.__super__.constructor.call(this);
          Plural.extend(this);
          this.$log.info(this);
        }

        Polygons.prototype.link = function(scope, element, attrs, mapCtrl) {
          return mapCtrl.getScope().deferred.promise.then((function(_this) {
            return function(map) {
              if (angular.isUndefined(scope.path) || scope.path === null) {
                _this.$log.warn('polygons: no valid path attribute found');
              }
              if (!scope.models) {
                _this.$log.warn('polygons: no models found to create from');
              }
              return Plural.link(scope, new ParentModel(scope, element, attrs, map, _this.DEFAULTS));
            };
          })(this));
        };

        return Polygons;

      })(Interface);
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapPolyline', [
    'uiGmapIPolyline', '$timeout', 'uiGmaparray-sync', 'uiGmapPolylineChildModel', function(IPolyline, $timeout, arraySync, PolylineChildModel) {
      var Polyline;
      return Polyline = (function(_super) {
        __extends(Polyline, _super);

        function Polyline() {
          this.link = __bind(this.link, this);
          return Polyline.__super__.constructor.apply(this, arguments);
        }

        Polyline.prototype.link = function(scope, element, attrs, mapCtrl) {
          return IPolyline.mapPromise(scope, mapCtrl).then((function(_this) {
            return function(map) {
              if (angular.isUndefined(scope.path) || scope.path === null || !_this.validatePath(scope.path)) {
                _this.$log.warn('polyline: no valid path attribute found');
              }
              return new PolylineChildModel(scope, attrs, map, _this.DEFAULTS);
            };
          })(this));
        };

        return Polyline;

      })(IPolyline);
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapPolylines', [
    'uiGmapIPolyline', '$timeout', 'uiGmaparray-sync', 'uiGmapPolylinesParentModel', 'uiGmapPlural', function(IPolyline, $timeout, arraySync, PolylinesParentModel, Plural) {
      var Polylines;
      return Polylines = (function(_super) {
        __extends(Polylines, _super);

        function Polylines() {
          this.link = __bind(this.link, this);
          Polylines.__super__.constructor.call(this);
          Plural.extend(this);
          this.$log.info(this);
        }

        Polylines.prototype.link = function(scope, element, attrs, mapCtrl) {
          return mapCtrl.getScope().deferred.promise.then((function(_this) {
            return function(map) {
              if (angular.isUndefined(scope.path) || scope.path === null) {
                _this.$log.warn('polylines: no valid path attribute found');
              }
              if (!scope.models) {
                _this.$log.warn('polylines: no models found to create from');
              }
              return Plural.link(scope, new PolylinesParentModel(scope, element, attrs, map, _this.DEFAULTS));
            };
          })(this));
        };

        return Polylines;

      })(IPolyline);
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapRectangle', [
    'uiGmapLogger', 'uiGmapGmapUtil', 'uiGmapIRectangle', 'uiGmapRectangleParentModel', function($log, GmapUtil, IRectangle, RectangleParentModel) {
      return _.extend(IRectangle, {
        link: function(scope, element, attrs, mapCtrl) {
          return mapCtrl.getScope().deferred.promise.then((function(_this) {
            return function(map) {
              return new RectangleParentModel(scope, element, attrs, map);
            };
          })(this));
        }
      });
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapWindow', [
    'uiGmapIWindow', 'uiGmapGmapUtil', 'uiGmapWindowChildModel', 'uiGmapLodash', 'uiGmapLogger', function(IWindow, GmapUtil, WindowChildModel, uiGmapLodash, $log) {
      var Window;
      return Window = (function(_super) {
        __extends(Window, _super);

        Window.include(GmapUtil);

        function Window() {
          this.link = __bind(this.link, this);
          Window.__super__.constructor.call(this);
          this.require = ['^' + 'uiGmapGoogleMap', '^?' + 'uiGmapMarker'];
          this.template = '<span class="angular-google-maps-window" ng-transclude></span>';
          $log.debug(this);
          this.childWindows = [];
        }

        Window.prototype.link = function(scope, element, attrs, ctrls) {
          var markerCtrl, markerScope;
          markerCtrl = ctrls.length > 1 && (ctrls[1] != null) ? ctrls[1] : void 0;
          markerScope = markerCtrl != null ? markerCtrl.getScope() : void 0;
          this.mapPromise = IWindow.mapPromise(scope, ctrls[0]);
          return this.mapPromise.then((function(_this) {
            return function(mapCtrl) {
              var isIconVisibleOnClick;
              isIconVisibleOnClick = true;
              if (angular.isDefined(attrs.isiconvisibleonclick)) {
                isIconVisibleOnClick = scope.isIconVisibleOnClick;
              }
              if (!markerCtrl) {
                _this.init(scope, element, isIconVisibleOnClick, mapCtrl);
                return;
              }
              return markerScope.deferred.promise.then(function(gMarker) {
                return _this.init(scope, element, isIconVisibleOnClick, mapCtrl, markerScope);
              });
            };
          })(this));
        };

        Window.prototype.init = function(scope, element, isIconVisibleOnClick, mapCtrl, markerScope) {
          var childWindow, defaults, gMarker, hasScopeCoords, opts;
          defaults = scope.options != null ? scope.options : {};
          hasScopeCoords = (scope != null) && this.validateCoords(scope.coords);
          if ((markerScope != null ? markerScope['getGMarker'] : void 0) != null) {
            gMarker = markerScope.getGMarker();
          }
          opts = hasScopeCoords ? this.createWindowOptions(gMarker, scope, element.html(), defaults) : defaults;
          if (mapCtrl != null) {
            childWindow = new WindowChildModel({}, scope, opts, isIconVisibleOnClick, mapCtrl, markerScope, element);
            this.childWindows.push(childWindow);
            scope.$on('$destroy', (function(_this) {
              return function() {
                _this.childWindows = uiGmapLodash.withoutObjects(_this.childWindows, [childWindow], function(child1, child2) {
                  return child1.scope.$id === child2.scope.$id;
                });
                return _this.childWindows.length = 0;
              };
            })(this));
          }
          if (scope.control != null) {
            scope.control.getGWindows = (function(_this) {
              return function() {
                return _this.childWindows.map(function(child) {
                  return child.gObject;
                });
              };
            })(this);
            scope.control.getChildWindows = (function(_this) {
              return function() {
                return _this.childWindows;
              };
            })(this);
            scope.control.getPlurals = scope.control.getChildWindows;
            scope.control.showWindow = (function(_this) {
              return function() {
                return _this.childWindows.map(function(child) {
                  return child.showWindow();
                });
              };
            })(this);
            scope.control.hideWindow = (function(_this) {
              return function() {
                return _this.childWindows.map(function(child) {
                  return child.hideWindow();
                });
              };
            })(this);
          }
          if ((this.onChildCreation != null) && (childWindow != null)) {
            return this.onChildCreation(childWindow);
          }
        };

        return Window;

      })(IWindow);
    }
  ]);

}).call(this);
;(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapWindows', [
    'uiGmapIWindow', 'uiGmapPlural', 'uiGmapWindowsParentModel', 'uiGmapPromise', 'uiGmapLogger', function(IWindow, Plural, WindowsParentModel, uiGmapPromise, $log) {

      /*
      Windows directive where many windows map to the models property
       */
      var Windows;
      return Windows = (function(_super) {
        __extends(Windows, _super);

        function Windows() {
          this.init = __bind(this.init, this);
          this.link = __bind(this.link, this);
          Windows.__super__.constructor.call(this);
          this.require = ['^' + 'uiGmapGoogleMap', '^?' + 'uiGmapMarkers'];
          this.template = '<span class="angular-google-maps-windows" ng-transclude></span>';
          Plural.extend(this);
          $log.debug(this);
        }

        Windows.prototype.link = function(scope, element, attrs, ctrls) {
          var mapScope, markerCtrl, markerScope;
          mapScope = ctrls[0].getScope();
          markerCtrl = ctrls.length > 1 && (ctrls[1] != null) ? ctrls[1] : void 0;
          markerScope = markerCtrl != null ? markerCtrl.getScope() : void 0;
          return mapScope.deferred.promise.then((function(_this) {
            return function(map) {
              var promise, _ref;
              promise = (markerScope != null ? (_ref = markerScope.deferred) != null ? _ref.promise : void 0 : void 0) || uiGmapPromise.resolve();
              return promise.then(function() {
                var pieces, _ref1;
                pieces = (_ref1 = _this.parentModel) != null ? _ref1.existingPieces : void 0;
                if (pieces) {
                  return pieces.then(function() {
                    return _this.init(scope, element, attrs, ctrls, map, markerScope);
                  });
                } else {
                  return _this.init(scope, element, attrs, ctrls, map, markerScope);
                }
              });
            };
          })(this));
        };

        Windows.prototype.init = function(scope, element, attrs, ctrls, map, additionalScope) {
          var parentModel;
          parentModel = new WindowsParentModel(scope, element, attrs, ctrls, map, additionalScope);
          Plural.link(scope, parentModel);
          if (scope.control != null) {
            scope.control.getGWindows = (function(_this) {
              return function() {
                return parentModel.plurals.map(function(child) {
                  return child.gObject;
                });
              };
            })(this);
            return scope.control.getChildWindows = (function(_this) {
              return function() {
                return parentModel.plurals;
              };
            })(this);
          }
        };

        return Windows;

      })(IWindow);
    }
  ]);

}).call(this);
;
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Nick Baugh - https://github.com/niftylettuce
 */

(function() {
  angular.module("uiGmapgoogle-maps").directive("uiGmapGoogleMap", [
    "uiGmapMap", function(Map) {
      return new Map();
    }
  ]);

}).call(this);
;
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
 */


/*
Map marker directive

This directive is used to create a marker on an existing map.
This directive creates a new scope.

{attribute coords required}  object containing latitude and longitude properties
{attribute icon optional}    string url to image used for marker icon
{attribute animate optional} if set to false, the marker won't be animated (on by default)
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapMarker', [
    '$timeout', 'uiGmapMarker', function($timeout, Marker) {
      return new Marker($timeout);
    }
  ]);

}).call(this);
;
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
 */


/*
Map marker directive

This directive is used to create a marker on an existing map.
This directive creates a new scope.

{attribute coords required}  object containing latitude and longitude properties
{attribute icon optional}    string url to image used for marker icon
{attribute animate optional} if set to false, the marker won't be animated (on by default)
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapMarkers', [
    '$timeout', 'uiGmapMarkers', function($timeout, Markers) {
      return new Markers($timeout);
    }
  ]);

}).call(this);
;
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Rick Huizinga - https://plus.google.com/+RickHuizinga
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapPolygon', [
    'uiGmapPolygon', function(Polygon) {
      return new Polygon();
    }
  ]);

}).call(this);
;
/*
@authors
Julian Popescu - https://github.com/jpopesculian
Rick Huizinga - https://plus.google.com/+RickHuizinga
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive("uiGmapCircle", [
    "uiGmapCircle", function(Circle) {
      return Circle;
    }
  ]);

}).call(this);
;
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
 */

(function() {
  angular.module("uiGmapgoogle-maps").directive("uiGmapPolyline", [
    "uiGmapPolyline", function(Polyline) {
      return new Polyline();
    }
  ]);

}).call(this);
;
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapPolylines', [
    'uiGmapPolylines', function(Polylines) {
      return new Polylines();
    }
  ]);

}).call(this);
;
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Chentsu Lin - https://github.com/ChenTsuLin
 */

(function() {
  angular.module("uiGmapgoogle-maps").directive("uiGmapRectangle", [
    "uiGmapLogger", "uiGmapRectangle", function($log, Rectangle) {
      return Rectangle;
    }
  ]);

}).call(this);
;
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
 */


/*
Map info window directive

This directive is used to create an info window on an existing map.
This directive creates a new scope.

{attribute coords required}  object containing latitude and longitude properties
{attribute show optional}    map will show when this expression returns true
 */

(function() {
  angular.module("uiGmapgoogle-maps").directive("uiGmapWindow", [
    "$timeout", "$compile", "$http", "$templateCache", "uiGmapWindow", function($timeout, $compile, $http, $templateCache, Window) {
      return new Window($timeout, $compile, $http, $templateCache);
    }
  ]);

}).call(this);
;
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
 */


/*
Map info window directive

This directive is used to create an info window on an existing map.
This directive creates a new scope.

{attribute coords required}  object containing latitude and longitude properties
{attribute show optional}    map will show when this expression returns true
 */

(function() {
  angular.module("uiGmapgoogle-maps").directive("uiGmapWindows", [
    "$timeout", "$compile", "$http", "$templateCache", "$interpolate", "uiGmapWindows", function($timeout, $compile, $http, $templateCache, $interpolate, Windows) {
      return new Windows($timeout, $compile, $http, $templateCache, $interpolate);
    }
  ]);

}).call(this);
;
/*
@authors:
- Nicolas Laplante https://plus.google.com/108189012221374960701
- Nicholas McCready - https://twitter.com/nmccready
 */


/*
Map Layer directive

This directive is used to create any type of Layer from the google maps sdk.
This directive creates a new scope.

{attribute show optional}  true (default) shows the trafficlayer otherwise it is hidden
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module('uiGmapgoogle-maps').directive('uiGmapLayer', [
    '$timeout', 'uiGmapLogger', 'uiGmapLayerParentModel', function($timeout, Logger, LayerParentModel) {
      var Layer;
      Layer = (function() {
        function Layer() {
          this.link = __bind(this.link, this);
          this.$log = Logger;
          this.restrict = 'EMA';
          this.require = '^' + 'uiGmapGoogleMap';
          this.priority = -1;
          this.transclude = true;
          this.template = '<span class=\'angular-google-map-layer\' ng-transclude></span>';
          this.replace = true;
          this.scope = {
            show: '=show',
            type: '=type',
            namespace: '=namespace',
            options: '=options',
            onCreated: '&oncreated'
          };
        }

        Layer.prototype.link = function(scope, element, attrs, mapCtrl) {
          return mapCtrl.getScope().deferred.promise.then((function(_this) {
            return function(map) {
              if (scope.onCreated != null) {
                return new LayerParentModel(scope, element, attrs, map, scope.onCreated);
              } else {
                return new LayerParentModel(scope, element, attrs, map);
              }
            };
          })(this));
        };

        return Layer;

      })();
      return new Layer();
    }
  ]);

}).call(this);
;
/*
@authors
Adam Kreitals, kreitals@hotmail.com
 */


/*
mapControl directive

This directive is used to create a custom control element on an existing map.
This directive creates a new scope.

{attribute template required}  	string url of the template to be used for the control
{attribute position optional}  	string position of the control of the form top-left or TOP_LEFT defaults to TOP_CENTER
{attribute controller optional}	string controller to be applied to the template
{attribute index optional}		number index for controlling the order of similarly positioned mapControl elements
 */

(function() {
  angular.module("uiGmapgoogle-maps").directive("uiGmapMapControl", [
    "uiGmapControl", function(Control) {
      return new Control();
    }
  ]);

}).call(this);
;
/*
@authors
Nicholas McCready - https://twitter.com/nmccready
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapDragZoom', [
    'uiGmapDragZoom', function(DragZoom) {
      return DragZoom;
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps').directive("uiGmapDrawingManager", [
    "uiGmapDrawingManager", function(DrawingManager) {
      return DrawingManager;
    }
  ]);

}).call(this);
;
/*
@authors
Nicholas McCready - https://twitter.com/nmccready
 * Brunt of the work is in DrawFreeHandChildModel
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapFreeDrawPolygons', [
    'uiGmapApiFreeDrawPolygons', function(FreeDrawPolygons) {
      return new FreeDrawPolygons();
    }
  ]);

}).call(this);
;
/*
Map Layer directive

This directive is used to create any type of Layer from the google maps sdk.
This directive creates a new scope.

{attribute show optional}  true (default) shows the trafficlayer otherwise it is hidden
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("uiGmapgoogle-maps").directive("uiGmapMapType", [
    "$timeout", "uiGmapLogger", "uiGmapMapTypeParentModel", function($timeout, Logger, MapTypeParentModel) {
      var MapType;
      MapType = (function() {
        function MapType() {
          this.link = __bind(this.link, this);
          this.$log = Logger;
          this.restrict = "EMA";
          this.require = '^' + 'uiGmapGoogleMap';
          this.priority = -1;
          this.transclude = true;
          this.template = '<span class=\"angular-google-map-layer\" ng-transclude></span>';
          this.replace = true;
          this.scope = {
            show: "=show",
            options: '=options',
            refresh: '=refresh',
            id: '@'
          };
        }

        MapType.prototype.link = function(scope, element, attrs, mapCtrl) {
          return mapCtrl.getScope().deferred.promise.then((function(_this) {
            return function(map) {
              return new MapTypeParentModel(scope, element, attrs, map);
            };
          })(this));
        };

        return MapType;

      })();
      return new MapType();
    }
  ]);

}).call(this);
;
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Rick Huizinga - https://plus.google.com/+RickHuizinga
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapPolygons', [
    'uiGmapPolygons', function(Polygons) {
      return new Polygons();
    }
  ]);

}).call(this);
;
/*
@authors:
- Nicolas Laplante https://plus.google.com/108189012221374960701
- Nicholas McCready - https://twitter.com/nmccready
- Carrie Kengle - http://about.me/carrie
 */


/*
Places Search Box directive

This directive is used to create a Places Search Box.
This directive creates a new scope.

{attribute input required}  HTMLInputElement
{attribute options optional} The options that can be set on a SearchBox object (google.maps.places.SearchBoxOptions object specification)
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module('uiGmapgoogle-maps').directive('uiGmapSearchBox', [
    'uiGmapGoogleMapApi', 'uiGmapLogger', 'uiGmapSearchBoxParentModel', '$http', '$templateCache', '$compile', function(GoogleMapApi, Logger, SearchBoxParentModel, $http, $templateCache, $compile) {
      var SearchBox;
      SearchBox = (function() {
        SearchBox.prototype.require = 'ngModel';

        function SearchBox() {
          this.link = __bind(this.link, this);
          this.$log = Logger;
          this.restrict = 'EMA';
          this.require = '^' + 'uiGmapGoogleMap';
          this.priority = -1;
          this.transclude = true;
          this.template = '<span class=\'angular-google-map-search\' ng-transclude></span>';
          this.replace = true;
          this.scope = {
            template: '=template',
            events: '=events',
            position: '=?position',
            options: '=?options',
            parentdiv: '=?parentdiv',
            ngModel: "=?"
          };
        }

        SearchBox.prototype.link = function(scope, element, attrs, mapCtrl) {
          return GoogleMapApi.then((function(_this) {
            return function(maps) {
              return $http.get(scope.template, {
                cache: $templateCache
              }).success(function(template) {
                if (angular.isUndefined(scope.events)) {
                  _this.$log.error('searchBox: the events property is required');
                  return;
                }
                return mapCtrl.getScope().deferred.promise.then(function(map) {
                  var ctrlPosition;
                  ctrlPosition = angular.isDefined(scope.position) ? scope.position.toUpperCase().replace(/-/g, '_') : 'TOP_LEFT';
                  if (!maps.ControlPosition[ctrlPosition]) {
                    _this.$log.error('searchBox: invalid position property');
                    return;
                  }
                  return new SearchBoxParentModel(scope, element, attrs, map, ctrlPosition, $compile(template)(scope));
                });
              });
            };
          })(this));
        };

        return SearchBox;

      })();
      return new SearchBox();
    }
  ]);

}).call(this);
;(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapShow', [
    '$animate', 'uiGmapLogger', function($animate, $log) {
      return {
        scope: {
          'uiGmapShow': '=',
          'uiGmapAfterShow': '&',
          'uiGmapAfterHide': '&'
        },
        link: function(scope, element) {
          var angular_post_1_3_handle, angular_pre_1_3_handle, handle;
          angular_post_1_3_handle = function(animateAction, cb) {
            return $animate[animateAction](element, 'ng-hide').then(function() {
              return cb();
            });
          };
          angular_pre_1_3_handle = function(animateAction, cb) {
            return $animate[animateAction](element, 'ng-hide', cb);
          };
          handle = function(animateAction, cb) {
            if (angular.version.major > 1) {
              return $log.error("uiGmapShow is not supported for Angular Major greater than 1.\nYour Major is " + angular.version.major + "\"");
            }
            if (angular.version.major === 1 && angular.version.minor < 3) {
              return angular_pre_1_3_handle(animateAction, cb);
            }
            return angular_post_1_3_handle(animateAction, cb);
          };
          return scope.$watch('uiGmapShow', function(show) {
            if (show) {
              handle('removeClass', scope.uiGmapAfterShow);
            }
            if (!show) {
              return handle('addClass', scope.uiGmapAfterHide);
            }
          });
        }
      };
    }
  ]);

}).call(this);
;angular.module('uiGmapgoogle-maps.wrapped')
.service('uiGmapuuid', function() {
  //BEGIN REPLACE
  /*
 Version: core-1.0
 The MIT License: Copyright (c) 2012 LiosK.
*/
function UUID(){}UUID.generate=function(){var a=UUID._gri,b=UUID._ha;return b(a(32),8)+"-"+b(a(16),4)+"-"+b(16384|a(12),4)+"-"+b(32768|a(14),4)+"-"+b(a(48),12)};UUID._gri=function(a){return 0>a?NaN:30>=a?0|Math.random()*(1<<a):53>=a?(0|1073741824*Math.random())+1073741824*(0|Math.random()*(1<<a-30)):NaN};UUID._ha=function(a,b){for(var c=a.toString(16),d=b-c.length,e="0";0<d;d>>>=1,e+=e)d&1&&(c=e+c);return c};

  //END REPLACE
return UUID;
});
;// wrap the utility libraries needed in ./lib
// http://google-maps-utility-library-v3.googlecode.com/svn/
angular.module('uiGmapgoogle-maps.wrapped')
.service('uiGmapGoogleMapsUtilV3', function () {
  return {
    init: _.once(function () {
      //BEGIN REPLACE
      /**
 * @name InfoBox
 * @version 1.1.13 [March 19, 2014]
 * @author Gary Little (inspired by proof-of-concept code from Pamela Fox of Google)
 * @copyright Copyright 2010 Gary Little [gary at luxcentral.com]
 * @fileoverview InfoBox extends the Google Maps JavaScript API V3 <tt>OverlayView</tt> class.
 *  <p>
 *  An InfoBox behaves like a <tt>google.maps.InfoWindow</tt>, but it supports several
 *  additional properties for advanced styling. An InfoBox can also be used as a map label.
 *  <p>
 *  An InfoBox also fires the same events as a <tt>google.maps.InfoWindow</tt>.
 */

/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jslint browser:true */
/*global google */

/**
 * @name InfoBoxOptions
 * @class This class represents the optional parameter passed to the {@link InfoBox} constructor.
 * @property {string|Node} content The content of the InfoBox (plain text or an HTML DOM node).
 * @property {boolean} [disableAutoPan=false] Disable auto-pan on <tt>open</tt>.
 * @property {number} maxWidth The maximum width (in pixels) of the InfoBox. Set to 0 if no maximum.
 * @property {Size} pixelOffset The offset (in pixels) from the top left corner of the InfoBox
 *  (or the bottom left corner if the <code>alignBottom</code> property is <code>true</code>)
 *  to the map pixel corresponding to <tt>position</tt>.
 * @property {LatLng} position The geographic location at which to display the InfoBox.
 * @property {number} zIndex The CSS z-index style value for the InfoBox.
 *  Note: This value overrides a zIndex setting specified in the <tt>boxStyle</tt> property.
 * @property {string} [boxClass="infoBox"] The name of the CSS class defining the styles for the InfoBox container.
 * @property {Object} [boxStyle] An object literal whose properties define specific CSS
 *  style values to be applied to the InfoBox. Style values defined here override those that may
 *  be defined in the <code>boxClass</code> style sheet. If this property is changed after the
 *  InfoBox has been created, all previously set styles (except those defined in the style sheet)
 *  are removed from the InfoBox before the new style values are applied.
 * @property {string} closeBoxMargin The CSS margin style value for the close box.
 *  The default is "2px" (a 2-pixel margin on all sides).
 * @property {string} closeBoxURL The URL of the image representing the close box.
 *  Note: The default is the URL for Google's standard close box.
 *  Set this property to "" if no close box is required.
 * @property {Size} infoBoxClearance Minimum offset (in pixels) from the InfoBox to the
 *  map edge after an auto-pan.
 * @property {boolean} [isHidden=false] Hide the InfoBox on <tt>open</tt>.
 *  [Deprecated in favor of the <tt>visible</tt> property.]
 * @property {boolean} [visible=true] Show the InfoBox on <tt>open</tt>.
 * @property {boolean} alignBottom Align the bottom left corner of the InfoBox to the <code>position</code>
 *  location (default is <tt>false</tt> which means that the top left corner of the InfoBox is aligned).
 * @property {string} pane The pane where the InfoBox is to appear (default is "floatPane").
 *  Set the pane to "mapPane" if the InfoBox is being used as a map label.
 *  Valid pane names are the property names for the <tt>google.maps.MapPanes</tt> object.
 * @property {boolean} enableEventPropagation Propagate mousedown, mousemove, mouseover, mouseout,
 *  mouseup, click, dblclick, touchstart, touchend, touchmove, and contextmenu events in the InfoBox
 *  (default is <tt>false</tt> to mimic the behavior of a <tt>google.maps.InfoWindow</tt>). Set
 *  this property to <tt>true</tt> if the InfoBox is being used as a map label.
 */

/**
 * Creates an InfoBox with the options specified in {@link InfoBoxOptions}.
 *  Call <tt>InfoBox.open</tt> to add the box to the map.
 * @constructor
 * @param {InfoBoxOptions} [opt_opts]
 */
function InfoBox(opt_opts) {

  opt_opts = opt_opts || {};

  google.maps.OverlayView.apply(this, arguments);

  // Standard options (in common with google.maps.InfoWindow):
  //
  this.content_ = opt_opts.content || "";
  this.disableAutoPan_ = opt_opts.disableAutoPan || false;
  this.maxWidth_ = opt_opts.maxWidth || 0;
  this.pixelOffset_ = opt_opts.pixelOffset || new google.maps.Size(0, 0);
  this.position_ = opt_opts.position || new google.maps.LatLng(0, 0);
  this.zIndex_ = opt_opts.zIndex || null;

  // Additional options (unique to InfoBox):
  //
  this.boxClass_ = opt_opts.boxClass || "infoBox";
  this.boxStyle_ = opt_opts.boxStyle || {};
  this.closeBoxMargin_ = opt_opts.closeBoxMargin || "2px";
  this.closeBoxURL_ = opt_opts.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
  if (opt_opts.closeBoxURL === "") {
    this.closeBoxURL_ = "";
  }
  this.infoBoxClearance_ = opt_opts.infoBoxClearance || new google.maps.Size(1, 1);

  if (typeof opt_opts.visible === "undefined") {
    if (typeof opt_opts.isHidden === "undefined") {
      opt_opts.visible = true;
    } else {
      opt_opts.visible = !opt_opts.isHidden;
    }
  }
  this.isHidden_ = !opt_opts.visible;

  this.alignBottom_ = opt_opts.alignBottom || false;
  this.pane_ = opt_opts.pane || "floatPane";
  this.enableEventPropagation_ = opt_opts.enableEventPropagation || false;

  this.div_ = null;
  this.closeListener_ = null;
  this.moveListener_ = null;
  this.contextListener_ = null;
  this.eventListeners_ = null;
  this.fixedWidthSet_ = null;
}

/* InfoBox extends OverlayView in the Google Maps API v3.
 */
InfoBox.prototype = new google.maps.OverlayView();

/**
 * Creates the DIV representing the InfoBox.
 * @private
 */
InfoBox.prototype.createInfoBoxDiv_ = function () {

  var i;
  var events;
  var bw;
  var me = this;

  // This handler prevents an event in the InfoBox from being passed on to the map.
  //
  var cancelHandler = function (e) {
    e.cancelBubble = true;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  // This handler ignores the current event in the InfoBox and conditionally prevents
  // the event from being passed on to the map. It is used for the contextmenu event.
  //
  var ignoreHandler = function (e) {

    e.returnValue = false;

    if (e.preventDefault) {

      e.preventDefault();
    }

    if (!me.enableEventPropagation_) {

      cancelHandler(e);
    }
  };

  if (!this.div_) {

    this.div_ = document.createElement("div");

    this.setBoxStyle_();

    if (typeof this.content_.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + this.content_;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(this.content_);
    }

    // Add the InfoBox DIV to the DOM
    this.getPanes()[this.pane_].appendChild(this.div_);

    this.addClickHandler_();

    if (this.div_.style.width) {

      this.fixedWidthSet_ = true;

    } else {

      if (this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_) {

        this.div_.style.width = this.maxWidth_;
        this.div_.style.overflow = "auto";
        this.fixedWidthSet_ = true;

      } else { // The following code is needed to overcome problems with MSIE

        bw = this.getBoxWidths_();

        this.div_.style.width = (this.div_.offsetWidth - bw.left - bw.right) + "px";
        this.fixedWidthSet_ = false;
      }
    }

    this.panBox_(this.disableAutoPan_);

    if (!this.enableEventPropagation_) {

      this.eventListeners_ = [];

      // Cancel event propagation.
      //
      // Note: mousemove not included (to resolve Issue 152)
      events = ["mousedown", "mouseover", "mouseout", "mouseup",
      "click", "dblclick", "touchstart", "touchend", "touchmove"];

      for (i = 0; i < events.length; i++) {

        this.eventListeners_.push(google.maps.event.addDomListener(this.div_, events[i], cancelHandler));
      }
      
      // Workaround for Google bug that causes the cursor to change to a pointer
      // when the mouse moves over a marker underneath InfoBox.
      this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function (e) {
        this.style.cursor = "default";
      }));
    }

    this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", ignoreHandler);

    /**
     * This event is fired when the DIV containing the InfoBox's content is attached to the DOM.
     * @name InfoBox#domready
     * @event
     */
    google.maps.event.trigger(this, "domready");
  }
};

/**
 * Returns the HTML <IMG> tag for the close box.
 * @private
 */
InfoBox.prototype.getCloseBoxImg_ = function () {

  var img = "";

  if (this.closeBoxURL_ !== "") {

    img  = "<img";
    img += " src='" + this.closeBoxURL_ + "'";
    img += " align=right"; // Do this because Opera chokes on style='float: right;'
    img += " style='";
    img += " position: relative;"; // Required by MSIE
    img += " cursor: pointer;";
    img += " margin: " + this.closeBoxMargin_ + ";";
    img += "'>";
  }

  return img;
};

/**
 * Adds the click handler to the InfoBox close box.
 * @private
 */
InfoBox.prototype.addClickHandler_ = function () {

  var closeBox;

  if (this.closeBoxURL_ !== "") {

    closeBox = this.div_.firstChild;
    this.closeListener_ = google.maps.event.addDomListener(closeBox, "click", this.getCloseClickHandler_());

  } else {

    this.closeListener_ = null;
  }
};

/**
 * Returns the function to call when the user clicks the close box of an InfoBox.
 * @private
 */
InfoBox.prototype.getCloseClickHandler_ = function () {

  var me = this;

  return function (e) {

    // 1.0.3 fix: Always prevent propagation of a close box click to the map:
    e.cancelBubble = true;

    if (e.stopPropagation) {

      e.stopPropagation();
    }

    /**
     * This event is fired when the InfoBox's close box is clicked.
     * @name InfoBox#closeclick
     * @event
     */
    google.maps.event.trigger(me, "closeclick");

    me.close();
  };
};

/**
 * Pans the map so that the InfoBox appears entirely within the map's visible area.
 * @private
 */
InfoBox.prototype.panBox_ = function (disablePan) {

  var map;
  var bounds;
  var xOffset = 0, yOffset = 0;

  if (!disablePan) {

    map = this.getMap();

    if (map instanceof google.maps.Map) { // Only pan if attached to map, not panorama

      if (!map.getBounds().contains(this.position_)) {
      // Marker not in visible area of map, so set center
      // of map to the marker position first.
        map.setCenter(this.position_);
      }

      bounds = map.getBounds();

      var mapDiv = map.getDiv();
      var mapWidth = mapDiv.offsetWidth;
      var mapHeight = mapDiv.offsetHeight;
      var iwOffsetX = this.pixelOffset_.width;
      var iwOffsetY = this.pixelOffset_.height;
      var iwWidth = this.div_.offsetWidth;
      var iwHeight = this.div_.offsetHeight;
      var padX = this.infoBoxClearance_.width;
      var padY = this.infoBoxClearance_.height;
      var pixPosition = this.getProjection().fromLatLngToContainerPixel(this.position_);

      if (pixPosition.x < (-iwOffsetX + padX)) {
        xOffset = pixPosition.x + iwOffsetX - padX;
      } else if ((pixPosition.x + iwWidth + iwOffsetX + padX) > mapWidth) {
        xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
      }
      if (this.alignBottom_) {
        if (pixPosition.y < (-iwOffsetY + padY + iwHeight)) {
          yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
        } else if ((pixPosition.y + iwOffsetY + padY) > mapHeight) {
          yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
        }
      } else {
        if (pixPosition.y < (-iwOffsetY + padY)) {
          yOffset = pixPosition.y + iwOffsetY - padY;
        } else if ((pixPosition.y + iwHeight + iwOffsetY + padY) > mapHeight) {
          yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
        }
      }

      if (!(xOffset === 0 && yOffset === 0)) {

        // Move the map to the shifted center.
        //
        var c = map.getCenter();
        map.panBy(xOffset, yOffset);
      }
    }
  }
};

/**
 * Sets the style of the InfoBox by setting the style sheet and applying
 * other specific styles requested.
 * @private
 */
InfoBox.prototype.setBoxStyle_ = function () {

  var i, boxStyle;

  if (this.div_) {

    // Apply style values from the style sheet defined in the boxClass parameter:
    this.div_.className = this.boxClass_;

    // Clear existing inline style values:
    this.div_.style.cssText = "";

    // Apply style values defined in the boxStyle parameter:
    boxStyle = this.boxStyle_;
    for (i in boxStyle) {

      if (boxStyle.hasOwnProperty(i)) {

        this.div_.style[i] = boxStyle[i];
      }
    }

    // Fix for iOS disappearing InfoBox problem.
    // See http://stackoverflow.com/questions/9229535/google-maps-markers-disappear-at-certain-zoom-level-only-on-iphone-ipad
    this.div_.style.WebkitTransform = "translateZ(0)";

    // Fix up opacity style for benefit of MSIE:
    //
    if (typeof this.div_.style.opacity !== "undefined" && this.div_.style.opacity !== "") {
      // See http://www.quirksmode.org/css/opacity.html
      this.div_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (this.div_.style.opacity * 100) + ")\"";
      this.div_.style.filter = "alpha(opacity=" + (this.div_.style.opacity * 100) + ")";
    }

    // Apply required styles:
    //
    this.div_.style.position = "absolute";
    this.div_.style.visibility = 'hidden';
    if (this.zIndex_ !== null) {

      this.div_.style.zIndex = this.zIndex_;
    }
  }
};

/**
 * Get the widths of the borders of the InfoBox.
 * @private
 * @return {Object} widths object (top, bottom left, right)
 */
InfoBox.prototype.getBoxWidths_ = function () {

  var computedStyle;
  var bw = {top: 0, bottom: 0, left: 0, right: 0};
  var box = this.div_;

  if (document.defaultView && document.defaultView.getComputedStyle) {

    computedStyle = box.ownerDocument.defaultView.getComputedStyle(box, "");

    if (computedStyle) {

      // The computed styles are always in pixel units (good!)
      bw.top = parseInt(computedStyle.borderTopWidth, 10) || 0;
      bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
      bw.left = parseInt(computedStyle.borderLeftWidth, 10) || 0;
      bw.right = parseInt(computedStyle.borderRightWidth, 10) || 0;
    }

  } else if (document.documentElement.currentStyle) { // MSIE

    if (box.currentStyle) {

      // The current styles may not be in pixel units, but assume they are (bad!)
      bw.top = parseInt(box.currentStyle.borderTopWidth, 10) || 0;
      bw.bottom = parseInt(box.currentStyle.borderBottomWidth, 10) || 0;
      bw.left = parseInt(box.currentStyle.borderLeftWidth, 10) || 0;
      bw.right = parseInt(box.currentStyle.borderRightWidth, 10) || 0;
    }
  }

  return bw;
};

/**
 * Invoked when <tt>close</tt> is called. Do not call it directly.
 */
InfoBox.prototype.onRemove = function () {

  if (this.div_) {

    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

/**
 * Draws the InfoBox based on the current map projection and zoom level.
 */
InfoBox.prototype.draw = function () {

  this.createInfoBoxDiv_();

  var pixPosition = this.getProjection().fromLatLngToDivPixel(this.position_);

  this.div_.style.left = (pixPosition.x + this.pixelOffset_.width) + "px";
  
  if (this.alignBottom_) {
    this.div_.style.bottom = -(pixPosition.y + this.pixelOffset_.height) + "px";
  } else {
    this.div_.style.top = (pixPosition.y + this.pixelOffset_.height) + "px";
  }

  if (this.isHidden_) {

    this.div_.style.visibility = "hidden";

  } else {

    this.div_.style.visibility = "visible";
  }
};

/**
 * Sets the options for the InfoBox. Note that changes to the <tt>maxWidth</tt>,
 *  <tt>closeBoxMargin</tt>, <tt>closeBoxURL</tt>, and <tt>enableEventPropagation</tt>
 *  properties have no affect until the current InfoBox is <tt>close</tt>d and a new one
 *  is <tt>open</tt>ed.
 * @param {InfoBoxOptions} opt_opts
 */
InfoBox.prototype.setOptions = function (opt_opts) {
  if (typeof opt_opts.boxClass !== "undefined") { // Must be first

    this.boxClass_ = opt_opts.boxClass;
    this.setBoxStyle_();
  }
  if (typeof opt_opts.boxStyle !== "undefined") { // Must be second

    this.boxStyle_ = opt_opts.boxStyle;
    this.setBoxStyle_();
  }
  if (typeof opt_opts.content !== "undefined") {

    this.setContent(opt_opts.content);
  }
  if (typeof opt_opts.disableAutoPan !== "undefined") {

    this.disableAutoPan_ = opt_opts.disableAutoPan;
  }
  if (typeof opt_opts.maxWidth !== "undefined") {

    this.maxWidth_ = opt_opts.maxWidth;
  }
  if (typeof opt_opts.pixelOffset !== "undefined") {

    this.pixelOffset_ = opt_opts.pixelOffset;
  }
  if (typeof opt_opts.alignBottom !== "undefined") {

    this.alignBottom_ = opt_opts.alignBottom;
  }
  if (typeof opt_opts.position !== "undefined") {

    this.setPosition(opt_opts.position);
  }
  if (typeof opt_opts.zIndex !== "undefined") {

    this.setZIndex(opt_opts.zIndex);
  }
  if (typeof opt_opts.closeBoxMargin !== "undefined") {

    this.closeBoxMargin_ = opt_opts.closeBoxMargin;
  }
  if (typeof opt_opts.closeBoxURL !== "undefined") {

    this.closeBoxURL_ = opt_opts.closeBoxURL;
  }
  if (typeof opt_opts.infoBoxClearance !== "undefined") {

    this.infoBoxClearance_ = opt_opts.infoBoxClearance;
  }
  if (typeof opt_opts.isHidden !== "undefined") {

    this.isHidden_ = opt_opts.isHidden;
  }
  if (typeof opt_opts.visible !== "undefined") {

    this.isHidden_ = !opt_opts.visible;
  }
  if (typeof opt_opts.enableEventPropagation !== "undefined") {

    this.enableEventPropagation_ = opt_opts.enableEventPropagation;
  }

  if (this.div_) {

    this.draw();
  }
};

/**
 * Sets the content of the InfoBox.
 *  The content can be plain text or an HTML DOM node.
 * @param {string|Node} content
 */
InfoBox.prototype.setContent = function (content) {
  this.content_ = content;

  if (this.div_) {

    if (this.closeListener_) {

      google.maps.event.removeListener(this.closeListener_);
      this.closeListener_ = null;
    }

    // Odd code required to make things work with MSIE.
    //
    if (!this.fixedWidthSet_) {

      this.div_.style.width = "";
    }

    if (typeof content.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + content;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(content);
    }

    // Perverse code required to make things work with MSIE.
    // (Ensures the close box does, in fact, float to the right.)
    //
    if (!this.fixedWidthSet_) {
      this.div_.style.width = this.div_.offsetWidth + "px";
      if (typeof content.nodeType === "undefined") {
        this.div_.innerHTML = this.getCloseBoxImg_() + content;
      } else {
        this.div_.innerHTML = this.getCloseBoxImg_();
        this.div_.appendChild(content);
      }
    }

    this.addClickHandler_();
  }

  /**
   * This event is fired when the content of the InfoBox changes.
   * @name InfoBox#content_changed
   * @event
   */
  google.maps.event.trigger(this, "content_changed");
};

/**
 * Sets the geographic location of the InfoBox.
 * @param {LatLng} latlng
 */
InfoBox.prototype.setPosition = function (latlng) {

  this.position_ = latlng;

  if (this.div_) {

    this.draw();
  }

  /**
   * This event is fired when the position of the InfoBox changes.
   * @name InfoBox#position_changed
   * @event
   */
  google.maps.event.trigger(this, "position_changed");
};

/**
 * Sets the zIndex style for the InfoBox.
 * @param {number} index
 */
InfoBox.prototype.setZIndex = function (index) {

  this.zIndex_ = index;

  if (this.div_) {

    this.div_.style.zIndex = index;
  }

  /**
   * This event is fired when the zIndex of the InfoBox changes.
   * @name InfoBox#zindex_changed
   * @event
   */
  google.maps.event.trigger(this, "zindex_changed");
};

/**
 * Sets the visibility of the InfoBox.
 * @param {boolean} isVisible
 */
InfoBox.prototype.setVisible = function (isVisible) {

  this.isHidden_ = !isVisible;
  if (this.div_) {
    this.div_.style.visibility = (this.isHidden_ ? "hidden" : "visible");
  }
};

/**
 * Returns the content of the InfoBox.
 * @returns {string}
 */
InfoBox.prototype.getContent = function () {

  return this.content_;
};

/**
 * Returns the geographic location of the InfoBox.
 * @returns {LatLng}
 */
InfoBox.prototype.getPosition = function () {

  return this.position_;
};

/**
 * Returns the zIndex for the InfoBox.
 * @returns {number}
 */
InfoBox.prototype.getZIndex = function () {

  return this.zIndex_;
};

/**
 * Returns a flag indicating whether the InfoBox is visible.
 * @returns {boolean}
 */
InfoBox.prototype.getVisible = function () {

  var isVisible;

  if ((typeof this.getMap() === "undefined") || (this.getMap() === null)) {
    isVisible = false;
  } else {
    isVisible = !this.isHidden_;
  }
  return isVisible;
};

/**
 * Shows the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
 */
InfoBox.prototype.show = function () {

  this.isHidden_ = false;
  if (this.div_) {
    this.div_.style.visibility = "visible";
  }
};

/**
 * Hides the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
 */
InfoBox.prototype.hide = function () {

  this.isHidden_ = true;
  if (this.div_) {
    this.div_.style.visibility = "hidden";
  }
};

/**
 * Adds the InfoBox to the specified map or Street View panorama. If <tt>anchor</tt>
 *  (usually a <tt>google.maps.Marker</tt>) is specified, the position
 *  of the InfoBox is set to the position of the <tt>anchor</tt>. If the
 *  anchor is dragged to a new location, the InfoBox moves as well.
 * @param {Map|StreetViewPanorama} map
 * @param {MVCObject} [anchor]
 */
InfoBox.prototype.open = function (map, anchor) {

  var me = this;

  if (anchor) {

    this.position_ = anchor.getPosition();
    this.moveListener_ = google.maps.event.addListener(anchor, "position_changed", function () {
      me.setPosition(this.getPosition());
    });
  }

  this.setMap(map);

  if (this.div_) {

    this.panBox_();
  }
};

/**
 * Removes the InfoBox from the map.
 */
InfoBox.prototype.close = function () {

  var i;

  if (this.closeListener_) {

    google.maps.event.removeListener(this.closeListener_);
    this.closeListener_ = null;
  }

  if (this.eventListeners_) {
    
    for (i = 0; i < this.eventListeners_.length; i++) {

      google.maps.event.removeListener(this.eventListeners_[i]);
    }
    this.eventListeners_ = null;
  }

  if (this.moveListener_) {

    google.maps.event.removeListener(this.moveListener_);
    this.moveListener_ = null;
  }

  if (this.contextListener_) {

    google.maps.event.removeListener(this.contextListener_);
    this.contextListener_ = null;
  }

  this.setMap(null);
};

/**
 * @name KeyDragZoom for V3
 * @version 2.0.9 [December 17, 2012] NOT YET RELEASED
 * @author: Nianwei Liu [nianwei at gmail dot com] & Gary Little [gary at luxcentral dot com]
 * @fileoverview This library adds a drag zoom capability to a V3 Google map.
 *  When drag zoom is enabled, holding down a designated hot key <code>(shift | ctrl | alt)</code>
 *  while dragging a box around an area of interest will zoom the map in to that area when
 *  the mouse button is released. Optionally, a visual control can also be supplied for turning
 *  a drag zoom operation on and off.
 *  Only one line of code is needed: <code>google.maps.Map.enableKeyDragZoom();</code>
 *  <p>
 *  NOTE: Do not use Ctrl as the hot key with Google Maps JavaScript API V3 since, unlike with V2,
 *  it causes a context menu to appear when running on the Macintosh.
 *  <p>
 *  Note that if the map's container has a border around it, the border widths must be specified
 *  in pixel units (or as thin, medium, or thick). This is required because of an MSIE limitation.
 *   <p>NL: 2009-05-28: initial port to core API V3.
 *  <br>NL: 2009-11-02: added a temp fix for -moz-transform for FF3.5.x using code from Paul Kulchenko (http://notebook.kulchenko.com/maps/gridmove).
 *  <br>NL: 2010-02-02: added a fix for IE flickering on divs onmousemove, caused by scroll value when get mouse position.
 *  <br>GL: 2010-06-15: added a visual control option.
 */
/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
  /*jslint browser:true */
  /*global window,google */
  /* Utility functions use "var funName=function()" syntax to allow use of the */
  /* Dean Edwards Packer compression tool (with Shrink variables, without Base62 encode). */

  /**
   * Converts "thin", "medium", and "thick" to pixel widths
   * in an MSIE environment. Not called for other browsers
   * because getComputedStyle() returns pixel widths automatically.
   * @param {string} widthValue The value of the border width parameter.
   */
  var toPixels = function (widthValue) {
    var px;
    switch (widthValue) {
    case "thin":
      px = "2px";
      break;
    case "medium":
      px = "4px";
      break;
    case "thick":
      px = "6px";
      break;
    default:
      px = widthValue;
    }
    return px;
  };
 /**
  * Get the widths of the borders of an HTML element.
  *
  * @param {Node} h  The HTML element.
  * @return {Object} The width object {top, bottom left, right}.
  */
  var getBorderWidths = function (h) {
    var computedStyle;
    var bw = {};
    if (document.defaultView && document.defaultView.getComputedStyle) {
      computedStyle = h.ownerDocument.defaultView.getComputedStyle(h, "");
      if (computedStyle) {
        // The computed styles are always in pixel units (good!)
        bw.top = parseInt(computedStyle.borderTopWidth, 10) || 0;
        bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
        bw.left = parseInt(computedStyle.borderLeftWidth, 10) || 0;
        bw.right = parseInt(computedStyle.borderRightWidth, 10) || 0;
        return bw;
      }
    } else if (document.documentElement.currentStyle) { // MSIE
      if (h.currentStyle) {
        // The current styles may not be in pixel units so try to convert (bad!)
        bw.top = parseInt(toPixels(h.currentStyle.borderTopWidth), 10) || 0;
        bw.bottom = parseInt(toPixels(h.currentStyle.borderBottomWidth), 10) || 0;
        bw.left = parseInt(toPixels(h.currentStyle.borderLeftWidth), 10) || 0;
        bw.right = parseInt(toPixels(h.currentStyle.borderRightWidth), 10) || 0;
        return bw;
      }
    }
    // Shouldn't get this far for any modern browser
    bw.top = parseInt(h.style["border-top-width"], 10) || 0;
    bw.bottom = parseInt(h.style["border-bottom-width"], 10) || 0;
    bw.left = parseInt(h.style["border-left-width"], 10) || 0;
    bw.right = parseInt(h.style["border-right-width"], 10) || 0;
    return bw;
  };

  // Page scroll values for use by getMousePosition. To prevent flickering on MSIE
  // they are calculated only when the document actually scrolls, not every time the
  // mouse moves (as they would be if they were calculated inside getMousePosition).
  var scroll = {
    x: 0,
    y: 0
  };
  var getScrollValue = function (e) {
    scroll.x = (typeof document.documentElement.scrollLeft !== "undefined" ? document.documentElement.scrollLeft : document.body.scrollLeft);
    scroll.y = (typeof document.documentElement.scrollTop !== "undefined" ? document.documentElement.scrollTop : document.body.scrollTop);
  };
  getScrollValue();

  /**
   * Get the position of the mouse relative to the document.
   * @param {Event} e  The mouse event.
   * @return {Object} The position object {left, top}.
   */
  var getMousePosition = function (e) {
    var posX = 0, posY = 0;
    e = e || window.event;
    if (typeof e.pageX !== "undefined") {
      posX = e.pageX;
      posY = e.pageY;
    } else if (typeof e.clientX !== "undefined") { // MSIE
      posX = e.clientX + scroll.x;
      posY = e.clientY + scroll.y;
    }
    return {
      left: posX,
      top: posY
    };
  };
  /**
   * Get the position of an HTML element relative to the document.
   * @param {Node} h  The HTML element.
   * @return {Object} The position object {left, top}.
   */
  var getElementPosition = function (h) {
    var posX = h.offsetLeft;
    var posY = h.offsetTop;
    var parent = h.offsetParent;
    // Add offsets for all ancestors in the hierarchy
    while (parent !== null) {
      // Adjust for scrolling elements which may affect the map position.
      //
      // See http://www.howtocreate.co.uk/tutorials/javascript/browserspecific
      //
      // "...make sure that every element [on a Web page] with an overflow
      // of anything other than visible also has a position style set to
      // something other than the default static..."
      if (parent !== document.body && parent !== document.documentElement) {
        posX -= parent.scrollLeft;
        posY -= parent.scrollTop;
      }
      // See http://groups.google.com/group/google-maps-js-api-v3/browse_thread/thread/4cb86c0c1037a5e5
      // Example: http://notebook.kulchenko.com/maps/gridmove
      var m = parent;
      // This is the "normal" way to get offset information:
      var moffx = m.offsetLeft;
      var moffy = m.offsetTop;
      // This covers those cases where a transform is used:
      if (!moffx && !moffy && window.getComputedStyle) {
        var matrix = document.defaultView.getComputedStyle(m, null).MozTransform ||
        document.defaultView.getComputedStyle(m, null).WebkitTransform;
        if (matrix) {
          if (typeof matrix === "string") {
            var parms = matrix.split(",");
            moffx += parseInt(parms[4], 10) || 0;
            moffy += parseInt(parms[5], 10) || 0;
          }
        }
      }
      posX += moffx;
      posY += moffy;
      parent = parent.offsetParent;
    }
    return {
      left: posX,
      top: posY
    };
  };
  /**
   * Set the properties of an object to those from another object.
   * @param {Object} obj The target object.
   * @param {Object} vals The source object.
   */
  var setVals = function (obj, vals) {
    if (obj && vals) {
      for (var x in vals) {
        if (vals.hasOwnProperty(x)) {
          obj[x] = vals[x];
        }
      }
    }
    return obj;
  };
  /**
   * Set the opacity. If op is not passed in, this function just performs an MSIE fix.
   * @param {Node} h The HTML element.
   * @param {number} op The opacity value (0-1).
   */
  var setOpacity = function (h, op) {
    if (typeof op !== "undefined") {
      h.style.opacity = op;
    }
    if (typeof h.style.opacity !== "undefined" && h.style.opacity !== "") {
      h.style.filter = "alpha(opacity=" + (h.style.opacity * 100) + ")";
    }
  };
  /**
   * @name KeyDragZoomOptions
   * @class This class represents the optional parameter passed into <code>google.maps.Map.enableKeyDragZoom</code>.
   * @property {string} [key="shift"] The hot key to hold down to activate a drag zoom, <code>shift | ctrl | alt</code>.
   *  NOTE: Do not use Ctrl as the hot key with Google Maps JavaScript API V3 since, unlike with V2,
   *  it causes a context menu to appear when running on the Macintosh. Also note that the
   *  <code>alt</code> hot key refers to the Option key on a Macintosh.
   * @property {Object} [boxStyle={border: "4px solid #736AFF"}]
   *  An object literal defining the CSS styles of the zoom box.
   *  Border widths must be specified in pixel units (or as thin, medium, or thick).
   * @property {Object} [veilStyle={backgroundColor: "gray", opacity: 0.25, cursor: "crosshair"}]
   *  An object literal defining the CSS styles of the veil pane which covers the map when a drag
   *  zoom is activated. The previous name for this property was <code>paneStyle</code> but the use
   *  of this name is now deprecated.
   * @property {boolean} [noZoom=false] A flag indicating whether to disable zooming after an area is
   *  selected. Set this to <code>true</code> to allow KeyDragZoom to be used as a simple area
   *  selection tool.
   * @property {boolean} [visualEnabled=false] A flag indicating whether a visual control is to be used.
   * @property {string} [visualClass=""] The name of the CSS class defining the styles for the visual
   *  control. To prevent the visual control from being printed, set this property to the name of
   *  a class, defined inside a <code>@media print</code> rule, which sets the CSS
   *  <code>display</code> style to <code>none</code>.
   * @property {ControlPosition} [visualPosition=google.maps.ControlPosition.LEFT_TOP]
   *  The position of the visual control.
   * @property {Size} [visualPositionOffset=google.maps.Size(35, 0)] The width and height values
   *  provided by this property are the offsets (in pixels) from the location at which the control
   *  would normally be drawn to the desired drawing location.
   * @property {number} [visualPositionIndex=null] The index of the visual control.
   *  The index is for controlling the placement of the control relative to other controls at the
   *  position given by <code>visualPosition</code>; controls with a lower index are placed first.
   *  Use a negative value to place the control <i>before</i> any default controls. No index is
   *  generally required.
   * @property {String} [visualSprite="http://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png"]
   *  The URL of the sprite image used for showing the visual control in the on, off, and hot
   *  (i.e., when the mouse is over the control) states. The three images within the sprite must
   *  be the same size and arranged in on-hot-off order in a single row with no spaces between images.
   * @property {Size} [visualSize=google.maps.Size(20, 20)] The width and height values provided by
   *  this property are the size (in pixels) of each of the images within <code>visualSprite</code>.
   * @property {Object} [visualTips={off: "Turn on drag zoom mode", on: "Turn off drag zoom mode"}]
   *  An object literal defining the help tips that appear when
   *  the mouse moves over the visual control. The <code>off</code> property is the tip to be shown
   *  when the control is off and the <code>on</code> property is the tip to be shown when the
   *  control is on.
   */
  /**
   * @name DragZoom
   * @class This class represents a drag zoom object for a map. The object is activated by holding down the hot key
   * or by turning on the visual control.
   * This object is created when <code>google.maps.Map.enableKeyDragZoom</code> is called; it cannot be created directly.
   * Use <code>google.maps.Map.getDragZoomObject</code> to gain access to this object in order to attach event listeners.
   * @param {Map} map The map to which the DragZoom object is to be attached.
   * @param {KeyDragZoomOptions} [opt_zoomOpts] The optional parameters.
   */
  function DragZoom(map, opt_zoomOpts) {
    var me = this;
    var ov = new google.maps.OverlayView();
    ov.onAdd = function () {
      me.init_(map, opt_zoomOpts);
    };
    ov.draw = function () {
    };
    ov.onRemove = function () {
    };
    ov.setMap(map);
    this.prjov_ = ov;
  }
  /**
   * Initialize the tool.
   * @param {Map} map The map to which the DragZoom object is to be attached.
   * @param {KeyDragZoomOptions} [opt_zoomOpts] The optional parameters.
   */
  DragZoom.prototype.init_ = function (map, opt_zoomOpts) {
    var i;
    var me = this;
    this.map_ = map;
    opt_zoomOpts = opt_zoomOpts || {};
    this.key_ = opt_zoomOpts.key || "shift";
    this.key_ = this.key_.toLowerCase();
    this.borderWidths_ = getBorderWidths(this.map_.getDiv());
    this.veilDiv_ = [];
    for (i = 0; i < 4; i++) {
      this.veilDiv_[i] = document.createElement("div");
      // Prevents selection of other elements on the webpage
      // when a drag zoom operation is in progress:
      this.veilDiv_[i].onselectstart = function () {
        return false;
      };
      // Apply default style values for the veil:
      setVals(this.veilDiv_[i].style, {
        backgroundColor: "gray",
        opacity: 0.25,
        cursor: "crosshair"
      });
      // Apply style values specified in veilStyle parameter:
      setVals(this.veilDiv_[i].style, opt_zoomOpts.paneStyle); // Old option name was "paneStyle"
      setVals(this.veilDiv_[i].style, opt_zoomOpts.veilStyle); // New name is "veilStyle"
      // Apply mandatory style values:
      setVals(this.veilDiv_[i].style, {
        position: "absolute",
        overflow: "hidden",
        display: "none"
      });
      // Workaround for Firefox Shift-Click problem:
      if (this.key_ === "shift") {
        this.veilDiv_[i].style.MozUserSelect = "none";
      }
      setOpacity(this.veilDiv_[i]);
      // An IE fix: If the background is transparent it cannot capture mousedown
      // events, so if it is, change the background to white with 0 opacity.
      if (this.veilDiv_[i].style.backgroundColor === "transparent") {
        this.veilDiv_[i].style.backgroundColor = "white";
        setOpacity(this.veilDiv_[i], 0);
      }
      this.map_.getDiv().appendChild(this.veilDiv_[i]);
    }

    this.noZoom_ = opt_zoomOpts.noZoom || false;
    this.visualEnabled_ = opt_zoomOpts.visualEnabled || false;
    this.visualClass_ = opt_zoomOpts.visualClass || "";
    this.visualPosition_ = opt_zoomOpts.visualPosition || google.maps.ControlPosition.LEFT_TOP;
    this.visualPositionOffset_ = opt_zoomOpts.visualPositionOffset || new google.maps.Size(35, 0);
    this.visualPositionIndex_ = opt_zoomOpts.visualPositionIndex || null;
    this.visualSprite_ = opt_zoomOpts.visualSprite || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png";
    this.visualSize_ = opt_zoomOpts.visualSize || new google.maps.Size(20, 20);
    this.visualTips_ = opt_zoomOpts.visualTips || {};
    this.visualTips_.off =  this.visualTips_.off || "Turn on drag zoom mode";
    this.visualTips_.on =  this.visualTips_.on || "Turn off drag zoom mode";

    this.boxDiv_ = document.createElement("div");
    // Apply default style values for the zoom box:
    setVals(this.boxDiv_.style, {
      border: "4px solid #736AFF"
    });
    // Apply style values specified in boxStyle parameter:
    setVals(this.boxDiv_.style, opt_zoomOpts.boxStyle);
    // Apply mandatory style values:
    setVals(this.boxDiv_.style, {
      position: "absolute",
      display: "none"
    });
    setOpacity(this.boxDiv_);
    this.map_.getDiv().appendChild(this.boxDiv_);
    this.boxBorderWidths_ = getBorderWidths(this.boxDiv_);

    this.listeners_ = [
      google.maps.event.addDomListener(document, "keydown", function (e) {
        me.onKeyDown_(e);
      }),
      google.maps.event.addDomListener(document, "keyup", function (e) {
        me.onKeyUp_(e);
      }),
      google.maps.event.addDomListener(this.veilDiv_[0], "mousedown", function (e) {
        me.onMouseDown_(e);
      }),
      google.maps.event.addDomListener(this.veilDiv_[1], "mousedown", function (e) {
        me.onMouseDown_(e);
      }),
      google.maps.event.addDomListener(this.veilDiv_[2], "mousedown", function (e) {
        me.onMouseDown_(e);
      }),
      google.maps.event.addDomListener(this.veilDiv_[3], "mousedown", function (e) {
        me.onMouseDown_(e);
      }),
      google.maps.event.addDomListener(document, "mousedown", function (e) {
        me.onMouseDownDocument_(e);
      }),
      google.maps.event.addDomListener(document, "mousemove", function (e) {
        me.onMouseMove_(e);
      }),
      google.maps.event.addDomListener(document, "mouseup", function (e) {
        me.onMouseUp_(e);
      }),
      google.maps.event.addDomListener(window, "scroll", getScrollValue)
    ];

    this.hotKeyDown_ = false;
    this.mouseDown_ = false;
    this.dragging_ = false;
    this.startPt_ = null;
    this.endPt_ = null;
    this.mapWidth_ = null;
    this.mapHeight_ = null;
    this.mousePosn_ = null;
    this.mapPosn_ = null;

    if (this.visualEnabled_) {
      this.buttonDiv_ = this.initControl_(this.visualPositionOffset_);
      if (this.visualPositionIndex_ !== null) {
        this.buttonDiv_.index = this.visualPositionIndex_;
      }
      this.map_.controls[this.visualPosition_].push(this.buttonDiv_);
      this.controlIndex_ = this.map_.controls[this.visualPosition_].length - 1;
    }
  };
  /**
   * Initializes the visual control and returns its DOM element.
   * @param {Size} offset The offset of the control from its normal position.
   * @return {Node} The DOM element containing the visual control.
   */
  DragZoom.prototype.initControl_ = function (offset) {
    var control;
    var image;
    var me = this;
    
    control = document.createElement("div");
    control.className = this.visualClass_;
    control.style.position = "relative";
    control.style.overflow = "hidden";
    control.style.height = this.visualSize_.height + "px";
    control.style.width = this.visualSize_.width + "px";
    control.title = this.visualTips_.off;
    image = document.createElement("img");
    image.src = this.visualSprite_;
    image.style.position = "absolute";
    image.style.left = -(this.visualSize_.width * 2) + "px";
    image.style.top = 0 + "px";
    control.appendChild(image);
    control.onclick = function (e) {
      me.hotKeyDown_ = !me.hotKeyDown_;
      if (me.hotKeyDown_) {
        me.buttonDiv_.firstChild.style.left = -(me.visualSize_.width * 0) + "px";
        me.buttonDiv_.title = me.visualTips_.on;
        me.activatedByControl_ = true;
        google.maps.event.trigger(me, "activate");
      } else {
        me.buttonDiv_.firstChild.style.left = -(me.visualSize_.width * 2) + "px";
        me.buttonDiv_.title = me.visualTips_.off;
        google.maps.event.trigger(me, "deactivate");
      }
      me.onMouseMove_(e); // Updates the veil
    };
    control.onmouseover = function () {
      me.buttonDiv_.firstChild.style.left = -(me.visualSize_.width * 1) + "px";
    };
    control.onmouseout = function () {
      if (me.hotKeyDown_) {
        me.buttonDiv_.firstChild.style.left = -(me.visualSize_.width * 0) + "px";
        me.buttonDiv_.title = me.visualTips_.on;
      } else {
        me.buttonDiv_.firstChild.style.left = -(me.visualSize_.width * 2) + "px";
        me.buttonDiv_.title = me.visualTips_.off;
      }
    };
    control.ondragstart = function () {
      return false;
    };
    setVals(control.style, {
      cursor: "pointer",
      marginTop: offset.height + "px",
      marginLeft: offset.width + "px"
    });
    return control;
  };
  /**
   * Returns <code>true</code> if the hot key is being pressed when an event occurs.
   * @param {Event} e The keyboard event.
   * @return {boolean} Flag indicating whether the hot key is down.
   */
  DragZoom.prototype.isHotKeyDown_ = function (e) {
    var isHot;
    e = e || window.event;
    isHot = (e.shiftKey && this.key_ === "shift") || (e.altKey && this.key_ === "alt") || (e.ctrlKey && this.key_ === "ctrl");
    if (!isHot) {
      // Need to look at keyCode for Opera because it
      // doesn't set the shiftKey, altKey, ctrlKey properties
      // unless a non-modifier event is being reported.
      //
      // See http://cross-browser.com/x/examples/shift_mode.php
      // Also see http://unixpapa.com/js/key.html
      switch (e.keyCode) {
      case 16:
        if (this.key_ === "shift") {
          isHot = true;
        }
        break;
      case 17:
        if (this.key_ === "ctrl") {
          isHot = true;
        }
        break;
      case 18:
        if (this.key_ === "alt") {
          isHot = true;
        }
        break;
      }
    }
    return isHot;
  };
  /**
   * Returns <code>true</code> if the mouse is on top of the map div.
   * The position is captured in onMouseMove_.
   * @return {boolean}
   */
  DragZoom.prototype.isMouseOnMap_ = function () {
    var mousePosn = this.mousePosn_;
    if (mousePosn) {
      var mapPosn = this.mapPosn_;
      var mapDiv = this.map_.getDiv();
      return mousePosn.left > mapPosn.left && mousePosn.left < (mapPosn.left + mapDiv.offsetWidth) &&
      mousePosn.top > mapPosn.top && mousePosn.top < (mapPosn.top + mapDiv.offsetHeight);
    } else {
      // if user never moved mouse
      return false;
    }
  };
  /**
   * Show the veil if the hot key is down and the mouse is over the map,
   * otherwise hide the veil.
   */
  DragZoom.prototype.setVeilVisibility_ = function () {
    var i;
    if (this.map_ && this.hotKeyDown_ && this.isMouseOnMap_()) {
      var mapDiv = this.map_.getDiv();
      this.mapWidth_ = mapDiv.offsetWidth - (this.borderWidths_.left + this.borderWidths_.right);
      this.mapHeight_ = mapDiv.offsetHeight - (this.borderWidths_.top + this.borderWidths_.bottom);
      if (this.activatedByControl_) { // Veil covers entire map (except control)
        var left = parseInt(this.buttonDiv_.style.left, 10) + this.visualPositionOffset_.width;
        var top = parseInt(this.buttonDiv_.style.top, 10) + this.visualPositionOffset_.height;
        var width = this.visualSize_.width;
        var height = this.visualSize_.height;
        // Left veil rectangle:
        this.veilDiv_[0].style.top = "0px";
        this.veilDiv_[0].style.left = "0px";
        this.veilDiv_[0].style.width = left + "px";
        this.veilDiv_[0].style.height = this.mapHeight_ + "px";
        // Right veil rectangle:
        this.veilDiv_[1].style.top = "0px";
        this.veilDiv_[1].style.left = (left + width) + "px";
        this.veilDiv_[1].style.width = (this.mapWidth_ - (left + width)) + "px";
        this.veilDiv_[1].style.height = this.mapHeight_ + "px";
        // Top veil rectangle:
        this.veilDiv_[2].style.top = "0px";
        this.veilDiv_[2].style.left = left + "px";
        this.veilDiv_[2].style.width = width + "px";
        this.veilDiv_[2].style.height = top + "px";
        // Bottom veil rectangle:
        this.veilDiv_[3].style.top = (top + height) + "px";
        this.veilDiv_[3].style.left = left + "px";
        this.veilDiv_[3].style.width = width + "px";
        this.veilDiv_[3].style.height = (this.mapHeight_ - (top + height)) + "px";
        for (i = 0; i < this.veilDiv_.length; i++) {
          this.veilDiv_[i].style.display = "block";
        }
      } else {
        this.veilDiv_[0].style.left = "0px";
        this.veilDiv_[0].style.top = "0px";
        this.veilDiv_[0].style.width = this.mapWidth_ + "px";
        this.veilDiv_[0].style.height = this.mapHeight_ + "px";
        for (i = 1; i < this.veilDiv_.length; i++) {
          this.veilDiv_[i].style.width = "0px";
          this.veilDiv_[i].style.height = "0px";
        }
        for (i = 0; i < this.veilDiv_.length; i++) {
          this.veilDiv_[i].style.display = "block";
        }
      }
    } else {
      for (i = 0; i < this.veilDiv_.length; i++) {
        this.veilDiv_[i].style.display = "none";
      }
    }
  };
  /**
   * Handle key down. Show the veil if the hot key has been pressed.
   * @param {Event} e The keyboard event.
   */
  DragZoom.prototype.onKeyDown_ = function (e) {
    if (this.map_ && !this.hotKeyDown_ && this.isHotKeyDown_(e)) {
      this.mapPosn_ = getElementPosition(this.map_.getDiv());
      this.hotKeyDown_ = true;
      this.activatedByControl_ = false;
      this.setVeilVisibility_();
     /**
       * This event is fired when the hot key is pressed.
       * @name DragZoom#activate
       * @event
       */
      google.maps.event.trigger(this, "activate");
    }
  };
  /**
   * Get the <code>google.maps.Point</code> of the mouse position.
   * @param {Event} e The mouse event.
   * @return {Point} The mouse position.
   */
  DragZoom.prototype.getMousePoint_ = function (e) {
    var mousePosn = getMousePosition(e);
    var p = new google.maps.Point();
    p.x = mousePosn.left - this.mapPosn_.left - this.borderWidths_.left;
    p.y = mousePosn.top - this.mapPosn_.top - this.borderWidths_.top;
    p.x = Math.min(p.x, this.mapWidth_);
    p.y = Math.min(p.y, this.mapHeight_);
    p.x = Math.max(p.x, 0);
    p.y = Math.max(p.y, 0);
    return p;
  };
  /**
   * Handle mouse down.
   * @param {Event} e The mouse event.
   */
  DragZoom.prototype.onMouseDown_ = function (e) {
    if (this.map_ && this.hotKeyDown_) {
      this.mapPosn_ = getElementPosition(this.map_.getDiv());
      this.dragging_ = true;
      this.startPt_ = this.endPt_ = this.getMousePoint_(e);
      this.boxDiv_.style.width = this.boxDiv_.style.height = "0px";
      var prj = this.prjov_.getProjection();
      var latlng = prj.fromContainerPixelToLatLng(this.startPt_);
      /**
       * This event is fired when the drag operation begins.
       * The parameter passed is the geographic position of the starting point.
       * @name DragZoom#dragstart
       * @param {LatLng} latlng The geographic position of the starting point.
       * @event
       */
      google.maps.event.trigger(this, "dragstart", latlng);
    }
  };
  /**
   * Handle mouse down at the document level.
   * @param {Event} e The mouse event.
   */
  DragZoom.prototype.onMouseDownDocument_ = function (e) {
    this.mouseDown_ = true;
  };
  /**
   * Handle mouse move.
   * @param {Event} e The mouse event.
   */
  DragZoom.prototype.onMouseMove_ = function (e) {
    this.mousePosn_ = getMousePosition(e);
    if (this.dragging_) {
      this.endPt_ = this.getMousePoint_(e);
      var left = Math.min(this.startPt_.x, this.endPt_.x);
      var top = Math.min(this.startPt_.y, this.endPt_.y);
      var width = Math.abs(this.startPt_.x - this.endPt_.x);
      var height = Math.abs(this.startPt_.y - this.endPt_.y);
      // For benefit of MSIE 7/8 ensure following values are not negative:
      var boxWidth = Math.max(0, width - (this.boxBorderWidths_.left + this.boxBorderWidths_.right));
      var boxHeight = Math.max(0, height - (this.boxBorderWidths_.top + this.boxBorderWidths_.bottom));
      // Left veil rectangle:
      this.veilDiv_[0].style.top = "0px";
      this.veilDiv_[0].style.left = "0px";
      this.veilDiv_[0].style.width = left + "px";
      this.veilDiv_[0].style.height = this.mapHeight_ + "px";
      // Right veil rectangle:
      this.veilDiv_[1].style.top = "0px";
      this.veilDiv_[1].style.left = (left + width) + "px";
      this.veilDiv_[1].style.width = (this.mapWidth_ - (left + width)) + "px";
      this.veilDiv_[1].style.height = this.mapHeight_ + "px";
      // Top veil rectangle:
      this.veilDiv_[2].style.top = "0px";
      this.veilDiv_[2].style.left = left + "px";
      this.veilDiv_[2].style.width = width + "px";
      this.veilDiv_[2].style.height = top + "px";
      // Bottom veil rectangle:
      this.veilDiv_[3].style.top = (top + height) + "px";
      this.veilDiv_[3].style.left = left + "px";
      this.veilDiv_[3].style.width = width + "px";
      this.veilDiv_[3].style.height = (this.mapHeight_ - (top + height)) + "px";
      // Selection rectangle:
      this.boxDiv_.style.top = top + "px";
      this.boxDiv_.style.left = left + "px";
      this.boxDiv_.style.width = boxWidth + "px";
      this.boxDiv_.style.height = boxHeight + "px";
      this.boxDiv_.style.display = "block";
      /**
       * This event is fired repeatedly while the user drags a box across the area of interest.
       * The southwest and northeast point are passed as parameters of type <code>google.maps.Point</code>
       * (for performance reasons), relative to the map container. Also passed is the projection object
       * so that the event listener, if necessary, can convert the pixel positions to geographic
       * coordinates using <code>google.maps.MapCanvasProjection.fromContainerPixelToLatLng</code>.
       * @name DragZoom#drag
       * @param {Point} southwestPixel The southwest point of the selection area.
       * @param {Point} northeastPixel The northeast point of the selection area.
       * @param {MapCanvasProjection} prj The projection object.
       * @event
       */
      google.maps.event.trigger(this, "drag", new google.maps.Point(left, top + height), new google.maps.Point(left + width, top), this.prjov_.getProjection());
    } else if (!this.mouseDown_) {
      this.mapPosn_ = getElementPosition(this.map_.getDiv());
      this.setVeilVisibility_();
    }
  };
  /**
   * Handle mouse up.
   * @param {Event} e The mouse event.
   */
  DragZoom.prototype.onMouseUp_ = function (e) {
    var z;
    var me = this;
    this.mouseDown_ = false;
    if (this.dragging_) {
      if ((this.getMousePoint_(e).x === this.startPt_.x) && (this.getMousePoint_(e).y === this.startPt_.y)) {
        this.onKeyUp_(e); // Cancel event
        return;
      }
      var left = Math.min(this.startPt_.x, this.endPt_.x);
      var top = Math.min(this.startPt_.y, this.endPt_.y);
      var width = Math.abs(this.startPt_.x - this.endPt_.x);
      var height = Math.abs(this.startPt_.y - this.endPt_.y);
      // Google Maps API bug: setCenter() doesn't work as expected if the map has a
      // border on the left or top. The code here includes a workaround for this problem.
      var kGoogleCenteringBug = true;
      if (kGoogleCenteringBug) {
        left += this.borderWidths_.left;
        top += this.borderWidths_.top;
      }

      var prj = this.prjov_.getProjection();
      var sw = prj.fromContainerPixelToLatLng(new google.maps.Point(left, top + height));
      var ne = prj.fromContainerPixelToLatLng(new google.maps.Point(left + width, top));
      var bnds = new google.maps.LatLngBounds(sw, ne);

      if (this.noZoom_) {
        this.boxDiv_.style.display = "none";
      } else {
        // Sometimes fitBounds causes a zoom OUT, so restore original zoom level if this happens.
        z = this.map_.getZoom();
        this.map_.fitBounds(bnds);
        if (this.map_.getZoom() < z) {
          this.map_.setZoom(z);
        }

        // Redraw box after zoom:
        var swPt = prj.fromLatLngToContainerPixel(sw);
        var nePt = prj.fromLatLngToContainerPixel(ne);
        if (kGoogleCenteringBug) {
          swPt.x -= this.borderWidths_.left;
          swPt.y -= this.borderWidths_.top;
          nePt.x -= this.borderWidths_.left;
          nePt.y -= this.borderWidths_.top;
        }
        this.boxDiv_.style.left = swPt.x + "px";
        this.boxDiv_.style.top = nePt.y + "px";
        this.boxDiv_.style.width = (Math.abs(nePt.x - swPt.x) - (this.boxBorderWidths_.left + this.boxBorderWidths_.right)) + "px";
        this.boxDiv_.style.height = (Math.abs(nePt.y - swPt.y) - (this.boxBorderWidths_.top + this.boxBorderWidths_.bottom)) + "px";
        // Hide box asynchronously after 1 second:
        setTimeout(function () {
          me.boxDiv_.style.display = "none";
        }, 1000);
      }
      this.dragging_ = false;
      this.onMouseMove_(e); // Updates the veil
      /**
       * This event is fired when the drag operation ends.
       * The parameter passed is the geographic bounds of the selected area.
       * Note that this event is <i>not</i> fired if the hot key is released before the drag operation ends.
       * @name DragZoom#dragend
       * @param {LatLngBounds} bnds The geographic bounds of the selected area.
       * @event
       */
      google.maps.event.trigger(this, "dragend", bnds);
      // if the hot key isn't down, the drag zoom must have been activated by turning
      // on the visual control. In this case, finish up by simulating a key up event.
      if (!this.isHotKeyDown_(e)) {
        this.onKeyUp_(e);
      }
    }
  };
  /**
   * Handle key up.
   * @param {Event} e The keyboard event.
   */
  DragZoom.prototype.onKeyUp_ = function (e) {
    var i;
    var left, top, width, height, prj, sw, ne;
    var bnds = null;
    if (this.map_ && this.hotKeyDown_) {
      this.hotKeyDown_ = false;
      if (this.dragging_) {
        this.boxDiv_.style.display = "none";
        this.dragging_ = false;
        // Calculate the bounds when drag zoom was cancelled
        left = Math.min(this.startPt_.x, this.endPt_.x);
        top = Math.min(this.startPt_.y, this.endPt_.y);
        width = Math.abs(this.startPt_.x - this.endPt_.x);
        height = Math.abs(this.startPt_.y - this.endPt_.y);
        prj = this.prjov_.getProjection();
        sw = prj.fromContainerPixelToLatLng(new google.maps.Point(left, top + height));
        ne = prj.fromContainerPixelToLatLng(new google.maps.Point(left + width, top));
        bnds = new google.maps.LatLngBounds(sw, ne);
      }
      for (i = 0; i < this.veilDiv_.length; i++) {
        this.veilDiv_[i].style.display = "none";
      }
      if (this.visualEnabled_) {
        this.buttonDiv_.firstChild.style.left = -(this.visualSize_.width * 2) + "px";
        this.buttonDiv_.title = this.visualTips_.off;
        this.buttonDiv_.style.display = "";
      }
      /**
       * This event is fired when the hot key is released.
       * The parameter passed is the geographic bounds of the selected area immediately
       * before the hot key was released.
       * @name DragZoom#deactivate
       * @param {LatLngBounds} bnds The geographic bounds of the selected area immediately
       *  before the hot key was released.
       * @event
       */
      google.maps.event.trigger(this, "deactivate", bnds);
    }
  };
  /**
   * @name google.maps.Map
   * @class These are new methods added to the Google Maps JavaScript API V3's
   * <a href="http://code.google.com/apis/maps/documentation/javascript/reference.html#Map">Map</a>
   * class.
   */
  /**
   * Enables drag zoom. The user can zoom to an area of interest by holding down the hot key
   * <code>(shift | ctrl | alt )</code> while dragging a box around the area or by turning
   * on the visual control then dragging a box around the area.
   * @param {KeyDragZoomOptions} opt_zoomOpts The optional parameters.
   */
  google.maps.Map.prototype.enableKeyDragZoom = function (opt_zoomOpts) {
    this.dragZoom_ = new DragZoom(this, opt_zoomOpts);
  };
  /**
   * Disables drag zoom.
   */
  google.maps.Map.prototype.disableKeyDragZoom = function () {
    var i;
    var d = this.dragZoom_;
    if (d) {
      for (i = 0; i < d.listeners_.length; ++i) {
        google.maps.event.removeListener(d.listeners_[i]);
      }
      this.getDiv().removeChild(d.boxDiv_);
      for (i = 0; i < d.veilDiv_.length; i++) {
        this.getDiv().removeChild(d.veilDiv_[i]);
      }
      if (d.visualEnabled_) {
        // Remove the custom control:
        this.controls[d.visualPosition_].removeAt(d.controlIndex_);
      }
      d.prjov_.setMap(null);
      this.dragZoom_ = null;
    }
  };
  /**
   * Returns <code>true</code> if the drag zoom feature has been enabled.
   * @return {boolean}
   */
  google.maps.Map.prototype.keyDragZoomEnabled = function () {
    return this.dragZoom_ !== null;
  };
  /**
   * Returns the DragZoom object which is created when <code>google.maps.Map.enableKeyDragZoom</code> is called.
   * With this object you can use <code>google.maps.event.addListener</code> to attach event listeners
   * for the "activate", "deactivate", "dragstart", "drag", and "dragend" events.
   * @return {DragZoom}
   */
  google.maps.Map.prototype.getDragZoomObject = function () {
    return this.dragZoom_;
  };
})();
/**
 * @name MarkerClustererPlus for Google Maps V3
 * @version 2.1.1 [November 4, 2013]
 * @author Gary Little
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of markers.
 * <p>
 * This is an enhanced V3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >V2 MarkerClusterer</a> by Xiaoxi Wu. It is based on the
 * <a href="http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/"
 * >V3 MarkerClusterer</a> port by Luke Mahe. MarkerClustererPlus was created by Gary Little.
 * <p>
 * v2.0 release: MarkerClustererPlus v2.0 is backward compatible with MarkerClusterer v1.0. It
 *  adds support for the <code>ignoreHidden</code>, <code>title</code>, <code>batchSizeIE</code>,
 *  and <code>calculator</code> properties as well as support for four more events. It also allows
 *  greater control over the styling of the text that appears on the cluster marker. The
 *  documentation has been significantly improved and the overall code has been simplified and
 *  polished. Very large numbers of markers can now be managed without causing Javascript timeout
 *  errors on Internet Explorer. Note that the name of the <code>clusterclick</code> event has been
 *  deprecated. The new name is <code>click</code>, so please change your application code now.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * @name ClusterIconStyle
 * @class This class represents the object for values in the <code>styles</code> array passed
 *  to the {@link MarkerClusterer} constructor. The element in this array that is used to
 *  style the cluster icon is determined by calling the <code>calculator</code> function.
 *
 * @property {string} url The URL of the cluster icon image file. Required.
 * @property {number} height The display height (in pixels) of the cluster icon. Required.
 * @property {number} width The display width (in pixels) of the cluster icon. Required.
 * @property {Array} [anchorText] The position (in pixels) from the center of the cluster icon to
 *  where the text label is to be centered and drawn. The format is <code>[yoffset, xoffset]</code>
 *  where <code>yoffset</code> increases as you go down from center and <code>xoffset</code>
 *  increases to the right of center. The default is <code>[0, 0]</code>.
 * @property {Array} [anchorIcon] The anchor position (in pixels) of the cluster icon. This is the
 *  spot on the cluster icon that is to be aligned with the cluster position. The format is
 *  <code>[yoffset, xoffset]</code> where <code>yoffset</code> increases as you go down and
 *  <code>xoffset</code> increases to the right of the top-left corner of the icon. The default
 *  anchor position is the center of the cluster icon.
 * @property {string} [textColor="black"] The color of the label text shown on the
 *  cluster icon.
 * @property {number} [textSize=11] The size (in pixels) of the label text shown on the
 *  cluster icon.
 * @property {string} [textDecoration="none"] The value of the CSS <code>text-decoration</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [fontWeight="bold"] The value of the CSS <code>font-weight</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [fontStyle="normal"] The value of the CSS <code>font-style</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [fontFamily="Arial,sans-serif"] The value of the CSS <code>font-family</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [backgroundPosition="0 0"] The position of the cluster icon image
 *  within the image defined by <code>url</code>. The format is <code>"xpos ypos"</code>
 *  (the same format as for the CSS <code>background-position</code> property). You must set
 *  this property appropriately when the image defined by <code>url</code> represents a sprite
 *  containing multiple images. Note that the position <i>must</i> be specified in px units.
 */
/**
 * @name ClusterIconInfo
 * @class This class is an object containing general information about a cluster icon. This is
 *  the object that a <code>calculator</code> function returns.
 *
 * @property {string} text The text of the label to be shown on the cluster icon.
 * @property {number} index The index plus 1 of the element in the <code>styles</code>
 *  array to be used to style the cluster icon.
 * @property {string} title The tooltip to display when the mouse moves over the cluster icon.
 *  If this value is <code>undefined</code> or <code>""</code>, <code>title</code> is set to the
 *  value of the <code>title</code> property passed to the MarkerClusterer.
 */
/**
 * A cluster icon.
 *
 * @constructor
 * @extends google.maps.OverlayView
 * @param {Cluster} cluster The cluster with which the icon is to be associated.
 * @param {Array} [styles] An array of {@link ClusterIconStyle} defining the cluster icons
 *  to use for various cluster sizes.
 * @private
 */
function ClusterIcon(cluster, styles) {
  cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

  this.cluster_ = cluster;
  this.className_ = cluster.getMarkerClusterer().getClusterClass();
  this.styles_ = styles;
  this.center_ = null;
  this.div_ = null;
  this.sums_ = null;
  this.visible_ = false;

  this.setMap(cluster.getMap()); // Note: this causes onAdd to be called
}


/**
 * Adds the icon to the DOM.
 */
ClusterIcon.prototype.onAdd = function () {
  var cClusterIcon = this;
  var cMouseDownInCluster;
  var cDraggingMapByCluster;

  this.div_ = document.createElement("div");
  this.div_.className = this.className_;
  if (this.visible_) {
    this.show();
  }

  this.getPanes().overlayMouseTarget.appendChild(this.div_);

  // Fix for Issue 157
  this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", function () {
    cDraggingMapByCluster = cMouseDownInCluster;
  });

  google.maps.event.addDomListener(this.div_, "mousedown", function () {
    cMouseDownInCluster = true;
    cDraggingMapByCluster = false;
  });

  google.maps.event.addDomListener(this.div_, "click", function (e) {
    cMouseDownInCluster = false;
    if (!cDraggingMapByCluster) {
      var theBounds;
      var mz;
      var mc = cClusterIcon.cluster_.getMarkerClusterer();
      /**
       * This event is fired when a cluster marker is clicked.
       * @name MarkerClusterer#click
       * @param {Cluster} c The cluster that was clicked.
       * @event
       */
      google.maps.event.trigger(mc, "click", cClusterIcon.cluster_);
      google.maps.event.trigger(mc, "clusterclick", cClusterIcon.cluster_); // deprecated name

      // The default click handler follows. Disable it by setting
      // the zoomOnClick property to false.
      if (mc.getZoomOnClick()) {
        // Zoom into the cluster.
        mz = mc.getMaxZoom();
        theBounds = cClusterIcon.cluster_.getBounds();
        mc.getMap().fitBounds(theBounds);
        // There is a fix for Issue 170 here:
        setTimeout(function () {
          mc.getMap().fitBounds(theBounds);
          // Don't zoom beyond the max zoom level
          if (mz !== null && (mc.getMap().getZoom() > mz)) {
            mc.getMap().setZoom(mz + 1);
          }
        }, 100);
      }

      // Prevent event propagation to the map:
      e.cancelBubble = true;
      if (e.stopPropagation) {
        e.stopPropagation();
      }
    }
  });

  google.maps.event.addDomListener(this.div_, "mouseover", function () {
    var mc = cClusterIcon.cluster_.getMarkerClusterer();
    /**
     * This event is fired when the mouse moves over a cluster marker.
     * @name MarkerClusterer#mouseover
     * @param {Cluster} c The cluster that the mouse moved over.
     * @event
     */
    google.maps.event.trigger(mc, "mouseover", cClusterIcon.cluster_);
  });

  google.maps.event.addDomListener(this.div_, "mouseout", function () {
    var mc = cClusterIcon.cluster_.getMarkerClusterer();
    /**
     * This event is fired when the mouse moves out of a cluster marker.
     * @name MarkerClusterer#mouseout
     * @param {Cluster} c The cluster that the mouse moved out of.
     * @event
     */
    google.maps.event.trigger(mc, "mouseout", cClusterIcon.cluster_);
  });
};


/**
 * Removes the icon from the DOM.
 */
ClusterIcon.prototype.onRemove = function () {
  if (this.div_ && this.div_.parentNode) {
    this.hide();
    google.maps.event.removeListener(this.boundsChangedListener_);
    google.maps.event.clearInstanceListeners(this.div_);
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};


/**
 * Draws the icon.
 */
ClusterIcon.prototype.draw = function () {
  if (this.visible_) {
    var pos = this.getPosFromLatLng_(this.center_);
    this.div_.style.top = pos.y + "px";
    this.div_.style.left = pos.x + "px";
  }
};


/**
 * Hides the icon.
 */
ClusterIcon.prototype.hide = function () {
  if (this.div_) {
    this.div_.style.display = "none";
  }
  this.visible_ = false;
};


/**
 * Positions and shows the icon.
 */
ClusterIcon.prototype.show = function () {
  if (this.div_) {
    var img = "";
    // NOTE: values must be specified in px units
    var bp = this.backgroundPosition_.split(" ");
    var spriteH = parseInt(bp[0].trim(), 10);
    var spriteV = parseInt(bp[1].trim(), 10);
    var pos = this.getPosFromLatLng_(this.center_);
    this.div_.style.cssText = this.createCss(pos);
    img = "<img src='" + this.url_ + "' style='position: absolute; top: " + spriteV + "px; left: " + spriteH + "px; ";
    if (!this.cluster_.getMarkerClusterer().enableRetinaIcons_) {
      img += "clip: rect(" + (-1 * spriteV) + "px, " + ((-1 * spriteH) + this.width_) + "px, " +
          ((-1 * spriteV) + this.height_) + "px, " + (-1 * spriteH) + "px);";
    }
    img += "'>";
    this.div_.innerHTML = img + "<div style='" +
        "position: absolute;" +
        "top: " + this.anchorText_[0] + "px;" +
        "left: " + this.anchorText_[1] + "px;" +
        "color: " + this.textColor_ + ";" +
        "font-size: " + this.textSize_ + "px;" +
        "font-family: " + this.fontFamily_ + ";" +
        "font-weight: " + this.fontWeight_ + ";" +
        "font-style: " + this.fontStyle_ + ";" +
        "text-decoration: " + this.textDecoration_ + ";" +
        "text-align: center;" +
        "width: " + this.width_ + "px;" +
        "line-height:" + this.height_ + "px;" +
        "'>" + this.sums_.text + "</div>";
    if (typeof this.sums_.title === "undefined" || this.sums_.title === "") {
      this.div_.title = this.cluster_.getMarkerClusterer().getTitle();
    } else {
      this.div_.title = this.sums_.title;
    }
    this.div_.style.display = "";
  }
  this.visible_ = true;
};


/**
 * Sets the icon styles to the appropriate element in the styles array.
 *
 * @param {ClusterIconInfo} sums The icon label text and styles index.
 */
ClusterIcon.prototype.useStyle = function (sums) {
  this.sums_ = sums;
  var index = Math.max(0, sums.index - 1);
  index = Math.min(this.styles_.length - 1, index);
  var style = this.styles_[index];
  this.url_ = style.url;
  this.height_ = style.height;
  this.width_ = style.width;
  this.anchorText_ = style.anchorText || [0, 0];
  this.anchorIcon_ = style.anchorIcon || [parseInt(this.height_ / 2, 10), parseInt(this.width_ / 2, 10)];
  this.textColor_ = style.textColor || "black";
  this.textSize_ = style.textSize || 11;
  this.textDecoration_ = style.textDecoration || "none";
  this.fontWeight_ = style.fontWeight || "bold";
  this.fontStyle_ = style.fontStyle || "normal";
  this.fontFamily_ = style.fontFamily || "Arial,sans-serif";
  this.backgroundPosition_ = style.backgroundPosition || "0 0";
};


/**
 * Sets the position at which to center the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function (center) {
  this.center_ = center;
};


/**
 * Creates the cssText style parameter based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position of the icon.
 * @return {string} The CSS style text.
 */
ClusterIcon.prototype.createCss = function (pos) {
  var style = [];
  style.push("cursor: pointer;");
  style.push("position: absolute; top: " + pos.y + "px; left: " + pos.x + "px;");
  style.push("width: " + this.width_ + "px; height: " + this.height_ + "px;");
  return style.join("");
};


/**
 * Returns the position at which to place the DIV depending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 */
ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
  var pos = this.getProjection().fromLatLngToDivPixel(latlng);
  pos.x -= this.anchorIcon_[1];
  pos.y -= this.anchorIcon_[0];
  pos.x = parseInt(pos.x, 10);
  pos.y = parseInt(pos.y, 10);
  return pos;
};


/**
 * Creates a single cluster that manages a group of proximate markers.
 *  Used internally, do not call this constructor directly.
 * @constructor
 * @param {MarkerClusterer} mc The <code>MarkerClusterer</code> object with which this
 *  cluster is associated.
 */
function Cluster(mc) {
  this.markerClusterer_ = mc;
  this.map_ = mc.getMap();
  this.gridSize_ = mc.getGridSize();
  this.minClusterSize_ = mc.getMinimumClusterSize();
  this.averageCenter_ = mc.getAverageCenter();
  this.markers_ = [];
  this.center_ = null;
  this.bounds_ = null;
  this.clusterIcon_ = new ClusterIcon(this, mc.getStyles());
}


/**
 * Returns the number of markers managed by the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {number} The number of markers in the cluster.
 */
Cluster.prototype.getSize = function () {
  return this.markers_.length;
};


/**
 * Returns the array of markers managed by the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {Array} The array of markers in the cluster.
 */
Cluster.prototype.getMarkers = function () {
  return this.markers_;
};


/**
 * Returns the center of the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {google.maps.LatLng} The center of the cluster.
 */
Cluster.prototype.getCenter = function () {
  return this.center_;
};


/**
 * Returns the map with which the cluster is associated.
 *
 * @return {google.maps.Map} The map.
 * @ignore
 */
Cluster.prototype.getMap = function () {
  return this.map_;
};


/**
 * Returns the <code>MarkerClusterer</code> object with which the cluster is associated.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 * @ignore
 */
Cluster.prototype.getMarkerClusterer = function () {
  return this.markerClusterer_;
};


/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 * @ignore
 */
Cluster.prototype.getBounds = function () {
  var i;
  var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
  var markers = this.getMarkers();
  for (i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].getPosition());
  }
  return bounds;
};


/**
 * Removes the cluster from the map.
 *
 * @ignore
 */
Cluster.prototype.remove = function () {
  this.clusterIcon_.setMap(null);
  this.markers_ = [];
  delete this.markers_;
};


/**
 * Adds a marker to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to be added.
 * @return {boolean} True if the marker was added.
 * @ignore
 */
Cluster.prototype.addMarker = function (marker) {
  var i;
  var mCount;
  var mz;

  if (this.isMarkerAlreadyAdded_(marker)) {
    return false;
  }

  if (!this.center_) {
    this.center_ = marker.getPosition();
    this.calculateBounds_();
  } else {
    if (this.averageCenter_) {
      var l = this.markers_.length + 1;
      var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
      var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
      this.center_ = new google.maps.LatLng(lat, lng);
      this.calculateBounds_();
    }
  }

  marker.isAdded = true;
  this.markers_.push(marker);

  mCount = this.markers_.length;
  mz = this.markerClusterer_.getMaxZoom();
  if (mz !== null && this.map_.getZoom() > mz) {
    // Zoomed in past max zoom, so show the marker.
    if (marker.getMap() !== this.map_) {
      marker.setMap(this.map_);
    }
  } else if (mCount < this.minClusterSize_) {
    // Min cluster size not reached so show the marker.
    if (marker.getMap() !== this.map_) {
      marker.setMap(this.map_);
    }
  } else if (mCount === this.minClusterSize_) {
    // Hide the markers that were showing.
    for (i = 0; i < mCount; i++) {
      this.markers_[i].setMap(null);
    }
  } else {
    marker.setMap(null);
  }

  this.updateIcon_();
  return true;
};


/**
 * Determines if a marker lies within the cluster's bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 * @ignore
 */
Cluster.prototype.isMarkerInClusterBounds = function (marker) {
  return this.bounds_.contains(marker.getPosition());
};


/**
 * Calculates the extended bounds of the cluster with the grid.
 */
Cluster.prototype.calculateBounds_ = function () {
  var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
  this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};


/**
 * Updates the cluster icon.
 */
Cluster.prototype.updateIcon_ = function () {
  var mCount = this.markers_.length;
  var mz = this.markerClusterer_.getMaxZoom();

  if (mz !== null && this.map_.getZoom() > mz) {
    this.clusterIcon_.hide();
    return;
  }

  if (mCount < this.minClusterSize_) {
    // Min cluster size not yet reached.
    this.clusterIcon_.hide();
    return;
  }

  var numStyles = this.markerClusterer_.getStyles().length;
  var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
  this.clusterIcon_.setCenter(this.center_);
  this.clusterIcon_.useStyle(sums);
  this.clusterIcon_.show();
};


/**
 * Determines if a marker has already been added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker has already been added.
 */
Cluster.prototype.isMarkerAlreadyAdded_ = function (marker) {
  var i;
  if (this.markers_.indexOf) {
    return this.markers_.indexOf(marker) !== -1;
  } else {
    for (i = 0; i < this.markers_.length; i++) {
      if (marker === this.markers_[i]) {
        return true;
      }
    }
  }
  return false;
};


/**
 * @name MarkerClustererOptions
 * @class This class represents the optional parameter passed to
 *  the {@link MarkerClusterer} constructor.
 * @property {number} [gridSize=60] The grid size of a cluster in pixels. The grid is a square.
 * @property {number} [maxZoom=null] The maximum zoom level at which clustering is enabled or
 *  <code>null</code> if clustering is to be enabled at all zoom levels.
 * @property {boolean} [zoomOnClick=true] Whether to zoom the map when a cluster marker is
 *  clicked. You may want to set this to <code>false</code> if you have installed a handler
 *  for the <code>click</code> event and it deals with zooming on its own.
 * @property {boolean} [averageCenter=false] Whether the position of a cluster marker should be
 *  the average position of all markers in the cluster. If set to <code>false</code>, the
 *  cluster marker is positioned at the location of the first marker added to the cluster.
 * @property {number} [minimumClusterSize=2] The minimum number of markers needed in a cluster
 *  before the markers are hidden and a cluster marker appears.
 * @property {boolean} [ignoreHidden=false] Whether to ignore hidden markers in clusters. You
 *  may want to set this to <code>true</code> to ensure that hidden markers are not included
 *  in the marker count that appears on a cluster marker (this count is the value of the
 *  <code>text</code> property of the result returned by the default <code>calculator</code>).
 *  If set to <code>true</code> and you change the visibility of a marker being clustered, be
 *  sure to also call <code>MarkerClusterer.repaint()</code>.
 * @property {string} [title=""] The tooltip to display when the mouse moves over a cluster
 *  marker. (Alternatively, you can use a custom <code>calculator</code> function to specify a
 *  different tooltip for each cluster marker.)
 * @property {function} [calculator=MarkerClusterer.CALCULATOR] The function used to determine
 *  the text to be displayed on a cluster marker and the index indicating which style to use
 *  for the cluster marker. The input parameters for the function are (1) the array of markers
 *  represented by a cluster marker and (2) the number of cluster icon styles. It returns a
 *  {@link ClusterIconInfo} object. The default <code>calculator</code> returns a
 *  <code>text</code> property which is the number of markers in the cluster and an
 *  <code>index</code> property which is one higher than the lowest integer such that
 *  <code>10^i</code> exceeds the number of markers in the cluster, or the size of the styles
 *  array, whichever is less. The <code>styles</code> array element used has an index of
 *  <code>index</code> minus 1. For example, the default <code>calculator</code> returns a
 *  <code>text</code> value of <code>"125"</code> and an <code>index</code> of <code>3</code>
 *  for a cluster icon representing 125 markers so the element used in the <code>styles</code>
 *  array is <code>2</code>. A <code>calculator</code> may also return a <code>title</code>
 *  property that contains the text of the tooltip to be used for the cluster marker. If
 *   <code>title</code> is not defined, the tooltip is set to the value of the <code>title</code>
 *   property for the MarkerClusterer.
 * @property {string} [clusterClass="cluster"] The name of the CSS class defining general styles
 *  for the cluster markers. Use this class to define CSS styles that are not set up by the code
 *  that processes the <code>styles</code> array.
 * @property {Array} [styles] An array of {@link ClusterIconStyle} elements defining the styles
 *  of the cluster markers to be used. The element to be used to style a given cluster marker
 *  is determined by the function defined by the <code>calculator</code> property.
 *  The default is an array of {@link ClusterIconStyle} elements whose properties are derived
 *  from the values for <code>imagePath</code>, <code>imageExtension</code>, and
 *  <code>imageSizes</code>.
 * @property {boolean} [enableRetinaIcons=false] Whether to allow the use of cluster icons that
 * have sizes that are some multiple (typically double) of their actual display size. Icons such
 * as these look better when viewed on high-resolution monitors such as Apple's Retina displays.
 * Note: if this property is <code>true</code>, sprites cannot be used as cluster icons.
 * @property {number} [batchSize=MarkerClusterer.BATCH_SIZE] Set this property to the
 *  number of markers to be processed in a single batch when using a browser other than
 *  Internet Explorer (for Internet Explorer, use the batchSizeIE property instead).
 * @property {number} [batchSizeIE=MarkerClusterer.BATCH_SIZE_IE] When Internet Explorer is
 *  being used, markers are processed in several batches with a small delay inserted between
 *  each batch in an attempt to avoid Javascript timeout errors. Set this property to the
 *  number of markers to be processed in a single batch; select as high a number as you can
 *  without causing a timeout error in the browser. This number might need to be as low as 100
 *  if 15,000 markers are being managed, for example.
 * @property {string} [imagePath=MarkerClusterer.IMAGE_PATH]
 *  The full URL of the root name of the group of image files to use for cluster icons.
 *  The complete file name is of the form <code>imagePath</code>n.<code>imageExtension</code>
 *  where n is the image file number (1, 2, etc.).
 * @property {string} [imageExtension=MarkerClusterer.IMAGE_EXTENSION]
 *  The extension name for the cluster icon image files (e.g., <code>"png"</code> or
 *  <code>"jpg"</code>).
 * @property {Array} [imageSizes=MarkerClusterer.IMAGE_SIZES]
 *  An array of numbers containing the widths of the group of
 *  <code>imagePath</code>n.<code>imageExtension</code> image files.
 *  (The images are assumed to be square.)
 */
/**
 * Creates a MarkerClusterer object with the options specified in {@link MarkerClustererOptions}.
 * @constructor
 * @extends google.maps.OverlayView
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>} [opt_markers] The markers to be added to the cluster.
 * @param {MarkerClustererOptions} [opt_options] The optional parameters.
 */
function MarkerClusterer(map, opt_markers, opt_options) {
  // MarkerClusterer implements google.maps.OverlayView interface. We use the
  // extend function to extend MarkerClusterer with google.maps.OverlayView
  // because it might not always be available when the code is defined so we
  // look for it at the last possible moment. If it doesn't exist now then
  // there is no point going ahead :)
  this.extend(MarkerClusterer, google.maps.OverlayView);

  opt_markers = opt_markers || [];
  opt_options = opt_options || {};

  this.markers_ = [];
  this.clusters_ = [];
  this.listeners_ = [];
  this.activeMap_ = null;
  this.ready_ = false;

  this.gridSize_ = opt_options.gridSize || 60;
  this.minClusterSize_ = opt_options.minimumClusterSize || 2;
  this.maxZoom_ = opt_options.maxZoom || null;
  this.styles_ = opt_options.styles || [];
  this.title_ = opt_options.title || "";
  this.zoomOnClick_ = true;
  if (opt_options.zoomOnClick !== undefined) {
    this.zoomOnClick_ = opt_options.zoomOnClick;
  }
  this.averageCenter_ = false;
  if (opt_options.averageCenter !== undefined) {
    this.averageCenter_ = opt_options.averageCenter;
  }
  this.ignoreHidden_ = false;
  if (opt_options.ignoreHidden !== undefined) {
    this.ignoreHidden_ = opt_options.ignoreHidden;
  }
  this.enableRetinaIcons_ = false;
  if (opt_options.enableRetinaIcons !== undefined) {
    this.enableRetinaIcons_ = opt_options.enableRetinaIcons;
  }
  this.imagePath_ = opt_options.imagePath || MarkerClusterer.IMAGE_PATH;
  this.imageExtension_ = opt_options.imageExtension || MarkerClusterer.IMAGE_EXTENSION;
  this.imageSizes_ = opt_options.imageSizes || MarkerClusterer.IMAGE_SIZES;
  this.calculator_ = opt_options.calculator || MarkerClusterer.CALCULATOR;
  this.batchSize_ = opt_options.batchSize || MarkerClusterer.BATCH_SIZE;
  this.batchSizeIE_ = opt_options.batchSizeIE || MarkerClusterer.BATCH_SIZE_IE;
  this.clusterClass_ = opt_options.clusterClass || "cluster";

  if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
    // Try to avoid IE timeout when processing a huge number of markers:
    this.batchSize_ = this.batchSizeIE_;
  }

  this.setupStyles_();

  this.addMarkers(opt_markers, true);
  this.setMap(map); // Note: this causes onAdd to be called
}


/**
 * Implementation of the onAdd interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function () {
  var cMarkerClusterer = this;

  this.activeMap_ = this.getMap();
  this.ready_ = true;

  this.repaint();

  // Add the map event listeners
  this.listeners_ = [
    google.maps.event.addListener(this.getMap(), "zoom_changed", function () {
      cMarkerClusterer.resetViewport_(false);
      // Workaround for this Google bug: when map is at level 0 and "-" of
      // zoom slider is clicked, a "zoom_changed" event is fired even though
      // the map doesn't zoom out any further. In this situation, no "idle"
      // event is triggered so the cluster markers that have been removed
      // do not get redrawn. Same goes for a zoom in at maxZoom.
      if (this.getZoom() === (this.get("minZoom") || 0) || this.getZoom() === this.get("maxZoom")) {
        google.maps.event.trigger(this, "idle");
      }
    }),
    google.maps.event.addListener(this.getMap(), "idle", function () {
      cMarkerClusterer.redraw_();
    })
  ];
};


/**
 * Implementation of the onRemove interface method.
 * Removes map event listeners and all cluster icons from the DOM.
 * All managed markers are also put back on the map.
 * @ignore
 */
MarkerClusterer.prototype.onRemove = function () {
  var i;

  // Put all the managed markers back on the map:
  for (i = 0; i < this.markers_.length; i++) {
    if (this.markers_[i].getMap() !== this.activeMap_) {
      this.markers_[i].setMap(this.activeMap_);
    }
  }

  // Remove all clusters:
  for (i = 0; i < this.clusters_.length; i++) {
    this.clusters_[i].remove();
  }
  this.clusters_ = [];

  // Remove map event listeners:
  for (i = 0; i < this.listeners_.length; i++) {
    google.maps.event.removeListener(this.listeners_[i]);
  }
  this.listeners_ = [];

  this.activeMap_ = null;
  this.ready_ = false;
};


/**
 * Implementation of the draw interface method.
 * @ignore
 */
MarkerClusterer.prototype.draw = function () {};


/**
 * Sets up the styles object.
 */
MarkerClusterer.prototype.setupStyles_ = function () {
  var i, size;
  if (this.styles_.length > 0) {
    return;
  }

  for (i = 0; i < this.imageSizes_.length; i++) {
    size = this.imageSizes_[i];
    this.styles_.push({
      url: this.imagePath_ + (i + 1) + "." + this.imageExtension_,
      height: size,
      width: size
    });
  }
};


/**
 *  Fits the map to the bounds of the markers managed by the clusterer.
 */
MarkerClusterer.prototype.fitMapToMarkers = function () {
  var i;
  var markers = this.getMarkers();
  var bounds = new google.maps.LatLngBounds();
  for (i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].getPosition());
  }

  this.getMap().fitBounds(bounds);
};


/**
 * Returns the value of the <code>gridSize</code> property.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function () {
  return this.gridSize_;
};


/**
 * Sets the value of the <code>gridSize</code> property.
 *
 * @param {number} gridSize The grid size.
 */
MarkerClusterer.prototype.setGridSize = function (gridSize) {
  this.gridSize_ = gridSize;
};


/**
 * Returns the value of the <code>minimumClusterSize</code> property.
 *
 * @return {number} The minimum cluster size.
 */
MarkerClusterer.prototype.getMinimumClusterSize = function () {
  return this.minClusterSize_;
};

/**
 * Sets the value of the <code>minimumClusterSize</code> property.
 *
 * @param {number} minimumClusterSize The minimum cluster size.
 */
MarkerClusterer.prototype.setMinimumClusterSize = function (minimumClusterSize) {
  this.minClusterSize_ = minimumClusterSize;
};


/**
 *  Returns the value of the <code>maxZoom</code> property.
 *
 *  @return {number} The maximum zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function () {
  return this.maxZoom_;
};


/**
 *  Sets the value of the <code>maxZoom</code> property.
 *
 *  @param {number} maxZoom The maximum zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
  this.maxZoom_ = maxZoom;
};


/**
 *  Returns the value of the <code>styles</code> property.
 *
 *  @return {Array} The array of styles defining the cluster markers to be used.
 */
MarkerClusterer.prototype.getStyles = function () {
  return this.styles_;
};


/**
 *  Sets the value of the <code>styles</code> property.
 *
 *  @param {Array.<ClusterIconStyle>} styles The array of styles to use.
 */
MarkerClusterer.prototype.setStyles = function (styles) {
  this.styles_ = styles;
};


/**
 * Returns the value of the <code>title</code> property.
 *
 * @return {string} The content of the title text.
 */
MarkerClusterer.prototype.getTitle = function () {
  return this.title_;
};


/**
 *  Sets the value of the <code>title</code> property.
 *
 *  @param {string} title The value of the title property.
 */
MarkerClusterer.prototype.setTitle = function (title) {
  this.title_ = title;
};


/**
 * Returns the value of the <code>zoomOnClick</code> property.
 *
 * @return {boolean} True if zoomOnClick property is set.
 */
MarkerClusterer.prototype.getZoomOnClick = function () {
  return this.zoomOnClick_;
};


/**
 *  Sets the value of the <code>zoomOnClick</code> property.
 *
 *  @param {boolean} zoomOnClick The value of the zoomOnClick property.
 */
MarkerClusterer.prototype.setZoomOnClick = function (zoomOnClick) {
  this.zoomOnClick_ = zoomOnClick;
};


/**
 * Returns the value of the <code>averageCenter</code> property.
 *
 * @return {boolean} True if averageCenter property is set.
 */
MarkerClusterer.prototype.getAverageCenter = function () {
  return this.averageCenter_;
};


/**
 *  Sets the value of the <code>averageCenter</code> property.
 *
 *  @param {boolean} averageCenter The value of the averageCenter property.
 */
MarkerClusterer.prototype.setAverageCenter = function (averageCenter) {
  this.averageCenter_ = averageCenter;
};


/**
 * Returns the value of the <code>ignoreHidden</code> property.
 *
 * @return {boolean} True if ignoreHidden property is set.
 */
MarkerClusterer.prototype.getIgnoreHidden = function () {
  return this.ignoreHidden_;
};


/**
 *  Sets the value of the <code>ignoreHidden</code> property.
 *
 *  @param {boolean} ignoreHidden The value of the ignoreHidden property.
 */
MarkerClusterer.prototype.setIgnoreHidden = function (ignoreHidden) {
  this.ignoreHidden_ = ignoreHidden;
};


/**
 * Returns the value of the <code>enableRetinaIcons</code> property.
 *
 * @return {boolean} True if enableRetinaIcons property is set.
 */
MarkerClusterer.prototype.getEnableRetinaIcons = function () {
  return this.enableRetinaIcons_;
};


/**
 *  Sets the value of the <code>enableRetinaIcons</code> property.
 *
 *  @param {boolean} enableRetinaIcons The value of the enableRetinaIcons property.
 */
MarkerClusterer.prototype.setEnableRetinaIcons = function (enableRetinaIcons) {
  this.enableRetinaIcons_ = enableRetinaIcons;
};


/**
 * Returns the value of the <code>imageExtension</code> property.
 *
 * @return {string} The value of the imageExtension property.
 */
MarkerClusterer.prototype.getImageExtension = function () {
  return this.imageExtension_;
};


/**
 *  Sets the value of the <code>imageExtension</code> property.
 *
 *  @param {string} imageExtension The value of the imageExtension property.
 */
MarkerClusterer.prototype.setImageExtension = function (imageExtension) {
  this.imageExtension_ = imageExtension;
};


/**
 * Returns the value of the <code>imagePath</code> property.
 *
 * @return {string} The value of the imagePath property.
 */
MarkerClusterer.prototype.getImagePath = function () {
  return this.imagePath_;
};


/**
 *  Sets the value of the <code>imagePath</code> property.
 *
 *  @param {string} imagePath The value of the imagePath property.
 */
MarkerClusterer.prototype.setImagePath = function (imagePath) {
  this.imagePath_ = imagePath;
};


/**
 * Returns the value of the <code>imageSizes</code> property.
 *
 * @return {Array} The value of the imageSizes property.
 */
MarkerClusterer.prototype.getImageSizes = function () {
  return this.imageSizes_;
};


/**
 *  Sets the value of the <code>imageSizes</code> property.
 *
 *  @param {Array} imageSizes The value of the imageSizes property.
 */
MarkerClusterer.prototype.setImageSizes = function (imageSizes) {
  this.imageSizes_ = imageSizes;
};


/**
 * Returns the value of the <code>calculator</code> property.
 *
 * @return {function} the value of the calculator property.
 */
MarkerClusterer.prototype.getCalculator = function () {
  return this.calculator_;
};


/**
 * Sets the value of the <code>calculator</code> property.
 *
 * @param {function(Array.<google.maps.Marker>, number)} calculator The value
 *  of the calculator property.
 */
MarkerClusterer.prototype.setCalculator = function (calculator) {
  this.calculator_ = calculator;
};


/**
 * Returns the value of the <code>batchSizeIE</code> property.
 *
 * @return {number} the value of the batchSizeIE property.
 */
MarkerClusterer.prototype.getBatchSizeIE = function () {
  return this.batchSizeIE_;
};


/**
 * Sets the value of the <code>batchSizeIE</code> property.
 *
 *  @param {number} batchSizeIE The value of the batchSizeIE property.
 */
MarkerClusterer.prototype.setBatchSizeIE = function (batchSizeIE) {
  this.batchSizeIE_ = batchSizeIE;
};


/**
 * Returns the value of the <code>clusterClass</code> property.
 *
 * @return {string} the value of the clusterClass property.
 */
MarkerClusterer.prototype.getClusterClass = function () {
  return this.clusterClass_;
};


/**
 * Sets the value of the <code>clusterClass</code> property.
 *
 *  @param {string} clusterClass The value of the clusterClass property.
 */
MarkerClusterer.prototype.setClusterClass = function (clusterClass) {
  this.clusterClass_ = clusterClass;
};


/**
 *  Returns the array of markers managed by the clusterer.
 *
 *  @return {Array} The array of markers managed by the clusterer.
 */
MarkerClusterer.prototype.getMarkers = function () {
  return this.markers_;
};


/**
 *  Returns the number of markers managed by the clusterer.
 *
 *  @return {number} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function () {
  return this.markers_.length;
};


/**
 * Returns the current array of clusters formed by the clusterer.
 *
 * @return {Array} The array of clusters formed by the clusterer.
 */
MarkerClusterer.prototype.getClusters = function () {
  return this.clusters_;
};


/**
 * Returns the number of clusters formed by the clusterer.
 *
 * @return {number} The number of clusters formed by the clusterer.
 */
MarkerClusterer.prototype.getTotalClusters = function () {
  return this.clusters_.length;
};


/**
 * Adds a marker to the clusterer. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 */
MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
  this.pushMarkerTo_(marker);
  if (!opt_nodraw) {
    this.redraw_();
  }
};


/**
 * Adds an array of markers to the clusterer. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 */
MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
  var key;
  for (key in markers) {
    if (markers.hasOwnProperty(key)) {
      this.pushMarkerTo_(markers[key]);
    }
  }  
  if (!opt_nodraw) {
    this.redraw_();
  }
};


/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 */
MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
  // If the marker is draggable add a listener so we can update the clusters on the dragend:
  if (marker.getDraggable()) {
    var cMarkerClusterer = this;
    google.maps.event.addListener(marker, "dragend", function () {
      if (cMarkerClusterer.ready_) {
        this.isAdded = false;
        cMarkerClusterer.repaint();
      }
    });
  }
  marker.isAdded = false;
  this.markers_.push(marker);
};


/**
 * Removes a marker from the cluster.  The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>. Returns <code>true</code> if the
 *  marker was removed from the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 * @return {boolean} True if the marker was removed from the clusterer.
 */
MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
  var removed = this.removeMarker_(marker);

  if (!opt_nodraw && removed) {
    this.repaint();
  }

  return removed;
};


/**
 * Removes an array of markers from the cluster. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>. Returns <code>true</code> if markers
 *  were removed from the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 * @return {boolean} True if markers were removed from the clusterer.
 */
MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
  var i, r;
  var removed = false;

  for (i = 0; i < markers.length; i++) {
    r = this.removeMarker_(markers[i]);
    removed = removed || r;
  }

  if (!opt_nodraw && removed) {
    this.repaint();
  }

  return removed;
};


/**
 * Removes a marker and returns true if removed, false if not.
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 */
MarkerClusterer.prototype.removeMarker_ = function (marker) {
  var i;
  var index = -1;
  if (this.markers_.indexOf) {
    index = this.markers_.indexOf(marker);
  } else {
    for (i = 0; i < this.markers_.length; i++) {
      if (marker === this.markers_[i]) {
        index = i;
        break;
      }
    }
  }

  if (index === -1) {
    // Marker is not in our list of markers, so do nothing:
    return false;
  }

  marker.setMap(null);
  this.markers_.splice(index, 1); // Remove the marker from the list of managed markers
  return true;
};


/**
 * Removes all clusters and markers from the map and also removes all markers
 *  managed by the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function () {
  this.resetViewport_(true);
  this.markers_ = [];
};


/**
 * Recalculates and redraws all the marker clusters from scratch.
 *  Call this after changing any properties.
 */
MarkerClusterer.prototype.repaint = function () {
  var oldClusters = this.clusters_.slice();
  this.clusters_ = [];
  this.resetViewport_(false);
  this.redraw_();

  // Remove the old clusters.
  // Do it in a timeout to prevent blinking effect.
  setTimeout(function () {
    var i;
    for (i = 0; i < oldClusters.length; i++) {
      oldClusters[i].remove();
    }
  }, 0);
};


/**
 * Returns the current bounds extended by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 * @ignore
 */
MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
  var projection = this.getProjection();

  // Turn the bounds into latlng.
  var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
      bounds.getNorthEast().lng());
  var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
      bounds.getSouthWest().lng());

  // Convert the points to pixels and the extend out by the grid size.
  var trPix = projection.fromLatLngToDivPixel(tr);
  trPix.x += this.gridSize_;
  trPix.y -= this.gridSize_;

  var blPix = projection.fromLatLngToDivPixel(bl);
  blPix.x -= this.gridSize_;
  blPix.y += this.gridSize_;

  // Convert the pixel points back to LatLng
  var ne = projection.fromDivPixelToLatLng(trPix);
  var sw = projection.fromDivPixelToLatLng(blPix);

  // Extend the bounds to contain the new bounds.
  bounds.extend(ne);
  bounds.extend(sw);

  return bounds;
};


/**
 * Redraws all the clusters.
 */
MarkerClusterer.prototype.redraw_ = function () {
  this.createClusters_(0);
};


/**
 * Removes all clusters from the map. The markers are also removed from the map
 *  if <code>opt_hide</code> is set to <code>true</code>.
 *
 * @param {boolean} [opt_hide] Set to <code>true</code> to also remove the markers
 *  from the map.
 */
MarkerClusterer.prototype.resetViewport_ = function (opt_hide) {
  var i, marker;
  // Remove all the clusters
  for (i = 0; i < this.clusters_.length; i++) {
    this.clusters_[i].remove();
  }
  this.clusters_ = [];

  // Reset the markers to not be added and to be removed from the map.
  for (i = 0; i < this.markers_.length; i++) {
    marker = this.markers_[i];
    marker.isAdded = false;
    if (opt_hide) {
      marker.setMap(null);
    }
  }
};


/**
 * Calculates the distance between two latlng locations in km.
 *
 * @param {google.maps.LatLng} p1 The first lat lng point.
 * @param {google.maps.LatLng} p2 The second lat lng point.
 * @return {number} The distance between the two points in km.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
*/
MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
  var R = 6371; // Radius of the Earth in km
  var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
  var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};


/**
 * Determines if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
  return bounds.contains(marker.getPosition());
};


/**
 * Adds a marker to a cluster, or creates a new cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 */
MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
  var i, d, cluster, center;
  var distance = 40000; // Some large number
  var clusterToAddTo = null;
  for (i = 0; i < this.clusters_.length; i++) {
    cluster = this.clusters_[i];
    center = cluster.getCenter();
    if (center) {
      d = this.distanceBetweenPoints_(center, marker.getPosition());
      if (d < distance) {
        distance = d;
        clusterToAddTo = cluster;
      }
    }
  }

  if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
    clusterToAddTo.addMarker(marker);
  } else {
    cluster = new Cluster(this);
    cluster.addMarker(marker);
    this.clusters_.push(cluster);
  }
};


/**
 * Creates the clusters. This is done in batches to avoid timeout errors
 *  in some browsers when there is a huge number of markers.
 *
 * @param {number} iFirst The index of the first marker in the batch of
 *  markers to be added to clusters.
 */
MarkerClusterer.prototype.createClusters_ = function (iFirst) {
  var i, marker;
  var mapBounds;
  var cMarkerClusterer = this;
  if (!this.ready_) {
    return;
  }

  // Cancel previous batch processing if we're working on the first batch:
  if (iFirst === 0) {
    /**
     * This event is fired when the <code>MarkerClusterer</code> begins
     *  clustering markers.
     * @name MarkerClusterer#clusteringbegin
     * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
     * @event
     */
    google.maps.event.trigger(this, "clusteringbegin", this);

    if (typeof this.timerRefStatic !== "undefined") {
      clearTimeout(this.timerRefStatic);
      delete this.timerRefStatic;
    }
  }

  // Get our current map view bounds.
  // Create a new bounds object so we don't affect the map.
  //
  // See Comments 9 & 11 on Issue 3651 relating to this workaround for a Google Maps bug:
  if (this.getMap().getZoom() > 3) {
    mapBounds = new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(),
      this.getMap().getBounds().getNorthEast());
  } else {
    mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
  }
  var bounds = this.getExtendedBounds(mapBounds);

  var iLast = Math.min(iFirst + this.batchSize_, this.markers_.length);

  for (i = iFirst; i < iLast; i++) {
    marker = this.markers_[i];
    if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
      if (!this.ignoreHidden_ || (this.ignoreHidden_ && marker.getVisible())) {
        this.addToClosestCluster_(marker);
      }
    }
  }

  if (iLast < this.markers_.length) {
    this.timerRefStatic = setTimeout(function () {
      cMarkerClusterer.createClusters_(iLast);
    }, 0);
  } else {
    delete this.timerRefStatic;

    /**
     * This event is fired when the <code>MarkerClusterer</code> stops
     *  clustering markers.
     * @name MarkerClusterer#clusteringend
     * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
     * @event
     */
    google.maps.event.trigger(this, "clusteringend", this);
  }
};


/**
 * Extends an object's prototype by another's.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function (obj1, obj2) {
  return (function (object) {
    var property;
    for (property in object.prototype) {
      this.prototype[property] = object.prototype[property];
    }
    return this;
  }).apply(obj1, [obj2]);
};


/**
 * The default function for determining the label text and style
 * for a cluster icon.
 *
 * @param {Array.<google.maps.Marker>} markers The array of markers represented by the cluster.
 * @param {number} numStyles The number of marker styles available.
 * @return {ClusterIconInfo} The information resource for the cluster.
 * @constant
 * @ignore
 */
MarkerClusterer.CALCULATOR = function (markers, numStyles) {
  var index = 0;
  var title = "";
  var count = markers.length.toString();

  var dv = count;
  while (dv !== 0) {
    dv = parseInt(dv / 10, 10);
    index++;
  }

  index = Math.min(index, numStyles);
  return {
    text: count,
    index: index,
    title: title
  };
};


/**
 * The number of markers to process in one batch.
 *
 * @type {number}
 * @constant
 */
MarkerClusterer.BATCH_SIZE = 2000;


/**
 * The number of markers to process in one batch (IE only).
 *
 * @type {number}
 * @constant
 */
MarkerClusterer.BATCH_SIZE_IE = 500;


/**
 * The default root name for the marker cluster images.
 *
 * @type {string}
 * @constant
 */
MarkerClusterer.IMAGE_PATH = "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/images/m";


/**
 * The default extension name for the marker cluster images.
 *
 * @type {string}
 * @constant
 */
MarkerClusterer.IMAGE_EXTENSION = "png";


/**
 * The default array of sizes for the marker cluster images.
 *
 * @type {Array.<number>}
 * @constant
 */
MarkerClusterer.IMAGE_SIZES = [53, 56, 66, 78, 90];

/**
 * @name MarkerWithLabel for V3
 * @version 1.1.10 [April 8, 2014]
 * @author Gary Little (inspired by code from Marc Ridey of Google).
 * @copyright Copyright 2012 Gary Little [gary at luxcentral.com]
 * @fileoverview MarkerWithLabel extends the Google Maps JavaScript API V3
 *  <code>google.maps.Marker</code> class.
 *  <p>
 *  MarkerWithLabel allows you to define markers with associated labels. As you would expect,
 *  if the marker is draggable, so too will be the label. In addition, a marker with a label
 *  responds to all mouse events in the same manner as a regular marker. It also fires mouse
 *  events and "property changed" events just as a regular marker would. Version 1.1 adds
 *  support for the raiseOnDrag feature introduced in API V3.3.
 *  <p>
 *  If you drag a marker by its label, you can cancel the drag and return the marker to its
 *  original position by pressing the <code>Esc</code> key. This doesn't work if you drag the marker
 *  itself because this feature is not (yet) supported in the <code>google.maps.Marker</code> class.
 */

/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jslint browser:true */
/*global document,google */

/**
 * @param {Function} childCtor Child class.
 * @param {Function} parentCtor Parent class.
 * @private
 */
function inherits(childCtor, parentCtor) {
  /* @constructor */
  function tempCtor() {}
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /* @override */
  childCtor.prototype.constructor = childCtor;
}

/**
 * This constructor creates a label and associates it with a marker.
 * It is for the private use of the MarkerWithLabel class.
 * @constructor
 * @param {Marker} marker The marker with which the label is to be associated.
 * @param {string} crossURL The URL of the cross image =.
 * @param {string} handCursor The URL of the hand cursor.
 * @private
 */
function MarkerLabel_(marker, crossURL, handCursorURL) {
  this.marker_ = marker;
  this.handCursorURL_ = marker.handCursorURL;

  this.labelDiv_ = document.createElement("div");
  this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;";

  // Set up the DIV for handling mouse events in the label. This DIV forms a transparent veil
  // in the "overlayMouseTarget" pane, a veil that covers just the label. This is done so that
  // events can be captured even if the label is in the shadow of a google.maps.InfoWindow.
  // Code is included here to ensure the veil is always exactly the same size as the label.
  this.eventDiv_ = document.createElement("div");
  this.eventDiv_.style.cssText = this.labelDiv_.style.cssText;

  // This is needed for proper behavior on MSIE:
  this.eventDiv_.setAttribute("onselectstart", "return false;");
  this.eventDiv_.setAttribute("ondragstart", "return false;");

  // Get the DIV for the "X" to be displayed when the marker is raised.
  this.crossDiv_ = MarkerLabel_.getSharedCross(crossURL);
}

inherits(MarkerLabel_, google.maps.OverlayView);

/**
 * Returns the DIV for the cross used when dragging a marker when the
 * raiseOnDrag parameter set to true. One cross is shared with all markers.
 * @param {string} crossURL The URL of the cross image =.
 * @private
 */
MarkerLabel_.getSharedCross = function (crossURL) {
  var div;
  if (typeof MarkerLabel_.getSharedCross.crossDiv === "undefined") {
    div = document.createElement("img");
    div.style.cssText = "position: absolute; z-index: 1000002; display: none;";
    // Hopefully Google never changes the standard "X" attributes:
    div.style.marginLeft = "-8px";
    div.style.marginTop = "-9px";
    div.src = crossURL;
    MarkerLabel_.getSharedCross.crossDiv = div;
  }
  return MarkerLabel_.getSharedCross.crossDiv;
};

/**
 * Adds the DIV representing the label to the DOM. This method is called
 * automatically when the marker's <code>setMap</code> method is called.
 * @private
 */
MarkerLabel_.prototype.onAdd = function () {
  var me = this;
  var cMouseIsDown = false;
  var cDraggingLabel = false;
  var cSavedZIndex;
  var cLatOffset, cLngOffset;
  var cIgnoreClick;
  var cRaiseEnabled;
  var cStartPosition;
  var cStartCenter;
  // Constants:
  var cRaiseOffset = 20;
  var cDraggingCursor = "url(" + this.handCursorURL_ + ")";

  // Stops all processing of an event.
  //
  var cAbortEvent = function (e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.cancelBubble = true;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  var cStopBounce = function () {
    me.marker_.setAnimation(null);
  };

  this.getPanes().overlayImage.appendChild(this.labelDiv_);
  this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_);
  // One cross is shared with all markers, so only add it once:
  if (typeof MarkerLabel_.getSharedCross.processed === "undefined") {
    this.getPanes().overlayImage.appendChild(this.crossDiv_);
    MarkerLabel_.getSharedCross.processed = true;
  }

  this.listeners_ = [
    google.maps.event.addDomListener(this.eventDiv_, "mouseover", function (e) {
      if (me.marker_.getDraggable() || me.marker_.getClickable()) {
        this.style.cursor = "pointer";
        google.maps.event.trigger(me.marker_, "mouseover", e);
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "mouseout", function (e) {
      if ((me.marker_.getDraggable() || me.marker_.getClickable()) && !cDraggingLabel) {
        this.style.cursor = me.marker_.getCursor();
        google.maps.event.trigger(me.marker_, "mouseout", e);
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "mousedown", function (e) {
      cDraggingLabel = false;
      if (me.marker_.getDraggable()) {
        cMouseIsDown = true;
        this.style.cursor = cDraggingCursor;
      }
      if (me.marker_.getDraggable() || me.marker_.getClickable()) {
        google.maps.event.trigger(me.marker_, "mousedown", e);
        cAbortEvent(e); // Prevent map pan when starting a drag on a label
      }
    }),
    google.maps.event.addDomListener(document, "mouseup", function (mEvent) {
      var position;
      if (cMouseIsDown) {
        cMouseIsDown = false;
        me.eventDiv_.style.cursor = "pointer";
        google.maps.event.trigger(me.marker_, "mouseup", mEvent);
      }
      if (cDraggingLabel) {
        if (cRaiseEnabled) { // Lower the marker & label
          position = me.getProjection().fromLatLngToDivPixel(me.marker_.getPosition());
          position.y += cRaiseOffset;
          me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));
          // This is not the same bouncing style as when the marker portion is dragged,
          // but it will have to do:
          try { // Will fail if running Google Maps API earlier than V3.3
            me.marker_.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(cStopBounce, 1406);
          } catch (e) {}
        }
        me.crossDiv_.style.display = "none";
        me.marker_.setZIndex(cSavedZIndex);
        cIgnoreClick = true; // Set flag to ignore the click event reported after a label drag
        cDraggingLabel = false;
        mEvent.latLng = me.marker_.getPosition();
        google.maps.event.trigger(me.marker_, "dragend", mEvent);
      }
    }),
    google.maps.event.addListener(me.marker_.getMap(), "mousemove", function (mEvent) {
      var position;
      if (cMouseIsDown) {
        if (cDraggingLabel) {
          // Change the reported location from the mouse position to the marker position:
          mEvent.latLng = new google.maps.LatLng(mEvent.latLng.lat() - cLatOffset, mEvent.latLng.lng() - cLngOffset);
          position = me.getProjection().fromLatLngToDivPixel(mEvent.latLng);
          if (cRaiseEnabled) {
            me.crossDiv_.style.left = position.x + "px";
            me.crossDiv_.style.top = position.y + "px";
            me.crossDiv_.style.display = "";
            position.y -= cRaiseOffset;
          }
          me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));
          if (cRaiseEnabled) { // Don't raise the veil; this hack needed to make MSIE act properly
            me.eventDiv_.style.top = (position.y + cRaiseOffset) + "px";
          }
          google.maps.event.trigger(me.marker_, "drag", mEvent);
        } else {
          // Calculate offsets from the click point to the marker position:
          cLatOffset = mEvent.latLng.lat() - me.marker_.getPosition().lat();
          cLngOffset = mEvent.latLng.lng() - me.marker_.getPosition().lng();
          cSavedZIndex = me.marker_.getZIndex();
          cStartPosition = me.marker_.getPosition();
          cStartCenter = me.marker_.getMap().getCenter();
          cRaiseEnabled = me.marker_.get("raiseOnDrag");
          cDraggingLabel = true;
          me.marker_.setZIndex(1000000); // Moves the marker & label to the foreground during a drag
          mEvent.latLng = me.marker_.getPosition();
          google.maps.event.trigger(me.marker_, "dragstart", mEvent);
        }
      }
    }),
    google.maps.event.addDomListener(document, "keydown", function (e) {
      if (cDraggingLabel) {
        if (e.keyCode === 27) { // Esc key
          cRaiseEnabled = false;
          me.marker_.setPosition(cStartPosition);
          me.marker_.getMap().setCenter(cStartCenter);
          google.maps.event.trigger(document, "mouseup", e);
        }
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "click", function (e) {
      if (me.marker_.getDraggable() || me.marker_.getClickable()) {
        if (cIgnoreClick) { // Ignore the click reported when a label drag ends
          cIgnoreClick = false;
        } else {
          google.maps.event.trigger(me.marker_, "click", e);
          cAbortEvent(e); // Prevent click from being passed on to map
        }
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "dblclick", function (e) {
      if (me.marker_.getDraggable() || me.marker_.getClickable()) {
        google.maps.event.trigger(me.marker_, "dblclick", e);
        cAbortEvent(e); // Prevent map zoom when double-clicking on a label
      }
    }),
    google.maps.event.addListener(this.marker_, "dragstart", function (mEvent) {
      if (!cDraggingLabel) {
        cRaiseEnabled = this.get("raiseOnDrag");
      }
    }),
    google.maps.event.addListener(this.marker_, "drag", function (mEvent) {
      if (!cDraggingLabel) {
        if (cRaiseEnabled) {
          me.setPosition(cRaiseOffset);
          // During a drag, the marker's z-index is temporarily set to 1000000 to
          // ensure it appears above all other markers. Also set the label's z-index
          // to 1000000 (plus or minus 1 depending on whether the label is supposed
          // to be above or below the marker).
          me.labelDiv_.style.zIndex = 1000000 + (this.get("labelInBackground") ? -1 : +1);
        }
      }
    }),
    google.maps.event.addListener(this.marker_, "dragend", function (mEvent) {
      if (!cDraggingLabel) {
        if (cRaiseEnabled) {
          me.setPosition(0); // Also restores z-index of label
        }
      }
    }),
    google.maps.event.addListener(this.marker_, "position_changed", function () {
      me.setPosition();
    }),
    google.maps.event.addListener(this.marker_, "zindex_changed", function () {
      me.setZIndex();
    }),
    google.maps.event.addListener(this.marker_, "visible_changed", function () {
      me.setVisible();
    }),
    google.maps.event.addListener(this.marker_, "labelvisible_changed", function () {
      me.setVisible();
    }),
    google.maps.event.addListener(this.marker_, "title_changed", function () {
      me.setTitle();
    }),
    google.maps.event.addListener(this.marker_, "labelcontent_changed", function () {
      me.setContent();
    }),
    google.maps.event.addListener(this.marker_, "labelanchor_changed", function () {
      me.setAnchor();
    }),
    google.maps.event.addListener(this.marker_, "labelclass_changed", function () {
      me.setStyles();
    }),
    google.maps.event.addListener(this.marker_, "labelstyle_changed", function () {
      me.setStyles();
    })
  ];
};

/**
 * Removes the DIV for the label from the DOM. It also removes all event handlers.
 * This method is called automatically when the marker's <code>setMap(null)</code>
 * method is called.
 * @private
 */
MarkerLabel_.prototype.onRemove = function () {
  var i;
  this.labelDiv_.parentNode.removeChild(this.labelDiv_);
  this.eventDiv_.parentNode.removeChild(this.eventDiv_);

  // Remove event listeners:
  for (i = 0; i < this.listeners_.length; i++) {
    google.maps.event.removeListener(this.listeners_[i]);
  }
};

/**
 * Draws the label on the map.
 * @private
 */
MarkerLabel_.prototype.draw = function () {
  this.setContent();
  this.setTitle();
  this.setStyles();
};

/**
 * Sets the content of the label.
 * The content can be plain text or an HTML DOM node.
 * @private
 */
MarkerLabel_.prototype.setContent = function () {
  var content = this.marker_.get("labelContent");
  if (typeof content.nodeType === "undefined") {
    this.labelDiv_.innerHTML = content;
    this.eventDiv_.innerHTML = this.labelDiv_.innerHTML;
  } else {
    this.labelDiv_.innerHTML = ""; // Remove current content
    this.labelDiv_.appendChild(content);
    content = content.cloneNode(true);
    this.eventDiv_.innerHTML = ""; // Remove current content
    this.eventDiv_.appendChild(content);
  }
};

/**
 * Sets the content of the tool tip for the label. It is
 * always set to be the same as for the marker itself.
 * @private
 */
MarkerLabel_.prototype.setTitle = function () {
  this.eventDiv_.title = this.marker_.getTitle() || "";
};

/**
 * Sets the style of the label by setting the style sheet and applying
 * other specific styles requested.
 * @private
 */
MarkerLabel_.prototype.setStyles = function () {
  var i, labelStyle;

  // Apply style values from the style sheet defined in the labelClass parameter:
  this.labelDiv_.className = this.marker_.get("labelClass");
  this.eventDiv_.className = this.labelDiv_.className;

  // Clear existing inline style values:
  this.labelDiv_.style.cssText = "";
  this.eventDiv_.style.cssText = "";
  // Apply style values defined in the labelStyle parameter:
  labelStyle = this.marker_.get("labelStyle");
  for (i in labelStyle) {
    if (labelStyle.hasOwnProperty(i)) {
      this.labelDiv_.style[i] = labelStyle[i];
      this.eventDiv_.style[i] = labelStyle[i];
    }
  }
  this.setMandatoryStyles();
};

/**
 * Sets the mandatory styles to the DIV representing the label as well as to the
 * associated event DIV. This includes setting the DIV position, z-index, and visibility.
 * @private
 */
MarkerLabel_.prototype.setMandatoryStyles = function () {
  this.labelDiv_.style.position = "absolute";
  this.labelDiv_.style.overflow = "hidden";
  // Make sure the opacity setting causes the desired effect on MSIE:
  if (typeof this.labelDiv_.style.opacity !== "undefined" && this.labelDiv_.style.opacity !== "") {
    this.labelDiv_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(opacity=" + (this.labelDiv_.style.opacity * 100) + ")\"";
    this.labelDiv_.style.filter = "alpha(opacity=" + (this.labelDiv_.style.opacity * 100) + ")";
  }

  this.eventDiv_.style.position = this.labelDiv_.style.position;
  this.eventDiv_.style.overflow = this.labelDiv_.style.overflow;
  this.eventDiv_.style.opacity = 0.01; // Don't use 0; DIV won't be clickable on MSIE
  this.eventDiv_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(opacity=1)\"";
  this.eventDiv_.style.filter = "alpha(opacity=1)"; // For MSIE

  this.setAnchor();
  this.setPosition(); // This also updates z-index, if necessary.
  this.setVisible();
};

/**
 * Sets the anchor point of the label.
 * @private
 */
MarkerLabel_.prototype.setAnchor = function () {
  var anchor = this.marker_.get("labelAnchor");
  this.labelDiv_.style.marginLeft = -anchor.x + "px";
  this.labelDiv_.style.marginTop = -anchor.y + "px";
  this.eventDiv_.style.marginLeft = -anchor.x + "px";
  this.eventDiv_.style.marginTop = -anchor.y + "px";
};

/**
 * Sets the position of the label. The z-index is also updated, if necessary.
 * @private
 */
MarkerLabel_.prototype.setPosition = function (yOffset) {
  var position = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
  if (typeof yOffset === "undefined") {
    yOffset = 0;
  }
  this.labelDiv_.style.left = Math.round(position.x) + "px";
  this.labelDiv_.style.top = Math.round(position.y - yOffset) + "px";
  this.eventDiv_.style.left = this.labelDiv_.style.left;
  this.eventDiv_.style.top = this.labelDiv_.style.top;

  this.setZIndex();
};

/**
 * Sets the z-index of the label. If the marker's z-index property has not been defined, the z-index
 * of the label is set to the vertical coordinate of the label. This is in keeping with the default
 * stacking order for Google Maps: markers to the south are in front of markers to the north.
 * @private
 */
MarkerLabel_.prototype.setZIndex = function () {
  var zAdjust = (this.marker_.get("labelInBackground") ? -1 : +1);
  if (typeof this.marker_.getZIndex() === "undefined") {
    this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + zAdjust;
    this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
  } else {
    this.labelDiv_.style.zIndex = this.marker_.getZIndex() + zAdjust;
    this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
  }
};

/**
 * Sets the visibility of the label. The label is visible only if the marker itself is
 * visible (i.e., its visible property is true) and the labelVisible property is true.
 * @private
 */
MarkerLabel_.prototype.setVisible = function () {
  if (this.marker_.get("labelVisible")) {
    this.labelDiv_.style.display = this.marker_.getVisible() ? "block" : "none";
  } else {
    this.labelDiv_.style.display = "none";
  }
  this.eventDiv_.style.display = this.labelDiv_.style.display;
};

/**
 * @name MarkerWithLabelOptions
 * @class This class represents the optional parameter passed to the {@link MarkerWithLabel} constructor.
 *  The properties available are the same as for <code>google.maps.Marker</code> with the addition
 *  of the properties listed below. To change any of these additional properties after the labeled
 *  marker has been created, call <code>google.maps.Marker.set(propertyName, propertyValue)</code>.
 *  <p>
 *  When any of these properties changes, a property changed event is fired. The names of these
 *  events are derived from the name of the property and are of the form <code>propertyname_changed</code>.
 *  For example, if the content of the label changes, a <code>labelcontent_changed</code> event
 *  is fired.
 *  <p>
 * @property {string|Node} [labelContent] The content of the label (plain text or an HTML DOM node).
 * @property {Point} [labelAnchor] By default, a label is drawn with its anchor point at (0,0) so
 *  that its top left corner is positioned at the anchor point of the associated marker. Use this
 *  property to change the anchor point of the label. For example, to center a 50px-wide label
 *  beneath a marker, specify a <code>labelAnchor</code> of <code>google.maps.Point(25, 0)</code>.
 *  (Note: x-values increase to the right and y-values increase to the top.)
 * @property {string} [labelClass] The name of the CSS class defining the styles for the label.
 *  Note that style values for <code>position</code>, <code>overflow</code>, <code>top</code>,
 *  <code>left</code>, <code>zIndex</code>, <code>display</code>, <code>marginLeft</code>, and
 *  <code>marginTop</code> are ignored; these styles are for internal use only.
 * @property {Object} [labelStyle] An object literal whose properties define specific CSS
 *  style values to be applied to the label. Style values defined here override those that may
 *  be defined in the <code>labelClass</code> style sheet. If this property is changed after the
 *  label has been created, all previously set styles (except those defined in the style sheet)
 *  are removed from the label before the new style values are applied.
 *  Note that style values for <code>position</code>, <code>overflow</code>, <code>top</code>,
 *  <code>left</code>, <code>zIndex</code>, <code>display</code>, <code>marginLeft</code>, and
 *  <code>marginTop</code> are ignored; these styles are for internal use only.
 * @property {boolean} [labelInBackground] A flag indicating whether a label that overlaps its
 *  associated marker should appear in the background (i.e., in a plane below the marker).
 *  The default is <code>false</code>, which causes the label to appear in the foreground.
 * @property {boolean} [labelVisible] A flag indicating whether the label is to be visible.
 *  The default is <code>true</code>. Note that even if <code>labelVisible</code> is
 *  <code>true</code>, the label will <i>not</i> be visible unless the associated marker is also
 *  visible (i.e., unless the marker's <code>visible</code> property is <code>true</code>).
 * @property {boolean} [raiseOnDrag] A flag indicating whether the label and marker are to be
 *  raised when the marker is dragged. The default is <code>true</code>. If a draggable marker is
 *  being created and a version of Google Maps API earlier than V3.3 is being used, this property
 *  must be set to <code>false</code>.
 * @property {boolean} [optimized] A flag indicating whether rendering is to be optimized for the
 *  marker. <b>Important: The optimized rendering technique is not supported by MarkerWithLabel,
 *  so the value of this parameter is always forced to <code>false</code>.
 * @property {string} [crossImage="http://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png"]
 *  The URL of the cross image to be displayed while dragging a marker.
 * @property {string} [handCursor="http://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur"]
 *  The URL of the cursor to be displayed while dragging a marker.
 */
/**
 * Creates a MarkerWithLabel with the options specified in {@link MarkerWithLabelOptions}.
 * @constructor
 * @param {MarkerWithLabelOptions} [opt_options] The optional parameters.
 */
function MarkerWithLabel(opt_options) {
  opt_options = opt_options || {};
  opt_options.labelContent = opt_options.labelContent || "";
  opt_options.labelAnchor = opt_options.labelAnchor || new google.maps.Point(0, 0);
  opt_options.labelClass = opt_options.labelClass || "markerLabels";
  opt_options.labelStyle = opt_options.labelStyle || {};
  opt_options.labelInBackground = opt_options.labelInBackground || false;
  if (typeof opt_options.labelVisible === "undefined") {
    opt_options.labelVisible = true;
  }
  if (typeof opt_options.raiseOnDrag === "undefined") {
    opt_options.raiseOnDrag = true;
  }
  if (typeof opt_options.clickable === "undefined") {
    opt_options.clickable = true;
  }
  if (typeof opt_options.draggable === "undefined") {
    opt_options.draggable = false;
  }
  if (typeof opt_options.optimized === "undefined") {
    opt_options.optimized = false;
  }
  opt_options.crossImage = opt_options.crossImage || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png";
  opt_options.handCursor = opt_options.handCursor || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur";
  opt_options.optimized = false; // Optimized rendering is not supported

  this.label = new MarkerLabel_(this, opt_options.crossImage, opt_options.handCursor); // Bind the label to the marker

  // Call the parent constructor. It calls Marker.setValues to initialize, so all
  // the new parameters are conveniently saved and can be accessed with get/set.
  // Marker.set triggers a property changed event (called "propertyname_changed")
  // that the marker label listens for in order to react to state changes.
  google.maps.Marker.apply(this, arguments);
}

inherits(MarkerWithLabel, google.maps.Marker);

/**
 * Overrides the standard Marker setMap function.
 * @param {Map} theMap The map to which the marker is to be added.
 * @private
 */
MarkerWithLabel.prototype.setMap = function (theMap) {

  // Call the inherited function...
  google.maps.Marker.prototype.setMap.apply(this, arguments);

  // ... then deal with the label:
  this.label.setMap(theMap);
};

      //END REPLACE
      window.InfoBox = InfoBox;
      window.Cluster = Cluster;
      window.ClusterIcon = ClusterIcon;
      window.MarkerClusterer = MarkerClusterer;
      window.MarkerLabel_ = MarkerLabel_;
      window.MarkerWithLabel = MarkerWithLabel;
    })
  };
});
;/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	angular.module('uiGmapgoogle-maps.wrapped')
	.service('uiGmapDataStructures', function() {
	return {
	  Graph: __webpack_require__(1).Graph,
	  Queue: __webpack_require__(1).Queue
	};
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  module.exports = {
	    Graph: __webpack_require__(2),
	    Heap: __webpack_require__(3),
	    LinkedList: __webpack_require__(4),
	    Map: __webpack_require__(5),
	    Queue: __webpack_require__(6),
	    RedBlackTree: __webpack_require__(7),
	    Trie: __webpack_require__(8)
	  };

	}).call(this);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Graph implemented as a modified incidence list. O(1) for every typical
	operation except `removeNode()` at O(E) where E is the number of edges.

	## Overview example:

	```js
	var graph = new Graph;
	graph.addNode('A'); // => a node object. For more info, log the output or check
	                    // the documentation for addNode
	graph.addNode('B');
	graph.addNode('C');
	graph.addEdge('A', 'C'); // => an edge object
	graph.addEdge('A', 'B');
	graph.getEdge('B', 'A'); // => undefined. Directed edge!
	graph.getEdge('A', 'B'); // => the edge object previously added
	graph.getEdge('A', 'B').weight = 2 // weight is the only built-in handy property
	                                   // of an edge object. Feel free to attach
	                                   // other properties
	graph.getInEdgesOf('B'); // => array of edge objects, in this case only one;
	                         // connecting A to B
	graph.getOutEdgesOf('A'); // => array of edge objects, one to B and one to C
	graph.getAllEdgesOf('A'); // => all the in and out edges. Edge directed toward
	                          // the node itself are only counted once
	forEachNode(function(nodeObject) {
	  console.log(node);
	});
	forEachEdge(function(edgeObject) {
	  console.log(edgeObject);
	});
	graph.removeNode('C'); // => 'C'. The edge between A and C also removed
	graph.removeEdge('A', 'B'); // => the edge object removed
	```

	## Properties:

	- nodeSize: total number of nodes.
	- edgeSize: total number of edges.
	*/


	(function() {
	  var Graph,
	    __hasProp = {}.hasOwnProperty;

	  Graph = (function() {
	    function Graph() {
	      this._nodes = {};
	      this.nodeSize = 0;
	      this.edgeSize = 0;
	    }

	    Graph.prototype.addNode = function(id) {
	      /*
	      The `id` is a unique identifier for the node, and should **not** change
	      after it's added. It will be used for adding, retrieving and deleting
	      related edges too.
	      
	      **Note** that, internally, the ids are kept in an object. JavaScript's
	      object hashes the id `'2'` and `2` to the same key, so please stick to a
	      simple id data type such as number or string.
	      
	      _Returns:_ the node object. Feel free to attach additional custom properties
	      on it for graph algorithms' needs. **Undefined if node id already exists**,
	      as to avoid accidental overrides.
	      */

	      if (!this._nodes[id]) {
	        this.nodeSize++;
	        return this._nodes[id] = {
	          _outEdges: {},
	          _inEdges: {}
	        };
	      }
	    };

	    Graph.prototype.getNode = function(id) {
	      /*
	      _Returns:_ the node object. Feel free to attach additional custom properties
	      on it for graph algorithms' needs.
	      */

	      return this._nodes[id];
	    };

	    Graph.prototype.removeNode = function(id) {
	      /*
	      _Returns:_ the node object removed, or undefined if it didn't exist in the
	      first place.
	      */

	      var inEdgeId, nodeToRemove, outEdgeId, _ref, _ref1;
	      nodeToRemove = this._nodes[id];
	      if (!nodeToRemove) {
	        return;
	      } else {
	        _ref = nodeToRemove._outEdges;
	        for (outEdgeId in _ref) {
	          if (!__hasProp.call(_ref, outEdgeId)) continue;
	          this.removeEdge(id, outEdgeId);
	        }
	        _ref1 = nodeToRemove._inEdges;
	        for (inEdgeId in _ref1) {
	          if (!__hasProp.call(_ref1, inEdgeId)) continue;
	          this.removeEdge(inEdgeId, id);
	        }
	        this.nodeSize--;
	        delete this._nodes[id];
	      }
	      return nodeToRemove;
	    };

	    Graph.prototype.addEdge = function(fromId, toId, weight) {
	      var edgeToAdd, fromNode, toNode;
	      if (weight == null) {
	        weight = 1;
	      }
	      /*
	      `fromId` and `toId` are the node id specified when it was created using
	      `addNode()`. `weight` is optional and defaults to 1. Ignoring it effectively
	      makes this an unweighted graph. Under the hood, `weight` is just a normal
	      property of the edge object.
	      
	      _Returns:_ the edge object created. Feel free to attach additional custom
	      properties on it for graph algorithms' needs. **Or undefined** if the nodes
	      of id `fromId` or `toId` aren't found, or if an edge already exists between
	      the two nodes.
	      */

	      if (this.getEdge(fromId, toId)) {
	        return;
	      }
	      fromNode = this._nodes[fromId];
	      toNode = this._nodes[toId];
	      if (!fromNode || !toNode) {
	        return;
	      }
	      edgeToAdd = {
	        weight: weight
	      };
	      fromNode._outEdges[toId] = edgeToAdd;
	      toNode._inEdges[fromId] = edgeToAdd;
	      this.edgeSize++;
	      return edgeToAdd;
	    };

	    Graph.prototype.getEdge = function(fromId, toId) {
	      /*
	      _Returns:_ the edge object, or undefined if the nodes of id `fromId` or
	      `toId` aren't found.
	      */

	      var fromNode, toNode;
	      fromNode = this._nodes[fromId];
	      toNode = this._nodes[toId];
	      if (!fromNode || !toNode) {

	      } else {
	        return fromNode._outEdges[toId];
	      }
	    };

	    Graph.prototype.removeEdge = function(fromId, toId) {
	      /*
	      _Returns:_ the edge object removed, or undefined of edge wasn't found.
	      */

	      var edgeToDelete, fromNode, toNode;
	      fromNode = this._nodes[fromId];
	      toNode = this._nodes[toId];
	      edgeToDelete = this.getEdge(fromId, toId);
	      if (!edgeToDelete) {
	        return;
	      }
	      delete fromNode._outEdges[toId];
	      delete toNode._inEdges[fromId];
	      this.edgeSize--;
	      return edgeToDelete;
	    };

	    Graph.prototype.getInEdgesOf = function(nodeId) {
	      /*
	      _Returns:_ an array of edge objects that are directed toward the node, or
	      empty array if no such edge or node exists.
	      */

	      var fromId, inEdges, toNode, _ref;
	      toNode = this._nodes[nodeId];
	      inEdges = [];
	      _ref = toNode != null ? toNode._inEdges : void 0;
	      for (fromId in _ref) {
	        if (!__hasProp.call(_ref, fromId)) continue;
	        inEdges.push(this.getEdge(fromId, nodeId));
	      }
	      return inEdges;
	    };

	    Graph.prototype.getOutEdgesOf = function(nodeId) {
	      /*
	      _Returns:_ an array of edge objects that go out of the node, or empty array
	      if no such edge or node exists.
	      */

	      var fromNode, outEdges, toId, _ref;
	      fromNode = this._nodes[nodeId];
	      outEdges = [];
	      _ref = fromNode != null ? fromNode._outEdges : void 0;
	      for (toId in _ref) {
	        if (!__hasProp.call(_ref, toId)) continue;
	        outEdges.push(this.getEdge(nodeId, toId));
	      }
	      return outEdges;
	    };

	    Graph.prototype.getAllEdgesOf = function(nodeId) {
	      /*
	      **Note:** not the same as concatenating `getInEdgesOf()` and
	      `getOutEdgesOf()`. Some nodes might have an edge pointing toward itself.
	      This method solves that duplication.
	      
	      _Returns:_ an array of edge objects linked to the node, no matter if they're
	      outgoing or coming. Duplicate edge created by self-pointing nodes are
	      removed. Only one copy stays. Empty array if node has no edge.
	      */

	      var i, inEdges, outEdges, selfEdge, _i, _ref, _ref1;
	      inEdges = this.getInEdgesOf(nodeId);
	      outEdges = this.getOutEdgesOf(nodeId);
	      if (inEdges.length === 0) {
	        return outEdges;
	      }
	      selfEdge = this.getEdge(nodeId, nodeId);
	      for (i = _i = 0, _ref = inEdges.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	        if (inEdges[i] === selfEdge) {
	          _ref1 = [inEdges[inEdges.length - 1], inEdges[i]], inEdges[i] = _ref1[0], inEdges[inEdges.length - 1] = _ref1[1];
	          inEdges.pop();
	          break;
	        }
	      }
	      return inEdges.concat(outEdges);
	    };

	    Graph.prototype.forEachNode = function(operation) {
	      /*
	      Traverse through the graph in an arbitrary manner, visiting each node once.
	      Pass a function of the form `fn(nodeObject, nodeId)`.
	      
	      _Returns:_ undefined.
	      */

	      var nodeId, nodeObject, _ref;
	      _ref = this._nodes;
	      for (nodeId in _ref) {
	        if (!__hasProp.call(_ref, nodeId)) continue;
	        nodeObject = _ref[nodeId];
	        operation(nodeObject, nodeId);
	      }
	    };

	    Graph.prototype.forEachEdge = function(operation) {
	      /*
	      Traverse through the graph in an arbitrary manner, visiting each edge once.
	      Pass a function of the form `fn(edgeObject)`.
	      
	      _Returns:_ undefined.
	      */

	      var edgeObject, nodeId, nodeObject, toId, _ref, _ref1;
	      _ref = this._nodes;
	      for (nodeId in _ref) {
	        if (!__hasProp.call(_ref, nodeId)) continue;
	        nodeObject = _ref[nodeId];
	        _ref1 = nodeObject._outEdges;
	        for (toId in _ref1) {
	          if (!__hasProp.call(_ref1, toId)) continue;
	          edgeObject = _ref1[toId];
	          operation(edgeObject);
	        }
	      }
	    };

	    return Graph;

	  })();

	  module.exports = Graph;

	}).call(this);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Minimum heap, i.e. smallest node at root.

	**Note:** does not accept null or undefined. This is by design. Those values
	cause comparison problems and might report false negative during extraction.

	## Overview example:

	```js
	var heap = new Heap([5, 6, 3, 4]);
	heap.add(10); // => 10
	heap.removeMin(); // => 3
	heap.peekMin(); // => 4
	```

	## Properties:

	- size: total number of items.
	*/


	(function() {
	  var Heap, _leftChild, _parent, _rightChild;

	  Heap = (function() {
	    function Heap(dataToHeapify) {
	      var i, item, _i, _j, _len, _ref;
	      if (dataToHeapify == null) {
	        dataToHeapify = [];
	      }
	      /*
	      Pass an optional array to be heapified. Takes only O(n) time.
	      */

	      this._data = [void 0];
	      for (_i = 0, _len = dataToHeapify.length; _i < _len; _i++) {
	        item = dataToHeapify[_i];
	        if (item != null) {
	          this._data.push(item);
	        }
	      }
	      if (this._data.length > 1) {
	        for (i = _j = 2, _ref = this._data.length; 2 <= _ref ? _j < _ref : _j > _ref; i = 2 <= _ref ? ++_j : --_j) {
	          this._upHeap(i);
	        }
	      }
	      this.size = this._data.length - 1;
	    }

	    Heap.prototype.add = function(value) {
	      /*
	      **Remember:** rejects null and undefined for mentioned reasons.
	      
	      _Returns:_ the value added.
	      */

	      if (value == null) {
	        return;
	      }
	      this._data.push(value);
	      this._upHeap(this._data.length - 1);
	      this.size++;
	      return value;
	    };

	    Heap.prototype.removeMin = function() {
	      /*
	      _Returns:_ the smallest item (the root).
	      */

	      var min;
	      if (this._data.length === 1) {
	        return;
	      }
	      this.size--;
	      if (this._data.length === 2) {
	        return this._data.pop();
	      }
	      min = this._data[1];
	      this._data[1] = this._data.pop();
	      this._downHeap();
	      return min;
	    };

	    Heap.prototype.peekMin = function() {
	      /*
	      Check the smallest item without removing it.
	      
	      _Returns:_ the smallest item (the root).
	      */

	      return this._data[1];
	    };

	    Heap.prototype._upHeap = function(index) {
	      var valueHolder, _ref;
	      valueHolder = this._data[index];
	      while (this._data[index] < this._data[_parent(index)] && index > 1) {
	        _ref = [this._data[_parent(index)], this._data[index]], this._data[index] = _ref[0], this._data[_parent(index)] = _ref[1];
	        index = _parent(index);
	      }
	    };

	    Heap.prototype._downHeap = function() {
	      var currentIndex, smallerChildIndex, _ref;
	      currentIndex = 1;
	      while (_leftChild(currentIndex < this._data.length)) {
	        smallerChildIndex = _leftChild(currentIndex);
	        if (smallerChildIndex < this._data.length - 1) {
	          if (this._data[_rightChild(currentIndex)] < this._data[smallerChildIndex]) {
	            smallerChildIndex = _rightChild(currentIndex);
	          }
	        }
	        if (this._data[smallerChildIndex] < this._data[currentIndex]) {
	          _ref = [this._data[currentIndex], this._data[smallerChildIndex]], this._data[smallerChildIndex] = _ref[0], this._data[currentIndex] = _ref[1];
	          currentIndex = smallerChildIndex;
	        } else {
	          break;
	        }
	      }
	    };

	    return Heap;

	  })();

	  _parent = function(index) {
	    return index >> 1;
	  };

	  _leftChild = function(index) {
	    return index << 1;
	  };

	  _rightChild = function(index) {
	    return (index << 1) + 1;
	  };

	  module.exports = Heap;

	}).call(this);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Doubly Linked.

	## Overview example:

	```js
	var list = new LinkedList([5, 4, 9]);
	list.add(12); // => 12
	list.head.next.value; // => 4
	list.tail.value; // => 12
	list.at(-1); // => 12
	list.removeAt(2); // => 9
	list.remove(4); // => 4
	list.indexOf(5); // => 0
	list.add(5, 1); // => 5. Second 5 at position 1.
	list.indexOf(5, 1); // => 1
	```

	## Properties:

	- head: first item.
	- tail: last item.
	- size: total number of items.
	- item.value: value passed to the item when calling `add()`.
	- item.prev: previous item.
	- item.next: next item.
	*/


	(function() {
	  var LinkedList;

	  LinkedList = (function() {
	    function LinkedList(valuesToAdd) {
	      var value, _i, _len;
	      if (valuesToAdd == null) {
	        valuesToAdd = [];
	      }
	      /*
	      Can pass an array of elements to link together during `new LinkedList()`
	      initiation.
	      */

	      this.head = {
	        prev: void 0,
	        value: void 0,
	        next: void 0
	      };
	      this.tail = {
	        prev: void 0,
	        value: void 0,
	        next: void 0
	      };
	      this.size = 0;
	      for (_i = 0, _len = valuesToAdd.length; _i < _len; _i++) {
	        value = valuesToAdd[_i];
	        this.add(value);
	      }
	    }

	    LinkedList.prototype.at = function(position) {
	      /*
	      Get the item at `position` (optional). Accepts negative index:
	      
	      ```js
	      myList.at(-1); // Returns the last element.
	      ```
	      However, passing a negative index that surpasses the boundary will return
	      undefined:
	      
	      ```js
	      myList = new LinkedList([2, 6, 8, 3])
	      myList.at(-5); // Undefined.
	      myList.at(-4); // 2.
	      ```
	      _Returns:_ item gotten, or undefined if not found.
	      */

	      var currentNode, i, _i, _j, _ref;
	      if (!((-this.size <= position && position < this.size))) {
	        return;
	      }
	      position = this._adjust(position);
	      if (position * 2 < this.size) {
	        currentNode = this.head;
	        for (i = _i = 1; _i <= position; i = _i += 1) {
	          currentNode = currentNode.next;
	        }
	      } else {
	        currentNode = this.tail;
	        for (i = _j = 1, _ref = this.size - position - 1; _j <= _ref; i = _j += 1) {
	          currentNode = currentNode.prev;
	        }
	      }
	      return currentNode;
	    };

	    LinkedList.prototype.add = function(value, position) {
	      var currentNode, nodeToAdd, _ref, _ref1, _ref2;
	      if (position == null) {
	        position = this.size;
	      }
	      /*
	      Add a new item at `position` (optional). Defaults to adding at the end.
	      `position`, just like in `at()`, can be negative (within the negative
	      boundary). Position specifies the place the value's going to be, and the old
	      node will be pushed higher. `add(-2)` on list of size 7 is the same as
	      `add(5)`.
	      
	      _Returns:_ item added.
	      */

	      if (!((-this.size <= position && position <= this.size))) {
	        return;
	      }
	      nodeToAdd = {
	        value: value
	      };
	      position = this._adjust(position);
	      if (this.size === 0) {
	        this.head = nodeToAdd;
	      } else {
	        if (position === 0) {
	          _ref = [nodeToAdd, this.head, nodeToAdd], this.head.prev = _ref[0], nodeToAdd.next = _ref[1], this.head = _ref[2];
	        } else {
	          currentNode = this.at(position - 1);
	          _ref1 = [currentNode.next, nodeToAdd, nodeToAdd, currentNode], nodeToAdd.next = _ref1[0], (_ref2 = currentNode.next) != null ? _ref2.prev = _ref1[1] : void 0, currentNode.next = _ref1[2], nodeToAdd.prev = _ref1[3];
	        }
	      }
	      if (position === this.size) {
	        this.tail = nodeToAdd;
	      }
	      this.size++;
	      return value;
	    };

	    LinkedList.prototype.removeAt = function(position) {
	      var currentNode, valueToReturn, _ref;
	      if (position == null) {
	        position = this.size - 1;
	      }
	      /*
	      Remove an item at index `position` (optional). Defaults to the last item.
	      Index can be negative (within the boundary).
	      
	      _Returns:_ item removed.
	      */

	      if (!((-this.size <= position && position < this.size))) {
	        return;
	      }
	      if (this.size === 0) {
	        return;
	      }
	      position = this._adjust(position);
	      if (this.size === 1) {
	        valueToReturn = this.head.value;
	        this.head.value = this.tail.value = void 0;
	      } else {
	        if (position === 0) {
	          valueToReturn = this.head.value;
	          this.head = this.head.next;
	          this.head.prev = void 0;
	        } else {
	          currentNode = this.at(position);
	          valueToReturn = currentNode.value;
	          currentNode.prev.next = currentNode.next;
	          if ((_ref = currentNode.next) != null) {
	            _ref.prev = currentNode.prev;
	          }
	          if (position === this.size - 1) {
	            this.tail = currentNode.prev;
	          }
	        }
	      }
	      this.size--;
	      return valueToReturn;
	    };

	    LinkedList.prototype.remove = function(value) {
	      /*
	      Remove the item using its value instead of position. **Will remove the fist
	      occurrence of `value`.**
	      
	      _Returns:_ the value, or undefined if value's not found.
	      */

	      var currentNode;
	      if (value == null) {
	        return;
	      }
	      currentNode = this.head;
	      while (currentNode && currentNode.value !== value) {
	        currentNode = currentNode.next;
	      }
	      if (!currentNode) {
	        return;
	      }
	      if (this.size === 1) {
	        this.head.value = this.tail.value = void 0;
	      } else if (currentNode === this.head) {
	        this.head = this.head.next;
	        this.head.prev = void 0;
	      } else if (currentNode === this.tail) {
	        this.tail = this.tail.prev;
	        this.tail.next = void 0;
	      } else {
	        currentNode.prev.next = currentNode.next;
	        currentNode.next.prev = currentNode.prev;
	      }
	      this.size--;
	      return value;
	    };

	    LinkedList.prototype.indexOf = function(value, startingPosition) {
	      var currentNode, position;
	      if (startingPosition == null) {
	        startingPosition = 0;
	      }
	      /*
	      Find the index of an item, similarly to `array.indexOf()`. Defaults to start
	      searching from the beginning, by can start at another position by passing
	      `startingPosition`. This parameter can also be negative; but unlike the
	      other methods of this class, `startingPosition` (optional) can be as small
	      as desired; a value of -999 for a list of size 5 will start searching
	      normally, at the beginning.
	      
	      **Note:** searches forwardly, **not** backwardly, i.e:
	      
	      ```js
	      var myList = new LinkedList([2, 3, 1, 4, 3, 5])
	      myList.indexOf(3, -3); // Returns 4, not 1
	      ```
	      _Returns:_ index of item found, or -1 if not found.
	      */

	      if (((this.head.value == null) && !this.head.next) || startingPosition >= this.size) {
	        return -1;
	      }
	      startingPosition = Math.max(0, this._adjust(startingPosition));
	      currentNode = this.at(startingPosition);
	      position = startingPosition;
	      while (currentNode) {
	        if (currentNode.value === value) {
	          break;
	        }
	        currentNode = currentNode.next;
	        position++;
	      }
	      if (position === this.size) {
	        return -1;
	      } else {
	        return position;
	      }
	    };

	    LinkedList.prototype._adjust = function(position) {
	      if (position < 0) {
	        return this.size + position;
	      } else {
	        return position;
	      }
	    };

	    return LinkedList;

	  })();

	  module.exports = LinkedList;

	}).call(this);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Kind of a stopgap measure for the upcoming [JavaScript
	Map](http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets)

	**Note:** due to JavaScript's limitations, hashing something other than Boolean,
	Number, String, Undefined, Null, RegExp, Function requires a hack that inserts a
	hidden unique property into the object. This means `set`, `get`, `has` and
	`delete` must employ the same object, and not a mere identical copy as in the
	case of, say, a string.

	## Overview example:

	```js
	var map = new Map({'alice': 'wonderland', 20: 'ok'});
	map.set('20', 5); // => 5
	map.get('20'); // => 5
	map.has('alice'); // => true
	map.delete(20) // => true
	var arr = [1, 2];
	map.add(arr, 'goody'); // => 'goody'
	map.has(arr); // => true
	map.has([1, 2]); // => false. Needs to compare by reference
	map.forEach(function(key, value) {
	  console.log(key, value);
	});
	```

	## Properties:

	- size: The total number of `(key, value)` pairs.
	*/


	(function() {
	  var Map, SPECIAL_TYPE_KEY_PREFIX, _extractDataType, _isSpecialType,
	    __hasProp = {}.hasOwnProperty;

	  SPECIAL_TYPE_KEY_PREFIX = '_mapId_';

	  Map = (function() {
	    Map._mapIdTracker = 0;

	    Map._newMapId = function() {
	      return this._mapIdTracker++;
	    };

	    function Map(objectToMap) {
	      /*
	      Pass an optional object whose (key, value) pair will be hashed. **Careful**
	      not to pass something like {5: 'hi', '5': 'hello'}, since JavaScript's
	      native object behavior will crush the first 5 property before it gets to
	      constructor.
	      */

	      var key, value;
	      this._content = {};
	      this._itemId = 0;
	      this._id = Map._newMapId();
	      this.size = 0;
	      for (key in objectToMap) {
	        if (!__hasProp.call(objectToMap, key)) continue;
	        value = objectToMap[key];
	        this.set(key, value);
	      }
	    }

	    Map.prototype.hash = function(key, makeHash) {
	      var propertyForMap, type;
	      if (makeHash == null) {
	        makeHash = false;
	      }
	      /*
	      The hash function for hashing keys is public. Feel free to replace it with
	      your own. The `makeHash` parameter is optional and accepts a boolean
	      (defaults to `false`) indicating whether or not to produce a new hash (for
	      the first use, naturally).
	      
	      _Returns:_ the hash.
	      */

	      type = _extractDataType(key);
	      if (_isSpecialType(key)) {
	        propertyForMap = SPECIAL_TYPE_KEY_PREFIX + this._id;
	        if (makeHash && !key[propertyForMap]) {
	          key[propertyForMap] = this._itemId++;
	        }
	        return propertyForMap + '_' + key[propertyForMap];
	      } else {
	        return type + '_' + key;
	      }
	    };

	    Map.prototype.set = function(key, value) {
	      /*
	      _Returns:_ value.
	      */

	      if (!this.has(key)) {
	        this.size++;
	      }
	      this._content[this.hash(key, true)] = [value, key];
	      return value;
	    };

	    Map.prototype.get = function(key) {
	      /*
	      _Returns:_ value corresponding to the key, or undefined if not found.
	      */

	      var _ref;
	      return (_ref = this._content[this.hash(key)]) != null ? _ref[0] : void 0;
	    };

	    Map.prototype.has = function(key) {
	      /*
	      Check whether a value exists for the key.
	      
	      _Returns:_ true or false.
	      */

	      return this.hash(key) in this._content;
	    };

	    Map.prototype["delete"] = function(key) {
	      /*
	      Remove the (key, value) pair.
	      
	      _Returns:_ **true or false**. Unlike most of this library, this method
	      doesn't return the deleted value. This is so that it conforms to the future
	      JavaScript `map.delete()`'s behavior.
	      */

	      var hashedKey;
	      hashedKey = this.hash(key);
	      if (hashedKey in this._content) {
	        delete this._content[hashedKey];
	        if (_isSpecialType(key)) {
	          delete key[SPECIAL_TYPE_KEY_PREFIX + this._id];
	        }
	        this.size--;
	        return true;
	      }
	      return false;
	    };

	    Map.prototype.forEach = function(operation) {
	      /*
	      Traverse through the map. Pass a function of the form `fn(key, value)`.
	      
	      _Returns:_ undefined.
	      */

	      var key, value, _ref;
	      _ref = this._content;
	      for (key in _ref) {
	        if (!__hasProp.call(_ref, key)) continue;
	        value = _ref[key];
	        operation(value[1], value[0]);
	      }
	    };

	    return Map;

	  })();

	  _isSpecialType = function(key) {
	    var simpleHashableTypes, simpleType, type, _i, _len;
	    simpleHashableTypes = ['Boolean', 'Number', 'String', 'Undefined', 'Null', 'RegExp', 'Function'];
	    type = _extractDataType(key);
	    for (_i = 0, _len = simpleHashableTypes.length; _i < _len; _i++) {
	      simpleType = simpleHashableTypes[_i];
	      if (type === simpleType) {
	        return false;
	      }
	    }
	    return true;
	  };

	  _extractDataType = function(type) {
	    return Object.prototype.toString.apply(type).match(/\[object (.+)\]/)[1];
	  };

	  module.exports = Map;

	}).call(this);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Amortized O(1) dequeue!

	## Overview example:

	```js
	var queue = new Queue([1, 6, 4]);
	queue.enqueue(10); // => 10
	queue.dequeue(); // => 1
	queue.dequeue(); // => 6
	queue.dequeue(); // => 4
	queue.peek(); // => 10
	queue.dequeue(); // => 10
	queue.peek(); // => undefined
	```

	## Properties:

	- size: The total number of items.
	*/


	(function() {
	  var Queue;

	  Queue = (function() {
	    function Queue(initialArray) {
	      if (initialArray == null) {
	        initialArray = [];
	      }
	      /*
	      Pass an optional array to be transformed into a queue. The item at index 0
	      is the first to be dequeued.
	      */

	      this._content = initialArray;
	      this._dequeueIndex = 0;
	      this.size = this._content.length;
	    }

	    Queue.prototype.enqueue = function(item) {
	      /*
	      _Returns:_ the item.
	      */

	      this.size++;
	      this._content.push(item);
	      return item;
	    };

	    Queue.prototype.dequeue = function() {
	      /*
	      _Returns:_ the dequeued item.
	      */

	      var itemToDequeue;
	      if (this.size === 0) {
	        return;
	      }
	      this.size--;
	      itemToDequeue = this._content[this._dequeueIndex];
	      this._dequeueIndex++;
	      if (this._dequeueIndex * 2 > this._content.length) {
	        this._content = this._content.slice(this._dequeueIndex);
	        this._dequeueIndex = 0;
	      }
	      return itemToDequeue;
	    };

	    Queue.prototype.peek = function() {
	      /*
	      Check the next item to be dequeued, without removing it.
	      
	      _Returns:_ the item.
	      */

	      return this._content[this._dequeueIndex];
	    };

	    return Queue;

	  })();

	  module.exports = Queue;

	}).call(this);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Credit to Wikipedia's article on [Red-black
	tree](http://en.wikipedia.org/wiki/Red–black_tree)

	**Note:** doesn't handle duplicate entries, undefined and null. This is by
	design.

	## Overview example:

	```js
	var rbt = new RedBlackTree([7, 5, 1, 8]);
	rbt.add(2); // => 2
	rbt.add(10); // => 10
	rbt.has(5); // => true
	rbt.peekMin(); // => 1
	rbt.peekMax(); // => 10
	rbt.removeMin(); // => 1
	rbt.removeMax(); // => 10
	rbt.remove(8); // => 8
	```

	## Properties:

	- size: The total number of items.
	*/


	(function() {
	  var BLACK, NODE_FOUND, NODE_TOO_BIG, NODE_TOO_SMALL, RED, RedBlackTree, STOP_SEARCHING, _findNode, _grandParentOf, _isLeft, _leftOrRight, _peekMaxNode, _peekMinNode, _siblingOf, _uncleOf;

	  NODE_FOUND = 0;

	  NODE_TOO_BIG = 1;

	  NODE_TOO_SMALL = 2;

	  STOP_SEARCHING = 3;

	  RED = 1;

	  BLACK = 2;

	  RedBlackTree = (function() {
	    function RedBlackTree(valuesToAdd) {
	      var value, _i, _len;
	      if (valuesToAdd == null) {
	        valuesToAdd = [];
	      }
	      /*
	      Pass an optional array to be turned into binary tree. **Note:** does not
	      accept duplicate, undefined and null.
	      */

	      this._root;
	      this.size = 0;
	      for (_i = 0, _len = valuesToAdd.length; _i < _len; _i++) {
	        value = valuesToAdd[_i];
	        if (value != null) {
	          this.add(value);
	        }
	      }
	    }

	    RedBlackTree.prototype.add = function(value) {
	      /*
	      Again, make sure to not pass a value already in the tree, or undefined, or
	      null.
	      
	      _Returns:_ value added.
	      */

	      var currentNode, foundNode, nodeToInsert, _ref;
	      if (value == null) {
	        return;
	      }
	      this.size++;
	      nodeToInsert = {
	        value: value,
	        _color: RED
	      };
	      if (!this._root) {
	        this._root = nodeToInsert;
	      } else {
	        foundNode = _findNode(this._root, function(node) {
	          if (value === node.value) {
	            return NODE_FOUND;
	          } else {
	            if (value < node.value) {
	              if (node._left) {
	                return NODE_TOO_BIG;
	              } else {
	                nodeToInsert._parent = node;
	                node._left = nodeToInsert;
	                return STOP_SEARCHING;
	              }
	            } else {
	              if (node._right) {
	                return NODE_TOO_SMALL;
	              } else {
	                nodeToInsert._parent = node;
	                node._right = nodeToInsert;
	                return STOP_SEARCHING;
	              }
	            }
	          }
	        });
	        if (foundNode != null) {
	          return;
	        }
	      }
	      currentNode = nodeToInsert;
	      while (true) {
	        if (currentNode === this._root) {
	          currentNode._color = BLACK;
	          break;
	        }
	        if (currentNode._parent._color === BLACK) {
	          break;
	        }
	        if (((_ref = _uncleOf(currentNode)) != null ? _ref._color : void 0) === RED) {
	          currentNode._parent._color = BLACK;
	          _uncleOf(currentNode)._color = BLACK;
	          _grandParentOf(currentNode)._color = RED;
	          currentNode = _grandParentOf(currentNode);
	          continue;
	        }
	        if (!_isLeft(currentNode) && _isLeft(currentNode._parent)) {
	          this._rotateLeft(currentNode._parent);
	          currentNode = currentNode._left;
	        } else if (_isLeft(currentNode) && !_isLeft(currentNode._parent)) {
	          this._rotateRight(currentNode._parent);
	          currentNode = currentNode._right;
	        }
	        currentNode._parent._color = BLACK;
	        _grandParentOf(currentNode)._color = RED;
	        if (_isLeft(currentNode)) {
	          this._rotateRight(_grandParentOf(currentNode));
	        } else {
	          this._rotateLeft(_grandParentOf(currentNode));
	        }
	        break;
	      }
	      return value;
	    };

	    RedBlackTree.prototype.has = function(value) {
	      /*
	      _Returns:_ true or false.
	      */

	      var foundNode;
	      foundNode = _findNode(this._root, function(node) {
	        if (value === node.value) {
	          return NODE_FOUND;
	        } else if (value < node.value) {
	          return NODE_TOO_BIG;
	        } else {
	          return NODE_TOO_SMALL;
	        }
	      });
	      if (foundNode) {
	        return true;
	      } else {
	        return false;
	      }
	    };

	    RedBlackTree.prototype.peekMin = function() {
	      /*
	      Check the minimum value without removing it.
	      
	      _Returns:_ the minimum value.
	      */

	      var _ref;
	      return (_ref = _peekMinNode(this._root)) != null ? _ref.value : void 0;
	    };

	    RedBlackTree.prototype.peekMax = function() {
	      /*
	      Check the maximum value without removing it.
	      
	      _Returns:_ the maximum value.
	      */

	      var _ref;
	      return (_ref = _peekMaxNode(this._root)) != null ? _ref.value : void 0;
	    };

	    RedBlackTree.prototype.remove = function(value) {
	      /*
	      _Returns:_ the value removed, or undefined if the value's not found.
	      */

	      var foundNode;
	      foundNode = _findNode(this._root, function(node) {
	        if (value === node.value) {
	          return NODE_FOUND;
	        } else if (value < node.value) {
	          return NODE_TOO_BIG;
	        } else {
	          return NODE_TOO_SMALL;
	        }
	      });
	      if (!foundNode) {
	        return;
	      }
	      this._removeNode(this._root, foundNode);
	      this.size--;
	      return value;
	    };

	    RedBlackTree.prototype.removeMin = function() {
	      /*
	      _Returns:_ smallest item removed, or undefined if tree's empty.
	      */

	      var nodeToRemove, valueToReturn;
	      nodeToRemove = _peekMinNode(this._root);
	      if (!nodeToRemove) {
	        return;
	      }
	      valueToReturn = nodeToRemove.value;
	      this._removeNode(this._root, nodeToRemove);
	      return valueToReturn;
	    };

	    RedBlackTree.prototype.removeMax = function() {
	      /*
	      _Returns:_ biggest item removed, or undefined if tree's empty.
	      */

	      var nodeToRemove, valueToReturn;
	      nodeToRemove = _peekMaxNode(this._root);
	      if (!nodeToRemove) {
	        return;
	      }
	      valueToReturn = nodeToRemove.value;
	      this._removeNode(this._root, nodeToRemove);
	      return valueToReturn;
	    };

	    RedBlackTree.prototype._removeNode = function(root, node) {
	      var sibling, successor, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
	      if (node._left && node._right) {
	        successor = _peekMinNode(node._right);
	        node.value = successor.value;
	        node = successor;
	      }
	      successor = node._left || node._right;
	      if (!successor) {
	        successor = {
	          color: BLACK,
	          _right: void 0,
	          _left: void 0,
	          isLeaf: true
	        };
	      }
	      successor._parent = node._parent;
	      if ((_ref = node._parent) != null) {
	        _ref[_leftOrRight(node)] = successor;
	      }
	      if (node._color === BLACK) {
	        if (successor._color === RED) {
	          successor._color = BLACK;
	          if (!successor._parent) {
	            this._root = successor;
	          }
	        } else {
	          while (true) {
	            if (!successor._parent) {
	              if (!successor.isLeaf) {
	                this._root = successor;
	              } else {
	                this._root = void 0;
	              }
	              break;
	            }
	            sibling = _siblingOf(successor);
	            if ((sibling != null ? sibling._color : void 0) === RED) {
	              successor._parent._color = RED;
	              sibling._color = BLACK;
	              if (_isLeft(successor)) {
	                this._rotateLeft(successor._parent);
	              } else {
	                this._rotateRight(successor._parent);
	              }
	            }
	            sibling = _siblingOf(successor);
	            if (successor._parent._color === BLACK && (!sibling || (sibling._color === BLACK && (!sibling._left || sibling._left._color === BLACK) && (!sibling._right || sibling._right._color === BLACK)))) {
	              if (sibling != null) {
	                sibling._color = RED;
	              }
	              if (successor.isLeaf) {
	                successor._parent[_leftOrRight(successor)] = void 0;
	              }
	              successor = successor._parent;
	              continue;
	            }
	            if (successor._parent._color === RED && (!sibling || (sibling._color === BLACK && (!sibling._left || ((_ref1 = sibling._left) != null ? _ref1._color : void 0) === BLACK) && (!sibling._right || ((_ref2 = sibling._right) != null ? _ref2._color : void 0) === BLACK)))) {
	              if (sibling != null) {
	                sibling._color = RED;
	              }
	              successor._parent._color = BLACK;
	              break;
	            }
	            if ((sibling != null ? sibling._color : void 0) === BLACK) {
	              if (_isLeft(successor) && (!sibling._right || sibling._right._color === BLACK) && ((_ref3 = sibling._left) != null ? _ref3._color : void 0) === RED) {
	                sibling._color = RED;
	                if ((_ref4 = sibling._left) != null) {
	                  _ref4._color = BLACK;
	                }
	                this._rotateRight(sibling);
	              } else if (!_isLeft(successor) && (!sibling._left || sibling._left._color === BLACK) && ((_ref5 = sibling._right) != null ? _ref5._color : void 0) === RED) {
	                sibling._color = RED;
	                if ((_ref6 = sibling._right) != null) {
	                  _ref6._color = BLACK;
	                }
	                this._rotateLeft(sibling);
	              }
	              break;
	            }
	            sibling = _siblingOf(successor);
	            sibling._color = successor._parent._color;
	            if (_isLeft(successor)) {
	              sibling._right._color = BLACK;
	              this._rotateRight(successor._parent);
	            } else {
	              sibling._left._color = BLACK;
	              this._rotateLeft(successor._parent);
	            }
	          }
	        }
	      }
	      if (successor.isLeaf) {
	        return (_ref7 = successor._parent) != null ? _ref7[_leftOrRight(successor)] = void 0 : void 0;
	      }
	    };

	    RedBlackTree.prototype._rotateLeft = function(node) {
	      var _ref, _ref1;
	      if ((_ref = node._parent) != null) {
	        _ref[_leftOrRight(node)] = node._right;
	      }
	      node._right._parent = node._parent;
	      node._parent = node._right;
	      node._right = node._right._left;
	      node._parent._left = node;
	      if ((_ref1 = node._right) != null) {
	        _ref1._parent = node;
	      }
	      if (node._parent._parent == null) {
	        return this._root = node._parent;
	      }
	    };

	    RedBlackTree.prototype._rotateRight = function(node) {
	      var _ref, _ref1;
	      if ((_ref = node._parent) != null) {
	        _ref[_leftOrRight(node)] = node._left;
	      }
	      node._left._parent = node._parent;
	      node._parent = node._left;
	      node._left = node._left._right;
	      node._parent._right = node;
	      if ((_ref1 = node._left) != null) {
	        _ref1._parent = node;
	      }
	      if (node._parent._parent == null) {
	        return this._root = node._parent;
	      }
	    };

	    return RedBlackTree;

	  })();

	  _isLeft = function(node) {
	    return node === node._parent._left;
	  };

	  _leftOrRight = function(node) {
	    if (_isLeft(node)) {
	      return '_left';
	    } else {
	      return '_right';
	    }
	  };

	  _findNode = function(startingNode, comparator) {
	    var comparisonResult, currentNode, foundNode;
	    currentNode = startingNode;
	    foundNode = void 0;
	    while (currentNode) {
	      comparisonResult = comparator(currentNode);
	      if (comparisonResult === NODE_FOUND) {
	        foundNode = currentNode;
	        break;
	      }
	      if (comparisonResult === NODE_TOO_BIG) {
	        currentNode = currentNode._left;
	      } else if (comparisonResult === NODE_TOO_SMALL) {
	        currentNode = currentNode._right;
	      } else if (comparisonResult === STOP_SEARCHING) {
	        break;
	      }
	    }
	    return foundNode;
	  };

	  _peekMinNode = function(startingNode) {
	    return _findNode(startingNode, function(node) {
	      if (node._left) {
	        return NODE_TOO_BIG;
	      } else {
	        return NODE_FOUND;
	      }
	    });
	  };

	  _peekMaxNode = function(startingNode) {
	    return _findNode(startingNode, function(node) {
	      if (node._right) {
	        return NODE_TOO_SMALL;
	      } else {
	        return NODE_FOUND;
	      }
	    });
	  };

	  _grandParentOf = function(node) {
	    var _ref;
	    return (_ref = node._parent) != null ? _ref._parent : void 0;
	  };

	  _uncleOf = function(node) {
	    if (!_grandParentOf(node)) {
	      return;
	    }
	    if (_isLeft(node._parent)) {
	      return _grandParentOf(node)._right;
	    } else {
	      return _grandParentOf(node)._left;
	    }
	  };

	  _siblingOf = function(node) {
	    if (_isLeft(node)) {
	      return node._parent._right;
	    } else {
	      return node._parent._left;
	    }
	  };

	  module.exports = RedBlackTree;

	}).call(this);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Good for fast insertion/removal/lookup of strings.

	## Overview example:

	```js
	var trie = new Trie(['bear', 'beer']);
	trie.add('hello'); // => 'hello'
	trie.add('helloha!'); // => 'helloha!'
	trie.has('bears'); // => false
	trie.longestPrefixOf('beatrice'); // => 'bea'
	trie.wordsWithPrefix('hel'); // => ['hello', 'helloha!']
	trie.remove('beers'); // => undefined. 'beer' still exists
	trie.remove('Beer') // => undefined. Case-sensitive
	trie.remove('beer') // => 'beer'. Removed
	```

	## Properties:

	- size: The total number of words.
	*/


	(function() {
	  var Queue, Trie, WORD_END, _hasAtLeastNChildren,
	    __hasProp = {}.hasOwnProperty;

	  Queue = __webpack_require__(6);

	  WORD_END = 'end';

	  Trie = (function() {
	    function Trie(words) {
	      var word, _i, _len;
	      if (words == null) {
	        words = [];
	      }
	      /*
	      Pass an optional array of strings to be inserted initially.
	      */

	      this._root = {};
	      this.size = 0;
	      for (_i = 0, _len = words.length; _i < _len; _i++) {
	        word = words[_i];
	        this.add(word);
	      }
	    }

	    Trie.prototype.add = function(word) {
	      /*
	      Add a whole string to the trie.
	      
	      _Returns:_ the word added. Will return undefined (without adding the value)
	      if the word passed is null or undefined.
	      */

	      var currentNode, letter, _i, _len;
	      if (word == null) {
	        return;
	      }
	      this.size++;
	      currentNode = this._root;
	      for (_i = 0, _len = word.length; _i < _len; _i++) {
	        letter = word[_i];
	        if (currentNode[letter] == null) {
	          currentNode[letter] = {};
	        }
	        currentNode = currentNode[letter];
	      }
	      currentNode[WORD_END] = true;
	      return word;
	    };

	    Trie.prototype.has = function(word) {
	      /*
	      __Returns:_ true or false.
	      */

	      var currentNode, letter, _i, _len;
	      if (word == null) {
	        return false;
	      }
	      currentNode = this._root;
	      for (_i = 0, _len = word.length; _i < _len; _i++) {
	        letter = word[_i];
	        if (currentNode[letter] == null) {
	          return false;
	        }
	        currentNode = currentNode[letter];
	      }
	      if (currentNode[WORD_END]) {
	        return true;
	      } else {
	        return false;
	      }
	    };

	    Trie.prototype.longestPrefixOf = function(word) {
	      /*
	      Find all words containing the prefix. The word itself counts as a prefix.
	      
	      ```js
	      var trie = new Trie;
	      trie.add('hello');
	      trie.longestPrefixOf('he'); // 'he'
	      trie.longestPrefixOf('hello'); // 'hello'
	      trie.longestPrefixOf('helloha!'); // 'hello'
	      ```
	      
	      _Returns:_ the prefix string, or empty string if no prefix found.
	      */

	      var currentNode, letter, prefix, _i, _len;
	      if (word == null) {
	        return '';
	      }
	      currentNode = this._root;
	      prefix = '';
	      for (_i = 0, _len = word.length; _i < _len; _i++) {
	        letter = word[_i];
	        if (currentNode[letter] == null) {
	          break;
	        }
	        prefix += letter;
	        currentNode = currentNode[letter];
	      }
	      return prefix;
	    };

	    Trie.prototype.wordsWithPrefix = function(prefix) {
	      /*
	      Find all words containing the prefix. The word itself counts as a prefix.
	      **Watch out for edge cases.**
	      
	      ```js
	      var trie = new Trie;
	      trie.wordsWithPrefix(''); // []. Check later case below.
	      trie.add('');
	      trie.wordsWithPrefix(''); // ['']
	      trie.add('he');
	      trie.add('hello');
	      trie.add('hell');
	      trie.add('bear');
	      trie.add('z');
	      trie.add('zebra');
	      trie.wordsWithPrefix('hel'); // ['hell', 'hello']
	      ```
	      
	      _Returns:_ an array of strings, or empty array if no word found.
	      */

	      var accumulatedLetters, currentNode, letter, node, queue, subNode, words, _i, _len, _ref;
	      if (prefix == null) {
	        return [];
	      }
	      (prefix != null) || (prefix = '');
	      words = [];
	      currentNode = this._root;
	      for (_i = 0, _len = prefix.length; _i < _len; _i++) {
	        letter = prefix[_i];
	        currentNode = currentNode[letter];
	        if (currentNode == null) {
	          return [];
	        }
	      }
	      queue = new Queue();
	      queue.enqueue([currentNode, '']);
	      while (queue.size !== 0) {
	        _ref = queue.dequeue(), node = _ref[0], accumulatedLetters = _ref[1];
	        if (node[WORD_END]) {
	          words.push(prefix + accumulatedLetters);
	        }
	        for (letter in node) {
	          if (!__hasProp.call(node, letter)) continue;
	          subNode = node[letter];
	          queue.enqueue([subNode, accumulatedLetters + letter]);
	        }
	      }
	      return words;
	    };

	    Trie.prototype.remove = function(word) {
	      /*
	      _Returns:_ the string removed, or undefined if the word in its whole doesn't
	      exist. **Note:** this means removing `beers` when only `beer` exists will
	      return undefined and conserve `beer`.
	      */

	      var currentNode, i, letter, prefix, _i, _j, _len, _ref;
	      if (word == null) {
	        return;
	      }
	      currentNode = this._root;
	      prefix = [];
	      for (_i = 0, _len = word.length; _i < _len; _i++) {
	        letter = word[_i];
	        if (currentNode[letter] == null) {
	          return;
	        }
	        currentNode = currentNode[letter];
	        prefix.push([letter, currentNode]);
	      }
	      if (!currentNode[WORD_END]) {
	        return;
	      }
	      this.size--;
	      delete currentNode[WORD_END];
	      if (_hasAtLeastNChildren(currentNode, 1)) {
	        return word;
	      }
	      for (i = _j = _ref = prefix.length - 1; _ref <= 1 ? _j <= 1 : _j >= 1; i = _ref <= 1 ? ++_j : --_j) {
	        if (!_hasAtLeastNChildren(prefix[i][1], 1)) {
	          delete prefix[i - 1][1][prefix[i][0]];
	        } else {
	          break;
	        }
	      }
	      if (!_hasAtLeastNChildren(this._root[prefix[0][0]], 1)) {
	        delete this._root[prefix[0][0]];
	      }
	      return word;
	    };

	    return Trie;

	  })();

	  _hasAtLeastNChildren = function(node, n) {
	    var child, childCount;
	    if (n === 0) {
	      return true;
	    }
	    childCount = 0;
	    for (child in node) {
	      if (!__hasProp.call(node, child)) continue;
	      childCount++;
	      if (childCount >= n) {
	        return true;
	      }
	    }
	    return false;
	  };

	  module.exports = Trie;

	}).call(this);


/***/ }
/******/ ]);;/**
 * Performance overrides on MarkerClusterer custom to Angular Google Maps
 *
 * Created by Petr Bruna ccg1415 and Nick McCready on 7/13/14.
 */
angular.module('uiGmapgoogle-maps.extensions')
.service('uiGmapExtendMarkerClusterer',['uiGmapLodash', 'uiGmapPropMap', function (uiGmapLodash, PropMap) {
  return {
    init: _.once(function () {
      (function () {
        var __hasProp = {}.hasOwnProperty,
          __extends = function (child, parent) {
            for (var key in parent) {
              if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
              this.constructor = child;
            }

            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
          };

        window.NgMapCluster = (function (_super) {
          __extends(NgMapCluster, _super);

          function NgMapCluster(opts) {
            NgMapCluster.__super__.constructor.call(this, opts);
            this.markers_ = new PropMap();
          }

          /**
           * Adds a marker to the cluster.
           *
           * @param {google.maps.Marker} marker The marker to be added.
           * @return {boolean} True if the marker was added.
           * @ignore
           */
          NgMapCluster.prototype.addMarker = function (marker) {
            var i;
            var mCount;
            var mz;

            if (this.isMarkerAlreadyAdded_(marker)) {
              var oldMarker = this.markers_.get(marker.key);
              if (oldMarker.getPosition().lat() == marker.getPosition().lat() && oldMarker.getPosition().lon() == marker.getPosition().lon()) //if nothing has changed
                return false;
            }

            if (!this.center_) {
              this.center_ = marker.getPosition();
              this.calculateBounds_();
            } else {
              if (this.averageCenter_) {
                var l = this.markers_.length + 1;
                var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
                var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
                this.center_ = new google.maps.LatLng(lat, lng);
                this.calculateBounds_();
              }
            }
            marker.isAdded = true;
            this.markers_.push(marker);

            mCount = this.markers_.length;
            mz = this.markerClusterer_.getMaxZoom();
            if (mz !== null && this.map_.getZoom() > mz) {
              // Zoomed in past max zoom, so show the marker.
              if (marker.getMap() !== this.map_) {
                marker.setMap(this.map_);
              }
            } else if (mCount < this.minClusterSize_) {
              // Min cluster size not reached so show the marker.
              if (marker.getMap() !== this.map_) {
                marker.setMap(this.map_);
              }
            } else if (mCount === this.minClusterSize_) {
              // Hide the markers that were showing.
              this.markers_.each(function (m) {
                m.setMap(null);
              });
            } else {
              marker.setMap(null);
            }

            //this.updateIcon_();
            return true;
          };

          /**
           * Determines if a marker has already been added to the cluster.
           *
           * @param {google.maps.Marker} marker The marker to check.
           * @return {boolean} True if the marker has already been added.
           */
          NgMapCluster.prototype.isMarkerAlreadyAdded_ = function (marker) {
            return uiGmapLodash.isNullOrUndefined(this.markers_.get(marker.key));
          };


          /**
           * Returns the bounds of the cluster.
           *
           * @return {google.maps.LatLngBounds} the cluster bounds.
           * @ignore
           */
          NgMapCluster.prototype.getBounds = function () {
            var i;
            var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
            this.getMarkers().each(function(m){
              bounds.extend(m.getPosition());
            });
            return bounds;
          };


          /**
           * Removes the cluster from the map.
           *
           * @ignore
           */
          NgMapCluster.prototype.remove = function () {
            this.clusterIcon_.setMap(null);
            this.markers_ = new PropMap();
            delete this.markers_;
          };


          return NgMapCluster;

        })(Cluster);


        window.NgMapMarkerClusterer = (function (_super) {
          __extends(NgMapMarkerClusterer, _super);

          function NgMapMarkerClusterer(map, opt_markers, opt_options) {
            NgMapMarkerClusterer.__super__.constructor.call(this, map, opt_markers, opt_options);
            this.markers_ = new PropMap();
          }

          /**
           * Removes all clusters and markers from the map and also removes all markers
           *  managed by the clusterer.
           */
          NgMapMarkerClusterer.prototype.clearMarkers = function () {
            this.resetViewport_(true);
            this.markers_ = new PropMap();
          };
          /**
           * Removes a marker and returns true if removed, false if not.
           *
           * @param {google.maps.Marker} marker The marker to remove
           * @return {boolean} Whether the marker was removed or not
           */
          NgMapMarkerClusterer.prototype.removeMarker_ = function (marker) {
            if (!this.markers_.get(marker.key)) {
              return false;
            }
            marker.setMap(null);
            this.markers_.remove(marker.key); // Remove the marker from the list of managed markers
            return true;
          };

          /**
           * Creates the clusters. This is done in batches to avoid timeout errors
           *  in some browsers when there is a huge number of markers.
           *
           * @param {number} iFirst The index of the first marker in the batch of
           *  markers to be added to clusters.
           */
          NgMapMarkerClusterer.prototype.createClusters_ = function (iFirst) {
            var i, marker;
            var mapBounds;
            var cMarkerClusterer = this;
            if (!this.ready_) {
              return;
            }

            // Cancel previous batch processing if we're working on the first batch:
            if (iFirst === 0) {
              /**
               * This event is fired when the <code>MarkerClusterer</code> begins
               *  clustering markers.
               * @name MarkerClusterer#clusteringbegin
               * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
               * @event
               */
              google.maps.event.trigger(this, 'clusteringbegin', this);

              if (typeof this.timerRefStatic !== 'undefined') {
                clearTimeout(this.timerRefStatic);
                delete this.timerRefStatic;
              }
            }

            // Get our current map view bounds.
            // Create a new bounds object so we don't affect the map.
            //
            // See Comments 9 & 11 on Issue 3651 relating to this workaround for a Google Maps bug:
            if (this.getMap().getZoom() > 3) {
              mapBounds = new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(),
                this.getMap().getBounds().getNorthEast());
            } else {
              mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
            }
            var bounds = this.getExtendedBounds(mapBounds);

            var iLast = Math.min(iFirst + this.batchSize_, this.markers_.length);

            var _ms = this.markers_.values();
            for (i = iFirst; i < iLast; i++) {
              marker = _ms[i];
              if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
                if (!this.ignoreHidden_ || (this.ignoreHidden_ && marker.getVisible())) {
                  this.addToClosestCluster_(marker);
                }
              }
            }

            if (iLast < this.markers_.length) {
              this.timerRefStatic = setTimeout(function () {
                cMarkerClusterer.createClusters_(iLast);
              }, 0);
            } else {
              // custom addition by ui-gmap
              // update icon for all clusters
              for (i = 0; i < this.clusters_.length; i++) {
                this.clusters_[i].updateIcon_();
              }

              delete this.timerRefStatic;

              /**
               * This event is fired when the <code>MarkerClusterer</code> stops
               *  clustering markers.
               * @name MarkerClusterer#clusteringend
               * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
               * @event
               */
              google.maps.event.trigger(this, 'clusteringend', this);
            }
          };

          /**
           * Adds a marker to a cluster, or creates a new cluster.
           *
           * @param {google.maps.Marker} marker The marker to add.
           */
          NgMapMarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
            var i, d, cluster, center;
            var distance = 40000; // Some large number
            var clusterToAddTo = null;
            for (i = 0; i < this.clusters_.length; i++) {
              cluster = this.clusters_[i];
              center = cluster.getCenter();
              if (center) {
                d = this.distanceBetweenPoints_(center, marker.getPosition());
                if (d < distance) {
                  distance = d;
                  clusterToAddTo = cluster;
                }
              }
            }

            if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
              clusterToAddTo.addMarker(marker);
            } else {
              cluster = new NgMapCluster(this);
              cluster.addMarker(marker);
              this.clusters_.push(cluster);
            }
          };

          /**
           * Redraws all the clusters.
           */
          NgMapMarkerClusterer.prototype.redraw_ = function () {
            this.createClusters_(0);
          };


          /**
           * Removes all clusters from the map. The markers are also removed from the map
           *  if <code>opt_hide</code> is set to <code>true</code>.
           *
           * @param {boolean} [opt_hide] Set to <code>true</code> to also remove the markers
           *  from the map.
           */
          NgMapMarkerClusterer.prototype.resetViewport_ = function (opt_hide) {
            var i, marker;
            // Remove all the clusters
            for (i = 0; i < this.clusters_.length; i++) {
              this.clusters_[i].remove();
            }
            this.clusters_ = [];

            // Reset the markers to not be added and to be removed from the map.
            this.markers_.each(function (marker) {
              marker.isAdded = false;
              if (opt_hide) {
                marker.setMap(null);
              }
            });
          };

          /**
           * Extends an object's prototype by another's.
           *
           * @param {Object} obj1 The object to be extended.
           * @param {Object} obj2 The object to extend with.
           * @return {Object} The new extended object.
           * @ignore
           */
          NgMapMarkerClusterer.prototype.extend = function (obj1, obj2) {
            return (function (object) {
              var property;
              for (property in object.prototype) {
                if (property !== 'constructor')
                  this.prototype[property] = object.prototype[property];
              }
              return this;
            }).apply(obj1, [obj2]);
          };
          ////////////////////////////////////////////////////////////////////////////////
          /*
          Other overrides relevant to MarkerClusterPlus
          */
          ////////////////////////////////////////////////////////////////////////////////
          /**
          * Positions and shows the icon.
          */
          ClusterIcon.prototype.show = function () {
            if (this.div_) {
              var img = "";
              // NOTE: values must be specified in px units
              var bp = this.backgroundPosition_.split(" ");
              var spriteH = parseInt(bp[0].trim(), 10);
              var spriteV = parseInt(bp[1].trim(), 10);
              var pos = this.getPosFromLatLng_(this.center_);
              this.div_.style.cssText = this.createCss(pos);
              img = "<img src='" + this.url_ + "' style='position: absolute; top: " + spriteV + "px; left: " + spriteH + "px; ";
              if (!this.cluster_.getMarkerClusterer().enableRetinaIcons_) {
                img += "clip: rect(" + (-1 * spriteV) + "px, " + ((-1 * spriteH) + this.width_) + "px, " +
                ((-1 * spriteV) + this.height_) + "px, " + (-1 * spriteH) + "px);";
              }
              // ADDED FOR RETINA SUPPORT
              else {
                img += "width: " + this.width_ + "px;" + "height: " + this.height_ + "px;";
              }
              // END ADD
              img += "'>";
              this.div_.innerHTML = img + "<div style='" +
              "position: absolute;" +
              "top: " + this.anchorText_[0] + "px;" +
              "left: " + this.anchorText_[1] + "px;" +
              "color: " + this.textColor_ + ";" +
              "font-size: " + this.textSize_ + "px;" +
              "font-family: " + this.fontFamily_ + ";" +
              "font-weight: " + this.fontWeight_ + ";" +
              "font-style: " + this.fontStyle_ + ";" +
              "text-decoration: " + this.textDecoration_ + ";" +
              "text-align: center;" +
              "width: " + this.width_ + "px;" +
              "line-height:" + this.height_ + "px;" +
              "'>" + this.sums_.text + "</div>";
              if (typeof this.sums_.title === "undefined" || this.sums_.title === "") {
                this.div_.title = this.cluster_.getMarkerClusterer().getTitle();
              } else {
                this.div_.title = this.sums_.title;
              }
              this.div_.style.display = "";
            }
            this.visible_ = true;
          };
          //END OTHER OVERRIDES
          ////////////////////////////////////////////////////////////////////////////////

          return NgMapMarkerClusterer;

        })(MarkerClusterer);
      }).call(this);
    })
  };
}]);
}( window,angular));
//# sourceMappingURL=angular-google-maps_dev_mapped.js.map