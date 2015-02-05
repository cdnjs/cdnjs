/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
// @tag dom,core
/**
 * @class Ext.dom.Element
 * @alternateClassName Ext.Element
 * @alternateClassName Ext.core.Element
 * @extends Ext.dom.AbstractElement
 *
 * Encapsulates a DOM element, adding simple DOM manipulation facilities, normalizing for browser differences.
 *
 * All instances of this class inherit the methods of {@link Ext.fx.Anim} making visual effects easily available to all
 * DOM elements.
 *
 * Note that the events documented in this class are not Ext events, they encapsulate browser events. Some older browsers
 * may not support the full range of events. Which events are supported is beyond the control of Ext JS.
 *
 * Usage:
 *
 *     // by id
 *     var el = Ext.get("my-div");
 *
 *     // by DOM element reference
 *     var el = Ext.get(myDivElement);
 *
 * # Animations
 *
 * When an element is manipulated, by default there is no animation.
 *
 *     var el = Ext.get("my-div");
 *
 *     // no animation
 *     el.setWidth(100);
 *
 * Many of the functions for manipulating an element have an optional "animate" parameter. This parameter can be
 * specified as boolean (true) for default animation effects.
 *
 *     // default animation
 *     el.setWidth(100, true);
 *
 * To configure the effects, an object literal with animation options to use as the Element animation configuration
 * object can also be specified. Note that the supported Element animation configuration options are a subset of the
 * {@link Ext.fx.Anim} animation options specific to Fx effects. The supported Element animation configuration options
 * are:
 *
 *     Option    Default   Description
 *     --------- --------  ---------------------------------------------
 *     {@link Ext.fx.Anim#duration duration}  350       The duration of the animation in milliseconds
 *     {@link Ext.fx.Anim#easing easing}    easeOut   The easing method
 *     {@link Ext.fx.Anim#callback callback}  none      A function to execute when the anim completes
 *     {@link Ext.fx.Anim#scope scope}     this      The scope (this) of the callback function
 *
 * Usage:
 *
 *     // Element animation options object
 *     var opt = {
 *         {@link Ext.fx.Anim#duration duration}: 1000,
 *         {@link Ext.fx.Anim#easing easing}: 'elasticIn',
 *         {@link Ext.fx.Anim#callback callback}: this.foo,
 *         {@link Ext.fx.Anim#scope scope}: this
 *     };
 *     // animation with some options set
 *     el.setWidth(100, opt);
 *
 * The Element animation object being used for the animation will be set on the options object as "anim", which allows
 * you to stop or manipulate the animation. Here is an example:
 *
 *     // using the "anim" property to get the Anim object
 *     if(opt.anim.isAnimated()){
 *         opt.anim.stop();
 *     }
 *
 * # Composite (Collections of) Elements
 *
 * For working with collections of Elements, see {@link Ext.CompositeElement}
 *
 * @constructor
 * Creates new Element directly.
 * @param {String/HTMLElement} element
 * @param {Boolean} [forceNew] By default the constructor checks to see if there is already an instance of this
 * element in the cache and if there is it returns the same instance. This will skip that check (useful for extending
 * this class).
 * @return {Object}
 */
Ext.define('Ext.dom.Element', function(Element) {
    var HIDDEN          = 'hidden',
        DOC             = document,
        VISIBILITY      = "visibility",
        DISPLAY         = "display",
        NONE            = "none",
        XMASKED         = Ext.baseCSSPrefix + "masked",
        XMASKEDRELATIVE = Ext.baseCSSPrefix + "masked-relative",
        EXTELMASKMSG    = Ext.baseCSSPrefix + "mask-msg",
        bodyRe          = /^body/i,
        visFly,

        // speedy lookup for elements never to box adjust
        noBoxAdjust = Ext.isStrict ? {
            select: 1
        }: {
            input: 1,
            select: 1,
            textarea: 1
        },

        // Pseudo for use by cacheScrollValues
        isScrolled = function(c) {
            var r = [], ri = -1,
                i, ci;
            for (i = 0; ci = c[i]; i++) {
                if (ci.scrollTop > 0 || ci.scrollLeft > 0) {
                    r[++ri] = ci;
                }
            }
            return r;
        };

    return {

        extend: 'Ext.dom.AbstractElement',

        alternateClassName: ['Ext.Element', 'Ext.core.Element'],

        requires: [
            'Ext.dom.Query',
            'Ext.dom.Element_anim',
            'Ext.dom.Element_dd',
            'Ext.dom.Element_fx',
            'Ext.dom.Element_position',
            'Ext.dom.Element_scroll',
            'Ext.dom.Element_style'
        ],
        
        tableTagRe: /^(?:tr|td|table|tbody)$/i,

        mixins: [
            'Ext.util.Positionable'
        ],

        addUnits: function() {
            return Element.addUnits.apply(Element, arguments);
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
                    dom.focus();
                }
            } catch(e) {
            }
            return me;
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
            if (dom !== document.body) {
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
        * Tests various css rules/browsers to determine if this element uses a border box
        * @return {Boolean}
        */
        isBorderBox: function() {
            var box = Ext.isBorderBox;
            
            // IE6/7 force input elements to content-box even if border-box is set explicitly
            if (box && Ext.isIE7m) {
                box = !((this.dom.tagName || "").toLowerCase() in noBoxAdjust);
            }
            return box;
        },

        /**
        * Sets up event handlers to call the passed functions when the mouse is moved into and out of the Element.
        * @param {Function} overFn The function to call when the mouse enters the Element.
        * @param {Function} outFn The function to call when the mouse leaves the Element.
        * @param {Object} [scope] The scope (`this` reference) in which the functions are executed. Defaults
        * to the Element's DOM element.
        * @param {Object} [options] Options for the listener. See {@link Ext.util.Observable#addListener the
        * options parameter}.
        * @return {Ext.dom.Element} this
        */
        hover: function(overFn, outFn, scope, options) {
            var me = this;
            me.on('mouseenter', overFn, scope || me.dom, options);
            me.on('mouseleave', outFn, scope || me.dom, options);
            return me;
        },

        /**
        * Returns the value of a namespaced attribute from the element's underlying DOM node.
        * @param {String} namespace The namespace in which to look for the attribute
        * @param {String} name The attribute name
        * @return {String} The attribute value
        */
        getAttributeNS: function(ns, name) {
            return this.getAttribute(name, ns);
        },

        getAttribute: (Ext.isIE && !(Ext.isIE9p && DOC.documentMode >= 9)) ?

            // Essentially all web browsers (Firefox, Internet Explorer, recent versions of Opera, Safari, Konqueror, and iCab,
            // as a non-exhaustive list) return null when the specified attribute does not exist on the specified element.
            // The DOM specification says that the correct return value in this case is actually the empty string, and some
            // DOM implementations implement this behavior. The implementation of getAttribute in XUL (Gecko) actually follows
            // the specification and returns an empty string. Consequently, you should use hasAttribute to check for an attribute's
            // existence prior to calling getAttribute() if it is possible that the requested attribute does not exist on the specified element.
            //
            // https://developer.mozilla.org/en-US/docs/DOM/element.getAttribute
            // http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-745549614

            function(name, ns) {
                var d = this.dom,
                        type;
                if (ns) {
                    type = typeof d[ns + ":" + name];
                    if (type != 'undefined' && type != 'unknown') {
                        return d[ns + ":" + name] || null;
                    }
                    return null;
                }
                if (name === "for") {
                    name = "htmlFor";
                }
                return d[name] || null;
            } : function(name, ns) {
                var d = this.dom;
                if (ns) {
                    return d.getAttributeNS(ns, name) || d.getAttribute(ns + ":" + name);
                }
                return  d.getAttribute(name) || d[name] || null;
            },

        /**
        * When an element is moved around in the DOM, or is hidden using `display:none`, it loses layout, and therefore
        * all scroll positions of all descendant elements are lost.
        * 
        * This function caches them, and returns a function, which when run will restore the cached positions.
        * In the following example, the Panel is moved from one Container to another which will cause it to lose all scroll positions:
        * 
        *     var restoreScroll = myPanel.el.cacheScrollValues();
        *     myOtherContainer.add(myPanel);
        *     restoreScroll();
        * 
        * @return {Function} A function which will restore all descentant elements of this Element to their scroll
        * positions recorded when this function was executed. Be aware that the returned function is a closure which has
        * captured the scope of `cacheScrollValues`, so take care to derefence it as soon as not needed - if is it is a `var`
        * it will drop out of scope, and the reference will be freed.
        */
        cacheScrollValues: function() {
            var me = this,
                scrolledDescendants,
                el, i,
                scrollValues = [],
                result = function() {
                    for (i = 0; i < scrolledDescendants.length; i++) {
                        el = scrolledDescendants[i];
                        el.scrollLeft = scrollValues[i][0];
                        el.scrollTop  = scrollValues[i][1];
                    }
                };

            if (!Ext.DomQuery.pseudos.isScrolled) {
                Ext.DomQuery.pseudos.isScrolled = isScrolled;
            }
            scrolledDescendants = me.query(':isScrolled');
            for (i = 0; i < scrolledDescendants.length; i++) {
                el = scrolledDescendants[i];
                scrollValues[i] = [el.scrollLeft, el.scrollTop];
            }
            return result;
        },

        /**
        * @property {Boolean} autoBoxAdjust
        * True to automatically adjust width and height settings for box-model issues.
        */
        autoBoxAdjust: true,

        /**
        * Checks whether the element is currently visible using both visibility and display properties.
        * @param {Boolean} [deep=false] True to walk the dom and see if parent elements are hidden.
        * If false, the function only checks the visibility of the element itself and it may return
        * `true` even though a parent is not visible.
        * @return {Boolean} `true` if the element is currently visible, else `false`
        */
        isVisible : function(deep) {
            var me = this,
                dom = me.dom,
                stopNode = dom.ownerDocument.documentElement;

            if (!visFly) {
                visFly = new Element.Fly();
            }

            while (dom !== stopNode) {
                // We're invisible if we hit a nonexistent parentNode or a document
                // fragment or computed style visibility:hidden or display:none
                if (!dom || dom.nodeType === 11 || (visFly.attach(dom)).isStyle(VISIBILITY, HIDDEN) || visFly.isStyle(DISPLAY, NONE)) {
                    return false;
                }
                // Quit now unless we are being asked to check parent nodes.
                if (!deep) {
                    break;
                }
                dom = dom.parentNode;
            }
            return true;
        },

        /**
        * Returns true if display is not "none"
        * @return {Boolean}
        */
        isDisplayed : function() {
            return !this.isStyle(DISPLAY, NONE);
        },

        /**
        * Convenience method for setVisibilityMode(Element.DISPLAY)
        * @param {String} [display] What to set display to when visible
        * @return {Ext.dom.Element} this
        */
        enableDisplayMode : function(display) {
            var me = this;

            me.setVisibilityMode(Element.DISPLAY);

            if (!Ext.isEmpty(display)) {
                (me.$cache || me.getCache()).data.originalDisplay = display;
            }

            return me;
        },

        /**
        * Puts a mask over this element to disable user interaction. Requires core.css.
        * This method can only be applied to elements which accept child nodes.
        * @param {String} [msg] A message to display in the mask
        * @param {String} [msgCls] A css class to apply to the msg element
        * @return {Ext.dom.Element} The mask element
        */
        mask : function(msg, msgCls /* private - passed by AbstractComponent.mask to avoid the need to interrogate the DOM to get the height*/, elHeight) {
            var me            = this,
                dom           = me.dom,
                // In some cases, setExpression will exist but not be of a function type,
                // so we check it explicitly here to stop IE throwing errors
                setExpression = dom.style.setExpression,
                data          = (me.$cache || me.getCache()).data,
                maskShimEl    = data.maskShimEl,
                maskEl        = data.maskEl,
                maskMsg       = data.maskMsg,
                widthExpression, heightExpression;

            if (!(bodyRe.test(dom.tagName) && me.getStyle('position') == 'static')) {
                me.addCls(XMASKEDRELATIVE);
            }

            // We always needs to recreate the mask since the DOM element may have been re-created
            if (maskEl) {
                maskEl.remove();
            }

            if (maskMsg) {
                maskMsg.remove();
            }

            if (maskShimEl) {
                maskShimEl.remove();
            }

            if (Ext.isIE6) {
                maskShimEl = Ext.DomHelper.append(dom, {
                    tag: 'iframe',
                    cls : Ext.baseCSSPrefix + 'shim ' + Ext.baseCSSPrefix + 'mask-shim'
                }, true);
                data.maskShimEl = maskShimEl;
                maskShimEl.setDisplayed(true);
            }

            Ext.DomHelper.append(dom, [{
                cls : Ext.baseCSSPrefix + "mask",
                style: 'top:0;left:0;'
            }, {
                cls : msgCls ? EXTELMASKMSG + " " + msgCls : EXTELMASKMSG,
                cn  : {
                    tag: 'div',
                    cls: Ext.baseCSSPrefix + 'mask-msg-inner',
                    cn: {
                        tag: 'div',
                        cls: Ext.baseCSSPrefix + 'mask-msg-text',
                        html: msg || ''
                    }
                }
            }]);

            maskMsg = Ext.get(dom.lastChild);
            maskEl = Ext.get(maskMsg.dom.previousSibling);
            data.maskMsg = maskMsg;
            data.maskEl = maskEl;

            me.addCls(XMASKED);
            maskEl.setDisplayed(true);

            if (typeof msg == 'string') {
                maskMsg.setDisplayed(true);
                maskMsg.center(me);
            } else {
                maskMsg.setDisplayed(false);
            }
            // NOTE: CSS expressions are resource intensive and to be used only as a last resort
            // These expressions are removed as soon as they are no longer necessary - in the unmask method.
            // In normal use cases an element will be masked for a limited period of time.
            // Fix for https://sencha.jira.com/browse/EXTJSIV-19.
            // IE6 strict mode and IE6-9 quirks mode takes off left+right padding when calculating width!
            if (!Ext.supports.IncludePaddingInWidthCalculation && setExpression) {
                // In an occasional case setExpression will throw an exception
                try {
                    maskEl.dom.style.setExpression('width', 'this.parentNode.clientWidth + "px"');
                    widthExpression = 'this.parentNode.clientWidth + "px"';
                    if (maskShimEl) {
                        maskShimEl.dom.style.setExpression('width', widthExpression);
                    }
                    maskEl.dom.style.setExpression('width', widthExpression);
                } catch (e) {}
            }

            // Some versions and modes of IE subtract top+bottom padding when calculating height.
            // Different versions from those which make the same error for width!
            if (!Ext.supports.IncludePaddingInHeightCalculation && setExpression) {
                // In an occasional case setExpression will throw an exception
                try {
                    heightExpression = 'this.parentNode.' + (dom == DOC.body ? 'scrollHeight' : 'offsetHeight') + ' + "px"';
                    if (maskShimEl) {
                        maskShimEl.dom.style.setExpression('height', heightExpression);
                    }
                    maskEl.dom.style.setExpression('height', heightExpression);
                } catch (e) {}
            }
            // ie will not expand full height automatically
            else if (Ext.isIE9m && !(Ext.isIE7 && Ext.isStrict) && me.getStyle('height') == 'auto') {
                if (maskShimEl) {
                    maskShimEl.setSize(undefined, elHeight || me.getHeight());
                }
                maskEl.setSize(undefined, elHeight || me.getHeight());
            }
            return maskEl;
        },

        /**
        * Hides a previously applied mask.
        */
        unmask : function() {
            var me      = this,
                data    = (me.$cache || me.getCache()).data,
                maskEl  = data.maskEl,
                maskShimEl = data.maskShimEl,
                maskMsg = data.maskMsg,
                style;

            if (maskEl) {
                style = maskEl.dom.style;
                // Remove resource-intensive CSS expressions as soon as they are not required.
                if (style.clearExpression) {
                    style.clearExpression('width');
                    style.clearExpression('height');
                }

                if (maskEl) {
                    maskEl.remove();
                    delete data.maskEl;
                }

                if (maskMsg) {
                    maskMsg.remove();
                    delete data.maskMsg;
                }

                me.removeCls([XMASKED, XMASKEDRELATIVE]);

                if (maskShimEl) {
                    style = maskShimEl.dom.style;
                    // Remove resource-intensive CSS expressions as soon as they are not required.
                    if (style.clearExpression) {
                        style.clearExpression('width');
                        style.clearExpression('height');
                    }

                    maskShimEl.remove();
                    delete data.maskShimEl;
                }
            }
        },

        /**
        * Returns true if this element is masked. Also re-centers any displayed message within the mask.
        * @return {Boolean}
        */
        isMasked : function() {
            var me      = this,
                data    = (me.$cache || me.getCache()).data,
                maskEl  = data.maskEl,
                maskMsg = data.maskMsg,
                hasMask = false; 

            if (maskEl && maskEl.isVisible()) {
                if (maskMsg) {
                    maskMsg.center(me);
                }
                hasMask = true;
            }
            return hasMask;
        },

        /**
        * Creates an iframe shim for this element to keep selects and other windowed objects from
        * showing through.
        * @return {Ext.dom.Element} The new shim element
        */
        createShim : function() {
            var el = DOC.createElement('iframe'),
                shim;

            el.frameBorder = '0';
            el.className = Ext.baseCSSPrefix + 'shim';
            el.src = Ext.SSL_SECURE_URL;
            shim = Ext.get(this.dom.parentNode.insertBefore(el, this.dom));
            shim.autoBoxAdjust = false;
            return shim;
        },

        /**
        * Convenience method for constructing a KeyMap
        * @param {String/Number/Number[]/Object} key Either a string with the keys to listen for, the numeric key code,
        * array of key codes or an object with the following options:
        * @param {Number/Array} key.key
        * @param {Boolean} key.shift
        * @param {Boolean} key.ctrl
        * @param {Boolean} key.alt
        * @param {Function} fn The function to call
        * @param {Object} [scope] The scope (`this` reference) in which the specified function is executed. Defaults to this Element.
        * @return {Ext.util.KeyMap} The KeyMap created
        */
        addKeyListener : function(key, fn, scope){
            var config;
            if(typeof key != 'object' || Ext.isArray(key)){
                config = {
                    target: this,
                    key: key,
                    fn: fn,
                    scope: scope
                };
            }else{
                config = {
                    target: this,
                    key : key.key,
                    shift : key.shift,
                    ctrl : key.ctrl,
                    alt : key.alt,
                    fn: fn,
                    scope: scope
                };
            }
            return new Ext.util.KeyMap(config);
        },

        /**
        * Creates a KeyMap for this element
        * @param {Object} config The KeyMap config. See {@link Ext.util.KeyMap} for more details
        * @return {Ext.util.KeyMap} The KeyMap created
        */
        addKeyMap : function(config) {
            return new Ext.util.KeyMap(Ext.apply({
                target: this
            }, config));
        },

        //  Mouse events
        /**
        * @event click
        * Fires when a mouse click is detected within the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event contextmenu
        * Fires when a right click is detected within the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event dblclick
        * Fires when a mouse double click is detected within the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event mousedown
        * Fires when a mousedown is detected within the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event mouseup
        * Fires when a mouseup is detected within the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event mouseover
        * Fires when a mouseover is detected within the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event mousemove
        * Fires when a mousemove is detected with the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event mouseout
        * Fires when a mouseout is detected with the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event mouseenter
        * Fires when the mouse enters the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event mouseleave
        * Fires when the mouse leaves the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */

        //  Keyboard events
        /**
        * @event keypress
        * Fires when a keypress is detected within the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event keydown
        * Fires when a keydown is detected within the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event keyup
        * Fires when a keyup is detected within the element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */

        //  HTML frame/object events
        /**
        * @event load
        * Fires when the user agent finishes loading all content within the element. Only supported by window, frames,
        * objects and images.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event unload
        * Fires when the user agent removes all content from a window or frame. For elements, it fires when the target
        * element or any of its content has been removed.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event abort
        * Fires when an object/image is stopped from loading before completely loaded.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event error
        * Fires when an object/image/frame cannot be loaded properly.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event resize
        * Fires when a document view is resized.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event scroll
        * Fires when a document view is scrolled.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */

        //  Form events
        /**
        * @event select
        * Fires when a user selects some text in a text field, including input and textarea.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event change
        * Fires when a control loses the input focus and its value has been modified since gaining focus.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event submit
        * Fires when a form is submitted.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event reset
        * Fires when a form is reset.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event focus
        * Fires when an element receives focus either via the pointing device or by tab navigation.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event blur
        * Fires when an element loses focus either via the pointing device or by tabbing navigation.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */

        //  User Interface events
        /**
        * @event DOMFocusIn
        * Where supported. Similar to HTML focus event, but can be applied to any focusable element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event DOMFocusOut
        * Where supported. Similar to HTML blur event, but can be applied to any focusable element.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event DOMActivate
        * Where supported. Fires when an element is activated, for instance, through a mouse click or a keypress.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */

        //  DOM Mutation events
        /**
        * @event DOMSubtreeModified
        * Where supported. Fires when the subtree is modified.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event DOMNodeInserted
        * Where supported. Fires when a node has been added as a child of another node.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event DOMNodeRemoved
        * Where supported. Fires when a descendant node of the element is removed.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event DOMNodeRemovedFromDocument
        * Where supported. Fires when a node is being removed from a document.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event DOMNodeInsertedIntoDocument
        * Where supported. Fires when a node is being inserted into a document.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event DOMAttrModified
        * Where supported. Fires when an attribute has been modified.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */
        /**
        * @event DOMCharacterDataModified
        * Where supported. Fires when the character data has been modified.
        * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
        * @param {HTMLElement} t The target of the event.
        */

        /**
        * Appends an event handler to this element.
        *
        * @param {String} eventName The name of event to handle.
        *
        * @param {Function} fn The handler function the event invokes. This function is passed the following parameters:
        *
        * - **evt** : EventObject
        *
        *   The {@link Ext.EventObject EventObject} describing the event.
        *
        * - **el** : HtmlElement
        *
        *   The DOM element which was the target of the event. Note that this may be filtered by using the delegate option.
        *
        * - **o** : Object
        *
        *   The options object from the call that setup the listener.
        *
        * @param {Object} scope (optional) The scope (**this** reference) in which the handler function is executed. **If
        * omitted, defaults to this Element.**
        *
        * @param {Object} options (optional) An object containing handler configuration properties. This may contain any of
        * the following properties:
        *
        * - **scope** Object :
        *
        *   The scope (**this** reference) in which the handler function is executed. **If omitted, defaults to this
        *   Element.**
        *
        * - **delegate** String:
        *
        *   A simple selector to filter the target or look for a descendant of the target. See below for additional details.
        *
        * - **stopEvent** Boolean:
        *
        *   True to stop the event. That is stop propagation, and prevent the default action.
        *
        * - **preventDefault** Boolean:
        *
        *   True to prevent the default action
        *
        * - **stopPropagation** Boolean:
        *
        *   True to prevent event propagation
        *
        * - **normalized** Boolean:
        *
        *   False to pass a browser event to the handler function instead of an Ext.EventObject
        *
        * - **target** Ext.dom.Element:
        *
        *   Only call the handler if the event was fired on the target Element, _not_ if the event was bubbled up from a
        *   child node.
        *
        * - **delay** Number:
        *
        *   The number of milliseconds to delay the invocation of the handler after the event fires.
        *
        * - **single** Boolean:
        *
        *   True to add a handler to handle just the next firing of the event, and then remove itself.
        *
        * - **buffer** Number:
        *
        *   Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed by the specified number of
        *   milliseconds. If the event fires again within that time, the original handler is _not_ invoked, but the new
        *   handler is scheduled in its place.
        *
        * **Combining Options**
        *
        * Using the options argument, it is possible to combine different types of listeners:
        *
        * A delayed, one-time listener that auto stops the event and adds a custom argument (forumId) to the options
        * object. The options object is available as the third parameter in the handler function.
        *
        * Code:
        *
        *     el.on('click', this.onClick, this, {
        *         single: true,
        *         delay: 100,
        *         stopEvent : true,
        *         forumId: 4
        *     });
        *
        * **Attaching multiple handlers in 1 call**
        *
        * The method also allows for a single argument to be passed which is a config object containing properties which
        * specify multiple handlers.
        *
        * Code:
        *
        *     el.on({
        *         'click' : {
        *             fn: this.onClick,
        *             scope: this,
        *             delay: 100
        *         },
        *         'mouseover' : {
        *             fn: this.onMouseOver,
        *             scope: this
        *         },
        *         'mouseout' : {
        *             fn: this.onMouseOut,
        *             scope: this
        *         }
        *     });
        *
        * Or a shorthand syntax:
        *
        * Code:
        *
        *     el.on({
        *         'click' : this.onClick,
        *         'mouseover' : this.onMouseOver,
        *         'mouseout' : this.onMouseOut,
        *         scope: this
        *     });
        *
        * **delegate**
        *
        * This is a configuration option that you can pass along when registering a handler for an event to assist with
        * event delegation. Event delegation is a technique that is used to reduce memory consumption and prevent exposure
        * to memory-leaks. By registering an event for a container element as opposed to each element within a container.
        * By setting this configuration option to a simple selector, the target element will be filtered to look for a
        * descendant of the target. For example:
        *
        *     // using this markup:
        *     <div id='elId'>
        *         <p id='p1'>paragraph one</p>
        *         <p id='p2' class='clickable'>paragraph two</p>
        *         <p id='p3'>paragraph three</p>
        *     </div>
        *
        *     // utilize event delegation to registering just one handler on the container element:
        *     el = Ext.get('elId');
        *     el.on(
        *         'click',
        *         function(e,t) {
        *             // handle click
        *             console.info(t.id); // 'p2'
        *         },
        *         this,
        *         {
        *             // filter the target element to be a descendant with the class 'clickable'
        *             delegate: '.clickable'
        *         }
        *     );
        *
        * @return {Ext.dom.Element} this
        */
        on: function(eventName, fn, scope, options) {
            Ext.EventManager.on(this, eventName, fn, scope || this, options);
            return this;
        },

        /**
        * Removes an event handler from this element.
        *
        * **Note**: if a *scope* was explicitly specified when {@link #on adding} the listener,
        * the same scope must be specified here.
        *
        * Example:
        *
        *     el.un('click', this.handlerFn);
        *     // or
        *     el.removeListener('click', this.handlerFn);
        *
        * @param {String} eventName The name of the event from which to remove the handler.
        * @param {Function} fn The handler function to remove. **This must be a reference to the function passed into the
        * {@link #on} call.**
        * @param {Object} scope If a scope (**this** reference) was specified when the listener was added, then this must
        * refer to the same object.
        * @return {Ext.dom.Element} this
        */
        un: function(eventName, fn, scope) {
            Ext.EventManager.un(this, eventName, fn, scope || this);
            return this;
        },

        /**
        * Removes all previous added listeners from this element
        * @return {Ext.dom.Element} this
        */
        removeAllListeners: function() {
            Ext.EventManager.removeAll(this);
            return this;
        },

        /**
        * Recursively removes all previous added listeners from this element and its children
        * @return {Ext.dom.Element} this
        */
        purgeAllListeners: function() {
            Ext.EventManager.purgeElement(this);
            return this;
        },

        select: function(selector) {
            return Element.select(selector, false,  this.dom);
        }
    };
}, function() {

    var DOC             = document,
        EC              = Ext.cache,
        Element         = this,
        AbstractElement = Ext.dom.AbstractElement,
        focusRe         = /^a|button|embed|iframe|input|object|select|textarea$/i,
        nonSpaceRe      = /\S/,
        scriptTagRe     = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        replaceScriptTagRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        srcRe           = /\ssrc=([\'\"])(.*?)\1/i,
        typeRe          = /\stype=([\'\"])(.*?)\1/i,
        useDocForId     = !Ext.isIE8m,
        internalFly;

    Element.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
    //</!if>

    // private
    // Garbage collection - uncache elements/purge listeners on orphaned elements
    // so we don't hold a reference and cause the browser to retain them
    function garbageCollect() {
        if (!Ext.enableGarbageCollector) {
            clearInterval(Element.collectorThreadId);
        } else {
            var eid,
                d,
                o,
                t;

            for (eid in EC) {
                if (!EC.hasOwnProperty(eid)) {
                    continue;
                }

                o = EC[eid];

                // Skip document and window elements
                if (o.skipGarbageCollection) {
                    continue;
                }

                d = o.dom;

                //<debug>
                // Should always have a DOM node
                if (!d) {
                    Ext.Error.raise('Missing DOM node in element garbage collection: ' + eid);
                }

                // Check that document and window elements haven't got through
                if (d && (d.getElementById || d.navigator)) {
                    Ext.Error.raise('Unexpected document or window element in element garbage collection');
                }
                //</debug>

                // -------------------------------------------------------
                // Determining what is garbage:
                // -------------------------------------------------------
                // !d.parentNode
                // no parentNode == direct orphan, definitely garbage
                // -------------------------------------------------------
                // !d.offsetParent && !document.getElementById(eid)
                // display none elements have no offsetParent so we will
                // also try to look it up by it's id. However, check
                // offsetParent first so we don't do unneeded lookups.
                // This enables collection of elements that are not orphans
                // directly, but somewhere up the line they have an orphan
                // parent.
                // -------------------------------------------------------
                if (d && (!d.parentNode || (!d.offsetParent && !Ext.getElementById(eid)))) {
                    if (Ext.enableListenerCollection) {
                        Ext.EventManager.removeAll(d);
                    }
                    delete EC[eid];
                }
            }
            // Cleanup IE Object leaks
            if (Ext.isIE) {
                t = {};
                for (eid in EC) {
                    if (!EC.hasOwnProperty(eid)) {
                        continue;
                    }
                    t[eid] = EC[eid];
                }
                EC = Ext.cache = t;
            }
        }
    }

    Element.collectorThreadId = setInterval(garbageCollect, 30000);

    //Stuff from Element-more.js
    Element.addMethods({

        /**
         * Monitors this Element for the mouse leaving. Calls the function after the specified delay only if
         * the mouse was not moved back into the Element within the delay. If the mouse *was* moved
         * back in, the function is not called.
         * @param {Number} delay The delay **in milliseconds** to wait for possible mouse re-entry before calling the handler function.
         * @param {Function} handler The function to call if the mouse remains outside of this Element for the specified time.
         * @param {Object} [scope] The scope (`this` reference) in which the handler function executes. Defaults to this Element.
         * @return {Object} The listeners object which was added to this element so that monitoring can be stopped. Example usage:
         *
         *     // Hide the menu if the mouse moves out for 250ms or more
         *     this.mouseLeaveMonitor = this.menuEl.monitorMouseLeave(250, this.hideMenu, this);
         *
         *     ...
         *     // Remove mouseleave monitor on menu destroy
         *     this.menuEl.un(this.mouseLeaveMonitor);
         *
         */
        monitorMouseLeave: function(delay, handler, scope) {
            var me = this,
                timer,
                listeners = {
                    mouseleave: function(e) {
                        timer = setTimeout(Ext.Function.bind(handler, scope||me, [e]), delay);
                    },
                    mouseenter: function() {
                        clearTimeout(timer);
                    },
                    freezeEvent: true
                };

            me.on(listeners);
            return listeners;
        },

        /**
         * Stops the specified event(s) from bubbling and optionally prevents the default action
         * @param {String/String[]} eventName an event / array of events to stop from bubbling
         * @param {Boolean} [preventDefault] true to prevent the default action too
         * @return {Ext.dom.Element} this
         */
        swallowEvent : function(eventName, preventDefault) {
            var me = this,
                e, eLen,
                fn = function(e) {
                    e.stopPropagation();
                    if (preventDefault) {
                        e.preventDefault();
                    }
                };

            if (Ext.isArray(eventName)) {
                eLen = eventName.length;

                for (e = 0; e < eLen; e++) {
                    me.on(eventName[e], fn);
                }

                return me;
            }
            me.on(eventName, fn);
            return me;
        },

        /**
         * Create an event handler on this element such that when the event fires and is handled by this element,
         * it will be relayed to another object (i.e., fired again as if it originated from that object instead).
         * @param {String} eventName The type of event to relay
         * @param {Object} observable Any object that extends {@link Ext.util.Observable} that will provide the context
         * for firing the relayed event
         */
        relayEvent : function(eventName, observable) {
            this.on(eventName, function(e) {
                observable.fireEvent(eventName, e);
            });
        },

        /**
         * Removes Empty, or whitespace filled text nodes. Combines adjacent text nodes.
         * @param {Boolean} [forceReclean=false] By default the element keeps track if it has been cleaned already
         * so you can call this over and over. However, if you update the element and need to force a reclean, you
         * can pass true.
         */
        clean : function(forceReclean) {
            var me   = this,
                dom  = me.dom,
                data = (me.$cache || me.getCache()).data,
                n    = dom.firstChild,
                ni   = -1,
                nx;

            if (data.isCleaned && forceReclean !== true) {
                return me;
            }

            while (n) {
                nx = n.nextSibling;
                if (n.nodeType == 3) {
                    // Remove empty/whitespace text nodes
                    if (!(nonSpaceRe.test(n.nodeValue))) {
                        dom.removeChild(n);
                    // Combine adjacent text nodes
                    } else if (nx && nx.nodeType == 3) {
                        n.appendData(Ext.String.trim(nx.data));
                        dom.removeChild(nx);
                        nx = n.nextSibling;
                        n.nodeIndex = ++ni;
                    }
                } else {
                    // Recursively clean
                    internalFly.attach(n).clean();
                    n.nodeIndex = ++ni;
                }
                n = nx;
            }

            data.isCleaned = true;
            return me;
        },

        /**
         * Direct access to the Ext.ElementLoader {@link Ext.ElementLoader#method-load} method. The method takes the same object
         * parameter as {@link Ext.ElementLoader#method-load}
         * @return {Ext.dom.Element} this
         */
        load : function(options) {
            this.getLoader().load(options);
            return this;
        },

        /**
         * Gets this element's {@link Ext.ElementLoader ElementLoader}
         * @return {Ext.ElementLoader} The loader
         */
        getLoader : function() {
            var me = this,
                data = (me.$cache || me.getCache()).data,
                loader = data.loader;

            if (!loader) {
                data.loader = loader = new Ext.ElementLoader({
                    target: me
                });
            }
            return loader;
        },

        /**
         * @private.
         * Currently used for updating grid cells without modifying DOM structure
         *
         * Synchronizes content of this Element with the content of the passed element.
         * 
         * Style and CSS class are copied from source into this Element, and contents are synched
         * recursively. If a child node is a text node, the textual data is copied.
         */
        syncContent: function(source) {
            source = Ext.getDom(source);
            var sourceNodes = source.childNodes,
                sourceLen = sourceNodes.length,
                dest = this.dom,
                destNodes = dest.childNodes,
                destLen = destNodes.length,
                i,  destNode, sourceNode,
                nodeType, newAttrs, attLen, attName;

            // Copy top node's attributes across. Use IE-specific method if possible.
            // In IE10, there is a problem where the className will not get updated
            // in the view, even though the className on the dom element is correct.
            // See EXTJSIV-9462
            if (Ext.isIE9m && dest.mergeAttributes) {
                dest.mergeAttributes(source, true);

                // EXTJSIV-6803. IE's mergeAttributes appears not to make the source's "src" value available until after the image is ready.
                // So programatically copy any src attribute.
                dest.src = source.src;
            } else {
                newAttrs = source.attributes;
                attLen = newAttrs.length;
                for (i = 0; i < attLen; i++) {
                    attName = newAttrs[i].name;
                    if (attName !== 'id') {
                        dest.setAttribute(attName, newAttrs[i].value);
                    }
                }
            }

            // If the number of child nodes does not match, fall back to replacing innerHTML
            if (sourceLen !== destLen) {
                dest.innerHTML = source.innerHTML;
                return;
            }

            // Loop through source nodes.
            // If there are fewer, we must remove excess
            for (i = 0; i < sourceLen; i++) {
                sourceNode = sourceNodes[i];
                destNode = destNodes[i];
                nodeType = sourceNode.nodeType;

                // If node structure is out of sync, just drop innerHTML in and return
                if (nodeType !== destNode.nodeType || (nodeType === 1 && sourceNode.tagName !== destNode.tagName)) {
                    dest.innerHTML = source.innerHTML;
                    return;
                }

                // Update text node
                if (nodeType === 3) {
                    destNode.data = sourceNode.data;
                }
                // Sync element content
                else {
                    if (sourceNode.id && destNode.id !== sourceNode.id) {
                        destNode.id = sourceNode.id;
                    }
                    destNode.style.cssText = sourceNode.style.cssText;
                    destNode.className = sourceNode.className;
                    internalFly.attach(destNode).syncContent(sourceNode);
                }
            }
        },

        /**
         * Updates the innerHTML of this element, optionally searching for and processing scripts.
         * @param {String} html The new HTML
         * @param {Boolean} [loadScripts] True to look for and process scripts (defaults to false)
         * @param {Function} [callback] For async script loading you can be notified when the update completes
         * @return {Ext.dom.Element} this
         */
        update : function(html, loadScripts, callback) {
            var me = this,
                id,
                dom,
                interval;

            if (!me.dom) {
                return me;
            }
            html = html || '';
            dom = me.dom;

            if (loadScripts !== true) {
                dom.innerHTML = html;
                Ext.callback(callback, me);
                return me;
            }

            id  = Ext.id();
            html += '<span id="' + id + '"></span>';

            interval = setInterval(function() {
                var hd,
                    match,
                    attrs,
                    srcMatch,
                    typeMatch,
                    el,
                    s;
                if (!(el = DOC.getElementById(id))) {
                    return false;
                }
                clearInterval(interval);
                Ext.removeNode(el);
                hd = Ext.getHead().dom;

                while ((match = scriptTagRe.exec(html))) {
                    attrs = match[1];
                    srcMatch = attrs ? attrs.match(srcRe) : false;
                    if (srcMatch && srcMatch[2]) {
                       s = DOC.createElement("script");
                       s.src = srcMatch[2];
                       typeMatch = attrs.match(typeRe);
                       if (typeMatch && typeMatch[2]) {
                           s.type = typeMatch[2];
                       }
                       hd.appendChild(s);
                    } else if (match[2] && match[2].length > 0) {
                        if (window.execScript) {
                           window.execScript(match[2]);
                        } else {
                           window.eval(match[2]);
                        }
                    }
                }
                Ext.callback(callback, me);
            }, 20);
            dom.innerHTML = html.replace(replaceScriptTagRe, '');
            return me;
        },

        // inherit docs, overridden so we can add removeAnchor
        removeAllListeners : function() {
            this.removeAnchor();
            Ext.EventManager.removeAll(this.dom);
            return this;
        },

        /**
         * Creates a proxy element of this element
         * @param {String/Object} config The class name of the proxy element or a DomHelper config object
         * @param {String/HTMLElement} [renderTo] The element or element id to render the proxy to. Defaults to: document.body.
         * @param {Boolean} [matchBox=false] True to align and size the proxy to this element now.
         * @return {Ext.dom.Element} The new proxy element
         */
        createProxy : function(config, renderTo, matchBox) {
            config = (typeof config == 'object') ? config : {tag : "div", cls: config};

            var me = this,
                proxy = renderTo ? Ext.DomHelper.append(renderTo, config, true) :
                                   Ext.DomHelper.insertBefore(me.dom, config, true);

            proxy.setVisibilityMode(Element.DISPLAY);
            proxy.hide();
            if (matchBox && me.setBox && me.getBox) { // check to make sure Element.position.js is loaded
               proxy.setBox(me.getBox());
            }
            return proxy;
        },
        
        /**
         * Returns true if this element needs an explicit tabIndex to make it focusable. Input fields, text areas, buttons
         * anchors elements **with an href** etc do not need a tabIndex, but structural elements do.
         */
        needsTabIndex: function() {
            if (this.dom) {
                if ((this.dom.nodeName === 'a') && (!this.dom.href)) {
                    return true;
                }
                return !focusRe.test(this.dom.nodeName);
            }
        },

        /**
         * Checks whether this element can be focused.
         * @return {Boolean} True if the element is focusable
         */
        isFocusable: function (/* private - assume it's the focusEl of a Component */ asFocusEl) {
            var dom = this.dom,
                tabIndexAttr = dom.getAttributeNode('tabIndex'),
                tabIndex,
                nodeName = dom.nodeName,
                canFocus = false;

            // Certain browsers always report zero in the absence of the tabIndex attribute.
            // Testing the specified property (Standards: http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-862529273)
            // Should filter out these cases.
            // The exceptions are IE6 to IE8. In these browsers all elements will yield a tabIndex
            // and therefore all elements will appear to be focusable.
            // This adversely affects modal Floating components.
            // These listen for the TAB key, and then test whether the event target === last focusable
            // or first focusable element, and forcibly to a circular navigation.
            // We cannot know the true first or last focusable element, so this problem still exists for IE6,7,8
            // See Ext.util.Floating
            if (tabIndexAttr && tabIndexAttr.specified) {
                tabIndex = tabIndexAttr.value;
            }
            if (dom && !dom.disabled) {
                // A tabIndex of -1 means it has to be programatically focused, so that needs FocusManager,
                // and it has to be the focus holding el of a Component within the Component tree.
                if (tabIndex == -1) { // note that the value is a string
                    canFocus = Ext.FocusManager && Ext.FocusManager.enabled && asFocusEl;
                }
                else {
                    // See if it's a naturally focusable element
                    if (focusRe.test(nodeName)) {
                        if ((nodeName !== 'a') || dom.href) {
                            canFocus = true;
                        }
                    }
                    // A non naturally focusable element is in the navigation flow if it has a positive numeric tab index.
                    else {
                        canFocus = tabIndex != null && tabIndex >= 0;
                    }
                }
                canFocus = canFocus && this.isVisible(true);
            }
            return canFocus;
        }
    });

    if (Ext.isIE) {
        Element.prototype.getById = function (id, asDom) {
            var dom = this.dom,
                cacheItem, el, ret;

            if (dom) {
                // for normal elements getElementById is the best solution, but if the el is
                // not part of the document.body, we need to use all[]
                el = (useDocForId && DOC.getElementById(id)) || dom.all[id];
                if (el) {
                    if (asDom) {
                        ret = el;
                    } else {
                        // calling Element.get here is a real hit (2x slower) because it has to
                        // redetermine that we are giving it a dom el.
                        cacheItem = EC[id];
                        if (cacheItem && cacheItem.el) {
                            ret = Ext.updateCacheEntry(cacheItem, el).el;
                        } else {
                            ret = new Element(el);
                        }
                    }
                    return ret;
                }
            }

            return asDom ? Ext.getDom(id) : Element.get(id);
        };
    }

    Element.createAlias({
        /**
         * @method
         * @inheritdoc Ext.dom.Element#on
         * Shorthand for {@link #on}.
         */
        addListener: 'on',
        /**
         * @method
         * @inheritdoc Ext.dom.Element#un
         * Shorthand for {@link #un}.
         */
        removeListener: 'un',
        /**
         * @method
         * @inheritdoc Ext.dom.Element#removeAllListeners
         * Alias for {@link #removeAllListeners}.
         */
        clearListeners: 'removeAllListeners',
        /**
         * @method
         * @inheritdoc Ext.dom.Element#isFocusable
         * Alias for {@link #isFocusable}.
         */
        focusable: 'isFocusable'
    });

    Element.Fly = AbstractElement.Fly = new Ext.Class({
        extend: Element,

        isFly: true,

        constructor: function(dom) {
            this.dom = dom;
            // set an "el" property that references "this".  This allows
            // Ext.util.Positionable methods to operate on this.el.dom since it
            // gets mixed into both Element and Component
            this.el = this;
        },
        
        attach: AbstractElement.Fly.prototype.attach
    });
    
    internalFly = new Element.Fly();

    if (Ext.isIE) {
        Ext.getElementById = function (id) {
            var el = DOC.getElementById(id),
                detachedBodyEl;

            if (!el && (detachedBodyEl = AbstractElement.detachedBodyEl)) {
                el = detachedBodyEl.dom.all[id];
            }

            return el;
        };
    } else if (!DOC.querySelector) {
        Ext.getDetachedBody = Ext.getBody;

        Ext.getElementById = function (id) {
            return DOC.getElementById(id);
        };
    }
});
