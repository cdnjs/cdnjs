/**
 * Base functionality
*/
import { __extends } from "tslib";
import { List, ListTemplate } from "./utils/List";
import { OrderedListTemplate, SortedListTemplate } from "./utils/SortedList";
import { Dictionary, DictionaryTemplate } from "./utils/Dictionary";
import { Disposer } from "./utils/Disposer";
import { EventDispatcher } from "./utils/EventDispatcher";
import { Adapter } from "./utils/Adapter";
import { Color, color } from "./utils/Color";
import { Percent, percent } from "./utils/Percent";
import { registry } from "./Registry";
import { cache } from "./utils/Cache";
import * as $array from "./utils/Array";
import * as $object from "./utils/Object";
import * as $type from "./utils/Type";
//import * as $debug from "./utils/Debug";
/**
 * Provides base functionality for all derivative objects, like generating ids,
 * handling cache, etc.
 */
var BaseObject = /** @class */ (function () {
    //protected _classes: { [index: string]: any } = {};
    /**
     * Constructor
     * * Sets class name
     */
    function BaseObject() {
        /**
         * Indicates if this object has already been deleted. Any
         * destruction/disposal code should take this into account when deciding
         * wheter to run potentially costly disposal operations if they already have
         * been run.
         */
        this._disposed = false;
        /**
         * List of IDisposer which will be disposed when the BaseObject is disposed.
         */
        this._disposers = [];
        this.className = "BaseObject";
        //this.debug();
    }
    BaseObject.prototype.debug = function () {
        //$debug.debug(this);
    };
    Object.defineProperty(BaseObject.prototype, "uid", {
        /**
         * Returns object's internal unique ID.
         *
         * @return Unique ID
         */
        get: function () {
            if (!this._uid) {
                this._uid = registry.getUniqueId();
                registry.map.setKey(this._uid, this);
            }
            return this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObject.prototype, "id", {
        /**
         * @return Id
         */
        get: function () {
            return this._id;
        },
        /**
         * Sets the user-defined id of the element.
         *
         * @param value Id
         */
        set: function (value) {
            //registry.map.setKey(value, this); // registry.map only stores by uid
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObject.prototype, "map", {
        /**
         * Returns a universal collection for mapping ids with objects.
         *
         * @ignore Exclude from docs
         * @return Map collection
         */
        get: function () {
            if (!this._map) {
                this._map = new Dictionary();
            }
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObject.prototype, "delayedMap", {
        /**
         * Returns mapping for objects referenced by id in JSON config that are not yet
         * available at processing time.
         *
         * @ignore Exclude from docs
         * @return Map collection
         */
        get: function () {
            if (!this._delayedMap) {
                this._delayedMap = new Dictionary();
            }
            return this._delayedMap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Logs an id and property of the target element that is not yet available
     * for later assignment.
     *
     * @ignore
     * @param  property  Property to set
     * @param  id        ID of the target element
     */
    BaseObject.prototype.addDelayedMap = function (property, id) {
        var map = this.delayedMap;
        if (!map.hasKey(id)) {
            map.setKey(id, []);
        }
        var list = map.getKey(id);
        list.push({
            property: property,
            target: this
        });
    };
    /**
     * Processes delayed JSON config items.
     *
     * @ignore
     */
    BaseObject.prototype.processDelayedMap = function () {
        var _this = this;
        this.delayedMap.each(function (id, list) {
            if (_this.map.hasKey(id)) {
                var target_1 = _this.map.getKey(id);
                $array.each(list, function (item) {
                    item.target[item.property] = target_1;
                });
                _this.delayedMap.removeKey(id);
            }
        });
    };
    /**
     * Applies properties from all assigned themes.
     *
     * @ignore Exclude from docs
     */
    BaseObject.prototype.applyTheme = function () {
        var _this = this;
        // TODO is this needed ?
        if (registry) {
            var themes = this.getCurrentThemes();
            // TODO is this needed ?
            if (themes) {
                $array.each(themes, function (theme, index) {
                    theme(_this);
                });
            }
        }
    };
    Object.defineProperty(BaseObject.prototype, "themes", {
        /**
         * @ignore Exclude from docs
         * @return An array of themes
         */
        get: function () {
            return this._themes;
        },
        /**
         * A list of themes to be used for this element.
         *
         * @ignore Exclude from docs
         * @param value An array of themes
         */
        set: function (value) {
            this._themes = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a list of themes that should be applied to this element. It could
     * either be a list of themes set explicitly on this element, or system-wide.
     *
     * @return List of themes
     */
    BaseObject.prototype.getCurrentThemes = function () {
        return this.themes || registry.themes;
    };
    /**
     * Returns if this object has been already been disposed.
     *
     * @return Is disposed?
     */
    BaseObject.prototype.isDisposed = function () {
        return this._disposed;
    };
    /**
     * Destroys this object and all related data.
     */
    BaseObject.prototype.dispose = function () {
        if (!this._disposed) {
            this._disposed = true;
            var a = this._disposers;
            this._disposers = null;
            while (a.length !== 0) {
                var disposer = a.shift();
                disposer.dispose();
            }
            // Clear cache
            this.clearCache();
            // remove from clones list
            if (this.clonedFrom) {
                this.clonedFrom.clones.removeValue(this);
            }
            var uid = this._uid;
            if (uid != null) {
                registry.map.removeKey(uid);
            }
        }
    };
    /**
     * Adds an IDisposer, which will be disposed when this object is disposed.
     *
     * @param target Object to dispose
     * @ignore Exclude from docs
     */
    BaseObject.prototype.addDisposer = function (target) {
        this._disposers.push(target);
    };
    /**
     * Disposes disposable object and removes it from `_disposers`.
     *
     * @param target Object to dispose
     * @ignore Exclude from docs
     */
    BaseObject.prototype.removeDispose = function (target) {
        //if(target){
        if (!this._disposed) {
            var index = $array.indexOf(this._disposers, target);
            if (index > -1) {
                this._disposers.splice(index, 1);
            }
        }
        target.dispose();
        //}
    };
    /**
     * Makes a copy of this object and returns the clone. Try to avoid cloning complex objects like chart, create new instances if you need them.
     *
     * @param cloneId  An id to use for clone (if not set a unique id will be generated)
     * @returns Clone
     */
    BaseObject.prototype.clone = function (cloneId) {
        if (!cloneId) {
            cloneId = "clone-" + registry.getUniqueId();
        }
        var newObject = new this.constructor();
        newObject.cloneId = cloneId;
        newObject.copyFrom(this);
        // add to clones list
        // this.clones.push(newObject); // moved this to copyFrom
        return newObject;
    };
    Object.defineProperty(BaseObject.prototype, "clones", {
        /**
         * Returns a collection of object's clones.
         *
         * @ignore Exclude from docs
         * @return Clones
         */
        get: function () {
            if (!this._clones) {
                this._clones = new List();
            }
            return this._clones;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all properties and related data from different element.
     *
     * @param object Source element
     */
    BaseObject.prototype.copyFrom = function (object) {
        object.clones.push(this); // do not moveValue, as it is expensive! even if there will be several items in clones list, it's not that bad.
        this.clonedFrom = object;
    };
    Object.defineProperty(BaseObject.prototype, "className", {
        /**
         * @ignore Exclude from docs
         * @return Class name
         */
        get: function () {
            return this._className;
        },
        /**
         * Element's class name. (a class that was used to instantiate the element)
         *
         * @ignore Exclude from docs
         * @param value  Class name
         */
        set: function (value) {
            this._className = value;
            /*if (registry) {
                registry.registeredClasses[value] = typeof this;
            }*/
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Caches value in object's cache.
     *
     * @ignore Exclude from docs
     * @param key    Key
     * @param value  Value
     * @param ttl    TTL in seconds
     */
    BaseObject.prototype.setCache = function (key, value, ttl) {
        cache.set(this.uid, key, value, ttl);
    };
    /**
     * Retrieves cached value.
     *
     * If optional second padarameter is specified, it will return that value
     * if cache is not available or is expired.
     *
     * @ignore Exclude from docs
     * @param key    Key
     * @param value  Value to return if cache is not available
     * @return Value
     */
    BaseObject.prototype.getCache = function (key, value) {
        if (value === void 0) { value = undefined; }
        return cache.get(this.uid, key, value);
    };
    /**
     * Clears object's local cache.
     *
     * @ignore Exclude from docs
     */
    BaseObject.prototype.clearCache = function () {
        cache.clear(this.uid);
    };
    /**
     * Creates [[Disposer]] for `setTimeout` function call. This ensures that all
     * timeouts created by the object will be cleared when object itself is
     * disposed.
     *
     * @ignore Exclude from docs
     * @param fn     Callback function
     * @param delay  Timeout (ms)
     * @return Disposer for timeout
     */
    BaseObject.prototype.setTimeout = function (fn, delay) {
        var _this = this;
        var id = setTimeout(function () {
            _this.removeDispose(disposer);
            fn();
        }, delay);
        var disposer = new Disposer(function () {
            clearTimeout(id);
        });
        this._disposers.push(disposer);
        return disposer;
    };
    /**
     * Creates [[Disposer]] for `setInterval` function call. This ensures that all
     * timeouts created by the object will be cleared when object itself is
     * disposed.
     *
     * @ignore Exclude from docs
     * @param fn     Callback function
     * @param delay  Timeout (ms)
     * @return Disposer for timeout
     */
    BaseObject.prototype.setInterval = function (fn, delay) {
        var _this = this;
        var id = setInterval(function () {
            _this.removeDispose(disposer);
            fn();
        }, delay);
        var disposer = new Disposer(function () {
            clearTimeout(id);
        });
        this._disposers.push(disposer);
        return disposer;
    };
    Object.defineProperty(BaseObject.prototype, "config", {
        /**
         * ==========================================================================
         * JSON-BASED CONFIG PROCESSING
         * ==========================================================================
         * @hidden
         */
        /**
         * Use this property to set JSON-based config. When set, triggers processing
         * routine, which will go through all properties, and try to apply values,
         * create instances, etc.
         *
         * Use this with caution, as it is a time-consuming process. It's used for
         * initialchart setup only, not routine operations.
         *
         * @param json JSON config
         */
        set: function (config) {
            try {
                this.processConfig(config);
            }
            catch (e) {
                /*if (this instanceof Sprite) {
                    this.raiseCriticalError(e);
                }*/
                this.raiseCriticalError(e);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes the JSON config.
     *
     * @param json  JSON config
     * @ignore Exclude from docs
     */
    BaseObject.prototype.processConfig = function (config) {
        var _this = this;
        if (!config) {
            return;
        }
        // Get target
        var target = this;
        // Iterate through all of the items
        $object.eachOrdered(config, function (configKey, value) {
            var configValue = value;
            // Is this a callback?
            if (configKey == "callback" && typeof value == "function") {
                value.call(target);
            }
            // Check if there's a property in target
            if (_this.hasProperty(configKey)) {
                var item_1;
                // Do we have instructions to create an object?
                // We create a new object if "type" key is set, but only if the
                // target object is of different type.
                if ($type.isObject(configValue)
                    && $type.hasValue(configValue["type"])
                    && (!$type.isObject(target[configKey])
                        || !$type.hasValue(target[configKey].className)
                        || configValue["forceCreate"]
                        || target[configKey].className != configValue["type"])
                    && !_this.asIs(configKey)) {
                    item_1 = _this.createClassInstance(configValue["type"]);
                    // Create new instance
                    if (item_1) {
                        target[configKey] = item_1;
                    }
                    else {
                        item_1 = target[configKey];
                    }
                }
                else {
                    // Get item from the object
                    item_1 = target[configKey];
                }
                /**
                 * It is...
                 * --------------------------------------------------------------------
                 */
                if (item_1 instanceof Adapter) {
                    // ... an Adapter, try to add handlers to it
                    // ------------------------------------------------------------------
                    _this.processAdapters(item_1, configValue);
                }
                else if (item_1 instanceof EventDispatcher) {
                    // ... an EventDispatcher, try to add handlers to it
                    // ------------------------------------------------------------------
                    _this.processEvents(item_1, configValue);
                }
                else if (configKey == "locale" && $type.isString(configValue)) {
                    // ... a locale specified as string, e.g. "fr_FR"
                    // ------------------------------------------------------------------
                    if (window["am4lang_" + configValue]) {
                        target[configKey] = window["am4lang_" + configValue];
                    }
                }
                else if (configKey == "parent" && $type.isString(configValue)) {
                    // ... a parent referred via its it
                    // ------------------------------------------------------------------
                    var parent_1 = _this.map.getKey(configValue);
                    if (parent_1) {
                        target[configKey] = parent_1;
                    }
                    else {
                        _this.addDelayedMap("parent", configValue);
                    }
                }
                else if (_this.asIs(configKey)) {
                    // ... a special field, just set it to new value
                    // ------------------------------------------------------------------
                    // (no need to add each indvidual item)
                    target[configKey] = configValue;
                }
                else if (_this.asFunction(configKey) && $type.isString(configValue)) {
                    // ... a field indicating function name to look for in registry
                    // ------------------------------------------------------------------
                    if ($type.hasValue(registry.registeredClasses[configValue])) {
                        target[configKey] = registry.registeredClasses[configValue];
                    }
                    else {
                        throw Error("Invalid easing function: " + configValue);
                    }
                }
                else if (configValue instanceof BaseObject) {
                    // ... a BaseObject object, we just going to use it as it is
                    // ------------------------------------------------------------------
                    target[configKey] = configValue;
                }
                else if (item_1 instanceof BaseObject) {
                    // ... another child BaseObject
                    // ------------------------------------------------------------------
                    // Let's just pass in config part in and let itself deal with it
                    item_1.config = configValue;
                }
                else if (item_1 instanceof ListTemplate || item_1 instanceof OrderedListTemplate || item_1 instanceof SortedListTemplate) {
                    // ... a list with template
                    // ------------------------------------------------------------------
                    // Let's see what we can do with it
                    if ($type.isArray(configValue)) {
                        // It's an array.
                        // Create a list item for entry, or try to apply properties to an
                        // existing entry if possible and it is present.
                        if (item_1 instanceof ListTemplate) {
                            _this.processListTemplate(configValue, item_1);
                        }
                        else {
                            _this.processOrderedTemplate(configValue, item_1);
                        }
                    }
                    else if ($type.isObject(configValue)) {
                        // It's a single oject.
                        // Treat it as a template.
                        if (configValue instanceof BaseObject) {
                            // Item is already a BaseObject, no need to process it further
                            item_1.template = configValue;
                        }
                        else {
                            // Now let's find out if the whole object if a template, or we
                            // need to get it from `template` key
                            var templateValue = void 0;
                            if ($type.hasValue(configValue.template)) {
                                templateValue = configValue.template;
                            }
                            else {
                                templateValue = configValue;
                            }
                            if (item_1.template instanceof BaseObject) {
                                // Template is a BaseObject so we will just let its config
                                // deal with the configuration
                                item_1.template.config = templateValue;
                            }
                            else {
                                $object.each(templateValue, function (entryKey, entryValue) {
                                    var listItem = item_1.template[entryKey];
                                    if (listItem instanceof Adapter) {
                                        _this.processAdapters(listItem, entryValue);
                                    }
                                    else if (listItem instanceof EventDispatcher) {
                                        _this.processEvents(listItem, entryValue);
                                    }
                                    else if (listItem instanceof DictionaryTemplate) {
                                        _this.processDictionaryTemplate(listItem, entryValue);
                                    }
                                    else if (item_1.template[entryKey] instanceof BaseObject) {
                                        // Template is a BaseObject. Let it deal with its own config.
                                        item_1.template[entryKey].config = entryValue;
                                    }
                                    else if ($type.isObject(entryValue) && $type.hasValue(entryValue["type"])) {
                                        listItem = _this.createClassInstance(entryValue["type"]);
                                        if (listItem) {
                                            if (listItem instanceof BaseObject) {
                                                listItem.config = entryValue;
                                            }
                                            item_1.template[entryKey] = listItem;
                                        }
                                        else {
                                            item_1.template[entryKey] = entryValue;
                                        }
                                    }
                                    else if (listItem instanceof List) {
                                        // It's List, process it
                                        _this.processList(entryValue, listItem);
                                    }
                                    else {
                                        // Aything else. Just assing and be done with it.
                                        item_1.template[entryKey] = _this.maybeColorOrPercent(entryValue);
                                    }
                                });
                            }
                            // Check maybe there are `values` to insert
                            if ($type.hasValue(configValue.values)) {
                                if (item_1 instanceof ListTemplate) {
                                    _this.processListTemplate(configValue.values, item_1);
                                }
                                else {
                                    _this.processOrderedTemplate(configValue.values, item_1);
                                }
                            }
                        }
                    }
                    else {
                        // Something else?
                        // Not sure what to do with it on a list - ignore
                    }
                }
                else if (item_1 instanceof List) {
                    // ... a list
                    // ------------------------------------------------------------------
                    if (configKey == "children") {
                        _this.processList(configValue, item_1, _this);
                    }
                    else {
                        _this.processList(configValue, item_1);
                    }
                }
                else if (item_1 instanceof DictionaryTemplate) {
                    // ... a dictionary with template
                    // ------------------------------------------------------------------
                    _this.processDictionaryTemplate(item_1, configValue);
                }
                else if (item_1 instanceof Dictionary) {
                    // ... a dictionary
                    // ------------------------------------------------------------------
                    _this.processDictionary(item_1, configValue);
                }
                else if (item_1 instanceof Color || item_1 instanceof Percent) {
                    // ... it's a Color or Percent
                    // ------------------------------------------------------------------
                    target[configKey] = _this.maybeColorOrPercent(configValue);
                }
                else if ($type.isObject(item_1) && $type.isObject(configValue)) {
                    // ... a regular object
                    // ------------------------------------------------------------------
                    $object.copyAllProperties(configValue, item_1);
                }
                else {
                    // ... something else - probably a simple property or object
                    // ------------------------------------------------------------------
                    // Maybe convert to `Percent` or `Color`?
                    configValue = _this.maybeColorOrPercent(configValue);
                    // Assign
                    target[configKey] = configValue;
                }
            }
            else if (!_this.isReserved(configKey)) {
                // Doesn't have property set. But we're going to assume JSON config
                // creator knows what he/she is doing and set it anyway.
                target[configKey] = configValue;
            }
        }, this.configOrder);
        // Any errors?
        if (this.processingErrors.length) {
            var errors = this.processingErrors.join("\n");
            this._processingErrors = [];
            throw Error(errors);
        }
    };
    /**
     * Tries to detect if value is color or percent and converts to proper object
     * if necessary.
     *
     * Returns the same source value if no color/percent detected
     *
     * @param value  Source value
     * @return Converted value
     */
    BaseObject.prototype.maybeColorOrPercent = function (value) {
        if ($type.isString(value)) {
            if (value.match(/^[\-]?[0-9.]+\%$/)) {
                return percent($type.toNumber(value));
            }
            else if (value.match(/^\#[0-9abcdef]{3,}$/i)) {
                return color(value);
            }
        }
        return value;
    };
    BaseObject.prototype.processAdapters = function (item, config) {
        var _this = this;
        if ($type.isArray(config)) {
            $array.each(config, function (entry, index) {
                item.add(entry.key, entry.callback, entry.priority || 0, _this);
            });
        }
        else if ($type.isObject(config)) {
            $object.each(config, function (key, entry) {
                if (!item.has(key, entry)) {
                    item.add(key, entry);
                }
            });
        }
    };
    BaseObject.prototype.processEvents = function (item, config) {
        var _this = this;
        if ($type.isArray(config)) {
            $array.each(config, function (entry, index) {
                item.on(entry.type, entry.callback, _this);
            });
        }
        else if ($type.isObject(config)) {
            $object.each(config, function (key, entry) {
                if (!item.has(key, entry)) {
                    item.on(key, entry);
                }
            });
        }
    };
    /**
     * Processes JSON config for a [[DictionaryTemplate]] item.
     *
     * @todo Description
     * @param item    Item
     * @param config  Config
     */
    BaseObject.prototype.processDictionaryTemplate = function (item, config) {
        // We can only process object
        // Not sure what to do with other types - ignore
        if ($type.isObject(config)) {
            // Create an entry for each item, or override properties for
            // existing one.
            $object.each(config, function (entryKey, entryValue) {
                var listItem;
                // Get existing one, or create a new one
                if (entryKey == "template") {
                    listItem = item.template;
                }
                else if (item.hasKey(entryKey)) {
                    listItem = item.getKey(entryKey);
                }
                else {
                    listItem = item.create(entryKey);
                }
                // Set data
                if (listItem instanceof BaseObject) {
                    listItem.config = entryValue;
                }
                else if ($type.isObject(listItem) && $type.isObject(entryValue)) {
                    $object.copyAllProperties(entryValue, listItem);
                }
                else {
                    listItem.setKey(entryKey, entryValue);
                }
            });
        }
    };
    /**
     * Processes JSON config for a [[Dictionary]] item.
     *
     * @todo Description
     * @param item    Item
     * @param config  Config
     */
    BaseObject.prototype.processDictionary = function (item, config) {
        // We can only process object
        // Not sure what to do with other types - ignore
        if ($type.isObject(config)) {
            // Create an entry for each item, or override properties for
            // existing one.
            // @todo support for non-basic types
            $object.each(config, function (entryKey, entryValue) {
                item.setKey(entryKey, entryValue);
            });
        }
    };
    /**
     * Processes [[ListTemplate]].
     *
     * @param configValue  Config value
     * @param item         Item
     */
    BaseObject.prototype.processListTemplate = function (configValue, item) {
        var _this = this;
        $array.each(configValue, function (entry, index) {
            var type = _this.getConfigEntryType(entry);
            var listItem;
            if (item.hasIndex(index) && !entry["forceCreate"]) {
                listItem = item.getIndex(index);
            }
            else if (entry instanceof BaseObject) {
                // Item is already a BaseObject, no need to process it further
                item.push(entry);
                return;
            }
            else if (type) {
                listItem = item.create(type);
            }
            else {
                listItem = item.create();
            }
            if (entry === listItem) {
                // It's already the same item, do nothing
            }
            else {
                if ($type.isObject(entry)) {
                    // If the list item is BaseObject, we just need to let it
                    // deal if its own config
                    if (listItem instanceof BaseObject) {
                        listItem.config = entry;
                    }
                    else if ($type.isObject(listItem) && $type.isObject(entry)) {
                        $object.copyAllProperties(entry, listItem);
                    }
                    else {
                        item.setIndex(item.indexOf(listItem), entry);
                    }
                }
            }
        });
        // Truncate the list if it contains less items than the config
        // array
        while (configValue.length > item.length) {
            item.pop();
        }
    };
    /**
     * Processes [[OrdererListTemplate]] or [[SortedListTemplate]].
     *
     * @param configValue  Config value
     * @param item         Item
     */
    BaseObject.prototype.processOrderedTemplate = function (configValue, item) {
        var _this = this;
        $array.each(configValue, function (entry, index) {
            var type = _this.getConfigEntryType(entry);
            var listItem;
            if (type) {
                listItem = item.create(type);
            }
            else {
                listItem = item.create();
            }
            if ($type.isObject(entry)) {
                // If the list item is BaseObject, we just need to let it
                // deal if its own config
                if (listItem instanceof BaseObject) {
                    listItem.config = entry;
                }
                else if ($type.isObject(listItem) && $type.isObject(entry)) {
                    $object.copyAllProperties(entry, listItem);
                }
                else {
                    item.insert(entry);
                }
            }
        });
    };
    /**
     * Processes [[List]].
     *
     * @param configValue  Config value
     * @param item         Item
     */
    BaseObject.prototype.processList = function (configValue, item, parent) {
        var _this = this;
        // Convert to array if necessary
        if (!$type.isArray(configValue)) {
            configValue = [configValue];
        }
        // It's an array
        // Create a list item for entry
        var itemCount = item.length;
        var extraCount = 0;
        $array.each(configValue, function (entry, index) {
            if ($type.isObject(entry)) {
                // An object.
                //
                // Let's see if we can instantiate a class out of it, or we need
                // to push it into list as it is.
                //
                // If there are items already at the specified index in the list,
                // apply properties rather than create a new one.
                var listItem = void 0;
                if ((index < itemCount) && !entry["forceCreate"]) {
                    listItem = item.getIndex(index);
                }
                else if (entry instanceof BaseObject) {
                    // Item is already a BaseObject, no need to process it further
                    item.push(entry);
                    return;
                }
                else {
                    extraCount++;
                    listItem = _this.createEntryInstance(entry);
                    if (parent) {
                        listItem.parent = parent;
                    }
                    else {
                        item.push(listItem);
                    }
                }
                // If the list item is BaseObject, we just need to let it
                // deal if its own config
                if (listItem instanceof BaseObject) {
                    listItem.config = entry;
                }
                else if ($type.isObject(listItem) && $type.isObject(entry)) {
                    $object.copyAllProperties(entry, listItem);
                }
            }
            else {
                // Basic value.
                // Just push it into list, or override existing value
                if (item.hasIndex(index)) {
                    item.setIndex(index, entry);
                }
                else {
                    item.push(entry);
                }
            }
        });
        // Truncate the list if it contains less items than the config
        // array
        while (!parent && (configValue.length + extraCount) < item.length) {
            item.pop();
        }
    };
    /**
     * This function is used to sort element's JSON config properties, so that
     * some properties that absolutely need to be processed last, can be put at
     * the end.
     *
     * @ignore Exclude from docs
     * @param a  Element 1
     * @param b  Element 2
     * @return Sorting number
     */
    BaseObject.prototype.configOrder = function (a, b) {
        if (a == b) {
            return 0;
        }
        // Language must come first, so it's all set up when the rest of the
        // elements are being instantiated
        else if (a == "language") {
            return -1;
        }
        else if (b == "language") {
            return 1;
        }
        else {
            return 0;
        }
    };
    /**
     * Checks if field should be just assigned as is, without any checking when
     * processing JSON config.
     *
     * Extending functions can override this function to do their own checks.
     *
     * @param field  Field name
     * @return Assign as is?
     */
    BaseObject.prototype.asIs = function (field) {
        return $array.indexOf(["locale"], field) != -1;
    };
    /**
     * Checks if field needs to be converted to function, if it is specified
     * as string.
     *
     * @param field  Field name
     * @return Assign as function?
     */
    BaseObject.prototype.asFunction = function (field) {
        return false;
    };
    /**
     * Creates a relevant class instance if such class definition exists.
     *
     * @ignore Exclude from docs
     * @param className  Class name
     * @return Instance
     */
    BaseObject.prototype.createClassInstance = function (className) {
        if ($type.hasValue(registry.registeredClasses[className])) {
            return new registry.registeredClasses[className]();
        }
        else {
            throw Error("Invalid type: \"" + className + "\".");
        }
    };
    /**
     * Creates a class instance for a config entry using it's type. (as set in
     * `type` property)
     *
     * @ignore Exclude from docs
     * @param config  Config part
     * @return Instance
     */
    BaseObject.prototype.createEntryInstance = function (config) {
        var res;
        if ($type.hasValue(config["type"])) {
            res = this.createClassInstance(config["type"]);
        }
        if (!res) {
            return config;
        }
        return res;
    };
    /**
     * Determines config object type.
     *
     * @ignore Exclude from docs
     * @param config  Config part
     * @return Type
     */
    BaseObject.prototype.getConfigEntryType = function (config) {
        if ($type.hasValue(config["type"])) {
            if ($type.hasValue(registry.registeredClasses[config["type"]])) {
                return registry.registeredClasses[config["type"]];
            }
            else {
                throw Error("Invalid type: \"" + config["type"] + "\".");
            }
        }
        return;
    };
    /**
     * Checks if this element has a property.
     *
     * @ignore Exclude from docs
     * @param prop  Property name
     * @return Has property?
     */
    BaseObject.prototype.hasProperty = function (prop) {
        return prop in this ? true : false;
    };
    /**
     * Checkes whether JSON key is a reserved keyword.
     *
     * @param key  Key
     * @return Reserved
     */
    BaseObject.prototype.isReserved = function (key) {
        return ["type", "forceCreate"].indexOf(key) !== -1;
    };
    Object.defineProperty(BaseObject.prototype, "processingErrors", {
        /**
         * A list of errors that happened during JSON processing.
         *
         * @return Errors
         */
        get: function () {
            if (!this._processingErrors) {
                this._processingErrors = [];
            }
            return this._processingErrors;
        },
        enumerable: true,
        configurable: true
    });
    return BaseObject;
}());
export { BaseObject };
;
/**
 * A version of [[BaseObject]] with events properties and methods.
 * Classes that use [[EventDispatcher]] should extend this instead of
 * [[BaseObject]] directly.
 */
var BaseObjectEvents = /** @class */ (function (_super) {
    __extends(BaseObjectEvents, _super);
    /**
     * Constructor
     */
    function BaseObjectEvents() {
        var _this = _super.call(this) || this;
        _this.className = "BaseObjectEvents";
        return _this;
    }
    Object.defineProperty(BaseObjectEvents.prototype, "events", {
        /**
         * An [[EventDispatcher]] instance
         */
        get: function () {
            if (!this._eventDispatcher) {
                this._eventDispatcher = new EventDispatcher();
                this._disposers.push(this._eventDispatcher);
            }
            return this._eventDispatcher;
        },
        enumerable: true,
        configurable: true
    });
    //public set events(value:EventDispatcher<AMEvent<this, this["_events"]>>){
    //	this._eventDispatcher = value;
    //}
    /**
     * Dispatches an event using own event dispatcher. Will automatically
     * populate event data object with event type and target (this element).
     * It also checks if there are any handlers registered for this sepecific
     * event.
     *
     * @param eventType Event type (name)
     * @param data      Data to pass into event handler(s)
     */
    BaseObjectEvents.prototype.dispatch = function (eventType, data) {
        // @todo Implement proper type check
        if (this._eventDispatcher) {
            if (this.events.isEnabled(eventType)) {
                if (data) {
                    data.type = eventType;
                    data.target = data.target || this;
                    this.events.dispatch(eventType, {
                        type: eventType,
                        target: this
                    });
                }
                else {
                    this.events.dispatch(eventType, {
                        type: eventType,
                        target: this
                    });
                }
            }
        }
    };
    /**
     * Works like `dispatch`, except event is triggered immediately, without
     * waiting for the next frame cycle.
     *
     * @param eventType Event type (name)
     * @param data      Data to pass into event handler(s)
     */
    BaseObjectEvents.prototype.dispatchImmediately = function (eventType, data) {
        // @todo Implement proper type check
        if (this._eventDispatcher) {
            if (this.events.isEnabled(eventType)) {
                if (data) {
                    data.type = eventType;
                    data.target = data.target || this;
                    this.events.dispatchImmediately(eventType, data);
                }
                else {
                    this.events.dispatchImmediately(eventType, {
                        type: eventType,
                        target: this
                    });
                }
            }
        }
    };
    /**
     * Copies all parameters from another [[Sprite]].
     *
     * @param source Source object
     */
    BaseObjectEvents.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (source._eventDispatcher) {
            this.events.copyFrom(source._eventDispatcher);
        }
    };
    return BaseObjectEvents;
}(BaseObject));
export { BaseObjectEvents };
//# sourceMappingURL=Base.js.map