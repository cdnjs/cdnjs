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
_yuitest_coverage["build/transition/transition.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/transition/transition.js",
    code: []
};
_yuitest_coverage["build/transition/transition.js"].code=["YUI.add('transition', function (Y, NAME) {","","/**","* Provides the transition method for Node.","* Transition has no API of its own, but adds the transition method to Node.","*","* @module transition","* @requires node-style","*/","","var CAMEL_VENDOR_PREFIX = '',","    VENDOR_PREFIX = '',","    DOCUMENT = Y.config.doc,","    DOCUMENT_ELEMENT = 'documentElement',","    TRANSITION_CAMEL = 'transition',","    TRANSITION_PROPERTY_CAMEL = 'transitionProperty',","    TRANSFORM_CAMEL = 'transform',","    TRANSITION_PROPERTY,","    TRANSITION_DURATION,","    TRANSITION_TIMING_FUNCTION,","    TRANSITION_DELAY,","    TRANSITION_END,","    ON_TRANSITION_END,","","    EMPTY_OBJ = {},","","    VENDORS = [","        'Webkit',","        'Moz'","    ],","","    VENDOR_TRANSITION_END = {","        Webkit: 'webkitTransitionEnd'","    },","","/**"," * A class for constructing transition instances."," * Adds the \"transition\" method to Node."," * @class Transition"," * @constructor"," */","","Transition = function() {","    this.init.apply(this, arguments);","};","","Transition._toCamel = function(property) {","    property = property.replace(/-([a-z])/gi, function(m0, m1) {","        return m1.toUpperCase();","    });","","    return property;","};","","Transition._toHyphen = function(property) {","    property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {","        var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;","","        if (m3) {","            str += '-' + m3.toLowerCase();","        }","","        return str;","    });","","    return property;","};","","Transition.SHOW_TRANSITION = 'fadeIn';","Transition.HIDE_TRANSITION = 'fadeOut';","","Transition.useNative = false;","","if ('transition' in DOCUMENT[DOCUMENT_ELEMENT].style) {","    Transition.useNative = true;","    Transition.supported = true; // TODO: remove","} else {","    Y.Array.each(VENDORS, function(val) { // then vendor specific","        var property = val + 'Transition';","        if (property in DOCUMENT[DOCUMENT_ELEMENT].style) {","            CAMEL_VENDOR_PREFIX = val;","            VENDOR_PREFIX       = Transition._toHyphen(val) + '-';","","            Transition.useNative = true;","            Transition.supported = true; // TODO: remove","            Transition._VENDOR_PREFIX = val;","        }","    });","}","","if (CAMEL_VENDOR_PREFIX) {","    TRANSITION_CAMEL          = CAMEL_VENDOR_PREFIX + 'Transition';","    TRANSITION_PROPERTY_CAMEL = CAMEL_VENDOR_PREFIX + 'TransitionProperty';","    TRANSFORM_CAMEL           = CAMEL_VENDOR_PREFIX + 'Transform';","}","","TRANSITION_PROPERTY        = VENDOR_PREFIX + 'transition-property';","TRANSITION_DURATION        = VENDOR_PREFIX + 'transition-duration';","TRANSITION_TIMING_FUNCTION = VENDOR_PREFIX + 'transition-timing-function';","TRANSITION_DELAY           = VENDOR_PREFIX + 'transition-delay';","","TRANSITION_END    = 'transitionend';","ON_TRANSITION_END = 'on' + CAMEL_VENDOR_PREFIX.toLowerCase() + 'transitionend';","TRANSITION_END    = VENDOR_TRANSITION_END[CAMEL_VENDOR_PREFIX] || TRANSITION_END;","","Transition.fx = {};","Transition.toggles = {};","","Transition._hasEnd = {};","","Transition._reKeywords = /^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;","","Y.Node.DOM_EVENTS[TRANSITION_END] = 1;","","Transition.NAME = 'transition';","","Transition.DEFAULT_EASING = 'ease';","Transition.DEFAULT_DURATION = 0.5;","Transition.DEFAULT_DELAY = 0;","","Transition._nodeAttrs = {};","","Transition.prototype = {","    constructor: Transition,","    init: function(node, config) {","        var anim = this;","        anim._node = node;","        if (!anim._running && config) {","            anim._config = config;","            node._transition = anim; // cache for reuse","","            anim._duration = ('duration' in config) ?","                config.duration: anim.constructor.DEFAULT_DURATION;","","            anim._delay = ('delay' in config) ?","                config.delay: anim.constructor.DEFAULT_DELAY;","","            anim._easing = config.easing || anim.constructor.DEFAULT_EASING;","            anim._count = 0; // track number of animated properties","            anim._running = false;","","        }","","        return anim;","    },","","    addProperty: function(prop, config) {","        var anim = this,","            node = this._node,","            uid = Y.stamp(node),","            nodeInstance = Y.one(node),","            attrs = Transition._nodeAttrs[uid],","            computed,","            compareVal,","            dur,","            attr,","            val;","","        if (!attrs) {","            attrs = Transition._nodeAttrs[uid] = {};","        }","","        attr = attrs[prop];","","        // might just be a value","        if (config && config.value !== undefined) {","            val = config.value;","        } else if (config !== undefined) {","            val = config;","            config = EMPTY_OBJ;","        }","","        if (typeof val === 'function') {","            val = val.call(nodeInstance, nodeInstance);","        }","","        if (attr && attr.transition) {","            // take control if another transition owns this property","            if (attr.transition !== anim) {","                attr.transition._count--; // remapping attr to this transition","            }","        }","","        anim._count++; // properties per transition","","        // make 0 async and fire events","        dur = ((typeof config.duration !== 'undefined') ? config.duration :","                    anim._duration) || 0.0001;","","        attrs[prop] = {","            value: val,","            duration: dur,","            delay: (typeof config.delay !== 'undefined') ? config.delay :","                    anim._delay,","","            easing: config.easing || anim._easing,","","            transition: anim","        };","","        // native end event doesnt fire when setting to same value","        // supplementing with timer","        // val may be a string or number (height: 0, etc), but computedStyle is always string","        computed = Y.DOM.getComputedStyle(node, prop);","        compareVal = (typeof val === 'string') ? computed : parseFloat(computed);","","        if (Transition.useNative && compareVal === val) {","            setTimeout(function() {","                anim._onNativeEnd.call(node, {","                    propertyName: prop,","                    elapsedTime: dur","                });","            }, dur * 1000);","        }","    },","","    removeProperty: function(prop) {","        var anim = this,","            attrs = Transition._nodeAttrs[Y.stamp(anim._node)];","","        if (attrs && attrs[prop]) {","            delete attrs[prop];","            anim._count--;","        }","","    },","","    initAttrs: function(config) {","        var attr,","            node = this._node;","","        if (config.transform && !config[TRANSFORM_CAMEL]) {","            config[TRANSFORM_CAMEL] = config.transform;","            delete config.transform; // TODO: copy","        }","","        for (attr in config) {","            if (config.hasOwnProperty(attr) && !Transition._reKeywords.test(attr)) {","                this.addProperty(attr, config[attr]);","","                // when size is auto or % webkit starts from zero instead of computed","                // (https://bugs.webkit.org/show_bug.cgi?id=16020)","                // TODO: selective set","                if (node.style[attr] === '') {","                    Y.DOM.setStyle(node, attr, Y.DOM.getComputedStyle(node, attr));","                }","            }","        }","    },","","    /**","     * Starts or an animation.","     * @method run","     * @chainable","     * @private","     */","    run: function(callback) {","        var anim = this,","            node = anim._node,","            config = anim._config,","            data = {","                type: 'transition:start',","                config: config","            };","","","        if (!anim._running) {","            anim._running = true;","","            if (config.on && config.on.start) {","                config.on.start.call(Y.one(node), data);","            }","","            anim.initAttrs(anim._config);","","            anim._callback = callback;","            anim._start();","        }","","","        return anim;","    },","","    _start: function() {","        this._runNative();","    },","","    _prepDur: function(dur) {","        dur = parseFloat(dur) * 1000;","","        return dur + 'ms';","    },","","    _runNative: function() {","        var anim = this,","            node = anim._node,","            uid = Y.stamp(node),","            style = node.style,","            computed = node.ownerDocument.defaultView.getComputedStyle(node),","            attrs = Transition._nodeAttrs[uid],","            cssText = '',","            cssTransition = computed[Transition._toCamel(TRANSITION_PROPERTY)],","","            transitionText = TRANSITION_PROPERTY + ': ',","            duration = TRANSITION_DURATION + ': ',","            easing = TRANSITION_TIMING_FUNCTION + ': ',","            delay = TRANSITION_DELAY + ': ',","            hyphy,","            attr,","            name;","","        // preserve existing transitions","        if (cssTransition !== 'all') {","            transitionText += cssTransition + ',';","            duration += computed[Transition._toCamel(TRANSITION_DURATION)] + ',';","            easing += computed[Transition._toCamel(TRANSITION_TIMING_FUNCTION)] + ',';","            delay += computed[Transition._toCamel(TRANSITION_DELAY)] + ',';","","        }","","        // run transitions mapped to this instance","        for (name in attrs) {","            hyphy = Transition._toHyphen(name);","            attr = attrs[name];","            if ((attr = attrs[name]) && attr.transition === anim) {","                if (name in node.style) { // only native styles allowed","                    duration += anim._prepDur(attr.duration) + ',';","                    delay += anim._prepDur(attr.delay) + ',';","                    easing += (attr.easing) + ',';","","                    transitionText += hyphy + ',';","                    cssText += hyphy + ': ' + attr.value + '; ';","                } else {","                    this.removeProperty(name);","                }","            }","        }","","        transitionText = transitionText.replace(/,$/, ';');","        duration = duration.replace(/,$/, ';');","        easing = easing.replace(/,$/, ';');","        delay = delay.replace(/,$/, ';');","","        // only one native end event per node","        if (!Transition._hasEnd[uid]) {","            node.addEventListener(TRANSITION_END, anim._onNativeEnd, '');","            Transition._hasEnd[uid] = true;","","        }","","        style.cssText += transitionText + duration + easing + delay + cssText;","","    },","","    _end: function(elapsed) {","        var anim = this,","            node = anim._node,","            callback = anim._callback,","            config = anim._config,","            data = {","                type: 'transition:end',","                config: config,","                elapsedTime: elapsed","            },","","            nodeInstance = Y.one(node);","","        anim._running = false;","        anim._callback = null;","","        if (node) {","            if (config.on && config.on.end) {","                setTimeout(function() { // IE: allow previous update to finish","                    config.on.end.call(nodeInstance, data);","","                    // nested to ensure proper fire order","                    if (callback) {","                        callback.call(nodeInstance, data);","                    }","","                }, 1);","            } else if (callback) {","                setTimeout(function() { // IE: allow previous update to finish","                    callback.call(nodeInstance, data);","                }, 1);","            }","        }","","    },","","    _endNative: function(name) {","        var node = this._node,","            value = node.ownerDocument.defaultView.getComputedStyle(node, '')[Transition._toCamel(TRANSITION_PROPERTY)];","","        name = Transition._toHyphen(name);","        if (typeof value === 'string') {","            value = value.replace(new RegExp('(?:^|,\\\\s)' + name + ',?'), ',');","            value = value.replace(/^,|,$/, '');","            node.style[TRANSITION_CAMEL] = value;","        }","    },","","    _onNativeEnd: function(e) {","        var node = this,","            uid = Y.stamp(node),","            event = e,//e._event,","            name = Transition._toCamel(event.propertyName),","            elapsed = event.elapsedTime,","            attrs = Transition._nodeAttrs[uid],","            attr = attrs[name],","            anim = (attr) ? attr.transition : null,","            data,","            config;","","        if (anim) {","            anim.removeProperty(name);","            anim._endNative(name);","            config = anim._config[name];","","            data = {","                type: 'propertyEnd',","                propertyName: name,","                elapsedTime: elapsed,","                config: config","            };","","            if (config && config.on && config.on.end) {","                config.on.end.call(Y.one(node), data);","            }","","            if (anim._count <= 0)  { // after propertyEnd fires","                anim._end(elapsed);","                node.style[TRANSITION_PROPERTY_CAMEL] = ''; // clean up style","            }","        }","    },","","    destroy: function() {","        var anim = this,","            node = anim._node;","","        if (node) {","            node.removeEventListener(TRANSITION_END, anim._onNativeEnd, false);","            anim._node = null;","        }","    }","};","","Y.Transition = Transition;","Y.TransitionNative = Transition; // TODO: remove","","/**"," *   Animate one or more css properties to a given value. Requires the \"transition\" module."," *   <pre>example usage:"," *       Y.one('#demo').transition({"," *           duration: 1, // in seconds, default is 0.5"," *           easing: 'ease-out', // default is 'ease'"," *           delay: '1', // delay start for 1 second, default is 0"," *"," *           height: '10px',"," *           width: '10px',"," *"," *           opacity: { // per property"," *               value: 0,"," *               duration: 2,"," *               delay: 2,"," *               easing: 'ease-in'"," *           }"," *       });"," *   </pre>"," *   @for Node"," *   @method transition"," *   @param {Object} config An object containing one or more style properties, a duration and an easing."," *   @param {Function} callback A function to run after the transition has completed."," *   @chainable","*/","Y.Node.prototype.transition = function(name, config, callback) {","    var","        transitionAttrs = Transition._nodeAttrs[Y.stamp(this._node)],","        anim = (transitionAttrs) ? transitionAttrs.transition || null : null,","        fxConfig,","        prop;","","    if (typeof name === 'string') { // named effect, pull config from registry","        if (typeof config === 'function') {","            callback = config;","            config = null;","        }","","        fxConfig = Transition.fx[name];","","        if (config && typeof config !== 'boolean') {","            config = Y.clone(config);","","            for (prop in fxConfig) {","                if (fxConfig.hasOwnProperty(prop)) {","                    if (! (prop in config)) {","                        config[prop] = fxConfig[prop];","                    }","                }","            }","        } else {","            config = fxConfig;","        }","","    } else { // name is a config, config is a callback or undefined","        callback = config;","        config = name;","    }","","    if (anim && !anim._running) {","        anim.init(this, config);","    } else {","        anim = new Transition(this._node, config);","    }","","    anim.run(callback);","    return this;","};","","Y.Node.prototype.show = function(name, config, callback) {","    this._show(); // show prior to transition","    if (name && Y.Transition) {","        if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default","            if (typeof config === 'function') {","                callback = config;","                config = name;","            }","            name = Transition.SHOW_TRANSITION;","        }","        this.transition(name, config, callback);","    }","    return this;","};","","Y.NodeList.prototype.show = function(name, config, callback) {","    var nodes = this._nodes,","        i = 0,","        node;","","    while ((node = nodes[i++])) {","        Y.one(node).show(name, config, callback);","    }","","    return this;","};","","","","var _wrapCallBack = function(anim, fn, callback) {","    return function() {","        if (fn) {","            fn.call(anim);","        }","        if (callback && typeof callback === 'function') {","            callback.apply(anim._node, arguments);","        }","    };","};","","Y.Node.prototype.hide = function(name, config, callback) {","    if (name && Y.Transition) {","        if (typeof config === 'function') {","            callback = config;","            config = null;","        }","","        callback = _wrapCallBack(this, this._hide, callback); // wrap with existing callback","        if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default","            if (typeof config === 'function') {","                callback = config;","                config = name;","            }","            name = Transition.HIDE_TRANSITION;","        }","        this.transition(name, config, callback);","    } else {","        this._hide();","    }","    return this;","};","","Y.NodeList.prototype.hide = function(name, config, callback) {","    var nodes = this._nodes,","        i = 0,","        node;","","    while ((node = nodes[i++])) {","        Y.one(node).hide(name, config, callback);","    }","","    return this;","};","","/**"," *   Animate one or more css properties to a given value. Requires the \"transition\" module."," *   <pre>example usage:"," *       Y.all('.demo').transition({"," *           duration: 1, // in seconds, default is 0.5"," *           easing: 'ease-out', // default is 'ease'"," *           delay: '1', // delay start for 1 second, default is 0"," *"," *           height: '10px',"," *           width: '10px',"," *"," *           opacity: { // per property"," *               value: 0,"," *               duration: 2,"," *               delay: 2,"," *               easing: 'ease-in'"," *           }"," *       });"," *   </pre>"," *   @for NodeList"," *   @method transition"," *   @param {Object} config An object containing one or more style properties, a duration and an easing."," *   @param {Function} callback A function to run after the transition has completed. The callback fires"," *       once per item in the NodeList."," *   @chainable","*/","Y.NodeList.prototype.transition = function(config, callback) {","    var nodes = this._nodes,","        i = 0,","        node;","","    while ((node = nodes[i++])) {","        Y.one(node).transition(config, callback);","    }","","    return this;","};","","Y.Node.prototype.toggleView = function(name, on, callback) {","    this._toggles = this._toggles || [];","    callback = arguments[arguments.length - 1];","","    if (typeof name !== 'string') { // no transition, just toggle","        on = name;","        this._toggleView(on, callback); // call original _toggleView in Y.Node","        return;","    }","","    if (typeof on === 'function') { // Ignore \"on\" if used for callback argument.","        on = undefined;","    }","","    if (typeof on === 'undefined' && name in this._toggles) { // reverse current toggle","        on = ! this._toggles[name];","    }","","    on = (on) ? 1 : 0;","    if (on) {","        this._show();","    }  else {","        callback = _wrapCallBack(this, this._hide, callback);","    }","","    this._toggles[name] = on;","    this.transition(Y.Transition.toggles[name][on], callback);","","    return this;","};","","Y.NodeList.prototype.toggleView = function(name, on, callback) {","    var nodes = this._nodes,","        i = 0,","        node;","","    while ((node = nodes[i++])) {","        node = Y.one(node);","        node.toggleView.apply(node, arguments);","    }","","    return this;","};","","Y.mix(Transition.fx, {","    fadeOut: {","        opacity: 0,","        duration: 0.5,","        easing: 'ease-out'","    },","","    fadeIn: {","        opacity: 1,","        duration: 0.5,","        easing: 'ease-in'","    },","","    sizeOut: {","        height: 0,","        width: 0,","        duration: 0.75,","        easing: 'ease-out'","    },","","    sizeIn: {","        height: function(node) {","            return node.get('scrollHeight') + 'px';","        },","        width: function(node) {","            return node.get('scrollWidth') + 'px';","        },","        duration: 0.5,","        easing: 'ease-in',","","        on: {","            start: function() {","                var overflow = this.getStyle('overflow');","                if (overflow !== 'hidden') { // enable scrollHeight/Width","                    this.setStyle('overflow', 'hidden');","                    this._transitionOverflow = overflow;","                }","            },","","            end: function() {","                if (this._transitionOverflow) { // revert overridden value","                    this.setStyle('overflow', this._transitionOverflow);","                    delete this._transitionOverflow;","                }","            }","        }","    }","});","","Y.mix(Transition.toggles, {","    size: ['sizeOut', 'sizeIn'],","    fade: ['fadeOut', 'fadeIn']","});","","","}, '@VERSION@', {\"requires\": [\"node-style\"]});"];
_yuitest_coverage["build/transition/transition.js"].lines = {"1":0,"11":0,"44":0,"47":0,"48":0,"49":0,"52":0,"55":0,"56":0,"57":0,"59":0,"60":0,"63":0,"66":0,"69":0,"70":0,"72":0,"74":0,"75":0,"76":0,"78":0,"79":0,"80":0,"81":0,"82":0,"84":0,"85":0,"86":0,"91":0,"92":0,"93":0,"94":0,"97":0,"98":0,"99":0,"100":0,"102":0,"103":0,"104":0,"106":0,"107":0,"109":0,"111":0,"113":0,"115":0,"117":0,"118":0,"119":0,"121":0,"123":0,"126":0,"127":0,"128":0,"129":0,"130":0,"132":0,"135":0,"138":0,"139":0,"140":0,"144":0,"148":0,"159":0,"160":0,"163":0,"166":0,"167":0,"168":0,"169":0,"170":0,"173":0,"174":0,"177":0,"179":0,"180":0,"184":0,"187":0,"190":0,"204":0,"205":0,"207":0,"208":0,"209":0,"218":0,"221":0,"222":0,"223":0,"229":0,"232":0,"233":0,"234":0,"237":0,"238":0,"239":0,"244":0,"245":0,"258":0,"267":0,"268":0,"270":0,"271":0,"274":0,"276":0,"277":0,"281":0,"285":0,"289":0,"291":0,"295":0,"313":0,"314":0,"315":0,"316":0,"317":0,"322":0,"323":0,"324":0,"325":0,"326":0,"327":0,"328":0,"329":0,"331":0,"332":0,"334":0,"339":0,"340":0,"341":0,"342":0,"345":0,"346":0,"347":0,"351":0,"356":0,"368":0,"369":0,"371":0,"372":0,"373":0,"374":0,"377":0,"378":0,"382":0,"383":0,"384":0,"392":0,"395":0,"396":0,"397":0,"398":0,"399":0,"404":0,"415":0,"416":0,"417":0,"418":0,"420":0,"427":0,"428":0,"431":0,"432":0,"433":0,"439":0,"442":0,"443":0,"444":0,"449":0,"450":0,"477":0,"478":0,"484":0,"485":0,"486":0,"487":0,"490":0,"492":0,"493":0,"495":0,"496":0,"497":0,"498":0,"503":0,"507":0,"508":0,"511":0,"512":0,"514":0,"517":0,"518":0,"521":0,"522":0,"523":0,"524":0,"525":0,"526":0,"527":0,"529":0,"531":0,"533":0,"536":0,"537":0,"541":0,"542":0,"545":0,"550":0,"551":0,"552":0,"553":0,"555":0,"556":0,"561":0,"562":0,"563":0,"564":0,"565":0,"568":0,"569":0,"570":0,"571":0,"572":0,"574":0,"576":0,"578":0,"580":0,"583":0,"584":0,"588":0,"589":0,"592":0,"621":0,"622":0,"626":0,"627":0,"630":0,"633":0,"634":0,"635":0,"637":0,"638":0,"639":0,"640":0,"643":0,"644":0,"647":0,"648":0,"651":0,"652":0,"653":0,"655":0,"658":0,"659":0,"661":0,"664":0,"665":0,"669":0,"670":0,"671":0,"674":0,"677":0,"699":0,"702":0,"709":0,"710":0,"711":0,"712":0,"717":0,"718":0,"719":0,"726":0};
_yuitest_coverage["build/transition/transition.js"].functions = {"Transition:43":0,"(anonymous 2):48":0,"_toCamel:47":0,"(anonymous 3):56":0,"_toHyphen:55":0,"(anonymous 4):78":0,"init:125":0,"(anonymous 5):208":0,"addProperty:147":0,"removeProperty:217":0,"initAttrs:228":0,"run:257":0,"_start:284":0,"_prepDur:288":0,"_runNative:294":0,"(anonymous 6):373":0,"(anonymous 7):383":0,"_end:355":0,"_endNative:391":0,"_onNativeEnd:403":0,"destroy:438":0,"transition:477":0,"show:521":0,"show:536":0,"(anonymous 8):551":0,"_wrapCallBack:550":0,"hide:561":0,"hide:583":0,"transition:621":0,"toggleView:633":0,"toggleView:664":0,"height:698":0,"width:701":0,"start:708":0,"end:716":0,"(anonymous 1):1":0};
_yuitest_coverage["build/transition/transition.js"].coveredLines = 269;
_yuitest_coverage["build/transition/transition.js"].coveredFunctions = 36;
_yuitest_coverline("build/transition/transition.js", 1);
YUI.add('transition', function (Y, NAME) {

/**
* Provides the transition method for Node.
* Transition has no API of its own, but adds the transition method to Node.
*
* @module transition
* @requires node-style
*/

_yuitest_coverfunc("build/transition/transition.js", "(anonymous 1)", 1);
_yuitest_coverline("build/transition/transition.js", 11);
var CAMEL_VENDOR_PREFIX = '',
    VENDOR_PREFIX = '',
    DOCUMENT = Y.config.doc,
    DOCUMENT_ELEMENT = 'documentElement',
    TRANSITION_CAMEL = 'transition',
    TRANSITION_PROPERTY_CAMEL = 'transitionProperty',
    TRANSFORM_CAMEL = 'transform',
    TRANSITION_PROPERTY,
    TRANSITION_DURATION,
    TRANSITION_TIMING_FUNCTION,
    TRANSITION_DELAY,
    TRANSITION_END,
    ON_TRANSITION_END,

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
    _yuitest_coverfunc("build/transition/transition.js", "Transition", 43);
_yuitest_coverline("build/transition/transition.js", 44);
this.init.apply(this, arguments);
};

_yuitest_coverline("build/transition/transition.js", 47);
Transition._toCamel = function(property) {
    _yuitest_coverfunc("build/transition/transition.js", "_toCamel", 47);
_yuitest_coverline("build/transition/transition.js", 48);
property = property.replace(/-([a-z])/gi, function(m0, m1) {
        _yuitest_coverfunc("build/transition/transition.js", "(anonymous 2)", 48);
_yuitest_coverline("build/transition/transition.js", 49);
return m1.toUpperCase();
    });

    _yuitest_coverline("build/transition/transition.js", 52);
return property;
};

_yuitest_coverline("build/transition/transition.js", 55);
Transition._toHyphen = function(property) {
    _yuitest_coverfunc("build/transition/transition.js", "_toHyphen", 55);
_yuitest_coverline("build/transition/transition.js", 56);
property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {
        _yuitest_coverfunc("build/transition/transition.js", "(anonymous 3)", 56);
_yuitest_coverline("build/transition/transition.js", 57);
var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;

        _yuitest_coverline("build/transition/transition.js", 59);
if (m3) {
            _yuitest_coverline("build/transition/transition.js", 60);
str += '-' + m3.toLowerCase();
        }

        _yuitest_coverline("build/transition/transition.js", 63);
return str;
    });

    _yuitest_coverline("build/transition/transition.js", 66);
return property;
};

_yuitest_coverline("build/transition/transition.js", 69);
Transition.SHOW_TRANSITION = 'fadeIn';
_yuitest_coverline("build/transition/transition.js", 70);
Transition.HIDE_TRANSITION = 'fadeOut';

_yuitest_coverline("build/transition/transition.js", 72);
Transition.useNative = false;

_yuitest_coverline("build/transition/transition.js", 74);
if ('transition' in DOCUMENT[DOCUMENT_ELEMENT].style) {
    _yuitest_coverline("build/transition/transition.js", 75);
Transition.useNative = true;
    _yuitest_coverline("build/transition/transition.js", 76);
Transition.supported = true; // TODO: remove
} else {
    _yuitest_coverline("build/transition/transition.js", 78);
Y.Array.each(VENDORS, function(val) { // then vendor specific
        _yuitest_coverfunc("build/transition/transition.js", "(anonymous 4)", 78);
_yuitest_coverline("build/transition/transition.js", 79);
var property = val + 'Transition';
        _yuitest_coverline("build/transition/transition.js", 80);
if (property in DOCUMENT[DOCUMENT_ELEMENT].style) {
            _yuitest_coverline("build/transition/transition.js", 81);
CAMEL_VENDOR_PREFIX = val;
            _yuitest_coverline("build/transition/transition.js", 82);
VENDOR_PREFIX       = Transition._toHyphen(val) + '-';

            _yuitest_coverline("build/transition/transition.js", 84);
Transition.useNative = true;
            _yuitest_coverline("build/transition/transition.js", 85);
Transition.supported = true; // TODO: remove
            _yuitest_coverline("build/transition/transition.js", 86);
Transition._VENDOR_PREFIX = val;
        }
    });
}

_yuitest_coverline("build/transition/transition.js", 91);
if (CAMEL_VENDOR_PREFIX) {
    _yuitest_coverline("build/transition/transition.js", 92);
TRANSITION_CAMEL          = CAMEL_VENDOR_PREFIX + 'Transition';
    _yuitest_coverline("build/transition/transition.js", 93);
TRANSITION_PROPERTY_CAMEL = CAMEL_VENDOR_PREFIX + 'TransitionProperty';
    _yuitest_coverline("build/transition/transition.js", 94);
TRANSFORM_CAMEL           = CAMEL_VENDOR_PREFIX + 'Transform';
}

_yuitest_coverline("build/transition/transition.js", 97);
TRANSITION_PROPERTY        = VENDOR_PREFIX + 'transition-property';
_yuitest_coverline("build/transition/transition.js", 98);
TRANSITION_DURATION        = VENDOR_PREFIX + 'transition-duration';
_yuitest_coverline("build/transition/transition.js", 99);
TRANSITION_TIMING_FUNCTION = VENDOR_PREFIX + 'transition-timing-function';
_yuitest_coverline("build/transition/transition.js", 100);
TRANSITION_DELAY           = VENDOR_PREFIX + 'transition-delay';

_yuitest_coverline("build/transition/transition.js", 102);
TRANSITION_END    = 'transitionend';
_yuitest_coverline("build/transition/transition.js", 103);
ON_TRANSITION_END = 'on' + CAMEL_VENDOR_PREFIX.toLowerCase() + 'transitionend';
_yuitest_coverline("build/transition/transition.js", 104);
TRANSITION_END    = VENDOR_TRANSITION_END[CAMEL_VENDOR_PREFIX] || TRANSITION_END;

_yuitest_coverline("build/transition/transition.js", 106);
Transition.fx = {};
_yuitest_coverline("build/transition/transition.js", 107);
Transition.toggles = {};

_yuitest_coverline("build/transition/transition.js", 109);
Transition._hasEnd = {};

_yuitest_coverline("build/transition/transition.js", 111);
Transition._reKeywords = /^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;

_yuitest_coverline("build/transition/transition.js", 113);
Y.Node.DOM_EVENTS[TRANSITION_END] = 1;

_yuitest_coverline("build/transition/transition.js", 115);
Transition.NAME = 'transition';

_yuitest_coverline("build/transition/transition.js", 117);
Transition.DEFAULT_EASING = 'ease';
_yuitest_coverline("build/transition/transition.js", 118);
Transition.DEFAULT_DURATION = 0.5;
_yuitest_coverline("build/transition/transition.js", 119);
Transition.DEFAULT_DELAY = 0;

_yuitest_coverline("build/transition/transition.js", 121);
Transition._nodeAttrs = {};

_yuitest_coverline("build/transition/transition.js", 123);
Transition.prototype = {
    constructor: Transition,
    init: function(node, config) {
        _yuitest_coverfunc("build/transition/transition.js", "init", 125);
_yuitest_coverline("build/transition/transition.js", 126);
var anim = this;
        _yuitest_coverline("build/transition/transition.js", 127);
anim._node = node;
        _yuitest_coverline("build/transition/transition.js", 128);
if (!anim._running && config) {
            _yuitest_coverline("build/transition/transition.js", 129);
anim._config = config;
            _yuitest_coverline("build/transition/transition.js", 130);
node._transition = anim; // cache for reuse

            _yuitest_coverline("build/transition/transition.js", 132);
anim._duration = ('duration' in config) ?
                config.duration: anim.constructor.DEFAULT_DURATION;

            _yuitest_coverline("build/transition/transition.js", 135);
anim._delay = ('delay' in config) ?
                config.delay: anim.constructor.DEFAULT_DELAY;

            _yuitest_coverline("build/transition/transition.js", 138);
anim._easing = config.easing || anim.constructor.DEFAULT_EASING;
            _yuitest_coverline("build/transition/transition.js", 139);
anim._count = 0; // track number of animated properties
            _yuitest_coverline("build/transition/transition.js", 140);
anim._running = false;

        }

        _yuitest_coverline("build/transition/transition.js", 144);
return anim;
    },

    addProperty: function(prop, config) {
        _yuitest_coverfunc("build/transition/transition.js", "addProperty", 147);
_yuitest_coverline("build/transition/transition.js", 148);
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

        _yuitest_coverline("build/transition/transition.js", 159);
if (!attrs) {
            _yuitest_coverline("build/transition/transition.js", 160);
attrs = Transition._nodeAttrs[uid] = {};
        }

        _yuitest_coverline("build/transition/transition.js", 163);
attr = attrs[prop];

        // might just be a value
        _yuitest_coverline("build/transition/transition.js", 166);
if (config && config.value !== undefined) {
            _yuitest_coverline("build/transition/transition.js", 167);
val = config.value;
        } else {_yuitest_coverline("build/transition/transition.js", 168);
if (config !== undefined) {
            _yuitest_coverline("build/transition/transition.js", 169);
val = config;
            _yuitest_coverline("build/transition/transition.js", 170);
config = EMPTY_OBJ;
        }}

        _yuitest_coverline("build/transition/transition.js", 173);
if (typeof val === 'function') {
            _yuitest_coverline("build/transition/transition.js", 174);
val = val.call(nodeInstance, nodeInstance);
        }

        _yuitest_coverline("build/transition/transition.js", 177);
if (attr && attr.transition) {
            // take control if another transition owns this property
            _yuitest_coverline("build/transition/transition.js", 179);
if (attr.transition !== anim) {
                _yuitest_coverline("build/transition/transition.js", 180);
attr.transition._count--; // remapping attr to this transition
            }
        }

        _yuitest_coverline("build/transition/transition.js", 184);
anim._count++; // properties per transition

        // make 0 async and fire events
        _yuitest_coverline("build/transition/transition.js", 187);
dur = ((typeof config.duration !== 'undefined') ? config.duration :
                    anim._duration) || 0.0001;

        _yuitest_coverline("build/transition/transition.js", 190);
attrs[prop] = {
            value: val,
            duration: dur,
            delay: (typeof config.delay !== 'undefined') ? config.delay :
                    anim._delay,

            easing: config.easing || anim._easing,

            transition: anim
        };

        // native end event doesnt fire when setting to same value
        // supplementing with timer
        // val may be a string or number (height: 0, etc), but computedStyle is always string
        _yuitest_coverline("build/transition/transition.js", 204);
computed = Y.DOM.getComputedStyle(node, prop);
        _yuitest_coverline("build/transition/transition.js", 205);
compareVal = (typeof val === 'string') ? computed : parseFloat(computed);

        _yuitest_coverline("build/transition/transition.js", 207);
if (Transition.useNative && compareVal === val) {
            _yuitest_coverline("build/transition/transition.js", 208);
setTimeout(function() {
                _yuitest_coverfunc("build/transition/transition.js", "(anonymous 5)", 208);
_yuitest_coverline("build/transition/transition.js", 209);
anim._onNativeEnd.call(node, {
                    propertyName: prop,
                    elapsedTime: dur
                });
            }, dur * 1000);
        }
    },

    removeProperty: function(prop) {
        _yuitest_coverfunc("build/transition/transition.js", "removeProperty", 217);
_yuitest_coverline("build/transition/transition.js", 218);
var anim = this,
            attrs = Transition._nodeAttrs[Y.stamp(anim._node)];

        _yuitest_coverline("build/transition/transition.js", 221);
if (attrs && attrs[prop]) {
            _yuitest_coverline("build/transition/transition.js", 222);
delete attrs[prop];
            _yuitest_coverline("build/transition/transition.js", 223);
anim._count--;
        }

    },

    initAttrs: function(config) {
        _yuitest_coverfunc("build/transition/transition.js", "initAttrs", 228);
_yuitest_coverline("build/transition/transition.js", 229);
var attr,
            node = this._node;

        _yuitest_coverline("build/transition/transition.js", 232);
if (config.transform && !config[TRANSFORM_CAMEL]) {
            _yuitest_coverline("build/transition/transition.js", 233);
config[TRANSFORM_CAMEL] = config.transform;
            _yuitest_coverline("build/transition/transition.js", 234);
delete config.transform; // TODO: copy
        }

        _yuitest_coverline("build/transition/transition.js", 237);
for (attr in config) {
            _yuitest_coverline("build/transition/transition.js", 238);
if (config.hasOwnProperty(attr) && !Transition._reKeywords.test(attr)) {
                _yuitest_coverline("build/transition/transition.js", 239);
this.addProperty(attr, config[attr]);

                // when size is auto or % webkit starts from zero instead of computed
                // (https://bugs.webkit.org/show_bug.cgi?id=16020)
                // TODO: selective set
                _yuitest_coverline("build/transition/transition.js", 244);
if (node.style[attr] === '') {
                    _yuitest_coverline("build/transition/transition.js", 245);
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
        _yuitest_coverfunc("build/transition/transition.js", "run", 257);
_yuitest_coverline("build/transition/transition.js", 258);
var anim = this,
            node = anim._node,
            config = anim._config,
            data = {
                type: 'transition:start',
                config: config
            };


        _yuitest_coverline("build/transition/transition.js", 267);
if (!anim._running) {
            _yuitest_coverline("build/transition/transition.js", 268);
anim._running = true;

            _yuitest_coverline("build/transition/transition.js", 270);
if (config.on && config.on.start) {
                _yuitest_coverline("build/transition/transition.js", 271);
config.on.start.call(Y.one(node), data);
            }

            _yuitest_coverline("build/transition/transition.js", 274);
anim.initAttrs(anim._config);

            _yuitest_coverline("build/transition/transition.js", 276);
anim._callback = callback;
            _yuitest_coverline("build/transition/transition.js", 277);
anim._start();
        }


        _yuitest_coverline("build/transition/transition.js", 281);
return anim;
    },

    _start: function() {
        _yuitest_coverfunc("build/transition/transition.js", "_start", 284);
_yuitest_coverline("build/transition/transition.js", 285);
this._runNative();
    },

    _prepDur: function(dur) {
        _yuitest_coverfunc("build/transition/transition.js", "_prepDur", 288);
_yuitest_coverline("build/transition/transition.js", 289);
dur = parseFloat(dur) * 1000;

        _yuitest_coverline("build/transition/transition.js", 291);
return dur + 'ms';
    },

    _runNative: function() {
        _yuitest_coverfunc("build/transition/transition.js", "_runNative", 294);
_yuitest_coverline("build/transition/transition.js", 295);
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
        _yuitest_coverline("build/transition/transition.js", 313);
if (cssTransition !== 'all') {
            _yuitest_coverline("build/transition/transition.js", 314);
transitionText += cssTransition + ',';
            _yuitest_coverline("build/transition/transition.js", 315);
duration += computed[Transition._toCamel(TRANSITION_DURATION)] + ',';
            _yuitest_coverline("build/transition/transition.js", 316);
easing += computed[Transition._toCamel(TRANSITION_TIMING_FUNCTION)] + ',';
            _yuitest_coverline("build/transition/transition.js", 317);
delay += computed[Transition._toCamel(TRANSITION_DELAY)] + ',';

        }

        // run transitions mapped to this instance
        _yuitest_coverline("build/transition/transition.js", 322);
for (name in attrs) {
            _yuitest_coverline("build/transition/transition.js", 323);
hyphy = Transition._toHyphen(name);
            _yuitest_coverline("build/transition/transition.js", 324);
attr = attrs[name];
            _yuitest_coverline("build/transition/transition.js", 325);
if ((attr = attrs[name]) && attr.transition === anim) {
                _yuitest_coverline("build/transition/transition.js", 326);
if (name in node.style) { // only native styles allowed
                    _yuitest_coverline("build/transition/transition.js", 327);
duration += anim._prepDur(attr.duration) + ',';
                    _yuitest_coverline("build/transition/transition.js", 328);
delay += anim._prepDur(attr.delay) + ',';
                    _yuitest_coverline("build/transition/transition.js", 329);
easing += (attr.easing) + ',';

                    _yuitest_coverline("build/transition/transition.js", 331);
transitionText += hyphy + ',';
                    _yuitest_coverline("build/transition/transition.js", 332);
cssText += hyphy + ': ' + attr.value + '; ';
                } else {
                    _yuitest_coverline("build/transition/transition.js", 334);
this.removeProperty(name);
                }
            }
        }

        _yuitest_coverline("build/transition/transition.js", 339);
transitionText = transitionText.replace(/,$/, ';');
        _yuitest_coverline("build/transition/transition.js", 340);
duration = duration.replace(/,$/, ';');
        _yuitest_coverline("build/transition/transition.js", 341);
easing = easing.replace(/,$/, ';');
        _yuitest_coverline("build/transition/transition.js", 342);
delay = delay.replace(/,$/, ';');

        // only one native end event per node
        _yuitest_coverline("build/transition/transition.js", 345);
if (!Transition._hasEnd[uid]) {
            _yuitest_coverline("build/transition/transition.js", 346);
node.addEventListener(TRANSITION_END, anim._onNativeEnd, '');
            _yuitest_coverline("build/transition/transition.js", 347);
Transition._hasEnd[uid] = true;

        }

        _yuitest_coverline("build/transition/transition.js", 351);
style.cssText += transitionText + duration + easing + delay + cssText;

    },

    _end: function(elapsed) {
        _yuitest_coverfunc("build/transition/transition.js", "_end", 355);
_yuitest_coverline("build/transition/transition.js", 356);
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

        _yuitest_coverline("build/transition/transition.js", 368);
anim._running = false;
        _yuitest_coverline("build/transition/transition.js", 369);
anim._callback = null;

        _yuitest_coverline("build/transition/transition.js", 371);
if (node) {
            _yuitest_coverline("build/transition/transition.js", 372);
if (config.on && config.on.end) {
                _yuitest_coverline("build/transition/transition.js", 373);
setTimeout(function() { // IE: allow previous update to finish
                    _yuitest_coverfunc("build/transition/transition.js", "(anonymous 6)", 373);
_yuitest_coverline("build/transition/transition.js", 374);
config.on.end.call(nodeInstance, data);

                    // nested to ensure proper fire order
                    _yuitest_coverline("build/transition/transition.js", 377);
if (callback) {
                        _yuitest_coverline("build/transition/transition.js", 378);
callback.call(nodeInstance, data);
                    }

                }, 1);
            } else {_yuitest_coverline("build/transition/transition.js", 382);
if (callback) {
                _yuitest_coverline("build/transition/transition.js", 383);
setTimeout(function() { // IE: allow previous update to finish
                    _yuitest_coverfunc("build/transition/transition.js", "(anonymous 7)", 383);
_yuitest_coverline("build/transition/transition.js", 384);
callback.call(nodeInstance, data);
                }, 1);
            }}
        }

    },

    _endNative: function(name) {
        _yuitest_coverfunc("build/transition/transition.js", "_endNative", 391);
_yuitest_coverline("build/transition/transition.js", 392);
var node = this._node,
            value = node.ownerDocument.defaultView.getComputedStyle(node, '')[Transition._toCamel(TRANSITION_PROPERTY)];

        _yuitest_coverline("build/transition/transition.js", 395);
name = Transition._toHyphen(name);
        _yuitest_coverline("build/transition/transition.js", 396);
if (typeof value === 'string') {
            _yuitest_coverline("build/transition/transition.js", 397);
value = value.replace(new RegExp('(?:^|,\\s)' + name + ',?'), ',');
            _yuitest_coverline("build/transition/transition.js", 398);
value = value.replace(/^,|,$/, '');
            _yuitest_coverline("build/transition/transition.js", 399);
node.style[TRANSITION_CAMEL] = value;
        }
    },

    _onNativeEnd: function(e) {
        _yuitest_coverfunc("build/transition/transition.js", "_onNativeEnd", 403);
_yuitest_coverline("build/transition/transition.js", 404);
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

        _yuitest_coverline("build/transition/transition.js", 415);
if (anim) {
            _yuitest_coverline("build/transition/transition.js", 416);
anim.removeProperty(name);
            _yuitest_coverline("build/transition/transition.js", 417);
anim._endNative(name);
            _yuitest_coverline("build/transition/transition.js", 418);
config = anim._config[name];

            _yuitest_coverline("build/transition/transition.js", 420);
data = {
                type: 'propertyEnd',
                propertyName: name,
                elapsedTime: elapsed,
                config: config
            };

            _yuitest_coverline("build/transition/transition.js", 427);
if (config && config.on && config.on.end) {
                _yuitest_coverline("build/transition/transition.js", 428);
config.on.end.call(Y.one(node), data);
            }

            _yuitest_coverline("build/transition/transition.js", 431);
if (anim._count <= 0)  { // after propertyEnd fires
                _yuitest_coverline("build/transition/transition.js", 432);
anim._end(elapsed);
                _yuitest_coverline("build/transition/transition.js", 433);
node.style[TRANSITION_PROPERTY_CAMEL] = ''; // clean up style
            }
        }
    },

    destroy: function() {
        _yuitest_coverfunc("build/transition/transition.js", "destroy", 438);
_yuitest_coverline("build/transition/transition.js", 439);
var anim = this,
            node = anim._node;

        _yuitest_coverline("build/transition/transition.js", 442);
if (node) {
            _yuitest_coverline("build/transition/transition.js", 443);
node.removeEventListener(TRANSITION_END, anim._onNativeEnd, false);
            _yuitest_coverline("build/transition/transition.js", 444);
anim._node = null;
        }
    }
};

_yuitest_coverline("build/transition/transition.js", 449);
Y.Transition = Transition;
_yuitest_coverline("build/transition/transition.js", 450);
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
_yuitest_coverline("build/transition/transition.js", 477);
Y.Node.prototype.transition = function(name, config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "transition", 477);
_yuitest_coverline("build/transition/transition.js", 478);
var
        transitionAttrs = Transition._nodeAttrs[Y.stamp(this._node)],
        anim = (transitionAttrs) ? transitionAttrs.transition || null : null,
        fxConfig,
        prop;

    _yuitest_coverline("build/transition/transition.js", 484);
if (typeof name === 'string') { // named effect, pull config from registry
        _yuitest_coverline("build/transition/transition.js", 485);
if (typeof config === 'function') {
            _yuitest_coverline("build/transition/transition.js", 486);
callback = config;
            _yuitest_coverline("build/transition/transition.js", 487);
config = null;
        }

        _yuitest_coverline("build/transition/transition.js", 490);
fxConfig = Transition.fx[name];

        _yuitest_coverline("build/transition/transition.js", 492);
if (config && typeof config !== 'boolean') {
            _yuitest_coverline("build/transition/transition.js", 493);
config = Y.clone(config);

            _yuitest_coverline("build/transition/transition.js", 495);
for (prop in fxConfig) {
                _yuitest_coverline("build/transition/transition.js", 496);
if (fxConfig.hasOwnProperty(prop)) {
                    _yuitest_coverline("build/transition/transition.js", 497);
if (! (prop in config)) {
                        _yuitest_coverline("build/transition/transition.js", 498);
config[prop] = fxConfig[prop];
                    }
                }
            }
        } else {
            _yuitest_coverline("build/transition/transition.js", 503);
config = fxConfig;
        }

    } else { // name is a config, config is a callback or undefined
        _yuitest_coverline("build/transition/transition.js", 507);
callback = config;
        _yuitest_coverline("build/transition/transition.js", 508);
config = name;
    }

    _yuitest_coverline("build/transition/transition.js", 511);
if (anim && !anim._running) {
        _yuitest_coverline("build/transition/transition.js", 512);
anim.init(this, config);
    } else {
        _yuitest_coverline("build/transition/transition.js", 514);
anim = new Transition(this._node, config);
    }

    _yuitest_coverline("build/transition/transition.js", 517);
anim.run(callback);
    _yuitest_coverline("build/transition/transition.js", 518);
return this;
};

_yuitest_coverline("build/transition/transition.js", 521);
Y.Node.prototype.show = function(name, config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "show", 521);
_yuitest_coverline("build/transition/transition.js", 522);
this._show(); // show prior to transition
    _yuitest_coverline("build/transition/transition.js", 523);
if (name && Y.Transition) {
        _yuitest_coverline("build/transition/transition.js", 524);
if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default
            _yuitest_coverline("build/transition/transition.js", 525);
if (typeof config === 'function') {
                _yuitest_coverline("build/transition/transition.js", 526);
callback = config;
                _yuitest_coverline("build/transition/transition.js", 527);
config = name;
            }
            _yuitest_coverline("build/transition/transition.js", 529);
name = Transition.SHOW_TRANSITION;
        }
        _yuitest_coverline("build/transition/transition.js", 531);
this.transition(name, config, callback);
    }
    _yuitest_coverline("build/transition/transition.js", 533);
return this;
};

_yuitest_coverline("build/transition/transition.js", 536);
Y.NodeList.prototype.show = function(name, config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "show", 536);
_yuitest_coverline("build/transition/transition.js", 537);
var nodes = this._nodes,
        i = 0,
        node;

    _yuitest_coverline("build/transition/transition.js", 541);
while ((node = nodes[i++])) {
        _yuitest_coverline("build/transition/transition.js", 542);
Y.one(node).show(name, config, callback);
    }

    _yuitest_coverline("build/transition/transition.js", 545);
return this;
};



_yuitest_coverline("build/transition/transition.js", 550);
var _wrapCallBack = function(anim, fn, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "_wrapCallBack", 550);
_yuitest_coverline("build/transition/transition.js", 551);
return function() {
        _yuitest_coverfunc("build/transition/transition.js", "(anonymous 8)", 551);
_yuitest_coverline("build/transition/transition.js", 552);
if (fn) {
            _yuitest_coverline("build/transition/transition.js", 553);
fn.call(anim);
        }
        _yuitest_coverline("build/transition/transition.js", 555);
if (callback && typeof callback === 'function') {
            _yuitest_coverline("build/transition/transition.js", 556);
callback.apply(anim._node, arguments);
        }
    };
};

_yuitest_coverline("build/transition/transition.js", 561);
Y.Node.prototype.hide = function(name, config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "hide", 561);
_yuitest_coverline("build/transition/transition.js", 562);
if (name && Y.Transition) {
        _yuitest_coverline("build/transition/transition.js", 563);
if (typeof config === 'function') {
            _yuitest_coverline("build/transition/transition.js", 564);
callback = config;
            _yuitest_coverline("build/transition/transition.js", 565);
config = null;
        }

        _yuitest_coverline("build/transition/transition.js", 568);
callback = _wrapCallBack(this, this._hide, callback); // wrap with existing callback
        _yuitest_coverline("build/transition/transition.js", 569);
if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default
            _yuitest_coverline("build/transition/transition.js", 570);
if (typeof config === 'function') {
                _yuitest_coverline("build/transition/transition.js", 571);
callback = config;
                _yuitest_coverline("build/transition/transition.js", 572);
config = name;
            }
            _yuitest_coverline("build/transition/transition.js", 574);
name = Transition.HIDE_TRANSITION;
        }
        _yuitest_coverline("build/transition/transition.js", 576);
this.transition(name, config, callback);
    } else {
        _yuitest_coverline("build/transition/transition.js", 578);
this._hide();
    }
    _yuitest_coverline("build/transition/transition.js", 580);
return this;
};

_yuitest_coverline("build/transition/transition.js", 583);
Y.NodeList.prototype.hide = function(name, config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "hide", 583);
_yuitest_coverline("build/transition/transition.js", 584);
var nodes = this._nodes,
        i = 0,
        node;

    _yuitest_coverline("build/transition/transition.js", 588);
while ((node = nodes[i++])) {
        _yuitest_coverline("build/transition/transition.js", 589);
Y.one(node).hide(name, config, callback);
    }

    _yuitest_coverline("build/transition/transition.js", 592);
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
_yuitest_coverline("build/transition/transition.js", 621);
Y.NodeList.prototype.transition = function(config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "transition", 621);
_yuitest_coverline("build/transition/transition.js", 622);
var nodes = this._nodes,
        i = 0,
        node;

    _yuitest_coverline("build/transition/transition.js", 626);
while ((node = nodes[i++])) {
        _yuitest_coverline("build/transition/transition.js", 627);
Y.one(node).transition(config, callback);
    }

    _yuitest_coverline("build/transition/transition.js", 630);
return this;
};

_yuitest_coverline("build/transition/transition.js", 633);
Y.Node.prototype.toggleView = function(name, on, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "toggleView", 633);
_yuitest_coverline("build/transition/transition.js", 634);
this._toggles = this._toggles || [];
    _yuitest_coverline("build/transition/transition.js", 635);
callback = arguments[arguments.length - 1];

    _yuitest_coverline("build/transition/transition.js", 637);
if (typeof name !== 'string') { // no transition, just toggle
        _yuitest_coverline("build/transition/transition.js", 638);
on = name;
        _yuitest_coverline("build/transition/transition.js", 639);
this._toggleView(on, callback); // call original _toggleView in Y.Node
        _yuitest_coverline("build/transition/transition.js", 640);
return;
    }

    _yuitest_coverline("build/transition/transition.js", 643);
if (typeof on === 'function') { // Ignore "on" if used for callback argument.
        _yuitest_coverline("build/transition/transition.js", 644);
on = undefined;
    }

    _yuitest_coverline("build/transition/transition.js", 647);
if (typeof on === 'undefined' && name in this._toggles) { // reverse current toggle
        _yuitest_coverline("build/transition/transition.js", 648);
on = ! this._toggles[name];
    }

    _yuitest_coverline("build/transition/transition.js", 651);
on = (on) ? 1 : 0;
    _yuitest_coverline("build/transition/transition.js", 652);
if (on) {
        _yuitest_coverline("build/transition/transition.js", 653);
this._show();
    }  else {
        _yuitest_coverline("build/transition/transition.js", 655);
callback = _wrapCallBack(this, this._hide, callback);
    }

    _yuitest_coverline("build/transition/transition.js", 658);
this._toggles[name] = on;
    _yuitest_coverline("build/transition/transition.js", 659);
this.transition(Y.Transition.toggles[name][on], callback);

    _yuitest_coverline("build/transition/transition.js", 661);
return this;
};

_yuitest_coverline("build/transition/transition.js", 664);
Y.NodeList.prototype.toggleView = function(name, on, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "toggleView", 664);
_yuitest_coverline("build/transition/transition.js", 665);
var nodes = this._nodes,
        i = 0,
        node;

    _yuitest_coverline("build/transition/transition.js", 669);
while ((node = nodes[i++])) {
        _yuitest_coverline("build/transition/transition.js", 670);
node = Y.one(node);
        _yuitest_coverline("build/transition/transition.js", 671);
node.toggleView.apply(node, arguments);
    }

    _yuitest_coverline("build/transition/transition.js", 674);
return this;
};

_yuitest_coverline("build/transition/transition.js", 677);
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
            _yuitest_coverfunc("build/transition/transition.js", "height", 698);
_yuitest_coverline("build/transition/transition.js", 699);
return node.get('scrollHeight') + 'px';
        },
        width: function(node) {
            _yuitest_coverfunc("build/transition/transition.js", "width", 701);
_yuitest_coverline("build/transition/transition.js", 702);
return node.get('scrollWidth') + 'px';
        },
        duration: 0.5,
        easing: 'ease-in',

        on: {
            start: function() {
                _yuitest_coverfunc("build/transition/transition.js", "start", 708);
_yuitest_coverline("build/transition/transition.js", 709);
var overflow = this.getStyle('overflow');
                _yuitest_coverline("build/transition/transition.js", 710);
if (overflow !== 'hidden') { // enable scrollHeight/Width
                    _yuitest_coverline("build/transition/transition.js", 711);
this.setStyle('overflow', 'hidden');
                    _yuitest_coverline("build/transition/transition.js", 712);
this._transitionOverflow = overflow;
                }
            },

            end: function() {
                _yuitest_coverfunc("build/transition/transition.js", "end", 716);
_yuitest_coverline("build/transition/transition.js", 717);
if (this._transitionOverflow) { // revert overridden value
                    _yuitest_coverline("build/transition/transition.js", 718);
this.setStyle('overflow', this._transitionOverflow);
                    _yuitest_coverline("build/transition/transition.js", 719);
delete this._transitionOverflow;
                }
            }
        }
    }
});

_yuitest_coverline("build/transition/transition.js", 726);
Y.mix(Transition.toggles, {
    size: ['sizeOut', 'sizeIn'],
    fade: ['fadeOut', 'fadeIn']
});


}, '@VERSION@', {"requires": ["node-style"]});
