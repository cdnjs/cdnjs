System.register("just-animate/core/Helpers", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ostring, slice;
    /**
     * No operation function: a placeholder
     *
     * @export
     */
    function noop() {
        // do nothing
    }
    exports_1("noop", noop);
    /**
     * Clamps a number between the min and max
     *
     * @export
     * @param {number} val number to clamp
     * @param {number} min min number allowed
     * @param {number} max max number allowed
     * @returns {number} val if between min-max, min if lesser, max if greater
     */
    function clamp(val, min, max) {
        return val === undefined ? undefined : val < min ? min : val > max ? max : val;
    }
    exports_1("clamp", clamp);
    /**
     * Returns the first object in the list or undefined
     *
     * @export
     * @template T
     * @param {ja.IIndexed<T>} indexed list of objects
     * @returns {T} first object in the list or undefined
     */
    function head(indexed) {
        return (!indexed || indexed.length < 1) ? undefined : indexed[0];
    }
    exports_1("head", head);
    /**
     * Returns the last object in the list or undefined
     *
     * @export
     * @template T
     * @param {ja.IIndexed<T>} indexed list of objects
     * @returns {T} last object in the list or undefined
     */
    function tail(indexed) {
        return (!indexed || indexed.length < 1) ? undefined : indexed[indexed.length - 1];
    }
    exports_1("tail", tail);
    /**
     * Tests if object is a list
     *
     * @export
     * @param {*} a object to test
     * @returns {boolean} true if is not a string and length property is a number
     */
    function isArray(a) {
        return !isString(a) && isNumber(a.length);
    }
    exports_1("isArray", isArray);
    function isDefined(a) {
        return a !== undefined && a !== null && a !== '';
    }
    exports_1("isDefined", isDefined);
    /**
     * Tests if object is a function
     *
     * @export
     * @param {*} a object to test
     * @returns {boolean} true if object.toString reports it as a Function
     */
    function isFunction(a) {
        return ostring.call(a) === '[object Function]';
    }
    exports_1("isFunction", isFunction);
    /**
     * Tests if object is a number
     *
     * @export
     * @param {*} a object to test
     * @returns {boolean} true if the object is typeof number
     */
    function isNumber(a) {
        return typeof a === 'number';
    }
    exports_1("isNumber", isNumber);
    /**
     * Tests if object is a string
     *
     * @export
     * @param {*} a object to test
     * @returns {boolean} true if object is typeof string
     */
    function isString(a) {
        return typeof a === 'string';
    }
    exports_1("isString", isString);
    /**
     * Converts list to an Array.
     * Useful for converting NodeList and arguments to []
     *
     * @export
     * @template T
     * @param {ja.IIndexed<T>} list to convert
     * @returns {T[]} array clone of list
     */
    function toArray(indexed) {
        return slice.call(indexed, 0);
    }
    exports_1("toArray", toArray);
    /**
     * Performs the function against all objects in the list
     *
     * @export
     * @template T1
     * @param {ja.IIndexed<T1>} items list of objects
     * @param {ja.IConsumer<T1>} fn function to execute for each object
     */
    function each(items, fn) {
        for (var i = 0, len = items.length; i < len; i++) {
            fn(items[i]);
        }
    }
    exports_1("each", each);
    /**
     * Returns the max value of a given property in a list
     *
     * @export
     * @template T1
     * @param {ja.IIndexed<T1>} items list of objects
     * @param {string} propertyName property to evaluate
     * @returns {*} max value of the property provided
     */
    function max(items, propertyName) {
        var max = '';
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            var prop = item[propertyName];
            if (max < prop) {
                max = prop;
            }
        }
        return max;
    }
    exports_1("max", max);
    /**
     * Maps one list of objects to another.
     * Returning undefined skips the item (effectively filtering it)
     *
     * @export
     * @template T1
     * @template T2
     * @param {ja.IIndexed<T1>} items list of objects to map
     * @param {ja.IMapper<T1, T2>} fn function that maps each object
     * @returns {T2[]} new list of objects
     */
    function map(items, fn) {
        var results = [];
        for (var i = 0, len = items.length; i < len; i++) {
            var result = fn(items[i]);
            if (result !== undefined) {
                results.push(result);
            }
        }
        return results;
    }
    exports_1("map", map);
    /**
     * Extends the first object with the properties of each subsequent object
     *
     * @export
     * @param {*} target object to extend
     * @param {...any[]} sources sources from which to inherit properties
     * @returns {*} first object
     */
    function extend(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        for (var i = 1, len = arguments.length; i < len; i++) {
            var source = arguments[i];
            for (var propName in source) {
                target[propName] = source[propName];
            }
        }
        return target;
    }
    exports_1("extend", extend);
    /**
     * Calls the named function for each object in the list
     *
     * @export
     * @param {ja.IIndexed<any>} targets list of objects on which to call a function
     * @param {string} fnName function name to call on each object
     * @param {ja.IIndexed<any>} args list of arguments to pass to the function
     * @param {ja.ICallbackHandler} [cb] optional error handlers
     * @returns {any[]} all results as an array
     */
    function multiapply(targets, fnName, args, cb) {
        var errors = [];
        var results = [];
        for (var i = 0, len = targets.length; i < len; i++) {
            try {
                var target = targets[i];
                var result = void 0;
                if (fnName) {
                    result = target[fnName].apply(target, args);
                }
                else {
                    result = target.apply(undefined, args);
                }
                if (result !== undefined) {
                    results.push(result);
                }
            }
            catch (err) {
                errors.push(err);
            }
        }
        if (isFunction(cb)) {
            cb(errors);
        }
        return results;
    }
    exports_1("multiapply", multiapply);
    return {
        setters:[],
        execute: function() {
            ostring = Object.prototype.toString;
            slice = Array.prototype.slice;
        }
    }
});
System.register("just-animate/core/Transformers", ["just-animate/core/Helpers"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Helpers_1;
    var x, y, z;
    function replaceCamelCased(match, p1, p2) {
        return p1 + p2.toUpperCase();
    }
    /**
     * Handles converting animations options to a usable format
     */
    function animationTransformer(a) {
        var keyframes = Helpers_1.map(a.keyframes, keyframeTransformer);
        return {
            keyframes: normalizeKeyframes(keyframes),
            name: a.name,
            timings: Helpers_1.extend({}, a.timings)
        };
    }
    exports_2("animationTransformer", animationTransformer);
    /**
     * If a property is missing at the start or end keyframe, the first or last instance of it is moved to the end.
     */
    function normalizeKeyframes(keyframes) {
        var len = keyframes.length;
        // don't attempt to fill animation if only two frames
        if (len < 2) {
            return keyframes;
        }
        var first = keyframes[0];
        var last = keyframes[len - 1];
        // fill initial keyframe
        for (var i = 1; i < len; i++) {
            var keyframe = keyframes[i];
            for (var prop in keyframe) {
                if (prop === 'offset' || Helpers_1.isDefined(first[prop])) {
                    continue;
                }
                first[prop] = keyframe[prop];
            }
        }
        // fill end keyframe
        for (var i = len - 2; i > -1; i--) {
            var keyframe = keyframes[i];
            for (var prop in keyframe) {
                if (prop === 'offset' || Helpers_1.isDefined(last[prop])) {
                    continue;
                }
                last[prop] = keyframe[prop];
            }
        }
        return keyframes;
    }
    exports_2("normalizeKeyframes", normalizeKeyframes);
    /**
     * Handles transforming short hand key properties into their native form
     */
    function keyframeTransformer(keyframe) {
        // transform properties
        var scale = new Array(3);
        var skew = new Array(2);
        var translate = new Array(3);
        var output = {};
        var transform = '';
        for (var prop in keyframe) {
            var value = keyframe[prop];
            if (value === undefined || value === null /* tslint:enable */ || value === '') {
                continue;
            }
            switch (prop) {
                case 'scale3d':
                    if (Helpers_1.isArray(value)) {
                        var arr = value;
                        if (arr.length !== 3) {
                            throw Error('scale3d requires x, y, & z');
                        }
                        scale[x] = arr[x];
                        scale[y] = arr[y];
                        scale[z] = arr[z];
                        continue;
                    }
                    if (Helpers_1.isNumber(value)) {
                        scale[x] = value;
                        scale[y] = value;
                        scale[z] = value;
                        continue;
                    }
                    throw Error('scale3d requires a number or number[]');
                case 'scale':
                    if (Helpers_1.isArray(value)) {
                        var arr = value;
                        if (arr.length !== 2) {
                            throw Error('scale requires x & y');
                        }
                        scale[x] = arr[x];
                        scale[y] = arr[y];
                        continue;
                    }
                    if (Helpers_1.isNumber(value)) {
                        scale[x] = value;
                        scale[y] = value;
                        continue;
                    }
                    throw Error('scale requires a number or number[]');
                case 'scaleX':
                    if (Helpers_1.isNumber(value)) {
                        scale[x] = value;
                        continue;
                    }
                    throw Error('scaleX requires a number');
                case 'scaleY':
                    if (Helpers_1.isNumber(value)) {
                        scale[y] = value;
                        continue;
                    }
                    throw Error('scaleY requires a number');
                case 'scaleZ':
                    if (Helpers_1.isNumber(value)) {
                        scale[z] = value;
                        continue;
                    }
                    throw Error('scaleZ requires a number');
                case 'skew':
                    if (Helpers_1.isArray(value)) {
                        var arr = value;
                        if (arr.length !== 2) {
                            throw Error('skew requires x & y');
                        }
                        skew[x] = arr[x];
                        skew[y] = arr[y];
                        continue;
                    }
                    if (Helpers_1.isNumber(value)) {
                        skew[x] = value;
                        skew[y] = value;
                        continue;
                    }
                    throw Error('skew requires a number, string, string[], or number[]');
                case 'skewX':
                    if (Helpers_1.isString(value)) {
                        skew[x] = value;
                        continue;
                    }
                    throw Error('skewX requires a number or string');
                case 'skewY':
                    if (Helpers_1.isString(value)) {
                        skew[y] = value;
                        continue;
                    }
                    throw Error('skewY requires a number or string');
                case 'rotate3d':
                    if (Helpers_1.isArray(value)) {
                        var arr = value;
                        if (arr.length !== 4) {
                            throw Error('rotate3d requires x, y, z, & a');
                        }
                        transform += " rotate3d(" + arr[0] + "," + arr[1] + "," + arr[2] + "," + arr[3] + ")";
                        continue;
                    }
                    throw Error('rotate3d requires an []');
                case 'rotateX':
                    if (Helpers_1.isString(value)) {
                        transform += " rotate3d(1, 0, 0, " + value + ")";
                        continue;
                    }
                    throw Error('rotateX requires a string');
                case 'rotateY':
                    if (Helpers_1.isString(value)) {
                        transform += " rotate3d(0, 1, 0, " + value + ")";
                        continue;
                    }
                    throw Error('rotateY requires a string');
                case 'rotate':
                case 'rotateZ':
                    if (Helpers_1.isString(value)) {
                        transform += " rotate3d(0, 0, 1, " + value + ")";
                        continue;
                    }
                    throw Error('rotateZ requires a string');
                case 'translate3d':
                    if (Helpers_1.isArray(value)) {
                        var arr = value;
                        if (arr.length !== 3) {
                            throw Error('translate3d requires x, y, & z');
                        }
                        translate[x] = arr[x];
                        translate[y] = arr[y];
                        translate[z] = arr[z];
                        continue;
                    }
                    if (Helpers_1.isString(value) || Helpers_1.isNumber(value)) {
                        translate[x] = value;
                        translate[y] = value;
                        translate[z] = value;
                        continue;
                    }
                    throw Error('translate3d requires a number, string, string[], or number[]');
                case 'translate':
                    if (Helpers_1.isArray(value)) {
                        var arr = value;
                        if (arr.length !== 2) {
                            throw Error('translate requires x & y');
                        }
                        translate[x] = arr[x];
                        translate[y] = arr[y];
                        continue;
                    }
                    if (Helpers_1.isString(value) || Helpers_1.isNumber(value)) {
                        translate[x] = value;
                        translate[y] = value;
                        continue;
                    }
                    throw Error('translate requires a number, string, string[], or number[]');
                case 'translateX':
                    if (Helpers_1.isString(value) || Helpers_1.isNumber(value)) {
                        translate[x] = value;
                        continue;
                    }
                    throw Error('translateX requires a number or string');
                case 'translateY':
                    if (Helpers_1.isString(value) || Helpers_1.isNumber(value)) {
                        translate[y] = value;
                        continue;
                    }
                    throw Error('translateY requires a number or string');
                case 'translateZ':
                    if (Helpers_1.isString(value) || Helpers_1.isNumber(value)) {
                        translate[z] = value;
                        continue;
                    }
                    throw Error('translateZ requires a number or string');
                case 'transform':
                    transform += ' ' + value;
                    break;
                default:
                    var prop2 = prop.replace(/([a-z])-([a-z])/ig, replaceCamelCased);
                    output[prop2] = value;
                    break;
            }
        }
        // combine scale
        var isScaleX = scale[x] !== undefined;
        var isScaleY = scale[y] !== undefined;
        var isScaleZ = scale[z] !== undefined;
        if (isScaleX && isScaleZ || isScaleY && isScaleZ) {
            var scaleString = scale.map(function (s) { return s || '1'; }).join(',');
            transform += " scale3d(" + scaleString + ")";
        }
        else if (isScaleX && isScaleY) {
            transform += " scale(" + (scale[x] || 1) + ", " + (scale[y] || 1) + ")";
        }
        else if (isScaleX) {
            transform += " scaleX(" + scale[x] + ")";
        }
        else if (isScaleY) {
            transform += " scaleX(" + scale[y] + ")";
        }
        else if (isScaleZ) {
            transform += " scaleX(" + scale[z] + ")";
        }
        else {
        }
        // combine skew
        var isskewX = skew[x] !== undefined;
        var isskewY = skew[y] !== undefined;
        if (isskewX && isskewY) {
            transform += " skew(" + (skew[x] || 1) + ", " + (skew[y] || 1) + ")";
        }
        else if (isskewX) {
            transform += " skewX(" + skew[x] + ")";
        }
        else if (isskewY) {
            transform += " skewX(" + skew[y] + ")";
        }
        else {
        }
        // combine translate
        var istranslateX = translate[x] !== undefined;
        var istranslateY = translate[y] !== undefined;
        var istranslateZ = translate[z] !== undefined;
        if (istranslateX && istranslateZ || istranslateY && istranslateZ) {
            var translateString = translate.map(function (s) { return s || '1'; }).join(',');
            transform += " translate3d(" + translateString + ")";
        }
        else if (istranslateX && istranslateY) {
            transform += " translate(" + (translate[x] || 1) + ", " + (translate[y] || 1) + ")";
        }
        else if (istranslateX) {
            transform += " translateX(" + translate[x] + ")";
        }
        else if (istranslateY) {
            transform += " translateX(" + translate[y] + ")";
        }
        else if (istranslateZ) {
            transform += " translateX(" + translate[z] + ")";
        }
        else {
        }
        if (transform) {
            output['transform'] = transform;
        }
        return output;
    }
    exports_2("keyframeTransformer", keyframeTransformer);
    return {
        setters:[
            function (Helpers_1_1) {
                Helpers_1 = Helpers_1_1;
            }],
        execute: function() {
            x = 0;
            y = 1;
            z = 2;
        }
    }
});
System.register("just-animate/easings", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var easings;
    return {
        setters:[],
        execute: function() {
            exports_3("easings", easings = {
                easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
                easeInCirc: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
                easeInCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
                easeInExpo: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
                easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
                easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
                easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                easeInOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
                easeInOutQuad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
                easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
                easeInOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
                easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
                easeInQuad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
                easeInQuart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
                easeInQuint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
                easeInSine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
                easeOutBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
                easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
                easeOutCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
                easeOutExpo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
                easeOutQuad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
                easeOutQuart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
                easeOutQuint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
                easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
                elegantSlowStartEnd: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'
            });
        }
    }
});
System.register("just-animate/core/ElementResolver", ["just-animate/core/Helpers"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Helpers_2;
    /**
     * Recursively resolves the element source from dom, selector, jquery, array, and function sources
     *
     * @param {ja.ElementSource} source from which to locate elements
     * @returns {Element[]} array of elements found
     */
    function resolveElements(source) {
        if (!source) {
            throw Error('source is undefined');
        }
        if (Helpers_2.isString(source)) {
            // if query selector, search for elements 
            var nodeResults = document.querySelectorAll(source);
            return Helpers_2.toArray(nodeResults);
        }
        if (source instanceof Element) {
            // if a single element, wrap in array 
            return [source];
        }
        if (Helpers_2.isFunction(source)) {
            // if function, call it and call this function
            var provider = source;
            var result = provider();
            return resolveElements(result);
        }
        if (Helpers_2.isArray(source)) {
            // if array or jQuery object, flatten to an array
            var elements_1 = [];
            Helpers_2.each(source, function (i) {
                // recursively call this function in case of nested elements
                var innerElements = resolveElements(i);
                elements_1.push.apply(elements_1, innerElements);
            });
            return elements_1;
        }
        // otherwise return empty    
        return [];
    }
    exports_4("resolveElements", resolveElements);
    return {
        setters:[
            function (Helpers_2_1) {
                Helpers_2 = Helpers_2_1;
            }],
        execute: function() {
        }
    }
});
System.register("just-animate/core/ElementAnimator", ["just-animate/easings", "just-animate/core/Helpers", "just-animate/core/Transformers", "just-animate/core/ElementResolver"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var easings_1, Helpers_3, Transformers_1, ElementResolver_1;
    var ElementAnimator;
    return {
        setters:[
            function (easings_1_1) {
                easings_1 = easings_1_1;
            },
            function (Helpers_3_1) {
                Helpers_3 = Helpers_3_1;
            },
            function (Transformers_1_1) {
                Transformers_1 = Transformers_1_1;
            },
            function (ElementResolver_1_1) {
                ElementResolver_1 = ElementResolver_1_1;
            }],
        execute: function() {
            /**
             * Animates one or more elements
             *
             * @export
             * @class ElementAnimator
             * @implements {ja.IAnimator}
             */
            ElementAnimator = (function () {
                /**
                 * Creates an instance of ElementAnimator.
                 *
                 * @param {ja.IAnimationManager} manager JustAnimate instance
                 * @param {(string | ja.IIndexed<ja.IKeyframe>)} keyframesOrName keyframe definition or name of registered animation
                 * @param {ja.ElementSource} el element or element source to animate
                 * @param {ja.IAnimationEffectTiming} [timings] optional timing overrides.  required when passing in keyframes
                 */
                function ElementAnimator(manager, keyframesOrName, el, timings) {
                    var _this = this;
                    if (!keyframesOrName) {
                        return;
                    }
                    var keyframes;
                    if (Helpers_3.isString(keyframesOrName)) {
                        // if keyframes is a string, lookup keyframes from registry
                        var definition = manager.findAnimation(keyframesOrName);
                        keyframes = definition.keyframes;
                        // use registered timings as default, then load timings from params           
                        timings = Helpers_3.extend({}, definition.timings, timings);
                    }
                    else {
                        // otherwise, translate keyframe properties
                        keyframes = Transformers_1.normalizeKeyframes(Helpers_3.map(keyframesOrName, Transformers_1.keyframeTransformer));
                    }
                    if (timings && timings.easing) {
                        // if timings contains an easing property, 
                        var easing = easings_1.easings[timings.easing];
                        if (easing) {
                            timings.easing = easing;
                        }
                    }
                    // add duration to object    
                    this.duration = timings.duration;
                    // get list of elements to animate
                    var elements = ElementResolver_1.resolveElements(el);
                    // call .animate on all elements and get a list of their players        
                    this._animators = Helpers_3.multiapply(elements, 'animate', [keyframes, timings]);
                    // hookup finish event for when it happens naturally    
                    if (this._animators.length > 0) {
                        // todo: try to find a better way than just listening to one of them
                        /**
                         * (description)
                         */
                        this._animators[0].onfinish = function () {
                            _this.finish();
                        };
                    }
                }
                Object.defineProperty(ElementAnimator.prototype, "playbackRate", {
                    /**
                     * Returns 0 when not playing, 1 when playing forward, and -1 when playing backward
                     *
                     * @type {number}
                     */
                    get: function () {
                        var first = Helpers_3.head(this._animators);
                        return first ? first.playbackRate : 0;
                    },
                    /**
                     * Sets the playbackRate to the specified value
                     */
                    set: function (val) {
                        Helpers_3.each(this._animators, function (a) { return a.playbackRate = val; });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ElementAnimator.prototype, "currentTime", {
                    /**
                     * Returns current time of the animation
                     *
                     * @type {number}
                     */
                    get: function () {
                        return Helpers_3.max(this._animators, 'currentTime') || 0;
                    },
                    /**
                     * Sets the animation current time
                     */
                    set: function (elapsed) {
                        Helpers_3.each(this._animators, function (a) { return a.currentTime = elapsed; });
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Finishes the current animation
                 *
                 * @param {ja.ICallbackHandler} [fn] optional error handler
                 * @returns {ja.IAnimator} this instance of the Element Animator
                 */
                ElementAnimator.prototype.finish = function (fn) {
                    var _this = this;
                    Helpers_3.multiapply(this._animators, 'finish', [], fn);
                    if (this.playbackRate < 0) {
                        Helpers_3.each(this._animators, function (a) { return a.currentTime = 0; });
                    }
                    else {
                        Helpers_3.each(this._animators, function (a) { return a.currentTime = _this.duration; });
                    }
                    if (Helpers_3.isFunction(this.onfinish)) {
                        this.onfinish(this);
                    }
                    return this;
                };
                /**
                 * Plays the animation
                 *
                 * @param {ja.ICallbackHandler} [fn] optional error handler
                 * @returns {ja.IAnimator} this instance of Element Animator
                 */
                ElementAnimator.prototype.play = function (fn) {
                    Helpers_3.multiapply(this._animators, 'play', [], fn);
                    return this;
                };
                /**
                 * Pauses the animation
                 *
                 * @param {ja.ICallbackHandler} [fn] optional error handler
                 * @returns {ja.IAnimator}  this instance of Element Animator
                 */
                ElementAnimator.prototype.pause = function (fn) {
                    Helpers_3.multiapply(this._animators, 'pause', [], fn);
                    return this;
                };
                /**
                 * Reverses the direction of the animation
                 *
                 * @param {ja.ICallbackHandler} [fn] optional error handler
                 * @returns {ja.IAnimator} this instance of Element Animator
                 */
                ElementAnimator.prototype.reverse = function (fn) {
                    Helpers_3.multiapply(this._animators, 'reverse', [], fn);
                    return this;
                };
                /**
                 * Cancels the animation
                 *
                 * @param {ja.ICallbackHandler} [fn] optional error handler
                 * @returns {ja.IAnimator} this instance of Element Animator
                 */
                ElementAnimator.prototype.cancel = function (fn) {
                    Helpers_3.multiapply(this._animators, 'cancel', [], fn);
                    Helpers_3.each(this._animators, function (a) { return a.currentTime = 0; });
                    if (Helpers_3.isFunction(this.oncancel)) {
                        this.oncancel(this);
                    }
                    return this;
                };
                return ElementAnimator;
            }());
            exports_5("ElementAnimator", ElementAnimator);
        }
    }
});
System.register("just-animate/core/SequenceAnimator", ["just-animate/core/Helpers"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Helpers_4;
    var SequenceAnimator;
    return {
        setters:[
            function (Helpers_4_1) {
                Helpers_4 = Helpers_4_1;
            }],
        execute: function() {
            /**
             * (description)
             *
             * @export
             * @class SequenceAnimator
             * @implements {ja.IAnimator}
             */
            SequenceAnimator = (function () {
                /**
                 * Creates an instance of SequenceAnimator.
                 *
                 * @param {ja.IAnimationManager} manager (description)
                 * @param {ja.ISequenceOptions} options (description)
                 */
                function SequenceAnimator(manager, options) {
                    /**
                     * (description)
                     *
                     * @param {ja.ISequenceEvent} step (description)
                     * @returns (description)
                     */
                    var steps = Helpers_4.map(options.steps, function (step) {
                        if (step.command || !step.name) {
                            return step;
                        }
                        var definition = manager.findAnimation(step.name);
                        var timings = Helpers_4.extend({}, definition.timings);
                        if (step.timings) {
                            timings = Helpers_4.extend(timings, step.timings);
                        }
                        return {
                            el: step.el,
                            keyframes: definition.keyframes,
                            timings: definition.timings
                        };
                    });
                    this.onfinish = Helpers_4.noop;
                    this._currentIndex = -1;
                    this._manager = manager;
                    this._steps = steps;
                    if (options.autoplay === true) {
                        this.play();
                    }
                }
                Object.defineProperty(SequenceAnimator.prototype, "currentTime", {
                    /**
                     * (description)
                     *
                     * @readonly
                     * @type {number}
                     */
                    get: function () {
                        var currentIndex = this._currentIndex;
                        var len = this._steps.length;
                        if (currentIndex === -1 || currentIndex === len) {
                            return 0;
                        }
                        var isReversed = this.playbackRate === -1;
                        var beforeTime = 0;
                        var afterTime = 0;
                        var currentTime;
                        for (var i = 0; i < len; i++) {
                            var step = this._steps[i];
                            if (i < currentIndex) {
                                beforeTime += step.timings.duration;
                                continue;
                            }
                            if (i > currentIndex) {
                                afterTime += step.timings.duration;
                                continue;
                            }
                            if (isReversed) {
                                currentTime = this.duration - step.animator.currentTime;
                                continue;
                            }
                            currentTime = step.animator.currentTime;
                        }
                        return currentTime + (isReversed ? afterTime : beforeTime);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SequenceAnimator.prototype, "duration", {
                    /**
                     * (description)
                     *
                     * @readonly
                     * @type {number}
                     */
                    get: function () {
                        return this._steps.reduce(function (c, n) { return c + (n.timings.duration || 0); }, 0);
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * (description)
                 *
                 * @param {ja.ICallbackHandler} [fn] (description)
                 * @returns {ja.IAnimator} (description)
                 */
                SequenceAnimator.prototype.finish = function (fn) {
                    this._errorCallback = fn;
                    this._currentIndex = -1;
                    for (var x = 0; x < this._steps.length; x++) {
                        var step = this._steps[x];
                        if (step.animator !== undefined) {
                            step.animator.cancel(fn);
                        }
                    }
                    if (Helpers_4.isFunction(this.onfinish)) {
                        this.onfinish(this);
                    }
                    return this;
                };
                /**
                 * (description)
                 *
                 * @param {ja.ICallbackHandler} [fn] (description)
                 * @returns {ja.IAnimator} (description)
                 */
                SequenceAnimator.prototype.play = function (fn) {
                    this._errorCallback = fn;
                    this.playbackRate = 1;
                    this._playThisStep();
                    return this;
                };
                /**
                 * (description)
                 *
                 * @param {ja.ICallbackHandler} [fn] (description)
                 * @returns {ja.IAnimator} (description)
                 */
                SequenceAnimator.prototype.pause = function (fn) {
                    this._errorCallback = fn;
                    // ignore pause if not relevant
                    if (!this._isInEffect()) {
                        return this;
                    }
                    var animator = this._getAnimator();
                    animator.pause(fn);
                    return this;
                };
                /**
                 * (description)
                 *
                 * @param {ja.ICallbackHandler} [fn] (description)
                 * @returns {ja.IAnimator} (description)
                 */
                SequenceAnimator.prototype.reverse = function (fn) {
                    this._errorCallback = fn;
                    this.playbackRate = -1;
                    this._playThisStep();
                    return this;
                };
                /**
                 * (description)
                 *
                 * @param {ja.ICallbackHandler} [fn] (description)
                 * @returns {ja.IAnimator} (description)
                 */
                SequenceAnimator.prototype.cancel = function (fn) {
                    this._errorCallback = fn;
                    this.playbackRate = undefined;
                    this._currentIndex = -1;
                    for (var x = 0; x < this._steps.length; x++) {
                        var step = this._steps[x];
                        if (step.animator !== undefined) {
                            step.animator.cancel(fn);
                        }
                    }
                    if (Helpers_4.isFunction(this.oncancel)) {
                        this.oncancel(this);
                    }
                    return this;
                };
                SequenceAnimator.prototype._isInEffect = function () {
                    return this._currentIndex > -1 && this._currentIndex < this._steps.length;
                };
                SequenceAnimator.prototype._getAnimator = function () {
                    var it = this._steps[this._currentIndex];
                    if (it.animator) {
                        return it.animator;
                    }
                    it.animator = this._manager.animate(it.keyframes, it.el, it.timings);
                    return it.animator;
                };
                SequenceAnimator.prototype._playNextStep = function (evt) {
                    if (this.playbackRate === -1) {
                        this._currentIndex--;
                    }
                    else {
                        this._currentIndex++;
                    }
                    if (this._isInEffect()) {
                        this._playThisStep();
                    }
                    else {
                        this.onfinish(evt);
                    }
                };
                SequenceAnimator.prototype._playThisStep = function () {
                    var _this = this;
                    if (!this._isInEffect()) {
                        if (this.playbackRate === -1) {
                            this._currentIndex = this._steps.length - 1;
                        }
                        else {
                            this._currentIndex = 0;
                        }
                    }
                    var animator = this._getAnimator();
                    animator.onfinish = function (evt) {
                        _this._playNextStep(evt);
                    };
                    animator.play(this._errorCallback);
                };
                return SequenceAnimator;
            }());
            exports_6("SequenceAnimator", SequenceAnimator);
        }
    }
});
System.register("just-animate/core/TimelineAnimator", ["just-animate/core/Helpers"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var Helpers_5;
    var animationPadding, TimelineAnimator, TimelineEvent;
    return {
        setters:[
            function (Helpers_5_1) {
                Helpers_5 = Helpers_5_1;
            }],
        execute: function() {
            // fixme!: this controls the amount of time left before the timeline gives up 
            // on individual animation and calls finish.  If an animation plays after its time, it looks
            // like it restarts and that causes jank
            animationPadding = 1.0 / 30;
            /**
             * (description)
             *
             * @export
             * @class TimelineAnimator
             * @implements {ja.IAnimator}
             */
            TimelineAnimator = (function () {
                /**
                 * Creates an instance of TimelineAnimator.
                 *
                 * @param {ja.IAnimationManager} manager (description)
                 * @param {ja.ITimelineOptions} options (description)
                 */
                function TimelineAnimator(manager, options) {
                    var duration = options.duration;
                    if (duration === undefined) {
                        throw Error('Duration is required');
                    }
                    this.playbackRate = 0;
                    this.duration = options.duration;
                    this.currentTime = 0;
                    this._events = Helpers_5.map(options.events, function (evt) { return new TimelineEvent(manager, duration, evt); });
                    this._isPaused = false;
                    this._manager = manager;
                    // ensure context of tick is this instance        
                    this._tick = this._tick.bind(this);
                    if (options.autoplay) {
                        this.play();
                    }
                }
                /**
                 * (description)
                 *
                 * @param {ja.ICallbackHandler} [fn] (description)
                 * @returns {ja.IAnimator} (description)
                 */
                TimelineAnimator.prototype.finish = function (fn) {
                    this._isFinished = true;
                    return this;
                };
                /**
                 * (description)
                 *
                 * @param {ja.ICallbackHandler} [fn] (description)
                 * @returns {ja.IAnimator} (description)
                 */
                TimelineAnimator.prototype.play = function (fn) {
                    this.playbackRate = 1;
                    this._isPaused = false;
                    if (this._isInEffect) {
                        return this;
                    }
                    if (this.playbackRate < 0) {
                        this.currentTime = this.duration;
                    }
                    else {
                        this.currentTime = 0;
                    }
                    window.requestAnimationFrame(this._tick);
                    return this;
                };
                /**
                 * (description)
                 *
                 * @param {ja.ICallbackHandler} [fn] (description)
                 * @returns {ja.IAnimator} (description)
                 */
                TimelineAnimator.prototype.pause = function (fn) {
                    if (this._isInEffect) {
                        this._isPaused = true;
                    }
                    return this;
                };
                /**
                 * (description)
                 *
                 * @param {ja.ICallbackHandler} [fn] (description)
                 * @returns {ja.IAnimator} (description)
                 */
                TimelineAnimator.prototype.reverse = function (fn) {
                    this.playbackRate = -1;
                    this._isPaused = false;
                    if (this._isInEffect) {
                        return this;
                    }
                    if (this.currentTime <= 0) {
                        this.currentTime = this.duration;
                    }
                    window.requestAnimationFrame(this._tick);
                    return this;
                };
                /**
                 * (description)
                 *
                 * @param {ja.ICallbackHandler} [fn] (description)
                 * @returns {ja.IAnimator} (description)
                 */
                TimelineAnimator.prototype.cancel = function (fn) {
                    this.playbackRate = 0;
                    this._isCanceled = true;
                    return this;
                };
                TimelineAnimator.prototype._tick = function () {
                    var _this = this;
                    // handle cancelation and finishing early
                    if (this._isCanceled) {
                        this._triggerCancel();
                        return;
                    }
                    if (this._isFinished) {
                        this._triggerFinish();
                        return;
                    }
                    if (this._isPaused) {
                        this._triggerPause();
                        return;
                    }
                    if (!this._isInEffect) {
                        this._isInEffect = true;
                    }
                    // calculate currentTime from delta
                    var thisTick = performance.now();
                    var lastTick = this._lastTick;
                    if (lastTick !== undefined) {
                        var delta = (thisTick - lastTick) * this.playbackRate;
                        this.currentTime += delta;
                    }
                    this._lastTick = thisTick;
                    // check if animation has finished
                    if (this.currentTime > this.duration || this.currentTime < 0) {
                        this._triggerFinish();
                        return;
                    }
                    // start animations if should be active and currently aren't        
                    Helpers_5.each(this._events, function (evt) {
                        var startTimeMs = _this.playbackRate < 0 ? evt.startTimeMs : evt.startTimeMs + animationPadding;
                        var endTimeMs = _this.playbackRate >= 0 ? evt.endTimeMs : evt.endTimeMs - animationPadding;
                        var shouldBeActive = startTimeMs <= _this.currentTime && _this.currentTime < endTimeMs;
                        if (!shouldBeActive) {
                            evt.isInEffect = false;
                            return;
                        }
                        evt.animator.playbackRate = _this.playbackRate;
                        evt.isInEffect = true;
                        evt.animator.play();
                    });
                    window.requestAnimationFrame(this._tick);
                };
                TimelineAnimator.prototype._triggerFinish = function () {
                    this._reset();
                    Helpers_5.each(this._events, function (evt) { return evt.animator.finish(); });
                    if (Helpers_5.isFunction(this.onfinish)) {
                        this.onfinish(this);
                    }
                };
                TimelineAnimator.prototype._triggerCancel = function () {
                    this._reset();
                    Helpers_5.each(this._events, function (evt) { return evt.animator.cancel(); });
                    if (Helpers_5.isFunction(this.oncancel)) {
                        this.oncancel(this);
                    }
                };
                TimelineAnimator.prototype._triggerPause = function () {
                    this._isPaused = true;
                    this._isInEffect = false;
                    this._lastTick = undefined;
                    this.playbackRate = 0;
                    Helpers_5.each(this._events, function (evt) {
                        evt.isInEffect = false;
                        evt.animator.pause();
                    });
                };
                TimelineAnimator.prototype._reset = function () {
                    this.currentTime = 0;
                    this._lastTick = undefined;
                    this._isCanceled = false;
                    this._isFinished = false;
                    this._isPaused = false;
                    this._isInEffect = false;
                    Helpers_5.each(this._events, function (evt) {
                        evt.isInEffect = false;
                    });
                };
                return TimelineAnimator;
            }());
            exports_7("TimelineAnimator", TimelineAnimator);
            TimelineEvent = (function () {
                function TimelineEvent(manager, timelineDuration, evt) {
                    var keyframes;
                    var timings;
                    var el;
                    if (evt.name) {
                        var definition = manager.findAnimation(evt.name);
                        var timings2 = Helpers_5.extend({}, definition.timings);
                        if (evt.timings) {
                            timings = Helpers_5.extend(timings2, evt.timings);
                        }
                        keyframes = definition.keyframes;
                        timings = timings2;
                        el = evt.el;
                    }
                    else {
                        keyframes = evt.keyframes;
                        timings = evt.timings;
                        el = evt.el;
                    }
                    // calculate endtime
                    var startTime = timelineDuration * evt.offset;
                    var endTime = startTime + timings.duration;
                    var isClipped = endTime > timelineDuration;
                    // if end of animation is clipped, set endTime to duration            
                    if (isClipped) {
                        endTime = timelineDuration;
                    }
                    this.el = el;
                    this.isClipped = isClipped;
                    this.isInEffect = false;
                    this.endTimeMs = endTime;
                    this.keyframes = keyframes;
                    this.offset = evt.offset;
                    this.startTimeMs = startTime;
                    this.timings = timings;
                    this._manager = manager;
                }
                Object.defineProperty(TimelineEvent.prototype, "animator", {
                    get: function () {
                        if (this._animator === undefined) {
                            this._animator = this._manager.animate(this.keyframes, this.el, this.timings);
                            this._animator.pause();
                        }
                        return this._animator;
                    },
                    enumerable: true,
                    configurable: true
                });
                return TimelineEvent;
            }());
        }
    }
});
System.register("just-animate/JustAnimate", ["just-animate/core/Helpers", "just-animate/core/Transformers", "just-animate/core/ElementAnimator", "just-animate/core/SequenceAnimator", "just-animate/core/TimelineAnimator"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var Helpers_6, Transformers_2, ElementAnimator_1, SequenceAnimator_1, TimelineAnimator_1;
    var DEFAULT_ANIMATIONS, JustAnimate;
    return {
        setters:[
            function (Helpers_6_1) {
                Helpers_6 = Helpers_6_1;
            },
            function (Transformers_2_1) {
                Transformers_2 = Transformers_2_1;
            },
            function (ElementAnimator_1_1) {
                ElementAnimator_1 = ElementAnimator_1_1;
            },
            function (SequenceAnimator_1_1) {
                SequenceAnimator_1 = SequenceAnimator_1_1;
            },
            function (TimelineAnimator_1_1) {
                TimelineAnimator_1 = TimelineAnimator_1_1;
            }],
        execute: function() {
            DEFAULT_ANIMATIONS = [];
            /**
             * (description)
             *
             * @export
             * @class JustAnimate
             * @implements {ja.IAnimationManager}
             */
            JustAnimate = (function () {
                /**
                 * Creates an instance of JustAnimate.
                 */
                function JustAnimate() {
                    var _this = this;
                    this._registry = {};
                    Helpers_6.each(DEFAULT_ANIMATIONS, function (a) { return _this._registry[a.name] = a; });
                }
                /**
                 * (description)
                 *
                 * @static
                 * @param {ja.IAnimationOptions[]} animations (description)
                 */
                JustAnimate.inject = function (animations) {
                    Array.prototype.push.apply(DEFAULT_ANIMATIONS, Helpers_6.map(animations, Transformers_2.animationTransformer));
                };
                /**
                 * (description)
                 *
                 * @param {(string | ja.IIndexed<ja.IKeyframe>)} keyframesOrName (description)
                 * @param {ja.ElementSource} el (description)
                 * @param {ja.IAnimationEffectTiming} [timings] (description)
                 * @returns {ja.IAnimator} (description)
                 */
                JustAnimate.prototype.animate = function (keyframesOrName, el, timings) {
                    return new ElementAnimator_1.ElementAnimator(this, keyframesOrName, el, timings);
                };
                /**
                 * (description)
                 *
                 * @param {ja.ISequenceOptions} options (description)
                 * @returns {ja.IAnimator} (description)
                 */
                JustAnimate.prototype.animateSequence = function (options) {
                    return new SequenceAnimator_1.SequenceAnimator(this, options);
                };
                /**
                 * (description)
                 *
                 * @param {ja.ITimelineOptions} options (description)
                 * @returns {ja.IAnimator} (description)
                 */
                JustAnimate.prototype.animateTimeline = function (options) {
                    return new TimelineAnimator_1.TimelineAnimator(this, options);
                };
                /**
                 * (description)
                 *
                 * @param {string} name (description)
                 * @returns {ja.IKeyframeOptions} (description)
                 */
                JustAnimate.prototype.findAnimation = function (name) {
                    return this._registry[name] || undefined;
                };
                /**
                 * (description)
                 *
                 * @param {ja.IAnimationOptions} animationOptions (description)
                 * @returns {ja.IAnimationManager} (description)
                 */
                JustAnimate.prototype.register = function (animationOptions) {
                    this._registry[animationOptions.name] = Transformers_2.animationTransformer(animationOptions);
                    return this;
                };
                return JustAnimate;
            }());
            exports_8("JustAnimate", JustAnimate);
        }
    }
});
System.register("just-animate/animations/bounce", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var bounce;
    return {
        setters:[],
        execute: function() {
            exports_9("bounce", bounce = {
                keyframes: [
                    {
                        offset: 0,
                        translate3d: '0'
                    },
                    {
                        offset: 0.2,
                        translate3d: ['0', '0', '0']
                    },
                    {
                        offset: 0.4,
                        translate3d: ['0', '-30px', '0']
                    },
                    {
                        offset: 0.43,
                        translate3d: ['0', '-30px', '0']
                    },
                    {
                        offset: 0.53,
                        translate3d: ['0', '0', '0']
                    },
                    {
                        offset: 0.7,
                        translate3d: ['0', '-15px', '0']
                    },
                    {
                        offset: 0.8,
                        translate3d: ['0', '0', '0']
                    },
                    {
                        offset: 0.9,
                        translate3d: ['0', '-4px', '0']
                    },
                    {
                        offset: 1,
                        translate3d: ['0', '0', '0']
                    }
                ],
                timings: {
                    duration: 900,
                    fill: 'both',
                    easing: 'easeOutCubic'
                },
                name: 'bounce'
            });
        }
    }
});
System.register("just-animate/animations/bounceIn", [], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var bounceIn;
    return {
        setters:[],
        execute: function() {
            exports_10("bounceIn", bounceIn = {
                name: 'bounceIn',
                keyframes: [
                    {
                        opacity: 0,
                        scale3d: .3
                    },
                    {
                        scale3d: 1.1
                    },
                    {
                        scale3d: .9
                    },
                    {
                        opacity: 1,
                        scale3d: 1.03
                    },
                    {
                        scale3d: .97
                    },
                    {
                        opacity: 1,
                        scale3d: 1
                    }
                ],
                timings: {
                    duration: 900,
                    fill: 'both',
                    easing: 'easeOutCubic'
                }
            });
        }
    }
});
System.register("just-animate/animations/bounceInDown", [], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var bounceInDown;
    return {
        setters:[],
        execute: function() {
            exports_11("bounceInDown", bounceInDown = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 0,
                        translate3d: ['0', '-3000px', '0']
                    },
                    {
                        offset: 0.6,
                        opacity: 1,
                        translate3d: ['0', '25px', '0']
                    },
                    {
                        offset: 0.75,
                        opacity: 1,
                        translate3d: ['0', '-10px', '0']
                    },
                    {
                        offset: 0.9,
                        opacity: 1,
                        translate3d: ['0', '5px', '0']
                    },
                    {
                        offset: 1,
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 900,
                    fill: 'both',
                    easing: 'easeOutCubic'
                },
                name: 'bounceInDown'
            });
        }
    }
});
System.register("just-animate/animations/bounceInLeft", [], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var bounceInLeft;
    return {
        setters:[],
        execute: function() {
            exports_12("bounceInLeft", bounceInLeft = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 0,
                        transform: 'translate3d(-3000px, 0, 0)'
                    },
                    {
                        offset: 0.6,
                        opacity: 1,
                        transform: 'translate3d(25px, 0, 0)'
                    },
                    {
                        offset: 0.75,
                        opacity: 1,
                        transform: 'translate3d(-10px, 0, 0)'
                    },
                    {
                        offset: 0.9,
                        opacity: 1,
                        transform: 'translate3d(5px, 0, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 900,
                    fill: 'both',
                    easing: 'easeOutCubic'
                },
                name: 'bounceInLeft'
            });
        }
    }
});
System.register("just-animate/animations/bounceInRight", [], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var bounceInRight;
    return {
        setters:[],
        execute: function() {
            exports_13("bounceInRight", bounceInRight = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 0,
                        transform: 'translate3d(3000px, 0, 0)'
                    },
                    {
                        offset: 0.6,
                        opacity: 1,
                        transform: 'translate3d(-25px, 0, 0)'
                    },
                    {
                        offset: 0.75,
                        transform: 'translate3d(10px, 0, 0)'
                    },
                    {
                        offset: 0.9,
                        transform: 'translate3d(-5px, 0, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 900,
                    fill: 'both',
                    easing: 'easeOutCubic'
                },
                name: 'bounceInRight'
            });
        }
    }
});
System.register("just-animate/animations/bounceInUp", [], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var bounceInUp;
    return {
        setters:[],
        execute: function() {
            exports_14("bounceInUp", bounceInUp = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 0,
                        transform: 'translate3d(0, 3000px, 0)'
                    },
                    {
                        offset: 0.6,
                        opacity: 1,
                        transform: 'translate3d(0, -20px, 0)'
                    },
                    {
                        offset: 0.75,
                        opacity: 1,
                        transform: 'translate3d(0, 10px, 0)'
                    },
                    {
                        offset: 0.9,
                        opacity: 1,
                        transform: 'translate3d(0, -5px, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 1,
                        transform: 'translate3d(0, 0, 0)'
                    }
                ],
                timings: {
                    duration: 900,
                    fill: 'both',
                    easing: 'easeOutCubic'
                },
                name: 'bounceInUp'
            });
        }
    }
});
System.register("just-animate/animations/bounceOut", [], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var bounceOut;
    return {
        setters:[],
        execute: function() {
            exports_15("bounceOut", bounceOut = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        offset: 0.2,
                        transform: 'scale3d(.9, .9, .9)'
                    },
                    {
                        offset: 0.5,
                        opacity: 1,
                        transform: 'scale3d(1.1, 1.1, 1.1)'
                    },
                    {
                        offset: 0.55,
                        opacity: 1,
                        transform: 'scale3d(1.1, 1.1, 1.1)'
                    },
                    {
                        offset: 1,
                        opacity: 0,
                        transform: 'scale3d(.3, .3, .3)'
                    }
                ],
                timings: {
                    duration: 900,
                    fill: 'both'
                },
                name: 'bounceOut'
            });
        }
    }
});
System.register("just-animate/animations/bounceOutDown", [], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var bounceOutDown;
    return {
        setters:[],
        execute: function() {
            exports_16("bounceOutDown", bounceOutDown = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        offset: 0.2,
                        transform: 'translate3d(0, 10px, 0)'
                    },
                    {
                        offset: 0.4,
                        opacity: 1,
                        transform: 'translate3d(0, -20px, 0)'
                    },
                    {
                        offset: 0.45,
                        opacity: 1,
                        transform: 'translate3d(0, -20px, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 0,
                        transform: 'translate3d(0, 2000px, 0)'
                    }
                ],
                timings: {
                    duration: 900,
                    fill: 'both'
                },
                name: 'bounceOutDown'
            });
        }
    }
});
System.register("just-animate/animations/bounceOutLeft", [], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var bounceOutLeft;
    return {
        setters:[],
        execute: function() {
            exports_17("bounceOutLeft", bounceOutLeft = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        offset: 0.2,
                        opacity: 1,
                        transform: 'translate3d(20px, 0, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 0,
                        transform: 'translate3d(-2000px, 0, 0)'
                    }
                ],
                timings: {
                    duration: 900,
                    fill: 'both'
                },
                name: 'bounceOutLeft'
            });
        }
    }
});
System.register("just-animate/animations/bounceOutRight", [], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var bounceOutRight;
    return {
        setters:[],
        execute: function() {
            exports_18("bounceOutRight", bounceOutRight = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        offset: 0.2,
                        opacity: 1,
                        transform: 'translate3d(-20px, 0, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 0,
                        transform: 'translate3d(2000px, 0, 0)'
                    }
                ],
                timings: {
                    duration: 900,
                    fill: 'both'
                },
                name: 'bounceOutRight'
            });
        }
    }
});
System.register("just-animate/animations/bounceOutUp", [], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var bounceOutUp;
    return {
        setters:[],
        execute: function() {
            exports_19("bounceOutUp", bounceOutUp = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        offset: 0.2,
                        opacity: 1,
                        transform: 'translate3d(0, -10px, 0)'
                    },
                    {
                        offset: 0.4,
                        opacity: 1,
                        transform: 'translate3d(0, 20px, 0)'
                    },
                    {
                        offset: 0.45,
                        opacity: 1,
                        transform: 'translate3d(0, 20px, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 0,
                        transform: 'translate3d(0, -2000px, 0)'
                    }
                ],
                timings: {
                    duration: 900,
                    fill: 'both'
                },
                name: 'bounceOutUp'
            });
        }
    }
});
System.register("just-animate/animations/fadeIn", [], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var fadeIn;
    return {
        setters:[],
        execute: function() {
            exports_20("fadeIn", fadeIn = {
                keyframes: [
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1
                    }
                ],
                timings: {
                    duration: 650,
                    fill: 'both',
                    easing: 'ease-in'
                },
                name: 'fadeIn'
            });
        }
    }
});
System.register("just-animate/animations/fadeInDown", [], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var fadeInDown;
    return {
        setters:[],
        execute: function() {
            exports_21("fadeInDown", fadeInDown = {
                keyframes: [
                    {
                        opacity: 0,
                        translate3d: ['0', '-100%', '0']
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 650,
                    fill: 'both'
                },
                name: 'fadeInDown'
            });
        }
    }
});
System.register("just-animate/animations/fadeInDownBig", [], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var fadeInDownBig;
    return {
        setters:[],
        execute: function() {
            exports_22("fadeInDownBig", fadeInDownBig = {
                keyframes: [
                    {
                        opacity: 0,
                        transform: 'translate3d(0, -2000px, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1300,
                    fill: 'both',
                    easing: 'ease-out'
                },
                name: 'fadeInDownBig'
            });
        }
    }
});
System.register("just-animate/animations/fadeInLeft", [], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var fadeInLeft;
    return {
        setters:[],
        execute: function() {
            exports_23("fadeInLeft", fadeInLeft = {
                keyframes: [
                    {
                        opacity: 0,
                        transform: 'translate3d(-100%, 0, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 650,
                    fill: 'both',
                    easing: 'ease-in'
                },
                name: 'fadeInLeft'
            });
        }
    }
});
System.register("just-animate/animations/fadeInLeftBig", [], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var fadeInLeftBig;
    return {
        setters:[],
        execute: function() {
            exports_24("fadeInLeftBig", fadeInLeftBig = {
                keyframes: [
                    {
                        opacity: 0,
                        transform: 'translate3d(-2000px, 0, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1300,
                    fill: 'both',
                    easing: 'ease-out'
                },
                name: 'fadeInLeftBig'
            });
        }
    }
});
System.register("just-animate/animations/fadeInRight", [], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var fadeInRight;
    return {
        setters:[],
        execute: function() {
            exports_25("fadeInRight", fadeInRight = {
                keyframes: [
                    {
                        opacity: 0,
                        transform: 'translate3d(100%, 0, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 650,
                    fill: 'both',
                    easing: 'ease-in'
                },
                name: 'fadeInRight'
            });
        }
    }
});
System.register("just-animate/animations/fadeInRightBig", [], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var fadeInRightBig;
    return {
        setters:[],
        execute: function() {
            exports_26("fadeInRightBig", fadeInRightBig = {
                keyframes: [
                    {
                        opacity: 0,
                        transform: 'translate3d(2000px, 0, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1300,
                    fill: 'both',
                    easing: 'ease-out'
                },
                name: 'fadeInRightBig'
            });
        }
    }
});
System.register("just-animate/animations/fadeInUp", [], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var fadeInUp;
    return {
        setters:[],
        execute: function() {
            exports_27("fadeInUp", fadeInUp = {
                keyframes: [
                    {
                        opacity: 0,
                        transform: 'translate3d(0, 100%, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 650,
                    fill: 'both',
                    easing: 'ease-in'
                },
                name: 'fadeInUp'
            });
        }
    }
});
System.register("just-animate/animations/fadeInUpBig", [], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var fadeInUpBig;
    return {
        setters:[],
        execute: function() {
            exports_28("fadeInUpBig", fadeInUpBig = {
                keyframes: [
                    {
                        opacity: 0,
                        transform: 'translate3d(0, 2000px, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1300,
                    fill: 'both',
                    easing: 'ease-out'
                },
                name: 'fadeInUpBig'
            });
        }
    }
});
System.register("just-animate/animations/fadeOut", [], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var fadeOut;
    return {
        setters:[],
        execute: function() {
            exports_29("fadeOut", fadeOut = {
                keyframes: [
                    {
                        opacity: 1
                    },
                    {
                        opacity: 0
                    }
                ],
                timings: {
                    duration: 650,
                    fill: 'both'
                },
                name: 'fadeOut'
            });
        }
    }
});
System.register("just-animate/animations/fadeOutDown", [], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var fadeOutDown;
    return {
        setters:[],
        execute: function() {
            exports_30("fadeOutDown", fadeOutDown = {
                keyframes: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(0, 100%, 0)'
                    }
                ],
                timings: {
                    duration: 650
                },
                name: 'fadeOutDown'
            });
        }
    }
});
System.register("just-animate/animations/fadeOutDownBig", [], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var fadeOutDownBig;
    return {
        setters:[],
        execute: function() {
            exports_31("fadeOutDownBig", fadeOutDownBig = {
                keyframes: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(0, 2000px, 0)'
                    }
                ],
                timings: {
                    duration: 1300
                },
                name: 'fadeOutDownBig'
            });
        }
    }
});
System.register("just-animate/animations/fadeOutLeft", [], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var fadeOutLeft;
    return {
        setters:[],
        execute: function() {
            exports_32("fadeOutLeft", fadeOutLeft = {
                keyframes: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(-100%, 0, 0)'
                    }
                ],
                timings: {
                    duration: 650
                },
                name: 'fadeOutLeft'
            });
        }
    }
});
System.register("just-animate/animations/fadeOutLeftBig", [], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var fadeOutLeftBig;
    return {
        setters:[],
        execute: function() {
            exports_33("fadeOutLeftBig", fadeOutLeftBig = {
                keyframes: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(-2000px, 0, 0)'
                    }
                ],
                timings: {
                    duration: 1300
                },
                name: 'fadeOutLeftBig'
            });
        }
    }
});
System.register("just-animate/animations/fadeOutRight", [], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var fadeOutRight;
    return {
        setters:[],
        execute: function() {
            exports_34("fadeOutRight", fadeOutRight = {
                keyframes: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(100%, 0, 0)'
                    }
                ],
                timings: {
                    duration: 650
                },
                name: 'fadeOutRight'
            });
        }
    }
});
System.register("just-animate/animations/fadeOutRightBig", [], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var fadeOutRightBig;
    return {
        setters:[],
        execute: function() {
            exports_35("fadeOutRightBig", fadeOutRightBig = {
                keyframes: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(2000px, 0, 0)'
                    }
                ],
                timings: {
                    duration: 1300
                },
                name: 'fadeOutRightBig'
            });
        }
    }
});
System.register("just-animate/animations/fadeOutUp", [], function(exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var fadeOutUp;
    return {
        setters:[],
        execute: function() {
            exports_36("fadeOutUp", fadeOutUp = {
                keyframes: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(0, -100%, 0)'
                    }
                ],
                timings: {
                    duration: 650
                },
                name: 'fadeOutUp'
            });
        }
    }
});
System.register("just-animate/animations/fadeOutUpBig", [], function(exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var fadeOutUpBig;
    return {
        setters:[],
        execute: function() {
            exports_37("fadeOutUpBig", fadeOutUpBig = {
                keyframes: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(0, -2000px, 0)'
                    }
                ],
                timings: {
                    duration: 1300
                },
                name: 'fadeOutUpBig'
            });
        }
    }
});
System.register("just-animate/animations/flash", [], function(exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var flash;
    return {
        setters:[],
        execute: function() {
            exports_38("flash", flash = {
                keyframes: [
                    {
                        opacity: 1
                    },
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1
                    },
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'flash'
            });
        }
    }
});
System.register("just-animate/animations/flip", [], function(exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var flip;
    return {
        setters:[],
        execute: function() {
            exports_39("flip", flip = {
                keyframes: [
                    {
                        offset: 0,
                        transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)'
                    },
                    {
                        offset: 0.4,
                        transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)'
                    },
                    {
                        offset: 0.5,
                        transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)'
                    },
                    {
                        offset: 0.8,
                        transform: 'perspective(400px) scale3d(.95, .95, .95)'
                    },
                    {
                        offset: 1,
                        transform: 'perspective(400px)'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'flip'
            });
        }
    }
});
System.register("just-animate/animations/flipInX", [], function(exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var flipInX;
    return {
        setters:[],
        execute: function() {
            exports_40("flipInX", flipInX = {
                keyframes: [
                    {
                        offset: 0,
                        transform: 'perspective(400px)',
                        rotateX: '90deg',
                        opacity: 0
                    },
                    {
                        offset: 0.4,
                        transform: 'perspective(400px)',
                        rotateX: '20deg'
                    },
                    {
                        offset: 0.6,
                        transform: 'perspective(400px)',
                        rotateX: '10deg',
                        opacity: 1
                    },
                    {
                        offset: 0.8,
                        transform: 'perspective(400px)',
                        rotateX: '-5deg',
                    },
                    {
                        offset: 1,
                        opacity: 1,
                        transform: 'perspective(400px)'
                    }
                ],
                timings: {
                    duration: 750
                },
                name: 'flipInX'
            });
        }
    }
});
System.register("just-animate/animations/flipInY", [], function(exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var flipInY;
    return {
        setters:[],
        execute: function() {
            exports_41("flipInY", flipInY = {
                keyframes: [
                    {
                        offset: 0,
                        transform: 'perspective(400px)',
                        rotateY: '90deg',
                        opacity: 0
                    },
                    {
                        offset: 0.4,
                        transform: 'perspective(400px)',
                        rotateY: '-20deg',
                    },
                    {
                        offset: 0.6,
                        transform: 'perspective(400px)',
                        rotateY: '10deg',
                        opacity: 1
                    },
                    {
                        offset: 0.8,
                        transform: 'perspective(400px)',
                        rotateY: '-5deg',
                    },
                    {
                        offset: 1,
                        transform: 'perspective(400px)',
                        opacity: 1
                    }
                ],
                timings: {
                    duration: 750
                },
                name: 'flipInY'
            });
        }
    }
});
System.register("just-animate/animations/flipOutX", [], function(exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var flipOutX;
    return {
        setters:[],
        execute: function() {
            exports_42("flipOutX", flipOutX = {
                keyframes: [
                    {
                        offset: 0,
                        transform: 'perspective(400px)',
                        opacity: 1
                    },
                    {
                        offset: 0.3,
                        transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
                        opacity: 1
                    },
                    {
                        offset: 1,
                        transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
                        opacity: 0
                    }
                ],
                timings: {
                    duration: 750
                },
                name: 'flipOutX'
            });
        }
    }
});
System.register("just-animate/animations/flipOutY", [], function(exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var flipOutY;
    return {
        setters:[],
        execute: function() {
            exports_43("flipOutY", flipOutY = {
                keyframes: [
                    {
                        offset: 0,
                        transform: 'perspective(400px)',
                        opacity: 1
                    },
                    {
                        offset: 0.3,
                        transform: 'perspective(400px) rotate3d(0, 1, 0, -15deg)',
                        opacity: 1
                    },
                    {
                        offset: 1,
                        transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
                        opacity: 0
                    }
                ],
                timings: {
                    duration: 750
                },
                name: 'flipOutY'
            });
        }
    }
});
System.register("just-animate/animations/headShake", [], function(exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var headShake;
    return {
        setters:[],
        execute: function() {
            exports_44("headShake", headShake = {
                keyframes: [
                    {
                        offset: 0,
                        translateX: '0'
                    },
                    {
                        offset: 0.065,
                        translateX: '-6px',
                        rotateY: '-9deg'
                    },
                    {
                        offset: 0.185,
                        translateX: '5px',
                        rotateY: '7deg'
                    },
                    {
                        offset: 0.315,
                        translateX: '-3px',
                        rotateY: '-5deg'
                    },
                    {
                        offset: 0.435,
                        translateX: '2px',
                        rotateY: '3deg'
                    },
                    {
                        offset: 0.5,
                        translateX: '0'
                    },
                    {
                        offset: 1,
                        translateX: '0'
                    }
                ],
                timings: {
                    duration: 1000,
                    easing: 'ease-out'
                },
                name: 'headShake'
            });
        }
    }
});
System.register("just-animate/animations/hinge", [], function(exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var hinge;
    return {
        setters:[],
        execute: function() {
            exports_45("hinge", hinge = {
                keyframes: [
                    {
                        transform: 'none',
                        'transform-origin': 'top left',
                        opacity: 1
                    },
                    {
                        transform: 'rotate3d(0, 0, 1, 80deg)',
                        opacity: 1
                    },
                    {
                        transform: 'rotate3d(0, 0, 1, 60deg)',
                        opacity: 1
                    },
                    {
                        transform: 'rotate3d(0, 0, 1, 80deg)',
                        opacity: 0
                    },
                    {
                        transform: 'rotate3d(0, 0, 1, 60deg)',
                        opacity: 1
                    },
                    {
                        transform: 'translate3d(0, 700px, 0)',
                        'transform-origin': 'top left',
                        opacity: 0
                    }
                ],
                timings: {
                    duration: 2000
                },
                name: 'hinge'
            });
        }
    }
});
System.register("just-animate/animations/jello", [], function(exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var jello;
    return {
        setters:[],
        execute: function() {
            exports_46("jello", jello = {
                keyframes: [
                    {
                        offset: 0,
                        transform: 'none'
                    },
                    {
                        offset: 0.111,
                        transform: 'none'
                    },
                    {
                        offset: 0.222,
                        transform: 'skewX(-12.5deg) skewY(-12.5deg)'
                    },
                    {
                        offset: 0.333,
                        transform: 'skewX(6.25deg) skewY(6.25deg)'
                    },
                    {
                        offset: 0.444,
                        transform: 'skewX(-3.125deg) skewY(-3.125deg)'
                    },
                    {
                        offset: 0.555,
                        transform: 'skewX(1.5625deg) skewY(1.5625deg)'
                    },
                    {
                        offset: 0.666,
                        transform: 'skewX(-0.78125deg) skewY(-0.78125deg)'
                    },
                    {
                        offset: 0.777,
                        transform: 'skewX(0.390625deg) skewY(0.390625deg)'
                    },
                    {
                        offset: 0.888,
                        transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)'
                    },
                    {
                        offset: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1000,
                    fill: 'both',
                    easing: 'ease-in-out'
                },
                name: 'jello'
            });
        }
    }
});
System.register("just-animate/animations/lightSpeedIn", [], function(exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var lightSpeedIn;
    return {
        setters:[],
        execute: function() {
            exports_47("lightSpeedIn", lightSpeedIn = {
                keyframes: [
                    {
                        offset: 0,
                        transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
                        opacity: 0
                    },
                    {
                        offset: 0.6,
                        transform: 'skewX(20deg)',
                        opacity: 1
                    },
                    {
                        offset: 0.8,
                        transform: 'skewX(-5deg)',
                        opacity: 1
                    },
                    {
                        offset: 1,
                        transform: 'none',
                        opacity: 1
                    }
                ],
                timings: {
                    duration: 1000,
                    fill: 'both',
                    easing: 'ease-out'
                },
                name: 'lightSpeedIn'
            });
        }
    }
});
System.register("just-animate/animations/lightSpeedOut", [], function(exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var lightSpeedOut;
    return {
        setters:[],
        execute: function() {
            exports_48("lightSpeedOut", lightSpeedOut = {
                keyframes: [
                    {
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        transform: 'translate3d(100%, 0, 0) skewX(30deg)',
                        opacity: 0
                    }
                ],
                timings: {
                    duration: 1000,
                    fill: 'both',
                    easing: 'ease-in'
                },
                name: 'lightSpeedOut'
            });
        }
    }
});
System.register("just-animate/animations/pulse", [], function(exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var pulse;
    return {
        setters:[],
        execute: function() {
            exports_49("pulse", pulse = {
                keyframes: [
                    {
                        transform: 'scale3d(1, 1, 1)'
                    },
                    {
                        transform: 'scale3d(1.05, 1.05, 1.05)'
                    },
                    {
                        transform: 'scale3d(1, 1, 1)'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'pulse'
            });
        }
    }
});
System.register("just-animate/animations/rollIn", [], function(exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var rollIn;
    return {
        setters:[],
        execute: function() {
            exports_50("rollIn", rollIn = {
                keyframes: [
                    {
                        opacity: 0,
                        transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rollIn'
            });
        }
    }
});
System.register("just-animate/animations/rollOut", [], function(exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var rollOut;
    return {
        setters:[],
        execute: function() {
            exports_51("rollOut", rollOut = {
                keyframes: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rollOut'
            });
        }
    }
});
System.register("just-animate/animations/rotateIn", [], function(exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var rotateIn;
    return {
        setters:[],
        execute: function() {
            exports_52("rotateIn", rotateIn = {
                keyframes: [
                    {
                        'transform-origin': 'center',
                        transform: 'rotate3d(0, 0, 1, -200deg)',
                        opacity: 0
                    },
                    {
                        'transform-origin': 'center',
                        transform: 'none',
                        opacity: 1
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rotateIn'
            });
        }
    }
});
System.register("just-animate/animations/rotateInDownLeft", [], function(exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var rotateInDownLeft;
    return {
        setters:[],
        execute: function() {
            exports_53("rotateInDownLeft", rotateInDownLeft = {
                keyframes: [
                    {
                        'transform-origin': 'left bottom',
                        transform: 'rotate3d(0, 0, 1, -45deg)',
                        opacity: 0
                    },
                    {
                        'transform-origin': 'left bottom',
                        transform: 'none',
                        opacity: 1
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rotateInDownLeft'
            });
        }
    }
});
System.register("just-animate/animations/rotateInDownRight", [], function(exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var rotateInDownRight;
    return {
        setters:[],
        execute: function() {
            exports_54("rotateInDownRight", rotateInDownRight = {
                keyframes: [
                    {
                        'transform-origin': 'right bottom',
                        transform: 'rotate3d(0, 0, 1, 45deg)',
                        opacity: 0
                    },
                    {
                        'transform-origin': 'right bottom',
                        transform: 'none',
                        opacity: 1
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rotateInDownRight'
            });
        }
    }
});
System.register("just-animate/animations/rotateInUpLeft", [], function(exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var rotateInUpLeft;
    return {
        setters:[],
        execute: function() {
            exports_55("rotateInUpLeft", rotateInUpLeft = {
                keyframes: [
                    {
                        'transform-origin': 'left bottom',
                        transform: 'rotate3d(0, 0, 1, 45deg)',
                        opacity: 0
                    },
                    {
                        'transform-origin': 'left bottom',
                        transform: 'none',
                        opacity: 1
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rotateInUpLeft'
            });
        }
    }
});
System.register("just-animate/animations/rotateInUpRight", [], function(exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var rotateInUpRight;
    return {
        setters:[],
        execute: function() {
            exports_56("rotateInUpRight", rotateInUpRight = {
                keyframes: [
                    {
                        'transform-origin': 'right bottom',
                        transform: 'rotate3d(0, 0, 1, -90deg)',
                        opacity: 0
                    },
                    {
                        'transform-origin': 'right bottom',
                        transform: 'none',
                        opacity: 1
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rotateInUpRight'
            });
        }
    }
});
System.register("just-animate/animations/rotateOut", [], function(exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    var rotateOut;
    return {
        setters:[],
        execute: function() {
            exports_57("rotateOut", rotateOut = {
                keyframes: [
                    {
                        'transform-origin': 'center',
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        'transform-origin': 'center',
                        transform: 'rotate3d(0, 0, 1, 200deg)',
                        opacity: 0
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rotateOut'
            });
        }
    }
});
System.register("just-animate/animations/rotateOutDownLeft", [], function(exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    var rotateOutDownLeft;
    return {
        setters:[],
        execute: function() {
            exports_58("rotateOutDownLeft", rotateOutDownLeft = {
                keyframes: [
                    {
                        'transform-origin': 'left bottom',
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        'transform-origin': 'left bottom',
                        transform: 'rotate3d(0, 0, 1, 45deg)',
                        opacity: 0
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rotateOutDownLeft'
            });
        }
    }
});
System.register("just-animate/animations/rotateOutDownRight", [], function(exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    var rotateOutDownRight;
    return {
        setters:[],
        execute: function() {
            exports_59("rotateOutDownRight", rotateOutDownRight = {
                keyframes: [
                    {
                        'transform-origin': 'right bottom',
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        'transform-origin': 'right bottom',
                        transform: 'rotate3d(0, 0, 1, -45deg)',
                        opacity: 0
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rotateOutDownRight'
            });
        }
    }
});
System.register("just-animate/animations/rotateOutUpLeft", [], function(exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    var rotateOutUpLeft;
    return {
        setters:[],
        execute: function() {
            exports_60("rotateOutUpLeft", rotateOutUpLeft = {
                keyframes: [
                    {
                        'transform-origin': 'left bottom',
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        'transform-origin': 'left bottom',
                        transform: 'rotate3d(0, 0, 1, -45deg)',
                        opacity: 0
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rotateOutUpLeft'
            });
        }
    }
});
System.register("just-animate/animations/rotateOutUpRight", [], function(exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
    var rotateOutUpRight;
    return {
        setters:[],
        execute: function() {
            exports_61("rotateOutUpRight", rotateOutUpRight = {
                keyframes: [
                    {
                        'transform-origin': 'right bottom',
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        'transform-origin': 'right bottom',
                        transform: 'rotate3d(0, 0, 1, 90deg)',
                        opacity: 0
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rotateOutUpRight'
            });
        }
    }
});
System.register("just-animate/animations/rubberBand", [], function(exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
    var rubberBand;
    return {
        setters:[],
        execute: function() {
            exports_62("rubberBand", rubberBand = {
                keyframes: [
                    {
                        offset: 0,
                        transform: 'scale3d(1, 1, 1)'
                    },
                    {
                        offset: 0.3,
                        transform: 'scale3d(1.25, 0.75, 1)'
                    },
                    {
                        offset: 0.4,
                        transform: 'scale3d(0.75, 1.25, 1)'
                    },
                    {
                        offset: 0.5,
                        transform: 'scale3d(1.15, 0.85, 1)'
                    },
                    {
                        offset: 0.65,
                        transform: 'scale3d(.95, 1.05, 1)'
                    },
                    {
                        offset: 0.75,
                        transform: 'scale3d(1.05, .95, 1)'
                    },
                    {
                        offset: 1,
                        transform: 'scale3d(1, 1, 1)'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'rubberBand'
            });
        }
    }
});
System.register("just-animate/animations/shake", [], function(exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    var shake;
    return {
        setters:[],
        execute: function() {
            exports_63("shake", shake = {
                keyframes: [
                    {
                        transform: 'translate3d(0, 0, 0)'
                    },
                    {
                        transform: 'translate3d(-10px, 0, 0)'
                    },
                    {
                        transform: 'translate3d(10px, 0, 0)'
                    },
                    {
                        transform: 'translate3d(-10px, 0, 0)'
                    },
                    {
                        transform: 'translate3d(10px, 0, 0)'
                    },
                    {
                        transform: 'translate3d(-10px, 0, 0)'
                    },
                    {
                        transform: 'translate3d(10px, 0, 0)'
                    },
                    {
                        transform: 'translate3d(-10px, 0, 0)'
                    },
                    {
                        transform: 'translate3d(10px, 0, 0)'
                    },
                    {
                        transform: 'translate3d(-10px, 0, 0)'
                    },
                    {
                        transform: 'translate3d(0, 0, 0)'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'shake'
            });
        }
    }
});
System.register("just-animate/animations/slideInDown", [], function(exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    var slideInDown;
    return {
        setters:[],
        execute: function() {
            exports_64("slideInDown", slideInDown = {
                keyframes: [
                    {
                        transform: 'translate3d(0, -100%, 0)',
                        visibility: 'hidden'
                    },
                    {
                        transform: 'translate3d(0, 0, 0)',
                        visibility: 'visible'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'slideInDown'
            });
        }
    }
});
System.register("just-animate/animations/slideInLeft", [], function(exports_65, context_65) {
    "use strict";
    var __moduleName = context_65 && context_65.id;
    var slideInLeft;
    return {
        setters:[],
        execute: function() {
            exports_65("slideInLeft", slideInLeft = {
                keyframes: [
                    {
                        transform: 'translate3d(-100%, 0, 0)',
                        visibility: 'hidden'
                    },
                    {
                        transform: 'translate3d(0, 0, 0)',
                        visibility: 'visible'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'slideInLeft'
            });
        }
    }
});
System.register("just-animate/animations/slideInRight", [], function(exports_66, context_66) {
    "use strict";
    var __moduleName = context_66 && context_66.id;
    var slideInRight;
    return {
        setters:[],
        execute: function() {
            exports_66("slideInRight", slideInRight = {
                keyframes: [
                    {
                        transform: 'translate3d(100%, 0, 0)',
                        visibility: 'hidden'
                    },
                    {
                        transform: 'translate3d(0, 0, 0)',
                        visibility: 'visible'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'slideInRight'
            });
        }
    }
});
System.register("just-animate/animations/slideInUp", [], function(exports_67, context_67) {
    "use strict";
    var __moduleName = context_67 && context_67.id;
    var slideInUp;
    return {
        setters:[],
        execute: function() {
            exports_67("slideInUp", slideInUp = {
                keyframes: [
                    {
                        transform: 'translate3d(0, 100%, 0)',
                        visibility: 'hidden'
                    },
                    {
                        transform: 'translate3d(0, 0, 0)',
                        visibility: 'visible'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'slideInUp'
            });
        }
    }
});
System.register("just-animate/animations/slideOutDown", [], function(exports_68, context_68) {
    "use strict";
    var __moduleName = context_68 && context_68.id;
    var slideOutDown;
    return {
        setters:[],
        execute: function() {
            exports_68("slideOutDown", slideOutDown = {
                keyframes: [
                    {
                        transform: 'translate3d(0, 0, 0)',
                        visibility: 'visible'
                    },
                    {
                        visibility: 'hidden',
                        transform: 'translate3d(0, 100%, 0)'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'slideOutDown'
            });
        }
    }
});
System.register("just-animate/animations/slideOutLeft", [], function(exports_69, context_69) {
    "use strict";
    var __moduleName = context_69 && context_69.id;
    var slideOutLeft;
    return {
        setters:[],
        execute: function() {
            exports_69("slideOutLeft", slideOutLeft = {
                keyframes: [
                    {
                        visibility: 'visible',
                        transform: 'translate3d(0, 0, 0)'
                    },
                    {
                        visibility: 'hidden',
                        transform: 'translate3d(-100%, 0, 0)'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'slideOutLeft'
            });
        }
    }
});
System.register("just-animate/animations/slideOutRight", [], function(exports_70, context_70) {
    "use strict";
    var __moduleName = context_70 && context_70.id;
    var slideOutRight;
    return {
        setters:[],
        execute: function() {
            exports_70("slideOutRight", slideOutRight = {
                keyframes: [
                    {
                        visibility: 'visible',
                        transform: 'translate3d(0, 0, 0)'
                    },
                    {
                        visibility: 'hidden',
                        transform: 'translate3d(100%, 0, 0)'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'slideOutRight'
            });
        }
    }
});
System.register("just-animate/animations/slideOutUp", [], function(exports_71, context_71) {
    "use strict";
    var __moduleName = context_71 && context_71.id;
    var slideOutUp;
    return {
        setters:[],
        execute: function() {
            exports_71("slideOutUp", slideOutUp = {
                keyframes: [
                    {
                        visibility: 'visible',
                        transform: 'translate3d(0, 0, 0)'
                    },
                    {
                        visibility: 'hidden',
                        transform: 'translate3d(0, -100%, 0)'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'slideOutUp'
            });
        }
    }
});
System.register("just-animate/animations/swing", [], function(exports_72, context_72) {
    "use strict";
    var __moduleName = context_72 && context_72.id;
    var swing;
    return {
        setters:[],
        execute: function() {
            exports_72("swing", swing = {
                keyframes: [
                    {
                        transform: 'none'
                    },
                    {
                        transform: 'rotate3d(0, 0, 1, 15deg)'
                    },
                    {
                        transform: 'rotate3d(0, 0, 1, -10deg)'
                    },
                    {
                        transform: 'rotate3d(0, 0, 1, 5deg)'
                    },
                    {
                        transform: 'rotate3d(0, 0, 1, -5deg)'
                    },
                    {
                        transform: 'rotate3d(0, 0, 1, 0deg)'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'swing'
            });
        }
    }
});
System.register("just-animate/animations/tada", [], function(exports_73, context_73) {
    "use strict";
    var __moduleName = context_73 && context_73.id;
    var tada;
    return {
        setters:[],
        execute: function() {
            exports_73("tada", tada = {
                keyframes: [
                    {
                        transform: 'scale3d(1, 1, 1)'
                    },
                    {
                        transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)'
                    },
                    {
                        transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)'
                    },
                    {
                        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
                    },
                    {
                        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
                    },
                    {
                        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
                    },
                    {
                        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
                    },
                    {
                        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
                    },
                    {
                        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
                    },
                    {
                        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
                    },
                    {
                        transform: 'scale3d(1, 1, 1)'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'tada'
            });
        }
    }
});
System.register("just-animate/animations/wobble", [], function(exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    var wobble;
    return {
        setters:[],
        execute: function() {
            exports_74("wobble", wobble = {
                keyframes: [
                    {
                        offset: 0,
                        transform: 'none'
                    },
                    {
                        offset: 0.15,
                        transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)'
                    },
                    {
                        offset: 0.3,
                        transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)'
                    },
                    {
                        offset: 0.45,
                        transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)'
                    },
                    {
                        offset: 0.6,
                        transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)'
                    },
                    {
                        offset: 0.75,
                        transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)'
                    },
                    {
                        offset: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1000
                },
                name: 'wobble'
            });
        }
    }
});
System.register("just-animate/animations/zoomIn", [], function(exports_75, context_75) {
    "use strict";
    var __moduleName = context_75 && context_75.id;
    var zoomIn;
    return {
        setters:[],
        execute: function() {
            exports_75("zoomIn", zoomIn = {
                keyframes: [
                    {
                        opacity: 0,
                        transform: 'scale3d(.3, .3, .3)'
                    },
                    {
                        opacity: 1
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1000,
                    easing: 'elegantSlowStartEnd'
                },
                name: 'zoomIn'
            });
        }
    }
});
System.register("just-animate/animations/zoomInDown", [], function(exports_76, context_76) {
    "use strict";
    var __moduleName = context_76 && context_76.id;
    var zoomInDown;
    return {
        setters:[],
        execute: function() {
            exports_76("zoomInDown", zoomInDown = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 0,
                        transform: 'scale3d(.1, .1, .1) translate3d(0, -1000px, 0)'
                    },
                    {
                        offset: 0.6,
                        opacity: 1,
                        transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1000,
                    easing: 'easeInCubic'
                },
                name: 'zoomInDown'
            });
        }
    }
});
System.register("just-animate/animations/zoomInLeft", [], function(exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
    var zoomInLeft;
    return {
        setters:[],
        execute: function() {
            exports_77("zoomInLeft", zoomInLeft = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 0,
                        transform: 'scale3d(.1, .1, .1) translate3d(-1000px, 0, 0)'
                    },
                    {
                        offset: 0.6,
                        opacity: 1,
                        transform: 'scale3d(.475, .475, .475) translate3d(10px, 0, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1000,
                    easing: 'elegantSlowStartEnd'
                },
                name: 'zoomInLeft'
            });
        }
    }
});
System.register("just-animate/animations/zoomInRight", [], function(exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    var zoomInRight;
    return {
        setters:[],
        execute: function() {
            exports_78("zoomInRight", zoomInRight = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 0,
                        transform: 'scale3d(.1, .1, .1) translate3d(1000px, 0, 0)'
                    },
                    {
                        offset: 0.6,
                        opacity: 1,
                        transform: 'scale3d(.475, .475, .475) translate3d(-10px, 0, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1000,
                    easing: 'elegantSlowStartEnd'
                },
                name: 'zoomInRight'
            });
        }
    }
});
System.register("just-animate/animations/zoomInUp", [], function(exports_79, context_79) {
    "use strict";
    var __moduleName = context_79 && context_79.id;
    var zoomInUp;
    return {
        setters:[],
        execute: function() {
            exports_79("zoomInUp", zoomInUp = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 0,
                        transform: 'scale3d(.1, .1, .1) translate3d(0, 1000px, 0)'
                    },
                    {
                        offset: 0.6,
                        opacity: 1,
                        transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                timings: {
                    duration: 1000,
                    easing: 'elegantSlowStartEnd'
                },
                name: 'zoomInUp'
            });
        }
    }
});
System.register("just-animate/animations/zoomOut", [], function(exports_80, context_80) {
    "use strict";
    var __moduleName = context_80 && context_80.id;
    var zoomOut;
    return {
        setters:[],
        execute: function() {
            exports_80("zoomOut", zoomOut = {
                keyframes: [
                    {
                        opacity: 1,
                        transform: 'none',
                        'transform-origin': 'center middle'
                    },
                    {
                        opacity: 0,
                        transform: 'scale3d(.3, .3, .3)'
                    },
                    {
                        opacity: 0,
                        transform: 'none',
                        'transform-origin': 'center middle'
                    }
                ],
                timings: {
                    duration: 1000,
                    easing: 'elegantSlowStartEnd'
                },
                name: 'zoomOut'
            });
        }
    }
});
System.register("just-animate/animations/zoomOutDown", [], function(exports_81, context_81) {
    "use strict";
    var __moduleName = context_81 && context_81.id;
    var zoomOutDown;
    return {
        setters:[],
        execute: function() {
            exports_81("zoomOutDown", zoomOutDown = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none',
                        'transform-origin': 'center bottom'
                    },
                    {
                        offset: 0.4,
                        opacity: 1,
                        transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)',
                        'transform-origin': 'center bottom'
                    },
                    {
                        offset: 1,
                        opacity: 0,
                        transform: 'scale3d(.1, .1, .1) translate3d(0, 2000px, 0)',
                        'transform-origin': 'center bottom'
                    }
                ],
                timings: {
                    duration: 1000,
                    easing: 'elegantSlowStartEnd'
                },
                name: 'zoomOutDown'
            });
        }
    }
});
System.register("just-animate/animations/zoomOutLeft", [], function(exports_82, context_82) {
    "use strict";
    var __moduleName = context_82 && context_82.id;
    var zoomOutLeft;
    return {
        setters:[],
        execute: function() {
            exports_82("zoomOutLeft", zoomOutLeft = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none',
                        'transform-origin': 'left center'
                    },
                    {
                        offset: 0.4,
                        opacity: 1,
                        transform: 'scale3d(.475, .475, .475) translate3d(42px, 0, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 0,
                        transform: 'scale(.1) translate3d(-2000px, 0, 0)',
                        'transform-origin': 'left center'
                    }
                ],
                timings: {
                    duration: 1000,
                    easing: 'elegantSlowStartEnd'
                },
                name: 'zoomOutLeft'
            });
        }
    }
});
System.register("just-animate/animations/zoomOutRight", [], function(exports_83, context_83) {
    "use strict";
    var __moduleName = context_83 && context_83.id;
    var zoomOutRight;
    return {
        setters:[],
        execute: function() {
            exports_83("zoomOutRight", zoomOutRight = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none',
                        'transform-origin': 'right center'
                    },
                    {
                        offset: 0.4,
                        opacity: 1,
                        transform: 'scale3d(.475, .475, .475) translate3d(-42px, 0, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 0,
                        transform: 'scale(.1) translate3d(2000px, 0, 0)',
                        'transform-origin': 'right center'
                    }
                ],
                timings: {
                    duration: 1000,
                    easing: 'elegantSlowStartEnd'
                },
                name: 'zoomOutRight'
            });
        }
    }
});
System.register("just-animate/animations/zoomOutUp", [], function(exports_84, context_84) {
    "use strict";
    var __moduleName = context_84 && context_84.id;
    var zoomOutUp;
    return {
        setters:[],
        execute: function() {
            exports_84("zoomOutUp", zoomOutUp = {
                keyframes: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none',
                        'transform-origin': 'center bottom'
                    },
                    {
                        offset: 0.4,
                        opacity: 1,
                        transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)'
                    },
                    {
                        offset: 1,
                        opacity: 0,
                        transform: 'scale3d(.1, .1, .1) translate3d(0, -2000px, 0)',
                        'transform-origin': 'center bottom'
                    }
                ],
                timings: {
                    duration: 1000,
                    easing: 'elegantSlowStartEnd'
                },
                name: 'zoomOutUp'
            });
        }
    }
});
System.register("just-animate/animations", ["just-animate/animations/bounce", "just-animate/animations/bounceIn", "just-animate/animations/bounceInDown", "just-animate/animations/bounceInLeft", "just-animate/animations/bounceInRight", "just-animate/animations/bounceInUp", "just-animate/animations/bounceOut", "just-animate/animations/bounceOutDown", "just-animate/animations/bounceOutLeft", "just-animate/animations/bounceOutRight", "just-animate/animations/bounceOutUp", "just-animate/animations/fadeIn", "just-animate/animations/fadeInDown", "just-animate/animations/fadeInDownBig", "just-animate/animations/fadeInLeft", "just-animate/animations/fadeInLeftBig", "just-animate/animations/fadeInRight", "just-animate/animations/fadeInRightBig", "just-animate/animations/fadeInUp", "just-animate/animations/fadeInUpBig", "just-animate/animations/fadeOut", "just-animate/animations/fadeOutDown", "just-animate/animations/fadeOutDownBig", "just-animate/animations/fadeOutLeft", "just-animate/animations/fadeOutLeftBig", "just-animate/animations/fadeOutRight", "just-animate/animations/fadeOutRightBig", "just-animate/animations/fadeOutUp", "just-animate/animations/fadeOutUpBig", "just-animate/animations/flash", "just-animate/animations/flip", "just-animate/animations/flipInX", "just-animate/animations/flipInY", "just-animate/animations/flipOutX", "just-animate/animations/flipOutY", "just-animate/animations/headShake", "just-animate/animations/hinge", "just-animate/animations/jello", "just-animate/animations/lightSpeedIn", "just-animate/animations/lightSpeedOut", "just-animate/animations/pulse", "just-animate/animations/rollIn", "just-animate/animations/rollOut", "just-animate/animations/rotateIn", "just-animate/animations/rotateInDownLeft", "just-animate/animations/rotateInDownRight", "just-animate/animations/rotateInUpLeft", "just-animate/animations/rotateInUpRight", "just-animate/animations/rotateOut", "just-animate/animations/rotateOutDownLeft", "just-animate/animations/rotateOutDownRight", "just-animate/animations/rotateOutUpLeft", "just-animate/animations/rotateOutUpRight", "just-animate/animations/rubberBand", "just-animate/animations/shake", "just-animate/animations/slideInDown", "just-animate/animations/slideInLeft", "just-animate/animations/slideInRight", "just-animate/animations/slideInUp", "just-animate/animations/slideOutDown", "just-animate/animations/slideOutLeft", "just-animate/animations/slideOutRight", "just-animate/animations/slideOutUp", "just-animate/animations/swing", "just-animate/animations/tada", "just-animate/animations/wobble", "just-animate/animations/zoomIn", "just-animate/animations/zoomInDown", "just-animate/animations/zoomInLeft", "just-animate/animations/zoomInRight", "just-animate/animations/zoomInUp", "just-animate/animations/zoomOut", "just-animate/animations/zoomOutDown", "just-animate/animations/zoomOutLeft", "just-animate/animations/zoomOutRight", "just-animate/animations/zoomOutUp"], function(exports_85, context_85) {
    "use strict";
    var __moduleName = context_85 && context_85.id;
    var bounce_1, bounceIn_1, bounceInDown_1, bounceInLeft_1, bounceInRight_1, bounceInUp_1, bounceOut_1, bounceOutDown_1, bounceOutLeft_1, bounceOutRight_1, bounceOutUp_1, fadeIn_1, fadeInDown_1, fadeInDownBig_1, fadeInLeft_1, fadeInLeftBig_1, fadeInRight_1, fadeInRightBig_1, fadeInUp_1, fadeInUpBig_1, fadeOut_1, fadeOutDown_1, fadeOutDownBig_1, fadeOutLeft_1, fadeOutLeftBig_1, fadeOutRight_1, fadeOutRightBig_1, fadeOutUp_1, fadeOutUpBig_1, flash_1, flip_1, flipInX_1, flipInY_1, flipOutX_1, flipOutY_1, headShake_1, hinge_1, jello_1, lightSpeedIn_1, lightSpeedOut_1, pulse_1, rollIn_1, rollOut_1, rotateIn_1, rotateInDownLeft_1, rotateInDownRight_1, rotateInUpLeft_1, rotateInUpRight_1, rotateOut_1, rotateOutDownLeft_1, rotateOutDownRight_1, rotateOutUpLeft_1, rotateOutUpRight_1, rubberBand_1, shake_1, slideInDown_1, slideInLeft_1, slideInRight_1, slideInUp_1, slideOutDown_1, slideOutLeft_1, slideOutRight_1, slideOutUp_1, swing_1, tada_1, wobble_1, zoomIn_1, zoomInDown_1, zoomInLeft_1, zoomInRight_1, zoomInUp_1, zoomOut_1, zoomOutDown_1, zoomOutLeft_1, zoomOutRight_1, zoomOutUp_1;
    var ANIMATE_CSS;
    return {
        setters:[
            function (bounce_1_1) {
                bounce_1 = bounce_1_1;
            },
            function (bounceIn_1_1) {
                bounceIn_1 = bounceIn_1_1;
            },
            function (bounceInDown_1_1) {
                bounceInDown_1 = bounceInDown_1_1;
            },
            function (bounceInLeft_1_1) {
                bounceInLeft_1 = bounceInLeft_1_1;
            },
            function (bounceInRight_1_1) {
                bounceInRight_1 = bounceInRight_1_1;
            },
            function (bounceInUp_1_1) {
                bounceInUp_1 = bounceInUp_1_1;
            },
            function (bounceOut_1_1) {
                bounceOut_1 = bounceOut_1_1;
            },
            function (bounceOutDown_1_1) {
                bounceOutDown_1 = bounceOutDown_1_1;
            },
            function (bounceOutLeft_1_1) {
                bounceOutLeft_1 = bounceOutLeft_1_1;
            },
            function (bounceOutRight_1_1) {
                bounceOutRight_1 = bounceOutRight_1_1;
            },
            function (bounceOutUp_1_1) {
                bounceOutUp_1 = bounceOutUp_1_1;
            },
            function (fadeIn_1_1) {
                fadeIn_1 = fadeIn_1_1;
            },
            function (fadeInDown_1_1) {
                fadeInDown_1 = fadeInDown_1_1;
            },
            function (fadeInDownBig_1_1) {
                fadeInDownBig_1 = fadeInDownBig_1_1;
            },
            function (fadeInLeft_1_1) {
                fadeInLeft_1 = fadeInLeft_1_1;
            },
            function (fadeInLeftBig_1_1) {
                fadeInLeftBig_1 = fadeInLeftBig_1_1;
            },
            function (fadeInRight_1_1) {
                fadeInRight_1 = fadeInRight_1_1;
            },
            function (fadeInRightBig_1_1) {
                fadeInRightBig_1 = fadeInRightBig_1_1;
            },
            function (fadeInUp_1_1) {
                fadeInUp_1 = fadeInUp_1_1;
            },
            function (fadeInUpBig_1_1) {
                fadeInUpBig_1 = fadeInUpBig_1_1;
            },
            function (fadeOut_1_1) {
                fadeOut_1 = fadeOut_1_1;
            },
            function (fadeOutDown_1_1) {
                fadeOutDown_1 = fadeOutDown_1_1;
            },
            function (fadeOutDownBig_1_1) {
                fadeOutDownBig_1 = fadeOutDownBig_1_1;
            },
            function (fadeOutLeft_1_1) {
                fadeOutLeft_1 = fadeOutLeft_1_1;
            },
            function (fadeOutLeftBig_1_1) {
                fadeOutLeftBig_1 = fadeOutLeftBig_1_1;
            },
            function (fadeOutRight_1_1) {
                fadeOutRight_1 = fadeOutRight_1_1;
            },
            function (fadeOutRightBig_1_1) {
                fadeOutRightBig_1 = fadeOutRightBig_1_1;
            },
            function (fadeOutUp_1_1) {
                fadeOutUp_1 = fadeOutUp_1_1;
            },
            function (fadeOutUpBig_1_1) {
                fadeOutUpBig_1 = fadeOutUpBig_1_1;
            },
            function (flash_1_1) {
                flash_1 = flash_1_1;
            },
            function (flip_1_1) {
                flip_1 = flip_1_1;
            },
            function (flipInX_1_1) {
                flipInX_1 = flipInX_1_1;
            },
            function (flipInY_1_1) {
                flipInY_1 = flipInY_1_1;
            },
            function (flipOutX_1_1) {
                flipOutX_1 = flipOutX_1_1;
            },
            function (flipOutY_1_1) {
                flipOutY_1 = flipOutY_1_1;
            },
            function (headShake_1_1) {
                headShake_1 = headShake_1_1;
            },
            function (hinge_1_1) {
                hinge_1 = hinge_1_1;
            },
            function (jello_1_1) {
                jello_1 = jello_1_1;
            },
            function (lightSpeedIn_1_1) {
                lightSpeedIn_1 = lightSpeedIn_1_1;
            },
            function (lightSpeedOut_1_1) {
                lightSpeedOut_1 = lightSpeedOut_1_1;
            },
            function (pulse_1_1) {
                pulse_1 = pulse_1_1;
            },
            function (rollIn_1_1) {
                rollIn_1 = rollIn_1_1;
            },
            function (rollOut_1_1) {
                rollOut_1 = rollOut_1_1;
            },
            function (rotateIn_1_1) {
                rotateIn_1 = rotateIn_1_1;
            },
            function (rotateInDownLeft_1_1) {
                rotateInDownLeft_1 = rotateInDownLeft_1_1;
            },
            function (rotateInDownRight_1_1) {
                rotateInDownRight_1 = rotateInDownRight_1_1;
            },
            function (rotateInUpLeft_1_1) {
                rotateInUpLeft_1 = rotateInUpLeft_1_1;
            },
            function (rotateInUpRight_1_1) {
                rotateInUpRight_1 = rotateInUpRight_1_1;
            },
            function (rotateOut_1_1) {
                rotateOut_1 = rotateOut_1_1;
            },
            function (rotateOutDownLeft_1_1) {
                rotateOutDownLeft_1 = rotateOutDownLeft_1_1;
            },
            function (rotateOutDownRight_1_1) {
                rotateOutDownRight_1 = rotateOutDownRight_1_1;
            },
            function (rotateOutUpLeft_1_1) {
                rotateOutUpLeft_1 = rotateOutUpLeft_1_1;
            },
            function (rotateOutUpRight_1_1) {
                rotateOutUpRight_1 = rotateOutUpRight_1_1;
            },
            function (rubberBand_1_1) {
                rubberBand_1 = rubberBand_1_1;
            },
            function (shake_1_1) {
                shake_1 = shake_1_1;
            },
            function (slideInDown_1_1) {
                slideInDown_1 = slideInDown_1_1;
            },
            function (slideInLeft_1_1) {
                slideInLeft_1 = slideInLeft_1_1;
            },
            function (slideInRight_1_1) {
                slideInRight_1 = slideInRight_1_1;
            },
            function (slideInUp_1_1) {
                slideInUp_1 = slideInUp_1_1;
            },
            function (slideOutDown_1_1) {
                slideOutDown_1 = slideOutDown_1_1;
            },
            function (slideOutLeft_1_1) {
                slideOutLeft_1 = slideOutLeft_1_1;
            },
            function (slideOutRight_1_1) {
                slideOutRight_1 = slideOutRight_1_1;
            },
            function (slideOutUp_1_1) {
                slideOutUp_1 = slideOutUp_1_1;
            },
            function (swing_1_1) {
                swing_1 = swing_1_1;
            },
            function (tada_1_1) {
                tada_1 = tada_1_1;
            },
            function (wobble_1_1) {
                wobble_1 = wobble_1_1;
            },
            function (zoomIn_1_1) {
                zoomIn_1 = zoomIn_1_1;
            },
            function (zoomInDown_1_1) {
                zoomInDown_1 = zoomInDown_1_1;
            },
            function (zoomInLeft_1_1) {
                zoomInLeft_1 = zoomInLeft_1_1;
            },
            function (zoomInRight_1_1) {
                zoomInRight_1 = zoomInRight_1_1;
            },
            function (zoomInUp_1_1) {
                zoomInUp_1 = zoomInUp_1_1;
            },
            function (zoomOut_1_1) {
                zoomOut_1 = zoomOut_1_1;
            },
            function (zoomOutDown_1_1) {
                zoomOutDown_1 = zoomOutDown_1_1;
            },
            function (zoomOutLeft_1_1) {
                zoomOutLeft_1 = zoomOutLeft_1_1;
            },
            function (zoomOutRight_1_1) {
                zoomOutRight_1 = zoomOutRight_1_1;
            },
            function (zoomOutUp_1_1) {
                zoomOutUp_1 = zoomOutUp_1_1;
            }],
        execute: function() {
            exports_85("ANIMATE_CSS", ANIMATE_CSS = [
                bounce_1.bounce,
                bounceIn_1.bounceIn,
                bounceInDown_1.bounceInDown,
                bounceInLeft_1.bounceInLeft,
                bounceInRight_1.bounceInRight,
                bounceInUp_1.bounceInUp,
                bounceOut_1.bounceOut,
                bounceOutDown_1.bounceOutDown,
                bounceOutLeft_1.bounceOutLeft,
                bounceOutRight_1.bounceOutRight,
                bounceOutUp_1.bounceOutUp,
                fadeIn_1.fadeIn,
                fadeInDown_1.fadeInDown,
                fadeInDownBig_1.fadeInDownBig,
                fadeInLeft_1.fadeInLeft,
                fadeInLeftBig_1.fadeInLeftBig,
                fadeInRight_1.fadeInRight,
                fadeInRightBig_1.fadeInRightBig,
                fadeInUp_1.fadeInUp,
                fadeInUpBig_1.fadeInUpBig,
                fadeOut_1.fadeOut,
                fadeOutDown_1.fadeOutDown,
                fadeOutDownBig_1.fadeOutDownBig,
                fadeOutLeft_1.fadeOutLeft,
                fadeOutLeftBig_1.fadeOutLeftBig,
                fadeOutRight_1.fadeOutRight,
                fadeOutRightBig_1.fadeOutRightBig,
                fadeOutUp_1.fadeOutUp,
                fadeOutUpBig_1.fadeOutUpBig,
                flash_1.flash,
                flip_1.flip,
                flipInX_1.flipInX,
                flipInY_1.flipInY,
                flipOutX_1.flipOutX,
                flipOutY_1.flipOutY,
                headShake_1.headShake,
                hinge_1.hinge,
                jello_1.jello,
                lightSpeedIn_1.lightSpeedIn,
                lightSpeedOut_1.lightSpeedOut,
                pulse_1.pulse,
                rollIn_1.rollIn,
                rollOut_1.rollOut,
                rotateIn_1.rotateIn,
                rotateInDownLeft_1.rotateInDownLeft,
                rotateInDownRight_1.rotateInDownRight,
                rotateInUpLeft_1.rotateInUpLeft,
                rotateInUpRight_1.rotateInUpRight,
                rotateOut_1.rotateOut,
                rotateOutDownLeft_1.rotateOutDownLeft,
                rotateOutDownRight_1.rotateOutDownRight,
                rotateOutUpLeft_1.rotateOutUpLeft,
                rotateOutUpRight_1.rotateOutUpRight,
                rubberBand_1.rubberBand,
                shake_1.shake,
                slideInDown_1.slideInDown,
                slideInLeft_1.slideInLeft,
                slideInRight_1.slideInRight,
                slideInUp_1.slideInUp,
                slideOutDown_1.slideOutDown,
                slideOutLeft_1.slideOutLeft,
                slideOutRight_1.slideOutRight,
                slideOutUp_1.slideOutUp,
                swing_1.swing,
                tada_1.tada,
                wobble_1.wobble,
                zoomIn_1.zoomIn,
                zoomInDown_1.zoomInDown,
                zoomInLeft_1.zoomInLeft,
                zoomInRight_1.zoomInRight,
                zoomInUp_1.zoomInUp,
                zoomOut_1.zoomOut,
                zoomOutDown_1.zoomOutDown,
                zoomOutLeft_1.zoomOutLeft,
                zoomOutRight_1.zoomOutRight,
                zoomOutUp_1.zoomOutUp
            ]);
            exports_85("bounce", bounce_1.bounce);
            exports_85("bounceIn", bounceIn_1.bounceIn);
            exports_85("bounceInDown", bounceInDown_1.bounceInDown);
            exports_85("bounceInLeft", bounceInLeft_1.bounceInLeft);
            exports_85("bounceInRight", bounceInRight_1.bounceInRight);
            exports_85("bounceInUp", bounceInUp_1.bounceInUp);
            exports_85("bounceOut", bounceOut_1.bounceOut);
            exports_85("bounceOutDown", bounceOutDown_1.bounceOutDown);
            exports_85("bounceOutLeft", bounceOutLeft_1.bounceOutLeft);
            exports_85("bounceOutRight", bounceOutRight_1.bounceOutRight);
            exports_85("bounceOutUp", bounceOutUp_1.bounceOutUp);
            exports_85("fadeIn", fadeIn_1.fadeIn);
            exports_85("fadeInDown", fadeInDown_1.fadeInDown);
            exports_85("fadeInDownBig", fadeInDownBig_1.fadeInDownBig);
            exports_85("fadeInLeft", fadeInLeft_1.fadeInLeft);
            exports_85("fadeInLeftBig", fadeInLeftBig_1.fadeInLeftBig);
            exports_85("fadeInRight", fadeInRight_1.fadeInRight);
            exports_85("fadeInRightBig", fadeInRightBig_1.fadeInRightBig);
            exports_85("fadeInUp", fadeInUp_1.fadeInUp);
            exports_85("fadeInUpBig", fadeInUpBig_1.fadeInUpBig);
            exports_85("fadeOut", fadeOut_1.fadeOut);
            exports_85("fadeOutDown", fadeOutDown_1.fadeOutDown);
            exports_85("fadeOutDownBig", fadeOutDownBig_1.fadeOutDownBig);
            exports_85("fadeOutLeft", fadeOutLeft_1.fadeOutLeft);
            exports_85("fadeOutLeftBig", fadeOutLeftBig_1.fadeOutLeftBig);
            exports_85("fadeOutRight", fadeOutRight_1.fadeOutRight);
            exports_85("fadeOutRightBig", fadeOutRightBig_1.fadeOutRightBig);
            exports_85("fadeOutUp", fadeOutUp_1.fadeOutUp);
            exports_85("fadeOutUpBig", fadeOutUpBig_1.fadeOutUpBig);
            exports_85("flash", flash_1.flash);
            exports_85("flip", flip_1.flip);
            exports_85("flipInX", flipInX_1.flipInX);
            exports_85("flipInY", flipInY_1.flipInY);
            exports_85("flipOutX", flipOutX_1.flipOutX);
            exports_85("flipOutY", flipOutY_1.flipOutY);
            exports_85("headShake", headShake_1.headShake);
            exports_85("hinge", hinge_1.hinge);
            exports_85("jello", jello_1.jello);
            exports_85("lightSpeedIn", lightSpeedIn_1.lightSpeedIn);
            exports_85("lightSpeedOut", lightSpeedOut_1.lightSpeedOut);
            exports_85("pulse", pulse_1.pulse);
            exports_85("rollIn", rollIn_1.rollIn);
            exports_85("rollOut", rollOut_1.rollOut);
            exports_85("rotateIn", rotateIn_1.rotateIn);
            exports_85("rotateInDownLeft", rotateInDownLeft_1.rotateInDownLeft);
            exports_85("rotateInDownRight", rotateInDownRight_1.rotateInDownRight);
            exports_85("rotateInUpLeft", rotateInUpLeft_1.rotateInUpLeft);
            exports_85("rotateInUpRight", rotateInUpRight_1.rotateInUpRight);
            exports_85("rotateOut", rotateOut_1.rotateOut);
            exports_85("rotateOutDownLeft", rotateOutDownLeft_1.rotateOutDownLeft);
            exports_85("rotateOutDownRight", rotateOutDownRight_1.rotateOutDownRight);
            exports_85("rotateOutUpLeft", rotateOutUpLeft_1.rotateOutUpLeft);
            exports_85("rotateOutUpRight", rotateOutUpRight_1.rotateOutUpRight);
            exports_85("rubberBand", rubberBand_1.rubberBand);
            exports_85("shake", shake_1.shake);
            exports_85("slideInDown", slideInDown_1.slideInDown);
            exports_85("slideInLeft", slideInLeft_1.slideInLeft);
            exports_85("slideInRight", slideInRight_1.slideInRight);
            exports_85("slideInUp", slideInUp_1.slideInUp);
            exports_85("slideOutDown", slideOutDown_1.slideOutDown);
            exports_85("slideOutLeft", slideOutLeft_1.slideOutLeft);
            exports_85("slideOutRight", slideOutRight_1.slideOutRight);
            exports_85("slideOutUp", slideOutUp_1.slideOutUp);
            exports_85("swing", swing_1.swing);
            exports_85("tada", tada_1.tada);
            exports_85("wobble", wobble_1.wobble);
            exports_85("zoomIn", zoomIn_1.zoomIn);
            exports_85("zoomInDown", zoomInDown_1.zoomInDown);
            exports_85("zoomInLeft", zoomInLeft_1.zoomInLeft);
            exports_85("zoomInRight", zoomInRight_1.zoomInRight);
            exports_85("zoomInUp", zoomInUp_1.zoomInUp);
            exports_85("zoomOut", zoomOut_1.zoomOut);
            exports_85("zoomOutDown", zoomOutDown_1.zoomOutDown);
            exports_85("zoomOutLeft", zoomOutLeft_1.zoomOutLeft);
            exports_85("zoomOutRight", zoomOutRight_1.zoomOutRight);
            exports_85("zoomOutUp", zoomOutUp_1.zoomOutUp);
        }
    }
});
System.register("just-animate/index", ["just-animate/animations", "just-animate/JustAnimate"], function(exports_86, context_86) {
    "use strict";
    var __moduleName = context_86 && context_86.id;
    var animations;
    return {
        setters:[
            function (animations_1) {
                animations = animations_1;
            },
            function (JustAnimate_1_1) {
                exports_86({
                    "JustAnimate": JustAnimate_1_1["JustAnimate"]
                });
            }],
        execute: function() {
            exports_86("animations", animations);
        }
    }
});
System.register("just-animate/core/TImingHelpers", [], function(exports_87, context_87) {
    "use strict";
    var __moduleName = context_87 && context_87.id;
    var linear, SUBDIVISION_EPSILON;
    function bezier(n1, n2, t) {
        return 3 * n1 * (1 - t) * (1 - t) * t
            + 3 * n2 * (1 - t) * (t * t)
            + (t * t * t);
    }
    function cubic(p0, p1, p2, p3) {
        if (p0 < 0 || p0 > 1 || p2 < 0 || p2 > 1) {
            return linear;
        }
        return function (x) {
            if (x === 0 || x === 1) {
                return x;
            }
            var start = 0;
            var end = 1;
            var limit = 10;
            while (--limit) {
                var t = (start + end) / 2;
                var xEst = bezier(p0, p2, t);
                if (Math.abs(x - xEst) < SUBDIVISION_EPSILON) {
                    return bezier(p1, p3, t);
                }
                if (xEst < x) {
                    start = t;
                }
                else {
                    end = t;
                }
            }
            // should not end up here        
            return x;
        };
    }
    exports_87("cubic", cubic);
    return {
        setters:[],
        execute: function() {
            linear = function (x) { return x; };
            SUBDIVISION_EPSILON = 0.0001;
        }
    }
});
