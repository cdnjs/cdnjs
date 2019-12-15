(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
*  angular-mapboxgl-directive 0.46.0 2018-04-22
*  An AngularJS directive for Mapbox GL
*  git: git+https://github.com/Naimikan/angular-mapboxgl-directive.git
*/
(function (angular, mapboxgl) {
'use strict';
angular.module('mapboxgl-directive', []).directive('mapboxgl', ['$q', 'Utils', 'mapboxglConstants', 'mapboxglEventsUtils', 'mapboxglMapsData', 'AnimationsManager', 'PopupsManager', function ($q, Utils, mapboxglConstants, mapboxglEventsUtils, mapboxglMapsData, AnimationsManager, PopupsManager) {
  function mapboxGlDirectiveController ($scope) {
    var mapboxGlMap = $q.defer();

    angular.extend(this, {
      _mapboxGlMap: mapboxGlMap,
      _elementDOM: null,
      _animationManager: new AnimationsManager(mapboxGlMap),
      _popupManager: new PopupsManager(mapboxGlMap),
      _isPersistent: false,

      getMap: function () {
        return this._mapboxGlMap.promise;
      },

      getMapboxGlScope: function () {
        return $scope;
      },

      getDOMElement: function () {
        return this._elementDOM;
      },

      getAnimationManager: function () {
        return this._animationManager;
      },

      getPopupManager: function () {
        return this._popupManager;
      },

      setDOMElement: function (elementDOM) {
        this._elementDOM = elementDOM;
      },

      setIsPersistent: function (isPersistent) {
        this._isPersistent = isPersistent;
      },

      isPersistent: function () {
        return this._isPersistent;
      },

      /* Loading Overlay */
      changeLoadingMap: function (newValue) {
        var functionToExecute = newValue ? 'addClass' : 'removeClass';
        var elements = this._elementDOM.find('div');

        for (var iterator = 0; iterator < elements.length; iterator++) {
          var element = angular.element(elements[iterator]);

          if (element.hasClass('angular-mapboxgl-map-loader')) {
            element[functionToExecute]('angular-mapboxgl-map-loading');
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

    if (angular.isDefined(attrs.rtlEnabled) && Utils.stringToBoolean(attrs.rtlEnabled)) {
      if (mapboxgl.setRTLTextPlugin) {
        mapboxgl.setRTLTextPlugin(mapboxglConstants.plugins.rtlPluginUrl);
      } else {
        throw new Error('Your version of Mapbox GL doesn\`t support "setRTLTextPlugin" function.');
      }
    }

    if (angular.isDefined(attrs.persistent) && Utils.stringToBoolean(attrs.persistent)) {
      controller.setIsPersistent(Utils.stringToBoolean(attrs.persistent));
    }

    controller.setDOMElement(element);
    controller.changeLoadingMap(true);
    scope.mapboxglMapId = attrs.id ? attrs.id : Utils.generateMapId();
    element.attr('id', scope.mapboxglMapId);

    var updateWidth = function (map) {
      if (isNaN(attrs.width)) {
        element.css('width', attrs.width);
      } else {
        element.css('width', attrs.width + 'px');
      }

      if (angular.isDefined(map) && map !== null) {
        map.resize();
      }
    };

    var updateHeight = function (map) {
      var newHeight = attrs.height;

      if (angular.isUndefined(newHeight) || newHeight === null) {
        newHeight = mapboxglConstants.map.defaultHeight;
      }

      if (isNaN(newHeight)) {
        element.css('height', newHeight);
      } else {
        element.css('height', newHeight + 'px');
      }

      if (angular.isDefined(map) && map !== null) {
        map.resize();
      }
    };

    updateWidth();
    updateHeight();

    var updateLanguage = function (map) {
      if (angular.isDefined(attrs.language)) {
        map.setLayoutProperty('country-label-lg', 'text-field', '{name_' + attrs.language + '}');
      }
    };

    var initObject = {
      container: scope.mapboxglMapId,
      style: scope.glStyle || mapboxglConstants.map.defaultStyle,
      center: mapboxglConstants.map.defaultCenter,
      zoom: angular.isDefined(scope.glZoom) && scope.glZoom !== null && angular.isDefined(scope.glZoom.value) && scope.glZoom.value !== null ? scope.glZoom.value : mapboxglConstants.map.defaultZoom,
      hash: angular.isDefined(attrs.hash) ? Utils.stringToBoolean(attrs.hash) : mapboxglConstants.map.defaultHash,
      bearingSnap: angular.isDefined(attrs.bearingSnap) ? Utils.stringToNumber(attrs.bearingSnap) : mapboxglConstants.map.defaultBearingSnap,
      pitchWithRotate: angular.isDefined(attrs.pitchWithRotate) ? Utils.stringToBoolean(attrs.pitchWithRotate) : mapboxglConstants.map.defaultPitchWithRotate,
      logoPosition: angular.isDefined(attrs.logoPosition) ? attrs.logoPosition : mapboxglConstants.map.defaultLogoPosition,
      failIfMajorPerformanceCaveat: angular.isDefined(attrs.failIfMajorPerformanceCaveat) ? Utils.stringToBoolean(attrs.failIfMajorPerformanceCaveat) : mapboxglConstants.map.defaultFailIfMajorPerformanceCaveat,
      preserveDrawingBuffer: angular.isDefined(attrs.preserveDrawingBuffer) ? Utils.stringToBoolean(attrs.preserveDrawingBuffer) : mapboxglConstants.map.defaultPreserveDrawingBuffer,
      refreshExpiredTiles: angular.isDefined(attrs.refreshExpiredTiles) ? Utils.stringToBoolean(attrs.refreshExpiredTiles) : mapboxglConstants.map.defaultRefreshExpiredTiles,
      trackResize: angular.isDefined(attrs.trackResize) ? Utils.stringToBoolean(attrs.trackResize) : mapboxglConstants.map.defaultTrackResize,
      renderWorldCopies: angular.isDefined(attrs.renderWorldCopies) ? Utils.stringToBoolean(attrs.renderWorldCopies) : mapboxglConstants.map.defaultRenderWorldCopies,
      maxTileCacheSize: angular.isDefined(attrs.maxTileCacheSize) ? Utils.stringToNumber(attrs.maxTileCacheSize) : mapboxglConstants.map.defaultMaxTileCacheSize,
      localIdeographFontFamily: angular.isDefined(attrs.localIdeographFontFamily) ? attrs.localIdeographFontFamily : mapboxglConstants.map.defaultLocalIdeographFontFamily,
      collectResourceTiming: angular.isDefined(attrs.collectResourceTiming) ? Utils.stringToBoolean(attrs.collectResourceTiming) : mapboxglConstants.map.defaultCollectResourceTiming,
      attributionControl: false
    };

    Utils.validateAndFormatCenter(scope.glCenter).then(function (newCenter) {
      if (newCenter) { initObject.center = newCenter; }

      var mapboxGlMap = new mapboxgl.Map(initObject);

      mapboxglMapsData.addMap(scope.mapboxglMapId, mapboxGlMap);

      mapboxglEventsUtils.exposeMapEvents(mapboxGlMap);
      controller.getAnimationManager().initAnimationSystem();

      //scope.isLoading = true;
      //controller.changeLoadingMap(mapboxGlMap, scope.isLoading);

      mapboxGlMap.on('load', function (event) {
        var map = event.target;

        controller._mapboxGlMap.resolve(map);
        controller.changeLoadingMap(false);

        // Language
        scope.$watch(function () {
          return attrs.language;
        }, function () {
          updateLanguage(map);
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
        if (angular.isDefined(controller.getAnimationManager())) {
          controller.getAnimationManager().destroy();
        }

        if (angular.isDefined(controller.getPopupManager())) {
          controller.getPopupManager().removeAllPopupsCreated();
        }

        mapboxglMapsData.removeMapById(scope.mapboxglMapId);

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
      console.error(error);
    });
  }

  var directive = {
    restrict: 'EA',
    replace: true,
    scope: {
      glBearing: '=',
      glCenter: '=',
      glClasses: '=',
      glControls: '=',
      glFilter: '=',
      glHandlers: '=',
      glImage: '=',
      glInteractive: '=',
      glLayers: '=',
      glLights: '=',
      glMarkers: '=',
      glMaxBounds: '=',
      glMaxZoom: '=',
      glMinZoom: '=',
      glPitch: '=',
      glPopups: '=',
      glSources: '=',
      glStyle: '=',
      glVideo: '=',
      glZoom: '='
    },
    template: '<div class="angular-mapboxgl-map"><div class="angular-mapboxgl-map-loader"><div class="spinner"><div class="double-bounce"></div><div class="double-bounce delayed"></div></div></div></div>',
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

      scope.mapIds = [children[0].id, children[1].id];

      var mapboxgl1 = mapboxglMapsData.getMapById(children[0].id);
      var mapboxgl2 = mapboxglMapsData.getMapById(children[1].id);

      var compareMap = new mapboxgl.Compare(mapboxgl1, mapboxgl2, scope.compareSettings);

      element.css('height', map1.css('height'));

      scope.$watch(function () {
        return map1[0].getAttribute('height');
      }, function () {
        element.css('height', map1.css('height'));
      });

      scope.$on('$destroy', function () {
        scope.mapIds.map(function (eachMapId) {
          var map = mapboxglMapsData.getMapById(eachMapId);
          map.remove();

          mapboxglMapsData.removeMapById(eachMapId);
        });
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

angular.module('mapboxgl-directive').factory('AnimationsManager', ['$window', '$q', 'Utils', function ($window, $q, Utils) {
  function AnimationsManager () {
    this.animationFunctionStack = [];
    this.animationId = null;
  }

  AnimationsManager.prototype.executeFunctionStack = function (deltaTime) {
    var featuresBySource = {};

    this.animationFunctionStack.forEach(function (eachFunction) {
      eachFunction.animationParameters.deltaTime = deltaTime;

      eachFunction.animationFunction(eachFunction.animationParameters);

      if (!featuresBySource[eachFunction.animationParameters.sourceId]) {
        featuresBySource[eachFunction.animationParameters.sourceId] = {
          map: eachFunction.animationParameters.map,
          features: []
        };
      }

      featuresBySource[eachFunction.animationParameters.sourceId].features.push(eachFunction.animationParameters.feature);
    });

    return featuresBySource;
  };

  AnimationsManager.prototype.updateSourcesData = function (featuresBySource) {
    for (var iterator in featuresBySource) {
      if (featuresBySource.hasOwnProperty(iterator)) {
        var map = featuresBySource[iterator].map;
        var data = map.getSource(iterator)._data;

        if (data.type === 'FeatureCollection') {
          angular.extend(data.features, featuresBySource[iterator].features);
        } else if (data.type === 'Feature') {
          data = {
            type: 'FeatureCollection',
            features: featuresBySource[iterator].features
          };
        }

        map.getSource(iterator).setData(data);
      }
    }
  };

  AnimationsManager.prototype.addAnimationFunction = function (sourceId, featureId, animationFunction, animationParameters) {
    if (angular.isDefined(animationFunction) && angular.isFunction(animationFunction)) {
      this.animationFunctionStack.push({
        sourceId: sourceId,
        featureId: featureId,
        animationFunction: animationFunction,
        animationParameters: animationParameters
      });
    }
  };

  AnimationsManager.prototype.updateAnimationFunction = function (featureId, animationFunction, animationData) {
    if (angular.isDefined(animationFunction) && angular.isFunction(animationFunction)) {
      var indexOf = Utils.arrayObjectIndexOf(this.animationFunctionStack, featureId, 'featureId');

      if (indexOf !== -1) {
        angular.extend(this.animationFunctionStack[indexOf].animationParameters, {
          animationFunction: animationFunction,
          animationData: animationData
        });
      } else {
        throw new Error('Feature ID doesn\'t exist');
      }
    }
  };

  AnimationsManager.prototype.existAnimationByFeatureId = function (featureId) {
    return Utils.arrayObjectIndexOf(this.animationFunctionStack, featureId, 'featureId') !== -1;
  };

  AnimationsManager.prototype.removeAnimationStack = function () {
    this.animationFunctionStack = [];
  };

  AnimationsManager.prototype.removeAnimationBySourceId = function (sourceId) {
    this.animationFunctionStack = this.animationFunctionStack.filter(function (eachFunction) {
      return eachFunction.sourceId !== sourceId;
    });
  };

  AnimationsManager.prototype.removeAnimationByFeatureId = function (featureId) {
    this.animationFunctionStack = this.animationFunctionStack.filter(function (eachFunction) {
      return eachFunction.featureId !== featureId;
    });
  };

  AnimationsManager.prototype.initAnimationSystem = function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var iterator = 0; iterator < vendors.length && !window.requestAnimationFrame; ++iterator) {
      window.requestAnimationFrame = window[vendors[iterator] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[iterator] + 'CancelAnimationFrame'] || window[vendors[iterator] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        var currentTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currentTime - lastTime));

        var id = window.setTimeout(function () {
          callback(currentTime + timeToCall);
        }, timeToCall);

        lastTime = currentTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }

    var deltaTime = 0, lastFrameTimeMs = 0, self = this;

    var animationLoop = function (timestamp) {
      deltaTime += timestamp - lastFrameTimeMs;
      lastFrameTimeMs = timestamp;

      // Get all animationFunctions and execute them
      var featuresBySource = self.executeFunctionStack(deltaTime);
      // Setdata of all animated sources
      self.updateSourcesData(featuresBySource);

      self.animationId = window.requestAnimationFrame(animationLoop);
    };

    self.animationId = window.requestAnimationFrame(animationLoop);
  };

  AnimationsManager.prototype.stopAnimationLoop = function () {
    window.cancelAnimationFrame(this.animationId);
  };

  AnimationsManager.prototype.destroy = function () {
    this.stopAnimationLoop();
    this.removeAnimationStack();
  };

  return AnimationsManager;
}]);

angular.module('mapboxgl-directive').factory('LayersManager', ['Utils', 'mapboxglConstants', function (Utils, mapboxglConstants) {
  function LayersManager (mapInstance, popupManager) {
    this.layersCreated = [];
    this.mapInstance = mapInstance;
    this.relationLayersPopups = [];
    this.relationLayersEvents = [];

    if (angular.isDefined(popupManager) && popupManager !== null) {
      this.popupManager = popupManager;
    }
  }

  LayersManager.prototype.recreateLayers = function () {
    var self = this;

    self.layersCreated.map(function (eachLayer) {
      self.createLayerByObject(eachLayer.layerObject);
    });
  };

  LayersManager.prototype.removePopupRelationByLayerId = function (layerId) {
    this.relationLayersPopups = this.relationLayersPopups.filter(function (each) {
      return each.layerId !== layerId;
    });
  };

  LayersManager.prototype.removeAllPopupRelations = function () {
    this.relationLayersPopups = [];
  };

  LayersManager.prototype.getPopupRelationByLayerId = function (layerId) {
    var relationArray = this.relationLayersPopups.filter(function (each) {
      return each.layerId === layerId;
    });

    if (relationArray.length > 0) {
      return relationArray[0].popup;
    } else {
      return false;
    }
  };

  LayersManager.prototype.removeEventRelationByLayerId = function (layerId) {
    this.relationLayersEvents = this.relationLayersEvents.filter(function (each) {
      return each.layerId !== layerId;
    });
  };

  LayersManager.prototype.removeAllEventRelations = function () {
    this.relationLayersEvents = [];
  };

  LayersManager.prototype.getEventRelationByLayerId = function (layerId) {
    var relationArray = this.relationLayersEvents.filter(function (each) {
      return each.layerId === layerId;
    });

    if (relationArray.length > 0) {
      return relationArray[0].events;
    } else {
      return false;
    }
  };

  LayersManager.prototype.createLayerByObject = function (layerObject) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }, {
        name: 'Layer object',
        object: layerObject,
        attributes: ['id', 'type']
      }
    ]);

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

    var before = angular.isDefined(layerObject.before) ? layerObject.before : undefined;

    this.mapInstance.addLayer(tempObject, before);

    this.layersCreated.push({
      layerId: layerObject.id,
      layerObject: layerObject
    });

    // Add popup relation
    this.relationLayersPopups.push({
      layerId: layerObject.id,
      popup: layerObject.popup
    });

    // Add events relation
    this.relationLayersEvents.push({
      layerId: layerObject.id,
      events: layerObject.events
    });
  };

  LayersManager.prototype.existLayerById = function (layerId) {
    return angular.isDefined(layerId) && layerId !== null && this.layersCreated.filter(function (e) { return e.layerId === layerId; }).length > 0;
  };

  LayersManager.prototype.removeLayerById = function (layerId) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }
    ]);

    if (this.existLayerById(layerId)) {
      if (this.mapInstance.getLayer(layerId)) {
        this.mapInstance.removeLayer(layerId);
      }

      this.layersCreated = this.layersCreated.filter(function (eachLayerCreated) {
        return eachLayerCreated.layerId !== layerId;
      });

      this.popupManager.removePopupByLayerId(layerId);
      this.removePopupRelationByLayerId(layerId);
      this.removeEventRelationByLayerId(layerId);
    } else {
      throw new Error('Invalid layer ID');
    }
  };

  LayersManager.prototype.updateLayerByObject = function (layerObject) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }, {
        name: 'Layer object',
        object: layerObject,
        attributes: ['id']
      }
    ]);

    // Before layer property
    if (angular.isDefined(layerObject.before) && layerObject.before !== null) {
      this.mapInstance.moveLayer(layerObject.id, layerObject.before);
    }

    // Filter property
    if (angular.isDefined(layerObject.filter) && layerObject.filter !== null && angular.isArray(layerObject.filter)) {
      this.mapInstance.setFilter(layerObject.id, layerObject.filter);
    }

    // Minzoom and maxzoom properties
    var currentLayer = this.mapInstance.getLayer(layerObject.id);
    this.mapInstance.setLayerZoomRange(layerObject.id, layerObject.minzoom || currentLayer.minzoom, layerObject.maxzoom || currentLayer.maxzoom);

    // Popup property
    if (angular.isDefined(layerObject.popup) && layerObject.popup !== null) {
      this.popupManager.removePopupByLayerId(layerObject.id);
      this.removePopupRelationByLayerId(layerObject.id);

      this.relationLayersPopups.push({
        layerId: layerObject.id,
        popup: layerObject.popup
      });
    }

    // Events property
    if (angular.isDefined(layerObject.events) && layerObject.events !== null) {
      this.removeEventRelationByLayerId(layerObject.id);

      this.relationLayersEvents.push({
        layerId: layerObject.id,
        events: layerObject.events
      });
    }

    // Paint properties
    if (angular.isDefined(layerObject.paint) && layerObject.paint !== null) {
      for (var eachPaintProperty in layerObject.paint) {
        if (layerObject.paint.hasOwnProperty(eachPaintProperty)) {
          var layerPaintProperty = this.mapInstance.getPaintProperty(layerObject.id, eachPaintProperty);

          if (layerPaintProperty !== layerObject.paint[eachPaintProperty]) {
            this.mapInstance.setPaintProperty(layerObject.id, eachPaintProperty, layerObject.paint[eachPaintProperty]);
          }
        }
      }
    }

    // Layout properties
    if (angular.isDefined(layerObject.layout) && layerObject.layout !== null) {
      for (var eachLayoutProperty in layerObject.layout) {
        if (layerObject.layout.hasOwnProperty(eachLayoutProperty)) {
          var layerLayoutProperty = this.mapInstance.getLayoutProperty(layerObject.id, eachLayoutProperty);

          if (layerLayoutProperty !== layerObject.layout[eachLayoutProperty]) {
            this.mapInstance.setLayoutProperty(layerObject.id, eachLayoutProperty, layerObject.layout[eachLayoutProperty]);
          }
        }
      }
    }
  };

  LayersManager.prototype.getCreatedLayers = function () {
    return this.layersCreated;
  };

  LayersManager.prototype.removeAllCreatedLayers = function () {
    var self = this;

    self.layersCreated.map(function (eachLayer) {
      self.removeLayerById(eachLayer.layerId);
    });

    // this.removeAllPopupRelations();
    // this.removeAllEventRelations();
    //
    // this.layersCreated = [];
  };

  return LayersManager;
}]);

angular.module('mapboxgl-directive').factory('mapboxglEventsUtils', ['$rootScope', function ($rootScope) {
  var eventsAvailables = [
    'resize',
    'webglcontextlost',
    'webglcontextrestored',
    'remove',
    'contextmenu',
    'styledata',
    'data',
    'error',
    'moveend',
    'move',
    'touchmove',
    'touchend',
    'movestart',
    'touchcancel',
    'load',
    'sourcedataloading',
    'dblclick',
    'click',
    'touchstart',
    'mousemove',
    'mouseup',
    'mousedown',
    'styledataloading',
    'dataloading',
    'mouseout',
    'render',
    'sourcedata',
    'zoom',
    'zoomend',
    'zoomstart',
    'boxzoomstart',
    'boxzoomend',
    'boxzoomcancel',
    'rotate',
    'rotatestart',
    'rotateend',
    'drag',
    'dragstart',
    'dragend',
    'pitch',
    'pitchstart',
    'pitchend'
  ];

  function exposeMapEvents (map) {
    eventsAvailables.map(function (eachEvent) {
      map.on(eachEvent, function (event) {
        $rootScope.$applyAsync($rootScope.$broadcast('mapboxglMap:' + eachEvent, event));
      });
    });
  }

  var mapboxglEventsUtils = {
    exposeMapEvents: exposeMapEvents
	};

	return mapboxglEventsUtils;
}]);

angular.module('mapboxgl-directive').factory('mapboxglImageUtils', ['Utils', 'mapboxglConstants', function (Utils, mapboxglConstants) {
	function createImageByObject (map, object) {
		Utils.checkObjects([
      {
        name: 'Map',
        object: map
      }, {
        name: 'Layer object',
        object: object,
        attributes: ['url', 'coordinates']
      }
    ]);

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

angular.module('mapboxgl-directive').factory('mapboxglMapsData', ['Utils', function (Utils) {
  var _mapInstances = [];

  function addMap (mapId, mapInstance) {
    _mapInstances.push({
      id: mapId,
      mapInstance: mapInstance
    });
  }

  function removeMapById (mapId) {
    _mapInstances = _mapInstances.filter(function (eachMap) {
      return eachMap.id !== mapId;
    });

    // var mapIndexOf = Utils.arrayObjectIndexOf(_mapInstances, mapId, 'id');
    //
    // if (mapIndexOf !== -1) {
    //   var mapObject = _mapInstances[mapIndexOf];
    //   mapObject.mapInstance.remove();
    //
    //   _mapInstances.splice(mapIndexOf, 1);
    // }
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
    var mapIndexOf = Utils.arrayObjectIndexOf(_mapInstances, mapId, 'id');

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

angular.module('mapboxgl-directive').factory('mapboxglVideoUtils', ['Utils', 'mapboxglConstants', function (Utils, mapboxglConstants) {
  function createVideoByObject (map, object) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: map
      }, {
        name: 'Layer object',
        object: object,
        attributes: ['urls', 'coordinates']
      }
    ]);

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

angular.module('mapboxgl-directive').factory('MarkersManager', ['Utils', 'mapboxglConstants', '$rootScope', '$compile', function (Utils, mapboxglConstants, $rootScope, $compile) {
  function MarkersManager (mapInstance, popupManger) {
    this.markersCreated = [];
    this.mapInstance = mapInstance;

    if (angular.isDefined(popupManger) && popupManger !== null) {
      this.popupManger = popupManger;
    }
  }

  MarkersManager.prototype.createMarkerByObject = function (object) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }, {
        name: 'Object',
        object: object,
        attributes: ['coordinates', 'element']
      }
    ]);

    var elementId = object.element.getAttribute('id');
    elementId = angular.isDefined(elementId) && elementId !== null ? elementId : Utils.generateGUID();

    object.element.setAttribute('id', elementId);

    var markerOptions = object.options || {};

    var marker = new mapboxgl.Marker(object.element, markerOptions).setLngLat(object.coordinates);

    if (angular.isDefined(object.popup) && angular.isDefined(object.popup.enabled) && object.popup.enabled) {
      var popup = this.popupManger.createPopupByObject({
        coordinates: object.popup.coordinates,
        options: object.popup.options,
        message: object.popup.message,
        getScope: object.popup.getScope,
        onClose: object.popup.onClose
      });

      marker.setPopup(popup);
    }

    marker.addTo(this.mapInstance);

    this.markersCreated.push({
      markerId: elementId,
      markerInstance: marker
    });
  };

  MarkersManager.prototype.removeAllMarkersCreated = function () {
    this.markersCreated.map(function (eachMarker) {
      eachMarker.markerInstance.remove();
    });

    this.markersCreated = [];
  };

  return MarkersManager;
}]);

angular.module('mapboxgl-directive').factory('PopupsManager', ['Utils', 'mapboxglConstants', '$rootScope', '$compile', function (Utils, mapboxglConstants, $rootScope, $compile) {
  /*
		/\$\{(.+?)\}/g --> Lorem ${ipsum} lorem ${ipsum} --> ['${ipsum}', '${ipsum}']
		/[^\$\{](.+)[^\}]/g --> ${ipsum} --> ipsum
	*/
	var _regexFindDollar = new RegExp(/\$\{(.+?)\}/g);
	var _regexGetValueBetweenDollarClaudator = new RegExp(/[^\$\{](.+)[^\}]/g);

  function PopupsManager (mapInstance) {
    this.popupsCreated = [];
    this.mapInstance = mapInstance;
  }

  PopupsManager.prototype.getAllPopupsCreated = function () {
    return this.popupsCreated;
  };

  PopupsManager.prototype.getPopupByLayerId = function (layerId) {
    if (angular.isDefined(layerId) && layerId !== null) {
			var popupsFiltered = this.popupsCreated.filter(function (each) {
				return each.layerId === layerId;
			});

			if (popupsFiltered.length > 0) {
				return popupsFiltered[0].popupInstance;
			} else {
				return false;
			}
		} else {
			if (this.popupsCreated.length > 0) {
				return this.popupsCreated.map(function (each) {
					return each.popupInstance;
				});
			} else {
				return false;
			}
		}
  };

  PopupsManager.prototype.removeAllPopupsCreated = function () {
    this.popupsCreated.map(function (eachPopup) {
			eachPopup.popupInstance.remove();
		});

		this.popupsCreated = [];
  };

  PopupsManager.prototype.removePopupByLayerId = function (layerId) {
    var popupsByLayer = this.popupsCreated.filter(function (eachPopup) {
			return eachPopup.layerId === layerId;
		});

		popupsByLayer.map(function (eachPopup) {
			eachPopup.popupInstance.remove();
		});

		this.popupsCreated = this.popupsCreated.filter(function (eachPopup) {
			return eachPopup.layerId !== layerId;
		});
  };

  PopupsManager.prototype.generatePopupMessage = function (object, feature) {
    var popupMessage = angular.copy(object.message);

    if (popupMessage instanceof HTMLElement) {
      return popupMessage;
    } else if (angular.isDefined(feature) && feature !== null) {
      if (_regexFindDollar.test(object.message)) {
				var allMatches = object.message.match(_regexFindDollar);

				if (allMatches.length > 0) {
					allMatches.forEach(function (eachMatch) {
						var tempMatch = eachMatch.match(_regexGetValueBetweenDollarClaudator);

						if (tempMatch.length > 0) {
							var regexValue = tempMatch[0];

							if (feature.properties.hasOwnProperty(regexValue)) {
								popupMessage = popupMessage.replace(eachMatch, feature.properties[regexValue]);
							} else {
								throw new Error('Property "' + regexValue + '" isn\'t exist in source "' + feature.layer.source + '"');
							}
						}
					});
				}
			}
    }

    var templateScope = angular.isDefined(object.getScope) && angular.isFunction(object.getScope) ? object.getScope() : $rootScope;

    try {
      var templateHtmlElement = $compile(popupMessage)(templateScope)[0];

      return templateHtmlElement;
    } catch (error) {
      return popupMessage;
    }
  };

  PopupsManager.prototype.createPopupByObject = function (object, feature) {
    var self = this;

    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }, {
        name: 'Object',
        object: object,
        attributes: ['message']
      }
    ]);

    var popup = new mapboxgl.Popup(object.options || {});

    if (angular.isDefined(object.coordinates) && object.coordinates !== null) {
      var popupCoordinates = object.coordinates;

      if (angular.isDefined(feature) && feature !== null) {
        popupCoordinates = popupCoordinates === 'center' ? feature.geometry.coordinates : popupCoordinates;
      }

      if (popupCoordinates !== 'center') {
        popup.setLngLat(popupCoordinates);
      }
    }

		if (angular.isDefined(object.onClose) && object.onClose !== null && angular.isFunction(object.onClose)) {
			popup.on('close', function (event) {
				object.onClose(event, event.target);
			});
		}

    var popupMessage = self.generatePopupMessage(object, feature);

    if (popupMessage instanceof HTMLElement) {
      popup.setDOMContent(popupMessage);
    } else {
      popup.setHTML(popupMessage);
    }

    var popupCreated = {
      popupInstance: popup,
			isOnClick: object.isOnClick ? object.isOnClick : false,
			isOnMouseover: object.isOnMouseover ? object.isOnMouseover : false
    };

    if (angular.isDefined(feature) && feature !== null) {
      popupCreated.layerId = feature.layer.id;
    }

		self.popupsCreated.push(popupCreated);

    return popup;
  };

  return PopupsManager;
}]);

angular.module('mapboxgl-directive').factory('SourcesManager', ['Utils', 'mapboxglConstants', '$q', '$rootScope', function (Utils, mapboxglConstants, $q, $rootScope) {
  function SourcesManager (mapInstance, animationManager) {
    this.sourcesCreated = [];
    this.mapInstance = mapInstance;

    if (angular.isDefined(animationManager) && animationManager !== null) {
      this.animationManager = animationManager;
    }
  }

  SourcesManager.prototype.recreateSources = function () {
    var self = this;

    self.sourcesCreated.map(function (eachSource) {
      self.createSourceByObject(eachSource.sourceObject);
    });
  };

  SourcesManager.prototype.checkAndCreateFeatureId = function (sourceData) {
    if (angular.isDefined(sourceData)) {
      if (!Utils.isUrl(sourceData)) {
        if (angular.isDefined(sourceData.features) && angular.isArray(sourceData.features)) {
          sourceData.features = sourceData.features.map(function (eachFeature) {
            if (angular.isUndefined(eachFeature.properties)) {
              eachFeature.properties = {};
            }

            if (angular.isUndefined(eachFeature.properties.featureId)) {
              eachFeature.properties.featureId = Utils.generateGUID();
            }

            return eachFeature;
          });
        } else {
          if (angular.isUndefined(sourceData.properties)) {
            sourceData.properties = {};
          }

          if (angular.isUndefined(sourceData.properties.featureId)) {
            sourceData.properties.featureId = Utils.generateGUID();
          }
        }
      }
    }
  };

  SourcesManager.prototype.createAnimationFunction = function (sourceId, featureId, feature) {
    var self = this;

    var animationFunction = function (animationParameters) {
      animationParameters.animationFunction(this.mapInstance, animationParameters.sourceId, animationParameters.featureId, animationParameters.feature, animationParameters.animationData, animationParameters.deltaTime, animationParameters.end);

      //animationParameters.animationFunction(animationParameters.map, animationParameters.sourceId, animationParameters.animationData, animationParameters.feature, animationParameters.timestamp, animationParameters.requestAnimationFrame);
    };

    self.animationManager.addAnimationFunction(sourceId, featureId, animationFunction, {
      map: this.mapInstance,
      sourceId: sourceId,
      featureId: featureId,
      feature: feature,
      animationData: feature.properties.animation.animationData,
      deltaTime: 0,
      animationFunction: feature.properties.animation.animationFunction,
      end: function () {
        self.animationManager.removeAnimationByFeatureId(featureId);
      }
    });
  };

  SourcesManager.prototype.createSourceByObject = function (sourceObject) {
    var self = this;

    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }, {
        name: 'Source object',
        object: sourceObject,
        attributes: ['id', 'type', 'data']
      }
    ]);

    var tempObject = {};

    for (var attribute in sourceObject) {
      if (attribute !== 'id') {
        tempObject[attribute] = sourceObject[attribute];
      }
    }

    self.checkAndCreateFeatureId(tempObject.data);

    this.mapInstance.addSource(sourceObject.id, tempObject);

    tempObject.id = sourceObject.id;

    self.sourcesCreated.push({
      sourceId: sourceObject.id,
      sourceObject: tempObject
    });

    // Check animations
    var sourceCreated = this.mapInstance.getSource(sourceObject.id);

    if (angular.isDefined(sourceCreated._data) && angular.isDefined(sourceCreated._data.features) && angular.isArray(sourceCreated._data.features)) {
      sourceCreated._data.features.map(function (eachFeature, index) {
        if (angular.isDefined(eachFeature.properties) && angular.isDefined(eachFeature.properties.animation) && angular.isDefined(eachFeature.properties.animation.enabled) && eachFeature.properties.animation.enabled && angular.isDefined(eachFeature.properties.animation.animationFunction) && angular.isFunction(eachFeature.properties.animation.animationFunction)) {
          self.createAnimationFunction(sourceObject.id, eachFeature.properties.featureId, eachFeature);
        }
      });
    } else if (angular.isDefined(sourceCreated._data) && angular.isDefined(sourceCreated._data.properties) && angular.isDefined(sourceCreated._data.properties.animation) && angular.isDefined(sourceCreated._data.properties.animation.enabled) && sourceCreated._data.properties.animation.enabled && angular.isDefined(sourceCreated._data.properties.animation.animationFunction) && angular.isFunction(sourceCreated._data.properties.animation.animationFunction)) {
      self.createAnimationFunction(sourceObject.id, sourceCreated._data.properties.featureId, sourceCreated._data);
    }
  };

  SourcesManager.prototype.existSourceById = function (sourceId) {
    var exist = false;

    if (angular.isDefined(sourceId) && sourceId !== null) {
      exist = this.sourcesCreated.filter(function (e) { return e.sourceId === sourceId; }).length > 0 ? true : false;
    }

    return exist;
  };

  SourcesManager.prototype.removeSourceById = function (sourceId) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }
    ]);

    if (this.existSourceById(sourceId)) {
      if (this.mapInstance.getSource(sourceId)) {
        this.mapInstance.removeSource(sourceId);
      }

      this.animationManager.removeAnimationBySourceId(sourceId);

      this.sourcesCreated = this.sourcesCreated.filter(function (eachSourceCreated) {
        return eachSourceCreated.sourceId !== sourceId;
      });
    } else {
      throw new Error('Invalid source ID');
    }
  };

  SourcesManager.prototype.updateSourceByObject = function (sourceObject) {
    var self = this;

    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }, {
        name: 'Source object',
        object: sourceObject,
        attributes: ['id', 'data']
      }
    ]);

    self.checkAndCreateFeatureId(sourceObject.data);

    var currentSource = this.mapInstance.getSource(sourceObject.id);

    Utils.checkObjects([
      {
        name: 'Source ' + sourceObject.id,
        object: currentSource
      }
    ]);

    var flagToUpdateSource = false;

    if (angular.isDefined(currentSource._data) && angular.isDefined(currentSource._data.features) && angular.isArray(currentSource._data.features) && currentSource._data.features.length > 0) {
      currentSource._data.features.map(function (eachFeature, index) {
        if (angular.isDefined(eachFeature.properties) && angular.isDefined(eachFeature.properties.animation) && angular.isDefined(eachFeature.properties.animation.enabled) && eachFeature.properties.animation.enabled && angular.isDefined(eachFeature.properties.animation.animationFunction) && angular.isFunction(eachFeature.properties.animation.animationFunction)) {
          if (self.animationManager.existAnimationByFeatureId(eachFeature.properties.featureId)) {
            self.animationManager.updateAnimationFunction(eachFeature.properties.featureId, eachFeature.properties.animation.animationFunction, eachFeature.properties.animation.animationData);
          } else {
            self.createAnimationFunction(sourceObject.id, eachFeature.properties.featureId, eachFeature);
          }
        } else {
          flagToUpdateSource = true;
        }
      });
    } else if (angular.isDefined(currentSource._data) && angular.isDefined(currentSource._data.properties) && angular.isDefined(currentSource._data.properties.animation) && angular.isDefined(currentSource._data.properties.animation.enabled) && currentSource._data.properties.animation.enabled && angular.isDefined(currentSource._data.properties.animation.animationFunction) && angular.isFunction(currentSource._data.properties.animation.animationFunction)) {
      if (self.animationManager.existAnimationByFeatureId(currentSource._data.properties.featureId)) {
        self.animationManager.updateAnimationFunction(currentSource._data.properties.featureId, currentSource._data.properties.animation.animationFunction, currentSource._data.properties.animation.animationData);
      } else {
        self.createAnimationFunction(sourceObject.id, currentSource._data.properties.featureId, currentSource._data);
      }
    } else {
      flagToUpdateSource = true;
    }

    if (flagToUpdateSource && angular.isDefined(sourceObject.data)) {
      currentSource.setData(sourceObject.data);
    }
  };

  SourcesManager.prototype.getCreatedSources = function () {
    return this.sourcesCreated;
  };

  SourcesManager.prototype.removeAllCreatedSources = function () {
    var self = this;

    self.sourcesCreated.map(function (eachSource) {
      self.removeSourceById(eachSource.sourceId);
    });

    // this.sourcesCreated = [];
  };

  return SourcesManager;
}]);

angular.module('mapboxgl-directive').factory('Utils', ['$window', '$q', function ($window, $q) {
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
					defer.resolve(false);
					// defer.reject(error);
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
		} else {
			defer.resolve(false);
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
				throw new Error('Utils.stringToNumber --> Invalid stringValue');
			}
		}
	}

	function checkObjects (objectsArray) {
		if (angular.isDefined(objectsArray) && angular.isArray(objectsArray)) {
			objectsArray.map(function (eachObject) {
				if (angular.isUndefined(eachObject.object) || eachObject.object === null) {
					throw new Error(eachObject.name + ' is undefined');
				}

				if (angular.isDefined(eachObject.attributes) && angular.isArray(eachObject.attributes)) {
					eachObject.attributes.map(function (eachAttribute) {
						if (angular.isUndefined(eachObject.object[eachAttribute] || eachObject.object[eachAttribute] === null)) {
							throw new Error(eachObject.name + ' ' + eachAttribute + ' is undefined');
						}
					});
				}
			});
		}
	}

	function generateGUID () {
		function generatePiece () {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}

		return generatePiece() + generatePiece() + '-' + generatePiece() + '-' + generatePiece() + '-' + generatePiece() + '-' + generatePiece() + generatePiece() + generatePiece();
	}

	function isUrl (urlString) {
		/*
			http://www.test.com
			or
			/assets/test.json
		*/

		return /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/.test(urlString) || /^[^\/]+\/[^\/].*$|^\/[^\/].*$/.test(urlString);
	}

	var Utils = {
		generateMapId: generateMapId,
		validateAndFormatCenter: validateAndFormatCenter,
		arrayObjectIndexOf: arrayObjectIndexOf,
		stringToBoolean: stringToBoolean,
		stringToNumber: stringToNumber,
		checkObjects: checkObjects,
		generateGUID: generateGUID,
		isUrl: isUrl
	};

	return Utils;
}]);

angular.module('mapboxgl-directive').constant('version', {
	full: '0.46.0',
	major: 0,
	minor: 46,
	patch: 0
});

angular.module('mapboxgl-directive').constant('mapboxglConstants', {
	map: {
		defaultHeight: '450px',
		defaultStyle: 'mapbox://styles/mapbox/streets-v9',
		defaultCenter: [0, 0],
		defaultZoom: 0,
		defaultHash: false,
		defaultBearingSnap: 7,
		defaultPitchWithRotate: true,
		defaultFailIfMajorPerformanceCaveat: false,
		defaultPreserveDrawingBuffer: false,
		defaultTrackResize: true,
		defaultRefreshExpiredTiles: true,
		defaultRenderWorldCopies: true,
		defaultMaxTileCacheSize: null,
		defaultLocalIdeographFontFamily: null,
		defaultCollectResourceTiming: false,
		defaultLogoPosition: 'bottom-left'
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

angular.module('mapboxgl-directive').constant('mapboxglControlsAvailables', [
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
	},/* {
		name: 'logo',
		constructor: mapboxgl.LogoControl,
		pluginName: 'mapboxgl.LogoControl'
	}, */{
		name: 'geolocate',
		constructor: mapboxgl.Geolocate || mapboxgl.GeolocateControl,
		pluginName: 'mapboxgl.' + (mapboxgl.Geolocate ? mapboxgl.Geolocate.name : mapboxgl.GeolocateControl.name),
		eventsExposedName: 'mapboxglGeolocate',
		eventsAvailables: [
			'geolocate',
			'error',
			'trackuserlocationstart',
			'trackuserlocationend'
		]
	}, {
		name: 'geocoder',
		constructor: mapboxgl.Geocoder || window.MapboxGeocoder,
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
		name: 'language',
		constructor: window.MapboxLanguage || undefined,
		pluginName: 'MapboxLanguage'
	}, {
		name: 'fullscreen',
		constructor: mapboxgl.FullscreenControl || undefined,
		pluginName: mapboxgl.FullscreenControl ? 'mapboxgl.' + mapboxgl.FullscreenControl.name : 'mapboxgl.FullscreenControl'
	}, {
		name: 'directions',
		constructor: mapboxgl.Directions || window.MapboxDirections,
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
		constructor: mapboxgl.Draw || window.MapboxDraw,
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
]);

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

angular.module('mapboxgl-directive').directive('glCenter', ['Utils', 'mapboxglConstants', function (Utils, mapboxglConstants) {
	function mapboxGlCenterDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glCenter', function (center, oldCenter) {
				Utils.validateAndFormatCenter(center).then(function (newCenter) {
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

angular.module('mapboxgl-directive').directive('glControls', ['$rootScope', 'Utils', 'mapboxglControlsAvailables', '$timeout', function ($rootScope, Utils, mapboxglControlsAvailables, $timeout) {
	function mapboxGlControlsDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    var _controlsCreated = {
      custom: []
    };

		var drawFeaturesAdded = false, drawControlAdded = false;

	  var addNewControlCreated = function (controlName, newControl, isCustomControl, controlEvents, isEventsListenedByMap) {
	    var mapListenEvents = angular.isDefined(isEventsListenedByMap) ? isEventsListenedByMap : false;
	    var events = angular.isDefined(controlEvents) && angular.isArray(controlEvents) ? controlEvents : [];

	    if (isCustomControl) {
	      _controlsCreated.custom.push({
	        name: controlName || 'customControl_' + Utils.generateGUID(),
	        control: newControl,
	        isEventsListenedByMap: mapListenEvents,
	        events: events
	      });
	    } else {
	      _controlsCreated[controlName] = {
	        control: newControl,
	        isEventsListenedByMap: mapListenEvents,
	        events: events
	      };
	    }
	  };

	  var removeEventsFromControl = function (control, events, isEventsListenedByMap, map) {
	    var listener = isEventsListenedByMap ? map : control;

	    events.map(function (eachEvent) {
	      listener.off(eachEvent);
	    });
	  };

	  var removeAllControlsCreated = function (map) {
	    if (angular.isDefined(map) && map !== null) {
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

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glControls', function (controls) {
        if (angular.isDefined(controls)) {
					// Remove all created controls
					removeAllControlsCreated(map);

					mapboxglControlsAvailables.map(function (eachControlAvailable) {
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

								if (eachControlAvailable.name === 'draw' && controls[eachControlAvailable.name].features && Array.isArray(controls[eachControlAvailable.name].features) && controls[eachControlAvailable.name].features.length > 0) {
									var featureIds = [];

									controls[eachControlAvailable.name].features.map(function (eachFeature) {
										var thisFeatureId = control.add(eachFeature);
										featureIds = featureIds.concat(thisFeatureId);
									});

									control.changeMode(control.modes.SIMPLE_SELECT, {
										featureIds: featureIds
									});

									$timeout(function () {
										control.changeMode(control.modes.SIMPLE_SELECT);
									}, 400, true);
								}
							} else {
								console.warn(eachControlAvailable.pluginName + ' plugin is not included.');
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
							console.error('\'custom\' must be an array');
						}
          }

					$rootScope.$broadcast('mapboxglMap:controlsRendered', _controlsCreated);
        }
			});
		});

		scope.$on('$destroy', function () {
			removeAllControlsCreated();
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
        if (angular.isDefined(isInteractive) && isInteractive !== null && typeof(isInteractive) === 'boolean') {
          var functionToExecute = isInteractive ? 'enable' : 'disable';

          actionsAvailables.map(function (eachAction) {
            map[eachAction][functionToExecute]();
          });

          var cursorToShow = isInteractive ? 'auto' : 'default';

          map.on('mousemove', function (event) {
            map.getCanvas().style.cursor = cursorToShow;
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

angular.module('mapboxgl-directive').directive('glLayers', ['interactiveLayers', 'LayersManager', '$timeout', '$q', function (interactiveLayers, LayersManager, $timeout, $q) {
  function mapboxGlLayersDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();
    var popupsManager = controller.getPopupManager();

    function disableLayerEvents (map) {
      popupsManager.removeAllPopupsCreated(map);

      map.off('click');
      map.off('mousemove');
    }

    function enableLayerEvents (map) {
      map.on('click', function (event) {
        event.originalEvent.preventDefault();
        event.originalEvent.stopPropagation();

        var layersCreated = scope.layersManager.getCreatedLayers().map(function (e) { return e.layerId; });
        var allLayers = interactiveLayers.layers.concat(layersCreated).filter(function (item, index, array) { return array.indexOf(item) === index; });

        var features = map.queryRenderedFeatures(event.point, { layers: allLayers });

        if (features.length > 0) {
          var feature = features[0];

          // Check popup
          var popupObject = scope.layersManager.getPopupRelationByLayerId(feature.layer.id);

          if (angular.isDefined(popupObject) && popupObject !== null && angular.isDefined(popupObject.onClick)) {
            var popup = popupsManager.createPopupByObject({
              coordinates: popupObject.onClick.coordinates || event.lngLat,
              options: popupObject.onClick.options,
              message: popupObject.onClick.message,
              getScope: popupObject.onClick.getScope,
              onClose: popupObject.onClick.onClose
            }, feature);

            popup.addTo(map);
          }

          // Check events
          var layerEvents = scope.layersManager.getEventRelationByLayerId(feature.layer.id);

          if (angular.isDefined(layerEvents) && layerEvents !== null && angular.isDefined(layerEvents.onClick) && angular.isFunction(layerEvents.onClick)) {
            layerEvents.onClick(map, feature, features);
          }
        }
      });

      map.on('mousemove', function (event) {
        var allLayers = scope.layersManager.getCreatedLayers().map(function (e) { return e.layerId; });

        var features = map.queryRenderedFeatures(event.point, { layers: allLayers });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

        if (features.length > 0) {
          var feature = features[0];

          // GAL - It needs clarification
          // Check popup
          // var popupByLayer = popupsManager.getPopupByLayerId(feature.layer.id);
          //
          // if (popupByLayer) {
          //   if (!popupByLayer.isOpen()) {
          //     popupByLayer.addTo(map);
          //   }
          //
          //   popupByLayer.setLngLat(event.lngLat);
          // } else {
          //   var popupObject = scope.layersManager.getPopupRelationByLayerId(feature.layer.id);
          //
          //   if (angular.isDefined(popupObject) && popupObject !== null && angular.isDefined(popupObject.onMouseover)) {
          //     popupsManager.createPopupByObject({
          //       coordinates: popupObject.onMouseover.coordinates || event.lngLat,
          //       options: popupObject.onMouseover.options,
          //       message: popupObject.onMouseover.message,
          //       getScope: popupObject.onMouseover.getScope,
          //       onClose: popupObject.onMouseover.onClose
          //     }, {
          //       coordinates: feature.geometry.coordinates,
          //       properties: feature.properties,
          //       source: 'source \'' + feature.layer.source + '\''
          //     });
          //   }
          // }

          // Check events
          var layerEvents = scope.layersManager.getEventRelationByLayerId(feature.layer.id);

          if (angular.isDefined(layerEvents) && layerEvents !== null && angular.isDefined(layerEvents.onMouseover) && angular.isFunction(layerEvents.onMouseover)) {
            layerEvents.onMouseover(map, feature, features);
          }
        }
      });
    }

    function createOrUpdateLayer (map, layerObject) {
      if (scope.layersManager.existLayerById(layerObject.id)) {
        scope.layersManager.updateLayerByObject(layerObject);
      } else {
        scope.layersManager.createLayerByObject(layerObject);
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

    function checkLayersToBeRemoved (layers) {
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

      var layersToBeRemoved = scope.layersManager.getCreatedLayers();

      layersIds.map(function (eachLayerId) {
        layersToBeRemoved = layersToBeRemoved.filter(function (eachLayerToBeRemoved) {
          return eachLayerToBeRemoved.layerId !== eachLayerId;
        });
      });

      layersToBeRemoved.map(function (eachLayerToBeRemoved) {
        scope.layersManager.removeLayerById(eachLayerToBeRemoved.layerId);
      });

      defer.resolve();

      return defer.promise;
    }

    function layersWatched (map, layerObjects) {
      if (angular.isDefined(layerObjects) && layerObjects !== null) {
        disableLayerEvents(map);

        checkLayersToBeRemoved(layerObjects).then(function () {
          if (Object.prototype.toString.call(layerObjects) === Object.prototype.toString.call([])) {
            layerObjects.map(function (eachLayer) {
              createOrUpdateLayer(map, eachLayer);
            });
          } else if (Object.prototype.toString.call(layerObjects) === Object.prototype.toString.call({})) {
            createOrUpdateLayer(map, layerObjects);
          } else {
            throw new Error('Invalid layers parameter');
          }

          enableLayerEvents(map);
        }).catch(function (error) {
          throw error;
        });
      }
    }

    controller.getMap().then(function (map) {
      scope.layersManager = new LayersManager(map, popupsManager);

      mapboxglScope.$watch('glLayers', function (layers) {
        layersWatched(map, layers);
      }, true);
    });

    scope.$on('mapboxglMap:styleChanged', function () {
      if (controller.isPersistent()) {
        scope.layersManager.recreateLayers();
      } else {
        scope.layersManager.removeAllCreatedLayers();
      }
    });

    scope.$on('$destroy', function () {
      if (angular.isDefined(scope.layersManager)) {
        scope.layersManager.removeAllCreatedLayers();
      }
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

angular.module('mapboxgl-directive').directive('glMarkers', ['MarkersManager', function (MarkersManager) {
  function mapboxGlMarkersDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();
    var popupsManager = controller.getPopupManager();

    var markersWatched = function (markers) {
      if (angular.isDefined(markers)) {
        scope.markerManager.removeAllMarkersCreated();

        if (Object.prototype.toString.call(markers) === Object.prototype.toString.call({})) {
          scope.markerManager.createMarkerByObject(markers);
        } else if (Object.prototype.toString.call(markers) === Object.prototype.toString.call([])) {
          markers.map(function (eachMarker) {
            scope.markerManager.createMarkerByObject(eachMarker);
          });
        } else {
          throw new Error('Invalid marker parameter');
        }
      }
    };

    controller.getMap().then(function (map) {
      scope.markerManager = new MarkersManager(map, popupsManager);

      mapboxglScope.$watchCollection('glMarkers', function (markers) {
        markersWatched(markers);
      });
    });

    scope.$on('$destroy', function () {
      if (angular.isDefined(scope.markerManager)) {
        // ToDo: remove all markers
        scope.markerManager.removeAllMarkersCreated();
      }
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
				if (angular.isNumber(maxZoom) && (maxZoom >= 0 || maxZoom <= 22)) {
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

angular.module('mapboxgl-directive').directive('glPopups', [function () {
  function mapboxGlPopupDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();
    var popupsManager = controller.getPopupManager();

    var popupsWatched = function (map, popups) {
      if (angular.isDefined(popups)) {
        popupsManager.removeAllPopupsCreated();

        if (Object.prototype.toString.call(popups) === Object.prototype.toString.call({})) {
          var popup = popupsManager.createPopupByObject(popups);
          popup.addTo(map);
        } else if (Object.prototype.toString.call(popups) === Object.prototype.toString.call([])) {
          popups.map(function (eachPopup) {
            var popupEach = popupsManager.createPopupByObject(eachPopup);
            popupEach.addTo(map);
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

    scope.$on('$destroy', function () {
      popupsManager.removeAllPopupsCreated();
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

angular.module('mapboxgl-directive').directive('glSources', ['SourcesManager', '$timeout', '$q', function (SourcesManager, $timeout, $q) {
  function mapboxGlSourcesDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    function createOrUpdateSource (sourceObject) {
      if (scope.sourceManager.existSourceById(sourceObject.id)) {
        scope.sourceManager.updateSourceByObject(sourceObject);
      } else {
        scope.sourceManager.createSourceByObject(sourceObject);
      }
    }

    function checkSourcesToBeRemoved (sources) {
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

      var sourcesToBeRemoved = scope.sourceManager.getCreatedSources();

      sourcesIds.map(function (eachSourceId) {
        sourcesToBeRemoved = sourcesToBeRemoved.filter(function (eachSourceToBeRemoved) {
          return eachSourceToBeRemoved.sourceId !== eachSourceId;
        });
      });

      sourcesToBeRemoved.map(function (eachSourceToBeRemoved) {
        scope.sourceManager.removeSourceById(eachSourceToBeRemoved.sourceId);
      });

      defer.resolve();

      return defer.promise;
    }

    function sourcesWatched (sourceObjects) {
      if (angular.isDefined(sourceObjects)) {
        checkSourcesToBeRemoved(sourceObjects).then(function () {
          if (Object.prototype.toString.call(sourceObjects) === Object.prototype.toString.call([])) {
            sourceObjects.map(function (eachSource) {
              createOrUpdateSource(eachSource);
            });
          } else if (Object.prototype.toString.call(sourceObjects) === Object.prototype.toString.call({})) {
            createOrUpdateSource(sourceObjects);
          } else {
            throw new Error('Invalid sources parameter');
          }
        }).catch(function (error) {
          throw error;
        });
      }
    }

    controller.getMap().then(function (map) {
      scope.sourceManager = new SourcesManager(map, controller.getAnimationManager());

      mapboxglScope.$watch('glSources', function (sources) {
        sourcesWatched(sources);
      }, true);
    });

    scope.$on('mapboxglMap:styleChanged', function () {
      if (controller.isPersistent()) {
        scope.sourceManager.recreateSources();
      } else {
        scope.sourceManager.removeAllCreatedSources();
      }
    });

    scope.$on('$destroy', function () {
      if (angular.isDefined(scope.sourceManager)) {
        scope.sourceManager.removeAllCreatedSources();
      }
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

    scope.$on('mapboxglMap:styleChanged', function () {
			
    });

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

angular.module('mapboxgl-directive').provider('interactiveLayers', [function () {
  var interactiveLayers = [];

  return {
    setLayers: function (newInteractiveLayers) {
      interactiveLayers = newInteractiveLayers;
    },

    addLayer: function (newInterativeLayer) {
      interactiveLayers.push(newInterativeLayer);
    },

    $get: function () {
      return {
        layers: interactiveLayers
      };
    }
  };
}]);

}(angular, mapboxgl));
},{}]},{},[1]);
