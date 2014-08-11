/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * @description <p>Provides a fixed layout containing, top, bottom, left, right and center layout units. It can be applied to either the body or an element.</p>
 * @namespace YAHOO.widget
 * @requires yahoo, dom, element, event
 * @module layout
 */
(function() {
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event,
        Lang = YAHOO.lang;

    /**
     * @constructor
     * @class Layout
     * @extends YAHOO.util.Element
     * @description <p>Provides a fixed layout containing, top, bottom, left, right and center layout units. It can be applied to either the body or an element.</p>
     * @param {String/HTMLElement} el The element to make contain a layout.
     * @param {Object} attrs Object liternal containing configuration parameters.
    */

    var Layout = function(el, config) {
        if (Lang.isObject(el) && !el.tagName) {
            config = el;
            el = null;
        }
        if (Lang.isString(el)) {
            if (Dom.get(el)) {
                el = Dom.get(el);
            }
        }
        if (!el) {
            el = document.body;
        }

        var oConfig = {
            element: el,
            attributes: config || {}
        };

        Layout.superclass.constructor.call(this, oConfig.element, oConfig.attributes);    
    };

    /**
    * @private
    * @static
    * @property _instances
    * @description Internal hash table for all layout instances
    * @type Object
    */ 
    Layout._instances = {};
    /**
    * @static
    * @method getLayoutById 
    * @description Get's a layout object by the HTML id of the element associated with the Layout object.
    * @return {Object} The Layout Object
    */ 
    Layout.getLayoutById = function(id) {
        if (Layout._instances[id]) {
            return Layout._instances[id];
        }
        return false;
    };

    YAHOO.extend(Layout, YAHOO.util.Element, {
        /**
        * @property browser
        * @description A modified version of the YAHOO.env.ua object
        * @type Object
        */
        browser: function() {
            var b = YAHOO.env.ua;
            b.standardsMode = false;
            b.secure = false;
            return b;
        }(),
        /**
        * @private
        * @property _units
        * @description An object literal that contains a list of units in the layout
        * @type Object
        */
        _units: null,
        /**
        * @private
        * @property _rendered
        * @description Set to true when the layout is rendered
        * @type Boolean
        */
        _rendered: null,
        /**
        * @private
        * @property _zIndex
        * @description The zIndex to set all LayoutUnits to
        * @type Number
        */
        _zIndex: null,
        /**
        * @private
        * @property _sizes
        * @description A collection of the current sizes of all usable LayoutUnits to be used for calculations
        * @type Object
        */
        _sizes: null,
        /**
        * @private
        * @method _setBodySize
        * @param {Boolean} set If set to false, it will NOT set the size, just perform the calculations (used for collapsing units)
        * @description Used to set the body size of the layout, sets the height and width of the parent container
        */
        _setBodySize: function(set) {
            var h = 0, w = 0;
            set = ((set === false) ? false : true);

            if (this._isBody) {
                h = Dom.getClientHeight();
                w = Dom.getClientWidth();
            } else {
                h = parseInt(this.getStyle('height'), 10);
                w = parseInt(this.getStyle('width'), 10);
                if (isNaN(w)) {
                    w = this.get('element').clientWidth;
                }
                if (isNaN(h)) {
                    h = this.get('element').clientHeight;
                }
            }
            if (this.get('minWidth')) {
                if (w < this.get('minWidth')) {
                    w = this.get('minWidth');
                }
            }
            if (this.get('minHeight')) {
                if (h < this.get('minHeight')) {
                    h = this.get('minHeight');
                }
            }
            if (set) {
                if (h < 0) {
                    h = 0;
                }
                if (w < 0) {
                    w = 0;
                }
                Dom.setStyle(this._doc, 'height', h + 'px');
                Dom.setStyle(this._doc, 'width', w + 'px');
            }
            this._sizes.doc = { h: h, w: w };
            this._setSides(set);
        },
        /**
        * @private
        * @method _setSides
        * @param {Boolean} set If set to false, it will NOT set the size, just perform the calculations (used for collapsing units)
        * @description Used to set the size and position of the left, right, top and bottom units
        */
        _setSides: function(set) {
            var h1 = ((this._units.top) ? this._units.top.get('height') : 0),
                h2 = ((this._units.bottom) ? this._units.bottom.get('height') : 0),
                h = this._sizes.doc.h,
                w = this._sizes.doc.w;
            set = ((set === false) ? false : true);

            this._sizes.top = {
                h: h1, w: ((this._units.top) ? w : 0),
                t: 0
            };
            this._sizes.bottom = {
                h: h2, w: ((this._units.bottom) ? w : 0)
            };
            
            var newH = (h - (h1 + h2));

            this._sizes.left = {
                h: newH, w: ((this._units.left) ? this._units.left.get('width') : 0)
            };
            this._sizes.right = {
                h: newH, w: ((this._units.right) ? this._units.right.get('width') : 0),
                l: ((this._units.right) ? (w - this._units.right.get('width')) : 0),
                t: ((this._units.top) ? this._sizes.top.h : 0)
            };
            
            if (this._units.right && set) {
                this._units.right.set('top', this._sizes.right.t);
                if (!this._units.right._collapsing) { 
                    this._units.right.set('left', this._sizes.right.l);
                }
                this._units.right.set('height', this._sizes.right.h, true);
            }
            if (this._units.left) {
                this._sizes.left.l = 0;
                if (this._units.top) {
                    this._sizes.left.t = this._sizes.top.h;
                } else {
                    this._sizes.left.t = 0;
                }
                if (set) {
                    this._units.left.set('top', this._sizes.left.t);
                    this._units.left.set('height', this._sizes.left.h, true);
                    this._units.left.set('left', 0);
                }
            }
            if (this._units.bottom) {
                this._sizes.bottom.t = this._sizes.top.h + this._sizes.left.h;
                if (set) {
                    this._units.bottom.set('top', this._sizes.bottom.t);
                    this._units.bottom.set('width', this._sizes.bottom.w, true);
                }
            }
            if (this._units.top) {
                if (set) {
                    this._units.top.set('width', this._sizes.top.w, true);
                }
            }
            this._setCenter(set);
        },
        /**
        * @private
        * @method _setCenter
        * @param {Boolean} set If set to false, it will NOT set the size, just perform the calculations (used for collapsing units)
        * @description Used to set the size and position of the center unit
        */
        _setCenter: function(set) {
            set = ((set === false) ? false : true);
            var h = this._sizes.left.h;
            var w = (this._sizes.doc.w - (this._sizes.left.w + this._sizes.right.w));
            if (set) {
                this._units.center.set('height', h, true);
                this._units.center.set('width', w, true);
                this._units.center.set('top', this._sizes.top.h);
                this._units.center.set('left', this._sizes.left.w);
            }
            this._sizes.center = { h: h, w: w, t: this._sizes.top.h, l: this._sizes.left.w };
        },
        /**
        * @method getSizes
        * @description Get a reference to the internal Layout Unit sizes object used to build the layout wireframe
        * @return {Object} An object of the layout unit sizes
        */
        getSizes: function() {
            return this._sizes;
        },
        /**
        * @method getUnitById
        * @param {String} id The HTML element id of the unit
        * @description Get the LayoutUnit by it's HTML id
        * @return {<a href="YAHOO.widget.LayoutUnit.html">YAHOO.widget.LayoutUnit</a>} The LayoutUnit instance
        */
        getUnitById: function(id) {
            return YAHOO.widget.LayoutUnit.getLayoutUnitById(id);
        },
        /**
        * @method getUnitByPosition
        * @param {String} pos The position of the unit in this layout
        * @description Get the LayoutUnit by it's position in this layout
        * @return {<a href="YAHOO.widget.LayoutUnit.html">YAHOO.widget.LayoutUnit</a>} The LayoutUnit instance
        */
        getUnitByPosition: function(pos) {
            if (pos) {
                pos = pos.toLowerCase();
                if (this._units[pos]) {
                    return this._units[pos];
                }
                return false;
            }
            return false;
        },
        /**
        * @method removeUnit
        * @param {Object} unit The LayoutUnit that you want to remove
        * @description Remove the unit from this layout and resize the layout.
        */
        removeUnit: function(unit) {
            delete this._units[unit.get('position')];
            this.resize();
        },
        /**
        * @method addUnit
        * @param {Object} cfg The config for the LayoutUnit that you want to add
        * @description Add a unit to this layout and if the layout is rendered, resize the layout. 
        * @return {<a href="YAHOO.widget.LayoutUnit.html">YAHOO.widget.LayoutUnit</a>} The LayoutUnit instance
        */
        addUnit: function(cfg) {
            if (!cfg.position) {
                return false;
            }
            if (this._units[cfg.position]) {
                return false;
            }
            var element = null,
                el = null;

            if (cfg.id) {
                if (Dom.get(cfg.id)) {
                    element = Dom.get(cfg.id);
                    delete cfg.id;

                }
            }
            if (cfg.element) {
                element = cfg.element;
            }

            if (!el) {
                el = document.createElement('div');
                var id = Dom.generateId();
                el.id = id;
            }

            if (!element) {
                element = document.createElement('div');
            }
            Dom.addClass(element, 'yui-layout-wrap');
            if (this.browser.ie && !this.browser.standardsMode) {
                el.style.zoom = 1;
                element.style.zoom = 1;
            }

            if (el.firstChild) {
                el.insertBefore(element, el.firstChild);
            } else {
                el.appendChild(element);
            }
            this._doc.appendChild(el);

            var h = false, w = false;

            if (cfg.height) {
                h = parseInt(cfg.height, 10);
            }
            if (cfg.width) {
                w = parseInt(cfg.width, 10);
            }
            var unitConfig = {};
            YAHOO.lang.augmentObject(unitConfig, cfg); // break obj ref

            unitConfig.parent = this;
            unitConfig.wrap = element;
            unitConfig.height = h;
            unitConfig.width = w;

            var unit = new YAHOO.widget.LayoutUnit(el, unitConfig);

            unit.on('heightChange', this.resize, { unit: unit }, this);
            unit.on('widthChange', this.resize, { unit: unit }, this);
            unit.on('gutterChange', this.resize, { unit: unit }, this);
            this._units[cfg.position] = unit;

            if (this._rendered) {
                this.resize();
            }

            return unit;
        },
        /**
        * @private
        * @method _createUnits
        * @description Private method to create units from the config that was passed in.
        */
        _createUnits: function() {
            var units = this.get('units');
            for (var i in units) {
                if (Lang.hasOwnProperty(units, i)) {
                    this.addUnit(units[i]);
                }
            }
        },
        /**
        * @method resize
        * @param Boolean/Event set If set to false, it will NOT set the size, just perform the calculations (used for collapsing units). This can also have an attribute event passed to it.
        * @description Starts the chain of resize routines that will resize all the units.
        * @return {<a href="YAHOO.widget.Layout.html">YAHOO.widget.Layout</a>} The Layout instance
        */
        resize: function(set, info) {
            /*
            * Fixes bug #2528175
            * If the event comes from an attribute and the value hasn't changed, don't process it.
            */
            var ev = set;
            if (ev && ev.prevValue && ev.newValue) {
                if (ev.prevValue == ev.newValue) {
                    if (info) {
                        if (info.unit) {
                            if (!info.unit.get('animate')) {
                                set = false;
                            }
                        }
                    }
                }
            }
            set = ((set === false) ? false : true);
            if (set) {
                var retVal = this.fireEvent('beforeResize');
                if (retVal === false) {
                    set = false;
                }
                if (this.browser.ie) {
                    if (this._isBody) {
                        Dom.removeClass(document.documentElement, 'yui-layout');
                        Dom.addClass(document.documentElement, 'yui-layout');
                    } else {
                        this.removeClass('yui-layout');
                        this.addClass('yui-layout');
                    }
                }
            }
            this._setBodySize(set);
            if (set) {
                this.fireEvent('resize', { target: this, sizes: this._sizes, event: ev });
            }
            return this;
        },
        /**
        * @private
        * @method _setupBodyElements
        * @description Sets up the main doc element when using the body as the main element.
        */
        _setupBodyElements: function() {
            this._doc = Dom.get('layout-doc');
            if (!this._doc) {
                this._doc = document.createElement('div');
                this._doc.id = 'layout-doc';
                if (document.body.firstChild) {
                    document.body.insertBefore(this._doc, document.body.firstChild);
                } else {
                    document.body.appendChild(this._doc);
                }
            }
            this._createUnits();
            this._setBodySize();
            Event.on(window, 'resize', this.resize, this, true);
            Dom.addClass(this._doc, 'yui-layout-doc');
        },
        /**
        * @private
        * @method _setupElements
        * @description Sets up the main doc element when not using the body as the main element.
        */
        _setupElements: function() {
            this._doc = this.getElementsByClassName('yui-layout-doc')[0];
            if (!this._doc) {
                this._doc = document.createElement('div');
                this.get('element').appendChild(this._doc);
            }
            this._createUnits();
            this._setBodySize();
            Dom.addClass(this._doc, 'yui-layout-doc');
        },
        /**
        * @private
        * @property _isBody
        * @description Flag to determine if we are using the body as the root element.
        * @type Boolean
        */
        _isBody: null,
        /**
        * @private
        * @property _doc
        * @description Reference to the root element
        * @type HTMLElement
        */
        _doc: null,
        /**
        * @private
        * @method init
        * @description The Layout class' initialization method
        */        
        init: function(p_oElement, p_oAttributes) {

            this._zIndex = 0;

            Layout.superclass.init.call(this, p_oElement, p_oAttributes);
            
            if (this.get('parent')) {
                this._zIndex = this.get('parent')._zIndex + 10;
            }

            this._sizes = {};
            this._units = {};

            var id = p_oElement;
            if (!Lang.isString(id)) {
                id = Dom.generateId(id);
            }
            Layout._instances[id] = this;
        },
        /**
        * @method render
        * @description This method starts the render process, applying classnames and creating elements
        * @return {<a href="YAHOO.widget.Layout.html">YAHOO.widget.Layout</a>} The Layout instance
        */        
        render: function() {
            this._stamp();
            var el = this.get('element');
            if (el && el.tagName && (el.tagName.toLowerCase() == 'body')) {
                this._isBody = true;
                Dom.addClass(document.body, 'yui-layout');
                if (Dom.hasClass(document.body, 'yui-skin-sam')) {
                    //Move the class up so we can have a css chain
                    Dom.addClass(document.documentElement, 'yui-skin-sam');
                    Dom.removeClass(document.body, 'yui-skin-sam');
                }
                this._setupBodyElements();
            } else {
                this._isBody = false;
                this.addClass('yui-layout');
                this._setupElements();
            }
            this.resize();
            this._rendered = true;
            this.fireEvent('render');

            return this;
        },
        /**
        * @private
        * @method _stamp
        * @description Stamps the root node with a secure classname for ease of use. Also sets the this.browser.standardsMode variable.
        */        
        _stamp: function() {
            if (document.compatMode == 'CSS1Compat') {
                this.browser.standardsMode = true;
            }
            if (window.location.href.toLowerCase().indexOf("https") === 0) {
                Dom.addClass(document.documentElement, 'secure');
                this.browser.secure = true;
            }
        },
        /**
        * @private
        * @method initAttributes
        * @description Processes the config
        */        
        initAttributes: function(attr) {
            Layout.superclass.initAttributes.call(this, attr);
            /**
            * @attribute units
            * @description An array of config definitions for the LayoutUnits to add to this layout
            * @type Array
            */
            this.setAttributeConfig('units', {
                writeOnce: true,
                validator: YAHOO.lang.isArray,
                value: attr.units || []
            });

            /**
            * @attribute minHeight
            * @description The minimum height in pixels
            * @type Number
            */
            this.setAttributeConfig('minHeight', {
                value: attr.minHeight || false,
                validator: YAHOO.lang.isNumber
            });

            /**
            * @attribute minWidth
            * @description The minimum width in pixels
            * @type Number
            */
            this.setAttributeConfig('minWidth', {
                value: attr.minWidth || false,
                validator: YAHOO.lang.isNumber
            });

            /**
            * @attribute height
            * @description The height in pixels
            * @type Number
            */
            this.setAttributeConfig('height', {
                value: attr.height || false,
                validator: YAHOO.lang.isNumber,
                method: function(h) {
                    if (h < 0) {
                        h = 0;
                    }
                    this.setStyle('height', h + 'px');
                }
            });

            /**
            * @attribute width
            * @description The width in pixels
            * @type Number
            */
            this.setAttributeConfig('width', {
                value: attr.width || false,
                validator: YAHOO.lang.isNumber,
                method: function(w) {
                    if (w < 0) {
                        w = 0;
                    }
                    this.setStyle('width', w + 'px');
                }
            });

            /**
            * @attribute parent
            * @description If this layout is to be used as a child of another Layout instance, this config will bind the resize events together.
            * @type Object YAHOO.widget.Layout
            */
            this.setAttributeConfig('parent', {
                writeOnce: true,
                value: attr.parent || false,
                method: function(p) {
                    if (p) {
                        p.on('resize', this.resize, this, true);
                    }
                }
            });
        },
        /**
        * @method destroy
        * @description Removes this layout from the page and destroys all units that it contains. This will destroy all data inside the layout and it's children.
        */
        destroy: function() {
            var par = this.get('parent');
            if (par) {
                par.removeListener('resize', this.resize, this, true);
            }
            Event.removeListener(window, 'resize', this.resize, this, true);

            this.unsubscribeAll();
            for (var u in this._units) {
                if (Lang.hasOwnProperty(this._units, u)) {
                    if (this._units[u]) {
                        this._units[u].destroy(true);
                    }
                }
            }

            Event.purgeElement(this.get('element'), true);
            this.get('parentNode').removeChild(this.get('element'));
            
            delete YAHOO.widget.Layout._instances[this.get('id')];
            //Brutal Object Destroy
            for (var i in this) {
                if (Lang.hasOwnProperty(this, i)) {
                    this[i] = null;
                    delete this[i];
                }
            }
            
            if (par) {
                par.resize();
            }
        },
        /**
        * @method toString
        * @description Returns a string representing the Layout.
        * @return {String}
        */        
        toString: function() {
            if (this.get) {
                return 'Layout #' + this.get('id');
            }
            return 'Layout';
        }
    });
    /**
    * @event resize
    * @description Fired when this.resize is called
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event startResize
    * @description Fired when the Resize Utility for a Unit fires it's startResize Event.
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event beforeResize
    * @description Fires at the beginning of the resize method. If you return false, the resize is cancelled.
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event render
    * @description Fired after the render method completes.
    * @type YAHOO.util.CustomEvent
    */

    YAHOO.widget.Layout = Layout;
})();
/**
 * @description <p>Provides a fixed position unit containing a header, body and footer for use with a YAHOO.widget.Layout instance.</p>
 * @namespace YAHOO.widget
 * @requires yahoo, dom, element, event, layout
 * @optional animation, dragdrop, selector
 */
(function() {
    var Dom = YAHOO.util.Dom,
        Sel = YAHOO.util.Selector,
        Event = YAHOO.util.Event,
        Lang = YAHOO.lang;

    /**
     * @constructor
     * @class LayoutUnit
     * @extends YAHOO.util.Element
     * @description <p>Provides a fixed position unit containing a header, body and footer for use with a YAHOO.widget.Layout instance.</p>
     * @param {String/HTMLElement} el The element to make a unit.
     * @param {Object} attrs Object liternal containing configuration parameters.
    */

    var LayoutUnit = function(el, config) {
        
        var oConfig = {
            element: el,
            attributes: config || {}
        };

        LayoutUnit.superclass.constructor.call(this, oConfig.element, oConfig.attributes);    
    };

    /**
    * @private
    * @static
    * @property _instances
    * @description Internal hash table for all layout unit instances
    * @type Object
    */ 
    LayoutUnit._instances = {};
    /**
    * @static
    * @method getLayoutUnitById 
    * @description Get's a layout unit object by the HTML id of the element associated with the Layout Unit object.
    * @return {Object} The Layout Object
    */ 
    LayoutUnit.getLayoutUnitById = function(id) {
        if (LayoutUnit._instances[id]) {
            return LayoutUnit._instances[id];
        }
        return false;
    };

    YAHOO.extend(LayoutUnit, YAHOO.util.Element, {
        /**
        * @property STR_CLOSE
        * @description String used for close button title
        * @type {String}
        */
        STR_CLOSE: 'Click to close this pane.',
        /**
        * @property STR_COLLAPSE
        * @description String used for collapse button title
        * @type {String}
        */
        STR_COLLAPSE: 'Click to collapse this pane.',
        /**
        * @property STR_EXPAND
        * @description String used for expand button title
        * @type {String}
        */
        STR_EXPAND: 'Click to expand this pane.',
        /**
	    * The class name applied to dynamic tabs while loading.
	    * @property LOADING_CLASSNAME
	    * @type String
	    * @default "disabled"
	    */
	    LOADING_CLASSNAME: 'loading',
        /**
        * @property browser
        * @description A modified version of the YAHOO.env.ua object
        * @type Object
        */
        browser: null,
        /**
        * @private
        * @property _sizes
        * @description A collection of the current sizes of the contents of this Layout Unit
        * @type Object
        */
        _sizes: null,
        /**
        * @private
        * @property _anim
        * @description A reference to the Animation instance used by this LayouUnit
        * @type YAHOO.util.Anim
        */
        _anim: null,
        /**
        * @private
        * @property _resize
        * @description A reference to the Resize instance used by this LayoutUnit
        * @type YAHOO.util.Resize
        */
        _resize: null,
        /**
        * @private
        * @property _clip
        * @description A reference to the clip element used when collapsing the unit
        * @type HTMLElement
        */
        _clip: null,
        /**
        * @private
        * @property _gutter
        * @description A simple hash table used to store the gutter to apply to the Unit
        * @type Object
        */
        _gutter: null,
        /**
        * @property header
        * @description A reference to the HTML element used for the Header
        * @type HTMLELement
        */
        header: null,
        /**
        * @property body
        * @description A reference to the HTML element used for the body
        * @type HTMLElement
        */
        body: null,
        /**
        * @property footer
        * @description A reference to the HTML element used for the footer
        * @type HTMLElement
        */
        footer: null,
        /**
        * @private
        * @property _collapsed
        * @description Flag to determine if the unit is collapsed or not.
        * @type Boolean
        */
        _collapsed: null,
        /**
        * @private
        * @property _collapsing
        * @description A flag set while the unit is being collapsed, used so we don't fire events while animating the size
        * @type Boolean
        */
        _collapsing: null,
        /**
        * @private
        * @property _lastWidth
        * @description A holder for the last known width of the unit
        * @type Number
        */
        _lastWidth: null,
        /**
        * @private
        * @property _lastHeight
        * @description A holder for the last known height of the unit
        * @type Number
        */
        _lastHeight: null,
        /**
        * @private
        * @property _lastTop
        * @description A holder for the last known top of the unit
        * @type Number
        */
        _lastTop: null,
        /**
        * @private
        * @property _lastLeft
        * @description A holder for the last known left of the unit
        * @type Number
        */
        _lastLeft: null,
        /**
        * @private
        * @property _lastScroll
        * @description A holder for the last known scroll state of the unit
        * @type Boolean
        */
        _lastScroll: null,
        /**
        * @private
        * @property _lastCenetrScroll
        * @description A holder for the last known scroll state of the center unit
        * @type Boolean
        */
        _lastCenterScroll: null,
        /**
        * @private
        * @property _lastScrollTop
        * @description A holder for the last known scrollTop state of the unit
        * @type Number
        */
        _lastScrollTop: null,
        /**
        * @method resize
        * @description Resize either the unit or it's clipped state, also updating the box inside
        * @param {Boolean} force This will force full calculations even when the unit is collapsed
        * @return {<a href="YAHOO.widget.LayoutUnit.html">YAHOO.widget.LayoutUnit</a>} The LayoutUnit instance
        */
        resize: function(force) {
            var retVal = this.fireEvent('beforeResize');
            if (retVal === false) {
                return this;
            }
            if (!this._collapsing || (force === true)) {
                var scroll = this.get('scroll');
                this.set('scroll', false);


                var hd = this._getBoxSize(this.header),
                    ft = this._getBoxSize(this.footer),
                    box = [this.get('height'), this.get('width')];

                var nh = (box[0] - hd[0] - ft[0]) - (this._gutter.top + this._gutter.bottom),
                    nw = box[1] - (this._gutter.left + this._gutter.right);

                var wrapH = (nh + (hd[0] + ft[0])),
                    wrapW = nw;

                if (this._collapsed && !this._collapsing) {
                    this._setHeight(this._clip, wrapH);
                    this._setWidth(this._clip, wrapW);
                    Dom.setStyle(this._clip, 'top', this.get('top') + this._gutter.top + 'px');
                    Dom.setStyle(this._clip, 'left', this.get('left') + this._gutter.left + 'px');
                } else if (!this._collapsed || (this._collapsed && this._collapsing)) {
                    wrapH = this._setHeight(this.get('wrap'), wrapH);
                    wrapW = this._setWidth(this.get('wrap'), wrapW);
                    this._sizes.wrap.h = wrapH;
                    this._sizes.wrap.w = wrapW;

                    Dom.setStyle(this.get('wrap'), 'top', this._gutter.top + 'px');
                    Dom.setStyle(this.get('wrap'), 'left', this._gutter.left + 'px');

                    this._sizes.header.w = this._setWidth(this.header, wrapW);
                    this._sizes.header.h = hd[0];

                    this._sizes.footer.w = this._setWidth(this.footer, wrapW);
                    this._sizes.footer.h = ft[0];

                    Dom.setStyle(this.footer, 'bottom', '0px');

                    this._sizes.body.h = this._setHeight(this.body, (wrapH - (hd[0] + ft[0])));
                    this._sizes.body.w =this._setWidth(this.body, wrapW);
                    Dom.setStyle(this.body, 'top', hd[0] + 'px');

                    this.set('scroll', scroll);
                    this.fireEvent('resize');
                }
            }
            return this;
        },
        /**
        * @private
        * @method _setWidth
        * @description Sets the width of the element based on the border size of the element.
        * @param {HTMLElement} el The HTMLElement to have it's width set
        * @param {Number} w The width that you want it the element set to
        * @return {Number} The new width, fixed for borders and IE QuirksMode
        */
        _setWidth: function(el, w) {
            if (el) {
                var b = this._getBorderSizes(el);
                w = (w - (b[1] + b[3]));
                w = this._fixQuirks(el, w, 'w');
                if (w < 0) {
                    w = 0;
                }
                Dom.setStyle(el, 'width', w + 'px');
            }
            return w;
        },
        /**
        * @private
        * @method _setHeight
        * @description Sets the height of the element based on the border size of the element.
        * @param {HTMLElement} el The HTMLElement to have it's height set
        * @param {Number} h The height that you want it the element set to
        * @return {Number} The new height, fixed for borders and IE QuirksMode
        */
        _setHeight: function(el, h) {
            if (el) {
                var b = this._getBorderSizes(el);
                h = (h - (b[0] + b[2]));
                h = this._fixQuirks(el, h, 'h');
                if (h < 0) {
                    h = 0;
                }
                Dom.setStyle(el, 'height', h + 'px');
            }
            return h;
        },
        /**
        * @private
        * @method _fixQuirks
        * @description Fixes the box calculations for IE in QuirksMode
        * @param {HTMLElement} el The HTMLElement to set the dimension on
        * @param {Number} dim The number of the dimension to fix
        * @param {String} side The dimension (h or w) to fix. Defaults to h
        * @return {Number} The fixed dimension
        */
        _fixQuirks: function(el, dim, side) {
            var i1 = 0, i2 = 2;
            if (side == 'w') {
                i1 = 1;
                i2 = 3;
            }
            if ((this.browser.ie < 8) && !this.browser.standardsMode) {
                //Internet Explorer - Quirks Mode
                var b = this._getBorderSizes(el),
                    bp = this._getBorderSizes(el.parentNode);
                if ((b[i1] === 0) && (b[i2] === 0)) { //No Borders, check parent
                    if ((bp[i1] !== 0) && (bp[i2] !== 0)) { //Parent has Borders
                        dim = (dim - (bp[i1] + bp[i2]));
                    }
                } else {
                    if ((bp[i1] === 0) && (bp[i2] === 0)) {
                        dim = (dim + (b[i1] + b[i2]));
                    }
                }
            }
            return dim;
        },
        /**
        * @private
        * @method _getBoxSize
        * @description Get's the elements clientHeight and clientWidth plus the size of the borders
        * @param {HTMLElement} el The HTMLElement to get the size of
        * @return {Array} An array of height and width
        */
        _getBoxSize: function(el) {
            var size = [0, 0];
            if (el) {
                if (this.browser.ie && !this.browser.standardsMode) {
                    el.style.zoom = 1;
                }
                var b = this._getBorderSizes(el);
                size[0] = el.clientHeight + (b[0] + b[2]);
                size[1] = el.clientWidth + (b[1] + b[3]);
            }
            return size;
        },
        /**
        * @private
        * @method _getBorderSizes
        * @description Get the CSS border size of the element passed.
        * @param {HTMLElement} el The element to get the border size of
        * @return {Array} An array of the top, right, bottom, left borders.
        */
        _getBorderSizes: function(el) {
            var s = [];
            el = el || this.get('element');
            if (this.browser.ie && !this.browser.standardsMode) {
                el.style.zoom = 1;
            }
            s[0] = parseInt(Dom.getStyle(el, 'borderTopWidth'), 10);
            s[1] = parseInt(Dom.getStyle(el, 'borderRightWidth'), 10);
            s[2] = parseInt(Dom.getStyle(el, 'borderBottomWidth'), 10);
            s[3] = parseInt(Dom.getStyle(el, 'borderLeftWidth'), 10);
            
            //IE will return NaN on these if they are set to auto, we'll set them to 0
            for (var i = 0; i < s.length; i++) {
                if (isNaN(s[i])) {
                    s[i] = 0;
                }
            }
            return s;
        },
        /**
        * @private
        * @method _createClip
        * @description Create the clip element used when the Unit is collapsed
        */
        _createClip: function() {
            if (!this._clip) {
                this._clip = document.createElement('div');
                this._clip.className = 'yui-layout-clip yui-layout-clip-' + this.get('position');
                this._clip.innerHTML = '<div class="collapse"></div>';
                var c = this._clip.firstChild;
                c.title = this.STR_EXPAND;
                Event.on(c, 'click', this.expand, this, true);
                this.get('element').parentNode.appendChild(this._clip);
            }
        },
        /**
        * @private
        * @method _toggleClip
        * @description Toggle th current state of the Clip element and set it's height, width and position
        */
        _toggleClip: function() {
            if (!this._collapsed) {
                //show
                var hd = this._getBoxSize(this.header),
                    ft = this._getBoxSize(this.footer),
                    box = [this.get('height'), this.get('width')];


                var nh = (box[0] - hd[0] - ft[0]) - (this._gutter.top + this._gutter.bottom),
                    nw = box[1] - (this._gutter.left + this._gutter.right),
                    wrapH = (nh + (hd[0] + ft[0]));

                switch (this.get('position')) {
                    case 'top':
                    case 'bottom':
                        this._setWidth(this._clip, nw);
                        this._setHeight(this._clip, this.get('collapseSize'));
                        Dom.setStyle(this._clip, 'left', (this._lastLeft + this._gutter.left) + 'px');
                        if (this.get('position') == 'bottom') {
                            Dom.setStyle(this._clip, 'top', ((this._lastTop + this._lastHeight) - (this.get('collapseSize') - this._gutter.top)) + 'px');
                        } else {
                            Dom.setStyle(this._clip, 'top', this.get('top') + this._gutter.top + 'px');
                        }
                        break;
                    case 'left':
                    case 'right':
                        this._setWidth(this._clip, this.get('collapseSize'));
                        this._setHeight(this._clip, wrapH);
                        Dom.setStyle(this._clip, 'top', (this.get('top') + this._gutter.top) + 'px');
                        if (this.get('position') == 'right') {
                            Dom.setStyle(this._clip, 'left', (((this._lastLeft + this._lastWidth) - this.get('collapseSize')) - this._gutter.left) + 'px');
                        } else {
                            Dom.setStyle(this._clip, 'left', (this.get('left') + this._gutter.left) + 'px');
                        }
                        break;
                }

                Dom.setStyle(this._clip, 'display', 'block');
                this.setStyle('display', 'none');
            } else {
                //Hide
                Dom.setStyle(this._clip, 'display', 'none');
            }
        },
        /**
        * @method getSizes
        * @description Get a reference to the internal sizes object for this unit
        * @return {Object} An object of the sizes used for calculations
        */
        getSizes: function() {
            return this._sizes;
        },
        /**
        * @method toggle
        * @description Toggles the Unit, replacing it with a clipped version.
        * @return {<a href="YAHOO.widget.LayoutUnit.html">YAHOO.widget.LayoutUnit</a>} The LayoutUnit instance
        */
        toggle: function() {
            if (this._collapsed) {
                this.expand();
            } else {
                this.collapse();
            }
            return this;
        },
        /**
        * @method expand
        * @description Expand the Unit if it is collapsed.
        * @return {<a href="YAHOO.widget.LayoutUnit.html">YAHOO.widget.LayoutUnit</a>} The LayoutUnit instance
        */
        expand: function() {
            if (!this._collapsed) {
                return this;
            }
            var retVal = this.fireEvent('beforeExpand');
            if (retVal === false) {
                return this;
            }

            this._collapsing = true;
            this.setStyle('zIndex', this._zIndex);

            if (this._anim) {
                this.setStyle('display', 'none');
                var attr = {}, s;

                switch (this.get('position')) {
                    case 'left':
                    case 'right':
                        this.set('width', this._lastWidth, true);
                        this.setStyle('width', this._lastWidth + 'px');
                        this.get('parent').resize(false);
                        s = this.get('parent').getSizes()[this.get('position')];
                        this.set('height', s.h, true);
                        var left = s.l;
                        attr = {
                            left: {
                                to: left
                            }
                        };
                        if (this.get('position') == 'left') {
                            attr.left.from = (left - s.w);
                            this.setStyle('left', (left - s.w) + 'px');
                        }
                        break;
                    case 'top':
                    case 'bottom':
                        this.set('height', this._lastHeight, true);
                        this.setStyle('height', this._lastHeight + 'px');
                        this.get('parent').resize(false);
                        s = this.get('parent').getSizes()[this.get('position')];
                        this.set('width', s.w, true);
                        var top = s.t;
                        attr = {
                            top: {
                                to: top
                            }
                        };
                        if (this.get('position') == 'top') {
                            this.setStyle('top',  (top - s.h) + 'px');
                            attr.top.from = (top - s.h);
                        }
                        break;
                }

                this._anim.attributes = attr;
                var exStart = function() {
                    this.setStyle('display', 'block');
                    this.resize(true);
                    this._anim.onStart.unsubscribe(exStart, this, true);
                };
                var expand = function() {
                    this._collapsing = false;
                    this.setStyle('zIndex', this._zIndex);
                    this.set('width', this._lastWidth);
                    this.set('height', this._lastHeight);
                    this._collapsed = false;
                    this.resize();
                    this.set('scroll', this._lastScroll);
                    if (this._lastScrollTop > 0) {
                        this.body.scrollTop = this._lastScrollTop;
                    }
                    this._anim.onComplete.unsubscribe(expand, this, true);
                    this.fireEvent('expand');
                };
                this._anim.onStart.subscribe(exStart, this, true);
                this._anim.onComplete.subscribe(expand, this, true);
                this._anim.animate();
                this._toggleClip();
            } else {
                this._collapsing = false;
                this._toggleClip();
                this._collapsed = false;
                this._zIndex = this.getStyle('zIndex');
                this.setStyle('zIndex', this.get('parent')._zIndex);
                this.setStyle('display', 'block');
                this.set('width', this._lastWidth);
                this.set('height', this._lastHeight);
                this.resize();
                this.set('scroll', this._lastScroll);
                if (this._lastScrollTop > 0) {
                    this.body.scrollTop = this._lastScrollTop;
                }
                this.fireEvent('expand');
            }
            return this;
        },
        /**
        * @method collapse
        * @description Collapse the Unit if it is not collapsed.
        * @return {<a href="YAHOO.widget.LayoutUnit.html">YAHOO.widget.LayoutUnit</a>} The LayoutUnit instance
        */
        collapse: function() {
            if (this._collapsed) {
                return this;
            }
            var retValue = this.fireEvent('beforeCollapse');
            if (retValue === false) {
                return this;
            }
            if (!this._clip) {
                this._createClip();
            }
            this._collapsing = true;
            var w = this.get('width'),
                h = this.get('height'),
                attr = {};
            this._lastWidth = w;
            this._lastHeight = h;
            this._lastScroll = this.get('scroll');
            this._lastScrollTop = this.body.scrollTop;            
            this.set('scroll', false, true);
            this._lastLeft = parseInt(this.get('element').style.left, 10);
            this._lastTop = parseInt(this.get('element').style.top, 10);
            if (isNaN(this._lastTop)) {
                this._lastTop = 0;
                this.set('top', 0);
            }
            if (isNaN(this._lastLeft)) {
                this._lastLeft = 0;
                this.set('left', 0);
            }
            this._zIndex = this.getStyle('zIndex');
            this.setStyle('zIndex', this.get('parent')._zIndex + 1);
            var pos = this.get('position');

            switch (pos) {
                case 'top':
                case 'bottom':
                    this.set('height', (this.get('collapseSize') + (this._gutter.top + this._gutter.bottom)));
                    attr = {
                        top: {
                            to: (this.get('top') - h)
                        }
                    };
                    if (pos == 'bottom') {
                        attr.top.to = (this.get('top') + h);
                    }
                    break;
                case 'left':
                case 'right':
                    this.set('width', (this.get('collapseSize') + (this._gutter.left + this._gutter.right)));
                    attr = {
                        left: {
                            to: -(this._lastWidth)
                        }
                    };
                    if (pos == 'right') {
                        attr.left = {
                            to: (this.get('left') + w)
                        };
                    }
                    break;
            }
            if (this._anim) {
                this._anim.attributes = attr;
                var collapse = function() {
                    this._collapsing = false;
                    this._toggleClip();
                    this.setStyle('zIndex', this.get('parent')._zIndex);
                    this._collapsed = true;
                    this.get('parent').resize();
                    this._anim.onComplete.unsubscribe(collapse, this, true);
                    this.fireEvent('collapse');
                };
                this._anim.onComplete.subscribe(collapse, this, true);
                this._anim.animate();
            } else {
                this._collapsing = false;
                this.setStyle('display', 'none');
                this._toggleClip();
                this.setStyle('zIndex', this.get('parent')._zIndex);
                this.get('parent').resize();
                this._collapsed = true;
                this.fireEvent('collapse');
            }
            return this;
        },
        /**
        * @method close
        * @description Close the unit, removing it from the parent Layout.
        * @return {<a href="YAHOO.widget.Layout.html">YAHOO.widget.Layout</a>} The parent Layout instance
        */
        close: function() {
            this.setStyle('display', 'none');
            this.get('parent').removeUnit(this);
            this.fireEvent('close');
            if (this._clip) {
                this._clip.parentNode.removeChild(this._clip);
                this._clip = null;
            }
            return this.get('parent');
        },
		/**
        * @property loadHandler
        * @description Callback method for the YUI Connection Manager used for load the body using AJAX. NOTE: e.responseText is loaded via innerHTML.
        * @type Object
        */
		loadHandler: {
            success: function(o) {
				this.body.innerHTML = o.responseText;
				this.resize (true);
            },
            failure: function(o) {
            }
        },
		/**
        * @property dataConnection
        * @description YUI Connection Manager handler
        * @type Object
        */
		dataConnection: null,
		/**
        * @private
        * @property _loading
        * @description During the loading process this variable will be true
        * @type Number
        */
        _loading: false,
		/**
        * @method loadContent
        * @description Loading the content of the unit using the connection manager
        * @return {object} YUI Connection Manager handler
        */
        loadContent: function() {
			// load dynamic content unless already loading or loaded and caching
			if (YAHOO.util.Connect && this.get('dataSrc') && !this._loading && !this.get('dataLoaded')) {
		        this._loading = true; 
		        Dom.addClass(this.body, this.LOADING_CLASSNAME);
				this.dataConnection = YAHOO.util.Connect.asyncRequest(
		            this.get('loadMethod'),
		            this.get('dataSrc'), 
		            {
		                success: function(o) {
		                    this.loadHandler.success.call(this, o);
		                    this.set('dataLoaded', true);
		                    this.dataConnection = null;
		                    Dom.removeClass(this.body, this.LOADING_CLASSNAME);
							this._loading = false;
							this.fireEvent('load');
		                },
		                failure: function(o) {
		                    this.loadHandler.failure.call(this, o);
		                    this.dataConnection = null;
		                    Dom.removeClass(this.body, this.LOADING_CLASSNAME);
		                    this._loading = false;
							this.fireEvent('loadError', { error: o });
		                },
		                scope: this,
		                timeout: this.get('dataTimeout')
		            }
		        );
				return this.dataConnection;
	        }
			return false;
        },
        /**
        * @private
        * @method init
        * @description The initalization method inherited from Element.
        */
        init: function(p_oElement, p_oAttributes) {
            this._gutter = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };
            this._sizes = {
                wrap: {
                    h: 0,
                    w: 0
                },
                header: {
                    h: 0,
                    w: 0
                },
                body: {
                    h: 0,
                    w: 0
                },
                footer: {
                    h: 0,
                    w: 0
                }
            };
            
            LayoutUnit.superclass.init.call(this, p_oElement, p_oAttributes);

            this.browser = this.get('parent').browser;
            
            var id = p_oElement;
            if (!Lang.isString(id)) {
                id = Dom.generateId(id);
            }
            LayoutUnit._instances[id] = this;

            this.setStyle('position', 'absolute');

            this.addClass('yui-layout-unit');
            this.addClass('yui-layout-unit-' + this.get('position'));


            var header = this.getElementsByClassName('yui-layout-hd', 'div')[0];
            if (header) {
                this.header = header;
            }
            var body = this.getElementsByClassName('yui-layout-bd', 'div')[0];
            if (body) {
                this.body = body;
            }
            var footer = this.getElementsByClassName('yui-layout-ft', 'div')[0];
            if (footer) {
                this.footer = footer;
            }

            this.on('contentChange', this.resize, this, true);
            this._lastScrollTop = 0;

            this.set('animate', this.get('animate'));
        },
        /**
        * @private
        * @method initAttributes
        * @description Processes the config
        */        
        initAttributes: function(attr) {
            LayoutUnit.superclass.initAttributes.call(this, attr);

            /**
            * @private
            * @attribute wrap
            * @description A reference to the wrap element
            * @type HTMLElement
            */
            this.setAttributeConfig('wrap', {
                value: attr.wrap || null,
                method: function(w) {
                    if (w) {
                        var id = Dom.generateId(w);
                        LayoutUnit._instances[id] = this;
                    }
                }
            });
            /**
            * @attribute grids
            * @description Set this option to true if you want the LayoutUnit to fix the first layer of YUI CSS Grids (margins)
            * @type Boolean
            */
            this.setAttributeConfig('grids', {
                value: attr.grids || false
            });
            /**
            * @private
            * @attribute top
            * @description The current top positioning of the Unit
            * @type Number
            */
            this.setAttributeConfig('top', {
                value: attr.top || 0,
                validator: Lang.isNumber,
                method: function(t) {
                    if (!this._collapsing) {
                        this.setStyle('top', t + 'px');
                    }
                }
            });
            /**
            * @private
            * @attribute left
            * @description The current left position of the Unit
            * @type Number
            */
            this.setAttributeConfig('left', {
                value: attr.left || 0,
                validator: Lang.isNumber,
                method: function(l) {
                    if (!this._collapsing) {
                        this.setStyle('left', l + 'px');
                    }
                }
            });

            /**
            * @attribute minWidth
            * @description The minWidth parameter passed to the Resize Utility
            * @type Number
            */
            this.setAttributeConfig('minWidth', {
                value: attr.minWidth || false,
                method: function(v) {
                    if (this._resize) {
                        this._resize.set('minWidth', v);
                    }
                },
                validator: YAHOO.lang.isNumber
            });

            /**
            * @attribute maxWidth
            * @description The maxWidth parameter passed to the Resize Utility
            * @type Number
            */
            this.setAttributeConfig('maxWidth', {
                value: attr.maxWidth || false,
                method: function(v) {
                    if (this._resize) {
                        this._resize.set('maxWidth', v);
                    }
                },
                validator: YAHOO.lang.isNumber
            });

            /**
            * @attribute minHeight
            * @description The minHeight parameter passed to the Resize Utility
            * @type Number
            */
            this.setAttributeConfig('minHeight', {
                value: attr.minHeight || false,
                method: function(v) {
                    if (this._resize) {
                        this._resize.set('minHeight', v);
                    }
                },
                validator: YAHOO.lang.isNumber
            });

            /**
            * @attribute maxHeight
            * @description The maxHeight parameter passed to the Resize Utility
            * @type Number
            */
            this.setAttributeConfig('maxHeight', {
                value: attr.maxHeight || false,
                method: function(v) {
                    if (this._resize) {
                        this._resize.set('maxHeight', v);
                    }
                },
                validator: YAHOO.lang.isNumber
            });

            /**
            * @attribute height
            * @description The height of the Unit
            * @type Number
            */
            this.setAttributeConfig('height', {
                value: attr.height,
                validator: Lang.isNumber,
                method: function(h) {
                    if (!this._collapsing) {
                        if (h < 0) {
                            h = 0;
                        }
                        this.setStyle('height', h + 'px');
                    }
                }
            });

            /**
            * @attribute width
            * @description The width of the Unit
            * @type Number
            */
            this.setAttributeConfig('width', {
                value: attr.width,
                validator: Lang.isNumber,
                method: function(w) {
                    if (!this._collapsing) {
                        if (w < 0) {
                            w = 0;
                        }
                        this.setStyle('width', w + 'px');
                    }
                }
            });
            /**
            * @attribute zIndex
            * @description The CSS zIndex to give to the unit, so you can have overlapping elements such as menus in a unit.
            * @type {Number}
            */
            this.setAttributeConfig('zIndex', {
                value: attr.zIndex || false,
                method: function(z) {
                    this.setStyle('zIndex', z);
                }
            });
            /**
            * @attribute position
            * @description The position (top, right, bottom, left or center) of the Unit in the Layout
            * @type {String}
            */
            this.setAttributeConfig('position', {
                value: attr.position
            });
            /**
            * @attribute gutter
            * @description The gutter that we should apply to the parent Layout around this Unit. Supports standard CSS markup: (2 4 0 5) or (2) or (2 5)
            * @type String
            */
            this.setAttributeConfig('gutter', {
                value: attr.gutter || 0,
                validator: YAHOO.lang.isString,
                method: function(gutter) {
                    var p = gutter.split(' ');
                    if (p.length) {
                        this._gutter.top = parseInt(p[0], 10);
                        if (p[1]) {
                            this._gutter.right = parseInt(p[1], 10);
                        } else {
                            this._gutter.right = this._gutter.top;
                        }
                        if (p[2]) {
                            this._gutter.bottom = parseInt(p[2], 10);
                        } else {
                            this._gutter.bottom = this._gutter.top;
                        }
                        if (p[3]) {
                            this._gutter.left = parseInt(p[3], 10);
                        } else if (p[1]) {
                            this._gutter.left = this._gutter.right;
                        } else {
                            this._gutter.left = this._gutter.top;
                        }
                    }
                }
            });
            /**
            * @attribute parent
            * @description The parent Layout that we are assigned to
            * @type {Object} YAHOO.widget.Layout
            */
            this.setAttributeConfig('parent', {
                writeOnce: true,
                value: attr.parent || false,
                method: function(p) {
                    if (p) {
                        p.on('resize', this.resize, this, true);
                    }

                }
            });
            /**
            * @attribute collapseSize
            * @description The pixel size of the Clip that we will collapse to
            * @type Number
            */
            this.setAttributeConfig('collapseSize', {
                value: attr.collapseSize || 25,
                validator: YAHOO.lang.isNumber
            });
            /**
            * @attribute duration
            * @description The duration to give the Animation Utility when animating the opening and closing of Units
            */
            this.setAttributeConfig('duration', {
                value: attr.duration || 0.5
            });
            /**
            * @attribute easing
            * @description The Animation Easing to apply to the Animation instance for this unit.
            */
            this.setAttributeConfig('easing', {
                value: attr.easing || ((YAHOO.util && YAHOO.util.Easing) ? YAHOO.util.Easing.BounceIn : 'false')
            });
            /**
            * @attribute animate
            * @description Use animation to collapse/expand the unit
            * @type Boolean
            */
            this.setAttributeConfig('animate', {
                value: ((attr.animate === false) ? false : true),
                validator: function() {
                    var anim = false;
                    if (YAHOO.util.Anim) {
                        anim = true;
                    }
                    return anim;
                },
                method: function(anim) {
                    if (anim) {
                        this._anim = new YAHOO.util.Anim(this.get('element'), {}, this.get('duration'), this.get('easing'));
                    } else {
                        this._anim = false;
                    }
                }
            });
            /**
            * @attribute header
            * @description The html to use as the Header of the Unit (sets via innerHTML)
            * @type {HTML}
            */
            this.setAttributeConfig('header', {
                value: attr.header || false,
                method: function(txt) {
                    if (txt === false) {
                        //Remove the footer
                        if (this.header) {
                            Dom.addClass(this.body, 'yui-layout-bd-nohd');
                            this.header.parentNode.removeChild(this.header);
                            this.header = null;
                        }
                    } else {
                        if (!this.header) {
                            var header = this.getElementsByClassName('yui-layout-hd', 'div')[0];
                            if (!header) {
                                header = this._createHeader();
                            }
                            this.header = header;
                        }
                        var h = this.header.getElementsByTagName('h2')[0];
                        if (!h) {
                            h = document.createElement('h2');
                            this.header.appendChild(h);
                        }
                        h.innerHTML = txt;
                        if (this.body) {
                            Dom.removeClass(this.body, 'yui-layout-bd-nohd');
                        }
                    }
                    this.fireEvent('contentChange', { target: 'header' });
                }
            });
            /**
            * @attribute proxy
            * @description Use the proxy config setting for the Resize Utility
            * @type Boolean
            */
            this.setAttributeConfig('proxy', {
                writeOnce: true,
                value: ((attr.proxy === false) ? false : true)
            });
            /**
            * @attribute body
            * @description The content for the body. If we find an element in the page with an id that matches the passed option we will move that element into the body of this unit. (sets via innerHTML)
            * @type {HTML}
            */
            this.setAttributeConfig('body', {
                value: attr.body || false,
                method: function(content) {
                    if (!this.body) {
                        var body = this.getElementsByClassName('yui-layout-bd', 'div')[0];
                        if (body) {
                            this.body = body;
                        } else {
                            body = document.createElement('div');
                            body.className = 'yui-layout-bd';
                            this.body = body;
                            this.get('wrap').appendChild(body);
                        }
                    }
                    if (!this.header) {
                        Dom.addClass(this.body, 'yui-layout-bd-nohd');
                    }
                    Dom.addClass(this.body, 'yui-layout-bd-noft');


                    var el = null;
                    if (Lang.isString(content)) {
                        el = Dom.get(content);
                    } else if (content && content.tagName) {
                        el = content;
                    }
                    if (el) {
                        var id = Dom.generateId(el);
                        LayoutUnit._instances[id] = this;
                        this.body.appendChild(el);
                    } else {
                        this.body.innerHTML = content;
                    }

                    this._cleanGrids();

                    this.fireEvent('contentChange', { target: 'body' });
                }
            });

            /**
            * @attribute footer
            * @description The content for the footer. If we find an element in the page with an id that matches the passed option we will move that element into the footer of this unit. (sets via innerHTML)
            * @type {HTML}
            */
            this.setAttributeConfig('footer', {
                value: attr.footer || false,
                method: function(content) {
                    if (content === false) {
                        //Remove the footer
                        if (this.footer) {
                            Dom.addClass(this.body, 'yui-layout-bd-noft');
                            this.footer.parentNode.removeChild(this.footer);
                            this.footer = null;
                        }
                    } else {
                        if (!this.footer) {
                            var ft = this.getElementsByClassName('yui-layout-ft', 'div')[0];
                            if (!ft) {
                                ft = document.createElement('div');
                                ft.className = 'yui-layout-ft';
                                this.footer = ft;
                                this.get('wrap').appendChild(ft);
                            } else {
                                this.footer = ft;
                            }
                        }
                        var el = null;
                        if (Lang.isString(content)) {
                            el = Dom.get(content);
                        } else if (content && content.tagName) {
                            el = content;
                        }
                        if (el) {
                            this.footer.appendChild(el);
                        } else {
                            this.footer.innerHTML = content;
                        }
                        Dom.removeClass(this.body, 'yui-layout-bd-noft');
                    }
                    this.fireEvent('contentChange', { target: 'footer' });
                }
            });
            /**
            * @attribute close
            * @description Adds a close icon to the unit
            */
            this.setAttributeConfig('close', {
                value: attr.close || false,
                method: function(close) {
                    //Position Center doesn't get this
                    if (this.get('position') == 'center') {
                        return false;
                    }
                    if (!this.header && close) {
                        this._createHeader();
                    }
                    if (!this.header) {
                        return;
                    }
                    var c = this.header ? Dom.getElementsByClassName('close', 'div', this.header)[0] : null;
                    
                    if (close) {
                        //Force some header text if there isn't any
                        if (!this.get('header')) {
                            this.set('header', '&nbsp;');
                        }
                        if (!c) {
                            c = document.createElement('div');
                            c.className = 'close';
                            this.header.appendChild(c);
                            Event.on(c, 'click', this.close, this, true);
                        }
                        c.title = this.STR_CLOSE;
                    } else if (c && c.parentNode) {
                        Event.purgeElement(c);
                        c.parentNode.removeChild(c);
                    }
                    this._configs.close.value = close;
                    this.set('collapse', this.get('collapse')); //Reset so we get the right classnames
                }
            });

            /**
            * @attribute collapse
            * @description Adds a collapse icon to the unit
            */
            this.setAttributeConfig('collapse', {
                value: attr.collapse || false,
                method: function(collapse) {
                    //Position Center doesn't get this
                    if (this.get('position') == 'center') {
                        return false;
                    }
                    if (!this.header && collapse) {
                        this._createHeader();
                    }
                    if (!this.header) {
                        return;
                    }
                    var c = this.header ? Dom.getElementsByClassName('collapse', 'div', this.header)[0] : null;
                    
                    if (collapse) {
                        //Force some header text if there isn't any
                        if (!this.get('header')) {
                            this.set('header', '&nbsp;');
                        }
                        if (!c) {
                            c = document.createElement('div');
                            this.header.appendChild(c);
                            Event.on(c, 'click', this.collapse, this, true);
                        }
                        c.title = this.STR_COLLAPSE;
                        c.className = 'collapse' + ((this.get('close')) ? ' collapse-close' : '');
                    } else if (c && c.parentNode) {
                        Event.purgeElement(c);
                        c.parentNode.removeChild(c);
                    }
                }
            });
            /**
            * @attribute scroll
            * @description Adds a class to the unit to allow for overflow: auto (yui-layout-scroll), default is overflow: hidden (yui-layout-noscroll). If true scroll bars will be placed on the element when the content exceeds the given area, false will put overflow hidden to hide the content. Passing null will render the content as usual overflow.
            * @type Boolean/Null
            */

            this.setAttributeConfig('scroll', {
                value: (((attr.scroll === true) || (attr.scroll === false) || (attr.scroll === null)) ? attr.scroll : false),
                method: function(scroll) {
                    if ((scroll === false) && !this._collapsed) { //Removing scroll bar
                        if (this.body) {
                            if (this.body.scrollTop > 0) {
                                this._lastScrollTop = this.body.scrollTop;
                            }
                        }
                    }
                    
                    if (scroll === true) {
                        this.addClass('yui-layout-scroll');
                        this.removeClass('yui-layout-noscroll');
                        if (this._lastScrollTop > 0) {
                            if (this.body) {
                                this.body.scrollTop = this._lastScrollTop;
                            }
                        }
                    } else if (scroll === false) {
                        this.removeClass('yui-layout-scroll');
                        this.addClass('yui-layout-noscroll');
                    } else if (scroll === null) {
                        this.removeClass('yui-layout-scroll');
                        this.removeClass('yui-layout-noscroll');
                    }
                }
            });
            /**
            * @attribute hover
            * @description Config option to pass to the Resize Utility
            */
            this.setAttributeConfig('hover', {
                writeOnce: true,
                value: attr.hover || false,
                validator: YAHOO.lang.isBoolean
            });
            /**
            * @attribute useShim
            * @description Config option to pass to the Resize Utility
            */
            this.setAttributeConfig('useShim', {
                value: attr.useShim || false,
                validator: YAHOO.lang.isBoolean,
                method: function(u) {
                    if (this._resize) {
                        this._resize.set('useShim', u);
                    }
                }
            });
            /**
            * @attribute resize
            * @description Should a Resize instance be added to this unit
            */

            this.setAttributeConfig('resize', {
                value: attr.resize || false,
                validator: function(r) {
                    if (YAHOO.util && YAHOO.util.Resize) {
                        return true;
                    }
                    return false;
                },
                method: function(resize) {
                    if (resize && !this._resize) {
                        //Position Center doesn't get this
                        if (this.get('position') == 'center') {
                            return false;
                        }
                        var handle = false; //To catch center
                        switch (this.get('position')) {
                            case 'top':
                                handle = 'b';
                                break;
                            case 'bottom':
                                handle = 't';
                                break;
                            case 'right':
                                handle = 'l';
                                break;
                            case 'left':
                                handle = 'r';
                                break;
                        }

                        this.setStyle('position', 'absolute'); //Make sure Resize get's a position
                        
                        if (handle) {
                            this._resize = new YAHOO.util.Resize(this.get('element'), {
                                proxy: this.get('proxy'),
                                hover: this.get('hover'),
                                status: false,
                                autoRatio: false,
                                handles: [handle],
                                minWidth: this.get('minWidth'),
                                maxWidth: this.get('maxWidth'),
                                minHeight: this.get('minHeight'),
                                maxHeight: this.get('maxHeight'),
                                height: this.get('height'),
                                width: this.get('width'),
                                setSize: false,
                                useShim: this.get('useShim'),
                                wrap: false
                            });
                            
                            this._resize._handles[handle].innerHTML = '<div class="yui-layout-resize-knob"></div>';

                            if (this.get('proxy')) {
                                var proxy = this._resize.getProxyEl();
                                proxy.innerHTML = '<div class="yui-layout-handle-' + handle + '"></div>';
                            }
                            this._resize.on('startResize', function(ev) {
                                this._lastScroll = this.get('scroll');
                                this.set('scroll', false);
                                if (this.get('parent')) {
                                    this.get('parent').fireEvent('startResize');
                                    var c = this.get('parent').getUnitByPosition('center');
                                    this._lastCenterScroll = c.get('scroll');
                                    c.addClass(this._resize.CSS_RESIZING);
                                    c.set('scroll', false);
                                }
                                this.fireEvent('startResize');
                            }, this, true);
                            this._resize.on('resize', function(ev) {
                                this.set('height', ev.height);
                                this.set('width', ev.width);
                            }, this, true);
                            this._resize.on('endResize', function(ev) {
                                this.set('scroll', this._lastScroll);
                                if (this.get('parent')) {
                                    var c = this.get('parent').getUnitByPosition('center');
                                    c.set('scroll', this._lastCenterScroll);
                                    c.removeClass(this._resize.CSS_RESIZING);
                                }
                                this.resize();
                                this.fireEvent('endResize');
                            }, this, true);
                        }
                    } else {
                        if (this._resize) {
                            this._resize.destroy();
                        }
                    }
                }
            });
			/**
	         * The unit data source, used for loading content dynamically.
	         * @attribute dataSrc
	         * @type String
	         */
	        this.setAttributeConfig('dataSrc', {
	            value: attr.dataSrc
	        });
	        /**
	         * The method to use for the data request.
	         * @attribute loadMethod
	         * @type String
	         * @default "GET"
	         */
	        this.setAttributeConfig('loadMethod', {
	            value: attr.loadMethod || 'GET',
	            validator: YAHOO.lang.isString
	        });	
	        /**
	         * Whether or not any data has been loaded from the server.
	         * @attribute dataLoaded
	         * @type Boolean
	         */        
	        this.setAttributeConfig('dataLoaded', {
	            value: false,
	            validator: YAHOO.lang.isBoolean,
	            writeOnce: true
	        });
	        /**
	         * Number if milliseconds before aborting and calling failure handler.
	         * @attribute dataTimeout
	         * @type Number
	         * @default null
	         */
	        this.setAttributeConfig('dataTimeout', {
	            value: attr.dataTimeout || null,
	            validator: YAHOO.lang.isNumber
	        });
        },
        /**
        * @private
        * @method _cleanGrids
        * @description This method attempts to clean up the first level of the YUI CSS Grids, YAHOO.util.Selector is required for this operation.
        */
        _cleanGrids: function() {
            if (this.get('grids')) {
                var b = Sel.query('div.yui-b', this.body, true);
                if (b) {
                    Dom.removeClass(b, 'yui-b');
                }
                Event.onAvailable('yui-main', function() {
                    Dom.setStyle(Sel.query('#yui-main'), 'margin-left', '0');
                    Dom.setStyle(Sel.query('#yui-main'), 'margin-right', '0');
                });
            }
        },
        /**
        * @private
        * @method _createHeader
        * @description Creates the HTMLElement for the header
        * @return {HTMLElement} The new HTMLElement
        */
        _createHeader: function() {
            var header = document.createElement('div');
            header.className = 'yui-layout-hd';
            if (this.get('firstChild')) {
                this.get('wrap').insertBefore(header, this.get('wrap').firstChild);
            } else {
                this.get('wrap').appendChild(header);
            }
            this.header = header;
            return header;
        },
        /**
        * @method destroy
        * @param {Boolean} force Don't report to the parent, because we are being called from the parent.
        * @description Removes this unit from the parent and cleans up after itself.
        * @return {<a href="YAHOO.widget.Layout.html">YAHOO.widget.Layout</a>} The parent Layout instance
        */
        destroy: function(force) {
            if (this._resize) {
                this._resize.destroy();
            }
            var par = this.get('parent');

            this.setStyle('display', 'none');
            if (this._clip) {
                this._clip.parentNode.removeChild(this._clip);
                this._clip = null;
            }

            if (!force) {
                par.removeUnit(this);
            }
            
            if (par) {
                par.removeListener('resize', this.resize, this, true);
            }
            this.unsubscribeAll();
            Event.purgeElement(this.get('element'), true);
            this.get('parentNode').removeChild(this.get('element'));

            delete YAHOO.widget.LayoutUnit._instances[this.get('id')];
            //Brutal Object Destroy
            for (var i in this) {
                if (Lang.hasOwnProperty(this, i)) {
                    this[i] = null;
                    delete this[i];
                }
            }
        
            return par;
        },
        /**
        * @method toString
        * @description Returns a string representing the LayoutUnit.
        * @return {String}
        */        
        toString: function() {
            if (this.get) {
                return 'LayoutUnit #' + this.get('id') + ' (' + this.get('position') + ')';
            }
            return 'LayoutUnit';
        }
    /**
    * @event resize
    * @description Fired when this.resize is called
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event startResize
    * @description Fired when the Resize Utility fires it's startResize Event.
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event endResize
    * @description Fired when the Resize Utility fires it's endResize Event.
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event beforeResize
    * @description Fired at the beginning of the resize method. If you return false, the resize is cancelled.
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event contentChange
    * @description Fired when the content in the header, body or footer is changed via the API
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event close
    * @description Fired when the unit is closed
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event beforeCollapse
    * @description Fired before the unit is collapsed. If you return false, the collapse is cancelled.
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event collapse
    * @description Fired when the unit is collapsed
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event expand
    * @description Fired when the unit is exanded
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event beforeExpand
    * @description Fired before the unit is exanded. If you return false, the collapse is cancelled.
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event load
    * @description Fired when data is loaded via the dataSrc config.
    * @type YAHOO.util.CustomEvent
    */
    /**
    * @event loadError
    * @description Fired when an error occurs loading data via the dataSrc config. Error message is passed as argument to this event.
    * @type YAHOO.util.CustomEvent
    */
    });

    YAHOO.widget.LayoutUnit = LayoutUnit;
})();
YAHOO.register("layout", YAHOO.widget.Layout, {version: "2.9.0", build: "2800"});
