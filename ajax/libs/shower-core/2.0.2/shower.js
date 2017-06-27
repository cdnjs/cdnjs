/**
 * Modules
 *
 * Copyright (c) 2013 Filatov Dmitry (dfilatov@yandex-team.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @version 0.1.2
 */

(function(global) {

var undef,

    DECL_STATES = {
        NOT_RESOLVED : 'NOT_RESOLVED',
        IN_RESOLVING : 'IN_RESOLVING',
        RESOLVED     : 'RESOLVED'
    },

    /**
     * Creates a new instance of modular system
     * @returns {Object}
     */
    create = function() {
        var curOptions = {
                trackCircularDependencies : true,
                allowMultipleDeclarations : true
            },

            modulesStorage = {},
            waitForNextTick = false,
            pendingRequires = [],

            /**
             * Defines module
             * @param {String} name
             * @param {String[]} [deps]
             * @param {Function} declFn
             */
            define = function(name, deps, declFn) {
                if(!declFn) {
                    declFn = deps;
                    deps = [];
                }

                var module = modulesStorage[name];
                if(!module) {
                    module = modulesStorage[name] = {
                        name : name,
                        decl : undef
                    };
                }

                module.decl = {
                    name       : name,
                    prev       : module.decl,
                    fn         : declFn,
                    state      : DECL_STATES.NOT_RESOLVED,
                    deps       : deps,
                    dependents : [],
                    exports    : undef
                };
            },

            /**
             * Requires modules
             * @param {String|String[]} modules
             * @param {Function} cb
             * @param {Function} [errorCb]
             */
            require = function(modules, cb, errorCb) {
                if(typeof modules === 'string') {
                    modules = [modules];
                }

                if(!waitForNextTick) {
                    waitForNextTick = true;
                    nextTick(onNextTick);
                }

                pendingRequires.push({
                    deps : modules,
                    cb   : function(exports, error) {
                        error?
                            (errorCb || onError)(error) :
                            cb.apply(global, exports);
                    }
                });
            },

            /**
             * Returns state of module
             * @param {String} name
             * @returns {String} state, possible values are NOT_DEFINED, NOT_RESOLVED, IN_RESOLVING, RESOLVED
             */
            getState = function(name) {
                var module = modulesStorage[name];
                return module?
                    DECL_STATES[module.decl.state] :
                    'NOT_DEFINED';
            },

            /**
             * Returns whether the module is defined
             * @param {String} name
             * @returns {Boolean}
             */
            isDefined = function(name) {
                return !!modulesStorage[name];
            },

            /**
             * Sets options
             * @param {Object} options
             */
            setOptions = function(options) {
                for(var name in options) {
                    if(options.hasOwnProperty(name)) {
                        curOptions[name] = options[name];
                    }
                }
            },

            getStat = function() {
                var res = {},
                    module;

                for(var name in modulesStorage) {
                    if(modulesStorage.hasOwnProperty(name)) {
                        module = modulesStorage[name];
                        (res[module.decl.state] || (res[module.decl.state] = [])).push(name);
                    }
                }

                return res;
            },

            onNextTick = function() {
                waitForNextTick = false;
                applyRequires();
            },

            applyRequires = function() {
                var requiresToProcess = pendingRequires,
                    i = 0, require;

                pendingRequires = [];

                while(require = requiresToProcess[i++]) {
                    requireDeps(null, require.deps, [], require.cb);
                }
            },

            requireDeps = function(fromDecl, deps, path, cb) {
                var unresolvedDepsCnt = deps.length;
                if(!unresolvedDepsCnt) {
                    cb([]);
                }

                var decls = [],
                    onDeclResolved = function(_, error) {
                        if(error) {
                            cb(null, error);
                            return;
                        }

                        if(!--unresolvedDepsCnt) {
                            var exports = [],
                                i = 0, decl;
                            while(decl = decls[i++]) {
                                exports.push(decl.exports);
                            }
                            cb(exports);
                        }
                    },
                    i = 0, len = unresolvedDepsCnt,
                    dep, decl;

                while(i < len) {
                    dep = deps[i++];
                    if(typeof dep === 'string') {
                        if(!modulesStorage[dep]) {
                            cb(null, buildModuleNotFoundError(dep, fromDecl));
                            return;
                        }

                        decl = modulesStorage[dep].decl;
                    }
                    else {
                        decl = dep;
                    }

                    decls.push(decl);

                    startDeclResolving(decl, path, onDeclResolved);
                }
            },

            startDeclResolving = function(decl, path, cb) {
                if(decl.state === DECL_STATES.RESOLVED) {
                    cb(decl.exports);
                    return;
                }
                else if(decl.state === DECL_STATES.IN_RESOLVING) {
                    curOptions.trackCircularDependencies && isDependenceCircular(decl, path)?
                        cb(null, buildCircularDependenceError(decl, path)) :
                        decl.dependents.push(cb);
                    return;
                }

                decl.dependents.push(cb);

                if(decl.prev && !curOptions.allowMultipleDeclarations) {
                    provideError(decl, buildMultipleDeclarationError(decl));
                    return;
                }

                curOptions.trackCircularDependencies && (path = path.slice()).push(decl);

                var isProvided = false,
                    deps = decl.prev? decl.deps.concat([decl.prev]) : decl.deps;

                decl.state = DECL_STATES.IN_RESOLVING;
                requireDeps(
                    decl,
                    deps,
                    path,
                    function(depDeclsExports, error) {
                        if(error) {
                            provideError(decl, error);
                            return;
                        }

                        depDeclsExports.unshift(function(exports, error) {
                            if(isProvided) {
                                cb(null, buildDeclAreadyProvidedError(decl));
                                return;
                            }

                            isProvided = true;
                            error?
                                provideError(decl, error) :
                                provideDecl(decl, exports);
                        });

                        decl.fn.apply(
                            {
                                name   : decl.name,
                                deps   : decl.deps,
                                global : global
                            },
                            depDeclsExports);
                    });
            },

            provideDecl = function(decl, exports) {
                decl.exports = exports;
                decl.state = DECL_STATES.RESOLVED;

                var i = 0, dependent;
                while(dependent = decl.dependents[i++]) {
                    dependent(exports);
                }

                decl.dependents = undef;
            },

            provideError = function(decl, error) {
                decl.state = DECL_STATES.NOT_RESOLVED;

                var i = 0, dependent;
                while(dependent = decl.dependents[i++]) {
                    dependent(null, error);
                }

                decl.dependents = [];
            };

        return {
            create     : create,
            define     : define,
            require    : require,
            getState   : getState,
            isDefined  : isDefined,
            setOptions : setOptions,
            getStat    : getStat
        };
    },

    onError = function(e) {
        nextTick(function() {
            throw e;
        });
    },

    buildModuleNotFoundError = function(name, decl) {
        return Error(decl?
            'Module "' + decl.name + '": can\'t resolve dependence "' + name + '"' :
            'Required module "' + name + '" can\'t be resolved');
    },

    buildCircularDependenceError = function(decl, path) {
        var strPath = [],
            i = 0, pathDecl;
        while(pathDecl = path[i++]) {
            strPath.push(pathDecl.name);
        }
        strPath.push(decl.name);

        return Error('Circular dependence has been detected: "' + strPath.join(' -> ') + '"');
    },

    buildDeclAreadyProvidedError = function(decl) {
        return Error('Declaration of module "' + decl.name + '" has already been provided');
    },

    buildMultipleDeclarationError = function(decl) {
        return Error('Multiple declarations of module "' + decl.name + '" have been detected');
    },

    isDependenceCircular = function(decl, path) {
        var i = 0, pathDecl;
        while(pathDecl = path[i++]) {
            if(decl === pathDecl) {
                return true;
            }
        }
        return false;
    },

    nextTick = (function() {
        var fns = [],
            enqueueFn = function(fn) {
                return fns.push(fn) === 1;
            },
            callFns = function() {
                var fnsToCall = fns, i = 0, len = fns.length;
                fns = [];
                while(i < len) {
                    fnsToCall[i++]();
                }
            };

        if(typeof process === 'object' && process.nextTick) { // nodejs
            return function(fn) {
                enqueueFn(fn) && process.nextTick(callFns);
            };
        }

        if(global.setImmediate) { // ie10
            return function(fn) {
                enqueueFn(fn) && global.setImmediate(callFns);
            };
        }

        if(global.postMessage && !global.opera) { // modern browsers
            var isPostMessageAsync = true;
            if(global.attachEvent) {
                var checkAsync = function() {
                        isPostMessageAsync = false;
                    };
                global.attachEvent('onmessage', checkAsync);
                global.postMessage('__checkAsync', '*');
                global.detachEvent('onmessage', checkAsync);
            }

            if(isPostMessageAsync) {
                var msg = '__modules' + (+new Date()),
                    onMessage = function(e) {
                        if(e.data === msg) {
                            e.stopPropagation && e.stopPropagation();
                            callFns();
                        }
                    };

                global.addEventListener?
                    global.addEventListener('message', onMessage, true) :
                    global.attachEvent('onmessage', onMessage);

                return function(fn) {
                    enqueueFn(fn) && global.postMessage(msg, '*');
                };
            }
        }

        var doc = global.document;
        if('onreadystatechange' in doc.createElement('script')) { // ie6-ie8
            var head = doc.getElementsByTagName('head')[0],
                createScript = function() {
                    var script = doc.createElement('script');
                    script.onreadystatechange = function() {
                        script.parentNode.removeChild(script);
                        script = script.onreadystatechange = null;
                        callFns();
                    };
                    head.appendChild(script);
                };

            return function(fn) {
                enqueueFn(fn) && createScript();
            };
        }

        return function(fn) { // old browsers
            enqueueFn(fn) && setTimeout(callFns, 0);
        };
    })();

if(typeof exports === 'object') {
    module.exports = create();
}
else {
    global.modules = create();
}

})(typeof window !== 'undefined' ? window : global);

(function (global) {
    var dataAttrsOptions = [
        'debug-mode',
        'slides-selector',
        'hotkeys'
    ];

    global.shower = {
        modules: modules.create(),
        options: global.showerOptions || {}
    };

    document.addEventListener('DOMContentLoaded', function () {
        global.shower.modules.require('shower.defaultOptions', function (defaultOptions) {
            var hasOptions = global.hasOwnProperty('showerOptions');
            var options = global.shower.options;
            var containerSelector = options.shower_selector || defaultOptions.container_selector;
            var element = document.querySelector(containerSelector);
            var getDataAttr = getData.bind(this, element);
            var autoInit = typeof options.auto_init !== 'undefined' ?
                options.auto_init : true;

            if (!element) {
                throw new Error('Shower element with selector ' + containerSelector + ' not found.');
            }

            if (getDataAttr('auto-init') !== 'false' || (hasOptions && autoInit)) {
                if (!hasOptions) {
                    dataAttrsOptions.forEach(function (name) {
                        var value = getDataAttr(name);
                        // Null for getAttr, undefined for dataset.
                        if (value !== null && typeof value !== 'undefined') {
                            options[name.replace(/-/g, '_')] = value;
                        }
                    });
                }

                global.shower.modules.require(['shower'], function (sh) {
                    sh.init({
                        container: element,
                        options: options
                    });
                });
            }
        });
    }, false);

    /**
     * Get data-attr value.
     * @param {HTMLElement} element
     * @param {String} name Data property
     * @returns {Object}
     */
    function getData(element, name) {
        return element.dataset ?
            element.dataset[name] :
            element.getAttribute('data-' + name);
    }
})(window);

shower.modules.define('shower', [
    'shower.global'
], function (provide, showerGlobal) {
    provide(showerGlobal);
});

/**
 * @file Event emitter.
 */
shower.modules.define('Emitter', [
    'emitter.Event',
    'emitter.EventGroup',
    'util.extend'
], function (provide, EmitterEvent, EventGroup, extend) {

    /**
     * @class
     * @name emitter.Emitter
     *
     * Event emitter. Handle events, emit custom events and other.
     *
     * @param {object} [parameters]
     * @param {object} [parameters.context]
     * @param {object} [parameters.parent]
     */
    function EventEmitter(parameters) {
        parameters = parameters || {};

        this._context = parameters.context;
        this._parent = parameters.parent;

        this._listeners = {};
    }

    extend(EventEmitter.prototype, /** @lends Emitter.prototype */ {

        /**
         * Add event (events) listener.
         *
         * @param {(string | string[])} types Event name or array of event names.
         * @param {function} callback
         * @param {object} [context] Callback context.
         * @param {number} [priority = 0]
         * @returns {Emitter}
         */
        on: function (types, callback, context, priority) {
            if (typeof callback === 'undefined') {
                throw new Error('Callback is not defined.');
            }

            priority = priority || 0;

            if (typeof types === 'string') {
                this._addListener(types, callback, context, priority);
            } else {
                for (var i = 0, l = types.length; i < l; i++) {
                    this._addListener(types[i], callback, context, priority);
                }
            }
            return this;
        },

        /**
         * Remove event (events) listener.
         *
         * @param {(string|string[])} types Event name or array of event names.
         * @param {function} callback
         * @param {object} [context] Callback context.
         * @param {number} [priority = 0]
         * @returns {Emitter}
         */
        off: function (types, callback, context, priority) {
            priority = priority || 0;

            if (typeof types == 'string') {
                this._removeListener(types, callback, context, priority);
            } else {
                for (var i = 0, l = types.length; i < l; i++) {
                    this._removeListener(types[i], callback, context, priority);
                }
            }

            return this;
        },

        /**
         * Add event listener. Callback will run once and after remove auto.
         *
         * @param {(string|string[])} eventType Event name or array of event names.
         * @param {function} callback
         * @param {object} [context] Callback context.
         * @returns {Emitter}
         */
        once: function (eventType, callback, context, priority) {
            var handler = function (event) {
                this.off(eventType, handler, this, priority);
                if (context) {
                    callback.call(context, event);
                } else {
                    callback(event);
                }
            };
            this.on(eventType, handler, this, priority);
            return this;
        },

        /**
         * Fire all handlers who listen that event type.
         *
         * @param {string} eventType
         * @param {(event.Event|object)} eventObject
         */
        emit: function (eventType, eventObject) {
            var event = eventObject;
            var listeners = this._listeners;

            if (!event || typeof event.get != 'function') {
                event = this.createEventObject(eventType, eventObject, this._context);
            }

            if (!event.isPropagationStopped()) {
                if (listeners.hasOwnProperty(eventType)) {
                    this._callListeners(listeners[eventType], event);
                }

                if (this._parent && !event.isPropagationStopped()) {
                    this._parent.emit(eventType, event);
                }
            }
        },

        /**
         * @param {string} type
         * @param {object} eventData
         * @param {object} target
         */
        createEventObject: function (type, eventData, target) {
            var data = {
                target: target,
                type: type
            };

            return new EmitterEvent(eventData ? extend(data, eventData) : data);
        },

        /**
         * @param {Emitter} parent
         */
        setParent: function (parent) {
            if (this._parent != parent) {
                this._parent = parent;
            }
        },

        /**
         * @returns {(Emitter|null)}
         */
        getParent: function () {
            return this._parent;
        },

        group: function () {
            return new EventGroup(this);
        },

        _addListener: function (eventType, callback, context, priority) {
            var listener = {
                callback: callback,
                context: context,
                priority: priority
            };

            if (this._listeners[eventType]) {
                this._listeners[eventType].push(listener);
            } else {
                this._listeners[eventType] = [listener];
            }
        },

        _removeListener: function (eventType, callback, context, priority) {
            var listeners = this._listeners[eventType];
            var listener;

            if (listeners) {
                var foundIndex = -1;
                for (var i = 0, l = listeners.length; i < l; i++) {
                    listener = listeners[i];

                    if (listener.callback == callback &&
                        listener.context == context &&
                        listener.priority == priority) {

                        foundIndex = i;
                    }
                }

                if (foundIndex != -1) {
                    if (listeners.length == 1) {
                        this._clearType(eventType);
                    } else {
                        listeners.splice(foundIndex, 1);
                    }
                }
            }
        },

        /**
         * @ignore
         * @param {string} eventType
         */
        _clearType: function (eventType) {
            if (this._listeners.hasOwnProperty(eventType)) {
                delete this._listeners[eventType];
            }
        },

        _callListeners: function (listeners, event) {
            var i = listeners.length - 1;

            // Sort listeners by priority
            listeners.sort(sortByPriority);

            while (i >= 0 && !event.defaultPrevented()) {
                var listener = listeners[i];
                if (listener) {
                    if (listener.context) {
                        listener.callback.call(listener.context, event);
                    } else {
                        listener.callback(event);
                    }
                }
                i--;
            }
        }
    });

    function sortByPriority(aListener, bListener) {
        return aListener.priority - bListener.priority;
    }

    provide(EventEmitter);
});

shower.modules.define('emitter.Event', [
    'util.extend'
], function (provide, extend) {

    /**
     * @class
     * @name event.Event
     *
     * Event class. Can contains custom data.
     *
     * @param {object} data Custom event data.
     */
    function Event(data) {
        this._data = data;
        this._preventDefault = false;
        this._stopPropagation = false;
    }

    extend(Event.prototype, /** @lends event.Event.prototype */{
        /**
         * @param {string} key
         * @returns {object}
         */
        get: function (key) {
            return this._data[key];
        },

        preventDefault: function () {
            this._preventDefault = true;
            return this._preventDefault;
        },

        defaultPrevented: function () {
            return this._preventDefault;
        },

        stopPropagation: function () {
            this._stopPropagation = true;
            return this._stopPropagation;
        },

        isPropagationStopped: function () {
            return this._stopPropagation;
        }
    });

    provide(Event);
});

shower.modules.define('emitter.EventGroup', [
    'util.extend'
], function (provide, extend) {

    /**
     * @class
     * @name emitter.EventGroup
     *
     * Helper.
     * It is extend of event emitter for more comfortable work with it.
     *
     * @param {event.Emitter} eventManager
     *
     * @example
     * MyClass = function (shower) {
     *      this._shower = shower;
     *
     *      this._message = "Hello";
     *      this._showerListeners = null;
     * };
     *
     * MyClass.prototype.setupListeners = function () {
     *      this._showerListeners = this._shower.events.group()
     *          .on("next", function () { console.log(this._message); }, this)
     *          .on("prev", function () { console.log(this._message); }, this);
     * };
     *
     * MyClass.prototype.clearListeners = function () {
     *      this._showerListeners.offAll();
     * };
     */
    function EventGroup(eventManager) {
        this.events = eventManager;
        this._listeners = [];
    }

    extend(EventGroup.prototype, /** @lends event.EventGroup.prototype */ {
        /**
         * Add event listeners.
         *
         * @param {(string|string[])} types
         * @param {function} callback
         * @param {object} [context]
         * @returns {event.EventGroup}
         */
        on: function (types, callback, context) {
            if (Array.isArray(types)) {
                for (var i = 0, k = types.length; i < k; i++) {
                    this._listeners.push(types[i], callback, context);
                }
            } else {
                this._listeners.push(types, callback, context);
            }

            this.events.on(types, callback, context);

            return this;
        },

        /**
         * Remove event listeners.
         *
         * @param {(string|string[])} types
         * @param {function} callback
         * @param {object} context
         * @returns {event.EventGroup}
         */
        off: function (types, callback, context) {
            if (Array.isArray(types)) {
                for (var i = 0, k = types.length; i < k; i++) {
                    this._removeListener(types[i], callback, context);
                }
            } else {
                this._removeListener(types, callback, context);
            }

            return this;
        },

        /**
         * Remove all listeners.
         *
         * @returns {event.EventGroup}
         */
        offAll: function () {
            for (var i = 0, k = this._listeners.length; i < k; i += 3) {
                this.events.off(
                    this._listeners[i],
                    this._listeners[i + 1],
                    this._listeners[i + 2]
                );
            }
            this._listeners.length = 0;

            return this;
        },

        _removeListener: function (type, callback, context) {
            var index = this._listeners.indexOf(type, 0);
            while (index != -1) {
                if (this._listeners[index + 1] == callback &&
                    this._listeners[index + 2] == context) {
                    this._listeners.splice(index, 3);

                    this.events.off(type, callback, context);
                }

                index = this._listeners.indexOf(type, index);
            }
        }
    });

    provide(EventGroup);
});

/**
 * @file Plugins controller for Shower.
 */
shower.modules.define('Plugins', [
    'Emitter',
    'util.extend'
], function (provide, EventEmitter, extend) {

    /**
     * @class
     * @name shower.Plugins
     *
     * Plugins controller for Shower.
     *
     * @param {shower.global} shower global module.
     */
    function Plugins(showerGlobal) {
        this.events = new EventEmitter({
            context: this
        });

        this._showerGlobal = showerGlobal;
        this._showerInstances = showerGlobal.getInited();

        this._plugins = {};
        this._instances = [];

        showerGlobal.events.on('init', this._onShowerInit, this);
    }

    extend(Plugins.prototype, /** @lends shower.Plugins.prototype */ {

        destroy: function () {
            this._showerGlobal.events.off('init', this._onShowerInit, this);

            this._plugins = null;
        },

        /**
         * Add plugin to the Shower plugins system.
         *
         * @param {string} name Plugin module name.
         * @param {object} [options] Custom options for plugin.
         * @returns {shower.Plugins}
         */
        add: function (name, options) {
            if (this._plugins.hasOwnProperty(name)) {
                throw new Error('Plugin ' + name + ' already exist.');
            }

            this._requireAndAdd({
                name: name,
                options: options
            });

            return this;
        },

        /**
         * Remove plugin from system.
         *
         * @param {String} name
         * @returns {shower.Plugins}
         */
        remove: function (name) {
            if (!this._plugins.hasOwnProperty(name)) {
                throw new Error('Plugin ' + name + ' not found.');
            }

            delete this._plugins[name];

            this.events.emit('remove', {
                name: name
            });

            return this;
        },

        /**
         * Get plugin by name.
         *
         * @param {string} name Plugin name.
         * @param {Shower} [shower] Shower instance.
         * @returns {(object|null)} Instanced plugin or plugin class if shower var is not defined.
         */
        get: function (name, shower) {
            var plugin = this._plugins[name];
            var pluginInstance;

            if (plugin && shower) {
                for (var i = 0, l = this._instances.length; i < l; i++) {
                    var instanceInfo = this._instances[i];
                    if (instanceInfo.plugin.name === name &&
                        instanceInfo.shower === shower) {
                        pluginInstance = instanceInfo.instance;
                    }
                }
            }

            return pluginInstance;
        },

        _requireAndAdd: function (plugin) {
            shower.modules.require(plugin.name, function (pluginClass) {
                plugin.class = pluginClass;
                this._plugins[plugin.name] = plugin;
                this._instancePlugin(plugin);
            }.bind(this));
        },

        _instancePlugin: function (plugin) {
            this._showerInstances.forEach(function (shower) {
                this._instance(plugin, shower);
            }, this);

            this.events.emit('add', {
                name: plugin.name
            });
        },

        _instanceFor: function (shower) {
            for (var name in this._plugins) {
                if (this._plugins.hasOwnProperty(name)) {
                    this._instance(this._plugins[name], shower);
                }
            }
        },

        _instance: function (plugin, shower) {
            var options = plugin.options || shower.options.get('plugin_' + plugin.name);
            this._instances.push({
                shower: shower,
                plugin: plugin,
                instance: new plugin.class(shower, options)
            });
        },

        _onShowerInit: function (event) {
            var shower = event.get('shower');
            this._instanceFor(shower);
        }
    });

    provide(Plugins);
});

shower.modules.define('shower.global', [
    'Emitter',
    'Plugins'
], function (provide, EventEmitter, Plugins) {

    var inited = [];

    /**
     * @class
     * @name shower
     * @static
     */
    var sh = {
        /**
         * Ready function will call callback when Shower init.
         * If Shower already initialized, callback will call immediately.
         *
         * @param {function} [callback] Your function that run after Shower initialized.
         * It will be call with shower.
         * @returns {boolean} Ready state.
         *
         * @example
         * shower.ready(function (sh) {
         *     sh.go(2);
         * });
         */
        ready: function (callback) {
            if (callback) {
                if (inited.length) {
                    inited.forEach(callback);
                } else {
                    this.events.once('init', function (e) {
                        callback(e.get('shower'));
                    });
                }
            }

            return Boolean(inited.length);
        },

        /**
         * Init new Shower.
         * @param {object} [initOptions]
         * @param {(HTMLElement|string)} [initOptions.container='.shower']
         * @param {object} [initOptions.options]
         * @param {function} [initOptions.callback]
         * @param {object} [initOptions.context]
         *
         * @example
         * shower.init({
         *     contaner: '.my-shower',
         *     callback: this._onShowerInit,
         *     context: this
         * });
         */
        init: function (initOptions) {
            initOptions = initOptions || {};

            shower.modules.require(['Shower'], function (Shower) {
                new Shower(initOptions.container, initOptions.options);
            });
        },

        /**
         * @returns {Shower[]} Array of shower players.
         */
        getInited: function () {
            return inited.slice();
        }
    };

    /**
     * @name shower.plugins
     * @field
     * @type {Plugins}
     */
    sh.events = new EventEmitter({context: sh});

    /**
     * @name shower.events
     * @field
     * @type {Emitter}
     */
    sh.plugins = new Plugins(sh);

    sh.events.on('notify', function (e) {
        var showerInstance = e.get('shower');
        inited.push(showerInstance);
        sh.events.emit('init', e);
    });

    provide(sh);
});

/**
 * @fileOverview Options manager.
 */
shower.modules.define('Options', [
    'Emitter',
    'options.Monitor',
    'util.Store',
    'util.extend',
    'util.inherit'
], function (provide, EventEmitter, Monitor, Store, extend, inherit) {

    /**
     * @class
     * @name Options
     * @augment util.Store
     * @param {object} [initOptions].
     *
     * @example
     * var options = new Options({debug: false});
     *
     * options.get('debug'); // -> false
     * options.get('blabla', 'hello'); // -> 'hello'
     * options.get('hello'); // -> undefined
     */
    function Options(initOptions) {
        Options.super.constructor.apply(this, arguments);
        /**
         * Event emitter
         * @field
         * @type {EventEmitter}
         */
        this.events = new EventEmitter();
    }

    inherit(Options, Store, {
        /**
         * @param {(string | object)} name Option name or object with key-value options to set.
         * @param {object} [value]
         * @returns {Options} Self.
         */
        set: function (name, value) {
            var changed = [];
            if (typeof name === 'string') {
                Options.super.set.call(this, name, value);
                changed.push({
                    name: name,
                    value: value
                });

            } else {
                var options = name || {};
                Object.keys(options).forEach(function (optionName) {
                    var optionValue = options[optionName];
                    Options.super.set.call(this, optionName, optionValue);
                    changed.push({
                        name: optionName,
                        value: optionValue
                    });
                });
            }

            if (changed.length) {
                this.events.emit('set', {items: changed});
            }

            return this;
        },

        unset: function (name) {
            Options.super.unset(this, name);
            this.events.emit('unset', {name: name});

            return this;
        },

        getMonitor: function () {
            return new Monitor(this);
        }
    });

    provide(Options);
});

/**
 * @fileOverview Changes monitoring in options.
 */
shower.modules.define('options.Monitor', [
    'util.extend'
], function (provide, extend) {

    /**
     * @class Monitoring fields change.
     * @name options.Monitor
     * @param {Options} options
     */
    function Monitor(options) {
        this._options = options;
        this._optionsEvents = options.events.group()
            .on(['set', 'unset'], this._onOptionsChange, this);

        this._fieldsHanders = {};
    }

    extend(Monitor.prototype, /** @lends options.Monitor.prototype */{

        destroy: function () {
            this._options = null;
            this._optionsEvents.offAll();
            this._fieldsHanders = null;
        },

        /**
         * @param {(string|string[])} field
         * @param {function} callback
         * @param {Object} [context]
         * @returns {options.Monitor} Self.
         */
        add: function (field, callback, context) {
            if (Array.prototype.isArray.call(null, field)) {
                var fields = field;
                for (var fieldName in fields) {
                    if (fields.hasOwnProperty(fieldName)) {
                        this._addHandler(fieldName, callback, context);
                    }
                }
            } else {
                this._addHandler(field, callback, context);
            }

            return this;
        },

        /**
         * @param {(string|string[])} field
         * @param {function} callback
         * @param {object} [context]
         * @returns {options.Monitor} Self.
         */
        remove: function (field, callback, context) {
            if (Array.prototype.isArray.call(null, field)) {
                var fields = field;
                for (var fieldName in fields) {
                    if (fields.hasOwnProperty(fieldName)) {
                        this._remodeHandler(fieldName, callback, context);
                    }
                }
            } else {
                this._remodeHandler(field, callback, context);
            }

            return this;
        },

        /**
         * @returns {Options} Options.
         */
        getOptions: function () {
            return this._options;
        },

        _onOptionsChange: function (event) {
            var fieldsUpdated = event.get('type') === 'unset' ?
                [event.get('name')] :
                event.get('items');

            fieldsUpdated.forEach(function (field) {
                if (this._fieldsHanders.hasOwnProperty(field)) {
                    this._fieldsHanders[field].forEach(function (handler) {
                        handler.callback.call(handler.context, this._options.get(field));
                    });
                }
            }, this);
        },

        _addHandler: function (field, callback, context) {
            var handler = {
                callback: callback,
                context: context
            };

            if (this._fieldsHanders.hasOwnProperty(fieldName)) {
                this._fieldsHanders[fieldName].push(handler);
            } else {
                this._fieldsHanders[fieldName] = [handler];
            }
        },

        _remodeHandler: function (field, callback, context) {
            if (!this._fieldsHanders.hasOwnProperty(field)) {
                throw new Error('Remove undefined handler for ' + field + ' field');
            }

            var fieldsHanders = this._fieldsHanders[field];
            var handler = fieldsHanders.filter(function (hander) {
                return hander.callback === callback && hander.context === context;
            })[0];

            if (!hander) {
                throw new Error('Hanlder for ' + field + ' not found.');
            }

            fieldsHanders.splice(fieldsHanders.indexOf(handler, 1));
        }
    });

    provide(Monitor);
});

/**
 * @file Core module of the Shower.
 */
shower.modules.define('Shower', [
    'Emitter',
    'Options',
    'shower.global',
    'shower.defaultOptions',
    'shower.Container',
    'shower.Player',
    'shower.Location',
    'shower.slidesParser',
    'util.extend'
], function (provide, EventEmitter, Options, showerGlobal, defaultShowerOptions,
    Container, Player, Location, defaultSlidesParser, extend) {

    /**
     * @typedef {object} HTMLElement
     */

    /**
     * @typedef {function} ISlidesParseFunction
     * @param {HTMLElement} containerElement
     * @param {string} cssSelector Slides selector.
     * @returns {Slide[]} Slides.
     */

    /**
     * @class
     * @name Shower
     *
     * @param {(HTMLElement|string)} [container='.shower'] Container element or his selector.
     * @param {object} [options] Shower options.
     * @param {boolean} [options.debug_mode = false] Debug mode.
     * @param {boolean} [options.hotkeys = true] If true — hotkeys will works.
     * @param {string} [options.slides_selector = '.shower .slide'] Slide selector.
     * @param {ISlidesParseFunction} [options.slides_parser] Parse function.
     * @param {object} [options.plugins] Plugins options.
     * @returns {Shower}
     */
    function Shower(container, options) {
        options = options || {};

        this.events = new EventEmitter({context: this});
        this.options = new Options({}, defaultShowerOptions, options);

        var containerElement = container || this.options.get('container_selector');
        if (typeof containerElement === 'string') {
            containerElement = document.querySelector(containerElement);
        }

        this.player = new Player(this);
        this.container = new Container(this, containerElement);

        this._slides = [];
        this._isHotkeysOn = true;
        this._liveRegion = null;

        this._initSlides();
        this._initLiveRegion();

        if (this.options.get('debug_mode')) {
            document.body.classList.add(this.options.get('debug_mode_classname'));
            console.info('Debug mode on');
        }

        if (!this.options.get('hotkeys')) {
            this.disableHotkeys();
        }

        this.location = new Location(this);

        // Notify abount new shower instance.
        showerGlobal.events.emit('notify', {shower: this});

        this._playerListeners = this.player.events.group()
            .on('activate', this._onPlayerSlideActivate, this);
    }

    extend(Shower.prototype, /** @lends Shower.prototype */{
        /**
         * Destroy Shower.
         */
        destroy: function () {
            this.events.emit('destroy');

            this.location.destroy();
            this.container.destroy();
            this.player.destroy();

            this._slides = [];
        },

        /**
         * Add slide or array of slides.
         *
         * @param {(Slide|Slide[])} slide Slide or array or slides.
         * @returns {Shower}
         */
        add: function (slide) {
            if (Array.isArray.call(null, slide)) {
                for (var i = 0, k = slide.length; i < k; i++) {
                    this._addSlide(slide[i]);
                }
            } else {
                this._addSlide(slide);
            }

            return this;
        },

        /**
         * Remove slide from shower.
         *
         * @param {(Slide|number)} slide Slide {@link Slide} or slide index.
         * @returns {Shower} Self link.
         */
        remove: function (slide) {
            var slidePosition;

            if (typeof slide == 'number') {
                slidePosition = slide;
            } else if (this._slides.indexOf(slide) != -1) {
                slidePosition = this._slides.indexOf(slide);
            } else {
                throw new Error('Slide not found');
            }

            slide = this._slides.splice(slidePosition, 1)[0];

            this.events.emit('slideremove', {
                slide: slide
            });

            slide.destroy();
            return this;
        },

        /**
         * Return slide by index.
         *
         * @param {number} index Slide index.
         * @returns {Slide} Slide by index.
         */
        get: function (index) {
            return this._slides[index];
        },

        /**
         * @returns {Slide[]} Array with slides {@link Slide}.
         */
        getSlides: function () {
            return this._slides.slice();
        },

        /**
         * @returns {number} Slides count.
         */
        getSlidesCount: function () {
            return this._slides.length;
        },

        /**
         * @param {Slide} slide
         * @returns {number} Slide index or -1 of slide not found.
         */
        getSlideIndex: function (slide) {
            return this._slides.indexOf(slide);
        },

        /**
         * Turn off hotkeys control.
         *
         * @returns {Shower}
         */
        disableHotkeys: function () {
            this._isHotkeysOn = false;
            return this;
        },

        /**
         * Turn on hotkeys control.
         *
         * @returns {Shower}
         */
        enableHotkeys: function () {
            this._isHotkeysOn = true;
            return this;
        },

        /**
         * @returns {boolean} Hotkeys is enabled.
         */
        isHotkeysEnabled: function () {
            return this._isHotkeysOn;
        },

        /**
         * @returns {HTMLElement} Live region element.
         */
        getLiveRegion: function () {
            return this._liveRegion;
        },

        /**
         * Update live region content.
         *
         * @param {string} content New content for live region.
         * @returns {Shower}
         */
        updateLiveRegion: function (content) {
            this._liveRegion.innerHTML = content;
            return this;
        },

        _onPlayerSlideActivate: function (event) {
            var currentSlide = event.get('slide');
            this.updateLiveRegion(currentSlide.getContent());
        },

        _initSlides: function () {
            var slidesParser = this.options.get('slides_parser') || defaultSlidesParser;
            var slides = slidesParser(this.container.getElement(), this.options.get('slides_selector'));
            this.add(slides);
        },

        _addSlide: function (slide) {
            slide.state.set('index', this._slides.length);
            this._slides.push(slide);

            this.events.emit('slideadd', {
                slide: slide
            });
        },

        _initLiveRegion: function () {
            var liveRegion = document.createElement('section');
            liveRegion.setAttribute('role', 'region');
            liveRegion.setAttribute('aria-live', 'assertive');
            liveRegion.setAttribute('aria-relevant', 'additions');
            liveRegion.setAttribute('aria-label', 'Slide Content: Auto-updating');
            liveRegion.className = 'region';

            document.body.appendChild(liveRegion);
            this._liveRegion = liveRegion;
        }
    });

    provide(Shower);
});

/**
 * @file Container class for shower slides.
 */
shower.modules.define('shower.Container', [
    'Emitter',
    'util.bound',
    'util.extend'
], function (provide, EventEmitter, bound, extend) {
    /**
     * @typedef {object} HTMLElement
     */

    /**
     * @class
     * @name shower.Container
     *
     * Container class for shower slides. Contains DOM,
     * enter & exit slide mode.
     *
     * @param {Shower} shower Shower.
     * @param {HTMLElement} containerElement Container element.
     */
    function Container(shower, containerElement) {
        this.events = new EventEmitter({
            context: this,
            parent: shower.events
        });

        this._shower = shower;
        this._element = containerElement;
        this._isSlideMode = false;

        this.init();
    }

    extend(Container.prototype, /** @lends shower.Container.prototype */{

        init: function () {
            var bodyClassList = document.body.classList;
            var showerOptions = this._shower.options;

            var fullModeClass = showerOptions.get('mode_full_classname');
            var listModeClass = showerOptions.get('mode_list_classname');

            if (!bodyClassList.contains(listModeClass) &&
                !bodyClassList.contains(fullModeClass)) {
                bodyClassList.add(listModeClass);
            }

            this._setupListeners();
        },

        destroy: function () {
            this._clearListeners();
            this._element = null;
            this._shower = null;
            this._isSlideMode = null;
        },

        /**
         * @returns {HTMLElement} Container element.
         */
        getElement: function () {
            return this._element;
        },

        /**
         * Enter slide mode.
         * Slide fills the maximum area.
         *
         * @returns {shower.Container}
         */
        enterSlideMode: function () {
            var bodyClassList = document.body.classList;
            var showerOptions = this._shower.options;

            bodyClassList.remove(showerOptions.get('mode_list_classname'));
            bodyClassList.add(showerOptions.get('mode_full_classname'));

            this._applyTransform(this._getTransformScale());

            this._isSlideMode = true;
            this.events.emit('slidemodeenter');

            return this;
        },

        /**
         * Exit slide mode.
         * Shower returns into list mode.
         *
         * @returns {shower.Container}
         */
        exitSlideMode: function () {
            var elementClassList = document.body.classList;
            var showerOptions = this._shower.options;

            elementClassList.remove(showerOptions.get('mode_full_classname'));
            elementClassList.add(showerOptions.get('mode_list_classname'));

            this._applyTransform('none');

            this._isSlideMode = false;
            this.scrollToCurrentSlide();
            this.events.emit('slidemodeexit');

            return this;
        },

        /**
         * Return state of slide mode.
         *
         * @returns {Boolean} Slide mode state.
         */
        isSlideMode: function () {
            return this._isSlideMode;
        },

        /**
         * Scroll to current slide.
         *
         * @returns {shower.Container}
         */
        scrollToCurrentSlide: function () {
            var activeSlideClassName = this._shower.options.get('slide_active_classname');
            var slideElement = this._element.querySelector('.' + activeSlideClassName);
            if (slideElement) {
                window.scrollTo(0, slideElement.offsetTop);
            }

            return this;
        },

        _setupListeners: function () {
            this._showerListeners = this._shower.events.group()
                .on('slideadd', this._onSlideAdd, this)
                .on('slideremove', this._onSlideRemove, this);

            window.addEventListener('resize', bound(this, '_onResize'));
            document.addEventListener('keydown', bound(this, '_onKeyDown'));
        },

        _clearListeners: function () {
            this._showerListeners.offAll();

            window.removeEventListener('resize', bound(this, '_onResize'));
            document.removeEventListener('keydown', bound(this, '_onKeyDown'));
        },

        _getTransformScale: function () {
            var denominator = Math.max(
                document.body.clientWidth / window.innerWidth,
                document.body.clientHeight / window.innerHeight
            );

            return 'scale(' + (1 / denominator) + ')';
        },

        _applyTransform: function (transformValue) {
            [
                'WebkitTransform',
                'MozTransform',
                'msTransform',
                'OTransform',
                'transform'
            ].forEach(function (property) {
                document.body.style[property] = transformValue;
            });
        },

        _onResize: function () {
            if (this.isSlideMode()) {
                this._applyTransform(this._getTransformScale());
            }
        },

        _onSlideAdd: function (e) {
            var slide = e.get('slide');
            slide.events
                .on('click', this._onSlideClick, this);
        },

        _onSlideRemove: function (e) {
            var slide = e.get('slide');
            slide.events
                .off('click', this._onSlideClick, this);
        },

        _onSlideClick: function () {
            if (!this._isSlideMode) {
                this.enterSlideMode();
            }
        },

        _onKeyDown: function (e) {
            if (!this._shower.isHotkeysEnabled()) {
                return;
            }

            switch (e.which) {
                case 13: // enter
                    e.preventDefault();
                    this.enterSlideMode();
                    break;

                case 27: // esc
                    e.preventDefault();
                    this.exitSlideMode();
                    break;

                case 116: // F5 (Shift)
                    e.preventDefault();
                    if (!this.isSlideMode()) {
                        var slideNumber = e.shiftKey ? this._shower.player.getCurrentSlideIndex() : 0;
                        this._shower.player.go(slideNumber);
                        this.enterSlideMode();
                    } else {
                        this.exitSlideMode();
                    }

                    break;

                case 80: // P Alt Cmd
                    if (!this.isSlideMode() && e.altKey && e.metaKey) {
                        e.preventDefault();
                        this.enterSlideMode();
                    }
                    break;
            }
        }
    });

    provide(Container);
});

/**
 * @file History controller for shower.
 */
shower.modules.define('shower.Location', [
    'util.SessionStore',
    'util.bound',
    'util.extend'
], function (provide, SessionStore, bound, extend) {

    /**
     * @typedef {object} slideInfo
     * @property {Slide} slide Slide instance.
     * @property {number} index Slide index.
     */

    /**
     * @class
     * @name shower.Location
     *
     * @param {Shower} shower
     */
    function Location(shower) {
        this._shower = shower;

        var sessionStoreKey = shower.options.get('sessionstore_key') + '-shower.Location';
        this.state = new SessionStore(sessionStoreKey, {isSlideMode: false});

        this._showerListeners = null;
        this._playerListeners = null;
        this._documentTitle = document.title;

        this._popStateProcess = null;

        this._setupListeners();
        this._init();
    }

    extend(Location.prototype, /** @lends shower.Location.prototype */{

        destroy: function () {
            this._clearListeners();
        },

        /**
         * Save current Shower state, e.g.:
         * - slide (index or id);
         * - slide mode.
         */
        save: function () {
            this.state.set('isSlideMode', this._isSlideMode());
        },

        _init: function () {
            var shower = this._shower;
            var currentSlideId = window.location.hash.substr(1);
            var slideInfo;
            var slideModeClass = shower.options.get('mode_full_classname');

            // Need for first slide focus.
            window.location.hash = '';

            // Check state value and classlist only when first initialization.
            if (this.state.get('isSlideMode') || document.body.classList.contains(slideModeClass)) {
                shower.container.enterSlideMode();
            }

            if (currentSlideId !== '') {
                slideInfo = this._getSlideById(currentSlideId);
                shower.player.go(typeof slideInfo.index !== 'undefined' ? slideInfo.index : 0);
            }
        },

        _setupListeners: function () {
            var shower = this._shower;

            this._playerListeners = shower.player.events.group()
                .on('activate', this._onSlideActivate, this);

            this._containerListener = shower.container.events.group()
                .on(['slidemodeenter', 'slidemodeexit'], this._onContainerSlideModeChange, this);

            window.addEventListener('popstate', bound(this, '_onPopstate'));
        },

        _clearListeners: function () {
            window.removeEventListener('popstate', bound(this, '_onPopstate'));
            this._playerListeners.offAll();
            this._containerListener.offAll();
        },

        /**
         * @ignore
         * @param {string} slideId
         * @return {slideInfo} Slide info object.
         */
        _getSlideById: function (slideId) {
            var slides = this._shower.getSlides();
            var slide;
            var index;

            for (var i = slides.length - 1; i >= 0; i--) {
                if (slides[i].getId() === slideId) {
                    slide = slides[i];
                    index = i;
                    break;
                }
            }

            return {
                slide: slide,
                index: index
            };
        },

        _onSlideActivate: function (e) {
            window.location.hash = e.get('slide').getId();
            this._setTitle();
        },

        _onContainerSlideModeChange: function () {
            this._setTitle();
            this.save();
        },

        _isSlideMode: function () {
            return this._shower.container.isSlideMode();
        },

        _onPopstate: function () {
            var shower = this._shower;
            var slideId = window.location.hash.substr(1);
            var slideInfo;
            var currentSlide = shower.player.getCurrentSlide();
            var currentSlideNumber = shower.player.getCurrentSlideIndex();

            // Go to first slide, if hash id is invalid or isn't set.
            // Same check is located in DOMContentLoaded event,
            // but it not fires on hash change
            if (this._isSlideMode() && currentSlideNumber === -1) {
                shower.player.go(0);
            // In List mode, go to first slide only if hash id is invalid.
            } else if (currentSlideNumber === -1 && window.location.hash !== '') {
                shower.player.go(0);
            }

            if (currentSlide && slideId !== currentSlide.getId()) {
                slideInfo = this._getSlideById(slideId);
                shower.player.go(slideInfo.index);
            }
        },

        _setTitle: function () {
            var title = document.title;
            var isSlideMode = this._isSlideMode();
            var currentSlide = this._shower.player.getCurrentSlide();

            if (isSlideMode && currentSlide) {
                var slideTitle = currentSlide.getTitle();

                document.title = slideTitle ?
                    slideTitle + ' — ' + this._documentTitle :
                    this._documentTitle;

            } else if (this._documentTitle !== title) {
                document.title = this._documentTitle;
            }
        }
    });

    provide(Location);
});

/**
 * @file Slides player.
 */
shower.modules.define('shower.Player', [
    'Emitter',
    'util.bound',
    'util.extend'
], function (provide, EventEmitter, bound, extend) {

    /**
     * @class
     * @name shower.Player
     *
     * Control slides.
     *
     * @param {Shower} shower Shower.
     */
    function Player(shower) {
        this.events = new EventEmitter({
            context: this,
            parent: shower.events
        });

        this._shower = shower;
        this._showerListeners = null;
        this._playerListeners = null;

        this._currentSlideNumber = -1;
        this._currentSlide = null;

        this.init();
    }

    extend(Player.prototype, /** @lends shower.Player.prototype */ {

        init: function () {
            this._showerListeners = this._shower.events.group()
                .on('slideadd', this._onSlideAdd, this)
                .on('slideremove', this._onSlideRemove, this)
                .on('slidemodeenter', this._onContainerSlideModeEnter, this);

            this._playerListeners = this.events.group()
                .on('prev', this._onPrev, this)
                .on('next', this._onNext, this);

            document.addEventListener('keydown', bound(this, '_onKeyDown'));
        },

        destroy: function () {
            this._showerListeners.offAll();
            this._playerListeners.offAll();

            document.removeEventListener('keydown', bound(this, '_onKeyDown'));

            this._currentSlide = null;
            this._currentSlideNumber = null;
            this._shower = null;
        },

        /**
         * Go to next slide.
         *
         * @returns {shower.Player}
         */
        next: function () {
            this.events.emit('next');
            return this;
        },

        /**
         * Go to previous slide.
         *
         * @returns {shower.Player}
         */
        prev: function () {
            this.events.emit('prev');
            return this;
        },

        /**
         * Go to first slide.
         *
         * @returns {shower.Player}
         */
        first: function () {
            this.go(0);
            return this;
        },

        /**
         * Go to last slide.
         *
         * @returns {shower.Player}
         */
        last: function () {
            this.go(this._shower.getSlidesCount() - 1);
            return this;
        },

        /**
         * Go to custom slide by index.
         *
         * @param {number | Slide} index Slide index to activate.
         * @returns {shower.Player}
         */
        go: function (index) {
            // If go by slide istance.
            if (typeof index !== 'number') {
                index = this._shower.getSlideIndex(index);
            }

            var slidesCount = this._shower.getSlidesCount();
            var currentSlide = this._currentSlide;

            if (index != this._currentSlideNumber && index < slidesCount && index >= 0) {
                if (currentSlide && currentSlide.isActive()) {
                    currentSlide.deactivate();
                }

                currentSlide = this._shower.get(index);

                this._currentSlide = currentSlide;
                this._currentSlideNumber = index;

                if (!currentSlide.isActive()) {
                    currentSlide.activate();
                }

                this.events.emit('activate', {
                    index: index,
                    slide: currentSlide
                });
            }

            return this;
        },

        /**
         * @returns {Slide} Current active slide.
         */
        getCurrentSlide: function () {
            return this._currentSlide;
        },

        /**
         * @returns {Number} Current active slide index.
         */
        getCurrentSlideIndex: function () {
            return this._currentSlideNumber;
        },

        _onPrev: function () {
            this._changeSlide(this._currentSlideNumber - 1);
        },

        _onNext: function () {
            this._changeSlide(this._currentSlideNumber + 1);
        },

        /**
         * @ignore
         * @param {number} index Slide index.
         */
        _changeSlide: function (index) {
            this.go(index);
        },

        _onSlideAdd: function (e) {
            var slide = e.get('slide');

            slide.events
                .on('activate', this._onSlideActivate, this);
        },

        _onSlideRemove: function (e) {
            var slide = e.get('slide');

            slide.events
                .off('activate', this._onSlideActivate, this);
        },

        _onSlideActivate: function (e) {
            var slide = e.get('slide');
            var slideNumber = this._shower.getSlideIndex(slide);

            this.go(slideNumber);
        },

        _onKeyDown: function (e) {
            if (!this._shower.isHotkeysEnabled() ||
                /^(?:button|input|select|textarea)$/i.test(e.target.tagName)) {
                return;
            }

            this.events.emit('keydown', {
                event: e
            });

            switch (e.which) {
                case 33: // PgUp
                case 38: // Up
                case 37: // Left
                case 72: // H
                case 75: // K
                    if (e.altKey || e.ctrlKey || e.metaKey) { return; }
                    e.preventDefault();
                    this.prev();
                    break;

                case 34: // PgDown
                case 40: // Down
                case 39: // Right
                case 76: // L
                case 74: // J
                    if (e.altKey || e.ctrlKey || e.metaKey) { return; }
                    e.preventDefault();
                    this.next();
                    break;

                case 36: // Home
                    e.preventDefault();
                    this.first();
                    break;

                case 35: // End
                    e.preventDefault();
                    this.last();
                    break;

                case 9: // Tab (Shift)
                case 32: // Space (Shift)
                    if (e.altKey || e.ctrlKey || e.metaKey) { return; }
                    e.preventDefault();

                    if (e.shiftKey) {
                        this.prev();
                    } else {
                        this.next();
                    }
                    break;
            }
        },

        _onContainerSlideModeEnter: function () {
            if (!this._currentSlide) {
                this.go(0);
            }
        }
    });

    provide(Player);
});

/**
 * @fileOverview Default Shower options.
 */
shower.modules.define('shower.defaultOptions', function (provide, slidesParser) {
    provide({
        container_selector: '.shower',

        debug_mode: false,
        debug_mode_classname: 'debug',

        hotkeys: true,
        sessionstore_key: 'shower',

        slides_selector: '.shower .slide',

        mode_full_classname: 'full',
        mode_list_classname: 'list',

        slide_title_element_selector: 'H2',
        slide_active_classname: 'active',
        slide_visited_classname: 'visited'
    });
});

/**
 * @fileOverview Slides parser.
 */
shower.modules.define('shower.slidesParser', [
    'Slide'
], function (provide, Slide) {

    /**
     * @typedef {object} HTMLElement
     */

    /**
     * @function
     * Get container and slide selector, myst returns array of slides.
     * @name shower.slidesParser
     *
     * @param {HTMLElement} containerElement
     * @param {string} cssSelector
     * @returns {Slide[]}
     */
    function parse(containerElement, cssSelector) {
        var slidesElements = containerElement.querySelectorAll(cssSelector);
        slidesElements = Array.prototype.slice.call(slidesElements);

        return slidesElements.map(function (slideElement, index) {
            var slide = new Slide(slideElement);

            if (!slideElement.id) {
                slideElement.id = index + 1;
            }

            return slide;
        });
    }

    provide(parse);
});

/**
 * @file Slide.
 */
shower.modules.define('Slide', [
    'shower.defaultOptions',
    'Emitter',
    'Options',
    'slide.Layout',
    'slide.layoutFactory',
    'util.Store',
    'util.extend'
], function (provide, defaultOptions, EventEmitter, OptionsManager, Layout,
             slideLayoutFactory, DataStore, extend) {

    /**
     * @typedef {object} HTMLElement
     */

    /**
     * @class
     * @name Slide
     *
     * Slide class.
     *
     * @param {(string|HTMLElement)} content
     * @param {object} [options]
     * @param {string} [options.title_element_selector = 'H2']
     * @param {string} [options.active_classname = 'active']
     * @param {string} [options.visited_classname = 'visited']
     * @param {object} [state] Current slide state.
     * @param {number} [state.visited=0] Count of visit slide.
     */
    function Slide(content, options, state) {
        this.events = new EventEmitter();
        this.options = new OptionsManager(options);
        this.layout = null;

        this.state = new DataStore({
            visited: 0,
            index: null
        }, state);

        this._content = content;
        this._isVisited = this.state.get('visited') > 0;
        this._isActive = false;

        this.init();
    }

    extend(Slide.prototype, /** @lends Slide.prototype */ {

        init: function () {
            this.layout = typeof this._content === 'string' ?
                new slideLayoutFactory.createLayout({
                    content: this._content
                }) :
                new Layout(this._content, this.options);

            this.layout.setParent(this);
            this._setupListeners();
        },

        destroy: function () {
            this._clearListeners();

            this._isActive = null;
            this.options = null;

            this.layout.destroy();
        },

        /**
         * Activate slide.
         *
         * @returns {Slide}
         */
        activate: function () {
            this._isActive = true;

            var visited = this.state.get('visited');
            this.state.set('visited', ++visited);
            this.events.emit('activate', {
                slide: this
            });

            return this;
        },

        /**
         * Deavtivate slide.
         *
         * @returns {Slide}
         */
        deactivate: function () {
            this._isActive = false;
            this.events.emit('deactivate', {
                slide: this
            });

            return this;
        },

        /**
         * Get active state.
         *
         * @returns {boolean}
         */
        isActive: function () {
            return this._isActive;
        },

        /**
         * Get visited state.
         *
         * @returns {boolean}
         */
        isVisited: function () {
            return this.state.get('visited') > 0;
        },

        /**
         * Get slide title.
         *
         * @borrows slide.Layout.getTitle
         */
        getTitle: function () {
            return this.layout.getTitle();
        },

        /**
         * Set slide title.
         *
         * @borrows slide.Layout.getTitle
         * @returns {Slide}
         */
        setTitle: function (title) {
            this.layout.setTitle(title);
            return this;
        },

        /**
         * Get id of slide element.
         *
         * @returns {(string|undefined)}
         */
        getId: function () {
            return this.layout.getElement().id;
        },

        /**
         * Get slide content.
         *
         * @borrows slide.Layout.getContent
         */
        getContent: function () {
            return this.layout.getContent();
        },

        _setupListeners: function () {
            this.layoutListeners = this.layout.events.group()
                .on('click', this._onSlideClick, this);
        },

        _clearListeners: function () {
            this.layoutListeners.offAll();
        },

        _onSlideClick: function () {
            this.activate();

            this.events.emit('click', {
                slide: this
            });
        }
    });

    provide(Slide);
});

/**
 * @file Slide layout.
 */
shower.modules.define('slide.Layout', [
    'Options',
    'shower.defaultOptions',
    'Emitter',
    'util.bound',
    'util.extend'
], function (provide, OptionsManager, defaultOptions, EventEmitter, bound, extend) {

    /**
     * @typedef {object} HTMLElement
     */

    /**
     * @class Slide layout. Work with DOM, DOM events, etc. View for Slide class.
     * @name slide.Layout
     * @param {HTMLElement} element Slide node.
     * @param {object} Options for slide layout.
     */
    function Layout(element, options) {
        this.options = new OptionsManager({
            title_element_selector: defaultOptions.slide_title_element_selector,
            active_classname: defaultOptions.slide_active_classname,
            visited_classname: defaultOptions.slide_visited_classname
        }, options);

        this.events = new EventEmitter();
        this._element = element;

        this._parent = null;
        this._parentElement = null;

        this.init();
    }

    extend(Layout.prototype, /** @lends slide.Layout.prototype */ {
        /**
         * @ignore
         * Init layout.
         */
        init: function () {
            var parentNode = this._element.parentNode;
            if (!parentNode) {
                this.setParentElement(parentNode);
            } else {
                this._parentElement = parentNode;
            }
        },

        destroy: function () {
            this.setParent(null);
        },

        setParent: function (parent) {
            if (this._parent != parent) {
                this._clearListeners();

                this._parent = parent;

                if (this._parent) {
                    this._setupListeners();
                }

                this.events.emit('parentchange', {
                    parent: parent
                });
            }
        },

        getParent: function () {
            return this._parent;
        },

        /**
         * @param {HTMLElement} parentElement
         */
        setParentElement: function (parentElement) {
            if (parentElement != this._parentElement) {
                this._parentElement = parentElement;
                parentElement.appendChild(this._element);

                this.events.emit('parentelementchange', {
                    parentElement: parentElement
                });
            }
        },

        /**
         * Return slide parent HTML element.
         *
         * @returns {HTMLElement} Layout parent element.
         */
        getParentElement: function () {
            return this._parentElement;
        },

        /**
         * Return slide HTML element.
         *
         * @returns {HTMLElement} Layout element.
         */
        getElement: function () {
            return this._element;
        },

        /**
         * Set slide title or create new H2 element into slide element.
         *
         * @param {string} title Slide title.
         */
        setTitle: function (title) {
            var titleElementSelector = this.options.get('title_element_selector');
            var titleElement = this._element.querySelector(titleElementSelector);

            if (titleElement) {
                titleElement.innerHTML = title;
            } else {
                titleElement = document.createElement(titleElementSelector);
                titleElement.innerHTML = title;
                this._element.insertBefore(titleElement, this._element.firstChild);
            }
        },

        /**
         * Return text content of H2 element.
         *
         * @returns {(string|null)} Title.
         */
        getTitle: function () {
            var titleElementSelector = this.options.get('title_element_selector');
            var titleElement = this._element.querySelector(titleElementSelector);
            return titleElement ? titleElement.textContent : null;
        },

        /**
         * Get data, defined in property of slide element.
         *
         * @param {string} name Data attr name.
         * @returns {object} Value of data attr.
         */
        getData: function (name) {
            var element = this._element;

            return element.dataset ?
                element.dataset[name] :
                element.getAttribute('data-' + name);
        },

        /**
         * Get inner content from slide element.
         *
         * @returns {string} Slide content.
         */
        getContent: function () {
            return this._element.innerHTML;
        },

        _setupListeners: function () {
            this._slideListeners = this._parent.events.group()
                .on('activate', this._onSlideActivate, this)
                .on('deactivate', this._onSlideDeactivate, this);

            this._element.addEventListener('click', bound(this, '_onSlideClick'), false);
        },

        _clearListeners: function () {
            if (this._slideListeners) {
                this._slideListeners.offAll();
            }

            this._element.removeEventListener('click', bound(this, '_onSlideClick'));
        },

        _onSlideActivate: function () {
            this._element.classList.add(this.options.get('active_classname'));
        },

        _onSlideDeactivate: function () {
            var elementClassList = this._element.classList;
            elementClassList.remove(this.options.get('active_classname'));
            elementClassList.add(this.options.get('visited_classname'));
        },

        _onSlideClick: function () {
            this.events.emit('click');
        }
    });

    provide(Layout);
});

/**
 * @file Layout factory for slides.
 */
shower.modules.define('slide.layoutFactory', [
    'slide.Layout',
    'util.extend'
], function (provide, SlideLayout, extend) {

    /**
     * @name slide.layoutFactory
     * @static
     */
    var layoutFactory = {};

    extend(layoutFactory, /** @lends slide.layoutFactory */ {
        /**
         * @static
         * @function
         *
         * @param {object} [parameters]
         * @param {string} [parameters.content] Slide content.
         * @param {string} [parameters.contentType='slide'] Cover, slide, image.
         * @returns {slide.Layout}
         */
        createLayout: function (parameters) {
            parameters = parameters || {};

            var element = layoutFactory._createElement(extend({
                content: '',
                contentType: 'slide'
            }, parameters));

            return new SlideLayout(element);
        },

        /**
         * @ignore
         * @param options
         * @returns {HTMLElement}
         */
        _createElement: function (options) {
            var element = document.createElement('section');
            element.innerHTML = options.content;
            element.classList.add(options.contentType);

            return element;
        }
    });

    provide(layoutFactory);
});

shower.modules.define('util.SessionStore', [
    'util.Store',
    'util.inherit'
], function (provide, Store, inherit) {

    /**
     * @class
     * @name util.SessionStore
     * @augment util.Store
     * @param {string} storeKey Local storage item key.
     * @param {object} [initData].
     */
    function SessionStore(storeKey, initData) {
        this._storageKey = storeKey;
        var data = this._loadFromStorage() || initData;

        SessionStore.super.constructor.call(this, data);
    }

    inherit(SessionStore, Store, {
        set: function (key, value) {
            SessionStore.super.set.call(this, key, value);
            this._saveToStorage();
        },

        unset: function (key) {
            SessionStore.super.unset.call(this, key);
            this._saveToStorage();
        },

        _saveToStorage: function () {
            window.sessionStorage.setItem(
                this._storageKey,
                JSON.stringify(this.getAll())
            );
        },

        _loadFromStorage: function () {
            var store = window.sessionStorage.getItem(this._storageKey);
            return store && JSON.parse(store);
        }
    });

    provide(SessionStore);
});

shower.modules.define('util.Store', [
    'util.extend'
], function (provide, extend) {

    /**
     * @class
     * @name util.Store
     * @param {object} [initData={}].
     */
    function Store(initData) {
        this._data = initData || {};

        for (var i = 1, k = arguments.length; i < k; i++) {
            extend(this._data, arguments[i] || {});
        }
    }

    extend(Store.prototype, /**@lends Store.prototype */{
        /**
         * @param {string} key
         * @param {object} [defaultValue] Default value which returns if data is not definded.
         * @returns {object}
         */
        get: function (key, defaultValue) {
            return this._data.hasOwnProperty(key) ?
                this._data[key] :
                defaultValue;
        },

        /**
         * @returns {object} All contains data.
         */
        getAll: function () {
            return extend({}, this._data);
        },

        /**
         * @param {(string | object)} key Key or object with key-value data.
         * @param {object} [value]
         * @returns {Options} Self.
         */
        set: function (key, value) {
            this._data[key] = value;
            return this;
        },

        /**
         * @param {string} key
         * @returns {Options} Self.
         */
        unset: function (key) {
            if (!this._data.hasOwnProperty(key)) {
                throw new Error(key + ' not found.');
            }

            delete this._data[key];
            return this;
        },

        destroy: function () {
            this._data = {};
        }
    });

    provide(Store);
});

/**
 * @file bind with memoization
 */
shower.modules.define('util.bound', function (provide) {

    /**
     * @name util.bound
     * @static
     * @function
     * @param {object} ctx Context.
     * @param {String} fn Function name.
     */
    function bound(ctx, fn) {
        return ctx['__bound_' + fn] || (ctx['__bound_' + fn] = ctx[fn].bind(ctx));
    };
    provide(bound);
});

shower.modules.define('util.extend', function (provide) {
    /**
     * @ignore
     * @name util.extend
     * @function
     * @static
     * @param {object} target
     * @param {object} source
     * @return {object} Extended target object.
     */
    function extend(target) {
        if (!target) {
            throw new Error('util.extend: Target not found');
        }
        return (typeof Object.assign === 'undefined') ?
            polyfill.apply(null, arguments) :
            Object.assign.apply(null, arguments);
    }

    function polyfill(target) {
        for (var i = 1, l = arguments.length; i < l; i++) {
            var obj = arguments[i];
            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    target[property] = obj[property];
                }
            }
        }
        return target;
    }

    provide(extend);
});

shower.modules.define('util.inherit', [
    'util.extend'
], function (provide, extend) {

    /**
     * @ignore
     * Inherit function.
     * @name util.inherit
     * @function
     * @static
     * @param {function} childClass
     * @param {function} parentClass
     * @param {object} [override]
     * @returns {object} Child class prototype.
     *
     * @example
     * function CrazySlide(content, options) {
     *      CrazySlide.super.constructor.call(this, content, options);
     *      …
     * }
     * inherit(CrazySlide, Slide, {
     *     _haveFun: function () {
     *         alert('fun');
     *     }
     * });
     */
    var inherit = function (childClass, parentClass, override) {
        childClass.prototype = Object.create(parentClass.prototype);
        childClass.prototype.constructor = childClass;
        childClass.super = parentClass.prototype;
        childClass.super.constructor = parentClass;

        if (override) {
            extend(childClass.prototype, override);
        }
        return childClass.prototype;
    };

    provide(inherit);
});

/**
 * @fileOverview
 * Next plugin for Shower
 */
shower.modules.define('shower-next', [
    'shower',
    'Emitter',
    'util.extend'
], function (provide, globalShower, EventEmitter, extend) {

    var TIMER_PLUGIN_NAME = 'shower-timer';
    var DEFAULT_SELECTOR = '.next';

    /**
     * @class
     * @name plugin.Next
     * @param {Shower} shower
     * @param {Object} [options] Plugin options.
     * @param {String} [options.selector = '.next']
     * @constructor
     */
    function Next(shower, options) {
        options = options || {};

        this.events = new EventEmitter({context: this});

        this._shower = shower;
        this._elementsSelector = options.selector || DEFAULT_SELECTOR;
        this._elements = [];

        this._innerComplete = 0;

        this._setupListeners();
        if (this._shower.player.getCurrentSlideIndex() != -1) {
            this._onSlideActivate();
        }
    }

    extend(Next.prototype, /** @lends plugin.Next.prototype */{

        destroy: function () {
            this._clearListeners();

            this._elements = null;
            this._elementsSelector = null;
            this._innerComplete = null;
            this._shower = null;
        },

        /**
         * Activate next inner item.
         * @return {plugin.Next}
         */
        next: function () {
            if (!this._elements.length) {
                throw new Error('Inner nav elements not found.');
            }

            this._innerComplete++;
            this._go();

            this.events.emit('next');

            return this;
        },

        prev: function () {
            if (!this._elements.length) {
                throw new Error('Inner nav elements not found.');
            }

            this._innerComplete--;
            this._go();

            this.events.emit('prev');

            return this;
        },

        /**
         * @returns {Number} Inner elements count.
         */
        getLength: function () {
            this._elements = this._getElements();
            return this._elements.length;
        },

        /**
         * @returns {Number} Completed inner elements count.
         */
        getComplete: function () {
            return this._innerComplete;
        },

        _setupListeners: function () {
            var shower = this._shower;

            this._showerListeners = shower.events.group()
                .on('destroy', this.destroy, this);

            this._playerListeners = shower.player.events.group()
                .on('activate', this._onSlideActivate, this)
                .on('next', this._onNext, this)
                .on('prev', this._onPrev, this);

            var timerPlugin = globalShower.plugins.get(TIMER_PLUGIN_NAME, shower);
            if (timerPlugin) {
                this._setupTimerPluginListener(timerPlugin);
            } else {
                this._pluginsListeners = globalShower.plugins.events.group()
                    .on('add', function (e) {
                        if (e.get('name') === TIMER_PLUGIN_NAME) {
                            this._setupTimerPluginListener();
                            this._pluginsListeners.offAll();
                        }
                    }, this);
            }
        },

        _setupTimerPluginListener: function (plugin) {
            if (!plugin) {
                var timerPlugin = globalShower.plugins.get(TIMER_PLUGIN_NAME, this._shower);
            }
            plugin.events
                .on('next', this._onNext, this, 100);
        },

        _clearListeners: function () {
            this._showerListeners.offAll();
            this._playerListeners.offAll();

            if (this._pluginsListeners) {
                this._pluginsListeners.offAll();
            }
        },

        _getElements: function () {
            var slideLayout = this._shower.player.getCurrentSlide().layout;
            var slideElement = slideLayout.getElement();

            return Array.prototype.slice.call(
                slideElement.querySelectorAll(this._elementsSelector)
            );
        },

        _onNext: function (e) {
            var elementsLength = this._elements.length;
            var isSlideMode = this._shower.container.isSlideMode();

            if (isSlideMode && elementsLength && this._innerComplete < elementsLength) {
                e.preventDefault();
                this.next();
            }
        },

        _onPrev: function (e) {
            var elementsLength = this._elements.length;
            var isSlideMode = this._shower.container.isSlideMode();
            var completed = this._innerComplete;

            if (elementsLength && completed < elementsLength && completed > 0) {
                e.preventDefault();
                this.prev();
            }
        },

        _go: function () {
            for (var i = 0, k = this._elements.length; i < k; i++) {
                var element = this._elements[i];

                if (i < this._innerComplete) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            }
        },

        _onSlideActivate: function () {
            this._elements = this._getElements();
            this._innerComplete = this._getInnerComplete();
        },

        _getInnerComplete: function () {
            return this._elements.filter(function (element) {
                return element.classList.contains('active');
            }).length;
        }
    });

    provide(Next);
});

shower.modules.require(['shower'], function (sh) {
    sh.plugins.add('shower-next');
});

/**
 * @fileOverview
 * Progress plugin for shower.
 */
shower.modules.define('shower-progress', [
    'util.extend'
], function (provide, extend) {

    /**
     * @class
     * Progress plugin for shower.
     * @name plugin.Progress
     * @param {Shower} shower
     * @param {Object} [options] Plugin options.
     * @param {String} [options.selector = '.progress']
     * @constructor
     */
    function Progress (shower, options) {
        options = options || {};
        this._shower = shower;
        this._playerListeners = null;

        this._element = null;
        this._elementSelector = options.selector || '.progress';

        var showerContainerElement = this._shower.container.getElement();
        this._element = showerContainerElement.querySelector(this._elementSelector);

        if (this._element) {
            this._setupListeners();

            this._element.setAttribute('role', 'progressbar');
            this._element.setAttribute('aria-valuemin', '0');
            this._element.setAttribute('aria-valuemax', '100');

            this.updateProgress();
        }
    }

    extend(Progress.prototype, /** @lends plugin.Progress.prototype */{

        destroy: function () {
            this._clearListeners();
            this._shower = null;
        },

        updateProgress: function () {
            var slidesCount = this._shower.getSlidesCount(),
                currentSlideNumber = this._shower.player.getCurrentSlideIndex(),
                currentProgressValue = (100 / (slidesCount - 1)) * currentSlideNumber;

            if (this._element) {
                this._element.style.width = currentProgressValue.toFixed(2) + '%';
                this._element.setAttribute('aria-valuenow', currentProgressValue.toFixed());
                this._element.setAttribute('aria-valuetext', 'Slideshow Progress: ' + currentProgressValue.toFixed() + '%');
            }
        },

        _setupListeners: function () {
            var shower = this._shower;

            this._showerListeners = shower.events.group()
                .on('destroy', this.destroy, this);

            this._playerListeners = shower.player.events.group()
                .on('activate', this._onSlideChange, this);
        },

        _clearListeners: function () {
            if (this._showerListeners) {
                this._showerListeners.offAll();
            }
            if (this._playerListeners) {
                this._playerListeners.offAll();
            }
        },

        _onSlideChange: function () {
            this.updateProgress();
        }
    });

    provide(Progress);
});

shower.modules.require(['shower'], function (sh) {
    sh.plugins.add('shower-progress');
});

/**
 * @fileOverview
 * Timer plugin for Shower.
 */
shower.modules.define('shower-timer', [
    'shower',
    'Emitter',
    'util.extend'
], function (provide, showerGlobal, EventEmitter, extend) {

    var PLUGIN_NAME_NEXT = 'shower-next';

    /**
     * @class
     * Timer plugin for shower.
     * @name plugin.Timer
     * @param {Shower} shower
     * @constructor
     */
    function Timer (shower) {
        this.events = new EventEmitter();

        this._shower = shower;
        this._timer = null;

        this._showerListeners = null;
        this._playerListeners = null;
        this._pluginsListeners = null;

        this._setupListeners();
    }

    extend(Timer.prototype, /** @lends plugin.Timer.prototype */{

        destroy: function () {
            this._clearTimer();
            this._clearListeners();

            this._shower = null;
        },

        /**
         * @param {Integer} timing
         */
        run: function (timing) {
            this._initTimer(timing);
        },

        stop: function () {
            this._clearTimer();
        },

        _setupListeners: function () {
            var shower = this._shower;

            this.events
                .on('next', this._onNext, this);

            this._showerListeners = shower.events.group()
                .on('destroy', this.destroy, this);

            this._playerListeners = shower.player.events.group()
                .on('keydown', this._clearTimer, this)
                .on('activate', this._onSlideActivate, this);

            this._nextPlugin = showerGlobal.plugins.get(PLUGIN_NAME_NEXT, shower);
            if (!this._nextPlugin) {
                this._pluginsListeners = shower.plugins.events.group()
                    .on('pluginadd', function (e) {
                        if (e.get('name') === PLUGIN_NAME_NEXT) {
                            this._nextPlugin = shower.plugins.get(PLUGIN_NAME_NEXT);
                            this._pluginsListeners.offAll();
                        }
                    }, this);
            }

            if (shower.player.getCurrentSlideIndex() != -1) {
                this._onSlideActivate()
            }
        },

        _clearListeners: function () {
            this._showerListeners.offAll();
            this._playerListeners.offAll();
        },

        _onSlideActivate: function () {
            this._clearTimer();
            var currentSlide = this._shower.player.getCurrentSlide();

            if (this._shower.container.isSlideMode() && currentSlide.state.get('visited') < 2) {
                var timing = currentSlide.layout.getData('timing');

                if (timing && /^(\d{1,2}:)?\d{1,3}$/.test(timing)) {
                    if (timing.indexOf(':') !== -1) {
                        timing = timing.split(':');
                        timing = (parseInt(timing[0], 10) * 60 + parseInt(timing[1], 10)) * 1000;
                    } else {
                        timing = parseInt(timing, 10) * 1000;
                    }

                    if (timing !== 0) {
                        this._initTimer(timing);
                    }
                }
            }
        },

        _initTimer: function (timing) {
            var events = this.events,
                shower = this._shower,
                nextPlugin = this._nextPlugin;

            // Support Next plugin.
            if (nextPlugin &&
                nextPlugin.getLength() &&
                nextPlugin.getLength() != nextPlugin.getComplete()) {

                timing = timing / (nextPlugin.getLength() + 1);
            }

            this._timer = setInterval(function () {
                events.emit('next');
            }, timing);
        },

        _clearTimer: function () {
            if (this._timer) {
                clearInterval(this._timer);
                this._timer = null;
            }
        },

        _onNext: function () {
            this._clearTimer();
            this._shower.player.next();
        }
    });

    provide(Timer);
});

shower.modules.require(['shower'], function (sh) {
    sh.plugins.add('shower-timer');
});

/**
 * @fileOverview
 * Touch events plugin for shower.
 */
shower.modules.define('shower-touch', [
    'util.extend'
], function (provide, extend) {

    var INTERACTIVE_ELEMENTS = [
        'VIDEO', 'AUDIO',
        'A', 'BUTTON', 'INPUT'
    ];

    /**
     * @class
     * Touch events plugin for shower.
     * @name plugin.Touch
     * @param {Shower} shower
     * @param {Object} [options] Plugin options.
     * @constructor
     */
    function Touch (shower, options) {
        options = options || {};
        this._shower = shower;

        this._setupListeners();
    }

    extend(Touch.prototype, /** @lends plugin.Touch.prototype */{

        destroy: function () {
            this._clearListeners();
            this._shower = null;
        },

        _setupListeners: function () {
            var shower = this._shower;

            this._showerListeners = shower.events.group()
                .on('add', this._onSlideAdd, this);

            this._bindedTouchStart = this._onTouchStart.bind(this);
            this._bindedTouchMove = this._onTouchMove.bind(this);

            this._shower.getSlides().forEach(this._addTouchStartListener, this);
            document.addEventListener('touchmove', this._bindedTouchMove, true);
        },

        _clearListeners: function () {
            this._showerListeners.offAll();
            this._shower.getSlides().forEach(this._removeTouchStartListener, this);
            document.removeEventListener('touchmove', this._bindedTouchMove, false);
        },

        _onSlideAdd: function (event) {
            var slide = event.get('slide');
            this._addTouchStartListener(slide);
        },

        _addTouchStartListener: function (slide) {
            var element = slide.layout.getElement();
            element.addEventListener('touchstart', this._bindedTouchStart, false);
        },

        _removeTouchStartListener: function (slide) {
            var element = slide.layout.getElement();
            element.removeEventListener('touchstart', this._bindedTouchStart, false);
        },

        _onTouchStart: function (e) {
            var shower = this._shower;
            var isSlideMode = shower.container.isSlideMode();
            var element = e.target;
            var slide = this._getSlideByElement(e.currentTarget);
            var x;

            if (slide) {
                if (isSlideMode && !this._isInteractiveElement(element)) {
                    e.preventDefault();
                    x = e.touches[0].pageX;
                    if (x > window.innerWidth / 2) {
                        shower.player.next();
                    } else {
                        shower.player.prev();
                    }
                }

                if (!isSlideMode) {
                    // Go && turn on slide mode.
                    slide.activate();
                }
            }
        },

        _onTouchMove: function (e) {
            if (this._shower.container.isSlideMode()) {
                e.preventDefault();
            }
        },

        _getSlideByElement: function (element) {
            var slides = this._shower.getSlides();
            var result = null;

            for (var i = 0, k = slides.length; i < k; i++) {
                if (element.id === slides[i].getId()) {
                    result = this._shower.get(i);
                    break;
                }
            }

            return result;
        },

        _isInteractiveElement: function (element) {
            return INTERACTIVE_ELEMENTS.some(function (elName) {
                return elName === element.tagName;
            });
        }
    });

    provide(Touch);
});

shower.modules.require(['shower'], function (sh) {
    sh.plugins.add('shower-touch');
});
