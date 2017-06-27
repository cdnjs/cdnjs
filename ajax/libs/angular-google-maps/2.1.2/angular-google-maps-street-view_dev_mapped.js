/*! angular-google-maps 2.1.2 2015-06-04
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
;(function() {
  angular.module('uiGmapgoogle-maps.providers').factory('uiGmapMapScriptLoader', [
    '$q', 'uiGmapuuid', function($q, uuid) {
      var getScriptUrl, includeScript, isGoogleMapsLoaded, scriptId;
      scriptId = void 0;
      getScriptUrl = function(options) {
        if (options.china) {
          return 'http://maps.google.cn/maps/api/js?';
        } else {
          if (options.transport === 'auto') {
            return '//maps.googleapis.com/maps/api/js?';
          } else {
            return options.transport + '://maps.googleapis.com/maps/api/js?';
          }
        }
      };
      includeScript = function(options) {
        var omitOptions, query, script;
        omitOptions = ['transport', 'isGoogleMapsForWork', 'china'];
        if (options.isGoogleMapsForWork) {
          omitOptions.push('key');
        }
        query = _.map(_.omit(options, omitOptions), function(v, k) {
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
      transport: 'https',
      isGoogleMapsForWork: false,
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
  angular.module('uiGmapgoogle-maps.directives.api.utils').service('uiGmapGmapUtil', [
    'uiGmapLogger', '$compile', function(Logger, $compile) {
      var _isFalse, _isTruthy, getCoords, getLatitude, getLongitude, validateCoords;
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
  angular.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapEventsHelper", [
    "uiGmapLogger", function($log) {
      var _getEventsObj, _hasEvents;
      _hasEvents = function(obj) {
        return angular.isDefined(obj.events) && (obj.events != null) && angular.isObject(obj.events);
      };
      _getEventsObj = function(scope, model) {
        if (_hasEvents(scope)) {
          return scope;
        }
        if (_hasEvents(model)) {
          return model;
        }
      };
      return {
        setEvents: function(gObject, scope, model, ignores) {
          var eventObj;
          eventObj = _getEventsObj(scope, model);
          if (eventObj != null) {
            return _.compact(_.map(eventObj.events, function(eventHandler, eventName) {
              var doIgnore;
              if (ignores) {
                doIgnore = _(ignores).contains(eventName);
              }
              if (eventObj.events.hasOwnProperty(eventName) && angular.isFunction(eventObj.events[eventName]) && !doIgnore) {
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
;
/*
@authors:
- Nicholas McCready - https://twitter.com/nmccready
 */


/*
StreetViewPanorama Directive to care of basic initialization of StreetViewPanorama
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapStreetViewPanorama', [
    'uiGmapGoogleMapApi', 'uiGmapLogger', 'uiGmapGmapUtil', 'uiGmapEventsHelper', function(GoogleMapApi, $log, GmapUtil, EventsHelper) {
      var name;
      name = 'uiGmapStreetViewPanorama';
      return {
        restrict: 'EMA',
        template: '<div class="angular-google-map-street-view-panorama"></div>',
        replace: true,
        scope: {
          focalcoord: '=',
          radius: '=?',
          events: '=?',
          options: '=?',
          control: '=?',
          povoptions: '=?',
          imagestatus: '='
        },
        link: function(scope, element, attrs) {
          return GoogleMapApi.then((function(_this) {
            return function(maps) {
              var clean, create, didCreateOptionsFromDirective, firstTime, handleSettings, listeners, opts, pano, povOpts, sv;
              pano = void 0;
              sv = void 0;
              didCreateOptionsFromDirective = false;
              listeners = void 0;
              opts = null;
              povOpts = null;
              clean = function() {
                EventsHelper.removeEvents(listeners);
                if (pano != null) {
                  pano.unbind('position');
                  pano.setVisible(false);
                }
                if (sv != null) {
                  if ((sv != null ? sv.setVisible : void 0) != null) {
                    sv.setVisible(false);
                  }
                  return sv = void 0;
                }
              };
              handleSettings = function(perspectivePoint, focalPoint) {
                var heading;
                heading = google.maps.geometry.spherical.computeHeading(perspectivePoint, focalPoint);
                didCreateOptionsFromDirective = true;
                scope.radius = scope.radius || 50;
                povOpts = angular.extend({
                  heading: heading,
                  zoom: 1,
                  pitch: 0
                }, scope.povoptions || {});
                opts = opts = angular.extend({
                  navigationControl: false,
                  addressControl: false,
                  linksControl: false,
                  position: perspectivePoint,
                  pov: povOpts,
                  visible: true
                }, scope.options || {});
                return didCreateOptionsFromDirective = false;
              };
              create = function() {
                var focalPoint;
                if (!scope.focalcoord) {
                  $log.error(name + ": focalCoord needs to be defined");
                  return;
                }
                if (!scope.radius) {
                  $log.error(name + ": needs a radius to set the camera view from its focal target.");
                  return;
                }
                clean();
                if (sv == null) {
                  sv = new google.maps.StreetViewService();
                }
                if (scope.events) {
                  listeners = EventsHelper.setEvents(sv, scope, scope);
                }
                focalPoint = GmapUtil.getCoords(scope.focalcoord);
                return sv.getPanoramaByLocation(focalPoint, scope.radius, function(streetViewPanoramaData, status) {
                  var ele, perspectivePoint, ref;
                  if (scope.imagestatus != null) {
                    scope.imagestatus = status;
                  }
                  if (((ref = scope.events) != null ? ref.image_status_changed : void 0) != null) {
                    scope.events.image_status_changed(sv, 'image_status_changed', scope, status);
                  }
                  if (status === "OK") {
                    perspectivePoint = streetViewPanoramaData.location.latLng;
                    handleSettings(perspectivePoint, focalPoint);
                    ele = element[0];
                    return pano = new google.maps.StreetViewPanorama(ele, opts);
                  }
                });
              };
              if (scope.control != null) {
                scope.control.getOptions = function() {
                  return opts;
                };
                scope.control.getPovOptions = function() {
                  return povOpts;
                };
                scope.control.getGObject = function() {
                  return sv;
                };
                scope.control.getGPano = function() {
                  return pano;
                };
              }
              scope.$watch('options', function(newValue, oldValue) {
                if (newValue === oldValue || newValue === opts || didCreateOptionsFromDirective) {
                  return;
                }
                return create();
              });
              firstTime = true;
              scope.$watch('focalcoord', function(newValue, oldValue) {
                if (newValue === oldValue && !firstTime) {
                  return;
                }
                if (newValue == null) {
                  return;
                }
                firstTime = false;
                return create();
              });
              return scope.$on('$destroy', function() {
                return clean();
              });
            };
          })(this));
        }
      };
    }
  ]);

}).call(this);
}( window,angular));
//# sourceMappingURL=angular-google-maps-street-view_dev_mapped.js.map