var leafletDirective = angular.module("leaflet-directive", []);

leafletDirective.directive("leaflet", ["$http", "$log", "$parse", function ($http, $log, $parse) {

    var defaults = {
        maxZoom: 14,
        tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        tileLayerOptions: {
            attribution: 'Tiles &copy; Open Street Maps'
        },
        icon: {
            url: 'http://cdn.leafletjs.com/leaflet-0.5.1/images/marker-icon.png',
            retinaUrl: 'http://cdn.leafletjs.com/leaflet-0.5.1/images/marker-icon@2x.png',
            size: [25, 41],
            anchor: [12, 40],
            popup: [0, -40],
            shadow: {
                url: 'http://cdn.leafletjs.com/leaflet-0.5.1/images/marker-shadow.png',
                retinaUrl: 'http://cdn.leafletjs.com/leaflet-0.5.1/images/marker-shadow.png',
                size: [41, 41],
                anchor: [12, 40]
            }
        },
        path: {
            weight: 10,
            opacity: 1,
            color: '#0000ff'
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
            defaults: '=defaults',
            paths: '=paths',
            tiles: '=tiles'
        },
        template: '<div class="angular-leaflet-map"></div>',
        link: function ($scope, element, attrs /*, ctrl */) {
            var centerModel = {
                lat:$parse("center.lat"),
                lng:$parse("center.lng"),
                zoom:$parse("center.zoom")
            };

            if (attrs.width) {
                element.css('width', attrs.width);
            }
            if (attrs.height) {
                element.css('height', attrs.height);
            }

            $scope.leaflet = {};
            $scope.leaflet.maxZoom = !!(attrs.defaults && $scope.defaults && $scope.defaults.maxZoom) ?
                parseInt($scope.defaults.maxZoom, 10) : defaults.maxZoom;
            var map = new L.Map(element[0], { maxZoom: $scope.leaflet.maxZoom });
            map.setView([0, 0], 1);

            $scope.leaflet.tileLayer = !!(attrs.defaults && $scope.defaults && $scope.defaults.tileLayer) ?
                $scope.defaults.tileLayer : defaults.tileLayer;
            $scope.leaflet.map = !!attrs.testing ? map : str_inspect_hint;

            setupTiles();
            setupCenter();
            setupMaxBounds();
            setupBounds();
            setupMarkers();
            setupPaths();

            // use of leafletDirectiveSetMap event is not encouraged. only use
            // it when there is no easy way to bind data to the directive
            $scope.$on('leafletDirectiveSetMap', function(event, message) {
                var meth = message.shift();
                map[meth].apply(map, message);
            });

            $scope.safeApply = function(fn) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    $scope.$eval(fn);
                } else {
                    $scope.$apply(fn);
                }
            };

            function setupTiles(){
                 // TODO build custom object for tiles, actually only the tile string

                 if ($scope.defaults && $scope.defaults.tileLayerOptions) {
                    for (var key in $scope.defaults.tileLayerOptions) {
                        defaults.tileLayerOptions[key] = $scope.defaults.tileLayerOptions[key];
                    }
                }

                if ($scope.tiles) {
                    if ($scope.tiles.tileLayer) {
                        $scope.leaflet.tileLayer = $scope.tiles.tileLayer;
                    }
                    if ($scope.tiles.tileLayerOptions.attribution) {
                        defaults.tileLayerOptions.attribution = $scope.tiles.tileLayerOptions.attribution;
                    }
                }

                var tileLayerObj = L.tileLayer(
                    $scope.leaflet.tileLayer, defaults.tileLayerOptions);
                tileLayerObj.addTo(map);

                $scope.leaflet.tileLayerObj = !!attrs.testing ? tileLayerObj : str_inspect_hint;
            }

            function setupMaxBounds() {
                if (!$scope.maxBounds) {
                    return;
                }
                if ($scope.maxBounds.southWest && $scope.maxBounds.southWest.lat && $scope.maxBounds.southWest.lng && $scope.maxBounds.northEast && $scope.maxBounds.northEast.lat && $scope.maxBounds.northEast.lng) {
                    map.setMaxBounds(
                        new L.LatLngBounds(
                            new L.LatLng($scope.maxBounds.southWest.lat, $scope.maxBounds.southWest.lng),
                            new L.LatLng($scope.maxBounds.northEast.lat, $scope.maxBounds.northEast.lng)
                        )
                    );

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

            function tryFitBounds(bounds) {
                if (bounds) {
                    var southWest = bounds.southWest;
                    var northEast = bounds.northEast;
                    if (southWest && northEast && southWest.lat && southWest.lng && northEast.lat && northEast.lng) {
                        var sw_latlng = new L.LatLng(southWest.lat, southWest.lng);
                        var ne_latlng = new L.LatLng(northEast.lat, northEast.lng);
                        map.fitBounds(new L.LatLngBounds(sw_latlng, ne_latlng));
                    }
                }
            }

            function setupBounds() {
                if (!$scope.bounds) {
                    return;
                }
                $scope.$watch('bounds', function (new_bounds) {
                    tryFitBounds(new_bounds);
                });
            }

            function setupCenter() {
                $scope.$watch("center", function (center) {
                    if (!center) {
                        $log.warn("[AngularJS - Leaflet] 'center' is undefined in the current scope, did you forget to initialize it?");
                        return;
                    }
                    if (center.lat && center.lng && center.zoom) {
                        map.setView([center.lat, center.lng], center.zoom);
                    } else if (center.autoDiscover === true) {
                        map.locate({ setView: true, maxZoom: $scope.leaflet.maxZoom });
                    }
                }, true);

                map.on("dragend", function (/* event */) {
                    $scope.safeApply(function (scope) {
                        centerModel.lat.assign(scope, map.getCenter().lat);
                        centerModel.lng.assign(scope, map.getCenter().lng);
                    });
                });

                map.on("zoomend", function (/* event */) {
                    if(angular.isUndefined($scope.center)){
                        $log.warn("[AngularJS - Leaflet] 'center' is undefined in the current scope, did you forget to initialize it?");
                    }
                    if (angular.isUndefined($scope.center) || $scope.center.zoom !== map.getZoom()) {
                        $scope.safeApply(function (s) {
                            centerModel.zoom.assign(s, map.getZoom());
                            centerModel.lat.assign(s, map.getCenter().lat);
                            centerModel.lng.assign(s, map.getCenter().lng);
                        });
                    }
                });
            }

            function setupMarkers() {
                var markers = {};
                $scope.leaflet.markers = !!attrs.testing ? markers : str_inspect_hint;

                if (!$scope.markers) {
                    return;
                }

                for (var name in $scope.markers) {
                    markers[name] = createMarker(name, $scope.markers[name], map);
                }

                $scope.$watch("markers", function (newMarkers) {
                    for (var new_name in newMarkers) {
                        if (markers[new_name] === undefined) {
                            markers[new_name] = createMarker(new_name, newMarkers[new_name], map);
                        }
                    }

                    // Delete markers from the array
                    for (var name in markers) {
                        if (newMarkers[name] === undefined) {
                            delete markers[name];
                        }
                    }

                }, true);
            }

            function createMarker(name, scopeMarker, map) {
                var marker = buildMarker(name, scopeMarker);
                map.addLayer(marker);

                if (scopeMarker.focus === true) {
                    marker.openPopup();
                }

                marker.on("dragend", function () {
                    $scope.safeApply(function (scope) {
                        scopeMarker.lat = marker.getLatLng().lat;
                        scopeMarker.lng = marker.getLatLng().lng;
                    });
                    if (scopeMarker.message) {
                        marker.openPopup();
                    }
                });

                var clearWatch = $scope.$watch('markers.'+name, function (data, oldData) {
                    if (!data) {
                        map.removeLayer(marker);
                        clearWatch();
                        return;
                    }

                    if (oldData) {
                        if (data.draggable !== undefined && data.draggable !== oldData.draggable) {
                            if (data.draggable === true) {
                                marker.dragging.enable();
                            } else {
                                marker.dragging.disable();
                            }
                        }

                        if (data.focus !== undefined && data.focus !== oldData.focus) {
                            if (data.focus === true) {
                                marker.openPopup();
                            } else {
                                marker.closePopup();
                            }
                        }

                        if (data.message !== undefined && data.message !== oldData.message) {
                            marker.bindPopup(data);
                        }

                        if (data.lat !== oldData.lat || data.lng !== oldData.lng) {
                            marker.setLatLng(new L.LatLng(data.lat, data.lng));
                        }
                    }
                }, true);
                return marker;
            }

            function buildMarker(name, data) {
                var marker = new L.marker($scope.markers[name],
                    {
                        icon: buildIcon(),
                        draggable: data.draggable ? true : false
                    }
                );
                if (data.message) {
                    marker.bindPopup(data.message);
                }
                return marker;
            }

            function buildIcon() {
                return L.icon({
                    iconUrl: defaults.icon.url,
                    iconRetinaUrl: defaults.icon.retinaUrl,
                    iconSize: defaults.icon.size,
                    iconAnchor: defaults.icon.anchor,
                    popupAnchor: defaults.icon.popup,
                    shadowUrl: defaults.icon.shadow.url,
                    shadowRetinaUrl: defaults.icon.shadow.retinaUrl,
                    shadowSize: defaults.icon.shadow.size,
                    shadowAnchor: defaults.icon.shadow.anchor
                });
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
                var polyline = new L.Polyline([], {
                    weight: defaults.path.weight,
                    color: defaults.path.color,
                    opacity: defaults.path.opacity
                });

                if (scopePath.latlngs !== undefined) {
                    var latlngs = convertToLeafletLatLngs(scopePath.latlngs);
                    polyline.setLatLngs(latlngs);
                }

                if (scopePath.weight !== undefined) {
                    polyline.setStyle({ weight: scopePath.weight });
                }

                if (scopePath.color !== undefined) {
                    polyline.setStyle({ color: scopePath.color });
                }

                if (scopePath.opacity !== undefined) {
                    polyline.setStyle({ opacity: scopePath.opacity });
                }

                map.addLayer(polyline);

                var clearWatch = $scope.$watch('paths.' + name, function (data, oldData) {
                    if (!data) {
                        map.removeLayer(polyline);
                        clearWatch();
                        return;
                    }

                    if (oldData) {
                        if (data.latlngs !== undefined && data.latlngs !== oldData.latlngs) {
                            var latlngs = convertToLeafletLatLngs(data.latlngs);
                            polyline.setLatLngs(latlngs);
                        }

                        if (data.weight !== undefined && data.weight !== oldData.weight) {
                            polyline.setStyle({ weight: data.weight });
                        }

                        if (data.color !== undefined && data.color !== oldData.color) {
                            polyline.setStyle({ color: data.color });
                        }

                        if (data.opacity !== undefined && data.opacity !== oldData.opacity) {
                            polyline.setStyle({ opacity: data.opacity });
                        }
                    }
                }, true);
                return polyline;
            }

            function convertToLeafletLatLngs(latlngs) {
                var leafletLatLngs = latlngs.filter(function (latlng) {
                    return !!latlng.lat && !!latlng.lng;
                }).map(function (latlng) {
                    return new L.LatLng(latlng.lat, latlng.lng);
                });

                return leafletLatLngs;
            }
        }
    };
}]);
