(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Network = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer.call(target); Object.defineProperty(target, key, descriptor); }

var _utilsDecorators = require('../utils/decorators');

/**
 * A callback used as an event handler.
 * @public
 * @callback EventDispatcher~eventHandler
 * @param {...*} args The extra parameters provided to the `trigger` method.
 * @returns {?boolean} If `false` is explicitly returned, the `trigger` method will return `false`.
 */

/**
 * @class EventDispatcher
 */

var EventDispatcher = (function () {
    var _instanceInitializers = {};

    function EventDispatcher() {
        _classCallCheck(this, EventDispatcher);

        _defineDecoratedPropertyDescriptor(this, '_eventCallbacks', _instanceInitializers);
    }

    _createDecoratedClass(EventDispatcher, [{
        key: 'on',

        /**
         * Attach a callback to one or more events.
         * @public
         * @method EventDispatcher#on
         * @param {string|string[]} events One or multiple event names.
         * @param {EventDispatcher~eventHandler} callback An event handler.
         * @returns {EventDispatcher}
         */
        value: function on(events, callback) {
            var _this = this;

            events = Array.isArray(events) ? events : [events];

            events.forEach(function (event) {
                var eventCallbacks = _this._eventCallbacks[event] = _this._eventCallbacks[event] || [];

                // If the callback isn't already registered, store it.
                if (! ~eventCallbacks.indexOf(callback)) {
                    eventCallbacks.push(callback);
                }
            });

            return this;
        }

        /**
         * Detach a callback from one or more events.
         * @public
         * @method EventDispatcher#off
         * @param {string|string[]} events One or multiple event names.
         * @param {EventDispatcher~eventHandler} [callback=null] An event handler.
         * @returns {EventDispatcher}
         */
    }, {
        key: 'off',
        value: function off(events) {
            var _this2 = this;

            var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            events = Array.isArray(events) ? events : [events];

            events.forEach(function (event) {
                var eventCallbacks = _this2._eventCallbacks[event];

                // If there is no specified callback, simply delete all the callbacks binded to the provided event.
                if (!callback && eventCallbacks) {
                    delete _this2._eventCallbacks[event];
                } else {
                    var callbackIndex = eventCallbacks ? eventCallbacks.indexOf(callback) : -1;

                    // If the callback is registered, remove it from the array.
                    if (callbackIndex != -1) {
                        eventCallbacks.splice(callbackIndex, 1);
                    }
                }
            });

            return this;
        }

        /**
         * Trigger an event.
         * @public
         * @method EventDispatcher#trigger
         * @param {string} event An event name.
         * @param {...*} extraParameters Some extra parameters to pass to the event handlers.
         * @returns {boolean} Returns `false` if one of the event handlers explicitly returned `false`.
         */
    }, {
        key: 'trigger',
        value: function trigger(event) {
            for (var _len = arguments.length, extraParameters = Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
                extraParameters[_key2 - 1] = arguments[_key2];
            }

            var eventCallbacks = this._eventCallbacks[event] || [];

            // A callback can return a boolean value which will be logically compared to the other callbacks values before
            // being returned by the trigger() method. This allows a callback to send a "signal" to the caller, like
            // cancelling an action.
            var returnValue = true;

            eventCallbacks.forEach(function (eventCallback) {
                // A callback must explicitly return false if it wants the trigger() method to return false, undefined will
                // not work. This avoids crappy callbacks to mess up with the triggering system.
                var value = eventCallback.apply(undefined, extraParameters);
                value = value !== false ? true : false;

                returnValue = returnValue && value; // Compare the result of the callback to the actual return value
            });

            return returnValue;
        }
    }, {
        key: '_eventCallbacks',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },
        enumerable: true
    }], null, _instanceInitializers);

    return EventDispatcher;
})();

exports['default'] = EventDispatcher;
module.exports = exports['default'];

/**
 * All the registered event callbacks, organized by events.
 * @private
 * @member {Object} EventDispatcher#_eventCallbacks
 */

},{"../utils/decorators":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer.call(target); Object.defineProperty(target, key, descriptor); }

var _HttpModule2 = require('./HttpModule');

var _HttpModule3 = _interopRequireDefault(_HttpModule2);

var _Timing = require('../Timing');

var _Timing2 = _interopRequireDefault(_Timing);

var _utilsHelpers = require('../../utils/helpers');

var _utilsDecorators = require('../../utils/decorators');

/**
 * @public
 * @typedef {Object} BandwidthModule~settingsObject
 * @extends HttpModule~settingsObject
 * @property {Object} data
 * @property {number} data.size The amount of data to initially use.
 * @property {number} [data.multiplier=2] If the measure period can't reach the delay defined in the settings, the data amount is multiplied by the following value.
 */

/**
 * Apply a new set of custom settings.
 * @public
 * @method BandwidthModule#settings
 * @param {BandwidthModule~settingsObject} settings A set of custom settings.
 * @returns {BandwidthModule}
 */
/**
 * Return the current set of settings.
 * @public
 * @method BandwidthModule#settings^2
 * @returns {BandwidthModule~settingsObject}
 */

/**
 * @class BandwidthModule
 * @extends HttpModule
 * @param {string} loadingType The loading type, `upload` or `download`.
 * @param {BandwidthModule~settingsObject} [settings={}] A set of custom settings.
 */

var BandwidthModule = (function (_HttpModule) {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _inherits(BandwidthModule, _HttpModule);

    _createDecoratedClass(BandwidthModule, [{
        key: '_loadingType',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         *
         * @private
         * @member {boolean} BandwidthModule#_intendedEnd
         */
        enumerable: true
    }, {
        key: '_intendedEnd',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },

        /**
         *
         * @private
         * @member {boolean} BandwidthModule#_isRestarting
         */
        enumerable: true
    }, {
        key: '_isRestarting',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },

        /**
         * Tracks the value of the `loaded` property for each progress event.
         * @private
         * @member {?number} BandwidthModule#_lastLoadedValue
         */
        enumerable: true
    }, {
        key: '_lastLoadedValue',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return null;
        },

        /**
         * The recorded measures of speed.
         * @private
         * @member {number[]} BandwidthModule#_speedRecords
         */
        enumerable: true
    }, {
        key: '_speedRecords',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return [];
        },

        /**
         * The average speed.
         * @private
         * @member {number} BandwidthModule#_avgSpeed
         */
        enumerable: true
    }, {
        key: '_avgSpeed',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The ID of the current request.
         * @private
         * @member {number} BandwidthModule#_requestID
         */
        enumerable: true
    }, {
        key: '_requestID',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return 0;
        },

        /**
         * The ID of the current progress event.
         * @private
         * @member {number} BandwidthModule#_progressID
         */
        enumerable: true
    }, {
        key: '_progressID',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return 0;
        },

        /**
         * Defines if measures have started.
         * @private
         * @member {boolean} BandwidthModule#_started
         */
        enumerable: true
    }, {
        key: '_started',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },

        /**
         * Defines if the current progress event is the first one triggered for the current request.
         * @private
         * @member {boolean} BandwidthModule#_firstProgress
         */
        enumerable: true
    }, {
        key: '_firstProgress',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return true;
        },

        /**
         * @private
         * @member {Defer} BandwidthModule#_deferredProgress
         */
        enumerable: true
    }, {
        key: '_deferredProgress',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * Unique labels for each request, exclusively used to make measures.
         * @private
         * @member {Object} BandwidthModule#_timingLabels
         * @property {?string} start
         * @property {?string} progress
         * @property {?string} end
         * @property {?string} measure
         */
        enumerable: true
    }, {
        key: '_timingLabels',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {
                start: null,
                progress: null,
                end: null,
                measure: null
            };
        },
        enumerable: true
    }], null, _instanceInitializers);

    function BandwidthModule(loadingType) {
        var _this = this;

        var settings = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, BandwidthModule);

        loadingType = ~['upload', 'download'].indexOf(loadingType) ? loadingType : 'download';

        _get(Object.getPrototypeOf(BandwidthModule.prototype), 'constructor', this).call(this, loadingType);

        _defineDecoratedPropertyDescriptor(this, '_loadingType', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_intendedEnd', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_isRestarting', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_lastLoadedValue', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_speedRecords', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_avgSpeed', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_requestID', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_progressID', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_started', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_firstProgress', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_deferredProgress', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_timingLabels', _instanceInitializers);

        this._extendDefaultSettings({
            data: {
                // 2 MB for upload, 10 MB for download
                size: loadingType == 'upload' ? 2 * 1024 * 1024 : 10 * 1024 * 1024,
                multiplier: 2
            }
        }).settings(settings);

        this._loadingType = loadingType;

        // Bind to XHR events
        this.on('xhr-upload-loadstart', function () {
            return _Timing2['default'].mark(_this._timingLabels.start);
        });
        this.on('xhr-readystatechange', function (xhr) {
            if (!_this._started && xhr.readyState == XMLHttpRequest.LOADING) {
                _Timing2['default'].mark(_this._timingLabels.start);
                _this._started = true;
            }
        });

        var eventsPrefix = loadingType == 'upload' ? 'xhr-upload' : 'xhr';

        this.on(eventsPrefix + '-progress', function (xhr, event) {
            return _this._progress(event);
        });
        this.on(eventsPrefix + '-timeout', function () {
            return _this._timeout();
        });
        this.on(eventsPrefix + '-loadend', function () {
            return _this._end();
        });
    }

    /**
     * Start requesting the server to make measures.
     * @public
     * @method BandwidthModule#start
     * @returns {BandwidthModule}
     */

    _createDecoratedClass(BandwidthModule, [{
        key: 'start',
        value: function start() {
            var loadingType = this._loadingType,
                dataSettings = this.settings().data,
                reqID = this._requestID++;

            this._intendedEnd = false;
            this._lastLoadedValue = null;
            this._speedRecords = [];
            this._started = false;
            this._firstProgress = true;
            this._deferredProgress = (0, _utilsHelpers.defer)();

            // Trigger the start event
            if (!this._isRestarting) {
                this.trigger('start', dataSettings.size);
            }

            // Create unique timing labels for the new request
            var labels = this._timingLabels;
            labels.start = loadingType + '-' + reqID + '-start';
            labels.progress = loadingType + '-' + reqID + '-progress';
            labels.end = loadingType + '-' + reqID + '-end';
            labels.measure = loadingType + '-' + reqID + '-measure';

            // Generate some random data to upload to the server. Here we're using a Blob instead of an ArrayBuffer because
            // of a bug in Chrome (tested in v33.0.1750.146), causing a freeze of the page while trying to directly upload
            // an ArrayBuffer (through an ArrayBufferView). The freeze lasts nearly 4.5s for 10MB of data. Using a Blob
            // seems to solve the problem.
            var blob = loadingType == 'upload' ? new Blob([new ArrayBuffer(dataSettings.size)]) : null;

            var type = loadingType == 'download' ? 'GET' : 'POST';

            // Initiate and send a new request
            this._newRequest(type, {
                size: dataSettings.size
            })._sendRequest(blob);

            return this;
        }

        /**
         * Abort the measures.
         * @public
         * @method BandwidthModule#abort
         * @returns {BandwidthModule}
         */
    }, {
        key: 'abort',
        value: function abort() {
            this._intendedEnd = true;
            return this._abort();
        }

        /**
         * Make bandwidth measures for the current request.
         * @private
         * @method BandwidthModule#_progress
         * @param {ProgressEvent} event The event associated with the progress event of the current request.
         * @returns {BandwidthModule}
         */
    }, {
        key: '_progress',
        value: function _progress(event) {
            var _this2 = this;

            // Ignore the first progress event, it generally contributes to get incoherent values.
            if (this._firstProgress) return this._firstProgress = false;

            // Execute the previous progress trigger
            this._deferredProgress.run();

            var labels = this._timingLabels,
                progressID = this._progressID++,
                markLabel = labels.progress + '-' + progressID,
                loaded = event.loaded;

            _Timing2['default'].mark(markLabel);

            // Measure the average speed (B/s) since the request started
            var avgMeasure = _Timing2['default'].measure(labels.measure + '-avg-' + progressID, labels.start, markLabel),
                avgSpeed = loaded / avgMeasure * 1000;

            var instantSpeed;

            if (this._lastLoadedValue === null) {
                // We are executing the first progress event of the current request
                instantSpeed = avgSpeed; // The instant speed of the first progress event is equal to the average one
            } else {
                    // Measure the instant speed (B/s), which defines the speed between two progress events.
                    var instantMeasure = _Timing2['default'].measure(labels.measure + '-instant-' + progressID,
                    // Set the mark of the previous progress event as the starting point
                    labels.progress + '-' + (progressID - 1), markLabel);
                    instantSpeed = (loaded - this._lastLoadedValue) / instantMeasure * 1000;
                }

            // Save the `loaded` property of the event for the next progress event
            this._lastLoadedValue = loaded;

            // Defer measures saving and event triggering, this allows to cancel the last progress event, which can generate
            // incoherent values.
            this._deferredProgress = (0, _utilsHelpers.defer)(function () {
                _this2._avgSpeed = avgSpeed;
                _this2._speedRecords.push(instantSpeed);

                _this2.trigger('progress', avgSpeed, instantSpeed);
            });

            return this;
        }

        /**
         * Mark the current request as entirely finished (this means it ended after a time out).
         * @private
         * @method BandwidthModule#_timeout
         * @returns {BandwidthModule}
         */
    }, {
        key: '_timeout',
        value: function _timeout() {
            this._intendedEnd = true;
            return this;
        }

        /**
         * End the measures.
         * @private
         * @method BandwidthModule#_end
         * @returns {BandwidthModule}
         */
    }, {
        key: '_end',
        value: function _end() {
            // A timeout or an abort occured, bypass the further requests and trigger the "end" event.
            if (this._intendedEnd) {
                this._isRestarting = false;
                this.trigger('end', this._avgSpeed, this._speedRecords);
            }

            // The request ended to early, restart it with an increased data size.
            else {
                    var dataSettings = this.settings().data,
                        size = dataSettings.size * dataSettings.multiplier;

                    this.settings({ data: { size: size } });
                    this.trigger('restart', size);

                    this._isRestarting = true;
                    this.start();
                }

            return this;
        }
    }], null, _instanceInitializers);

    return BandwidthModule;
})(_HttpModule3['default']);

exports['default'] = BandwidthModule;
module.exports = exports['default'];

/**
 *
 * @private
 * @member {string} BandwidthModule#_loadingType
 */

},{"../../utils/decorators":7,"../../utils/helpers":8,"../Timing":6,"./HttpModule":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer.call(target); Object.defineProperty(target, key, descriptor); }

var _EventDispatcher2 = require('../EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _utilsHelpers = require('../../utils/helpers');

var _utilsDecorators = require('../../utils/decorators');

/**
 * @public
 * @typedef {Object} HttpModule~settingsObject
 * @property {string} [endpoint=./network.php] Where is located your `network.php` file.
 * @property {number} [delay=8000] The delay while you want to take measures.
 */

/**
 * @class HttpModule
 * @extends EventDispatcher
 * @param {string} moduleName The name of the instanciated module.
 * @param {HttpModule~settingsObject} [settings={}] A set of custom settings.
 */

var HttpModule = (function (_EventDispatcher) {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _inherits(HttpModule, _EventDispatcher);

    _createDecoratedClass(HttpModule, [{
        key: '_defaultSettings',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return null;
        },

        /**
         * The current settings.
         * @private
         * @member {?Object} HttpModule#_settings
         */
        enumerable: true
    }, {
        key: '_settings',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return null;
        },

        /**
         * The module name, will be send to the server.
         * @private
         * @member {string} HttpModule#_moduleName
         */
        enumerable: true
    }, {
        key: '_moduleName',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The current XMLHttpRequest object.
         * @private
         * @member {?XMLHttpRequest} HttpModule#_xhr
         */
        enumerable: true
    }, {
        key: '_xhr',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return null;
        },

        /**
         * An URL token to avoid any caching issues. Also allows to identify the request in the Resource Timing entries.
         * @private
         * @member {?string} HttpModule#_lastURLToken
         */
        enumerable: true
    }, {
        key: '_lastURLToken',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return null;
        },

        /**
         * Defines if the module is currently running an HTTP request.
         * @private
         * @member {boolean} HttpModule#_requesting
         */
        enumerable: true
    }, {
        key: '_requesting',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },

        /**
         * Defines if the requesting status has been overridden by the `_setRequesting` method.
         * @private
         * @member {boolean} HttpModule#_requestingOverridden
         */
        enumerable: true
    }, {
        key: '_requestingOverridden',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },
        enumerable: true
    }], null, _instanceInitializers);

    function HttpModule(moduleName) {
        var _this = this;

        var settings = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, HttpModule);

        _get(Object.getPrototypeOf(HttpModule.prototype), 'constructor', this).call(this);

        _defineDecoratedPropertyDescriptor(this, '_defaultSettings', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_settings', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_moduleName', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_xhr', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_lastURLToken', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_requesting', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_requestingOverridden', _instanceInitializers);

        this._extendDefaultSettings({
            endpoint: './network.php',
            delay: 8000
        });

        this.settings(settings);

        this._moduleName = moduleName;

        // Each time a request starts or ends, set the requesting value unless it has been overridden with the
        // _setRequesting() method.
        this.on(['xhr-loadstart', 'xhr-upload-loadstart'], function () {
            if (!_this._requestingOverridden) {
                _this._requesting = true;
            }
        });

        this.on(['xhr-loadend', 'xhr-upload-loadend'], function () {
            if (!_this._requestingOverridden) {
                _this._requesting = false;
            }
        });
    }

    /**
     * Apply a new set of custom settings.
     * @public
     * @method HttpModule#settings
     * @param {HttpModule~settingsObject} settings A set of custom settings.
     * @returns {HttpModule}
     */
    /**
     * Return the current set of settings.
     * @public
     * @method HttpModule#settings^2
     * @returns {HttpModule~settingsObject}
     */

    _createDecoratedClass(HttpModule, [{
        key: 'settings',
        value: function settings() {
            var _settings = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if ((0, _utilsHelpers.isObject)(_settings)) {
                this._settings = (0, _utilsHelpers.assignStrict)(this._defaultSettings || {}, this._settings || {}, _settings);
                return this;
            } else {
                return (0, _utilsHelpers.copy)(this._settings || this._defaultSettings || {});
            }
        }

        /**
         * Return if the module is currently making a request.
         * @public
         * @method HttpModule#isRequesting
         * @returns {boolean} `true` if the module is requesting, otherwise `false`.
         */
    }, {
        key: 'isRequesting',
        value: function isRequesting() {
            return this._requesting;
        }

        /**
         * Extend the set of default settings.
         * @protected
         * @method HttpModule#_extendDefaultSettings
         * @param {Object} settings The new properties to add to the default settings.
         * @returns {HttpModule}
         */
    }, {
        key: '_extendDefaultSettings',
        value: function _extendDefaultSettings(settings) {
            this._defaultSettings = (0, _utilsHelpers.assign)(this._defaultSettings || {}, settings);
            return this;
        }

        /**
         * Create a new XHR request.
         * @protected
         * @method HttpModule#_newRequest
         * @param {string} httpMethod The HTTP method to use with the request, GET or POST.
         * @param {Object} queryParams The query parameters to use with the request.
         * @returns {HttpModule}
         */
    }, {
        key: '_newRequest',
        value: function _newRequest(httpMethod, queryParams) {
            var _this2 = this;

            // Check if a callback binded to the "_newRequest" event returns false, if it's the case, cancel the request
            // creation. If the requesting status has been overridden, there's no need to cancel the request since the user
            // should know what he's doing.
            if (!this.trigger('_newRequest') && !this._requestingOverridden) {
                console.warn('To ensure accurate measures, you can only make one request at a time.');
                return this;
            }

            var settings = this.settings(),
                xhr = new XMLHttpRequest(),
                validHttpMethods = ['GET', 'POST'];

            // Prepare the new request.
            if (! ~validHttpMethods.indexOf(httpMethod)) {
                console.warn('The HTTP method must be GET or POST.');
                return this;
            }

            queryParams = queryParams || {};

            var tokenSuffix = new Date().getTime();
            this._lastURLToken = 'network-' + tokenSuffix;

            // Append the query parameters
            var url = settings.endpoint;
            url += ~url.indexOf('?') ? '&' : '?';
            url += 'module=' + this._moduleName;

            Object.keys(queryParams).forEach(function (param) {
                var value = encodeURIComponent(queryParams[param]);
                url += '&' + param + '=' + value;
            });

            url += '&' + this._lastURLToken;

            xhr.open(httpMethod, url);

            // Abort the previous request if it hasn't been sent
            if (this._xhr && this._xhr.readyState == XMLHttpRequest.OPENED) {
                this._xhr.abort();
            }

            // Replace the old request by the new one
            this._xhr = xhr;

            // Bind all the XHR events
            var events = ['loadstart', 'progress', 'abort', 'error', 'load', 'timeout', 'loadend', 'readystatechange'];

            events.forEach(function (eventType) {
                xhr.addEventListener(eventType, function () {
                    for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
                        args[_key2] = arguments[_key2];
                    }

                    // A last progress event can be triggered once a request has timed out, ignore it.
                    if (eventType == 'progress' && !_this2._requesting) return;

                    _this2.trigger.apply(_this2, ['xhr-' + eventType, xhr].concat(args));
                });

                // The XMLHttpRequestUpload interface supports all the above event types except the "readystatechange" one
                if (eventType != 'readystatechange') {
                    xhr.upload.addEventListener(eventType, function () {
                        for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
                            args[_key3] = arguments[_key3];
                        }

                        _this2.trigger.apply(_this2, ['xhr-upload-' + eventType, xhr].concat(args));
                    });
                }
            });

            // Define the timeout of the request. We don't use the native `timeout` property since it can distort the
            // measures.
            // See: https://github.com/nesk/network.js/issues/26
            var startTimeout = function startTimeout(xhr) {
                setTimeout(function () {
                    if (xhr.readyState != XMLHttpRequest.UNSENT && xhr.readyState != XMLHttpRequest.DONE) {
                        _this2.trigger('xhr-timeout');
                        _this2.trigger('xhr-upload-timeout');
                        xhr.abort();
                    }
                }, settings.delay);
            };

            this.on('xhr-upload-loadstart', startTimeout).on('xhr-readystatechange', (function (timeoutStarted) {
                return function (xhr) {
                    if (!timeoutStarted && xhr.readyState == XMLHttpRequest.LOADING) {
                        timeoutStarted = true;
                        startTimeout(xhr);
                    }
                };
            })(false));

            return this;
        }

        /**
         * Send a newly created XHR request.
         * @protected
         * @method HttpModule#_sendRequest
         * @param {?*} [data=null] The data to send with the request.
         * @returns {HttpModule}
         */
    }, {
        key: '_sendRequest',
        value: function _sendRequest() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (this._xhr && this._xhr.readyState == XMLHttpRequest.OPENED) {
                this._xhr.send(data);
            } else {
                console.warn('A request must have been created before sending any data.');
            }

            return this;
        }

        /**
         * Abort the current request.
         * @protected
         * @method HttpModule#_abort
         * @returns {HttpModule}
         */
    }, {
        key: '_abort',
        value: function _abort() {
            if (this._xhr) {
                this._xhr.abort();
            }

            return this;
        }

        /**
         * Get the Resource Timing entry associated to the current request.
         * @protected
         * @method HttpModule#_getTimingEntry
         * @param {HttpModule~timingCallback} callback A callback used to send back the timing entry.
         * @returns {HttpModule}
         */
    }, {
        key: '_getTimingEntry',
        value: function _getTimingEntry(callback) {
            // The Resource Timing entries aren't immediately available once the 'load' event is triggered by an
            // XMLHttpRequest, we must wait for another process tick to check for a refreshed list.
            setTimeout((function (lastURLToken) {
                return function () {
                    // Filter the timing entries to return only the one concerned by the last request made
                    var entries = performance.getEntriesByType('resource').filter(function (entry) {
                        return ~entry.name.indexOf(lastURLToken);
                    });

                    /**
                     * A callback used to send back the timing entry.
                     * @private
                     * @callback HttpModule~timingCallback
                     * @param {PerformanceResourceTiming} entry The Resource Timing entry associated to the current request.
                     */
                    callback(entries.length ? entries[0] : null);
                };
            })(this._lastURLToken), 0);

            return this;
        }

        /**
         * Override the requesting status of the module.
         * @protected
         * @method HttpModule#_setRequesting
         * @param {boolean} isRequesting The requesting status.
         * @returns {HttpModule}
         */
    }, {
        key: '_setRequesting',
        value: function _setRequesting(isRequesting) {
            this._requestingOverridden = true;
            this._requesting = isRequesting;
            return this;
        }
    }], null, _instanceInitializers);

    return HttpModule;
})(_EventDispatcher3['default']);

exports['default'] = HttpModule;
module.exports = exports['default'];

/**
 * The default settings.
 * @private
 * @member {?Object} HttpModule#_defaultSettings
 */

},{"../../utils/decorators":7,"../../utils/helpers":8,"../EventDispatcher":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer.call(target); Object.defineProperty(target, key, descriptor); }

var _HttpModule2 = require('./HttpModule');

var _HttpModule3 = _interopRequireDefault(_HttpModule2);

var _Timing = require('../Timing');

var _Timing2 = _interopRequireDefault(_Timing);

var _utilsHelpers = require('../../utils/helpers');

var _utilsDecorators = require('../../utils/decorators');

/**
 * @public
 * @typedef {Object} LatencyModule~settingsObject
 * @property {string} [endpoint=./network.php] Where is located your `network.php` file.
 * @property {number} [measures=5] How many measures should be returned.
 * @property {number} [attempts=3] How much attempts to get a valid value should be done for each measure.
 */

/**
 * @class LatencyModule
 * @extends HttpModule
 * @param {LatencyModule~settingsObject} [settings={}] A set of custom settings.
 */

var LatencyModule = (function (_HttpModule) {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _inherits(LatencyModule, _HttpModule);

    _createDecoratedClass(LatencyModule, [{
        key: '_supportsResourceTiming',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The total number of requests left.
         * @private
         * @member {number} LatencyModule#_requestsLeft
         */
        enumerable: true
    }, {
        key: '_requestsLeft',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The total number of attempts left.
         * @private
         * @member {number} LatencyModule#_attemptsLeft
         */
        enumerable: true
    }, {
        key: '_attemptsLeft',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The measured latencies.
         * @private
         * @member {number[]} LatencyModule#_latencies
         */
        enumerable: true
    }, {
        key: '_latencies',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The ID of the current request.
         * @private
         * @member {number} LatencyModule#_requestID
         */
        enumerable: true
    }, {
        key: '_requestID',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return 0;
        },

        /**
         * Unique labels for each request, exclusively used to make measures.
         * @private
         * @member {Object} LatencyModule#_requestID
         * @property {?string} start
         * @property {?string} end
         * @property {?string} measure
         */
        enumerable: true
    }, {
        key: '_timingLabels',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {
                start: null,
                end: null,
                measure: null
            };
        },
        enumerable: true
    }], null, _instanceInitializers);

    function LatencyModule() {
        var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, LatencyModule);

        _get(Object.getPrototypeOf(LatencyModule.prototype), 'constructor', this).call(this, 'latency');

        _defineDecoratedPropertyDescriptor(this, '_supportsResourceTiming', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_requestsLeft', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_attemptsLeft', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_latencies', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_requestID', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_timingLabels', _instanceInitializers);

        this._extendDefaultSettings({
            measures: 5,
            attempts: 3
        }).settings(settings);

        this._defineResourceTimingSupport();
    }

    /**
     * Apply a new set of custom settings.
     * @public
     * @method LatencyModule#settings
     * @param {LatencyModule~settingsObject} settings A set of custom settings.
     * @returns {LatencyModule}
     */
    /**
     * Return the current set of settings.
     * @public
     * @method LatencyModule#settings^2
     * @returns {LatencyModule~settingsObject}
     */

    _createDecoratedClass(LatencyModule, [{
        key: 'settings',
        value: function settings() {
            var _settings = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if ((0, _utilsHelpers.isObject)(_settings)) {
                return _get(Object.getPrototypeOf(LatencyModule.prototype), 'settings', this).call(this, (0, _utilsHelpers.assignStrict)(_settings, {
                    delay: 0 // We dont want any timeout during a latency calculation
                }));
            } else {
                    return (0, _utilsHelpers.except)(_get(Object.getPrototypeOf(LatencyModule.prototype), 'settings', this).call(this), ['delay']);
                }
        }

        /**
         * Start requesting the server to make measures.
         * @public
         * @method LatencyModule#start
         * @returns {LatencyModule}
         */
    }, {
        key: 'start',
        value: function start() {
            var _settings2 = this.settings();

            // Set the number of requests required to establish the network latency.
            var measures = _settings2.measures;
            var attempts = _settings2.attempts;
            this._requestsLeft = measures;
            this._attemptsLeft = attempts * measures;

            // If the browser doesn't support the Resource Timing API, add a request that will be ignored to avoid a longer
            // request due to a possible DNS/whatever fetch.
            if (!this._supportsResourceTiming) {
                this._requestsLeft++;
                this._attemptsLeft++;
            }

            // Override the requesting value since a complete latency request consists off multiple ones
            this._setRequesting(true);

            this._latencies = [];
            this._nextRequest();

            return this;
        }

        /**
         * Define if the module should support the Resource Timing API.
         * @private
         * @method LatencyModule#_defineResourceTimingSupport
         * @param {boolean} supportsResourceTiming If `undefined`, the support will be determined by feature detection.
         * @returns {LatencyModule}
         */
    }, {
        key: '_defineResourceTimingSupport',
        value: function _defineResourceTimingSupport(supportsResourceTiming) {
            var _this = this;

            if (typeof supportsResourceTiming !== 'boolean') supportsResourceTiming = _Timing2['default'].supportsResourceTiming;
            this._supportsResourceTiming = supportsResourceTiming;

            // Unregisters all the previously registered events, since this method can be called multiple times.
            this.off(['xhr-load', 'xhr-loadstart', 'xhr-readystatechange']);

            // Measure the latency with the Resource Timing API once the request is finished
            if (supportsResourceTiming) {
                this.on('xhr-load', function () {
                    return _this._measure();
                });
            }

            // If the browser doesn't support the Resource Timing API, we fallback on a Datetime solution.
            else {
                    // Set a mark when the request starts
                    this.on('xhr-loadstart', function () {
                        return _Timing2['default'].mark(_this._timingLabels.start);
                    });

                    // Then make a measure with the previous mark
                    this.on('xhr-readystatechange', function (xhr) {
                        return _this._measure(xhr);
                    });
                }
        }

        /**
         * Initiate the next request used for latency measures.
         * @private
         * @method LatencyModule#_nextRequest
         * @param {boolean} [retry=false] Defines if the next request is a retry due to a failing request or not.
         * @returns {LatencyModule}
         */
    }, {
        key: '_nextRequest',
        value: function _nextRequest() {
            var _this2 = this;

            var retry = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            var reqID = this._requestID++;
            var requestsLeft = retry ? this._requestsLeft : this._requestsLeft--;

            if (this._attemptsLeft-- && (requestsLeft || retry)) {
                // Create unique timing labels for the new request
                var labels = this._timingLabels;
                labels.start = 'latency-' + reqID + '-start';
                labels.end = 'latency-' + reqID + '-end';
                labels.measure = 'latency-' + reqID + '-measure';

                // Create the new request and send it
                this._newRequest('GET')._sendRequest();
            } else {
                // All the requests are finished, set the requesting status to false.
                this._setRequesting(false);

                // If all the requests have been executed, calculate the average latency. Since the _getTimingEntry() method
                // is asynchronous, wait for the next process tick to execute the _end() method, to be sure that all the
                // latencies have been retrieved.
                setTimeout(function () {
                    return _this2._end();
                }, 0);
            }

            return this;
        }

        /**
         * Make latency measures for the last request.
         * @private
         * @method LatencyModule#_measure
         * @param {?XMLHttpRequest} [xhr=null] The concerned XMLHttpRequest if the browser doesn't support the Resource Timing API.
         * @returns {LatencyModule}
         */
    }, {
        key: '_measure',
        value: function _measure() {
            var _this3 = this;

            var xhr = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            // With Resource Timing API
            if (!xhr) {
                this._getTimingEntry(function (entry) {
                    // The latency calculation differs between an HTTP and an HTTPS connection
                    // See: http://www.w3.org/TR/resource-timing/#processing-model
                    var latency = !entry.secureConnectionStart ? entry.connectEnd - entry.connectStart : entry.secureConnectionStart - entry.connectStart;

                    if (latency) _this3._latencies.push(latency);
                    _this3._nextRequest(!latency);
                });
            }

            // Without Resource Timing API
            else if (this._requestsLeft < this.settings().measures) {

                    // Measure and save the latency if the headers have been received
                    if (xhr.readyState == XMLHttpRequest.HEADERS_RECEIVED) {
                        var labels = this._timingLabels;

                        _Timing2['default'].mark(labels.end);
                        var latency = _Timing2['default'].measure(labels.measure, labels.start, labels.end);

                        if (latency) this._latencies.push(latency);

                        // Abort the current request before we run a new one
                        this._abort();
                        this._nextRequest(!latency);
                    }
                }

                // Ignore the first request when using the XHR states. See the comments in the start() method for explanations.
                else {
                        this._nextRequest();
                    }

            return this;
        }

        /**
         * End the measures.
         * @private
         * @method LatencyModule#_end
         * @returns {LatencyModule}
         */
    }, {
        key: '_end',
        value: function _end() {
            var latencies = this._latencies;

            // Get the average latency
            var avgLatency = latencies.reduce(function (a, b) {
                return a + b;
            }, 0) / (latencies.length || 1);
            avgLatency = avgLatency || null;

            // If there is no measures, restart with the polyfill.
            if (!latencies.length) {
                this._defineResourceTimingSupport(false);
                this.start();
                return this;
            }

            // If there is not enough measures, display a warning.
            if (latencies.length < this.settings().measures) {
                var _settings3 = this.settings();

                var measures = _settings3.measures;
                var attempts = _settings3.attempts;

                console.warn('\n                An insufficient number of measures have been processed, this could be due to your web server using\n                persistant connections or to your client settings (measures: ' + measures + ', attempts: ' + attempts + ').\n            ');
            }

            // Trigger the "end" event with the average latency and the latency list as parameters
            this.trigger('end', avgLatency, latencies);

            return this;
        }
    }], null, _instanceInitializers);

    return LatencyModule;
})(_HttpModule3['default']);

exports['default'] = LatencyModule;
module.exports = exports['default'];

/**
 * Defines if the module supports the Resource Timing API.
 * @private
 * @member {number} LatencyModule#_requestsLeft
 */

},{"../../utils/decorators":7,"../../utils/helpers":8,"../Timing":6,"./HttpModule":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer.call(target); Object.defineProperty(target, key, descriptor); }

var _EventDispatcher = require('./EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _HttpHttpModule = require('./Http/HttpModule');

var _HttpHttpModule2 = _interopRequireDefault(_HttpHttpModule);

var _HttpLatencyModule = require('./Http/LatencyModule');

var _HttpLatencyModule2 = _interopRequireDefault(_HttpLatencyModule);

var _HttpBandwidthModule = require('./Http/BandwidthModule');

var _HttpBandwidthModule2 = _interopRequireDefault(_HttpBandwidthModule);

var _Timing = require('./Timing');

var _Timing2 = _interopRequireDefault(_Timing);

var _utilsHelpers = require('../utils/helpers');

var _utilsDecorators = require('../utils/decorators');

/**
 * @public
 * @typedef {Object} Network~settingsObject
 * @property {LatencyModule~settingsObject} latency
 * @property {BandwidthModule~settingsObject} upload
 * @property {BandwidthModule~settingsObject} download
 * @example
 * {
 *     // Top-level properties are applied to all the modules
 *     endpoint: './my-new-endpoint/',
 *
 *     // Top-level properties will be overridden by the ones specified in each module
 *     latency: {
 *         endpoint: './my-new-latency-endpoint/'
 *     }
 * }
 */

/**
 * @class Network
 * @param {Network~settingsObject} [settings={}] A set of custom settings.
 * @member {LatencyModule} latency The latency module.
 * @member {BandwidthModule} upload The upload module.
 * @member {BandwidthModule} download The download module.
 */

var Network = (function () {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _createDecoratedClass(Network, [{
        key: '_modules',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },

        /**
         * Defines if the registered modules have been initialized.
         * @private
         * @member {boolean} Network#_modulesInitialized
         */
        enumerable: true
    }, {
        key: '_modulesInitialized',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },

        /**
         * The settings defined via the constructor, they will be applied once the modules are initialized.
         * @private
         * @member {Network~settingsObject} Network#_pendingSettings
         */
        enumerable: true
    }, {
        key: '_pendingSettings',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },

        /**
         * Expose all the internal classes to the global scope. Only for testing purposes!
         * @private
         * @method Network._exposeInternalClasses
         * @returns {Network}
         */
        enumerable: true
    }], [{
        key: '_exposeInternalClasses',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        value: function _exposeInternalClasses() {
            var global = (0, _utilsHelpers.getGlobalObject)(),
                classes = { EventDispatcher: _EventDispatcher2['default'], HttpModule: _HttpHttpModule2['default'], LatencyModule: _HttpLatencyModule2['default'], BandwidthModule: _HttpBandwidthModule2['default'], Timing: _Timing2['default'] };

            Object.keys(classes).forEach(function (name) {
                global[name] = classes[name];
            });

            return this;
        }
    }, {
        key: 'supportsResourceTiming',

        /**
         * Defines if the current browser supports the Resource Timing API.
         * @public
         * @readonly
         * @member {boolean} Network#supportsResourceTiming
         */
        get: function get() {
            return _Timing2['default'].supportsResourceTiming;
        }

        /**
         * The registered modules.
         * @private
         * @member {Object} Network#_modules
         */
    }], _instanceInitializers);

    function Network() {
        var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Network);

        _defineDecoratedPropertyDescriptor(this, '_modules', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_modulesInitialized', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_pendingSettings', _instanceInitializers);

        this._registerModule('latency', function (settings) {
            return new _HttpLatencyModule2['default'](settings);
        })._registerModule('upload', function (settings) {
            return new _HttpBandwidthModule2['default']('upload', settings);
        })._registerModule('download', function (settings) {
            return new _HttpBandwidthModule2['default']('download', settings);
        });

        this._initModules(this.settings(settings));
    }

    /**
     * Apply a new set of custom settings.
     * @public
     * @method Network#settings
     * @param {Network~settingsObject} settings A set of custom settings.
     * @returns {Network}
     */
    /**
     * Return the current set of settings.
     * @public
     * @method Network#settings^2
     * @returns {Network~settingsObject}
     */

    _createDecoratedClass(Network, [{
        key: 'settings',
        value: function settings() {
            var _this = this;

            var _settings = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var moduleNames = Object.keys(this._modules);

            if ((0, _utilsHelpers.isObject)(_settings)) {
                var _ret = (function () {
                    // Extract the global settings
                    var globalSettings = (0, _utilsHelpers.except)(_settings, moduleNames);

                    // Extract the local settings
                    var localSettings = (0, _utilsHelpers.except)(_settings, Object.keys(globalSettings));

                    // Create new settings with the global ones nested in the local ones
                    _settings = moduleNames.reduce(function (settings, moduleName) {
                        return (0, _utilsHelpers.assign)(settings, _defineProperty({}, moduleName, globalSettings));
                    }, {});

                    // Apply the local settings to the new settings
                    _settings = (0, _utilsHelpers.assign)(_settings, localSettings);

                    // Apply the settings to the modules
                    if (_this._modulesInitialized) {
                        Object.keys(_this._modules).forEach(function (name) {
                            _this._modules[name].settings(_settings[name]);
                        });
                    }

                    // If the modules aren't instanciated, store the settings.
                    else {
                            _this._pendingSettings = _settings;
                        }

                    return {
                        v: _this
                    };
                })();

                if (typeof _ret === 'object') return _ret.v;
            } else {
                return moduleNames.reduce(function (settings, moduleName) {
                    return (0, _utilsHelpers.assign)(settings, _defineProperty({}, moduleName, _this._modules[moduleName].settings()));
                }, {});
            }
        }

        /**
         * Return if a module is currently making a request.
         * @public
         * @method Network#isRequesting
         * @returns {boolean} `true` if a module is requesting, otherwise `false`.
         */
    }, {
        key: 'isRequesting',
        value: function isRequesting() {
            var requesting = false;

            for (var _name in this._modules) {
                if (this._modules.hasOwnProperty(_name)) {
                    requesting = requesting || this._modules[_name].isRequesting();
                }
            }

            return requesting;
        }

        /**
         * Register a new module for the current `Network` instance.
         * @private
         * @method Network#registerModule
         * @param {string} name The name of the module. Will be used to create the property `Network.<name>`.
         * @param {Network~moduleCallback} moduleCallback A callback used to initialize a module with a set of settings.
         * @returns {Network}
         */
    }, {
        key: '_registerModule',
        value: function _registerModule(name, moduleCallback) {
            /**
             * A callback used to initialize a module with a set of settings.
             * @private
             * @callback Network~moduleCallback
             * @param {Object} settings A set of custom settings.
             * @returns {HttpModule} An instanciated subclass of `HttpModule`.
             */
            this._modules[name] = moduleCallback;
            return this;
        }

        /**
         * Initialize all the registered modules with the settings passed to the constructor.
         * @private
         * @method Network#_initModules
         * @returns {Network}
         */
    }, {
        key: '_initModules',
        value: function _initModules() {
            var _this2 = this;

            if (!this._modulesInitialized) {
                // Initialize the modules with their respective settings
                Object.keys(this._modules).forEach(function (name) {
                    _this2._modules[name] = _this2._modules[name](_this2._pendingSettings[name]).on('_newRequest', function () {
                        return !_this2.isRequesting();
                    });

                    _this2[name] = _this2._modules[name];
                });

                this._modulesInitialized = true;
            }

            return this;
        }
    }], null, _instanceInitializers);

    return Network;
})();

exports['default'] = Network;
module.exports = exports['default'];

},{"../utils/decorators":7,"../utils/helpers":8,"./EventDispatcher":1,"./Http/BandwidthModule":2,"./Http/HttpModule":3,"./Http/LatencyModule":4,"./Timing":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer.call(target); Object.defineProperty(target, key, descriptor); }

var _utilsHelpers = require('../utils/helpers');

var _utilsDecorators = require('../utils/decorators');

/**
 * @private
 * @class Timing
 */

var Timing = (function () {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _createDecoratedClass(Timing, [{
        key: 'supportsResourceTiming',

        /**
         * Defines if the current browser supports the Resource Timing API.
         * @public
         * @readonly
         * @member {boolean} Timing#supportsResourceTiming
         */
        get: function get() {
            return Boolean(this._support.resourceTiming);
        }

        /**
         * Defines if the current browser supports some specific Timing APIs.
         * @private
         * @member {Object} Timing#_support
         * @property {boolean} performance `true` if the Performance API is available.
         * @property {boolean} userTiming `true` if the User Timing API is available.
         * @property {boolean} resourceTiming `true` if the Resource Timing API is available.
         */
    }, {
        key: '_support',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },

        /**
         * All the marks created by the `mark` method.
         * @private
         * @member {Object} Timing#_marks
         */
        enumerable: true
    }, {
        key: '_marks',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },

        /**
         * All the measures created by the `measure` method.
         * @private
         * @member {Object} Timing#_measures
         */
        enumerable: true
    }, {
        key: '_measures',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },
        enumerable: true
    }], null, _instanceInitializers);

    function Timing() {
        _classCallCheck(this, Timing);

        _defineDecoratedPropertyDescriptor(this, '_support', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_marks', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_measures', _instanceInitializers);

        var global = (0, _utilsHelpers.getGlobalObject)();

        this._support = {
            performance: !!global.performance,
            userTiming: global.performance && performance.mark,
            resourceTiming: global.performance && typeof performance.getEntriesByType == "function" && performance.timing
        };
    }

    /**
     * Create a new timing mark.
     * @public
     * @method Timing#mark
     * @param {string} label A label associated to the mark.
     * @returns {Timing}
     */

    _createDecoratedClass(Timing, [{
        key: 'mark',
        value: function mark(label) {
            var support = this._support,
                marks = this._marks;

            if (support.userTiming) {
                performance.mark(label);
            }

            if (support.performance) {
                marks[label] = performance.now();
            } else {
                marks[label] = new Date().getTime();
            }

            return this;
        }

        /**
         * Measure the delay between two marks.
         * @public
         * @method Timing#measure
         * @param {string} measureLabel A label associated to the measure.
         * @param {string} markLabelA The label of the first mark.
         * @param {string} markLabelB The label of the second mark.
         * @returns {number} The measured value.
         */
    }, {
        key: 'measure',
        value: function measure(measureLabel, markLabelA, markLabelB) {
            var support = this._support,
                marks = this._marks,
                measures = this._measures;

            if (typeof measures[measureLabel] == 'undefined') {
                var measureWithoutUserTiming = marks[markLabelB] - marks[markLabelA];

                if (support.userTiming) {
                    performance.measure(measureLabel, markLabelA, markLabelB);
                    var entriesByName = performance.getEntriesByName(measureLabel);

                    // The performance API could return no corresponding entries in Firefox so we must use a fallback.
                    // See: https://github.com/nesk/network.js/issues/32#issuecomment-118434305
                    measures[measureLabel] = entriesByName.length ? entriesByName[0].duration : measureWithoutUserTiming;
                } else {
                    measures[measureLabel] = measureWithoutUserTiming;
                }
            }

            return measures[measureLabel];
        }
    }], null, _instanceInitializers);

    return Timing;
})();

exports['default'] = new Timing();
module.exports = exports['default'];

},{"../utils/decorators":7,"../utils/helpers":8}],7:[function(require,module,exports){
/**
 * @callback propertyDecorator
 * @param target
 * @param key
 * @param descriptor
 */

/**
 * Set the enumerability of a property.
 * @private
 * @function enumerable
 * @param {boolean} isEnumerable Whether the property should be enumerable or not.
 * @returns {propertyDecorator}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enumerable = enumerable;

function enumerable(isEnumerable) {
  return function (target, key, descriptor) {
    descriptor.enumerable = isEnumerable;
    return descriptor;
  };
}

},{}],8:[function(require,module,exports){
(function (global){
/**
 * Return the global object.
 * @private
 * @function getGlobalObject
 * @return {Object}
 * @see https://gist.github.com/rauschma/1bff02da66472f555c75
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.getGlobalObject = getGlobalObject;
exports.isObject = isObject;
exports.copy = copy;
exports.assign = assign;
exports.assignStrict = assignStrict;
exports.except = except;
exports.defer = defer;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function getGlobalObject() {
    // Workers don’t have `window`, only `self`.
    if (typeof self !== 'undefined') {
        return self;
    }

    if (typeof global !== 'undefined') {
        return global;
    }

    // Not all environments allow `eval` and `Function`, use only as a last resort.
    return new Function('return this')();
}

/**
 * Determine if the provided value is an object.
 * @private
 * @function isObject
 * @param {*} obj The value to check.
 * @returns {boolean} `true` if the value is an object, otherwise `false`.
 */

function isObject(obj) {
    return obj != undefined && obj != null && typeof obj.valueOf() == 'object';
}

/**
 * Make a deep copy of any value.
 * @private
 * @function copy
 * @param {*} value The value to copy.
 * @returns {*} The copied value.
 */

function copy(value) {
    return JSON.parse(JSON.stringify(value));
}

/**
 * Copy the properties in the source objects over to the destination object.
 * @private
 * @function _assign
 * @param {boolean} strict Given `true`, new properties will not be copied.
 * @param {Object} [target={}] The destination object.
 * @param {...Object} sources The source objects.
 * @returns {Object} The destination object once the properties are copied.
 */
function _assign(strict) {
    var target = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    target = copy(target);

    for (var _len = arguments.length, sources = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        sources[_key - 2] = arguments[_key];
    }

    sources.forEach(function (source) {
        Object.keys(source).forEach(function (key) {
            if (!strict || target.hasOwnProperty(key)) {
                var value = source[key];
                target[key] = isObject(value) ? _assign(strict, target[key], value) : value;
            }
        });
    });

    return target;
}

/**
 * Copy all the properties in the source objects over to the destination object.
 * @private
 * @function assign
 * @param {Object} [target={}] The destination object.
 * @param {...Object} sources The source objects.
 * @returns {Object} The destination object once the properties are copied.
 */

function assign() {
    var target = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    for (var _len2 = arguments.length, sources = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        sources[_key2 - 1] = arguments[_key2];
    }

    return _assign.apply(undefined, [false, target].concat(sources));
}

/**
 * Copy the properties (but no new ones) in the source objects over to the destination object.
 * @private
 * @function assignStrict
 * @param {Object} [target={}] The destination object.
 * @param {...Object} sources The source objects.
 * @returns {Object} The destination object once the properties are copied.
 */

function assignStrict() {
    var target = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    for (var _len3 = arguments.length, sources = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        sources[_key3 - 1] = arguments[_key3];
    }

    return _assign.apply(undefined, [true, target].concat(sources));
}

/**
 * Get a copy of an object without some of its properties.
 * @private
 * @function except
 * @param {Object} obj The original object.
 * @param {string[]} properties The properties to exclude from the copied object.
 * @returns {Object} The copied object without the specified properties.
 */

function except(obj, properties) {
    var objCopy = copy(obj);

    properties.forEach(function (index) {
        return delete objCopy[index];
    });

    return objCopy;
}

/**
 * Defer the execution of a function.
 * @private
 * @function defer
 * @param {Function} func The function to defer.
 * @returns {Defer} The Defer object used to execute the function when needed.
 */

function defer() {
    var func = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

    /**
     * @private
     * @class Defer
     */
    return new ((function () {
        function _class() {
            _classCallCheck(this, _class);

            this.func = func;
        }

        /**
         * Execute the deferred function.
         * @public
         * @method Defer#run
         */

        _createClass(_class, [{
            key: 'run',
            value: function run() {
                if (this.func) this.func();
                delete this.func;
            }
        }]);

        return _class;
    })())();
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[5])(5)
});
//# sourceMappingURL=network.js.map
