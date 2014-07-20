/**
 * @class Ext.dom.Element
 * # Animations
 *
 * When an element is manipulated, by default there is no animation.
 *
 *     var el = Ext.get("my-div");
 *
 *     // no animation
 *     el.setWidth(100);
 *
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
 */
Ext.define('Ext.overrides.dom.Element', (function() {
    var Element, // we cannot do this yet "= Ext.dom.Element"
        WIN = window,
        DOC = document,
        HIDDEN = 'hidden',
        ISCLIPPED = 'isClipped',
        OVERFLOW = 'overflow',
        OVERFLOWX = 'overflow-x',
        OVERFLOWY = 'overflow-y',
        ORIGINALCLIP = 'originalClip',
        HEIGHT = 'height',
        WIDTH = 'width',
        VISIBILITY = 'visibility',
        DISPLAY = 'display',
        NONE = 'none',
        HIDDEN = 'hidden',
        OFFSETS = 'offsets',
        ORIGINALDISPLAY = 'originalDisplay',
        VISMODE = 'visibilityMode',
        ISVISIBLE = 'isVisible',
        OFFSETCLASS = Ext.baseCSSPrefix + 'hidden-offsets',
        boxMarkup = [
            '<div class="{0}-tl" role="presentation">',
                '<div class="{0}-tr" role="presentation">',
                    '<div class="{0}-tc" role="presentation"></div>',
                '</div>',
            '</div>',
            '<div class="{0}-ml" role="presentation">',
                '<div class="{0}-mr" role="presentation">',
                    '<div class="{0}-mc" role="presentation"></div>',
                '</div>',
            '</div>',
            '<div class="{0}-bl" role="presentation">',
                '<div class="{0}-br" role="presentation">',
                    '<div class="{0}-bc" role="presentation"></div>',
                '</div>',
            '</div>'
        ].join(''),
        scriptTagRe = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        replaceScriptTagRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        srcRe = /\ssrc=([\'\"])(.*?)\1/i,
        focusRe = /^a|button|embed|iframe|input|object|select|textarea$/i,
        nonSpaceRe = /\S/,
        typeRe = /\stype=([\'\"])(.*?)\1/i,
        msRe = /^-ms-/,
        camelRe = /(-[a-z])/gi,
        camelReplaceFn = function(m, a) {
            return a.charAt(1).toUpperCase();
        },
        XMASKED = Ext.baseCSSPrefix + "masked",
        XMASKEDRELATIVE = Ext.baseCSSPrefix + "masked-relative",
        EXTELMASKMSG = Ext.baseCSSPrefix + "mask-msg",
        mouseEnterLeaveRe = /^(?:mouseenter|mouseleave)$/,
        bodyRe = /^body/i,
        scrollFly,
        propertyCache = {},
        getDisplay = function(el) {
            var data = el.getData(),
                display = data[ORIGINALDISPLAY];
                
            if (display === undefined) {
                data[ORIGINALDISPLAY] = display = '';
            }
            return display;
        },
        getVisMode = function(el){
            var data = el.getData(),
                visMode = data[VISMODE];
                
            if (visMode === undefined) {
                data[VISMODE] = visMode = Element.VISIBILITY;
            }
            return visMode;
        },
        garbageBin,
        emptyRange      = DOC.createRange ? DOC.createRange() : null;

    return {
        override: 'Ext.dom.Element',

        mixins: [
            'Ext.util.Animate'
        ],

        requires: [
            'Ext.dom.GarbageCollector',
            'Ext.dom.Fly'
        ],

        uses: [
            'Ext.fx.Manager', 
            'Ext.fx.Anim'
        ],

        skipGarbageCollection: false,

        _init: function (E) {
            Element = E; // now we can poke this into closure scope
        },

        statics: {
            selectableCls: Ext.baseCSSPrefix + 'selectable',
            unselectableCls: Ext.baseCSSPrefix + 'unselectable',

            normalize: function(prop) {
                if (prop === 'float') {
                    prop = Ext.supports.Float ? 'cssFloat' : 'styleFloat';
                }
                // For '-ms-foo' we need msFoo
                return propertyCache[prop] || (propertyCache[prop] = prop.replace(msRe, 'ms-').replace(camelRe, camelReplaceFn));
            },

            getViewportHeight: function(){
                return Ext.isIE9m ? DOC.documentElement.clientHeight : WIN.innerHeight;
            },

            getViewportWidth: function() {
                return (!Ext.isStrict && !Ext.isOpera) ? document.body.clientWidth :
                       Ext.isIE9m ? DOC.documentElement.clientWidth : WIN.innerWidth;
            },

            addListener: function(element, eventName, handler) {
                element = Ext.getDom(element);
                if (element.addEventListener) {
                    element.addEventListener(eventName, handler, false);
                } else {
                    element.attachEvent('on' + eventName, handler);
                }
            }
        },

        /**
         * Sets up event handlers to add and remove a css class when the mouse is down and then up on this element (a click effect)
         * @param {String} className The class to add
         * @param {Function} [testFn] A test function to execute before adding the class. The passed parameter
         * will be the Element instance. If this functions returns false, the class will not be added.
         * @param {Object} [scope] The scope to execute the testFn in.
         * @return {Ext.dom.Element} this
         */
        addClsOnClick: function(className, testFn, scope) {
            var me = this,
                dom = me.dom,
                hasTest = Ext.isFunction(testFn);
                
            me.on("mousedown", function() {
                if (hasTest && testFn.call(scope || me, me) === false) {
                    return false;
                }
                Ext.fly(dom).addCls(className);
                var d = Ext.getDoc(),
                    fn = function() {
                        Ext.fly(dom).removeCls(className);
                        d.removeListener("mouseup", fn);
                    };
                d.on("mouseup", fn);
            });
            return me;
        },

        /**
         * Sets up event handlers to add and remove a css class when this element has the focus
         * @param {String} className The class to add
         * @param {Function} [testFn] A test function to execute before adding the class. The passed parameter
         * will be the Element instance. If this functions returns false, the class will not be added.
         * @param {Object} [scope] The scope to execute the testFn in.
         * @return {Ext.dom.Element} this
         */
        addClsOnFocus: function(className, testFn, scope) {
            var me = this,
                dom = me.dom,
                hasTest = Ext.isFunction(testFn);
                
            me.on("focus", function() {
                if (hasTest && testFn.call(scope || me, me) === false) {
                    return false;
                }
                Ext.fly(dom).addCls(className);
            });
            me.on("blur", function() {
                Ext.fly(dom).removeCls(className);
            });
            return me;
        },

        /**
         * Sets up event handlers to add and remove a css class when the mouse is over this element
         * @param {String} className The class to add
         * @param {Function} [testFn] A test function to execute before adding the class. The passed parameter
         * will be the Element instance. If this functions returns false, the class will not be added.
         * @param {Object} [scope] The scope to execute the testFn in.
         * @return {Ext.dom.Element} this
         */
        addClsOnOver: function(className, testFn, scope) {
            var me = this,
                dom = me.dom,
                hasTest = Ext.isFunction(testFn);
                
            me.hover(
                function() {
                    if (hasTest && testFn.call(scope || me, me) === false) {
                        return;
                    }
                    Ext.fly(dom).addCls(className);
                },
                function() {
                    Ext.fly(dom).removeCls(className);
                }
            );
            return me;
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
        addKeyListener: function(key, fn, scope){
            var config;
            if(typeof key !== 'object' || Ext.isArray(key)){
                config = {
                    target: this,
                    key: key,
                    fn: fn,
                    scope: scope
                };
            } else {
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
        addKeyMap: function(config) {
            return new Ext.util.KeyMap(Ext.apply({
                target: this
            }, config));
        },

        /**
         * @private
         */
        anchorAnimX: function(anchor) {
            var xName = (anchor === 'l') ? 'right' : 'left';
            this.dom.style[xName] = '0px';
        },

        // @private - process the passed fx configuration.
        anim: function(config) {
            if (!Ext.isObject(config)) {
                return (config) ? {} : false;
            }

            var me = this,
                duration = config.duration || Ext.fx.Anim.prototype.duration,
                easing = config.easing || 'ease',
                animConfig;

            if (config.stopAnimation) {
                me.stopAnimation();
            }

            Ext.applyIf(config, Ext.fx.Manager.getFxDefaults(me.id));

            // Clear any 'paused' defaults.
            Ext.fx.Manager.setFxDefaults(me.id, {
                delay: 0
            });

            animConfig = {
                // Pass the DOM reference. That's tested first so will be converted to an Ext.fx.Target fastest.
                target: me.dom,
                remove: config.remove,
                alternate: config.alternate || false,
                duration: duration,
                easing: easing,
                callback: config.callback,
                listeners: config.listeners,
                iterations: config.iterations || 1,
                scope: config.scope,
                block: config.block,
                concurrent: config.concurrent,
                delay: config.delay || 0,
                paused: true,
                keyframes: config.keyframes,
                from: config.from || {},
                to: Ext.apply({}, config)
            };
            Ext.apply(animConfig.to, config.to);

            // Anim API properties - backward compat
            delete animConfig.to.to;
            delete animConfig.to.from;
            delete animConfig.to.remove;
            delete animConfig.to.alternate;
            delete animConfig.to.keyframes;
            delete animConfig.to.iterations;
            delete animConfig.to.listeners;
            delete animConfig.to.target;
            delete animConfig.to.paused;
            delete animConfig.to.callback;
            delete animConfig.to.scope;
            delete animConfig.to.duration;
            delete animConfig.to.easing;
            delete animConfig.to.concurrent;
            delete animConfig.to.block;
            delete animConfig.to.stopAnimation;
            delete animConfig.to.delay;
            return animConfig;
        },

        /**
         * Performs custom animation on this Element.
         *
         * The following properties may be specified in `from`, `to`, and `keyframe` objects:
         *
         *   - `x` - The page X position in pixels.
         *
         *   - `y` - The page Y position in pixels
         *
         *   - `left` - The element's CSS `left` value. Units must be supplied.
         *
         *   - `top` - The element's CSS `top` value. Units must be supplied.
         *
         *   - `width` - The element's CSS `width` value. Units must be supplied.
         *
         *   - `height` - The element's CSS `height` value. Units must be supplied.
         *
         *   - `scrollLeft` - The element's `scrollLeft` value.
         *
         *   - `scrollTop` - The element's `scrollTop` value.
         *
         *   - `opacity` - The element's `opacity` value. This must be a value between `0` and `1`.
         *
         * **Be aware** that animating an Element which is being used by an Ext Component without in some way informing the
         * Component about the changed element state will result in incorrect Component behaviour. This is because the
         * Component will be using the old state of the element. To avoid this problem, it is now possible to directly
         * animate certain properties of Components.
         *
         * @param {Object} config  Configuration for {@link Ext.fx.Anim}.
         * Note that the {@link Ext.fx.Anim#to to} config is required.
         * @return {Ext.dom.Element} this
         */
        animate: function(config) {
            var me = this,
                animId = me.dom.id || Ext.id(me.dom),
                listeners,
                anim,
                end;
                

            if (!Ext.fx.Manager.hasFxBlock(animId)) {
                // Bit of gymnastics here to ensure our internal listeners get bound first
                if (config.listeners) {
                    listeners = config.listeners;
                    delete config.listeners;
                }
                if (config.internalListeners) {
                    config.listeners = config.internalListeners;
                    delete config.internalListeners;
                }
                end = config.autoEnd;
                delete config.autoEnd;
                anim = new Ext.fx.Anim(me.anim(config));
                if (listeners) {
                    anim.on(listeners);
                }
                Ext.fx.Manager.queueFx(anim);
                if (end) {
                    anim.jumpToEnd();
                }
            }
            return me;
        },

        /**
         * Wraps the specified element with a special 9 element markup/CSS block that renders by default as
         * a gray container with a gradient background, rounded corners and a 4-way shadow.
         *
         * This special markup is used throughout Ext when box wrapping elements ({@link Ext.button.Button},
         * {@link Ext.panel.Panel} when {@link Ext.panel.Panel#frame frame=true}, {@link Ext.window.Window}).
         * The markup is of this form:
         *
         *     <div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div>
         *     <div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div>
         *     <div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>
         *
         * Example usage:
         *
         *     // Basic box wrap
         *     Ext.get("foo").boxWrap();
         *
         *     // You can also add a custom class and use CSS inheritance rules to customize the box look.
         *     // 'x-box-blue' is a built-in alternative -- look at the related CSS definitions as an example
         *     // for how to create a custom box wrap style.
         *     Ext.get("foo").boxWrap().addCls("x-box-blue");
         *
         * @param {String} [class='x-box'] A base CSS class to apply to the containing wrapper element.
         * Note that there are a number of CSS rules that are dependent on this name to make the overall effect work,
         * so if you supply an alternate base class, make sure you also supply all of the necessary rules.
         * @return {Ext.dom.Element} The outermost wrapping element of the created box structure.
         */
        boxWrap: function(cls) {
            cls = cls || Ext.baseCSSPrefix + 'box';
            var el = Ext.get(this.insertHtml("beforeBegin", "<div class='" + cls + "' role='presentation'>" + Ext.String.format(boxMarkup, cls) + "</div>"));
            el.selectNode('.' + cls + '-mc').appendChild(this.dom);
            return el;
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
                scrollValues = [],
                scrolledDescendants = [], 
                descendants, descendant, i, len;

            scrollFly = scrollFly || new Ext.dom.Fly();

            descendants = me.query('*');
            for (i = 0, len = descendants.length; i < len; i++) {
                descendant = descendants[i];
                // use !== 0 for scrollLeft because it can be a negative number
                // in RTL mode in some browsers.
                if (descendant.scrollTop > 0 || descendant.scrollLeft !== 0) {
                    scrolledDescendants.push(descendant);
                    scrollValues.push(scrollFly.attach(descendant).getScroll());
                }
            }

            return function() {
                var scroll, i, len;

                for (i = 0, len = scrolledDescendants.length; i < len; i++) {
                    scroll = scrollValues[i];
                    scrollFly.attach(scrolledDescendants[i]);
                    scrollFly.setScrollLeft(scroll.left);
                    scrollFly.setScrollTop(scroll.top);
                }
            };
        },

        /**
         * Removes Empty, or whitespace filled text nodes. Combines adjacent text nodes.
         * @param {Boolean} [forceReclean=false] By default the element keeps track if it has been cleaned already
         * so you can call this over and over. However, if you update the element and need to force a reclean, you
         * can pass true.
         */
        clean: function(forceReclean) {
            var me   = this,
                dom  = me.dom,
                data = me.getData(),
                n    = dom.firstChild,
                ni   = -1,
                nx;

            if (data.isCleaned && forceReclean !== true) {
                return me;
            }

            while (n) {
                nx = n.nextSibling;
                if (n.nodeType === 3) {
                    // Remove empty/whitespace text nodes
                    if (!(nonSpaceRe.test(n.nodeValue))) {
                        dom.removeChild(n);
                    // Combine adjacent text nodes
                    } else if (nx && nx.nodeType === 3) {
                        n.appendData(Ext.String.trim(nx.data));
                        dom.removeChild(nx);
                        nx = n.nextSibling;
                        n.nodeIndex = ++ni;
                    }
                } else {
                    // Recursively clean
                    Ext.fly(n, '_clean').clean();
                    n.nodeIndex = ++ni;
                }
                n = nx;
            }

            data.isCleaned = true;
            return me;
        },

        /**
         * Emptys this element. Removes all child nodes.
         */
        empty: emptyRange ? function() {
            var dom = this.dom;

            if (dom.firstChild) {
                emptyRange.setStartBefore(dom.firstChild);
                emptyRange.setEndAfter(dom.lastChild);
                emptyRange.deleteContents();
            }
        } : function() {
            var dom = this.dom;

            while (dom.lastChild) {
                dom.removeChild(dom.lastChild);
            }
        },

        clearListeners: function() {
            this.removeAnchor();
            this.callParent();
        },

        /**
         * Clears positioning back to the default when the document was loaded.
         * @param {String} [value=''] The value to use for the left, right, top, bottom.
         * You could use 'auto'.
         * @return {Ext.dom.Element} this
         */
        clearPositioning: function(value) {
            value = value || '';
            return this.setStyle({
                left : value,
                right : value,
                top : value,
                bottom : value,
                'z-index' : '',
                position : 'static'
            });
        },

        /**
         * Creates a proxy element of this element
         * @param {String/Object} config The class name of the proxy element or a DomHelper config object
         * @param {String/HTMLElement} [renderTo] The element or element id to render the proxy to. Defaults to: document.body.
         * @param {Boolean} [matchBox=false] True to align and size the proxy to this element now.
         * @return {Ext.dom.Element} The new proxy element
         */
        createProxy: function(config, renderTo, matchBox) {
            config = (typeof config === 'object') ? config :
                { tag: "div", role: 'presentation', cls: config };

            var me = this,
                proxy = renderTo ? Ext.DomHelper.append(renderTo, config, true) :
                                   Ext.DomHelper.insertBefore(me.dom, config, true);

            proxy.setVisibilityMode(Element.DISPLAY);
            proxy.hide();
            if (matchBox && me.setBox && me.getBox) { // check to make sure Element_position.js is loaded
               proxy.setBox(me.getBox());
            }
            return proxy;
        },

        /**
         * Clears any opacity settings from this element. Required in some cases for IE.
         * @return {Ext.dom.Element} this
         */
        clearOpacity: function() {
            return this.setOpacity('');
        },

        /**
         * Store the current overflow setting and clip overflow on the element - use {@link #unclip} to remove
         * @return {Ext.dom.Element} this
         */
        clip: function() {
            var me = this,
                data = me.getData(),
                style;

            if (!data[ISCLIPPED]) {
                data[ISCLIPPED] = true;
                style = me.getStyle([OVERFLOW, OVERFLOWX, OVERFLOWY]);
                data[ORIGINALCLIP] = {
                    o: style[OVERFLOW],
                    x: style[OVERFLOWX],
                    y: style[OVERFLOWY]
                };
                me.setStyle(OVERFLOW, HIDDEN);
                me.setStyle(OVERFLOWX, HIDDEN);
                me.setStyle(OVERFLOWY, HIDDEN);
            }
            return me;
        },

        constrainScrollLeft: function(left) {
            var dom = this.dom;
            return Math.max(Math.min(left, dom.scrollWidth - dom.clientWidth), 0);
        },

        constrainScrollTop: function(top) {
            var dom = this.dom;
            return Math.max(Math.min(top, dom.scrollHeight - dom.clientHeight), 0);
        },

        destroy: function() {
            var me = this,
                dom = me.dom;

            if (dom && me.isAnimate) {
                me.stopAnimation();
            }

            me.callParent();

            //<feature legacyBrowser>
            // prevent memory leaks in IE8
            // see http://social.msdn.microsoft.com/Forums/ie/en-US/c76967f0-dcf8-47d0-8984-8fe1282a94f5/ie-appendchildremovechild-memory-problem?forum=iewebdevelopment
            if (dom && Ext.isIE8) {
                garbageBin = garbageBin || DOC.createElement('div');
                garbageBin.appendChild(dom);
                garbageBin.innerHTML = '';
            }
            //</feature>
        },

        // a scrollIntoView implementation for scrollIntoView/rtlScrollIntoView to call after
        // current scrollX has been determined
        // private
        doScrollIntoView: function(container, hscroll, animate, highlight, getScrollX, scrollTo) {
            scrollFly = scrollFly || new Ext.dom.Fly();

            var me = this,
                dom = me.dom,
                scrollX = scrollFly.attach(container)[getScrollX](),
                scrollY = container.scrollTop,
                position = me.getScrollIntoViewXY(container, scrollX, scrollY),
                newScrollX = position.x,
                newScrollY = position.y;

            // Highlight upon end of scroll
            if (highlight) {
                if (animate) {
                    animate = Ext.apply({
                        listeners: {
                            afteranimate: function() {
                                scrollFly.attach(dom).highlight();
                            }
                        }
                    }, animate);
                } else {
                    scrollFly.attach(dom).highlight();
                }
            }

            if (newScrollY !== scrollY) {
                scrollFly.attach(container).scrollTo('top', newScrollY, animate);
            }

            if (hscroll !== false  && (newScrollX !== scrollX)) {
                scrollFly.attach(container)[scrollTo]('left', newScrollX, animate);
            }
            return me;
        },

        /**
         * Convenience method for setVisibilityMode(Element.DISPLAY).
         * @param {String} [display] What to set display to when visible
         * @return {Ext.dom.Element} this
         */
        enableDisplayMode : function(display) {
            var me = this;

            me.setVisibilityMode(Element.DISPLAY);

            if (display !== undefined) {
                me.getData()[ORIGINALDISPLAY] = display;
            }

            return me;
        },

        /**
         * Fade an element in (from transparent to opaque). The ending opacity can be specified using the `opacity`
         * config option. Usage:
         *
         *     // default: fade in from opacity 0 to 100%
         *     el.fadeIn();
         *
         *     // custom: fade in from opacity 0 to 75% over 2 seconds
         *     el.fadeIn({ opacity: .75, duration: 2000});
         *
         *     // common config options shown with default values
         *     el.fadeIn({
         *         opacity: 1, //can be any value between 0 and 1 (e.g. .5)
         *         easing: 'easeOut',
         *         duration: 500
         *     });
         *
         * @param {Object} options (optional) Object literal with any of the {@link Ext.fx.Anim} config options
         * @return {Ext.dom.Element} The Element
         */
        fadeIn: function(o) {
            var me = this,
                dom = me.dom;
                
            me.animate(Ext.apply({}, o, {
                opacity: 1,
                internalListeners: {
                    beforeanimate: function(anim){
                        // restore any visibility/display that may have 
                        // been applied by a fadeout animation
                        var el = Ext.fly(dom, '_anim');
                        if (el.isStyle('display', 'none')) {
                            el.setDisplayed('');
                        } else {
                            el.show();
                        } 
                    }
                }
            }));
            return this;
        },

        /**
         * Fade an element out (from opaque to transparent). The ending opacity can be specified using the `opacity`
         * config option. Note that IE may require `useDisplay:true` in order to redisplay correctly.
         * Usage:
         *
         *     // default: fade out from the element's current opacity to 0
         *     el.fadeOut();
         *
         *     // custom: fade out from the element's current opacity to 25% over 2 seconds
         *     el.fadeOut({ opacity: .25, duration: 2000});
         *
         *     // common config options shown with default values
         *     el.fadeOut({
         *         opacity: 0, //can be any value between 0 and 1 (e.g. .5)
         *         easing: 'easeOut',
         *         duration: 500,
         *         remove: false,
         *         useDisplay: false
         *     });
         *
         * @param {Object} options (optional) Object literal with any of the {@link Ext.fx.Anim} config options
         * @return {Ext.dom.Element} The Element
         */
        fadeOut: function(o) {
            var me = this,
                dom = me.dom;
                
            o = Ext.apply({
                opacity: 0,
                internalListeners: {
                    afteranimate: function(anim){
                        if (dom && anim.to.opacity === 0) {
                            var el = Ext.fly(dom, '_anim');
                            if (o.useDisplay) {
                                el.setDisplayed(false);
                            } else {
                                el.hide();
                            }
                        }         
                    }
                }
            }, o);
            me.animate(o);
            return me;
        },

        // private
        fixDisplay: function(){
            var me = this;
            if (me.isStyle(DISPLAY, NONE)) {
                me.setStyle(VISIBILITY, HIDDEN);
                me.setStyle(DISPLAY, getDisplay(me)); // first try reverting to default
                if (me.isStyle(DISPLAY, NONE)) { // if that fails, default to block
                    me.setStyle(DISPLAY, "block");
                }
            }
        },

        /**
         * Shows a ripple of exploding, attenuating borders to draw attention to an Element. Usage:
         *
         *     // default: a single light blue ripple
         *     el.frame();
         *
         *     // custom: 3 red ripples lasting 3 seconds total
         *     el.frame("#ff0000", 3, { duration: 3000 });
         *
         *     // common config options shown with default values
         *     el.frame("#C3DAF9", 1, {
         *         duration: 1000 // duration of each individual ripple.
         *         // Note: Easing is not configurable and will be ignored if included
         *     });
         *
         * @param {String} [color='#C3DAF9'] The hex color value for the border.
         * @param {Number} [count=1] The number of ripples to display.
         * @param {Object} [options] Object literal with any of the {@link Ext.fx.Anim} config options
         * @return {Ext.dom.Element} The Element
         */
        frame: function(color, count, obj){
            var me = this,
                dom = me.dom,
                beforeAnim;

            color = color || '#C3DAF9';
            count = count || 1;
            obj = obj || {};

            beforeAnim = function() {
                var el = Ext.fly(dom, '_anim'),
                    animScope = this,
                    box,
                    proxy, proxyAnim;
                    
                el.show();
                box = el.getBox();
                proxy = Ext.getBody().createChild({
                    role: 'presentation',
                    id: el.dom.id + '-anim-proxy',
                    style: {
                        position : 'absolute',
                        'pointer-events': 'none',
                        'z-index': 35000,
                        border : '0px solid ' + color
                    }
                });
                
                proxyAnim = new Ext.fx.Anim({
                    target: proxy,
                    duration: obj.duration || 1000,
                    iterations: count,
                    from: {
                        top: box.y,
                        left: box.x,
                        borderWidth: 0,
                        opacity: 1,
                        height: box.height,
                        width: box.width
                    },
                    to: {
                        top: box.y - 20,
                        left: box.x - 20,
                        borderWidth: 10,
                        opacity: 0,
                        height: box.height + 40,
                        width: box.width + 40
                    }
                });
                proxyAnim.on('afteranimate', function() {
                    proxy.destroy();
                    // kill the no-op element animation created below
                    animScope.end();
                });
            };

            me.animate({
                // See "A Note About Wrapped Animations" at the top of this class:
                duration: (Math.max(obj.duration, 500) * 2) || 2000,
                listeners: {
                    beforeanimate: {
                        fn: beforeAnim
                    }
                },
                callback: obj.callback,
                scope: obj.scope
            });
            return me;
        },

        /**
         * Return the CSS color for the specified CSS attribute. rgb, 3 digit (like `#fff`)
         * and valid values are convert to standard 6 digit hex color.
         * @param {String} attr The css attribute
         * @param {String} defaultValue The default value to use when a valid color isn't found
         * @param {String} [prefix] defaults to #. Use an empty string when working with
         * color anims.
         * @private
         */
        getColor: function(attr, defaultValue, prefix) {
            var v = this.getStyle(attr),
                color = prefix || prefix === '' ? prefix : '#',
                h, len, i=0;

            if (!v || (/transparent|inherit/.test(v))) {
                return defaultValue;
            }
            if (/^r/.test(v)) {
                 v = v.slice(4, v.length - 1).split(',');
                 len = v.length;
                 for (; i<len; i++) {
                    h = parseInt(v[i], 10);
                    color += (h < 16 ? '0' : '') + h.toString(16);
                }
            } else {
                v = v.replace('#', '');
                color += v.length === 3 ? v.replace(/^(\w)(\w)(\w)$/, '$1$1$2$2$3$3') : v;
            }
            return(color.length > 5 ? color.toLowerCase() : defaultValue);
        },

        /**
         * Gets this element's {@link Ext.ElementLoader ElementLoader}
         * @return {Ext.ElementLoader} The loader
         */
        getLoader: function() {
            var me = this,
                data = me.getData(),
                loader = data.loader;

            if (!loader) {
                data.loader = loader = new Ext.ElementLoader({
                    target: me
                });
            }
            return loader;
        },

        /**
         * Gets an object with all CSS positioning properties. Useful along with
         * #setPostioning to get snapshot before performing an update and then restoring
         * the element.
         * @param {Boolean} [autoPx=false] true to return pixel values for "auto" styles.
         * @return {Object}
         */
        getPositioning: function(autoPx){
            var styles = this.getStyle(['left', 'top', 'position', 'z-index']),
                dom = this.dom;

            if(autoPx) {
                if(styles.left === 'auto') {
                    styles.left = dom.offsetLeft + 'px';
                }
                if(styles.top === 'auto') {
                    styles.top = dom.offsetTop + 'px';
                }
            }

            return styles;
        },

        /**
         * Returns the current scroll position of the element.
         * @return {Object} An object containing the scroll position in the format
         * `{left: (scrollLeft), top: (scrollTop)}`
         */
        getScroll: function() {
            var me = this,
                dom = me.dom,
                docElement = DOC.documentElement,
                left, top,
                body = document.body;

            if (dom === DOC || dom === body) {
                // the scrollLeft/scrollTop may be either on the body or documentElement,
                // depending on browser. It is possible to use window.pageXOffset/pageYOffset
                // in most modern browsers but this complicates things when in rtl mode because
                // pageXOffset does not always behave the same as scrollLeft when direction is
                // rtl. (e.g. pageXOffset can be an offset from the right, while scrollLeft
                // is offset from the left, one can be positive and the other negative, etc.)
                // To avoid adding an extra layer of feature detection in rtl mode to deal with
                // these differences, it's best just to always use scrollLeft/scrollTop
                left = docElement.scrollLeft || (body ? body.scrollLeft : 0);
                top = docElement.scrollTop || (body ? body.scrollTop : 0);
            } else {
                left = dom.scrollLeft;
                top = dom.scrollTop;
            }

            return {
                left: left,
                top: top
            };
        },

        /**
         * Gets the x and y coordinates needed for scrolling an element into view within
         * a given container.  These coordinates translate into the scrollLeft and scrollTop
         * positions that will need to be set on an ancestor of the element in order to make
         * this element visible within its container.
         * @param {String/HTMLElement/Ext.Element} The container
         * @param {Number} scrollX The container's current scroll position on the x axis
         * @param {Number} scrollY The container's current scroll position on the y axis
         * @return {Object} An object with "x" and "y" properties
         * @private
         */
        getScrollIntoViewXY: function(container, scrollX, scrollY) {
            var me = this,
                dom = me.dom,
                ct = Ext.getDom(container),
                offsets = me.getOffsetsTo(ct),
            // el's box
                width = dom.offsetWidth,
                height = dom.offsetHeight,
                left = offsets[0] + scrollX,
                top = offsets[1] + scrollY,
                bottom = top + height,
                right = left + width,
            // ct's box
                ctClientHeight = ct.clientHeight,
                ctClientWidth = ct.clientWidth,
                ctBottom = scrollY + ctClientHeight,
                ctRight = scrollX + ctClientWidth,
                scrollX, scrollY;

            if (height > ctClientHeight || top < scrollY) {
                scrollY = top;
            } else if (bottom > ctBottom) {
                scrollY = bottom - ctClientHeight;
            }

            if (width > ctClientWidth || left < scrollX) {
                scrollX = left;
            } else if (right > ctRight) {
                scrollX = right - ctClientWidth;
            }

            return {
                x: scrollX,
                y: scrollY
            };
        },

        /**
         * Gets the left scroll position
         * @return {Number} The left scroll position
         */
        getScrollLeft: function() {
            var dom = this.dom;
                
            if (dom === DOC || dom === document.body) {
                return this.getScroll().left;
            } else {
                return dom.scrollLeft;
            }
        },
        
        /**
         * Gets the top scroll position
         * @return {Number} The top scroll position
         */
        getScrollTop: function(){
            var dom = this.dom;
                
            if (dom === DOC || dom === document.body) {
                return this.getScroll().top;
            } else {
                return dom.scrollTop;
            }
        },

        getXY: function() {
            var xy = this.callParent(),
                scroll = Ext.getDoc().getScroll();

            xy[0] += scroll.left;
            xy[1] += scroll.top;
            return xy;
        },

        /**
         * Slides the element while fading it out of view. An anchor point can be optionally passed to set the ending point
         * of the effect. Usage:
         *
         *     // default: slide the element downward while fading out
         *     el.ghost();
         *
         *     // custom: slide the element out to the right with a 2-second duration
         *     el.ghost('r', { duration: 2000 });
         *
         *     // common config options shown with default values
         *     el.ghost('b', {
         *         easing: 'easeOut',
         *         duration: 500
         *     });
         *
         * @param {String} anchor (optional) One of the valid {@link Ext.fx.Anim} anchor positions (defaults to bottom: 'b')
         * @param {Object} options (optional) Object literal with any of the {@link Ext.fx.Anim} config options
         * @return {Ext.dom.Element} The Element
         */
        ghost: function(anchor, obj) {
            var me = this,
                dom = me.dom,
                beforeAnim;

            anchor = anchor || "b";
            beforeAnim = function() {
                var el = Ext.fly(dom, '_anim'),
                    width = el.getWidth(),
                    height = el.getHeight(),
                    xy = el.getXY(),
                    position = el.getPositioning(),
                    to = {
                        opacity: 0
                    };
                switch (anchor) {
                    case 't':
                        to.y = xy[1] - height;
                        break;
                    case 'l':
                        to.x = xy[0] - width;
                        break;
                    case 'r':
                        to.x = xy[0] + width;
                        break;
                    case 'b':
                        to.y = xy[1] + height;
                        break;
                    case 'tl':
                        to.x = xy[0] - width;
                        to.y = xy[1] - height;
                        break;
                    case 'bl':
                        to.x = xy[0] - width;
                        to.y = xy[1] + height;
                        break;
                    case 'br':
                        to.x = xy[0] + width;
                        to.y = xy[1] + height;
                        break;
                    case 'tr':
                        to.x = xy[0] + width;
                        to.y = xy[1] - height;
                        break;
                }
                this.to = to;
                this.on('afteranimate', function () {
                    var el = Ext.fly(dom, '_anim');
                    if (el) {
                        el.hide();
                        el.clearOpacity();
                        el.setPositioning(position);
                    }
                });
            };

            me.animate(Ext.applyIf(obj || {}, {
                duration: 500,
                easing: 'ease-out',
                listeners: {
                    beforeanimate: beforeAnim
                }
            }));
            return me;
        },

        /**
         * @override
         * Hide this element - Uses display mode to determine whether to use "display",
         * "visibility", or "offsets". See {@link #setVisible}.
         * @param {Boolean/Object} [animate] true for the default animation or a standard
         * Element animation config object
         * @return {Ext.dom.Element} this
         */
        hide: function(animate){
            // hideMode override
            if (typeof animate === 'string'){
                this.setVisible(false, animate);
                return this;
            }
            this.setVisible(false, this.anim(animate));
            return this;
        },

        /**
         * Highlights the Element by setting a color (applies to the background-color by default, but can be changed using
         * the "attr" config option) and then fading back to the original color. If no original color is available, you
         * should provide the "endColor" config option which will be cleared after the animation. Usage:
         *
         *     // default: highlight background to yellow
         *     el.highlight();
         *
         *     // custom: highlight foreground text to blue for 2 seconds
         *     el.highlight("0000ff", { attr: 'color', duration: 2000 });
         *
         *     // common config options shown with default values
         *     el.highlight("ffff9c", {
         *         attr: "backgroundColor", //can be any valid CSS property (attribute) that supports a color value
         *         endColor: (current color) or "ffffff",
         *         easing: 'easeIn',
         *         duration: 1000
         *     });
         *
         * @param {String} color (optional) The highlight color. Should be a 6 char hex color without the leading #
         * (defaults to yellow: 'ffff9c')
         * @param {Object} options (optional) Object literal with any of the {@link Ext.fx.Anim} config options
         * @return {Ext.dom.Element} The Element
         */
        highlight: function(color, o) {
            var me = this,
                dom = me.dom,
                from = {},
                restore, to, attr, lns, event, fn;

            o = o || {};
            lns = o.listeners || {};
            attr = o.attr || 'backgroundColor';
            from[attr] = color || 'ffff9c';

            if (!o.to) {
                to = {};
                to[attr] = o.endColor || me.getColor(attr, 'ffffff', '');
            }
            else {
                to = o.to;
            }

            // Don't apply directly on lns, since we reference it in our own callbacks below
            o.listeners = Ext.apply(Ext.apply({}, lns), {
                beforeanimate: function() {
                    restore = dom.style[attr];
                    var el = Ext.fly(dom, '_anim');
                    el.clearOpacity();
                    el.show();

                    event = lns.beforeanimate;
                    if (event) {
                        fn = event.fn || event;
                        return fn.apply(event.scope || lns.scope || WIN, arguments);
                    }
                },
                afteranimate: function() {
                    if (dom) {
                        dom.style[attr] = restore;
                    }

                    event = lns.afteranimate;
                    if (event) {
                        fn = event.fn || event;
                        fn.apply(event.scope || lns.scope || WIN, arguments);
                    }
                }
            });

            me.animate(Ext.apply({}, o, {
                duration: 1000,
                easing: 'ease-in',
                from: from,
                to: to
            }));
            return me;
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
         * Initializes a {@link Ext.dd.DD} drag drop object for this element.
         * @param {String} group The group the DD object is member of
         * @param {Object} config The DD config object
         * @param {Object} overrides An object containing methods to override/implement on the DD object
         * @return {Ext.dd.DD} The DD object
         */
        initDD: function(group, config, overrides){
            var dd = new Ext.dd.DD(Ext.id(this.dom), group, config);
            return Ext.apply(dd, overrides);
        },

        /**
         * Initializes a {@link Ext.dd.DDProxy} object for this element.
         * @param {String} group The group the DDProxy object is member of
         * @param {Object} config The DDProxy config object
         * @param {Object} overrides An object containing methods to override/implement on the DDProxy object
         * @return {Ext.dd.DDProxy} The DDProxy object
         */
        initDDProxy: function(group, config, overrides){
            var dd = new Ext.dd.DDProxy(Ext.id(this.dom), group, config);
            return Ext.apply(dd, overrides);
        },

        /**
         * Initializes a {@link Ext.dd.DDTarget} object for this element.
         * @param {String} group The group the DDTarget object is member of
         * @param {Object} config The DDTarget config object
         * @param {Object} overrides An object containing methods to override/implement on the DDTarget object
         * @return {Ext.dd.DDTarget} The DDTarget object
         */
        initDDTarget: function(group, config, overrides){
            var dd = new Ext.dd.DDTarget(Ext.id(this.dom), group, config);
            return Ext.apply(dd, overrides);
        },

        /**
         * Checks whether this element can be focused.
         * @return {Boolean} True if the element is focusable
         */
        isFocusable: function (/* private - assume it's the focusEl of a Component */ asFocusEl) {
            var me = this,
                dom = me.dom,
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
                    canFocus = Ext.enableFocusManager && asFocusEl;
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
                canFocus = canFocus && me.isVisible(true);
            }
            return canFocus;
        },

        /**
         * Returns true if this element is masked. Also re-centers any displayed message within the mask.
         * @return {Boolean}
         */
        isMasked: function() {
            var me = this,
                data = me.getData(),
                maskEl = data.maskEl,
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
         * Returns true if this element is scrollable.
         * @return {Boolean}
         */
        isScrollable: function() {
            var dom = this.dom;
            return dom.scrollHeight > dom.clientHeight || dom.scrollWidth > dom.clientWidth;
        },

        /**
         * Direct access to the Ext.ElementLoader {@link Ext.ElementLoader#method-load} method.
         * The method takes the same object parameter as {@link Ext.ElementLoader#method-load}
         * @param {Object} options a options object for Ext.ElementLoader {@link Ext.ElementLoader#method-load}
         * @return {Ext.dom.Element} this
         */
        load: function(options) {
            this.getLoader().load(options);
            return this;
        },

        /**
        * Puts a mask over this element to disable user interaction.
        * This method can only be applied to elements which accept child nodes. Use 
        * {@link #unmask} to remove the mask.
        * 
        * @param {String} [msg] A message to display in the mask
        * @param {String} [msgCls] A css class to apply to the msg element
        * @return {Ext.dom.Element} The mask element
        */
        mask: function (msg, msgCls /* private - passed by AbstractComponent.mask to avoid the need to interrogate the DOM to get the height*/, elHeight) {
            var me = this,
                dom = me.dom,
                data = me.getData(),
                maskEl = data.maskEl,
                maskMsg = data.maskMsg;

            if (!(bodyRe.test(dom.tagName) && me.getStyle('position') == 'static')) {
                me.addCls(XMASKEDRELATIVE);
            }

            // We always needs to recreate the mask since the DOM element may have been re-created
            if (maskEl) {
                maskEl.destroy();
            }

            if (maskMsg) {
                maskMsg.destroy();
            }

            Ext.DomHelper.append(dom, [{
                role: 'presentation',
                cls : Ext.baseCSSPrefix + "mask",
                style: 'top:0;left:0;'
            }, {
                role: 'presentation',
                cls : msgCls ? EXTELMASKMSG + " " + msgCls : EXTELMASKMSG,
                cn  : {
                    tag: 'div',
                    role: 'presentation',
                    cls: Ext.baseCSSPrefix + 'mask-msg-inner',
                    cn: {
                        tag: 'div',
                        role: 'presentation',
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

            if (typeof msg === 'string') {
                maskMsg.setDisplayed(true);
                maskMsg.center(me);
            } else {
                maskMsg.setDisplayed(false);
            }

            if (dom === DOC.body) {
                maskEl.addCls(Ext.baseCSSPrefix + 'mask-fixed');
            }

            // ie will not expand full height automatically
            if (Ext.isIE9m && dom !== DOC.body && me.isStyle('height', 'auto')) {
                maskEl.setSize(undefined, elHeight || me.getHeight());
            }
            return maskEl;
        },

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
                        //<feature legacyBrowser>
                        if (Ext.isIE9m) {
                            e.enableIEAsync();
                        }
                        //</feature>
                        timer = setTimeout(Ext.Function.bind(handler, scope||me, [e]), delay);
                    },
                    mouseenter: function() {
                        clearTimeout(timer);
                    }
                };

            me.on(listeners);
            return listeners;
        },

        /**
         * Returns true if this element needs an explicit tabIndex to make it focusable. Input fields, text areas, buttons
         * anchors elements **with an href** etc do not need a tabIndex, but structural elements do.
         */
        needsTabIndex: function() {
            var me = this;

            if (me.dom) {
                if ((me.dom.nodeName === 'a') && (!me.dom.href)) {
                    return true;
                }
                return !focusRe.test(me.dom.nodeName);
            }
        },

        //<feature legacyBrowser>
        /**
         * Normalize cross browser event differences
         * @private
         * @param {Object} eventName The event name
         * @param {Object} fn The function to execute
         * @return {Object} The new event name/function
         */
        normalizeEvent: function(eventName) {
            var fn, newName;

            if (!Ext.supports.MouseEnterLeave && mouseEnterLeaveRe.test(eventName)) {
                fn = this.normalizeWithin;
                newName = eventName == 'mouseenter' ? 'mouseover' : 'mouseout';
            } else if (eventName == 'mousewheel' && !Ext.supports.MouseWheel && !Ext.isOpera) {
                newName = 'DOMMouseScroll';
            }
            return newName ? {
                eventName: newName,
                normalizeFn: fn
            } : null;
        },

        /**
         * Checks whether the event's relatedTarget is contained inside (or is) the target
         * Used for adding mousenter/mouseleave support in older browser.
         * (see normalizeEvent)
         * @private
         * @param {Object} event
         */
        normalizeWithin: function(event) {
            var parent = event.currentTarget,
                child = event.getRelatedTarget();

            if (parent && parent.firstChild) {
                while (child) {
                    if (child === parent) {
                        return false;
                    }
                    child = child.parentNode;
                    if (child && (child.nodeType !== 1)) {
                        child = null;
                    }
                }
            }
            return true;
        },
        //</feature>

        /**
         * Fades the element out while slowly expanding it in all directions. When the effect is completed, the element will
         * be hidden (visibility = 'hidden') but block elements will still take up space in the document. Usage:
         *
         *     // default
         *     el.puff();
         *
         *     // common config options shown with default values
         *     el.puff({
         *         easing: 'easeOut',
         *         duration: 500,
         *         useDisplay: false
         *     });
         *
         * @param {Object} options (optional) Object literal with any of the {@link Ext.fx.Anim} config options
         * @return {Ext.dom.Element} The Element
         */
        puff: function(obj) {
            var me = this,
                dom = me.dom,
                beforeAnim,
                box = me.getBox(),
                originalStyles = me.getStyle(['width', 'height', 'left', 'right', 'top', 'bottom', 'position', 'z-index', 'font-size', 'opacity'], true);

           obj = Ext.applyIf(obj || {}, {
                easing: 'ease-out',
                duration: 500,
                useDisplay: false
            });

            beforeAnim = function() {
                var el = Ext.fly(dom, '_anim');
                
                el.clearOpacity();
                el.show();
                this.to = {
                    width: box.width * 2,
                    height: box.height * 2,
                    x: box.x - (box.width / 2),
                    y: box.y - (box.height /2),
                    opacity: 0,
                    fontSize: '200%'
                };
                this.on('afteranimate',function() {
                    var el = Ext.fly(dom, '_anim');
                    if (el) {
                        if (obj.useDisplay) {
                            el.setDisplayed(false);
                        } else {
                            el.hide();
                        }
                        el.setStyle(originalStyles);
                        Ext.callback(obj.callback, obj.scope);
                    }
                });
            };

            me.animate({
                duration: obj.duration,
                easing: obj.easing,
                listeners: {
                    beforeanimate: {
                        fn: beforeAnim
                    }
                }
            });
            return me;
        },

        /**
         * Scrolls this element the specified direction. Does bounds checking to make sure the scroll is
         * within this element's scrollable range.
         * @param {String} direction Possible values are:
         *
         * - `"l"` (or `"left"`)
         * - `"r"` (or `"right"`)
         * - `"t"` (or `"top"`, or `"up"`)
         * - `"b"` (or `"bottom"`, or `"down"`)
         *
         * @param {Number} distance How far to scroll the element in pixels
         * @param {Boolean/Object} [animate] true for the default animation or a standard Element
         * animation config object
         * @return {Boolean} Returns true if a scroll was triggered or false if the element
         * was scrolled as far as it could go.
         */
        scroll: function(direction, distance, animate) {
            if (!this.isScrollable()) {
                return false;
            }
            
            // Allow full word, or initial to be sent.
            // (Ext.dd package uses full word)
            direction = direction.charAt(0);
            var me = this,
                dom = me.dom,
                side = direction === 'r' || direction === 'l' ? 'left' : 'top',
                scrolled = false,
                currentScroll, constrainedScroll;

            if (direction === 'l' || direction === 't' || direction === 'u') {
                distance = -distance;
            }

            if (side === 'left') {
                currentScroll = dom.scrollLeft;
                constrainedScroll = me.constrainScrollLeft(currentScroll + distance);
            } else {
                currentScroll = dom.scrollTop;
                constrainedScroll = me.constrainScrollTop(currentScroll + distance);
            }

            if (constrainedScroll !== currentScroll) {
                this.scrollTo(side, constrainedScroll, animate);
                scrolled = true;
            }

            return scrolled;
        },

        /**
         * Scrolls this element by the passed delta values, optionally animating.
         * 
         * All of the following are equivalent:
         *
         *      el.scrollBy(10, 10, true);
         *      el.scrollBy([10, 10], true);
         *      el.scrollBy({ x: 10, y: 10 }, true);
         * 
         * @param {Number/Number[]/Object} deltaX Either the x delta, an Array specifying x and y deltas or
         * an object with "x" and "y" properties.
         * @param {Number/Boolean/Object} deltaY Either the y delta, or an animate flag or config object.
         * @param {Boolean/Object} animate Animate flag/config object if the delta values were passed separately.
         * @return {Ext.dom.Element} this
         */
        scrollBy: function(deltaX, deltaY, animate) {
            var me = this,
                dom = me.dom;

            // Extract args if deltas were passed as an Array.
            if (deltaX.length) {
                animate = deltaY;
                deltaY = deltaX[1];
                deltaX = deltaX[0];
            } else if (typeof deltaX != 'number') { // or an object
                animate = deltaY;
                deltaY = deltaX.y;
                deltaX = deltaX.x;
            }

            if (deltaX) {
                me.scrollTo('left', me.constrainScrollLeft(dom.scrollLeft + deltaX), animate);
            }
            if (deltaY) {
                me.scrollTo('top', me.constrainScrollTop(dom.scrollTop + deltaY), animate);
            }

            return me;
        },

        // private
        scrollChildIntoView: function(child, hscroll) {
            scrollFly = scrollFly || new Ext.dom.Fly();
            scrollFly.attach(Ext.getDom(child)).scrollIntoView(this, hscroll);
        },

        /**
         * Scrolls this element into view within the passed container.
         * @param {String/HTMLElement/Ext.Element} [container=document.body] The container element
         * to scroll.  Should be a string (id), dom node, or Ext.Element.
         * @param {Boolean} [hscroll=true] False to disable horizontal scroll.
         * @param {Boolean/Object} [animate] true for the default animation or a standard Element
         * animation config object
         * @param {Boolean} [highlight=false] true to {@link #highlight} the element when it is in view.
         * @return {Ext.dom.Element} this
         */
        scrollIntoView: function(container, hscroll, animate, highlight) {
            container = Ext.getDom(container) || Ext.getBody().dom;

            return this.doScrollIntoView(
                container,
                hscroll,
                animate,
                highlight,
                'getScrollLeft',
                'scrollTo'
            );
        },

        /**
         * Scrolls this element the specified scroll point. It does NOT do bounds checking so
         * if you scroll to a weird value it will try to do it. For auto bounds checking, use #scroll.
         * @param {String} side Either "left" for scrollLeft values or "top" for scrollTop values.
         * @param {Number} value The new scroll value
         * @param {Boolean/Object} [animate] true for the default animation or a standard Element
         * animation config object
         * @return {Ext.dom.Element} this
         */
        scrollTo: function(side, value, animate) {
            //check if we're scrolling top or left
            var top = /top/i.test(side),
                me = this,
                prop = top ? 'scrollTop' : 'scrollLeft',
                dom = me.dom,
                animCfg;

            if (!animate || !me.anim) {
                // just setting the value, so grab the direction
                dom[prop] = value;
                // corrects IE, other browsers will ignore
                dom[prop] = value;
            }
            else {
                animCfg = {
                    to: {}
                };
                animCfg.to[prop] = value;
                if (Ext.isObject(animate)) {
                    Ext.applyIf(animCfg, animate);
                }
                me.animate(animCfg);
            }
            return me;
        },

        /**
         * Enable text selection for this element (normalized across browsers)
         * @return {Ext.dom.Element} this
         */
        selectable: function() {
            var me = this;

            // We clear this property for all browsers, not just Opera. This is so that rendering templates don't need to
            // condition on Opera when making elements unselectable.
            me.dom.unselectable = '';

            me.removeCls(Element.unselectableCls);
            me.addCls(Element.selectableCls);

            return me;
        },

        //<feature legacyBrowser>
        // private
        // used to ensure the mouseup event is captured if it occurs outside of the
        // window in IE9m.  The only reason this method exists, (vs just calling
        // el.dom.setCapture() directly) is so that we can override it to emptyFn
        // during testing because setCapture() can wreak havoc on emulated mouse events
        // http://msdn.microsoft.com/en-us/library/windows/desktop/ms646262(v=vs.85).aspx
        setCapture: function() {
            var dom = this.dom;
            if (Ext.isIE9m && dom.setCapture) {
                dom.setCapture();
            }
        },
        //</feature>

        /**
         * Sets the CSS display property. Uses originalDisplay if the specified value is a
         * boolean true.
         * @param {Boolean/String} value Boolean value to display the element using its
         * default display, or a string to set the display directly.
         * @return {Ext.dom.Element} this
         */
        setDisplayed: function(value) {
            if (typeof value === "boolean"){
               value = value ? getDisplay(this) : NONE;
            }
            this.setStyle(DISPLAY, value);
            return this;
        },

        /**
         * Set the height of this Element.
         * 
         *     // change the height to 200px and animate with default configuration
         *     Ext.fly('elementId').setHeight(200, true);
         *
         *     // change the height to 150px and animate with a custom configuration
         *     Ext.fly('elId').setHeight(150, {
         *         duration : 500, // animation will have a duration of .5 seconds
         *         // will change the content to "finished"
         *         callback: function(){ this.{@link #setHtml}("finished"); }
         *     });
         *     
         * @param {Number/String} height The new height. This may be one of:
         *
         * - A Number specifying the new height in pixels.
         * - A String used to set the CSS height style. Animation may **not** be used.
         *     
         * @param {Boolean/Object} [animate] a standard Element animation config object or `true` for
         * the default animation (`{duration: 350, easing: 'ease-in'}`)
         * @return {Ext.dom.Element} this
         */
        setHeight: function(height, animate) {
            var me = this;

            if (!animate || !me.anim) {
                me.callParent(arguments);
            }
            else {
                if (!Ext.isObject(animate)) {
                    animate = {};
                }
                me.animate(Ext.applyIf({
                    to: {
                        height: height
                    }
                }, animate));
            }

            return me;
        },

        /**
         * Removes "vertical" state from this element (reverses everything done
         * by {@link #setVertical}).
         * @private
         */
        setHorizontal: function() {
            var me = this,
                cls = me.verticalCls;

            delete me.vertical;
            if (cls) {
                delete me.verticalCls;
                me.removeCls(cls);
            }

            // delete the inverted methods and revert to inheriting from the prototype 
            delete me.setWidth;
            delete me.setHeight;
            if (!Ext.isIE8) {
                delete me.getWidth;
                delete me.getHeight;
            }

            // revert to inheriting styleHooks from the prototype
            delete me.styleHooks;
        },

        /**
         * Updates the *text* value of this element.
         * Replaces the content of this element with a *single text node* containing the passed text.
         * @param {String} text The text to display in this Element.
         */
        updateText: function(text) {
            var me = this,
                dom,
                textNode;

            if (dom) {
                textNode = dom.firstChild;
                if (!textNode || (textNode.nodeType !== 3 || textNode.nextSibling)) {
                    textNode = DOC.createTextNode();
                    me.empty();
                    dom.appendChild(textNode);
                }
                if (text) {
                    textNode.data = text;
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
        setHtml: function(html, loadScripts, callback) {
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
            html += '<span id="' + id + '" role="presentation"></span>';

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
                        if (WIN.execScript) {
                           WIN.execScript(match[2]);
                        } else {
                           WIN.eval(match[2]);
                        }
                    }
                }
                Ext.callback(callback, me);
            }, 20);
            dom.innerHTML = html.replace(replaceScriptTagRe, '');
            return me;
        },

        /**
         * Set the opacity of the element
         * @param {Number} opacity The new opacity. 0 = transparent, .5 = 50% visibile, 1 = fully visible, etc
         * @param {Boolean/Object} [animate] a standard Element animation config object or `true` for
         * the default animation (`{duration: 350, easing: 'ease-in'}`)
         * @return {Ext.dom.Element} this
         */
        setOpacity: function(opacity, animate) {
            var me = this;

            if (!me.dom) {
                return me;
            }

            if (!animate || !me.anim) {
                me.setStyle('opacity', opacity);
            }
            else {
                if (typeof animate != 'object') {
                    animate = {
                        duration: 350,
                        easing: 'ease-in'
                    };
                }

                me.animate(Ext.applyIf({
                    to: {
                        opacity: opacity
                    }
                }, animate));
            }
            return me;
        },

        /**
         * Set positioning with an object returned by #getPositioning.
         * @param {Object} posCfg
         * @return {Ext.dom.Element} this
         */
        setPositioning: function(pc) {
            return this.setStyle(pc);
        },

        /**
         * Sets the left scroll position
         * @param {Number} left The left scroll position
         * @return {Ext.dom.Element} this
         */
        setScrollLeft: function(left){
            this.dom.scrollLeft = left;
            return this;
        },
        
        /**
         * Sets the top scroll position
         * @param {Number} top The top scroll position
         * @return {Ext.dom.Element} this
         */
        setScrollTop: function(top) {
            this.dom.scrollTop = top;
            return this;
        },

        /**
         * Changes this Element's state to "vertical" (rotated 90 or 270 degrees).
         * This involves inverting the getters and setters for height and width,
         * and applying hooks for rotating getters and setters for border/margin/padding.
         * (getWidth becomes getHeight and vice versa), setStyle and getStyle will
         * also return the inverse when height or width are being operated on.
         * 
         * @param {Number} angle the angle of rotation - either 90 or 270
         * @param {String} cls an optional css class that contains the required
         * styles for switching the element to vertical orientation. Omit this if
         * the element already contains vertical styling.  If cls is provided,
         * it will be removed from the element when {@link #setHorizontal} is called.
         * @private
         */
        setVertical: function(angle, cls) {
            var me = this,
                proto = Element.prototype;

            me.vertical = true;
            if (cls) {
                me.addCls(me.verticalCls = cls);
            }

            me.setWidth = proto.setHeight;
            me.setHeight = proto.setWidth;
            if (!Ext.isIE8) {
                // In browsers that use CSS3 transforms we must invert getHeight and
                // get Width. In IE8 no adjustment is needed because we use
                // a BasicImage filter to rotate the element and the element's
                // offsetWidth and offsetHeight are automatically inverted.
                me.getWidth = proto.getHeight;
                me.getHeight = proto.getWidth;
            }

            // Switch to using the appropriate vertical style hooks
            me.styleHooks = (angle === 270) ?
                proto.verticalStyleHooks270 : proto.verticalStyleHooks90;
        },

        /**
         * Set the size of this Element. If animation is true, both width and height will be animated concurrently.
         * @param {Number/String} width The new width. This may be one of:
         *
         * - A Number specifying the new width in pixels.
         * - A String used to set the CSS width style. Animation may **not** be used.
         * - A size object in the format `{width: widthValue, height: heightValue}`.
         *
         * @param {Number/String} height The new height. This may be one of:
         *
         * - A Number specifying the new height in  pixels.
         * - A String used to set the CSS height style. Animation may **not** be used.
         * 
         * @param {Boolean/Object} [animate] a standard Element animation config object or `true` for
         * the default animation (`{duration: 350, easing: 'ease-in'}`)
         *
         * @return {Ext.dom.Element} this
         */
        setSize: function(width, height, animate) {
            var me = this;

            if (Ext.isObject(width)) { // in case of object from getSize()
                animate = height;
                height = width.height;
                width = width.width;
            }

            if (!animate || !me.anim) {
                me.dom.style.width = Element.addUnits(width);
                me.dom.style.height = Element.addUnits(height);
            }
            else {
                if (animate === true) {
                    animate = {};
                }
                me.animate(Ext.applyIf({
                    to: {
                        width: width,
                        height: height
                    }
                }, animate));
            }

            return me;
        },

        /**
         * Sets the visibility of the element (see details). If the visibilityMode is set to Element.DISPLAY, it will use
         * the display property to hide the element, otherwise it uses visibility. The default is to hide and show using the visibility property.
         * @param {Boolean} visible Whether the element is visible
         * @param {Boolean/Object} [animate] True for the default animation, or a standard Element animation config object
         * @return {Ext.dom.Element} this
         */
        setVisible: function(visible, animate) {
            var me = this,
                dom = me.dom,
                visMode = getVisMode(me);

            // hideMode string override
            if (typeof animate === 'string') {
                switch (animate) {
                    case DISPLAY:
                        visMode = Element.DISPLAY;
                        break;
                    case VISIBILITY:
                        visMode = Element.VISIBILITY;
                        break;
                    case OFFSETS:
                        visMode = Element.OFFSETS;
                        break;
                }
                me.setVisibilityMode(visMode);
                animate = false;
            }

            if (!animate || !me.anim) {
                if (visMode === Element.DISPLAY) {
                    return me.setDisplayed(visible);
                } else if (visMode === Element.OFFSETS) {
                    me[visible?'removeCls':'addCls'](OFFSETCLASS);
                } else if (visMode === Element.VISIBILITY) {
                    me.fixDisplay();
                    // Show by clearing visibility style. Explicitly setting to "visible" overrides parent visibility setting
                    dom.style.visibility = visible ? '' : HIDDEN;
                }
            } else {
                // closure for composites
                if (visible) {
                    me.setOpacity(0.01);
                    me.setVisible(true);
                }
                if (!Ext.isObject(animate)) {
                    animate = {
                        duration: 350,
                        easing: 'ease-in'
                    };
                }
                me.animate(Ext.applyIf({
                    callback: function() {
                        if (!visible) {
                            
                            // Grab the dom again, since the reference may have changed if we use fly
                            Ext.fly(dom).setVisible(false).setOpacity(1);
                        }
                    },
                    to: {
                        opacity: (visible) ? 1 : 0
                    }
                }, animate));
            }
            me.getData()[ISVISIBLE] = visible;
            return me;
        },

        /**
         * Set the width of this Element.
         * 
         *     // change the width to 200px and animate with default configuration
         *     Ext.fly('elementId').setWidth(200, true);
         *
         *     // change the width to 150px and animate with a custom configuration
         *     Ext.fly('elId').setWidth(150, {
         *         duration : 500, // animation will have a duration of .5 seconds
         *         // will change the content to "finished"
         *         callback: function(){ this.{@link #setHtml}("finished"); }
         *     });
         *     
         * @param {Number/String} width The new width. This may be one of:
         *
         * - A Number specifying the new width in pixels.
         * - A String used to set the CSS width style. Animation may **not** be used.
         * 
         * @param {Boolean/Object} [animate] a standard Element animation config object or `true` for
         * the default animation (`{duration: 350, easing: 'ease-in'}`)
         * @return {Ext.dom.Element} this
         */
        setWidth: function(width, animate) {
            var me = this;
            if (!animate || !me.anim) {
                me.callParent(arguments);
            }
            else {
                if (!Ext.isObject(animate)) {
                    animate = {};
                }
                me.animate(Ext.applyIf({
                    to: {
                        width: width
                    }
                }, animate));
            }
            return me;
        },

        setX: function(x, animate) {
            return this.setXY([x, this.getY()], animate);
        },

        setXY: function(xy, animate) {
            var me = this;

            if (!animate || !me.anim) {
                me.callParent([xy]);
            } else {
                if (!Ext.isObject(animate)) {
                    animate = {};
                }
                me.animate(Ext.applyIf({ to: { x: xy[0], y: xy[1] } }, animate));
            }
            return this;
        },

        setY: function(y, animate) {
            return this.setXY([this.getX(), y], animate);
        },

        /**
         * Show this element - Uses display mode to determine whether to use "display",
         * "visibility", or "offsets". See {@link #setVisible}.
         * @param {Boolean/Object} [animate] true for the default animation or a standard
         * Element animation config object
         * @return {Ext.dom.Element} this
         */
        show: function(animate){
            // hideMode override
            if (typeof animate === 'string'){
                this.setVisible(true, animate);
                return this;
            }
            this.setVisible(true, this.anim(animate));
            return this;
        },

        /**
         * Slides the element into view. An anchor point can be optionally passed to set the point of origin for the slide
         * effect. This function automatically handles wrapping the element with a fixed-size container if needed. See the
         * {@link Ext.fx.Anim} class overview for valid anchor point options. Usage:
         *
         *     // default: slide the element in from the top
         *     el.slideIn();
         *
         *     // custom: slide the element in from the right with a 2-second duration
         *     el.slideIn('r', { duration: 2000 });
         *
         *     // common config options shown with default values
         *     el.slideIn('t', {
         *         easing: 'easeOut',
         *         duration: 500
         *     });
         *
         * @param {String} anchor (optional) One of the valid {@link Ext.fx.Anim} anchor positions (defaults to top: 't')
         * @param {Object} options (optional) Object literal with any of the {@link Ext.fx.Anim} config options
         * @param {Boolean} options.preserveScroll Set to true if preservation of any descendant elements'
         * `scrollTop` values is required. By default the DOM wrapping operation performed by `slideIn` and
         * `slideOut` causes the browser to lose all scroll positions.
         * @return {Ext.dom.Element} The Element
         */
        slideIn: function(anchor, obj, slideOut) {
            var me = this,
                dom = me.dom,
                elStyle = dom.style,
                beforeAnim,
                wrapAnim,
                restoreScroll,
                wrapDomParentNode;

            anchor = anchor || "t";
            obj = obj || {};

            beforeAnim = function() {
                var animScope = this,
                    listeners = obj.listeners,
                    el = Ext.fly(dom, '_anim'),
                    box, originalStyles, anim, wrap;

                if (!slideOut) {
                    el.fixDisplay();
                }

                box = el.getBox();
                if ((anchor == 't' || anchor == 'b') && box.height === 0) {
                    box.height = dom.scrollHeight;
                }
                else if ((anchor == 'l' || anchor == 'r') && box.width === 0) {
                    box.width = dom.scrollWidth;
                }

                originalStyles = el.getStyle(['width', 'height', 'left', 'right', 'top', 'bottom', 'position', 'z-index'], true);
                el.setSize(box.width, box.height);

                // Cache all descendants' scrollTop & scrollLeft values if configured to preserve scroll.
                if (obj.preserveScroll) {
                    restoreScroll = el.cacheScrollValues();
                }

                wrap = el.wrap({
                    role: 'presentation',
                    id: Ext.id() + '-anim-wrap-for-' + el.dom.id,
                    style: {
                        visibility: slideOut ? 'visible' : 'hidden'
                    }
                });
                wrapDomParentNode = wrap.dom.parentNode;
                wrap.setPositioning(el.getPositioning(true));
                if (wrap.isStyle('position', 'static')) {
                    wrap.position('relative');
                }
                el.clearPositioning('auto');
                wrap.clip();

                // The wrap will have reset all descendant scrollTops. Restore them if we cached them.
                if (restoreScroll) {
                    restoreScroll();
                }

                // This element is temporarily positioned absolute within its wrapper.
                // Restore to its default, CSS-inherited visibility setting.
                // We cannot explicitly poke visibility:visible into its style because that overrides the visibility of the wrap.
                el.setStyle({
                    visibility: '',
                    position: 'absolute'
                });
                if (slideOut) {
                    wrap.setSize(box.width, box.height);
                }

                switch (anchor) {
                    case 't':
                        anim = {
                            from: {
                                width: box.width + 'px',
                                height: '0px'
                            },
                            to: {
                                width: box.width + 'px',
                                height: box.height + 'px'
                            }
                        };
                        elStyle.bottom = '0px';
                        break;
                    case 'l':
                        anim = {
                            from: {
                                width: '0px',
                                height: box.height + 'px'
                            },
                            to: {
                                width: box.width + 'px',
                                height: box.height + 'px'
                            }
                        };
                        me.anchorAnimX(anchor);
                        break;
                    case 'r':
                        anim = {
                            from: {
                                x: box.x + box.width,
                                width: '0px',
                                height: box.height + 'px'
                            },
                            to: {
                                x: box.x,
                                width: box.width + 'px',
                                height: box.height + 'px'
                            }
                        };
                        me.anchorAnimX(anchor);
                        break;
                    case 'b':
                        anim = {
                            from: {
                                y: box.y + box.height,
                                width: box.width + 'px',
                                height: '0px'
                            },
                            to: {
                                y: box.y,
                                width: box.width + 'px',
                                height: box.height + 'px'
                            }
                        };
                        break;
                    case 'tl':
                        anim = {
                            from: {
                                x: box.x,
                                y: box.y,
                                width: '0px',
                                height: '0px'
                            },
                            to: {
                                width: box.width + 'px',
                                height: box.height + 'px'
                            }
                        };
                        elStyle.bottom = '0px';
                        me.anchorAnimX('l');
                        break;
                    case 'bl':
                        anim = {
                            from: {
                                y: box.y + box.height,
                                width: '0px',
                                height: '0px'
                            },
                            to: {
                                y: box.y,
                                width: box.width + 'px',
                                height: box.height + 'px'
                            }
                        };
                        me.anchorAnimX('l');
                        break;
                    case 'br':
                        anim = {
                            from: {
                                x: box.x + box.width,
                                y: box.y + box.height,
                                width: '0px',
                                height: '0px'
                            },
                            to: {
                                x: box.x,
                                y: box.y,
                                width: box.width + 'px',
                                height: box.height + 'px'
                            }
                        };
                        me.anchorAnimX('r');
                        break;
                    case 'tr':
                        anim = {
                            from: {
                                x: box.x + box.width,
                                width: '0px',
                                height: '0px'
                            },
                            to: {
                                x: box.x,
                                width: box.width + 'px',
                                height: box.height + 'px'
                            }
                        };
                        elStyle.bottom = '0px';
                        me.anchorAnimX('r');
                        break;
                }

                wrap.show();
                wrapAnim = Ext.apply({}, obj);
                delete wrapAnim.listeners;
                wrapAnim = new Ext.fx.Anim(Ext.applyIf(wrapAnim, {
                    target: wrap,
                    duration: 500,
                    easing: 'ease-out',
                    from: slideOut ? anim.to : anim.from,
                    to: slideOut ? anim.from : anim.to
                }));

                // In the absence of a callback, this listener MUST be added first
                wrapAnim.on('afteranimate', function() {
                    var el = Ext.fly(dom, '_anim');
                    
                    el.setStyle(originalStyles);
                    if (slideOut) {
                        if (obj.useDisplay) {
                            el.setDisplayed(false);
                        } else {
                            el.hide();
                        }
                    }
                    if (wrap.dom) {
                        if (wrap.dom.parentNode) {
                            wrap.dom.parentNode.insertBefore(el.dom, wrap.dom);
                        } else {
                            wrapDomParentNode.appendChild(el.dom);
                        }
                        wrap.destroy();
                    }
                    // The unwrap will have reset all descendant scrollTops. Restore them if we cached them.
                    if (restoreScroll) {
                        restoreScroll();
                    }
                    // kill the no-op element animation created below
                    animScope.end();
                });
                // Add configured listeners after
                if (listeners) {
                    wrapAnim.on(listeners);
                }
            };

            me.animate({
                // See "A Note About Wrapped Animations" at the top of this class:
                duration: obj.duration ? Math.max(obj.duration, 500) * 2 : 1000,
                listeners: {
                    beforeanimate: beforeAnim // kick off the wrap animation
                }
            });
            return me;
        },

        /**
         * Slides the element out of view. An anchor point can be optionally passed to set the end point for the slide
         * effect. When the effect is completed, the element will be hidden (visibility = 'hidden') but block elements will
         * still take up space in the document. The element must be removed from the DOM using the 'remove' config option if
         * desired. This function automatically handles wrapping the element with a fixed-size container if needed. See the
         * {@link Ext.fx.Anim} class overview for valid anchor point options. Usage:
         *
         *     // default: slide the element out to the top
         *     el.slideOut();
         *
         *     // custom: slide the element out to the right with a 2-second duration
         *     el.slideOut('r', { duration: 2000 });
         *
         *     // common config options shown with default values
         *     el.slideOut('t', {
         *         easing: 'easeOut',
         *         duration: 500,
         *         remove: false,
         *         useDisplay: false
         *     });
         *
         * @param {String} anchor (optional) One of the valid {@link Ext.fx.Anim} anchor positions (defaults to top: 't')
         * @param {Object} options (optional) Object literal with any of the {@link Ext.fx.Anim} config options
         * @return {Ext.dom.Element} The Element
         */
        slideOut: function(anchor, o) {
            return this.slideIn(anchor, o, true);
        },

        /**
         * Stops the specified event(s) from bubbling and optionally prevents the default action
         * @param {String/String[]} eventName an event / array of events to stop from bubbling
         * @param {Boolean} [preventDefault] true to prevent the default action too
         * @return {Ext.dom.Element} this
         */
        swallowEvent: function(eventName, preventDefault) {
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
         * Blinks the element as if it was clicked and then collapses on its center (similar to switching off a television).
         * When the effect is completed, the element will be hidden (visibility = 'hidden') but block elements will still
         * take up space in the document. The element must be removed from the DOM using the 'remove' config option if
         * desired. Usage:
         *
         *     // default
         *     el.switchOff();
         *
         *     // all config options shown with default values
         *     el.switchOff({
         *         easing: 'easeIn',
         *         duration: .3,
         *         remove: false,
         *         useDisplay: false
         *     });
         *
         * @param {Object} options (optional) Object literal with any of the {@link Ext.fx.Anim} config options
         * @return {Ext.dom.Element} The Element
         */
        switchOff: function(obj) {
            var me = this,
                dom = me.dom,
                beforeAnim;

            obj = Ext.applyIf(obj || {}, {
                easing: 'ease-in',
                duration: 500,
                remove: false,
                useDisplay: false
            });

            beforeAnim = function() {
                var el = Ext.fly(dom, '_anim'),
                    animScope = this,
                    size = el.getSize(),
                    xy = el.getXY(),
                    keyframe, position;
                    
                el.clearOpacity();
                el.clip();
                position = el.getPositioning();

                keyframe = new Ext.fx.Animator({
                    target: dom,
                    duration: obj.duration,
                    easing: obj.easing,
                    keyframes: {
                        33: {
                            opacity: 0.3
                        },
                        66: {
                            height: 1,
                            y: xy[1] + size.height / 2
                        },
                        100: {
                            width: 1,
                            x: xy[0] + size.width / 2
                        }
                    }
                });
                keyframe.on('afteranimate', function() {
                    var el = Ext.fly(dom, '_anim');
                    if (obj.useDisplay) {
                        el.setDisplayed(false);
                    } else {
                        el.hide();
                    }
                    el.clearOpacity();
                    el.setPositioning(position);
                    el.setSize(size);
                    // kill the no-op element animation created below
                    animScope.end();
                });
            };
            
            me.animate({
                // See "A Note About Wrapped Animations" at the top of this class:
                duration: (Math.max(obj.duration, 500) * 2),
                listeners: {
                    beforeanimate: {
                        fn: beforeAnim
                    }
                },
                callback: obj.callback,
                scope: obj.scope
            });
            return me;
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
                    Ext.fly(destNode, '_syncContent').syncContent(sourceNode);
                }
            }
        },

        /**
         * Toggles the element's visibility, depending on visibility mode.
         * @param {Boolean/Object} [animate] True for the default animation, or a standard Element animation config object
         * @return {Ext.dom.Element} this
         */
        toggle: function(animate){
            var me = this;
            me.setVisible(!me.isVisible(), me.anim(animate));
            return me;
        },

        /**
         * Hides a previously applied mask.
         */
        unmask: function() {
            var me = this,
                data = me.getData(),
                maskEl = data.maskEl,
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
                    maskEl.destroy();
                    delete data.maskEl;
                }

                if (maskMsg) {
                    maskMsg.destroy();
                    delete data.maskMsg;
                }

                me.removeCls([XMASKED, XMASKEDRELATIVE]);
            }
        },

        /**
         * Return clipping (overflow) to original clipping before {@link #clip} was called
         * @return {Ext.dom.Element} this
         */
        unclip: function() {
            var me = this,
                data = me.getData(),
                clip;

            if (data[ISCLIPPED]) {
                data[ISCLIPPED] = false;
                clip = data[ORIGINALCLIP];
                if (clip.o) {
                    me.setStyle(OVERFLOW, clip.o);
                }
                if (clip.x) {
                    me.setStyle(OVERFLOWX, clip.x);
                }
                if (clip.y) {
                    me.setStyle(OVERFLOWY, clip.y);
                }
            }
            return me;
        },

        translate: function(x, y, z) {
            if (Ext.supports.CssTransforms && !Ext.isIE9m) {
                this.callParent(arguments);
            } else {
                if (x != null) {
                    this.dom.style.left = x + 'px';
                }
                if (y != null) {
                    this.dom.style.top = y + 'px';
                }
                this.dom.style.position = 'absolute';
            }
        },

        /**
         * Disables text selection for this element (normalized across browsers)
         * @return {Ext.dom.Element} this
         */
        unselectable: function() {
            // The approach used to disable text selection combines CSS, HTML attributes and DOM events. Importantly the
            // strategy is designed to be expressible in markup, so that elements can be rendered unselectable without
            // needing modifications post-render. e.g.:
            //
            // <div class="x-unselectable" unselectable="on"></div>
            //
            // Changes to this method may need to be reflected elsewhere, e.g. ProtoElement.
            var me = this;

            // The unselectable property (or similar) is supported by various browsers but Opera is the only browser that
            // doesn't support any of the other techniques. The problem with it is that it isn't inherited by child
            // elements. Theoretically we could add it to all children but the performance would be terrible. In certain
            // key locations (e.g. panel headers) we add unselectable="on" to extra elements during rendering just for
            // Opera's benefit.
            if (Ext.isOpera) {
                me.dom.unselectable = 'on';
            }

            // In Mozilla and WebKit the CSS properties -moz-user-select and -webkit-user-select prevent a selection
            // originating in an element. These are inherited, which is what we want.
            //
            // In IE we rely on a listener for the selectstart event instead. We don't need to register a listener on the
            // individual element, instead we use a single listener and rely on event propagation to listen for the event at
            // the document level. That listener will walk up the DOM looking for nodes that have either of the classes
            // x-selectable or x-unselectable. This simulates the CSS inheritance approach.
            //
            // IE 10 is expected to support -ms-user-select so the listener may not be required.
            me.removeCls(Element.selectableCls);
            me.addCls(Element.unselectableCls);

            return me;
        },

        deprecated: {
            '4.0': {
                methods: {
                    /**
                     * Creates a pause before any subsequent queued effects begin. If there are no effects queued after the pause it will
                     * have no effect. Usage:
                     *
                     *     el.pause(1);
                     *
                     * @deprecated 4.0 Use the `delay` config to {@link #animate} instead.
                     * @param {Number} seconds The length of time to pause (in seconds)
                     * @return {Ext.dom.Element} The Element
                     */
                    pause: function(ms) {
                        var me = this;
                        Ext.fx.Manager.setFxDefaults(me.id, {
                            delay: ms
                        });
                        return me;
                    },

                    /**
                     * Animates the transition of an element's dimensions from a starting height/width to an ending height/width. This
                     * method is a convenience implementation of {@link #shift}. Usage:
                     *
                     *     // change height and width to 100x100 pixels
                     *     el.scale(100, 100);
                     *
                     *     // common config options shown with default values.  The height and width will default to
                     *     // the element's existing values if passed as null.
                     *     el.scale(
                     *         [element's width],
                     *         [element's height], {
                     *             easing: 'easeOut',
                     *             duration: 350
                     *         }
                     *     );
                     *
                     * @deprecated 4.0 Just use {@link #animate} instead.
                     * @param {Number} width The new width (pass undefined to keep the original width)
                     * @param {Number} height The new height (pass undefined to keep the original height)
                     * @param {Object} options (optional) Object literal with any of the {@link Ext.fx.Anim} config options
                     * @return {Ext.dom.Element} The Element
                     */
                    scale: function(w, h, o) {
                        this.animate(Ext.apply({}, o, {
                            width: w,
                            height: h
                        }));
                        return this;
                    },

                    /**
                     * Animates the transition of any combination of an element's dimensions, xy position and/or opacity. Any of these
                     * properties not specified in the config object will not be changed. This effect requires that at least one new
                     * dimension, position or opacity setting must be passed in on the config object in order for the function to have
                     * any effect. Usage:
                     *
                     *     // slide the element horizontally to x position 200 while changing the height and opacity
                     *     el.shift({ x: 200, height: 50, opacity: .8 });
                     *
                     *     // common config options shown with default values.
                     *     el.shift({
                     *         width: [element's width],
                     *         height: [element's height],
                     *         x: [element's x position],
                     *         y: [element's y position],
                     *         opacity: [element's opacity],
                     *         easing: 'easeOut',
                     *         duration: 350
                     *     });
                     *
                     * @deprecated 4.0 Just use {@link #animate} instead.
                     * @param {Object} options Object literal with any of the {@link Ext.fx.Anim} config options
                     * @return {Ext.dom.Element} The Element
                     */
                    shift: function(config) {
                        this.animate(config);
                        return this;
                    }
                }
            },
            '4.2': {
                methods: {
                    /**
                     * Sets the position of the element in page coordinates.
                     * @param {Number} x X value for new position (coordinates are page-based)
                     * @param {Number} y Y value for new position (coordinates are page-based)
                     * @param {Boolean/Object} [animate] True for the default animation, or a standard
                     * Element animation config object
                     * @return {Ext.dom.Element} this
                     * @deprecated 4.2.0 Use {@link #setXY} instead.
                     */
                    moveTo: function(x, y, animate) {
                        return this.setXY([x, y], animate);
                    },

                    /**
                     * Sets the element's position and size in one shot. If animation is true then
                     * width, height, x and y will be animated concurrently.
                     *
                     * @param {Number} x X value for new position (coordinates are page-based)
                     * @param {Number} y Y value for new position (coordinates are page-based)
                     * @param {Number/String} width The new width. This may be one of:
                     *
                     * - A Number specifying the new width in pixels
                     * - A String used to set the CSS width style. Animation may **not** be used.
                     *
                     * @param {Number/String} height The new height. This may be one of:
                     *
                     * - A Number specifying the new height in pixels
                     * - A String used to set the CSS height style. Animation may **not** be used.
                     *
                     * @param {Boolean/Object} [animate] true for the default animation or
                     * a standard Element animation config object
                     *
                     * @return {Ext.dom.Element} this
                     * @deprecated 4.2.0 Use {@link Ext.util.Positionable#setBox} instead.
                     */
                    setBounds: function(x, y, width, height, animate) {
                        return this.setBox({
                            x: x,
                            y: y,
                            width: width,
                            height: height
                        }, animate);
                    },

                    /**
                     * Sets the element's left and top positions directly using CSS style
                     * @param {Number/String} left Number of pixels or CSS string value to
                     * set as the left CSS property value
                     * @param {Number/String} top Number of pixels or CSS string value to
                     * set as the top CSS property value
                     * @return {Ext.dom.Element} this
                     * @deprecated 4.2.0 Use {@link #setLocalXY} instead
                     */
                    setLeftTop: function(left, top) {
                        var me = this,
                            style = me.dom.style;

                        style.left = Element.addUnits(left);
                        style.top = Element.addUnits(top);

                        return me;
                    },

                    /**
                     * Sets the position of the element in page coordinates.
                     * @param {Number} x X value for new position
                     * @param {Number} y Y value for new position
                     * @param {Boolean/Object} [animate] True for the default animation, or a standard
                     * Element animation config object
                     * @return {Ext.dom.Element} this
                     * @deprecated 4.2.0 Use {@link #setXY} instead.
                     */
                    setLocation: function(x, y, animate) {
                        return this.setXY([x, y], animate);
                    }
                }
            },
            '5.0': {
                methods: {
                    /**
                     * Returns the value of a namespaced attribute from the element's underlying DOM node.
                     * @param {String} namespace The namespace in which to look for the attribute
                     * @param {String} name The attribute name
                     * @return {String} The attribute value
                     * @deprecated 5.0.0 Please use {@link #getAttribute} instead.
                     */
                    getAttributeNS: function(namespace, name) {
                        return this.getAttribute(name, namespace);
                    },

                    /**
                     * Calculates the x, y to center this element on the screen
                     * @return {Number[]} The x, y values [x, y]
                     * @deprecated 5.0.0
                     */
                    getCenterXY: function(){
                        return this.getAlignToXY(DOC, 'c-c');
                    },

                    /**
                     * Returns either the offsetHeight or the height of this element based on CSS height adjusted by padding or borders
                     * when needed to simulate offsetHeight when offsets aren't available. This may not work on display:none elements
                     * if a height has not been set using CSS.
                     * @return {Number}
                     * @deprecated 5.0.0
                     */
                    getComputedHeight: function() {
                        return Math.max(this.dom.offsetHeight, this.dom.clientHeight) ||
                            parseFloat(this.getStyle(HEIGHT)) || 0;
                    },

                    /**
                     * Returns either the offsetWidth or the width of this element based on CSS width adjusted by padding or borders
                     * when needed to simulate offsetWidth when offsets aren't available. This may not work on display:none elements
                     * if a width has not been set using CSS.
                     * @return {Number}
                     * @deprecated 5.0.0
                     */
                    getComputedWidth: function() {
                        return Math.max(this.dom.offsetWidth, this.dom.clientWidth) ||
                            parseFloat(this.getStyle(WIDTH)) || 0;
                    },

                    /**
                     * Returns the dimensions of the element available to lay content out in.
                     *
                     * getStyleSize utilizes prefers style sizing if present, otherwise it chooses the larger of offsetHeight/clientHeight and
                     * offsetWidth/clientWidth. To obtain the size excluding scrollbars, use getViewSize.
                     *
                     * Sizing of the document body is handled at the adapter level which handles special cases for IE and strict modes, etc.
                     *
                     * @return {Object} Object describing width and height.
                     * @return {Number} return.width
                     * @return {Number} return.height
                     * @deprecated 5.0.0
                     */
                    getStyleSize: function() {
                        var me = this,
                            d = this.dom,
                            isDoc = (d === DOC || d === DOC.body),
                            s,
                            w, h;

                        // If the body, use static methods
                        if (isDoc) {
                            return {
                                width : Element.getViewportWidth(),
                                height : Element.getViewportHeight()
                            };
                        }

                        s = me.getStyle(['height', 'width'], true);  //seek inline
                        // Use Styles if they are set
                        if (s.width && s.width !== 'auto') {
                            w = parseFloat(s.width);
                        }
                        // Use Styles if they are set
                        if (s.height && s.height !== 'auto') {
                            h = parseFloat(s.height);
                        }
                        // Use getWidth/getHeight if style not set.
                        return {width: w || me.getWidth(true), height: h || me.getHeight(true)};
                    },


                    /**
                     * Returns true if this element uses the border-box-sizing model.  This method is
                     * deprecated as of version 5.0 because border-box sizing is forced upon all elements
                     * via a stylesheet rule, and the browsers that do not support border-box (IE6/7 strict
                     * mode) are no longer supported.
                     * @deprecated 5.0.0 
                     * @return {Boolean}
                     */
                    isBorderBox: function() {
                        return true;
                    },

                    /**
                     * Returns true if display is not "none"
                     * @return {Boolean}
                     * @deprecated 5.0.0 use element.isStyle('display', 'none');
                     */
                    isDisplayed: function() {
                        return !this.isStyle('display', 'none');
                    },

                    /**
                     * Checks whether this element can be focused.
                     * @return {Boolean} True if the element is focusable
                     * @deprecated 5.0.0 use {@link #isFocusable} instead
                     */
                    focusable: 'isFocusable'
                }
            }
        }
    };
})(), function() {
    var Element = Ext.dom.Element,
        proto = Element.prototype,
        useDocForId = !Ext.isIE8,
        DOC = document,
        view = DOC.defaultView,
        opacityRe = /alpha\(opacity=(.*)\)/i,
        trimRe = /^\s+|\s+$/g,
        styleHooks = proto.styleHooks,
        supports = Ext.supports,
        touchScroll = 0,
        removeNode, garbageBin, verticalStyleHooks90, verticalStyleHooks270, edges, k,
        edge, borderWidth;

    proto._init(Element);
    delete proto._init;
    // Alias for addListener
    Element.on = Element.addListener;

    // TODO: move touch scroller detection elsewhere
    if (Ext.os.is.iOS || Ext.os.is.Android) {
        touchScroll = 2
    } else if (navigator.msMaxTouchPoints ||
            (Ext.isWebKit && supports.TouchEvents && Ext.os.is.Desktop)) {
        touchScroll = 1;
    }
    /**
     * @class Ext.supports
     */
    Ext.apply(supports, {
        /**
         * @property {Number} touchScroll
         * This property is used to trigger touch scrolling support via Ext.scroll.Manager.
         * There are two valid values for this property:
         *
         * - `0` - Touch scrolling disabled.
         *
         * - `1` - enables partial scroller support.  In this mode the touch scroller
         * simply controls the scroll positions of naturally overflowing elements.
         * This mode is typically used on multi-input devices where native scrolling
         * using the mouse is desired, but native touch-scrolling must be disabled to
         * avoid cancelling gesture recognition inside of scrollable elements (e.g.
         * IE10 and up on touch-screen laptops and tablets)
         *
         * - `2` - enables full scroller support.  In this mode, scrolling is entirely
         * "virtual", that is natural browser scrolling of elements is disabled
         * (overflow: hidden) and the contents of scrollable elements are wrapped in a
         * "scrolllerEl"`.  Scrolling is simulated by translating the scrollerEl using
         * CSS, and {@link Ext.scroll.Indicator scroll indicators} will be shown while
         * scrolling since there are no native scrollbars in this mode.
         * @private
         */
        touchScroll: touchScroll
    });

    Ext.plainTableCls = Ext.baseCSSPrefix + 'table-plain';
    Ext.plainListCls = Ext.baseCSSPrefix + 'list-plain';

    // ensure that any methods added by this override are also added to Ext.CompositeElementLite
    if (Ext.CompositeElementLite) {
        Ext.CompositeElementLite.importElementMethods();
    }


    styleHooks.opacity = {
        name: 'opacity',
        afterSet: function(dom, value, el) {
            if (el.isLayer) {
                el.onOpacitySet(value);
            }
        }
    };
    if (!supports.Opacity && Ext.isIE) {
        Ext.apply(styleHooks.opacity, {
            get: function (dom) {
                var filter = dom.style.filter,
                    match, opacity;
                if (filter.match) {
                    match = filter.match(opacityRe);
                    if (match) {
                        opacity = parseFloat(match[1]);
                        if (!isNaN(opacity)) {
                            return opacity ? opacity / 100 : 0;
                        }
                    }
                }
                return 1;
            },
            set: function (dom, value) {
                var style = dom.style,
                    val = style.filter.replace(opacityRe, '').replace(trimRe, '');

                style.zoom = 1; // ensure dom.hasLayout

                // value can be a number or '' or null... so treat falsey as no opacity
                if (typeof(value) === 'number' && value >= 0 && value < 1) {
                    value *= 100;
                    style.filter = val + (val.length ? ' ' : '') + 'alpha(opacity='+value+')';
                } else {
                    style.filter = val;
                }
            }  
        });
    }
    
    if (!supports.matchesSelector) {
        // Match basic tagName.ClassName selector syntax for is implementation
        var simpleSelectorRe = /^([a-z]+|\*)?(?:\.([a-z][a-z\-_0-9]*))?$/i,
            dashRe = /\-/g,
            fragment,
            classMatcher = function (tag, cls) {
                var classRe = new RegExp('(?:^|\\s+)' +cls.replace(dashRe, '\\-') + '(?:\\s+|$)');
                if (tag && tag !== '*') {
                    tag = tag.toUpperCase();
                    return function (el) {
                        return el.tagName === tag && classRe.test(el.className);
                    };
                }
                return function (el) {
                    return classRe.test(el.className);
                };
            },
            tagMatcher = function (tag) {
                tag = tag.toUpperCase();
                return function (el) {
                    return el.tagName === tag;
                };
            },
            cache = {};

        proto.matcherCache = cache;
        proto.is = function(selector) {
            // Empty selector always matches
            if (!selector) {
                return true;
            }

            var dom = this.dom,
                cls, match, testFn, root, isOrphan, is, tag;

            // Only Element node types can be matched.
            if (dom.nodeType !== 1) {
                return false;
            }

            if (!(testFn = Ext.isFunction(selector) ? selector : cache[selector])) {
                if (!(match = selector.match(simpleSelectorRe))) {
                    // Not a simple tagName.className selector, do it the hard way
                    root = dom.parentNode;

                    if (!root) {
                        isOrphan = true;
                        root = fragment || (fragment = DOC.createDocumentFragment());
                        fragment.appendChild(dom);
                    }

                    is = Ext.Array.indexOf(Ext.fly(root, '_is').query(selector), dom) !== -1;

                    if (isOrphan) {
                        fragment.removeChild(dom);
                    }
                    return is;
                }

                tag = match[1];
                cls = match[2];
                cache[selector] = testFn = cls ? classMatcher(tag, cls) : tagMatcher(tag);
            }

            return testFn(dom);
        };
    }

    // IE8 needs its own implementation of getStyle because it doesn't support getComputedStyle
    if (!view || !view.getComputedStyle) {
        proto.getStyle = function (property, inline) {
            var me = this,
                dom = me.dom,
                multiple = typeof property !== 'string',
                prop = property,
                props = prop,
                len = 1,
                isInline = inline,
                styleHooks = me.styleHooks,
                camel, domStyle, values, hook, out, style, i;

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
                style = dom.currentStyle;

                // fallback to inline style if rendering context not available
                if (!style) {
                    isInline = true;
                    style = domStyle;
                }
            }

            do {
                hook = styleHooks[prop];

                if (!hook) {
                    styleHooks[prop] = hook = { name: Element.normalize(prop) };
                }

                if (hook.get) {
                    out = hook.get(dom, me, isInline, style);
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
        };
    }

    // override getStyle for border-*-width
    if (Ext.isIE8) {
        function getBorderWidth (dom, el, inline, style) {
            if (style[this.styleName] === 'none') {
                return '0px';
            }
            return style[this.name];
        }

        edges = ['Top','Right','Bottom','Left'];
        k = edges.length;

        while (k--) {
            edge = edges[k];
            borderWidth = 'border' + edge + 'Width';

            styleHooks['border-'+edge.toLowerCase()+'-width'] = styleHooks[borderWidth] = {
                name: borderWidth,
                styleName: 'border' + edge + 'Style',
                get: getBorderWidth
            };
        }
    }

    Ext.apply(Ext, {
        /**
         * `true` to automatically uncache orphaned Ext.Elements periodically. If set to
         * `false`, the application will be required to clean up orpaned Ext.Elements and
         * it's listeners as to not cause memory leakage.
         * @member Ext
         */
        enableGarbageCollector: true,

        // In sencha v5 isBorderBox is no longer needed since all supported browsers
        // suppport border-box, but it is hard coded to true for backward compatibility
        isBorderBox: true,

        /**
         * @private
         * Returns an HTML div element into which {@link Ext.container.Container#method-remove removed} components
         * are placed so that their DOM elements are not garbage collected as detached Dom trees.
         * @returns {Ext.dom.Element}
         * @member Ext
         */
        getDetachedBody: function () {
            var detachedEl = Ext.detachedBodyEl;

            if (!detachedEl) {
                detachedEl = DOC.createElement('div');
                Ext.detachedBodyEl = detachedEl = new Ext.dom.Fly(detachedEl);
                detachedEl.isDetachedBody = true;
            }

            return detachedEl;
        },

        getElementById: function (id) {
            var el = DOC.getElementById(id),
                detachedBodyEl;

            if (!el && (detachedBodyEl = Ext.detachedBodyEl)) {
                el = detachedBodyEl.dom.querySelector(Ext.makeIdSelector(id));
            }

            return el;
        },

        /**
         * Applies event listeners to elements by selectors when the document is ready.
         * The event name is specified with an `@` suffix.
         *
         *     Ext.addBehaviors({
         *         // add a listener for click on all anchors in element with id foo
         *         '#foo a@click': function(e, t){
         *             // do something
         *         },
         *
         *         // add the same listener to multiple selectors (separated by comma BEFORE the @)
         *         '#foo a, #bar span.some-class@mouseover': function(){
         *             // do something
         *         }
         *     });
         *
         * @param {Object} obj The list of behaviors to apply
         */
        addBehaviors: function(o){
            if(!Ext.isReady){
                Ext.onReady(function(){
                    Ext.addBehaviors(o);
                });
            } else {
                var cache = {}, // simple cache for applying multiple behaviors to same selector does query multiple times
                    parts,
                    b,
                    s;
                for (b in o) {
                    if ((parts = b.split('@'))[1]) { // for Object prototype breakers
                        s = parts[0];
                        if(!cache[s]){
                            cache[s] = Ext.fly(document).select(s, true);
                        }
                        cache[s].on(parts[1], o[b]);
                    }
                }
                cache = null;
            }
        }
    });

    if (Ext.isIE8) {
        // save a reference to the removeNode function defined in sencha-core
        removeNode = Ext.removeNode;
        Ext.removeNode = function(node) {
            removeNode(node);
            // prevent memory leaks in IE8
            // see http://social.msdn.microsoft.com/Forums/ie/en-US/c76967f0-dcf8-47d0-8984-8fe1282a94f5/ie-appendchildremovechild-memory-problem?forum=iewebdevelopment
            garbageBin = garbageBin || DOC.createElement('div');
            garbageBin.appendChild(node);
            garbageBin.innerHTML = '';
        };
    }

    if (Ext.isIE9m) {
        Ext.getElementById = function (id) {
            var el = DOC.getElementById(id),
                detachedBodyEl;

            if (!el && (detachedBodyEl = Ext.detachedBodyEl)) {
                el = detachedBodyEl.dom.all[id];
            }

            return el;
        };

        proto.getById = function (id, asDom) {
            var dom = this.dom,
                ret = null,
                entry, el;

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
                        entry = Ext.cache[id];
                        if (entry) {
                            if (entry.skipGarbageCollection || !Ext.isGarbage(entry.dom)) {
                                ret = entry;
                            } else {
                                //<debug>
                                Ext.Error.raise("Stale Element with id '" + el.id +
                                    "' found in Element cache. " +
                                    "Make sure to clean up Element instances using destroy()" );
                                //</debug>
                                entry.destroy();
                            }
                        }
                        ret = ret || new Ext.Element(el)
                    }
                }
            }

            return ret;
        };
    } else if (!DOC.querySelector) {
        Ext.getDetachedBody = Ext.getBody;

        Ext.getElementById = function (id) {
            return DOC.getElementById(id);
        };

        proto.getById = function (id, asDom) {
            var dom = DOC.getElementById(id);
            return asDom ? dom : (dom ? Ext.get(dom) : null);
        };
    }

    if (Ext.isIE && !(Ext.isIE9p && DOC.documentMode >= 9)) {
        // Essentially all web browsers (Firefox, Internet Explorer, recent versions of Opera, Safari, Konqueror, and iCab,
        // as a non-exhaustive list) return null when the specified attribute does not exist on the specified element.
        // The DOM specification says that the correct return value in this case is actually the empty string, and some
        // DOM implementations implement this behavior. The implementation of getAttribute in XUL (Gecko) actually follows
        // the specification and returns an empty string. Consequently, you should use hasAttribute to check for an attribute's
        // existence prior to calling getAttribute() if it is possible that the requested attribute does not exist on the specified element.
        //
        // https://developer.mozilla.org/en-US/docs/DOM/element.getAttribute
        // http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-745549614
        proto.getAttribute = function(name, ns) {
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
        };
    }

    Ext.onReady(function () {
        var transparentRe = /^(?:transparent|(?:rgba[(](?:\s*\d+\s*[,]){3}\s*0\s*[)]))$/i,
            bodyCls = [],
            //htmlCls = [],
            origSetWidth = proto.setWidth,
            origSetHeight = proto.setHeight,
            origSetSize = proto.setSize,
            pxRe = /^\d+(?:\.\d*)?px$/i,
            colorStyles, i, name, camel;

        if (supports.FixedTableWidthBug) {
            // EXTJSIV-12665
            // https://bugs.webkit.org/show_bug.cgi?id=130239
            // Webkit browsers fail to layout correctly when a form field's width is less
            // than the min-width of the body element.  The only way to fix it seems to be
            // to toggle the display style of the field's element before and after setting
            // the width. Note: once the bug has been corrected by toggling the element's
            // display, successive calls to setWidth will work without the hack.  It's only
            // when going from naturally widthed to having an explicit width that the bug
            // occurs.
            styleHooks.width = {
                name: 'width',
                set: function(dom, value, el) {
                    var style = dom.style,
                        needsFix = el._needsTableWidthFix,
                        origDisplay = style.display;

                    if (needsFix) {
                        style.display = 'none';
                    }

                    style.width = value;

                    if (needsFix) {
                        dom.scrollWidth; // repaint
                        style.display = origDisplay;
                    }
                }
            };
            proto.setWidth = function(width, animate) {
                var me = this,
                    dom = me.dom,
                    style = dom.style,
                    needsFix = me._needsTableWidthFix,
                    origDisplay = style.display;

                if (needsFix && !animate) {
                    style.display = 'none';
                }

                origSetWidth.call(me, width, animate);

                if (needsFix && !animate) {
                    dom.scrollWidth; // repaint
                    style.display = origDisplay;
                }
                return me;
            };
            proto.setSize = function(width, height, animate) {
                var me = this,
                    dom = me.dom,
                    style = dom.style,
                    needsFix = me._needsTableWidthFix,
                    origDisplay = style.display;

                if (needsFix && !animate) {
                    style.display = 'none';
                }

                origSetSize.call(me, width, height, animate);

                if (needsFix && !animate) {
                    dom.scrollWidth; // repaint
                    style.display = origDisplay;
                }
                return me;
            };
        }

        //<feature legacyBrowser>
        if (Ext.isIE8) {
            styleHooks.height = {
                name: 'height',
                set: function(dom, value, el) {
                    var component = el.component,
                        frameInfo, frameBodyStyle;

                    if (component && component._syncFrameHeight && this === component.el) {
                        frameBodyStyle = component.frameBody.dom.style;
                        if (pxRe.test(value)) {
                            frameInfo = component.getFrameInfo();
                            if (frameInfo) {
                                frameBodyStyle.height = (parseInt(value, 10) - frameInfo.height) + 'px';
                            }
                        } else if (!value || value === 'auto') {
                            frameBodyStyle.height = '';
                        }
                    }

                    dom.style.height = value;
                }
            };

            proto.setHeight = function(height, animate) {
                var component = this.component,
                    frameInfo, frameBodyStyle;

                if (component && component._syncFrameHeight && this === component.el) {
                    frameBodyStyle = component.frameBody.dom.style;
                    if (!height || height === 'auto') {
                        frameBodyStyle.height = '';
                    } else {
                        frameInfo = component.getFrameInfo();
                        if (frameInfo) {
                            frameBodyStyle.height = (height - frameInfo.height) + 'px';
                        }
                    }
                }

                return origSetHeight.call(this, height, animate);
            };

            proto.setSize = function(width, height, animate) {
                var component = this.component,
                    frameInfo, frameBodyStyle;

                if (component && component._syncFrameHeight && this === component.el) {
                    frameBodyStyle = component.frameBody.dom.style;
                    if (!height || height === 'auto') {
                        frameBodyStyle.height = '';
                    } else {
                        frameInfo = component.getFrameInfo();
                        if (frameInfo) {
                            frameBodyStyle.height = (height - frameInfo.height) + 'px';
                        }
                    }
                }

                return origSetSize.call(this, width, height, animate);
            };
        }
        //</feature>

        // Element.unselectable relies on this listener to prevent selection in IE. Some other browsers support the event too
        // but it is only strictly required for IE. In WebKit this listener causes subtle differences to how the browser handles
        // the non-selection, e.g. whether or not the mouse cursor changes when attempting to select text.
        Ext.getDoc().on('selectstart', function(ev, dom) {
            var selectableCls = Element.selectableCls,
                unselectableCls = Element.unselectableCls,
                tagName = dom && dom.tagName;

            tagName = tagName && tagName.toLowerCase();

            // Element.unselectable is not really intended to handle selection within text fields and it is important that
            // fields inside menus or panel headers don't inherit the unselectability. In most browsers this is automatic but in
            // IE 9 the selectstart event can bubble up from text fields so we have to explicitly handle that case.
            if (tagName === 'input' || tagName === 'textarea') {
                return;
            }

            // Walk up the DOM checking the nodes. This may be 'slow' but selectstart events don't fire very often
            while (dom && dom.nodeType === 1 && dom !== DOC.documentElement) {
                var el = Ext.fly(dom);

                // If the node has the class x-selectable then stop looking, the text selection is allowed
                if (el.hasCls(selectableCls)) {
                    return;
                }

                // If the node has class x-unselectable then the text selection needs to be stopped
                if (el.hasCls(unselectableCls)) {
                    ev.stopEvent();
                    return;
                }

                dom = dom.parentNode;
            }
        });

        function fixTransparent (dom, el, inline, style) {
            var value = style[this.name] || '';
            return transparentRe.test(value) ? 'transparent' : value;
        }

        /*
         * Helper function to create the function that will restore the selection.
         */
        function makeSelectionRestoreFn (activeEl, start, end) {
            return function () {
                activeEl.selectionStart = start;
                activeEl.selectionEnd = end;
            };
        }

        /**
         * Creates a function to call to clean up problems with the work-around for the
         * WebKit RightMargin bug. The work-around is to add "display: 'inline-block'" to
         * the element before calling getComputedStyle and then to restore its original
         * display value. The problem with this is that it corrupts the selection of an
         * INPUT or TEXTAREA element (as in the "I-beam" goes away but ths focus remains).
         * To cleanup after this, we need to capture the selection of any such element and
         * then restore it after we have restored the display style.
         *
         * @param {HTMLElement} target The top-most element being adjusted.
         * @private
         */
        function getRightMarginFixCleaner(target) {
            var hasInputBug = supports.DisplayChangeInputSelectionBug,
                hasTextAreaBug = supports.DisplayChangeTextAreaSelectionBug,
                activeEl, tag, start, end; 

            if (hasInputBug || hasTextAreaBug) {
                activeEl = Element.getActiveElement();
                tag = activeEl && activeEl.tagName;

                if ((hasTextAreaBug && tag === 'TEXTAREA') ||
                    (hasInputBug && tag === 'INPUT' && activeEl.type === 'text')) {
                    if (Ext.fly(target).isAncestor(activeEl)) {
                        start = activeEl.selectionStart;
                        end = activeEl.selectionEnd;

                        if (Ext.isNumber(start) && Ext.isNumber(end)) { // to be safe...
                            // We don't create the raw closure here inline because that
                            // will be costly even if we don't want to return it (nested
                            // function decls and exprs are often instantiated on entry
                            // regardless of whether execution ever reaches them):
                            return makeSelectionRestoreFn(activeEl, start, end);
                        }
                    }
                }
            }

            return Ext.emptyFn; // avoid special cases, just return a nop
        }

        function fixRightMargin (dom, el, inline, style) {
            var result = style.marginRight,
                domStyle, display;

            // Ignore cases when the margin is correctly reported as 0, the bug only shows
            // numbers larger.
            if (result !== '0px') {
                domStyle = dom.style;
                display = domStyle.display;
                domStyle.display = 'inline-block';
                result = (inline ? style : dom.ownerDocument.defaultView.getComputedStyle(dom, null)).marginRight;
                domStyle.display = display;
            }

            return result;
        }

        function fixRightMarginAndInputFocus (dom, el, inline, style) {
            var result = style.marginRight,
                domStyle, cleaner, display;

            if (result !== '0px') {
                domStyle = dom.style;
                cleaner = getRightMarginFixCleaner(dom);
                display = domStyle.display;
                domStyle.display = 'inline-block';
                result = (inline ? style : dom.ownerDocument.defaultView.getComputedStyle(dom, '')).marginRight;
                domStyle.display = display;
                cleaner();
            }

            return result;
        }

        // Fix bug caused by this: https://bugs.webkit.org/show_bug.cgi?id=13343
        if (!supports.RightMargin) {
            styleHooks.marginRight = styleHooks['margin-right'] = {
                name: 'marginRight',
                // TODO - Touch should use conditional compilation here or ensure that the
                //      underlying Ext.supports flags are set correctly...
                get: (supports.DisplayChangeInputSelectionBug || supports.DisplayChangeTextAreaSelectionBug) ?
                    fixRightMarginAndInputFocus : fixRightMargin
            };
        }

        if (!supports.TransparentColor) {
            colorStyles = ['background-color', 'border-color', 'color', 'outline-color'];
            for (i = colorStyles.length; i--; ) {
                name = colorStyles[i];
                camel = Element.normalize(name);

                styleHooks[name] = styleHooks[camel] = {
                    name: camel,
                    get: fixTransparent
                };
            }
        }

        // When elements are rotated 80 or 270 degrees, their border, margin and padding hooks
        // need to be rotated as well.
        proto.verticalStyleHooks90 = verticalStyleHooks90 = Ext.Object.chain(styleHooks);
        proto.verticalStyleHooks270 = verticalStyleHooks270 = Ext.Object.chain(styleHooks);

        verticalStyleHooks90.width = styleHooks.height || { name: 'height' };
        verticalStyleHooks90.height = styleHooks.width || { name: 'width' };
        verticalStyleHooks90['margin-top'] = { name: 'marginLeft' };
        verticalStyleHooks90['margin-right'] = { name: 'marginTop' };
        verticalStyleHooks90['margin-bottom'] = { name: 'marginRight' };
        verticalStyleHooks90['margin-left'] = { name: 'marginBottom' };
        verticalStyleHooks90['padding-top'] = { name: 'paddingLeft' };
        verticalStyleHooks90['padding-right'] = { name: 'paddingTop' };
        verticalStyleHooks90['padding-bottom'] = { name: 'paddingRight' };
        verticalStyleHooks90['padding-left'] = { name: 'paddingBottom' };
        verticalStyleHooks90['border-top'] = { name: 'borderLeft' };
        verticalStyleHooks90['border-right'] = { name: 'borderTop' };
        verticalStyleHooks90['border-bottom'] = { name: 'borderRight' };
        verticalStyleHooks90['border-left'] = { name: 'borderBottom' };

        verticalStyleHooks270.width = styleHooks.height || { name: 'height' };
        verticalStyleHooks270.height = styleHooks.width || { name: 'width' };
        verticalStyleHooks270['margin-top'] = { name: 'marginRight' };
        verticalStyleHooks270['margin-right'] = { name: 'marginBottom' };
        verticalStyleHooks270['margin-bottom'] = { name: 'marginLeft' };
        verticalStyleHooks270['margin-left'] = { name: 'marginTop' };
        verticalStyleHooks270['padding-top'] = { name: 'paddingRight' };
        verticalStyleHooks270['padding-right'] = { name: 'paddingBottom' };
        verticalStyleHooks270['padding-bottom'] = { name: 'paddingLeft' };
        verticalStyleHooks270['padding-left'] = { name: 'paddingTop' };
        verticalStyleHooks270['border-top'] = { name: 'borderRight' };
        verticalStyleHooks270['border-right'] = { name: 'borderBottom' };
        verticalStyleHooks270['border-bottom'] = { name: 'borderLeft' };
        verticalStyleHooks270['border-left'] = { name: 'borderTop' };

        /**
         * @property {Boolean} scopeCss
         * @member Ext
         * Set this to true before onReady to prevent any styling from being added to
         * the body element.  By default a few styles such as font-family, and color
         * are added to the body element via a "x-body" class.  When this is set to
         * `true` the "x-body" class is not added to the body element, but is added
         * to the elements of root-level containers instead.
         */
        if (!Ext.scopeCss) {
            bodyCls.push(Ext.baseCSSPrefix + 'body');
        }

        if (supports.Touch) {
            bodyCls.push(Ext.baseCSSPrefix + 'touch');
        }

        if (Ext.isIE && Ext.isIE9m) {
            bodyCls.push(Ext.baseCSSPrefix + 'ie',
                         Ext.baseCSSPrefix + 'ie9m');

            // very often CSS needs to do checks like "IE7+" or "IE6 or 7". To help
            // reduce the clutter (since CSS/SCSS cannot do these tests), we add some
            // additional classes:
            //
            //      x-ie7p      : IE7+      :  7 <= ieVer
            //      x-ie7m      : IE7-      :  ieVer <= 7
            //      x-ie8p      : IE8+      :  8 <= ieVer
            //      x-ie8m      : IE8-      :  ieVer <= 8
            //      x-ie9p      : IE9+      :  9 <= ieVer
            //      x-ie78      : IE7 or 8  :  7 <= ieVer <= 8
            //
            bodyCls.push(Ext.baseCSSPrefix + 'ie8p');

            if (Ext.isIE8) {
                bodyCls.push(Ext.baseCSSPrefix + 'ie8');
            } else {
                bodyCls.push(Ext.baseCSSPrefix + 'ie9',
                             Ext.baseCSSPrefix + 'ie9p');
            }

            if (Ext.isIE8m) {
                bodyCls.push(Ext.baseCSSPrefix + 'ie8m');
            }
        }

        if (Ext.isIE10) {
            bodyCls.push(Ext.baseCSSPrefix + 'ie10');
        }

        if (Ext.isGecko) {
            bodyCls.push(Ext.baseCSSPrefix + 'gecko');
        }
        if (Ext.isOpera) {
            bodyCls.push(Ext.baseCSSPrefix + 'opera');
        }
        if (Ext.isOpera12m) {
            bodyCls.push(Ext.baseCSSPrefix + 'opera12m');
        }
        if (Ext.isWebKit) {
            bodyCls.push(Ext.baseCSSPrefix + 'webkit');
        }
        if (Ext.isSafari) {
            bodyCls.push(Ext.baseCSSPrefix + 'safari');
        }
        if (Ext.isChrome) {
            bodyCls.push(Ext.baseCSSPrefix + 'chrome');
        }
        if (Ext.isMac) {
            bodyCls.push(Ext.baseCSSPrefix + 'mac');
        }
        if (Ext.isLinux) {
            bodyCls.push(Ext.baseCSSPrefix + 'linux');
        }
        if (!supports.CSS3BorderRadius) {
            bodyCls.push(Ext.baseCSSPrefix + 'nbr');
        }
        if (!supports.CSS3LinearGradient) {
            bodyCls.push(Ext.baseCSSPrefix + 'nlg');
        }
        if (supports.Touch) {
            bodyCls.push(Ext.baseCSSPrefix + 'touch');
        }
        //Ext.fly(document.documentElement).addCls(htmlCls);

        Ext.getBody().addCls(bodyCls);
    }, null, { priority: 1500 }); // onReady
});
