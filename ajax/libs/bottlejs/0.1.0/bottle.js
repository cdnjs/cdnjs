;(function(undefined) {
    'use strict';
    /**
     * BottleJS v0.1.0 - 2014-09-24
     * A powerful, extensible dependency injection micro container
     *
     * Copyright (c) 2014 Stephen Young
     * Licensed MIT
     */
    
    /**
     * Unique id counter;
     *
     * @type Number
     */
    var id = 0;
    
    /**
     * Local slice alias
     *
     * @type Functions
     */
    var slice = Array.prototype.slice;
    /**
     * Register a constant
     *
     * @param String name
     * @param mixed value
     * @return Bottle
     */
    var constant = function constant(name, value) {
        Object.defineProperty(this.container, name, {
            configurable : false,
            enumerable : true,
            value : value,
            writable : false
        });
    
        return this;
    };
    /**
     * Register a factory inside a generic provider.
     *
     * @param String name
     * @param Function Factory
     * @return Bottle
     */
    var factory = function factory(name, Factory) {
        return provider.call(this, name, function GenericProvider() {
            this.$get = Factory;
        });
    };
    /**
     * Map of middlewear by index => name
     *
     * @type Object
     */
    var middles = [];
    
    var getMiddlewear = function getMiddlewear(id, name) {
        var group = middles[id];
        if (!group) {
            group = middles[id] = {};
        }
        if (!group[name]) {
            group[name] = [];
        }
        return group[name];
    };
    
    /**
     * Register middlewear.
     *
     * @param String name
     * @param Function func
     * @return Bottle
     */
    var middlewear = function middlewear(name, func) {
    	if (typeof name === 'function') {
    		func = name;
    		name = '__global__';
    	}
    	getMiddlewear(this.id, name).push(func);
    	return this;
    };
    /**
     * Map of provider constructors by index => name
     *
     * @type Object
     */
    var providers = [];
    
    var getProviders = function(id) {
        if (!providers[id]) {
            providers[id] = {};
        }
        return providers[id];
    };
    
    /**
     * Used to process middlewear in the provider
     *
     * @param Object instance
     * @param Function func
     * @return Mixed
     */
    var reducer = function reducer(instance, func) {
        return func(instance);
    };
    
    /**
     * Register a provider.
     *
     * @param String name
     * @param Function Provider
     * @return Bottle
     */
    var provider = function provider(name, Provider) {
        var providerName, providers, properties, container, id;
    
        id = this.id;
        providers = getProviders(id);
        if (providers[name]) {
            return console.error(name + ' provider already registered.');
        }
    
        container = this.container;
        providers[name] = Provider;
        providerName = name + 'Provider';
    
        properties = Object.create(null);
        properties[providerName] = {
            configurable : true,
            enumerable : true,
            get : function getProvider() {
                var Constructor = providers[name], instance;
                if (Constructor) {
                    instance = new Constructor();
                    delete container[providerName];
                    container[providerName] = instance;
                }
                return instance;
            }
        };
    
        properties[name] = {
            configurable : true,
            enumerable : true,
            get : function getService() {
                var provider = container[providerName], instance;
                if (provider) {
                    instance = provider.$get(container);
    
                    // filter through middlewear
                    instance = getMiddlewear(id, '__global__')
                        .concat(getMiddlewear(id, name))
                        .reduce(reducer, instance);
    
                    delete container[providerName];
                    delete container[name];
    
                    container[name] = instance;
                }
                return instance;
            }
        };
    
        Object.defineProperties(container, properties);
        return this;
    };
    /**
     * Map used to inject dependencies in the generic factory;
     *
     * @param String key
     * @return mixed
     */
    var mapContainer = function mapContainer(key) {
        return this.container[key];
    };
    
    /**
     * Register a service inside a generic factory.
     *
     * @param String name
     * @param Function Service
     * @return Bottle
     */
    var service = function service(name, Service) {
        var deps = arguments.length > 2 ? slice.call(arguments, 1) : null;
        var bottle = this;
        return factory.call(bottle, name, function GenericFactory() {
            if (deps) {
                Service = Service.bind.apply(Service, deps.map(mapContainer, bottle));
            }
            return new Service();
        });
    };
    /**
     * Register a value
     *
     * @param String name
     * @param mixed val
     * @return
     */
    var value = function value(name, val) {
        Object.defineProperty(this.container, name, {
            configurable : true,
            enumerable : true,
            value : val,
            writable : true
        });
    
        return this;
    };
    
    /**
     * Bottle constructor
     */
    var Bottle = function Bottle() {
    	if (!(this instanceof Bottle)) {
    		return new Bottle();
    	}
    	this.id = id++;
    	this.container = {};
    };
    
    /**
     * Bottle prototype
     */
    Bottle.prototype = {
        constant : constant,
        factory : factory,
        middlewear : middlewear,
        provider : provider,
        service : service,
        value : value
    };
    
    /**
     * Bottle static
     */
    Bottle.pop = function pop() {
    	return new Bottle();
    };
    /**
     * Exports script adapted from lodash v2.4.1 Modern Build
     *
     * @see http://lodash.com/
     */
    
    /**
     * Valid object type map
     *
     * @type Object
     */
    var objectTypes = {
        'function' : true,
        'object' : true
    };
    
    (function exportBottle(root) {
    
        /**
         * Free variable exports
         *
         * @type Function
         */
        var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
    
        /**
         * Free variable module
         *
         * @type Object
         */
        var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
    
        /**
         * CommonJS module.exports
         *
         * @type Function
         */
        var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
    
        /**
         * Free variable `global`
         *
         * @type Object
         */
        var freeGlobal = objectTypes[typeof global] && global;
        if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
            root = freeGlobal;
        }
    
        /**
         * Export
         */
        if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
            root.Bottle = Bottle;
            define(function() { return Bottle; });
        } else if (freeExports && freeModule) {
            if (moduleExports) {
                (freeModule.exports = Bottle).Bottle = Bottle;
            } else {
                freeExports.Bottle = Bottle;
            }
        } else {
            root.Bottle = Bottle;
        }
    }((objectTypes[typeof window] && window) || this));
}.call(this));