(function($window, L, d3) {

    "use strict";

    /**
     * @method throwException
     * @param message {String}
     * @param path {String}
     * @return {void}
     */
    var throwException = function throwException(message, path) {

        if (path) {

            // Output a link for a more informative message in the EXCEPTIONS.md.
            console.error('See: https://github.com/Wildhoney/Leaflet.FreeDraw/blob/master/EXCEPTIONS.md#' + path);
        }

        // ..And then output the thrown exception.
        throw "Leaflet.FreeDraw: " + message + ".";

    };

    /**
     * @module FreeDraw
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    $window.FreeDraw = function FreeDraw(map) {

        // FreeDraw requires access to the Leaflet map instance.
        this.setMap(map);
        this.map.dragging.disable();

        // Lazily hook up the options and  hull objects.
        this.options = new $window.FreeDraw.Options();
        this.hull    = new $window.FreeDraw.Hull();

        // Define the line function for drawing the polygon from the user's mouse pointer.
        this.lineFunction = d3.svg.line().x(function(d) { return d.x; }).y(function(d) { return d.y; })
                                         .interpolate('linear');

        // Create a new instance of the D3 free-hand tracer.
        this.createD3();

        // Attach all of the events.
        this._attachMouseDown();
        this._attachMouseMove();
        this._attachMouseUpLeave();

    };

    /**
     * @property prototype
     * @type {Object}
     */
    $window.FreeDraw.prototype = {

        /**
         * @property map
         * @type {L.map|null}
         */
        map: null,

        /**
         * @property svg
         * @type {Object}
         */
        svg: {},

        /**
         * Determines whether the user is currently creating a polygon.
         *
         * @property creating
         * @type {Boolean}
         */
        creating: false,

        /**
         * Responsible for holding the line function that is required by D3 to draw the line based
         * on the user's cursor position.
         *
         * @property lineFunction
         * @type {Function}
         */
        lineFunction: function() {},

        /**
         * Responsible for holding an array of latitudinal and longitudinal points for generating
         * the polygon.
         *
         * @property latLngs
         * @type {Array}
         */
        latLngs: [],

        /**
         * @property options
         * @type {Object}
         */
        options: {},

        /**
         * @property hull
         * @type {Object}
         */
        hull: {},

        /**
         * @property edges
         * @type {Array}
         */
        edges: [],

        /**
         * @property allowEdit
         * @type {Boolean}
         */
        allowEdit: true,

        /**
         * Responsible for holding the coordinates of the user's last cursor position for drawing
         * the D3 polygon tracing the user's cursor.
         *
         * @property fromPoint
         * @type {Object}
         */
        fromPoint: { x: 0, y: 0 },

        /**
         * @property movingEdge
         * @type {L.polygon|null}
         */
        movingEdge: null,

        /**
         * @method setMap
         * @param map {L.map}
         * @return {void}
         */
        setMap: function setMap(map) {

            if (!map || !(map instanceof L.Map)) {

                // We didn't receive a valid `L.Map` instance during instantiation.
                throwException('Upon instantiation an instance of L.Map must be passed', 'passing-an-lmap-instance');

            }

            // Everything is okay.
            this.map = map;

        },

        /**
         * @method enableEdit
         * @return {void}
         */
        enableEdit: function enableEdit() {
            this.allowEdit = true;
            this.map.dragging.disable();
        },

        /**
         * @method disableEdit
         * @return {void}
         */
        disableEdit: function disableEdit() {
            this.allowEdit = false;
            this.map.dragging.enable();
        },

        /**
         * @method createD3
         * @return {void}
         */
        createD3: function createD3() {
            this.svg = d3.select('body').append('svg').attr('class', this.options.svgClassName)
                                    .attr('width', 200).attr('height', 200);
        },

        /**
         * @method destroyD3
         * @return {$window.FreeDraw}
         * @chainable
         */
        destroyD3: function destroyD3() {
            this.svg.remove();
            this.svg = {};
            return this;
        },

        /**
         * @method drawPolygon
         * @param latLngs {L.latLng[]}
         * @return {L.polygon}
         */
        drawPolygon: function drawPolygon(latLngs) {

            // Begin to create a brand-new polygon.
            this.destroyD3().createD3();

            var polygon = L.polygon(latLngs, {
                color: '#D7217E',
                weight: 0,
                fill: true,
                fillColor: '#D7217E',
                fillOpacity: 0.75,
                smoothFactor: this.options.smoothFactor
            }).addTo(this.map);

            this.attachEdges(polygon);
            return polygon;

        },

        /**
         * @method attachEdges
         * @param polygon {L.polygon}
         * @return {void}
         */
        attachEdges: function attachEdges(polygon) {

            // Extract the parts from the polygon.
            var parts = polygon._parts[0];

            parts.forEach(function forEach(point, index) {

                // Leaflet creates elbows in the polygon, which we need to utilise to add the
                // points for modifying its shape.
                var edge = L.divIcon({ className: this.options.iconClassName }),
                    latLng     = this.map.layerPointToLatLng(point);

                edge = L.marker(latLng, { icon: edge }).addTo(this.map);

                // Marker requires instances so that it can modify its shape.
                edge._polygon = polygon;
                edge._index   = index;
                edge._length  = parts.length;
                this.edges.push(edge);

                edge.on('mousedown', function onMouseDown(event) {
                    event.originalEvent.preventDefault();
                    event.originalEvent.stopPropagation();
                    this.movingEdge = event.target;
                }.bind(this));

            }.bind(this));
            
        },

        updatePolygonEdge: function updatePolygon(edge, posX, posY) {

            var updatedLatLng = this.map.containerPointToLatLng(L.point(posX, posY));
            edge.setLatLng(updatedLatLng);
    
            // Fetch all of the edges in the group based on the polygon.
            var edges = this.edges.filter(function filter(marker) {
                return marker._polygon === edge._polygon;
            });
    
            var updatedLatLngs = [];
            edges.forEach(function forEach(marker) {
                updatedLatLngs.push(marker.getLatLng());
            });
    
            // Update the latitude and longitude values.
            edge._polygon.setLatLngs(updatedLatLngs);
            edge._polygon.redraw();
    
        },

        /**
         * @method _attachMouseDown
         * @return {void}
         * @private
         */
        _attachMouseDown: function _attachMouseDown() {

            this.map.on('mousedown', function onMouseDown(event) {

                if (!this.allowEdit) {
                    return;
                }

                var originalEvent = event.originalEvent;

                originalEvent.stopPropagation();
                originalEvent.preventDefault();

                this.latLngs   = [];
                this.creating  = true;
                this.fromPoint = { x: originalEvent.clientX, y: originalEvent.clientY };

            }.bind(this));

        },

        /**
         * @method _attachMouseMove
         * @private
         */
        _attachMouseMove: function _attachMouseMove() {

            this.map.on('mousemove', function onMouseMove(event) {

                var originalEvent = event.originalEvent;

                if (this.movingEdge) {

                    // User is in fact modifying the shape of the polygon.
                    this._editMouseMove(originalEvent);
                    return;

                }

                if (!this.creating) {

                    // We can't do anything else if the user is not in the process of creating a brand-new
                    // polygon.
                    return;

                }

                this._createMouseMove(originalEvent);

            }.bind(this));

        },

        /**
         * @method _editMouseMove
         * @param event {Object}
         * @return {void}
         * @private
         */
        _editMouseMove: function _editMouseMove(event) {

            var pointModel = L.point(event.clientX, event.clientY);

            // Modify the position of the marker on the map based on the user's mouse position.
            var styleDeclaration = this.movingEdge._icon.style;
            styleDeclaration[L.DomUtil.TRANSFORM] = pointModel;

            // Update the polygon's shape in real-time as the user drags their cursor.
            this.updatePolygonEdge(this.movingEdge, pointModel.x, pointModel.y);

//            /**
//             * Responsible for maintaining a closed polygon if the user selects the last marker in the
//             * array of edges.
//             *
//             * @method maintainPolygon
//             * @return {void}
//             */
//            (function maintainPolygon() {
//
//                // Determine if the selected polygon is indeed the last one in the array.
//                var isLast = this.movingEdge._index === ((this.movingEdge._length) - 1);
//
//                if (isLast) {
//
//                    // Locate the first marker in the array.
//                    var firstMarker = this.edges.filter(function filter(marker) {
//                        return marker._polygon === this.movingEdge._polygon;
//                    })[0];
//
//                    // ..And then update the polygon to maintain the closed polygon.
//                    this.updatePolygonEdge(firstMarker, pointModel.x, pointModel.y);
//
//                }
//
//            })();
            
        },

        /**
         * @method _attachMouseUpLeave
         * @return {void}
         * @private
         */
        _attachMouseUpLeave: function _attachMouseUpLeave() {

            this.map.on('mouseup mouseleave', function onMouseUpAndMouseLeave() {

                if (this.movingEdge) {

//                    this.sharePolygonBoundaries(this.pointerEdit._polygon);
                    this.movingEdge = null;
                    return;
                    
                }
                
                this._createMouseUp();
                
            }.bind(this));

        },

        /**
         * @method _createMouseMove
         * @param event {Object}
         * @return {void}
         * @private
         */
        _createMouseMove: function _createMouseMove(event) {

            // Grab the cursor's position from the event object.
            var pointerX = event.clientX,
                pointerY = event.clientY;

            // Resolve the pixel point to the latitudinal and longitudinal equivalent.
            var point  = L.point(pointerX, pointerY),
                latLng = this.map.containerPointToLatLng(point);

            // Line data that is fed into the D3 line function we defined earlier.
            var lineData = [this.fromPoint, { x: pointerX, y: pointerY }];

            // Draw SVG line based on the last movement of the mouse's position.
            this.svg.append('path').attr('d', this.lineFunction(lineData))
                .attr('stroke', '#D7217E').attr('stroke-width', 2).attr('fill', 'none');

            // Take the pointer's position from the event for the next invocation of the mouse move event,
            // and store the resolved latitudinal and longitudinal values.
            this.fromPoint.x = pointerX;
            this.fromPoint.y = pointerY;
            this.latLngs.push(latLng);

        },

        /**
         * @method _createMouseUp
         * @return {void}
         * @private
         */
        _createMouseUp: function _createMouseUp() {

            // User has finished creating their polygon!
            this.creating = false;

            if (this.latLngs.length === 0) {

                // User has failed to drag their cursor enough to create a valid polygon.
                return;

            }

            if (this.options.hullAlgorithm) {
                
                // Use the defined hull algorithm.
                this.hull.setMap(this.map);
                var latLngs = this.hull[this.options.hullAlgorithm](this.latLngs);

            }

            // Required for joining the two ends of the free-hand drawing to create a closed polygon.
            this.latLngs.push(this.latLngs[0]);

            // Physically draw the Leaflet generated polygon.
            this.drawPolygon(latLngs || this.latLngs);
            this.latLngs = [];

        }

    };

})(window, window.L, window.d3);

(function($window) {

    "use strict";

    /**
     * @module FreeDraw
     * @submodule Hull
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    $window.FreeDraw.Hull = function FreeDrawHull() {};

    /**
     * @property prototype
     * @type {Object}
     */
    $window.FreeDraw.Hull.prototype = {

        /**
         * @property map
         * @type {L.Map|Object}
         */
        map: {},

        /**
         * @method setMap
         * @param map {L.Map}
         * @return {void}
         */
        setMap: function setMap(map) {
            this.map = map;
        },

        /**
         * @link https://github.com/brian3kb/graham_scan_js
         * @method brian3kbGrahamScan
         * @param latLngs {L.LatLng[]}
         * @return {L.LatLng[]}
         */
        brian3kbGrahamScan: function brian3kbGrahamScan(latLngs) {

            var convexHull     = new ConvexHullGrahamScan(),
                resolvedPoints = [],
                points         = [],
                hullLatLngs    = [];

            latLngs.forEach(function forEach(latLng) {

                // Resolve each latitude/longitude to its respective container point.
                points.push(this.map.latLngToContainerPoint(latLng));

            }.bind(this));

            points.forEach(function forEach(point) {
                convexHull.addPoint(point.x, point.y);
            }.bind(this));

            var hullPoints = convexHull.getHull();

            hullPoints.forEach(function forEach(hullPoint) {
                resolvedPoints.push(L.point(hullPoint.x, hullPoint.y));
            }.bind(this));

            // Create an unbroken polygon.
            resolvedPoints.push(resolvedPoints[0]);

            resolvedPoints.forEach(function forEach(point) {
                hullLatLngs.push(this.map.containerPointToLatLng(point));
            }.bind(this));

            return hullLatLngs;

        },

        /**
         * @link https://github.com/Wildhoney/ConcaveHull
         * @method wildhoneyConcaveHull
         * @param latLngs {L.LatLng[]}
         * @return {L.LatLng[]}
         */
        wildhoneyConcaveHull: function wildhoneyConcaveHull(latLngs) {
            latLngs.push(latLngs[0]);
            return new ConcaveHull(latLngs).getLatLngs();
        }

    }

}(window));

(function($angular) {

    /**
     * @directive map
     * @author Adam Timberlake <adam.timberlake@gmail.com>
     */
    $angular.module('searchApp').directive('map', function MapDirective() {

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'EA',

            /**
             * @property scope
             * @type {Object}
             */
            scope: true,

            /**
             * @method controller
             * @param $scope {Object}
             * @return {void}
             */
            controller: ['$scope', function controller($scope) {

                /**
                 * @constant SMOOTH_FACTOR
                 * @type {Number}
                 */
                $scope.SMOOTH_FACTOR = 5;

                /**
                 * @constant MINIMUM_ALLOWED_EDGES
                 * @type {Number}
                 */
                $scope.MINIMUM_ALLOWED_EDGES = 4;

                /**
                 * @property svg
                 * @type {Object}
                 */
                $scope.svg = {};

                /**
                 * @property map
                 * @type {Object}
                 */
                $scope.map = {};

                /**
                 * @property markers
                 * @type {Array}
                 */
                $scope.markers = [];

                /**
                 * @property pointerEdit
                 * @type {Object|null}
                 */
                $scope.pointerEdit = null;

                /**
                 * @method editAllowed
                 * @type {Boolean}
                 */
                $scope.editAllowed = true;

                /**
                 * @method initialiseMap
                 * @param element {Object}
                 * @return {Object}
                 */
                $scope.initialiseMap = function initialiseMap(element) {

                    // Initialise the Leaflet.js map.
                    var map = $scope.map = L.map(element).setView([51.505, -0.09], 13);
                    map.dragging.disable();

                    // Attach the layer to the newly created map.
                    L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
                        maxZoom: 18
                    }).addTo(map);

                    // Disable the dragging of the Leaflet map.
                    return map;

                };

                /**
                 * @method allowEdit
                 * @param allowed {Boolean}
                 * @return {void}
                 */
                $scope.allowEdit = function allowEdit(allowed) {

                    var method = allowed ? 'disable' : 'enable';
                    $scope.map.dragging[method]();
                    $scope.editAllowed = allowed;

                };

                /**
                 * @method createD3
                 * @return {Object}
                 */
                $scope.createD3 = function createD3() {
                    return d3.select('body').append('svg').attr('class', 'custom-line')
                        .attr('width', 200).attr('height', 200);
                };

                /**
                 * @method destroyD3
                 * @return {$scope}
                 * @chainable
                 */
                $scope.destroyD3 = function destroyD3() {
                    $scope.svg.remove();
                    return this;
                };

                /**
                 * @method drawPolygon
                 * @param latLngs {L.latLng[]}
                 * @return {Object}
                 */
                $scope.drawPolygon = function drawPolygon(latLngs) {

                    // Destroy and reinitialise the D3 SVG layer.
                    $scope.svg = $scope.destroyD3().createD3();

                    var polyLine = L.polyline(latLngs, {
                        color: 'red',
                        fill: true,
                        fillColor: '#ff0000',
                        fillOpacity: .45,
                        smoothFactor: $scope.SMOOTH_FACTOR
                    });

                    // Add the polyline to the map, and then find the edges of the polygon.
                    polyLine.addTo($scope.map);
                    $scope.attachEdges(polyLine);
                    return polyLine;

                };

                /**
                 * @method attachEdges
                 * @param polygon {Object}
                 * @return {void}
                 */
                $scope.attachEdges = function attachEdges(polygon) {

                    // Extract the parts from the polygon.
                    var parts = polygon._parts[0];

                    $angular.forEach(parts, function forEach(point, $index) {

                        // Create an edge on the points generated by Leaflet.
                        var edgeMarker = L.divIcon({ className: 'icon-edge' }),
                            latLng     = $scope.map.layerPointToLatLng(point);

                        var marker = L.marker(latLng, { icon: edgeMarker }).addTo($scope.map);

                        // Keep a reference to the polygon which the marker is related to.
                        marker._polygon = polygon;
                        marker._index   = $index;
                        marker._length  = parts.length;
                        $scope.markers.push(marker);

                        marker.on('mousedown', function onMouseDown(event) {
                            event.originalEvent.preventDefault();
                            event.originalEvent.stopPropagation();
                            $scope.pointerEdit = event.target;
                        });

                    });

                };

                /**
                 * @method updatePolygonEdge
                 * @param edge {Object}
                 * @param posX {Number}
                 * @param posY {Number}
                 * @return {void}
                 */
                $scope.updatePolygonEdge = function updatePolygon(edge, posX, posY) {

                    var updatedLatLng = $scope.map.containerPointToLatLng(L.point(posX, posY));
                    edge.setLatLng(updatedLatLng);

                    // Fetch all of the markers in the group based on the polygon.
                    var markers = $scope.markers.filter(function filter(marker) {
                        return marker._polygon === edge._polygon;
                    });

                    var updatedLatLngs = [];
                    $angular.forEach(markers, function forEach(marker) {
                        updatedLatLngs.push(marker.getLatLng());
                    });

                    // Update the latitude and longitude values.
                    edge._polygon.setLatLngs(updatedLatLngs);
                    edge._polygon.redraw();

                };

                /**
                 * @method sharePolygonBoundaries
                 * @param polygon {Object}
                 * @return {void}
                 */
                $scope.sharePolygonBoundaries = function sharePolygonBoundaries(polygon) {

                    var edges   = polygon._parts[0],
                        latLngs = [];

                    $angular.forEach(edges, function forEach(edge) {

                        // Iterate over each edge determined by Leaflet and resolve those to lat/long points.
                        var latLng = $scope.map.containerPointToLatLng(edge);
                        latLngs.push(latLng);

                    });

                };

                /**
                 * @method removePolygon
                 * @param polygon {Object}
                 * @return {void}
                 */
                $scope.removePolygon = function removePolygon(polygon) {

                    // Remove the shape.
                    polygon._container.remove();

                    // ...And then remove all of its related markers to prevent memory leaks.
                    $scope.markers = $scope.markers.filter(function filter(marker) {

                        var markersBelongsToPolygon = (marker._polygon === polygon);

                        if (!markersBelongsToPolygon) {
                            return true;
                        }

                        // Physically remove the marker from the DOM.
                        marker._icon.remove();

                    });

                };

            }],

            /**
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                var map = scope.initialiseMap(element[0]);

                // Define the line function for drawing the polygon from the user's mouse pointer.
                var lineFunction = d3.svg.line().x(function(d) { return d.x; }).y(function(d) { return d.y; })
                    .interpolate('linear');

                // Create the D3 SVG layer.
                scope.svg = scope.createD3();

                var isCreating = false,
                    latLngs    = [],
                    fromPoint  = null;

                element.bind('keydown', function onKeyDown(event) {

                    if (event.originalEvent.keyCode === 27) {

                        // Destroy the current drawing if the user taps the ESCAPE key.
                        latLngs    = [];
                        isCreating = false;
                        scope.svg  = scope.destroyD3().createD3();

                    }

                });

                element.bind('mousedown', function onMouseDown(event) {

                    if (!scope.editAllowed) {
                        return;
                    }

                    event.stopPropagation();
                    event.preventDefault();

                    latLngs    = [];
                    isCreating = true;
                    fromPoint  = { x: event.clientX, y: event.clientY };

                });

                element.bind('mouseup mouseleave', function onMouseUpAndLeave() {

                    if (!scope.editAllowed) {
                        return;
                    }

                    isCreating = false;

                    if (scope.pointerEdit) {
                        scope.sharePolygonBoundaries(scope.pointerEdit._polygon);
                        scope.pointerEdit = null;
                        return;

                    }

                    if (latLngs.length === 0) {

                        // Prevent the user from drawing a non-polygon because they haven't dragged
                        // the mouse far enough.
                        return false;

                    }

                    latLngs.push(latLngs[0]);

                    var polygon = scope.drawPolygon(latLngs);

                    polygon.on('click', function onClick() {

                        if (scope.editAllowed) {
                            scope.removePolygon(polygon);
                        }

                    });

                    if (polygon._parts[0].length < scope.MINIMUM_ALLOWED_EDGES) {

                        // Prevent the creating of polygons that are only lines.
                        scope.removePolygon(polygon);
                        return;

                    }

                    latLngs = [];
                    scope.sharePolygonBoundaries(polygon);

                });

                element.bind('mousemove', function onMouseMove(event) {

                    if (!scope.editAllowed) {
                        return;
                    }

                    if (scope.pointerEdit) {

                        var pointModel = L.point(event.clientX, event.clientY);

                        // Modify the position of the marker on the map based on the user's mouse position.
                        var styleDeclaration = scope.pointerEdit._icon.style;
                        styleDeclaration[L.DomUtil.TRANSFORM] = pointModel;

                        // Update the polygon's shape in real-time as the user drags their cursor.
                        scope.updatePolygonEdge(scope.pointerEdit, pointModel.x, pointModel.y);

                        /**
                         * Responsible for maintaining a closed polygon if the user selects the last marker in the
                         * array of markers.
                         *
                         * @method maintainPolygon
                         * @return {void}
                         */
                        (function maintainPolygon() {

                            // Determine if the selected polygon is indeed the last one in the array.
                            var isLast = scope.pointerEdit._index === ((scope.pointerEdit._length) - 1);

                            if (isLast) {

                                // Locate the first marker in the array.
                                var firstMarker = scope.markers.filter(function filter(marker) {
                                    return marker._polygon === scope.pointerEdit._polygon;
                                })[0];

                                // ..And then update the polygon to maintain the closed polygon.
                                scope.updatePolygonEdge(firstMarker, pointModel.x, pointModel.y);

                            }

                        })();

                        return;

                    }

                    if (!isCreating) {
                        return false;
                    }

                    // Take the mouse pointer X and Y from the event.
                    var pointerX = event.clientX,
                        pointerY = event.clientY;

                    // Deduce the latitude/longitude point from the mouse's position.
                    var point  = L.point(pointerX, pointerY),
                        latLng = map.containerPointToLatLng(point);

                    // Line data for the real-time SVG D3 layer.
                    var lineData  = [fromPoint, { x: pointerX, y: pointerY }];

                    // Draw SVG line based on the last movement of the mouse's position.
                    scope.svg.append('path').attr('d', lineFunction(lineData))
                        .attr('stroke', 'blue').attr('stroke-width', 2).attr('fill', 'none');

                    // Keep a track of the last position of the mouse, and then add the latitude/longitude
                    // point to the array of items.
                    fromPoint = { x: pointerX, y: pointerY };
                    latLngs.push(latLng);

                });

            }

        }

    });

})(window.angular);

(function($window) {

    "use strict";

    /**
     * @module FreeDraw
     * @submodule Options
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    $window.FreeDraw.Options = function FreeDrawOptions() {};

    /**
     * @property prototype
     * @type {Object}
     */
    $window.FreeDraw.Options.prototype = {

        /**
         * @property multiplePolygons
         * @type {Boolean}
         */
        multiplePolygons: true,

        /**
         * @property hullAlgorithm
         * @type {String}
         */
        hullAlgorithm: 'brian3kbGrahamScan',

        /**
         * @property hullAlgorithms
         * @type {Object}
         */
        hullAlgorithms: {
            'brian3kb/graham_scan_js': 'brian3kbGrahamScan',
            'Wildhoney/ConcaveHull': 'wildhoneyConcaveHull'
        },

        /**
         * @property svgClassName
         * @type {String}
         */
        svgClassName: 'tracer',

        /**
         * @property smoothFactor
         * @type {Number}
         */
        smoothFactor: 5,

        /**
         * @property iconClassName
         * @type {String}
         */
        iconClassName: 'polygon-elbow',

        /**
         * @method allowMultiplePolygons
         * @param allow {Boolean}
         * @return {void}
         */
        allowMultiplePolygons: function allowMultiplePolygons(allow) {
            this.multiplePolygons = !!allow;
        },

        /**
         * @method setSVGClassName
         * @param className {String}
         * @return {void}
         */
        setSVGClassName: function setSVGClassName(className) {
            this.svgClassName = className;
        },

        /**
         * @method smoothFactor
         * @param factor {Number}
         * @return {void}
         */
        setSmoothFactor: function setSmoothFactor(factor) {
            this.smoothFactor = +factor;
        },

        /**
         * @method setIconClassName
         * @param className {String}
         * @return {void}
         */
        setIconClassName: function setIconClassName(className) {
            this.iconClassName = className;
        },

        /**
         * @method setHullAlgorithm
         * @param algorithm {String|Boolean}
         * @return {void}
         */
        setHullAlgorithm: function setHullAlgorithm(algorithm) {

            if (algorithm && !this.hullAlgorithms.hasOwnProperty(algorithm)) {

                // Ensure the passed algorithm is valid.
                return;

            }

            this.hullAlgorithm = this.hullAlgorithms[algorithm];

        }

    };

})(window);