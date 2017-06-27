YUI.add('transition-native', function(Y) {

/**
* Provides the transition method for Node.
* Transition has no API of its own, but adds the transition method to Node.
*
* @module transition
* @requires node-style
*/

var TRANSITION = '-webkit-transition',
    TRANSITION_CAMEL = 'WebkitTransition',
    TRANSITION_PROPERTY_CAMEL = 'WebkitTransitionProperty',
    TRANSITION_PROPERTY = '-webkit-transition-property',
    TRANSITION_DURATION = '-webkit-transition-duration',
    TRANSITION_TIMING_FUNCTION = '-webkit-transition-timing-function',
    TRANSITION_DELAY = '-webkit-transition-delay',
    TRANSITION_END = 'webkitTransitionEnd',
    ON_TRANSITION_END = 'onwebkittransitionend',
    TRANSFORM_CAMEL = 'WebkitTransform',

    EMPTY_OBJ = {},

/**
 * A class for constructing transition instances.
 * Adds the "transition" method to Node.
 * @class Transition
 * @constructor
 */

Transition = function() {
    this.init.apply(this, arguments);
};

Transition.fx = {};
Transition.toggles = {};

Transition._hasEnd = {};

Transition._toCamel = function(property) {
    property = property.replace(/-([a-z])/gi, function(m0, m1) {
        return m1.toUpperCase();
    });

    return property;
};

Transition._toHyphen = function(property) {
    property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {
        var str = '';
        if (m1) {
            str += '-' + m1.toLowerCase();
        }
        str += m2;
        
        if (m3) {
            str += '-' + m3.toLowerCase();
        }

        return str;
    }); 

    return property;
};


Transition._reKeywords = /^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;

Transition.useNative = false;

if (TRANSITION in Y.config.doc.documentElement.style) {
    Transition.useNative = true;
    Transition.supported = true; // TODO: remove
}

Y.Node.DOM_EVENTS[TRANSITION_END] = 1; 

Transition.NAME = 'transition';

Transition.DEFAULT_EASING = 'ease';
Transition.DEFAULT_DURATION = 0.5;
Transition.DEFAULT_DELAY = 0;

Transition._nodeAttrs = {};

Transition.prototype = {
    constructor: Transition,
    init: function(node, config) {
        var anim = this;
        anim._node = node;
        if (!anim._running && config) {
            anim._config = config;
            node._transition = anim; // cache for reuse

            anim._duration = ('duration' in config) ?
                config.duration: anim.constructor.DEFAULT_DURATION;

            anim._delay = ('delay' in config) ?
                config.delay: anim.constructor.DEFAULT_DELAY;

            anim._easing = config.easing || anim.constructor.DEFAULT_EASING;
            anim._count = 0; // track number of animated properties
            anim._running = false;

        }

        return anim;
    },

    addProperty: function(prop, config) {
        var anim = this,
            node = this._node,
            uid = Y.stamp(node),
            nodeInstance = Y.one(node),
            attrs = Transition._nodeAttrs[uid],
            computed,
            compareVal,
            dur,
            attr,
            val;

        if (!attrs) {
            attrs = Transition._nodeAttrs[uid] = {};
        }

        attr = attrs[prop];

        // might just be a value
        if (config && config.value !== undefined) {
            val = config.value;
        } else if (config !== undefined) {
            val = config; 
            config = EMPTY_OBJ;
        }

        if (typeof val === 'function') {
            val = val.call(nodeInstance, nodeInstance);
        }

        if (attr && attr.transition) {
            // take control if another transition owns this property
            if (attr.transition !== anim) {
                attr.transition._count--; // remapping attr to this transition
            }
        } 

        anim._count++; // properties per transition

        // make 0 async and fire events
        dur = ((typeof config.duration != 'undefined') ? config.duration :
                    anim._duration) || 0.0001;

        attrs[prop] = {
            value: val,
            duration: dur,
            delay: (typeof config.delay != 'undefined') ? config.delay :
                    anim._delay,

            easing: config.easing || anim._easing,

            transition: anim
        };

        // native end event doesnt fire when setting to same value
        // supplementing with timer
        // val may be a string or number (height: 0, etc), but computedStyle is always string
        computed = Y.DOM.getComputedStyle(node, prop);
        compareVal = (typeof val === 'string') ? computed : parseFloat(computed);

        if (Transition.useNative && compareVal === val) {
            setTimeout(function() {
                anim._onNativeEnd.call(node, {
                    propertyName: prop,
                    elapsedTime: dur
                });
            }, dur * 1000);
        }
    },

    removeProperty: function(prop) {
        var anim = this,
            attrs = Transition._nodeAttrs[Y.stamp(anim._node)];

        if (attrs && attrs[prop]) {
            delete attrs[prop];
            anim._count--;
        }

    },

    initAttrs: function(config) {
        var attr,
            node = this._node;

        if (config.transform && !config[TRANSFORM_CAMEL]) {
            config[TRANSFORM_CAMEL] = config.transform;
            delete config.transform; // TODO: copy
        }

        for (attr in config) {
            if (config.hasOwnProperty(attr) && !Transition._reKeywords.test(attr)) {
                this.addProperty(attr, config[attr]);

                // when size is auto or % webkit starts from zero instead of computed 
                // (https://bugs.webkit.org/show_bug.cgi?id=16020)
                // TODO: selective set
                if (node.style[attr] === '') {
                    Y.DOM.setStyle(node, attr, Y.DOM.getComputedStyle(node, attr));
                }
            }
        }
    },

    /**
     * Starts or an animation.
     * @method run
     * @chainable
     * @private
     */    
    run: function(callback) {
        var anim = this,
            node = anim._node,
            config = anim._config,
            data = {
                type: 'transition:start',
                config: config
            };


        if (!anim._running) {
            anim._running = true;

            //anim._node.fire('transition:start', data);

            if (config.on && config.on.start) {
                config.on.start.call(Y.one(node), data);
            }

            anim.initAttrs(anim._config);

            anim._callback = callback;
            anim._start();
        }


        return anim;
    },

    _start: function() {
        this._runNative();
    },

    _prepDur: function(dur) {
        dur = parseFloat(dur);

        return dur + 's';
    },

    _runNative: function(time) {
        var anim = this,
            node = anim._node,
            uid = Y.stamp(node),
            style = node.style,
            computed = getComputedStyle(node),
            attrs = Transition._nodeAttrs[uid],
            cssText = '',
            cssTransition = computed[TRANSITION_PROPERTY],

            transitionText = TRANSITION_PROPERTY + ': ',
            duration = TRANSITION_DURATION + ': ',
            easing = TRANSITION_TIMING_FUNCTION + ': ',
            delay = TRANSITION_DELAY + ': ',
            hyphy,
            attr,
            name;

        // preserve existing transitions
        if (cssTransition !== 'all') {
            transitionText += cssTransition + ',';
            duration += computed[TRANSITION_DURATION] + ',';
            easing += computed[TRANSITION_TIMING_FUNCTION] + ',';
            delay += computed[TRANSITION_DELAY] + ',';

        }

        // run transitions mapped to this instance
        for (name in attrs) {
            hyphy = Transition._toHyphen(name);
            attr = attrs[name];
            if (attrs.hasOwnProperty(name) && attr.transition === anim) {
                if (name in node.style) { // only native styles allowed
                    duration += anim._prepDur(attr.duration) + ',';
                    delay += anim._prepDur(attr.delay) + ',';
                    easing += (attr.easing) + ',';

                    transitionText += hyphy + ',';
                    cssText += hyphy + ': ' + attr.value + '; ';
                } else {
                    this.removeProperty(name);
                }
            }
        }

        transitionText = transitionText.replace(/,$/, ';');
        duration = duration.replace(/,$/, ';');
        easing = easing.replace(/,$/, ';');
        delay = delay.replace(/,$/, ';');

        // only one native end event per node
        if (!Transition._hasEnd[uid]) {
            //anim._detach = Y.on(TRANSITION_END, anim._onNativeEnd, node);
            //node[ON_TRANSITION_END] = anim._onNativeEnd;
            node.addEventListener(TRANSITION_END, anim._onNativeEnd, false);
            Transition._hasEnd[uid] = true;

        }
        
        //setTimeout(function() { // allow updates to apply (size fix, onstart, etc)
            style.cssText += transitionText + duration + easing + delay + cssText;
        //}, 1);

    },

    _end: function(elapsed) {
        var anim = this,
            node = anim._node,
            callback = anim._callback,
            config = anim._config,
            data = {
                type: 'transition:end',
                config: config,
                elapsedTime: elapsed 
            },

            nodeInstance = Y.one(node); 

        anim._running = false;
        anim._callback = null;

        if (node) {
            if (config.on && config.on.end) {
                setTimeout(function() { // IE: allow previous update to finish
                    config.on.end.call(nodeInstance, data);

                    // nested to ensure proper fire order
                    if (callback) {
                        callback.call(nodeInstance, data);
                    }

                }, 1);
            } else if (callback) {
                setTimeout(function() { // IE: allow previous update to finish
                    callback.call(nodeInstance, data);
                }, 1);
            }
            //node.fire('transition:end', data);
        }

    },

    _endNative: function(name) {
        var node = this._node,
            value = node.ownerDocument.defaultView.getComputedStyle(node, '')[TRANSITION_PROPERTY];

        if (typeof value === 'string') {
            value = value.replace(new RegExp('(?:^|,\\s)' + name + ',?'), ',');
            value = value.replace(/^,|,$/, '');
            node.style[TRANSITION_CAMEL] = value;
        }
    },

    _onNativeEnd: function(e) {
        var node = this,
            uid = Y.stamp(node),
            event = e,//e._event,
            name = Transition._toCamel(event.propertyName),
            elapsed = event.elapsedTime,
            attrs = Transition._nodeAttrs[uid],
            attr = attrs[name],
            anim = (attr) ? attr.transition : null,
            data,
            config;

        if (anim) {
            anim.removeProperty(name);
            anim._endNative(name);
            config = anim._config[name];

            data = {
                type: 'propertyEnd',
                propertyName: name,
                elapsedTime: elapsed,
                config: config
            };

            if (config && config.on && config.on.end) {
                config.on.end.call(Y.one(node), data);
            }

            //node.fire('transition:propertyEnd', data);

            if (anim._count <= 0)  { // after propertyEnd fires
                anim._end(elapsed);
            }
        }
    },

    destroy: function() {
        var anim = this;
        /*
        if (anim._detach) {
            anim._detach.detach();
        }
        */
        //anim._node[ON_TRANSITION_END] = null;
        node.removeEventListener(TRANSITION_END, anim._onNativeEnd, false);
        anim._node = null;
    }
};

Y.Transition = Transition;
Y.TransitionNative = Transition; // TODO: remove

/** 
 *   Animate one or more css properties to a given value. Requires the "transition" module.
 *   <pre>example usage:
 *       Y.one('#demo').transition({
 *           duration: 1, // in seconds, default is 0.5
 *           easing: 'ease-out', // default is 'ease'
 *           delay: '1', // delay start for 1 second, default is 0
 *
 *           height: '10px',
 *           width: '10px',
 *
 *           opacity: { // per property
 *               value: 0,
 *               duration: 2,
 *               delay: 2,
 *               easing: 'ease-in'
 *           }
 *       });
 *   </pre>
 *   @for Node
 *   @method transition
 *   @param {Object} config An object containing one or more style properties, a duration and an easing.
 *   @param {Function} callback A function to run after the transition has completed. 
 *   @chainable
*/
Y.Node.prototype.transition = function(name, config, callback) {
    var 
        transitionAttrs = Transition._nodeAttrs[Y.stamp(this._node)],
        anim = (transitionAttrs) ? transitionAttrs.transition || null : null,
        fxConfig,
        prop;
    
    if (typeof name === 'string') { // named effect, pull config from registry
        if (typeof config === 'function') {
            callback = config;
            config = null;
        }

        fxConfig = Transition.fx[name];

        if (config && typeof config !== 'boolean') {
            config = Y.clone(config);

            for (prop in fxConfig) {
                if (fxConfig.hasOwnProperty(prop)) {
                    if (! (prop in config)) {
                        config[prop] = fxConfig[prop]; 
                    }
                }
            }
        } else {
            config = fxConfig;
        }

    } else { // name is a config, config is a callback or undefined
        callback = config;
        config = name;
    }

    if (anim && !anim._running) {
        anim.init(this, config);
    } else {
        anim = new Transition(this._node, config);
    }

    anim.run(callback);
    return this;
};

Y.Node.prototype.show = function(name, config, callback) {
    this._show(); // show prior to transition
    if (name && Y.Transition) {
        if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default
            if (typeof config === 'function') {
                callback = config;
                config = name;
            }
            name = this.SHOW_TRANSITION; 
        }    
        this.transition(name, config, callback);
    }    
    else if (name && !Y.Transition) { Y.log('unable to transition show; missing transition module', 'warn', 'node'); }
    return this;
};

var _wrapCallBack = function(anim, fn, callback) {
    return function() {
        if (fn) {
            fn.call(anim);
        }
        if (callback) {
            callback.apply(anim._node, arguments);
        }
    };
};

Y.Node.prototype.hide = function(name, config, callback) {
    if (name && Y.Transition) {
        if (typeof config === 'function') {
            callback = config;
            config = null;
        }

        callback = _wrapCallBack(this, this._hide, callback); // wrap with existing callback
        if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default
            if (typeof config === 'function') {
                callback = config;
                config = name;
            }
            name = this.HIDE_TRANSITION; 
        }    
        this.transition(name, config, callback);
    } else if (name && !Y.Transition) { Y.log('unable to transition hide; missing transition module', 'warn', 'node'); // end if on nex
    } else {
        this._hide();
    }    
    return this;
}; 

/** 
 *   Animate one or more css properties to a given value. Requires the "transition" module.
 *   <pre>example usage:
 *       Y.all('.demo').transition({
 *           duration: 1, // in seconds, default is 0.5
 *           easing: 'ease-out', // default is 'ease'
 *           delay: '1', // delay start for 1 second, default is 0
 *
 *           height: '10px',
 *           width: '10px',
 *
 *           opacity: { // per property
 *               value: 0,
 *               duration: 2,
 *               delay: 2,
 *               easing: 'ease-in'
 *           }
 *       });
 *   </pre>
 *   @for NodeList
 *   @method transition
 *   @param {Object} config An object containing one or more style properties, a duration and an easing.
 *   @param {Function} callback A function to run after the transition has completed. The callback fires
 *       once per item in the NodeList.
 *   @chainable
*/
Y.NodeList.prototype.transition = function(config, callback) {
    var nodes = this._nodes,
        i = 0,
        node;

    while ((node = nodes[i++])) {
        Y.one(node).transition(config, callback);
    }

    return this;
};

Y.Node.prototype.toggleView = function(name, on, callback) {
    this._toggles = this._toggles || [];
    callback = arguments[arguments.length - 1];

    if (typeof name == 'boolean') { // no transition, just toggle
        on = name;
        name = null;
    }

    name = name || Y.Transition.DEFAULT_TOGGLE;

    if (typeof on == 'undefined' && name in this._toggles) { // reverse current toggle
        on = ! this._toggles[name];
    }

    on = (on) ? 1 : 0;
    if (on) {
        this._show();
    }  else {
        callback = _wrapCallBack(this, this._hide, callback);
    }

    this._toggles[name] = on;
    this.transition(Y.Transition.toggles[name][on], callback);

    return this;
};

Y.NodeList.prototype.toggleView = function(name, on, callback) {
    var nodes = this._nodes,
        i = 0,
        node;

    while ((node = nodes[i++])) {
        Y.one(node).toggleView(name, on, callback);
    }

    return this;
};

Y.mix(Transition.fx, {
    fadeOut: {
        opacity: 0,
        duration: 0.5,
        easing: 'ease-out'
    },

    fadeIn: {
        opacity: 1,
        duration: 0.5,
        easing: 'ease-in'
    },

    sizeOut: {
        height: 0,
        width: 0,
        duration: 0.75,
        easing: 'ease-out'
    },

    sizeIn: {
        height: function(node) {
            return node.get('scrollHeight') + 'px';
        },
        width: function(node) {
            return node.get('scrollWidth') + 'px';
        },
        duration: 0.5,
        easing: 'ease-in',
        
        on: {
            start: function() {
                var overflow = this.getStyle('overflow');
                if (overflow !== 'hidden') { // enable scrollHeight/Width
                    this.setStyle('overflow', 'hidden');
                    this._transitionOverflow = overflow;
                }
            },

            end: function() {
                if (this._transitionOverflow) { // revert overridden value
                    this.setStyle('overflow', this._transitionOverflow);
                    delete this._transitionOverflow;
                }
            }
        } 
    }
});

Y.mix(Transition.toggles, {
    size: ['sizeOut', 'sizeIn'],
    fade: ['fadeOut', 'fadeIn']
});

Transition.DEFAULT_TOGGLE = 'fade';



}, '@VERSION@' ,{requires:['node-base']});
YUI.add('transition-timer', function(Y) {

/*
* The Transition Utility provides an API for creating advanced transitions.
* @module transition
*/

/*
* Provides the base Transition class, for animating numeric properties.
*
* @module transition
* @submodule transition-timer
*/


var Transition = Y.Transition;

Y.mix(Transition.prototype, {
    _start: function() {
        if (Transition.useNative) {
            this._runNative();
        } else {
            this._runTimer();
        }
    },

    _runTimer: function() {
        var anim = this;
        anim._initAttrs();

        Transition._running[Y.stamp(anim)] = anim;
        anim._startTime = new Date();
        Transition._startTimer();
    },

    _endTimer: function() {
        var anim = this;
        delete Transition._running[Y.stamp(anim)];
        anim._startTime = null;
    },

    _runFrame: function() {
        var t = new Date() - this._startTime;
        this._runAttrs(t);
    },

    _runAttrs: function(time) {
        var anim = this,
            node = anim._node,
            config = anim._config,
            uid = Y.stamp(node),
            attrs = Transition._nodeAttrs[uid],
            customAttr = Transition.behaviors,
            done = false,
            allDone = false,
            data,
            name,
            attribute,
            setter,
            elapsed,
            delay,
            d,
            t,
            i;

        for (name in attrs) {
            attribute = attrs[name];
            if ((attribute && attribute.transition === anim)) {
                d = attribute.duration;
                delay = attribute.delay;
                elapsed = (time - delay) / 1000;
                t = time;
                data = {
                    type: 'propertyEnd',
                    propertyName: name,
                    config: config,
                    elapsedTime: elapsed
                };

                setter = (i in customAttr && 'set' in customAttr[i]) ?
                        customAttr[i].set : Transition.DEFAULT_SETTER;

                done = (t >= d);

                if (t > d) {
                    t = d;
                }

                if (!delay || time >= delay) {
                    setter(anim, name, attribute.from, attribute.to, t - delay, d - delay,
                        attribute.easing, attribute.unit); 

                    if (done) {
                        delete attrs[name];
                        anim._count--;

                        if (config[name] && config[name].on && config[name].on.end) {
                            config[name].on.end.call(Y.one(node), data);
                        }

                        //node.fire('transition:propertyEnd', data);

                        if (!allDone && anim._count <= 0) {
                            allDone = true;
                            anim._end(elapsed);
                            anim._endTimer();
                        }
                    }
                }

            }
        }
    },

    _initAttrs: function() {
        var anim = this,
            customAttr = Transition.behaviors,
            uid = Y.stamp(anim._node),
            attrs = Transition._nodeAttrs[uid],
            attribute,
            duration,
            delay,
            easing,
            val,
            name,
            mTo,
            mFrom,
            unit, begin, end;

        for (name in attrs) {
            attribute = attrs[name];
            if (attrs.hasOwnProperty(name) && (attribute && attribute.transition === anim)) {
                duration = attribute.duration * 1000;
                delay = attribute.delay * 1000;
                easing = attribute.easing;
                val = attribute.value;

                // only allow supported properties
                if (name in anim._node.style || name in Y.DOM.CUSTOM_STYLES) {
                    begin = (name in customAttr && 'get' in customAttr[name])  ?
                            customAttr[name].get(anim, name) : Transition.DEFAULT_GETTER(anim, name);

                    mFrom = Transition.RE_UNITS.exec(begin);
                    mTo = Transition.RE_UNITS.exec(val);

                    begin = mFrom ? mFrom[1] : begin;
                    end = mTo ? mTo[1] : val;
                    unit = mTo ? mTo[2] : mFrom ?  mFrom[2] : ''; // one might be zero TODO: mixed units

                    if (!unit && Transition.RE_DEFAULT_UNIT.test(name)) {
                        unit = Transition.DEFAULT_UNIT;
                    }

                    if (typeof easing === 'string') {
                        if (easing.indexOf('cubic-bezier') > -1) {
                            easing = easing.substring(13, easing.length - 1).split(',');
                        } else if (Transition.easings[easing]) {
                            easing = Transition.easings[easing];
                        }
                    }

                    attribute.from = Number(begin);
                    attribute.to = Number(end);
                    attribute.unit = unit;
                    attribute.easing = easing;
                    attribute.duration = duration + delay;
                    attribute.delay = delay;
                } else {
                    delete attrs[name];
                    anim._count--;
                }
            }
        }
    },

    destroy: function() {
        this.detachAll();
        this._node = null;
    }
}, true);

Y.mix(Y.Transition, {
    _runtimeAttrs: {},
    /*
     * Regex of properties that should use the default unit.
     *
     * @property RE_DEFAULT_UNIT
     * @static
     */
    RE_DEFAULT_UNIT: /^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,

    /*
     * The default unit to use with properties that pass the RE_DEFAULT_UNIT test.
     *
     * @property DEFAULT_UNIT
     * @static
     */
    DEFAULT_UNIT: 'px',

    /*
     * Time in milliseconds passed to setInterval for frame processing 
     *
     * @property intervalTime
     * @default 20
     * @static
     */
    intervalTime: 20,

    /*
     * Bucket for custom getters and setters
     *
     * @property behaviors
     * @static
     */
    behaviors: {
        left: {
            get: function(anim, attr) {
                return Y.DOM._getAttrOffset(anim._node, attr);
            }
        }
    },

    /*
     * The default setter to use when setting object properties.
     *
     * @property DEFAULT_SETTER
     * @static
     */
    DEFAULT_SETTER: function(anim, att, from, to, elapsed, duration, fn, unit) {
        from = Number(from);
        to = Number(to);

        var node = anim._node,
            val = Transition.cubicBezier(fn, elapsed / duration);

        val = from + val[0] * (to - from);

        if (node) {
            if (att in node.style || att in Y.DOM.CUSTOM_STYLES) {
                unit = unit || '';
                Y.DOM.setStyle(node, att, val + unit);
            }
        } else {
            anim._end();
        }
    },

    /*
     * The default getter to use when getting object properties.
     *
     * @property DEFAULT_GETTER
     * @static
     */
    DEFAULT_GETTER: function(anim, att) {
        var node = anim._node,
            val = '';

        if (att in node.style || att in Y.DOM.CUSTOM_STYLES) {
            val = Y.DOM.getComputedStyle(node, att);
        }

        return val;
    },

    _startTimer: function() {
        if (!Transition._timer) {
            Transition._timer = setInterval(Transition._runFrame, Transition.intervalTime);
        }
    },

    _stopTimer: function() {
        clearInterval(Transition._timer);
        Transition._timer = null;
    },

    /*
     * Called per Interval to handle each animation frame.
     * @method _runFrame
     * @private
     * @static
     */    
    _runFrame: function() {
        var done = true,
            anim;
        for (anim in Transition._running) {
            if (Transition._running[anim]._runFrame) {
                done = false;
                Transition._running[anim]._runFrame();
            }
        }

        if (done) {
            Transition._stopTimer();
        }
    },

    cubicBezier: function(p, t) {
        var x0 = 0,
            y0 = 0,
            x1 = p[0],
            y1 = p[1],
            x2 = p[2],
            y2 = p[3],
            x3 = 1,
            y3 = 0,

            A = x3 - 3 * x2 + 3 * x1 - x0,
            B = 3 * x2 - 6 * x1 + 3 * x0,
            C = 3 * x1 - 3 * x0,
            D = x0,
            E = y3 - 3 * y2 + 3 * y1 - y0,
            F = 3 * y2 - 6 * y1 + 3 * y0,
            G = 3 * y1 - 3 * y0,
            H = y0,

            x = (((A*t) + B)*t + C)*t + D,
            y = (((E*t) + F)*t + G)*t + H;

        return [x, y];
    },

    easings: {
        ease: [0.25, 0, 1, 0.25],
        linear: [0, 0, 1, 1],
        'ease-in': [0.42, 0, 1, 1],
        'ease-out': [0, 0, 0.58, 1],
        'ease-in-out': [0.42, 0, 0.58, 1]
    },

    _running: {},
    _timer: null,

    RE_UNITS: /^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/
}, true); 

Transition.behaviors.top = Transition.behaviors.bottom = Transition.behaviors.right = Transition.behaviors.left;

Y.Transition = Transition;


}, '@VERSION@' ,{requires:['transition-native', 'node-style']});


YUI.add('transition', function(Y){}, '@VERSION@' ,{use:['transition-native', 'transition-timer']});

