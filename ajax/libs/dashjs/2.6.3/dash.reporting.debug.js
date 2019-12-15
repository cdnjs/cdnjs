(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.dashjs || (g.dashjs = {})).MetricsReporting = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @module FactoryMaker
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var FactoryMaker = (function () {

    var instance = undefined;
    var extensions = [];
    var singletonContexts = [];
    var singletonFactories = [];
    var classFactories = [];

    function extend(name, childInstance, override, context) {
        var extensionContext = getExtensionContext(context);
        if (!extensionContext[name] && childInstance) {
            extensionContext[name] = {
                instance: childInstance,
                override: override
            };
        }
    }

    /**
     * Use this method from your extended object.  this.factory is injected into your object.
     * this.factory.getSingletonInstance(this.context, 'VideoModel')
     * will return the video model for use in the extended object.
     *
     * @param {Object} context - injected into extended object as this.context
     * @param {string} className - string name found in all dash.js objects
     * with name __dashjs_factory_name Will be at the bottom. Will be the same as the object's name.
     * @returns {*} Context aware instance of specified singleton name.
     * @memberof module:FactoryMaker
     * @instance
     */
    function getSingletonInstance(context, className) {
        for (var i in singletonContexts) {
            var obj = singletonContexts[i];
            if (obj.context === context && obj.name === className) {
                return obj.instance;
            }
        }
        return null;
    }

    /**
     * Use this method to add an singleton instance to the system.  Useful for unit testing to mock objects etc.
     *
     * @param {Object} context
     * @param {string} className
     * @param {Object} instance
     * @memberof module:FactoryMaker
     * @instance
     */
    function setSingletonInstance(context, className, instance) {
        for (var i in singletonContexts) {
            var obj = singletonContexts[i];
            if (obj.context === context && obj.name === className) {
                singletonContexts[i].instance = instance;
                return;
            }
        }
        singletonContexts.push({
            name: className,
            context: context,
            instance: instance
        });
    }

    /*------------------------------------------------------------------------------------------*/

    // Factories storage Management

    /*------------------------------------------------------------------------------------------*/

    function registerFactory(name, factory, factoriesArray) {
        for (var i in factoriesArray) {
            var obj = factoriesArray[i];
            if (obj.name === name) {
                factoriesArray[i].factory = factory;
                return;
            }
        }
        factoriesArray.push({
            name: name,
            factory: factory
        });
    }

    function getFactoryByName(name, factoriesArray) {
        for (var i in factoriesArray) {
            var obj = factoriesArray[i];
            if (obj.name === name) {
                return factoriesArray[i].factory;
            }
        }
        return null;
    }

    function updateFactory(name, factory, factoriesArray) {
        for (var i in factoriesArray) {
            var obj = factoriesArray[i];
            if (obj.name === name) {
                factoriesArray[i].factory = factory;
                return;
            }
        }
    }

    /*------------------------------------------------------------------------------------------*/

    // Class Factories Management

    /*------------------------------------------------------------------------------------------*/

    function updateClassFactory(name, factory) {
        updateFactory(name, factory, classFactories);
    }

    function getClassFactoryByName(name) {
        return getFactoryByName(name, classFactories);
    }

    function getClassFactory(classConstructor) {
        var factory = getFactoryByName(classConstructor.__dashjs_factory_name, classFactories);

        if (!factory) {
            factory = function (context) {
                if (context === undefined) {
                    context = {};
                }
                return {
                    create: function create() {
                        return merge(classConstructor.__dashjs_factory_name, classConstructor.apply({
                            context: context
                        }, arguments), context, arguments);
                    }
                };
            };

            registerFactory(classConstructor.__dashjs_factory_name, factory, classFactories); // store factory
        }
        return factory;
    }

    /*------------------------------------------------------------------------------------------*/

    // Singleton Factory MAangement

    /*------------------------------------------------------------------------------------------*/

    function updateSingletonFactory(name, factory) {
        updateFactory(name, factory, singletonFactories);
    }

    function getSingletonFactoryByName(name) {
        return getFactoryByName(name, singletonFactories);
    }

    function getSingletonFactory(classConstructor) {
        var factory = getFactoryByName(classConstructor.__dashjs_factory_name, singletonFactories);
        if (!factory) {
            factory = function (context) {
                var instance = undefined;
                if (context === undefined) {
                    context = {};
                }
                return {
                    getInstance: function getInstance() {
                        // If we don't have an instance yet check for one on the context
                        if (!instance) {
                            instance = getSingletonInstance(context, classConstructor.__dashjs_factory_name);
                        }
                        // If there's no instance on the context then create one
                        if (!instance) {
                            instance = merge(classConstructor.__dashjs_factory_name, classConstructor.apply({
                                context: context
                            }, arguments), context, arguments);
                            singletonContexts.push({
                                name: classConstructor.__dashjs_factory_name,
                                context: context,
                                instance: instance
                            });
                        }
                        return instance;
                    }
                };
            };
            registerFactory(classConstructor.__dashjs_factory_name, factory, singletonFactories); // store factory
        }

        return factory;
    }

    function merge(name, classConstructor, context, args) {
        // Add getClassName function to class instance prototype (used by Debug)
        classConstructor.getClassName = function () {
            return name;
        };

        var extensionContext = getExtensionContext(context);
        var extensionObject = extensionContext[name];
        if (extensionObject) {
            var extension = extensionObject.instance;
            if (extensionObject.override) {
                //Override public methods in parent but keep parent.
                extension = extension.apply({
                    context: context,
                    factory: instance,
                    parent: classConstructor
                }, args);
                for (var prop in extension) {
                    if (classConstructor.hasOwnProperty(prop)) {
                        classConstructor[prop] = extension[prop];
                    }
                }
            } else {
                //replace parent object completely with new object. Same as dijon.
                return extension.apply({
                    context: context,
                    factory: instance
                }, args);
            }
        }
        return classConstructor;
    }

    function getExtensionContext(context) {
        var extensionContext = undefined;
        extensions.forEach(function (obj) {
            if (obj === context) {
                extensionContext = obj;
            }
        });
        if (!extensionContext) {
            extensions.push(context);
            extensionContext = context;
        }
        return extensionContext;
    }

    instance = {
        extend: extend,
        getSingletonInstance: getSingletonInstance,
        setSingletonInstance: setSingletonInstance,
        getSingletonFactory: getSingletonFactory,
        getSingletonFactoryByName: getSingletonFactoryByName,
        updateSingletonFactory: updateSingletonFactory,
        getClassFactory: getClassFactory,
        getClassFactoryByName: getClassFactoryByName,
        updateClassFactory: updateClassFactory
    };

    return instance;
})();

exports["default"] = FactoryMaker;
module.exports = exports["default"];

},{}],2:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventsBase = (function () {
    function EventsBase() {
        _classCallCheck(this, EventsBase);
    }

    _createClass(EventsBase, [{
        key: 'extend',
        value: function extend(events, config) {
            if (!events) return;

            var override = config ? config.override : false;
            var publicOnly = config ? config.publicOnly : false;

            for (var evt in events) {
                if (!events.hasOwnProperty(evt) || this[evt] && !override) continue;
                if (publicOnly && events[evt].indexOf('public_') === -1) continue;
                this[evt] = events[evt];
            }
        }
    }]);

    return EventsBase;
})();

exports['default'] = EventsBase;
module.exports = exports['default'];

},{}],3:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsDVBErrorsTranslator = _dereq_(17);

var _utilsDVBErrorsTranslator2 = _interopRequireDefault(_utilsDVBErrorsTranslator);

var _MetricsReportingEvents = _dereq_(4);

var _MetricsReportingEvents2 = _interopRequireDefault(_MetricsReportingEvents);

var _controllersMetricsCollectionController = _dereq_(5);

var _controllersMetricsCollectionController2 = _interopRequireDefault(_controllersMetricsCollectionController);

var _metricsMetricsHandlerFactory = _dereq_(10);

var _metricsMetricsHandlerFactory2 = _interopRequireDefault(_metricsMetricsHandlerFactory);

var _reportingReportingFactory = _dereq_(15);

var _reportingReportingFactory2 = _interopRequireDefault(_reportingReportingFactory);

function MetricsReporting() {

    var context = this.context;
    var instance = undefined;

    var dvbErrorsTranslator = undefined;

    /**
     * Create a MetricsCollectionController, and a DVBErrorsTranslator
     * @param {Object} config - dependancies from owner
     * @return {MetricsCollectionController} Metrics Collection Controller
     */
    function createMetricsReporting(config) {
        dvbErrorsTranslator = (0, _utilsDVBErrorsTranslator2['default'])(context).getInstance({
            eventBus: config.eventBus,
            metricsModel: config.metricsModel,
            metricsConstants: config.metricsConstants,
            events: config.events
        });

        return (0, _controllersMetricsCollectionController2['default'])(context).create(config);
    }

    /**
     * Get the ReportingFactory to allow new reporters to be registered
     * @return {ReportingFactory} Reporting Factory
     */
    function getReportingFactory() {
        return (0, _reportingReportingFactory2['default'])(context).getInstance();
    }

    /**
     * Get the MetricsHandlerFactory to allow new handlers to be registered
     * @return {MetricsHandlerFactory} Metrics Handler Factory
     */
    function getMetricsHandlerFactory() {
        return (0, _metricsMetricsHandlerFactory2['default'])(context).getInstance();
    }

    instance = {
        createMetricsReporting: createMetricsReporting,
        getReportingFactory: getReportingFactory,
        getMetricsHandlerFactory: getMetricsHandlerFactory
    };

    return instance;
}

MetricsReporting.__dashjs_factory_name = 'MetricsReporting';
var factory = dashjs.FactoryMaker.getClassFactory(MetricsReporting); /* jshint ignore:line */
factory.events = _MetricsReportingEvents2['default'];
dashjs.FactoryMaker.updateClassFactory(MetricsReporting.__dashjs_factory_name, factory); /* jshint ignore:line */
exports['default'] = factory;
module.exports = exports['default'];

},{"10":10,"15":15,"17":17,"4":4,"5":5}],4:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _coreEventsEventsBase = _dereq_(2);

var _coreEventsEventsBase2 = _interopRequireDefault(_coreEventsEventsBase);

var MetricsReportingEvents = (function (_EventsBase) {
    _inherits(MetricsReportingEvents, _EventsBase);

    function MetricsReportingEvents() {
        _classCallCheck(this, MetricsReportingEvents);

        _get(Object.getPrototypeOf(MetricsReportingEvents.prototype), 'constructor', this).call(this);

        this.METRICS_INITIALISATION_COMPLETE = 'internal_metricsReportingInitialized';
        this.BECAME_REPORTING_PLAYER = 'internal_becameReportingPlayer';
    }

    return MetricsReportingEvents;
})(_coreEventsEventsBase2['default']);

var metricsReportingEvents = new MetricsReportingEvents();
exports['default'] = metricsReportingEvents;
module.exports = exports['default'];

},{"2":2}],5:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MetricsController = _dereq_(6);

var _MetricsController2 = _interopRequireDefault(_MetricsController);

var _utilsManifestParsing = _dereq_(19);

var _utilsManifestParsing2 = _interopRequireDefault(_utilsManifestParsing);

var _MetricsReportingEvents = _dereq_(4);

var _MetricsReportingEvents2 = _interopRequireDefault(_MetricsReportingEvents);

function MetricsCollectionController(config) {

    var metricsControllers = {};

    var context = this.context;
    var eventBus = config.eventBus;
    var events = config.events;

    function update(e) {
        if (e.error) {
            return;
        }

        // start by assuming all existing controllers need removing
        var controllersToRemove = Object.keys(metricsControllers);

        var metrics = (0, _utilsManifestParsing2['default'])(context).getInstance({
            dashManifestModel: config.dashManifestModel,
            constants: config.constants
        }).getMetrics(e.manifest);

        metrics.forEach(function (m) {
            var key = JSON.stringify(m);

            if (!metricsControllers.hasOwnProperty(key)) {
                try {
                    var controller = (0, _MetricsController2['default'])(context).create(config);
                    controller.initialize(m);
                    metricsControllers[key] = controller;
                } catch (e) {
                    // fail quietly
                }
            } else {
                    // we still need this controller - delete from removal list
                    controllersToRemove.splice(key, 1);
                }
        });

        // now remove the unwanted controllers
        controllersToRemove.forEach(function (c) {
            metricsControllers[c].reset();
            delete metricsControllers[c];
        });

        eventBus.trigger(_MetricsReportingEvents2['default'].METRICS_INITIALISATION_COMPLETE);
    }

    function resetMetricsControllers() {
        Object.keys(metricsControllers).forEach(function (key) {
            metricsControllers[key].reset();
        });

        metricsControllers = {};
    }

    function setup() {
        eventBus.on(events.MANIFEST_UPDATED, update);
        eventBus.on(events.STREAM_TEARDOWN_COMPLETE, resetMetricsControllers);
    }

    function reset() {
        eventBus.off(events.MANIFEST_UPDATED, update);
        eventBus.off(events.STREAM_TEARDOWN_COMPLETE, resetMetricsControllers);
    }

    setup();

    return {
        reset: reset
    };
}

MetricsCollectionController.__dashjs_factory_name = 'MetricsCollectionController';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MetricsCollectionController);
/* jshint ignore:line */
module.exports = exports['default'];

},{"19":19,"4":4,"6":6}],6:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _RangeController = _dereq_(8);

var _RangeController2 = _interopRequireDefault(_RangeController);

var _ReportingController = _dereq_(9);

var _ReportingController2 = _interopRequireDefault(_ReportingController);

var _MetricsHandlersController = _dereq_(7);

var _MetricsHandlersController2 = _interopRequireDefault(_MetricsHandlersController);

function MetricsController(config) {

    var metricsHandlersController = undefined,
        reportingController = undefined,
        rangeController = undefined,
        instance = undefined;

    var context = this.context;

    function initialize(metricsEntry) {
        try {
            rangeController = (0, _RangeController2['default'])(context).create({
                mediaElement: config.mediaElement
            });

            rangeController.initialize(metricsEntry.Range);

            reportingController = (0, _ReportingController2['default'])(context).create({
                log: config.log,
                metricsConstants: config.metricsConstants
            });

            reportingController.initialize(metricsEntry.Reporting, rangeController);

            metricsHandlersController = (0, _MetricsHandlersController2['default'])(context).create({
                log: config.log,
                eventBus: config.eventBus,
                metricsConstants: config.metricsConstants,
                events: config.events
            });

            metricsHandlersController.initialize(metricsEntry.metrics, reportingController);
        } catch (e) {
            reset();
            throw e;
        }
    }

    function reset() {
        if (metricsHandlersController) {
            metricsHandlersController.reset();
        }

        if (reportingController) {
            reportingController.reset();
        }

        if (rangeController) {
            rangeController.reset();
        }
    }

    instance = {
        initialize: initialize,
        reset: reset
    };

    return instance;
}

MetricsController.__dashjs_factory_name = 'MetricsController';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MetricsController);
/* jshint ignore:line */
module.exports = exports['default'];

},{"7":7,"8":8,"9":9}],7:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metricsMetricsHandlerFactory = _dereq_(10);

var _metricsMetricsHandlerFactory2 = _interopRequireDefault(_metricsMetricsHandlerFactory);

function MetricsHandlersController(config) {
    var handlers = [];

    var instance = undefined;
    var context = this.context;
    var eventBus = config.eventBus;
    var Events = config.events;

    var metricsHandlerFactory = (0, _metricsMetricsHandlerFactory2['default'])(context).getInstance({
        log: config.log,
        eventBus: config.eventBus,
        metricsConstants: config.metricsConstants
    });

    function handle(e) {
        handlers.forEach(function (handler) {
            handler.handleNewMetric(e.metric, e.value, e.mediaType);
        });
    }

    function initialize(metrics, reportingController) {
        metrics.split(',').forEach(function (m, midx, ms) {
            var handler = undefined;

            // there is a bug in ISO23009-1 where the metrics attribute
            // is a comma-separated list but HttpList key can contain a
            // comma enclosed by ().
            if (m.indexOf('(') !== -1 && m.indexOf(')') === -1) {
                var nextm = ms[midx + 1];

                if (nextm && nextm.indexOf('(') === -1 && nextm.indexOf(')') !== -1) {
                    m += ',' + nextm;

                    // delete the next metric so forEach does not visit.
                    delete ms[midx + 1];
                }
            }

            handler = metricsHandlerFactory.create(m, reportingController);

            if (handler) {
                handlers.push(handler);
            }
        });

        eventBus.on(Events.METRIC_ADDED, handle, instance);

        eventBus.on(Events.METRIC_UPDATED, handle, instance);
    }

    function reset() {
        eventBus.off(Events.METRIC_ADDED, handle, instance);

        eventBus.off(Events.METRIC_UPDATED, handle, instance);

        handlers.forEach(function (handler) {
            return handler.reset();
        });

        handlers = [];
    }

    instance = {
        initialize: initialize,
        reset: reset
    };

    return instance;
}

MetricsHandlersController.__dashjs_factory_name = 'MetricsHandlersController';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MetricsHandlersController);
/* jshint ignore:line */
module.exports = exports['default'];

},{"10":10}],8:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsCustomTimeRanges = _dereq_(26);

var _utilsCustomTimeRanges2 = _interopRequireDefault(_utilsCustomTimeRanges);

function RangeController(config) {

    var useWallClockTime = false;
    var context = this.context;
    var instance = undefined,
        ranges = undefined;

    var mediaElement = config.mediaElement;

    function initialize(rs) {
        if (rs && rs.length) {
            rs.forEach(function (r) {
                var start = r.starttime;
                var end = start + r.duration;

                ranges.add(start, end);
            });

            useWallClockTime = !!rs[0]._useWallClockTime;
        }
    }

    function reset() {
        ranges.clear();
    }

    function setup() {
        ranges = (0, _utilsCustomTimeRanges2['default'])(context).create();
    }

    function isEnabled() {
        var numRanges = ranges.length;
        var time = undefined;

        if (!numRanges) {
            return true;
        }

        // When not present, DASH Metrics reporting is requested
        // for the whole duration of the content.
        time = useWallClockTime ? new Date().getTime() / 1000 : mediaElement.currentTime;

        for (var i = 0; i < numRanges; i += 1) {
            var start = ranges.start(i);
            var end = ranges.end(i);

            if (start <= time && time < end) {
                return true;
            }
        }

        return false;
    }

    instance = {
        initialize: initialize,
        reset: reset,
        isEnabled: isEnabled
    };

    setup();

    return instance;
}

RangeController.__dashjs_factory_name = 'RangeController';
exports['default'] = dashjs.FactoryMaker.getClassFactory(RangeController);
/* jshint ignore:line */
module.exports = exports['default'];

},{"26":26}],9:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reportingReportingFactory = _dereq_(15);

var _reportingReportingFactory2 = _interopRequireDefault(_reportingReportingFactory);

function ReportingController(config) {

    var reporters = [];
    var instance = undefined;

    var reportingFactory = (0, _reportingReportingFactory2['default'])(this.context).getInstance(config);

    function initialize(reporting, rangeController) {
        // "if multiple Reporting elements are present, it is expected that
        // the client processes one of the recognized reporting schemes."
        // to ignore this, and support multiple Reporting per Metric,
        // simply change the 'some' below to 'forEach'
        reporting.some(function (r) {
            var reporter = reportingFactory.create(r, rangeController);

            if (reporter) {
                reporters.push(reporter);
                return true;
            }
        });
    }

    function reset() {
        reporters.forEach(function (r) {
            return r.reset();
        });
        reporters = [];
    }

    function report(type, vos) {
        reporters.forEach(function (r) {
            return r.report(type, vos);
        });
    }

    instance = {
        initialize: initialize,
        reset: reset,
        report: report
    };

    return instance;
}

ReportingController.__dashjs_factory_name = 'ReportingController';
exports['default'] = dashjs.FactoryMaker.getClassFactory(ReportingController);
/* jshint ignore:line */
module.exports = exports['default'];

},{"15":15}],10:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _handlersBufferLevelHandler = _dereq_(11);

var _handlersBufferLevelHandler2 = _interopRequireDefault(_handlersBufferLevelHandler);

var _handlersDVBErrorsHandler = _dereq_(12);

var _handlersDVBErrorsHandler2 = _interopRequireDefault(_handlersDVBErrorsHandler);

var _handlersHttpListHandler = _dereq_(14);

var _handlersHttpListHandler2 = _interopRequireDefault(_handlersHttpListHandler);

var _handlersGenericMetricHandler = _dereq_(13);

var _handlersGenericMetricHandler2 = _interopRequireDefault(_handlersGenericMetricHandler);

function MetricsHandlerFactory(config) {

    var instance = undefined;
    var log = config.log;

    // group 1: key, [group 3: n [, group 5: type]]
    var keyRegex = /([a-zA-Z]*)(\(([0-9]*)(\,\s*([a-zA-Z]*))?\))?/;

    var context = this.context;
    var knownFactoryProducts = {
        BufferLevel: _handlersBufferLevelHandler2['default'],
        DVBErrors: _handlersDVBErrorsHandler2['default'],
        HttpList: _handlersHttpListHandler2['default'],
        PlayList: _handlersGenericMetricHandler2['default'],
        RepSwitchList: _handlersGenericMetricHandler2['default'],
        TcpList: _handlersGenericMetricHandler2['default']
    };

    function create(listType, reportingController) {
        var matches = listType.match(keyRegex);
        var handler;

        if (!matches) {
            return;
        }

        try {
            handler = knownFactoryProducts[matches[1]](context).create({
                eventBus: config.eventBus,
                metricsConstants: config.metricsConstants
            });

            handler.initialize(matches[1], reportingController, matches[3], matches[5]);
        } catch (e) {
            handler = null;

            log('MetricsHandlerFactory: Could not create handler for type ' + matches[1] + ' with args ' + matches[3] + ', ' + matches[5] + ' (' + e.message + ')');
        }

        return handler;
    }

    function register(key, handler) {
        knownFactoryProducts[key] = handler;
    }

    function unregister(key) {
        delete knownFactoryProducts[key];
    }

    instance = {
        create: create,
        register: register,
        unregister: unregister
    };

    return instance;
}

MetricsHandlerFactory.__dashjs_factory_name = 'MetricsHandlerFactory';
exports['default'] = dashjs.FactoryMaker.getSingletonFactory(MetricsHandlerFactory);
/* jshint ignore:line */
module.exports = exports['default'];

},{"11":11,"12":12,"13":13,"14":14}],11:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsHandlerHelpers = _dereq_(18);

var _utilsHandlerHelpers2 = _interopRequireDefault(_utilsHandlerHelpers);

function BufferLevelHandler(config) {

    var instance = undefined,
        reportingController = undefined,
        n = undefined,
        name = undefined,
        interval = undefined,
        lastReportedTime = undefined;

    var context = this.context;
    var handlerHelpers = (0, _utilsHandlerHelpers2['default'])(context).getInstance();

    var storedVOs = [];

    var metricsConstants = config.metricsConstants;

    function getLowestBufferLevelVO() {
        try {
            return Object.keys(storedVOs).map(function (key) {
                return storedVOs[key];
            }).reduce(function (a, b) {
                return a.level < b.level ? a : b;
            });
        } catch (e) {
            return;
        }
    }

    function intervalCallback() {
        var vo = getLowestBufferLevelVO();

        if (vo) {
            if (lastReportedTime !== vo.t) {
                lastReportedTime = vo.t;
                reportingController.report(name, vo);
            }
        }
    }

    function initialize(basename, rc, n_ms) {
        if (rc) {
            // this will throw if n is invalid, to be
            // caught by the initialize caller.
            n = handlerHelpers.validateN(n_ms);
            reportingController = rc;
            name = handlerHelpers.reconstructFullMetricName(basename, n_ms);
            interval = setInterval(intervalCallback, n);
        }
    }

    function reset() {
        clearInterval(interval);
        interval = null;
        n = 0;
        reportingController = null;
        lastReportedTime = null;
    }

    function handleNewMetric(metric, vo, type) {
        if (metric === metricsConstants.BUFFER_LEVEL) {
            storedVOs[type] = vo;
        }
    }

    instance = {
        initialize: initialize,
        reset: reset,
        handleNewMetric: handleNewMetric
    };

    return instance;
}

BufferLevelHandler.__dashjs_factory_name = 'BufferLevelHandler';
exports['default'] = dashjs.FactoryMaker.getClassFactory(BufferLevelHandler);
/* jshint ignore:line */
module.exports = exports['default'];

},{"18":18}],12:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MetricsReportingEvents = _dereq_(4);

var _MetricsReportingEvents2 = _interopRequireDefault(_MetricsReportingEvents);

function DVBErrorsHandler(config) {

    var instance = undefined,
        reportingController = undefined;

    var eventBus = config.eventBus;
    var metricsConstants = config.metricsConstants;

    function onInitialisationComplete() {
        // we only want to report this once per call to initialize
        eventBus.off(_MetricsReportingEvents2['default'].METRICS_INITIALISATION_COMPLETE, onInitialisationComplete, this);

        // Note: A Player becoming a reporting Player is itself
        // something which is recorded by the DVBErrors metric.
        eventBus.trigger(_MetricsReportingEvents2['default'].BECAME_REPORTING_PLAYER);
    }

    function initialize(unused, rc) {
        if (rc) {
            reportingController = rc;

            eventBus.on(_MetricsReportingEvents2['default'].METRICS_INITIALISATION_COMPLETE, onInitialisationComplete, this);
        }
    }

    function reset() {
        reportingController = null;
    }

    function handleNewMetric(metric, vo) {
        // simply pass metric straight through
        if (metric === metricsConstants.DVB_ERRORS) {
            if (reportingController) {
                reportingController.report(metric, vo);
            }
        }
    }

    instance = {
        initialize: initialize,
        reset: reset,
        handleNewMetric: handleNewMetric
    };

    return instance;
}

exports['default'] = dashjs.FactoryMaker.getClassFactory(DVBErrorsHandler);
/* jshint ignore:line */
module.exports = exports['default'];

},{"4":4}],13:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function GenericMetricHandler() {

    var instance = undefined,
        metricName = undefined,
        reportingController = undefined;

    function initialize(name, rc) {
        metricName = name;
        reportingController = rc;
    }

    function reset() {
        reportingController = null;
        metricName = undefined;
    }

    function handleNewMetric(metric, vo) {
        // simply pass metric straight through
        if (metric === metricName) {
            if (reportingController) {
                reportingController.report(metricName, vo);
            }
        }
    }

    instance = {
        initialize: initialize,
        reset: reset,
        handleNewMetric: handleNewMetric
    };

    return instance;
}

GenericMetricHandler.__dashjs_factory_name = 'GenericMetricHandler';
exports['default'] = dashjs.FactoryMaker.getClassFactory(GenericMetricHandler);
/* jshint ignore:line */
module.exports = exports['default'];

},{}],14:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsHandlerHelpers = _dereq_(18);

var _utilsHandlerHelpers2 = _interopRequireDefault(_utilsHandlerHelpers);

function HttpListHandler(config) {

    var instance = undefined,
        reportingController = undefined,
        n = undefined,
        type = undefined,
        name = undefined,
        interval = undefined;

    var storedVos = [];

    var handlerHelpers = (0, _utilsHandlerHelpers2['default'])(this.context).getInstance();

    var metricsConstants = config.metricsConstants;

    function intervalCallback() {
        var vos = storedVos;

        if (vos.length) {
            if (reportingController) {
                reportingController.report(name, vos);
            }
        }

        storedVos = [];
    }

    function initialize(basename, rc, n_ms, requestType) {
        if (rc) {

            // this will throw if n is invalid, to be
            // caught by the initialize caller.
            n = handlerHelpers.validateN(n_ms);

            reportingController = rc;

            if (requestType && requestType.length) {
                type = requestType;
            }

            name = handlerHelpers.reconstructFullMetricName(basename, n_ms, requestType);

            interval = setInterval(intervalCallback, n);
        }
    }

    function reset() {
        clearInterval(interval);
        interval = null;
        n = null;
        type = null;
        storedVos = [];
        reportingController = null;
    }

    function handleNewMetric(metric, vo) {
        if (metric === metricsConstants.HTTP_REQUEST) {
            if (!type || type === vo.type) {
                storedVos.push(vo);
            }
        }
    }

    instance = {
        initialize: initialize,
        reset: reset,
        handleNewMetric: handleNewMetric
    };

    return instance;
}

HttpListHandler.__dashjs_factory_name = 'HttpListHandler';
exports['default'] = dashjs.FactoryMaker.getClassFactory(HttpListHandler);
/* jshint ignore:line */
module.exports = exports['default'];

},{"18":18}],15:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reportersDVBReporting = _dereq_(16);

var _reportersDVBReporting2 = _interopRequireDefault(_reportersDVBReporting);

function ReportingFactory(config) {

    var knownReportingSchemeIdUris = {
        'urn:dvb:dash:reporting:2014': _reportersDVBReporting2['default']
    };

    var context = this.context;
    var log = config.log;
    var metricsConstants = config.metricsConstants;

    var instance = undefined;

    function create(entry, rangeController) {
        var reporting = undefined;

        try {
            reporting = knownReportingSchemeIdUris[entry.schemeIdUri](context).create({
                metricsConstants: metricsConstants
            });

            reporting.initialize(entry, rangeController);
        } catch (e) {
            reporting = null;

            log('ReportingFactory: could not create Reporting with schemeIdUri ' + entry.schemeIdUri + ' (' + e.message + ')');
        }

        return reporting;
    }

    function register(schemeIdUri, moduleName) {
        knownReportingSchemeIdUris[schemeIdUri] = moduleName;
    }

    function unregister(schemeIdUri) {
        delete knownReportingSchemeIdUris[schemeIdUri];
    }

    instance = {
        create: create,
        register: register,
        unregister: unregister
    };

    return instance;
}

ReportingFactory.__dashjs_factory_name = 'ReportingFactory';
exports['default'] = dashjs.FactoryMaker.getSingletonFactory(ReportingFactory);
/* jshint ignore:line */
module.exports = exports['default'];

},{"16":16}],16:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsMetricSerialiser = _dereq_(20);

var _utilsMetricSerialiser2 = _interopRequireDefault(_utilsMetricSerialiser);

var _utilsRNG = _dereq_(21);

var _utilsRNG2 = _interopRequireDefault(_utilsRNG);

function DVBReporting(config) {
    var instance = undefined;

    var context = this.context;
    var metricSerialiser = (0, _utilsMetricSerialiser2['default'])(context).getInstance();
    var randomNumberGenerator = (0, _utilsRNG2['default'])(context).getInstance();

    var USE_DRAFT_DVB_SPEC = true;
    var isReportingPlayer = false;
    var reportingPlayerStatusDecided = false;
    var reportingUrl = null;
    var rangeController = null;
    var allowPendingRequestsToCompleteOnReset = true;
    var pendingRequests = [];

    var metricsConstants = config.metricsConstants;

    function doGetRequest(url, successCB, failureCB) {
        var req = new XMLHttpRequest();
        var oncomplete = function oncomplete() {
            var reqIndex = pendingRequests.indexOf(req);

            if (reqIndex === -1) {
                return;
            } else {
                pendingRequests.splice(reqIndex, 1);
            }

            if (req.status >= 200 && req.status < 300) {
                if (successCB) {
                    successCB();
                }
            } else {
                if (failureCB) {
                    failureCB();
                }
            }
        };

        pendingRequests.push(req);

        try {
            req.open('GET', url);
            req.onloadend = oncomplete;
            req.onerror = oncomplete;
            req.send();
        } catch (e) {
            req.onerror();
        }
    }

    function report(type, vos) {
        if (!Array.isArray(vos)) {
            vos = [vos];
        }

        // If the Player is not a reporting Player, then the Player shall
        // not report any errors.
        // ... In addition to any time restrictions specified by a Range
        // element within the Metrics element.
        if (isReportingPlayer && rangeController.isEnabled()) {

            // This reporting mechanism operates by creating one HTTP GET
            // request for every entry in the top level list of the metric.
            vos.forEach(function (vo) {
                var url = metricSerialiser.serialise(vo);

                // this has been proposed for errata
                if (USE_DRAFT_DVB_SPEC && type !== metricsConstants.DVB_ERRORS) {
                    url = 'metricname=' + type + '&' + url;
                }

                // Take the value of the @reportingUrl attribute, append a
                // question mark ('?') character and then append the string
                // created in the previous step.
                url = reportingUrl + '?' + url;

                // Make an HTTP GET request to the URL contained within the
                // string created in the previous step.
                doGetRequest(url, null, function () {
                    // If the Player is unable to make the report, for
                    // example because the @reportingUrl is invalid, the
                    // host cannot be reached, or an HTTP status code other
                    // than one in the 200 series is received, the Player
                    // shall cease being a reporting Player for the
                    // duration of the MPD.
                    isReportingPlayer = false;
                });
            });
        }
    }

    function initialize(entry, rc) {
        var probability = undefined;

        rangeController = rc;

        reportingUrl = entry['dvb:reportingUrl'];

        // If a required attribute is missing, the Reporting descriptor may
        // be ignored by the Player
        if (!reportingUrl) {
            throw new Error('required parameter missing (dvb:reportingUrl)');
        }

        // A Player's status, as a reporting Player or not, shall remain
        // static for the duration of the MPD, regardless of MPD updates.
        // (i.e. only calling reset (or failure) changes this state)
        if (!reportingPlayerStatusDecided) {
            // NOTE: DVB spec has a typo where it incorrectly references the
            // priority attribute, which should be probability
            probability = entry['dvb:probability'] || entry['dvb:priority'] || 0;
            // If the @priority attribute is set to 1000, it shall be a reporting Player.
            // If the @priority attribute is missing, the Player shall not be a reporting Player.
            // For any other value of the @probability attribute, it shall decide at random whether to be a
            // reporting Player, such that the probability of being one is @probability/1000.
            if (probability && (probability === 1000 || probability / 1000 >= randomNumberGenerator.random())) {
                isReportingPlayer = true;
            }

            reportingPlayerStatusDecided = true;
        }
    }

    function reset() {
        if (!allowPendingRequestsToCompleteOnReset) {
            pendingRequests.forEach(function (req) {
                return req.abort();
            });
            pendingRequests = [];
        }

        reportingPlayerStatusDecided = false;
        isReportingPlayer = false;
        reportingUrl = null;
        rangeController = null;
    }

    instance = {
        report: report,
        initialize: initialize,
        reset: reset
    };

    return instance;
}

DVBReporting.__dashjs_factory_name = 'DVBReporting';
exports['default'] = dashjs.FactoryMaker.getClassFactory(DVBReporting);
/* jshint ignore:line */
module.exports = exports['default'];

},{"20":20,"21":21}],17:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _voDVBErrors = _dereq_(22);

var _voDVBErrors2 = _interopRequireDefault(_voDVBErrors);

var _MetricsReportingEvents = _dereq_(4);

var _MetricsReportingEvents2 = _interopRequireDefault(_MetricsReportingEvents);

function DVBErrorsTranslator(config) {

    var instance = undefined;
    var eventBus = config.eventBus;
    var metricModel = config.metricsModel;
    var mpd = undefined;

    var metricsConstants = config.metricsConstants;
    //MediaPlayerEvents have been added to Events in MediaPlayer class
    var Events = config.events;

    function report(vo) {
        var o = new _voDVBErrors2['default']();

        if (!mpd) {
            return;
        }

        for (var key in vo) {
            if (vo.hasOwnProperty(key)) {
                o[key] = vo[key];
            }
        }

        if (!o.mpdurl) {
            o.mpdurl = mpd.originalUrl || mpd.url;
        }

        if (!o.terror) {
            o.terror = new Date();
        }

        metricModel.addDVBErrors(o);
    }

    function onManifestUpdate(e) {
        if (e.error) {
            return;
        }

        mpd = e.manifest;
    }

    function onServiceLocationChanged(e) {
        report({
            errorcode: _voDVBErrors2['default'].BASE_URL_CHANGED,
            servicelocation: e.entry
        });
    }

    function onBecameReporter() {
        report({
            errorcode: _voDVBErrors2['default'].BECAME_REPORTER
        });
    }

    function handleHttpMetric(vo) {
        if (vo.responsecode === 0 || // connection failure - unknown
        vo.responsecode >= 400 || // HTTP error status code
        vo.responsecode < 100 || // unknown status codes
        vo.responsecode >= 600) {
            // unknown status codes
            report({
                errorcode: vo.responsecode || _voDVBErrors2['default'].CONNECTION_ERROR,
                url: vo.url,
                terror: vo.tresponse,
                servicelocation: vo._serviceLocation
            });
        }
    }

    function onMetricEvent(e) {
        switch (e.metric) {
            case metricsConstants.HTTP_REQUEST:
                handleHttpMetric(e.value);
                break;
            default:
                break;
        }
    }

    function onPlaybackError(e) {
        var reason = e.error ? e.error.code : 0;
        var errorcode = undefined;

        switch (reason) {
            case MediaError.MEDIA_ERR_NETWORK:
                errorcode = _voDVBErrors2['default'].CONNECTION_ERROR;
                break;
            case MediaError.MEDIA_ERR_DECODE:
                errorcode = _voDVBErrors2['default'].CORRUPT_MEDIA_OTHER;
                break;
            default:
                return;
        }

        report({
            errorcode: errorcode
        });
    }

    function initialise() {
        eventBus.on(Events.MANIFEST_UPDATED, onManifestUpdate, instance);
        eventBus.on(Events.SERVICE_LOCATION_BLACKLIST_CHANGED, onServiceLocationChanged, instance);
        eventBus.on(Events.METRIC_ADDED, onMetricEvent, instance);
        eventBus.on(Events.METRIC_UPDATED, onMetricEvent, instance);
        eventBus.on(Events.PLAYBACK_ERROR, onPlaybackError, instance);
        eventBus.on(_MetricsReportingEvents2['default'].BECAME_REPORTING_PLAYER, onBecameReporter, instance);
    }

    function reset() {
        eventBus.off(Events.MANIFEST_UPDATED, onManifestUpdate, instance);
        eventBus.off(Events.SERVICE_LOCATION_BLACKLIST_CHANGED, onServiceLocationChanged, instance);
        eventBus.off(Events.METRIC_ADDED, onMetricEvent, instance);
        eventBus.off(Events.METRIC_UPDATED, onMetricEvent, instance);
        eventBus.off(Events.PLAYBACK_ERROR, onPlaybackError, instance);
        eventBus.off(_MetricsReportingEvents2['default'].BECAME_REPORTING_PLAYER, onBecameReporter, instance);
    }

    instance = {
        initialise: initialise,
        reset: reset
    };

    initialise();

    return instance;
}

DVBErrorsTranslator.__dashjs_factory_name = 'DVBErrorsTranslator';
exports['default'] = dashjs.FactoryMaker.getSingletonFactory(DVBErrorsTranslator);
/* jshint ignore:line */
module.exports = exports['default'];

},{"22":22,"4":4}],18:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function HandlerHelpers() {
    return {
        reconstructFullMetricName: function reconstructFullMetricName(key, n, type) {
            var mn = key;

            if (n) {
                mn += '(' + n;

                if (type && type.length) {
                    mn += ',' + type;
                }

                mn += ')';
            }

            return mn;
        },

        validateN: function validateN(n_ms) {
            if (!n_ms) {
                throw new Error('missing n');
            }

            if (isNaN(n_ms)) {
                throw new Error('n is NaN');
            }

            // n is a positive integer is defined to refer to the metric
            // in which the buffer level is recorded every n ms.
            if (n_ms < 0) {
                throw new Error('n must be positive');
            }

            return n_ms;
        }
    };
}

HandlerHelpers.__dashjs_factory_name = 'HandlerHelpers';
exports['default'] = dashjs.FactoryMaker.getSingletonFactory(HandlerHelpers);
/* jshint ignore:line */
module.exports = exports['default'];

},{}],19:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _voMetrics = _dereq_(23);

var _voMetrics2 = _interopRequireDefault(_voMetrics);

var _voRange = _dereq_(24);

var _voRange2 = _interopRequireDefault(_voRange);

var _voReporting = _dereq_(25);

var _voReporting2 = _interopRequireDefault(_voReporting);

function ManifestParsing(config) {
    var instance = undefined;
    var dashManifestModel = config.dashManifestModel;
    var constants = config.constants;

    function getMetricsRangeStartTime(manifest, dynamic, range) {
        var mpd = dashManifestModel.getMpd(manifest);
        var voPeriods;
        var presentationStartTime = 0;
        var reportingStartTime;

        if (dynamic) {
            // For services with MPD@type='dynamic', the start time is
            // indicated in wall clock time by adding the value of this
            // attribute to the value of the MPD@availabilityStartTime
            // attribute.
            presentationStartTime = mpd.availabilityStartTime.getTime() / 1000;
        } else {
            // For services with MPD@type='static', the start time is indicated
            // in Media Presentation time and is relative to the PeriodStart
            // time of the first Period in this MPD.
            voPeriods = this.getRegularPeriods(mpd);

            if (voPeriods.length) {
                presentationStartTime = voPeriods[0].start;
            }
        }

        // When not present, DASH Metrics collection is
        // requested from the beginning of content
        // consumption.
        reportingStartTime = presentationStartTime;

        if (range && range.hasOwnProperty(constants.START_TIME)) {
            reportingStartTime += range.starttime;
        }

        return reportingStartTime;
    }

    function getMetrics(manifest) {
        var metrics = [];

        if (manifest.Metrics_asArray) {
            manifest.Metrics_asArray.forEach(function (metric) {
                var metricEntry = new _voMetrics2['default']();
                var isDynamic = dashManifestModel.getIsDynamic(manifest);

                if (metric.hasOwnProperty('metrics')) {
                    metricEntry.metrics = metric.metrics;
                } else {
                    //console.log("Invalid Metrics. metrics must be set. Ignoring.");
                    return;
                }

                if (metric.Range_asArray) {
                    metric.Range_asArray.forEach(function (range) {
                        var rangeEntry = new _voRange2['default']();

                        rangeEntry.starttime = getMetricsRangeStartTime(manifest, isDynamic, range);

                        if (range.hasOwnProperty('duration')) {
                            rangeEntry.duration = range.duration;
                        } else {
                            // if not present, the value is identical to the
                            // Media Presentation duration.
                            rangeEntry.duration = dashManifestModel.getDuration(manifest);
                        }

                        rangeEntry._useWallClockTime = isDynamic;

                        metricEntry.Range.push(rangeEntry);
                    });
                }

                if (metric.Reporting_asArray) {
                    metric.Reporting_asArray.forEach(function (reporting) {
                        var reportingEntry = new _voReporting2['default']();

                        if (reporting.hasOwnProperty(constants.SCHEME_ID_URI)) {
                            reportingEntry.schemeIdUri = reporting.schemeIdUri;
                        } else {
                            // Invalid Reporting. schemeIdUri must be set. Ignore.
                            return;
                        }

                        for (var prop in reporting) {
                            if (reporting.hasOwnProperty(prop)) {
                                reportingEntry[prop] = reporting[prop];
                            }
                        }

                        metricEntry.Reporting.push(reportingEntry);
                    });
                } else {
                    // Invalid Metrics. At least one reporting must be present. Ignore
                    return;
                }

                metrics.push(metricEntry);
            });
        }

        return metrics;
    }

    instance = {
        getMetrics: getMetrics
    };

    return instance;
}

ManifestParsing.__dashjs_factory_name = 'ManifestParsing';
exports['default'] = dashjs.FactoryMaker.getSingletonFactory(ManifestParsing);
/* jshint ignore:line */
module.exports = exports['default'];

},{"23":23,"24":24,"25":25}],20:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function MetricSerialiser() {

    // For each entry in the top level list within the metric (in the case
    // of the DVBErrors metric each entry corresponds to an "error event"
    // described in clause 10.8.4) the Player shall:
    function serialise(metric) {
        var pairs = [];
        var obj = [];
        var key = undefined,
            value = undefined;

        // Take each (key, value) pair from the metric entry and create a
        // string consisting of the name of the key, followed by an equals
        // ('=') character, followed by the string representation of the
        // value. The string representation of the value is created based
        // on the type of the value following the instructions in Table 22.
        for (key in metric) {
            if (metric.hasOwnProperty(key) && key.indexOf('_') !== 0) {
                value = metric[key];

                // we want to ensure that keys still end up in the report
                // even if there is no value
                if (value === undefined || value === null) {
                    value = '';
                }

                // DVB A168 10.12.4 Table 22
                if (Array.isArray(value)) {
                    // if trace or similar is null, do not include in output
                    if (!value.length) {
                        continue;
                    }

                    obj = [];

                    value.forEach(function (v) {
                        var isBuiltIn = Object.prototype.toString.call(v).slice(8, -1) !== 'Object';

                        obj.push(isBuiltIn ? v : serialise(v));
                    });

                    value = obj.map(encodeURIComponent).join(',');
                } else if (typeof value === 'string') {
                    value = encodeURIComponent(value);
                } else if (value instanceof Date) {
                    value = value.toISOString();
                } else if (typeof value === 'number') {
                    value = Math.round(value);
                }

                pairs.push(key + '=' + value);
            }
        }

        // Concatenate the strings created in the previous step with an
        // ampersand ('&') character between each one.
        return pairs.join('&');
    }

    return {
        serialise: serialise
    };
}

MetricSerialiser.__dashjs_factory_name = 'MetricSerialiser';
exports['default'] = dashjs.FactoryMaker.getSingletonFactory(MetricSerialiser);
/* jshint ignore:line */
module.exports = exports['default'];

},{}],21:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function RNG() {

    // check whether secure random numbers are available. if not, revert to
    // using Math.random
    var crypto = window.crypto || window.msCrypto;

    // could just as easily use any other array type by changing line below
    var ArrayType = Uint32Array;
    var MAX_VALUE = Math.pow(2, ArrayType.BYTES_PER_ELEMENT * 8) - 1;

    // currently there is only one client for this code, and that only uses
    // a single random number per initialisation. may want to increase this
    // number if more consumers in the future
    var NUM_RANDOM_NUMBERS = 10;

    var randomNumbers = undefined,
        index = undefined,
        instance = undefined;

    function initialise() {
        if (crypto) {
            if (!randomNumbers) {
                randomNumbers = new ArrayType(NUM_RANDOM_NUMBERS);
            }
            crypto.getRandomValues(randomNumbers);
            index = 0;
        }
    }

    function rand(min, max) {
        var r = undefined;

        if (!min) {
            min = 0;
        }

        if (!max) {
            max = 1;
        }

        if (crypto) {
            if (index === randomNumbers.length) {
                initialise();
            }

            r = randomNumbers[index] / MAX_VALUE;
            index += 1;
        } else {
            r = Math.random();
        }

        return r * (max - min) + min;
    }

    instance = {
        random: rand
    };

    initialise();

    return instance;
}

RNG.__dashjs_factory_name = 'RNG';
exports['default'] = dashjs.FactoryMaker.getSingletonFactory(RNG);
/* jshint ignore:line */
module.exports = exports['default'];

},{}],22:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DVBErrors = function DVBErrors() {
    _classCallCheck(this, DVBErrors);

    this.mpdurl = null;
    // String - Absolute URL from which the MPD was originally
    // retrieved (MPD updates will not change this value).

    this.errorcode = null;
    // String - The value of errorcode depends upon the type
    // of error being reported. For an error listed in the
    // ErrorType column below the value is as described in the
    // Value column.
    //
    // ErrorType                                            Value
    // ---------                                            -----
    // HTTP error status code                               HTTP status code
    // Unknown HTTP status code                             HTTP status code
    // SSL connection failed                                "SSL" followed by SSL alert value
    // DNS resolution failed                                "C00"
    // Host unreachable                                     "C01"
    // Connection refused                                   "C02"
    // Connection error – Not otherwise specified           "C03"
    // Corrupt media – ISO BMFF container cannot be parsed  "M00"
    // Corrupt media – Not otherwise specified              "M01"
    // Changing Base URL in use due to errors               "F00"
    // Becoming an error reporting Player                   "S00"

    this.terror = null;
    // Real-Time - Date and time at which error occurred in UTC,
    // formatted as a combined date and time according to ISO 8601.

    this.url = null;
    // String - Absolute URL from which data was being requested
    // when this error occurred. If the error report is in relation
    // to corrupt media or changing BaseURL, this may be a null
    // string if the URL from which the media was obtained or
    // which led to the change of BaseURL is no longer known.

    this.ipaddress = null;
    // String - IP Address which the host name in "url" resolved to.
    // If the error report is in relation to corrupt media or
    // changing BaseURL, this may be a null string if the URL
    // from which the media was obtained or which led to the
    // change of BaseURL is no longer known.

    this.servicelocation = null;
    // String - The value of the serviceLocation field in the
    // BaseURL being used. In the event of this report indicating
    // a change of BaseURL this is the value from the BaseURL
    // being moved from.
};

DVBErrors.SSL_CONNECTION_FAILED_PREFIX = 'SSL';
DVBErrors.DNS_RESOLUTION_FAILED = 'C00';
DVBErrors.HOST_UNREACHABLE = 'C01';
DVBErrors.CONNECTION_REFUSED = 'C02';
DVBErrors.CONNECTION_ERROR = 'C03';
DVBErrors.CORRUPT_MEDIA_ISOBMFF = 'M00';
DVBErrors.CORRUPT_MEDIA_OTHER = 'M01';
DVBErrors.BASE_URL_CHANGED = 'F00';
DVBErrors.BECAME_REPORTER = 'S00';

exports['default'] = DVBErrors;
module.exports = exports['default'];

},{}],23:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Metrics = function Metrics() {
  _classCallCheck(this, Metrics);

  this.metrics = '';
  this.Range = [];
  this.Reporting = [];
};

exports['default'] = Metrics;
module.exports = exports['default'];

},{}],24:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Range = function Range() {
  _classCallCheck(this, Range);

  // as defined in ISO23009-1
  this.starttime = 0;
  this.duration = Infinity;

  // for internal use
  this._useWallClockTime = false;
};

exports["default"] = Range;
module.exports = exports["default"];

},{}],25:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Reporting = function Reporting() {
  _classCallCheck(this, Reporting);

  // Reporting is a DescriptorType and doesn't have any additional fields
  this.schemeIdUri = '';
  this.value = '';
};

exports['default'] = Reporting;
module.exports = exports['default'];

},{}],26:[function(_dereq_,module,exports){
/**
* The copyright in this software is being made available under the BSD License,
* included below. This software may be subject to other third party and contributor
* rights, including patent rights, and no such rights are granted under this license.
*
* Copyright (c) 2013, Dash Industry Forum.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification,
* are permitted provided that the following conditions are met:
*  * Redistributions of source code must retain the above copyright notice, this
*  list of conditions and the following disclaimer.
*  * Redistributions in binary form must reproduce the above copyright notice,
*  this list of conditions and the following disclaimer in the documentation and/or
*  other materials provided with the distribution.
*  * Neither the name of Dash Industry Forum nor the names of its
*  contributors may be used to endorse or promote products derived from this software
*  without specific prior written permission.
*
*  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
*  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
*  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
*  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
*  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
*  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
*  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
*  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
*  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
*  POSSIBILITY OF SUCH DAMAGE.
*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreFactoryMaker = _dereq_(1);

var _coreFactoryMaker2 = _interopRequireDefault(_coreFactoryMaker);

function CustomTimeRanges() /*config*/{
    var customTimeRangeArray = [];
    var length = 0;

    function add(start, end) {
        var i = 0;

        for (i = 0; i < this.customTimeRangeArray.length && start > this.customTimeRangeArray[i].start; i++);

        this.customTimeRangeArray.splice(i, 0, { start: start, end: end });

        for (i = 0; i < this.customTimeRangeArray.length - 1; i++) {
            if (this.mergeRanges(i, i + 1)) {
                i--;
            }
        }
        this.length = this.customTimeRangeArray.length;
    }

    function clear() {
        this.customTimeRangeArray = [];
        this.length = 0;
    }

    function remove(start, end) {
        for (var i = 0; i < this.customTimeRangeArray.length; i++) {
            if (start <= this.customTimeRangeArray[i].start && end >= this.customTimeRangeArray[i].end) {
                //      |--------------Range i-------|
                //|---------------Range to remove ---------------|
                //    or
                //|--------------Range i-------|
                //|--------------Range to remove ---------------|
                //    or
                //                 |--------------Range i-------|
                //|--------------Range to remove ---------------|
                this.customTimeRangeArray.splice(i, 1);
                i--;
            } else if (start > this.customTimeRangeArray[i].start && end < this.customTimeRangeArray[i].end) {
                //|-----------------Range i----------------|
                //        |-------Range to remove -----|
                this.customTimeRangeArray.splice(i + 1, 0, { start: end, end: this.customTimeRangeArray[i].end });
                this.customTimeRangeArray[i].end = start;
                break;
            } else if (start > this.customTimeRangeArray[i].start && start < this.customTimeRangeArray[i].end) {
                //|-----------Range i----------|
                //                    |---------Range to remove --------|
                //    or
                //|-----------------Range i----------------|
                //            |-------Range to remove -----|
                this.customTimeRangeArray[i].end = start;
            } else if (end > this.customTimeRangeArray[i].start && end < this.customTimeRangeArray[i].end) {
                //                     |-----------Range i----------|
                //|---------Range to remove --------|
                //            or
                //|-----------------Range i----------------|
                //|-------Range to remove -----|
                this.customTimeRangeArray[i].start = end;
            }
        }

        this.length = this.customTimeRangeArray.length;
    }

    function mergeRanges(rangeIndex1, rangeIndex2) {
        var range1 = this.customTimeRangeArray[rangeIndex1];
        var range2 = this.customTimeRangeArray[rangeIndex2];

        if (range1.start <= range2.start && range2.start <= range1.end && range1.end <= range2.end) {
            //|-----------Range1----------|
            //                    |-----------Range2----------|
            range1.end = range2.end;
            this.customTimeRangeArray.splice(rangeIndex2, 1);
            return true;
        } else if (range2.start <= range1.start && range1.start <= range2.end && range2.end <= range1.end) {
            //                |-----------Range1----------|
            //|-----------Range2----------|
            range1.start = range2.start;
            this.customTimeRangeArray.splice(rangeIndex2, 1);
            return true;
        } else if (range2.start <= range1.start && range1.start <= range2.end && range1.end <= range2.end) {
            //      |--------Range1-------|
            //|---------------Range2--------------|
            this.customTimeRangeArray.splice(rangeIndex1, 1);
            return true;
        } else if (range1.start <= range2.start && range2.start <= range1.end && range2.end <= range1.end) {
            //|-----------------Range1--------------|
            //        |-----------Range2----------|
            this.customTimeRangeArray.splice(rangeIndex2, 1);
            return true;
        }
        return false;
    }

    function checkIndex(index) {
        var isInt = index !== null && !isNaN(index) && index % 1 === 0;

        if (!isInt) {
            throw new Error('index argument is not an integer');
        }
    }

    function start(index) {
        checkIndex(index);

        if (index >= this.customTimeRangeArray.length || index < 0) {
            return NaN;
        }

        return this.customTimeRangeArray[index].start;
    }

    function end(index) {
        checkIndex(index);

        if (index >= this.customTimeRangeArray.length || index < 0) {
            return NaN;
        }

        return this.customTimeRangeArray[index].end;
    }

    return {
        customTimeRangeArray: customTimeRangeArray,
        length: length,
        add: add,
        clear: clear,
        remove: remove,
        mergeRanges: mergeRanges,
        start: start,
        end: end
    };
}
CustomTimeRanges.__dashjs_factory_name = 'CustomTimeRanges';
exports['default'] = _coreFactoryMaker2['default'].getClassFactory(CustomTimeRanges);
module.exports = exports['default'];

},{"1":1}]},{},[3])(3)
});
//# sourceMappingURL=dash.reporting.debug.js.map
