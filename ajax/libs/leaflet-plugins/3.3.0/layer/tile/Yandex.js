// https://tech.yandex.com/maps/doc/jsapi/2.1/quick-start/index-docpage/

/* global ymaps: true */

L.Yandex = L.Layer.extend({

	options: {
		type: 'yandex#map', // 'map', 'satellite', 'hybrid', 'map~vector' | 'overlay', 'skeleton'
		mapOptions: { // https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Map-docpage/#Map__param-options
			// yandexMapDisablePoiInteractivity: true,
			balloonAutoPan: false,
			suppressMapOpenBlock: true
		},
		overlayOpacity: 0.8,
		minZoom: 0,
		maxZoom: 19
	},

	initialize: function (type, options) {
		if (typeof type === 'object') {
			options = type;
			type = false;
		}
		options = L.Util.setOptions(this, options);
		if (type) { options.type = type; }
		this._isOverlay = options.type.indexOf('overlay') !== -1 ||
		                  options.type.indexOf('skeleton') !== -1;
	},

	_setStyle: function (el, style) {
		for (var prop in style) {
			el.style[prop] = style[prop];
		}
	},

	_initContainer: function (parentEl) {
		var zIndexClass = this._isOverlay ? 'leaflet-overlay-pane' : 'leaflet-tile-pane';
		var _container = L.DomUtil.create('div', 'leaflet-yandex-container leaflet-pane ' + zIndexClass);
		var opacity = this.options.opacity || this._isOverlay && this.options.overlayOpacity;
		if (opacity) {
			L.DomUtil.setOpacity(_container, opacity);
		}
		var auto = { width: '100%', height: '100%' };
		this._setStyle(parentEl, auto);   // need to set this explicitly,
		this._setStyle(_container, auto); // otherwise ymaps fails to follow container size changes
		return _container;
	},

	onAdd: function (map) {
		var mapPane = map.getPane('mapPane');
		if (!this._container) {
			this._container = this._initContainer(mapPane);
			map.once('unload', this._destroy, this);
			this._initApi();
		}
		mapPane.appendChild(this._container);
		if (!this._yandex) { return; }
		this._setEvents(map);
		this._update();
	},

	beforeAdd: function (map) {
		map._addZoomLimit(this);
	},

	onRemove: function (map) {
		map._removeZoomLimit(this);
	},

	_destroy: function (e) {
		if (!this._map || this._map === e.target) {
			if (this._yandex) {
				this._yandex.destroy();
				delete this._yandex;
			}
			delete this._container;
		}
	},

	_setEvents: function (map) {
		var events = {
			move: this._update
		};
		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}
		map.on(events, this);
		this.once('remove', function () {
			map.off(events, this);
			this._container.remove(); // we do not call this until api is initialized (ymaps API expects DOM element)
		}, this);
	},

	_update: function () {
		var map = this._map;
		var center = map.getCenter();
		this._yandex.setCenter([center.lat, center.lng], map.getZoom());
		var offset = L.point(0,0).subtract(L.DomUtil.getPosition(map.getPane('mapPane')));
		L.DomUtil.setPosition(this._container, offset); // move to visible part of pane
	},

	_resyncView: function () { // for use in addons
		if (!this._map) { return; }
		var ymap = this._yandex;
		this._map.setView(ymap.getCenter(), ymap.getZoom(), { animate: false });
	},

	_animateZoom: function (e) {
		var map = this._map;
		var viewHalf = map.getSize()._divideBy(2);
		var topLeft = map.project(e.center, e.zoom)._subtract(viewHalf)._round();
                var offset = map.project(map.getBounds().getNorthWest(), e.zoom)._subtract(topLeft);
		var scale = map.getZoomScale(e.zoom);
		this._yandex.panes._array.forEach(function (el) {
			if (el.pane instanceof ymaps.pane.MovablePane) {
				var element = el.pane.getElement();
				L.DomUtil.addClass(element, 'leaflet-zoom-animated');
				L.DomUtil.setTransform(element, offset, scale);
			}
		});
	},

	_initApi: function () { // to be extended in addons
		ymaps.ready(this._initMapObject, this);
	},

	_mapType: function () {
		var shortType = this.options.type;
		if (!shortType || shortType.indexOf('#') !== -1) {
			return shortType;
		}
		return 'yandex#' + shortType;
	},

	_initMapObject: function () {
		ymaps.mapType.storage.add('yandex#overlay', new ymaps.MapType('overlay', []));
		ymaps.mapType.storage.add('yandex#skeleton', new ymaps.MapType('skeleton', ['yandex#skeleton']));
		ymaps.mapType.storage.add('yandex#map~vector', new ymaps.MapType('map~vector', ['yandex#map~vector']));
		var ymap = new ymaps.Map(this._container, {
			center: [0, 0], zoom: 0, behaviors: [], controls: [],
			type: this._mapType()
		}, this.options.mapOptions);

		if (this._isOverlay) {
			ymap.container.getElement().style.background = 'transparent';
		}
		this._container.remove();
		this._yandex = ymap;
		if (this._map) { this.onAdd(this._map); }

		this.fire('load');
	}
});

L.yandex = function (type, options) {
	return new L.Yandex(type, options);
};
