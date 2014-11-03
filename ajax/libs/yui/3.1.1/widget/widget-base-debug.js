YUI.add('widget-base', function(Y) {

/**
 * Provides the base Widget class, with HTML Parser support
 *
 * @module widget
 */

/**
 * Provides the base Widget class
 *
 * @module widget
 * @submodule widget-base
 */
var L = Y.Lang,
    Node = Y.Node,

    ClassNameManager = Y.ClassNameManager,

    _getClassName = ClassNameManager.getClassName,
    _getWidgetClassName,

    _toInitialCap = Y.cached(function(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }),

    // K-Weight, IE GC optimizations
    CONTENT = "content",
    VISIBLE = "visible",
    HIDDEN = "hidden",
    DISABLED = "disabled",
    FOCUSED = "focused",
    WIDTH = "width",
    HEIGHT = "height",
    BOUNDING_BOX = "boundingBox",
    CONTENT_BOX = "contentBox",
    PARENT_NODE = "parentNode",
    OWNER_DOCUMENT = "ownerDocument",
    OFFSET_HEIGHT = "offsetHeight",
    AUTO = "auto",
    SRC_NODE = "srcNode",
    BODY = "body",
	TAB_INDEX = "tabIndex",
    ID = "id",
    RENDER = "render",
    RENDERED = "rendered",
    DESTROYED = "destroyed",
    STRINGS = "strings",
    DIV = "<div></div>",
    CHANGE = "Change",
    LOADING = "loading",
    _UISET = "_uiSet",

    EMPTY_STR = "",
    EMPTY_FN = function() {},

    UI_EVENT_REGEX = /(\w+):(\w+)/,
    UI_EVENT_REGEX_REPLACE = "$2",

    TRUE = true,
    FALSE = false,

    UI,
    ATTRS = {},
    UI_ATTRS = [VISIBLE, DISABLED, HEIGHT, WIDTH, FOCUSED],

    WEBKIT = Y.UA.webkit,
    IE = Y.UA.ie,

    ContentUpdate = "contentUpdate",

    //  Map of Node instances serving as a delegation containers for a specific
    //  event type to Widget instances using that delegation container.
    _delegates = {},

    // Widget nodeguid-to-instance map.
    _instances = {};

/**
 * A base class for widgets, providing:
 * <ul>
 *    <li>The render lifecycle method, in addition to the init and destroy 
 *        lifecycle methods provide by Base</li>
 *    <li>Abstract methods to support consistent MVC structure across 
 *        widgets: renderer, renderUI, bindUI, syncUI</li>
 *    <li>Support for common widget attributes, such as boundingBox, contentBox, visible, 
 *        disabled, focused, strings</li>
 * </ul>
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class Widget
 * @constructor
 * @extends Base
 */
function Widget(config) {
    Y.log('constructor called', 'life', 'widget');

    this._strs = {};

    this._cssPrefix = this.constructor.CSS_PREFIX || _getClassName(this.constructor.NAME.toLowerCase());

    Widget.superclass.constructor.apply(this, arguments);

    var render = this.get(RENDER), parentNode;
    if (render) {
        // Render could be a node or boolean
        if (render !== TRUE) {
            parentNode = render;
        }
        this.render(parentNode);
    }
}

/**
 * Static property provides a string to identify the class.
 * <p>
 * Currently used to apply class identifiers to the bounding box 
 * and to classify events fired by the widget.
 * </p>
 *
 * @property Widget.NAME
 * @type String
 * @static
 */
Widget.NAME = "widget";

/**
 * Constant used to identify state changes originating from
 * the DOM (as opposed to the JavaScript model).
 *
 * @property Widget.UI_SRC
 * @type String
 * @static
 * @final
 */
UI = Widget.UI_SRC = "ui";

/**
 * Static property used to define the default attribute 
 * configuration for the Widget.
 * 
 * @property Widget.ATTRS
 * @type Object
 * @static
 */
Widget.ATTRS = ATTRS;

// Trying to optimize kweight by setting up attrs this way saves about 0.4K min'd

/**
 * @attribute id
 * @writeOnce
 * @default Generated using guid()
 * @type String
 */

ATTRS[ID] = {
    valueFn: "_guid",
    writeOnce: TRUE
};

/**
 * Flag indicating whether or not this Widget
 * has been through the render lifecycle phase.
 *
 * @attribute rendered
 * @readOnly
 * @default false
 * @type boolean
 */
ATTRS[RENDERED] = {
    value:FALSE,
    readOnly: TRUE
};

/**
 * @attribute boundingBox
 * @description The outermost DOM node for the Widget, used for sizing and positioning 
 * of a Widget as well as a containing element for any decorator elements used 
 * for skinning.
 * @type String | Node
 * @writeOnce
 */
ATTRS[BOUNDING_BOX] = {
    value:null,
    setter: "_setBB",
    writeOnce: TRUE
};

/**
 * @attribute contentBox
 * @description A DOM node that is a direct descendent of a Widget's bounding box that 
 * houses its content.
 * @type String | Node
 * @writeOnce
 */
ATTRS[CONTENT_BOX] = {
    valueFn:"_defaultCB",
    setter: "_setCB",
    writeOnce: TRUE
};

/**
 * @attribute tabIndex
 * @description Number (between -32767 to 32767) indicating the widget's 
 * position in the default tab flow.  The value is used to set the 
 * "tabIndex" attribute on the widget's bounding box.  Negative values allow
 * the widget to receive DOM focus programmatically (by calling the focus
 * method), while being removed from the default tab flow.  A value of 
 * null removes the "tabIndex" attribute from the widget's bounding box.
 * @type Number
 * @default 0
 */
ATTRS[TAB_INDEX] = {
	value: null,
	validator: "_validTabIndex"
};

/**
 * @attribute focused
 * @description Boolean indicating if the Widget, or one of its descendants, 
 * has focus.
 * @readOnly
 * @default false
 * @type boolean
 */
ATTRS[FOCUSED] = {
    value: FALSE,
    readOnly:TRUE
};

/**
 * @attribute disabled
 * @description Boolean indicating if the Widget should be disabled. The disabled implementation
 * is left to the specific classes extending widget.
 * @default false
 * @type boolean
 */
ATTRS[DISABLED] = {
    value: FALSE
};

/**
 * @attribute visible
 * @description Boolean indicating weather or not the Widget is visible.
 * @default TRUE
 * @type boolean
 */
ATTRS[VISIBLE] = {
    value: TRUE
};

/**
 * @attribute height
 * @description String with units, or number, representing the height of the Widget. If a number is provided,
 * the default unit, defined by the Widgets DEF_UNIT, property is used.
 * @default EMPTY_STR
 * @type {String | Number}
 */
ATTRS[HEIGHT] = {
    value: EMPTY_STR
};

/**
 * @attribute width
 * @description String with units, or number, representing the width of the Widget. If a number is provided,
 * the default unit, defined by the Widgets DEF_UNIT, property is used.
 * @default EMPTY_STR
 * @type {String | Number}
 */
ATTRS[WIDTH] = {
    value: EMPTY_STR
};

/**
 * @attribute strings
 * @description Collection of strings used to label elements of the Widget's UI.
 * @default null
 * @type Object
 */
ATTRS[STRINGS] = {
    value: {},
    setter: "_strSetter",
    getter: "_strGetter"
};

/**
 * Whether or not to render the widget automatically after init, and optionally, to which parent node.
 *
 * @attribute render
 * @type boolean | Node
 * @writeOnce
 */
ATTRS[RENDER] = {
    value:FALSE,
    writeOnce:TRUE
};

/**
 * The css prefix which the static Widget.getClassName method should use when constructing class names
 *
 * @property Widget.CSS_PREFIX
 * @type String
 * @default Widget.NAME.toLowerCase()
 * @private
 * @static
 */
Widget.CSS_PREFIX = _getClassName(Widget.NAME.toLowerCase());

/**
 * Generate a standard prefixed classname for the Widget, prefixed by the default prefix defined
 * by the <code>Y.config.classNamePrefix</code> attribute used by <code>ClassNameManager</code> and 
 * <code>Widget.NAME.toLowerCase()</code> (e.g. "yui-widget-xxxxx-yyyyy", based on default values for 
 * the prefix and widget class name).
 * <p>
 * The instance based version of this method can be used to generate standard prefixed classnames,
 * based on the instances NAME, as opposed to Widget.NAME. This method should be used when you
 * need to use a constant class name across different types instances.
 * </p>
 * @method getClassName
 * @param {String*} args* 0..n strings which should be concatenated, using the default separator defined by ClassNameManager, to create the class name
 */
Widget.getClassName = function() {
    // arguments needs to be array'fied to concat
    return _getClassName.apply(ClassNameManager, [Widget.CSS_PREFIX].concat(Y.Array(arguments), true));
};

_getWidgetClassName = Widget.getClassName;

/**
 * Returns the widget instance whose bounding box contains, or is, the given node. 
 * <p>
 * In the case of nested widgets, the nearest bounding box ancestor is used to
 * return the widget instance.
 * </p>
 * @method Widget.getByNode
 * @static
 * @param node {Node | String} The node for which to return a Widget instance. If a selector
 * string is passed in, which selects more than one node, the first node found is used.
 * @return {Widget} Widget instance, or null if not found.
 */
Widget.getByNode = function(node) {
    var widget,
        widgetMarker = _getWidgetClassName();

    node = Node.one(node);
    if (node) {
        node = node.ancestor("." + widgetMarker, true);
        if (node) {
            widget = _instances[Y.stamp(node, TRUE)];
        }
    }

    return widget || null;
};

Y.extend(Widget, Y.Base, {

	/**
	 * Returns a class name prefixed with the the value of the 
	 * <code>YUI.config.classNamePrefix</code> attribute + the instances <code>NAME</code> property.
	 * Uses <code>YUI.config.classNameDelimiter</code> attribute to delimit the provided strings.
	 * e.g. 
	 * <code>
	 * <pre>
	 *    // returns "yui-slider-foo-bar", for a slider instance
	 *    var scn = slider.getClassName('foo','bar');
	 *
	 *    // returns "yui-overlay-foo-bar", for an overlay instance
	 *    var ocn = overlay.getClassName('foo','bar');
	 * </pre>
	 * </code>
	 *
	 * @method getClassName
	 * @param {String}+ One or more classname bits to be joined and prefixed
	 */
	getClassName: function () {
        return _getClassName.apply(ClassNameManager, [this._cssPrefix].concat(Y.Array(arguments), true));
	},

    /**
     * Returns the name of the skin that's currently applied to the widget.
     * This is only really useful after the widget's DOM structure is in the
     * document, either by render or by progressive enhancement.  Searches up
     * the Widget's ancestor axis for a class yui3-skin-(name), and returns the
     * (name) portion.  Otherwise, returns null.
     *
     * @method getSkinName
     * @return {String} the name of the skin, or null (yui3-skin-sam => sam)
     */
    getSkinName: function () {
        var root = this.get( CONTENT_BOX ) || this.get( BOUNDING_BOX ),
            search = new RegExp( '\\b' + _getClassName( 'skin' ) + '-(\\S+)' ),
            match;

        if ( root ) {
            root.ancestor( function ( node ) {
                match = node.get( 'className' ).match( search );
                return match;
            } );
        }

        return ( match ) ? match[1] : null;
    },

    /**
     * Initializer lifecycle implementation for the Widget class. Registers the 
     * widget instance, and runs through the Widget's HTML_PARSER definition. 
     *
     * @method initializer
     * @protected
     * @param  config {Object} Configuration object literal for the widget
     */
    initializer: function(config) {
        Y.log('initializer called', 'life', 'widget');

        _instances[Y.stamp(this.get(BOUNDING_BOX))] = this;

        /**
         * Notification event, which widget implementations can fire, when
         * they change the content of the widget. This event has no default
         * behavior and cannot be prevented, so the "on" or "after"
         * moments are effectively equivalent (with on listeners being invoked before 
         * after listeners).
         *
         * @event widget:contentUpdate
         * @preventable false
         * @param {EventFacade} e The Event Facade
         */
        this.publish(ContentUpdate, { preventable:FALSE });

        if (this._applyParser) {
            this._applyParser(config);
        }
    },

    /**
     * Destructor lifecycle implementation for the Widget class. Purges events attached
     * to the bounding box (and all child nodes) and removes the Widget from the 
     * list of registered widgets.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        Y.log('destructor called', 'life', 'widget');

        var boundingBox = this.get(BOUNDING_BOX),
            bbGuid = Y.stamp(boundingBox, TRUE),
            widgetGuid = Y.stamp(this, TRUE);

        if (bbGuid in _instances) {
            delete _instances[bbGuid];
        }

        Y.each(_delegates, function (info) {
            if (info.instances[widgetGuid]) {
                //  Unregister this Widget instance as needing this delegated
                //  event listener.
                delete info.instances[widgetGuid];

                //  There are no more Widget instances using this delegated 
                //  event listener, so detach it.
                if (Y.Object.size(info.instances) === 0) {
                    info.handle.detach();
                }
            }
        });

        this._unbindUI(boundingBox);
        boundingBox.remove(TRUE);
    },

    /**
     * Establishes the initial DOM for the widget. Invoking this
     * method will lead to the creating of all DOM elements for
     * the widget (or the manipulation of existing DOM elements 
     * for the progressive enhancement use case).
     * <p>
     * This method should only be invoked once for an initialized
     * widget.
     * </p>
     * <p>
     * It delegates to the widget specific renderer method to do
     * the actual work.
     * </p>
     *
     * @method render
     * @chainable
     * @final 
     * @param  parentNode {Object | String} Optional. The Node under which the 
     * Widget is to be rendered. This can be a Node instance or a CSS selector string. 
     * <p>
     * If the selector string returns more than one Node, the first node will be used 
     * as the parentNode. NOTE: This argument is required if both the boundingBox and contentBox
     * are not currently in the document. If it's not provided, the Widget will be rendered
     * to the body of the current document in this case.
     * </p>
     */
    render: function(parentNode) {
        if (this.get(DESTROYED)) { Y.log("Render failed; widget has been destroyed", "error", "widget"); }

        if (!this.get(DESTROYED) && !this.get(RENDERED)) {
             /**
              * Lifcyle event for the render phase, fired prior to rendering the UI 
              * for the widget (prior to invoking the widget's renderer method).
              * <p>
              * Subscribers to the "on" moment of this event, will be notified 
              * before the widget is rendered.
              * </p>
              * <p>
              * Subscribers to the "after" moment of this event, will be notified
              * after rendering is complete.
              * </p>
              *
              * @event widget:render
              * @preventable _defRenderFn
              * @param {EventFacade} e The Event Facade
              */
            this.publish(RENDER, {
                queuable:FALSE,
                fireOnce:TRUE,
                defaultTargetOnly:TRUE,
                defaultFn: this._defRenderFn
            });

            this.fire(RENDER, {parentNode: (parentNode) ? Node.one(parentNode) : null});
        }
        return this;
    },

    /**
     * Default render handler
     *
     * @method _defRenderFn
     * @protected
     * @param {EventFacade} e The Event object
     * @param {Node} parentNode The parent node to render to, if passed in to the <code>render</code> method
     */
    _defRenderFn : function(e) {
        this._parentNode = e.parentNode;
         
        this.renderer();
        this._set(RENDERED, TRUE);

        this._removeLoadingClassNames();
    },

    /**
     * Creates DOM (or manipulates DOM for progressive enhancement)
     * This method is invoked by render() and is not chained 
     * automatically for the class hierarchy (unlike initializer, destructor) 
     * so it should be chained manually for subclasses if required.
     *
     * @method renderer
     * @protected
     */
    renderer: function() {
        this._renderUI();
        this.renderUI();

        this._bindUI();
        this.bindUI();

        this._syncUI();
        this.syncUI();
    },

    /**
     * Configures/Sets up listeners to bind Widget State to UI/DOM
     * 
     * This method is not called by framework and is not chained 
     * automatically for the class hierarchy.
     * 
     * @method bindUI
     * @protected
     */
    bindUI: EMPTY_FN,

    /**
     * Adds nodes to the DOM 
     * 
     * This method is not called by framework and is not chained 
     * automatically for the class hierarchy.
     * 
     * @method renderUI
     * @protected
     */
    renderUI: EMPTY_FN,

    /**
     * Refreshes the rendered UI, based on Widget State
     * 
     * This method is not called by framework and is not chained
     * automatically for the class hierarchy.
     *
     * @method syncUI
     * @protected
     *
     */
    syncUI: EMPTY_FN,

    /**
     * @method hide
     * @description Hides the Widget by setting the "visible" attribute to "false".
     * @chainable
     */
    hide: function() {
        return this.set(VISIBLE, FALSE);
    },

    /**
     * @method show
     * @description Shows the Widget by setting the "visible" attribute to "true".
     * @chainable
     */
    show: function() {
        return this.set(VISIBLE, TRUE);
    },

    /**
     * @method focus
     * @description Causes the Widget to receive the focus by setting the "focused" 
     * attribute to "true".
     * @chainable
     */
    focus: function () {
        return this._set(FOCUSED, TRUE);
    },

    /**
     * @method blur
     * @description Causes the Widget to lose focus by setting the "focused" attribute 
     * to "false"
     * @chainable
     */
    blur: function () {
        return this._set(FOCUSED, FALSE);
    },

    /**
     * @method enable
     * @description Set the Widget's "disabled" attribute to "false".
     * @chainable
     */
    enable: function() {
        return this.set(DISABLED, FALSE);
    },

    /**
     * @method disable
     * @description Set the Widget's "disabled" attribute to "true".
     * @chainable
     */
    disable: function() {
        return this.set(DISABLED, TRUE);
    },

    /**
     * @method _uiSizeCB
     * @protected
     * @param {boolean} expand
     */
    _uiSizeCB : function(expand) {

        var bb = this.get(BOUNDING_BOX),
            cb = this.get(CONTENT_BOX),

            bbTempExpanding = _getWidgetClassName("tmp", "forcesize"),

            borderBoxSupported = this._bbs,
            heightReallyMinHeight = IE && IE < 7;

        if (borderBoxSupported) {
            cb.toggleClass(_getWidgetClassName(CONTENT, "expanded"), expand);
        } else {
            if (expand) {
                if (heightReallyMinHeight) {
                    bb.addClass(bbTempExpanding);
                }

                cb.set(OFFSET_HEIGHT, bb.get(OFFSET_HEIGHT));

                if (heightReallyMinHeight) {
                    bb.removeClass(bbTempExpanding);
                }
            } else {
                cb.setStyle(HEIGHT, EMPTY_STR);
            }
        }
    },

    /**
     * Helper method to collect the boundingBox and contentBox, set styles and append to the provided parentNode, if not
     * already a child. The owner document of the boundingBox, or the owner document of the contentBox will be used 
     * as the document into which the Widget is rendered if a parentNode is node is not provided. If both the boundingBox and
     * the contentBox are not currently in the document, and no parentNode is provided, the widget will be rendered 
     * to the current document's body.
     *
     * @method _renderBox
     * @private
     * @param {Node} parentNode The parentNode to render the widget to. If not provided, and both the boundingBox and
     * the contentBox are not currently in the document, the widget will be rendered to the current document's body.
     */
    _renderBox: function(parentNode) {

        // TODO: Performance Optimization [ More effective algo to reduce Node refs, compares, replaces? ]

        var contentBox = this.get(CONTENT_BOX),
            boundingBox = this.get(BOUNDING_BOX),
            srcNode = this.get(SRC_NODE),
            defParentNode = this.DEF_PARENT_NODE,

            doc = (srcNode && srcNode.get(OWNER_DOCUMENT)) || boundingBox.get(OWNER_DOCUMENT) || contentBox.get(OWNER_DOCUMENT);

        // If srcNode (assume it's always in doc), have contentBox take its place (widget render responsible for re-use of srcNode contents)
        if (srcNode && !srcNode.compareTo(contentBox) && !contentBox.inDoc(doc)) {
            srcNode.replace(contentBox);
        }

        if (!boundingBox.compareTo(contentBox.get(PARENT_NODE)) && !boundingBox.compareTo(contentBox)) {
            // If contentBox box is already in the document, have boundingBox box take it's place
            if (contentBox.inDoc(doc)) {
                contentBox.replace(boundingBox);
            }
            boundingBox.appendChild(contentBox);
        }

        parentNode = parentNode || (defParentNode && Node.one(defParentNode));

        if (parentNode) {
            parentNode.appendChild(boundingBox);
        } else if (!boundingBox.inDoc(doc)) {
            Node.one(BODY).insert(boundingBox, 0);
        }

        this._bbs = !(IE && IE < 8 && doc.compatMode != "BackCompat");
    },

    /**
     * Setter for the boundingBox attribute
     *
     * @method _setBB
     * @private
     * @param Node/String
     * @return Node
     */
    _setBB: function(node) {
        return this._setBox(this.get(ID), node, this.BOUNDING_TEMPLATE);
    },

    /**
     * Setter for the contentBox attribute
     *
     * @method _setCB
     * @private
     * @param {Node|String} node
     * @return Node
     */
    _setCB: function(node) {
        return (this.CONTENT_TEMPLATE === null) ? this.get(BOUNDING_BOX) : this._setBox(null, node, this.CONTENT_TEMPLATE);
    },

    /**
     * Returns the default value for the contentBox attribute. 
     *
     * For the Widget class, this will be the srcNode if provided, otherwise null (resulting in
     * a new contentBox node instance being created)
     *
     * @method _defaultCB
     * @protected
     */
    _defaultCB : function(node) {
        return this.get(SRC_NODE) || null;
    },

    /**
     * Helper method to set the bounding/content box, or create it from
     * the provided template if not found.
     *
     * @method _setBox
     * @private
     *
     * @param {String} id The node's id attribute
     * @param {Node|String} node The node reference
     * @param {String} template HTML string template for the node
     * @return {Node} The node
     */
    _setBox : function(id, node, template) {
        node = Node.one(node) || Node.create(template);
        if (!node.get(ID)) {
            node.set(ID, id || Y.guid());
        }
        return node;
    },

    /**
     * Initializes the UI state for the Widget's bounding/content boxes.
     *
     * @method _renderUI
     * @protected
     */
    _renderUI: function() {
        this._renderBoxClassNames();
        this._renderBox(this._parentNode);
    },

    /**
     * Applies standard class names to the boundingBox and contentBox
     *
     * @method _renderBoxClassNames
     * @protected
     */
    _renderBoxClassNames : function() {
        var classes = this._getClasses(),
            cl,
            boundingBox = this.get(BOUNDING_BOX),
            i;

        boundingBox.addClass(_getWidgetClassName());

        // Start from Widget Sub Class
        for (i = classes.length-3; i >= 0; i--) {
            cl = classes[i];
            boundingBox.addClass(cl.CSS_PREFIX || _getClassName(cl.NAME.toLowerCase()));
        }

        // Use instance based name for content box
        this.get(CONTENT_BOX).addClass(this.getClassName(CONTENT));
    },


    /**
     * Removes class names representative of the widget's loading state from 
     * the boundingBox.
     *
     * @method _removeLoadingClassNames
     * @protected
     */
    _removeLoadingClassNames: function () {

        var boundingBox = this.get(BOUNDING_BOX),
            contentBox = this.get(CONTENT_BOX);

        boundingBox.removeClass(_getWidgetClassName(LOADING));
        boundingBox.removeClass(this.getClassName(LOADING));
        
        contentBox.removeClass(_getWidgetClassName(LOADING));
        contentBox.removeClass(this.getClassName(LOADING));
        
    },

    /**
     * Sets up DOM and CustomEvent listeners for the widget.
     *
     * @method _bindUI
     * @protected
     */
    _bindUI: function() {
        this._bindAttrUI(this._BIND_UI_ATTRS);
        this._bindDOM();
    },

    /**
     * @method _unbindUI
     * @protected
     */
    _unbindUI : function(boundingBox) {
        this._unbindDOM(boundingBox);
    },

    /**
     * Sets up DOM listeners, on elements rendered by the widget.
     * 
     * @method _bindDOM
     * @protected
     */
    _bindDOM : function() {
		var oDocument = this.get(BOUNDING_BOX).get(OWNER_DOCUMENT);

        // TODO: Perf Optimization: Use Widget.getByNode delegation, to get by 
        // with just one _onDocFocus subscription per sandbox, instead of one per widget
		this._hDocFocus = oDocument.on("focus", this._onDocFocus, this);

		//	Fix for Webkit:
		//	Document doesn't receive focus in Webkit when the user mouses 
		//	down on it, so the "focused" attribute won't get set to the 
		//	correct value.
		if (WEBKIT) {
			this._hDocMouseDown = oDocument.on("mousedown", this._onDocMouseDown, this);
		}
    },

    /**
     * @method _unbindDOM
     * @protected
     */   
    _unbindDOM : function(boundingBox) {
        if (this._hDocFocus) {
            this._hDocFocus.detach();
        }

        if (WEBKIT && this._hDocMouseDown) {
            this._hDocMouseDown.detach();
        }
    },

    /**
     * Updates the widget UI to reflect the attribute state.
     *
     * @method _syncUI
     * @protected
     */
    _syncUI: function() {
        this._syncAttrUI(this._SYNC_UI_ATTRS);
    },

    /**
     * Sets the height on the widget's bounding box element
     *
     * @method _uiSetHeight
     * @protected
     * @param {String | Number} val
     */
    _uiSetHeight: function(val) {
        this._uiSetDim(HEIGHT, val);
        this._uiSizeCB((val !== EMPTY_STR && val !== AUTO));
    },

    /**
     * Sets the width on the widget's bounding box element
     *
     * @method _uiSetWidth
     * @protected
     * @param {String | Number} val
     */
    _uiSetWidth: function(val) {
        this._uiSetDim(WIDTH, val);
    },

    /**
     * @method _uiSetDim
     * @private
     * @param {String} dim The dimension - "width" or "height"
     * @param {Number | String} val The value to set
     */
    _uiSetDim: function(dimension, val) {
        this.get(BOUNDING_BOX).setStyle(dimension, L.isNumber(val) ? val + this.DEF_UNIT : val);
    },

    /**
     * Sets the visible state for the UI
     * 
     * @method _uiSetVisible
     * @protected
     * @param {boolean} val
     */
    _uiSetVisible: function(val) {
        this.get(BOUNDING_BOX).toggleClass(this.getClassName(HIDDEN), !val);
    },

    /**
     * Sets the disabled state for the UI
     *
     * @protected
     * @param {boolean} val
     */
    _uiSetDisabled: function(val) {
        this.get(BOUNDING_BOX).toggleClass(this.getClassName(DISABLED), val);
    },

    /**
     * Sets the focused state for the UI
     *
     * @protected
     * @param {boolean} val
     * @param {string} src String representing the source that triggered an update to 
     * the UI.     
     */
    _uiSetFocused: function(val, src) {
         var boundingBox = this.get(BOUNDING_BOX);

         boundingBox.toggleClass(this.getClassName(FOCUSED), val);
         if (src !== UI) {
            if (val) {
                boundingBox.focus();  
            } else {
                boundingBox.blur();
            }
         }
    },

    /**
     * Set the tabIndex on the widget's rendered UI
     *
     * @method _uiSetTabIndex
     * @protected
     * @param Number
     */
    _uiSetTabIndex: function(index) {
		var boundingBox = this.get(BOUNDING_BOX);

		if (L.isNumber(index)) {
			boundingBox.set(TAB_INDEX, index);
		} else {
			boundingBox.removeAttribute(TAB_INDEX);
		}
    },

	/**
	 * @method _onDocMouseDown
	 * @description "mousedown" event handler for the owner document of the 
	 * widget's bounding box.
	 * @protected
     * @param {EventFacade} evt The event facade for the DOM focus event
	 */
	_onDocMouseDown: function (evt) {
		if (this._hasDOMFocus) {
 			this._onDocFocus(evt);
		}
	},

    /**
     * DOM focus event handler, used to sync the state of the Widget with the DOM
     * 
     * @method _onDocFocus
     * @protected
     * @param {EventFacade} evt The event facade for the DOM focus event
     */
    _onDocFocus: function (evt) {
		var bFocused = this.get(BOUNDING_BOX).contains(evt.target); // contains() checks invoking node also

		this._hasDOMFocus = bFocused;
        this._set(FOCUSED, bFocused, { src: UI });
    },

    /**
     * Generic toString implementation for all widgets.
     *
     * @method toString
     * @return {String} The default string value for the widget [ displays the NAME of the instance, and the unique id ]
     */
    toString: function() {
        return this.constructor.NAME + "[" + this.get(ID) + "]";
    },

    /**
     * Default unit to use for dimension values
     * 
     * @property DEF_UNIT
     * @type String
     */
    DEF_UNIT : "px",

    /** 
     * Default node to render the bounding box to. If not set,
     * will default to the current document body.
     * 
     * @property DEF_PARENT_NODE
     * @type String | Node
     */ 
    DEF_PARENT_NODE : null,

    /**
     * Property defining the markup template for content box. If your Widget doesn't
     * need the dual boundingBox/contentBox structure, set CONTENT_TEMPLATE to null,
     * and contentBox and boundingBox will both point to the same Node. 
     *
     * @property CONTENT_TEMPLATE
     * @type String
     */
    CONTENT_TEMPLATE : DIV,

    /**
     * Property defining the markup template for bounding box.
     *
     * @property BOUNDING_TEMPLATE
     * @type String
     */
    BOUNDING_TEMPLATE : DIV,

    /**
     * @method _guid
     * @protected
     */
    _guid : function() {
        return Y.guid();
    },

    /**
     * @method _validTabIndex
     * @protected
     * @param {Number} tabIndex
     */
    _validTabIndex : function (tabIndex) {
        return (L.isNumber(tabIndex) || L.isNull(tabIndex));
    },

    /**
     * Binds after listeners for the list of attributes provided
     * 
     * @method _bindAttrUI
     * @private
     * @param {Array} attrs
     */
    _bindAttrUI : function(attrs) {
        var i, 
            l = attrs.length; 

        for (i = 0; i < l; i++) {
            this.after(attrs[i] + CHANGE, this._setAttrUI);
        }
    },

    /**
     * Invokes the _uiSet&#61;ATTR NAME&#62; method for the list of attributes provided  
     *
     * @method _syncAttrUI
     * @private
     * @param {Array} attrs
     */
    _syncAttrUI : function(attrs) {
        var i, l = attrs.length, attr;
        for (i = 0; i < l; i++) {
            attr = attrs[i];
            this[_UISET + _toInitialCap(attr)](this.get(attr));
        }
    },

    /**
     * @method _setAttrUI
     * @private
     * @param {EventFacade} e
     */
    _setAttrUI : function(e) {
        this[_UISET + _toInitialCap(e.attrName)](e.newVal, e.src);
    },

    /**
     * The default setter for the strings attribute. Merges partial sets
     * into the full string set, to allow users to partial sets of strings  
     *
     * @method _strSetter
     * @protected
     * @param {Object} strings
     * @return {String} The full set of strings to set
     */
    _strSetter : function(strings) {
        return Y.merge(this.get(STRINGS), strings);
    },

    /**
     * Helper method to get a specific string value
     *
     * @deprecated Used by deprecated WidgetLocale implementations. 
     * @method getString
     * @param {String} key
     * @return {String} The string
     */
    getString : function(key) {
        return this.get(STRINGS)[key];
    },

    /**
     * Helper method to get the complete set of strings for the widget
     *
     * @deprecated  Used by deprecated WidgetLocale implementations.
     * @method getString
     * @param {String} key
     * @return {String} The string
     */
    getStrings : function() {
        return this.get(STRINGS);
    },

    /**
     * The list of UI attributes to bind for Widget's _bindUI implementation
     *
     * @property _BIND_UI_ATTRS
     * @type Array
     * @private
     */
    _BIND_UI_ATTRS : UI_ATTRS,

    /**
     * The list of UI attributes to sync for Widget's _syncUI implementation
     *
     * @property _SYNC_UI_ATTRS
     * @type Array
     * @private
     */
    _SYNC_UI_ATTRS : UI_ATTRS.concat(TAB_INDEX),

    /**
     * Map of DOM events that should be fired as Custom Events by the  
     * Widget instance.
     *
     * @property UI_EVENTS
     * @type Object
     */
    UI_EVENTS: Y.Node.DOM_EVENTS,

    /**
     * Returns the node on which to bind delegate listeners.
     *
     * @method _getUIEventNode
     * @protected
     */
    _getUIEventNode: function () {
        return this.get(BOUNDING_BOX);
    },

    /**
     * Binds a delegated DOM event listener of the specified type to the 
     * Widget's outtermost DOM element to facilitate the firing of a Custom
     * Event of the same type for the Widget instance.  
     *
     * @private
     * @method _createUIEvent
     * @param type {String} String representing the name of the event
     */
    _createUIEvent: function (type) {

        var uiEvtNode = this._getUIEventNode(),
            parentNode = uiEvtNode.get(PARENT_NODE),
            key = (Y.stamp(parentNode) + type),
            info = _delegates[key],
            handle;

        //  For each Node instance: Ensure that there is only one delegated 
        //  event listener used to fire Widget UI events.

        if (!info) {

            Y.log("Creating delegate for the " + type + " event.", "info", "widget");

            handle = parentNode.delegate(type, function (evt) {

                var widget = Widget.getByNode(this);

                //  Make the DOM event a property of the custom event
                //  so that developers still have access to it.
                widget.fire(evt.type, { domEvent: evt });

            }, "." + _getWidgetClassName());

            _delegates[key] = info = { instances: {}, handle: handle };

        }

        //  Register this Widget as using this Node as a delegation container.
        info.instances[Y.stamp(this)] = 1;

    },

    /**
     * Determines if the specified event is a UI event.
     *
     * @private
     * @method _isUIEvent
     * @param type {String} String representing the name of the event
     * @return {String} Event Returns the name of the UI Event, otherwise 
     * undefined.
     */
    _getUIEvent: function (type) {
        if (L.isString(type)) {
            var sType = type.replace(UI_EVENT_REGEX, UI_EVENT_REGEX_REPLACE),
                returnVal;

            if (this.UI_EVENTS[sType]) {
                returnVal = sType;
            }

            return returnVal;
        }
    },

    /**
     * Sets up infastructure required to fire a UI event.
     * 
     * @private
     * @method _initUIEvent
     * @param type {String} String representing the name of the event
     * @return {String}     
     */
    _initUIEvent: function (type) {
        var sType = this._getUIEvent(type),
            queue = this._uiEvtsInitQueue || {};

        if (sType && !queue[sType]) {
            Y.log("Deferring creation of " + type + " delegate until render.", "info", "widget");

            this._uiEvtsInitQueue = queue[sType] = 1;

            this.after(RENDER, function() { 
                this._createUIEvent(sType);
                delete this._uiEvtsInitQueue[sType];
            });
        }
    },

    //  Override of "on" from Base to facilitate the firing of Widget events
    //  based on DOM events of the same name/type (e.g. "click", "mouseover").
    //  Temporary solution until we have the ability to listen to when 
    //  someone adds an event listener (bug 2528230)
    on: function (type) {
        this._initUIEvent(type);
        return Widget.superclass.on.apply(this, arguments);
    },

    //  Override of "after" from Base to facilitate the firing of Widget events
    //  based on DOM events of the same name/type (e.g. "click", "mouseover").    
    //  Temporary solution until we have the ability to listen to when 
    //  someone adds an event listener (bug 2528230)    
    after: function (type) {
        this._initUIEvent(type);
        return Widget.superclass.after.apply(this, arguments);
    },

    //  Override of "publish" from Base to facilitate the firing of Widget events
    //  based on DOM events of the same name/type (e.g. "click", "mouseover").    
    //  Temporary solution until we have the ability to listen to when 
    //  someone publishes an event (bug 2528230)     
    publish: function (type, config) {
        var sType = this._getUIEvent(type);
        if (sType && config && config.defaultFn) {
            this._initUIEvent(sType);
        }        
        return Widget.superclass.publish.apply(this, arguments);
    }

});

Y.Widget = Widget;


}, '@VERSION@' ,{requires:['attribute', 'event-focus', 'base', 'node', 'classnamemanager', 'intl']});
