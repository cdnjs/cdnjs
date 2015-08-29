/*!
*  angular-leaflet-directive 0.7.15 2015-04-21
*  angular-leaflet-directive - An AngularJS directive to easily interact with Leaflet maps
*  git: https://github.com/tombatossals/angular-leaflet-directive
*/
(function(angular){
'use strict';
angular.module("leaflet-directive", []).directive('leaflet',
    function ($q, leafletData, leafletMapDefaults, leafletHelpers, leafletEvents) {
    var _leafletMap;
    return {
        restrict: "EA",
        replace: true,
        scope: {
            center         : '=',
            defaults       : '=',
            maxbounds      : '=',
            bounds         : '=',
            markers        : '=',
            legend         : '=',
            geojson        : '=',
            paths          : '=',
            tiles          : '=',
            layers         : '=',
            controls       : '=',
            decorations    : '=',
            eventBroadcast : '=',
            markersWatchOptions : '=',
            geojsonWatchOptions : '='
        },
        transclude: true,
        template: '<div class="angular-leaflet-map"><div ng-transclude></div></div>',
        controller: function ($scope) {
            _leafletMap = $q.defer();
            this.getMap = function () {
                return _leafletMap.promise;
            };

            this.getLeafletScope = function() {
                return $scope;
            };
        },

        link: function(scope, element, attrs) {
            var isDefined = leafletHelpers.isDefined,
                defaults = leafletMapDefaults.setDefaults(scope.defaults, attrs.id),
                genDispatchMapEvent = leafletEvents.genDispatchMapEvent,
                mapEvents = leafletEvents.getAvailableMapEvents();

            leafletData.setDirectiveControls({}, attrs.id);

            // Set width and height utility functions
            function updateWidth() {
                if (isNaN(attrs.width)) {
                    element.css('width', attrs.width);
                } else {
                    element.css('width', attrs.width + 'px');
                }
            }

            function updateHeight() {
                if (isNaN(attrs.height)) {
                    element.css('height', attrs.height);
                } else {
                    element.css('height', attrs.height + 'px');
                }
            }

            // If the width attribute defined update css
            // Then watch if bound property changes and update css
            if (isDefined(attrs.width)) {
                updateWidth();

                scope.$watch(
                    function () {
                        return element[0].getAttribute('width');
                    },
                    function () {
                        updateWidth();
                        map.invalidateSize();
                    });
            }

            // If the height attribute defined update css
            // Then watch if bound property changes and update css
            if (isDefined(attrs.height)) {
                updateHeight();

                scope.$watch(
                    function () {
                        return element[0].getAttribute('height');
                    },
                    function () {
                        updateHeight();
                        map.invalidateSize();
                    });
            }

            // Create the Leaflet Map Object with the options
            var map = new L.Map(element[0], leafletMapDefaults.getMapCreationDefaults(attrs.id));
            _leafletMap.resolve(map);

            if (!isDefined(attrs.center)) {
                map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
            }

            // If no layers nor tiles defined, set the default tileLayer
            if (!isDefined(attrs.tiles) && (!isDefined(attrs.layers))) {
                var tileLayerObj = L.tileLayer(defaults.tileLayer, defaults.tileLayerOptions);
                tileLayerObj.addTo(map);
                leafletData.setTiles(tileLayerObj, attrs.id);
            }

            // Set zoom control configuration
            if (isDefined(map.zoomControl) &&
                isDefined(defaults.zoomControlPosition)) {
                map.zoomControl.setPosition(defaults.zoomControlPosition);
            }

            if (isDefined(map.zoomControl) &&
                defaults.zoomControl===false) {
                map.zoomControl.removeFrom(map);
            }

            if (isDefined(map.zoomsliderControl) &&
                isDefined(defaults.zoomsliderControl) &&
                defaults.zoomsliderControl===false) {
                map.zoomsliderControl.removeFrom(map);
            }


            // if no event-broadcast attribute, all events are broadcasted
            if (!isDefined(attrs.eventBroadcast)) {
                var logic = "broadcast";
                for (var i = 0; i < mapEvents.length; i++) {
                    var eventName = mapEvents[i];
                    map.on(eventName, genDispatchMapEvent(scope, eventName, logic), {
                        eventName: eventName
                    });
                }
            }

            // Resolve the map object to the promises
            map.whenReady(function() {
                leafletData.setMap(map, attrs.id);
            });

            scope.$on('$destroy', function () {
                map.remove();
                leafletData.unresolveMap(attrs.id);
            });

            //Handle request to invalidate the map size
            //Up scope using $scope.$emit('invalidateSize')
            //Down scope using $scope.$broadcast('invalidateSize')
            scope.$on('invalidateSize', function() {
                map.invalidateSize();
            });
        }
    };
});

angular.module("leaflet-directive").factory('leafletBoundsHelpers', function ($log, leafletHelpers) {

    var isArray = leafletHelpers.isArray,
        isNumber = leafletHelpers.isNumber;

    function _isValidBounds(bounds) {
        return angular.isDefined(bounds) && angular.isDefined(bounds.southWest) &&
               angular.isDefined(bounds.northEast) && angular.isNumber(bounds.southWest.lat) &&
               angular.isNumber(bounds.southWest.lng) && angular.isNumber(bounds.northEast.lat) &&
               angular.isNumber(bounds.northEast.lng);
    }

    return {
        createLeafletBounds: function(bounds) {
            if (_isValidBounds(bounds)) {
                return L.latLngBounds([bounds.southWest.lat, bounds.southWest.lng],
                                      [bounds.northEast.lat, bounds.northEast.lng ]);
            }
        },

        isValidBounds: _isValidBounds,

        createBoundsFromArray: function(boundsArray) {
            if (!(isArray(boundsArray) && boundsArray.length === 2 &&
                  isArray(boundsArray[0]) && isArray(boundsArray[1]) &&
                  boundsArray[0].length === 2 && boundsArray[1].length === 2 &&
                  isNumber(boundsArray[0][0]) && isNumber(boundsArray[0][1]) &&
                  isNumber(boundsArray[1][0]) && isNumber(boundsArray[1][1]))) {
                $log.error("[AngularJS - Leaflet] The bounds array is not valid.");
                return;
            }

            return {
                northEast: {
                    lat: boundsArray[0][0],
                    lng: boundsArray[0][1]
                },
                southWest: {
                    lat: boundsArray[1][0],
                    lng: boundsArray[1][1]
                }
            };

        }
    };
});

angular.module("leaflet-directive").factory('leafletControlHelpers', function ($rootScope, $log, leafletHelpers, leafletMapDefaults) {
    var isDefined = leafletHelpers.isDefined;
    var isObject = leafletHelpers.isObject;
    var _controls = {};

    var _controlLayersMustBeVisible = function(baselayers, overlays, mapId) {
        var defaults = leafletMapDefaults.getDefaults(mapId);
        if(!defaults.controls.layers.visible) {
            return false;
        }

        var atLeastOneControlItemMustBeShown = false;

        if (isObject(baselayers)) {
            Object.keys(baselayers).forEach(function(key) {
                var layer = baselayers[key];
                if (!isDefined(layer.layerOptions) || layer.layerOptions.showOnSelector !== false) {
                    atLeastOneControlItemMustBeShown = true;
                }
            });
        }

        if (isObject(overlays)) {
            Object.keys(overlays).forEach(function(key) {
                var layer = overlays[key];
                if (!isDefined(layer.layerParams) || layer.layerParams.showOnSelector !== false) {
                    atLeastOneControlItemMustBeShown = true;
                }
            });
        }

        return atLeastOneControlItemMustBeShown;
    };

    var _createLayersControl = function(mapId) {
        var defaults = leafletMapDefaults.getDefaults(mapId);
        var controlOptions = {
            collapsed: defaults.controls.layers.collapsed,
            position: defaults.controls.layers.position,
            autoZIndex: false
        };

        angular.extend(controlOptions, defaults.controls.layers.options);

        var control;
        if(defaults.controls.layers && isDefined(defaults.controls.layers.control)) {
			control = defaults.controls.layers.control.apply(this, [[], [], controlOptions]);
		} else {
			control = new L.control.layers([], [], controlOptions);
		}

        return control;
    };

    return {
        layersControlMustBeVisible: _controlLayersMustBeVisible,

        updateLayersControl: function(map, mapId, loaded, baselayers, overlays, leafletLayers) {
            var i;
            var _layersControl = _controls[mapId];
            var mustBeLoaded = _controlLayersMustBeVisible(baselayers, overlays, mapId);

            if (isDefined(_layersControl) && loaded) {
                for (i in leafletLayers.baselayers) {
                    _layersControl.removeLayer(leafletLayers.baselayers[i]);
                }
                for (i in leafletLayers.overlays) {
                    _layersControl.removeLayer(leafletLayers.overlays[i]);
                }
                map.removeControl(_layersControl);
                delete _controls[mapId];
            }

            if (mustBeLoaded) {
                _layersControl = _createLayersControl(mapId);
                _controls[mapId] = _layersControl;
                for (i in baselayers) {
                    var hideOnSelector = isDefined(baselayers[i].layerOptions) &&
                                         baselayers[i].layerOptions.showOnSelector === false;
                    if (!hideOnSelector && isDefined(leafletLayers.baselayers[i])) {
                        _layersControl.addBaseLayer(leafletLayers.baselayers[i], baselayers[i].name);
                    }
                }
                for (i in overlays) {
                	var hideOverlayOnSelector = isDefined(overlays[i].layerParams) &&
                            overlays[i].layerParams.showOnSelector === false;
                    if (!hideOverlayOnSelector && isDefined(leafletLayers.overlays[i])) {
                        _layersControl.addOverlay(leafletLayers.overlays[i], overlays[i].name);
                    }
                }

                map.addControl(_layersControl);
            }
            return mustBeLoaded;
        }
    };
});

angular.module("leaflet-directive").service('leafletData', function ($log, $q, leafletHelpers) {
    var getDefer = leafletHelpers.getDefer,
        getUnresolvedDefer = leafletHelpers.getUnresolvedDefer,
        setResolvedDefer = leafletHelpers.setResolvedDefer;

    var _private = {};
    var self = this;

    var upperFirst = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    var _privateItems = [
        'map',
        'tiles',
        'layers',
        'paths',
        'markers',
        'geoJSON',
        'UTFGrid', //odd ball on naming convention keeping to not break
        'decorations',
        'directiveControls'];

    //init
    _privateItems.forEach(function(itemName){
        _private[itemName] = {};
    });

    this.unresolveMap = function (scopeId) {
        var id = leafletHelpers.obtainEffectiveMapId(_private.map, scopeId);
        _privateItems.forEach(function (itemName) {
            _private[itemName][id] = undefined;
        });
    };

    //int repetitive stuff (get and sets)
    _privateItems.forEach(function (itemName) {
        var name = upperFirst(itemName);
        self['set' + name] = function (lObject, scopeId) {
            var defer = getUnresolvedDefer(_private[itemName], scopeId);
            defer.resolve(lObject);
            setResolvedDefer(_private[itemName], scopeId);
        };

        self['get' + name] = function (scopeId) {
            var defer = getDefer(_private[itemName], scopeId);
            return defer.promise;
        };
    });
});

angular.module("leaflet-directive")
.service('leafletDirectiveControlsHelpers', function ($log, leafletData, leafletHelpers) {
    var _isDefined = leafletHelpers.isDefined,
        _isString = leafletHelpers.isString,
        _isObject = leafletHelpers.isObject,
        _mainErrorHeader = leafletHelpers.errorHeader;

    var _errorHeader = _mainErrorHeader + '[leafletDirectiveControlsHelpers';

    var _extend = function(id, thingToAddName, createFn, cleanFn){
        var _fnHeader = _errorHeader + '.extend] ';
        var extender = {};
        if(!_isDefined(thingToAddName)){
            $log.error(_fnHeader + 'thingToAddName cannot be undefined');
            return;
        }

        if(_isString(thingToAddName) && _isDefined(createFn) && _isDefined(cleanFn)){
            extender[thingToAddName] = {
                create: createFn,
                clean: cleanFn
            };
        }
        else if(_isObject(thingToAddName) && !_isDefined(createFn) && !_isDefined(cleanFn)){
            extender = thingToAddName;
        }
        else{
            $log.error(_fnHeader + 'incorrect arguments');
            return;
        }

        //add external control to create / destroy markers without a watch
        leafletData.getDirectiveControls().then(function(controls){
            angular.extend(controls, extender);
            leafletData.setDirectiveControls(controls, id);
        });
    };

    return {
        extend: _extend
    };
});

angular.module("leaflet-directive").factory('leafletEvents',
    function (leafletMapEvents, leafletMarkerEvents, leafletPathEvents) {
        var retObj = {};
        angular.extend(retObj,leafletMapEvents, leafletMarkerEvents, leafletPathEvents);
        return retObj;
});

angular.module("leaflet-directive")
.service('leafletGeoJsonHelpers', function (leafletHelpers, leafletIterators) {
    var lHlp = leafletHelpers,
    lIt = leafletIterators;
    var Point = function(lat,lng){
        this.lat = lat;
        this.lng = lng;
        return this;
    };

    var _getLat = function(value) {
        if (Array.isArray(value) && value.length === 2) {
            return value[1];
        } else if (lHlp.isDefined(value.type) && value.type === 'Point') {
            return +value.coordinates[1];
        } else {
            return +value.lat;
        }
    };

    var _getLng = function(value) {
        if (Array.isArray(value) && value.length === 2) {
            return value[0];
        } else if (lHlp.isDefined(value.type) && value.type === 'Point') {
            return +value.coordinates[0];
        } else {
            return +value.lng;
        }
    };

    var _validateCoords = function(coords) {
        if (lHlp.isUndefined(coords)) {
            return false;
        }
        if (lHlp.isArray(coords)) {
            if (coords.length === 2 && lHlp.isNumber(coords[0]) && lHlp.isNumber(coords[1])) {
                return true;
            }
        } else if (lHlp.isDefined(coords.type)) {
            if (
                coords.type === 'Point' && lHlp.isArray(coords.coordinates) &&
                coords.coordinates.length === 2  &&
                lHlp.isNumber(coords.coordinates[0]) &&
                lHlp.isNumber(coords.coordinates[1])) {
                    return true;
                }
            }

            var ret = lIt.all(['lat', 'lng'], function(pos){
                return lHlp.isDefined(coords[pos]) && lHlp.isNumber(coords[pos]);
            });
            return ret;
        };

        var _getCoords = function(value) {
            if (!value || !_validateCoords(value)) {
                return;
            }
            var p =  null;
            if (Array.isArray(value) && value.length === 2) {
                p = new Point(value[1], value[0]);
            } else if (lHlp.isDefined(value.type) && value.type === 'Point') {
                p = new Point(value.coordinates[1], value.coordinates[0]);
            } else {
                return value;
            }
            //note angular.merge is avail in angular 1.4.X we might want to fill it here
            return angular.extend(value, p);//tap on lat, lng if it doesnt exist
        };


        return {
            getLat: _getLat,
            getLng: _getLng,
            validateCoords: _validateCoords,
            getCoords: _getCoords
        };
    });

angular.module("leaflet-directive").factory('leafletHelpers', function ($q, $log) {
    var _errorHeader = '[AngularJS - Leaflet] ';
    var _copy = angular.copy;
    var _clone = _copy;
    /*
    For parsing paths to a field in an object

    Example:
    var obj = {
        bike:{
         1: 'hi'
         2: 'foo'
        }
    };
    _getObjectValue(obj,"bike.1") returns 'hi'
    this is getPath in ui-gmap
     */
    var _getObjectValue = function(object, pathStr) {
        var obj;
        if(!object || !angular.isObject(object))
            return;
        //if the key is not a sting then we already have the value
        if ((pathStr === null) || !angular.isString(pathStr)) {
            return pathStr;
        }
        obj = object;
        pathStr.split('.').forEach(function(value) {
            if (obj) {
                obj = obj[value];
            }
        });
        return obj;
    };

    /*
     Object Array Notation
     _getObjectArrayPath("bike.one.two")
     returns:
     'bike["one"]["two"]'
     */
    var _getObjectArrayPath = function(pathStr){
        return pathStr.split('.').reduce(function(previous, current) {
            return previous + '["'+ current + '"]';
        });
    };

    /* Object Dot Notation
     _getObjectPath(["bike","one","two"])
     returns:
     "bike.one.two"
     */
    var _getObjectDotPath = function(arrayOfStrings){
        return arrayOfStrings.reduce(function(previous, current) {
            return previous + '.' + current;
        });
    };

    function _obtainEffectiveMapId(d, mapId) {
        var id, i;
        if (!angular.isDefined(mapId)) {
        if (Object.keys(d).length === 0) {
            id = "main";
        } else if (Object.keys(d).length >= 1) {
            for (i in d) {
                if (d.hasOwnProperty(i)) {
                    id = i;
                }
            }
        } else if (Object.keys(d).length === 0) {
            id = "main";
        } else {
                $log.error(_errorHeader + "- You have more than 1 map on the DOM, you must provide the map ID to the leafletData.getXXX call");
            }
        } else {
            id = mapId;
        }

        return id;
    }

    function _getUnresolvedDefer(d, mapId) {
        var id = _obtainEffectiveMapId(d, mapId),
            defer;

        if (!angular.isDefined(d[id]) || d[id].resolvedDefer === true) {
            defer = $q.defer();
            d[id] = {
                defer: defer,
                resolvedDefer: false
            };
        } else {
            defer = d[id].defer;
        }

        return defer;
    }

    var _isDefined = function(value) {
        return angular.isDefined(value) && value !== null;
    };
    var _isUndefined = function(value){
        return !_isDefined(value);
    };

    return {
        copy:_copy,
        clone:_clone,
        errorHeader: _errorHeader,
        getObjectValue: _getObjectValue,
        getObjectArrayPath:_getObjectArrayPath,
        getObjectDotPath: _getObjectDotPath,
        defaultTo: function(val, _default){
            return _isDefined(val) ? val : _default;
        },
        //mainly for checking attributes of directives lets keep this minimal (on what we accept)
        isTruthy: function(val){
            return val === 'true' || val === true;
        },
        //Determine if a reference is {}
        isEmpty: function(value) {
            return Object.keys(value).length === 0;
        },

        //Determine if a reference is undefined or {}
        isUndefinedOrEmpty: function (value) {
            return (angular.isUndefined(value) || value === null) || Object.keys(value).length === 0;
        },

        // Determine if a reference is defined
        isDefined: _isDefined,
        isUndefined:_isUndefined,
        // Determine if a reference is a number
        isNumber: function(value) {
            return angular.isNumber(value);
        },

        // Determine if a reference is a string
        isString: function(value) {
            return angular.isString(value);
        },

        // Determine if a reference is an array
        isArray: function(value) {
            return angular.isArray(value);
        },

        // Determine if a reference is an object
        isObject: function(value) {
            return angular.isObject(value);
        },

        // Determine if a reference is a function.
        isFunction: function(value) {
            return angular.isFunction(value);
        },

        // Determine if two objects have the same properties
        equals: function(o1, o2) {
            return angular.equals(o1, o2);
        },

        isValidCenter: function(center) {
            return angular.isDefined(center) && angular.isNumber(center.lat) &&
                   angular.isNumber(center.lng) && angular.isNumber(center.zoom);
        },

        isValidPoint: function(point) {
            if (!angular.isDefined(point)) {
                return false;
            }
            if (angular.isArray(point)) {
                return point.length === 2 && angular.isNumber(point[0]) && angular.isNumber(point[1]);
            }
            return angular.isNumber(point.lat) && angular.isNumber(point.lng);
        },

        isSameCenterOnMap: function(centerModel, map) {
            var mapCenter = map.getCenter();
            var zoom = map.getZoom();
            if (centerModel.lat && centerModel.lng &&
                mapCenter.lat.toFixed(4) === centerModel.lat.toFixed(4) &&
                mapCenter.lng.toFixed(4) === centerModel.lng.toFixed(4) &&
                zoom === centerModel.zoom) {
                    return true;
            }
            return false;
        },

        safeApply: function($scope, fn) {
            var phase = $scope.$root.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                $scope.$eval(fn);
            } else {
                $scope.$evalAsync(fn);
            }
        },

        obtainEffectiveMapId: _obtainEffectiveMapId,

        getDefer: function(d, mapId) {
            var id = _obtainEffectiveMapId(d, mapId),
                defer;
            if (!angular.isDefined(d[id]) || d[id].resolvedDefer === false) {
                defer = _getUnresolvedDefer(d, mapId);
            } else {
                defer = d[id].defer;
            }
            return defer;
        },

        getUnresolvedDefer: _getUnresolvedDefer,

        setResolvedDefer: function(d, mapId) {
            var id = _obtainEffectiveMapId(d, mapId);
            d[id].resolvedDefer = true;
        },

        FullScreenControlPlugin: {
            isLoaded: function() {
                return angular.isDefined(L.Control.Fullscreen);
            }
        },

        AwesomeMarkersPlugin: {
            isLoaded: function() {
                return angular.isDefined(L.AwesomeMarkers) && angular.isDefined(L.AwesomeMarkers.Icon);
            },
            is: function(icon) {
                if (this.isLoaded()) {
                    return icon instanceof L.AwesomeMarkers.Icon;
                } else {
                    return false;
                }
            },
            equal: function (iconA, iconB) {
                if (!this.isLoaded()) {
                    return false;
                }
                if (this.is(iconA)) {
                    return angular.equals(iconA, iconB);
                } else {
                    return false;
                }
            }
        },

        PolylineDecoratorPlugin: {
            isLoaded: function() {
                if (angular.isDefined(L.PolylineDecorator)) {
                    return true;
                } else {
                    return false;
                }
            },
            is: function(decoration) {
                if (this.isLoaded()) {
                    return decoration instanceof L.PolylineDecorator;
                } else {
                    return false;
                }
            },
            equal: function(decorationA, decorationB) {
                if (!this.isLoaded()) {
                    return false;
                }
                if (this.is(decorationA)) {
                    return angular.equals(decorationA, decorationB);
                } else {
                    return false;
                }
            }
        },

        MakiMarkersPlugin: {
            isLoaded: function() {
                if (angular.isDefined(L.MakiMarkers) && angular.isDefined(L.MakiMarkers.Icon)) {
                    return true;
                } else {
                    return false;
                }
            },
            is: function(icon) {
                if (this.isLoaded()) {
                    return icon instanceof L.MakiMarkers.Icon;
                } else {
                    return false;
                }
            },
            equal: function (iconA, iconB) {
                if (!this.isLoaded()) {
                    return false;
                }
                if (this.is(iconA)) {
                    return angular.equals(iconA, iconB);
                } else {
                    return false;
                }
            }
        },
        ExtraMarkersPlugin: {
            isLoaded: function () {
                if (angular.isDefined(L.ExtraMarkers) && angular.isDefined(L.ExtraMarkers.Icon)) {
                    return true;
                } else {
                    return false;
                }
            },
            is: function (icon) {
                if (this.isLoaded()) {
                    return icon instanceof L.ExtraMarkers.Icon;
                } else {
                    return false;
                }
            },
            equal: function (iconA, iconB) {
                if (!this.isLoaded()) {
                    return false;
                }
                if (this.is(iconA)) {
                    return angular.equals(iconA, iconB);
                } else {
                    return false;
                }
            }
        },
        LabelPlugin: {
            isLoaded: function() {
                return angular.isDefined(L.Label);
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.MarkerClusterGroup;
                } else {
                    return false;
                }
            }
        },
        MarkerClusterPlugin: {
            isLoaded: function() {
                return angular.isDefined(L.MarkerClusterGroup);
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.MarkerClusterGroup;
                } else {
                    return false;
                }
            }
        },
        GoogleLayerPlugin: {
            isLoaded: function() {
                return angular.isDefined(L.Google);
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.Google;
                } else {
                    return false;
                }
            }
        },
        ChinaLayerPlugin: {
            isLoaded: function() {
                return angular.isDefined(L.tileLayer.chinaProvider);
            }
        },
        HeatLayerPlugin: {
            isLoaded: function() {
                return angular.isDefined(L.heatLayer);
            }
        },
        WebGLHeatMapLayerPlugin: {
            isLoaded: function() {
                return angular.isDefined(L.TileLayer.WebGLHeatMap);
            }
        },
        BingLayerPlugin: {
            isLoaded: function() {
                return angular.isDefined(L.BingLayer);
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.BingLayer;
                } else {
                    return false;
                }
            }
        },
        WFSLayerPlugin: {
            isLoaded: function() {
                return L.GeoJSON.WFS !== undefined;
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.GeoJSON.WFS;
                } else {
                    return false;
                }
            }
        },
        AGSLayerPlugin: {
            isLoaded: function() {
                return lvector !== undefined && lvector.AGS !== undefined;
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof lvector.AGS;
                } else {
                    return false;
                }
            }
        },
        YandexLayerPlugin: {
            isLoaded: function() {
                return angular.isDefined(L.Yandex);
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.Yandex;
                } else {
                    return false;
                }
            }
        },
        DynamicMapLayerPlugin: {
            isLoaded: function () {
                return L.esri !== undefined && L.esri.dynamicMapLayer !== undefined;
            },
            is: function (layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.esri.dynamicMapLayer;
                } else {
                    return false;
                }
            }
        },
        GeoJSONPlugin: {
            isLoaded: function(){
                return angular.isDefined(L.TileLayer.GeoJSON);
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.TileLayer.GeoJSON;
                } else {
                    return false;
                }
            }
        },
        UTFGridPlugin: {
            isLoaded: function(){
                return angular.isDefined(L.UtfGrid);
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.UtfGrid;
                } else {
                    $log.error('[AngularJS - Leaflet] No UtfGrid plugin found.');
                    return false;
                }
            }
        },
        CartoDB: {
            isLoaded: function(){
                return cartodb;
            },
            is: function(/*layer*/) {
                return true;
                /*
                if (this.isLoaded()) {
                    return layer instanceof L.TileLayer.GeoJSON;
                } else {
                    return false;
                }*/
            }
        },
        Leaflet: {
            DivIcon: {
                is: function(icon) {
                    return icon instanceof L.DivIcon;
                },
                equal: function(iconA, iconB) {
                    if (this.is(iconA)) {
                        return angular.equals(iconA, iconB);
                    } else {
                        return false;
                    }
                }
            },
            Icon: {
                is: function(icon) {
                    return icon instanceof L.Icon;
                },
                equal: function(iconA, iconB) {
                    if (this.is(iconA)) {
                        return angular.equals(iconA, iconB);
                    } else {
                        return false;
                    }
                }
            }
        },
        /*
         watchOptions - object to set deep nested watches and turn off watches all together
         (rely on control / functional updates)
         watchOptions - Object
             doWatch:boolean
             isDeep:boolean (sets $watch(function,isDeep))
             individual
                 doWatch:boolean
                 isDeep:boolean
         */
        //legacy defaults
        watchOptions: {
            doWatch:true,
            isDeep: true,
            individual:{
                doWatch:true,
                isDeep: true
            }
        }
    };
});

angular.module('leaflet-directive').service('leafletIterators', function ($log, leafletHelpers) {

  var lHlp = leafletHelpers,
  errorHeader = leafletHelpers.errorHeader + 'leafletIterators: ';

  //BEGIN COPY from underscore
  var _keys = Object.keys;
  var _isFunction = lHlp.isFunction;
  var _isObject = lHlp.isObject;

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  var _isArrayLike = function(collection) {
    var length = collection !== null && collection.length;
    return  lHlp.isNumber(length) && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Keep the identity function around for default iteratees.
  var _identity = function(value) {
    return value;
  };

  var _property = function(key) {
    return function(obj) {
      return obj === null ? void 0 : obj[key];
    };
  };

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount === null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj === null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  var _extendOwn, _assign = null;
  _extendOwn = _assign = createAssigner(_keys);

  // Returns whether an object has a given set of `key:value` pairs.
  var _isMatch = function(object, attrs) {
    var keys = _keys(attrs), length = keys.length;
    if (object === null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  var _matcher, _matches = null;
  _matcher = _matches = function(attrs) {
    attrs = _extendOwn({}, attrs);
    return function(obj) {
      return _isMatch(obj, attrs);
    };
  };


  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value === null) return _identity;
    if (_isFunction(value)) return optimizeCb(value, context, argCount);
    if (_isObject(value)) return _matcher(value);
    return _property(value);
  };

  var _every, _all = null;
  _every = _all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !_isArrayLike(obj) && _keys(obj),
    length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  //END COPY fron underscore

  var _hasErrors = function(collection, cb, ignoreCollection, cbName){
    if(!ignoreCollection) {
      if (!lHlp.isDefined(collection) || !lHlp.isDefined(cb)) {
        $log.error(errorHeader + 'collection or cb undefined');
        return true;
      }
    }
    if(!lHlp.isFunction(cb)){
      cbName = lHlp.defaultTo(cb,'cb');
      $log.error(errorHeader + cbName + ' is not a function');
      return true;
    }
    return false;
  };

  var _iterate = function(collection, externalCb, internalCb){
    if(_hasErrors(undefined, internalCb, true, 'internalCb')){
      return;
    }
    if(!_hasErrors(collection, externalCb)){
      for(var key in collection){
        internalCb(collection[key], key);
      }
    }
  };


  //consider adding lodash or underscore but for now adding iterators as we need them
  var _each = function(collection, cb){
    _iterate(collection, cb, function(val, key){
      cb(val, key);
    });
  };

  //lodash or underscore have preference
  return window._ ? window._ : {
    each:_each,
    every: _every,
    all: _all
  };
});

angular.module("leaflet-directive")
.factory('leafletLayerHelpers', function ($rootScope, $log, leafletHelpers) {
    var Helpers = leafletHelpers;
    var isString = leafletHelpers.isString;
    var isObject = leafletHelpers.isObject;
    var isArray = leafletHelpers.isArray;
    var isDefined = leafletHelpers.isDefined;

    var utfGridCreateLayer = function(params) {
        if (!Helpers.UTFGridPlugin.isLoaded()) {
            $log.error('[AngularJS - Leaflet] The UTFGrid plugin is not loaded.');
            return;
        }
        var utfgrid = new L.UtfGrid(params.url, params.pluginOptions);

        utfgrid.on('mouseover', function(e) {
            $rootScope.$broadcast('leafletDirectiveMap.utfgridMouseover', e);
        });

        utfgrid.on('mouseout', function(e) {
            $rootScope.$broadcast('leafletDirectiveMap.utfgridMouseout', e);
        });

        utfgrid.on('click', function(e) {
            $rootScope.$broadcast('leafletDirectiveMap.utfgridClick', e);
        });

        return utfgrid;
    };

    var layerTypes = {
        xyz: {
            mustHaveUrl: true,
            createLayer: function(params) {
                return L.tileLayer(params.url, params.options);
            }
        },
        mapbox: {
            mustHaveKey: true,
            createLayer: function(params) {
                var url = '//{s}.tiles.mapbox.com/v3/' + params.key + '/{z}/{x}/{y}.png';
                return L.tileLayer(url, params.options);
            }
        },
        geoJSON: {
            mustHaveUrl: true,
            createLayer: function(params) {
                if (!Helpers.GeoJSONPlugin.isLoaded()) {
                    return;
                }
                return new L.TileLayer.GeoJSON(params.url, params.pluginOptions, params.options);
            }
        },
        utfGrid: {
            mustHaveUrl: true,
            createLayer: utfGridCreateLayer
        },
        cartodbTiles: {
            mustHaveKey: true,
            createLayer: function(params) {
                var url = '//' + params.user + '.cartodb.com/api/v1/map/' + params.key + '/{z}/{x}/{y}.png';
                return L.tileLayer(url, params.options);
            }
        },
        cartodbUTFGrid: {
            mustHaveKey: true,
            mustHaveLayer : true,
            createLayer: function(params) {
                params.url = '//' + params.user + '.cartodb.com/api/v1/map/' + params.key + '/' + params.layer + '/{z}/{x}/{y}.grid.json';
                return utfGridCreateLayer(params);
            }
        },
        cartodbInteractive: {
            mustHaveKey: true,
            mustHaveLayer : true,
            createLayer: function(params) {
                var tilesURL = '//' + params.user + '.cartodb.com/api/v1/map/' + params.key + '/{z}/{x}/{y}.png';
                var tileLayer = L.tileLayer(tilesURL, params.options);
                params.url = '//' + params.user + '.cartodb.com/api/v1/map/' + params.key + '/' + params.layer + '/{z}/{x}/{y}.grid.json';
                var utfLayer = utfGridCreateLayer(params);
                return L.layerGroup([tileLayer, utfLayer]);
            }
        },
        wms: {
            mustHaveUrl: true,
            createLayer: function(params) {
                return L.tileLayer.wms(params.url, params.options);
            }
        },
        wmts: {
            mustHaveUrl: true,
            createLayer: function(params) {
                return L.tileLayer.wmts(params.url, params.options);
            }
        },
        wfs: {
            mustHaveUrl: true,
            mustHaveLayer : true,
            createLayer: function(params) {
                if (!Helpers.WFSLayerPlugin.isLoaded()) {
                    return;
                }
                var options = angular.copy(params.options);
                if(options.crs && 'string' === typeof options.crs) {
                    /*jshint -W061 */
                    options.crs = eval(options.crs);
                }
                return new L.GeoJSON.WFS(params.url, params.layer, options);
            }
        },
        group: {
            mustHaveUrl: false,
            createLayer: function (params) {
                var lyrs = [];
                angular.forEach(params.options.layers, function(l){
                  lyrs.push(createLayer(l));
                });
                return L.layerGroup(lyrs);
            }
        },
        featureGroup: {
            mustHaveUrl: false,
            createLayer: function () {
                return L.featureGroup();
            }
        },
        google: {
            mustHaveUrl: false,
            createLayer: function(params) {
                var type = params.type || 'SATELLITE';
                if (!Helpers.GoogleLayerPlugin.isLoaded()) {
                    return;
                }
                return new L.Google(type, params.options);
            }
        },
        china:{
            mustHaveUrl:false,
            createLayer:function(params){
                var type = params.type || '';
                if(!Helpers.ChinaLayerPlugin.isLoaded()){
                    return;
                }
                return L.tileLayer.chinaProvider(type, params.options);
            }
        },
        ags: {
            mustHaveUrl: true,
            createLayer: function(params) {
                if (!Helpers.AGSLayerPlugin.isLoaded()) {
                    return;
                }

                var options = angular.copy(params.options);
                angular.extend(options, {
                    url: params.url
                });
                var layer = new lvector.AGS(options);
                layer.onAdd = function(map) {
                    this.setMap(map);
                };
                layer.onRemove = function() {
                    this.setMap(null);
                };
                return layer;
            }
        },
        dynamic: {
            mustHaveUrl: true,
            createLayer: function(params) {
                if (!Helpers.DynamicMapLayerPlugin.isLoaded()) {
                    return;
                }
                return L.esri.dynamicMapLayer(params.url, params.options);
            }
        },
        markercluster: {
            mustHaveUrl: false,
            createLayer: function(params) {
                if (!Helpers.MarkerClusterPlugin.isLoaded()) {
                    $log.error('[AngularJS - Leaflet] The markercluster plugin is not loaded.');
                    return;
                }
                return new L.MarkerClusterGroup(params.options);
            }
        },
        bing: {
            mustHaveUrl: false,
            createLayer: function(params) {
                if (!Helpers.BingLayerPlugin.isLoaded()) {
                    return;
                }
                return new L.BingLayer(params.key, params.options);
            }
        },
        webGLHeatmap: {
            mustHaveUrl: false,
            mustHaveData: true,
            createLayer: function(params) {
                if (!Helpers.WebGLHeatMapLayerPlugin.isLoaded()) {
                    return;
                }
                var layer = new L.TileLayer.WebGLHeatMap(params.options);
                if (isDefined(params.data)) {
                    layer.setData(params.data);
                }

                return layer;
            }
        },
        heat: {
            mustHaveUrl: false,
            mustHaveData: true,
            createLayer: function(params) {
                if (!Helpers.HeatLayerPlugin.isLoaded()) {
                    return;
                }
                var layer = new L.heatLayer();

                if (isArray(params.data)) {
                    layer.setLatLngs(params.data);
                }

                if (isObject(params.options)) {
                    layer.setOptions(params.options);
                }

                return layer;
            }
        },
        yandex: {
            mustHaveUrl: false,
            createLayer: function(params) {
                var type = params.type || 'map';
                if (!Helpers.YandexLayerPlugin.isLoaded()) {
                    return;
                }
                return new L.Yandex(type, params.options);
            }
        },
        imageOverlay: {
            mustHaveUrl: true,
            mustHaveBounds : true,
            createLayer: function(params) {
                return L.imageOverlay(params.url, params.bounds, params.options);
            }
        },

        // This "custom" type is used to accept every layer that user want to define himself.
        // We can wrap these custom layers like heatmap or yandex, but it means a lot of work/code to wrap the world,
        // so we let user to define their own layer outside the directive,
        // and pass it on "createLayer" result for next processes
        custom: {
            createLayer: function (params) {
                if (params.layer instanceof L.Class) {
                    return angular.copy(params.layer);
                }
                else {
                    $log.error('[AngularJS - Leaflet] A custom layer must be a leaflet Class');
                }
            }
        },
        cartodb: {
            mustHaveUrl: true,
            createLayer: function(params) {
                return cartodb.createLayer(params.map, params.url);
            }
        }
    };

    function isValidLayerType(layerDefinition) {
        // Check if the baselayer has a valid type
        if (!isString(layerDefinition.type)) {
            $log.error('[AngularJS - Leaflet] A layer must have a valid type defined.');
            return false;
        }

        if (Object.keys(layerTypes).indexOf(layerDefinition.type) === -1) {
            $log.error('[AngularJS - Leaflet] A layer must have a valid type: ' + Object.keys(layerTypes));
            return false;
        }

        // Check if the layer must have an URL
        if (layerTypes[layerDefinition.type].mustHaveUrl && !isString(layerDefinition.url)) {
            $log.error('[AngularJS - Leaflet] A base layer must have an url');
            return false;
        }

        if (layerTypes[layerDefinition.type].mustHaveData && !isDefined(layerDefinition.data)) {
            $log.error('[AngularJS - Leaflet] The base layer must have a "data" array attribute');
            return false;
        }

        if(layerTypes[layerDefinition.type].mustHaveLayer && !isDefined(layerDefinition.layer)) {
            $log.error('[AngularJS - Leaflet] The type of layer ' + layerDefinition.type + ' must have an layer defined');
            return false;
        }

        if (layerTypes[layerDefinition.type].mustHaveBounds && !isDefined(layerDefinition.bounds)) {
            $log.error('[AngularJS - Leaflet] The type of layer ' + layerDefinition.type + ' must have bounds defined');
            return false ;
        }

        if (layerTypes[layerDefinition.type].mustHaveKey && !isDefined(layerDefinition.key)) {
            $log.error('[AngularJS - Leaflet] The type of layer ' + layerDefinition.type + ' must have key defined');
            return false ;
        }
        return true;
    }

    function createLayer(layerDefinition) {
        if (!isValidLayerType(layerDefinition)) {
            return;
        }

        if (!isString(layerDefinition.name)) {
            $log.error('[AngularJS - Leaflet] A base layer must have a name');
            return;
        }
        if (!isObject(layerDefinition.layerParams)) {
            layerDefinition.layerParams = {};
        }
        if (!isObject(layerDefinition.layerOptions)) {
            layerDefinition.layerOptions = {};
        }

        // Mix the layer specific parameters with the general Leaflet options. Although this is an overhead
        // the definition of a base layers is more 'clean' if the two types of parameters are differentiated
        for (var attrname in layerDefinition.layerParams) {
            layerDefinition.layerOptions[attrname] = layerDefinition.layerParams[attrname];
        }

        var params = {
            url: layerDefinition.url,
            data: layerDefinition.data,
            options: layerDefinition.layerOptions,
            layer: layerDefinition.layer,
            type: layerDefinition.layerType,
            bounds: layerDefinition.bounds,
            key: layerDefinition.key,
            pluginOptions: layerDefinition.pluginOptions,
            user: layerDefinition.user
        };

        //TODO Add $watch to the layer properties
        return layerTypes[layerDefinition.type].createLayer(params);
    }

    return {
        createLayer: createLayer
    };
});

angular.module("leaflet-directive").factory('leafletLegendHelpers', function () {
	var _updateLegend = function(div, legendData, type, url) {
		div.innerHTML = '';
		if(legendData.error) {
			div.innerHTML += '<div class="info-title alert alert-danger">' + legendData.error.message + '</div>';
		} else {
			if (type === 'arcgis') {
				for (var i = 0; i < legendData.layers.length; i++) {
					var layer = legendData.layers[i];
					div.innerHTML += '<div class="info-title" data-layerid="' + layer.layerId + '">' + layer.layerName + '</div>';
					for(var j = 0; j < layer.legend.length; j++) {
						var leg = layer.legend[j];
						div.innerHTML +=
							'<div class="inline" data-layerid="' + layer.layerId + '"><img src="data:' + leg.contentType + ';base64,' + leg.imageData + '" /></div>' +
							'<div class="info-label" data-layerid="' + layer.layerId + '">' + leg.label + '</div>';
					}
				}
			}
			else if (type === 'image') {
				div.innerHTML = '<img src="' + url + '"/>';
			}
		}
	};

	var _getOnAddLegend = function(legendData, legendClass, type, url) {
		return function(/*map*/) {
			var div = L.DomUtil.create('div', legendClass);

			if (!L.Browser.touch) {
				L.DomEvent.disableClickPropagation(div);
				L.DomEvent.on(div, 'mousewheel', L.DomEvent.stopPropagation);
			} else {
				L.DomEvent.on(div, 'click', L.DomEvent.stopPropagation);
			}
			_updateLegend(div, legendData, type, url);
			return div;
		};
	};

	var _getOnAddArrayLegend = function(legend, legendClass) {
		return function(/*map*/) {
			var div = L.DomUtil.create('div', legendClass);
            for (var i = 0; i < legend.colors.length; i++) {
                div.innerHTML +=
                    '<div class="outline"><i style="background:' + legend.colors[i] + '"></i></div>' +
                    '<div class="info-label">' + legend.labels[i] + '</div>';
            }
            if (!L.Browser.touch) {
				L.DomEvent.disableClickPropagation(div);
				L.DomEvent.on(div, 'mousewheel', L.DomEvent.stopPropagation);
			} else {
				L.DomEvent.on(div, 'click', L.DomEvent.stopPropagation);
			}
            return div;
		};
	};

	return {
		getOnAddLegend: _getOnAddLegend,
		getOnAddArrayLegend: _getOnAddArrayLegend,
		updateLegend: _updateLegend,
	};
});

angular.module("leaflet-directive").factory('leafletMapDefaults', function ($q, leafletHelpers) {
    function _getDefaults() {
        return {
            keyboard: true,
            dragging: true,
            worldCopyJump: false,
            doubleClickZoom: true,
            scrollWheelZoom: true,
            tap: true,
            touchZoom: true,
            zoomControl: true,
            zoomsliderControl: false,
            zoomControlPosition: 'topleft',
            attributionControl: true,
            controls: {
                layers: {
                    visible: true,
                    position: 'topright',
                    collapsed: true
                }
            },
            crs: L.CRS.EPSG3857,
            tileLayer: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            tileLayerOptions: {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            },
            path: {
                weight: 10,
                opacity: 1,
                color: '#0000ff'
            },
            center: {
                lat: 0,
                lng: 0,
                zoom: 1
            }
        };
    }

    var isDefined = leafletHelpers.isDefined,
        isObject = leafletHelpers.isObject,
        obtainEffectiveMapId = leafletHelpers.obtainEffectiveMapId,
        defaults = {};

    // Get the _defaults dictionary, and override the properties defined by the user
    return {
        getDefaults: function (scopeId) {
            var mapId = obtainEffectiveMapId(defaults, scopeId);
            return defaults[mapId];
        },

        getMapCreationDefaults: function (scopeId) {
            var mapId = obtainEffectiveMapId(defaults, scopeId);
            var d = defaults[mapId];

            var mapDefaults = {
                maxZoom: d.maxZoom,
                keyboard: d.keyboard,
                dragging: d.dragging,
                zoomControl: d.zoomControl,
                doubleClickZoom: d.doubleClickZoom,
                scrollWheelZoom: d.scrollWheelZoom,
                tap: d.tap,
                touchZoom: d.touchZoom,
                attributionControl: d.attributionControl,
                worldCopyJump: d.worldCopyJump,
                crs: d.crs
            };

            if (isDefined(d.minZoom)) {
                mapDefaults.minZoom = d.minZoom;
            }

            if (isDefined(d.zoomAnimation)) {
                mapDefaults.zoomAnimation = d.zoomAnimation;
            }

            if (isDefined(d.fadeAnimation)) {
                mapDefaults.fadeAnimation = d.fadeAnimation;
            }

            if (isDefined(d.markerZoomAnimation)) {
                mapDefaults.markerZoomAnimation = d.markerZoomAnimation;
            }

            if (d.map) {
                for (var option in d.map) {
                    mapDefaults[option] = d.map[option];
                }
            }

            return mapDefaults;
        },

        setDefaults: function (userDefaults, scopeId) {
            var newDefaults = _getDefaults();

            if (isDefined(userDefaults)) {
                newDefaults.doubleClickZoom = isDefined(userDefaults.doubleClickZoom) ? userDefaults.doubleClickZoom : newDefaults.doubleClickZoom;
                newDefaults.scrollWheelZoom = isDefined(userDefaults.scrollWheelZoom) ? userDefaults.scrollWheelZoom : newDefaults.doubleClickZoom;
                newDefaults.tap = isDefined(userDefaults.tap) ? userDefaults.tap : newDefaults.tap;
                newDefaults.touchZoom = isDefined(userDefaults.touchZoom) ? userDefaults.touchZoom : newDefaults.doubleClickZoom;
                newDefaults.zoomControl = isDefined(userDefaults.zoomControl) ? userDefaults.zoomControl : newDefaults.zoomControl;
                newDefaults.zoomsliderControl = isDefined(userDefaults.zoomsliderControl) ? userDefaults.zoomsliderControl : newDefaults.zoomsliderControl;
                newDefaults.attributionControl = isDefined(userDefaults.attributionControl) ? userDefaults.attributionControl : newDefaults.attributionControl;
                newDefaults.tileLayer = isDefined(userDefaults.tileLayer) ? userDefaults.tileLayer : newDefaults.tileLayer;
                newDefaults.zoomControlPosition = isDefined(userDefaults.zoomControlPosition) ? userDefaults.zoomControlPosition : newDefaults.zoomControlPosition;
                newDefaults.keyboard = isDefined(userDefaults.keyboard) ? userDefaults.keyboard : newDefaults.keyboard;
                newDefaults.dragging = isDefined(userDefaults.dragging) ? userDefaults.dragging : newDefaults.dragging;

                if (isDefined(userDefaults.controls)) {
                    angular.extend(newDefaults.controls, userDefaults.controls);
                }

                if (isObject(userDefaults.crs)) {
                    newDefaults.crs = userDefaults.crs;
                } else if (isDefined(L.CRS[userDefaults.crs])) {
                    newDefaults.crs = L.CRS[userDefaults.crs];
                }

                if (isDefined(userDefaults.center)) {
                    angular.copy(userDefaults.center, newDefaults.center);
                }

                if (isDefined(userDefaults.tileLayerOptions)) {
                    angular.copy(userDefaults.tileLayerOptions, newDefaults.tileLayerOptions);
                }

                if (isDefined(userDefaults.maxZoom)) {
                    newDefaults.maxZoom = userDefaults.maxZoom;
                }

                if (isDefined(userDefaults.minZoom)) {
                    newDefaults.minZoom = userDefaults.minZoom;
                }

                if (isDefined(userDefaults.zoomAnimation)) {
                    newDefaults.zoomAnimation = userDefaults.zoomAnimation;
                }

                if (isDefined(userDefaults.fadeAnimation)) {
                    newDefaults.fadeAnimation = userDefaults.fadeAnimation;
                }

                if (isDefined(userDefaults.markerZoomAnimation)) {
                    newDefaults.markerZoomAnimation = userDefaults.markerZoomAnimation;
                }

                if (isDefined(userDefaults.worldCopyJump)) {
                    newDefaults.worldCopyJump = userDefaults.worldCopyJump;
                }

                if (isDefined(userDefaults.map)) {
                    newDefaults.map = userDefaults.map;
                }
                
                if (isDefined(userDefaults.path)) {
                    newDefaults.path = userDefaults.path;
                }
            }

            var mapId = obtainEffectiveMapId(defaults, scopeId);
            defaults[mapId] = newDefaults;
            return newDefaults;
        }
    };
});

angular.module("leaflet-directive")
.service('leafletMarkersHelpers', function ($rootScope, leafletHelpers, $log, $compile,
  leafletGeoJsonHelpers) {

    var isDefined = leafletHelpers.isDefined,
        defaultTo = leafletHelpers.defaultTo,
        MarkerClusterPlugin = leafletHelpers.MarkerClusterPlugin,
        AwesomeMarkersPlugin = leafletHelpers.AwesomeMarkersPlugin,
        MakiMarkersPlugin = leafletHelpers.MakiMarkersPlugin,
        ExtraMarkersPlugin = leafletHelpers.ExtraMarkersPlugin,
        safeApply     = leafletHelpers.safeApply,
        Helpers = leafletHelpers,
        isString = leafletHelpers.isString,
        isNumber  = leafletHelpers.isNumber,
        isObject = leafletHelpers.isObject,
        groups = {},
        geoHlp = leafletGeoJsonHelpers,
        errorHeader = leafletHelpers.errorHeader;


   var _string = function(marker){
       //this exists since JSON.stringify barfs on cyclic
       var retStr = '';
       ['_icon', '_latlng', '_leaflet_id', '_map', '_shadow'].forEach(function(prop){
           retStr += prop + ': ' + defaultTo(marker[prop], 'undefined') + ' \n';
       });
       return '[leafletMarker] : \n' + retStr;
   };
    var _log = function(marker, useConsole){
        var logger = useConsole? console : $log;
        logger.debug(_string(marker));
    };

    var createLeafletIcon = function(iconData) {
        if (isDefined(iconData) && isDefined(iconData.type) && iconData.type === 'awesomeMarker') {
            if (!AwesomeMarkersPlugin.isLoaded()) {
                $log.error( errorHeader + ' The AwesomeMarkers Plugin is not loaded.');
            }

            return new L.AwesomeMarkers.icon(iconData);
        }

        if (isDefined(iconData) && isDefined(iconData.type) && iconData.type === 'makiMarker') {
            if (!MakiMarkersPlugin.isLoaded()) {
                $log.error(errorHeader + 'The MakiMarkers Plugin is not loaded.');
            }

            return new L.MakiMarkers.icon(iconData);
        }

        if (isDefined(iconData) && isDefined(iconData.type) && iconData.type === 'extraMarker') {
            if (!ExtraMarkersPlugin.isLoaded()) {
                $log.error(errorHeader + 'The ExtraMarkers Plugin is not loaded.');
            }
            return new L.ExtraMarkers.icon(iconData);
        }

        if (isDefined(iconData) && isDefined(iconData.type) && iconData.type === 'div') {
            return new L.divIcon(iconData);
        }

        // allow for any custom icon to be used... assumes the icon has already been initialized
        if (isDefined(iconData) && isDefined(iconData.type) && iconData.type === 'icon') {
            return iconData.icon;
        }

        var base64icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAGmklEQVRYw7VXeUyTZxjvNnfELFuyIzOabermMZEeQC/OclkO49CpOHXOLJl/CAURuYbQi3KLgEhbrhZ1aDwmaoGqKII6odATmH/scDFbdC7LvFqOCc+e95s2VG50X/LLm/f4/Z7neY/ne18aANCmAr5E/xZf1uDOkTcGcWR6hl9247tT5U7Y6SNvWsKT63P58qbfeLJG8M5qcgTknrvvrdDbsT7Ml+tv82X6vVxJE33aRmgSyYtcWVMqX97Yv2JvW39UhRE2HuyBL+t+gK1116ly06EeWFNlAmHxlQE0OMiV6mQCScusKRlhS3QLeVJdl1+23h5dY4FNB3thrbYboqptEFlphTC1hSpJnbRvxP4NWgsE5Jyz86QNNi/5qSUTGuFk1gu54tN9wuK2wc3o+Wc13RCmsoBwEqzGcZsxsvCSy/9wJKf7UWf1mEY8JWfewc67UUoDbDjQC+FqK4QqLVMGGR9d2wurKzqBk3nqIT/9zLxRRjgZ9bqQgub+DdoeCC03Q8j+0QhFhBHR/eP3U/zCln7Uu+hihJ1+bBNffLIvmkyP0gpBZWYXhKussK6mBz5HT6M1Nqpcp+mBCPXosYQfrekGvrjewd59/GvKCE7TbK/04/ZV5QZYVWmDwH1mF3xa2Q3ra3DBC5vBT1oP7PTj4C0+CcL8c7C2CtejqhuCnuIQHaKHzvcRfZpnylFfXsYJx3pNLwhKzRAwAhEqG0SpusBHfAKkxw3w4627MPhoCH798z7s0ZnBJ/MEJbZSbXPhER2ih7p2ok/zSj2cEJDd4CAe+5WYnBCgR2uruyEw6zRoW6/DWJ/OeAP8pd/BGtzOZKpG8oke0SX6GMmRk6GFlyAc59K32OTEinILRJRchah8HQwND8N435Z9Z0FY1EqtxUg+0SO6RJ/mmXz4VuS+DpxXC3gXmZwIL7dBSH4zKE50wESf8qwVgrP1EIlTO5JP9Igu0aexdh28F1lmAEGJGfh7jE6ElyM5Rw/FDcYJjWhbeiBYoYNIpc2FT/SILivp0F1ipDWk4BIEo2VuodEJUifhbiltnNBIXPUFCMpthtAyqws/BPlEF/VbaIxErdxPphsU7rcCp8DohC+GvBIPJS/tW2jtvTmmAeuNO8BNOYQeG8G/2OzCJ3q+soYB5i6NhMaKr17FSal7GIHheuV3uSCY8qYVuEm1cOzqdWr7ku/R0BDoTT+DT+ohCM6/CCvKLKO4RI+dXPeAuaMqksaKrZ7L3FE5FIFbkIceeOZ2OcHO6wIhTkNo0ffgjRGxEqogXHYUPHfWAC/lADpwGcLRY3aeK4/oRGCKYcZXPVoeX/kelVYY8dUGf8V5EBRbgJXT5QIPhP9ePJi428JKOiEYhYXFBqou2Guh+p/mEB1/RfMw6rY7cxcjTrneI1FrDyuzUSRm9miwEJx8E/gUmqlyvHGkneiwErR21F3tNOK5Tf0yXaT+O7DgCvALTUBXdM4YhC/IawPU+2PduqMvuaR6eoxSwUk75ggqsYJ7VicsnwGIkZBSXKOUww73WGXyqP+J2/b9c+gi1YAg/xpwck3gJuucNrh5JvDPvQr0WFXf0piyt8f8/WI0hV4pRxxkQZdJDfDJNOAmM0Ag8jyT6hz0WGXWuP94Yh2jcfjmXAGvHCMslRimDHYuHuDsy2QtHuIavznhbYURq5R57KpzBBRZKPJi8eQg48h4j8SDdowifdIrEVdU+gbO6QNvRRt4ZBthUaZhUnjlYObNagV3keoeru3rU7rcuceqU1mJBxy+BWZYlNEBH+0eH4vRiB+OYybU2hnblYlTvkHinM4m54YnxSyaZYSF6R3jwgP7udKLGIX6r/lbNa9N6y5MFynjWDtrHd75ZvTYAPO/6RgF0k76mQla3FGq7dO+cH8sKn0Vo7nDllwAhqwLPkxrHwWmHJOo+AKJ4rab5OgrM7rVu8eWb2Pu0Dh4eDgXoOfvp7Y7QeqknRmvcTBEyq9m/HQQSCSz6LHq3z0yzsNySRfMS253wl2KyRDbcZPcfJKjZmSEOjcxyi+Y8dUOtsIEH6R2wNykdqrkYJ0RV92H0W58pkfQk7cKevsLK10Py8SdMGfXNXATY+pPbyJR/ET6n9nIfztNtZYRV9XniQu9IA2vOVgy4ir7GCLVmmd+zjkH0eAF9Po6K61pmCXHxU5rHMYd1ftc3owjwRSVRzLjKvqZEty6cRUD7jGqiOdu5HG6MdHjNcNYGqfDm5YRzLBBCCDl/2bk8a8gdbqcfwECu62Fg/HrggAAAABJRU5ErkJggg==";
        var base64shadow = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAC5ElEQVRYw+2YW4/TMBCF45S0S1luXZCABy5CgLQgwf//S4BYBLTdJLax0fFqmB07nnQfEGqkIydpVH85M+NLjPe++dcPc4Q8Qh4hj5D/AaQJx6H/4TMwB0PeBNwU7EGQAmAtsNfAzoZkgIa0ZgLMa4Aj6CxIAsjhjOCoL5z7Glg1JAOkaicgvQBXuncwJAWjksLtBTWZe04CnYRktUGdilALppZBOgHGZcBzL6OClABvMSVIzyBjazOgrvACf1ydC5mguqAVg6RhdkSWQFj2uxfaq/BrIZOLEWgZdALIDvcMcZLD8ZbLC9de4yR1sYMi4G20S4Q/PWeJYxTOZn5zJXANZHIxAd4JWhPIloTJZhzMQduM89WQ3MUVAE/RnhAXpTycqys3NZALOBbB7kFrgLesQl2h45Fcj8L1tTSohUwuxhy8H/Qg6K7gIs+3kkaigQCOcyEXCHN07wyQazhrmIulvKMQAwMcmLNqyCVyMAI+BuxSMeTk3OPikLY2J1uE+VHQk6ANrhds+tNARqBeaGc72cK550FP4WhXmFmcMGhTwAR1ifOe3EvPqIegFmF+C8gVy0OfAaWQPMR7gF1OQKqGoBjq90HPMP01BUjPOqGFksC4emE48tWQAH0YmvOgF3DST6xieJgHAWxPAHMuNhrImIdvoNOKNWIOcE+UXE0pYAnkX6uhWsgVXDxHdTfCmrEEmMB2zMFimLVOtiiajxiGWrbU52EeCdyOwPEQD8LqyPH9Ti2kgYMf4OhSKB7qYILbBv3CuVTJ11Y80oaseiMWOONc/Y7kJYe0xL2f0BaiFTxknHO5HaMGMublKwxFGzYdWsBF174H/QDknhTHmHHN39iWFnkZx8lPyM8WHfYELmlLKtgWNmFNzQcC1b47gJ4hL19i7o65dhH0Negbca8vONZoP7doIeOC9zXm8RjuL0Gf4d4OYaU5ljo3GYiqzrWQHfJxA6ALhDpVKv9qYeZA8eM3EhfPSCmpuD0AAAAASUVORK5CYII=";

        if (!isDefined(iconData) || !isDefined(iconData.iconUrl)) {
            return new L.Icon.Default({
                iconUrl: base64icon,
                shadowUrl: base64shadow,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
        }

        return new L.Icon(iconData);
    };

    var _resetMarkerGroup = function(groupName) {
      if (isDefined(groups[groupName])) {
        groups.splice(groupName, 1);
      }
    };

    var _resetMarkerGroups = function() {
      groups = {};
    };

    var _deleteMarker = function(marker, map, layers) {
        marker.closePopup();
        // There is no easy way to know if a marker is added to a layer, so we search for it
        // if there are overlays
        if (isDefined(layers) && isDefined(layers.overlays)) {
            for (var key in layers.overlays) {
                if (layers.overlays[key] instanceof L.LayerGroup || layers.overlays[key] instanceof L.FeatureGroup) {
                    if (layers.overlays[key].hasLayer(marker)) {
                        layers.overlays[key].removeLayer(marker);
                        return;
                    }
                }
            }
        }

        if (isDefined(groups)) {
            for (var groupKey in groups) {
                if (groups[groupKey].hasLayer(marker)) {
                    groups[groupKey].removeLayer(marker);
                }
            }
        }

        if (map.hasLayer(marker)) {
            map.removeLayer(marker);
        }
    };

    var _manageOpenPopup = function(marker, markerData) {
        marker.openPopup();

        //the marker may have angular templates to compile
        var popup = marker.getPopup(),
            //the marker may provide a scope returning function used to compile the message
            //default to $rootScope otherwise
            markerScope = angular.isFunction(markerData.getMessageScope) ? markerData.getMessageScope() : $rootScope,
            compileMessage = isDefined(markerData.compileMessage) ? markerData.compileMessage : true;

        if (isDefined(popup)) {
            var updatePopup = function(popup) {
                popup._updateLayout();
                popup._updatePosition();
            };

            if (compileMessage) {
                $compile(popup._contentNode)(markerScope);
                //in case of an ng-include, we need to update the content after template load
                if (isDefined(popup._contentNode) && popup._contentNode.innerHTML.indexOf("ngInclude") > -1) {
                    var unregister = markerScope.$on('$includeContentLoaded', function() {
                        updatePopup(popup);
                        unregister();
                    });
                }
                else {
                    updatePopup(popup);
                }
            }
        }
    };

    var _manageOpenLabel = function(marker, markerData) {
        var markerScope = angular.isFunction(markerData.getMessageScope) ? markerData.getMessageScope() : $rootScope,
            labelScope = angular.isFunction(markerData.getLabelScope) ? markerData.getLabelScope() : markerScope,
            compileMessage = isDefined(markerData.compileMessage) ? markerData.compileMessage : true;

        if (Helpers.LabelPlugin.isLoaded() && isDefined(markerData.label)) {
            if (isDefined(markerData.label.options) && markerData.label.options.noHide === true) {
                marker.showLabel();
            }
            if (compileMessage && isDefined(marker.label)) {
                $compile(marker.label._container)(labelScope);
            }
        }
    };

    return {
        resetMarkerGroup: _resetMarkerGroup,

        resetMarkerGroups: _resetMarkerGroups,

        deleteMarker: _deleteMarker,

        manageOpenPopup: _manageOpenPopup,

        manageOpenLabel: _manageOpenLabel,

        createMarker: function(markerData) {
            if (!isDefined(markerData) || !geoHlp.validateCoords(markerData)){
                $log.error(errorHeader + 'The marker definition is not valid.');
                return;
            }
            var coords = geoHlp.getCoords(markerData);

            if (!isDefined(coords)){
                $log.error(errorHeader + 'Unable to get coordinates from markerData.');
                return;
            }

            var markerOptions = {
                icon: createLeafletIcon(markerData.icon),
                title: isDefined(markerData.title) ? markerData.title : '',
                draggable: isDefined(markerData.draggable) ? markerData.draggable : false,
                clickable: isDefined(markerData.clickable) ? markerData.clickable : true,
                riseOnHover: isDefined(markerData.riseOnHover) ? markerData.riseOnHover : false,
                zIndexOffset: isDefined(markerData.zIndexOffset) ? markerData.zIndexOffset : 0,
                iconAngle: isDefined(markerData.iconAngle) ? markerData.iconAngle : 0
            };
            // Add any other options not added above to markerOptions
            for (var markerDatum in markerData) {
                if (markerData.hasOwnProperty(markerDatum) && !markerOptions.hasOwnProperty(markerDatum)) {
                    markerOptions[markerDatum] = markerData[markerDatum];
                }
            }

            var marker = new L.marker(coords, markerOptions);

            if (!isString(markerData.message)) {
                marker.unbindPopup();
            }

            return marker;
        },

        addMarkerToGroup: function(marker, groupName, groupOptions, map) {
            if (!isString(groupName)) {
                $log.error(errorHeader + 'The marker group you have specified is invalid.');
                return;
            }

            if (!MarkerClusterPlugin.isLoaded()) {
                $log.error(errorHeader + "The MarkerCluster plugin is not loaded.");
                return;
            }
            if (!isDefined(groups[groupName])) {
                groups[groupName] = new L.MarkerClusterGroup(groupOptions);
                map.addLayer(groups[groupName]);
            }
            groups[groupName].addLayer(marker);
        },

        listenMarkerEvents: function(marker, markerData, leafletScope) {
            //these should be deregistered on destroy .. possible leake
            //handles should not be closures since they will need to be removed
            marker.on("popupopen", function(/* event */) {
                safeApply(leafletScope, function() {
                    markerData.focus = true;
                    _manageOpenPopup(marker, markerData);//needed since markerData is now a copy
                });
            });
            marker.on("popupclose", function(/* event */) {
                safeApply(leafletScope, function() {
                    markerData.focus = false;
                });
            });
            marker.on("add", function(/* event */) {
                safeApply(leafletScope, function() {
                  if('label' in markerData)
                    _manageOpenLabel(marker, markerData);
                });
            });
        },

        addMarkerWatcher: function(marker, name, leafletScope, layers, map, isDeepWatch) {
            var markerWatchPath = Helpers.getObjectArrayPath("markers." + name);
            isDeepWatch = defaultTo(isDeepWatch, true);
            //TODO:break up this 200 line function to be readable (nmccready)
            var clearWatch = leafletScope.$watch(markerWatchPath, function(markerData, oldMarkerData) {
                if (!isDefined(markerData)) {
                    _deleteMarker(marker, map, layers);
                    clearWatch();
                    return;
                }

                if (!isDefined(oldMarkerData)) {
                    return;
                }

                // Update the lat-lng property (always present in marker properties)
                if (!geoHlp.validateCoords(markerData)) {
                    $log.warn('There are problems with lat-lng data, please verify your marker model');
                    _deleteMarker(marker, map, layers);
                    return;
                }

                // watch is being initialized if old and new object is the same
                var isInitializing = markerData === oldMarkerData;

                // Update marker rotation
                if (isDefined(markerData.iconAngle) && oldMarkerData.iconAngle !== markerData.iconAngle) {
                    marker.setIconAngle(markerData.iconAngle);
                }

                // It is possible that the layer has been removed or the layer marker does not exist
                // Update the layer group if present or move it to the map if not
                if (!isString(markerData.layer)) {
                    // There is no layer information, we move the marker to the map if it was in a layer group
                    if (isString(oldMarkerData.layer)) {
                        // Remove from the layer group that is supposed to be
                        if (isDefined(layers.overlays[oldMarkerData.layer]) && layers.overlays[oldMarkerData.layer].hasLayer(marker)) {
                            layers.overlays[oldMarkerData.layer].removeLayer(marker);
                            marker.closePopup();
                        }
                        // Test if it is not on the map and add it
                        if (!map.hasLayer(marker)) {
                            map.addLayer(marker);
                        }
                    }
                }

                if ((isNumber(markerData.opacity) || isNumber(parseFloat(markerData.opacity))) && markerData.opacity !== oldMarkerData.opacity) {
                    // There was a different opacity so we update it
                    marker.setOpacity(markerData.opacity);
                }

                if (isString(markerData.layer) && oldMarkerData.layer !== markerData.layer) {
                    // If it was on a layer group we have to remove it
                    if (isString(oldMarkerData.layer) && isDefined(layers.overlays[oldMarkerData.layer]) && layers.overlays[oldMarkerData.layer].hasLayer(marker)) {
                        layers.overlays[oldMarkerData.layer].removeLayer(marker);
                    }
                    marker.closePopup();

                    // Remove it from the map in case the new layer is hidden or there is an error in the new layer
                    if (map.hasLayer(marker)) {
                        map.removeLayer(marker);
                    }

                    // The markerData.layer is defined so we add the marker to the layer if it is different from the old data
                    if (!isDefined(layers.overlays[markerData.layer])) {
                        $log.error(errorHeader + 'You must use a name of an existing layer');
                        return;
                    }
                    // Is a group layer?
                    var layerGroup = layers.overlays[markerData.layer];
                    if (!(layerGroup instanceof L.LayerGroup || layerGroup instanceof L.FeatureGroup)) {
                        $log.error(errorHeader + 'A marker can only be added to a layer of type "group" or "featureGroup"');
                        return;
                    }
                    // The marker goes to a correct layer group, so first of all we add it
                    layerGroup.addLayer(marker);
                    // The marker is automatically added to the map depending on the visibility
                    // of the layer, so we only have to open the popup if the marker is in the map
                    if (map.hasLayer(marker) && markerData.focus === true) {
                        _manageOpenPopup(marker, markerData);
                    }
                }

                // Update the draggable property
                if (markerData.draggable !== true && oldMarkerData.draggable === true && (isDefined(marker.dragging))) {
                    marker.dragging.disable();
                }

                if (markerData.draggable === true && oldMarkerData.draggable !== true) {
                    // The markerData.draggable property must be true so we update if there wasn't a previous value or it wasn't true
                    if (marker.dragging) {
                        marker.dragging.enable();
                    } else {
                        if (L.Handler.MarkerDrag) {
                            marker.dragging = new L.Handler.MarkerDrag(marker);
                            marker.options.draggable = true;
                            marker.dragging.enable();
                        }
                    }
                }

                // Update the icon property
                if (!isObject(markerData.icon)) {
                    // If there is no icon property or it's not an object
                    if (isObject(oldMarkerData.icon)) {
                        // If there was an icon before restore to the default
                        marker.setIcon(createLeafletIcon());
                        marker.closePopup();
                        marker.unbindPopup();
                        if (isString(markerData.message)) {
                            marker.bindPopup(markerData.message, markerData.popupOptions);
                        }
                    }
                }

                if (isObject(markerData.icon) && isObject(oldMarkerData.icon) && !angular.equals(markerData.icon, oldMarkerData.icon)) {
                    var dragG = false;
                    if (marker.dragging) {
                        dragG = marker.dragging.enabled();
                    }
                    marker.setIcon(createLeafletIcon(markerData.icon));
                    if (dragG) {
                        marker.dragging.enable();
                    }
                    marker.closePopup();
                    marker.unbindPopup();
                    if (isString(markerData.message)) {
                        marker.bindPopup(markerData.message, markerData.popupOptions);
                    }
                }

                // Update the Popup message property
                if (!isString(markerData.message) && isString(oldMarkerData.message)) {
                    marker.closePopup();
                    marker.unbindPopup();
                }

                // Update the label content or bind a new label if the old one has been removed.
                if (Helpers.LabelPlugin.isLoaded()) {
                    if (isDefined(markerData.label) && isDefined(markerData.label.message)) {
                        if ('label' in oldMarkerData && 'message' in oldMarkerData.label && !angular.equals(markerData.label.message, oldMarkerData.label.message)) {
                            marker.updateLabelContent(markerData.label.message);
                        } else if (!angular.isFunction(marker.getLabel)) {
                            marker.bindLabel(markerData.label.message, markerData.label.options);
                            _manageOpenLabel(marker, markerData);
                        } else {
                            _manageOpenLabel(marker, markerData);
                        }
                    } else if (!('label' in markerData && !('message' in markerData.label))) {
                        if (angular.isFunction(marker.unbindLabel)) {
                            marker.unbindLabel();
                        }
                    }
                }

                // There is some text in the popup, so we must show the text or update existing
                if (isString(markerData.message) && !isString(oldMarkerData.message)) {
                    // There was no message before so we create it
                    marker.bindPopup(markerData.message, markerData.popupOptions);
                }

                if (isString(markerData.message) && isString(oldMarkerData.message) && markerData.message !== oldMarkerData.message) {
                    // There was a different previous message so we update it
                    marker.setPopupContent(markerData.message);
                }

                // Update the focus property
                var updatedFocus = false;
                if (markerData.focus !== true && oldMarkerData.focus === true) {
                    // If there was a focus property and was true we turn it off
                    marker.closePopup();
                    updatedFocus = true;
                }

                // The markerData.focus property must be true so we update if there wasn't a previous value or it wasn't true
                if (markerData.focus === true && ( !isDefined(oldMarkerData.focus) || oldMarkerData.focus === false) || (isInitializing && markerData.focus === true)) {
                    // Reopen the popup when focus is still true
                    _manageOpenPopup(marker, markerData);
                    updatedFocus = true;
                }

                // zIndexOffset adjustment
                if (oldMarkerData.zIndexOffset !== markerData.zIndexOffset) {
                    marker.setZIndexOffset(markerData.zIndexOffset);
                }

                var markerLatLng = marker.getLatLng();
                var isCluster = (isString(markerData.layer) && Helpers.MarkerClusterPlugin.is(layers.overlays[markerData.layer]));
                // If the marker is in a cluster it has to be removed and added to the layer when the location is changed
                if (isCluster) {
                    // The focus has changed even by a user click or programatically
                    if (updatedFocus) {
                        // We only have to update the location if it was changed programatically, because it was
                        // changed by a user drag the marker data has already been updated by the internal event
                        // listened by the directive
                        if ((markerData.lat !== oldMarkerData.lat) || (markerData.lng !== oldMarkerData.lng)) {
                            layers.overlays[markerData.layer].removeLayer(marker);
                            marker.setLatLng([markerData.lat, markerData.lng]);
                            layers.overlays[markerData.layer].addLayer(marker);
                        }
                    } else {
                        // The marker has possibly moved. It can be moved by a user drag (marker location and data are equal but old
                        // data is diferent) or programatically (marker location and data are diferent)
                        if ((markerLatLng.lat !== markerData.lat) || (markerLatLng.lng !== markerData.lng)) {
                            // The marker was moved by a user drag
                            layers.overlays[markerData.layer].removeLayer(marker);
                            marker.setLatLng([markerData.lat, markerData.lng]);
                            layers.overlays[markerData.layer].addLayer(marker);
                        } else if ((markerData.lat !== oldMarkerData.lat) || (markerData.lng !== oldMarkerData.lng)) {
                            // The marker was moved programatically
                            layers.overlays[markerData.layer].removeLayer(marker);
                            marker.setLatLng([markerData.lat, markerData.lng]);
                            layers.overlays[markerData.layer].addLayer(marker);
                        } else if (isObject(markerData.icon) && isObject(oldMarkerData.icon) && !angular.equals(markerData.icon, oldMarkerData.icon)) {
                            layers.overlays[markerData.layer].removeLayer(marker);
                            layers.overlays[markerData.layer].addLayer(marker);
                        }
                    }
                } else if (markerLatLng.lat !== markerData.lat || markerLatLng.lng !== markerData.lng) {
                    marker.setLatLng([markerData.lat, markerData.lng]);
                }
            }, isDeepWatch);
        },
        string: _string,
        log: _log
    };
});

angular.module("leaflet-directive").factory('leafletPathsHelpers', function ($rootScope, $log, leafletHelpers) {
    var isDefined = leafletHelpers.isDefined,
        isArray = leafletHelpers.isArray,
        isNumber = leafletHelpers.isNumber,
        isValidPoint = leafletHelpers.isValidPoint;
    var availableOptions = [
        // Path options
        'stroke', 'weight', 'color', 'opacity',
        'fill', 'fillColor', 'fillOpacity',
        'dashArray', 'lineCap', 'lineJoin', 'clickable',
        'pointerEvents', 'className',

        // Polyline options
        'smoothFactor', 'noClip'
    ];
    function _convertToLeafletLatLngs(latlngs) {
        return latlngs.filter(function(latlng) {
            return isValidPoint(latlng);
        }).map(function (latlng) {
            return _convertToLeafletLatLng(latlng);
        });
    }

    function _convertToLeafletLatLng(latlng) {
        if (isArray(latlng)) {
            return new L.LatLng(latlng[0], latlng[1]);
        } else {
            return new L.LatLng(latlng.lat, latlng.lng);
        }
    }

    function _convertToLeafletMultiLatLngs(paths) {
        return paths.map(function(latlngs) {
            return _convertToLeafletLatLngs(latlngs);
        });
    }

    function _getOptions(path, defaults) {
        var options = {};
        for (var i = 0; i < availableOptions.length; i++) {
            var optionName = availableOptions[i];

            if (isDefined(path[optionName])) {
                options[optionName] = path[optionName];
            } else if (isDefined(defaults.path[optionName])) {
                options[optionName] = defaults.path[optionName];
            }
        }

        return options;
    }

    var _updatePathOptions = function (path, data) {
        var updatedStyle = {};
        for (var i = 0; i < availableOptions.length; i++) {
            var optionName = availableOptions[i];
            if (isDefined(data[optionName])) {
                updatedStyle[optionName] = data[optionName];
            }
        }
        path.setStyle(data);
    };

    var _isValidPolyline = function(latlngs) {
        if (!isArray(latlngs)) {
            return false;
        }
        for (var i = 0; i < latlngs.length; i++) {
            var point = latlngs[i];
            if (!isValidPoint(point)) {
                return false;
            }
        }
        return true;
    };

    var pathTypes = {
        polyline: {
            isValid: function(pathData) {
                var latlngs = pathData.latlngs;
                return _isValidPolyline(latlngs);
            },
            createPath: function(options) {
                return new L.Polyline([], options);
            },
            setPath: function(path, data) {
                path.setLatLngs(_convertToLeafletLatLngs(data.latlngs));
                _updatePathOptions(path, data);
                return;
            }
        },
        multiPolyline: {
            isValid: function(pathData) {
                var latlngs = pathData.latlngs;
                if (!isArray(latlngs)) {
                    return false;
                }

                for (var i in latlngs) {
                    var polyline = latlngs[i];
                    if (!_isValidPolyline(polyline)) {
                        return false;
                    }
                }

                return true;
            },
            createPath: function(options) {
                return new L.multiPolyline([[[0,0],[1,1]]], options);
            },
            setPath: function(path, data) {
                path.setLatLngs(_convertToLeafletMultiLatLngs(data.latlngs));
                _updatePathOptions(path, data);
                return;
            }
        } ,
        polygon: {
            isValid: function(pathData) {
                var latlngs = pathData.latlngs;
                return _isValidPolyline(latlngs);
            },
            createPath: function(options) {
                return new L.Polygon([], options);
            },
            setPath: function(path, data) {
                path.setLatLngs(_convertToLeafletLatLngs(data.latlngs));
                _updatePathOptions(path, data);
                return;
            }
        },
        multiPolygon: {
            isValid: function(pathData) {
                var latlngs = pathData.latlngs;

                if (!isArray(latlngs)) {
                    return false;
                }

                for (var i in latlngs) {
                    var polyline = latlngs[i];
                    if (!_isValidPolyline(polyline)) {
                        return false;
                    }
                }

                return true;
            },
            createPath: function(options) {
                return new L.MultiPolygon([[[0,0],[1,1],[0,1]]], options);
            },
            setPath: function(path, data) {
                path.setLatLngs(_convertToLeafletMultiLatLngs(data.latlngs));
                _updatePathOptions(path, data);
                return;
            }
        },
        rectangle: {
            isValid: function(pathData) {
                var latlngs = pathData.latlngs;

                if (!isArray(latlngs) || latlngs.length !== 2) {
                    return false;
                }

                for (var i in latlngs) {
                    var point = latlngs[i];
                    if (!isValidPoint(point)) {
                        return false;
                    }
                }

                return true;
            },
            createPath: function(options) {
                return new L.Rectangle([[0,0],[1,1]], options);
            },
            setPath: function(path, data) {
                path.setBounds(new L.LatLngBounds(_convertToLeafletLatLngs(data.latlngs)));
                _updatePathOptions(path, data);
            }
        },
        circle: {
            isValid: function(pathData) {
                var point= pathData.latlngs;
                return isValidPoint(point) && isNumber(pathData.radius);
            },
            createPath: function(options) {
                return new L.Circle([0,0], 1, options);
            },
            setPath: function(path, data) {
                path.setLatLng(_convertToLeafletLatLng(data.latlngs));
                if (isDefined(data.radius)) {
                    path.setRadius(data.radius);
                }
                _updatePathOptions(path, data);
            }
        },
        circleMarker: {
            isValid: function(pathData) {
                var point= pathData.latlngs;
                return isValidPoint(point) && isNumber(pathData.radius);
            },
            createPath: function(options) {
                return new L.CircleMarker([0,0], options);
            },
            setPath: function(path, data) {
                path.setLatLng(_convertToLeafletLatLng(data.latlngs));
                if (isDefined(data.radius)) {
                    path.setRadius(data.radius);
                }
                _updatePathOptions(path, data);
            }
        }
    };

    var _getPathData = function(path) {
        var pathData = {};
        if (path.latlngs) {
            pathData.latlngs = path.latlngs;
        }

        if (path.radius) {
            pathData.radius = path.radius;
        }

        return pathData;
    };

    return {
        setPathOptions: function(leafletPath, pathType, data) {
            if(!isDefined(pathType)) {
                pathType = "polyline";
            }
            pathTypes[pathType].setPath(leafletPath, data);
        },
        createPath: function(name, path, defaults) {
            if(!isDefined(path.type)) {
                path.type = "polyline";
            }
            var options = _getOptions(path, defaults);
            var pathData = _getPathData(path);

            if (!pathTypes[path.type].isValid(pathData)) {
                $log.error("[AngularJS - Leaflet] Invalid data passed to the " + path.type + " path");
                return;
            }

            return pathTypes[path.type].createPath(options);
        }
    };
});

angular.module("leaflet-directive")
.service('leafletWatchHelpers', function (){

    var _maybe = function(scope, watchFunctionName, thingToWatchStr, watchOptions, initCb){
        //watchOptions.isDeep is/should be ignored in $watchCollection
        var unWatch = scope[watchFunctionName](thingToWatchStr, function(newValue, oldValue) {
            initCb(newValue, oldValue);
            if(!watchOptions.doWatch)
                unWatch();
        }, watchOptions.isDeep);

        return unWatch;
    };

  /*
  @name: maybeWatch
  @description: Utility to watch something once or forever.
  @returns unWatch function
  @param watchOptions - see markersWatchOptions and or derrivatives. This object is used
  to set watching to once and its watch depth.
  */
  var _maybeWatch = function(scope, thingToWatchStr, watchOptions, initCb){
      return _maybe(scope, '$watch', thingToWatchStr, watchOptions, initCb);
  };

  /*
  @name: _maybeWatchCollection
  @description: Utility to watch something once or forever.
  @returns unWatch function
  @param watchOptions - see markersWatchOptions and or derrivatives. This object is used
  to set watching to once and its watch depth.
  */
  var _maybeWatchCollection = function(scope, thingToWatchStr, watchOptions, initCb){
      return _maybe(scope, '$watchCollection', thingToWatchStr, watchOptions, initCb);
  };

  return {
    maybeWatch: _maybeWatch,
    maybeWatchCollection: _maybeWatchCollection
  };
});

angular.module("leaflet-directive").directive('bounds', function ($log, $timeout, leafletHelpers, leafletBoundsHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: [ 'leaflet', 'center' ],

        link: function(scope, element, attrs, controller) {
            var isDefined = leafletHelpers.isDefined,
                createLeafletBounds = leafletBoundsHelpers.createLeafletBounds,
                leafletScope = controller[0].getLeafletScope(),
                mapController = controller[0];

            var emptyBounds = function(bounds) {
                return (bounds._southWest.lat === 0 && bounds._southWest.lng === 0 &&
                        bounds._northEast.lat === 0 && bounds._northEast.lng === 0);
            };

            mapController.getMap().then(function (map) {
                leafletScope.$on('boundsChanged', function (event) {
                    var scope = event.currentScope;
                    var bounds = map.getBounds();
                    //$log.debug('updated map bounds...', bounds);
                    if (emptyBounds(bounds) || scope.settingBoundsFromScope) {
                        return;
                    }
                    var newScopeBounds = {
                        northEast: {
                            lat: bounds._northEast.lat,
                            lng: bounds._northEast.lng
                        },
                        southWest: {
                            lat: bounds._southWest.lat,
                            lng: bounds._southWest.lng
                        }
                    };
                    if (!angular.equals(scope.bounds, newScopeBounds)) {
                        //$log.debug('Need to update scope bounds.');
                        scope.bounds = newScopeBounds;
                    }
                });
                leafletScope.$watch('bounds', function (bounds) {
                    //$log.debug('updated bounds...', bounds);
                    if (!isDefined(bounds)) {
                        $log.error('[AngularJS - Leaflet] Invalid bounds');
                        return;
                    }
                    var leafletBounds = createLeafletBounds(bounds);
                    if (leafletBounds && !map.getBounds().equals(leafletBounds)) {
                        //$log.debug('Need to update map bounds.');
                        scope.settingBoundsFromScope = true;
                        map.fitBounds(leafletBounds);
                        $timeout( function() {
                            //$log.debug('Allow bound updates.');
                            scope.settingBoundsFromScope = false;
                        });
                    }
                }, true);
            });
        }
    };
});

angular.module("leaflet-directive").directive('center',
    function ($log, $q, $location, $timeout, leafletMapDefaults, leafletHelpers, leafletBoundsHelpers, leafletEvents) {

    var isDefined     = leafletHelpers.isDefined,
        isNumber      = leafletHelpers.isNumber,
        isSameCenterOnMap = leafletHelpers.isSameCenterOnMap,
        safeApply     = leafletHelpers.safeApply,
        isValidCenter = leafletHelpers.isValidCenter,
        isValidBounds = leafletBoundsHelpers.isValidBounds,
        isUndefinedOrEmpty = leafletHelpers.isUndefinedOrEmpty;

    var shouldInitializeMapWithBounds = function(bounds, center) {
        return isDefined(bounds) && isValidBounds(bounds) && isUndefinedOrEmpty(center);
    };

    var _leafletCenter;
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',
        controller: function () {
            _leafletCenter = $q.defer();
            this.getCenter = function() {
                return _leafletCenter.promise;
            };
        },
        link: function(scope, element, attrs, controller) {
            var leafletScope  = controller.getLeafletScope(),
                centerModel   = leafletScope.center;

            controller.getMap().then(function(map) {
                var defaults = leafletMapDefaults.getDefaults(attrs.id);

                if (attrs.center.search("-") !== -1) {
                    $log.error('The "center" variable can\'t use a "-" on his key name: "' + attrs.center + '".');
                    map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                    return;
                } else if (shouldInitializeMapWithBounds(leafletScope.bounds, centerModel)) {
                    map.fitBounds(leafletBoundsHelpers.createLeafletBounds(leafletScope.bounds));
                    centerModel = map.getCenter();
                    safeApply(leafletScope, function (scope) {
                        scope.center = {
                            lat: map.getCenter().lat,
                            lng: map.getCenter().lng,
                            zoom: map.getZoom(),
                            autoDiscover: false
                        };
                        angular.extend(scope.center,{
                           lat: map.getCenter().lat,
                           lng: map.getCenter().lng,
                           zoom: map.getZoom(),
                           autoDiscover: false
                        });
                    });
                    safeApply(leafletScope, function (scope) {
                        var mapBounds = map.getBounds();
                        scope.bounds = {
                            northEast: {
                                lat: mapBounds._northEast.lat,
                                lng: mapBounds._northEast.lng
                            },
                            southWest: {
                                lat: mapBounds._southWest.lat,
                                lng: mapBounds._southWest.lng
                            }
                        };
                    });
                } else if (!isDefined(centerModel)) {
                    $log.error('The "center" property is not defined in the main scope');
                    map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                    return;
                } else if (!(isDefined(centerModel.lat) && isDefined(centerModel.lng)) && !isDefined(centerModel.autoDiscover)) {
                    angular.copy(defaults.center, centerModel);
                }

                var urlCenterHash, mapReady;
                if (attrs.urlHashCenter === "yes") {
                    var extractCenterFromUrl = function() {
                        var search = $location.search();
                        var centerParam;
                        if (isDefined(search.c)) {
                            var cParam = search.c.split(":");
                            if (cParam.length === 3) {
                                centerParam = { lat: parseFloat(cParam[0]), lng: parseFloat(cParam[1]), zoom: parseInt(cParam[2], 10) };
                            }
                        }
                        return centerParam;
                    };
                    urlCenterHash = extractCenterFromUrl();

                    leafletScope.$on('$locationChangeSuccess', function(event) {
                        var scope = event.currentScope;
                        //$log.debug("updated location...");
                        var urlCenter = extractCenterFromUrl();
                        if (isDefined(urlCenter) && !isSameCenterOnMap(urlCenter, map)) {
                            //$log.debug("updating center model...", urlCenter);
                            scope.center = {
                                lat: urlCenter.lat,
                                lng: urlCenter.lng,
                                zoom: urlCenter.zoom
                            };
                        }
                    });
                }

                leafletScope.$watch("center", function(center) {
                    //$log.debug("updated center model...");
                    // The center from the URL has priority
                    if (isDefined(urlCenterHash)) {
                        angular.copy(urlCenterHash, center);
                        urlCenterHash = undefined;
                    }

                    if (!isValidCenter(center) && center.autoDiscover !== true) {
                        $log.warn("[AngularJS - Leaflet] invalid 'center'");
                        //map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                        return;
                    }

                    if (center.autoDiscover === true) {
                        if (!isNumber(center.zoom)) {
                            map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                        }
                        if (isNumber(center.zoom) && center.zoom > defaults.center.zoom) {
                            map.locate({ setView: true, maxZoom: center.zoom });
                        } else if (isDefined(defaults.maxZoom)) {
                            map.locate({ setView: true, maxZoom: defaults.maxZoom });
                        } else {
                            map.locate({ setView: true });
                        }
                        return;
                    }

                    if (mapReady && isSameCenterOnMap(center, map)) {
                        //$log.debug("no need to update map again.");
                        return;
                    }

                    //$log.debug("updating map center...", center);
                    leafletScope.settingCenterFromScope = true;
                    map.setView([center.lat, center.lng], center.zoom);
                    leafletEvents.notifyCenterChangedToBounds(leafletScope, map);
                    $timeout(function() {
                        leafletScope.settingCenterFromScope = false;
                        //$log.debug("allow center scope updates");
                    });
                }, true);

                map.whenReady(function() {
                    mapReady = true;
                });

                map.on("moveend", function(/* event */) {
                    // Resolve the center after the first map position
                    _leafletCenter.resolve();
                    leafletEvents.notifyCenterUrlHashChanged(leafletScope, map, attrs, $location.search());
                    //$log.debug("updated center on map...");
                    if (isSameCenterOnMap(centerModel, map) || scope.settingCenterFromScope) {
                        //$log.debug("same center in model, no need to update again.");
                        return;
                    }
                    safeApply(leafletScope, function(scope) {
                        if (!leafletScope.settingCenterFromScope) {
                            //$log.debug("updating center model...", map.getCenter(), map.getZoom());
                            
                            angular.extend(scope.center,{
                               lat: map.getCenter().lat,
                               lng: map.getCenter().lng,
                               zoom: map.getZoom(),
                               autoDiscover: false
                            });
                        }
                        leafletEvents.notifyCenterChangedToBounds(leafletScope, map);
                    });
                });

                if (centerModel.autoDiscover === true) {
                    map.on("locationerror", function() {
                        $log.warn("[AngularJS - Leaflet] The Geolocation API is unauthorized on this page.");
                        if (isValidCenter(centerModel)) {
                            map.setView([centerModel.lat, centerModel.lng], centerModel.zoom);
                            leafletEvents.notifyCenterChangedToBounds(leafletScope, map);
                        } else {
                            map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                            leafletEvents.notifyCenterChangedToBounds(leafletScope, map);
                        }
                    });
                }
            });
        }
    };
});

angular.module("leaflet-directive").directive('controls', function ($log, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: '?^leaflet',

        link: function(scope, element, attrs, controller) {
            if(!controller) {
                return;
            }

            var isDefined = leafletHelpers.isDefined,
                leafletScope  = controller.getLeafletScope(),
                controls = leafletScope.controls;

            controller.getMap().then(function(map) {
                if (isDefined(L.Control.Draw) && isDefined(controls.draw)) {

                    if (!isDefined(controls.edit)) {
                        controls.edit = { featureGroup: new L.FeatureGroup() };
                        map.addLayer(controls.edit.featureGroup);
                    }

                    var drawControl = new L.Control.Draw(controls);
                    map.addControl(drawControl);
                }

                if (isDefined(controls.scale)) {
                    var scaleControl = new L.control.scale(controls.scale);
                    map.addControl(scaleControl);
                }

                if (isDefined(controls.fullscreen)) {
                    if (leafletHelpers.FullScreenControlPlugin.isLoaded()) {
                        var fullscreenControl = new L.Control.Fullscreen(controls.fullscreen);
                        map.addControl(fullscreenControl);
                    } else {
                        $log.error('[AngularJS - Leaflet] Fullscreen plugin is not loaded.');
                    }
                }

                if (isDefined(controls.custom)) {
                    for(var i in controls.custom) {
                        map.addControl(controls.custom[i]);
                    }
                }
            });
        }
    };
});

angular.module("leaflet-directive").directive("decorations", function($log, leafletHelpers) {
	return {
		restrict: "A",
		scope: false,
		replace: false,
		require: 'leaflet',

		link: function(scope, element, attrs, controller) {
			var leafletScope = controller.getLeafletScope(),
				PolylineDecoratorPlugin = leafletHelpers.PolylineDecoratorPlugin,
				isDefined = leafletHelpers.isDefined,
				leafletDecorations = {};

			/* Creates an "empty" decoration with a set of coordinates, but no pattern. */
			function createDecoration(options) {
				if (isDefined(options) && isDefined(options.coordinates)) {
					if (!PolylineDecoratorPlugin.isLoaded()) {
						$log.error('[AngularJS - Leaflet] The PolylineDecorator Plugin is not loaded.');
					}
				}

				return L.polylineDecorator(options.coordinates);
			}

			/* Updates the path and the patterns for the provided decoration, and returns the decoration. */
			function setDecorationOptions(decoration, options) {
				if (isDefined(decoration) && isDefined(options)) {
					if (isDefined(options.coordinates) && isDefined(options.patterns)) {
						decoration.setPaths(options.coordinates);
						decoration.setPatterns(options.patterns);
						return decoration;
					}
				}
			}

			controller.getMap().then(function(map) {
				leafletScope.$watch("decorations", function(newDecorations) {
					for (var name in leafletDecorations) {
						if (!isDefined(newDecorations[name]) || !angular.equals(newDecorations[name], leafletDecorations)) {
							map.removeLayer(leafletDecorations[name]);
							delete leafletDecorations[name];
						}
					}

					for (var newName in newDecorations) {
						var decorationData = newDecorations[newName],
							newDecoration = createDecoration(decorationData);

						if (isDefined(newDecoration)) {
							leafletDecorations[newName] = newDecoration;
							map.addLayer(newDecoration);
							setDecorationOptions(newDecoration, decorationData);
						}
					}
				}, true);
			});
		}
	};
});

angular.module("leaflet-directive").directive('eventBroadcast', function ($log, $rootScope, leafletHelpers, leafletEvents) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var isObject = leafletHelpers.isObject,
                isDefined = leafletHelpers.isDefined,
                leafletScope  = controller.getLeafletScope(),
                eventBroadcast = leafletScope.eventBroadcast,
                availableMapEvents = leafletEvents.getAvailableMapEvents(),
                genDispatchMapEvent = leafletEvents.genDispatchMapEvent;

            controller.getMap().then(function(map) {

                var mapEvents = [];
                var i;
                var eventName;
                var logic = "broadcast";

                // We have a possible valid object
                if (!isDefined(eventBroadcast.map)) {
                    // We do not have events enable/disable do we do nothing (all enabled by default)
                    mapEvents = availableMapEvents;
                } else if (!isObject(eventBroadcast.map)) {
                    // Not a valid object
                    $log.warn("[AngularJS - Leaflet] event-broadcast.map must be an object check your model.");
                } else {
                    // We have a possible valid map object
                    // Event propadation logic
                    if (eventBroadcast.map.logic !== "emit" && eventBroadcast.map.logic !== "broadcast") {
                        // This is an error
                        $log.warn("[AngularJS - Leaflet] Available event propagation logic are: 'emit' or 'broadcast'.");
                    } else {
                        logic = eventBroadcast.map.logic;
                    }

                    if (!(isObject(eventBroadcast.map.enable) && eventBroadcast.map.enable.length >= 0)) {
                        $log.warn("[AngularJS - Leaflet] event-broadcast.map.enable must be an object check your model.");
                    } else {
                        // Enable events
                        for (i = 0; i < eventBroadcast.map.enable.length; i++) {
                            eventName = eventBroadcast.map.enable[i];
                            // Do we have already the event enabled?
                            if (mapEvents.indexOf(eventName) === -1 && availableMapEvents.indexOf(eventName) !== -1) {
                                mapEvents.push(eventName);
                            }
                        }
                    }

                }

                for (i = 0; i < mapEvents.length; i++) {
                    eventName = mapEvents[i];
                    map.on(eventName, genDispatchMapEvent(leafletScope, eventName, logic), {
                        eventName: eventName
                    });
                }
            });
        }
    };
});

angular.module("leaflet-directive")
.directive('geojson', function ($log, $rootScope, leafletData, leafletHelpers,
    leafletWatchHelpers, leafletDirectiveControlsHelpers,leafletIterators) {

    var _maybeWatchCollection = leafletWatchHelpers.maybeWatchCollection,
        _watchOptions = leafletHelpers.watchOptions,
        _extendDirectiveControls = leafletDirectiveControlsHelpers.extend,
        hlp = leafletHelpers,
        $it = leafletIterators;

    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var safeApply = leafletHelpers.safeApply,
                isDefined = leafletHelpers.isDefined,
                leafletScope  = controller.getLeafletScope(),
                leafletGeoJSON = {},
                _hasSetLeafletData = false;

            controller.getMap().then(function(map) {
                var watchOptions = leafletScope.geojsonWatchOptions || _watchOptions;

                var _hookUpEvents = function(geojson){
                    var resetStyleOnMouseout = geojson.resetStyleOnMouseout;
                    var onEachFeature;

                    if (angular.isFunction(geojson.onEachFeature)) {
                        onEachFeature = geojson.onEachFeature;
                    } else {
                        onEachFeature = function(feature, layer) {
                            if (leafletHelpers.LabelPlugin.isLoaded() && isDefined(geojson.label)) {
                                layer.bindLabel(feature.properties.description);
                            }

                            layer.on({
                                mouseover: function(e) {
                                    safeApply(leafletScope, function() {
                                        $rootScope.$broadcast('leafletDirectiveMap.geojsonMouseover', feature, e);
                                    });
                                },
                                mouseout: function(e) {
                                    if (resetStyleOnMouseout) {
                                        //this is broken on nested needs to traverse
                                        leafletGeoJSON.resetStyle(e.target);
                                    }
                                    safeApply(leafletScope, function() {
                                        $rootScope.$broadcast('leafletDirectiveMap.geojsonMouseout', e);
                                    });
                                },
                                click: function(e) {
                                    safeApply(leafletScope, function() {
                                        $rootScope.$broadcast('leafletDirectiveMap.geojsonClick', feature, e);
                                    });
                                }
                            });
                        };
                    }
                    return onEachFeature;
                };

                var isNested = (hlp.isDefined(attrs.geojsonNested) &&
                    hlp.isTruthy(attrs.geojsonNested));

                var _clean = function(){
                    if(!leafletGeoJSON)
                        return;
                    var _remove = function(lObject) {
                        if (isDefined(lObject) && map.hasLayer(lObject)) {
                            map.removeLayer(lObject);
                        }
                    };
                    if(isNested) {
                        $it.each(leafletGeoJSON, function(lObject) {
                            _remove(lObject);
                        });
                        return;
                    }
                    _remove(leafletGeoJSON);
                };

                var _addGeojson = function(model, maybeName){
                    var geojson = angular.copy(model);
                    if (!(isDefined(geojson) && isDefined(geojson.data))) {
                        return;
                    }
                    var onEachFeature = _hookUpEvents(geojson);

                    if (!isDefined(geojson.options)) {
                        //right here is why we use a clone / copy (we modify and thus)
                        //would kick of a watcher.. we need to be more careful everywhere
                        //for stuff like this
                        geojson.options = {
                            style: geojson.style,
                            filter: geojson.filter,
                            onEachFeature: onEachFeature,
                            pointToLayer: geojson.pointToLayer
                        };
                    }

                    var lObject = L.geoJson(geojson.data, geojson.options);

                    if(maybeName && hlp.isString(maybeName)){
                        leafletGeoJSON[maybeName] = lObject;
                    }
                    else{
                        leafletGeoJSON = lObject;
                    }

                    lObject.addTo(map);

                    if(!_hasSetLeafletData){//only do this once and play with the same ref forever
                        _hasSetLeafletData = true;
                        leafletData.setGeoJSON(leafletGeoJSON, attrs.id);
                    }
                };

                var _create = function(model){
                    _clean();
                    if(isNested) {
                        if(!model || !Object.keys(model).length)
                            return;
                        $it.each(model, function(m, name) {
                            //name could be layerName and or groupName
                            //for now it is not tied to a layer
                            _addGeojson(m,name);
                        });
                        return;
                    }
                    _addGeojson(model);
                };

                _extendDirectiveControls(attrs.id, 'geojson', _create, _clean);

                _maybeWatchCollection(leafletScope,'geojson', watchOptions, function(geojson){
                    _create(geojson);
                });
            });
        }
    };
});

angular.module("leaflet-directive").directive('layercontrol', function ($log, leafletData, leafletHelpers) {
  return {
    restrict: "E",
    scope: {
    },
    replace: true,
    transclude: false,
    require: '^leaflet',
    controller: function ($scope, $element, $sce) {
      $log.debug('[Angular Directive - Layers] layers', $scope, $element);
      var safeApply = leafletHelpers.safeApply,
        isDefined = leafletHelpers.isDefined;
      angular.extend($scope, {
        baselayer: '',
        icons: {
          uncheck: 'fa fa-check-square-o',
          check: 'fa fa-square-o',
          radio: 'fa fa-dot-circle-o',
          unradio: 'fa fa-circle-o',
          up: 'fa fa-angle-up',
          down: 'fa fa-angle-down',
          open: 'fa fa-angle-double-down',
          close: 'fa fa-angle-double-up'
        },
        changeBaseLayer: function(key, e) {
          leafletHelpers.safeApply($scope, function(scp) {
            scp.baselayer = key;
            leafletData.getMap().then(function(map) {
              leafletData.getLayers().then(function(leafletLayers) {
                if(map.hasLayer(leafletLayers.baselayers[key])) {
                  return;
                }
                for(var i in scp.layers.baselayers) {
                  scp.layers.baselayers[i].icon = scp.icons.unradio;
                  if(map.hasLayer(leafletLayers.baselayers[i])) {
                    map.removeLayer(leafletLayers.baselayers[i]);
                  }
                }
                map.addLayer(leafletLayers.baselayers[key]);
                scp.layers.baselayers[key].icon = $scope.icons.radio;
              });
            });
          });
          e.preventDefault();
        },
        moveLayer: function(ly, newIndex, e) {
            var delta = Object.keys($scope.layers.baselayers).length;
            if(newIndex >= (1+delta) && newIndex <= ($scope.overlaysArray.length+delta)) {
                var oldLy;
                for(var key in $scope.layers.overlays) {
                    if($scope.layers.overlays[key].index === newIndex) {
                        oldLy = $scope.layers.overlays[key];
                        break;
                    }
                }
                if(oldLy) {
                    safeApply($scope, function() {
                        oldLy.index = ly.index;
                        ly.index = newIndex;
                    });
                }
            }
            e.stopPropagation();
            e.preventDefault();
        },
        initIndex: function(layer, idx) {
            var delta = Object.keys($scope.layers.baselayers).length;
            layer.index = isDefined(layer.index)? layer.index:idx+delta+1;
        },
        toggleOpacity: function(e, layer) {
            $log.debug('Event', e);
            if(layer.visible) {
                var el = angular.element(e.currentTarget);
                el.toggleClass($scope.icons.close + ' ' + $scope.icons.open);
                el = el.parents('.lf-row').find('.lf-opacity');
                el.toggle('fast', function() {
                    safeApply($scope, function() {
                        layer.opacityControl = !layer.opacityControl;
                    });
                });
            }
            e.stopPropagation();
            e.preventDefault();
        },
        unsafeHTML: function(html) {
          return $sce.trustAsHtml(html);
        }
      });

      var div = $element.get(0);
      if (!L.Browser.touch) {
          L.DomEvent.disableClickPropagation(div);
          L.DomEvent.on(div, 'mousewheel', L.DomEvent.stopPropagation);
      } else {
          L.DomEvent.on(div, 'click', L.DomEvent.stopPropagation);
      }
    },
    template:
      '<div class="angular-leaflet-control-layers" ng-show="overlaysArray.length">' +
        '<div class="lf-baselayers">' +
            '<div class="lf-row" ng-repeat="(key, layer) in layers.baselayers">' +
                '<label class="lf-icon-bl" ng-click="changeBaseLayer(key, $event)">' +
                    '<input class="leaflet-control-layers-selector" type="radio" name="lf-radio" ' +
                        'ng-show="false" ng-checked="baselayer === key" ng-value="key" /> ' +
                    '<i class="lf-icon lf-icon-radio" ng-class="layer.icon"></i>' +
                    '<div class="lf-text">{{layer.name}}</div>' +
                '</label>' +
            '</div>' +
        '</div>' +
        '<div class="lf-overlays">' +
            '<div class="lf-container">' +
                '<div class="lf-row" ng-repeat="layer in overlaysArray | orderBy:\'index\':order" ng-init="initIndex(layer, $index)">' +
                    '<label class="lf-icon-ol">' +
                        '<input class="lf-control-layers-selector" type="checkbox" ng-show="false" ng-model="layer.visible"/> ' +
                        '<i class="lf-icon lf-icon-check" ng-class="layer.icon"></i>' +
                        '<div class="lf-text">{{layer.name}}</div>' +
                        '<div class="lf-icons">' +
                            '<i class="lf-icon lf-up" ng-class="icons.up" ng-click="moveLayer(layer, layer.index - orderNumber, $event)"></i> ' +
                            '<i class="lf-icon lf-down" ng-class="icons.down" ng-click="moveLayer(layer, layer.index + orderNumber, $event)"></i> ' +
                            '<i class="lf-icon lf-open" ng-class="layer.opacityControl? icons.close:icons.open" ng-click="toggleOpacity($event, layer)"></i>' +
                        '</div>' +
                    '</label>'+
                    '<div class="lf-legend" ng-if="layer.legend" ng-bind-html="unsafeHTML(layer.legend)"></div>' +
                    '<div class="lf-opacity" ng-show="layer.visible &amp;&amp; layer.opacityControl">' +
                        '<input type="text" class="lf-opacity-control" name="lf-opacity-control" data-key="{{layer.index}}" />' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
      '</div>',
    link: function(scope, element, attrs, controller) {
        var isDefined = leafletHelpers.isDefined,
        leafletScope = controller.getLeafletScope(),
        layers = leafletScope.layers;

        // Setting layer stack order.
        attrs.order = (isDefined(attrs.order) && (attrs.order === 'normal' || attrs.order === 'reverse'))? attrs.order:'normal';
        scope.order = attrs.order === 'normal';
        scope.orderNumber = attrs.order === 'normal'? -1:1;

        scope.layers = layers;
        controller.getMap().then(function(map) {

            leafletScope.$watch('layers.baselayers', function(newBaseLayers) {
                leafletData.getLayers().then(function(leafletLayers) {
                    var key;
                    for(key in newBaseLayers) {
                      if(map.hasLayer(leafletLayers.baselayers[key])) {
                        newBaseLayers[key].icon = scope.icons.radio;
                      } else {
                        newBaseLayers[key].icon = scope.icons.unradio;
                      }
                    }
                });
            });

            leafletScope.$watch('layers.overlays', function(newOverlayLayers) {
                var overlaysArray = [];
                leafletData.getLayers().then(function(leafletLayers) {
                    for(var key in newOverlayLayers) {
                        newOverlayLayers[key].icon = scope.icons[(newOverlayLayers[key].visible? 'uncheck':'check')];
                        overlaysArray.push(newOverlayLayers[key]);
                        if(isDefined(newOverlayLayers[key].index) && leafletLayers.overlays[key].setZIndex) {
                            leafletLayers.overlays[key].setZIndex(newOverlayLayers[key].index);
                        }
                    }
                });

                var unreg = scope.$watch(function() {
                    if(element.children().size() > 1) {
                        element.find('.lf-overlays').trigger('resize');
                        return element.find('.lf-opacity').size() === Object.keys(layers.overlays).length;
                    }
                }, function(el) {
                    if(el === true) {
                        if(isDefined(element.find('.lf-opacity-control').ionRangeSlider)) {
                            element.find('.lf-opacity-control').each(function(idx, inp) {
                                var delta =  Object.keys(layers.baselayers).length,
                                    lyAux;
                                for(var key in scope.overlaysArray) {
                                    if(scope.overlaysArray[key].index === idx+delta+1) {
                                        lyAux = scope.overlaysArray[key];
                                    }
                                }

                                var input = angular.element(inp),
                                    op = isDefined(lyAux) && isDefined(lyAux.layerOptions)?
                                        lyAux.layerOptions.opacity:undefined;
                                input.ionRangeSlider({
                                    min: 0,
                                    from: isDefined(op)? Math.ceil(op*100):100,
                                    step: 1,
                                    max: 100,
                                    prettify: false,
                                    hasGrid: false,
                                    hideMinMax: true,
                                    onChange: function(val) {
                                        leafletData.getLayers().then(function(leafletLayers) {
                                            var key = val.input.data().key;
                                            var ly, layer;
                                            for(var k in layers.overlays) {
                                                if(layers.overlays[k].index === key) {
                                                    ly = leafletLayers.overlays[k];
                                                    layer = layers.overlays[k];
                                                    break;
                                                }
                                            }
                                            if(map.hasLayer(ly)) {
                                                layer.layerOptions = isDefined(layer.layerOptions)? layer.layerOptions:{};
                                                layer.layerOptions.opacity = val.input.val()/100;
                                                if(ly.setOpacity) {
                                                    ly.setOpacity(val.input.val()/100);
                                                }
                                                if(ly.getLayers && ly.eachLayer) {
                                                    ly.eachLayer(function(lay) {
                                                        if(lay.setOpacity) {
                                                            lay.setOpacity(val.input.val()/100);
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            });
                        } else {
                            $log.warn('[AngularJS - Leaflet] Ion Slide Range Plugin is not loaded');
                        }
                        unreg();
                    }
                });

                scope.overlaysArray = overlaysArray;
            }, true);
        });
    }
  };
});

angular.module("leaflet-directive").directive('layers', function ($log, $q, leafletData, leafletHelpers, leafletLayerHelpers, leafletControlHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',
        controller: function ($scope) {
            $scope._leafletLayers = $q.defer();
            this.getLayers = function () {
                return $scope._leafletLayers.promise;
            };
        },
        link: function(scope, element, attrs, controller){
            var isDefined = leafletHelpers.isDefined,
                leafletLayers = {},
                leafletScope  = controller.getLeafletScope(),
                layers = leafletScope.layers,
                createLayer = leafletLayerHelpers.createLayer,
                updateLayersControl = leafletControlHelpers.updateLayersControl,
                isLayersControlVisible = false;

            controller.getMap().then(function(map) {

                // We have baselayers to add to the map
                scope._leafletLayers.resolve(leafletLayers);
                leafletData.setLayers(leafletLayers, attrs.id);

                leafletLayers.baselayers = {};
                leafletLayers.overlays = {};

                var mapId = attrs.id;

                // Setup all baselayers definitions
                var oneVisibleLayer = false;
                for (var layerName in layers.baselayers) {
                    var newBaseLayer = createLayer(layers.baselayers[layerName]);
                    if (!isDefined(newBaseLayer)) {
                        delete layers.baselayers[layerName];
                        continue;
                    }
                    leafletLayers.baselayers[layerName] = newBaseLayer;
                    // Only add the visible layer to the map, layer control manages the addition to the map
                    // of layers in its control
                    if (layers.baselayers[layerName].top === true) {
                        map.addLayer(leafletLayers.baselayers[layerName]);
                        oneVisibleLayer = true;
                    }
                }

                // If there is no visible layer add first to the map
                if (!oneVisibleLayer && Object.keys(leafletLayers.baselayers).length > 0) {
                    map.addLayer(leafletLayers.baselayers[Object.keys(layers.baselayers)[0]]);
                }

                // Setup the Overlays
                for (layerName in layers.overlays) {
                    if(layers.overlays[layerName].type === 'cartodb') {

                    }
                    var newOverlayLayer = createLayer(layers.overlays[layerName]);
                    if (!isDefined(newOverlayLayer)) {
                        delete layers.overlays[layerName];
                        continue;
                    }
                    leafletLayers.overlays[layerName] = newOverlayLayer;
                    // Only add the visible overlays to the map
                    if (layers.overlays[layerName].visible === true) {
                        map.addLayer(leafletLayers.overlays[layerName]);
                    }
                }

                // Watch for the base layers
                leafletScope.$watch('layers.baselayers', function(newBaseLayers) {
                    // Delete layers from the array
                    for (var name in leafletLayers.baselayers) {
                        if (!isDefined(newBaseLayers[name])) {
                            // Remove from the map if it's on it
                            if (map.hasLayer(leafletLayers.baselayers[name])) {
                                map.removeLayer(leafletLayers.baselayers[name]);
                            }
                            delete leafletLayers.baselayers[name];
                        }
                    }
                    // add new layers
                    for (var newName in newBaseLayers) {
                        if (!isDefined(leafletLayers.baselayers[newName])) {
                            var testBaseLayer = createLayer(newBaseLayers[newName]);
                            if (isDefined(testBaseLayer)) {
                                leafletLayers.baselayers[newName] = testBaseLayer;
                                // Only add the visible layer to the map
                                if (newBaseLayers[newName].top === true) {
                                    map.addLayer(leafletLayers.baselayers[newName]);
                                }
                            }
                        } else {
                            if (newBaseLayers[newName].top === true && !map.hasLayer(leafletLayers.baselayers[newName])) {
                                map.addLayer(leafletLayers.baselayers[newName]);
                            } else if (newBaseLayers[newName].top === false && map.hasLayer(leafletLayers.baselayers[newName])) {
                                map.removeLayer(leafletLayers.baselayers[newName]);
                            }
                        }
                    }

                    //we have layers, so we need to make, at least, one active
                    var found = false;
                    // search for an active layer
                    for (var key in leafletLayers.baselayers) {
                        if (map.hasLayer(leafletLayers.baselayers[key])) {
                            found = true;
                            break;
                        }
                    }
                    // If there is no active layer make one active
                    if (!found && Object.keys(leafletLayers.baselayers).length > 0) {
                        map.addLayer(leafletLayers.baselayers[Object.keys(leafletLayers.baselayers)[0]]);
                    }

                    // Only show the layers switch selector control if we have more than one baselayer + overlay
                    isLayersControlVisible = updateLayersControl(map, mapId, isLayersControlVisible, newBaseLayers, layers.overlays, leafletLayers);
                }, true);

                // Watch for the overlay layers
                leafletScope.$watch('layers.overlays', function(newOverlayLayers) {
                    // Delete layers from the array
                    for (var name in leafletLayers.overlays) {
                        if (!isDefined(newOverlayLayers[name])) {
                            // Remove from the map if it's on it
                            if (map.hasLayer(leafletLayers.overlays[name])) {
                                map.removeLayer(leafletLayers.overlays[name]);
                            }
                            // TODO: Depending on the layer type we will have to delete what's included on it
                            delete leafletLayers.overlays[name];
                        }
                    }

                    // add new overlays
                    for (var newName in newOverlayLayers) {
                        if (!isDefined(leafletLayers.overlays[newName])) {
                            var testOverlayLayer = createLayer(newOverlayLayers[newName]);
                            if (!isDefined(testOverlayLayer)) {
                                // If the layer creation fails, continue to the next overlay
                                continue;
                            }
                            leafletLayers.overlays[newName] = testOverlayLayer;
                            if (newOverlayLayers[newName].visible === true) {
                                map.addLayer(leafletLayers.overlays[newName]);
                            }
                        }

                        // check for the .visible property to hide/show overLayers
                        if (newOverlayLayers[newName].visible && !map.hasLayer(leafletLayers.overlays[newName])) {
                            map.addLayer(leafletLayers.overlays[newName]);
                        } else if (newOverlayLayers[newName].visible === false && map.hasLayer(leafletLayers.overlays[newName])) {
                            map.removeLayer(leafletLayers.overlays[newName]);
                        }

                        //refresh heatmap data if present
                        if (newOverlayLayers[newName].visible && map._loaded && newOverlayLayers[newName].data && newOverlayLayers[newName].type === "heatmap") {
                            leafletLayers.overlays[newName].setData(newOverlayLayers[newName].data);
                            leafletLayers.overlays[newName].update();
                        }
                    }

                    // Only add the layers switch selector control if we have more than one baselayer + overlay
                    isLayersControlVisible = updateLayersControl(map, mapId, isLayersControlVisible, layers.baselayers, newOverlayLayers, leafletLayers);
                }, true);
            });
        }
    };
});

angular.module("leaflet-directive").directive('legend', function ($log, $http, leafletHelpers, leafletLegendHelpers) {
        return {
            restrict: "A",
            scope: false,
            replace: false,
            require: 'leaflet',

            link: function (scope, element, attrs, controller) {

                var isArray = leafletHelpers.isArray,
                    isDefined = leafletHelpers.isDefined,
                    isFunction = leafletHelpers.isFunction,
                    leafletScope = controller.getLeafletScope(),
                    legend = leafletScope.legend;

                var legendClass;
                var position;
                var leafletLegend;
                var type;

                leafletScope.$watch('legend', function (newLegend) {

                    if (isDefined(newLegend)) {

                        legendClass = newLegend.legendClass ? newLegend.legendClass : "legend";

                        position = newLegend.position || 'bottomright';

                        // default to arcgis
                        type = newLegend.type || 'arcgis'; 
                    }

                }, true);

                controller.getMap().then(function (map) {

                    leafletScope.$watch('legend', function (newLegend) {

                        if (!isDefined(newLegend)) {

                            if (isDefined(leafletLegend)) {
                                leafletLegend.removeFrom(map);
                                leafletLegend= null;
                            }

                            return;
                        }

                        if (!isDefined(newLegend.url) && (type === 'arcgis') && (!isArray(newLegend.colors) || !isArray(newLegend.labels) || newLegend.colors.length !== newLegend.labels.length)) {

                            $log.warn("[AngularJS - Leaflet] legend.colors and legend.labels must be set.");

                            return;
                        }

                        if (isDefined(newLegend.url)) {

                            $log.info("[AngularJS - Leaflet] loading legend service.");

                            return;
                        }

                        if (isDefined(leafletLegend)) {
                            leafletLegend.removeFrom(map);
                            leafletLegend= null;
                        }

                        leafletLegend = L.control({
                            position: position
                        });
                        if (type === 'arcgis') {
                            leafletLegend.onAdd = leafletLegendHelpers.getOnAddArrayLegend(newLegend, legendClass);
                        }
                        leafletLegend.addTo(map);

                    });

                    leafletScope.$watch('legend.url', function (newURL) {

                        if (!isDefined(newURL)) {
                            return;
                        }
                        $http.get(newURL)
                            .success(function (legendData) {

                                if (isDefined(leafletLegend)) {

                                    leafletLegendHelpers.updateLegend(leafletLegend.getContainer(), legendData, type, newURL);

                                } else {

                                    leafletLegend = L.control({
                                        position: position
                                    });
                                    leafletLegend.onAdd = leafletLegendHelpers.getOnAddLegend(legendData, legendClass, type, newURL);
                                    leafletLegend.addTo(map);
                                }

                                if (isDefined(legend.loadedData) && isFunction(legend.loadedData)) {
                                    legend.loadedData();
                                }
                            })
                            .error(function () {
                                $log.warn('[AngularJS - Leaflet] legend.url not loaded.');
                            });
                    });

                });
            }
        };
    });

angular.module("leaflet-directive").directive('markers',
    function ($log, $rootScope, $q, leafletData, leafletHelpers, leafletMapDefaults,
      leafletMarkersHelpers, leafletEvents, leafletIterators, leafletWatchHelpers,
      leafletDirectiveControlsHelpers) {
    //less terse vars to helpers
    var isDefined = leafletHelpers.isDefined,
        errorHeader = leafletHelpers.errorHeader,
        Helpers = leafletHelpers,
        isString = leafletHelpers.isString,
        addMarkerWatcher = leafletMarkersHelpers.addMarkerWatcher,
        listenMarkerEvents = leafletMarkersHelpers.listenMarkerEvents,
        addMarkerToGroup = leafletMarkersHelpers.addMarkerToGroup,
        bindMarkerEvents = leafletEvents.bindMarkerEvents,
        createMarker = leafletMarkersHelpers.createMarker,
        deleteMarker = leafletMarkersHelpers.deleteMarker,
        $it = leafletIterators,
        _markersWatchOptions = leafletHelpers.watchOptions,
        maybeWatch = leafletWatchHelpers.maybeWatch,
        extendDirectiveControls = leafletDirectiveControlsHelpers.extend;

    var _maybeAddMarkerToLayer = function(layerName, layers, model, marker, doIndividualWatch, map){

        if (!isString(layerName)) {
            $log.error(errorHeader + ' A layername must be a string');
            return false;
        }

        if (!isDefined(layers)) {
            $log.error(errorHeader + ' You must add layers to the directive if the markers are going to use this functionality.');
            return false;
        }

        if (!isDefined(layers.overlays) || !isDefined(layers.overlays[layerName])) {
            $log.error(errorHeader +' A marker can only be added to a layer of type "group"');
            return false;
        }
        var layerGroup = layers.overlays[layerName];
        if (!(layerGroup instanceof L.LayerGroup || layerGroup instanceof L.FeatureGroup)) {
            $log.error(errorHeader + ' Adding a marker to an overlay needs a overlay of the type "group" or "featureGroup"');
            return false;
        }

        // The marker goes to a correct layer group, so first of all we add it
        layerGroup.addLayer(marker);

        // The marker is automatically added to the map depending on the visibility
        // of the layer, so we only have to open the popup if the marker is in the map
        if (!doIndividualWatch && map.hasLayer(marker) && model.focus === true) {
            leafletMarkersHelpers.manageOpenPopup(marker, model);
        }
        return true;
    };
    //TODO: move to leafletMarkersHelpers??? or make a new class/function file (leafletMarkersHelpers is large already)
    var _addMarkers = function(markersToRender, map, layers, leafletMarkers, leafletScope,
                               watchOptions, maybeLayerName){

        for (var newName in markersToRender) {
            if (newName.search("-") !== -1) {
                $log.error('The marker can\'t use a "-" on his key name: "' + newName + '".');
                continue;
            }

            if (!isDefined(leafletMarkers[newName])) {
                //(nmccready) very important to not have model changes when lObject is changed
                //this might be desirable in some cases but it causes two-way binding to lObject which is not ideal
                //if it is left as the reference then all changes from oldModel vs newModel are ignored
                //see _destroy (where modelDiff becomes meaningless if we do not copy here)
                var model = Helpers.copy(markersToRender[newName]);
                var marker = createMarker(model);
                var layerName = (model? model.layer : undefined) || maybeLayerName; //original way takes pref
                if (!isDefined(marker)) {
                    $log.error(errorHeader + ' Received invalid data on the marker ' + newName + '.');
                    continue;
                }
                leafletMarkers[newName] = marker;

                // Bind message
                if (isDefined(model.message)) {
                    marker.bindPopup(model.message, model.popupOptions);
                }

                // Add the marker to a cluster group if needed
                if (isDefined(model.group)) {
                    var groupOptions = isDefined(model.groupOption) ? model.groupOption : null;
                    addMarkerToGroup(marker, model.group, groupOptions, map);
                }

                // Show label if defined
                if (Helpers.LabelPlugin.isLoaded() && isDefined(model.label) && isDefined(model.label.message)) {
                    marker.bindLabel(model.label.message, model.label.options);
                }

                // Check if the marker should be added to a layer
                if (isDefined(model) && (isDefined(model.layer) || isDefined(maybeLayerName))){

                    var pass = _maybeAddMarkerToLayer(layerName, layers, model, marker,
                        watchOptions.individual.doWatch, map);
                    if(!pass)
                        continue; //something went wrong move on in the loop
                } else if (!isDefined(model.group)) {
                    // We do not have a layer attr, so the marker goes to the map layer
                    map.addLayer(marker);
                    if (!watchOptions.individual.doWatch && model.focus === true) {
                        leafletMarkersHelpers.manageOpenPopup(marker, model);
                    }
                }
                var pathToMarker = Helpers.getObjectDotPath(maybeLayerName? [maybeLayerName, newName]: [newName]);
                if (watchOptions.individual.doWatch) {
                    addMarkerWatcher(marker, pathToMarker, leafletScope, layers, map,
                        watchOptions.individual.doWatch);
                }

                listenMarkerEvents(marker, model, leafletScope, watchOptions.individual.doWatch);
                bindMarkerEvents(marker, pathToMarker, model, leafletScope, layerName);
            }
        }
    };
    var _destroy = function(markerModels, oldMarkerModels, lMarkers, map, layers){
        // Delete markers from the array
        var hasLogged = false,
          modelIsDiff = false;
        var doCheckOldModel =  isDefined(oldMarkerModels);
        for (var name in lMarkers) {
            if(!hasLogged) {
                $log.debug(errorHeader + "[markers] destroy: ");
                hasLogged = true;
            }

            if(doCheckOldModel){
              //might want to make the option (in watch options) to disable deep checking
              //ie the options to only check !== (reference check) instead of angular.equals (slow)
              modelIsDiff = !angular.equals(markerModels[name],oldMarkerModels[name]);
            }
            if (!isDefined(markerModels) ||
                !Object.keys(markerModels).length ||
                !isDefined(markerModels[name]) ||
                !Object.keys(markerModels[name]).length ||
                modelIsDiff) {
                deleteMarker(lMarkers[name], map, layers);
                delete lMarkers[name];
            }
        }
    };

    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: ['leaflet', '?layers'],

        link: function(scope, element, attrs, controller) {
            var mapController = controller[0],
                leafletScope  = mapController.getLeafletScope();

            mapController.getMap().then(function(map) {
                var leafletMarkers = {}, getLayers;

                // If the layers attribute is used, we must wait until the layers are created
                if (isDefined(controller[1])) {
                    getLayers = controller[1].getLayers;
                } else {
                    getLayers = function() {
                        var deferred = $q.defer();
                        deferred.resolve();
                        return deferred.promise;
                    };
                }

                var watchOptions = leafletScope.markersWatchOptions || _markersWatchOptions;

                // backwards compat
                if(isDefined(attrs.watchMarkers))
                  watchOptions.doWatch = watchOptions.individual.doWatch =
                        (!isDefined(attrs.watchMarkers) || Helpers.isTruthy(attrs.watchMarkers));

                var isNested = (isDefined(attrs.markersNested) && Helpers.isTruthy(attrs.markersNested));

                getLayers().then(function(layers) {
                    var _clean = function(models, oldModels){
                        _destroy(models, oldModels, leafletMarkers, map, layers);
                    };

                    var _create = function(models, oldModels){
                        _clean(models, oldModels);
                        if(isNested) {
                            $it.each(models, function(markersToAdd, layerName) {
                                _addMarkers(markersToAdd, map, layers, leafletMarkers, leafletScope,
                                    watchOptions, layerName);
                            });
                            return;
                        }
                        _addMarkers(models, map, layers, leafletMarkers, leafletScope,
                            watchOptions);
                    };
                    extendDirectiveControls(attrs.id, 'markers', _create, _clean);
                    leafletData.setMarkers(leafletMarkers, attrs.id);

                    maybeWatch(leafletScope,'markers', watchOptions, function(newMarkers, oldMarkers){
                        _create(newMarkers, oldMarkers);
                    });
                });
            });
        }
    };
});

angular.module("leaflet-directive").directive('maxbounds', function ($log, leafletMapDefaults, leafletBoundsHelpers, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var leafletScope  = controller.getLeafletScope(),
                isValidBounds = leafletBoundsHelpers.isValidBounds,
                isNumber = leafletHelpers.isNumber;


            controller.getMap().then(function(map) {
                leafletScope.$watch("maxbounds", function (maxbounds) {
                    if (!isValidBounds(maxbounds)) {
                        // Unset any previous maxbounds
                        map.setMaxBounds();
                        return;
                    }
                    
                    var leafletBounds = leafletBoundsHelpers.createLeafletBounds(maxbounds);
                    if(isNumber(maxbounds.pad)) {
                      leafletBounds = leafletBounds.pad(maxbounds.pad);
                    }

                    map.setMaxBounds(leafletBounds);
                    if (!attrs.center) {
                        map.fitBounds(leafletBounds);
                    }
                });
            });
        }
    };
});

angular.module("leaflet-directive").directive('paths', function ($log, $q, leafletData, leafletMapDefaults, leafletHelpers, leafletPathsHelpers, leafletEvents) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: ['leaflet', '?layers'],

        link: function(scope, element, attrs, controller) {
            var mapController = controller[0],
                isDefined = leafletHelpers.isDefined,
                isString = leafletHelpers.isString,
                leafletScope  = mapController.getLeafletScope(),
                paths     = leafletScope.paths,
                createPath = leafletPathsHelpers.createPath,
                bindPathEvents = leafletEvents.bindPathEvents,
                setPathOptions = leafletPathsHelpers.setPathOptions;

            mapController.getMap().then(function(map) {
                var defaults = leafletMapDefaults.getDefaults(attrs.id),
                    getLayers;

                // If the layers attribute is used, we must wait until the layers are created
                if (isDefined(controller[1])) {
                    getLayers = controller[1].getLayers;
                } else {
                    getLayers = function() {
                        var deferred = $q.defer();
                        deferred.resolve();
                        return deferred.promise;
                    };
                }

                if (!isDefined(paths)) {
                    return;
                }

                getLayers().then(function(layers) {

                    var leafletPaths = {};
                    leafletData.setPaths(leafletPaths, attrs.id);

                    // Should we watch for every specific marker on the map?
                    var shouldWatch = (!isDefined(attrs.watchPaths) || attrs.watchPaths === 'true');

                    // Function for listening every single path once created
                    var watchPathFn = function(leafletPath, name) {
                        var clearWatch = leafletScope.$watch("paths[\""+name+"\"]", function(pathData, old) {
                            if (!isDefined(pathData)) {
                                if (isDefined(old.layer)) {
                                    for (var i in layers.overlays) {
                                        var overlay = layers.overlays[i];
                                        overlay.removeLayer(leafletPath);
                                    }
                                }
                                map.removeLayer(leafletPath);
                                clearWatch();
                                return;
                            }
                            setPathOptions(leafletPath, pathData.type, pathData);
                        }, true);
                    };

                    leafletScope.$watchCollection("paths", function (newPaths) {

                        // Delete paths (by name) from the array
                        for (var name in leafletPaths) {
                            if (!isDefined(newPaths[name])) {
                                map.removeLayer(leafletPaths[name]);
                                delete leafletPaths[name];
                            }
                        }

                        // Create the new paths
                        for (var newName in newPaths) {
                            if (newName.search('\\$') === 0) {
                                continue;
                            }
                            if (newName.search("-") !== -1) {
                                $log.error('[AngularJS - Leaflet] The path name "' + newName + '" is not valid. It must not include "-" and a number.');
                                continue;
                            }

                            if (!isDefined(leafletPaths[newName])) {
                                var pathData = newPaths[newName];
                                var newPath = createPath(newName, newPaths[newName], defaults);

                                // bind popup if defined
                                if (isDefined(newPath) && isDefined(pathData.message)) {
                                    newPath.bindPopup(pathData.message);
                                }

                                // Show label if defined
                                if (leafletHelpers.LabelPlugin.isLoaded() && isDefined(pathData.label) && isDefined(pathData.label.message)) {
                                    newPath.bindLabel(pathData.label.message, pathData.label.options);
                                }

                                // Check if the marker should be added to a layer
                                if (isDefined(pathData) && isDefined(pathData.layer)) {

                                    if (!isString(pathData.layer)) {
                                        $log.error('[AngularJS - Leaflet] A layername must be a string');
                                        continue;
                                    }
                                    if (!isDefined(layers)) {
                                        $log.error('[AngularJS - Leaflet] You must add layers to the directive if the markers are going to use this functionality.');
                                        continue;
                                    }

                                    if (!isDefined(layers.overlays) || !isDefined(layers.overlays[pathData.layer])) {
                                        $log.error('[AngularJS - Leaflet] A marker can only be added to a layer of type "group"');
                                        continue;
                                    }
                                    var layerGroup = layers.overlays[pathData.layer];
                                    if (!(layerGroup instanceof L.LayerGroup || layerGroup instanceof L.FeatureGroup)) {
                                        $log.error('[AngularJS - Leaflet] Adding a marker to an overlay needs a overlay of the type "group" or "featureGroup"');
                                        continue;
                                    }

                                    // Listen for changes on the new path
                                    leafletPaths[newName] = newPath;
                                    // The path goes to a correct layer group, so first of all we add it
                                    layerGroup.addLayer(newPath);

                                    if (shouldWatch) {
                                        watchPathFn(newPath, newName);
                                    } else {
                                        setPathOptions(newPath, pathData.type, pathData);
                                    }
                                } else if (isDefined(newPath)) {
                                    // Listen for changes on the new path
                                    leafletPaths[newName] = newPath;
                                    map.addLayer(newPath);

                                    if (shouldWatch) {
                                        watchPathFn(newPath, newName);
                                    } else {
                                        setPathOptions(newPath, pathData.type, pathData);
                                    }
                                }

                                bindPathEvents(newPath, newName, pathData, leafletScope);
                            }
                        }
                    });
                });
            });
        }
    };
});

angular.module("leaflet-directive").directive('tiles', function ($log, leafletData, leafletMapDefaults, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var isDefined = leafletHelpers.isDefined,
                leafletScope  = controller.getLeafletScope(),
                tiles = leafletScope.tiles;

            if (!isDefined(tiles) && !isDefined(tiles.url)) {
                $log.warn("[AngularJS - Leaflet] The 'tiles' definition doesn't have the 'url' property.");
                return;
            }

            controller.getMap().then(function(map) {
                var defaults = leafletMapDefaults.getDefaults(attrs.id);
                var tileLayerObj;
                leafletScope.$watch("tiles", function(tiles) {
                    var tileLayerOptions = defaults.tileLayerOptions;
                    var tileLayerUrl = defaults.tileLayer;

                    // If no valid tiles are in the scope, remove the last layer
                    if (!isDefined(tiles.url) && isDefined(tileLayerObj)) {
                        map.removeLayer(tileLayerObj);
                        return;
                    }

                    // No leafletTiles object defined yet
                    if (!isDefined(tileLayerObj)) {
                        if (isDefined(tiles.options)) {
                            angular.copy(tiles.options, tileLayerOptions);
                        }

                        if (isDefined(tiles.url)) {
                            tileLayerUrl = tiles.url;
                        }

                        tileLayerObj = L.tileLayer(tileLayerUrl, tileLayerOptions);
                        tileLayerObj.addTo(map);
                        leafletData.setTiles(tileLayerObj, attrs.id);
                        return;
                    }

                    // If the options of the tilelayer is changed, we need to redraw the layer
                    if (isDefined(tiles.url) && isDefined(tiles.options) && !angular.equals(tiles.options, tileLayerOptions)) {
                        map.removeLayer(tileLayerObj);
                        tileLayerOptions = defaults.tileLayerOptions;
                        angular.copy(tiles.options, tileLayerOptions);
                        tileLayerUrl = tiles.url;
                        tileLayerObj = L.tileLayer(tileLayerUrl, tileLayerOptions);
                        tileLayerObj.addTo(map);
                        leafletData.setTiles(tileLayerObj, attrs.id);
                        return;
                    }

                    // Only the URL of the layer is changed, update the tiles object
                    if (isDefined(tiles.url)) {
                        tileLayerObj.setUrl(tiles.url);
                    }
                }, true);
            });
        }
    };
});

/*
    Create multiple similar directives for watchOptions to support directiveControl
    instead. (when watches are disabled)
    NgAnnotate does not work here due to the functional creation
*/
['markers', 'geojson'].forEach(function(name){
    angular.module("leaflet-directive").directive(name + 'WatchOptions', [
        '$log', '$rootScope', '$q', 'leafletData', 'leafletHelpers',
        function ($log, $rootScope, $q, leafletData, leafletHelpers) {

            var isDefined = leafletHelpers.isDefined,
                errorHeader = leafletHelpers.errorHeader,
                isObject = leafletHelpers.isObject,
                _watchOptions = leafletHelpers.watchOptions;

            return {
                restrict: "A",
                scope: false,
                replace: false,
                require: ['leaflet'],

                link: function (scope, element, attrs, controller) {
                    var mapController = controller[0],
                        leafletScope = mapController.getLeafletScope();

                    mapController.getMap().then(function () {
                        if (isDefined(scope[name + 'WatchOptions'])) {
                            if (isObject(scope[name + 'WatchOptions']))
                                angular.extend(_watchOptions, scope[name + 'WatchOptions']);
                            else
                                $log.error(errorHeader + '[' + name + 'WatchOptions] is not an object');
                            leafletScope[name + 'WatchOptions'] = _watchOptions;
                        }
                    });
                }
            };
    }]);
});

angular.module("leaflet-directive")
.factory('leafletEventsHelpers', function ($rootScope, $q, $log, leafletHelpers) {
        var safeApply = leafletHelpers.safeApply,
            isDefined = leafletHelpers.isDefined;

        var _fire = function(scope, broadcastName, logic, event, lObject, model, modelName, layerName){
            // Safely broadcast the event
            safeApply(scope, function(){
                var toSend = {
                    leafletEvent: event,
                    leafletObject: lObject,
                    modelName: modelName,
                    model: model
                };
                if (isDefined(layerName))
                    angular.extend(toSend, {layerName: layerName});

                if (logic === "emit") {
                    scope.$emit(broadcastName, toSend);
                } else {
                    $rootScope.$broadcast(broadcastName, toSend);
                }
            });
        };

        return {
            fire: _fire
        }
});

angular.module("leaflet-directive")
.factory('leafletLabelEvents', function ($rootScope, $q, $log, leafletHelpers, leafletEventsHelpers) {
    var Helpers = leafletHelpers,
        fire = leafletEventsHelpers.fire;

    var _getAvailableLabelEvents = function () {
        return [
            'click',
            'dblclick',
            'mousedown',
            'mouseover',
            'mouseout',
            'contextmenu'
        ];
    };

    var _genDispatchLabelEvent = function (eventName, logic, leafletScope, label, name, model, layerName) {
        return function (e) {
            // Put together broadcast name
            var broadcastName = 'leafletDirectiveLabel.' + eventName;
            var markerName = scope_watch_name.replace('markers.', '');
            fire(leafletScope, broadcastName, logic, e, label, model, markerName, layerName);
        };
    };


    var _genLabelEvents = function (eventName, logic, leafletScope, lObject, name, model, layerName) {
        var labelEvents = _getAvailableLabelEvents();
        var scopeWatchName = Helpers.getObjectArrayPath("markers." + name);
        for (var i = 0; i < labelEvents.length; i++) {
            var eventName = labelEvents[i];
            lObject.label.on(eventName,
                _genDispatchLabelEvent(
                    eventName, logic, leafletScope, lObject.label, scopeWatchName, model, layerName));
        }
    };

    return {
        getAvailableLabelEvents: _getAvailableLabelEvents,
        genDispatchLabelEvent: _genDispatchLabelEvent,
        genLabelEvents: _genLabelEvents
    };
});

angular.module("leaflet-directive")
.factory('leafletMapEvents', function ($rootScope, $q, $log, leafletHelpers, leafletEventsHelpers) {
    var safeApply = leafletHelpers.safeApply,
        isDefined = leafletHelpers.isDefined,
        isObject = leafletHelpers.isObject,
        Helpers = leafletHelpers,
        errorHeader = leafletHelpers.errorHeader,
        fire = leafletEventsHelpers.fire;

    var _getAvailableMapEvents = function() {
        return [
            'click',
            'dblclick',
            'mousedown',
            'mouseup',
            'mouseover',
            'mouseout',
            'mousemove',
            'contextmenu',
            'focus',
            'blur',
            'preclick',
            'load',
            'unload',
            'viewreset',
            'movestart',
            'move',
            'moveend',
            'dragstart',
            'drag',
            'dragend',
            'zoomstart',
            'zoomend',
            'zoomlevelschange',
            'resize',
            'autopanstart',
            'layeradd',
            'layerremove',
            'baselayerchange',
            'overlayadd',
            'overlayremove',
            'locationfound',
            'locationerror',
            'popupopen',
            'popupclose',
            'draw:created',
            'draw:edited',
            'draw:deleted',
            'draw:drawstart',
            'draw:drawstop',
            'draw:editstart',
            'draw:editstop',
            'draw:deletestart',
            'draw:deletestop'
        ];
    };

    var _genDispatchMapEvent = function(scope, eventName, logic) {
        return function(e) {
            // Put together broadcast name
            var broadcastName = 'leafletDirectiveMap.' + eventName;
            // Safely broadcast the event
            fire(scope, broadcastName, logic, e, e.target, scope)
        };
    };

    var _notifyCenterChangedToBounds = function(scope) {
        scope.$broadcast("boundsChanged");
    };

    var _notifyCenterUrlHashChanged = function(scope, map, attrs, search) {
        if (!isDefined(attrs.urlHashCenter)) {
            return;
        }
        var center = map.getCenter();
        var centerUrlHash = (center.lat).toFixed(4) + ":" + (center.lng).toFixed(4) + ":" + map.getZoom();
        if (!isDefined(search.c) || search.c !== centerUrlHash) {
            //$log.debug("notified new center...");
            scope.$emit("centerUrlHash", centerUrlHash);
        }
    };

    return {
        getAvailableMapEvents: _getAvailableMapEvents,
        genDispatchMapEvent: _genDispatchMapEvent,
        notifyCenterChangedToBounds: _notifyCenterChangedToBounds,
        notifyCenterUrlHashChanged: _notifyCenterUrlHashChanged
    };
});

angular.module("leaflet-directive")
.factory('leafletMarkerEvents', function ($rootScope, $q, $log, leafletHelpers, leafletEventsHelpers, leafletLabelEvents) {
    var safeApply = leafletHelpers.safeApply,
        isDefined = leafletHelpers.isDefined,
        isObject = leafletHelpers.isObject,
        Helpers = leafletHelpers,
        errorHeader = leafletHelpers.errorHeader,
        fire = leafletEventsHelpers.fire,
        lblHelp = leafletLabelEvents;

    /*
     argument: name: Note this can be a single string or dot notation
     Example:
     markerModel : {
     m1: { lat:_, lon: _}
     }
     //would yield name of
     name = "m1"

     If nested:
     markerModel : {
     cars: {
     m1: { lat:_, lon: _}
     }
     }
     //would yield name of
     name = "cars.m1"
     */
    var _genDispatchMarkerEvent = function (eventName, logic, leafletScope, lObject, name, model, layerName) {
        return function (e) {
            var broadcastName = 'leafletDirectiveMarker.' + eventName;

            // Broadcast old marker click name for backwards compatibility
            if (eventName === "click") {
                safeApply(leafletScope, function () {
                    $rootScope.$broadcast('leafletDirectiveMarkersClick', name);
                });
            } else if (eventName === 'dragend') {
                safeApply(leafletScope, function () {
                    model.lat = lObject.getLatLng().lat;
                    model.lng = lObject.getLatLng().lng;
                });
                if (model.message && model.focus === true) {
                    lObject.openPopup();
                }
            }

            fire(leafletScope, broadcastName, logic, e, e.target || lObject, model, name, layerName);
        };
    };

    var _getAvailableMarkerEvents = function () {
        return [
            'click',
            'dblclick',
            'mousedown',
            'mouseover',
            'mouseout',
            'contextmenu',
            'dragstart',
            'drag',
            'dragend',
            'move',
            'remove',
            'popupopen',
            'popupclose'
        ];
    };

    return {
        getAvailableMarkerEvents: _getAvailableMarkerEvents,

        bindMarkerEvents: function (lObject, name, model, leafletScope, layerName) {
            var markerEvents = [];
            var i;
            var eventName;
            var logic = "emit";

            if (!isDefined(leafletScope.eventBroadcast)) {
                // Backward compatibility, if no event-broadcast attribute, all events are broadcasted
                markerEvents = _getAvailableMarkerEvents();
            } else if (!isObject(leafletScope.eventBroadcast)) {
                // Not a valid object
                $log.error(errorHeader + "event-broadcast must be an object check your model.");
            } else {
                // We have a possible valid object
                if (!isDefined(leafletScope.eventBroadcast.marker)) {
                    // We do not have events enable/disable do we do nothing (all enabled by default)
                    markerEvents = _getAvailableMarkerEvents();
                } else if (!isObject(leafletScope.eventBroadcast.marker)) {
                    // Not a valid object
                    $log.warn(errorHeader + "event-broadcast.marker must be an object check your model.");
                } else {
                    // We have a possible valid map object
                    // Event propadation logic
                    if (leafletScope.eventBroadcast.marker.logic !== undefined && leafletScope.eventBroadcast.marker.logic !== null) {
                        // We take care of possible propagation logic
                        if (leafletScope.eventBroadcast.marker.logic !== "emit" && leafletScope.eventBroadcast.marker.logic !== "broadcast") {
                            // This is an error
                            $log.warn(errorHeader + "Available event propagation logic are: 'emit' or 'broadcast'.");
                        } else if (leafletScope.eventBroadcast.marker.logic === "emit") {
                            logic = "emit";
                        }
                    }
                    // Enable / Disable
                    var markerEventsEnable = false, markerEventsDisable = false;
                    if (leafletScope.eventBroadcast.marker.enable !== undefined && leafletScope.eventBroadcast.marker.enable !== null) {
                        if (typeof leafletScope.eventBroadcast.marker.enable === 'object') {
                            markerEventsEnable = true;
                        }
                    }
                    if (leafletScope.eventBroadcast.marker.disable !== undefined && leafletScope.eventBroadcast.marker.disable !== null) {
                        if (typeof leafletScope.eventBroadcast.marker.disable === 'object') {
                            markerEventsDisable = true;
                        }
                    }
                    if (markerEventsEnable && markerEventsDisable) {
                        // Both are active, this is an error
                        $log.warn(errorHeader + "can not enable and disable events at the same time");
                    } else if (!markerEventsEnable && !markerEventsDisable) {
                        // Both are inactive, this is an error
                        $log.warn(errorHeader + "must enable or disable events");
                    } else {
                        // At this point the marker object is OK, lets enable or disable events
                        if (markerEventsEnable) {
                            // Enable events
                            for (i = 0; i < leafletScope.eventBroadcast.marker.enable.length; i++) {
                                eventName = leafletScope.eventBroadcast.marker.enable[i];
                                // Do we have already the event enabled?
                                if (markerEvents.indexOf(eventName) !== -1) {
                                    // Repeated event, this is an error
                                    $log.warn(errorHeader + "This event " + eventName + " is already enabled");
                                } else {
                                    // Does the event exists?
                                    if (_getAvailableMarkerEvents().indexOf(eventName) === -1) {
                                        // The event does not exists, this is an error
                                        $log.warn(errorHeader + "This event " + eventName + " does not exist");
                                    } else {
                                        // All ok enable the event
                                        markerEvents.push(eventName);
                                    }
                                }
                            }
                        } else {
                            // Disable events
                            markerEvents = _getAvailableMarkerEvents();
                            for (i = 0; i < leafletScope.eventBroadcast.marker.disable.length; i++) {
                                eventName = leafletScope.eventBroadcast.marker.disable[i];
                                var index = markerEvents.indexOf(eventName);
                                if (index === -1) {
                                    // The event does not exist
                                    $log.warn(errorHeader + "This event " + eventName + " does not exist or has been already disabled");

                                } else {
                                    markerEvents.splice(index, 1);
                                }
                            }
                        }
                    }
                }
            }

            for (i = 0; i < markerEvents.length; i++) {
                eventName = markerEvents[i];
                lObject.on(eventName,
                    _genDispatchMarkerEvent(eventName, logic, leafletScope, lObject, name, model, layerName));
            }

            if (Helpers.LabelPlugin.isLoaded() && isDefined(lObject.label)) {
                lblHelp.genLabelEvents(name, logic, leafletScope, lObject, model, layerName);
            }
        }
    };
});

angular.module("leaflet-directive")
.factory('leafletPathEvents', function ($rootScope, $q, $log, leafletHelpers, leafletLabelEvents, leafletEventsHelpers) {
    var safeApply = leafletHelpers.safeApply,
        isDefined = leafletHelpers.isDefined,
        isObject = leafletHelpers.isObject,
        Helpers = leafletHelpers,
        errorHeader = leafletHelpers.errorHeader,
        lblHelp = leafletLabelEvents,
        fire = leafletEventsHelpers.fire;

    var _genDispatchPathEvent = function (eventName, logic, leafletScope, lObject, name, model, layerName) {
        return function (e) {
            var broadcastName = 'leafletDirectivePath.' + eventName;

            fire(leafletScope, broadcastName, logic, e, e.target || lObject, model, name, layerName);
        };
    };

    var _bindPathEvents = function (lObject, name, model, leafletScope) {
        var pathEvents = [],
            i,
            eventName,
            logic = "broadcast";

        if (!isDefined(leafletScope.eventBroadcast)) {
            // Backward compatibility, if no event-broadcast attribute, all events are broadcasted
            pathEvents = _getAvailablePathEvents();
        } else if (!isObject(leafletScope.eventBroadcast)) {
            // Not a valid object
            $log.error(errorHeader + "event-broadcast must be an object check your model.");
        } else {
            // We have a possible valid object
            if (!isDefined(leafletScope.eventBroadcast.path)) {
                // We do not have events enable/disable do we do nothing (all enabled by default)
                pathEvents = _getAvailablePathEvents();
            } else if (isObject(leafletScope.eventBroadcast.paths)) {
                // Not a valid object
                $log.warn(errorHeader + "event-broadcast.path must be an object check your model.");
            } else {
                // We have a possible valid map object
                // Event propadation logic
                if (leafletScope.eventBroadcast.path.logic !== undefined && leafletScope.eventBroadcast.path.logic !== null) {
                    // We take care of possible propagation logic
                    if (leafletScope.eventBroadcast.path.logic !== "emit" && leafletScope.eventBroadcast.path.logic !== "broadcast") {
                        // This is an error
                        $log.warn(errorHeader + "Available event propagation logic are: 'emit' or 'broadcast'.");
                    } else if (leafletScope.eventBroadcast.path.logic === "emit") {
                        logic = "emit";
                    }
                }
                // Enable / Disable
                var pathEventsEnable = false, pathEventsDisable = false;
                if (leafletScope.eventBroadcast.path.enable !== undefined && leafletScope.eventBroadcast.path.enable !== null) {
                    if (typeof leafletScope.eventBroadcast.path.enable === 'object') {
                        pathEventsEnable = true;
                    }
                }
                if (leafletScope.eventBroadcast.path.disable !== undefined && leafletScope.eventBroadcast.path.disable !== null) {
                    if (typeof leafletScope.eventBroadcast.path.disable === 'object') {
                        pathEventsDisable = true;
                    }
                }
                if (pathEventsEnable && pathEventsDisable) {
                    // Both are active, this is an error
                    $log.warn(errorHeader + "can not enable and disable events at the same time");
                } else if (!pathEventsEnable && !pathEventsDisable) {
                    // Both are inactive, this is an error
                    $log.warn(errorHeader + "must enable or disable events");
                } else {
                    // At this point the path object is OK, lets enable or disable events
                    if (pathEventsEnable) {
                        // Enable events
                        for (i = 0; i < leafletScope.eventBroadcast.path.enable.length; i++) {
                            eventName = leafletScope.eventBroadcast.path.enable[i];
                            // Do we have already the event enabled?
                            if (pathEvents.indexOf(eventName) !== -1) {
                                // Repeated event, this is an error
                                $log.warn(errorHeader + "This event " + eventName + " is already enabled");
                            } else {
                                // Does the event exists?
                                if (_getAvailablePathEvents().indexOf(eventName) === -1) {
                                    // The event does not exists, this is an error
                                    $log.warn(errorHeader + "This event " + eventName + " does not exist");
                                } else {
                                    // All ok enable the event
                                    pathEvents.push(eventName);
                                }
                            }
                        }
                    } else {
                        // Disable events
                        pathEvents = _getAvailablePathEvents();
                        for (i = 0; i < leafletScope.eventBroadcast.path.disable.length; i++) {
                            eventName = leafletScope.eventBroadcast.path.disable[i];
                            var index = pathEvents.indexOf(eventName);
                            if (index === -1) {
                                // The event does not exist
                                $log.warn(errorHeader + "This event " + eventName + " does not exist or has been already disabled");

                            } else {
                                pathEvents.splice(index, 1);
                            }
                        }
                    }
                }
            }
        }

        for (i = 0; i < pathEvents.length; i++) {
            eventName = pathEvents[i];
            lObject.on(eventName, _genDispatchPathEvent(eventName, logic, leafletScope, pathEvents, name));
        }

        if (Helpers.LabelPlugin.isLoaded() && isDefined(lObject.label)) {
            lblHelp.genLabelEvents(leafletScope, logic, lObject, name);
        }
    };

    var _getAvailablePathEvents = function () {
        return [
            'click',
            'dblclick',
            'mousedown',
            'mouseover',
            'mouseout',
            'contextmenu',
            'add',
            'remove',
            'popupopen',
            'popupclose'
        ];
    };

    return {
        getAvailablePathEvents: _getAvailablePathEvents,
        bindPathEvents: _bindPathEvents
    };
});

}(angular));
//# sourceMappingURL=angular-leaflet-directive_dev_mapped.js.map