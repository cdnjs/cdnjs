//
//     custom-elements-builder 0.3.4 http://tmorin.github.io/custom-elements-builder
//     Just a Custom Elements builder, natively scalable and designed for FRP.
//     Buil date: 2015-03-23
//     Copyright 2015-2015 Thibault Morin
//     Available under MIT license
//
(function (g, factory) {
    'use strict';

    // Export the **ceb-feature-frp** function according the detected loader.

    /* istanbul ignore next */
    if(typeof exports === 'object') {
        module.exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        define('ceb-feature-frp', [], factory);
    } else {
        g.cebFeatureFrp = factory();
    }

}(this, function () {
    'use strict';

    // ## Feature function

    // The FRP feature's function returns nothing for public API.
    function feature(el) {
        if(!el.__cebFrpScope) {
            el.__cebFrpScope = {};
        }
        return el.__cebFrpScope;
    }

    // ## Default library

    feature.defaultLibrary = 'none';

    feature.libraries = {
        none: {}
    };

    // This function must returns the instance to the property observer.
    // > @param el (HTMLElement) the current element
    /* istanbul ignore next */
    feature.libraries.none.propertyObserverFactory = function defaultPropertyObserverFactory() {
        throw new Error('not implemented!');
    };

    // When the observed property is set, the value must be pushed into the stream.
    // > @param next (function) will call the next stacked callback
    // > @param el (HTMLElement) the current element
    // > @param propName (string) the name of the observed property
    // > @param value (*) the value of the previous stacked callback
    /* istanbul ignore next */
    feature.libraries.none.propertyObservableInterceptor = function defaultPropertyObservableInterceptor(next, el, propName, value) {
        throw new Error('not implemented!');
    };

    // This function must clear the observers instances given as argument.
    // > @param observer (object) the observer to kick
    /* istanbul ignore next */
    feature.libraries.none.disposeDisposable = function defaultDisposeDisposable(observer) {
        throw new Error('not implemented!');
    };

    // ## Observer factory

    feature.disposable = function (disposableFactory) {
        disposableFactory.handlers = function (handlersFactory) {
            return function (el) {
                var disposable = disposableFactory(el);
                var anotherDisposable = handlersFactory(el, disposable);
                if(anotherDisposable) {
                    return anotherDisposable;
                }
                return disposable;
            };
        };
        return disposableFactory;
    };

    // ## Setup

    // Return a new empty function.
    function emptyFn() {
        return function () {};
    }

    feature.setup = function (struct, builder, options) {
        var observerProperties = {};
        var defaultLibrary = feature.libraries[options.library || feature.defaultLibrary];
        // Resolve the locked functions.
        var propertyObserverFactory = options.propertyObserverFactory || defaultLibrary.propertyObserverFactory;
        var propertyObservableInterceptor = options.propertyObservableInterceptor || defaultLibrary.propertyObservableInterceptor;
        var disposeDisposable = options.disposeDisposable || defaultLibrary.disposeDisposable;

        // Iterate over the structure's properties in order to detect the observable properties.
        Object.keys(struct.properties).map(function (propName) {
            return {
                propName: propName,
                property: struct.properties[propName]
            };
        }).filter(function (entry) {
            return entry.property.observable;
        }).forEach(function (entry) {
            // Create the observer property of the observed property.
            observerProperties[entry.propName + 'Observer'] = {
                valueFactory: propertyObserverFactory
            };
            // Set is required for interception
            if(!entry.property.attName && !entry.property.set) {
                entry.property.set = emptyFn();
            }
            // Register the interceptor which will sync the observer with the property's value.
            builder.intercept(entry.propName, propertyObservableInterceptor);
        });

        // Add the new properties to the structure.
        builder.properties(observerProperties);

        builder.wrap('createdCallback', function (next, el) {
            next(arguments);
            // When the element is created the observers must created.
            feature(el).disposables = (options.disposables || []).map(function (disposableFactory) {
                return disposableFactory(el);
            });
        });

        builder.wrap('attachedCallback', function (next, el) {
            // When the element is attached the observers of properties must be available ...
            Object.keys(observerProperties).forEach(function (propName) {
                if(!el[propName]) {
                    el[propName] = propertyObserverFactory(el);
                }
            });
            // ... and the others observers too.
            if(!feature(el).disposables) {
                feature(el).disposables = (options.disposables || []).map(function (disposableFactory) {
                    return disposableFactory(el);
                });
            }
            next(arguments);
        });

        builder.wrap('detachedCallback', function (next, el) {
            next(arguments);
            // When the element is detached the observers of properties must be disposed ...
            Object.keys(observerProperties).forEach(function (propName) {
                disposeDisposable(el[propName]);
                el[propName] = undefined;
            });
            // ... and the others observers too.
            feature(el).disposables.forEach(disposeDisposable);
            feature(el).disposables = null;
        });
    };

    return feature;
}));