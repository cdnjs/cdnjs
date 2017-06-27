(function() {

"use strict";

angular.module("leaflet-directive", []).directive('leaflet', function ($log, $q, leafletData, leafletMapDefaults, leafletHelpers, leafletEvents) {
    var _leafletMap;
    return {
        restrict: "EA",
        replace: true,
        scope: {
            center: '=center',
            defaults: '=defaults',
            maxBounds: '=maxbounds',
            bounds: '=bounds',
            marker: '=marker',
            markers: '=markers',
            legend: '=legend',
            geojson: '=geojson',
            paths: '=paths',
            tiles: '=tiles',
            layers: '=layers',
            controls: '=controls',
            eventBroadcast: '=eventBroadcast',
            watchMarkers: '=watchmarkers'
        },
        template: '<div class="angular-leaflet-map"></div>',
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

            // If we are going to set maxBounds, undefine the minZoom property
            if (isDefined(scope.maxBounds)) {
                defaults.minZoom = undefined;
            }

            // Set width and height if they are defined
            if (isDefined(attrs.width)) {
                if (isNaN(attrs.width)) {
                    element.css('width', attrs.width);
                } else {
                    element.css('width', attrs.width + 'px');
                }
            }
            if (isDefined(attrs.height)) {
                if (isNaN(attrs.height)) {
                    element.css('height', attrs.height);
                } else {
                    element.css('height', attrs.height + 'px');
                }
            }

            // Create the Leaflet Map Object with the options
            var map = new L.Map(element[0], leafletMapDefaults.getMapCreationDefaults(attrs.id));
            _leafletMap.resolve(map);

            if (!isDefined(attrs.center)) {
                $log.warn("[AngularJS - Leaflet] 'center' is undefined in the current scope, did you forget to initialize it?");
                map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
            }

            // If no layers nor tiles defined, set the default tileLayer
            if (!isDefined(attrs.tiles) && (!isDefined(attrs.layers))) {
                var tileLayerObj = L.tileLayer(defaults.tileLayer, defaults.tileLayerOptions);
                tileLayerObj.addTo(map);
                leafletData.setTiles(tileLayerObj);
            }

            // Set zoom control configuration
            if (isDefined(map.zoomControl) && isDefined(defaults.zoomControlPosition)) {
                map.zoomControl.setPosition(defaults.zoomControlPosition);
            }
            
            if(isDefined(map.zoomControl) && defaults.zoomControl===false) {
                map.zoomControl.removeFrom(map);
            }

            if(isDefined(map.zoomsliderControl) && isDefined(defaults.zoomsliderControl) && defaults.zoomsliderControl===false) {
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
        }
    };
});

angular.module("leaflet-directive").directive('center', function ($log, $parse, leafletMapDefaults, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var isDefined     = leafletHelpers.isDefined,
                safeApply     = leafletHelpers.safeApply,
                isValidCenter = leafletHelpers.isValidCenter,
                leafletScope  = controller.getLeafletScope(),
                center        = leafletScope.center;

            controller.getMap().then(function(map) {
                var defaults = leafletMapDefaults.getDefaults(attrs.id);
                if (isDefined(center)) {
                    if (center.autoDiscover === true) {
                        map.locate({ setView: true, maxZoom: defaults.maxZoom });
                    }

                    var centerModel = {
                        lat:  $parse("center.lat"),
                        lng:  $parse("center.lng"),
                        zoom: $parse("center.zoom")
                    };
                } else {
                    $log.warn("[AngularJS - Leaflet] 'center' is undefined in the current scope, did you forget to initialize it?");
                    map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                }

                var movingMap = false;

                leafletScope.$watch("center", function(center) {
                    if (!isValidCenter(center)) {
                        $log.warn("[AngularJS - Leaflet] invalid 'center'");
                        map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                        return;
                    }
                    if (movingMap) {
                        // Can't update. The map is moving.
                        return;
                    }
                    map.setView([center.lat, center.lng], center.zoom);
                }, true);

                map.on("movestart", function(/* event */) {
                    movingMap = true;
                });

                map.on("moveend", function(/* event */) {
                    movingMap = false;
                    safeApply(leafletScope, function(scope) {
                        if (centerModel) {
                            centerModel.lat.assign(scope, map.getCenter().lat);
                            centerModel.lng.assign(scope, map.getCenter().lng);
                            centerModel.zoom.assign(scope, map.getZoom());
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

angular.module("leaflet-directive").directive('legend', function ($log, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var isArray      = leafletHelpers.isArray,
                leafletScope = controller.getLeafletScope(),
                legend       = leafletScope.legend;

            controller.getMap().then(function(map) {
                if (!isArray(legend.colors) || !isArray(legend.labels) || legend.colors.length !== legend.labels.length) {
                    $log.warn("[AngularJS - Leaflet] legend.colors and legend.labels must be set.");
                } else {
                    var legendClass = legend.legendClass ? legend.legendClass : "legend";
                    var position = legend.position || 'bottomright';
                    var leafletLegend = L.control({ position: position });
                    leafletLegend.onAdd = function (/*map*/) {
                        var div = L.DomUtil.create('div', legendClass);
                        for (var i = 0; i < legend.colors.length; i++) {
                            div.innerHTML +=
                                '<div><i style="background:' + legend.colors[i] + '"></i>' + legend.labels[i] + '</div>';
                        }
                        return div;
                    };
                    leafletLegend.addTo(map);
                }
            });
        }
    };
});

angular.module("leaflet-directive").directive('geojson', function ($log, $rootScope, leafletData, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var safeApply = leafletHelpers.safeApply,
                isDefined = leafletHelpers.isDefined,
                leafletScope  = controller.getLeafletScope(),
                leafletGeoJSON = {};

            controller.getMap().then(function(map) {
                leafletScope.$watch("geojson", function(geojson) {
                    if (isDefined(leafletGeoJSON) && map.hasLayer(leafletGeoJSON)) {
                        map.removeLayer(leafletGeoJSON);
                    }

                    if (!(isDefined(geojson) && isDefined(geojson.data))) {
                        return;
                    }

                    var resetStyleOnMouseout = geojson.resetStyleOnMouseout,
                        onEachFeature = geojson.onEachFeature;

                    if (!onEachFeature) {
                        onEachFeature = function(feature, layer) {
                            if (leafletHelpers.LabelPlugin.isLoaded() && isDefined(geojson.label)) {
                                layer.bindLabel(feature.properties.description);
                            }

                            layer.on({
                                mouseover: function(e) {
                                    safeApply(leafletScope, function() {
                                        geojson.selected = feature;
                                        $rootScope.$broadcast('leafletDirectiveMap.geojsonMouseover', e);
                                    });
                                },
                                mouseout: function(e) {
                                    if (resetStyleOnMouseout) {
                                        leafletGeoJSON.resetStyle(e.target);
                                    }
                                    safeApply(leafletScope, function() {
                                        geojson.selected = undefined;
                                        $rootScope.$broadcast('leafletDirectiveMap.geojsonMouseout', e);
                                    });
                                },
                                click: function(e) {
                                    safeApply(leafletScope, function() {
                                        $rootScope.$broadcast('leafletDirectiveMap.geojsonClick', geojson.selected, e);
                                    });
                                }
                            });
                        };
                    }

                    geojson.options = {
                        style: geojson.style,
                        onEachFeature: onEachFeature
                    };

                    leafletGeoJSON = L.geoJson(geojson.data, geojson.options);
                    leafletData.setGeoJSON(leafletGeoJSON);
                    leafletGeoJSON.addTo(map);
                });
            });
        }
    };
});

angular.module("leaflet-directive").directive('layers', function ($log, $q, leafletData, leafletHelpers, leafletMapDefaults, leafletLayerHelpers) {
    var _leafletLayers;

    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',
        controller: function () {
            _leafletLayers = $q.defer();
            this.getLayers = function() {
                return _leafletLayers.promise;
            };
        },
        link: function(scope, element, attrs, controller) {
            var isDefined = leafletHelpers.isDefined,
                isDefinedAndNotNull = leafletHelpers.isDefinedAndNotNull,
                leafletLayers = {},
                leafletScope  = controller.getLeafletScope(),
                layers = leafletScope.layers,
                createLayer = leafletLayerHelpers.createLayer;

            controller.getMap().then(function(map) {
                var defaults = leafletMapDefaults.getDefaults(attrs.id);
                
				$log.log(defaults);

                // Do we have a baselayers property?
                if (!isDefined(layers) || !isDefined(layers.baselayers) || Object.keys(layers.baselayers).length === 0) {
                    // No baselayers property
                    $log.error('[AngularJS - Leaflet] At least one baselayer has to be defined');
                    return;
                }

                // We have baselayers to add to the map
                _leafletLayers.resolve(leafletLayers);
                leafletData.setLayers(leafletLayers, attrs.id);

				/*
				 * if(defaults) {
					var controlOptions = {
						collapsed: defaults.layercontrol && defaults.layercontrol.collapsed
					};
					if(defaults.layercontrol && defaults.layercontrol.control) {
						layers.controls.layers =
							defaults.layercontrol.control.apply(this, [[], [], controlOptions]);
					} else {
						layers.controls.layers = new L.control.layers([[], [], controlOptions]);
					}
					
					if(defaults.layercontrol && defaults.layercontrol.position) {
						layers.controls.layers.setPosition(defaults.layercontrol.position);
					}
                }
				 */

                leafletLayers.baselayers = {};
                leafletLayers.controls = {};
                leafletLayers.controls.layers = new L.control.layers();
                leafletLayers.controls.layers.setPosition(defaults.controlLayersPosition);
                leafletLayers.controls.layers.addTo(map);


                // Setup all baselayers definitions
                var top = false;
                for (var layerName in layers.baselayers) {
                    var newBaseLayer = createLayer(layers.baselayers[layerName]);
                    if (newBaseLayer !== null) {
                        leafletLayers.baselayers[layerName] = newBaseLayer;
                        // Only add the visible layer to the map, layer control manages the addition to the map
                        // of layers in its control
                        if (layers.baselayers[layerName].top === true) {
                            map.addLayer(leafletLayers.baselayers[layerName]);
                            top = true;
                        }
                        leafletLayers.controls.layers.addBaseLayer(leafletLayers.baselayers[layerName], layers.baselayers[layerName].name);
                    }
                }

                // If there is no visible layer add first to the map
                if (!top && Object.keys(leafletLayers.baselayers).length > 0) {
                    map.addLayer(leafletLayers.baselayers[Object.keys(layers.baselayers)[0]]);
                }
                // Setup the Overlays
                leafletLayers.overlays = {};
                for (layerName in layers.overlays) {
                    var newOverlayLayer = createLayer(layers.overlays[layerName]);
                    if (newOverlayLayer !== null) {
                        leafletLayers.overlays[layerName] = newOverlayLayer;
                        // Only add the visible layer to the map, layer control manages the addition to the map
                        // of layers in its control
                        if (layers.overlays[layerName].visible === true) {
                            map.addLayer(leafletLayers.overlays[layerName]);
                        }
                        leafletLayers.controls.layers.addOverlay(leafletLayers.overlays[layerName], layers.overlays[layerName].name);
                    }
                }

                // Watch for the base layers
                leafletScope.$watch('layers.baselayers', function(newBaseLayers) {
                    // Delete layers from the array
                    for (var name in leafletLayers.baselayers) {
                        if (newBaseLayers[name] === undefined) {
                            // Remove the layer from the control
                            leafletLayers.controls.layers.removeLayer(leafletLayers.baselayers[name]);
                            // Remove from the map if it's on it
                            if (map.hasLayer(leafletLayers.baselayers[name])) {
                                map.removeLayer(leafletLayers.baselayers[name]);
                            }
                            delete leafletLayers.baselayers[name];
                        }
                    }
                    // add new layers
                    for (var new_name in newBaseLayers) {
                        if (leafletLayers.baselayers[new_name] === undefined) {
                            var testBaseLayer = createLayer(newBaseLayers[new_name]);
                            if (testBaseLayer !== null) {
                                leafletLayers.baselayers[new_name] = testBaseLayer;
                                // Only add the visible layer to the map, layer control manages the addition to the map
                                // of layers in its control
                                if (newBaseLayers[new_name].top === true) {
                                    map.addLayer(leafletLayers.baselayers[new_name]);
                                }
                                leafletLayers.controls.layers.addBaseLayer(leafletLayers.baselayers[new_name], newBaseLayers[new_name].name);
                            }
                        }
                    }
                    if (Object.keys(leafletLayers.baselayers).length <= 0) {
                        // No baselayers property
                        $log.error('[AngularJS - Leaflet] At least one baselayer has to be defined');
                    } else {
                        //we have layers, so we need to make, at least, one active
                        var found = false;
                        // serach for an active layer
                        for (var key in leafletLayers.baselayers) {
                            if (map.hasLayer(leafletLayers.baselayers[key])) {
                                found = true;
                                break;
                            }
                        }
                        // If there is no active layer make one active
                        if (!found) {
                            map.addLayer(leafletLayers.baselayers[Object.keys(layers.baselayers)[0]]);
                        }
                    }
                }, true);

                // Watch for the overlay layers
                leafletScope.$watch('layers.overlays', function(newOverlayLayers) {
                    // Delete layers from the array
                    for (var name in leafletLayers.overlays) {
                        if (!isDefined(newOverlayLayers[name])) {
                            // Remove the layer from the control
                            leafletLayers.controls.layers.removeLayer(leafletLayers.overlays[name]);
                            // Remove from the map if it's on it
                            if (map.hasLayer(leafletLayers.overlays[name])) {
                                map.removeLayer(leafletLayers.overlays[name]);
                            }
                            // TODO: Depending on the layer type we will have to delete what's included on it
                            delete leafletLayers.overlays[name];
                        }
                    }
                    // add new layers
                    for (var new_name in newOverlayLayers) {
                        if (!isDefined(leafletLayers.overlays[new_name])) {
                            var testOverlayLayer = createLayer(newOverlayLayers[new_name]);
                            if (isDefinedAndNotNull(testOverlayLayer)) {
                                leafletLayers.overlays[new_name] = testOverlayLayer;
                                leafletLayers.controls.layers.addOverlay(leafletLayers.overlays[new_name], newOverlayLayers[new_name].name);
                                if (newOverlayLayers[new_name].visible === true) {
                                    map.addLayer(leafletLayers.overlays[new_name]);
                                }
                            }
                        }
                    }
                }, true);
            });
        }
    };
});

angular.module("leaflet-directive").directive('bounds', function ($log, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var isDefined = leafletHelpers.isDefined,
                createLeafletBounds = leafletHelpers.createLeafletBounds,
                leafletScope = controller.getLeafletScope();

            controller.getMap().then(function(map) {

                function updateBoundsInScope() {
                    if(!leafletScope.bounds) { return; }

                    var mapBounds = map.getBounds();
                    var newScopeBounds = {
                        northEast: {
                            lat: mapBounds.getNorthEast().lat,
                            lng: mapBounds.getNorthEast().lng
                        },
                        southWest: {
                            lat: mapBounds.getSouthWest().lat,
                            lng: mapBounds.getSouthWest().lng
                        }
                    };

                    if(!angular.equals(leafletScope.bounds, newScopeBounds)) {
                        leafletScope.bounds = newScopeBounds;
                    }
                }

                function boundsListener(newBounds) {
                    if (!isDefined(newBounds)) {
                        $log.error('[AngularJS - Leaflet] Invalid bounds');
                        return;
                    }

                    var leafletBounds = createLeafletBounds(newBounds);
                    if (leafletBounds && !map.getBounds().equals(leafletBounds)) {
                        map.fitBounds(leafletBounds);
                    }
                }

                map.on('moveend', updateBoundsInScope);
                map.on('dragend', updateBoundsInScope);
                map.on('zoomend', updateBoundsInScope);

                map.whenReady(function() {
                    leafletScope.$watch('bounds', boundsListener, true);
                });
            });
        }
    };
});

angular.module("leaflet-directive").directive('markers', function ($log, $rootScope, $q, leafletData, leafletHelpers, leafletMapDefaults, leafletEvents) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: ['leaflet', '?layers'],

        link: function(scope, element, attrs, controller) {
            var mapController = controller[0],
                Helpers = leafletHelpers,
                isDefined = leafletHelpers.isDefined,
                isDefinedAndNotNull = leafletHelpers.isDefinedAndNotNull,
                MarkerClusterPlugin = leafletHelpers.MarkerClusterPlugin,
                isString = leafletHelpers.isString,
                isNumber  = leafletHelpers.isNumber,
                safeApply = leafletHelpers.safeApply,
                leafletScope  = mapController.getLeafletScope(),
                markers = leafletScope.markers,
                availableMarkerEvents = leafletEvents.getAvailableMarkerEvents();

            mapController.getMap().then(function(map) {
                var defaults = leafletMapDefaults.getDefaults(attrs.id),
                    leafletMarkers = {},
                    groups = {},
                    getLayers;

                if (isDefined(controller[1])) {
                    getLayers = controller[1].getLayers;
                } else {
                    getLayers = function() {
                        var deferred = $q.defer();
                        deferred.resolve();
                        return deferred.promise;
                    };
                }

                // Default leaflet icon object used in all markers as a default
                var LeafletIcon = L.Icon.extend({
                    options: {
                        iconUrl: defaults.icon.url,
                        iconRetinaUrl: defaults.icon.retinaUrl,
                        iconSize: defaults.icon.size,
                        iconAnchor: defaults.icon.anchor,
                        labelAnchor: defaults.icon.labelAnchor,
                        popupAnchor: defaults.icon.popup,
                        shadowUrl: defaults.icon.shadow.url,
                        shadowRetinaUrl: defaults.icon.shadow.retinaUrl,
                        shadowSize: defaults.icon.shadow.size,
                        shadowAnchor: defaults.icon.shadow.anchor
                    }
                });

                if (!isDefined(markers)) {
                    return;
                }

                var shouldWatch = (
                    leafletScope.watchMarkers === undefined ||
                    leafletScope.watchMarkers === 'true' || leafletScope.watchMarkers === true
                );

                getLayers().then(function(layers) {
                    leafletData.setMarkers(leafletMarkers, attrs.id);
                    leafletScope.$watch('markers', function(newMarkers) {

                        function deleteMarker(name) {
                            var marker = leafletMarkers[name];

                            // First we check if the marker is in a layer group
                            marker.closePopup();
                            // There is no easy way to know if a marker is added to a layer, so we search for it
                            // if there are overlays
                            if (isDefinedAndNotNull(layers)) {
                                if (isDefined(layers.overlays)) {
                                    for (var key in layers.overlays) {
                                        if (layers.overlays[key] instanceof L.LayerGroup) {
                                            if (layers.overlays[key].hasLayer(marker)) {
                                                layers.overlays[key].removeLayer(marker);
                                            }
                                        }
                                    }
                                }
                            }
                            if (isDefinedAndNotNull(groups)) {
                                for (var groupKey in groups) {
                                    if (groups[groupKey].hasLayer(marker)) {
                                        groups[groupKey].removeLayer(marker);
                                    }
                                }
                            }

                            // Remove the marker from the map
                            map.removeLayer(marker);
                            // TODO: If we remove the marker we don't have to clear the $watches?
                            // Delete the marker
                            delete leafletMarkers[name];
                        }

                        var noNewMarkers = !isDefined(newMarkers);
                        // Delete markers from the array
                        for (var name in leafletMarkers) {
                            var markerRemoved = !isDefined(newMarkers[name]);
                            if (noNewMarkers || markerRemoved) {
                                deleteMarker(name);
                            }
                        }

                        // add new markers
                        for (var new_name in newMarkers) {
                            if (!isDefined(leafletMarkers[new_name])) {
                                var newMarker = createMarker('markers.'+new_name, newMarkers[new_name], map);
                                if (newMarker !== null) {
                                    leafletMarkers[new_name] = newMarker;
                                }
                            }
                        }
                    }, shouldWatch);

                    function createMarker(scope_watch_name, marker_data, map) {
                        var marker = buildMarker(marker_data);

                        // Marker belongs to a layer group?
                        if (!isDefined(marker_data.layer)) {

                            if (isDefined(marker_data.group)) {
                                if (!MarkerClusterPlugin.isLoaded()) {
                                    $log.error("[AngularJS - Leaflet] The MarkerCluster plugin is not loaded.");
                                    return;
                                }
                                if (!isDefined(groups[marker_data.group])) {
                                    groups[marker_data.group] = new L.MarkerClusterGroup();
                                    map.addLayer(groups[marker_data.group]);
                                }
                                groups[marker_data.group].addLayer(marker);
                            } else {
                                // We do not have a layer attr, so the marker goes to the map layer
                                map.addLayer(marker);
                            }

                            if (leafletHelpers.LabelPlugin.isLoaded() && isDefined(marker_data.label) && isDefined(marker_data.label.options)) {
                                if (marker_data.label.options.noHide === true) {
                                    marker.showLabel();
                                }
                            }

                            if (marker_data.focus === true) {
                                marker.openPopup();
                            }

                        } else if (isString(marker_data.layer)) {
                            if (isDefinedAndNotNull(layers)) {
                                // We have layers so continue testing
                                if (isDefinedAndNotNull(layers.overlays)) {
                                    // There is a layer name so we will try to add it to the layer, first does the layer exists
                                    if (isDefinedAndNotNull(layers.overlays[marker_data.layer])) {
                                        // Is a group layer?
                                        var layerGroup = layers.overlays[marker_data.layer];
                                        if (layerGroup instanceof L.LayerGroup) {
                                            // The marker goes to a correct layer group, so first of all we add it
                                            layerGroup.addLayer(marker);
                                            // The marker is automatically added to the map depending on the visibility
                                            // of the layer, so we only have to open the popup if the marker is in the map
                                            if (map.hasLayer(marker)) {
                                                if (marker_data.focus === true) {
                                                    marker.openPopup();
                                                }
                                            }
                                        } else {
                                            $log.error('[AngularJS - Leaflet] A marker can only be added to a layer of type "group"');
                                            return null;
                                        }
                                    } else {
                                        $log.error('[AngularJS - Leaflet] You must use a name of an existing layer');
                                        return null;
                                    }
                                } else {
                                    $log.error('[AngularJS - Leaflet] You must add layers overlays to the directive if used in a marker');
                                    return null;
                                }
                            } else {
                                $log.error('[AngularJS - Leaflet] You must add layers to the directive if used in a marker');
                                return null;
                            }
                        } else {
                            $log.error('[AngularJS - Leaflet] A layername must be a string');
                            return null;
                        }

                        function genDispatchEventCB(eventName, logic) {
                            return function(e) {
                                var broadcastName = 'leafletDirectiveMarker.' + eventName;
                                var markerName = scope_watch_name.replace('markers.', '');

                                // Broadcast old marker click name for backwards compatibility
                                if (eventName === "click") {
                                    safeApply(leafletScope, function() {
                                        $rootScope.$broadcast('leafletDirectiveMarkersClick', markerName);
                                    });
                                } else if (eventName === 'dragend') {
                                    safeApply(leafletScope, function() {
                                        marker_data.lat = marker.getLatLng().lat;
                                        marker_data.lng = marker.getLatLng().lng;
                                    });
                                    if (marker_data.message) {
                                        if (marker_data.focus === true) {
                                            marker.openPopup();
                                        }
                                    }
                                }

                                safeApply(leafletScope, function(scope){
                                    if (logic === "emit") {
                                        scope.$emit(broadcastName, {
                                            markerName: markerName,
                                            leafletEvent: e
                                        });
                                    } else {
                                        $rootScope.$broadcast(broadcastName, {
                                            markerName: markerName,
                                            leafletEvent: e
                                        });
                                    }
                                });
                            };
                        }

                        var markerEvents = [];
                        var i;
                        var eventName;
                        var logic = "broadcast";

                        if (leafletScope.eventBroadcast === undefined || leafletScope.eventBroadcast === null) {
                            // Backward compatibility, if no event-broadcast attribute, all events are broadcasted
                            markerEvents = availableMarkerEvents;
                        } else if (typeof leafletScope.eventBroadcast !== 'object') {
                            // Not a valid object
                            $log.warn("[AngularJS - Leaflet] event-broadcast must be an object check your model.");
                        } else {
                            // We have a possible valid object
                            if (leafletScope.eventBroadcast.marker === undefined || leafletScope.eventBroadcast.marker === null) {
                                // We do not have events enable/disable do we do nothing (all enabled by default)
                                markerEvents = availableMarkerEvents;
                            } else if (typeof leafletScope.eventBroadcast.marker !== 'object') {
                                // Not a valid object
                                $log.warn("[AngularJS - Leaflet] event-broadcast.marker must be an object check your model.");
                            } else {
                                // We have a possible valid map object
                                // Event propadation logic
                                if (leafletScope.eventBroadcast.marker.logic !== undefined && leafletScope.eventBroadcast.marker.logic !== null) {
                                    // We take care of possible propagation logic
                                    if (leafletScope.eventBroadcast.marker.logic !== "emit" && leafletScope.eventBroadcast.marker.logic !== "broadcast") {
                                        // This is an error
                                        $log.warn("[AngularJS - Leaflet] Available event propagation logic are: 'emit' or 'broadcast'.");
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
                                    $log.warn("[AngularJS - Leaflet] can not enable and disable events at the same time");
                                } else if (!markerEventsEnable && !markerEventsDisable) {
                                    // Both are inactive, this is an error
                                    $log.warn("[AngularJS - Leaflet] must enable or disable events");
                                } else {
                                    // At this point the marker object is OK, lets enable or disable events
                                    if (markerEventsEnable) {
                                        // Enable events
                                        for (i = 0; i < leafletScope.eventBroadcast.marker.enable.length; i++) {
                                            eventName = leafletScope.eventBroadcast.marker.enable[i];
                                            // Do we have already the event enabled?
                                            if (markerEvents.indexOf(eventName) !== -1) {
                                                // Repeated event, this is an error
                                                $log.warn("[AngularJS - Leaflet] This event " + eventName + " is already enabled");
                                            } else {
                                                // Does the event exists?
                                                if (availableMarkerEvents.indexOf(eventName) === -1) {
                                                    // The event does not exists, this is an error
                                                    $log.warn("[AngularJS - Leaflet] This event " + eventName + " does not exist");
                                                } else {
                                                    // All ok enable the event
                                                    markerEvents.push(eventName);
                                                }
                                            }
                                        }
                                    } else {
                                        // Disable events
                                        markerEvents = availableMarkerEvents;
                                        for (i = 0; i < leafletScope.eventBroadcast.marker.disable.length; i++) {
                                            eventName = leafletScope.eventBroadcast.marker.disable[i];
                                            var index = markerEvents.indexOf(eventName);
                                            if (index === -1) {
                                                // The event does not exist
                                                $log.warn("[AngularJS - Leaflet] This event " + eventName + " does not exist or has been already disabled");
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
                            marker.on(eventName, genDispatchEventCB(eventName, logic), {
                                eventName: eventName,
                                scope_watch_name: scope_watch_name
                            });
                        }

                        if(shouldWatch) {
                            var clearWatch = leafletScope.$watch(scope_watch_name, function(data, old_data) {
                                if (!isDefinedAndNotNull(data)) {
                                    marker.closePopup();
                                    // There is no easy way to know if a marker is added to a layer, so we search for it
                                    // if there are overlays
                                    if (isDefinedAndNotNull(layers)) {
                                        if (isDefined(layers.overlays)) {
                                            for (var key in layers.overlays) {
                                                if (layers.overlays[key] instanceof L.LayerGroup) {
                                                    if (layers.overlays[key].hasLayer(marker)) {
                                                        layers.overlays[key].removeLayer(marker);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    map.removeLayer(marker);
                                    clearWatch();
                                    return;
                                }

                                if (isDefined(old_data)) {

                                    //TODO Check for layers !== null
                                    //TODO Check for layers.overlays !== null !== undefined
                                    // It is possible the the layer has been removed or the layer marker does not exist

                                    // Update the layer group if present or move it to the map if not
                                    if (!isString(data.layer)) {
                                        // There is no layer information, we move the marker to the map if it was in a layer group
                                        if (isString(old_data.layer)) {
                                            // Remove from the layer group that is supposed to be
                                            if (isDefined(layers.overlays[old_data.layer])) {
                                                if (layers.overlays[old_data.layer].hasLayer(marker)) {
                                                    layers.overlays[old_data.layer].removeLayer(marker);
                                                    // If the marker had a popup we close it because we do not know if the popup in on the map
                                                    // or on the layer group. This is ineficient, but as we can't check if the popup is opened
                                                    // in Leaflet we can't determine if it has to be open in the new layer. So removing the
                                                    // layer group of a marker always closes the popup.
                                                    // TODO: Improve popup behaviour when removing a marker from a layer group
                                                    marker.closePopup();
                                                }
                                            }
                                            // Test if it is not on the map and add it
                                            if (!map.hasLayer(marker)) {
                                                map.addLayer(marker);
                                            }
                                        }
                                    } else if (isDefinedAndNotNull(old_data.layer) || old_data.layer !== data.layer) {
                                        // If it was on a layer group we have to remove it
                                        if (typeof old_data.layer === 'string') {
                                            if (layers.overlays[old_data.layer] !== undefined) {
                                                if (layers.overlays[old_data.layer].hasLayer(marker)) {
                                                    layers.overlays[old_data.layer].removeLayer(marker);
                                                }
                                            }
                                        }
                                        // If the marker had a popup we close it because we do not know how the new layer
                                        // will be. This is ineficient, but as we can't check if the opoup is opened in Leaflet
                                        // we can't determine if it has to be open in the new layer. So changing the layer group
                                        // of a marker always closes the popup.
                                        // TODO: Improve popup behaviour when changing a marker from a layer group
                                        marker.closePopup();
                                        // Remove it from the map in case the new layer is hidden or there is an error in the new layer
                                        if (map.hasLayer(marker)) {
                                            map.removeLayer(marker);
                                        }
                                        // The data.layer is defined so we add the marker to the layer if it is different from the old data
                                        if (layers.overlays[data.layer] !== undefined) {
                                            // Is a group layer?
                                            var layerGroup = layers.overlays[data.layer];
                                            if (layerGroup instanceof L.LayerGroup) {
                                                // The marker goes to a correct layer group, so first of all we add it
                                                layerGroup.addLayer(marker);
                                                // The marker is automatically added to the map depending on the visibility
                                                // of the layer, so we only have to open the popup if the marker is in the map
                                                if (map.hasLayer(marker)) {
                                                    if (data.focus === true) {
                                                        marker.openPopup();
                                                    }
                                                }
                                            } else {
                                                $log.error('[AngularJS - Leaflet] A marker can only be added to a layer of type "group"');
                                            }
                                        } else {
                                            $log.error('[AngularJS - Leaflet] You must use a name of an existing layer');
                                        }
                                    } else {
                                        // Never has to enter here...
                                    }

                                    // Update the draggable property
                                    if (data.draggable === undefined || data.draggable === null || data.draggable !== true) {
                                        // If there isn't or wasn't the draggable property or is false and previously true update the dragging
                                        // the !== true prevents for not boolean values in the draggable property
                                        if (old_data.draggable !== undefined && old_data.draggable !== null && old_data.draggable === true) {
                                            if (marker.dragging) {
                                                marker.dragging.disable();
                                            }
                                        }
                                    } else if (old_data.draggable === undefined || old_data.draggable === null || old_data.draggable !== true) {
                                        // The data.draggable property must be true so we update if there wasn't a previous value or it wasn't true
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
                                    if (data.icon === undefined || data.icon === null || typeof data.icon !== 'object') {
                                        // If there is no icon property or it's not an object
                                        if (old_data.icon !== undefined && old_data.icon !== null && typeof old_data.icon === 'object') {
                                            // If there was an icon before restore to the default
                                            marker.setIcon(new LeafletIcon());
                                            marker.closePopup();
                                            marker.unbindPopup();
                                            if (data.message !== undefined && data.message !== null && typeof data.message === 'string' && data.message !== "") {
                                                marker.bindPopup(data.message);
                                            }
                                        }
                                    } else if (old_data.icon === undefined || old_data.icon === null || typeof old_data.icon !== 'object') {
                                        // The data.icon exists so we create a new icon if there wasn't an icon before
                                        var dragA = false;
                                        if (marker.dragging) {
                                            dragA = marker.dragging.enabled();
                                        }
                                        if (Helpers.AwesomeMarkersPlugin.is(data.icon)) {
                                            // This icon is a L.AwesomeMarkers.Icon so it is using the AwesomeMarker PlugIn
                                            marker.setIcon(data.icon);
                                            // As the new icon creates a new DOM object some elements, as drag, are reseted.
                                        } else if (Helpers.Leaflet.DivIcon.is(data.icon) || Helpers.Leaflet.Icon.is(data.icon)) {
                                            // This is a Leaflet.DivIcon or a Leaflet.Icon
                                            marker.setIcon(data.icon);
                                        } else {
                                            // This icon is a icon set in the model trough options
                                            marker.setIcon(new LeafletIcon(data.icon));
                                        }
                                        if (dragA) {
                                            marker.dragging.enable();
                                        }
                                        marker.closePopup();
                                        marker.unbindPopup();
                                        if (data.message !== undefined && data.message !== null && typeof data.message === 'string' && data.message !== "") {
                                            marker.bindPopup(data.message);
                                        }
                                    } else {
                                        if (Helpers.AwesomeMarkersPlugin.is(data.icon)) {
                                            // This icon is a L.AwesomeMarkers.Icon so it is using the AwesomeMarker PlugIn
                                            if (!Helpers.AwesomeMarkersPlugin.equal(data.icon, old_data.icon)) {
                                                var dragD = false;
                                                if (marker.dragging) {
                                                    dragD = marker.dragging.enabled();
                                                }
                                                marker.setIcon(data.icon);
                                                // As the new icon creates a new DOM object some elements, as drag, are reseted.
                                                if (dragD) {
                                                    marker.dragging.enable();
                                                }
                                                //TODO: Improve depending on anchorPopup
                                                marker.closePopup();
                                                marker.unbindPopup();
                                                if (data.message !== undefined && data.message !== null && typeof data.message === 'string' && data.message !== "") {
                                                    marker.bindPopup(data.message);
                                                }
                                            }
                                        } else if (Helpers.Leaflet.DivIcon.is(data.icon)) {
                                            // This is a Leaflet.DivIcon
                                            if (!Helpers.Leaflet.DivIcon.equal(data.icon, old_data.icon)) {
                                                var dragE = false;
                                                if (marker.dragging) {
                                                    dragE = marker.dragging.enabled();
                                                }
                                                marker.setIcon(data.icon);
                                                // As the new icon creates a new DOM object some elements, as drag, are reseted.
                                                if (dragE) {
                                                    marker.dragging.enable();
                                                }
                                                //TODO: Improve depending on anchorPopup
                                                marker.closePopup();
                                                marker.unbindPopup();
                                                if (data.message !== undefined && data.message !== null && typeof data.message === 'string' && data.message !== "") {
                                                    marker.bindPopup(data.message);
                                                }
                                            }
                                        } else if (Helpers.Leaflet.Icon.is(data.icon)) {
                                            // This is a Leaflet.DivIcon
                                            if (!Helpers.Leaflet.Icon.equal(data.icon, old_data.icon)) {
                                                var dragF = false;
                                                if (marker.dragging) {
                                                    dragF = marker.dragging.enabled();
                                                }
                                                marker.setIcon(data.icon);
                                                // As the new icon creates a new DOM object some elements, as drag, are reseted.
                                                if (dragF) {
                                                    marker.dragging.enable();
                                                }
                                                //TODO: Improve depending on anchorPopup
                                                marker.closePopup();
                                                marker.unbindPopup();
                                                if (data.message !== undefined && data.message !== null && typeof data.message === 'string' && data.message !== "") {
                                                    marker.bindPopup(data.message);
                                                }
                                            }
                                        } else {
                                            // This icon is an icon defined in the marker model through options
                                            // There is an icon and there was an icon so if they are different we create a new icon
                                            if (JSON.stringify(data.icon) !== JSON.stringify(old_data.icon)) {
                                                var dragG = false;
                                                if (marker.dragging) {
                                                    dragG = marker.dragging.enabled();
                                                }
                                                marker.setIcon(new LeafletIcon(data.icon));
                                                if (dragG) {
                                                    marker.dragging.enable();
                                                }
                                                //TODO: Improve depending on anchorPopup
                                                marker.closePopup();
                                                marker.unbindPopup();
                                                if (data.message !== undefined && data.message !== null && typeof data.message === 'string' && data.message !== "") {
                                                    marker.bindPopup(data.message);
                                                }
                                            }
                                        }
                                    }

                                    // Update the Popup message property
                                    if (data.message === undefined || data.message === null || typeof data.message !== 'string' || data.message === "") {
                                        // There is no popup to show, so if it has previously existed it must be unbinded
                                        if (old_data.message !== undefined && old_data.message !== null && typeof old_data.message === 'string' && old_data.message !== "") {
                                            marker.closePopup();
                                            marker.unbindPopup();
                                        }
                                    } else {
                                        // There is some text in the popup, so we must show the text or update existing
                                        if (old_data.message === undefined || old_data.message === null || typeof old_data.message !== 'string' || old_data.message === "") {
                                            // There was no message before so we create it
                                            marker.bindPopup(data.message);
                                            if (data.focus === true) {
                                                // If the focus is set, we must open the popup, because we do not know if it was opened before
                                                marker.openPopup();
                                            }
                                        } else if (data.message !== old_data.message) {
                                            // There was a different previous message so we update it
                                            marker.setPopupContent(data.message);
                                        }
                                    }

                                    // Update the focus property
                                    if (data.focus === undefined || data.focus === null || data.focus !== true) {
                                        // If there is no focus property or it's false
                                        if (old_data.focus !== undefined && old_data.focus !== null && old_data.focus === true) {
                                            // If there was a focus property and was true we turn it off
                                            marker.closePopup();
                                        }
                                    } else if (old_data.focus === undefined || old_data.focus === null || old_data.focus !== true) {
                                        // The data.focus property must be true so we update if there wasn't a previous value or it wasn't true
                                        marker.openPopup();
                                    } else if(old_data.focus === true && data.focus === true){
                                        // Reopen the popup when focus is still true
                                        marker.openPopup();
                                    }

                                    // Update the lat-lng property (always present in marker properties)
                                    if (!(isNumber(data.lat) && isNumber(data.lng))) {
                                        $log.warn('There are problems with lat-lng data, please verify your marker model');
                                        // Remove the marker from the layers and map if it is not valid
                                        if (isDefinedAndNotNull(layers)) {
                                            if (isDefinedAndNotNull(layers.overlays)) {
                                                for (var olname in layers.overlays) {
                                                    if (layers.overlays[olname] instanceof L.LayerGroup || Helpers.MarkerClusterPlugin.is(layers.overlays[olname])) {
                                                        if (layers.overlays[olname].hasLayer(marker)) {
                                                            layers.overlays[olname].removeLayer(marker);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        map.removeLayer(marker);
                                    } else {
                                        var cur_latlng = marker.getLatLng();
                                        // On dragend event, scope will be updated, which
                                        // triggers this watch expression. Then we call
                                        // setLatLng and triggers move event on marker and
                                        // causes digest already in progress error.
                                        //
                                        // This check is to make sure we don't trigger move
                                        // event manually after dragend, which is redundant
                                        // anyway. Because before dragend event fired, marker
                                        // sate is already updated by leaflet.
                                        if (cur_latlng.lat !== data.lat || cur_latlng.lng !== data.lng) {
                                            // if the marker is in a clustermarker layer it has to be removed and added again to the layer
                                            var isCluster = false;
                                            if (isString(data.layer)) {
                                                if (Helpers.MarkerClusterPlugin.is(layers.overlays[data.layer])) {
                                                    layers.overlays[data.layer].removeLayer(marker);
                                                    isCluster = true;
                                                }
                                            }
                                            marker.setLatLng([data.lat, data.lng]);
                                            if (isCluster) {
                                                layers.overlays[data.layer].addLayer(marker);
                                            }
                                        }
                                    }
                                }
                            }, true);
                        }
                        return marker;
                    }

                    function buildMarker(data) {
                        var micon = null;
                        if (data.icon) {
                            micon = data.icon;
                        } else {
                            micon = new LeafletIcon();
                        }
                        var moptions = {
                            icon: micon,
                            draggable: data.draggable ? true : false,
                            clickable: isDefined(data.clickable) ? data.clickable : true,
                            riseOnHover: isDefined(data.riseOnHover) ? data.riseOnHover : false
                        };
                        if (data.title) {
                            moptions.title = data.title;
                        }
                        var marker = new L.marker(data, moptions);

                        if (data.message) {
                            marker.bindPopup(data.message);
                        }
                        if (leafletHelpers.LabelPlugin.isLoaded() && isDefined(data.label) && isDefined(data.label.message)) {
                            marker.bindLabel(data.label.message, data.label.options);
                        }

                        return marker;
                    }
                });
            });
        }
    };
});

angular.module("leaflet-directive").directive('paths', function ($log, leafletData, leafletMapDefaults, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var isDefined = leafletHelpers.isDefined,
                leafletScope  = controller.getLeafletScope(),
                paths     = leafletScope.paths,
                convertToLeafletLatLng = leafletHelpers.convertToLeafletLatLng,
                convertToLeafletLatLngs = leafletHelpers.convertToLeafletLatLngs,
                convertToLeafletMultiLatLngs = leafletHelpers.convertToLeafletMultiLatLngs;

            controller.getMap().then(function(map) {
                var defaults = leafletMapDefaults.getDefaults(attrs.id);

                if (!isDefined(paths)) {
                    return;
                }

                var leafletPaths = {};
                leafletData.setPaths(leafletPaths, attrs.id);

                scope.$watch("paths", function (newPaths) {
                    // Create the new paths
                    for (var new_name in newPaths) {
                        if (!isDefined(leafletPaths[new_name])) {
                            leafletPaths[new_name] = createPath(new_name, newPaths[new_name], map, defaults);
                        }
                    }

                    // Delete paths (by name) from the array
                    for (var name in leafletPaths) {
                        if (!isDefined(newPaths[name])) {
                            delete leafletPaths[name];
                        }
                    }
                }, true);

                function createPath(name, scopePath, map, defaults) {
                    var path;
                    var options = {
                        weight: defaults.path.weight,
                        color: defaults.path.color,
                        opacity: defaults.path.opacity
                    };
                    if(isDefined(scopePath.stroke)) {
                        options.stroke = scopePath.stroke;
                    }
                    if(isDefined(scopePath.fill)) {
                        options.fill = scopePath.fill;
                    }
                    if(isDefined(scopePath.fillColor)) {
                        options.fillColor = scopePath.fillColor;
                    }
                    if(isDefined(scopePath.fillOpacity)) {
                        options.fillOpacity = scopePath.fillOpacity;
                    }
                    if(isDefined(scopePath.smoothFactor)) {
                        options.smoothFactor = scopePath.smoothFactor;
                    }
                    if(isDefined(scopePath.noClip)) {
                        options.noClip = scopePath.noClip;
                    }
                    if(!isDefined(scopePath.type)) {
                        scopePath.type = "polyline";
                    }

                    function setPathOptions(data) {
                        if (isDefined(data.latlngs)) {
                            switch(data.type) {
                                default:
                                case "polyline":
                                case "polygon":
                                    path.setLatLngs(convertToLeafletLatLngs(data.latlngs));
                                    break;
                                case "multiPolyline":
                                case "multiPolygon":
                                    path.setLatLngs(convertToLeafletMultiLatLngs(data.latlngs));
                                    break;
                                case "rectangle":
                                    path.setBounds(new L.LatLngBounds(convertToLeafletLatLngs(data.latlngs)));
                                    break;
                                case "circle":
                                case "circleMarker":
                                    path.setLatLng(convertToLeafletLatLng(data.latlngs));
                                    if (isDefined(data.radius)) {
                                        path.setRadius(data.radius);
                                    }
                                    break;
                            }
                        }

                        if (isDefined(data.weight)) {
                            path.setStyle({ weight: data.weight });
                        }

                        if (isDefined(data.color)) {
                            path.setStyle({ color: data.color });
                        }

                        if (isDefined(data.opacity)) {
                            path.setStyle({ opacity: data.opacity });
                        }
                    }

                    switch(scopePath.type) {
                        default:
                        case "polyline":
                            path = new L.Polyline([], options);
                            break;
                        case "multiPolyline":
                            path = new L.multiPolyline([[[0,0],[1,1]]], options);
                            break;
                        case "polygon":
                            path = new L.Polygon([], options);
                            break;
                        case "multiPolygon":
                            path = new L.MultiPolygon([[[0,0],[1,1],[0,1]]], options);
                            break;
                        case "rectangle":
                            path = new L.Rectangle([[0,0],[1,1]], options);
                            break;
                        case "circle":
                            path = new L.Circle([0,0], 1, options);
                            break;
                        case "circleMarker":
                            path = new L.CircleMarker([0,0], options);
                            break;
                    }
                    map.addLayer(path);

                    var clearWatch = scope.$watch('paths.' + name, function(data) {
                        if (!isDefined(data)) {
                            map.removeLayer(path);
                            clearWatch();
                            return;
                        }
                        setPathOptions(data);
                    }, true);

                    return path;
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
                    var drawControl = new L.Control.Draw(controls.draw.options);
                    map.addControl(drawControl);
                }
                
                if(isDefined(controls.custom)) {
					for(var i = 0; i < controls.custom.length; i++) {
						map.addControl(controls.custom[i]);
					}
                }
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
                leafletScope  = controller.getLeafletScope(),
                eventBroadcast = leafletScope.eventBroadcast,
                availableMapEvents = leafletEvents.getAvailableMapEvents(),
                genDispatchMapEvent = leafletEvents.genDispatchMapEvent;

            controller.getMap().then(function(map) {

                var mapEvents = [];
                var i;
                var eventName;
                var logic = "broadcast";

                if (isObject(eventBroadcast)) {
                    // We have a possible valid object
                    if (eventBroadcast.map === undefined || eventBroadcast.map === null) {
                        // We do not have events enable/disable do we do nothing (all enabled by default)
                        mapEvents = availableMapEvents;
                    } else if (typeof eventBroadcast.map !== 'object') {
                        // Not a valid object
                        $log.warn("[AngularJS - Leaflet] event-broadcast.map must be an object check your model.");
                    } else {
                        // We have a possible valid map object
                        // Event propadation logic
                        if (eventBroadcast.map.logic !== undefined && eventBroadcast.map.logic !== null) {
                            // We take care of possible propagation logic
                            if (eventBroadcast.map.logic !== "emit" && eventBroadcast.map.logic !== "broadcast") {
                                // This is an error
                                $log.warn("[AngularJS - Leaflet] Available event propagation logic are: 'emit' or 'broadcast'.");
                            } else if (eventBroadcast.map.logic === "emit") {
                                logic = "emit";
                            }
                        }
                        // Enable / Disable
                        var mapEventsEnable = false, mapEventsDisable = false;
                        if (eventBroadcast.map.enable !== undefined && eventBroadcast.map.enable !== null) {
                            if (typeof eventBroadcast.map.enable === 'object') {
                                mapEventsEnable = true;
                            }
                        }
                        if (eventBroadcast.map.disable !== undefined && eventBroadcast.map.disable !== null) {
                            if (typeof eventBroadcast.map.disable === 'object') {
                                mapEventsDisable = true;
                            }
                        }
                        if (mapEventsEnable && mapEventsDisable) {
                            // Both are active, this is an error
                            $log.warn("[AngularJS - Leaflet] can not enable and disable events at the time");
                        } else if (!mapEventsEnable && !mapEventsDisable) {
                            // Both are inactive, this is an error
                            $log.warn("[AngularJS - Leaflet] must enable or disable events");
                        } else {
                            // At this point the map object is OK, lets enable or disable events
                            if (mapEventsEnable) {
                                // Enable events
                                for (i = 0; i < eventBroadcast.map.enable.length; i++) {
                                    eventName = eventBroadcast.map.enable[i];
                                    // Do we have already the event enabled?
                                    if (mapEvents.indexOf(eventName) !== -1) {
                                        // Repeated event, this is an error
                                        $log.warn("[AngularJS - Leaflet] This event " + eventName + " is already enabled");
                                    } else {
                                        // Does the event exists?
                                        if (availableMapEvents.indexOf(eventName) === -1) {
                                            // The event does not exists, this is an error
                                            $log.warn("[AngularJS - Leaflet] This event " + eventName + " does not exist");
                                        } else {
                                            // All ok enable the event
                                            mapEvents.push(eventName);
                                        }
                                    }
                                }
                            } else {
                                // Disable events
                                mapEvents = availableMapEvents;
                                for (i = 0; i < eventBroadcast.map.disable.length; i++) {
                                    eventName = eventBroadcast.map.disable[i];
                                    var index = mapEvents.indexOf(eventName);
                                    if (index === -1) {
                                        // The event does not exist
                                        $log.warn("[AngularJS - Leaflet] This event " + eventName + " does not exist or has been already disabled");
                                    } else {
                                        mapEvents.splice(index, 1);
                                    }
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
                } else {
                    // Not a valid object
                    $log.warn("[AngularJS - Leaflet] event-broadcast must be an object, check your model.");
                }
            });
        }
    };
});

angular.module("leaflet-directive").directive('maxbounds', function ($log, leafletMapDefaults, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var leafletScope  = controller.getLeafletScope(),
                isValidBounds = leafletHelpers.isValidBounds;


            controller.getMap().then(function(map) {
                leafletScope.$watch("maxBounds", function (maxBounds) {
                    if (!isValidBounds(maxBounds)) {
                        // Unset any previous maxbounds
                        map.setMaxBounds();
                        return;
                    }
                    map.setMaxBounds(
                        new L.LatLngBounds(
                            new L.LatLng(maxBounds.southWest.lat, maxBounds.southWest.lng),
                            new L.LatLng(maxBounds.northEast.lat, maxBounds.northEast.lng)
                        ),
                        maxBounds.options
                    );
                });
            });
        }
    };
});

angular.module("leaflet-directive").service('leafletData', function ($log, $q, leafletHelpers) {
    var getDefer = leafletHelpers.getDefer,
        getUnresolvedDefer = leafletHelpers.getUnresolvedDefer,
        setResolvedDefer = leafletHelpers.setResolvedDefer;

    var maps = {};
    var tiles = {};
    var layers = {};
    var paths = {};
    var markers = {};
    var geoJSON = {};

    this.setMap = function(leafletMap, scopeId) {
        var defer = getUnresolvedDefer(maps, scopeId);
        defer.resolve(leafletMap);
        setResolvedDefer(maps, scopeId);
    };

    this.getMap = function(scopeId) {
        var defer = getDefer(maps, scopeId);
        return defer.promise;
    };

    this.getPaths = function(scopeId) {
        var defer = getDefer(paths, scopeId);
        return defer.promise;
    };

    this.setPaths = function(leafletPaths, scopeId) {
        var defer = getUnresolvedDefer(paths, scopeId);
        defer.resolve(leafletPaths);
        setResolvedDefer(paths, scopeId);
    };

    this.getMarkers = function(scopeId) {
        var defer = getDefer(markers, scopeId);
        return defer.promise;
    };

    this.setMarkers = function(leafletMarkers, scopeId) {
        var defer = getUnresolvedDefer(markers, scopeId);
        defer.resolve(leafletMarkers);
        setResolvedDefer(markers, scopeId);
    };

    this.getLayers = function(scopeId) {
        var defer = getDefer(layers, scopeId);
        return defer.promise;
    };

    this.setLayers = function(leafletLayers, scopeId) {
        var defer = getUnresolvedDefer(layers, scopeId);
        defer.resolve(leafletLayers);
        setResolvedDefer(layers, scopeId);
    };

    this.setTiles = function(leafletTiles, scopeId) {
        var defer = getUnresolvedDefer(tiles, scopeId);
        defer.resolve(leafletTiles);
        setResolvedDefer(tiles, scopeId);
    };

    this.getTiles = function(scopeId) {
        var defer = getDefer(tiles, scopeId);
        return defer.promise;
    };

    this.setGeoJSON = function(leafletGeoJSON, scopeId) {
        var defer = getUnresolvedDefer(geoJSON, scopeId);
        defer.resolve(leafletGeoJSON);
        setResolvedDefer(geoJSON, scopeId);
    };

    this.getGeoJSON = function(scopeId) {
        var defer = getDefer(geoJSON, scopeId);
        return defer.promise;
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
            zoomControl: true,
            attributionControl: true,
            zoomsliderControl: false,
			layercontrol: {
				position:'topright',
				control: L.control.layers,
				collapsed: true
	        },
            controlLayersPosition: 'topright',
            crs: L.CRS.EPSG3857,
            tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            tileLayerOptions: {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            },
            icon: {
                url: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon.png',
                retinaUrl: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon-2x.png',
                size: [25, 41],
                anchor: [12, 40],
                labelAnchor: [10, -20],
                popup: [0, -40],
                shadow: {
                    url: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-shadow.png',
                    retinaUrl: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-shadow.png',
                    size: [41, 41],
                    anchor: [12, 40]
                }
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
                minZoom: d.minZoom,
                keyboard: d.keyboard,
                dragging: d.dragging,
                zoomControl: d.zoomControl,
                doubleClickZoom: d.doubleClickZoom,
                scrollWheelZoom: d.scrollWheelZoom,
                attributionControl: d.attributionControl,
                worldCopyJump: d.worldCopyJump,
                crs: d.crs
            };

            if (isDefined(d.zoomAnimation)) {
                mapDefaults.zoomAnimation = d.zoomAnimation;
            }

            if (isDefined(d.fadeAnimation)) {
                mapDefaults.fadeAnimation = d.fadeAnimation;
            }

            if (isDefined(d.markerZoomAnimation)) {
                mapDefaults.markerZoomAnimation = d.markerZoomAnimation;
            }

            return mapDefaults;
        },

        setDefaults: function(userDefaults, scopeId) {
            var newDefaults = _getDefaults();

            if (isDefined(userDefaults)) {
                newDefaults.doubleClickZoom = isDefined(userDefaults.doubleClickZoom) ?  userDefaults.doubleClickZoom : newDefaults.doubleClickZoom;
                newDefaults.scrollWheelZoom = isDefined(userDefaults.scrollWheelZoom) ?  userDefaults.scrollWheelZoom : newDefaults.doubleClickZoom;
                newDefaults.zoomControl = isDefined(userDefaults.zoomControl) ?  userDefaults.zoomControl : newDefaults.zoomControl;
				newDefaults.zoomsliderControl = isDefined(userDefaults.zoomsliderControl) ?  userDefaults.zoomsliderControl : newDefaults.zoomsliderControl;
                newDefaults.attributionControl = isDefined(userDefaults.attributionControl) ?  userDefaults.attributionControl : newDefaults.attributionControl;
                newDefaults.tileLayer = isDefined(userDefaults.tileLayer) ? userDefaults.tileLayer : newDefaults.tileLayer;
                newDefaults.zoomControlPosition = isDefined(userDefaults.zoomControlPosition) ? userDefaults.zoomControlPosition : newDefaults.zoomControlPosition;
                newDefaults.keyboard = isDefined(userDefaults.keyboard) ? userDefaults.keyboard : newDefaults.keyboard;
                newDefaults.dragging = isDefined(userDefaults.dragging) ? userDefaults.dragging : newDefaults.dragging;
                
                newDefaults.controlLayersPosition = isDefined(userDefaults.controlLayersPosition) ? userDefaults.controlLayersPosition : newDefaults.controlLayersPosition;

                if (isDefined(userDefaults.crs) && isDefined(L.CRS[userDefaults.crs])) {
                    newDefaults.crs = L.CRS[userDefaults.crs];
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
            }

            var mapId = obtainEffectiveMapId(defaults, scopeId);
            defaults[mapId] = newDefaults;
            return newDefaults;
        }
    };
});


angular.module("leaflet-directive").factory('leafletEvents', function ($rootScope, $q, leafletHelpers) {
    var safeApply = leafletHelpers.safeApply;

    return {
        getAvailableMapEvents: function() {
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
                'popupclose'
            ];
        },

        genDispatchMapEvent: function(scope, eventName, logic) {
            return function(e) {
                // Put together broadcast name
                var broadcastName = 'leafletDirectiveMap.' + eventName;
                // Safely broadcast the event
                safeApply(scope, function(scope) {
                    if (logic === "emit") {
                        scope.$emit(broadcastName, {
                            leafletEvent : e
                        });
                    } else if (logic === "broadcast") {
                        $rootScope.$broadcast(broadcastName, {
                            leafletEvent : e
                        });
                    }
                });
            };
        },
        getAvailableMarkerEvents: function() {
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
        },
        genDispatchMarkerEvent: function(scope, eventName, logic, markerName) {
            return function(e) {
                // Put together broadcast name
                var broadcastName = 'leafletDirectiveMarker.' + eventName;

                // Safely broadcast the event
                safeApply(scope, function(scope) {
                    if (logic === "emit") {
                        scope.$emit(broadcastName, {
                            leafletEvent : e,
                            markerName: markerName

                        });
                    } else if (logic === "broadcast") {
                        $rootScope.$broadcast(broadcastName, {
                            leafletEvent : e,
                            markerName: markerName
                        });
                    }
                });
            };
        }
    };
});


angular.module("leaflet-directive").factory('leafletLayerHelpers', function ($rootScope, $q, $log, leafletHelpers) {
    var Helpers = leafletHelpers,
        isString = leafletHelpers.isString;


    function createXyzLayer(url, options) {
        return L.tileLayer(url, options);
    }

    function createWmsLayer(url, options) {
        return L.tileLayer.wms(url, options);
    }
    
    function createWfsLayer(url, layerName, options) {
		if (Helpers.WFSLayerPlugin.isLoaded()) {
			if(options.crs && 'string' === typeof options.crs) {
				/*jshint -W061 */
				options.crs = eval(options.crs);
			}
			var layer = new L.GeoJSON.WFS(url, layerName, options);
			return layer;
		} else {
			return null;
		}
    }

    function createGroupLayer() {
        return L.layerGroup();
    }

    function createMarkerClusterLayer(options) {
        if (Helpers.MarkerClusterPlugin.isLoaded()) {
            return new L.MarkerClusterGroup(options);
        } else {
            return null;
        }
    }

    function createGoogleLayer(type, options) {
        type = type || 'SATELLITE';
        if (Helpers.GoogleLayerPlugin.isLoaded()) {
            return new L.Google(type, options);
        } else {
            return null;
        }
    }

    function createBingLayer(key, options) {
        if (Helpers.BingLayerPlugin.isLoaded()) {
            return new L.BingLayer(key, options);
        } else {
            return null;
        }
    }
    
    function createAGSLayer(url, options) {
		if (Helpers.AGSLayerPlugin.isLoaded()) {
			angular.extend(options, {
				url: url
			});
			var layer = new lvector.AGS(options);
			layer.onAdd = function(map) {
				this.setMap(map);
			};
			layer.onRemove = function() {
				this.setMap(null);
			};
			return layer;
		} else {
			return null;
        }
    }
    
    function createDynamicMapLayer(url, options) {
		if (Helpers.DynamicMapLayerPlugin.isLoaded()) {
			var layer = L.esri.dynamicMapLayer(url, options);
			return layer;
		} else {
			return null;
		}
	}

    function createImageOverlay(url, bounds, options) {
        return L.imageOverlay(url, bounds, options);
    }

    return {
        createLayer: function(layerDefinition) {
            // Check if the baselayer has a valid type
            if (!isString(layerDefinition.type)) {
                $log.error('[AngularJS - Leaflet] A base layer must have a type');
                return null;
            } else if (layerDefinition.type !== 'xyz' && layerDefinition.type !== 'wms' && layerDefinition.type !== 'wfs' && layerDefinition.type !== 'group' && layerDefinition.type !== 'markercluster' && layerDefinition.type !== 'google' && layerDefinition.type !== 'bing' && layerDefinition.type !== 'ags' && layerDefinition.type !== 'dynamic' && layerDefinition.type !== 'imageOverlay') {
                $log.error('[AngularJS - Leaflet] A layer must have a valid type: "xyz, wms, wfs, group, google, ags, dynamic"');
                return null;
            }
            if (layerDefinition.type === 'xyz' || layerDefinition.type === 'wms' || layerDefinition.type === 'wfs' || layerDefinition.type === 'imageOverlay' || layerDefinition.type === 'ags' || layerDefinition.type === 'dynamic') {
                // XYZ, WMS, WFS, AGS, Dynamic, must have an url
                if (!isString(layerDefinition.url)) {
                    $log.error('[AngularJS - Leaflet] A base layer must have an url');
                    return null;
                }
            }
            if(layerDefinition.type === 'wfs' && layerDefinition.layer === undefined) {
				$log.error('[AngularJS - Leaflet] A WFS layer must have an layer');
                return null;
            }
            if (layerDefinition.type === 'imageOverlay' && layerDefinition.bounds === undefined) {
                if (!isString(layerDefinition)) {
                    $log.error('[AngularJS - Leaflet] An imageOverlay layer must have bounds');
                    return null;
                }
            }
            if (!isString(layerDefinition.name)) {
                $log.error('[AngularJS - Leaflet] A base layer must have a name');
                return null;
            }
            if (layerDefinition.layerParams === undefined || layerDefinition.layerParams === null || typeof layerDefinition.layerParams !== 'object') {
                layerDefinition.layerParams = {};
            }
            if (layerDefinition.layerOptions === undefined || layerDefinition.layerOptions === null || typeof layerDefinition.layerOptions !== 'object') {
                layerDefinition.layerOptions = {};
            }

            // Mix the layer specific parameters with the general Leaflet options. Although this is an overhead
            // the definition of a base layers is more 'clean' if the two types of parameters are differentiated
            var layer = null;
            for (var attrname in layerDefinition.layerParams) {
                layerDefinition.layerOptions[attrname] = layerDefinition.layerParams[attrname];
            }
            switch (layerDefinition.type) {
                case 'xyz':
                    layer = createXyzLayer(layerDefinition.url, layerDefinition.layerOptions);
                    break;
                case 'wms':
                    layer = createWmsLayer(layerDefinition.url, layerDefinition.layerOptions);
                    break;
                case 'wfs':
					layer = createWfsLayer(layerDefinition.url, layerDefinition.layer, layerDefinition.layerOptions);
					break;
                case 'group':
                    layer = createGroupLayer();
                    break;
                case 'markercluster':
                    layer = createMarkerClusterLayer(layerDefinition.layerOptions);
                    break;
                case 'google':
                    layer = createGoogleLayer(layerDefinition.layerType, layerDefinition.layerOptions);
                    break;
                case 'bing':
                    layer = createBingLayer(layerDefinition.bingKey, layerDefinition.layerOptions);
                    break;
                case 'ags':
                    layer = createAGSLayer(layerDefinition.url, layerDefinition.layerOptions);
                    break;
				case 'dynamic':
					layer = createDynamicMapLayer(layerDefinition.url, layerDefinition.layerOptions);
					break;
                case 'imageOverlay':
                    layer = createImageOverlay(layerDefinition.url, layerDefinition.bounds, layerDefinition.layerOptions);
                    break;
                default:
                    layer = null;
            }

            //TODO Add $watch to the layer properties
            return layer;
        }
    };
});

angular.module("leaflet-directive").factory('leafletHelpers', function ($q, $log) {

    function _obtainEffectiveMapId(d, mapId) {
        var id, i;
        if (!angular.isDefined(mapId)) {
            if (Object.keys(d).length === 1) {
                for (i in d) {
                    if (d.hasOwnProperty(i)) {
                        id = i;
                    }
                }
            } else if (Object.keys(d).length === 0) {
                id = "main";
            } else {
                $log.error("[AngularJS - Leaflet] - You have more than 1 map on the DOM, you must provide the map ID to the leafletData.getXXX call");
            }
        } else {
            id = mapId;
        }

        return id;
    }

    function _isValidBounds(bounds) {
        return angular.isDefined(bounds) && angular.isDefined(bounds.southWest) &&
               angular.isDefined(bounds.northEast) && angular.isNumber(bounds.southWest.lat) &&
               angular.isNumber(bounds.southWest.lng) && angular.isNumber(bounds.northEast.lat) &&
               angular.isNumber(bounds.northEast.lng);
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

    function _convertToLeafletLatLngs(latlngs) {
        return latlngs.filter(function(latlng) {
            return !!latlng.lat && !!latlng.lng;
        }).map(function (latlng) {
            return new L.LatLng(latlng.lat, latlng.lng);
        });
    }

    return {
        // Determine if a reference is defined
        isDefined: function(value) {
            return angular.isDefined(value);
        },

        // Determine if a reference is a number
        isNumber: function(value) {
            return angular.isNumber(value);
        },

        // Determine if a reference is defined and not null
        isDefinedAndNotNull: function(value) {
            return angular.isDefined(value) && value !== null;
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

        // Determine if two objects have the same properties
        equals: function(o1, o2) {
            return angular.equals(o1, o2);
        },

        isValidCenter: function(center) {
            return angular.isDefined(center) && angular.isNumber(center.lat) &&
                   angular.isNumber(center.lng) && angular.isNumber(center.zoom);
        },

        isValidBounds: _isValidBounds,

        createLeafletBounds: function(bounds) {
            if (_isValidBounds(bounds)) {
                return L.latLngBounds([bounds.southWest.lat, bounds.southWest.lng],
                                      [bounds.northEast.lat, bounds.northEast.lng ]);
            } else {
                return false;
            }
        },

        convertToLeafletLatLngs: _convertToLeafletLatLngs,

        convertToLeafletLatLng: function(latlng) {
            return new L.LatLng(latlng.lat, latlng.lng);
        },

        convertToLeafletMultiLatLngs: function(paths) {
            return paths.map(function(latlngs) {
                return _convertToLeafletLatLngs(latlngs);
            });
        },

        safeApply: function($scope, fn) {
            var phase = $scope.$root.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                $scope.$eval(fn);
            } else {
                $scope.$apply(fn);
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

        AwesomeMarkersPlugin: {
            isLoaded: function() {
                if (L.AwesomeMarkers !== undefined) {
                    return (L.AwesomeMarkers.Icon !== undefined);
                } else {
                    return false;
                }
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
            },
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
            },
        },
		DynamicMapLayerPlugin: {
			isLoaded: function() {
				return L.esri !== undefined && L.esri.dynamicMapLayer !== undefined;
			},
			is: function(layer) {
				if (this.isLoaded()) {
					return layer instanceof L.esri.dynamicMapLayer;
				} else {
					return false;
				}
			},
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
        }
    };
});

}());