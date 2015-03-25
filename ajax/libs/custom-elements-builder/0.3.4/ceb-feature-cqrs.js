//
//     custom-elements-builder 0.3.4 http://tmorin.github.io/custom-elements-builder
//     Just a Custom Elements builder, natively scalable and designed for FRP.
//     Buil date: 2015-03-23
//     Copyright 2015-2015 Thibault Morin
//     Available under MIT license
//
(function (g, factory) {
    'use strict';

    // Export the **ceb-feature-cqrs** function according the detected loader.

    /* istanbul ignore next */
    if(typeof exports === 'object') {
        module.exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        define('ceb-feature-cqrs', [], factory);
    } else {
        g.cebFeatureCqrs = factory();
    }

}(this, function () {
    'use strict';

    // ## Feature function

    // The CQRS' function returns nothing for public API.
    function feature(el) {
        if(!el.__cebCqrsScope) {
            el.__cebCqrsScope = {};
        }
        return el.__cebCqrsScope;
    }

    // ## Default library

    feature.defaultLibrary = 'none';

    feature.libraries = {
        none: {}
    };

    // This function must send the given command.
    // > @param name (string) the name of the command
    // > @param payload (any) the business data linked to the command
    // > @param metadata (object) additional data like the current user, date of processing, etc.
    /* istanbul ignore next */
    feature.libraries.none.sendCommand = function ( /*name, payload, metadata*/ ) {
        throw new Error('not implemented!');
    };

    // This function must publish the given event.
    // > @param name (string) the name of the event
    // > @param payload (any) the business data linked to the event
    // > @param metadata (object) additional data like the current user, date of processing, etc.
    /* istanbul ignore next */
    feature.libraries.none.publishEvent = function ( /*name, payload, metadata*/ ) {
        throw new Error('not implemented!');
    };

    // This function is called when an handler must be created.
    // > @param el (HTMLElement) the current element
    // > @param cmdName (string) the name of the command
    // > @param prepareFn (function) this callback is used to prepare a *value*, based on a command
    // > @param processFn (function) this callback is used to process the command, the *value* from the callback above is given as argument
    /* istanbul ignore next */
    feature.libraries.none.cmdHandlerFactory = function ( /*el, cmdName, prepareFn, processFn*/ ) {
        throw new Error('not implemented!');
    };

    // This function is called when an handler must be created.
    // > @param el (HTMLElement) the current element
    // > @param evtName (string) the name of the event
    // > @param prepareFn (function) this callback is used to prepare a *value*, based on an event
    // > @param processFn (function) this callback is used to process the command, the *value* from the callback above is given as argument
    /* istanbul ignore next */
    feature.libraries.none.evtListenerFactory = function ( /*el, evtName, prepareFn, processFn*/ ) {
        throw new Error('not implemented!');
    };

    // This function must destroy the given handler
    // > @param handler (any) the handler to destroy
    /* istanbul ignore next */
    feature.libraries.none.destroyCmdHandler = function ( /*handler*/ ) {
        throw new Error('not implemented!');
    };

    // This function must destroy the given listener
    // > @param handler (any) the listener to destroy

    /* istanbul ignore next */
    feature.libraries.none.destroyListenerHandler = function ( /*listener*/ ) {
        throw new Error('not implemented!');
    };

    // ## Handler and listener builder

    function fluentSubscriberFactory(name, factory) {
        var build = function (prepareFn, processFn) {
            return function (el) {
                return factory(el, name, prepareFn, processFn);
            };
        };
        var process = function (processFn) {
            return build(null, processFn);
        };
        var prepare = function (prepareFn) {
            return {
                process: function (processFn) {
                    return build(prepareFn, processFn);
                }
            };
        };
        return {
            prepare: prepare,
            process: process
        };
    }
    feature.handle = function (cmdName, options) {
        var library = feature.libraries[(options && options.library) || feature.defaultLibrary];
        return fluentSubscriberFactory(cmdName, library.cmdHandlerFactory);
    };
    feature.listen = function (cmdName, options) {
        var library = feature.libraries[(options && options.library) || feature.defaultLibrary];
        return fluentSubscriberFactory(cmdName, library.evtListenerFactory);
    };

    // ## Setup

    feature.setup = function (struct, builder, options) {
        // Resolve the locked functions.
        var library = feature.libraries[options.library || feature.defaultLibrary];
        var sendCommand = options.sendCommand || library.sendCommand;
        var publishEvent = options.publishEvent || library.publishEvent;
        var destroyCmdHandler = options.destroyCmdHandler || library.destroyCmdHandler;
        var destroyListenerHandler = options.destroyListenerHandler || library.destroyListenerHandler;

        builder.methods({
            sendCommand: function (el, cmdName, payload, metadata) {
                setTimeout(function () {
                    sendCommand(cmdName, payload, metadata);
                }, 0);
            },
            publishEvent: function (el, evtName, payload, metadata) {
                setTimeout(function () {
                    publishEvent(evtName, payload, metadata);
                }, 0);
            }
        });

        builder.wrap('createdCallback', function (next, el) {
            next(arguments);
            feature(el).handlers = (options.handlers || []).map(function (factory) {
                return factory(el);
            });
            feature(el).listeners = (options.listeners || []).map(function (factory) {
                return factory(el);
            });
        });

        builder.wrap('attachedCallback', function (next, el) {
            if(!feature(el).handlers) {
                feature(el).handlers = (options.handlers || []).map(function (factory) {
                    return factory(el);
                });
            }
            if(!feature(el).listeners) {
                feature(el).listeners = (options.listeners || []).map(function (factory) {
                    return factory(el);
                });
            }
            next(arguments);
        });

        builder.wrap('detachedCallback', function (next, el) {
            next(arguments);
            feature(el).handlers.forEach(destroyCmdHandler);
            feature(el).handlers = null;
            feature(el).listeners.forEach(destroyListenerHandler);
            feature(el).listeners = null;
        });
    };

    return feature;
}));