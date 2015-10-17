/*!
 * jBone v0.0.1 - 2013-11-07 - Library for DOM manipulation
 *
 * https://github.com/kupriyanenko/jbone
 *
 * Copyright 2013 Alexey Kupriyanenko
 * Released under the MIT license.
 */

(function(exports, global) {
    global["true"] = exports;
    var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
    var rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
    function jBone() {
        if (this instanceof jBone) {
            return init.apply(this, arguments[0]);
        } else {
            return new jBone(arguments);
        }
    }
    jBone.prototype = [];
    jBone._cache = {
        events: {},
        jid: 0
    };
    jBone._data = function(el) {
        el = el instanceof jBone ? el[0] : el;
        var jid = el === window ? "window" : el.jid;
        return {
            jid: jid,
            events: jBone._cache.events[jid]
        };
    };
    function init() {
        if (Array.isArray(arguments[0])) {
            arguments[0].forEach(function(el) {
                addElement.call(this, [ el ]);
            }, this);
        } else if (arguments[0]) {
            addElement.call(this, arguments);
        }
        return this;
    }
    function addElement(args) {
        if (typeof args[0] === "string" && args[0].match(rsingleTag)) {
            createDOMElement.apply(this, args);
        } else if (typeof args[0] === "string" && args[0].match(rquickExpr) && args[0].match(rquickExpr)[1]) {
            createDOMFromString.apply(this, args);
        } else if (typeof args[0] === "string") {
            findDOMElements.apply(this, args);
        } else if (typeof args[0] !== "string") {
            pushElement.call(this, args[0]);
        }
    }
    function createDOMElement() {
        var tagName = arguments[0].match(rsingleTag)[1], el = document.createElement(tagName);
        jBone(el).attr(arguments[1]);
        pushElement.call(this, el);
    }
    function createDOMFromString(html) {
        var wraper = document.createElement("div");
        wraper.innerHTML = html;
        [].forEach.call(wraper.childNodes, function(node) {
            pushElement.call(this, node);
        }.bind(this));
    }
    function findDOMElements(selector) {
        var elems = document.querySelectorAll(selector);
        [].forEach.call(elems, function(el) {
            pushElement.call(this, el);
        }, this);
    }
    function pushElement(el) {
        var jid = el.jid || undefined;
        if (el === window) {
            jid = "window";
        } else if (!el.jid) {
            jid = ++jBone._cache.jid;
            el.jid = jid;
        }
        if (!jBone._cache.events[jid]) {
            jBone._cache.events[jid] = {};
        }
        this.push(el);
    }
    global.jBone = global.$ = jBone;
    jBone.prototype.on = function() {
        var event = arguments[0], callback, target, namespace, fn, events;
        if (arguments.length === 2) {
            callback = arguments[1];
        } else {
            target = arguments[1], callback = arguments[2];
        }
        this.forEach(function(el) {
            events = jBone._data(el).events;
            namespace = event.split(".")[1];
            event = event.split(".")[0];
            events[event] = events[event] ? events[event] : [];
            fn = function(e) {
                if (e.namespace && e.namespace !== namespace) {
                    return;
                }
                if (!target) {
                    callback.call(el, e);
                } else {
                    if (~jBone(el).find(target).indexOf(e.target)) {
                        callback.call(el, e);
                    }
                }
            };
            events[event].push({
                namespace: namespace,
                fn: fn,
                originfn: callback
            });
            if (el.addEventListener) {
                el.addEventListener(event, fn, false);
            }
        });
        return this;
    };
    jBone.prototype.trigger = function(eventName, data) {
        if (!eventName || !eventName.split(".")[0]) {
            return this;
        }
        var namespace = eventName.split(".")[1];
        eventName = eventName.split(".")[0];
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventName, true, true, null);
        event.namespace = namespace;
        this.forEach(function(el) {
            if (el.dispatchEvent) {
                el.dispatchEvent(event);
            } else if (jBone._data(el).events[eventName]) {
                jBone._data(el).events[eventName].forEach(function(fn) {
                    fn.fn.call(el, data);
                });
            }
        });
        return this;
    };
    jBone.prototype.off = function(event, fn) {
        var getCallback = function(e) {
            if (fn && e.originfn === fn) {
                return e.fn;
            } else if (!fn) {
                return e.fn;
            }
        };
        var namespace = event.split(".")[1], events, callback;
        event = event.split(".")[0];
        this.forEach(function(el) {
            events = jBone._data(el).events;
            if (events[event]) {
                events[event].forEach(function(e) {
                    callback = getCallback(e);
                    if (namespace) {
                        if (e.namespace === namespace) {
                            el.removeEventListener(event, callback);
                        }
                    } else if (!namespace) {
                        el.removeEventListener(event, callback);
                    }
                });
            } else if (namespace) {
                Object.keys(events).forEach(function(key) {
                    events[key].forEach(function(e) {
                        callback = getCallback(e);
                        if (e.namespace === namespace) {
                            el.removeEventListener(key, callback);
                        }
                    });
                });
            }
        });
        return this;
    };
    jBone.prototype.is = function() {
        var args = arguments;
        return this.some(function(el) {
            return el.tagName.toLowerCase() === args[0];
        });
    };
    jBone.prototype.has = function() {
        var args = arguments;
        return this.some(function(el) {
            return el.querySelectorAll(args[0]).length;
        });
    };
    jBone.prototype.attr = function() {
        var args = arguments;
        if (typeof args[0] === "string" && args.length === 1) {
            return this[0].getAttribute(args[0]);
        } else if (typeof args[0] === "string" && args.length > 1) {
            this.forEach(function(el) {
                el.setAttribute(args[0], args[1]);
            });
        } else if (args[0] instanceof Object) {
            this.forEach(function(el) {
                Object.keys(args[0]).forEach(function(key) {
                    el.setAttribute(key, args[0][key]);
                });
            });
        }
        return this;
    };
    jBone.prototype.find = function(selector) {
        var results = [];
        this.forEach(function(el) {
            [].forEach.call(el.querySelectorAll(selector), function(finded) {
                results.push(finded);
            });
        });
        return jBone(results);
    };
    jBone.prototype.get = function(index) {
        return this[index];
    };
    jBone.prototype.eq = function(index) {
        return jBone(this[index]);
    };
    jBone.prototype.html = function() {
        var value = arguments[0], result;
        if (value !== undefined) {
            this.forEach(function(el) {
                if (typeof value === "string") {
                    el.innerHTML = value;
                } else {
                    result = document.createDocumentFragment();
                    if (value instanceof HTMLElement) {
                        result.appendChild(value);
                    } else if (value instanceof jBone) {
                        value.forEach(function(j) {
                            result.appendChild(j);
                        });
                    }
                    jBone(el).empty();
                    el.appendChild(result);
                }
            });
            return this;
        } else {
            result = [];
            this.forEach(function(el) {
                if (el instanceof HTMLElement) {
                    result.push(el.innerHTML);
                }
            });
            return result.length ? result.join("") : null;
        }
    };
    jBone.prototype.append = function(appended) {
        if (appended instanceof jBone) {
            this.forEach(function(el, i) {
                appended.forEach(function(jel) {
                    if (!i) {
                        el.appendChild(jel);
                    } else {
                        el.appendChild(jel.cloneNode());
                    }
                });
            });
        } else if (appended instanceof HTMLElement) {
            this.forEach(function(el) {
                el.appendChild(appended);
            });
        }
        return this;
    };
    jBone.prototype.empty = function() {
        this.forEach(function(el) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        });
        return this;
    };
})({}, function() {
    return this;
}());