(function () {(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//simple representation of the API
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var IVPAIDAdUnit = (function () {
    function IVPAIDAdUnit() {
        _classCallCheck(this, IVPAIDAdUnit);
    }

    _createClass(IVPAIDAdUnit, [{
        key: 'handshakeVersion',

        //all methods below
        //are async methods
        value: function handshakeVersion() {
            var playerVPAIDVersion = arguments[0] === undefined ? '2.0' : arguments[0];
            var callback = arguments[1] === undefined ? undefined : arguments[1];
        }
    }, {
        key: 'initAd',

        //width and height is not in the beginning because we will use the default width/height used in the constructor
        value: function initAd(width, height, viewMode, desiredBitrate) {
            var creativeData = arguments[4] === undefined ? '' : arguments[4];
            var environmentVars = arguments[5] === undefined ? '' : arguments[5];
            var callback = arguments[6] === undefined ? undefined : arguments[6];
        }
    }, {
        key: 'resizeAd',
        value: function resizeAd(width, height, viewMode) {
            var callback = arguments[3] === undefined ? undefined : arguments[3];
        }
    }, {
        key: 'startAd',
        value: function startAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];
        }
    }, {
        key: 'stopAd',
        value: function stopAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];
        }
    }, {
        key: 'pauseAd',
        value: function pauseAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];
        }
    }, {
        key: 'resumeAd',
        value: function resumeAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];
        }
    }, {
        key: 'expandAd',
        value: function expandAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];
        }
    }, {
        key: 'collapseAd',
        value: function collapseAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];
        }
    }, {
        key: 'skipAd',
        value: function skipAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];
        }
    }, {
        key: 'adLinear',

        //properties that will be treat as async methods
        value: function adLinear(callback) {}
    }, {
        key: 'adWidth',
        value: function adWidth(callback) {}
    }, {
        key: 'adHeight',
        value: function adHeight(callback) {}
    }, {
        key: 'adExpanded',
        value: function adExpanded(callback) {}
    }, {
        key: 'adSkippableState',
        value: function adSkippableState(callback) {}
    }, {
        key: 'adRemainingTime',
        value: function adRemainingTime(callback) {}
    }, {
        key: 'adDuration',
        value: function adDuration(callback) {}
    }, {
        key: 'setAdVolume',
        value: function setAdVolume(soundVolume) {
            var callback = arguments[1] === undefined ? undefined : arguments[1];
        }
    }, {
        key: 'getAdVolume',
        value: function getAdVolume(callback) {}
    }, {
        key: 'adCompanions',
        value: function adCompanions(callback) {}
    }, {
        key: 'adIcons',
        value: function adIcons(callback) {}
    }]);

    return IVPAIDAdUnit;
})();

exports.IVPAIDAdUnit = IVPAIDAdUnit;

Object.defineProperty(IVPAIDAdUnit, 'EVENTS', {
    writable: false,
    configurable: false,
    value: ['AdLoaded', 'AdStarted', 'AdStopped', 'AdSkipped', 'AdSkippableStateChange', 'AdSizeChange', 'AdLinearChange', 'AdDurationChange', 'AdExpandedChange', 'AdRemainingTimeChange', // [Deprecated in 2.0] but will be still fired for backwards compatibility
    'AdVolumeChange', 'AdImpression', 'AdVideoStart', 'AdVideoFirstQuartile', 'AdVideoMidpoint', 'AdVideoThirdQuartile', 'AdVideoComplete', 'AdClickThru', 'AdInteraction', 'AdUserAcceptInvitation', 'AdUserMinimize', 'AdUserClose', 'AdPaused', 'AdPlaying', 'AdLog', 'AdError']
});

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x15, _x16, _x17) { var _again = true; _function: while (_again) { var object = _x15, property = _x16, receiver = _x17; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x15 = parent; _x16 = property; _x17 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var IVPAIDAdUnit = require('./IVPAIDAdUnit').IVPAIDAdUnit;
var ALL_VPAID_METHODS = Object.getOwnPropertyNames(IVPAIDAdUnit.prototype).filter(function (property) {
    return ['constructor'].indexOf(property) === -1;
});

var VPAIDAdUnit = (function (_IVPAIDAdUnit) {
    function VPAIDAdUnit(flash) {
        _classCallCheck(this, VPAIDAdUnit);

        _get(Object.getPrototypeOf(VPAIDAdUnit.prototype), 'constructor', this).call(this);
        this._destroyed = false;
        this._flash = flash;
    }

    _inherits(VPAIDAdUnit, _IVPAIDAdUnit);

    _createClass(VPAIDAdUnit, [{
        key: '_destroy',
        value: function _destroy() {
            var _this = this;

            this._destroyed = true;
            ALL_VPAID_METHODS.forEach(function (methodName) {
                _this._flash.removeCallbackByMethodName(methodName);
            });
            IVPAIDAdUnit.EVENTS.forEach(function (event) {
                _this._flash.offEvent(event);
            });

            this._flash = null;
        }
    }, {
        key: 'on',
        value: function on(eventName, callback) {
            this._flash.on(eventName, callback);
        }
    }, {
        key: 'off',
        value: function off(eventName, callback) {
            this._flash.off(eventName, callback);
        }
    }, {
        key: 'handshakeVersion',

        //VPAID interface
        value: function handshakeVersion() {
            var playerVPAIDVersion = arguments[0] === undefined ? '2.0' : arguments[0];
            var callback = arguments[1] === undefined ? undefined : arguments[1];

            this._flash.callFlashMethod('handshakeVersion', [playerVPAIDVersion], callback);
        }
    }, {
        key: 'initAd',
        value: function initAd(width, height, viewMode, desiredBitrate) {
            var creativeData = arguments[4] === undefined ? '' : arguments[4];
            var environmentVars = arguments[5] === undefined ? '' : arguments[5];
            var callback = arguments[6] === undefined ? undefined : arguments[6];

            //resize element that has the flash object
            this._flash.setSize(width, height);

            this._flash.callFlashMethod('initAd', [this._flash.getWidth(), this._flash.getHeight(), viewMode, desiredBitrate, creativeData, environmentVars], callback);
        }
    }, {
        key: 'resizeAd',
        value: function resizeAd(width, height, viewMode) {
            var callback = arguments[3] === undefined ? undefined : arguments[3];

            //resize element that has the flash object
            this._flash.setSize(width, height);

            //resize ad inside the flash
            this._flash.callFlashMethod('resizeAd', [this._flash.getWidth(), this._flash.getHeight(), viewMode], callback);
        }
    }, {
        key: 'startAd',
        value: function startAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];

            this._flash.callFlashMethod('startAd', [], callback);
        }
    }, {
        key: 'stopAd',
        value: function stopAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];

            this._flash.callFlashMethod('stopAd', [], callback);
        }
    }, {
        key: 'pauseAd',
        value: function pauseAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];

            this._flash.callFlashMethod('pauseAd', [], callback);
        }
    }, {
        key: 'resumeAd',
        value: function resumeAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];

            this._flash.callFlashMethod('resumeAd', [], callback);
        }
    }, {
        key: 'expandAd',
        value: function expandAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];

            this._flash.callFlashMethod('expandAd', [], callback);
        }
    }, {
        key: 'collapseAd',
        value: function collapseAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];

            this._flash.callFlashMethod('collapseAd', [], callback);
        }
    }, {
        key: 'skipAd',
        value: function skipAd() {
            var callback = arguments[0] === undefined ? undefined : arguments[0];

            this._flash.callFlashMethod('skipAd', [], callback);
        }
    }, {
        key: 'adLinear',

        //properties that will be treat as async methods
        value: function adLinear(callback) {
            this._flash.callFlashMethod('adLinear', [], callback);
        }
    }, {
        key: 'adWidth',
        value: function adWidth(callback) {
            this._flash.callFlashMethod('adWidth', [], callback);
        }
    }, {
        key: 'adHeight',
        value: function adHeight(callback) {
            this._flash.callFlashMethod('adHeight', [], callback);
        }
    }, {
        key: 'adExpanded',
        value: function adExpanded(callback) {
            this._flash.callFlashMethod('adExpanded', [], callback);
        }
    }, {
        key: 'adSkippableState',
        value: function adSkippableState(callback) {
            this._flash.callFlashMethod('adSkippableState', [], callback);
        }
    }, {
        key: 'adRemainingTime',
        value: function adRemainingTime(callback) {
            this._flash.callFlashMethod('adRemainingTime', [], callback);
        }
    }, {
        key: 'adDuration',
        value: function adDuration(callback) {
            this._flash.callFlashMethod('adDuration', [], callback);
        }
    }, {
        key: 'setAdVolume',
        value: function setAdVolume(volume) {
            var callback = arguments[1] === undefined ? undefined : arguments[1];

            this._flash.callFlashMethod('setAdVolume', [volume], callback);
        }
    }, {
        key: 'getAdVolume',
        value: function getAdVolume(callback) {
            this._flash.callFlashMethod('getAdVolume', [], callback);
        }
    }, {
        key: 'adCompanions',
        value: function adCompanions(callback) {
            this._flash.callFlashMethod('adCompanions', [], callback);
        }
    }, {
        key: 'adIcons',
        value: function adIcons(callback) {
            this._flash.callFlashMethod('adIcons', [], callback);
        }
    }]);

    return VPAIDAdUnit;
})(IVPAIDAdUnit);

exports.VPAIDAdUnit = VPAIDAdUnit;

},{"./IVPAIDAdUnit":1}],3:[function(require,module,exports){
//if this code already run once don't do anything
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var VPAIDFlashToJS = (function () {
    if (window.VPAIDFlashToJS) return;

    var JSFlashBridge = require('./jsFlashBridge').JSFlashBridge;
    var VPAIDAdUnit = require('./VPAIDAdUnit').VPAIDAdUnit;

    var noop = require('./utils').noop;
    var callbackTimeout = require('./utils').callbackTimeout;
    var isPositiveInt = require('./utils').isPositiveInt;
    var createElementWithID = require('./utils').createElementWithID;
    var uniqueVPAID = require('./utils').unique('vpaid');

    var ERROR = 'error';
    var FLASH_VERSION = '10.1.0';

    var VPAIDFlashToJS = (function () {
        function VPAIDFlashToJS(vpaidParentEl, callback) {
            var swfConfig = arguments[2] === undefined ? { data: 'VPAIDFlash.swf', width: 800, height: 400 } : arguments[2];
            var params = arguments[3] === undefined ? { wmode: 'transparent', salign: 'tl', align: 'left', allowScriptAccess: 'always', scale: 'noScale', allowFullScreen: 'true', quality: 'high' } : arguments[3];
            var vpaidOptions = arguments[4] === undefined ? { debug: false, timeout: 10000 } : arguments[4];

            _classCallCheck(this, VPAIDFlashToJS);

            if (!swfobject) {
                return onError({ msg: 'no swfobject in global scope. check: https://github.com/swfobject/swfobject or https://code.google.com/p/swfobject/' });
            }

            this._vpaidParentEl = vpaidParentEl;
            this._flashID = uniqueVPAID();
            this._destroyed = false;

            //validate the height
            swfConfig.width = isPositiveInt(swfConfig.width, 800);
            swfConfig.height = isPositiveInt(swfConfig.height, 400);

            createElementWithID(vpaidParentEl, this._flashID);

            params.movie = swfConfig.data;
            params.FlashVars = 'flashid=' + this._flashID + '&handler=' + JSFlashBridge.VPAID_FLASH_HANDLER + '&debug=' + vpaidOptions.debug + '&salign=' + params.salign;

            if (!VPAIDFlashToJS.isSupported()) {
                return onError({ msg: 'user don\'t support flash or doesn\'t have the minimum required version of flash', version: FLASH_VERSION });
            }

            this.el = swfobject.createSWF(swfConfig, params, this._flashID);

            if (!this.el) {
                return onError({ msg: 'swfobject failed to create object in element' });
            }

            this._flash = new JSFlashBridge(this.el, swfConfig.data, this._flashID, swfConfig.width, swfConfig.height, callbackTimeout(vpaidOptions.timeout, callback, function () {
                callback({ msg: 'vpaid flash load timeout', timeout: vpaidOptions.timeout });
            }));

            function onError(error) {
                setTimeout(function () {
                    callback(error);
                }, 0);
                return this;
            }
        }

        _createClass(VPAIDFlashToJS, [{
            key: 'destroy',
            value: function destroy() {
                this._destroyAdUnit();
                if (this._flash) {
                    this._flash.destroy();
                    this._flash = null;
                }
                this.el = null;
                this._destroyed = true;
            }
        }, {
            key: 'isDestroyed',
            value: function isDestroyed() {
                return this._destroyed;
            }
        }, {
            key: '_destroyAdUnit',
            value: function _destroyAdUnit() {
                if (this._adUnitLoad) {
                    this._adUnitLoad = null;
                    this._flash.removeCallback(this._adUnitLoad);
                }

                if (this._adUnit) {
                    this._adUnit._destroy();
                    this._adUnit = null;
                }
            }
        }, {
            key: 'loadAdUnit',
            value: function loadAdUnit(adURL, callback) {
                var _this = this;

                if (this._destroyed) {
                    throw new error('VPAIDFlashToJS is destroyed!');
                }
                if (this._adUnit) {
                    throw new error('AdUnit still exists');
                }

                this._adUnitLoad = function (err, message) {
                    if (!err) {
                        _this._adUnit = new VPAIDAdUnit(_this._flash);
                    }
                    _this._adUnitLoad = null;
                    callback(err, _this._adUnit);
                };

                this._flash.callFlashMethod('loadAdUnit', [adURL], this._adUnitLoad);
            }
        }, {
            key: 'unloadAdUnit',
            value: function unloadAdUnit() {
                var callback = arguments[0] === undefined ? undefined : arguments[0];

                if (this._destroyed) {
                    throw new error('VPAIDFlashToJS is destroyed!');
                }

                this._destroyAdUnit();
                this._flash.callFlashMethod('unloadAdUnit', [], callback);
            }
        }, {
            key: 'getFlashID',
            value: function getFlashID() {
                return this._flash.getFlashID();
            }
        }, {
            key: 'getFlashURL',
            value: function getFlashURL() {
                return this._flash.getFlashURL();
            }
        }]);

        return VPAIDFlashToJS;
    })();

    Object.defineProperty(VPAIDFlashToJS, 'isSupported', {
        writable: false,
        configurable: false,
        value: function value() {
            return swfobject.hasFlashPlayerVersion(FLASH_VERSION);
        }
    });

    window.VPAIDFlashToJS = VPAIDFlashToJS;

    return VPAIDFlashToJS;
})();

module.exports = VPAIDFlashToJS;

},{"./VPAIDAdUnit":2,"./jsFlashBridge":4,"./utils":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var unique = require('./utils').unique;
var isPositiveInt = require('./utils').isPositiveInt;
var stringEndsWith = require('./utils').stringEndsWith;
var SingleValueRegistry = require('./registry').SingleValueRegistry;
var MultipleValuesRegistry = require('./registry').MultipleValuesRegistry;
var registry = require('./jsFlashBridgeRegistry');
var VPAID_FLASH_HANDLER = 'vpaid_video_flash_handler';
var ERROR = 'error';

var JSFlashBridge = (function () {
    function JSFlashBridge(el, flashURL, flashID, width, height, loadHandShake) {
        _classCallCheck(this, JSFlashBridge);

        this._el = el;
        this._flashID = flashID;
        this._flashURL = flashURL;
        this._width = width;
        this._height = height;
        this._handlers = new MultipleValuesRegistry();
        this._callbacks = new SingleValueRegistry();
        this._uniqueMethodIdentifier = unique(this._flashID);
        this._loadHandShake = loadHandShake;

        registry.addInstance(this._flashID, this);
    }

    _createClass(JSFlashBridge, [{
        key: 'on',
        value: function on(eventName, callback) {
            this._handlers.add(eventName, callback);
        }
    }, {
        key: 'off',
        value: function off(eventName, callback) {
            return this._handlers.remove(eventName, callback);
        }
    }, {
        key: 'offEvent',
        value: function offEvent(eventName) {
            return this._handlers.removeByKey(eventName);
        }
    }, {
        key: 'offAll',
        value: function offAll() {
            return this._handlers.removeAll();
        }
    }, {
        key: 'callFlashMethod',
        value: function callFlashMethod(methodName) {
            var args = arguments[1] === undefined ? [] : arguments[1];
            var callback = arguments[2] === undefined ? undefined : arguments[2];

            var callbackID = '';
            // if no callback, some methods the return is void so they don't need callback
            if (callback) {
                callbackID = '' + this._uniqueMethodIdentifier() + '_' + methodName;
                this._callbacks.add(callbackID, callback);
            }

            try {
                //methods are created by ExternalInterface.addCallback in as3 code, if for some reason it failed
                //this code will throw an error
                this._el[methodName]([callbackID].concat(args));
            } catch (e) {
                if (callback) {
                    this._callbacks.remove(callbackID);
                    setTimeout(function () {
                        callback(e);
                    }, 0);
                } else {

                    //if there isn't any callback to return error use error event handler
                    this._trigger(ERROR, [e]);
                }
            }
        }
    }, {
        key: 'removeCallback',
        value: function removeCallback(callback) {
            return this._callbacks.removeByValue(callback);
        }
    }, {
        key: 'removeCallbackByMethodName',
        value: function removeCallbackByMethodName(suffix) {
            var _this = this;

            this._callbacks.filterKeys(function (key) {
                return stringEndsWith(key, suffix);
            }).forEach(function (key) {
                _this._callbacks.remove(key);
            });
        }
    }, {
        key: 'removeAllCallbacks',
        value: function removeAllCallbacks() {
            return this._callbacks.removeAll();
        }
    }, {
        key: '_trigger',
        value: function _trigger(eventName, err, result) {
            //TODO: check if forEach and isArray is added to the browser with babeljs
            this._handlers.get(eventName).forEach(function (callback) {
                setTimeout(function () {
                    callback(err, result);
                }, 0);
            });
        }
    }, {
        key: '_callCallback',
        value: function _callCallback(methodName, callbackID, err, result) {

            var callback = this._callbacks.get(callbackID);

            //not all methods callback's are mandatory
            //but if there exist an error, fire the error event
            if (!callback) {
                if (err && callbackID === '') {
                    this.trigger(ERROR, err, result);
                }
                return;
            }

            setTimeout(function () {
                callback(err, result);
            }, 0);

            this._callbacks.remove(callbackID);
        }
    }, {
        key: 'getSize',

        //methods like properties specific to this implementation of VPAID
        value: function getSize() {
            return { width: this._width, height: this._height };
        }
    }, {
        key: 'setSize',
        value: function setSize(newWidth, newHeight) {
            this._width = isPositiveInt(newWidth, this._width);
            this._height = isPositiveInt(newHeight, this._height);
            this._el.setAttribute('width', this._width);
            this._el.setAttribute('height', this._height);
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this._width;
        }
    }, {
        key: 'setWidth',
        value: function setWidth(newWidth) {
            this.setSize(newWidth, this._height);
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this._height;
        }
    }, {
        key: 'setHeight',
        value: function setHeight(newHeight) {
            this.setSize(this._width, newHeight);
        }
    }, {
        key: 'getFlashID',
        value: function getFlashID() {
            return this._flashID;
        }
    }, {
        key: 'getFlashURL',
        value: function getFlashURL() {
            return this._flashURL;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.offAll();
            this.removeAllCallbacks();
            registry.removeInstanceByID(this._flashID);
            if (this._el.parentElement) {
                this._el.parentElement.removeChild(this._el);
            }
        }
    }]);

    return JSFlashBridge;
})();

exports.JSFlashBridge = JSFlashBridge;

Object.defineProperty(JSFlashBridge, 'VPAID_FLASH_HANDLER', {
    writable: false,
    configurable: false,
    value: VPAID_FLASH_HANDLER
});

window[VPAID_FLASH_HANDLER] = function (flashID, type, event, callID, error, data) {
    var instance = registry.getInstanceByID(flashID);
    if (!instance) return;
    if (event === 'handShake') {
        instance._loadHandShake(error, data);
    } else {
        if (type !== 'event') {
            instance._callCallback(event, callID, error, data);
        } else {
            instance._trigger(event, error, data);
        }
    }
};

},{"./jsFlashBridgeRegistry":5,"./registry":6,"./utils":7}],5:[function(require,module,exports){
'use strict';

var SingleValueRegistry = require('./registry').SingleValueRegistry;
var instances = new SingleValueRegistry();

var JSFlashBridgeRegistry = {};
Object.defineProperty(JSFlashBridgeRegistry, 'addInstance', {
    writable: false,
    configurable: false,
    value: function value(id, instance) {
        instances.add(id, instance);
    }
});

Object.defineProperty(JSFlashBridgeRegistry, 'getInstanceByID', {
    writable: false,
    configurable: false,
    value: function value(id) {
        return instances.get(id);
    }
});

Object.defineProperty(JSFlashBridgeRegistry, 'removeInstanceByID', {
    writable: false,
    configurable: false,
    value: function value(id) {
        return instances.remove(id);
    }
});

module.exports = JSFlashBridgeRegistry;

},{"./registry":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultipleValuesRegistry = (function () {
    function MultipleValuesRegistry() {
        _classCallCheck(this, MultipleValuesRegistry);

        this._registries = {};
    }

    _createClass(MultipleValuesRegistry, [{
        key: "add",
        value: function add(id, value) {
            if (!this._registries[id]) {
                this._registries[id] = [];
            }
            if (this._registries[id].indexOf(value) === -1) {
                this._registries[id].push(value);
            }
        }
    }, {
        key: "get",
        value: function get(id) {
            return this._registries[id] || [];
        }
    }, {
        key: "filterKeys",
        value: function filterKeys(handler) {
            return Object.keys(this._registries).filter(handler);
        }
    }, {
        key: "findByValue",
        value: function findByValue(value) {
            var _this = this;

            //TODO: check if keys and find is added to the browser with babeljs
            var keys = Object.keys(this._registries).filter(function (key) {
                return _this._registries[key].indexOf(value) !== -1;
            });

            return keys;
        }
    }, {
        key: "remove",
        value: function remove(key, value) {
            if (!this._registries[key]) {
                return;
            }

            var index = this._registries[key].indexOf(value);

            if (index < 0) {
                return;
            }
            return this._registries[key].splice(index, 1);
        }
    }, {
        key: "removeByKey",
        value: function removeByKey(id) {
            var old = this._registries[id];
            delete this._registries[id];
            return old;
        }
    }, {
        key: "removeByValue",
        value: function removeByValue(value) {
            var _this2 = this;

            var keys = this.findByValue(value);
            return keys.map(function (key) {
                return _this2.remove(key, value);
            });
        }
    }, {
        key: "removeAll",
        value: function removeAll() {
            var old = this._registries;
            this._registries = {};
            return old;
        }
    }, {
        key: "size",
        value: function size() {
            return Object.keys(this._registries).length;
        }
    }]);

    return MultipleValuesRegistry;
})();

exports.MultipleValuesRegistry = MultipleValuesRegistry;

var SingleValueRegistry = (function () {
    function SingleValueRegistry() {
        _classCallCheck(this, SingleValueRegistry);

        this._registries = {};
    }

    _createClass(SingleValueRegistry, [{
        key: "add",
        value: function add(id, value) {
            this._registries[id] = value;
        }
    }, {
        key: "get",
        value: function get(id) {
            return this._registries[id];
        }
    }, {
        key: "filterKeys",
        value: function filterKeys(handler) {
            return Object.keys(this._registries).filter(handler);
        }
    }, {
        key: "findByValue",
        value: function findByValue(value) {
            var _this3 = this;

            //TODO: check if keys is added to the browser with babeljs
            var keys = Object.keys(this._registries).filter(function (key) {
                return _this3._registries[key] === value;
            });

            return keys;
        }
    }, {
        key: "remove",
        value: function remove(id) {
            var old = this._registries[id];
            delete this._registries[id];
            return old;
        }
    }, {
        key: "removeByValue",
        value: function removeByValue(value) {
            var _this4 = this;

            var keys = this.findByValue(value);
            return keys.map(function (key) {
                return _this4.remove(key);
            });
        }
    }, {
        key: "removeAll",
        value: function removeAll() {
            var old = this._registries;
            this._registries = {};
            return old;
        }
    }, {
        key: "size",
        value: function size() {
            return Object.keys(this._registries).length;
        }
    }]);

    return SingleValueRegistry;
})();

exports.SingleValueRegistry = SingleValueRegistry;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.unique = unique;
exports.noop = noop;
exports.callbackTimeout = callbackTimeout;
exports.createElementWithID = createElementWithID;
exports.isPositiveInt = isPositiveInt;
exports.stringEndsWith = stringEndsWith;

function unique(prefix) {
    var count = -1;
    return function (f) {
        return '' + prefix + '_' + ++count;
    };
}

function noop() {}

function callbackTimeout(timer, onSuccess, onTimeout) {

    var timeout = setTimeout(function () {

        onSuccess = noop;
        onTimeout();
    }, timer);

    return function () {
        clearTimeout(timeout);
        onSuccess.apply(this, arguments);
    };
}

function createElementWithID(parent, id) {
    var nEl = document.createElement('div');
    nEl.id = id;
    parent.innerHTML = '';
    parent.appendChild(nEl);
    return nEl;
}

function isPositiveInt(newVal, oldVal) {
    return !isNaN(parseFloat(newVal)) && isFinite(newVal) && newVal > 0 ? newVal : oldVal;
}

var endsWith = (function () {
    if (String.prototype.endsWith) return String.prototype.endsWith;
    return function endsWith(searchString, position) {
        var subjectString = this.toString();
        if (position === undefined || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
})();

function stringEndsWith(string, search) {
    return endsWith.call(string, search);
}

},{}]},{},[3])


//# sourceMappingURL=VPAIDFlashToJS.js.map
;
/**
 There is a bug on android 4.2 ont the way it parses string
 The code bellow fixes the problem if there is a problem
 */
(function () {
 var parseNum;
 if(parseInt('09') !== 9) {
  parseNum = window.parseInt;
  window.parseInt = function(str) {
   if(typeof str === 'string' && !/^(\s+)?0+(\s+)?$/.test(str)){
    //We remove the 0 from the left of the number
    return parseNum(str.replace(/^0+/, ''));
   }

   return parseNum(str);
  };
 }
})();
;
/*! videojs-contrib-ads - v2.1.0 - 2015-06-11
* Copyright (c) 2015 Brightcove; Licensed  */
(function(window, document, vjs, undefined) {
"use strict";

var

  /**
   * Copies properties from one or more objects onto an original.
   */
  extend = function(obj /*, arg1, arg2, ... */) {
    var arg, i, k;
    for (i=1; i<arguments.length; i++) {
      arg = arguments[i];
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          obj[k] = arg[k];
        }
      }
    }
    return obj;
  },

  /**
   * Add a handler for multiple listeners to an object that supports addEventListener() or on().
   *
   * @param {object} obj The object to which the handler will be assigned.
   * @param {mixed} events A string, array of strings, or hash of string/callback pairs.
   * @param {function} callback Invoked when specified events occur, if events param is not a hash.
   *
   * @return {object} obj The object passed in.
   */
  on = function(obj, events, handler) {

    var

      type = Object.prototype.toString.call(events),

      register = function(obj, event, handler) {
        if (obj.addEventListener) {
          obj.addEventListener(event, handler);
        } else if (obj.on) {
          obj.on(event, handler);
        } else if (obj.attachEvent) {
          obj.attachEvent('on' + event, handler);
        } else {
          throw new Error('object has no mechanism for adding event listeners');
        }
      },

      i,
      ii;

    switch (type) {
      case '[object String]':
        register(obj, events, handler);
        break;
      case '[object Array]':
        for (i = 0, ii = events.length; i<ii; i++) {
          register(obj, events[i], handler);
        }
        break;
      case '[object Object]':
        for (i in events) {
          if (events.hasOwnProperty(i)) {
            register(obj, i, events[i]);
          }
        }
        break;
      default:
        throw new Error('Unrecognized events parameter type: ' + type);
    }

    return obj;

  },

  /**
   * Runs the callback at the next available opportunity.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/window.setImmediate
   */
  setImmediate = function(callback) {
    return (
      window.setImmediate ||
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.setTimeout
    )(callback, 0);
  },

  /**
   * Clears a callback previously registered with `setImmediate`.
   * @param {id} id The identifier of the callback to abort
   */
  clearImmediate = function(id) {
    return (window.clearImmediate ||
            window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.clearTimeout)(id);
  },

  /**
   * If ads are not playing, pauses the player at the next available
   * opportunity. Has no effect if ads have started. This function is necessary
   * because pausing a video element while processing a `play` event on iOS can
   * cause the video element to continuously toggle between playing and paused
   * states.
   *
   * @param {object} player The video player
   */
  cancelContentPlay = function(player) {
    if (player.ads.cancelPlayTimeout) {
      // another cancellation is already in flight, so do nothing
      return;
    }
    player.ads.cancelPlayTimeout = setImmediate(function() {
      // deregister the cancel timeout so subsequent cancels are scheduled
      player.ads.cancelPlayTimeout = null;

      // pause playback so ads can be handled.
      if (!player.paused()) {
        player.pause();
      }

      // add a contentplayback handler to resume playback when ads finish.
      player.one('contentplayback', function() {
        if (player.paused()) {
          player.play();
        }
      });
    });
  },

  /**
   * Returns an object that captures the portions of player state relevant to
   * video playback. The result of this function can be passed to
   * restorePlayerSnapshot with a player to return the player to the state it
   * was in when this function was invoked.
   * @param {object} player The videojs player object
   */
  getPlayerSnapshot = function(player) {
    var
      tech = player.el().querySelector('.vjs-tech'),
      tracks = player.remoteTextTracks ? player.remoteTextTracks() : [],
      track,
      i,
      suppressedTracks = [],
      snapshot = {
        ended: player.ended(),
        src: player.currentSrc(),
        currentTime: player.currentTime(),
        type: player.currentType()
      };

    if (tech) {
      snapshot.nativePoster = tech.poster;
      snapshot.style = tech.getAttribute('style');
    }

    i = tracks.length;
    while (i--) {
      track = tracks[i];
      suppressedTracks.push({
        track: track,
        mode: track.mode
      });
      track.mode = 'disabled';
    }
    snapshot.suppressedTracks = suppressedTracks;

    return snapshot;
  },

  removeClass = function(element, className) {
    var
      classes = element.className.split(/\s+/),
      i = classes.length,
      newClasses = [];
    while (i--) {
      if (classes[i] !== className) {
        newClasses.push(classes[i]);
      }
    }
    element.className = newClasses.join(' ');
  },

  /**
   * Attempts to modify the specified player so that its state is equivalent to
   * the state of the snapshot.
   * @param {object} snapshot - the player state to apply
   */
  restorePlayerSnapshot = function(player, snapshot) {
    var
      // the playback tech
      tech = player.el().querySelector('.vjs-tech'),

      // the number of remaining attempts to restore the snapshot
      attempts = 20,

      suppressedTracks = snapshot.suppressedTracks,
      trackSnapshot,
      restoreTracks =  function() {
        var i = suppressedTracks.length;
        while (i--) {
          trackSnapshot = suppressedTracks[i];
          trackSnapshot.track.mode = trackSnapshot.mode;
        }
      },

      // finish restoring the playback state
      resume = function() {
        var
          ended = false,
          updateEnded = function() {
            ended = true;
          };
        player.currentTime(snapshot.currentTime);

        // Resume playback if this wasn't a postroll
        if (!snapshot.ended) {
          player.play();
        } else {
          // On iOS 8.1, the "ended" event will not fire if you seek
          // directly to the end of a video. To make that behavior
          // consistent with the standard, fire a synthetic event if
          // "ended" does not fire within 250ms. Note that the ended
          // event should occur whether the browser actually has data
          // available for that position
          // (https://html.spec.whatwg.org/multipage/embedded-content.html#seeking),
          // so it should not be necessary to wait for the seek to
          // indicate completion.
          window.setTimeout(function() {
            if (!ended) {
              player.play();
            }
            player.off('ended', updateEnded);
          }, 250);
          player.on('ended', updateEnded);
        }
      },

      // determine if the video element has loaded enough of the snapshot source
      // to be ready to apply the rest of the state
      tryToResume = function() {
        if (tech.readyState > 1) {
          // some browsers and media aren't "seekable".
          // readyState greater than 1 allows for seeking without exceptions
          return resume();
        }

        if (tech.seekable === undefined) {
          // if the tech doesn't expose the seekable time ranges, try to
          // resume playback immediately
          return resume();
        }

        if (tech.seekable.length > 0) {
          // if some period of the video is seekable, resume playback
          return resume();
        }

        // delay a bit and then check again unless we're out of attempts
        if (attempts--) {
          setTimeout(tryToResume, 50);
        } else {
          (function() {
            try {
              resume();
            } catch(e) {
              videojs.log.warn('Failed to resume the content after an advertisement', e);
            }
          })();
        }
      },

      // whether the video element has been modified since the
      // snapshot was taken
      srcChanged;

    if (snapshot.nativePoster) {
      tech.poster = snapshot.nativePoster;
    }

    if ('style' in snapshot) {
      // overwrite all css style properties to restore state precisely
      tech.setAttribute('style', snapshot.style || '');
    }

    // Determine whether the player needs to be restored to its state
    // before ad playback began. With a custom ad display or burned-in
    // ads, the content player state hasn't been modified and so no
    // restoration is required

    if (player.src()) {
      // the player was in src attribute mode before the ad and the
      // src attribute has not been modified, no restoration is required
      // to resume playback
      srcChanged = player.src() !== snapshot.src;
    } else {
      // the player was configured through source element children
      // and the currentSrc hasn't changed, no restoration is required
      // to resume playback
      srcChanged = player.currentSrc() !== snapshot.src;
    }

    if (srcChanged) {
      // on ios7, fiddling with textTracks too early will cause safari to crash
      player.one('contentloadedmetadata', restoreTracks);

      // if the src changed for ad playback, reset it
      player.src({ src: snapshot.src, type: snapshot.type });
      // safari requires a call to `load` to pick up a changed source
      player.load();
      // and then resume from the snapshots time once the original src has loaded
      player.one('contentcanplay', tryToResume);
    } else if (!player.ended() || !snapshot.ended) {
      // if we didn't change the src, just restore the tracks
      restoreTracks();

      // the src didn't change and this wasn't a postroll
      // just resume playback at the current time.
      player.play();
    }
  },

  /**
   * Remove the poster attribute from the video element tech, if present. When
   * reusing a video element for multiple videos, the poster image will briefly
   * reappear while the new source loads. Removing the attribute ahead of time
   * prevents the poster from showing up between videos.
   * @param {object} player The videojs player object
   */
  removeNativePoster = function(player) {
    var tech = player.el().querySelector('.vjs-tech');
    if (tech) {
      tech.removeAttribute('poster');
    }
  },

  // ---------------------------------------------------------------------------
  // Ad Framework
  // ---------------------------------------------------------------------------

  // default framework settings
  defaults = {
    // maximum amount of time in ms to wait to receive `adsready` from the ad
    // implementation after play has been requested. Ad implementations are
    // expected to load any dynamic libraries and make any requests to determine
    // ad policies for a video during this time.
    timeout: 5000,

    // maximum amount of time in ms to wait for the ad implementation to start
    // linear ad mode after `readyforpreroll` has fired. This is in addition to
    // the standard timeout.
    prerollTimeout: 100,

    // maximum amount of time in ms to wait for the ad implementation to start
    // linear ad mode after `contentended` has fired.
    postrollTimeout: 100,

    // when truthy, instructs the plugin to output additional information about
    // plugin state to the video.js log. On most devices, the video.js log is
    // the same as the developer console.
    debug: false
  },

  adFramework = function(options) {
    var
      player = this,

      // merge options and defaults
      settings = extend({}, defaults, options || {}),

      fsmHandler;

    // prefix all video element events during ad playback
    // if the video element emits ad-related events directly,
    // plugins that aren't ad-aware will break. prefixing allows
    // plugins that wish to handle ad events to do so while
    // avoiding the complexity for common usage
    (function() {
      var
        videoEvents = videojs.Html5.Events,
        i = videoEvents.length,
        returnTrue = function() { return true; },
        triggerEvent = function(type, event) {
          // pretend we called stopImmediatePropagation because we want the native
          // element events to continue propagating
          event.isImmediatePropagationStopped = returnTrue;
          event.cancelBubble = true;
          event.isPropagationStopped = returnTrue;
          player.trigger({
            type: type + event.type,
            state: player.ads.state,
            originalEvent: event
          });
        },
        redispatch = function(event) {
          //TODO: the if bellow was added while waiting for the PR https://github.com/videojs/videojs-contrib-ads/issues/93
          if(event.type === 'play'){
            player.hasStarted(true);
          }

          if (player.ads.state === 'ad-playback') {
            triggerEvent('ad', event);
          } else if (player.ads.state === 'content-playback' && event.type === 'ended') {
            triggerEvent('content', event);

          } else if (player.ads.state === 'content-resuming') {
            if (player.ads.snapshot) {
              // the video element was recycled for ad playback
              if (player.currentSrc() !== player.ads.snapshot.src) {
                if (event.type === 'loadstart') {
                  return;
                }
                return triggerEvent('content', event);

              // we ended playing postrolls and the video itself
              // the content src is back in place
              } else if (player.ads.snapshot.ended) {
                if ((event.type === 'pause' ||
                    event.type === 'ended')) {
                  // after loading a video, the natural state is to not be started
                  // in this case, it actually has, so, we do it manually
                  player.addClass('vjs-has-started');
                  // let `pause` and `ended` events through, naturally
                  return;
                }
                // prefix all other events in content-resuming with `content`
                return triggerEvent('content', event);
              }
            }
            if (event.type !== 'playing') {
              triggerEvent('content', event);
            }
          }
        };

      while (i--) {
        player.on(videoEvents[i], redispatch);
      }
      return redispatch;
    })();

    // We now auto-play when an ad gets loaded if we're playing ads in the same video element as the content.
    // The problem is that in IE11, we cannot play in addurationchange but in iOS8, we cannot play from adcanplay.
    // This will allow ad-integrations from needing to do this themselves.
    player.on(['addurationchange', 'adcanplay'], function() {
      var snapshot = player.ads.snapshot;
      if (player.currentSrc() === snapshot.src) {
        return;  // do nothing
      }

      player.play();
    });

    // replace the ad initializer with the ad namespace
    player.ads = {
      state: 'content-set',

      startLinearAdMode: function() {
        player.trigger('adstart');
      },

      endLinearAdMode: function() {
        player.trigger('adend');
      }
    };

    fsmHandler = function(event) {
      // Ad Playback State Machine
      var
        fsm = {
          'content-set': {
            events: {
              'adscanceled': function() {
                this.state = 'content-playback';
              },
              'adsready': function() {
                this.state = 'ads-ready';
              },
              'play': function() {
                this.state = 'ads-ready?';
                cancelContentPlay(player);
                // remove the poster so it doesn't flash between videos
                removeNativePoster(player);
              },
              'adserror': function() {
                this.state = 'content-playback';
              }
            }
          },
          'ads-ready': {
            events: {
              'play': function() {
                this.state = 'preroll?';
                cancelContentPlay(player);
              },
              'adserror': function() {
                this.state = 'content-playback';
              }
            }
          },
          'preroll?': {
            enter: function() {
              // change class to show that we're waiting on ads
              player.el().className += ' vjs-ad-loading';
              // schedule an adtimeout event to fire if we waited too long
              player.ads.timeout = window.setTimeout(function() {
                player.trigger('adtimeout');
              }, settings.prerollTimeout);
              // signal to ad plugin that it's their opportunity to play a preroll
              player.trigger('readyforpreroll');
            },
            leave: function() {
              window.clearTimeout(player.ads.timeout);
              removeClass(player.el(), 'vjs-ad-loading');
            },
            events: {
              'play': function() {
                cancelContentPlay(player);
              },
              'adstart': function() {
                this.state = 'ad-playback';
                player.el().className += ' vjs-ad-playing';
              },
              'adtimeout': function() {
                this.state = 'content-playback';
              },
              'adserror': function() {
                this.state = 'content-playback';
              }
            }
          },
          'ads-ready?': {
            enter: function() {
              player.el().className += ' vjs-ad-loading';
              player.ads.timeout = window.setTimeout(function() {
                player.trigger('adtimeout');
              }, settings.timeout);
            },
            leave: function() {
              window.clearTimeout(player.ads.timeout);
              removeClass(player.el(), 'vjs-ad-loading');
            },
            events: {
              'play': function() {
                cancelContentPlay(player);
              },
              'adscanceled': function() {
                this.state = 'content-playback';
              },
              'adsready': function() {
                this.state = 'preroll?';
              },
              'adtimeout': function() {
                this.state = 'content-playback';
              },
              'adserror': function() {
                this.state = 'content-playback';
              }
            }
          },
          'ad-playback': {
            enter: function() {
              // capture current player state snapshot (playing, currentTime, src)
              this.snapshot = getPlayerSnapshot(player);

              // remove the poster so it doesn't flash between videos
              removeNativePoster(player);
              // We no longer need to supress play events once an ad is playing.
              // Clear it if we were.
              if (player.ads.cancelPlayTimeout) {
                clearImmediate(player.ads.cancelPlayTimeout);
                player.ads.cancelPlayTimeout = null;
              }
            },
            leave: function() {
              removeClass(player.el(), 'vjs-ad-playing');

              restorePlayerSnapshot(player, this.snapshot);
              if (player.ads.triggerevent !== 'adend') {
                // trigger 'adend' as a consistent notification
                // event that we're exiting ad-playback.
                player.trigger('adend');
              }
            },
            events: {
              'adend': function() {
                this.state = 'content-resuming';
              },
              'adserror': function() {
                this.state = 'content-resuming';
              }
            }
          },
          'content-resuming': {
            enter: function() {
              if (this.snapshot.ended) {
                window.clearTimeout(player.ads._fireEndedTimeout);
                // in some cases, ads are played in a swf or another video element
                // so we do not get an ended event in this state automatically.
                // If we don't get an ended event we can use, we need to trigger
                // one ourselves or else we won't actually ever end the current video.
                player.ads._fireEndedTimeout = window.setTimeout(function() {
                  player.trigger('ended');
                }, 1000);
              }
            },
            leave: function() {
              window.clearTimeout(player.ads._fireEndedTimeout);
            },
            events: {
              'contentupdate': function() {
                this.state = 'content-set';
              },
              'playing': function() {
                this.state = 'content-playback';
              },
              'ended': function() {
                this.state = 'content-playback';
              }
            }
          },
          'postroll?': {
            enter: function() {
              this.snapshot = getPlayerSnapshot(player);

              player.el().className += ' vjs-ad-loading';

              player.ads.timeout = window.setTimeout(function() {
                player.trigger('adtimeout');
              }, settings.postrollTimeout);
            },
            leave: function() {
              window.clearTimeout(player.ads.timeout);
              removeClass(player.el(), 'vjs-ad-loading');
            },
            events: {
              'adstart': function() {
                this.state = 'ad-playback';
                player.el().className += ' vjs-ad-playing';
              },
              'adtimeout': function() {
                this.state = 'content-resuming';
                setImmediate(function() {
                  player.trigger('ended');
                });
              },
              'adserror': function() {
                this.state = 'content-resuming';
                setImmediate(function() {
                  player.trigger('ended');
                });
              }
            }
          },
          'content-playback': {
            enter: function() {
              // make sure that any cancelPlayTimeout is cleared
              if (player.ads.cancelPlayTimeout) {
                clearImmediate(player.ads.cancelPlayTimeout);
                player.ads.cancelPlayTimeout = null;
              }
              // this will cause content to start if a user initiated
              // 'play' event was canceled earlier.
              player.trigger({
                type: 'contentplayback',
                triggerevent: player.ads.triggerevent
              });
            },
            events: {
              // in the case of a timeout, adsready might come in late.
              'adsready': function() {
                player.trigger('readyforpreroll');
              },
              'adstart': function() {
                this.state = 'ad-playback';
                player.el().className += ' vjs-ad-playing';
                // remove the poster so it doesn't flash between videos
                removeNativePoster(player);
              },
              'contentupdate': function() {
                if (player.paused()) {
                  this.state = 'content-set';
                } else {
                  this.state = 'ads-ready?';
                }
              },
              'contentended': function() {
                this.state = 'postroll?';
              }
            }
          }
        };

      (function(state) {
        var noop = function() {};

        // process the current event with a noop default handler
        ((fsm[state].events || {})[event.type] || noop).apply(player.ads);

        // check whether the state has changed
        if (state !== player.ads.state) {

          // record the event that caused the state transition
          player.ads.triggerevent = event.type;

          // execute leave/enter callbacks if present
          (fsm[state].leave || noop).apply(player.ads);
          (fsm[player.ads.state].enter || noop).apply(player.ads);

          // output debug logging
          if (settings.debug) {
            videojs.log('ads', player.ads.triggerevent + ' triggered: ' + state + ' -> ' + player.ads.state);
          }
        }

      })(player.ads.state);

    };

    // register for the events we're interested in
    on(player, vjs.Html5.Events.concat([
      // events emitted by ad plugin
      'adtimeout',
      'contentupdate',
      'contentplaying',
      'contentended',

      // events emitted by third party ad implementors
      'adsready',
      'adserror',
      'adscanceled',
      'adstart',  // startLinearAdMode()
      'adend'     // endLinearAdMode()
    ]), fsmHandler);

    // keep track of the current content source
    // if you want to change the src of the video without triggering
    // the ad workflow to restart, you can update this variable before
    // modifying the player's source
    player.ads.contentSrc = player.currentSrc();

    // implement 'contentupdate' event.
    (function(){
      var
        // check if a new src has been set, if so, trigger contentupdate
        checkSrc = function() {
          var src;
          if (player.ads.state !== 'ad-playback') {
            src = player.currentSrc();
            if (src !== player.ads.contentSrc) {
              player.trigger({
                type: 'contentupdate',
                oldValue: player.ads.contentSrc,
                newValue: src
              });
              player.ads.contentSrc = src;
            }
          }
        };
      // loadstart reliably indicates a new src has been set
      player.on(['loadstart'], checkSrc);
      // check immediately in case we missed the loadstart
      setImmediate(checkSrc);
    })();

    // kick off the fsm
    if (!player.paused()) {
      // simulate a play event if we're autoplaying
      fsmHandler({type:'play'});
    }

  };

  // register the ad plugin framework
  vjs.plugin('ads', adFramework);

})(window, document, videojs);

;
/*jshint unused:false */
"use strict";

var NODE_TYPE_ELEMENT = 1;

function noop(){ }

function isNull(o) {
  return o === null;
}

function isDefined(o){
  return o !== undefined;
}

function isUndefined(o){
  return o === undefined;
}

function isObject(obj) {
  return typeof obj === 'object';
}

function isFunction(str){
  return typeof str === 'function';
}

function isNumber(num){
  return typeof num === 'number';
}

function isWindow(obj) {
  return isObject(obj) && obj.window === obj;
}

function isArray(array){
  return Object.prototype.toString.call( array ) === '[object Array]';
}

function isArrayLike(obj) {
  if (obj === null || isWindow(obj) || isFunction(obj) || isUndefined(obj)) {
    return false;
  }

  var length = obj.length;

  if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
    return true;
  }

  return isString(obj) || isArray(obj) || length === 0 ||
    typeof length === 'number' && length > 0 && (length - 1) in obj;
}

function isString(str){
  return typeof str === 'string';
}

function isEmptyString(str) {
  return isString(str) && str.length === 0;
}

function isNotEmptyString(str) {
  return isString(str) && str.length !== 0;
}

function arrayLikeObjToArray(args) {
  return Array.prototype.slice.call(args);
}

function forEach(obj, iterator, context) {
  var key, length;
  if (obj) {
    if (isFunction(obj)) {
      for (key in obj) {
        // Need to check if hasOwnProperty exists,
        // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
        if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (isArray(obj)) {
      var isPrimitive = typeof obj !== 'object';
      for (key = 0, length = obj.length; key < length; key++) {
        if (isPrimitive || key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (obj.forEach && obj.forEach !== forEach) {
      obj.forEach(iterator, context, obj);
    } else {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    }
  }
  return obj;
}


var SNAKE_CASE_REGEXP = /[A-Z]/g;
function snake_case(name, separator) {
  separator = separator || '_';
  return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
    return (pos ? separator : '') + letter.toLowerCase();
  });
}

function isValidEmail(email){
  if(!isString(email)){
    return false;
  }
  var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;
  return EMAIL_REGEXP.test(email.trim());
}

function extend (obj) {
  var arg, i, k;
  for (i = 1; i < arguments.length; i++) {
    arg = arguments[i];
    for (k in arg) {
      if (arg.hasOwnProperty(k)) {
        if(isObject(obj[k]) && !isNull(obj[k]) && isObject(arg[k])){
          obj[k] = extend({}, obj[k], arg[k]);
        }else {
          obj[k] = arg[k];
        }
      }
    }
  }
  return obj;
}

function capitalize(s){
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function decapitalize(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * This method works the same way array.prototype.map works but if the transformer returns undefine, then
 * it won't be added to the transformed Array.
 */
function transformArray(array, transformer) {
  var transformedArray = [];

  array.forEach(function(item, index){
    var transformedItem = transformer(item, index);
    if(isDefined(transformedItem)) {
      transformedArray.push(transformedItem);
    }
  });

  return transformedArray;
}

function toFixedDigits(num, digits) {
  var formattedNum = num + '';
  digits = isNumber(digits) ? digits : 0;
  num = isNumber(num) ? num : parseInt(num);
  if(isNumber(num) && !isNaN(num)){
    formattedNum = num + '';
    while(formattedNum.length < digits) {
      formattedNum = '0' + formattedNum;
    }
    return formattedNum;
  }
  return NaN + '';
}

function throttle(callback, delay) {
  var previousCall = new Date().getTime() - (delay + 1);
  return function() {
    var time = new Date().getTime();
    if ((time - previousCall) >= delay) {
      previousCall = time;
      callback.apply(this, arguments);
    }
  };
}

function debounce (callback, wait) {
  var timeoutId;

  return function (){
    if(timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(function(){
      callback.apply(this, arguments);
      timeoutId = undefined;
    }, wait);
  };
}

// a function designed to blow up the stack in a naive way
// but it is ok for videoJs children components
function treeSearch(root, getChildren, found){
  var children = getChildren(root);
  for (var i = 0; i < children.length; i++){
    if (found(children[i])) {
      return children[i];
    }
    else {
      var el = treeSearch(children[i], getChildren, found);
      if (el){
        return el;
      }
    }
  }
}

function echoFn(val) {
  return function () {
    return val;
  };
}

//Note: Supported formats come from http://www.w3.org/TR/NOTE-datetime
// and the iso8601 regex comes from http://www.pelagodesign.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/
function isISO8601(value) {
  if(isNumber(value)){
    value = value + '';  //we make sure that we are working with strings
  }

  if(!isString(value)){
    return false;
  }

  /*jslint maxlen: 500 */
  var iso8086Regex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
  return iso8086Regex.test(value.trim());
}
;
//Small subset of async
var async = {};

async.setImmediate = function (fn) {
  setTimeout(fn, 0);
};

async.iterator = function (tasks) {
  var makeCallback = function (index) {
    var fn = function () {
      if (tasks.length) {
        tasks[index].apply(null, arguments);
      }
      return fn.next();
    };
    fn.next = function () {
      return (index < tasks.length - 1) ? makeCallback(index + 1) : null;
    };
    return fn;
  };
  return makeCallback(0);
};


async.waterfall = function (tasks, callback) {
  callback = callback || function () { };
  if (!isArray(tasks)) {
    var err = new Error('First argument to waterfall must be an array of functions');
    return callback(err);
  }
  if (!tasks.length) {
    return callback();
  }
  var wrapIterator = function (iterator) {
    return function (err) {
      if (err) {
        callback.apply(null, arguments);
        callback = function () {
        };
      }
      else {
        var args = Array.prototype.slice.call(arguments, 1);
        var next = iterator.next();
        if (next) {
          args.push(wrapIterator(next));
        }
        else {
          args.push(callback);
        }
        async.setImmediate(function () {
          iterator.apply(null, args);
        });
      }
    };
  };
  wrapIterator(async.iterator(tasks))();
};

async.when = function (condition, callback) {
  if (!isFunction(callback)) {
    throw new Error("async.when error: missing callback argument");
  }

  var isAllowed = isFunction(condition) ? condition : function () {
    return !!condition;
  };

  return function () {
    var args = arrayLikeObjToArray(arguments);
    var next = args.pop();

    if (isAllowed.apply(null, args)) {
      return callback.apply(this, arguments);
    }

    args.unshift(null);
    return next.apply(null, args);
  };
};



;
"use strict";

var dom = {};

dom.isVisible = function isVisible(el) {
  var style = window.getComputedStyle(el);
  return style.visibility !== 'hidden';
};

dom.isHidden = function isHidden(el) {
  var style = window.getComputedStyle(el);
  return style.display === 'none';
};

dom.isShown = function isShown(el) {
  return !dom.isHidden(el);
};

dom.hide = function hide(el) {
  el.__prev_style_display_ = el.style.display;
  el.style.display = 'none';
};

dom.show = function show(el) {
  if (dom.isHidden(el)) {
    el.style.display = el.__prev_style_display_;
  }
  el.__prev_style_display_ = undefined;
};

dom.hasClass = function hasClass(el, cssClass) {
  var classes, i, len;

  if (isNotEmptyString(cssClass)) {
    if (el.classList) {
      return el.classList.contains(cssClass);
    }

    classes = isString(el.getAttribute('class')) ? el.getAttribute('class').split(/\s+/) : [];
    cssClass = (cssClass || '');

    for (i = 0, len = classes.length; i < len; i += 1) {
      if (classes[i] === cssClass) {
        return true;
      }
    }
  }
  return false;
};

dom.addClass = function (el, cssClass) {
  var classes;

  if (isNotEmptyString(cssClass)) {
    if (el.classList) {
      return el.classList.add(cssClass);
    }

    classes = isString(el.getAttribute('class')) ? el.getAttribute('class').split(/\s+/) : [];
    if (isString(cssClass) && isNotEmptyString(cssClass.replace(/\s+/, ''))) {
      classes.push(cssClass);
      el.setAttribute('class', classes.join(' '));
    }
  }
};

dom.removeClass = function (el, cssClass) {
  var classes;

  if (isNotEmptyString(cssClass)) {
    if (el.classList) {
      return el.classList.remove(cssClass);
    }

    classes = isString(el.getAttribute('class')) ? el.getAttribute('class').split(/\s+/) : [];
    var newClasses = [];
    var i, len;
    if (isString(cssClass) && isNotEmptyString(cssClass.replace(/\s+/, ''))) {

      for (i = 0, len = classes.length; i < len; i += 1) {
        if (cssClass !== classes[i]) {
          newClasses.push(classes[i]);
        }
      }
      el.setAttribute('class', newClasses.join(' '));
    }
  }
};

dom.addEventListener = function addEventListener(el, type, handler) {
  if(isArray(el)){
    forEach(el, function(e) {
      dom.addEventListener(e, type, handler);
    });
    return;
  }

  if(isArray(type)){
    forEach(type, function(t) {
      dom.addEventListener(el, t, handler);
    });
    return;
  }

  if (el.addEventListener) {
    el.addEventListener(type, handler, false);
  } else if (el.attachEvent) {
    // WARNING!!! this is a very naive implementation !
    // the event object that should be passed to the handler
    // would not be there for IE8
    // we should use "window.event" and then "event.srcElement"
    // instead of "event.target"
    el.attachEvent("on" + type, handler);
  }
};

dom.removeEventListener = function removeEventListener(el, type, handler) {
  if(isArray(el)){
    forEach(el, function(e) {
      dom.removeEventListener(e, type, handler);
    });
    return;
  }

  if(isArray(type)){
    forEach(type, function(t) {
      dom.removeEventListener(el, t, handler);
    });
    return;
  }

  if (el.removeEventListener) {
    el.removeEventListener(type, handler, false);
  } else if (el.detachEvent) {
    el.detachEvent("on" + type, handler);
  } else {
    el["on" + type] = null;
  }
};

dom.dispatchEvent = function dispatchEvent(el, event) {
  if (el.dispatchEvent) {
    el.dispatchEvent(event);
  } else {
    el.fireEvent("on" + event.eventType, event);
  }
};

dom.isDescendant = function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

dom.getTextContent = function getTextContent(el){
  return el.textContent || el.text;
};

dom.prependChild = function prependChild(parent, child) {
  if(child.parentNode){
    child.parentNode.removeChild(child);
  }
  return parent.insertBefore(child, parent.firstChild);
};

dom.remove = function removeNode(node){
  if(node && node.parentNode){
    node.parentNode.removeChild(node);
  }
};

dom.isDomElement = function isDomElement(o) {
  return o instanceof Element;
};

dom.click = function(el, handler) {
  dom.addEventListener(el, 'click', handler);
};

dom.once = function(el, type, handler) {
  function handlerWrap() {
    handler.apply(null, arguments);
    dom.removeEventListener(el, type, handlerWrap);
  }

  dom.addEventListener(el, type, handlerWrap);
};



//Note: there is no getBoundingClientRect on iPad so we need a fallback
dom.getDimension = function getDimension(element) {
  var rect;

  if(element.getBoundingClientRect) {
    rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  }

  return {
    width: element.offsetWidth,
    height: element.offsetHeight
  };
};

;
"use strict";

function HttpRequestError(message) {
  this.message = 'HttpRequest Error: ' + (message || '');
}
HttpRequestError.prototype = new Error();
HttpRequestError.prototype.name = "HttpRequest Error";

function HttpRequest(createXhr) {
  if (!isFunction(createXhr)) {
    throw new HttpRequestError('Missing XMLHttpRequest factory method');
  }

  this.createXhr = createXhr;
}

HttpRequest.prototype.run = function (method, url, callback, options) {
  sanityCheck(url, callback, options);
  var timeout, timeoutId;
  var xhr = this.createXhr();
  options = options || {};
  timeout = isNumber(options.timeout)? options.timeout : 0;

  xhr.open(method, urlParts(url).href, true);

  if (options.headers) {
    setHeaders(xhr, options.headers);
  }

  if (options.withCredentials) {
    xhr.withCredentials = true;
  }

  xhr.onload = function () {
    var statusText, response, status;

    if(isDefined(timeoutId)){
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }

    statusText = xhr.statusText || '';

    // responseText is the old-school way of retrieving response (supported by IE8 & 9)
    // response/responseType properties were introduced in XHR Level2 spec (supported by IE10)
    response = ('response' in xhr) ? xhr.response : xhr.responseText;

    // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
    status = xhr.status === 1223 ? 204 : xhr.status;

    callback(
      status,
      response,
      xhr.getAllResponseHeaders(),
      statusText);
  };

  xhr.onerror = requestError;
  xhr.onabort = requestError;

  xhr.send();

  if(timeout > 0){
    timeoutId = setTimeout(function () {
      xhr && xhr.abort();
    }, timeout);
  }

  function sanityCheck(url, callback, options) {
    if (!isString(url) || isEmptyString(url)) {
      throw new HttpRequestError("Invalid url '" + url + "'");
    }

    if (!isFunction(callback)) {
      throw new HttpRequestError("Invalid handler '" + callback + "' for the http request");
    }

    if (isDefined(options) && !isObject(options)) {
      throw new HttpRequestError("Invalid options map '" + options + "'");
    }
  }

  function setHeaders(xhr, headers) {
    forEach(headers, function (value, key) {
      if (isDefined(value)) {
        xhr.setRequestHeader(key, value);
      }
    });
  }

  function requestError() {
    callback(-1, null, null, '');
  }
};

HttpRequest.prototype.get = function (url, callback, options) {
  this.run('GET', url, processResponse, options);

  function processResponse(status, response, headersString, statusText) {
    if (isSuccess(status)) {
      callback(null, response, status, headersString, statusText);
    } else {
      callback(new HttpRequestError(statusText), response, status, headersString, statusText);
    }
  }

  function isSuccess(status) {
    return 200 <= status && status < 300;
  }
};

HttpRequest.getJSONP = function getJSONP (url, cb, timeout, callback_name){
  var has_callback_called = false;
  timeout = timeout || 3000;
  callback_name = callback_name || ("_cb_" + Math.floor((Math.random()*100000)).toString()); // for jsonp

  setTimeout(function (){
    if (has_callback_called){ // function has timed out
      return;
    }
    cb("JSONP request timed up (or returned an error)");
    delete window[callback_name]; //cleaning up
  }, timeout);

  // I create the callback
  window[callback_name] = function (data){
    has_callback_called = true;
    cb(null, data);
    delete window[callback_name]; //cleaning up
  };

  var s = document.createElement('script');
  s.src = url + "?cb=" + callback_name;
  document.head.appendChild(s);
};

function createXhr() {
  return new window.XMLHttpRequest();
}

var http = new HttpRequest(createXhr);

;
'use strict';

/**
 * documentMode is an IE-only property
 * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
 */
var msie = document.documentMode;

/**
 *
 * IMPORTANT NOTE: This function comes from angularJs and was originally called urlResolve
 *                 you can take a look at the original code here https://github.com/angular/angular.js/blob/master/src/ng/urlUtils.js
 *
 * Implementation Notes for non-IE browsers
 * ----------------------------------------
 * Assigning a URL to the href property of an anchor DOM node, even one attached to the DOM,
 * results both in the normalizing and parsing of the URL.  Normalizing means that a relative
 * URL will be resolved into an absolute URL in the context of the application document.
 * Parsing means that the anchor node's host, hostname, protocol, port, pathname and related
 * properties are all populated to reflect the normalized URL.  This approach has wide
 * compatibility - Safari 1+, Mozilla 1+, Opera 7+,e etc.  See
 * http://www.aptana.com/reference/html/api/HTMLAnchorElement.html
 *
 * Implementation Notes for IE
 * ---------------------------
 * IE >= 8 and <= 10 normalizes the URL when assigned to the anchor node similar to the other
 * browsers.  However, the parsed components will not be set if the URL assigned did not specify
 * them.  (e.g. if you assign a.href = "foo", then a.protocol, a.host, etc. will be empty.)  We
 * work around that by performing the parsing in a 2nd step by taking a previously normalized
 * URL (e.g. by assigning to a.href) and assigning it a.href again.  This correctly populates the
 * properties such as protocol, hostname, port, etc.
 *
 * IE7 does not normalize the URL when assigned to an anchor node.  (Apparently, it does, if one
 * uses the inner HTML approach to assign the URL as part of an HTML snippet -
 * http://stackoverflow.com/a/472729)  However, setting img[src] does normalize the URL.
 * Unfortunately, setting img[src] to something like "javascript:foo" on IE throws an exception.
 * Since the primary usage for normalizing URLs is to sanitize such URLs, we can't use that
 * method and IE < 8 is unsupported.
 *
 * References:
 *   http://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement
 *   http://www.aptana.com/reference/html/api/HTMLAnchorElement.html
 *   http://url.spec.whatwg.org/#urlutils
 *   https://github.com/angular/angular.js/pull/2902
 *   http://james.padolsey.com/javascript/parsing-urls-with-the-dom/
 *
 * @kind function
 * @param {string} url The URL to be parsed.
 * @description Normalizes and parses a URL.
 * @returns {object} Returns the normalized URL as a dictionary.
 *
 *   | member name   | Description    |
 *   |---------------|----------------|
 *   | href          | A normalized version of the provided URL if it was not an absolute URL |
 *   | protocol      | The protocol including the trailing colon                              |
 *   | host          | The host and port (if the port is non-default) of the normalizedUrl    |
 *   | search        | The search params, minus the question mark                             |
 *   | hash          | The hash string, minus the hash symbol
 *   | hostname      | The hostname
 *   | port          | The port, without ":"
 *   | pathname      | The pathname, beginning with "/"
 *
 */

var urlParsingNode = document.createElement("a");

function urlParts(url) {
  var href = url;

  if (msie) {
    // Normalize before parse.  Refer Implementation Notes on why this is
    // done in two steps on IE.
    urlParsingNode.setAttribute("href", href);
    href = urlParsingNode.href;
  }

  urlParsingNode.setAttribute('href', href);

  // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
  return {
    href: urlParsingNode.href,
    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
    host: urlParsingNode.host,
    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
    hostname: urlParsingNode.hostname,
    port: isNotEmptyString(urlParsingNode.port)? urlParsingNode.port: 80,
    pathname: (urlParsingNode.pathname.charAt(0) === '/')
      ? urlParsingNode.pathname
      : '/' + urlParsingNode.pathname
  };
}


/**
 * This function accepts a query string (search part of a url) and returns a dictionary with
 * the different key value pairs
 * @param {string} qs queryString
 */
function queryStringToObj(qs, cond) {
  var pairs, qsObj;

  cond = isFunction(cond)? cond : function() {
    return true;
  };

  qs = qs.trim().replace(/^\?/, '');
  pairs = qs.split('&');
  qsObj = {};

  forEach(pairs, function (pair) {
    var keyValue, key, value;
    if (pair !== '') {
      keyValue = pair.split('=');
      key = keyValue[0];
      value = keyValue[1];
      if(cond(key, value)){
        qsObj[key] = value;
      }
    }
  });

  return qsObj;
}

/**
 * This function accepts an object and serializes it into a query string without the leading '?'
 * @param obj
 * @returns {string}
 */
function objToQueryString(obj) {
  var pairs = [];
  forEach(obj, function (value, key) {
    pairs.push(key + '=' + value);
  });
  return pairs.join('&');
}


;
var xml = {};

xml.strToXMLDoc = function strToXMLDoc(stringContainingXMLSource){
  //IE 8
  if(!DOMParser){
    var xmlDocument = new ActiveXObject('Microsoft.XMLDOM');
    xmlDocument.async = false;
    xmlDocument.loadXML(stringContainingXMLSource);
    return xmlDocument;
  }

  return parseString(stringContainingXMLSource);

  function parseString(stringContainingXMLSource){
    var parser = new DOMParser();
    var parsedDocument;

    //Note: This try catch is to deal with the fact that on IE parser.parseFromString does throw an error but the rest of the browsers don't.
    try {
      parsedDocument = parser.parseFromString(stringContainingXMLSource, "application/xml");

      if(isParseError(parsedDocument) || isEmptyString(stringContainingXMLSource)){
        throw new Error();
      }
    }catch(e){
      throw new Error("xml.strToXMLDOC: Error parsing the string: '" + stringContainingXMLSource + "'");
    }

    return parsedDocument;
  }

  function isParseError(parsedDocument) {
    try { // parser and parsererrorNS could be cached on startup for efficiency
      var parser = new DOMParser(),
        errorneousParse = parser.parseFromString('INVALID', 'text/xml'),
        parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;

      if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
        // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
        return parsedDocument.getElementsByTagName("parsererror").length > 0;
      }

      return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
    } catch (e) {
      //Note on IE parseString throws an error by itself and it will never reach this code. Because it will have failed before
    }
  }
};

xml.parseText = function parseText (sValue) {
  if (/^\s*$/.test(sValue)) { return null; }
  if (/^(?:true|false)$/i.test(sValue)) { return sValue.toLowerCase() === "true"; }
  if (isFinite(sValue)) { return parseFloat(sValue); }
  if (isISO8601(sValue)) { return new Date(sValue); }
  return sValue.trim();
};

xml.JXONTree = function JXONTree (oXMLParent) {
  var parseText = xml.parseText;

  //The document object is an especial object that it may miss some functions or attrs depending on the browser.
  //To prevent this problem with create the JXONTree using the root childNode which is a fully fleshed node on all supported
  //browsers.
  if(oXMLParent.documentElement){
    return new xml.JXONTree(oXMLParent.documentElement);
  }

  if (oXMLParent.hasChildNodes()) {
    var sCollectedTxt = "";
    for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
      oNode = oXMLParent.childNodes.item(nItem);
      /*jshint bitwise: false*/
      if ((oNode.nodeType - 1 | 1) === 3) { sCollectedTxt += oNode.nodeType === 3 ? oNode.nodeValue.trim() : oNode.nodeValue; }
      else if (oNode.nodeType === 1 && !oNode.prefix) {
        sProp = decapitalize(oNode.nodeName);
        vContent = new xml.JXONTree(oNode);
        if (this.hasOwnProperty(sProp)) {
          if (this[sProp].constructor !== Array) { this[sProp] = [this[sProp]]; }
          this[sProp].push(vContent);
        } else { this[sProp] = vContent; }
      }
    }
    if (sCollectedTxt) { this.keyValue = parseText(sCollectedTxt); }
  }

  if (oXMLParent.hasAttributes()) {
    var oAttrib;
    for (var nAttrib = 0; nAttrib < oXMLParent.attributes.length; nAttrib++) {
      oAttrib = oXMLParent.attributes.item(nAttrib);
      this["@" + decapitalize(oAttrib.name)] = parseText(oAttrib.value.trim());
    }
  }
};

xml.JXONTree.prototype.attr = function(attr) {
  return this['@' + decapitalize(attr)];
};

xml.toJXONTree = function toJXONTree(xmlString){
  var xmlDoc = xml.strToXMLDoc(xmlString);
  return new xml.JXONTree(xmlDoc);
};

/**
 * Helper function to extract the keyvalue of a JXONTree obj
 *
 * @param xmlObj {JXONTree}
 * return the key value or undefined;
 */
xml.keyValue = function getKeyValue(xmlObj) {
  if(xmlObj){
    return xmlObj.keyValue;
  }
  return undefined;
};

xml.attr = function getAttrValue(xmlObj, attr) {
  if(xmlObj) {
    return xmlObj['@' + decapitalize(attr)];
  }
  return undefined;
};

xml.encode = function encodeXML(str) {
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

xml.decode = function decodeXML(str) {
  return str.replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&');
};
;
vjs.AdsLabel = vjs.Component.extend({
  /** @constructor */
  init: function (player, options) {
    vjs.Component.call(this, player, options);

    var that = this;

    // We asynchronously reposition the ads label element
    setTimeout(function () {
      var currentTimeComp = player.controlBar && player.controlBar.getChild("currentTimeDisplay");
      if(currentTimeComp) {
        player.controlBar.el().insertBefore(that.el(), currentTimeComp.el());
      }

      dom.removeClass(that.el(), 'vjs-label-hidden');
    }, 0);
  }
});

vjs.AdsLabel.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-ads-label vjs-control vjs-label-hidden',
    innerHTML: 'Advertisement'
  });
};
;
vjs.plugin('vastClient', function VASTPlugin(options) {
  var player = this;
  var vast = new VASTClient();

  var defaultOpts = {
    // maximum amount of time in ms to wait to receive `adsready` from the ad
    // implementation after play has been requested. Ad implementations are
    // expected to load any dynamic libraries and make any requests to determine
    // ad policies for a video during this time.
    timeout: 500,

    // for the moment we don't support post roll ads
    postrollTimeout: 0,

    // maximun amount of time for the ad to actually start playing. If this timeout gets
    // triggered the ads will be cancelled
    adCancelTimeout: 3000,

    // Boolean flag that configures the player to play a new ad before the user sees the video again
    // the current video
    playAdAlways: false,

    // Flag to enable or disable the ads by default.
    adsEnabled: true
  };

  var settings = extend({}, defaultOpts, options || {});

  if(!settings.prerollTimeout) {
    settings.prerollTimeout = settings.adCancelTimeout;
  }

  if (isString(settings.url)) {
    settings.url = echoFn(settings.url);
  }

  if (!isDefined(settings.url)) {
    return trackAdError(new VASTError('on VideoJS VAST plugin, missing url on options object'));
  }


  player.on('play', playAdHandler);
  player.on('readyforpreroll', playPrerollAd);

  // initialize videojs contrib ads plugin
  player.ads(settings);

  player.vast = {
    isEnabled: function () {
      return settings.adsEnabled;
    },

    enable: function () {
      settings.adsEnabled = true;
    },

    disable: function () {
      settings.adsEnabled = false;
    }
  };

  return player.vast;

  /**** Local functions ****/
  function playAdHandler() {
    if(settings.adsEnabled){
      if(player.ads.state === 'content-set' && canPlayPrerollAd()){
        initAds();
      }
    }else{
      cancelAds();
    }

    /*** Local functions ***/
    function canPlayPrerollAd(){
      var allowedPrerollDelay = settings.adCancelTimeout - settings.prerollTimeout;
      return player.currentTime() <= allowedPrerollDelay;
    }

    function initAds() {
      player.trigger('adsready');
      addSpinnerIcon();
      player.on('vast.adstart', removeSpinnerIcon);
      player.on('vast.aderror', removeSpinnerIcon);
    }

    function addSpinnerIcon() {
      dom.addClass(player.el(), 'vjs-vast-ad-loading');
    }

    function removeSpinnerIcon() {
      //IMPORTANT NOTE: We remove the spinnerIcon asynchronously to give time to the browser to start the video.
      // If we remove it synchronously we see a flash of the content video before the ad starts playing.
      setTimeout(function() {
        dom.removeClass(player.el(), 'vjs-vast-ad-loading');
        player.off('vast.adstart', removeSpinnerIcon);
        player.off('vast.aderror', removeSpinnerIcon);
      }, 100);
    }

  }

  function cancelAds() {
    // We trigger 'adscanceled' to cancel the ads if they are in 'content-set' or 'ads-read?' state
    player.trigger('adscanceled');
    //We trigger 'adserror' to cancel the ads if they are in 'adsready' or 'preroll?' or 'ad-playback' state
    player.trigger('adserror');
  }

  function playPrerollAd() {
    async.waterfall([
      getVastResponse,
      playAd,
      finishPlayingAd
    ], function (error, response) {
      if (error) {
        trackAdError(error, response);
      }

      if (settings.playAdAlways) {
        // No matter what happens we play a new ad before the user sees the video again.
        player.one('contentended', function () {

          setTimeout(function () {
            player.trigger('contentupdate');
          }, 0);
        });
      }
    });
  }

  function getVastResponse(callback) {
    vast.getVASTResponse(settings.url(), callback);
  }

  function playAd(vastResponse, callback) {
    var adIntegrator = isVPAID(vastResponse) ? new VPAIDIntegrator(player, options.adCancelTimeout) : new VASTIntegrator(player, options.adCancelTimeout);
    player.ads.startLinearAdMode();
    adIntegrator.playAd(vastResponse, callback);
    player.one('vast.adstart', function () {
      player.controlBar.addChild('AdsLabel');
    });

    preventManualProgress();

    /*** Local functions ****/
    function preventManualProgress(){
      var PROGRESS_THRESHOLD = 0.5;
      var previousTime = player.currentTime();
      var tech = player.el().querySelector('.vjs-tech');

      player.on('adtimeupdate', adTimeupdateHandler);
      player.one('adended', function () {
        player.off('adtimeupdate', adTimeupdateHandler);
      });

      /*** Local functions ***/
      function adTimeupdateHandler() {
        var currentTime = player.currentTime();
        var progressDelta = Math.abs(currentTime - previousTime);
        if (progressDelta > PROGRESS_THRESHOLD) {
          player.currentTime(previousTime);
        } else {
          previousTime = currentTime;
        }
      }
    }
  }

  function finishPlayingAd(vastResponse, callback) {
    player.ads.endLinearAdMode();
    player.controlBar.removeChild('AdsLabel');
    callback(null, vastResponse);
  }

  function trackAdError(error, vastResponse) {
    player.trigger({type: 'vast.aderror', error: error});
    cancelAds();
    if (console && console.log) {
      console.log('AD ERROR:', error.message, error, vastResponse);
    }
  }

  function isVPAID(vastResponse) {
    var i, len;
    var mediaFiles = vastResponse.mediaFiles;
    for (i = 0, len = mediaFiles.length; i < len; i++) {
      if (vastUtil.isVPAID(mediaFiles[i])) {
        return true;
      }
    }
    return false;
  }
});

;
function VPAIDAdUnitWrapper(vpaidAdUnit, opts) {
  if (!(this instanceof VPAIDAdUnitWrapper)) {
    return new VPAIDAdUnitWrapper(vpaidAdUnit);
  }
  sanityCheck(vpaidAdUnit, opts);
  var defaultOpts = {
    responseTimeout: 2000
  };

  this.options = extend({}, defaultOpts, opts || {});
  this._adUnit = vpaidAdUnit;

  /*** Local Functions ***/
  function sanityCheck(adUnit, opts) {
    if (!adUnit || !VPAIDAdUnitWrapper.checkVPAIDInterface(adUnit)) {
      throw new VASTError('on VPAIDAdUnitWrapper, the passed VPAID adUnit does not fully implement the VPAID interface');
    }

    if (opts && !isObject(opts)) {
      throw new VASTError("on VPAIDAdUnitWrapper, expected options hash  but got '" + opts + "'");
    }
  }
}

VPAIDAdUnitWrapper.checkVPAIDInterface = function checkVPAIDInterface(VPAIDAdUnit) {
  var VPAIDInterfaceMethods = [
    'handshakeVersion', 'initAd', 'startAd', 'stopAd', 'skipAd', 'resizeAd', 'pauseAd', 'expandAd', 'collapseAd'
  ];

  for (var i = 0, len = VPAIDInterfaceMethods.length; i < len; i++) {
    if (!VPAIDAdUnit || !isFunction(VPAIDAdUnit[VPAIDInterfaceMethods[i]])) {
      return false;
    }
  }


  return canSubscribeToEvents(VPAIDAdUnit) && canUnsubscribeFromEvents(VPAIDAdUnit);

  /*** Local Functions ***/

  function canSubscribeToEvents(adUnit) {
    return isFunction(adUnit.subscribe) || isFunction(adUnit.addEventListener) || isFunction(adUnit.on);
  }

  function canUnsubscribeFromEvents(adUnit) {
    return isFunction(adUnit.unsubscribe) || isFunction(adUnit.removeEventListener) || isFunction(adUnit.off);

  }
};

VPAIDAdUnitWrapper.prototype.adUnitAsyncCall = function () {
  var args = arrayLikeObjToArray(arguments);
  var method = args.shift();
  var cb = args.pop();
  var timeoutId;

  sanityCheck(method, cb, this._adUnit);
  args.push(wrapCallback());

  this._adUnit[method].apply(this._adUnit, args);
  timeoutId = setTimeout(function () {
    timeoutId = null;
    cb(new VASTError("on VPAIDAdUnitWrapper, timeout while waiting for a response on call '" + method + "'"));
    cb = noop;
  }, this.options.responseTimeout);

  /*** Local functions ***/
  function sanityCheck(method, cb, adUnit) {
    if (!isString(method) || !isFunction(adUnit[method])) {
      throw new VASTError("on VPAIDAdUnitWrapper.adUnitAsyncCall, invalid method name");
    }

    if (!isFunction(cb)) {
      throw new VASTError("on VPAIDAdUnitWrapper.adUnitAsyncCall, missing callback");
    }
  }

  function wrapCallback() {
    return function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      cb.apply(this, arguments);
    };
  }
};

VPAIDAdUnitWrapper.prototype.on = function (evtName, handler) {
  var addEventListener = this._adUnit.addEventListener || this._adUnit.subscribe || this._adUnit.on;
  addEventListener.call(this._adUnit, evtName, handler);
};

VPAIDAdUnitWrapper.prototype.off = function (evtName, handler) {
  var removeEventListener = this._adUnit.removeEventListener || this._adUnit.unsubscribe || this._adUnit.off;
  removeEventListener.call(this._adUnit, evtName, handler);
};

VPAIDAdUnitWrapper.prototype.waitForEvent = function (evtName, cb, context) {
  var timeoutId;
  sanityCheck(evtName, cb);
  context = context || null;

  this.on(evtName, responseListener);

  timeoutId = setTimeout(function () {
    cb(new VASTError("on VPAIDAdUnitWrapper.waitForEvent, timeout while waiting for event '" + evtName + "'"));
    timeoutId = null;
    cb = noop;
  }, this.options.responseTimeout);

  /*** Local functions ***/
  function sanityCheck(evtName, cb) {
    if (!isString(evtName)) {
      throw new VASTError("on VPAIDAdUnitWrapper.waitForEvent, missing evt name");
    }

    if (!isFunction(cb)) {
      throw new VASTError("on VPAIDAdUnitWrapper.waitForEvent, missing callback");
    }
  }

  function responseListener() {
    var args = arrayLikeObjToArray(arguments);

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    args.unshift(null);
    cb.apply(context, args);
  }
};

// VPAID METHODS
VPAIDAdUnitWrapper.prototype.handshakeVersion = function (version, cb) {
  this.adUnitAsyncCall('handshakeVersion', version, cb);
};

/* jshint maxparams:6 */
VPAIDAdUnitWrapper.prototype.initAd = function (width, height, viewMode, desiredBitrate, adUnitData, cb) {
  this._adUnit.initAd(width, height, viewMode, desiredBitrate, adUnitData);
  this.waitForEvent('AdLoaded', cb);
};

VPAIDAdUnitWrapper.prototype.resizeAd = function (width, height, viewMode, cb) {
  this._adUnit.resizeAd(width, height, viewMode);
  this.waitForEvent('AdSizeChange', cb);
};

VPAIDAdUnitWrapper.prototype.startAd = function (cb) {
  this._adUnit.startAd();
  this.waitForEvent('AdStarted', cb);
};

VPAIDAdUnitWrapper.prototype.stopAd = function (cb) {
  this._adUnit.stopAd();
  this.waitForEvent('AdStopped', cb);
};

VPAIDAdUnitWrapper.prototype.pauseAd = function (cb) {
  this._adUnit.pauseAd();
  this.waitForEvent('AdPaused', cb);
};

VPAIDAdUnitWrapper.prototype.resumeAd = function (cb) {
  this._adUnit.resumeAd();
  this.waitForEvent('AdPlaying', cb);
};

VPAIDAdUnitWrapper.prototype.expandAd = function (cb) {
  this._adUnit.expandAd();
  this.waitForEvent('AdExpandedChange', cb);
};

VPAIDAdUnitWrapper.prototype.collapseAd = function (cb) {
  this._adUnit.collapseAd();
  this.waitForEvent('AdExpandedChange', cb);
};

VPAIDAdUnitWrapper.prototype.skipAd = function (cb) {
  this._adUnit.skipAd();
  this.waitForEvent('AdSkipped', cb);

  //TODO: what about: AdSkippableStateChange
};

//VPAID property getters
[
  'adLinear',
  'adWidth',
  'adHeight',
  'adExpanded',
  'adSkippableState',
  'adRemainingTime',
  'adDuration',
  'adVolume',
  'adCompanions',
  'adIcons'
].forEach(function (property) {
  var getterName = 'get' + capitalize(property);

  VPAIDAdUnitWrapper.prototype[getterName] = function (cb) {
    this.adUnitAsyncCall(getterName, cb);
  };
});

//VPAID property setters
VPAIDAdUnitWrapper.prototype.setAdVolume = function(volume, cb){
  this.adUnitAsyncCall('setAdVolume',volume, cb);
};
;
function VPAIDFlashTech(mediaFile) {
  if (!(this instanceof VPAIDFlashTech)) {
    return new VPAIDFlashTech(mediaFile);
  }
  sanityCheck(mediaFile);
  this.mediaFile = mediaFile;
  this.containerEl = null;
  this.vpaidFlashToJS = null;

  /*** local functions ***/
  function sanityCheck(mediaFile) {
    if (!mediaFile || !isString(mediaFile.src)) {
      throw new VASTError('on VPAIDFlashTech, invalid MediaFile');
    }
  }
}

VPAIDFlashTech.supports = function (type) {
  return type === 'application/x-shockwave-flash';
};

VPAIDFlashTech.prototype.loadAdUnit = function loadFlashCreative(containerEl, callback) {
  var that = this;
  sanityCheck(containerEl, callback);

  this.containerEl = containerEl;
  this.vpaidFlashToJS = new VPAIDFlashToJS(containerEl, function (error) {
    if (error) {
      return callback(error);
    }

    that.vpaidFlashToJS.loadAdUnit(that.mediaFile.src, callback);
  });

  /*** Local Functions ***/
  function sanityCheck(container, cb) {

    if (!dom.isDomElement(container)) {
      throw new VASTError('on VPAIDFlashTech.loadAdUnit, invalid dom container element');
    }

    if (!isFunction(cb)) {
      throw new VASTError('on VPAIDFlashTech.loadAdUnit, missing valid callback');
    }
  }
};


VPAIDFlashTech.prototype.unloadAdUnit = function () {
  if (this.vpaidFlashToJS) {
    try{
      this.vpaidFlashToJS.destroy();
    } catch(e){
      if(console && isFunction(console.log)){
        console.log('VAST ERROR: trying to unload the VPAID adunit');
      }
    }
    this.vpaidFlashToJS = null;
  }

  if (this.containerEl) {
    dom.remove(this.containerEl);
    this.containerEl = null;
  }
};

;
function VPAIDIntegrator(player, adStartTimeout) {
  if (!(this instanceof VPAIDIntegrator)) {
    return new VPAIDIntegrator(player, adStartTimeout);
  }

  this.VIEW_MODE = {
    NORMAL: 'normal',
    FULLSCREEN: "fullscreen",
    THUMBNAIL: "thumbnail"
  };
  this.player = player;
  this.adStartTimeout = adStartTimeout || 5000;
  this.containerEl = createVPAIDContainerEl(player);
  this.options = {
    adStartTimeout: adStartTimeout || 5000,
    responseTimeout: 2000,
    VPAID_VERSION: {
      full: '2.0',
      major: 2,
      minor: 0
    }
  };

  /*** Local functions ***/

  function createVPAIDContainerEl() {
    var containerEl = document.createElement('div');
    dom.addClass(containerEl, 'VPAID-container');
    player.el().insertBefore(containerEl, player.controlBar.el());
    return containerEl;

  }
}

//List of supported VPAID technologies
VPAIDIntegrator.techs = [
  VPAIDFlashTech
];

VPAIDIntegrator.prototype.playAd = function playVPaidAd(vastResponse, callback) {
  var that = this;
  var tech, adStartTimeoutId;
  var player = this.player;

  callback = callback || noop;
  if (!(vastResponse instanceof VASTResponse)) {
    return callback(new VASTError('on VASTIntegrator.playAd, missing required VASTResponse'));
  }

  adStartTimeoutId = setTimeout(function () {
    var error = new VASTError('on VPAIDIntegrator, timeout while waiting for the ad to start');
    callback(error);
    callback = noop;
    removeAdUnit(error);
  }, this.adStartTimeout);

  tech = this._findSupportedTech(vastResponse);
  dom.addClass(player.el(), 'vjs-vpaid-ad');

  if (tech) {
    async.waterfall([
      function (next) {
        next(null, tech, vastResponse);
      },
      this._loadAdUnit.bind(this),
      this._playAdUnit.bind(this),
      clearAdStartTimeout,
      this._finishPlaying.bind(this)

    ], function (error, adUnit, vastResponse) {
      removeAdUnit(error);

      callback(error, vastResponse);
    });
  } else {
    callback(new VASTError('on VPAIDIntegrator.playAd, could not find a supported mediaFile'));
  }
  /*** Local functions ***/

  function clearAdStartTimeout(adUnit, vastResponse, next) {
    clearTimeout(adStartTimeoutId);
    adStartTimeoutId = null;
    next(null, adUnit, vastResponse);
  }

  function removeAdUnit(error) {
    if (error) {
      that._trackError(vastResponse);
      player.trigger('vast.aderror');
    }

    tech.unloadAdUnit();
    dom.removeClass(player.el(), 'vjs-vpaid-ad');
    player.trigger('VPAID-adfinished');
  }
};

VPAIDIntegrator.prototype._findSupportedTech = function (vastResponse) {
  if (!(vastResponse instanceof VASTResponse)) {
    return null;
  }

  var vpaidMediaFiles = vastResponse.mediaFiles.filter(vastUtil.isVPAID);
  var i, len, mediaFile, VPAIDTech;

  for (i = 0, len = vpaidMediaFiles.length; i < len; i += 1) {
    mediaFile = vpaidMediaFiles[i];
    VPAIDTech = findSupportedTech(mediaFile);
    if (VPAIDTech) {
      return new VPAIDTech(mediaFile);
    }
  }

  return null;

  /*** Local functions ***/

  function findSupportedTech(mediafile) {
    var type = mediafile.type;
    var i, len, VPAIDTech;

    for (i = 0, len = VPAIDIntegrator.techs.length; i < len; i += 1) {
      VPAIDTech = VPAIDIntegrator.techs[i];
      if (VPAIDTech.supports(type)) {
        return VPAIDTech;
      }
    }
    return null;
  }
};

VPAIDIntegrator.prototype._loadAdUnit = function (tech, vastResponse, next) {
  tech.loadAdUnit(this.containerEl, function (error, adUnit) {
    next(error, new VPAIDAdUnitWrapper(adUnit, {src: tech.mediaFile.src}), vastResponse);
  });
};

VPAIDIntegrator.prototype._playAdUnit = function (adUnit, vastResponse, callback) {
  async.waterfall([
    function (next) {
      next(null, adUnit, vastResponse);
    },
    this._handshake.bind(this),
    this._initAd.bind(this),
    this._setupEvents.bind(this),
    this._linkPlayerControls.bind(this),
    this._startAd.bind(this)
  ], callback);
};

VPAIDIntegrator.prototype._handshake = function handshake(adUnit, vastResponse, next) {
  adUnit.handshakeVersion('2.0', function (error, version) {
    if (error) {
      return next(error, adUnit, vastResponse);
    }

    if (version && isSupportedVersion(version)) {
      return next(null, adUnit, vastResponse);
    }

    return next(new VASTError('on VPAIDIntegrator._handshake, unsupported version "' + version + '"'), adUnit, vastResponse);
  });

  function isSupportedVersion(version) {
    var majorNum = major(version);
    return majorNum >= 1 && majorNum <= 2;
  }

  function major(version) {
    var parts = version.split('.');
    return parseInt(parts[0], 10);
  }
};

VPAIDIntegrator.prototype._initAd = function (adUnit, vastResponse, next) {
  var dimension = dom.getDimension(this.player.el());
  adUnit.initAd(dimension.width, dimension.height, this.VIEW_MODE.NORMAL, -1, vastResponse.adParameters || '', function (error) {
    next(error, adUnit, vastResponse);
  });
};

VPAIDIntegrator.prototype._setupEvents = function (adUnit, vastResponse, next) {
  var adUnitSrc = adUnit.options.src;
  var tracker = new VASTTracker(adUnitSrc, vastResponse);
  var player = this.player;

  adUnit.on('AdSkipped', function () {
    tracker.trackSkip();
  });

  adUnit.on('AdImpression', function () {
    tracker.trackImpressions();
  });

  adUnit.on('AdVideoStart', function () {
    tracker.trackStart();
  });

  adUnit.on('AdVideoFirstQuartile', function () {
    tracker.trackFirstQuartile();
  });

  adUnit.on('AdVideoMidpoint', function () {
    tracker.trackMidpoint();
  });

  adUnit.on('AdVideoThirdQuartile', function () {
    tracker.trackThirdQuartile();
  });

  adUnit.on('AdVideoComplete', function () {
    tracker.trackComplete();
  });

  adUnit.on('AdClickThru', function () {
    tracker.trackClick();
  });

  adUnit.on('AdUserAcceptInvitation', function () {
    tracker.trackAcceptInvitation();
    tracker.trackAcceptInvitationLinear();
  });

  adUnit.on('AdUserClose', function () {
    tracker.trackClose();
    tracker.trackCloseLinear();
  });

  adUnit.on('AdPaused', function () {
    tracker.trackPause();
  });

  adUnit.on('AdUserMinimize', function () {
    tracker.trackCollapse();
  });

  adUnit.on('AdError', function () {
    //NOTE: we track errors code 901, as noted in VAST 3.0
    tracker.trackErrorWithCode(901);
  });

  adUnit.on('AdPlaying', function () {
    //NOTE: we track errors code 901, as noted in VAST 3.0
    tracker.trackResume();
  });

  adUnit.on('AdVolumeChange', function () {
    var lastVolume = player.volume();
    adUnit.getAdVolume(function (currentVolume) {
      if (currentVolume === 0 && lastVolume > 0) {
        tracker.trackMute();
      }

      if (currentVolume > 0 && lastVolume === 0) {
        tracker.trackUnmute();
      }

      player.volume(currentVolume);
    });
  });

  next(null, adUnit, vastResponse);
};


VPAIDIntegrator.prototype._linkPlayerControls = function (adUnit, vastResponse, next) {
  linkVolumeControl(this.player, adUnit);
  linkFullScreenControl(this.player, adUnit, this.VIEW_MODE);

  next(null, adUnit, vastResponse);

  /*** Local functions ***/
  function linkVolumeControl(player, adUnit) {
    player.on('volumechange', updateAdUnitVolume);
    adUnit.on('AdVolumeChange', updatePlayerVolume);

    player.on('VPAID-adfinished', function() {
      player.off('volumechange', updateAdUnitVolume);
    });


    /*** local functions ***/
    function updateAdUnitVolume() {
      var vol = player.muted() ? 0 : player.volume();
      adUnit.setAdVolume(vol, logError);
    }

    function updatePlayerVolume() {
      adUnit.getAdVolume(function (error, vol) {
        if (error) {
          logError(error);
        } else {
          player.volume(vol);
        }
      });
    }
  }

  function linkFullScreenControl(player, adUnit, VIEW_MODE) {
    player.on('fullscreenchange', updateViewSize);
    
    player.on('VPAID-adfinished', function() {
      player.off('fullscreenchange', updateViewSize);
    });

    /*** local functions ***/
    function updateViewSize() {
      var dimension = dom.getDimension(player.el());
      var MODE = player.isFullscreen()? VIEW_MODE.FULLSCREEN: VIEW_MODE.NORMAL;
      adUnit.resizeAd(dimension.width, dimension.height, MODE, logError);
    }
  }

  function logError(error) {
    if (error && console && console.log) {
      console.log('ERROR: ' + error.message, error);
    }
  }
};

VPAIDIntegrator.prototype._startAd = function (adUnit, vastResponse, next) {
  var player = this.player;

  adUnit.startAd(function (error) {
    if(!error) {
      player.trigger('vast.adstart');
    }
    next(error, adUnit, vastResponse);
  });
};

VPAIDIntegrator.prototype._finishPlaying = function (adUnit, vastResponse, next) {
  adUnit.on('AdVideoComplete', function () {
    next(null, adUnit, vastResponse);
  });

  adUnit.on('AdError', function () {
    next(new VASTError('on VPAIDIntegrator, error while waiting for the adUnit to finish playing'), adUnit, vastResponse);
  });
};

VPAIDIntegrator.prototype._trackError = function trackError(response) {
  vastUtil.track(response.errorURLMacros, {ERRORCODE: 901});
};


;
function Ad(adJTree) {
  if (!(this instanceof Ad)) {
    return new Ad(adJTree);
  }

  this.id = adJTree.attr('id');
  this.sequence = adJTree.attr('sequence');

  if(adJTree.inLine) {
    this.inLine = new InLine(adJTree.inLine);
  }

  if(adJTree.wrapper){
    this.wrapper = new Wrapper(adJTree.wrapper);
  }
}
;

function Creative(creativeJTree) {
  if(!(this instanceof Creative)) {
    return new Creative(creativeJTree);
  }

  this.id = creativeJTree.attr('id');
  this.sequence = creativeJTree.attr('sequence');
  this.adId = creativeJTree.attr('adId');
  this.apiFramework = creativeJTree.attr('apiFramework');

  if(creativeJTree.linear) {
    this.linear = new Linear(creativeJTree.linear);
  }
}
;
function InLine(inlineJTree) {
  if (!(this instanceof InLine)) {
    return new InLine(inlineJTree);
  }

  //Required Fields
  this.adTitle = xml.keyValue(inlineJTree.adTitle);
  this.adSystem = xml.keyValue(inlineJTree.adSystem);
  this.impressions = vastUtil.parseImpressions(inlineJTree.impression);
  this.creatives = vastUtil.parseCreatives(inlineJTree.creatives);

  //Optional Fields
  this.description = xml.keyValue(inlineJTree.description);
  this.advertiser = xml.keyValue(inlineJTree.advertiser);
  this.surveys = parseSurveys(inlineJTree.survey);
  this.error = xml.keyValue(inlineJTree.error);
  this.pricing = xml.keyValue(inlineJTree.pricing);
  this.extensions = inlineJTree.extensions;

  /*** Local Functions ***/
  function parseSurveys(inlineSurveys) {
    if (inlineSurveys) {
      return transformArray(isArray(inlineSurveys) ? inlineSurveys : [inlineSurveys], function (survey) {
        if(isNotEmptyString(survey.keyValue)){
          return {
            uri: survey.keyValue,
            type: survey.attr('type')
          };
        }

        return undefined;
      });
    }
    return [];
  }
}
;
function Linear(linearJTree) {
  if (!(this instanceof Linear)) {
    return new Linear(linearJTree);
  }

  //Required Elements
  this.duration = vastUtil.parseDuration(xml.keyValue(linearJTree.duration));
  this.mediaFiles = parseMediaFiles(linearJTree.mediaFiles && linearJTree.mediaFiles.mediaFile);

  //Optional fields
  this.trackingEvents = parseTrackingEvents(linearJTree.trackingEvents && linearJTree.trackingEvents.tracking, this.duration);
  this.skipoffset = vastUtil.parseOffset(xml.attr(linearJTree, 'skipoffset'), this.duration);

  if (linearJTree.videoClicks) {
    this.videoClicks = new VideoClicks(linearJTree.videoClicks);
  }
  
  if(linearJTree.adParameters) {
    this.adParameters = xml.decode(xml.keyValue(linearJTree.adParameters));
  }

  /*** Local functions ***/
  function parseTrackingEvents(trackingEvents, duration) {
    var trackings = [];
    if (isDefined(trackingEvents)) {
      trackingEvents = isArray(trackingEvents) ? trackingEvents : [trackingEvents];
      trackingEvents.forEach(function (trackingData) {
        trackings.push(new TrackingEvent(trackingData, duration));
      });
    }
    return trackings;
  }

  function parseMediaFiles(mediaFilesJxonTree) {
    var mediaFiles = [];
    if (isDefined(mediaFilesJxonTree)) {
      mediaFilesJxonTree = isArray(mediaFilesJxonTree) ? mediaFilesJxonTree : [mediaFilesJxonTree];

      mediaFilesJxonTree.forEach(function (mfData) {
        mediaFiles.push(new MediaFile(mfData));
      });
    }
    return mediaFiles;
  }
}
;
function MediaFile(mediaFileJTree) {
  if (!(this instanceof MediaFile)) {
    return new MediaFile(mediaFileJTree);
  }

  //Required attributes
  this.src = xml.keyValue(mediaFileJTree);
  this.delivery = mediaFileJTree.attr('delivery');
  this.type = mediaFileJTree.attr('type');
  this.width = mediaFileJTree.attr('width');
  this.height = mediaFileJTree.attr('height');

  //Optional attributes
  this.codec = mediaFileJTree.attr('codec');
  this.id = mediaFileJTree.attr('id');
  this.bitrate = mediaFileJTree.attr('bitrate');
  this.minBitrate = mediaFileJTree.attr('minBitrate');
  this.maxBitrate = mediaFileJTree.attr('maxBitrate');
  this.scalable = mediaFileJTree.attr('scalable');
  this.maintainAspectRatio = mediaFileJTree.attr('maintainAspectRatio');
  this.apiFramework = mediaFileJTree.attr('apiFramework');
}
;
function TrackingEvent(trackingJTree, duration) {
  if (!(this instanceof TrackingEvent)) {
    return new TrackingEvent(trackingJTree, duration);
  }

  this.name = trackingJTree.attr('event');
  this.uri = xml.keyValue(trackingJTree);

  if('progress' === this.name) {
    this.offset = vastUtil.parseOffset(trackingJTree.attr('offset'), duration);
  }
}

;
function VASTClient(options) {
  if (!(this instanceof VASTClient)) {
    return new VASTClient(options);
  }
  var defaultOptions = {
    WRAPPER_LIMIT: 5
  };

  options = options || {};
  this.settings = extend({}, options, defaultOptions);
  this.errorURLMacros = [];
}

VASTClient.prototype.getVASTResponse = function getVASTResponse(url, callback) {
  var that = this;

  //We reset the errorURLMacros before doing anything.
  this.errorURLMacros = [];

  async.waterfall([
      this._getAd.bind(this, url),
      buildVASTResponse
    ],
    this._sendVASTResponse(callback));

  /*** Local functions ***/
  function buildVASTResponse(adsChain, cb) {
    try {
      var response = that._buildVASTResponse(adsChain);
      cb(null, response);
    } catch (e) {
      cb(e);
    }
  }
};

VASTClient.prototype._sendVASTResponse = function sendVASTResponse(callback) {
  var that = this;
  callback = callback || noop;

  return function (error, response) {
    if (error) {
      vastUtil.track(that.errorURLMacros, {ERRORCODE: error.code || 900});  //900 <== Undefined error
    }
    callback(error, response);
  };
};

VASTClient.prototype._getAd = function getVASTAd(url, callback) {
  var error;
  var that = this;
  var options = isObject(url) && !isNull(url) ? url : {url: url};
  options.ads = options.ads || [];
  error = sanityCheck(options, callback);
  if (error) {
    if (isFunction(callback)) {
      return callback(error, null);
    }
    throw error;
  }

  async.waterfall([
    requestVASTXml,
    buildAd
  ], callback);

  /*** local function ***/
  function sanityCheck(opts, cb) {
    if (!isString(opts.url)) {
      return new VASTError('on VASTClient._getAd, missing video tag URL');
    }

    if (!isFunction(cb)) {
      return new VASTError('on VASTClient._getAd, missing callback function');
    }

    if (opts.ads.length >= that.WRAPPER_LIMIT) {
      return new VASTError("on VASTClient._getAd, players wrapper limit reached (the limit is " + that.WRAPPER_LIMIT + ")", 302);
    }
  }

  function requestVASTXml(callback) {
    that._requestVASTXml(options.url, callback);
  }

  function buildAd(adXML, callback) {
    var adTree;
    try {
      adTree = that._buildVastTree(adXML);
      getValidAd(adTree.ads, options.ads, callback);
    } catch (e) {
      callback(e);
    }

    /*** local Functions  ***/
    function getValidAd(possibleAds, previousAds, callback) {
      getAd(possibleAds.shift(), previousAds, function (error, adChain) {
        if (error) {
          if (possibleAds.length > 0) {
            return getValidAd(possibleAds, previousAds, callback);
          }
          return callback(error);
        }
        callback(null, adChain);
      });
    }

    function getAd(adTree, previousAds, callback) {
      try {
        var ad = that._buildAd(adTree);

        if (ad.wrapper) {
          return getNextAd(ad, previousAds, callback);
        }
        return callback(null, previousAds.concat(ad));
      } catch (e) {
        callback(e);
      }
    }

    function getNextAd(ad, previousAds, callback) {
      return that._getAd({
        url: ad.wrapper.VASTAdTagURI,
        ads: previousAds.concat(ad)
      }, callback);
    }
  }
};

VASTClient.prototype._requestVASTXml = function requestVASTXml(url, callback) {
  http.get(url, function (error, response, status){
    if(error) {
      return callback(new VASTError("on VASTClient.requestVastXML, HTTP request error with status '" + status + "'", 301));
    }
    callback(null, response);
  });
};

VASTClient.prototype._buildVastTree = function buildVastTree(xmlStr) {
  var vastTree, vastVersion;

  try {
    vastTree = xml.toJXONTree(xmlStr);
    vastVersion = xml.attr(vastTree, 'version');
    vastTree.ads = isArray(vastTree.ad) ? vastTree.ad : [vastTree.ad];

  } catch (e) {
    throw new VASTError("on VASTClient.buildVastTree, error parsing xml", 100);
  }

  if (!vastTree.ad) {
    throw new VASTError('on VASTClient.buildVastTree, no Ad in VAST tree', 303);
  }

  if(vastVersion && (vastVersion != 3 && vastVersion != 2)){
    throw new VASTError('on VASTClient.buildVastTree, not supported VAST version "'+vastVersion+'"', 102);
  }

  return vastTree;

};

VASTClient.prototype._buildAd = function buildAd(adJxonTree) {
  var ad;
  var that = this;

  try {
    ad = new Ad(adJxonTree);
  } catch (e) {
    throw new VASTError('on VASTClient._buildAd, ' + e.message, 900);
  }

  addErrorUrlMacros(ad);
  validateAd(ad);

  return ad;
  /*** Local Functions ***/

  function addErrorUrlMacros(ad) {
    if(ad.wrapper && ad.wrapper.error) {
      that.errorURLMacros.push(ad.wrapper.error);
    }

    if(ad.inLine && ad.inLine.error){
      that.errorURLMacros.push(ad.inLine.error);
    }
  }

  function validateAd(ad) {
    var wrapper = ad.wrapper;
    var inLine = ad.inLine;

    if (inLine && wrapper) {
      throw new VASTError('on VASTClient._buildAd, InLine and Wrapper both found on the same Ad', 101);
    }

    if (!inLine && !wrapper) {
      throw new VASTError('on VASTClient._buildAd, nor wrapper nor inline elements found on the Ad', 101);
    }

    if (inLine) {
      if (inLine.creatives.length === 0) {
        throw new VASTError("on VASTClient._buildAd, missing creative in InLine element", 101);
      }
    }

    if (wrapper) {
      if (!wrapper.VASTAdTagURI) {
        throw new VASTError("on VASTClient._buildAd, missing 'VASTAdTagURI' in wrapper", 101);
      }
    }
  }
};

VASTClient.prototype._buildVASTResponse = function buildVASTResponse(adsChain) {
  var response = new VASTResponse();
  addAdsToResponse(response, adsChain);
  validateResponse(response);

  return response;

  //*** Local function ****
  function addAdsToResponse(response, ads) {
    ads.forEach(function (ad) {
      response.addAd(ad);
    });
  }

  function validateResponse(response) {
    var progressEvents = response.trackingEvents.progress;

    if(!response.hasLinear()){
      throw new VASTError("on VASTClient._buildVASTResponse, Received an Ad type that is not supported", 200);
    }

    if (!response.duration) {
      throw new VASTError("on VASTClient._buildVASTResponse, Missing duration field in VAST response", 101);
    }

    if (progressEvents) {
      if (progressEvents.length > 1) {
        throw new VASTError("on VASTClient._buildVASTResponse, found more than one progress tracking event in VAST response", 101);
      }

      if (!isNumber(progressEvents[0].offset)) {
        throw new VASTError("on VASTClient._buildVASTResponse, missing offset attribute on progress tracking event", 101);
      }
    }
  }
};

;
var VAST = {};

function VASTError(message, code) {
  this.message = 'VAST Error: ' + (message || '');
  if (code) {
    this.code = code;
  }
}

VASTError.prototype = new Error();
VASTError.prototype.name = "VAST Error";
;
/**
 * Inner helper class that deals with the logic of the individual steps needed to setup an ad in the player.
 *
 * @param player {object} instance of the player that will play the ad. It assumes that the videojs-contrib-ads plugin
 *                        has been initialized when you use its utility functions.
 * @param adStartTimeout Indicates in ms. how much time to wait for the ad to start playing before canceling the ad.
 *
 * @constructor
 */
function VASTIntegrator(player, adStartTimeout) {
  if (!(this instanceof VASTIntegrator)) {
    return new VASTIntegrator(player, adStartTimeout);
  }

  this.player = player;
  this.adStartTimeout = adStartTimeout || 5000;
}

VASTIntegrator.prototype.playAd = function playAd(vastResponse, callback) {
  var that = this;
  callback = callback || noop;

  if (!(vastResponse instanceof VASTResponse)) {
    return callback(new VASTError('On VASTIntegrator, missing required VASTResponse'));
  }

  async.waterfall([
    function (next) {
      next(null, vastResponse);
    },
    this._selectAdSource.bind(this),
    this._createVASTTracker.bind(this),
    this._addClickThrough.bind(this),
    this._addSkipButton.bind(this),
    this._setupEvents.bind(this),
    this._playSelectedAd.bind(this)
  ], function (error, response) {
    if (error && response) {
      that._trackError(error, response);
    }
    callback(error, response);
  });
};

VASTIntegrator.prototype._selectAdSource = function selectAdSource(response, callback) {
  var source = this.player.selectSource(response.mediaFiles).source;
  if (source) {
    return callback(null, source, response);
  }

  // code 403 <== Couldn't find MediaFile that is supported by this video player
  callback(new VASTError("Could not find Ad mediafile supported by this player", 403), response);
};

VASTIntegrator.prototype._createVASTTracker = function createVASTTracker(adMediaFile, response, callback) {
  try {
    callback(null, adMediaFile, new VASTTracker(adMediaFile.src, response), response);
  } catch (e) {
    callback(e, response);
  }
};

VASTIntegrator.prototype._setupEvents = function setupEvents(adMediaFile, tracker, response, callback) {
  var previouslyMuted;
  var player = this.player;
  player.on('adfullscreenchange', trackFullscreenChange);
  player.on('vast.adstart', trackImpressions);
  player.on('adpause', trackPause);
  player.on('adtimeupdate', trackProgress);
  player.on('advolumechange', trackVolumeChange);

  player.one('vast.adend', function () {
    tracker.trackComplete();
    player.off('adfullscreenchange', trackFullscreenChange);
    player.off('vast.adstart', trackImpressions);
    player.off('adpause', trackPause);
    player.off('adtimeupdate', trackProgress);
    player.off('advolumechange', trackVolumeChange);
  });

  //NOTE: Pending tracking events skip, close, closeLinear, expand, collapse and creativeView. See VAST implementation

  return callback(null, adMediaFile, response);

  /*** Local Functions ***/

  function trackFullscreenChange() {
    if (player.isFullscreen()) {
      tracker.trackFullscreen();
    } else {
      tracker.trackExitFullscreen();
    }
  }

  function trackPause() {
    tracker.trackPause();
    player.one('play', function () {
      tracker.trackResume();
    });
  }

  function trackProgress() {
    var currentTimeInMs = player.currentTime() * 1000;
    tracker.trackProgress(currentTimeInMs);
  }

  function trackImpressions() {
    tracker.trackImpressions();
  }

  function trackVolumeChange() {
    var muted = player.muted();
    if (muted) {
      tracker.trackMute();
    } else if (previouslyMuted) {
      tracker.trackUnmute();
    }
    previouslyMuted = muted;
  }
};

VASTIntegrator.prototype._addSkipButton = function addSkipButton(source, tracker, response, callback) {
  var skipOffsetInSec;

  if (isNumber(response.skipoffset)) {
    skipOffsetInSec = response.skipoffset / 1000;
    addSkipButtonToPlayer(this.player, skipOffsetInSec);
  }
  callback(null, source, tracker, response);

  /*** Local function ***/
  function addSkipButtonToPlayer(player, skipOffset) {
    var skipButton = createSkipButton(player);
    var updateSkipButton = updateSkipButtonState.bind(this, skipButton, skipOffset, player);

    player.el().appendChild(skipButton);
    player.on('adtimeupdate', updateSkipButton);

    player.one('vast.adend', removeSkipButton);
    player.one('vast.aderror', removeSkipButton);

    function removeSkipButton() {
      player.off('adtimeupdate', updateSkipButton);
      dom.remove(skipButton);
    }
  }

  function createSkipButton(player) {
    var skipButton = window.document.createElement("div");
    dom.addClass(skipButton, "vast-skip-button");

    skipButton.onclick = function (e) {
      if (dom.hasClass(skipButton, 'enabled')) {
        tracker.trackSkip();
        player.trigger('adended');//We trigger the end of the ad playing
      }

      //We prevent event propagation to avoid problems with the clickThrough and so on
      if (window.Event.prototype.stopPropagation !== undefined) {
        e.stopPropagation();
      } else {
        return false;
      }
    };

    return skipButton;
  }

  function updateSkipButtonState(skipButton, skipOffset, player) {
    var timeLeft = Math.ceil(skipOffset - player.currentTime());
    if (timeLeft > 0) {
      skipButton.innerHTML = "Skip in " + toFixedDigits(timeLeft, 2) + "...";
    } else {
      if (!dom.hasClass(skipButton, 'enabled')) {
        dom.addClass(skipButton, 'enabled');
        skipButton.innerHTML = "Skip ad";
      }
    }
  }
};

VASTIntegrator.prototype._addClickThrough = function addClickThrough(mediaFile, tracker, response, callback) {
  var player = this.player;
  var blocker = createClickThroughBlocker(player, tracker, response);
  var updateBlocker = updateBlockerURL.bind(this, blocker, response, player);

  player.el().insertBefore(blocker, player.controlBar.el());
  player.on('adtimeupdate', updateBlocker);
  player.one('vast.adend', removeBlocker);
  player.one('vast.aderror', removeBlocker);

  return callback(null, mediaFile, tracker, response);

  /*** Local Functions ***/

  function createClickThroughBlocker(player, tracker, response) {
    var blocker = window.document.createElement("a");
    var clickThroughMacro = response.clickThrough;

    dom.addClass(blocker, 'vast-blocker');
    blocker.href = generateClickThroughURL(clickThroughMacro, player);

    if (isString(clickThroughMacro)) {
      blocker.target = "_blank";
    }

    blocker.onclick = function (e) {
      if (player.paused()) {
        player.play();

        //We prevent event propagation to avoid problems with the player's normal pause mechanism
        if (window.Event.prototype.stopPropagation !== undefined) {
          e.stopPropagation();
        }
        return false;
      }

      player.pause();
      tracker.trackClick();
    };

    return blocker;
  }

  function updateBlockerURL(blocker, response, player) {
    blocker.href = generateClickThroughURL(response.clickThrough, player);
  }

  function generateClickThroughURL(clickThroughMacro, player) {
    var variables = {
      ASSETURI: mediaFile.src,
      CONTENTPLAYHEAD: vastUtil.formatProgress(player.currentTime() * 1000)
    };

    return clickThroughMacro ? vastUtil.parseURLMacro(clickThroughMacro, variables) : '#';
  }

   function removeBlocker(){
     player.off('adtimeupdate', updateBlocker);
     dom.remove(blocker);
   }
};

VASTIntegrator.prototype._playSelectedAd = function playSelectedAd(source, response, callback) {
  var player = this.player;
  var adStartTimeoutID;

  player.src(source);

  adStartTimeoutID = setTimeout(function () {
    player.off('addurationchange', playAd);
    player.off('adended', finishPlayingAd);
    player.off('error', handlePlayerError);
    callback(new VASTError("on VASTIntegrator, timeout while waiting for the video to start playing", 402), response);
  }, this.adStartTimeout);

  player.one('addurationchange', playAd);
  player.one('adended', finishPlayingAd);
  player.one('error', handlePlayerError);

  /**** local functions ******/
  function playAd() {
    if (isDefined(adStartTimeoutID)) {
      window.clearTimeout(adStartTimeoutID);
    }
    player.trigger('vast.adstart');
  }

  function finishPlayingAd() {
    player.off('error', handlePlayerError);
    player.trigger('vast.adend');
    callback(null, response);
  }

  function handlePlayerError() {
    player.off('addurationchange', playAd);
    player.off('contentended', finishPlayingAd);
    callback(new VASTError("on VASTIntegrator, Player is unable to play the Ad ", 400), response);
  }
};

VASTIntegrator.prototype._trackError = function trackError(error, response) {
  vastUtil.track(response.errorURLMacros, {ERRORCODE: error.code || 900});
};

;
(function (window) {
  "use strict";


  function VASTResponse() {
    if (!(this instanceof VASTResponse)) {
      return new VASTResponse();
    }

    this._linearAdded = false;
    this.ads = [];
    this.errorURLMacros = [];
    this.impressions = [];
    this.clickTrackings = [];
    this.customClicks = [];
    this.trackingEvents = {};
    this.mediaFiles = [];
    this.clickThrough = undefined;
    this.adTitle = '';
    this.duration = undefined;
    this.skipoffset = undefined;
  }

  VASTResponse.prototype.addAd = function (ad) {
    var inLine, wrapper;

    if (ad instanceof Ad) {
      inLine = ad.inLine;
      wrapper = ad.wrapper;

      this.ads.push(ad);

      if (inLine) {
        this._addInLine(inLine);
      }

      if (wrapper) {
        this._addWrapper(wrapper);
      }
    }
  };

  VASTResponse.prototype._addErrorTrackUrl = function (error) {
    var errorURL = error instanceof xml.JXONTree ? xml.keyValue(error) : error;
    if (errorURL) {
      this.errorURLMacros.push(errorURL);
    }
  };

  VASTResponse.prototype._addImpressions = function (impressions) {
    isArray(impressions) && appendToArray(this.impressions, impressions);
  };

  VASTResponse.prototype._addClickThrough = function (clickThrough) {
    if (isNotEmptyString(clickThrough)) {
      this.clickThrough = clickThrough;
    }
  };

  VASTResponse.prototype._addClickTrackings = function (clickTrackings) {
    isArray(clickTrackings) && appendToArray(this.clickTrackings, clickTrackings);
  };

  VASTResponse.prototype._addCustomClicks = function (customClicks) {
    isArray(customClicks) && appendToArray(this.customClicks, customClicks);
  };

  VASTResponse.prototype._addTrackingEvents = function (trackingEvents) {
    var eventsMap = this.trackingEvents;

    if (trackingEvents) {
      trackingEvents = isArray(trackingEvents) ? trackingEvents : [trackingEvents];
      trackingEvents.forEach(function (trackingEvent) {
        if (!eventsMap[trackingEvent.name]) {
          eventsMap[trackingEvent.name] = [];
        }
        eventsMap[trackingEvent.name].push(trackingEvent);
      });
    }
  };

  VASTResponse.prototype._addTitle = function (title) {
    if (isNotEmptyString(title)) {
      this.adTitle = title;
    }
  };

  VASTResponse.prototype._addDuration = function (duration) {
    if (isNumber(duration)) {
      this.duration = duration;
    }
  };

  VASTResponse.prototype._addVideoClicks = function (videoClicks) {
    if (videoClicks instanceof VideoClicks) {
      this._addClickThrough(videoClicks.clickThrough);
      this._addClickTrackings(videoClicks.clickTrackings);
      this._addCustomClicks(videoClicks.customClicks);
    }
  };

  VASTResponse.prototype._addMediaFiles = function (mediaFiles) {
    isArray(mediaFiles) && appendToArray(this.mediaFiles, mediaFiles);
  };

  VASTResponse.prototype._addSkipoffset = function (offset) {
    if (offset) {
      this.skipoffset = offset;
    }
  };

  VASTResponse.prototype._addAdParameters = function (adParameters) {
    if (adParameters) {
      this.adParameters = adParameters;
    }
  };

  VASTResponse.prototype._addLinear = function (linear) {
    if (linear instanceof Linear) {
      this._addDuration(linear.duration);
      this._addTrackingEvents(linear.trackingEvents);
      this._addVideoClicks(linear.videoClicks);
      this._addMediaFiles(linear.mediaFiles);
      this._addSkipoffset(linear.skipoffset);
      this._addAdParameters(linear.adParameters);
      this._linearAdded = true;
    }
  };

  VASTResponse.prototype._addInLine = function (inLine) {
    var that = this;

    if (inLine instanceof InLine) {
      this._addTitle(inLine.adTitle);
      this._addErrorTrackUrl(inLine.error);
      this._addImpressions(inLine.impressions);

      inLine.creatives.forEach(function (creative) {
        if (creative.linear) {
          that._addLinear(creative.linear);
        }
      });
    }
  };

  VASTResponse.prototype._addWrapper = function (wrapper) {
    var that = this;

    if (wrapper instanceof Wrapper) {
      this._addErrorTrackUrl(wrapper.error);
      this._addImpressions(wrapper.impressions);

      wrapper.creatives.forEach(function (creative) {
        var linear = creative.linear;
        if (linear) {
          that._addVideoClicks(linear.videoClicks);
          that.clickThrough = undefined;//We ensure that no clickThrough has been added
          that._addTrackingEvents(linear.trackingEvents);
        }
      });
    }
  };

  VASTResponse.prototype.hasLinear = function(){
    return this._linearAdded;
  };

  function appendToArray(array, items) {
    items.forEach(function (item) {
      array.push(item);
    });
  }

  window.VASTResponse = VASTResponse;
})(window);

;
function VASTTracker(assetURI, vastResponse) {
  if (!(this instanceof VASTTracker)) {
    return new VASTTracker(assetURI, vastResponse);
  }

  sanityCheck(assetURI, vastResponse);
  this.response = vastResponse;
  this.assetURI = assetURI;
  this.progress = 0;
  this.quartiles = {
    firstQuartile: Math.round(25 * vastResponse.duration) / 100,
    midpoint: Math.round(50 * vastResponse.duration) / 100,
    thirdQuartile: Math.round(75 * vastResponse.duration) / 100
  };

  /*** Local Functions ***/
  function sanityCheck(assetURI, vastResponse) {
    if (!isString(assetURI) || isEmptyString(assetURI)) {
      throw new VASTError('on VASTTracker constructor, missing required the URI of the ad asset being played');
    }

    if (!(vastResponse instanceof VASTResponse)) {
      throw new VASTError('on VASTTracker constructor, missing required VAST response');
    }
  }
}

VASTTracker.prototype.trackURLs = function trackURLs(urls, variables) {
  if (isArray(urls) && urls.length > 0) {
    variables = extend({
      ASSETURI: this.assetURI,
      CONTENTPLAYHEAD: vastUtil.formatProgress(this.progress)
    }, variables || {});

    vastUtil.track(urls, variables);
  }
};

VASTTracker.prototype.trackEvent = function trackEvent(eventName, trackOnce) {
  this.trackURLs(getEventUris(this.response.trackingEvents[eventName]));
  if (trackOnce) {
    this.response.trackingEvents[eventName] = undefined;
  }

  /*** Local function ***/
  function getEventUris(trackingEvents) {
    var uris;

    if (trackingEvents) {
      uris = [];
      trackingEvents.forEach(function (event) {
        uris.push(event.uri);
      });
    }
    return uris;
  }
};

VASTTracker.prototype.trackProgress = function trackProgress(newProgress) {
  var events = [];
  var ONCE = true;
  var ALWAYS = false;
  var trackingEvents = this.response.trackingEvents;

  if (isNumber(newProgress)) {
    addTrackEvent('start', ONCE, newProgress > 0);
    addTrackEvent('rewind', ALWAYS, this.progress > newProgress);
    addQuartileEvents.call(this, newProgress);
    addProgressEvent.call(this, newProgress);
    trackEvents.call(this);
    this.progress = newProgress;
  }

  /*** Local function ***/
  function addTrackEvent(eventName, trackOnce, canBeAdded) {
    if (trackingEvents[eventName] && canBeAdded) {
      events.push({
        name: eventName,
        trackOnce: !!trackOnce
      });
    }
  }

  function addQuartileEvents(progress) {
    forEach(this.quartiles, function (quartileTime, eventName) {
      //We only fire the quartile event if the progress is bigger than the quartile time by one second at most.
      addTrackEvent(eventName, ONCE, progress >= quartileTime && progress <= (quartileTime + 1000));
    });
  }

  function addProgressEvent(progress) {
    var progressEvent = trackingEvents.progress && trackingEvents.progress[0];
    if (progressEvent) {
      addTrackEvent('progress', ONCE, progressEvent.offset <= progress);
    }
  }

  function trackEvents() {
    events.forEach(function (event) {
      this.trackEvent(event.name, event.trackOnce);
    }, this);
  }
};

[
  'start',
  'rewind',
  'fullscreen',
  'exitFullscreen',
  'complete',
  'pause',
  'resume',
  'close',
  'closeLinear',
  'skip',
  'mute',
  'unmute',
  'firstQuartile',
  'midpoint',
  'thirdQuartile',
  'acceptInvitation',
  'acceptInvitationLinear',
  'collapse',
  'expand'
].forEach(function (eventName) {
    VASTTracker.prototype['track' + capitalize(eventName)] = function () {
      this.trackEvent(eventName);
    };
  });

VASTTracker.prototype.trackErrorWithCode = function trackErrorWithCode(errorcode) {
  if (isNumber(errorcode)) {
    this.trackURLs(this.response.errorURLMacros, {ERRORCODE: errorcode});
  }
};

VASTTracker.prototype.trackImpressions = function trackImpressions() {
  this.trackURLs(this.response.impressions);
};

VASTTracker.prototype.trackClick = function trackClick() {
  this.trackURLs(this.response.clickTrackings);
};

;
function VideoClicks(videoClickJTree) {
  if (!(this instanceof VideoClicks)) {
    return new VideoClicks(videoClickJTree);
  }

  this.clickThrough = xml.keyValue(videoClickJTree.clickThrough);
  this.clickTrackings = parseClickTrackings(videoClickJTree.clickTracking);
  this.customClicks = parseClickTrackings(videoClickJTree.customClick);

  /*** Local functions ***/
  function parseClickTrackings(trackingData) {
    var clickTrackings = [];
    if (trackingData) {
      trackingData = isArray(trackingData) ? trackingData : [trackingData];
      trackingData.forEach(function (clickTrackingData) {
        clickTrackings.push(xml.keyValue(clickTrackingData));
      });
    }
    return clickTrackings;
  }
}
;
function Wrapper(wrapperJTree) {
  if(!(this instanceof Wrapper)) {
    return new Wrapper(wrapperJTree);
  }

  //Required elements
  this.adSystem = xml.keyValue(wrapperJTree.adSystem);
  this.impressions = vastUtil.parseImpressions(wrapperJTree.impression);
  this.VASTAdTagURI = xml.keyValue(wrapperJTree.vASTAdTagURI);

  //Optional elements
  this.creatives = vastUtil.parseCreatives(wrapperJTree.creatives);
  this.error = xml.keyValue(wrapperJTree.error);
  this.extensions = wrapperJTree.extensions;

  //Optional attrs
  this.followAdditionalWrappers = isDefined(xml.attr(wrapperJTree, 'followAdditionalWrappers'))? xml.attr(wrapperJTree, 'followAdditionalWrappers'): true;
  this.allowMultipleAds = xml.attr(wrapperJTree, 'allowMultipleAds');
  this.fallbackOnNoAd = xml.attr(wrapperJTree, 'fallbackOnNoAd');
}



;
"use strict";

var vastUtil = {

  track: function track(URLMacros, variables) {
    var sources = vastUtil.parseURLMacros(URLMacros, variables);
    var trackImgs = [];
    sources.forEach(function (src) {
      var img = new Image();
      img.src = src;
      trackImgs.push(img);
    });
    return trackImgs;
  },

  parseURLMacros: function parseMacros(URLMacros, variables) {
    var parsedURLs = [];

    variables = variables || {};

    if (!(variables["CACHEBUSTING"])) {
      variables["CACHEBUSTING"] = Math.round(Math.random() * 1.0e+10);
    }

    URLMacros.forEach(function (URLMacro) {
      parsedURLs.push(vastUtil._parseURLMacro(URLMacro, variables));
    });

    return parsedURLs;
  },

  parseURLMacro: function parseMacro(URLMacro, variables) {
    variables = variables || {};

    if (!(variables["CACHEBUSTING"])) {
      variables["CACHEBUSTING"] = Math.round(Math.random() * 1.0e+10);
    }

    return vastUtil._parseURLMacro(URLMacro, variables);
  },

  _parseURLMacro: function parseMacro(URLMacro, variables) {
    variables = variables || {};

    forEach(variables, function (value, key) {
      URLMacro = URLMacro.replace(new RegExp("\\[" + key + "\\\]", 'gm'), value);
    });

    return URLMacro;
  },

  parseDuration: function parseDuration(durationStr) {
    var durationRegex = /(\d\d):(\d\d):(\d\d)(\.(\d\d\d))?/;
    var match, durationInMs;

    if (isString(durationStr)) {
      match = durationStr.match(durationRegex);
      if (match) {
        durationInMs = parseHoursToMs(match[1]) + parseMinToMs(match[2]) + parseSecToMs(match[3]) + parseInt(match[5] || 0);
      }
    }

    return isNaN(durationInMs) ? null : durationInMs;

    /*** local functions ***/
    function parseHoursToMs(hourStr) {
      return parseInt(hourStr) * 60 * 60 * 1000;
    }

    function parseMinToMs(minStr) {
      return parseInt(minStr) * 60 * 1000;
    }

    function parseSecToMs(secStr) {
      return parseInt(secStr) * 1000;
    }
  },

  parseImpressions: function parseImpressions(impressions) {
    if (impressions) {
      impressions = isArray(impressions) ? impressions : [impressions];
      return transformArray(impressions, function (impression) {
        if (isNotEmptyString(impression.keyValue)) {
          return impression.keyValue;
        }
        return undefined;
      });
    }
    return [];
  },

  parseCreatives: function parseCreatives(creativesJTree) {
    var creatives = [];
    var creativesData;
    if (isDefined(creativesJTree) && isDefined(creativesJTree.creative)) {
      creativesData = isArray(creativesJTree.creative) ? creativesJTree.creative : [creativesJTree.creative];
      creativesData.forEach(function (creative) {
        creatives.push(new Creative(creative));
      });
    }
    return creatives;
  },

  //We assume that the progress is going to arrive in milliseconds
  formatProgress: function formatProgress(progress) {
    var hours, minutes, seconds, milliseconds;
    hours = progress / (60 * 60 * 1000);
    hours = Math.floor(hours);
    minutes = (progress / (60 * 1000)) % 60;
    minutes = Math.floor(minutes);
    seconds = (progress / 1000) % 60;
    seconds = Math.floor(seconds);
    milliseconds = progress % 1000;
    return toFixedDigits(hours, 2) + ':' + toFixedDigits(minutes, 2) + ':' + toFixedDigits(seconds, 2) + '.' + toFixedDigits(milliseconds, 3);
  },

  parseOffset:   function parseOffset(offset, duration) {
    if(isPercentage(offset)){
      return calculatePercentage(offset, duration);
    }
    return vastUtil.parseDuration(offset);

    /*** Local function ***/
    function isPercentage(offset) {
      var percentageRegex = /^\d+(\.\d+)?%$/g;
      return percentageRegex.test(offset);
    }

    function calculatePercentage(percentStr, duration) {
      if(duration) {
        return calcPercent(duration, parseFloat(percentStr.replace('%', '')));
      }
      return null;
    }

    function calcPercent(quantity, percent){
      return quantity * percent / 100;
    }
  },

  isVPAID: function isVPAIDMediaFile(mediaFile) {
    return !!mediaFile && mediaFile.apiFramework === 'VPAID';
  }
};})();