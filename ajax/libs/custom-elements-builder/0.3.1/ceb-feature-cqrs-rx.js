//
//     custom-elements-builder 0.3.1 http://tmorin.github.io/custom-elements-builder
//     Custom Elements Builder (ceb) is ... a builder for Custom Elements.
//     Buil date: 2015-03-03
//     Copyright 2015-2015 Thibault Morin
//     Available under MIT license
//
(function (g, factory) {
    'use strict';

    // Export the **ceb-feature-cqrs** function according the detected loader.

    /* istanbul ignore next */
    if(typeof exports === 'object') {
        module.exports = factory(require('ceb-feature-cqrs'), require('rx'));
    } else if(typeof define === 'function' && define.amd) {
        define('ceb-feature-cqrs-rx', ['ceb-feature-cqrs', 'rx'], factory);
    } else {
        g.cebFeatureCqrs = factory(g.cebFeatureCqrs, g.Rx);
    }

}(this, function (cebFeatureCqrs, Rx) {
    'use strict';

    var rootCmdStream = new Rx.Subject();

    var rootEvtStream = new Rx.Subject();

    var sendCommand = function (name, payload, metadata) {
        rootCmdStream.onNext({
            name: name,
            payload: payload,
            metadata: metadata
        });
    };

    var publishEvent = function (name, payload, metadata) {
        rootEvtStream.onNext({
            name: name,
            payload: payload,
            metadata: metadata
        });
    };

    var cmdHandlerFactory = function (el, cmdName, prepareFn, processFn) {
        var cmdStream = rootCmdStream.filter(function (cmd) {
            return cmd.name === cmdName;
        });
        return cmdStream.subscribe(function (cmd) {
            cmd.apply = function (evtName, payload, metadata) {
                publishEvent(evtName, payload, metadata || cmd.metadata);
            };
            if(prepareFn) {
                prepareFn(el, Rx.Observable.just(cmd)).subscribe(function (value) {
                    processFn(el, cmd, value);
                });
            } else {
                processFn(el, cmd, cmd);
            }
        });
    };

    var evtListenerFactory = function (el, evtName, prepareFn, processFn) {
        var evtStream = rootEvtStream.filter(function (evt) {
            return evt.name === evtName;
        });
        return evtStream.subscribe(function (evt) {
            var stream = prepareFn ? prepareFn(el, Rx.Observable.just(evt)) : Rx.Observable.just(evt);
            stream.subscribe(function (value) {
                processFn(el, evt, value);
            });
        });
    };

    var disposeStream = function (stream) {
        stream.dispose();
    };

    cebFeatureCqrs.libraries.Rx = {
        sendCommand: sendCommand,
        publishEvent: publishEvent,
        cmdHandlerFactory: cmdHandlerFactory,
        evtListenerFactory: evtListenerFactory,
        destroyCmdHandler: disposeStream,
        destroyListenerHandler: disposeStream
    };

    return cebFeatureCqrs;
}));