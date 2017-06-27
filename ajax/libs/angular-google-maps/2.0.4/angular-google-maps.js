/*! angular-google-maps 2.0.4 2014-10-22
 *  AngularJS directives for Google Maps
 *  git: https://github.com/angular-ui/angular-google-maps.git
 */
(function() {
  String.prototype.contains = function(value, fromIndex) {
    return this.indexOf(value, fromIndex) !== -1;
  };

  String.prototype.flare = function(flare) {
    if (flare == null) {
      flare = 'uiGmap';
    }
    return flare + this;
  };

  String.prototype.ns = String.prototype.flare;

}).call(this);


/*
    Author Nick McCready
    Intersection of Objects if the arrays have something in common each intersecting object will be returned
    in an new array.
 */

(function() {
  _.intersectionObjects = function(array1, array2, comparison) {
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

  _.containsObject = _.includeObject = function(obj, target, comparison) {
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

  _.differenceObjects = function(array1, array2, comparison) {
    if (comparison == null) {
      comparison = void 0;
    }
    return _.filter(array1, function(value) {
      return !_.containsObject(array2, value, comparison);
    });
  };

  _.withoutObjects = _.differenceObjects;

  _.indexOfObject = function(array, item, comparison, isSorted) {
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

  _["extends"] = function(arrayOfObjectsToCombine) {
    return _.reduce(arrayOfObjectsToCombine, function(combined, toAdd) {
      return _.extend(combined, toAdd);
    }, {});
  };

  _.isNullOrUndefined = function(thing) {
    return _.isNull(thing || _.isUndefined(thing));
  };

}).call(this);


/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
 */

(function() {
  angular.module('google-maps.providers'.ns(), []);

  angular.module("google-maps.wrapped".ns(), []);

  angular.module("google-maps.extensions".ns(), ["google-maps.wrapped".ns(), 'google-maps.providers'.ns()]);

  angular.module("google-maps.directives.api.utils".ns(), ['google-maps.extensions'.ns()]);

  angular.module("google-maps.directives.api.managers".ns(), []);

  angular.module("google-maps.directives.api.options".ns(), ["google-maps.directives.api.utils".ns()]);

  angular.module("google-maps.directives.api.options.builders".ns(), []);

  angular.module("google-maps.directives.api.models.child".ns(), ["google-maps.directives.api.utils".ns(), "google-maps.directives.api.options".ns(), "google-maps.directives.api.options.builders".ns()]);

  angular.module("google-maps.directives.api.models.parent".ns(), ["google-maps.directives.api.managers".ns(), "google-maps.directives.api.models.child".ns(), 'google-maps.providers'.ns()]);

  angular.module("google-maps.directives.api".ns(), ["google-maps.directives.api.models.parent".ns()]);

  angular.module("google-maps".ns(), ["google-maps.directives.api".ns(), 'google-maps.providers'.ns()]).factory("debounce".ns(), [
    "$timeout", function($timeout) {
      return function(fn) {
        var nthCall;
        nthCall = 0;
        return function() {
          var argz, later, that;
          that = this;
          argz = arguments;
          nthCall++;
          later = (function(version) {
            return function() {
              if (version === nthCall) {
                return fn.apply(that, argz);
              }
            };
          })(nthCall);
          return $timeout(later, 0, true);
        };
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('google-maps.providers'.ns()).factory('MapScriptLoader'.ns(), [
    '$q', 'uuid'.ns(), function($q, uuid) {
      var scriptId;
      scriptId = void 0;
      return {
        load: function(options) {
          var deferred, query, randomizedFunctionName, script;
          deferred = $q.defer();
          if (angular.isDefined(window.google) && angular.isDefined(window.google.maps)) {
            deferred.resolve(window.google.maps);
            return deferred.promise;
          }
          randomizedFunctionName = options.callback = 'onGoogleMapsReady' + Math.round(Math.random() * 1000);
          window[randomizedFunctionName] = function() {
            window[randomizedFunctionName] = null;
            deferred.resolve(window.google.maps);
          };
          query = _.map(options, function(v, k) {
            return k + '=' + v;
          });
          if (scriptId) {
            document.getElementById(scriptId).remove();
          }
          query = query.join('&');
          script = document.createElement('script');
          scriptId = "ui_gmap_map_load_" + uuid.generate();
          script.id = scriptId;
          script.type = 'text/javascript';
          script.src = 'https://maps.googleapis.com/maps/api/js?' + query;
          document.body.appendChild(script);
          return deferred.promise;
        }
      };
    }
  ]).provider('GoogleMapApi'.ns(), function() {
    this.options = {
      v: '3.17',
      libraries: '',
      language: 'en',
      sensor: 'false'
    };
    this.configure = function(options) {
      angular.extend(this.options, options);
    };
    this.$get = [
      'MapScriptLoader'.ns(), (function(_this) {
        return function(loader) {
          return loader.load(_this.options);
        };
      })(this)
    ];
    return this;
  });

}).call(this);

(function() {
  angular.module("google-maps.extensions".ns()).service('ExtendGWin'.ns(), function() {
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
          window.MarkerLabel_.prototype.setContent = function() {
            var content;
            content = this.marker_.get("labelContent");
            if (!content || _.isEqual(this.oldContent, content)) {
              return;
            }
            if (typeof (content != null ? content.nodeType : void 0) === "undefined") {
              this.labelDiv_.innerHTML = content;
              this.eventDiv_.innerHTML = this.labelDiv_.innerHTML;
              this.oldContent = content;
            } else {
              this.labelDiv_.innerHTML = "";
              this.labelDiv_.appendChild(content);
              content = content.cloneNode(true);
              this.eventDiv_.appendChild(content);
              this.oldContent = content;
            }
          };

          /*
          Removes the DIV for the label from the DOM. It also removes all event handlers.
          This method is called automatically when the marker's <code>setMap(null)</code>
          method is called.
          @private
           */
          return window.MarkerLabel_.prototype.onRemove = function() {
            if (this.labelDiv_.parentNode != null) {
              this.labelDiv_.parentNode.removeChild(this.labelDiv_);
            }
            if (this.eventDiv_.parentNode != null) {
              this.eventDiv_.parentNode.removeChild(this.eventDiv_);
            }
            if (!this.listeners_) {
              return;
            }
            if (!this.listeners_.length) {
              return;
            }
            this.listeners_.forEach(function(l) {
              return google.maps.event.removeListener(l);
            });
          };
        }
      })
    };
  });

}).call(this);

(function() {
  angular.module("google-maps.directives.api.utils".ns()).service("_sync".ns(), [
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
  ]).factory("_async".ns(), [
    function() {
      var defaultChunkSize, doChunk, each, map, waitOrGo;
      defaultChunkSize = 20;

      /*
      utility to reduce code bloat. The whole point is to check if there is existing synchronous work going on.
      If so we wait on it.
      
      Note: This is fully intended to be mutable (ie existingPiecesObj is getting existingPieces prop slapped on)
       */
      waitOrGo = function(existingPiecesObj, fnPromise) {
        if (!existingPiecesObj.existingPieces) {
          return existingPiecesObj.existingPieces = fnPromise();
        } else {
          return existingPiecesObj.existingPieces = existingPiecesObj.existingPieces.then(function() {
            return fnPromise();
          });
        }
      };

      /*
        Author: Nicholas McCready & jfriend00
        _async handles things asynchronous-like :), to allow the UI to be free'd to do other things
        Code taken from http://stackoverflow.com/questions/10344498/best-way-to-iterate-over-an-array-without-blocking-the-ui
      
        The design of any functionality of _async is to be like lodash/underscore and replicate it but call things
        asynchronously underneath. Each should be sufficient for most things to be derived from.
      
        Optional Asynchronous Chunking via promises.
       */
      doChunk = function(array, chunkSizeOrDontChunk, pauseMilli, chunkCb, pauseCb, overallD, index) {
        var cnt, e, i;
        try {
          if (chunkSizeOrDontChunk && chunkSizeOrDontChunk < array.length) {
            cnt = chunkSizeOrDontChunk;
          } else {
            cnt = array.length;
          }
          i = index;
          while (cnt-- && i < (array ? array.length : i + 1)) {
            chunkCb(array[i], i);
            ++i;
          }
          if (array) {
            if (i < array.length) {
              index = i;
              if (chunkSizeOrDontChunk) {
                if (typeof pauseCb === "function") {
                  pauseCb();
                }
                return setTimeout(function() {
                  return doChunk(array, chunkSizeOrDontChunk, pauseMilli, chunkCb, pauseCb, overallD, index);
                }, pauseMilli);
              }
            } else {
              return overallD.resolve();
            }
          }
        } catch (_error) {
          e = _error;
          return overallD.reject("error within chunking iterator: " + e);
        }
      };
      each = function(array, chunk, pauseCb, chunkSizeOrDontChunk, index, pauseMilli) {
        var overallD, ret;
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
        overallD = Promise.defer();
        ret = overallD.promise;
        if (!pauseMilli) {
          overallD.reject("pause (delay) must be set from _async!");
          return ret;
        }
        if (array === void 0 || (array != null ? array.length : void 0) <= 0) {
          overallD.resolve();
          return ret;
        }
        doChunk(array, chunkSizeOrDontChunk, pauseMilli, chunk, pauseCb, overallD, index);
        return ret;
      };
      map = function(objs, iterator, pauseCb, chunkSizeOrDontChunk, index, pauseMilli) {
        var results;
        results = [];
        if (!((objs != null) && (objs != null ? objs.length : void 0) > 0)) {
          return Promise.resolve(results);
        }
        return each(objs, function(o) {
          return results.push(iterator(o));
        }, pauseCb, chunkSizeOrDontChunk, index, pauseMilli).then(function() {
          return results;
        });
      };
      return {
        each: each,
        map: map,
        waitOrGo: waitOrGo,
        defaultChunkSize: defaultChunkSize
      };
    }
  ]);

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module("google-maps.directives.api.utils".ns()).factory("BaseObject".ns(), function() {
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


/*
    Useful function callbacks that should be defined at later time.
    Mainly to be used for specs to verify creation / linking.

    This is to lead a common design in notifying child stuff.
 */

(function() {
  angular.module("google-maps.directives.api.utils".ns()).factory("ChildEvents".ns(), function() {
    return {
      onChildCreation: function(child) {}
    };
  });

}).call(this);

(function() {
  angular.module("google-maps.directives.api.utils".ns()).service("CtrlHandle".ns(), [
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

(function() {
  angular.module("google-maps.directives.api.utils".ns()).service("EventsHelper".ns(), [
    "Logger".ns(), function($log) {
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
                  return scope.$apply(eventHandler.apply(scope, [gObject, eventName, model, arguments]));
                });
              }
            }));
          }
        },
        removeEvents: function(listeners) {
          return listeners != null ? listeners.forEach(function(l) {
            return google.maps.event.removeListener(l);
          }) : void 0;
        }
      };
    }
  ]);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.utils".ns()).factory("FitHelper".ns(), [
    "BaseObject".ns(), "Logger".ns(), "_async".ns(), function(BaseObject, $log, _async) {
      var FitHelper;
      return FitHelper = (function(_super) {
        __extends(FitHelper, _super);

        function FitHelper() {
          return FitHelper.__super__.constructor.apply(this, arguments);
        }

        FitHelper.prototype.fit = function(gMarkers, gMap) {
          var bounds, everSet;
          if (gMap && gMarkers && gMarkers.length > 0) {
            bounds = new google.maps.LatLngBounds();
            everSet = false;
            return _async.each(gMarkers, (function(_this) {
              return function(gMarker) {
                if (gMarker) {
                  if (!everSet) {
                    everSet = true;
                  }
                  return bounds.extend(gMarker.getPosition());
                }
              };
            })(this)).then(function() {
              if (everSet) {
                return gMap.fitBounds(bounds);
              }
            });
          }
        };

        return FitHelper;

      })(BaseObject);
    }
  ]);

}).call(this);

(function() {
  angular.module("google-maps.directives.api.utils".ns()).service("GmapUtil".ns(), [
    "Logger".ns(), "$compile", function(Logger, $compile) {
      var getCoords, getLatitude, getLongitude, validateCoords;
      getLatitude = function(value) {
        if (Array.isArray(value) && value.length === 2) {
          return value[1];
        } else if (angular.isDefined(value.type) && value.type === "Point") {
          return value.coordinates[1];
        } else {
          return value.latitude;
        }
      };
      getLongitude = function(value) {
        if (Array.isArray(value) && value.length === 2) {
          return value[0];
        } else if (angular.isDefined(value.type) && value.type === "Point") {
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
        } else if (angular.isDefined(value.type) && value.type === "Point") {
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
          if (coords.type === "Point" && _.isArray(coords.coordinates) && coords.coordinates.length === 2) {
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
          } else if (angular.isDefined(prevValue.type) && prevValue.type === "Point") {
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
              Logger.error("infoWindow defaults not defined");
              if (!content) {
                return Logger.error("infoWindow content not defined");
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
              parsed = $compile(content)(scope);
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
        isTrue: function(val) {
          return angular.isDefined(val) && val !== null && val === true || val === "1" || val === "y" || val === "true";
        },
        isFalse: function(value) {
          return ['false', 'FALSE', 0, 'n', 'N', 'no', 'NO'].indexOf(value) !== -1;
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
              if (!((angular.isDefined(path[i].latitude) && angular.isDefined(path[i].longitude)) || (typeof path[i].lat === "function" && typeof path[i].lng === "function"))) {
                return false;
              }
              i++;
            }
            return true;
          } else {
            if (angular.isUndefined(path.coordinates)) {
              return false;
            }
            if (path.type === "Polygon") {
              if (path.coordinates[0].length < 4) {
                return false;
              }
              array = path.coordinates[0];
            } else if (path.type === "MultiPolygon") {
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
            } else if (path.type === "LineString") {
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
              } else if (typeof path[i].lat === "function" && typeof path[i].lng === "function") {
                latlng = path[i];
              }
              result.push(latlng);
              i++;
            }
          } else {
            array;
            if (path.type === "Polygon") {
              array = path.coordinates[0];
            } else if (path.type === "MultiPolygon") {
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
            } else if (path.type === "LineString") {
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
          obj = object;
          _.each(key.split("."), function(value) {
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

(function() {
  angular.module("google-maps.directives.api.utils".ns()).service("IsReady".ns(), [
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

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.utils".ns()).factory("Linked".ns(), [
    "BaseObject".ns(), function(BaseObject) {
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

(function() {
  angular.module("google-maps.directives.api.utils".ns()).service("Logger".ns(), [
    "$log", function($log) {
      return {
        doLog: false,
        info: function(msg) {
          if (this.doLog) {
            if ($log != null) {
              return $log.info(msg);
            } else {
              return console.info(msg);
            }
          }
        },
        log: function(msg) {
          if (this.doLog) {
            if ($log != null) {
              return $log.log(msg);
            } else {
              return console.log(msg);
            }
          }
        },
        error: function(msg) {
          if (this.doLog) {
            if ($log != null) {
              return $log.error(msg);
            } else {
              return console.error(msg);
            }
          }
        },
        debug: function(msg) {
          if (this.doLog) {
            if ($log != null) {
              return $log.debug(msg);
            } else {
              return console.debug(msg);
            }
          }
        },
        warn: function(msg) {
          if (this.doLog) {
            if ($log != null) {
              return $log.warn(msg);
            } else {
              return console.warn(msg);
            }
          }
        }
      };
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.utils".ns()).factory("ModelKey".ns(), [
    "BaseObject".ns(), "GmapUtil".ns(), function(BaseObject, GmapUtil) {
      var ModelKey;
      return ModelKey = (function(_super) {
        __extends(ModelKey, _super);

        function ModelKey(scope) {
          this.scope = scope;
          this.getChanges = __bind(this.getChanges, this);
          this.getProp = __bind(this.getProp, this);
          this.setIdKey = __bind(this.setIdKey, this);
          this.modelKeyComparison = __bind(this.modelKeyComparison, this);
          ModelKey.__super__.constructor.call(this);
          this.defaultIdKey = "id";
          this.idKey = void 0;
        }

        ModelKey.prototype.evalModelHandle = function(model, modelKey) {
          if (model === void 0 || modelKey === void 0) {
            return void 0;
          }
          if (modelKey === 'self') {
            return model;
          } else {
            return GmapUtil.getPath(model, modelKey);
          }
        };

        ModelKey.prototype.modelKeyComparison = function(model1, model2) {
          var scope;
          scope = this.scope.coords != null ? this.scope : this.parentScope;
          if (scope == null) {
            throw "No scope or parentScope set!";
          }
          return GmapUtil.equalCoords(this.evalModelHandle(model1, scope.coords), this.evalModelHandle(model2, scope.coords));
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
                c = this.getChanges(now[prop], prev[prop]);
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

        return ModelKey;

      })(BaseObject);
    }
  ]);

}).call(this);

(function() {
  angular.module("google-maps.directives.api.utils".ns()).factory("ModelsWatcher".ns(), [
    "Logger".ns(), "_async".ns(), function(Logger, _async) {
      return {
        figureOutState: function(idKey, scope, childObjects, comparison, callBack) {
          var adds, mappedScopeModelIds, removals, updates;
          adds = [];
          mappedScopeModelIds = {};
          removals = [];
          updates = [];
          return _async.each(scope.models, function(m) {
            var child;
            if (m[idKey] != null) {
              mappedScopeModelIds[m[idKey]] = {};
              if (childObjects[m[idKey]] == null) {
                return adds.push(m);
              } else {
                child = childObjects[m[idKey]];
                if (!comparison(m, child.model)) {
                  return updates.push({
                    model: m,
                    child: child
                  });
                }
              }
            } else {
              return Logger.error(" id missing for model " + (m.toString()) + ",\ncan not use do comparison/insertion");
            }
          }).then((function(_this) {
            return function() {
              return _async.each(childObjects.values(), function(c) {
                var id;
                if (c == null) {
                  Logger.error("child undefined in ModelsWatcher.");
                  return;
                }
                if (c.model == null) {
                  Logger.error("child.model undefined in ModelsWatcher.");
                  return;
                }
                id = c.model[idKey];
                if (mappedScopeModelIds[id] == null) {
                  return removals.push(c);
                }
              });
            };
          })(this)).then((function(_this) {
            return function() {
              return callBack({
                adds: adds,
                removals: removals,
                updates: updates
              });
            };
          })(this));
        }
      };
    }
  ]);

}).call(this);


/*
    Simple Object Map with a lenght property to make it easy to track length/size
 */

(function() {
  var propsToPop,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  propsToPop = ['get', 'put', 'remove', 'values', 'keys', 'length', 'push', 'didValueStateChange', 'didKeyStateChange', 'slice', 'removeAll', 'allVals', 'allKeys', 'stateChanged'];

  window.PropMap = (function() {
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
      this.didValueStateChange = false;
      this.didKeyStateChange = false;
      this.allVals = [];
      this.allKeys = [];
    }

    PropMap.prototype.get = function(key) {
      return this[key];
    };

    PropMap.prototype.stateChanged = function() {
      this.didValueStateChange = true;
      return this.didKeyStateChange = true;
    };

    PropMap.prototype.put = function(key, value) {
      if (this.get(key) == null) {
        this.length++;
      }
      this.stateChanged();
      return this[key] = value;
    };

    PropMap.prototype.remove = function(key, isSafe) {
      var value;
      if (isSafe == null) {
        isSafe = false;
      }
      if (isSafe && !this.get(key)) {
        return void 0;
      }
      value = this[key];
      delete this[key];
      this.length--;
      this.stateChanged();
      return value;
    };

    PropMap.prototype.values = function() {
      var all;
      if (!this.didValueStateChange) {
        return this.allVals;
      }
      all = [];
      this.keys().forEach((function(_this) {
        return function(key) {
          if (_.indexOf(propsToPop, key) === -1) {
            return all.push(_this[key]);
          }
        };
      })(this));
      all;
      this.didValueStateChange = false;
      this.keys();
      return this.allVals = all;
    };

    PropMap.prototype.keys = function() {
      var all, keys;
      if (!this.didKeyStateChange) {
        return this.allKeys;
      }
      keys = _.keys(this);
      all = [];
      _.each(keys, (function(_this) {
        return function(prop) {
          if (_.indexOf(propsToPop, prop) === -1) {
            return all.push(prop);
          }
        };
      })(this));
      this.didKeyStateChange = false;
      this.values();
      return this.allKeys = all;
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

    return PropMap;

  })();

  angular.module("google-maps.directives.api.utils".ns()).factory("PropMap".ns(), function() {
    return window.PropMap;
  });

}).call(this);

(function() {
  angular.module("google-maps.directives.api.utils".ns()).factory("PropertyAction".ns(), [
    "Logger".ns(), function(Logger) {
      var PropertyAction;
      PropertyAction = function(setterFn, isFirstSet, key) {
        var self;
        self = this;
        this.setIfChange = function(newVal, oldVal) {
          var callingKey;
          callingKey = this.exp;
          if (!_.isEqual(oldVal, newVal || isFirstSet)) {
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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.managers".ns()).factory("ClustererMarkerManager".ns(), [
    "Logger".ns(), "FitHelper".ns(), "PropMap".ns(), function($log, FitHelper, PropMap) {
      var ClustererMarkerManager;
      ClustererMarkerManager = (function(_super) {
        __extends(ClustererMarkerManager, _super);

        ClustererMarkerManager.type = 'ClustererMarkerManager';

        function ClustererMarkerManager(gMap, opt_markers, opt_options, opt_events) {
          var self;
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
          this.add = __bind(this.add, this);
          ClustererMarkerManager.__super__.constructor.call(this);
          this.type = ClustererMarkerManager.type;
          self = this;
          this.opt_options = opt_options;
          if ((opt_options != null) && opt_markers === void 0) {
            this.clusterer = new NgMapMarkerClusterer(gMap, void 0, opt_options);
          } else if ((opt_options != null) && (opt_markers != null)) {
            this.clusterer = new NgMapMarkerClusterer(gMap, opt_markers, opt_options);
          } else {
            this.clusterer = new NgMapMarkerClusterer(gMap);
          }
          this.propMapGMarkers = new PropMap();
          this.attachEvents(this.opt_events, "opt_events");
          this.clusterer.setIgnoreHidden(true);
          this.noDrawOnSingleAddRemoves = true;
          $log.info(this);
        }

        ClustererMarkerManager.prototype.checkKey = function(gMarker) {
          var msg;
          if (gMarker.key == null) {
            msg = "gMarker.key undefined and it is REQUIRED!!";
            return Logger.error(msg);
          }
        };

        ClustererMarkerManager.prototype.add = function(gMarker) {
          var exists;
          this.checkKey(gMarker);
          exists = this.propMapGMarkers.get(gMarker.key) != null;
          this.clusterer.addMarker(gMarker, this.noDrawOnSingleAddRemoves);
          this.propMapGMarkers.put(gMarker.key, gMarker);
          return this.checkSync();
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

        ClustererMarkerManager.prototype.clearEvents = function(options) {
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
          this.clearEvents(this.opt_events);
          this.clearEvents(this.opt_internal_events);
          return this.clear();
        };

        ClustererMarkerManager.prototype.fit = function() {
          return ClustererMarkerManager.__super__.fit.call(this, this.getGMarkers(), this.clusterer.getMap());
        };

        ClustererMarkerManager.prototype.getGMarkers = function() {
          return this.clusterer.getMarkers().values();
        };

        ClustererMarkerManager.prototype.checkSync = function() {
          if (this.getGMarkers().length !== this.propMapGMarkers.length) {
            throw "GMarkers out of Sync in MarkerClusterer";
          }
        };

        return ClustererMarkerManager;

      })(FitHelper);
      return ClustererMarkerManager;
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.managers".ns()).factory("MarkerManager".ns(), [
    "Logger".ns(), "FitHelper".ns(), "PropMap".ns(), function(Logger, FitHelper, PropMap) {
      var MarkerManager;
      MarkerManager = (function(_super) {
        __extends(MarkerManager, _super);

        MarkerManager.include(FitHelper);

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
          this.add = __bind(this.add, this);
          MarkerManager.__super__.constructor.call(this);
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
          exists = (this.gMarkers.get(gMarker.key)) != null;
          if (!exists) {
            this.handleOptDraw(gMarker, optDraw, true);
            return this.gMarkers.put(gMarker.key, gMarker);
          }
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
          return this.gMarkers.values().forEach((function(_this) {
            return function(marker) {
              return _this.remove(marker);
            };
          })(this));
        };

        MarkerManager.prototype.draw = function() {
          var deletes;
          deletes = [];
          this.gMarkers.values().forEach((function(_this) {
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
          this.gMarkers.values().forEach(function(gMarker) {
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
          return MarkerManager.__super__.fit.call(this, this.getGMarkers(), this.gMap);
        };

        MarkerManager.prototype.getGMarkers = function() {
          return this.gMarkers.values();
        };

        return MarkerManager;

      })(FitHelper);
      return MarkerManager;
    }
  ]);

}).call(this);

(function() {
  angular.module("google-maps".ns()).factory("add-events".ns(), [
    "$timeout", function($timeout) {
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

(function() {
  angular.module("google-maps".ns()).factory("array-sync".ns(), [
    "add-events".ns(), function(mapEvents) {
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
          if (scopePath.type === "Polygon") {
            geojsonArray = scopePath.coordinates[0];
          } else if (scopePath.type === "LineString") {
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
              if (typeof newValue.equals === "function") {
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
              if (typeof newValue.lat === "function" && typeof newValue.lng === "function") {
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
            if (scopePath.type === "Polygon") {
              array = newPath.coordinates[0];
            } else if (scopePath.type === "LineString") {
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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.options.builders".ns()).service("CommonOptionsBuilder".ns(), [
    "BaseObject".ns(), "Logger".ns(), function(BaseObject, $log) {
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

        CommonOptionsBuilder.prototype.buildOpts = function(customOpts, forEachOpts) {
          var hasModel, model, opts, _ref, _ref1, _ref2;
          if (customOpts == null) {
            customOpts = {};
          }
          if (forEachOpts == null) {
            forEachOpts = {};
          }
          if (!this.scope) {
            $log.error("this.scope not defined in CommonOptionsBuilder can not buildOpts");
            return;
          }
          if (!this.map) {
            $log.error("this.map not defined in CommonOptionsBuilder can not buildOpts");
            return;
          }
          hasModel = _(this.scope).chain().keys().contains('model').value();
          model = hasModel ? this.scope.model : this.scope;
          opts = angular.extend(customOpts, this.DEFAULTS, {
            map: this.map,
            strokeColor: (_ref = model.stroke) != null ? _ref.color : void 0,
            strokeOpacity: (_ref1 = model.stroke) != null ? _ref1.opacity : void 0,
            strokeWeight: (_ref2 = model.stroke) != null ? _ref2.weight : void 0
          });
          angular.forEach(angular.extend(forEachOpts, {
            clickable: true,
            draggable: false,
            editable: false,
            "static": false,
            fit: false,
            visible: true,
            zIndex: 0
          }), (function(_this) {
            return function(defaultValue, key) {
              if (angular.isUndefined(model[key] || model[key] === null)) {
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

      })(BaseObject);
    }
  ]);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.options.builders".ns()).factory("PolylineOptionsBuilder".ns(), [
    "CommonOptionsBuilder".ns(), function(CommonOptionsBuilder) {
      var PolylineOptionsBuilder;
      return PolylineOptionsBuilder = (function(_super) {
        __extends(PolylineOptionsBuilder, _super);

        function PolylineOptionsBuilder() {
          return PolylineOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        PolylineOptionsBuilder.prototype.buildOpts = function(pathPoints) {
          return PolylineOptionsBuilder.__super__.buildOpts.call(this, {
            path: pathPoints
          }, {
            geodesic: false
          });
        };

        return PolylineOptionsBuilder;

      })(CommonOptionsBuilder);
    }
  ]).factory("ShapeOptionsBuilder".ns(), [
    "CommonOptionsBuilder".ns(), function(CommonOptionsBuilder) {
      var ShapeOptionsBuilder;
      return ShapeOptionsBuilder = (function(_super) {
        __extends(ShapeOptionsBuilder, _super);

        function ShapeOptionsBuilder() {
          return ShapeOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        ShapeOptionsBuilder.prototype.buildOpts = function(customOpts, forEachOpts) {
          var _ref, _ref1;
          customOpts = angular.extend(customOpts, {
            fillColor: (_ref = this.scope.fill) != null ? _ref.color : void 0,
            fillOpacity: (_ref1 = this.scope.fill) != null ? _ref1.opacity : void 0
          });
          return ShapeOptionsBuilder.__super__.buildOpts.call(this, customOpts, forEachOpts);
        };

        return ShapeOptionsBuilder;

      })(CommonOptionsBuilder);
    }
  ]).factory("PolygonOptionsBuilder".ns(), [
    "ShapeOptionsBuilder".ns(), function(ShapeOptionsBuilder) {
      var PolygonOptionsBuilder;
      return PolygonOptionsBuilder = (function(_super) {
        __extends(PolygonOptionsBuilder, _super);

        function PolygonOptionsBuilder() {
          return PolygonOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        PolygonOptionsBuilder.prototype.buildOpts = function(pathPoints) {
          return PolygonOptionsBuilder.__super__.buildOpts.call(this, {
            path: pathPoints
          }, {
            geodesic: false
          });
        };

        return PolygonOptionsBuilder;

      })(ShapeOptionsBuilder);
    }
  ]).factory("RectangleOptionsBuilder".ns(), [
    "ShapeOptionsBuilder".ns(), function(ShapeOptionsBuilder) {
      var RectangleOptionsBuilder;
      return RectangleOptionsBuilder = (function(_super) {
        __extends(RectangleOptionsBuilder, _super);

        function RectangleOptionsBuilder() {
          return RectangleOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        RectangleOptionsBuilder.prototype.buildOpts = function(bounds) {
          return RectangleOptionsBuilder.__super__.buildOpts.call(this, {
            bounds: bounds
          });
        };

        return RectangleOptionsBuilder;

      })(ShapeOptionsBuilder);
    }
  ]).factory("CircleOptionsBuilder".ns(), [
    "ShapeOptionsBuilder".ns(), function(ShapeOptionsBuilder) {
      var CircleOptionsBuilder;
      return CircleOptionsBuilder = (function(_super) {
        __extends(CircleOptionsBuilder, _super);

        function CircleOptionsBuilder() {
          return CircleOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        CircleOptionsBuilder.prototype.buildOpts = function(center, radius) {
          return CircleOptionsBuilder.__super__.buildOpts.call(this, {
            center: center,
            radius: radius
          });
        };

        return CircleOptionsBuilder;

      })(ShapeOptionsBuilder);
    }
  ]);

}).call(this);

(function() {
  angular.module("google-maps.directives.api.options".ns()).service("MarkerOptions".ns(), [
    "Logger".ns(), "GmapUtil".ns(), function($log, GmapUtil) {
      return _.extend(GmapUtil, {
        createOptions: function(coords, icon, defaults, map) {
          var opts;
          if (map == null) {
            map = void 0;
          }
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
          if ((options.labelContent != null) || (options.labelAnchor != null) || (options.labelClass != null) || (options.labelStyle != null) || (options.labelVisible != null)) {
            return true;
          } else {
            return false;
          }
        }
      });
    }
  ]);

}).call(this);


/*
angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicholas McCready - https://twitter.com/nmccready
Original idea from: http://stackoverflow.com/questions/22758950/google-map-drawing-freehand  , &
  http://jsfiddle.net/YsQdh/88/
 */

(function() {
  angular.module("google-maps.directives.api.models.child".ns()).factory("DrawFreeHandChildModel".ns(), [
    "Logger".ns(), '$q', function($log, $q) {
      var drawFreeHand, freeHandMgr;
      drawFreeHand = function(map, polys, enable) {
        var move, poly;
        this.polys = polys;
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
      freeHandMgr = function(map) {
        var disableMap, enable;
        this.map = map;
        enable = (function(_this) {
          return function() {
            var _ref;
            if ((_ref = _this.deferred) != null) {
              _ref.resolve();
            }
            return _this.map.setOptions(_this.oldOptions);
          };
        })(this);
        disableMap = (function(_this) {
          return function() {
            $log.info('disabling map move');
            _this.oldOptions = map.getOptions();
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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.child".ns()).factory("MarkerChildModel".ns(), [
    "ModelKey".ns(), "GmapUtil".ns(), "Logger".ns(), "EventsHelper".ns(), "PropertyAction".ns(), "MarkerOptions".ns(), "IMarker".ns(), "MarkerManager".ns(), function(ModelKey, GmapUtil, $log, EventsHelper, PropertyAction, MarkerOptions, IMarker, MarkerManager) {
      var MarkerChildModel, keys;
      keys = ['coords', 'icon', 'options', 'fit'];
      MarkerChildModel = (function(_super) {
        var destroy;

        __extends(MarkerChildModel, _super);

        MarkerChildModel.include(GmapUtil);

        MarkerChildModel.include(EventsHelper);

        MarkerChildModel.include(MarkerOptions);

        destroy = function(child) {
          if ((child != null ? child.gMarker : void 0) != null) {
            child.removeEvents(child.externalListeners);
            child.removeEvents(child.internalListeners);
            if (child != null ? child.gMarker : void 0) {
              if (child.removeFromManager) {
                child.gMarkerManager.remove(child.gMarker);
              }
              child.gMarker.setMap(null);
              return child.gMarker = null;
            }
          }
        };

        function MarkerChildModel(scope, model, keys, gMap, defaults, doClick, gMarkerManager, doDrawSelf, trackModel, needRedraw) {
          var action, firstTime;
          this.model = model;
          this.keys = keys;
          this.gMap = gMap;
          this.defaults = defaults;
          this.doClick = doClick;
          this.gMarkerManager = gMarkerManager;
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
          this.destroy = __bind(this.destroy, this);
          this.deferred = Promise.defer();
          _.each(this.keys, (function(_this) {
            return function(v, k) {
              return _this[k + 'Key'] = _.isFunction(_this.keys[k]) ? _this.keys[k]() : _this.keys[k];
            };
          })(this));
          this.idKey = this.idKeyKey || "id";
          if (this.model[this.idKey] != null) {
            this.id = this.model[this.idKey];
          }
          MarkerChildModel.__super__.constructor.call(this, scope);
          this.setMyScope('all', this.model, void 0, true);
          this.scope.getGMarker = (function(_this) {
            return function() {
              return _this.gMarker;
            };
          })(this);
          this.createMarker(this.model);
          firstTime = true;
          if (this.trackModel) {
            this.scope.model = this.model;
            this.scope.$watch('model', (function(_this) {
              return function(newValue, oldValue) {
                var changes;
                if (newValue !== oldValue) {
                  changes = _this.getChanges(newValue, oldValue, IMarker.keys);
                  return _.each(changes, function(v, k) {
                    _this.setMyScope(k, newValue, oldValue);
                    return _this.needRedraw = true;
                  });
                }
              };
            })(this), true);
          } else {
            action = new PropertyAction((function(_this) {
              return function(calledKey, newVal) {
                return _this.setMyScope(calledKey, scope);
              };
            })(this), false);
            _.each(this.keys, function(v, k) {
              return scope.$watch(k, action.sic, true);
            });
          }
          this.scope.$on("$destroy", (function(_this) {
            return function() {
              return destroy(_this);
            };
          })(this));
          $log.info(this);
        }

        MarkerChildModel.prototype.destroy = function(removeFromManager) {
          if (removeFromManager == null) {
            removeFromManager = true;
          }
          this.removeFromManager = removeFromManager;
          return this.scope.$destroy();
        };

        MarkerChildModel.prototype.setMyScope = function(thingThatChanged, model, oldModel, isInit) {
          var justCreated;
          if (oldModel == null) {
            oldModel = void 0;
          }
          if (isInit == null) {
            isInit = false;
          }
          if (model == null) {
            model = this.model;
          }
          if (!this.gMarker) {
            this.setOptions(this.scope);
            justCreated = true;
          }
          switch (thingThatChanged) {
            case 'all':
              return _.each(this.keys, (function(_this) {
                return function(v, k) {
                  return _this.setMyScope(k, model, oldModel, isInit);
                };
              })(this));
            case 'icon':
              return this.maybeSetScopeValue('icon', model, oldModel, this.iconKey, this.evalModelHandle, isInit, this.setIcon);
            case 'coords':
              return this.maybeSetScopeValue('coords', model, oldModel, this.coordsKey, this.evalModelHandle, isInit, this.setCoords);
            case 'options':
              if (!justCreated) {
                return this.createMarker(model, oldModel, isInit);
              }
          }
        };

        MarkerChildModel.prototype.createMarker = function(model, oldModel, isInit) {
          if (oldModel == null) {
            oldModel = void 0;
          }
          if (isInit == null) {
            isInit = false;
          }
          return this.maybeSetScopeValue('options', model, oldModel, this.optionsKey, this.evalModelHandle, isInit, this.setOptions);
        };

        MarkerChildModel.prototype.maybeSetScopeValue = function(scopePropName, model, oldModel, modelKey, evaluate, isInit, gSetter) {
          var newValue, oldVal;
          if (gSetter == null) {
            gSetter = void 0;
          }
          if (oldModel === void 0) {
            this.scope[scopePropName] = evaluate(model, modelKey);
            if (gSetter != null) {
              gSetter(this.scope);
            }
            return;
          }
          oldVal = evaluate(oldModel, modelKey);
          newValue = evaluate(model, modelKey);
          if (newValue !== oldVal) {
            this.scope[scopePropName] = newValue;
            if (!isInit) {
              if (gSetter != null) {
                gSetter(this.scope);
              }
              if (this.doDrawSelf) {
                return this.gMarkerManager.draw();
              }
            }
          }
        };

        MarkerChildModel.prototype.isNotValid = function(scope, doCheckGmarker) {
          var hasIdenticalScopes, hasNoGmarker;
          if (doCheckGmarker == null) {
            doCheckGmarker = true;
          }
          hasNoGmarker = !doCheckGmarker ? false : this.gMarker === void 0;
          hasIdenticalScopes = !this.trackModel ? scope.$id !== this.scope.$id : false;
          return hasIdenticalScopes || hasNoGmarker;
        };

        MarkerChildModel.prototype.setCoords = function(scope) {
          if (this.isNotValid(scope) || (this.gMarker == null)) {
            return;
          }
          if (this.getProp(this.coordsKey, this.model) != null) {
            if (!this.validateCoords(this.getProp(this.coordsKey, this.model))) {
              $log.debug("MarkerChild does not have coords yet. They may be defined later.");
              return;
            }
            this.gMarker.setPosition(this.getCoords(this.getProp(this.coordsKey, this.model)));
            this.gMarker.setVisible(this.validateCoords(this.getProp(this.coordsKey, this.model)));
            return this.gMarkerManager.add(this.gMarker);
          } else {
            return this.gMarkerManager.remove(this.gMarker);
          }
        };

        MarkerChildModel.prototype.setIcon = function(scope) {
          if (this.isNotValid(scope) || (this.gMarker == null)) {
            return;
          }
          this.gMarker.setIcon(this.getProp(this.iconKey, this.model));
          this.gMarkerManager.add(this.gMarker);
          this.gMarker.setPosition(this.getCoords(this.getProp(this.coordsKey, this.model)));
          return this.gMarker.setVisible(this.validateCoords(this.getProp(this.coordsKey, this.model)));
        };

        MarkerChildModel.prototype.setOptions = function(scope) {
          var coords, icon, _options;
          if (this.isNotValid(scope, false)) {
            return;
          }
          if (scope.coords == null) {
            return;
          }
          coords = this.getProp(this.coordsKey, this.model);
          icon = this.getProp(this.iconKey, this.model);
          _options = this.getProp(this.optionsKey, this.model);
          this.opts = this.createOptions(coords, icon, _options);
          if ((this.gMarker != null) && (this.isLabel(this.gMarker === this.isLabel(this.opts)))) {
            this.gMarker.setOptions(this.opts);
          } else {
            if (this.gMarker != null) {
              this.gMarkerManager.remove(this.gMarker);
              this.gMarker = null;
            }
          }
          if (!this.gMarker) {
            if (this.isLabel(this.opts)) {
              this.gMarker = new MarkerWithLabel(this.setLabelOptions(this.opts));
            } else {
              this.gMarker = new google.maps.Marker(this.opts);
            }
          }
          if (this.externalListeners) {
            this.removeEvents(this.externalListeners);
          }
          if (this.internalListeners) {
            this.removeEvents(this.internalListeners);
          }
          this.externalListeners = this.setEvents(this.gMarker, this.scope, this.model, ['dragend']);
          this.internalListeners = this.setEvents(this.gMarker, {
            events: this.internalEvents(),
            $apply: function() {}
          }, this.model);
          if (this.id != null) {
            this.gMarker.key = this.id;
          }
          this.gMarkerManager.add(this.gMarker);
          if (this.gMarker && (this.gMarker.getMap() || this.gMarkerManager.type !== MarkerManager.type)) {
            this.deferred.resolve(this.gMarker);
          } else {
            if (!this.gMarker) {
              this.deferred.reject("gMarker is null");
            }
            if (!(this.gMarker.getMap() && this.gMarkerManager.type === MarkerManager.type)) {
              $log.warn('gMarker has no map yet');
              this.deferred.resolve(this.gMarker);
            }
          }
          if (this.model[this.fitKey]) {
            return this.gMarkerManager.fit();
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
                newCoords = _this.setCoordsFromEvent(_this.modelOrKey(modelToSet, _this.coordsKey), _this.gMarker.getPosition());
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
                  return _this.scope.$apply(click(marker, eventName, _this.model, mousearg));
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

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("PolygonChildModel".ns(), [
    "PolygonOptionsBuilder".ns(), "Logger".ns(), "$timeout", "array-sync".ns(), "GmapUtil".ns(), "EventsHelper".ns(), function(Builder, $log, $timeout, arraySync, GmapUtil, EventsHelper) {
      var PolygonChildModel;
      return PolygonChildModel = (function(_super) {
        __extends(PolygonChildModel, _super);

        PolygonChildModel.include(GmapUtil);

        PolygonChildModel.include(EventsHelper);

        function PolygonChildModel(scope, attrs, map, defaults, model) {
          var arraySyncer, pathPoints, polygon;
          this.scope = scope;
          this.attrs = attrs;
          this.map = map;
          this.defaults = defaults;
          this.model = model;
          this.listeners = void 0;
          if (angular.isUndefined(scope.path) || scope.path === null || !this.validatePath(scope.path)) {
            $log.error("polygon: no valid path attribute found");
            return;
          }
          pathPoints = this.convertPathPoints(scope.path);
          polygon = new google.maps.Polygon(this.buildOpts(pathPoints));
          if (scope.fit) {
            this.extendMapBounds(this.map, pathPoints);
          }
          if (!scope["static"] && angular.isDefined(scope.editable)) {
            scope.$watch("editable", function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return polygon.setEditable(newValue);
              }
            });
          }
          if (angular.isDefined(scope.draggable)) {
            scope.$watch("draggable", function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return polygon.setDraggable(newValue);
              }
            });
          }
          if (angular.isDefined(scope.visible)) {
            scope.$watch("visible", function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return polygon.setVisible(newValue);
              }
            });
          }
          if (angular.isDefined(scope.geodesic)) {
            scope.$watch("geodesic", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(_this.buildOpts(polygon.getPath()));
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.opacity)) {
            scope.$watch("stroke.opacity", (function(_this) {
              return function(newValue, oldValue) {
                return polygon.setOptions(_this.buildOpts(polygon.getPath()));
              };
            })(this));
          }
          if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.weight)) {
            scope.$watch("stroke.weight", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(_this.buildOpts(polygon.getPath()));
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.color)) {
            scope.$watch("stroke.color", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(_this.buildOpts(polygon.getPath()));
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.fill) && angular.isDefined(scope.fill.color)) {
            scope.$watch("fill.color", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(_this.buildOpts(polygon.getPath()));
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.fill) && angular.isDefined(scope.fill.opacity)) {
            scope.$watch("fill.opacity", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(_this.buildOpts(polygon.getPath()));
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.zIndex)) {
            scope.$watch("zIndex", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(_this.buildOpts(polygon.getPath()));
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.events) && scope.events !== null && angular.isObject(scope.events)) {
            this.listeners = EventsHelper.setEvents(polygon, scope, scope);
          }
          arraySyncer = arraySync(polygon.getPath(), scope, "path", (function(_this) {
            return function(pathPoints) {
              if (scope.fit) {
                return _this.extendMapBounds(_this.map, pathPoints);
              }
            };
          })(this));
          scope.$on("$destroy", (function(_this) {
            return function() {
              polygon.setMap(null);
              _this.removeEvents(_this.listeners);
              if (arraySyncer) {
                arraySyncer();
                return arraySyncer = null;
              }
            };
          })(this));
        }

        return PolygonChildModel;

      })(Builder);
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("PolylineChildModel".ns(), [
    "PolylineOptionsBuilder".ns(), "Logger".ns(), "$timeout", "array-sync".ns(), "GmapUtil".ns(), "EventsHelper".ns(), function(Builder, $log, $timeout, arraySync, GmapUtil, EventsHelper) {
      var PolylineChildModel;
      return PolylineChildModel = (function(_super) {
        __extends(PolylineChildModel, _super);

        PolylineChildModel.include(GmapUtil);

        PolylineChildModel.include(EventsHelper);

        function PolylineChildModel(scope, attrs, map, defaults, model) {
          var createPolyline;
          this.scope = scope;
          this.attrs = attrs;
          this.map = map;
          this.defaults = defaults;
          this.model = model;
          this.clean = __bind(this.clean, this);
          createPolyline = (function(_this) {
            return function() {
              var pathPoints;
              pathPoints = _this.convertPathPoints(_this.scope.path);
              if (_this.polyline != null) {
                _this.clean();
              }
              if (pathPoints.length > 0) {
                _this.polyline = new google.maps.Polyline(_this.buildOpts(pathPoints));
              }
              if (_this.polyline) {
                if (_this.scope.fit) {
                  _this.extendMapBounds(map, pathPoints);
                }
                arraySync(_this.polyline.getPath(), _this.scope, "path", function(pathPoints) {
                  if (_this.scope.fit) {
                    return _this.extendMapBounds(map, pathPoints);
                  }
                });
                return _this.listeners = _this.model ? _this.setEvents(_this.polyline, _this.scope, _this.model) : _this.setEvents(_this.polyline, _this.scope, _this.scope);
              }
            };
          })(this);
          createPolyline();
          scope.$watch('path', (function(_this) {
            return function(newValue, oldValue) {
              if (!_.isEqual(newValue, oldValue) || !_this.polyline) {
                return createPolyline();
              }
            };
          })(this));
          if (!scope["static"] && angular.isDefined(scope.editable)) {
            scope.$watch("editable", (function(_this) {
              return function(newValue, oldValue) {
                var _ref;
                if (newValue !== oldValue) {
                  return (_ref = _this.polyline) != null ? _ref.setEditable(newValue) : void 0;
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.draggable)) {
            scope.$watch("draggable", (function(_this) {
              return function(newValue, oldValue) {
                var _ref;
                if (newValue !== oldValue) {
                  return (_ref = _this.polyline) != null ? _ref.setDraggable(newValue) : void 0;
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.visible)) {
            scope.$watch("visible", (function(_this) {
              return function(newValue, oldValue) {
                var _ref;
                if (newValue !== oldValue) {
                  return (_ref = _this.polyline) != null ? _ref.setVisible(newValue) : void 0;
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.geodesic)) {
            scope.$watch("geodesic", (function(_this) {
              return function(newValue, oldValue) {
                var _ref;
                if (newValue !== oldValue) {
                  return (_ref = _this.polyline) != null ? _ref.setOptions(_this.buildOpts(_this.polyline.getPath())) : void 0;
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.weight)) {
            scope.$watch("stroke.weight", (function(_this) {
              return function(newValue, oldValue) {
                var _ref;
                if (newValue !== oldValue) {
                  return (_ref = _this.polyline) != null ? _ref.setOptions(_this.buildOpts(_this.polyline.getPath())) : void 0;
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.color)) {
            scope.$watch("stroke.color", (function(_this) {
              return function(newValue, oldValue) {
                var _ref;
                if (newValue !== oldValue) {
                  return (_ref = _this.polyline) != null ? _ref.setOptions(_this.buildOpts(_this.polyline.getPath())) : void 0;
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.opacity)) {
            scope.$watch("stroke.opacity", (function(_this) {
              return function(newValue, oldValue) {
                var _ref;
                if (newValue !== oldValue) {
                  return (_ref = _this.polyline) != null ? _ref.setOptions(_this.buildOpts(_this.polyline.getPath())) : void 0;
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.icons)) {
            scope.$watch("icons", (function(_this) {
              return function(newValue, oldValue) {
                var _ref;
                if (newValue !== oldValue) {
                  return (_ref = _this.polyline) != null ? _ref.setOptions(_this.buildOpts(_this.polyline.getPath())) : void 0;
                }
              };
            })(this));
          }
          scope.$on("$destroy", (function(_this) {
            return function() {
              _this.clean();
              return _this.scope = null;
            };
          })(this));
          $log.info(this);
        }

        PolylineChildModel.prototype.clean = function() {
          var arraySyncer, _ref;
          this.removeEvents(this.listeners);
          if ((_ref = this.polyline) != null) {
            _ref.setMap(null);
          }
          this.polyline = null;
          if (arraySyncer) {
            arraySyncer();
            return arraySyncer = null;
          }
        };

        PolylineChildModel.prototype.destroy = function() {
          return this.scope.$destroy();
        };

        return PolylineChildModel;

      })(Builder);
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.child".ns()).factory("WindowChildModel".ns(), [
    "BaseObject".ns(), "GmapUtil".ns(), "Logger".ns(), "$compile", "$http", "$templateCache", function(BaseObject, GmapUtil, $log, $compile, $http, $templateCache) {
      var WindowChildModel;
      WindowChildModel = (function(_super) {
        __extends(WindowChildModel, _super);

        WindowChildModel.include(GmapUtil);

        function WindowChildModel(model, scope, opts, isIconVisibleOnClick, mapCtrl, markerScope, element, needToManualDestroy, markerIsVisibleAfterWindowClose) {
          this.model = model;
          this.scope = scope;
          this.opts = opts;
          this.isIconVisibleOnClick = isIconVisibleOnClick;
          this.mapCtrl = mapCtrl;
          this.markerScope = markerScope;
          this.element = element;
          this.needToManualDestroy = needToManualDestroy != null ? needToManualDestroy : false;
          this.markerIsVisibleAfterWindowClose = markerIsVisibleAfterWindowClose != null ? markerIsVisibleAfterWindowClose : true;
          this.getGWin = __bind(this.getGWin, this);
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
          this.getGmarker = function() {
            var _ref, _ref1;
            if (((_ref = this.markerScope) != null ? _ref['getGMarker'] : void 0) != null) {
              return (_ref1 = this.markerScope) != null ? _ref1.getGMarker() : void 0;
            }
          };
          this.googleMapsHandles = [];
          this.createGWin();
          if (this.getGmarker() != null) {
            this.getGmarker().setClickable(true);
          }
          this.watchElement();
          this.watchOptions();
          this.watchCoords();
          this.watchAndDoShow();
          this.scope.$on("$destroy", (function(_this) {
            return function() {
              return _this.destroy();
            };
          })(this));
          $log.info(this);
        }

        WindowChildModel.prototype.doShow = function() {
          if (this.scope.show) {
            return this.showWindow();
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
              var _ref;
              if (!_this.element || !_this.html) {
                return;
              }
              if (_this.html !== _this.element.html()) {
                if (_this.gWin) {
                  if ((_ref = _this.opts) != null) {
                    _ref.content = void 0;
                  }
                  _this.remove();
                  return _this.createGWin();
                }
              }
            };
          })(this));
        };

        WindowChildModel.prototype.createGWin = function() {
          var defaults, _opts, _ref, _ref1;
          if (this.gWin == null) {
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
            this.opts = this.createWindowOptions(this.getGmarker(), this.markerScope || this.scope, this.html, _opts);
          }
          if ((this.opts != null) && !this.gWin) {
            if (this.opts.boxClass && (window.InfoBox && typeof window.InfoBox === 'function')) {
              this.gWin = new window.InfoBox(this.opts);
            } else {
              this.gWin = new google.maps.InfoWindow(this.opts);
            }
            this.handleClick((_ref = this.scope) != null ? (_ref1 = _ref.options) != null ? _ref1.forceClick : void 0 : void 0);
            this.doShow();
            return this.googleMapsHandles.push(google.maps.event.addListener(this.gWin, 'closeclick', (function(_this) {
              return function() {
                if (_this.getGmarker()) {
                  _this.getGmarker().setAnimation(_this.oldMarkerAnimation);
                  if (_this.markerIsVisibleAfterWindowClose) {
                    _.delay(function() {
                      _this.getGmarker().setVisible(false);
                      return _this.getGmarker().setVisible(_this.markerIsVisibleAfterWindowClose);
                    }, 250);
                  }
                }
                _this.gWin.isOpen(false);
                _this.model.show = false;
                if (_this.scope.closeClick != null) {
                  return _this.scope.$apply(_this.scope.closeClick());
                } else {
                  return _this.scope.$apply();
                }
              };
            })(this)));
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
                  return _this.hideWindow();
                } else {
                  if (!_this.validateCoords(newValue)) {
                    $log.error("WindowChildMarker cannot render marker as scope.coords as no position on marker: " + (JSON.stringify(_this.model)));
                    return;
                  }
                  pos = _this.getCoords(newValue);
                  _this.gWin.setPosition(pos);
                  if (_this.opts) {
                    return _this.opts.position = pos;
                  }
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
                if (_this.gWin != null) {
                  _this.gWin.setOptions(_this.opts);
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
          var click;
          if (this.gWin == null) {
            return;
          }
          click = (function(_this) {
            return function() {
              var pos, _ref, _ref1;
              if (_this.gWin == null) {
                _this.createGWin();
              }
              pos = _this.scope.coords != null ? (_ref = _this.gWin) != null ? _ref.getPosition() : void 0 : (_ref1 = _this.getGmarker()) != null ? _ref1.getPosition() : void 0;
              if (!pos) {
                return;
              }
              if (_this.gWin != null) {
                _this.gWin.setPosition(pos);
                if (_this.opts) {
                  _this.opts.position = pos;
                }
                _this.showWindow();
              }
              if (_this.getGmarker() != null) {
                _this.initialMarkerVisibility = _this.getGmarker().getVisible();
                _this.oldMarkerAnimation = _this.getGmarker().getAnimation();
                return _this.getGmarker().setVisible(_this.isIconVisibleOnClick);
              }
            };
          })(this);
          if (forceClick) {
            click();
          }
          if (this.getGmarker()) {
            return this.googleMapsHandles.push(google.maps.event.addListener(this.getGmarker(), 'click', click));
          }
        };

        WindowChildModel.prototype.showWindow = function() {
          var compiled, show, templateScope;
          show = (function(_this) {
            return function() {
              if (_this.gWin != null) {
                if (!_this.gWin.isOpen()) {
                  _this.gWin.open(_this.mapCtrl, _this.getGmarker() ? _this.getGmarker() : void 0);
                  return _this.model.show = _this.gWin.isOpen();
                }
              }
            };
          })(this);
          if (this.scope.templateUrl) {
            if (this.gWin != null) {
              $http.get(this.scope.templateUrl, {
                cache: $templateCache
              }).then((function(_this) {
                return function(content) {
                  var compiled, templateScope;
                  templateScope = _this.scope.$new();
                  if (angular.isDefined(_this.scope.templateParameter)) {
                    templateScope.parameter = _this.scope.templateParameter;
                  }
                  compiled = $compile(content.data)(templateScope);
                  return _this.gWin.setContent(compiled[0]);
                };
              })(this));
            }
          } else if (this.scope.template) {
            if (this.gWin != null) {
              templateScope = this.scope.$new();
              if (angular.isDefined(this.scope.templateParameter)) {
                templateScope.parameter = this.scope.templateParameter;
              }
              compiled = $compile(this.scope.template)(templateScope);
              this.gWin.setContent(compiled[0]);
            }
          }
          return show();
        };

        WindowChildModel.prototype.hideWindow = function() {
          if ((this.gWin != null) && this.gWin.isOpen()) {
            return this.gWin.close();
          }
        };

        WindowChildModel.prototype.getLatestPosition = function(overridePos) {
          if ((this.gWin != null) && (this.getGmarker() != null) && !overridePos) {
            return this.gWin.setPosition(this.getGmarker().getPosition());
          } else {
            if (overridePos) {
              return this.gWin.setPosition(overridePos);
            }
          }
        };

        WindowChildModel.prototype.remove = function() {
          this.hideWindow();
          _.each(this.googleMapsHandles, function(h) {
            return google.maps.event.removeListener(h);
          });
          this.googleMapsHandles.length = 0;
          delete this.gWin;
          return delete this.opts;
        };

        WindowChildModel.prototype.destroy = function(manualOverride) {
          var self, _ref;
          if (manualOverride == null) {
            manualOverride = false;
          }
          this.remove();
          if ((this.scope != null) && ((_ref = this.scope) != null ? _ref.$$destroyed : void 0) && (this.needToManualDestroy || manualOverride)) {
            this.scope.$destroy();
          }
          return self = void 0;
        };

        WindowChildModel.prototype.getGWin = function() {
          return this.gWin;
        };

        return WindowChildModel;

      })(BaseObject);
      return WindowChildModel;
    }
  ]);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent".ns()).factory("CircleParentModel".ns(), [
    'Logger'.ns(), '$timeout', "GmapUtil".ns(), "EventsHelper".ns(), "CircleOptionsBuilder".ns(), function($log, $timeout, GmapUtil, EventsHelper, Builder) {
      var CircleParentModel;
      return CircleParentModel = (function(_super) {
        __extends(CircleParentModel, _super);

        CircleParentModel.include(GmapUtil);

        CircleParentModel.include(EventsHelper);

        function CircleParentModel(scope, element, attrs, map, DEFAULTS) {
          var circle, listeners;
          this.scope = scope;
          this.attrs = attrs;
          this.map = map;
          this.DEFAULTS = DEFAULTS;
          circle = new google.maps.Circle(this.buildOpts(GmapUtil.getCoords(scope.center), scope.radius));
          this.setMyOptions = (function(_this) {
            return function(newVals, oldVals) {
              if (!_.isEqual(newVals, oldVals)) {
                return circle.setOptions(_this.buildOpts(GmapUtil.getCoords(scope.center), scope.radius));
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
          listeners = this.setEvents(circle, scope, scope);
          google.maps.event.addListener(circle, 'radius_changed', function() {
            scope.radius = circle.getRadius();
            return $timeout(function() {
              return scope.$apply();
            });
          });
          google.maps.event.addListener(circle, 'center_changed', function() {
            if (angular.isDefined(scope.center.type)) {
              scope.center.coordinates[1] = circle.getCenter().lat();
              scope.center.coordinates[0] = circle.getCenter().lng();
            } else {
              scope.center.latitude = circle.getCenter().lat();
              scope.center.longitude = circle.getCenter().lng();
            }
            return $timeout(function() {
              return scope.$apply();
            });
          });
          scope.$on("$destroy", (function(_this) {
            return function() {
              _this.removeEvents(listeners);
              return circle.setMap(null);
            };
          })(this));
          $log.info(this);
        }

        return CircleParentModel;

      })(Builder);
    }
  ]);

}).call(this);

(function() {
  angular.module("google-maps.directives.api.models.parent".ns()).factory("DrawingManagerParentModel".ns(), [
    'Logger'.ns(), '$timeout', function($log, $timeout) {
      var DrawingManagerParentModel;
      return DrawingManagerParentModel = (function() {
        function DrawingManagerParentModel(scope, element, attrs, map) {
          var drawingManager;
          this.scope = scope;
          this.attrs = attrs;
          this.map = map;
          drawingManager = new google.maps.drawing.DrawingManager(this.scope.options);
          drawingManager.setMap(this.map);
          if (this.scope.control != null) {
            this.scope.control.getDrawingManager = (function(_this) {
              return function() {
                return drawingManager;
              };
            })(this);
          }
          if (!this.scope["static"] && this.scope.options) {
            this.scope.$watch("options", (function(_this) {
              return function(newValue) {
                return drawingManager != null ? drawingManager.setOptions(newValue) : void 0;
              };
            })(this), true);
          }
          scope.$on("$destroy", (function(_this) {
            return function() {
              drawingManager.setMap(null);
              return drawingManager = null;
            };
          })(this));
        }

        return DrawingManagerParentModel;

      })();
    }
  ]);

}).call(this);


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

  angular.module("google-maps.directives.api.models.parent".ns()).factory("IMarkerParentModel".ns(), [
    "ModelKey".ns(), "Logger".ns(), function(ModelKey, Logger) {
      var IMarkerParentModel;
      IMarkerParentModel = (function(_super) {
        __extends(IMarkerParentModel, _super);

        IMarkerParentModel.prototype.DEFAULTS = {};

        function IMarkerParentModel(scope, element, attrs, map) {
          this.scope = scope;
          this.element = element;
          this.attrs = attrs;
          this.map = map;
          this.onDestroy = __bind(this.onDestroy, this);
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

        IMarkerParentModel.prototype.watch = function(propNameToWatch, scope) {
          return scope.$watch(propNameToWatch, (function(_this) {
            return function(newValue, oldValue) {
              if (!_.isEqual(newValue, oldValue)) {
                return _this.onWatch(propNameToWatch, scope, newValue, oldValue);
              }
            };
          })(this), true);
        };

        IMarkerParentModel.prototype.onWatch = function(propNameToWatch, scope, newValue, oldValue) {};

        IMarkerParentModel.prototype.onDestroy = function(scope) {
          throw new String("OnDestroy Not Implemented!!");
        };

        return IMarkerParentModel;

      })(ModelKey);
      return IMarkerParentModel;
    }
  ]);

}).call(this);


/*
	- interface directive for all window(s) to derrive from
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent".ns()).factory("IWindowParentModel".ns(), [
    "ModelKey".ns(), "GmapUtil".ns(), "Logger".ns(), function(ModelKey, GmapUtil, Logger) {
      var IWindowParentModel;
      IWindowParentModel = (function(_super) {
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

        return IWindowParentModel;

      })(ModelKey);
      return IWindowParentModel;
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent".ns()).factory("LayerParentModel".ns(), [
    "BaseObject".ns(), "Logger".ns(), '$timeout', function(BaseObject, Logger, $timeout) {
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
            this.$log.info("type attribute for the layer directive is mandatory. Layer creation aborted!!");
            return;
          }
          this.createGoogleLayer();
          this.doShow = true;
          if (angular.isDefined(this.attrs.show)) {
            this.doShow = this.scope.show;
          }
          if (this.doShow && (this.gMap != null)) {
            this.layer.setMap(this.gMap);
          }
          this.scope.$watch("show", (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                _this.doShow = newValue;
                if (newValue) {
                  return _this.layer.setMap(_this.gMap);
                } else {
                  return _this.layer.setMap(null);
                }
              }
            };
          })(this), true);
          this.scope.$watch("options", (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                _this.layer.setMap(null);
                _this.layer = null;
                return _this.createGoogleLayer();
              }
            };
          })(this), true);
          this.scope.$on("$destroy", (function(_this) {
            return function() {
              return _this.layer.setMap(null);
            };
          })(this));
        }

        LayerParentModel.prototype.createGoogleLayer = function() {
          var fn;
          if (this.attrs.options == null) {
            this.layer = this.attrs.namespace === void 0 ? new google.maps[this.attrs.type]() : new google.maps[this.attrs.namespace][this.attrs.type]();
          } else {
            this.layer = this.attrs.namespace === void 0 ? new google.maps[this.attrs.type](this.scope.options) : new google.maps[this.attrs.namespace][this.attrs.type](this.scope.options);
          }
          if ((this.layer != null) && (this.onLayerCreated != null)) {
            fn = this.onLayerCreated(this.scope, this.layer);
            if (fn) {
              return fn(this.layer);
            }
          }
        };

        return LayerParentModel;

      })(BaseObject);
      return LayerParentModel;
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent".ns()).factory("MapTypeParentModel".ns(), [
    "BaseObject".ns(), "Logger".ns(), '$timeout', function(BaseObject, Logger, $timeout) {
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
            this.$log.info("options attribute for the map-type directive is mandatory. Map type creation aborted!!");
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
          this.scope.$watch("show", (function(_this) {
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
          this.scope.$watch("options", (function(_this) {
            return function(newValue, oldValue) {
              if (!_.isEqual(newValue, oldValue)) {
                return _this.refreshMapType();
              }
            };
          })(this), true);
          if (angular.isDefined(this.attrs.refresh)) {
            this.scope.$watch("refresh", (function(_this) {
              return function(newValue, oldValue) {
                if (!_.isEqual(newValue, oldValue)) {
                  return _this.refreshMapType();
                }
              };
            })(this), true);
          }
          this.scope.$on("$destroy", (function(_this) {
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
            this.$log.info("options should provide either getTile or getTileUrl methods. Map type creation aborted!!");
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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent".ns()).factory("MarkersParentModel".ns(), [
    "IMarkerParentModel".ns(), "ModelsWatcher".ns(), "PropMap".ns(), "MarkerChildModel".ns(), "_async".ns(), "ClustererMarkerManager".ns(), "MarkerManager".ns(), "$timeout", "IMarker".ns(), function(IMarkerParentModel, ModelsWatcher, PropMap, MarkerChildModel, _async, ClustererMarkerManager, MarkerManager, $timeout, IMarker) {
      var MarkersParentModel;
      MarkersParentModel = (function(_super) {
        __extends(MarkersParentModel, _super);

        MarkersParentModel.include(ModelsWatcher);

        function MarkersParentModel(scope, element, attrs, map) {
          this.onDestroy = __bind(this.onDestroy, this);
          this.newChildMarker = __bind(this.newChildMarker, this);
          this.updateChild = __bind(this.updateChild, this);
          this.pieceMeal = __bind(this.pieceMeal, this);
          this.reBuildMarkers = __bind(this.reBuildMarkers, this);
          this.createMarkersFromScratch = __bind(this.createMarkersFromScratch, this);
          this.validateScope = __bind(this.validateScope, this);
          this.onWatch = __bind(this.onWatch, this);
          var self;
          MarkersParentModel.__super__.constructor.call(this, scope, element, attrs, map);
          self = this;
          this.scope.markerModels = new PropMap();
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
          this.watch('models', scope);
          this.watch('doCluster', scope);
          this.watch('clusterOptions', scope);
          this.watch('clusterEvents', scope);
          this.watch('fit', scope);
          this.watch('idKey', scope);
          this.gMarkerManager = void 0;
          this.createMarkersFromScratch(scope);
        }

        MarkersParentModel.prototype.onWatch = function(propNameToWatch, scope, newValue, oldValue) {
          if (propNameToWatch === "idKey" && newValue !== oldValue) {
            this.idKey = newValue;
          }
          if (this.doRebuildAll) {
            return this.reBuildMarkers(scope);
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

        MarkersParentModel.prototype.createMarkersFromScratch = function(scope) {
          if (scope.doCluster) {
            if (scope.clusterEvents) {
              this.clusterInternalOptions = _.once((function(_this) {
                return function() {
                  var self, _ref, _ref1, _ref2;
                  self = _this;
                  if (!_this.origClusterEvents) {
                    _this.origClusterEvents = {
                      click: (_ref = scope.clusterEvents) != null ? _ref.click : void 0,
                      mouseout: (_ref1 = scope.clusterEvents) != null ? _ref1.mouseout : void 0,
                      mouseover: (_ref2 = scope.clusterEvents) != null ? _ref2.mouseover : void 0
                    };
                    return _.extend(scope.clusterEvents, {
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
                };
              })(this))();
            }
            if (scope.clusterOptions || scope.clusterEvents) {
              if (this.gMarkerManager === void 0) {
                this.gMarkerManager = new ClustererMarkerManager(this.map, void 0, scope.clusterOptions, this.clusterInternalOptions);
              } else {
                if (this.gMarkerManager.opt_options !== scope.clusterOptions) {
                  this.gMarkerManager = new ClustererMarkerManager(this.map, void 0, scope.clusterOptions, this.clusterInternalOptions);
                }
              }
            } else {
              this.gMarkerManager = new ClustererMarkerManager(this.map);
            }
          } else {
            this.gMarkerManager = new MarkerManager(this.map);
          }
          return _async.waitOrGo(this, (function(_this) {
            return function() {
              return _async.each(scope.models, function(model) {
                return _this.newChildMarker(model, scope);
              }, false).then(function() {
                _this.gMarkerManager.draw();
                if (scope.fit) {
                  return _this.gMarkerManager.fit();
                }
              });
            };
          })(this)).then((function(_this) {
            return function() {
              return _this.existingPieces = void 0;
            };
          })(this));
        };

        MarkersParentModel.prototype.reBuildMarkers = function(scope) {
          var _ref;
          if (!scope.doRebuild && scope.doRebuild !== void 0) {
            return;
          }
          if ((_ref = this.scope.markerModels) != null ? _ref.length : void 0) {
            this.onDestroy(scope);
          }
          return this.createMarkersFromScratch(scope);
        };

        MarkersParentModel.prototype.pieceMeal = function(scope) {
          var doChunk;
          doChunk = this.existingPieces != null ? false : _async.defaultChunkSize;
          if ((this.scope.models != null) && this.scope.models.length > 0 && this.scope.markerModels.length > 0) {
            return this.figureOutState(this.idKey, scope, this.scope.markerModels, this.modelKeyComparison, (function(_this) {
              return function(state) {
                var payload;
                payload = state;
                return _async.waitOrGo(_this, function() {
                  return _async.each(payload.removals, function(child) {
                    if (child != null) {
                      if (child.destroy != null) {
                        child.destroy();
                      }
                      return _this.scope.markerModels.remove(child.id);
                    }
                  }, doChunk).then(function() {
                    return _async.each(payload.adds, function(modelToAdd) {
                      return _this.newChildMarker(modelToAdd, scope);
                    }, doChunk);
                  }).then(function() {
                    return _async.each(payload.updates, function(update) {
                      return _this.updateChild(update.child, update.model);
                    }, doChunk);
                  }).then(function() {
                    if (payload.adds.length > 0 || payload.removals.length > 0 || payload.updates.length > 0) {
                      _this.gMarkerManager.draw();
                      scope.markerModels = _this.scope.markerModels;
                      if (scope.fit) {
                        return _this.gMarkerManager.fit();
                      }
                    }
                  });
                }).then(function() {
                  return _this.existingPieces = void 0;
                });
              };
            })(this));
          } else {
            return this.reBuildMarkers(scope);
          }
        };

        MarkersParentModel.prototype.updateChild = function(child, model) {
          if (model[this.idKey] == null) {
            this.$log.error("Marker model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.");
            return;
          }
          return child.setMyScope(model, child.model, false);
        };

        MarkersParentModel.prototype.newChildMarker = function(model, scope) {
          var child, childScope, doDrawSelf, keys;
          if (model[this.idKey] == null) {
            this.$log.error("Marker model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.");
            return;
          }
          this.$log.info('child', child, 'markers', this.scope.markerModels);
          childScope = scope.$new(true);
          childScope.events = scope.events;
          keys = {};
          _.each(IMarker.scopeKeys, function(v, k) {
            return keys[k] = scope[k];
          });
          child = new MarkerChildModel(childScope, model, keys, this.map, this.DEFAULTS, this.doClick, this.gMarkerManager, doDrawSelf = false);
          this.scope.markerModels.put(model[this.idKey], child);
          return child;
        };

        MarkersParentModel.prototype.onDestroy = function(scope) {
          return _async.waitOrGo(this, (function(_this) {
            return function() {
              _.each(_this.scope.markerModels.values(), function(model) {
                if (model != null) {
                  return model.destroy(false);
                }
              });
              delete _this.scope.markerModels;
              if (_this.gMarkerManager != null) {
                _this.gMarkerManager.clear();
              }
              _this.scope.markerModels = new PropMap();
              return Promise.resolve();
            };
          })(this));
        };

        MarkersParentModel.prototype.maybeExecMappedEvent = function(cluster, fnName) {
          var pair, _ref;
          if (_.isFunction((_ref = this.scope.clusterEvents) != null ? _ref[fnName] : void 0)) {
            pair = this.mapClusterToMarkerModels(cluster);
            if (this.origClusterEvents[fnName]) {
              return this.origClusterEvents[fnName](pair.cluster, pair.mapped);
            }
          }
        };

        MarkersParentModel.prototype.mapClusterToMarkerModels = function(cluster) {
          var gMarkers, mapped;
          gMarkers = cluster.getMarkers().values();
          mapped = gMarkers.map((function(_this) {
            return function(g) {
              return _this.scope.markerModels[g.key].model;
            };
          })(this));
          return {
            cluster: cluster,
            mapped: mapped
          };
        };

        return MarkersParentModel;

      })(IMarkerParentModel);
      return MarkersParentModel;
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent".ns()).factory("PolylinesParentModel".ns(), [
    "$timeout", "Logger".ns(), "ModelKey".ns(), "ModelsWatcher".ns(), "PropMap".ns(), "PolylineChildModel".ns(), "_async".ns(), function($timeout, Logger, ModelKey, ModelsWatcher, PropMap, PolylineChildModel, _async) {
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
          this.modelKeyComparison = __bind(this.modelKeyComparison, this);
          this.setChildScope = __bind(this.setChildScope, this);
          this.createChild = __bind(this.createChild, this);
          this.pieceMeal = __bind(this.pieceMeal, this);
          this.createAllNew = __bind(this.createAllNew, this);
          this.watchIdKey = __bind(this.watchIdKey, this);
          this.createChildScopes = __bind(this.createChildScopes, this);
          this.watchOurScope = __bind(this.watchOurScope, this);
          this.watchDestroy = __bind(this.watchDestroy, this);
          this.rebuildAll = __bind(this.rebuildAll, this);
          this.doINeedToWipe = __bind(this.doINeedToWipe, this);
          this.watchModels = __bind(this.watchModels, this);
          this.watch = __bind(this.watch, this);
          PolylinesParentModel.__super__.constructor.call(this, scope);
          self = this;
          this.$log = Logger;
          this.plurals = new PropMap();
          this.scopePropNames = ['path', 'stroke', 'clickable', 'draggable', 'editable', 'geodesic', 'icons', 'visible'];
          _.each(this.scopePropNames, (function(_this) {
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
              if (newValue !== oldValue) {
                _this[nameKey] = typeof newValue === 'function' ? newValue() : newValue;
                return _async.waitOrGo(_this, function() {
                  return _async.each(_.values(_this.plurals), function(model) {
                    return model.scope[name] = _this[nameKey] === 'self' ? model : model[_this[nameKey]];
                  });
                });
              }
            };
          })(this));
        };

        PolylinesParentModel.prototype.watchModels = function(scope) {
          return scope.$watch('models', (function(_this) {
            return function(newValue, oldValue) {
              if (!_.isEqual(newValue, oldValue)) {
                if (_this.doINeedToWipe(newValue)) {
                  return _this.rebuildAll(scope, true, true);
                } else {
                  return _this.createChildScopes(false);
                }
              }
            };
          })(this), true);
        };

        PolylinesParentModel.prototype.doINeedToWipe = function(newValue) {
          var newValueIsEmpty;
          newValueIsEmpty = newValue != null ? newValue.length === 0 : true;
          return this.plurals.length > 0 && newValueIsEmpty;
        };

        PolylinesParentModel.prototype.rebuildAll = function(scope, doCreate, doDelete) {
          return _async.waitOrGo(this, (function(_this) {
            return function() {
              return _async.each(_this.plurals.values(), function(model) {
                return model.destroy();
              }).then(function() {
                if (doDelete) {
                  delete _this.plurals;
                }
                _this.plurals = new PropMap();
                if (doCreate) {
                  return _this.createChildScopes();
                }
              });
            };
          })(this));
        };

        PolylinesParentModel.prototype.watchDestroy = function(scope) {
          return scope.$on("$destroy", (function(_this) {
            return function() {
              return _this.rebuildAll(scope, false, true);
            };
          })(this));
        };

        PolylinesParentModel.prototype.watchOurScope = function(scope) {
          return _.each(this.scopePropNames, (function(_this) {
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
            this.$log.error("No models to create polylines from! I Need direct models!");
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
          if (isArray == null) {
            isArray = false;
          }
          this.models = scope.models;
          if (this.firstTime) {
            this.watchModels(scope);
            this.watchDestroy(scope);
          }
          return _async.waitOrGo(this, (function(_this) {
            return function() {
              return _async.each(scope.models, function(model) {
                return _this.createChild(model, _this.gMap);
              });
            };
          })(this)).then((function(_this) {
            return function() {
              _this.firstTime = false;
              return _this.existingPieces = void 0;
            };
          })(this));
        };

        PolylinesParentModel.prototype.pieceMeal = function(scope, isArray) {
          var doChunk;
          if (isArray == null) {
            isArray = true;
          }
          doChunk = this.existingPieces != null ? false : _async.defaultChunkSize;
          this.models = scope.models;
          if ((scope != null) && (scope.models != null) && scope.models.length > 0 && this.plurals.length > 0) {
            return this.figureOutState(this.idKey, scope, this.plurals, this.modelKeyComparison, (function(_this) {
              return function(state) {
                var payload;
                payload = state;
                return _async.waitOrGo(_this, function() {
                  return _async.each(payload.removals, function(id) {
                    var child;
                    child = _this.plurals[id];
                    if (child != null) {
                      child.destroy();
                      return _this.plurals.remove(id);
                    }
                  }).then(function() {
                    return _async.each(payload.adds, function(modelToAdd) {
                      return _this.createChild(modelToAdd, _this.gMap);
                    });
                  }).then(function() {
                    return _this.existingPieces = void 0;
                  });
                });
              };
            })(this));
          } else {
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
            this.$log.error("Polyline model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.");
            return;
          }
          this.plurals.put(model[this.idKey], child);
          return child;
        };

        PolylinesParentModel.prototype.setChildScope = function(childScope, model) {
          _.each(this.scopePropNames, (function(_this) {
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

        PolylinesParentModel.prototype.modelKeyComparison = function(model1, model2) {
          return _.isEqual(this.evalModelHandle(model1, this.scope.path), this.evalModelHandle(model2, this.scope.path));
        };

        return PolylinesParentModel;

      })(ModelKey);
    }
  ]);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent".ns()).factory("RectangleParentModel".ns(), [
    "Logger".ns(), "GmapUtil".ns(), "EventsHelper".ns(), "RectangleOptionsBuilder".ns(), function($log, GmapUtil, EventsHelper, Builder) {
      var RectangleParentModel;
      return RectangleParentModel = (function(_super) {
        __extends(RectangleParentModel, _super);

        RectangleParentModel.include(GmapUtil);

        RectangleParentModel.include(EventsHelper);

        function RectangleParentModel(scope, element, attrs, map, DEFAULTS) {
          var bounds, clear, createBounds, dragging, fit, init, listeners, myListeners, rectangle, settingBoundsFromScope, updateBounds;
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
                return $log.info("new new bounds created: " + rectangle);
              } else if ((scope.bounds.getNorthEast != null) && (scope.bounds.getSouthWest != null)) {
                return bounds = scope.bounds;
              } else {
                if (typeof bound !== "undefined" && bound !== null) {
                  return $log.error("Invalid bounds for newValue: " + (JSON.stringify(scope.bounds)));
                }
              }
            };
          })(this);
          createBounds();
          rectangle = new google.maps.Rectangle(this.buildOpts(bounds));
          $log.info("rectangle created: " + rectangle);
          settingBoundsFromScope = false;
          updateBounds = (function(_this) {
            return function() {
              var b, ne, sw;
              b = rectangle.getBounds();
              ne = b.getNorthEast();
              sw = b.getSouthWest();
              if (settingBoundsFromScope) {
                return;
              }
              return _.defer(function() {
                return scope.$apply(function(s) {
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
              });
            };
          })(this);
          init = (function(_this) {
            return function() {
              fit();
              _this.removeEvents(myListeners);
              myListeners.push(google.maps.event.addListener(rectangle, "dragstart", function() {
                return dragging = true;
              }));
              myListeners.push(google.maps.event.addListener(rectangle, "dragend", function() {
                dragging = false;
                return updateBounds();
              }));
              return myListeners.push(google.maps.event.addListener(rectangle, "bounds_changed", function() {
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
              return rectangle.setMap(null);
            };
          })(this);
          if (bounds != null) {
            init();
          }
          scope.$watch("bounds", (function(newValue, oldValue) {
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
            rectangle.setBounds(bounds);
            settingBoundsFromScope = false;
            if (isNew && (bounds != null)) {
              return init();
            }
          }), true);
          this.setMyOptions = (function(_this) {
            return function(newVals, oldVals) {
              if (!_.isEqual(newVals, oldVals)) {
                if ((bounds != null) && (newVals != null)) {
                  return rectangle.setOptions(_this.buildOpts(bounds));
                }
              }
            };
          })(this);
          this.props.push('bounds');
          this.watchProps(this.props);
          if (attrs.events != null) {
            listeners = this.setEvents(rectangle, scope, scope);
            scope.$watch("events", (function(_this) {
              return function(newValue, oldValue) {
                if (!_.isEqual(newValue, oldValue)) {
                  if (listeners != null) {
                    _this.removeEvents(listeners);
                  }
                  return listeners = _this.setEvents(rectangle, scope, scope);
                }
              };
            })(this));
          }
          scope.$on("$destroy", (function(_this) {
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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent".ns()).factory("SearchBoxParentModel".ns(), [
    "BaseObject".ns(), "Logger".ns(), "EventsHelper".ns(), '$timeout', '$http', '$templateCache', function(BaseObject, Logger, EventsHelper, $timeout, $http, $templateCache) {
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
          this.getBounds = __bind(this.getBounds, this);
          this.setBounds = __bind(this.setBounds, this);
          this.createSearchBox = __bind(this.createSearchBox, this);
          this.addToParentDiv = __bind(this.addToParentDiv, this);
          this.addAsMapControl = __bind(this.addAsMapControl, this);
          this.init = __bind(this.init, this);
          if (this.attrs.template == null) {
            this.$log.error("template attribute for the search-box directive is mandatory. Places Search Box creation aborted!!");
            return;
          }
          controlDiv = angular.element('<div></div>');
          controlDiv.append(this.template);
          this.input = controlDiv.find('input')[0];
          this.init();
        }

        SearchBoxParentModel.prototype.init = function() {
          this.createSearchBox();
          if (this.attrs.parentdiv != null) {
            this.addToParentDiv();
          } else {
            this.addAsMapControl();
          }
          this.listener = google.maps.event.addListener(this.searchBox, 'places_changed', (function(_this) {
            return function() {
              return _this.places = _this.searchBox.getPlaces();
            };
          })(this));
          this.listeners = this.setEvents(this.searchBox, this.scope, this.scope);
          this.$log.info(this);
          this.scope.$watch("options", (function(_this) {
            return function(newValue, oldValue) {
              if (angular.isObject(newValue)) {
                if (newValue.bounds != null) {
                  return _this.setBounds(newValue.bounds);
                }
              }
            };
          })(this), true);
          return this.scope.$on("$destroy", (function(_this) {
            return function() {
              return _this.searchBox = null;
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
          return this.searchBox = new google.maps.places.SearchBox(this.input, this.scope.options);
        };

        SearchBoxParentModel.prototype.setBounds = function(bounds) {
          if (angular.isUndefined(bounds.isEmpty)) {
            this.$log.error("Error: SearchBoxParentModel setBounds. Bounds not an instance of LatLngBounds.");
          } else {
            if (bounds.isEmpty() === false) {
              if (this.searchBox != null) {
                return this.searchBox.setBounds(bounds);
              }
            }
          }
        };

        SearchBoxParentModel.prototype.getBounds = function() {
          return this.searchBox.getBounds();
        };

        return SearchBoxParentModel;

      })(BaseObject);
      return SearchBoxParentModel;
    }
  ]);

}).call(this);


/*
	WindowsChildModel generator where there are many ChildModels to a parent.
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent".ns()).factory("WindowsParentModel".ns(), [
    "IWindowParentModel".ns(), "ModelsWatcher".ns(), "PropMap".ns(), "WindowChildModel".ns(), "Linked".ns(), "_async".ns(), "Logger".ns(), '$timeout', '$compile', '$http', '$templateCache', '$interpolate', function(IWindowParentModel, ModelsWatcher, PropMap, WindowChildModel, Linked, _async, $log, $timeout, $compile, $http, $templateCache, $interpolate) {
      var WindowsParentModel;
      WindowsParentModel = (function(_super) {
        __extends(WindowsParentModel, _super);

        WindowsParentModel.include(ModelsWatcher);

        function WindowsParentModel(scope, element, attrs, ctrls, gMap, markersScope) {
          var self;
          this.gMap = gMap;
          this.markersScope = markersScope;
          this.interpolateContent = __bind(this.interpolateContent, this);
          this.setChildScope = __bind(this.setChildScope, this);
          this.createWindow = __bind(this.createWindow, this);
          this.setContentKeys = __bind(this.setContentKeys, this);
          this.pieceMealWindows = __bind(this.pieceMealWindows, this);
          this.createAllNewWindows = __bind(this.createAllNewWindows, this);
          this.watchIdKey = __bind(this.watchIdKey, this);
          this.createChildScopesWindows = __bind(this.createChildScopesWindows, this);
          this.watchOurScope = __bind(this.watchOurScope, this);
          this.watchDestroy = __bind(this.watchDestroy, this);
          this.rebuildAll = __bind(this.rebuildAll, this);
          this.doINeedToWipe = __bind(this.doINeedToWipe, this);
          this.watchModels = __bind(this.watchModels, this);
          this.go = __bind(this.go, this);
          WindowsParentModel.__super__.constructor.call(this, scope, element, attrs, ctrls, $timeout, $compile, $http, $templateCache);
          self = this;
          this.windows = new PropMap();
          this.scopePropNames = ['coords', 'template', 'templateUrl', 'templateParameter', 'isIconVisibleOnClick', 'closeClick', 'options', 'show'];
          _.each(this.scopePropNames, (function(_this) {
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
          return this.createChildScopesWindows();
        };

        WindowsParentModel.prototype.watchModels = function(scope) {
          return scope.$watch('models', (function(_this) {
            return function(newValue, oldValue) {
              var doScratch;
              if (!_.isEqual(newValue, oldValue) || _this.firstWatchModels) {
                _this.firstWatchModels = false;
                if (_this.doRebuildAll || _this.doINeedToWipe(newValue)) {
                  return _this.rebuildAll(scope, true, true);
                } else {
                  doScratch = _this.windows.length === 0;
                  if (_this.existingPieces != null) {
                    return _this.existingPieces.then(function() {
                      return _this.createChildScopesWindows(doScratch);
                    });
                  } else {
                    return _this.createChildScopesWindows(doScratch);
                  }
                }
              }
            };
          })(this), true);
        };

        WindowsParentModel.prototype.doINeedToWipe = function(newValue) {
          var newValueIsEmpty;
          newValueIsEmpty = newValue != null ? newValue.length === 0 : true;
          return this.windows.length > 0 && newValueIsEmpty;
        };

        WindowsParentModel.prototype.rebuildAll = function(scope, doCreate, doDelete) {
          return _async.waitOrGo(this, (function(_this) {
            return function() {
              return _async.each(_this.windows.values(), function(model) {
                return model.destroy();
              }).then(function() {
                if (doDelete) {
                  delete _this.windows;
                }
                _this.windows = new PropMap();
                if (doCreate) {
                  _this.createChildScopesWindows();
                }
                return Promise.resolve();
              });
            };
          })(this));
        };

        WindowsParentModel.prototype.watchDestroy = function(scope) {
          return scope.$on("$destroy", (function(_this) {
            return function() {
              _this.firstWatchModels = true;
              _this.firstTime = true;
              return _this.rebuildAll(scope, false, true);
            };
          })(this));
        };

        WindowsParentModel.prototype.watchOurScope = function(scope) {
          return _.each(this.scopePropNames, (function(_this) {
            return function(name) {
              var nameKey;
              nameKey = name + 'Key';
              return _this[nameKey] = typeof scope[name] === 'function' ? scope[name]() : scope[name];
            };
          })(this));
        };

        WindowsParentModel.prototype.createChildScopesWindows = function(isCreatingFromScratch) {
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
          if (modelsNotDefined && (this.markersScope === void 0 || (((_ref = this.markersScope) != null ? _ref.markerModels : void 0) === void 0 || ((_ref1 = this.markersScope) != null ? _ref1.models : void 0) === void 0))) {
            this.$log.error("No models to create windows from! Need direct models or models derrived from markers!");
            return;
          }
          if (this.gMap != null) {
            if (this.linked.scope.models != null) {
              this.watchIdKey(this.linked.scope);
              if (isCreatingFromScratch) {
                return this.createAllNewWindows(this.linked.scope, false);
              } else {
                return this.pieceMealWindows(this.linked.scope, false);
              }
            } else {
              this.parentScope = this.markersScope;
              this.watchIdKey(this.parentScope);
              if (isCreatingFromScratch) {
                return this.createAllNewWindows(this.markersScope, true, 'markerModels', false);
              } else {
                return this.pieceMealWindows(this.markersScope, true, 'markerModels', false);
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

        WindowsParentModel.prototype.createAllNewWindows = function(scope, hasGMarker, modelsPropToIterate, isArray) {
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
          return _async.waitOrGo(this, (function(_this) {
            return function() {
              return _async.each(scope.models, function(model) {
                var gMarker, _ref;
                gMarker = hasGMarker ? (_ref = scope[modelsPropToIterate][[model[_this.idKey]]]) != null ? _ref.gMarker : void 0 : void 0;
                return _this.createWindow(model, gMarker, _this.gMap);
              });
            };
          })(this)).then((function(_this) {
            return function() {
              return _this.firstTime = false;
            };
          })(this));
        };

        WindowsParentModel.prototype.pieceMealWindows = function(scope, hasGMarker, modelsPropToIterate, isArray) {
          var doChunk;
          if (modelsPropToIterate == null) {
            modelsPropToIterate = 'models';
          }
          if (isArray == null) {
            isArray = true;
          }
          doChunk = this.existingPieces != null ? false : _async.defaultChunkSize;
          this.models = scope.models;
          if ((scope != null) && (scope.models != null) && scope.models.length > 0 && this.windows.length > 0) {
            return this.figureOutState(this.idKey, scope, this.windows, this.modelKeyComparison, (function(_this) {
              return function(state) {
                var payload;
                payload = state;
                return _async.waitOrGo(_this, function() {
                  return _async.each(payload.removals, function(child) {
                    if (child != null) {
                      _this.windows.remove(child.id);
                      if (child.destroy != null) {
                        return child.destroy(true);
                      }
                    }
                  }, doChunk).then(function() {
                    return _async.each(payload.adds, function(modelToAdd) {
                      var gMarker, _ref;
                      gMarker = (_ref = scope[modelsPropToIterate][modelToAdd[_this.idKey]]) != null ? _ref.gMarker : void 0;
                      if (!gMarker) {
                        throw "Gmarker undefined";
                      }
                      return _this.createWindow(modelToAdd, gMarker, _this.gMap);
                    }, doChunk);
                  });
                }).then(function() {
                  return _this.existingPieces = void 0;
                })["catch"](function(e) {
                  return $log.error("Error while pieceMealing Windows!");
                });
              };
            })(this));
          } else {
            return this.rebuildAll(this.scope, true, true);
          }
        };

        WindowsParentModel.prototype.setContentKeys = function(models) {
          if (models.length > 0) {
            return this.contentKeys = Object.keys(models[0]);
          }
        };

        WindowsParentModel.prototype.createWindow = function(model, gMarker, gMap) {
          var child, childScope, fakeElement, opts;
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
          this.DEFAULTS = this.markersScope ? model[this.optionsKey] || {} : this.DEFAULTS;
          opts = this.createWindowOptions(gMarker, childScope, fakeElement.html(), this.DEFAULTS);
          child = new WindowChildModel(model, childScope, opts, this.isIconVisibleOnClick, gMap, this.markersScope.markerModels[model[this.idKey]].scope, fakeElement, false, true);
          if (model[this.idKey] == null) {
            this.$log.error("Window model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.");
            return;
          }
          this.windows.put(model[this.idKey], child);
          return child;
        };

        WindowsParentModel.prototype.setChildScope = function(childScope, model) {
          _.each(this.scopePropNames, (function(_this) {
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

        return WindowsParentModel;

      })(IWindowParentModel);
      return WindowsParentModel;
    }
  ]);

}).call(this);

(function() {
  angular.module("google-maps.directives.api".ns()).factory("Circle".ns(), [
    "ICircle".ns(), "CircleParentModel".ns(), function(ICircle, CircleParentModel) {
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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("Control".ns(), [
    "IControl".ns(), "$http", "$templateCache", "$compile", "$controller", 'GoogleMapApi'.ns(), function(IControl, $http, $templateCache, $compile, $controller, GoogleMapApi) {
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
                  if (index) {
                    controlDiv[0].index = index;
                  }
                  if (angular.isDefined(scope.controller)) {
                    templateCtrl = $controller(scope.controller, {
                      $scope: templateScope
                    });
                    controlDiv.children().data('$ngControllerController', templateCtrl);
                  }
                  return control = $compile(controlDiv.contents())(templateScope);
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

(function() {
  angular.module("google-maps.directives.api".ns()).factory("DrawingManager".ns(), [
    "IDrawingManager".ns(), "DrawingManagerParentModel".ns(), function(IDrawingManager, DrawingManagerParentModel) {
      return _.extend(IDrawingManager, {
        link: function(scope, element, attrs, mapCtrl) {
          return mapCtrl.getScope().deferred.promise.then((function(_this) {
            return function(map) {
              return new DrawingManagerParentModel(scope, element, attrs, map);
            };
          })(this));
        }
      });
    }
  ]);

}).call(this);


/*
  - Link up Polygons to be sent back to a controller
  - inject the draw function into a controllers scope so that controller can call the directive to draw on demand
  - draw function creates the DrawFreeHandChildModel which manages itself
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory('ApiFreeDrawPolygons'.ns(), [
    "Logger".ns(), 'BaseObject'.ns(), "CtrlHandle".ns(), "DrawFreeHandChildModel".ns(), function($log, BaseObject, CtrlHandle, DrawFreeHandChildModel) {
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

        FreeDrawPolygons.prototype.require = '^' + 'GoogleMap'.ns();

        FreeDrawPolygons.prototype.scope = {
          polygons: '=',
          draw: '='
        };

        FreeDrawPolygons.prototype.link = function(scope, element, attrs, ctrl) {
          return this.mapPromise(scope, ctrl).then((function(_this) {
            return function(map) {
              var freeHand, listener;
              if (!scope.polygons) {
                return $log.error("No polygons to bind to!");
              }
              if (!_.isArray(scope.polygons)) {
                return $log.error("Free Draw Polygons must be of type Array!");
              }
              freeHand = new DrawFreeHandChildModel(map, scope.originalMapOpts);
              listener = void 0;
              return scope.draw = function() {
                if (typeof listener === "function") {
                  listener();
                }
                return freeHand.engage(scope.polygons).then(function() {
                  var firstTime;
                  firstTime = true;
                  return listener = scope.$watch('polygons', function(newValue, oldValue) {
                    var removals;
                    if (firstTime) {
                      firstTime = false;
                      return;
                    }
                    removals = _.differenceObjects(oldValue, newValue);
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

(function() {
  angular.module("google-maps.directives.api".ns()).service("ICircle".ns(), [
    function() {
      var DEFAULTS;
      DEFAULTS = {};
      return {
        restrict: "EA",
        replace: true,
        require: '^' + 'GoogleMap'.ns(),
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
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("IControl".ns(), [
    "BaseObject".ns(), "Logger".ns(), "CtrlHandle".ns(), function(BaseObject, Logger, CtrlHandle) {
      var IControl;
      return IControl = (function(_super) {
        __extends(IControl, _super);

        IControl.extend(CtrlHandle);

        function IControl() {
          this.link = __bind(this.link, this);
          this.restrict = 'EA';
          this.replace = true;
          this.require = '^' + 'GoogleMap'.ns();
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

(function() {
  angular.module("google-maps.directives.api".ns()).service("IDrawingManager".ns(), [
    function() {
      return {
        restrict: "EA",
        replace: true,
        require: '^' + 'GoogleMap'.ns(),
        scope: {
          "static": "@",
          control: "=",
          options: "="
        }
      };
    }
  ]);

}).call(this);


/*
	- interface for all markers to derrive from
 	- to enforce a minimum set of requirements
 		- attributes
 			- coords
 			- icon
		- implementation needed on watches
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("IMarker".ns(), [
    "Logger".ns(), "BaseObject".ns(), "CtrlHandle".ns(), function(Logger, BaseObject, CtrlHandle) {
      var IMarker;
      return IMarker = (function(_super) {
        __extends(IMarker, _super);

        IMarker.scopeKeys = {
          coords: '=coords',
          icon: '=icon',
          click: '&click',
          options: '=options',
          events: '=events',
          fit: '=fit',
          idKey: '=idkey',
          control: '=control'
        };

        IMarker.keys = _.keys(IMarker.scopeKeys);

        IMarker.extend(CtrlHandle);

        function IMarker() {
          this.$log = Logger;
          this.restrict = 'EMA';
          this.require = '^' + 'GoogleMap'.ns();
          this.priority = -1;
          this.transclude = true;
          this.replace = true;
          this.scope = IMarker.scopeKeys;
        }

        return IMarker;

      })(BaseObject);
    }
  ]);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("IPolygon".ns(), [
    "GmapUtil".ns(), "BaseObject".ns(), "Logger".ns(), "CtrlHandle".ns(), function(GmapUtil, BaseObject, Logger, CtrlHandle) {
      var IPolygon;
      return IPolygon = (function(_super) {
        __extends(IPolygon, _super);

        IPolygon.include(GmapUtil);

        IPolygon.extend(CtrlHandle);

        function IPolygon() {}

        IPolygon.prototype.restrict = "EMA";

        IPolygon.prototype.replace = true;

        IPolygon.prototype.require = '^' + 'GoogleMap'.ns();

        IPolygon.prototype.scope = {
          path: "=path",
          stroke: "=stroke",
          clickable: "=",
          draggable: "=",
          editable: "=",
          geodesic: "=",
          fill: "=",
          icons: "=icons",
          visible: "=",
          "static": "=",
          events: "=",
          zIndex: "=zindex",
          fit: "=",
          control: "=control"
        };

        IPolygon.prototype.DEFAULTS = {};

        IPolygon.prototype.$log = Logger;

        return IPolygon;

      })(BaseObject);
    }
  ]);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("IPolyline".ns(), [
    "GmapUtil".ns(), "BaseObject".ns(), "Logger".ns(), "CtrlHandle".ns(), function(GmapUtil, BaseObject, Logger, CtrlHandle) {
      var IPolyline;
      return IPolyline = (function(_super) {
        __extends(IPolyline, _super);

        IPolyline.include(GmapUtil);

        IPolyline.extend(CtrlHandle);

        function IPolyline() {}

        IPolyline.prototype.restrict = "EMA";

        IPolyline.prototype.replace = true;

        IPolyline.prototype.require = '^' + 'GoogleMap'.ns();

        IPolyline.prototype.scope = {
          path: "=",
          stroke: "=",
          clickable: "=",
          draggable: "=",
          editable: "=",
          geodesic: "=",
          icons: "=",
          visible: "=",
          "static": "=",
          fit: "=",
          events: "="
        };

        IPolyline.prototype.DEFAULTS = {};

        IPolyline.prototype.$log = Logger;

        return IPolyline;

      })(BaseObject);
    }
  ]);

}).call(this);

(function() {
  angular.module("google-maps.directives.api".ns()).service("IRectangle".ns(), [
    function() {
      "use strict";
      var DEFAULTS;
      DEFAULTS = {};
      return {
        restrict: "EMA",
        require: '^' + 'GoogleMap'.ns(),
        replace: true,
        scope: {
          bounds: "=",
          stroke: "=",
          clickable: "=",
          draggable: "=",
          editable: "=",
          fill: "=",
          visible: "=",
          events: "="
        }
      };
    }
  ]);

}).call(this);


/*
	- interface directive for all window(s) to derive from
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("IWindow".ns(), [
    "BaseObject".ns(), "ChildEvents".ns(), "Logger".ns(), "CtrlHandle".ns(), function(BaseObject, ChildEvents, Logger, CtrlHandle) {
      var IWindow;
      return IWindow = (function(_super) {
        __extends(IWindow, _super);

        IWindow.include(ChildEvents);

        IWindow.extend(CtrlHandle);

        function IWindow() {
          this.restrict = 'EMA';
          this.template = void 0;
          this.transclude = true;
          this.priority = -100;
          this.require = '^' + 'GoogleMap'.ns();
          this.replace = true;
          this.scope = {
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
          this.$log = Logger;
        }

        return IWindow;

      })(BaseObject);
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("Map".ns(), [
    "$timeout", '$q', "Logger".ns(), "GmapUtil".ns(), "BaseObject".ns(), "CtrlHandle".ns(), 'IsReady'.ns(), "uuid".ns(), "ExtendGWin".ns(), "ExtendMarkerClusterer".ns(), "GoogleMapsUtilV3".ns(), 'GoogleMapApi'.ns(), function($timeout, $q, $log, GmapUtil, BaseObject, CtrlHandle, IsReady, uuid, ExtendGWin, ExtendMarkerClusterer, GoogleMapsUtilV3, GoogleMapApi) {
      "use strict";
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
          this.controller = ["$scope", ctrlFn];
          self = this;
        }

        Map.prototype.restrict = "EMA";

        Map.prototype.transclude = true;

        Map.prototype.replace = false;

        Map.prototype.template = '<div class="angular-google-map"><div class="angular-google-map-container"></div><div ng-transclude style="display: none"></div></div>';

        Map.prototype.scope = {
          center: "=",
          zoom: "=",
          dragging: "=",
          control: "=",
          options: "=",
          events: "=",
          styles: "=",
          bounds: "="
        };


        /*
        @param scope
        @param element
        @param attrs
         */

        Map.prototype.link = function(scope, element, attrs) {
          var unbindCenterWatch;
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
              var dragging, el, eventName, getEventHandler, mapOptions, opts, resolveSpawned, settingCenterFromScope, spawned, type, _m;
              DEFAULTS = {
                mapTypeId: maps.MapTypeId.ROADMAP
              };
              spawned = IsReady.spawn();
              resolveSpawned = function() {
                return spawned.deferred.resolve({
                  instance: spawned.instance,
                  map: _m
                });
              };
              if (!_this.validateCoords(scope.center)) {
                $log.error("angular-google-maps: could not find a valid center property");
                return;
              }
              if (!angular.isDefined(scope.zoom)) {
                $log.error("angular-google-maps: map zoom property not set");
                return;
              }
              el = angular.element(element);
              el.addClass("angular-google-map");
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
              _m = new google.maps.Map(el.find("div")[1], mapOptions);
              _m['_id'.ns()] = uuid.generate();
              dragging = false;
              google.maps.event.addListenerOnce(_m, 'idle', function() {
                scope.deferred.resolve(_m);
                return resolveSpawned();
              });
              google.maps.event.addListener(_m, "dragstart", function() {
                dragging = true;
                return _.defer(function() {
                  return scope.$apply(function(s) {
                    if (s.dragging != null) {
                      return s.dragging = dragging;
                    }
                  });
                });
              });
              google.maps.event.addListener(_m, "dragend", function() {
                dragging = false;
                return _.defer(function() {
                  return scope.$apply(function(s) {
                    if (s.dragging != null) {
                      return s.dragging = dragging;
                    }
                  });
                });
              });
              google.maps.event.addListener(_m, "drag", function() {
                var c;
                c = _m.center;
                return _.defer(function() {
                  return scope.$apply(function(s) {
                    if (angular.isDefined(s.center.type)) {
                      s.center.coordinates[1] = c.lat();
                      return s.center.coordinates[0] = c.lng();
                    } else {
                      s.center.latitude = c.lat();
                      return s.center.longitude = c.lng();
                    }
                  });
                });
              });
              google.maps.event.addListener(_m, "zoom_changed", function() {
                if (scope.zoom !== _m.zoom) {
                  return _.defer(function() {
                    return scope.$apply(function(s) {
                      return s.zoom = _m.zoom;
                    });
                  });
                }
              });
              settingCenterFromScope = false;
              google.maps.event.addListener(_m, "center_changed", function() {
                var c;
                c = _m.center;
                if (settingCenterFromScope) {
                  return;
                }
                return _.defer(function() {
                  return scope.$apply(function(s) {
                    if (!_m.dragging) {
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
                    }
                  });
                });
              });
              google.maps.event.addListener(_m, "idle", function() {
                var b, ne, sw;
                b = _m.getBounds();
                ne = b.getNorthEast();
                sw = b.getSouthWest();
                return _.defer(function() {
                  return scope.$apply(function(s) {
                    if (s.bounds !== null && s.bounds !== undefined && s.bounds !== void 0) {
                      s.bounds.northeast = {
                        latitude: ne.lat(),
                        longitude: ne.lng()
                      };
                      return s.bounds.southwest = {
                        latitude: sw.lat(),
                        longitude: sw.lng()
                      };
                    }
                  });
                });
              });
              if (angular.isDefined(scope.events) && scope.events !== null && angular.isObject(scope.events)) {
                getEventHandler = function(eventName) {
                  return function() {
                    return scope.events[eventName].apply(scope, [_m, eventName, arguments]);
                  };
                };
                for (eventName in scope.events) {
                  if (scope.events.hasOwnProperty(eventName) && angular.isFunction(scope.events[eventName])) {
                    google.maps.event.addListener(_m, eventName, getEventHandler(eventName));
                  }
                }
              }
              _m.getOptions = function() {
                return mapOptions;
              };
              scope.map = _m;
              if ((attrs.control != null) && (scope.control != null)) {
                scope.control.refresh = function(maybeCoords) {
                  var coords;
                  if (_m == null) {
                    return;
                  }
                  google.maps.event.trigger(_m, "resize");
                  if (((maybeCoords != null ? maybeCoords.latitude : void 0) != null) && ((maybeCoords != null ? maybeCoords.latitude : void 0) != null)) {
                    coords = _this.getCoords(maybeCoords);
                    if (_this.isTrue(attrs.pan)) {
                      return _m.panTo(coords);
                    } else {
                      return _m.setCenter(coords);
                    }
                  }
                };

                /*
                I am sure you all will love this. You want the instance here you go.. BOOM!
                 */
                scope.control.getGMap = function() {
                  return _m;
                };
                scope.control.getMapOptions = function() {
                  return mapOptions;
                };
              }
              scope.$watch("center", (function(newValue, oldValue) {
                var coords;
                coords = _this.getCoords(newValue);
                if (coords.lat() === _m.center.lat() && coords.lng() === _m.center.lng()) {
                  return;
                }
                settingCenterFromScope = true;
                if (!dragging) {
                  if (!_this.validateCoords(newValue)) {
                    $log.error("Invalid center for newValue: " + (JSON.stringify(newValue)));
                  }
                  if (_this.isTrue(attrs.pan) && scope.zoom === _m.zoom) {
                    _m.panTo(coords);
                  } else {
                    _m.setCenter(coords);
                  }
                }
                return settingCenterFromScope = false;
              }), true);
              scope.$watch("zoom", function(newValue, oldValue) {
                if (_.isEqual(newValue, oldValue)) {
                  return;
                }
                return _.defer(function() {
                  return _m.setZoom(newValue);
                });
              });
              scope.$watch("bounds", function(newValue, oldValue) {
                var bounds, ne, sw;
                if (newValue === oldValue) {
                  return;
                }
                if ((newValue.northeast.latitude == null) || (newValue.northeast.longitude == null) || (newValue.southwest.latitude == null) || (newValue.southwest.longitude == null)) {
                  $log.error("Invalid map bounds for new value: " + (JSON.stringify(newValue)));
                  return;
                }
                ne = new google.maps.LatLng(newValue.northeast.latitude, newValue.northeast.longitude);
                sw = new google.maps.LatLng(newValue.southwest.latitude, newValue.southwest.longitude);
                bounds = new google.maps.LatLngBounds(sw, ne);
                return _m.fitBounds(bounds);
              });
              return ['options', 'styles'].forEach(function(toWatch) {
                return scope.$watch(toWatch, function(newValue, oldValue) {
                  var watchItem;
                  watchItem = this.exp;
                  if (_.isEqual(newValue, oldValue)) {
                    return;
                  }
                  opts.options = newValue;
                  if (_m != null) {
                    return _m.setOptions(opts);
                  }
                });
              }, true);
            };
          })(this));
        };

        return Map;

      })(BaseObject);
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("Marker".ns(), [
    "IMarker".ns(), "MarkerChildModel".ns(), "MarkerManager".ns(), function(IMarker, MarkerChildModel, MarkerManager) {
      var Marker;
      return Marker = (function(_super) {
        __extends(Marker, _super);

        function Marker() {
          this.link = __bind(this.link, this);
          var deferred;
          Marker.__super__.constructor.call(this);
          this.template = '<span class="angular-google-map-marker" ng-transclude></span>';
          this.$log.info(this);
          deferred = void 0;
        }

        Marker.prototype.controller = [
          '$scope', '$element', function($scope, $element) {
            $scope.ctrlType = 'Marker';
            return _.extend(this, IMarker.handle($scope, $element));
          }
        ];

        Marker.prototype.link = function(scope, element, attrs, ctrl) {
          var doFit;
          if (scope.fit) {
            doFit = true;
          }
          this.mapPromise = IMarker.mapPromise(scope, ctrl);
          this.mapPromise.then((function(_this) {
            return function(map) {
              var doClick, doDrawSelf, keys, m, trackModel;
              if (!_this.gMarkerManager) {
                _this.gMarkerManager = new MarkerManager(map);
              }
              keys = _.object(IMarker.keys, IMarker.keys);
              m = new MarkerChildModel(scope, scope, keys, map, {}, doClick = true, _this.gMarkerManager, doDrawSelf = false, trackModel = false);
              m.deferred.promise.then(function(gMarker) {
                return scope.deferred.resolve(gMarker);
              });
              if (scope.control != null) {
                return scope.control.getGMarkers = _this.gMarkerManager.getGMarkers;
              }
            };
          })(this));
          return scope.$on('$destroy', (function(_this) {
            return function() {
              var _ref;
              if ((_ref = _this.gMarkerManager) != null) {
                _ref.clear();
              }
              return _this.gMarkerManager = null;
            };
          })(this));
        };

        return Marker;

      })(IMarker);
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("Markers".ns(), [
    "IMarker".ns(), "MarkersParentModel".ns(), "_sync".ns(), function(IMarker, MarkersParentModel, _sync) {
      var Markers;
      return Markers = (function(_super) {
        __extends(Markers, _super);

        function Markers($timeout) {
          this.link = __bind(this.link, this);
          Markers.__super__.constructor.call(this, $timeout);
          this.template = '<span class="angular-google-map-markers" ng-transclude></span>';
          this.scope = _.extend(this.scope || {}, {
            idKey: '=idkey',
            doRebuildAll: '=dorebuildall',
            models: '=models',
            doCluster: '=docluster',
            clusterOptions: '=clusteroptions',
            clusterEvents: '=clusterevents'
          });
          this.$log.info(this);
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
          ready = (function(_this) {
            return function() {
              if (scope.control != null) {
                scope.control.getGMarkers = function() {
                  var _ref;
                  return (_ref = parentModel.gMarkerManager) != null ? _ref.getGMarkers() : void 0;
                };
                scope.control.getChildMarkers = function() {
                  return parentModel.markerModels;
                };
              }
              return scope.deferred.resolve();
            };
          })(this);
          return IMarker.mapPromise(scope, ctrl).then((function(_this) {
            return function(map) {
              parentModel = new MarkersParentModel(scope, element, attrs, map);
              return parentModel.existingPieces.then(function() {
                return ready();
              });
            };
          })(this));
        };

        return Markers;

      })(IMarker);
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("Polygon".ns(), [
    "IPolygon".ns(), "$timeout", "array-sync".ns(), "PolygonChildModel".ns(), function(IPolygon, $timeout, arraySync, PolygonChild) {
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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("Polyline".ns(), [
    "IPolyline".ns(), "$timeout", "array-sync".ns(), "PolylineChildModel".ns(), function(IPolyline, $timeout, arraySync, PolylineChildModel) {
      var Polyline;
      return Polyline = (function(_super) {
        __extends(Polyline, _super);

        function Polyline() {
          this.link = __bind(this.link, this);
          return Polyline.__super__.constructor.apply(this, arguments);
        }

        Polyline.prototype.link = function(scope, element, attrs, mapCtrl) {
          if (angular.isUndefined(scope.path) || scope.path === null || !this.validatePath(scope.path)) {
            this.$log.error("polyline: no valid path attribute found");
            return;
          }
          return IPolyline.mapPromise(scope, mapCtrl).then((function(_this) {
            return function(map) {
              return new PolylineChildModel(scope, attrs, map, _this.DEFAULTS);
            };
          })(this));
        };

        return Polyline;

      })(IPolyline);
    }
  ]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("Polylines".ns(), [
    "IPolyline".ns(), "$timeout", "array-sync".ns(), "PolylinesParentModel".ns(), function(IPolyline, $timeout, arraySync, PolylinesParentModel) {
      var Polylines;
      return Polylines = (function(_super) {
        __extends(Polylines, _super);

        function Polylines() {
          this.link = __bind(this.link, this);
          Polylines.__super__.constructor.call(this);
          this.scope.idKey = '=idkey';
          this.scope.models = '=models';
          this.$log.info(this);
        }

        Polylines.prototype.link = function(scope, element, attrs, mapCtrl) {
          if (angular.isUndefined(scope.path) || scope.path === null) {
            this.$log.error("polylines: no valid path attribute found");
            return;
          }
          if (!scope.models) {
            this.$log.error("polylines: no models found to create from");
            return;
          }
          return mapCtrl.getScope().deferred.promise.then((function(_this) {
            return function(map) {
              return new PolylinesParentModel(scope, element, attrs, map, _this.DEFAULTS);
            };
          })(this));
        };

        return Polylines;

      })(IPolyline);
    }
  ]);

}).call(this);

(function() {
  angular.module("google-maps.directives.api".ns()).factory("Rectangle".ns(), [
    "Logger".ns(), "GmapUtil".ns(), "IRectangle".ns(), "RectangleParentModel".ns(), function($log, GmapUtil, IRectangle, RectangleParentModel) {
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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("Window".ns(), [
    "IWindow".ns(), "GmapUtil".ns(), "WindowChildModel".ns(), function(IWindow, GmapUtil, WindowChildModel) {
      var Window;
      return Window = (function(_super) {
        __extends(Window, _super);

        Window.include(GmapUtil);

        function Window() {
          this.link = __bind(this.link, this);
          Window.__super__.constructor.call(this);
          this.require = ['^' + 'GoogleMap'.ns(), '^?' + 'Marker'.ns()];
          this.template = '<span class="angular-google-maps-window" ng-transclude></span>';
          this.$log.info(this);
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
            scope.$on("$destroy", (function(_this) {
              return function() {
                _this.childWindows = _.withoutObjects(_this.childWindows, [childWindow], function(child1, child2) {
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
                  return child.gWin;
                });
              };
            })(this);
            scope.control.getChildWindows = (function(_this) {
              return function() {
                return _this.childWindows;
              };
            })(this);
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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api".ns()).factory("Windows".ns(), [
    "IWindow".ns(), "WindowsParentModel".ns(), function(IWindow, WindowsParentModel) {

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
          this.require = ['^' + 'GoogleMap'.ns(), '^?' + 'Markers'.ns()];
          this.template = '<span class="angular-google-maps-windows" ng-transclude></span>';
          this.scope.idKey = '=idkey';
          this.scope.doRebuildAll = '=dorebuildall';
          this.scope.models = '=models';
          this.$log.debug(this);
        }

        Windows.prototype.link = function(scope, element, attrs, ctrls) {
          var mapScope, markerCtrl, markerScope;
          mapScope = ctrls[0].getScope();
          markerCtrl = ctrls.length > 1 && (ctrls[1] != null) ? ctrls[1] : void 0;
          markerScope = markerCtrl != null ? markerCtrl.getScope() : void 0;
          return mapScope.deferred.promise.then((function(_this) {
            return function(map) {
              var promise, _ref;
              promise = (markerScope != null ? (_ref = markerScope.deferred) != null ? _ref.promise : void 0 : void 0) || Promise.resolve();
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
          if (scope.control != null) {
            scope.control.getGWindows = (function(_this) {
              return function() {
                return parentModel.windows.map(function(child) {
                  return child.gWin;
                });
              };
            })(this);
            return scope.control.getChildWindows = (function(_this) {
              return function() {
                return parentModel.windows;
              };
            })(this);
          }
        };

        return Windows;

      })(IWindow);
    }
  ]);

}).call(this);


/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Nick Baugh - https://github.com/niftylettuce
 */

(function() {
  angular.module("google-maps".ns()).directive("GoogleMap".ns(), [
    "Map".ns(), function(Map) {
      return new Map();
    }
  ]);

}).call(this);


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
  angular.module("google-maps".ns()).directive("Marker".ns(), [
    "$timeout", "Marker".ns(), function($timeout, Marker) {
      return new Marker($timeout);
    }
  ]);

}).call(this);


/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

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
  angular.module("google-maps".ns()).directive("Markers".ns(), [
    "$timeout", "Markers".ns(), function($timeout, Markers) {
      return new Markers($timeout);
    }
  ]);

}).call(this);


/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Rick Huizinga - https://plus.google.com/+RickHuizinga
 */

(function() {
  angular.module("google-maps".ns()).directive("Polygon".ns(), [
    'Polygon'.ns(), function(Polygon) {
      return new Polygon();
    }
  ]);

}).call(this);


/*
@authors
Julian Popescu - https://github.com/jpopesculian
Rick Huizinga - https://plus.google.com/+RickHuizinga
 */

(function() {
  angular.module("google-maps".ns()).directive("Circle".ns(), [
    "Circle".ns(), function(Circle) {
      return Circle;
    }
  ]);

}).call(this);


/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
 */

(function() {
  angular.module("google-maps".ns()).directive("Polyline".ns(), [
    "Polyline".ns(), function(Polyline) {
      return new Polyline();
    }
  ]);

}).call(this);


/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
 */

(function() {
  angular.module("google-maps".ns()).directive("Polylines".ns(), [
    "Polylines".ns(), function(Polylines) {
      return new Polylines();
    }
  ]);

}).call(this);


/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Chentsu Lin - https://github.com/ChenTsuLin
 */

(function() {
  angular.module("google-maps".ns()).directive("Rectangle".ns(), [
    "Logger".ns(), "Rectangle".ns(), function($log, Rectangle) {
      return Rectangle;
    }
  ]);

}).call(this);


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
  angular.module("google-maps".ns()).directive("Window".ns(), [
    "$timeout", "$compile", "$http", "$templateCache", "Window".ns(), function($timeout, $compile, $http, $templateCache, Window) {
      return new Window($timeout, $compile, $http, $templateCache);
    }
  ]);

}).call(this);


/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

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
  angular.module("google-maps".ns()).directive("Windows".ns(), [
    "$timeout", "$compile", "$http", "$templateCache", "$interpolate", "Windows".ns(), function($timeout, $compile, $http, $templateCache, $interpolate, Windows) {
      return new Windows($timeout, $compile, $http, $templateCache, $interpolate);
    }
  ]);

}).call(this);


/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

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

  angular.module("google-maps".ns()).directive("Layer".ns(), [
    "$timeout", "Logger".ns(), "LayerParentModel".ns(), function($timeout, Logger, LayerParentModel) {
      var Layer;
      Layer = (function() {
        function Layer() {
          this.link = __bind(this.link, this);
          this.$log = Logger;
          this.restrict = "EMA";
          this.require = '^' + 'GoogleMap'.ns();
          this.priority = -1;
          this.transclude = true;
          this.template = '<span class=\"angular-google-map-layer\" ng-transclude></span>';
          this.replace = true;
          this.scope = {
            show: "=show",
            type: "=type",
            namespace: "=namespace",
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


/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

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
  angular.module("google-maps".ns()).directive("MapControl".ns(), [
    "Control".ns(), function(Control) {
      return new Control();
    }
  ]);

}).call(this);

(function() {
  angular.module("google-maps".ns()).directive("DrawingManager".ns(), [
    "DrawingManager".ns(), function(DrawingManager) {
      return DrawingManager;
    }
  ]);

}).call(this);


/*
angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicholas McCready - https://twitter.com/nmccready

 * Brunt of the work is in DrawFreeHandChildModel
 */

(function() {
  angular.module('google-maps'.ns()).directive('FreeDrawPolygons'.ns(), [
    'ApiFreeDrawPolygons'.ns(), function(FreeDrawPolygons) {
      return new FreeDrawPolygons();
    }
  ]);

}).call(this);


/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

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

  angular.module("google-maps".ns()).directive("MapType".ns(), [
    "$timeout", "Logger".ns(), "MapTypeParentModel".ns(), function($timeout, Logger, MapTypeParentModel) {
      var MapType;
      MapType = (function() {
        function MapType() {
          this.link = __bind(this.link, this);
          this.$log = Logger;
          this.restrict = "EMA";
          this.require = '^' + 'GoogleMap'.ns();
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

  angular.module("google-maps".ns()).directive("SearchBox".ns(), [
    "GoogleMapApi".ns(), "Logger".ns(), "SearchBoxParentModel".ns(), '$http', '$templateCache', function(GoogleMapApi, Logger, SearchBoxParentModel, $http, $templateCache) {
      var SearchBox;
      SearchBox = (function() {
        function SearchBox() {
          this.link = __bind(this.link, this);
          this.$log = Logger;
          this.restrict = "EMA";
          this.require = '^' + 'GoogleMap'.ns();
          this.priority = -1;
          this.transclude = true;
          this.template = '<span class=\"angular-google-map-search\" ng-transclude></span>';
          this.replace = true;
          this.scope = {
            template: '=template',
            position: '=position',
            options: '=options',
            events: '=events',
            parentdiv: '=parentdiv'
          };
        }

        SearchBox.prototype.link = function(scope, element, attrs, mapCtrl) {
          return GoogleMapApi.then((function(_this) {
            return function(maps) {
              return $http.get(scope.template, {
                cache: $templateCache
              }).success(function(template) {
                return mapCtrl.getScope().deferred.promise.then(function(map) {
                  var ctrlPosition;
                  ctrlPosition = angular.isDefined(scope.position) ? scope.position.toUpperCase().replace(/-/g, '_') : 'TOP_LEFT';
                  if (!maps.ControlPosition[ctrlPosition]) {
                    _this.$log.error('searchBox: invalid position property');
                    return;
                  }
                  return new SearchBoxParentModel(scope, element, attrs, map, ctrlPosition, template);
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
;angular.module("google-maps.wrapped".ns()).service("uuid".ns(), function() {
  //BEGIN REPLACE
  /*
 Version: core-1.0
 The MIT License: Copyright (c) 2012 LiosK.
*/
function UUID(){}UUID.generate=function(){var a=UUID._gri,b=UUID._ha;return b(a(32),8)+"-"+b(a(16),4)+"-"+b(16384|a(12),4)+"-"+b(32768|a(14),4)+"-"+b(a(48),12)};UUID._gri=function(a){return 0>a?NaN:30>=a?0|Math.random()*(1<<a):53>=a?(0|1073741824*Math.random())+1073741824*(0|Math.random()*(1<<a-30)):NaN};UUID._ha=function(a,b){for(var c=a.toString(16),d=b-c.length,e="0";0<d;d>>>=1,e+=e)d&1&&(c=e+c);return c};

  //END REPLACE
return UUID;
});;// wrap the utility libraries needed in ./lib
// http://google-maps-utility-library-v3.googlecode.com/svn/
angular.module('google-maps.wrapped'.ns()).service('GoogleMapsUtilV3'.ns(), function () {
  return {
    init: _.once(function () {
      //BEGIN REPLACE
      /*! angular-google-maps 2.0.4 2014-10-22
 *  AngularJS directives for Google Maps
 *  git: https://github.com/angular-ui/angular-google-maps.git
 */
/**
 * @name InfoBox
 * @version 1.1.12 [December 11, 2012]
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

        // Fix up opacity style for benefit of MSIE:
        //
        if (typeof this.div_.style.opacity !== "undefined" && this.div_.style.opacity !== "") {

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

        this.div_.style.visibility = 'hidden';

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
};;/**
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
 * @param {Array.<google.maps.nggmap-marker>} [opt_markers] The markers to be added to the cluster.
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
 * @param {function(Array.<google.maps.nggmap-marker>, number)} calculator The value
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
 * @param {Array.<google.maps.nggmap-marker>} markers The markers to add.
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
 * @param {Array.<google.maps.nggmap-marker>} markers The markers to remove.
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
 * @param {Array.<google.maps.nggmap-marker>} markers The array of markers represented by the cluster.
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

if (typeof String.prototype.trim !== 'function') {
    /**
     * IE hack since trim() doesn't exist in all browsers
     * @return {string} The string with removed whitespace
     */
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

;/**
 * 1.1.9-patched
 * @name MarkerWithLabel for V3
 * @version 1.1.8 [February 26, 2013]
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
 */
function inherits(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {}
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
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
  if (this.labelDiv_.parentNode !== null)
    this.labelDiv_.parentNode.removeChild(this.labelDiv_);
  if (this.eventDiv_.parentNode !== null)
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
});;/**
 * Performance overrides on MarkerClusterer custom to Angular Google Maps
 *
 * Created by Petr Bruna ccg1415 and Nick McCready on 7/13/14.
 */
angular.module('google-maps.extensions'.ns()).service('ExtendMarkerClusterer'.ns(), function () {
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
            this.markers_ = new window.PropMap();
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
              this.markers_.values().forEach(function (m) {
                m.setMap(null);
              });
            } else {
              marker.setMap(null);
            }

//  this.updateIcon_();
            return true;
          };

          /**
           * Determines if a marker has already been added to the cluster.
           *
           * @param {google.maps.Marker} marker The marker to check.
           * @return {boolean} True if the marker has already been added.
           */
          NgMapCluster.prototype.isMarkerAlreadyAdded_ = function (marker) {
            return _.isNullOrUndefined(this.markers_.get(marker.key));
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
            var markers = this.getMarkers().values();
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
            this.markers_ = new window.PropMap();
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
              marker = this.markers_.values()[i];
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
              // custom addition by ngmaps
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
              google.maps.event.trigger(this, "clusteringend", this);
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
            this.markers_.values().forEach(function (marker) {
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

          return NgMapMarkerClusterer;

        })(MarkerClusterer);
      }).call(this);
    })
  };
});