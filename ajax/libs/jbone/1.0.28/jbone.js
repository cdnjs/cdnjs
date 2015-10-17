/*!
 * jBone v1.0.28 - 2015-04-17 - Library for DOM manipulation
 *
 * https://github.com/kupriyanenko/jbone
 *
 * Copyright 2015 Alexey Kupriyanenko
 * Released under the MIT license.
 */

(function (win) {

var
// cache previous versions
_$ = win.$,
_jBone = win.jBone,

// Quick match a standalone tag
rquickSingleTag = /^<(\w+)\s*\/?>$/,

// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash
rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

// Alias for function
slice = [].slice,
splice = [].splice,
keys = Object.keys,

// Alias for global variables
doc = document,

isString = function(el) {
    return typeof el === "string";
},
isObject = function(el) {
    return el instanceof Object;
},
isFunction = function(el) {
    return ({}).toString.call(el) === "[object Function]";
},
isArray = function(el) {
    return Array.isArray(el);
},
jBone = function(element, data) {
    return new fn.init(element, data);
},
fn;

// set previous values and return the instance upon calling the no-conflict mode
jBone.noConflict = function() {
    win.$ = _$;
    win.jBone = _jBone;

    return jBone;
};

fn = jBone.fn = jBone.prototype = {
    init: function(element, data) {
        var elements, tag, wraper, fragment;

        if (!element) {
            return this;
        }
        if (isString(element)) {
            // Create single DOM element
            if (tag = rquickSingleTag.exec(element)) {
                this[0] = doc.createElement(tag[1]);
                this.length = 1;

                if (isObject(data)) {
                    this.attr(data);
                }

                return this;
            }
            // Create DOM collection
            if ((tag = rquickExpr.exec(element)) && tag[1]) {
                fragment = doc.createDocumentFragment();
                wraper = doc.createElement("div");
                wraper.innerHTML = element;
                while (wraper.lastChild) {
                    fragment.appendChild(wraper.firstChild);
                }
                elements = slice.call(fragment.childNodes);

                return jBone.merge(this, elements);
            }
            // Find DOM elements with querySelectorAll
            if (jBone.isElement(data)) {
                return jBone(data).find(element);
            }

            try {
                elements = doc.querySelectorAll(element);

                return jBone.merge(this, elements);
            } catch (e) {
                return this;
            }
        }
        // Wrap DOMElement
        if (element.nodeType) {
            this[0] = element;
            this.length = 1;

            return this;
        }
        // Run function
        if (isFunction(element)) {
            return element();
        }
        // Return jBone element as is
        if (element instanceof jBone) {
            return element;
        }

        // Return element wrapped by jBone
        return jBone.makeArray(element, this);
    },

    pop: [].pop,
    push: [].push,
    reverse: [].reverse,
    shift: [].shift,
    sort: [].sort,
    splice: [].splice,
    slice: [].slice,
    indexOf: [].indexOf,
    forEach: [].forEach,
    unshift: [].unshift,
    concat: [].concat,
    join: [].join,
    every: [].every,
    some: [].some,
    filter: [].filter,
    map: [].map,
    reduce: [].reduce,
    reduceRight: [].reduceRight,
    length: 0
};

fn.constructor = jBone;

fn.init.prototype = fn;

jBone.setId = function(el) {
    var jid = el.jid;

    if (el === win) {
        jid = "window";
    } else if (el.jid === undefined) {
        el.jid = jid = ++jBone._cache.jid;
    }

    if (!jBone._cache.events[jid]) {
        jBone._cache.events[jid] = {};
    }
};

jBone.getData = function(el) {
    el = el instanceof jBone ? el[0] : el;

    var jid = el === win ? "window" : el.jid;

    return {
        jid: jid,
        events: jBone._cache.events[jid]
    };
};

jBone.isElement = function(el) {
    return el && el instanceof jBone || el instanceof HTMLElement || isString(el);
};

jBone._cache = {
    events: {},
    jid: 0
};

function isArraylike(obj) {
    var length = obj.length,
        type = typeof obj;

    if (isFunction(type) || obj === win) {
        return false;
    }

    if (obj.nodeType === 1 && length) {
        return true;
    }

    return isArray(type) || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
}

fn.pushStack = function(elems) {
    var ret = jBone.merge(this.constructor(), elems);

    return ret;
};

jBone.merge = function(first, second) {
    var l = second.length,
        i = first.length,
        j = 0;

    while (j < l) {
        first[i++] = second[j++];
    }

    first.length = i;

    return first;
};

jBone.contains = function(container, contained) {
    return container.contains(contained);
};

jBone.extend = function(target) {
    var tg;

    splice.call(arguments, 1).forEach(function(source) {
        tg = target; //caching target for perf improvement

        if (source) {
            for (var prop in source) {
                tg[prop] = source[prop];
            }
        }
    });

    return target;
};

jBone.makeArray = function(arr, results) {
    var ret = results || [];

    if (arr !== null) {
        if (isArraylike(arr)) {
            jBone.merge(ret, isString(arr) ? [arr] : arr);
        } else {
            ret.push(arr);
        }
    }

    return ret;
};

jBone.unique = function(array) {
    if (array == null) {
        return [];
    }

    var result = [];

    for (var i = 0, length = array.length; i < length; i++) {
        var value = array[i];
        if (result.indexOf(value) < 0) {
            result.push(value);
        }
    }
    return result;
};

function BoneEvent(e, data) {
    var key, setter;

    this.originalEvent = e;

    setter = function(key, e) {
        if (key === "preventDefault") {
            this[key] = function() {
                this.defaultPrevented = true;
                return e[key]();
            };
        } else if (key === "stopImmediatePropagation") {
            this[key] = function() {
                this.immediatePropagationStopped = true;
                return e[key]();
            };
        } else if (isFunction(e[key])) {
            this[key] = function() {
                return e[key]();
            };
        } else {
            this[key] = e[key];
        }
    };

    for (key in e) {
        if (e[key] || typeof e[key] === "function") {
            setter.call(this, key, e);
        }
    }

    jBone.extend(this, data, {
        isImmediatePropagationStopped: function() {
            return !!this.immediatePropagationStopped;
        }
    });
}

jBone.Event = function(event, data) {
    var namespace, eventType;

    if (event.type && !data) {
        data = event;
        event = event.type;
    }

    namespace = event.split(".").splice(1).join(".");
    eventType = event.split(".")[0];

    event = doc.createEvent("Event");
    event.initEvent(eventType, true, true);

    return jBone.extend(event, {
        namespace: namespace,
        isDefaultPrevented: function() {
            return event.defaultPrevented;
        }
    }, data);
};

jBone.event = {
    add: function(el, types, handler, data, selector) {
        jBone.setId(el);

        var eventHandler = function(e) {
                jBone.event.dispatch.call(el, e);
            },
            events = jBone.getData(el).events,
            eventType, t, event;

        types = types.split(" ");
        t = types.length;
        while (t--) {
            event = types[t];

            eventType = event.split(".")[0];
            events[eventType] = events[eventType] || [];

            if (!events[eventType].length) {
                el.addEventListener && el.addEventListener(eventType, eventHandler, false);
            }

            events[eventType].push({
                namespace: event.split(".").splice(1).join("."),
                fn: eventHandler,
                selector: selector,
                data: data,
                originfn: handler
            });
        }
    },

    dispatch: function(e) {
        var i = 0,
            j = 0,
            el = this,
            handlers = jBone.getData(el).events[e.type],
            length = handlers.length,
            handlerQueue = [],
            targets = [],
            l,
            expectedTarget,
            handler,
            event,
            eventOptions;

        // cache all events handlers, fix issue with multiple handlers (issue #45)
        for (; i < length; i++) {
            handlerQueue.push(handlers[i]);
        }

        i = 0;
        length = handlerQueue.length;

        for (;
            // if event exists
            i < length &&
            // if handler is not removed from stack
            ~handlers.indexOf(handlerQueue[i]) &&
            // if propagation is not stopped
            !(event && event.isImmediatePropagationStopped());
        i++) {
            expectedTarget = null;
            eventOptions = {};
            handler = handlerQueue[i];
            handler.data && (eventOptions.data = handler.data);

            // event handler without selector
            if (!handler.selector) {
                event = new BoneEvent(e, eventOptions);

                if (!(e.namespace && e.namespace !== handler.namespace)) {
                    handler.originfn.call(el, event);
                }
            }
            // event handler with selector
            else if (
                // if target and selected element the same
                ~(targets = jBone(el).find(handler.selector)).indexOf(e.target) && (expectedTarget = e.target) ||
                // if one of element matched with selector contains target
                (el !== e.target && el.contains(e.target))
            ) {
                // get element matched with selector
                if (!expectedTarget) {
                    l = targets.length;
                    j = 0;

                    for (; j < l; j++) {
                        if (targets[j] && targets[j].contains(e.target)) {
                            expectedTarget = targets[j];
                        }
                    }
                }

                if (!expectedTarget) {
                    continue;
                }

                eventOptions.currentTarget = expectedTarget;
                event = new BoneEvent(e, eventOptions);

                if (!(e.namespace && e.namespace !== handler.namespace)) {
                    handler.originfn.call(expectedTarget, event);
                }
            }
        }
    }
};

fn.on = function(types, selector, data, fn) {
    var length = this.length,
        i = 0;

    if (data == null && fn == null) {
        // (types, fn)
        fn = selector;
        data = selector = undefined;
    } else if (fn == null) {
        if (typeof selector === "string") {
            // (types, selector, fn)
            fn = data;
            data = undefined;
        } else {
            // (types, data, fn)
            fn = data;
            data = selector;
            selector = undefined;
        }
    }

    if (!fn) {
        return this;
    }

    for (; i < length; i++) {
        jBone.event.add(this[i], types, fn, data, selector);
    }

    return this;
};

fn.one = function(event) {
    var args = arguments,
        i = 0,
        length = this.length,
        oneArgs = slice.call(args, 1, args.length - 1),
        callback = slice.call(args, -1)[0],
        addListener;

    addListener = function(el) {
        var $el = jBone(el);

        event.split(" ").forEach(function(event) {
            var fn = function(e) {
                $el.off(event, fn);
                callback.call(el, e);
            };

            $el.on.apply($el, [event].concat(oneArgs, fn));
        });
    };

    for (; i < length; i++) {
        addListener(this[i]);
    }

    return this;
};

fn.trigger = function(event) {
    var events = [],
        i = 0,
        length = this.length,
        dispatchEvents;

    if (!event) {
        return this;
    }

    if (isString(event)) {
        events = event.split(" ").map(function(event) {
            return jBone.Event(event);
        });
    } else {
        event = event instanceof Event ? event : jBone.Event(event);
        events = [event];
    }

    dispatchEvents = function(el) {
        events.forEach(function(event) {
            if (!event.type) {
                return;
            }

            el.dispatchEvent && el.dispatchEvent(event);
        });
    };

    for (; i < length; i++) {
        dispatchEvents(this[i]);
    }

    return this;
};

fn.off = function(event, fn) {
    var i = 0,
        length = this.length,
        removeListener = function(events, eventType, index, el, e) {
            var callback;

            // get callback
            if ((fn && e.originfn === fn) || !fn) {
                callback = e.fn;
            }

            if (events[eventType][index].fn === callback) {
                // remove handler from cache
                events[eventType].splice(index, 1);

                if (!events[eventType].length) {
                    el.removeEventListener(eventType, callback);
                }
            }
        },
        events, namespace, removeListeners, eventType;

    removeListeners = function(el) {
        var l, eventsByType, e;

        events = jBone.getData(el).events;

        if (!events) {
            return;
        }

        // remove all events
        if (!event && events) {
            return keys(events).forEach(function(eventType) {
                eventsByType = events[eventType];
                l = eventsByType.length;

                while(l--) {
                    removeListener(events, eventType, l, el, eventsByType[l]);
                }
            });
        }

        event.split(" ").forEach(function(event) {
            eventType = event.split(".")[0];
            namespace = event.split(".").splice(1).join(".");

            // remove named events
            if (events[eventType]) {
                eventsByType = events[eventType];
                l = eventsByType.length;

                while(l--) {
                    e = eventsByType[l];
                    if (!namespace || (namespace && e.namespace === namespace)) {
                        removeListener(events, eventType, l, el, e);
                    }
                }
            }
            // remove all namespaced events
            else if (namespace) {
                keys(events).forEach(function(eventType) {
                    eventsByType = events[eventType];
                    l = eventsByType.length;

                    while(l--) {
                        e = eventsByType[l];
                        if (e.namespace.split(".")[0] === namespace.split(".")[0]) {
                            removeListener(events, eventType, l, el, e);
                        }
                    }
                });
            }
        });
    };

    for (; i < length; i++) {
        removeListeners(this[i]);
    }

    return this;
};

fn.find = function(selector) {
    var results = [],
        i = 0,
        length = this.length,
        finder = function(el) {
            if (isFunction(el.querySelectorAll)) {
                [].forEach.call(el.querySelectorAll(selector), function(found) {
                    results.push(found);
                });
            }
        };

    for (; i < length; i++) {
        finder(this[i]);
    }

    return jBone(results);
};

fn.get = function(index) {
    return index != null ?

        // Return just one element from the set
        (index < 0 ? this[index + this.length] : this[index]) :

        // Return all the elements in a clean array
        slice.call(this);
};

fn.eq = function(index) {
    return jBone(this[index]);
};

fn.parent = function() {
    var results = [],
        parent,
        i = 0,
        length = this.length;

    for (; i < length; i++) {
        if (!~results.indexOf(parent = this[i].parentElement) && parent) {
            results.push(parent);
        }
    }

    return jBone(results);
};

fn.toArray = function() {
    return slice.call(this);
};

fn.is = function() {
    var args = arguments;

    return this.some(function(el) {
        return el.tagName.toLowerCase() === args[0];
    });
};

fn.has = function() {
    var args = arguments;

    return this.some(function(el) {
        return el.querySelectorAll(args[0]).length;
    });
};

fn.add = function(selector, context) {
    return this.pushStack(
        jBone.unique(
            jBone.merge(this.get(), jBone(selector, context))
        )
    );
};

fn.attr = function(key, value) {
    var args = arguments,
        i = 0,
        length = this.length,
        setter;

    if (isString(key) && args.length === 1) {
        return this[0] && this[0].getAttribute(key);
    }

    if (args.length === 2) {
        setter = function(el) {
            el.setAttribute(key, value);
        };
    } else if (isObject(key)) {
        setter = function(el) {
            keys(key).forEach(function(name) {
                el.setAttribute(name, key[name]);
            });
        };
    }

    for (; i < length; i++) {
        setter(this[i]);
    }

    return this;
};

fn.removeAttr = function(key) {
    var i = 0,
        length = this.length;

    for (; i < length; i++) {
        this[i].removeAttribute(key);
    }

    return this;
};

fn.val = function(value) {
    var i = 0,
        length = this.length;

    if (arguments.length === 0) {
        return this[0] && this[0].value;
    }

    for (; i < length; i++) {
        this[i].value = value;
    }

    return this;
};

fn.css = function(key, value) {
    var args = arguments,
        i = 0,
        length = this.length,
        setter;

    // Get attribute
    if (isString(key) && args.length === 1) {
        return this[0] && win.getComputedStyle(this[0])[key];
    }

    // Set attributes
    if (args.length === 2) {
        setter = function(el) {
            el.style[key] = value;
        };
    } else if (isObject(key)) {
        setter = function(el) {
            keys(key).forEach(function(name) {
                el.style[name] = key[name];
            });
        };
    }

    for (; i < length; i++) {
        setter(this[i]);
    }

    return this;
};

fn.data = function(key, value) {
    var args = arguments, data = {},
        i = 0,
        length = this.length,
        setter,
        setValue = function(el, key, value) {
            if (isObject(value)) {
                el.jdata = el.jdata || {};
                el.jdata[key] = value;
            } else {
                el.dataset[key] = value;
            }
        },
        getValue = function(value) {
            if (value === "true") {
                return true;
            } else if (value === "false") {
                return false;
            } else {
                return value;
            }
        };

    // Get all data
    if (args.length === 0) {
        this[0].jdata && (data = this[0].jdata);

        keys(this[0].dataset).forEach(function(key) {
            data[key] = getValue(this[0].dataset[key]);
        }, this);

        return data;
    }
    // Get data by name
    if (args.length === 1 && isString(key)) {
        return this[0] && getValue(this[0].dataset[key] || this[0].jdata && this[0].jdata[key]);
    }

    // Set data
    if (args.length === 1 && isObject(key)) {
        setter = function(el) {
            keys(key).forEach(function(name) {
                setValue(el, name, key[name]);
            });
        };
    } else if (args.length === 2) {
        setter = function(el) {
            setValue(el, key, value);
        };
    }

    for (; i < length; i++) {
        setter(this[i]);
    }

    return this;
};

fn.removeData = function(key) {
    var i = 0,
        length = this.length,
        jdata, dataset;

    for (; i < length; i++) {
        jdata = this[i].jdata;
        dataset = this[i].dataset;

        if (key) {
            jdata && jdata[key] && delete jdata[key];
            delete dataset[key];
        } else {
            for (key in jdata) {
                delete jdata[key];
            }

            for (key in dataset) {
                delete dataset[key];
            }
        }
    }

    return this;
};

fn.addClass = function(className) {
    var i = 0,
        j = 0,
        length = this.length,
        classes = className ? className.trim().split(/\s+/) : [];

    for (; i < length; i++) {
        j = 0;

        for (j = 0; j < classes.length; j++) {
            this[i].classList.add(classes[j]);
        }
    }

    return this;
};

fn.removeClass = function(className) {
    var i = 0,
        j = 0,
        length = this.length,
        classes = className ? className.trim().split(/\s+/) : [];

    for (; i < length; i++) {
        j = 0;

        for (j = 0; j < classes.length; j++) {
            this[i].classList.remove(classes[j]);
        }
    }

    return this;
};

fn.toggleClass = function(className, force) {
    var i = 0,
        length = this.length,
        method = "toggle";

    force === true && (method = "add") || force === false && (method = "remove");

    if (className) {
        for (; i < length; i++) {
            this[i].classList[method](className);
        }
    }

    return this;
};

fn.hasClass = function(className) {
    var i = 0, length = this.length;

    if (className) {
        for (; i < length; i++) {
            if (this[i].classList.contains(className)) {
                return true;
            }
        }
    }

    return false;
};

fn.html = function(value) {
    var args = arguments,
        el;

    // add HTML into elements
    if (args.length === 1 && value !== undefined) {
        return this.empty().append(value);
    }
    // get HTML from element
    else if (args.length === 0 && (el = this[0])) {
        return el.innerHTML;
    }

    return this;
};

fn.append = function(appended) {
    var i = 0,
        length = this.length,
        setter;

    // create jBone object and then append
    if (isString(appended) && rquickExpr.exec(appended)) {
        appended = jBone(appended);
    }
    // create text node for insertion
    else if (!isObject(appended)) {
        appended = document.createTextNode(appended);
    }

    appended = appended instanceof jBone ? appended : jBone(appended);

    setter = function(el, i) {
        appended.forEach(function(node) {
            if (i) {
                el.appendChild(node.cloneNode(true));
            } else {
                el.appendChild(node);
            }
        });
    };

    for (; i < length; i++) {
        setter(this[i], i);
    }

    return this;
};

fn.appendTo = function(to) {
    jBone(to).append(this);

    return this;
};

fn.empty = function() {
    var i = 0,
        length = this.length,
        el;

    for (; i < length; i++) {
        el = this[i];

        while (el.lastChild) {
            el.removeChild(el.lastChild);
        }
    }

    return this;
};

fn.remove = function() {
    var i = 0,
        length = this.length,
        el;

    // remove all listeners
    this.off();

    for (; i < length; i++) {
        el = this[i];

        // remove data and nodes
        delete el.jdata;
        el.parentNode && el.parentNode.removeChild(el);
    }

    return this;
};

if (typeof module === "object" && module && typeof module.exports === "object") {
    // Expose jBone as module.exports in loaders that implement the Node
    // module pattern (including browserify). Do not create the global, since
    // the user will be storing it themselves locally, and globals are frowned
    // upon in the Node module world.
    module.exports = jBone;
}
// Register as a AMD module
else if (typeof define === "function" && define.amd) {
    define(function() {
        return jBone;
    });

    win.jBone = win.$ = jBone;
} else if (typeof win === "object" && typeof win.document === "object") {
    win.jBone = win.$ = jBone;
}

}(window));
