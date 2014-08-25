/*! Flight v1.1.3 | (c) Twitter, Inc. | MIT License */
(function(context) {
  var factories = {}, loaded = {};
  var isArray = Array.isArray || function(obj) {
    return obj.constructor == Array;
  };

  var map = Array.map || function(arr, fn, scope) {
    for (var i = 0, len = arr.length, result = []; i < len; i++) {
      result.push(fn.call(scope, arr[i]));
    }
    return result;
  };

  function define() {
    var args = Array.prototype.slice.call(arguments), dependencies = [], id, factory;
    if (typeof args[0] == 'string') {
      id = args.shift();
    }
    if (isArray(args[0])) {
      dependencies = args.shift();
    }
    factory = args.shift();
    factories[id] = [dependencies, factory];
  }

  function require(id) {
    function resolve(dep) {
      var relativeParts = id.split('/'), depParts = dep.split('/'), relative = false;
      relativeParts.pop();
      while (depParts[0] == '..' && relativeParts.length) {
        relativeParts.pop();
        depParts.shift();
        relative = true;
      }
      if (depParts[0] == '.') {
        depParts.shift();
        relative = true;
      }
      if (relative) {
        depParts = relativeParts.concat(depParts);
      }
      return depParts.join('/');
    }

    var unresolved, factory, dependencies;
    if (typeof loaded[id] == 'undefined') {
      unresolved = factories[id];
      if (unresolved) {
        dependencies = unresolved[0];
        factory = unresolved[1];
        loaded[id] = factory.apply(undefined, map(dependencies, function(id) {
          return require(resolve(id));
        }));
      }
    }

    return loaded[id];
  }

// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define('lib/utils', [], function () {
    'use strict';
    var arry = [];
    var DEFAULT_INTERVAL = 100;
    var utils = {
            isDomObj: function (obj) {
                return !!(obj.nodeType || obj === window);
            },
            toArray: function (obj, from) {
                return arry.slice.call(obj, from);
            },
            merge: function () {
                // unpacking arguments by hand benchmarked faster
                var l = arguments.length, i = 0, args = new Array(l + 1);
                for (; i < l; i++)
                    args[i + 1] = arguments[i];
                if (l === 0) {
                    return {};
                }
                //start with empty object so a copy is created
                args[0] = {};
                if (args[args.length - 1] === true) {
                    //jquery extend requires deep copy as first arg
                    args.pop();
                    args.unshift(true);
                }
                return $.extend.apply(undefined, args);
            },
            push: function (base, extra, protect) {
                if (base) {
                    Object.keys(extra || {}).forEach(function (key) {
                        if (base[key] && protect) {
                            throw new Error('utils.push attempted to overwrite "' + key + '" while running in protected mode');
                        }
                        if (typeof base[key] == 'object' && typeof extra[key] == 'object') {
                            // recurse
                            this.push(base[key], extra[key]);
                        } else {
                            // no protect, so extra wins
                            base[key] = extra[key];
                        }
                    }, this);
                }
                return base;
            },
            isEnumerable: function (obj, property) {
                return Object.keys(obj).indexOf(property) > -1;
            },
            compose: function () {
                var funcs = arguments;
                return function () {
                    var args = arguments;
                    for (var i = funcs.length - 1; i >= 0; i--) {
                        args = [funcs[i].apply(this, args)];
                    }
                    return args[0];
                };
            },
            uniqueArray: function (array) {
                var u = {}, a = [];
                for (var i = 0, l = array.length; i < l; ++i) {
                    if (u.hasOwnProperty(array[i])) {
                        continue;
                    }
                    a.push(array[i]);
                    u[array[i]] = 1;
                }
                return a;
            },
            debounce: function (func, wait, immediate) {
                if (typeof wait != 'number') {
                    wait = DEFAULT_INTERVAL;
                }
                var timeout, result;
                return function () {
                    var context = this, args = arguments;
                    var later = function () {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function (func, wait) {
                if (typeof wait != 'number') {
                    wait = DEFAULT_INTERVAL;
                }
                var context, args, timeout, throttling, more, result;
                var whenDone = this.debounce(function () {
                        more = throttling = false;
                    }, wait);
                return function () {
                    context = this;
                    args = arguments;
                    var later = function () {
                        timeout = null;
                        if (more) {
                            result = func.apply(context, args);
                        }
                        whenDone();
                    };
                    if (!timeout) {
                        timeout = setTimeout(later, wait);
                    }
                    if (throttling) {
                        more = true;
                    } else {
                        throttling = true;
                        result = func.apply(context, args);
                    }
                    whenDone();
                    return result;
                };
            },
            countThen: function (num, base) {
                return function () {
                    if (!--num) {
                        return base.apply(this, arguments);
                    }
                };
            },
            delegate: function (rules) {
                return function (e, data) {
                    var target = $(e.target), parent;
                    Object.keys(rules).forEach(function (selector) {
                        if (!e.isPropagationStopped() && (parent = target.closest(selector)).length) {
                            data = data || {};
                            data.el = parent[0];
                            return rules[selector].apply(this, [
                                e,
                                data
                            ]);
                        }
                    }, this);
                };
            },
            once: function (func) {
                var ran, result;
                return function () {
                    if (ran) {
                        return result;
                    }
                    result = func.apply(this, arguments);
                    ran = true;
                    return result;
                };
            }
        };
    return utils;
});
// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define('lib/debug', [], function () {
    'use strict';
    // ==========================================
    // Search object model
    // ==========================================
    function traverse(util, searchTerm, options) {
        options = options || {};
        var obj = options.obj || window;
        var path = options.path || (obj == window ? 'window' : '');
        var props = Object.keys(obj);
        props.forEach(function (prop) {
            if ((tests[util] || util)(searchTerm, obj, prop)) {
                console.log([
                    path,
                    '.',
                    prop
                ].join(''), '->', [
                    '(',
                    typeof obj[prop],
                    ')'
                ].join(''), obj[prop]);
            }
            if (Object.prototype.toString.call(obj[prop]) == '[object Object]' && obj[prop] != obj && path.split('.').indexOf(prop) == -1) {
                traverse(util, searchTerm, {
                    obj: obj[prop],
                    path: [
                        path,
                        prop
                    ].join('.')
                });
            }
        });
    }
    function search(util, expected, searchTerm, options) {
        if (!expected || typeof searchTerm == expected) {
            traverse(util, searchTerm, options);
        } else {
            console.error([
                searchTerm,
                'must be',
                expected
            ].join(' '));
        }
    }
    var tests = {
            'name': function (searchTerm, obj, prop) {
                return searchTerm == prop;
            },
            'nameContains': function (searchTerm, obj, prop) {
                return prop.indexOf(searchTerm) > -1;
            },
            'type': function (searchTerm, obj, prop) {
                return obj[prop] instanceof searchTerm;
            },
            'value': function (searchTerm, obj, prop) {
                return obj[prop] === searchTerm;
            },
            'valueCoerced': function (searchTerm, obj, prop) {
                return obj[prop] == searchTerm;
            }
        };
    function byName(searchTerm, options) {
        search('name', 'string', searchTerm, options);
    }
    function byNameContains(searchTerm, options) {
        search('nameContains', 'string', searchTerm, options);
    }
    function byType(searchTerm, options) {
        search('type', 'function', searchTerm, options);
    }
    function byValue(searchTerm, options) {
        search('value', null, searchTerm, options);
    }
    function byValueCoerced(searchTerm, options) {
        search('valueCoerced', null, searchTerm, options);
    }
    function custom(fn, options) {
        traverse(fn, null, options);
    }
    // ==========================================
    // Event logging
    // ==========================================
    var ALL = 'all';
    //no filter
    //no logging by default
    var defaultEventNamesFilter = [];
    var defaultActionsFilter = [];
    var logFilter = retrieveLogFilter();
    function filterEventLogsByAction() {
        var actions = [].slice.call(arguments);
        logFilter.eventNames.length || (logFilter.eventNames = ALL);
        logFilter.actions = actions.length ? actions : ALL;
        saveLogFilter();
    }
    function filterEventLogsByName() {
        var eventNames = [].slice.call(arguments);
        logFilter.actions.length || (logFilter.actions = ALL);
        logFilter.eventNames = eventNames.length ? eventNames : ALL;
        saveLogFilter();
    }
    function hideAllEventLogs() {
        logFilter.actions = [];
        logFilter.eventNames = [];
        saveLogFilter();
    }
    function showAllEventLogs() {
        logFilter.actions = ALL;
        logFilter.eventNames = ALL;
        saveLogFilter();
    }
    function saveLogFilter() {
        if (window.localStorage) {
            localStorage.setItem('logFilter_eventNames', logFilter.eventNames);
            localStorage.setItem('logFilter_actions', logFilter.actions);
        }
    }
    function retrieveLogFilter() {
        var result = {
                eventNames: window.localStorage && localStorage.getItem('logFilter_eventNames') || defaultEventNamesFilter,
                actions: window.localStorage && localStorage.getItem('logFilter_actions') || defaultActionsFilter
            };
        // reconstitute arrays
        Object.keys(result).forEach(function (k) {
            var thisProp = result[k];
            if (typeof thisProp == 'string' && thisProp !== ALL) {
                result[k] = thisProp.split(',');
            }
        });
        return result;
    }
    return {
        enable: function (enable) {
            this.enabled = !!enable;
            if (enable && window.console) {
                console.info('Booting in DEBUG mode');
                console.info('You can configure event logging with DEBUG.events.logAll()/logNone()/logByName()/logByAction()');
            }
            window.DEBUG = this;
        },
        find: {
            byName: byName,
            byNameContains: byNameContains,
            byType: byType,
            byValue: byValue,
            byValueCoerced: byValueCoerced,
            custom: custom
        },
        events: {
            logFilter: logFilter,
            logByAction: filterEventLogsByAction,
            logByName: filterEventLogsByName,
            logAll: showAllEventLogs,
            logNone: hideAllEventLogs
        }
    };
});
// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define('lib/compose', [
    './utils',
    './debug'
], function (utils, debug) {
    'use strict';
    //enumerables are shims - getOwnPropertyDescriptor shim doesn't work
    var canWriteProtect = debug.enabled && !utils.isEnumerable(Object, 'getOwnPropertyDescriptor');
    //whitelist of unlockable property names
    var dontLock = ['mixedIn'];
    if (canWriteProtect) {
        //IE8 getOwnPropertyDescriptor is built-in but throws exeption on non DOM objects
        try {
            Object.getOwnPropertyDescriptor(Object, 'keys');
        } catch (e) {
            canWriteProtect = false;
        }
    }
    function setPropertyWritability(obj, isWritable) {
        if (!canWriteProtect) {
            return;
        }
        var props = Object.create(null);
        Object.keys(obj).forEach(function (key) {
            if (dontLock.indexOf(key) < 0) {
                var desc = Object.getOwnPropertyDescriptor(obj, key);
                desc.writable = isWritable;
                props[key] = desc;
            }
        });
        Object.defineProperties(obj, props);
    }
    function unlockProperty(obj, prop, op) {
        var writable;
        if (!canWriteProtect || !obj.hasOwnProperty(prop)) {
            op.call(obj);
            return;
        }
        writable = Object.getOwnPropertyDescriptor(obj, prop).writable;
        Object.defineProperty(obj, prop, { writable: true });
        op.call(obj);
        Object.defineProperty(obj, prop, { writable: writable });
    }
    function mixin(base, mixins) {
        base.mixedIn = base.hasOwnProperty('mixedIn') ? base.mixedIn : [];
        mixins.forEach(function (mixin) {
            if (base.mixedIn.indexOf(mixin) == -1) {
                setPropertyWritability(base, false);
                mixin.call(base);
                base.mixedIn.push(mixin);
            }
        });
        setPropertyWritability(base, true);
    }
    return {
        mixin: mixin,
        unlockProperty: unlockProperty
    };
});
// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define('lib/advice', ['./compose'], function (compose) {
    'use strict';
    var advice = {
            around: function (base, wrapped) {
                return function composedAround() {
                    // unpacking arguments by hand benchmarked faster
                    var i = 0, l = arguments.length, args = new Array(l + 1);
                    args[0] = base.bind(this);
                    for (; i < l; i++)
                        args[i + 1] = arguments[i];
                    return wrapped.apply(this, args);
                };
            },
            before: function (base, before) {
                var beforeFn = typeof before == 'function' ? before : before.obj[before.fnName];
                return function composedBefore() {
                    beforeFn.apply(this, arguments);
                    return base.apply(this, arguments);
                };
            },
            after: function (base, after) {
                var afterFn = typeof after == 'function' ? after : after.obj[after.fnName];
                return function composedAfter() {
                    var res = (base.unbound || base).apply(this, arguments);
                    afterFn.apply(this, arguments);
                    return res;
                };
            },
            withAdvice: function () {
                [
                    'before',
                    'after',
                    'around'
                ].forEach(function (m) {
                    this[m] = function (method, fn) {
                        compose.unlockProperty(this, method, function () {
                            if (typeof this[method] == 'function') {
                                this[method] = advice[m](this[method], fn);
                            } else {
                                this[method] = fn;
                            }
                            return this[method];
                        });
                    };
                }, this);
            }
        };
    return advice;
});
// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define('lib/registry', [], function () {
    'use strict';
    function parseEventArgs(instance, args) {
        var element, type, callback;
        var end = args.length;
        if (typeof args[end - 1] === 'function') {
            end -= 1;
            callback = args[end];
        }
        if (typeof args[end - 1] === 'object') {
            end -= 1;
        }
        if (end == 2) {
            element = args[0];
            type = args[1];
        } else {
            element = instance.node;
            type = args[0];
        }
        return {
            element: element,
            type: type,
            callback: callback
        };
    }
    function matchEvent(a, b) {
        return a.element == b.element && a.type == b.type && (b.callback == null || a.callback == b.callback);
    }
    function Registry() {
        var registry = this;
        (this.reset = function () {
            this.components = [];
            this.allInstances = {};
            this.events = [];
        }).call(this);
        function ComponentInfo(component) {
            this.component = component;
            this.attachedTo = [];
            this.instances = {};
            this.addInstance = function (instance) {
                var instanceInfo = new InstanceInfo(instance);
                this.instances[instance.identity] = instanceInfo;
                this.attachedTo.push(instance.node);
                return instanceInfo;
            };
            this.removeInstance = function (instance) {
                delete this.instances[instance.identity];
                var indexOfNode = this.attachedTo.indexOf(instance.node);
                indexOfNode > -1 && this.attachedTo.splice(indexOfNode, 1);
                if (!Object.keys(this.instances).length) {
                    //if I hold no more instances remove me from registry
                    registry.removeComponentInfo(this);
                }
            };
            this.isAttachedTo = function (node) {
                return this.attachedTo.indexOf(node) > -1;
            };
        }
        function InstanceInfo(instance) {
            this.instance = instance;
            this.events = [];
            this.addBind = function (event) {
                this.events.push(event);
                registry.events.push(event);
            };
            this.removeBind = function (event) {
                for (var i = 0, e; e = this.events[i]; i++) {
                    if (matchEvent(e, event)) {
                        this.events.splice(i, 1);
                    }
                }
            };
        }
        this.addInstance = function (instance) {
            var component = this.findComponentInfo(instance);
            if (!component) {
                component = new ComponentInfo(instance.constructor);
                this.components.push(component);
            }
            var inst = component.addInstance(instance);
            this.allInstances[instance.identity] = inst;
            return component;
        };
        this.removeInstance = function (instance) {
            var index, instInfo = this.findInstanceInfo(instance);
            //remove from component info
            var componentInfo = this.findComponentInfo(instance);
            componentInfo && componentInfo.removeInstance(instance);
            //remove from registry
            delete this.allInstances[instance.identity];
        };
        this.removeComponentInfo = function (componentInfo) {
            var index = this.components.indexOf(componentInfo);
            index > -1 && this.components.splice(index, 1);
        };
        this.findComponentInfo = function (which) {
            var component = which.attachTo ? which : which.constructor;
            for (var i = 0, c; c = this.components[i]; i++) {
                if (c.component === component) {
                    return c;
                }
            }
            return null;
        };
        this.findInstanceInfo = function (instance) {
            return this.allInstances[instance.identity] || null;
        };
        this.getBoundEventNames = function (instance) {
            return this.findInstanceInfo(instance).events.map(function (ev) {
                return ev.type;
            });
        };
        this.findInstanceInfoByNode = function (node) {
            var result = [];
            Object.keys(this.allInstances).forEach(function (k) {
                var thisInstanceInfo = this.allInstances[k];
                if (thisInstanceInfo.instance.node === node) {
                    result.push(thisInstanceInfo);
                }
            }, this);
            return result;
        };
        this.on = function (componentOn) {
            var instance = registry.findInstanceInfo(this), boundCallback;
            // unpacking arguments by hand benchmarked faster
            var l = arguments.length, i = 1;
            var otherArgs = new Array(l - 1);
            for (; i < l; i++)
                otherArgs[i - 1] = arguments[i];
            if (instance) {
                boundCallback = componentOn.apply(null, otherArgs);
                if (boundCallback) {
                    otherArgs[otherArgs.length - 1] = boundCallback;
                }
                var event = parseEventArgs(this, otherArgs);
                instance.addBind(event);
            }
        };
        this.off = function () {
            var event = parseEventArgs(this, arguments), instance = registry.findInstanceInfo(this);
            if (instance) {
                instance.removeBind(event);
            }
            //remove from global event registry
            for (var i = 0, e; e = registry.events[i]; i++) {
                if (matchEvent(e, event)) {
                    registry.events.splice(i, 1);
                }
            }
        };
        // debug tools may want to add advice to trigger
        registry.trigger = function () {
        };
        this.teardown = function () {
            registry.removeInstance(this);
        };
        this.withRegistration = function () {
            this.after('initialize', function () {
                registry.addInstance(this);
            });
            this.around('on', registry.on);
            this.after('off', registry.off);
            //debug tools may want to add advice to trigger
            window.DEBUG && DEBUG.enabled && this.after('trigger', registry.trigger);
            this.after('teardown', {
                obj: registry,
                fnName: 'teardown'
            });
        };
    }
    return new Registry();
});
// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define('lib/base', [
    './utils',
    './registry',
    './debug'
], function (utils, registry, debug) {
    'use strict';
    // common mixin allocates basic functionality - used by all component prototypes
    // callback context is bound to component
    var componentId = 0;
    function teardownInstance(instanceInfo) {
        instanceInfo.events.slice().forEach(function (event) {
            var args = [event.type];
            event.element && args.unshift(event.element);
            typeof event.callback == 'function' && args.push(event.callback);
            this.off.apply(this, args);
        }, instanceInfo.instance);
    }
    function checkSerializable(type, data) {
        try {
            window.postMessage(data, '*');
        } catch (e) {
            console.log('unserializable data for event', type, ':', data);
            throw new Error([
                'The event',
                type,
                'on component',
                this.toString(),
                'was triggered with non-serializable data'
            ].join(' '));
        }
    }
    function proxyEventTo(targetEvent) {
        return function (e, data) {
            $(e.target).trigger(targetEvent, data);
        };
    }
    function withBase() {
        // delegate trigger, bind and unbind to an element
        // if $element not supplied, use component's node
        // other arguments are passed on
        // event can be either a string specifying the type
        // of the event, or a hash specifying both the type
        // and a default function to be called.
        this.trigger = function () {
            var $element, type, data, event, defaultFn;
            var lastIndex = arguments.length - 1, lastArg = arguments[lastIndex];
            if (typeof lastArg != 'string' && !(lastArg && lastArg.defaultBehavior)) {
                lastIndex--;
                data = lastArg;
            }
            if (lastIndex == 1) {
                $element = $(arguments[0]);
                event = arguments[1];
            } else {
                $element = this.$node;
                event = arguments[0];
            }
            if (event.defaultBehavior) {
                defaultFn = event.defaultBehavior;
                event = $.Event(event.type);
            }
            type = event.type || event;
            if (debug.enabled && window.postMessage) {
                checkSerializable.call(this, type, data);
            }
            if (typeof this.attr.eventData === 'object') {
                data = $.extend(true, {}, this.attr.eventData, data);
            }
            $element.trigger(event || type, data);
            if (defaultFn && !event.isDefaultPrevented()) {
                (this[defaultFn] || defaultFn).call(this);
            }
            return $element;
        };
        this.on = function () {
            var $element, type, callback, originalCb;
            var lastIndex = arguments.length - 1, origin = arguments[lastIndex];
            if (typeof origin == 'object') {
                //delegate callback
                originalCb = utils.delegate(this.resolveDelegateRules(origin));
            } else if (typeof origin == 'string') {
                originalCb = proxyEventTo(origin);
            } else {
                originalCb = origin;
            }
            if (lastIndex == 2) {
                $element = $(arguments[0]);
                type = arguments[1];
            } else {
                $element = this.$node;
                type = arguments[0];
            }
            if (typeof originalCb != 'function' && typeof originalCb != 'object') {
                throw new Error('Unable to bind to "' + type + '" because the given callback is not a function or an object');
            }
            callback = originalCb.bind(this);
            callback.target = originalCb;
            callback.context = this;
            $element.on(type, callback);
            // store every bound version of the callback
            originalCb.bound || (originalCb.bound = []);
            originalCb.bound.push(callback);
            return callback;
        };
        this.off = function () {
            var $element, type, callback;
            var lastIndex = arguments.length - 1;
            if (typeof arguments[lastIndex] == 'function') {
                callback = arguments[lastIndex];
                lastIndex -= 1;
            }
            if (lastIndex == 1) {
                $element = $(arguments[0]);
                type = arguments[1];
            } else {
                $element = this.$node;
                type = arguments[0];
            }
            if (callback) {
                //this callback may be the original function or a bound version
                var boundFunctions = callback.target ? callback.target.bound : callback.bound || [];
                //set callback to version bound against this instance
                boundFunctions && boundFunctions.some(function (fn, i, arr) {
                    if (fn.context && this.identity == fn.context.identity) {
                        arr.splice(i, 1);
                        callback = fn;
                        return true;
                    }
                }, this);
            }
            return $element.off(type, callback);
        };
        this.resolveDelegateRules = function (ruleInfo) {
            var rules = {};
            Object.keys(ruleInfo).forEach(function (r) {
                if (!(r in this.attr)) {
                    throw new Error('Component "' + this.toString() + '" wants to listen on "' + r + '" but no such attribute was defined.');
                }
                rules[this.attr[r]] = typeof ruleInfo[r] == 'string' ? proxyEventTo(ruleInfo[r]) : ruleInfo[r];
            }, this);
            return rules;
        };
        this.defaultAttrs = function (defaults) {
            utils.push(this.defaults, defaults, true) || (this.defaults = defaults);
        };
        this.select = function (attributeKey) {
            return this.$node.find(this.attr[attributeKey]);
        };
        this.initialize = function (node, attrs) {
            attrs || (attrs = {});
            //only assign identity if there isn't one (initialize can be called multiple times)
            this.identity || (this.identity = componentId++);
            if (!node) {
                throw new Error('Component needs a node');
            }
            if (node.jquery) {
                this.node = node[0];
                this.$node = node;
            } else {
                this.node = node;
                this.$node = $(node);
            }
            // merge defaults with supplied options
            // put options in attr.__proto__ to avoid merge overhead
            var attr = Object.create(attrs);
            for (var key in this.defaults) {
                if (!attrs.hasOwnProperty(key)) {
                    attr[key] = this.defaults[key];
                }
            }
            this.attr = attr;
            Object.keys(this.defaults || {}).forEach(function (key) {
                if (this.defaults[key] === null && this.attr[key] === null) {
                    throw new Error('Required attribute "' + key + '" not specified in attachTo for component "' + this.toString() + '".');
                }
            }, this);
            return this;
        };
        this.teardown = function () {
            teardownInstance(registry.findInstanceInfo(this));
        };
    }
    return withBase;
});
// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define('lib/logger', ['./utils'], function (utils) {
    'use strict';
    var actionSymbols = {
            on: '<-',
            trigger: '->',
            off: 'x '
        };
    function elemToString(elem) {
        var tagStr = elem.tagName ? elem.tagName.toLowerCase() : elem.toString();
        var classStr = elem.className ? '.' + elem.className : '';
        var result = tagStr + classStr;
        return elem.tagName ? [
            '\'',
            '\''
        ].join(result) : result;
    }
    function log(action, component, eventArgs) {
        if (!window.DEBUG || !window.DEBUG.enabled)
            return;
        var name, eventType, elem, fn, payload, logFilter, toRegExp, actionLoggable, nameLoggable, info;
        if (typeof eventArgs[eventArgs.length - 1] == 'function') {
            fn = eventArgs.pop();
            fn = fn.unbound || fn;    // use unbound version if any (better info)
        }
        if (eventArgs.length == 1) {
            elem = component.$node[0];
            eventType = eventArgs[0];
        } else if (eventArgs.length == 2 && typeof eventArgs[1] == 'object' && !eventArgs[1].type) {
            //2 args, first arg is not elem
            elem = component.$node[0];
            eventType = eventArgs[0];
            if (action == 'trigger') {
                payload = eventArgs[1];
            }
        } else {
            //2+ args, first arg is elem
            elem = eventArgs[0];
            eventType = eventArgs[1];
            if (action == 'trigger') {
                payload = eventArgs[2];
            }
        }
        name = typeof eventType == 'object' ? eventType.type : eventType;
        logFilter = DEBUG.events.logFilter;
        // no regex for you, actions...
        actionLoggable = logFilter.actions == 'all' || logFilter.actions.indexOf(action) > -1;
        // event name filter allow wildcards or regex...
        toRegExp = function (expr) {
            return expr.test ? expr : new RegExp('^' + expr.replace(/\*/g, '.*') + '$');
        };
        nameLoggable = logFilter.eventNames == 'all' || logFilter.eventNames.some(function (e) {
            return toRegExp(e).test(name);
        });
        if (actionLoggable && nameLoggable) {
            info = [
                actionSymbols[action],
                action,
                '[' + name + ']'
            ];
            payload && info.push(payload);
            info.push(elemToString(elem));
            info.push(component.constructor.describe.split(' ').slice(0, 3).join(' '));
            console.info.apply(console, info);
        }
    }
    function withLogging() {
        this.before('trigger', function () {
            log('trigger', this, utils.toArray(arguments));
        });
        this.before('on', function () {
            log('on', this, utils.toArray(arguments));
        });
        this.before('off', function () {
            log('off', this, utils.toArray(arguments));
        });
    }
    return withLogging;
});
// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define('lib/component', [
    './advice',
    './utils',
    './compose',
    './base',
    './registry',
    './logger',
    './debug'
], function (advice, utils, compose, withBase, registry, withLogging, debug) {
    'use strict';
    var functionNameRegEx = /function (.*?)\s?\(/;
    // teardown for all instances of this constructor
    function teardownAll() {
        var componentInfo = registry.findComponentInfo(this);
        componentInfo && Object.keys(componentInfo.instances).forEach(function (k) {
            var info = componentInfo.instances[k];
            // It's possible that a previous teardown caused another component to teardown,
            // so we can't assume that the instances object is as it was.
            if (info && info.instance) {
                info.instance.teardown();
            }
        });
    }
    function checkSerializable(type, data) {
        try {
            window.postMessage(data, '*');
        } catch (e) {
            console.log('unserializable data for event', type, ':', data);
            throw new Error([
                'The event',
                type,
                'on component',
                this.toString(),
                'was triggered with non-serializable data'
            ].join(' '));
        }
    }
    function attachTo(selector) {
        // unpacking arguments by hand benchmarked faster
        var l = arguments.length;
        var args = new Array(l - 1);
        for (var i = 1; i < l; i++)
            args[i - 1] = arguments[i];
        if (!selector) {
            throw new Error('Component needs to be attachTo\'d a jQuery object, native node or selector string');
        }
        var options = utils.merge.apply(utils, args);
        var componentInfo = registry.findComponentInfo(this);
        $(selector).each(function (i, node) {
            if (componentInfo && componentInfo.isAttachedTo(node)) {
                // already attached
                return;
            }
            new this().initialize(node, options);
        }.bind(this));
    }
    // define the constructor for a custom component type
    // takes an unlimited number of mixin functions as arguments
    // typical api call with 3 mixins: define(timeline, withTweetCapability, withScrollCapability);
    function define() {
        // unpacking arguments by hand benchmarked faster
        var l = arguments.length;
        // add three for common mixins
        var mixins = new Array(l + 3);
        for (var i = 0; i < l; i++)
            mixins[i] = arguments[i];
        var Component = function () {
        };
        Component.toString = Component.prototype.toString = function () {
            var prettyPrintMixins = mixins.map(function (mixin) {
                    if (mixin.name == null) {
                        // function name property not supported by this browser, use regex
                        var m = mixin.toString().match(functionNameRegEx);
                        return m && m[1] ? m[1] : '';
                    } else {
                        return mixin.name != 'withBase' ? mixin.name : '';
                    }
                }).filter(Boolean).join(', ');
            return prettyPrintMixins;
        };
        if (debug.enabled) {
            Component.describe = Component.prototype.describe = Component.toString();
        }
        // 'options' is optional hash to be merged with 'defaults' in the component definition
        Component.attachTo = attachTo;
        Component.teardownAll = teardownAll;
        // prepend common mixins to supplied list, then mixin all flavors
        if (debug.enabled) {
            mixins.unshift(withLogging);
        }
        mixins.unshift(withBase, advice.withAdvice, registry.withRegistration);
        compose.mixin(Component.prototype, mixins);
        return Component;
    }
    define.teardownAll = function () {
        registry.components.slice().forEach(function (c) {
            c.component.teardownAll();
        });
        registry.reset();
    };
    return define;
});
// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define('lib/index', [
    './advice',
    './component',
    './compose',
    './logger',
    './registry',
    './utils'
], function (advice, component, compose, logger, registry, utils) {
    'use strict';
    return {
        advice: advice,
        component: component,
        compose: compose,
        logger: logger,
        registry: registry,
        utils: utils
    };
});

  context.flight = require('lib/index');
}(this));
