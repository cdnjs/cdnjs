System.register("just-animate/common/type", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isDefined, getTypeString, isFunction, isNumber, isObject, isString, isArray, isElement;
    return {
        setters: [],
        execute: function () {
            exports_1("isDefined", isDefined = function (a) {
                return !!a || a === 0 || a === false;
            });
            /**
             * Calls the native object.toString for real type comparisons
             */
            exports_1("getTypeString", getTypeString = function (val) {
                return Object.prototype.toString.call(val);
            });
            /**
             * Tests if object is a function
             */
            exports_1("isFunction", isFunction = function (a) {
                return getTypeString(a) === '[object Function]';
            });
            exports_1("isNumber", isNumber = function (a) { return typeof a === 'number'; });
            exports_1("isObject", isObject = function (a) { return typeof a === 'object' && !!a; });
            exports_1("isString", isString = function (a) { return typeof a === 'string'; });
            /**
             * Tests if object is an array
             */
            exports_1("isArray", isArray = function (a) {
                return isDefined(a) && !isString(a) && !isFunction(a) && isNumber(a.length);
            });
            /**
             * Returns true if the target appears to be an element.  This helper is looking for a value tagName
             * This is more useful than doing instanceof Element since WAAPI should support virtual elements
             */
            exports_1("isElement", isElement = function (target) {
                return !!target && typeof target['tagName'] === 'string';
            });
        }
    };
});
System.register("just-animate/common/lists", ["just-animate/common/type"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var type_1, slice, head, tail, toArray, chain, maxBy;
    return {
        setters: [
            function (type_1_1) {
                type_1 = type_1_1;
            }
        ],
        execute: function () {
            slice = Array.prototype.slice;
            ;
            /**
             * Returns the first object in the list or undefined
             */
            exports_2("head", head = function (indexed, predicate) {
                if (!indexed || indexed.length < 1) {
                    return undefined;
                }
                if (predicate === undefined) {
                    return indexed[0];
                }
                for (var _i = 0, _a = indexed; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (predicate(item)) {
                        return item;
                    }
                }
                return undefined;
            });
            /**
             * Returns the last object in the list or undefined
             */
            exports_2("tail", tail = function (indexed, predicate) {
                if (!indexed || indexed.length < 1) {
                    return undefined;
                }
                if (predicate === undefined) {
                    return indexed[indexed.length - 1];
                }
                for (var _i = 0, _a = indexed; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (predicate(item)) {
                        return item;
                    }
                }
                return undefined;
            });
            /**
             * Converts list to an Array.
             * Useful for converting NodeList and arguments to []
             *
             * @export
             * @template T
             * @param {T[]} list to convert
             * @returns {T[]} array clone of list
             */
            exports_2("toArray", toArray = function (indexed, index) { return slice.call(indexed, index || 0); });
            /**
             * returns an array or an object wrapped in an array
             *
             * @export
             * @template T
             * @param {(IList<T> | T)} indexed
             * @returns {T[]}
             */
            exports_2("chain", chain = function (indexed) {
                return type_1.isArray(indexed) ? indexed : [indexed];
            });
            /**
             * Returns the max value of a given property in a list
             *
             * @export
             * @template T1
             * @param {T1[]} items list of objects
             * @param {string} propertyName property to evaluate
             * @returns {*} max value of the property provided
             */
            exports_2("maxBy", maxBy = function (items, predicate) {
                var max = '';
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    var prop = predicate(item);
                    if (max < prop) {
                        max = prop;
                    }
                }
                return max;
            });
        }
    };
});
System.register("just-animate/common/errors", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var invalidArg, unsupported;
    return {
        setters: [],
        execute: function () {
            exports_3("invalidArg", invalidArg = function (name) {
                return new Error("Bad: " + name);
            });
            exports_3("unsupported", unsupported = function (msg) {
                return new Error("Unsupported: " + msg);
            });
        }
    };
});
System.register("just-animate/common/elements", ["just-animate/common/lists", "just-animate/common/type", "just-animate/common/errors"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var lists_1, type_2, errors_1, applySplitStyles, getTargets, splitText;
    return {
        setters: [
            function (lists_1_1) {
                lists_1 = lists_1_1;
            },
            function (type_2_1) {
                type_2 = type_2_1;
            },
            function (errors_1_1) {
                errors_1 = errors_1_1;
            }
        ],
        execute: function () {
            applySplitStyles = function (element) {
                element.style.display = 'inline-block';
                element.style.position = 'relative';
                element.style.textAlign = 'start';
            };
            /**
             * Recursively resolves the element source from dom, selector, jquery, array, and function sources
             *
             * @param {ja.ElementSource} source from which to locate elements
             * @returns {Element[]} array of elements found
             */
            exports_4("getTargets", getTargets = function (target) {
                if (!target) {
                    throw errors_1.invalidArg('source');
                }
                if (type_2.isString(target)) {
                    // if query selector, search for elements 
                    return lists_1.toArray(document.querySelectorAll(target));
                }
                if (type_2.isElement(target)) {
                    // if a single element, wrap in array 
                    return [target];
                }
                if (type_2.isFunction(target)) {
                    // if function, call it and call this function
                    var provider = target;
                    var result = provider();
                    return getTargets(result);
                }
                if (type_2.isArray(target)) {
                    // if array or jQuery object, flatten to an array
                    var elements = [];
                    for (var _i = 0, _a = target; _i < _a.length; _i++) {
                        var i = _a[_i];
                        // recursively call this function in case of nested elements
                        var innerElements = getTargets(i);
                        elements.push.apply(elements, innerElements);
                    }
                    return elements;
                }
                if (type_2.isObject(target)) {
                    // if it is an actual object at this point, handle it
                    return [target];
                }
                // otherwise return empty    
                return [];
            });
            /**
             * Detects words and characters from a target or a list of targets.
             * Note: if multiple targets are detected, they will return as a single
             * list of characters and numbers
             *
             * @param {ja.AnimationDomTarget} target
             * @returns {ja.SplitTextResult}
             *
             * @memberOf JustAnimate
             */
            exports_4("splitText", splitText = function (target) {
                // output parameters
                var characters = [];
                var words = [];
                // acquiring targets ;)    
                var elements = getTargets(target);
                // get paragraphs, words, and characters for each element
                for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                    var element = elements_1[_i];
                    // if we have already split this element, check if it was already split
                    if (element.getAttribute('ja-split-text')) {
                        var ws_1 = lists_1.toArray(element.querySelectorAll('[ja-word]'));
                        var cs = lists_1.toArray(element.querySelectorAll('[ja-character]'));
                        // if split already return query result
                        if (ws_1.length || cs.length) {
                            // apply found split elements
                            words.push.apply(words, ws_1);
                            characters.push.apply(characters, cs);
                            continue;
                        }
                    }
                    // remove tabs, spaces, and newlines
                    var contents = element.textContent.replace(/[\r\n\s\t]+/ig, ' ').trim();
                    // clear element
                    element.innerHTML = '';
                    // mark element as already being split
                    element.setAttribute('ja-split', '');
                    // split on spaces
                    var ws = contents.split(/[\s]+/ig);
                    // handle each word
                    for (var i = 0, len = ws.length; i < len; i++) {
                        var w = ws[i];
                        // create new div for word/run"
                        var word = document.createElement('div');
                        applySplitStyles(word);
                        // mark element as a word                    
                        word.setAttribute('ja-word', w);
                        // add to the result  
                        words.push(word);
                        // if not the first word, add a space            
                        if (i > 0) {
                            var space = document.createElement('div');
                            applySplitStyles(space);
                            space.innerHTML = '&nbsp;';
                            space.setAttribute('ja-space', '');
                            element.appendChild(space);
                        }
                        // add to the paragraph  
                        element.appendChild(word);
                        for (var _a = 0, w_1 = w; _a < w_1.length; _a++) {
                            var c = w_1[_a];
                            // create new div for character"
                            var char = document.createElement('div');
                            applySplitStyles(char);
                            char.textContent = c;
                            // mark element as a character                    
                            char.setAttribute('ja-character', c);
                            // add to the result                    
                            characters.push(char);
                            // append to the word                            
                            word.appendChild(char);
                        }
                    }
                }
                return {
                    characters: characters,
                    words: words
                };
            });
        }
    };
});
System.register("just-animate/common/math", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var inRange;
    return {
        setters: [],
        execute: function () {
            exports_5("inRange", inRange = function (val, min, max) {
                return min < max ? min <= val && val <= max : max <= val && val <= min;
            });
        }
    };
});
System.register("just-animate/common/objects", ["just-animate/common/type"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var type_3, deepCopyProperty, deepCopyObject, inherit, resolve, listProps;
    return {
        setters: [
            function (type_3_1) {
                type_3 = type_3_1;
            }
        ],
        execute: function () {
            /**
             * Copies a single property from origin to destination
             */
            exports_6("deepCopyProperty", deepCopyProperty = function (prop, origin, dest) {
                var originProp = origin[prop];
                var destProp = dest[prop];
                // if the source and target don't have the same type, replace with target
                var originType = type_3.getTypeString(originProp);
                var destType = type_3.getTypeString(destProp);
                if (originType !== destType) {
                    destProp = undefined;
                }
                if (type_3.isArray(originProp)) {
                    // note: a compromise until a solution for merging arrays becomes clear
                    dest[prop] = originProp.slice(0);
                }
                else if (type_3.isObject(originProp)) {
                    // tslint:disable-next-line:no-use-before-declare
                    dest[prop] = deepCopyObject(originProp, destProp);
                }
                else {
                    dest[prop] = originProp;
                }
            });
            /**
             * performs a deep copy of properties from origin to destination
             */
            exports_6("deepCopyObject", deepCopyObject = function (origin, dest) {
                dest = dest || {};
                for (var prop in origin) {
                    deepCopyProperty(prop, origin, dest);
                }
                return dest;
            });
            /**
             * Copies the value from source to target if the source does not already have a value
             */
            exports_6("inherit", inherit = function (target, source) {
                // escape typing here, since there doesn't seem to be a sensible way to make this work
                var result = target;
                for (var propName in source) {
                    if (!type_3.isDefined(result[propName])) {
                        result[propName] = source[propName];
                    }
                }
                return result;
            });
            /**
             *  Resolves the property/value of an animation
             */
            exports_6("resolve", resolve = function (value, ctx) {
                return type_3.isFunction(value) ? value(ctx) : value;
            });
            exports_6("listProps", listProps = function (indexed) {
                var props = [];
                var len = indexed.length;
                for (var i = 0; i < len; i++) {
                    var item = indexed[i];
                    for (var property in item) {
                        if (props.indexOf(property) === -1) {
                            props.push(property);
                        }
                    }
                }
                return props;
            });
        }
    };
});
System.register("just-animate/common/random", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var shuffle, random;
    return {
        setters: [],
        execute: function () {
            /**
             * Returns one of the supplied values at random
             *
             * @template T
             * @param {T[]} choices from which to choose
             * @returns {T} a choice at random
             *
             * @memberOf JustAnimate
             */
            exports_7("shuffle", shuffle = function (choices) {
                return choices[Math.floor(Math.random() * choices.length)];
            });
            exports_7("random", random = function (first, last, unit, wholeNumbersOnly) {
                var val = first + (Math.random() * (last - first));
                if (wholeNumbersOnly === true) {
                    val = Math.floor(val);
                }
                return !unit ? val : val + unit;
            });
        }
    };
});
System.register("just-animate/common/resources", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var camelCaseRegex, measureExpression, unitExpression;
    return {
        setters: [],
        execute: function () {
            exports_8("camelCaseRegex", camelCaseRegex = /([a-z])[- ]([a-z])/ig);
            exports_8("measureExpression", measureExpression = /^[ ]*([\-]{0,1}[0-9]*[\.]{0,1}[0-9]*){1}[ ]*([a-z%]+){0,1}$/i);
            exports_8("unitExpression", unitExpression = /^([+-][=]){0,1}[ ]*([\-]{0,1}[0-9]*[\.]{0,1}[0-9]*){0,1}[ ]*(to){0,1}[ ]*([\-]{0,1}[0-9]*[\.]{0,1}[0-9]*)[ ]*([a-z%]+){0,1}[ ]*$/i);
        }
    };
});
System.register("just-animate/common/strings", ["just-animate/common/type", "just-animate/common/lists", "just-animate/common/resources"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function camelCaseReplacer(_, p1, p2) {
        return p1 + p2.toUpperCase();
    }
    function toCamelCase(value) {
        return type_4.isString(value) ? value.replace(resources_1.camelCaseRegex, camelCaseReplacer) : '';
    }
    exports_9("toCamelCase", toCamelCase);
    function startsWith(value, pattern) {
        return value.indexOf(pattern) === 0;
    }
    exports_9("startsWith", startsWith);
    var type_4, lists_2, resources_1, cssFunction;
    return {
        setters: [
            function (type_4_1) {
                type_4 = type_4_1;
            },
            function (lists_2_1) {
                lists_2 = lists_2_1;
            },
            function (resources_1_1) {
                resources_1 = resources_1_1;
            }
        ],
        execute: function () {
            exports_9("cssFunction", cssFunction = function () {
                var args = arguments;
                return args[0] + "(" + lists_2.toArray(args, 1).join(',') + ")";
            });
        }
    };
});
System.register("just-animate/common/units", ["just-animate/common/type", "just-animate/common/resources", "just-animate/common/random"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var type_5, resources_2, random_1, stepNone, stepForward, stepBackward, createUnitResolver, parseUnit, getCanonicalTime;
    return {
        setters: [
            function (type_5_1) {
                type_5 = type_5_1;
            },
            function (resources_2_1) {
                resources_2 = resources_2_1;
            },
            function (random_1_1) {
                random_1 = random_1_1;
            }
        ],
        execute: function () {
            exports_10("stepNone", stepNone = '=');
            exports_10("stepForward", stepForward = '+=');
            exports_10("stepBackward", stepBackward = '-=');
            /**
             * Returns a unit resolver.  The unit resolver returns what the unit should be
             * at a given index.  for instance +=200 should be 200 at 0, 400 at 1, and 600 at 2
             */
            exports_10("createUnitResolver", createUnitResolver = function (val) {
                if (!type_5.isDefined(val)) {
                    return function () { return ({ unit: undefined, value: 0 }); };
                }
                if (type_5.isNumber(val)) {
                    return function () { return ({ unit: undefined, value: val }); };
                }
                var match = resources_2.unitExpression.exec(val);
                var stepTypeString = match[1];
                var startString = match[2];
                var toOperator = match[3];
                var endValueString = match[4];
                var unitTypeString = match[5];
                var startCo = startString ? parseFloat(startString) : undefined;
                var endCo = endValueString ? parseFloat(endValueString) : undefined;
                var sign = stepTypeString === stepBackward ? -1 : 1;
                var isIndexed = !!stepTypeString;
                var isRange = toOperator === 'to';
                var resolver = function (index) {
                    var index2 = isIndexed && type_5.isDefined(index) ? index + 1 : 1;
                    var value = isRange
                        ? random_1.random(startCo * (index2) * sign, (endCo - startCo) * index2 * sign)
                        : startCo * index2 * sign;
                    return {
                        unit: unitTypeString || undefined,
                        value: value
                    };
                };
                return resolver;
            });
            /**
             * Parses a string or number and returns the unit and numeric value
             */
            exports_10("parseUnit", parseUnit = function (val, output) {
                output = output || {};
                if (!type_5.isDefined(val)) {
                    output.unit = undefined;
                    output.value = undefined;
                }
                else if (type_5.isNumber(val)) {
                    output.unit = undefined;
                    output.value = val;
                }
                else {
                    var match = resources_2.measureExpression.exec(val);
                    var startString = match[1];
                    var unitTypeString = match[2];
                    output.unit = unitTypeString || undefined;
                    output.value = startString ? parseFloat(startString) : undefined;
                }
                return output;
            });
            /**
             * returns the unit as a number (resolves seconds to milliseconds)
             */
            exports_10("getCanonicalTime", getCanonicalTime = function (unit) {
                return unit.value * (unit.unit === 's' ? 1000 : 1);
            });
        }
    };
});
System.register("just-animate/common/utils", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var now, raf;
    return {
        setters: [],
        execute: function () {
            /**
             * Wrapper for performance now() with a fallback to Date.now()
             */
            exports_11("now", now = function () {
                return performance && performance.now ? performance.now() : Date.now();
            });
            /**
             * Wrapper for raf with fallback to setTimeout
             */
            exports_11("raf", raf = function (ctx, fn) {
                var callback = function () { fn(ctx); };
                return requestAnimationFrame
                    ? requestAnimationFrame(callback)
                    : setTimeout(callback, 16);
            });
        }
    };
});
System.register("just-animate/common/index", ["just-animate/common/elements", "just-animate/common/errors", "just-animate/common/lists", "just-animate/common/math", "just-animate/common/objects", "just-animate/common/random", "just-animate/common/resources", "just-animate/common/strings", "just-animate/common/type", "just-animate/common/units", "just-animate/common/utils"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_12(exports);
    }
    return {
        setters: [
            function (elements_2_1) {
                exportStar_1(elements_2_1);
            },
            function (errors_2_1) {
                exportStar_1(errors_2_1);
            },
            function (lists_3_1) {
                exportStar_1(lists_3_1);
            },
            function (math_1_1) {
                exportStar_1(math_1_1);
            },
            function (objects_1_1) {
                exportStar_1(objects_1_1);
            },
            function (random_2_1) {
                exportStar_1(random_2_1);
            },
            function (resources_3_1) {
                exportStar_1(resources_3_1);
            },
            function (strings_1_1) {
                exportStar_1(strings_1_1);
            },
            function (type_6_1) {
                exportStar_1(type_6_1);
            },
            function (units_1_1) {
                exportStar_1(units_1_1);
            },
            function (utils_1_1) {
                exportStar_1(utils_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("just-animate/plugins/core/animator", ["node_modules/just-curves/src/main", "just-animate/common/index", "just-animate/plugins/core/index"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var just_curves_1, common_1, index_1, plugins, noop, animationPadding, tick, resolveMixins, Animator;
    return {
        setters: [
            function (just_curves_1_1) {
                just_curves_1 = just_curves_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            exports_13("plugins", plugins = []);
            noop = function () { return void {}; };
            // todo: remove these imports as soon as possible
            // fixme!: this controls the amount of time left before the timeline gives up 
            // on individual animation and calls finish.  If an animation plays after its time, it looks
            // like it restarts and that causes jank
            animationPadding = (1.0 / 60) + 7;
            tick = function (self, delta) {
                var dispatcher = self._dispatcher;
                var playState = self._playState;
                var context = self._context;
                // canceled
                if (playState === 'idle') {
                    dispatcher.trigger('cancel', context);
                    return;
                }
                // finished
                if (playState === 'finished') {
                    dispatcher.trigger('finish', context);
                    return;
                }
                // paused
                if (playState === 'paused') {
                    dispatcher.trigger('pause', context);
                    return;
                }
                // running/pending
                // calculate running range
                var duration1 = self._duration;
                var totalIterations = self._totalIterations;
                var playbackRate = self._playbackRate;
                var isReversed = playbackRate < 0;
                var startTime = isReversed ? duration1 : 0;
                var endTime = isReversed ? 0 : duration1;
                if (self._playState === 'pending') {
                    var currentTime2 = self._currentTime;
                    var currentIteration_1 = self._currentIteration;
                    self._currentTime = currentTime2 === undefined || currentTime2 === endTime ? startTime : currentTime2;
                    self._currentIteration = currentIteration_1 === undefined || currentIteration_1 === totalIterations ? 0 : currentIteration_1;
                    self._playState = 'running';
                }
                // calculate currentTime from delta
                var currentTime = self._currentTime + delta * playbackRate;
                var currentIteration = self._currentIteration;
                var isLastFrame = false;
                // check if animation has finished
                if (!common_1.inRange(currentTime, startTime, endTime)) {
                    isLastFrame = true;
                    if (self._direction === 'alternate') {
                        playbackRate = self._playbackRate * -1;
                        self._playbackRate = playbackRate;
                        isReversed = playbackRate < 0;
                        startTime = isReversed ? duration1 : 0;
                        endTime = isReversed ? 0 : duration1;
                    }
                    currentIteration++;
                    currentTime = startTime;
                    context.currentTime = currentTime;
                    context.delta = delta;
                    context.duration = endTime - startTime;
                    context.playbackRate = playbackRate;
                    context.iterations = currentIteration;
                    context.offset = undefined;
                    context.computedOffset = undefined;
                    context.target = undefined;
                    context.targets = undefined;
                    context.index = undefined;
                    self._dispatcher.trigger('iteration', context);
                }
                self._currentIteration = currentIteration;
                self._currentTime = currentTime;
                dispatcher.trigger('update', context);
                if (totalIterations === currentIteration) {
                    dispatcher.trigger('finish', context);
                    return;
                }
                // start animations if should be active and currently aren't   
                for (var _i = 0, _a = self._events; _i < _a.length; _i++) {
                    var evt = _a[_i];
                    var startTimeMs = playbackRate >= 0 ? evt.startTimeMs : evt.startTimeMs + animationPadding;
                    var endTimeMs = playbackRate >= 0 ? evt.endTimeMs : evt.endTimeMs - animationPadding;
                    var shouldBeActive = startTimeMs <= currentTime && currentTime <= endTimeMs;
                    var animator = evt.animator;
                    if (!shouldBeActive) {
                        continue;
                    }
                    var controllerState = animator.playState();
                    // cancel animation if there was a fatal error
                    if (controllerState === 'fatal') {
                        dispatcher.trigger('cancel', context);
                        return;
                    }
                    if (isLastFrame) {
                        animator.restart();
                    }
                    var playedThisFrame = false;
                    if (controllerState !== 'running' || isLastFrame) {
                        animator.playbackRate(playbackRate);
                        animator.playState('running');
                        playedThisFrame = true;
                    }
                    animator.playbackRate(playbackRate);
                    var shouldTriggerPlay = evt.play !== noop && playedThisFrame;
                    var shouldTriggerUpdate = evt.update !== noop;
                    if (shouldTriggerPlay || shouldTriggerUpdate) {
                        context.target = evt.target;
                        context.targets = evt.targets;
                        context.index = evt.index;
                        context.currentTime = undefined;
                        context.delta = undefined;
                        context.duration = undefined;
                        context.offset = undefined;
                        context.playbackRate = undefined;
                        context.iterations = undefined;
                        context.computedOffset = undefined;
                    }
                    if (shouldTriggerPlay) {
                        evt.play(context);
                    }
                    if (shouldTriggerUpdate) {
                        var relativeDuration = evt.endTimeMs - evt.startTimeMs;
                        var relativeCurrentTime = currentTime - evt.startTimeMs;
                        var timeOffset = relativeCurrentTime / relativeDuration;
                        // set context object values for this update cycle            
                        context.currentTime = relativeCurrentTime;
                        context.delta = delta;
                        context.duration = relativeDuration;
                        context.offset = timeOffset;
                        context.playbackRate = playbackRate;
                        context.iterations = currentIteration;
                        context.computedOffset = evt.easingFn(timeOffset);
                        evt.update(context);
                    }
                }
            };
            resolveMixins = function (options) {
                // resolve mixin properties     
                var event;
                if (options.mixins) {
                    var mixinTarget = common_1.chain(options.mixins)
                        .map(function (mixin) {
                        var def = index_1.findAnimation(mixin);
                        if (!common_1.isDefined(def)) {
                            throw common_1.invalidArg('mixin');
                        }
                        return def;
                    })
                        .reduce(function (c, n) { return common_1.deepCopyObject(n, c); });
                    event = common_1.inherit(options, mixinTarget);
                }
                else {
                    event = options;
                }
                return event;
            };
            Animator = (function () {
                function Animator() {
                    var self = this;
                    self._context = {};
                    self._duration = 0;
                    self._currentTime = undefined;
                    self._currentIteration = undefined;
                    self._playState = 'idle';
                    self._playbackRate = 1;
                    self._events = [];
                    self._dispatcher = index_1.dispatcher();
                    self._onTick = function (delta) { return tick(self, delta); };
                    self.on('finish', function () { return self._onFinish(); });
                    self.on('cancel', function () { return self._onCancel(); });
                    self.on('pause', function () { return self._onPause(); });
                    // autoplay    
                    self.play();
                    return self;
                }
                Animator.prototype.animate = function (options) {
                    var self = this;
                    if (common_1.isArray(options)) {
                        for (var _i = 0, _a = options; _i < _a.length; _i++) {
                            var e = _a[_i];
                            self._addEvent(e);
                        }
                    }
                    else {
                        self._addEvent(options);
                    }
                    self._recalculate();
                    return self;
                };
                Animator.prototype.cancel = function () {
                    var self = this;
                    self._dispatcher.trigger('cancel', self._context);
                    return self;
                };
                Animator.prototype.duration = function () {
                    return this._duration;
                };
                Animator.prototype.currentTime = function (value) {
                    var self = this;
                    if (!common_1.isDefined(value)) {
                        return self._currentTime;
                    }
                    self._currentTime = value;
                    return self;
                };
                Animator.prototype.finish = function () {
                    var self = this;
                    self._dispatcher.trigger('finish', self._context);
                    return self;
                };
                Animator.prototype.playbackRate = function (value) {
                    var self = this;
                    if (!common_1.isDefined(value)) {
                        return self._playbackRate;
                    }
                    self._playbackRate = value;
                    return self;
                };
                Animator.prototype.playState = function (value) {
                    var self = this;
                    if (!common_1.isDefined(value)) {
                        return self._playState;
                    }
                    self._playState = value;
                    return self;
                };
                Animator.prototype.off = function (event, listener) {
                    if (listener === void 0) { listener = undefined; }
                    var self = this;
                    if (typeof event === 'string' && listener !== undefined) {
                        self._dispatcher.off(event, listener);
                    }
                    else {
                        var eventConfig = event;
                        for (var eventName in eventConfig) {
                            var listener1 = eventConfig[eventName];
                            if (listener1) {
                                self._dispatcher.off(eventName, listener1);
                            }
                        }
                    }
                    return self;
                };
                Animator.prototype.on = function (event, listener) {
                    if (listener === void 0) { listener = undefined; }
                    var self = this;
                    if (typeof event === 'string' && listener !== undefined) {
                        self._dispatcher.on(event, listener);
                    }
                    else {
                        var eventConfig = event;
                        for (var eventName in eventConfig) {
                            var listener1 = eventConfig[eventName];
                            if (listener1) {
                                self._dispatcher.on(eventName, listener1);
                            }
                        }
                    }
                    return self;
                };
                Animator.prototype.pause = function () {
                    var self = this;
                    self._dispatcher.trigger('pause', self._context);
                    return self;
                };
                Animator.prototype.play = function (options) {
                    var self = this;
                    var totalIterations = 0;
                    var direction = 'normal';
                    if (options) {
                        if (!common_1.isNumber(options)) {
                            var playOptions = options;
                            if (playOptions.iterations) {
                                totalIterations = playOptions.iterations;
                            }
                            if (playOptions.direction) {
                                direction = playOptions.direction;
                            }
                        }
                        else {
                            totalIterations = options;
                        }
                    }
                    if (!totalIterations) {
                        totalIterations = 1;
                    }
                    if (!direction) {
                        direction = 'normal';
                    }
                    self._totalIterations = totalIterations;
                    self._direction = direction;
                    if (!(self._playState === 'running' || self._playState === 'pending')) {
                        self._playState = 'pending';
                        index_1.timeloop.on(self._onTick);
                        self._dispatcher.trigger('play', self._context);
                    }
                    return self;
                };
                Animator.prototype.reverse = function () {
                    var self = this;
                    self._playbackRate *= -1;
                    return self;
                };
                Animator.prototype._recalculate = function () {
                    var self = this;
                    self._duration = common_1.maxBy(self._events, function (e) { return e.startTimeMs + e.animator.totalDuration; });
                };
                Animator.prototype._addEvent = function (options) {
                    var self = this;
                    var event = resolveMixins(options);
                    // set from and to relative to existing duration    
                    event.from = common_1.getCanonicalTime(common_1.parseUnit(event.from || 0)) + self._duration;
                    event.to = common_1.getCanonicalTime(common_1.parseUnit(event.to || 0)) + self._duration;
                    // set easing to linear by default     
                    var easingFn = just_curves_1.cssFunction(options.easing || just_curves_1.css.ease);
                    event.easing = just_curves_1.css[common_1.toCamelCase(options.easing)] || options.easing || just_curves_1.css.ease;
                    var delay = event.delay || 0;
                    var endDelay = event.endDelay || 0;
                    var targets = common_1.getTargets(event.targets);
                    var targetLength = targets.length;
                    for (var i = 0, len = targetLength; i < len; i++) {
                        var target = targets[i];
                        var ctx = {
                            index: i,
                            options: event,
                            target: target,
                            targets: targets
                        };
                        // fire create function if provided (allows for modifying the target prior to animating)
                        if (event.on && common_1.isFunction(event.on.create)) {
                            event.on.create(ctx);
                        }
                        var playFunction = event.on && common_1.isFunction(event.on.play) ? event.on.play : noop;
                        var pauseFunction = event.on && common_1.isFunction(event.on.pause) ? event.on.pause : noop;
                        var cancelFunction = event.on && common_1.isFunction(event.on.cancel) ? event.on.cancel : noop;
                        var finishFunction = event.on && common_1.isFunction(event.on.finish) ? event.on.finish : noop;
                        var updateFunction = event.on && common_1.isFunction(event.on.update) ? event.on.update : noop;
                        var delayUnit = common_1.createUnitResolver(common_1.resolve(delay, ctx) || 0)(i);
                        event.delay = common_1.getCanonicalTime(delayUnit);
                        var endDelayUnit = common_1.createUnitResolver(common_1.resolve(endDelay, ctx) || 0)(i);
                        event.endDelay = common_1.getCanonicalTime(endDelayUnit);
                        var iterations = common_1.resolve(options.iterations, ctx) || 1;
                        var iterationStart = common_1.resolve(options.iterationStart, ctx) || 0;
                        var direction = common_1.resolve(options.direction, ctx) || undefined;
                        var duration = options.to - options.from;
                        var fill = common_1.resolve(options.fill, ctx) || 'none';
                        var totalTime = event.delay + ((iterations || 1) * duration) + event.endDelay;
                        // note: don't unwrap easings so we don't break this later with custom easings
                        var easing = just_curves_1.css[common_1.toCamelCase(options.easing)] || options.easing || just_curves_1.css.ease;
                        var timings = {
                            delay: event.delay,
                            endDelay: event.endDelay,
                            duration: duration,
                            iterations: iterations,
                            iterationStart: iterationStart,
                            fill: fill,
                            direction: direction,
                            easing: easing,
                            totalTime: totalTime
                        };
                        for (var _i = 0, plugins_1 = plugins; _i < plugins_1.length; _i++) {
                            var plugin = plugins_1[_i];
                            if (!plugin.canHandle(ctx)) {
                                continue;
                            }
                            var animator = plugin.handle(timings, ctx);
                            self._events.push({
                                animator: animator,
                                cancel: cancelFunction,
                                easingFn: easingFn,
                                endTimeMs: event.from + animator.totalDuration,
                                finish: finishFunction,
                                index: i,
                                pause: pauseFunction,
                                play: playFunction,
                                startTimeMs: event.from,
                                target: target,
                                targets: targets,
                                update: updateFunction
                            });
                        }
                    }
                };
                Animator.prototype._onCancel = function () {
                    var self = this;
                    var context = self._context;
                    index_1.timeloop.off(self._onTick);
                    self._currentTime = 0;
                    self._currentIteration = undefined;
                    self._playState = 'idle';
                    for (var _i = 0, _a = self._events; _i < _a.length; _i++) {
                        var evt = _a[_i];
                        evt.animator.playState('idle');
                    }
                    for (var _b = 0, _c = self._events; _b < _c.length; _b++) {
                        var evt = _c[_b];
                        context.target = evt.target;
                        context.targets = evt.targets;
                        context.index = evt.index;
                        evt.cancel(self._context);
                    }
                };
                Animator.prototype._onFinish = function () {
                    var self = this;
                    var context = self._context;
                    index_1.timeloop.off(self._onTick);
                    self._currentTime = undefined;
                    self._currentIteration = undefined;
                    self._playState = 'finished';
                    for (var _i = 0, _a = self._events; _i < _a.length; _i++) {
                        var evt = _a[_i];
                        evt.animator.playState('finished');
                    }
                    for (var _b = 0, _c = self._events; _b < _c.length; _b++) {
                        var evt = _c[_b];
                        context.target = evt.target;
                        context.targets = evt.targets;
                        context.index = evt.index;
                        evt.finish(self._context);
                    }
                };
                Animator.prototype._onPause = function () {
                    var self = this;
                    var context = self._context;
                    index_1.timeloop.off(self._onTick);
                    self._playState = 'paused';
                    for (var _i = 0, _a = self._events; _i < _a.length; _i++) {
                        var evt = _a[_i];
                        evt.animator.playState('paused');
                    }
                    for (var _b = 0, _c = self._events; _b < _c.length; _b++) {
                        var evt = _c[_b];
                        context.target = evt.target;
                        context.targets = evt.targets;
                        context.index = evt.index;
                        evt.pause(self._context);
                    }
                };
                return Animator;
            }());
            exports_13("Animator", Animator);
        }
    };
});
System.register("just-animate/plugins/core/Dispatcher", ["just-animate/common/index"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    function trigger(eventName, resolvable) {
        var listeners = this.fns[eventName];
        if (!listeners) {
            return;
        }
        var ctx = common_2.isFunction(resolvable)
            ? resolvable()
            : resolvable;
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            listener(ctx);
        }
    }
    function on(eventName, listener) {
        if (!common_2.isFunction(listener)) {
            throw common_2.invalidArg('listener');
        }
        var fn = this.fns;
        var listeners = fn[eventName];
        if (!listeners) {
            fn[eventName] = [listener];
            return;
        }
        if (listeners.indexOf(listener) !== -1) {
            return;
        }
        listeners.push(listener);
    }
    function off(eventName, listener) {
        var listeners = this.fns[eventName];
        if (listeners) {
            var indexOfListener = listeners.indexOf(listener);
            if (indexOfListener !== -1) {
                listeners.splice(indexOfListener, 1);
            }
        }
    }
    var common_2, dispatcher;
    return {
        setters: [
            function (common_2_1) {
                common_2 = common_2_1;
            }
        ],
        execute: function () {
            exports_14("dispatcher", dispatcher = function () {
                return {
                    fns: {},
                    trigger: trigger,
                    on: on,
                    off: off
                };
            });
        }
    };
});
System.register("just-animate/plugins/core/presets", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var presets, findAnimation, registerAnimation;
    return {
        setters: [],
        execute: function () {
            presets = {};
            exports_15("findAnimation", findAnimation = function (name) { return presets[name] || undefined; });
            exports_15("registerAnimation", registerAnimation = function (animationOptions) {
                presets[animationOptions.name] = animationOptions;
            });
        }
    };
});
System.register("just-animate/plugins/core/timeloop", ["just-animate/common/index"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var common_3, active, elapses, offs, ons, isActive, lastTime, updateOffs, updateOns, update, timeloop;
    return {
        setters: [
            function (common_3_1) {
                common_3 = common_3_1;
            }
        ],
        execute: function () {
            active = [];
            elapses = [];
            offs = [];
            ons = [];
            isActive = undefined;
            lastTime = undefined;
            updateOffs = function () {
                var len = offs.length;
                for (var i = 0; i < len; i++) {
                    var fn = offs[i];
                    var indexOfSub = active.indexOf(fn);
                    if (indexOfSub !== -1) {
                        active.splice(indexOfSub, 1);
                        elapses.splice(indexOfSub, 1);
                    }
                }
            };
            updateOns = function () {
                var len = ons.length;
                for (var i = 0; i < len; i++) {
                    var fn = ons[i];
                    if (active.indexOf(fn) === -1) {
                        active.push(fn);
                        elapses.push(0);
                    }
                }
            };
            update = function () {
                updateOffs();
                updateOns();
                var len = active.length;
                lastTime = lastTime || common_3.now();
                var thisTime = common_3.now();
                var delta = thisTime - lastTime;
                // if undefined is subscribed, kill the cycle
                if (!len) {
                    // end recursion
                    isActive = undefined;
                    lastTime = undefined;
                    return;
                }
                // ensure running and requestAnimationFrame is called
                isActive = true;
                lastTime = thisTime;
                common_3.raf(self, update);
                for (var i = 0; i < len; i++) {
                    // update delta and save result
                    var existingElapsed = elapses[i];
                    var updatedElapsed = existingElapsed + delta;
                    elapses[i] = updatedElapsed;
                    // call sub with updated delta
                    active[i](delta, updatedElapsed);
                }
            };
            exports_16("timeloop", timeloop = {
                on: function (fn) {
                    var offIndex = offs.indexOf(fn);
                    if (offIndex !== -1) {
                        offs.splice(offIndex, 1);
                    }
                    if (ons.indexOf(fn) === -1) {
                        ons.push(fn);
                    }
                    if (!isActive) {
                        isActive = true;
                        common_3.raf(self, update);
                    }
                },
                off: function (fn) {
                    var onIndex = ons.indexOf(fn);
                    if (onIndex !== -1) {
                        ons.splice(onIndex, 1);
                    }
                    if (offs.indexOf(fn) === -1) {
                        offs.push(fn);
                    }
                    if (!isActive) {
                        isActive = true;
                        common_3.raf(self, update);
                    }
                }
            });
        }
    };
});
System.register("just-animate/plugins/core/index", ["just-animate/plugins/core/animator", "just-animate/plugins/core/Dispatcher", "just-animate/plugins/core/presets", "just-animate/plugins/core/timeloop"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_17(exports);
    }
    return {
        setters: [
            function (animator_1_1) {
                exportStar_2(animator_1_1);
            },
            function (Dispatcher_1_1) {
                exportStar_2(Dispatcher_1_1);
            },
            function (presets_1_1) {
                exportStar_2(presets_1_1);
            },
            function (timeloop_1_1) {
                exportStar_2(timeloop_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("just-animate/plugins/waapi/waapi", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("just-animate/plugins/waapi/animator/KeyframeAnimator", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var KeyframeAnimator;
    return {
        setters: [],
        execute: function () {
            /**
             * Implements the IAnimationController interface for the Web Animation API
             *
             * @export
             * @class KeyframeAnimator
             * @implements {ja.IAnimationController}
             */
            KeyframeAnimator = (function () {
                function KeyframeAnimator(init) {
                    this._init = init;
                    this._initialized = undefined;
                }
                KeyframeAnimator.prototype.seek = function (value) {
                    this._ensureInit();
                    if (this._animator.currentTime !== value) {
                        this._animator.currentTime = value;
                    }
                };
                KeyframeAnimator.prototype.playbackRate = function (value) {
                    this._ensureInit();
                    if (this._animator.playbackRate !== value) {
                        this._animator.playbackRate = value;
                    }
                };
                KeyframeAnimator.prototype.reverse = function () {
                    this._ensureInit();
                    this._animator.playbackRate *= -1;
                };
                KeyframeAnimator.prototype.restart = function () {
                    var animator = this._animator;
                    animator.cancel();
                    animator.play();
                };
                KeyframeAnimator.prototype.playState = function (value) {
                    var self = this;
                    self._ensureInit();
                    var animator = self._animator;
                    var playState = !animator || self._initialized === false ? 'fatal' : animator.playState;
                    if (value === undefined) {
                        return playState;
                    }
                    if (playState === value) {
                    }
                    else if (playState === 'fatal') {
                        animator.cancel();
                    }
                    else if (value === 'finished') {
                        animator.finish();
                    }
                    else if (value === 'idle') {
                        animator.cancel();
                    }
                    else if (value === 'paused') {
                        animator.pause();
                    }
                    else if (value === 'running') {
                        animator.play();
                    }
                    return undefined;
                };
                KeyframeAnimator.prototype._ensureInit = function () {
                    var self = this;
                    var init = self._init;
                    if (init) {
                        self._init = undefined;
                        self._initialized = false;
                        self._animator = init();
                        self._initialized = true;
                    }
                };
                return KeyframeAnimator;
            }());
            exports_19("KeyframeAnimator", KeyframeAnimator);
        }
    };
});
System.register("just-animate/plugins/waapi/animator/index", ["just-animate/plugins/waapi/animator/KeyframeAnimator"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    function exportStar_3(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_20(exports);
    }
    return {
        setters: [
            function (KeyframeAnimator_1_1) {
                exportStar_3(KeyframeAnimator_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("just-animate/plugins/waapi/transform/resources", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var propertyAliases, transforms;
    return {
        setters: [],
        execute: function () {
            exports_21("propertyAliases", propertyAliases = {
                x: 'translateX',
                y: 'translateY',
                z: 'translateZ'
            });
            exports_21("transforms", transforms = [
                'perspective',
                'matrix',
                'translateX',
                'translateY',
                'translateZ',
                'translate',
                'translate3d',
                'x',
                'y',
                'z',
                'skew',
                'skewX',
                'skewY',
                'rotateX',
                'rotateY',
                'rotateZ',
                'rotate',
                'rotate3d',
                'scaleX',
                'scaleY',
                'scaleZ',
                'scale',
                'scale3d'
            ]);
        }
    };
});
System.register("just-animate/plugins/waapi/transform/addTransition", ["just-animate/common/index", "just-animate/plugins/waapi/transform/resources"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var common_4, resources_4, addTransition;
    return {
        setters: [
            function (common_4_1) {
                common_4 = common_4_1;
            },
            function (resources_4_1) {
                resources_4 = resources_4_1;
            }
        ],
        execute: function () {
            exports_22("addTransition", addTransition = function (keyframes, target) {
                // detect properties to transition
                var properties = common_4.listProps(keyframes);
                // copy properties from the dom to the animation
                // todo: check how to do this in IE8, or not?
                var style = window.getComputedStyle(target);
                // create the first frame
                var firstFrame = { offset: 0 };
                keyframes.splice(0, 0, firstFrame);
                properties.forEach(function (property) {
                    // skip offset property
                    if (property === 'offset') {
                        return;
                    }
                    var alias = resources_4.transforms.indexOf(property) !== -1 ? 'transform' : property;
                    var val = style[alias];
                    if (common_4.isDefined(val)) {
                        firstFrame[alias] = val;
                    }
                });
            });
        }
    };
});
System.register("just-animate/plugins/waapi/transform/arrangeKeyframes", ["just-animate/common/index"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var common_5, arrangeKeyframes;
    return {
        setters: [
            function (common_5_1) {
                common_5 = common_5_1;
            }
        ],
        execute: function () {
            exports_23("arrangeKeyframes", arrangeKeyframes = function (keyframes) {
                // don't arrange frames if there aren't any
                if (keyframes.length < 1) {
                    return;
                }
                var first = common_5.head(keyframes, function (k) { return k.offset === 0; })
                    || common_5.head(keyframes, function (k) { return k.offset === undefined; });
                if (first === undefined) {
                    first = {};
                    keyframes.splice(0, 0, first);
                }
                if (first.offset !== 0) {
                    first.offset = 0;
                }
                var last = common_5.tail(keyframes, function (k) { return k.offset === 1; })
                    || common_5.tail(keyframes, function (k) { return k.offset === undefined; });
                if (last === undefined) {
                    last = {};
                    keyframes.push(last);
                }
                if (last.offset !== 1) {
                    last.offset = 0;
                }
            });
        }
    };
});
System.register("just-animate/plugins/waapi/transform/keyframeOffsetComparer", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var keyframeOffsetComparer;
    return {
        setters: [],
        execute: function () {
            exports_24("keyframeOffsetComparer", keyframeOffsetComparer = function (a, b) { return a.offset - b.offset; });
        }
    };
});
System.register("just-animate/plugins/waapi/transform/expandOffsets", ["just-animate/common/index", "just-animate/plugins/waapi/transform/keyframeOffsetComparer"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var common_6, keyframeOffsetComparer_1, expandOffsets;
    return {
        setters: [
            function (common_6_1) {
                common_6 = common_6_1;
            },
            function (keyframeOffsetComparer_1_1) {
                keyframeOffsetComparer_1 = keyframeOffsetComparer_1_1;
            }
        ],
        execute: function () {
            /**
             * copies keyframs with an offset array to separate keyframes
             *
             * @export
             * @param {waapi.IKeyframe[]} keyframes
             */
            exports_25("expandOffsets", expandOffsets = function (keyframes) {
                for (var i = keyframes.length - 1; i > -1; --i) {
                    var keyframe = keyframes[i];
                    // keyframes with offset as a number don't need any work        
                    if (!common_6.isArray(keyframe.offset)) {
                        continue;
                    }
                    // remove the keyframe from the array        
                    keyframes.splice(i, 1);
                    // copy frame for each offset        
                    var offsets = keyframe.offset;
                    // perform ascending sort so offsets are in order in place
                    // this is important when calculating the distance between known offsets
                    offsets.sort();
                    // insert the offsets starting with the last one, so each subsequent 
                    for (var j = offsets.length - 1; j > -1; --j) {
                        // create a deep copy of the frame (since we need to do additional processing)
                        var newKeyframe = common_6.deepCopyObject(keyframe);
                        // replace offset propery with the current number
                        newKeyframe.offset = offsets[j];
                        // insert it in the same position as the original
                        // splice pushes the last insert ahead of it [c], [b, c], [a, b, c]
                        keyframes.splice(i, 0, newKeyframe);
                    }
                }
                // resort by offset    
                keyframes.sort(keyframeOffsetComparer_1.keyframeOffsetComparer);
            });
        }
    };
});
System.register("just-animate/plugins/waapi/transform/fixPartialKeyframes", ["just-animate/common/index"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var common_7, fixPartialKeyframes;
    return {
        setters: [
            function (common_7_1) {
                common_7 = common_7_1;
            }
        ],
        execute: function () {
            /**
             * If a property is missing at the start or end keyframe, the first or last instance of it is moved to the end.
             */
            exports_26("fixPartialKeyframes", fixPartialKeyframes = function (keyframes) {
                // don't attempt to fill animation if less than 1 keyframes
                if (keyframes.length < 1) {
                    return;
                }
                var first = common_7.head(keyframes);
                var last = common_7.tail(keyframes);
                // fill initial keyframe with missing props
                var len = keyframes.length;
                for (var i = 1; i < len; i++) {
                    var keyframe = keyframes[i];
                    for (var prop in keyframe) {
                        if (prop !== 'offset' && !common_7.isDefined(first[prop])) {
                            first[prop] = keyframe[prop];
                        }
                    }
                }
                // fill end keyframe with missing props
                for (var i = len - 2; i > -1; i--) {
                    var keyframe = keyframes[i];
                    for (var prop in keyframe) {
                        if (prop !== 'offset' && !common_7.isDefined(last[prop])) {
                            last[prop] = keyframe[prop];
                        }
                    }
                }
            });
        }
    };
});
System.register("just-animate/plugins/waapi/transform/propsToKeyframes", ["just-animate/common/index", "just-animate/plugins/waapi/transform/keyframeOffsetComparer", "just-animate/plugins/waapi/transform/resources"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var common_8, keyframeOffsetComparer_2, resources_5, propsToKeyframes;
    return {
        setters: [
            function (common_8_1) {
                common_8 = common_8_1;
            },
            function (keyframeOffsetComparer_2_1) {
                keyframeOffsetComparer_2 = keyframeOffsetComparer_2_1;
            },
            function (resources_5_1) {
                resources_5 = resources_5_1;
            }
        ],
        execute: function () {
            exports_27("propsToKeyframes", propsToKeyframes = function (css, keyframes, ctx) {
                // create a map to capture each keyframe by offset
                var keyframesByOffset = {};
                var cssProps = css;
                // iterate over each property split it into keyframes            
                for (var prop in cssProps) {
                    if (!cssProps.hasOwnProperty(prop)) {
                        continue;
                    }
                    // resolve value (changes function into discrete value or array)                    
                    var val = common_8.resolve(cssProps[prop], ctx);
                    if (common_8.isArray(val)) {
                        // if the value is an array, split up the offset automatically
                        var valAsArray = val;
                        var valLength = valAsArray.length;
                        for (var i = 0; i < valLength; i++) {
                            var offset = i === 0 ? 0
                                : i === valLength - 1 ? 1
                                    : i / (valLength - 1.0);
                            var keyframe = keyframesByOffset[offset];
                            if (!keyframe) {
                                keyframe = {};
                                keyframesByOffset[offset] = keyframe;
                            }
                            keyframe[prop] = val[i];
                        }
                    }
                    else {
                        // if the value is not an array, place it at offset 1
                        var keyframe = keyframesByOffset[1];
                        if (!keyframe) {
                            keyframe = {};
                            keyframesByOffset[1] = keyframe;
                        }
                        keyframe[prop] = val;
                    }
                }
                // get list of transform properties in object
                var includedTransforms = Object
                    .keys(cssProps)
                    .filter(function (c) { return resources_5.transforms.indexOf(c) !== -1; });
                var offsets = Object
                    .keys(keyframesByOffset)
                    .map(function (s) { return Number(s); })
                    .sort();
                // if prop not present calculate each transform property in list
                // a keyframe at offset 1 should be guaranteed for each property, so skip that one
                for (var i = offsets.length - 2; i > -1; --i) {
                    var offset = offsets[i];
                    var keyframe = keyframesByOffset[offset];
                    // foreach keyframe if has transform property
                    for (var _i = 0, includedTransforms_1 = includedTransforms; _i < includedTransforms_1.length; _i++) {
                        var transform = includedTransforms_1[_i];
                        if (common_8.isDefined(keyframe[transform])) {
                            continue;
                        }
                        // get the next keyframe (should always be one ahead with a good value)
                        var endOffset = offsets[i + 1];
                        var endKeyframe = keyframesByOffset[endOffset];
                        // parse out unit values of next keyframe       
                        var envValueUnit = common_8.parseUnit(endKeyframe[transform]);
                        var endValue = envValueUnit.value;
                        var endUnitType = envValueUnit.unit;
                        // search downward for the previous value or use defaults  
                        var startIndex = 0;
                        var startValue = endValue;
                        var startOffset = 0;
                        var startUnit = undefined;
                        for (var j = i - 1; j > -1; --j) {
                            var offset1 = offsets[j];
                            var keyframe1 = keyframesByOffset[offset1];
                            if (common_8.isDefined(keyframe1[transform])) {
                                var startValueUnit = common_8.parseUnit(keyframe1[transform]);
                                startValue = startValueUnit.value;
                                startUnit = startValueUnit.unit;
                                startIndex = j;
                                startOffset = offsets[j];
                                break;
                            }
                        }
                        if (startValue !== 0 && common_8.isDefined(startUnit) && common_8.isDefined(endUnitType) && startUnit !== endUnitType) {
                            throw common_8.unsupported('Mixed transform property units');
                        }
                        // iterate forward
                        for (var j = startIndex; j < i + 1; j++) {
                            var currentOffset = offsets[j];
                            var currentKeyframe = keyframesByOffset[currentOffset];
                            // calculate offset delta (how much animation progress to apply)
                            var offsetDelta = (currentOffset - startOffset) / (endOffset - startOffset);
                            var currentValue = startValue + (endValue - startValue) * offsetDelta;
                            var currentValueWithUnit = common_8.isDefined(endUnitType)
                                ? currentValue + endUnitType
                                : common_8.isDefined(startUnit)
                                    ? currentValue + startUnit
                                    : currentValue;
                            currentKeyframe[transform] = currentValueWithUnit;
                            // move reference point forward
                            startOffset = currentOffset;
                            startValue = currentValue;
                        }
                    }
                }
                // reassemble as array
                for (var offset in keyframesByOffset) {
                    var keyframe = keyframesByOffset[offset];
                    keyframe.offset = Number(offset);
                    keyframes.push(keyframe);
                }
                // resort by offset    
                keyframes.sort(keyframeOffsetComparer_2.keyframeOffsetComparer);
            });
        }
    };
});
System.register("just-animate/plugins/waapi/transform/resolvePropertiesInKeyframes", ["node_modules/just-curves/src/main", "just-animate/common/index", "just-animate/plugins/waapi/transform/resources"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var just_curves_2, common_9, resources_6, transformPropertyComparer, normalizeProperties, resolvePropertiesInKeyframes;
    return {
        setters: [
            function (just_curves_2_1) {
                just_curves_2 = just_curves_2_1;
            },
            function (common_9_1) {
                common_9 = common_9_1;
            },
            function (resources_6_1) {
                resources_6 = resources_6_1;
            }
        ],
        execute: function () {
            transformPropertyComparer = function (a, b) {
                return resources_6.transforms.indexOf(a[0]) - resources_6.transforms.indexOf(b[0]);
            };
            /**
             * Handles transforming short hand key properties into their native form
             */
            normalizeProperties = function (keyframe) {
                var cssTransforms = [];
                for (var prop in keyframe) {
                    var value = keyframe[prop];
                    if (!common_9.isDefined(value)) {
                        keyframe[prop] = undefined;
                        continue;
                    }
                    // nullify properties so shorthand and handled properties don't end up in the result
                    keyframe[prop] = undefined;
                    // get the final property name
                    var propAlias = resources_6.propertyAliases[prop] || prop;
                    // find out if the property needs to end up on transform
                    var transformIndex = resources_6.transforms.indexOf(propAlias);
                    if (transformIndex !== -1) {
                        // handle transforms
                        cssTransforms.push([propAlias, value]);
                    }
                    else if (propAlias === 'easing') {
                        // handle easings
                        keyframe.easing = just_curves_2.css[common_9.toCamelCase(value)] || value || just_curves_2.css.ease;
                    }
                    else {
                        // handle others (change background-color and the like to backgroundColor)
                        keyframe[common_9.toCamelCase(propAlias)] = value;
                    }
                }
                if (cssTransforms.length) {
                    keyframe.transform = cssTransforms
                        .sort(transformPropertyComparer)
                        .reduce(function (c, n) { return c + (" " + n[0] + "(" + n[1] + ")"); }, '');
                }
            };
            /**
             * This calls all keyframe properties that are functions and sets their values
             */
            exports_28("resolvePropertiesInKeyframes", resolvePropertiesInKeyframes = function (source, target, ctx) {
                var len = source.length;
                for (var i = 0; i < len; i++) {
                    var sourceKeyframe = source[i];
                    var targetKeyframe = {};
                    for (var propertyName in sourceKeyframe) {
                        if (!sourceKeyframe.hasOwnProperty(propertyName)) {
                            continue;
                        }
                        var sourceValue = sourceKeyframe[propertyName];
                        if (!common_9.isDefined(sourceValue)) {
                            continue;
                        }
                        targetKeyframe[propertyName] = common_9.resolve(sourceValue, ctx);
                    }
                    normalizeProperties(targetKeyframe);
                    target.push(targetKeyframe);
                }
            });
        }
    };
});
System.register("just-animate/plugins/waapi/transform/spaceKeyframes", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    function spaceKeyframes(keyframes) {
        // don't attempt to fill animation if less than 2 keyframes
        if (keyframes.length < 2) {
            return;
        }
        var first = keyframes[0];
        // ensure first offset    
        if (first.offset !== 0) {
            first.offset = 0;
        }
        var last = keyframes[keyframes.length - 1];
        // ensure last offset
        if (last.offset !== 1) {
            last.offset = 1;
        }
        // explicitly set implicit offsets
        var len = keyframes.length;
        var lasti = len - 1;
        for (var i = 1; i < lasti; i++) {
            var target = keyframes[i];
            // skip entries that have an offset        
            if (typeof target.offset === 'number') {
                continue;
            }
            // search for the next offset with a value        
            for (var j = i + 1; j < len; j++) {
                // pass if offset is not set
                if (typeof keyframes[j].offset !== 'number') {
                    continue;
                }
                // calculate timing/position info
                var startTime = keyframes[i - 1].offset;
                var endTime = keyframes[j].offset;
                var timeDelta = endTime - startTime;
                var deltaLength = j - i + 1;
                // set the values of all keyframes between i and j (exclusive)
                for (var k = 1; k < deltaLength; k++) {
                    // set to percentage of change over time delta + starting time
                    keyframes[k - 1 + i].offset = ((k / j) * timeDelta) + startTime;
                }
                // move i past this keyframe since all frames between should be processed
                i = j;
                break;
            }
        }
    }
    exports_29("spaceKeyframes", spaceKeyframes);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("just-animate/plugins/waapi/transform/index", ["just-animate/plugins/waapi/transform/addTransition", "just-animate/plugins/waapi/transform/arrangeKeyframes", "just-animate/plugins/waapi/transform/expandOffsets", "just-animate/plugins/waapi/transform/fixPartialKeyframes", "just-animate/plugins/waapi/transform/keyframeOffsetComparer", "just-animate/plugins/waapi/transform/propsToKeyframes", "just-animate/plugins/waapi/transform/resolvePropertiesInKeyframes", "just-animate/plugins/waapi/transform/spaceKeyframes"], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    function exportStar_4(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_30(exports);
    }
    return {
        setters: [
            function (addTransition_1_1) {
                exportStar_4(addTransition_1_1);
            },
            function (arrangeKeyframes_1_1) {
                exportStar_4(arrangeKeyframes_1_1);
            },
            function (expandOffsets_1_1) {
                exportStar_4(expandOffsets_1_1);
            },
            function (fixPartialKeyframes_1_1) {
                exportStar_4(fixPartialKeyframes_1_1);
            },
            function (keyframeOffsetComparer_3_1) {
                exportStar_4(keyframeOffsetComparer_3_1);
            },
            function (propsToKeyframes_1_1) {
                exportStar_4(propsToKeyframes_1_1);
            },
            function (resolvePropertiesInKeyframes_1_1) {
                exportStar_4(resolvePropertiesInKeyframes_1_1);
            },
            function (spaceKeyframes_1_1) {
                exportStar_4(spaceKeyframes_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("just-animate/plugins/waapi/KeyframePlugin", ["just-animate/common/index", "just-animate/plugins/waapi/animator/index", "just-animate/plugins/waapi/transform/index"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var common_10, animator_2, transform_1, keyframePlugin, initAnimator;
    return {
        setters: [
            function (common_10_1) {
                common_10 = common_10_1;
            },
            function (animator_2_1) {
                animator_2 = animator_2_1;
            },
            function (transform_1_1) {
                transform_1 = transform_1_1;
            }
        ],
        execute: function () {
            exports_31("keyframePlugin", keyframePlugin = {
                canHandle: function (ctx) {
                    return !!(ctx.options.css) && common_10.isElement(ctx.target);
                },
                handle: function (timings, ctx) {
                    var animator = new animator_2.KeyframeAnimator(function () { return initAnimator(timings, ctx); });
                    animator.totalDuration = timings.totalTime;
                    return animator;
                }
            });
            exports_31("initAnimator", initAnimator = function (timings, ctx) {
                // process css as either keyframes or calculate what those keyframes should be   
                var options = ctx.options;
                var target = ctx.target;
                var css = options.css;
                var sourceKeyframes;
                if (common_10.isArray(css)) {
                    // if an array, no processing has to occur
                    sourceKeyframes = css;
                    transform_1.expandOffsets(sourceKeyframes);
                }
                else {
                    sourceKeyframes = [];
                    transform_1.propsToKeyframes(css, sourceKeyframes, ctx);
                }
                var targetKeyframes = [];
                transform_1.resolvePropertiesInKeyframes(sourceKeyframes, targetKeyframes, ctx);
                if (options.isTransition === true) {
                    transform_1.addTransition(targetKeyframes, target);
                }
                transform_1.spaceKeyframes(targetKeyframes);
                transform_1.arrangeKeyframes(targetKeyframes);
                // sort by offset (should have all offsets assigned)
                targetKeyframes.sort(transform_1.keyframeOffsetComparer);
                transform_1.fixPartialKeyframes(targetKeyframes);
                var animator = target['animate'](targetKeyframes, timings);
                animator.cancel();
                return animator;
            });
        }
    };
});
System.register("just-animate/plugins/waapi/index", ["just-animate/plugins/waapi/KeyframePlugin"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    function exportStar_5(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_32(exports);
    }
    return {
        setters: [
            function (KeyframePlugin_1_1) {
                exportStar_5(KeyframePlugin_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("just-animate/animate", ["just-animate/plugins/core/index", "just-animate/plugins/waapi/index"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var core_1, waapi_1, animate;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (waapi_1_1) {
                waapi_1 = waapi_1_1;
            }
        ],
        execute: function () {
            core_1.plugins.push(waapi_1.keyframePlugin);
            /**
             * Returns a new timeline of animation(s) using the options provided
             *
             * @param {(ja.IAnimationOptions | ja.IAnimationOptions[])} options
             * @returns {ja.IAnimator}
             *
             * @memberOf JustAnimate
             */
            exports_33("animate", animate = (function (options) {
                return new core_1.Animator().animate(options);
            }));
            animate.plugins = core_1.plugins;
            animate.register = core_1.registerAnimation;
        }
    };
});
System.register("just-animate/animations/bounce", [], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var bounce;
    return {
        setters: [],
        execute: function () {
            exports_34("bounce", bounce = {
                css: [
                    {
                        easing: 'easeOutCubic',
                        offset: [0, .2, .53, .80, 1],
                        transformOrigin: 'center bottom',
                        y: 0
                    },
                    {
                        easing: 'easeInQuint',
                        offset: [.4, .43],
                        y: '-30px'
                    },
                    {
                        easing: 'easeInQuint',
                        offset: .7,
                        y: '-15px'
                    },
                    {
                        offset: .9,
                        y: '-4px'
                    }
                ],
                fill: 'both',
                name: 'bounce',
                to: '1s'
            });
        }
    };
});
System.register("just-animate/animations/bounceIn", [], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var bounceIn;
    return {
        setters: [],
        execute: function () {
            exports_35("bounceIn", bounceIn = {
                css: [
                    {
                        opacity: 0,
                        scale: .3
                    },
                    {
                        scale: 1.1
                    },
                    {
                        scale: .9
                    },
                    {
                        opacity: 1,
                        scale: 1.03
                    },
                    {
                        scale: .97
                    },
                    {
                        opacity: 1,
                        scale: 1
                    }
                ],
                easing: 'easeOutCubic',
                fill: 'both',
                name: 'bounceIn',
                to: '1s'
            });
        }
    };
});
System.register("just-animate/animations/bounceInDown", [], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var bounceInDown;
    return {
        setters: [],
        execute: function () {
            exports_36("bounceInDown", bounceInDown = {
                css: [
                    {
                        offset: 0,
                        opacity: 0,
                        y: '-3000px'
                    },
                    {
                        offset: 0.6,
                        opacity: 1,
                        y: '25px'
                    },
                    {
                        offset: 0.75,
                        opacity: 1,
                        y: '-10px'
                    },
                    {
                        offset: 0.9,
                        opacity: 1,
                        y: '5px'
                    },
                    {
                        offset: 1,
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                to: '1s',
                fill: 'both',
                easing: 'easeOutCubic',
                name: 'bounceInDown'
            });
        }
    };
});
System.register("just-animate/animations/bounceInLeft", [], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var bounceInLeft;
    return {
        setters: [],
        execute: function () {
            exports_37("bounceInLeft", bounceInLeft = {
                css: [
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
                to: '1s',
                fill: 'both',
                easing: 'easeOutCubic',
                name: 'bounceInLeft'
            });
        }
    };
});
System.register("just-animate/animations/bounceInRight", [], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var bounceInRight;
    return {
        setters: [],
        execute: function () {
            exports_38("bounceInRight", bounceInRight = {
                css: [
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
                to: '1s',
                fill: 'both',
                easing: 'easeOutCubic',
                name: 'bounceInRight'
            });
        }
    };
});
System.register("just-animate/animations/bounceInUp", [], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var bounceInUp;
    return {
        setters: [],
        execute: function () {
            exports_39("bounceInUp", bounceInUp = {
                css: [
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
                to: '1s',
                fill: 'both',
                easing: 'easeOutCubic',
                name: 'bounceInUp'
            });
        }
    };
});
System.register("just-animate/animations/bounceOut", [], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var bounceOut;
    return {
        setters: [],
        execute: function () {
            exports_40("bounceOut", bounceOut = {
                css: [
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
                fill: 'both',
                name: 'bounceOut',
                to: '1s'
            });
        }
    };
});
System.register("just-animate/animations/bounceOutDown", [], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var bounceOutDown;
    return {
        setters: [],
        execute: function () {
            exports_41("bounceOutDown", bounceOutDown = {
                css: [
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
                to: '1s',
                fill: 'both',
                name: 'bounceOutDown'
            });
        }
    };
});
System.register("just-animate/animations/bounceOutLeft", [], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var bounceOutLeft;
    return {
        setters: [],
        execute: function () {
            exports_42("bounceOutLeft", bounceOutLeft = {
                css: [
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
                to: '1s',
                fill: 'both',
                name: 'bounceOutLeft'
            });
        }
    };
});
System.register("just-animate/animations/bounceOutRight", [], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var bounceOutRight;
    return {
        setters: [],
        execute: function () {
            exports_43("bounceOutRight", bounceOutRight = {
                css: [
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
                to: '1s',
                fill: 'both',
                name: 'bounceOutRight'
            });
        }
    };
});
System.register("just-animate/animations/bounceOutUp", [], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var bounceOutUp;
    return {
        setters: [],
        execute: function () {
            exports_44("bounceOutUp", bounceOutUp = {
                css: [
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
                to: '1s',
                fill: 'both',
                name: 'bounceOutUp'
            });
        }
    };
});
System.register("just-animate/animations/fadeIn", [], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var fadeIn;
    return {
        setters: [],
        execute: function () {
            exports_45("fadeIn", fadeIn = {
                css: {
                    opacity: [0, 1]
                },
                easing: 'ease-in',
                fill: 'both',
                name: 'fadeIn',
                to: '1s'
            });
        }
    };
});
System.register("just-animate/animations/fadeInDown", [], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var fadeInDown;
    return {
        setters: [],
        execute: function () {
            exports_46("fadeInDown", fadeInDown = {
                css: {
                    opacity: [0, 1],
                    y: ['-100%', 0]
                },
                fill: 'both',
                name: 'fadeInDown',
                to: '1s'
            });
        }
    };
});
System.register("just-animate/animations/fadeInDownBig", [], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var fadeInDownBig;
    return {
        setters: [],
        execute: function () {
            exports_47("fadeInDownBig", fadeInDownBig = {
                css: {
                    opacity: [0, 1],
                    y: ['-2000px', 0]
                },
                easing: 'ease-out',
                fill: 'both',
                name: 'fadeInDownBig',
                to: 1300
            });
        }
    };
});
System.register("just-animate/animations/fadeInLeft", [], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var fadeInLeft;
    return {
        setters: [],
        execute: function () {
            exports_48("fadeInLeft", fadeInLeft = {
                css: [
                    {
                        opacity: 0,
                        transform: 'translate3d(-100%, 0, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                to: '1s',
                fill: 'both',
                easing: 'ease-in',
                name: 'fadeInLeft'
            });
        }
    };
});
System.register("just-animate/animations/fadeInLeftBig", [], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var fadeInLeftBig;
    return {
        setters: [],
        execute: function () {
            exports_49("fadeInLeftBig", fadeInLeftBig = {
                css: [
                    {
                        opacity: 0,
                        transform: 'translate3d(-2000px, 0, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                to: 1300,
                fill: 'both',
                easing: 'ease-out',
                name: 'fadeInLeftBig'
            });
        }
    };
});
System.register("just-animate/animations/fadeInRight", [], function (exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var fadeInRight;
    return {
        setters: [],
        execute: function () {
            exports_50("fadeInRight", fadeInRight = {
                css: [
                    {
                        opacity: 0,
                        transform: 'translate3d(100%, 0, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                to: '1s',
                fill: 'both',
                easing: 'ease-in',
                name: 'fadeInRight'
            });
        }
    };
});
System.register("just-animate/animations/fadeInRightBig", [], function (exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var fadeInRightBig;
    return {
        setters: [],
        execute: function () {
            exports_51("fadeInRightBig", fadeInRightBig = {
                css: [
                    {
                        opacity: 0,
                        transform: 'translate3d(2000px, 0, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                to: 1300,
                fill: 'both',
                easing: 'ease-out',
                name: 'fadeInRightBig'
            });
        }
    };
});
System.register("just-animate/animations/fadeInUp", [], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var fadeInUp;
    return {
        setters: [],
        execute: function () {
            exports_52("fadeInUp", fadeInUp = {
                css: [
                    {
                        opacity: 0,
                        transform: 'translate3d(0, 100%, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                to: '1s',
                fill: 'both',
                easing: 'ease-in',
                name: 'fadeInUp'
            });
        }
    };
});
System.register("just-animate/animations/fadeInUpBig", [], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var fadeInUpBig;
    return {
        setters: [],
        execute: function () {
            exports_53("fadeInUpBig", fadeInUpBig = {
                css: [
                    {
                        opacity: 0,
                        transform: 'translate3d(0, 2000px, 0)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                to: 1300,
                fill: 'both',
                easing: 'ease-out',
                name: 'fadeInUpBig'
            });
        }
    };
});
System.register("just-animate/animations/fadeOut", [], function (exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var fadeOut;
    return {
        setters: [],
        execute: function () {
            exports_54("fadeOut", fadeOut = {
                css: {
                    opacity: [1, 0]
                },
                fill: 'both',
                name: 'fadeOut',
                to: '1s'
            });
        }
    };
});
System.register("just-animate/animations/fadeOutDown", [], function (exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var fadeOutDown;
    return {
        setters: [],
        execute: function () {
            exports_55("fadeOutDown", fadeOutDown = {
                css: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(0, 100%, 0)'
                    }
                ],
                to: '1s',
                name: 'fadeOutDown'
            });
        }
    };
});
System.register("just-animate/animations/fadeOutDownBig", [], function (exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var fadeOutDownBig;
    return {
        setters: [],
        execute: function () {
            exports_56("fadeOutDownBig", fadeOutDownBig = {
                css: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(0, 2000px, 0)'
                    }
                ],
                to: 1300,
                name: 'fadeOutDownBig'
            });
        }
    };
});
System.register("just-animate/animations/fadeOutLeft", [], function (exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    var fadeOutLeft;
    return {
        setters: [],
        execute: function () {
            exports_57("fadeOutLeft", fadeOutLeft = {
                css: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(-100%, 0, 0)'
                    }
                ],
                to: '1s',
                name: 'fadeOutLeft'
            });
        }
    };
});
System.register("just-animate/animations/fadeOutLeftBig", [], function (exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    var fadeOutLeftBig;
    return {
        setters: [],
        execute: function () {
            exports_58("fadeOutLeftBig", fadeOutLeftBig = {
                css: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(-2000px, 0, 0)'
                    }
                ],
                to: 1300,
                name: 'fadeOutLeftBig'
            });
        }
    };
});
System.register("just-animate/animations/fadeOutRight", [], function (exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    var fadeOutRight;
    return {
        setters: [],
        execute: function () {
            exports_59("fadeOutRight", fadeOutRight = {
                css: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(100%, 0, 0)'
                    }
                ],
                to: '1s',
                name: 'fadeOutRight'
            });
        }
    };
});
System.register("just-animate/animations/fadeOutRightBig", [], function (exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    var fadeOutRightBig;
    return {
        setters: [],
        execute: function () {
            exports_60("fadeOutRightBig", fadeOutRightBig = {
                css: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(2000px, 0, 0)'
                    }
                ],
                to: 1300,
                name: 'fadeOutRightBig'
            });
        }
    };
});
System.register("just-animate/animations/fadeOutUp", [], function (exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
    var fadeOutUp;
    return {
        setters: [],
        execute: function () {
            exports_61("fadeOutUp", fadeOutUp = {
                css: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(0, -100%, 0)'
                    }
                ],
                to: '1s',
                name: 'fadeOutUp'
            });
        }
    };
});
System.register("just-animate/animations/fadeOutUpBig", [], function (exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
    var fadeOutUpBig;
    return {
        setters: [],
        execute: function () {
            exports_62("fadeOutUpBig", fadeOutUpBig = {
                css: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(0, -2000px, 0)'
                    }
                ],
                to: 1300,
                name: 'fadeOutUpBig'
            });
        }
    };
});
System.register("just-animate/animations/flash", [], function (exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    var flash;
    return {
        setters: [],
        execute: function () {
            exports_63("flash", flash = {
                css: [
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
                to: '1s',
                name: 'flash'
            });
        }
    };
});
System.register("just-animate/animations/flip", [], function (exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    var flip;
    return {
        setters: [],
        execute: function () {
            exports_64("flip", flip = {
                css: [
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
                to: '1s',
                name: 'flip'
            });
        }
    };
});
System.register("just-animate/animations/flipInX", [], function (exports_65, context_65) {
    "use strict";
    var __moduleName = context_65 && context_65.id;
    var flipInX;
    return {
        setters: [],
        execute: function () {
            exports_65("flipInX", flipInX = {
                css: [
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
                to: '750ms',
                name: 'flipInX'
            });
        }
    };
});
System.register("just-animate/animations/flipInY", [], function (exports_66, context_66) {
    "use strict";
    var __moduleName = context_66 && context_66.id;
    var flipInY;
    return {
        setters: [],
        execute: function () {
            exports_66("flipInY", flipInY = {
                css: [
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
                to: '750ms',
                name: 'flipInY'
            });
        }
    };
});
System.register("just-animate/animations/flipOutX", [], function (exports_67, context_67) {
    "use strict";
    var __moduleName = context_67 && context_67.id;
    var flipOutX;
    return {
        setters: [],
        execute: function () {
            exports_67("flipOutX", flipOutX = {
                css: [
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
                to: '750ms',
                name: 'flipOutX'
            });
        }
    };
});
System.register("just-animate/animations/flipOutY", [], function (exports_68, context_68) {
    "use strict";
    var __moduleName = context_68 && context_68.id;
    var flipOutY;
    return {
        setters: [],
        execute: function () {
            exports_68("flipOutY", flipOutY = {
                css: [
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
                to: '750ms',
                name: 'flipOutY'
            });
        }
    };
});
System.register("just-animate/animations/headShake", [], function (exports_69, context_69) {
    "use strict";
    var __moduleName = context_69 && context_69.id;
    var headShake;
    return {
        setters: [],
        execute: function () {
            exports_69("headShake", headShake = {
                css: [
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
                to: '1s',
                easing: 'ease-out',
                name: 'headShake'
            });
        }
    };
});
System.register("just-animate/animations/hinge", [], function (exports_70, context_70) {
    "use strict";
    var __moduleName = context_70 && context_70.id;
    var hinge;
    return {
        setters: [],
        execute: function () {
            exports_70("hinge", hinge = {
                css: [
                    {
                        transform: 'none',
                        transformOrigin: 'top left',
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
                        transformOrigin: 'top left',
                        opacity: 0
                    }
                ],
                name: 'hinge',
                to: '2s'
            });
        }
    };
});
System.register("just-animate/animations/jello", [], function (exports_71, context_71) {
    "use strict";
    var __moduleName = context_71 && context_71.id;
    var jello;
    return {
        setters: [],
        execute: function () {
            exports_71("jello", jello = {
                css: [
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
                to: '1s',
                fill: 'both',
                easing: 'ease-in-out',
                name: 'jello'
            });
        }
    };
});
System.register("just-animate/animations/lightSpeedIn", [], function (exports_72, context_72) {
    "use strict";
    var __moduleName = context_72 && context_72.id;
    var lightSpeedIn;
    return {
        setters: [],
        execute: function () {
            exports_72("lightSpeedIn", lightSpeedIn = {
                css: [
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
                to: '1s',
                fill: 'both',
                easing: 'ease-out',
                name: 'lightSpeedIn'
            });
        }
    };
});
System.register("just-animate/animations/lightSpeedOut", [], function (exports_73, context_73) {
    "use strict";
    var __moduleName = context_73 && context_73.id;
    var lightSpeedOut;
    return {
        setters: [],
        execute: function () {
            exports_73("lightSpeedOut", lightSpeedOut = {
                css: [
                    {
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        transform: 'translate3d(100%, 0, 0) skewX(30deg)',
                        opacity: 0
                    }
                ],
                to: '1s',
                fill: 'both',
                easing: 'ease-in',
                name: 'lightSpeedOut'
            });
        }
    };
});
System.register("just-animate/animations/pulse", [], function (exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    var pulse;
    return {
        setters: [],
        execute: function () {
            exports_74("pulse", pulse = {
                css: [
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
                to: '1s',
                name: 'pulse'
            });
        }
    };
});
System.register("just-animate/animations/rollIn", [], function (exports_75, context_75) {
    "use strict";
    var __moduleName = context_75 && context_75.id;
    var rollIn;
    return {
        setters: [],
        execute: function () {
            exports_75("rollIn", rollIn = {
                css: [
                    {
                        opacity: 0,
                        transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)'
                    },
                    {
                        opacity: 1,
                        transform: 'none'
                    }
                ],
                to: '1s',
                name: 'rollIn'
            });
        }
    };
});
System.register("just-animate/animations/rollOut", [], function (exports_76, context_76) {
    "use strict";
    var __moduleName = context_76 && context_76.id;
    var rollOut;
    return {
        setters: [],
        execute: function () {
            exports_76("rollOut", rollOut = {
                css: [
                    {
                        opacity: 1,
                        transform: 'none'
                    },
                    {
                        opacity: 0,
                        transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)'
                    }
                ],
                to: '1s',
                name: 'rollOut'
            });
        }
    };
});
System.register("just-animate/animations/rotateIn", [], function (exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
    var rotateIn;
    return {
        setters: [],
        execute: function () {
            exports_77("rotateIn", rotateIn = {
                css: [
                    {
                        transformOrigin: 'center',
                        transform: 'rotate3d(0, 0, 1, -200deg)',
                        opacity: 0
                    },
                    {
                        transformOrigin: 'center',
                        transform: 'none',
                        opacity: 1
                    }
                ],
                to: '1s',
                name: 'rotateIn'
            });
        }
    };
});
System.register("just-animate/animations/rotateInDownLeft", [], function (exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    var rotateInDownLeft;
    return {
        setters: [],
        execute: function () {
            exports_78("rotateInDownLeft", rotateInDownLeft = {
                css: [
                    {
                        transformOrigin: 'left bottom',
                        transform: 'rotate3d(0, 0, 1, -45deg)',
                        opacity: 0
                    },
                    {
                        transformOrigin: 'left bottom',
                        transform: 'none',
                        opacity: 1
                    }
                ],
                to: '1s',
                name: 'rotateInDownLeft'
            });
        }
    };
});
System.register("just-animate/animations/rotateInDownRight", [], function (exports_79, context_79) {
    "use strict";
    var __moduleName = context_79 && context_79.id;
    var rotateInDownRight;
    return {
        setters: [],
        execute: function () {
            exports_79("rotateInDownRight", rotateInDownRight = {
                css: [
                    {
                        transformOrigin: 'right bottom',
                        transform: 'rotate3d(0, 0, 1, 45deg)',
                        opacity: 0
                    },
                    {
                        transformOrigin: 'right bottom',
                        transform: 'none',
                        opacity: 1
                    }
                ],
                to: '1s',
                name: 'rotateInDownRight'
            });
        }
    };
});
System.register("just-animate/animations/rotateInUpLeft", [], function (exports_80, context_80) {
    "use strict";
    var __moduleName = context_80 && context_80.id;
    var rotateInUpLeft;
    return {
        setters: [],
        execute: function () {
            exports_80("rotateInUpLeft", rotateInUpLeft = {
                css: [
                    {
                        transformOrigin: 'left bottom',
                        transform: 'rotate3d(0, 0, 1, 45deg)',
                        opacity: 0
                    },
                    {
                        transformOrigin: 'left bottom',
                        transform: 'none',
                        opacity: 1
                    }
                ],
                to: '1s',
                name: 'rotateInUpLeft'
            });
        }
    };
});
System.register("just-animate/animations/rotateInUpRight", [], function (exports_81, context_81) {
    "use strict";
    var __moduleName = context_81 && context_81.id;
    var rotateInUpRight;
    return {
        setters: [],
        execute: function () {
            exports_81("rotateInUpRight", rotateInUpRight = {
                css: [
                    {
                        transformOrigin: 'right bottom',
                        transform: 'rotate3d(0, 0, 1, -90deg)',
                        opacity: 0
                    },
                    {
                        transformOrigin: 'right bottom',
                        transform: 'none',
                        opacity: 1
                    }
                ],
                to: '1s',
                name: 'rotateInUpRight'
            });
        }
    };
});
System.register("just-animate/animations/rotateOut", [], function (exports_82, context_82) {
    "use strict";
    var __moduleName = context_82 && context_82.id;
    var rotateOut;
    return {
        setters: [],
        execute: function () {
            exports_82("rotateOut", rotateOut = {
                css: [
                    {
                        transformOrigin: 'center',
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        transformOrigin: 'center',
                        transform: 'rotate3d(0, 0, 1, 200deg)',
                        opacity: 0
                    }
                ],
                to: '1s',
                name: 'rotateOut'
            });
        }
    };
});
System.register("just-animate/animations/rotateOutDownLeft", [], function (exports_83, context_83) {
    "use strict";
    var __moduleName = context_83 && context_83.id;
    var rotateOutDownLeft;
    return {
        setters: [],
        execute: function () {
            exports_83("rotateOutDownLeft", rotateOutDownLeft = {
                css: [
                    {
                        transformOrigin: 'left bottom',
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        transformOrigin: 'left bottom',
                        transform: 'rotate3d(0, 0, 1, 45deg)',
                        opacity: 0
                    }
                ],
                to: '1s',
                name: 'rotateOutDownLeft'
            });
        }
    };
});
System.register("just-animate/animations/rotateOutDownRight", [], function (exports_84, context_84) {
    "use strict";
    var __moduleName = context_84 && context_84.id;
    var rotateOutDownRight;
    return {
        setters: [],
        execute: function () {
            exports_84("rotateOutDownRight", rotateOutDownRight = {
                css: [
                    {
                        transformOrigin: 'right bottom',
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        transformOrigin: 'right bottom',
                        transform: 'rotate3d(0, 0, 1, -45deg)',
                        opacity: 0
                    }
                ],
                to: '1s',
                name: 'rotateOutDownRight'
            });
        }
    };
});
System.register("just-animate/animations/rotateOutUpLeft", [], function (exports_85, context_85) {
    "use strict";
    var __moduleName = context_85 && context_85.id;
    var rotateOutUpLeft;
    return {
        setters: [],
        execute: function () {
            exports_85("rotateOutUpLeft", rotateOutUpLeft = {
                css: [
                    {
                        transformOrigin: 'left bottom',
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        transformOrigin: 'left bottom',
                        transform: 'rotate3d(0, 0, 1, -45deg)',
                        opacity: 0
                    }
                ],
                to: '1s',
                name: 'rotateOutUpLeft'
            });
        }
    };
});
System.register("just-animate/animations/rotateOutUpRight", [], function (exports_86, context_86) {
    "use strict";
    var __moduleName = context_86 && context_86.id;
    var rotateOutUpRight;
    return {
        setters: [],
        execute: function () {
            exports_86("rotateOutUpRight", rotateOutUpRight = {
                css: [
                    {
                        transformOrigin: 'right bottom',
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        transformOrigin: 'right bottom',
                        transform: 'rotate3d(0, 0, 1, 90deg)',
                        opacity: 0
                    }
                ],
                to: '1s',
                name: 'rotateOutUpRight'
            });
        }
    };
});
System.register("just-animate/animations/rubberBand", [], function (exports_87, context_87) {
    "use strict";
    var __moduleName = context_87 && context_87.id;
    var rubberBand;
    return {
        setters: [],
        execute: function () {
            exports_87("rubberBand", rubberBand = {
                css: [
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
                name: 'rubberBand',
                to: '1s'
            });
        }
    };
});
System.register("just-animate/animations/shake", [], function (exports_88, context_88) {
    "use strict";
    var __moduleName = context_88 && context_88.id;
    var shake;
    return {
        setters: [],
        execute: function () {
            exports_88("shake", shake = {
                css: [
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
                to: '1s',
                name: 'shake'
            });
        }
    };
});
System.register("just-animate/animations/slideInDown", [], function (exports_89, context_89) {
    "use strict";
    var __moduleName = context_89 && context_89.id;
    var slideInDown;
    return {
        setters: [],
        execute: function () {
            exports_89("slideInDown", slideInDown = {
                css: [
                    {
                        transform: 'translate3d(0, -100%, 0)',
                        visibility: 'hidden'
                    },
                    {
                        transform: 'translate3d(0, 0, 0)',
                        visibility: 'visible'
                    }
                ],
                to: '1s',
                name: 'slideInDown'
            });
        }
    };
});
System.register("just-animate/animations/slideInLeft", [], function (exports_90, context_90) {
    "use strict";
    var __moduleName = context_90 && context_90.id;
    var slideInLeft;
    return {
        setters: [],
        execute: function () {
            exports_90("slideInLeft", slideInLeft = {
                css: [
                    {
                        transform: 'translate3d(-100%, 0, 0)',
                        visibility: 'hidden'
                    },
                    {
                        transform: 'translate3d(0, 0, 0)',
                        visibility: 'visible'
                    }
                ],
                to: '1s',
                name: 'slideInLeft'
            });
        }
    };
});
System.register("just-animate/animations/slideInRight", [], function (exports_91, context_91) {
    "use strict";
    var __moduleName = context_91 && context_91.id;
    var slideInRight;
    return {
        setters: [],
        execute: function () {
            exports_91("slideInRight", slideInRight = {
                css: [
                    {
                        transform: 'translate3d(100%, 0, 0)',
                        visibility: 'hidden'
                    },
                    {
                        transform: 'translate3d(0, 0, 0)',
                        visibility: 'visible'
                    }
                ],
                to: '1s',
                name: 'slideInRight'
            });
        }
    };
});
System.register("just-animate/animations/slideInUp", [], function (exports_92, context_92) {
    "use strict";
    var __moduleName = context_92 && context_92.id;
    var slideInUp;
    return {
        setters: [],
        execute: function () {
            exports_92("slideInUp", slideInUp = {
                css: [
                    {
                        transform: 'translate3d(0, 100%, 0)',
                        visibility: 'hidden'
                    },
                    {
                        transform: 'translate3d(0, 0, 0)',
                        visibility: 'visible'
                    }
                ],
                to: '1s',
                name: 'slideInUp'
            });
        }
    };
});
System.register("just-animate/animations/slideOutDown", [], function (exports_93, context_93) {
    "use strict";
    var __moduleName = context_93 && context_93.id;
    var slideOutDown;
    return {
        setters: [],
        execute: function () {
            exports_93("slideOutDown", slideOutDown = {
                css: [
                    {
                        transform: 'translate3d(0, 0, 0)',
                        visibility: 'visible'
                    },
                    {
                        visibility: 'hidden',
                        transform: 'translate3d(0, 100%, 0)'
                    }
                ],
                to: '1s',
                name: 'slideOutDown'
            });
        }
    };
});
System.register("just-animate/animations/slideOutLeft", [], function (exports_94, context_94) {
    "use strict";
    var __moduleName = context_94 && context_94.id;
    var slideOutLeft;
    return {
        setters: [],
        execute: function () {
            exports_94("slideOutLeft", slideOutLeft = {
                css: [
                    {
                        visibility: 'visible',
                        transform: 'translate3d(0, 0, 0)'
                    },
                    {
                        visibility: 'hidden',
                        transform: 'translate3d(-100%, 0, 0)'
                    }
                ],
                to: '1s',
                name: 'slideOutLeft'
            });
        }
    };
});
System.register("just-animate/animations/slideOutRight", [], function (exports_95, context_95) {
    "use strict";
    var __moduleName = context_95 && context_95.id;
    var slideOutRight;
    return {
        setters: [],
        execute: function () {
            exports_95("slideOutRight", slideOutRight = {
                css: [
                    {
                        visibility: 'visible',
                        transform: 'translate3d(0, 0, 0)'
                    },
                    {
                        visibility: 'hidden',
                        transform: 'translate3d(100%, 0, 0)'
                    }
                ],
                to: '1s',
                name: 'slideOutRight'
            });
        }
    };
});
System.register("just-animate/animations/slideOutUp", [], function (exports_96, context_96) {
    "use strict";
    var __moduleName = context_96 && context_96.id;
    var slideOutUp;
    return {
        setters: [],
        execute: function () {
            exports_96("slideOutUp", slideOutUp = {
                css: [
                    {
                        visibility: 'visible',
                        transform: 'translate3d(0, 0, 0)'
                    },
                    {
                        visibility: 'hidden',
                        transform: 'translate3d(0, -100%, 0)'
                    }
                ],
                to: '1s',
                name: 'slideOutUp'
            });
        }
    };
});
System.register("just-animate/animations/swing", [], function (exports_97, context_97) {
    "use strict";
    var __moduleName = context_97 && context_97.id;
    var swing;
    return {
        setters: [],
        execute: function () {
            exports_97("swing", swing = {
                css: [
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
                to: '1s',
                name: 'swing'
            });
        }
    };
});
System.register("just-animate/animations/tada", [], function (exports_98, context_98) {
    "use strict";
    var __moduleName = context_98 && context_98.id;
    var tada;
    return {
        setters: [],
        execute: function () {
            exports_98("tada", tada = {
                css: [
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
                to: '1s',
                name: 'tada'
            });
        }
    };
});
System.register("just-animate/animations/wobble", [], function (exports_99, context_99) {
    "use strict";
    var __moduleName = context_99 && context_99.id;
    var wobble;
    return {
        setters: [],
        execute: function () {
            exports_99("wobble", wobble = {
                css: [
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
                to: '1s',
                name: 'wobble'
            });
        }
    };
});
System.register("just-animate/animations/zoomIn", [], function (exports_100, context_100) {
    "use strict";
    var __moduleName = context_100 && context_100.id;
    var zoomIn;
    return {
        setters: [],
        execute: function () {
            exports_100("zoomIn", zoomIn = {
                css: [
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
                to: '1s',
                easing: 'elegantSlowStartEnd',
                name: 'zoomIn'
            });
        }
    };
});
System.register("just-animate/animations/zoomInDown", [], function (exports_101, context_101) {
    "use strict";
    var __moduleName = context_101 && context_101.id;
    var zoomInDown;
    return {
        setters: [],
        execute: function () {
            exports_101("zoomInDown", zoomInDown = {
                css: [
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
                to: '1s',
                easing: 'easeInCubic',
                name: 'zoomInDown'
            });
        }
    };
});
System.register("just-animate/animations/zoomInLeft", [], function (exports_102, context_102) {
    "use strict";
    var __moduleName = context_102 && context_102.id;
    var zoomInLeft;
    return {
        setters: [],
        execute: function () {
            exports_102("zoomInLeft", zoomInLeft = {
                css: [
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
                to: '1s',
                easing: 'elegantSlowStartEnd',
                name: 'zoomInLeft'
            });
        }
    };
});
System.register("just-animate/animations/zoomInRight", [], function (exports_103, context_103) {
    "use strict";
    var __moduleName = context_103 && context_103.id;
    var zoomInRight;
    return {
        setters: [],
        execute: function () {
            exports_103("zoomInRight", zoomInRight = {
                css: [
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
                to: '1s',
                easing: 'elegantSlowStartEnd',
                name: 'zoomInRight'
            });
        }
    };
});
System.register("just-animate/animations/zoomInUp", [], function (exports_104, context_104) {
    "use strict";
    var __moduleName = context_104 && context_104.id;
    var zoomInUp;
    return {
        setters: [],
        execute: function () {
            exports_104("zoomInUp", zoomInUp = {
                css: [
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
                to: '1s',
                easing: 'elegantSlowStartEnd',
                name: 'zoomInUp'
            });
        }
    };
});
System.register("just-animate/animations/zoomOut", [], function (exports_105, context_105) {
    "use strict";
    var __moduleName = context_105 && context_105.id;
    var zoomOut;
    return {
        setters: [],
        execute: function () {
            exports_105("zoomOut", zoomOut = {
                css: [
                    {
                        opacity: 1,
                        transform: 'none',
                        transformOrigin: 'center middle'
                    },
                    {
                        opacity: 0,
                        transform: 'scale3d(.3, .3, .3)'
                    },
                    {
                        opacity: 0,
                        transform: 'none',
                        transformOrigin: 'center middle'
                    }
                ],
                to: '1s',
                easing: 'elegantSlowStartEnd',
                name: 'zoomOut'
            });
        }
    };
});
System.register("just-animate/animations/zoomOutDown", [], function (exports_106, context_106) {
    "use strict";
    var __moduleName = context_106 && context_106.id;
    var zoomOutDown;
    return {
        setters: [],
        execute: function () {
            exports_106("zoomOutDown", zoomOutDown = {
                css: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none',
                        transformOrigin: 'center bottom'
                    },
                    {
                        offset: 0.4,
                        opacity: 1,
                        transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)',
                        transformOrigin: 'center bottom'
                    },
                    {
                        offset: 1,
                        opacity: 0,
                        transform: 'scale3d(.1, .1, .1) translate3d(0, 2000px, 0)',
                        transformOrigin: 'center bottom'
                    }
                ],
                to: '1s',
                easing: 'elegantSlowStartEnd',
                name: 'zoomOutDown'
            });
        }
    };
});
System.register("just-animate/animations/zoomOutLeft", [], function (exports_107, context_107) {
    "use strict";
    var __moduleName = context_107 && context_107.id;
    var zoomOutLeft;
    return {
        setters: [],
        execute: function () {
            exports_107("zoomOutLeft", zoomOutLeft = {
                css: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none',
                        transformOrigin: 'left center'
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
                        transformOrigin: 'left center'
                    }
                ],
                to: '1s',
                easing: 'elegantSlowStartEnd',
                name: 'zoomOutLeft'
            });
        }
    };
});
System.register("just-animate/animations/zoomOutRight", [], function (exports_108, context_108) {
    "use strict";
    var __moduleName = context_108 && context_108.id;
    var zoomOutRight;
    return {
        setters: [],
        execute: function () {
            exports_108("zoomOutRight", zoomOutRight = {
                css: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none',
                        transformOrigin: 'right center'
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
                        transformOrigin: 'right center'
                    }
                ],
                to: '1s',
                easing: 'elegantSlowStartEnd',
                name: 'zoomOutRight'
            });
        }
    };
});
System.register("just-animate/animations/zoomOutUp", [], function (exports_109, context_109) {
    "use strict";
    var __moduleName = context_109 && context_109.id;
    var zoomOutUp;
    return {
        setters: [],
        execute: function () {
            exports_109("zoomOutUp", zoomOutUp = {
                css: [
                    {
                        offset: 0,
                        opacity: 1,
                        transform: 'none',
                        transformOrigin: 'center bottom'
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
                        transformOrigin: 'center bottom'
                    }
                ],
                to: '1s',
                easing: 'elegantSlowStartEnd',
                name: 'zoomOutUp'
            });
        }
    };
});
System.register("just-animate/animations/index", ["just-animate/animations/bounce", "just-animate/animations/bounceIn", "just-animate/animations/bounceInDown", "just-animate/animations/bounceInLeft", "just-animate/animations/bounceInRight", "just-animate/animations/bounceInUp", "just-animate/animations/bounceOut", "just-animate/animations/bounceOutDown", "just-animate/animations/bounceOutLeft", "just-animate/animations/bounceOutRight", "just-animate/animations/bounceOutUp", "just-animate/animations/fadeIn", "just-animate/animations/fadeInDown", "just-animate/animations/fadeInDownBig", "just-animate/animations/fadeInLeft", "just-animate/animations/fadeInLeftBig", "just-animate/animations/fadeInRight", "just-animate/animations/fadeInRightBig", "just-animate/animations/fadeInUp", "just-animate/animations/fadeInUpBig", "just-animate/animations/fadeOut", "just-animate/animations/fadeOutDown", "just-animate/animations/fadeOutDownBig", "just-animate/animations/fadeOutLeft", "just-animate/animations/fadeOutLeftBig", "just-animate/animations/fadeOutRight", "just-animate/animations/fadeOutRightBig", "just-animate/animations/fadeOutUp", "just-animate/animations/fadeOutUpBig", "just-animate/animations/flash", "just-animate/animations/flip", "just-animate/animations/flipInX", "just-animate/animations/flipInY", "just-animate/animations/flipOutX", "just-animate/animations/flipOutY", "just-animate/animations/headShake", "just-animate/animations/hinge", "just-animate/animations/jello", "just-animate/animations/lightSpeedIn", "just-animate/animations/lightSpeedOut", "just-animate/animations/pulse", "just-animate/animations/rollIn", "just-animate/animations/rollOut", "just-animate/animations/rotateIn", "just-animate/animations/rotateInDownLeft", "just-animate/animations/rotateInDownRight", "just-animate/animations/rotateInUpLeft", "just-animate/animations/rotateInUpRight", "just-animate/animations/rotateOut", "just-animate/animations/rotateOutDownLeft", "just-animate/animations/rotateOutDownRight", "just-animate/animations/rotateOutUpLeft", "just-animate/animations/rotateOutUpRight", "just-animate/animations/rubberBand", "just-animate/animations/shake", "just-animate/animations/slideInDown", "just-animate/animations/slideInLeft", "just-animate/animations/slideInRight", "just-animate/animations/slideInUp", "just-animate/animations/slideOutDown", "just-animate/animations/slideOutLeft", "just-animate/animations/slideOutRight", "just-animate/animations/slideOutUp", "just-animate/animations/swing", "just-animate/animations/tada", "just-animate/animations/wobble", "just-animate/animations/zoomIn", "just-animate/animations/zoomInDown", "just-animate/animations/zoomInLeft", "just-animate/animations/zoomInRight", "just-animate/animations/zoomInUp", "just-animate/animations/zoomOut", "just-animate/animations/zoomOutDown", "just-animate/animations/zoomOutLeft", "just-animate/animations/zoomOutRight", "just-animate/animations/zoomOutUp"], function (exports_110, context_110) {
    "use strict";
    var __moduleName = context_110 && context_110.id;
    function exportStar_6(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_110(exports);
    }
    return {
        setters: [
            function (bounce_1_1) {
                exportStar_6(bounce_1_1);
            },
            function (bounceIn_1_1) {
                exportStar_6(bounceIn_1_1);
            },
            function (bounceInDown_1_1) {
                exportStar_6(bounceInDown_1_1);
            },
            function (bounceInLeft_1_1) {
                exportStar_6(bounceInLeft_1_1);
            },
            function (bounceInRight_1_1) {
                exportStar_6(bounceInRight_1_1);
            },
            function (bounceInUp_1_1) {
                exportStar_6(bounceInUp_1_1);
            },
            function (bounceOut_1_1) {
                exportStar_6(bounceOut_1_1);
            },
            function (bounceOutDown_1_1) {
                exportStar_6(bounceOutDown_1_1);
            },
            function (bounceOutLeft_1_1) {
                exportStar_6(bounceOutLeft_1_1);
            },
            function (bounceOutRight_1_1) {
                exportStar_6(bounceOutRight_1_1);
            },
            function (bounceOutUp_1_1) {
                exportStar_6(bounceOutUp_1_1);
            },
            function (fadeIn_1_1) {
                exportStar_6(fadeIn_1_1);
            },
            function (fadeInDown_1_1) {
                exportStar_6(fadeInDown_1_1);
            },
            function (fadeInDownBig_1_1) {
                exportStar_6(fadeInDownBig_1_1);
            },
            function (fadeInLeft_1_1) {
                exportStar_6(fadeInLeft_1_1);
            },
            function (fadeInLeftBig_1_1) {
                exportStar_6(fadeInLeftBig_1_1);
            },
            function (fadeInRight_1_1) {
                exportStar_6(fadeInRight_1_1);
            },
            function (fadeInRightBig_1_1) {
                exportStar_6(fadeInRightBig_1_1);
            },
            function (fadeInUp_1_1) {
                exportStar_6(fadeInUp_1_1);
            },
            function (fadeInUpBig_1_1) {
                exportStar_6(fadeInUpBig_1_1);
            },
            function (fadeOut_1_1) {
                exportStar_6(fadeOut_1_1);
            },
            function (fadeOutDown_1_1) {
                exportStar_6(fadeOutDown_1_1);
            },
            function (fadeOutDownBig_1_1) {
                exportStar_6(fadeOutDownBig_1_1);
            },
            function (fadeOutLeft_1_1) {
                exportStar_6(fadeOutLeft_1_1);
            },
            function (fadeOutLeftBig_1_1) {
                exportStar_6(fadeOutLeftBig_1_1);
            },
            function (fadeOutRight_1_1) {
                exportStar_6(fadeOutRight_1_1);
            },
            function (fadeOutRightBig_1_1) {
                exportStar_6(fadeOutRightBig_1_1);
            },
            function (fadeOutUp_1_1) {
                exportStar_6(fadeOutUp_1_1);
            },
            function (fadeOutUpBig_1_1) {
                exportStar_6(fadeOutUpBig_1_1);
            },
            function (flash_1_1) {
                exportStar_6(flash_1_1);
            },
            function (flip_1_1) {
                exportStar_6(flip_1_1);
            },
            function (flipInX_1_1) {
                exportStar_6(flipInX_1_1);
            },
            function (flipInY_1_1) {
                exportStar_6(flipInY_1_1);
            },
            function (flipOutX_1_1) {
                exportStar_6(flipOutX_1_1);
            },
            function (flipOutY_1_1) {
                exportStar_6(flipOutY_1_1);
            },
            function (headShake_1_1) {
                exportStar_6(headShake_1_1);
            },
            function (hinge_1_1) {
                exportStar_6(hinge_1_1);
            },
            function (jello_1_1) {
                exportStar_6(jello_1_1);
            },
            function (lightSpeedIn_1_1) {
                exportStar_6(lightSpeedIn_1_1);
            },
            function (lightSpeedOut_1_1) {
                exportStar_6(lightSpeedOut_1_1);
            },
            function (pulse_1_1) {
                exportStar_6(pulse_1_1);
            },
            function (rollIn_1_1) {
                exportStar_6(rollIn_1_1);
            },
            function (rollOut_1_1) {
                exportStar_6(rollOut_1_1);
            },
            function (rotateIn_1_1) {
                exportStar_6(rotateIn_1_1);
            },
            function (rotateInDownLeft_1_1) {
                exportStar_6(rotateInDownLeft_1_1);
            },
            function (rotateInDownRight_1_1) {
                exportStar_6(rotateInDownRight_1_1);
            },
            function (rotateInUpLeft_1_1) {
                exportStar_6(rotateInUpLeft_1_1);
            },
            function (rotateInUpRight_1_1) {
                exportStar_6(rotateInUpRight_1_1);
            },
            function (rotateOut_1_1) {
                exportStar_6(rotateOut_1_1);
            },
            function (rotateOutDownLeft_1_1) {
                exportStar_6(rotateOutDownLeft_1_1);
            },
            function (rotateOutDownRight_1_1) {
                exportStar_6(rotateOutDownRight_1_1);
            },
            function (rotateOutUpLeft_1_1) {
                exportStar_6(rotateOutUpLeft_1_1);
            },
            function (rotateOutUpRight_1_1) {
                exportStar_6(rotateOutUpRight_1_1);
            },
            function (rubberBand_1_1) {
                exportStar_6(rubberBand_1_1);
            },
            function (shake_1_1) {
                exportStar_6(shake_1_1);
            },
            function (slideInDown_1_1) {
                exportStar_6(slideInDown_1_1);
            },
            function (slideInLeft_1_1) {
                exportStar_6(slideInLeft_1_1);
            },
            function (slideInRight_1_1) {
                exportStar_6(slideInRight_1_1);
            },
            function (slideInUp_1_1) {
                exportStar_6(slideInUp_1_1);
            },
            function (slideOutDown_1_1) {
                exportStar_6(slideOutDown_1_1);
            },
            function (slideOutLeft_1_1) {
                exportStar_6(slideOutLeft_1_1);
            },
            function (slideOutRight_1_1) {
                exportStar_6(slideOutRight_1_1);
            },
            function (slideOutUp_1_1) {
                exportStar_6(slideOutUp_1_1);
            },
            function (swing_1_1) {
                exportStar_6(swing_1_1);
            },
            function (tada_1_1) {
                exportStar_6(tada_1_1);
            },
            function (wobble_1_1) {
                exportStar_6(wobble_1_1);
            },
            function (zoomIn_1_1) {
                exportStar_6(zoomIn_1_1);
            },
            function (zoomInDown_1_1) {
                exportStar_6(zoomInDown_1_1);
            },
            function (zoomInLeft_1_1) {
                exportStar_6(zoomInLeft_1_1);
            },
            function (zoomInRight_1_1) {
                exportStar_6(zoomInRight_1_1);
            },
            function (zoomInUp_1_1) {
                exportStar_6(zoomInUp_1_1);
            },
            function (zoomOut_1_1) {
                exportStar_6(zoomOut_1_1);
            },
            function (zoomOutDown_1_1) {
                exportStar_6(zoomOutDown_1_1);
            },
            function (zoomOutLeft_1_1) {
                exportStar_6(zoomOutLeft_1_1);
            },
            function (zoomOutRight_1_1) {
                exportStar_6(zoomOutRight_1_1);
            },
            function (zoomOutUp_1_1) {
                exportStar_6(zoomOutUp_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("just-animate/just-animate-all", ["just-animate/animations/index", "just-animate/animate"], function (exports_111, context_111) {
    "use strict";
    var __moduleName = context_111 && context_111.id;
    var animations, animate_1;
    return {
        setters: [
            function (animations_1) {
                animations = animations_1;
            },
            function (animate_1_1) {
                animate_1 = animate_1_1;
            }
        ],
        execute: function () {
            exports_111("animations", animations);
            animate_1.animate.register.apply(undefined, Object.keys(animations).map(function (k) { return animations[k]; }));
        }
    };
});
System.register("just-animate/just-animate-vue", ["just-animate/common/index"], function (exports_112, context_112) {
    "use strict";
    var __moduleName = context_112 && context_112.id;
    var common_11, animateVue;
    return {
        setters: [
            function (common_11_1) {
                common_11 = common_11_1;
            }
        ],
        execute: function () {
            animateVue = {
                install: function (vue) {
                    vue.directive('animate', {
                        bind: function (el, binding) {
                            var events = binding['value'];
                            var eventListeners = [];
                            var player;
                            var _loop_1 = function (e) {
                                var eventName = e;
                                var options = events[eventName];
                                if (typeof options === 'string') {
                                    options = {
                                        mixins: options,
                                        fill: 'both'
                                    };
                                }
                                var eventListener = function (event) {
                                    if (player) {
                                        player.cancel();
                                    }
                                    var animationOptions = common_11.deepCopyObject(options);
                                    animationOptions.targets = event.target;
                                    player = just.animate(animationOptions);
                                };
                                eventListeners.push({
                                    eventName: eventName,
                                    eventListener: eventListener
                                });
                                el.addEventListener(eventName, eventListener);
                            };
                            for (var e in events) {
                                _loop_1(e);
                            }
                            el['jaListeners'] = eventListeners;
                        },
                        unbind: function (el) {
                            for (var _i = 0, _a = el['jaListeners']; _i < _a.length; _i++) {
                                var listener = _a[_i];
                                el.removeEventListener(listener.eventName, listener.eventListener);
                            }
                        }
                    });
                }
            };
            window.just.AnimateVue = animateVue;
        }
    };
});
System.register("just-animate/main", ["just-animate/animations/index", "just-animate/animate"], function (exports_113, context_113) {
    "use strict";
    var __moduleName = context_113 && context_113.id;
    var animations, animate_2;
    return {
        setters: [
            function (animations_2) {
                animations = animations_2;
            },
            function (animate_2_1) {
                animate_2 = animate_2_1;
            }
        ],
        execute: function () {
            exports_113("animations", animations);
            animate_2.animate.register.apply(undefined, Object.keys(animations).map(function (k) { return animations[k]; }));
        }
    };
});
System.register("tests/common/elements", ["chai", "just-animate/common/index"], function (exports_114, context_114) {
    "use strict";
    var __moduleName = context_114 && context_114.id;
    var chai, assert, jsdom, common_12;
    return {
        setters: [
            function (chai_1) {
                chai = chai_1;
            },
            function (common_12_1) {
                common_12 = common_12_1;
            }
        ],
        execute: function () {
            assert = chai.assert;
            jsdom = require('mocha-jsdom');
            describe('elements', function () {
                jsdom();
                describe('getTargets()', function () {
                    it('resolves element as element[]', function () {
                        var element = document.createElement('div');
                        assert.equal(1, common_12.getTargets(element).length);
                    });
                    it('resolves elements by selector', function () {
                        var parent = document.createElement('div');
                        parent.id = 'elementBySelector';
                        document.body.appendChild(parent);
                        for (var i = 0; i < 20; i++) {
                            var child = document.createElement('span');
                            child.classList.add('child');
                            parent.appendChild(child);
                        }
                        assert.equal(20, common_12.getTargets('#elementBySelector .child').length);
                        document.body.removeChild(parent);
                    });
                    it('resolves a NodeList or Element[]', function () {
                        var parent = document.createElement('div');
                        parent.id = 'elementBySelector';
                        document.body.appendChild(parent);
                        for (var i = 0; i < 20; i++) {
                            var child = document.createElement('span');
                            child.classList.add('child');
                            parent.appendChild(child);
                        }
                        assert.equal(20, common_12.getTargets(document.querySelectorAll('#elementBySelector .child')).length);
                        document.body.removeChild(parent);
                    });
                    it('resolves an element from a function', function () {
                        var targets = function () {
                            return document.createElement('i');
                        };
                        assert.equal(1, common_12.getTargets(targets).length);
                    });
                    it('flattens element list', function () {
                        var targets = [
                            document.createElement('i'),
                            [
                                document.createElement('i'),
                                document.createElement('i'),
                                [
                                    document.createElement('i'),
                                    document.createElement('i'),
                                    document.createElement('i')
                                ]
                            ]
                        ];
                        assert.equal(6, common_12.getTargets(targets).length);
                    });
                    it('handles general ridiculousness', function () {
                        var byIdElement = document.createElement('div');
                        byIdElement.id = 'byId';
                        document.body.appendChild(byIdElement);
                        var byId2Element = document.createElement('div');
                        byId2Element.id = 'byId2';
                        document.body.appendChild(byId2Element);
                        var byId3Element = document.createElement('div');
                        byId3Element.id = 'byId3';
                        document.body.appendChild(byId3Element);
                        var targets = function () {
                            return [
                                byId2Element,
                                '#byId2',
                                document.createElement('i'),
                                document.querySelectorAll('#byId3')
                            ];
                        };
                        assert.equal(4, common_12.getTargets(targets).length);
                    });
                });
                describe('splitText()', function () {
                    it('splits innerText characters into individual divs', function () {
                        var element = document.createElement('h2');
                        element.innerHTML = 'Hello World!';
                        var letters = common_12.splitText(element).characters;
                        assert(letters.length === 11, 'Wrong number of elements');
                        assert(letters[0].textContent === 'H');
                        assert(letters[1].textContent === 'e');
                        assert(letters[2].textContent === 'l');
                        assert(letters[3].textContent === 'l');
                        assert(letters[4].textContent === 'o');
                        assert(letters[5].textContent === 'W');
                        assert(letters[6].textContent === 'o');
                        assert(letters[7].textContent === 'r');
                        assert(letters[8].textContent === 'l');
                        assert(letters[9].textContent === 'd');
                        assert(letters[10].textContent === '!');
                    });
                    it('it removes double spaces and newlines', function () {
                        var element = document.createElement('h2');
                        element.innerHTML = 's  \n\ts';
                        var letters = common_12.splitText(element).characters;
                        console.log(letters.length);
                        assert(letters.length === 2, 'Wrong number of elements');
                        assert(letters[0].textContent = 's');
                        assert(letters[1].textContent = 's');
                    });
                    it('it removes whitespace before and after', function () {
                        var element = document.createElement('h2');
                        element.innerHTML = '  t  ';
                        var letters = common_12.splitText(element).characters;
                        assert(letters.length === 1, 'Wrong number of elements');
                        assert(letters[0].textContent = 't');
                    });
                    it('splits words by space and removes empty parts', function () {
                        var element = document.createElement('h2');
                        element.innerHTML = 'Hello  World!';
                        var words = common_12.splitText(element).words;
                        assert(words.length === 2);
                        assert(words[0].textContent === 'Hello');
                        assert(words[1].textContent === 'World!');
                    });
                    it('splits words and trims words', function () {
                        var element = document.createElement('h2');
                        element.innerHTML = '   Hello! ';
                        var words = common_12.splitText(element).words;
                        assert(words.length === 1);
                        assert(words[0].textContent === 'Hello!');
                    });
                    it('splits words and trims words', function () {
                        var element = document.createElement('h2');
                        element.innerHTML = '   Hello! ';
                        var words = common_12.splitText(element).words;
                        assert(words.length === 1);
                        assert(words[0].textContent === 'Hello!');
                    });
                    it('returns the same words and elements if splitText is called twice on the same element', function () {
                        var element = document.createElement('h2');
                        element.innerHTML = 'H W';
                        var result1 = common_12.splitText(element);
                        var result2 = common_12.splitText(element);
                        assert(result1.characters.length === result2.characters.length);
                        assert(result1.characters[0].textContent === result2.characters[0].textContent);
                        assert(result1.characters[1].textContent === result2.characters[1].textContent);
                    });
                });
            });
        }
    };
});
System.register("tests/common/lists", ["chai", "just-animate/common/index"], function (exports_115, context_115) {
    "use strict";
    var __moduleName = context_115 && context_115.id;
    var chai, expect, assert, common_13;
    return {
        setters: [
            function (chai_2) {
                chai = chai_2;
            },
            function (common_13_1) {
                common_13 = common_13_1;
            }
        ],
        execute: function () {
            expect = chai.expect;
            assert = chai.assert;
            describe('lists', function () {
                describe('head()', function () {
                    it('should return undefined if array is empty', function () {
                        assert.equal(undefined, common_13.head([]));
                    });
                    it('should return the first item if array is not empty', function () {
                        assert.equal('1', common_13.head(['1']));
                    });
                });
                describe('tail()', function () {
                    it('should return undefined if array is empty', function () {
                        assert.equal(undefined, common_13.tail([]));
                    });
                    it('should return the last item if array is not empty', function () {
                        assert.equal('1', common_13.tail(['0', '1']));
                    });
                });
                describe('toArray()', function () {
                    it('returns an array from an array like structure', function () {
                        expect(common_13.toArray({ length: 0 })).to.deep.equal([]);
                    });
                });
                describe('chain', function () {
                    it('wraps an existing object in an array', function () {
                        var input = { x: 2 };
                        var result = common_13.chain(input);
                        expect(result[0]).to.equal(input);
                    });
                    it('wraps an existing string in an array', function () {
                        var input = 'a string';
                        var result = common_13.chain(input);
                        expect(result[0]).to.equal(input);
                    });
                    it('returns an array back if passed an array', function () {
                        var input = [1, 2, 3];
                        var result = common_13.chain(input);
                        expect(result).to.equal(input);
                    });
                });
            });
        }
    };
});
System.register("tests/common/objects", ["chai", "just-animate/common/index"], function (exports_116, context_116) {
    "use strict";
    var __moduleName = context_116 && context_116.id;
    var chai, expect, assert, common_14;
    return {
        setters: [
            function (chai_3) {
                chai = chai_3;
            },
            function (common_14_1) {
                common_14 = common_14_1;
            }
        ],
        execute: function () {
            expect = chai.expect;
            assert = chai.assert;
            describe('objects', function () {
                describe('resolve', function () {
                    it('returns the same value when a non-function', function () {
                        var initial = 5;
                        var result = common_14.resolve(initial, {});
                        expect(result).to.equal(initial);
                    });
                    it('returns the result of a function otherwise', function () {
                        var target = {};
                        var context = {
                            index: 2,
                            target: target,
                            targets: [undefined, undefined, target]
                        };
                        var initial = function (ctx) { return ctx.index * 100; };
                        var result = common_14.resolve(initial, context);
                        expect(result).to.equal(200);
                    });
                });
                describe('deepCopyObject', function () {
                    it('combines combines {x:1} and {y:2} into {x:1,y;2}', function () {
                        var first = { x: 1 };
                        var second = { y: 2 };
                        var result = common_14.deepCopyObject(first);
                        result = common_14.deepCopyObject(second, result);
                        expect(result).to.deep.equal({ x: 1, y: 2 });
                    });
                    it('creates a copy of the object', function () {
                        var testData = { x: 1 };
                        var result = common_14.deepCopyObject(testData);
                        expect(result).to.not.equal(testData);
                    });
                    it('creates a copy of all objects in properties of objects', function () {
                        var level3 = { z: 1 };
                        var level2 = { y: level3 };
                        var level1 = { x: level2 };
                        var result = common_14.deepCopyObject(level1);
                        expect(result).to.deep.equal(level1);
                        assert.isTrue(result.x.y !== level3);
                    });
                    it('creates a copy of an array inside a property', function () {
                        var steps = [3, 2, 1, 'ignition!'];
                        var countdown = { steps: steps };
                        var result = common_14.deepCopyObject(countdown);
                        expect(result).to.deep.equal(countdown);
                        expect(result.countdown).to.not.equal(steps);
                    });
                });
            });
        }
    };
});
System.register("tests/common/random", ["chai", "just-animate/common/index"], function (exports_117, context_117) {
    "use strict";
    var __moduleName = context_117 && context_117.id;
    var chai, assert, jsdom, common_15;
    return {
        setters: [
            function (chai_4) {
                chai = chai_4;
            },
            function (common_15_1) {
                common_15 = common_15_1;
            }
        ],
        execute: function () {
            assert = chai.assert;
            jsdom = require('mocha-jsdom');
            describe('random', function () {
                describe('random()', function () {
                    jsdom();
                    it('returns a number between start and end', function () {
                        var result = common_15.random(0, 100);
                        assert.isBelow(result, 100);
                        assert.isAbove(result, -1);
                    });
                    it('returns the number as a unit', function () {
                        var result = common_15.random(1, 2, 'px', true);
                        assert.isTrue(result === '1px');
                    });
                });
            });
        }
    };
});
System.register("tests/common/strings", ["chai", "just-animate/common/index"], function (exports_118, context_118) {
    "use strict";
    var __moduleName = context_118 && context_118.id;
    var chai, assert, common_16;
    return {
        setters: [
            function (chai_5) {
                chai = chai_5;
            },
            function (common_16_1) {
                common_16 = common_16_1;
            }
        ],
        execute: function () {
            assert = chai.assert;
            describe('strings', function () {
                describe('hyphenatedToCamelCase()', function () {
                    it('returns undefined if not a string', function () {
                        assert.equal('', common_16.toCamelCase(undefined));
                        assert.equal('', common_16.toCamelCase({}));
                        assert.equal('', common_16.toCamelCase([]));
                    });
                    it('returns the original if no changes are needed ', function () {
                        assert.equal('color', common_16.toCamelCase('color'));
                    });
                    it('converts single hyphenated words to camelcase', function () {
                        assert.equal('backgroundColor', common_16.toCamelCase('background-color'));
                    });
                    it('converts multiple hyphenated words to camelcase', function () {
                        assert.equal('borderLeftWidth', common_16.toCamelCase('border-left-width'));
                    });
                    it('converts strings with spaces to camelcase', function () {
                        assert.equal('somethingWithSpaces', common_16.toCamelCase('something with spaces'));
                    });
                });
            });
        }
    };
});
System.register("tests/common/type", ["chai", "just-animate/common/index"], function (exports_119, context_119) {
    "use strict";
    var __moduleName = context_119 && context_119.id;
    var chai, assert, common_17;
    return {
        setters: [
            function (chai_6) {
                chai = chai_6;
            },
            function (common_17_1) {
                common_17 = common_17_1;
            }
        ],
        execute: function () {
            assert = chai.assert;
            describe('type', function () {
                describe('isArray()', function () {
                    it('returns true when an array is passed', function () {
                        assert.equal(true, common_17.isArray([]));
                    });
                    it('returns true when an array-like object is passed', function () {
                        assert.equal(true, common_17.isArray({
                            length: 0
                        }));
                    });
                    it('returns false when a normal object is passed', function () {
                        assert.equal(false, common_17.isArray({}));
                    });
                });
                describe('isDefined()', function () {
                    it('returns false when undefined', function () {
                        assert.equal(false, common_17.isDefined(undefined));
                        assert.equal(false, common_17.isDefined(''));
                    });
                    it('returns true when defined', function () {
                        assert.equal(true, common_17.isDefined(' '));
                        assert.equal(true, common_17.isDefined(0));
                        assert.equal(true, common_17.isDefined(1));
                        assert.equal(true, common_17.isDefined([]));
                        assert.equal(true, common_17.isDefined({}));
                        assert.equal(true, common_17.isDefined(false));
                        assert.equal(true, common_17.isDefined(true));
                    });
                });
                describe('isFunction()', function () {
                    it('returns true when a function', function () {
                        assert.equal(true, common_17.isFunction(function () { }));
                    });
                    it('returns true when a function', function () {
                        var s = (function () {
                            function class_1() {
                            }
                            class_1.prototype.methodTwo = function () { };
                            return class_1;
                        }());
                        assert.equal(true, common_17.isFunction(s));
                        assert.equal(true, common_17.isFunction(new s().methodTwo));
                    });
                    it('returns false when not a function', function () {
                        assert.equal(false, common_17.isFunction(' '));
                        assert.equal(false, common_17.isFunction(0));
                        assert.equal(false, common_17.isFunction(1));
                        assert.equal(false, common_17.isFunction([]));
                        assert.equal(false, common_17.isFunction({}));
                        assert.equal(false, common_17.isFunction(false));
                        assert.equal(false, common_17.isFunction(true));
                    });
                });
                describe('isNumber()', function () {
                    it('returns true when a number', function () {
                        assert.equal(true, common_17.isNumber(1));
                    });
                    it('returns false when not a number', function () {
                        assert.equal(false, common_17.isNumber('1'));
                    });
                });
                describe('isString()', function () {
                    it('returns true when a string', function () {
                        assert.equal(true, common_17.isString(''));
                    });
                    it('returns false when not a string', function () {
                        assert.equal(false, common_17.isString(null));
                    });
                });
            });
        }
    };
});
System.register("tests/common/units", ["chai", "just-animate/common/index"], function (exports_120, context_120) {
    "use strict";
    var __moduleName = context_120 && context_120.id;
    var chai, expect, assert, common_18;
    return {
        setters: [
            function (chai_7) {
                chai = chai_7;
            },
            function (common_18_1) {
                common_18 = common_18_1;
            }
        ],
        execute: function () {
            expect = chai.expect;
            assert = chai.assert;
            describe('parseUnit', function () {
                describe('parseUnit()', function () {
                    it('returns undefined when passed undefined', function () {
                        var result = common_18.parseUnit(undefined);
                        assert.equal(undefined, result.unit);
                        assert.equal(undefined, result.value);
                    });
                    it('returns undefined when passed ""', function () {
                        var result = common_18.parseUnit('');
                        assert.equal(undefined, result.unit);
                        assert.equal(undefined, result.value);
                    });
                    it('returns 2.2px when passed 2.2', function () {
                        var result = common_18.parseUnit(2.2);
                        assert.equal(2.2, result.value);
                        assert.equal(undefined, result.unit);
                    });
                    it('returns -2.2px when passed -2.2', function () {
                        var result = common_18.parseUnit(-2.2);
                        assert.equal(-2.2, result.value);
                        assert.equal(undefined, result.unit);
                    });
                    it('returns 2.2em when passed "2.2em"', function () {
                        var result = common_18.parseUnit('2.2em');
                        assert.equal(2.2, result.value);
                        assert.equal('em', result.unit);
                    });
                    it('returns -2.2em when passed "-2.2em"', function () {
                        var result = common_18.parseUnit('-2.2em');
                        assert.equal(-2.2, result.value);
                        assert.equal('em', result.unit);
                    });
                    it('returns 2.2ex when passed "2.2ex"', function () {
                        var result = common_18.parseUnit('2.2ex');
                        assert.equal(2.2, result.value);
                        assert.equal('ex', result.unit);
                    });
                    it('returns -2.2ex when passed "-2.2ex"', function () {
                        var result = common_18.parseUnit('-2.2ex');
                        assert.equal(-2.2, result.value);
                        assert.equal('ex', result.unit);
                    });
                    it('returns 2.2ch when passed "2.2ch"', function () {
                        var result = common_18.parseUnit('2.2ch');
                        assert.equal(2.2, result.value);
                        assert.equal('ch', result.unit);
                    });
                    it('returns -2.2ch when passed "-2.2ch"', function () {
                        var result = common_18.parseUnit('-2.2ch');
                        assert.equal(-2.2, result.value);
                        assert.equal('ch', result.unit);
                    });
                    it('returns 2.2rem when passed "2.2rem"', function () {
                        var result = common_18.parseUnit('2.2rem');
                        assert.equal(2.2, result.value);
                        assert.equal('rem', result.unit);
                    });
                    it('returns -2.2rem when passed "-2.2rem"', function () {
                        var result = common_18.parseUnit('-2.2rem');
                        assert.equal(-2.2, result.value);
                        assert.equal('rem', result.unit);
                    });
                    it('returns 2.2vh when passed "2.2vh"', function () {
                        var result = common_18.parseUnit('2.2vh');
                        assert.equal(2.2, result.value);
                        assert.equal('vh', result.unit);
                    });
                    it('returns -2.2vh when passed "-2.2vh"', function () {
                        var result = common_18.parseUnit('-2.2vh');
                        assert.equal(-2.2, result.value);
                        assert.equal('vh', result.unit);
                    });
                    it('returns 2.2vw when passed "2.2vw"', function () {
                        var result = common_18.parseUnit('2.2vw');
                        assert.equal(2.2, result.value);
                        assert.equal('vw', result.unit);
                    });
                    it('returns -2.2vw when passed "-2.2vw"', function () {
                        var result = common_18.parseUnit('-2.2vw');
                        assert.equal(-2.2, result.value);
                        assert.equal('vw', result.unit);
                    });
                    it('returns 2.2px when passed "2.2px"', function () {
                        var result = common_18.parseUnit('2.2px');
                        assert.equal(2.2, result.value);
                        assert.equal('px', result.unit);
                    });
                    it('returns -2.2px when passed "-2.2px"', function () {
                        var result = common_18.parseUnit('-2.2px');
                        assert.equal(-2.2, result.value);
                        assert.equal('px', result.unit);
                    });
                    it('returns 2.2mm when passed "2.2mm"', function () {
                        var result = common_18.parseUnit('2.2mm');
                        assert.equal(2.2, result.value);
                        assert.equal('mm', result.unit);
                    });
                    it('returns -2.2mm when passed "-2.2mm"', function () {
                        var result = common_18.parseUnit('-2.2mm');
                        assert.equal(-2.2, result.value);
                        assert.equal('mm', result.unit);
                    });
                    it('returns 2.2q when passed "2.2q"', function () {
                        var result = common_18.parseUnit('2.2q');
                        assert.equal(2.2, result.value);
                        assert.equal('q', result.unit);
                    });
                    it('returns -2.2q when passed "-2.2q"', function () {
                        var result = common_18.parseUnit('-2.2q');
                        assert.equal(-2.2, result.value);
                        assert.equal('q', result.unit);
                    });
                    it('returns 2.2cm when passed "2.2cm"', function () {
                        var result = common_18.parseUnit('2.2cm');
                        assert.equal(2.2, result.value);
                        assert.equal('cm', result.unit);
                    });
                    it('returns -2.2cm when passed "-2.2cm"', function () {
                        var result = common_18.parseUnit('-2.2cm');
                        assert.equal(-2.2, result.value);
                        assert.equal('cm', result.unit);
                    });
                    it('returns 2.2in when passed "2.2in"', function () {
                        var result = common_18.parseUnit('2.2in');
                        assert.equal(2.2, result.value);
                        assert.equal('in', result.unit);
                    });
                    it('returns -2.2in when passed "-2.2in"', function () {
                        var result = common_18.parseUnit('-2.2in');
                        assert.equal(-2.2, result.value);
                        assert.equal('in', result.unit);
                    });
                    it('returns 2.2pt when passed "2.2pt"', function () {
                        var result = common_18.parseUnit('2.2pt');
                        assert.equal(2.2, result.value);
                        assert.equal('pt', result.unit);
                    });
                    it('returns -2.2pt when passed "-2.2pt"', function () {
                        var result = common_18.parseUnit('-2.2pt');
                        assert.equal(-2.2, result.value);
                        assert.equal('pt', result.unit);
                    });
                    it('returns 2.2pc when passed "2.2pc"', function () {
                        var result = common_18.parseUnit('2.2pc');
                        assert.equal(2.2, result.value);
                        assert.equal('pc', result.unit);
                    });
                    it('returns -2.2pc when passed "-2.2pc"', function () {
                        var result = common_18.parseUnit('-2.2pc');
                        assert.equal(-2.2, result.value);
                        assert.equal('pc', result.unit);
                    });
                    it('returns 2.2% when passed "2.2%"', function () {
                        var result = common_18.parseUnit('2.2%');
                        assert.equal(2.2, result.value);
                        assert.equal('%', result.unit);
                    });
                    it('returns -2.2% when passed "-2.2%"', function () {
                        var result = common_18.parseUnit('-2.2%');
                        assert.equal(-2.2, result.value);
                        assert.equal('%', result.unit);
                    });
                    it('returns 100% when passed "100%"', function () {
                        var result = common_18.parseUnit('100%');
                        assert.equal(100, result.value);
                        assert.equal('%', result.unit);
                    });
                    it('returns -100% when passed -100', function () {
                        var result = common_18.parseUnit(-100);
                        assert.equal(-100, result.value);
                        assert.equal(undefined, result.unit);
                    });
                    it('returns -100% when passed "-100"', function () {
                        var result = common_18.parseUnit('-100');
                        assert.equal(-100, result.value);
                        assert.equal(undefined, result.unit);
                    });
                    it('returns -100% when passed "-100%"', function () {
                        var result = common_18.parseUnit('-100%');
                        assert.equal(-100, result.value);
                        assert.equal('%', result.unit);
                    });
                });
                describe('createUnitResolver()', function () {
                    it('returns 1s when passed 1s', function () {
                        var resolver = common_18.createUnitResolver('1s');
                        expect({ unit: 's', value: 1 }).to.deep.equal(resolver(0));
                        expect({ unit: 's', value: 1 }).to.deep.equal(resolver(1));
                        expect({ unit: 's', value: 1 }).to.deep.equal(resolver(2));
                    });
                    it('returns x += 1.1 when passed += 1.1', function () {
                        var resolver = common_18.createUnitResolver('+=1.1');
                        assert.approximately(resolver(0).value, 1.1, 0.0001);
                        assert.approximately(resolver(1).value, 2.2, 0.0001);
                        assert.approximately(resolver(2).value, 3.3, 0.0001);
                    });
                    it('returns x -= 1.1 when passed -= 1.1', function () {
                        var resolver = common_18.createUnitResolver('-=1.1');
                        assert.approximately(resolver(0).value, -1.1, 0.0001);
                        assert.approximately(resolver(1).value, -2.2, 0.0001);
                        assert.approximately(resolver(2).value, -3.3, 0.0001);
                    });
                    it('returns x += 1 when passed +=1s', function () {
                        var resolver = common_18.createUnitResolver('+=1s');
                        expect({ unit: 's', value: 1 }).to.deep.equal(resolver(0));
                        expect({ unit: 's', value: 2 }).to.deep.equal(resolver(1));
                        expect({ unit: 's', value: 3 }).to.deep.equal(resolver(2));
                    });
                    it('returns x -= 1s when passed -=1s', function () {
                        var resolver = common_18.createUnitResolver('-=1s');
                        expect({ unit: 's', value: -1 }).to.deep.equal(resolver(0));
                        expect({ unit: 's', value: -2 }).to.deep.equal(resolver(1));
                        expect({ unit: 's', value: -3 }).to.deep.equal(resolver(2));
                    });
                    it('returns 100 when passed 0to1', function () {
                        var resolver = common_18.createUnitResolver('0 to 1');
                        var random1 = resolver(0).value;
                        assert.isAbove(random1, -.000001);
                        assert.isBelow(random1, 1);
                    });
                    it('returns 100 to 200 when passed 100to200', function () {
                        var resolver = common_18.createUnitResolver('+= 100 to 200');
                        var random1 = resolver(0).value;
                        assert.isAbove(random1, 99);
                        assert.isBelow(random1, 200);
                        var random2 = resolver(1).value;
                        assert.isAbove(random2, 199);
                        assert.isBelow(random2, 300);
                    });
                });
            });
        }
    };
});
System.register("tests/plugins/waapi/transform/expandOffsets", ["chai", "just-animate/plugins/waapi/transform/index"], function (exports_121, context_121) {
    "use strict";
    var __moduleName = context_121 && context_121.id;
    var chai, expect, jsdom, transform_2;
    return {
        setters: [
            function (chai_8) {
                chai = chai_8;
            },
            function (transform_2_1) {
                transform_2 = transform_2_1;
            }
        ],
        execute: function () {
            expect = chai.expect;
            jsdom = require('mocha-jsdom');
            describe('expandOffsets', function () {
                jsdom();
                it('should copy offset: [0, 1] to { offset: 0 }, { offset: 1}', function () {
                    var keyframes = [
                        { offset: [0, 1], opacity: 1 },
                        { offset: .5, opacity: 0 }
                    ];
                    transform_2.expandOffsets(keyframes);
                    expect(keyframes[0]).to.deep.equal({ offset: 0, opacity: 1 });
                    expect(keyframes[1]).to.deep.equal({ offset: 1 / 2, opacity: 0 });
                    expect(keyframes[2]).to.deep.equal({ offset: 1, opacity: 1 });
                });
            });
        }
    };
});
System.register("tests/plugins/waapi/transform/propsToKeyframes", ["chai", "just-animate/plugins/waapi/transform/index"], function (exports_122, context_122) {
    "use strict";
    var __moduleName = context_122 && context_122.id;
    var chai, expect, jsdom, transform_3;
    return {
        setters: [
            function (chai_9) {
                chai = chai_9;
            },
            function (transform_3_1) {
                transform_3 = transform_3_1;
            }
        ],
        execute: function () {
            expect = chai.expect;
            jsdom = require('mocha-jsdom');
            describe('propsToKeyframes', function () {
                jsdom();
                it('should change opacity: [1,0,1,0] to appropriate keyframes', function () {
                    var css = {
                        opacity: [1, 0, 1, 0]
                    };
                    var sourceKeyframes = [];
                    var options = {};
                    var target = document.createElement('div');
                    var ctx = {
                        index: 0,
                        options: options,
                        target: target,
                        targets: [target]
                    };
                    transform_3.propsToKeyframes(css, sourceKeyframes, ctx);
                    expect(sourceKeyframes[0]).to.deep.equal({ offset: 0, opacity: 1 });
                    expect(sourceKeyframes[1]).to.deep.equal({ offset: 1 / 3, opacity: 0 });
                    expect(sourceKeyframes[2]).to.deep.equal({ offset: 2 / 3, opacity: 1 });
                    expect(sourceKeyframes[3]).to.deep.equal({ offset: 1, opacity: 0 });
                });
                it('should change opacity: [1,0] to appropriate keyframes', function () {
                    var css = {
                        opacity: [1, 0]
                    };
                    var sourceKeyframes = [];
                    var target = document.createElement('div');
                    var ctx = {
                        index: 0,
                        options: {},
                        target: target,
                        targets: [target],
                    };
                    transform_3.propsToKeyframes(css, sourceKeyframes, ctx);
                    expect(sourceKeyframes[0]).to.deep.equal({ offset: 0, opacity: 1 });
                    expect(sourceKeyframes[1]).to.deep.equal({ offset: 1, opacity: 0 });
                });
                it('should change rotate: [0, 90deg, -360deg] to appropriate keyframes', function () {
                    var css = {
                        rotate: [0, '90deg', '-360deg']
                    };
                    var sourceKeyframes = [];
                    var options = {};
                    var target = document.createElement('div');
                    var ctx = {
                        index: 0,
                        options: options,
                        target: target,
                        targets: [target]
                    };
                    transform_3.propsToKeyframes(css, sourceKeyframes, ctx);
                    expect(sourceKeyframes[0]).to.deep.equal({ offset: 0, rotate: 0 });
                    expect(sourceKeyframes[1]).to.deep.equal({ offset: 1 / 2, rotate: '90deg' });
                    expect(sourceKeyframes[2]).to.deep.equal({ offset: 1, rotate: '-360deg' });
                });
            });
        }
    };
});
