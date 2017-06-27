(function (root, factory) {
  if(typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.jBlocks = factory();
  }
}(this, function() {
    var instances = {};
    var declarations = {};
    var gid = 0;
    var noop = function() {};

    /**
     * @namespace
     * @name jBlocks
     * @description
     * Methods to define components
     * using declaration and create new instances.
     * Also helps to find and destroy components.
     */
    var jBlocks = {};

    /**
     * Destroy instance binded to the node
     * @memberof jBlocks
     * @param  {HTMLElement} node
     * @return {jBlocks}
     */
    jBlocks.destroy = function(node) {
        this.get(node).destroy();
        return this;
    };

    /**
     * Define a new component
     * @memberof jBlocks
     * @param  {String} name
     * @param  {Object} declaration
     * @return {jBlocks}
     */
    jBlocks.define = function(name, declaration) {
        if (declarations[name]) {
            throw new Error(name + ' has already been declared');
        }
        declarations[name] = declaration || {};
        return this;
    },

    /**
     * Remove declaration from cache
     * @memberof jBlocks
     * @param  {String} name name of component
     * @return {jBlocks}
     */
    jBlocks.forget = function(name) {
        declarations[name] = null;
        return this;
    },

    /**
     * Create and return a new instance of component
     * @memberof jBlocks
     * @param  {HTMLElement}  node
     * @return {jBlocks.Component} a new instance
     */
    jBlocks.get = function(node) {
        if (!node) {
            throw new Error('invalid node');
        }
        var name = node.getAttribute('data-component');
        if (!name) {
            throw new Error('data-component attribute is missing')
        }
        var instanceId = node.getAttribute('data-instance');
        if (!instanceId) {
            try {
                var props = JSON.parse(node.getAttribute('data-props'));
            } catch (e) {
                throw e;
            }
            var instance = new Component(node, name, props);
            var instanceId = instance.__id;

            if (!instances[name]) {
                instances[name] = {};
            }
            instances[name][instanceId] = instance;
        }
        return instances[name][instanceId];
    };

    /**
     * @class
     * @memberof jBlocks
     * @param {HTMLElement} node
     * @param {String}      name
     * @param {Object}      props
     */
    var Component = function(node, name, props) {
        /**
         * Name of the components used in decl
         * @type {String}
         */
        this.name = name;
        /**
         * Node which component is binded with
         * @type {HTMLElement}
         */
        this.node = node;
        /**
         * Props of the component gained from data-props
         * @type {Object}
         */
        this.props = props || {};

        this.__decl = declarations[this.name] || {};
        this.__id = ++gid;
        this.__events = {};
        this.__handlerDomEvents = this.__handlerDomEvents.bind(this);
        this.__bindMethods();
        this.__bindDomEvents();

        this.oninit();
    };
    jBlocks.Component = Component;

    Component.prototype =
    /**
     * @lends jBlocks.Component
     */
    {
        /**
         * Attach an event handler function for the given event
         * @param  {String}   event
         * @param  {Function} callback
         * @return {jBlocks.Component}
         */
        on: function(event, callback) {
            this.__events[event] = this.__events[event] || [];

            if (this.__events[event].indexOf(callback) === -1) {
                this.__events[event].push(callback);
            }
            return this;
        },

        /**
         * Remove an event handler function for the given event
         * @param  {String}   event
         * @param  {Function} callback
         * @return {jBlocks.Component}
         */
        off: function(event, callback) {
            var callbacks = this.__events[event];
            if (!callbacks) {
                return this;
            }
            if (callbacks.indexOf(callback) > -1) {
                callbacks.splice(callbacks.indexOf(callback) - 1, 1);
            } else if (!callback) {
                this.__events[event] = [];
            }
            return this;
        },

        /**
         * Execute all handlers attached for the given event
         * @param  {String} event
         * @param  {*} data
         * @return {jBlocks.Component}
         */
        emit: function(event, data) {
            var callbacks = this.__events[event];

            if (!callbacks) {
                return this;
            }
            var l = i = callbacks.length;

            while (l--) {
                try {
                    callbacks[l - i - 1].call(this, data || {});
                } catch(e) {
                    throw new Error(e.message + '. Check out ' + event + ' handler.');
                }
            }
            return this;
        },

        /**
         * Destroy the instance
         * @return {jBlocks.Component}
         */
        destroy: function() {
            instances[this.name][this.__id] = null;
            this.__unbindDomEvents();
            this.__events = null;
            this.ondestroy();
            return null;
        },

        /**
         * Bind methods from decl to the instance
         * @private
         * @return {jBlocks.Component}
         */
        __bindMethods: function() {
            var methods = this.__decl.methods || {};

            methods.oninit = methods.oninit || noop;
            methods.ondestroy = methods.ondestroy || noop;

            for (var name in methods) {
                if (methods.hasOwnProperty(name)) {
                    this[name] = methods[name];
                }
            }
            return this;
        },

        /**
         * Bind DOM Events from decl
         * @private
         * @return {jBlocks.Component}
         */
        __bindDomEvents: function() {
            return this.__forEachEvent(function(event) {
                this.node.addEventListener(event, this.__handlerDomEvents);
            });
        },
        /**
         * Unbind DOM Events from decl
         * @private
         * @return {jBlocks.Component}
         */
        __unbindDomEvents: function() {
            return this.__forEachEvent(function(event) {
                this.node.removeEventListener(event, this.__handlerDomEvents);
            });
        },

        /**
         * Iterate for each event from decl
         * @private
         * @param  {Function} callback
         * @return {jBlocks.Component}
         */
        __forEachEvent: function(callback) {
            var events = this.__decl.events || {};

            for (var name in events) {
                if (events.hasOwnProperty(name)) {
                    var parts = name.split(' ', 2);
                    var event = parts[0];
                    var selector = parts[1];
                    var callbackName = events[name];

                    callback.call(this, event, selector, callbackName);
                }
            }
            return this;
        },

        /**
         * Handler for each distinc event from decl
         * @private
         * @param  {Event} e
         * @return {jBlocks.Component}
         */
        __handlerDomEvents: function(e) {
            var type = e.type;
            var target = e.target;
            var events = this.__decl.events;

            this.__forEachEvent(function(event, selector, callbackName) {
                if (selector) {
                    var node = this.node.querySelector(selector);
                    if (this.__contains(node, target)) {
                        this.__tryCall(callbackName);
                    }
                } else {
                    this.__tryCall(callbackName);
                }
            });
        },

        /**
         * Safely try to call method of component
         * @private
         * @param  {String} method
         * @return {*}
         */
        __tryCall: function(method) {
            try {
                return this[method]();
            } catch (e) {
                throw new Error(e.message + '. Check out ' + method);
            }
        },

        /**
         * Check is one element down from another in DOM
         * @private
         * @param  {HTMLElement} root
         * @param  {HTMLElement} child
         * @return {Boolean}
         */
        __contains: function(root, child) {
            var root = root.nodeType === 9
                ? root.documentElement
                : root;
            var parent = child && child.parentNode;

            return (
                root === child ||
                !!(child && child.nodeType === 1 && parent.contains(child))
            );
        }
    };

    return jBlocks;
}));
