if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/transition/transition.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/transition/transition.js",
    code: []
};
_yuitest_coverage["/build/transition/transition.js"].code=["YUI.add('transition', function(Y) {","","/**","* Provides the transition method for Node.","* Transition has no API of its own, but adds the transition method to Node.","*","* @module transition","* @requires node-style","*/","","var CAMEL_VENDOR_PREFIX = '',","    VENDOR_PREFIX = '',","    DOCUMENT = Y.config.doc,","    DOCUMENT_ELEMENT = 'documentElement',","    TRANSITION = 'transition',","    TRANSITION_CAMEL = 'Transition',","    TRANSITION_PROPERTY_CAMEL,","    TRANSITION_PROPERTY,","    TRANSITION_DURATION,","    TRANSITION_TIMING_FUNCTION,","    TRANSITION_DELAY,","    TRANSITION_END,","    ON_TRANSITION_END,","    TRANSFORM_CAMEL,","","    EMPTY_OBJ = {},","","    VENDORS = [","        'Webkit',","        'Moz'","    ],","","    VENDOR_TRANSITION_END = {","        Webkit: 'webkitTransitionEnd'","    },","","/**"," * A class for constructing transition instances."," * Adds the \"transition\" method to Node."," * @class Transition"," * @constructor"," */","","Transition = function() {","    this.init.apply(this, arguments);","};","","Transition._toCamel = function(property) {","    property = property.replace(/-([a-z])/gi, function(m0, m1) {","        return m1.toUpperCase();","    });","","    return property;","};","","Transition._toHyphen = function(property) {","    property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {","        var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;","        ","        if (m3) {","            str += '-' + m3.toLowerCase();","        }","","        return str;","    }); ","","    return property;","};","","Transition.SHOW_TRANSITION = 'fadeIn';","Transition.HIDE_TRANSITION = 'fadeOut';","","Transition.useNative = false;","","Y.Array.each(VENDORS, function(val) { // then vendor specific","    var property = val + TRANSITION_CAMEL;","    if (property in DOCUMENT[DOCUMENT_ELEMENT].style) {","        CAMEL_VENDOR_PREFIX = val;","        VENDOR_PREFIX = Transition._toHyphen(val) + '-';","","        Transition.useNative = true;","        Transition.supported = true; // TODO: remove","        Transition._VENDOR_PREFIX = val;","    }","});","","TRANSITION_CAMEL = CAMEL_VENDOR_PREFIX + TRANSITION_CAMEL;","TRANSITION_PROPERTY_CAMEL = CAMEL_VENDOR_PREFIX + 'TransitionProperty';","TRANSITION_PROPERTY = VENDOR_PREFIX + 'transition-property';","TRANSITION_DURATION = VENDOR_PREFIX + 'transition-duration';","TRANSITION_TIMING_FUNCTION = VENDOR_PREFIX + 'transition-timing-function';","TRANSITION_DELAY = VENDOR_PREFIX + 'transition-delay';","TRANSITION_END = 'transitionend';","ON_TRANSITION_END = 'on' + CAMEL_VENDOR_PREFIX.toLowerCase() + 'transitionend';","","TRANSITION_END = VENDOR_TRANSITION_END[CAMEL_VENDOR_PREFIX] || TRANSITION_END;","","TRANSFORM_CAMEL = CAMEL_VENDOR_PREFIX + 'Transform';","","Transition.fx = {};","Transition.toggles = {};","","Transition._hasEnd = {};","","Transition._reKeywords = /^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;","","Y.Node.DOM_EVENTS[TRANSITION_END] = 1; ","","Transition.NAME = 'transition';","","Transition.DEFAULT_EASING = 'ease';","Transition.DEFAULT_DURATION = 0.5;","Transition.DEFAULT_DELAY = 0;","","Transition._nodeAttrs = {};","","Transition.prototype = {","    constructor: Transition,","    init: function(node, config) {","        var anim = this;","        anim._node = node;","        if (!anim._running && config) {","            anim._config = config;","            node._transition = anim; // cache for reuse","","            anim._duration = ('duration' in config) ?","                config.duration: anim.constructor.DEFAULT_DURATION;","","            anim._delay = ('delay' in config) ?","                config.delay: anim.constructor.DEFAULT_DELAY;","","            anim._easing = config.easing || anim.constructor.DEFAULT_EASING;","            anim._count = 0; // track number of animated properties","            anim._running = false;","","        }","","        return anim;","    },","","    addProperty: function(prop, config) {","        var anim = this,","            node = this._node,","            uid = Y.stamp(node),","            nodeInstance = Y.one(node),","            attrs = Transition._nodeAttrs[uid],","            computed,","            compareVal,","            dur,","            attr,","            val;","","        if (!attrs) {","            attrs = Transition._nodeAttrs[uid] = {};","        }","","        attr = attrs[prop];","","        // might just be a value","        if (config && config.value !== undefined) {","            val = config.value;","        } else if (config !== undefined) {","            val = config; ","            config = EMPTY_OBJ;","        }","","        if (typeof val === 'function') {","            val = val.call(nodeInstance, nodeInstance);","        }","","        if (attr && attr.transition) {","            // take control if another transition owns this property","            if (attr.transition !== anim) {","                attr.transition._count--; // remapping attr to this transition","            }","        } ","","        anim._count++; // properties per transition","","        // make 0 async and fire events","        dur = ((typeof config.duration != 'undefined') ? config.duration :","                    anim._duration) || 0.0001;","","        attrs[prop] = {","            value: val,","            duration: dur,","            delay: (typeof config.delay != 'undefined') ? config.delay :","                    anim._delay,","","            easing: config.easing || anim._easing,","","            transition: anim","        };","","        // native end event doesnt fire when setting to same value","        // supplementing with timer","        // val may be a string or number (height: 0, etc), but computedStyle is always string","        computed = Y.DOM.getComputedStyle(node, prop);","        compareVal = (typeof val === 'string') ? computed : parseFloat(computed);","","        if (Transition.useNative && compareVal === val) {","            setTimeout(function() {","                anim._onNativeEnd.call(node, {","                    propertyName: prop,","                    elapsedTime: dur","                });","            }, dur * 1000);","        }","    },","","    removeProperty: function(prop) {","        var anim = this,","            attrs = Transition._nodeAttrs[Y.stamp(anim._node)];","","        if (attrs && attrs[prop]) {","            delete attrs[prop];","            anim._count--;","        }","","    },","","    initAttrs: function(config) {","        var attr,","            node = this._node;","","        if (config.transform && !config[TRANSFORM_CAMEL]) {","            config[TRANSFORM_CAMEL] = config.transform;","            delete config.transform; // TODO: copy","        }","","        for (attr in config) {","            if (config.hasOwnProperty(attr) && !Transition._reKeywords.test(attr)) {","                this.addProperty(attr, config[attr]);","","                // when size is auto or % webkit starts from zero instead of computed ","                // (https://bugs.webkit.org/show_bug.cgi?id=16020)","                // TODO: selective set","                if (node.style[attr] === '') {","                    Y.DOM.setStyle(node, attr, Y.DOM.getComputedStyle(node, attr));","                }","            }","        }","    },","","    /**","     * Starts or an animation.","     * @method run","     * @chainable","     * @private","     */    ","    run: function(callback) {","        var anim = this,","            node = anim._node,","            config = anim._config,","            data = {","                type: 'transition:start',","                config: config","            };","","","        if (!anim._running) {","            anim._running = true;","","            if (config.on && config.on.start) {","                config.on.start.call(Y.one(node), data);","            }","","            anim.initAttrs(anim._config);","","            anim._callback = callback;","            anim._start();","        }","","","        return anim;","    },","","    _start: function() {","        this._runNative();","    },","","    _prepDur: function(dur) {","        dur = parseFloat(dur);","","        return dur + 's';","    },","","    _runNative: function(time) {","        var anim = this,","            node = anim._node,","            uid = Y.stamp(node),","            style = node.style,","            computed = node.ownerDocument.defaultView.getComputedStyle(node),","            attrs = Transition._nodeAttrs[uid],","            cssText = '',","            cssTransition = computed[Transition._toCamel(TRANSITION_PROPERTY)],","","            transitionText = TRANSITION_PROPERTY + ': ',","            duration = TRANSITION_DURATION + ': ',","            easing = TRANSITION_TIMING_FUNCTION + ': ',","            delay = TRANSITION_DELAY + ': ',","            hyphy,","            attr,","            name;","","        // preserve existing transitions","        if (cssTransition !== 'all') {","            transitionText += cssTransition + ',';","            duration += computed[Transition._toCamel(TRANSITION_DURATION)] + ',';","            easing += computed[Transition._toCamel(TRANSITION_TIMING_FUNCTION)] + ',';","            delay += computed[Transition._toCamel(TRANSITION_DELAY)] + ',';","","        }","","        // run transitions mapped to this instance","        for (name in attrs) {","            hyphy = Transition._toHyphen(name);","            attr = attrs[name];","            if ((attr = attrs[name]) && attr.transition === anim) {","                if (name in node.style) { // only native styles allowed","                    duration += anim._prepDur(attr.duration) + ',';","                    delay += anim._prepDur(attr.delay) + ',';","                    easing += (attr.easing) + ',';","","                    transitionText += hyphy + ',';","                    cssText += hyphy + ': ' + attr.value + '; ';","                } else {","                    this.removeProperty(name);","                }","            }","        }","","        transitionText = transitionText.replace(/,$/, ';');","        duration = duration.replace(/,$/, ';');","        easing = easing.replace(/,$/, ';');","        delay = delay.replace(/,$/, ';');","","        // only one native end event per node","        if (!Transition._hasEnd[uid]) {","            node.addEventListener(TRANSITION_END, anim._onNativeEnd, '');","            Transition._hasEnd[uid] = true;","","        }","        ","        style.cssText += transitionText + duration + easing + delay + cssText;","","    },","","    _end: function(elapsed) {","        var anim = this,","            node = anim._node,","            callback = anim._callback,","            config = anim._config,","            data = {","                type: 'transition:end',","                config: config,","                elapsedTime: elapsed ","            },","","            nodeInstance = Y.one(node); ","","        anim._running = false;","        anim._callback = null;","","        if (node) {","            if (config.on && config.on.end) {","                setTimeout(function() { // IE: allow previous update to finish","                    config.on.end.call(nodeInstance, data);","","                    // nested to ensure proper fire order","                    if (callback) {","                        callback.call(nodeInstance, data);","                    }","","                }, 1);","            } else if (callback) {","                setTimeout(function() { // IE: allow previous update to finish","                    callback.call(nodeInstance, data);","                }, 1);","            }","        }","","    },","","    _endNative: function(name) {","        var node = this._node,","            value = node.ownerDocument.defaultView.getComputedStyle(node, '')[Transition._toCamel(TRANSITION_PROPERTY)];","","        name = Transition._toHyphen(name);","        if (typeof value === 'string') {","            value = value.replace(new RegExp('(?:^|,\\\\s)' + name + ',?'), ',');","            value = value.replace(/^,|,$/, '');","            node.style[TRANSITION_CAMEL] = value;","        }","    },","","    _onNativeEnd: function(e) {","        var node = this,","            uid = Y.stamp(node),","            event = e,//e._event,","            name = Transition._toCamel(event.propertyName),","            elapsed = event.elapsedTime,","            attrs = Transition._nodeAttrs[uid],","            attr = attrs[name],","            anim = (attr) ? attr.transition : null,","            data,","            config;","","        if (anim) {","            anim.removeProperty(name);","            anim._endNative(name);","            config = anim._config[name];","","            data = {","                type: 'propertyEnd',","                propertyName: name,","                elapsedTime: elapsed,","                config: config","            };","","            if (config && config.on && config.on.end) {","                config.on.end.call(Y.one(node), data);","            }","","            if (anim._count <= 0)  { // after propertyEnd fires","                anim._end(elapsed);","                node.style[TRANSITION_PROPERTY_CAMEL] = ''; // clean up style","            }","        }","    },","","    destroy: function() {","        var anim = this,","            node = anim._node;","","        if (node) {","            node.removeEventListener(TRANSITION_END, anim._onNativeEnd, false);","            anim._node = null;","        }","    }","};","","Y.Transition = Transition;","Y.TransitionNative = Transition; // TODO: remove","","/** "," *   Animate one or more css properties to a given value. Requires the \"transition\" module."," *   <pre>example usage:"," *       Y.one('#demo').transition({"," *           duration: 1, // in seconds, default is 0.5"," *           easing: 'ease-out', // default is 'ease'"," *           delay: '1', // delay start for 1 second, default is 0"," *"," *           height: '10px',"," *           width: '10px',"," *"," *           opacity: { // per property"," *               value: 0,"," *               duration: 2,"," *               delay: 2,"," *               easing: 'ease-in'"," *           }"," *       });"," *   </pre>"," *   @for Node"," *   @method transition"," *   @param {Object} config An object containing one or more style properties, a duration and an easing."," *   @param {Function} callback A function to run after the transition has completed. "," *   @chainable","*/","Y.Node.prototype.transition = function(name, config, callback) {","    var ","        transitionAttrs = Transition._nodeAttrs[Y.stamp(this._node)],","        anim = (transitionAttrs) ? transitionAttrs.transition || null : null,","        fxConfig,","        prop;","    ","    if (typeof name === 'string') { // named effect, pull config from registry","        if (typeof config === 'function') {","            callback = config;","            config = null;","        }","","        fxConfig = Transition.fx[name];","","        if (config && typeof config !== 'boolean') {","            config = Y.clone(config);","","            for (prop in fxConfig) {","                if (fxConfig.hasOwnProperty(prop)) {","                    if (! (prop in config)) {","                        config[prop] = fxConfig[prop]; ","                    }","                }","            }","        } else {","            config = fxConfig;","        }","","    } else { // name is a config, config is a callback or undefined","        callback = config;","        config = name;","    }","","    if (anim && !anim._running) {","        anim.init(this, config);","    } else {","        anim = new Transition(this._node, config);","    }","","    anim.run(callback);","    return this;","};","","Y.Node.prototype.show = function(name, config, callback) {","    this._show(); // show prior to transition","    if (name && Y.Transition) {","        if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default","            if (typeof config === 'function') {","                callback = config;","                config = name;","            }","            name = Transition.SHOW_TRANSITION; ","        }    ","        this.transition(name, config, callback);","    }    ","    return this;","};","","var _wrapCallBack = function(anim, fn, callback) {","    return function() {","        if (fn) {","            fn.call(anim);","        }","        if (callback) {","            callback.apply(anim._node, arguments);","        }","    };","};","","Y.Node.prototype.hide = function(name, config, callback) {","    if (name && Y.Transition) {","        if (typeof config === 'function') {","            callback = config;","            config = null;","        }","","        callback = _wrapCallBack(this, this._hide, callback); // wrap with existing callback","        if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default","            if (typeof config === 'function') {","                callback = config;","                config = name;","            }","            name = Transition.HIDE_TRANSITION; ","        }    ","        this.transition(name, config, callback);","    } else {","        this._hide();","    }    ","    return this;","}; ","","/** "," *   Animate one or more css properties to a given value. Requires the \"transition\" module."," *   <pre>example usage:"," *       Y.all('.demo').transition({"," *           duration: 1, // in seconds, default is 0.5"," *           easing: 'ease-out', // default is 'ease'"," *           delay: '1', // delay start for 1 second, default is 0"," *"," *           height: '10px',"," *           width: '10px',"," *"," *           opacity: { // per property"," *               value: 0,"," *               duration: 2,"," *               delay: 2,"," *               easing: 'ease-in'"," *           }"," *       });"," *   </pre>"," *   @for NodeList"," *   @method transition"," *   @param {Object} config An object containing one or more style properties, a duration and an easing."," *   @param {Function} callback A function to run after the transition has completed. The callback fires"," *       once per item in the NodeList."," *   @chainable","*/","Y.NodeList.prototype.transition = function(config, callback) {","    var nodes = this._nodes,","        i = 0,","        node;","","    while ((node = nodes[i++])) {","        Y.one(node).transition(config, callback);","    }","","    return this;","};","","Y.Node.prototype.toggleView = function(name, on, callback) {","    this._toggles = this._toggles || [];","    callback = arguments[arguments.length - 1];","","    if (typeof name == 'boolean') { // no transition, just toggle","        on = name;","        name = null;","    }","","    name = name || Y.Transition.DEFAULT_TOGGLE;","","    if (typeof on == 'undefined' && name in this._toggles) { // reverse current toggle","        on = ! this._toggles[name];","    }","","    on = (on) ? 1 : 0;","    if (on) {","        this._show();","    }  else {","        callback = _wrapCallBack(this, this._hide, callback);","    }","","    this._toggles[name] = on;","    this.transition(Y.Transition.toggles[name][on], callback);","","    return this;","};","","Y.NodeList.prototype.toggleView = function(name, on, callback) {","    var nodes = this._nodes,","        i = 0,","        node;","","    while ((node = nodes[i++])) {","        Y.one(node).toggleView(name, on, callback);","    }","","    return this;","};","","Y.mix(Transition.fx, {","    fadeOut: {","        opacity: 0,","        duration: 0.5,","        easing: 'ease-out'","    },","","    fadeIn: {","        opacity: 1,","        duration: 0.5,","        easing: 'ease-in'","    },","","    sizeOut: {","        height: 0,","        width: 0,","        duration: 0.75,","        easing: 'ease-out'","    },","","    sizeIn: {","        height: function(node) {","            return node.get('scrollHeight') + 'px';","        },","        width: function(node) {","            return node.get('scrollWidth') + 'px';","        },","        duration: 0.5,","        easing: 'ease-in',","        ","        on: {","            start: function() {","                var overflow = this.getStyle('overflow');","                if (overflow !== 'hidden') { // enable scrollHeight/Width","                    this.setStyle('overflow', 'hidden');","                    this._transitionOverflow = overflow;","                }","            },","","            end: function() {","                if (this._transitionOverflow) { // revert overridden value","                    this.setStyle('overflow', this._transitionOverflow);","                    delete this._transitionOverflow;","                }","            }","        } ","    }","});","","Y.mix(Transition.toggles, {","    size: ['sizeOut', 'sizeIn'],","    fade: ['fadeOut', 'fadeIn']","});","","Transition.DEFAULT_TOGGLE = 'fade';","","","","}, '@VERSION@' ,{requires:['node-style']});"];
_yuitest_coverage["/build/transition/transition.js"].lines = {"1":0,"11":0,"45":0,"48":0,"49":0,"50":0,"53":0,"56":0,"57":0,"58":0,"60":0,"61":0,"64":0,"67":0,"70":0,"71":0,"73":0,"75":0,"76":0,"77":0,"78":0,"79":0,"81":0,"82":0,"83":0,"87":0,"88":0,"89":0,"90":0,"91":0,"92":0,"93":0,"94":0,"96":0,"98":0,"100":0,"101":0,"103":0,"105":0,"107":0,"109":0,"111":0,"112":0,"113":0,"115":0,"117":0,"120":0,"121":0,"122":0,"123":0,"124":0,"126":0,"129":0,"132":0,"133":0,"134":0,"138":0,"142":0,"153":0,"154":0,"157":0,"160":0,"161":0,"162":0,"163":0,"164":0,"167":0,"168":0,"171":0,"173":0,"174":0,"178":0,"181":0,"184":0,"198":0,"199":0,"201":0,"202":0,"203":0,"212":0,"215":0,"216":0,"217":0,"223":0,"226":0,"227":0,"228":0,"231":0,"232":0,"233":0,"238":0,"239":0,"252":0,"261":0,"262":0,"264":0,"265":0,"268":0,"270":0,"271":0,"275":0,"279":0,"283":0,"285":0,"289":0,"307":0,"308":0,"309":0,"310":0,"311":0,"316":0,"317":0,"318":0,"319":0,"320":0,"321":0,"322":0,"323":0,"325":0,"326":0,"328":0,"333":0,"334":0,"335":0,"336":0,"339":0,"340":0,"341":0,"345":0,"350":0,"362":0,"363":0,"365":0,"366":0,"367":0,"368":0,"371":0,"372":0,"376":0,"377":0,"378":0,"386":0,"389":0,"390":0,"391":0,"392":0,"393":0,"398":0,"409":0,"410":0,"411":0,"412":0,"414":0,"421":0,"422":0,"425":0,"426":0,"427":0,"433":0,"436":0,"437":0,"438":0,"443":0,"444":0,"471":0,"472":0,"478":0,"479":0,"480":0,"481":0,"484":0,"486":0,"487":0,"489":0,"490":0,"491":0,"492":0,"497":0,"501":0,"502":0,"505":0,"506":0,"508":0,"511":0,"512":0,"515":0,"516":0,"517":0,"518":0,"519":0,"520":0,"521":0,"523":0,"525":0,"527":0,"530":0,"531":0,"532":0,"533":0,"535":0,"536":0,"541":0,"542":0,"543":0,"544":0,"545":0,"548":0,"549":0,"550":0,"551":0,"552":0,"554":0,"556":0,"558":0,"560":0,"589":0,"590":0,"594":0,"595":0,"598":0,"601":0,"602":0,"603":0,"605":0,"606":0,"607":0,"610":0,"612":0,"613":0,"616":0,"617":0,"618":0,"620":0,"623":0,"624":0,"626":0,"629":0,"630":0,"634":0,"635":0,"638":0,"641":0,"663":0,"666":0,"673":0,"674":0,"675":0,"676":0,"681":0,"682":0,"683":0,"690":0,"695":0};
_yuitest_coverage["/build/transition/transition.js"].functions = {"Transition:44":0,"(anonymous 2):49":0,"_toCamel:48":0,"(anonymous 3):57":0,"_toHyphen:56":0,"(anonymous 4):75":0,"init:119":0,"(anonymous 5):202":0,"addProperty:141":0,"removeProperty:211":0,"initAttrs:222":0,"run:251":0,"_start:278":0,"_prepDur:282":0,"_runNative:288":0,"(anonymous 6):367":0,"(anonymous 7):377":0,"_end:349":0,"_endNative:385":0,"_onNativeEnd:397":0,"destroy:432":0,"transition:471":0,"show:515":0,"(anonymous 8):531":0,"_wrapCallBack:530":0,"hide:541":0,"transition:589":0,"toggleView:601":0,"toggleView:629":0,"height:662":0,"width:665":0,"start:672":0,"end:680":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/transition/transition.js"].coveredLines = 253;
_yuitest_coverage["/build/transition/transition.js"].coveredFunctions = 34;
_yuitest_coverline("/build/transition/transition.js", 1);
YUI.add('transition', function(Y) {

/**
* Provides the transition method for Node.
* Transition has no API of its own, but adds the transition method to Node.
*
* @module transition
* @requires node-style
*/

_yuitest_coverfunc("/build/transition/transition.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/transition/transition.js", 11);
var CAMEL_VENDOR_PREFIX = '',
    VENDOR_PREFIX = '',
    DOCUMENT = Y.config.doc,
    DOCUMENT_ELEMENT = 'documentElement',
    TRANSITION = 'transition',
    TRANSITION_CAMEL = 'Transition',
    TRANSITION_PROPERTY_CAMEL,
    TRANSITION_PROPERTY,
    TRANSITION_DURATION,
    TRANSITION_TIMING_FUNCTION,
    TRANSITION_DELAY,
    TRANSITION_END,
    ON_TRANSITION_END,
    TRANSFORM_CAMEL,

    EMPTY_OBJ = {},

    VENDORS = [
        'Webkit',
        'Moz'
    ],

    VENDOR_TRANSITION_END = {
        Webkit: 'webkitTransitionEnd'
    },

/**
 * A class for constructing transition instances.
 * Adds the "transition" method to Node.
 * @class Transition
 * @constructor
 */

Transition = function() {
    _yuitest_coverfunc("/build/transition/transition.js", "Transition", 44);
_yuitest_coverline("/build/transition/transition.js", 45);
this.init.apply(this, arguments);
};

_yuitest_coverline("/build/transition/transition.js", 48);
Transition._toCamel = function(property) {
    _yuitest_coverfunc("/build/transition/transition.js", "_toCamel", 48);
_yuitest_coverline("/build/transition/transition.js", 49);
property = property.replace(/-([a-z])/gi, function(m0, m1) {
        _yuitest_coverfunc("/build/transition/transition.js", "(anonymous 2)", 49);
_yuitest_coverline("/build/transition/transition.js", 50);
return m1.toUpperCase();
    });

    _yuitest_coverline("/build/transition/transition.js", 53);
return property;
};

_yuitest_coverline("/build/transition/transition.js", 56);
Transition._toHyphen = function(property) {
    _yuitest_coverfunc("/build/transition/transition.js", "_toHyphen", 56);
_yuitest_coverline("/build/transition/transition.js", 57);
property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {
        _yuitest_coverfunc("/build/transition/transition.js", "(anonymous 3)", 57);
_yuitest_coverline("/build/transition/transition.js", 58);
var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;
        
        _yuitest_coverline("/build/transition/transition.js", 60);
if (m3) {
            _yuitest_coverline("/build/transition/transition.js", 61);
str += '-' + m3.toLowerCase();
        }

        _yuitest_coverline("/build/transition/transition.js", 64);
return str;
    }); 

    _yuitest_coverline("/build/transition/transition.js", 67);
return property;
};

_yuitest_coverline("/build/transition/transition.js", 70);
Transition.SHOW_TRANSITION = 'fadeIn';
_yuitest_coverline("/build/transition/transition.js", 71);
Transition.HIDE_TRANSITION = 'fadeOut';

_yuitest_coverline("/build/transition/transition.js", 73);
Transition.useNative = false;

_yuitest_coverline("/build/transition/transition.js", 75);
Y.Array.each(VENDORS, function(val) { // then vendor specific
    _yuitest_coverfunc("/build/transition/transition.js", "(anonymous 4)", 75);
_yuitest_coverline("/build/transition/transition.js", 76);
var property = val + TRANSITION_CAMEL;
    _yuitest_coverline("/build/transition/transition.js", 77);
if (property in DOCUMENT[DOCUMENT_ELEMENT].style) {
        _yuitest_coverline("/build/transition/transition.js", 78);
CAMEL_VENDOR_PREFIX = val;
        _yuitest_coverline("/build/transition/transition.js", 79);
VENDOR_PREFIX = Transition._toHyphen(val) + '-';

        _yuitest_coverline("/build/transition/transition.js", 81);
Transition.useNative = true;
        _yuitest_coverline("/build/transition/transition.js", 82);
Transition.supported = true; // TODO: remove
        _yuitest_coverline("/build/transition/transition.js", 83);
Transition._VENDOR_PREFIX = val;
    }
});

_yuitest_coverline("/build/transition/transition.js", 87);
TRANSITION_CAMEL = CAMEL_VENDOR_PREFIX + TRANSITION_CAMEL;
_yuitest_coverline("/build/transition/transition.js", 88);
TRANSITION_PROPERTY_CAMEL = CAMEL_VENDOR_PREFIX + 'TransitionProperty';
_yuitest_coverline("/build/transition/transition.js", 89);
TRANSITION_PROPERTY = VENDOR_PREFIX + 'transition-property';
_yuitest_coverline("/build/transition/transition.js", 90);
TRANSITION_DURATION = VENDOR_PREFIX + 'transition-duration';
_yuitest_coverline("/build/transition/transition.js", 91);
TRANSITION_TIMING_FUNCTION = VENDOR_PREFIX + 'transition-timing-function';
_yuitest_coverline("/build/transition/transition.js", 92);
TRANSITION_DELAY = VENDOR_PREFIX + 'transition-delay';
_yuitest_coverline("/build/transition/transition.js", 93);
TRANSITION_END = 'transitionend';
_yuitest_coverline("/build/transition/transition.js", 94);
ON_TRANSITION_END = 'on' + CAMEL_VENDOR_PREFIX.toLowerCase() + 'transitionend';

_yuitest_coverline("/build/transition/transition.js", 96);
TRANSITION_END = VENDOR_TRANSITION_END[CAMEL_VENDOR_PREFIX] || TRANSITION_END;

_yuitest_coverline("/build/transition/transition.js", 98);
TRANSFORM_CAMEL = CAMEL_VENDOR_PREFIX + 'Transform';

_yuitest_coverline("/build/transition/transition.js", 100);
Transition.fx = {};
_yuitest_coverline("/build/transition/transition.js", 101);
Transition.toggles = {};

_yuitest_coverline("/build/transition/transition.js", 103);
Transition._hasEnd = {};

_yuitest_coverline("/build/transition/transition.js", 105);
Transition._reKeywords = /^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;

_yuitest_coverline("/build/transition/transition.js", 107);
Y.Node.DOM_EVENTS[TRANSITION_END] = 1; 

_yuitest_coverline("/build/transition/transition.js", 109);
Transition.NAME = 'transition';

_yuitest_coverline("/build/transition/transition.js", 111);
Transition.DEFAULT_EASING = 'ease';
_yuitest_coverline("/build/transition/transition.js", 112);
Transition.DEFAULT_DURATION = 0.5;
_yuitest_coverline("/build/transition/transition.js", 113);
Transition.DEFAULT_DELAY = 0;

_yuitest_coverline("/build/transition/transition.js", 115);
Transition._nodeAttrs = {};

_yuitest_coverline("/build/transition/transition.js", 117);
Transition.prototype = {
    constructor: Transition,
    init: function(node, config) {
        _yuitest_coverfunc("/build/transition/transition.js", "init", 119);
_yuitest_coverline("/build/transition/transition.js", 120);
var anim = this;
        _yuitest_coverline("/build/transition/transition.js", 121);
anim._node = node;
        _yuitest_coverline("/build/transition/transition.js", 122);
if (!anim._running && config) {
            _yuitest_coverline("/build/transition/transition.js", 123);
anim._config = config;
            _yuitest_coverline("/build/transition/transition.js", 124);
node._transition = anim; // cache for reuse

            _yuitest_coverline("/build/transition/transition.js", 126);
anim._duration = ('duration' in config) ?
                config.duration: anim.constructor.DEFAULT_DURATION;

            _yuitest_coverline("/build/transition/transition.js", 129);
anim._delay = ('delay' in config) ?
                config.delay: anim.constructor.DEFAULT_DELAY;

            _yuitest_coverline("/build/transition/transition.js", 132);
anim._easing = config.easing || anim.constructor.DEFAULT_EASING;
            _yuitest_coverline("/build/transition/transition.js", 133);
anim._count = 0; // track number of animated properties
            _yuitest_coverline("/build/transition/transition.js", 134);
anim._running = false;

        }

        _yuitest_coverline("/build/transition/transition.js", 138);
return anim;
    },

    addProperty: function(prop, config) {
        _yuitest_coverfunc("/build/transition/transition.js", "addProperty", 141);
_yuitest_coverline("/build/transition/transition.js", 142);
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

        _yuitest_coverline("/build/transition/transition.js", 153);
if (!attrs) {
            _yuitest_coverline("/build/transition/transition.js", 154);
attrs = Transition._nodeAttrs[uid] = {};
        }

        _yuitest_coverline("/build/transition/transition.js", 157);
attr = attrs[prop];

        // might just be a value
        _yuitest_coverline("/build/transition/transition.js", 160);
if (config && config.value !== undefined) {
            _yuitest_coverline("/build/transition/transition.js", 161);
val = config.value;
        } else {_yuitest_coverline("/build/transition/transition.js", 162);
if (config !== undefined) {
            _yuitest_coverline("/build/transition/transition.js", 163);
val = config; 
            _yuitest_coverline("/build/transition/transition.js", 164);
config = EMPTY_OBJ;
        }}

        _yuitest_coverline("/build/transition/transition.js", 167);
if (typeof val === 'function') {
            _yuitest_coverline("/build/transition/transition.js", 168);
val = val.call(nodeInstance, nodeInstance);
        }

        _yuitest_coverline("/build/transition/transition.js", 171);
if (attr && attr.transition) {
            // take control if another transition owns this property
            _yuitest_coverline("/build/transition/transition.js", 173);
if (attr.transition !== anim) {
                _yuitest_coverline("/build/transition/transition.js", 174);
attr.transition._count--; // remapping attr to this transition
            }
        } 

        _yuitest_coverline("/build/transition/transition.js", 178);
anim._count++; // properties per transition

        // make 0 async and fire events
        _yuitest_coverline("/build/transition/transition.js", 181);
dur = ((typeof config.duration != 'undefined') ? config.duration :
                    anim._duration) || 0.0001;

        _yuitest_coverline("/build/transition/transition.js", 184);
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
        _yuitest_coverline("/build/transition/transition.js", 198);
computed = Y.DOM.getComputedStyle(node, prop);
        _yuitest_coverline("/build/transition/transition.js", 199);
compareVal = (typeof val === 'string') ? computed : parseFloat(computed);

        _yuitest_coverline("/build/transition/transition.js", 201);
if (Transition.useNative && compareVal === val) {
            _yuitest_coverline("/build/transition/transition.js", 202);
setTimeout(function() {
                _yuitest_coverfunc("/build/transition/transition.js", "(anonymous 5)", 202);
_yuitest_coverline("/build/transition/transition.js", 203);
anim._onNativeEnd.call(node, {
                    propertyName: prop,
                    elapsedTime: dur
                });
            }, dur * 1000);
        }
    },

    removeProperty: function(prop) {
        _yuitest_coverfunc("/build/transition/transition.js", "removeProperty", 211);
_yuitest_coverline("/build/transition/transition.js", 212);
var anim = this,
            attrs = Transition._nodeAttrs[Y.stamp(anim._node)];

        _yuitest_coverline("/build/transition/transition.js", 215);
if (attrs && attrs[prop]) {
            _yuitest_coverline("/build/transition/transition.js", 216);
delete attrs[prop];
            _yuitest_coverline("/build/transition/transition.js", 217);
anim._count--;
        }

    },

    initAttrs: function(config) {
        _yuitest_coverfunc("/build/transition/transition.js", "initAttrs", 222);
_yuitest_coverline("/build/transition/transition.js", 223);
var attr,
            node = this._node;

        _yuitest_coverline("/build/transition/transition.js", 226);
if (config.transform && !config[TRANSFORM_CAMEL]) {
            _yuitest_coverline("/build/transition/transition.js", 227);
config[TRANSFORM_CAMEL] = config.transform;
            _yuitest_coverline("/build/transition/transition.js", 228);
delete config.transform; // TODO: copy
        }

        _yuitest_coverline("/build/transition/transition.js", 231);
for (attr in config) {
            _yuitest_coverline("/build/transition/transition.js", 232);
if (config.hasOwnProperty(attr) && !Transition._reKeywords.test(attr)) {
                _yuitest_coverline("/build/transition/transition.js", 233);
this.addProperty(attr, config[attr]);

                // when size is auto or % webkit starts from zero instead of computed 
                // (https://bugs.webkit.org/show_bug.cgi?id=16020)
                // TODO: selective set
                _yuitest_coverline("/build/transition/transition.js", 238);
if (node.style[attr] === '') {
                    _yuitest_coverline("/build/transition/transition.js", 239);
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
        _yuitest_coverfunc("/build/transition/transition.js", "run", 251);
_yuitest_coverline("/build/transition/transition.js", 252);
var anim = this,
            node = anim._node,
            config = anim._config,
            data = {
                type: 'transition:start',
                config: config
            };


        _yuitest_coverline("/build/transition/transition.js", 261);
if (!anim._running) {
            _yuitest_coverline("/build/transition/transition.js", 262);
anim._running = true;

            _yuitest_coverline("/build/transition/transition.js", 264);
if (config.on && config.on.start) {
                _yuitest_coverline("/build/transition/transition.js", 265);
config.on.start.call(Y.one(node), data);
            }

            _yuitest_coverline("/build/transition/transition.js", 268);
anim.initAttrs(anim._config);

            _yuitest_coverline("/build/transition/transition.js", 270);
anim._callback = callback;
            _yuitest_coverline("/build/transition/transition.js", 271);
anim._start();
        }


        _yuitest_coverline("/build/transition/transition.js", 275);
return anim;
    },

    _start: function() {
        _yuitest_coverfunc("/build/transition/transition.js", "_start", 278);
_yuitest_coverline("/build/transition/transition.js", 279);
this._runNative();
    },

    _prepDur: function(dur) {
        _yuitest_coverfunc("/build/transition/transition.js", "_prepDur", 282);
_yuitest_coverline("/build/transition/transition.js", 283);
dur = parseFloat(dur);

        _yuitest_coverline("/build/transition/transition.js", 285);
return dur + 's';
    },

    _runNative: function(time) {
        _yuitest_coverfunc("/build/transition/transition.js", "_runNative", 288);
_yuitest_coverline("/build/transition/transition.js", 289);
var anim = this,
            node = anim._node,
            uid = Y.stamp(node),
            style = node.style,
            computed = node.ownerDocument.defaultView.getComputedStyle(node),
            attrs = Transition._nodeAttrs[uid],
            cssText = '',
            cssTransition = computed[Transition._toCamel(TRANSITION_PROPERTY)],

            transitionText = TRANSITION_PROPERTY + ': ',
            duration = TRANSITION_DURATION + ': ',
            easing = TRANSITION_TIMING_FUNCTION + ': ',
            delay = TRANSITION_DELAY + ': ',
            hyphy,
            attr,
            name;

        // preserve existing transitions
        _yuitest_coverline("/build/transition/transition.js", 307);
if (cssTransition !== 'all') {
            _yuitest_coverline("/build/transition/transition.js", 308);
transitionText += cssTransition + ',';
            _yuitest_coverline("/build/transition/transition.js", 309);
duration += computed[Transition._toCamel(TRANSITION_DURATION)] + ',';
            _yuitest_coverline("/build/transition/transition.js", 310);
easing += computed[Transition._toCamel(TRANSITION_TIMING_FUNCTION)] + ',';
            _yuitest_coverline("/build/transition/transition.js", 311);
delay += computed[Transition._toCamel(TRANSITION_DELAY)] + ',';

        }

        // run transitions mapped to this instance
        _yuitest_coverline("/build/transition/transition.js", 316);
for (name in attrs) {
            _yuitest_coverline("/build/transition/transition.js", 317);
hyphy = Transition._toHyphen(name);
            _yuitest_coverline("/build/transition/transition.js", 318);
attr = attrs[name];
            _yuitest_coverline("/build/transition/transition.js", 319);
if ((attr = attrs[name]) && attr.transition === anim) {
                _yuitest_coverline("/build/transition/transition.js", 320);
if (name in node.style) { // only native styles allowed
                    _yuitest_coverline("/build/transition/transition.js", 321);
duration += anim._prepDur(attr.duration) + ',';
                    _yuitest_coverline("/build/transition/transition.js", 322);
delay += anim._prepDur(attr.delay) + ',';
                    _yuitest_coverline("/build/transition/transition.js", 323);
easing += (attr.easing) + ',';

                    _yuitest_coverline("/build/transition/transition.js", 325);
transitionText += hyphy + ',';
                    _yuitest_coverline("/build/transition/transition.js", 326);
cssText += hyphy + ': ' + attr.value + '; ';
                } else {
                    _yuitest_coverline("/build/transition/transition.js", 328);
this.removeProperty(name);
                }
            }
        }

        _yuitest_coverline("/build/transition/transition.js", 333);
transitionText = transitionText.replace(/,$/, ';');
        _yuitest_coverline("/build/transition/transition.js", 334);
duration = duration.replace(/,$/, ';');
        _yuitest_coverline("/build/transition/transition.js", 335);
easing = easing.replace(/,$/, ';');
        _yuitest_coverline("/build/transition/transition.js", 336);
delay = delay.replace(/,$/, ';');

        // only one native end event per node
        _yuitest_coverline("/build/transition/transition.js", 339);
if (!Transition._hasEnd[uid]) {
            _yuitest_coverline("/build/transition/transition.js", 340);
node.addEventListener(TRANSITION_END, anim._onNativeEnd, '');
            _yuitest_coverline("/build/transition/transition.js", 341);
Transition._hasEnd[uid] = true;

        }
        
        _yuitest_coverline("/build/transition/transition.js", 345);
style.cssText += transitionText + duration + easing + delay + cssText;

    },

    _end: function(elapsed) {
        _yuitest_coverfunc("/build/transition/transition.js", "_end", 349);
_yuitest_coverline("/build/transition/transition.js", 350);
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

        _yuitest_coverline("/build/transition/transition.js", 362);
anim._running = false;
        _yuitest_coverline("/build/transition/transition.js", 363);
anim._callback = null;

        _yuitest_coverline("/build/transition/transition.js", 365);
if (node) {
            _yuitest_coverline("/build/transition/transition.js", 366);
if (config.on && config.on.end) {
                _yuitest_coverline("/build/transition/transition.js", 367);
setTimeout(function() { // IE: allow previous update to finish
                    _yuitest_coverfunc("/build/transition/transition.js", "(anonymous 6)", 367);
_yuitest_coverline("/build/transition/transition.js", 368);
config.on.end.call(nodeInstance, data);

                    // nested to ensure proper fire order
                    _yuitest_coverline("/build/transition/transition.js", 371);
if (callback) {
                        _yuitest_coverline("/build/transition/transition.js", 372);
callback.call(nodeInstance, data);
                    }

                }, 1);
            } else {_yuitest_coverline("/build/transition/transition.js", 376);
if (callback) {
                _yuitest_coverline("/build/transition/transition.js", 377);
setTimeout(function() { // IE: allow previous update to finish
                    _yuitest_coverfunc("/build/transition/transition.js", "(anonymous 7)", 377);
_yuitest_coverline("/build/transition/transition.js", 378);
callback.call(nodeInstance, data);
                }, 1);
            }}
        }

    },

    _endNative: function(name) {
        _yuitest_coverfunc("/build/transition/transition.js", "_endNative", 385);
_yuitest_coverline("/build/transition/transition.js", 386);
var node = this._node,
            value = node.ownerDocument.defaultView.getComputedStyle(node, '')[Transition._toCamel(TRANSITION_PROPERTY)];

        _yuitest_coverline("/build/transition/transition.js", 389);
name = Transition._toHyphen(name);
        _yuitest_coverline("/build/transition/transition.js", 390);
if (typeof value === 'string') {
            _yuitest_coverline("/build/transition/transition.js", 391);
value = value.replace(new RegExp('(?:^|,\\s)' + name + ',?'), ',');
            _yuitest_coverline("/build/transition/transition.js", 392);
value = value.replace(/^,|,$/, '');
            _yuitest_coverline("/build/transition/transition.js", 393);
node.style[TRANSITION_CAMEL] = value;
        }
    },

    _onNativeEnd: function(e) {
        _yuitest_coverfunc("/build/transition/transition.js", "_onNativeEnd", 397);
_yuitest_coverline("/build/transition/transition.js", 398);
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

        _yuitest_coverline("/build/transition/transition.js", 409);
if (anim) {
            _yuitest_coverline("/build/transition/transition.js", 410);
anim.removeProperty(name);
            _yuitest_coverline("/build/transition/transition.js", 411);
anim._endNative(name);
            _yuitest_coverline("/build/transition/transition.js", 412);
config = anim._config[name];

            _yuitest_coverline("/build/transition/transition.js", 414);
data = {
                type: 'propertyEnd',
                propertyName: name,
                elapsedTime: elapsed,
                config: config
            };

            _yuitest_coverline("/build/transition/transition.js", 421);
if (config && config.on && config.on.end) {
                _yuitest_coverline("/build/transition/transition.js", 422);
config.on.end.call(Y.one(node), data);
            }

            _yuitest_coverline("/build/transition/transition.js", 425);
if (anim._count <= 0)  { // after propertyEnd fires
                _yuitest_coverline("/build/transition/transition.js", 426);
anim._end(elapsed);
                _yuitest_coverline("/build/transition/transition.js", 427);
node.style[TRANSITION_PROPERTY_CAMEL] = ''; // clean up style
            }
        }
    },

    destroy: function() {
        _yuitest_coverfunc("/build/transition/transition.js", "destroy", 432);
_yuitest_coverline("/build/transition/transition.js", 433);
var anim = this,
            node = anim._node;

        _yuitest_coverline("/build/transition/transition.js", 436);
if (node) {
            _yuitest_coverline("/build/transition/transition.js", 437);
node.removeEventListener(TRANSITION_END, anim._onNativeEnd, false);
            _yuitest_coverline("/build/transition/transition.js", 438);
anim._node = null;
        }
    }
};

_yuitest_coverline("/build/transition/transition.js", 443);
Y.Transition = Transition;
_yuitest_coverline("/build/transition/transition.js", 444);
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
_yuitest_coverline("/build/transition/transition.js", 471);
Y.Node.prototype.transition = function(name, config, callback) {
    _yuitest_coverfunc("/build/transition/transition.js", "transition", 471);
_yuitest_coverline("/build/transition/transition.js", 472);
var 
        transitionAttrs = Transition._nodeAttrs[Y.stamp(this._node)],
        anim = (transitionAttrs) ? transitionAttrs.transition || null : null,
        fxConfig,
        prop;
    
    _yuitest_coverline("/build/transition/transition.js", 478);
if (typeof name === 'string') { // named effect, pull config from registry
        _yuitest_coverline("/build/transition/transition.js", 479);
if (typeof config === 'function') {
            _yuitest_coverline("/build/transition/transition.js", 480);
callback = config;
            _yuitest_coverline("/build/transition/transition.js", 481);
config = null;
        }

        _yuitest_coverline("/build/transition/transition.js", 484);
fxConfig = Transition.fx[name];

        _yuitest_coverline("/build/transition/transition.js", 486);
if (config && typeof config !== 'boolean') {
            _yuitest_coverline("/build/transition/transition.js", 487);
config = Y.clone(config);

            _yuitest_coverline("/build/transition/transition.js", 489);
for (prop in fxConfig) {
                _yuitest_coverline("/build/transition/transition.js", 490);
if (fxConfig.hasOwnProperty(prop)) {
                    _yuitest_coverline("/build/transition/transition.js", 491);
if (! (prop in config)) {
                        _yuitest_coverline("/build/transition/transition.js", 492);
config[prop] = fxConfig[prop]; 
                    }
                }
            }
        } else {
            _yuitest_coverline("/build/transition/transition.js", 497);
config = fxConfig;
        }

    } else { // name is a config, config is a callback or undefined
        _yuitest_coverline("/build/transition/transition.js", 501);
callback = config;
        _yuitest_coverline("/build/transition/transition.js", 502);
config = name;
    }

    _yuitest_coverline("/build/transition/transition.js", 505);
if (anim && !anim._running) {
        _yuitest_coverline("/build/transition/transition.js", 506);
anim.init(this, config);
    } else {
        _yuitest_coverline("/build/transition/transition.js", 508);
anim = new Transition(this._node, config);
    }

    _yuitest_coverline("/build/transition/transition.js", 511);
anim.run(callback);
    _yuitest_coverline("/build/transition/transition.js", 512);
return this;
};

_yuitest_coverline("/build/transition/transition.js", 515);
Y.Node.prototype.show = function(name, config, callback) {
    _yuitest_coverfunc("/build/transition/transition.js", "show", 515);
_yuitest_coverline("/build/transition/transition.js", 516);
this._show(); // show prior to transition
    _yuitest_coverline("/build/transition/transition.js", 517);
if (name && Y.Transition) {
        _yuitest_coverline("/build/transition/transition.js", 518);
if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default
            _yuitest_coverline("/build/transition/transition.js", 519);
if (typeof config === 'function') {
                _yuitest_coverline("/build/transition/transition.js", 520);
callback = config;
                _yuitest_coverline("/build/transition/transition.js", 521);
config = name;
            }
            _yuitest_coverline("/build/transition/transition.js", 523);
name = Transition.SHOW_TRANSITION; 
        }    
        _yuitest_coverline("/build/transition/transition.js", 525);
this.transition(name, config, callback);
    }    
    _yuitest_coverline("/build/transition/transition.js", 527);
return this;
};

_yuitest_coverline("/build/transition/transition.js", 530);
var _wrapCallBack = function(anim, fn, callback) {
    _yuitest_coverfunc("/build/transition/transition.js", "_wrapCallBack", 530);
_yuitest_coverline("/build/transition/transition.js", 531);
return function() {
        _yuitest_coverfunc("/build/transition/transition.js", "(anonymous 8)", 531);
_yuitest_coverline("/build/transition/transition.js", 532);
if (fn) {
            _yuitest_coverline("/build/transition/transition.js", 533);
fn.call(anim);
        }
        _yuitest_coverline("/build/transition/transition.js", 535);
if (callback) {
            _yuitest_coverline("/build/transition/transition.js", 536);
callback.apply(anim._node, arguments);
        }
    };
};

_yuitest_coverline("/build/transition/transition.js", 541);
Y.Node.prototype.hide = function(name, config, callback) {
    _yuitest_coverfunc("/build/transition/transition.js", "hide", 541);
_yuitest_coverline("/build/transition/transition.js", 542);
if (name && Y.Transition) {
        _yuitest_coverline("/build/transition/transition.js", 543);
if (typeof config === 'function') {
            _yuitest_coverline("/build/transition/transition.js", 544);
callback = config;
            _yuitest_coverline("/build/transition/transition.js", 545);
config = null;
        }

        _yuitest_coverline("/build/transition/transition.js", 548);
callback = _wrapCallBack(this, this._hide, callback); // wrap with existing callback
        _yuitest_coverline("/build/transition/transition.js", 549);
if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default
            _yuitest_coverline("/build/transition/transition.js", 550);
if (typeof config === 'function') {
                _yuitest_coverline("/build/transition/transition.js", 551);
callback = config;
                _yuitest_coverline("/build/transition/transition.js", 552);
config = name;
            }
            _yuitest_coverline("/build/transition/transition.js", 554);
name = Transition.HIDE_TRANSITION; 
        }    
        _yuitest_coverline("/build/transition/transition.js", 556);
this.transition(name, config, callback);
    } else {
        _yuitest_coverline("/build/transition/transition.js", 558);
this._hide();
    }    
    _yuitest_coverline("/build/transition/transition.js", 560);
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
_yuitest_coverline("/build/transition/transition.js", 589);
Y.NodeList.prototype.transition = function(config, callback) {
    _yuitest_coverfunc("/build/transition/transition.js", "transition", 589);
_yuitest_coverline("/build/transition/transition.js", 590);
var nodes = this._nodes,
        i = 0,
        node;

    _yuitest_coverline("/build/transition/transition.js", 594);
while ((node = nodes[i++])) {
        _yuitest_coverline("/build/transition/transition.js", 595);
Y.one(node).transition(config, callback);
    }

    _yuitest_coverline("/build/transition/transition.js", 598);
return this;
};

_yuitest_coverline("/build/transition/transition.js", 601);
Y.Node.prototype.toggleView = function(name, on, callback) {
    _yuitest_coverfunc("/build/transition/transition.js", "toggleView", 601);
_yuitest_coverline("/build/transition/transition.js", 602);
this._toggles = this._toggles || [];
    _yuitest_coverline("/build/transition/transition.js", 603);
callback = arguments[arguments.length - 1];

    _yuitest_coverline("/build/transition/transition.js", 605);
if (typeof name == 'boolean') { // no transition, just toggle
        _yuitest_coverline("/build/transition/transition.js", 606);
on = name;
        _yuitest_coverline("/build/transition/transition.js", 607);
name = null;
    }

    _yuitest_coverline("/build/transition/transition.js", 610);
name = name || Y.Transition.DEFAULT_TOGGLE;

    _yuitest_coverline("/build/transition/transition.js", 612);
if (typeof on == 'undefined' && name in this._toggles) { // reverse current toggle
        _yuitest_coverline("/build/transition/transition.js", 613);
on = ! this._toggles[name];
    }

    _yuitest_coverline("/build/transition/transition.js", 616);
on = (on) ? 1 : 0;
    _yuitest_coverline("/build/transition/transition.js", 617);
if (on) {
        _yuitest_coverline("/build/transition/transition.js", 618);
this._show();
    }  else {
        _yuitest_coverline("/build/transition/transition.js", 620);
callback = _wrapCallBack(this, this._hide, callback);
    }

    _yuitest_coverline("/build/transition/transition.js", 623);
this._toggles[name] = on;
    _yuitest_coverline("/build/transition/transition.js", 624);
this.transition(Y.Transition.toggles[name][on], callback);

    _yuitest_coverline("/build/transition/transition.js", 626);
return this;
};

_yuitest_coverline("/build/transition/transition.js", 629);
Y.NodeList.prototype.toggleView = function(name, on, callback) {
    _yuitest_coverfunc("/build/transition/transition.js", "toggleView", 629);
_yuitest_coverline("/build/transition/transition.js", 630);
var nodes = this._nodes,
        i = 0,
        node;

    _yuitest_coverline("/build/transition/transition.js", 634);
while ((node = nodes[i++])) {
        _yuitest_coverline("/build/transition/transition.js", 635);
Y.one(node).toggleView(name, on, callback);
    }

    _yuitest_coverline("/build/transition/transition.js", 638);
return this;
};

_yuitest_coverline("/build/transition/transition.js", 641);
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
            _yuitest_coverfunc("/build/transition/transition.js", "height", 662);
_yuitest_coverline("/build/transition/transition.js", 663);
return node.get('scrollHeight') + 'px';
        },
        width: function(node) {
            _yuitest_coverfunc("/build/transition/transition.js", "width", 665);
_yuitest_coverline("/build/transition/transition.js", 666);
return node.get('scrollWidth') + 'px';
        },
        duration: 0.5,
        easing: 'ease-in',
        
        on: {
            start: function() {
                _yuitest_coverfunc("/build/transition/transition.js", "start", 672);
_yuitest_coverline("/build/transition/transition.js", 673);
var overflow = this.getStyle('overflow');
                _yuitest_coverline("/build/transition/transition.js", 674);
if (overflow !== 'hidden') { // enable scrollHeight/Width
                    _yuitest_coverline("/build/transition/transition.js", 675);
this.setStyle('overflow', 'hidden');
                    _yuitest_coverline("/build/transition/transition.js", 676);
this._transitionOverflow = overflow;
                }
            },

            end: function() {
                _yuitest_coverfunc("/build/transition/transition.js", "end", 680);
_yuitest_coverline("/build/transition/transition.js", 681);
if (this._transitionOverflow) { // revert overridden value
                    _yuitest_coverline("/build/transition/transition.js", 682);
this.setStyle('overflow', this._transitionOverflow);
                    _yuitest_coverline("/build/transition/transition.js", 683);
delete this._transitionOverflow;
                }
            }
        } 
    }
});

_yuitest_coverline("/build/transition/transition.js", 690);
Y.mix(Transition.toggles, {
    size: ['sizeOut', 'sizeIn'],
    fade: ['fadeOut', 'fadeIn']
});

_yuitest_coverline("/build/transition/transition.js", 695);
Transition.DEFAULT_TOGGLE = 'fade';



}, '@VERSION@' ,{requires:['node-style']});
