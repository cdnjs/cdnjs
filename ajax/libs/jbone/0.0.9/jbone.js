/*!
 * jBone v0.0.9 - 2013-11-13 - Library for DOM manipulation
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
    function jBone(element, data) {
        if (this instanceof jBone) {
            return init.call(this, element, data);
        } else {
            return new jBone(element, data);
        }
    }
    function init(element, data) {
        var elements;
        if (element instanceof jBone) {
            return element;
        } else if (Array.isArray(element)) {
            elements = element.map(function(el) {
                return getElement(el, data);
            });
        } else if (element) {
            elements = getElement(element, data);
        }
        elements = Array.isArray(elements) ? elements : [ elements ];
        jBone.merge(this, elements);
        if (data) {
            this.attr(data);
        }
        return this;
    }
    function getElement(element) {
        var tag, wraper;
        if (typeof element === "string" && (tag = rsingleTag.exec(element))) {
            return document.createElement(tag[1]);
        } else if (typeof element === "string" && (tag = rquickExpr.exec(element)) && tag[1]) {
            wraper = document.createElement("div");
            wraper.innerHTML = element;
            return [].slice.call(wraper.childNodes);
        } else if (typeof element === "string") {
            return [].slice.call(document.querySelectorAll(element));
        }
        return element;
    }
    jBone.setId = function(el) {
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
    };
    jBone.getData = function(el) {
        el = el instanceof jBone ? el[0] : el;
        var jid = el === window ? "window" : el.jid;
        return {
            jid: jid,
            events: jBone._cache.events[jid]
        };
    };
    jBone.merge = function(first, second) {
        var l = second.length, i = first.length, j = 0;
        if (typeof l === "number") {
            while (j < l) {
                first[i++] = second[j];
                j++;
            }
        } else {
            while (second[j] !== undefined) {
                first[i++] = second[j++];
            }
        }
        first.length = i;
        return first;
    };
    jBone._cache = {
        events: {},
        jid: 0
    };
    jBone.fn = jBone.prototype = [];
    window.jBone = window.$ = jBone;
    jBone.fn.on = function() {
        var event = arguments[0], callback, target, namespace, fn, events;
        if (arguments.length === 2) {
            callback = arguments[1];
        } else {
            target = arguments[1], callback = arguments[2];
        }
        this.forEach(function(el) {
            jBone.setId(el);
            events = jBone.getData(el).events;
            event.split(" ").forEach(function(event) {
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
        });
        return this;
    };
    jBone.fn.one = function() {
        var event = arguments[0], callback, target;
        if (arguments.length === 2) {
            callback = arguments[1];
        } else {
            target = arguments[1], callback = arguments[2];
        }
        this.forEach(function(el) {
            event.split(" ").forEach(function(event) {
                var fn = function(e) {
                    callback.call(el, e);
                    jBone(el).off(event, fn);
                };
                if (arguments.length === 2) {
                    jBone(el).on(event, fn);
                } else {
                    jBone(el).on(event, target, fn);
                }
            });
        });
        return this;
    };
    jBone.fn.trigger = function(eventName) {
        if (!eventName || !eventName.split(".")[0]) {
            return this;
        }
        var namespace, event;
        this.forEach(function(el) {
            eventName.split(" ").forEach(function(eventName) {
                namespace = eventName.split(".")[1];
                eventName = eventName.split(".")[0];
                if ("CustomEvent" in window) {
                    event = document.createEvent("CustomEvent");
                    event.initCustomEvent(eventName, true, true, null);
                } else {
                    event = document.createEvent("Event");
                    event.initEvent(eventName, true, true);
                }
                event.namespace = namespace;
                if (el.dispatchEvent) {
                    el.dispatchEvent(event);
                }
            });
        });
        return this;
    };
    jBone.fn.off = function(event, fn) {
        var events, callback, namespace, getCallback = function(e) {
            if (fn && e.originfn === fn) {
                return e.fn;
            } else if (!fn) {
                return e.fn;
            }
        };
        this.forEach(function(el) {
            events = jBone.getData(el).events;
            if (!events) {
                return;
            }
            event.split(" ").forEach(function(event) {
                namespace = event.split(".")[1];
                event = event.split(".")[0];
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
        });
        return this;
    };
    jBone.fn.is = function() {
        var args = arguments;
        return this.some(function(el) {
            return el.tagName.toLowerCase() === args[0];
        });
    };
    jBone.fn.has = function() {
        var args = arguments;
        return this.some(function(el) {
            return el.querySelectorAll(args[0]).length;
        });
    };
    jBone.fn.attr = function() {
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
    jBone.fn.val = function(value) {
        if (value !== undefined) {
            this.forEach(function(el) {
                el.value = value;
            });
        } else {
            return this[0].value;
        }
        return this;
    };
    jBone.fn.css = function() {
        var args = arguments;
        if (typeof args[0] === "string" && args.length === 2) {
            this.forEach(function(el) {
                el.style[args[0]] = args[1];
            });
        } else if (args[0] instanceof Object) {
            this.forEach(function(el) {
                Object.keys(args[0]).forEach(function(key) {
                    el.style[key] = args[0][key];
                });
            });
        }
        return this;
    };
    jBone.fn.find = function(selector) {
        var results = [];
        this.forEach(function(el) {
            [].forEach.call(el.querySelectorAll(selector), function(finded) {
                results.push(finded);
            });
        });
        return jBone(results);
    };
    jBone.fn.get = function(index) {
        return this[index];
    };
    jBone.fn.eq = function(index) {
        return jBone(this[index]);
    };
    jBone.fn.html = function() {
        var value = arguments[0], result;
        if (value !== undefined) {
            this.empty.call(this);
            this.append.call(this, value);
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
    jBone.fn.append = function(appended) {
        if (typeof appended === "string") {
            appended = jBone(appended);
        }
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
        } else if (appended instanceof HTMLElement || appended instanceof DocumentFragment) {
            this.forEach(function(el) {
                el.appendChild(appended);
            });
        }
        return this;
    };
    jBone.fn.appendTo = function(to) {
        jBone(to).append(this);
        return this;
    };
    jBone.fn.empty = function() {
        this.forEach(function(el) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        });
        return this;
    };
    jBone.fn.remove = function() {
        this.forEach(function(el) {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
        return this;
    };
})({}, function() {
    return this;
}());