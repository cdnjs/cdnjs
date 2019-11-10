(function(window, document, undefined) {

"use strict";

L.Toolbar = L.Class.extend({
	statics: {
		baseClass: 'leaflet-toolbar'
	},

	includes: L.Mixin.Events,

	options: {
		className: '',
		filter: function() { return true; },
		actions: []
	},

	initialize: function(options) {
		L.setOptions(this, options);
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);

		return this;
	},

	onAdd: function() {},

	appendToContainer: function(container) {
		var baseClass = this.constructor.baseClass + '-' + this._calculateDepth(),
			className = baseClass + ' ' + this.options.className,
			l = this.options.actions.length,
			Action, action,
			i;

		this._container = container;
		this._ul = L.DomUtil.create('ul', className, container);

		L.DomEvent.on(this._ul, 'click', L.DomEvent.stopPropagation);

		for (i = 0; i < l; i++) {
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
			enable: function() {
				/* Ensure that only one action in a toolbar will be active at a time. */
				if (toolbar._active) { toolbar._active.disable(); }
				toolbar._active = this;

				Action.prototype.enable.call(this);
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
L.ToolbarAction = L.Handler.extend({
	statics: {
		baseClass: 'leaflet-toolbar-icon'
	},

	options: {
		toolbarIcon: {
			html: '',
			className: '',
			tooltip: ''
		},
		subToolbar: new L.Toolbar()
	},

	initialize: function(options) {
		var defaultIconOptions = L.ToolbarAction.prototype.options.toolbarIcon;

		L.setOptions(this, options);
		this.options.toolbarIcon = L.extend({}, defaultIconOptions, this.options.toolbarIcon);
	},

	enable: function() {
		var subToolbar = this.options.subToolbar;

		if (this._enabled) { return; }
		this._enabled = true;

		if (this.addHooks) { this.addHooks(); }

		if (subToolbar.options.actions.length > 0) {
			subToolbar._show();
		}
	},

	disable: function() {
		var subToolbar = this.options.subToolbar;

		if (!this._enabled) { return; }
		this._enabled = false;

		if (this.removeHooks) { this.removeHooks(); }

		if (subToolbar.options.actions.length > 0) {
			subToolbar._hide();
		}
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
		var subToolbar = this.options.subToolbar;

		/* For calculating the nesting depth. */
		subToolbar.parentToolbar = toolbar;

		if (subToolbar.options.actions.length > 0) {
			/* Make a copy of args so as not to pollute the args array used by other actions. */
			args = [].slice.call(args);
			args.push(this);
			
			subToolbar.addTo.apply(subToolbar, args);
			subToolbar.appendToContainer(container);
		}
	}
});

L.ToolbarAction.extendOptions = function(options) {
	return this.extend({ options: options });
};
L.Toolbar.Control = L.Toolbar.extend({
	statics: {
		baseClass: 'leaflet-control-toolbar ' + L.Toolbar.baseClass
	},

	initialize: function(options) {
		L.Toolbar.prototype.initialize.call(this, options);

		this._control = new L.Control.Toolbar(this.options);
	},

	onAdd: function(map) {
		this._control.addTo(map);

		this.appendToContainer(this._control.getContainer());
	},

	onRemove: function(map) {
		this._control.removeFrom(map);
	}
});

L.Control.Toolbar = L.Control.extend({
	onAdd: function() {
		return L.DomUtil.create('div', '');
	}
});
// A convenience class for built-in popup toolbars.

L.Toolbar.Popup = L.Toolbar.extend({
	statics: {
		baseClass: 'leaflet-popup-toolbar ' + L.Toolbar.baseClass
	},

	initialize: function(latlng, options) {
		L.Toolbar.prototype.initialize.call(this, options);

		var	toolbarOptions = L.extend(this.options, {
				icon: new L.DivIcon({
					html: '',
					className: this.options.className
				})
			});

		this._marker = new L.Marker(latlng, toolbarOptions);
	},

	onAdd: function(map) {
		this._map = map;
		this._marker.addTo(map);

		this.appendToContainer(this._marker._icon);

		this._setStyles();
	},

	onRemove: function(map) {
		map.removeLayer(this._marker);

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._marker.setLatLng(latlng);

		return this;
	},

	_setStyles: function() {
		var container = this._container,
			toolbar = this._ul,
			icons = toolbar.querySelectorAll('.leaflet-toolbar-icon'),
			buttonHeights = [],
			toolbarWidth = 0,
			toolbarHeight,
			tipSize,
			anchor;

		/* Calculate the dimensions of the toolbar. */
		for (var i = 0, l = icons.length; i < l; i++) {
			if (icons[i].parentNode.parentNode === toolbar) {
				buttonHeights.push(parseInt(L.DomUtil.getStyle(icons[i], 'height'), 10));
				toolbarWidth += Math.ceil(parseFloat(L.DomUtil.getStyle(icons[i], 'width')));
			}
		}
		toolbar.style.width = toolbarWidth + 'px';

		/* Create and place the toolbar tip. */
		this._tipContainer = L.DomUtil.create('div', 'leaflet-toolbar-tip-container', container);
		this._tipContainer.style.width = toolbarWidth + 'px';

		this._tip = L.DomUtil.create('div', 'leaflet-toolbar-tip', this._tipContainer);

		/* Set the anchor point. */
		toolbarHeight = Math.max.apply(undefined, buttonHeights);
		tipSize = parseInt(L.DomUtil.getStyle(this._tip, 'width'), 10);

		anchor = new L.Point(toolbarWidth/2, toolbarHeight + 0.7071*tipSize);

		container.style.marginLeft = (-anchor.x) + 'px';
		container.style.marginTop = (-anchor.y) + 'px';
	}
});

})(window, document);