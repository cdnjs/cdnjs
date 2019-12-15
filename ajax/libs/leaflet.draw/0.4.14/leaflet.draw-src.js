/*
 Leaflet.draw 0.4.14, a plugin that adds drawing and editing tools to Leaflet powered maps.
 (c) 2012-2017, Jacob Toye, Jon West, Smartrak, Leaflet

 https://github.com/Leaflet/Leaflet.draw
 http://leafletjs.com
 */
(function (window, document, undefined) {/**
 * Leaflet.draw assumes that you have already included the Leaflet library.
 */
L.drawVersion = "0.4.14";
/**
 * @class L.Draw
 * @aka Draw
 *
 *
 * To add the draw toolbar set the option drawControl: true in the map options.
 *
 * @example
 * ```js
 *      var map = L.map('map', {drawControl: true}).setView([51.505, -0.09], 13);
 *
 *      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 *          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 *      }).addTo(map);
 * ```
 *
 * ### Adding the edit toolbar
 * To use the edit toolbar you must initialise the Leaflet.draw control and manually add it to the map.
 *
 * ```js
 *      var map = L.map('map').setView([51.505, -0.09], 13);
 *
 *      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 *          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 *      }).addTo(map);
 *
 *      // FeatureGroup is to store editable layers
 *      var drawnItems = new L.FeatureGroup();
 *      map.addLayer(drawnItems);
 *
 *      var drawControl = new L.Control.Draw({
 *          edit: {
 *              featureGroup: drawnItems
 *          }
 *      });
 *      map.addControl(drawControl);
 * ```
 *
 * The key here is the featureGroup option. This tells the plugin which FeatureGroup contains the layers that
 * should be editable. The featureGroup can contain 0 or more features with geometry types Point, LineString, and Polygon.
 * Leaflet.draw does not work with multigeometry features such as MultiPoint, MultiLineString, MultiPolygon,
 * or GeometryCollection. If you need to add multigeometry features to the draw plugin, convert them to a
 * FeatureCollection of non-multigeometries (Points, LineStrings, or Polygons).
 */
L.Draw = {};

/**
 * @class L.drawLocal
 * @aka L.drawLocal
 *
 * The core toolbar class of the API — it is used to create the toolbar ui
 *
 * @example
 * ```js
 *      var modifiedDraw = L.drawLocal.extend({
 *          draw: {
 *              toolbar: {
 *                  buttons: {
 *                      polygon: 'Draw an awesome polygon'
 *                  }
 *              }
 *          }
 *      });
 * ```
 *
 * The default state for the control is the draw toolbar just below the zoom control.
 *  This will allow map users to draw vectors and markers.
 *  **Please note the edit toolbar is not enabled by default.**
 */
L.drawLocal = {
	// format: {
	// 	numeric: {
	// 		delimiters: {
	// 			thousands: ',',
	// 			decimal: '.'
	// 		}
	// 	}
	// },
	draw: {
		toolbar: {
			// #TODO: this should be reorganized where actions are nested in actions
			// ex: actions.undo  or actions.cancel
			actions: {
				title: 'Cancel drawing',
				text: 'Cancel'
			},
			finish: {
				title: 'Finish drawing',
				text: 'Finish'
			},
			undo: {
				title: 'Delete last point drawn',
				text: 'Delete last point'
			},
			buttons: {
				polyline: 'Draw a polyline',
				polygon: 'Draw a polygon',
				rectangle: 'Draw a rectangle',
				circle: 'Draw a circle',
				marker: 'Draw a marker',
				circlemarker: 'Draw a circlemarker'
			}
		},
		handlers: {
			circle: {
				tooltip: {
					start: 'Click and drag to draw circle.'
				},
				radius: 'Radius'
			},
			circlemarker: {
				tooltip: {
					start: 'Click map to place circle marker.'
				}
			},
			marker: {
				tooltip: {
					start: 'Click map to place marker.'
				}
			},
			polygon: {
				tooltip: {
					start: 'Click to start drawing shape.',
					cont: 'Click to continue drawing shape.',
					end: 'Click first point to close this shape.'
				}
			},
			polyline: {
				error: '<strong>Error:</strong> shape edges cannot cross!',
				tooltip: {
					start: 'Click to start drawing line.',
					cont: 'Click to continue drawing line.',
					end: 'Click last point to finish line.'
				}
			},
			rectangle: {
				tooltip: {
					start: 'Click and drag to draw rectangle.'
				}
			},
			simpleshape: {
				tooltip: {
					end: 'Release mouse to finish drawing.'
				}
			}
		}
	},
	edit: {
		toolbar: {
			actions: {
				save: {
					title: 'Save changes',
					text: 'Save'
				},
				cancel: {
					title: 'Cancel editing, discards all changes',
					text: 'Cancel'
				},
				clearAll: {
					title: 'Clear all layers',
					text: 'Clear All'
				}
			},
			buttons: {
				edit: 'Edit layers',
				editDisabled: 'No layers to edit',
				remove: 'Delete layers',
				removeDisabled: 'No layers to delete'
			}
		},
		handlers: {
			edit: {
				tooltip: {
					text: 'Drag handles or markers to edit features.',
					subtext: 'Click cancel to undo changes.'
				}
			},
			remove: {
				tooltip: {
					text: 'Click on a feature to remove.'
				}
			}
		}
	}
};



/**
 * ### Events
 * Once you have successfully added the Leaflet.draw plugin to your map you will want to respond to the different
 * actions users can initiate. The following events will be triggered on the map:
 *
 * @class L.Draw.Event
 * @aka Draw.Event
 *
 * Use `L.Draw.Event.EVENTNAME` constants to ensure events are correct.
 *
 * @example
 * ```js
 * map.on(L.Draw.Event.CREATED; function (e) {
 *    var type = e.layerType,
 *        layer = e.layer;
 *
 *    if (type === 'marker') {
 *        // Do marker specific actions
 *    }
 *
 *    // Do whatever else you need to. (save to db; add to map etc)
 *    map.addLayer(layer);
 *});
 * ```
 */
L.Draw.Event = {};
/**
 * @event draw:created: PolyLine; Polygon; Rectangle; Circle; Marker | String
 *
 * Layer that was just created.
 * The type of layer this is. One of: `polyline`; `polygon`; `rectangle`; `circle`; `marker`
 * Triggered when a new vector or marker has been created.
 *
 */
L.Draw.Event.CREATED = 'draw:created';

/**
 * @event draw:edited: LayerGroup
 *
 * List of all layers just edited on the map.
 *
 *
 * Triggered when layers in the FeatureGroup; initialised with the plugin; have been edited and saved.
 *
 * @example
 * ```js
 *      map.on('draw:edited', function (e) {
     *          var layers = e.layers;
     *          layers.eachLayer(function (layer) {
     *              //do whatever you want; most likely save back to db
     *          });
     *      });
 * ```
 */
L.Draw.Event.EDITED = 'draw:edited';

/**
 * @event draw:deleted: LayerGroup
 *
 * List of all layers just removed from the map.
 *
 * Triggered when layers have been removed (and saved) from the FeatureGroup.
 */
L.Draw.Event.DELETED = 'draw:deleted';

/**
 * @event draw:drawstart: String
 *
 * The type of layer this is. One of:`polyline`; `polygon`; `rectangle`; `circle`; `marker`
 *
 * Triggered when the user has chosen to draw a particular vector or marker.
 */
L.Draw.Event.DRAWSTART = 'draw:drawstart';

/**
 * @event draw:drawstop: String
 *
 * The type of layer this is. One of: `polyline`; `polygon`; `rectangle`; `circle`; `marker`
 *
 * Triggered when the user has finished a particular vector or marker.
 */

L.Draw.Event.DRAWSTOP = 'draw:drawstop';

/**
 * @event draw:drawvertex: LayerGroup
 *
 * List of all layers just being added from the map.
 *
 * Triggered when a vertex is created on a polyline or polygon.
 */
L.Draw.Event.DRAWVERTEX = 'draw:drawvertex';

/**
 * @event draw:editstart: String
 *
 * The type of edit this is. One of: `edit`
 *
 * Triggered when the user starts edit mode by clicking the edit tool button.
 */

L.Draw.Event.EDITSTART = 'draw:editstart';

/**
 * @event draw:editmove: ILayer
 *
 *  Layer that was just moved.
 *
 * Triggered as the user moves a rectangle; circle or marker.
 */
L.Draw.Event.EDITMOVE = 'draw:editmove';

/**
 * @event draw:editresize: ILayer
 *
 * Layer that was just moved.
 *
 * Triggered as the user resizes a rectangle or circle.
 */
L.Draw.Event.EDITRESIZE = 'draw:editresize';

/**
 * @event draw:editvertex: LayerGroup
 *
 * List of all layers just being edited from the map.
 *
 * Triggered when a vertex is edited on a polyline or polygon.
 */
L.Draw.Event.EDITVERTEX = 'draw:editvertex';

/**
 * @event draw:editstop: String
 *
 * The type of edit this is. One of: `edit`
 *
 * Triggered when the user has finshed editing (edit mode) and saves edits.
 */
L.Draw.Event.EDITSTOP = 'draw:editstop';

/**
 * @event draw:deletestart: String
 *
 * The type of edit this is. One of: `remove`
 *
 * Triggered when the user starts remove mode by clicking the remove tool button.
 */
L.Draw.Event.DELETESTART = 'draw:deletestart';

/**
 * @event draw:deletestop: String
 *
 * The type of edit this is. One of: `remove`
 *
 * Triggered when the user has finished removing shapes (remove mode) and saves.
 */
L.Draw.Event.DELETESTOP = 'draw:deletestop';

/**
 * @event draw:toolbaropened: String
 *
 * Triggered when a toolbar is opened.
 */
L.Draw.Event.TOOLBAROPENED = 'draw:toolbaropened';

/**
 * @event draw:toolbarclosed: String
 *
 * Triggered when a toolbar is closed.
 */
L.Draw.Event.TOOLBARCLOSED = 'draw:toolbarclosed';

/**
 * @event draw:markercontext: String
 *
 * Triggered when a marker is right clicked.
 */
L.Draw.Event.MARKERCONTEXT = 'draw:markercontext';


L.Draw = L.Draw || {};

/**
 * @class L.Draw.Feature
 * @aka Draw.Feature
 */
L.Draw.Feature = L.Handler.extend({

	// @method initialize(): void
	initialize: function (map, options) {
		this._map = map;
		this._container = map._container;
		this._overlayPane = map._panes.overlayPane;
		this._popupPane = map._panes.popupPane;

		// Merge default shapeOptions options with custom shapeOptions
		if (options && options.shapeOptions) {
			options.shapeOptions = L.Util.extend({}, this.options.shapeOptions, options.shapeOptions);
		}
		L.setOptions(this, options);

		var version = L.version.split('.');
		//If Version is >= 1.2.0
		if (parseInt(version[0], 10) === 1 && parseInt(version[1], 10) >= 2) {
			L.Draw.Feature.include(L.Evented.prototype);
		} else {
			L.Draw.Feature.include(L.Mixin.Events);
		}
	},

	// @method enable(): void
	// Enables this handler
	enable: function () {
		if (this._enabled) {
			return;
		}

		L.Handler.prototype.enable.call(this);

		this.fire('enabled', {handler: this.type});

		this._map.fire(L.Draw.Event.DRAWSTART, {layerType: this.type});
	},

	// @method disable(): void
	disable: function () {
		if (!this._enabled) {
			return;
		}

		L.Handler.prototype.disable.call(this);

		this._map.fire(L.Draw.Event.DRAWSTOP, {layerType: this.type});

		this.fire('disabled', {handler: this.type});
	},

	// @method addHooks(): void
	// Add's event listeners to this handler
	addHooks: function () {
		var map = this._map;

		if (map) {
			L.DomUtil.disableTextSelection();

			map.getContainer().focus();

			this._tooltip = new L.Draw.Tooltip(this._map);

			L.DomEvent.on(this._container, 'keyup', this._cancelDrawing, this);
		}
	},

	// @method removeHooks(): void
	// Removes event listeners from this handler
	removeHooks: function () {
		if (this._map) {
			L.DomUtil.enableTextSelection();

			this._tooltip.dispose();
			this._tooltip = null;

			L.DomEvent.off(this._container, 'keyup', this._cancelDrawing, this);
		}
	},

	// @method setOptions(object): void
	// Sets new options to this handler
	setOptions: function (options) {
		L.setOptions(this, options);
	},

	_fireCreatedEvent: function (layer) {
		this._map.fire(L.Draw.Event.CREATED, {layer: layer, layerType: this.type});
	},

	// Cancel drawing when the escape key is pressed
	_cancelDrawing: function (e) {
		if (e.keyCode === 27) {
			this._map.fire('draw:canceled', {layerType: this.type});
			this.disable();
		}
	}
});



/**
 * @class L.Draw.Polyline
 * @aka Draw.Polyline
 * @inherits L.Draw.Feature
 */
L.Draw.Polyline = L.Draw.Feature.extend({
	statics: {
		TYPE: 'polyline'
	},

	Poly: L.Polyline,

	options: {
		allowIntersection: true,
		repeatMode: false,
		drawError: {
			color: '#b00b00',
			timeout: 2500
		},
		icon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon'
		}),
		touchIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
		}),
		guidelineDistance: 20,
		maxGuideLineLength: 4000,
		shapeOptions: {
			stroke: true,
			color: '#3388ff',
			weight: 4,
			opacity: 0.5,
			fill: false,
			clickable: true
		},
		metric: true, // Whether to use the metric measurement system or imperial
		feet: true, // When not metric, to use feet instead of yards for display.
		nautic: false, // When not metric, not feet use nautic mile for display
		showLength: true, // Whether to display distance in the tooltip
		zIndexOffset: 2000, // This should be > than the highest z-index any map layers
		factor: 1, // To change distance calculation
		maxPoints: 0 // Once this number of points are placed, finish shape
	},

	// @method initialize(): void
	initialize: function (map, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.icon = this.options.touchIcon;
		}

		// Need to set this here to ensure the correct message is used.
		this.options.drawError.message = L.drawLocal.draw.handlers.polyline.error;

		// Merge default drawError options with custom options
		if (options && options.drawError) {
			options.drawError = L.Util.extend({}, this.options.drawError, options.drawError);
		}

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Polyline.TYPE;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);
		if (this._map) {
			this._markers = [];

			this._markerGroup = new L.LayerGroup();
			this._map.addLayer(this._markerGroup);

			this._poly = new L.Polyline([], this.options.shapeOptions);

			this._tooltip.updateContent(this._getTooltipText());

			// Make a transparent marker that will used to catch click events. These click
			// events will create the vertices. We need to do this so we can ensure that
			// we can create vertices over other map layers (markers, vector layers). We
			// also do not want to trigger any click handlers of objects we are clicking on
			// while drawing.
			if (!this._mouseMarker) {
				this._mouseMarker = L.marker(this._map.getCenter(), {
					icon: L.divIcon({
						className: 'leaflet-mouse-marker',
						iconAnchor: [20, 20],
						iconSize: [40, 40]
					}),
					opacity: 0,
					zIndexOffset: this.options.zIndexOffset
				});
			}

			this._mouseMarker
				.on('mouseout', this._onMouseOut, this)
				.on('mousemove', this._onMouseMove, this) // Necessary to prevent 0.8 stutter
				.on('mousedown', this._onMouseDown, this)
				.on('mouseup', this._onMouseUp, this) // Necessary for 0.8 compatibility
				.addTo(this._map);

			this._map
				.on('mouseup', this._onMouseUp, this) // Necessary for 0.7 compatibility
				.on('mousemove', this._onMouseMove, this)
				.on('zoomlevelschange', this._onZoomEnd, this)
				.on('touchstart', this._onTouch, this)
				.on('zoomend', this._onZoomEnd, this);

		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler.
	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);

		this._clearHideErrorTimeout();

		this._cleanUpShape();

		// remove markers from map
		this._map.removeLayer(this._markerGroup);
		delete this._markerGroup;
		delete this._markers;

		this._map.removeLayer(this._poly);
		delete this._poly;

		this._mouseMarker
			.off('mousedown', this._onMouseDown, this)
			.off('mouseout', this._onMouseOut, this)
			.off('mouseup', this._onMouseUp, this)
			.off('mousemove', this._onMouseMove, this);
		this._map.removeLayer(this._mouseMarker);
		delete this._mouseMarker;

		// clean up DOM
		this._clearGuides();

		this._map
			.off('mouseup', this._onMouseUp, this)
			.off('mousemove', this._onMouseMove, this)
			.off('zoomlevelschange', this._onZoomEnd, this)
			.off('zoomend', this._onZoomEnd, this)
			.off('touchstart', this._onTouch, this)
			.off('click', this._onTouch, this);
	},

	// @method deleteLastVertex(): void
	// Remove the last vertex from the polyline, removes polyline from map if only one point exists.
	deleteLastVertex: function () {
		if (this._markers.length <= 1) {
			return;
		}

		var lastMarker = this._markers.pop(),
			poly = this._poly,
			// Replaces .spliceLatLngs()
			latlngs = poly.getLatLngs(),
			latlng = latlngs.splice(-1, 1)[0];
		this._poly.setLatLngs(latlngs);

		this._markerGroup.removeLayer(lastMarker);

		if (poly.getLatLngs().length < 2) {
			this._map.removeLayer(poly);
		}

		this._vertexChanged(latlng, false);
	},

	// @method addVertex(): void
	// Add a vertex to the end of the polyline
	addVertex: function (latlng) {
		var markersLength = this._markers.length;
		// markersLength must be greater than or equal to 2 before intersections can occur
		if (markersLength >= 2 && !this.options.allowIntersection && this._poly.newLatLngIntersects(latlng)) {
			this._showErrorTooltip();
			return;
		}
		else if (this._errorShown) {
			this._hideErrorTooltip();
		}

		this._markers.push(this._createMarker(latlng));

		this._poly.addLatLng(latlng);

		if (this._poly.getLatLngs().length === 2) {
			this._map.addLayer(this._poly);
		}

		this._vertexChanged(latlng, true);
	},

	// @method completeShape(): void
	// Closes the polyline between the first and last points
	completeShape: function () {
		if (this._markers.length <= 1) {
			return;
		}

		this._fireCreatedEvent();
		this.disable();

		if (this.options.repeatMode) {
			this.enable();
		}
	},

	_finishShape: function () {
		var latlngs = this._poly._defaultShape ? this._poly._defaultShape() : this._poly.getLatLngs();
		var intersects = this._poly.newLatLngIntersects(latlngs[latlngs.length - 1]);

		if ((!this.options.allowIntersection && intersects) || !this._shapeIsValid()) {
			this._showErrorTooltip();
			return;
		}

		this._fireCreatedEvent();
		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},

	// Called to verify the shape is valid when the user tries to finish it
	// Return false if the shape is not valid
	_shapeIsValid: function () {
		return true;
	},

	_onZoomEnd: function () {
		if (this._markers !== null) {
			this._updateGuide();
		}
	},

	_onMouseMove: function (e) {
		var newPos = this._map.mouseEventToLayerPoint(e.originalEvent);
		var latlng = this._map.layerPointToLatLng(newPos);

		// Save latlng
		// should this be moved to _updateGuide() ?
		this._currentLatLng = latlng;

		this._updateTooltip(latlng);

		// Update the guide line
		this._updateGuide(newPos);

		// Update the mouse marker position
		this._mouseMarker.setLatLng(latlng);

		L.DomEvent.preventDefault(e.originalEvent);
	},

	_vertexChanged: function (latlng, added) {
		this._map.fire(L.Draw.Event.DRAWVERTEX, {layers: this._markerGroup});
		this._updateFinishHandler();

		this._updateRunningMeasure(latlng, added);

		this._clearGuides();

		this._updateTooltip();
	},

	_onMouseDown: function (e) {
		if (!this._clickHandled && !this._touchHandled && !this._disableMarkers) {
			this._onMouseMove(e);
			this._clickHandled = true;
			this._disableNewMarkers();
			var originalEvent = e.originalEvent;
			var clientX = originalEvent.clientX;
			var clientY = originalEvent.clientY;
			this._startPoint.call(this, clientX, clientY);
		}
	},

	_startPoint: function (clientX, clientY) {
		this._mouseDownOrigin = L.point(clientX, clientY);
	},

	_onMouseUp: function (e) {
		var originalEvent = e.originalEvent;
		var clientX = originalEvent.clientX;
		var clientY = originalEvent.clientY;
		this._endPoint.call(this, clientX, clientY, e);
		this._clickHandled = null;
	},

	_endPoint: function (clientX, clientY, e) {
		if (this._mouseDownOrigin) {
			var dragCheckDistance = L.point(clientX, clientY)
				.distanceTo(this._mouseDownOrigin);
			var lastPtDistance = this._calculateFinishDistance(e.latlng);
			if (this.options.maxPoints > 1 && this.options.maxPoints == this._markers.length + 1) {
				this.addVertex(e.latlng);
				this._finishShape();
			} else if (lastPtDistance < 10 && L.Browser.touch) {
				this._finishShape();
			} else if (Math.abs(dragCheckDistance) < 9 * (window.devicePixelRatio || 1)) {
				this.addVertex(e.latlng);
			}
			this._enableNewMarkers(); // after a short pause, enable new markers
		}
		this._mouseDownOrigin = null;
	},

	// ontouch prevented by clickHandled flag because some browsers fire both click/touch events,
	// causing unwanted behavior
	_onTouch: function (e) {
		var originalEvent = e.originalEvent;
		var clientX;
		var clientY;
		if (originalEvent.touches && originalEvent.touches[0] && !this._clickHandled && !this._touchHandled && !this._disableMarkers) {
			clientX = originalEvent.touches[0].clientX;
			clientY = originalEvent.touches[0].clientY;
			this._disableNewMarkers();
			this._touchHandled = true;
			this._startPoint.call(this, clientX, clientY);
			this._endPoint.call(this, clientX, clientY, e);
			this._touchHandled = null;
		}
		this._clickHandled = null;
	},

	_onMouseOut: function () {
		if (this._tooltip) {
			this._tooltip._onMouseOut.call(this._tooltip);
		}
	},

	// calculate if we are currently within close enough distance
	// of the closing point (first point for shapes, last point for lines)
	// this is semi-ugly code but the only reliable way i found to get the job done
	// note: calculating point.distanceTo between mouseDownOrigin and last marker did NOT work
	_calculateFinishDistance: function (potentialLatLng) {
		var lastPtDistance;
		if (this._markers.length > 0) {
			var finishMarker;
			if (this.type === L.Draw.Polyline.TYPE) {
				finishMarker = this._markers[this._markers.length - 1];
			} else if (this.type === L.Draw.Polygon.TYPE) {
				finishMarker = this._markers[0];
			} else {
				return Infinity;
			}
			var lastMarkerPoint = this._map.latLngToContainerPoint(finishMarker.getLatLng()),
				potentialMarker = new L.Marker(potentialLatLng, {
					icon: this.options.icon,
					zIndexOffset: this.options.zIndexOffset * 2
				});
			var potentialMarkerPint = this._map.latLngToContainerPoint(potentialMarker.getLatLng());
			lastPtDistance = lastMarkerPoint.distanceTo(potentialMarkerPint);
		} else {
			lastPtDistance = Infinity;
		}
		return lastPtDistance;
	},

	_updateFinishHandler: function () {
		var markerCount = this._markers.length;
		// The last marker should have a click handler to close the polyline
		if (markerCount > 1) {
			this._markers[markerCount - 1].on('click', this._finishShape, this);
		}

		// Remove the old marker click handler (as only the last point should close the polyline)
		if (markerCount > 2) {
			this._markers[markerCount - 2].off('click', this._finishShape, this);
		}
	},

	_createMarker: function (latlng) {
		var marker = new L.Marker(latlng, {
			icon: this.options.icon,
			zIndexOffset: this.options.zIndexOffset * 2
		});

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_updateGuide: function (newPos) {
		var markerCount = this._markers ? this._markers.length : 0;

		if (markerCount > 0) {
			newPos = newPos || this._map.latLngToLayerPoint(this._currentLatLng);

			// draw the guide line
			this._clearGuides();
			this._drawGuide(
				this._map.latLngToLayerPoint(this._markers[markerCount - 1].getLatLng()),
				newPos
			);
		}
	},

	_updateTooltip: function (latLng) {
		var text = this._getTooltipText();

		if (latLng) {
			this._tooltip.updatePosition(latLng);
		}

		if (!this._errorShown) {
			this._tooltip.updateContent(text);
		}
	},

	_drawGuide: function (pointA, pointB) {
		var length = Math.floor(Math.sqrt(Math.pow((pointB.x - pointA.x), 2) + Math.pow((pointB.y - pointA.y), 2))),
			guidelineDistance = this.options.guidelineDistance,
			maxGuideLineLength = this.options.maxGuideLineLength,
			// Only draw a guideline with a max length
			i = length > maxGuideLineLength ? length - maxGuideLineLength : guidelineDistance,
			fraction,
			dashPoint,
			dash;

		//create the guides container if we haven't yet
		if (!this._guidesContainer) {
			this._guidesContainer = L.DomUtil.create('div', 'leaflet-draw-guides', this._overlayPane);
		}

		//draw a dash every GuildeLineDistance
		for (; i < length; i += this.options.guidelineDistance) {
			//work out fraction along line we are
			fraction = i / length;

			//calculate new x,y point
			dashPoint = {
				x: Math.floor((pointA.x * (1 - fraction)) + (fraction * pointB.x)),
				y: Math.floor((pointA.y * (1 - fraction)) + (fraction * pointB.y))
			};

			//add guide dash to guide container
			dash = L.DomUtil.create('div', 'leaflet-draw-guide-dash', this._guidesContainer);
			dash.style.backgroundColor =
				!this._errorShown ? this.options.shapeOptions.color : this.options.drawError.color;

			L.DomUtil.setPosition(dash, dashPoint);
		}
	},

	_updateGuideColor: function (color) {
		if (this._guidesContainer) {
			for (var i = 0, l = this._guidesContainer.childNodes.length; i < l; i++) {
				this._guidesContainer.childNodes[i].style.backgroundColor = color;
			}
		}
	},

	// removes all child elements (guide dashes) from the guides container
	_clearGuides: function () {
		if (this._guidesContainer) {
			while (this._guidesContainer.firstChild) {
				this._guidesContainer.removeChild(this._guidesContainer.firstChild);
			}
		}
	},

	_getTooltipText: function () {
		var showLength = this.options.showLength,
			labelText, distanceStr;
		if (this._markers.length === 0) {
			labelText = {
				text: L.drawLocal.draw.handlers.polyline.tooltip.start
			};
		} else {
			distanceStr = showLength ? this._getMeasurementString() : '';

			if (this._markers.length === 1) {
				labelText = {
					text: L.drawLocal.draw.handlers.polyline.tooltip.cont,
					subtext: distanceStr
				};
			} else {
				labelText = {
					text: L.drawLocal.draw.handlers.polyline.tooltip.end,
					subtext: distanceStr
				};
			}
		}
		return labelText;
	},

	_updateRunningMeasure: function (latlng, added) {
		var markersLength = this._markers.length,
			previousMarkerIndex, distance;

		if (this._markers.length === 1) {
			this._measurementRunningTotal = 0;
		} else {
			previousMarkerIndex = markersLength - (added ? 2 : 1);

			// Calculate the distance based on the version
			if (L.GeometryUtil.isVersion07x()) {
				distance = latlng.distanceTo(this._markers[previousMarkerIndex].getLatLng()) * (this.options.factor || 1);
			} else {
				distance = this._map.distance(latlng, this._markers[previousMarkerIndex].getLatLng()) * (this.options.factor || 1);
			}

			this._measurementRunningTotal += distance * (added ? 1 : -1);
		}
	},

	_getMeasurementString: function () {
		var currentLatLng = this._currentLatLng,
			previousLatLng = this._markers[this._markers.length - 1].getLatLng(),
			distance;

		// Calculate the distance from the last fixed point to the mouse position based on the version
		if (L.GeometryUtil.isVersion07x()) {
			distance = previousLatLng && currentLatLng && currentLatLng.distanceTo ? this._measurementRunningTotal + currentLatLng.distanceTo(previousLatLng) * (this.options.factor || 1) : this._measurementRunningTotal || 0;
		} else {
			distance = previousLatLng && currentLatLng ? this._measurementRunningTotal + this._map.distance(currentLatLng, previousLatLng) * (this.options.factor || 1) : this._measurementRunningTotal || 0;
		}

		return L.GeometryUtil.readableDistance(distance, this.options.metric, this.options.feet, this.options.nautic, this.options.precision);
	},

	_showErrorTooltip: function () {
		this._errorShown = true;

		// Update tooltip
		this._tooltip
			.showAsError()
			.updateContent({text: this.options.drawError.message});

		// Update shape
		this._updateGuideColor(this.options.drawError.color);
		this._poly.setStyle({color: this.options.drawError.color});

		// Hide the error after 2 seconds
		this._clearHideErrorTimeout();
		this._hideErrorTimeout = setTimeout(L.Util.bind(this._hideErrorTooltip, this), this.options.drawError.timeout);
	},

	_hideErrorTooltip: function () {
		this._errorShown = false;

		this._clearHideErrorTimeout();

		// Revert tooltip
		this._tooltip
			.removeError()
			.updateContent(this._getTooltipText());

		// Revert shape
		this._updateGuideColor(this.options.shapeOptions.color);
		this._poly.setStyle({color: this.options.shapeOptions.color});
	},

	_clearHideErrorTimeout: function () {
		if (this._hideErrorTimeout) {
			clearTimeout(this._hideErrorTimeout);
			this._hideErrorTimeout = null;
		}
	},

	// disable new markers temporarily;
	// this is to prevent duplicated touch/click events in some browsers
	_disableNewMarkers: function () {
		this._disableMarkers = true;
	},

	// see _disableNewMarkers
	_enableNewMarkers: function () {
		setTimeout(function () {
			this._disableMarkers = false;
		}.bind(this), 50);
	},

	_cleanUpShape: function () {
		if (this._markers.length > 1) {
			this._markers[this._markers.length - 1].off('click', this._finishShape, this);
		}
	},

	_fireCreatedEvent: function () {
		var poly = new this.Poly(this._poly.getLatLngs(), this.options.shapeOptions);
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, poly);
	}
});



/**
 * @class L.Draw.Polygon
 * @aka Draw.Polygon
 * @inherits L.Draw.Polyline
 */
L.Draw.Polygon = L.Draw.Polyline.extend({
	statics: {
		TYPE: 'polygon'
	},

	Poly: L.Polygon,

	options: {
		showArea: false,
		showLength: false,
		shapeOptions: {
			stroke: true,
			color: '#3388ff',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: true
		},
		// Whether to use the metric measurement system (truthy) or not (falsy).
		// Also defines the units to use for the metric system as an array of
		// strings (e.g. `['ha', 'm']`).
		metric: true,
		feet: true, // When not metric, to use feet instead of yards for display.
		nautic: false, // When not metric, not feet use nautic mile for display
		// Defines the precision for each type of unit (e.g. {km: 2, ft: 0}
		precision: {}
	},

	// @method initialize(): void
	initialize: function (map, options) {
		L.Draw.Polyline.prototype.initialize.call(this, map, options);

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Polygon.TYPE;
	},

	_updateFinishHandler: function () {
		var markerCount = this._markers.length;

		// The first marker should have a click handler to close the polygon
		if (markerCount === 1) {
			this._markers[0].on('click', this._finishShape, this);
		}

		// Add and update the double click handler
		if (markerCount > 2) {
			this._markers[markerCount - 1].on('dblclick', this._finishShape, this);
			// Only need to remove handler if has been added before
			if (markerCount > 3) {
				this._markers[markerCount - 2].off('dblclick', this._finishShape, this);
			}
		}
	},

	_getTooltipText: function () {
		var text, subtext;

		if (this._markers.length === 0) {
			text = L.drawLocal.draw.handlers.polygon.tooltip.start;
		} else if (this._markers.length < 3) {
			text = L.drawLocal.draw.handlers.polygon.tooltip.cont;
			subtext = this._getMeasurementString();
		} else {
			text = L.drawLocal.draw.handlers.polygon.tooltip.end;
			subtext = this._getMeasurementString();
		}

		return {
			text: text,
			subtext: subtext
		};
	},

	_getMeasurementString: function () {
		var area = this._area,
			measurementString = '';


		if (!area && !this.options.showLength) {
			return null;
		}

		if (this.options.showLength) {
			measurementString = L.Draw.Polyline.prototype._getMeasurementString.call(this);
		}

		if (area) {
			measurementString += '<br>' + L.GeometryUtil.readableArea(area, this.options.metric, this.options.precision);
		}

		return measurementString;
	},

	_shapeIsValid: function () {
		return this._markers.length >= 3;
	},

	_vertexChanged: function (latlng, added) {
		var latLngs;

		// Check to see if we should show the area
		if (!this.options.allowIntersection && this.options.showArea) {
			latLngs = this._poly.getLatLngs();

			this._area = L.GeometryUtil.geodesicArea(latLngs);
		}

		L.Draw.Polyline.prototype._vertexChanged.call(this, latlng, added);
	},

	_cleanUpShape: function () {
		var markerCount = this._markers.length;

		if (markerCount > 0) {
			this._markers[0].off('click', this._finishShape, this);

			if (markerCount > 2) {
				this._markers[markerCount - 1].off('dblclick', this._finishShape, this);
			}
		}
	}
});



L.SimpleShape = {};
/**
 * @class L.Draw.SimpleShape
 * @aka Draw.SimpleShape
 * @inherits L.Draw.Feature
 */
L.Draw.SimpleShape = L.Draw.Feature.extend({
	options: {
		repeatMode: false
	},

	// @method initialize(): void
	initialize: function (map, options) {
		this._endLabelText = L.drawLocal.draw.handlers.simpleshape.tooltip.end;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler.
	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);
		if (this._map) {
			this._mapDraggable = this._map.dragging.enabled();

			if (this._mapDraggable) {
				this._map.dragging.disable();
			}

			//TODO refactor: move cursor to styles
			this._container.style.cursor = 'crosshair';

			this._tooltip.updateContent({text: this._initialLabelText});

			this._map
				.on('mousedown', this._onMouseDown, this)
				.on('mousemove', this._onMouseMove, this)
				.on('touchstart', this._onMouseDown, this)
				.on('touchmove', this._onMouseMove, this);

			// we should prevent default, otherwise default behavior (scrolling) will fire,
			// and that will cause document.touchend to fire and will stop the drawing
			// (circle, rectangle) in touch mode.
			// (update): we have to send passive now to prevent scroll, because by default it is {passive: true} now, which means,
			// handler can't event.preventDefault
			// check the news https://developers.google.com/web/updates/2016/06/passive-event-listeners
			document.addEventListener('touchstart', L.DomEvent.preventDefault, {passive: false});
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler.
	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);
		if (this._map) {
			if (this._mapDraggable) {
				this._map.dragging.enable();
			}

			//TODO refactor: move cursor to styles
			this._container.style.cursor = '';

			this._map
				.off('mousedown', this._onMouseDown, this)
				.off('mousemove', this._onMouseMove, this)
				.off('touchstart', this._onMouseDown, this)
				.off('touchmove', this._onMouseMove, this);

			L.DomEvent.off(document, 'mouseup', this._onMouseUp, this);
			L.DomEvent.off(document, 'touchend', this._onMouseUp, this);

			document.removeEventListener('touchstart', L.DomEvent.preventDefault);

			// If the box element doesn't exist they must not have moved the mouse, so don't need to destroy/return
			if (this._shape) {
				this._map.removeLayer(this._shape);
				delete this._shape;
			}
		}
		this._isDrawing = false;
	},

	_getTooltipText: function () {
		return {
			text: this._endLabelText
		};
	},

	_onMouseDown: function (e) {
		this._isDrawing = true;
		this._startLatLng = e.latlng;

		L.DomEvent
			.on(document, 'mouseup', this._onMouseUp, this)
			.on(document, 'touchend', this._onMouseUp, this)
			.preventDefault(e.originalEvent);
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng;

		this._tooltip.updatePosition(latlng);
		if (this._isDrawing) {
			this._tooltip.updateContent(this._getTooltipText());
			this._drawShape(latlng);
		}
	},

	_onMouseUp: function () {
		if (this._shape) {
			this._fireCreatedEvent();
		}

		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	}
});



/**
 * @class L.Draw.Rectangle
 * @aka Draw.Rectangle
 * @inherits L.Draw.SimpleShape
 */
L.Draw.Rectangle = L.Draw.SimpleShape.extend({
	statics: {
		TYPE: 'rectangle'
	},

	options: {
		shapeOptions: {
			stroke: true,
			color: '#3388ff',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			showArea: true,
			clickable: true
		},
		metric: true // Whether to use the metric measurement system or imperial
	},

	// @method initialize(): void
	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Rectangle.TYPE;

		this._initialLabelText = L.drawLocal.draw.handlers.rectangle.tooltip.start;

		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},

	// @method disable(): void
	disable: function () {
		if (!this._enabled) {
			return;
		}

		this._isCurrentlyTwoClickDrawing = false;
		L.Draw.SimpleShape.prototype.disable.call(this);
	},

	_onMouseUp: function (e) {
		if (!this._shape && !this._isCurrentlyTwoClickDrawing) {
			this._isCurrentlyTwoClickDrawing = true;
			return;
		}

		// Make sure closing click is on map
		if (this._isCurrentlyTwoClickDrawing && !_hasAncestor(e.target, 'leaflet-pane')) {
			return;
		}

		L.Draw.SimpleShape.prototype._onMouseUp.call(this);
	},

	_drawShape: function (latlng) {
		if (!this._shape) {
			this._shape = new L.Rectangle(new L.LatLngBounds(this._startLatLng, latlng), this.options.shapeOptions);
			this._map.addLayer(this._shape);
		} else {
			this._shape.setBounds(new L.LatLngBounds(this._startLatLng, latlng));
		}
	},

	_fireCreatedEvent: function () {
		var rectangle = new L.Rectangle(this._shape.getBounds(), this.options.shapeOptions);
		L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, rectangle);
	},

	_getTooltipText: function () {
		var tooltipText = L.Draw.SimpleShape.prototype._getTooltipText.call(this),
			shape = this._shape,
			showArea = this.options.showArea,
			latLngs, area, subtext;

		if (shape) {
			latLngs = this._shape._defaultShape ? this._shape._defaultShape() : this._shape.getLatLngs();
			area = L.GeometryUtil.geodesicArea(latLngs);
			subtext = showArea ? L.GeometryUtil.readableArea(area, this.options.metric) : '';
		}

		return {
			text: tooltipText.text,
			subtext: subtext
		};
	}
});

function _hasAncestor(el, cls) {
	while ((el = el.parentElement) && !el.classList.contains(cls)) {
		;
	}
	return el;
}



/**
 * @class L.Draw.Marker
 * @aka Draw.Marker
 * @inherits L.Draw.Feature
 */
L.Draw.Marker = L.Draw.Feature.extend({
	statics: {
		TYPE: 'marker'
	},

	options: {
		icon: new L.Icon.Default(),
		repeatMode: false,
		zIndexOffset: 2000 // This should be > than the highest z-index any markers
	},

	// @method initialize(): void
	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Marker.TYPE;

		this._initialLabelText = L.drawLocal.draw.handlers.marker.tooltip.start;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler.
	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);

		if (this._map) {
			this._tooltip.updateContent({text: this._initialLabelText});

			// Same mouseMarker as in Draw.Polyline
			if (!this._mouseMarker) {
				this._mouseMarker = L.marker(this._map.getCenter(), {
					icon: L.divIcon({
						className: 'leaflet-mouse-marker',
						iconAnchor: [20, 20],
						iconSize: [40, 40]
					}),
					opacity: 0,
					zIndexOffset: this.options.zIndexOffset
				});
			}

			this._mouseMarker
				.on('click', this._onClick, this)
				.addTo(this._map);

			this._map.on('mousemove', this._onMouseMove, this);
			this._map.on('click', this._onTouch, this);
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler.
	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);

		if (this._map) {
			this._map
				.off('click', this._onClick, this)
				.off('click', this._onTouch, this);
			if (this._marker) {
				this._marker.off('click', this._onClick, this);
				this._map
					.removeLayer(this._marker);
				delete this._marker;
			}

			this._mouseMarker.off('click', this._onClick, this);
			this._map.removeLayer(this._mouseMarker);
			delete this._mouseMarker;

			this._map.off('mousemove', this._onMouseMove, this);
		}
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng;

		this._tooltip.updatePosition(latlng);
		this._mouseMarker.setLatLng(latlng);

		if (!this._marker) {
			this._marker = this._createMarker(latlng);
			// Bind to both marker and map to make sure we get the click event.
			this._marker.on('click', this._onClick, this);
			this._map
				.on('click', this._onClick, this)
				.addLayer(this._marker);
		}
		else {
			latlng = this._mouseMarker.getLatLng();
			this._marker.setLatLng(latlng);
		}
	},

	_createMarker: function (latlng) {
		return new L.Marker(latlng, {
			icon: this.options.icon,
			zIndexOffset: this.options.zIndexOffset
		});
	},

	_onClick: function () {
		this._fireCreatedEvent();

		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},

	_onTouch: function (e) {
		// called on click & tap, only really does any thing on tap
		this._onMouseMove(e); // creates & places marker
		this._onClick(); // permanently places marker & ends interaction
	},

	_fireCreatedEvent: function () {
		var marker = new L.Marker.Touch(this._marker.getLatLng(), {icon: this.options.icon});
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, marker);
	}
});



/**
 * @class L.Draw.CircleMarker
 * @aka Draw.CircleMarker
 * @inherits L.Draw.Marker
 */
L.Draw.CircleMarker = L.Draw.Marker.extend({
	statics: {
		TYPE: 'circlemarker'
	},

	options: {
		stroke: true,
		color: '#3388ff',
		weight: 4,
		opacity: 0.5,
		fill: true,
		fillColor: null, //same as color by default
		fillOpacity: 0.2,
		clickable: true,
		zIndexOffset: 2000 // This should be > than the highest z-index any markers
	},

	// @method initialize(): void
	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.CircleMarker.TYPE;

		this._initialLabelText = L.drawLocal.draw.handlers.circlemarker.tooltip.start;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},


	_fireCreatedEvent: function () {
		var circleMarker = new L.CircleMarker(this._marker.getLatLng(), this.options);
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, circleMarker);
	},

	_createMarker: function (latlng) {
		return new L.CircleMarker(latlng, this.options);
	}
});



/**
 * @class L.Draw.Circle
 * @aka Draw.Circle
 * @inherits L.Draw.SimpleShape
 */
L.Draw.Circle = L.Draw.SimpleShape.extend({
	statics: {
		TYPE: 'circle'
	},

	options: {
		shapeOptions: {
			stroke: true,
			color: '#3388ff',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: true
		},
		showRadius: true,
		metric: true, // Whether to use the metric measurement system or imperial
		feet: true, // When not metric, use feet instead of yards for display
		nautic: false // When not metric, not feet use nautic mile for display
	},

	// @method initialize(): void
	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Circle.TYPE;

		this._initialLabelText = L.drawLocal.draw.handlers.circle.tooltip.start;

		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},

	_drawShape: function (latlng) {
		// Calculate the distance based on the version
		if (L.GeometryUtil.isVersion07x()) {
			var distance = this._startLatLng.distanceTo(latlng);
		} else {
			var distance = this._map.distance(this._startLatLng, latlng);
		}

		if (!this._shape) {
			this._shape = new L.Circle(this._startLatLng, distance, this.options.shapeOptions);
			this._map.addLayer(this._shape);
		} else {
			this._shape.setRadius(distance);
		}
	},

	_fireCreatedEvent: function () {
		var circle = new L.Circle(this._startLatLng, this._shape.getRadius(), this.options.shapeOptions);
		L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, circle);
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng,
			showRadius = this.options.showRadius,
			useMetric = this.options.metric,
			radius;

		this._tooltip.updatePosition(latlng);
		if (this._isDrawing) {
			this._drawShape(latlng);

			// Get the new radius (rounded to 1 dp)
			radius = this._shape.getRadius().toFixed(1);

			var subtext = '';
			if (showRadius) {
				subtext = L.drawLocal.draw.handlers.circle.radius + ': ' +
					L.GeometryUtil.readableDistance(radius, useMetric, this.options.feet, this.options.nautic);
			}
			this._tooltip.updateContent({
				text: this._endLabelText,
				subtext: subtext
			});
		}
	}
});



L.Edit = L.Edit || {};

/**
 * @class L.Edit.Marker
 * @aka Edit.Marker
 */
L.Edit.Marker = L.Handler.extend({
	// @method initialize(): void
	initialize: function (marker, options) {
		this._marker = marker;
		L.setOptions(this, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		var marker = this._marker;

		marker.dragging.enable();
		marker.on('dragend', this._onDragEnd, marker);
		this._toggleMarkerHighlight();
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		var marker = this._marker;

		marker.dragging.disable();
		marker.off('dragend', this._onDragEnd, marker);
		this._toggleMarkerHighlight();
	},

	_onDragEnd: function (e) {
		var layer = e.target;
		layer.edited = true;
		this._map.fire(L.Draw.Event.EDITMOVE, {layer: layer});
	},

	_toggleMarkerHighlight: function () {
		var icon = this._marker._icon;

		// Don't do anything if this layer is a marker but doesn't have an icon. Markers
		// should usually have icons. If using Leaflet.draw with Leaflet.markercluster there
		// is a chance that a marker doesn't.
		if (!icon) {
			return;
		}

		// This is quite naughty, but I don't see another way of doing it. (short of setting a new icon)
		icon.style.display = 'none';

		if (L.DomUtil.hasClass(icon, 'leaflet-edit-marker-selected')) {
			L.DomUtil.removeClass(icon, 'leaflet-edit-marker-selected');
			// Offset as the border will make the icon move.
			this._offsetMarker(icon, -4);

		} else {
			L.DomUtil.addClass(icon, 'leaflet-edit-marker-selected');
			// Offset as the border will make the icon move.
			this._offsetMarker(icon, 4);
		}

		icon.style.display = '';
	},

	_offsetMarker: function (icon, offset) {
		var iconMarginTop = parseInt(icon.style.marginTop, 10) - offset,
			iconMarginLeft = parseInt(icon.style.marginLeft, 10) - offset;

		icon.style.marginTop = iconMarginTop + 'px';
		icon.style.marginLeft = iconMarginLeft + 'px';
	}
});

L.Marker.addInitHook(function () {
	if (L.Edit.Marker) {
		this.editing = new L.Edit.Marker(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}
});



L.Edit = L.Edit || {};

/**
 * @class L.Edit.Polyline
 * @aka L.Edit.Poly
 * @aka Edit.Poly
 */
L.Edit.Poly = L.Handler.extend({
	// @method initialize(): void
	initialize: function (poly) {

		this.latlngs = [poly._latlngs];
		if (poly._holes) {
			this.latlngs = this.latlngs.concat(poly._holes);
		}

		this._poly = poly;

		this._poly.on('revert-edited', this._updateLatLngs, this);
	},

	// Compatibility method to normalize Poly* objects
	// between 0.7.x and 1.0+
	_defaultShape: function () {
		if (!L.Polyline._flat) {
			return this._poly._latlngs;
		}
		return L.Polyline._flat(this._poly._latlngs) ? this._poly._latlngs : this._poly._latlngs[0];
	},

	_eachVertexHandler: function (callback) {
		for (var i = 0; i < this._verticesHandlers.length; i++) {
			callback(this._verticesHandlers[i]);
		}
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		this._initHandlers();
		this._eachVertexHandler(function (handler) {
			handler.addHooks();
		});
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		this._eachVertexHandler(function (handler) {
			handler.removeHooks();
		});
	},

	// @method updateMarkers(): void
	// Fire an update for each vertex handler
	updateMarkers: function () {
		this._eachVertexHandler(function (handler) {
			handler.updateMarkers();
		});
	},

	_initHandlers: function () {
		this._verticesHandlers = [];
		for (var i = 0; i < this.latlngs.length; i++) {
			this._verticesHandlers.push(new L.Edit.PolyVerticesEdit(this._poly, this.latlngs[i], this._poly.options.poly));
		}
	},

	_updateLatLngs: function (e) {
		this.latlngs = [e.layer._latlngs];
		if (e.layer._holes) {
			this.latlngs = this.latlngs.concat(e.layer._holes);
		}
	}

});

/**
 * @class L.Edit.PolyVerticesEdit
 * @aka Edit.PolyVerticesEdit
 */
L.Edit.PolyVerticesEdit = L.Handler.extend({
	options: {
		icon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon'
		}),
		touchIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
		}),
		drawError: {
			color: '#b00b00',
			timeout: 1000
		}


	},

	// @method intialize(): void
	initialize: function (poly, latlngs, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.icon = this.options.touchIcon;
		}
		this._poly = poly;

		if (options && options.drawError) {
			options.drawError = L.Util.extend({}, this.options.drawError, options.drawError);
		}

		this._latlngs = latlngs;

		L.setOptions(this, options);
	},

	// Compatibility method to normalize Poly* objects
	// between 0.7.x and 1.0+
	_defaultShape: function () {
		if (!L.Polyline._flat) {
			return this._latlngs;
		}
		return L.Polyline._flat(this._latlngs) ? this._latlngs : this._latlngs[0];
	},

	// @method addHooks(): void
	// Add listener hooks to this handler.
	addHooks: function () {
		var poly = this._poly;
		var path = poly._path;

		if (!(poly instanceof L.Polygon)) {
			poly.options.fill = false;
			if (poly.options.editing) {
				poly.options.editing.fill = false;
			}
		}

		if (path) {
			if (poly.options.editing.className) {
				if (poly.options.original.className) {
					poly.options.original.className.split(' ').forEach(function (className) {
						L.DomUtil.removeClass(path, className);
					});
				}
				poly.options.editing.className.split(' ').forEach(function (className) {
					L.DomUtil.addClass(path, className);
				});
			}
		}

		poly.setStyle(poly.options.editing);

		if (this._poly._map) {

			this._map = this._poly._map; // Set map

			if (!this._markerGroup) {
				this._initMarkers();
			}
			this._poly._map.addLayer(this._markerGroup);
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler.
	removeHooks: function () {
		var poly = this._poly;
		var path = poly._path;

		if (path) {
			if (poly.options.editing.className) {
				poly.options.editing.className.split(' ').forEach(function (className) {
					L.DomUtil.removeClass(path, className);
				});
				if (poly.options.original.className) {
					poly.options.original.className.split(' ').forEach(function (className) {
						L.DomUtil.addClass(path, className);
					});
				}
			}
		}

		poly.setStyle(poly.options.original);

		if (poly._map) {
			poly._map.removeLayer(this._markerGroup);
			delete this._markerGroup;
			delete this._markers;
		}
	},

	// @method updateMarkers(): void
	// Clear markers and update their location
	updateMarkers: function () {
		this._markerGroup.clearLayers();
		this._initMarkers();
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}
		this._markers = [];

		var latlngs = this._defaultShape(),
			i, j, len, marker;

		for (i = 0, len = latlngs.length; i < len; i++) {

			marker = this._createMarker(latlngs[i], i);
			marker.on('click', this._onMarkerClick, this);
			marker.on('contextmenu', this._onContextMenu, this);
			this._markers.push(marker);
		}

		var markerLeft, markerRight;

		for (i = 0, j = len - 1; i < len; j = i++) {
			if (i === 0 && !(L.Polygon && (this._poly instanceof L.Polygon))) {
				continue;
			}

			markerLeft = this._markers[j];
			markerRight = this._markers[i];

			this._createMiddleMarker(markerLeft, markerRight);
			this._updatePrevNext(markerLeft, markerRight);
		}
	},

	_createMarker: function (latlng, index) {
		// Extending L.Marker in TouchEvents.js to include touch.
		var marker = new L.Marker.Touch(latlng, {
			draggable: true,
			icon: this.options.icon,
		});

		marker._origLatLng = latlng;
		marker._index = index;

		marker
			.on('dragstart', this._onMarkerDragStart, this)
			.on('drag', this._onMarkerDrag, this)
			.on('dragend', this._fireEdit, this)
			.on('touchmove', this._onTouchMove, this)
			.on('touchend', this._fireEdit, this)
			.on('MSPointerMove', this._onTouchMove, this)
			.on('MSPointerUp', this._fireEdit, this);

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_onMarkerDragStart: function () {
		this._poly.fire('editstart');
	},

	_spliceLatLngs: function () {
		var latlngs = this._defaultShape();
		var removed = [].splice.apply(latlngs, arguments);
		this._poly._convertLatLngs(latlngs, true);
		this._poly.redraw();
		return removed;
	},

	_removeMarker: function (marker) {
		var i = marker._index;

		this._markerGroup.removeLayer(marker);
		this._markers.splice(i, 1);
		this._spliceLatLngs(i, 1);
		this._updateIndexes(i, -1);

		marker
			.off('dragstart', this._onMarkerDragStart, this)
			.off('drag', this._onMarkerDrag, this)
			.off('dragend', this._fireEdit, this)
			.off('touchmove', this._onMarkerDrag, this)
			.off('touchend', this._fireEdit, this)
			.off('click', this._onMarkerClick, this)
			.off('MSPointerMove', this._onTouchMove, this)
			.off('MSPointerUp', this._fireEdit, this);
	},

	_fireEdit: function () {
		this._poly.edited = true;
		this._poly.fire('edit');
		this._poly._map.fire(L.Draw.Event.EDITVERTEX, {layers: this._markerGroup, poly: this._poly});
	},

	_onMarkerDrag: function (e) {
		var marker = e.target;
		var poly = this._poly;

		L.extend(marker._origLatLng, marker._latlng);

		if (marker._middleLeft) {
			marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
		}
		if (marker._middleRight) {
			marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
		}

		if (poly.options.poly) {
			var tooltip = poly._map._editTooltip; // Access the tooltip

			// If we don't allow intersections and the polygon intersects
			if (!poly.options.poly.allowIntersection && poly.intersects()) {

				var originalColor = poly.options.color;
				poly.setStyle({color: this.options.drawError.color});

				// Manually trigger 'dragend' behavior on marker we are about to remove
				// WORKAROUND: introduced in 1.0.0-rc2, may be related to #4484
				if (L.version.indexOf('0.7') !== 0) {
					marker.dragging._draggable._onUp(e);
				}
				this._onMarkerClick(e); // Remove violating marker
				// FIXME: Reset the marker to it's original position (instead of remove)

				if (tooltip) {
					tooltip.updateContent({
						text: L.drawLocal.draw.handlers.polyline.error
					});
				}

				// Reset everything back to normal after a second
				setTimeout(function () {
					poly.setStyle({color: originalColor});
					if (tooltip) {
						tooltip.updateContent({
							text: L.drawLocal.edit.handlers.edit.tooltip.text,
							subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext
						});
					}
				}, 1000);
			}
		}
		//refresh the bounds when draging
		this._poly._bounds._southWest = L.latLng(Infinity, Infinity);
		this._poly._bounds._northEast = L.latLng(-Infinity, -Infinity);
		var latlngs = this._poly.getLatLngs();
		this._poly._convertLatLngs(latlngs, true);
		this._poly.redraw();
		this._poly.fire('editdrag');
	},

	_onMarkerClick: function (e) {

		var minPoints = L.Polygon && (this._poly instanceof L.Polygon) ? 4 : 3,
			marker = e.target;

		// If removing this point would create an invalid polyline/polygon don't remove
		if (this._defaultShape().length < minPoints) {
			return;
		}

		// remove the marker
		this._removeMarker(marker);

		// update prev/next links of adjacent markers
		this._updatePrevNext(marker._prev, marker._next);

		// remove ghost markers near the removed marker
		if (marker._middleLeft) {
			this._markerGroup.removeLayer(marker._middleLeft);
		}
		if (marker._middleRight) {
			this._markerGroup.removeLayer(marker._middleRight);
		}

		// create a ghost marker in place of the removed one
		if (marker._prev && marker._next) {
			this._createMiddleMarker(marker._prev, marker._next);

		} else if (!marker._prev) {
			marker._next._middleLeft = null;

		} else if (!marker._next) {
			marker._prev._middleRight = null;
		}

		this._fireEdit();
	},

	_onContextMenu: function (e) {
		var marker = e.target;
		var poly = this._poly;
		this._poly._map.fire(L.Draw.Event.MARKERCONTEXT, {marker: marker, layers: this._markerGroup, poly: this._poly});
		L.DomEvent.stopPropagation;
	},

	_onTouchMove: function (e) {

		var layerPoint = this._map.mouseEventToLayerPoint(e.originalEvent.touches[0]),
			latlng = this._map.layerPointToLatLng(layerPoint),
			marker = e.target;

		L.extend(marker._origLatLng, latlng);

		if (marker._middleLeft) {
			marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
		}
		if (marker._middleRight) {
			marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
		}

		this._poly.redraw();
		this.updateMarkers();
	},

	_updateIndexes: function (index, delta) {
		this._markerGroup.eachLayer(function (marker) {
			if (marker._index > index) {
				marker._index += delta;
			}
		});
	},

	_createMiddleMarker: function (marker1, marker2) {
		var latlng = this._getMiddleLatLng(marker1, marker2),
			marker = this._createMarker(latlng),
			onClick,
			onDragStart,
			onDragEnd;

		marker.setOpacity(0.6);

		marker1._middleRight = marker2._middleLeft = marker;

		onDragStart = function () {
			marker.off('touchmove', onDragStart, this);
			var i = marker2._index;

			marker._index = i;

			marker
				.off('click', onClick, this)
				.on('click', this._onMarkerClick, this);

			latlng.lat = marker.getLatLng().lat;
			latlng.lng = marker.getLatLng().lng;
			this._spliceLatLngs(i, 0, latlng);
			this._markers.splice(i, 0, marker);

			marker.setOpacity(1);

			this._updateIndexes(i, 1);
			marker2._index++;
			this._updatePrevNext(marker1, marker);
			this._updatePrevNext(marker, marker2);

			this._poly.fire('editstart');
		};

		onDragEnd = function () {
			marker.off('dragstart', onDragStart, this);
			marker.off('dragend', onDragEnd, this);
			marker.off('touchmove', onDragStart, this);

			this._createMiddleMarker(marker1, marker);
			this._createMiddleMarker(marker, marker2);
		};

		onClick = function () {
			onDragStart.call(this);
			onDragEnd.call(this);
			this._fireEdit();
		};

		marker
			.on('click', onClick, this)
			.on('dragstart', onDragStart, this)
			.on('dragend', onDragEnd, this)
			.on('touchmove', onDragStart, this);

		this._markerGroup.addLayer(marker);
	},

	_updatePrevNext: function (marker1, marker2) {
		if (marker1) {
			marker1._next = marker2;
		}
		if (marker2) {
			marker2._prev = marker1;
		}
	},

	_getMiddleLatLng: function (marker1, marker2) {
		var map = this._poly._map,
			p1 = map.project(marker1.getLatLng()),
			p2 = map.project(marker2.getLatLng());

		return map.unproject(p1._add(p2)._divideBy(2));
	}
});

L.Polyline.addInitHook(function () {

	// Check to see if handler has already been initialized. This is to support versions of Leaflet that still have L.Handler.PolyEdit
	if (this.editing) {
		return;
	}

	if (L.Edit.Poly) {

		this.editing = new L.Edit.Poly(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}

	this.on('add', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	});

	this.on('remove', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}
	});
});



L.Edit = L.Edit || {};
/**
 * @class L.Edit.SimpleShape
 * @aka Edit.SimpleShape
 */
L.Edit.SimpleShape = L.Handler.extend({
	options: {
		moveIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move'
		}),
		resizeIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize'
		}),
		touchMoveIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move leaflet-touch-icon'
		}),
		touchResizeIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize leaflet-touch-icon'
		}),
	},

	// @method intialize(): void
	initialize: function (shape, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.moveIcon = this.options.touchMoveIcon;
			this.options.resizeIcon = this.options.touchResizeIcon;
		}

		this._shape = shape;
		L.Util.setOptions(this, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		var shape = this._shape;
		if (this._shape._map) {
			this._map = this._shape._map;
			shape.setStyle(shape.options.editing);

			if (shape._map) {
				this._map = shape._map;
				if (!this._markerGroup) {
					this._initMarkers();
				}
				this._map.addLayer(this._markerGroup);
			}
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		var shape = this._shape;

		shape.setStyle(shape.options.original);

		if (shape._map) {
			this._unbindMarker(this._moveMarker);

			for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
				this._unbindMarker(this._resizeMarkers[i]);
			}
			this._resizeMarkers = null;

			this._map.removeLayer(this._markerGroup);
			delete this._markerGroup;
		}

		this._map = null;
	},

	// @method updateMarkers(): void
	// Remove the edit markers from this layer
	updateMarkers: function () {
		this._markerGroup.clearLayers();
		this._initMarkers();
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}

		// Create center marker
		this._createMoveMarker();

		// Create edge marker
		this._createResizeMarker();
	},

	_createMoveMarker: function () {
		// Children override
	},

	_createResizeMarker: function () {
		// Children override
	},

	_createMarker: function (latlng, icon) {
		// Extending L.Marker in TouchEvents.js to include touch.
		var marker = new L.Marker.Touch(latlng, {
			draggable: true,
			icon: icon,
			zIndexOffset: 10
		});

		this._bindMarker(marker);

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_bindMarker: function (marker) {
		marker
			.on('dragstart', this._onMarkerDragStart, this)
			.on('drag', this._onMarkerDrag, this)
			.on('dragend', this._onMarkerDragEnd, this)
			.on('touchstart', this._onTouchStart, this)
			.on('touchmove', this._onTouchMove, this)
			.on('MSPointerMove', this._onTouchMove, this)
			.on('touchend', this._onTouchEnd, this)
			.on('MSPointerUp', this._onTouchEnd, this);
	},

	_unbindMarker: function (marker) {
		marker
			.off('dragstart', this._onMarkerDragStart, this)
			.off('drag', this._onMarkerDrag, this)
			.off('dragend', this._onMarkerDragEnd, this)
			.off('touchstart', this._onTouchStart, this)
			.off('touchmove', this._onTouchMove, this)
			.off('MSPointerMove', this._onTouchMove, this)
			.off('touchend', this._onTouchEnd, this)
			.off('MSPointerUp', this._onTouchEnd, this);
	},

	_onMarkerDragStart: function (e) {
		var marker = e.target;
		marker.setOpacity(0);

		this._shape.fire('editstart');
	},

	_fireEdit: function () {
		this._shape.edited = true;
		this._shape.fire('edit');
	},

	_onMarkerDrag: function (e) {
		var marker = e.target,
			latlng = marker.getLatLng();

		if (marker === this._moveMarker) {
			this._move(latlng);
		} else {
			this._resize(latlng);
		}

		this._shape.redraw();
		this._shape.fire('editdrag');
	},

	_onMarkerDragEnd: function (e) {
		var marker = e.target;
		marker.setOpacity(1);

		this._fireEdit();
	},

	_onTouchStart: function (e) {
		L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, e);

		if (typeof(this._getCorners) === 'function') {
			// Save a reference to the opposite point
			var corners = this._getCorners(),
				marker = e.target,
				currentCornerIndex = marker._cornerIndex;

			marker.setOpacity(0);

			// Copyed from Edit.Rectangle.js line 23 _onMarkerDragStart()
			// Latlng is null otherwise.
			this._oppositeCorner = corners[(currentCornerIndex + 2) % 4];
			this._toggleCornerMarkers(0, currentCornerIndex);
		}

		this._shape.fire('editstart');
	},

	_onTouchMove: function (e) {
		var layerPoint = this._map.mouseEventToLayerPoint(e.originalEvent.touches[0]),
			latlng = this._map.layerPointToLatLng(layerPoint),
			marker = e.target;

		if (marker === this._moveMarker) {
			this._move(latlng);
		} else {
			this._resize(latlng);
		}

		this._shape.redraw();

		// prevent touchcancel in IOS
		// e.preventDefault();
		return false;
	},

	_onTouchEnd: function (e) {
		var marker = e.target;
		marker.setOpacity(1);
		this.updateMarkers();
		this._fireEdit();
	},

	_move: function () {
		// Children override
	},

	_resize: function () {
		// Children override
	}
});



L.Edit = L.Edit || {};
/**
 * @class L.Edit.Rectangle
 * @aka Edit.Rectangle
 * @inherits L.Edit.SimpleShape
 */
L.Edit.Rectangle = L.Edit.SimpleShape.extend({
	_createMoveMarker: function () {
		var bounds = this._shape.getBounds(),
			center = bounds.getCenter();

		this._moveMarker = this._createMarker(center, this.options.moveIcon);
	},

	_createResizeMarker: function () {
		var corners = this._getCorners();

		this._resizeMarkers = [];

		for (var i = 0, l = corners.length; i < l; i++) {
			this._resizeMarkers.push(this._createMarker(corners[i], this.options.resizeIcon));
			// Monkey in the corner index as we will need to know this for dragging
			this._resizeMarkers[i]._cornerIndex = i;
		}
	},

	_onMarkerDragStart: function (e) {
		L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, e);

		// Save a reference to the opposite point
		var corners = this._getCorners(),
			marker = e.target,
			currentCornerIndex = marker._cornerIndex;

		this._oppositeCorner = corners[(currentCornerIndex + 2) % 4];

		this._toggleCornerMarkers(0, currentCornerIndex);
	},

	_onMarkerDragEnd: function (e) {
		var marker = e.target,
			bounds, center;

		// Reset move marker position to the center
		if (marker === this._moveMarker) {
			bounds = this._shape.getBounds();
			center = bounds.getCenter();

			marker.setLatLng(center);
		}

		this._toggleCornerMarkers(1);

		this._repositionCornerMarkers();

		L.Edit.SimpleShape.prototype._onMarkerDragEnd.call(this, e);
	},

	_move: function (newCenter) {
		var latlngs = this._shape._defaultShape ? this._shape._defaultShape() : this._shape.getLatLngs(),
			bounds = this._shape.getBounds(),
			center = bounds.getCenter(),
			offset, newLatLngs = [];

		// Offset the latlngs to the new center
		for (var i = 0, l = latlngs.length; i < l; i++) {
			offset = [latlngs[i].lat - center.lat, latlngs[i].lng - center.lng];
			newLatLngs.push([newCenter.lat + offset[0], newCenter.lng + offset[1]]);
		}

		this._shape.setLatLngs(newLatLngs);

		// Reposition the resize markers
		this._repositionCornerMarkers();

		this._map.fire(L.Draw.Event.EDITMOVE, {layer: this._shape});
	},

	_resize: function (latlng) {
		var bounds;

		// Update the shape based on the current position of this corner and the opposite point
		this._shape.setBounds(L.latLngBounds(latlng, this._oppositeCorner));

		// Reposition the move marker
		bounds = this._shape.getBounds();
		this._moveMarker.setLatLng(bounds.getCenter());

		this._map.fire(L.Draw.Event.EDITRESIZE, {layer: this._shape});
	},

	_getCorners: function () {
		var bounds = this._shape.getBounds(),
			nw = bounds.getNorthWest(),
			ne = bounds.getNorthEast(),
			se = bounds.getSouthEast(),
			sw = bounds.getSouthWest();

		return [nw, ne, se, sw];
	},

	_toggleCornerMarkers: function (opacity) {
		for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
			this._resizeMarkers[i].setOpacity(opacity);
		}
	},

	_repositionCornerMarkers: function () {
		var corners = this._getCorners();

		for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
			this._resizeMarkers[i].setLatLng(corners[i]);
		}
	}
});

L.Rectangle.addInitHook(function () {
	if (L.Edit.Rectangle) {
		this.editing = new L.Edit.Rectangle(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}
});



L.Edit = L.Edit || {};
/**
 * @class L.Edit.CircleMarker
 * @aka Edit.Circle
 * @inherits L.Edit.SimpleShape
 */
L.Edit.CircleMarker = L.Edit.SimpleShape.extend({
	_createMoveMarker: function () {
		var center = this._shape.getLatLng();

		this._moveMarker = this._createMarker(center, this.options.moveIcon);
	},

	_createResizeMarker: function () {
		// To avoid an undefined check in L.Edit.SimpleShape.removeHooks
		this._resizeMarkers = [];
	},

	_move: function (latlng) {
		if (this._resizeMarkers.length) {
			var resizemarkerPoint = this._getResizeMarkerPoint(latlng);
			// Move the resize marker
			this._resizeMarkers[0].setLatLng(resizemarkerPoint);
		}

		// Move the circle
		this._shape.setLatLng(latlng);

		this._map.fire(L.Draw.Event.EDITMOVE, {layer: this._shape});
	},
});

L.CircleMarker.addInitHook(function () {
	if (L.Edit.CircleMarker) {
		this.editing = new L.Edit.CircleMarker(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}

	this.on('add', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	});

	this.on('remove', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}
	});
});



L.Edit = L.Edit || {};
/**
 * @class L.Edit.Circle
 * @aka Edit.Circle
 * @inherits L.Edit.CircleMarker
 */
L.Edit.Circle = L.Edit.CircleMarker.extend({

	_createResizeMarker: function () {
		var center = this._shape.getLatLng(),
			resizemarkerPoint = this._getResizeMarkerPoint(center);

		this._resizeMarkers = [];
		this._resizeMarkers.push(this._createMarker(resizemarkerPoint, this.options.resizeIcon));
	},

	_getResizeMarkerPoint: function (latlng) {
		// From L.shape.getBounds()
		var delta = this._shape._radius * Math.cos(Math.PI / 4),
			point = this._map.project(latlng);
		return this._map.unproject([point.x + delta, point.y - delta]);
	},

	_resize: function (latlng) {
		var moveLatLng = this._moveMarker.getLatLng();

		// Calculate the radius based on the version
		if (L.GeometryUtil.isVersion07x()) {
			radius = moveLatLng.distanceTo(latlng);
		} else {
			radius = this._map.distance(moveLatLng, latlng);
		}
		this._shape.setRadius(radius);

		this._map._editTooltip.updateContent({
			text: L.drawLocal.edit.handlers.edit.tooltip.subtext + '<br />' + L.drawLocal.edit.handlers.edit.tooltip.text,
			subtext: L.drawLocal.draw.handlers.circle.radius + ': ' +
			L.GeometryUtil.readableDistance(radius, true, this.options.feet, this.options.nautic)
		});

		this._shape.setRadius(radius);

		this._map.fire(L.Draw.Event.EDITRESIZE, {layer: this._shape});
	}
});

L.Circle.addInitHook(function () {
	if (L.Edit.Circle) {
		this.editing = new L.Edit.Circle(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}

	this.on('add', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	});

	this.on('remove', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}
	});
});



L.Map.mergeOptions({
	touchExtend: true
});

/**
 * @class L.Map.TouchExtend
 * @aka TouchExtend
 */
L.Map.TouchExtend = L.Handler.extend({

	// @method initialize(): void
	// Sets TouchExtend private accessor variables
	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
	},

	// @method addHooks(): void
	// Adds dom listener events to the map container
	addHooks: function () {
		L.DomEvent.on(this._container, 'touchstart', this._onTouchStart, this);
		L.DomEvent.on(this._container, 'touchend', this._onTouchEnd, this);
		L.DomEvent.on(this._container, 'touchmove', this._onTouchMove, this);
		if (this._detectIE()) {
			L.DomEvent.on(this._container, 'MSPointerDown', this._onTouchStart, this);
			L.DomEvent.on(this._container, 'MSPointerUp', this._onTouchEnd, this);
			L.DomEvent.on(this._container, 'MSPointerMove', this._onTouchMove, this);
			L.DomEvent.on(this._container, 'MSPointerCancel', this._onTouchCancel, this);

		} else {
			L.DomEvent.on(this._container, 'touchcancel', this._onTouchCancel, this);
			L.DomEvent.on(this._container, 'touchleave', this._onTouchLeave, this);
		}
	},

	// @method removeHooks(): void
	// Removes dom listener events from the map container
	removeHooks: function () {
		L.DomEvent.off(this._container, 'touchstart', this._onTouchStart);
		L.DomEvent.off(this._container, 'touchend', this._onTouchEnd);
		L.DomEvent.off(this._container, 'touchmove', this._onTouchMove);
		if (this._detectIE()) {
			L.DomEvent.off(this._container, 'MSPointerDowm', this._onTouchStart);
			L.DomEvent.off(this._container, 'MSPointerUp', this._onTouchEnd);
			L.DomEvent.off(this._container, 'MSPointerMove', this._onTouchMove);
			L.DomEvent.off(this._container, 'MSPointerCancel', this._onTouchCancel);
		} else {
			L.DomEvent.off(this._container, 'touchcancel', this._onTouchCancel);
			L.DomEvent.off(this._container, 'touchleave', this._onTouchLeave);
		}
	},

	_touchEvent: function (e, type) {
		// #TODO: fix the pageX error that is do a bug in Android where a single touch triggers two click events
		// _filterClick is what leaflet uses as a workaround.
		// This is a problem with more things than just android. Another problem is touchEnd has no touches in
		// its touch list.
		var touchEvent = {};
		if (typeof e.touches !== 'undefined') {
			if (!e.touches.length) {
				return;
			}
			touchEvent = e.touches[0];
		} else if (e.pointerType === 'touch') {
			touchEvent = e;
			if (!this._filterClick(e)) {
				return;
			}
		} else {
			return;
		}

		var containerPoint = this._map.mouseEventToContainerPoint(touchEvent),
			layerPoint = this._map.mouseEventToLayerPoint(touchEvent),
			latlng = this._map.layerPointToLatLng(layerPoint);

		this._map.fire(type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			pageX: touchEvent.pageX,
			pageY: touchEvent.pageY,
			originalEvent: e
		});
	},

	/** Borrowed from Leaflet and modified for bool ops **/
	_filterClick: function (e) {
		var timeStamp = (e.timeStamp || e.originalEvent.timeStamp),
			elapsed = L.DomEvent._lastClick && (timeStamp - L.DomEvent._lastClick);

		// are they closer together than 500ms yet more than 100ms?
		// Android typically triggers them ~300ms apart while multiple listeners
		// on the same event should be triggered far faster;
		// or check if click is simulated on the element, and if it is, reject any non-simulated events
		if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
			L.DomEvent.stop(e);
			return false;
		}
		L.DomEvent._lastClick = timeStamp;
		return true;
	},

	_onTouchStart: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchstart';
		this._touchEvent(e, type);

	},

	_onTouchEnd: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchend';
		this._touchEvent(e, type);
	},

	_onTouchCancel: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchcancel';
		if (this._detectIE()) {
			type = 'pointercancel';
		}
		this._touchEvent(e, type);
	},

	_onTouchLeave: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchleave';
		this._touchEvent(e, type);
	},

	_onTouchMove: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchmove';
		this._touchEvent(e, type);
	},

	_detectIE: function () {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// IE 12 => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
});

L.Map.addInitHook('addHandler', 'touchExtend', L.Map.TouchExtend);


/**
 * @class L.Marker.Touch
 * @aka Marker.Touch
 *
 * This isn't full Touch support. This is just to get markers to also support dom touch events after creation
 * #TODO: find a better way of getting markers to support touch.
 */
L.Marker.Touch = L.Marker.extend({

	_initInteraction: function () {
		if (!this.addInteractiveTarget) {
			// 0.7.x support
			return this._initInteractionLegacy();
		}
		// TODO this may need be updated to re-add touch events for 1.0+
		return L.Marker.prototype._initInteraction.apply(this);
	},

	// This is an exact copy of https://github.com/Leaflet/Leaflet/blob/v0.7/src/layer/marker/Marker.js
	// with the addition of the touch events
	_initInteractionLegacy: function () {

		if (!this.options.clickable) {
			return;
		}

		// TODO refactor into something shared with Map/Path/etc. to DRY it up

		var icon = this._icon,
			events = ['dblclick',
				'mousedown',
				'mouseover',
				'mouseout',
				'contextmenu',
				'touchstart',
				'touchend',
				'touchmove'];
		if (this._detectIE) {
			events.concat(['MSPointerDown',
				'MSPointerUp',
				'MSPointerMove',
				'MSPointerCancel']);
		} else {
			events.concat(['touchcancel']);
		}

		L.DomUtil.addClass(icon, 'leaflet-clickable');
		L.DomEvent.on(icon, 'click', this._onMouseClick, this);
		L.DomEvent.on(icon, 'keypress', this._onKeyPress, this);

		for (var i = 0; i < events.length; i++) {
			L.DomEvent.on(icon, events[i], this._fireMouseEvent, this);
		}

		if (L.Handler.MarkerDrag) {
			this.dragging = new L.Handler.MarkerDrag(this);

			if (this.options.draggable) {
				this.dragging.enable();
			}
		}
	},

	_detectIE: function () {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// IE 12 => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
});



/**
 * @class L.LatLngUtil
 * @aka LatLngUtil
 */
L.LatLngUtil = {
	// Clones a LatLngs[], returns [][]

	// @method cloneLatLngs(LatLngs[]): L.LatLngs[]
	// Clone the latLng point or points or nested points and return an array with those points
	cloneLatLngs: function (latlngs) {
		var clone = [];
		for (var i = 0, l = latlngs.length; i < l; i++) {
			// Check for nested array (Polyline/Polygon)
			if (Array.isArray(latlngs[i])) {
				clone.push(L.LatLngUtil.cloneLatLngs(latlngs[i]));
			} else {
				clone.push(this.cloneLatLng(latlngs[i]));
			}
		}
		return clone;
	},

	// @method cloneLatLng(LatLng): L.LatLng
	// Clone the latLng and return a new LatLng object.
	cloneLatLng: function (latlng) {
		return L.latLng(latlng.lat, latlng.lng);
	}
};



(function () {

	var defaultPrecision = {
		km: 2,
		ha: 2,
		m: 0,
		mi: 2,
		ac: 2,
		yd: 0,
		ft: 0,
		nm: 2
	};


	/**
	 * @class L.GeometryUtil
	 * @aka GeometryUtil
	 */
	L.GeometryUtil = L.extend(L.GeometryUtil || {}, {
		// Ported from the OpenLayers implementation. See https://github.com/openlayers/openlayers/blob/master/lib/OpenLayers/Geometry/LinearRing.js#L270

		// @method geodesicArea(): number
		geodesicArea: function (latLngs) {
			var pointsCount = latLngs.length,
				area = 0.0,
				d2r = Math.PI / 180,
				p1, p2;

			if (pointsCount > 2) {
				for (var i = 0; i < pointsCount; i++) {
					p1 = latLngs[i];
					p2 = latLngs[(i + 1) % pointsCount];
					area += ((p2.lng - p1.lng) * d2r) *
						(2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
				}
				area = area * 6378137.0 * 6378137.0 / 2.0;
			}

			return Math.abs(area);
		},

		// @method formattedNumber(n, precision): string
		// Returns n in specified number format (if defined) and precision
		formattedNumber: function (n, precision) {
			var formatted = parseFloat(n).toFixed(precision),
				format = L.drawLocal.format && L.drawLocal.format.numeric,
				delimiters = format && format.delimiters,
				thousands = delimiters && delimiters.thousands,
				decimal = delimiters && delimiters.decimal;

			if (thousands || decimal) {
				var splitValue = formatted.split('.');
				formatted = thousands ? splitValue[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousands) : splitValue[0];
				decimal = decimal || '.';
				if (splitValue.length > 1) {
					formatted = formatted + decimal + splitValue[1];
				}
			}

			return formatted;
		},

		// @method readableArea(area, isMetric, precision): string
		// Returns a readable area string in yards or metric.
		// The value will be rounded as defined by the precision option object.
		readableArea: function (area, isMetric, precision) {
			var areaStr,
				units,
				precision = L.Util.extend({}, defaultPrecision, precision);

			if (isMetric) {
				units = ['ha', 'm'];
				type = typeof isMetric;
				if (type === 'string') {
					units = [isMetric];
				} else if (type !== 'boolean') {
					units = isMetric;
				}

				if (area >= 1000000 && units.indexOf('km') !== -1) {
					areaStr = L.GeometryUtil.formattedNumber(area * 0.000001, precision['km']) + ' km²';
				} else if (area >= 10000 && units.indexOf('ha') !== -1) {
					areaStr = L.GeometryUtil.formattedNumber(area * 0.0001, precision['ha']) + ' ha';
				} else {
					areaStr = L.GeometryUtil.formattedNumber(area, precision['m']) + ' m²';
				}
			} else {
				area /= 0.836127; // Square yards in 1 meter

				if (area >= 3097600) { //3097600 square yards in 1 square mile
					areaStr = L.GeometryUtil.formattedNumber(area / 3097600, precision['mi']) + ' mi²';
				} else if (area >= 4840) { //4840 square yards in 1 acre
					areaStr = L.GeometryUtil.formattedNumber(area / 4840, precision['ac']) + ' acres';
				} else {
					areaStr = L.GeometryUtil.formattedNumber(area, precision['yd']) + ' yd²';
				}
			}

			return areaStr;
		},

		// @method readableDistance(distance, units): string
		// Converts a metric distance to one of [ feet, nauticalMile, metric or yards ] string
		//
		// @alternative
		// @method readableDistance(distance, isMetric, useFeet, isNauticalMile, precision): string
		// Converts metric distance to distance string.
		// The value will be rounded as defined by the precision option object.
		readableDistance: function (distance, isMetric, isFeet, isNauticalMile, precision) {
			var distanceStr,
				units,
				precision = L.Util.extend({}, defaultPrecision, precision);

			if (isMetric) {
				units = typeof isMetric == 'string' ? isMetric : 'metric';
			} else if (isFeet) {
				units = 'feet';
			} else if (isNauticalMile) {
				units = 'nauticalMile';
			} else {
				units = 'yards';
			}

			switch (units) {
				case 'metric':
					// show metres when distance is < 1km, then show km
					if (distance > 1000) {
						distanceStr = L.GeometryUtil.formattedNumber(distance / 1000, precision['km']) + ' km';
					} else {
						distanceStr = L.GeometryUtil.formattedNumber(distance, precision['m']) + ' m';
					}
					break;
				case 'feet':
					distance *= 1.09361 * 3;
					distanceStr = L.GeometryUtil.formattedNumber(distance, precision['ft']) + ' ft';

					break;
				case 'nauticalMile':
					distance *= 0.53996;
					distanceStr = L.GeometryUtil.formattedNumber(distance / 1000, precision['nm']) + ' nm';
					break;
				case 'yards':
				default:
					distance *= 1.09361;

					if (distance > 1760) {
						distanceStr = L.GeometryUtil.formattedNumber(distance / 1760, precision['mi']) + ' miles';
					} else {
						distanceStr = L.GeometryUtil.formattedNumber(distance, precision['yd']) + ' yd';
					}
					break;
			}
			return distanceStr;
		},

		// @method isVersion07x(): boolean
		// Returns true if the Leaflet version is 0.7.x, false otherwise.
		isVersion07x: function () {
			var version = L.version.split('.');
			//If Version is == 0.7.*
			return parseInt(version[0], 10) === 0 && parseInt(version[1], 10) === 7;
		},
	});

})();



/**
 * @class L.LineUtil
 * @aka Util
 * @aka L.Utils
 */
L.Util.extend(L.LineUtil, {

	// @method segmentsIntersect(): boolean
	// Checks to see if two line segments intersect. Does not handle degenerate cases.
	// http://compgeom.cs.uiuc.edu/~jeffe/teaching/373/notes/x06-sweepline.pdf
	segmentsIntersect: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2, /*Point*/ p3) {
		return this._checkCounterclockwise(p, p2, p3) !==
			this._checkCounterclockwise(p1, p2, p3) &&
			this._checkCounterclockwise(p, p1, p2) !==
			this._checkCounterclockwise(p, p1, p3);
	},

	// check to see if points are in counterclockwise order
	_checkCounterclockwise: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return (p2.y - p.y) * (p1.x - p.x) > (p1.y - p.y) * (p2.x - p.x);
	}
});



/**
 * @class L.Polyline
 * @aka Polyline
 */
L.Polyline.include({

	// @method intersects(): boolean
	// Check to see if this polyline has any linesegments that intersect.
	// NOTE: does not support detecting intersection for degenerate cases.
	intersects: function () {
		var points = this._getProjectedPoints(),
			len = points ? points.length : 0,
			i, p, p1;

		if (this._tooFewPointsForIntersection()) {
			return false;
		}

		for (i = len - 1; i >= 3; i--) {
			p = points[i - 1];
			p1 = points[i];


			if (this._lineSegmentsIntersectsRange(p, p1, i - 2)) {
				return true;
			}
		}

		return false;
	},

	// @method newLatLngIntersects(): boolean
	// Check for intersection if new latlng was added to this polyline.
	// NOTE: does not support detecting intersection for degenerate cases.
	newLatLngIntersects: function (latlng, skipFirst) {
		// Cannot check a polyline for intersecting lats/lngs when not added to the map
		if (!this._map) {
			return false;
		}

		return this.newPointIntersects(this._map.latLngToLayerPoint(latlng), skipFirst);
	},

	// @method newPointIntersects(): boolean
	// Check for intersection if new point was added to this polyline.
	// newPoint must be a layer point.
	// NOTE: does not support detecting intersection for degenerate cases.
	newPointIntersects: function (newPoint, skipFirst) {
		var points = this._getProjectedPoints(),
			len = points ? points.length : 0,
			lastPoint = points ? points[len - 1] : null,
			// The previous previous line segment. Previous line segment doesn't need testing.
			maxIndex = len - 2;

		if (this._tooFewPointsForIntersection(1)) {
			return false;
		}

		return this._lineSegmentsIntersectsRange(lastPoint, newPoint, maxIndex, skipFirst ? 1 : 0);
	},

	// Polylines with 2 sides can only intersect in cases where points are collinear (we don't support detecting these).
	// Cannot have intersection when < 3 line segments (< 4 points)
	_tooFewPointsForIntersection: function (extraPoints) {
		var points = this._getProjectedPoints(),
			len = points ? points.length : 0;
		// Increment length by extraPoints if present
		len += extraPoints || 0;

		return !points || len <= 3;
	},

	// Checks a line segment intersections with any line segments before its predecessor.
	// Don't need to check the predecessor as will never intersect.
	_lineSegmentsIntersectsRange: function (p, p1, maxIndex, minIndex) {
		var points = this._getProjectedPoints(),
			p2, p3;

		minIndex = minIndex || 0;

		// Check all previous line segments (beside the immediately previous) for intersections
		for (var j = maxIndex; j > minIndex; j--) {
			p2 = points[j - 1];
			p3 = points[j];

			if (L.LineUtil.segmentsIntersect(p, p1, p2, p3)) {
				return true;
			}
		}

		return false;
	},

	_getProjectedPoints: function () {
		if (!this._defaultShape) {
			return this._originalPoints;
		}
		var points = [],
			_shape = this._defaultShape();

		for (var i = 0; i < _shape.length; i++) {
			points.push(this._map.latLngToLayerPoint(_shape[i]));
		}
		return points;
	}
});



/**
 * @class L.Polygon
 * @aka Polygon
 */
L.Polygon.include({

	// @method intersects(): boolean
	// Checks a polygon for any intersecting line segments. Ignores holes.
	intersects: function () {
		var polylineIntersects,
			points = this._getProjectedPoints(),
			len, firstPoint, lastPoint, maxIndex;

		if (this._tooFewPointsForIntersection()) {
			return false;
		}

		polylineIntersects = L.Polyline.prototype.intersects.call(this);

		// If already found an intersection don't need to check for any more.
		if (polylineIntersects) {
			return true;
		}

		len = points.length;
		firstPoint = points[0];
		lastPoint = points[len - 1];
		maxIndex = len - 2;

		// Check the line segment between last and first point. Don't need to check the first line segment (minIndex = 1)
		return this._lineSegmentsIntersectsRange(lastPoint, firstPoint, maxIndex, 1);
	}
});



/**
 * @class L.Control.Draw
 * @aka L.Draw
 */
L.Control.Draw = L.Control.extend({

	// Options
	options: {
		position: 'topleft',
		draw: {},
		edit: false
	},

	// @method initialize(): void
	// Initializes draw control, toolbars from the options
	initialize: function (options) {
		if (L.version < '0.7') {
			throw new Error('Leaflet.draw 0.2.3+ requires Leaflet 0.7.0+. Download latest from https://github.com/Leaflet/Leaflet/');
		}

		L.Control.prototype.initialize.call(this, options);

		var toolbar;

		this._toolbars = {};

		// Initialize toolbars
		if (L.DrawToolbar && this.options.draw) {
			toolbar = new L.DrawToolbar(this.options.draw);

			this._toolbars[L.DrawToolbar.TYPE] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[L.DrawToolbar.TYPE].on('enable', this._toolbarEnabled, this);
		}

		if (L.EditToolbar && this.options.edit) {
			toolbar = new L.EditToolbar(this.options.edit);

			this._toolbars[L.EditToolbar.TYPE] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[L.EditToolbar.TYPE].on('enable', this._toolbarEnabled, this);
		}
		L.toolbar = this; //set global var for editing the toolbar
	},

	// @method onAdd(): container
	// Adds the toolbar container to the map
	onAdd: function (map) {
		var container = L.DomUtil.create('div', 'leaflet-draw'),
			addedTopClass = false,
			topClassName = 'leaflet-draw-toolbar-top',
			toolbarContainer;

		for (var toolbarId in this._toolbars) {
			if (this._toolbars.hasOwnProperty(toolbarId)) {
				toolbarContainer = this._toolbars[toolbarId].addToolbar(map);

				if (toolbarContainer) {
					// Add class to the first toolbar to remove the margin
					if (!addedTopClass) {
						if (!L.DomUtil.hasClass(toolbarContainer, topClassName)) {
							L.DomUtil.addClass(toolbarContainer.childNodes[0], topClassName);
						}
						addedTopClass = true;
					}

					container.appendChild(toolbarContainer);
				}
			}
		}

		return container;
	},

	// @method onRemove(): void
	// Removes the toolbars from the map toolbar container
	onRemove: function () {
		for (var toolbarId in this._toolbars) {
			if (this._toolbars.hasOwnProperty(toolbarId)) {
				this._toolbars[toolbarId].removeToolbar();
			}
		}
	},

	// @method setDrawingOptions(options): void
	// Sets options to all toolbar instances
	setDrawingOptions: function (options) {
		for (var toolbarId in this._toolbars) {
			if (this._toolbars[toolbarId] instanceof L.DrawToolbar) {
				this._toolbars[toolbarId].setOptions(options);
			}
		}
	},

	_toolbarEnabled: function (e) {
		var enabledToolbar = e.target;

		for (var toolbarId in this._toolbars) {
			if (this._toolbars[toolbarId] !== enabledToolbar) {
				this._toolbars[toolbarId].disable();
			}
		}
	}
});

L.Map.mergeOptions({
	drawControlTooltips: true,
	drawControl: false
});

L.Map.addInitHook(function () {
	if (this.options.drawControl) {
		this.drawControl = new L.Control.Draw();
		this.addControl(this.drawControl);
	}
});



/**
 * @class L.Draw.Toolbar
 * @aka Toolbar
 *
 * The toolbar class of the API — it is used to create the ui
 * This will be depreciated
 *
 * @example
 *
 * ```js
 *    var toolbar = L.Toolbar();
 *    toolbar.addToolbar(map);
 * ```
 *
 * ### Disabling a toolbar
 *
 * If you do not want a particular toolbar in your app you can turn it off by setting the toolbar to false.
 *
 * ```js
 *      var drawControl = new L.Control.Draw({
 *          draw: false,
 *          edit: {
 *              featureGroup: editableLayers
 *          }
 *      });
 * ```
 *
 * ### Disabling a toolbar item
 *
 * If you want to turn off a particular toolbar item, set it to false. The following disables drawing polygons and
 * markers. It also turns off the ability to edit layers.
 *
 * ```js
 *      var drawControl = new L.Control.Draw({
 *          draw: {
 *              polygon: false,
 *              marker: false
 *          },
 *          edit: {
 *              featureGroup: editableLayers,
 *              edit: false
 *          }
 *      });
 * ```
 */
L.Toolbar = L.Class.extend({
	// @section Methods for modifying the toolbar

	// @method initialize(options): void
	// Toolbar constructor
	initialize: function (options) {
		L.setOptions(this, options);

		this._modes = {};
		this._actionButtons = [];
		this._activeMode = null;

		var version = L.version.split('.');
		//If Version is >= 1.2.0
		if (parseInt(version[0], 10) === 1 && parseInt(version[1], 10) >= 2) {
			L.Toolbar.include(L.Evented.prototype);
		} else {
			L.Toolbar.include(L.Mixin.Events);
		}
	},

	// @method enabled(): boolean
	// Gets a true/false of whether the toolbar is enabled
	enabled: function () {
		return this._activeMode !== null;
	},

	// @method disable(): void
	// Disables the toolbar
	disable: function () {
		if (!this.enabled()) {
			return;
		}

		this._activeMode.handler.disable();
	},

	// @method addToolbar(map): L.DomUtil
	// Adds the toolbar to the map and returns the toolbar dom element
	addToolbar: function (map) {
		var container = L.DomUtil.create('div', 'leaflet-draw-section'),
			buttonIndex = 0,
			buttonClassPrefix = this._toolbarClass || '',
			modeHandlers = this.getModeHandlers(map),
			i;

		this._toolbarContainer = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar');
		this._map = map;

		for (i = 0; i < modeHandlers.length; i++) {
			if (modeHandlers[i].enabled) {
				this._initModeHandler(
					modeHandlers[i].handler,
					this._toolbarContainer,
					buttonIndex++,
					buttonClassPrefix,
					modeHandlers[i].title
				);
			}
		}

		// if no buttons were added, do not add the toolbar
		if (!buttonIndex) {
			return;
		}

		// Save button index of the last button, -1 as we would have ++ after the last button
		this._lastButtonIndex = --buttonIndex;

		// Create empty actions part of the toolbar
		this._actionsContainer = L.DomUtil.create('ul', 'leaflet-draw-actions');

		// Add draw and cancel containers to the control container
		container.appendChild(this._toolbarContainer);
		container.appendChild(this._actionsContainer);

		return container;
	},

	// @method removeToolbar(): void
	// Removes the toolbar and drops the handler event listeners
	removeToolbar: function () {
		// Dispose each handler
		for (var handlerId in this._modes) {
			if (this._modes.hasOwnProperty(handlerId)) {
				// Unbind handler button
				this._disposeButton(
					this._modes[handlerId].button,
					this._modes[handlerId].handler.enable,
					this._modes[handlerId].handler
				);

				// Make sure is disabled
				this._modes[handlerId].handler.disable();

				// Unbind handler
				this._modes[handlerId].handler
					.off('enabled', this._handlerActivated, this)
					.off('disabled', this._handlerDeactivated, this);
			}
		}
		this._modes = {};

		// Dispose the actions toolbar
		for (var i = 0, l = this._actionButtons.length; i < l; i++) {
			this._disposeButton(
				this._actionButtons[i].button,
				this._actionButtons[i].callback,
				this
			);
		}
		this._actionButtons = [];
		this._actionsContainer = null;
	},

	_initModeHandler: function (handler, container, buttonIndex, classNamePredix, buttonTitle) {
		var type = handler.type;

		this._modes[type] = {};

		this._modes[type].handler = handler;

		this._modes[type].button = this._createButton({
			type: type,
			title: buttonTitle,
			className: classNamePredix + '-' + type,
			container: container,
			callback: this._modes[type].handler.enable,
			context: this._modes[type].handler
		});

		this._modes[type].buttonIndex = buttonIndex;

		this._modes[type].handler
			.on('enabled', this._handlerActivated, this)
			.on('disabled', this._handlerDeactivated, this);
	},

	/* Detect iOS based on browser User Agent, based on:
	 * http://stackoverflow.com/a/9039885 */
	_detectIOS: function () {
		var iOS = (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
		return iOS;
	},

	_createButton: function (options) {

		var link = L.DomUtil.create('a', options.className || '', options.container);
		// Screen reader tag
		var sr = L.DomUtil.create('span', 'sr-only', options.container);

		link.href = '#';
		link.appendChild(sr);

		if (options.title) {
			link.title = options.title;
			sr.innerHTML = options.title;
		}

		if (options.text) {
			link.innerHTML = options.text;
			sr.innerHTML = options.text;
		}

		/* iOS does not use click events */
		var buttonEvent = this._detectIOS() ? 'touchstart' : 'click';

		L.DomEvent
			.on(link, 'click', L.DomEvent.stopPropagation)
			.on(link, 'mousedown', L.DomEvent.stopPropagation)
			.on(link, 'dblclick', L.DomEvent.stopPropagation)
			.on(link, 'touchstart', L.DomEvent.stopPropagation)
			.on(link, 'click', L.DomEvent.preventDefault)
			.on(link, buttonEvent, options.callback, options.context);

		return link;
	},

	_disposeButton: function (button, callback) {
		/* iOS does not use click events */
		var buttonEvent = this._detectIOS() ? 'touchstart' : 'click';

		L.DomEvent
			.off(button, 'click', L.DomEvent.stopPropagation)
			.off(button, 'mousedown', L.DomEvent.stopPropagation)
			.off(button, 'dblclick', L.DomEvent.stopPropagation)
			.off(button, 'touchstart', L.DomEvent.stopPropagation)
			.off(button, 'click', L.DomEvent.preventDefault)
			.off(button, buttonEvent, callback);
	},

	_handlerActivated: function (e) {
		// Disable active mode (if present)
		this.disable();

		// Cache new active feature
		this._activeMode = this._modes[e.handler];

		L.DomUtil.addClass(this._activeMode.button, 'leaflet-draw-toolbar-button-enabled');

		this._showActionsToolbar();

		this.fire('enable');
	},

	_handlerDeactivated: function () {
		this._hideActionsToolbar();

		L.DomUtil.removeClass(this._activeMode.button, 'leaflet-draw-toolbar-button-enabled');

		this._activeMode = null;

		this.fire('disable');
	},

	_createActions: function (handler) {
		var container = this._actionsContainer,
			buttons = this.getActions(handler),
			l = buttons.length,
			li, di, dl, button;

		// Dispose the actions toolbar (todo: dispose only not used buttons)
		for (di = 0, dl = this._actionButtons.length; di < dl; di++) {
			this._disposeButton(this._actionButtons[di].button, this._actionButtons[di].callback);
		}
		this._actionButtons = [];

		// Remove all old buttons
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		for (var i = 0; i < l; i++) {
			if ('enabled' in buttons[i] && !buttons[i].enabled) {
				continue;
			}

			li = L.DomUtil.create('li', '', container);

			button = this._createButton({
				title: buttons[i].title,
				text: buttons[i].text,
				container: li,
				callback: buttons[i].callback,
				context: buttons[i].context
			});

			this._actionButtons.push({
				button: button,
				callback: buttons[i].callback
			});
		}
	},

	_showActionsToolbar: function () {
		var buttonIndex = this._activeMode.buttonIndex,
			lastButtonIndex = this._lastButtonIndex,
			toolbarPosition = this._activeMode.button.offsetTop - 1;

		// Recreate action buttons on every click
		this._createActions(this._activeMode.handler);

		// Correctly position the cancel button
		this._actionsContainer.style.top = toolbarPosition + 'px';

		if (buttonIndex === 0) {
			L.DomUtil.addClass(this._toolbarContainer, 'leaflet-draw-toolbar-notop');
			L.DomUtil.addClass(this._actionsContainer, 'leaflet-draw-actions-top');
		}

		if (buttonIndex === lastButtonIndex) {
			L.DomUtil.addClass(this._toolbarContainer, 'leaflet-draw-toolbar-nobottom');
			L.DomUtil.addClass(this._actionsContainer, 'leaflet-draw-actions-bottom');
		}

		this._actionsContainer.style.display = 'block';
		this._map.fire(L.Draw.Event.TOOLBAROPENED);
	},

	_hideActionsToolbar: function () {
		this._actionsContainer.style.display = 'none';

		L.DomUtil.removeClass(this._toolbarContainer, 'leaflet-draw-toolbar-notop');
		L.DomUtil.removeClass(this._toolbarContainer, 'leaflet-draw-toolbar-nobottom');
		L.DomUtil.removeClass(this._actionsContainer, 'leaflet-draw-actions-top');
		L.DomUtil.removeClass(this._actionsContainer, 'leaflet-draw-actions-bottom');
		this._map.fire(L.Draw.Event.TOOLBARCLOSED);
	}
});



L.Draw = L.Draw || {};
/**
 * @class L.Draw.Tooltip
 * @aka Tooltip
 *
 * The tooltip class — it is used to display the tooltip while drawing
 * This will be depreciated
 *
 * @example
 *
 * ```js
 *    var tooltip = L.Draw.Tooltip();
 * ```
 *
 */
L.Draw.Tooltip = L.Class.extend({

	// @section Methods for modifying draw state

	// @method initialize(map): void
	// Tooltip constructor
	initialize: function (map) {
		this._map = map;
		this._popupPane = map._panes.popupPane;
		this._visible = false;

		this._container = map.options.drawControlTooltips ?
			L.DomUtil.create('div', 'leaflet-draw-tooltip', this._popupPane) : null;
		this._singleLineLabel = false;

		this._map.on('mouseout', this._onMouseOut, this);
	},

	// @method dispose(): void
	// Remove Tooltip DOM and unbind events
	dispose: function () {
		this._map.off('mouseout', this._onMouseOut, this);

		if (this._container) {
			this._popupPane.removeChild(this._container);
			this._container = null;
		}
	},

	// @method updateContent(labelText): this
	// Changes the tooltip text to string in function call
	updateContent: function (labelText) {
		if (!this._container) {
			return this;
		}
		labelText.subtext = labelText.subtext || '';

		// update the vertical position (only if changed)
		if (labelText.subtext.length === 0 && !this._singleLineLabel) {
			L.DomUtil.addClass(this._container, 'leaflet-draw-tooltip-single');
			this._singleLineLabel = true;
		}
		else if (labelText.subtext.length > 0 && this._singleLineLabel) {
			L.DomUtil.removeClass(this._container, 'leaflet-draw-tooltip-single');
			this._singleLineLabel = false;
		}

		this._container.innerHTML =
			(labelText.subtext.length > 0 ?
				'<span class="leaflet-draw-tooltip-subtext">' + labelText.subtext + '</span>' + '<br />' : '') +
			'<span>' + labelText.text + '</span>';

		if (!labelText.text && !labelText.subtext) {
			this._visible = false;
			this._container.style.visibility = 'hidden';
		} else {
			this._visible = true;
			this._container.style.visibility = 'inherit';
		}

		return this;
	},

	// @method updatePosition(latlng): this
	// Changes the location of the tooltip
	updatePosition: function (latlng) {
		var pos = this._map.latLngToLayerPoint(latlng),
			tooltipContainer = this._container;

		if (this._container) {
			if (this._visible) {
				tooltipContainer.style.visibility = 'inherit';
			}
			L.DomUtil.setPosition(tooltipContainer, pos);
		}

		return this;
	},

	// @method showAsError(): this
	// Applies error class to tooltip
	showAsError: function () {
		if (this._container) {
			L.DomUtil.addClass(this._container, 'leaflet-error-draw-tooltip');
		}
		return this;
	},

	// @method removeError(): this
	// Removes the error class from the tooltip
	removeError: function () {
		if (this._container) {
			L.DomUtil.removeClass(this._container, 'leaflet-error-draw-tooltip');
		}
		return this;
	},

	_onMouseOut: function () {
		if (this._container) {
			this._container.style.visibility = 'hidden';
		}
	}
});



/**
 * @class L.DrawToolbar
 * @aka Toolbar
 */
L.DrawToolbar = L.Toolbar.extend({

	statics: {
		TYPE: 'draw'
	},

	options: {
		polyline: {},
		polygon: {},
		rectangle: {},
		circle: {},
		marker: {},
		circlemarker: {}
	},

	// @method initialize(): void
	initialize: function (options) {
		// Ensure that the options are merged correctly since L.extend is only shallow
		for (var type in this.options) {
			if (this.options.hasOwnProperty(type)) {
				if (options[type]) {
					options[type] = L.extend({}, this.options[type], options[type]);
				}
			}
		}

		this._toolbarClass = 'leaflet-draw-draw';
		L.Toolbar.prototype.initialize.call(this, options);
	},

	// @method getModeHandlers(): object
	// Get mode handlers information
	getModeHandlers: function (map) {
		return [
			{
				enabled: this.options.polyline,
				handler: new L.Draw.Polyline(map, this.options.polyline),
				title: L.drawLocal.draw.toolbar.buttons.polyline
			},
			{
				enabled: this.options.polygon,
				handler: new L.Draw.Polygon(map, this.options.polygon),
				title: L.drawLocal.draw.toolbar.buttons.polygon
			},
			{
				enabled: this.options.rectangle,
				handler: new L.Draw.Rectangle(map, this.options.rectangle),
				title: L.drawLocal.draw.toolbar.buttons.rectangle
			},
			{
				enabled: this.options.circle,
				handler: new L.Draw.Circle(map, this.options.circle),
				title: L.drawLocal.draw.toolbar.buttons.circle
			},
			{
				enabled: this.options.marker,
				handler: new L.Draw.Marker(map, this.options.marker),
				title: L.drawLocal.draw.toolbar.buttons.marker
			},
			{
				enabled: this.options.circlemarker,
				handler: new L.Draw.CircleMarker(map, this.options.circlemarker),
				title: L.drawLocal.draw.toolbar.buttons.circlemarker
			}
		];
	},

	// @method getActions(): object
	// Get action information
	getActions: function (handler) {
		return [
			{
				enabled: handler.completeShape,
				title: L.drawLocal.draw.toolbar.finish.title,
				text: L.drawLocal.draw.toolbar.finish.text,
				callback: handler.completeShape,
				context: handler
			},
			{
				enabled: handler.deleteLastVertex,
				title: L.drawLocal.draw.toolbar.undo.title,
				text: L.drawLocal.draw.toolbar.undo.text,
				callback: handler.deleteLastVertex,
				context: handler
			},
			{
				title: L.drawLocal.draw.toolbar.actions.title,
				text: L.drawLocal.draw.toolbar.actions.text,
				callback: this.disable,
				context: this
			}
		];
	},

	// @method setOptions(): void
	// Sets the options to the toolbar
	setOptions: function (options) {
		L.setOptions(this, options);

		for (var type in this._modes) {
			if (this._modes.hasOwnProperty(type) && options.hasOwnProperty(type)) {
				this._modes[type].handler.setOptions(options[type]);
			}
		}
	}
});



/*L.Map.mergeOptions({
 editControl: true
 });*/
/**
 * @class L.EditToolbar
 * @aka EditToolbar
 */
L.EditToolbar = L.Toolbar.extend({
	statics: {
		TYPE: 'edit'
	},

	options: {
		edit: {
			selectedPathOptions: {
				dashArray: '10, 10',

				fill: true,
				fillColor: '#fe57a1',
				fillOpacity: 0.1,

				// Whether to user the existing layers color
				maintainColor: false
			}
		},
		remove: {},
		poly: null,
		featureGroup: null /* REQUIRED! TODO: perhaps if not set then all layers on the map are selectable? */
	},

	// @method intialize(): void
	initialize: function (options) {
		// Need to set this manually since null is an acceptable value here
		if (options.edit) {
			if (typeof options.edit.selectedPathOptions === 'undefined') {
				options.edit.selectedPathOptions = this.options.edit.selectedPathOptions;
			}
			options.edit.selectedPathOptions = L.extend({}, this.options.edit.selectedPathOptions, options.edit.selectedPathOptions);
		}

		if (options.remove) {
			options.remove = L.extend({}, this.options.remove, options.remove);
		}

		if (options.poly) {
			options.poly = L.extend({}, this.options.poly, options.poly);
		}

		this._toolbarClass = 'leaflet-draw-edit';
		L.Toolbar.prototype.initialize.call(this, options);

		this._selectedFeatureCount = 0;
	},

	// @method getModeHandlers(): object
	// Get mode handlers information
	getModeHandlers: function (map) {
		var featureGroup = this.options.featureGroup;
		return [
			{
				enabled: this.options.edit,
				handler: new L.EditToolbar.Edit(map, {
					featureGroup: featureGroup,
					selectedPathOptions: this.options.edit.selectedPathOptions,
					poly: this.options.poly
				}),
				title: L.drawLocal.edit.toolbar.buttons.edit
			},
			{
				enabled: this.options.remove,
				handler: new L.EditToolbar.Delete(map, {
					featureGroup: featureGroup
				}),
				title: L.drawLocal.edit.toolbar.buttons.remove
			}
		];
	},

	// @method getActions(): object
	// Get actions information
	getActions: function (handler) {
		var actions = [
			{
				title: L.drawLocal.edit.toolbar.actions.save.title,
				text: L.drawLocal.edit.toolbar.actions.save.text,
				callback: this._save,
				context: this
			},
			{
				title: L.drawLocal.edit.toolbar.actions.cancel.title,
				text: L.drawLocal.edit.toolbar.actions.cancel.text,
				callback: this.disable,
				context: this
			}
		];

		if (handler.removeAllLayers) {
			actions.push({
				title: L.drawLocal.edit.toolbar.actions.clearAll.title,
				text: L.drawLocal.edit.toolbar.actions.clearAll.text,
				callback: this._clearAllLayers,
				context: this
			});
		}

		return actions;
	},

	// @method addToolbar(map): L.DomUtil
	// Adds the toolbar to the map
	addToolbar: function (map) {
		var container = L.Toolbar.prototype.addToolbar.call(this, map);

		this._checkDisabled();

		this.options.featureGroup.on('layeradd layerremove', this._checkDisabled, this);

		return container;
	},

	// @method removeToolbar(): void
	// Removes the toolbar from the map
	removeToolbar: function () {
		this.options.featureGroup.off('layeradd layerremove', this._checkDisabled, this);

		L.Toolbar.prototype.removeToolbar.call(this);
	},

	// @method disable(): void
	// Disables the toolbar
	disable: function () {
		if (!this.enabled()) {
			return;
		}

		this._activeMode.handler.revertLayers();

		L.Toolbar.prototype.disable.call(this);
	},

	_save: function () {
		this._activeMode.handler.save();
		if (this._activeMode) {
			this._activeMode.handler.disable();
		}
	},

	_clearAllLayers: function () {
		this._activeMode.handler.removeAllLayers();
		if (this._activeMode) {
			this._activeMode.handler.disable();
		}
	},

	_checkDisabled: function () {
		var featureGroup = this.options.featureGroup,
			hasLayers = featureGroup.getLayers().length !== 0,
			button;

		if (this.options.edit) {
			button = this._modes[L.EditToolbar.Edit.TYPE].button;

			if (hasLayers) {
				L.DomUtil.removeClass(button, 'leaflet-disabled');
			} else {
				L.DomUtil.addClass(button, 'leaflet-disabled');
			}

			button.setAttribute(
				'title',
				hasLayers ?
					L.drawLocal.edit.toolbar.buttons.edit
					: L.drawLocal.edit.toolbar.buttons.editDisabled
			);
		}

		if (this.options.remove) {
			button = this._modes[L.EditToolbar.Delete.TYPE].button;

			if (hasLayers) {
				L.DomUtil.removeClass(button, 'leaflet-disabled');
			} else {
				L.DomUtil.addClass(button, 'leaflet-disabled');
			}

			button.setAttribute(
				'title',
				hasLayers ?
					L.drawLocal.edit.toolbar.buttons.remove
					: L.drawLocal.edit.toolbar.buttons.removeDisabled
			);
		}
	}
});



/**
 * @class L.EditToolbar.Edit
 * @aka EditToolbar.Edit
 */
L.EditToolbar.Edit = L.Handler.extend({
	statics: {
		TYPE: 'edit'
	},

	// @method intialize(): void
	initialize: function (map, options) {
		L.Handler.prototype.initialize.call(this, map);

		L.setOptions(this, options);

		// Store the selectable layer group for ease of access
		this._featureGroup = options.featureGroup;

		if (!(this._featureGroup instanceof L.FeatureGroup)) {
			throw new Error('options.featureGroup must be a L.FeatureGroup');
		}

		this._uneditedLayerProps = {};

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.EditToolbar.Edit.TYPE;

		var version = L.version.split('.');
		//If Version is >= 1.2.0
		if (parseInt(version[0], 10) === 1 && parseInt(version[1], 10) >= 2) {
			L.EditToolbar.Edit.include(L.Evented.prototype);
		} else {
			L.EditToolbar.Edit.include(L.Mixin.Events);
		}
	},

	// @method enable(): void
	// Enable the edit toolbar
	enable: function () {
		if (this._enabled || !this._hasAvailableLayers()) {
			return;
		}
		this.fire('enabled', {handler: this.type});
		//this disable other handlers

		this._map.fire(L.Draw.Event.EDITSTART, {handler: this.type});
		//allow drawLayer to be updated before beginning edition.

		L.Handler.prototype.enable.call(this);
		this._featureGroup
			.on('layeradd', this._enableLayerEdit, this)
			.on('layerremove', this._disableLayerEdit, this);
	},

	// @method disable(): void
	// Disable the edit toolbar
	disable: function () {
		if (!this._enabled) {
			return;
		}
		this._featureGroup
			.off('layeradd', this._enableLayerEdit, this)
			.off('layerremove', this._disableLayerEdit, this);
		L.Handler.prototype.disable.call(this);
		this._map.fire(L.Draw.Event.EDITSTOP, {handler: this.type});
		this.fire('disabled', {handler: this.type});
	},

	// @method addHooks(): void
	// Add listener hooks for this handler
	addHooks: function () {
		var map = this._map;

		if (map) {
			map.getContainer().focus();

			this._featureGroup.eachLayer(this._enableLayerEdit, this);

			this._tooltip = new L.Draw.Tooltip(this._map);
			this._tooltip.updateContent({
				text: L.drawLocal.edit.handlers.edit.tooltip.text,
				subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext
			});

			// Quickly access the tooltip to update for intersection checking
			map._editTooltip = this._tooltip;

			this._updateTooltip();

			this._map
				.on('mousemove', this._onMouseMove, this)
				.on('touchmove', this._onMouseMove, this)
				.on('MSPointerMove', this._onMouseMove, this)
				.on(L.Draw.Event.EDITVERTEX, this._updateTooltip, this);
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks for this handler
	removeHooks: function () {
		if (this._map) {
			// Clean up selected layers.
			this._featureGroup.eachLayer(this._disableLayerEdit, this);

			// Clear the backups of the original layers
			this._uneditedLayerProps = {};

			this._tooltip.dispose();
			this._tooltip = null;

			this._map
				.off('mousemove', this._onMouseMove, this)
				.off('touchmove', this._onMouseMove, this)
				.off('MSPointerMove', this._onMouseMove, this)
				.off(L.Draw.Event.EDITVERTEX, this._updateTooltip, this);
		}
	},

	// @method revertLayers(): void
	// Revert each layer's geometry changes
	revertLayers: function () {
		this._featureGroup.eachLayer(function (layer) {
			this._revertLayer(layer);
		}, this);
	},

	// @method save(): void
	// Save the layer geometries
	save: function () {
		var editedLayers = new L.LayerGroup();
		this._featureGroup.eachLayer(function (layer) {
			if (layer.edited) {
				editedLayers.addLayer(layer);
				layer.edited = false;
			}
		});
		this._map.fire(L.Draw.Event.EDITED, {layers: editedLayers});
	},

	_backupLayer: function (layer) {
		var id = L.Util.stamp(layer);

		if (!this._uneditedLayerProps[id]) {
			// Polyline, Polygon or Rectangle
			if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Rectangle) {
				this._uneditedLayerProps[id] = {
					latlngs: L.LatLngUtil.cloneLatLngs(layer.getLatLngs())
				};
			} else if (layer instanceof L.Circle) {
				this._uneditedLayerProps[id] = {
					latlng: L.LatLngUtil.cloneLatLng(layer.getLatLng()),
					radius: layer.getRadius()
				};
			} else if (layer instanceof L.Marker || layer instanceof L.CircleMarker) { // Marker
				this._uneditedLayerProps[id] = {
					latlng: L.LatLngUtil.cloneLatLng(layer.getLatLng())
				};
			}
		}
	},

	_getTooltipText: function () {
		return ({
			text: L.drawLocal.edit.handlers.edit.tooltip.text,
			subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext
		});
	},

	_updateTooltip: function () {
		this._tooltip.updateContent(this._getTooltipText());
	},

	_revertLayer: function (layer) {
		var id = L.Util.stamp(layer);
		layer.edited = false;
		if (this._uneditedLayerProps.hasOwnProperty(id)) {
			// Polyline, Polygon or Rectangle
			if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Rectangle) {
				layer.setLatLngs(this._uneditedLayerProps[id].latlngs);
			} else if (layer instanceof L.Circle) {
				layer.setLatLng(this._uneditedLayerProps[id].latlng);
				layer.setRadius(this._uneditedLayerProps[id].radius);
			} else if (layer instanceof L.Marker || layer instanceof L.CircleMarker) { // Marker or CircleMarker
				layer.setLatLng(this._uneditedLayerProps[id].latlng);
			}

			layer.fire('revert-edited', {layer: layer});
		}
	},

	_enableLayerEdit: function (e) {
		var layer = e.layer || e.target || e,
			pathOptions, poly;

		// Back up this layer (if haven't before)
		this._backupLayer(layer);

		if (this.options.poly) {
			poly = L.Util.extend({}, this.options.poly);
			layer.options.poly = poly;
		}

		// Set different style for editing mode
		if (this.options.selectedPathOptions) {
			pathOptions = L.Util.extend({}, this.options.selectedPathOptions);

			// Use the existing color of the layer
			if (pathOptions.maintainColor) {
				pathOptions.color = layer.options.color;
				pathOptions.fillColor = layer.options.fillColor;
			}

			layer.options.original = L.extend({}, layer.options);
			layer.options.editing = pathOptions;

		}

		if (layer instanceof L.Marker) {
			if (layer.editing) {
				layer.editing.enable();
			}
			layer.dragging.enable();
			layer
				.on('dragend', this._onMarkerDragEnd)
				// #TODO: remove when leaflet finally fixes their draggable so it's touch friendly again.
				.on('touchmove', this._onTouchMove, this)
				.on('MSPointerMove', this._onTouchMove, this)
				.on('touchend', this._onMarkerDragEnd, this)
				.on('MSPointerUp', this._onMarkerDragEnd, this);
		} else {
			layer.editing.enable();
		}
	},

	_disableLayerEdit: function (e) {
		var layer = e.layer || e.target || e;

		layer.edited = false;
		if (layer.editing) {
			layer.editing.disable();
		}

		delete layer.options.editing;
		delete layer.options.original;
		// Reset layer styles to that of before select
		if (this._selectedPathOptions) {
			if (layer instanceof L.Marker) {
				this._toggleMarkerHighlight(layer);
			} else {
				// reset the layer style to what is was before being selected
				layer.setStyle(layer.options.previousOptions);
				// remove the cached options for the layer object
				delete layer.options.previousOptions;
			}
		}

		if (layer instanceof L.Marker) {
			layer.dragging.disable();
			layer
				.off('dragend', this._onMarkerDragEnd, this)
				.off('touchmove', this._onTouchMove, this)
				.off('MSPointerMove', this._onTouchMove, this)
				.off('touchend', this._onMarkerDragEnd, this)
				.off('MSPointerUp', this._onMarkerDragEnd, this);
		} else {
			layer.editing.disable();
		}
	},

	_onMouseMove: function (e) {
		this._tooltip.updatePosition(e.latlng);
	},

	_onMarkerDragEnd: function (e) {
		var layer = e.target;
		layer.edited = true;
		this._map.fire(L.Draw.Event.EDITMOVE, {layer: layer});
	},

	_onTouchMove: function (e) {
		var touchEvent = e.originalEvent.changedTouches[0],
			layerPoint = this._map.mouseEventToLayerPoint(touchEvent),
			latlng = this._map.layerPointToLatLng(layerPoint);
		e.target.setLatLng(latlng);
	},

	_hasAvailableLayers: function () {
		return this._featureGroup.getLayers().length !== 0;
	}
});



/**
 * @class L.EditToolbar.Delete
 * @aka EditToolbar.Delete
 */
L.EditToolbar.Delete = L.Handler.extend({
	statics: {
		TYPE: 'remove' // not delete as delete is reserved in js
	},

	// @method intialize(): void
	initialize: function (map, options) {
		L.Handler.prototype.initialize.call(this, map);

		L.Util.setOptions(this, options);

		// Store the selectable layer group for ease of access
		this._deletableLayers = this.options.featureGroup;

		if (!(this._deletableLayers instanceof L.FeatureGroup)) {
			throw new Error('options.featureGroup must be a L.FeatureGroup');
		}

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.EditToolbar.Delete.TYPE;

		var version = L.version.split('.');
		//If Version is >= 1.2.0
		if (parseInt(version[0], 10) === 1 && parseInt(version[1], 10) >= 2) {
			L.EditToolbar.Delete.include(L.Evented.prototype);
		} else {
			L.EditToolbar.Delete.include(L.Mixin.Events);
		}

	},

	// @method enable(): void
	// Enable the delete toolbar
	enable: function () {
		if (this._enabled || !this._hasAvailableLayers()) {
			return;
		}
		this.fire('enabled', {handler: this.type});

		this._map.fire(L.Draw.Event.DELETESTART, {handler: this.type});

		L.Handler.prototype.enable.call(this);

		this._deletableLayers
			.on('layeradd', this._enableLayerDelete, this)
			.on('layerremove', this._disableLayerDelete, this);
	},

	// @method disable(): void
	// Disable the delete toolbar
	disable: function () {
		if (!this._enabled) {
			return;
		}

		this._deletableLayers
			.off('layeradd', this._enableLayerDelete, this)
			.off('layerremove', this._disableLayerDelete, this);

		L.Handler.prototype.disable.call(this);

		this._map.fire(L.Draw.Event.DELETESTOP, {handler: this.type});

		this.fire('disabled', {handler: this.type});
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		var map = this._map;

		if (map) {
			map.getContainer().focus();

			this._deletableLayers.eachLayer(this._enableLayerDelete, this);
			this._deletedLayers = new L.LayerGroup();

			this._tooltip = new L.Draw.Tooltip(this._map);
			this._tooltip.updateContent({text: L.drawLocal.edit.handlers.remove.tooltip.text});

			this._map.on('mousemove', this._onMouseMove, this);
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		if (this._map) {
			this._deletableLayers.eachLayer(this._disableLayerDelete, this);
			this._deletedLayers = null;

			this._tooltip.dispose();
			this._tooltip = null;

			this._map.off('mousemove', this._onMouseMove, this);
		}
	},

	// @method revertLayers(): void
	// Revert the deleted layers back to their prior state.
	revertLayers: function () {
		// Iterate of the deleted layers and add them back into the featureGroup
		this._deletedLayers.eachLayer(function (layer) {
			this._deletableLayers.addLayer(layer);
			layer.fire('revert-deleted', {layer: layer});
		}, this);
	},

	// @method save(): void
	// Save deleted layers
	save: function () {
		this._map.fire(L.Draw.Event.DELETED, {layers: this._deletedLayers});
	},

	// @method removeAllLayers(): void
	// Remove all delateable layers
	removeAllLayers: function () {
		// Iterate of the delateable layers and add remove them
		this._deletableLayers.eachLayer(function (layer) {
			this._removeLayer({layer: layer});
		}, this);
		this.save();
	},

	_enableLayerDelete: function (e) {
		var layer = e.layer || e.target || e;

		layer.on('click', this._removeLayer, this);
	},

	_disableLayerDelete: function (e) {
		var layer = e.layer || e.target || e;

		layer.off('click', this._removeLayer, this);

		// Remove from the deleted layers so we can't accidentally revert if the user presses cancel
		this._deletedLayers.removeLayer(layer);
	},

	_removeLayer: function (e) {
		var layer = e.layer || e.target || e;

		this._deletableLayers.removeLayer(layer);

		this._deletedLayers.addLayer(layer);

		layer.fire('deleted');
	},

	_onMouseMove: function (e) {
		this._tooltip.updatePosition(e.latlng);
	},

	_hasAvailableLayers: function () {
		return this._deletableLayers.getLayers().length !== 0;
	}
});



}(window, document));
//# sourceMappingURL=leaflet.draw-src.map