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
_yuitest_coverage["build/transition/transition.js"].code=["YUI.add('transition', function (Y, NAME) {","","/**","* Provides the transition method for Node.","* Transition has no API of its own, but adds the transition method to Node.","*","* @module transition","* @requires node-style","*/","","var CAMEL_VENDOR_PREFIX = '',","    VENDOR_PREFIX = '',","    DOCUMENT = Y.config.doc,","    DOCUMENT_ELEMENT = 'documentElement',","    DOCUMENT_STYLE = DOCUMENT[DOCUMENT_ELEMENT].style,","    TRANSITION_CAMEL = 'transition',","    TRANSITION_PROPERTY_CAMEL = 'transitionProperty',","    TRANSITION_PROPERTY,","    TRANSITION_DURATION,","    TRANSITION_TIMING_FUNCTION,","    TRANSITION_DELAY,","    TRANSITION_END,","    ON_TRANSITION_END,","","    EMPTY_OBJ = {},","","    VENDORS = [","        'Webkit',","        'Moz'","    ],","","    VENDOR_TRANSITION_END = {","        Webkit: 'webkitTransitionEnd'","    },","","/**"," * A class for constructing transition instances."," * Adds the \"transition\" method to Node."," * @class Transition"," * @constructor"," */","","Transition = function() {","    this.init.apply(this, arguments);","};","","// One off handling of transform-prefixing.","Transition._TRANSFORM = 'transform';","","Transition._toCamel = function(property) {","    property = property.replace(/-([a-z])/gi, function(m0, m1) {","        return m1.toUpperCase();","    });","","    return property;","};","","Transition._toHyphen = function(property) {","    property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {","        var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;","","        if (m3) {","            str += '-' + m3.toLowerCase();","        }","","        return str;","    });","","    return property;","};","","Transition.SHOW_TRANSITION = 'fadeIn';","Transition.HIDE_TRANSITION = 'fadeOut';","","Transition.useNative = false;","","// Map transition properties to vendor-specific versions.","if ('transition' in DOCUMENT_STYLE ","    && 'transitionProperty' in DOCUMENT_STYLE ","    && 'transitionDuration' in DOCUMENT_STYLE","    && 'transitionTimingFunction' in DOCUMENT_STYLE","    && 'transitionDelay' in DOCUMENT_STYLE) {","    Transition.useNative = true;","    Transition.supported = true; // TODO: remove","} else {","    Y.Array.each(VENDORS, function(val) { // then vendor specific","        var property = val + 'Transition';","        if (property in DOCUMENT[DOCUMENT_ELEMENT].style) {","            CAMEL_VENDOR_PREFIX = val;","            VENDOR_PREFIX       = Transition._toHyphen(val) + '-';","","            Transition.useNative = true;","            Transition.supported = true; // TODO: remove","            Transition._VENDOR_PREFIX = val;","        }","    });","}","","// Map transform property to vendor-specific versions.","// One-off required for cssText injection.","if (typeof DOCUMENT_STYLE.transform === 'undefined') {","    Y.Array.each(VENDORS, function(val) { // then vendor specific","        var property = val + 'Transform';","        if (typeof DOCUMENT_STYLE[property] !== 'undefined') {","            Transition._TRANSFORM = property;","        }","    });","}","","if (CAMEL_VENDOR_PREFIX) {","    TRANSITION_CAMEL          = CAMEL_VENDOR_PREFIX + 'Transition';","    TRANSITION_PROPERTY_CAMEL = CAMEL_VENDOR_PREFIX + 'TransitionProperty';","}","","TRANSITION_PROPERTY        = VENDOR_PREFIX + 'transition-property';","TRANSITION_DURATION        = VENDOR_PREFIX + 'transition-duration';","TRANSITION_TIMING_FUNCTION = VENDOR_PREFIX + 'transition-timing-function';","TRANSITION_DELAY           = VENDOR_PREFIX + 'transition-delay';","","TRANSITION_END    = 'transitionend';","ON_TRANSITION_END = 'on' + CAMEL_VENDOR_PREFIX.toLowerCase() + 'transitionend';","TRANSITION_END    = VENDOR_TRANSITION_END[CAMEL_VENDOR_PREFIX] || TRANSITION_END;","","Transition.fx = {};","Transition.toggles = {};","","Transition._hasEnd = {};","","Transition._reKeywords = /^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;","","Y.Node.DOM_EVENTS[TRANSITION_END] = 1;","","Transition.NAME = 'transition';","","Transition.DEFAULT_EASING = 'ease';","Transition.DEFAULT_DURATION = 0.5;","Transition.DEFAULT_DELAY = 0;","","Transition._nodeAttrs = {};","","Transition.prototype = {","    constructor: Transition,","    init: function(node, config) {","        var anim = this;","        anim._node = node;","        if (!anim._running && config) {","            anim._config = config;","            node._transition = anim; // cache for reuse","","            anim._duration = ('duration' in config) ?","                config.duration: anim.constructor.DEFAULT_DURATION;","","            anim._delay = ('delay' in config) ?","                config.delay: anim.constructor.DEFAULT_DELAY;","","            anim._easing = config.easing || anim.constructor.DEFAULT_EASING;","            anim._count = 0; // track number of animated properties","            anim._running = false;","","        }","","        return anim;","    },","","    addProperty: function(prop, config) {","        var anim = this,","            node = this._node,","            uid = Y.stamp(node),","            nodeInstance = Y.one(node),","            attrs = Transition._nodeAttrs[uid],","            computed,","            compareVal,","            dur,","            attr,","            val;","","        if (!attrs) {","            attrs = Transition._nodeAttrs[uid] = {};","        }","","        attr = attrs[prop];","","        // might just be a value","        if (config && config.value !== undefined) {","            val = config.value;","        } else if (config !== undefined) {","            val = config;","            config = EMPTY_OBJ;","        }","","        if (typeof val === 'function') {","            val = val.call(nodeInstance, nodeInstance);","        }","","        if (attr && attr.transition) {","            // take control if another transition owns this property","            if (attr.transition !== anim) {","                attr.transition._count--; // remapping attr to this transition","            }","        }","","        anim._count++; // properties per transition","","        // make 0 async and fire events","        dur = ((typeof config.duration !== 'undefined') ? config.duration :","                    anim._duration) || 0.0001;","","        attrs[prop] = {","            value: val,","            duration: dur,","            delay: (typeof config.delay !== 'undefined') ? config.delay :","                    anim._delay,","","            easing: config.easing || anim._easing,","","            transition: anim","        };","","        // native end event doesnt fire when setting to same value","        // supplementing with timer","        // val may be a string or number (height: 0, etc), but computedStyle is always string","        computed = Y.DOM.getComputedStyle(node, prop);","        compareVal = (typeof val === 'string') ? computed : parseFloat(computed);","","        if (Transition.useNative && compareVal === val) {","            setTimeout(function() {","                anim._onNativeEnd.call(node, {","                    propertyName: prop,","                    elapsedTime: dur","                });","            }, dur * 1000);","        }","    },","","    removeProperty: function(prop) {","        var anim = this,","            attrs = Transition._nodeAttrs[Y.stamp(anim._node)];","","        if (attrs && attrs[prop]) {","            delete attrs[prop];","            anim._count--;","        }","","    },","","    initAttrs: function(config) {","        var attr,","            node = this._node;","","        if (config.transform && !config[Transition._TRANSFORM]) {","            config[Transition._TRANSFORM] = config.transform;","            delete config.transform; // TODO: copy","        }","","        for (attr in config) {","            if (config.hasOwnProperty(attr) && !Transition._reKeywords.test(attr)) {","                this.addProperty(attr, config[attr]);","","                // when size is auto or % webkit starts from zero instead of computed","                // (https://bugs.webkit.org/show_bug.cgi?id=16020)","                // TODO: selective set","                if (node.style[attr] === '') {","                    Y.DOM.setStyle(node, attr, Y.DOM.getComputedStyle(node, attr));","                }","            }","        }","    },","","    /**","     * Starts or an animation.","     * @method run","     * @chainable","     * @private","     */","    run: function(callback) {","        var anim = this,","            node = anim._node,","            config = anim._config,","            data = {","                type: 'transition:start',","                config: config","            };","","","        if (!anim._running) {","            anim._running = true;","","            if (config.on && config.on.start) {","                config.on.start.call(Y.one(node), data);","            }","","            anim.initAttrs(anim._config);","","            anim._callback = callback;","            anim._start();","        }","","","        return anim;","    },","","    _start: function() {","        this._runNative();","    },","","    _prepDur: function(dur) {","        dur = parseFloat(dur) * 1000;","","        return dur + 'ms';","    },","","    _runNative: function() {","        var anim = this,","            node = anim._node,","            uid = Y.stamp(node),","            style = node.style,","            computed = node.ownerDocument.defaultView.getComputedStyle(node),","            attrs = Transition._nodeAttrs[uid],","            cssText = '',","            cssTransition = computed[Transition._toCamel(TRANSITION_PROPERTY)],","","            transitionText = TRANSITION_PROPERTY + ': ',","            duration = TRANSITION_DURATION + ': ',","            easing = TRANSITION_TIMING_FUNCTION + ': ',","            delay = TRANSITION_DELAY + ': ',","            hyphy,","            attr,","            name;","","        // preserve existing transitions","        if (cssTransition !== 'all') {","            transitionText += cssTransition + ',';","            duration += computed[Transition._toCamel(TRANSITION_DURATION)] + ',';","            easing += computed[Transition._toCamel(TRANSITION_TIMING_FUNCTION)] + ',';","            delay += computed[Transition._toCamel(TRANSITION_DELAY)] + ',';","","        }","","        // run transitions mapped to this instance","        for (name in attrs) {","            hyphy = Transition._toHyphen(name);","            attr = attrs[name];","            if ((attr = attrs[name]) && attr.transition === anim) {","                if (name in node.style) { // only native styles allowed","                    duration += anim._prepDur(attr.duration) + ',';","                    delay += anim._prepDur(attr.delay) + ',';","                    easing += (attr.easing) + ',';","","                    transitionText += hyphy + ',';","                    cssText += hyphy + ': ' + attr.value + '; ';","                } else {","                    this.removeProperty(name);","                }","            }","        }","","        transitionText = transitionText.replace(/,$/, ';');","        duration = duration.replace(/,$/, ';');","        easing = easing.replace(/,$/, ';');","        delay = delay.replace(/,$/, ';');","","        // only one native end event per node","        if (!Transition._hasEnd[uid]) {","            node.addEventListener(TRANSITION_END, anim._onNativeEnd, '');","            Transition._hasEnd[uid] = true;","","        }","","        style.cssText += transitionText + duration + easing + delay + cssText;","","    },","","    _end: function(elapsed) {","        var anim = this,","            node = anim._node,","            callback = anim._callback,","            config = anim._config,","            data = {","                type: 'transition:end',","                config: config,","                elapsedTime: elapsed","            },","","            nodeInstance = Y.one(node);","","        anim._running = false;","        anim._callback = null;","","        if (node) {","            if (config.on && config.on.end) {","                setTimeout(function() { // IE: allow previous update to finish","                    config.on.end.call(nodeInstance, data);","","                    // nested to ensure proper fire order","                    if (callback) {","                        callback.call(nodeInstance, data);","                    }","","                }, 1);","            } else if (callback) {","                setTimeout(function() { // IE: allow previous update to finish","                    callback.call(nodeInstance, data);","                }, 1);","            }","        }","","    },","","    _endNative: function(name) {","        var node = this._node,","            value = node.ownerDocument.defaultView.getComputedStyle(node, '')[Transition._toCamel(TRANSITION_PROPERTY)];","","        name = Transition._toHyphen(name);","        if (typeof value === 'string') {","            value = value.replace(new RegExp('(?:^|,\\\\s)' + name + ',?'), ',');","            value = value.replace(/^,|,$/, '');","            node.style[TRANSITION_CAMEL] = value;","        }","    },","","    _onNativeEnd: function(e) {","        var node = this,","            uid = Y.stamp(node),","            event = e,//e._event,","            name = Transition._toCamel(event.propertyName),","            elapsed = event.elapsedTime,","            attrs = Transition._nodeAttrs[uid],","            attr = attrs[name],","            anim = (attr) ? attr.transition : null,","            data,","            config;","","        if (anim) {","            anim.removeProperty(name);","            anim._endNative(name);","            config = anim._config[name];","","            data = {","                type: 'propertyEnd',","                propertyName: name,","                elapsedTime: elapsed,","                config: config","            };","","            if (config && config.on && config.on.end) {","                config.on.end.call(Y.one(node), data);","            }","","            if (anim._count <= 0)  { // after propertyEnd fires","                anim._end(elapsed);","                node.style[TRANSITION_PROPERTY_CAMEL] = ''; // clean up style","            }","        }","    },","","    destroy: function() {","        var anim = this,","            node = anim._node;","","        if (node) {","            node.removeEventListener(TRANSITION_END, anim._onNativeEnd, false);","            anim._node = null;","        }","    }","};","","Y.Transition = Transition;","Y.TransitionNative = Transition; // TODO: remove","","/**"," *   Animate one or more css properties to a given value. Requires the \"transition\" module."," *   <pre>example usage:"," *       Y.one('#demo').transition({"," *           duration: 1, // in seconds, default is 0.5"," *           easing: 'ease-out', // default is 'ease'"," *           delay: '1', // delay start for 1 second, default is 0"," *"," *           height: '10px',"," *           width: '10px',"," *"," *           opacity: { // per property"," *               value: 0,"," *               duration: 2,"," *               delay: 2,"," *               easing: 'ease-in'"," *           }"," *       });"," *   </pre>"," *   @for Node"," *   @method transition"," *   @param {Object} config An object containing one or more style properties, a duration and an easing."," *   @param {Function} callback A function to run after the transition has completed."," *   @chainable","*/","Y.Node.prototype.transition = function(name, config, callback) {","    var","        transitionAttrs = Transition._nodeAttrs[Y.stamp(this._node)],","        anim = (transitionAttrs) ? transitionAttrs.transition || null : null,","        fxConfig,","        prop;","","    if (typeof name === 'string') { // named effect, pull config from registry","        if (typeof config === 'function') {","            callback = config;","            config = null;","        }","","        fxConfig = Transition.fx[name];","","        if (config && typeof config !== 'boolean') {","            config = Y.clone(config);","","            for (prop in fxConfig) {","                if (fxConfig.hasOwnProperty(prop)) {","                    if (! (prop in config)) {","                        config[prop] = fxConfig[prop];","                    }","                }","            }","        } else {","            config = fxConfig;","        }","","    } else { // name is a config, config is a callback or undefined","        callback = config;","        config = name;","    }","","    if (anim && !anim._running) {","        anim.init(this, config);","    } else {","        anim = new Transition(this._node, config);","    }","","    anim.run(callback);","    return this;","};","","Y.Node.prototype.show = function(name, config, callback) {","    this._show(); // show prior to transition","    if (name && Y.Transition) {","        if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default","            if (typeof config === 'function') {","                callback = config;","                config = name;","            }","            name = Transition.SHOW_TRANSITION;","        }","        this.transition(name, config, callback);","    }","    return this;","};","","Y.NodeList.prototype.show = function(name, config, callback) {","    var nodes = this._nodes,","        i = 0,","        node;","","    while ((node = nodes[i++])) {","        Y.one(node).show(name, config, callback);","    }","","    return this;","};","","","","var _wrapCallBack = function(anim, fn, callback) {","    return function() {","        if (fn) {","            fn.call(anim);","        }","        if (callback && typeof callback === 'function') {","            callback.apply(anim._node, arguments);","        }","    };","};","","Y.Node.prototype.hide = function(name, config, callback) {","    if (name && Y.Transition) {","        if (typeof config === 'function') {","            callback = config;","            config = null;","        }","","        callback = _wrapCallBack(this, this._hide, callback); // wrap with existing callback","        if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default","            if (typeof config === 'function') {","                callback = config;","                config = name;","            }","            name = Transition.HIDE_TRANSITION;","        }","        this.transition(name, config, callback);","    } else {","        this._hide();","    }","    return this;","};","","Y.NodeList.prototype.hide = function(name, config, callback) {","    var nodes = this._nodes,","        i = 0,","        node;","","    while ((node = nodes[i++])) {","        Y.one(node).hide(name, config, callback);","    }","","    return this;","};","","/**"," *   Animate one or more css properties to a given value. Requires the \"transition\" module."," *   <pre>example usage:"," *       Y.all('.demo').transition({"," *           duration: 1, // in seconds, default is 0.5"," *           easing: 'ease-out', // default is 'ease'"," *           delay: '1', // delay start for 1 second, default is 0"," *"," *           height: '10px',"," *           width: '10px',"," *"," *           opacity: { // per property"," *               value: 0,"," *               duration: 2,"," *               delay: 2,"," *               easing: 'ease-in'"," *           }"," *       });"," *   </pre>"," *   @for NodeList"," *   @method transition"," *   @param {Object} config An object containing one or more style properties, a duration and an easing."," *   @param {Function} callback A function to run after the transition has completed. The callback fires"," *       once per item in the NodeList."," *   @chainable","*/","Y.NodeList.prototype.transition = function(config, callback) {","    var nodes = this._nodes,","        i = 0,","        node;","","    while ((node = nodes[i++])) {","        Y.one(node).transition(config, callback);","    }","","    return this;","};","","Y.Node.prototype.toggleView = function(name, on, callback) {","    this._toggles = this._toggles || [];","    callback = arguments[arguments.length - 1];","","    if (typeof name !== 'string') { // no transition, just toggle","        on = name;","        this._toggleView(on, callback); // call original _toggleView in Y.Node","        return;","    }","","    if (typeof on === 'function') { // Ignore \"on\" if used for callback argument.","        on = undefined;","    }","","    if (typeof on === 'undefined' && name in this._toggles) { // reverse current toggle","        on = ! this._toggles[name];","    }","","    on = (on) ? 1 : 0;","    if (on) {","        this._show();","    }  else {","        callback = _wrapCallBack(this, this._hide, callback);","    }","","    this._toggles[name] = on;","    this.transition(Y.Transition.toggles[name][on], callback);","","    return this;","};","","Y.NodeList.prototype.toggleView = function(name, on, callback) {","    var nodes = this._nodes,","        i = 0,","        node;","","    while ((node = nodes[i++])) {","        node = Y.one(node);","        node.toggleView.apply(node, arguments);","    }","","    return this;","};","","Y.mix(Transition.fx, {","    fadeOut: {","        opacity: 0,","        duration: 0.5,","        easing: 'ease-out'","    },","","    fadeIn: {","        opacity: 1,","        duration: 0.5,","        easing: 'ease-in'","    },","","    sizeOut: {","        height: 0,","        width: 0,","        duration: 0.75,","        easing: 'ease-out'","    },","","    sizeIn: {","        height: function(node) {","            return node.get('scrollHeight') + 'px';","        },","        width: function(node) {","            return node.get('scrollWidth') + 'px';","        },","        duration: 0.5,","        easing: 'ease-in',","","        on: {","            start: function() {","                var overflow = this.getStyle('overflow');","                if (overflow !== 'hidden') { // enable scrollHeight/Width","                    this.setStyle('overflow', 'hidden');","                    this._transitionOverflow = overflow;","                }","            },","","            end: function() {","                if (this._transitionOverflow) { // revert overridden value","                    this.setStyle('overflow', this._transitionOverflow);","                    delete this._transitionOverflow;","                }","            }","        }","    }","});","","Y.mix(Transition.toggles, {","    size: ['sizeOut', 'sizeIn'],","    fade: ['fadeOut', 'fadeIn']","});","","","}, '@VERSION@', {\"requires\": [\"node-style\"]});"];
_yuitest_coverage["build/transition/transition.js"].lines = {"1":0,"11":0,"44":0,"48":0,"50":0,"51":0,"52":0,"55":0,"58":0,"59":0,"60":0,"62":0,"63":0,"66":0,"69":0,"72":0,"73":0,"75":0,"78":0,"83":0,"84":0,"86":0,"87":0,"88":0,"89":0,"90":0,"92":0,"93":0,"94":0,"101":0,"102":0,"103":0,"104":0,"105":0,"110":0,"111":0,"112":0,"115":0,"116":0,"117":0,"118":0,"120":0,"121":0,"122":0,"124":0,"125":0,"127":0,"129":0,"131":0,"133":0,"135":0,"136":0,"137":0,"139":0,"141":0,"144":0,"145":0,"146":0,"147":0,"148":0,"150":0,"153":0,"156":0,"157":0,"158":0,"162":0,"166":0,"177":0,"178":0,"181":0,"184":0,"185":0,"186":0,"187":0,"188":0,"191":0,"192":0,"195":0,"197":0,"198":0,"202":0,"205":0,"208":0,"222":0,"223":0,"225":0,"226":0,"227":0,"236":0,"239":0,"240":0,"241":0,"247":0,"250":0,"251":0,"252":0,"255":0,"256":0,"257":0,"262":0,"263":0,"276":0,"285":0,"286":0,"288":0,"289":0,"292":0,"294":0,"295":0,"299":0,"303":0,"307":0,"309":0,"313":0,"331":0,"332":0,"333":0,"334":0,"335":0,"340":0,"341":0,"342":0,"343":0,"344":0,"345":0,"346":0,"347":0,"349":0,"350":0,"352":0,"357":0,"358":0,"359":0,"360":0,"363":0,"364":0,"365":0,"369":0,"374":0,"386":0,"387":0,"389":0,"390":0,"391":0,"392":0,"395":0,"396":0,"400":0,"401":0,"402":0,"410":0,"413":0,"414":0,"415":0,"416":0,"417":0,"422":0,"433":0,"434":0,"435":0,"436":0,"438":0,"445":0,"446":0,"449":0,"450":0,"451":0,"457":0,"460":0,"461":0,"462":0,"467":0,"468":0,"495":0,"496":0,"502":0,"503":0,"504":0,"505":0,"508":0,"510":0,"511":0,"513":0,"514":0,"515":0,"516":0,"521":0,"525":0,"526":0,"529":0,"530":0,"532":0,"535":0,"536":0,"539":0,"540":0,"541":0,"542":0,"543":0,"544":0,"545":0,"547":0,"549":0,"551":0,"554":0,"555":0,"559":0,"560":0,"563":0,"568":0,"569":0,"570":0,"571":0,"573":0,"574":0,"579":0,"580":0,"581":0,"582":0,"583":0,"586":0,"587":0,"588":0,"589":0,"590":0,"592":0,"594":0,"596":0,"598":0,"601":0,"602":0,"606":0,"607":0,"610":0,"639":0,"640":0,"644":0,"645":0,"648":0,"651":0,"652":0,"653":0,"655":0,"656":0,"657":0,"658":0,"661":0,"662":0,"665":0,"666":0,"669":0,"670":0,"671":0,"673":0,"676":0,"677":0,"679":0,"682":0,"683":0,"687":0,"688":0,"689":0,"692":0,"695":0,"717":0,"720":0,"727":0,"728":0,"729":0,"730":0,"735":0,"736":0,"737":0,"744":0};
_yuitest_coverage["build/transition/transition.js"].functions = {"Transition:43":0,"(anonymous 2):51":0,"_toCamel:50":0,"(anonymous 3):59":0,"_toHyphen:58":0,"(anonymous 4):86":0,"(anonymous 5):102":0,"init:143":0,"(anonymous 6):226":0,"addProperty:165":0,"removeProperty:235":0,"initAttrs:246":0,"run:275":0,"_start:302":0,"_prepDur:306":0,"_runNative:312":0,"(anonymous 7):391":0,"(anonymous 8):401":0,"_end:373":0,"_endNative:409":0,"_onNativeEnd:421":0,"destroy:456":0,"transition:495":0,"show:539":0,"show:554":0,"(anonymous 9):569":0,"_wrapCallBack:568":0,"hide:579":0,"hide:601":0,"transition:639":0,"toggleView:651":0,"toggleView:682":0,"height:716":0,"width:719":0,"start:726":0,"end:734":0,"(anonymous 1):1":0};
_yuitest_coverage["build/transition/transition.js"].coveredLines = 274;
_yuitest_coverage["build/transition/transition.js"].coveredFunctions = 37;
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
    DOCUMENT_STYLE = DOCUMENT[DOCUMENT_ELEMENT].style,
    TRANSITION_CAMEL = 'transition',
    TRANSITION_PROPERTY_CAMEL = 'transitionProperty',
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

// One off handling of transform-prefixing.
_yuitest_coverline("build/transition/transition.js", 48);
Transition._TRANSFORM = 'transform';

_yuitest_coverline("build/transition/transition.js", 50);
Transition._toCamel = function(property) {
    _yuitest_coverfunc("build/transition/transition.js", "_toCamel", 50);
_yuitest_coverline("build/transition/transition.js", 51);
property = property.replace(/-([a-z])/gi, function(m0, m1) {
        _yuitest_coverfunc("build/transition/transition.js", "(anonymous 2)", 51);
_yuitest_coverline("build/transition/transition.js", 52);
return m1.toUpperCase();
    });

    _yuitest_coverline("build/transition/transition.js", 55);
return property;
};

_yuitest_coverline("build/transition/transition.js", 58);
Transition._toHyphen = function(property) {
    _yuitest_coverfunc("build/transition/transition.js", "_toHyphen", 58);
_yuitest_coverline("build/transition/transition.js", 59);
property = property.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function(m0, m1, m2, m3) {
        _yuitest_coverfunc("build/transition/transition.js", "(anonymous 3)", 59);
_yuitest_coverline("build/transition/transition.js", 60);
var str = ((m1) ? '-' + m1.toLowerCase() : '') + m2;

        _yuitest_coverline("build/transition/transition.js", 62);
if (m3) {
            _yuitest_coverline("build/transition/transition.js", 63);
str += '-' + m3.toLowerCase();
        }

        _yuitest_coverline("build/transition/transition.js", 66);
return str;
    });

    _yuitest_coverline("build/transition/transition.js", 69);
return property;
};

_yuitest_coverline("build/transition/transition.js", 72);
Transition.SHOW_TRANSITION = 'fadeIn';
_yuitest_coverline("build/transition/transition.js", 73);
Transition.HIDE_TRANSITION = 'fadeOut';

_yuitest_coverline("build/transition/transition.js", 75);
Transition.useNative = false;

// Map transition properties to vendor-specific versions.
_yuitest_coverline("build/transition/transition.js", 78);
if ('transition' in DOCUMENT_STYLE 
    && 'transitionProperty' in DOCUMENT_STYLE 
    && 'transitionDuration' in DOCUMENT_STYLE
    && 'transitionTimingFunction' in DOCUMENT_STYLE
    && 'transitionDelay' in DOCUMENT_STYLE) {
    _yuitest_coverline("build/transition/transition.js", 83);
Transition.useNative = true;
    _yuitest_coverline("build/transition/transition.js", 84);
Transition.supported = true; // TODO: remove
} else {
    _yuitest_coverline("build/transition/transition.js", 86);
Y.Array.each(VENDORS, function(val) { // then vendor specific
        _yuitest_coverfunc("build/transition/transition.js", "(anonymous 4)", 86);
_yuitest_coverline("build/transition/transition.js", 87);
var property = val + 'Transition';
        _yuitest_coverline("build/transition/transition.js", 88);
if (property in DOCUMENT[DOCUMENT_ELEMENT].style) {
            _yuitest_coverline("build/transition/transition.js", 89);
CAMEL_VENDOR_PREFIX = val;
            _yuitest_coverline("build/transition/transition.js", 90);
VENDOR_PREFIX       = Transition._toHyphen(val) + '-';

            _yuitest_coverline("build/transition/transition.js", 92);
Transition.useNative = true;
            _yuitest_coverline("build/transition/transition.js", 93);
Transition.supported = true; // TODO: remove
            _yuitest_coverline("build/transition/transition.js", 94);
Transition._VENDOR_PREFIX = val;
        }
    });
}

// Map transform property to vendor-specific versions.
// One-off required for cssText injection.
_yuitest_coverline("build/transition/transition.js", 101);
if (typeof DOCUMENT_STYLE.transform === 'undefined') {
    _yuitest_coverline("build/transition/transition.js", 102);
Y.Array.each(VENDORS, function(val) { // then vendor specific
        _yuitest_coverfunc("build/transition/transition.js", "(anonymous 5)", 102);
_yuitest_coverline("build/transition/transition.js", 103);
var property = val + 'Transform';
        _yuitest_coverline("build/transition/transition.js", 104);
if (typeof DOCUMENT_STYLE[property] !== 'undefined') {
            _yuitest_coverline("build/transition/transition.js", 105);
Transition._TRANSFORM = property;
        }
    });
}

_yuitest_coverline("build/transition/transition.js", 110);
if (CAMEL_VENDOR_PREFIX) {
    _yuitest_coverline("build/transition/transition.js", 111);
TRANSITION_CAMEL          = CAMEL_VENDOR_PREFIX + 'Transition';
    _yuitest_coverline("build/transition/transition.js", 112);
TRANSITION_PROPERTY_CAMEL = CAMEL_VENDOR_PREFIX + 'TransitionProperty';
}

_yuitest_coverline("build/transition/transition.js", 115);
TRANSITION_PROPERTY        = VENDOR_PREFIX + 'transition-property';
_yuitest_coverline("build/transition/transition.js", 116);
TRANSITION_DURATION        = VENDOR_PREFIX + 'transition-duration';
_yuitest_coverline("build/transition/transition.js", 117);
TRANSITION_TIMING_FUNCTION = VENDOR_PREFIX + 'transition-timing-function';
_yuitest_coverline("build/transition/transition.js", 118);
TRANSITION_DELAY           = VENDOR_PREFIX + 'transition-delay';

_yuitest_coverline("build/transition/transition.js", 120);
TRANSITION_END    = 'transitionend';
_yuitest_coverline("build/transition/transition.js", 121);
ON_TRANSITION_END = 'on' + CAMEL_VENDOR_PREFIX.toLowerCase() + 'transitionend';
_yuitest_coverline("build/transition/transition.js", 122);
TRANSITION_END    = VENDOR_TRANSITION_END[CAMEL_VENDOR_PREFIX] || TRANSITION_END;

_yuitest_coverline("build/transition/transition.js", 124);
Transition.fx = {};
_yuitest_coverline("build/transition/transition.js", 125);
Transition.toggles = {};

_yuitest_coverline("build/transition/transition.js", 127);
Transition._hasEnd = {};

_yuitest_coverline("build/transition/transition.js", 129);
Transition._reKeywords = /^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;

_yuitest_coverline("build/transition/transition.js", 131);
Y.Node.DOM_EVENTS[TRANSITION_END] = 1;

_yuitest_coverline("build/transition/transition.js", 133);
Transition.NAME = 'transition';

_yuitest_coverline("build/transition/transition.js", 135);
Transition.DEFAULT_EASING = 'ease';
_yuitest_coverline("build/transition/transition.js", 136);
Transition.DEFAULT_DURATION = 0.5;
_yuitest_coverline("build/transition/transition.js", 137);
Transition.DEFAULT_DELAY = 0;

_yuitest_coverline("build/transition/transition.js", 139);
Transition._nodeAttrs = {};

_yuitest_coverline("build/transition/transition.js", 141);
Transition.prototype = {
    constructor: Transition,
    init: function(node, config) {
        _yuitest_coverfunc("build/transition/transition.js", "init", 143);
_yuitest_coverline("build/transition/transition.js", 144);
var anim = this;
        _yuitest_coverline("build/transition/transition.js", 145);
anim._node = node;
        _yuitest_coverline("build/transition/transition.js", 146);
if (!anim._running && config) {
            _yuitest_coverline("build/transition/transition.js", 147);
anim._config = config;
            _yuitest_coverline("build/transition/transition.js", 148);
node._transition = anim; // cache for reuse

            _yuitest_coverline("build/transition/transition.js", 150);
anim._duration = ('duration' in config) ?
                config.duration: anim.constructor.DEFAULT_DURATION;

            _yuitest_coverline("build/transition/transition.js", 153);
anim._delay = ('delay' in config) ?
                config.delay: anim.constructor.DEFAULT_DELAY;

            _yuitest_coverline("build/transition/transition.js", 156);
anim._easing = config.easing || anim.constructor.DEFAULT_EASING;
            _yuitest_coverline("build/transition/transition.js", 157);
anim._count = 0; // track number of animated properties
            _yuitest_coverline("build/transition/transition.js", 158);
anim._running = false;

        }

        _yuitest_coverline("build/transition/transition.js", 162);
return anim;
    },

    addProperty: function(prop, config) {
        _yuitest_coverfunc("build/transition/transition.js", "addProperty", 165);
_yuitest_coverline("build/transition/transition.js", 166);
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

        _yuitest_coverline("build/transition/transition.js", 177);
if (!attrs) {
            _yuitest_coverline("build/transition/transition.js", 178);
attrs = Transition._nodeAttrs[uid] = {};
        }

        _yuitest_coverline("build/transition/transition.js", 181);
attr = attrs[prop];

        // might just be a value
        _yuitest_coverline("build/transition/transition.js", 184);
if (config && config.value !== undefined) {
            _yuitest_coverline("build/transition/transition.js", 185);
val = config.value;
        } else {_yuitest_coverline("build/transition/transition.js", 186);
if (config !== undefined) {
            _yuitest_coverline("build/transition/transition.js", 187);
val = config;
            _yuitest_coverline("build/transition/transition.js", 188);
config = EMPTY_OBJ;
        }}

        _yuitest_coverline("build/transition/transition.js", 191);
if (typeof val === 'function') {
            _yuitest_coverline("build/transition/transition.js", 192);
val = val.call(nodeInstance, nodeInstance);
        }

        _yuitest_coverline("build/transition/transition.js", 195);
if (attr && attr.transition) {
            // take control if another transition owns this property
            _yuitest_coverline("build/transition/transition.js", 197);
if (attr.transition !== anim) {
                _yuitest_coverline("build/transition/transition.js", 198);
attr.transition._count--; // remapping attr to this transition
            }
        }

        _yuitest_coverline("build/transition/transition.js", 202);
anim._count++; // properties per transition

        // make 0 async and fire events
        _yuitest_coverline("build/transition/transition.js", 205);
dur = ((typeof config.duration !== 'undefined') ? config.duration :
                    anim._duration) || 0.0001;

        _yuitest_coverline("build/transition/transition.js", 208);
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
        _yuitest_coverline("build/transition/transition.js", 222);
computed = Y.DOM.getComputedStyle(node, prop);
        _yuitest_coverline("build/transition/transition.js", 223);
compareVal = (typeof val === 'string') ? computed : parseFloat(computed);

        _yuitest_coverline("build/transition/transition.js", 225);
if (Transition.useNative && compareVal === val) {
            _yuitest_coverline("build/transition/transition.js", 226);
setTimeout(function() {
                _yuitest_coverfunc("build/transition/transition.js", "(anonymous 6)", 226);
_yuitest_coverline("build/transition/transition.js", 227);
anim._onNativeEnd.call(node, {
                    propertyName: prop,
                    elapsedTime: dur
                });
            }, dur * 1000);
        }
    },

    removeProperty: function(prop) {
        _yuitest_coverfunc("build/transition/transition.js", "removeProperty", 235);
_yuitest_coverline("build/transition/transition.js", 236);
var anim = this,
            attrs = Transition._nodeAttrs[Y.stamp(anim._node)];

        _yuitest_coverline("build/transition/transition.js", 239);
if (attrs && attrs[prop]) {
            _yuitest_coverline("build/transition/transition.js", 240);
delete attrs[prop];
            _yuitest_coverline("build/transition/transition.js", 241);
anim._count--;
        }

    },

    initAttrs: function(config) {
        _yuitest_coverfunc("build/transition/transition.js", "initAttrs", 246);
_yuitest_coverline("build/transition/transition.js", 247);
var attr,
            node = this._node;

        _yuitest_coverline("build/transition/transition.js", 250);
if (config.transform && !config[Transition._TRANSFORM]) {
            _yuitest_coverline("build/transition/transition.js", 251);
config[Transition._TRANSFORM] = config.transform;
            _yuitest_coverline("build/transition/transition.js", 252);
delete config.transform; // TODO: copy
        }

        _yuitest_coverline("build/transition/transition.js", 255);
for (attr in config) {
            _yuitest_coverline("build/transition/transition.js", 256);
if (config.hasOwnProperty(attr) && !Transition._reKeywords.test(attr)) {
                _yuitest_coverline("build/transition/transition.js", 257);
this.addProperty(attr, config[attr]);

                // when size is auto or % webkit starts from zero instead of computed
                // (https://bugs.webkit.org/show_bug.cgi?id=16020)
                // TODO: selective set
                _yuitest_coverline("build/transition/transition.js", 262);
if (node.style[attr] === '') {
                    _yuitest_coverline("build/transition/transition.js", 263);
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
        _yuitest_coverfunc("build/transition/transition.js", "run", 275);
_yuitest_coverline("build/transition/transition.js", 276);
var anim = this,
            node = anim._node,
            config = anim._config,
            data = {
                type: 'transition:start',
                config: config
            };


        _yuitest_coverline("build/transition/transition.js", 285);
if (!anim._running) {
            _yuitest_coverline("build/transition/transition.js", 286);
anim._running = true;

            _yuitest_coverline("build/transition/transition.js", 288);
if (config.on && config.on.start) {
                _yuitest_coverline("build/transition/transition.js", 289);
config.on.start.call(Y.one(node), data);
            }

            _yuitest_coverline("build/transition/transition.js", 292);
anim.initAttrs(anim._config);

            _yuitest_coverline("build/transition/transition.js", 294);
anim._callback = callback;
            _yuitest_coverline("build/transition/transition.js", 295);
anim._start();
        }


        _yuitest_coverline("build/transition/transition.js", 299);
return anim;
    },

    _start: function() {
        _yuitest_coverfunc("build/transition/transition.js", "_start", 302);
_yuitest_coverline("build/transition/transition.js", 303);
this._runNative();
    },

    _prepDur: function(dur) {
        _yuitest_coverfunc("build/transition/transition.js", "_prepDur", 306);
_yuitest_coverline("build/transition/transition.js", 307);
dur = parseFloat(dur) * 1000;

        _yuitest_coverline("build/transition/transition.js", 309);
return dur + 'ms';
    },

    _runNative: function() {
        _yuitest_coverfunc("build/transition/transition.js", "_runNative", 312);
_yuitest_coverline("build/transition/transition.js", 313);
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
        _yuitest_coverline("build/transition/transition.js", 331);
if (cssTransition !== 'all') {
            _yuitest_coverline("build/transition/transition.js", 332);
transitionText += cssTransition + ',';
            _yuitest_coverline("build/transition/transition.js", 333);
duration += computed[Transition._toCamel(TRANSITION_DURATION)] + ',';
            _yuitest_coverline("build/transition/transition.js", 334);
easing += computed[Transition._toCamel(TRANSITION_TIMING_FUNCTION)] + ',';
            _yuitest_coverline("build/transition/transition.js", 335);
delay += computed[Transition._toCamel(TRANSITION_DELAY)] + ',';

        }

        // run transitions mapped to this instance
        _yuitest_coverline("build/transition/transition.js", 340);
for (name in attrs) {
            _yuitest_coverline("build/transition/transition.js", 341);
hyphy = Transition._toHyphen(name);
            _yuitest_coverline("build/transition/transition.js", 342);
attr = attrs[name];
            _yuitest_coverline("build/transition/transition.js", 343);
if ((attr = attrs[name]) && attr.transition === anim) {
                _yuitest_coverline("build/transition/transition.js", 344);
if (name in node.style) { // only native styles allowed
                    _yuitest_coverline("build/transition/transition.js", 345);
duration += anim._prepDur(attr.duration) + ',';
                    _yuitest_coverline("build/transition/transition.js", 346);
delay += anim._prepDur(attr.delay) + ',';
                    _yuitest_coverline("build/transition/transition.js", 347);
easing += (attr.easing) + ',';

                    _yuitest_coverline("build/transition/transition.js", 349);
transitionText += hyphy + ',';
                    _yuitest_coverline("build/transition/transition.js", 350);
cssText += hyphy + ': ' + attr.value + '; ';
                } else {
                    _yuitest_coverline("build/transition/transition.js", 352);
this.removeProperty(name);
                }
            }
        }

        _yuitest_coverline("build/transition/transition.js", 357);
transitionText = transitionText.replace(/,$/, ';');
        _yuitest_coverline("build/transition/transition.js", 358);
duration = duration.replace(/,$/, ';');
        _yuitest_coverline("build/transition/transition.js", 359);
easing = easing.replace(/,$/, ';');
        _yuitest_coverline("build/transition/transition.js", 360);
delay = delay.replace(/,$/, ';');

        // only one native end event per node
        _yuitest_coverline("build/transition/transition.js", 363);
if (!Transition._hasEnd[uid]) {
            _yuitest_coverline("build/transition/transition.js", 364);
node.addEventListener(TRANSITION_END, anim._onNativeEnd, '');
            _yuitest_coverline("build/transition/transition.js", 365);
Transition._hasEnd[uid] = true;

        }

        _yuitest_coverline("build/transition/transition.js", 369);
style.cssText += transitionText + duration + easing + delay + cssText;

    },

    _end: function(elapsed) {
        _yuitest_coverfunc("build/transition/transition.js", "_end", 373);
_yuitest_coverline("build/transition/transition.js", 374);
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

        _yuitest_coverline("build/transition/transition.js", 386);
anim._running = false;
        _yuitest_coverline("build/transition/transition.js", 387);
anim._callback = null;

        _yuitest_coverline("build/transition/transition.js", 389);
if (node) {
            _yuitest_coverline("build/transition/transition.js", 390);
if (config.on && config.on.end) {
                _yuitest_coverline("build/transition/transition.js", 391);
setTimeout(function() { // IE: allow previous update to finish
                    _yuitest_coverfunc("build/transition/transition.js", "(anonymous 7)", 391);
_yuitest_coverline("build/transition/transition.js", 392);
config.on.end.call(nodeInstance, data);

                    // nested to ensure proper fire order
                    _yuitest_coverline("build/transition/transition.js", 395);
if (callback) {
                        _yuitest_coverline("build/transition/transition.js", 396);
callback.call(nodeInstance, data);
                    }

                }, 1);
            } else {_yuitest_coverline("build/transition/transition.js", 400);
if (callback) {
                _yuitest_coverline("build/transition/transition.js", 401);
setTimeout(function() { // IE: allow previous update to finish
                    _yuitest_coverfunc("build/transition/transition.js", "(anonymous 8)", 401);
_yuitest_coverline("build/transition/transition.js", 402);
callback.call(nodeInstance, data);
                }, 1);
            }}
        }

    },

    _endNative: function(name) {
        _yuitest_coverfunc("build/transition/transition.js", "_endNative", 409);
_yuitest_coverline("build/transition/transition.js", 410);
var node = this._node,
            value = node.ownerDocument.defaultView.getComputedStyle(node, '')[Transition._toCamel(TRANSITION_PROPERTY)];

        _yuitest_coverline("build/transition/transition.js", 413);
name = Transition._toHyphen(name);
        _yuitest_coverline("build/transition/transition.js", 414);
if (typeof value === 'string') {
            _yuitest_coverline("build/transition/transition.js", 415);
value = value.replace(new RegExp('(?:^|,\\s)' + name + ',?'), ',');
            _yuitest_coverline("build/transition/transition.js", 416);
value = value.replace(/^,|,$/, '');
            _yuitest_coverline("build/transition/transition.js", 417);
node.style[TRANSITION_CAMEL] = value;
        }
    },

    _onNativeEnd: function(e) {
        _yuitest_coverfunc("build/transition/transition.js", "_onNativeEnd", 421);
_yuitest_coverline("build/transition/transition.js", 422);
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

        _yuitest_coverline("build/transition/transition.js", 433);
if (anim) {
            _yuitest_coverline("build/transition/transition.js", 434);
anim.removeProperty(name);
            _yuitest_coverline("build/transition/transition.js", 435);
anim._endNative(name);
            _yuitest_coverline("build/transition/transition.js", 436);
config = anim._config[name];

            _yuitest_coverline("build/transition/transition.js", 438);
data = {
                type: 'propertyEnd',
                propertyName: name,
                elapsedTime: elapsed,
                config: config
            };

            _yuitest_coverline("build/transition/transition.js", 445);
if (config && config.on && config.on.end) {
                _yuitest_coverline("build/transition/transition.js", 446);
config.on.end.call(Y.one(node), data);
            }

            _yuitest_coverline("build/transition/transition.js", 449);
if (anim._count <= 0)  { // after propertyEnd fires
                _yuitest_coverline("build/transition/transition.js", 450);
anim._end(elapsed);
                _yuitest_coverline("build/transition/transition.js", 451);
node.style[TRANSITION_PROPERTY_CAMEL] = ''; // clean up style
            }
        }
    },

    destroy: function() {
        _yuitest_coverfunc("build/transition/transition.js", "destroy", 456);
_yuitest_coverline("build/transition/transition.js", 457);
var anim = this,
            node = anim._node;

        _yuitest_coverline("build/transition/transition.js", 460);
if (node) {
            _yuitest_coverline("build/transition/transition.js", 461);
node.removeEventListener(TRANSITION_END, anim._onNativeEnd, false);
            _yuitest_coverline("build/transition/transition.js", 462);
anim._node = null;
        }
    }
};

_yuitest_coverline("build/transition/transition.js", 467);
Y.Transition = Transition;
_yuitest_coverline("build/transition/transition.js", 468);
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
_yuitest_coverline("build/transition/transition.js", 495);
Y.Node.prototype.transition = function(name, config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "transition", 495);
_yuitest_coverline("build/transition/transition.js", 496);
var
        transitionAttrs = Transition._nodeAttrs[Y.stamp(this._node)],
        anim = (transitionAttrs) ? transitionAttrs.transition || null : null,
        fxConfig,
        prop;

    _yuitest_coverline("build/transition/transition.js", 502);
if (typeof name === 'string') { // named effect, pull config from registry
        _yuitest_coverline("build/transition/transition.js", 503);
if (typeof config === 'function') {
            _yuitest_coverline("build/transition/transition.js", 504);
callback = config;
            _yuitest_coverline("build/transition/transition.js", 505);
config = null;
        }

        _yuitest_coverline("build/transition/transition.js", 508);
fxConfig = Transition.fx[name];

        _yuitest_coverline("build/transition/transition.js", 510);
if (config && typeof config !== 'boolean') {
            _yuitest_coverline("build/transition/transition.js", 511);
config = Y.clone(config);

            _yuitest_coverline("build/transition/transition.js", 513);
for (prop in fxConfig) {
                _yuitest_coverline("build/transition/transition.js", 514);
if (fxConfig.hasOwnProperty(prop)) {
                    _yuitest_coverline("build/transition/transition.js", 515);
if (! (prop in config)) {
                        _yuitest_coverline("build/transition/transition.js", 516);
config[prop] = fxConfig[prop];
                    }
                }
            }
        } else {
            _yuitest_coverline("build/transition/transition.js", 521);
config = fxConfig;
        }

    } else { // name is a config, config is a callback or undefined
        _yuitest_coverline("build/transition/transition.js", 525);
callback = config;
        _yuitest_coverline("build/transition/transition.js", 526);
config = name;
    }

    _yuitest_coverline("build/transition/transition.js", 529);
if (anim && !anim._running) {
        _yuitest_coverline("build/transition/transition.js", 530);
anim.init(this, config);
    } else {
        _yuitest_coverline("build/transition/transition.js", 532);
anim = new Transition(this._node, config);
    }

    _yuitest_coverline("build/transition/transition.js", 535);
anim.run(callback);
    _yuitest_coverline("build/transition/transition.js", 536);
return this;
};

_yuitest_coverline("build/transition/transition.js", 539);
Y.Node.prototype.show = function(name, config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "show", 539);
_yuitest_coverline("build/transition/transition.js", 540);
this._show(); // show prior to transition
    _yuitest_coverline("build/transition/transition.js", 541);
if (name && Y.Transition) {
        _yuitest_coverline("build/transition/transition.js", 542);
if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default
            _yuitest_coverline("build/transition/transition.js", 543);
if (typeof config === 'function') {
                _yuitest_coverline("build/transition/transition.js", 544);
callback = config;
                _yuitest_coverline("build/transition/transition.js", 545);
config = name;
            }
            _yuitest_coverline("build/transition/transition.js", 547);
name = Transition.SHOW_TRANSITION;
        }
        _yuitest_coverline("build/transition/transition.js", 549);
this.transition(name, config, callback);
    }
    _yuitest_coverline("build/transition/transition.js", 551);
return this;
};

_yuitest_coverline("build/transition/transition.js", 554);
Y.NodeList.prototype.show = function(name, config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "show", 554);
_yuitest_coverline("build/transition/transition.js", 555);
var nodes = this._nodes,
        i = 0,
        node;

    _yuitest_coverline("build/transition/transition.js", 559);
while ((node = nodes[i++])) {
        _yuitest_coverline("build/transition/transition.js", 560);
Y.one(node).show(name, config, callback);
    }

    _yuitest_coverline("build/transition/transition.js", 563);
return this;
};



_yuitest_coverline("build/transition/transition.js", 568);
var _wrapCallBack = function(anim, fn, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "_wrapCallBack", 568);
_yuitest_coverline("build/transition/transition.js", 569);
return function() {
        _yuitest_coverfunc("build/transition/transition.js", "(anonymous 9)", 569);
_yuitest_coverline("build/transition/transition.js", 570);
if (fn) {
            _yuitest_coverline("build/transition/transition.js", 571);
fn.call(anim);
        }
        _yuitest_coverline("build/transition/transition.js", 573);
if (callback && typeof callback === 'function') {
            _yuitest_coverline("build/transition/transition.js", 574);
callback.apply(anim._node, arguments);
        }
    };
};

_yuitest_coverline("build/transition/transition.js", 579);
Y.Node.prototype.hide = function(name, config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "hide", 579);
_yuitest_coverline("build/transition/transition.js", 580);
if (name && Y.Transition) {
        _yuitest_coverline("build/transition/transition.js", 581);
if (typeof config === 'function') {
            _yuitest_coverline("build/transition/transition.js", 582);
callback = config;
            _yuitest_coverline("build/transition/transition.js", 583);
config = null;
        }

        _yuitest_coverline("build/transition/transition.js", 586);
callback = _wrapCallBack(this, this._hide, callback); // wrap with existing callback
        _yuitest_coverline("build/transition/transition.js", 587);
if (typeof name !== 'string' && !name.push) { // named effect or array of effects supercedes default
            _yuitest_coverline("build/transition/transition.js", 588);
if (typeof config === 'function') {
                _yuitest_coverline("build/transition/transition.js", 589);
callback = config;
                _yuitest_coverline("build/transition/transition.js", 590);
config = name;
            }
            _yuitest_coverline("build/transition/transition.js", 592);
name = Transition.HIDE_TRANSITION;
        }
        _yuitest_coverline("build/transition/transition.js", 594);
this.transition(name, config, callback);
    } else {
        _yuitest_coverline("build/transition/transition.js", 596);
this._hide();
    }
    _yuitest_coverline("build/transition/transition.js", 598);
return this;
};

_yuitest_coverline("build/transition/transition.js", 601);
Y.NodeList.prototype.hide = function(name, config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "hide", 601);
_yuitest_coverline("build/transition/transition.js", 602);
var nodes = this._nodes,
        i = 0,
        node;

    _yuitest_coverline("build/transition/transition.js", 606);
while ((node = nodes[i++])) {
        _yuitest_coverline("build/transition/transition.js", 607);
Y.one(node).hide(name, config, callback);
    }

    _yuitest_coverline("build/transition/transition.js", 610);
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
_yuitest_coverline("build/transition/transition.js", 639);
Y.NodeList.prototype.transition = function(config, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "transition", 639);
_yuitest_coverline("build/transition/transition.js", 640);
var nodes = this._nodes,
        i = 0,
        node;

    _yuitest_coverline("build/transition/transition.js", 644);
while ((node = nodes[i++])) {
        _yuitest_coverline("build/transition/transition.js", 645);
Y.one(node).transition(config, callback);
    }

    _yuitest_coverline("build/transition/transition.js", 648);
return this;
};

_yuitest_coverline("build/transition/transition.js", 651);
Y.Node.prototype.toggleView = function(name, on, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "toggleView", 651);
_yuitest_coverline("build/transition/transition.js", 652);
this._toggles = this._toggles || [];
    _yuitest_coverline("build/transition/transition.js", 653);
callback = arguments[arguments.length - 1];

    _yuitest_coverline("build/transition/transition.js", 655);
if (typeof name !== 'string') { // no transition, just toggle
        _yuitest_coverline("build/transition/transition.js", 656);
on = name;
        _yuitest_coverline("build/transition/transition.js", 657);
this._toggleView(on, callback); // call original _toggleView in Y.Node
        _yuitest_coverline("build/transition/transition.js", 658);
return;
    }

    _yuitest_coverline("build/transition/transition.js", 661);
if (typeof on === 'function') { // Ignore "on" if used for callback argument.
        _yuitest_coverline("build/transition/transition.js", 662);
on = undefined;
    }

    _yuitest_coverline("build/transition/transition.js", 665);
if (typeof on === 'undefined' && name in this._toggles) { // reverse current toggle
        _yuitest_coverline("build/transition/transition.js", 666);
on = ! this._toggles[name];
    }

    _yuitest_coverline("build/transition/transition.js", 669);
on = (on) ? 1 : 0;
    _yuitest_coverline("build/transition/transition.js", 670);
if (on) {
        _yuitest_coverline("build/transition/transition.js", 671);
this._show();
    }  else {
        _yuitest_coverline("build/transition/transition.js", 673);
callback = _wrapCallBack(this, this._hide, callback);
    }

    _yuitest_coverline("build/transition/transition.js", 676);
this._toggles[name] = on;
    _yuitest_coverline("build/transition/transition.js", 677);
this.transition(Y.Transition.toggles[name][on], callback);

    _yuitest_coverline("build/transition/transition.js", 679);
return this;
};

_yuitest_coverline("build/transition/transition.js", 682);
Y.NodeList.prototype.toggleView = function(name, on, callback) {
    _yuitest_coverfunc("build/transition/transition.js", "toggleView", 682);
_yuitest_coverline("build/transition/transition.js", 683);
var nodes = this._nodes,
        i = 0,
        node;

    _yuitest_coverline("build/transition/transition.js", 687);
while ((node = nodes[i++])) {
        _yuitest_coverline("build/transition/transition.js", 688);
node = Y.one(node);
        _yuitest_coverline("build/transition/transition.js", 689);
node.toggleView.apply(node, arguments);
    }

    _yuitest_coverline("build/transition/transition.js", 692);
return this;
};

_yuitest_coverline("build/transition/transition.js", 695);
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
            _yuitest_coverfunc("build/transition/transition.js", "height", 716);
_yuitest_coverline("build/transition/transition.js", 717);
return node.get('scrollHeight') + 'px';
        },
        width: function(node) {
            _yuitest_coverfunc("build/transition/transition.js", "width", 719);
_yuitest_coverline("build/transition/transition.js", 720);
return node.get('scrollWidth') + 'px';
        },
        duration: 0.5,
        easing: 'ease-in',

        on: {
            start: function() {
                _yuitest_coverfunc("build/transition/transition.js", "start", 726);
_yuitest_coverline("build/transition/transition.js", 727);
var overflow = this.getStyle('overflow');
                _yuitest_coverline("build/transition/transition.js", 728);
if (overflow !== 'hidden') { // enable scrollHeight/Width
                    _yuitest_coverline("build/transition/transition.js", 729);
this.setStyle('overflow', 'hidden');
                    _yuitest_coverline("build/transition/transition.js", 730);
this._transitionOverflow = overflow;
                }
            },

            end: function() {
                _yuitest_coverfunc("build/transition/transition.js", "end", 734);
_yuitest_coverline("build/transition/transition.js", 735);
if (this._transitionOverflow) { // revert overridden value
                    _yuitest_coverline("build/transition/transition.js", 736);
this.setStyle('overflow', this._transitionOverflow);
                    _yuitest_coverline("build/transition/transition.js", 737);
delete this._transitionOverflow;
                }
            }
        }
    }
});

_yuitest_coverline("build/transition/transition.js", 744);
Y.mix(Transition.toggles, {
    size: ['sizeOut', 'sizeIn'],
    fade: ['fadeOut', 'fadeIn']
});


}, '@VERSION@', {"requires": ["node-style"]});
