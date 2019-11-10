/*!
*  angular-mapboxgl-directive 0.13.12 2016-10-13
*  An AngularJS directive for Mapbox GL
*  git: git+https://github.com/Naimikan/angular-mapboxgl-directive.git
*/
(function (angular, mapboxgl, undefined) {
'use strict';
angular.module('mapboxgl-directive', []).directive('mapboxgl', ['$q', 'mapboxglUtils', 'mapboxglConstants', 'mapboxglEventsUtils', 'mapboxglMapsData', function ($q, mapboxglUtils, mapboxglConstants, mapboxglEventsUtils, mapboxglMapsData) {
  function mapboxGlDirectiveController ($scope) {
    this._mapboxGlMap = $q.defer();
    this._geojsonObjects = [];
    this._imageObjects = [];
    this._videoObjects = [];
    this._markerObjects = [];
    this._persistentGeojson = mapboxglConstants.map.defaultPersistentGeojson;
    this._persistentImage = mapboxglConstants.map.defaultPersistentImage;
    this._persistentVideo = mapboxglConstants.map.defaultPersistentVideo;

    this._elementDOM = null;

    this.getMap = function () {
      return this._mapboxGlMap.promise;
    };

    this.getMapboxGlScope = function () {
      return $scope;
    };

    this.getDOMElement = function () {
      return this._elementDOM;
    };

    this.setDOMElement = function (elementDOM) {
      this._elementDOM = elementDOM;
    };

    /* Geojson */
    this.getGeojsonObjects = function () {
      return this._geojsonObjects;
    };

    this.addGeojsonObject = function (geojsonObject) {
      this._geojsonObjects.push(geojsonObject);
    };

    this.removeGeojsonObjects = function () {
      this._geojsonObjects = [];
    };

    /* Image */
    this.getImageObjects = function () {
      return this._imageObjects;
    };

    this.addImageObject = function (imageObject) {
      this._imageObjects.push(imageObject);
    };

    this.removeImageObjects = function () {
      this._imageObjects = [];
    };

    /* Video */
    this.getVideoObjects = function () {
      return this._videoObjects;
    };

    this.addVideoObject = function (videoObject) {
      this._videoObjects.push(videoObject);
    };

    this.removeVideoObjects = function () {
      this._videoObjects = [];
    };

    /* Markers */
    this.getMarkerObjects = function () {
      return this._markerObjects;
    };

    this.addMarkerObject = function (markerObject) {
      this._markerObjects.push(markerObject);
    };

    this.removeMarkerObjects = function () {
      this._markerObjects = [];
    };

    /* Persistent Geojson */
    this.isGeojsonPersistent = function () {
      return this._persistentGeojson;
    };

    this.setPersistentGeojson = function (persistentGeojson) {
      this._persistentGeojson = persistentGeojson;
    };

    /* Persistent Image */
    this.isImagePersistent = function () {
      return this._persistentImage;
    };

    this.setPersistentImage = function (persistentImage) {
      this._persistentImage = persistentImage;
    };

    /* Persistent Video */
    this.isVideoPersistent = function () {
      return this._persistentVideo;
    };

    this.setPersistentVideo = function (persistentVideo) {
      this._persistentVideo = persistentVideo;
    };

    /* Loading Overlay */
    this.changeLoadingMap = function (newValue) {
      if (newValue) {
        if (!this._elementDOM.hasClass('angular-mapboxgl-map-loading')) {
          this.getMap().then(function (map) {
            map.getCanvas().style.opacity = 0.25;
          });

          this._elementDOM.addClass('angular-mapboxgl-map-loading');
        }
      } else {
        if (this._elementDOM.hasClass('angular-mapboxgl-map-loading')) {
          this.getMap().then(function (map) {
            map.getCanvas().style.opacity = 1;
          });

          this._elementDOM.removeClass('angular-mapboxgl-map-loading');
        }
      }
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

    controller.setDOMElement(element);

    scope.mapboxglMapId = attrs.id ? attrs.id : mapboxglUtils.generateMapId();

    element.attr('id', scope.mapboxglMapId);

    var updateWidth = function (map) {
      if (isNaN(attrs.width)) {
        element.css('width', attrs.width);
      } else {
        element.css('width', attrs.width + 'px');
      }

      map.resize();
    };

    var updateHeight = function (map) {
      if (isNaN(attrs.height)) {
        element.css('height', attrs.height);
      } else {
        element.css('height', attrs.height + 'px');
      }

      map.resize();
    };

    var updateLanguage = function (map) {
      if (angular.isDefined(attrs.language)) {
        map.setLayoutProperty('country-label-lg', 'text-field', '{name_' + attrs.language + '}');
      }
    };

    if (angular.isDefined(scope.persistentGeojson) && typeof(scope.persistentGeojson) === 'boolean') {
      controller.setPersistentGeojson(scope.persistentGeojson);

      scope.$watch(function () {
        return scope.persistentGeojson;
      }, function () {
        if (typeof(scope.persistentGeojson) === 'boolean') {
          controller.setPersistentGeojson(scope.persistentGeojson);
        } else {
          throw new Error('Invalid parameter');
        }
      });
    }

    if (angular.isDefined(scope.persistentImage) && typeof(scope.persistentImage) === 'boolean') {
      controller.setPersistentImage(scope.persistentImage);

      scope.$watch(function () {
        return scope.persistentImage;
      }, function () {
        if (typeof(scope.persistentImage) === 'boolean') {
          controller.setPersistentImage(scope.persistentImage);
        } else {
          throw new Error('Invalid parameter');
        }
      });
    }

    if (angular.isDefined(scope.persistentVideo) && typeof(scope.persistentVideo) === 'boolean') {
      controller.setPersistentVideo(scope.persistentVideo);

      scope.$watch(function () {
        return scope.persistentVideo;
      }, function () {
        if (typeof(scope.persistentVideo) === 'boolean') {
          controller.setPersistentVideo(scope.persistentVideo);
        } else {
          throw new Error('Invalid parameter');
        }
      });
    }

    var mapboxGlMap = new mapboxgl.Map({
      container: scope.mapboxglMapId,
      style: scope.glStyle || mapboxglConstants.map.defaultStyle,
      center: mapboxglConstants.map.defaultCenter,
      hash: angular.isDefined(attrs.hash) && typeof(attrs.hash) === 'boolean' ? attrs.hash : mapboxglConstants.map.defaultHash,
      bearingSnap: angular.isDefined(attrs.bearingSnap) && angular.isNumber(attrs.bearingSnap) ? attrs.bearingSnap : mapboxglConstants.map.defaultBearingSnap,
      failIfMajorPerformanceCaveat: angular.isDefined(attrs.failIfMajorPerformanceCaveat) && typeof(attrs.failIfMajorPerformanceCaveat) === 'boolean' ? attrs.failIfMajorPerformanceCaveat : mapboxglConstants.map.defaultFailIfMajorPerformanceCaveat,
      preserveDrawingBuffer: angular.isDefined(attrs.preserveDrawingBuffer) && typeof(attrs.preserveDrawingBuffer) === 'boolean' ? attrs.preserveDrawingBuffer : mapboxglConstants.map.defaultPreserveDrawingBuffer,
      trackResize: angular.isDefined(attrs.trackResize) && typeof(attrs.trackResize) === 'boolean' ? attrs.trackResize : mapboxglConstants.map.defaultTrackResize,
      attributionControl: false
    });

    mapboxglMapsData.addMap(scope.mapboxglMapId, mapboxGlMap);

    //scope.isLoading = true;
    //controller.changeLoadingMap(scope.isLoading);

    //mapboxGlMap.on('load', function (map) {
      controller._mapboxGlMap.resolve(mapboxGlMap);

      mapboxglEventsUtils.exposeMapEvents(mapboxGlMap);

      //scope.isLoading = false;
      //controller.changeLoadingMap(scope.isLoading);
    //});

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

      // showCollisionBoxes
      scope.$watch(function () {
        return attrs.showCollisionBoxes;
      }, function () {
        if (typeof(attrs.showCollisionBoxes) === 'boolean') {
          map.showCollisionBoxes = attrs.showCollisionBoxes;
        }
      });

      // showTileBoundaries
      scope.$watch(function () {
        return attrs.showTileBoundaries;
      }, function () {
        if (typeof(attrs.showTileBoundaries) === 'boolean') {
          map.showTileBoundaries = attrs.showTileBoundaries;
        }
      });

      // repaint
      scope.$watch(function () {
        return attrs.repaint;
      }, function () {
        if (typeof(attrs.repaint) === 'boolean') {
          map.repaint = attrs.repaint;
        }
      });

      // Width
      if (angular.isDefined(attrs.width)) {
        updateWidth(map);

        scope.$watch(function () {
          return element[0].getAttribute('width');
        }, function () {
          updateWidth(map);
        });
      }

      // Height
      if (angular.isDefined(attrs.height)) {
        updateHeight(map);

        scope.$watch(function () {
          return element[0].getAttribute('height');
        }, function () {
          updateHeight(map);
        });
      } else {
        element.css('height', mapboxglConstants.map.defaultHeight);

        map.resize();
      }
    });

    scope.$on('mapboxglMap:styleChanged', function () {
      controller.getMap().then(function (map) {
        updateLanguage(map);
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
      glInteractive: '=',
      glHandlers: '=',
      glImage: '=',
      glVideo: '=',
      glPopups: '=',
      glMarkers: '=',

      persistentGeojson: '=',
      persistentImage: '=',
      persistentVideo: '='
    },
    transclude: true,
    template: '<div class="angular-mapboxgl-map"><div class="loader" ng-if="isLoading"></div><div ng-transclude></div></div>',
    controller: mapboxGlDirectiveController,
    link: mapboxGlDirectiveLink
  };

  mapboxGlDirectiveController.$inject = ['$scope'];

  return directive;
}]);

angular.module('mapboxgl-directive').factory('mapboxglEventsUtils', ['$rootScope', function ($rootScope) {
  var eventsAvailables = [
    'webglcontextlost',
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

angular.module('mapboxgl-directive').factory('mapboxglGeojsonUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
  var _relationLayersPopups = [];

  function removeAllRelations () {
    _relationLayersPopups = [];
  }

  function getPopupByLayerId (layerId) {
    var relationArray = _relationLayersPopups.filter(function (each) {
      return each.layerId === layerId;
    });

    if (relationArray.length > 0) {
      return relationArray[0].popup;
    } else {
      return false;
    }
  }

  function createGeojsonByObject (map, object) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    var checkOptionalLayerAttributes = function (layerObject, layerAttributes) {
      var layerAttributesAvailables = [
        'ref',
        'source-layer',
        'minzoom',
        'maxzoom',
        'interactive',
        'filter',
        'layout',
        'paint'
      ];

      if (angular.isDefined(layerAttributes)) {
        layerAttributesAvailables.map(function (eachAttributeAvailable) {
          if (angular.isDefined(layerAttributes[eachAttributeAvailable]) && layerAttributes[eachAttributeAvailable] !== null) {
            layerObject[eachAttributeAvailable] = layerAttributes[eachAttributeAvailable];
          }
        });
      }
    };

    object.id = object.type + '_' + Date.now();

    var sourceData;

    if (angular.isDefined(object.source) && angular.isDefined(object.source.data)) {
      sourceData = object.source.data;
    } else {
      if (angular.isUndefined(object.coordinates) || object.coordinates === null) {
        throw new Error('Object coordinates are undefined');
      }

      if (object.type === 'line') {
        object.geometryType = 'LineString';
        object.layerType = object.type;
      } else if (object.type === 'polygon') {
        object.geometryType = 'Polygon';
        object.layerType = 'fill';
      } else if (object.type === 'circle') {
        object.geometryType = 'Point';
        object.layerType = object.type;
      } else {
        throw new Error('Invalid geojson type');
      }

      sourceData = {
        type: 'Feature',
        properties: object.properties || {},
        geometry: {
          type: object.geometryType,
          coordinates: object.coordinates
        }
      };
    }

    var sourceOptions = {
      type: 'geojson',
      data: sourceData,
      maxzoom: angular.isDefined(object.maxzoom) ? object.maxzoom : mapboxglConstants.source.defaultMaxZoom,
      buffer: angular.isDefined(object.buffer) ? object.buffer : mapboxglConstants.source.defaultBuffer,
      tolerance: angular.isDefined(object.tolerance) ? object.tolerance : mapboxglConstants.source.defaultTolerance,
      cluster: angular.isDefined(object.cluster) ? object.cluster : mapboxglConstants.source.defaultCluster,
      clusterRadius: angular.isDefined(object.clusterRadius) ? object.clusterRadius : mapboxglConstants.source.defaultClusterRadius
    };

    if (angular.isDefined(object.clusterMaxZoom) && angular.isNumber(object.clusterMaxZoom)) {
      sourceOptions.clusterMaxZoom = object.clusterMaxZoom;
    }

    map.addSource(object.id, sourceOptions);

    var before = angular.isDefined(object.layer) && angular.isDefined(object.layer.before) ? object.layer.before : undefined;

    var layerToAdd = {
      id: object.id,
      type: object.layerType,
      source: object.id,
      metadata: {
        type: 'mapboxgl:geojson',
        popup: angular.isDefined(object.popup) && angular.isDefined(object.popup.enabled) && object.popup.enabled ? object.popup.enabled : false
      }
    };

    _relationLayersPopups.push({
      layerId: object.id,
      popup: object.popup
    });

    checkOptionalLayerAttributes(layerToAdd, object.layer);

    map.addLayer(layerToAdd, before);
  }

  var mapboxglGeojsonUtils = {
		createGeojsonByObject: createGeojsonByObject,
    getPopupByLayerId: getPopupByLayerId,
    removeAllRelations: removeAllRelations
	};

	return mapboxglGeojsonUtils;
}]);

angular.module('mapboxgl-directive').factory('mapboxglImageUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
	function createImageByObject (map, object) {
		if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    if (angular.isUndefined(object.url) || object.url === null) {
			throw new Error('Object url is undefined');
		}

    if (angular.isUndefined(object.coordinates) || object.coordinates === null) {
			throw new Error('Object coordinates are undefined');
		}

    object.id = 'image_' + Date.now();

    map.addSource(object.id, {
    	type: 'image',
    	url: object.url,
    	coordinates: object.coordinates
    });

		map.addLayer({
			id: object.id,
			source: object.id,
			type: 'raster',
			layout: angular.isDefined(object.layer) && angular.isDefined(object.layer.layout) ? object.layer.layout : {},
      paint: angular.isDefined(object.layer) && angular.isDefined(object.layer.paint) ? object.layer.paint : {}
		});
	}

	var mapboxglImageUtils = {
		createImageByObject: createImageByObject
	};

	return mapboxglImageUtils;
}]);

angular.module('mapboxgl-directive').factory('mapboxglMapsData', ['mapboxglUtils', function (mapboxglUtils) {
  var _mapInstances = [];

  function addMap (mapId, mapInstance) {
    _mapInstances.push({
      id: mapId,
      mapInstance: mapInstance
    });
  }

  function removeMapById (mapId) {
    var mapIndexOf = mapboxglUtils.arrayObjectIndexOf(_mapInstances, mapId, 'id');

    if (mapIndexOf !== -1) {
      var mapObject = _mapInstances[mapIndexOf];
      mapObject.mapInstance.remove();

      _mapInstances.splice(mapIndexOf, 1);
    }
  }

  function removeAllMaps () {
    _mapInstances.map(function (eachMapObject) {
      eachMapObject.mapInstance.remove();
    });

    _mapInstances = [];
  }

  function getMaps () {
    return _mapInstances;
  }

  function getMapById (mapId) {
    var mapIndexOf = mapboxglUtils.arrayObjectIndexOf(_mapInstances, mapId, 'id');

    if (mapIndexOf !== -1) {
      return _mapInstances[mapIndexOf].mapInstance;
    } else {
      return null;
    }
  }

  var mapboxglMapsData = {
    addMap: addMap,
    removeMapById: removeMapById,
    removeAllMaps: removeAllMaps,
    getMaps: getMaps,
    getMapById: getMapById
  };

  return mapboxglMapsData;
}]);

angular.module('mapboxgl-directive').factory('mapboxglMarkerUtils', ['mapboxglUtils', 'mapboxglConstants', 'mapboxglPopupUtils', function (mapboxglUtils, mapboxglConstants, mapboxglPopupUtils) {
	function createMarkerByObject (map, object) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    if (angular.isUndefined(object.coordinates) || object.coordinates === null) {
      throw new Error('Object coordinates are undefined');
    }

    if (angular.isUndefined(object.element) || object.element === null) {
      throw new Error('Object element is undefined');
    }

    var markerOptions = object.options || {};

    var marker = new mapboxgl.Marker(object.element, markerOptions)
      .setLngLat(object.coordinates);

    if (angular.isDefined(object.popup)) {
      var popup = mapboxglPopupUtils.createPopupByObject(map, object.popup);
      marker.setPopup(popup);
    }

    marker.addTo(map);

    return marker;
	}

	var mapboxglMarkerUtils = {
		createMarkerByObject: createMarkerByObject
	};

	return mapboxglMarkerUtils;
}]);

angular.module('mapboxgl-directive').factory('mapboxglPopupUtils', ['mapboxglUtils', 'mapboxglConstants', '$rootScope', '$compile', function (mapboxglUtils, mapboxglConstants, $rootScope, $compile) {
	function createPopupByObject (map, object) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    if (angular.isUndefined(object.coordinates) || object.coordinates === null) {
      throw new Error('Object coordinates are undefined');
    }

    if (angular.isUndefined(object.html) || object.html === null) {
      throw new Error('Object html is undefined');
    }

    var popupOptions = object.options || {};

		var popup = new mapboxgl.Popup(popupOptions).setLngLat(map.unproject(object.coordinates));

		// If HTML Element
		if (object.html instanceof HTMLElement) {
			var templateScope = angular.isDefined(object.getScope) && angular.isFunction(object.getScope) ? object.getScope() : $rootScope;
			var templateHtmlElement = $compile(object.html)(templateScope)[0];

			popup.setDOMContent(templateHtmlElement);
		} else {
			popup.setHTML(object.html);
		}

		popup.addTo(map);

    return popup;
	}

	var mapboxglPopupUtils = {
		createPopupByObject: createPopupByObject
	};

	return mapboxglPopupUtils;
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

	function arrayObjectIndexOf (array, searchTerm, property) {
		for (var iterator = 0, length = array.length; iterator < length; iterator++) {
	    if (array[iterator][property] === searchTerm) {
	      return iterator;
	    }
	  }

	  return -1;
	}

	var mapboxglUtils = {
		generateMapId: generateMapId,
		validateAndFormatCenter: validateAndFormatCenter,
		arrayObjectIndexOf: arrayObjectIndexOf
	};

	return mapboxglUtils;
}]);

angular.module('mapboxgl-directive').factory('mapboxglVideoUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
  function createVideoByObject (map, object) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    if (angular.isUndefined(object.urls) || !angular.isArray(object.urls) || object.urls === null) {
      throw new Error('Object urls is undefined');
    }

    if (angular.isUndefined(object.coordinates) || object.coordinates === null) {
      throw new Error('Object coordinates are undefined');
    }

    object.id = 'video_' + Date.now();

    map.addSource(object.id, {
      type: 'video',
      urls: object.url,
      coordinates: object.coordinates
    });

    map.addLayer({
      id: object.id,
      source: object.id,
      type: 'raster',
      layout: angular.isDefined(object.layer) && angular.isDefined(object.layer.layout) ? object.layer.layout : {},
      paint: angular.isDefined(object.layer) && angular.isDefined(object.layer.paint) ? object.layer.paint : {}
    });
  }

  var mapboxglVideoUtils = {
    createVideoByObject: createVideoByObject
  };

  return mapboxglVideoUtils;
}]);

angular.module('mapboxgl-directive').constant('mapboxglConstants', {
	map: {
		defaultHeight: '450px',
		defaultStyle: 'mapbox://styles/mapbox/streets-v9',
		defaultCenter: [0, 0],
		defaultHash: false,
		defaultBearingSnap: 7,
		defaultFailIfMajorPerformanceCaveat: false,
		defaultPreserveDrawingBuffer: false,
		defaultTrackResize: true,

		defaultPersistentGeojson: false,
		defaultPersistentImage: false,
		defaultPersistentVideo: false
	},
	source: {
		defaultMaxZoom: 18,
		defaultBuffer: 128,
		defaultTolerance: 0.375,
		defaultCluster: false,
		defaultClusterRadius: 50
	}
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
			mapboxglScope.$watch('glCenter', function (center, oldCenter) {
				mapboxglUtils.validateAndFormatCenter(center).then(function (newCenter) {
					if (newCenter) {
						//map.panTo(newCenter);
						//map.flyTo({ center: newCenter });

						if (angular.isDefined(oldCenter) && center !== oldCenter) {
							map.flyTo({ center: newCenter });
						} else {
							map.setCenter(newCenter);
						}
					} else {
						throw new Error('Invalid center');
					}
				}).catch(function (error) {
					//map.panTo(mapboxglConstants.map.defaultCenter);
					//map.flyTo({ center: mapboxglConstants.map.defaultCenter });
					map.setCenter(mapboxglConstants.map.defaultCenter);

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

angular.module('mapboxgl-directive').directive('glControls', ['$rootScope', function ($rootScope) {
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

	  var addNewControlCreated = function (controlName, newControl, isCustomControl, controlEvents, isEventsListenedByMap) {
	    if (isCustomControl) {
	      _controlsCreated.custom.push({
	        name: controlName || 'customControl_' + Date.now(),
	        control: newControl,
					isEventsListenedByMap: angular.isDefined(isEventsListenedByMap) ? isEventsListenedByMap : false,
					events: angular.isDefined(controlEvents) && angular.isArray(controlEvents) ? controlEvents : []
	      });
	    } else {
	      _controlsCreated[controlName] = {
					control: newControl,
					isEventsListenedByMap: angular.isDefined(isEventsListenedByMap) ? isEventsListenedByMap : false,
					events: angular.isDefined(controlEvents) && angular.isArray(controlEvents) ? controlEvents : []
				};
	    }
	  };

		var removeEventsFromControl = function (control, events, isEventsListenedByMap, map) {
			if (isEventsListenedByMap) {
				events.map(function (eachEvent) {
					map.off(eachEvent);
				});
			} else {
				events.map(function (eachEvent) {
					control.off(eachEvent);
				});
			}
		};

	  var removeAllControlsCreated = function (map) {
	    for (var attribute in _controlsCreated) {
	      if (attribute !== 'custom') {
	        var controlToRemove = _controlsCreated[attribute];

					removeEventsFromControl(controlToRemove.control, controlToRemove.events, controlToRemove.isEventsListenedByMap, map);

	        controlToRemove.control.remove();
	      } else {
	        var customControls = _controlsCreated[attribute];

					for (var iterator = 0, length = customControls.length; iterator < length; iterator++) {
						var eachCustomControl = customControls[iterator];

						removeEventsFromControl(eachCustomControl.control, eachCustomControl.events, eachCustomControl.isEventsListenedByMap, map);

	          eachCustomControl.control.remove();
					}
	      }
	    }

	    // Reset controls created
	    _controlsCreated = {
	      custom: []
	    };
	  };

	  var removeControlCreatedByName = function (map, controlName) {
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
					removeEventsFromControl(found.control, found.events, found.isEventsListenedByMap, map);

					found.control.remove();
					removed = true;
				} catch (error) {
					throw new Error('Error removing control \'' + controlName + '\' --> ' + error);
				}
			}

			return removed;
	  };

		/*scope.$on('mapboxglMap:styleChanged', function (event, args) {
			var map = args.map;

			map.on('style.load', function () {
				var drawControl = _controlsCreated.draw;
				var drawControlInstance = drawControl.control;

				var coldSource = map.getSource('mapbox-gl-draw-cold');
				var hotSource = map.getSource('mapbox-gl-draw-hot');

				if (!coldSource && !hotSource) {
					map.addSource('mapbox-gl-draw-cold', {
						type: 'geojson',
						data: {
							type: 'FeatureCollection',
							features: []
						}
					});

					map.addSource('mapbox-gl-draw-hot', {
						type: 'geojson',
						data: {
							type: 'FeatureCollection',
							features: []
						}
					});

					console.log(drawControlInstance);

					drawControlInstance.options.styles.map(function (eachStyle) {
						map.addLayer(eachStyle);
					});
				}
			});
		});*/


    /*
      controls: {
        navigation: {
          enabled: true | false,
					options: {}
        },
        scale: {
          enabled: true | false,
          options: {}
        },
        attribution: {
          enabled: true | false,
          options: {}
        },
        geolocate: {
          enabled: true | false,
          options: {}
        },
				directions: {
					enabled: true | false,
					options: {}
				},
				draw: {
					enabled: true | false,
					options: {}
				}
      }
    */

		var controlsAvailables = [
			{
				name: 'navigation',
				constructor: mapboxgl.Navigation,
				pluginName: 'mapboxgl.Navigation'
			}, {
				name: 'scale',
				constructor: mapboxgl.Scale,
				pluginName: 'mapboxgl.Scale'
			}, {
				name: 'attribution',
				constructor: mapboxgl.Attribution,
				pluginName: 'mapboxgl.Attribution'
			}, {
				name: 'geolocate',
				constructor: mapboxgl.Geolocate,
				pluginName: 'mapboxgl.Geolocate',
				eventsExposedName: 'mapboxglGeolocate',
				eventsAvailables: [
					'geolocate',
					'error'
				]
			}, {
				name: 'directions',
				constructor: mapboxgl.Directions,
				pluginName: 'mapboxgl.Directions',
				eventsExposedName: 'mapboxglDirections',
				eventsAvailables: [
					'clear',
					'loading',
					'profile',
					'origin',
					'destination',
					'route',
					'error'
				]
			}, {
				name: 'draw',
				constructor: mapboxgl.Draw,
				pluginName: 'mapboxgl.Draw',
				eventsExposedName: 'mapboxglDraw',
				listenInMap: true,
				eventsAvailables: [
					'draw.create',
					'draw.delete',
					'draw.update',
					'draw.selectionchange',
					'draw.modechange',
					'draw.render'
				]
			}
		];

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glControls', function (controls) {
        if (angular.isDefined(controls)) {
					// Remove all created controls
					removeAllControlsCreated(map);

					controlsAvailables.map(function (eachControlAvailable) {
						if (angular.isDefined(controls[eachControlAvailable.name]) && angular.isDefined(controls[eachControlAvailable.name].enabled) && controls[eachControlAvailable.name].enabled) {
							if (angular.isDefined(eachControlAvailable.constructor) && angular.isFunction(eachControlAvailable.constructor)) {
								var ControlConstructor = eachControlAvailable.constructor.bind.apply(eachControlAvailable.constructor, controls[eachControlAvailable.name].options);
								var control = new ControlConstructor(controls[eachControlAvailable.name].options);

								addNewControlCreated(eachControlAvailable.name, control, false, eachControlAvailable.eventsAvailables, eachControlAvailable.listenInMap);

								if (angular.isDefined(eachControlAvailable.eventsAvailables) && angular.isDefined(eachControlAvailable.eventsExposedName)) {
									var listener = eachControlAvailable.listenInMap ? map : control;

									eachControlAvailable.eventsAvailables.map(function (eachControlEvent) {
										listener.on(eachControlEvent, function (event) {
											var eventName = eachControlAvailable.eventsExposedName + ':' + eachControlEvent;

											$rootScope.$broadcast(eventName, event);
										});
									});
								}

								map.addControl(control);
							} else {
								throw new Error(eachControlAvailable.pluginName + ' plugin is not included.');
							}
	          }
					});

					// Custom Controls
					if (angular.isDefined(controls.custom)) {
						if (angular.isArray(controls.custom)) {
							controls.custom.map(function (eachCustomControl) {
	              if (angular.isDefined(eachCustomControl.constructor)) {
	                var CustomControlFn = eachCustomControl.constructor.bind.apply(eachCustomControl.constructor, eachCustomControl.options);
	                var customControl = new CustomControlFn(eachCustomControl.options);

									var customControlEvents = angular.isArray(eachCustomControl.events) ? eachCustomControl.events : [];

									addNewControlCreated(eachCustomControl.name, customControl, true, customControlEvents, eachCustomControl.listenInMap);

									var listener = eachCustomControl.listenInMap ? map : customControl;

									customControlEvents.map(function (eachCustomControlEvent) {
										listener.on(eachCustomControlEvent, function (event) {
											var eventName = 'mapboxgl:' + eachCustomControl.name + ':' + eachCustomControlEvent;

											$rootScope.$broadcast(eventName, event);
										});
									});

									map.addControl(customControl);
	              }
	            });
						} else {
							throw new Error('\'custom\' must be an array');
						}
          }
        }
			});
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

angular.module('mapboxgl-directive').directive('glGeojson', ['mapboxglGeojsonUtils', 'mapboxglPopupUtils', '$timeout', function (mapboxglGeojsonUtils, mapboxglPopupUtils, $timeout) {
  function mapboxGlGeojsonDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    var disableGeojsonEvents = function (map) {
      map.off('click');
      map.off('mousemove');
    };

    var enableGeojsonEvents = function (map) {
      map.on('click', function (event) {
        var style = map.getStyle();
        var allLayers = style.layers.filter(function (eachLayer) {
          if (angular.isDefined(eachLayer.metadata) && angular.isDefined(eachLayer.metadata.type)) {
            return eachLayer.metadata.type === 'mapboxgl:geojson' && angular.isDefined(eachLayer.metadata.popup) && eachLayer.metadata.popup;
          }
        }).map(function (eachLayer) {
          return eachLayer.id;
        });

        var features = map.queryRenderedFeatures(event.point, { layers: allLayers });

        if (features.length > 0) {
          var feature = features[0];

          var popupObject = mapboxglGeojsonUtils.getPopupByLayerId(feature.layer.id);

          mapboxglPopupUtils.createPopupByObject(map, {
            coordinates: event.point,
            options: popupObject.options,
            html: popupObject.message,
            getScope: popupObject.getScope
          });

          /*var popupOptions = angular.isDefined(popupObject.options) ? popupObject.options : undefined;
          var popupMessage = angular.isDefined(popupObject.message) ? popupObject.message : undefined;

          var popup = new mapboxgl.Popup(popupOptions).setLngLat(map.unproject(event.point));

          if (angular.isDefined(popupMessage)) {
            // If HTML Element
            if (popupMessage instanceof HTMLElement) {
              var templateScope = angular.isDefined(popupObject.getScope) && angular.isFunction(popupObject.getScope) ? popupObject.getScope() : $rootScope;
              var templateHtmlElement = $compile(popupMessage)(templateScope)[0];

              popup.setDOMContent(templateHtmlElement);
            } else {
              popup.setHTML(popupMessage);
            }

            //if (Object.prototype.toString.call(popupMessage) === Object.prototype.toString.call(String())) {}
          }

          popup.addTo(map);*/
        }
      });

      map.on('mousemove', function (event) {
        var style = map.getStyle();
        var allLayers = style.layers.filter(function (eachLayer) {
          if (angular.isDefined(eachLayer.metadata) && angular.isDefined(eachLayer.metadata.type)) {
            return eachLayer.metadata.type === 'mapboxgl:geojson';
          }
        }).map(function (eachLayer) {
          return eachLayer.id;
        });

        var features = map.queryRenderedFeatures(event.point, { layers: allLayers });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
      });
    };

    var geojsonWatched = function (map, controller, geojson) {
      if (angular.isDefined(geojson)) {
        disableGeojsonEvents(map);
        mapboxglGeojsonUtils.removeAllRelations();

        if (Object.prototype.toString.call(geojson) === Object.prototype.toString.call({})) {
          mapboxglGeojsonUtils.createGeojsonByObject(map, geojson);
          controller.addGeojsonObject(geojson);
        } else if (Object.prototype.toString.call(geojson) === Object.prototype.toString.call([])) {
          geojson.map(function (eachGeojson) {
            mapboxglGeojsonUtils.createGeojsonByObject(map, eachGeojson);
            controller.addGeojsonObject(eachGeojson);
          });
        } else {
          throw new Error('Invalid geojson parameter');
        }

        enableGeojsonEvents(map);
      }
    };

    scope.$on('mapboxglMap:styleChanged', function () {
      if (controller.isGeojsonPersistent()) {
        var allGeojsonObjects = angular.copy(controller.getGeojsonObjects());
        controller.removeGeojsonObjects();

        controller.getMap().then(function (map) {
          geojsonWatched(map, controller, allGeojsonObjects);
        });
      } else {
        controller.removeGeojsonObjects();
      }
    });

    /*
      geojson: <Object | Array<Object>>

      obj: {
        type: line | polygon | circle,
        coordinates: LngLatLike | Object,
        layer: {
          layout: Object,
          paint: Object
        },
        popup: {
          enabled: true | false,
          options: Object,
          message: String
        }
      }
    */

		controller.getMap().then(function (map) {
      mapboxglScope.$watchCollection('glGeojson', function (geojson) {
        if (angular.isDefined(geojson) && geojson !== null) {
          $timeout(function () {
            geojsonWatched(map, controller, geojson);
          }, 500, true);

          /*map.on('style.load', function () {
            geojsonWatched(map, controller, geojson);
          });*/

          //geojsonWatched(map, controller, geojson);

          /*if (map.style.loaded()) {
            geojsonWatched(map, controller, geojson);
          } else {
            map.style.on('load', function () {
              geojsonWatched(map, controller, geojson);
            });
          }*/
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

angular.module('mapboxgl-directive').directive('glHandlers', [function () {
  function mapboxGlHandlersDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    /*
      handlers: {
        scrollZoom: true | false,
        boxZoom: true | false,
        dragRotate: true | false,
        dragPan: true | false,
        keyboard: true | false,
        doubleClickZoom: true | false,
        touchZoomRotate: true | false
      }
    */

    controller.getMap().then(function (map) {
      mapboxglScope.$watch('glHandlers', function (handlers) {
        if (angular.isDefined(handlers) && Object.prototype.toString.call(handlers) === Object.prototype.toString.call({})) {
          for (var attribute in handlers) {
            var functionToExecute = handlers[attribute] ? 'enable' : 'disable';
            map[attribute][functionToExecute]();
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
		link: mapboxGlHandlersDirectiveLink
  };

  return directive;
}]);

angular.module('mapboxgl-directive').directive('glImage', ['mapboxglImageUtils', function (mapboxglImageUtils) {
	function mapboxGlImageDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		var imagenWatched = function (map, controller, image) {
      if (angular.isDefined(image)) {
        if (Object.prototype.toString.call(image) === Object.prototype.toString.call({})) {
          mapboxglImageUtils.createImageByObject(map, image);
          controller.addImageObject(image);
        } else if (Object.prototype.toString.call(image) === Object.prototype.toString.call([])) {
          image.map(function (eachImage) {
            mapboxglImageUtils.createImageByObject(map, eachImage);
            controller.addImageObject(eachImage);
          });
        } else {
          throw new Error('Invalid image parameter');
        }
      }
    };

    scope.$on('mapboxglMap:styleChanged', function () {
      if (controller.isImagePersistent()) {
        var allImageObjects = angular.copy(controller.getImageObjects());
        controller.removeImageObjects();

        controller.getMap().then(function (map) {
					imagenWatched(map, controller, allImageObjects);
        });
      } else {
        controller.removeImageObjects();
      }
    });

		controller.getMap().then(function (map) {
      mapboxglScope.$watchCollection('glImage', function (image) {
        if (map.style.loaded()) {
          imagenWatched(map, controller, image);
        } else {
          map.once('style.load', function () {
            imagenWatched(map, controller, image);
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
		link: mapboxGlImageDirectiveLink
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

angular.module('mapboxgl-directive').directive('glMarkers', ['mapboxglMarkerUtils', function (mapboxglMarkerUtils) {
  function mapboxGlMarkersDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    var _markersCreated = [];

    var removeAllMarkersCreated = function () {
      _markersCreated.map(function (eachMarker) {
        eachMarker.remove();
      });

      _markersCreated = [];
    };

    var markersWatched = function (map, markers) {
      if (angular.isDefined(markers)) {
        removeAllMarkersCreated();

        if (Object.prototype.toString.call(markers) === Object.prototype.toString.call({})) {
          var markerCreated = mapboxglMarkerUtils.createMarkerByObject(map, markers);
          _markersCreated.push(markerCreated);
        } else if (Object.prototype.toString.call(markers) === Object.prototype.toString.call([])) {
          markers.map(function (eachMarker) {
            var eachMarkerCreated = mapboxglMarkerUtils.createMarkerByObject(map, eachMarker);
            _markersCreated.push(eachMarkerCreated);
          });
        } else {
          throw new Error('Invalid marker parameter');
        }
      }
    };

    controller.getMap().then(function (map) {
      mapboxglScope.$watchCollection('glMarkers', function (markers) {
        markersWatched(map, markers);
      });
    });
  }

  var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlMarkersDirectiveLink
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
angular.module('mapboxgl-directive').directive('glPopups', ['mapboxglPopupUtils', function (mapboxglPopupUtils) {
  function mapboxGlPopupDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    var _popupsCreated = [];

    var removeAllPopupsCreated = function () {
      _popupsCreated.map(function (eachPopup) {
        eachPopup.remove();
      });

      _popupsCreated = [];
    };

    var popupsWatched = function (map, popups) {
      if (angular.isDefined(popups)) {
        removeAllPopupsCreated();

        if (Object.prototype.toString.call(popups) === Object.prototype.toString.call({})) {
          var popupCreated = mapboxglPopupUtils.createPopupByObject(map, popups);
          _popupsCreated.push(popupCreated);
        } else if (Object.prototype.toString.call(popups) === Object.prototype.toString.call([])) {
          popups.map(function (eachPopup) {
            var eachPopupCreated = mapboxglPopupUtils.createPopupByObject(map, eachPopup);
            _popupsCreated.push(eachPopupCreated);
          });
        } else {
          throw new Error('Invalid popup parameter');
        }
      }
    };

    controller.getMap().then(function (map) {
      mapboxglScope.$watchCollection('glPopups', function (popups) {
        popupsWatched(map, popups);
      });
    });
  }

  var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlPopupDirectiveLink
	};

	return directive;
}]);

angular.module('mapboxgl-directive').directive('glStyle', ['$rootScope', function ($rootScope) {
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
			mapboxglScope.$watch('glStyle', function (style, oldStyle) {
				if (angular.isDefined(style) && style !== null) {
					map.setStyle(style);

					map.on('style.load', function () {
						$rootScope.$broadcast('mapboxglMap:styleChanged', {
							map: map,
							newStyle: style,
							oldStyle: oldStyle
						});
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
		link: mapboxGlStyleDirectiveLink
	};

	return directive;
}]);

angular.module('mapboxgl-directive').directive('glVideo', ['mapboxglVideoUtils', function (mapboxglVideoUtils) {
	// ToDo: Check

	function mapboxGlVideoDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		var videoWatched = function (map, controller, video) {
      if (angular.isDefined(video)) {
        if (Object.prototype.toString.call(video) === Object.prototype.toString.call({})) {
          mapboxglVideoUtils.createVideoByObject(map, video);
          controller.addVideoObject(video);
        } else if (Object.prototype.toString.call(video) === Object.prototype.toString.call([])) {
          video.map(function (eachVideo) {
            mapboxglVideoUtils.createVideoByObject(map, eachVideo);
            controller.addVideoObject(eachVideo);
          });
        } else {
          throw new Error('Invalid video parameter');
        }
      }
    };

    /*scope.$on('mapboxglMap:styleChanged', function () {
      if (controller.isVideoPersistent()) {
        var allVideoObjects = angular.copy(controller.getVideoObjects());
        controller.removeVideoObjects();

        controller.getMap().then(function (map) {
					videoWatched(map, controller, allVideoObjects);
        });
      } else {
        controller.removeVideoObjects();
      }
    });*/

		controller.getMap().then(function (map) {
      mapboxglScope.$watchCollection('glVideo', function (video) {
				if (map.loaded()) {
					videoWatched(map, controller, video);
				} else {
					map.on('load', function () {
						videoWatched(map, controller, video);
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
		link: mapboxGlVideoDirectiveLink
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