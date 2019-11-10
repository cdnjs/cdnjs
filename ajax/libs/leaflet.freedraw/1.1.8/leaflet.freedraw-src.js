(function($window, L, d3, ClipperLib) {

    "use strict";

    /**
     * @method freeDraw
     * @param options {Object}
     * @return {window.L.FreeDraw}
     */
    L.freeDraw = function freeDraw(options) {
        return new L.FreeDraw(options);
    };

    L.FreeDraw = L.FeatureGroup.extend({

        /**
         * @property map
         * @type {L.Map|null}
         */
        map: null,

        /**
         * @property state
         * @type {Array}
         */
        state: [],

        /**
         * @property defaultPreferences
         * @type {Object}
         */
        defaultPreferences: {},

        /**
         * @property svg
         * @type {Object}
         */
        svg: {},

        /**
         * @property element
         * @type {Object}
         */
        element: {},

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
         * @property lastNotification
         * @type {String}
         */
        lastNotification: '',

        /**
         * @property markers
         * @type {L.LayerGroup|null}
         */
        markerLayer: L.layerGroup(),

        /**
         * @property hull
         * @type {Object}
         */
        hull: {},

        /**
         * @property memory
         * @type {Object}
         */
        memory: {},

        /**
         * @property polygons
         * @type {Array}
         */
        polygons: [],

        /**
         * @property edges
         * @type {Array}
         */
        edges: [],

        /**
         * @property mode
         * @type {Number}
         */
        mode: 1,

        /**
         * @property polygonCount
         * @type {Number}
         */
        polygonCount: 0,

        /**
         * Responsible for holding the coordinates of the user's last cursor position for drawing
         * the D3 polygon tracing the user's cursor.
         *
         * @property fromPoint
         * @type {Object}
         */
        fromPoint: {
            x: 0,
            y: 0
        },

        /**
         * @property movingEdge
         * @type {L.polygon|null}
         */
        movingEdge: null,

        /**
         * Responsible for knowing whether a boundary update should be propagated once the user exits
         * the editing mode.
         *
         * @property boundaryUpdateRequired
         * @type {Boolean}
         */
        boundaryUpdateRequired: false,

        /**
         * @property silenced
         * @type {Boolean}
         */
        silenced: false,

        /**
         * @constant RECOUNT_TIMEOUT
         * @type {Number}
         */
        RECOUNT_TIMEOUT: 1,

        /**
         * @method initialize
         * @param options {Object}
         * @return {void}
         */
        initialize: function initialize(options) {

            if (typeof d3 === 'undefined') {

                // Ensure D3 has been included.
                L.FreeDraw.Throw('D3 is a required library', 'http://d3js.org/');

            }

            if (typeof ClipperLib === 'undefined') {

                // Ensure JSClipper has been included.
                L.FreeDraw.Throw('JSClipper is a required library', 'http://sourceforge.net/p/jsclipper/wiki/Home%206/');

            }

            // Reset all of the properties.
            this.fromPoint = { x: 0, y: 0 };
            this.polygons  = [];
            this.edges     = [];
            this.hull      = {};
            this.latLngs   = [];

            options = options || {};

            this.memory  = new L.FreeDraw.Memory();
            this.options = new L.FreeDraw.Options();
            this.hull    = new L.FreeDraw.Hull();
            this.element = options.element || null;

            this.setMode(options.mode || this.mode);
            this.options.setPathClipperPadding(100);

            L.FreeDraw.Polygon = L.Polygon.extend({
                options: {
                    className: "leaflet-freedraw-polygon"
                }
            });

        },

        /**
         * @method recreateEdges
         * @param polygon {Object}
         * @return {Number|Boolean}
         */
        recreateEdges: function recreateEdges(polygon) {

            // Remove all of the current edges associated with the polygon.
            this.edges = this.edges.filter(function filter(edge) {

                if (edge._freedraw.polygon !== polygon) {
                    return true;
                }

                // Physically remove the edge from the DOM.
                this.map.removeLayer(edge);

            }.bind(this));

            // We can then re-attach the edges based on the current zoom level.
            return this.createEdges(polygon);

        },

        /**
         * @method resurrectOrphans
         * @return {void}
         */
        resurrectOrphans: function resurrectOrphans() {

            /**
             * @method recreate
             * @param polygon {Object}
             * @return {void}
             */
            var recreate = function recreate(polygon) {

                setTimeout(function() {

                    this.silently(function silently() {

                        // Reattach the polygon's edges.
                        this.recreateEdges(polygon);

                    }.bind(this));

                }.bind(this));

            };

            var polygons = this.getPolygons(true);

            polygons.forEach(function forEach(polygon) {

                if (polygon && polygon._parts[0]) {

                    // If the polygon is currently visible then we'll re-attach its edges for the current
                    // zoom level.
                    recreate.call(this, polygon);

                }

            }.bind(this));

            setTimeout(function setTimeout() {

                // Notify everybody of the update if we're using the edges to read the lat/longs.
                this.notifyBoundaries();

            }.bind(this));

        },

        /**
         * @method onAdd
         * @param map {L.Map}
         * @return {void}
         */
        onAdd: function onAdd(map) {

            map.on('zoomend', function onZoomEnd() {

                setTimeout(this.resurrectOrphans.bind(this));

            }.bind(this));

            // Lazily hook up the options and hull objects.
            this.map  = map;
            this.mode = this.mode || L.FreeDraw.MODES.VIEW;

            // Memorise the preferences so we know how to revert.
            this.defaultPreferences = {
                dragging:        map.dragging._enabled,
                touchZoom:       map.touchZoom._enabled,
                doubleClickZoom: map.doubleClickZoom._enabled,
                scrollWheelZoom: map.scrollWheelZoom._enabled
            };

            if (!this.element) {

                // Define the element D3 will bind to if the user hasn't specified a custom node.
                this.element = map._container;

            }

            // Define the line function for drawing the polygon from the user's mouse pointer.
            this.lineFunction = d3.svg.line()
                .x(function pointX(d) {
                    return d.x;
                })
                .y(function pointY(d) {
                    return d.y;
                })
                .interpolate('linear');

            // Create a new instance of the D3 free-hand tracer.
            this.createD3();

            // Attach all of the events.
            this._attachMouseDown();
            this._attachMouseMove();
            this._attachMouseUpLeave();

            // Set the default mode.
            this.setMode(this.mode);

        },

        /**
         * @method onRemove
         * @return {void}
         */
        onRemove: function onRemove() {
            this._clearPolygons();
        },

        /**
         * Responsible for polygon mutation without emitting the markers event.
         *
         * @method silently
         * @param callbackFn {Function}
         * @return {void}
         */
        silently: function silently(callbackFn) {

            var silentBefore = this.silenced;
            this.silenced      = true;
            callbackFn.apply(this);

            if (!silentBefore) {

                // Only remove the silence if it wasn't silent before, which prevents against
                // nesting the `silently` methods inside one another.
                this.silenced = false;

            }
            
        },

        /**
         * @method cancelAction
         * @return {void}
         */
        cancelAction: function cancelAction() {

            this.creating = false;
            this.movingEdge = null;

            // Begin to create a brand-new polygon.
            this.destroyD3().createD3();

        },

        /**
         * Update the permissions for what the user can do on the map.
         *
         * @method setMapPermissions
         * @param method {String}
         * @return {void}
         */
        setMapPermissions: function setMapPermissions(method) {

            this.map.dragging[method]();
            this.map.touchZoom[method]();
            this.map.doubleClickZoom[method]();
            this.map.scrollWheelZoom[method]();

            if (method === 'enable') {

                // Inherit the preferences assigned to the map instance by the developer.

                if (!this.defaultPreferences.dragging) {
                    this.map.dragging.disable();
                }

                if (!this.defaultPreferences.touchZoom) {
                    this.map.touchZoom.disable();
                }

                if (!this.defaultPreferences.doubleClickZoom) {
                    this.map.doubleClickZoom.disable();
                }

                if (!this.defaultPreferences.scrollWheelZoom) {
                    this.map.scrollWheelZoom.disable();
                }

            }

        },

        /**
         * @method setMode
         * @param mode {Number}
         * @return {void}
         */
        setMode: function setMode(mode) {

            // Prevent the mode from ever being defined as zero.
            mode = (mode === 0) ? L.FreeDraw.MODES.VIEW : mode;

            // Set the current mode and emit the event.
            this.mode = mode;
            this.fire('mode', {
                mode: mode
            });

            if (!this.map) {
                return;
            }

            // Enable or disable dragging according to the current mode.
            var isCreate = !!(mode & L.FreeDraw.MODES.CREATE),
                method = !isCreate ? 'enable' : 'disable';
            this.map.dragging[method]();

            if (this.boundaryUpdateRequired && !(this.mode & L.FreeDraw.MODES.EDIT)) {

                // Share the boundaries if there's an update available and the user is changing the mode
                // to anything else but the edit mode again.
                this.notifyBoundaries();
                this.boundaryUpdateRequired = false;

                if (!this.options.memoriseEachEdge) {
                    this.memory.save(this.getPolygons(true));
                }

            }

            /**
             * Responsible for applying the necessary classes to the map based on the
             * current active modes.
             *
             * @method defineClasses
             * @return {void}
             */
            (function defineClasses(modes, map, addClass, removeClass) {

                removeClass(map, 'mode-create');
                removeClass(map, 'mode-edit');
                removeClass(map, 'mode-delete');
                removeClass(map, 'mode-view');
                removeClass(map, 'mode-append');

                if (mode & modes.CREATE) {
                    addClass(map, 'mode-create');
                }

                if (mode & modes.EDIT) {
                    addClass(map, 'mode-edit');
                }

                if (mode & modes.DELETE) {
                    addClass(map, 'mode-delete');
                }

                if (mode & modes.VIEW) {
                    addClass(map, 'mode-view');
                }

                if (mode & modes.APPEND) {
                    addClass(map, 'mode-append');
                }

            }(L.FreeDraw.MODES, this.map._container, L.DomUtil.addClass, L.DomUtil.removeClass));

        },

        /**
         * @method unsetMode
         * @param mode {Number}
         * @return {void}
         */
        unsetMode: function unsetMode(mode) {
            this.setMode(this.mode ^ mode);
        },

        /**
         * @method createD3
         * @return {void}
         */
        createD3: function createD3() {

            this.svg = d3.select(this.options.element || this.element).append('svg')
                .attr('class', this.options.svgClassName)
                .attr('width', 200).attr('height', 200);

        },

        /**
         * @method destroyD3
         * @return {L.FreeDraw}
         * @chainable
         */
        destroyD3: function destroyD3() {
            this.svg.remove();
            this.svg = {};
            return this;
        },

        /**
         * @method latLngsToClipperPoints
         * @param latLngs {L.LatLng[]}
         * @return {Object}
         */
        latLngsToClipperPoints: function latLngsToClipperPoints(latLngs) {

            return latLngs.map(function forEach(latLng) {

                var point = this.map.latLngToLayerPoint(latLng);
                return {
                    X: point.x,
                    Y: point.y
                };

            }.bind(this));

        },

        /**
         * @method clipperPolygonsToLatLngs
         * @param polygons {Array}
         * @return {Array}
         */
        clipperPolygonsToLatLngs: function clipperPolygonsToLatLngs(polygons) {

            var latLngs = [];

            polygons.forEach(function forEach(polygon) {

                polygon.forEach(function polygons(point) {

                    point = L.point(point.X, point.Y);
                    var latLng = this.map.layerPointToLatLng(point);
                    latLngs.push(latLng);

                }.bind(this));

            }.bind(this));

            return latLngs;

        },

        /**
         * @method uniqueLatLngs
         * @param latLngs {L.LatLng[]}
         * @return {L.LatLng[]}
         */
        uniqueLatLngs: function uniqueLatLngs(latLngs) {

            var previousLatLngs = [],
                uniqueValues = [];

            latLngs.forEach(function forEach(latLng) {

                var model = JSON.stringify(latLng);

                if (previousLatLngs.indexOf(model) !== -1) {
                    return;
                }

                previousLatLngs.push(model);
                uniqueValues.push(latLng);

            });

            return uniqueValues;

        },

        /**
         * @method handlePolygonClick
         * @param polygon {L.Polygon}
         * @param event {Object}
         * @return {void}
         */
        handlePolygonClick: function handlePolygonClick(polygon, event) {

            var latLngs = [],
                newPoint = this.map.mouseEventToContainerPoint(event.originalEvent),
                lowestDistance = Infinity,
                startPoint = new L.Point(),
                endPoint = new L.Point(),
                parts = [];

            polygon._latlngs.forEach(function forEach(latLng) {

                // Push each part into the array, because relying on the polygon's "_parts" array
                // isn't safe since they are removed when parts of the polygon aren't visible.
                parts.push(this.map.latLngToContainerPoint(latLng));

            }.bind(this));

            parts.forEach(function forEach(point, index) {

                var firstPoint = point,
                    secondPoint = parts[index + 1] || parts[0],
                    distance = L.LineUtil.pointToSegmentDistance(newPoint, firstPoint, secondPoint);

                if (distance < lowestDistance) {

                    // We discovered a distance that possibly should contain the new point!
                    lowestDistance = distance;
                    startPoint = firstPoint;
                    endPoint = secondPoint;

                }

            }.bind(this));

            parts.forEach(function forEach(point, index) {

                var nextPoint = parts[index + 1] || parts[0];

                if (point === startPoint && nextPoint === endPoint) {

                    latLngs.push(this.map.containerPointToLatLng(point));
                    latLngs.push(this.map.containerPointToLatLng(newPoint));
                    return;

                }

                latLngs.push(this.map.containerPointToLatLng(point));

            }.bind(this));

            /**
             * @constant INNER_DISTANCE
             * @type {Number}
             */
            var INNER_DISTANCE = this.options.elbowDistance;

            /**
             * @method updatePolygon
             * @return {void}
             */
            var updatePolygon = function updatePolygon() {

                if (!(this.mode & L.FreeDraw.MODES.APPEND)) {

                    // User hasn't enabled the append mode.
                    return;

                }

                // Redraw the polygon based on the newly added lat/long boundaries.
                polygon.setLatLngs(latLngs);

                // Recreate the edges for the polygon.
                this.destroyEdges(polygon);
                this.createEdges(polygon);

            }.bind(this);

            // If the user hasn't enabled delete mode but has the append mode active, then we'll
            // assume they're always wanting to add an edge.
            if (this.mode & L.FreeDraw.MODES.APPEND && !(this.mode & L.FreeDraw.MODES.DELETE)) {

                // Mode has been set to only add new elbows when the user clicks the polygon close
                // to the boundaries as defined by the `setMaximumDistanceForElbow` method.
                if (this.options.onlyInDistance && lowestDistance > INNER_DISTANCE) {
                    return;
                }

                updatePolygon();
                return;

            }

            // If the inverse of the aforementioned is true then we'll always delete the polygon.
            if (this.mode & L.FreeDraw.MODES.DELETE && !(this.mode & L.FreeDraw.MODES.APPEND)) {
                this.destroyPolygon(polygon);
                return;
            }

            // Otherwise we'll use some logic to detect whether we should delete or add a new elbow.
            if (lowestDistance > INNER_DISTANCE && this.mode & L.FreeDraw.MODES.DELETE) {

                // Delete the polygon!
                this.destroyPolygon(polygon);
                return;

            }

            // Otherwise create a new elbow.
            updatePolygon();

        },

        /**
         * @method createPolygon
         * @param latLngs {L.LatLng[]}
         * @param [forceCreation=false] {Boolean}
         * @return {L.Polygon|Boolean}
         */
        createPolygon: function createPolygon(latLngs, forceCreation) {

            if (!this.options.multiplePolygons && this.getPolygons(true).length >= 1) {

                if (this.options.destroyPrevious) {

                    // Destroy the current polygon and then draw the current polygon.
                    this.silently(this.clearPolygons);

                } else {

                    // Otherwise delete the line because polygon creation has been disallowed, since there's
                    // already one polygon on the map.
                    this.destroyD3().createD3();
                    return false;

                }

            }

            // Begin to create a brand-new polygon.
            this.destroyD3().createD3();

            if (this.options.simplifyPolygon) {

                latLngs = function simplifyPolygons() {

                    var points   = ClipperLib.Clipper.CleanPolygon(this.latLngsToClipperPoints(latLngs), 1.1),
                        polygons = ClipperLib.Clipper.SimplifyPolygon(points, ClipperLib.PolyFillType.pftNonZero);

                    return this.clipperPolygonsToLatLngs(polygons);

                }.apply(this);

            }

            if (latLngs.length <= 3) {

                if (!forceCreation) {
                    return false;
                }

            }

            var polygon = new L.FreeDraw.Polygon(latLngs, {
                smoothFactor: this.options.smoothFactor
            });

            // Handle the click event on a polygon.
            polygon.on('click', function onClick(event) {
                this.handlePolygonClick(polygon, event);
            }.bind(this));

            // Add the polyline to the map, and then find the edges of the polygon.
            polygon.addTo(this.map);
            this.polygons.push(polygon);

            // Attach all of the edges to the polygon.
            this.createEdges(polygon);

            /**
             * Responsible for preventing the re-rendering of the polygon.
             *
             * @method clobberLatLngs
             * @return {void}
             */
            (function clobberLatLngs() {

                if (this.silenced || !polygon._parts[0]) {
                    return;
                }

                polygon._latlngs = [];

                polygon._parts[0].forEach(function forEach(edge) {

                    // Iterate over all of the parts to update the latLngs to clobber the redrawing upon zooming.
                    polygon._latlngs.push(this.map.layerPointToLatLng(edge));

                }.bind(this));

            }.bind(this))();

            if (this.options.attemptMerge && !this.silenced) {

                // Merge the polygons if the developer wants to, which at the moment is very experimental!
                this.mergePolygons();

            }

            if (!this.silenced) {
                this.notifyBoundaries();
                this.memory.save(this.getPolygons(true));
            }

            return polygon;

        },

        /**
         * @method predefinedPolygon
         * @param latLngs {L.LatLng[]}
         * @return {L.Polygon|Boolean}
         */
        predefinedPolygon: function predefinedPolyon(latLngs) {
            return this.createPolygon(latLngs, true);
        },

        /**
         * @method undo
         * @return {void}
         */
        undo: function undo() {
            this._modifyState('undo');
        },

        /**
         * @method redo
         * @return {void}
         */
        redo: function redo() {
            this._modifyState('redo');
        },

        /**
         * @method _modifyState
         * @param method {String}
         * @return {void}
         * @private
         */
        _modifyState: function _modifyState(method) {

            // Silently remove all of the polygons, and then obtain the new polygons to be inserted
            // into the Leaflet map.
            this.silently(this._clearPolygons.bind(this));

            var polygons = this.memory[method]();

            // Iteratively create each polygon for the new state.
            polygons.forEach(function forEach(polygon) {

                this.silently(function silently() {

                    // Create each of the polygons from the current state silently.
                    this.createPolygon(polygon);

                }.bind(this));

            }.bind(this));

            // ...And we can finally notify everybody of our new boundaries!
            this.notifyBoundaries();

        },

        /**
         * @method getPolygons
         * @param [includingOrphans=false] {Boolean}
         * @return {Array}
         */
        getPolygons: function getPolygons(includingOrphans) {

            var polygons = [];

            if (includingOrphans) {

                if (!this.map) {
                    return [];
                }

                /**
                 * Used to identify a node that is a <g> element.
                 *
                 * @constant GROUP_TAG
                 * @type {String}
                 */
                var GROUP_TAG = 'G';

                for (var layerIndex in this.map._layers) {

                    if (this.map._layers.hasOwnProperty(layerIndex)) {

                        var polygon = this.map._layers[layerIndex];

                        // Ensure we're dealing with a <g> node that was created by FreeDraw (...an SVG group element).
                        if (polygon._container && polygon._container.tagName.toUpperCase() === GROUP_TAG) {
                            if (polygon instanceof L.FreeDraw.Polygon) {
                                polygons.push(polygon);
                            }
                        }

                    }

                }

            } else {

                this.edges.forEach(function forEach(edge) {

                    if (polygons.indexOf(edge._freedraw.polygon) === -1) {
                        if (edge._freedraw.polygon instanceof L.FreeDraw.Polygon) {
                            polygons.push(edge._freedraw.polygon);
                        }
                    }

                }.bind(this));

            }

            return polygons;

        },

        /**
         * @method mergePolygons
         * @return {void}
         */
        mergePolygons: function mergePolygons() {

            /**
             * @method mergePass
             * @return {void}
             */
            var mergePass = function mergePass() {

                var allPolygons = this.getPolygons(),
                    allPoints = [];

                allPolygons.forEach(function forEach(polygon) {
                    allPoints.push(this.latLngsToClipperPoints(polygon._latlngs));
                }.bind(this));

                var polygons = ClipperLib.Clipper.SimplifyPolygons(allPoints, ClipperLib.PolyFillType.pftNonZero);

                this.silently(function silently() {

                    this._clearPolygons();

                    polygons.forEach(function forEach(polygon) {

                        var latLngs = [];

                        polygon.forEach(function forEach(point) {

                            point = L.point(point.X, point.Y);
                            latLngs.push(this.map.layerPointToLatLng(point));

                        }.bind(this));

                        // Create the polygon!
                        this.createPolygon(latLngs, true);

                    }.bind(this));

                });

            }.bind(this);

            // Perform two merge passes to simplify the polygons.
            mergePass();
            mergePass();

            // Trim polygon edges after being modified.
            this.getPolygons(true).forEach(this.trimPolygonEdges.bind(this));

        },

        /**
         * @method destroyPolygon
         * @param polygon {Object}
         * @return {void}
         */
        destroyPolygon: function destroyPolygon(polygon) {

            this.map.removeLayer(polygon);

            // Remove from the polygons array.
            var index = this.polygons.indexOf(polygon);
            this.polygons.splice(index, 1);

            this.destroyEdges(polygon);

            if (!this.silenced) {
                this.notifyBoundaries();
                this.memory.save(this.getPolygons(true));
            }

            if (this.options.deleteExitMode && !this.silenced) {

                // Automatically exit the user from the deletion mode.
                this.setMode(this.mode ^ L.FreeDraw.MODES.DELETE);

            }

        },

        /**
         * @method destroyEdges
         * @param polygon {Object}
         * @return {void}
         */
        destroyEdges: function destroyEdges(polygon) {

            // ...And then remove all of its related edges to prevent memory leaks.
            this.edges = this.edges.filter(function filter(edge) {

                if (edge._freedraw.polygon !== polygon) {
                    return true;
                }

                // Physically remove the edge from the DOM.
                this.map.removeLayer(edge);

            }.bind(this));

        },

        /**
         * @method clearPolygons
         * @return {void}
         */
        clearPolygons: function clearPolygons() {

            this.silently(this._clearPolygons);

            if (!this.silenced) {
                this.notifyBoundaries();
                this.memory.save(this.getPolygons(true));
            }

        },

        /**
         * @method _clearPolygons
         * @return {void}
         * @private
         */
        _clearPolygons: function _clearPolygons() {

            this.getPolygons().forEach(function forEach(polygon) {

                // Iteratively remove each polygon in the DOM.
                this.destroyPolygon(polygon);

            }.bind(this));

            if (!this.silenced) {
                this.notifyBoundaries();
            }

        },

        /**
         * @method notifyBoundaries
         * @return {void}
         */
        notifyBoundaries: function notifyBoundaries() {

            var latLngs = [];

            this.getPolygons(true).forEach(function forEach(polygon) {

                // Ensure the polygon is visible.
                latLngs.push(polygon._latlngs);

            }.bind(this));

            // Ensure the polygon is closed for the geospatial query.
            (function createClosedPolygon() {

                latLngs.forEach(function forEach(latLngGroup) {

                    // Determine if the latitude/longitude values differ for the first and last
                    // lat/long objects.
                    var lastIndex = latLngGroup.length - 1;

                    if (lastIndex && latLngGroup[0] && latLngGroup[lastIndex]) {

                        var latDiffers = latLngGroup[0].lat !== latLngGroup[lastIndex].lat,
                            lngDiffers = latLngGroup[0].lng !== latLngGroup[lastIndex].lng;

                        if (latDiffers || lngDiffers) {

                            // It's not currently a closed polygon for the query, so we'll create the closed
                            // polygon for the geospatial query.
                            latLngGroup.push(latLngGroup[0]);

                        }

                    }

                });

            }.bind(this))();

            // Update the polygon count variable.
            this.polygonCount = latLngs.length;

            // Ensure the last shared notification differs from the current.
            var notificationFingerprint = JSON.stringify(latLngs);
            if (this.lastNotification === notificationFingerprint) {
                return;
            }

            // Save the notification for the next time.
            this.lastNotification = notificationFingerprint;

            // Invoke the user passed method for specifying latitude/longitudes.
            this.fire('markers', {
                latLngs: latLngs
            });

            // Perform another count at a later date to account for polygons that may have been removed
            // due to their polygon areas being too small.
            setTimeout(this.emitPolygonCount.bind(this), this.RECOUNT_TIMEOUT);

        },

        /**
         * @method emitPolygonCount
         * @return {void}
         */
        emitPolygonCount: function emitPolygonCount() {

            /**
             * @constant EMPTY_PATH
             * @type {String}
             */
            var EMPTY_PATH = 'M0 0';

            // Perform a recount on the polygon count, since some may be removed because of their
            // areas being too small.
            var polygons = this.getPolygons(true),
                allEmpty = polygons.every(function every(polygon) {

                    var path = polygon._container.lastChild.getAttribute('d').trim();
                    return path === EMPTY_PATH;

                });

            if (allEmpty) {

                this.silently(function silently() {

                    // Silently remove all of the polygons because they are empty.
                    this._clearPolygons();
                    this.fire('markers', {
                        latLngs: []
                    });
                    this.fire('count', {
                        count: this.polygonCount
                    });

                }.bind(this));

                this.polygonCount = 0;
                polygons.length = 0;

            }

            if (polygons.length !== this.polygonCount) {

                // If the size differs then we'll assign the new length, and emit the count event.
                this.polygonCount = polygons.length;
                this.fire('count', {
                    count: this.polygonCount
                });

            }

        },

        /**
         * @method createEdges
         * @param polygon {L.polygon}
         * @return {Number|Boolean}
         */
        createEdges: function createEdges(polygon) {

            /**
             * Responsible for getting the parts based on the original lat/longs.
             *
             * @method originalLatLngs
             * @param polygon {Object}
             * @return {Array}
             */
            var originalLatLngs = function originalLatLngs(polygon) {

                if (!polygon._parts[0]) {

                    // We don't care for polygons that are not in the viewport.
                    return [];

                }

                return polygon._latlngs.map(function map(latLng) {
                    return this.map.latLngToLayerPoint(latLng);
                }.bind(this));

            }.bind(this);

            var parts = this.uniqueLatLngs(originalLatLngs(polygon)),
                edgeCount = 0;

            if (!parts) {
                return false;
            }

            parts.forEach(function forEach(point) {

                // Leaflet creates elbows in the polygon, which we need to utilise to add the
                // points for modifying its shape.
                var edge = L.divIcon({
                        className: this.options.iconClassName
                    }),
                    latLng = this.map.layerPointToLatLng(point);

                edge = L.marker(latLng, {
                    icon: edge
                }).addTo(this.map);

                // Setup the freedraw object with the meta data.
                edge._freedraw = {
                    polygon: polygon,
                    polygonId: polygon['_leaflet_id'],
                    latLng: edge._latlng
                };

                this.edges.push(edge);
                edgeCount++;

                edge.on('mousedown touchstart', function onMouseDown(event) {

                    event.originalEvent.preventDefault();
                    event.originalEvent.stopPropagation();
                    this.movingEdge = event.target;

                }.bind(this));

            }.bind(this));

            return edgeCount;

        },

        /**
         * @method updatePolygonEdge
         * @param edge {Object}
         * @param positionX {Number}
         * @param positionY {Number}
         * @return {void}
         */
        updatePolygonEdge: function updatePolygon(edge, positionX, positionY) {

            var updatedLatLng = this.map.containerPointToLatLng(new L.Point(positionX, positionY));

            // Update the latitude and longitude for both the Leaflet.js model, and the FreeDraw model.
            edge.setLatLng(updatedLatLng);
            edge._freedraw.latLng = updatedLatLng;

            var allEdges = [];

            // Fetch all of the edges in the group based on the polygon.
            var edges = this.edges.filter(function filter(currentEdge) {
                allEdges.push(currentEdge);
                return currentEdge._freedraw.polygon === edge._freedraw.polygon;
            });

            // Update the edge object.
            this.edges = allEdges;

            var updatedLatLngs = [];
            edges.forEach(function forEach(marker) {
                updatedLatLngs.push(marker.getLatLng());
            });

            // Update the latitude and longitude values.
            edge._freedraw.polygon.setLatLngs(updatedLatLngs);
            edge._freedraw.polygon.redraw();

        },

        /**
         * @method _attachMouseDown
         * @return {void}
         * @private
         */
        _attachMouseDown: function _attachMouseDown() {

            this.map.on('mousedown touchstart', function onMouseDown(event) {

                /**
                 * Used for determining if the user clicked with the right mouse button.
                 *
                 * @constant RIGHT_CLICK
                 * @type {Number}
                 */
                var RIGHT_CLICK = 2;

                if (event.originalEvent.button === RIGHT_CLICK) {
                    return;
                }

                var originalEvent = event.originalEvent;

                if (!this.options.disablePropagation) {
                    originalEvent.stopPropagation();
                }

                originalEvent.preventDefault();

                this.latLngs   = [];
                this.fromPoint = this.map.latLngToContainerPoint(event.latlng);

                if (this.mode & L.FreeDraw.MODES.CREATE) {

                    // Place the user in create polygon mode.
                    this.creating = true;
                    this.setMapPermissions('disable');

                }

            }.bind(this));

        },

        /**
         * @method _attachMouseMove
         * @return {void}
         * @private
         */
        _attachMouseMove: function _attachMouseMove() {

            this.map.on('mousemove touchmove', function onMouseMove(event) {

                var originalEvent = event.originalEvent;

                if (this.movingEdge) {

                    // User is in fact modifying the shape of the polygon.
                    this._editMouseMove(event);
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

            var pointModel = this.map.latLngToContainerPoint(event.latlng);

            // Modify the position of the marker on the map based on the user's mouse position.
            var styleDeclaration = this.movingEdge._icon.style;
            styleDeclaration[L.DomUtil.TRANSFORM] = pointModel;

            // Update the polygon's shape in real-time as the user drags their cursor.
            this.updatePolygonEdge(this.movingEdge, pointModel.x, pointModel.y);

        },

        /**
         * @method _attachMouseUpLeave
         * @return {void}
         * @private
         */
        _attachMouseUpLeave: function _attachMouseUpLeave() {

            /**
             * @method completeAction
             * @return {void}
             */
            var completeAction = function completeAction() {

                if (this.movingEdge) {

                    if (!this.options.boundariesAfterEdit) {

                        // Notify of a boundary update immediately after editing one edge.
                        this.notifyBoundaries();

                    } else {

                        // Change the option so that the boundaries will be invoked once the edit mode
                        // has been exited.
                        this.boundaryUpdateRequired = true;

                    }

                    // Recreate the polygon boundaries because we may have straight edges now.
                    this.trimPolygonEdges(this.movingEdge._freedraw.polygon);
                    this.mergePolygons();
                    this.movingEdge = null;

                    if (this.options.memoriseEachEdge) {
                        this.memory.save(this.getPolygons(true));
                    }

                    setTimeout(this.emitPolygonCount.bind(this), this.RECOUNT_TIMEOUT);
                    return;

                }

                this._createMouseUp();

            }.bind(this);

            this.map.on('mouseup touchend', completeAction);

            var element = $window.document.getElementsByTagName('body')[0];
            element.onmouseleave = completeAction;

        },

        /**
         * @method trimPolygonEdges
         * @param polygon {L.Polygon}
         * @return {void}
         */
        trimPolygonEdges: function trimPolygonEdges(polygon) {

            var latLngs = [];

            if (!polygon || polygon._parts.length === 0 || !polygon._parts[0]) {
                return;
            }

            polygon._parts[0].forEach(function forEach(point) {
                latLngs.push(this.map.layerPointToLatLng(point));
            }.bind(this));

            polygon.setLatLngs(latLngs);
            polygon.redraw();

            this.destroyEdges(polygon);
            this.createEdges(polygon);

        },

        /**
         * @method _createMouseMove
         * @param event {Object}
         * @return {void}
         * @private
         */
        _createMouseMove: function _createMouseMove(event) {

            // Resolve the pixel point to the latitudinal and longitudinal equivalent.
            var point = this.map.mouseEventToContainerPoint(event),
                latLng = this.map.containerPointToLatLng(point);

            // Line data that is fed into the D3 line function we defined earlier.
            var lineData = [this.fromPoint, {
                x: point.x,
                y: point.y
            }];

            // Draw SVG line based on the last movement of the mouse's position.
            this.svg.append('path').classed('drawing-line', true).attr('d', this.lineFunction(lineData))
                    .attr('stroke', '#D7217E').attr('stroke-width', 2).attr('fill', 'none');

            // Take the pointer's position from the event for the next invocation of the mouse move event,
            // and store the resolved latitudinal and longitudinal values.
            this.fromPoint.x = point.x;
            this.fromPoint.y = point.y;
            this.latLngs.push(latLng);

        },

        /**
         * @method _createMouseUp
         * @return {void}
         * @private
         */
        _createMouseUp: function _createMouseUp() {

            if (!this.creating) {
                return;
            }

            // User has finished creating their polygon!
            this.creating = false;

            if (this.latLngs.length <= 2) {

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
            var polygon = this.createPolygon(latLngs || this.latLngs);

            if (!polygon) {
                return;
            }

            this.latLngs = [];

            if (this.options.createExitMode) {

                // Automatically exit the user from the creation mode.
                this.setMode(this.mode ^ L.FreeDraw.MODES.CREATE);
                this.setMapPermissions('enable');

            }

        },

    });

    /**
     * @constant MODES
     * @type {Object}
     */
    L.FreeDraw.MODES = {
        VIEW: 1,
        CREATE: 2,
        EDIT: 4,
        DELETE: 8,
        APPEND: 16,
        EDIT_APPEND: 4 | 16,
        ALL: 1 | 2 | 4 | 8 | 16
    };

    /**
     * @method Throw
     * @param message {String}
     * @param [path=''] {String}
     * @return {void}
     */
    L.FreeDraw.Throw = function ThrowException(message, path) {

        if (path) {

            if (path.substr(0, 7) === 'http://' || path.substr(0, 8) === 'https://') {

                // Use developer supplied full URL since we've received a FQDN.
                $window.console.error(path);

            } else {

                // Output a link for a more informative message in the EXCEPTIONS.md.
                $window.console.error('See: https://github.com/Wildhoney/Leaflet.FreeDraw/blob/master/EXCEPTIONS.md#' + path);

            }
        }

        // ..And then output the thrown exception.
        throw "Leaflet.FreeDraw: " + message + ".";

    };

})(window, window.L, window.d3, window.ClipperLib);

(function() {

    "use strict";

    /**
     * @module FreeDraw
     * @submodule Hull
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    L.FreeDraw.Hull = function FreeDrawHull() {};

    /**
     * @property prototype
     * @type {Object}
     */
    L.FreeDraw.Hull.prototype = {

        /**
         * @property map
         * @type {L.Map|null}
         */
        map: null,

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
                points.push(this.map.latLngToLayerPoint(latLng));

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
                hullLatLngs.push(this.map.layerPointToLatLng(point));
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

}());

(function() {

    "use strict";

    /**
     * @module FreeDraw
     * @submodule Memory
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    L.FreeDraw.Memory = function FreeDrawMemory() {};

    /**
     * @property prototype
     * @type {Object}
     */
    L.FreeDraw.Memory.prototype = {

        /**
         * @property states
         * @type {Array}
         */
        states: [[]],

        /**
         * @property current
         * @type {Number}
         */
        current: 0,

        /**
         * @method save
         * @param polygons {Array}
         * @return {void}
         */
        save: function save(polygons) {

            this.current++;

            if (this.states[this.current]) {

                // If the current state exists then the user has started to overwrite their
                // redo history, which is expected behaviour. With that in mind, let's remove
                // the states before the current!
                this.clearFrom(this.current);

            }

            if (!this.states[this.current]) {

                // Otherwise the index is currently empty and therefore we should initialise it
                // to an empty array.
                this.states[this.current] = [];

            }

            polygons.forEach(function forEach(polygon) {

                // Each polygon is represented as a separate entry in the array.
                this.states[this.current].push(polygon._latlngs);

            }.bind(this));

        },

        /**
         * Responsible for rewinding the state and returning the current state.
         *
         * @method previous
         * @return {Array}
         */
        undo: function undo() {

            this.current--;

            if (!this.states[this.current]) {

                // Index doesn't exist in the state array.
                this.current++;

            }
            return this.states[this.current];

        },

        /**
         * @method canUndo
         * @return {Boolean}
         */
        canUndo: function canUndo() {
            return !!this.states[this.current - 1];
        },

        /**
         * Responsible for fast-forwarding the state and returning the current state.
         *
         * @method previous
         * @return {Array}
         */
        redo: function redo() {

            this.current++;

            if (!this.states[this.current]) {

                // Index doesn't exist in the state array.
                this.current--;

            }

            return this.states[this.current];

        },

        /**
         * @method canRedo
         * @return {Boolean}
         */
        canRedo: function canRedo() {
            return !!this.states[this.current + 1];
        },

        /**
         * Responsible for clearing the history from a given index, including the index supplied.
         *
         * @method clearFrom
         * @param index {Number}
         * @return {void}
         */
        clearFrom: function clearFrom(index) {
            this.states.splice(index);
        }

    };

})();

(function($window, L) {

    "use strict";

    /**
     * @module FreeDraw
     * @submodule Options
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    L.FreeDraw.Options = function FreeDrawOptions() {};

    /**
     * @property prototype
     * @type {Object}
     */
    L.FreeDraw.Options.prototype = {

        /**
         * @property multiplePolygons
         * @type {Boolean}
         */
        multiplePolygons: true,

        /**
         * @property simplifyPolygon
         * @type {Boolean}
         */
        simplifyPolygon: true,

        /**
         * @property hullAlgorithm
         * @type {String|Boolean}
         */
        hullAlgorithm: 'wildhoneyConcaveHull',

        /**
         * @property boundariesAfterEdit
         * @type {Boolean}
         */
        boundariesAfterEdit: false,

        /**
         * @property createExitMode
         * @type {Boolean}
         */
        createExitMode: true,

        /**
         * @property attemptMerge
         * @type {Boolean}
         */
        attemptMerge: true,

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
         * @property deleteExitMode
         * @type {Boolean}
         */
        deleteExitMode: false,

        /**
         * @property memoriseEachEdge
         * @type {Boolean}
         */
        memoriseEachEdge: true,

        /**
         * @property destroyPrevious
         * @type {Boolean}
         */
        destroyPrevious: false,

        /**
         * @property disablePropagation
         * @type {Boolean}
         */
        disablePropagation: false,

        /**
         * @property elbowDistance
         * @type {Number}
         */
        elbowDistance: 10,

        /**
         * @property onlyInDistance
         * @type {Boolean}
         */
        onlyInDistance: false,

        /**
         * @property hullAlgorithms
         * @type {Object}
         */
        hullAlgorithms: {

            /**
             * @property brian3kb/graham_scan_js
             * @type {Object}
             */
            'brian3kb/graham_scan_js': {
                method: 'brian3kbGrahamScan',
                name: 'Graham Scan JS',
                global: 'ConvexHullGrahamScan',
                link: 'https://github.com/brian3kb/graham_scan_js'
            },

            /**
             * @property Wildhoney/ConcaveHull
             * @type {Object}
             */
            'Wildhoney/ConcaveHull': {
                method: 'wildhoneyConcaveHull',
                name: 'Concave Hull',
                global: 'ConcaveHull',
                link: 'https://github.com/Wildhoney/ConcaveHull'
            }

        },

        /**
         * @method setMemoriseEachEdge
         * @param value {Boolean}
         * @return {void}
         */
        setMemoriseEachEdge: function setMemoriseEachEdge(value) {
            this.memoriseEachEdge = !!value;
        },

        /**
         * @method addElbowOnlyWithinDistance
         * @param value {Boolean}
         */
        addElbowOnlyWithinDistance: function addElbowOnlyWithinDistance(value) {
            this.onlyInDistance = !!value;
        },

        /**
         * @method setPathClipperPadding
         * @param value {Number}
         * @return {void}
         */
        setPathClipperPadding: function setPathClipperPadding(value) {

            // Prevent polygons outside of the viewport from being clipped.
            L.Path.CLIP_PADDING = value;

        },

        /**
         * @method disableStopPropagation
         * @return {void}
         */
        disableStopPropagation: function disableStopPropagation() {
            this.disablePropagation = true;
        },

        /**
         * @method setMaximumDistanceForElbow
         * @param maxDistance {Number}
         * @return {void}
         */
        setMaximumDistanceForElbow: function setMaximumDistanceForElbow(maxDistance) {
            this.elbowDistance = +maxDistance;
        },

        /**
         * @method exitModeAfterCreate
         * @param value {Boolean}
         * @return {void}
         */
        exitModeAfterCreate: function exitModeAfterCreate(value) {
            this.createExitMode = !!value;
        },

        /**
         * @method exitModeAfterDelete
         * @param value {Boolean}
         * @return {void}
         */
        exitModeAfterDelete: function exitModeAfterDelete(value) {
            this.deleteExitMode = !!value;
        },

        /**
         * @method destroyPreviousPolygon
         * @param value {Boolean}
         * @return {void}
         */
        destroyPreviousPolygon: function destroyPreviousPolygon(value) {
            this.destroyPrevious = !!value;
        },

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
         * @method setBoundariesAfterEdit
         * @param value {Boolean}
         * @return {void}
         */
        setBoundariesAfterEdit: function setBoundariesAfterEdit(value) {
            this.boundariesAfterEdit = !!value;
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

            if (!algorithm) {
                return;
            }

            // Resolve the hull algorithm.
            algorithm = this.hullAlgorithms[algorithm];

            if (typeof $window[algorithm.global] === 'undefined') {

                // Ensure hull algorithm module has been included.
                L.FreeDraw.Throw(algorithm.name + ' is a required library for concave/convex hulls', algorithm.link);

            }

            this.hullAlgorithm = algorithm.method;

        }

    };

})(window, window.L);

(function() {

    "use strict";

    /**
     * @module FreeDraw
     * @submodule Utilities
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     */
    L.FreeDraw.Utilities = {

        /**
         * Responsible for converting the multiple polygon points into a MySQL object for
         * geo-spatial queries.
         *
         * @method getMySQLMultiPolygon
         * @param latLngGroups {Array}
         * @return {String}
         */
        getMySQLMultiPolygon: function getMySQLMultiPolygon(latLngGroups) {

            var groups = [];

            latLngGroups.forEach(function forEach(latLngs) {

                var group = [];

                latLngs.forEach(function forEach(latLng) {
                    group.push(latLng.lng + ' ' + latLng.lat);
                });

                groups.push('((' + group.join(',') + '))');

            });

            return 'MULTIPOLYGON(' + groups.join(',') + ')';

        },

        /**
         * Responsible to generating disparate MySQL polygons from the lat/long boundaries.
         *
         * @method getMySQLPolygons
         * @param latLngGroups {L.LatLng[]}
         * @returns {Array}
         */
        getMySQLPolygons: function getMySQLPolygons(latLngGroups) {

            var groups = [];

            latLngGroups.forEach(function forEach(latLngs) {

                var group = [];

                latLngs.forEach(function forEach(latLng) {
                    group.push(latLng.lng + ' ' + latLng.lat);
                });

                groups.push('POLYGON((' + group.join(',') + '))');

            });

            return groups;

        }

    };

})();