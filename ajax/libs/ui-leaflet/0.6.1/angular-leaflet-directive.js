var leafletDirective = angular.module("leaflet-directive", []);

leafletDirective.directive('leaflet', function ($http, $log, $parse, $rootScope) {

    var defaults = {
        maxZoom: 14,
        minZoom: 1,
        doubleClickZoom: true,
        scrollWheelZoom: true,
        keyboard: true,
        dragging: true,
        zoomControl: true,
        attributionControl: true,
        zoomsliderControl: false,
        controlLayersPosition: 'topright',
        tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        tileLayerOptions: {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        icon: {
            url: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon.png',
            retinaUrl: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon-2x.png',
            size: [25, 41],
            anchor: [12, 40],
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

    // Default leaflet icon object used in all markers as a default
    var LeafletIcon = L.Icon.extend({
        options: {
            iconUrl: defaults.icon.url,
            iconRetinaUrl: defaults.icon.retinaUrl,
            iconSize: defaults.icon.size,
            iconAnchor: defaults.icon.anchor,
            popupAnchor: defaults.icon.popup,
            shadowUrl: defaults.icon.shadow.url,
            shadowRetinaUrl: defaults.icon.shadow.retinaUrl,
            shadowSize: defaults.icon.shadow.size,
            shadowAnchor: defaults.icon.shadow.anchor
        }
    });

    var Helpers = {
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
                if (!this.isLoaded) {
                    $log.error('[AngularJS - Leaflet] AwesomeMarkers Plugin not Loaded');
                    return false;
                }
                if (this.is(iconA) && this.is(iconB)) {
                    return (iconA.options.icon === iconB.options.icon &&
                            iconA.options.iconColor === iconB.options.iconColor &&
                            iconA.options.color === iconB.options.color &&
                            iconA.options.iconSize[0] === iconB.options.iconSize[0] &&
                            iconA.options.iconSize[1] === iconB.options.iconSize[1] &&
                            iconA.options.iconAnchor[0] === iconB.options.iconAnchor[0] &&
                            iconA.options.iconAnchor[1] === iconB.options.iconAnchor[1] &&
                            iconA.options.popupAnchor[0] === iconB.options.popupAnchor[0] &&
                            iconA.options.popupAnchor[1] === iconB.options.popupAnchor[1] &&
                            iconA.options.shadowAnchor[0] === iconB.options.shadowAnchor[0] &&
                            iconA.options.shadowAnchor[1] === iconB.options.shadowAnchor[1] &&
                            iconA.options.shadowSize[0] === iconB.options.shadowSize[0] &&
                            iconA.options.shadowSize[1] === iconB.options.shadowSize[1]);
                } else {
                    return false;
                }
            }
        },
        MarkerClusterPlugin: {
            isLoaded: function() {
                return L.MarkerClusterGroup !== undefined;
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.MarkerClusterGroup;
                } else {
                    return false;
                }
            },
        },
        GoogleLayerPlugin: {
            isLoaded: function() {
                return L.Google !== undefined;
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.Google;
                } else {
                    return false;
                }
            },
        },
        BingLayerPlugin: {
            isLoaded: function() {
                return L.BingLayer !== undefined;
            },
            is: function(layer) {
                if (this.isLoaded()) {
                    return layer instanceof L.BingLayer;
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
                    if (this.is(iconA) && this.is(iconB)) {
                        return (iconA.options.html === iconB.options.html &&
                                iconA.options.iconSize[0] === iconB.options.iconSize[0] &&
                                iconA.options.iconSize[1] === iconB.options.iconSize[1] &&
                                iconA.options.iconAnchor[0] === iconB.options.iconAnchor[0] &&
                                iconA.options.iconAnchor[1] === iconB.options.iconAnchor[1]);
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
                    if (this.is(iconA) && this.is(iconB)) {
                        return (iconA.options.iconUrl === iconB.options.iconUrl &&
                                iconA.options.iconRetinaUrl === iconB.options.iconRetinaUrl &&
                                iconA.options.iconSize[0] === iconB.options.iconSize[0] &&
                                iconA.options.iconSize[1] === iconB.options.iconSize[1] &&
                                iconA.options.iconAnchor[0] === iconB.options.iconAnchor[0] &&
                                iconA.options.iconAnchor[1] === iconB.options.iconAnchor[1] &&
                                iconA.options.shadowUrl === iconB.options.shadowUrl &&
                                iconA.options.shadowRetinaUrl === iconB.options.shadowRetinaUrl &&
                                iconA.options.shadowSize[0] === iconB.options.shadowSize[0] &&
                                iconA.options.shadowSize[1] === iconB.options.shadowSize[1] &&
                                iconA.options.shadowAnchor[0] === iconB.options.shadowAnchor[0] &&
                                iconA.options.shadowAnchor[1] === iconB.options.shadowAnchor[1] &&
                                iconA.options.popupAnchor[0] === iconB.options.popupAnchor[0] &&
                                iconA.options.popupAnchor[1] === iconB.options.popupAnchor[1]);
                    } else {
                        return false;
                    }
                }
            }

        }
    };

    var str_inspect_hint = 'Add testing="testing" to <leaflet> tag to inspect this object';

    return {
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            center: '=center',
            maxBounds: '=maxbounds',
            bounds: '=bounds',
            marker: '=marker',
            markers: '=markers',
            legend: '=legend',
            geojson: '=geojson',
            defaults: '=defaults',
            paths: '=paths',
            tiles: '=tiles',
            events: '=events',
            layers: '=layers',
            customControls: '=customControls',
            leafletMap: '=leafletmap',
            eventBroadcast: '=eventBroadcast'
        },
        template: '<div class="angular-leaflet-map" ng-transclude></div>',
        link: function ($scope, element, attrs /*, ctrl */) {
            if (attrs.width) {
                if (isNaN(attrs.width)) {
                    element.css('width', attrs.width);
                } else {
                    element.css('width', attrs.width + 'px');
                }
            }
            if (attrs.height) {
                if (isNaN(attrs.height)) {
                    element.css('height', attrs.height);
                } else {
                    element.css('height', attrs.height + 'px');
                }
            }

            $scope.leaflet = {};

            $scope.leaflet.maxZoom = !!(attrs.defaults && $scope.defaults && $scope.defaults.maxZoom) ?
                parseInt($scope.defaults.maxZoom, 10) : defaults.maxZoom;
            $scope.leaflet.minZoom = !!(attrs.defaults && $scope.defaults && $scope.defaults.minZoom) ?
                parseInt($scope.defaults.minZoom, 10) : defaults.minZoom;
            $scope.leaflet.doubleClickZoom = !!(attrs.defaults && $scope.defaults && (typeof($scope.defaults.doubleClickZoom) === "boolean") ) ? $scope.defaults.doubleClickZoom  : defaults.doubleClickZoom;
            $scope.leaflet.scrollWheelZoom = !!(attrs.defaults && $scope.defaults && (typeof($scope.defaults.scrollWheelZoom) === "boolean") ) ? $scope.defaults.scrollWheelZoom  : defaults.scrollWheelZoom;
            $scope.leaflet.keyboard = !!(attrs.defaults && $scope.defaults && (typeof($scope.defaults.keyboard) === "boolean") ) ? $scope.defaults.keyboard  : defaults.keyboard;
            $scope.leaflet.dragging = !!(attrs.defaults && $scope.defaults && (typeof($scope.defaults.dragging) === "boolean") ) ? $scope.defaults.dragging  : defaults.dragging;
            $scope.leaflet.attributionControl = !!(attrs.defaults && $scope.defaults && (typeof($scope.defaults.attributionControl) === "boolean") ) ? $scope.defaults.attributionControl : defaults.attributionControl;

            overrideMinZoomIfMaxBoundsSet();
            var map = new L.Map(element[0], {
                maxZoom: $scope.leaflet.maxZoom,
                minZoom: $scope.leaflet.minZoom,
                doubleClickZoom: $scope.leaflet.doubleClickZoom,
                scrollWheelZoom: $scope.leaflet.scrollWheelZoom,
                keyboard: $scope.leaflet.keyboard,
                dragging: $scope.leaflet.dragging,
                attributionControl: $scope.leaflet.attributionControl
            });
            var layers = null;

            $scope.leaflet.map = !!attrs.testing ? map : str_inspect_hint;

            if (!!attrs.leafletmap) {
                $scope.leafletMap = !!attrs.leafletmap ? map : str_inspect_hint;
            }

            setupMapEventCallbacks();
            setupMapEventBroadcasting();
            setupControls();
            setupLegend();
            setupCustomControls();
            setupLayers();
            setupCenter();
            setupMaxBounds();
            setupBounds();
            setupMainMarker();
            setupMarkers();
            setupPaths();
            setupGeojson();

            // use of leafletDirectiveSetMap event is not encouraged. only use
            // it when there is no easy way to bind data to the directive
            $scope.$on('leafletDirectiveSetMap', function(event, message) {
                var meth = message.shift();
                map[meth].apply(map, message);
            });

            function overrideMinZoomIfMaxBoundsSet() {
                if ($scope.maxBounds) {
                    $scope.leaflet.minZoom = undefined;
                }
            }

            function _isSafeToApply() {
                var phase = $scope.$root.$$phase;
                return !(phase === '$apply' || phase === '$digest');
            }

            function safeApply(fn) {
                if (!_isSafeToApply()) {
                    $scope.$eval(fn);
                } else {
                    $scope.$apply(fn);
                }
            }


            /*
            * Set up broadcasting of map events to the rootScope
            *
            * Listeners listen at leafletDirectiveMap.<event name>
            *
            * All events listed at http://leafletjs.com/reference.html#map-events are supported
            */
            function setupMapEventBroadcasting() {

                function genDispatchMapEvent(eventName, logic) {
                    return function(e) {
                        // Put together broadcast name
                        // for use in safeApply
                        var broadcastName = 'leafletDirectiveMap.' + eventName;
                        // Safely broadcast the event
                        safeApply(function(scope) {
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
                }

              var availableMapEvents = [
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

              var mapEvents = [];
              var i;
              var eventName;
              var logic = "broadcast";

              if ($scope.eventBroadcast === undefined || $scope.eventBroadcast === null) {
                  // Backward compatibility, if no event-broadcast attribute, all events are broadcasted
                  mapEvents = availableMapEvents;
              } else if (typeof $scope.eventBroadcast !== 'object') {
                  // Not a valid object
                  $log.warn("[AngularJS - Leaflet] event-broadcast must be an object check your model.");
              } else {
                  // We have a possible valid object
                  if ($scope.eventBroadcast.map === undefined || $scope.eventBroadcast.map === null) {
                      // We do not have events enable/disable do we do nothing (all enabled by default)
                      mapEvents = availableMapEvents;
                  } else if (typeof $scope.eventBroadcast.map !== 'object') {
                      // Not a valid object
                      $log.warn("[AngularJS - Leaflet] event-broadcast.map must be an object check your model.");
                  } else {
                      // We have a possible valid map object
                      // Event propadation logic
                      if ($scope.eventBroadcast.map.logic !== undefined && $scope.eventBroadcast.map.logic !== null) {
                          // We take care of possible propagation logic
                          if ($scope.eventBroadcast.map.logic !== "emit" && $scope.eventBroadcast.map.logic !== "broadcast") {
                              // This is an error
                              $log.warn("[AngularJS - Leaflet] Available event propagation logic are: 'emit' or 'broadcast'.");
                          } else if ($scope.eventBroadcast.map.logic === "emit") {
                              logic = "emit";
                          }
                      }
                      // Enable / Disable
                      var mapEventsEnable = false, mapEventsDisable = false;
                      if ($scope.eventBroadcast.map.enable !== undefined && $scope.eventBroadcast.map.enable !== null) {
                          if (typeof $scope.eventBroadcast.map.enable === 'object') {
                              mapEventsEnable = true;
                          }
                      }
                      if ($scope.eventBroadcast.map.disable !== undefined && $scope.eventBroadcast.map.disable !== null) {
                          if (typeof $scope.eventBroadcast.map.disable === 'object') {
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
                              for (i = 0; i < $scope.eventBroadcast.map.enable.length; i++) {
                                  eventName = $scope.eventBroadcast.map.enable[i];
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
                              for (i = 0; i < $scope.eventBroadcast.map.disable.length; i++) {
                                  eventName = $scope.eventBroadcast.map.disable[i];
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
              }

              for (i = 0; i < mapEvents.length; i++) {
                eventName = mapEvents[i];

                map.on(eventName, genDispatchMapEvent(eventName, logic), {
                  eventName: eventName
                });
              }
            }

            /*
             * Event setup watches for callbacks set in the parent scope
             *
             *    $scope.events = {
             *      dblclick: function(){
             *         // doThis()
             *      },
             *      click: function(){
             *         // doThat()
             *      }
             * }
             */

            function setupMapEventCallbacks() {
                if (typeof($scope.events) !== 'object') {
                    return false;
                } else {
                    for (var bind_to  in $scope.events) {
                        map.on(bind_to, $scope.events[bind_to]);
                    }
                }
            }

            function setupLayers() {
                //TODO: support multiple types of layers (or plugins) Canvas, ImageOverlay, clustermarker, google, etc
                //TODO: add support for controls
                if ($scope.layers === undefined || $scope.layers === null) {
                    // There is no layers definition so we will use the old way of definig tiles for compatibility
                    setupTiles();
                } else {
                    // Do we have a baselayers property?
                    if ($scope.layers.baselayers === undefined || $scope.layers.baselayers === null || typeof $scope.layers.baselayers !== 'object') {
                        // No baselayers property
                        $log.error('[AngularJS - Leaflet] At least one baselayer has to be defined');
                        $scope.leaflet.layers = !!attrs.testing ? layers : str_inspect_hint;
                        return;
                    } else if (Object.keys($scope.layers.baselayers).length <= 0) {
                        // We have a baselayers property but no element on it
                        $log.error('[AngularJS - Leaflet] At least one baselayer has to be defined');
                        $scope.leaflet.layers = !!attrs.testing ? layers : str_inspect_hint;
                        return;
                    }
                    // We have baselayers to add to the map
                    layers = {};
                    layers.baselayers = {};
                    layers.controls = {};
                    layers.controls.layers = new L.control.layers();
                    if ($scope.defaults && $scope.defaults.controlLayersPosition) {
                        layers.controls.layers.setPosition($scope.defaults.controlLayersPosition);
                    }
                    layers.controls.layers.addTo(map);
                    // Setup all baselayers definitions
                    var top = false;
                    for (var layerName in $scope.layers.baselayers) {
                        var newBaseLayer = createLayer($scope.layers.baselayers[layerName]);
                        if (newBaseLayer !== null) {
                            layers.baselayers[layerName] = newBaseLayer;
                            // Only add the visible layer to the map, layer control manages the addition to the map
                            // of layers in its control
                            if ($scope.layers.baselayers[layerName].top === true) {
                                map.addLayer(layers.baselayers[layerName]);
                                top = true;
                            }
                            layers.controls.layers.addBaseLayer(layers.baselayers[layerName], $scope.layers.baselayers[layerName].name);
                        }
                    }
                    // If there is no visible layer add first to the map
                    if (!top && Object.keys(layers.baselayers).length > 0) {
                        map.addLayer(layers.baselayers[Object.keys($scope.layers.baselayers)[0]]);
                    }
                    // Setup the Overlays
                    layers.overlays = {};
                    for (layerName in $scope.layers.overlays) {
                        var newOverlayLayer = createLayer($scope.layers.overlays[layerName]);
                        if (newOverlayLayer !== null) {
                            layers.overlays[layerName] = newOverlayLayer;
                            // Only add the visible layer to the map, layer control manages the addition to the map
                            // of layers in its control
                            if ($scope.layers.overlays[layerName].visible === true) {
                                map.addLayer(layers.overlays[layerName]);
                            }
                            layers.controls.layers.addOverlay(layers.overlays[layerName], $scope.layers.overlays[layerName].name);
                        }
                    }

                    // Watch for the base layers
                    $scope.$watch('layers.baselayers', function(newBaseLayers) {
                        // Delete layers from the array
                        for (var name in layers.baselayers) {
                            if (newBaseLayers[name] === undefined) {
                                // Remove the layer from the control
                                layers.controls.layers.removeLayer(layers.baselayers[name]);
                                // Remove from the map if it's on it
                                if (map.hasLayer(layers.baselayers[name])) {
                                    map.removeLayer(layers.baselayers[name]);
                                }
                                delete layers.baselayers[name];
                            }
                        }
                        // add new layers
                        for (var new_name in newBaseLayers) {
                            if (layers.baselayers[new_name] === undefined) {
                                var testBaseLayer = createLayer(newBaseLayers[new_name]);
                                if (testBaseLayer !== null) {
                                    layers.baselayers[new_name] = testBaseLayer;
                                    // Only add the visible layer to the map, layer control manages the addition to the map
                                    // of layers in its control
                                    if (newBaseLayers[new_name].top === true) {
                                        map.addLayer(layers.baselayers[new_name]);
                                    }
                                    layers.controls.layers.addBaseLayer(layers.baselayers[new_name], newBaseLayers[new_name].name);
                                }
                            }
                        }
                        if (Object.keys(layers.baselayers).length <= 0) {
                            // No baselayers property
                            $log.error('[AngularJS - Leaflet] At least one baselayer has to be defined');
                        } else {
                            //we have layers, so we need to make, at least, one active
                            var found = false;
                            // serach for an active layer
                            for (var key in layers.baselayers) {
                                if (map.hasLayer(layers.baselayers[key])) {
                                    found = true;
                                    break;
                                }
                            }
                            // If there is no active layer make one active
                            if (!found) {
                                map.addLayer(layers.baselayers[Object.keys($scope.layers.baselayers)[0]]);
                            }
                        }
                    }, true);

                    // Watch for the overlay layers
                    $scope.$watch('layers.overlays', function(newOverlayLayers) {
                        // Delete layers from the array
                        for (var name in layers.overlays) {
                            if (newOverlayLayers[name] === undefined) {
                                // Remove the layer from the control
                                layers.controls.layers.removeLayer(layers.overlays[name]);
                                // Remove from the map if it's on it
                                if (map.hasLayer(layers.overlays[name])) {
                                    map.removeLayer(layers.overlays[name]);
                                }
                                // TODO: Depending on the layer type we will have to delete what's included on it
                                delete layers.overlays[name];
                            }
                        }
                        // add new layers
                        for (var new_name in newOverlayLayers) {
                            if (layers.overlays[new_name] === undefined) {
                                var testOverlayLayer = createLayer(newOverlayLayers[new_name]);
                                if (testOverlayLayer !== null) {
                                    layers.overlays[new_name] = testOverlayLayer;
                                    layers.controls.layers.addOverlay(layers.overlays[new_name], newOverlayLayers[new_name].name);
                                    if (newOverlayLayers[new_name].visible === true) {
                                        map.addLayer(layers.overlays[new_name]);
                                    }
                                }
                            }
                        }
                    }, true);
                }

                $scope.leaflet.layers = !!attrs.testing ? layers : str_inspect_hint;
            }

            function createLayer(layerDefinition) {
                // Check if the baselayer has a valid type
                if (layerDefinition.type === undefined || layerDefinition.type === null || typeof layerDefinition.type !== 'string') {
                    $log.error('[AngularJS - Leaflet] A base layer must have a type');
                    return null;
                } else if (layerDefinition.type !== 'xyz' && layerDefinition.type !== 'wms' && layerDefinition.type !== 'group' && layerDefinition.type !== 'markercluster' && layerDefinition.type !== 'google' && layerDefinition.type !== 'bing') {
                    $log.error('[AngularJS - Leaflet] A layer must have a valid type: "xyz, wms, group, google"');
                    return null;
                }
                if (layerDefinition.type === 'xyz' || layerDefinition.type === 'wms') {
                    // XYZ, WMS must have an url
                    if (layerDefinition.url === undefined || layerDefinition.url === null || typeof layerDefinition.url !== 'string') {
                        $log.error('[AngularJS - Leaflet] A base layer must have an url');
                        return null;
                    }
                }
                if (layerDefinition.name === undefined || layerDefinition.name === null || typeof layerDefinition.name !== 'string') {
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
                for (var attrname in layerDefinition.layerParams) { layerDefinition.layerOptions[attrname] = layerDefinition.layerParams[attrname]; }
                switch (layerDefinition.type) {
                case 'xyz':
                    layer = createXyzLayer(layerDefinition.url, layerDefinition.layerOptions);
                    break;
                case 'wms':
                    layer = createWmsLayer(layerDefinition.url, layerDefinition.layerOptions);
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
                default:
                    layer = null;
                }

                //TODO Add $watch to the layer properties

                return layer;
            }

            function createXyzLayer(url, options) {
                var layer = L.tileLayer(url, options);
                return layer;
            }

            function createWmsLayer(url, options) {
                var layer = L.tileLayer.wms(url, options);
                return layer;
            }

            function createGroupLayer() {
                var layer = L.layerGroup();
                return layer;
            }

            function createMarkerClusterLayer(options) {
                if (Helpers.MarkerClusterPlugin.isLoaded()) {
                    var layer = new L.MarkerClusterGroup(options);
                    return layer;
                } else {
                    return null;
                }
            }

            function createGoogleLayer(type, options) {
				type = type || 'SATELLITE';
				if (Helpers.GoogleLayerPlugin.isLoaded()) {
                    var layer = new L.Google(type, options);
                    return layer;
                } else {
                    return null;
                }
            }

            function createBingLayer(key, options) {
				if (Helpers.BingLayerPlugin.isLoaded()) {
                    var layer = new L.BingLayer(key, options);
                    return layer;
                } else {
                    return null;
                }
            }

            function setupTiles() {
                var tileLayerObj, key;
                $scope.leaflet.tileLayer = !!(attrs.defaults && $scope.defaults && $scope.defaults.tileLayer) ?
                                            $scope.defaults.tileLayer : defaults.tileLayer;

                if ($scope.defaults && $scope.defaults.tileLayerOptions) {
                    for (key in $scope.defaults.tileLayerOptions) {
                        defaults.tileLayerOptions[key] = $scope.defaults.tileLayerOptions[key];
                    }
                }

                if (attrs.tiles) {
                    if ($scope.tiles && $scope.tiles.url) {
                        $scope.leaflet.tileLayer = $scope.tiles.url;
                    }
                    if ($scope.tiles && $scope.tiles.options) {
                        for (key in $scope.tiles.options) {
                            defaults.tileLayerOptions[key] = $scope.tiles.options[key];
                        }
                    }

                    $scope.$watch("tiles.url", function (url) {
                        if (!url) {
                            return;
                        }
                        tileLayerObj.setUrl(url);
                    });
                }
                tileLayerObj = L.tileLayer($scope.leaflet.tileLayer, defaults.tileLayerOptions);
                tileLayerObj.addTo(map);

                $scope.leaflet.tileLayerObj = !!attrs.testing ? tileLayerObj : str_inspect_hint;
            }

            function setupLegend() {
                if ($scope.legend) {
                    if (!$scope.legend.colors || !$scope.legend.labels || $scope.legend.colors.length !== $scope.legend.labels.length) {
                         $log.warn("[AngularJS - Leaflet] legend.colors and legend.labels must be set.");
                    } else {
                        var legendClass=$scope.legendClass ? $scope.legendClass : "legend";
                        var position = $scope.legend.position || 'bottomright';
                        var legend = L.control({position: position });
                        legend.onAdd = function (map) {
                            var div = L.DomUtil.create('div', legendClass);
                            for (var i = 0; i < $scope.legend.colors.length; i++) {
                                div.innerHTML +=
                                    '<div><i style="background:' + $scope.legend.colors[i] + '"></i>' + $scope.legend.labels[i] + '</div>';
                            }
                            return div;
                        };
                        legend.addTo(map);
                    }
                }
            }

            function setupMaxBounds() {
                if (!$scope.maxBounds) {
                    return;
                }
                if ($scope.maxBounds.southWest && $scope.maxBounds.southWest.lat && $scope.maxBounds.southWest.lng && $scope.maxBounds.northEast && $scope.maxBounds.northEast.lat && $scope.maxBounds.northEast.lng) {
                    $scope.$watch("maxBounds", function (maxBounds) {
                        if (maxBounds.southWest && maxBounds.northEast && maxBounds.southWest.lat && maxBounds.southWest.lng && maxBounds.northEast.lat && maxBounds.northEast.lng) {
                            map.setMaxBounds(
                                new L.LatLngBounds(
                                    new L.LatLng(maxBounds.southWest.lat, maxBounds.southWest.lng),
                                    new L.LatLng(maxBounds.northEast.lat, maxBounds.northEast.lng)
                                )
                            );
                        }
                    });
                }
            }

            function isBoundsValid(bounds) {
                var southWest = bounds.southWest;
                var northEast = bounds.northEast;

                return (bounds && southWest && northEast && southWest.lat &&
                        southWest.lng && northEast.lat && northEast.lng);
            }

            function tryFitBounds(bounds) {
                if (!isBoundsValid(bounds)) {
                    return;
                }

                var southWest = bounds.southWest;
                var northEast = bounds.northEast;
                var new_latlng_bounds = new L.LatLngBounds(
                        new L.LatLng(southWest.lat, southWest.lng),
                        new L.LatLng(northEast.lat, northEast.lng));

                if (!map.getBounds().equals(new_latlng_bounds)) {
                    map.fitBounds(new_latlng_bounds);
                }
            }

            function setupBounds() {
                if (!$scope.bounds) {
                    return;
                }
                $scope.$watch('bounds', function(new_bounds) {
                    tryFitBounds(new_bounds);
                }, true);
            }

            function updateBoundsInScope() {
                if (!$scope.bounds) {
                    return;
                }

                var bounds = map.getBounds();
                var sw_latlng = bounds.getSouthWest();
                var ne_latlng = bounds.getNorthEast();
                $scope.bounds = {
                    southWest: {
                        lat: sw_latlng.lat,
                        lng: sw_latlng.lng
                    },
                    northEast: {
                        lat: ne_latlng.lat,
                        lng: ne_latlng.lng
                    }
                };
            }

            function setupCenter() {
                if (!$scope.center) {
                    $log.warn("[AngularJS - Leaflet] 'center' is undefined in the current scope, did you forget to initialize it?");
                    map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                    updateBoundsInScope();
                    return;
                } else {
                    if ($scope.center.lat !== undefined && $scope.center.lat !== null && typeof $scope.center.lat === 'number' && $scope.center.lng !== undefined && $scope.center.lng !== null && typeof $scope.center.lng === 'number' && $scope.center.zoom !== undefined && $scope.center.zoom !== null && typeof $scope.center.zoom === 'number') {
                        map.setView([$scope.center.lat, $scope.center.lng], $scope.center.zoom );
                        updateBoundsInScope();
                    } else if (attrs.center.autoDiscover === true ) {
                        map.locate({ setView: true, maxZoom: $scope.leaflet.maxZoom });
                    } else {
                        $log.warn("[AngularJS - Leaflet] 'center' is incorrect");
                        map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                        updateBoundsInScope();
                    }
                }

                var centerModel = {
                    lat:  $parse("center.lat"),
                    lng:  $parse("center.lng"),
                    zoom: $parse("center.zoom")
                };

                var movingMap = false;

                $scope.$watch("center", function(center, old_center) {
                    if (!center) {
                        $log.warn("[AngularJS - Leaflet] 'center' have been removed?");
                        map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                        return;
                    }

                    if (movingMap) {
                        // Can't update. The map is moving.
                        return;
                    }

                    if (old_center) {
                        if (center.lat !== undefined && center.lat !== null && typeof center.lat === 'number' && center.lng !== undefined && center.lng !== null && typeof center.lng === 'number' && center.zoom !== undefined && center.zoom !== null && typeof center.zoom === 'number') {
                            // We have a center
                            if (old_center.lat !== undefined && old_center.lat !== null && typeof old_center.lat === 'number' && old_center.lng !== undefined && old_center.lng !== null &&  typeof old_center.lng === 'number' && old_center.zoom !== undefined && old_center.zoom !== null &&  typeof old_center.zoom === 'number') {
                                // We also have a correct old center
                                if (center.lat !== old_center.lat || center.lng !== old_center.lng || center.zoom !== old_center.zoom) {
                                    // Update if they are different
                                    map.setView([center.lat, center.lng], center.zoom );
                                    updateBoundsInScope();
                                }
                            } else {
                                // We didn't have a correct old center so directly update
                                map.setView([center.lat, center.lng], center.zoom );
                                updateBoundsInScope();
                            }
                        } else {
                            // We don't have a correct center
                            if (center.autoDiscover === true && old_center.autoDiscover !== true) {
                                // We have an autodiscover and different from the old, so update the center
                                map.locate({ setView: true, maxZoom: $scope.leaflet.maxZoom });
                            } else if (center.autoDiscover === undefined || center.autoDiscover === null) {
                                // Some problem with actual center? No center and no autodiscover
                                $log.warn("[AngularJS - Leaflet] 'center' is incorrect");
                                map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                            }
                        }
                    }
                }, true);

                map.on("movestart", function(/* event */) {
                    movingMap = true;
                });

                map.on("moveend", function(/* event */) {
                    movingMap = false;
                    safeApply(function(scope) {
                        if (centerModel) {
                            centerModel.lat.assign(scope, map.getCenter().lat);
                            centerModel.lng.assign(scope, map.getCenter().lng);
                            centerModel.zoom.assign(scope, map.getZoom());
                        }
                        updateBoundsInScope();
                    });
                });
            }

            function setupGeojson() {
                $scope.$watch("geojson", function(geojson) {
                    if (!geojson) {
                        return;
                    }

                    if ($scope.leaflet.geojson) {
                        map.removeLayer($scope.leaflet.geojson);
                    }

                    if (geojson.hasOwnProperty("data")) {
                        var resetStyleOnMouseout = $scope.geojson.resetStyleOnMouseout;

                        $scope.leaflet.geojson = L.geoJson($scope.geojson.data, {
                            style: $scope.geojson.style,
                            onEachFeature: function(feature, layer) {
                                layer.on({
                                    mouseover: function(e) {
                                        safeApply(function() {
                                            geojson.selected = feature;
                                            $rootScope.$broadcast('leafletDirectiveMap.geojsonMouseover', e);
                                        });
                                    },
                                    mouseout: function(e) {
                                        if (resetStyleOnMouseout) {
                                            $scope.leaflet.geojson.resetStyle(e.target);
                                        }
                                        safeApply(function() {
                                            geojson.selected = undefined;
                                            $rootScope.$broadcast('leafletDirectiveMap.geojsonMouseout', e);
                                        });
                                    },
                                    click: function(e) {
                                        safeApply(function() {
                                            $rootScope.$broadcast('leafletDirectiveMap.geojsonClick', geojson.selected, e);
                                        });
                                    }
                                });
                            }
                        }).addTo(map);
                    }
                });
            }

            function setupMainMarker() {
                var main_marker;
                if (!$scope.marker) {
                    return;
                }
                main_marker = createMarker('marker', $scope.marker, map);
                $scope.leaflet.marker = !!attrs.testing ? main_marker : str_inspect_hint;
                main_marker.on('click', function(e) {
                    safeApply(function() {
                        $rootScope.$broadcast('leafletDirectiveMainMarkerClick');
                    });
                });
            }

            function setupMarkers() {
                var markers = {};

                if (!$scope.markers) {
                    return;
                }

                for (var name in $scope.markers) {
                    var newMarker = createMarker('markers.'+name, $scope.markers[name], map);
                    if (newMarker !== null) {
                        markers[name] = newMarker;
                    }
                }

                $scope.$watch('markers', function(newMarkers) {
                    // Delete markers from the array
                    for (var name in markers) {
                        if (newMarkers[name] === undefined) {
                            // First we check if the marker is in a layer group
                            markers[name].closePopup();
                            // There is no easy way to know if a marker is added to a layer, so we search for it
                            // if there are overlays
                            if (layers !== undefined && layers !== null) {
                                if (layers.overlays !== undefined) {
                                    for (var key in layers.overlays) {
                                        if (layers.overlays[key] instanceof L.LayerGroup) {
                                            if (layers.overlays[key].hasLayer(markers[name])) {
                                                layers.overlays[key].removeLayer(markers[name]);
                                            }
                                        }
                                    }
                                }
                            }
                            // Remove the marker from the map
                            map.removeLayer(markers[name]);
                            // TODO: If we remove the marker we don't have to clear the $watches?
                            // Delete the marker
                            delete markers[name];
                        }
                    }
                    // add new markers
                    for (var new_name in newMarkers) {
                        if (markers[new_name] === undefined) {
                            var newMarker = createMarker('markers.'+new_name, $scope.markers[new_name], map);
                            if (newMarker !== null) {
                                markers[new_name] = newMarker;
                            }
                        }
                    }
                }, true);
                $scope.leaflet.markers = !!attrs.testing ? markers : str_inspect_hint;
            }

            function createMarker(scope_watch_name, marker_data, map) {
                var marker = buildMarker(marker_data);

                // Marker belongs to a layer group?
                if (marker_data.layer === undefined) {
                    // We do not have a layer attr, so the marker goes to the map layer
                    map.addLayer(marker);
                    if (marker_data.focus === true) {
                        marker.openPopup();
                    }
                } else if (typeof marker_data.layer === 'string') {
                    if (layers !== null) {
                        // We have layers so continue testing
                        if (layers.overlays !== null && layers.overlays !== undefined) {
                            // There is a layer name so we will try to add it to the layer, first does the layer exists
                            if (layers.overlays[marker_data.layer] !== undefined || layers.overlays[marker_data.layer] !== null) {
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
                            safeApply(function() {
                                $rootScope.$broadcast('leafletDirectiveMarkersClick', markerName);
                            });
                        } else if (eventName === 'dragend') {
                            safeApply(function() {
                                marker_data.lat = marker.getLatLng().lat;
                                marker_data.lng = marker.getLatLng().lng;
                            });
                            if (marker_data.message) {
                                if (marker_data.focus === true) {
                                    marker.openPopup();
                                }
                            }
                        }

                        safeApply(function(scope){
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

                // Set up marker event broadcasting
                var availableMarkerEvents = [
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

                var markerEvents = [];
                var i;
                var eventName;
                var logic = "broadcast";

                if ($scope.eventBroadcast === undefined || $scope.eventBroadcast === null) {
                    // Backward compatibility, if no event-broadcast attribute, all events are broadcasted
                    markerEvents = availableMarkerEvents;
                } else if (typeof $scope.eventBroadcast !== 'object') {
                    // Not a valid object
                    $log.warn("[AngularJS - Leaflet] event-broadcast must be an object check your model.");
                } else {
                    // We have a possible valid object
                    if ($scope.eventBroadcast.marker === undefined || $scope.eventBroadcast.marker === null) {
                        // We do not have events enable/disable do we do nothing (all enabled by default)
                        markerEvents = availableMarkerEvents;
                    } else if (typeof $scope.eventBroadcast.marker !== 'object') {
                        // Not a valid object
                        $log.warn("[AngularJS - Leaflet] event-broadcast.marker must be an object check your model.");
                    } else {
                        // We have a possible valid map object
                        // Event propadation logic
                        if ($scope.eventBroadcast.marker.logic !== undefined && $scope.eventBroadcast.marker.logic !== null) {
                            // We take care of possible propagation logic
                            if ($scope.eventBroadcast.marker.logic !== "emit" && $scope.eventBroadcast.marker.logic !== "broadcast") {
                                // This is an error
                                $log.warn("[AngularJS - Leaflet] Available event propagation logic are: 'emit' or 'broadcast'.");
                            } else if ($scope.eventBroadcast.marker.logic === "emit") {
                                logic = "emit";
                            }
                        }
                        // Enable / Disable
                        var markerEventsEnable = false, markerEventsDisable = false;
                        if ($scope.eventBroadcast.marker.enable !== undefined && $scope.eventBroadcast.marker.enable !== null) {
                            if (typeof $scope.eventBroadcast.marker.enable === 'object') {
                                markerEventsEnable = true;
                            }
                        }
                        if ($scope.eventBroadcast.marker.disable !== undefined && $scope.eventBroadcast.marker.disable !== null) {
                            if (typeof $scope.eventBroadcast.marker.disable === 'object') {
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
                                for (i = 0; i < $scope.eventBroadcast.marker.enable.length; i++) {
                                    eventName = $scope.eventBroadcast.marker.enable[i];
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
                                for (i = 0; i < $scope.eventBroadcast.marker.disable.length; i++) {
                                    eventName = $scope.eventBroadcast.marker.disable[i];
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

                var clearWatch = $scope.$watch(scope_watch_name, function(data, old_data) {
                    if (!data) {
                        marker.closePopup();
                        // There is no easy way to know if a marker is added to a layer, so we search for it
                        // if there are overlays
                        if (layers !== undefined && layers !== null) {
                            if (layers.overlays !== undefined) {
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

                    if (old_data) {

                        //TODO Check for layers !== null
                        //TODO Check for layers.overlays !== null !== undefined
                        // It is possible the the layer has been removed or the layer marker does not exist

                        // Update the layer group if present or move it to the map if not
                        if (data.layer === undefined || data.layer === null || typeof data.layer !== 'string') {
                            // There is no layer information, we move the marker to the map if it was in a layer group
                            if (old_data.layer !== undefined && old_data.layer !== null && typeof old_data.layer === 'string') {
                                // Remove from the layer group that is supposed to be
                                if (layers.overlays[old_data.layer] !== undefined) {
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
                        } else if (old_data.layer === undefined || old_data.layer === null || old_data.layer !== data.layer) {
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
                        }

                        // Update the lat-lng property (always present in marker properties)
                        if (data.lat === undefined || data.lat === null || isNaN(data.lat) || typeof data.lat !== 'number' || data.lng === undefined || data.lng === null || isNaN(data.lng) || typeof data.lng !== 'number') {
                            $log.warn('There are problems with lat-lng data, please verify your marker model');
                            // Remove the marker from the layers and map if it is not valid
                            if (layers !== null) {
                                if (layers.overlays !== undefined && layers.overlays !== null) {
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
                            // tirggers this watch expression. Then we call
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
                                if (data.layer !== undefined && data.layer !== null && typeof data.layer === 'string') {
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
                    draggable: data.draggable ? true : false
                };
                if (data.title) {
                    moptions.title = data.title;
                }
                var marker = new L.marker(data, moptions);
                if (data.message) {
                    marker.bindPopup(data.message);
                }
                return marker;
            }

            function setupPaths() {
                var paths = {};
                $scope.leaflet.paths = !!attrs.testing ? paths : str_inspect_hint;

                if (!$scope.paths) {
                    return;
                }

                $log.warn("[AngularJS - Leaflet] Creating polylines and adding them to the map will break the directive's scope's inspection in AngularJS Batarang");

                for (var name in $scope.paths) {
                    paths[name] = createPath(name, $scope.paths[name], map);
                }

                $scope.$watch("paths", function (newPaths) {
                    for (var new_name in newPaths) {
                        if (paths[new_name] === undefined) {
                            paths[new_name] = createPath(new_name, newPaths[new_name], map);
                        }
                    }
                    // Delete paths from the array
                    for (var name in paths) {
                        if (newPaths[name] === undefined) {
                            delete paths[name];
                        }
                    }

                }, true);
            }

            function createPath(name, scopePath, map) {
                var path;

                var options = {
                    weight: defaults.path.weight,
                    color: defaults.path.color,
                    opacity: defaults.path.opacity
                };
                if(scopePath.stroke !== undefined) {
                    options.stroke = scopePath.stroke;
                }
                if(scopePath.fill !== undefined) {
                    options.fill = scopePath.fill;
                }
                if(scopePath.fillColor !== undefined) {
                    options.fillColor = scopePath.fillColor;
                }
                if(scopePath.fillOpacity !== undefined) {
                    options.fillOpacity = scopePath.fillOpacity;
                }
                if(scopePath.smoothFactor !== undefined) {
                    options.smoothFactor = scopePath.smoothFactor;
                }
                if(scopePath.noClip !== undefined) {
                    options.noClip = scopePath.noClip;
                }

                if(scopePath.type === undefined) {
                    scopePath.type = "polyline";
                }

                function setPathOptions(data, oldData) {
                    if (data.latlngs !== undefined && (oldData === undefined || data.latlngs !== oldData.latlngs)) {
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
                                if(data.radius !== undefined && (oldData === undefined || data.radius !== oldData.radius)) {
                                    path.setRadius(data.radius);
                                }
                                break;
                        }
                    }

                    if (data.weight !== undefined && (oldData === undefined || data.weight !== oldData.weight)) {
                        path.setStyle({ weight: data.weight });
                    }

                    if (data.color !== undefined && (oldData === undefined || data.color !== oldData.color)) {
                        path.setStyle({ color: data.color });
                    }

                    if (data.opacity !== undefined && (oldData === undefined || data.opacity !== oldData.opacity)) {
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

                setPathOptions(scopePath);
                map.addLayer(path);

                var clearWatch = $scope.$watch('paths.' + name, function(data, oldData) {
                    if (!data) {
                        map.removeLayer(path);
                        clearWatch();
                        return;
                    }
                    setPathOptions(data,oldData);
                }, true);

                return path;
            }

            function convertToLeafletLatLng(latlng) {
                return new L.LatLng(latlng.lat, latlng.lng);
            }

            function convertToLeafletLatLngs(latlngs) {
                return latlngs.filter(function(latlng) {
                    return !!latlng.lat && !!latlng.lng;
                }).map(function (latlng) {
                    return new L.LatLng(latlng.lat, latlng.lng);
                });
            }

            function convertToLeafletMultiLatLngs(paths) {
                return paths.map(function(latlngs) {
                    return convertToLeafletLatLngs(latlngs);
                });
            }

            function setupControls() {
                //@TODO add document for this option  11.08 2013 (houqp)
                if (map.zoomControl && $scope.defaults && $scope.defaults.zoomControlPosition) {
                    map.zoomControl.setPosition($scope.defaults.zoomControlPosition);
                }

                if(map.zoomControl && $scope.defaults && $scope.defaults.zoomControl===false) {
                    map.zoomControl.removeFrom(map);
                }

                if(map.zoomsliderControl && $scope.defaults && !$scope.defaults.zoomsliderControl) {
                    map.zoomsliderControl.removeFrom(map);
                }
            }

            function setupCustomControls() {
                if (!$scope.customControls) {
                    return;
                }

                for(var i = 0, count = $scope.customControls.length; i < count; i++) {
                    map.addControl($scope.customControls[i]);
                }
            }
        }
    };
});
