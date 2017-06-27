/*!
 * jBone v0.0.13 - 2013-11-16 - Library for DOM manipulation
 *
 * https://github.com/kupriyanenko/jbone
 *
 * Copyright 2013 Alexey Kupriyanenko
 * Released under the MIT license.
 */

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        root.jBone = root.$ = factory();
    }
}(this, function () {
var
// Match a standalone tag
rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash
rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

slice = [].slice,

doc = document,

win = window,

isString = function(el) {
    return typeof el === "string";
},

isObject = function(el) {
    return el instanceof Object;
},

jBone = function(element, data) {
    if (this instanceof jBone) {
        return init.call(this, element, data);
    } else {
        return new jBone(element, data);
    }
},

init = function(element, data) {
    var elements;

    if (typeof element === "function") {
        element();
    } else if (element instanceof jBone) {
        return element;
    } else if (Array.isArray(element)) {
        elements = element.map(function(el) {
            return getElement(el, data);
        });
    } else if (element) {
        elements = getElement(element, data);
    }

    if (elements instanceof jBone) {
        return elements;
    }

    if (!elements) {
        return this;
    }

    elements = Array.isArray(elements) ? elements : [elements];
    jBone.merge(this, elements);

    if (isObject(data) && !jBone.isElement(data)) {
        this.attr(data);
    }

    return this;
},

getElement = function(element, context) {
    var tag, wraper;

    if (isString(element) && (tag = rsingleTag.exec(element))) {
        return doc.createElement(tag[1]);
    } else if (isString(element) && (tag = rquickExpr.exec(element)) && tag[1]) {
        wraper = doc.createElement("div");
        wraper.innerHTML = element;
        return slice.call(wraper.childNodes);
    } else if (isString(element)) {
        if (jBone.isElement(context)) {
            return jBone(context).find(element);
        }

        try {
            return slice.call(doc.querySelectorAll(element));
        } catch (e) {
            return;
        }
    }

    return element;
};

jBone.setId = function(el) {
    var jid = el.jid || undefined;

    if (el === win) {
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

    var jid = el === win ? "window" : el.jid;

    return {
        jid: jid,
        events: jBone._cache.events[jid]
    };
};

jBone.isElement = function(el) {
    return el instanceof jBone || el instanceof HTMLElement || isString(el);
};

jBone._cache = {
    events: {},
    jid: 0
};

jBone.fn = jBone.prototype = [];

jBone.merge = function(first, second) {
    var l = second.length,
        i = first.length,
        j = 0;

    while (j < l) {
        first[i++] = second[j];
        j++;
    }

    first.length = i;

    return first;
};

jBone.contains = function(container, contained) {
    var search, result;

    search = function(el, element) {
        if (el === element) {
            return result = el;
        } else if (!el.parentNode) {
            return;
        }

        search(el.parentNode, element);
    };

    container.forEach(function(element) {
        search(contained.parentNode, element);
    });

    return result;
};

jBone.extend = function(target) {
    [].splice.call(arguments, 1).forEach(function(object) {
      for (var prop in object) {
        target[prop] = object[prop];
      }
    });

    return target;
};
jBone.Event = function(event) {
    var namespace, eventType;

    namespace = event.split(".").splice(1).join(".");
    eventType = event.split(".")[0];

    event = doc.createEvent("Event");
    event.initEvent(eventType, true, true);

    event.namespace = namespace;
    event.isDefaultPrevented = function() {
        return event.defaultPrevented;
    };

    return event;
};

jBone.fn.on = function(event) {
    var args = arguments,
        callback, target, namespace, fn, events, eventType;

    if (args.length === 2) {
        callback = args[1];
    } else {
        target = args[1], callback = args[2];
    }

    this.forEach(function(el) {
        jBone.setId(el);
        events = jBone.getData(el).events;
        event.split(" ").forEach(function(event) {
            eventType = event.split(".")[0];
            namespace = event.split(".").splice(1).join(".");
            events[eventType] = events[eventType] ? events[eventType] : [];

            fn = function(e) {
                if (e.namespace && e.namespace !== namespace) {
                    return;
                }

                if (!target) {
                    callback.call(el, e);
                } else if (~jBone(el).find(target).indexOf(e.target) || jBone.contains(jBone(el).find(target), e.target)) {
                    callback.call(e.target, e);
                }
            };

            events[eventType].push({
                namespace: namespace,
                fn: fn,
                originfn: callback
            });

            if (el.addEventListener) {
                el.addEventListener(eventType, fn, false);
            }
        });
    });

    return this;
};

jBone.fn.one = function() {
    var event = arguments[0], args = arguments,
        callback, target;

    if (args.length === 2) {
        callback = args[1];
    } else {
        target = args[1], callback = args[2];
    }

    this.forEach(function(el) {
        event.split(" ").forEach(function(event) {
            var fn = function(e) {
                callback.call(el, e);
                jBone(el).off(event, fn);
            };

            if (args.length === 2) {
                jBone(el).on(event, fn);
            } else {
                jBone(el).on(event, target, fn);
            }
        });
    });

    return this;
};

jBone.fn.trigger = function(event) {
    var events = [];

    if (!event) {
        return this;
    }

    if (isString(event)) {
        events = event.split(" ").map(function(event) {
            return $.Event(event);
        });
    } else {
        events = [event];
    }

    this.forEach(function(el) {
        events.forEach(function(event) {
            if (!event.type) {
                return;
            }

            if (el.dispatchEvent) {
                el.dispatchEvent(event);
            }
        });
    });

    return this;
};

jBone.fn.off = function(event, fn) {
    var events, callback, namespace, eventType,
        getCallback = function(e) {
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
            eventType = event.split(".")[0];
            namespace = event.split(".").splice(1).join(".");

            // remove named events
            if (events[eventType]) {
                events[eventType].forEach(function(e) {
                    callback = getCallback(e);
                    if (!namespace || (namespace && e.namespace === namespace)) {
                        el.removeEventListener(eventType, callback);
                    }
                });
            }
            // remove namespaced events
            else if (namespace) {
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

jBone.fn.parent = function() {
    var results = [], parent;

    this.forEach(function(el) {
        if (!~results.indexOf(parent = el.parentNode)) {
            results.push(parent);
        }
    });

    return jBone(results);
};

jBone.fn.toArray = function() {
    return slice.call(this);
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

    if (isString(args[0]) && args.length === 1) {
        return this[0].getAttribute(args[0]);
    }

    if (args.length === 2) {
        this.forEach(function(el) {
            el.setAttribute(args[0], args[1]);
        });
    } else if (isObject(args[0])) {
        this.forEach(function(el) {
            Object.keys(args[0]).forEach(function(key) {
                el.setAttribute(key, args[0][key]);
            });
        });
    }

    return this;
};

jBone.fn.val = function(value) {
    if (arguments.length === 0) {
        return this[0].value;
    }

    this.forEach(function(el) {
        el.value = value;
    });

    return this;
};

jBone.fn.css = function() {
    var args = arguments;

    if (isString(args[0]) && args.length === 1) {
        return win.getComputedStyle(this[0])[args[0]];
    }

    if (args.length === 2) {
        this.forEach(function(el) {
            el.style[args[0]] = args[1];
        });
    } else if (isObject(args[0])) {
        this.forEach(function(el) {
            Object.keys(args[0]).forEach(function(key) {
                el.style[key] = args[0][key];
            });
        });
    }

    return this;
};

jBone.fn.data = function(key, value) {
    var args = arguments,
        setValue = function(el, key, value) {
            if (isObject(value)) {
                el.jdata = el.jdata || {};
                el.jdata[key] = value;
            } else {
                el.dataset[key] = value;
            }
        };

    if (args.length === 0) {
        return jBone.extend({}, this[0].dataset, this[0].jdata);
    }

    if (args.length === 1) {
        if (isString(key)) {
            return this[0].dataset[key] || this[0].jdata && this[0].jdata[key];
        } else if (isObject(key)) {
            Object.keys(key).forEach(function(name) {
                this.forEach(function(el) {
                    setValue(el, name, key[name]);
                });
            }, this);
        }
    } else if (args.length === 2) {
        this.forEach(function(el) {
            setValue(el, key, value);
        });
    }

    return this;
};

jBone.fn.html = function(value) {
    var result = [];

    // add HTML into elements
    if (value !== undefined) {
        this.empty.call(this);

        if (!isObject(value) && !rquickExpr.exec(value)) {
            this.forEach(function(el) {
                if (el instanceof HTMLElement) {
                    el.innerHTML = value;
                }
            });
        } else {
            this.append.call(this, value);
        }

        return this;
    }

    // get HTML from element
    this.forEach(function(el) {
        if (el instanceof HTMLElement) {
            result.push(el.innerHTML);
        }
    });

    return result.length ? result.join("") : null;
};

jBone.fn.append = function(appended) {
    if (isString(appended)) {
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

win.jBone = win.$ = jBone;

return jBone;
}));
