(function(window, document, undefined) {

"use strict";

// L.Layer was introduced in Leaflet 1.0 and is not present in earlier releases.
window.LeafletToolbar = (L.Layer || L.Class).extend({
	statics: {
		baseClass: 'leaflet-toolbar'
	},

	options: {
		className: '',
		filter: function() { return true; },
		actions: []
	},

	initialize: function(options) {
		L.setOptions(this, options);
		this._toolbar_type = this.constructor._toolbar_class_id;
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);

		return this;
	},

	onAdd: function(map) {
		var currentToolbar = map._toolbars[this._toolbar_type];

		if (this._calculateDepth() === 0) {
			if (currentToolbar) { map.removeLayer(currentToolbar); }
			map._toolbars[this._toolbar_type] = this;
		}
	},

	onRemove: function(map) {
		/* 
		 * TODO: Cleanup event listeners. 
		 * For some reason, this throws:
		 * "Uncaught TypeError: Cannot read property 'dragging' of null"
		 * on this._marker when a toolbar icon is clicked.
		 */
		// for (var i = 0, l = this._disabledEvents.length; i < l; i++) {
		// 	L.DomEvent.off(this._ul, this._disabledEvents[i], L.DomEvent.stopPropagation);
		// }

		if (this._calculateDepth() === 0) {
			delete map._toolbars[this._toolbar_type];
		}
	},

	appendToContainer: function(container) {
		var baseClass = this.constructor.baseClass + '-' + this._calculateDepth(),
			className = baseClass + ' ' + this.options.className,
			Action, action,
			i, j, l, m;

		this._container = container;
		this._ul = L.DomUtil.create('ul', className, container);

		// Ensure that clicks, drags, etc. don't bubble up to the map.
		// These are the map events that the L.Draw.Polyline handler listens for.
		// Note that L.Draw.Polyline listens to 'mouseup', not 'mousedown', but
		// if only 'mouseup' is silenced, then the map gets stuck in a halfway
		// state because it receives a 'mousedown' event and is waiting for the
		// corresponding 'mouseup' event.
		this._disabledEvents = [
			'click', 'mousemove', 'dblclick',
			'mousedown', 'mouseup', 'touchstart'
		];

		for (j = 0, m = this._disabledEvents.length; j < m; j++) {
			L.DomEvent.on(this._ul, this._disabledEvents[j], L.DomEvent.stopPropagation);
		}

		/* Instantiate each toolbar action and add its corresponding toolbar icon. */
		for (i = 0, l = this.options.actions.length; i < l; i++) {
			Action = this._getActionConstructor(this.options.actions[i]);

			action = new Action();
			action._createIcon(this, this._ul, this._arguments);
		}
	},

	_getActionConstructor: function(Action) {
		var args = this._arguments,
			toolbar = this;

		return Action.extend({
			initialize: function() {
				Action.prototype.initialize.apply(this, args);
			},
			enable: function(e) {
				/* Ensure that only one action in a toolbar will be active at a time. */
				if (toolbar._active) { toolbar._active.disable(); }
				toolbar._active = this;

				Action.prototype.enable.call(this, e);
			}
		});
	},

	/* Used to hide subToolbars without removing them from the map. */
	_hide: function() {
		this._ul.style.display = 'none';
	},

	/* Used to show subToolbars without removing them from the map. */
	_show: function() {
		this._ul.style.display = 'block';
	},

	_calculateDepth: function() {
		var depth = 0,
			toolbar = this.parentToolbar;

		while (toolbar) {
			depth += 1;
			toolbar = toolbar.parentToolbar;
		}

		return depth;
	}
});

// L.Mixin.Events is replaced by L.Evented in Leaflet 1.0. L.Layer (also
// introduced in Leaflet 1.0) inherits from L.Evented, so if L.Layer is
// present, then LeafletToolbar will already support events.
if (!L.Evented) {
    LeafletToolbar.include(L.Mixin.Events);
}

L.toolbar = {};

var toolbar_class_id = 0;

LeafletToolbar.extend = function extend(props) {
	var statics = L.extend({}, props.statics, {
		"_toolbar_class_id": toolbar_class_id
	});

	toolbar_class_id += 1;
	L.extend(props, { statics: statics });

	return L.Class.extend.call(this, props);
};

L.Map.addInitHook(function() {
	this._toolbars = {};
});

LeafletToolbar.ToolbarAction = L.Handler.extend({
	statics: {
		baseClass: 'leaflet-toolbar-icon'
	},

	options: {
		toolbarIcon: {
			html: '',
			className: '',
			tooltip: ''
		},
		subToolbar: new LeafletToolbar()
	},

	initialize: function(options) {
		var defaultIconOptions = LeafletToolbar.ToolbarAction.prototype.options.toolbarIcon;

		L.setOptions(this, options);
		this.options.toolbarIcon = L.extend({}, defaultIconOptions, this.options.toolbarIcon);
	},

	enable: function(e) {
		if (e) { L.DomEvent.preventDefault(e); }
		if (this._enabled) { return; }
		this._enabled = true;

		if (this.addHooks) { this.addHooks(); }
	},

	disable: function() {
		if (!this._enabled) { return; }
		this._enabled = false;

		if (this.removeHooks) { this.removeHooks(); }
	},

	_createIcon: function(toolbar, container, args) {
		var iconOptions = this.options.toolbarIcon;

		this.toolbar = toolbar;
		this._icon = L.DomUtil.create('li', '', container);
		this._link = L.DomUtil.create('a', '', this._icon);

		this._link.innerHTML = iconOptions.html;
		this._link.setAttribute('href', '#');
		this._link.setAttribute('title', iconOptions.tooltip);

		L.DomUtil.addClass(this._link, this.constructor.baseClass);
		if (iconOptions.className) {
			L.DomUtil.addClass(this._link, iconOptions.className);
		}

		L.DomEvent.on(this._link, 'click', this.enable, this);

		/* Add secondary toolbar */
		this._addSubToolbar(toolbar, this._icon, args);
	},

	_addSubToolbar: function(toolbar, container, args) {
		var subToolbar = this.options.subToolbar,
			addHooks = this.addHooks,
			removeHooks = this.removeHooks;

		/* For calculating the nesting depth. */
		subToolbar.parentToolbar = toolbar;

		if (subToolbar.options.actions.length > 0) {
			/* Make a copy of args so as not to pollute the args array used by other actions. */
			args = [].slice.call(args);
			args.push(this);

			subToolbar.addTo.apply(subToolbar, args);
			subToolbar.appendToContainer(container);

			this.addHooks = function(map) {
				if (typeof addHooks === 'function') { addHooks.call(this, map); }
				subToolbar._show();
			};

			this.removeHooks = function(map) {
				if (typeof removeHooks === 'function') { removeHooks.call(this, map); }
				subToolbar._hide();
			};
		}
	}
});

L.toolbarAction = function toolbarAction(options) {
	return new LeafletToolbar.ToolbarAction(options);
};

LeafletToolbar.ToolbarAction.extendOptions = function(options) {
	return this.extend({ options: options });
};

LeafletToolbar.Control = LeafletToolbar.extend({
	statics: {
		baseClass: 'leaflet-control-toolbar ' + LeafletToolbar.baseClass
	},

	initialize: function(options) {
		LeafletToolbar.prototype.initialize.call(this, options);

		this._control = new L.Control.Toolbar(this.options);
	},

	onAdd: function(map) {
		this._control.addTo(map);

		LeafletToolbar.prototype.onAdd.call(this, map);

		this.appendToContainer(this._control.getContainer());
	},

	onRemove: function(map) {
		LeafletToolbar.prototype.onRemove.call(this, map);
		if (this._control.remove) {this._control.remove();}  // Leaflet 1.0
		else {this._control.removeFrom(map);}
	}
});

L.Control.Toolbar = L.Control.extend({
	onAdd: function() {
		return L.DomUtil.create('div', '');
	}
});

L.toolbar.control = function(options) {
    return new LeafletToolbar.Control(options);
};

// A convenience class for built-in popup toolbars.

LeafletToolbar.Popup = LeafletToolbar.extend({
	statics: {
		baseClass: 'leaflet-popup-toolbar ' + LeafletToolbar.baseClass
	},

	options: {
		anchor: [0, 0]
	},

	initialize: function(latlng, options) {
		LeafletToolbar.prototype.initialize.call(this, options);

		/* 
		 * Developers can't pass a DivIcon in the options for LeafletToolbar.Popup
		 * (the use of DivIcons is an implementation detail which may change).
		 */
		this._marker = new L.Marker(latlng, {
			icon : new L.DivIcon({
				className: this.options.className,
				iconAnchor: [0, 0]
			})
		});
	},

	onAdd: function(map) {
		this._map = map;
		this._marker.addTo(map);

		LeafletToolbar.prototype.onAdd.call(this, map);

		this.appendToContainer(this._marker._icon);

		this._setStyles();
	},

	onRemove: function(map) {
		map.removeLayer(this._marker);

		LeafletToolbar.prototype.onRemove.call(this, map);

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._marker.setLatLng(latlng);

		return this;
	},

	_setStyles: function() {
		var container = this._container,
			toolbar = this._ul,
			anchor = L.point(this.options.anchor),
			icons = toolbar.querySelectorAll('.leaflet-toolbar-icon'),
			buttonHeights = [],
			toolbarWidth = 0,
			toolbarHeight,
			tipSize,
			tipAnchor;
		/* Calculate the dimensions of the toolbar. */
		for (var i = 0, l = icons.length; i < l; i++) {
			if (icons[i].parentNode.parentNode === toolbar) {
				buttonHeights.push(parseInt(L.DomUtil.getStyle(icons[i], 'height'), 10));
				toolbarWidth += Math.ceil(parseFloat(L.DomUtil.getStyle(icons[i], 'width')));
				toolbarWidth += Math.ceil(parseFloat(L.DomUtil.getStyle(icons[i], 'border-right-width')));
			}
		}
		toolbar.style.width = toolbarWidth + 'px';

		/* Create and place the toolbar tip. */
		this._tipContainer = L.DomUtil.create('div', 'leaflet-toolbar-tip-container', container);
		this._tipContainer.style.width = toolbarWidth +
			Math.ceil(parseFloat(L.DomUtil.getStyle(toolbar, 'border-left-width'))) +
			'px';

		this._tip = L.DomUtil.create('div', 'leaflet-toolbar-tip', this._tipContainer);

		/* Set the tipAnchor point. */
		toolbarHeight = Math.max.apply(undefined, buttonHeights);
		// Ensure that the border completely surrounds its relative-positioned children.
		toolbar.style.height = toolbarHeight + 'px';
		tipSize = parseInt(L.DomUtil.getStyle(this._tip, 'width'), 10);
        // The tip should be anchored exactly where the click event was received.
		tipAnchor = new L.Point(toolbarWidth/2, toolbarHeight + 1.414*tipSize);

		/* The anchor option allows app developers to adjust the toolbar's position. */
		container.style.marginLeft = (anchor.x - tipAnchor.x) + 'px';
		container.style.marginTop = (anchor.y - tipAnchor.y) + 'px';
	},
});

L.toolbar.popup = function(options) {
    return new LeafletToolbar.Popup(options);
};


})(window, document);