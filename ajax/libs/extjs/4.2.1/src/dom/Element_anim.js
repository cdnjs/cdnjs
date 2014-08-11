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
/* ================================
 * A Note About Wrapped Animations
 * ================================
 * A few of the effects below implement two different animations per effect, one wrapping
 * animation that performs the visual effect and a "no-op" animation on this Element where
 * no attributes of the element itself actually change. The purpose for this is that the
 * wrapper is required for the effect to work and so it does the actual animation work, but
 * we always animate `this` so that the element's events and callbacks work as expected to
 * the callers of this API.
 * 
 * Because of this, we always want each wrap animation to complete first (we don't want to
 * cut off the visual effect early). To ensure that, we arbitrarily increase the duration of
 * the element's no-op animation, also ensuring that it has a decent minimum value -- on slow
 * systems, too-low durations can cause race conditions between the wrap animation and the
 * element animation being removed out of order. Note that in each wrap's `afteranimate`
 * callback it will explicitly terminate the element animation as soon as the wrap is complete,
 * so there's no real danger in making the duration too long.
 * 
 * This applies to all effects that get wrapped, including slideIn, slideOut, switchOff and frame.
 */

/**
 */
Ext.define('Ext.dom.Element_anim', {
    override: 'Ext.dom.Element',

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
            listeners,
            anim,
            animId = me.dom.id || Ext.id(me.dom);

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
            anim = new Ext.fx.Anim(me.anim(config));
            if (listeners) {
                anim.on(listeners);
            }
            Ext.fx.Manager.queueFx(anim);
        }
        return me;
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

            originalStyles = el.getStyles('width', 'height', 'left', 'right', 'top', 'bottom', 'position', 'z-index', true);
            el.setSize(box.width, box.height);

            // Cache all descendants' scrollTop & scrollLeft values if configured to preserve scroll.
            if (obj.preserveScroll) {
                restoreScroll = el.cacheScrollValues();
            }

            wrap = el.wrap({
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
                    wrap.remove();
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
            originalStyles = me.getStyles('width', 'height', 'left', 'right', 'top', 'bottom', 'position', 'z-index', 'font-size', 'opacity', true);

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
    frame : function(color, count, obj){
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
                proxy.remove();
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

        // Cannot set bckground-color on table elements. Find div elements to highlight.
        if (dom.tagName.match(me.tableTagRe)) {
            return me.select('div').highlight(color, o);
        }

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
                    return fn.apply(event.scope || lns.scope || window, arguments);
                }
            },
            afteranimate: function() {
                if (dom) {
                    dom.style[attr] = restore;
                }

                event = lns.afteranimate;
                if (event) {
                    fn = event.fn || event;
                    fn.apply(event.scope || lns.scope || window, arguments);
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
    * Creates a pause before any subsequent queued effects begin. If there are no effects queued after the pause it will
    * have no effect. Usage:
    *
    *     el.pause(1);
    *
    * @deprecated 4.0 Use the `delay` config to {@link #animate} instead.
    * @param {Number} seconds The length of time to pause (in seconds)
    * @return {Ext.Element} The Element
    */
    pause: function(ms) {
        var me = this;
        Ext.fx.Manager.setFxDefaults(me.id, {
            delay: ms
        });
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
     * @return {Ext.Element} The Element
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
     * @return {Ext.Element} The Element
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
     * @return {Ext.Element} The Element
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
     * @return {Ext.Element} The Element
     */
    shift: function(config) {
        this.animate(config);
        return this;
    },

    /**
     * @private
     */
    anchorAnimX: function(anchor) {
        var xName = (anchor === 'l') ? 'right' : 'left';
        this.dom.style[xName] = '0px';
    }
});
