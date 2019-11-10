/*!
*  angular-mapboxgl-directive 0.6.1 2016-09-06
*  An AngularJS directive for Mapbox GL
*  git: git+https://github.com/Naimikan/angular-mapboxgl-directive.git
*/
(function (angular, mapboxgl, undefined) {
'use strict';
angular.module('mapboxgl-directive', []).directive('mapboxgl', ['$q', 'mapboxglUtils', 'mapboxglConstants', 'mapboxglEventsUtils', function ($q, mapboxglUtils, mapboxglConstants, mapboxglEventsUtils) {
  function mapboxGlDirectiveController ($scope) {
    this._mapboxGlMap = $q.defer();

    this.getMap = function () {
      return this._mapboxGlMap.promise;
    };

    this.getMapboxGlScope = function () {
      return $scope;
    };
  }

  function mapboxGlDirectiveLink (scope, element, attrs, controller) {
    if (!mapboxgl) {
      throw new Error('Mapbox GL does not included');
    }

    if (!mapboxgl.accessToken) {
      if (angular.isDefined(attrs.accessToken) && attrs.accessToken.length > 0) {
        mapboxgl.accessToken = attrs.accessToken;
      } else {
        throw new Error('Mapbox access token does not defined');
      }
    }

    if (!mapboxgl.supported()) {
      throw new Error('Your browser does not support Mapbox GL');
    }

    scope.mapboxglMapId = attrs.id ? attrs.id : mapboxglUtils.generateMapId();

    element.attr('id', scope.mapboxglMapId);

    var updateWidth = function () {
      if (isNaN(attrs.width)) {
        element.css('width', attrs.width);
      } else {
        element.css('width', attrs.width + 'px');
      }
    };

    var updateHeight = function () {
      if (isNaN(attrs.height)) {
        element.css('height', attrs.height);
      } else {
        element.css('height', attrs.height + 'px');
      }
    };

    var updateLanguage = function (map) {
      if (angular.isDefined(attrs.language)) {
        map.setLayoutProperty('country-label-lg', 'text-field', '{name_' + attrs.language + '}');
      }
    };

    if (angular.isDefined(attrs.width)) {
      updateWidth();

      scope.$watch(function () {
        return element[0].getAttribute('width');
      }, function () {
        updateWidth();
      });
    }

    if (angular.isDefined(attrs.height)) {
      updateHeight();

      scope.$watch(function () {
        return element[0].getAttribute('height');
      }, function () {
        updateHeight();
      });
    }

    var mapboxGlMap = new mapboxgl.Map({
      container: scope.mapboxglMapId,
      style: mapboxglConstants.defaultStyle,
      center: mapboxglConstants.defaultCenter,
      attributionControl: false
    });

    controller._mapboxGlMap.resolve(mapboxGlMap);

    mapboxglEventsUtils.exposeMapEvents(mapboxGlMap);

    controller.getMap().then(function (map) {
      // Language
      scope.$watch(function () {
        return attrs.language;
      }, function () {
        if (map.loaded()) {
          updateLanguage(map);
        } else {
          map.on('load', function () {
            updateLanguage(map);
          });
        }
      });
    });

    scope.$on('$destroy', function () {
      mapboxGlMap.remove();
    });


    /*scope.$watch(function () { return scope.controlsAvailables; }, function (newValue, oldValue) {
      if (newValue !== void 0) {
        // Custom Control DrawGl
        if (newValue.drawControl !== void 0 && newValue.drawControl.enabled !== void 0 && newValue.drawControl.enabled) {
          if (mapboxgl.DrawGl !== void 0) {
            scope.mapboxGlControls.drawGl = new mapboxgl.DrawGl({
              position: newValue.drawControl.position || 'top-left',
              drawOptions: newValue.drawControl.drawOptions ? {
                polyline: newValue.drawControl.drawOptions.polyline ? newValue.drawControl.drawOptions.polyline : false,
                polygon: newValue.drawControl.drawOptions.polygon ? newValue.drawControl.drawOptions.polygon : false,
                rectangle: newValue.drawControl.drawOptions.rectangle ? newValue.drawControl.drawOptions.rectangle : false,
                circle: newValue.drawControl.drawOptions.circle ? newValue.drawControl.drawOptions.circle : false,
                marker: newValue.drawControl.drawOptions.marker ? newValue.drawControl.drawOptions.marker : false,
                edit: newValue.drawControl.drawOptions.edit ? newValue.drawControl.drawOptions.edit : true,
                trash: newValue.drawControl.drawOptions.trash ? newValue.drawControl.drawOptions.trash : true
              } : {
                polyline: true,
                polygon: true,
                rectangle: true,
                circle: true,
                marker: true,
                edit: true,
                trash: true
              },
              distanceUnit: mapboxgl.DrawGl.DISTANCE_UNITS.meters
            });

            scope.mapboxGlMap.addControl(scope.mapboxGlControls.drawGl);
          } else {
            throw new Error('mapboxgl.DrawGl plugin is not included.');
          }
        }
      }
    }); */
  }

  var directive = {
    restrict: 'EA',
    replace: true,
    scope: {
      glStyle: '=',
      glCenter: '=',
      glMinZoom: '=',
      glMaxZoom: '=',
      glZoom: '=',
      glBearing: '=',
      glPitch: '=',
      glControls: '=',
      glFilter: '=',
      glClasses: '=',
      glGeojson: '=',
      glInteractive: '='
    },
    transclude: true,
    template: '<div class="angular-mapboxgl-map"><div ng-transclude></div></div>',
    controller: mapboxGlDirectiveController,
    link: mapboxGlDirectiveLink
  };

  mapboxGlDirectiveController.$inject = ['$scope'];

  return directive;
}]);

angular.module('mapboxgl-directive').factory('mapboxglEventsUtils', ['$rootScope', function ($rootScope) {
  var eventsAvailables = [
    'webglcontextlost ',
    'webglcontextrestored',
    'error',
    'render',
    'mouseout',
    'mousedown',
    'mouseup',
    'mousemove',
    'touchstart',
    'touchend',
    'touchmove',
    'touchcancel',
    'click',
    'dblclick',
    'contextmenu',
    'load',
    'movestart',
    'moveend',
    'move',
    'zoomend',
    'zoomstart',
    'zoom',
    'boxzoomend',
    'boxzoomcancel',
    'boxzoomstart',
    'rotatestart',
    'rotateend',
    'rotate',
    'dragstart',
    'drag',
    'dragend',
    'pitch'
  ];

  function exposeMapEvents (map) {
    eventsAvailables.map(function (eachEvent) {
      map.on(eachEvent, function (event) {
        $rootScope.$broadcast('mapboxglMap:' + eachEvent, event);
      });
    });
  }

  var mapboxglEventsUtils = {
    exposeMapEvents: exposeMapEvents
	};

	return mapboxglEventsUtils;
}]);

angular.module('mapboxgl-directive').factory('mapboxglGeojsonUtils', [function () {
  function createGeojsonByObject (map, object) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    if (angular.isUndefined(object.coordinates) || object.coordinates === null) {
      throw new Error('Object coordinates are undefined');
    }

    object.id = object.type + '_' + Date.now();

    if (object.type === 'line') {
      object.geometryType = 'LineString';
    } else if (object.type === 'polygon') {
      object.geometryType = 'Polygon';
    } else if (object.type === 'circle') {
      object.geometryType = 'Point';
    } else {
      throw new Error('Invalid geojson type');
    }

    map.addSource(object.id, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: object.properties || {},
        geometry: {
          type: object.geometryType,
          coordinates: object.coordinates
        }
      }
    });

    map.addLayer({
      id: object.id,
      type: object.type,
      source: object.id,
      layout: object.layer.layout || {},
      paint: object.layer.paint || {}
    }, object.layer.before);
  }

  var mapboxglGeojsonUtils = {
		createGeojsonByObject: createGeojsonByObject
	};

	return mapboxglGeojsonUtils;
}]);

angular.module('mapboxgl-directive').factory('mapboxglUtils', ['$window', '$q', function ($window, $q) {
	/*
		Generate Map ID by Date timestamp

		return: <string>
	*/
	function generateMapId () {
		return 'mapbox-gl-map-' + Date.now();
	}

	/*
		Check if center is valid and format it.

		return: <Array|boolean> If center is valid, return [Lng, Lat] array. If center is invalid, return false.
	*/
	function validateAndFormatCenter (center) {
		// [lng, lat]
		var defer = $q.defer();

		if (angular.isDefined(center)) {
			if (angular.isDefined(center.autodiscover) && center.autodiscover) {
				$window.navigator.geolocation.getCurrentPosition(function (position) {
					var coordinates = position.coords;

					defer.resolve([coordinates.longitude, coordinates.latitude]);
				}, function (error) {
					defer.reject(error);
				}, {
					enableHighAccuracy: true,
  				timeout: 5000,
  				maximumAge: 0
				});
			} else if (angular.isNumber(center.lat) && angular.isNumber(center.lng) && (center.lng > -180 || center.lng < 180) && (center.lat > -90 || center.lat < 90)) {
				defer.resolve([center.lng, center.lat]);
			} else if (angular.isArray(center) && center.length === 2 && angular.isNumber(center[0]) && angular.isNumber(center[1]) && (center[0] > -180 || center[0] < 180) && (center[1] > -90 || center[1] < 90)) {
				defer.resolve(center);
			} else {
				defer.resolve(false);
			}
		}

		return defer.promise;
	}

	var mapboxglUtils = {
		generateMapId: generateMapId,
		validateAndFormatCenter: validateAndFormatCenter
	};

	return mapboxglUtils;
}]);

angular.module('mapboxgl-directive').constant('mapboxglConstants', {
	defaultStyle: 'mapbox://styles/mapbox/streets-v9',
	defaultCenter: [0, 0]
});
angular.module('mapboxgl-directive').directive('glBearing', [function () {
	function mapboxGlBearingDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glBearing', function (bearing) {
				if (angular.isNumber(bearing)) {
					map.setBearing(bearing);
				} else {
					throw new Error('Invalid bearing');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlBearingDirectiveLink
	};

	return directive;
}]);
angular.module('mapboxgl-directive').directive('glCenter', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
	function mapboxGlCenterDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glCenter', function (center) {
				mapboxglUtils.validateAndFormatCenter(center).then(function (newCenter) {
					if (newCenter) {
						map.panTo(newCenter);
					} else {
						throw new Error('Invalid center');
					}
				}).catch(function (error) {
					map.panTo(mapboxglConstants.defaultCenter);

					throw new Error(error.code + ' / ' + error.message);
				});
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlCenterDirectiveLink
	};

	return directive;
}]);

angular.module('mapboxgl-directive').directive('glClasses', [function () {
	function mapboxGlClassesDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glClasses', function (classes) {
        if (angular.isDefined(classes)) {
          if (angular.isArray(classes)) {
            map.setClasses(classes);
          }
        } else {
          var currentClasses = map.getClasses();

          currentClasses.map(function (eachClass) {
            map.removeClass(eachClass);
          });
        }
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlClassesDirectiveLink
	};

	return directive;
}]);

angular.module('mapboxgl-directive').directive('glControls', [function () {
	function mapboxGlControlsDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		var _controlsCreated = {
	    custom: []
	  };

		var getControlsCreated = function () {
	    return _controlsCreated;
	  };

	  var setControlsCreated = function (newControlsCreated) {
	    _controlsCreated = newControlsCreated;
	  };

	  var addNewControlCreated = function (controlName, newControl, isCustomControl) {
	    if (isCustomControl) {
	      _controlsCreated.custom.push({
	        name: controlName || 'customControl_' + Date.now(),
	        control: newControl
	      });
	    } else {
	      _controlsCreated[controlName] = newControl;
	    }
	  };

	  var removeAllControlsCreated = function () {
	    for (var attribute in _controlsCreated) {
	      if (attribute !== 'custom') {
	        var controlToRemove = _controlsCreated[attribute];

	        controlToRemove.remove();
	      } else {
	        var customControls = _controlsCreated[attribute];

	        customControls.map(function (eachCustomControl) {
	          eachCustomControl.control.remove();
	        });
	      }
	    }

	    // Reset controls created
	    _controlsCreated = {
	      custom: []
	    };
	  };

	  var removeControlCreatedByName = function (controlName) {
			var found = false, removed = false;

			for (var attribute in _controlsCreated) {
				if (controlName === attribute) {
					found = _controlsCreated[attribute];
				}
			}

			if (!found) {
				_controlsCreated.custom.map(function (eachCustomControl) {
					if (eachCustomControl.name === controlName) {
						found = eachCustomControl.control;
					}
				});
			}

			if (found) {
				try {
					found.remove();
					removed = true;
				} catch (error) {
					throw new Error('Error removing control \'' + controlName + '\' --> ' + error);
				}
			}

			return removed;
	  };

    /*
      controls: {
        navigation: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        },
        scale: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        },
        attribution: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        },
        geolocate: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        },
				draw: {
					enabled: true | false,
					position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
				}
      }
    */
		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glControls', function (controls) {
        if (angular.isDefined(controls)) {
					// Remove all created controls
					removeAllControlsCreated();

          // Navigation Control
          if (angular.isDefined(controls.navigation) && angular.isDefined(controls.navigation.enabled) && controls.navigation.enabled) {
						var navigationControl = new mapboxgl.Navigation({
              position: controls.navigation.position || 'top-right'
            });

						addNewControlCreated('navigation', navigationControl);

            map.addControl(navigationControl);
          }

          // Scale Control
          if (angular.isDefined(controls.scale) && angular.isDefined(controls.scale.enabled) && controls.scale.enabled) {
						var scaleControl = new mapboxgl.Scale({
              position: controls.scale.position || 'bottom-left'
            });

            addNewControlCreated('scale', scaleControl);

            map.addControl(scaleControl);
          }

          // Attribution Control
          if (angular.isDefined(controls.attribution) && angular.isDefined(controls.attribution.enabled) && controls.attribution.enabled) {
						var attributionControl = new mapboxgl.Attribution({
              position: controls.attribution.position || 'bottom-right'
            });

						addNewControlCreated('attribution', attributionControl);

            map.addControl(attributionControl);
          }

          // Geolocate Control
          if (angular.isDefined(controls.geolocate) && angular.isDefined(controls.geolocate.enabled) && controls.geolocate.enabled) {
						var geolocateControl = new mapboxgl.Geolocate({
              position: controls.geolocate.position || 'top-left'
            });

						addNewControlCreated('geolocate', geolocateControl);

            map.addControl(geolocateControl);
          }

					// Draw Control
					if (angular.isDefined(controls.draw) && angular.isDefined(controls.draw.enabled) && controls.draw.enabled) {
						if (angular.isDefined(mapboxgl.Draw) && angular.isFunction(mapboxgl.Draw)) {
							var drawOptions = {};
							drawOptions.position = controls.draw.position || 'top-right';

							if (angular.isDefined(controls.draw.drawOptions)) {
								angular.extend(drawOptions, controls.draw.drawOptions);
							}

							var drawControl = new mapboxgl.Draw(drawOptions);

							addNewControlCreated('draw', drawControl);

	            map.addControl(drawControl);
						} else {
							throw new Error('mapboxgl.Draw plugin is not included.');
						}
					}

					// Custom Controls
					if (angular.isDefined(controls.custom)) {
						if (angular.isArray(controls.custom)) {
							controls.custom.map(function (eachCustomControl) {
	              if (angular.isDefined(eachCustomControl.constructor)) {
	                var CustomControlFn = eachCustomControl.constructor.bind.apply(eachCustomControl.constructor, eachCustomControl.options);
	                var customControl = new CustomControlFn(eachCustomControl.options);

									addNewControlCreated(eachCustomControl.name, customControl, true);

	                map.addControl(customControl);
	              }
	            });
						} else {
							throw new Error('\'custom\' must be an array');
						}
          }
        }
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlControlsDirectiveLink
	};

	return directive;
}]);

angular.module('mapboxgl-directive').directive('glFilter', [function () {
	function mapboxGlFilterDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glFilter', function (filter) {
				if (angular.isDefined(filter)) {
					if (Object.prototype.toString.call(filter) === Object.prototype.toString.call({})) {
						if (angular.isDefined(filter.layerId) && angular.isDefined(filter.filter) && angular.isArray(filter.filter)) {
							map.setFilter(filter.layerId, filter.filter);
						} else {
							throw new Error('Invalid filter parameter');
						}
					} else if (Object.prototype.toString.call(filter) === Object.prototype.toString.call([])) {
						filter.map(function (eachFilter) {
							if (angular.isDefined(eachFilter.layerId) && angular.isDefined(eachFilter.filter) && angular.isArray(eachFilter.filter)) {
								map.setFilter(eachFilter.layerId, eachFilter.filter);
							} else {
								throw new Error('Invalid filter parameter');
							}
						});
					} else {
						throw new Error('Invalid filter parameter');
					}
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlFilterDirectiveLink
	};

	return directive;
}]);

angular.module('mapboxgl-directive').directive('glGeojson', ['mapboxglGeojsonUtils', function (mapboxglGeojsonUtils) {
  function mapboxGlGeojsonDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    var geojsonWatched = function (map, geojson) {
      if (angular.isDefined(geojson)) {
        if (Object.prototype.toString.call(geojson) === Object.prototype.toString.call({})) {
          mapboxglGeojsonUtils.createGeojsonByObject(map, geojson);
        } else if (Object.prototype.toString.call(geojson) === Object.prototype.toString.call([])) {
          geojson.map(function (eachGeojson) {
            mapboxglGeojsonUtils.createGeojsonByObject(map, eachGeojson);
          });
        } else {
          throw new Error('Invalid geojson parameter');
        }
      }
    };

    /*
      geojson: <Object | Array<Object>>

      obj: {
        type: line | polygon | circle
      }
    */

		controller.getMap().then(function (map) {
      mapboxglScope.$watchCollection('glGeojson', function (geojson) {
        if (map.loaded()) {
          geojsonWatched(map, geojson);
        } else {
          map.on('load', function () {
            geojsonWatched(map, geojson);
          });
        }
      });
    });
  }

  var directive = {
    restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlGeojsonDirectiveLink
  };

  return directive;
}]);

angular.module('mapboxgl-directive').directive('glInteractive', [function () {
  function mapboxGlInteractiveDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

    var actionsAvailables = [
      'touchZoomRotate',
      'scrollZoom',
      'boxZoom',
      'dragRotate',
      'dragPan',
      'doubleClickZoom',
      'keyboard'
    ];

    var mapboxglScope = controller.getMapboxGlScope();

    controller.getMap().then(function (map) {
      mapboxglScope.$watch('glInteractive', function (isInteractive) {
        if (angular.isDefined(isInteractive) && typeof(isInteractive) === 'boolean') {
          var functionToExecute = isInteractive ? 'enable' : 'disable';

          actionsAvailables.map(function (eachAction) {
            map[eachAction][functionToExecute]();
          });
        }
      });
    });
  }

  var directive = {
    restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlInteractiveDirectiveLink
  };

  return directive;
}]);

angular.module('mapboxgl-directive').directive('glMaxBounds', [function () {
	function mapboxGlMaxBoundsDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glMaxBounds', function (maxBounds) {
				if (angular.isArray(maxBounds) && maxBounds.length === 2) {
					map.setMaxBounds(maxBounds);
				} else {
					throw new Error('Invalid max bounds');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlMaxBoundsDirectiveLink
	};

	return directive;
}]);
angular.module('mapboxgl-directive').directive('glMaxZoom', [function () {
	function mapboxGlMaxZoomDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glMaxZoom', function (maxZoom) {
				if (angular.isNumber(maxZoom) && (maxZoom >= 0 || maxZoom <= 20)) {
					map.setMaxZoom(maxZoom);
				} else {
					throw new Error('Invalid max zoom');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlMaxZoomDirectiveLink
	};

	return directive;
}]);
angular.module('mapboxgl-directive').directive('glMinZoom', [function () {
	function mapboxGlMinZoomDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glMinZoom', function (minZoom) {
				if (angular.isNumber(minZoom) && (minZoom >= 0 || minZoom <= 20)) {
					map.setMinZoom(minZoom);
				} else {
					throw new Error('Invalid min zoom');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlMinZoomDirectiveLink
	};

	return directive;
}]);
angular.module('mapboxgl-directive').directive('glPitch', [function () {
	function mapboxGlPitchDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glPitch', function (pitch) {
				if (angular.isNumber(pitch) && (pitch >= 0 || pitch <= 60)) {
					map.setPitch(pitch);
				} else {
					throw new Error('Invalid pitch');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlPitchDirectiveLink
	};

	return directive;
}]);
angular.module('mapboxgl-directive').directive('glStyle', [function () {
	function mapboxGlStyleDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		/*
      mapbox://styles/mapbox/streets-v9
      mapbox://styles/mapbox/outdoors-v9
      mapbox://styles/mapbox/light-v9
      mapbox://styles/mapbox/dark-v9
      mapbox://styles/mapbox/satellite-v9
			mapbox://styles/mapbox/satellite-streets-v9
    */

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glStyle', function (style) {
				map.setStyle(style);
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlStyleDirectiveLink
	};

	return directive;
}]);

angular.module('mapboxgl-directive').directive('glZoom', [function () {
	function mapboxGlZoomDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glZoom', function (zoom) {
				if (angular.isNumber(zoom) && (zoom >= 0 || zoom <= 20)) {
					map.setZoom(zoom);
				} else {
					throw new Error('Invalid zoom');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlZoomDirectiveLink
	};

	return directive;
}]);
}(angular, mapboxgl));