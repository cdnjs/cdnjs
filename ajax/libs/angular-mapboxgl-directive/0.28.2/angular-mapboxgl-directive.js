(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
*  angular-mapboxgl-directive 0.28.2 2017-01-30
*  An AngularJS directive for Mapbox GL
*  git: git+https://github.com/Naimikan/angular-mapboxgl-directive.git
*/
(function (angular, mapboxgl) {
'use strict';
angular.module('mapboxgl-directive', []).directive('mapboxgl', ['$q', 'mapboxglUtils', 'mapboxglConstants', 'mapboxglEventsUtils', 'mapboxglMapsData', function ($q, mapboxglUtils, mapboxglConstants, mapboxglEventsUtils, mapboxglMapsData) {
  function mapboxGlDirectiveController ($scope) {
    angular.extend(this, {
      _mapboxGlMap: $q.defer(),
      _geojsonObjects: [],
      _imageObjects: [],
      _videoObjects: [],
      _markerObjects: [],
      _persistentGeojson: mapboxglConstants.map.defaultPersistentGeojson,
      _persistentImage: mapboxglConstants.map.defaultPersistentImage,
      _persistentVideo: mapboxglConstants.map.defaultPersistentVideo,
      _elementDOM: null,

      getMap: function () {
        return this._mapboxGlMap.promise;
      },

      getMapboxGlScope: function () {
        return $scope;
      },

      getDOMElement: function () {
        return this._elementDOM;
      },

      setDOMElement: function (elementDOM) {
        this._elementDOM = elementDOM;
      },

      /* Geojson */
      getGeojsonObjects: function () {
        return this._geojsonObjects;
      },

      addGeojsonObject: function (geojsonObject) {
        this._geojsonObjects.push(geojsonObject);
      },

      removeGeojsonObjects: function () {
        this._geojsonObjects = [];
      },

      /* Image */
      getImageObjects: function () {
        return this._imageObjects;
      },

      addImageObject: function (imageObject) {
        this._imageObjects.push(imageObject);
      },

      removeImageObjects: function () {
        this._imageObjects = [];
      },

      /* Video */
      getVideoObjects: function () {
        return this._videoObjects;
      },

      addVideoObject: function (videoObject) {
        this._videoObjects.push(videoObject);
      },

      removeVideoObjects: function () {
        this._videoObjects = [];
      },

      /* Markers */
      getMarkerObjects: function () {
        return this._markerObjects;
      },

      addMarkerObject: function (markerObject) {
        this._markerObjects.push(markerObject);
      },

      removeMarkerObjects: function () {
        this._markerObjects = [];
      },

      /* Persistent Geojson */
      isGeojsonPersistent: function () {
        return this._persistentGeojson;
      },

      setPersistentGeojson: function (persistentGeojson) {
        this._persistentGeojson = persistentGeojson;
      },

      /* Persistent Image */
      isImagePersistent: function () {
        return this._persistentImage;
      },

      setPersistentImage: function (persistentImage) {
        this._persistentImage = persistentImage;
      },

      /* Persistent Video */
      isVideoPersistent: function () {
        return this._persistentVideo;
      },

      setPersistentVideo: function (persistentVideo) {
        this._persistentVideo = persistentVideo;
      },

      /* Loading Overlay */
      changeLoadingMap: function (map, newValue) {
        if (newValue) {
          if (!this._elementDOM.hasClass('angular-mapboxgl-map-loading')) {
            //this.getMap().then(function (map) {
              map.getCanvas().style.opacity = 0.25;
            //});

            this._elementDOM.addClass('angular-mapboxgl-map-loading');
          }
        } else {
          if (this._elementDOM.hasClass('angular-mapboxgl-map-loading')) {
            //this.getMap().then(function (map) {
              map.getCanvas().style.opacity = 1;
            //});

            this._elementDOM.removeClass('angular-mapboxgl-map-loading');
          }
        }
      }
    });
  }

  function mapboxGlDirectiveLink (scope, element, attrs, controller) {
    if (!mapboxgl) {
      throw new Error('Mapbox GL doesn\`t included');
    }

    if (!mapboxgl.accessToken) {
      if (angular.isDefined(attrs.accessToken) && attrs.accessToken.length > 0) {
        mapboxgl.accessToken = attrs.accessToken;
      } else {
        throw new Error('Mapbox access token doesn\`t defined');
      }
    }

    if (!mapboxgl.supported()) {
      throw new Error('Your browser doesn\`t support Mapbox GL');
    }

    if (angular.isDefined(attrs.rtlEnabled) && mapboxglUtils.stringToBoolean(attrs.rtlEnabled)) {
      if (mapboxgl.setRTLTextPlugin) {
        mapboxgl.setRTLTextPlugin(mapboxglConstants.plugins.rtlPluginUrl);
      } else {
        throw new Error('Your version of Mapbox GL doesn\`t support "setRTLTextPlugin" function.');
      }
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

    var initObject = {
      center: mapboxglConstants.map.defaultCenter,
      zoom: angular.isDefined(scope.glZoom) && scope.glZoom !== null && angular.isDefined(scope.glZoom.value) && scope.glZoom.value !== null ? scope.glZoom.value : mapboxglConstants.map.defaultZoom,
      style: scope.glStyle || mapboxglConstants.map.defaultStyle,
      hash: angular.isDefined(attrs.hash) ? mapboxglUtils.stringToBoolean(attrs.hash) : mapboxglConstants.map.defaultHash,
      bearingSnap: angular.isDefined(attrs.bearingSnap) ? mapboxglUtils.stringToNumber(attrs.bearingSnap) : mapboxglConstants.map.defaultBearingSnap,
      failIfMajorPerformanceCaveat: angular.isDefined(attrs.failIfMajorPerformanceCaveat) ? mapboxglUtils.stringToBoolean(attrs.failIfMajorPerformanceCaveat) : mapboxglConstants.map.defaultFailIfMajorPerformanceCaveat,
      preserveDrawingBuffer: angular.isDefined(attrs.preserveDrawingBuffer) ? mapboxglUtils.stringToBoolean(attrs.preserveDrawingBuffer) : mapboxglConstants.map.defaultPreserveDrawingBuffer,
      trackResize: angular.isDefined(attrs.trackResize) ? mapboxglUtils.stringToBoolean(attrs.trackResize) : mapboxglConstants.map.defaultTrackResize,
      renderWorldCopies: angular.isDefined(attrs.renderWorldCopies) ? mapboxglUtils.stringToBoolean(attrs.renderWorldCopies) : mapboxglConstants.map.defaultRenderWorldCopies
    };

    mapboxglUtils.validateAndFormatCenter(scope.glCenter).then(function (newCenter) {
      if (newCenter) { initObject.center = newCenter; }

      var mapboxGlMap = new mapboxgl.Map({
        container: scope.mapboxglMapId,
        style: initObject.style,
        center: initObject.center,
        zoom: initObject.zoom,
        hash: initObject.hash,
        bearingSnap: initObject.bearingSnap,
        failIfMajorPerformanceCaveat: initObject.failIfMajorPerformanceCaveat,
        preserveDrawingBuffer: initObject.preserveDrawingBuffer,
        trackResize: initObject.trackResize,
        renderWorldCopies: initObject.renderWorldCopies,
        attributionControl: false
      });

      mapboxglMapsData.addMap(scope.mapboxglMapId, mapboxGlMap);

      //scope.isLoading = true;
      //controller.changeLoadingMap(mapboxGlMap, scope.isLoading);

      mapboxGlMap.on('load', function (event) {
        var map = event.target;

        controller._mapboxGlMap.resolve(map);

        mapboxglEventsUtils.exposeMapEvents(map);

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

        //scope.isLoading = false;
        //controller.changeLoadingMap(map, scope.isLoading);
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
    }).catch(function (error) {

    });
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
      glInteractive: '=',
      glHandlers: '=',
      glImage: '=',
      glVideo: '=',
      glPopups: '=',
      glMarkers: '=',
      glLights: '=',
      glSources: '=',
      glLayers: '=',

      persistentGeojson: '=',
      persistentImage: '=',
      persistentVideo: '='
    },
    template: '<div class="angular-mapboxgl-map"><div class="loader" ng-if="isLoading"></div></div>',
    controller: mapboxGlDirectiveController,
    link: mapboxGlDirectiveLink
  };

  mapboxGlDirectiveController.$inject = ['$scope'];

  return directive;
}]);

angular.module('mapboxgl-directive').directive('mapboxglCompare', ['mapboxglMapsData', function (mapboxglMapsData) {
  function mapboxGlCompareDirectiveLink (scope, element, attrs) {
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

    if (!mapboxgl.Compare) {
      throw new Error('mapboxgl.Compare plugin does not included');
    }

    if (!mapboxgl.supported()) {
      throw new Error('Your browser does not support Mapbox GL');
    }

    if (angular.isDefined(scope.compareSettings) && Object.prototype.toString.call(scope.compareSettings) !== Object.prototype.toString.call({})) {
      throw new Error('Invalid mapboxgl.Compare parameters');
    }

    element.ready(function () {
      var children = element.children();

      if (children.length !== 2) {
        throw new Error('Only two maps can be compared');
      }

      var map1 = angular.element(children[0]);
      map1.addClass('compare-map');

      var map2 = angular.element(children[1]);
      map2.addClass('compare-map');

      var mapboxgl1 = mapboxglMapsData.getMapById(children[0].id);
      var mapboxgl2 = mapboxglMapsData.getMapById(children[1].id);

      var compareMap = new mapboxgl.Compare(mapboxgl1, mapboxgl2, scope.compareSettings);

      element.css('height', map1.css('height'));

      scope.$watch(function () {
        return map1[0].getAttribute('height');
      }, function () {
        element.css('height', map1.css('height'));
      });
    });
  }

  var directive = {
    restrict: 'EA',
    replace: true,
    scope: {
      compareSettings: '='
    },
    transclude: true,
    template: '<div class="angular-mapboxgl-compare" ng-transclude></div>',
    link: mapboxGlCompareDirectiveLink
  };

  return directive;
}]);

angular.module('mapboxgl-directive').factory('mapboxglEventsUtils', ['$rootScope', function ($rootScope) {
  var eventsAvailables = [
    'resize',
    'webglcontextlost',
    'webglcontextrestored',
    'remove',
    'mouseup',
    'mousedown',
    'mouseout',
    'render',
    'tiledataloading',
    'movestart',
    'contextmenu',
    'dblclick',
    'click',
    'touchcancel',
    'touchmove',
    'touchend',
    'touchstart',
    'sourcedataloading',
    'styledataloading',
    'mousemove',
    'load',
    'move',
    'moveend',
    'error',
    'data',
    'styledata',
    'sourcedata',
    'dataloading',
    'tiledata',
    'zoomend',
    'zoom',
    'zoomstart',
    'boxzoomstart',
    'boxzoomcancel',
    'boxzoomend',
    'rotatestart',
    'rotate',
    'rotateend',
    'dragend',
    'drag',
    'dragstart',
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

angular.module('mapboxgl-directive').factory('mapboxglLayerUtils', ['mapboxglUtils', 'mapboxglConstants', 'mapboxglPopupUtils', function (mapboxglUtils, mapboxglConstants, mapboxglPopupUtils) {
  var _layersCreated = [];
  var _relationLayersPopups = [];
  var _relationLayersEvents = [];

  function getCreatedLayers () {
    return _layersCreated;
  }

  /* Layer/Popup relation */
  function removePopupRelationByLayerId (layerId) {
    _relationLayersPopups = _relationLayersPopups.filter(function (each) {
      return each.layerId !== layerId;
    });
  }

  function removeAllPopupRelations () {
    _relationLayersPopups = [];
  }

  function getPopupRelationByLayerId (layerId) {
    var relationArray = _relationLayersPopups.filter(function (each) {
      return each.layerId === layerId;
    });

    if (relationArray.length > 0) {
      return relationArray[0].popup;
    } else {
      return false;
    }
  }

  /* Layer/Event relation */
  function removeEventRelationByLayerId (layerId) {
    _relationLayersEvents = _relationLayersEvents.filter(function (each) {
      return each.layerId !== layerId;
    });
  }

  function removeAllEventRelations () {
    _relationLayersEvents = [];
  }

  function getEventRelationByLayerId (layerId) {
    var relationArray = _relationLayersEvents.filter(function (each) {
      return each.layerId === layerId;
    });

    if (relationArray.length > 0) {
      return relationArray[0].events;
    } else {
      return false;
    }
  }

  function createLayerByObject (map, layerObject) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(layerObject) || layerObject === null) {
      throw new Error('Layer object is undefined');
    }

    if (angular.isUndefined(layerObject.id) || layerObject.id === null) {
      throw new Error('Layer ID Required');
    }

    if (angular.isUndefined(layerObject.type) || layerObject.type === null) {
      throw new Error('Layer type Required');
    }

    var defaultMetadata = {
      type: 'mapboxgl:' + layerObject.type,
      popup: angular.isDefined(layerObject.popup) && angular.isDefined(layerObject.popup.enabled) && layerObject.popup.enabled ? layerObject.popup.enabled : false
    };

    var tempObject = {};

    for (var attribute in layerObject) {
      if (attribute !== 'before' && attribute !== 'popup' && attribute !== 'animation' && attribute !== 'events') {
        tempObject[attribute] = layerObject[attribute];
      }
    }

    tempObject.metadata = angular.isDefined(layerObject.metadata) ? layerObject.metadata : {};
    angular.extend(tempObject.metadata, defaultMetadata);

    var before = angular.isDefined(layerObject.before) && angular.isDefined(layerObject.before) ? layerObject.before : undefined;

    map.addLayer(tempObject, before);

    _layersCreated.push(layerObject.id);

    // Add popup relation
    _relationLayersPopups.push({
      layerId: layerObject.id,
      popup: layerObject.popup
    });

    // Add events relation
    _relationLayersEvents.push({
      layerId: layerObject.id,
      events: layerObject.events
    });
  }

  function existLayerById (layerId) {
    var exist = false;

    if (angular.isDefined(layerId) && layerId !== null) {
      exist = _layersCreated.indexOf(layerId) !== -1 ? true : false;
    }

    return exist;
  }

  function removeLayerById (map, layerId) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (existLayerById(layerId)) {
      map.removeLayer(layerId);

      _layersCreated = _layersCreated.filter(function (eachLayerCreated) {
        return eachLayerCreated !== layerId;
      });

      mapboxglPopupUtils.removePopupByLayerId(layerId);
      removePopupRelationByLayerId(layerId);
      removeEventRelationByLayerId(layerId);

      // map.off('eventName');
    } else {
      throw new Error('Invalid layer ID');
    }
  }

  function updateLayerByObject (map, layerObject) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(layerObject) || layerObject === null) {
      throw new Error('Layer object is undefined');
    }

    if (angular.isUndefined(layerObject.id) || layerObject.id === null) {
      throw new Error('Layer ID Required');
    }

    // Before layer property
    if (angular.isDefined(layerObject.before) && layerObject.before !== null) {
      map.moveLayer(layerObject.id, layerObject.before);
    }

    // Filter property
    if (angular.isDefined(layerObject.filter) && layerObject.filter !== null && angular.isArray(layerObject.filter)) {
      map.setFilter(layerObject.id, layerObject.filter);
    }

    // Minzoom and maxzoom properties
    var currentLayer = map.getLayer(layerObject.id);
    map.setLayerZoomRange(layerObject.id, layerObject.minzoom || currentLayer.minzoom, layerObject.maxzoom || currentLayer.maxzoom);

    // Popup property
    if (angular.isDefined(layerObject.popup) && layerObject.popup !== null) {
      mapboxglPopupUtils.removePopupByLayerId(layerObject.id);
      removePopupRelationByLayerId(layerObject.id);

      _relationLayersPopups.push({
        layerId: layerObject.id,
        popup: layerObject.popup
      });
    }

    // Events property
    if (angular.isDefined(layerObject.events) && layerObject.events !== null) {
      removeEventRelationByLayerId(layerObject.id);

      _relationLayersEvents.push({
        layerId: layerObject.id,
        events: layerObject.events
      });
    }

    // Paint properties
    if (angular.isDefined(layerObject.paint) && layerObject.paint !== null) {
      for (var eachPaintProperty in layerObject.paint) {
        if (layerObject.paint.hasOwnProperty(eachPaintProperty)) {
          var layerPaintProperty = map.getPaintProperty(layerObject.id, eachPaintProperty);

          if (layerPaintProperty !== layerObject.paint[eachPaintProperty]) {
            map.setPaintProperty(layerObject.id, eachPaintProperty, layerObject.paint[eachPaintProperty]);
          }
        }
      }
    }

    // Layout properties
    if (angular.isDefined(layerObject.layout) && layerObject.layout !== null) {
      for (var eachLayoutProperty in layerObject.layout) {
        if (layerObject.layout.hasOwnProperty(eachLayoutProperty)) {
          var layerLayoutProperty = map.getLayoutProperty(layerObject.id, eachLayoutProperty);

          if (layerLayoutProperty !== layerObject.layout[eachLayoutProperty]) {
            map.setLayoutProperty(layerObject.id, eachLayoutProperty, layerObject.layout[eachLayoutProperty]);
          }
        }
      }
    }
  }

  var mapboxglLayerUtils = {
    createLayerByObject: createLayerByObject,
    existLayerById: existLayerById,
    removeLayerById: removeLayerById,
    updateLayerByObject: updateLayerByObject,
    getCreatedLayers: getCreatedLayers,
    removeAllPopupRelations: removeAllPopupRelations,
    removePopupRelationByLayerId: removePopupRelationByLayerId,
    getPopupRelationByLayerId: getPopupRelationByLayerId,
    removeAllEventRelations: removeAllEventRelations,
    removeEventRelationByLayerId: removeEventRelationByLayerId,
    getEventRelationByLayerId: getEventRelationByLayerId
	};

	return mapboxglLayerUtils;
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
	var _popupsCreated = [];

	/*
		/\$\{(.+?)\}/g --> Lorem ${ipsum} lorem ${ipsum} --> ['${ipsum}', '${ipsum}']
		/[^\$\{](.+)[^\}]/g --> ${ipsum} --> ipsum
	*/
	var _regexFindDollar = new RegExp(/\$\{(.+?)\}/g);
	var _regexGetValueBetweenDollarClaudator = new RegExp(/[^\$\{](.+)[^\}]/g);

	function getAllPopupsCreated () {
		return _popupsCreated;
	}

	function getPopupByLayerId (layerId) {
		var popupsFiltered = _popupsCreated.filter(function (each) {
			return each.layerId === layerId;
		});

		if (angular.isUndefined(layerId) || layerId === null) {
			return popupsFiltered.map(function (each) {
				return each.popupInstance;
			});
		} else {
			if (popupsFiltered.length > 0) {
				return popupsFiltered[0].popupInstance;
			}
		}
	}

	function removeAllPopupsCreated (map) {
		_popupsCreated.map(function (eachPopup) {
			eachPopup.popupInstance.remove();
		});

		_popupsCreated = [];
	}

	function removePopupByLayerId (map, layerId) {
		var popupsByLayer = _popupsCreated.filter(function (eachPopup) {
			return eachPopup.layerId === layerId;
		});

		popupsByLayer.map(function (eachPopup) {
			eachPopup.popupInstance.remove();
		});

		_popupsCreated = _popupsCreated.filter(function (eachPopup) {
			return eachPopup.layerId !== layerId;
		});
	}

	function createPopupByObject (map, feature, object) {
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

		var popup = new mapboxgl.Popup(popupOptions).setLngLat(object.coordinates);

		// If HTML Element
		if (object.html instanceof HTMLElement) {
			popup.setDOMContent(object.html);
		} else {
			var templateScope = angular.isDefined(object.getScope) && angular.isFunction(object.getScope) ? object.getScope() : $rootScope;
			var htmlCopy = angular.copy(object.html);

			if (_regexFindDollar.test(object.html)) {
				var allMatches = object.html.match(_regexFindDollar);

				if (allMatches.length > 0) {
					allMatches.forEach(function (eachMatch) {
						var tempMatch = eachMatch.match(_regexGetValueBetweenDollarClaudator);

						if (tempMatch.length > 0) {
							var regexValue = tempMatch[0];

							if (feature.properties.hasOwnProperty(regexValue)) {
								htmlCopy = htmlCopy.replace(eachMatch, feature.properties[regexValue]);
							} else {
								throw new Error('Property "' + regexValue + '" isn\'t exist in source "' + feature.layer.source + '"');
							}
						}
					});
				}
			}

			try {
				var templateHtmlElement = $compile(htmlCopy)(templateScope)[0];

				popup.setDOMContent(templateHtmlElement);
			} catch (error) {
				popup.setHTML(htmlCopy);
			}
		}

		popup.addTo(map);

		_popupsCreated.push({
			popupInstance: popup,
			layerId: feature.layer.id
		});

    return popup;
	}

	var mapboxglPopupUtils = {
		createPopupByObject: createPopupByObject,
		getAllPopupsCreated: getAllPopupsCreated,
		getPopupByLayerId: getPopupByLayerId,
		removeAllPopupsCreated: removeAllPopupsCreated,
		removePopupByLayerId: removePopupByLayerId
	};

	return mapboxglPopupUtils;
}]);

angular.module('mapboxgl-directive').factory('mapboxglSourceUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
  var _sourcesCreated = [];

  function createSourceByObject (map, sourceObject) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(sourceObject) || sourceObject === null) {
      throw new Error('Source object is undefined');
    }

    if (angular.isUndefined(sourceObject.id) || sourceObject.id === null) {
      throw new Error('Source ID Required');
    }

    if (angular.isUndefined(sourceObject.type) || sourceObject.type === null) {
      throw new Error('Source type Required');
    }

    if (angular.isUndefined(sourceObject.data) || sourceObject.data === null) {
      throw new Error('Source data Required');
    }

    var tempObject = {};

    for (var attribute in sourceObject) {
      if (attribute !== 'id' && attribute !== 'animation') {
        tempObject[attribute] = sourceObject[attribute];
      }
    }

    map.addSource(sourceObject.id, tempObject);

    _sourcesCreated.push(sourceObject.id);
  }

  function existSourceById (sourceId) {
    var exist = false;

    if (angular.isDefined(sourceId) && sourceId !== null) {
      exist = _sourcesCreated.indexOf(sourceId) !== -1 ? true : false;
    }

    return exist;
  }

  function removeSourceById (map, sourceId) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (existSourceById(sourceId)) {
      map.removeSource(sourceId);

      _sourcesCreated = _sourcesCreated.filter(function (eachSourceCreated) {
        return eachSourceCreated !== sourceId;
      });
    } else {
      throw new Error('Invalid source ID');
    }
  }

  function updateSourceByObject (map, sourceObject) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(sourceObject) || sourceObject === null) {
      throw new Error('Source object is undefined');
    }

    if (angular.isUndefined(sourceObject.id) || sourceObject.id === null) {
      throw new Error('Source ID Required');
    }

    if (angular.isUndefined(sourceObject.data) || sourceObject.data === null) {
      throw new Error('Source data Required');
    }

    var currentSource = map.getSource(sourceObject.id);
    currentSource.setData(sourceObject.data);
  }

  function getCreatedSources () {
    return _sourcesCreated;
  }

  var mapboxglSourceUtils = {
    createSourceByObject: createSourceByObject,
    existSourceById: existSourceById,
    removeSourceById: removeSourceById,
    updateSourceByObject: updateSourceByObject,
    getCreatedSources: getCreatedSources
	};

	return mapboxglSourceUtils;
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

	function stringToBoolean (stringValue) {
		var returnValue = false;

		if (angular.isDefined(stringValue) && stringValue !== null) {
			returnValue = (stringValue.toLowerCase() === 'true');
		}

		return returnValue;
	}

	function stringToNumber (stringValue) {
		if (angular.isDefined(stringValue) && stringValue !== null) {
			var convertedNumber = +stringValue;

			if (!isNaN(convertedNumber)) {
				return convertedNumber;
			} else {
				throw new Error('mapboxglUtils.stringToNumber --> Invalid stringValue');
			}
		}
	}

	var mapboxglUtils = {
		generateMapId: generateMapId,
		validateAndFormatCenter: validateAndFormatCenter,
		arrayObjectIndexOf: arrayObjectIndexOf,
		stringToBoolean: stringToBoolean,
		stringToNumber: stringToNumber
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
		defaultZoom: 0,
		defaultHash: false,
		defaultBearingSnap: 7,
		defaultFailIfMajorPerformanceCaveat: false,
		defaultPreserveDrawingBuffer: false,
		defaultTrackResize: true,
		defaultRenderWorldCopies: true,

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
	},

	plugins: {
		rtlPluginUrl: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js'
	}
});

angular.module('mapboxgl-directive').directive('glBearing', [function () {
	function mapboxGlBearingDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glBearing', function (bearingObject) {
				if (angular.isDefined(bearingObject)) {
					if (angular.isNumber(bearingObject.value)) {
						map.setBearing(bearingObject.value, bearingObject.eventData);
					} else {
						throw new Error('Invalid bearing');
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
						if (angular.isDefined(oldCenter) && center !== oldCenter) {
							map.flyTo({ center: newCenter });
						} else {
							map.setCenter(newCenter);
						}
					} else {
						throw new Error('Invalid center');
					}
				}).catch(function (error) {
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
			mapboxglScope.$watch('glClasses', function (classesObject) {
        if (angular.isDefined(classesObject)) {
          map.setClasses(classesObject.classes, classesObject.options);
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

angular.module('mapboxgl-directive').directive('glControls', ['$rootScope', '$window', function ($rootScope, $window) {
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

					map.removeControl(controlToRemove.control);
	      } else {
	        var customControls = _controlsCreated[attribute];

					for (var iterator = 0, length = customControls.length; iterator < length; iterator++) {
						var eachCustomControl = customControls[iterator];

						removeEventsFromControl(eachCustomControl.control, eachCustomControl.events, eachCustomControl.isEventsListenedByMap, map);

						map.removeControl(eachCustomControl.control);
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

					map.removeControl(found.control);
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
        geocoder: {
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
				constructor: mapboxgl.Navigation || mapboxgl.NavigationControl,
				pluginName: 'mapboxgl.' + (mapboxgl.Navigation ? mapboxgl.Navigation.name : mapboxgl.NavigationControl.name)
			}, {
				name: 'scale',
				constructor: mapboxgl.Scale || mapboxgl.ScaleControl,
				pluginName: 'mapboxgl.' + (mapboxgl.Scale ? mapboxgl.Scale.name : mapboxgl.ScaleControl.name)
			}, {
				name: 'attribution',
				constructor: mapboxgl.Attribution || mapboxgl.AttributionControl,
				pluginName: 'mapboxgl.' + (mapboxgl.Attribution ? mapboxgl.Attribution.name : mapboxgl.AttributionControl.name)
			}, {
				name: 'geolocate',
				constructor: mapboxgl.Geolocate || mapboxgl.GeolocateControl,
				pluginName: 'mapboxgl.' + (mapboxgl.Geolocate ? mapboxgl.Geolocate.name : mapboxgl.GeolocateControl.name),
				eventsExposedName: 'mapboxglGeolocate',
				eventsAvailables: [
					'geolocate',
					'error'
				]
			}, {
				name: 'geocoder',
				constructor: mapboxgl.Geocoder || $window.MapboxGeocoder,
				pluginName: mapboxgl.Geocoder ? 'mapboxgl.Geocoder' : 'MapboxGeocoder',
				eventsExposedName: 'mapboxglGeocoder',
				eventsAvailables: [
					'clear',
					'loading',
					'results',
					'result',
					'error'
				]
			}, {
				name: 'directions',
				constructor: mapboxgl.Directions || $window.MapboxDirections,
				pluginName: mapboxgl.Directions ? 'mapboxgl.Directions' : 'MapboxDirections',
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
				constructor: mapboxgl.Draw || $window.MapboxDraw,
				pluginName: mapboxgl.Draw ? 'mapboxgl.Draw' : 'MapboxDraw',
				eventsExposedName: 'mapboxglDraw',
				listenInMap: true,
				eventsAvailables: [
					'draw.create',
					'draw.delete',
					'draw.combine',
					'draw.uncombine',
					'draw.update',
					'draw.selectionchange',
					'draw.modechange',
					'draw.render',
					'draw.actionable'
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

								var position = controls[eachControlAvailable.name].options && controls[eachControlAvailable.name].options.position ? controls[eachControlAvailable.name].options.position : undefined;

								map.addControl(control, position);
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

									var position = eachCustomControl.options && eachCustomControl.options.position ? eachCustomControl.options.position : undefined;

									map.addControl(customControl, position);
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
            if (handlers.hasOwnProperty(attribute)) {
              var functionToExecute = handlers[attribute] ? 'enable' : 'disable';
              map[attribute][functionToExecute]();
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

angular.module('mapboxgl-directive').directive('glLayers', ['mapboxglLayerUtils', 'mapboxglPopupUtils', '$timeout', '$q', function (mapboxglLayerUtils, mapboxglPopupUtils, $timeout, $q) {
  function mapboxGlLayersDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    function disableLayerEvents (map) {
      mapboxglPopupUtils.removeAllPopupsCreated(map);

      map.off('click');
      map.off('mousemove');
    }

    function enableLayerEvents (map) {
      map.on('click', function (event) {
        event.originalEvent.preventDefault();
        event.originalEvent.stopPropagation();

        var allLayers = mapboxglLayerUtils.getCreatedLayers();

        var features = map.queryRenderedFeatures(event.point, { layers: allLayers });

        if (features.length > 0) {
          var feature = features[0];

          // Check popup
          var popupObject = mapboxglLayerUtils.getPopupRelationByLayerId(feature.layer.id);

          if (angular.isDefined(popupObject) && popupObject !== null) {
            mapboxglPopupUtils.createPopupByObject(map, feature, {
              coordinates: event.lngLat,
              options: popupObject.options,
              html: popupObject.message,
              getScope: popupObject.getScope
            });
          }

          // Check events
          var layerEvents = mapboxglLayerUtils.getEventRelationByLayerId(feature.layer.id);

          if (angular.isDefined(layerEvents) && layerEvents !== null && angular.isDefined(layerEvents.onClick) && angular.isFunction(layerEvents.onClick)) {
            layerEvents.onClick(map, feature, features);
          }
        }
      });

      map.on('mousemove', function (event) {
        var allLayers = mapboxglLayerUtils.getCreatedLayers();

        var features = map.queryRenderedFeatures(event.point, { layers: allLayers });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

        if (features.length > 0) {
          var feature = features[0];

          var layerEvents = mapboxglLayerUtils.getEventRelationByLayerId(feature.layer.id);

          if (angular.isDefined(layerEvents) && layerEvents !== null && angular.isDefined(layerEvents.onMouseover) && angular.isFunction(layerEvents.onMouseover)) {
            layerEvents.onMouseover(map, feature, features);
          }
        }
      });
    }

    function createOrUpdateLayer (map, layerObject) {
      if (mapboxglLayerUtils.existLayerById(layerObject.id)) {
        mapboxglLayerUtils.updateLayerByObject(map, layerObject);
      } else {
        mapboxglLayerUtils.createLayerByObject(map, layerObject);
      }

      if (angular.isDefined(layerObject.animation) && angular.isDefined(layerObject.animation.enabled) && layerObject.animation.enabled) {
        var animate = function (timestamp) {
          setTimeout(function () {
            requestAnimationFrame(animate);

            layerObject.animation.animationFunction(map, layerObject.id, layerObject.animation.animationData, timestamp);
          }, layerObject.animation.timeoutMilliseconds || 1000);
        };

        animate(0);
      }
    }

    function checkLayersToBeRemoved (map, layers) {
      var defer = $q.defer();

      var layersIds = [];

      if (Object.prototype.toString.call(layers) === Object.prototype.toString.call([])) {
        layersIds = layers.map(function (eachLayer) {
          return eachLayer.id;
        });
      } else if (Object.prototype.toString.call(layers) === Object.prototype.toString.call({})) {
        layersIds.push(layers.id);
      } else {
        defer.reject(new Error('Invalid layers parameter'));
      }

      layersIds = layersIds.filter(function (eachLayerId) {
        return angular.isDefined(eachLayerId);
      });

      var layersToBeRemoved = mapboxglLayerUtils.getCreatedLayers();

      layersIds.map(function (eachLayerId) {
        layersToBeRemoved = layersToBeRemoved.filter(function (eachLayerToBeRemoved) {
          return eachLayerToBeRemoved !== eachLayerId;
        });
      });

      layersToBeRemoved.map(function (eachLayerToBeRemoved) {
        mapboxglLayerUtils.removeLayerById(map, eachLayerToBeRemoved);
      });

      defer.resolve();

      return defer.promise;
    }

    controller.getMap().then(function (map) {
      mapboxglScope.$watch('glLayers', function (layers) {
        if (angular.isDefined(layers)) {
          disableLayerEvents(map);

          checkLayersToBeRemoved(map, layers).then(function () {
            if (Object.prototype.toString.call(layers) === Object.prototype.toString.call([])) {
              layers.map(function (eachLayer) {
                createOrUpdateLayer(map, eachLayer);
              });
            } else if (Object.prototype.toString.call(layers) === Object.prototype.toString.call({})) {
              createOrUpdateLayer(map, layers);
            } else {
              throw new Error('Invalid layers parameter');
            }

            enableLayerEvents(map);
          }).catch(function (error) {
            throw error;
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
		link: mapboxGlLayersDirectiveLink
  };

  return directive;
}]);

angular.module('mapboxgl-directive').directive('glLights', [function () {
	function mapboxGlLightsDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glLights', function (lightsObject) {
        if (angular.isDefined(lightsObject)) {
          map.setLight(lightsObject.options, lightsObject.lightOptions);
        }
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlLightsDirectiveLink
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
			mapboxglScope.$watch('glPitch', function (pitchObject) {
				if (angular.isDefined(pitchObject)) {
					if (angular.isNumber(pitchObject.value) && (pitchObject.value >= 0 || pitchObject.value <= 60)) {
						map.setPitch(pitchObject.value, pitchObject.eventData);
					} else {
						throw new Error('Invalid pitch');
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

angular.module('mapboxgl-directive').directive('glSources', ['mapboxglSourceUtils', '$timeout', '$q', function (mapboxglSourceUtils, $timeout, $q) {
  function mapboxGlSourcesDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    function createOrUpdateSource (map, sourceObject) {
      if (mapboxglSourceUtils.existSourceById(sourceObject.id)) {
        mapboxglSourceUtils.updateSourceByObject(map, sourceObject);
      } else {
        mapboxglSourceUtils.createSourceByObject(map, sourceObject);
      }

      setTimeout(function () {
        if (angular.isDefined(sourceObject.animation) && angular.isDefined(sourceObject.animation.enabled) && sourceObject.animation.enabled) {
          var animate = function (timestamp) {
            setTimeout(function () {
              requestAnimationFrame(animate);

              sourceObject.animation.animationFunction(map, sourceObject.id, sourceObject.animation.animationData, timestamp);
            }, sourceObject.animation.timeoutMilliseconds || 1000);
          };

          animate(0);
        }
      }, 500);
    }

    function checkSourcesToBeRemoved (map, sources) {
      var defer = $q.defer();

      var sourcesIds = [];

      if (Object.prototype.toString.call(sources) === Object.prototype.toString.call([])) {
        sourcesIds = sources.map(function (eachSource) {
          return eachSource.id;
        });
      } else if (Object.prototype.toString.call(sources) === Object.prototype.toString.call({})) {
        sourcesIds.push(sources.id);
      } else {
        defer.reject(new Error('Invalid sources parameter'));
      }

      sourcesIds = sourcesIds.filter(function (eachSourceId) {
        return angular.isDefined(eachSourceId);
      });

      var sourcesToBeRemoved = mapboxglSourceUtils.getCreatedSources();

      sourcesIds.map(function (eachSourceId) {
        sourcesToBeRemoved = sourcesToBeRemoved.filter(function (eachSourceToBeRemoved) {
          return eachSourceToBeRemoved !== eachSourceId;
        });
      });

      sourcesToBeRemoved.map(function (eachSourceToBeRemoved) {
        mapboxglSourceUtils.removeSourceById(map, eachSourceToBeRemoved);
      });

      defer.resolve();

      return defer.promise;
    }

    controller.getMap().then(function (map) {
      mapboxglScope.$watch('glSources', function (sources) {
        if (angular.isDefined(sources)) {
          checkSourcesToBeRemoved(map, sources).then(function () {
            if (Object.prototype.toString.call(sources) === Object.prototype.toString.call([])) {
              sources.map(function (eachSource) {
                createOrUpdateSource(map, eachSource);
              });
            } else if (Object.prototype.toString.call(sources) === Object.prototype.toString.call({})) {
              createOrUpdateSource(map, sources);
            } else {
              throw new Error('Invalid sources parameter');
            }
          }).catch(function (error) {
            throw error;
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
		link: mapboxGlSourcesDirectiveLink
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
					if (style !== oldStyle) {
						var styleChanged = false;

						map.setStyle(style);

						map.on('styledata', function (event) {
							if (!styleChanged) {
								$rootScope.$broadcast('mapboxglMap:styleChanged', {
									map: map,
									newStyle: style,
									oldStyle: oldStyle
								});

								styleChanged = true;
							}
						});

						/*map.on('style.load', function () {
							$rootScope.$broadcast('mapboxglMap:styleChanged', {
								map: map,
								newStyle: style,
								oldStyle: oldStyle
							});
						});*/
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
			mapboxglScope.$watch('glZoom', function (zoomObject) {
				if (angular.isDefined(zoomObject)) {
					if (angular.isNumber(zoomObject.value) && (zoomObject.value >= 0 || zoomObject.value <= 20)) {
						map.setZoom(zoomObject.value, zoomObject.eventData);
					} else {
						throw new Error('Invalid zoom');
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
		link: mapboxGlZoomDirectiveLink
	};

	return directive;
}]);

}(angular, mapboxgl));
},{}]},{},[1]);
