/*! angular-google-maps 2.1.0 2015-04-27
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