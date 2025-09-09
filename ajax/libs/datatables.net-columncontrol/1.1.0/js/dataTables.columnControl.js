/*! ColumnControl 1.1.0
 * Copyright (c) SpryMedia Ltd - datatables.net/license
 *
 * SVG icons: ISC License
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT).
 * All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net')(root, $);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;



function createElement(type, classes, text, children) {
    if (classes === void 0) { classes = []; }
    if (text === void 0) { text = null; }
    if (children === void 0) { children = []; }
    var el = document.createElement(type);
    addClass(el, classes);
    if (text) {
        el.innerHTML = text;
    }
    children.forEach(function (child) {
        el.appendChild(child);
    });
    return el;
}
function addClass(el, classes) {
    if (!classes) {
        return;
    }
    if (!Array.isArray(classes)) {
        classes = [classes];
    }
    classes.forEach(function (className) {
        if (el && className) {
            el.classList.add(className);
        }
    });
}

// The SVG for many of these icons are from Lucide ( https://lucide.dev ), which are available
// under the ISC License. There are a number of custom icons as well. These are optimised through
// https://optimize.svgomg.net/
function wrap(paths) {
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        paths +
        '</svg>');
}
var icons = {
    chevronRight: wrap('<path d="m9 18 6-6-6-6"/>'),
    // columns-3
    columns: wrap('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/>'),
    // Custom
    contains: wrap('<path d="M10 3h4v18h-4z"/><path d="M18 8h3v9h-3"/><path d="M6 17H3V8h3"/>'),
    empty: wrap('<circle cx="12" cy="12" r="10"/>'),
    ends: wrap('<path d="M21 3h-4v18h4z"/><path d="M13 8H3v9h10"/>'),
    // Customised
    equal: wrap('<line x1="5" x2="19" y1="9" y2="9"/><line x1="5" x2="19" y1="15" y2="15"/>'),
    greater: wrap('<path d="m9 18 6-6-6-6"/>'),
    // Custom
    greaterOrEqual: wrap('<path d="m9 16 6-6-6-6"/><path d="m9 21 6-6"/>'),
    // Custom
    groupAdd: wrap('<path d="M6 21v-7.5m-3.549 3.75H9.75"/><rect width="13.5" height="7.5" x="3" y="3" rx="1.5"/><rect width="7.5" height="7.5" x="13.5" y="13.5" fill="currentColor" rx="1.5"/>'),
    // Custom
    groupClear: wrap('<rect width="13.5" height="7.5" x="3" y="3" rx="1.5"/><rect width="7.5" height="7.5" x="13.5" y="13.5" rx="1.5"/>'),
    // Custom
    groupTop: wrap('<rect width="13.5" height="7.5" x="3" y="3" fill="currentColor" rx="1.5"/><rect width="7.5" height="7.5" x="13.5" y="13.5" rx="1.5"/>'),
    // Custom
    groupRemove: wrap('<path d="M2.451 17.25H9.75"/><rect width="13.5" height="7.5" x="3" y="3" rx="1.5"/><rect width="7.5" height="7.5" x="13.5" y="13.5" rx="1.5"/>'),
    less: wrap('<path d="m15 18-6-6 6-6"/>'),
    // Custom
    lessOrEqual: wrap('<path d="m15 16-6-6 6-6"/><path d="m15 21-6-6"/>'),
    menu: wrap('<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>'),
    // move-horizontal
    move: wrap('<line x1="12" x2="12" y1="3" y2="21"/><polyline points="8 8 4 12 8 16"/><polyline points="16 16 20 12 16 8"/>'),
    // arrow-left-from-line
    moveLeft: wrap('<path d="m9 6-6 6 6 6"/><path d="M3 12h14"/><path d="M21 19V5"/>'),
    // arrow-right-from-line
    moveRight: wrap('<path d="M3 5v14"/><path d="M21 12H7"/><path d="m15 18 6-6-6-6"/>'),
    // Custom
    notContains: wrap('<path d="M15 4 9 20"/><path d="M3 8h18v9H3z"/>'),
    notEmpty: wrap('<circle cx="12" cy="12" r="10"/><line x1="9" x2="15" y1="15" y2="9"/>'),
    notEqual: wrap('<path d="M5 9h14"/><path d="M5 15h14"/><path d="M15 5 9 19"/>'),
    // Custom
    orderAddAsc: wrap('<path d="M17 21v-8"/><path d="M3 4h6"/><path d="M3 8h9"/><path d="M3 12h10"/><path d="M13 17h8"/>'),
    // Custom
    orderAddDesc: wrap('<path d="M17 21v-8"/><path d="M3 4h12"/><path d="M3 8h9"/><path d="M3 12h6"/><path d="M13 17h8"/>'),
    orderAsc: wrap('<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/>'),
    // Custom
    orderClear: wrap('<path d="m21 21-8-8"/><path d="M3 4h12"/><path d="M3 8h9"/><path d="M3 12h6"/><path d="m13 21 8-8"/>'),
    orderDesc: wrap('<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/>'),
    // Custom
    orderRemove: wrap('<path d="M3 4h12"/><path d="M3 8h9"/><path d="M3 12h6"/><path d="M13 17h8"/>'),
    // Custom
    orderNone: wrap('<path d="m3 8 4-4 4 4"/><path d="m11 16-4 4-4-4"/><path d="M7 4v16"/><path d="M15 8h6"/><path d="M15 16h6"/><path d="M13 12h8"/>'),
    // search
    search: wrap('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
    // search-x
    searchClear: wrap('<path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
    // Custom
    starts: wrap('<path d="M3 3h4v18H3z"/><path d="M11 8h10v9H11"/>'),
    // tick
    tick: wrap('<path d="M20 6 9 17l-5-5"/>'),
    // x
    x: wrap('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>')
};

/**
 * Close all or only other dropdowns
 *
 * @param e Event or null to close all others
 */
function close(e) {
    if (e === void 0) { e = null; }
    document.querySelectorAll('div.dtcc-dropdown').forEach(function (el) {
        if (e === null || !el.contains(e.target)) {
            el._close();
            if (!e._closed) {
                e._closed = [];
            }
            e._closed.push(el);
        }
    });
}
function getContainer(dt, btn) {
    return btn.closest('div.dtfh-floatingparent') || dt.table().container();
}
/**
 * Position the dropdown relative to the button that activated it, with possible corrections
 * to make sure it is visible on the page.
 *
 * @param dropdown Dropdown element
 * @param dt Container DataTable
 * @param btn Button the dropdown emanates from
 */
function positionDropdown(dropdown, dt, btn) {
    var header = btn.closest('div.dt-column-header');
    var container = getContainer(dt, btn);
    var headerStyle = getComputedStyle(header);
    var dropdownWidth = dropdown.offsetWidth;
    var position = relativePosition(container, btn);
    var left, top;
    top = position.top + btn.offsetHeight;
    if (headerStyle.flexDirection === 'row-reverse') {
        // Icon is on the left of the header - align the left hand sides
        left = position.left;
    }
    else {
        // Icon is on the right of the header - align the right hand sides
        left = position.left - dropdownWidth + btn.offsetWidth;
    }
    // Corrections - don't extend past the DataTable to the left and right
    var containerWidth = container.offsetWidth;
    if (left + dropdownWidth > containerWidth) {
        left -= left + dropdownWidth - containerWidth;
    }
    if (left < 0) {
        left = 0;
    }
    dropdown.style.top = top + 'px';
    dropdown.style.left = left + 'px';
}
/**
 * Display the dropdown in the document
 *
 * @param dropdown Dropdown element
 * @param dt Container DataTable
 * @param btn Button the dropdown emanates from
 * @returns Function to call when the dropdown should be removed from the document
 */
function attachDropdown(dropdown, dt, btn) {
    var dtContainer = getContainer(dt, btn.element());
    dropdown._shown = true;
    dtContainer.append(dropdown);
    positionDropdown(dropdown, dt, btn.element());
    btn.element().setAttribute('aria-expanded', 'true');
    // Note that this could be called when the dropdown has already been removed from the document
    // via another dropdown being shown. This will clean up the event on the next body click.
    var removeDropdown = function (e) {
        // Not in document, so just clean up the event handler
        if (!dropdown._shown) {
            document.body.removeEventListener('click', removeDropdown);
            return;
        }
        // If the click is inside the dropdown, ignore it - we don't want to immediately close
        if (e.target === dropdown || dropdown.contains(e.target)) {
            return;
        }
        // If there is currently a datetime picker visible on the page, assume that it belongs to
        // this dropdown. Don't want to close while operating on the picker.
        var datetime = document.querySelector('div.dt-datetime');
        if (datetime && (e.target === datetime || datetime.contains(e.target))) {
            return;
        }
        dropdown._close();
        document.body.removeEventListener('click', removeDropdown);
    };
    document.body.addEventListener('click', removeDropdown);
    return removeDropdown;
}
/**
 * Get the position of an element, relative to a given parent. The origin MUST be under the
 * parent's tree.
 *
 * @param parent Parent element to get position relative to
 * @param origin Target element
 */
function relativePosition(parent, origin) {
    var top = 0;
    var left = 0;
    while (origin && origin !== parent && origin !== document.body) {
        top += origin.offsetTop;
        left += origin.offsetLeft;
        if (origin.scrollTop) {
            left -= origin.scrollTop;
        }
        if (origin.scrollLeft) {
            left -= origin.scrollLeft;
        }
        origin = origin.offsetParent;
    }
    return {
        top: top,
        left: left
    };
}
/**
 * Function that will provide the keyboard navigation for the dropdown
 *
 * @param dropdown Dropdown element in question
 * @returns Function that can be bound to `keypress`
 */
function focusCapture(dropdown, host) {
    return function (e) {
        // Do nothing if not shown
        if (!dropdown._shown) {
            return;
        }
        // Focus trap for tab key
        var elements = Array.from(dropdown.querySelectorAll('a, button, input, select'));
        var active = document.activeElement;
        // An escape key should close the dropdown
        if (e.key === 'Escape') {
            dropdown._close();
            host.focus(); // Restore focus to the host
            return;
        }
        else if (e.key !== 'Tab' || elements.length === 0) {
            // Anything other than tab we aren't interested in from here
            return;
        }
        if (!elements.includes(active)) {
            // If new focus is not inside the popover we want to drag it back in
            elements[0].focus();
            e.preventDefault();
        }
        else if (e.shiftKey) {
            // Reverse tabbing order when shift key is pressed
            if (active === elements[0]) {
                elements[elements.length - 1].focus();
                e.preventDefault();
            }
        }
        else {
            if (active === elements[elements.length - 1]) {
                elements[0].focus();
                e.preventDefault();
            }
        }
    };
}
var dropdownContent = {
    classes: {
        container: 'dtcc-dropdown',
        liner: 'dtcc-dropdown-liner'
    },
    defaults: {
        className: 'dropdown',
        content: [],
        icon: 'menu',
        text: 'More...'
    },
    init: function (config) {
        var dt = this.dt();
        var dropdown = createElement('div', dropdownContent.classes.container, '', [
            createElement('div', dropdownContent.classes.liner)
        ]);
        dropdown._shown = false;
        dropdown._close = function () {
            dropdown.remove();
            dropdown._shown = false;
            btn.element().setAttribute('aria-expanded', 'false');
        };
        dropdown.setAttribute('role', 'dialog');
        dropdown.setAttribute('aria-label', dt.i18n('columnControl.dropdown', config.text));
        // When FixedHeader is used, the transition between states messes up positioning, so if
        // shown we just reattach the dropdown.
        dt.on('fixedheader-mode', function () {
            if (dropdown._shown) {
                attachDropdown(dropdown, dt, config._parents ? config._parents[0] : btn);
            }
        });
        // A liner element allows more styling options, so the contents go inside this
        var liner = dropdown.childNodes[0];
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.dropdown', config.text))
            .icon(config.icon)
            .className(config.className)
            .dropdownDisplay(liner)
            .handler(function (e) {
            // Do nothing if our dropdown was just closed as part of the event (i.e. allow
            // the button to toggle it closed)
            if (e._closed && e._closed.includes(dropdown)) {
                return;
            }
            attachDropdown(dropdown, dt, config._parents ? config._parents[0] : btn);
            // When activated using a key - auto focus on the first item in the popover
            var focusable = dropdown.querySelector('input, a, button');
            if (focusable && e.type === 'keypress') {
                focusable.focus();
            }
        });
        btn.element().setAttribute('aria-haspopup', 'dialog');
        btn.element().setAttribute('aria-expanded', 'false');
        // Add the content for the dropdown
        for (var i = 0; i < config.content.length; i++) {
            var content = this.resolve(config.content[i]);
            // For nested items we need to keep a reference to the top level so the sub-levels
            // can communicate back - e.g. active or positioned relative to that top level.
            if (!content.config._parents) {
                content.config._parents = [];
            }
            content.config._parents.push(btn);
            var el = content.plugin.init.call(this, content.config);
            liner.appendChild(el);
        }
        // For nested dropdowns, add an extra icon element to show that it will dropdown further
        if (config._parents && config._parents.length) {
            btn.extra('chevronRight');
        }
        // Reposition if needed
        dt.on('columns-reordered', function () {
            positionDropdown(dropdown, dt, btn.element());
        });
        // Focus capture events
        var capture = focusCapture(dropdown, btn.element());
        document.body.addEventListener('keydown', capture);
        dt.on('destroy', function () {
            document.body.removeEventListener('keydown', capture);
        });
        return btn.element();
    }
};

var _namespace = 0;
var Button = /** @class */ (function () {
    /**
     * Create a new button for use in ColumnControl contents. Buttons created by this class can be
     * used at the top level in the header or in a dropdown.
     */
    function Button(dt, host) {
        this._s = {
            active: false,
            activeList: [],
            buttonClick: null,
            dt: null,
            enabled: true,
            host: null,
            label: '',
            namespace: '',
            value: null
        };
        this._s.dt = dt;
        this._s.host = host;
        this._dom = {
            button: createElement('button', Button.classes.container),
            dropdownDisplay: null,
            extra: createElement('span', 'dtcc-button-extra'),
            icon: createElement('span', 'dtcc-button-icon'),
            state: createElement('span', 'dtcc-button-state'),
            text: createElement('span', 'dtcc-button-text')
        };
        this._dom.button.setAttribute('type', 'button');
        this._dom.button.append(this._dom.icon);
        this._dom.button.append(this._dom.text);
        this._dom.button.append(this._dom.state);
        this._dom.button.append(this._dom.extra);
        // Default state is enabled
        this.enable(true);
    }
    Button.prototype.active = function (active) {
        if (active === undefined) {
            return this._s.active;
        }
        this._s.active = active;
        this._checkActive();
        return this;
    };
    /**
     * A button can be marked as active by any of its sub-buttons (i.e. if it is a dropdown)
     * and each one needs to be able to enable this button without effecting the active state
     * trigged by any other sub-buttons. This method provides a way to do that.
     *
     * @param unique Unique id for the activate state
     * @param active If it is active
     * @returns Button instance
     */
    Button.prototype.activeList = function (unique, active) {
        this._s.activeList[unique] = active;
        this._checkActive();
        return this;
    };
    /**
     * Scan over the dropdown element looking for any visible content. If there isn't any then
     * we hide this button.
     *
     * @returns Button instance
     */
    Button.prototype.checkDisplay = function () {
        var visible = 0;
        var children = this._dom.dropdownDisplay.childNodes;
        for (var i = 0; i < children.length; i++) {
            // No need to getComputedStyle since if a button is hidden, it was done with JS writing
            // to style.display, so we can check against that.
            if (children[i].style.display !== 'none') {
                visible++;
            }
        }
        if (visible === 0) {
            this._dom.button.style.display = 'none';
        }
        return this;
    };
    /**
     * Set the class name for the button
     *
     * @param className Class name
     * @returns Button instance
     */
    Button.prototype.className = function (className) {
        this._dom.button.classList.add('dtcc-button_' + className);
        return this;
    };
    /**
     * Destroy the button, cleaning up event listeners
     */
    Button.prototype.destroy = function () {
        if (this._s.buttonClick) {
            this._dom.button.removeEventListener('click', this._s.buttonClick);
            this._dom.button.removeEventListener('keypress', this._s.buttonClick);
        }
        this._s.host.destroyRemove(this);
    };
    /**
     * Relevant for drop downs only. When a button in a dropdown is hidden, we might want to
     * hide the host button as well (if it has nothing else to show). For that we need to know
     * what the dropdown element is.
     *
     * @param el Element that can be used for telling us about drop down elements.
     * @returns Button instance
     */
    Button.prototype.dropdownDisplay = function (el) {
        this._dom.dropdownDisplay = el;
        return this;
    };
    /**
     * Get the DOM Button element to attach into the document
     *
     * @returns The Button element
     */
    Button.prototype.element = function () {
        return this._dom.button;
    };
    Button.prototype.enable = function (enable) {
        if (enable === undefined) {
            return this._s.enabled;
        }
        this._dom.button.classList.toggle('dtcc-button_disabled', !enable);
        this._s.enabled = enable;
        return this;
    };
    /**
     * Set the extra information icon
     *
     * @param icon Icon name
     * @returns Button instance
     */
    Button.prototype.extra = function (icon) {
        this._dom.extra.innerHTML = icon ? icons[icon] : '';
        return this;
    };
    /**
     * Set the event handler for when the button is activated
     *
     * @param fn Event handler
     * @returns Button instance
     */
    Button.prototype.handler = function (fn) {
        var _this = this;
        var buttonClick = function (e) {
            // Close any dropdowns which are already open
            close(e);
            // Stop bubbling to the DataTables default header, which  might still be enabled
            e.stopPropagation();
            e.preventDefault();
            if (_this._s.enabled) {
                fn(e);
            }
        };
        this._s.buttonClick = buttonClick;
        this._s.namespace = 'dtcc-' + _namespace++;
        this._dom.button.addEventListener('click', buttonClick);
        this._dom.button.addEventListener('keypress', buttonClick);
        this._s.host.destroyAdd(this);
        return this;
    };
    /**
     * Set the icon to display in the button
     *
     * @param icon Icon name
     * @returns Button instance
     */
    Button.prototype.icon = function (icon) {
        this._dom.icon.innerHTML = icon ? icons[icon] : '';
        return this;
    };
    Button.prototype.text = function (text) {
        if (text === undefined) {
            return this._s.label;
        }
        this._dom.text.innerHTML = text;
        this._s.label = text; // for fast retrieval
        this._dom.button.setAttribute('aria-label', text);
        return this;
    };
    Button.prototype.value = function (val) {
        if (val === undefined) {
            return this._s.value;
        }
        this._s.value = val;
        return this;
    };
    /**
     * Check if anything is making this button active
     *
     * @returns Self for chaining
     */
    Button.prototype._checkActive = function () {
        if (this._s.active === true || Object.values(this._s.activeList).includes(true)) {
            this._dom.state.innerHTML = icons.tick;
            this._dom.button.classList.add('dtcc-button_active');
        }
        else {
            this._dom.state.innerHTML = '';
            this._dom.button.classList.remove('dtcc-button_active');
        }
        return this;
    };
    Button.classes = {
        container: 'dtcc-button'
    };
    return Button;
}());

var CheckList = /** @class */ (function () {
    /**
     * Container for a list of buttons
     */
    function CheckList(dt, host, opts) {
        var _this = this;
        this._s = {
            buttons: [],
            dt: null,
            handler: function () { },
            host: null,
            search: ''
        };
        this._s.dt = dt;
        this._s.host = host;
        this._dom = {
            buttons: createElement('div', 'dtcc-list-buttons'),
            container: createElement('div', CheckList.classes.container),
            controls: createElement('div', 'dtcc-list-controls'),
            empty: createElement('div', 'dtcc-list-empty', dt.i18n('columnControl.list.empty', 'No options')),
            title: createElement('div', 'dtcc-list-title'),
            selectAll: createElement('button', 'dtcc-list-selectAll', dt.i18n('columnControl.list.all', 'Select all')),
            selectAllCount: createElement('span'),
            selectNone: createElement('button', 'dtcc-list-selectNone', dt.i18n('columnControl.list.none', 'Deselect')),
            selectNoneCount: createElement('span'),
            search: createElement('input', CheckList.classes.input)
        };
        var dom = this._dom;
        dom.search.setAttribute('type', 'text');
        dom.container.append(dom.title);
        dom.container.append(dom.controls);
        dom.container.append(dom.empty);
        dom.container.append(dom.buttons);
        if (opts.select) {
            dom.controls.append(dom.selectAll);
            dom.controls.append(dom.selectNone);
            dom.selectAll.append(dom.selectAllCount);
            dom.selectNone.append(dom.selectNoneCount);
            dom.selectAll.setAttribute('type', 'button');
            dom.selectNone.setAttribute('type', 'button');
        }
        // Events
        var searchInput = function () {
            _this._s.search = dom.search.value;
            _this._redraw();
        };
        var selectAllClick = function (e) {
            _this.selectAll();
            _this._s.handler(e, null, _this._s.buttons, true);
            _this._updateCount();
        };
        var selectNoneClick = function (e) {
            _this.selectNone();
            _this._s.handler(e, null, _this._s.buttons, true);
            _this._updateCount();
        };
        if (opts.search) {
            dom.controls.append(dom.search);
            dom.search.setAttribute('placeholder', dt.i18n('columnControl.list.search', 'Search...'));
            dom.search.addEventListener('input', searchInput);
        }
        dom.selectAll.addEventListener('click', selectAllClick);
        dom.selectNone.addEventListener('click', selectNoneClick);
        dt.on('destroy', function () {
            dom.selectAll.removeEventListener('click', selectAllClick);
            dom.selectNone.removeEventListener('click', selectNoneClick);
            dom.search.removeEventListener('input', searchInput);
        });
    }
    /**
     * Add one or more buttons to the list
     *
     * @param options Configuration for the button(s) to add
     * @returns Self for chaining
     */
    CheckList.prototype.add = function (options, update) {
        var _this = this;
        if (!Array.isArray(options)) {
            options = [options];
        }
        var _loop_1 = function (i) {
            var option = options[i];
            var btn = new Button(this_1._s.dt, this_1._s.host)
                .active(option.active || false)
                .handler(function (e) {
                _this._s.handler(e, btn, _this._s.buttons, true);
                _this._updateCount();
            })
                .icon(option.icon || '')
                .text(option.label !== ''
                ? option.label
                : this_1._s.dt.i18n('columnControl.list.empty', 'Empty'))
                .value(option.value);
            if (option.label === '') {
                btn.className('empty');
            }
            this_1._s.buttons.push(btn);
        };
        var this_1 = this;
        for (var i = 0; i < options.length; i++) {
            _loop_1(i);
        }
        var count = this._s.buttons.length;
        if (update === true || update === undefined) {
            this._dom.selectAllCount.innerHTML = count ? '(' + count + ')' : '';
            this._redraw();
        }
        return this;
    };
    /**
     * Find a button with a given value
     *
     * @param val Value to search for
     * @returns Found button
     */
    CheckList.prototype.button = function (val) {
        var buttons = this._s.buttons;
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].value() === val) {
                return buttons[i];
            }
        }
        return null;
    };
    /**
     * Remove all buttons from the list
     *
     * @returns Self for chaining
     */
    CheckList.prototype.clear = function () {
        // Clean up the buttons
        for (var i = 0; i < this._s.buttons.length; i++) {
            this._s.buttons[i].destroy();
        }
        // Then empty them out
        this._dom.buttons.replaceChildren();
        this._s.buttons.length = 0;
        return this;
    };
    /**
     * Get the DOM container element to attach into the document
     *
     * @returns Container
     */
    CheckList.prototype.element = function () {
        return this._dom.container;
    };
    /**
     * Set the event handler for what happens when a button is clicked
     *
     * @param fn Event handler
     */
    CheckList.prototype.handler = function (fn) {
        this._s.handler = fn;
        return this;
    };
    /**
     * Indicate that this is a search control and should listen for corresponding events
     *
     * @param dt DataTable instance
     * @param idx Column index
     */
    CheckList.prototype.searchListener = function (dt) {
        var _this = this;
        // Column control search clearing (column().columnControl.searchClear() method)
        dt.on('cc-search-clear', function (e, colIdx) {
            if (colIdx === _this._s.host.idx()) {
                _this.selectNone();
                _this._s.handler(e, null, _this._s.buttons, false);
                _this._s.search = '';
                _this._dom.search.value = '';
                _this._redraw();
                _this._updateCount();
            }
        });
        return this;
    };
    /**
     * Select all buttons
     *
     * @returns Self for chaining
     */
    CheckList.prototype.selectAll = function () {
        for (var i = 0; i < this._s.buttons.length; i++) {
            this._s.buttons[i].active(true);
        }
        return this;
    };
    /**
     * Deselect all buttons
     *
     * @returns Self for chaining
     */
    CheckList.prototype.selectNone = function () {
        for (var i = 0; i < this._s.buttons.length; i++) {
            this._s.buttons[i].active(false);
        }
        return this;
    };
    /**
     * Set the list's title
     *
     * @param title Display title
     * @returns Button instance
     */
    CheckList.prototype.title = function (title) {
        this._dom.title.innerHTML = title;
        return this;
    };
    CheckList.prototype.values = function (values) {
        var i;
        var result = [];
        var buttons = this._s.buttons;
        if (values !== undefined) {
            for (i = 0; i < buttons.length; i++) {
                if (values.includes(buttons[i].value())) {
                    buttons[i].active(true);
                }
            }
            this._updateCount();
            return this;
        }
        for (i = 0; i < buttons.length; i++) {
            if (buttons[i].active()) {
                result.push(buttons[i].value());
            }
        }
        return result;
    };
    /**
     * Update the deselect counter
     */
    CheckList.prototype._updateCount = function () {
        var count = this.values().length;
        this._dom.selectNoneCount.innerHTML = count ? '(' + count + ')' : '';
    };
    /**
     * Add the buttons to the page - taking into account filtering
     */
    CheckList.prototype._redraw = function () {
        var buttons = this._s.buttons;
        var el = this._dom.buttons;
        var searchTerm = this._s.search.toLowerCase();
        el.replaceChildren();
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            if (!searchTerm ||
                btn
                    .text()
                    .toLowerCase()
                    .includes(searchTerm)) {
                el.appendChild(btn.element());
            }
        }
        this._dom.empty.style.display = buttons.length === 0 ? 'block' : 'none';
        el.style.display = buttons.length > 0 ? 'block' : 'none';
    };
    CheckList.classes = {
        container: 'dtcc-list',
        input: 'dtcc-list-search'
    };
    return CheckList;
}());

var colVis = {
    defaults: {
        className: 'colVis',
        columns: '',
        search: false,
        select: false,
        title: 'Column visibility'
    },
    init: function (config) {
        var dt = this.dt();
        var checkList = new CheckList(dt, this, {
            search: config.search,
            select: config.select
        })
            .title(dt.i18n('columnControl.colVis', config.title))
            .handler(function (e, btn, buttons) {
            if (btn) {
                btn.active(!btn.active());
            }
            apply(buttons);
        });
        // Need to apply in a loop to allow for select all / select none
        var apply = function (buttons) {
            for (var i = 0; i < buttons.length; i++) {
                var btn = buttons[i];
                var idx = btn.value();
                var col = dt.column(idx);
                if (btn.active() && !col.visible()) {
                    col.visible(true);
                }
                else if (!btn.active() && col.visible()) {
                    col.visible(false);
                }
            }
        };
        var rebuild = function () {
            var columns = dt.columns(config.columns);
            columns.every(function () {
                checkList.add({
                    active: this.visible(),
                    label: this.title(),
                    value: this.index()
                });
            });
        };
        rebuild();
        dt.on('column-visibility', function (e, s, colIdx, state) {
            var btn = checkList.button(colIdx);
            if (btn) {
                btn.active(state);
            }
        });
        dt.on('columns-reordered', function (e, details) {
            checkList.clear();
            rebuild();
        });
        return checkList.element();
    }
};

var colVisDropdown = {
    defaults: {
        className: 'colVis',
        columns: '',
        search: false,
        select: false,
        text: 'Column visibility',
        title: 'Column visibility'
    },
    extend: function (config) {
        var dt = this.dt();
        return {
            extend: 'dropdown',
            icon: 'columns',
            text: dt.i18n('columnControl.colVisDropdown', config.text),
            content: [
                Object.assign(config, {
                    extend: 'colVis'
                })
            ]
        };
    }
};

var reorder = {
    defaults: {
        className: 'reorder',
        icon: 'move',
        text: 'Reorder columns'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.reorder', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            var idx = _this.idx();
            if (idx > 0) {
                dt.colReorder.move(idx, idx - 1);
            }
        });
        if (this.idx() === 0) {
            btn.enable(false);
        }
        dt.on('columns-reordered', function (e, details) {
            btn.enable(_this.idx() > 0);
        });
        // If ColReorder wasn't initialised on this DataTable, then we need to add it
        if (!dt.init().colReorder) {
            new DataTable.ColReorder(dt, {});
        }
        return btn.element();
    }
};

var reorderLeft = {
    defaults: {
        className: 'reorderLeft',
        icon: 'moveLeft',
        text: 'Move column left'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.reorderLeft', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            var idx = _this.idx();
            // TODO account for visibility
            if (idx > 0) {
                dt.colReorder.move(idx, idx - 1);
            }
        });
        if (this.idx() === 0) {
            btn.enable(false);
        }
        dt.on('columns-reordered', function (e, details) {
            btn.enable(_this.idx() > 0);
        });
        return btn.element();
    }
};

var reorderRight = {
    defaults: {
        className: 'reorderRight',
        icon: 'moveRight',
        text: 'Move column right'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.reorderRight', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            var idx = _this.idx();
            if (idx < dt.columns().count() - 1) {
                dt.colReorder.move(idx, idx + 1);
            }
        });
        if (this.idx() === dt.columns().count() - 1) {
            btn.enable(false);
        }
        dt.on('columns-reordered', function (e, details) {
            btn.enable(_this.idx() < dt.columns().count() - 1);
        });
        return btn.element();
    }
};

var order = {
    defaults: {
        className: 'order',
        iconAsc: 'orderAsc',
        iconDesc: 'orderDesc',
        iconNone: 'orderNone',
        statusOnly: false,
        text: 'Toggle ordering'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.order', config.text))
            .icon('orderAsc')
            .className(config.className);
        if (!config.statusOnly) {
            dt.order.listener(btn.element(), DataTable.versionCheck('2.3.2') ? function () { return [_this.idx()]; } : this.idx(), function () { });
        }
        dt.on('order', function (e, s, order) {
            var found = order.find(function (o) { return o.col === _this.idx(); });
            if (!found) {
                btn.active(false).icon(config.iconNone);
            }
            else if (found.dir === 'asc') {
                btn.active(true).icon(config.iconAsc);
            }
            else if (found.dir === 'desc') {
                btn.active(true).icon(config.iconDesc);
            }
        });
        return btn.element();
    }
};

var orderAddAsc = {
    defaults: {
        className: 'orderAddAsc',
        icon: 'orderAddAsc',
        text: 'Add Sort Ascending'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.orderAddAsc', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            var order = dt.order();
            order.push([_this.idx(), 'asc']);
            dt.draw();
        });
        dt.on('order', function (e, s, order) {
            var found = order.some(function (o) { return o.col === _this.idx(); });
            btn.enable(!found);
        });
        return btn.element();
    }
};

var orderAddDesc = {
    defaults: {
        className: 'orderAddDesc',
        icon: 'orderAddDesc',
        text: 'Add Sort Descending'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.orderAddDesc', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            var order = dt.order();
            order.push([_this.idx(), 'desc']);
            dt.draw();
        });
        dt.on('order', function (e, s, order) {
            var found = order.some(function (o) { return o.col === _this.idx(); });
            btn.enable(!found);
        });
        return btn.element();
    }
};

var orderAsc = {
    defaults: {
        className: 'orderAsc',
        icon: 'orderAsc',
        text: 'Sort Ascending'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.orderAsc', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            _this.dt()
                .order([
                {
                    idx: _this.idx(),
                    dir: 'asc'
                }
            ])
                .draw();
        });
        dt.on('order', function (e, s, order) {
            var found = order.some(function (o) { return o.col === _this.idx() && o.dir === 'asc'; });
            btn.active(found);
        });
        return btn.element();
    }
};

var orderClear = {
    defaults: {
        className: 'orderClear',
        icon: 'orderClear',
        text: 'Clear sort'
    },
    init: function (config) {
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.orderClear', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            dt.order([]).draw();
        });
        dt.on('order', function (e, s, order) {
            btn.enable(order.length > 0);
        });
        if (dt.order().length === 0) {
            btn.enable(false);
        }
        return btn.element();
    }
};

var orderDesc = {
    defaults: {
        className: 'orderDesc',
        icon: 'orderDesc',
        text: 'Sort Descending'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.orderDesc', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            _this.dt()
                .order([
                {
                    idx: _this.idx(),
                    dir: 'desc'
                }
            ])
                .draw();
        });
        dt.on('order', function (e, s, order) {
            var found = order.some(function (o) { return o.col === _this.idx() && o.dir === 'desc'; });
            btn.active(found);
        });
        return btn.element();
    }
};

var orderRemove = {
    defaults: {
        className: 'orderRemove',
        icon: 'orderRemove',
        text: 'Remove from sort'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.orderRemove', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            // Remove the current column from the ordering array, then reorder the table
            var order = dt.order();
            var idx = order.findIndex(function (o) { return o[0] === _this.idx(); });
            order.splice(idx, 1);
            dt.order(order).draw();
        });
        dt.on('order', function (e, s, order) {
            var found = order.some(function (o) { return o.col === _this.idx(); });
            btn.enable(found);
        });
        btn.enable(false);
        return btn.element();
    }
};

var orderStatus = {
    defaults: {
        className: 'order',
        iconAsc: 'orderAsc',
        iconDesc: 'orderDesc',
        iconNone: 'orderNone',
        statusOnly: true,
        text: 'Sort status'
    },
    extend: function (config) {
        return Object.assign(config, { extend: 'order' });
    }
};

/**
 * Add an item to the grouping structure
 *
 * @param dt DataTable API instance
 * @param dataSrc Grouping data point to add
 * @returns Grouping array
 */
function rowGroupAdd$1(dt, dataSrc) {
    var applied = rowGroupApplied(dt);
    var idx = applied.indexOf(dataSrc);
    if (idx === -1) {
        applied.push(dataSrc);
        dt.rowGroup().dataSrc(applied);
    }
    return applied;
}
/**
 * Always want an array return
 *
 * @param dt DataTable API instance
 * @returns
 */
function rowGroupApplied(dt) {
    var applied = dt.rowGroup().dataSrc();
    return Array.isArray(applied)
        ? applied
        : [applied];
}
/**
 * Remove all grouping
 *
 * @param dt DataTable API instance
 */
function rowGroupClear$1(dt) {
    dt.rowGroup().dataSrc([]);
}
/**
 * Remove an item from the grouping structure
 *
 * @param dt DataTable API instance
 * @param dataSrc Grouping data point to remove
 * @returns Grouping array
 */
function rowGroupRemove$1(dt, dataSrc) {
    var applied = rowGroupApplied(dt);
    var idx = applied.indexOf(dataSrc);
    if (idx !== -1) {
        applied.splice(idx, 1);
        dt.rowGroup().dataSrc(applied);
    }
    return applied;
}
var rowGroup = {
    defaults: {
        className: 'rowGroup',
        icon: 'groupTop',
        order: true,
        text: 'Group rows'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.rowGroup', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            var dataSrc = dt.column(_this.idx()).dataSrc();
            if (btn.active()) {
                // Grouping is active - remove
                rowGroupRemove$1(dt, dataSrc);
            }
            else {
                // No grouping by this column yet, set it
                rowGroupClear$1(dt);
                rowGroupAdd$1(dt, dataSrc);
                if (config.order !== false) {
                    dt.order([_this.idx(), 'asc']);
                }
            }
            dt.draw();
        });
        // Show as active when grouping is applied
        dt.on('rowgroup-datasrc', function () {
            var applied = rowGroupApplied(dt);
            var ours = dt.column(_this.idx()).dataSrc();
            btn.active(applied.includes(ours));
        });
        return btn.element();
    }
};

var rowGroupAdd = {
    defaults: {
        className: 'rowGroupAdd',
        icon: 'groupAdd',
        order: true,
        text: 'Add to grouping'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.rowGroup', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            var dataSrc = dt.column(_this.idx()).dataSrc();
            if (btn.enable()) {
                // No grouping by this column yet, add it
                rowGroupAdd$1(dt, dataSrc);
            }
            dt.draw();
        });
        // Show as active when grouping is applied
        dt.on('rowgroup-datasrc', function () {
            var applied = rowGroupApplied(dt);
            var ours = dt.column(_this.idx()).dataSrc();
            btn.enable(!applied.includes(ours));
        });
        return btn.element();
    }
};

var rowGroupClear = {
    defaults: {
        className: 'rowGroupClear',
        icon: 'groupClear',
        text: 'Clear all grouping'
    },
    init: function (config) {
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.rowGroup', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            rowGroupClear$1(dt);
            dt.draw();
        });
        // Show as active when any grouping is applied
        dt.on('rowgroup-datasrc', function () {
            btn.enable(rowGroupApplied(dt).length > 0);
        });
        // Default status
        btn.enable(rowGroupApplied(dt).length > 0);
        return btn.element();
    }
};

var rowGroupRemove = {
    defaults: {
        className: 'rowGroupRemove',
        icon: 'groupRemove',
        order: true,
        text: 'Remove from grouping'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.rowGroup', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            var dataSrc = dt.column(_this.idx()).dataSrc();
            if (btn.enable()) {
                // Grouping is active - remove
                rowGroupRemove$1(dt, dataSrc);
                dt.draw();
            }
        });
        // Show as active when grouping is applied
        dt.on('rowgroup-datasrc', function () {
            var applied = rowGroupApplied(dt);
            var ours = dt.column(_this.idx()).dataSrc();
            btn.enable(applied.includes(ours));
        });
        // Default disabled
        btn.enable(false);
        return btn.element();
    }
};

var SearchInput = /** @class */ (function () {
    /**
     * Create a container element, for consistent DOM structure and styling
     */
    function SearchInput(dt, idx) {
        var _this = this;
        this._type = 'text';
        this._sspTransform = null;
        this._sspData = {};
        this._dt = dt;
        this._idx = idx;
        this._dom = {
            clear: createElement('span', 'dtcc-search-clear', icons['x']),
            container: createElement('div', SearchInput.classes.container),
            typeIcon: createElement('div', 'dtcc-search-type-icon'),
            searchIcon: createElement('div', 'dtcc-search-icon', icons['search']),
            input: createElement('input', SearchInput.classes.input),
            inputs: createElement('div'),
            select: createElement('select', SearchInput.classes.select),
            title: createElement('div', 'dtcc-search-title')
        };
        var dom = this._dom;
        var originalIdx = idx;
        dom.input.setAttribute('type', 'text');
        dom.container.append(dom.title, dom.inputs);
        dom.inputs.append(dom.typeIcon, dom.select, dom.searchIcon, dom.clear, dom.input);
        // Listeners
        var inputInput = function () {
            _this.runSearch();
        };
        var selectInput = function () {
            dom.typeIcon.innerHTML = icons[dom.select.value];
            _this.runSearch();
        };
        var clearClick = function () {
            _this.clear();
        };
        dom.input.addEventListener('input', inputInput);
        dom.select.addEventListener('input', selectInput);
        dom.clear.addEventListener('click', clearClick);
        dt.on('destroy', function () {
            dom.input.removeEventListener('input', inputInput);
            dom.select.removeEventListener('input', selectInput);
            dom.clear.removeEventListener('click', clearClick);
        });
        // State handling - all components that use this class have the same state saving structure
        // so shared handling can be performed here.
        dt.on('stateSaveParams.DT', function (e, s, data) {
            if (!data.columnControl) {
                data.columnControl = {};
            }
            if (!data.columnControl[_this._idx]) {
                data.columnControl[_this._idx] = {};
            }
            data.columnControl[_this._idx].searchInput = {
                logic: dom.select.value,
                type: _this._type,
                value: dom.input.value
            };
        });
        dt.on('stateLoaded.DT', function (e, s, state) {
            _this._stateLoad(state);
        });
        // Same as for ColumnControl - reassign a column index if needed.
        dt.on('columns-reordered.DT', function (e, details) {
            _this._idx = dt.colReorder.transpose(originalIdx, 'fromOriginal');
        });
        // Column control search clearing (column().columnControl.searchClear() method)
        dt.on('cc-search-clear.DT', function (e, colIdx) {
            if (colIdx === _this._idx) {
                // Don't want an automatic redraw on this event
                _this._loadingState = true;
                _this.clear();
                _this._loadingState = false;
            }
        });
        // Data for server-side processing
        if (dt.page.info().serverSide) {
            dt.on('preXhr.DT', function (e, s, d) {
                if (!d.columns[_this._idx].columnControl) {
                    d.columns[_this._idx].columnControl = {};
                }
                var val = _this._dom.input.value;
                if (_this._sspTransform) {
                    val = _this._sspTransform(val);
                }
                d.columns[_this._idx].columnControl.search = Object.assign({
                    value: val,
                    logic: _this._dom.select.value,
                    type: _this._type
                }, _this._sspData);
            });
        }
    }
    /**
     * Add a class to the container
     *
     * @param name Class name to add
     * @returns Self for chaining
     */
    SearchInput.prototype.addClass = function (name) {
        this._dom.container.classList.add(name);
        return this;
    };
    /**
     * Clear any applied search
     *
     * @returns Self for chaining
     */
    SearchInput.prototype.clear = function () {
        this.set(this._dom.select.children[0].getAttribute('value'), '');
        return this;
    };
    /**
     * Set the clear icon feature can be used or not
     *
     * @param set Flag
     * @returns Self for chaining
     */
    SearchInput.prototype.clearable = function (set) {
        // Note there is no add here as it is added by default and never used after setup, so
        // no need.
        if (!set) {
            this._dom.clear.remove();
        }
        return this;
    };
    /**
     * Get the container element
     *
     * @returns The container element
     */
    SearchInput.prototype.element = function () {
        return this._dom.container;
    };
    /**
     * Get the HTML input element for this control
     *
     * @returns HTML Input element
     */
    SearchInput.prototype.input = function () {
        return this._dom.input;
    };
    /**
     * Set the list of options for the dropdown
     *
     * @param opts List of options
     * @returns Self for chaining
     */
    SearchInput.prototype.options = function (opts) {
        var select = this._dom.select;
        for (var i = 0; i < opts.length; i++) {
            select.add(new Option(opts[i].label, opts[i].value));
        }
        // Initial icon
        this._dom.typeIcon.innerHTML = icons[opts[0].value];
        return this;
    };
    /**
     * Set the placeholder attribute for the input element
     *
     * @param placeholder Placeholder string
     * @returns Self for chaining
     */
    SearchInput.prototype.placeholder = function (placeholder) {
        if (placeholder) {
            var columnTitle = this._dt.column(this._idx).title();
            this._dom.input.placeholder = placeholder.replace('[title]', columnTitle);
        }
        return this;
    };
    /**
     * Run the search method
     */
    SearchInput.prototype.runSearch = function () {
        var dom = this._dom;
        var isActive = dom.select.value === 'empty' ||
            dom.select.value === 'notEmpty' ||
            dom.input.value !== '';
        dom.container.classList.toggle('dtcc-search_active', isActive);
        if (this._search &&
            (this._lastValue !== dom.input.value || this._lastType !== dom.select.value)) {
            this._search(dom.select.value, dom.input.value, this._loadingState);
            this._lastValue = dom.input.value;
            this._lastType = dom.select.value;
        }
    };
    /**
     * Set the function that will be run when a search operation is required. Note that this can
     * trigger the function to run if there is a saved state.
     *
     * @param fn Search callback
     * @returns Self for chaining
     */
    SearchInput.prototype.search = function (fn) {
        this._search = fn;
        // If there is a saved state, load it now that set up is done.
        this._stateLoad(this._dt.state.loaded());
        return this;
    };
    /**
     * Set a value for the search input
     *
     * @param logic Logic type
     * @param val Value
     * @returns Self for chaining
     */
    SearchInput.prototype.set = function (logic, val) {
        var dom = this._dom;
        dom.input.value = val;
        dom.select.value = logic;
        dom.typeIcon.innerHTML = icons[dom.select.value];
        this.runSearch();
        return this;
    };
    /**
     * Set a function to transform the input value before SSP data submission
     *
     * @param fn Transform function
     * @returns Self for chaining
     */
    SearchInput.prototype.sspTransform = function (fn) {
        this._sspTransform = fn;
        return this;
    };
    /**
     * Set extra information to be send to the server for server-side processing
     *
     * @param data Data object
     * @returns Self for chaining
     */
    SearchInput.prototype.sspData = function (data) {
        this._sspData = data;
        return this;
    };
    /**
     * Set the text that will be shown as the title for the control
     *
     * @param text Set the title text
     * @returns Self for chaining
     */
    SearchInput.prototype.title = function (text) {
        if (text) {
            var columnTitle = this._dt.column(this._idx).title();
            this._dom.title.innerHTML = text.replace('[title]', columnTitle);
        }
        return this;
    };
    /**
     * Set the title attribute for the input element
     *
     * @param title Title attribute string
     * @returns Self for chaining
     */
    SearchInput.prototype.titleAttr = function (title) {
        if (title) {
            var columnTitle = this._dt.column(this._idx).title();
            this._dom.input.title = title.replace('[title]', columnTitle);
        }
        return this;
    };
    SearchInput.prototype.type = function (t) {
        this._type = t;
        return this;
    };
    /**
     * Load a DataTables state
     *
     * @param state State object being loaded
     */
    SearchInput.prototype._stateLoad = function (state) {
        var _a, _b;
        var dom = this._dom;
        var idx = this._idx;
        var loadedState = (_b = (_a = state === null || state === void 0 ? void 0 : state.columnControl) === null || _a === void 0 ? void 0 : _a[idx]) === null || _b === void 0 ? void 0 : _b.searchInput;
        if (loadedState) {
            // The search callback needs to know if we are loading an existing state or not
            // so it can determine if it needs to draw the table. If it was a user input, then
            // it redraws, if it was a state load, then there should be no redraw.
            this._loadingState = true;
            dom.select.value = loadedState.logic;
            dom.input.value = loadedState.value;
            dom.select.dispatchEvent(new Event('input'));
            this._loadingState = false;
        }
    };
    SearchInput.classes = {
        container: ['dtcc-content', 'dtcc-search'],
        input: '',
        select: ''
    };
    return SearchInput;
}());

var searchDateTime = {
    defaults: {
        clear: true,
        format: '',
        mask: '',
        placeholder: '',
        title: '',
        titleAttr: ''
    },
    init: function (config) {
        var _this = this;
        var fromPicker = false;
        var moment = DataTable.use('moment');
        var luxon = DataTable.use('luxon');
        var dt = this.dt();
        var i18nBase = 'columnControl.search.datetime.';
        var pickerFormat = '';
        var dataSrcFormat = '';
        var dateTime;
        var searchInput = new SearchInput(dt, this.idx())
            .type('date')
            .addClass('dtcc-searchDateTime')
            .sspTransform(function (val) { return toISO(val, pickerFormat, moment, luxon); })
            .sspData({ mask: config.mask })
            .clearable(config.clear)
            .placeholder(config.placeholder)
            .title(config.title)
            .titleAttr(config.titleAttr)
            .options([
            { label: dt.i18n(i18nBase + 'equal', 'Equals'), value: 'equal' },
            { label: dt.i18n(i18nBase + 'notEqual', 'Does not equal'), value: 'notEqual' },
            { label: dt.i18n(i18nBase + 'greater', 'After'), value: 'greater' },
            { label: dt.i18n(i18nBase + 'less', 'Before'), value: 'less' },
            { label: dt.i18n(i18nBase + 'empty', 'Empty'), value: 'empty' },
            { label: dt.i18n(i18nBase + 'notEmpty', 'Not empty'), value: 'notEmpty' }
        ])
            .search(function (searchType, searchTerm, loadingState) {
            // When SSP, don't apply a filter here, SearchInput will add to the submit data
            if (dt.page.info().serverSide) {
                if (!loadingState) {
                    dt.draw();
                }
                return;
            }
            var mask = config.mask;
            var column = dt.column(_this.idx());
            var search = searchTerm === ''
                ? ''
                : dateToNum(dateTime && fromPicker ? dateTime.val() : searchTerm.trim(), pickerFormat, moment, luxon, mask);
            if (searchType === 'empty') {
                column.search.fixed('dtcc', function (haystack) { return !haystack; });
            }
            else if (searchType === 'notEmpty') {
                column.search.fixed('dtcc', function (haystack) { return !!haystack; });
            }
            else if (column.search.fixed('dtcc') === '' && search === '') {
                // No change - don't do anything
                return;
            }
            else if (!search) {
                // Clear search
                column.search.fixed('dtcc', '');
            }
            else if (searchType === 'equal') {
                // Use a function for matching - weak typing
                // Note that the haystack in the search function is the rendered date - it
                // might need to be converted back to a date
                column.search.fixed('dtcc', function (haystack) {
                    return dateToNum(haystack, dataSrcFormat, moment, luxon, mask) == search;
                });
            }
            else if (searchType === 'notEqual') {
                column.search.fixed('dtcc', function (haystack) {
                    return dateToNum(haystack, dataSrcFormat, moment, luxon, mask) != search;
                });
            }
            else if (searchType === 'greater') {
                column.search.fixed('dtcc', function (haystack) {
                    return dateToNum(haystack, dataSrcFormat, moment, luxon, mask) > search;
                });
            }
            else if (searchType === 'less') {
                column.search.fixed('dtcc', function (haystack) {
                    return dateToNum(haystack, dataSrcFormat, moment, luxon, mask) < search;
                });
            }
            // If in a dropdown, set the parent levels as active
            if (config._parents) {
                config._parents.forEach(function (btn) {
                    return btn.activeList(_this.unique(), !!column.search.fixed('dtcc'));
                });
            }
            if (!loadingState) {
                column.draw();
            }
        });
        // Once data has been loaded we can run DateTime with the specified format
        dt.ready(function () {
            var DateTime = DataTable.use('datetime');
            dataSrcFormat = getFormat(dt, _this.idx());
            pickerFormat = config.format
                ? config.format
                : dataSrcFormat;
            if (DateTime) {
                dateTime = new DateTime(searchInput.input(), {
                    format: pickerFormat,
                    i18n: dt.settings()[0].oLanguage.datetime, // could be undefined
                    onChange: function () {
                        fromPicker = true;
                        searchInput.runSearch();
                        fromPicker = false;
                    }
                });
            }
        });
        return searchInput.element();
    }
};
/**
 * Determine the formatting string for the date time information in the colum
 *
 * @param dt DataTable instance
 * @param column Column index
 * @returns Date / time formatting string
 */
function getFormat(dt, column) {
    var type = dt.column(column).type();
    if (!type) {
        // Assume that it is ISO unless otherwise specified - that is all DataTables can do anyway
        return 'YYYY-MM-DD';
    }
    else if (type === 'datetime') {
        // If no format was specified in the DT type, a Javascript native toLocaleDateString
        // was used. Need to work out what that format is in Moment or Luxon. We need to pass
        // a known value though the renderer and work out the format
        var renderer = dt.settings()[0].aoColumns[column].mRender;
        var resultPm = renderer('1999-08-07T23:05:04Z', 'display');
        var resultAm = renderer('1999-08-07T03:05:04Z', 'display');
        var leadingZero = resultAm.includes('03');
        // What formatter are we using?
        if (DataTable.use('moment')) {
            return resultPm
                .replace('23', leadingZero ? 'HH' : 'H')
                .replace('11', leadingZero ? 'hh' : 'h')
                .replace('05', 'mm')
                .replace('04', 'ss')
                .replace('PM', 'A')
                .replace('pm', 'a')
                .replace('07', 'DD')
                .replace('7', 'D')
                .replace('08', 'MM')
                .replace('8', 'M')
                .replace('1999', 'YYYY')
                .replace('99', 'YY');
        }
        else if (DataTable.use('luxon')) {
            return resultPm
                .replace('23', leadingZero ? 'HH' : 'H')
                .replace('11', leadingZero ? 'hh' : 'h')
                .replace('05', 'mm')
                .replace('04', 'ss')
                .replace('PM', 'a')
                .replace('07', 'dd')
                .replace('7', 'd')
                .replace('08', 'MM')
                .replace('8', 'M')
                .replace('1999', 'yyyy')
                .replace('99', 'yy');
        }
        else if (resultPm.includes('23') && resultPm.includes('1999')) {
            return 'YYYY-MM-DD hh:mm:ss';
        }
        else if (resultPm.includes('23')) {
            return 'hh:mm:ss';
        }
        // fall through to final return
    }
    else if (type.includes('datetime-')) {
        // Column was specified with a particular display format - we can extract that format from
        // the type, as it is part of the type name.
        return type.replace(/datetime-/g, '');
    }
    else if (type.includes('moment')) {
        return type.replace(/moment-/g, '');
    }
    else if (type.includes('luxon')) {
        return type.replace(/luxon-/g, '');
    }
    return 'YYYY-MM-DD';
}
/**
 * Convert from a source date / time value (usually a string) to a timestamp for comparisons.
 *
 * @param input Input value
 * @param srcFormat String format of the input
 * @param moment Moment instance, if it is available
 * @param luxon Luxon object, if it is available
 * @returns Time stamp - milliseconds
 */
function dateToNum(input, srcFormat, moment, luxon, mask) {
    var d;
    if (input === '') {
        return '';
    }
    if (input instanceof Date) {
        d = input;
    }
    else if (srcFormat !== 'YYYY-MM-DD' && (moment || luxon)) {
        d = new Date(moment
            ? moment(input, srcFormat).unix() * 1000
            : luxon.DateTime.fromFormat(input, srcFormat).toMillis());
    }
    else {
        // new Date() with `/` separators will treat the input as local time, but with `-` it will
        // treat it as UTC. We want UTC so do a replacement
        d = new Date(input.replace(/\//g, '-'));
    }
    if (mask) {
        if (!mask.includes('YYYY')) {
            d.setFullYear(1970);
        }
        if (!mask.includes('MM')) {
            d.setUTCMonth(0);
        }
        if (!mask.includes('DD')) {
            d.setUTCDate(1);
        }
        if (!mask.includes('hh')) {
            d.setUTCHours(0);
        }
        if (!mask.includes('mm')) {
            d.setUTCMinutes(0);
        }
        if (!mask.includes('ss')) {
            // This will match milliseconds as well, but that's fine, you won't match mS but not S
            d.setUTCSeconds(0);
        }
        if (!mask.includes('sss')) {
            d.setUTCMilliseconds(0);
        }
    }
    return d.getTime();
}
/**
 * Convert an input string to an ISO formatted date
 *
 * @param input Input value
 * @param srcFormat String format of the input
 * @param moment Moment instance, if it is available
 * @param luxon Luxon object, if it is available
 * @returns Value in ISO
 */
function toISO(input, srcFormat, moment, luxon) {
    if (input === '') {
        return '';
    }
    else if (srcFormat !== 'YYYY-MM-DD' && moment) {
        // TODO Does it have a time component?
        return moment.utc(input, srcFormat).toISOString();
    }
    else if (srcFormat !== 'YYYY-MM-DD' && luxon) {
        // TODO Does it have a time component?
        return luxon.DateTime.fromFormat(input, srcFormat).toISO();
    }
    // new Date() with `/` separators will treat the input as local time, but with `-` it will
    // treat it as UTC. We want UTC so do a replacement
    input = input.replace(/\//g, '-');
    return input;
}

/** Set the options to show in the list */
function setOptions(checkList, opts) {
    var existing = checkList.values();
    checkList.clear();
    for (var i = 0; i < opts.length; i++) {
        if (typeof opts[i] === 'object') {
            checkList.add({
                active: false,
                label: opts[i].label,
                value: opts[i].value
            }, i === opts.length - 1);
        }
        else {
            checkList.add({
                active: false,
                label: opts[i],
                value: opts[i]
            }, i === opts.length - 1);
        }
    }
    if (existing.length) {
        checkList.values(existing);
    }
}
/** Load a saved state */
function getState(columnIdx, state) {
    var _a, _b;
    var loadedState = (_b = (_a = state === null || state === void 0 ? void 0 : state.columnControl) === null || _a === void 0 ? void 0 : _a[columnIdx]) === null || _b === void 0 ? void 0 : _b.searchList;
    if (loadedState) {
        return loadedState;
    }
}
/** Get the options for a column from a DT JSON object */
function getJsonOptions(dt, idx) {
    var _a;
    var json = (_a = dt.ajax.json()) === null || _a === void 0 ? void 0 : _a.columnControl;
    var column = dt.column(idx);
    var name = column.name();
    var dataSrc = column.dataSrc();
    if (json && json[name]) {
        // Found options matching the column's name - top priority
        return json[name];
    }
    else if (json && typeof dataSrc === 'string' && json[dataSrc]) {
        // Found options matching the column's data source string
        return json[dataSrc];
    }
    else if (json && json[idx]) {
        // Found options matching the column's data index
        return json[idx];
    }
    return null;
}
function reloadOptions(dt, config, idx, checkList, loadedValues) {
    var _a;
    // Was there options specified in the Ajax return?
    var json = (_a = dt.ajax.json()) === null || _a === void 0 ? void 0 : _a.columnControl;
    var options = [];
    var jsonOptions = getJsonOptions(dt, idx);
    if (jsonOptions) {
        options = jsonOptions;
    }
    else if (json && config.ajaxOnly) {
        if (config.hidable) {
            // Ajax only options - need to hide the search list
            checkList.element().style.display = 'none';
            // Check if the parent buttons should be hidden as well (they will be if there
            // is no visible content in them)
            if (config._parents) {
                config._parents.forEach(function (btn) { return btn.checkDisplay(); });
            }
        }
        // No point in doing any further processing here
        return;
    }
    else if (!dt.page.info().serverSide) {
        // Either no ajax object (i.e. not an Ajax table), or no matching ajax options
        // for this column - get the values for the column, taking into account
        // orthogonal rendering
        var found = {};
        var rows = dt.rows({ order: idx }).indexes().toArray();
        var settings = dt.settings()[0];
        for (var i = 0; i < rows.length; i++) {
            var raw = settings.fastData(rows[i], idx, 'filter');
            var filter = raw !== null && raw !== undefined
                ? raw.toString()
                : '';
            if (!found[filter]) {
                found[filter] = true;
                options.push({
                    label: settings.fastData(rows[i], idx, config.orthogonal),
                    value: filter
                });
            }
        }
    }
    setOptions(checkList, options);
    // If there was a state loaded at start up, then we need to set the visual
    // appearance to match
    if (loadedValues) {
        checkList.values(loadedValues);
    }
}
var searchList = {
    defaults: {
        ajaxOnly: true,
        className: 'searchList',
        hidable: true,
        options: null,
        orthogonal: 'display',
        search: true,
        select: true,
        title: ''
    },
    init: function (config) {
        var _this = this;
        var loadedValues = null;
        var dt = this.dt();
        // The search can be applied from a stored start at start up before the options are
        // available. It can also be applied by user input, so it is generalised into this function.
        var applySearch = function (values) {
            // When SSP, don't do any client-side filtering
            if (dt.page.info().serverSide) {
                return;
            }
            var col = dt.column(_this.idx());
            if (!values) {
                return;
            }
            else if (values.length === 0) {
                // Nothing selected - clear the filter
                col.search.fixed('dtcc-list', '');
            }
            else {
                // Find all matching options from the list of values
                col.search.fixed('dtcc-list', function (val) {
                    return values.includes(val);
                });
            }
            // If in a dropdown, set the parent levels as active
            if (config._parents) {
                config._parents.forEach(function (btn) { return btn.activeList(_this.unique(), !!values.length); });
            }
        };
        var checkList = new CheckList(dt, this, {
            search: config.search,
            select: config.select
        })
            .searchListener(dt)
            .title(dt
            .i18n('columnControl.searchList', config.title)
            .replace('[title]', dt.column(this.idx()).title()))
            .handler(function (e, btn, btns, redraw) {
            if (btn) {
                btn.active(!btn.active());
            }
            applySearch(checkList.values());
            if (redraw) {
                dt.draw();
            }
        });
        if (config.options) {
            setOptions(checkList, config.options);
        }
        else {
            dt.ready(function () {
                reloadOptions(dt, config, _this.idx(), checkList, loadedValues);
            });
            // Xhr event listener for updates of options
            dt.on('xhr', function (e, s, json) {
                // Need to wait for the draw to complete so the table has the latest data
                dt.one('draw', function () {
                    reloadOptions(dt, config, _this.idx(), checkList, loadedValues);
                });
            });
        }
        // Data for server-side processing
        if (dt.page.info().serverSide) {
            dt.on('preXhr.DT', function (e, s, d) {
                if (!d.columns[_this.idx()].columnControl) {
                    d.columns[_this.idx()].columnControl = {};
                }
                // We need the indexes in the HTTP parameter names (for .NET), so use an object.
                d.columns[_this.idx()].columnControl.list = Object.assign({}, checkList.values());
            });
        }
        // Unlike the SearchInput based search contents, CheckList does not handle state saving
        // (since the mechanism for column visibility is different), so state saving is handled
        // here.
        dt.on('stateLoaded', function (e, s, state) {
            var values = getState(_this.idx(), state);
            if (values) {
                checkList.values(values);
                applySearch(values);
            }
        });
        dt.on('stateSaveParams', function (e, s, data) {
            var idx = _this.idx();
            if (!data.columnControl) {
                data.columnControl = {};
            }
            if (!data.columnControl[idx]) {
                data.columnControl[idx] = {};
            }
            // If the table isn't yet ready, then the options for the list won't have been
            // populated (above) and therefore there can't be an values. In such a case
            // use the last saved values and this will refresh on the next draw.
            data.columnControl[idx].searchList = dt.ready()
                ? checkList.values()
                : loadedValues;
        });
        dt.settings()[0].aoColumns[this.idx()].columnControlSearchList = function (options) {
            if (options === 'refresh') {
                reloadOptions(dt, config, _this.idx(), checkList, null);
            }
            else {
                setOptions(checkList, options);
            }
        };
        loadedValues = getState(this.idx(), dt.state.loaded());
        applySearch(loadedValues);
        return checkList.element();
    }
};

var searchNumber = {
    defaults: {
        clear: true,
        placeholder: '',
        title: '',
        titleAttr: ''
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var i18nBase = 'columnControl.search.number.';
        var searchInput = new SearchInput(dt, this.idx())
            .type('num')
            .addClass('dtcc-searchNumber')
            .clearable(config.clear)
            .placeholder(config.placeholder)
            .title(config.title)
            .titleAttr(config.titleAttr)
            .options([
            { label: dt.i18n(i18nBase + 'equal', 'Equals'), value: 'equal' },
            { label: dt.i18n(i18nBase + 'notEqual', 'Does not equal'), value: 'notEqual' },
            { label: dt.i18n(i18nBase + 'greater', 'Greater than'), value: 'greater' },
            {
                label: dt.i18n(i18nBase + 'greaterOrEqual', 'Greater or equal'),
                value: 'greaterOrEqual'
            },
            { label: dt.i18n(i18nBase + 'less', 'Less than'), value: 'less' },
            { label: dt.i18n(i18nBase + 'lessOrEqual', 'Less or equal'), value: 'lessOrEqual' },
            { label: dt.i18n(i18nBase + 'empty', 'Empty'), value: 'empty' },
            { label: dt.i18n(i18nBase + 'notEmpty', 'Not empty'), value: 'notEmpty' }
        ])
            .search(function (searchType, searchTerm, loadingState) {
            // When SSP, don't apply a filter here, SearchInput will add to the submit data
            if (dt.page.info().serverSide) {
                if (!loadingState) {
                    dt.draw();
                }
                return;
            }
            var column = dt.column(_this.idx());
            if (searchType === 'empty') {
                column.search.fixed('dtcc', function (haystack) { return !haystack; });
            }
            else if (searchType === 'notEmpty') {
                column.search.fixed('dtcc', function (haystack) { return !!haystack; });
            }
            else if (column.search.fixed('dtcc') === '' && searchTerm === '') {
                // No change - don't do anything
                return;
            }
            else if (searchTerm === '') {
                // Clear search
                column.search.fixed('dtcc', '');
            }
            else if (searchType === 'equal') {
                // Use a function for matching - weak typing
                column.search.fixed('dtcc', function (haystack) { return stringToNum(haystack) == searchTerm; });
            }
            else if (searchType === 'notEqual') {
                column.search.fixed('dtcc', function (haystack) { return stringToNum(haystack) != searchTerm; });
            }
            else if (searchType === 'greater') {
                column.search.fixed('dtcc', function (haystack) { return stringToNum(haystack) > searchTerm; });
            }
            else if (searchType === 'greaterOrEqual') {
                column.search.fixed('dtcc', function (haystack) { return stringToNum(haystack) >= searchTerm; });
            }
            else if (searchType === 'less') {
                column.search.fixed('dtcc', function (haystack) { return stringToNum(haystack) < searchTerm; });
            }
            else if (searchType === 'lessOrEqual') {
                column.search.fixed('dtcc', function (haystack) { return stringToNum(haystack) <= searchTerm; });
            }
            // If in a dropdown, set the parents as active
            if (config._parents) {
                config._parents.forEach(function (btn) {
                    return btn.activeList(_this.unique(), !!column.search.fixed('dtcc'));
                });
            }
            if (!loadingState) {
                column.draw();
            }
        });
        // Set a numeric input type, per BBC's guidelines
        searchInput.input().setAttribute('inputmode', 'numeric');
        searchInput.input().setAttribute('pattern', '[0-9]*');
        return searchInput.element();
    }
};
var _re_html = /<([^>]*>)/g;
var _re_formatted_numeric = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;
function stringToNum(d) {
    if (d !== 0 && (!d || d === '-')) {
        return -Infinity;
    }
    var type = typeof d;
    if (type === 'number' || type === 'bigint') {
        return d;
    }
    if (d.replace) {
        d = d.replace(_re_html, '').replace(_re_formatted_numeric, '');
    }
    return d * 1;
}

var searchText = {
    defaults: {
        clear: true,
        placeholder: '',
        title: '',
        titleAttr: ''
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var i18nBase = 'columnControl.search.text.';
        var searchInput = new SearchInput(dt, this.idx())
            .addClass('dtcc-searchText')
            .clearable(config.clear)
            .placeholder(config.placeholder)
            .title(config.title)
            .titleAttr(config.titleAttr)
            .options([
            { label: dt.i18n(i18nBase + 'contains', 'Contains'), value: 'contains' },
            {
                label: dt.i18n(i18nBase + 'notContains', 'Does not contain'),
                value: 'notContains'
            },
            { label: dt.i18n(i18nBase + 'equal', 'Equals'), value: 'equal' },
            { label: dt.i18n(i18nBase + 'notEqual', 'Does not equal'), value: 'notEqual' },
            { label: dt.i18n(i18nBase + 'starts', 'Starts'), value: 'starts' },
            { label: dt.i18n(i18nBase + 'ends', 'Ends'), value: 'ends' },
            { label: dt.i18n(i18nBase + 'empty', 'Empty'), value: 'empty' },
            { label: dt.i18n(i18nBase + 'notEmpty', 'Not empty'), value: 'notEmpty' }
        ])
            .search(function (searchType, searchTerm, loadingState) {
            // When SSP, don't apply a filter here, SearchInput will add to the submit data
            if (dt.page.info().serverSide) {
                if (!loadingState) {
                    dt.draw();
                }
                return;
            }
            var column = dt.column(_this.idx());
            searchTerm = searchTerm.toLowerCase();
            if (searchType === 'empty') {
                column.search.fixed('dtcc', function (haystack) { return !haystack; });
            }
            else if (searchType === 'notEmpty') {
                column.search.fixed('dtcc', function (haystack) { return !!haystack; });
            }
            else if (column.search.fixed('dtcc') === '' && searchTerm === '') {
                // No change - don't do anything
                return;
            }
            else if (searchTerm === '') {
                // Clear search
                column.search.fixed('dtcc', '');
            }
            else if (searchType === 'equal') {
                // Use a function for exact matching
                column.search.fixed('dtcc', function (haystack) { return haystack.toLowerCase() == searchTerm; });
            }
            else if (searchType === 'notEqual') {
                column.search.fixed('dtcc', function (haystack) { return haystack.toLowerCase() != searchTerm; });
            }
            else if (searchType === 'contains') {
                // Use the built in smart search
                column.search.fixed('dtcc', searchTerm);
            }
            else if (searchType === 'notContains') {
                // Use the built in smart search
                column.search.fixed('dtcc', function (haystack) { return !haystack.toLowerCase().includes(searchTerm); });
            }
            else if (searchType === 'starts') {
                // Use a function for startsWith case insensitive search
                column.search.fixed('dtcc', function (haystack) {
                    return haystack.toLowerCase().startsWith(searchTerm);
                });
            }
            else if (searchType === 'ends') {
                column.search.fixed('dtcc', function (haystack) {
                    return haystack.toLowerCase().endsWith(searchTerm);
                });
            }
            // If in a dropdown, set the parent levels as active
            if (config._parents) {
                config._parents.forEach(function (btn) {
                    return btn.activeList(_this.unique(), !!column.search.fixed('dtcc'));
                });
            }
            if (!loadingState) {
                column.draw();
            }
        });
        return searchInput.element();
    }
};

var search = {
    defaults: {
        allowSearchList: false
    },
    init: function (config) {
        var _this = this;
        var _a, _b, _c;
        var dt = this.dt();
        var idx = this.idx();
        var displayEl;
        var loadedState = (_c = (_b = (_a = dt.state.loaded()) === null || _a === void 0 ? void 0 : _a.columnControl) === null || _b === void 0 ? void 0 : _b[idx]) === null || _c === void 0 ? void 0 : _c.searchInput;
        var initType = function (type) {
            var json = getJsonOptions(dt, idx);
            // Attempt to match what type of search should be shown
            if (config.allowSearchList && json) {
                // We've got a list of JSON options, and are allowed to show the searchList
                return searchList.init.call(_this, Object.assign({}, searchList.defaults, config));
            }
            else if (type === 'date' || type.startsWith('datetime')) {
                // Date types
                return searchDateTime.init.call(_this, Object.assign({}, searchDateTime.defaults, config));
            }
            else if (type.includes('num')) {
                // Number types
                return searchNumber.init.call(_this, Object.assign({}, searchNumber.defaults, config));
            }
            else {
                // Everything else
                return searchText.init.call(_this, Object.assign({}, searchText.defaults, config));
            }
        };
        // If we know the type from the saved state, we can load it immediately. This is required
        // to allow the state to be applied to the table and the first draw to have a filter
        // applied (if it is needed).
        if (loadedState) {
            displayEl = initType(loadedState.type);
        }
        else {
            // Wait until we can get the data type for the column and the run the corresponding type
            displayEl = document.createElement('div');
            dt.ready(function () {
                var column = dt.column(idx);
                var display = initType(column.type());
                displayEl.replaceWith(display);
            });
        }
        return displayEl;
    }
};

var searchClear$1 = {
    defaults: {
        className: 'searchClear',
        icon: 'searchClear',
        text: 'Clear Search'
    },
    init: function (config) {
        var _this = this;
        var dt = this.dt();
        var btn = new Button(dt, this)
            .text(dt.i18n('columnControl.searchClear', config.text))
            .icon(config.icon)
            .className(config.className)
            .handler(function () {
            dt.column(_this.idx()).columnControl.searchClear().draw();
        })
            .enable(false);
        dt.on('draw', function () {
            // change enable state
            var search = dt.column(_this.idx()).search.fixed('dtcc');
            var searchList = dt.column(_this.idx()).search.fixed('dtcc-list');
            btn.enable(!!(search || searchList));
        });
        return btn.element();
    }
};

var searchDropdown = {
    defaults: {
        ajaxOnly: true,
        allowSearchList: true,
        className: 'searchDropdown',
        clear: true,
        columns: '',
        hidable: true,
        options: null,
        orthogonal: 'display',
        placeholder: '',
        search: true,
        select: true,
        text: 'Search',
        title: '',
        titleAttr: ''
    },
    extend: function (config) {
        var dt = this.dt();
        return {
            extend: 'dropdown',
            icon: 'search',
            text: dt.i18n('columnControl.searchDropdown', config.text),
            content: [
                Object.assign(config, {
                    extend: 'search'
                })
            ]
        };
    }
};

var spacer = {
    defaults: {
        className: 'dtcc-spacer',
        text: ''
    },
    init: function (config) {
        var dt = this.dt();
        var spacer = createElement('div', config.className, dt.i18n('columnControl.spacer', config.text));
        spacer.setAttribute('role', 'separator');
        return spacer;
    }
};

var title = {
    defaults: {
        className: 'dtcc-title',
        text: null
    },
    init: function (config) {
        var dt = this.dt();
        var title = dt.column(this.idx()).title();
        var text = config.text === null ? '[title]' : config.text;
        var el = createElement('div', config.className, text.replace('[title]', title));
        return el;
    }
};

var contentTypes = {
    colVis: colVis,
    colVisDropdown: colVisDropdown,
    dropdown: dropdownContent,
    reorder: reorder,
    reorderLeft: reorderLeft,
    reorderRight: reorderRight,
    rowGroup: rowGroup,
    rowGroupAdd: rowGroupAdd,
    rowGroupClear: rowGroupClear,
    rowGroupRemove: rowGroupRemove,
    order: order,
    orderAddAsc: orderAddAsc,
    orderAddDesc: orderAddDesc,
    orderAsc: orderAsc,
    orderClear: orderClear,
    orderDesc: orderDesc,
    orderRemove: orderRemove,
    orderStatus: orderStatus,
    search: search,
    searchClear: searchClear$1,
    searchDropdown: searchDropdown,
    searchDateTime: searchDateTime,
    searchList: searchList,
    searchNumber: searchNumber,
    searchText: searchText,
    spacer: spacer,
    title: title
};

/**
 *
 */
var ColumnControl = /** @class */ (function () {
    /**
     * Create a new ColumnControl instance to control a DataTables column.
     *
     * @param dt DataTables API instance
     * @param columnIdx Column index to operation on
     * @param opts Configuration options
     */
    function ColumnControl(dt, columnIdx, opts) {
        var _this = this;
        this._dom = {
            target: null,
            wrapper: null
        };
        this._c = {};
        this._s = {
            columnIdx: null,
            unique: null,
            toDestroy: []
        };
        this._dt = dt;
        this._s.columnIdx = columnIdx;
        this._s.unique = Math.random();
        var originalIdx = columnIdx;
        Object.assign(this._c, ColumnControl.defaults, opts);
        this._dom.target = this._target();
        if (opts.className) {
            addClass(this._dom.target.closest('tr'), opts.className);
        }
        if (this._c.content) {
            // If column reordering can be done, we reassign the column index here, and before the
            // plugins can add their own listeners.
            dt.on('columns-reordered', function (e, details) {
                _this._s.columnIdx = dt.colReorder.transpose(originalIdx, 'fromOriginal');
            });
            this._dom.wrapper = document.createElement('span');
            this._dom.wrapper.classList.add('dtcc');
            this._dom.target.appendChild(this._dom.wrapper);
            this._c.content.forEach(function (content) {
                var _a = _this.resolve(content), plugin = _a.plugin, config = _a.config;
                var el = plugin.init.call(_this, config);
                _this._dom.wrapper.appendChild(el);
            });
            dt.on('destroy', function () {
                _this._s.toDestroy.slice().forEach(function (el) {
                    el.destroy();
                });
                _this._dom.wrapper.remove();
            });
        }
    }
    /**
     * Add a component to the destroy list. This is so there is a single destroy event handler,
     * which is much better for performance.
     *
     * @param component Any instance with a `destroy` method
     */
    ColumnControl.prototype.destroyAdd = function (component) {
        this._s.toDestroy.push(component);
    };
    /**
     * Remove an instance from the destroy list (it has been destroyed itself)
     *
     * @param component Any instance with a `destroy` method
     */
    ColumnControl.prototype.destroyRemove = function (component) {
        var idx = this._s.toDestroy.indexOf(component);
        if (idx !== -1) {
            this._s.toDestroy.splice(idx, 1);
        }
    };
    /**
     * Get the DataTables API instance that hosts this instance of ColumnControl
     *
     * @returns DataTables API instance
     */
    ColumnControl.prototype.dt = function () {
        return this._dt;
    };
    /**
     * Get what column index this instance of ColumnControl is operating on
     *
     * @returns Column index
     */
    ColumnControl.prototype.idx = function () {
        return this._s.columnIdx;
    };
    /**
     * Covert the options from `content` in the DataTable initialisation for this instance into a
     * resolved plugin and options.
     *
     * @param content The dev's supplied configuration for the content
     * @returns Resolved plugin information
     */
    ColumnControl.prototype.resolve = function (content) {
        var plugin = null;
        var config = null;
        var type = null;
        if (typeof content === 'string') {
            // Simple content - uses default options
            type = content;
            plugin = ColumnControl.content[type];
            config = Object.assign({}, plugin === null || plugin === void 0 ? void 0 : plugin.defaults);
        }
        else if (Array.isArray(content)) {
            // An array is a shorthand for a dropdown with its default options
            type = 'dropdown';
            plugin = ColumnControl.content[type];
            config = Object.assign({}, plugin === null || plugin === void 0 ? void 0 : plugin.defaults, {
                content: content
            });
        }
        else if (content.extend) {
            // Content with custom options
            type = content.extend;
            plugin = ColumnControl.content[type];
            config = Object.assign({}, plugin === null || plugin === void 0 ? void 0 : plugin.defaults, content);
        }
        if (!plugin) {
            throw new Error('Unknown ColumnControl content type: ' + type);
        }
        // If the plugin is a wrapper around another type - e.g. the colVisDropdown
        if (plugin.extend) {
            var self_1 = plugin.extend.call(this, config);
            return this.resolve(self_1);
        }
        return {
            config: config,
            type: type,
            plugin: plugin
        };
    };
    /**
     * Get the unique id for the instance
     *
     * @returns Instant unique id
     */
    ColumnControl.prototype.unique = function () {
        return this._s.unique;
    };
    /**
     * Resolve the configured target into a DOM element
     */
    ColumnControl.prototype._target = function () {
        var target = this._c.target;
        var column = this._dt.column(this._s.columnIdx);
        var node;
        var className = 'header';
        // Header row index
        if (typeof target === 'number') {
            node = column.header(target);
        }
        else {
            var parts = target.split(':');
            var isHeader = parts[0] === 'tfoot' ? false : true;
            var row = parts[1] ? parseInt(parts[1]) : 0;
            if (isHeader) {
                node = column.header(row);
            }
            else {
                node = column.footer(row);
                className = 'footer';
            }
        }
        return node.querySelector('div.dt-column-' + className);
    };
    // Classes for common UI
    ColumnControl.Button = Button;
    ColumnControl.CheckList = CheckList;
    ColumnControl.SearchInput = SearchInput;
    /** Content plugins */
    ColumnControl.content = contentTypes;
    /** Defaults for ColumnControl */
    ColumnControl.defaults = {
        className: '',
        content: null,
        target: 0,
    };
    /** SVG icons that can be used by the content plugins */
    ColumnControl.icons = icons;
    /** Version */
    ColumnControl.version = '1.1.0';
    return ColumnControl;
}());

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API integration
 */
DataTable.ColumnControl = ColumnControl;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables listeners for initialisation
 */
// Create header / footer rows that don't exist, but have been referenced in the ColumnControl
// targets. This needs to be done _before_ the header / footer structure is detected.
$(document).on('i18n.dt', function (e, settings) {
    if (e.namespace !== 'dt') {
        return;
    }
    var api = new DataTable.Api(settings);
    var thead = api.table().header();
    var tableInit = settings.oInit.columnControl;
    var defaultInit = ColumnControl.defaults;
    var baseTargets = [];
    var ackTargets = {};
    // Determine if there is only one header row initially. If there is, we might append more
    // after it. Mark the top row as the header row using `titleRow` in the DataTables configuration
    if (thead.querySelectorAll('tr').length <= 1 && settings.titleRow === null) {
        settings.titleRow = 0;
    }
    identifyTargets(baseTargets, tableInit);
    if (ColumnControl.defaults.content) {
        identifyTargets(baseTargets, defaultInit);
    }
    api.columns().every(function (i) {
        var columnInit = this.init().columnControl;
        identifyTargets(baseTargets, columnInit);
    });
    for (var i = 0; i < baseTargets.length; i++) {
        assetTarget(ackTargets, baseTargets[i], api);
    }
});
// Initialisation of ColumnControl instances - has to be done _after_ the header / footer structure
// is detected by DataTables.
$(document).on('preInit.dt', function (e, settings) {
    if (e.namespace !== 'dt') {
        return;
    }
    var api = new DataTable.Api(settings);
    var tableInit = settings.oInit.columnControl;
    var defaultInit = ColumnControl.defaults;
    var baseTargets = [];
    identifyTargets(baseTargets, tableInit);
    // Only add the default target if there is actually content for it
    if (ColumnControl.defaults.content) {
        identifyTargets(baseTargets, defaultInit);
    }
    api.columns().every(function (i) {
        var columnInit = this.init().columnControl;
        var targets = identifyTargets(baseTargets.slice(), columnInit);
        for (var i_1 = 0; i_1 < targets.length; i_1++) {
            // Each of the column, table and defaults configuration can be an array of config
            // objects, an array of content, or a configuration object. There might be multiple
            // targets for each one, and they might not exist! Therefore this is more complex
            // than it might be desirable.
            var columnTargetInit = getOptionsForTarget(targets[i_1], columnInit);
            var tableTargetInit = getOptionsForTarget(targets[i_1], tableInit);
            var defaultTargetInit = getOptionsForTarget(targets[i_1], defaultInit);
            if (defaultTargetInit || tableTargetInit || columnTargetInit) {
                new ColumnControl(api, this.index(), Object.assign({}, defaultTargetInit || {}, tableTargetInit || {}, columnTargetInit || {}));
            }
        }
    });
});
function searchClear() {
    var ctx = this;
    return this.iterator('column', function (settings, idx) {
        // Note that the listeners for this will not redraw the table.
        ctx.trigger('cc-search-clear', [idx]);
    });
}
DataTable.Api.registerPlural('columns().columnControl.searchClear()', 'column().columnControl.searchClear()', searchClear);
// Legacy (1.0.x)) - was never documented, but was mentioned in the forum
DataTable.Api.registerPlural('columns().ccSearchClear()', 'column().ccSearchClear()', searchClear);
DataTable.Api.registerPlural('columns().columnControl.searchList()', 'column().columnControl.searchList()', function (options) {
    return this.iterator('column', function (settings, idx) {
        settings.aoColumns[idx].columnControlSearchList(options);
    });
});
DataTable.ext.buttons.ccSearchClear = {
    text: function (dt) {
        return dt.i18n('columnControl.buttons.searchClear', 'Clear search');
    },
    init: function (dt, node, config) {
        var _this = this;
        dt.on('draw.DT', function () {
            var enabled = false;
            var glob = !!dt.search();
            // No point in wasting clock cycles if we already know it will be enabled
            if (!glob) {
                dt.columns().every(function () {
                    if (this.search.fixed('dtcc') || this.search.fixed('dtcc-list')) {
                        enabled = true;
                    }
                });
            }
            _this.enable(glob || enabled);
        });
        this.enable(false);
    },
    action: function (e, dt, node, config) {
        dt.search('');
        dt.columns().columnControl.searchClear();
        dt.draw();
    }
};
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation support - this is more involved than normal as targets might
 * need to be created, and also options needs to be resolved into a standard
 * ColumnControl configuration object, from the various forms allowed in the
 * DataTables configuration.
 */
/**
 * Given a ColumnControl target, make sure that it exists. If not, create it.
 *
 * @param ackTargets Cache for list of targets that have already been found or created
 * @param target Current target
 * @param dt DataTable API
 * @returns Void
 */
function assetTarget(ackTargets, target, dt) {
    // Check if we already know about the target - if so, we know that it must already be in place
    if (ackTargets[target]) {
        return;
    }
    var isHeader = true; // false for footer
    var row = 0;
    if (typeof target === 'number') {
        row = target;
    }
    else {
        var parts = target.split(':');
        if (parts[0] === 'tfoot') {
            isHeader = false;
        }
        if (parts[1]) {
            row = parseInt(parts[1]);
        }
    }
    // The header / footer have not yet had their structure read, so they aren't available via
    // the API. As such we need to do our own DOM tweaking
    var node = isHeader ? dt.table().header() : dt.table().footer();
    // If the node doesn't exist yet, we need to create it
    if (!node.querySelectorAll('tr')[row]) {
        var columns = dt.columns().count();
        var tr = createElement('tr');
        tr.setAttribute('data-dt-order', 'disable');
        for (var i = 0; i < columns; i++) {
            tr.appendChild(createElement('td'));
        }
        node.appendChild(tr);
    }
    ackTargets[target] = true;
}
/**
 * Given a target, get the config object for it from the parameter passed in
 *
 * @param target ColumnControl target
 * @param input The dev's configuration
 * @returns The resolved config object, if found
 */
function getOptionsForTarget(target, input) {
    var defaultTarget = ColumnControl.defaults.target;
    var selfTarget;
    if (isIContentArray(input)) {
        // Top level content array - e.g. `columnControl: ['order']`
        if (defaultTarget === target) {
            return {
                target: defaultTarget,
                content: input
            };
        }
    }
    else if (Array.isArray(input)) {
        // Top level array, some items of which will be configuration objects (possibly not all)
        for (var i = 0; i < input.length; i++) {
            var item = input[i];
            if (isIContentArray(item)) {
                // A content array, e.g. the inner array from: `columnControl: [['order']]
                if (defaultTarget === target) {
                    return {
                        target: defaultTarget,
                        content: item
                    };
                }
            }
            else if (isIConfig(item)) {
                // A config object, e.g. the object from: `columnControl: [{content: []}]`
                selfTarget = item.target !== undefined ? item.target : defaultTarget;
                if (target === selfTarget) {
                    return item;
                }
            }
            else {
                // A content object
                if (target === defaultTarget) {
                    return {
                        target: defaultTarget,
                        content: input
                    };
                }
            }
        }
    }
    else if (typeof input === 'object') {
        // An object can be either a config object, or an extending content object
        if (isIConfig(input)) {
            // Config object: columnControl: {content: []}
            selfTarget = input.target !== undefined ? input.target : defaultTarget;
            if (target === selfTarget) {
                return input;
            }
        }
        else {
            // content object: columnControl: [{extend: 'order'}]
            if (target === defaultTarget) {
                return {
                    target: defaultTarget,
                    content: input
                };
            }
        }
    }
}
/**
 * Get a list of all targets from the configuration objects / arrays
 *
 * @param targets Established list of targets - mutated
 * @param input Configuration object / array
 * @returns Updated array
 */
function identifyTargets(targets, input) {
    function add(target) {
        if (!targets.includes(target)) {
            targets.push(target);
        }
    }
    if (Array.isArray(input)) {
        if (input.length === 0) {
            // Empty array - assume it is empty content
            add(ColumnControl.defaults.target);
        }
        else {
            // Array of options, or an array of content
            input.forEach(function (item) {
                add(typeof item === 'object' && item.target !== undefined
                    ? item.target
                    : ColumnControl.defaults.target);
            });
        }
    }
    else if (typeof input === 'object') {
        // Full options defined: { target: x, content: [] }
        add(input.target !== undefined ? input.target : ColumnControl.defaults.target);
    }
    return targets;
}
/**
 * Check if an item is a configuration object or not
 *
 * @param item Item to check
 * @returns true if it is a config object
 */
function isIConfig(item) {
    return typeof item === 'object' && item.target !== undefined ? true : false;
}
/**
 * Determine if an array contains only content items or not
 *
 * @param arr Array to check
 * @returns true if is content only, false if not (i.e. is an array with configuration objects).
 */
function isIContentArray(arr) {
    var detectedConfig = false;
    if (!Array.isArray(arr)) {
        return false;
    }
    for (var i = 0; i < arr.length; i++) {
        if (isIConfig(arr[i])) {
            detectedConfig = true;
            break;
        }
    }
    return !detectedConfig;
}


return DataTable;
}));
