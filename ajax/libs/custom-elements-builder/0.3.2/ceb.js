//
//     custom-elements-builder 0.3.2 http://tmorin.github.io/custom-elements-builder
//     Custom Elements Builder (ceb) is ... a builder for Custom Elements.
//     Buil date: 2015-03-04
//     Copyright 2015-2015 Thibault Morin
//     Available under MIT license
//
(function (g, factory) {
    'use strict';

    // Export the **ceb** function according the detected loader.

    /* istanbul ignore next */
    if(typeof exports === 'object') {
        module.exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        define('ceb', [], factory);
    } else {
        g.ceb = factory();
    }

}(this, function () {
    'use strict';

    // ## Polyfill

    /* istanbul ignore next */
    if(!('assign' in Object)) {
        /* https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js */
        Object.defineProperty(Object, 'assign', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: function polyfillAssign() {
                return Array.prototype.reduce.call(arguments, function (target, source) {
                    return Object.keys(Object(source)).reduce(function (target, key) {
                        target[key] = source[key];
                        return target;
                    }, target);
                });
            }
        });
    }

    // ## Tools

    // Return a new empty function.
    function emptyFn() {
        return function () {};
    }

    // List the values of an object.
    function listValues(o) {
        return Object.keys(o).map(function (propName) {
            return o[propName];
        });
    }

    // Transform property notation to attribute notation.
    function fromCamelCaseToHyphenCase(value) {
        return value.split(/(?=[A-Z])/).map(function (part) {
            return part.charAt(0).toLowerCase() + part.slice(1);
        }).join('-');
    }

    // Compare object according to their levels.
    function compareLevels(a, b) {
        return a.level - b.level;
    }

    // Apply an attribute value to an element.
    function applyAttributeValue(el, attName, value, isBoolean) {
        if(isBoolean) {
            // Handle boolean value
            if(value && !el.hasAttribute(attName)) {
                // Set attribute only if the attribute is not preset
                el.setAttribute(attName, '');
            } else if(!value && el.hasAttribute(attName)) {
                // The value is false so the attribute must be removed
                el.removeAttribute(attName);
            }
        } else {
            // Handle none boolean value
            if((value === null || value === undefined) && el.hasAttribute(attName)) {
                // There is no value, so the attribute must be removed
                el.removeAttribute(attName);
            } else if((value !== null && value !== undefined) && el.getAttribute(attName) !== value) {
                // Sync the attribute value with value
                el.setAttribute(attName, value);
            }
        }
    }

    // Create an accessor function in order to wrap the original accessor with its accessors.
    function accessorFactory(wrappers, wrapped, propName) {
        // Order the stack of wrappers
        var stack = wrappers.sort(compareLevels);
        return function accessor() {
            var el = this;
            // The first function of the stack is called,
            // calling the next function when its argument function next is called.
            // The original accessor is the last call.
            return stack.reduce(function (previous, current) {
                return current.bind(el, previous, el, propName);
            }, wrapped.bind(el, el, propName)).apply(el, arguments);
        };
    }

    // Create the accessor set for a property linked to an attribute
    function attributeAccessorSetFactory(attName, setter, isBoolean) {
        return function attributeAccessorSet(el, propName, value) {
            // By default, the attribute value is the set value.
            var attValue = value;
            if(setter) {
                // The default value can be overridden by a given setter.
                attValue = setter.call(el, el, propName, value);
            }
            // Finally apply the attribute to the linked attribute.
            applyAttributeValue(el, attName, attValue, isBoolean);
        };
    }

    // Create the accessor get for a property linked to an attribute
    function attributeAccessorGetFactory(attName, getter, isBoolean) {
        return function attributeAccessorGet(el, propName) {
            // By default, the returned value is the attribute value.
            var value = isBoolean ? el.hasAttribute(attName) : el.getAttribute(attName);
            if(getter) {
                // The returned value can be overridden by a given getter.
                value = getter.call(el, el, propName, value);
            }
            // Finally the value is returned
            return value;
        };
    }

    // Create an element's method
    function methodFactory(wrappers, wrapped) {
        // Order the stack of wrappers
        var stack = wrappers.sort(compareLevels);
        return function () {
            var el = this;
            // The first function of the stack is called, calling the next function when its argument function next is called.
            // The original method is the last call.
            return stack.reduce(function (previous, current) {
                return current.bind(el, function next(args) {
                    return previous.apply(el, Array.prototype.slice.call(args).slice(2, args.length));
                }, el);
            }, wrapped.bind(el, el)).apply(el, arguments);
        };
    }

    // ## Life cycle

    // Sanitize a structure to avoid the errors `?? not defined`
    function sanitizeStructure(struct) {
        struct.prototype = struct.prototype || Object.create(HTMLElement.prototype);
        struct.features = struct.features || [];
        struct.interceptors = struct.interceptors || [];
        struct.wrappers = struct.wrappers || [];
        struct.listeners = struct.listeners || [];
        struct.properties = struct.properties || {};
        struct.methods = Object.assign({
            createdCallback: emptyFn(),
            attachedCallback: emptyFn(),
            detachedCallback: emptyFn(),
            attributeChangedCallback: emptyFn()
        }, struct.methods);
        return struct;
    }

    // Call the setup's method of features.
    function setupFeatures(struct) {
        // Create a builder from the current structure.
        var b = builder(struct.tagName, {
            struct: struct,
            registered: true
        });
        // Call setup functions according their features's levels.
        struct.features.sort(compareLevels).forEach(function (feature) {
            if(feature.fn && feature.fn.setup) {
                feature.fn.setup(struct, b, feature.options);
            }
        });
    }

    // Create an hash of attributes from the structure's properties.
    // The hash of attributes is used to keep in sync properties' values and attributes' values.
    function createAttributesHash(struct) {
        return listValues(struct.properties).filter(function (property) {
            return property.attName;
        }).reduce(function (previous, current) {
            previous[current.attName] = current;
            return previous;
        }, {});
    }

    // Create an hash of defined properties from the structure's properties.
    // The defined properties are the input of Object.defineProperties().
    function createDefinedPropertiesHash(struct) {
        return listValues(struct.properties).map(function (property) {
            // By default properties should not be configurable but enumerable.
            var definedProperty = {
                configurable: false,
                enumerable: true
            };

            if(property.attribute) {
                // Create attribute accessors.
                property.set = attributeAccessorSetFactory(property.attName, property.setter, !!property.attribute.boolean);
                property.get = attributeAccessorGetFactory(property.attName, property.getter, !!property.attribute.boolean);
            } else if(property.hasOwnProperty('value') && property.hasOwnProperty('writable') && !property.writable) {
                // A constant has a value which is not writable.
                definedProperty.value = property.value;
                definedProperty.writable = false;
                if(property.hasOwnProperty('enumerable')) {
                    definedProperty.enumerable = property.enumerable;
                }
            } else if(!property.set && !property.get) {
                // A none constant property without accessor must be writable.
                definedProperty.writable = true;
            }

            if(!definedProperty.hasOwnProperty('writable')) {
                // Create the property's function set and get according to their interceptors.
                var interceptors = struct.interceptors[property.propName] || {};
                if(property.set) {
                    var setStack = interceptors.set || [];
                    definedProperty.set = accessorFactory(setStack, property.set, property.propName);
                }
                if(property.get) {
                    var getStack = interceptors.get || [];
                    definedProperty.get = accessorFactory(getStack, property.get, property.propName);
                }
            }

            // Finally add the defined property to the current property.
            return Object.assign(property, {
                definedProperty: definedProperty
            });
        }).reduce(function (previous, current) {
            previous[current.propName] = current.definedProperty;
            return previous;
        }, {});
    }

    // Create an hash of methods from the structure's methods.
    function createMethodsHash(struct) {
        // Iterate over methods in order to wrap them with their wrappers.
        return Object.keys(struct.methods).map(function (methName) {
            var stack = struct.wrappers[methName] || [];
            var fn = struct.methods[methName];
            return {
                methName: methName,
                fn: methodFactory(stack, fn)
            };
        }).reduce(function (previous, current) {
            previous[current.methName] = current.fn;
            return previous;
        }, {});
    }

    // ## Build

    // Work with the structure in order to register the corresponding custom element.
    function build(struct) {
        // Clean the structure to avoid potential errors.
        sanitizeStructure(struct);

        // Let's feature enhanced the structure.
        setupFeatures(struct);

        // Build an hash of attribute for sync attributes' and properties' values.
        struct.attributes = createAttributesHash(struct);

        // Create the public properties definition of the custom element.
        var definedProperties = createDefinedPropertiesHash(struct);
        // Apply the public properties definition to the custom element prototype.
        Object.defineProperties(struct.prototype, definedProperties);

        // Override the originals methods to create the wrapped ones.
        var wrappedMethods = createMethodsHash(struct);

        // Apply the wrapped methods to the custom element prototype.
        Object.assign(struct.prototype, wrappedMethods);

        // Register the custom element according to its structure.
        return document.registerElement(struct.tagName, struct);
    }

    // ## Built-in feature

    // **ceb** defines an internal feature in order to add runtime functionalities:
    // - initialize properties' values
    // - add and remove event listeners
    // - sync properties' values when theirs linked attributes change
    // - handle delegation of property access to a child element

    // ### Interceptors

    // Intercept write accesses of delegable properties.
    function delegableSetAccessorInterceptor(property, next, el, propName, value) {
        next(value);
        // Logic should be done after the effective write.
        var target = el.querySelector(property.delegate.target);
        /* istanbul ignore else  */
        if(target) {
            // Resolve the eventual targeted property's name or attribute's name.
            var targetPropName = property.delegate.property;
            var targetAttName = property.delegate.attribute;
            if(!targetPropName && !targetAttName) {
                targetPropName = property.propName;
                targetAttName = property.attName;
            }
            // Check the boolean nature of the value.
            var isBoolean = property.attribute && !!property.attribute.boolean;
            if(property.delegate.hasOwnProperty('boolean')) {
                isBoolean = property.delegate.boolean;
            }
            // Apply change to the child.
            if(targetAttName) {
                // Update the child's attribute value.
                applyAttributeValue(target, targetAttName, value, isBoolean);
            } else {
                // Update the child's property value.
                target[targetPropName] = value;
            }
        }
    }

    // Intercept read accesses of delegable properties.
    function delegableGetAccessorInterceptor(property, next, el, propName, value) {
        var result = next(value);
        // Logic should be done after the effective write.
        var target = el.querySelector(property.delegate.target);
        /* istanbul ignore else  */
        if(target) {
            // Resolve the eventual targeted property's name or attribute's name.
            var targetPropName = property.delegate.property;
            var targetAttName = property.delegate.attribute;
            if(!targetPropName && !targetAttName) {
                targetPropName = property.propName;
                targetAttName = property.attName;
            }
            // Check the boolean nature of the value.
            var isBoolean = property.attribute && !!property.attribute.boolean;
            if(property.delegate.hasOwnProperty('boolean')) {
                isBoolean = property.delegate.boolean;
            }
            // Get value from the child.
            if(targetAttName) {
                // Get the child's attribute value.
                result = isBoolean ? target.hasAttribute(targetAttName) : target.getAttribute(targetAttName);
            } else {
                // Get the child's property value.
                result = target[targetPropName];
            }
        }
        return result;
    }

    // ### Listeners

    // DOM event listener calling the structure's event listener.
    function eventListener(el, fn, evt) {
        fn(el, evt);
    }

    // ### Feature's functions

    // Initialize the builtInFeature;
    var builtInFeature = emptyFn();
    // The setup function of the built-in feature
    builtInFeature.setup = function (struct, builder) {
        // Iterate over structure's properties in order to detect delegable properties.
        listValues(struct.properties).filter(function (property) {
            return property.delegate;
        }).forEach(function (property) {
            if(!property.attName) {
                // Force the existence of getter and setter to handle interception.
                property.set = property.set || emptyFn();
                property.get = property.get || emptyFn();
            }
            // Create interceptor for the delegable property.
            builder.intercept(
                property.propName,
                delegableSetAccessorInterceptor.bind(this, property),
                delegableGetAccessorInterceptor.bind(this, property)
            );
        });
        // Apply initial values to properties.
        builder.wrap('createdCallback', function (next, el) {
            next(arguments);
            listValues(struct.properties).filter(function (property) {
                // Skip only properties having an attribute's value set.
                return !el.hasAttribute(property.attName);
            }).forEach(function (property) {
                if(property.hasOwnProperty('value') && property.writable) {
                    el[property.propName] = property.value;
                } else if(property.valueFactory) {
                    el[property.propName] = property.valueFactory(el);
                }
            });
        });
        // Apply attributes' values to properties.
        builder.wrap('createdCallback', function (next, el) {
            next(arguments);
            // Initialize the attributes' value after the call of the createdCallback method.
            listValues(struct.properties).filter(function (property) {
                // Keep only properties having an attribute's value set.
                return el.hasAttribute(property.attName);
            }).forEach(function (property) {
                el[property.propName] = property.attribute.boolean ? true : el.getAttribute(property.attName);
            });
        }, Number.MAX_VALUE);
        // Wrap the method attachedCallback.
        builder.wrap('attachedCallback', function (next, el) {
            next(arguments);
            // Add the event listeners after the call of the attachedCallback method.
            el.__eventHandlers = struct.listeners.map(function (listener) {
                var target = listener.target ? el.querySelector(listener.target) : el;
                var callback = eventListener.bind(el, el, listener.fn);
                target.addEventListener(listener.event, callback, true);
                return {
                    event: listener.event,
                    target: target,
                    callback: callback
                };
            });
        });
        // Wrap the method detachedCallback.
        builder.wrap('detachedCallback', function (next, el) {
            // Remove the event listeners before the call of the detachedCallback method.
            el.__eventHandlers.forEach(function (handler) {
                handler.target.removeEventListener(handler.event, handler.callback, true);
            });
            el.__eventHandlers = null;
            next(arguments);
        });
        // Wrap the method attributeChangedCallback.
        builder.wrap('attributeChangedCallback', function (next, el, attName, oldVal, newVal) {
            // Synchronize the attributes' values with their properties
            var property = struct.attributes[attName];
            if(property) {
                var value = newVal;
                if(property.attribute.boolean) {
                    value = typeof newVal === 'string' ? true : false;
                }
                if(el[property.propName] !== value) {
                    el[property.propName] = value;
                }
            }
            next(arguments);
        });
    };

    // ## ceb

    // Create a base and valid structure;
    function baseStructFactory() {
        return {
            properties: {},
            methods: {},
            wrappers: [],
            interceptors: {},
            listeners: [],
            features: [{
                fn: builtInFeature
            }]
        };
    }

    // Sanitize the properties on the fly
    function sanitizeProperty(property) {
        if(property.attribute) {
            // A property linked to an attribute must have a valid attribute name
            property.attName = fromCamelCaseToHyphenCase(property.attribute.name || property.propName);
        }
        // By default a property is writable
        property.writable = property.hasOwnProperty('writable') ? property.writable : true;
        return property;
    }

    // Provides the sugar API of **ceb**.
    function builder(tagName, params) {
        // The structure of the builder can be given from the parameters.
        var struct = params && params.struct ? sanitizeStructure(params.struct) : baseStructFactory();
        // A structure must have a tag name.
        struct.tagName = tagName;
        // A strucuture which is already registered will not register the custom element twice.
        var registered = params && params.hasOwnProperty('registered') ? params.registered : false;
        var api = {};
        // Add a wrapper to the structure.
        api.wrap = function (methName, fn, level) {
            if(!struct.wrappers[methName]) {
                struct.wrappers[methName] = [];
            }
            fn.level = isNaN(level) ? 0 : level;
            struct.wrappers[methName].push(fn);
            return api;
        };
        // Add an interceptor to the structure.
        api.intercept = function (propName, setFn, getFn, level) {
            if(!struct.interceptors[propName]) {
                struct.interceptors[propName] = {
                    set: [],
                    get: []
                };
            }
            if(setFn) {
                setFn.level = isNaN(level) ? 0 : level;
                struct.interceptors[propName].set.push(setFn);
            }
            if(getFn) {
                getFn.level = isNaN(level) ? 0 : level;
                struct.interceptors[propName].get.push(getFn);
            }
            return api;
        };
        // Set the extends value
        api['extends'] = function (anExtend) {
            struct['extends'] = anExtend;
            return api;
        };
        // Set the herited prototype
        api.prototype = function (aProto) {
            struct.prototype = aProto;
            return api;
        };
        // Add properties to the structure.
        api.properties = function (someProperties) {
            var sanitizedProperties = Object.keys(someProperties).map(function (propName) {
                var givenValue = someProperties[propName];
                var currentValue = struct.properties[propName];
                return Object.assign({
                    propName: propName
                }, givenValue, currentValue || {});
            }).map(sanitizeProperty).reduce(function (previous, current) {
                previous[current.propName] = current;
                return previous;
            }, {});
            Object.assign(struct.properties, sanitizedProperties);
            return api;
        };
        // Add methods to the structure.
        api.methods = function (someMethods) {
            Object.assign(struct.methods, someMethods);
            return api;
        };
        // Add a listener to the structure.
        api.listen = function (queries, fn) {
            queries.trim().split(',').map(function (query) {
                var parts = query.trim().split(' ');
                return {
                    event: parts[0].trim(),
                    target: (parts[1] || '').trim(),
                    fn: fn
                };
            }).forEach(function (listener) {
                struct.listeners.push(listener);
            });
            return api;
        };
        // Add a feature to the structure.
        api.feature = function (fn, options, level) {
            struct.features.push({
                fn: fn,
                options: options || {},
                level: isNaN(level) ? 0 : level
            });
            return api;
        };
        // Register the custom element if not already done.
        api.register = function () {
            if(!registered) {
                registered = true;
                return build(struct);
            }
        };
        // Get the current structure.
        api.get = function () {
            return struct;
        };
        return api;
    }

    // The `ced()` function.
    function ceb(params) {
        var api = {};
        // A builder is given when a name is known.
        api.name = function (tagName) {
            return builder(tagName, params);
        };
        return api;
    }

    return ceb;
}));
