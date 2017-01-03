/**
 * @class Ext.dom.Element
 * @alternateClassName Ext.Element
 * @mixins Ext.util.Positionable
 * @mixins Ext.mixin.Observable
 *
 * Encapsulates a DOM element, adding simple DOM manipulation facilities, normalizing for browser differences.
 *
 * ## Usage
 *
 *     // by id
 *     var el = Ext.get("my-div");
 *
 *     // by DOM element reference
 *     var el = Ext.get(myDivElement);
 *     
 * ## Selecting Descendant Elements
 * 
 * Ext.dom.Element instances can be used to select descendant nodes using CSS selectors.
 * There are 3 methods that can be used for this purpose, each with a slightly different
 * twist:
 * 
 * - {@link #query}
 * - {@link #selectNode}
 * - {@link #select}
 * 
 * These methods can accept any valid CSS selector since they all use 
 * [querySelectorAll](http://www.w3.org/TR/css3-selectors/) under the hood. The primary
 * difference between these three methods is their return type:
 * 
 * To get an array of HTMLElement instances matching the selector '.foo' use the query
 * method:
 * 
 *     element.query('.foo');
 *     
 * This can easily be transformed into an array of Ext.dom.Element instances by setting
 * the `asDom` parameter to `false`:
 * 
 *     element.query('.foo', false);
 *     
 * If the desired result is only the first matching HTMLElement use the selectNode method:
 * 
 *     element.selectNode('.foo');
 * 
 * Once again, the dom node can be wrapped in an Ext.dom.Element by setting the `asDom`
 * parameter to `false`:
 * 
 *     element.selectNode('.foo', false);
 *     
 * The `select` method is used when the desired return type is a {@link
 * Ext.CompositeElementLite CompositeElementLite} or a {@link Ext.CompositeElement
 * CompositeElement}.  These are collections of elements that can be operated on as a
 * group using any of the methods of Ext.dom.Element.  The only difference between the two
 * is that CompositeElementLite is a collection of HTMLElement instances, while
 * CompositeElement is a collection of Ext.dom.Element instances.  To retrieve a
 * CompositeElementLite that represents a collection of HTMLElements for selector '.foo':
 * 
 *     element.select('.foo');
 *     
 * For a {@link Ext.CompositeElement CompositeElement} simply pass `true` as the
 * `composite` parameter:
 * 
 *     element.select('.foo', true);
 *     
 * The query selection methods can be used even if you don't have a Ext.dom.Element to
 * start with For example to select an array of all HTMLElements in the document that match the
 * selector '.foo', simply wrap the document object in an Ext.dom.Element instance using
 * {@link Ext#fly}:
 * 
 *     Ext.fly(document).query('.foo');
 */
Ext.define('Ext.dom.Element', function(Element) {
    var WIN = window,
        DOC = document,
        windowId = 'ext-window',
        documentId = 'ext-document',
        WIDTH = 'width',
        HEIGHT = 'height',
        MIN_WIDTH = 'min-width',
        MIN_HEIGHT = 'min-height',
        MAX_WIDTH = 'max-width',
        MAX_HEIGHT = 'max-height',
        TOP = 'top',
        RIGHT = 'right',
        BOTTOM = 'bottom',
        LEFT = 'left',
        VISIBILITY = 'visibility',
        HIDDEN = 'hidden',
        DISPLAY = "display",
        NONE = "none",
        ZINDEX = "z-index",
        POSITION = "position",
        RELATIVE = "relative",
        STATIC = "static",
        SEPARATOR = '-',
        wordsRe = /\w/g,
        spacesRe = /\s+/,
        classNameSplitRegex = /[\s]+/,
        transparentRe = /^(?:transparent|(?:rgba[(](?:\s*\d+\s*[,]){3}\s*0\s*[)]))$/i,
        adjustDirect2DTableRe = /table-row|table-.*-group/,
        borders = {
            t: 'border-top-width',
            r: 'border-right-width',
            b: 'border-bottom-width',
            l: 'border-left-width'
        },
        paddings = {
            t: 'padding-top',
            r: 'padding-right',
            b: 'padding-bottom',
            l: 'padding-left'
        },
        margins = {
            t: 'margin-top',
            r: 'margin-right',
            b: 'margin-bottom',
            l: 'margin-left'
        },
        paddingsTLRB = [paddings.l, paddings.r, paddings.t, paddings.b],
        bordersTLRB = [borders.l,  borders.r,  borders.t,  borders.b],
        numberRe = /\d+$/,
        unitRe = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
        defaultUnit = 'px',
        camelRe = /(-[a-z])/gi,
        cssRe = /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
        pxRe = /^\d+(?:\.\d*)?px$/i,
        propertyCache = {},
        camelReplaceFn = function(m, a) {
            return a.charAt(1).toUpperCase();
        },
        activeElement = null,
        visibilityCls = Ext.baseCSSPrefix + 'hidden-visibility',
        displayCls = Ext.baseCSSPrefix + 'hidden-display',
        offsetsCls = Ext.baseCSSPrefix + 'hidden-offsets',
        noTouchScrollCls = Ext.baseCSSPrefix + 'no-touch-scroll',
        CREATE_ATTRIBUTES = {
            style: 'style',
            className: 'className',
            cls: 'cls',
            classList: 'classList',
            text: 'text',
            hidden: 'hidden',
            html: 'html',
            children: 'children'
        },
        visFly;

    // If the browser does not support document.activeElement we need some assistance.
    // This covers old Safari 3.2 (4.0 added activeElement along with just about all
    // other browsers). We need this support to handle issues with old Safari.
    if (!('activeElement' in DOC) && DOC.addEventListener) {
        DOC.addEventListener('focus',
            function (ev) {
                if (ev && ev.target) {
                    activeElement = (ev.target === DOC) ? null : ev.target;
                }
            }, true);
    }

    return {
        alternateClassName: 'Ext.Element',

        mixins: {
            positionable: 'Ext.util.Positionable',
            observable: 'Ext.mixin.Observable'
        },

        requires: [
            'Ext.dom.Helper'
        ],

        uses: [
            'Ext.dom.CompositeElement',
            'Ext.dom.Fly'
        ],

        observableType: 'element',

        isElement: true,

        isSynchronized: false,

        skipGarbageCollection: true,

        identifiablePrefix: 'ext-element-',

        styleHooks: {},

        validIdRe: Ext.validIdRe,

        blockedEvents: Ext.supports.EmulatedMouseOver ? {
            // mobile safari emulates a mouseover event on clickable elmements such as
            // anchors. This event is useless because it runs after touchend. We block
            // this event to prevent mouseover handlers from running after tap events. It
            // is up to the individual component to determine if it has an analog for
            // mouseover, and implement the appropriate event handlers.
            mouseover: 1
        } : {},

        longpressEvents: {
            longpress: 1,
            taphold: 1
        },

        /**
         * @property {Ext.Component} component
         * A reference to the `Component` that owns this element. This is `null` if there
         * is no direct owner.
         */

        /**
         * @event painted
         * Fires whenever this Element actually becomes visible (painted) on the screen. This is useful when you need to
         * perform 'read' operations on the DOM element, i.e: calculating natural sizes and positioning.
         *
         * __Note:__ This event is not available to be used with event delegation. Instead `painted` only fires if you explicitly
         * add at least one listener to it, for performance reasons.
         *
         * @param {Ext.dom.Element} this The component instance.
         */

        /**
         * @event resize
         * Important note: For the best performance on mobile devices, use this only when you absolutely need to monitor
         * a Element's size.
         *
         * __Note:__ This event is not available to be used with event delegation. Instead `resize` only fires if you explicitly
         * add at least one listener to it, for performance reasons.
         *
         * @param {Ext.dom.Element} this The component instance.
         */

        /**
         * @constructor
         * Creates new Element directly by passing an id or the HTMLElement.  This
         * constructor should not be called directly.  Always use {@link Ext#get Ext.get()}
         * or {@link Ext#fly Ext#fly()} instead.
         * 
         * In older versions of Ext JS and Sencha Touch this constructor checked to see if
         * there was already an instance of this element in the cache and if so, returned
         * the same instance. As of version 5 this behavior has been removed in order to
         * avoid a redundant cache lookup since the most common path is for the Element
         * constructor to be called from {@link Ext#get Ext.get()}, which has already
         * checked for a cache entry.
         * 
         * Correct way of creating a new Ext.dom.Element (or retrieving it from the cache):
         * 
         *     var el = Ext.get('foo'); // by id
         *     
         *     var el = Ext.get(document.getElementById('foo')); // by DOM reference
         *     
         * Incorrect way of creating a new Ext.dom.Element
         * 
         *     var el = new Ext.dom.Element('foo');
         *     
         * For quick and easy access to Ext.dom.Element methods use a flyweight:
         * 
         *     Ext.fly('foo').addCls('foo-hovered');
         *     
         * This simply attaches the DOM node with id='foo' to the global flyweight Element
         * instance to avoid allocating an extra Ext.dom.Element instance.  If, however,
         * the Element instance has already been cached by a previous call to Ext.get(),
         * then Ext.fly() will return the cached Element instance.  For more info see
         * {@link Ext#fly}.
         *     
         * @param {String/HTMLElement} element
         * @private
         */
        constructor: function(dom, /* private */ noCache) {
            var me = this,
                id;

            if (typeof dom === 'string') {
                dom = DOC.getElementById(dom);
            }

            if (!dom) {
                //<debug>
                Ext.Error.raise("Invalid domNode reference or an id of an existing domNode: " + dom);
                //</debug>
                return null;
            }
            //<debug>
            if (Ext.cache[dom.id]) {
                Ext.Error.raise("Element cache already contains an entry for id '" +
                    dom.id + "'.  Use Ext.get() to create or retrieve Element instances.");
            }
            //</debug>

            /**
             * The DOM element
             * @property dom
             * @type HTMLElement
             */
            me.dom = dom;

            id = dom.id;

            if (id) {
                me.id = id;
            } else {
                id = dom.id = me.getUniqueId();
            }

            //<debug>
            if (!me.validIdRe.test(me.id)) {
                Ext.Error.raise('Invalid Element "id": "' + me.id + '"');
            }
            //</debug>

            // set an "el" property that references "this".  This allows
            // Ext.util.Positionable methods to operate on this.el.dom since it
            // gets mixed into both Element and Component
            me.el = me;

            if (!noCache) {
                Ext.cache[id] = me;
            }

            me.mixins.observable.constructor.call(me);
        },

        inheritableStatics: {
            cache: Ext.cache = {},

            /**
             * @property {Number}
             * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}. 
             * Use the CSS 'visibility' property to hide the element.
             *
             * Note that in this mode, {@link Ext.dom.Element#isVisible isVisible} may return true
             * for an element even though it actually has a parent element that is hidden. For this
             * reason, and in most cases, using the {@link #OFFSETS} mode is a better choice.
             * @static
             */
            VISIBILITY: 1,

            /**
             * @property {Number}
             * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}. 
             * Use the CSS 'display' property to hide the element.
             * @static
             */
            DISPLAY: 2,

            /**
             * @property {Number}
             * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}. 
             * Use CSS absolute positioning and top/left offsets to hide the element.
             * @static
             */
            OFFSETS: 3,

            unitRe: unitRe,

            /**
             * @property {Boolean}
             * @private
             * @static
             * True to globally disable the delegated event system.  The results of
             * setting this to false are unpredictable since the Gesture publisher relies
             * on delegated events in order to work correctly.  Disabling delegated events
             * may cause Gestures to function incorrectly or to stop working completely.
             * Use at your own risk!
             */
            useDelegatedEvents: true,

            /**
             * @property {Object}
             * @private
             * @static
             * The list of valid nodeTypes that are allowed to be wrapped
             */
            validNodeTypes: {
                1: 1, // ELEMENT_NODE
                9: 1, // DOCUMENT_NODE
                11: 1 // DOCUMENT_FRAGMENT_NODE
            },

            /**
             * Test if size has a unit, otherwise appends the passed unit string, or the default for this Element.
             * @param {Object} size The size to set.
             * @param {String} units The units to append to a numeric size value.
             * @return {String}
             * @private
             * @static
             */
            addUnits: function(size, units) {
                // Most common case first: Size is set to a number
                if (typeof size === 'number') {
                    return size + (units || defaultUnit);
                }

                // Values which mean "auto"
                // - ""
                // - "auto"
                // - undefined
                // - null
                if (size === "" || size === "auto" || size == null) {
                    return size || '';
                }

                // less common use case: number formatted as a string.  save this case until
                // last to avoid regex execution if possible.
                if (numberRe.test(size)) {
                    return size + (units || defaultUnit);
                }

                // Warn if it's not a valid CSS measurement
                if (!unitRe.test(size)) {
                    //<debug>
                    Ext.Logger.warn("Warning, size detected (" + size + ") not a valid property value on Element.addUnits.");
                    //</debug>
                    return size || '';
                }

                return size;
            },

            // private overridden create method to add support a DomHelper config. Creates
            // and appends elements/children using document.createElement/appendChild.
            // This method is used by Sencha Touch for a significant performance gain
            // in webkit browsers as opposed to using DomQuery which generates HTML
            // markup and sets it as innerHTML.  However, the createElement/appendChild
            // method of creating elements is significantly slower in all versions of IE
            // at the time of this writing (6 - 11), so Ext JS should not use this method,
            // but should instead use DomHelper methods, or Element methods that use
            // DomHelper under the hood (e.g. createChild).
            // see https://fiddle.sencha.com/#fiddle/tj
            create: function(attributes, domNode) {
                var me = this,
                    hidden = CREATE_ATTRIBUTES.hidden,
                    element, elementStyle, tag, value, name, i, ln, className;

                if (!attributes) {
                    attributes = {};
                }

                if (attributes.isElement) {
                    return domNode ? attributes.dom : attributes;
                }
                else if ('nodeType' in attributes) {
                    return domNode ? attributes : Ext.get(attributes);
                }

                if (typeof attributes === 'string') {
                    return DOC.createTextNode(attributes);
                }

                tag = attributes.tag;

                if (!tag) {
                    tag = 'div';
                }
                if (attributes.namespace) {
                    element = DOC.createElementNS(attributes.namespace, tag);
                } else {
                    element = DOC.createElement(tag);
                }
                elementStyle = element.style;

                if (attributes[hidden]) {
                    className = attributes.className;
                    className = (className == null) ? '' : className + ' ';
                    attributes.className = className + displayCls;
                    delete attributes[hidden];
                }

                for (name in attributes) {
                    if (name !== 'tag') {
                        value = attributes[name];

                        switch (name) {
                            case CREATE_ATTRIBUTES.style:
                                    if (typeof value === 'string') {
                                        element.setAttribute(name, value);
                                    }
                                    else {
                                        for (i in value) {
                                            if (value.hasOwnProperty(i)) {
                                                elementStyle[i] = value[i];
                                            }
                                        }
                                    }
                                break;

                            case CREATE_ATTRIBUTES.className:
                            case CREATE_ATTRIBUTES.cls:
                                element.className = value;
                                break;

                            case CREATE_ATTRIBUTES.classList:
                                element.className = value.join(' ');
                                break;

                            case CREATE_ATTRIBUTES.text:
                                element.textContent = value;
                                break;

                            case CREATE_ATTRIBUTES.html:
                                element.innerHTML = value;
                                break;

                            case CREATE_ATTRIBUTES.children:
                                for (i = 0,ln = value.length; i < ln; i++) {
                                    element.appendChild(me.create(value[i], true));
                                }
                                break;

                            default:
                                if (value != null) { // skip null or undefined values
                                    element.setAttribute(name, value);
                                }
                        }
                    }
                }

                if (domNode) {
                    return element;
                }
                else {
                    return me.get(element);
                }
            },

            // private
            detach: function() {
                var dom = this.dom;

                if (dom && dom.parentNode && dom.tagName !== 'BODY') {
                    dom.parentNode.removeChild(dom);
                }

                return this;
            },

            /**
             * @inheritdoc Ext#fly
             * @static
             */
            fly: function(dom, named) {
                return Ext.fly(dom, named);
            },

            /**
             * Returns the top Element that is located at the passed coordinates
             * @static
             * @param {Number} x The x coordinate
             * @param {Number} y The y coordinate
             * @return {String} The found Element
             */
            fromPoint: function(x, y) {
                return Ext.get(DOC.elementFromPoint(x, y));
            },

            /**
             * Retrieves Ext.dom.Element objects. {@link Ext#get} is alias for {@link Ext.dom.Element#get}.
             * 
             * **This method does not retrieve {@link Ext.Component Component}s.** This method retrieves Ext.dom.Element
             * objects which encapsulate DOM elements. To retrieve a Component by its ID, use {@link Ext.ComponentManager#get}.
             * 
             * When passing an id, it should not include the `#` character that is used for a css selector.
             * 
             *     // For an element with id 'foo'
             *     Ext.get('foo'); // Correct
             *     Ext.get('#foo'); // Incorrect
             *
             * Uses simple caching to consistently return the same object. Automatically fixes if an object was recreated with
             * the same id via AJAX or DOM.
             *
             * @param {String/HTMLElement/Ext.dom.Element} element The `id` of the node, a DOM Node or an existing Element.
             * @return {Ext.dom.Element} The Element object (or `null` if no matching element was found).
             * @static
             */
            get: function(el) {
                var me = this,
                    cache = Ext.cache,
                    nodeType, dom, id, entry, data, docEl, winEl;

                if (!el) {
                    return null;
                }

                //<debug>
                function warnDuplicate(id) {
                    Ext.Error.raise("DOM element with id " + id +
                        " in Element cache is not the same as element in the DOM. " +
                        "Make sure to clean up Element instances using destroy()" );
                }
                //</debug>

                // Ext.get(flyweight) must return an Element instance, not the flyweight
                if (el.isFly) {
                    el = el.dom;
                    data = el._extData;
                }

                if (typeof el === 'string') {
                    id = el;
                    if (cache.hasOwnProperty(id)) {
                        entry = cache[id];
                        if (entry.skipGarbageCollection || !Ext.isGarbage(entry.dom)) {
                            //<debug>
                            dom = Ext.getElementById ? Ext.getElementById(id) :
                                DOC.getElementById(id);
                            if (dom && (dom !== entry.dom)) {
                                warnDuplicate(id);
                            }
                            //</debug>
                            return entry;
                        } else {
                            entry.destroy();
                        }
                    }

                    if (id === windowId) {
                        return Element.get(WIN);
                    } else if (id === documentId) {
                        return Element.get(DOC);
                    }

                    // using Ext.getElementById() allows us to check the detached
                    // body in addition to the body (Ext JS only).
                    dom = Ext.getElementById ? Ext.getElementById(id) :
                        DOC.getElementById(id);
                    if (dom) {
                        return new Element(dom);
                    }
                }

                // document and window are not added to the cache because they cannot be
                // garbage collected.  Instead, they are cached as static properties
                // of Ext.dom.Element.
                if (el === DOC) {
                    if (!me.docEl) {
                        DOC.id = documentId;
                        me.docEl = new Element(DOC, true);
                    }
                    return me.docEl;
                }
                // Must use == here, otherwise IE fails to recognize the window
                else if (el == WIN) {
                    if (!me.winEl) {
                        WIN.id = windowId;
                        me.winEl = new Element(WIN, true);
                    }
                    return me.winEl;
                }

                nodeType = el.nodeType;

                // check if we have a valid node type or if the el is a window object before
                // proceeding. This allows elements, document fragments, and document/window
                // objects (even those inside iframes) to be wrapped.
                if (me.validNodeTypes[nodeType] || (!nodeType && (el.window === el))) {
                    id = el.id;

                    if (cache.hasOwnProperty(id)) {
                        entry = cache[id];
                        if (entry.skipGarbageCollection || el === entry.dom ||
                            !Ext.isGarbage(entry.dom)) {
                            //<debug>
                            if (el !== entry.dom) {
                                warnDuplicate(id);
                            }
                            //</debug>
                            return entry;
                        } else {
                            entry.destroy();
                        }
                    }

                    return new Element(el);
                }

                if (el.isElement) {
                    return el;
                }

                if (el.isComposite) {
                    return el;
                }

                // Test for iterable.
                // Allow the resulting Composite to be based upon an Array or HtmlCollection of nodes.
                if (Ext.isIterable(el)) {
                    return me.select(el);
                }

                return null;
            },

            /**
             * Returns the active element in the DOM. If the browser supports activeElement
             * on the document, this is returned. If not, the focus is tracked and the active
             * element is maintained internally.
             * @return {HTMLElement} The active (focused) element in the document.
             */
            getActiveElement: function () {
                var active = DOC.activeElement;
                
                // Default to the body if we can't find anything
                // https://developer.mozilla.org/en-US/docs/DOM/document.activeElement
                active = active || activeElement;
                if (!active) {
                    active = activeElement = DOC.body;
                }
                return active;
            },

            /**
             * Retrieves the document height
             * @static
             * @return {Number} documentHeight
             */
            getDocumentHeight: function() {
                return Math.max(!Ext.isStrict ? DOC.body.scrollHeight : DOC.documentElement.scrollHeight, this.getViewportHeight());
            },

            /**
             * Retrieves the document width
             * @static
             * @return {Number} documentWidth
             */
            getDocumentWidth: function() {
                return Math.max(!Ext.isStrict ? DOC.body.scrollWidth : DOC.documentElement.scrollWidth, this.getViewportWidth());
            },

            /**
             * Retrieves the current orientation of the window. This is calculated by
             * determining if the height is greater than the width.
             * @static
             * @return {String} Orientation of window: 'portrait' or 'landscape'
             */
            getOrientation: function() {
                if (Ext.supports.OrientationChange) {
                    return (WIN.orientation == 0) ? 'portrait' : 'landscape';
                }

                return (WIN.innerHeight > WIN.innerWidth) ? 'portrait' : 'landscape';
            },

            /**
             * Retrieves the viewport height of the window.
             * @static
             * @return {Number} viewportHeight
             */
            getViewportHeight: function() {
                return WIN.innerHeight;
            },

            /**
             * Retrieves the viewport width of the window.
             * @static
             * @return {Number} viewportWidth
             */
            getViewportWidth: function() {
                return WIN.innerWidth;
            },

            /**
             * Retrieves the viewport size of the window.
             * @static
             * @return {Object} object containing width and height properties
             */
            getViewSize: function() {
                return {
                    width: Element.getViewportWidth(),
                    height: Element.getViewportHeight()
                };
            },

            /**
             * Normalizes CSS property keys from dash delimited to camel case JavaScript Syntax.
             * For example:
             *
             * - border-width -> borderWidth
             * - padding-top -> paddingTop
             *
             * @static
             * @param {String} prop The property to normalize
             * @return {String} The normalized string
             */
            normalize: function(prop) {
                return propertyCache[prop] || (propertyCache[prop] = prop.replace(camelRe, camelReplaceFn));
            },

            /**
             * Parses a number or string representing margin sizes into an object. Supports CSS-style margin declarations
             * (e.g. 10, "10", "10 10", "10 10 10" and "10 10 10 10" are all valid options and would return the same result)
             * @static
             * @param {Number/String} box The encoded margins
             * @return {Object} An object with margin sizes for top, right, bottom and left containing the unit
             */
            parseBox: function(box) {
                box = box || 0;
                
                var type = typeof box,
                    parts,
                    ln;

                if (type === 'number') {
                    return {
                        top: box,
                        right: box,
                        bottom: box,
                        left: box
                    };
                 } else if (type !== 'string') {
                     // If not a number or a string, assume we've been given a box config.
                     return box;
                 }

                parts  = box.split(' ');
                ln = parts.length;

                if (ln === 1) {
                    parts[1] = parts[2] = parts[3] = parts[0];
                } else if (ln === 2) {
                    parts[2] = parts[0];
                    parts[3] = parts[1];
                } else if (ln === 3) {
                    parts[3] = parts[1];
                }

                return {
                    top: parseFloat(parts[0]) || 0,
                    right: parseFloat(parts[1]) || 0,
                    bottom: parseFloat(parts[2]) || 0,
                    left: parseFloat(parts[3]) || 0
                };
            },

            /**
             * Converts a CSS string into an object with a property for each style.
             *
             * The sample code below would return an object with 2 properties, one
             * for background-color and one for color.
             *
             *     var css = 'background-color: red; color: blue;';
             *     console.log(Ext.dom.Element.parseStyles(css));
             *
             * @static
             * @param {String} styles A CSS string
             * @return {Object} styles
             */
            parseStyles: function(styles) {
                var out = {},
                    matches;

                if (styles) {
                    // Since we're using the g flag on the regex, we need to set the lastIndex.
                    // This automatically happens on some implementations, but not others, see:
                    // http://stackoverflow.com/questions/2645273/javascript-regular-expression-literal-persists-between-function-calls
                    // http://blog.stevenlevithan.com/archives/fixing-javascript-regexp
                    cssRe.lastIndex = 0;
                    while ((matches = cssRe.exec(styles))) {
                        out[matches[1]] = matches[2] || '';
                    }
                }
                return out;
            },

            /**
             * Selects elements based on the passed CSS selector to enable
             * {@link Ext.dom.Element Element} methods to be applied to many related
             * elements in one statement through the returned
             * {@link Ext.dom.CompositeElementLite CompositeElementLite} object.
             * @param {String/HTMLElement[]} selector The CSS selector or an array of
             * elements
             * @param {Boolean} [composite=false] Return a CompositeElement as opposed to
             * a CompositeElementLite. Defaults to false.
             * @param {HTMLElement/String} [root] The root element of the query or id of
             * the root
             * @return {Ext.dom.CompositeElementLite/Ext.dom.CompositeElement}
             */
            select: function(selector, composite, root) {
                return Ext.fly(root || DOC).select(selector, composite);
            },

            /**
             * Selects child nodes of a given root based on the passed CSS selector.
             * For details on selectors see {@link #method-query}.
             * @static
             * @param {String} selector The CSS selector.
             * @param {Boolean} [asDom=true] `false` to return an array of Ext.dom.Element
             * @param {HTMLElement/String} [root] The root element of the query or id of
             * the root
             * @return {HTMLElement[]/Ext.dom.Element[]} An Array of elements that match
             * the selector.  If there are no matches, an empty Array is returned.
             */
            query: function(selector, asDom, root) {
                return Ext.fly(root || DOC).query(selector, asDom);
            },

            /**
             * Parses a number or string representing margin sizes into an object. Supports CSS-style margin declarations
             * (e.g. 10, "10", "10 10", "10 10 10" and "10 10 10 10" are all valid options and would return the same result)
             * @static
             * @param {Number/String/Object} box The encoded margins, or an object with top, right,
             * @param {String} units The type of units to add
             * @return {String} An string with unitized (px if units is not specified) metrics for top, right, bottom and left
             */
            unitizeBox: function(box, units) {
                var me = this;
                box = me.parseBox(box);

                return me.addUnits(box.top, units) + ' ' +
                       me.addUnits(box.right, units) + ' ' +
                       me.addUnits(box.bottom, units) + ' ' +
                       me.addUnits(box.left, units);
            },

            /**
             * Serializes a DOM form into a url encoded string
             * @param {Object} form The form
             * @return {String} The url encoded form
             * @static
             */
            serializeForm: function(form) {
                var fElements = form.elements || (DOC.forms[form] || Ext.getDom(form)).elements,
                    hasSubmit = false,
                    encoder = encodeURIComponent,
                    data = '',
                    eLen = fElements.length,
                    element, name, type, options, hasValue, e,
                    o, oLen, opt;

                for (e = 0; e < eLen; e++) {
                    element = fElements[e];
                    name = element.name;
                    type = element.type;
                    options = element.options;

                    if (!element.disabled && name) {
                        if (/select-(one|multiple)/i.test(type)) {
                            oLen = options.length;
                            for (o = 0; o < oLen; o++) {
                                opt = options[o];
                                if (opt.selected) {
                                    hasValue = opt.hasAttribute ? opt.hasAttribute('value') : opt.getAttributeNode('value').specified;
                                    data += Ext.String.format('{0}={1}&', encoder(name), encoder(hasValue ? opt.value : opt.text));
                                }
                            }
                        } else if (!(/file|undefined|reset|button/i.test(type))) {
                            if (!(/radio|checkbox/i.test(type) && !element.checked) && !(type == 'submit' && hasSubmit)) {
                                data += encoder(name) + '=' + encoder(element.value) + '&';
                                hasSubmit = /submit/i.test(type);
                            }
                        }
                    }
                }
                return data.substr(0, data.length - 1);
            }
        }, // statics

        /**
         * Adds the given CSS class(es) to this Element.
         * @param {String/String[]} names The CSS classes to add separated by space,
         * or an array of classes
         * @param {String} [prefix] (optional) Prefix to prepend to each class.
         * @param {String} [suffix] (optional) Suffix to append to each class.
         */
        addCls: function(names, prefix, suffix) {
            var me = this,
                hasNewCls, dom, map, classList, i, ln, name;

            if (!names) {
                return me;
            }

            if (!me.isSynchronized) {
                me.synchronize();
            }

            dom = me.dom;
            map = me.hasClassMap;
            classList = me.classList;

            prefix = prefix ? prefix + SEPARATOR : '';
            suffix = suffix ? SEPARATOR + suffix : '';

            if (typeof names === 'string') {
                names = names.split(spacesRe);
            }

            for (i = 0, ln = names.length; i < ln; i++) {
                name = prefix + names[i] + suffix;

                if (!map[name]) {
                    map[name] = true;
                    classList.push(name);
                    hasNewCls = true;
                }
            }

            if (hasNewCls) {
                dom.className = classList.join(' ');
            }

            return me;
        },

        addStyles: function(sides, styles){
            var totalSize = 0,
                sidesArr = (sides || '').match(wordsRe),
                i,
                len = sidesArr.length,
                side,
                styleSides = [];

            if (len === 1) {
                totalSize = Math.abs(parseFloat(this.getStyle(styles[sidesArr[0]])) || 0);
            } else if (len) {
                for (i = 0; i < len; i++) {
                    side = sidesArr[i];
                    styleSides.push(styles[side]);
                }
                //Gather all at once, returning a hash
                styleSides = this.getStyle(styleSides);

                for (i=0; i < len; i++) {
                    side = sidesArr[i];
                    totalSize += parseFloat(styleSides[styles[side]]) || 0;
                }
            }

            return totalSize;
        },

        addUnits: function(size, units) {
            return Element.addUnits(size, units);
        },

        /**
         * @private
         * Returns the fractional portion of this element's measurement in the given dimension.
         * (IE9+ only)
         * @return {Number}
         */
        adjustDirect2DDimension: function(dimension) {
            var me = this,
                dom = me.dom,
                display = me.getStyle('display'),
                inlineDisplay = dom.style.display,
                inlinePosition = dom.style.position,
                originIndex = dimension === WIDTH ? 0 : 1,
                currentStyle = dom.currentStyle,
                floating;

            if (display === 'inline') {
                dom.style.display = 'inline-block';
            }

            dom.style.position = display.match(adjustDirect2DTableRe) ? 'absolute' : 'static';

            // floating will contain digits that appears after the decimal point
            // if height or width are set to auto we fallback to msTransformOrigin calculation
            
            // Use currentStyle here instead of getStyle. In some difficult to reproduce 
            // instances it resets the scrollWidth of the element
            floating = (parseFloat(currentStyle[dimension]) || parseFloat(currentStyle.msTransformOrigin.split(' ')[originIndex]) * 2) % 1;

            dom.style.position = inlinePosition;

            if (display === 'inline') {
                dom.style.display = inlineDisplay;
            }

            return floating;
        },

        append: function() {
            this.appendChild.apply(this, arguments);
        },

        /**
         * Appends the passed element(s) to this element
         * @param {String/HTMLElement/Ext.dom.Element/Object} el The id or element to insert
         * or a DomHelper config
         * @param {Boolean} [returnDom=false] True to return the raw DOM element instead
         * of Ext.dom.Element
         * @return {Ext.dom.Element} The inserted Element.
         */
        appendChild: function(el, returnDom) {
            var me = this,
                insertEl,
                eLen, e;

            if (el.nodeType || el.dom || typeof el === 'string') { // element
                el = Ext.getDom(el);
                me.dom.appendChild(el);
                return !returnDom ? Ext.get(el) : el;
            } else if (el.length) {
                // append all elements to a documentFragment
                insertEl = Ext.fly(document.createDocumentFragment());
                eLen = el.length;

                for (e = 0; e < eLen; e++) {
                    insertEl.appendChild(el[e], returnDom);
                }
                me.dom.appendChild(insertEl.dom);
                return returnDom ? insertEl.dom : insertEl;
            }
            else { // dh config
                return me.createChild(el, null, returnDom);
            }
        },

        /**
         * Appends this element to the passed element.
         * @param {String/HTMLElement/Ext.dom.Element} el The new parent element.
         * The id of the node, a DOM Node or an existing Element.
         * @return {Ext.dom.Element} This element.
         */
        appendTo: function(el) {
            Ext.getDom(el).appendChild(this.dom);
            return this;
        },

        /**
         * More flexible version of {@link #setStyle} for setting style properties.
         * @param {String/Object/Function} styles A style specification string, e.g. "width:100px", or object in the form `{width:"100px"}`, or
         * a function which returns such a specification.
         * @return {Ext.dom.Element} this
         */
        applyStyles: function(styles) {
            if (styles) {
                if (typeof styles === "function") {
                    styles = styles.call();
                }
                if (typeof styles === "string") {
                    styles = Element.parseStyles(styles);
                }
                if (typeof styles === "object") {
                    this.setStyle(styles);
                }
            }
            return this;
        },

        /**
        * Tries to blur the element. Any exceptions are caught and ignored.
        * @return {Ext.dom.Element} this
        */
        blur: function() {
            var me = this,
                dom = me.dom;
            // In IE, blurring the body can cause the browser window to hide.
            // Blurring the body is redundant, so instead we just focus it
            if (dom !== DOC.body) {
                try {
                    dom.blur();
                } catch(e) {
                }
                return me;
            } else {
                return me.focus(undefined, dom);
            }
        },
                
        /**
         * Centers the Element in either the viewport, or another Element.
         * @param {String/HTMLElement/Ext.dom.Element} centerIn element in
         * which to center the element.
         */
        center: function(centerIn){
            return this.alignTo(centerIn || DOC, 'c-c');
        },

        /**
         * Selects a single *direct* child based on the passed CSS selector (the selector should not contain an id).
         * @param {String} selector The CSS selector.
         * @param {Boolean} [returnDom=false] `true` to return the DOM node instead of Ext.dom.Element.
         * @return {HTMLElement/Ext.dom.Element} The child Ext.dom.Element (or DOM node if `returnDom` is `true`)
         */
        child: function(selector, returnDom) {
            var me = this,
                // Pull the ID from the DOM (Ext.id also ensures that there *is* an ID).
                // If this object is a Flyweight, it will not have an ID
                id = Ext.get(me).id;
                
            return me.selectNode(Ext.makeIdSelector(id) + " > " + selector, !!returnDom);
        },

        /**
         * Creates the passed DomHelper config and appends it to this element or optionally
         * inserts it before the passed child element.
         * @param {Object} config DomHelper element config object.  If no tag is specified
         * (e.g., {tag:'input'}) then a div will be automatically generated with the specified
         * attributes.
         * @param {HTMLElement} [insertBefore] a child element of this element
         * @param {Boolean} [returnDom=false] true to return the dom node instead of creating
         * an Element
         * @return {Ext.dom.Element} The new child element
         */
        createChild: function(config, insertBefore, returnDom) {
            config = config || {tag:'div'};
            if (insertBefore) {
                return Ext.DomHelper.insertBefore(insertBefore, config, returnDom !== true);
            }
            else {
                return Ext.DomHelper.append(this.dom, config,  returnDom !== true);
            }
        },

        /**
         * Creates an iframe shim for this element to keep windowed objects from
         * showing through.
         * @return {Ext.dom.Element} The new shim element
         */
        createShim: function() {
            var el = DOC.createElement('iframe'),
                shim;

            el.frameBorder = '0';
            el.className = Ext.baseCSSPrefix + 'shim';
            el.src = Ext.SSL_SECURE_URL;
            el.setAttribute('role', 'presentation');
            shim = Ext.get(this.dom.parentNode.insertBefore(el, this.dom));
            return shim;
        },

        /**
         * Returns `true` if this element is an ancestor of the passed element, or is
         * the element.
         * @param {HTMLElement/String} element The element to check.
         * @return {Boolean} True if this element is an ancestor of el or the el itself, else false
         */
        contains: function(element) {
            if (!element) {
                return false;
            }

            var me = this,
                dom = Ext.getDom(element);

            // we need el-contains-itself logic here because isAncestor does not do that:
            // https://developer.mozilla.org/en-US/docs/Web/API/Node.contains
            return (dom === me.dom) || me.isAncestor(dom);
        },

        /**
         * Destroys this element by removing it from the cache, removing its DOM reference,
         * and removing all of its event listeners.
         */
        destroy: function() {
            var me = this,
                dom = me.dom;

            //<debug>
            if (me.isDestroyed) {
                Ext.Logger.warn("Cannot destroy Element \"" + me.id + "\". Already destroyed.");
                return;
            }

            if (dom) {
                if (dom.tagName === 'BODY') {
                    Ext.Error.raise("Cannot destroy body element.");
                } else if (dom === DOC) {
                    Ext.Error.raise("Cannot destroy document object.");
                } else if (dom === WIN) {
                    Ext.Error.raise("Cannot destroy window object");
                }
            }
            //</debug>

            if (!me.isFly) {
                me.clearListeners();
                delete Ext.cache[me.id];
                me.isDestroyed = true;
            }

            if (dom) {
                if (dom.parentNode) {
                    dom.parentNode.removeChild(dom);
                }
                dom._extData = me.dom = null;
            }
        },

        detach: function() {
            var dom = this.dom;

            if (dom && dom.parentNode && dom.tagName !== 'BODY') {
                dom.parentNode.removeChild(dom);
            }

            return this;
        },

        /**
         * @private
         */
        disableTouchContextMenu: function() {
            this._contextMenuListenerRemover = this.on({
                MSHoldVisual: function(e) {
                    // disables the visual indicator in IE that precedes contextmenu
                    e.preventDefault();
                },
                destroyable: true,
                delegated: false
            });
        },

        /**
         * Disables native scrolling of an overflowing element using touch-screen input
         * @private
         */
        disableTouchScroll: function() {
            // The x-no-touch-scroll cls disables touch scrolling on IE10+
            this.addCls(noTouchScrollCls);
            // Some browsers (e.g. Chrome on Win8 with touch-sreen) don't yet support
            // touch-action:none, and so require cancellation of touchmove to prevent
            // the default scrolling action
            this.on({
                touchmove: function(e) {
                    e.preventDefault();
                },
                translate: false
            });
        },

        doAddListener: function(eventName, fn, scope, options) {
            var me = this,
                normalizedEvent, observableDoAddListener, additiveEventName,
                translatedEventName;

            // Blocked events (such as emulated mouseover in mobile webkit) are prevented
            // from firing
            if (!me.blockedEvents[eventName]) {
                observableDoAddListener = me.mixins.observable.doAddListener;
                options = options || {};

                if (me.longpressEvents[eventName]) {
                    me.disableTouchContextMenu();
                }

                if (me.normalizeEvent) {
                    // hook for overrides to create event interceptors. Useful when
                    // additional logic needs to be applied to normalize event behavior
                    normalizedEvent = me.normalizeEvent(eventName);
                    if (normalizedEvent) {
                        eventName =  normalizedEvent.eventName;
                        options.beforeFn = normalizedEvent.normalizeFn;
                    }
                }

                if (Element.useDelegatedEvents === false) {
                    options.delegated = options.delegated || false;
                }

                if (options.translate !== false) {
                    // translate events where applicable.  This allows applications that
                    // were written for desktop to work on mobile devices and vice versa.
                    additiveEventName = me.additiveEvents[eventName];
                    if (additiveEventName) {
                        // additiveEvents means the translation is "additive" - meaning we
                        // need to attach the original event in addition to the translated
                        // one.  An example of this is devices that have both mousedown
                        // and touchstart
                        options.type = eventName;
                        eventName = additiveEventName;
                        observableDoAddListener.apply(me, arguments);
                    }

                    translatedEventName = me.eventMap[eventName];
                    if (translatedEventName) {
                        // options.type may have already been set above
                        options.type = options.type || eventName;
                        eventName = translatedEventName;
                    }
                }
                observableDoAddListener.apply(me, arguments);

                // after the listener has been added to the ListenerStack, it's original
                // "type" (for translated events) will be stored on the listener object in
                // the ListenerStack.  We can now delete type from the options object
                // since it is not a user-supplied option
                delete options.type;
            }
            return me;
        },

        doRemoveListener: function(eventName, fn, scope, options) {
            var me = this,
                normalizedEvent, observableDoRemoveListener, additiveEventName,
                contextMenuListenerRemover;

            // Blocked events (such as emulated mouseover in mobile webkit) are prevented
            // from firing
            if (!me.blockedEvents[eventName]) {
                observableDoRemoveListener = me.mixins.observable.doRemoveListener;
                options = options || {};

                if (me.longpressEvents[eventName]) {
                    contextMenuListenerRemover = this._contextMenuListenerRemover;
                    if (contextMenuListenerRemover) {
                        contextMenuListenerRemover.destroy();
                    }
                }

                if (me.normalizeEvent) {
                    // hook for overrides to create event interceptors. Useful when
                    // additional logic needs to be applied to normalize event behavior
                    normalizedEvent = me.normalizeEvent(eventName);
                    if (normalizedEvent) {
                        eventName = normalizedEvent.eventName;
                    }
                }

                if (Element.useDelegatedEvents === false) {
                    options.delegated = options.delegated || false;
                }

                if (options.translate !== false) {
                    // translate events where applicable.  This allows applications that
                    // were written for desktop to work on mobile devices and vice versa.
                    additiveEventName = me.additiveEvents[eventName];
                    if (additiveEventName) {
                        // additiveEvents means the translation is "additive" - meaning we
                        // need to remove the original event in addition to the translated
                        // one.  An example of this is devices that have both mousedown
                        // and touchstart
                        eventName = additiveEventName;
                        observableDoRemoveListener.apply(me, arguments);
                    }
                    eventName = me.eventMap[eventName] || eventName;
                }
                observableDoRemoveListener.apply(me, arguments);
            }
            return me;
        },

        // private
        doReplaceWith: function(element) {
            var dom = this.dom;
            dom.parentNode.replaceChild(Ext.getDom(element), dom);
        },

        /**
         * Selects a single child at any depth below this element based on the passed CSS selector (the selector should not contain an id).
         * @param {String} selector The CSS selector
         * @param {Boolean} [returnDom=false] `true` to return the DOM node instead of Ext.dom.Element
         * @return {HTMLElement/Ext.dom.Element} The child Ext.dom.Element (or DOM node if `returnDom` is `true`)
         */
        down: function(selector, returnDom) {
            return this.selectNode(selector, !!returnDom);
        },

        /**
         * Looks at this node and then at parent nodes for a match of the passed simple selector.
         * @param {String} selector The simple selector to test. See {@link Ext.dom.Query} for information about simple selectors.
         * @param {Number/String/HTMLElement/Ext.dom.Element} [limit]
         * The max depth to search as a number or an element which causes the upward traversal to stop
         * and is <b>not</b> considered for inclusion as the result. (defaults to 50 || document.documentElement)
         * @param {Boolean} [returnEl=false] True to return a Ext.dom.Element object instead of DOM node
         * @return {HTMLElement} The matching DOM node (or null if no match was found)
         */
        findParent: function(simpleSelector, limit, returnEl) {
            var me = this,
                target = me.dom,
                topmost = DOC.documentElement,
                depth = 0;

            limit = limit || 50;
            if (isNaN(limit)) {
                limit = Number.MAX_VALUE;
            }
            while (target && target.nodeType === 1 && depth < limit && target !== topmost) {
                if (Ext.fly(target).is(simpleSelector)) {
                    return returnEl ? Ext.get(target) : target;
                }
                depth++;
                target = target.parentNode;
            }
            return null;
        },

        /**
         * Looks at parent nodes for a match of the passed simple selector.
         * @param {String} selector The simple selector to test. See {@link Ext.dom.Query} for information about simple selectors.
         * @param {Number/String/HTMLElement/Ext.dom.Element} [limit]
         * The max depth to search as a number or an element which causes the upward traversal to stop
         * and is not</b> considered for inclusion as the result. (defaults to 50 || document.documentElement)
         * @param {Boolean} [returnEl=false] True to return a Ext.dom.Element object instead of DOM node
         * @return {HTMLElement} The matching DOM node (or null if no match was found)
         */
        findParentNode: function(simpleSelector, limit, returnEl) {
            var p = Ext.fly(this.dom.parentNode);
            return p ? p.findParent(simpleSelector, limit, returnEl) : null;
        },

        /**
         * Gets the first child, skipping text nodes
         * @param {String} [selector] Find the next sibling that matches the passed simple selector.
         * See {@link Ext.dom.Query} for information about simple selectors.
         * @param {Boolean} [returnDom=false] `true` to return a raw DOM node instead of an Ext.dom.Element
         * @return {Ext.dom.Element/HTMLElement} The first child or null
         */
        first: function(selector, returnDom) {
            return this.matchNode('nextSibling', 'firstChild', selector, returnDom);
        },

        /**
         * Tries to focus the element. Any exceptions are caught and ignored.
         * @param {Number} [defer] Milliseconds to defer the focus
         * @return {Ext.dom.Element} this
         */
        focus: function(defer, /* private */ dom) {
            var me = this;

            dom = dom || me.dom;
            try {
                if (Number(defer)) {
                    Ext.defer(me.focus, defer, me, [null, dom]);
                } else {
                    Ext.GlobalEvents.fireEvent('beforefocus', dom);
                    dom.focus();
                }
            } catch(e) {
            }
            return me;
        },

        getAnchorToXY: function(el, anchor, local, mySize) {
            return el.getAnchorXY(anchor, local, mySize);
        },

        /**
         * Returns the value of an attribute from the element's underlying DOM node.
         * @param {String} name The attribute name.
         * @param {String} [namespace] The namespace in which to look for the attribute.
         * @return {String} The attribute value.
         */
        getAttribute: function(name, namespace) {
            var dom = this.dom;

            return namespace ?
                (dom.getAttributeNS(namespace, name) || dom.getAttribute(namespace + ":" + name)) :
                (dom.getAttribute(name) || dom[name] || null);
        },

        /**
         * Gets the bottom Y coordinate of the element (element Y position + element height)
         * @param {Boolean} local True to get the local css position instead of page
         * coordinate
         * @return {Number}
         */
        getBottom: function(local) {
            return (local ? this.getLocalY() : this.getY()) + this.getHeight();
        },

        /**
         * Returns a child element of this element given its `id`.
         * @param {String} id The id of the desired child element.
         * @param {Boolean} [asDom=false] True to return the DOM element, false to return a
         * wrapped Element object.
         */
        getById: function (id, asDom) {
            // for normal elements getElementById is the best solution, but if the el is
            // not part of the document.body, we have to resort to querySelector
            var dom = DOC.getElementById(id) ||
                this.dom.querySelector(Ext.makeIdSelector(id));
            return asDom ? dom : (dom ? Ext.get(dom) : null);
        },

        getBorderPadding: function() {
            var paddingWidth = this.getStyle(paddingsTLRB),
                bordersWidth = this.getStyle(bordersTLRB);

            return {
                beforeX: (parseFloat(bordersWidth[borders.l]) || 0) + (parseFloat(paddingWidth[paddings.l]) || 0),
                afterX: (parseFloat(bordersWidth[borders.r]) || 0) + (parseFloat(paddingWidth[paddings.r]) || 0),
                beforeY: (parseFloat(bordersWidth[borders.t]) || 0) + (parseFloat(paddingWidth[paddings.t]) || 0),
                afterY: (parseFloat(bordersWidth[borders.b]) || 0) + (parseFloat(paddingWidth[paddings.b]) || 0)
            };
        },

        /**
         * Gets the width of the border(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add
         * multiple values. For example, passing `'lr'` would get the border **l**eft
         * width + the border **r**ight width.
         * @return {Number} The width of the sides passed added together
         */
        getBorderWidth: function(side) {
            return this.addStyles(side, borders);
        },

        getData: function() {
            var dom = this.dom;

            return (dom._extData || (dom._extData = {}));
        },

        getFirstChild: function() {
            return Ext.get(this.dom.firstElementChild);
        },

        /**
         * Returns the offset height of the element.
         * @param {Boolean} [contentHeight] `true` to get the height minus borders and padding.
         * @return {Number} The element's height.
         */
        getHeight: function(contentHeight, preciseHeight) {
            var me = this,
                hidden = me.isStyle('display', 'none'),
                height,
                floating;

            if (hidden) {
                return 0;
            }

            height = me.dom.offsetHeight;

            // IE9/10 Direct2D dimension rounding bug
            if (Ext.supports.Direct2DBug) {
                floating = me.adjustDirect2DDimension(HEIGHT);
                if (preciseHeight) {
                    height += floating;
                }
                else if (floating > 0 && floating < 0.5) {
                    height++;
                }
            }

            if (contentHeight) {
                height -= me.getBorderWidth("tb") + me.getPadding("tb");
            }

            return (height < 0) ? 0 : height;
        },

        /**
         * Returns the `innerHTML` of an Element or an empty string if the element's
         * dom no longer exists.
         * @return {String}
         */
        getHtml: function() {
            return this.dom ? this.dom.innerHTML : '';
        },

        /**
         * Gets the left X coordinate
         * @param {Boolean} local True to get the local css position instead of
         * page coordinate
         * @return {Number}
         */
        getLeft: function(local) {
            return local ? this.getLocalX() : this.getX();
        },

        getLocalX: function() {
            var me = this,
                offsetParent,
                x = me.getStyle('left');

            if (!x || x === 'auto') {
                x = 0;
            } else if (pxRe.test(x)) {
                x = parseFloat(x);
            } else {
                x = me.getX();

                // Reading offsetParent causes forced async layout.
                // Do not do it unless needed.
                offsetParent = me.dom.offsetParent;
                if (offsetParent) {
                    x -= Ext.fly(offsetParent).getX();
                }
            }

            return x;
        },

        getLocalXY: function() {
            var me = this,
                offsetParent,
                style = me.getStyle(['left', 'top']),
                x = style.left,
                y = style.top;

            if (!x || x === 'auto') {
                x = 0;
            } else if (pxRe.test(x)) {
                x = parseFloat(x);
            } else {
                x = me.getX();

                // Reading offsetParent causes forced async layout.
                // Do not do it unless needed.
                offsetParent = me.dom.offsetParent;
                if (offsetParent) {
                    x -= Ext.fly(offsetParent).getX();
                }
            }

            if (!y || y === 'auto') {
                y = 0;
            } else if (pxRe.test(y)) {
                y = parseFloat(y);
            } else {
                y = me.getY();
                
                // Reading offsetParent causes forced async layout.
                // Do not do it unless needed.
                offsetParent = me.dom.offsetParent;
                if (offsetParent) {
                    y -= Ext.fly(offsetParent).getY();
                }
            }

            return [x, y];
        },

        getLocalY: function() {
            var me = this,
                offsetParent,
                y = me.getStyle('top');

            if (!y || y === 'auto') {
                y = 0;
            } else if (pxRe.test(y)) {
                y = parseFloat(y);
            } else {
                y = me.getY();

                // Reading offsetParent causes forced async layout.
                // Do not do it unless needed.
                offsetParent = me.dom.offsetParent;
                if (offsetParent) {
                    y -= Ext.fly(offsetParent).getY();
                }
            }

            return y;
        },

        /**
         * Returns an object with properties top, left, right and bottom representing the margins of this element unless sides is passed,
         * then it returns the calculated width of the sides (see {@link #getPadding}).
         * @param {String} [sides] Any combination of 'l', 'r', 't', 'b' to get the sum of those sides.
         * @return {Object/Number}
         */
        getMargin: function(side) {
            var me = this,
                hash = {t: "top", l: "left", r: "right", b: "bottom"},
                key, o, m;

            if (!side) {
                m = [];
                for (key in margins) {
                    m.push(margins[key]);
                }
                o = me.getStyle(margins);
                if(o && typeof o === 'object') {
                    for (key in margins) {
                        o[hash[key]] = parseFloat(o[margins[key]]) || 0;
                    }
                }

                return o;
            } else {
                return me.addStyles(side, margins);
            }
        },

        /**
         * Gets the width of the padding(s) for the specified side(s).
         * @param {String} side Can be t, l, r, b or any combination of those to add
         * multiple values. For example, passing `'lr'` would get the padding **l**eft +
         * the padding **r**ight.
         * @return {Number} The padding of the sides passed added together.
         */
        getPadding: function(side) {
            return this.addStyles(side, paddings);
        },

        getParent: function() {
            return Ext.get(this.dom.parentNode);
        },

        /**
         * Gets the right X coordinate of the element (element X position + element width)
         * @param {Boolean} local True to get the local css position instead of page
         * coordinates
         * @return {Number}
         */
        getRight: function(local) {
            return (local ? this.getLocalX() : this.getX()) + this.getWidth();
        },

        /**
         * Returns the size of the element.
         * @param {Boolean} [contentSize] `true` to get the width/size minus borders and padding.
         * @return {Object} An object containing the element's size:
         * @return {Number} return.width
         * @return {Number} return.height
         */
        getSize: function(contentSize) {
            return {width: this.getWidth(contentSize), height: this.getHeight(contentSize)};
        },

        /**
         * Returns a named style property based on computed/currentStyle (primary) and
         * inline-style if primary is not available.
         *
         * @param {String/String[]} property The style property (or multiple property names
         * in an array) whose value is returned.
         * @param {Boolean} [inline=false] if `true` only inline styles will be returned.
         * @return {String/Object} The current value of the style property for this element
         * (or a hash of named style values if multiple property arguments are requested).
         * @method
         */
        getStyle: function (property, inline) {
            var me = this,
                dom = me.dom,
                multiple = typeof property !== 'string',
                hooks = me.styleHooks,
                prop = property,
                props = prop,
                len = 1,
                domStyle, camel, values, hook, out, style, i;

            if (multiple) {
                values = {};
                prop = props[0];
                i = 0;
                if (!(len = props.length)) {
                    return values;
                }
            }

            if (!dom || dom.documentElement) {
                return values || '';
            }

            domStyle = dom.style;

            if (inline) {
                style = domStyle;
            } else {
                // Caution: Firefox will not render "presentation" (ie. computed styles) in
                // iframes that are display:none or those inheriting display:none. Similar
                // issues with legacy Safari.
                //
                style = dom.ownerDocument.defaultView.getComputedStyle(dom, null);

                // fallback to inline style if rendering context not available
                if (!style) {
                    inline = true;
                    style = domStyle;
                }
            }

            do {
                hook = hooks[prop];

                if (!hook) {
                    hooks[prop] = hook = { name: Element.normalize(prop) };
                }

                if (hook.get) {
                    out = hook.get(dom, me, inline, style);
                } else {
                    camel = hook.name;
                    out = style[camel];
                }

                if (!multiple) {
                   return out;
                }

                values[prop] = out;
                prop = props[++i];
            } while (i < len);

            return values;
        },

        getStyleValue: function(name) {
            return this.dom.style.getPropertyValue(name);
        },

        /**
         * Gets the top Y coordinate
         * @param {Boolean} local True to get the local css position instead of page
         * coordinates
         * @return {Number}
         */
        getTop: function(local) {
            return local ? this.getLocalY() : this.getY();
        },

        /**
         * Returns the value of the `value` attribute.
         * @param {Boolean} asNumber `true` to parse the value as a number.
         * @return {String/Number}
         */
        getValue: function(asNumber) {
            var value = this.dom.value;

            return asNumber ? parseInt(value, 10) : value;
        },

        /**
         * Returns the dimensions of the element available to lay content out in.  For
         * most elements this is the clientHeight/clientWidth.  If the element is
         * the document/document.body the window's innerHeight/innerWidth is returned
         *
         * If the element (or any ancestor element) has CSS style `display: none`, the
         * dimensions will be zero.
         *
         * @return {Object} Object describing width and height.
         * @return {Number} return.width
         * @return {Number} return.height
         */
        getViewSize: function() {
            var dom = this.dom;

            if (dom === DOC || dom === DOC.body) {
                return {
                    width: Element.getViewportWidth(),
                    height: Element.getViewportHeight()
                };
            }
            else {
                return {
                    width: dom.clientWidth,
                    height: dom.clientHeight
                };
            }
        },

        getVisibilityMode: function() {
            var me = this,
                data = me.getData(),
                mode = data.visibilityMode;

            if (mode === undefined) {
                data.visibilityMode = mode = Element.DISPLAY;
            }

            return mode;
        },

        /**
         * Returns the offset width of the element.
         * @param {Boolean} [contentWidth] `true` to get the width minus borders and padding.
         * @return {Number} The element's width.
         */
        getWidth: function(contentWidth, preciseWidth) {
            var me = this,
                dom = me.dom,
                hidden = me.isStyle('display', 'none'),
                rect, width, floating;

            if (hidden) {
                return 0;
            }

            // Gecko will in some cases report an offsetWidth that is actually less than the width of the
            // text contents, because it measures fonts with sub-pixel precision but rounds the calculated
            // value down. Using getBoundingClientRect instead of offsetWidth allows us to get the precise
            // subpixel measurements so we can force them to always be rounded up. See
            // https://bugzilla.mozilla.org/show_bug.cgi?id=458617
            // Rounding up ensures that the width includes the full width of the text contents.
            if (Ext.supports.BoundingClientRect) {
                rect = dom.getBoundingClientRect();
                width = (me.vertical && !Ext.supports.RotatedBoundingClientRect) ?
                        (rect.bottom - rect.top) : (rect.right - rect.left);
                width = preciseWidth ? width : Math.ceil(width);
            } else {
                width = dom.offsetWidth;
            }

            // IE9/10 Direct2D dimension rounding bug: https://sencha.jira.com/browse/EXTJSIV-603
            // there is no need make adjustments for this bug when the element is vertically
            // rotated because the width of a vertical element is its rotated height
            if (Ext.supports.Direct2DBug && !me.vertical) {
                // get the fractional portion of the sub-pixel precision width of the element's text contents
                floating = me.adjustDirect2DDimension(WIDTH);
                if (preciseWidth) {
                    width += floating;
                }
                // IE9 also measures fonts with sub-pixel precision, but unlike Gecko, instead of rounding the offsetWidth down,
                // it rounds to the nearest integer. This means that in order to ensure that the width includes the full
                // width of the text contents we need to increment the width by 1 only if the fractional portion is less than 0.5
                else if (floating > 0 && floating < 0.5) {
                    width++;
                }
            }

            if (contentWidth) {
                width -= me.getBorderWidth("lr") + me.getPadding("lr");
            }

            return (width < 0) ? 0 : width;
        },

        /**
         * Gets element X position in page coordinates
         *
         * @return {Number}
         */
        getX: function() {
            return this.getXY()[0];
        },

        /**
         * Gets element X and Y positions in page coordinates
         *
         * @return {Array} [x, y]
         */
        getXY: function() {
            var round = Math.round,
                dom = this.dom,
                x = 0,
                y = 0,
                box;

            if(dom !== DOC && dom !== DOC.body){
                // IE (including IE10) throws an error when getBoundingClientRect
                // is called on an element not attached to dom
                try {
                    box = dom.getBoundingClientRect();
                } catch (ex) {
                    box = { left: 0, top: 0 };
                }

                x = round(box.left);
                y = round(box.top);
            }
            return [x, y];
        },

        /**
         * Gets element Y position in page coordinates
         *
         * @return {Number}
         */
        getY: function() {
            return this.getXY()[1];
        },

        /**
         * Checks if the specified CSS class exists on this element's DOM node.
         * @param {String} name The CSS class to check for.
         * @return {Boolean} `true` if the class exists, else `false`.
         */
        hasCls: function(name) {
            if (!this.isSynchronized) {
                this.synchronize();
            }

            return this.hasClassMap.hasOwnProperty(name);
        },

        /**
         * Hide this element - Uses display mode to determine whether to use "display",
         * "visibility", or "offsets". See {@link #setVisible}.
         * @return {Ext.dom.Element} this
         */
        hide: function() {
            this.setVisible(false);
            return this;
        },

        /**
         * Inserts this element after the passed element in the DOM.
         * @param {String/HTMLElement/Ext.dom.Element} el The element to insert after.
         * The `id` of the node, a DOM Node or an existing Element.
         * @return {Ext.dom.Element} This element.
         */
        insertAfter: function(el) {
            el = Ext.getDom(el);
            el.parentNode.insertBefore(this.dom, el.nextSibling);
            return this;
        },

        /**
         * Inserts this element before the passed element in the DOM.
         * @param {String/HTMLElement/Ext.dom.Element} el The element before which this element will be inserted.
         * The id of the node, a DOM Node or an existing Element.
         * @return {Ext.dom.Element} This element.
         */
        insertBefore: function(el) {
            el = Ext.getDom(el);
            el.parentNode.insertBefore(this.dom, el);
            return this;
        },

        /**
         * Inserts (or creates) an element as the first child of this element
         * @param {String/HTMLElement/Ext.dom.Element/Object} el The id or element to insert
         * or a DomHelper config to create and insert
         * @param {Boolean} [returnDom=false] True to return the raw DOM element instead
         * of Ext.dom.Element
         * @return {Ext.dom.Element} The new child
         */
        insertFirst: function(el, returnDom) {
            el = el || {};
            if (el.nodeType || el.dom || typeof el === 'string') { // element
                el = Ext.getDom(el);
                this.dom.insertBefore(el, this.dom.firstChild);
                return !returnDom ? Ext.get(el) : el;
            }
            else { // dh config
                return this.createChild(el, this.dom.firstChild, returnDom);
            }
        },

        /**
         * Inserts an html fragment into this element
         * @param {String} where Where to insert the html in relation to this element - beforeBegin, afterBegin, beforeEnd, afterEnd.
         * See {@link Ext.dom.Helper#insertHtml} for details.
         * @param {String} html The HTML fragment
         * @param {Boolean} [returnEl=false] True to return an Ext.dom.Element
         * @return {HTMLElement/Ext.dom.Element} The inserted node (or nearest related if more than 1 inserted)
         */
        insertHtml: function(where, html, returnEl) {
            var el = Ext.DomHelper.insertHtml(where, this.dom, html);
            return returnEl ? Ext.get(el) : el;
        },

        /**
         * Inserts (or creates) the passed element (or DomHelper config) as a sibling of this element
         * @param {String/HTMLElement/Ext.dom.Element/Object/Array} el The id, element to insert or a DomHelper config
         * to create and insert *or* an array of any of those.
         * @param {String} [where='before'] 'before' or 'after'
         * @param {Boolean} [returnDom=false] True to return the raw DOM element instead of Ext.dom.Element
         * @return {Ext.dom.Element} The inserted Element. If an array is passed, the last inserted element is returned.
         */
        insertSibling: function(el, where, returnDom) {
            var me        = this,
                DomHelper = Ext.DomHelper,
                isAfter   = (where || 'before').toLowerCase() === 'after',
                rt, insertEl, eLen, e;

            if (Ext.isIterable(el)) {
                eLen = el.length;
                insertEl = Ext.fly(document.createDocumentFragment());

                // append all elements to a documentFragment               
                if (Ext.isArray(el)) {

                    for (e = 0; e < eLen; e++) {
                        rt = insertEl.appendChild(el[e], returnDom);
                    }
                }
                // Iterable, but not an Array, must be an HtmlCollection
                else {
                    for (e = 0; e < eLen; e++) {
                        insertEl.dom.appendChild(rt = el[0]);
                    }
                    if (returnDom === false) {
                        rt = Ext.get(rt);
                    }
                }

                // Insert fragment into document
                me.dom.parentNode.insertBefore(insertEl.dom, isAfter ? me.dom.nextSibling : me.dom);
                return rt;
            }

            el = el || {};

            if (el.nodeType || el.dom) {
                rt = me.dom.parentNode.insertBefore(Ext.getDom(el), isAfter ? me.dom.nextSibling : me.dom);
                if (!returnDom) {
                    rt = Ext.get(rt);
                }
            } else {
                if (isAfter && !me.dom.nextSibling) {
                    rt = DomHelper.append(me.dom.parentNode, el, !returnDom);
                } else {
                    rt = DomHelper[isAfter ? 'insertAfter' : 'insertBefore'](me.dom, el, !returnDom);
                }
            }
            return rt;
        },

        /**
         * Returns `true` if this element matches the passed simple selector
         * (e.g. 'div.some-class' or 'span:first-child').
         * @param {String/Function} selector The simple selector to test or a function which is passed
         * candidate nodes, and should return `true` for nodes which match.
         * @return {Boolean} `true` if this element matches the selector, else `false`.
         */
        is: function(selector) {
            var dom = this.dom,
                is;

            if (!selector) {
                // In Ext 4 is() called through to DomQuery methods, and would always
                // return true if the selector was ''.  The new query() method in v5 uses
                // querySelector/querySeletorAll() which consider '' to be an invalid
                // selector and throw an error as a result.  To maintain compatibility
                // with the various users of is() we have to return true if the selector
                // is an empty string.  For example: el.up('') should return the element's
                // direct parent.
                is = true;
            } else if (!dom.tagName) {
                // document and window objects can never match a selector
                is = false;
            } else if (Ext.isFunction(selector)) {
                is = selector(dom);
            } else {
                is = dom[Ext.supports.matchesSelector](selector);
            }

            return is;
        },

        /**
         * Returns `true` if this element is an ancestor of the passed element
         * @param {String/HTMLElement/Ext.dom.Element} el The element or id of the element
         * to search for in this elements descendants.
         * @return {Boolean}
         */
        isAncestor: function(el) {
            var ret = false,
                dom = this.dom,
                child = Ext.getDom(el);

            if (dom && child) {
                if (dom.contains) {
                    return dom.contains(child);
                } else if (dom.compareDocumentPosition) {
                    return !!(dom.compareDocumentPosition(child) & 16);
                } else {
                    while ((child = child.parentNode)) {
                        ret = child === dom || ret;
                    }
                }
            }
            return ret;
        },

        isPainted: (function() {
            return !Ext.browser.is.IE ? function() {
                var dom = this.dom;
                return Boolean(dom && dom.offsetParent);
            } : function() {
                var dom = this.dom;
                return Boolean(dom && (dom.offsetHeight !== 0 && dom.offsetWidth !== 0));
            };
        })(),

        /**
         * Checks if the current value of a style is equal to a given value.
         * @param {String} style property whose value is returned.
         * @param {String} value to check against.
         * @return {Boolean} `true` for when the current value equals the given value.
         */
        isStyle: function(style, val) {
            return this.getStyle(style) === val;
        },

        /**
         * Checks whether the element is currently visible using both visibility and display properties.
         * @param {Boolean} [deep=false] True to walk the dom and see if parent elements are hidden.
         * If false, the function only checks the visibility of the element itself and it may return
         * `true` even though a parent is not visible.
         * @return {Boolean} `true` if the element is currently visible, else `false`
         */
        isVisible: function(deep) {
            var dom = this.dom,
                end;

            if (!dom) {
                return false;
            }
            if (!visFly) {
                visFly = new Ext.dom.Fly();
            }

            for (end = dom.ownerDocument.documentElement; dom !== end; dom = dom.parentNode) {
                // We're invisible if we hit a nonexistent parentNode or a document
                // fragment or computed style visibility:hidden or display:none
                if (!dom || dom.nodeType === 11 || (visFly.attach(dom)).isStyle(VISIBILITY, HIDDEN) || visFly.isStyle(DISPLAY, NONE)) {
                    return false;
                }
                // Quit now unless we are being asked to check parent nodes.
                if (!deep) {
                    break;
                }
            }

            return true;
        },

        /**
         * Gets the last child, skipping text nodes
         * @param {String} [selector] Find the previous sibling that matches the passed simple selector.
         * See {@link Ext.dom.Query} for information about simple selectors.
         * @param {Boolean} [returnDom=false] `true` to return a raw DOM node instead of an Ext.dom.Element
         * @return {Ext.dom.Element/HTMLElement} The last child or null
         */
        last: function(selector, returnDom) {
            return this.matchNode('previousSibling', 'lastChild', selector, returnDom);
        },

        matchNode: function(dir, start, selector, returnDom) {
            var dom = this.dom,
                n;

            if (!dom) {
                return null;
            }

            n = dom[start];
            while (n) {
                if (n.nodeType === 1 && (!selector || Ext.fly(n, '_matchNode').is(selector))) {
                    return !returnDom ? Ext.get(n) : n;
                }
                n = n[dir];
            }
            return null;
        },

        /**
         * Gets the next sibling, skipping text nodes
         * @param {String} [selector] Find the next sibling that matches the passed simple selector.
         * See {@link Ext.dom.Query} for information about simple selectors.
         * @param {Boolean} [returnDom=false] `true` to return a raw dom node instead of an Ext.dom.Element
         * @return {Ext.dom.Element/HTMLElement} The next sibling or null
         */
        next: function(selector, returnDom) {
            return this.matchNode('nextSibling', 'nextSibling', selector, returnDom);
        },

        /**
         * Gets the parent node for this element, optionally chaining up trying to match a selector
         * @param {String} [selector] Find a parent node that matches the passed simple selector. 
         * See {@link Ext.dom.Query} for information about simple selectors.
         * @param {Boolean} [returnDom=false] True to return a raw dom node instead of an Ext.dom.Element
         * @return {Ext.dom.Element/HTMLElement} The parent node or null
         */
        parent: function(selector, returnDom) {
            return this.matchNode('parentNode', 'parentNode', selector, returnDom);
        },

        /**
         * Initializes positioning on this element. If a desired position is not passed,
         * it will make the the element positioned relative IF it is not already positioned.
         * @param {String} [pos] Positioning to use "relative", "absolute" or "fixed"
         * @param {Number} [zIndex] The zIndex to apply
         * @param {Number} [x] Set the page X position
         * @param {Number} [y] Set the page Y position
         */
        position: function(pos, zIndex, x, y) {
            var me = this;

            if (!pos && me.isStyle(POSITION, STATIC)) {
                me.setStyle(POSITION, RELATIVE);
            } else if (pos) {
                me.setStyle(POSITION, pos);
            }
            if (zIndex) {
                me.setStyle(ZINDEX, zIndex);
            }
            if (x || y) {
                me.setXY([x || false, y || false]);
            }
        },

        /**
         * Gets the previous sibling, skipping text nodes
         * @param {String} [selector] Find the previous sibling that matches the passed simple selector.
         * See {@link Ext.dom.Query} for information about simple selectors.
         * @param {Boolean} [returnDom=false] `true` to return a raw DOM node instead of an Ext.dom.Element
         * @return {Ext.dom.Element/HTMLElement} The previous sibling or null
         */
        prev: function(selector, returnDom) {
            return this.matchNode('previousSibling', 'previousSibling', selector, returnDom);
        },

        /**
         * Selects child nodes based on the passed CSS selector.
         * Delegates to document.querySelectorAll. More information can be found at
         * [http://www.w3.org/TR/css3-selectors/](http://www.w3.org/TR/css3-selectors/)
         *
         * All selectors, attribute filters and pseudos below can be combined infinitely
         * in any order. For example `div.foo:nth-child(odd)[@foo=bar].bar:first` would be
         * a perfectly valid selector.
         *
         * ## Element Selectors:
         *
         * * \* any element
         * * E an element with the tag E
         * * E F All descendant elements of E that have the tag F
         * * E > F or E/F all direct children elements of E that have the tag F
         * * E + F all elements with the tag F that are immediately preceded by an element with the tag E
         * * E ~ F all elements with the tag F that are preceded by a sibling element with the tag E
         *
         * ## Attribute Selectors:
         *
         * The use of @ and quotes are optional. For example, div[@foo='bar'] is also a valid attribute selector.
         *
         * * E[foo] has an attribute "foo"
         * * E[foo=bar] has an attribute "foo" that equals "bar"
         * * E[foo^=bar] has an attribute "foo" that starts with "bar"
         * * E[foo$=bar] has an attribute "foo" that ends with "bar"
         * * E[foo*=bar] has an attribute "foo" that contains the substring "bar"
         * * E[foo%=2] has an attribute "foo" that is evenly divisible by 2
         * * E[foo!=bar] has an attribute "foo" that does not equal "bar"
         *
         * ## Pseudo Classes:
         *
         * * E:first-child E is the first child of its parent
         * * E:last-child E is the last child of its parent
         * * E:nth-child(n) E is the nth child of its parent (1 based as per the spec)
         * * E:nth-child(odd) E is an odd child of its parent
         * * E:nth-child(even) E is an even child of its parent
         * * E:only-child E is the only child of its parent
         * * E:checked E is an element that is has a checked attribute that is true (e.g. a radio or checkbox)
         * * E:first the first E in the resultset
         * * E:last the last E in the resultset
         * * E:nth(n) the nth E in the resultset (1 based)
         * * E:odd shortcut for :nth-child(odd)
         * * E:even shortcut for :nth-child(even)
         * * E:not(S) an E element that does not match simple selector S
         * * E:has(S) an E element that has a descendant that matches simple selector S
         * * E:next(S) an E element whose next sibling matches simple selector S
         * * E:prev(S) an E element whose previous sibling matches simple selector S
         * * E:any(S1|S2|S2) an E element which matches any of the simple selectors S1, S2 or S3//\\
         *
         * ## CSS Value Selectors:
         *
         * * E{display=none} CSS value "display" that equals "none"
         * * E{display^=none} CSS value "display" that starts with "none"
         * * E{display$=none} CSS value "display" that ends with "none"
         * * E{display*=none} CSS value "display" that contains the substring "none"
         * * E{display%=2} CSS value "display" that is evenly divisible by 2
         * * E{display!=none} CSS value "display" that does not equal "none"
         * 
         * @param {String} selector The CSS selector.
         * @param {Boolean} [asDom=true] `false` to return an array of Ext.dom.Element
         * @return {HTMLElement[]/Ext.dom.Element[]} An Array of elements that match
         * the selector.  If there are no matches, an empty Array is returned.
         */
        query: function(selector, asDom, /* private */ single) {
            var dom = this.dom,
                results, len, nlen, node, nodes, i, j;

            if (!dom) {
                return null;
            }

            asDom = (asDom !== false);

            selector = selector.split(",");

            if (!single) {
                // only allocate the results array if the full result set is being
                // requested.  selectNode() uses the 'single' param.
                results = [];
            }

            for (i = 0, len = selector.length; i <  len; i++) {
                if (typeof selector[i] === 'string') {
                    if (single) {
                        // take the "fast path" if single was requested (selectNode)
                        node = dom.querySelector(selector[i]);
                        return asDom ? node : Ext.get(node);
                    }

                    nodes = dom.querySelectorAll(selector[i]);

                    for (j = 0, nlen = nodes.length; j < nlen; j++) {
                        results.push(asDom ? nodes[j] : Ext.get(nodes[j]));
                    }
                }
            }

            return results;
        },

        /**
         * Adds one or more CSS classes to this element and removes the same class(es) from all siblings.
         * @param {String/String[]} className The CSS class to add, or an array of classes.
         * @return {Ext.dom.Element} this
         */
        radioCls: function(className) {
            var cn = this.dom.parentNode.childNodes,
                v;

            className = Ext.isArray(className) ? className : [className];
            for (var i = 0, len = cn.length; i < len; i++) {
                v = cn[i];
                if (v && v.nodeType === 1) {
                    Ext.fly(v).removeCls(className);
                }
            }
            return this.addCls(className);
        },

        redraw: function() {
            var dom = this.dom,
                domStyle = dom.style;

            domStyle.display = 'none';
            dom.offsetHeight;
            domStyle.display = '';
        },

        /**
         * @inheritdoc Ext.dom.Element#destroy
         * @deprecated 5.0.0 Please use {@link #destroy} instead.
         */
        remove: function () {
            this.destroy();
        },

        removeChild: function(element) {
            this.dom.removeChild(Ext.getDom(element));

            return this;
        },

        /**
         * Removes the given CSS class(es) from this Element.
         * @param {String/String[]} names The CSS classes to remove separated by space,
         * or an array of classes
         * @param {String} [prefix=''] Prefix to prepend to each class to be removed.
         * @param {String} [suffix=''] Suffix to append to each class to be removed.
         */
        removeCls: function(names, prefix, suffix) {
            var me = this,
                hasNewCls, dom, map, classList, i, ln, name;

            if (!names) {
                return me;
            }

            if (!me.isSynchronized) {
                me.synchronize();
            }

            if (!suffix) {
                suffix = '';
            }

            dom = me.dom;
            map = me.hasClassMap;
            classList = me.classList;

            prefix = prefix ? prefix + SEPARATOR : '';
            suffix = suffix ? SEPARATOR + suffix : '';

            if (typeof names === 'string') {
                names = names.split(spacesRe);
            }

            for (i = 0, ln = names.length; i < ln; i++) {
                name = prefix + names[i] + suffix;

                if (map[name]) {
                    delete map[name];
                    Ext.Array.remove(classList, name);
                    hasNewCls = true;
                }
            }

            if (hasNewCls) {
                dom.className = classList.join(' ');
            }

            return me;
        },

        /**
         * Forces the browser to repaint this element.
         * @return {Ext.dom.Element} this
         */
        repaint: function() {
            var me = this;
            me.addCls(Ext.baseCSSPrefix + 'repaint');
            setTimeout(function() {
                if(me.dom) {  //may have been removed already on slower UAs
                    Ext.fly(me.dom).removeCls(Ext.baseCSSPrefix + 'repaint');
                }
            }, 1);
            return me;
        },

        /**
         * Replaces the passed element with this element
         * @param {String/HTMLElement/Ext.dom.Element} el The element to replace.
         * The id of the node, a DOM Node or an existing Element.
         * @param {Boolean} [destroy=true] `false` to prevent destruction of the replaced
         * element
         * @return {Ext.dom.Element} This element
         */
        replace: function(el, destroy) {
            el = Ext.getDom(el);
            var parentNode = el.parentNode,
                id = el.id,
                dom = this.dom;

            //<debug>
            if (!parentNode) {
                Ext.Error.raise('Cannot replace element "' + id +
                    '". It is not attached to a parent node.');
            }
            //</debug>

            if (destroy !== false && id && Ext.cache[id]) {
                parentNode.insertBefore(dom, el);
                Ext.get(el).destroy();
            } else {
                parentNode.replaceChild(dom, el);
            }

            return this;
        },

        /**
         * Replaces a CSS class on the element with another.
         * If the old name does not exist, the new name will simply be added.
         * @param {String} oldName The CSS class to replace.
         * @param {String} newName The replacement CSS class.
         * @param {String} [prefix=''] Prefix to prepend to each class to be replaced.
         * @param {String} [suffix=''] Suffix to append to each class to be replaced.
         * @return {Ext.dom.Element} this
         */
        replaceCls: function(oldName, newName, prefix, suffix) {
            var me = this,
                dom, map, classList, i, ln, name;

            if (!oldName && !newName) {
                return me;
            }

            oldName = oldName || [];
            newName = newName || [];

            if (!me.isSynchronized) {
                me.synchronize();
            }

            if (!suffix) {
                suffix = '';
            }

            dom = me.dom;
            map = me.hasClassMap;
            classList = me.classList;

            prefix = prefix ? prefix + SEPARATOR : '';
            suffix = suffix ? SEPARATOR + suffix : '';

            if (typeof oldName === 'string') {
                oldName = oldName.split(spacesRe);
            }
            if (typeof newName === 'string') {
                newName = newName.split(spacesRe);
            }

            for (i = 0, ln = oldName.length; i < ln; i++) {
                name = prefix + oldName[i] + suffix;

                if (map[name]) {
                    delete map[name];
                    Ext.Array.remove(classList, name);
                }
            }

            for (i = 0, ln = newName.length; i < ln; i++) {
                name = prefix + newName[i] + suffix;

                if (!map[name]) {
                    map[name] = true;
                    classList.push(name);
                }
            }

            dom.className = classList.join(' ');

            return me;
        },

        /**
         * Replaces this element with the passed element
         * @param {String/HTMLElement/Ext.dom.Element/Object} el The new element (id of the
         * node, a DOM Node or an existing Element) or a DomHelper config of an element to create
         * @return {Ext.dom.Element} This element
         */
        replaceWith: function(el){
            var me = this,
                dom = me.dom,
                parent = dom.parentNode,
                cache = Ext.cache,
                newDom;

            me.clearListeners();

            if (el.nodeType || el.dom || typeof el === 'string') {
                el = Ext.get(el);
                newDom = parent.insertBefore(el.dom, dom);
            } else {
                // domhelper config
                newDom = Ext.DomHelper.insertBefore(dom, el);
            }
            parent.removeChild(dom);

            me.dom = newDom;
            if (!me.isFly) {
                delete cache[me.id];
                cache[me.id = Ext.id(newDom)] = me;
            }

            return me;
        },

        resolveListenerScope: function (defaultScope) {
            // Override this to pass along to our owning component (if we have one).
            var component = this.component;
            return component ? component.resolveListenerScope(defaultScope) : this;
        },

        /**
         * Selects descendant elements of this element based on the passed CSS selector to
         * enable {@link Ext.dom.Element Element} methods to be applied to many related
         * elements in one statement through the returned
         * {@link Ext.dom.CompositeElementLite CompositeElementLite} object.
         *
         * @param {String/HTMLElement[]} selector The CSS selector or an array of elements
         * @param {Boolean} composite Return a CompositeElement as opposed to a
         * CompositeElementLite. Defaults to false.
         * @return {Ext.dom.CompositeElementLite/Ext.dom.CompositeElement}
         */
        select: function(selector, composite) {
            var isElementArray, elements;

            if (typeof selector === "string") {
                elements = this.query(selector, !composite);
            }
            //<debug>
            else if (selector.length === undefined) {
                Ext.Error.raise("Invalid selector specified: " + selector);
            }
            //</debug>
            else {
                // if selector is not a string, assume it is already an array of
                // HTMLElement
                elements = selector;
                isElementArray = true;
            }

            // if the selector parameter was a string we will have called through
            // to query, and it will have constructed either an array of
            // HTMLElement or Ext.Element, depending on the composite param we gave
            // it.  If this is the case we can take the fast path through the 
            // CompositeElementLite constructor to avoid calling getDom() or get()
            // on every element in the array.
            return composite ? new Ext.CompositeElement(elements, !isElementArray) :
                new Ext.CompositeElementLite(elements, true);
        },

        /**
         * Selects a single descendant element of this element using a CSS selector
         * (see {@link #query}).
         * @param {String} selector The selector query
         * @param {Boolean} [asDom=true] `false` to return an array of Ext.dom.Element
         * @return {HTMLElement} The DOM element which matched the selector.
         */
        selectNode: function(selector, asDom) {
            return this.query(selector, asDom, true);
        },

        /**
         * Sets the passed attributes as attributes of this element (a style attribute can be a string, object or function).
         * @param {Object} attributes The object with the attributes.
         * @param {Boolean} [useSet=true] `false` to override the default `setAttribute` to use expandos.
         * @return {Ext.dom.Element} this
         */
        set: function(attributes, useSet) {
            var me = this,
                dom = me.dom,
                attribute, value;

            for (attribute in attributes) {
                if (attributes.hasOwnProperty(attribute)) {
                    value = attributes[attribute];

                    if (attribute === 'style') {
                        me.applyStyles(value);
                    }
                    else if (attribute === 'cls') {
                        dom.className = value;
                    }
                    else if (useSet !== false) {
                        if (value === undefined) {
                            dom.removeAttribute(attribute);
                        } else {
                            dom.setAttribute(attribute, value);
                        }
                    }
                    else {
                        dom[attribute] = value;
                    }
                }
            }

            return me;
        },

        /**
         * Sets the element's CSS bottom style.
         * @param {Number/String} bottom Number of pixels or CSS string value to set as
         * the bottom CSS property value
         * @return {Ext.dom.Element} this
         */
        setBottom: function(bottom) {
            this.dom.style[BOTTOM] = Element.addUnits(bottom);
            return this;
        },

        setBorder: function(border) {
            var me = this,
                domStyle = me.dom.style;

            if (border || border === 0) {
                border = me.self.unitizeBox((border === true) ? 1 : border);
                domStyle.setProperty('border-width', border, 'important');
            }
            else {
                domStyle.removeProperty('border-top-width');
                domStyle.removeProperty('border-right-width');
                domStyle.removeProperty('border-bottom-width');
                domStyle.removeProperty('border-left-width');
            }
        },

        /**
         * Sets the specified CSS class on this element's DOM node.
         * @param {String/Array} className The CSS class to set on this element.
         */
        setCls: function(className) {
            var me = this,
                map = me.hasClassMap,
                i, ln, name;

            if (typeof className === 'string') {
                className = className.split(spacesRe);
            }

            for (i = 0, ln = className.length; i < ln; i++) {
                name = className[i];
                if (!map[name]) {
                    map[name] = true;
                }
            }

            me.classList = className.slice();
            me.dom.className = className.join(' ');
        },

        /**
         * Set the height of this Element.
         * @param {Number/String} height The new height.
         * @return {Ext.dom.Element} this
         */
        setHeight: function(height) {
            this.dom.style[HEIGHT] = Element.addUnits(height);
            return this;
        },

        /**
         * Sets the `innerHTML` of this element.
         * @param {String} html The new HTML.
         */
        setHtml: function(html) {
            if (this.dom) {
                this.dom.innerHTML = html;
            }
        },

        setId: function(id) {
            var me = this,
                currentId = me.id,
                cache = Ext.cache;

            if (currentId) {
                delete cache[currentId];
            }

            me.dom.id = id;

            /**
             * The DOM element ID
             * @property id
             * @type String
             */
            me.id = id;

            cache[id] = me;

            return me;
        },

        /**
         * Sets the element's left position directly using CSS style
         * (instead of {@link #setX}).
         * @param {Number/String} left Number of pixels or CSS string value to
         * set as the left CSS property value
         * @return {Ext.dom.Element} this
         */
        setLeft: function(left) {
            this.dom.style[LEFT] = Element.addUnits(left); 
            return this;
        },

        setLocalX: function(x) {
            var style = this.dom.style;

            // clear right style just in case it was previously set by rtlSetXY/rtlSetLocalXY
            style.right = 'auto';
            style.left = (x === null) ? 'auto' : x + 'px';
        },

        setLocalXY: function(x, y) {
            var style = this.dom.style;

            // clear right style just in case it was previously set by rtlSetXY/rtlSetLocalXY
            style.right = 'auto';

            if (x && x.length) {
                y = x[1];
                x = x[0];
            }

            if (x === null) {
                style.left = 'auto';
            } else if (x !== undefined) {
                style.left = x + 'px';
            }

            if (y === null) {
                style.top = 'auto';
            } else if (y !== undefined) {
                style.top = y + 'px';
            }
        },

        setLocalY: function(y) {
            this.dom.style.top = (y === null) ? 'auto' : y + 'px';
        },

        setMargin: function(margin) {
            var me = this,
                domStyle = me.dom.style;

            if (margin || margin === 0) {
                margin = me.self.unitizeBox((margin === true) ? 5 : margin);
                domStyle.setProperty('margin', margin, 'important');
            }
            else {
                domStyle.removeProperty('margin-top');
                domStyle.removeProperty('margin-right');
                domStyle.removeProperty('margin-bottom');
                domStyle.removeProperty('margin-left');
            }
        },

        /**
         * Set the maximum height of this Element.
         * @param {Number/String} height The new maximum height.
         * @return {Ext.dom.Element} this
         */
        setMaxHeight: function(height) {
            this.dom.style[MAX_HEIGHT] = Element.addUnits(height);
            return this;
        },

        /**
         * Set the maximum width of this Element.
         * @param {Number/String} width The new maximum width.
         * @return {Ext.dom.Element} this
         */
        setMaxWidth: function(width) {
            this.dom.style[MAX_WIDTH] = Element.addUnits(width);
            return this;
        },

        /**
         * Set the minimum height of this Element.
         * @param {Number/String} height The new minimum height.
         * @return {Ext.dom.Element} this
         */
        setMinHeight: function(height) {
            this.dom.style[MIN_HEIGHT] = Element.addUnits(height);
            return this;
        },

        /**
         * Set the minimum width of this Element.
         * @param {Number/String} width The new minimum width.
         * @return {Ext.dom.Element} this
         */
        setMinWidth: function(width) {
            this.dom.style[MIN_WIDTH] = Element.addUnits(width);
            return this;
        },

        setPadding: function(padding) {
            var me = this,
                domStyle = me.dom.style;

            if (padding || padding === 0) {
                padding = me.self.unitizeBox((padding === true) ? 5 : padding);
                domStyle.setProperty('padding', padding, 'important');
            }
            else {
                domStyle.removeProperty('padding-top');
                domStyle.removeProperty('padding-right');
                domStyle.removeProperty('padding-bottom');
                domStyle.removeProperty('padding-left');
            }
        },

        /**
         * Sets the element's CSS right style.
         * @param {Number/String} right Number of pixels or CSS string value to
         * set as the right CSS property value
         * @return {Ext.dom.Element} this
         */
        setRight: function(right) {
            this.dom.style[RIGHT] = Element.addUnits(right);
            return this;
        },

        /**
         * Set the size of this Element.
         *
         * @param {Number/String} width The new width. This may be one of:
         *
         * - A Number specifying the new width in pixels.
         * - A String used to set the CSS width style. Animation may **not** be used.
         * - A size object in the format `{width: widthValue, height: heightValue}`.
         *
         * @param {Number/String} height The new height. This may be one of:
         *
         * - A Number specifying the new height in pixels.
         * - A String used to set the CSS height style. Animation may **not** be used.
         * @return {Ext.dom.Element} this
         */
        setSize: function(width, height) {
            var me = this,
                style = me.dom.style;

            if (Ext.isObject(width)) {
                // in case of object from getSize()
                height = width.height;
                width = width.width;
            }

            style.width = Element.addUnits(width);
            style.height = Element.addUnits(height);
            return me;
        },

        setSizeState: function(state) {
            var me = this,
                classes = ['x-sized', 'x-unsized', 'x-stretched'],
                states = [true, false, null],
                index = states.indexOf(state),
                addedClass;

            if (index !== -1) {
                addedClass = classes[index];
                classes.splice(index, 1);
                me.addCls(addedClass);
            }

            me.removeCls(classes);

            return me;
        },

        /**
         * Wrapper for setting style properties, also takes single object parameter of multiple styles.
         * @param {String/Object} property The style property to be set, or an object of multiple styles.
         * @param {String} [value] The value to apply to the given property, or null if an object was passed.
         * @return {Ext.dom.Element} this
         */
        setStyle: function(prop, value) {
            var me = this,
                dom = me.dom,
                hooks = me.styleHooks,
                style = dom.style,
                name = prop,
                hook;

            // we don't promote the 2-arg form to object-form to avoid the overhead...
            if (typeof name === 'string') {
                hook = hooks[name];
                if (!hook) {
                    hooks[name] = hook = { name: Element.normalize(name) };
                }
                value = (value == null) ? '' : value; // map null && undefined to ''
                if (hook.set) {
                    hook.set(dom, value, me);
                } else {
                    style[hook.name] = value;
                }
                if (hook.afterSet) {
                    hook.afterSet(dom, value, me);
                }
            } else {
                for (name in prop) {
                    if (prop.hasOwnProperty(name)) {
                        hook = hooks[name];
                        if (!hook) {
                            hooks[name] = hook = { name: Element.normalize(name) };
                        }
                        value = prop[name];
                        value = (value == null) ? '' : value; // map null && undefined to ''
                        if (hook.set) {
                            hook.set(dom, value, me);
                        } else {
                            style[hook.name] = value;
                        }
                        if (hook.afterSet) {
                            hook.afterSet(dom, value, me);
                        }
                    }
                }
            }

            return me;
        },

        setText: function(text) {
            this.dom.textContent = text;
        },

        /**
         * Sets the element's top position directly using CSS style
         * (instead of {@link #setY}).
         * @param {Number/String} top Number of pixels or CSS string value to
         * set as the top CSS property value
         * @return {Ext.dom.Element} this
         */
        setTop: function(top) {
            this.dom.style[TOP] = Element.addUnits(top);
            return this;
        },

        // private
        setVisibility: function(isVisible) {
            var domStyle = this.dom.style;

            if (isVisible) {
                domStyle.removeProperty('visibility');
            }
            else {
                domStyle.setProperty('visibility', 'hidden', 'important');
            }
        },

        /**
         * Use this to change the visibility mode between {@link #VISIBILITY}, {@link #DISPLAY} or {@link #OFFSETS}.
         */
        setVisibilityMode: function(mode) {
            //<debug>
            if (mode !== 1 && mode !== 2 && mode !== 3) {
                Ext.Error.raise("visibilityMode must be one of the following: " +
                    "Ext.Element.DISPLAY, Ext.Element.VISIBILITY, or Ext.Element.OFFSETS");
            }
            //</debug>
            this.getData().visibilityMode = mode;
            return this;
        },

        /**
         * Sets the visibility of the element based on the current visibility mode. Use
         * {@link #setVisibilityMode} to switch between the following visibility modes:
         * 
         * - {@link #DISPLAY} (the default)
         * - {@link #VISIBILITY}
         * - {@link #OFFSETS}
         * 
         * @param {Boolean} visible Whether the element is visible.
         * @return {Ext.dom.Element} this
         */
        setVisible: function(visible) {
            var me = this,
                mode = me.getVisibilityMode(),
                method = visible ? 'removeCls' : 'addCls';

            switch (mode) {
                case Element.DISPLAY:
                    me.removeCls([visibilityCls, offsetsCls]);
                    me[method](displayCls);
                    break;

                case Element.VISIBILITY:
                    me.removeCls([displayCls, offsetsCls]);
                    me[method](visibilityCls);
                    break;

                case Element.OFFSETS:
                    me.removeCls([visibilityCls, displayCls]);
                    me[method](offsetsCls);
                    break;
            }

            return me;
        },

        /**
         * Set the width of this Element.
         * @param {Number/String} width The new width.
         * @return {Ext.dom.Element} this
         */
        setWidth: function(width) {
            this.dom.style[WIDTH] = Element.addUnits(width);
            return this;
        },

        /**
         * Sets this Element's page-level x coordinate
         * @param {Number} x
         * @return {Ext.dom.Element} this
         */
        setX: function(x) {
            return this.setXY([x, false]);
        },

        /**
         * Sets this Element's page-level x and y coordinates
         * @param {Number[]} xy
         * @return {Ext.dom.Element} this
         */
        setXY: function(xy) {
            var me = this,
                pts = me.translatePoints(xy),
                style = me.dom.style,
                pos;

            me.position();

            // right position may have been previously set by rtlSetXY or
            // rtlSetLocalXY so clear it here just in case.
            style.right = 'auto';
            for (pos in pts) {
                if (!isNaN(pts[pos])) {
                    style[pos] = pts[pos] + 'px';
                }
            }
            return me;
        },

        /**
         * Sets this Element's page-level y coordinate
         * @param {Number} y
         * @return {Ext.dom.Element} this
         */
        setY: function(y) {
            return this.setXY([false, y]);
        },

        /**
         * Show this element - Uses display mode to determine whether to use "display",
         * "visibility", or "offsets". See {@link #setVisible}.
         * @return {Ext.dom.Element} this
         */
        show: function() {
            this.setVisible(true);
            return this;
        },

        /**
         * @private
         * @param {String} firstClass
         * @param {String} secondClass
         * @param {Boolean} flag
         * @param {String} prefix
         * @return {Mixed}
         */
        swapCls: function(firstClass, secondClass, flag, prefix) {
            if (flag === undefined) {
                flag = true;
            }

            var me = this,
                addedClass = flag ? firstClass : secondClass,
                removedClass = flag ? secondClass : firstClass;

            if (removedClass) {
                me.removeCls(prefix ? prefix + '-' + removedClass : removedClass);
            }

            if (addedClass) {
                me.addCls(prefix ? prefix + '-' + addedClass : addedClass);
            }

            return me;
        },

        /**
         * @private
         */
        synchronize: function() {
            var me = this,
                dom = me.dom,
                hasClassMap = {},
                className = dom.className,
                classList, i, ln, name;

            if (className && className.length > 0) {
                classList = dom.className.split(classNameSplitRegex);

                for (i = 0, ln = classList.length; i < ln; i++) {
                    name = classList[i];
                    hasClassMap[name] = true;
                }
            }
            else {
                classList = [];
            }

            me.classList = classList;

            me.hasClassMap = hasClassMap;

            me.isSynchronized = true;

            return me;
        },

        /**
         * Toggles the specified CSS class on this element (removes it if it already exists, otherwise adds it).
         * @param {String} className The CSS class to toggle.
         * @return {Ext.dom.Element} this
         */
        toggleCls: function(className, force){
            if (typeof force !== 'boolean') {
                force = !this.hasCls(className);
            }

            return (force) ? this.addCls(className) : this.removeCls(className);
        },

        /**
         * Toggles the element's visibility, depending on visibility mode.
         * @return {Ext.dom.Element} this
         */
        toggle: function() {
            this.setVisible(!this.isVisible());
            return this;
        },

        translate: function() {
            var transformStyleName = 'webkitTransform' in DOC.createElement('div').style ? 'webkitTransform' : 'transform';

            return function(x, y, z) {
                this.dom.style[transformStyleName] = 'translate3d(' + (x || 0) + 'px, ' + (y || 0) + 'px, ' + (z || 0) + 'px)';
            };
        }(),

        // private
        unwrap: function() {
            var dom = this.dom,
                parentNode = dom.parentNode,
                grandparentNode;

            if (parentNode) {
                grandparentNode = parentNode.parentNode;
                grandparentNode.insertBefore(dom, parentNode);
                grandparentNode.removeChild(parentNode);
            }
            else {
                grandparentNode = document.createDocumentFragment();
                grandparentNode.appendChild(dom);
            }

            return this;
        },

        /**.
         * Walks up the dom looking for a parent node that matches the passed simple selector (e.g. 'div.some-class' or 'span:first-child').
         * This is a shortcut for findParentNode() that always returns an Ext.dom.Element.
         * @param {String} selector The simple selector to test. See {@link Ext.dom.Query} for information about simple selectors.
         * @param {Number/String/HTMLElement/Ext.dom.Element} [limit]
         * The max depth to search as a number or an element which causes the upward traversal to stop
         * and is <b>not</b> considered for inclusion as the result. (defaults to 50 || document.documentElement)
         * @param {Boolean} [returnDom=false] True to return the DOM node instead of Ext.dom.Element
         * @return {Ext.dom.Element} The matching DOM node (or null if no match was found)
         */
        up: function(simpleSelector, limit, returnDom) {
            return this.findParentNode(simpleSelector, limit, !returnDom);
        },

        /**
         * @inheritdoc Ext.dom.Element#setHtml
         * @deprecated 5.0.0 Please use {@link #setHtml} instead.
         */
        update: function (html) {
            return this.setHtml(html);
        },

        /**
         * Creates and wraps this element with another element
         * @param {Object} [config] DomHelper element config object for the wrapper element or null for an empty div
         * @param {Boolean} [returnDom=false] True to return the raw DOM element instead of Ext.dom.Element
         * @param {String} [selector] A CSS selector to select a descendant node within the created element to use as the wrapping element.
         * @return {HTMLElement/Ext.dom.Element} The newly created wrapper element
         */
        wrap: function(config, returnDom, selector) {
            var me = this,
                dom = me.dom,
                newEl = Ext.DomHelper.insertBefore(dom, config || {tag: "div"}, true),
                target = newEl;
            
            if (selector) {
                target = newEl.selectNode(selector);
            }

            target.appendChild(dom);
            return returnDom ? newEl.dom : newEl;
        },

        deprecated: {
            '5.0': {
                methods: {
                    /**
                     * @method cssTranslate
                     * Translates an element using CSS 3 in 2D.
                     * @removed 5.0.0
                     */
                    cssTranslate: null,

                    /**
                     * @method getHTML
                     * @inheritdoc Ext.dom.Element#getHtml
                     * @deprecated 5.0.0 Please use {@link #getHtml} instead.
                     */
                    getHTML: 'getHtml',

                    /**
                     * @method getOuterHeight
                     * Retrieves the height of the element account for the top and bottom margins.
                     * @removed 5.0.0
                     */
                    getOuterHeight: null,

                    /**
                     * @method getOuterWidth
                     * Retrieves the width of the element accounting for the left and right margins.
                     * @removed 5.0.0
                     */
                    getOuterWidth: null,

                    /**
                     * Returns an object defining the area of this Element which can be passed to
                     * {@link Ext.util.Positionable#setBox} to set another Element's size/location to match this element.
                     *
                     * @param {Boolean} [asRegion] If true an Ext.util.Region will be returned
                     * @return {Object/Ext.util.Region} box An object in the following format:
                     *
                     *     {
                     *         left: <Element's X position>,
                     *         top: <Element's Y position>,
                     *         width: <Element's width>,
                     *         height: <Element's height>,
                     *         bottom: <Element's lower bound>,
                     *         right: <Element's rightmost bound>
                     *     }
                     *
                     * The returned object may also be addressed as an Array where index 0 contains
                     * the X position and index 1 contains the Y position. So the result may also be
                     * used for {@link #setXY}
                     * @deprecated 5.0.0 use {@link Ext.util.Positionable#getBox} to get a box object, and
                     * {@link Ext.util.Positionable#getRegion} to get a {@link Ext.util.Region Region}.
                     */
                    getPageBox: function(getRegion) {
                        var me = this,
                            dom = me.dom,
                            isDoc = dom.nodeName === 'BODY',
                            w = isDoc ? Element.getViewportWidth() : dom.offsetWidth,
                            h = isDoc ? Element.getViewportHeight() : dom.offsetHeight,
                            xy = me.getXY(),
                            t = xy[1],
                            r = xy[0] + w,
                            b = xy[1] + h,
                            l = xy[0];

                        if (getRegion) {
                            return new Ext.util.Region(t, r, b, l);
                        }
                        else {
                            return {
                                left: l,
                                top: t,
                                width: w,
                                height: h,
                                right: r,
                                bottom: b
                            };
                        }
                    },

                    /**
                     * @method getScrollParent
                     * Gets the Scroller instance of the first parent that has one.
                     * @removed 5.0.0
                     */
                    getScrollParent: null,

                    /**
                     * @method isDescendent
                     * Determines if this element is a descendant of the passed in Element.
                     * @removed 5.0.0
                     */
                    isDescendent: null,

                    /**
                     * Returns `true` if the value of the given property is visually transparent. This
                     * may be due to a 'transparent' style value or an rgba value with 0 in the alpha
                     * component.
                     * @param {String} prop The style property whose value is to be tested.
                     * @return {Boolean} `true` if the style property is visually transparent.
                     * @deprecated 5.0.0
                     */
                    isTransparent: function(prop) {
                        var value = this.getStyle(prop);

                        return value ? transparentRe.test(value) : false;
                    },

                    /**
                     * @method purgeAllListeners
                     * @inheritdoc Ext.dom.Element#clearListeners
                     * @deprecated 5.0.0 Please use {@link #clearListeners} instead.
                     */
                    purgeAllListeners: 'clearListeners',

                    /**
                     * @method removeAllListeners
                     * @inheritdoc Ext.dom.Element#clearListeners
                     * @deprecated 5.0.0 Please use {@link #clearListeners} instead.
                     */
                    removeAllListeners: 'clearListeners',

                    /**
                     * @method setHTML
                     * @inheritdoc Ext.dom.Element#setHtml
                     * @deprecated 5.0.0 Please use {@link #setHtml} instead.
                     */
                    setHTML: 'setHtml',

                    /**
                     * @method setTopLeft
                     * Sets the element's top and left positions directly using CSS style.
                     * @removed 5.0.0
                     */
                    setTopLeft: null
                }
            }
        }
    };
}, function(Element) {
    var DOC = document,
        prototype = Element.prototype,
        supports = Ext.supports,
        pointerdown = 'pointerdown',
        pointermove = 'pointermove',
        pointerup = 'pointerup',
        pointercancel = 'pointercancel',
        MSPointerDown = 'MSPointerDown',
        MSPointerMove = 'MSPointerMove',
        MSPointerUp = 'MSPointerUp',
        MSPointerCancel = 'MSPointerCancel',
        mousedown = 'mousedown',
        mousemove = 'mousemove',
        mouseup = 'mouseup',
        mouseover = 'mouseover',
        mouseout = 'mouseout',
        mouseenter = 'mouseenter',
        mouseleave = 'mouseleave',
        touchstart = 'touchstart',
        touchmove = 'touchmove',
        touchend = 'touchend',
        touchcancel = 'touchcancel',
        click = 'click',
        dblclick = 'dblclick',
        tap = 'tap',
        doubletap = 'doubletap',
        eventMap = prototype.eventMap = {},
        additiveEvents = prototype.additiveEvents = {},
        oldId = Ext.id;

    /**
     * Generates unique ids. If the element already has an id, it is unchanged
     * @param {Object/HTMLElement/Ext.dom.Element} [obj] The element to generate an id for
     * @param {String} prefix (optional) Id prefix (defaults "ext-gen")
     * @return {String} The generated Id.
     */
    Ext.id = function (obj, prefix) {
        var el = Ext.getDom(obj, true),
            sandboxPrefix, id;

        if (!el) {
            id = oldId(obj, prefix);
        } else if (!(id = el.id)) {
            id = oldId(null, prefix || Element.prototype.identifiablePrefix);

            if (Ext.isSandboxed) {
                sandboxPrefix = Ext.sandboxPrefix ||
                    (Ext.sandboxPrefix = Ext.sandboxName.toLowerCase() + '-');
                id = sandboxPrefix + id;
            }

            el.id = id;
        }

        return id;
    };

    if (supports.PointerEvents) {
        eventMap[mousedown] = pointerdown;
        eventMap[mousemove] = pointermove;
        eventMap[mouseup] = pointerup;
        eventMap[touchstart] = pointerdown;
        eventMap[touchmove] = pointermove;
        eventMap[touchend] = pointerup;
        eventMap[touchcancel] = pointercancel;
        eventMap[click] = tap;
        eventMap[dblclick] = doubletap;

        // On devices that support pointer events we block pointerover, pointerout,
        // pointerenter, and pointerleave when triggered by touch input (see
        // Ext.event.publisher.Dom#blockedPointerEvents).  This is because mouseover
        // behavior is typically not desired when touching the screen.  This covers the
        // use case where user code requested a pointer event, however mouseover/mouseout
        // events are not cancellable, period.
        // http://www.w3.org/TR/pointerevents/#mapping-for-devices-that-do-not-support-hover
        // To ensure mouseover/out handlers don't fire when touching the screen, we need
        // to translate them to their pointer equivalents
        eventMap[mouseover] = 'pointerover';
        eventMap[mouseout] = 'pointerout';
        eventMap[mouseenter] = 'pointerenter';
        eventMap[mouseleave] = 'pointerleave';
    } else if (supports.MSPointerEvents) {
        // IE10
        eventMap[pointerdown] = MSPointerDown;
        eventMap[pointermove] = MSPointerMove;
        eventMap[pointerup] = MSPointerUp;
        eventMap[pointercancel] = MSPointerCancel;
        eventMap[mousedown] = MSPointerDown;
        eventMap[mousemove] = MSPointerMove;
        eventMap[mouseup] = MSPointerUp;
        eventMap[touchstart] = MSPointerDown;
        eventMap[touchmove] = MSPointerMove;
        eventMap[touchend] = MSPointerUp;
        eventMap[touchcancel] = MSPointerCancel;
        eventMap[click] = tap;
        eventMap[dblclick] = doubletap;

        // translate mouseover/out so they can be prevented on touch screens.
        // (see above comment in the PointerEvents section)
        eventMap[mouseover] = 'MSPointerOver';
        eventMap[mouseout] = 'MSPointerOut';
    } else if (supports.TouchEvents) {
        eventMap[pointerdown] = touchstart;
        eventMap[pointermove] = touchmove;
        eventMap[pointerup] = touchend;
        eventMap[pointercancel] = touchcancel;
        eventMap[mousedown] = touchstart;
        eventMap[mousemove] = touchmove;
        eventMap[mouseup] = touchend;
        eventMap[click] = tap;
        eventMap[dblclick] = doubletap;

        if (Ext.isWebKit && Ext.os.is.Desktop) {
            // Touch enabled webkit browsers on windows8 fire both mouse events and touch
            // events. so we have to attach listeners for both kinds when either one is
            // requested.  There are a couple rules to keep in mind:
            // 1. When the mouse is used, only a mouse event is fired
            // 2. When interacting with the touch screen touch events are fired.
            // 3. After a touchstart/touchend sequence, if there was no touchmove in
            // between, the browser will fire a mousemove/mousedown/mousup sequence
            // immediately after.  This can cause problems because if we are listening
            // for both kinds of events, handlers may run twice.  To work around this
            // issue we filter out the duplicate emulated mouse events by checking their
            // coordinates and timing (see Ext.event.publisher.Gesture#onDelegatedEvent)
            eventMap[touchstart] = mousedown;
            eventMap[touchmove] = mousemove;
            eventMap[touchend] = mouseup;
            eventMap[touchcancel] = mouseup;

            additiveEvents[mousedown] = mousedown;
            additiveEvents[mousemove] = mousemove;
            additiveEvents[mouseup] = mouseup;
            additiveEvents[touchstart] = touchstart;
            additiveEvents[touchmove] = touchmove;
            additiveEvents[touchend] = touchend;
            additiveEvents[touchcancel] = touchcancel;

            additiveEvents[pointerdown] = mousedown;
            additiveEvents[pointermove] = mousemove;
            additiveEvents[pointerup] = mouseup;
            additiveEvents[pointercancel] = mouseup;
        }
    } else {
        // browser does not support either pointer or touch events, map all pointer and
        // touch events to their mouse equivalents
        eventMap[pointerdown] = mousedown;
        eventMap[pointermove] = mousemove;
        eventMap[pointerup] = mouseup;
        eventMap[pointercancel] = mouseup;
        eventMap[touchstart] = mousedown;
        eventMap[touchmove] = mousemove;
        eventMap[touchend] = mouseup;
        eventMap[touchcancel] = mouseup;
    }

    /**
     * @private
     * Returns the `X,Y` position of this element without regard to any RTL
     * direction settings.
     */
    prototype.getTrueXY = prototype.getXY;

    /**
     * @member Ext
     * @method select
     * @alias Ext.dom.Element#static-method-select
     */
    Ext.select = Element.select;

    /**
     * @member Ext
     * @method query
     * @alias Ext.dom.Element#static-method-query
     */
    Ext.query = Element.query;

    Ext.apply(Ext, {
        /**
         * @member Ext
         * @method get
         * @alias Ext.dom.Element#get
         */
        get: function(element) {
            return Element.get(element);
        },

        /**
         * @member Ext
         * @method getDom
         * Return the dom node for the passed String (id), dom node, or Ext.Element.
         * Here are some examples:
         *
         *     // gets dom node based on id
         *     var elDom = Ext.getDom('elId');
         *
         *     // gets dom node based on the dom node
         *     var elDom1 = Ext.getDom(elDom);
         *
         *     // If we don't know if we are working with an
         *     // Ext.Element or a dom node use Ext.getDom
         *     function(el){
         *         var dom = Ext.getDom(el);
         *         // do something with the dom node
         *     }
         *
         * __Note:__ the dom node to be found actually needs to exist (be rendered, etc)
         * when this method is called to be successful.
         * 
         * @param {String/HTMLElement/Ext.dom.Element} el
         * @return {HTMLElement}
         */
        getDom: function(el) {
            if (!el || !DOC) {
                return null;
            }

            return el.dom || (typeof el === 'string' ? Ext.getElementById(el) : el);
        },

        /**
         * @member Ext
         * Returns the current document body as an {@link Ext.dom.Element}.
         * @return {Ext.dom.Element} The document body.
         */
        getBody: function() {
            if (!Ext._bodyEl) {
                if (!DOC.body) {
                    throw new Error("[Ext.getBody] document.body does not yet exist");
                }

                Ext._bodyEl = Ext.get(DOC.body);
            }

            return Ext._bodyEl;
        },

        /**
         * @member Ext
         * Returns the current document head as an {@link Ext.dom.Element}.
         * @return {Ext.dom.Element} The document head.
         */
        getHead: function() {
            if (!Ext._headEl) {
                Ext._headEl = Ext.get(DOC.head || DOC.getElementsByTagName('head')[0]);
            }

            return Ext._headEl;
        },

        /**
         * @member Ext
         * Returns the current HTML document object as an {@link Ext.dom.Element}.
         * Typically used for attaching event listeners to the document.  Note: since
         * the document object is not an HTMLElement many of the Ext.dom.Element methods
         * are not applicable and may throw errors if called on the returned
         * Element instance.
         * @return {Ext.dom.Element} The document.
         */
        getDoc: function() {
            if (!Ext._docEl) {
                Ext._docEl = Ext.get(DOC);
            }

            return Ext._docEl;
        },

        /**
         * @member Ext
         * Returns the current window object as an {@link Ext.dom.Element}.
         * Typically used for attaching event listeners to the window.  Note: since
         * the window object is not an HTMLElement many of the Ext.dom.Element methods
         * are not applicable and may throw errors if called on the returned
         * Element instance.
         * @return {Ext.dom.Element} The window.
         */
        getWin: function() {
            if (!Ext._winEl) {
                Ext._winEl = Ext.get(window);
            }

            return Ext._winEl;
        },
        
        /**
         * @member Ext
         * Removes an HTMLElement from the document.  If the HTMLElement was previously
         * cached by a call to Ext.get(), removeNode will call the {@link Ext.Element#destroy
         * destroy} method of the {@link Ext.dom.Element} instance, which removes all DOM
         * event listeners, and deletes the cache reference.
         * @param {HTMLElement} node The node to remove
         * @method
         */
        removeNode: function(node) {
            var id = node && node.id,
                el = Ext.cache[id],
                parent;

            if (el) {
                el.destroy();
            } else if(node && node.tagName.toUpperCase() !== 'BODY'){
                parent = node.parentNode;
                if (parent) {
                    parent.removeChild(node);
                }
            }
        }
    });

    // TODO: make @inline work - SDKTOOLS-686
    // @inline
    Ext.isGarbage = function(dom) {
        // determines if the dom element is in the document or in the detached body element
        // use by collectGarbage and Ext.get()
        return dom &&
            // Must be an element. window, document and documentElement can never be garbage.
            dom.nodeType === 1 &&
            // if the element does not have a parent node, it is definitely not in the
            // DOM - we can exit immediately
            (!dom.parentNode ||
            // If the element has an offset parent we can bail right away, it is
            // definitely in the DOM.
            (!dom.offsetParent &&
            // if the element does not have an offsetParent it can mean the element is
            // either not in the dom or it is hidden.  The next step is to check to see
            // if it can be found by id using either document.all or getElementById(),
            // whichever is faster for the current browser.  Normally we would not
            // include IE-specific checks in the sencha-core package, however,  in this
            // case the function will be inlined and therefore cannot be overridden in
            // the ext package.
                !(Ext.isIE8 ? DOC.all[dom.id] : DOC.getElementById(dom.id)) &&
                // finally if the element was not found in the dom by id, we need to check
                // the detachedBody element
                !(Ext.detachedBodyEl && Ext.detachedBodyEl.isAncestor(dom))));
    };
});
