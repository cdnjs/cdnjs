module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));
	__export(__webpack_require__(8));
	__export(__webpack_require__(41));
	__export(__webpack_require__(44));
	__export(__webpack_require__(79));
	__export(__webpack_require__(9));
	__export(__webpack_require__(81));
	__export(__webpack_require__(12));
	__export(__webpack_require__(34));
	__export(__webpack_require__(16));
	__export(__webpack_require__(20));
	__export(__webpack_require__(36));
	__export(__webpack_require__(85));
	// these modules don't export anything
	__webpack_require__(86);
	__webpack_require__(87);
	__webpack_require__(88);
	__webpack_require__(89);
	__webpack_require__(90);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var core_1 = __webpack_require__(3);
	var router_1 = __webpack_require__(4);
	var http_1 = __webpack_require__(5);
	var app_1 = __webpack_require__(6);
	var config_1 = __webpack_require__(8);
	var platform_1 = __webpack_require__(9);
	var overlay_controller_1 = __webpack_require__(13);
	var form_1 = __webpack_require__(15);
	var keyboard_1 = __webpack_require__(16);
	var action_sheet_1 = __webpack_require__(17);
	var modal_1 = __webpack_require__(31);
	var popup_1 = __webpack_require__(32);
	var events_1 = __webpack_require__(34);
	var nav_registry_1 = __webpack_require__(35);
	var translate_1 = __webpack_require__(36);
	var click_block_1 = __webpack_require__(12);
	var feature_detect_1 = __webpack_require__(37);
	var tap_click_1 = __webpack_require__(38);
	var dom_1 = __webpack_require__(11);
	function ionicProviders(args) {
	    if (args === void 0) { args = {}; }
	    var platform = new platform_1.Platform();
	    var navRegistry = new nav_registry_1.NavRegistry(args.pages);
	    var config = args.config;
	    if (!(config instanceof config_1.Config)) {
	        config = new config_1.Config(config);
	    }
	    platform.url(window.location.href);
	    platform.userAgent(window.navigator.userAgent);
	    platform.navigatorPlatform(window.navigator.platform);
	    platform.load();
	    config.setPlatform(platform);
	    var clickBlock = new click_block_1.ClickBlock(config.get('clickBlock'));
	    var events = new events_1.Events();
	    var featureDetect = new feature_detect_1.FeatureDetect();
	    setupDom(window, document, config, platform, clickBlock, featureDetect);
	    bindEvents(window, document, platform, events);
	    // prepare the ready promise to fire....when ready
	    platform.prepareReady(config);
	    return [
	        app_1.IonicApp,
	        core_1.provide(click_block_1.ClickBlock, { useValue: clickBlock }),
	        core_1.provide(config_1.Config, { useValue: config }),
	        core_1.provide(platform_1.Platform, { useValue: platform }),
	        core_1.provide(feature_detect_1.FeatureDetect, { useValue: featureDetect }),
	        core_1.provide(events_1.Events, { useValue: events }),
	        core_1.provide(nav_registry_1.NavRegistry, { useValue: navRegistry }),
	        tap_click_1.TapClick,
	        form_1.Form,
	        keyboard_1.Keyboard,
	        overlay_controller_1.OverlayController,
	        action_sheet_1.ActionSheet,
	        modal_1.Modal,
	        popup_1.Popup,
	        translate_1.Translate,
	        router_1.ROUTER_PROVIDERS,
	        core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
	        http_1.HTTP_PROVIDERS,
	    ];
	}
	exports.ionicProviders = ionicProviders;
	function setupDom(window, document, config, platform, clickBlock, featureDetect) {
	    var bodyEle = document.body;
	    var mode = config.get('mode');
	    // if dynamic mode links have been added the fire up the correct one
	    var modeLinkAttr = mode + '-href';
	    var linkEle = document.head.querySelector('link[' + modeLinkAttr + ']');
	    if (linkEle) {
	        var href = linkEle.getAttribute(modeLinkAttr);
	        linkEle.removeAttribute(modeLinkAttr);
	        linkEle.href = href;
	    }
	    // set the mode class name
	    // ios/md
	    bodyEle.classList.add(mode);
	    var versions = platform.versions();
	    platform.platforms().forEach(function (platformName) {
	        // platform-ios
	        var platformClass = 'platform-' + platformName;
	        bodyEle.classList.add(platformClass);
	        var platformVersion = versions[platformName];
	        if (platformVersion) {
	            // platform-ios9
	            platformClass += platformVersion.major;
	            bodyEle.classList.add(platformClass);
	            // platform-ios9_3
	            bodyEle.classList.add(platformClass + '_' + platformVersion.minor);
	        }
	    });
	    // touch devices should not use :hover CSS pseudo
	    // enable :hover CSS when the "hoverCSS" setting is not false
	    if (config.get('hoverCSS') !== false) {
	        bodyEle.classList.add('enable-hover');
	    }
	    if (config.get('clickBlock')) {
	        clickBlock.enable();
	    }
	    // run feature detection tests
	    featureDetect.run(window, document);
	}
	/**
	 * Bind some global events and publish on the 'app' channel
	 */
	function bindEvents(window, document, platform, events) {
	    window.addEventListener('online', function (ev) {
	        events.publish('app:online', ev);
	    }, false);
	    window.addEventListener('offline', function (ev) {
	        events.publish('app:offline', ev);
	    }, false);
	    window.addEventListener('orientationchange', function (ev) {
	        events.publish('app:rotated', ev);
	    });
	    // When that status taps, we respond
	    window.addEventListener('statusTap', function (ev) {
	        // TODO: Make this more better
	        var el = document.elementFromPoint(platform.width() / 2, platform.height() / 2);
	        if (!el) {
	            return;
	        }
	        var content = dom_1.closest(el, 'scroll-content');
	        if (content) {
	            var scrollTo = new ScrollTo(content);
	            scrollTo.start(0, 0, 300, 0);
	        }
	    });
	    // start listening for resizes XXms after the app starts
	    setTimeout(function () {
	        window.addEventListener('resize', function () {
	            platform.windowResize();
	        });
	    }, 2000);
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("angular2")["core"];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("angular2")["router"];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("angular2")["http"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var browser_1 = __webpack_require__(7);
	var config_1 = __webpack_require__(8);
	var click_block_1 = __webpack_require__(12);
	var dom_1 = __webpack_require__(11);
	/**
	 * Component registry service.  For more information on registering
	 * components see the [IdRef API reference](../id/IdRef/).
	 */
	var IonicApp = (function () {
	    function IonicApp(config, clickBlock, zone) {
	        this._config = config;
	        this._zone = zone;
	        this._titleSrv = new browser_1.Title();
	        this._title = '';
	        this._disTime = 0;
	        this._clickBlock = clickBlock;
	        // Our component registry map
	        this.components = {};
	    }
	    /**
	     * Sets the document title.
	     * @param {string} val  Value to set the document title to.
	     */
	    IonicApp.prototype.setTitle = function (val) {
	        var self = this;
	        if (val !== self._title) {
	            self._title = val;
	            this._zone.runOutsideAngular(function () {
	                function setAppTitle() {
	                    self._titleSrv.setTitle(self._title);
	                }
	                dom_1.rafFrames(4, setAppTitle);
	            });
	        }
	    };
	    /**
	     * Sets if the app is currently enabled or not, meaning if it's
	     * available to accept new user commands. For example, this is set to `false`
	     * while views transition, a modal slides up, an action-sheet
	     * slides up, etc. After the transition completes it is set back to `true`.
	     * @param {bool} isEnabled
	     * @param {bool} fallback  When `isEnabled` is set to `false`, this argument
	     * is used to set the maximum number of milliseconds that app will wait until
	     * it will automatically enable the app again. It's basically a fallback incase
	     * something goes wrong during a transition and the app wasn't re-enabled correctly.
	     */
	    IonicApp.prototype.setEnabled = function (isEnabled, duration) {
	        if (duration === void 0) { duration = 700; }
	        this._disTime = (isEnabled ? 0 : Date.now() + duration);
	        if (duration > 32 || isEnabled) {
	            // only do a click block if the duration is longer than XXms
	            this._clickBlock.show(!isEnabled, duration + 64);
	        }
	    };
	    /**
	     * Boolean if the app is actively enabled or not.
	     * @return {bool}
	     */
	    IonicApp.prototype.isEnabled = function () {
	        return (this._disTime < Date.now());
	    };
	    /**
	     * Register a known component with a key, for easy lookups later.
	     * @param {TODO} id  The id to use to register the component
	     * @param {TODO} component  The component to register
	     */
	    IonicApp.prototype.register = function (id, component) {
	        if (this.components[id] && this.components[id] !== component) {
	        }
	        this.components[id] = component;
	    };
	    /**
	     * Unregister a known component with a key.
	     * @param {TODO} id  The id to use to unregister
	     */
	    IonicApp.prototype.unregister = function (id) {
	        delete this.components[id];
	    };
	    /**
	     * Get a registered component with the given type (returns the first)
	     * @param {Object} cls the type to search for
	     * @return the matching component, or undefined if none was found
	     */
	    IonicApp.prototype.getRegisteredComponent = function (cls) {
	        for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
	            var component = _a[_i];
	            if (component instanceof cls) {
	                return component;
	            }
	        }
	    };
	    /**
	     * Get the component for the given key.
	     * @param {TODO} key  TODO
	     * @return {TODO} TODO
	     */
	    IonicApp.prototype.getComponent = function (id) {
	        return this.components[id];
	    };
	    IonicApp = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof click_block_1.ClickBlock !== 'undefined' && click_block_1.ClickBlock) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
	    ], IonicApp);
	    return IonicApp;
	    var _a, _b, _c;
	})();
	exports.IonicApp = IonicApp;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("angular2")["platform"]["browser"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @ngdoc service
	* @name Config
	* @module ionic
	* @description
	* Config allows you to set the modes of your components
	*/
	var platform_1 = __webpack_require__(9);
	var util_1 = __webpack_require__(10);
	/**
	 * Config lets you change multiple or a single value in an apps mode configuration. Things such as tab placement, icon changes, and view animations can be set here.
	 *
	 * ```ts
	 * @App({
	 *   template: `<ion-nav [root]="root"></ion-nav>`
	 *   config: {
	 *     backButtonText: 'Go Back',
	 *     iconMode: 'ios',
	 *     modalEnter: 'modal-slide-in',
	 *     modalLeave: 'modal-slide-out',
	 *     tabbarPlacement: 'bottom',
	 *     pageTransition: 'ios',
	 *   }
	 * })
	 * ```
	 *
	 * Config can be overwritting at multiple levels, allowing deeper configuration. Taking the example from earlier, we can override any setting we want based on a platform.
	 * ```ts
	 * @App({
	 *   template: `<ion-nav [root]="root"></ion-nav>`
	 *   config: {
	 *     tabbarPlacement: 'bottom',
	 *     platforms: {
	 *      ios: {
	 *        tabbarPlacement: 'top',
	 *      }
	 *     }
	 *   }
	 * })
	 * ```
	 *
	 * We could also configure these values at a component level. Take `tabbarPlacement`, we can configure this as a property on our `ion-tabs`.
	 *
	 * ```html
	 * <ion-tabs tabbar-placement="top">
	 *    <ion-tab tab-title="Dash" tab-icon="pulse" [root]="tabRoot"></ion-tab>
	 *  </ion-tabs>
	 * ```
	 *
	 * The property will override anything else set in the apps.
	 *
	 * The last way we could configure is through URL query strings. This is useful for testing while in the browser.
	 * Simply add `?ionic<PROPERTYNAME>=<value>` to the url.
	 *
	 * ```bash
	 * http://localhost:8100/?ionicTabbarPlacement=bottom
	 * ```
	 *
	 * A config value can come from anywhere and be anything, but there are a default set of values.
	 *
	 * ``` javascript
	 * // iOS
	 * activator: 'highlight',
	 * actionSheetEnter: 'action-sheet-slide-in',
	 * actionSheetLeave: 'action-sheet-slide-out',
	 * actionSheetCancelIcon: '',
	 * actionSheetDestructiveIcon: '',
	 * backButtonText: 'Back',
	 * backButtonIcon: 'ion-ios-arrow-back',
	 * iconMode: 'ios',
	 * menuType: 'reveal',
	 * modalEnter: 'modal-slide-in',
	 * modalLeave: 'modal-slide-out',
	 * pageTransition: 'ios-transition',
	 * pageTransitionDelay: 16,
	 * popupEnter: 'popup-pop-in',
	 * popupLeave: 'popup-pop-out',
	 * tabbarPlacement: 'bottom',

	 * // MD
	 * activator: 'ripple',
	 * actionSheetEnter: 'action-sheet-md-slide-in',
	 * actionSheetLeave: 'action-sheet-md-slide-out',
	 * actionSheetCancelIcon: 'ion-md-close',
	 * actionSheetDestructiveIcon: 'ion-md-trash',
	 * backButtonText: '',
	 * backButtonIcon: 'ion-md-arrow-back',
	 * iconMode: 'md',
	 * menuType: 'overlay',
	 * modalEnter: 'modal-md-slide-in',
	 * modalLeave: 'modal-md-slide-out',
	 * pageTransition: 'md-transition',
	 * pageTransitionDelay: 120,
	 * popupEnter: 'popup-md-pop-in',
	 * popupLeave: 'popup-md-pop-out',
	 * tabbarHighlight: true,
	 * tabbarPlacement: 'top',
	 * tabSubPages: true,
	 * ```
	 *
	 *
	**/
	var Config = (function () {
	    function Config(config) {
	        this._s = config && util_1.isObject(config) && !util_1.isArray(config) ? config : {};
	        this._c = {}; // cached values
	    }
	    /**
	     * For setting and getting multiple config values
	     */
	    /**
	     * @private
	     * @name settings()
	     * @description
	     */
	    Config.prototype.settings = function () {
	        var args = arguments;
	        switch (args.length) {
	            case 0:
	                return this._s;
	            case 1:
	                // settings({...})
	                this._s = args[0];
	                this._c = {}; // clear cache
	                break;
	            case 2:
	                // settings('ios', {...})
	                this._s.platforms = this._s.platforms || {};
	                this._s.platforms[args[0]] = args[1];
	                this._c = {}; // clear cache
	                break;
	        }
	        return this;
	    };
	    /**
	    * For setting a single config values
	    */
	    /**
	     * @private
	     * @name set()
	     * @description
	     */
	    Config.prototype.set = function () {
	        var args = arguments;
	        var arg0 = args[0];
	        var arg1 = args[1];
	        switch (args.length) {
	            case 2:
	                // set('key', 'value') = set key/value pair
	                // arg1 = value
	                this._s[arg0] = arg1;
	                delete this._c[arg0]; // clear cache
	                break;
	            case 3:
	                // setting('ios', 'key', 'value') = set key/value pair for platform
	                // arg0 = platform
	                // arg1 = key
	                // arg2 = value
	                this._s.platforms = this._s.platforms || {};
	                this._s.platforms[arg0] = this._s.platforms[arg0] || {};
	                this._s.platforms[arg0][arg1] = args[2];
	                delete this._c[arg1]; // clear cache
	                break;
	        }
	        return this;
	    };
	    /**
	     * For getting a single config values
	     */
	    /**
	     * @private
	     * @name get()
	     * @description
	     */
	    Config.prototype.get = function (key) {
	        if (!util_1.isDefined(this._c[key])) {
	            // if the value was already set this will all be skipped
	            // if there was no user config then it'll check each of
	            // the user config's platforms, which already contains
	            // settings from default platform configs
	            var userPlatformValue = undefined;
	            var userDefaultValue = this._s[key];
	            var userPlatformModeValue = undefined;
	            var userDefaultModeValue = undefined;
	            var platformValue = undefined;
	            var platformModeValue = undefined;
	            var configObj = null;
	            if (this._platform) {
	                var queryStringValue = this._platform.query('ionic' + key.toLowerCase());
	                if (util_1.isDefined(queryStringValue)) {
	                    return this._c[key] = (queryStringValue === 'true' ? true : queryStringValue === 'false' ? false : queryStringValue);
	                }
	                // check the platform settings object for this value
	                // loop though each of the active platforms
	                // array of active platforms, which also knows the hierarchy,
	                // with the last one the most important
	                var activePlatformKeys = this._platform.platforms();
	                // loop through all of the active platforms we're on
	                for (var i = 0, l = activePlatformKeys.length; i < l; i++) {
	                    // get user defined platform values
	                    if (this._s.platforms) {
	                        configObj = this._s.platforms[activePlatformKeys[i]];
	                        if (configObj) {
	                            if (util_1.isDefined(configObj[key])) {
	                                userPlatformValue = configObj[key];
	                            }
	                            configObj = Config.getModeConfig(configObj.mode);
	                            if (configObj && util_1.isDefined(configObj[key])) {
	                                userPlatformModeValue = configObj[key];
	                            }
	                        }
	                    }
	                    // get default platform's setting
	                    configObj = platform_1.Platform.get(activePlatformKeys[i]);
	                    if (configObj && configObj.settings) {
	                        if (util_1.isDefined(configObj.settings[key])) {
	                            // found a setting for this platform
	                            platformValue = configObj.settings[key];
	                        }
	                        configObj = Config.getModeConfig(configObj.settings.mode);
	                        if (configObj && util_1.isDefined(configObj[key])) {
	                            // found setting for this platform's mode
	                            platformModeValue = configObj[key];
	                        }
	                    }
	                }
	            }
	            configObj = Config.getModeConfig(this._s.mode);
	            if (configObj && util_1.isDefined(configObj[key])) {
	                userDefaultModeValue = configObj[key];
	            }
	            // cache the value
	            this._c[key] = util_1.isDefined(userPlatformValue) ? userPlatformValue :
	                util_1.isDefined(userDefaultValue) ? userDefaultValue :
	                    util_1.isDefined(userPlatformModeValue) ? userPlatformModeValue :
	                        util_1.isDefined(userDefaultModeValue) ? userDefaultModeValue :
	                            util_1.isDefined(platformValue) ? platformValue :
	                                util_1.isDefined(platformModeValue) ? platformModeValue :
	                                    null;
	        }
	        // return key's value
	        // either it came directly from the user config
	        // or it was from the users platform configs
	        // or it was from the default platform configs
	        // in that order
	        if (util_1.isFunction(this._c[key])) {
	            return this._c[key](this._platform);
	        }
	        return this._c[key];
	    };
	    /**
	     * @private
	     */
	    Config.prototype.setPlatform = function (platform) {
	        this._platform = platform;
	    };
	    Config.setModeConfig = function (mode, config) {
	        modeConfigs[mode] = config;
	    };
	    Config.getModeConfig = function (mode) {
	        return modeConfigs[mode] || null;
	    };
	    return Config;
	})();
	exports.Config = Config;
	var modeConfigs = {};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+* @ngdoc service
	+* @name platform
	+* @module ionic
	+* @description
	+* Platform returns the availble information about your current platform
	+*/
	var util_1 = __webpack_require__(10);
	var dom_1 = __webpack_require__(11);
	/**
	 * TODO
	 */
	var Platform = (function () {
	    function Platform(platforms) {
	        var _this = this;
	        if (platforms === void 0) { platforms = []; }
	        this._platforms = platforms;
	        this._versions = {};
	        this._onResizes = [];
	        this._readyPromise = new Promise(function (res) { _this._readyResolve = res; });
	    }
	    // Methods
	    // **********************************************
	    /**
	     * @param {string} platformName
	     * @returns {bool} returns true/false based on platform you place
	     * @description
	     * Depending on the platform name, isPlatform will return true or flase
	     *
	     * ```
	     * import {Platform} 'ionic/ionic';
	     * export MyClass {
	     *    constructor(platform: Platform){
	     *      this.platform = platform;
	     *      if(this.platform.is('ios'){
	     *        // what ever you need to do for
	     *        // if the platfomr is ios
	     *      }
	     *    }
	     * }
	     * ```
	     */
	    Platform.prototype.is = function (platformName) {
	        return (this._platforms.indexOf(platformName) > -1);
	    };
	    /**
	     * @returns {array} the array of platforms
	     * @description
	     * Depending on what device you are on, `platforms` can return multiple values.
	     * Each possible value is a hierarchy of platforms. For example, on an iPhone,
	     * it would return mobile, ios, and iphone.
	     *
	     * ```
	     * import {Platform} 'ionic/ionic';
	     * export MyClass {
	     *    constructor(platform: Platform){
	     *      this.platform = platform;
	     *      console.log(this.platform.platforms());
	     *      // This will return an array of all the availble platforms
	     *      // From if your on mobile, to mobile os, and device name
	     *    }
	     * }
	     * ```
	     */
	    Platform.prototype.platforms = function () {
	        // get the array of active platforms, which also knows the hierarchy,
	        // with the last one the most important
	        return this._platforms;
	    };
	    /**
	     * @param {string} optional platformName
	     * @returns {object} An object with various platform info
	     * - `{object=} `cordova`
	     * - `{object=}` `platformOS` {str: "9.1", num: 9.1, major: 9, minor: 1}
	     * - `{object=} `deviceName` Returns the name of the device
	     * - `{object=}` `device platform` R
	     * @description
	     * Returns an object conta
	     *
	     * ```
	     * import {Platform} 'ionic/ionic';
	     * export MyClass {
	     *    constructor(platform: Platform){
	     *      this.platform = platform;
	     *      console.log(this.platform.versions());
	     *      // or pass in a platform name
	     *      console.log(this.platform.versions('ios'));
	     *    }
	     * }
	     * ```
	     *
	     */
	    Platform.prototype.versions = function (platformName) {
	        if (arguments.length) {
	            // get a specific platform's version
	            return this._versions[platformName];
	        }
	        // get all the platforms that have a valid parsed version
	        return this._versions;
	    };
	    Platform.prototype.version = function () {
	        for (var platformName in this._versions) {
	            if (this._versions[platformName]) {
	                return this._versions[platformName];
	            }
	        }
	        return {};
	    };
	    /**
	     * @returns {promise}
	     * @description
	     * Returns a promise when the platform is ready and native functionality can be called
	     *
	     * ```
	     * import {Platform} 'ionic/ionic';
	     * export MyClass {
	     *    constructor(platform: Platform){
	     *      this.platform = platform;
	     *      this.platform.ready().then(() => {
	     *        console.log('Platform ready');
	     *        // The platform is now ready, execute any native code you want
	     *       });
	     *    }
	     * }
	     * ```
	     */
	    Platform.prototype.ready = function () {
	        return this._readyPromise;
	    };
	    /**
	     * @private
	     * TODO
	     * @param {TODO} config  TODO
	     * @returns {TODO} TODO
	     */
	    Platform.prototype.prepareReady = function (config) {
	        var self = this;
	        function resolve() {
	            self._readyResolve(config);
	        }
	        if (this._engineReady) {
	            // the engine provide a ready promise, use this instead
	            this._engineReady(resolve);
	        }
	        else {
	            // there is no custom ready method from the engine
	            // use the default dom ready
	            dom_1.ready(resolve);
	        }
	    };
	    // Methods meant to be overridden by the engine
	    // **********************************************
	    // Provided NOOP methods so they do not error when
	    // called by engines (the browser) doesn't provide them
	    Platform.prototype.on = function () { };
	    Platform.prototype.onHardwareBackButton = function () { };
	    Platform.prototype.registerBackButtonAction = function () { };
	    Platform.prototype.exitApp = function () { };
	    Platform.prototype.fullScreen = function () { };
	    Platform.prototype.showStatusBar = function () { };
	    // Getter/Setter Methods
	    // **********************************************
	    Platform.prototype.url = function (val) {
	        if (arguments.length) {
	            this._url = val;
	            this._qs = util_1.getQuerystring(val);
	        }
	        return this._url;
	    };
	    Platform.prototype.query = function (key) {
	        return (this._qs || {})[key];
	    };
	    Platform.prototype.userAgent = function (val) {
	        if (arguments.length) {
	            this._ua = val;
	        }
	        return this._ua || '';
	    };
	    Platform.prototype.navigatorPlatform = function (val) {
	        if (arguments.length) {
	            this._bPlt = val;
	        }
	        return this._bPlt || '';
	    };
	    Platform.prototype.width = function () {
	        return dom_1.windowDimensions().width;
	    };
	    Platform.prototype.height = function () {
	        return dom_1.windowDimensions().height;
	    };
	    Platform.prototype.isPortrait = function () {
	        return this.width() < this.height();
	    };
	    Platform.prototype.isLandscape = function () {
	        return !this.isPortrait();
	    };
	    Platform.prototype.windowResize = function () {
	        var self = this;
	        clearTimeout(self._resizeTimer);
	        self._resizeTimer = setTimeout(function () {
	            dom_1.flushDimensionCache();
	            for (var i = 0; i < self._onResizes.length; i++) {
	                try {
	                    self._onResizes[i]();
	                }
	                catch (e) {
	                    console.error(e);
	                }
	            }
	        }, 500);
	    };
	    Platform.prototype.onResize = function (cb) {
	        this._onResizes.push(cb);
	    };
	    // Platform Registry
	    // **********************************************
	    /**
	     * TODO
	     * @param {TODO} platformConfig  TODO
	     */
	    Platform.register = function (platformConfig) {
	        platformRegistry[platformConfig.name] = platformConfig;
	    };
	    Platform.registry = function () {
	        return platformRegistry;
	    };
	    /**
	     * TODO
	     * @param {TODO} platformName  TODO
	     * @returns {string} TODO
	     */
	    Platform.get = function (platformName) {
	        return platformRegistry[platformName] || {};
	    };
	    Platform.setDefault = function (platformName) {
	        platformDefault = platformName;
	    };
	    /**
	     * TODO
	     * @param {TODO} queryValue  TODO
	     * @returns {boolean} TODO
	     */
	    Platform.prototype.testQuery = function (queryValue, queryTestValue) {
	        var valueSplit = queryValue.toLowerCase().split(';');
	        return valueSplit.indexOf(queryTestValue) > -1;
	    };
	    /**
	     * TODO
	     * @param {TODO} userAgentExpression  TODO
	     * @returns {boolean} TODO
	     */
	    Platform.prototype.testUserAgent = function (userAgentExpression) {
	        var rgx = new RegExp(userAgentExpression, 'i');
	        return rgx.test(this._ua || '');
	    };
	    /**
	     * TODO
	     * @param {TODO} navigatorPlatformExpression  TODO
	     * @returns {boolean} TODO
	     */
	    Platform.prototype.testNavigatorPlatform = function (navigatorPlatformExpression) {
	        if (navigatorPlatformExpression && this._bPlt) {
	            var rgx = new RegExp(navigatorPlatformExpression, 'i');
	            return rgx.test(this._bPlt);
	        }
	    };
	    /**
	     * TODO
	     * @param {TODO} userAgentExpression  TODO
	     * @returns {Object} TODO
	     */
	    Platform.prototype.matchUserAgentVersion = function (userAgentExpression) {
	        if (this._ua && userAgentExpression) {
	            var val = this._ua.match(userAgentExpression);
	            if (val) {
	                return {
	                    major: val[1],
	                    minor: val[2]
	                };
	            }
	        }
	    };
	    /**
	     * TODO
	     * @param {TODO} queryValue  TODO
	     * @param {TODO} userAgentExpression  TODO
	     * @returns {boolean} TODO
	     */
	    Platform.prototype.isPlatform = function (queryTestValue, userAgentExpression) {
	        if (!userAgentExpression) {
	            userAgentExpression = queryTestValue;
	        }
	        var queryValue = this.query('ionicplatform');
	        if (queryValue) {
	            return this.testQuery(queryValue, queryTestValue);
	        }
	        return this.testUserAgent(userAgentExpression);
	    };
	    /**
	     * TODO
	     * @param {TODO} config  TODO
	     */
	    Platform.prototype.load = function (platformOverride) {
	        var rootPlatformNode = null;
	        var engineNode = null;
	        var self = this;
	        this.platformOverride = platformOverride;
	        // figure out the most specific platform and active engine
	        var tmpPlatform = null;
	        for (var platformName in platformRegistry) {
	            tmpPlatform = this.matchPlatform(platformName);
	            if (tmpPlatform) {
	                // we found a platform match!
	                // check if its more specific than the one we already have
	                if (tmpPlatform.isEngine) {
	                    // because it matched then this should be the active engine
	                    // you cannot have more than one active engine
	                    engineNode = tmpPlatform;
	                }
	                else if (!rootPlatformNode || tmpPlatform.depth > rootPlatformNode.depth) {
	                    // only find the root node for platforms that are not engines
	                    // set this node as the root since we either don't already
	                    // have one, or this one is more specific that the current one
	                    rootPlatformNode = tmpPlatform;
	                }
	            }
	        }
	        if (!rootPlatformNode) {
	            rootPlatformNode = new PlatformNode(platformDefault);
	        }
	        // build a Platform instance filled with the
	        // hierarchy of active platforms and settings
	        if (rootPlatformNode) {
	            // check if we found an engine node (cordova/node-webkit/etc)
	            if (engineNode) {
	                // add the engine to the first in the platform hierarchy
	                // the original rootPlatformNode now becomes a child
	                // of the engineNode, which is not the new root
	                engineNode.child(rootPlatformNode);
	                rootPlatformNode.parent(engineNode);
	                rootPlatformNode = engineNode;
	                // add any events which the engine would provide
	                // for example, Cordova provides its own ready event
	                var engineMethods = engineNode.methods();
	                engineMethods._engineReady = engineMethods.ready;
	                delete engineMethods.ready;
	                util_1.extend(this, engineMethods);
	            }
	            var platformNode = rootPlatformNode;
	            while (platformNode) {
	                insertSuperset(platformNode);
	                platformNode = platformNode.child();
	            }
	            // make sure the root noot is actually the root
	            // incase a node was inserted before the root
	            platformNode = rootPlatformNode.parent();
	            while (platformNode) {
	                rootPlatformNode = platformNode;
	                platformNode = platformNode.parent();
	            }
	            platformNode = rootPlatformNode;
	            while (platformNode) {
	                // set the array of active platforms with
	                // the last one in the array the most important
	                this._platforms.push(platformNode.name());
	                // get the platforms version if a version parser was provided
	                this._versions[platformNode.name()] = platformNode.version(this);
	                // go to the next platform child
	                platformNode = platformNode.child();
	            }
	        }
	    };
	    /**
	     * TODO
	     * @param {TODO} platformName  TODO
	     * @returns {TODO} TODO
	     */
	    Platform.prototype.matchPlatform = function (platformName) {
	        // build a PlatformNode and assign config data to it
	        // use it's getRoot method to build up its hierarchy
	        // depending on which platforms match
	        var platformNode = new PlatformNode(platformName);
	        var rootNode = platformNode.getRoot(this, 0);
	        if (rootNode) {
	            rootNode.depth = 0;
	            var childPlatform = rootNode.child();
	            while (childPlatform) {
	                rootNode.depth++;
	                childPlatform = childPlatform.child();
	            }
	        }
	        return rootNode;
	    };
	    return Platform;
	})();
	exports.Platform = Platform;
	function insertSuperset(platformNode) {
	    var supersetPlaformName = platformNode.superset();
	    if (supersetPlaformName) {
	        // add a platform in between two exist platforms
	        // so we can build the correct hierarchy of active platforms
	        var supersetPlatform = new PlatformNode(supersetPlaformName);
	        supersetPlatform.parent(platformNode.parent());
	        supersetPlatform.child(platformNode);
	        if (supersetPlatform.parent()) {
	            supersetPlatform.parent().child(supersetPlatform);
	        }
	        platformNode.parent(supersetPlatform);
	    }
	}
	var PlatformNode = (function () {
	    function PlatformNode(platformName) {
	        this.c = Platform.get(platformName);
	        this.isEngine = this.c.isEngine;
	    }
	    PlatformNode.prototype.name = function () {
	        return this.c.name;
	    };
	    PlatformNode.prototype.settings = function () {
	        return this.c.settings || {};
	    };
	    PlatformNode.prototype.superset = function () {
	        return this.c.superset;
	    };
	    PlatformNode.prototype.methods = function () {
	        return this.c.methods || {};
	    };
	    PlatformNode.prototype.parent = function (val) {
	        if (arguments.length) {
	            this._parent = val;
	        }
	        return this._parent;
	    };
	    PlatformNode.prototype.child = function (val) {
	        if (arguments.length) {
	            this._child = val;
	        }
	        return this._child;
	    };
	    PlatformNode.prototype.isMatch = function (p) {
	        if (p.platformOverride && !this.isEngine) {
	            return (p.platformOverride === this.c.name);
	        }
	        else if (!this.c.isMatch) {
	            return false;
	        }
	        return this.c.isMatch(p);
	    };
	    PlatformNode.prototype.version = function (p) {
	        if (this.c.versionParser) {
	            var v = this.c.versionParser(p);
	            if (v) {
	                var str = v.major + '.' + v.minor;
	                return {
	                    str: str,
	                    num: parseFloat(str),
	                    major: parseInt(v.major, 10),
	                    minor: parseInt(v.minor, 10)
	                };
	            }
	        }
	    };
	    PlatformNode.prototype.getRoot = function (p) {
	        if (this.isMatch(p)) {
	            var parents = this.getSubsetParents(this.name());
	            if (!parents.length) {
	                return this;
	            }
	            var platform = null;
	            var rootPlatform = null;
	            for (var i = 0; i < parents.length; i++) {
	                platform = new PlatformNode(parents[i]);
	                platform.child(this);
	                rootPlatform = platform.getRoot(p);
	                if (rootPlatform) {
	                    this.parent(platform);
	                    return rootPlatform;
	                }
	            }
	        }
	        return null;
	    };
	    PlatformNode.prototype.getSubsetParents = function (subsetPlatformName) {
	        var platformRegistry = Platform.registry();
	        var parentPlatformNames = [];
	        var platform = null;
	        for (var platformName in platformRegistry) {
	            platform = platformRegistry[platformName];
	            if (platform.subsets && platform.subsets.indexOf(subsetPlatformName) > -1) {
	                parentPlatformNames.push(platformName);
	            }
	        }
	        return parentPlatformNames;
	    };
	    return PlatformNode;
	})();
	var platformRegistry = {};
	var platformDefault = null;

/***/ },
/* 10 */
/***/ function(module, exports) {

	// Simple noop function
	function noop() { }
	exports.noop = noop;
	;
	/**
	 * Given a min and max, restrict the given number
	 * to the range.
	 * @param min the minimum
	 * @param n the value
	 * @param max the maximum
	 */
	function clamp(min, n, max) {
	    return Math.max(min, Math.min(n, max));
	}
	exports.clamp = clamp;
	/**
	 * Extend the destination with an arbitrary number of other objects.
	 * @param dst the destination
	 * @param ... the param objects
	 */
	function extend(dst) {
	    return _baseExtend(dst, [].slice.call(arguments, 1), false);
	}
	exports.extend = extend;
	/**
	 * Do a deep extend (merge).
	 * @param dst the destination
	 * @param ... the param objects
	 */
	function merge(dst) {
	    return _baseExtend(dst, [].slice.call(arguments, 1), true);
	}
	exports.merge = merge;
	function _baseExtend(dst, objs, deep) {
	    for (var i = 0, ii = objs.length; i < ii; ++i) {
	        var obj = objs[i];
	        if (!obj || !exports.isObject(obj) && !exports.isFunction(obj))
	            continue;
	        var keys = Object.keys(obj);
	        for (var j = 0, jj = keys.length; j < jj; j++) {
	            var key = keys[j];
	            var src = obj[key];
	            if (deep && exports.isObject(src)) {
	                if (!exports.isObject(dst[key]))
	                    dst[key] = exports.isArray(src) ? [] : {};
	                _baseExtend(dst[key], [src], true);
	            }
	            else {
	                dst[key] = src;
	            }
	        }
	    }
	    return dst;
	}
	function debounce(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	    return function () {
	        context = this;
	        args = arguments;
	        timestamp = new Date();
	        var later = function () {
	            var last = (new Date()) - timestamp;
	            if (last < wait) {
	                timeout = setTimeout(later, wait - last);
	            }
	            else {
	                timeout = null;
	                if (!immediate)
	                    result = func.apply(context, args);
	            }
	        };
	        var callNow = immediate && !timeout;
	        if (!timeout) {
	            timeout = setTimeout(later, wait);
	        }
	        if (callNow)
	            result = func.apply(context, args);
	        return result;
	    };
	}
	exports.debounce = debounce;
	/**
	 * Apply default arguments if they don't exist in
	 * the first object.
	 * @param the destination to apply defaults to.
	 */
	function defaults(dest) {
	    for (var i = arguments.length - 1; i >= 1; i--) {
	        var source = arguments[i] || {};
	        for (var key in source) {
	            if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
	                dest[key] = source[key];
	            }
	        }
	    }
	    return dest;
	}
	exports.defaults = defaults;
	exports.isBoolean = function (val) { return typeof val === 'boolean'; };
	exports.isString = function (val) { return typeof val === 'string'; };
	exports.isNumber = function (val) { return typeof val === 'number'; };
	exports.isFunction = function (val) { return typeof val === 'function'; };
	exports.isDefined = function (val) { return typeof val !== 'undefined'; };
	exports.isUndefined = function (val) { return typeof val === 'undefined'; };
	exports.isBlank = function (val) { return val === undefined || val === null; };
	exports.isObject = function (val) { return typeof val === 'object'; };
	exports.isArray = Array.isArray;
	exports.isTrueProperty = function (val) { return typeof val !== 'undefined' && val !== "false"; };
	/**
	 * Convert a string in the format thisIsAString to a slug format this-is-a-string
	 */
	function pascalCaseToDashCase(str) {
	    if (str === void 0) { str = ''; }
	    return str.charAt(0).toLowerCase() + str.substring(1).replace(/[A-Z]/g, function (match) {
	        return '-' + match.toLowerCase();
	    });
	}
	exports.pascalCaseToDashCase = pascalCaseToDashCase;
	var uid = 0;
	function nextUid() {
	    return ++uid;
	}
	exports.nextUid = nextUid;
	exports.array = {
	    find: function (arr, cb) {
	        for (var i = 0, ii = arr.length; i < ii; i++) {
	            if (cb(arr[i], i))
	                return arr[i];
	        }
	    },
	    remove: function (arr, itemOrIndex) {
	        var index = -1;
	        if (exports.isNumber(itemOrIndex)) {
	            index = itemOrIndex;
	        }
	        else {
	            index = arr.indexOf(itemOrIndex);
	        }
	        if (index < 0) {
	            return false;
	        }
	        arr.splice(index, 1);
	        return true;
	    }
	};
	/**
	 * Grab the query string param value for the given key.
	 * @param key the key to look for
	 */
	function getQuerystring(url, key) {
	    var queryParams = {};
	    if (url) {
	        var startIndex = url.indexOf('?');
	        if (startIndex !== -1) {
	            var queries = url.slice(startIndex + 1).split('&');
	            queries.forEach(function (param) {
	                var split = param.split('=');
	                queryParams[split[0].toLowerCase()] = split[1].split('#')[0];
	            });
	        }
	        if (key) {
	            return queryParams[key] || '';
	        }
	    }
	    return queryParams;
	}
	exports.getQuerystring = getQuerystring;
	/**
	 * Throttle the given fun, only allowing it to be
	 * called at most every `wait` ms.
	 */
	function throttle(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    options || (options = {});
	    var later = function () {
	        previous = options.leading === false ? 0 : Date.now();
	        timeout = null;
	        result = func.apply(context, args);
	    };
	    return function () {
	        var now = Date.now();
	        if (!previous && options.leading === false)
	            previous = now;
	        var remaining = wait - (now - previous);
	        context = this;
	        args = arguments;
	        if (remaining <= 0) {
	            clearTimeout(timeout);
	            timeout = null;
	            previous = now;
	            result = func.apply(context, args);
	        }
	        else if (!timeout && options.trailing !== false) {
	            timeout = setTimeout(later, remaining);
	        }
	        return result;
	    };
	}
	exports.throttle = throttle;

/***/ },
/* 11 */
/***/ function(module, exports) {

	var nativeRaf = window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame;
	var nativeCancelRaf = window.cancelAnimationFrame ||
	    window.webkitCancelAnimationFrame ||
	    window.webkitCancelRequestAnimationFrame;
	function raf(callback) {
	    //console.log('raf', callback.toString().replace(/\s/g, '').replace('function', '').substring(0, 50));
	    //console.log('raf, isRootZone()', zone.isRootZone(), '$id', zone.$id);
	    _raf(callback);
	}
	exports.raf = raf;
	var _raf = nativeRaf || function (callback) {
	    var timeCurrent = (new Date()).getTime(), timeDelta;
	    /* Dynamically set delay on a per-tick basis to match 60fps. */
	    /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
	    timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
	    timeLast = timeCurrent + timeDelta;
	    return setTimeout(function () { callback(timeCurrent + timeDelta); }, timeDelta);
	};
	exports.rafCancel = nativeRaf ? nativeCancelRaf : function (id) {
	    return window.cancelTimeout(id);
	};
	function rafFrames(framesToWait, callback) {
	    framesToWait = Math.ceil(framesToWait);
	    if (framesToWait < 2) {
	        raf(callback);
	    }
	    else {
	        setTimeout(function () {
	            raf(callback);
	        }, (framesToWait - 1) * 17);
	    }
	}
	exports.rafFrames = rafFrames;
	exports.CSS = {};
	(function () {
	    // transform
	    var i, keys = ['webkitTransform', 'transform', '-webkit-transform', 'webkit-transform',
	        '-moz-transform', 'moz-transform', 'MozTransform', 'mozTransform', 'msTransform'];
	    for (i = 0; i < keys.length; i++) {
	        if (document.documentElement.style[keys[i]] !== undefined) {
	            exports.CSS.transform = keys[i];
	            break;
	        }
	    }
	    // transition
	    keys = ['webkitTransition', 'mozTransition', 'msTransition', 'transition'];
	    for (i = 0; i < keys.length; i++) {
	        if (document.documentElement.style[keys[i]] !== undefined) {
	            exports.CSS.transition = keys[i];
	            break;
	        }
	    }
	    // The only prefix we care about is webkit for transitions.
	    var isWebkit = exports.CSS.transition.indexOf('webkit') > -1;
	    exports.CSS.prefix = isWebkit ? '-webkit-' : '';
	    // transition duration
	    exports.CSS.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration';
	    // To be sure transitionend works everywhere, include *both* the webkit and non-webkit events
	    exports.CSS.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend';
	})();
	if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
	    exports.CSS.animation = 'WebkitAnimation';
	    exports.CSS.animationStart = 'webkitAnimationStart animationstart';
	    exports.CSS.animationEnd = 'webkitAnimationEnd animationend';
	}
	else {
	    exports.CSS.animation = 'animation';
	    exports.CSS.animationStart = 'animationstart';
	    exports.CSS.animationEnd = 'animationend';
	}
	function transitionEnd(el) {
	    return cssPromise(el, exports.CSS.transitionEnd);
	}
	exports.transitionEnd = transitionEnd;
	function animationStart(el, animationName) {
	    return cssPromise(el, exports.CSS.animationStart, animationName);
	}
	exports.animationStart = animationStart;
	function animationEnd(el, animationName) {
	    return cssPromise(el, exports.CSS.animationEnd, animationName);
	}
	exports.animationEnd = animationEnd;
	function cssPromise(el, eventNames, animationName) {
	    return new Promise(function (resolve) {
	        eventNames.split(' ').forEach(function (eventName) {
	            el.addEventListener(eventName, onEvent);
	        });
	        function onEvent(ev) {
	            if (ev.animationName && animationName) {
	                // do not resolve if a bubbled up ev.animationName
	                // is not the same as the passed in animationName arg
	                if (ev.animationName !== animationName) {
	                    return;
	                }
	            }
	            else if (ev.target !== el) {
	                // do not resolve if the event's target element is not
	                // the same as the element the listener was added to
	                return;
	            }
	            ev.stopPropagation();
	            eventNames.split(' ').forEach(function (eventName) {
	                el.removeEventListener(eventName, onEvent);
	            });
	            resolve(ev);
	        }
	    });
	}
	function ready(callback) {
	    var promise = null;
	    if (!callback) {
	        // a callback wasn't provided, so let's return a promise instead
	        promise = new Promise(function (resolve) { callback = resolve; });
	    }
	    if (document.readyState === 'complete' || document.readyState === 'interactive') {
	        callback();
	    }
	    else {
	        function completed() {
	            document.removeEventListener('DOMContentLoaded', completed, false);
	            window.removeEventListener('load', completed, false);
	            callback();
	        }
	        document.addEventListener('DOMContentLoaded', completed, false);
	        window.addEventListener('load', completed, false);
	    }
	    return promise;
	}
	exports.ready = ready;
	function windowLoad(callback) {
	    var promise = null;
	    if (!callback) {
	        // a callback wasn't provided, so let's return a promise instead
	        promise = new Promise(function (resolve) { callback = resolve; });
	    }
	    if (document.readyState === 'complete') {
	        callback();
	    }
	    else {
	        function completed() {
	            window.removeEventListener('load', completed, false);
	            callback();
	        }
	        window.addEventListener('load', completed, false);
	    }
	    return promise;
	}
	exports.windowLoad = windowLoad;
	function pointerCoord(ev) {
	    // get coordinates for either a mouse click
	    // or a touch depending on the given event
	    var c = { x: 0, y: 0 };
	    if (ev) {
	        var touches = ev.touches && ev.touches.length ? ev.touches : [ev];
	        var e = (ev.changedTouches && ev.changedTouches[0]) || touches[0];
	        if (e) {
	            c.x = e.clientX || e.pageX || 0;
	            c.y = e.clientY || e.pageY || 0;
	        }
	    }
	    return c;
	}
	exports.pointerCoord = pointerCoord;
	function hasPointerMoved(threshold, startCoord, endCoord) {
	    return startCoord && endCoord &&
	        (Math.abs(startCoord.x - endCoord.x) > threshold || Math.abs(startCoord.y - endCoord.y) > threshold);
	}
	exports.hasPointerMoved = hasPointerMoved;
	function isActive(ele) {
	    return !!(ele && (document.activeElement === ele));
	}
	exports.isActive = isActive;
	function hasFocus(ele) {
	    return isActive(ele) && (ele.parentElement.querySelector(':focus') === ele);
	}
	exports.hasFocus = hasFocus;
	function isTextInput(ele) {
	    return !!ele &&
	        (ele.tagName == 'TEXTAREA' ||
	            ele.contentEditable === 'true' ||
	            (ele.tagName == 'INPUT' && !(/^(radio|checkbox|range|file|submit|reset|color|image|button)$/i).test(ele.type)));
	}
	exports.isTextInput = isTextInput;
	function hasFocusedTextInput() {
	    var ele = document.activeElement;
	    if (isTextInput(ele)) {
	        return (ele.parentElement.querySelector(':focus') === ele);
	    }
	    return false;
	}
	exports.hasFocusedTextInput = hasFocusedTextInput;
	var matchesFn;
	['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector'].some(function (fn) {
	    if (typeof document.documentElement[fn] == 'function') {
	        matchesFn = fn;
	    }
	});
	function closest(ele, selector, checkSelf) {
	    if (ele && matchesFn) {
	        // traverse parents
	        ele = (checkSelf ? ele : ele.parentElement);
	        while (ele !== null) {
	            if (ele[matchesFn](selector)) {
	                return ele;
	            }
	            ele = ele.parentElement;
	        }
	    }
	    return null;
	}
	exports.closest = closest;
	function removeElement(ele) {
	    ele && ele.parentNode && ele.parentNode.removeChild(ele);
	}
	exports.removeElement = removeElement;
	/**
	 * Get the element offsetWidth and offsetHeight. Values are cached
	 * to reduce DOM reads. Cache is cleared on a window resize.
	 * @param {TODO} ele  TODO
	 */
	function getDimensions(ion, ele) {
	    if (!ion._dimId) {
	        ion._dimId = ++dimensionIds;
	        if (ion._dimId % 1000 === 0) {
	            // periodically flush dimensions
	            flushDimensionCache();
	        }
	    }
	    var dimensions = dimensionCache[ion._dimId];
	    if (!dimensions) {
	        var ele_1 = ion.getNativeElement();
	        // make sure we got good values before caching
	        if (ele_1.offsetWidth && ele_1.offsetHeight) {
	            dimensions = dimensionCache[ion._dimId] = {
	                width: ele_1.offsetWidth,
	                height: ele_1.offsetHeight,
	                left: ele_1.offsetLeft,
	                top: ele_1.offsetTop
	            };
	        }
	        else {
	            // do not cache bad values
	            return { width: 0, height: 0, left: 0, top: 0 };
	        }
	    }
	    return dimensions;
	}
	exports.getDimensions = getDimensions;
	function windowDimensions() {
	    if (!dimensionCache.win) {
	        // make sure we got good values before caching
	        if (window.innerWidth && window.innerHeight) {
	            dimensionCache.win = {
	                width: window.innerWidth,
	                height: window.innerHeight
	            };
	        }
	        else {
	            // do not cache bad values
	            return { width: 0, height: 0 };
	        }
	    }
	    return dimensionCache.win;
	}
	exports.windowDimensions = windowDimensions;
	function flushDimensionCache() {
	    dimensionCache = {};
	}
	exports.flushDimensionCache = flushDimensionCache;
	var dimensionCache = {};
	var dimensionIds = 0;
	function isStaticPositioned(element) {
	    return (element.style.position || 'static') === 'static';
	}
	/**
	 * returns the closest, non-statically positioned parentOffset of a given element
	 * @param element
	 */
	function parentOffsetEl(element) {
	    var offsetParent = element.offsetParent || document;
	    while (offsetParent && offsetParent !== document && isStaticPositioned(offsetParent)) {
	        offsetParent = offsetParent.offsetParent;
	    }
	    return offsetParent || document;
	}
	exports.parentOffsetEl = parentOffsetEl;
	;
	/**
	 * Get the current coordinates of the element, relative to the offset parent.
	 * Read-only equivalent of [jQuery's position function](http://api.jquery.com/position/).
	 * @param {element} element The element to get the position of.
	 * @returns {object} Returns an object containing the properties top, left, width and height.
	 */
	function position(element) {
	    var elBCR = offset(element);
	    var offsetParentBCR = { top: 0, left: 0 };
	    var offsetParentEl = parentOffsetEl(element);
	    if (offsetParentEl != document) {
	        offsetParentBCR = offset(offsetParentEl);
	        offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
	        offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
	    }
	    var boundingClientRect = element.getBoundingClientRect();
	    return {
	        width: boundingClientRect.width || element.offsetWidth,
	        height: boundingClientRect.height || element.offsetHeight,
	        top: elBCR.top - offsetParentBCR.top,
	        left: elBCR.left - offsetParentBCR.left
	    };
	}
	exports.position = position;
	/**
	* Get the current coordinates of the element, relative to the document.
	* Read-only equivalent of [jQuery's offset function](http://api.jquery.com/offset/).
	* @param {element} element The element to get the offset of.
	* @returns {object} Returns an object containing the properties top, left, width and height.
	*/
	function offset(element) {
	    var boundingClientRect = element.getBoundingClientRect();
	    return {
	        width: boundingClientRect.width || element.offsetWidth,
	        height: boundingClientRect.height || element.offsetHeight,
	        top: boundingClientRect.top + (window.pageYOffset || document.documentElement.scrollTop),
	        left: boundingClientRect.left + (window.pageXOffset || document.documentElement.scrollLeft)
	    };
	}
	exports.offset = offset;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var CSS_CLICK_BLOCK = 'click-block-active';
	var DEFAULT_EXPIRE = 330;
	var cbEle, fallbackTimerId;
	var isShowing = false;
	/**
	 * @private
	 */
	var ClickBlock = (function () {
	    function ClickBlock() {
	    }
	    ClickBlock.prototype.enable = function () {
	        cbEle = document.createElement('click-block');
	        document.body.appendChild(cbEle);
	        cbEle.addEventListener('touchmove', function (ev) {
	            ev.preventDefault();
	            ev.stopPropagation();
	        });
	        this._enabled = true;
	    };
	    ClickBlock.prototype.show = function (shouldShow, expire) {
	        if (this._enabled) {
	            if (shouldShow) {
	                show(expire);
	            }
	            else {
	                hide();
	            }
	        }
	    };
	    return ClickBlock;
	})();
	exports.ClickBlock = ClickBlock;
	function show(expire) {
	    clearTimeout(fallbackTimerId);
	    fallbackTimerId = setTimeout(hide, expire || DEFAULT_EXPIRE);
	    if (!isShowing) {
	        cbEle.classList.add(CSS_CLICK_BLOCK);
	        isShowing = true;
	    }
	}
	function hide() {
	    clearTimeout(fallbackTimerId);
	    if (isShowing) {
	        cbEle.classList.remove(CSS_CLICK_BLOCK);
	        isShowing = false;
	    }
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var util_1 = __webpack_require__(14);
	/**
	 * @private
	 */
	var OverlayController = (function () {
	    function OverlayController() {
	    }
	    OverlayController.prototype.open = function (componentType, params, opts) {
	        var _this = this;
	        if (params === void 0) { params = {}; }
	        if (opts === void 0) { opts = {}; }
	        if (!this.nav) {
	            console.error('<ion-overlay></ion-overlay> required in root template (app.html) to use: ' + overlayType);
	            return Promise.reject();
	        }
	        var resolve, reject;
	        var promise = new Promise(function (res, rej) { resolve = res; reject = rej; });
	        opts.animation = opts.enterAnimation;
	        opts.animateFirst = true;
	        this.nav.push(componentType, params, opts).then(function (viewCtrl) {
	            if (viewCtrl && viewCtrl.instance) {
	                var self = _this;
	                function escape(ev) {
	                    if (ev.keyCode == 27 && self.nav.last() === viewCtrl) {
	                        viewCtrl.instance.close();
	                    }
	                }
	                viewCtrl.instance.close = function (data, closeOpts) {
	                    if (closeOpts === void 0) { closeOpts = {}; }
	                    util_1.extend(opts, closeOpts);
	                    opts.animation = opts.leaveAnimation;
	                    viewCtrl.instance.onClose && viewCtrl.instance.onClose(data);
	                    _this.nav.pop(opts);
	                    document.removeEventListener('keyup', escape, true);
	                };
	                document.addEventListener('keyup', escape, true);
	                resolve(viewCtrl.instance);
	            }
	            else {
	                reject();
	            }
	        }, function (rejectReason) {
	            console.error(rejectReason);
	        });
	        return promise;
	    };
	    OverlayController.prototype.getByType = function (overlayType) {
	        var overlay = this.nav.getByType(overlayType);
	        return overlay && overlay.instance;
	    };
	    OverlayController.prototype.getByHandle = function (handle, overlayType) {
	        var overlay = this.nav.getByHandle(handle);
	        return overlay && overlay.instance;
	    };
	    return OverlayController;
	})();
	exports.OverlayController = OverlayController;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var domUtil = __webpack_require__(11);
	exports.dom = domUtil;
	__export(__webpack_require__(10));

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	/**
	 * The Input component is used to focus text input elements.
	 *
	 * @usage
	 * ```html
	 * <ion-input>
	 *   <ion-label>Name</ion-label>
	 *   <input value="Name" type="text">
	 * </ion-input>
	 * ```
	 */
	var Form = (function () {
	    function Form() {
	        this._inputs = [];
	        this._focused = null;
	        this.focusCtrl(document);
	    }
	    Form.prototype.register = function (input) {
	        this._inputs.push(input);
	    };
	    Form.prototype.deregister = function (input) {
	        var index = this._inputs.indexOf(input);
	        if (index > -1) {
	            this._inputs.splice(index, 1);
	        }
	        if (input === this._focused) {
	            this._focused = null;
	        }
	    };
	    Form.prototype.focusCtrl = function (document) {
	        // raw DOM fun
	        var focusCtrl = document.createElement('focus-ctrl');
	        focusCtrl.setAttribute('aria-hidden', true);
	        this._blur = document.createElement('button');
	        this._blur.tabIndex = -1;
	        focusCtrl.appendChild(this._blur);
	        document.body.appendChild(focusCtrl);
	    };
	    Form.prototype.focusOut = function () {
	        console.debug('focusOut');
	        this._blur.focus();
	    };
	    Form.prototype.setAsFocused = function (input) {
	        this._focused = input;
	    };
	    /**
	     * Focuses the next input element, if it exists.
	     */
	    Form.prototype.focusNext = function (currentInput) {
	        console.debug('focusNext');
	        var index = this._inputs.indexOf(currentInput);
	        if (index > -1 && (index + 1) < this._inputs.length) {
	            var nextInput = this._inputs[index + 1];
	            if (nextInput !== this._focused) {
	                return nextInput.initFocus();
	            }
	        }
	        index = this._inputs.indexOf(this._focused);
	        if (index > 0) {
	            var previousInput = this._inputs[index - 1];
	            if (previousInput) {
	                previousInput.initFocus();
	            }
	        }
	    };
	    Form = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Form);
	    return Form;
	})();
	exports.Form = Form;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var config_1 = __webpack_require__(8);
	var form_1 = __webpack_require__(15);
	var dom_1 = __webpack_require__(11);
	var Keyboard = (function () {
	    function Keyboard(config, form, zone) {
	        var _this = this;
	        this.form = form;
	        this.zone = zone;
	        zone.runOutsideAngular(function () {
	            _this.focusOutline(config.get('focusOutline'), document);
	        });
	    }
	    Keyboard.prototype.isOpen = function () {
	        return dom_1.hasFocusedTextInput();
	    };
	    Keyboard.prototype.onClose = function (callback, pollingInternval) {
	        if (pollingInternval === void 0) { pollingInternval = KEYBOARD_CLOSE_POLLING; }
	        var self = this;
	        var promise = null;
	        if (!callback) {
	            // a callback wasn't provided, so let's return a promise instead
	            promise = new Promise(function (resolve) { callback = resolve; });
	        }
	        self.zone.runOutsideAngular(function () {
	            function checkKeyboard() {
	                if (!self.isOpen()) {
	                    dom_1.rafFrames(30, function () {
	                        self.zone.run(function () {
	                            console.debug('keyboard closed');
	                            callback();
	                        });
	                    });
	                }
	                else {
	                    setTimeout(checkKeyboard, pollingInternval);
	                }
	            }
	            setTimeout(checkKeyboard, pollingInternval);
	        });
	        return promise;
	    };
	    Keyboard.prototype.close = function () {
	        var _this = this;
	        dom_1.raf(function () {
	            if (dom_1.hasFocusedTextInput()) {
	                // only focus out when a text input has focus
	                _this.form.focusOut();
	            }
	        });
	    };
	    Keyboard.prototype.focusOutline = function (setting, document) {
	        /* Focus Outline
	         * --------------------------------------------------
	         * By default, when a keydown event happens from a tab key, then
	         * the 'focus-outline' css class is added to the body element
	         * so focusable elements have an outline. On a mousedown or
	         * touchstart event, then the 'focus-outline' css class is removed.
	         *
	         * Config default overrides:
	         * focusOutline: true     - Always add the focus-outline
	         * focusOutline: false    - Do not add the focus-outline
	         */
	        var self = this;
	        var isKeyInputEnabled = false;
	        function cssClass() {
	            dom_1.raf(function () {
	                document.body.classList[isKeyInputEnabled ? 'add' : 'remove']('focus-outline');
	            });
	        }
	        if (setting === true) {
	            isKeyInputEnabled = true;
	            return cssClass();
	        }
	        else if (setting === false) {
	            return;
	        }
	        // default is to add the focus-outline when the tab key is used
	        function keyDown(ev) {
	            if (!isKeyInputEnabled && ev.keyCode == 9) {
	                isKeyInputEnabled = true;
	                enableKeyInput();
	            }
	        }
	        function pointerDown() {
	            isKeyInputEnabled = false;
	            enableKeyInput();
	        }
	        function enableKeyInput() {
	            cssClass();
	            self.zone.runOutsideAngular(function () {
	                document.removeEventListener('mousedown', pointerDown);
	                document.removeEventListener('touchstart', pointerDown);
	                if (isKeyInputEnabled) {
	                    document.addEventListener('mousedown', pointerDown);
	                    document.addEventListener('touchstart', pointerDown);
	                }
	            });
	        }
	        document.addEventListener('keydown', keyDown);
	    };
	    Keyboard = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
	    ], Keyboard);
	    return Keyboard;
	    var _a, _b, _c;
	})();
	exports.Keyboard = Keyboard;
	var KEYBOARD_CLOSE_POLLING = 150;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	* @ngdoc service
	* @name ActionSheet
	* @module ionic
	* @description
	* The ActionSheet is a modal menu with options to select based on an action.
	*/
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(18);
	var overlay_controller_1 = __webpack_require__(13);
	var config_1 = __webpack_require__(8);
	var icon_1 = __webpack_require__(19);
	var animation_1 = __webpack_require__(20);
	var nav_controller_1 = __webpack_require__(21);
	var util_1 = __webpack_require__(10);
	var ActionSheetCmp = (function () {
	    function ActionSheetCmp(params, renderer) {
	        this.d = params.data;
	        if (this.d.cssClass) {
	            renderer.setElementClass(elementRef, this.d.cssClass, true);
	        }
	    }
	    ActionSheetCmp.prototype.cancel = function () {
	        this.d.cancel && this.d.cancel();
	        return this.close();
	    };
	    ActionSheetCmp.prototype.destructive = function () {
	        if (this.d.destructiveButtonClicked()) {
	            return this.close();
	        }
	    };
	    ActionSheetCmp.prototype.buttonClicked = function (index) {
	        if (this.d.buttonClicked(index)) {
	            return this.close();
	        }
	    };
	    ActionSheetCmp = __decorate([
	        core_1.Component({
	            selector: 'ion-action-sheet',
	            template: '<div (click)="cancel()" tappable disable-activated class="backdrop"></div>' +
	                '<div class="action-sheet-wrapper">' +
	                '<div class="action-sheet-container">' +
	                '<div class="action-sheet-group action-sheet-options">' +
	                '<div class="action-sheet-title" *ng-if="d.titleText">{{d.titleText}}</div>' +
	                '<button (click)="buttonClicked(i)" *ng-for="#b of d.buttons; #i=index" class="action-sheet-button action-sheet-option disable-hover">' +
	                '<icon [name]="b.icon" *ng-if="b.icon" class="action-sheet-icon"></icon> ' +
	                '{{b.text}}' +
	                '</button>' +
	                '<button *ng-if="d.destructiveText" (click)="destructive()" class="action-sheet-button action-sheet-destructive disable-hover">' +
	                '<icon [name]="d.destructiveIcon" *ng-if="d.destructiveIcon" class="action-sheet-icon"></icon> ' +
	                '{{d.destructiveText}}' +
	                '</button>' +
	                '</div>' +
	                '<div class="action-sheet-group" *ng-if="d.cancelText">' +
	                '<button (click)="cancel()" class="action-sheet-button action-sheet-cancel disable-hover">' +
	                '<icon [name]="d.cancelIcon" *ng-if="d.cancelIcon" class="action-sheet-icon"></icon> ' +
	                '{{d.cancelText}}' +
	                '</button>' +
	                '</div>' +
	                '</div>' +
	                '</div>',
	            host: {
	                'role': 'dialog'
	            },
	            directives: [common_1.NgFor, common_1.NgIf, icon_1.Icon]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof nav_controller_1.NavParams !== 'undefined' && nav_controller_1.NavParams) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object])
	    ], ActionSheetCmp);
	    return ActionSheetCmp;
	    var _a, _b;
	})();
	/**
	 * @name ActionSheet
	 * @description
	 * The Action Sheet is a slide-up pane that lets the user choose from a set of options. Dangerous options are made obvious.
	 * There are easy ways to cancel out of the action sheet, such as tapping the backdrop or even hitting escape on the keyboard for desktop testing.
	 *
	 * @usage
	 * ```ts
	 * openMenu() {
	 *
	 *   this.actionSheet.open({
	 *     buttons: [
	 *       { text: 'Share This' },
	 *       { text: 'Move' }
	 *     ],
	 *     destructiveText: 'Delete',
	 *     titleText: 'Modify your album',
	 *     cancelText: 'Cancel',
	 *     cancel: function() {
	 *       console.log('Canceled');
	 *     },
	 *     destructiveButtonClicked: () => {
	 *       console.log('Destructive clicked');
	 *     },
	 *     buttonClicked: function(index) {
	 *       console.log('Button clicked', index);
	 *       if(index == 1) { return false; }
	 *       return true;
	 *     }
	 *
	 *   }).then(actionSheetRef => {
	 *     this.actionSheetRef = actionSheetRef;
	 *   });
	 *
	 * }
	 * ```
	 *
	 * @demo /docs/v2/demos/action-sheet/
	 * @see {@link /docs/v2/components#action-sheets ActionSheet Component Docs}
	 */
	var ActionSheet = (function () {
	    function ActionSheet(ctrl, config) {
	        this.ctrl = ctrl;
	        this.config = config;
	    }
	    /**
	     * Create and open a new Action Sheet. This is the
	     * public API, and most often you will only use ActionSheet.open()
	     *
	     * @param {Object} [opts={}]  An object containing optional settings.
	     *  - `[Object]` `buttons` Which buttons to show.  Each button is an object with a `text` field.
	     *  - `{string}` `titleText` The title to show on the action sheet.
	     *  - `{string=}` `cancelText` the text for a 'cancel' button on the action sheet.
	     *  - `{string=}` `destructiveText` The text for a 'danger' on the action sheet.
	     *  - `{function=}` `cancel` Called if the cancel button is pressed, the backdrop is tapped or
	     *     the hardware back button is pressed.
	     *  - `{function=}` `buttonClicked` Called when one of the non-destructive buttons is clicked,
	     *     with the index of the button that was clicked and the button object. Return true to close
	     *     the action sheet, or false to keep it opened.
	     *  - `{function=}` `destructiveButtonClicked` Called when the destructive button is clicked.
	     *     Return true to close the action sheet, or false to keep it opened.
	     * @param {String} [opts.enterAnimation='action-sheet-slide-in'] The class used to animate an actionSheet that is entering.
	     * @param {String} [opts.leaveAnimation='action-sheet-slide-out'] The class used to animate an actionSheet that is leaving.
	     * @return {Promise} Promise that resolves when the action sheet is open.
	     */
	    ActionSheet.prototype.open = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        opts = util_1.extend({
	            pageType: OVERLAY_TYPE,
	            enterAnimation: this.config.get('actionSheetEnter'),
	            leaveAnimation: this.config.get('actionSheetLeave'),
	            cancelIcon: this.config.get('actionSheetCancelIcon'),
	            destructiveIcon: this.config.get('actionSheetDestructiveIcon')
	        }, opts);
	        return this.ctrl.open(ActionSheetCmp, opts, opts);
	    };
	    /**
	     * Retrieves an actionSheet instance.
	     *
	     * @param {String} [handle]  The handle used to open the instance to be retrieved.
	     * @returns {ActionSheet} An actionSheet instance.
	     */
	    ActionSheet.prototype.get = function (handle) {
	        if (handle) {
	            return this.ctrl.getByHandle(handle);
	        }
	        return this.ctrl.getByType(OVERLAY_TYPE);
	    };
	    ActionSheet = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof overlay_controller_1.OverlayController !== 'undefined' && overlay_controller_1.OverlayController) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object])
	    ], ActionSheet);
	    return ActionSheet;
	    var _a, _b;
	})();
	exports.ActionSheet = ActionSheet;
	var OVERLAY_TYPE = 'action-sheet';
	var ActionSheetSlideIn = (function (_super) {
	    __extends(ActionSheetSlideIn, _super);
	    function ActionSheetSlideIn(enteringView, leavingView, opts) {
	        _super.call(this, null, opts);
	        var ele = enteringView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
	        backdrop.fromTo('opacity', 0.01, 0.4);
	        wrapper.fromTo('translateY', '100%', '0%');
	        this.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add([backdrop, wrapper]);
	    }
	    return ActionSheetSlideIn;
	})(animation_1.Animation);
	animation_1.Animation.register('action-sheet-slide-in', ActionSheetSlideIn);
	var ActionSheetSlideOut = (function (_super) {
	    __extends(ActionSheetSlideOut, _super);
	    function ActionSheetSlideOut(enteringView, leavingView, opts) {
	        _super.call(this, null, opts);
	        var ele = leavingView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
	        backdrop.fromTo('opacity', 0.4, 0);
	        wrapper.fromTo('translateY', '0%', '100%');
	        this.easing('cubic-bezier(.36,.66,.04,1)').duration(300).add([backdrop, wrapper]);
	    }
	    return ActionSheetSlideOut;
	})(animation_1.Animation);
	animation_1.Animation.register('action-sheet-slide-out', ActionSheetSlideOut);
	var ActionSheetMdSlideIn = (function (_super) {
	    __extends(ActionSheetMdSlideIn, _super);
	    function ActionSheetMdSlideIn(enteringView, leavingView, opts) {
	        _super.call(this, null, opts);
	        var ele = enteringView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
	        backdrop.fromTo('opacity', 0.01, 0.26);
	        wrapper.fromTo('translateY', '100%', '0%');
	        this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add([backdrop, wrapper]);
	    }
	    return ActionSheetMdSlideIn;
	})(animation_1.Animation);
	animation_1.Animation.register('action-sheet-md-slide-in', ActionSheetMdSlideIn);
	var ActionSheetMdSlideOut = (function (_super) {
	    __extends(ActionSheetMdSlideOut, _super);
	    function ActionSheetMdSlideOut(enteringView, leavingView, opts) {
	        _super.call(this, null, opts);
	        var ele = leavingView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
	        backdrop.fromTo('opacity', 0.26, 0);
	        wrapper.fromTo('translateY', '0%', '100%');
	        this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add([backdrop, wrapper]);
	    }
	    return ActionSheetMdSlideOut;
	})(animation_1.Animation);
	animation_1.Animation.register('action-sheet-md-slide-out', ActionSheetMdSlideOut);

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("angular2")["common"];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var config_1 = __webpack_require__(8);
	/**
	 * @name Icon
	 * @description
	 * Icons can be used on their own, or inside of a number of Ionic components. For a full list of available icons,
	 * check out the [Ionicons resource docs](../../../../../resources/ionicons).
	 *
	 * @property {boolean} [is-active] - Whether or not the icon is active. Icons that are not active will use an outlined version of the icon.
	 * If there is not an outlined version for the particular icon, it will use the default (full) version.
	 * @property {string} [ios] - Explicitly set the icon to use on iOS.
	 * @property {string} [md] - Explicitly set the icon to use on Android.
	 * @see {@link /docs/v2/components#icons Icon Component Docs}
	 *
	 */
	var Icon = (function () {
	    function Icon(elementRef, config, renderer) {
	        this.elementRef = elementRef;
	        this.renderer = renderer;
	        this.config = config;
	        this.mode = config.get('iconMode');
	    }
	    /**
	     * @private
	     */
	    Icon.prototype.ngOnInit = function () {
	        var ele = this.elementRef.nativeElement;
	        if (this.mode == 'ios' && this.ios) {
	            this.name = this.ios;
	        }
	        else if (this.mode == 'md' && this.md) {
	            this.name = this.md;
	        }
	        else if (!this.name) {
	            // looping through native dom attributes, eww
	            // https://github.com/angular/angular/issues/1818
	            for (var i = 0, l = ele.attributes.length; i < l; i++) {
	                if (ele.attributes[i].value === '' && /_|item-|is-active|large|small|class/.test(ele.attributes[i].name) !== true) {
	                    this.name = ele.attributes[i].name;
	                    break;
	                }
	            }
	        }
	        if (!this.name)
	            return;
	        if (!(/^ion-/.test(this.name))) {
	            // not an exact icon being used
	            // add mode specific prefix
	            this.name = 'ion-' + this.mode + '-' + this.name;
	        }
	        this.update();
	    };
	    Object.defineProperty(Icon.prototype, "isActive", {
	        get: function () {
	            return (this._isActive === undefined || this._isActive === true || this._isActive === 'true');
	        },
	        /**
	         * @private
	         */
	        set: function (val) {
	            this._isActive = val;
	            this.update();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    Icon.prototype.update = function () {
	        if (this.name && this.mode == 'ios') {
	            if (this.isActive) {
	                if (/-outline/.test(this.name)) {
	                    this.name = this.name.replace('-outline', '');
	                }
	            }
	            else if (!(/-outline/.test(this.name))) {
	                this.name += '-outline';
	            }
	        }
	        if (this._name !== this.name) {
	            if (this._name) {
	                this.renderer.setElementClass(this.elementRef, this._name, false);
	            }
	            this._name = this.name;
	            this.renderer.setElementClass(this.elementRef, this.name, true);
	            this.renderer.setElementAttribute(this.elementRef, 'aria-label', this.name.replace('ion-', '').replace('ios-', '').replace('md-', '').replace('-', ' '));
	        }
	    };
	    Icon = __decorate([
	        core_1.Directive({
	            selector: 'icon',
	            inputs: [
	                'name',
	                'ios',
	                'md',
	                'isActive'
	            ],
	            host: {
	                'role': 'img'
	            }
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object])
	    ], Icon);
	    return Icon;
	    var _a, _b, _c;
	})();
	exports.Icon = Icon;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var dom_1 = __webpack_require__(11);
	var util_1 = __webpack_require__(10);
	/**
	  Animation Steps/Process
	  -----------------------
	  1) Construct animation (doesn't start)
	  2) Client play()'s animation, returns promise
	  3) Add before classes to elements
	  4) Remove before classes from elements
	  5) Elements staged in "from" effect w/ inline styles
	  6) Call onReady()
	  7) Wait for RENDER_DELAY milliseconds (give browser time to render)
	  8) Call onPlay()
	  8) Run from/to animation on elements
	  9) Animations finish async
	 10) Set inline styles w/ the "to" effects on elements
	 11) Add after classes to elements
	 12) Remove after classes from elements
	 13) Call onFinish()
	 14) Resolve play()'s promise
	**/
	var Animation = (function () {
	    function Animation(ele, opts) {
	        if (opts === void 0) { opts = {}; }
	        this.reset();
	        this._opts = util_1.extend({
	            renderDelay: 16
	        }, opts);
	        this.elements(ele);
	        if (!document.documentElement.animate) {
	            console.error('Web Animations polyfill missing');
	        }
	    }
	    Animation.prototype.reset = function () {
	        this._el = [];
	        this._chld = [];
	        this._ani = [];
	        this._bfAdd = [];
	        this._bfSty = {};
	        this._bfRmv = [];
	        this._afAdd = [];
	        this._afRmv = [];
	        this._readys = [];
	        this._plays = [];
	        this._finishes = [];
	    };
	    Animation.prototype.elements = function (ele) {
	        if (ele) {
	            if (typeof ele === 'string') {
	                // string query selector
	                ele = document.querySelectorAll(ele);
	            }
	            if (ele.length) {
	                // array of elements
	                for (var i = 0; i < ele.length; i++) {
	                    this.addElement(ele[i]);
	                }
	            }
	            else {
	                // single element
	                this.addElement(ele);
	            }
	        }
	        return this;
	    };
	    Animation.prototype.addElement = function (ele) {
	        // ensure only HTML Element nodes
	        if (ele) {
	            if (ele.nativeElement) {
	                // angular ElementRef
	                ele = ele.nativeElement;
	            }
	            if (ele.nodeType === 1) {
	                this._el.push(ele);
	            }
	        }
	    };
	    Animation.prototype.parent = function (parentAnimation) {
	        this._parent = parentAnimation;
	        return this;
	    };
	    Animation.prototype.add = function (childAnimations) {
	        var _childAnimations = Array.isArray(childAnimations) ? childAnimations : arguments;
	        for (var i = 0; i < _childAnimations.length; i++) {
	            _childAnimations[i].parent(this);
	            this._chld.push(_childAnimations[i]);
	        }
	        return this;
	    };
	    Animation.prototype.duration = function (value) {
	        if (arguments.length) {
	            this._duration = value;
	            return this;
	        }
	        return this._duration || (this._parent && this._parent.duration()) || 0;
	    };
	    Animation.prototype.clearDuration = function () {
	        this._duration = null;
	        for (var i = 0, l = this._chld.length; i < l; i++) {
	            this._chld[i].clearDuration();
	        }
	    };
	    Animation.prototype.easing = function (name, opts) {
	        if (arguments.length) {
	            this._easing = {
	                name: name,
	                opts: opts
	            };
	            return this;
	        }
	        return this._easing || (this._parent && this._parent.easing());
	    };
	    Animation.prototype.playbackRate = function (value) {
	        if (arguments.length) {
	            this._rate = value;
	            var i;
	            for (i = 0; i < this._chld.length; i++) {
	                this._chld[i].playbackRate(value);
	            }
	            for (i = 0; i < this._ani.length; i++) {
	                this._ani[i].playbackRate(value);
	            }
	            return this;
	        }
	        return (typeof this._rate !== 'undefined' ? this._rate : this._parent && this._parent.playbackRate());
	    };
	    Animation.prototype.reverse = function () {
	        return this.playbackRate(-1);
	    };
	    Animation.prototype.forward = function () {
	        return this.playbackRate(1);
	    };
	    Animation.prototype.from = function (property, value) {
	        if (!this._from) {
	            this._from = {};
	        }
	        this._from[property] = value;
	        return this;
	    };
	    Animation.prototype.to = function (property, value) {
	        if (!this._to) {
	            this._to = {};
	        }
	        this._to[property] = value;
	        return this;
	    };
	    Animation.prototype.fromTo = function (property, from, to) {
	        return this.from(property, from).to(property, to);
	    };
	    Animation.prototype.fadeIn = function () {
	        return this.fromTo('opacity', 0.001, 1);
	    };
	    Animation.prototype.fadeOut = function () {
	        return this.fromTo('opacity', 0.999, 0);
	    };
	    Object.defineProperty(Animation.prototype, "before", {
	        get: function () {
	            var _this = this;
	            return {
	                addClass: function (className) {
	                    _this._bfAdd.push(className);
	                    return _this;
	                },
	                removeClass: function (className) {
	                    _this._bfRmv.push(className);
	                    return _this;
	                },
	                setStyles: function (styles) {
	                    _this._bfSty = styles;
	                    return _this;
	                }
	            };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Animation.prototype, "after", {
	        get: function () {
	            var _this = this;
	            return {
	                addClass: function (className) {
	                    _this._afAdd.push(className);
	                    return _this;
	                },
	                removeClass: function (className) {
	                    _this._afRmv.push(className);
	                    return _this;
	                }
	            };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Animation.prototype.play = function (done) {
	        var self = this;
	        // the actual play() method which may or may not start async
	        function beginPlay(beginPlayDone) {
	            var tasks = [];
	            self._chld.forEach(function (childAnimation) {
	                tasks.push(function (taskDone) {
	                    childAnimation.play(taskDone);
	                });
	            });
	            self._ani.forEach(function (animation) {
	                tasks.push(function (taskDone) {
	                    animation.play(taskDone);
	                });
	            });
	            parallel(tasks, beginPlayDone);
	        }
	        if (!self._parent) {
	            // this is the top level animation and is in full control
	            // of when the async play() should actually kick off
	            // stage all animations and child animations at their starting point
	            self.stage();
	            var promise;
	            if (!done) {
	                promise = new Promise(function (res) { done = res; });
	            }
	            function kickoff() {
	                // synchronously call all onPlay()'s before play()
	                self._onPlay();
	                beginPlay(function () {
	                    self._onFinish();
	                    done();
	                });
	            }
	            if (self._duration > 16 && self._opts.renderDelay > 0) {
	                // begin each animation when everything is rendered in their starting point
	                // give the browser some time to render everything in place before starting
	                dom_1.rafFrames(self._opts.renderDelay / 16, kickoff);
	            }
	            else {
	                // no need to render everything in there place before animating in
	                // just kick it off immediately to render them in their "to" locations
	                kickoff();
	            }
	            return promise;
	        }
	        // this is a child animation, it is told exactly when to
	        // start by the top level animation
	        beginPlay(done);
	    };
	    Animation.prototype.stage = function () {
	        // before the RENDER_DELAY
	        // before the animations have started
	        if (!this._isStaged) {
	            this._isStaged = true;
	            var i, p, l, j, ele, animation;
	            for (i = 0, l = this._chld.length; i < l; i++) {
	                this._chld[i].stage();
	            }
	            for (i = 0; i < this._el.length; i++) {
	                ele = this._el[i];
	                for (j = 0; j < this._bfAdd.length; j++) {
	                    ele.classList.add(this._bfAdd[j]);
	                }
	                for (p in this._bfSty) {
	                    ele.style[p] = this._bfSty[p];
	                }
	                for (j = 0; j < this._bfRmv.length; j++) {
	                    ele.classList.remove(this._bfRmv[j]);
	                }
	            }
	            if (this._to) {
	                // only animate the elements if there are defined "to" effects
	                for (i = 0; i < this._el.length; i++) {
	                    animation = new Animate(this._el[i], this._from, this._to, this.duration(), this.easing(), this.playbackRate());
	                    if (animation.shouldAnimate) {
	                        this._ani.push(animation);
	                    }
	                }
	            }
	            for (i = 0; i < this._readys.length; i++) {
	                this._readys[i](this);
	            }
	        }
	    };
	    Animation.prototype._onPlay = function () {
	        // after the RENDER_DELAY
	        // before the animations have started
	        var i;
	        this._isFinished = false;
	        for (i = 0; i < this._chld.length; i++) {
	            this._chld[i]._onPlay();
	        }
	        for (i = 0; i < this._plays.length; i++) {
	            this._plays[i](this);
	        }
	    };
	    Animation.prototype._onFinish = function () {
	        // after the animations have finished
	        if (!this._isFinished && !this.isProgress) {
	            this._isFinished = true;
	            var i, j, ele;
	            for (i = 0; i < this._chld.length; i++) {
	                this._chld[i]._onFinish();
	            }
	            if (this.playbackRate() < 0) {
	                // reverse direction
	                for (i = 0; i < this._el.length; i++) {
	                    ele = this._el[i];
	                    for (j = 0; j < this._bfAdd.length; j++) {
	                        ele.classList.remove(this._bfAdd[j]);
	                    }
	                    for (j = 0; j < this._bfRmv.length; j++) {
	                        ele.classList.add(this._bfRmv[j]);
	                    }
	                }
	            }
	            else {
	                // normal direction
	                for (i = 0; i < this._el.length; i++) {
	                    ele = this._el[i];
	                    for (j = 0; j < this._afAdd.length; j++) {
	                        ele.classList.add(this._afAdd[j]);
	                    }
	                    for (j = 0; j < this._afRmv.length; j++) {
	                        ele.classList.remove(this._afRmv[j]);
	                    }
	                }
	            }
	            for (i = 0; i < this._finishes.length; i++) {
	                this._finishes[i](this);
	            }
	        }
	    };
	    Animation.prototype.pause = function () {
	        var i;
	        for (i = 0; i < this._chld.length; i++) {
	            this._chld[i].pause();
	        }
	        for (i = 0; i < this._ani.length; i++) {
	            this._ani[i].pause();
	        }
	    };
	    Animation.prototype.progressStart = function () {
	        this.isProgress = true;
	        for (var i = 0; i < this._chld.length; i++) {
	            this._chld[i].progressStart();
	        }
	        this.duration(1000);
	        this.play();
	        this.pause();
	    };
	    Animation.prototype.progress = function (value) {
	        value = Math.min(1, Math.max(0, value));
	        this.isProgress = true;
	        var i;
	        for (i = 0; i < this._chld.length; i++) {
	            this._chld[i].progress(value);
	        }
	        for (i = 0; i < this._ani.length; i++) {
	            this._ani[i].progress(value);
	        }
	    };
	    /**
	     * Get the current time of the first animation
	     * in the list. To get a specific time of an animation, call
	     * subAnimationInstance.getCurrentTime()
	     */
	    Animation.prototype.getCurrentTime = function () {
	        if (this._chld.length > 0) {
	            return this._chld[0].getCurrentTime();
	        }
	        if (this._ani.length > 0) {
	            return this._ani[0].getCurrentTime();
	        }
	        return 0;
	    };
	    Animation.prototype.progressEnd = function (shouldComplete, rate) {
	        if (rate === void 0) { rate = 3; }
	        var promises = [];
	        this.isProgress = false;
	        for (var i = 0; i < this._chld.length; i++) {
	            promises.push(this._chld[i].progressEnd(shouldComplete));
	        }
	        this._ani.forEach(function (animation) {
	            if (shouldComplete) {
	                animation.playbackRate(rate);
	            }
	            else {
	                animation.playbackRate(rate * -1);
	            }
	            promises.push(new Promise(function (resolve) {
	                animation.play(resolve);
	            }));
	        });
	        return Promise.all(promises);
	    };
	    Animation.prototype.onReady = function (fn, clear) {
	        if (clear) {
	            this._readys = [];
	        }
	        this._readys.push(fn);
	        return this;
	    };
	    Animation.prototype.onPlay = function (fn, clear) {
	        if (clear) {
	            this._plays = [];
	        }
	        this._plays.push(fn);
	        return this;
	    };
	    Animation.prototype.onFinish = function (fn, clear) {
	        if (clear) {
	            this._finishes = [];
	        }
	        this._finishes.push(fn);
	        return this;
	    };
	    Animation.prototype.clone = function () {
	        function copy(dest, src) {
	            // undo what stage() may have already done
	            util_1.extend(dest, src);
	            dest._isFinished = dest._isStaged = dest.isProgress = false;
	            dest._chld = [];
	            dest._ani = [];
	            for (var i = 0; i < src._chld.length; i++) {
	                dest.add(copy(new Animation(), src._chld[i]));
	            }
	            return dest;
	        }
	        return copy(new Animation(), this);
	    };
	    Animation.prototype.dispose = function (removeElement) {
	        var i;
	        for (i = 0; i < this._chld.length; i++) {
	            this._chld[i].dispose(removeElement);
	        }
	        for (i = 0; i < this._ani.length; i++) {
	            this._ani[i].dispose(removeElement);
	        }
	        if (removeElement) {
	            for (i = 0; i < this._el.length; i++) {
	                this._el[i].parentNode && this._el[i].parentNode.removeChild(this._el[i]);
	            }
	        }
	        this.reset();
	    };
	    /*
	     STATIC CLASSES
	     */
	    Animation.create = function (element, name) {
	        var AnimationClass = AnimationRegistry[name];
	        if (!AnimationClass) {
	            // couldn't find an animation by the given name
	            // fallback to just the base Animation class
	            AnimationClass = Animation;
	        }
	        return new AnimationClass(element);
	    };
	    Animation.createTransition = function (enteringView, leavingView, opts) {
	        if (opts === void 0) { opts = {}; }
	        var name = opts.animation || 'ios-transition';
	        var TransitionClass = AnimationRegistry[name];
	        if (!TransitionClass) {
	            TransitionClass = Animation;
	        }
	        return new TransitionClass(enteringView, leavingView, opts);
	    };
	    Animation.register = function (name, AnimationClass) {
	        AnimationRegistry[name] = AnimationClass;
	    };
	    return Animation;
	})();
	exports.Animation = Animation;
	var Animate = (function () {
	    function Animate(ele, fromEffect, toEffect, duration, easingConfig, playbackRate) {
	        // https://w3c.github.io/web-animations/
	        // not using the direct API methods because they're still in flux
	        // however, element.animate() seems locked in and uses the latest
	        // and correct API methods under the hood, so really doesn't matter
	        if (!fromEffect) {
	            return console.error(ele.tagName, 'animation fromEffect required, toEffect:', toEffect);
	        }
	        this.toEffect = parseEffect(toEffect);
	        this.shouldAnimate = (duration > 32);
	        if (!this.shouldAnimate) {
	            return inlineStyle(ele, this.toEffect);
	        }
	        this.ele = ele;
	        // stage where the element will start from
	        this.fromEffect = parseEffect(fromEffect);
	        inlineStyle(ele, this.fromEffect);
	        this.duration = duration;
	        this.rate = (typeof playbackRate !== 'undefined' ? playbackRate : 1);
	        this.easing = easingConfig && easingConfig.name || 'linear';
	        this.effects = [convertProperties(this.fromEffect)];
	        if (this.easing in EASING_FN) {
	            insertEffects(this.effects, this.fromEffect, this.toEffect, easingConfig);
	        }
	        else if (this.easing in CUBIC_BEZIERS) {
	            this.easing = 'cubic-bezier(' + CUBIC_BEZIERS[this.easing] + ')';
	        }
	        this.effects.push(convertProperties(this.toEffect));
	    }
	    Animate.prototype.play = function (done) {
	        var self = this;
	        if (self.ani) {
	            self.ani.play();
	        }
	        else {
	            // https://developers.google.com/web/updates/2014/05/Web-Animations---element-animate-is-now-in-Chrome-36
	            // https://w3c.github.io/web-animations/
	            // Future versions will use "new window.Animation" rather than "element.animate()"
	            self.ani = self.ele.animate(self.effects, {
	                duration: self.duration || 0,
	                easing: self.easing,
	                playbackRate: self.rate // old way of setting playbackRate, but still necessary
	            });
	            self.ani.playbackRate = self.rate;
	        }
	        self.ani.onfinish = function () {
	            // lock in where the element will stop at
	            // if the playbackRate is negative then it needs to return
	            // to its "from" effects
	            if (self.ani) {
	                inlineStyle(self.ele, self.rate < 0 ? self.fromEffect : self.toEffect);
	                self.ani = self.ani.onfinish = null;
	                done && done();
	            }
	        };
	    };
	    Animate.prototype.pause = function () {
	        this.ani && this.ani.pause();
	    };
	    Animate.prototype.progress = function (value) {
	        if (this.ani) {
	            // passed a number between 0 and 1
	            if (this.ani.playState !== 'paused') {
	                this.ani.pause();
	            }
	            // don't let the progress finish the animation
	            // leave it off JUST before it's finished
	            value = Math.min(0.999, Math.max(0.001, value));
	            this.ani.currentTime = (this.duration * value);
	        }
	    };
	    Animate.prototype.getCurrentTime = function () {
	        return (this.ani && this.ani.currentTime) || 0;
	    };
	    Animate.prototype.playbackRate = function (value) {
	        this.rate = value;
	        if (this.ani) {
	            this.ani.playbackRate = value;
	        }
	    };
	    Animate.prototype.dispose = function () {
	        this.ele = this.ani = this.effects = this.toEffect = null;
	    };
	    return Animate;
	})();
	function insertEffects(effects, fromEffect, toEffect, easingConfig) {
	    easingConfig.opts = easingConfig.opts || {};
	    var increment = easingConfig.opts.increment || 0.04;
	    var easingFn = EASING_FN[easingConfig.name];
	    var pos, tweenEffect, addEffect, property, toProperty, fromValue, diffValue;
	    for (pos = increment; pos <= (1 - increment); pos += increment) {
	        tweenEffect = {};
	        addEffect = false;
	        for (property in toEffect) {
	            toProperty = toEffect[property];
	            if (toProperty.tween) {
	                fromValue = fromEffect[property].num;
	                diffValue = toProperty.num - fromValue;
	                tweenEffect[property] = {
	                    value: roundValue((easingFn(pos, easingConfig.opts) * diffValue) + fromValue) + toProperty.unit
	                };
	                addEffect = true;
	            }
	        }
	        if (addEffect) {
	            effects.push(convertProperties(tweenEffect));
	        }
	    }
	}
	function parseEffect(inputEffect) {
	    var val, r, num, property;
	    var outputEffect = {};
	    for (property in inputEffect) {
	        val = inputEffect[property];
	        r = val.toString().match(/(^-?\d*\.?\d*)(.*)/);
	        num = parseFloat(r[1]);
	        outputEffect[property] = {
	            value: val,
	            num: num,
	            unit: (r[0] != r[2] ? r[2] : ''),
	            tween: !isNaN(num) && (ANIMATE_PROPERTIES.indexOf(property) > -1)
	        };
	    }
	    return outputEffect;
	}
	function convertProperties(inputEffect) {
	    var outputEffect = {};
	    var transforms = [];
	    var value, property;
	    for (property in inputEffect) {
	        value = inputEffect[property].value;
	        if (TRANSFORMS.indexOf(property) > -1) {
	            transforms.push(property + '(' + value + ')');
	        }
	        else {
	            outputEffect[property] = value;
	        }
	    }
	    if (transforms.length) {
	        transforms.push('translateZ(0px)');
	        outputEffect.transform = transforms.join(' ');
	    }
	    return outputEffect;
	}
	function inlineStyle(ele, effect) {
	    if (ele && effect) {
	        var transforms = [];
	        var value, property;
	        for (property in effect) {
	            value = effect[property].value;
	            if (TRANSFORMS.indexOf(property) > -1) {
	                transforms.push(property + '(' + value + ')');
	            }
	            else {
	                ele.style[property] = value;
	            }
	        }
	        if (transforms.length) {
	            transforms.push('translateZ(0px)');
	            ele.style[dom_1.CSS.transform] = transforms.join(' ');
	        }
	    }
	}
	function roundValue(val) {
	    return Math.round(val * 10000) / 10000;
	}
	var TRANSFORMS = ['translateX', 'translateY', 'translateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ',
	    'rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY', 'perspective'];
	var ANIMATE_PROPERTIES = TRANSFORMS.concat('opacity');
	// Robert Penner's Easing Functions
	// http://robertpenner.com/easing/
	var CUBIC_BEZIERS = {
	    // default browser suppored easing
	    // ease
	    // ease-in
	    // ease-out
	    // ease-in-out
	    // Cubic
	    'ease-in-cubic': '0.55,0.055,0.675,0.19',
	    'ease-out-cubic': '0.215,0.61,0.355,1',
	    'ease-in-Out-cubic': '0.645,0.045,0.355,1',
	    // Circ
	    'ease-in-circ': '0.6,0.04,0.98,0.335',
	    'ease-out-circ': '0.075,0.82,0.165,1',
	    'ease-in-out-circ': '0.785,0.135,0.15,0.86',
	    // Expo
	    'ease-in-expo': '0.95,0.05,0.795,0.035',
	    'ease-out-expo': '0.19,1,0.22,1',
	    'ease-in-out-expo': '1,0,0,1',
	    // Quad
	    'ease-in-quad': '0.55,0.085,0.68,0.53',
	    'ease-out-quad': '0.25,0.46,0.45,0.94',
	    'ease-in-out-quad': '0.455,0.03,0.515,0.955',
	    // Quart
	    'ease-in-quart': '0.895,0.03,0.685,0.22',
	    'ease-out-quart': '0.165,0.84,0.44,1',
	    'ease-in-out-quart': '0.77,0,0.175,1',
	    // Quint
	    'ease-in-quint': '0.755,0.05,0.855,0.06',
	    'ease-out-quint': '0.23,1,0.32,1',
	    'ease-in-out-quint': '0.86,0,0.07,1',
	    // Sine
	    'ease-in-sine': '0.47,0,0.745,0.715',
	    'ease-out-sine': '0.39,0.575,0.565,1',
	    'ease-in-out-sine': '0.445,0.05,0.55,0.95',
	    // Back
	    'ease-in-back': '0.6,-0.28,0.735,0.045',
	    'ease-out-back': '0.175,0.885,0.32,1.275',
	    'ease-in-out-back': '0.68,-0.55,0.265,1.55',
	};
	var EASING_FN = {
	    'elastic': function (pos) {
	        return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
	    },
	    'swing-from-to': function (pos, opts) {
	        var s = opts.s || 1.70158;
	        return ((pos /= 0.5) < 1) ? 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
	            0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
	    },
	    'swing-from': function (pos, opts) {
	        var s = opts.s || 1.70158;
	        return pos * pos * ((s + 1) * pos - s);
	    },
	    'swing-to': function (pos, opts) {
	        var s = opts.s || 1.70158;
	        return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
	    },
	    'bounce': function (pos) {
	        if (pos < (1 / 2.75)) {
	            return (7.5625 * pos * pos);
	        }
	        else if (pos < (2 / 2.75)) {
	            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
	        }
	        else if (pos < (2.5 / 2.75)) {
	            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
	        }
	        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
	    },
	    'bounce-past': function (pos) {
	        if (pos < (1 / 2.75)) {
	            return (7.5625 * pos * pos);
	        }
	        else if (pos < (2 / 2.75)) {
	            return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
	        }
	        else if (pos < (2.5 / 2.75)) {
	            return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
	        }
	        return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
	    },
	    'ease-out-bounce': function (pos) {
	        if ((pos) < (1 / 2.75)) {
	            return (7.5625 * pos * pos);
	        }
	        else if (pos < (2 / 2.75)) {
	            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
	        }
	        else if (pos < (2.5 / 2.75)) {
	            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
	        }
	        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
	    },
	    'ease-from-to': function (pos) {
	        if ((pos /= 0.5) < 1)
	            return 0.5 * Math.pow(pos, 4);
	        return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
	    },
	    'ease-from': function (pos, opts) {
	        return Math.pow(pos, opts.s || 4);
	    },
	    'ease-to': function (pos, opts) {
	        return Math.pow(pos, opts.s || 0.25);
	    },
	    /*
	     * scripty2, Thomas Fuchs (MIT Licence)
	     * https://raw.github.com/madrobby/scripty2/master/src/effects/transitions/transitions.js
	     */
	    'spring': function (pos, opts) {
	        var damping = opts.damping || 4.5;
	        var elasticity = opts.elasticity || 6;
	        return 1 - (Math.cos(pos * damping * Math.PI) * Math.exp(-pos * elasticity));
	    },
	    'sinusoidal': function (pos) {
	        return (-Math.cos(pos * Math.PI) / 2) + 0.5;
	    }
	};
	var AnimationRegistry = {};
	function parallel(tasks, done) {
	    var l = tasks.length;
	    if (!l) {
	        done && done();
	        return;
	    }
	    var completed = 0;
	    function taskCompleted() {
	        completed++;
	        if (completed === l) {
	            done && done();
	        }
	    }
	    for (var i = 0; i < l; i++) {
	        tasks[i](taskCompleted);
	    }
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_1 = __webpack_require__(3);
	var instrumentation_1 = __webpack_require__(22);
	var ion_1 = __webpack_require__(23);
	var view_controller_1 = __webpack_require__(24);
	var animation_1 = __webpack_require__(20);
	var swipe_back_1 = __webpack_require__(25);
	var util_1 = __webpack_require__(10);
	var dom_1 = __webpack_require__(11);
	/**
	 * _For examples on the basic usage of NavController, check out the
	 * [Navigation section](../../../../components/#navigation) of the Component
	 * docs._
	 *
	 * NavController is the base class for navigation controller components like
	 * [`Nav`](../Nav/) and [`Tab`](../../Tabs/Tab/). You use navigation controllers
	 * to navigate to [pages](#creating_pages) in your app. At a basic level, a
	 * navigation controller is an array of pages representing a particular history
	 * (of a Tab for example). This array can be manipulated to navigate throughout
	 * an app by pushing and popping pages or inserting and removing them at
	 * arbitrary locations in history.
	 *
	 * The current page is the last one in the array, or the top of the stack if we
	 * think of it that way.  [Pushing](#push) a new page onto the top of the
	 * navigation stack causes the new page to be animated in, while [popping](#pop)
	 * the current page will navigate to the previous page in the stack.
	 *
	 * Unless you are using a directive like [NavPush](../NavPush/), or need a
	 * specific NavController, most times you will inject and use a reference to the
	 * nearest NavController to manipulate the navigation stack.
	 *
	 * <h3 id="injecting_nav_controller">Injecting NavController</h3>
	 * Injecting NavController will always get you an instance of the nearest
	 * NavController, regardless of whether it is a Tab or a Nav.
	 *
	 * Behind the scenes, when Ionic instantiates a new NavController, it creates an
	 * injector with NavController bound to that instance (usually either a Nav or
	 * Tab) and adds the injector to its own providers.  For more information on
	 * providers and dependency injection, see [Providers and DI]().
	 *
	 * Instead, you can inject NavController and know that it is the correct
	 * navigation controller for most situations (for more advanced situations, see
	 * [Menu](../../Menu/Menu/) and [Tab](../../Tab/Tab/)).
	 *
	 * ```ts
	 *  class MyComponent {
	 *    constructor(nav: NavController) {
	 *      this.nav = nav;
	 *    }
	 *  }
	 * ```
	 *
	 * <h2 id="creating_pages">Page creation</h2>
	 * _For more information on the `@Page` decorator see the [@Page API
	 * reference](../../../config/Page/)._
	 *
	 * Pages are created when they are added to the navigation stack.  For methods
	 * like [push()](#push), the NavController takes any component class that is
	 * decorated with `@Page` as its first argument.  The NavController then
	 * compiles that component, adds it to the app and animates it into view.
	 *
	 * By default, pages are cached and left in the DOM if they are navigated away
	 * from but still in the navigation stack (the exiting page on a `push()` for
	 * example).  They are destroyed when removed from the navigation stack (on
	 * [pop()](#pop) or [setRoot()](#setRoot)).
	 *
	 *
	 * <h2 id="Lifecycle">Lifecycle events</h2>
	 * Lifecycle events are fired during various stages of navigation.  They can be
	 * defined in any `@Page` decorated component class.
	 *
	 * ```ts
	 * @Page({
	 *   template: 'Hello World'
	 * })
	 * class HelloWorld {
	 *   onPageLoaded() {
	 *     console.log("I'm alive!");
	 *   }
	 *   onPageWillLeave() {
	 *     console.log("Looks like I'm about to leave :(");
	 *   }
	 * }
	 * ```
	 *
	 *
	 *
	 * - `onPageLoaded` - Runs when the page has loaded. This event only happens once per page being created and added to the DOM. If a page leaves but is cached, then this event will not fire again on a subsequent viewing. The `onPageLoaded` event is good place to put your setup code for the page.
	 * - `onPageWillEnter` - Runs when the page is about to enter and become the active page.
	 * - `onPageDidEnter` - Runs when the page has fully entered and is now the active page. This event will fire, whether it was the first load or a cached page.
	 * - `onPageWillLeave` - Runs when the page is about to leave and no longer be the active page.
	 * - `onPageDidLeave` - Runs when the page has finished leaving and is no longer the active page.
	 * - `onPageWillUnload` - Runs when the page is about to be destroyed and have its elements removed.
	 * - `onPageDidUnload` - Runs after the page has been destroyed and its elements have been removed.
	 *
	 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
	 */
	var NavController = (function (_super) {
	    __extends(NavController, _super);
	    function NavController(parentnavCtrl, app, config, keyboard, elementRef, anchorName, compiler, viewManager, zone, renderer, cd) {
	        _super.call(this, elementRef, config);
	        this.parent = parentnavCtrl;
	        this.app = app;
	        this.config = config;
	        this.keyboard = keyboard;
	        this._anchorName = anchorName;
	        this._compiler = compiler;
	        this._viewManager = viewManager;
	        this._zone = zone;
	        this._renderer = renderer;
	        this._cd = cd;
	        this._views = [];
	        this._trnsTime = 0;
	        this._trnsDelay = config.get('pageTransitionDelay');
	        this._sbTrans = null;
	        this._sbEnabled = config.get('swipeBackEnabled') || false;
	        this._sbThreshold = config.get('swipeBackThreshold') || 40;
	        this.initZIndex = 10;
	        this.id = ++ctrlIds;
	        this._ids = -1;
	        // build a new injector for child ViewControllers to use
	        this.providers = core_1.Injector.resolve([
	            core_1.provide(NavController, { useValue: this })
	        ]);
	    }
	    /**
	     * Boolean if the nav controller is actively transitioning or not.
	     * @private
	     * @return {bool}
	     */
	    NavController.prototype.isTransitioning = function () {
	        return (this._trnsTime > Date.now());
	    };
	    /**
	     * Boolean if the nav controller is actively transitioning or not.
	     * @private
	     * @return {bool}
	     */
	    NavController.prototype.setTransitioning = function (isTransitioning, fallback) {
	        if (fallback === void 0) { fallback = 700; }
	        this._trnsTime = (isTransitioning ? Date.now() + fallback : 0);
	    };
	    /**
	     * Push is how we can pass components and navigate to them. We push the component we want to navigate to on to the navigation stack.
	     *
	     * ```typescript
	     * class MyClass{
	     *    constructor(nav:NavController){
	     *      this.nav = nav;
	     *    }
	     *
	     *    pushPage(){
	     *      this.nav.push(SecondView);
	     *    }
	     * }
	     * ```
	     *
	     * We can also pass along parameters to the next view, such as data that we have on the current view. This is a similar concept to to V1 apps with `$stateParams`.
	     *
	     * ```typescript
	     * class MyClass{
	     *    constructor(nav:NavController){
	     *      this.nav = nav;
	     *    }
	     *
	     *    pushPage(user){
	     *      this.nav.push(SecondView,{
	     *       // user is an object we have in our view
	     *       // typically this comes from an ngFor or some array
	     *       // here we can create an object with a property of
	     *       // paramUser, and set it's value to the user object we passed in
	     *       paramUser: user
	     *      });
	     *    }
	     * }
	     * ```
	     *
	     * We'll look at how we can access that data in the `SecondView` in the navParam docs
	     *
	     * We can also pass any options to the transtion from that same method
	     *
	     * ```typescript
	     * class MyClass{
	     *    constructor(nav:NavController){
	     *      this.nav = nav;
	     *    }
	     *
	     *    pushPage(user){
	     *      this.nav.push(SecondView,{
	     *       // user is an object we have in our view
	     *       // typically this comes from an ngFor or some array
	     *       // here we can create an object with a property of
	     *       // paramUser, and set it's value to the user object we passed in
	     *       paramUser: user
	     *      },{
	     *       // here we can configure things like the animations direction or
	     *       // or if the view should animate at all.
	     *       direction: back
	     *      });
	     *    }
	     * }
	     * ```
	     * @param {Any} component The name of the component you want to push on the navigation stack
	     * @param {Object} [params={}] Any nav-params you want to pass along to the next view
	     * @param {Object} [opts={}] Any options you want to use pass to transtion
	     * @returns {Promise} Returns a promise when the transition is completed
	     */
	    NavController.prototype.push = function (componentType, params, opts, callback) {
	        if (params === void 0) { params = {}; }
	        if (opts === void 0) { opts = {}; }
	        if (!componentType) {
	            var errMsg = 'invalid componentType to push';
	            console.error(errMsg);
	            return Promise.reject(errMsg);
	        }
	        if (typeof componentType !== 'function') {
	            throw 'Loading component must be a component class, not "' + componentType.toString() + '"';
	        }
	        if (this.isTransitioning()) {
	            return Promise.reject('nav controller actively transitioning');
	        }
	        this.setTransitioning(true, 500);
	        var promise = null;
	        if (!callback) {
	            promise = new Promise(function (res) { callback = res; });
	        }
	        // do not animate if this is the first in the stack
	        if (!this._views.length && !opts.animateFirst) {
	            opts.animate = false;
	        }
	        // default the direction to "forward"
	        opts.direction = opts.direction || 'forward';
	        // the active view is going to be the leaving one (if one exists)
	        var leavingView = this.getActive() || new view_controller_1.ViewController();
	        leavingView.shouldCache = (util_1.isBoolean(opts.cacheLeavingView) ? opts.cacheLeavingView : true);
	        leavingView.shouldDestroy = !leavingView.shouldCache;
	        if (leavingView.shouldDestroy) {
	            leavingView.willUnload();
	        }
	        // create a new ViewController
	        var enteringView = new view_controller_1.ViewController(this, componentType, params);
	        enteringView.shouldDestroy = false;
	        enteringView.shouldCache = false;
	        enteringView.pageType = opts.pageType;
	        enteringView.handle = opts.handle || null;
	        // add the view to the stack
	        this._add(enteringView);
	        if (this.router) {
	            // notify router of the state change
	            this.router.stateChange('push', enteringView, params);
	        }
	        // start the transition
	        this._transition(enteringView, leavingView, opts, callback);
	        return promise;
	    };
	    /**
	     * If you wanted to navigate back from a current view, you can use the back-button or programatically call `pop()`
	     * Similar to `push()`, you can pass animation options.
	     *
	     * ```typescript
	     * class SecondView{
	     *    constructor(nav:NavController){
	     *      this.nav = nav;
	     *    }
	     *    goBack(){
	     *      this.nav.pop();
	     *    }
	     * }
	     * ```
	     *
	     * @param {Object} [opts={}] Any options you want to use pass to transtion
	     * @returns {Promise} Returns a promise when the transition is completed
	     */
	    NavController.prototype.pop = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        if (!opts.animateFirst && !this.canGoBack()) {
	            return Promise.reject('pop cannot go back');
	        }
	        if (this.isTransitioning()) {
	            return Promise.reject('nav controller actively transitioning');
	        }
	        this.setTransitioning(true, 500);
	        var resolve = null;
	        var promise = new Promise(function (res) { resolve = res; });
	        // default the direction to "back"
	        opts.direction = opts.direction || 'back';
	        // get the active view and set that it is staged to be leaving
	        // was probably the one popped from the stack
	        var leavingView = this.getActive() || new view_controller_1.ViewController();
	        leavingView.shouldCache = (util_1.isBoolean(opts.cacheLeavingView) ? opts.cacheLeavingView : false);
	        leavingView.shouldDestroy = !leavingView.shouldCache;
	        if (leavingView.shouldDestroy) {
	            leavingView.willUnload();
	        }
	        // the entering view is now the new last view
	        // Note: we might not have an entering view if this is the
	        // only view on the history stack.
	        var enteringView = this.getPrevious(leavingView);
	        if (this.router) {
	            // notify router of the state change
	            this.router.stateChange('pop', enteringView);
	        }
	        // start the transition
	        this._transition(enteringView, leavingView, opts, resolve);
	        return promise;
	    };
	    /**
	     * @private
	     * Pop to a specific view in the history stack
	     * @param view {ViewController} to pop to
	     * @param {Object} [opts={}] Any options you want to use pass to transtion
	     */
	    NavController.prototype.popTo = function (viewCtrl, opts) {
	        if (opts === void 0) { opts = {}; }
	        // Get the target index of the view to pop to
	        var viewIndex = this._views.indexOf(viewCtrl);
	        var targetIndex = viewIndex + 1;
	        // Don't pop to the view if it wasn't found, or the target is beyond the view list
	        if (viewIndex < 0 || targetIndex > this._views.length - 1) {
	            return Promise.resolve();
	        }
	        // ensure the entering view is shown
	        this._cachePage(viewCtrl, true);
	        var resolve = null;
	        var promise = new Promise(function (res) { resolve = res; });
	        opts.direction = opts.direction || 'back';
	        var leavingView = this.getActive() || new view_controller_1.ViewController();
	        // get the views to auto remove without having to do a transiton for each
	        // the last view (the currently active one) will do a normal transition out
	        if (this._views.length > 1) {
	            var autoRemoveItems = this._views.slice(targetIndex, this._views.length);
	            var popView;
	            for (var i = 0; i < autoRemoveItems.length; i++) {
	                popView = autoRemoveItems[i];
	                popView.shouldDestroy = true;
	                popView.shouldCache = false;
	                popView.willUnload();
	                // only the leaving view should be shown, all others hide
	                this._cachePage(popView, (popView === leavingView));
	            }
	        }
	        if (this.router) {
	            this.router.stateChange('pop', viewCtrl);
	        }
	        this._transition(viewCtrl, leavingView, opts, resolve);
	        return promise;
	    };
	    /**
	     * Similar to `pop()`, this method let's you navigate back to the root of the stack, no matter how many views that is
	     * @param {Object} [opts={}] Any options you want to use pass to transtion
	     */
	    NavController.prototype.popToRoot = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        return this.popTo(this.first(), opts);
	    };
	    /**
	     * Inserts a view into the nav stack at the specified index.
	     * This is useful if you need to add a view at any point in your navigation stack
	     *
	     * ```typescript
	     * export class Detail {
	     *    constructor(nav: NavController) {
	     *      this.nav = nav;
	     *    }
	     *    insertView(){
	     *      this.nav.insert(1,Info)
	     *    }
	     *  }
	     * ```
	     *
	     * This will insert the `Info` view into the second slot of our navigation stack
	     *
	     * @param {Number} index The index where you want to insert the view
	     * @param {Any} component The name of the component you want to insert into the nav stack
	     * @returns {Promise} Returns a promise when the view has been inserted into the navigation stack
	     */
	    NavController.prototype.insert = function (index, componentType, params, opts) {
	        if (params === void 0) { params = {}; }
	        if (opts === void 0) { opts = {}; }
	        if (!componentType || index < 0) {
	            return Promise.reject('invalid insert');
	        }
	        // push it onto the end
	        if (index >= this._views.length) {
	            return this.push(componentType, params, opts);
	        }
	        // create new ViewController, but don't render yet
	        var viewCtrl = new view_controller_1.ViewController(this, componentType, params);
	        viewCtrl.state = CACHED_STATE;
	        viewCtrl.shouldDestroy = false;
	        viewCtrl.shouldCache = false;
	        this._incId(viewCtrl);
	        this._views.splice(index, 0, viewCtrl);
	        this._cleanup();
	        return Promise.resolve();
	    };
	    /**
	     * Removes a view from the nav stack at the specified index.
	     *
	     * ```typescript
	     * export class Detail {
	     *    constructor(nav: NavController) {
	     *      this.nav = nav;
	     *    }
	     *    removeView(){
	     *      this.nav.remove(1)
	     *    }
	     *  }
	     * ```
	     *
	     * @param {Number} index Remove the view from the nav stack at that index
	     * @param {Object} [opts={}] Any options you want to use pass to transtion
	     * @returns {Promise} Returns a promise when the view has been removed
	     */
	    NavController.prototype.remove = function (index, opts) {
	        if (opts === void 0) { opts = {}; }
	        if (index < 0 || index >= this._views.length) {
	            return Promise.reject("index out of range");
	        }
	        var viewToRemove = this._views[index];
	        if (this.isActive(viewToRemove)) {
	            return this.pop(opts);
	        }
	        viewToRemove.shouldDestroy = true;
	        this._cleanup();
	        return Promise.resolve();
	    };
	    /**
	     * @private
	     */
	    NavController.prototype.setViews = function (components, opts) {
	        if (opts === void 0) { opts = {}; }
	        console.warn('setViews() deprecated, use setPages() instead');
	        return this.setPages(components, opts);
	    };
	    /**
	     * You can set the views of the current navigation stack and navigate to the last view past
	     *
	     *
	     *```typescript
	     * import {Page, NavController} from 'ionic/ionic'
	     * import {Detail} from '../detail/detail'
	     * import {Info} from '../info/info'
	     *
	     *  export class Home {
	     *    constructor(nav: NavController) {
	     *      this.nav = nav;
	     *    }
	     *    setPages() {
	     *      this.nav.setPages([List,Detail, Info]);
	     *    }
	     *  }
	     *```
	     *
	     *
	     *In this example, we're giving the current nav stack an array of pages. Then the navigation stack will navigate to the last view in the array and remove the orignal view you came from.
	     *
	     *By default, animations are disabled, but they can be enabled by passing options to the navigation controller
	     *
	     *
	     *```typescript
	     * import {Page, NavController} from 'ionic/ionic'
	     * import {Detail} from '../detail/detail'
	     * import {Info} from '../info/info'
	     *
	     *  export class Home {
	     *    constructor(nav: NavController) {
	     *      this.nav = nav;
	     *    }
	     *    setPages() {
	     *      this.nav.setPages([List,Detail, Info],{
	     *        animate: true
	     *      });
	     *    }
	     *  }
	     *```
	     *
	     *
	     *You can also pass any navigation params to the individual pages in the array.
	     *
	     *
	     *```typescript
	     * import {Page, NavController} from 'ionic/ionic'
	     * import {Detail} from '../detail/detail'
	     * import {Info} from '../info/info'
	     *
	     *  export class Home {
	     *    constructor(nav: NavController) {
	     *      this.nav = nav;
	     *    }
	     *    setPages() {
	     *      this.nav.setPages([{
	     *        componentType: List,
	     *        params: {id: 43}
	     *      }, {
	     *        componentType: Detail,
	     *        params: {id: 45}
	     *      },{
	     *        componentType: Info,
	     *        params: {id: 5}
	     *      }]);
	     *    }
	     *  }
	     *```
	     *
	     * @param {Array} component an arry of components to load in the stack
	     * @param {Object} [opts={}] Any options you want to use pass
	     * @returns {Promise} Returns a promise when the pages are set
	     */
	    NavController.prototype.setPages = function (components, opts) {
	        if (opts === void 0) { opts = {}; }
	        if (!components || !components.length) {
	            return Promise.resolve();
	        }
	        var leavingView = this.getActive() || new view_controller_1.ViewController();
	        // if animate has not been set then default to false
	        opts.animate = opts.animate || false;
	        // ensure leaving views are not cached, and should be destroyed
	        opts.cacheLeavingView = false;
	        // get the views to auto remove without having to do a transiton for each
	        // the last view (the currently active one) will do a normal transition out
	        if (this._views.length > 1) {
	            var autoRemoveItems = this._views.slice(0, this._views.length - 1);
	            var popView;
	            for (var i = 0; i < autoRemoveItems.length; i++) {
	                popView = autoRemoveItems[i];
	                popView.shouldDestroy = true;
	                popView.shouldCache = false;
	                popView.willUnload();
	                if (opts.animate) {
	                    // only the leaving view should be shown, all others hide
	                    this._cachePage(popView, (popView === leavingView));
	                }
	            }
	        }
	        var componentObj = null;
	        var componentType = null;
	        var viewCtrl = null;
	        // create the ViewControllers that go before the new active ViewController
	        // in the stack, but the previous views shouldn't render yet
	        if (components.length > 1) {
	            var newBeforeItems = components.slice(0, components.length - 1);
	            for (var j = 0; j < newBeforeItems.length; j++) {
	                componentObj = newBeforeItems[j];
	                if (componentObj) {
	                    // could be an object with a componentType property, or it is a componentType
	                    componentType = componentObj.componentType || componentObj;
	                    viewCtrl = new view_controller_1.ViewController(this, componentType, componentObj.params);
	                    viewCtrl.state = CACHED_STATE;
	                    viewCtrl.shouldDestroy = false;
	                    viewCtrl.shouldCache = false;
	                    // add the item to the stack
	                    this._add(viewCtrl);
	                }
	            }
	        }
	        // get the component that will become the active item
	        // it'll be the last one in the given components array
	        componentObj = components[components.length - 1];
	        componentType = componentObj.componentType || componentObj;
	        // transition the leaving and entering
	        return this.push(componentType, componentObj.params, opts);
	    };
	    /**
	     * Set the root for the current navigation stack
	     * @param {Component} The name of the component you want to push on the navigation stack
	     * @param {Object} [params={}] Any nav-params you want to pass along to the next view
	     * @param {Object} [opts={}] Any options you want to use pass to transtion
	     * @returns {Promise} Returns a promise when done
	     */
	    NavController.prototype.setRoot = function (componentType, params, opts) {
	        if (params === void 0) { params = {}; }
	        if (opts === void 0) { opts = {}; }
	        return this.setPages([{
	                componentType: componentType,
	                params: params
	            }], opts);
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._transition = function (enteringView, leavingView, opts, done) {
	        if (enteringView === leavingView) {
	            // if the entering view and leaving view are the same thing don't continue
	            return done(enteringView);
	        }
	        if (!opts.animation) {
	            opts.animation = this.config.get('pageTransition');
	        }
	        if (this.config.get('animate') === false) {
	            opts.animate = false;
	        }
	        if (!enteringView) {
	            // if no entering view then create a bogus one
	            // already consider this bogus one loaded
	            enteringView = new view_controller_1.ViewController();
	            enteringView.loaded();
	        }
	        var wtfScope = instrumentation_1.wtfStartTimeRange('ionic.NavController#_transition ' + enteringView.name);
	        /* Async steps to complete a transition
	          1. _render: compile the view and render it in the DOM. Load page if it hasn't loaded already. When done call postRender
	          2. _postRender: Run willEnter/willLeave, then wait a frame (change detection happens), then call beginTransition
	          3. _beforeTrans: Create the transition's animation, play the animation, wait for it to end
	          4. _afterTrans: Run didEnter/didLeave, call _transComplete()
	          5. _transComplete: Cleanup, remove cache views, then call the final callback
	        */
	        // begin the multiple async process of transitioning to the entering view
	        this._render(enteringView, leavingView, opts, function () {
	            instrumentation_1.wtfEndTimeRange(wtfScope);
	            done(enteringView);
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._render = function (enteringView, leavingView, opts, done) {
	        // compile/load the view into the DOM
	        var _this = this;
	        if (enteringView.shouldDestroy) {
	            // about to be destroyed, shouldn't continue
	            done();
	        }
	        else if (enteringView.isLoaded()) {
	            // already compiled this view, do not load again and continue
	            this._postRender(enteringView, leavingView, opts, done);
	        }
	        else {
	            // view has not been compiled/loaded yet
	            // continue once the view has finished compiling
	            // DOM WRITE
	            this.loadPage(enteringView, null, opts, function () {
	                if (enteringView.onReady) {
	                    // this entering view needs to wait for it to be ready
	                    // this is used by Tabs to wait for the first page of
	                    // the first selected tab to be loaded
	                    enteringView.onReady(function () {
	                        enteringView.loaded();
	                        _this._postRender(enteringView, leavingView, opts, done);
	                    });
	                }
	                else {
	                    enteringView.loaded();
	                    _this._postRender(enteringView, leavingView, opts, done);
	                }
	            });
	        }
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._postRender = function (enteringView, leavingView, opts, done) {
	        var _this = this;
	        var wtfScope = instrumentation_1.wtfStartTimeRange('ionic.NavController#_postRender ' + enteringView.name);
	        // called after _render has completed and the view is compiled/loaded
	        if (enteringView.shouldDestroy) {
	            // view already marked as a view that will be destroyed, don't continue
	            instrumentation_1.wtfEndTimeRange(wtfScope);
	            done();
	        }
	        else if (!opts.preload) {
	            // the enteringView will become the active view, and is not being preloaded
	            // call each view's lifecycle events
	            // POSSIBLE DOM READ THEN DOM WRITE
	            enteringView.willEnter();
	            leavingView.willLeave();
	            // set the correct zIndex for the entering and leaving views
	            // DOM WRITE
	            this._setZIndex(enteringView, leavingView, opts.direction);
	            // make sure the entering and leaving views are showing
	            // and all others are hidden, but don't remove the leaving view yet
	            // DOM WRITE
	            this._cleanup(enteringView, leavingView, true);
	            // lifecycle events may have updated some data
	            // wait one frame and allow the raf to do a change detection
	            // before kicking off the transition and showing the new view
	            dom_1.raf(function () {
	                instrumentation_1.wtfEndTimeRange(wtfScope);
	                _this._beforeTrans(enteringView, leavingView, opts, done);
	            });
	        }
	        else {
	            // this view is being preloaded, don't call lifecycle events
	            // transition does not need to animate
	            opts.animate = false;
	            instrumentation_1.wtfEndTimeRange(wtfScope);
	            this._beforeTrans(enteringView, leavingView, opts, done);
	        }
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._beforeTrans = function (enteringView, leavingView, opts, done) {
	        var _this = this;
	        var wtfScope = instrumentation_1.wtfStartTimeRange('ionic.NavController#_beforeTrans ' + enteringView.name);
	        // called after one raf from postRender()
	        // create the transitions animation, play the animation
	        // when the transition ends call wait for it to end
	        // everything during the transition should runOutsideAngular
	        this._zone.runOutsideAngular(function () {
	            // ensure the entering view is not destroyed or cached
	            enteringView.shouldDestroy = false;
	            enteringView.shouldCache = false;
	            // set that the new view pushed on the stack is staged to be entering/leaving
	            // staged state is important for the transition to find the correct view
	            enteringView.state = STAGED_ENTERING_STATE;
	            leavingView.state = STAGED_LEAVING_STATE;
	            // init the transition animation
	            opts.renderDelay = opts.transitionDelay || self._trnsDelay;
	            var transAnimation = animation_1.Animation.createTransition(enteringView, leavingView, opts);
	            if (opts.animate === false) {
	                // force it to not animate the elements, just apply the "to" styles
	                transAnimation.clearDuration();
	                transAnimation.duration(0);
	            }
	            var duration = transAnimation.duration();
	            var enableApp = (duration < 64);
	            // block any clicks during the transition and provide a
	            // fallback to remove the clickblock if something goes wrong
	            _this.app.setEnabled(enableApp, duration);
	            _this.setTransitioning(!enableApp, duration);
	            if (opts.pageType) {
	                transAnimation.before.addClass(opts.pageType);
	            }
	            instrumentation_1.wtfEndTimeRange(wtfScope);
	            // start the transition
	            transAnimation.play(function () {
	                // transition animation has ended
	                // dispose the animation and it's element references
	                transAnimation.dispose();
	                _this._afterTrans(enteringView, leavingView, opts, done);
	            });
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._afterTrans = function (enteringView, leavingView, opts, done) {
	        var _this = this;
	        var wtfScope = instrumentation_1.wtfStartTimeRange('ionic.NavController#_afterTrans ' + enteringView.name);
	        // transition has completed, update each view's state
	        // place back into the zone, run didEnter/didLeave
	        // call the final callback when done
	        enteringView.state = ACTIVE_STATE;
	        leavingView.state = CACHED_STATE;
	        // run inside of the zone again
	        this._zone.run(function () {
	            if (!opts.preload) {
	                enteringView.didEnter();
	                leavingView.didLeave();
	            }
	            if (_this.keyboard.isOpen()) {
	                // the keyboard is still open!
	                // no problem, let's just close for them
	                _this.keyboard.onClose(function () {
	                    // keyboard has finished closing, transition complete
	                    _this._transComplete();
	                    instrumentation_1.wtfEndTimeRange(wtfScope);
	                    done();
	                }, 32);
	            }
	            else {
	                // all good, transition complete
	                _this._transComplete();
	                instrumentation_1.wtfEndTimeRange(wtfScope);
	                done();
	            }
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._transComplete = function () {
	        var wtfScope = instrumentation_1.wtfCreateScope('ionic.NavController#_transComplete')();
	        this._views.forEach(function (view) {
	            if (view) {
	                if (view.shouldDestroy) {
	                    view.didUnload();
	                }
	                else if (view.state === CACHED_STATE && view.shouldCache) {
	                    view.shouldCache = false;
	                }
	            }
	        });
	        // allow clicks again, but still set an enable time
	        // meaning nothing with this view controller can happen for XXms
	        this.app.setEnabled(true);
	        this.setTransitioning(false);
	        this._sbComplete();
	        this._cleanup();
	        instrumentation_1.wtfLeave(wtfScope);
	    };
	    /**
	     * @private
	     */
	    NavController.prototype.loadPage = function (viewCtrl, navbarContainerRef, opts, done) {
	        var _this = this;
	        var wtfTimeRangeScope = instrumentation_1.wtfStartTimeRange('ionic.NavController#loadPage ' + viewCtrl.name);
	        // guts of DynamicComponentLoader#loadIntoLocation
	        this._compiler.compileInHost(viewCtrl.componentType).then(function (hostProtoViewRef) {
	            var wtfScope = instrumentation_1.wtfCreateScope('ionic.NavController#loadPage_After_Compile')();
	            var providers = _this.providers.concat(core_1.Injector.resolve([
	                core_1.provide(view_controller_1.ViewController, { useValue: viewCtrl }),
	                core_1.provide(NavParams, { useValue: viewCtrl.params })
	            ]));
	            var location = _this.elementRef;
	            if (_this._anchorName) {
	                location = _this._viewManager.getNamedElementInComponentView(location, _this._anchorName);
	            }
	            var viewContainer = _this._viewManager.getViewContainer(location);
	            var hostViewRef = viewContainer.createHostView(hostProtoViewRef, viewContainer.length, providers);
	            var pageElementRef = _this._viewManager.getHostElement(hostViewRef);
	            var component = _this._viewManager.getComponent(pageElementRef);
	            // auto-add page css className created from component JS class name
	            var cssClassName = util_1.pascalCaseToDashCase(viewCtrl.componentType.name);
	            _this._renderer.setElementClass(pageElementRef, cssClassName, true);
	            viewCtrl.addDestroy(function () {
	                // ensure the element is cleaned up for when the view pool reuses this element
	                _this._renderer.setElementAttribute(pageElementRef, 'class', null);
	                _this._renderer.setElementAttribute(pageElementRef, 'style', null);
	                // remove the page from its container
	                var index = viewContainer.indexOf(hostViewRef);
	                if (index !== -1) {
	                    viewContainer.remove(index);
	                }
	            });
	            // a new ComponentRef has been created
	            // set the ComponentRef's instance to this ViewController
	            viewCtrl.setInstance(component);
	            // remember the ElementRef to the ion-page elementRef that was just created
	            viewCtrl.setPageRef(pageElementRef);
	            if (!navbarContainerRef) {
	                navbarContainerRef = viewCtrl.getNavbarViewRef();
	            }
	            var navbarTemplateRef = viewCtrl.getNavbarTemplateRef();
	            if (navbarContainerRef && navbarTemplateRef) {
	                var navbarView = navbarContainerRef.createEmbeddedView(navbarTemplateRef);
	                viewCtrl.addDestroy(function () {
	                    var index = navbarContainerRef.indexOf(navbarView);
	                    if (index > -1) {
	                        navbarContainerRef.remove(index);
	                    }
	                });
	            }
	            opts.postLoad && opts.postLoad(viewCtrl);
	            if (_this._views.length === 1) {
	                _this._zone.runOutsideAngular(function () {
	                    dom_1.rafFrames(38, function () {
	                        _this._renderer.setElementClass(_this.elementRef, 'has-views', true);
	                    });
	                });
	            }
	            instrumentation_1.wtfEndTimeRange(wtfTimeRangeScope);
	            instrumentation_1.wtfLeave(wtfScope);
	            done(viewCtrl);
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._setZIndex = function (enteringView, leavingView, direction) {
	        var enteringPageRef = enteringView && enteringView.pageRef();
	        if (enteringPageRef) {
	            if (!leavingView || !leavingView.isLoaded()) {
	                enteringView.zIndex = this.initZIndex;
	            }
	            else if (direction === 'back') {
	                // moving back
	                enteringView.zIndex = leavingView.zIndex - 1;
	            }
	            else {
	                // moving forward
	                enteringView.zIndex = leavingView.zIndex + 1;
	            }
	            if (enteringView.zIndex !== enteringView._zIndex) {
	                this._renderer.setElementStyle(enteringPageRef, 'z-index', enteringView.zIndex);
	                enteringView._zIndex = enteringView.zIndex;
	            }
	        }
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._cachePage = function (viewCtrl, shouldShow) {
	        // using hidden element attribute to display:none and not render views
	        // renderAttr of '' means the hidden attribute will be added
	        // renderAttr of null means the hidden attribute will be removed
	        // doing checks to make sure we only make an update to the element when needed
	        if (shouldShow && viewCtrl._hdnAttr === '' ||
	            !shouldShow && viewCtrl._hdnAttr !== '') {
	            viewCtrl._hdnAttr = (shouldShow ? null : '');
	            this._renderer.setElementAttribute(viewCtrl.pageRef(), 'hidden', viewCtrl._hdnAttr);
	            var navbarRef = viewCtrl.navbarRef();
	            if (navbarRef) {
	                this._renderer.setElementAttribute(navbarRef, 'hidden', viewCtrl._hdnAttr);
	            }
	        }
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._cleanup = function (activeView, previousView, skipDestroy) {
	        var _this = this;
	        // the active page, and the previous page, should be rendered in dom and ready to go
	        // all others, like a cached page 2 back, should be display: none and not rendered
	        var destroys = [];
	        activeView = activeView || this.getActive();
	        previousView = previousView || this.getPrevious(activeView);
	        this._views.forEach(function (view) {
	            if (view) {
	                if (view.shouldDestroy && !skipDestroy) {
	                    destroys.push(view);
	                }
	                else if (view.isLoaded()) {
	                    var shouldShow = (view === activeView) || (view === previousView);
	                    _this._cachePage(view, shouldShow);
	                }
	            }
	        });
	        // all pages being destroyed should be removed from the list of pages
	        // and completely removed from the dom
	        destroys.forEach(function (view) {
	            _this._remove(view);
	            view.destroy();
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype.swipeBackStart = function () {
	        var _this = this;
	        return;
	        if (!this.app.isEnabled() || !this.canSwipeBack()) {
	            return;
	        }
	        // disables the app during the transition
	        this.app.setEnabled(false);
	        this.setTransitioning(true);
	        // default the direction to "back"
	        var opts = {
	            direction: 'back'
	        };
	        // get the active view and set that it is staged to be leaving
	        // was probably the one popped from the stack
	        var leavingView = this.getActive() || new view_controller_1.ViewController();
	        leavingView.shouldDestroy = true;
	        leavingView.shouldCache = false;
	        leavingView.willLeave();
	        leavingView.willUnload();
	        // the entering view is now the new last view
	        var enteringView = this.getPrevious(leavingView);
	        enteringView.shouldDestroy = false;
	        enteringView.shouldCache = false;
	        enteringView.willEnter();
	        // wait for the new view to complete setup
	        this._render(enteringView, {}, function () {
	            _this._zone.runOutsideAngular(function () {
	                // set that the new view pushed on the stack is staged to be entering/leaving
	                // staged state is important for the transition to find the correct view
	                enteringView.state = STAGED_ENTERING_STATE;
	                leavingView.state = STAGED_LEAVING_STATE;
	                // init the swipe back transition animation
	                _this._sbTrans = Transition.create(_this, opts);
	                _this._sbTrans.easing('linear').progressStart();
	            });
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype.swipeBackProgress = function (value) {
	        return;
	        if (this._sbTrans) {
	            // continue to disable the app while actively dragging
	            this.app.setEnabled(false, 4000);
	            this.setTransitioning(true, 4000);
	            // set the transition animation's progress
	            this._sbTrans.progress(value);
	        }
	    };
	    /**
	     * @private
	     */
	    NavController.prototype.swipeBackEnd = function (completeSwipeBack, rate) {
	        var _this = this;
	        return;
	        if (!this._sbTrans)
	            return;
	        // disables the app during the transition
	        this.app.setEnabled(false);
	        this.setTransitioning(true);
	        this._sbTrans.progressEnd(completeSwipeBack, rate).then(function () {
	            _this._zone.run(function () {
	                // find the views that were entering and leaving
	                var enteringView = _this._getStagedEntering();
	                var leavingView = _this._getStagedLeaving();
	                if (enteringView && leavingView) {
	                    // finish up the animation
	                    if (completeSwipeBack) {
	                        // swipe back has completed navigating back
	                        // update each view's state
	                        enteringView.state = ACTIVE_STATE;
	                        leavingView.state = CACHED_STATE;
	                        enteringView.didEnter();
	                        leavingView.didLeave();
	                        if (_this.router) {
	                            // notify router of the pop state change
	                            _this.router.stateChange('pop', enteringView);
	                        }
	                    }
	                    else {
	                        // cancelled the swipe back, they didn't end up going back
	                        // return views to their original state
	                        leavingView.state = ACTIVE_STATE;
	                        enteringView.state = CACHED_STATE;
	                        leavingView.willEnter();
	                        leavingView.didEnter();
	                        enteringView.didLeave();
	                        leavingView.shouldDestroy = false;
	                        enteringView.shouldDestroy = false;
	                    }
	                }
	                // empty out and dispose the swipe back transition animation
	                _this._sbTrans && _this._sbTrans.dispose();
	                _this._sbTrans = null;
	                // all done!
	                _this._transComplete();
	            });
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._sbComplete = function () {
	        return;
	        if (this.canSwipeBack()) {
	            // it is possible to swipe back
	            if (this.sbGesture) {
	                // this is already an active gesture, don't create another one
	                return;
	            }
	            var opts = {
	                edge: 'left',
	                threshold: this._sbThreshold
	            };
	            this.sbGesture = new swipe_back_1.SwipeBackGesture(this.getNativeElement(), opts, this);
	            console.debug('SwipeBackGesture listen');
	            this.sbGesture.listen();
	        }
	        else if (this.sbGesture) {
	            // it is not possible to swipe back and there is an
	            // active sbGesture, so unlisten it
	            console.debug('SwipeBackGesture unlisten');
	            this.sbGesture.unlisten();
	            this.sbGesture = null;
	        }
	    };
	    /**
	     * Check to see if swipe-to-go-back is enabled
	     * @param {boolean=} isSwipeBackEnabled Set whether or not swipe-to-go-back is enabled
	     * @returns {boolean} Whether swipe-to-go-back is enabled
	     */
	    NavController.prototype.isSwipeBackEnabled = function (val) {
	        if (arguments.length) {
	            this._sbEnabled = !!val;
	        }
	        return this._sbEnabled;
	    };
	    /**
	     * If it's possible to use swipe back or not. If it's not possible
	     * to go back, or swipe back is not enable then this will return false.
	     * If it is possible to go back, and swipe back is enabled, then this
	     * will return true.
	     * @returns {boolean} Whether you can swipe to go back
	     */
	    NavController.prototype.canSwipeBack = function () {
	        return (this._sbEnabled && this.canGoBack());
	    };
	    /**
	     * Returns `true` if there's a valid previous page that we can pop back to.
	     * Otherwise returns false.
	     * @returns {boolean} Whether there is a page to go back to
	     */
	    NavController.prototype.canGoBack = function () {
	        var activeView = this.getActive();
	        if (activeView) {
	            return activeView.enableBack();
	        }
	        return false;
	    };
	    /**
	     * @private
	     */
	    NavController.prototype.navbarViewContainer = function (nbContainer) {
	        if (nbContainer) {
	            this._nbContainer = nbContainer;
	        }
	        if (this._nbContainer) {
	            return this._nbContainer;
	        }
	        if (this.parent) {
	            return this.parent.navbarViewContainer();
	        }
	    };
	    /**
	     * @private
	     * @returns {TODO} TODO
	     */
	    NavController.prototype.anchorElementRef = function () {
	        if (arguments.length) {
	            this._anchorER = arguments[0];
	        }
	        return this._anchorER;
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._add = function (viewCtrl) {
	        this._incId(viewCtrl);
	        this._views.push(viewCtrl);
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._incId = function (viewCtrl) {
	        viewCtrl.id = this.id + '-' + (++this._ids);
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._remove = function (viewOrIndex) {
	        util_1.array.remove(this._views, viewOrIndex);
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._getStagedEntering = function () {
	        for (var i = 0, ii = this._views.length; i < ii; i++) {
	            if (this._views[i].state === STAGED_ENTERING_STATE) {
	                return this._views[i];
	            }
	        }
	        return null;
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._getStagedLeaving = function () {
	        for (var i = 0, ii = this._views.length; i < ii; i++) {
	            if (this._views[i].state === STAGED_LEAVING_STATE) {
	                return this._views[i];
	            }
	        }
	        return null;
	    };
	    /**
	     * @private
	     * @returns {Component} TODO
	     */
	    NavController.prototype.getActive = function () {
	        for (var i = this._views.length - 1; i >= 0; i--) {
	            if (this._views[i].state === ACTIVE_STATE && !this._views[i].shouldDestroy) {
	                return this._views[i];
	            }
	        }
	        return null;
	    };
	    /**
	     * @param {Index} The index of the page you want to get
	     * @returns {Component} Returns the component that matches the index given
	     */
	    NavController.prototype.getByIndex = function (index) {
	        if (index < this._views.length && index > -1) {
	            return this._views[index];
	        }
	        return null;
	    };
	    /**
	     * @private
	     * @param {Handle} The handle of the page you want to get
	     * @returns {Component} Returns the component that matches the handle given
	     */
	    NavController.prototype.getByHandle = function (handle) {
	        for (var i = 0, ii = this._views.length; i < ii; i++) {
	            if (this._views[i].handle === handle) {
	                return this._views[i];
	            }
	        }
	        return null;
	    };
	    /**
	     * @private
	     * @param {TODO} pageType  TODO
	     * @returns {TODO} TODO
	     */
	    NavController.prototype.getByType = function (pageType) {
	        for (var i = 0, ii = this._views.length; i < ii; i++) {
	            if (this._views[i].pageType === pageType) {
	                return this._views[i];
	            }
	        }
	        return null;
	    };
	    /**
	     * @private
	     * @param {TODO} view  TODO
	     * @returns {TODO} TODO
	     */
	    NavController.prototype.getPrevious = function (viewCtrl) {
	        if (viewCtrl) {
	            var viewIndex = this._views.indexOf(viewCtrl);
	            for (var i = viewIndex - 1; i >= 0; i--) {
	                if (!this._views[i].shouldDestroy) {
	                    return this._views[i];
	                }
	            }
	        }
	        return null;
	    };
	    /**
	     * First page in this nav controller's stack. This would not return a page which is about to be destroyed.
	     * @returns {Component} Returns the first component page in the current stack
	     */
	    NavController.prototype.first = function () {
	        for (var i = 0, l = this._views.length; i < l; i++) {
	            if (!this._views[i].shouldDestroy) {
	                return this._views[i];
	            }
	        }
	        return null;
	    };
	    /**
	     * Last page in this nav controller's stack. This would not return a page which is about to be destroyed.
	     * @returns {Component} Returns the last component page in the current stack
	     */
	    NavController.prototype.last = function () {
	        for (var i = this._views.length - 1; i >= 0; i--) {
	            if (!this._views[i].shouldDestroy) {
	                return this._views[i];
	            }
	        }
	        return null;
	    };
	    /**
	     * @private
	     * @param {TODO} view  TODO
	     * @returns {TODO} TODO
	     */
	    NavController.prototype.indexOf = function (viewCtrl) {
	        return this._views.indexOf(viewCtrl);
	    };
	    /**
	     * Number of sibling views in the nav controller. This does
	     * not include views which are about to be destroyed.
	     * @returns {Number} The number of views in stack, including the current view
	     */
	    NavController.prototype.length = function () {
	        var len = 0;
	        for (var i = 0, l = this._views.length; i < l; i++) {
	            if (!this._views[i].shouldDestroy) {
	                len++;
	            }
	        }
	        return len;
	    };
	    /**
	     * @private
	     * @param {TODO} view  TODO
	     * @returns {boolean}
	     */
	    NavController.prototype.isActive = function (viewCtrl) {
	        return !!(viewCtrl && viewCtrl.state === ACTIVE_STATE);
	    };
	    Object.defineProperty(NavController.prototype, "rootNav", {
	        /**
	         * Returns the root NavController.
	         * @returns {NavController}
	         */
	        get: function () {
	            var nav = this;
	            while (nav.parent) {
	                nav = nav.parent;
	            }
	            return nav;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     * @param {TODO} router  TODO
	     */
	    NavController.prototype.registerRouter = function (router) {
	        this.router = router;
	    };
	    return NavController;
	})(ion_1.Ion);
	exports.NavController = NavController;
	var ACTIVE_STATE = 1;
	var CACHED_STATE = 2;
	var STAGED_ENTERING_STATE = 3;
	var STAGED_LEAVING_STATE = 4;
	var ctrlIds = -1;
	/**
	 * @name NavParams
	 * @description
	 * NavParams are an object that exists on a page and can contain data for that particular view.
	 * Similar to how data was pass to a view in V1 with `$stateParams`, NavParams offer a much more flexible
	 * option with a simple `get` method.
	 *
	 * @usage
	 * ```ts
	 * export class MyClass{
	 *  constructor(params: NavParams){
	 *    this.params = params;
	 *    // userParams is an object we have in our nav-parameters
	 *    this.params.get('userParams');
	 *  }
	 * }
	 * ```
	 * @demo /docs/v2/demos/nav-params/
	 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
	 * @see {@link ../NavController/ NavController API Docs}
	 * @see {@link ../Nav/ Nav API Docs}
	 * @see {@link ../NavPush/ NavPush API Docs}
	 */
	var NavParams = (function () {
	    /**
	     * @private
	     * @param {TODO} data  TODO
	     */
	    function NavParams(data) {
	        this.data = data || {};
	    }
	    /**
	     * Get the value of a nav-parameter for the current view
	     *
	     * ```ts
	     * export class MyClass{
	     *  constructor(params: NavParams){
	     *    this.params = params;
	     *    // userParams is an object we have in our nav-parameters
	     *    this.params.get('userParams');
	     *  }
	     * }
	     * ```
	     *
	     *
	     * @param {string} parameter Which param you want to look up
	     */
	    NavParams.prototype.get = function (param) {
	        return this.data[param];
	    };
	    return NavParams;
	})();
	exports.NavParams = NavParams;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("angular2")["instrumentation"];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var dom = __webpack_require__(11);
	/**
	 * Base class for all Ionic components. Exposes some common functionality
	 * that all Ionic components need, such as accessing underlying native elements and
	 * sending/receiving app-level events.
	 */
	var Ion = (function () {
	    function Ion(elementRef, config) {
	        this.elementRef = elementRef;
	        this.config = config;
	    }
	    Ion.prototype.ngOnInit = function () {
	        var cls = this.constructor;
	        if (cls.defaultInputs && this.config) {
	            for (var prop in cls.defaultInputs) {
	                // Priority:
	                // ---------
	                // 1) Value set from within constructor
	                // 2) Value set from the host element's attribute
	                // 3) Value set by the users global config
	                // 4) Value set by the default mode/platform config
	                // 5) Value set from the component's default
	                if (this[prop]) {
	                    // this property has already been set on the instance
	                    // could be from the user setting the element's attribute
	                    // or from the user setting it within the constructor
	                    continue;
	                }
	                // get the property values from a global user/platform config
	                var configVal = this.config.get(prop);
	                if (configVal) {
	                    this[prop] = configVal;
	                    continue;
	                }
	                // wasn't set yet, so go with property's default value
	                this[prop] = cls.defaultInputs[prop];
	            }
	        }
	    };
	    Ion.prototype.getElementRef = function () {
	        return this.elementRef;
	    };
	    Ion.prototype.getNativeElement = function () {
	        return this.elementRef.nativeElement;
	    };
	    Ion.prototype.getDimensions = function () {
	        return dom.getDimensions(this);
	    };
	    Ion.prototype.width = function () {
	        return dom.getDimensions(this).width;
	    };
	    Ion.prototype.height = function () {
	        return dom.getDimensions(this).height;
	    };
	    return Ion;
	})();
	exports.Ion = Ion;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var nav_controller_1 = __webpack_require__(21);
	/**
	 * @name ViewController
	 * @description
	 * Access various features and information about the current view
	 * @usage
	 *  ```ts
	 *  import {Page, ViewController} from 'ionic/ionic';
	 *  @Page....
	 *  export class MyPage{
	 *   constructor(viewCtrl: ViewController){
	 *     this.viewCtrl = viewCtrl;
	 *   }
	 *  }
	 *  ```
	 */
	var ViewController = (function () {
	    function ViewController(navCtrl, componentType, params) {
	        if (params === void 0) { params = {}; }
	        this.navCtrl = navCtrl;
	        this.componentType = componentType;
	        this.params = new nav_controller_1.NavParams(params);
	        this.instance = {};
	        this.state = 0;
	        this._destroys = [];
	        this._loaded = false;
	    }
	    /**
	     * Check to see if you can go back in the navigation stack
	     * @param {boolean} Check whether or not you can go back from this page
	     * @returns {boolean} Returns if it's possible to go back from this Page.
	     */
	    ViewController.prototype.enableBack = function () {
	        // update if it's possible to go back from this nav item
	        if (this.navCtrl) {
	            var previousItem = this.navCtrl.getPrevious(this);
	            // the previous view may exist, but if it's about to be destroyed
	            // it shouldn't be able to go back to
	            return !!(previousItem && !previousItem.shouldDestroy);
	        }
	        return false;
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.setInstance = function (instance) {
	        this.instance = instance;
	    };
	    Object.defineProperty(ViewController.prototype, "name", {
	        /**
	         * @private
	         */
	        get: function () {
	            return this.componentType ? this.componentType.name : '';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ViewController.prototype, "index", {
	        /**
	         * You can find out the index of the current view is in the current navigation stack
	         *
	         * ```typescript
	         *  export class Page1 {
	         *    constructor(view: ViewController){
	         *      this.view = view;
	         *      // Just log out the index
	         *      console.log(this.view.index);
	         *    }
	         *  }
	         * ```
	         *
	         * @returns {Number} Returns the index of this page within its NavController.
	         */
	        get: function () {
	            return (this.navCtrl ? this.navCtrl.indexOf(this) : -1);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @returns {boolean} Returns if this Page is the root page of the NavController.
	     */
	    ViewController.prototype.isRoot = function () {
	        return (this.index === 0);
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.addDestroy = function (destroyFn) {
	        this._destroys.push(destroyFn);
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.destroy = function () {
	        for (var i = 0; i < this._destroys.length; i++) {
	            this._destroys[i]();
	        }
	        this._destroys = [];
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.setNavbarTemplateRef = function (templateRef) {
	        this._nbTmpRef = templateRef;
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.getNavbarTemplateRef = function () {
	        return this._nbTmpRef;
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.getNavbarViewRef = function () {
	        return this._nbVwRef;
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.setNavbarViewRef = function (viewContainerRef) {
	        this._nbVwRef = viewContainerRef;
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.setPageRef = function (elementRef) {
	        this._pgRef = elementRef;
	    };
	    /**
	     * @private
	     * @returns {ElementRef} Returns the Page's ElementRef
	     */
	    ViewController.prototype.pageRef = function () {
	        return this._pgRef;
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.setContentRef = function (elementRef) {
	        this._cntRef = elementRef;
	    };
	    /**
	     * @private
	     * @returns {ElementRef} Returns the Page's Content ElementRef
	     */
	    ViewController.prototype.contentRef = function () {
	        return this._cntRef;
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.setContent = function (directive) {
	        this._cntDir = directive;
	    };
	    /**
	     * @private
	     * @returns {Component} Returns the Page's Content component reference.
	     */
	    ViewController.prototype.getContent = function () {
	        return this._cntDir;
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.setNavbar = function (directive) {
	        this._nbDir = directive;
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.getNavbar = function () {
	        return this._nbDir;
	    };
	    /**
	     * You can find out of the current view has a Navbar or not. Be sure to wrap this in an `onPageWillEnter` method in order to make sure the view has rendered fully.
	     *
	     * ```typescript
	     * export class Page1 {
	     *  constructor(view: ViewController) {
	     *    this.view = view
	     *  }
	     *  onPageWillEnter(){
	     *    console.log('Do we have a Navbar?', this.view.hasNavbar());
	     *  }
	     *}
	     * ```
	     *
	     * @returns {boolean} Returns a boolean if this Page has a navbar or not.
	     */
	    ViewController.prototype.hasNavbar = function () {
	        return !!this.getNavbar();
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.navbarRef = function () {
	        var navbar = this.getNavbar();
	        return navbar && navbar.getElementRef();
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.titleRef = function () {
	        var navbar = this.getNavbar();
	        return navbar && navbar.getTitleRef();
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.navbarItemRefs = function () {
	        var navbar = this.getNavbar();
	        return navbar && navbar.getItemRefs();
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.backBtnRef = function () {
	        var navbar = this.getNavbar();
	        return navbar && navbar.getBackButtonRef();
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.backBtnTextRef = function () {
	        var navbar = this.getNavbar();
	        return navbar && navbar.getBackButtonTextRef();
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.navbarBgRef = function () {
	        var navbar = this.getNavbar();
	        return navbar && navbar.getBackgroundRef();
	    };
	    /**
	     * You can change the text of the back button on a view-by-view basis.
	     *
	     * ```ts
	     * export class MyClass{
	     *  constructor(viewCtrl: ViewController){
	     *    this.viewCtrl = viewCtrl
	     *  }
	     *  onPageWillEnter() {
	     *    this.viewCtrl.setBackButtonText('Previous');
	     *  }
	     * }
	     * ```
	     * Make sure you use the view events when calling this method, otherwise the back-button will not have been created
	     *
	     * @param {string} backButtonText Set the back button text.
	     */
	    ViewController.prototype.setBackButtonText = function (val) {
	        var navbar = this.getNavbar();
	        if (navbar) {
	            navbar.bbText = val;
	        }
	    };
	    /**
	     * Set if the back button for the current view is visible or not. Be sure to wrap this in `onPageWillEnter` to make sure the has been compleltly rendered.
	     * @param {boolean} Set if this Page's back button should show or not.
	     */
	    ViewController.prototype.showBackButton = function (shouldShow) {
	        var navbar = this.getNavbar();
	        if (navbar) {
	            navbar.hideBackButton = !shouldShow;
	        }
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.isLoaded = function () {
	        return this._loaded;
	    };
	    /**
	     * @private
	     * The view has loaded. This event only happens once per view being
	     * created. If a view leaves but is cached, then this will not
	     * fire again on a subsequent viewing. This method is a good place
	     * to put your setup code for the view; however, it is not the
	     * recommended method to use when a view becomes active.
	     */
	    ViewController.prototype.loaded = function () {
	        this._loaded = true;
	        if (!this.shouldDestroy) {
	            ctrlFn(this, 'onPageLoaded');
	        }
	    };
	    /**
	     * @private
	     * The view is about to enter and become the active view.
	     */
	    ViewController.prototype.willEnter = function () {
	        if (!this.shouldDestroy) {
	            ctrlFn(this, 'onPageWillEnter');
	        }
	    };
	    /**
	     * @private
	     * The view has fully entered and is now the active view. This
	     * will fire, whether it was the first load or loaded from the cache.
	     */
	    ViewController.prototype.didEnter = function () {
	        var navbar = this.getNavbar();
	        navbar && navbar.didEnter();
	        ctrlFn(this, 'onPageDidEnter');
	    };
	    /**
	     * @private
	     * The view has is about to leave and no longer be the active view.
	     */
	    ViewController.prototype.willLeave = function () {
	        ctrlFn(this, 'onPageWillLeave');
	    };
	    /**
	     * @private
	     * The view has finished leaving and is no longer the active view. This
	     * will fire, whether it is cached or unloaded.
	     */
	    ViewController.prototype.didLeave = function () {
	        ctrlFn(this, 'onPageDidLeave');
	    };
	    /**
	     * @private
	     * The view is about to be destroyed and have its elements removed.
	     */
	    ViewController.prototype.willUnload = function () {
	        ctrlFn(this, 'onPageWillUnload');
	    };
	    /**
	     * @private
	     * The view has been destroyed and its elements have been removed.
	     */
	    ViewController.prototype.didUnload = function () {
	        ctrlFn(this, 'onPageDidUnload');
	    };
	    return ViewController;
	})();
	exports.ViewController = ViewController;
	function ctrlFn(viewCtrl, fnName) {
	    if (viewCtrl.instance && viewCtrl.instance[fnName]) {
	        try {
	            viewCtrl.instance[fnName]();
	        }
	        catch (e) {
	            console.error(fnName + ': ' + e.message);
	        }
	    }
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var slide_edge_gesture_1 = __webpack_require__(26);
	var SwipeBackGesture = (function (_super) {
	    __extends(SwipeBackGesture, _super);
	    function SwipeBackGesture(element, opts, navCtrl) {
	        if (opts === void 0) { opts = {}; }
	        _super.call(this, element, opts);
	        // Can check corners through use of eg 'left top'
	        this.edges = opts.edge.split(' ');
	        this.threshold = opts.threshold;
	        this.navCtrl = navCtrl;
	    }
	    SwipeBackGesture.prototype.onSlideStart = function () {
	        this.navCtrl.swipeBackStart();
	    };
	    SwipeBackGesture.prototype.onSlide = function (slide, ev) {
	        this.navCtrl.swipeBackProgress(slide.distance / slide.max);
	    };
	    SwipeBackGesture.prototype.onSlideEnd = function (slide, ev) {
	        var shouldComplete = (Math.abs(ev.velocityX) > 0.2 || Math.abs(slide.delta) > Math.abs(slide.max) * 0.5);
	        // TODO: calculate a better playback rate depending on velocity and distance
	        this.navCtrl.swipeBackEnd(shouldComplete, 1);
	    };
	    return SwipeBackGesture;
	})(slide_edge_gesture_1.SlideEdgeGesture);
	exports.SwipeBackGesture = SwipeBackGesture;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var slide_gesture_1 = __webpack_require__(27);
	var util_1 = __webpack_require__(10);
	var dom_1 = __webpack_require__(11);
	var SlideEdgeGesture = (function (_super) {
	    __extends(SlideEdgeGesture, _super);
	    function SlideEdgeGesture(element, opts) {
	        if (opts === void 0) { opts = {}; }
	        util_1.defaults(opts, {
	            edge: 'left',
	            threshold: 50
	        });
	        _super.call(this, element, opts);
	        // Can check corners through use of eg 'left top'
	        this.edges = opts.edge.split(' ');
	        this.threshold = opts.threshold;
	    }
	    SlideEdgeGesture.prototype.canStart = function (ev) {
	        var _this = this;
	        this._d = this.getContainerDimensions();
	        return this.edges.every(function (edge) { return _this._checkEdge(edge, ev.center); });
	    };
	    SlideEdgeGesture.prototype.getContainerDimensions = function () {
	        return {
	            left: 0,
	            top: 0,
	            width: dom_1.windowDimensions().width,
	            height: dom_1.windowDimensions().height
	        };
	    };
	    SlideEdgeGesture.prototype._checkEdge = function (edge, pos) {
	        switch (edge) {
	            case 'left': return pos.x <= this._d.left + this.threshold;
	            case 'right': return pos.x >= this._d.width - this.threshold;
	            case 'top': return pos.y <= this._d.top + this.threshold;
	            case 'bottom': return pos.y >= this._d.height - this.threshold;
	        }
	    };
	    return SlideEdgeGesture;
	})(slide_gesture_1.SlideGesture);
	exports.SlideEdgeGesture = SlideEdgeGesture;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var drag_gesture_1 = __webpack_require__(28);
	var util = __webpack_require__(14);
	var SlideGesture = (function (_super) {
	    __extends(SlideGesture, _super);
	    function SlideGesture(element, opts) {
	        if (opts === void 0) { opts = {}; }
	        _super.call(this, element, opts);
	        this.element = element;
	    }
	    /*
	     * Get the min and max for the slide. pageX/pageY.
	     * Only called on dragstart.
	     */
	    SlideGesture.prototype.getSlideBoundaries = function (slide, ev) {
	        return {
	            min: 0,
	            max: this.element.offsetWidth
	        };
	    };
	    /*
	     * Get the element's pos when the drag starts.
	     * For example, an open side menu starts at 100% and a closed
	     * sidemenu starts at 0%.
	     */
	    SlideGesture.prototype.getElementStartPos = function (slide, ev) {
	        return 0;
	    };
	    SlideGesture.prototype.canStart = function () {
	        return true;
	    };
	    SlideGesture.prototype.onDragStart = function (ev) {
	        var _this = this;
	        if (!this.canStart(ev))
	            return false;
	        this.slide = {};
	        var promise = this.onSlideBeforeStart(this.slide, ev) || Promise.resolve();
	        promise.then(function () {
	            var _a = _this.getSlideBoundaries(_this.slide, ev), min = _a.min, max = _a.max;
	            _this.slide.min = min;
	            _this.slide.max = max;
	            _this.slide.elementStartPos = _this.getElementStartPos(_this.slide, ev);
	            _this.slide.pointerStartPos = ev.center[_this.direction];
	            _this.slide.started = true;
	            _this.onSlideStart(_this.slide, ev);
	        }).catch(function () {
	            _this.slide = null;
	        });
	    };
	    SlideGesture.prototype.onDrag = function (ev) {
	        if (!this.slide || !this.slide.started)
	            return;
	        this.slide.pos = ev.center[this.direction];
	        this.slide.distance = util.clamp(this.slide.min, this.slide.pos - this.slide.pointerStartPos + this.slide.elementStartPos, this.slide.max);
	        this.slide.delta = this.slide.pos - this.slide.pointerStartPos;
	        this.onSlide(this.slide, ev);
	    };
	    SlideGesture.prototype.onDragEnd = function (ev) {
	        if (!this.slide || !this.slide.started)
	            return;
	        this.onSlideEnd(this.slide, ev);
	        this.slide = null;
	    };
	    SlideGesture.prototype.onSlideBeforeStart = function () { };
	    SlideGesture.prototype.onSlideStart = function () { };
	    SlideGesture.prototype.onSlide = function () { };
	    SlideGesture.prototype.onSlideEnd = function () { };
	    return SlideGesture;
	})(drag_gesture_1.DragGesture);
	exports.SlideGesture = SlideGesture;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var gesture_1 = __webpack_require__(29);
	var util = __webpack_require__(14);
	var DragGesture = (function (_super) {
	    __extends(DragGesture, _super);
	    function DragGesture(element, opts) {
	        if (opts === void 0) { opts = {}; }
	        util.defaults(opts, {});
	        _super.call(this, element, opts);
	    }
	    DragGesture.prototype.listen = function () {
	        var _this = this;
	        _super.prototype.listen.call(this);
	        this.on('panstart', function (ev) {
	            if (_this.onDragStart(ev) !== false) {
	                _this.dragging = true;
	            }
	        });
	        this.on('panmove', function (ev) {
	            if (!_this.dragging)
	                return;
	            if (_this.onDrag(ev) === false) {
	                _this.dragging = false;
	            }
	        });
	        this.on('panend', function (ev) {
	            if (!_this.dragging)
	                return;
	            _this.onDragEnd(ev);
	            _this.dragging = false;
	        });
	        this.hammertime.get('pan').set(this._options);
	    };
	    DragGesture.prototype.onDrag = function () { };
	    DragGesture.prototype.onDragStart = function () { };
	    DragGesture.prototype.onDragEnd = function () { };
	    return DragGesture;
	})(gesture_1.Gesture);
	exports.DragGesture = DragGesture;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(14);
	var hammer_1 = __webpack_require__(30);
	/**
	 * A gesture recognizer class.
	 *
	 * TODO(mlynch): Re-enable the DOM event simulation that was causing issues (or verify hammer does this already, it might);
	 */
	var Gesture = (function () {
	    function Gesture(element, opts) {
	        if (opts === void 0) { opts = {}; }
	        util.defaults(opts, {
	            domEvents: true
	        });
	        this.element = element;
	        // Map 'x' or 'y' string to hammerjs opts
	        this.direction = opts.direction || 'x';
	        opts.direction = this.direction === 'x' ?
	            hammer_1.Hammer.DIRECTION_HORIZONTAL :
	            hammer_1.Hammer.DIRECTION_VERTICAL;
	        this._options = opts;
	        this._callbacks = {};
	    }
	    Gesture.prototype.options = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        util.extend(this._options, opts);
	    };
	    Gesture.prototype.on = function (type, cb) {
	        if (type == 'pinch' || type == 'rotate') {
	            this.hammertime.get('pinch').set({ enable: true });
	        }
	        this.hammertime.on(type, cb);
	        (this._callbacks[type] || (this._callbacks[type] = [])).push(cb);
	    };
	    Gesture.prototype.off = function (type, cb) {
	        this.hammertime.off(type, this._callbacks[type] ? cb : null);
	    };
	    Gesture.prototype.listen = function () {
	        this.hammertime = hammer_1.Hammer(this.element, this._options);
	    };
	    Gesture.prototype.unlisten = function () {
	        if (this.hammertime) {
	            for (var type in this._callbacks) {
	                for (var i = 0; i < this._callbacks[type].length; i++) {
	                    this.hammertime.off(type, this._callbacks[type]);
	                }
	            }
	            this.hammertime.destroy();
	            this.hammertime = null;
	            this._callbacks = {};
	        }
	    };
	    Gesture.prototype.destroy = function () {
	        this.unlisten();
	    };
	    return Gesture;
	})();
	exports.Gesture = Gesture;

/***/ },
/* 30 */
/***/ function(module, exports) {

	/*! Hammer.JS - v2.0.4 - 2014-09-28
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2014 Jorik Tangelder;
	 * Licensed under the MIT license */
	var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');
	var TYPE_FUNCTION = 'function';
	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;
	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	    return setTimeout(bindFn(fn, context), timeout);
	}
	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	    if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	    }
	    return false;
	}
	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i;
	    if (!obj) {
	        return;
	    }
	    if (obj.forEach) {
	        obj.forEach(iterator, context);
	    }
	    else if (obj.length !== undefined) {
	        i = 0;
	        while (i < obj.length) {
	            iterator.call(context, obj[i], i, obj);
	            i++;
	        }
	    }
	    else {
	        for (i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge]
	 * @returns {Object} dest
	 */
	function extend(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	}
	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	function merge(dest, src) {
	    return extend(dest, src, true);
	}
	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype, childP;
	    childP = child.prototype = Object.create(baseP);
	    childP.constructor = child;
	    childP._super = baseP;
	    if (properties) {
	        extend(childP, properties);
	    }
	}
	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function boundFn() {
	        return fn.apply(context, arguments);
	    };
	}
	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	    if (typeof val == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined : undefined, args);
	    }
	    return val;
	}
	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	    return (val1 === undefined) ? val2 : val1;
	}
	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	    each(splitStr(types), function (type) {
	        //console.debug('hammer addEventListener', type, target.tagName);
	        target.addEventListener(type, handler, false);
	    });
	}
	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	    each(splitStr(types), function (type) {
	        //console.debug('hammer removeEventListener', type, target.tagName);
	        target.removeEventListener(type, handler, false);
	    });
	}
	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while (node) {
	        if (node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}
	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	    return str.indexOf(find) > -1;
	}
	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}
	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    }
	    else {
	        var i = 0;
	        while (i < src.length) {
	            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    }
	}
	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}
	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	    var results = [];
	    var values = [];
	    var i = 0;
	    while (i < src.length) {
	        var val = key ? src[i][key] : src[i];
	        if (inArray(values, val) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = val;
	        i++;
	    }
	    if (sort) {
	        if (!key) {
	            results = results.sort();
	        }
	        else {
	            results = results.sort(function sortUniqueArray(a, b) {
	                return a[key] > b[key];
	            });
	        }
	    }
	    return results;
	}
	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	    var prefix, prop;
	    var camelProp = property[0].toUpperCase() + property.slice(1);
	    var i = 0;
	    while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;
	        if (prop in obj) {
	            return prop;
	        }
	        i++;
	    }
	    return undefined;
	}
	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	    return _uniqueId++;
	}
	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	    var doc = element.ownerDocument;
	    return (doc.defaultView || doc.parentWindow);
	}
	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';
	var COMPUTE_INTERVAL = 25;
	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;
	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;
	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];
	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget;
	    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.
	    this.domHandler = function (ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	            self.handler(ev);
	        }
	    };
	    this.init();
	}
	Input.prototype = {
	    /**
	     * should handle the inputEvent data and trigger the callback
	     * @virtual
	     */
	    handler: function () { },
	    /**
	     * bind the events
	     */
	    init: function () {
	        //console.debug('hammer Input init')
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },
	    /**
	     * unbind the events
	     */
	    destroy: function () {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    }
	};
	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    var inputClass = manager.options.inputClass;
	    if (inputClass) {
	        Type = inputClass;
	    }
	    else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    }
	    else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    }
	    else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    }
	    else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}
	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));
	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;
	    if (isFirst) {
	        manager.session = {};
	    }
	    // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'
	    input.eventType = eventType;
	    // compute scale, rotation etc
	    computeInputData(manager, input);
	    // emit secret event
	    manager.emit('hammer.input', input);
	    manager.recognize(input);
	    manager.session.prevInput = input;
	}
	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;
	    // store the first input to calculate the distance and direction
	    if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }
	    // to compute scale and rotation we need to store the multiple touches
	    if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    }
	    else if (pointersLength === 1) {
	        session.firstMultiple = false;
	    }
	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	    var center = input.center = getCenter(pointers);
	    input.timeStamp = now();
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;
	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);
	    computeDeltaXY(session, input);
	    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	    computeIntervalInputData(session, input);
	    // find the correct target
	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	}
	function computeDeltaXY(session, input) {
	    var center = input.center;
	    var offset = session.offsetDelta || {};
	    var prevDelta = session.prevDelta || {};
	    var prevInput = session.prevInput || {};
	    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	            x: prevInput.deltaX || 0,
	            y: prevInput.deltaY || 0
	        };
	        offset = session.offsetDelta = {
	            x: center.x,
	            y: center.y
	        };
	    }
	    input.deltaX = prevDelta.x + (center.x - offset.x);
	    input.deltaY = prevDelta.y + (center.y - offset.y);
	}
	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval || input, deltaTime = input.timeStamp - last.timeStamp, velocity, velocityX, velocityY, direction;
	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	        var deltaX = last.deltaX - input.deltaX;
	        var deltaY = last.deltaY - input.deltaY;
	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);
	        session.lastInterval = input;
	    }
	    else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	    }
	    input.velocity = velocity;
	    input.velocityX = velocityX;
	    input.velocityY = velocityY;
	    input.direction = direction;
	}
	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    var i = 0;
	    while (i < input.pointers.length) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	    }
	    return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}
	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;
	    // no need to loop when only one touch
	    if (pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }
	    var x = 0, y = 0, i = 0;
	    while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	    }
	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}
	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	    return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	    };
	}
	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	    if (x === y) {
	        return DIRECTION_NONE;
	    }
	    if (abs(x) >= abs(y)) {
	        return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}
	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]], y = p2[props[1]] - p1[props[1]];
	    return Math.sqrt((x * x) + (y * y));
	}
	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]], y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}
	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}
	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}
	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END
	};
	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	    this.evEl = MOUSE_ELEMENT_EVENTS;
	    this.evWin = MOUSE_WINDOW_EVENTS;
	    this.allow = true; // used by Input.TouchMouse to disable mouse events
	    this.pressed = false; // mousedown state
	    Input.apply(this, arguments);
	}
	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];
	        // on start we want to have the left mouse button down
	        if (eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }
	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	            eventType = INPUT_END;
	        }
	        // mouse must be down, and mouse events are allowed (see the TouchMouse input)
	        if (!this.pressed || !this.allow) {
	            return;
	        }
	        if (eventType & INPUT_END) {
	            this.pressed = false;
	        }
	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    }
	});
	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};
	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};
	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}
	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	    this.evEl = POINTER_ELEMENT_EVENTS;
	    this.evWin = POINTER_WINDOW_EVENTS;
	    Input.apply(this, arguments);
	    this.store = (this.manager.session.pointerEvents = []);
	}
	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;
	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
	        var isTouch = (pointerType == INPUT_TYPE_TOUCH);
	        // get index of the event in the store
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');
	        // start and mouse must be down
	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	            if (storeIndex < 0) {
	                store.push(ev);
	                storeIndex = store.length - 1;
	            }
	        }
	        else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }
	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        if (storeIndex < 0) {
	            return;
	        }
	        // update the event in the store
	        store[storeIndex] = ev;
	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: pointerType,
	            srcEvent: ev
	        });
	        if (removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	        }
	    }
	});
	var SINGLE_TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    this.started = false;
	    Input.apply(this, arguments);
	}
	inherit(SingleTouchInput, Input, {
	    handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
	        // should we handle the touch events?
	        if (type === INPUT_START) {
	            this.started = true;
	        }
	        if (!this.started) {
	            return;
	        }
	        var touches = normalizeSingleTouches.call(this, ev, type);
	        // when done, reset the started state
	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	            this.started = false;
	        }
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	    var all = toArray(ev.touches);
	    var changed = toArray(ev.changedTouches);
	    if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	    }
	    return [all, changed];
	}
	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	    this.evTarget = TOUCH_TARGET_EVENTS;
	    this.targetIds = {};
	    Input.apply(this, arguments);
	}
	inherit(TouchInput, Input, {
	    handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);
	        if (!touches) {
	            return;
	        }
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	    var allTouches = toArray(ev.touches);
	    var targetIds = this.targetIds;
	    // when there is only one touch, the process can be simplified
	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	    }
	    var i, targetTouches, changedTouches = toArray(ev.changedTouches), changedTargetTouches = [], target = this.target;
	    // get target touches from touches
	    targetTouches = allTouches.filter(function (touch) {
	        return hasParent(touch.target, target);
	    });
	    // collect touches
	    if (type === INPUT_START) {
	        i = 0;
	        while (i < targetTouches.length) {
	            targetIds[targetTouches[i].identifier] = true;
	            i++;
	        }
	    }
	    // filter changed touches to only contain touches that exist in the collected target ids
	    i = 0;
	    while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	            changedTargetTouches.push(changedTouches[i]);
	        }
	        // cleanup removed touches
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            delete targetIds[changedTouches[i].identifier];
	        }
	        i++;
	    }
	    if (!changedTargetTouches.length) {
	        return;
	    }
	    return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	        changedTargetTouches
	    ];
	}
	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */
	function TouchMouseInput() {
	    Input.apply(this, arguments);
	    var handler = bindFn(this.handler, this);
	    this.touch = new TouchInput(this.manager, handler);
	    this.mouse = new MouseInput(this.manager, handler);
	}
	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH), isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);
	        // when we're in a touch event, so  block all upcoming mouse events
	        // most mobile browser also emit mouseevents, right after touchstart
	        if (isTouch) {
	            this.mouse.allow = false;
	        }
	        else if (isMouse && !this.mouse.allow) {
	            return;
	        }
	        // reset the allowMouse when we're done
	        if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
	            this.mouse.allow = true;
	        }
	        this.callback(manager, inputEvent, inputData);
	    },
	    /**
	     * remove the event listeners
	     */
	    destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});
	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	}
	TouchAction.prototype = {
	    /**
	     * set the touchAction value on the element or enable the polyfill
	     * @param {String} value
	     */
	    set: function (value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	            value = this.compute();
	        }
	        if (NATIVE_TOUCH_ACTION) {
	            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }
	        this.actions = value.toLowerCase().trim();
	    },
	    /**
	     * just re-set the touchAction value
	     */
	    update: function () {
	        this.set(this.manager.options.touchAction);
	    },
	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function () {
	        var actions = [];
	        each(this.manager.recognizers, function (recognizer) {
	            if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                actions = actions.concat(recognizer.getTouchAction());
	            }
	        });
	        return cleanTouchActions(actions.join(' '));
	    },
	    /**
	     * this method is called on each input cycle and provides the preventing of the browser behavior
	     * @param {Object} input
	     */
	    preventDefaults: function (input) {
	        // not needed with native support for the touchAction property
	        if (NATIVE_TOUCH_ACTION) {
	            return;
	        }
	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection;
	        // if the touch action did prevented once this session
	        if (this.manager.session.prevented) {
	            srcEvent.preventDefault();
	            return;
	        }
	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE);
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	        if (hasNone ||
	            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & DIRECTION_VERTICAL)) {
	            return this.preventSrc(srcEvent);
	        }
	    },
	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function (srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	    }
	};
	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	    // none
	    if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	    }
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	    // pan-x and pan-y can be combined
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;
	    }
	    // pan-x OR pan-y
	    if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	    }
	    // manipulation
	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	    }
	    return TOUCH_ACTION_AUTO;
	}
	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;
	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	    this.id = uniqueId();
	    this.manager = null;
	    this.options = merge(options || {}, this.defaults);
	    // default is enable true
	    this.options.enable = ifUndefined(this.options.enable, true);
	    this.state = STATE_POSSIBLE;
	    this.simultaneous = {};
	    this.requireFail = [];
	}
	Recognizer.prototype = {
	    /**
	     * @virtual
	     * @type {Object}
	     */
	    defaults: {},
	    /**
	     * set options
	     * @param {Object} options
	     * @return {Recognizer}
	     */
	    set: function (options) {
	        extend(this.options, options);
	        // also update the touchAction, in case something changed about the directions/enabled state
	        this.manager && this.manager.touchAction.update();
	        return this;
	    },
	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function (otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	            return this;
	        }
	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (!simultaneous[otherRecognizer.id]) {
	            simultaneous[otherRecognizer.id] = otherRecognizer;
	            otherRecognizer.recognizeWith(this);
	        }
	        return this;
	    },
	    /**
	     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRecognizeWith: function (otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	            return this;
	        }
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	    },
	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function (otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	            return this;
	        }
	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (inArray(requireFail, otherRecognizer) === -1) {
	            requireFail.push(otherRecognizer);
	            otherRecognizer.requireFailure(this);
	        }
	        return this;
	    },
	    /**
	     * drop the requireFailure link. it does not remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRequireFailure: function (otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	            return this;
	        }
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);
	        if (index > -1) {
	            this.requireFail.splice(index, 1);
	        }
	        return this;
	    },
	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function () {
	        return this.requireFail.length > 0;
	    },
	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function (otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	    },
	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function (input) {
	        var self = this;
	        var state = this.state;
	        function emit(withState) {
	            self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);
	        }
	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(true);
	        }
	        emit(); // simple 'eventName' events
	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(true);
	        }
	    },
	    /**
	     * Check that all the require failure recognizers has failed,
	     * if true, it emits a gesture event,
	     * otherwise, setup the state to FAILED.
	     * @param {Object} input
	     */
	    tryEmit: function (input) {
	        if (this.canEmit()) {
	            return this.emit(input);
	        }
	        // it's failing anyway
	        this.state = STATE_FAILED;
	    },
	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function () {
	        var i = 0;
	        while (i < this.requireFail.length) {
	            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    },
	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function (inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = extend({}, inputData);
	        // is is enabled and allow recognizing?
	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }
	        // reset when we've reached the end
	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }
	        this.state = this.process(inputDataClone);
	        // the recognizer has recognized a gesture
	        // so trigger an event
	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.tryEmit(inputDataClone);
	        }
	    },
	    /**
	     * return the state of the recognizer
	     * the actual recognizing happens in this method
	     * @virtual
	     * @param {Object} inputData
	     * @returns {Const} STATE
	     */
	    process: function (inputData) { },
	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function () { },
	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function () { }
	};
	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	    if (state & STATE_CANCELLED) {
	        return 'cancel';
	    }
	    else if (state & STATE_ENDED) {
	        return 'end';
	    }
	    else if (state & STATE_CHANGED) {
	        return 'move';
	    }
	    else if (state & STATE_BEGAN) {
	        return 'start';
	    }
	    return '';
	}
	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	    if (direction == DIRECTION_DOWN) {
	        return 'down';
	    }
	    else if (direction == DIRECTION_UP) {
	        return 'up';
	    }
	    else if (direction == DIRECTION_LEFT) {
	        return 'left';
	    }
	    else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	    }
	    return '';
	}
	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	    var manager = recognizer.manager;
	    if (manager) {
	        return manager.get(otherRecognizer);
	    }
	    return otherRecognizer;
	}
	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}
	inherit(AttrRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof AttrRecognizer
	     */
	    defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    },
	    /**
	     * Used to check if it the recognizer receives valid input, like input.distance > 10.
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function (input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	    },
	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function (input) {
	        var state = this.state;
	        var eventType = input.eventType;
	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);
	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        }
	        else if (isRecognized || isValid) {
	            if (eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            }
	            else if (!(state & STATE_BEGAN)) {
	                return STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});
	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	    this.pX = null;
	    this.pY = null;
	}
	inherit(PanRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PanRecognizer
	     */
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    },
	    getTouchAction: function () {
	        var direction = this.options.direction;
	        var actions = [];
	        if (direction & DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & DIRECTION_VERTICAL) {
	            actions.push(TOUCH_ACTION_PAN_X);
	        }
	        return actions;
	    },
	    directionTest: function (input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY;
	        // lock to axis?
	        if (!(direction & options.direction)) {
	            if (options.direction & DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                hasMoved = x != this.pX;
	                distance = Math.abs(input.deltaX);
	            }
	            else {
	                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                hasMoved = y != this.pY;
	                distance = Math.abs(input.deltaY);
	            }
	        }
	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	    },
	    attrTest: function (input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) &&
	            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	    },
	    emit: function (input) {
	        this.pX = input.deltaX;
	        this.pY = input.deltaY;
	        var direction = directionStr(input.direction);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }
	        this._super.emit.call(this, input);
	    }
	});
	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	inherit(PinchRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },
	    getTouchAction: function () {
	        return [TOUCH_ACTION_NONE];
	    },
	    attrTest: function (input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },
	    emit: function (input) {
	        this._super.emit.call(this, input);
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            this.manager.emit(this.options.event + inOut, input);
	        }
	    }
	});
	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	    Recognizer.apply(this, arguments);
	    this._timer = null;
	    this._input = null;
	}
	inherit(PressRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PressRecognizer
	     */
	    defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 500,
	        threshold: 5 // a minimal movement is ok, but keep it low
	    },
	    getTouchAction: function () {
	        return [TOUCH_ACTION_AUTO];
	    },
	    process: function (input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;
	        this._input = input;
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        }
	        else if (input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeoutContext(function () {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	            }, options.time, this);
	        }
	        else if (input.eventType & INPUT_END) {
	            return STATE_RECOGNIZED;
	        }
	        return STATE_FAILED;
	    },
	    reset: function () {
	        clearTimeout(this._timer);
	    },
	    emit: function (input) {
	        if (this.state !== STATE_RECOGNIZED) {
	            return;
	        }
	        if (input && (input.eventType & INPUT_END)) {
	            this.manager.emit(this.options.event + 'up', input);
	        }
	        else {
	            this._input.timeStamp = now();
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	inherit(RotateRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof RotateRecognizer
	     */
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },
	    getTouchAction: function () {
	        return [TOUCH_ACTION_NONE];
	    },
	    attrTest: function (input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});
	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	inherit(SwipeRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof SwipeRecognizer
	     */
	    defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.65,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    },
	    getTouchAction: function () {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },
	    attrTest: function (input) {
	        var direction = this.options.direction;
	        var velocity;
	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	            velocity = input.velocity;
	        }
	        else if (direction & DIRECTION_HORIZONTAL) {
	            velocity = input.velocityX;
	        }
	        else if (direction & DIRECTION_VERTICAL) {
	            velocity = input.velocityY;
	        }
	        return this._super.attrTest.call(this, input) &&
	            direction & input.direction &&
	            input.distance > this.options.threshold &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },
	    emit: function (input) {
	        var direction = directionStr(input.direction);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }
	        this.manager.emit(this.options.event, input);
	    }
	});
	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);
	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;
	    this._timer = null;
	    this._input = null;
	    this.count = 0;
	}
	inherit(TapRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300,
	        time: 250,
	        threshold: 2,
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    },
	    getTouchAction: function () {
	        return [TOUCH_ACTION_MANIPULATION];
	    },
	    process: function (input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;
	        this.reset();
	        if ((input.eventType & INPUT_START) && (this.count === 0)) {
	            return this.failTimeout();
	        }
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (validMovement && validTouchTime && validPointers) {
	            if (input.eventType != INPUT_END) {
	                return this.failTimeout();
	            }
	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;
	            if (!validMultiTap || !validInterval) {
	                this.count = 1;
	            }
	            else {
	                this.count += 1;
	            }
	            this._input = input;
	            // if tap count matches we have recognized it,
	            // else it has began recognizing...
	            var tapCount = this.count % options.taps;
	            if (tapCount === 0) {
	                // no failing requirements, immediately trigger the tap event
	                // or wait as long as the multitap interval to trigger
	                if (!this.hasRequireFailures()) {
	                    return STATE_RECOGNIZED;
	                }
	                else {
	                    this._timer = setTimeoutContext(function () {
	                        this.state = STATE_RECOGNIZED;
	                        this.tryEmit();
	                    }, options.interval, this);
	                    return STATE_BEGAN;
	                }
	            }
	        }
	        return STATE_FAILED;
	    },
	    failTimeout: function () {
	        this._timer = setTimeoutContext(function () {
	            this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	    },
	    reset: function () {
	        clearTimeout(this._timer);
	    },
	    emit: function () {
	        if (this.state == STATE_RECOGNIZED) {
	            this._input.tapCount = this.count;
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	/**
	 * Simple way to create an manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	    return new Manager(element, options);
	}
	exports.Hammer = Hammer;
	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.4';
	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	    /**
	     * set if DOM events are being triggered.
	     * But this is slower and unused by simple implementations, so disabled by default.
	     * @type {Boolean}
	     * @default false
	     */
	    domEvents: false,
	    /**
	     * The value for the touchAction property/fallback.
	     * When set to `compute` it will magically set the correct value based on the added recognizers.
	     * @type {String}
	     * @default compute
	     */
	    touchAction: TOUCH_ACTION_COMPUTE,
	    /**
	     * @type {Boolean}
	     * @default true
	     */
	    enable: true,
	    /**
	     * EXPERIMENTAL FEATURE -- can be removed/changed
	     * Change the parent input target element.
	     * If Null, then it is being set the to main element.
	     * @type {Null|EventTarget}
	     * @default null
	     */
	    inputTarget: null,
	    /**
	     * force an input class
	     * @type {Null|Function}
	     * @default null
	     */
	    inputClass: null,
	    /**
	     * Default recognizer setup when calling `Hammer()`
	     * When creating a new Manager these will be skipped.
	     * @type {Array}
	     */
	    preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, { enable: false }],
	        [PinchRecognizer, { enable: false }, ['rotate']],
	        [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }],
	        [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']],
	        [TapRecognizer],
	        [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']],
	        [PressRecognizer]
	    ],
	    /**
	     * Some CSS properties can be used to improve the working of Hammer.
	     * Add them to this method and they will be set when creating a new Manager.
	     * @namespace
	     */
	    cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',
	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',
	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',
	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',
	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',
	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	    }
	};
	var STOP = 1;
	var FORCED_STOP = 2;
	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    options = options || {};
	    this.options = merge(options, Hammer.defaults);
	    this.options.inputTarget = this.options.inputTarget || element;
	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);
	    toggleCssProps(this, true);
	    each(options.recognizers, function (item) {
	        var recognizer = this.add(new (item[0])(item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	}
	Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function (options) {
	        extend(this.options, options);
	        // Options that need a little more setup
	        if (options.touchAction) {
	            this.touchAction.update();
	        }
	        if (options.inputTarget) {
	            // Clean up existing event listeners and reinitialize
	            this.input.destroy();
	            this.input.target = options.inputTarget;
	            this.input.init();
	        }
	        return this;
	    },
	    /**
	     * stop recognizing for this session.
	     * This session will be discarded, when a new [input]start event is fired.
	     * When forced, the recognizer cycle is stopped immediately.
	     * @param {Boolean} [force]
	     */
	    stop: function (force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	    },
	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function (inputData) {
	        var session = this.session;
	        if (session.stopped) {
	            return;
	        }
	        // run the touch-action polyfill
	        this.touchAction.preventDefaults(inputData);
	        var recognizer;
	        var recognizers = this.recognizers;
	        // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`
	        var curRecognizer = session.curRecognizer;
	        // reset when the last recognizer is recognized
	        // or when we're in a new session
	        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }
	        var i = 0;
	        while (i < recognizers.length) {
	            recognizer = recognizers[i];
	            // find out if we are allowed try to recognize the input for this one.
	            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	            //      that is being recognized.
	            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	            //      this can be setup with the `recognizeWith()` method on the recognizer.
	            if (session.stopped !== FORCED_STOP && (!curRecognizer || recognizer == curRecognizer ||
	                recognizer.canRecognizeWith(curRecognizer))) {
	                recognizer.recognize(inputData);
	            }
	            else {
	                recognizer.reset();
	            }
	            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	            // current active recognizer. but only if we don't already have an active recognizer
	            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	            i++;
	        }
	    },
	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function (recognizer) {
	        if (recognizer instanceof Recognizer) {
	            return recognizer;
	        }
	        var recognizers = this.recognizers;
	        for (var i = 0; i < recognizers.length; i++) {
	            if (recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },
	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function (recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	            return this;
	        }
	        // remove existing
	        var existing = this.get(recognizer.options.event);
	        if (existing) {
	            this.remove(existing);
	        }
	        this.recognizers.push(recognizer);
	        recognizer.manager = this;
	        this.touchAction.update();
	        return recognizer;
	    },
	    /**
	     * remove a recognizer by name or instance
	     * @param {Recognizer|String} recognizer
	     * @returns {Manager}
	     */
	    remove: function (recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	            return this;
	        }
	        var recognizers = this.recognizers;
	        recognizer = this.get(recognizer);
	        recognizers.splice(inArray(recognizers, recognizer), 1);
	        this.touchAction.update();
	        return this;
	    },
	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function (events, handler) {
	        var handlers = this.handlers;
	        each(splitStr(events), function (event) {
	            handlers[event] = handlers[event] || [];
	            handlers[event].push(handler);
	        });
	        return this;
	    },
	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function (events, handler) {
	        var handlers = this.handlers;
	        each(splitStr(events), function (event) {
	            if (!handler) {
	                delete handlers[event];
	            }
	            else {
	                handlers[event].splice(inArray(handlers[event], handler), 1);
	            }
	        });
	        return this;
	    },
	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function (event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	            triggerDomEvent(event, data);
	        }
	        // no handlers, so skip it all
	        var handlers = this.handlers[event] && this.handlers[event].slice();
	        if (!handlers || !handlers.length) {
	            return;
	        }
	        data.type = event;
	        data.preventDefault = function () {
	            data.srcEvent.preventDefault();
	        };
	        var i = 0;
	        while (i < handlers.length) {
	            handlers[i](data);
	            i++;
	        }
	    },
	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function () {
	        this.element && toggleCssProps(this, false);
	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	};
	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	    var element = manager.element;
	    each(manager.options.cssProps, function (value, name) {
	        element.style[prefixed(element.style, name)] = add ? value : '';
	    });
	}
	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}
	extend(Hammer, {
	    INPUT_START: INPUT_START,
	    INPUT_MOVE: INPUT_MOVE,
	    INPUT_END: INPUT_END,
	    INPUT_CANCEL: INPUT_CANCEL,
	    STATE_POSSIBLE: STATE_POSSIBLE,
	    STATE_BEGAN: STATE_BEGAN,
	    STATE_CHANGED: STATE_CHANGED,
	    STATE_ENDED: STATE_ENDED,
	    STATE_RECOGNIZED: STATE_RECOGNIZED,
	    STATE_CANCELLED: STATE_CANCELLED,
	    STATE_FAILED: STATE_FAILED,
	    DIRECTION_NONE: DIRECTION_NONE,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	    DIRECTION_ALL: DIRECTION_ALL,
	    Manager: Manager,
	    Input: Input,
	    TouchAction: TouchAction,
	    TouchInput: TouchInput,
	    MouseInput: MouseInput,
	    PointerEventInput: PointerEventInput,
	    TouchMouseInput: TouchMouseInput,
	    SingleTouchInput: SingleTouchInput,
	    Recognizer: Recognizer,
	    AttrRecognizer: AttrRecognizer,
	    Tap: TapRecognizer,
	    Pan: PanRecognizer,
	    Swipe: SwipeRecognizer,
	    Pinch: PinchRecognizer,
	    Rotate: RotateRecognizer,
	    Press: PressRecognizer,
	    on: addEventListeners,
	    off: removeEventListeners,
	    each: each,
	    merge: merge,
	    extend: extend,
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});
	// attach to window for angular2 gesture listeners
	window.Hammer = Hammer;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var overlay_controller_1 = __webpack_require__(13);
	var config_1 = __webpack_require__(8);
	var animation_1 = __webpack_require__(20);
	var util_1 = __webpack_require__(14);
	/**
	 * The Modal is a content pane that can go over the user's current page.
	 * Usually used for making a choice or editing an item. A modal can be opened
	 * similar to how NavController#push works, where it is passed a Page component,
	 * along with optional Page params, and options for presenting the modal.
	 *
	 * @usage
	 * ```ts
	 * class MyApp {
	 *
	 *  constructor(modal: Modal) {
	 *    this.modal = modal;
	 *  }
	 *
	 *  openContactModal() {
	 *    this.modal.open(ContactUs);
	 *  }
	 *
	 *  openProfileModal() {
	 *    this.modal.open(Profile, { userId: 8675309 }, {
	 *      enterAnimation: 'my-fade-in',
	 *      leaveAnimation: 'my-fade-out',
	 *      handle: 'profile-modal'
	 *    });
	 *  }
	 *
	 * }
	 * ```
	 * @demo /docs/v2/demos/modal/
	 * @see {@link /docs/v2/components#modals Modal Component Docs}
	 */
	var Modal = (function () {
	    function Modal(ctrl, config) {
	        this.ctrl = ctrl;
	        this.config = config;
	    }
	    /**
	     * Opens a new modal using the page component is was pass as the first
	     * argument. This is similar to how NavController's `push` method works.
	     * Currently you must have `<ion-overlay>` in the @App component's template
	     * for the modal to work correctly. (This is something that will
	     * be hopefully be removed in the near future.)
	     * @param pageComponent  The Page component to load in the modal.
	     * @param {Object} [params={}]  Optional data which can be passed to the page
	     * component, which can be read from the constructor's `NavParams`.
	     * @param {Object} [opts={}]  Additional options for this one modal instance of.
	     * Options include `enterAnimation` and `leaveAnimation`, which
	     * allows customization of which animation to use.
	     * @returns {Promise} Returns a promise which resolves when the modal has
	     * loaded and its entering animation has completed. The resolved promise's
	     * value is the instance of the newly created modal.
	     */
	    Modal.prototype.open = function (pageComponent, params, opts) {
	        if (params === void 0) { params = {}; }
	        if (opts === void 0) { opts = {}; }
	        opts = util_1.extend({
	            pageType: OVERLAY_TYPE,
	            enterAnimation: this.config.get('modalEnter'),
	            leaveAnimation: this.config.get('modalLeave'),
	        }, opts);
	        return this.ctrl.open(pageComponent, params, opts);
	    };
	    /**
	     * Get the instance of a modal. This is usually helpful to getting ahold of a
	     * certain modal, from anywhere within the app, and closing it. By calling
	     * just `get()` without a `handle` argument, it'll return the active modal
	     * on top (it is possible to have multipe modals opened at the same time).
	     * If getting just the active modal isn't enough, when creating
	     * a modal, it's options can be given a `handle`, which is simply a string-based
	     * name for the modal instance. You can later get a reference to that modal's
	     * instance by calling this method with the same handle name.
	     * @param  [handle]  Optional string name given in the modal's options when it was opened.
	     * @returns Returns the instance of the modal if it is found, otherwise `null`.
	     */
	    Modal.prototype.get = function (handle) {
	        if (handle) {
	            return this.ctrl.getByHandle(handle);
	        }
	        return this.ctrl.getByType(OVERLAY_TYPE);
	    };
	    Modal = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof overlay_controller_1.OverlayController !== 'undefined' && overlay_controller_1.OverlayController) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object])
	    ], Modal);
	    return Modal;
	    var _a, _b;
	})();
	exports.Modal = Modal;
	var OVERLAY_TYPE = 'modal';
	/**
	 * Animations for modals
	 */
	var ModalSlideIn = (function (_super) {
	    __extends(ModalSlideIn, _super);
	    function ModalSlideIn(enteringView, leavingView, opts) {
	        _super.call(this, enteringView.pageRef(), opts);
	        this
	            .easing('cubic-bezier(0.36,0.66,0.04,1)')
	            .duration(400)
	            .fromTo('translateY', '100%', '0%')
	            .before.addClass('show-page');
	    }
	    return ModalSlideIn;
	})(animation_1.Animation);
	animation_1.Animation.register('modal-slide-in', ModalSlideIn);
	var ModalSlideOut = (function (_super) {
	    __extends(ModalSlideOut, _super);
	    function ModalSlideOut(enteringView, leavingView, opts) {
	        _super.call(this, leavingView.pageRef(), opts);
	        this
	            .easing('ease-out')
	            .duration(250)
	            .fromTo('translateY', '0%', '100%');
	    }
	    return ModalSlideOut;
	})(animation_1.Animation);
	animation_1.Animation.register('modal-slide-out', ModalSlideOut);
	var ModalMDSlideIn = (function (_super) {
	    __extends(ModalMDSlideIn, _super);
	    function ModalMDSlideIn(enteringView, leavingView, opts) {
	        _super.call(this, enteringView.pageRef(), opts);
	        this
	            .easing('cubic-bezier(0.36,0.66,0.04,1)')
	            .duration(280)
	            .fromTo('translateY', '40px', '0px')
	            .fadeIn()
	            .before.addClass('show-page');
	    }
	    return ModalMDSlideIn;
	})(animation_1.Animation);
	animation_1.Animation.register('modal-md-slide-in', ModalMDSlideIn);
	var ModalMDSlideOut = (function (_super) {
	    __extends(ModalMDSlideOut, _super);
	    function ModalMDSlideOut(enteringView, leavingView, opts) {
	        _super.call(this, leavingView.pageRef(), opts);
	        this
	            .duration(200)
	            .easing('cubic-bezier(0.47,0,0.745,0.715)')
	            .fromTo('translateY', '0px', '40px')
	            .fadeOut();
	    }
	    return ModalMDSlideOut;
	})(animation_1.Animation);
	animation_1.Animation.register('modal-md-slide-out', ModalMDSlideOut);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(18);
	var overlay_controller_1 = __webpack_require__(13);
	var config_1 = __webpack_require__(8);
	var animation_1 = __webpack_require__(20);
	var nav_controller_1 = __webpack_require__(21);
	var button_1 = __webpack_require__(33);
	var util_1 = __webpack_require__(10);
	/**
	 * The Ionic Popup service allows the creation of popup windows that require the user to respond in order to continue.
	 *
	 * The popup service has support for more flexible versions of the built in `alert()`, `prompt()`, and `confirm()` functions that users are used to, in addition to allowing popups with completely custom content and look.
	 *
	 * @usage
	 * ```ts
	 * class myApp {
	 *
	 *   constructor(popup: Popup) {
	 *     this.popup = popup;
	 *   }
	 *
	 *   doAlert() {
	 *     this.popup.alert({
	 *       title: "New Friend!",
	 *       template: "Your friend, Obi wan Kenobi, just accepted your friend request!",
	 *       cssClass: 'my-alert'
	 *     }).then(() => {
	 *       console.log('Alert closed');
	 *     });
	 *   }
	 *
	 *   doPrompt() {
	 *     this.popup.prompt({
	 *       title: "New Album",
	 *       template: "Enter a name for this new album you're so keen on adding",
	 *       inputPlaceholder: "Title",
	 *       okText: "Save",
	 *       okType: "secondary"
	 *     }).then((name) => {
	 *       console.log('Name entered:', name);
	 *     }, () => {
	 *       console.error('Prompt closed');
	 *     });
	 *   }
	 *
	 *   doConfirm() {
	 *     this.popup.confirm({
	 *       title: "Use this lightsaber?",
	 *       subTitle: "You can't exchange lightsabers",
	 *       template: "Do you agree to use this lightsaber to do good across the intergalactic galaxy?",
	 *       cancelText: "Disagree",
	 *       okText: "Agree"
	 *     }).then((result, ev) => {
	 *       console.log('Confirmed!', result);
	 *     }, () => {
	 *       console.error('Not confirmed!');
	 *     });
	 *   }
	 * }
	 * ```
	 * @demo /docs/v2/demos/popup/
	 * @see {@link /docs/v2/components#popups Popup Component Docs}
	 */
	var Popup = (function () {
	    function Popup(ctrl, config) {
	        this.ctrl = ctrl;
	        this.config = config;
	    }
	    /**
	     * TODO
	     * @param {TODO} opts  TODO
	     * @returns {object} A promise
	     */
	    Popup.prototype.open = function (opts) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            opts.promiseResolve = resolve;
	            opts.promiseReject = reject;
	            opts = util_1.extend({
	                pageType: OVERLAY_TYPE,
	                enterAnimation: _this.config.get('popupEnter'),
	                leaveAnimation: _this.config.get('popupLeave')
	            }, opts);
	            return _this.ctrl.open(PopupCmp, opts, opts);
	        });
	    };
	    /**
	     * Show a simple alert popup with a message and one button
	     * that the user can tap to close the popup.
	     *
	     * @param {object} opts The options for showing the alert, of the form:
	     *
	     * ```
	     * {
	     *   title: '', // String. The title of the popup.
	     *   cssClass: '', // String (optional). The custom CSS class name.
	     *   subTitle: '', // String (optional). The sub-title of the popup.
	     *   template: '', // String (optional). The html template to place in the popup body.
	     *   okText: '', // String (default: 'OK'). The text of the OK button.
	     *   okType: '', // String (default: ''). The type of the OK button.
	     * }
	     * ```
	     *
	     * @returns {object} A promise which is resolved when the popup is closed.
	     */
	    Popup.prototype.alert = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        if (typeof opts === 'string') {
	            opts = {
	                title: opts
	            };
	        }
	        var button = {
	            text: opts.okText || 'OK',
	            type: opts.okType || '',
	            onTap: function (event, popupRef) {
	                // Allow it to close
	                //resolve();
	            }
	        };
	        opts = util_1.extend({
	            showPrompt: false,
	            cancel: function () {
	                //reject();
	            },
	            buttons: [
	                button
	            ]
	        }, opts);
	        return this.open(opts);
	    };
	    /**
	     * Show a simple confirm popup with a message, Cancel and OK button.
	     *
	     * Resolves the promise with true if the user presses the OK button, and false if the user presses the Cancel button.
	     *
	     * @param {object} opts The options for showing the confirm, of the form:
	     *
	     * ```
	     * {
	     *   title: '', // String. The title of the popup.
	     *   cssClass: '', // String (optional). The custom CSS class name.
	     *   subTitle: '', // String (optional). The sub-title of the popup.
	     *   template: '', // String (optional). The html template to place in the popup body.
	     *   cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
	     *   cancelType: '', // String (default: ''). The type of the Cancel button.
	     *   okText: '', // String (default: 'OK'). The text of the OK button.
	     *   okType: '', // String (default: ''). The type of the OK button.
	     * }
	     * ```
	     *
	     * @returns {object} A promise which is resolved when the popup is closed.
	     */
	    Popup.prototype.confirm = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        if (typeof opts === 'string') {
	            opts = {
	                title: opts
	            };
	        }
	        var okButton = {
	            text: opts.okText || 'OK',
	            type: opts.okType || '',
	            onTap: function (event, popupRef) {
	                // Allow it to close
	            }
	        };
	        var cancelButton = {
	            text: opts.cancelText || 'Cancel',
	            type: opts.cancelType || '',
	            isCancel: true,
	            onTap: function (event, popupRef) {
	                // Allow it to close
	            }
	        };
	        opts = util_1.extend({
	            showPrompt: false,
	            cancel: function () {
	            },
	            buttons: [
	                cancelButton, okButton
	            ]
	        }, opts);
	        return this.open(opts);
	    };
	    /**
	     * Show a simple prompt popup with a message, input, Cancel and OK button.
	     *
	     * Resolves the promise with the value of the input if the user presses OK, and with undefined if the user presses Cancel.
	     *
	     * @param {object} opts The options for showing the prompt, of the form:
	     *
	     * ```
	     * {
	     *   title: '', // String. The title of the popup.
	     *   cssClass: '', // String (optional). The custom CSS class name.
	     *   subTitle: '', // String (optional). The sub-title of the popup.
	     *   template: '', // String (optional). The html template to place in the popup body.
	     *   inputType: // String (default: 'text'). The type of input to use.
	     *   inputPlaceholder: // String (default: ''). A placeholder to use for the input.
	     *   cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
	     *   cancelType: '', // String (default: ''). The type of the Cancel button.
	     *   okText: '', // String (default: 'OK'). The text of the OK button.
	     *   okType: '', // String (default: ''). The type of the OK button.
	     * }
	     * ```
	     *
	     * @returns {object} A promise which is resolved when the popup is closed.
	     */
	    Popup.prototype.prompt = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        if (typeof opts === 'string') {
	            opts = {
	                title: opts
	            };
	        }
	        var okButton = {
	            text: opts.okText || 'OK',
	            type: opts.okType || '',
	            onTap: function (event, popupRef) {
	                // Allow it to close
	            }
	        };
	        var cancelButton = {
	            text: opts.cancelText || 'Cancel',
	            type: opts.cancelType || '',
	            isCancel: true,
	            onTap: function (event, popupRef) {
	                // Allow it to close
	            }
	        };
	        opts = util_1.extend({
	            showPrompt: true,
	            promptPlaceholder: '',
	            cancel: function () {
	            },
	            buttons: [
	                cancelButton, okButton
	            ]
	        }, opts);
	        return this.open(opts);
	    };
	    /**
	     * TODO
	     * @param {TODO} handle  TODO
	     * @returns {TODO} TODO
	     */
	    Popup.prototype.get = function (handle) {
	        if (handle) {
	            return this.ctrl.getByHandle(handle);
	        }
	        return this.ctrl.getByType(OVERLAY_TYPE);
	    };
	    Popup = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof overlay_controller_1.OverlayController !== 'undefined' && overlay_controller_1.OverlayController) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object])
	    ], Popup);
	    return Popup;
	    var _a, _b;
	})();
	exports.Popup = Popup;
	var OVERLAY_TYPE = 'popup';
	// TODO add button type to button: [type]="button.type"
	var PopupCmp = (function () {
	    function PopupCmp(elementRef, params, renderer) {
	        this.elementRef = elementRef;
	        this.d = params.data;
	        if (this.d.cssClass) {
	            renderer.setElementClass(elementRef, this.d.cssClass, true);
	        }
	    }
	    PopupCmp.prototype.ngOnInit = function () {
	        var _this = this;
	        setTimeout(function () {
	            // TODO: make more better, no DOM BS
	            _this.promptInput = _this.elementRef.nativeElement.querySelector('input');
	            if (_this.promptInput) {
	                _this.promptInput.value = '';
	            }
	        });
	    };
	    PopupCmp.prototype.buttonTapped = function (button, ev) {
	        var promptValue = this.promptInput && this.promptInput.value;
	        var retVal = button.onTap && button.onTap(ev, this, {
	            promptValue: promptValue
	        });
	        // If the event.preventDefault() wasn't called, close
	        if (!ev.defaultPrevented) {
	            // If this is a cancel button, reject the promise
	            if (button.isCancel) {
	                this.d.promiseReject();
	            }
	            else {
	                // Resolve with the prompt value
	                this.d.promiseResolve(promptValue);
	            }
	            return this.close();
	        }
	    };
	    PopupCmp.prototype.cancel = function (ev) {
	        this.d.cancel && this.d.cancel(event);
	        if (!ev.defaultPrevented) {
	            this.d.promiseReject();
	            return this.close();
	        }
	    };
	    PopupCmp = __decorate([
	        core_1.Component({
	            selector: 'ion-popup',
	            template: '<div (click)="cancel($event)" tappable disable-activated class="backdrop"></div>' +
	                '<div class="popup-wrapper">' +
	                '<div class="popup-head">' +
	                '<h2 class="popup-title" [inner-html]="d.title" *ng-if="d.title"></h2>' +
	                '<h3 class="popup-sub-title" [inner-html]="d.subTitle" *ng-if="d.subTitle"></h3>' +
	                '</div>' +
	                '<div class="popup-body">' +
	                '<div [inner-html]="d.template" *ng-if="d.template"></div>' +
	                '<input type="{{d.inputType || \'text\'}}" placeholder="{{d.inputPlaceholder}}" *ng-if="d.showPrompt" class="prompt-input">' +
	                '</div>' +
	                '<div class="popup-buttons" *ng-if="d.buttons.length">' +
	                '<button clear *ng-for="#btn of d.buttons" (click)="buttonTapped(btn, $event)" [inner-html]="btn.text" class="popup-button"></button>' +
	                '</div>' +
	                '</div>',
	            host: {
	                'role': 'dialog'
	            },
	            directives: [common_1.FORM_DIRECTIVES, common_1.NgClass, common_1.NgIf, common_1.NgFor, button_1.Button]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof nav_controller_1.NavParams !== 'undefined' && nav_controller_1.NavParams) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object])
	    ], PopupCmp);
	    return PopupCmp;
	    var _a, _b, _c;
	})();
	/**
	 * Animations for popups
	 */
	var PopupPopIn = (function (_super) {
	    __extends(PopupPopIn, _super);
	    function PopupPopIn(enteringView, leavingView, opts) {
	        _super.call(this, null, opts);
	        var ele = enteringView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.popup-wrapper'));
	        wrapper.fromTo('opacity', '0.01', '1').fromTo('scale', '1.1', '1');
	        backdrop.fromTo('opacity', '0.01', '0.3');
	        this
	            .easing('ease-in-out')
	            .duration(200)
	            .add(backdrop, wrapper);
	    }
	    return PopupPopIn;
	})(animation_1.Animation);
	animation_1.Animation.register('popup-pop-in', PopupPopIn);
	var PopupPopOut = (function (_super) {
	    __extends(PopupPopOut, _super);
	    function PopupPopOut(enteringView, leavingView, opts) {
	        _super.call(this, null, opts);
	        var ele = leavingView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.popup-wrapper'));
	        wrapper.fromTo('opacity', '1', '0').fromTo('scale', '1', '0.9');
	        backdrop.fromTo('opacity', '0.3', '0');
	        this
	            .easing('ease-in-out')
	            .duration(200)
	            .add(backdrop, wrapper);
	    }
	    return PopupPopOut;
	})(animation_1.Animation);
	animation_1.Animation.register('popup-pop-out', PopupPopOut);
	var PopupMdPopIn = (function (_super) {
	    __extends(PopupMdPopIn, _super);
	    function PopupMdPopIn(enteringView, leavingView, opts) {
	        _super.call(this, null, opts);
	        var ele = enteringView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.popup-wrapper'));
	        wrapper.fromTo('opacity', '0.01', '1').fromTo('scale', '1.1', '1');
	        backdrop.fromTo('opacity', '0.01', '0.5');
	        this
	            .easing('ease-in-out')
	            .duration(200)
	            .add(backdrop, wrapper);
	    }
	    return PopupMdPopIn;
	})(animation_1.Animation);
	animation_1.Animation.register('popup-md-pop-in', PopupMdPopIn);
	var PopupMdPopOut = (function (_super) {
	    __extends(PopupMdPopOut, _super);
	    function PopupMdPopOut(enteringView, leavingView, opts) {
	        _super.call(this, null, opts);
	        var ele = leavingView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.popup-wrapper'));
	        wrapper.fromTo('opacity', '1', '0').fromTo('scale', '1', '0.9');
	        backdrop.fromTo('opacity', '0.5', '0');
	        this
	            .easing('ease-in-out')
	            .duration(200)
	            .add(backdrop, wrapper);
	    }
	    return PopupMdPopOut;
	})(animation_1.Animation);
	animation_1.Animation.register('popup-md-pop-out', PopupMdPopOut);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var config_1 = __webpack_require__(8);
	/**
	  * @name Button
	  * @module ionic
	  * @property [outline] - for an unfilled outline button
	  * @property [clear] - for a transparent button that only shows text and icons
	  * @property [round] - for a button with rounded corners
	  * @property [block] - for a block button that fills it's parent container
	  * @property [full] - for a full width button
	  * @property [small] - sets button size to small
	  * @property [large] - sets button size to large
	  * @property [fab] - for a floating action button
	  * @property [fab-left] - position a fab button to the left
	  * @property [fab-right] - position a fab button to the right
	  * @property [fab-center] - position a fab button towards the center
	  * @property [fab-top] - position a fab button towards the top
	  * @property [fab-bottom] - position a fab button towards the bottom
	  * @description
	  * Buttons are simple components in Ionic, can consist of text, an icon, or both, and can be enhanced with a wide range of attributes.
	  * @demo /docs/v2/demos/buttons/
	  * @see {@link /docs/v2/components#buttons Button Component Docs}

	 */
	var Button = (function () {
	    function Button(config, elementRef, renderer) {
	        this.elementRef = elementRef;
	        this.renderer = renderer;
	        this._role = 'button'; // bar-button/item-button
	        this._size = null; // large/small
	        this._style = 'default'; // outline/clear/solid
	        this._shape = null; // round/fab
	        this._display = null; // block/full
	        this._colors = []; // primary/secondary
	        this._icon = null; // left/right/only
	        var element = elementRef.nativeElement;
	        if (config.get('hoverCSS') === false) {
	            renderer.setElementClass(elementRef, 'disable-hover', true);
	        }
	        if (element.hasAttribute('ion-item')) {
	            // no need to put on these classes for an ion-item
	            this._role = null;
	            return;
	        }
	        this._readAttrs(element);
	        this._readIcon(element);
	    }
	    Button.prototype.ngAfterContentInit = function () {
	        this._assignCss(true);
	    };
	    Button.prototype.setRole = function (val) {
	        this._role = val;
	    };
	    Button.prototype._readIcon = function (element) {
	        // figure out if and where the icon lives in the button
	        var childNodes = element.childNodes;
	        var childNode;
	        var nodes = [];
	        for (var i = 0, l = childNodes.length; i < l; i++) {
	            childNode = childNodes[i];
	            if (childNode.nodeType === 3) {
	                // text node
	                if (childNode.textContent.trim() !== '') {
	                    nodes.push(TEXT);
	                }
	            }
	            else if (childNode.nodeType === 1) {
	                if (childNode.nodeName === 'ICON') {
	                    // icon element node
	                    nodes.push(ICON);
	                }
	                else {
	                    // element other than an <icon>
	                    nodes.push(TEXT);
	                }
	            }
	        }
	        if (nodes.length > 1) {
	            if (nodes[0] === ICON && nodes[1] === TEXT) {
	                this._icon = 'icon-left';
	            }
	            else if (nodes[0] === TEXT && nodes[1] === ICON) {
	                this._icon = 'icon-right';
	            }
	        }
	        else if (nodes.length === 1 && nodes[0] === ICON) {
	            this._icon = 'icon-only';
	        }
	    };
	    Button.prototype._readAttrs = function (element) {
	        var elementAttrs = element.attributes;
	        var attrName;
	        for (var i = 0, l = elementAttrs.length; i < l; i++) {
	            if (elementAttrs[i].value !== '')
	                continue;
	            attrName = elementAttrs[i].name;
	            if (BUTTON_STYLE_ATTRS.indexOf(attrName) > -1) {
	                this._style = attrName;
	            }
	            else if (BUTTON_DISPLAY_ATTRS.indexOf(attrName) > -1) {
	                this._display = attrName;
	            }
	            else if (BUTTON_SHAPE_ATTRS.indexOf(attrName) > -1) {
	                this._shape = attrName;
	            }
	            else if (BUTTON_SIZE_ATTRS.indexOf(attrName) > -1) {
	                this._size = attrName;
	            }
	            else if (!(IGNORE_ATTRS.test(attrName))) {
	                this._colors.push(attrName);
	            }
	        }
	    };
	    Button.prototype._assignCss = function (assignCssClass) {
	        var _this = this;
	        var role = this._role;
	        if (role) {
	            this.renderer.setElementClass(this.elementRef, role, assignCssClass); // button
	            this._setClass(this._style, assignCssClass); // button-clear
	            this._setClass(this._shape, assignCssClass); // button-round
	            this._setClass(this._display, assignCssClass); // button-full
	            this._setClass(this._size, assignCssClass); // button-small
	            this._setClass(this._icon, assignCssClass); // button-icon-left
	            var colorStyle = (this._style !== 'default' ? this._style + '-' : '');
	            this._colors.forEach(function (colorName) {
	                _this._setClass(colorStyle + colorName, assignCssClass); // button-secondary, button-clear-secondary
	            });
	        }
	    };
	    Button.prototype._setClass = function (type, assignCssClass) {
	        if (type) {
	            this.renderer.setElementClass(this.elementRef, this._role + '-' + type, assignCssClass);
	        }
	    };
	    Button.setRoles = function (contentButtonChildren, role) {
	        var buttons = contentButtonChildren.toArray();
	        buttons.forEach(function (button) {
	            button.setRole(role);
	        });
	    };
	    Button = __decorate([
	        core_1.Directive({
	            selector: 'button,[button]'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object])
	    ], Button);
	    return Button;
	    var _a, _b, _c;
	})();
	exports.Button = Button;
	var BUTTON_SIZE_ATTRS = ['large', 'small'];
	var BUTTON_STYLE_ATTRS = ['clear', 'outline', 'solid'];
	var BUTTON_SHAPE_ATTRS = ['round', 'fab'];
	var BUTTON_DISPLAY_ATTRS = ['block', 'full'];
	var IGNORE_ATTRS = /_ng|button|left|right/;
	var TEXT = 1;
	var ICON = 2;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	/**
	 * Events is a pub/sub style event system for sending and responding to application-level
	 * events across your app.
	 * @usage
	 * ```ts
	 * // first page (publish an event when a user is created)
	 * function createUser(user) {
	 *   console.log('User created!')
	 *   events.publish('user:created', user);
	 * }
	 *
	 * // second page (listen for the user created event)
	 * events.subscribe('user:created', (user) => {
	 *   console.log('Welcome', user);
	 * });
	 *
	 * ```
	 */
	var Events = (function () {
	    function Events() {
	        this.channels = [];
	    }
	    /**
	     * Subscribe to an event topic. Events that get posted to that topic
	     * will trigger the provided handler.
	     *
	     * @param topic the topic to subscribe to
	     * @param handler the event handler
	     */
	    Events.prototype.subscribe = function (topic) {
	        var _this = this;
	        var handlers = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            handlers[_i - 1] = arguments[_i];
	        }
	        if (!this.channels[topic]) {
	            this.channels[topic] = [];
	        }
	        handlers.forEach(function (handler) {
	            _this.channels[topic].push(handler);
	        });
	    };
	    /**
	     * Unsubscribe from the given topic. Your handler will
	     * no longer receive events published to this topic.
	     *
	     * @param topic the topic to unsubscribe from
	     * @param handler the event handler
	     *
	     * @return true if a handler was removed
	     */
	    Events.prototype.unsubscribe = function (topic, handler) {
	        var t = this.channels[topic];
	        if (!t) {
	            // Wasn't found, wasn't removed
	            return false;
	        }
	        if (!handler) {
	            // Remove all handlers for this topic
	            delete this.channels[topic];
	            return true;
	        }
	        // We need to find and remove a specific handler
	        var i = t.indexOf(handler);
	        if (i < 0) {
	            // Wasn't found, wasn't removed
	            return false;
	        }
	        t.splice(i, 1);
	        // If the channel is empty now, remove it from the channel map
	        if (!t.length) {
	            delete this.channels[topic];
	        }
	        return true;
	    };
	    /**
	     * Publish an event to the given topic.
	     *
	     * @param topic the topic to publish to
	     * @param eventData the data to send as the event
	     */
	    Events.prototype.publish = function (topic) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var t = this.channels[topic];
	        if (!t) {
	            return null;
	        }
	        var responses = [];
	        t.forEach(function (handler) {
	            responses.push(handler(args));
	        });
	        return responses;
	    };
	    Events = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Events);
	    return Events;
	})();
	exports.Events = Events;

/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * @private
	 * Map of possible pages that can be navigated to using an Ionic NavController
	 */
	var NavRegistry = (function () {
	    function NavRegistry(pages) {
	        if (pages === void 0) { pages = []; }
	        this._pages = new Map(pages.map(function (page) { return [page.name, page]; }));
	    }
	    NavRegistry.prototype.get = function (pageName) {
	        return this._pages.get(pageName);
	    };
	    NavRegistry.prototype.set = function (page) {
	        this._pages.set(page.name, page);
	    };
	    return NavRegistry;
	})();
	exports.NavRegistry = NavRegistry;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	/**
	 * @private
	 * Provide multi-language and i18n support in your app. Translate works by
	 * mapping full strings to language translated ones. That means that you don't need
	 * to provide strings for your default language, just new languages.
	 *
	 * @usage
	 * ```js
	 * Translate.translations({
	 *   'de': {
	 *     'Welcome to MyApp': 'Willkommen auf'
	 *   }
	 * })
	 *
	 * Changing the default language:
	 *
	 * Translate.setLanguage('de');
	 * ```
	 *
	 * Usage in a template:
	 *
	 * ```js
	 * <span>{{ 'Welcome to MyApp' | translate }}
	 * ```
	 */
	var Translate = (function () {
	    function Translate() {
	        this._transMap = {};
	    }
	    Translate.prototype.translations = function (lang, map) {
	        this._transMap[lang] = map;
	    };
	    Translate.prototype.setLanguage = function (lang) {
	        this._language = lang;
	    };
	    Translate.prototype.getTranslations = function (lang) {
	        return this._transMap[lang];
	    };
	    Translate.prototype.translate = function (key, lang) {
	        // If the language isn't specified and we have no overridden one, return the string passed.
	        if (!lang && !this._language) {
	            return key;
	        }
	        var setLanguage = lang || this._language;
	        var map = this.getTranslations(setLanguage);
	        if (!map) {
	            console.warn('I18N: No translation for key', key, 'using language', setLanguage);
	            return '';
	        }
	        return this._getTranslation(map, key);
	    };
	    Translate.prototype._getTranslation = function (map, key) {
	        return map && map[key] || '';
	    };
	    Translate = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Translate);
	    return Translate;
	})();
	exports.Translate = Translate;

/***/ },
/* 37 */
/***/ function(module, exports) {

	var FeatureDetect = (function () {
	    function FeatureDetect() {
	    }
	    FeatureDetect.prototype.run = function (window, document) {
	        this._results = {};
	        for (var name in featureDetects) {
	            this._results[name] = featureDetects[name](window, document, document.body);
	        }
	    };
	    FeatureDetect.prototype.has = function (featureName) {
	        return !!this._results[featureName];
	    };
	    FeatureDetect.add = function (name, fn) {
	        featureDetects[name] = fn;
	    };
	    return FeatureDetect;
	})();
	exports.FeatureDetect = FeatureDetect;
	var featureDetects = {};
	// FeatureDetect.add('sticky', function(window, document) {
	//   // css position sticky
	//   let ele = document.createElement('div');
	//   ele.style.cssText = 'position:-webkit-sticky;position:sticky';
	//   return ele.style.position.indexOf('sticky') > -1;
	// });
	FeatureDetect.add('hairlines', function (window, document, body) {
	    /**
	    * Hairline Shim
	    * Add the "hairline" CSS class name to the body tag
	    * if the browser supports subpixels.
	    */
	    var canDo = false;
	    if (window.devicePixelRatio >= 2) {
	        var hairlineEle = document.createElement('div');
	        hairlineEle.style.border = '.5px solid transparent';
	        body.appendChild(hairlineEle);
	        if (hairlineEle.offsetHeight === 1) {
	            body.classList.add('hairlines');
	            canDo = true;
	        }
	        body.removeChild(hairlineEle);
	    }
	    return canDo;
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var app_1 = __webpack_require__(6);
	var config_1 = __webpack_require__(8);
	var dom_1 = __webpack_require__(11);
	var activator_1 = __webpack_require__(39);
	var ripple_1 = __webpack_require__(40);
	/**
	 * @private
	 */
	var TapClick = (function () {
	    function TapClick(app, config, zone) {
	        var self = this;
	        self.app = app;
	        self.zone = zone;
	        self.lastTouch = 0;
	        self.disableClick = 0;
	        self.lastActivated = 0;
	        if (config.get('activator') == 'ripple') {
	            self.activator = new ripple_1.RippleActivator(app, config, zone);
	        }
	        else if (config.get('activator') == 'highlight') {
	            self.activator = new activator_1.Activator(app, config, zone);
	        }
	        self.usePolyfill = (config.get('tapPolyfill') === true);
	        zone.runOutsideAngular(function () {
	            addListener('click', self.click.bind(self), true);
	            addListener('touchstart', self.touchStart.bind(self));
	            addListener('touchend', self.touchEnd.bind(self));
	            addListener('touchcancel', self.pointerCancel.bind(self));
	            addListener('mousedown', self.mouseDown.bind(self), true);
	            addListener('mouseup', self.mouseUp.bind(self), true);
	        });
	        self.pointerMove = function (ev) {
	            if (dom_1.hasPointerMoved(POINTER_MOVE_UNTIL_CANCEL, self.startCoord, dom_1.pointerCoord(ev))) {
	                self.pointerCancel(ev);
	            }
	        };
	    }
	    TapClick.prototype.touchStart = function (ev) {
	        this.lastTouch = Date.now();
	        this.pointerStart(ev);
	    };
	    TapClick.prototype.touchEnd = function (ev) {
	        this.lastTouch = Date.now();
	        if (this.usePolyfill && this.startCoord && this.app.isEnabled()) {
	            var endCoord = dom_1.pointerCoord(ev);
	            if (!dom_1.hasPointerMoved(POINTER_TOLERANCE, this.startCoord, endCoord)) {
	                console.debug('create click from touch ' + Date.now());
	                // prevent native mouse click events for XX amount of time
	                this.disableClick = this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT;
	                // manually dispatch the mouse click event
	                var clickEvent = document.createEvent('MouseEvents');
	                clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0, endCoord.x, endCoord.y, false, false, false, false, 0, null);
	                clickEvent.isIonicTap = true;
	                ev.target.dispatchEvent(clickEvent);
	            }
	        }
	        this.pointerEnd(ev);
	    };
	    TapClick.prototype.mouseDown = function (ev) {
	        if (this.isDisabledNativeClick()) {
	            console.debug('mouseDown prevent ' + ev.target.tagName + ' ' + Date.now());
	            // does not prevent default on purpose
	            // so native blur events from inputs can happen
	            ev.stopPropagation();
	        }
	        else if (this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT < Date.now()) {
	            this.pointerStart(ev);
	        }
	    };
	    TapClick.prototype.mouseUp = function (ev) {
	        if (this.isDisabledNativeClick()) {
	            console.debug('mouseUp prevent ' + ev.target.tagName + ' ' + Date.now());
	            ev.preventDefault();
	            ev.stopPropagation();
	        }
	        if (this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT < Date.now()) {
	            this.pointerEnd(ev);
	        }
	    };
	    TapClick.prototype.pointerStart = function (ev) {
	        var activatableEle = getActivatableTarget(ev.target);
	        if (activatableEle) {
	            this.startCoord = dom_1.pointerCoord(ev);
	            var now = Date.now();
	            if (this.lastActivated + 150 < now) {
	                this.activator && this.activator.downAction(ev, activatableEle, this.startCoord.x, this.startCoord.y);
	                this.lastActivated = now;
	            }
	            this.moveListeners(true);
	        }
	        else {
	            this.startCoord = null;
	        }
	    };
	    TapClick.prototype.pointerEnd = function (ev) {
	        this.moveListeners(false);
	        this.activator && this.activator.upAction();
	    };
	    TapClick.prototype.pointerCancel = function (ev) {
	        console.debug('pointerCancel from ' + ev.type + ' ' + Date.now());
	        this.activator && this.activator.clearState();
	        this.moveListeners(false);
	    };
	    TapClick.prototype.moveListeners = function (shouldAdd) {
	        removeListener(this.usePolyfill ? 'touchmove' : 'mousemove', this.pointerMove);
	        //this.zone.runOutsideAngular(() => {
	        if (shouldAdd) {
	            addListener(this.usePolyfill ? 'touchmove' : 'mousemove', this.pointerMove);
	        }
	        else {
	        }
	        //});
	    };
	    TapClick.prototype.click = function (ev) {
	        var preventReason = null;
	        if (!this.app.isEnabled()) {
	            preventReason = 'appDisabled';
	        }
	        else if (!ev.isIonicTap && this.isDisabledNativeClick()) {
	            preventReason = 'nativeClick';
	        }
	        if (preventReason !== null) {
	            console.debug('click prevent ' + preventReason + ' ' + Date.now());
	            ev.preventDefault();
	            ev.stopPropagation();
	        }
	    };
	    TapClick.prototype.isDisabledNativeClick = function () {
	        return this.disableClick > Date.now();
	    };
	    TapClick = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
	    ], TapClick);
	    return TapClick;
	    var _a, _b, _c;
	})();
	exports.TapClick = TapClick;
	function getActivatableTarget(ele) {
	    var targetEle = ele;
	    for (var x = 0; x < 4; x++) {
	        if (!targetEle)
	            break;
	        if (isActivatable(targetEle))
	            return targetEle;
	        targetEle = targetEle.parentElement;
	    }
	    return null;
	}
	/**
	 * @private
	 */
	function isActivatable(ele) {
	    if (ACTIVATABLE_ELEMENTS.test(ele.tagName)) {
	        return true;
	    }
	    var attributes = ele.attributes;
	    for (var i = 0, l = attributes.length; i < l; i++) {
	        if (ACTIVATABLE_ATTRIBUTES.test(attributes[i].name)) {
	            return true;
	        }
	    }
	    return false;
	}
	exports.isActivatable = isActivatable;
	function addListener(type, listener, useCapture) {
	    document.addEventListener(type, listener, useCapture);
	}
	function removeListener(type, listener) {
	    document.removeEventListener(type, listener);
	}
	var ACTIVATABLE_ELEMENTS = /^(A|BUTTON)$/;
	var ACTIVATABLE_ATTRIBUTES = /tappable|button/i;
	var POINTER_TOLERANCE = 4;
	var POINTER_MOVE_UNTIL_CANCEL = 10;
	var DISABLE_NATIVE_CLICK_AMOUNT = 2500;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var dom_1 = __webpack_require__(11);
	var Activator = (function () {
	    function Activator(app, config, zone) {
	        this.app = app;
	        this.zone = zone;
	        this.queue = [];
	        this.active = [];
	        this.clearStateDefers = 5;
	        this.clearAttempt = 0;
	        this.activatedClass = config.get('activatedClass') || 'activated';
	        this.x = 0;
	        this.y = 0;
	    }
	    Activator.prototype.downAction = function (ev, activatableEle, pointerX, pointerY, callback) {
	        // the user just pressed down
	        var self = this;
	        if (self.disableActivated(ev))
	            return false;
	        // remember where they pressed
	        self.x = pointerX;
	        self.y = pointerY;
	        // queue to have this element activated
	        self.queue.push(activatableEle);
	        function activateCss() {
	            var activatableEle;
	            for (var i = 0; i < self.queue.length; i++) {
	                activatableEle = self.queue[i];
	                if (activatableEle && activatableEle.parentNode) {
	                    self.active.push(activatableEle);
	                    activatableEle.classList.add(self.activatedClass);
	                }
	            }
	            self.queue = [];
	        }
	        this.zone.runOutsideAngular(function () {
	            dom_1.rafFrames(2, activateCss);
	        });
	        return true;
	    };
	    Activator.prototype.upAction = function () {
	        // the user was pressing down, then just let up
	        var self = this;
	        function activateUp() {
	            self.clearState();
	        }
	        this.zone.runOutsideAngular(function () {
	            dom_1.rafFrames(self.clearStateDefers, activateUp);
	        });
	    };
	    Activator.prototype.clearState = function () {
	        // all states should return to normal
	        var _this = this;
	        if (!this.app.isEnabled()) {
	            // the app is actively disabled, so don't bother deactivating anything.
	            // this makes it easier on the GPU so it doesn't have to redraw any
	            // buttons during a transition. This will retry in XX milliseconds.
	            setTimeout(function () {
	                _this.clearState();
	            }, 600);
	        }
	        else {
	            // not actively transitioning, good to deactivate any elements
	            this.deactivate();
	        }
	    };
	    Activator.prototype.deactivate = function () {
	        // remove the active class from all active elements
	        var self = this;
	        self.queue = [];
	        function deactivate() {
	            for (var i = 0; i < self.active.length; i++) {
	                self.active[i].classList.remove(self.activatedClass);
	            }
	            self.active = [];
	        }
	        dom_1.rafFrames(2, deactivate);
	    };
	    Activator.prototype.disableActivated = function (ev) {
	        if (ev.defaultPrevented)
	            return true;
	        var targetEle = ev.target;
	        for (var x = 0; x < 4; x++) {
	            if (!targetEle)
	                break;
	            if (targetEle.hasAttribute('disable-activated'))
	                return true;
	            targetEle = targetEle.parentElement;
	        }
	        return false;
	    };
	    return Activator;
	})();
	exports.Activator = Activator;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var activator_1 = __webpack_require__(39);
	var animation_1 = __webpack_require__(20);
	var dom_1 = __webpack_require__(11);
	var RippleActivator = (function (_super) {
	    __extends(RippleActivator, _super);
	    function RippleActivator(app, config, zone) {
	        _super.call(this, app, config, zone);
	        this.expands = {};
	        this.fades = {};
	        this.expandSpeed = null;
	    }
	    RippleActivator.prototype.downAction = function (ev, activatableEle, pointerX, pointerY) {
	        var _this = this;
	        if (_super.prototype.downAction.call(this, ev, activatableEle, pointerX, pointerY)) {
	            // create a new ripple element
	            this.expandSpeed = EXPAND_DOWN_PLAYBACK_RATE;
	            this.zone.runOutsideAngular(function () {
	                dom_1.raf(function () {
	                    var clientRect = activatableEle.getBoundingClientRect();
	                    dom_1.raf(function () {
	                        _this.createRipple(activatableEle, pointerX, pointerY, clientRect);
	                    });
	                });
	            });
	        }
	    };
	    RippleActivator.prototype.createRipple = function (activatableEle, pointerX, pointerY, clientRect) {
	        var _this = this;
	        var clientPointerX = (pointerX - clientRect.left);
	        var clientPointerY = (pointerY - clientRect.top);
	        var x = Math.max(Math.abs(clientRect.width - clientPointerX), clientPointerX) * 2;
	        var y = Math.max(Math.abs(clientRect.height - clientPointerY), clientPointerY) * 2;
	        var diameter = Math.max(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), 64);
	        var radius = Math.sqrt(clientRect.width + clientRect.height);
	        var duration = (1000 * Math.sqrt(radius / TOUCH_DOWN_ACCEL) + 0.5);
	        var rippleEle = document.createElement('md-ripple');
	        var rippleId = Date.now();
	        var eleStyle = rippleEle.style;
	        eleStyle.width = eleStyle.height = diameter + 'px';
	        eleStyle.marginTop = eleStyle.marginLeft = -(diameter / 2) + 'px';
	        eleStyle.left = clientPointerX + 'px';
	        eleStyle.top = clientPointerY + 'px';
	        activatableEle.appendChild(rippleEle);
	        // create the animation for the fade out, but don't start it yet
	        this.fades[rippleId] = new animation_1.Animation(rippleEle, { renderDelay: 0 });
	        this.fades[rippleId]
	            .fadeOut()
	            .duration(FADE_OUT_DURATION)
	            .playbackRate(1)
	            .onFinish(function () {
	            dom_1.raf(function () {
	                _this.fades[rippleId].dispose(true);
	                delete _this.fades[rippleId];
	            });
	        });
	        // expand the circle from the users starting point
	        // start slow, and when they let up, then speed up the animation
	        this.expands[rippleId] = new animation_1.Animation(rippleEle, { renderDelay: 0 });
	        this.expands[rippleId]
	            .fromTo('scale', '0.001', '1')
	            .duration(duration)
	            .playbackRate(this.expandSpeed)
	            .onFinish(function () {
	            _this.expands[rippleId].dispose();
	            delete _this.expands[rippleId];
	            _this.next();
	        })
	            .play();
	    };
	    RippleActivator.prototype.upAction = function () {
	        var _this = this;
	        this.deactivate();
	        this.expandSpeed = 1;
	        this.zone.runOutsideAngular(function () {
	            dom_1.rafFrames(4, function () {
	                _this.next();
	            });
	        });
	    };
	    RippleActivator.prototype.next = function () {
	        var now = Date.now();
	        var rippleId;
	        for (rippleId in this.expands) {
	            if (parseInt(rippleId, 10) + 4000 < now) {
	                this.expands[rippleId].dispose(true);
	                delete this.expands[rippleId];
	            }
	            else if (this.expands[rippleId].playbackRate() === EXPAND_DOWN_PLAYBACK_RATE) {
	                this.expands[rippleId].playbackRate(EXPAND_OUT_PLAYBACK_RATE);
	            }
	        }
	        for (rippleId in this.fades) {
	            if (parseInt(rippleId, 10) + 4000 < now) {
	                this.fades[rippleId].dispose(true);
	                delete this.fades[rippleId];
	            }
	            else if (!this.fades[rippleId].isPlaying) {
	                this.fades[rippleId].isPlaying = true;
	                this.fades[rippleId].play();
	            }
	        }
	    };
	    RippleActivator.prototype.clearState = function () {
	        this.deactivate();
	        this.next();
	    };
	    return RippleActivator;
	})(activator_1.Activator);
	exports.RippleActivator = RippleActivator;
	var TOUCH_DOWN_ACCEL = 512;
	var EXPAND_DOWN_PLAYBACK_RATE = 0.35;
	var EXPAND_OUT_PLAYBACK_RATE = 3;
	var FADE_OUT_DURATION = 700;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(42));
	__export(__webpack_require__(43));
	__export(__webpack_require__(78));

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var core_1 = __webpack_require__(3);
	var util_1 = __webpack_require__(10);
	/**
	 * @private
	 */
	function ConfigComponent(config) {
	    return function (cls) {
	        var annotations = Reflect.getMetadata('annotations', cls) || [];
	        annotations.push(new core_1.Component(appendConfig(cls, config)));
	        Reflect.defineMetadata('annotations', annotations, cls);
	        return cls;
	    };
	}
	exports.ConfigComponent = ConfigComponent;
	/**
	 * @private
	 */
	function appendConfig(cls, config) {
	    config.host = config.host || {};
	    cls.defaultInputs = config.defaultInputs || {};
	    config.inputs = config.inputs || [];
	    for (var prop in cls.defaultInputs) {
	        // add the property to the component "inputs"
	        config.inputs.push(prop);
	        // set the component "hostProperties", so the instance's
	        // input value will be used to set the element's attribute
	        config.host['[attr.' + util_1.pascalCaseToDashCase(prop) + ']'] = prop;
	    }
	    cls.delegates = config.delegates;
	    return config;
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var core_1 = __webpack_require__(3);
	var browser_1 = __webpack_require__(7);
	var tap_click_1 = __webpack_require__(38);
	var bootstrap_1 = __webpack_require__(2);
	var directives_1 = __webpack_require__(44);
	/**
	* @ngdoc service
	* @name App
	* @module ionic
	* @param {object} [config] - the app's [../Config](Config) object
	* @param {string} [template] - the template to use for the app root
	* @param {string} [templateUrl] - a relative URL pointing to the template to use for the app root
	* @description
	* App is an Ionic decorator that bootstraps an application. It can be passed a number of arguments, that act as global config variables for the app.
	*/
	function App(args) {
	    if (args === void 0) { args = {}; }
	    return function (cls) {
	        // get current annotations
	        var annotations = Reflect.getMetadata('annotations', cls) || [];
	        args.selector = 'ion-app';
	        // auto add Ionic directives
	        args.directives = args.directives ? args.directives.concat(directives_1.IONIC_DIRECTIVES) : directives_1.IONIC_DIRECTIVES;
	        // if no template was provided, default so it has a root <ion-nav>
	        if (!args.templateUrl && !args.template) {
	            args.template = '<ion-nav></ion-nav>';
	        }
	        // create @Component
	        annotations.push(new core_1.Component(args));
	        // redefine with added annotations
	        Reflect.defineMetadata('annotations', annotations, cls);
	        browser_1.bootstrap(cls, bootstrap_1.ionicProviders(args)).then(function (appRef) {
	            appRef.injector.get(tap_click_1.TapClick);
	        });
	        return cls;
	    };
	}
	exports.App = App;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(18);
	var overlay_1 = __webpack_require__(45);
	var menu_1 = __webpack_require__(46);
	var menu_toggle_1 = __webpack_require__(48);
	var menu_close_1 = __webpack_require__(51);
	var button_1 = __webpack_require__(33);
	var blur_1 = __webpack_require__(52);
	var content_1 = __webpack_require__(53);
	var scroll_1 = __webpack_require__(55);
	var pull_to_refresh_1 = __webpack_require__(56);
	var slides_1 = __webpack_require__(57);
	var tabs_1 = __webpack_require__(59);
	var tab_1 = __webpack_require__(61);
	var list_1 = __webpack_require__(62);
	var item_1 = __webpack_require__(65);
	var item_sliding_1 = __webpack_require__(66);
	var toolbar_1 = __webpack_require__(50);
	var icon_1 = __webpack_require__(19);
	var checkbox_1 = __webpack_require__(67);
	var toggle_1 = __webpack_require__(68);
	var text_input_1 = __webpack_require__(69);
	var label_1 = __webpack_require__(70);
	var segment_1 = __webpack_require__(71);
	var radio_1 = __webpack_require__(72);
	var searchbar_1 = __webpack_require__(73);
	var nav_1 = __webpack_require__(74);
	var nav_push_1 = __webpack_require__(75);
	var nav_router_1 = __webpack_require__(76);
	var navbar_1 = __webpack_require__(49);
	var id_1 = __webpack_require__(60);
	var show_hide_when_1 = __webpack_require__(77);
	/**
	 * The core Ionic directives as well as Angular's CORE_DIRECTIVES and
	 * FORM_DIRECTIVES.  Automatically available in every [@Page](../Page/) template.
	 */
	exports.IONIC_DIRECTIVES = [
	    // Angular
	    common_1.CORE_DIRECTIVES,
	    common_1.FORM_DIRECTIVES,
	    // Content
	    overlay_1.OverlayNav,
	    menu_1.Menu,
	    menu_toggle_1.MenuToggle,
	    menu_close_1.MenuClose,
	    button_1.Button,
	    blur_1.Blur,
	    content_1.Content,
	    scroll_1.Scroll,
	    pull_to_refresh_1.Refresher,
	    // Lists
	    list_1.List,
	    list_1.ListHeader,
	    item_1.Item,
	    item_sliding_1.ItemSliding,
	    // Slides
	    slides_1.Slides,
	    slides_1.Slide,
	    slides_1.SlideLazy,
	    // Tabs
	    tabs_1.Tabs,
	    tab_1.Tab,
	    // Toolbar
	    toolbar_1.Toolbar,
	    toolbar_1.ToolbarTitle,
	    toolbar_1.ToolbarItem,
	    // Media
	    icon_1.Icon,
	    // Forms
	    searchbar_1.Searchbar,
	    segment_1.Segment,
	    segment_1.SegmentButton,
	    checkbox_1.Checkbox,
	    radio_1.RadioGroup,
	    radio_1.RadioButton,
	    toggle_1.Toggle,
	    text_input_1.TextInput,
	    text_input_1.TextInputElement,
	    label_1.Label,
	    // Nav
	    nav_1.Nav,
	    navbar_1.NavbarTemplate,
	    navbar_1.Navbar,
	    nav_push_1.NavPush,
	    nav_push_1.NavPop,
	    nav_router_1.NavRouter,
	    id_1.IdRef,
	    show_hide_when_1.ShowWhen,
	    show_hide_when_1.HideWhen
	];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var app_1 = __webpack_require__(6);
	var config_1 = __webpack_require__(8);
	var keyboard_1 = __webpack_require__(16);
	var overlay_controller_1 = __webpack_require__(13);
	var nav_controller_1 = __webpack_require__(21);
	/**
	 * @private
	 */
	var OverlayNav = (function (_super) {
	    __extends(OverlayNav, _super);
	    function OverlayNav(overlayCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd) {
	        _super.call(this, null, app, config, keyboard, elementRef, null, compiler, viewManager, zone, renderer, cd);
	        if (overlayCtrl.anchor) {
	            throw ('An app should only have one <ion-overlay></ion-overlay>');
	        }
	        this.initZIndex = 1000;
	        overlayCtrl.nav = this;
	    }
	    OverlayNav = __decorate([
	        core_1.Component({
	            selector: 'ion-overlay',
	            template: ''
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof overlay_controller_1.OverlayController !== 'undefined' && overlay_controller_1.OverlayController) === 'function' && _a) || Object, (typeof (_b = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _b) || Object, (typeof (_c = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _c) || Object, (typeof (_d = typeof keyboard_1.Keyboard !== 'undefined' && keyboard_1.Keyboard) === 'function' && _d) || Object, (typeof (_e = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _e) || Object, (typeof (_f = typeof core_1.Compiler !== 'undefined' && core_1.Compiler) === 'function' && _f) || Object, (typeof (_g = typeof core_1.AppViewManager !== 'undefined' && core_1.AppViewManager) === 'function' && _g) || Object, (typeof (_h = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _h) || Object, (typeof (_j = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _j) || Object, (typeof (_k = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _k) || Object])
	    ], OverlayNav);
	    return OverlayNav;
	    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
	})(nav_controller_1.NavController);
	exports.OverlayNav = OverlayNav;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var ion_1 = __webpack_require__(23);
	var app_1 = __webpack_require__(6);
	var config_1 = __webpack_require__(8);
	var platform_1 = __webpack_require__(9);
	var keyboard_1 = __webpack_require__(16);
	var gestures = __webpack_require__(47);
	/**
	 * _For basic Menu usage, see the [Menu section](../../../../components/#menus)
	 * of the Component docs._
	 *
	 * Menu is a side-menu navigation that can be dragged out or toggled to show.
	 *
	 * In order to use Menu, you must specify a [reference](https://angular.io/docs/ts/latest/guide/user-input.html#local-variables)
	 * to the content element that Menu should listen on for drag events, using the
	 * `content` property:
	 * ```html
	 * <ion-menu [content]="contentRef">
	 *   <ion-content>
	 *     <ion-list>
	 *     ...
	 *     </ion-list>
	 *   </ion-content>
	 * </ion-menu>
	 *
	 * <ion-nav #content-ref [root]="rootPage"></ion-nav>
	 * ```
	 *
	 * By default, Menus are on the left, but this can be overriden with the `side`
	 * property:
	 * ```html
	 * <ion-menu [content]="contentRef" side="right"></ion-menu>
	 * ```
	 *
	 * Menus can optionally be given an `id` attribute which allows the app to
	 * to get ahold of menu references. If no `id` is given then the menu
	 * automatically receives an `id` created from the side it is on, such as
	 * `leftMenu` or `rightMenu`. When using more than one menu it is always
	 * recommended to give each menu a unique `id`. Additionally menu-toggle and
	 * menu-close directives should be given menu id values of their respective
	 * menu.
	 *
	 * Menu supports two display styles: overlay, and reveal. Overlay
	 * is the traditional Android drawer style, and Reveal is the traditional iOS
	 * style. By default, Menu will adjust to the correct style for the platform,
	 * but this can be overriden using the `type` property:
	 * ```html
	 * <ion-menu [content]="contentRef" type="overlay"></ion-menu>
	 * ```
	 * @see {@link /docs/v2/components#menus Menu Component Docs}
	 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
	 * @see {@link ../../nav/Nav Nav API Docs}
	 *
	 */
	var Menu = (function (_super) {
	    __extends(Menu, _super);
	    function Menu(app, elementRef, config, platform, keyboard) {
	        _super.call(this, elementRef, config);
	        this.app = app;
	        this.platform = platform;
	        this.keyboard = keyboard;
	        this.opening = new core_1.EventEmitter('opening');
	        this.isOpen = false;
	        this._preventTime = 0;
	        this.isEnabled = true;
	    }
	    /**
	     * @private
	     */
	    Menu.prototype.ngOnInit = function () {
	        _super.prototype.ngOnInit.call(this);
	        var self = this;
	        var content = self.content;
	        self._cntEle = (content instanceof Node) ? content : content && content.getNativeElement && content.getNativeElement();
	        if (!self._cntEle) {
	            return console.error('Menu: must have a [content] element to listen for drag events on. Example:\n\n<ion-menu [content]="content"></ion-menu>\n\n<ion-nav #content></ion-nav>');
	        }
	        if (self.side !== 'left' && self.side !== 'right') {
	            self.side = 'left';
	        }
	        if (!self.id) {
	            // Auto register
	            self.id = self.side + 'Menu';
	            if (self.app.getComponent(self.id)) {
	                // id already exists, make sure this one is unique
	                self.id += (++menuIds);
	            }
	            self.app.register(self.id, self);
	        }
	        self._initGesture();
	        self._initType(self.type);
	        self._cntEle.classList.add('menu-content');
	        self._cntEle.classList.add('menu-content-' + self.type);
	        self.onContentClick = function (ev) {
	            if (self.isEnabled) {
	                ev.preventDefault();
	                ev.stopPropagation();
	                self.close();
	            }
	        };
	    };
	    /**
	     * @private
	     */
	    Menu.prototype._initGesture = function () {
	        switch (this.side) {
	            case 'right':
	                this._gesture = new gestures.RightMenuGesture(this);
	                break;
	            case 'left':
	                this._gesture = new gestures.LeftMenuGesture(this);
	                break;
	        }
	        this._targetGesture = new gestures.TargetGesture(this);
	    };
	    /**
	     * @private
	     */
	    Menu.prototype._initType = function (type) {
	        type = type && type.trim().toLowerCase();
	        if (!type) {
	            type = this.config.get('menuType');
	        }
	        this.type = type;
	    };
	    /**
	     * @private
	     */
	    Menu.prototype._getType = function () {
	        if (!this._type) {
	            this._type = new menuTypes[this.type](this);
	            if (this.config.get('animate') === false) {
	                this._type.open.duration(33);
	                this._type.close.duration(33);
	            }
	        }
	        return this._type;
	    };
	    /**
	     * Sets the state of the Menu to open or not.
	     * @param {boolean} isOpen  If the Menu is open or not.
	     * @return {Promise} TODO
	     */
	    Menu.prototype.setOpen = function (shouldOpen) {
	        var _this = this;
	        // _isPrevented is used to prevent unwanted opening/closing after swiping open/close
	        // or swiping open the menu while pressing down on the menu-toggle button
	        if (shouldOpen === this.isOpen || this._isPrevented()) {
	            return Promise.resolve();
	        }
	        this._before();
	        return this._getType().setOpen(shouldOpen).then(function () {
	            _this._after(shouldOpen);
	        });
	    };
	    /**
	     * @private
	     */
	    Menu.prototype.setProgressStart = function () {
	        // user started swiping the menu open/close
	        if (this._isPrevented() || !this.isEnabled)
	            return;
	        this._before();
	        this._getType().setProgressStart(this.isOpen);
	    };
	    /**
	     * @private
	     */
	    Menu.prototype.setProgess = function (value) {
	        // user actively dragging the menu
	        if (this.isEnabled) {
	            this._prevent();
	            this._getType().setProgess(value);
	            this.opening.next(value);
	        }
	    };
	    /**
	     * @private
	     */
	    Menu.prototype.setProgressEnd = function (shouldComplete) {
	        var _this = this;
	        // user has finished dragging the menu
	        if (this.isEnabled) {
	            this._prevent();
	            this._getType().setProgressEnd(shouldComplete).then(function (isOpen) {
	                _this._after(isOpen);
	            });
	        }
	    };
	    /**
	     * @private
	     */
	    Menu.prototype._before = function () {
	        // this places the menu into the correct location before it animates in
	        // this css class doesn't actually kick off any animations
	        if (this.isEnabled) {
	            this.getNativeElement().classList.add('show-menu');
	            this.getBackdropElement().classList.add('show-backdrop');
	            this._prevent();
	            this.keyboard.close();
	        }
	    };
	    /**
	     * @private
	     */
	    Menu.prototype._after = function (isOpen) {
	        // keep opening/closing the menu disabled for a touch more yet
	        // only add listeners/css if it's enabled and isOpen
	        // and only remove listeners/css if it's not open
	        if ((this.isEnabled && isOpen) || !isOpen) {
	            this._prevent();
	            this.isOpen = isOpen;
	            this._cntEle.classList[isOpen ? 'add' : 'remove']('menu-content-open');
	            this._cntEle.removeEventListener('click', this.onContentClick);
	            if (isOpen) {
	                this._cntEle.addEventListener('click', this.onContentClick);
	            }
	            else {
	                this.getNativeElement().classList.remove('show-menu');
	                this.getBackdropElement().classList.remove('show-backdrop');
	            }
	        }
	    };
	    /**
	     * @private
	     */
	    Menu.prototype._prevent = function () {
	        // used to prevent unwanted opening/closing after swiping open/close
	        // or swiping open the menu while pressing down on the menu-toggle
	        this._preventTime = Date.now() + 20;
	    };
	    /**
	     * @private
	     */
	    Menu.prototype._isPrevented = function () {
	        return this._preventTime > Date.now();
	    };
	    /**
	     * TODO
	     * @return {TODO} TODO
	     */
	    Menu.prototype.open = function () {
	        return this.setOpen(true);
	    };
	    /**
	     * TODO
	     * @return {TODO} TODO
	     */
	    Menu.prototype.close = function () {
	        return this.setOpen(false);
	    };
	    /**
	     * TODO
	     * @return {TODO} TODO
	     */
	    Menu.prototype.toggle = function () {
	        return this.setOpen(!this.isOpen);
	    };
	    /**
	     * Used to enable or disable a menu. For example, there could be multiple
	     * left menus, but only one of them should be able to be dragged open.
	     * @param {boolean} shouldEnable  True if it should be enabled, false if not.
	     * @return {Menu}  Returns the instance of the menu, which is useful for chaining.
	     */
	    Menu.prototype.enable = function (shouldEnable) {
	        this.isEnabled = shouldEnable;
	        if (!shouldEnable) {
	            this.close();
	        }
	        return this;
	    };
	    /**
	     * @private
	     */
	    Menu.prototype.getMenuElement = function () {
	        return this.getNativeElement();
	    };
	    /**
	     * @private
	     */
	    Menu.prototype.getContentElement = function () {
	        return this._cntEle;
	    };
	    /**
	     * @private
	     */
	    Menu.prototype.getBackdropElement = function () {
	        return this.backdrop.elementRef.nativeElement;
	    };
	    /**
	     * @private
	     */
	    Menu.register = function (name, cls) {
	        menuTypes[name] = cls;
	    };
	    /**
	     * @private
	     */
	    Menu.prototype.ngOnDestroy = function () {
	        this.app.unregister(this.id);
	        this._gesture && this._gesture.destroy();
	        this._targetGesture && this._targetGesture.destroy();
	        this._type && this._type.ngOnDestroy();
	        this._cntEle = null;
	    };
	    Menu.getById = function (app, menuId) {
	        var menu = null;
	        if (menuId) {
	            menu = app.getComponent(menuId);
	            if (!menu) {
	                console.error('Menu with id "' + menuId + '" cannot be found for menu-toggle');
	                return;
	            }
	        }
	        else {
	            menu = app.getComponent('leftMenu');
	            if (!menu) {
	                menu = app.getComponent('rightMenu');
	            }
	            if (!menu) {
	                console.error('Menu with id "leftMenu" or "rightMenu" cannot be found for menu-toggle');
	                return;
	            }
	        }
	        return menu;
	    };
	    Menu = __decorate([
	        core_1.Component({
	            selector: 'ion-menu',
	            inputs: [
	                'content',
	                'dragThreshold',
	                'id',
	                'side',
	                'type'
	            ],
	            defaultInputs: {
	                'side': 'left',
	                'menuType': 'reveal'
	            },
	            outputs: ['opening'],
	            host: {
	                'role': 'navigation',
	                '[attr.side]': 'side',
	                '[attr.type]': 'type'
	            },
	            template: '<ng-content></ng-content><div tappable disable-activated class="backdrop"></div>',
	            directives: [core_1.forwardRef(function () { return MenuBackdrop; })]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _c) || Object, (typeof (_d = typeof platform_1.Platform !== 'undefined' && platform_1.Platform) === 'function' && _d) || Object, (typeof (_e = typeof keyboard_1.Keyboard !== 'undefined' && keyboard_1.Keyboard) === 'function' && _e) || Object])
	    ], Menu);
	    return Menu;
	    var _a, _b, _c, _d, _e;
	})(ion_1.Ion);
	exports.Menu = Menu;
	var menuTypes = {};
	var menuIds = 0;
	var MenuBackdrop = (function () {
	    function MenuBackdrop(menu, elementRef) {
	        this.menu = menu;
	        this.elementRef = elementRef;
	        menu.backdrop = this;
	    }
	    /**
	     * @private
	     */
	    MenuBackdrop.prototype.clicked = function (ev) {
	        console.debug('backdrop clicked');
	        ev.preventDefault();
	        ev.stopPropagation();
	        this.menu.close();
	    };
	    MenuBackdrop = __decorate([
	        core_1.Directive({
	            selector: '.backdrop',
	            host: {
	                '(click)': 'clicked($event)'
	            }
	        }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [Menu, (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
	    ], MenuBackdrop);
	    return MenuBackdrop;
	    var _a;
	})();

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var slide_edge_gesture_1 = __webpack_require__(26);
	var util = __webpack_require__(14);
	var MenuContentGesture = (function (_super) {
	    __extends(MenuContentGesture, _super);
	    function MenuContentGesture(menu, targetEl, options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this, targetEl, util.extend({
	            direction: (menu.side === 'left' || menu.side === 'right') ? 'x' : 'y',
	            edge: menu.side,
	            threshold: 75
	        }, options));
	        this.menu = menu;
	        this.listen();
	    }
	    MenuContentGesture.prototype.canStart = function (ev) {
	        return this.menu.isOpen && this.menu.isEnabled ? true : _super.prototype.canStart.call(this, ev);
	    };
	    // Set CSS, then wait one frame for it to apply before sliding starts
	    MenuContentGesture.prototype.onSlideBeforeStart = function (slide, ev) {
	        this.menu.setProgressStart();
	    };
	    MenuContentGesture.prototype.onSlide = function (slide, ev) {
	        this.menu.setProgess(slide.distance / slide.max);
	    };
	    MenuContentGesture.prototype.onSlideEnd = function (slide, ev) {
	        var shouldComplete = (Math.abs(ev.velocityX) > 0.2 || Math.abs(slide.delta) > Math.abs(slide.max) * 0.5);
	        this.menu.setProgressEnd(shouldComplete);
	    };
	    MenuContentGesture.prototype.getElementStartPos = function (slide, ev) {
	        return this.menu.isOpen ? slide.max : slide.min;
	    };
	    MenuContentGesture.prototype.getSlideBoundaries = function () {
	        return {
	            min: 0,
	            max: this.menu.width()
	        };
	    };
	    return MenuContentGesture;
	})(slide_edge_gesture_1.SlideEdgeGesture);
	exports.MenuContentGesture = MenuContentGesture;
	/**
	 * Support dragging the target menu as well as the content.
	 */
	var TargetGesture = (function (_super) {
	    __extends(TargetGesture, _super);
	    function TargetGesture(menu) {
	        _super.call(this, menu, menu.getNativeElement(), {
	            threshold: 0
	        });
	    }
	    return TargetGesture;
	})(MenuContentGesture);
	exports.TargetGesture = TargetGesture;
	var LeftMenuGesture = (function (_super) {
	    __extends(LeftMenuGesture, _super);
	    function LeftMenuGesture(menu) {
	        _super.call(this, menu, menu.getContentElement());
	    }
	    return LeftMenuGesture;
	})(MenuContentGesture);
	exports.LeftMenuGesture = LeftMenuGesture;
	var RightMenuGesture = (function (_super) {
	    __extends(RightMenuGesture, _super);
	    function RightMenuGesture(menu) {
	        _super.call(this, menu, menu.getContentElement());
	    }
	    RightMenuGesture.prototype.onSlide = function (slide, ev) {
	        this.menu.setProgess(slide.distance / slide.min);
	    };
	    RightMenuGesture.prototype.getElementStartPos = function (slide, ev) {
	        return this.menu.isOpen ? slide.min : slide.max;
	    };
	    RightMenuGesture.prototype.getSlideBoundaries = function () {
	        return {
	            min: -this.menu.width(),
	            max: 0
	        };
	    };
	    return RightMenuGesture;
	})(MenuContentGesture);
	exports.RightMenuGesture = RightMenuGesture;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var app_1 = __webpack_require__(6);
	var view_controller_1 = __webpack_require__(24);
	var navbar_1 = __webpack_require__(49);
	var menu_1 = __webpack_require__(46);
	/**
	* TODO
	* @see {@link /docs/v2/components#menus Menu Component Docs}
	* @see {@link ../../menu/Menu Menu API Docs}
	*/
	var MenuToggle = (function () {
	    function MenuToggle(app, elementRef, viewCtrl, navbar) {
	        this.app = app;
	        this.viewCtrl = viewCtrl;
	        this.withinNavbar = !!navbar;
	        // Deprecation warning
	        if (this.withinNavbar && elementRef.nativeElement.tagName === 'A') {
	            console.warn('Menu toggles within a navbar should use <button menu-toggle> instead of <a toggle>');
	        }
	    }
	    /**
	    * @private
	    */
	    MenuToggle.prototype.toggle = function () {
	        var menu = menu_1.Menu.getById(this.app, this.menuToggle);
	        menu && menu.toggle();
	    };
	    Object.defineProperty(MenuToggle.prototype, "isHidden", {
	        /**
	        * @private
	        */
	        get: function () {
	            if (this.withinNavbar && this.viewCtrl) {
	                return !this.viewCtrl.isRoot();
	            }
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MenuToggle = __decorate([
	        core_1.Directive({
	            selector: '[menu-toggle]',
	            inputs: [
	                'menuToggle'
	            ],
	            host: {
	                '(click)': 'toggle()',
	                '[hidden]': 'isHidden',
	                'menu-toggle': '' //ensures the attr is there for css when using [menu-toggle]
	            }
	        }),
	        __param(2, core_1.Optional()),
	        __param(3, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof view_controller_1.ViewController !== 'undefined' && view_controller_1.ViewController) === 'function' && _c) || Object, (typeof (_d = typeof navbar_1.Navbar !== 'undefined' && navbar_1.Navbar) === 'function' && _d) || Object])
	    ], MenuToggle);
	    return MenuToggle;
	    var _a, _b, _c, _d;
	})();
	exports.MenuToggle = MenuToggle;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var ion_1 = __webpack_require__(23);
	var icon_1 = __webpack_require__(19);
	var toolbar_1 = __webpack_require__(50);
	var config_1 = __webpack_require__(8);
	var app_1 = __webpack_require__(6);
	var view_controller_1 = __webpack_require__(24);
	var nav_controller_1 = __webpack_require__(21);
	var BackButton = (function (_super) {
	    __extends(BackButton, _super);
	    function BackButton(navCtrl, elementRef, navbar) {
	        _super.call(this, elementRef, null);
	        this.navCtrl = navCtrl;
	        navbar && navbar.setBackButtonRef(elementRef);
	    }
	    BackButton.prototype.goBack = function (ev) {
	        ev.stopPropagation();
	        ev.preventDefault();
	        this.navCtrl && this.navCtrl.pop();
	    };
	    BackButton = __decorate([
	        core_1.Directive({
	            selector: '.back-button',
	            host: {
	                '(click)': 'goBack($event)'
	            }
	        }),
	        __param(0, core_1.Optional()),
	        __param(2, core_1.Optional()),
	        __param(2, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, Navbar])
	    ], BackButton);
	    return BackButton;
	    var _a, _b;
	})(ion_1.Ion);
	var BackButtonText = (function () {
	    function BackButtonText(elementRef, navbar) {
	        navbar.setBackButtonTextRef(elementRef);
	    }
	    BackButtonText = __decorate([
	        core_1.Directive({
	            selector: '.back-button-text'
	        }),
	        __param(1, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, Navbar])
	    ], BackButtonText);
	    return BackButtonText;
	    var _a;
	})();
	var ToolbarBackground = (function () {
	    function ToolbarBackground(elementRef, navbar) {
	        navbar.setBackgroundRef(elementRef);
	    }
	    ToolbarBackground = __decorate([
	        core_1.Directive({
	            selector: '.toolbar-background'
	        }),
	        __param(1, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, Navbar])
	    ], ToolbarBackground);
	    return ToolbarBackground;
	    var _a;
	})();
	var Navbar = (function (_super) {
	    __extends(Navbar, _super);
	    function Navbar(app, viewCtrl, elementRef, config, renderer) {
	        _super.call(this, elementRef, config);
	        this.app = app;
	        this.renderer = renderer;
	        viewCtrl && viewCtrl.setNavbar(this);
	        this.bbIcon = config.get('backButtonIcon');
	        this.bbText = config.get('backButtonText');
	    }
	    /**
	     * @private
	     */
	    Navbar.prototype.ngOnInit = function () {
	        _super.prototype.ngOnInit.call(this);
	        var hideBackButton = this.hideBackButton;
	        if (typeof hideBackButton === 'string') {
	            this.hideBackButton = (hideBackButton === '' || hideBackButton === 'true');
	        }
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.getBackButtonRef = function () {
	        return this.bbRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.setBackButtonRef = function (backButtonElementRef) {
	        this.bbRef = backButtonElementRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.getBackButtonTextRef = function () {
	        return this.bbtRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.setBackButtonTextRef = function (backButtonTextElementRef) {
	        this.bbtRef = backButtonTextElementRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.setBackgroundRef = function (backgrouneElementRef) {
	        this.bgRef = backgrouneElementRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.getBackgroundRef = function () {
	        return this.bgRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.didEnter = function () {
	        try {
	            this.app.setTitle(this.getTitleText());
	        }
	        catch (e) {
	            console.error(e);
	        }
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.setHidden = function (isHidden) {
	        this._hidden = isHidden;
	    };
	    Navbar = __decorate([
	        core_1.Component({
	            selector: 'ion-navbar',
	            template: '<div class="toolbar-background"></div>' +
	                '<button class="back-button bar-button bar-button-default" [hidden]="hideBackButton">' +
	                '<icon class="back-button-icon" [name]="bbIcon"></icon>' +
	                '<span class="back-button-text">' +
	                '<span class="back-default">{{bbText}}</span>' +
	                '</span>' +
	                '</button>' +
	                '<ng-content select="[menu-toggle],ion-buttons[left]"></ng-content>' +
	                '<ng-content select="ion-buttons[start]"></ng-content>' +
	                '<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>' +
	                '<div class="toolbar-content">' +
	                '<ng-content></ng-content>' +
	                '</div>',
	            host: {
	                '[hidden]': '_hidden',
	                'class': 'toolbar'
	            },
	            inputs: [
	                'hideBackButton'
	            ],
	            directives: [BackButton, BackButtonText, icon_1.Icon, ToolbarBackground]
	        }),
	        __param(1, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _a) || Object, (typeof (_b = typeof view_controller_1.ViewController !== 'undefined' && view_controller_1.ViewController) === 'function' && _b) || Object, (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _d) || Object, (typeof (_e = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _e) || Object])
	    ], Navbar);
	    return Navbar;
	    var _a, _b, _c, _d, _e;
	})(toolbar_1.ToolbarBase);
	exports.Navbar = Navbar;
	/**
	 * @private
	 * Used to find and register headers in a view, and this directive's
	 * content will be moved up to the common navbar location, and created
	 * using the same context as the view's content area.
	*/
	var NavbarTemplate = (function () {
	    function NavbarTemplate(viewContainerRef, templateRef, viewCtrl) {
	        if (viewCtrl) {
	            viewCtrl.setNavbarTemplateRef(templateRef);
	            viewCtrl.setNavbarViewRef(viewContainerRef);
	        }
	    }
	    NavbarTemplate = __decorate([
	        core_1.Directive({
	            selector: 'template[navbar]'
	        }),
	        __param(2, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.TemplateRef !== 'undefined' && core_1.TemplateRef) === 'function' && _b) || Object, (typeof (_c = typeof view_controller_1.ViewController !== 'undefined' && view_controller_1.ViewController) === 'function' && _c) || Object])
	    ], NavbarTemplate);
	    return NavbarTemplate;
	    var _a, _b, _c;
	})();
	exports.NavbarTemplate = NavbarTemplate;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var ion_1 = __webpack_require__(23);
	var config_1 = __webpack_require__(8);
	var navbar_1 = __webpack_require__(49);
	var button_1 = __webpack_require__(33);
	/**
	 * @private
	 */
	var ToolbarBase = (function (_super) {
	    __extends(ToolbarBase, _super);
	    function ToolbarBase(elementRef, config) {
	        _super.call(this, elementRef, config);
	        this.itemRefs = [];
	        this.titleRef = null;
	    }
	    /**
	     * @private
	     */
	    ToolbarBase.prototype.setTitleCmp = function (titleCmp) {
	        this.titleCmp = titleCmp;
	    };
	    /**
	     * @private
	     */
	    ToolbarBase.prototype.getTitleText = function () {
	        return (this.titleCmp && this.titleCmp.getTitleText()) || '';
	    };
	    /**
	     * @private
	     */
	    ToolbarBase.prototype.getTitleRef = function () {
	        return this.titleCmp && this.titleCmp.elementRef;
	    };
	    /**
	     * @private
	     * A toolbar items include the left and right side `ion-buttons`,
	     * and every `menu-toggle`. It does not include the `ion-title`.
	     * @returns {TODO} Array of this toolbar's item ElementRefs.
	     */
	    ToolbarBase.prototype.getItemRefs = function () {
	        return this.itemRefs;
	    };
	    /**
	     * @private
	     */
	    ToolbarBase.prototype.addItemRef = function (itemElementRef) {
	        this.itemRefs.push(itemElementRef);
	    };
	    return ToolbarBase;
	})(ion_1.Ion);
	exports.ToolbarBase = ToolbarBase;
	/**
	 * @name Toolbar
	 * @description
	 * The toolbar is generic bar that sits above or below content.
	 * Unlike an `Navbar`, `Toolbar` can be used for a subheader as well.
	 * @usage
	 * ```html
	 * <ion-toolbar>
	 *   <ion-title>My Toolbar Title</ion-title>
	 * </ion-toolbar>
	 *
	 *  <ion-content></ion-content>
	 *  ```
	 */
	var Toolbar = (function (_super) {
	    __extends(Toolbar, _super);
	    function Toolbar(elementRef, config) {
	        _super.call(this, elementRef, config);
	    }
	    Toolbar = __decorate([
	        core_1.Component({
	            selector: 'ion-toolbar',
	            template: '<div class="toolbar-background"></div>' +
	                '<ng-content select="[menu-toggle],ion-buttons[left]"></ng-content>' +
	                '<ng-content select="ion-buttons[start]"></ng-content>' +
	                '<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>' +
	                '<div class="toolbar-content">' +
	                '<ng-content></ng-content>' +
	                '</div>',
	            host: {
	                'class': 'toolbar'
	            }
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object])
	    ], Toolbar);
	    return Toolbar;
	    var _a, _b;
	})(ToolbarBase);
	exports.Toolbar = Toolbar;
	/**
	 * @name ToolbarTitle
	 * @description
	 * `ion-title` is a component that sets the title of the `Toolbar` or `Navbar`
	 * @usage
	 * ```html
	 * <ion-navbar *navbar>
	 *    <ion-title>Tab 1</ion-title>
	 * </ion-navbar>
	 *
	 *<!-- or if you wanted to create a subheader title-->
	 * <ion-navbar *navbar>
	 *    <ion-title>Tab 1</ion-title>
	 * </ion-navbar>
	 * <ion-toolbar>
	 *   <ion-title>SubHeader</ion-title>
	 * </ion-toolbar>
	 *  ```
	 */
	var ToolbarTitle = (function (_super) {
	    __extends(ToolbarTitle, _super);
	    function ToolbarTitle(elementRef, toolbar, navbar) {
	        _super.call(this, elementRef, null);
	        toolbar && toolbar.setTitleCmp(this);
	        navbar && navbar.setTitleCmp(this);
	    }
	    /**
	     * @private
	     */
	    ToolbarTitle.prototype.getTitleText = function () {
	        return this.getNativeElement().textContent;
	    };
	    ToolbarTitle = __decorate([
	        core_1.Component({
	            selector: 'ion-title',
	            template: '<div class="toolbar-title">' +
	                '<ng-content></ng-content>' +
	                '</div>'
	        }),
	        __param(1, core_1.Optional()),
	        __param(2, core_1.Optional()),
	        __param(2, core_1.Inject(core_1.forwardRef(function () { return navbar_1.Navbar; }))), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, Toolbar, (typeof (_b = typeof navbar_1.Navbar !== 'undefined' && navbar_1.Navbar) === 'function' && _b) || Object])
	    ], ToolbarTitle);
	    return ToolbarTitle;
	    var _a, _b;
	})(ion_1.Ion);
	exports.ToolbarTitle = ToolbarTitle;
	/**
	 * @private
	 */
	var ToolbarItem = (function () {
	    function ToolbarItem(elementRef, toolbar, navbar) {
	        toolbar && toolbar.addItemRef(elementRef);
	        navbar && navbar.addItemRef(elementRef);
	        this.inToolbar = !!(toolbar || navbar);
	        // Deprecation warning
	        if (elementRef.nativeElement.tagName === 'ION-NAV-ITEMS') {
	            if (elementRef.nativeElement.hasAttribute('primary')) {
	                console.warn('<ion-nav-items primary> has been renamed to <ion-buttons start>, please update your HTML');
	                elementRef.nativeElement.setAttribute('start', '');
	            }
	            else if (elementRef.nativeElement.hasAttribute('secondary')) {
	                console.warn('<ion-nav-items secondary> has been renamed to <ion-buttons end>, please update your HTML');
	                elementRef.nativeElement.setAttribute('end', '');
	            }
	            else {
	                console.warn('<ion-nav-items> has been renamed to <ion-buttons>, please update your HTML');
	            }
	        }
	    }
	    Object.defineProperty(ToolbarItem.prototype, "_buttons", {
	        set: function (buttons) {
	            if (this.inToolbar) {
	                button_1.Button.setRoles(buttons, 'bar-button');
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate([
	        core_1.ContentChildren(button_1.Button), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], ToolbarItem.prototype, "_buttons", null);
	    ToolbarItem = __decorate([
	        core_1.Directive({
	            selector: 'ion-buttons,[menu-toggle],ion-nav-items'
	        }),
	        __param(1, core_1.Optional()),
	        __param(2, core_1.Optional()),
	        __param(2, core_1.Inject(core_1.forwardRef(function () { return navbar_1.Navbar; }))), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, Toolbar, (typeof (_b = typeof navbar_1.Navbar !== 'undefined' && navbar_1.Navbar) === 'function' && _b) || Object])
	    ], ToolbarItem);
	    return ToolbarItem;
	    var _a, _b;
	})();
	exports.ToolbarItem = ToolbarItem;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var app_1 = __webpack_require__(6);
	var menu_1 = __webpack_require__(46);
	/**
	* TODO
	* @see {@link /docs/v2/components#menus Menu Component Docs}
	* @see {@link ../../menu/Menu Menu API Docs}
	*/
	var MenuClose = (function () {
	    function MenuClose(app) {
	        this.app = app;
	    }
	    /**
	    * @private
	    */
	    MenuClose.prototype.close = function () {
	        var menu = menu_1.Menu.getById(this.app, this.menuClose);
	        menu && menu.close();
	    };
	    MenuClose = __decorate([
	        core_1.Directive({
	            selector: '[menu-close]',
	            inputs: [
	                'menuClose'
	            ],
	            host: {
	                '(click)': 'close()'
	            }
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _a) || Object])
	    ], MenuClose);
	    return MenuClose;
	    var _a;
	})();
	exports.MenuClose = MenuClose;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	/**
	 * The blur attribute applies the CSS blur attribute to an element. If the CSS attribute is not supported,
	 * it will fall back to applying a semi-transparent background color to the element.
	 *
	 * @demo /docs/v2/demos/blur/
	 */
	var Blur = (function () {
	    function Blur(elementRef, renderer) {
	        this.elementRef = elementRef;
	        this.renderer = renderer;
	        renderer.setElementStyle(elementRef, '-webkit-backdrop-filter', 'blur(10px)');
	    }
	    Blur = __decorate([
	        core_1.Directive({
	            selector: '[ion-blur]'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object])
	    ], Blur);
	    return Blur;
	    var _a, _b;
	})();
	exports.Blur = Blur;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var ion_1 = __webpack_require__(23);
	var config_1 = __webpack_require__(8);
	var dom_1 = __webpack_require__(11);
	var keyboard_1 = __webpack_require__(16);
	var view_controller_1 = __webpack_require__(24);
	var scroll_to_1 = __webpack_require__(54);
	/**
	 * The Content component provides an easy to use content area that can be configured to use Ionic's custom Scroll View, or the built in overflow scrolling of the browser.
	 *
	 * While we recommend using the custom Scroll features in Ionic in most cases, sometimes (for performance reasons) only the browser's native overflow scrolling will suffice, and so we've made it easy to toggle between the Ionic scroll implementation and overflow scrolling.
	 *
	 * You can implement pull-to-refresh with the [Refresher](../../scroll/Refresher) component.
	 *
	 * @usage
	 * ```html
	 * <ion-content>
	 *   Add your content here!
	 * </ion-content>
	 * ```
	 *
	 */
	var Content = (function (_super) {
	    __extends(Content, _super);
	    /**
	     * @param {ElementRef} elementRef  A reference to the component's DOM element.
	     * @param {Config} config  The config object to change content's default settings.
	     */
	    function Content(elementRef, config, keyboard, viewCtrl, _zone) {
	        _super.call(this, elementRef, config);
	        this._zone = _zone;
	        this.scrollPadding = 0;
	        this.keyboard = keyboard;
	        if (viewCtrl) {
	            viewCtrl.setContent(this);
	            viewCtrl.setContentRef(elementRef);
	        }
	    }
	    /**
	     * @private
	     */
	    Content.prototype.ngOnInit = function () {
	        _super.prototype.ngOnInit.call(this);
	        this.scrollElement = this.getNativeElement().children[0];
	    };
	    /**
	     * Adds the specified scroll handler to the content' scroll element.
	     * @param {Function} handler  The scroll event handler.
	     * @returns {Function} A function that removes the scroll handler.
	     */
	    Content.prototype.addScrollEventListener = function (handler) {
	        var _this = this;
	        if (!this.scrollElement) {
	            return;
	        }
	        // ensure we're not creating duplicates
	        this.scrollElement.removeEventListener('scroll', handler);
	        this.scrollElement.addEventListener('scroll', handler);
	        return function () {
	            _this.scrollElement.removeEventListener('scroll', handler);
	        };
	    };
	    Content.prototype.onScrollEnd = function (callback) {
	        var lastScrollTop = null;
	        var framesUnchanged = 0;
	        var scrollElement = this.scrollElement;
	        function next() {
	            var currentScrollTop = scrollElement.scrollTop;
	            if (lastScrollTop !== null) {
	                if (Math.round(lastScrollTop) === Math.round(currentScrollTop)) {
	                    framesUnchanged++;
	                }
	                else {
	                    framesUnchanged = 0;
	                }
	                if (framesUnchanged > 9) {
	                    return callback();
	                }
	            }
	            lastScrollTop = currentScrollTop;
	            dom_1.raf(function () {
	                dom_1.raf(next);
	            });
	        }
	        setTimeout(next, 100);
	    };
	    /**
	     * Adds the specified touchmove handler to the content's scroll element.
	     * @param {Function} handler  The touchmove handler.
	     * @returns {Function} A function that removes the touchmove handler.
	     */
	    Content.prototype.addTouchMoveListener = function (handler) {
	        var _this = this;
	        if (!this.scrollElement) {
	            return;
	        }
	        // ensure we're not creating duplicates
	        this.scrollElement.removeEventListener('touchmove', handler);
	        this.scrollElement.addEventListener('touchmove', handler);
	        return function () {
	            _this.scrollElement.removeEventListener('touchmove', handler);
	        };
	    };
	    /**
	     * Scroll to the specified position.
	     * @param {TODO} x  The x-value to scroll to.
	     * @param {TODO} y  The y-value to scroll to.
	     * @param {Number} duration  Duration of the scroll animation.
	     * @param {TODO} tolerance  TODO
	     * @returns {TODO} TODO
	     */
	    Content.prototype.scrollTo = function (x, y, duration, tolerance) {
	        if (this._scrollTo) {
	            this._scrollTo.dispose();
	        }
	        this._scrollTo = new scroll_to_1.ScrollTo(this.scrollElement);
	        return this._scrollTo.start(x, y, duration, tolerance);
	    };
	    Content.prototype.scrollToTop = function () {
	        if (this._scrollTo) {
	            this._scrollTo.dispose();
	        }
	        this._scrollTo = new scroll_to_1.ScrollTo(this.scrollElement);
	        return this._scrollTo.start(0, 0, 300, 0);
	    };
	    /**
	     * @private
	     * Returns the content and scroll elements' dimensions.
	     * @returns {Object} dimensions  The content and scroll elements' dimensions
	     * {Number} dimensions.contentHeight  content offsetHeight
	     * {Number} dimensions.contentTop  content offsetTop
	     * {Number} dimensions.contentBottom  content offsetTop+offsetHeight
	     * {Number} dimensions.contentWidth  content offsetWidth
	     * {Number} dimensions.contentLeft  content offsetLeft
	     * {Number} dimensions.contentRight  content offsetLeft + offsetWidth
	     * {Number} dimensions.scrollHeight  scroll scrollHeight
	     * {Number} dimensions.scrollTop  scroll scrollTop
	     * {Number} dimensions.scrollBottom  scroll scrollTop + scrollHeight
	     * {Number} dimensions.scrollWidth  scroll scrollWidth
	     * {Number} dimensions.scrollLeft  scroll scrollLeft
	     * {Number} dimensions.scrollRight  scroll scrollLeft + scrollWidth
	     */
	    Content.prototype.getDimensions = function () {
	        var scrollElement = this.scrollElement;
	        var parentElement = scrollElement.parentElement;
	        return {
	            contentHeight: parentElement.offsetHeight,
	            contentTop: parentElement.offsetTop,
	            contentBottom: parentElement.offsetTop + parentElement.offsetHeight,
	            contentWidth: parentElement.offsetWidth,
	            contentLeft: parentElement.offsetLeft,
	            contentRight: parentElement.offsetLeft + parentElement.offsetWidth,
	            scrollHeight: scrollElement.scrollHeight,
	            scrollTop: scrollElement.scrollTop,
	            scrollBottom: scrollElement.scrollTop + scrollElement.scrollHeight,
	            scrollWidth: scrollElement.scrollWidth,
	            scrollLeft: scrollElement.scrollLeft,
	            scrollRight: scrollElement.scrollLeft + scrollElement.scrollWidth,
	        };
	    };
	    /**
	     * @private
	     * Adds padding to the bottom of the scroll element when the keyboard is open
	     * so content below the keyboard can be scrolled into view.
	     */
	    Content.prototype.addScrollPadding = function (newScrollPadding) {
	        if (newScrollPadding > this.scrollPadding) {
	            console.debug('addScrollPadding', newScrollPadding);
	            this.scrollPadding = newScrollPadding;
	            this.scrollElement.style.paddingBottom = newScrollPadding + 'px';
	        }
	    };
	    Content = __decorate([
	        core_1.Component({
	            selector: 'ion-content',
	            template: '<scroll-content>' +
	                '<ng-content></ng-content>' +
	                '</scroll-content>'
	        }),
	        __param(3, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof keyboard_1.Keyboard !== 'undefined' && keyboard_1.Keyboard) === 'function' && _c) || Object, (typeof (_d = typeof view_controller_1.ViewController !== 'undefined' && view_controller_1.ViewController) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], Content);
	    return Content;
	    var _a, _b, _c, _d, _e;
	})(ion_1.Ion);
	exports.Content = Content;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var dom_1 = __webpack_require__(11);
	var ScrollTo = (function () {
	    function ScrollTo(ele, x, y, duration) {
	        if (typeof ele === 'string') {
	            // string query selector
	            ele = document.querySelector(ele);
	        }
	        if (ele) {
	            if (ele.nativeElement) {
	                // angular ElementRef
	                ele = ele.nativeElement;
	            }
	            if (ele.nodeType === 1) {
	                this._el = ele;
	            }
	        }
	    }
	    ScrollTo.prototype.start = function (x, y, duration, tolerance) {
	        // scroll animation loop w/ easing
	        // credit https://gist.github.com/dezinezync/5487119
	        var self = this;
	        if (!self._el) {
	            // invalid element
	            return Promise.resolve();
	        }
	        x = x || 0;
	        y = y || 0;
	        tolerance = tolerance || 0;
	        var fromY = self._el.scrollTop;
	        var fromX = self._el.scrollLeft;
	        var xDistance = Math.abs(x - fromX);
	        var yDistance = Math.abs(y - fromY);
	        if (yDistance <= tolerance && xDistance <= tolerance) {
	            // prevent scrolling if already close to there
	            self._el = null;
	            return Promise.resolve();
	        }
	        return new Promise(function (resolve, reject) {
	            var start;
	            // start scroll loop
	            self.isPlaying = true;
	            // chill out for a frame first
	            dom_1.raf(function () {
	                start = Date.now();
	                dom_1.raf(step);
	            });
	            // scroll loop
	            function step() {
	                if (!self._el) {
	                    return resolve();
	                }
	                var time = Math.min(1, ((Date.now() - start) / duration));
	                // where .5 would be 50% of time on a linear scale easedT gives a
	                // fraction based on the easing method
	                var easedT = easeOutCubic(time);
	                if (fromY != y) {
	                    self._el.scrollTop = parseInt((easedT * (y - fromY)) + fromY, 10);
	                }
	                if (fromX != x) {
	                    self._el.scrollLeft = parseInt((easedT * (x - fromX)) + fromX, 10);
	                }
	                if (time < 1 && self.isPlaying) {
	                    dom_1.raf(step);
	                }
	                else if (!self.isPlaying) {
	                    // stopped
	                    self._el = null;
	                    reject();
	                }
	                else {
	                    // done
	                    self._el = null;
	                    resolve();
	                }
	            }
	        });
	    };
	    ScrollTo.prototype.stop = function () {
	        this.isPlaying = false;
	    };
	    ScrollTo.prototype.dispose = function () {
	        this.stop();
	        this._el = null;
	    };
	    return ScrollTo;
	})();
	exports.ScrollTo = ScrollTo;
	// decelerating to zero velocity
	function easeOutCubic(t) {
	    return (--t) * t * t + 1;
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var ion_1 = __webpack_require__(23);
	var config_1 = __webpack_require__(8);
	/**
	 * @name Scroll
	 * @description
	 * Scroll is a non-flexboxed scroll area that can scroll horizontally or vertically. `ion-Scroll` Can be used in places were you may not need a full page scroller, but a highly customized one, such as image scubber or comment scroller.
	 * @usage
	 * ```html
	 * <ion-scroll scroll-x="true">
	 * </ion-scroll>
	 *
	 * <ion-scroll scroll-y="true">
	 * </ion-scroll>
	 *
	 * <ion-scroll scroll-x="true" scroll-y="true">
	 * </ion-scroll>
	 * ```
	 *@property {boolean} [scroll-x] - whether to enable scrolling along the X axis
	 *@property {boolean} [scroll-y] - whether to enable scrolling along the Y axis
	 *@property {boolean} [zoom] - whether to enable zooming
	 *@property {number} [max-zoom] - set the max zoom amount for ion-scroll
	 */
	var Scroll = (function (_super) {
	    __extends(Scroll, _super);
	    function Scroll(elementRef, Config) {
	        _super.call(this, elementRef, Config);
	        this.maxScale = 3;
	        this.zoomDuration = 250;
	    }
	    /**
	     * @private
	     */
	    Scroll.prototype.ngOnInit = function () {
	        this.scrollElement = this.getNativeElement().children[0];
	    };
	    /**
	     * Add a scroll event handler to the scroll element if it exists.
	     * @param {Function} handler  The scroll handler to add to the scroll element.
	     * @returns {?Function} a function to remove the specified handler, otherwise
	     * undefined if the scroll element doesn't exist.
	     */
	    Scroll.prototype.addScrollEventListener = function (handler) {
	        var _this = this;
	        if (!this.scrollElement) {
	            return;
	        }
	        this.scrollElement.addEventListener('scroll', handler);
	        return function () {
	            _this.scrollElement.removeEventListener('scroll', handler);
	        };
	    };
	    Scroll = __decorate([
	        core_1.Component({
	            selector: 'ion-scroll',
	            inputs: [
	                'scrollX', 'scrollY', 'zoom', 'maxZoom'
	            ],
	            host: {
	                '[class.scroll-x]': 'scrollX',
	                '[class.scroll-y]': 'scrollY'
	            },
	            template: '<scroll-content>' +
	                '<div class="scroll-zoom-wrapper">' +
	                '<ng-content></ng-content>' +
	                '</div>' +
	                '</scroll-content>'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object])
	    ], Scroll);
	    return Scroll;
	    var _a, _b;
	})(ion_1.Ion);
	exports.Scroll = Scroll;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(18);
	var content_1 = __webpack_require__(53);
	var util = __webpack_require__(14);
	var dom_1 = __webpack_require__(11);
	/**
	 * Allows you to add pull-to-refresh to an Content component.
	 *
	 * Place it as the first child of your Content or Scroll element.
	 *
	 * When refreshing is complete, call `refresher.complete()` from your controller.
	 *
	 *  @usage
	 *  ```ts
	 *  <ion-refresher (starting)="doStarting()" (refresh)="doRefresh($event, refresher)" (pulling)="doPulling($event, amt)">
	 *
	 *
	 *  doRefresh(refresher) {
	 *    console.log('Refreshing!', refresher);
	 *
	 *    setTimeout(() => {
	 *      console.log('Pull to refresh complete!', refresher);
	 *      refresher.complete();
	 *    })
	 *  }
	 *
	 *  doStarting() {
	 *    console.log('Pull started!');
	 *  }
	 *
	 *  doPulling(amt) {
	 *    console.log('You have pulled', amt);
	 *  }
	 *  ```
	 */
	var Refresher = (function () {
	    /**
	     * TODO
	     * @param {Content} content  TODO
	     * @param {ElementRef} elementRef  TODO
	     */
	    function Refresher(content, element) {
	        this.ele = element.nativeElement;
	        this.ele.classList.add('content');
	        this.content = content;
	        this.refresh = new core_1.EventEmitter('refresh');
	        this.starting = new core_1.EventEmitter('starting');
	        this.pulling = new core_1.EventEmitter('pulling');
	    }
	    Refresher.prototype.ngOnInit = function () {
	        this.initEvents();
	    };
	    /**
	     * Initialize touch and scroll event listeners.
	     */
	    Refresher.prototype.initEvents = function () {
	        var sp = this.content.getNativeElement();
	        var sc = this.content.scrollElement;
	        this.isDragging = false;
	        this.isOverscrolling = false;
	        this.dragOffset = 0;
	        this.lastOverscroll = 0;
	        this.ptrThreshold = 60;
	        this.activated = false;
	        this.scrollTime = 500;
	        this.startY = null;
	        this.deltaY = null;
	        this.canOverscroll = true;
	        this.scrollHost = sp;
	        this.scrollChild = sc;
	        util.defaults(this, {
	            pullingIcon: 'ion-android-arrow-down',
	            refreshingIcon: 'ion-ionic'
	        });
	        this.showSpinner = !util.isDefined(this.refreshingIcon) && this.spinner != 'none';
	        this.showIcon = util.isDefined(this.refreshingIcon);
	        this._touchMoveListener = this._handleTouchMove.bind(this);
	        this._touchEndListener = this._handleTouchEnd.bind(this);
	        this._handleScrollListener = this._handleScroll.bind(this);
	        sc.addEventListener('touchmove', this._touchMoveListener);
	        sc.addEventListener('touchend', this._touchEndListener);
	        sc.addEventListener('scroll', this._handleScrollListener);
	    };
	    Refresher.prototype.onDehydrate = function () {
	        console.log('DEHYDRATION');
	        var sc = this.content.scrollElement;
	        sc.removeEventListener('touchmove', this._touchMoveListener);
	        sc.removeEventListener('touchend', this._touchEndListener);
	        sc.removeEventListener('scroll', this._handleScrollListener);
	    };
	    /**
	     * TODO
	     * @param {TODO} val  TODO
	     */
	    Refresher.prototype.overscroll = function (val) {
	        this.scrollChild.style[dom_1.CSS.transform] = 'translateY(' + val + 'px)';
	        this.lastOverscroll = val;
	    };
	    /**
	     * TODO
	     * @param {TODO} target  TODO
	     * @param {TODO} newScrollTop  TODO
	     */
	    Refresher.prototype.nativescroll = function (target, newScrollTop) {
	        // creates a scroll event that bubbles, can be cancelled, and with its view
	        // and detail property initialized to window and 1, respectively
	        target.scrollTop = newScrollTop;
	        var e = document.createEvent("UIEvents");
	        e.initUIEvent("scroll", true, true, window, 1);
	        target.dispatchEvent(e);
	    };
	    /**
	     * TODO
	     * @param {TODO} enabled  TODO
	     */
	    Refresher.prototype.setScrollLock = function (enabled) {
	        var _this = this;
	        // set the scrollbar to be position:fixed in preparation to overscroll
	        // or remove it so the app can be natively scrolled
	        if (enabled) {
	            dom_1.raf(function () {
	                _this.scrollChild.classList.add('overscroll');
	                _this.show();
	            });
	        }
	        else {
	            dom_1.raf(function () {
	                _this.scrollChild.classList.remove('overscroll');
	                _this.hide();
	                _this.deactivate();
	            });
	        }
	    };
	    /**
	     * TODO
	     */
	    Refresher.prototype.activate = function () {
	        //this.ele.classList.add('active');
	        this.isActive = true;
	        //this.starting.next();
	    };
	    /**
	     * TODO
	     */
	    Refresher.prototype.deactivate = function () {
	        var _this = this;
	        // give tail 150ms to finish
	        setTimeout(function () {
	            _this.isActive = false;
	            _this.isRefreshing = false;
	            _this.isRefreshingTail = false;
	            // deactivateCallback
	            if (_this.activated)
	                _this.activated = false;
	        }, 150);
	    };
	    Refresher.prototype.start = function () {
	        // startCallback
	        this.isRefreshing = true;
	        this.refresh.next(this);
	        //$scope.$onRefresh();
	    };
	    /**
	     * TODO
	     */
	    Refresher.prototype.show = function () {
	        // showCallback
	        this.ele.classList.remove('invisible');
	    };
	    /**
	     * TODO
	     */
	    Refresher.prototype.hide = function () {
	        // showCallback
	        this.ele.classList.add('invisible');
	    };
	    /**
	     * TODO
	     */
	    Refresher.prototype.tail = function () {
	        // tailCallback
	        this.ele.classList.add('refreshing-tail');
	    };
	    /**
	     * TODO
	     */
	    Refresher.prototype.complete = function () {
	        var _this = this;
	        setTimeout(function () {
	            dom_1.raf(_this.tail.bind(_this));
	            // scroll back to home during tail animation
	            _this.scrollTo(0, _this.scrollTime, _this.deactivate.bind(_this));
	            // return to native scrolling after tail animation has time to finish
	            setTimeout(function () {
	                if (_this.isOverscrolling) {
	                    _this.isOverscrolling = false;
	                    _this.setScrollLock(false);
	                }
	            }, _this.scrollTime);
	        }, this.scrollTime);
	    };
	    /**
	     * TODO
	     * @param {TODO} Y  TODO
	     * @param {TODO} duration  TODO
	     * @param {Function} callback  TODO
	     */
	    Refresher.prototype.scrollTo = function (Y, duration, callback) {
	        // scroll animation loop w/ easing
	        // credit https://gist.github.com/dezinezync/5487119
	        var start = Date.now(), from = this.lastOverscroll;
	        if (from === Y) {
	            callback();
	            return; /* Prevent scrolling to the Y point if already there */
	        }
	        // decelerating to zero velocity
	        function easeOutCubic(t) {
	            return (--t) * t * t + 1;
	        }
	        // scroll loop
	        function scroll() {
	            var currentTime = Date.now(), time = Math.min(1, ((currentTime - start) / duration)), 
	            // where .5 would be 50% of time on a linear scale easedT gives a
	            // fraction based on the easing method
	            easedT = easeOutCubic(time);
	            this.overscroll(parseInt((easedT * (Y - from)) + from, 10));
	            if (time < 1) {
	                dom_1.raf(scroll.bind(this));
	            }
	            else {
	                if (Y < 5 && Y > -5) {
	                    this.isOverscrolling = false;
	                    this.setScrollLock(false);
	                }
	                callback && callback();
	            }
	        }
	        // start scroll loop
	        dom_1.raf(scroll.bind(this));
	    };
	    /**
	     * @private
	     * TODO
	     * @param {Event} e  TODO
	     */
	    Refresher.prototype._handleTouchMove = function (e) {
	        //console.log('TOUCHMOVE', e);
	        // if multitouch or regular scroll event, get out immediately
	        if (!this.canOverscroll || e.touches.length > 1) {
	            return;
	        }
	        //if this is a new drag, keep track of where we start
	        if (this.startY === null) {
	            this.startY = parseInt(e.touches[0].screenY, 10);
	        }
	        // how far have we dragged so far?
	        this.deltaY = parseInt(e.touches[0].screenY, 10) - this.startY;
	        // if we've dragged up and back down in to native scroll territory
	        if (this.deltaY - this.dragOffset <= 0 || this.scrollHost.scrollTop !== 0) {
	            if (this.isOverscrolling) {
	                this.isOverscrolling = false;
	                this.setScrollLock(false);
	            }
	            if (this.isDragging) {
	                this.nativescroll(this.scrollHost, parseInt(this.deltaY - this.dragOffset, 10) * -1);
	            }
	            // if we're not at overscroll 0 yet, 0 out
	            if (this.lastOverscroll !== 0) {
	                this.overscroll(0);
	            }
	            return;
	        }
	        else if (this.deltaY > 0 && this.scrollHost.scrollTop === 0 && !this.isOverscrolling) {
	            // starting overscroll, but drag started below scrollTop 0, so we need to offset the position
	            this.dragOffset = this.deltaY;
	        }
	        // prevent native scroll events while overscrolling
	        e.preventDefault();
	        // if not overscrolling yet, initiate overscrolling
	        if (!this.isOverscrolling) {
	            this.isOverscrolling = true;
	            this.setScrollLock(true);
	        }
	        this.isDragging = true;
	        // overscroll according to the user's drag so far
	        this.overscroll(parseInt((this.deltaY - this.dragOffset) / 3, 10));
	        // Pass an incremental pull amount to the EventEmitter
	        this.pulling.next(this.lastOverscroll);
	        // update the icon accordingly
	        if (!this.activated && this.lastOverscroll > this.ptrThreshold) {
	            this.activated = true;
	            dom_1.raf(this.activate.bind(this));
	        }
	        else if (this.activated && this.lastOverscroll < this.ptrThreshold) {
	            this.activated = false;
	            dom_1.raf(this.deactivate.bind(this));
	        }
	    };
	    /**
	     * @private
	     * TODO
	     * @param {Event} e  TODO
	     */
	    Refresher.prototype._handleTouchEnd = function (e) {
	        console.log('TOUCHEND', e);
	        // if this wasn't an overscroll, get out immediately
	        if (!this.canOverscroll && !this.isDragging) {
	            return;
	        }
	        // reset Y
	        this.startY = null;
	        // the user has overscrolled but went back to native scrolling
	        if (!this.isDragging) {
	            this.dragOffset = 0;
	            this.isOverscrolling = false;
	            this.setScrollLock(false);
	        }
	        else {
	            this.isDragging = false;
	            this.dragOffset = 0;
	            // the user has scroll far enough to trigger a refresh
	            if (this.lastOverscroll > this.ptrThreshold) {
	                this.start();
	                this.scrollTo(this.ptrThreshold, this.scrollTime);
	            }
	            else {
	                this.scrollTo(0, this.scrollTime, this.deactivate.bind(this));
	                this.isOverscrolling = false;
	            }
	        }
	    };
	    /**
	     * @private
	     * TODO
	     * @param {Event} e  TODO
	     */
	    Refresher.prototype._handleScroll = function (e) {
	        console.log('SCROLL', e.target.scrollTop);
	    };
	    Refresher = __decorate([
	        core_1.Component({
	            selector: 'ion-refresher',
	            inputs: [
	                'pullingIcon',
	                'pullingText',
	                'refreshingIcon',
	                'refreshingText',
	                'spinner',
	                'disablePullingRotation'
	            ],
	            outputs: ['refresh', 'starting', 'pulling'],
	            host: {
	                '[class.active]': 'isActive',
	                '[class.refreshing]': 'isRefreshing',
	                '[class.refreshingTail]': 'isRefreshingTail'
	            },
	            template: '<div class="refresher-content" [class.refresher-with-text]="pullingText || refreshingText">' +
	                '<div class="icon-pulling">' +
	                '<i class="icon" [ng-class]="pullingIcon"></i>' +
	                '</div>' +
	                '<div class="text-pulling" [inner-html]="pullingText" *ng-if="pullingText"></div>' +
	                '<div class="icon-refreshing">' +
	                '<i class="icon" [ng-class]="refreshingIcon"></i>' +
	                '</div>' +
	                '<div class="text-refreshing" [inner-html]="refreshingText" *ng-if="refreshingText"></div>' +
	                '</div>',
	            directives: [common_1.NgIf, common_1.NgClass]
	        }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof content_1.Content !== 'undefined' && content_1.Content) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object])
	    ], Refresher);
	    return Refresher;
	    var _a, _b;
	})();
	exports.Refresher = Refresher;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(18);
	var ion_1 = __webpack_require__(23);
	var animation_1 = __webpack_require__(20);
	var gesture_1 = __webpack_require__(29);
	var config_1 = __webpack_require__(8);
	var util_1 = __webpack_require__(14);
	var dom_1 = __webpack_require__(11);
	var util = __webpack_require__(14);
	var swiper_widget_1 = __webpack_require__(58);
	/**
	 * @name Slides
	 * @description
	 * Slides is a slide box implementation based on Swiper.js
	 *
	 * Swiper.js:
	 * The most modern mobile touch slider and framework with hardware accelerated transitions
	 *
	 * http://www.idangero.us/swiper/
	 *
	 * Copyright 2015, Vladimir Kharlampidi
	 * The iDangero.us
	 * http://www.idangero.us/
	 *
	 * Licensed under MIT
	 *
	 * @usage
	 * ```ts
	 * @Page({
	 *  template: `
	 *     <ion-slides pager (slide-changed)="onSlideChanged($event)" loop="true" autoplay="true">
	 *      <ion-slide>
	 *        <h3>Thank you for choosing the Awesome App!</h3>
	 *        <p>
	 *          The number one app for everything awesome.
	 *        </p>
	 *      </ion-slide>
	 *      <ion-slide>
	 *        <h3>Using Awesome</h3>
	 *         <div id="list">
	 *           <h5>Just three steps:</h5>
	 *           <ol>
	 *             <li>Be awesome</li>
	 *             <li>Stay awesome</li>
	 *             <li>There is no step 3</li>
	 *           </ol>
	 *         </div>
	 *      </ion-slide>
	 *      <ion-slide>
	 *        <h3>Any questions?</h3>
	 *      </ion-slide>
	 *    </ion-slides>
	 *    `
	 *})
	 *
	 *```
	 * @property {Boolean} [autoplay] - whether or not the slides should automatically change
	 * @property {Boolean} [loop] - whether the slides should loop from the last slide back to the first
	 * @property {Boolean} [bounce] - whether the slides should bounce
	 * @property {Number} [index] - The slide index to start on
	 * @property [pager] - add this property to enable the slide pager
	 * @property {Any} [slideChanged] - expression to evaluate when a slide has been changed
	 * @see {@link /docs/v2/components#slides Slides Component Docs}
	 */
	var Slides = (function (_super) {
	    __extends(Slides, _super);
	    /**
	     * @private
	     * @param {ElementRef} elementRef  TODO
	     */
	    function Slides(elementRef, config) {
	        var _this = this;
	        _super.call(this, elementRef, config);
	        this.rapidUpdate = util.debounce(function () {
	            _this.update();
	        }, 10);
	        this.slideChanged = new core_1.EventEmitter('slideChanged');
	    }
	    /**
	     * @private
	     */
	    Slides.prototype.ngOnInit = function () {
	        var _this = this;
	        if (!this.options) {
	            this.options = {};
	        }
	        this.showPager = util.isTrueProperty(this.pager);
	        var options = util.defaults({
	            loop: this.loop,
	            pagination: '.swiper-pagination',
	            paginationClickable: true,
	            lazyLoading: true,
	            preloadImages: false
	        }, this.options);
	        options.onTap = function (swiper, e) {
	            _this.onTap(swiper, e);
	            return _this.options.onTap && _this.options.onTap(swiper, e);
	        };
	        options.onClick = function (swiper, e) {
	            _this.onClick(swiper, e);
	            return _this.options.onClick && _this.options.onClick(swiper, e);
	        };
	        options.onDoubleTap = function (swiper, e) {
	            _this.onDoubleTap(swiper, e);
	            return _this.options.onDoubleTap && _this.options.onDoubleTap(swiper, e);
	        };
	        options.onTransitionStart = function (swiper, e) {
	            _this.onTransitionStart(swiper, e);
	            return _this.options.onTransitionStart && _this.options.onTransitionStart(swiper, e);
	        };
	        options.onTransitionEnd = function (swiper, e) {
	            _this.onTransitionEnd(swiper, e);
	            return _this.options.onTransitionEnd && _this.options.onTransitionEnd(swiper, e);
	        };
	        options.onSlideChangeStart = function (swiper) {
	            return _this.options.onSlideChangeStart && _this.options.onSlideChangeStart(swiper);
	        };
	        options.onSlideChangeEnd = function (swiper) {
	            _this.slideChanged.next(swiper);
	            return _this.options.onSlideChangeEnd && _this.options.onSlideChangeEnd(swiper);
	        };
	        options.onLazyImageLoad = function (swiper, slide, img) {
	            return _this.options.onLazyImageLoad && _this.options.onLazyImageLoad(swiper, slide, img);
	        };
	        options.onLazyImageReady = function (swiper, slide, img) {
	            return _this.options.onLazyImageReady && _this.options.onLazyImageReady(swiper, slide, img);
	        };
	        var swiper = new swiper_widget_1.Swiper(this.getNativeElement().children[0], options);
	        this.slider = swiper;
	        /*
	        * TODO: Finish this
	        if(util.isTrueProperty(this.zoom)) {
	          this.enableZoom = true;
	          setTimeout(() => {
	            this.initZoom();
	          })
	        }
	        */
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onTap = function (swiper, e) {
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onClick = function (swiper, e) {
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onDoubleTap = function (swiper, e) {
	        this.toggleZoom(swiper, e);
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onLazyImageLoad = function (swiper, slide, img) {
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onLazyImageReady = function (swiper, slide, img) {
	    };
	    /*
	    nextButton(swiper, e) {
	    }
	    prevButton() {
	    }
	    indexButton() {
	    }
	    */
	    /**
	     * @private
	     */
	    Slides.prototype.initZoom = function () {
	        var _this = this;
	        this.zoomDuration = this.zoomDuration || 230;
	        this.maxScale = this.zoomMax || 3;
	        this.zoomElement = this.getNativeElement().children[0].children[0];
	        this.zoomElement && this.zoomElement.classList.add('ion-scroll-zoom');
	        this.zoomGesture = new gesture_1.Gesture(this.zoomElement);
	        this.zoomGesture.listen();
	        this.scale = 1;
	        this.zoomLastPosX = 0;
	        this.zoomLastPosY = 0;
	        var last_scale, startX, startY, posX = 0, posY = 0, zoomRect;
	        this.viewportWidth = this.getNativeElement().offsetWidth;
	        this.viewportHeight = this.getNativeElement().offsetHeight;
	        this.zoomElement.addEventListener('touchstart', function (e) {
	            _this.onTouchStart(e);
	        });
	        this.zoomElement.addEventListener('touchmove', function (e) {
	            _this.onTouchMove(e);
	        });
	        this.zoomElement.addEventListener('touchend', function (e) {
	            _this.onTouchEnd(e);
	        });
	        this.zoomGesture.on('pinchstart', function (e) {
	            last_scale = _this.scale;
	            console.log('Last scale', e.scale);
	        });
	        this.zoomGesture.on('pinch', function (e) {
	            _this.scale = Math.max(1, Math.min(last_scale * e.scale, 10));
	            console.log('Scaling', _this.scale);
	            _this.zoomElement.style[dom_1.CSS.transform] = 'scale(' + _this.scale + ')';
	            zoomRect = _this.zoomElement.getBoundingClientRect();
	        });
	        this.zoomGesture.on('pinchend', function (e) {
	            //last_scale = Math.max(1, Math.min(last_scale * e.scale, 10));
	            if (_this.scale > _this.maxScale) {
	                var za = new animation_1.Animation(_this.zoomElement)
	                    .duration(_this.zoomDuration)
	                    .easing('linear')
	                    .from('scale', _this.scale)
	                    .to('scale', _this.maxScale);
	                za.play();
	                _this.scale = _this.maxScale;
	            }
	        });
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.resetZoom = function () {
	        if (this.zoomElement) {
	            this.zoomElement.parentElement.style[dom_1.CSS.transform] = '';
	            this.zoomElement.style[dom_1.CSS.transform] = 'scale(1)';
	        }
	        this.scale = 1;
	        this.zoomLastPosX = 0;
	        this.zoomLastPosY = 0;
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.toggleZoom = function (swiper, e) {
	        console.log('Try toggle zoom');
	        if (!this.enableZoom) {
	            return;
	        }
	        console.log('Toggling zoom', e);
	        /*
	        let x = e.pointers[0].clientX;
	        let y = e.pointers[0].clientY;
	    
	        let mx = this.viewportWidth / 2;
	        let my = this.viewportHeight / 2;
	    
	        let tx, ty;
	    
	        if(x > mx) {
	          // Greater than half
	          tx = -x;
	        } else {
	          // Less than or equal to half
	          tx = (this.viewportWidth - x);
	        }
	        if(y > my) {
	          ty = -y;
	        } else {
	          ty = y-my;
	        }
	    
	        console.log(y);
	        */
	        var zi = new animation_1.Animation(this.touch.target.children[0])
	            .duration(this.zoomDuration)
	            .easing('linear')
	            .fill('none');
	        var zw = new animation_1.Animation(this.touch.target.children[0])
	            .duration(this.zoomDuration)
	            .easing('linear');
	        var za = new animation_1.Animation();
	        za.fill('none');
	        za.add(zi); //, zw);
	        if (this.scale > 1) {
	            // Zoom out
	            //zw.fromTo('translateX', posX + 'px', '0px');
	            //zw.fromTo('translateY', posY + 'px', '0px');
	            zi.from('scale', this.scale);
	            zi.to('scale', 1);
	            za.play();
	            //posX = 0;
	            //posY = 0;
	            this.scale = 1;
	        }
	        else {
	            // Zoom in
	            //zw.fromTo('translateX', posX + 'px', tx + 'px');
	            //zw.fromTo('translateY', posY + 'px', ty + 'px');
	            zi.from('scale', this.scale);
	            zi.to('scale', this.maxScale);
	            za.play();
	            //posX = tx;
	            //posY = ty;
	            this.scale = this.maxScale;
	        }
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onTransitionStart = function (swiper) {
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onTransitionEnd = function (swiper) {
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onTouchStart = function (e) {
	        console.log('Touch start', e);
	        //TODO: Support mice as well
	        var target = util_1.dom.closest(e.target, '.slide').children[0].children[0];
	        this.touch = {
	            startX: e.touches[0].clientX,
	            startY: e.touches[0].clientY,
	            deltaX: 0,
	            deltaY: 0,
	            lastX: 0,
	            lastY: 0,
	            target: target.parentElement,
	            zoomable: target,
	            zoomableWidth: target.offsetWidth,
	            zoomableHeight: target.offsetHeight
	        };
	        console.log('Target', this.touch.target);
	        //TODO: android prevent default
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onTouchMove = function (e) {
	        this.touch.deltaX = e.touches[0].clientX - this.touch.startX;
	        this.touch.deltaY = e.touches[0].clientY - this.touch.startY;
	        // TODO: Make sure we need to transform (image is bigger than viewport)
	        var zoomableScaledWidth = this.touch.zoomableWidth * this.scale;
	        var zoomableScaledHeight = this.touch.zoomableHeight * this.scale;
	        var x1 = Math.min((this.viewportWidth / 2) - zoomableScaledWidth / 2, 0);
	        var x2 = -x1;
	        var y1 = Math.min((this.viewportHeight / 2) - zoomableScaledHeight / 2, 0);
	        var y2 = -y1;
	        console.log('BOUNDS', x1, x2, y1, y2);
	        if (this.scale <= 1) {
	            return;
	        }
	        console.log('PAN', e);
	        // Move image
	        this.touch.x = this.touch.deltaX + this.touch.lastX;
	        this.touch.y = this.touch.deltaY + this.touch.lastY;
	        console.log(this.touch.x, this.touch.y);
	        if (this.touch.x < x1) {
	            console.log('OUT ON LEFT');
	        }
	        if (this.touch.x > x2) {
	            console.log('OUT ON RIGHT');
	        }
	        if (this.touch.x > this.viewportWidth) {
	        }
	        else if (-this.touch.x > this.viewportWidth) {
	        }
	        else {
	            console.log('TRANSFORM', this.touch.x, this.touch.y, this.touch.target);
	            //this.touch.target.style[CSS.transform] = 'translateX(' + this.touch.x + 'px) translateY(' + this.touch.y + 'px)';
	            this.touch.target.style[dom_1.CSS.transform] = 'translateX(' + this.touch.x + 'px) translateY(' + this.touch.y + 'px)';
	            e.preventDefault();
	            e.stopPropagation();
	            return false;
	        }
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onTouchEnd = function (e) {
	        console.log('PANEND', e);
	        if (this.scale > 1) {
	            if (Math.abs(this.touch.x) > this.viewportWidth) {
	                posX = posX > 0 ? this.viewportWidth - 1 : -(this.viewportWidth - 1);
	                console.log('Setting on posx', this.touch.x);
	            }
	            /*
	            if(posY > this.viewportHeight/2) {
	              let z = new Animation(this.zoomElement.parentElement);
	              z.fromTo('translateY', posY + 'px', Math.min(this.viewportHeight/2 + 30, posY));
	              z.play();
	            } else {
	              let z = new Animation(this.zoomElement.parentElement);
	              z.fromTo('translateY', posY + 'px', Math.max(this.viewportHeight/2 - 30, posY));
	              z.play();
	            }
	            */
	            this.touch.lastX = this.touch.x;
	            this.touch.lastY = this.touch.y;
	        }
	    };
	    /**
	     * @private
	     * Update the underlying slider implementation. Call this if you've added or removed
	     * child slides.
	     */
	    Slides.prototype.update = function () {
	        var _this = this;
	        setTimeout(function () {
	            _this.slider.update();
	            // Don't allow pager to show with > 10 slides
	            if (_this.slider.slides.length > 10) {
	                _this.showPager = false;
	            }
	        });
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.next = function () {
	        this.slider.slideNext();
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.prev = function () {
	        this.slider.slidePrev();
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.getIndex = function () {
	        return this.slider.activeIndex;
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.getNumSlides = function () {
	        return this.slider.slides.length;
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.isAtEnd = function () {
	        return this.slider.isEnd;
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.isAtBeginning = function () {
	        return this.slider.isBeginning;
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.getSliderWidget = function () {
	        return this.slider;
	    };
	    Slides = __decorate([
	        core_1.Component({
	            selector: 'ion-slides',
	            inputs: [
	                'autoplay',
	                'loop',
	                'index',
	                'bounce',
	                'pager',
	                'options',
	                'zoom',
	                'zoomDuration',
	                'zoomMax'
	            ],
	            outputs: [
	                'slideChanged'
	            ],
	            template: '<div class="swiper-container">' +
	                '<div class="swiper-wrapper">' +
	                '<ng-content></ng-content>' +
	                '</div>' +
	                '<div [class.hide]="!showPager" class="swiper-pagination"></div>' +
	                '</div>',
	            directives: [common_1.NgClass]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object])
	    ], Slides);
	    return Slides;
	    var _a, _b;
	})(ion_1.Ion);
	exports.Slides = Slides;
	/**
	 * @private
	 */
	var Slide = (function () {
	    /**
	     * TODO
	     * @param {Slides} slides  The containing slidebox.
	     * @param {ElementRef} elementRef  TODO
	     */
	    function Slide(elementRef, slides) {
	        this.ele = elementRef.nativeElement;
	        this.ele.classList.add('swiper-slide');
	        slides.rapidUpdate();
	    }
	    Slide = __decorate([
	        core_1.Component({
	            selector: 'ion-slide',
	            inputs: ['zoom'],
	            template: '<div class="slide-zoom"><ng-content></ng-content></div>'
	        }),
	        __param(1, core_1.Host()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, Slides])
	    ], Slide);
	    return Slide;
	    var _a;
	})();
	exports.Slide = Slide;
	/**
	 * @private
	 */
	var SlideLazy = (function () {
	    function SlideLazy(elementRef) {
	        elementRef.getNativeElement().classList.add('swiper-lazy');
	    }
	    SlideLazy = __decorate([
	        core_1.Directive({
	            selector: 'slide-lazy',
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
	    ], SlideLazy);
	    return SlideLazy;
	    var _a;
	})();
	exports.SlideLazy = SlideLazy;

/***/ },
/* 58 */
/***/ function(module, exports) {

	/**
	 * Swiper 3.1.2
	 * Most modern mobile touch slider and framework with hardware accelerated transitions
	 *
	 * http://www.idangero.us/swiper/
	 *
	 * Copyright 2015, Vladimir Kharlampidi
	 * The iDangero.us
	 * http://www.idangero.us/
	 *
	 * Licensed under MIT
	 *
	 * Released on: August 22, 2015
	 */
	'use strict';
	var $;
	/*===========================
	Swiper
	===========================*/
	function Swiper(container, params) {
	    if (!(this instanceof Swiper))
	        return new Swiper(container, params);
	    var defaults = {
	        direction: 'horizontal',
	        touchEventsTarget: 'container',
	        initialSlide: 0,
	        speed: 300,
	        // autoplay
	        autoplay: false,
	        autoplayDisableOnInteraction: true,
	        // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
	        iOSEdgeSwipeDetection: false,
	        iOSEdgeSwipeThreshold: 20,
	        // Free mode
	        freeMode: false,
	        freeModeMomentum: true,
	        freeModeMomentumRatio: 1,
	        freeModeMomentumBounce: true,
	        freeModeMomentumBounceRatio: 1,
	        freeModeSticky: false,
	        // Set wrapper width
	        setWrapperSize: false,
	        // Virtual Translate
	        virtualTranslate: false,
	        // Effects
	        effect: 'slide',
	        coverflow: {
	            rotate: 50,
	            stretch: 0,
	            depth: 100,
	            modifier: 1,
	            slideShadows: true
	        },
	        cube: {
	            slideShadows: true,
	            shadow: true,
	            shadowOffset: 20,
	            shadowScale: 0.94
	        },
	        fade: {
	            crossFade: false
	        },
	        // Parallax
	        parallax: false,
	        // Scrollbar
	        scrollbar: null,
	        scrollbarHide: true,
	        // Keyboard Mousewheel
	        keyboardControl: false,
	        mousewheelControl: false,
	        mousewheelReleaseOnEdges: false,
	        mousewheelInvert: false,
	        mousewheelForceToAxis: false,
	        mousewheelSensitivity: 1,
	        // Hash Navigation
	        hashnav: false,
	        // Slides grid
	        spaceBetween: 0,
	        slidesPerView: 1,
	        slidesPerColumn: 1,
	        slidesPerColumnFill: 'column',
	        slidesPerGroup: 1,
	        centeredSlides: false,
	        slidesOffsetBefore: 0,
	        slidesOffsetAfter: 0,
	        // Round length
	        roundLengths: false,
	        // Touches
	        touchRatio: 1,
	        touchAngle: 45,
	        simulateTouch: true,
	        shortSwipes: true,
	        longSwipes: true,
	        longSwipesRatio: 0.5,
	        longSwipesMs: 300,
	        followFinger: true,
	        onlyExternal: false,
	        threshold: 0,
	        touchMoveStopPropagation: true,
	        // Pagination
	        pagination: null,
	        paginationElement: 'span',
	        paginationClickable: false,
	        paginationHide: false,
	        paginationBulletRender: null,
	        // Resistance
	        resistance: true,
	        resistanceRatio: 0.85,
	        // Next/prev buttons
	        nextButton: null,
	        prevButton: null,
	        // Progress
	        watchSlidesProgress: false,
	        watchSlidesVisibility: false,
	        // Cursor
	        grabCursor: false,
	        // Clicks
	        preventClicks: true,
	        preventClicksPropagation: true,
	        slideToClickedSlide: false,
	        // Lazy Loading
	        lazyLoading: false,
	        lazyLoadingInPrevNext: false,
	        lazyLoadingOnTransitionStart: false,
	        // Images
	        preloadImages: true,
	        updateOnImagesReady: true,
	        // loop
	        loop: false,
	        loopAdditionalSlides: 0,
	        loopedSlides: null,
	        // Control
	        control: undefined,
	        controlInverse: false,
	        controlBy: 'slide',
	        // Swiping/no swiping
	        allowSwipeToPrev: true,
	        allowSwipeToNext: true,
	        swipeHandler: null,
	        noSwiping: true,
	        noSwipingClass: 'swiper-no-swiping',
	        // NS
	        slideClass: 'swiper-slide',
	        slideActiveClass: 'swiper-slide-active',
	        slideVisibleClass: 'swiper-slide-visible',
	        slideDuplicateClass: 'swiper-slide-duplicate',
	        slideNextClass: 'swiper-slide-next',
	        slidePrevClass: 'swiper-slide-prev',
	        wrapperClass: 'swiper-wrapper',
	        bulletClass: 'swiper-pagination-bullet',
	        bulletActiveClass: 'swiper-pagination-bullet-active',
	        buttonDisabledClass: 'swiper-button-disabled',
	        paginationHiddenClass: 'swiper-pagination-hidden',
	        // Observer
	        observer: false,
	        observeParents: false,
	        // Accessibility
	        a11y: false,
	        prevSlideMessage: 'Previous slide',
	        nextSlideMessage: 'Next slide',
	        firstSlideMessage: 'This is the first slide',
	        lastSlideMessage: 'This is the last slide',
	        paginationBulletMessage: 'Go to slide {{index}}',
	        // Callbacks
	        runCallbacksOnInit: true
	    };
	    var initialVirtualTranslate = params && params.virtualTranslate;
	    params = params || {};
	    for (var def in defaults) {
	        if (typeof params[def] === 'undefined') {
	            params[def] = defaults[def];
	        }
	        else if (typeof params[def] === 'object') {
	            for (var deepDef in defaults[def]) {
	                if (typeof params[def][deepDef] === 'undefined') {
	                    params[def][deepDef] = defaults[def][deepDef];
	                }
	            }
	        }
	    }
	    // Swiper
	    var s = this;
	    // Version
	    s.version = '3.1.0';
	    // Params
	    s.params = params;
	    // Classname
	    s.classNames = [];
	    /*=========================
	      Dom Library and plugins
	      ===========================*/
	    if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined') {
	        $ = Dom7;
	    }
	    if (typeof $ === 'undefined') {
	        if (typeof Dom7 === 'undefined') {
	            $ = window.Dom7 || window.Zepto || window.jQuery;
	        }
	        else {
	            $ = Dom7;
	        }
	        if (!$)
	            return;
	    }
	    // Export it to Swiper instance
	    s.$ = $;
	    /*=========================
	      Preparation - Define Container, Wrapper and Pagination
	      ===========================*/
	    s.container = $(container);
	    if (s.container.length === 0)
	        return;
	    if (s.container.length > 1) {
	        s.container.each(function () {
	            new Swiper(this, params);
	        });
	        return;
	    }
	    // Save instance in container HTML Element and in data
	    s.container[0].swiper = s;
	    s.container.data('swiper', s);
	    s.classNames.push('swiper-container-' + s.params.direction);
	    if (s.params.freeMode) {
	        s.classNames.push('swiper-container-free-mode');
	    }
	    if (!s.support.flexbox) {
	        s.classNames.push('swiper-container-no-flexbox');
	        s.params.slidesPerColumn = 1;
	    }
	    // Enable slides progress when required
	    if (s.params.parallax || s.params.watchSlidesVisibility) {
	        s.params.watchSlidesProgress = true;
	    }
	    // Coverflow / 3D
	    if (['cube', 'coverflow'].indexOf(s.params.effect) >= 0) {
	        if (s.support.transforms3d) {
	            s.params.watchSlidesProgress = true;
	            s.classNames.push('swiper-container-3d');
	        }
	        else {
	            s.params.effect = 'slide';
	        }
	    }
	    if (s.params.effect !== 'slide') {
	        s.classNames.push('swiper-container-' + s.params.effect);
	    }
	    if (s.params.effect === 'cube') {
	        s.params.resistanceRatio = 0;
	        s.params.slidesPerView = 1;
	        s.params.slidesPerColumn = 1;
	        s.params.slidesPerGroup = 1;
	        s.params.centeredSlides = false;
	        s.params.spaceBetween = 0;
	        s.params.virtualTranslate = true;
	        s.params.setWrapperSize = false;
	    }
	    if (s.params.effect === 'fade') {
	        s.params.slidesPerView = 1;
	        s.params.slidesPerColumn = 1;
	        s.params.slidesPerGroup = 1;
	        s.params.watchSlidesProgress = true;
	        s.params.spaceBetween = 0;
	        if (typeof initialVirtualTranslate === 'undefined') {
	            s.params.virtualTranslate = true;
	        }
	    }
	    // Grab Cursor
	    if (s.params.grabCursor && s.support.touch) {
	        s.params.grabCursor = false;
	    }
	    // Wrapper
	    s.wrapper = s.container.children('.' + s.params.wrapperClass);
	    // Pagination
	    if (s.params.pagination) {
	        s.paginationContainer = $(s.params.pagination);
	        if (s.params.paginationClickable) {
	            s.paginationContainer.addClass('swiper-pagination-clickable');
	        }
	    }
	    // Is Horizontal
	    function isH() {
	        return s.params.direction === 'horizontal';
	    }
	    // RTL
	    s.rtl = isH() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
	    if (s.rtl) {
	        s.classNames.push('swiper-container-rtl');
	    }
	    // Wrong RTL support
	    if (s.rtl) {
	        s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
	    }
	    // Columns
	    if (s.params.slidesPerColumn > 1) {
	        s.classNames.push('swiper-container-multirow');
	    }
	    // Check for Android
	    if (s.device.android) {
	        s.classNames.push('swiper-container-android');
	    }
	    // Add classes
	    s.container.addClass(s.classNames.join(' '));
	    // Translate
	    s.translate = 0;
	    // Progress
	    s.progress = 0;
	    // Velocity
	    s.velocity = 0;
	    /*=========================
	      Locks, unlocks
	      ===========================*/
	    s.lockSwipeToNext = function () {
	        s.params.allowSwipeToNext = false;
	    };
	    s.lockSwipeToPrev = function () {
	        s.params.allowSwipeToPrev = false;
	    };
	    s.lockSwipes = function () {
	        s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
	    };
	    s.unlockSwipeToNext = function () {
	        s.params.allowSwipeToNext = true;
	    };
	    s.unlockSwipeToPrev = function () {
	        s.params.allowSwipeToPrev = true;
	    };
	    s.unlockSwipes = function () {
	        s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
	    };
	    /*=========================
	      Round helper
	      ===========================*/
	    function round(a) {
	        return Math.floor(a);
	    }
	    /*=========================
	      Set grab cursor
	      ===========================*/
	    if (s.params.grabCursor) {
	        s.container[0].style.cursor = 'move';
	        s.container[0].style.cursor = '-webkit-grab';
	        s.container[0].style.cursor = '-moz-grab';
	        s.container[0].style.cursor = 'grab';
	    }
	    /*=========================
	      Update on Images Ready
	      ===========================*/
	    s.imagesToLoad = [];
	    s.imagesLoaded = 0;
	    s.loadImage = function (imgElement, src, checkForComplete, callback) {
	        var image;
	        function onReady() {
	            if (callback)
	                callback();
	        }
	        if (!imgElement.complete || !checkForComplete) {
	            if (src) {
	                image = new window.Image();
	                image.onload = onReady;
	                image.onerror = onReady;
	                image.src = src;
	            }
	            else {
	                onReady();
	            }
	        }
	        else {
	            onReady();
	        }
	    };
	    s.preloadImages = function () {
	        s.imagesToLoad = s.container.find('img');
	        function _onReady() {
	            if (typeof s === 'undefined' || s === null)
	                return;
	            if (s.imagesLoaded !== undefined)
	                s.imagesLoaded++;
	            if (s.imagesLoaded === s.imagesToLoad.length) {
	                if (s.params.updateOnImagesReady)
	                    s.update();
	                s.emit('onImagesReady', s);
	            }
	        }
	        for (var i = 0; i < s.imagesToLoad.length; i++) {
	            s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), true, _onReady);
	        }
	    };
	    /*=========================
	      Autoplay
	      ===========================*/
	    s.autoplayTimeoutId = undefined;
	    s.autoplaying = false;
	    s.autoplayPaused = false;
	    function autoplay() {
	        s.autoplayTimeoutId = setTimeout(function () {
	            if (s.params.loop) {
	                s.fixLoop();
	                s._slideNext();
	            }
	            else {
	                if (!s.isEnd) {
	                    s._slideNext();
	                }
	                else {
	                    if (!params.autoplayStopOnLast) {
	                        s._slideTo(0);
	                    }
	                    else {
	                        s.stopAutoplay();
	                    }
	                }
	            }
	        }, s.params.autoplay);
	    }
	    s.startAutoplay = function () {
	        if (typeof s.autoplayTimeoutId !== 'undefined')
	            return false;
	        if (!s.params.autoplay)
	            return false;
	        if (s.autoplaying)
	            return false;
	        s.autoplaying = true;
	        s.emit('onAutoplayStart', s);
	        autoplay();
	    };
	    s.stopAutoplay = function (internal) {
	        if (!s.autoplayTimeoutId)
	            return;
	        if (s.autoplayTimeoutId)
	            clearTimeout(s.autoplayTimeoutId);
	        s.autoplaying = false;
	        s.autoplayTimeoutId = undefined;
	        s.emit('onAutoplayStop', s);
	    };
	    s.pauseAutoplay = function (speed) {
	        if (s.autoplayPaused)
	            return;
	        if (s.autoplayTimeoutId)
	            clearTimeout(s.autoplayTimeoutId);
	        s.autoplayPaused = true;
	        if (speed === 0) {
	            s.autoplayPaused = false;
	            autoplay();
	        }
	        else {
	            s.wrapper.transitionEnd(function () {
	                if (!s)
	                    return;
	                s.autoplayPaused = false;
	                if (!s.autoplaying) {
	                    s.stopAutoplay();
	                }
	                else {
	                    autoplay();
	                }
	            });
	        }
	    };
	    /*=========================
	      Min/Max Translate
	      ===========================*/
	    s.minTranslate = function () {
	        return (-s.snapGrid[0]);
	    };
	    s.maxTranslate = function () {
	        return (-s.snapGrid[s.snapGrid.length - 1]);
	    };
	    /*=========================
	      Slider/slides sizes
	      ===========================*/
	    s.updateContainerSize = function () {
	        var width, height;
	        if (typeof s.params.width !== 'undefined') {
	            width = s.params.width;
	        }
	        else {
	            width = s.container[0].clientWidth;
	        }
	        if (typeof s.params.height !== 'undefined') {
	            height = s.params.height;
	        }
	        else {
	            height = s.container[0].clientHeight;
	        }
	        if (width === 0 && isH() || height === 0 && !isH()) {
	            return;
	        }
	        //Subtract paddings
	        width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
	        height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
	        // Store values
	        s.width = width;
	        s.height = height;
	        s.size = isH() ? s.width : s.height;
	    };
	    s.updateSlidesSize = function () {
	        s.slides = s.wrapper.children('.' + s.params.slideClass);
	        s.snapGrid = [];
	        s.slidesGrid = [];
	        s.slidesSizesGrid = [];
	        var spaceBetween = s.params.spaceBetween, slidePosition = -s.params.slidesOffsetBefore, i, prevSlideSize = 0, index = 0;
	        if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
	            spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
	        }
	        s.virtualSize = -spaceBetween;
	        // reset margins
	        if (s.rtl)
	            s.slides.css({ marginLeft: '', marginTop: '' });
	        else
	            s.slides.css({ marginRight: '', marginBottom: '' });
	        var slidesNumberEvenToRows;
	        if (s.params.slidesPerColumn > 1) {
	            if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
	                slidesNumberEvenToRows = s.slides.length;
	            }
	            else {
	                slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
	            }
	        }
	        // Calc slides
	        var slideSize;
	        var slidesPerColumn = s.params.slidesPerColumn;
	        var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
	        var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
	        for (i = 0; i < s.slides.length; i++) {
	            slideSize = 0;
	            var slide = s.slides.eq(i);
	            if (s.params.slidesPerColumn > 1) {
	                // Set slides order
	                var newSlideOrderIndex;
	                var column, row;
	                if (s.params.slidesPerColumnFill === 'column') {
	                    column = Math.floor(i / slidesPerColumn);
	                    row = i - column * slidesPerColumn;
	                    if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
	                        if (++row >= slidesPerColumn) {
	                            row = 0;
	                            column++;
	                        }
	                    }
	                    newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
	                    slide
	                        .css({
	                        '-webkit-box-ordinal-group': newSlideOrderIndex,
	                        '-moz-box-ordinal-group': newSlideOrderIndex,
	                        '-ms-flex-order': newSlideOrderIndex,
	                        '-webkit-order': newSlideOrderIndex,
	                        'order': newSlideOrderIndex
	                    });
	                }
	                else {
	                    row = Math.floor(i / slidesPerRow);
	                    column = i - row * slidesPerRow;
	                }
	                slide
	                    .css({
	                    'margin-top': (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
	                })
	                    .attr('data-swiper-column', column)
	                    .attr('data-swiper-row', row);
	            }
	            if (slide.css('display') === 'none')
	                continue;
	            if (s.params.slidesPerView === 'auto') {
	                slideSize = isH() ? slide.outerWidth(true) : slide.outerHeight(true);
	                if (s.params.roundLengths)
	                    slideSize = round(slideSize);
	            }
	            else {
	                slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
	                if (s.params.roundLengths)
	                    slideSize = round(slideSize);
	                if (isH()) {
	                    s.slides[i].style.width = slideSize + 'px';
	                }
	                else {
	                    s.slides[i].style.height = slideSize + 'px';
	                }
	            }
	            s.slides[i].swiperSlideSize = slideSize;
	            s.slidesSizesGrid.push(slideSize);
	            if (s.params.centeredSlides) {
	                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
	                if (i === 0)
	                    slidePosition = slidePosition - s.size / 2 - spaceBetween;
	                if (Math.abs(slidePosition) < 1 / 1000)
	                    slidePosition = 0;
	                if ((index) % s.params.slidesPerGroup === 0)
	                    s.snapGrid.push(slidePosition);
	                s.slidesGrid.push(slidePosition);
	            }
	            else {
	                if ((index) % s.params.slidesPerGroup === 0)
	                    s.snapGrid.push(slidePosition);
	                s.slidesGrid.push(slidePosition);
	                slidePosition = slidePosition + slideSize + spaceBetween;
	            }
	            s.virtualSize += slideSize + spaceBetween;
	            prevSlideSize = slideSize;
	            index++;
	        }
	        s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
	        var newSlidesGrid;
	        if (s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
	            s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });
	        }
	        if (!s.support.flexbox || s.params.setWrapperSize) {
	            if (isH())
	                s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });
	            else
	                s.wrapper.css({ height: s.virtualSize + s.params.spaceBetween + 'px' });
	        }
	        if (s.params.slidesPerColumn > 1) {
	            s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
	            s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
	            s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });
	            if (s.params.centeredSlides) {
	                newSlidesGrid = [];
	                for (i = 0; i < s.snapGrid.length; i++) {
	                    if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0])
	                        newSlidesGrid.push(s.snapGrid[i]);
	                }
	                s.snapGrid = newSlidesGrid;
	            }
	        }
	        // Remove last grid elements depending on width
	        if (!s.params.centeredSlides) {
	            newSlidesGrid = [];
	            for (i = 0; i < s.snapGrid.length; i++) {
	                if (s.snapGrid[i] <= s.virtualSize - s.size) {
	                    newSlidesGrid.push(s.snapGrid[i]);
	                }
	            }
	            s.snapGrid = newSlidesGrid;
	            if (Math.floor(s.virtualSize - s.size) > Math.floor(s.snapGrid[s.snapGrid.length - 1])) {
	                s.snapGrid.push(s.virtualSize - s.size);
	            }
	        }
	        if (s.snapGrid.length === 0)
	            s.snapGrid = [0];
	        if (s.params.spaceBetween !== 0) {
	            if (isH()) {
	                if (s.rtl)
	                    s.slides.css({ marginLeft: spaceBetween + 'px' });
	                else
	                    s.slides.css({ marginRight: spaceBetween + 'px' });
	            }
	            else
	                s.slides.css({ marginBottom: spaceBetween + 'px' });
	        }
	        if (s.params.watchSlidesProgress) {
	            s.updateSlidesOffset();
	        }
	    };
	    s.updateSlidesOffset = function () {
	        for (var i = 0; i < s.slides.length; i++) {
	            s.slides[i].swiperSlideOffset = isH() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
	        }
	    };
	    /*=========================
	      Slider/slides progress
	      ===========================*/
	    s.updateSlidesProgress = function (translate) {
	        if (typeof translate === 'undefined') {
	            translate = s.translate || 0;
	        }
	        if (s.slides.length === 0)
	            return;
	        if (typeof s.slides[0].swiperSlideOffset === 'undefined')
	            s.updateSlidesOffset();
	        var offsetCenter = -translate;
	        if (s.rtl)
	            offsetCenter = translate;
	        // Visible Slides
	        var containerBox = s.container[0].getBoundingClientRect();
	        var sideBefore = isH() ? 'left' : 'top';
	        var sideAfter = isH() ? 'right' : 'bottom';
	        s.slides.removeClass(s.params.slideVisibleClass);
	        for (var i = 0; i < s.slides.length; i++) {
	            var slide = s.slides[i];
	            var slideProgress = (offsetCenter - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
	            if (s.params.watchSlidesVisibility) {
	                var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
	                var slideAfter = slideBefore + s.slidesSizesGrid[i];
	                var isVisible = (slideBefore >= 0 && slideBefore < s.size) ||
	                    (slideAfter > 0 && slideAfter <= s.size) ||
	                    (slideBefore <= 0 && slideAfter >= s.size);
	                if (isVisible) {
	                    s.slides.eq(i).addClass(s.params.slideVisibleClass);
	                }
	            }
	            slide.progress = s.rtl ? -slideProgress : slideProgress;
	        }
	    };
	    s.updateProgress = function (translate) {
	        if (typeof translate === 'undefined') {
	            translate = s.translate || 0;
	        }
	        var translatesDiff = s.maxTranslate() - s.minTranslate();
	        if (translatesDiff === 0) {
	            s.progress = 0;
	            s.isBeginning = s.isEnd = true;
	        }
	        else {
	            s.progress = (translate - s.minTranslate()) / (translatesDiff);
	            s.isBeginning = s.progress <= 0;
	            s.isEnd = s.progress >= 1;
	        }
	        if (s.isBeginning)
	            s.emit('onReachBeginning', s);
	        if (s.isEnd)
	            s.emit('onReachEnd', s);
	        if (s.params.watchSlidesProgress)
	            s.updateSlidesProgress(translate);
	        s.emit('onProgress', s, s.progress);
	    };
	    s.updateActiveIndex = function () {
	        var translate = s.rtl ? s.translate : -s.translate;
	        var newActiveIndex, i, snapIndex;
	        for (i = 0; i < s.slidesGrid.length; i++) {
	            if (typeof s.slidesGrid[i + 1] !== 'undefined') {
	                if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
	                    newActiveIndex = i;
	                }
	                else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
	                    newActiveIndex = i + 1;
	                }
	            }
	            else {
	                if (translate >= s.slidesGrid[i]) {
	                    newActiveIndex = i;
	                }
	            }
	        }
	        // Normalize slideIndex
	        if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined')
	            newActiveIndex = 0;
	        // for (i = 0; i < s.slidesGrid.length; i++) {
	        // if (- translate >= s.slidesGrid[i]) {
	        // newActiveIndex = i;
	        // }
	        // }
	        snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
	        if (snapIndex >= s.snapGrid.length)
	            snapIndex = s.snapGrid.length - 1;
	        if (newActiveIndex === s.activeIndex) {
	            return;
	        }
	        s.snapIndex = snapIndex;
	        s.previousIndex = s.activeIndex;
	        s.activeIndex = newActiveIndex;
	        s.updateClasses();
	    };
	    /*=========================
	      Classes
	      ===========================*/
	    s.updateClasses = function () {
	        s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
	        var activeSlide = s.slides.eq(s.activeIndex);
	        // Active classes
	        activeSlide.addClass(s.params.slideActiveClass);
	        activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
	        activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
	        // Pagination
	        if (s.bullets && s.bullets.length > 0) {
	            s.bullets.removeClass(s.params.bulletActiveClass);
	            var bulletIndex;
	            if (s.params.loop) {
	                bulletIndex = Math.ceil(s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup;
	                if (bulletIndex > s.slides.length - 1 - s.loopedSlides * 2) {
	                    bulletIndex = bulletIndex - (s.slides.length - s.loopedSlides * 2);
	                }
	                if (bulletIndex > s.bullets.length - 1)
	                    bulletIndex = bulletIndex - s.bullets.length;
	            }
	            else {
	                if (typeof s.snapIndex !== 'undefined') {
	                    bulletIndex = s.snapIndex;
	                }
	                else {
	                    bulletIndex = s.activeIndex || 0;
	                }
	            }
	            if (s.paginationContainer.length > 1) {
	                s.bullets.each(function () {
	                    if ($(this).index() === bulletIndex)
	                        $(this).addClass(s.params.bulletActiveClass);
	                });
	            }
	            else {
	                s.bullets.eq(bulletIndex).addClass(s.params.bulletActiveClass);
	            }
	        }
	        // Next/active buttons
	        if (!s.params.loop) {
	            if (s.params.prevButton) {
	                if (s.isBeginning) {
	                    $(s.params.prevButton).addClass(s.params.buttonDisabledClass);
	                    if (s.params.a11y && s.a11y)
	                        s.a11y.disable($(s.params.prevButton));
	                }
	                else {
	                    $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
	                    if (s.params.a11y && s.a11y)
	                        s.a11y.enable($(s.params.prevButton));
	                }
	            }
	            if (s.params.nextButton) {
	                if (s.isEnd) {
	                    $(s.params.nextButton).addClass(s.params.buttonDisabledClass);
	                    if (s.params.a11y && s.a11y)
	                        s.a11y.disable($(s.params.nextButton));
	                }
	                else {
	                    $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
	                    if (s.params.a11y && s.a11y)
	                        s.a11y.enable($(s.params.nextButton));
	                }
	            }
	        }
	    };
	    /*=========================
	      Pagination
	      ===========================*/
	    s.updatePagination = function () {
	        if (!s.params.pagination)
	            return;
	        if (s.paginationContainer && s.paginationContainer.length > 0) {
	            var bulletsHTML = '';
	            var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
	            for (var i = 0; i < numberOfBullets; i++) {
	                if (s.params.paginationBulletRender) {
	                    bulletsHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
	                }
	                else {
	                    bulletsHTML += '<' + s.params.paginationElement + ' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
	                }
	            }
	            s.paginationContainer.html(bulletsHTML);
	            s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
	            if (s.params.paginationClickable && s.params.a11y && s.a11y) {
	                s.a11y.initPagination();
	            }
	        }
	    };
	    /*=========================
	      Common update method
	      ===========================*/
	    s.update = function (updateTranslate) {
	        s.updateContainerSize();
	        s.updateSlidesSize();
	        s.updateProgress();
	        s.updatePagination();
	        s.updateClasses();
	        if (s.params.scrollbar && s.scrollbar) {
	            s.scrollbar.set();
	        }
	        function forceSetTranslate() {
	            newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
	            s.setWrapperTranslate(newTranslate);
	            s.updateActiveIndex();
	            s.updateClasses();
	        }
	        if (updateTranslate) {
	            var translated, newTranslate;
	            if (s.controller && s.controller.spline) {
	                s.controller.spline = undefined;
	            }
	            if (s.params.freeMode) {
	                forceSetTranslate();
	            }
	            else {
	                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
	                    translated = s.slideTo(s.slides.length - 1, 0, false, true);
	                }
	                else {
	                    translated = s.slideTo(s.activeIndex, 0, false, true);
	                }
	                if (!translated) {
	                    forceSetTranslate();
	                }
	            }
	        }
	    };
	    /*=========================
	      Resize Handler
	      ===========================*/
	    s.onResize = function (forceUpdatePagination) {
	        // Disable locks on resize
	        var allowSwipeToPrev = s.params.allowSwipeToPrev;
	        var allowSwipeToNext = s.params.allowSwipeToNext;
	        s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
	        s.updateContainerSize();
	        s.updateSlidesSize();
	        if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination)
	            s.updatePagination();
	        if (s.params.scrollbar && s.scrollbar) {
	            s.scrollbar.set();
	        }
	        if (s.controller && s.controller.spline) {
	            s.controller.spline = undefined;
	        }
	        if (s.params.freeMode) {
	            var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
	            s.setWrapperTranslate(newTranslate);
	            s.updateActiveIndex();
	            s.updateClasses();
	        }
	        else {
	            s.updateClasses();
	            if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
	                s.slideTo(s.slides.length - 1, 0, false, true);
	            }
	            else {
	                s.slideTo(s.activeIndex, 0, false, true);
	            }
	        }
	        // Return locks after resize
	        s.params.allowSwipeToPrev = allowSwipeToPrev;
	        s.params.allowSwipeToNext = allowSwipeToNext;
	    };
	    /*=========================
	      Events
	      ===========================*/
	    //Define Touch Events
	    var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
	    if (window.navigator.pointerEnabled)
	        desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
	    else if (window.navigator.msPointerEnabled)
	        desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
	    s.touchEvents = {
	        start: s.support.touch || !s.params.simulateTouch ? 'touchstart' : desktopEvents[0],
	        move: s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
	        end: s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
	    };
	    // WP8 Touch Events Fix
	    if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
	        (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
	    }
	    // Attach/detach events
	    s.initEvents = function (detach) {
	        console.debug('swiper initEvents', detach ? 'detach' : 'attach');
	        var actionDom = detach ? 'off' : 'on';
	        var action = detach ? 'removeEventListener' : 'addEventListener';
	        var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
	        var target = s.support.touch ? touchEventsTarget : document;
	        var moveCapture = s.params.nested ? true : false;
	        //Touch Events
	        if (s.browser.ie) {
	            touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
	            target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
	            target[action](s.touchEvents.end, s.onTouchEnd, false);
	        }
	        else {
	            if (s.support.touch) {
	                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
	                touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
	                touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false);
	            }
	            if (params.simulateTouch && !s.device.ios && !s.device.android) {
	                touchEventsTarget[action]('mousedown', s.onTouchStart, false);
	                document[action]('mousemove', s.onTouchMove, moveCapture);
	                document[action]('mouseup', s.onTouchEnd, false);
	            }
	        }
	        window[action]('resize', s.onResize);
	        // Next, Prev, Index
	        if (s.params.nextButton) {
	            $(s.params.nextButton)[actionDom]('click', s.onClickNext);
	            if (s.params.a11y && s.a11y)
	                $(s.params.nextButton)[actionDom]('keydown', s.a11y.onEnterKey);
	        }
	        if (s.params.prevButton) {
	            $(s.params.prevButton)[actionDom]('click', s.onClickPrev);
	            if (s.params.a11y && s.a11y)
	                $(s.params.prevButton)[actionDom]('keydown', s.a11y.onEnterKey);
	        }
	        if (s.params.pagination && s.params.paginationClickable) {
	            $(s.paginationContainer)[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
	            if (s.params.a11y && s.a11y)
	                $(s.paginationContainer)[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
	        }
	        // Prevent Links Clicks
	        if (s.params.preventClicks || s.params.preventClicksPropagation)
	            touchEventsTarget[action]('click', s.preventClicks, true);
	    };
	    s.attachEvents = function (detach) {
	        s.initEvents();
	    };
	    s.detachEvents = function () {
	        s.initEvents(true);
	    };
	    /*=========================
	      Handle Clicks
	      ===========================*/
	    // Prevent Clicks
	    s.allowClick = true;
	    s.preventClicks = function (e) {
	        if (!s.allowClick) {
	            if (s.params.preventClicks)
	                e.preventDefault();
	            if (s.params.preventClicksPropagation && s.animating) {
	                e.stopPropagation();
	                e.stopImmediatePropagation();
	            }
	        }
	    };
	    // Clicks
	    s.onClickNext = function (e) {
	        e.preventDefault();
	        if (s.isEnd && !s.params.loop)
	            return;
	        s.slideNext();
	    };
	    s.onClickPrev = function (e) {
	        e.preventDefault();
	        if (s.isBeginning && !s.params.loop)
	            return;
	        s.slidePrev();
	    };
	    s.onClickIndex = function (e) {
	        e.preventDefault();
	        var index = $(this).index() * s.params.slidesPerGroup;
	        if (s.params.loop)
	            index = index + s.loopedSlides;
	        s.slideTo(index);
	    };
	    /*=========================
	      Handle Touches
	      ===========================*/
	    function findElementInEvent(e, selector) {
	        var el = $(e.target);
	        if (!el.is(selector)) {
	            if (typeof selector === 'string') {
	                el = el.parents(selector);
	            }
	            else if (selector.nodeType) {
	                var found;
	                el.parents().each(function (index, _el) {
	                    if (_el === selector)
	                        found = selector;
	                });
	                if (!found)
	                    return undefined;
	                else
	                    return selector;
	            }
	        }
	        if (el.length === 0) {
	            return undefined;
	        }
	        return el[0];
	    }
	    s.updateClickedSlide = function (e) {
	        var slide = findElementInEvent(e, '.' + s.params.slideClass);
	        var slideFound = false;
	        if (slide) {
	            for (var i = 0; i < s.slides.length; i++) {
	                if (s.slides[i] === slide)
	                    slideFound = true;
	            }
	        }
	        if (slide && slideFound) {
	            s.clickedSlide = slide;
	            s.clickedIndex = $(slide).index();
	        }
	        else {
	            s.clickedSlide = undefined;
	            s.clickedIndex = undefined;
	            return;
	        }
	        if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
	            var slideToIndex = s.clickedIndex, realIndex;
	            if (s.params.loop) {
	                realIndex = $(s.clickedSlide).attr('data-swiper-slide-index');
	                if (slideToIndex > s.slides.length - s.params.slidesPerView) {
	                    s.fixLoop();
	                    slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]').eq(0).index();
	                    setTimeout(function () {
	                        s.slideTo(slideToIndex);
	                    }, 0);
	                }
	                else if (slideToIndex < s.params.slidesPerView - 1) {
	                    s.fixLoop();
	                    var duplicatedSlides = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]');
	                    slideToIndex = duplicatedSlides.eq(duplicatedSlides.length - 1).index();
	                    setTimeout(function () {
	                        s.slideTo(slideToIndex);
	                    }, 0);
	                }
	                else {
	                    s.slideTo(slideToIndex);
	                }
	            }
	            else {
	                s.slideTo(slideToIndex);
	            }
	        }
	    };
	    var isTouched, isMoved, touchStartTime, isScrolling, currentTranslate, startTranslate, allowThresholdMove, 
	    // Form elements to match
	    formElements = 'input, select, textarea, button', 
	    // Last click time
	    lastClickTime = Date.now(), clickTimeout, 
	    //Velocities
	    velocities = [], allowMomentumBounce;
	    // Animating Flag
	    s.animating = false;
	    // Touches information
	    s.touches = {
	        startX: 0,
	        startY: 0,
	        currentX: 0,
	        currentY: 0,
	        diff: 0
	    };
	    // Touch handlers
	    var isTouchEvent, startMoving;
	    s.onTouchStart = function (e) {
	        if (e.originalEvent)
	            e = e.originalEvent;
	        isTouchEvent = e.type === 'touchstart';
	        if (!isTouchEvent && 'which' in e && e.which === 3)
	            return;
	        if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
	            s.allowClick = true;
	            return;
	        }
	        if (s.params.swipeHandler) {
	            if (!findElementInEvent(e, s.params.swipeHandler))
	                return;
	        }
	        var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
	        var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
	        // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
	        if (s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
	            return;
	        }
	        isTouched = true;
	        isMoved = false;
	        isScrolling = undefined;
	        startMoving = undefined;
	        s.touches.startX = startX;
	        s.touches.startY = startY;
	        touchStartTime = Date.now();
	        s.allowClick = true;
	        s.updateContainerSize();
	        s.swipeDirection = undefined;
	        if (s.params.threshold > 0)
	            allowThresholdMove = false;
	        if (e.type !== 'touchstart') {
	            var preventDefault = true;
	            if ($(e.target).is(formElements))
	                preventDefault = false;
	            if (document.activeElement && $(document.activeElement).is(formElements)) {
	                document.activeElement.blur();
	            }
	            if (preventDefault) {
	                e.preventDefault();
	            }
	        }
	        s.emit('onTouchStart', s, e);
	    };
	    s.onTouchMove = function (e) {
	        if (e.originalEvent)
	            e = e.originalEvent;
	        if (isTouchEvent && e.type === 'mousemove')
	            return;
	        if (e.preventedByNestedSwiper)
	            return;
	        if (s.params.onlyExternal) {
	            // isMoved = true;
	            s.allowClick = false;
	            if (isTouched) {
	                s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	                s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	                touchStartTime = Date.now();
	            }
	            return;
	        }
	        if (isTouchEvent && document.activeElement) {
	            if (e.target === document.activeElement && $(e.target).is(formElements)) {
	                isMoved = true;
	                s.allowClick = false;
	                return;
	            }
	        }
	        s.emit('onTouchMove', s, e);
	        if (e.targetTouches && e.targetTouches.length > 1)
	            return;
	        s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	        s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	        if (typeof isScrolling === 'undefined') {
	            var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
	            isScrolling = isH() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
	        }
	        if (isScrolling) {
	            s.emit('onTouchMoveOpposite', s, e);
	        }
	        if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
	            if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
	                startMoving = true;
	            }
	        }
	        if (!isTouched)
	            return;
	        if (isScrolling) {
	            isTouched = false;
	            return;
	        }
	        if (!startMoving && s.browser.ieTouch) {
	            return;
	        }
	        s.allowClick = false;
	        s.emit('onSliderMove', s, e);
	        e.preventDefault();
	        if (s.params.touchMoveStopPropagation && !s.params.nested) {
	            e.stopPropagation();
	        }
	        if (!isMoved) {
	            if (params.loop) {
	                s.fixLoop();
	            }
	            startTranslate = s.getWrapperTranslate();
	            s.setWrapperTransition(0);
	            if (s.animating) {
	                s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
	            }
	            if (s.params.autoplay && s.autoplaying) {
	                if (s.params.autoplayDisableOnInteraction) {
	                    s.stopAutoplay();
	                }
	                else {
	                    s.pauseAutoplay();
	                }
	            }
	            allowMomentumBounce = false;
	            //Grab Cursor
	            if (s.params.grabCursor) {
	                s.container[0].style.cursor = 'move';
	                s.container[0].style.cursor = '-webkit-grabbing';
	                s.container[0].style.cursor = '-moz-grabbin';
	                s.container[0].style.cursor = 'grabbing';
	            }
	        }
	        isMoved = true;
	        var diff = s.touches.diff = isH() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
	        diff = diff * s.params.touchRatio;
	        if (s.rtl)
	            diff = -diff;
	        s.swipeDirection = diff > 0 ? 'prev' : 'next';
	        currentTranslate = diff + startTranslate;
	        var disableParentSwiper = true;
	        if ((diff > 0 && currentTranslate > s.minTranslate())) {
	            disableParentSwiper = false;
	            if (s.params.resistance)
	                currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
	        }
	        else if (diff < 0 && currentTranslate < s.maxTranslate()) {
	            disableParentSwiper = false;
	            if (s.params.resistance)
	                currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
	        }
	        if (disableParentSwiper) {
	            e.preventedByNestedSwiper = true;
	        }
	        // Directions locks
	        if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
	            currentTranslate = startTranslate;
	        }
	        if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
	            currentTranslate = startTranslate;
	        }
	        if (!s.params.followFinger)
	            return;
	        // Threshold
	        if (s.params.threshold > 0) {
	            if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
	                if (!allowThresholdMove) {
	                    allowThresholdMove = true;
	                    s.touches.startX = s.touches.currentX;
	                    s.touches.startY = s.touches.currentY;
	                    currentTranslate = startTranslate;
	                    s.touches.diff = isH() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
	                    return;
	                }
	            }
	            else {
	                currentTranslate = startTranslate;
	                return;
	            }
	        }
	        // Update active index in free mode
	        if (s.params.freeMode || s.params.watchSlidesProgress) {
	            s.updateActiveIndex();
	        }
	        if (s.params.freeMode) {
	            //Velocity
	            if (velocities.length === 0) {
	                velocities.push({
	                    position: s.touches[isH() ? 'startX' : 'startY'],
	                    time: touchStartTime
	                });
	            }
	            velocities.push({
	                position: s.touches[isH() ? 'currentX' : 'currentY'],
	                time: (new window.Date()).getTime()
	            });
	        }
	        // Update progress
	        s.updateProgress(currentTranslate);
	        // Update translate
	        s.setWrapperTranslate(currentTranslate);
	    };
	    s.onTouchEnd = function (e) {
	        if (e.originalEvent)
	            e = e.originalEvent;
	        s.emit('onTouchEnd', s, e);
	        if (!isTouched)
	            return;
	        //Return Grab Cursor
	        if (s.params.grabCursor && isMoved && isTouched) {
	            s.container[0].style.cursor = 'move';
	            s.container[0].style.cursor = '-webkit-grab';
	            s.container[0].style.cursor = '-moz-grab';
	            s.container[0].style.cursor = 'grab';
	        }
	        // Time diff
	        var touchEndTime = Date.now();
	        var timeDiff = touchEndTime - touchStartTime;
	        // Tap, doubleTap, Click
	        if (s.allowClick) {
	            s.updateClickedSlide(e);
	            s.emit('onTap', s, e);
	            if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
	                if (clickTimeout)
	                    clearTimeout(clickTimeout);
	                clickTimeout = setTimeout(function () {
	                    if (!s)
	                        return;
	                    if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
	                        s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
	                    }
	                    s.emit('onClick', s, e);
	                }, 300);
	            }
	            if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
	                if (clickTimeout)
	                    clearTimeout(clickTimeout);
	                s.emit('onDoubleTap', s, e);
	            }
	        }
	        lastClickTime = Date.now();
	        setTimeout(function () {
	            if (s)
	                s.allowClick = true;
	        }, 0);
	        if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
	            isTouched = isMoved = false;
	            return;
	        }
	        isTouched = isMoved = false;
	        var currentPos;
	        if (s.params.followFinger) {
	            currentPos = s.rtl ? s.translate : -s.translate;
	        }
	        else {
	            currentPos = -currentTranslate;
	        }
	        if (s.params.freeMode) {
	            if (currentPos < -s.minTranslate()) {
	                s.slideTo(s.activeIndex);
	                return;
	            }
	            else if (currentPos > -s.maxTranslate()) {
	                if (s.slides.length < s.snapGrid.length) {
	                    s.slideTo(s.snapGrid.length - 1);
	                }
	                else {
	                    s.slideTo(s.slides.length - 1);
	                }
	                return;
	            }
	            if (s.params.freeModeMomentum) {
	                if (velocities.length > 1) {
	                    var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
	                    var distance = lastMoveEvent.position - velocityEvent.position;
	                    var time = lastMoveEvent.time - velocityEvent.time;
	                    s.velocity = distance / time;
	                    s.velocity = s.velocity / 2;
	                    if (Math.abs(s.velocity) < 0.02) {
	                        s.velocity = 0;
	                    }
	                    // this implies that the user stopped moving a finger then released.
	                    // There would be no events with distance zero, so the last event is stale.
	                    if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
	                        s.velocity = 0;
	                    }
	                }
	                else {
	                    s.velocity = 0;
	                }
	                velocities.length = 0;
	                var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
	                var momentumDistance = s.velocity * momentumDuration;
	                var newPosition = s.translate + momentumDistance;
	                if (s.rtl)
	                    newPosition = -newPosition;
	                var doBounce = false;
	                var afterBouncePosition;
	                var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
	                if (newPosition < s.maxTranslate()) {
	                    if (s.params.freeModeMomentumBounce) {
	                        if (newPosition + s.maxTranslate() < -bounceAmount) {
	                            newPosition = s.maxTranslate() - bounceAmount;
	                        }
	                        afterBouncePosition = s.maxTranslate();
	                        doBounce = true;
	                        allowMomentumBounce = true;
	                    }
	                    else {
	                        newPosition = s.maxTranslate();
	                    }
	                }
	                else if (newPosition > s.minTranslate()) {
	                    if (s.params.freeModeMomentumBounce) {
	                        if (newPosition - s.minTranslate() > bounceAmount) {
	                            newPosition = s.minTranslate() + bounceAmount;
	                        }
	                        afterBouncePosition = s.minTranslate();
	                        doBounce = true;
	                        allowMomentumBounce = true;
	                    }
	                    else {
	                        newPosition = s.minTranslate();
	                    }
	                }
	                else if (s.params.freeModeSticky) {
	                    var j = 0, nextSlide;
	                    for (j = 0; j < s.snapGrid.length; j += 1) {
	                        if (s.snapGrid[j] > -newPosition) {
	                            nextSlide = j;
	                            break;
	                        }
	                    }
	                    if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
	                        newPosition = s.snapGrid[nextSlide];
	                    }
	                    else {
	                        newPosition = s.snapGrid[nextSlide - 1];
	                    }
	                    if (!s.rtl)
	                        newPosition = -newPosition;
	                }
	                //Fix duration
	                if (s.velocity !== 0) {
	                    if (s.rtl) {
	                        momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
	                    }
	                    else {
	                        momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
	                    }
	                }
	                else if (s.params.freeModeSticky) {
	                    s.slideReset();
	                    return;
	                }
	                if (s.params.freeModeMomentumBounce && doBounce) {
	                    s.updateProgress(afterBouncePosition);
	                    s.setWrapperTransition(momentumDuration);
	                    s.setWrapperTranslate(newPosition);
	                    s.onTransitionStart();
	                    s.animating = true;
	                    s.wrapper.transitionEnd(function () {
	                        if (!s || !allowMomentumBounce)
	                            return;
	                        s.emit('onMomentumBounce', s);
	                        s.setWrapperTransition(s.params.speed);
	                        s.setWrapperTranslate(afterBouncePosition);
	                        s.wrapper.transitionEnd(function () {
	                            if (!s)
	                                return;
	                            s.onTransitionEnd();
	                        });
	                    });
	                }
	                else if (s.velocity) {
	                    s.updateProgress(newPosition);
	                    s.setWrapperTransition(momentumDuration);
	                    s.setWrapperTranslate(newPosition);
	                    s.onTransitionStart();
	                    if (!s.animating) {
	                        s.animating = true;
	                        s.wrapper.transitionEnd(function () {
	                            if (!s)
	                                return;
	                            s.onTransitionEnd();
	                        });
	                    }
	                }
	                else {
	                    s.updateProgress(newPosition);
	                }
	                s.updateActiveIndex();
	            }
	            if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
	                s.updateProgress();
	                s.updateActiveIndex();
	            }
	            return;
	        }
	        // Find current slide
	        var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
	        for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
	            if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
	                if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
	                    stopIndex = i;
	                    groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
	                }
	            }
	            else {
	                if (currentPos >= s.slidesGrid[i]) {
	                    stopIndex = i;
	                    groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
	                }
	            }
	        }
	        // Find current slide size
	        var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
	        if (timeDiff > s.params.longSwipesMs) {
	            // Long touches
	            if (!s.params.longSwipes) {
	                s.slideTo(s.activeIndex);
	                return;
	            }
	            if (s.swipeDirection === 'next') {
	                if (ratio >= s.params.longSwipesRatio)
	                    s.slideTo(stopIndex + s.params.slidesPerGroup);
	                else
	                    s.slideTo(stopIndex);
	            }
	            if (s.swipeDirection === 'prev') {
	                if (ratio > (1 - s.params.longSwipesRatio))
	                    s.slideTo(stopIndex + s.params.slidesPerGroup);
	                else
	                    s.slideTo(stopIndex);
	            }
	        }
	        else {
	            // Short swipes
	            if (!s.params.shortSwipes) {
	                s.slideTo(s.activeIndex);
	                return;
	            }
	            if (s.swipeDirection === 'next') {
	                s.slideTo(stopIndex + s.params.slidesPerGroup);
	            }
	            if (s.swipeDirection === 'prev') {
	                s.slideTo(stopIndex);
	            }
	        }
	    };
	    /*=========================
	      Transitions
	      ===========================*/
	    s._slideTo = function (slideIndex, speed) {
	        return s.slideTo(slideIndex, speed, true, true);
	    };
	    s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
	        if (typeof runCallbacks === 'undefined')
	            runCallbacks = true;
	        if (typeof slideIndex === 'undefined')
	            slideIndex = 0;
	        if (slideIndex < 0)
	            slideIndex = 0;
	        s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
	        if (s.snapIndex >= s.snapGrid.length)
	            s.snapIndex = s.snapGrid.length - 1;
	        var translate = -s.snapGrid[s.snapIndex];
	        // Stop autoplay
	        if (s.params.autoplay && s.autoplaying) {
	            if (internal || !s.params.autoplayDisableOnInteraction) {
	                s.pauseAutoplay(speed);
	            }
	            else {
	                s.stopAutoplay();
	            }
	        }
	        // Update progress
	        s.updateProgress(translate);
	        // Normalize slideIndex
	        for (var i = 0; i < s.slidesGrid.length; i++) {
	            if (-Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
	                slideIndex = i;
	            }
	        }
	        // Directions locks
	        if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
	            return false;
	        }
	        if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
	            if ((s.activeIndex || 0) !== slideIndex)
	                return false;
	        }
	        // Update Index
	        if (typeof speed === 'undefined')
	            speed = s.params.speed;
	        s.previousIndex = s.activeIndex || 0;
	        s.activeIndex = slideIndex;
	        if (translate === s.translate) {
	            s.updateClasses();
	            return false;
	        }
	        s.updateClasses();
	        s.onTransitionStart(runCallbacks);
	        var translateX = isH() ? translate : 0, translateY = isH() ? 0 : translate;
	        if (speed === 0) {
	            s.setWrapperTransition(0);
	            s.setWrapperTranslate(translate);
	            s.onTransitionEnd(runCallbacks);
	        }
	        else {
	            s.setWrapperTransition(speed);
	            s.setWrapperTranslate(translate);
	            if (!s.animating) {
	                s.animating = true;
	                s.wrapper.transitionEnd(function () {
	                    if (!s)
	                        return;
	                    s.onTransitionEnd(runCallbacks);
	                });
	            }
	        }
	        return true;
	    };
	    s.onTransitionStart = function (runCallbacks) {
	        if (typeof runCallbacks === 'undefined')
	            runCallbacks = true;
	        if (s.lazy)
	            s.lazy.onTransitionStart();
	        if (runCallbacks) {
	            s.emit('onTransitionStart', s);
	            if (s.activeIndex !== s.previousIndex) {
	                s.emit('onSlideChangeStart', s);
	            }
	        }
	    };
	    s.onTransitionEnd = function (runCallbacks) {
	        s.animating = false;
	        s.setWrapperTransition(0);
	        if (typeof runCallbacks === 'undefined')
	            runCallbacks = true;
	        if (s.lazy)
	            s.lazy.onTransitionEnd();
	        if (runCallbacks) {
	            s.emit('onTransitionEnd', s);
	            if (s.activeIndex !== s.previousIndex) {
	                s.emit('onSlideChangeEnd', s);
	            }
	        }
	        if (s.params.hashnav && s.hashnav) {
	            s.hashnav.setHash();
	        }
	    };
	    s.slideNext = function (runCallbacks, speed, internal) {
	        if (s.params.loop) {
	            if (s.animating)
	                return false;
	            s.fixLoop();
	            var clientLeft = s.container[0].clientLeft;
	            return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
	        }
	        else
	            return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
	    };
	    s._slideNext = function (speed) {
	        return s.slideNext(true, speed, true);
	    };
	    s.slidePrev = function (runCallbacks, speed, internal) {
	        if (s.params.loop) {
	            if (s.animating)
	                return false;
	            s.fixLoop();
	            var clientLeft = s.container[0].clientLeft;
	            return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
	        }
	        else
	            return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
	    };
	    s._slidePrev = function (speed) {
	        return s.slidePrev(true, speed, true);
	    };
	    s.slideReset = function (runCallbacks, speed, internal) {
	        return s.slideTo(s.activeIndex, speed, runCallbacks);
	    };
	    /*=========================
	      Translate/transition helpers
	      ===========================*/
	    s.setWrapperTransition = function (duration, byController) {
	        s.wrapper.transition(duration);
	        if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	            s.effects[s.params.effect].setTransition(duration);
	        }
	        if (s.params.parallax && s.parallax) {
	            s.parallax.setTransition(duration);
	        }
	        if (s.params.scrollbar && s.scrollbar) {
	            s.scrollbar.setTransition(duration);
	        }
	        if (s.params.control && s.controller) {
	            s.controller.setTransition(duration, byController);
	        }
	        s.emit('onSetTransition', s, duration);
	    };
	    s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
	        var x = 0, y = 0, z = 0;
	        if (isH()) {
	            x = s.rtl ? -translate : translate;
	        }
	        else {
	            y = translate;
	        }
	        if (!s.params.virtualTranslate) {
	            if (s.support.transforms3d)
	                s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
	            else
	                s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
	        }
	        s.translate = isH() ? x : y;
	        if (updateActiveIndex)
	            s.updateActiveIndex();
	        if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	            s.effects[s.params.effect].setTranslate(s.translate);
	        }
	        if (s.params.parallax && s.parallax) {
	            s.parallax.setTranslate(s.translate);
	        }
	        if (s.params.scrollbar && s.scrollbar) {
	            s.scrollbar.setTranslate(s.translate);
	        }
	        if (s.params.control && s.controller) {
	            s.controller.setTranslate(s.translate, byController);
	        }
	        s.emit('onSetTranslate', s, s.translate);
	    };
	    s.getTranslate = function (el, axis) {
	        var matrix, curTransform, curStyle, transformMatrix;
	        // automatic axis detection
	        if (typeof axis === 'undefined') {
	            axis = 'x';
	        }
	        if (s.params.virtualTranslate) {
	            return s.rtl ? -s.translate : s.translate;
	        }
	        curStyle = window.getComputedStyle(el, null);
	        if (window.WebKitCSSMatrix) {
	            // Some old versions of Webkit choke when 'none' is passed; pass
	            // empty string instead in this case
	            transformMatrix = new window.WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
	        }
	        else {
	            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
	            matrix = transformMatrix.toString().split(',');
	        }
	        if (axis === 'x') {
	            //Latest Chrome and webkits Fix
	            if (window.WebKitCSSMatrix)
	                curTransform = transformMatrix.m41;
	            else if (matrix.length === 16)
	                curTransform = parseFloat(matrix[12]);
	            else
	                curTransform = parseFloat(matrix[4]);
	        }
	        if (axis === 'y') {
	            //Latest Chrome and webkits Fix
	            if (window.WebKitCSSMatrix)
	                curTransform = transformMatrix.m42;
	            else if (matrix.length === 16)
	                curTransform = parseFloat(matrix[13]);
	            else
	                curTransform = parseFloat(matrix[5]);
	        }
	        if (s.rtl && curTransform)
	            curTransform = -curTransform;
	        return curTransform || 0;
	    };
	    s.getWrapperTranslate = function (axis) {
	        if (typeof axis === 'undefined') {
	            axis = isH() ? 'x' : 'y';
	        }
	        return s.getTranslate(s.wrapper[0], axis);
	    };
	    /*=========================
	      Observer
	      ===========================*/
	    s.observers = [];
	    function initObserver(target, options) {
	        options = options || {};
	        // create an observer instance
	        var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
	        var observer = new ObserverFunc(function (mutations) {
	            mutations.forEach(function (mutation) {
	                s.onResize(true);
	                s.emit('onObserverUpdate', s, mutation);
	            });
	        });
	        observer.observe(target, {
	            attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
	            childList: typeof options.childList === 'undefined' ? true : options.childList,
	            characterData: typeof options.characterData === 'undefined' ? true : options.characterData
	        });
	        s.observers.push(observer);
	    }
	    s.initObservers = function () {
	        if (s.params.observeParents) {
	            var containerParents = s.container.parents();
	            for (var i = 0; i < containerParents.length; i++) {
	                initObserver(containerParents[i]);
	            }
	        }
	        // Observe container
	        initObserver(s.container[0], { childList: false });
	        // Observe wrapper
	        initObserver(s.wrapper[0], { attributes: false });
	    };
	    s.disconnectObservers = function () {
	        for (var i = 0; i < s.observers.length; i++) {
	            s.observers[i].disconnect();
	        }
	        s.observers = [];
	    };
	    /*=========================
	      Loop
	      ===========================*/
	    // Create looped slides
	    s.createLoop = function () {
	        // Remove duplicated slides
	        s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
	        var slides = s.wrapper.children('.' + s.params.slideClass);
	        if (s.params.slidesPerView === 'auto' && !s.params.loopedSlides)
	            s.params.loopedSlides = slides.length;
	        s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
	        s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
	        if (s.loopedSlides > slides.length) {
	            s.loopedSlides = slides.length;
	        }
	        var prependSlides = [], appendSlides = [], i;
	        slides.each(function (index, el) {
	            var slide = $(this);
	            if (index < s.loopedSlides)
	                appendSlides.push(el);
	            if (index < slides.length && index >= slides.length - s.loopedSlides)
	                prependSlides.push(el);
	            slide.attr('data-swiper-slide-index', index);
	        });
	        for (i = 0; i < appendSlides.length; i++) {
	            s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
	        }
	        for (i = prependSlides.length - 1; i >= 0; i--) {
	            s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
	        }
	    };
	    s.destroyLoop = function () {
	        s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
	        s.slides.removeAttr('data-swiper-slide-index');
	    };
	    s.fixLoop = function () {
	        var newIndex;
	        //Fix For Negative Oversliding
	        if (s.activeIndex < s.loopedSlides) {
	            newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
	            newIndex = newIndex + s.loopedSlides;
	            s.slideTo(newIndex, 0, false, true);
	        }
	        else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
	            newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
	            newIndex = newIndex + s.loopedSlides;
	            s.slideTo(newIndex, 0, false, true);
	        }
	    };
	    /*=========================
	      Append/Prepend/Remove Slides
	      ===========================*/
	    s.appendSlide = function (slides) {
	        if (s.params.loop) {
	            s.destroyLoop();
	        }
	        if (typeof slides === 'object' && slides.length) {
	            for (var i = 0; i < slides.length; i++) {
	                if (slides[i])
	                    s.wrapper.append(slides[i]);
	            }
	        }
	        else {
	            s.wrapper.append(slides);
	        }
	        if (s.params.loop) {
	            s.createLoop();
	        }
	        if (!(s.params.observer && s.support.observer)) {
	            s.update(true);
	        }
	    };
	    s.prependSlide = function (slides) {
	        if (s.params.loop) {
	            s.destroyLoop();
	        }
	        var newActiveIndex = s.activeIndex + 1;
	        if (typeof slides === 'object' && slides.length) {
	            for (var i = 0; i < slides.length; i++) {
	                if (slides[i])
	                    s.wrapper.prepend(slides[i]);
	            }
	            newActiveIndex = s.activeIndex + slides.length;
	        }
	        else {
	            s.wrapper.prepend(slides);
	        }
	        if (s.params.loop) {
	            s.createLoop();
	        }
	        if (!(s.params.observer && s.support.observer)) {
	            s.update(true);
	        }
	        s.slideTo(newActiveIndex, 0, false);
	    };
	    s.removeSlide = function (slidesIndexes) {
	        if (s.params.loop) {
	            s.destroyLoop();
	            s.slides = s.wrapper.children('.' + s.params.slideClass);
	        }
	        var newActiveIndex = s.activeIndex, indexToRemove;
	        if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
	            for (var i = 0; i < slidesIndexes.length; i++) {
	                indexToRemove = slidesIndexes[i];
	                if (s.slides[indexToRemove])
	                    s.slides.eq(indexToRemove).remove();
	                if (indexToRemove < newActiveIndex)
	                    newActiveIndex--;
	            }
	            newActiveIndex = Math.max(newActiveIndex, 0);
	        }
	        else {
	            indexToRemove = slidesIndexes;
	            if (s.slides[indexToRemove])
	                s.slides.eq(indexToRemove).remove();
	            if (indexToRemove < newActiveIndex)
	                newActiveIndex--;
	            newActiveIndex = Math.max(newActiveIndex, 0);
	        }
	        if (s.params.loop) {
	            s.createLoop();
	        }
	        if (!(s.params.observer && s.support.observer)) {
	            s.update(true);
	        }
	        if (s.params.loop) {
	            s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
	        }
	        else {
	            s.slideTo(newActiveIndex, 0, false);
	        }
	    };
	    s.removeAllSlides = function () {
	        var slidesIndexes = [];
	        for (var i = 0; i < s.slides.length; i++) {
	            slidesIndexes.push(i);
	        }
	        s.removeSlide(slidesIndexes);
	    };
	    /*=========================
	      Effects
	      ===========================*/
	    s.effects = {
	        fade: {
	            setTranslate: function () {
	                for (var i = 0; i < s.slides.length; i++) {
	                    var slide = s.slides.eq(i);
	                    var offset = slide[0].swiperSlideOffset;
	                    var tx = -offset;
	                    if (!s.params.virtualTranslate)
	                        tx = tx - s.translate;
	                    var ty = 0;
	                    if (!isH()) {
	                        ty = tx;
	                        tx = 0;
	                    }
	                    var slideOpacity = s.params.fade.crossFade ?
	                        Math.max(1 - Math.abs(slide[0].progress), 0) :
	                        1 + Math.min(Math.max(slide[0].progress, -1), 0);
	                    slide
	                        .css({
	                        opacity: slideOpacity
	                    })
	                        .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
	                }
	            },
	            setTransition: function (duration) {
	                s.slides.transition(duration);
	                if (s.params.virtualTranslate && duration !== 0) {
	                    var eventTriggered = false;
	                    s.slides.transitionEnd(function () {
	                        if (eventTriggered)
	                            return;
	                        if (!s)
	                            return;
	                        eventTriggered = true;
	                        s.animating = false;
	                        var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
	                        for (var i = 0; i < triggerEvents.length; i++) {
	                            s.wrapper.trigger(triggerEvents[i]);
	                        }
	                    });
	                }
	            }
	        },
	        cube: {
	            setTranslate: function () {
	                var wrapperRotate = 0, cubeShadow;
	                if (s.params.cube.shadow) {
	                    if (isH()) {
	                        cubeShadow = s.wrapper.find('.swiper-cube-shadow');
	                        if (cubeShadow.length === 0) {
	                            cubeShadow = $('<div class="swiper-cube-shadow"></div>');
	                            s.wrapper.append(cubeShadow);
	                        }
	                        cubeShadow.css({ height: s.width + 'px' });
	                    }
	                    else {
	                        cubeShadow = s.container.find('.swiper-cube-shadow');
	                        if (cubeShadow.length === 0) {
	                            cubeShadow = $('<div class="swiper-cube-shadow"></div>');
	                            s.container.append(cubeShadow);
	                        }
	                    }
	                }
	                for (var i = 0; i < s.slides.length; i++) {
	                    var slide = s.slides.eq(i);
	                    var slideAngle = i * 90;
	                    var round = Math.floor(slideAngle / 360);
	                    if (s.rtl) {
	                        slideAngle = -slideAngle;
	                        round = Math.floor(-slideAngle / 360);
	                    }
	                    var progress = Math.max(Math.min(slide[0].progress, 1), -1);
	                    var tx = 0, ty = 0, tz = 0;
	                    if (i % 4 === 0) {
	                        tx = -round * 4 * s.size;
	                        tz = 0;
	                    }
	                    else if ((i - 1) % 4 === 0) {
	                        tx = 0;
	                        tz = -round * 4 * s.size;
	                    }
	                    else if ((i - 2) % 4 === 0) {
	                        tx = s.size + round * 4 * s.size;
	                        tz = s.size;
	                    }
	                    else if ((i - 3) % 4 === 0) {
	                        tx = -s.size;
	                        tz = 3 * s.size + s.size * 4 * round;
	                    }
	                    if (s.rtl) {
	                        tx = -tx;
	                    }
	                    if (!isH()) {
	                        ty = tx;
	                        tx = 0;
	                    }
	                    var transform = 'rotateX(' + (isH() ? 0 : -slideAngle) + 'deg) rotateY(' + (isH() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
	                    if (progress <= 1 && progress > -1) {
	                        wrapperRotate = i * 90 + progress * 90;
	                        if (s.rtl)
	                            wrapperRotate = -i * 90 - progress * 90;
	                    }
	                    slide.transform(transform);
	                    if (s.params.cube.slideShadows) {
	                        //Set shadows
	                        var shadowBefore = isH() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
	                        var shadowAfter = isH() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
	                        if (shadowBefore.length === 0) {
	                            shadowBefore = $('<div class="swiper-slide-shadow-' + (isH() ? 'left' : 'top') + '"></div>');
	                            slide.append(shadowBefore);
	                        }
	                        if (shadowAfter.length === 0) {
	                            shadowAfter = $('<div class="swiper-slide-shadow-' + (isH() ? 'right' : 'bottom') + '"></div>');
	                            slide.append(shadowAfter);
	                        }
	                        var shadowOpacity = slide[0].progress;
	                        if (shadowBefore.length)
	                            shadowBefore[0].style.opacity = -slide[0].progress;
	                        if (shadowAfter.length)
	                            shadowAfter[0].style.opacity = slide[0].progress;
	                    }
	                }
	                s.wrapper.css({
	                    '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                    '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                    '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                    'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
	                });
	                if (s.params.cube.shadow) {
	                    if (isH()) {
	                        cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
	                    }
	                    else {
	                        var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
	                        var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
	                        var scale1 = s.params.cube.shadowScale, scale2 = s.params.cube.shadowScale / multiplier, offset = s.params.cube.shadowOffset;
	                        cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
	                    }
	                }
	                var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
	                s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (isH() ? 0 : wrapperRotate) + 'deg) rotateY(' + (isH() ? -wrapperRotate : 0) + 'deg)');
	            },
	            setTransition: function (duration) {
	                s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
	                if (s.params.cube.shadow && !isH()) {
	                    s.container.find('.swiper-cube-shadow').transition(duration);
	                }
	            }
	        },
	        coverflow: {
	            setTranslate: function () {
	                var transform = s.translate;
	                var center = isH() ? -transform + s.width / 2 : -transform + s.height / 2;
	                var rotate = isH() ? s.params.coverflow.rotate : -s.params.coverflow.rotate;
	                var translate = s.params.coverflow.depth;
	                //Each slide offset from center
	                for (var i = 0, length = s.slides.length; i < length; i++) {
	                    var slide = s.slides.eq(i);
	                    var slideSize = s.slidesSizesGrid[i];
	                    var slideOffset = slide[0].swiperSlideOffset;
	                    var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
	                    var rotateY = isH() ? rotate * offsetMultiplier : 0;
	                    var rotateX = isH() ? 0 : rotate * offsetMultiplier;
	                    // var rotateZ = 0
	                    var translateZ = -translate * Math.abs(offsetMultiplier);
	                    var translateY = isH() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
	                    var translateX = isH() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
	                    //Fix for ultra small values
	                    if (Math.abs(translateX) < 0.001)
	                        translateX = 0;
	                    if (Math.abs(translateY) < 0.001)
	                        translateY = 0;
	                    if (Math.abs(translateZ) < 0.001)
	                        translateZ = 0;
	                    if (Math.abs(rotateY) < 0.001)
	                        rotateY = 0;
	                    if (Math.abs(rotateX) < 0.001)
	                        rotateX = 0;
	                    var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
	                    slide.transform(slideTransform);
	                    slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
	                    if (s.params.coverflow.slideShadows) {
	                        //Set shadows
	                        var shadowBefore = isH() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
	                        var shadowAfter = isH() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
	                        if (shadowBefore.length === 0) {
	                            shadowBefore = $('<div class="swiper-slide-shadow-' + (isH() ? 'left' : 'top') + '"></div>');
	                            slide.append(shadowBefore);
	                        }
	                        if (shadowAfter.length === 0) {
	                            shadowAfter = $('<div class="swiper-slide-shadow-' + (isH() ? 'right' : 'bottom') + '"></div>');
	                            slide.append(shadowAfter);
	                        }
	                        if (shadowBefore.length)
	                            shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
	                        if (shadowAfter.length)
	                            shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
	                    }
	                }
	                //Set correct perspective for IE10
	                if (s.browser.ie) {
	                    var ws = s.wrapper[0].style;
	                    ws.perspectiveOrigin = center + 'px 50%';
	                }
	            },
	            setTransition: function (duration) {
	                s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
	            }
	        }
	    };
	    /*=========================
	      Images Lazy Loading
	      ===========================*/
	    s.lazy = {
	        initialImageLoaded: false,
	        loadImageInSlide: function (index, loadInDuplicate) {
	            if (typeof index === 'undefined')
	                return;
	            if (typeof loadInDuplicate === 'undefined')
	                loadInDuplicate = true;
	            if (s.slides.length === 0)
	                return;
	            var slide = s.slides.eq(index);
	            var img = slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
	            if (slide.hasClass('swiper-lazy') && !slide.hasClass('swiper-lazy-loaded') && !slide.hasClass('swiper-lazy-loading')) {
	                img.add(slide[0]);
	            }
	            if (img.length === 0)
	                return;
	            img.each(function () {
	                var _img = $(this);
	                _img.addClass('swiper-lazy-loading');
	                var background = _img.attr('data-background');
	                var src = _img.attr('data-src');
	                s.loadImage(_img[0], (src || background), false, function () {
	                    if (background) {
	                        _img.css('background-image', 'url(' + background + ')');
	                        _img.removeAttr('data-background');
	                    }
	                    else {
	                        _img.attr('src', src);
	                        _img.removeAttr('data-src');
	                    }
	                    _img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');
	                    slide.find('.swiper-lazy-preloader, .preloader').remove();
	                    if (s.params.loop && loadInDuplicate) {
	                        var slideOriginalIndex = slide.attr('data-swiper-slide-index');
	                        if (slide.hasClass(s.params.slideDuplicateClass)) {
	                            var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
	                            s.lazy.loadImageInSlide(originalSlide.index(), false);
	                        }
	                        else {
	                            var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
	                            s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
	                        }
	                    }
	                    s.emit('onLazyImageReady', s, slide[0], _img[0]);
	                });
	                s.emit('onLazyImageLoad', s, slide[0], _img[0]);
	            });
	        },
	        load: function () {
	            var i;
	            if (s.params.watchSlidesVisibility) {
	                s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
	                    s.lazy.loadImageInSlide($(this).index());
	                });
	            }
	            else {
	                if (s.params.slidesPerView > 1) {
	                    for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView; i++) {
	                        if (s.slides[i])
	                            s.lazy.loadImageInSlide(i);
	                    }
	                }
	                else {
	                    s.lazy.loadImageInSlide(s.activeIndex);
	                }
	            }
	            if (s.params.lazyLoadingInPrevNext) {
	                if (s.params.slidesPerView > 1) {
	                    // Next Slides
	                    for (i = s.activeIndex + s.params.slidesPerView; i < s.activeIndex + s.params.slidesPerView + s.params.slidesPerView; i++) {
	                        if (s.slides[i])
	                            s.lazy.loadImageInSlide(i);
	                    }
	                    // Prev Slides
	                    for (i = s.activeIndex - s.params.slidesPerView; i < s.activeIndex; i++) {
	                        if (s.slides[i])
	                            s.lazy.loadImageInSlide(i);
	                    }
	                }
	                else {
	                    var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
	                    if (nextSlide.length > 0)
	                        s.lazy.loadImageInSlide(nextSlide.index());
	                    var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
	                    if (prevSlide.length > 0)
	                        s.lazy.loadImageInSlide(prevSlide.index());
	                }
	            }
	        },
	        onTransitionStart: function () {
	            if (s.params.lazyLoading) {
	                if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
	                    s.lazy.load();
	                }
	            }
	        },
	        onTransitionEnd: function () {
	            if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
	                s.lazy.load();
	            }
	        }
	    };
	    /*=========================
	      Scrollbar
	      ===========================*/
	    s.scrollbar = {
	        set: function () {
	            if (!s.params.scrollbar)
	                return;
	            var sb = s.scrollbar;
	            sb.track = $(s.params.scrollbar);
	            sb.drag = sb.track.find('.swiper-scrollbar-drag');
	            if (sb.drag.length === 0) {
	                sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
	                sb.track.append(sb.drag);
	            }
	            sb.drag[0].style.width = '';
	            sb.drag[0].style.height = '';
	            sb.trackSize = isH() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
	            sb.divider = s.size / s.virtualSize;
	            sb.moveDivider = sb.divider * (sb.trackSize / s.size);
	            sb.dragSize = sb.trackSize * sb.divider;
	            if (isH()) {
	                sb.drag[0].style.width = sb.dragSize + 'px';
	            }
	            else {
	                sb.drag[0].style.height = sb.dragSize + 'px';
	            }
	            if (sb.divider >= 1) {
	                sb.track[0].style.display = 'none';
	            }
	            else {
	                sb.track[0].style.display = '';
	            }
	            if (s.params.scrollbarHide) {
	                sb.track[0].style.opacity = 0;
	            }
	        },
	        setTranslate: function () {
	            if (!s.params.scrollbar)
	                return;
	            var diff;
	            var sb = s.scrollbar;
	            var translate = s.translate || 0;
	            var newPos;
	            var newSize = sb.dragSize;
	            newPos = (sb.trackSize - sb.dragSize) * s.progress;
	            if (s.rtl && isH()) {
	                newPos = -newPos;
	                if (newPos > 0) {
	                    newSize = sb.dragSize - newPos;
	                    newPos = 0;
	                }
	                else if (-newPos + sb.dragSize > sb.trackSize) {
	                    newSize = sb.trackSize + newPos;
	                }
	            }
	            else {
	                if (newPos < 0) {
	                    newSize = sb.dragSize + newPos;
	                    newPos = 0;
	                }
	                else if (newPos + sb.dragSize > sb.trackSize) {
	                    newSize = sb.trackSize - newPos;
	                }
	            }
	            if (isH()) {
	                if (s.support.transforms3d) {
	                    sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
	                }
	                else {
	                    sb.drag.transform('translateX(' + (newPos) + 'px)');
	                }
	                sb.drag[0].style.width = newSize + 'px';
	            }
	            else {
	                if (s.support.transforms3d) {
	                    sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
	                }
	                else {
	                    sb.drag.transform('translateY(' + (newPos) + 'px)');
	                }
	                sb.drag[0].style.height = newSize + 'px';
	            }
	            if (s.params.scrollbarHide) {
	                clearTimeout(sb.timeout);
	                sb.track[0].style.opacity = 1;
	                sb.timeout = setTimeout(function () {
	                    sb.track[0].style.opacity = 0;
	                    sb.track.transition(400);
	                }, 1000);
	            }
	        },
	        setTransition: function (duration) {
	            if (!s.params.scrollbar)
	                return;
	            s.scrollbar.drag.transition(duration);
	        }
	    };
	    /*=========================
	      Controller
	      ===========================*/
	    s.controller = {
	        LinearSpline: function (x, y) {
	            this.x = x;
	            this.y = y;
	            this.lastIndex = x.length - 1;
	            // Given an x value (x2), return the expected y2 value:
	            // (x1,y1) is the known point before given value,
	            // (x3,y3) is the known point after given value.
	            var i1, i3;
	            var l = this.x.length;
	            this.interpolate = function (x2) {
	                if (!x2)
	                    return 0;
	                // Get the indexes of x1 and x3 (the array indexes before and after given x2):
	                i3 = binarySearch(this.x, x2);
	                i1 = i3 - 1;
	                // We have our indexes i1 & i3, so we can calculate already:
	                // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
	                return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
	            };
	            var binarySearch = (function () {
	                var maxIndex, minIndex, guess;
	                return function (array, val) {
	                    minIndex = -1;
	                    maxIndex = array.length;
	                    while (maxIndex - minIndex > 1)
	                        if (array[guess = maxIndex + minIndex >> 1] <= val) {
	                            minIndex = guess;
	                        }
	                        else {
	                            maxIndex = guess;
	                        }
	                    return maxIndex;
	                };
	            })();
	        },
	        //xxx: for now i will just save one spline function to to
	        getInterpolateFunction: function (c) {
	            if (!s.controller.spline)
	                s.controller.spline = s.params.loop ?
	                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
	                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
	        },
	        setTranslate: function (translate, byController) {
	            var controlled = s.params.control;
	            var multiplier, controlledTranslate;
	            function setControlledTranslate(c) {
	                // this will create an Interpolate function based on the snapGrids
	                // x is the Grid of the scrolled scroller and y will be the controlled scroller
	                // it makes sense to create this only once and recall it for the interpolation
	                // the function does a lot of value caching for performance
	                translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
	                if (s.params.controlBy === 'slide') {
	                    s.controller.getInterpolateFunction(c);
	                    // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
	                    // but it did not work out
	                    controlledTranslate = -s.controller.spline.interpolate(-translate);
	                }
	                if (!controlledTranslate || s.params.controlBy === 'container') {
	                    multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
	                    controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
	                }
	                if (s.params.controlInverse) {
	                    controlledTranslate = c.maxTranslate() - controlledTranslate;
	                }
	                c.updateProgress(controlledTranslate);
	                c.setWrapperTranslate(controlledTranslate, false, s);
	                c.updateActiveIndex();
	            }
	            if (s.isArray(controlled)) {
	                for (var i = 0; i < controlled.length; i++) {
	                    if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
	                        setControlledTranslate(controlled[i]);
	                    }
	                }
	            }
	            else if (controlled instanceof Swiper && byController !== controlled) {
	                setControlledTranslate(controlled);
	            }
	        },
	        setTransition: function (duration, byController) {
	            var controlled = s.params.control;
	            var i;
	            function setControlledTransition(c) {
	                c.setWrapperTransition(duration, s);
	                if (duration !== 0) {
	                    c.onTransitionStart();
	                    c.wrapper.transitionEnd(function () {
	                        if (!controlled)
	                            return;
	                        if (c.params.loop && s.params.controlBy === 'slide') {
	                            c.fixLoop();
	                        }
	                        c.onTransitionEnd();
	                    });
	                }
	            }
	            if (s.isArray(controlled)) {
	                for (i = 0; i < controlled.length; i++) {
	                    if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
	                        setControlledTransition(controlled[i]);
	                    }
	                }
	            }
	            else if (controlled instanceof Swiper && byController !== controlled) {
	                setControlledTransition(controlled);
	            }
	        }
	    };
	    /*=========================
	      Hash Navigation
	      ===========================*/
	    s.hashnav = {
	        init: function () {
	            if (!s.params.hashnav)
	                return;
	            s.hashnav.initialized = true;
	            var hash = document.location.hash.replace('#', '');
	            if (!hash)
	                return;
	            var speed = 0;
	            for (var i = 0, length = s.slides.length; i < length; i++) {
	                var slide = s.slides.eq(i);
	                var slideHash = slide.attr('data-hash');
	                if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
	                    var index = slide.index();
	                    s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
	                }
	            }
	        },
	        setHash: function () {
	            if (!s.hashnav.initialized || !s.params.hashnav)
	                return;
	            document.location.hash = s.slides.eq(s.activeIndex).attr('data-hash') || '';
	        }
	    };
	    /*=========================
	      Keyboard Control
	      ===========================*/
	    function handleKeyboard(e) {
	        if (e.originalEvent)
	            e = e.originalEvent; //jquery fix
	        var kc = e.keyCode || e.charCode;
	        // Directions locks
	        if (!s.params.allowSwipeToNext && (isH() && kc === 39 || !isH() && kc === 40)) {
	            return false;
	        }
	        if (!s.params.allowSwipeToPrev && (isH() && kc === 37 || !isH() && kc === 38)) {
	            return false;
	        }
	        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
	            return;
	        }
	        if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
	            return;
	        }
	        if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
	            var inView = false;
	            //Check that swiper should be inside of visible area of window
	            if (s.container.parents('.swiper-slide').length > 0 && s.container.parents('.swiper-slide-active').length === 0) {
	                return;
	            }
	            var windowScroll = {
	                left: window.pageXOffset,
	                top: window.pageYOffset
	            };
	            var windowWidth = window.innerWidth;
	            var windowHeight = window.innerHeight;
	            var swiperOffset = s.container.offset();
	            if (s.rtl)
	                swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
	            var swiperCoord = [
	                [swiperOffset.left, swiperOffset.top],
	                [swiperOffset.left + s.width, swiperOffset.top],
	                [swiperOffset.left, swiperOffset.top + s.height],
	                [swiperOffset.left + s.width, swiperOffset.top + s.height]
	            ];
	            for (var i = 0; i < swiperCoord.length; i++) {
	                var point = swiperCoord[i];
	                if (point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
	                    point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight) {
	                    inView = true;
	                }
	            }
	            if (!inView)
	                return;
	        }
	        if (isH()) {
	            if (kc === 37 || kc === 39) {
	                if (e.preventDefault)
	                    e.preventDefault();
	                else
	                    e.returnValue = false;
	            }
	            if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl))
	                s.slideNext();
	            if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl))
	                s.slidePrev();
	        }
	        else {
	            if (kc === 38 || kc === 40) {
	                if (e.preventDefault)
	                    e.preventDefault();
	                else
	                    e.returnValue = false;
	            }
	            if (kc === 40)
	                s.slideNext();
	            if (kc === 38)
	                s.slidePrev();
	        }
	    }
	    s.disableKeyboardControl = function () {
	        $(document).off('keydown', handleKeyboard);
	    };
	    s.enableKeyboardControl = function () {
	        $(document).on('keydown', handleKeyboard);
	    };
	    /*=========================
	      Mousewheel Control
	      ===========================*/
	    s.mousewheel = {
	        event: false,
	        lastScrollTime: (new window.Date()).getTime()
	    };
	    if (s.params.mousewheelControl) {
	        try {
	            new window.WheelEvent('wheel');
	            s.mousewheel.event = 'wheel';
	        }
	        catch (e) { }
	        if (!s.mousewheel.event && document.onmousewheel !== undefined) {
	            s.mousewheel.event = 'mousewheel';
	        }
	        if (!s.mousewheel.event) {
	            s.mousewheel.event = 'DOMMouseScroll';
	        }
	    }
	    function handleMousewheel(e) {
	        if (e.originalEvent)
	            e = e.originalEvent; //jquery fix
	        var we = s.mousewheel.event;
	        var delta = 0;
	        //Opera & IE
	        if (e.detail)
	            delta = -e.detail;
	        else if (we === 'mousewheel') {
	            if (s.params.mousewheelForceToAxis) {
	                if (isH()) {
	                    if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))
	                        delta = e.wheelDeltaX;
	                    else
	                        return;
	                }
	                else {
	                    if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))
	                        delta = e.wheelDeltaY;
	                    else
	                        return;
	                }
	            }
	            else {
	                delta = e.wheelDelta;
	            }
	        }
	        else if (we === 'DOMMouseScroll')
	            delta = -e.detail;
	        else if (we === 'wheel') {
	            if (s.params.mousewheelForceToAxis) {
	                if (isH()) {
	                    if (Math.abs(e.deltaX) > Math.abs(e.deltaY))
	                        delta = -e.deltaX;
	                    else
	                        return;
	                }
	                else {
	                    if (Math.abs(e.deltaY) > Math.abs(e.deltaX))
	                        delta = -e.deltaY;
	                    else
	                        return;
	                }
	            }
	            else {
	                delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
	            }
	        }
	        if (s.params.mousewheelInvert)
	            delta = -delta;
	        if (!s.params.freeMode) {
	            if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
	                if (delta < 0) {
	                    if ((!s.isEnd || s.params.loop) && !s.animating)
	                        s.slideNext();
	                    else if (s.params.mousewheelReleaseOnEdges)
	                        return true;
	                }
	                else {
	                    if ((!s.isBeginning || s.params.loop) && !s.animating)
	                        s.slidePrev();
	                    else if (s.params.mousewheelReleaseOnEdges)
	                        return true;
	                }
	            }
	            s.mousewheel.lastScrollTime = (new window.Date()).getTime();
	        }
	        else {
	            //Freemode or scrollContainer:
	            var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
	            if (position > 0)
	                position = 0;
	            if (position < s.maxTranslate())
	                position = s.maxTranslate();
	            s.setWrapperTransition(0);
	            s.setWrapperTranslate(position);
	            s.updateProgress();
	            s.updateActiveIndex();
	            if (s.params.freeModeSticky) {
	                clearTimeout(s.mousewheel.timeout);
	                s.mousewheel.timeout = setTimeout(function () {
	                    s.slideReset();
	                }, 300);
	            }
	            // Return page scroll on edge positions
	            if (position === 0 || position === s.maxTranslate())
	                return;
	        }
	        if (s.params.autoplay)
	            s.stopAutoplay();
	        if (e.preventDefault)
	            e.preventDefault();
	        else
	            e.returnValue = false;
	        return false;
	    }
	    s.disableMousewheelControl = function () {
	        if (!s.mousewheel.event)
	            return false;
	        s.container.off(s.mousewheel.event, handleMousewheel);
	        return true;
	    };
	    s.enableMousewheelControl = function () {
	        if (!s.mousewheel.event)
	            return false;
	        s.container.on(s.mousewheel.event, handleMousewheel);
	        return true;
	    };
	    /*=========================
	      Parallax
	      ===========================*/
	    function setParallaxTransform(el, progress) {
	        el = $(el);
	        var p, pX, pY;
	        p = el.attr('data-swiper-parallax') || '0';
	        pX = el.attr('data-swiper-parallax-x');
	        pY = el.attr('data-swiper-parallax-y');
	        if (pX || pY) {
	            pX = pX || '0';
	            pY = pY || '0';
	        }
	        else {
	            if (isH()) {
	                pX = p;
	                pY = '0';
	            }
	            else {
	                pY = p;
	                pX = '0';
	            }
	        }
	        if ((pX).indexOf('%') >= 0) {
	            pX = parseInt(pX, 10) * progress + '%';
	        }
	        else {
	            pX = pX * progress + 'px';
	        }
	        if ((pY).indexOf('%') >= 0) {
	            pY = parseInt(pY, 10) * progress + '%';
	        }
	        else {
	            pY = pY * progress + 'px';
	        }
	        el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
	    }
	    s.parallax = {
	        setTranslate: function () {
	            s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
	                setParallaxTransform(this, s.progress);
	            });
	            s.slides.each(function () {
	                var slide = $(this);
	                slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
	                    var progress = Math.min(Math.max(slide[0].progress, -1), 1);
	                    setParallaxTransform(this, progress);
	                });
	            });
	        },
	        setTransition: function (duration) {
	            if (typeof duration === 'undefined')
	                duration = s.params.speed;
	            s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
	                var el = $(this);
	                var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
	                if (duration === 0)
	                    parallaxDuration = 0;
	                el.transition(parallaxDuration);
	            });
	        }
	    };
	    /*=========================
	      Plugins API. Collect all and init all plugins
	      ===========================*/
	    s._plugins = [];
	    for (var plugin in s.plugins) {
	        var p = s.plugins[plugin](s, s.params[plugin]);
	        if (p)
	            s._plugins.push(p);
	    }
	    // Method to call all plugins event/method
	    s.callPlugins = function (eventName) {
	        for (var i = 0; i < s._plugins.length; i++) {
	            if (eventName in s._plugins[i]) {
	                s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	            }
	        }
	    };
	    /*=========================
	      Events/Callbacks/Plugins Emitter
	      ===========================*/
	    function normalizeEventName(eventName) {
	        if (eventName.indexOf('on') !== 0) {
	            if (eventName[0] !== eventName[0].toUpperCase()) {
	                eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
	            }
	            else {
	                eventName = 'on' + eventName;
	            }
	        }
	        return eventName;
	    }
	    s.emitterEventListeners = {};
	    s.emit = function (eventName) {
	        // Trigger callbacks
	        if (s.params[eventName]) {
	            s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	        }
	        var i;
	        // Trigger events
	        if (s.emitterEventListeners[eventName]) {
	            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
	                s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	            }
	        }
	        // Trigger plugins
	        if (s.callPlugins)
	            s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	    };
	    s.on = function (eventName, handler) {
	        eventName = normalizeEventName(eventName);
	        if (!s.emitterEventListeners[eventName])
	            s.emitterEventListeners[eventName] = [];
	        s.emitterEventListeners[eventName].push(handler);
	        return s;
	    };
	    s.off = function (eventName, handler) {
	        var i;
	        eventName = normalizeEventName(eventName);
	        if (typeof handler === 'undefined') {
	            // Remove all handlers for such event
	            s.emitterEventListeners[eventName] = [];
	            return s;
	        }
	        if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0)
	            return;
	        for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
	            if (s.emitterEventListeners[eventName][i] === handler)
	                s.emitterEventListeners[eventName].splice(i, 1);
	        }
	        return s;
	    };
	    s.once = function (eventName, handler) {
	        eventName = normalizeEventName(eventName);
	        var _handler = function () {
	            handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
	            s.off(eventName, _handler);
	        };
	        s.on(eventName, _handler);
	        return s;
	    };
	    // Accessibility tools
	    s.a11y = {
	        makeFocusable: function ($el) {
	            $el.attr('tabIndex', '0');
	            return $el;
	        },
	        addRole: function ($el, role) {
	            $el.attr('role', role);
	            return $el;
	        },
	        addLabel: function ($el, label) {
	            $el.attr('aria-label', label);
	            return $el;
	        },
	        disable: function ($el) {
	            $el.attr('aria-disabled', true);
	            return $el;
	        },
	        enable: function ($el) {
	            $el.attr('aria-disabled', false);
	            return $el;
	        },
	        onEnterKey: function (event) {
	            if (event.keyCode !== 13)
	                return;
	            if ($(event.target).is(s.params.nextButton)) {
	                s.onClickNext(event);
	                if (s.isEnd) {
	                    s.a11y.notify(s.params.lastSlideMessage);
	                }
	                else {
	                    s.a11y.notify(s.params.nextSlideMessage);
	                }
	            }
	            else if ($(event.target).is(s.params.prevButton)) {
	                s.onClickPrev(event);
	                if (s.isBeginning) {
	                    s.a11y.notify(s.params.firstSlideMessage);
	                }
	                else {
	                    s.a11y.notify(s.params.prevSlideMessage);
	                }
	            }
	            if ($(event.target).is('.' + s.params.bulletClass)) {
	                $(event.target)[0].click();
	            }
	        },
	        liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
	        notify: function (message) {
	            var notification = s.a11y.liveRegion;
	            if (notification.length === 0)
	                return;
	            notification.html('');
	            notification.html(message);
	        },
	        init: function () {
	            // Setup accessibility
	            if (s.params.nextButton) {
	                var nextButton = $(s.params.nextButton);
	                s.a11y.makeFocusable(nextButton);
	                s.a11y.addRole(nextButton, 'button');
	                s.a11y.addLabel(nextButton, s.params.nextSlideMessage);
	            }
	            if (s.params.prevButton) {
	                var prevButton = $(s.params.prevButton);
	                s.a11y.makeFocusable(prevButton);
	                s.a11y.addRole(prevButton, 'button');
	                s.a11y.addLabel(prevButton, s.params.prevSlideMessage);
	            }
	            $(s.container).append(s.a11y.liveRegion);
	        },
	        initPagination: function () {
	            if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
	                s.bullets.each(function () {
	                    var bullet = $(this);
	                    s.a11y.makeFocusable(bullet);
	                    s.a11y.addRole(bullet, 'button');
	                    s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
	                });
	            }
	        },
	        destroy: function () {
	            if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0)
	                s.a11y.liveRegion.remove();
	        }
	    };
	    /*=========================
	      Init/Destroy
	      ===========================*/
	    s.init = function () {
	        if (s.params.loop)
	            s.createLoop();
	        s.updateContainerSize();
	        s.updateSlidesSize();
	        s.updatePagination();
	        if (s.params.scrollbar && s.scrollbar) {
	            s.scrollbar.set();
	        }
	        if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	            if (!s.params.loop)
	                s.updateProgress();
	            s.effects[s.params.effect].setTranslate();
	        }
	        if (s.params.loop) {
	            s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
	        }
	        else {
	            s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
	            if (s.params.initialSlide === 0) {
	                if (s.parallax && s.params.parallax)
	                    s.parallax.setTranslate();
	                if (s.lazy && s.params.lazyLoading) {
	                    s.lazy.load();
	                    s.lazy.initialImageLoaded = true;
	                }
	            }
	        }
	        s.attachEvents();
	        if (s.params.observer && s.support.observer) {
	            s.initObservers();
	        }
	        if (s.params.preloadImages && !s.params.lazyLoading) {
	            s.preloadImages();
	        }
	        if (s.params.autoplay) {
	            s.startAutoplay();
	        }
	        if (s.params.keyboardControl) {
	            if (s.enableKeyboardControl)
	                s.enableKeyboardControl();
	        }
	        if (s.params.mousewheelControl) {
	            if (s.enableMousewheelControl)
	                s.enableMousewheelControl();
	        }
	        if (s.params.hashnav) {
	            if (s.hashnav)
	                s.hashnav.init();
	        }
	        if (s.params.a11y && s.a11y)
	            s.a11y.init();
	        s.emit('onInit', s);
	    };
	    // Cleanup dynamic styles
	    s.cleanupStyles = function () {
	        // Container
	        s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
	        // Wrapper
	        s.wrapper.removeAttr('style');
	        // Slides
	        if (s.slides && s.slides.length) {
	            s.slides
	                .removeClass([
	                s.params.slideVisibleClass,
	                s.params.slideActiveClass,
	                s.params.slideNextClass,
	                s.params.slidePrevClass
	            ].join(' '))
	                .removeAttr('style')
	                .removeAttr('data-swiper-column')
	                .removeAttr('data-swiper-row');
	        }
	        // Pagination/Bullets
	        if (s.paginationContainer && s.paginationContainer.length) {
	            s.paginationContainer.removeClass(s.params.paginationHiddenClass);
	        }
	        if (s.bullets && s.bullets.length) {
	            s.bullets.removeClass(s.params.bulletActiveClass);
	        }
	        // Buttons
	        if (s.params.prevButton)
	            $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
	        if (s.params.nextButton)
	            $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
	        // Scrollbar
	        if (s.params.scrollbar && s.scrollbar) {
	            if (s.scrollbar.track && s.scrollbar.track.length)
	                s.scrollbar.track.removeAttr('style');
	            if (s.scrollbar.drag && s.scrollbar.drag.length)
	                s.scrollbar.drag.removeAttr('style');
	        }
	    };
	    // Destroy
	    s.destroy = function (deleteInstance, cleanupStyles) {
	        // Detach evebts
	        s.detachEvents();
	        // Stop autoplay
	        s.stopAutoplay();
	        // Destroy loop
	        if (s.params.loop) {
	            s.destroyLoop();
	        }
	        // Cleanup styles
	        if (cleanupStyles) {
	            s.cleanupStyles();
	        }
	        // Disconnect observer
	        s.disconnectObservers();
	        // Disable keyboard/mousewheel
	        if (s.params.keyboardControl) {
	            if (s.disableKeyboardControl)
	                s.disableKeyboardControl();
	        }
	        if (s.params.mousewheelControl) {
	            if (s.disableMousewheelControl)
	                s.disableMousewheelControl();
	        }
	        // Disable a11y
	        if (s.params.a11y && s.a11y)
	            s.a11y.destroy();
	        // Destroy callback
	        s.emit('onDestroy');
	        // Delete instance
	        if (deleteInstance !== false)
	            s = null;
	    };
	    s.init();
	    // Return swiper instance
	    return s;
	}
	exports.Swiper = Swiper;
	;
	/*==================================================
	    Prototype
	====================================================*/
	Swiper.prototype = {
	    isSafari: (function () {
	        var ua = navigator.userAgent.toLowerCase();
	        return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
	    })(),
	    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
	    isArray: function (arr) {
	        return Object.prototype.toString.apply(arr) === '[object Array]';
	    },
	    /*==================================================
	    Browser
	    ====================================================*/
	    browser: {
	        ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
	        ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
	    },
	    /*==================================================
	    Devices
	    ====================================================*/
	    device: (function () {
	        var ua = navigator.userAgent;
	        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
	        return {
	            ios: ipad || iphone || ipod,
	            android: android
	        };
	    })(),
	    /*==================================================
	    Feature Detection
	    ====================================================*/
	    support: {
	        touch: (window.Modernizr && Modernizr.touch === true) || (function () {
	            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	        })(),
	        transforms3d: (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
	            var div = document.createElement('div').style;
	            return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
	        })(),
	        flexbox: (function () {
	            var div = document.createElement('div').style;
	            var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
	            for (var i = 0; i < styles.length; i++) {
	                if (styles[i] in div)
	                    return true;
	            }
	        })(),
	        observer: (function () {
	            return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
	        })()
	    },
	    /*==================================================
	    Plugins
	    ====================================================*/
	    plugins: {}
	};
	/*===========================
	Dom7 Library
	===========================*/
	var Dom7 = (function () {
	    var Dom7 = function (arr) {
	        var _this = this, i = 0;
	        // Create array-like object
	        for (i = 0; i < arr.length; i++) {
	            _this[i] = arr[i];
	        }
	        _this.length = arr.length;
	        // Return collection with methods
	        return this;
	    };
	    var $ = function (selector, context) {
	        var arr = [], i = 0;
	        if (selector && !context) {
	            if (selector instanceof Dom7) {
	                return selector;
	            }
	        }
	        if (selector) {
	            // String
	            if (typeof selector === 'string') {
	                var els, tempParent, html = selector.trim();
	                if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
	                    var toCreate = 'div';
	                    if (html.indexOf('<li') === 0)
	                        toCreate = 'ul';
	                    if (html.indexOf('<tr') === 0)
	                        toCreate = 'tbody';
	                    if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0)
	                        toCreate = 'tr';
	                    if (html.indexOf('<tbody') === 0)
	                        toCreate = 'table';
	                    if (html.indexOf('<option') === 0)
	                        toCreate = 'select';
	                    tempParent = document.createElement(toCreate);
	                    tempParent.innerHTML = selector;
	                    for (i = 0; i < tempParent.childNodes.length; i++) {
	                        arr.push(tempParent.childNodes[i]);
	                    }
	                }
	                else {
	                    if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
	                        // Pure ID selector
	                        els = [document.getElementById(selector.split('#')[1])];
	                    }
	                    else {
	                        // Other selectors
	                        els = (context || document).querySelectorAll(selector);
	                    }
	                    for (i = 0; i < els.length; i++) {
	                        if (els[i])
	                            arr.push(els[i]);
	                    }
	                }
	            }
	            else if (selector.nodeType || selector === window || selector === document) {
	                arr.push(selector);
	            }
	            else if (selector.length > 0 && selector[0].nodeType) {
	                for (i = 0; i < selector.length; i++) {
	                    arr.push(selector[i]);
	                }
	            }
	        }
	        return new Dom7(arr);
	    };
	    Dom7.prototype = {
	        // Classes and attriutes
	        addClass: function (className) {
	            if (typeof className === 'undefined') {
	                return this;
	            }
	            var classes = className.split(' ');
	            for (var i = 0; i < classes.length; i++) {
	                for (var j = 0; j < this.length; j++) {
	                    this[j].classList.add(classes[i]);
	                }
	            }
	            return this;
	        },
	        removeClass: function (className) {
	            var classes = className.split(' ');
	            for (var i = 0; i < classes.length; i++) {
	                for (var j = 0; j < this.length; j++) {
	                    this[j].classList.remove(classes[i]);
	                }
	            }
	            return this;
	        },
	        hasClass: function (className) {
	            if (!this[0])
	                return false;
	            else
	                return this[0].classList.contains(className);
	        },
	        toggleClass: function (className) {
	            var classes = className.split(' ');
	            for (var i = 0; i < classes.length; i++) {
	                for (var j = 0; j < this.length; j++) {
	                    this[j].classList.toggle(classes[i]);
	                }
	            }
	            return this;
	        },
	        attr: function (attrs, value) {
	            if (arguments.length === 1 && typeof attrs === 'string') {
	                // Get attr
	                if (this[0])
	                    return this[0].getAttribute(attrs);
	                else
	                    return undefined;
	            }
	            else {
	                // Set attrs
	                for (var i = 0; i < this.length; i++) {
	                    if (arguments.length === 2) {
	                        // String
	                        this[i].setAttribute(attrs, value);
	                    }
	                    else {
	                        // Object
	                        for (var attrName in attrs) {
	                            this[i][attrName] = attrs[attrName];
	                            this[i].setAttribute(attrName, attrs[attrName]);
	                        }
	                    }
	                }
	                return this;
	            }
	        },
	        removeAttr: function (attr) {
	            for (var i = 0; i < this.length; i++) {
	                this[i].removeAttribute(attr);
	            }
	            return this;
	        },
	        data: function (key, value) {
	            if (typeof value === 'undefined') {
	                // Get value
	                if (this[0]) {
	                    var dataKey = this[0].getAttribute('data-' + key);
	                    if (dataKey)
	                        return dataKey;
	                    else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage))
	                        return this[0].dom7ElementDataStorage[key];
	                    else
	                        return undefined;
	                }
	                else
	                    return undefined;
	            }
	            else {
	                // Set value
	                for (var i = 0; i < this.length; i++) {
	                    var el = this[i];
	                    if (!el.dom7ElementDataStorage)
	                        el.dom7ElementDataStorage = {};
	                    el.dom7ElementDataStorage[key] = value;
	                }
	                return this;
	            }
	        },
	        // Transforms
	        transform: function (transform) {
	            for (var i = 0; i < this.length; i++) {
	                var elStyle = this[i].style;
	                elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
	            }
	            return this;
	        },
	        transition: function (duration) {
	            if (typeof duration !== 'string') {
	                duration = duration + 'ms';
	            }
	            for (var i = 0; i < this.length; i++) {
	                var elStyle = this[i].style;
	                elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
	            }
	            return this;
	        },
	        //Events
	        on: function (eventName, targetSelector, listener, capture) {
	            function handleLiveEvent(e) {
	                var target = e.target;
	                if ($(target).is(targetSelector))
	                    listener.call(target, e);
	                else {
	                    var parents = $(target).parents();
	                    for (var k = 0; k < parents.length; k++) {
	                        if ($(parents[k]).is(targetSelector))
	                            listener.call(parents[k], e);
	                    }
	                }
	            }
	            var events = eventName.split(' ');
	            var i, j;
	            for (i = 0; i < this.length; i++) {
	                if (typeof targetSelector === 'function' || targetSelector === false) {
	                    // Usual events
	                    if (typeof targetSelector === 'function') {
	                        listener = arguments[1];
	                        capture = arguments[2] || false;
	                    }
	                    for (j = 0; j < events.length; j++) {
	                        this[i].addEventListener(events[j], listener, capture);
	                    }
	                }
	                else {
	                    //Live events
	                    for (j = 0; j < events.length; j++) {
	                        if (!this[i].dom7LiveListeners)
	                            this[i].dom7LiveListeners = [];
	                        this[i].dom7LiveListeners.push({ listener: listener, liveListener: handleLiveEvent });
	                        this[i].addEventListener(events[j], handleLiveEvent, capture);
	                    }
	                }
	            }
	            return this;
	        },
	        off: function (eventName, targetSelector, listener, capture) {
	            var events = eventName.split(' ');
	            for (var i = 0; i < events.length; i++) {
	                for (var j = 0; j < this.length; j++) {
	                    if (typeof targetSelector === 'function' || targetSelector === false) {
	                        // Usual events
	                        if (typeof targetSelector === 'function') {
	                            listener = arguments[1];
	                            capture = arguments[2] || false;
	                        }
	                        this[j].removeEventListener(events[i], listener, capture);
	                    }
	                    else {
	                        // Live event
	                        if (this[j].dom7LiveListeners) {
	                            for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
	                                if (this[j].dom7LiveListeners[k].listener === listener) {
	                                    this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	            return this;
	        },
	        once: function (eventName, targetSelector, listener, capture) {
	            var dom = this;
	            if (typeof targetSelector === 'function') {
	                targetSelector = false;
	                listener = arguments[1];
	                capture = arguments[2];
	            }
	            function proxy(e) {
	                listener(e);
	                dom.off(eventName, targetSelector, proxy, capture);
	            }
	            dom.on(eventName, targetSelector, proxy, capture);
	        },
	        trigger: function (eventName, eventData) {
	            for (var i = 0; i < this.length; i++) {
	                var evt;
	                try {
	                    evt = new window.CustomEvent(eventName, { detail: eventData, bubbles: true, cancelable: true });
	                }
	                catch (e) {
	                    evt = document.createEvent('Event');
	                    evt.initEvent(eventName, true, true);
	                    evt.detail = eventData;
	                }
	                this[i].dispatchEvent(evt);
	            }
	            return this;
	        },
	        transitionEnd: function (callback) {
	            var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'], i, j, dom = this;
	            function fireCallBack(e) {
	                /*jshint validthis:true */
	                if (e.target !== this)
	                    return;
	                callback.call(this, e);
	                for (i = 0; i < events.length; i++) {
	                    dom.off(events[i], fireCallBack);
	                }
	            }
	            if (callback) {
	                for (i = 0; i < events.length; i++) {
	                    dom.on(events[i], fireCallBack);
	                }
	            }
	            return this;
	        },
	        // Sizing/Styles
	        width: function () {
	            if (this[0] === window) {
	                return window.innerWidth;
	            }
	            else {
	                if (this.length > 0) {
	                    return parseFloat(this.css('width'));
	                }
	                else {
	                    return null;
	                }
	            }
	        },
	        outerWidth: function (includeMargins) {
	            if (this.length > 0) {
	                if (includeMargins)
	                    return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
	                else
	                    return this[0].offsetWidth;
	            }
	            else
	                return null;
	        },
	        height: function () {
	            if (this[0] === window) {
	                return window.innerHeight;
	            }
	            else {
	                if (this.length > 0) {
	                    return parseFloat(this.css('height'));
	                }
	                else {
	                    return null;
	                }
	            }
	        },
	        outerHeight: function (includeMargins) {
	            if (this.length > 0) {
	                if (includeMargins)
	                    return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
	                else
	                    return this[0].offsetHeight;
	            }
	            else
	                return null;
	        },
	        offset: function () {
	            if (this.length > 0) {
	                var el = this[0];
	                var box = el.getBoundingClientRect();
	                var body = document.body;
	                var clientTop = el.clientTop || body.clientTop || 0;
	                var clientLeft = el.clientLeft || body.clientLeft || 0;
	                var scrollTop = window.pageYOffset || el.scrollTop;
	                var scrollLeft = window.pageXOffset || el.scrollLeft;
	                return {
	                    top: box.top + scrollTop - clientTop,
	                    left: box.left + scrollLeft - clientLeft
	                };
	            }
	            else {
	                return null;
	            }
	        },
	        css: function (props, value) {
	            var i;
	            if (arguments.length === 1) {
	                if (typeof props === 'string') {
	                    if (this[0])
	                        return window.getComputedStyle(this[0], null).getPropertyValue(props);
	                }
	                else {
	                    for (i = 0; i < this.length; i++) {
	                        for (var prop in props) {
	                            this[i].style[prop] = props[prop];
	                        }
	                    }
	                    return this;
	                }
	            }
	            if (arguments.length === 2 && typeof props === 'string') {
	                for (i = 0; i < this.length; i++) {
	                    this[i].style[props] = value;
	                }
	                return this;
	            }
	            return this;
	        },
	        //Dom manipulation
	        each: function (callback) {
	            for (var i = 0; i < this.length; i++) {
	                callback.call(this[i], i, this[i]);
	            }
	            return this;
	        },
	        html: function (html) {
	            if (typeof html === 'undefined') {
	                return this[0] ? this[0].innerHTML : undefined;
	            }
	            else {
	                for (var i = 0; i < this.length; i++) {
	                    this[i].innerHTML = html;
	                }
	                return this;
	            }
	        },
	        is: function (selector) {
	            if (!this[0])
	                return false;
	            var compareWith, i;
	            if (typeof selector === 'string') {
	                var el = this[0];
	                if (el === document)
	                    return selector === document;
	                if (el === window)
	                    return selector === window;
	                if (el.matches)
	                    return el.matches(selector);
	                else if (el.webkitMatchesSelector)
	                    return el.webkitMatchesSelector(selector);
	                else if (el.mozMatchesSelector)
	                    return el.mozMatchesSelector(selector);
	                else if (el.msMatchesSelector)
	                    return el.msMatchesSelector(selector);
	                else {
	                    compareWith = $(selector);
	                    for (i = 0; i < compareWith.length; i++) {
	                        if (compareWith[i] === this[0])
	                            return true;
	                    }
	                    return false;
	                }
	            }
	            else if (selector === document)
	                return this[0] === document;
	            else if (selector === window)
	                return this[0] === window;
	            else {
	                if (selector.nodeType || selector instanceof Dom7) {
	                    compareWith = selector.nodeType ? [selector] : selector;
	                    for (i = 0; i < compareWith.length; i++) {
	                        if (compareWith[i] === this[0])
	                            return true;
	                    }
	                    return false;
	                }
	                return false;
	            }
	        },
	        index: function () {
	            if (this[0]) {
	                var child = this[0];
	                var i = 0;
	                while ((child = child.previousSibling) !== null) {
	                    if (child.nodeType === 1)
	                        i++;
	                }
	                return i;
	            }
	            else
	                return undefined;
	        },
	        eq: function (index) {
	            if (typeof index === 'undefined')
	                return this;
	            var length = this.length;
	            var returnIndex;
	            if (index > length - 1) {
	                return new Dom7([]);
	            }
	            if (index < 0) {
	                returnIndex = length + index;
	                if (returnIndex < 0)
	                    return new Dom7([]);
	                else
	                    return new Dom7([this[returnIndex]]);
	            }
	            return new Dom7([this[index]]);
	        },
	        append: function (newChild) {
	            var i, j;
	            for (i = 0; i < this.length; i++) {
	                if (typeof newChild === 'string') {
	                    var tempDiv = document.createElement('div');
	                    tempDiv.innerHTML = newChild;
	                    while (tempDiv.firstChild) {
	                        this[i].appendChild(tempDiv.firstChild);
	                    }
	                }
	                else if (newChild instanceof Dom7) {
	                    for (j = 0; j < newChild.length; j++) {
	                        this[i].appendChild(newChild[j]);
	                    }
	                }
	                else {
	                    this[i].appendChild(newChild);
	                }
	            }
	            return this;
	        },
	        prepend: function (newChild) {
	            var i, j;
	            for (i = 0; i < this.length; i++) {
	                if (typeof newChild === 'string') {
	                    var tempDiv = document.createElement('div');
	                    tempDiv.innerHTML = newChild;
	                    for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
	                        this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
	                    }
	                }
	                else if (newChild instanceof Dom7) {
	                    for (j = 0; j < newChild.length; j++) {
	                        this[i].insertBefore(newChild[j], this[i].childNodes[0]);
	                    }
	                }
	                else {
	                    this[i].insertBefore(newChild, this[i].childNodes[0]);
	                }
	            }
	            return this;
	        },
	        insertBefore: function (selector) {
	            var before = $(selector);
	            for (var i = 0; i < this.length; i++) {
	                if (before.length === 1) {
	                    before[0].parentNode.insertBefore(this[i], before[0]);
	                }
	                else if (before.length > 1) {
	                    for (var j = 0; j < before.length; j++) {
	                        before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
	                    }
	                }
	            }
	        },
	        insertAfter: function (selector) {
	            var after = $(selector);
	            for (var i = 0; i < this.length; i++) {
	                if (after.length === 1) {
	                    after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
	                }
	                else if (after.length > 1) {
	                    for (var j = 0; j < after.length; j++) {
	                        after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
	                    }
	                }
	            }
	        },
	        next: function (selector) {
	            if (this.length > 0) {
	                if (selector) {
	                    if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector))
	                        return new Dom7([this[0].nextElementSibling]);
	                    else
	                        return new Dom7([]);
	                }
	                else {
	                    if (this[0].nextElementSibling)
	                        return new Dom7([this[0].nextElementSibling]);
	                    else
	                        return new Dom7([]);
	                }
	            }
	            else
	                return new Dom7([]);
	        },
	        nextAll: function (selector) {
	            var nextEls = [];
	            var el = this[0];
	            if (!el)
	                return new Dom7([]);
	            while (el.nextElementSibling) {
	                var next = el.nextElementSibling;
	                if (selector) {
	                    if ($(next).is(selector))
	                        nextEls.push(next);
	                }
	                else
	                    nextEls.push(next);
	                el = next;
	            }
	            return new Dom7(nextEls);
	        },
	        prev: function (selector) {
	            if (this.length > 0) {
	                if (selector) {
	                    if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector))
	                        return new Dom7([this[0].previousElementSibling]);
	                    else
	                        return new Dom7([]);
	                }
	                else {
	                    if (this[0].previousElementSibling)
	                        return new Dom7([this[0].previousElementSibling]);
	                    else
	                        return new Dom7([]);
	                }
	            }
	            else
	                return new Dom7([]);
	        },
	        prevAll: function (selector) {
	            var prevEls = [];
	            var el = this[0];
	            if (!el)
	                return new Dom7([]);
	            while (el.previousElementSibling) {
	                var prev = el.previousElementSibling;
	                if (selector) {
	                    if ($(prev).is(selector))
	                        prevEls.push(prev);
	                }
	                else
	                    prevEls.push(prev);
	                el = prev;
	            }
	            return new Dom7(prevEls);
	        },
	        parent: function (selector) {
	            var parents = [];
	            for (var i = 0; i < this.length; i++) {
	                if (selector) {
	                    if ($(this[i].parentNode).is(selector))
	                        parents.push(this[i].parentNode);
	                }
	                else {
	                    parents.push(this[i].parentNode);
	                }
	            }
	            return $($.unique(parents));
	        },
	        parents: function (selector) {
	            var parents = [];
	            for (var i = 0; i < this.length; i++) {
	                var parent = this[i].parentNode;
	                while (parent) {
	                    if (selector) {
	                        if ($(parent).is(selector))
	                            parents.push(parent);
	                    }
	                    else {
	                        parents.push(parent);
	                    }
	                    parent = parent.parentNode;
	                }
	            }
	            return $($.unique(parents));
	        },
	        find: function (selector) {
	            var foundElements = [];
	            for (var i = 0; i < this.length; i++) {
	                var found = this[i].querySelectorAll(selector);
	                for (var j = 0; j < found.length; j++) {
	                    foundElements.push(found[j]);
	                }
	            }
	            return new Dom7(foundElements);
	        },
	        children: function (selector) {
	            var children = [];
	            for (var i = 0; i < this.length; i++) {
	                var childNodes = this[i].childNodes;
	                for (var j = 0; j < childNodes.length; j++) {
	                    if (!selector) {
	                        if (childNodes[j].nodeType === 1)
	                            children.push(childNodes[j]);
	                    }
	                    else {
	                        if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector))
	                            children.push(childNodes[j]);
	                    }
	                }
	            }
	            return new Dom7($.unique(children));
	        },
	        remove: function () {
	            for (var i = 0; i < this.length; i++) {
	                if (this[i].parentNode)
	                    this[i].parentNode.removeChild(this[i]);
	            }
	            return this;
	        },
	        add: function () {
	            var dom = this;
	            var i, j;
	            for (i = 0; i < arguments.length; i++) {
	                var toAdd = $(arguments[i]);
	                for (j = 0; j < toAdd.length; j++) {
	                    dom[dom.length] = toAdd[j];
	                    dom.length++;
	                }
	            }
	            return dom;
	        }
	    };
	    $.fn = Dom7.prototype;
	    $.unique = function (arr) {
	        var unique = [];
	        for (var i = 0; i < arr.length; i++) {
	            if (unique.indexOf(arr[i]) === -1)
	                unique.push(arr[i]);
	        }
	        return unique;
	    };
	    return $;
	})();
	/*===========================
	 Get Dom libraries
	 ===========================*/
	var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
	for (var i = 0; i < swiperDomPlugins.length; i++) {
	    if (window[swiperDomPlugins[i]]) {
	        addLibraryPlugin(window[swiperDomPlugins[i]]);
	    }
	}
	// Required DOM Plugins
	var domLib;
	if (typeof Dom7 === 'undefined') {
	    domLib = window.Dom7 || window.Zepto || window.jQuery;
	}
	else {
	    domLib = Dom7;
	}
	/*===========================
	Add .swiper plugin from Dom libraries
	===========================*/
	function addLibraryPlugin(lib) {
	    lib.fn.swiper = function (params) {
	        var firstInstance;
	        lib(this).each(function () {
	            var s = new Swiper(this, params);
	            if (!firstInstance)
	                firstInstance = s;
	        });
	        return firstInstance;
	    };
	}
	if (domLib) {
	    if (!('transitionEnd' in domLib.fn)) {
	        domLib.fn.transitionEnd = function (callback) {
	            var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'], i, j, dom = this;
	            function fireCallBack(e) {
	                /*jshint validthis:true */
	                if (e.target !== this)
	                    return;
	                callback.call(this, e);
	                for (i = 0; i < events.length; i++) {
	                    dom.off(events[i], fireCallBack);
	                }
	            }
	            if (callback) {
	                for (i = 0; i < events.length; i++) {
	                    dom.on(events[i], fireCallBack);
	                }
	            }
	            return this;
	        };
	    }
	    if (!('transform' in domLib.fn)) {
	        domLib.fn.transform = function (transform) {
	            for (var i = 0; i < this.length; i++) {
	                var elStyle = this[i].style;
	                elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
	            }
	            return this;
	        };
	    }
	    if (!('transition' in domLib.fn)) {
	        domLib.fn.transition = function (duration) {
	            if (typeof duration !== 'string') {
	                duration = duration + 'ms';
	            }
	            for (var i = 0; i < this.length; i++) {
	                var elStyle = this[i].style;
	                elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
	            }
	            return this;
	        };
	    }
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(18);
	var ion_1 = __webpack_require__(23);
	var id_1 = __webpack_require__(60);
	var config_1 = __webpack_require__(8);
	var platform_1 = __webpack_require__(9);
	var nav_controller_1 = __webpack_require__(21);
	var view_controller_1 = __webpack_require__(24);
	var decorators_1 = __webpack_require__(41);
	var icon_1 = __webpack_require__(19);
	var dom_1 = __webpack_require__(11);
	/**
	 * @name Tabs
	 * @property {any} [tabbar-placement] - set position of the tabbar, top or bottom
	 * @property {any} [tabbar-icons] - set the position of the tabbar's icons: top, bottom, left, right, hide
	 * @property {any} [tabbar-style] - sets tabbar's style (primary, secondary, etc)
	 * @property {any} [preload-tabs] - sets whether to preload all the tabs, true or false
	 * @usage
	* ```html
	 * <ion-tabs>
	 *   <ion-tab [root]="tabRoot"></ion-tab>
	 * </ion-tabs>
	 * ```
	 * @description
	 * _For basic Tabs usage, see the [Tabs section](../../../../components/#tabs)
	 * of the Component docs._
	 *
	 * The Tabs component is a container with a TabBar and any number of
	 * individual Tab components. On iOS, the TabBar is placed on the bottom of
	 * the screen, while on Android it is at the top.
	 *
	 * @see {@link /docs/v2/components#tabs Tabs Component Docs}
	 * @see {@link ../Tab Tab API Docs}
	 */
	var Tabs = (function (_super) {
	    __extends(Tabs, _super);
	    /**
	     * Hi, I'm "Tabs". I'm really just another Page, with a few special features.
	     * "Tabs" can be a sibling to other pages that can be navigated to, which those
	     * sibling pages may or may not have their own tab bars (doesn't matter). The fact
	     * that "Tabs" can happen to have children "Tab" classes, and each "Tab" can have
	     * children pages with their own "ViewController" instance, as nothing to do with the
	     * point that "Tabs" is itself is just a page with its own instance of ViewController.
	     */
	    function Tabs(config, elementRef, viewCtrl, navCtrl, platform) {
	        var _this = this;
	        _super.call(this, elementRef, config);
	        this.platform = platform;
	        this.parent = navCtrl;
	        this.subPages = config.get('tabSubPages');
	        this._tabs = [];
	        this._id = ++tabIds;
	        this._ids = -1;
	        this._onReady = null;
	        // Tabs may also be an actual ViewController which was navigated to
	        // if Tabs is static and not navigated to within a NavController
	        // then skip this and don't treat it as it's own ViewController
	        if (viewCtrl) {
	            viewCtrl.setContent(this);
	            viewCtrl.setContentRef(elementRef);
	            viewCtrl.onReady = function (done) {
	                _this._onReady = done;
	            };
	        }
	    }
	    /**
	     * @private
	     */
	    Tabs.prototype.ngOnInit = function () {
	        var _this = this;
	        _super.prototype.ngOnInit.call(this);
	        this.preloadTabs = (this.preloadTabs !== "false" && this.preloadTabs !== false);
	        if (this._highlight) {
	            this.platform.onResize(function () {
	                _this._highlight.select(_this.getSelected());
	            });
	        }
	    };
	    /**
	     * @private
	     */
	    Tabs.prototype.add = function (tab) {
	        tab.id = this._id + '-' + (++this._ids);
	        this._tabs.push(tab);
	        return (this._tabs.length === 1);
	    };
	    /**
	     * @param {Number} index Index of the tab you want to select
	     */
	    Tabs.prototype.select = function (tabOrIndex) {
	        var _this = this;
	        var selectedTab = (typeof tabOrIndex === 'number' ? this.getByIndex(tabOrIndex) : tabOrIndex);
	        if (!selectedTab) {
	            return Promise.reject();
	        }
	        var deselectedTab = this.getSelected();
	        if (selectedTab === deselectedTab) {
	            // no change
	            return this._touchActive(selectedTab);
	        }
	        console.time('Tabs#select ' + selectedTab.id);
	        var opts = {
	            animate: false
	        };
	        var deselectedPage;
	        if (deselectedTab) {
	            deselectedPage = deselectedTab.getActive();
	            deselectedPage && deselectedPage.willLeave();
	        }
	        var selectedPage = selectedTab.getActive();
	        selectedPage && selectedPage.willEnter();
	        selectedTab.load(opts, function () {
	            _this._tabs.forEach(function (tab) {
	                tab.setSelected(tab === selectedTab);
	            });
	            _this._highlight && _this._highlight.select(selectedTab);
	            selectedPage && selectedPage.didEnter();
	            deselectedPage && deselectedPage.didLeave();
	            if (_this._onReady) {
	                _this._onReady();
	                _this._onReady = null;
	            }
	            console.time('Tabs#select ' + selectedTab.id);
	        });
	    };
	    /**
	     * @param {Number} index Index of the tab you want to get
	     * @returns {Any} Tab Returs the tab who's index matches the one passed
	     */
	    Tabs.prototype.getByIndex = function (index) {
	        if (index < this._tabs.length && index > -1) {
	            return this._tabs[index];
	        }
	        return null;
	    };
	    /**
	     * @return {Any} Tab Returns the currently selected tab
	     */
	    Tabs.prototype.getSelected = function () {
	        for (var i = 0; i < this._tabs.length; i++) {
	            if (this._tabs[i].isSelected) {
	                return this._tabs[i];
	            }
	        }
	        return null;
	    };
	    /**
	     * @private
	     */
	    Tabs.prototype.getIndex = function (tab) {
	        return this._tabs.indexOf(tab);
	    };
	    /**
	     * @private
	     * "Touch" the active tab, going back to the root view of the tab
	     * or optionally letting the tab handle the event
	     */
	    Tabs.prototype._touchActive = function (tab) {
	        var active = tab.getActive();
	        if (!active) {
	            return Promise.resolve();
	        }
	        var instance = active.instance;
	        // If they have a custom tab selected handler, call it
	        if (instance.tabSelected) {
	            return instance.tabSelected();
	        }
	        // If we're a few pages deep, pop to root
	        if (tab.length() > 1) {
	            // Pop to the root view
	            return tab.popToRoot();
	        }
	        // Otherwise, if the page we're on is not our real root, reset it to our
	        // default root type
	        if (tab.root != active.componentType) {
	            return tab.setRoot(tab.root);
	        }
	        // And failing all of that, we do something safe and secure
	        return Promise.resolve();
	    };
	    Object.defineProperty(Tabs.prototype, "rootNav", {
	        /**
	         * Returns the root NavController. Returns `null` if Tabs is not
	         * within a NavController.
	         * @returns {NavController}
	         */
	        get: function () {
	            var nav = this.parent;
	            while (nav.parent) {
	                nav = nav.parent;
	            }
	            return nav;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Tabs = __decorate([
	        decorators_1.ConfigComponent({
	            selector: 'ion-tabs',
	            defaultInputs: {
	                'tabbarPlacement': 'bottom',
	                'tabbarIcons': 'top',
	                'preloadTabs': false
	            },
	            template: '<ion-navbar-section>' +
	                '<template navbar-anchor></template>' +
	                '</ion-navbar-section>' +
	                '<ion-tabbar-section>' +
	                '<tabbar role="tablist">' +
	                '<a *ng-for="#t of _tabs" [tab]="t" class="tab-button" role="tab">' +
	                '<icon [name]="t.tabIcon" [is-active]="t.isSelected" class="tab-button-icon"></icon>' +
	                '<span class="tab-button-text">{{t.tabTitle}}</span>' +
	                '</a>' +
	                '<tab-highlight></tab-highlight>' +
	                '</tabbar>' +
	                '</ion-tabbar-section>' +
	                '<ion-content-section>' +
	                '<ng-content></ng-content>' +
	                '</ion-content-section>',
	            directives: [
	                icon_1.Icon,
	                common_1.NgFor,
	                common_1.NgIf,
	                id_1.Attr,
	                core_1.forwardRef(function () { return TabButton; }),
	                core_1.forwardRef(function () { return TabHighlight; }),
	                core_1.forwardRef(function () { return TabNavBarAnchor; })
	            ]
	        }),
	        __param(2, core_1.Optional()),
	        __param(3, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof view_controller_1.ViewController !== 'undefined' && view_controller_1.ViewController) === 'function' && _c) || Object, (typeof (_d = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _d) || Object, (typeof (_e = typeof platform_1.Platform !== 'undefined' && platform_1.Platform) === 'function' && _e) || Object])
	    ], Tabs);
	    return Tabs;
	    var _a, _b, _c, _d, _e;
	})(ion_1.Ion);
	exports.Tabs = Tabs;
	var tabIds = -1;
	/**
	 * @private
	 */
	var TabButton = (function (_super) {
	    __extends(TabButton, _super);
	    function TabButton(tabs, config, elementRef) {
	        _super.call(this, elementRef, config);
	        this.tabs = tabs;
	        this.disHover = (config.get('hoverCSS') === false);
	    }
	    TabButton.prototype.ngOnInit = function () {
	        this.tab.btn = this;
	        this.hasTitle = !!this.tab.tabTitle;
	        this.hasIcon = !!this.tab.tabIcon;
	        this.hasTitleOnly = (this.hasTitle && !this.hasIcon);
	        this.hasIconOnly = (this.hasIcon && !this.hasTitle);
	    };
	    TabButton.prototype.onClick = function () {
	        this.tabs.select(this.tab);
	    };
	    TabButton = __decorate([
	        core_1.Directive({
	            selector: '.tab-button',
	            inputs: ['tab'],
	            host: {
	                '[attr.id]': 'tab._btnId',
	                '[attr.aria-controls]': 'tab._panelId',
	                '[attr.aria-selected]': 'tab.isSelected',
	                '[class.has-title]': 'hasTitle',
	                '[class.has-icon]': 'hasIcon',
	                '[class.has-title-only]': 'hasTitleOnly',
	                '[class.icon-only]': 'hasIconOnly',
	                '[class.disable-hover]': 'disHover',
	                '(click)': 'onClick()',
	            }
	        }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [Tabs, (typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object])
	    ], TabButton);
	    return TabButton;
	    var _a, _b;
	})(ion_1.Ion);
	/**
	 * @private
	 */
	var TabHighlight = (function () {
	    function TabHighlight(tabs, config, elementRef) {
	        if (config.get('tabbarHighlight')) {
	            tabs._highlight = this;
	            this.elementRef = elementRef;
	        }
	    }
	    TabHighlight.prototype.select = function (tab) {
	        var _this = this;
	        dom_1.rafFrames(3, function () {
	            var d = tab.btn.getDimensions();
	            var ele = _this.elementRef.nativeElement;
	            ele.style.transform = 'translate3d(' + d.left + 'px,0,0) scaleX(' + d.width + ')';
	            if (!_this.init) {
	                _this.init = true;
	                dom_1.rafFrames(6, function () {
	                    ele.classList.add('animate');
	                });
	            }
	        });
	    };
	    TabHighlight = __decorate([
	        core_1.Directive({
	            selector: 'tab-highlight'
	        }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [Tabs, (typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object])
	    ], TabHighlight);
	    return TabHighlight;
	    var _a, _b;
	})();
	/**
	 * @private
	 */
	var TabNavBarAnchor = (function () {
	    function TabNavBarAnchor(tabs, viewContainerRef) {
	        tabs.navbarContainerRef = viewContainerRef;
	    }
	    TabNavBarAnchor = __decorate([
	        core_1.Directive({ selector: 'template[navbar-anchor]' }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [Tabs, (typeof (_a = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _a) || Object])
	    ], TabNavBarAnchor);
	    return TabNavBarAnchor;
	    var _a;
	})();

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var app_1 = __webpack_require__(6);
	/**
	 * IdRef is an easy way to identify unique components in an app and access them
	 * no matter where in the UI heirarchy you are. For example, this makes toggling
	 * a global side menu feasible from any place in the application.
	 *
	 * See the [Menu section](http://ionicframework.com/docs/v2/components/#menus) of
	 * the Component docs for an example of how Menus rely on ID's.
	 *
	 * To give any component an ID, simply set its `id` property:
	 * ```html
	 * <ion-checkbox id="myCheckbox"></ion-checkbox>
	 * ```
	 *
	 * To get a reference to the registered component, inject the [IonicApp](../app/IonicApp/)
	 * service:
	 * ```ts
	 * constructor(app: IonicApp) {
	 *   var checkbox = app.getComponent("myCheckbox");
	 *   if (checkbox.checked) console.log('checkbox is checked');
	 * }
	 * ```
	 *
	 * *NOTE:* It is not recommended to use ID's across Pages, as there is often no
	 * guarantee that the registered component has not been destroyed if its Page
	 * has been navigated away from.
	 */
	var IdRef = (function () {
	    function IdRef(app, elementRef, appViewManager) {
	        this.app = app;
	        this.elementRef = elementRef;
	        this.appViewManager = appViewManager;
	        // Grab the component this directive is attached to
	        this.component = appViewManager.getComponent(elementRef);
	    }
	    /**
	     * @private
	     */
	    IdRef.prototype.ngOnInit = function () {
	        this.app.register(this.id, this.component);
	    };
	    /**
	     * @private
	     */
	    IdRef.prototype.ngOnDestroy = function () {
	        this.app.unregister(this.id);
	    };
	    IdRef = __decorate([
	        core_1.Directive({
	            selector: '[id]',
	            inputs: ['id']
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof core_1.AppViewManager !== 'undefined' && core_1.AppViewManager) === 'function' && _c) || Object])
	    ], IdRef);
	    return IdRef;
	    var _a, _b, _c;
	})();
	exports.IdRef = IdRef;
	/**
	 * @name Attr
	 * @description
	 * Attr allows you to dynamically add or remove an attribute based on the value of an expression or variable.
	 * @usage
	 * ```html
	 * // toggle the no-lines attributes based on whether isAndroid is true or false
	 * <ion-list [attr.no-lines]="isAndroid ? '' : null">
	 * ```
	 */
	var Attr = (function () {
	    function Attr(renderer, elementRef) {
	        this.renderer = renderer;
	        this.elementRef = elementRef;
	    }
	    /**
	     * @private
	     */
	    Attr.prototype.ngOnInit = function () {
	        this.renderer.setElementAttribute(this.elementRef, this.attr, '');
	    };
	    Attr = __decorate([
	        core_1.Directive({
	            selector: '[attr]',
	            inputs: ['attr']
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object])
	    ], Attr);
	    return Attr;
	    var _a, _b;
	})();
	exports.Attr = Attr;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var app_1 = __webpack_require__(6);
	var config_1 = __webpack_require__(8);
	var keyboard_1 = __webpack_require__(16);
	var nav_controller_1 = __webpack_require__(21);
	var tabs_1 = __webpack_require__(59);
	/**
	 * @name Tab
	 * @usage
	 * ```html
	 * <ion-tabs>
	 * 	 <ion-tab tab-title="Home" tab-icon="home" [root]="tabOneRoot"></ion-tab>
	 * 	 <ion-tab tab-title="Login" tab-icon="star" [root]="tabTwoRoot"></ion-tab>
	 * </ion-tabs>
	 * ```
	 *
	 * @description
	 * _For basic Tabs usage, see the [Tabs section](../../../../components/#tabs)
	 * of the Component docs._
	 *
	 * Tab components are basic navigation controllers used with Tabs.  Much like
	 * Nav, they are a subclass of NavController and can be used to navigate
	 * to pages in and manipulate the navigation stack of a particular tab.
	 *
	 * For more information on using navigation controllers like Tab or [Nav](../../nav/Nav/),
	 * take a look at the [NavController API reference](../NavController/).
	 *
	 * See the [Tabs API reference](../Tabs/) for more details on configuring Tabs
	 * and the TabBar.

	 *
	 * @property {any} [root] - set the root page for this tab
	 * @property {any} [tab-title] - set the title of this tab
	 * @property {any} [tab-icon] - set the icon for this tab

	 */
	var Tab = (function (_super) {
	    __extends(Tab, _super);
	    function Tab(parentTabs, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd) {
	        // A Tab is a NavController for its child pages
	        _super.call(this, parentTabs, app, config, keyboard, elementRef, 'contents', compiler, viewManager, zone, renderer, cd);
	        this._isInitial = parentTabs.add(this);
	        this._panelId = 'tabpanel-' + this.id;
	        this._btnId = 'tab-' + this.id;
	    }
	    /**
	     * @private
	     */
	    Tab.prototype.ngOnInit = function () {
	        var _this = this;
	        if (this._isInitial) {
	            this.parent.select(this);
	        }
	        else if (this.parent.preloadTabs) {
	            this._loadTimer = setTimeout(function () {
	                if (!_this._loaded) {
	                    _this.load({
	                        animate: false,
	                        preload: true,
	                        postLoad: function (viewCtrl) {
	                            var navbar = viewCtrl.getNavbar();
	                            navbar && navbar.setHidden(true);
	                        }
	                    }, function () { });
	                }
	            }, 1000 * this.index);
	        }
	    };
	    /**
	     * @private
	     */
	    Tab.prototype.load = function (opts, done) {
	        if (!this._loaded && this.root) {
	            this.push(this.root, null, opts, done);
	            this._loaded = true;
	        }
	        else {
	            done();
	        }
	    };
	    /**
	     * @private
	     */
	    Tab.prototype.loadPage = function (viewCtrl, navbarContainerRef, opts, done) {
	        // by default a page's navbar goes into the shared tab's navbar section
	        navbarContainerRef = this.parent.navbarContainerRef;
	        var isTabSubPage = (this.parent.subPages && viewCtrl.index > 0);
	        if (isTabSubPage) {
	            // a subpage, that's not the first index
	            // should not use the shared tabs navbar section, but use it's own
	            navbarContainerRef = null;
	        }
	        _super.prototype.loadPage.call(this, viewCtrl, navbarContainerRef, opts, function () {
	            if (viewCtrl.instance) {
	                viewCtrl.instance._tabSubPage = isTabSubPage;
	            }
	            done();
	        });
	    };
	    /**
	     * @private
	     */
	    Tab.prototype.setSelected = function (isSelected) {
	        this.isSelected = isSelected;
	        this.hideNavbars(!isSelected);
	    };
	    /**
	     * @private
	     */
	    Tab.prototype.hideNavbars = function (shouldHideNavbars) {
	        this._views.forEach(function (viewCtrl) {
	            var navbar = viewCtrl.getNavbar();
	            navbar && navbar.setHidden(shouldHideNavbars);
	        });
	    };
	    Object.defineProperty(Tab.prototype, "index", {
	        /**
	         *
	         * ```ts
	         * export class MyClass{
	         *  constructor(tab: Tab){
	         *    this.tab = tab;
	         *    console.log(this.tab.index);
	         *  }
	         * }
	         * ```
	         *
	         * @returns {Number} Returns the index of this page within its NavController.
	         *
	         */
	        get: function () {
	            return this.parent.getIndex(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    Tab.prototype.ngOnDestroy = function () {
	        clearTimeout(this._loadTimer);
	    };
	    Tab = __decorate([
	        core_1.Component({
	            selector: 'ion-tab',
	            inputs: [
	                'root',
	                'tabTitle',
	                'tabIcon'
	            ],
	            host: {
	                '[class.show-tab]': 'isSelected',
	                '[attr.id]': '_panelId',
	                '[attr.aria-labelledby]': '_btnId',
	                'role': 'tabpanel'
	            },
	            template: '<template #contents></template>'
	        }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof tabs_1.Tabs !== 'undefined' && tabs_1.Tabs) === 'function' && _a) || Object, (typeof (_b = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _b) || Object, (typeof (_c = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _c) || Object, (typeof (_d = typeof keyboard_1.Keyboard !== 'undefined' && keyboard_1.Keyboard) === 'function' && _d) || Object, (typeof (_e = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _e) || Object, (typeof (_f = typeof core_1.Compiler !== 'undefined' && core_1.Compiler) === 'function' && _f) || Object, (typeof (_g = typeof core_1.AppViewManager !== 'undefined' && core_1.AppViewManager) === 'function' && _g) || Object, (typeof (_h = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _h) || Object, (typeof (_j = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _j) || Object, (typeof (_k = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _k) || Object])
	    ], Tab);
	    return Tab;
	    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
	})(nav_controller_1.NavController);
	exports.Tab = Tab;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var ion_1 = __webpack_require__(23);
	var config_1 = __webpack_require__(8);
	var virtual_1 = __webpack_require__(63);
	var item_sliding_gesture_1 = __webpack_require__(64);
	var util = __webpack_require__(14);
	/**
	 * The List is a widely used interface element in almost any mobile app, and can include
	 * content ranging from basic text all the way to buttons, toggles, icons, and thumbnails.
	 *
	 * Both the list, which contains items, and the list items themselves can be any HTML
	 * element.
	 *
	 * Using the List and Item components make it easy to support various
	 * interaction modes such as swipe to edit, drag to reorder, and removing items.
	 * @demo /docs/v2/demos/list/
	 * @see {@link /docs/v2/components#lists List Component Docs}
	 *
	 *
	 */
	var List = (function (_super) {
	    __extends(List, _super);
	    function List(elementRef, config, zone) {
	        _super.call(this, elementRef, config);
	        this.zone = zone;
	        this.ele = elementRef.nativeElement;
	        this._enableSliding = false;
	    }
	    /**
	     * @private
	     */
	    List.prototype.ngOnInit = function () {
	        _super.prototype.ngOnInit.call(this);
	        if (util.isDefined(this.virtual)) {
	            console.log('Content', this.content);
	            console.log('Virtual?', this.virtual);
	            console.log('Items?', this.items.length, 'of \'em');
	            this._initVirtualScrolling();
	        }
	    };
	    /**
	     * @private
	     */
	    List.prototype.ngOnDestroy = function () {
	        this.ele = null;
	        this.slidingGesture && this.slidingGesture.unlisten();
	    };
	    /**
	     * @private
	     */
	    List.prototype._initVirtualScrolling = function () {
	        if (!this.content) {
	            return;
	        }
	        this._virtualScrollingManager = new virtual_1.ListVirtualScroll(this);
	    };
	    /**
	     * @private
	     */
	    List.prototype.setItemTemplate = function (item) {
	        this.itemTemplate = item;
	    };
	    List.prototype.enableSlidingItems = function (shouldEnable) {
	        var _this = this;
	        if (this._enableSliding !== shouldEnable) {
	            this._enableSliding = shouldEnable;
	            if (shouldEnable) {
	                console.debug('enableSlidingItems');
	                this.zone.runOutsideAngular(function () {
	                    setTimeout(function () {
	                        _this.slidingGesture = new item_sliding_gesture_1.ItemSlidingGesture(_this, _this.ele);
	                    });
	                });
	            }
	            else {
	                this.slidingGesture && this.slidingGesture.unlisten();
	            }
	        }
	    };
	    List.prototype.closeSlidingItems = function () {
	        this.slidingGesture && this.slidingGesture.closeOpened();
	    };
	    List = __decorate([
	        core_1.Directive({
	            selector: 'ion-list',
	            inputs: [
	                'items',
	                'virtual',
	                'content'
	            ]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
	    ], List);
	    return List;
	    var _a, _b, _c;
	})(ion_1.Ion);
	exports.List = List;
	/**
	 * @private
	 */
	var ListHeader = (function () {
	    function ListHeader() {
	    }
	    ListHeader = __decorate([
	        core_1.Directive({
	            selector: 'ion-list-header',
	            inputs: [
	                'id'
	            ],
	            host: {
	                '[attr.id]': 'id'
	            }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ListHeader);
	    return ListHeader;
	})();
	exports.ListHeader = ListHeader;

/***/ },
/* 63 */
/***/ function(module, exports) {

	var ListVirtualScroll = (function () {
	    function ListVirtualScroll(list) {
	        var _this = this;
	        this.list = list;
	        this.content = this.list.content;
	        this.viewportHeight = this.content.height();
	        this.viewContainer = this.list.itemTemplate.viewContainer;
	        this.itemHeight = 60;
	        this.shownItems = {};
	        this.enteringItems = [];
	        this.leavingItems = [];
	        // Compute the initial sizes
	        setTimeout(function () {
	            _this.resize();
	            // Simulate the first event to start layout
	            _this._handleVirtualScroll({
	                target: _this.content.scrollElement
	            });
	        });
	        this.content.addScrollEventListener(function (event) {
	            _this._handleVirtualScroll(event);
	        });
	    }
	    ListVirtualScroll.prototype.resize = function () {
	        this.viewportHeight = this.content.height();
	        this.viewportScrollHeight = this.content.scrollElement.scrollHeight;
	        this.virtualHeight = this.list.items.length * this.itemHeight;
	        this.itemsPerScreen = this.viewportHeight / this.itemHeight;
	        console.log('VIRTUAL: resize(viewportHeight:', this.viewportHeight, 'viewportScrollHeight:', this.viewportScrollHeight, 'virtualHeight:', this.virtualHeight, ', itemsPerScreen:', this.itemsPerScreen, ')');
	    };
	    ListVirtualScroll.prototype._handleVirtualScroll = function (event) {
	        var item;
	        var shownItemRef;
	        var st = event.target.scrollTop;
	        var sh = event.target.scrollHeight;
	        var topIndex = Math.floor(st / this.itemHeight);
	        var bottomIndex = Math.floor((st / this.itemHeight) + this.itemsPerScreen);
	        var items = this.list.items;
	        // Key iterate the shown items map
	        // and compare the index to our index range,
	        // pushing the items to remove to our leaving
	        // list if they're ouside this range.
	        for (var i in this.shownItems) {
	            if (i < topIndex || i > bottomIndex) {
	                this.leavingItems.push(this.shownItems[i]);
	                delete this.shownItems[i];
	            }
	        }
	        var realIndex = 0;
	        // Iterate the set of items that will be rendered, using the
	        // index from the actual items list as the map for the
	        // virtual items we draw
	        for (var i = topIndex, realIndex_1 = 0; i < bottomIndex && i < items.length; i++, realIndex_1++) {
	            item = items[i];
	            console.log('Drawing item', i, item.title);
	            shownItemRef = this.shownItems[i];
	            // Is this a new item?
	            if (!shownItemRef) {
	                var itemView = this.viewContainer.create(this.list.itemTemplate.protoViewRef, realIndex_1);
	                itemView.setLocal('\$implicit', item);
	                itemView.setLocal('\$item', item);
	                shownItemRef = new VirtualItemRef(item, i, realIndex_1, itemView);
	                this.shownItems[i] = shownItemRef;
	                this.enteringItems.push(shownItemRef);
	            }
	        }
	        while (this.leavingItems.length) {
	            var itemRef = this.leavingItems.pop();
	            console.log('Removing item', itemRef.item, itemRef.realIndex);
	            this.viewContainer.remove(itemRef.realIndex);
	        }
	        console.log('VIRTUAL SCROLL: scroll(scrollTop:', st, 'topIndex:', topIndex, 'bottomIndex:', bottomIndex, ')');
	        console.log('Container has', this.list.getNativeElement().children.length, 'children');
	    };
	    ListVirtualScroll.prototype.cellAtIndex = function (index) {
	    };
	    return ListVirtualScroll;
	})();
	exports.ListVirtualScroll = ListVirtualScroll;
	var VirtualItemRef = (function () {
	    function VirtualItemRef(item, index, realIndex, view) {
	        this.item = item;
	        this.index = index;
	        this.realIndex = realIndex;
	        this.view = view;
	    }
	    return VirtualItemRef;
	})();

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var hammer_1 = __webpack_require__(30);
	var drag_gesture_1 = __webpack_require__(28);
	var dom_1 = __webpack_require__(11);
	var ItemSlidingGesture = (function (_super) {
	    __extends(ItemSlidingGesture, _super);
	    function ItemSlidingGesture(list, listEle) {
	        var _this = this;
	        _super.call(this, listEle, {
	            direction: 'x',
	            threshold: DRAG_THRESHOLD
	        });
	        this.data = {};
	        this.openItems = 0;
	        this.list = list;
	        this.listEle = listEle;
	        this.canDrag = true;
	        this.listen();
	        this.tap = function (ev) {
	            if (!isFromOptionButtons(ev.target)) {
	                var didClose = _this.closeOpened();
	                if (didClose) {
	                    preventDefault(ev);
	                }
	            }
	        };
	        this.mouseOut = function (ev) {
	            if (ev.target.tagName === 'ION-ITEM-SLIDING') {
	                _this.onDragEnd(ev);
	            }
	        };
	    }
	    ItemSlidingGesture.prototype.onDragStart = function (ev) {
	        var itemContainerEle = getItemConatiner(ev.target);
	        if (!itemContainerEle)
	            return;
	        this.closeOpened(itemContainerEle);
	        var openAmout = this.getOpenAmount(itemContainerEle);
	        var itemData = this.get(itemContainerEle);
	        this.preventDrag = (openAmout > 0);
	        if (this.preventDrag) {
	            this.closeOpened();
	            return preventDefault(ev);
	        }
	        itemContainerEle.classList.add('active-slide');
	        this.set(itemContainerEle, 'offsetX', openAmout);
	        this.set(itemContainerEle, 'startX', ev.center[this.direction]);
	        this.dragEnded = false;
	    };
	    ItemSlidingGesture.prototype.onDrag = function (ev) {
	        var _this = this;
	        if (this.dragEnded || this.preventDrag || Math.abs(ev.deltaY) > 30) {
	            this.preventDrag = true;
	            return;
	        }
	        var itemContainerEle = getItemConatiner(ev.target);
	        if (!itemContainerEle || !isActive(itemContainerEle))
	            return;
	        var itemData = this.get(itemContainerEle);
	        if (!itemData.optsWidth) {
	            itemData.optsWidth = getOptionsWidth(itemContainerEle);
	            if (!itemData.optsWidth)
	                return;
	        }
	        var x = ev.center[this.direction];
	        var delta = x - itemData.startX;
	        var newX = Math.max(0, itemData.offsetX - delta);
	        if (newX > itemData.optsWidth) {
	            // Calculate the new X position, capped at the top of the buttons
	            newX = -Math.min(-itemData.optsWidth, -itemData.optsWidth + (((delta + itemData.optsWidth) * 0.4)));
	        }
	        if (newX > 5 && ev.srcEvent.type.indexOf('mouse') > -1 && !itemData.hasMouseOut) {
	            itemContainerEle.addEventListener('mouseout', this.mouseOut);
	            itemData.hasMouseOut = true;
	        }
	        dom_1.raf(function () {
	            if (!_this.dragEnded && !_this.preventDrag) {
	                isItemActive(itemContainerEle, true);
	                _this.open(itemContainerEle, newX, false);
	            }
	        });
	    };
	    ItemSlidingGesture.prototype.onDragEnd = function (ev) {
	        var _this = this;
	        this.preventDrag = false;
	        this.dragEnded = true;
	        var itemContainerEle = getItemConatiner(ev.target);
	        if (!itemContainerEle || !isActive(itemContainerEle))
	            return;
	        // If we are currently dragging, we want to snap back into place
	        // The final resting point X will be the width of the exposed buttons
	        var itemData = this.get(itemContainerEle);
	        var restingPoint = itemData.optsWidth;
	        // Check if the drag didn't clear the buttons mid-point
	        // and we aren't moving fast enough to swipe open
	        if (this.getOpenAmount(itemContainerEle) < (restingPoint / 2)) {
	            // If we are going left but too slow, or going right, go back to resting
	            if (ev.direction & hammer_1.Hammer.DIRECTION_RIGHT || Math.abs(ev.velocityX) < 0.3) {
	                restingPoint = 0;
	            }
	        }
	        itemContainerEle.removeEventListener('mouseout', this.mouseOut);
	        itemData.hasMouseOut = false;
	        dom_1.raf(function () {
	            _this.open(itemContainerEle, restingPoint, true);
	        });
	    };
	    ItemSlidingGesture.prototype.closeOpened = function (doNotCloseEle) {
	        var didClose = false;
	        if (this.openItems) {
	            var openItemElements = this.listEle.querySelectorAll('.active-slide');
	            for (var i = 0; i < openItemElements.length; i++) {
	                if (openItemElements[i] !== doNotCloseEle) {
	                    this.open(openItemElements[i], 0, true);
	                    didClose = true;
	                }
	            }
	        }
	        return didClose;
	    };
	    ItemSlidingGesture.prototype.open = function (itemContainerEle, openAmount, isFinal) {
	        var _this = this;
	        var slidingEle = itemContainerEle.querySelector('ion-item,[ion-item]');
	        if (!slidingEle)
	            return;
	        this.set(itemContainerEle, 'openAmount', openAmount);
	        clearTimeout(this.get(itemContainerEle).timerId);
	        if (openAmount) {
	            this.openItems++;
	        }
	        else {
	            var timerId = setTimeout(function () {
	                if (slidingEle.style[dom_1.CSS.transform] === '') {
	                    isItemActive(itemContainerEle, false);
	                    _this.openItems--;
	                }
	            }, 400);
	            this.set(itemContainerEle, 'timerId', timerId);
	        }
	        slidingEle.style[dom_1.CSS.transition] = (isFinal ? '' : 'none');
	        slidingEle.style[dom_1.CSS.transform] = (openAmount ? 'translate3d(' + -openAmount + 'px,0,0)' : '');
	        if (isFinal) {
	            if (openAmount) {
	                isItemActive(itemContainerEle, true);
	                this.on('tap', this.tap);
	            }
	            else {
	                this.off('tap', this.tap);
	            }
	            this.enableScroll(!openAmount);
	        }
	    };
	    ItemSlidingGesture.prototype.getOpenAmount = function (itemContainerEle) {
	        return this.get(itemContainerEle).openAmount || 0;
	    };
	    ItemSlidingGesture.prototype.get = function (itemContainerEle) {
	        return this.data[itemContainerEle && itemContainerEle.$ionSlide] || {};
	    };
	    ItemSlidingGesture.prototype.set = function (itemContainerEle, key, value) {
	        if (!this.data[itemContainerEle.$ionSlide]) {
	            this.data[itemContainerEle.$ionSlide] = {};
	        }
	        this.data[itemContainerEle.$ionSlide][key] = value;
	    };
	    ItemSlidingGesture.prototype.enableScroll = function (shouldEnable) {
	        var scrollContentEle = dom_1.closest(this.listEle, 'scroll-content');
	        if (scrollContentEle) {
	            scrollContentEle[shouldEnable ? 'removeEventListener' : 'addEventListener']('touchstart', preventDefault);
	        }
	    };
	    ItemSlidingGesture.prototype.unlisten = function () {
	        _super.prototype.unlisten.call(this);
	        this.listEle = null;
	    };
	    return ItemSlidingGesture;
	})(drag_gesture_1.DragGesture);
	exports.ItemSlidingGesture = ItemSlidingGesture;
	function isItemActive(ele, isActive) {
	    ele.classList[isActive ? 'add' : 'remove']('active-slide');
	    ele.classList[isActive ? 'add' : 'remove']('active-options');
	}
	function preventDefault(ev) {
	    ev.preventDefault();
	}
	function getItemConatiner(ele) {
	    return dom_1.closest(ele, 'ion-item-sliding', true);
	}
	function isFromOptionButtons(ele) {
	    return !!dom_1.closest(ele, 'ion-item-options', true);
	}
	function getOptionsWidth(itemContainerEle) {
	    var optsEle = itemContainerEle.querySelector('ion-item-options');
	    if (optsEle) {
	        return optsEle.offsetWidth;
	    }
	}
	function isActive(itemContainerEle) {
	    return itemContainerEle.classList.contains('active-slide');
	}
	var DRAG_THRESHOLD = 20;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	/**
	 * Creates a list-item that can easily be swiped, deleted, reordered, edited, and more.
	 *
	 * There are three common ways to use an item:
	 * - Use `<ion-item>` for something that is only non-clickable text.
	 * - Use `<button ion-item>` for something that can be clicked/tapped. Typically this element will also have a `(click)` handler.
	 * - Use `<a ion-item>` for when the item needs to contain a `href`.
	 *
	 * By default, `<button ion-item>` and `<a ion-item>` will receive a right arrow icon on iOS to signal that tapping the item will reveal more information.
	 * To hide this icon, add the `detail-none` attribute to the item (eg: `<button ion-item detail-none>`). To add the icon when it is not displayed by default,
	 * add the `detail-push` attribute (eg: `<ion-item detail-push>`).
	 *
	 * To break an item up into multiple columns, add multiple `<ion-item-content>` components inside of the item. By default,
	 * this component will automatically be added inside of an `<ion-item>`, giving it a single column.
	 *
	 *
	 * @usage
	 * ```html
	 *
	 * <ion-list>
	 *
	 *   // default item
	 *   <ion-item>
	 *     {{item.title}}
	 *   </ion-item>
	 *
	 *   // multiple item-content containers
	 *   <ion-item>
	 *     <ion-item-content>First Column</ion-item-content>
	 *     <ion-item-content>Second Column</ion-item-content>
	 *     <ion-item-content>Third Column</ion-item-content>
	 *   </ion-item>
	 *
	 * </ion-list>
	 *
	 *  ```
	 * @see {@link /docs/v2/components#lists List Component Docs}
	 * @see {@link ../../list/List List API Docs}
	 */
	var Item = (function () {
	    function Item() {
	    }
	    Item = __decorate([
	        core_1.Component({
	            selector: 'ion-item,[ion-item]',
	            template: '<ng-content select="[item-left]"></ng-content>' +
	                '<div class="item-inner">' +
	                '<ng-content select="ion-item-content"></ng-content>' +
	                '<ion-item-content cnt>' +
	                '<ng-content></ng-content>' +
	                '</ion-item-content>' +
	                '<ng-content select="[item-right]"></ng-content>' +
	                '</div>',
	            host: {
	                'class': 'item'
	            }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Item);
	    return Item;
	})();
	exports.Item = Item;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var list_1 = __webpack_require__(62);
	/**
	 * @description
	 * Creates a list-item that can easily be swiped,
	 * deleted, reordered, edited, and more.
	 *
	 * @usage
	 * ```html
	 * <ion-list>
	 *   <ion-item-sliding *ng-for="#item of items">
	 *     <ion-item (click)="itemTapped(item)">
	 *       {{item.title}}
	 *     </ion-item>
	 *     <ion-item-options>
	 *       <button (click)="favorite(item)">Favorite</button>
	 *       <button (click)="share(item)">Share</button>
	 *     </ion-item-options>
	 *   </ion-item>
	 * </ion-list>
	 * ```
	 */
	var ItemSliding = (function () {
	    function ItemSliding(list, elementRef) {
	        this.list = list;
	        list.enableSlidingItems(true);
	        elementRef.nativeElement.$ionSlide = ++slideIds;
	    }
	    ItemSliding.prototype.close = function () {
	        this.list.closeSlidingItems();
	    };
	    ItemSliding = __decorate([
	        core_1.Component({
	            selector: 'ion-item-sliding',
	            template: '<ng-content select="ion-item,[ion-item]"></ng-content>' +
	                '<ng-content select="ion-item-options"></ng-content>'
	        }),
	        __param(0, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof list_1.List !== 'undefined' && list_1.List) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object])
	    ], ItemSliding);
	    return ItemSliding;
	    var _a, _b;
	})();
	exports.ItemSliding = ItemSliding;
	var slideIds = 0;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(18);
	var form_1 = __webpack_require__(15);
	/**
	 * The checkbox is no different than the HTML checkbox input, except it's styled differently.
	 *
	 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/core/Form-interface.html) for more info on forms and input.
	 *
	 * @property [checked] - whether or not the checkbox is checked (defaults to false)
	 * @property [value] - the value of the checkbox component
	 *
	 * @usage
	 * ```html
	 * <ion-checkbox checked="true" value="isChecked" ng-control="htmlCtrl">
	 *   HTML5
	 * </ion-checkbox>
	 * ```
	 * @demo /docs/v2/demos/checkbox/
	 * @see {@link /docs/v2/components#checkbox Checkbox Component Docs}
	 */
	var Checkbox = (function () {
	    function Checkbox(form, ngControl, elementRef) {
	        this.form = form;
	        form.register(this);
	        this.onChange = function (_) { };
	        this.onTouched = function (_) { };
	        this.ngControl = ngControl;
	        if (ngControl)
	            ngControl.valueAccessor = this;
	    }
	    Checkbox.prototype.ngOnInit = function () {
	        this.labelId = 'label-' + this.inputId;
	    };
	    /**
	     * @private
	     * Toggle the checked state of the checkbox. Calls onChange to pass the updated checked state to the model (Control).
	     */
	    Checkbox.prototype.toggle = function () {
	        this.checked = !this.checked;
	        this.onChange(this.checked);
	    };
	    /**
	     * @private
	     * Click event handler to toggle the checkbox checked state.
	     * @param {MouseEvent} ev  The click event.
	     */
	    Checkbox.prototype.click = function (ev) {
	        ev.preventDefault();
	        ev.stopPropagation();
	        this.toggle();
	    };
	    /**
	     * @private
	     * Angular2 Forms API method called by the model (Control) on change to update
	     * the checked value.
	     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
	     */
	    Checkbox.prototype.writeValue = function (value) {
	        this.checked = value;
	    };
	    /**
	     * @private
	     * Angular2 Forms API method called by the view (NgControl) to register the
	     * onChange event handler that updates the model (Control).
	     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
	     * @param {Function} fn  the onChange event handler.
	     */
	    Checkbox.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	    /**
	     * @private
	     * Angular2 Forms API method called by the the view (NgControl) to register
	     * the onTouched event handler that marks model (Control) as touched.
	     * @param {Function} fn  onTouched event handler.
	     */
	    Checkbox.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    /**
	     * @private
	     */
	    Checkbox.prototype.ngOnDestroy = function () {
	        this.form.deregister(this);
	    };
	    Checkbox = __decorate([
	        core_1.Component({
	            selector: 'ion-checkbox',
	            inputs: [
	                'value',
	                'checked',
	                'disabled',
	                'id'
	            ],
	            host: {
	                'role': 'checkbox',
	                'tappable': 'true',
	                '[attr.tab-index]': 'tabIndex',
	                '[attr.aria-checked]': 'checked',
	                '[attr.aria-disabled]': 'disabled',
	                '[attr.aria-labelledby]': 'labelId',
	                '(click)': 'click($event)',
	                'class': 'item'
	            },
	            template: '<div class="item-inner">' +
	                '<div class="checkbox-media" disable-activated>' +
	                '<div class="checkbox-icon"></div>' +
	                '</div>' +
	                '<ion-item-content id="{{labelId}}">' +
	                '<ng-content></ng-content>' +
	                '</ion-item-content>' +
	                '</div>'
	        }),
	        __param(1, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, (typeof (_b = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _b) || Object, (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object])
	    ], Checkbox);
	    return Checkbox;
	    var _a, _b, _c;
	})();
	exports.Checkbox = Checkbox;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(18);
	var form_1 = __webpack_require__(15);
	var config_1 = __webpack_require__(8);
	var dom_1 = __webpack_require__(11);
	/**
	 * @private
	 */
	var MediaToggle = (function () {
	    /**
	     * TODO
	     * @param {Toggle} toggle  TODO
	     * @param {} elementRef  TODO
	     * @param {Config} config  TODO
	     */
	    function MediaToggle(toggle, elementRef) {
	        toggle.toggleEle = elementRef.nativeElement;
	        this.toggle = toggle;
	    }
	    MediaToggle = __decorate([
	        core_1.Directive({
	            selector: '.toggle-media',
	            host: {
	                '[class.toggle-activated]': 'toggle.isActivated'
	            }
	        }),
	        __param(0, core_1.Host()),
	        __param(0, core_1.Inject(core_1.forwardRef(function () { return Toggle; }))), 
	        __metadata('design:paramtypes', [Toggle, (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
	    ], MediaToggle);
	    return MediaToggle;
	    var _a;
	})();
	/**
	 * @name Toggle
	 * @description
	 * A toggle technically is the same thing as an HTML checkbox input, except it looks different and is easier to use on a touch device. Ionic prefers to wrap the checkbox input with the `<label>` in order to make the entire toggle easy to tap or drag.
	 * Togglees can also have colors assigned to them, by adding any color attribute to them.
	 *
	 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
	 * @property {any} [value] - the inital value of the toggle
	 * @property {boolean} [checked] - whether the toggle it toggled or not
	 * @property {boolean} [disabled] - whether the toggle is disabled or not
	 * @property {string} [id] - a unique ID for a toggle
	 * @usage
	 * ```html
	 * // Create a single toggle
	 *  <ion-toggle checked="true">
	 *    Pineapple
	 *  </ion-toggle>
	 *
	 * // Create a list of togglees:
	 *  <ion-list>
	 *
	 *    <ion-toggle checked="true">
	 *      Apple
	 *    </ion-toggle>
	 *
	 *     <ion-toggle checked="false">
	 *       Banana
	 *     </ion-toggle>
	 *
	 *     <ion-toggle disabled="true">
	 *       Cherry
	 *     </ion-toggle>
	 *
	 *  </ion-list>
	 * ```
	 * @demo /docs/v2/demos/toggle/
	 * @see {@link /docs/v2/components#toggle Toggle Component Docs}
	 */
	var Toggle = (function () {
	    function Toggle(form, elementRef, config, ngControl) {
	        this.ngControl = ngControl;
	        // deprecated warning
	        if (elementRef.nativeElement.tagName == 'ION-SWITCH') {
	            console.warn('<ion-switch> has been renamed to <ion-toggle>, please update your HTML');
	        }
	        this.form = form;
	        form.register(this);
	        this.lastTouch = 0;
	        this.mode = config.get('mode');
	        this.onChange = function (_) { };
	        this.onTouched = function (_) { };
	        if (ngControl) {
	            ngControl.valueAccessor = this;
	        }
	        var self = this;
	        function pointerMove(ev) {
	            var currentX = dom_1.pointerCoord(ev).x;
	            if (self.checked) {
	                if (currentX + 15 < self.startX) {
	                    self.toggle(ev);
	                    self.startX = currentX;
	                }
	            }
	            else if (currentX - 15 > self.startX) {
	                self.toggle(ev);
	                self.startX = currentX;
	            }
	        }
	        function pointerOut(ev) {
	            if (ev.currentTarget === ev.target) {
	                self.pointerUp(ev);
	            }
	        }
	        this.addMoveListener = function () {
	            self.toggleEle.addEventListener('touchmove', pointerMove);
	            self.toggleEle.addEventListener('mousemove', pointerMove);
	            elementRef.nativeElement.addEventListener('mouseout', pointerOut);
	        };
	        this.removeMoveListener = function () {
	            self.toggleEle.removeEventListener('touchmove', pointerMove);
	            self.toggleEle.removeEventListener('mousemove', pointerMove);
	            elementRef.nativeElement.removeEventListener('mouseout', pointerOut);
	        };
	    }
	    /**
	     * @private
	     */
	    Toggle.prototype.ngOnInit = function () {
	        this.labelId = 'label-' + this.inputId;
	    };
	    /**
	     * Set checked state of this toggle.
	     * @param {boolean} value  Boolean to set this toggle's checked state to.
	     * @private
	     */
	    Toggle.prototype.check = function (value) {
	        this.checked = !!value;
	        this.onChange(this.checked);
	    };
	    /**
	     * Toggle the checked state of this toggle.
	     * @private
	     */
	    Toggle.prototype.toggle = function (ev) {
	        this.check(!this.checked);
	    };
	    /**
	     * @private
	     */
	    Toggle.prototype.writeValue = function (value) {
	        this.checked = value;
	    };
	    /**
	     * @private
	     */
	    Toggle.prototype.pointerDown = function (ev) {
	        if (/touch/.test(ev.type)) {
	            this.lastTouch = Date.now();
	        }
	        if (this.isDisabled(ev))
	            return;
	        this.startX = dom_1.pointerCoord(ev).x;
	        this.removeMoveListener();
	        this.addMoveListener();
	        this.isActivated = true;
	    };
	    /**
	     * @private
	     */
	    Toggle.prototype.pointerUp = function (ev) {
	        if (this.isDisabled(ev))
	            return;
	        var endX = dom_1.pointerCoord(ev).x;
	        if (this.checked) {
	            if (this.startX + 4 > endX) {
	                this.toggle(ev);
	            }
	        }
	        else if (this.startX - 4 < endX) {
	            this.toggle(ev);
	        }
	        this.removeMoveListener();
	        this.isActivated = false;
	    };
	    /**
	     * @private
	     */
	    Toggle.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	    /**
	     * @private
	     */
	    Toggle.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    /**
	     * @private
	     */
	    Toggle.prototype.ngOnDestroy = function () {
	        this.removeMoveListener();
	        this.toggleEle = this.addMoveListener = this.removeMoveListener = null;
	        this.form.deregister(this);
	    };
	    /**
	     * @private
	     */
	    Toggle.prototype.isDisabled = function (ev) {
	        return (this.lastTouch + 999 > Date.now() && /mouse/.test(ev.type)) || (this.mode == 'ios' && ev.target.tagName == 'ION-TOGGLE');
	    };
	    Toggle = __decorate([
	        core_1.Component({
	            selector: 'ion-toggle,ion-switch',
	            inputs: [
	                'value',
	                'checked',
	                'disabled',
	                'id'
	            ],
	            host: {
	                'role': 'checkbox',
	                'tappable': 'true',
	                '[attr.tab-index]': 'tabIndex',
	                '[attr.aria-checked]': 'checked',
	                '[attr.aria-disabled]': 'disabled',
	                '[attr.aria-labelledby]': 'labelId',
	                '(touchstart)': 'pointerDown($event)',
	                '(mousedown)': 'pointerDown($event)',
	                '(touchend)': 'pointerUp($event)',
	                '(mouseup)': 'pointerUp($event)',
	                'class': 'item'
	            },
	            template: '<ng-content select="[item-left]"></ng-content>' +
	                '<div class="item-inner">' +
	                '<ion-item-content id="{{labelId}}">' +
	                '<ng-content></ng-content>' +
	                '</ion-item-content>' +
	                '<div disable-activated class="toggle-media">' +
	                '<div class="toggle-icon"></div>' +
	                '</div>' +
	                "</div>",
	            directives: [MediaToggle]
	        }),
	        __param(3, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _c) || Object, (typeof (_d = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _d) || Object])
	    ], Toggle);
	    return Toggle;
	    var _a, _b, _c, _d;
	})();
	exports.Toggle = Toggle;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(18);
	var nav_controller_1 = __webpack_require__(21);
	var config_1 = __webpack_require__(8);
	var form_1 = __webpack_require__(15);
	var app_1 = __webpack_require__(6);
	var content_1 = __webpack_require__(53);
	var dom = __webpack_require__(11);
	var platform_1 = __webpack_require__(9);
	/**
	 * @name Input
	 * @module ionic
	 * @description
	 * `ionInput` is a generic wrapper for both inputs and textareas. You can give `ion-input` to tell it how to handle a chile `ion-label` component
	 * @property [fixed-labels] - a persistant label that sits next the the input
	 * @property [floating-labels] - a label that will float about the input if the input is empty of looses focus
	 * @property [stacked-labels] - A stacked label will always appear on top of the input
	 * @usage
	 * ```html
	 *  <ion-input>
	 *    <ion-label>Username</ion-label>
	 *    <input type="text" value="">
	 *  </ion-input>
	 *
	 *  <ion-input>
	 *    <input type="text" placeholder="Username">
	 *  </ion-input>
	 *
	 *  <ion-input fixed-label>
	 *    <ion-label>Username</ion-label>
	 *    <input type="text" value="">
	 *  </ion-input>
	 *
	 *  <ion-input floating-label>
	 *    <ion-label>Username</ion-label>
	 *    <input type="text" value="">
	 *  </ion-input>
	 * ```
	 *
	 */
	var TextInput = (function () {
	    function TextInput(form, elementRef, config, renderer, app, platform, scrollView, navCtrl, isFloating, isStacked, isFixed, isInset) {
	        this.renderer = renderer;
	        this.form = form;
	        form.register(this);
	        this.type = 'text';
	        this.lastTouch = 0;
	        // make more gud with pending @Attributes API
	        this.displayType = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
	        this.app = app;
	        this.elementRef = elementRef;
	        this.platform = platform;
	        this.navCtrl = navCtrl;
	        this.scrollView = scrollView;
	        this.scrollAssist = config.get('scrollAssist');
	        this.keyboardHeight = config.get('keyboardHeight');
	    }
	    /**
	     * @private
	     * This function is used to add the Angular css classes associated with inputs in forms
	     */
	    TextInput.prototype.addNgClass = function (className) {
	        return this.input.elementRef.nativeElement.classList.contains(className);
	    };
	    /**
	     * @private
	     */
	    TextInput.prototype.registerInput = function (textInputElement) {
	        if (this.displayType) {
	            textInputElement.addClass(this.displayType + '-input');
	        }
	        this.input = textInputElement;
	        this.type = textInputElement.type || 'text';
	    };
	    /**
	     * @private
	     */
	    TextInput.prototype.registerLabel = function (label) {
	        if (this.displayType) {
	            label.addClass(this.displayType + '-label');
	        }
	        this.label = label;
	    };
	    /**
	     * @private
	     */
	    TextInput.prototype.ngOnInit = function () {
	        var _this = this;
	        if (this.input && this.label) {
	            // if there is an input and an label
	            // then give the label an ID
	            // and tell the input the ID of who it's labelled by
	            this.input.labelledBy(this.label.id);
	        }
	        var self = this;
	        self.scrollMove = function (ev) {
	            if (!(_this.navCtrl && _this.navCtrl.isTransitioning())) {
	                self.deregMove();
	                if (self.hasFocus) {
	                    self.input.hideFocus(true);
	                    _this.scrollView.onScrollEnd(function () {
	                        self.input.hideFocus(false);
	                        if (self.hasFocus) {
	                            self.regMove();
	                        }
	                    });
	                }
	            }
	        };
	    };
	    /**
	     * @private
	     */
	    TextInput.prototype.pointerStart = function (ev) {
	        if (this.scrollAssist && this.app.isEnabled()) {
	            // remember where the touchstart/mousedown started
	            this.startCoord = dom.pointerCoord(ev);
	        }
	    };
	    /**
	     * @private
	     */
	    TextInput.prototype.pointerEnd = function (ev) {
	        if (!this.app.isEnabled()) {
	            ev.preventDefault();
	            ev.stopPropagation();
	        }
	        else if (this.scrollAssist && ev.type === 'touchend') {
	            // get where the touchend/mouseup ended
	            var endCoord = dom.pointerCoord(ev);
	            // focus this input if the pointer hasn't moved XX pixels
	            // and the input doesn't already have focus
	            if (!dom.hasPointerMoved(8, this.startCoord, endCoord) && !this.hasFocus) {
	                ev.preventDefault();
	                ev.stopPropagation();
	                this.initFocus();
	                // temporarily prevent mouseup's from focusing
	                this.lastTouch = Date.now();
	            }
	        }
	        else if (this.lastTouch + 999 < Date.now()) {
	            ev.preventDefault();
	            ev.stopPropagation();
	            this.setFocus();
	            this.regMove();
	        }
	    };
	    /**
	     * @private
	     */
	    TextInput.prototype.initFocus = function () {
	        // begin the process of setting focus to the inner input element
	        var _this = this;
	        var scrollView = this.scrollView;
	        if (scrollView && this.scrollAssist) {
	            // this input is inside of a scroll view
	            // find out if text input should be manually scrolled into view
	            var ele = this.elementRef.nativeElement;
	            var scrollData = TextInput.getScrollData(ele.offsetTop, ele.offsetHeight, scrollView.getDimensions(), this.keyboardHeight, this.platform.height());
	            if (scrollData.scrollAmount > -3 && scrollData.scrollAmount < 3) {
	                // the text input is in a safe position that doesn't require
	                // it to be scrolled into view, just set focus now
	                this.setFocus();
	                this.regMove();
	                return;
	            }
	            // add padding to the bottom of the scroll view (if needed)
	            scrollView.addScrollPadding(scrollData.scrollPadding);
	            // manually scroll the text input to the top
	            // do not allow any clicks while it's scrolling
	            var scrollDuration = getScrollAssistDuration(scrollData.scrollAmount);
	            this.app.setEnabled(false, scrollDuration);
	            this.navCtrl && this.navCtrl.setTransitioning(true, scrollDuration);
	            // temporarily move the focus to the focus holder so the browser
	            // doesn't freak out while it's trying to get the input in place
	            // at this point the native text input still does not have focus
	            this.input.relocate(true, scrollData.inputSafeY);
	            // scroll the input into place
	            scrollView.scrollTo(0, scrollData.scrollTo, scrollDuration).then(function () {
	                // the scroll view is in the correct position now
	                // give the native text input focus
	                _this.input.relocate(false);
	                // all good, allow clicks again
	                _this.app.setEnabled(true);
	                _this.navCtrl && _this.navCtrl.setTransitioning(false);
	                _this.regMove();
	            });
	        }
	        else {
	            // not inside of a scroll view, just focus it
	            this.setFocus();
	            this.regMove();
	        }
	    };
	    /**
	     * @private
	     * @param {TODO} inputOffsetTop  TODO
	     * @param {TODO} inputOffsetHeight  TODO
	     * @param {TODO} scrollViewDimensions  TODO
	     * @param {TODO} keyboardHeight  TODO
	     * @returns {TODO} TODO
	     */
	    TextInput.getScrollData = function (inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, plaformHeight) {
	        // compute input's Y values relative to the body
	        var inputTop = (inputOffsetTop + scrollViewDimensions.contentTop - scrollViewDimensions.scrollTop);
	        var inputBottom = (inputTop + inputOffsetHeight);
	        // compute the safe area which is the viewable content area when the soft keyboard is up
	        var safeAreaTop = scrollViewDimensions.contentTop;
	        var safeAreaHeight = plaformHeight - keyboardHeight - safeAreaTop;
	        safeAreaHeight /= 2;
	        var safeAreaBottom = safeAreaTop + safeAreaHeight;
	        var inputTopWithinSafeArea = (inputTop >= safeAreaTop && inputTop <= safeAreaBottom);
	        var inputTopAboveSafeArea = (inputTop < safeAreaTop);
	        var inputTopBelowSafeArea = (inputTop > safeAreaBottom);
	        var inputBottomWithinSafeArea = (inputBottom >= safeAreaTop && inputBottom <= safeAreaBottom);
	        var inputBottomBelowSafeArea = (inputBottom > safeAreaBottom);
	        /*
	        Text Input Scroll To Scenarios
	        ---------------------------------------
	        1) Input top within safe area, bottom within safe area
	        2) Input top within safe area, bottom below safe area, room to scroll
	        3) Input top above safe area, bottom within safe area, room to scroll
	        4) Input top below safe area, no room to scroll, input smaller than safe area
	        5) Input top within safe area, bottom below safe area, no room to scroll, input smaller than safe area
	        6) Input top within safe area, bottom below safe area, no room to scroll, input larger than safe area
	        7) Input top below safe area, no room to scroll, input larger than safe area
	        */
	        var scrollData = {
	            scrollAmount: 0,
	            scrollTo: 0,
	            scrollPadding: 0,
	            inputSafeY: 0
	        };
	        if (inputTopWithinSafeArea && inputBottomWithinSafeArea) {
	            // Input top within safe area, bottom within safe area
	            // no need to scroll to a position, it's good as-is
	            return scrollData;
	        }
	        // looks like we'll have to do some auto-scrolling
	        if (inputTopBelowSafeArea || inputBottomBelowSafeArea) {
	            // Input top and bottom below safe area
	            // auto scroll the input up so at least the top of it shows
	            if (safeAreaHeight > inputOffsetHeight) {
	                // safe area height is taller than the input height, so we
	                // can bring it up the input just enough to show the input bottom
	                scrollData.scrollAmount = Math.round(safeAreaBottom - inputBottom);
	            }
	            else {
	                // safe area height is smaller than the input height, so we can
	                // only scroll it up so the input top is at the top of the safe area
	                // however the input bottom will be below the safe area
	                scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
	            }
	            scrollData.inputSafeY = -(inputTop - safeAreaTop) + 4;
	        }
	        else if (inputTopAboveSafeArea) {
	            // Input top above safe area
	            // auto scroll the input down so at least the top of it shows
	            scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
	            scrollData.inputSafeY = (safeAreaTop - inputTop) + 4;
	        }
	        // figure out where it should scroll to for the best position to the input
	        scrollData.scrollTo = (scrollViewDimensions.scrollTop - scrollData.scrollAmount);
	        if (scrollData.scrollAmount < 0) {
	            // when auto-scrolling up, there also needs to be enough
	            // content padding at the bottom of the scroll view
	            // manually add it if there isn't enough scrollable area
	            // figure out how many scrollable area is left to scroll up
	            var availablePadding = (scrollViewDimensions.scrollHeight - scrollViewDimensions.scrollTop) - scrollViewDimensions.contentHeight;
	            var paddingSpace = availablePadding + scrollData.scrollAmount;
	            if (paddingSpace < 0) {
	                // there's not enough scrollable area at the bottom, so manually add more
	                scrollData.scrollPadding = (scrollViewDimensions.contentHeight - safeAreaHeight);
	            }
	        }
	        // if (!window.safeAreaEle) {
	        //   window.safeAreaEle = document.createElement('div');
	        //   window.safeAreaEle.style.position = 'absolute';
	        //   window.safeAreaEle.style.background = 'rgba(0, 128, 0, 0.7)';
	        //   window.safeAreaEle.style.padding = '2px 5px';
	        //   window.safeAreaEle.style.textShadow = '1px 1px white';
	        //   window.safeAreaEle.style.left = '0px';
	        //   window.safeAreaEle.style.right = '0px';
	        //   window.safeAreaEle.style.fontWeight = 'bold';
	        //   window.safeAreaEle.style.pointerEvents = 'none';
	        //   document.body.appendChild(window.safeAreaEle);
	        // }
	        // window.safeAreaEle.style.top = safeAreaTop + 'px';
	        // window.safeAreaEle.style.height = safeAreaHeight + 'px';
	        // window.safeAreaEle.innerHTML = `
	        //   <div>scrollTo: ${scrollData.scrollTo}</div>
	        //   <div>scrollAmount: ${scrollData.scrollAmount}</div>
	        //   <div>scrollPadding: ${scrollData.scrollPadding}</div>
	        //   <div>inputSafeY: ${scrollData.inputSafeY}</div>
	        //   <div>scrollHeight: ${scrollViewDimensions.scrollHeight}</div>
	        //   <div>scrollTop: ${scrollViewDimensions.scrollTop}</div>
	        //   <div>contentHeight: ${scrollViewDimensions.contentHeight}</div>
	        // `;
	        return scrollData;
	    };
	    /**
	     * @private
	     */
	    TextInput.prototype.focusChange = function (hasFocus) {
	        this.renderer.setElementClass(this.elementRef, 'input-focused', hasFocus);
	        if (!hasFocus) {
	            this.deregMove();
	            this.input.hideFocus(false);
	        }
	    };
	    /**
	     * @private
	     */
	    TextInput.prototype.hasValue = function (inputValue) {
	        this.renderer.setElementClass(this.elementRef, 'input-has-value', inputValue && inputValue !== '');
	    };
	    /**
	     * @private
	     */
	    TextInput.prototype.setFocus = function () {
	        if (this.input) {
	            this.form.setAsFocused(this);
	            // set focus on the actual input element
	            this.input.setFocus();
	            // ensure the body hasn't scrolled down
	            document.body.scrollTop = 0;
	        }
	    };
	    /**
	     * @private
	     */
	    TextInput.prototype.regMove = function () {
	        var _this = this;
	        if (this.scrollAssist && this.scrollView) {
	            setTimeout(function () {
	                _this.deregMove();
	                _this.deregScroll = _this.scrollView.addScrollEventListener(_this.scrollMove);
	            }, 80);
	        }
	    };
	    /**
	     * @private
	     */
	    TextInput.prototype.deregMove = function () {
	        this.deregScroll && this.deregScroll();
	    };
	    Object.defineProperty(TextInput.prototype, "hasFocus", {
	        /**
	         * @private
	         */
	        get: function () {
	            return !!this.input && this.input.hasFocus;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    TextInput.prototype.ngOnDestroy = function () {
	        this.deregMove();
	        this.form.deregister(this);
	    };
	    TextInput = __decorate([
	        core_1.Component({
	            selector: 'ion-input',
	            host: {
	                '(touchstart)': 'pointerStart($event)',
	                '(touchend)': 'pointerEnd($event)',
	                '(mouseup)': 'pointerEnd($event)',
	                'class': 'item',
	                '[class.ng-untouched]': 'addNgClass("ng-untouched")',
	                '[class.ng-touched]': 'addNgClass("ng-touched")',
	                '[class.ng-pristine]': 'addNgClass("ng-pristine")',
	                '[class.ng-dirty]': 'addNgClass("ng-dirty")',
	                '[class.ng-valid]': 'addNgClass("ng-valid")',
	                '[class.ng-invalid]': 'addNgClass("ng-invalid")'
	            },
	            template: '<div class="item-inner">' +
	                '<ng-content></ng-content>' +
	                '<input [type]="type" aria-hidden="true" scroll-assist *ng-if="scrollAssist">' +
	                '</div>',
	            directives: [common_1.NgIf, core_1.forwardRef(function () { return InputScrollAssist; })]
	        }),
	        __param(6, core_1.Optional()),
	        __param(6, core_1.Host()),
	        __param(7, core_1.Optional()),
	        __param(8, core_1.Attribute('floating-label')),
	        __param(9, core_1.Attribute('stacked-label')),
	        __param(10, core_1.Attribute('fixed-label')),
	        __param(11, core_1.Attribute('inset')), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _c) || Object, (typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object, (typeof (_e = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _e) || Object, (typeof (_f = typeof platform_1.Platform !== 'undefined' && platform_1.Platform) === 'function' && _f) || Object, (typeof (_g = typeof content_1.Content !== 'undefined' && content_1.Content) === 'function' && _g) || Object, (typeof (_h = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _h) || Object, String, String, String, String])
	    ], TextInput);
	    return TextInput;
	    var _a, _b, _c, _d, _e, _f, _g, _h;
	})();
	exports.TextInput = TextInput;
	/**
	 * @private
	 */
	var TextInputElement = (function () {
	    function TextInputElement(type, elementRef, renderer, wrapper, ngControl) {
	        this.type = type;
	        this.elementRef = elementRef;
	        this.wrapper = wrapper;
	        this.renderer = renderer;
	        // all text inputs (textarea, input[type=text],input[type=password], etc)
	        renderer.setElementClass(elementRef, 'text-input', true);
	        if (wrapper) {
	            // it's within ionic's ion-input, let ion-input handle what's up
	            renderer.setElementClass(elementRef, 'item-input', true);
	            wrapper.registerInput(this);
	        }
	        if (ngControl)
	            this.ngControl = ngControl;
	    }
	    TextInputElement.prototype.ngOnInit = function () {
	        if (this.ngControl)
	            this.value = this.ngControl.value;
	        this.wrapper && this.wrapper.hasValue(this.value);
	    };
	    TextInputElement.prototype.focusChange = function (changed) {
	        this.wrapper && this.wrapper.focusChange(changed);
	    };
	    TextInputElement.prototype.onKeyup = function (ev) {
	        this.wrapper && this.wrapper.hasValue(ev.target.value);
	    };
	    TextInputElement.prototype.labelledBy = function (val) {
	        this.renderer.setElementAttribute(this.elementRef, 'aria-labelledby', val);
	    };
	    TextInputElement.prototype.setFocus = function () {
	        this.getNativeElement().focus();
	    };
	    TextInputElement.prototype.relocate = function (shouldRelocate, inputRelativeY) {
	        if (this._relocated !== shouldRelocate) {
	            var focusedInputEle = this.getNativeElement();
	            if (shouldRelocate) {
	                var clonedInputEle = cloneInput(focusedInputEle, 'cloned-input');
	                focusedInputEle.classList.add('hide-focused-input');
	                focusedInputEle.style[dom.CSS.transform] = "translate3d(-9999px," + inputRelativeY + "px,0)";
	                focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
	                this.wrapper.setFocus();
	            }
	            else {
	                focusedInputEle.classList.remove('hide-focused-input');
	                focusedInputEle.style[dom.CSS.transform] = '';
	                var clonedInputEle = focusedInputEle.parentNode.querySelector('.cloned-input');
	                if (clonedInputEle) {
	                    clonedInputEle.parentNode.removeChild(clonedInputEle);
	                }
	            }
	            this._relocated = shouldRelocate;
	        }
	    };
	    TextInputElement.prototype.hideFocus = function (shouldHideFocus) {
	        var focusedInputEle = this.getNativeElement();
	        if (shouldHideFocus) {
	            var clonedInputEle = cloneInput(focusedInputEle, 'cloned-hidden');
	            focusedInputEle.classList.add('hide-focused-input');
	            focusedInputEle.style[dom.CSS.transform] = 'translate3d(-9999px,0,0)';
	            focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
	        }
	        else {
	            focusedInputEle.classList.remove('hide-focused-input');
	            focusedInputEle.style[dom.CSS.transform] = '';
	            var clonedInputEle = focusedInputEle.parentNode.querySelector('.cloned-hidden');
	            if (clonedInputEle) {
	                clonedInputEle.parentNode.removeChild(clonedInputEle);
	            }
	        }
	    };
	    Object.defineProperty(TextInputElement.prototype, "hasFocus", {
	        get: function () {
	            return dom.hasFocus(this.getNativeElement());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TextInputElement.prototype.addClass = function (className) {
	        this.renderer.setElementClass(this.elementRef, className, true);
	    };
	    TextInputElement.prototype.getNativeElement = function () {
	        return this.elementRef.nativeElement;
	    };
	    TextInputElement = __decorate([
	        core_1.Directive({
	            selector: 'textarea,input[type=text],input[type=password],input[type=number],input[type=search],input[type=email],input[type=url],input[type=tel]',
	            inputs: ['value'],
	            host: {
	                '(focus)': 'focusChange(true)',
	                '(blur)': 'focusChange(false)',
	                '(keyup)': 'onKeyup($event)'
	            }
	        }),
	        __param(0, core_1.Attribute('type')),
	        __param(3, core_1.Optional()),
	        __param(4, core_1.Optional()), 
	        __metadata('design:paramtypes', [String, (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object, TextInput, (typeof (_c = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _c) || Object])
	    ], TextInputElement);
	    return TextInputElement;
	    var _a, _b, _c;
	})();
	exports.TextInputElement = TextInputElement;
	/**
	 * @private
	 */
	var InputScrollAssist = (function () {
	    function InputScrollAssist(form, textInput) {
	        this.form = form;
	        this.textInput = textInput;
	    }
	    InputScrollAssist.prototype.receivedFocus = function (ev) {
	        this.form.focusNext(this.textInput);
	    };
	    InputScrollAssist = __decorate([
	        core_1.Directive({
	            selector: '[scroll-assist]',
	            host: {
	                '(focus)': 'receivedFocus($event)'
	            }
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, TextInput])
	    ], InputScrollAssist);
	    return InputScrollAssist;
	    var _a;
	})();
	function cloneInput(srcInput, addCssClass) {
	    var clonedInputEle = srcInput.cloneNode(true);
	    clonedInputEle.classList.add(addCssClass);
	    clonedInputEle.classList.remove('hide-focused-input');
	    clonedInputEle.setAttribute('aria-hidden', true);
	    clonedInputEle.removeAttribute('aria-labelledby');
	    clonedInputEle.tabIndex = -1;
	    return clonedInputEle;
	}
	var SCROLL_ASSIST_SPEED = 0.4;
	function getScrollAssistDuration(distanceToScroll) {
	    //return 3000;
	    distanceToScroll = Math.abs(distanceToScroll);
	    var duration = distanceToScroll / SCROLL_ASSIST_SPEED;
	    return Math.min(400, Math.max(100, duration));
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var config_1 = __webpack_require__(8);
	var text_input_1 = __webpack_require__(69);
	var dom_1 = __webpack_require__(11);
	/**
	 * @name Label
	 * @description
	 * Labels describe the data that the user should enter in to an input element.
	 * @usage
	 * ```html
	 * <ion-input>
	 *   <ion-label>Username</ion-label>
	 *   <input type="text" value="">
	 * </ion-input>
	 * ```
	 *
	 * @see {@link ../../../../components#inputs Input Component Docs}
	 * @see {@link ../Input Input API Docs}
	 *
	 */
	var Label = (function () {
	    function Label(config, container, elementRef, renderer) {
	        this.elementRef = elementRef;
	        this.renderer = renderer;
	        this.scrollAssist = config.get('scrollAssist');
	        if (!this.id) {
	            this.id = 'lbl-' + (++labelIds);
	        }
	        this.container = container;
	        container && container.registerLabel(this);
	    }
	    /**
	     * @private
	     */
	    Label.prototype.pointerStart = function (ev) {
	        if (this.scrollAssist) {
	            // remember where the touchstart/mousedown started
	            this.startCoord = dom_1.pointerCoord(ev);
	        }
	    };
	    /**
	     * @private
	     */
	    Label.prototype.pointerEnd = function (ev) {
	        if (this.container) {
	            // get where the touchend/mouseup ended
	            var endCoord = dom_1.pointerCoord(ev);
	            // focus this input if the pointer hasn't moved XX pixels
	            if (!dom_1.hasPointerMoved(20, this.startCoord, endCoord)) {
	                ev.preventDefault();
	                ev.stopPropagation();
	                this.container.initFocus();
	            }
	            this.startCoord = null;
	        }
	    };
	    /**
	     * @private
	     */
	    Label.prototype.addClass = function (className) {
	        this.renderer.setElementClass(this.elementRef, className, true);
	    };
	    Label = __decorate([
	        core_1.Directive({
	            selector: 'ion-label',
	            inputs: [
	                'id'
	            ],
	            host: {
	                '[attr.id]': 'id',
	                '(touchstart)': 'pointerStart($event)',
	                '(touchend)': 'pointerEnd($event)',
	                '(mousedown)': 'pointerStart($event)',
	                '(mouseup)': 'pointerEnd($event)'
	            }
	        }),
	        __param(1, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof text_input_1.TextInput !== 'undefined' && text_input_1.TextInput) === 'function' && _b) || Object, (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object])
	    ], Label);
	    return Label;
	    var _a, _b, _c, _d;
	})();
	exports.Label = Label;
	var labelIds = -1;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(18);
	var ion_1 = __webpack_require__(23);
	var config_1 = __webpack_require__(8);
	/**
	 * @name Segment
	 * @description
	 * A Segment is a group of buttons, sometimes known as Segmented Controls, that allow the user to interact with a compact group of a number of controls.
	 * Segments provide functionality similar to tabs, selecting one will unselect all others. You should use a tab bar instead of a segmented control when you want to let the user move back and forth between distinct pages in your app.
	 * You could use Angular 2's `ng-model` or `FormBuilder` API. For an overview on how `FormBuilder` works, checkout [Angular 2 Forms](http://learnangular2.com/forms/), or [Angular FormBuilder](https://angular.io/docs/ts/latest/api/common/FormBuilder-class.html)
	 *
	 *
	 * @usage
	 * ```html
	 * <ion-segment [(ng-model)]="relationship" danger>
	 *   <ion-segment-button value="friends">
	 *     Friends
	 *   </ion-segment-button>
	 *   <ion-segment-button value="enemies">
	 *     Enemies
	 *   </ion-segment-button>
	 * </ion-segment>
	 *```
	 *
	 * Or with `FormBuilder`
	 *
	 *```html
	 * <form [ng-form-model]="myForm">
	 *   <ion-segment ng-control="mapStyle" danger>
	 *     <ion-segment-button value="standard">
	 *       Standard
	 *     </ion-segment-button>
	 *     <ion-segment-button value="hybrid">
	 *       Hybrid
	 *     </ion-segment-button>
	 *     <ion-segment-button value="sat">
	 *       Satellite
	 *     </ion-segment-button>
	 *   </ion-segment>
	 * </form>
	 * ```
	 *
	 * @see {@link /docs/v2/components#segment Segment Component Docs}
	 * @see [Angular 2 Forms](http://learnangular2.com/forms/)
	 */
	var Segment = (function (_super) {
	    __extends(Segment, _super);
	    function Segment(ngControl, elementRef, config) {
	        _super.call(this, elementRef, config);
	        /**
	         * @private
	         */
	        this.buttons = [];
	        this.onChange = function (_) { };
	        this.onTouched = function (_) { };
	        if (ngControl)
	            ngControl.valueAccessor = this;
	    }
	    /**
	     * @private
	     */
	    Segment.prototype.writeValue = function (value) {
	        this.value = !value ? '' : value;
	        for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
	            var button = _a[_i];
	            button.isActive = (button.value === value);
	        }
	    };
	    /**
	     * @private
	     */
	    Segment.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	    /**
	     * @private
	     */
	    Segment.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    /**
	     * @private
	     * Called by child SegmentButtons to bind themselves to
	     * the Segment.
	     * @param {SegmentButton} segmentButton  The child SegmentButton to register.
	     */
	    Segment.prototype.register = function (segmentButton) {
	        this.buttons.push(segmentButton);
	        // If this button is registered and matches our value,
	        // make sure to select it
	        if (this.value == segmentButton.value) {
	            this.selected(segmentButton);
	        }
	    };
	    /**
	     * @private
	     * Select the button with the given value.
	     * @param {string} value  Value of the button to select.
	     */
	    Segment.prototype.selectFromValue = function (value) {
	        if (this.buttons.length == 0) {
	            return;
	        }
	        for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
	            var button = _a[_i];
	            button.isActive = (button.value === value);
	        }
	    };
	    /**
	     * @private
	     * Indicate a button should be selected.
	     * @param {SegmentButton} segmentButton  The button to select.
	     */
	    Segment.prototype.selected = function (segmentButton) {
	        this.buttons.forEach(function (button) {
	            button.isActive = false;
	        });
	        segmentButton.isActive = true;
	        this.value = segmentButton.value;
	        this.onChange(segmentButton.value);
	    };
	    Segment = __decorate([
	        core_1.Directive({
	            selector: 'ion-segment'
	        }),
	        __param(0, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _c) || Object])
	    ], Segment);
	    return Segment;
	    var _a, _b, _c;
	})(ion_1.Ion);
	exports.Segment = Segment;
	/**
	 * @name SegmentButton
	 * @description
	 * The child buttons of the `ion-segment` component. Each `ion-segment-button` must have a value.
	 * @property {string} [value] - the value of the segment-button.
	 * @usage
	 * ```html
	 * <ion-segment [(ng-model)]="relationship" primary>
	 *   <ion-segment-button value="friends">
	 *     Friends
	 *   </ion-segment-button>
	 *   <ion-segment-button value="enemies">
	 *     Enemies
	 *   </ion-segment-button>
	 * </ion-segment>
	 *```
	 *
	 * Or with `FormBuilder`
	 *
	 *```html
	 * <form [ng-form-model]="myForm">
	 *   <ion-segment ng-control="mapStyle" danger>
	 *     <ion-segment-button value="standard">
	 *       Standard
	 *     </ion-segment-button>
	 *     <ion-segment-button value="hybrid">
	 *       Hybrid
	 *     </ion-segment-button>
	 *     <ion-segment-button value="sat">
	 *       Satellite
	 *     </ion-segment-button>
	 *   </ion-segment>
	 * </form>
	 * ```
	 * @see {@link /docs/v2/components#segment Segment Component Docs}
	 * @see {@link /docs/v2/api/components/segment/Segment/ Segment API Docs}
	 */
	var SegmentButton = (function () {
	    function SegmentButton(segment, elementRef, renderer) {
	        this.segment = segment;
	        renderer.setElementClass(elementRef, 'segment-button', true);
	        renderer.setElementAttribute(elementRef, 'tappable', '');
	    }
	    /**
	     * @private
	     */
	    SegmentButton.prototype.ngOnInit = function () {
	        this.segment.register(this);
	    };
	    /**
	     * @private
	     */
	    SegmentButton.prototype.click = function (event) {
	        this.segment.selected(this, event);
	    };
	    SegmentButton = __decorate([
	        core_1.Directive({
	            selector: 'ion-segment-button',
	            inputs: [
	                'value'
	            ],
	            host: {
	                '(click)': 'click($event)',
	                '[class.segment-activated]': 'isActive'
	            }
	        }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [Segment, (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object])
	    ], SegmentButton);
	    return SegmentButton;
	    var _a, _b;
	})();
	exports.SegmentButton = SegmentButton;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(18);
	var config_1 = __webpack_require__(8);
	var ion_1 = __webpack_require__(23);
	var list_1 = __webpack_require__(62);
	/**
	 * A radio group is a group of radio components.
	 *
	 * Selecting a radio button in the group unselects all others in the group.
	 *
	 * New radios can be registered dynamically.
	 *
	 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
	 *
	 * @usage
	 * ```html
	 * <ion-list radio-group ng-control="clientside">
	 *
	 *   <ion-list-header>
	 *     Clientside
	 *   </ion-list-header>
	 *
	 *   <ion-radio value="ember">
	 *     Ember
	 *   </ion-radio>
	 *
	 *   <ion-radio value="angular1">
	 *     Angular 1
	 *   </ion-radio>
	 *
	 *   <ion-radio value="angular2" checked="true">
	 *     Angular 2
	 *   </ion-radio>
	 *
	 *   <ion-radio value="react">
	 *     React
	 *   </ion-radio>
	 *
	 * </ion-list>
	 * ```
	 * @see {@link /docs/v2/components#radio Radio Component Docs}
	*/
	var RadioGroup = (function (_super) {
	    __extends(RadioGroup, _super);
	    function RadioGroup(elementRef, config, ngControl, headerQuery) {
	        _super.call(this, elementRef, config);
	        this.headerQuery = headerQuery;
	        this.radios = [];
	        this.ngControl = ngControl;
	        this.id = ++radioGroupIds;
	        this.radioIds = -1;
	        this.onChange = function (_) { };
	        this.onTouched = function (_) { };
	        if (ngControl)
	            this.ngControl.valueAccessor = this;
	    }
	    /**
	     * @private
	     */
	    RadioGroup.prototype.ngOnInit = function () {
	        var header = this.headerQuery.first;
	        if (header) {
	            if (!header.id) {
	                header.id = 'radio-header-' + this.id;
	            }
	            this.describedById = header.id;
	        }
	    };
	    /**
	     * @private
	     * Register the specified radio button with the radio group.
	     * @param {RadioButton} radio  The radio button to register.
	     */
	    RadioGroup.prototype.registerRadio = function (radio) {
	        radio.id = radio.id || ('radio-' + this.id + '-' + (++this.radioIds));
	        this.radios.push(radio);
	        if (this.value == radio.value) {
	            radio.check(this.value);
	        }
	        if (radio.checked) {
	            this.value = radio.value;
	            this.onChange(this.value);
	            this.activeId = radio.id;
	        }
	    };
	    /**
	     * @private
	     * Update which radio button in the group is checked, unchecking all others.
	     * @param {RadioButton} checkedRadio  The radio button to check.
	     */
	    RadioGroup.prototype.update = function (checkedRadio) {
	        this.value = checkedRadio.value;
	        this.activeId = checkedRadio.id;
	        for (var _i = 0, _a = this.radios; _i < _a.length; _i++) {
	            var radio = _a[_i];
	            radio.checked = (radio === checkedRadio);
	        }
	        this.onChange(this.value);
	    };
	    /**
	     * @private
	     * Angular2 Forms API method called by the model (Control) on change to update
	     * the checked value.
	     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
	     */
	    RadioGroup.prototype.writeValue = function (value) {
	        this.value = value;
	        for (var _i = 0, _a = this.radios; _i < _a.length; _i++) {
	            var radio = _a[_i];
	            radio.checked = (radio.value == value);
	        }
	    };
	    /**
	     * @private
	     * Angular2 Forms API method called by the view (NgControl) to register the
	     * onChange event handler that updates the model (Control).
	     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
	     * @param {Function} fn  the onChange event handler.
	     */
	    RadioGroup.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	    /**
	     * @private
	     * Angular2 Forms API method called by the the view (NgControl) to register
	     * the onTouched event handler that marks the model (Control) as touched.
	     * @param {Function} fn  onTouched event handler.
	     */
	    RadioGroup.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    RadioGroup = __decorate([
	        core_1.Directive({
	            selector: '[radio-group]',
	            host: {
	                'role': 'radiogroup',
	                '[attr.aria-activedescendant]': 'activeId',
	                '[attr.aria-describedby]': 'describedById',
	            }
	        }),
	        __param(2, core_1.Optional()),
	        __param(3, core_1.Query(list_1.ListHeader)), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _c) || Object, (typeof (_d = typeof core_1.QueryList !== 'undefined' && core_1.QueryList) === 'function' && _d) || Object])
	    ], RadioGroup);
	    return RadioGroup;
	    var _a, _b, _c, _d;
	})(ion_1.Ion);
	exports.RadioGroup = RadioGroup;
	/**
	 * @description
	 * A single radio component.
	 *
	 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
	 *
	 * @usage
	 * ```html
	 * <ion-radio value="isChecked" checked="true">
	 *   Radio Label
	 * </ion-radio>
	 * ```
	 *
	 * @see {@link /docs/v2/components#radio Radio Component Docs}
	 */
	var RadioButton = (function (_super) {
	    __extends(RadioButton, _super);
	    function RadioButton(group, elementRef, config) {
	        _super.call(this, elementRef, config);
	        this.group = group;
	        this.tabIndex = 0;
	    }
	    /**
	     * @private
	     */
	    RadioButton.prototype.ngOnInit = function () {
	        _super.prototype.ngOnInit.call(this);
	        this.group.registerRadio(this);
	        this.labelId = 'label-' + this.id;
	    };
	    /**
	     * @private
	     */
	    RadioButton.prototype.click = function (event) {
	        event.preventDefault();
	        event.stopPropagation();
	        this.check();
	    };
	    /**
	     * Update the checked state of this radio button.
	     * TODO: Call this toggle? Since unchecks as well
	     */
	    RadioButton.prototype.check = function () {
	        this.checked = !this.checked;
	        this.group.update(this);
	    };
	    RadioButton = __decorate([
	        core_1.Component({
	            selector: 'ion-radio',
	            inputs: [
	                'value',
	                'checked',
	                'disabled',
	                'id'
	            ],
	            host: {
	                'role': 'radio',
	                'tappable': 'true',
	                '[attr.id]': 'id',
	                '[attr.tab-index]': 'tabIndex',
	                '[attr.aria-checked]': 'checked',
	                '[attr.aria-disabled]': 'disabled',
	                '[attr.aria-labelledby]': 'labelId',
	                '(click)': 'click($event)',
	                'class': 'item'
	            },
	            template: '<div class="item-inner">' +
	                '<ion-item-content id="{{labelId}}">' +
	                '<ng-content></ng-content>' +
	                '</ion-item-content>' +
	                '<div class="radio-media">' +
	                '<div class="radio-icon"></div>' +
	                '</div>' +
	                '</div>'
	        }),
	        __param(0, core_1.Host()),
	        __param(0, core_1.Optional()), 
	        __metadata('design:paramtypes', [RadioGroup, (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object])
	    ], RadioButton);
	    return RadioButton;
	    var _a, _b;
	})(ion_1.Ion);
	exports.RadioButton = RadioButton;
	var radioGroupIds = -1;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(18);
	var ion_1 = __webpack_require__(23);
	var config_1 = __webpack_require__(8);
	var decorators_1 = __webpack_require__(41);
	var icon_1 = __webpack_require__(19);
	var button_1 = __webpack_require__(33);
	/**
	 * @name Searchbar
	 * @module ionic
	 * @description
	 * Manages the display of a search bar which can be used to search or filter items.
	 *
	 * @usage
	 * ```html
	 * <ion-searchbar [(ng-model)]="defaultSearch"></ion-searchbar>
	 * ```
	 *
	 * @property [placeholder] - sets input placeholder to value passed in
	 * @property [show-cancel] - shows the cancel button based on boolean value passed in
	 * @property [cancel-text] - sets the cancel button text to the value passed in
	 * @property [cancel-action] - the function that gets called by clicking the cancel button
	 * @see {@link /docs/v2/components#search Search Component Docs}
	 */
	var Searchbar = (function (_super) {
	    __extends(Searchbar, _super);
	    function Searchbar(elementRef, config, ngControl, renderer) {
	        _super.call(this, elementRef, config);
	        this.renderer = renderer;
	        this.elementRef = elementRef;
	        // If there is no control then we shouldn't do anything
	        if (!ngControl)
	            return;
	        this.ngControl = ngControl;
	        this.ngControl.valueAccessor = this;
	    }
	    /**
	     * @private
	     * After the view has initialized check if the searchbar has a value
	     * and then store that value in query
	     */
	    Searchbar.prototype.ngAfterViewInit = function () {
	        // If the user passes in a value to the model we should left align
	        this.shouldLeftAlign = this.ngControl.value && this.ngControl.value.trim() != '';
	        this.query = this.ngControl.value || '';
	    };
	    /**
	     * @private
	     * Write a new value to the element.
	     */
	    Searchbar.prototype.writeValue = function (value) {
	        this.query = value;
	    };
	    /**
	     * @private
	     * Set the function to be called when the control receives a change event.
	     */
	    Searchbar.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    /**
	     * @private
	     * Set the function to be called when the control receives a touch event.
	     */
	    Searchbar.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    /**
	     * @private
	     * Updates the value of the control when the searchbar input changes.
	     */
	    Searchbar.prototype.inputChanged = function (event) {
	        this.writeValue(event.target.value);
	        this.onChange(event.target.value);
	    };
	    /**
	     * @private
	     * Sets the searchbar to focused and aligned left on input focus.
	     */
	    Searchbar.prototype.inputFocused = function () {
	        this.isFocused = true;
	        this.shouldLeftAlign = true;
	    };
	    /**
	     * @private
	     * Sets the searchbar to not focused and checks if it should align left
	     * based on whether there is a value in the searchbar or not on input blur.
	     */
	    Searchbar.prototype.inputBlurred = function () {
	        this.isFocused = false;
	        this.shouldLeftAlign = this.ngControl.value && this.ngControl.value.trim() != '';
	    };
	    /**
	     * @private
	     * Clears the input field and triggers the control change.
	     */
	    Searchbar.prototype.clearInput = function (event) {
	        this.writeValue('');
	        this.onChange('');
	    };
	    /**
	     * @private
	     * Blurs the input field, clears the input field and removes the left align
	     * then calls the custom cancel function if the user passed one in.
	     */
	    Searchbar.prototype.cancelSearchbar = function (event, query) {
	        this.element = this.elementRef.nativeElement.querySelector('input');
	        this.element.blur();
	        this.clearInput();
	        this.shouldLeftAlign = false;
	        this.cancelAction && this.cancelAction(event, query);
	    };
	    Searchbar = __decorate([
	        decorators_1.ConfigComponent({
	            selector: 'ion-searchbar',
	            defaultInputs: {
	                'showCancel': false,
	                'cancelText': 'Cancel',
	                'placeholder': 'Search'
	            },
	            inputs: ['cancelAction'],
	            host: {
	                '[class.searchbar-left-aligned]': 'shouldLeftAlign',
	                '[class.searchbar-focused]': 'isFocused',
	            },
	            template: '<div class="searchbar-input-container">' +
	                '<button (click)="cancelSearchbar($event, query)" clear dark class="searchbar-md-cancel"><icon arrow-back></icon></button>' +
	                '<div class="searchbar-search-icon"></div>' +
	                '<input [(value)]="query" (focus)="inputFocused()" (blur)="inputBlurred()" ' +
	                '(input)="inputChanged($event)" class="searchbar-input" type="search" [attr.placeholder]="placeholder">' +
	                '<button clear *ng-if="query" class="searchbar-clear-icon" (click)="clearInput($event)"></button>' +
	                '</div>' +
	                '<button clear *ng-if="showCancel" (click)="cancelSearchbar($event, query)" class="searchbar-ios-cancel">{{cancelText}}</button>',
	            directives: [common_1.FORM_DIRECTIVES, common_1.NgIf, common_1.NgClass, icon_1.Icon, button_1.Button]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _c) || Object, (typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object])
	    ], Searchbar);
	    return Searchbar;
	    var _a, _b, _c, _d;
	})(ion_1.Ion);
	exports.Searchbar = Searchbar;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var app_1 = __webpack_require__(6);
	var config_1 = __webpack_require__(8);
	var keyboard_1 = __webpack_require__(16);
	var decorators_1 = __webpack_require__(41);
	var nav_controller_1 = __webpack_require__(21);
	var view_controller_1 = __webpack_require__(24);
	/**
	 * _For a quick walkthrough of navigation in Ionic, check out the
	 * [Navigation section](../../../../components/#navigation) of the Component
	 * docs._
	 *
	 * Nav is a basic navigation controller component.  As a subclass of NavController
	 * you use it to navigate to pages in your app and manipulate the navigation stack.
	 * Nav automatically animates transitions between pages for you.
	 *
	 * For more information on using navigation controllers like Nav or [Tab](../../Tabs/Tab/),
	 * take a look at the [NavController API reference](../NavController/).
	 *
	 * You must set a root page (where page is any [@Page](../../config/Page/)
	 * component) to be loaded initially by any Nav you create, using
	 * the 'root' property:
	 *
	 * ```ts
	 * import {GettingStartedPage} from 'getting-started';
	 * @App({
	 *   template: `<ion-nav [root]="rootPage"></ion-nav>`
	 * })
	 * class MyApp {
	 *   constructor(){
	 *     this.rootPage = GettingStartedPage;
	 *   }
	 * }
	 * ```
	 *
	 * <h2 id="back_navigation">Back navigation</h2>
	 * If a [page](../NavController/#creating_pages) you navigate to has a [NavBar](../NavBar/),
	 * Nav will automatically add a back button to it if there is a page
	 * before the one you are navigating to in the navigation stack.
	 *
	 * Additionally, specifying the `swipe-back-enabled` property will allow you to
	 * swipe to go back:
	 * ```html
	 * <ion-nav swipe-back-enabled="false" [root]="rootPage"></ion-nav>
	 * ```
	 *
	 * Here is a diagram of how Nav animates smoothly between pages:
	 *
	 * <div class="highlight less-margin">
	 *   <pre>
	 *                           +-------+
	 *                           |  App  |
	 *                           +---+---+
	 *                           &lt;ion-app&gt;
	 *                               |
	 *                  +------------+-------------+
	 *                  |   Ionic Nav Controller   |
	 *                  +------------+-------------+
	 *                           &lt;ion-nav&gt;
	 *                               |
	 *                               |
	 *             Page 3  +--------------------+                     LoginPage
	 *           Page 2  +--------------------+ |
	 *         Page 1  +--------------------+ | |              +--------------------+
	 *                 | | Header           |&lt;-----------------|       Login        |
	 *                 +--------------------+ | |              +--------------------+
	 *                 | | |                | | |              | Username:          |
	 *                 | | |                | | |              | Password:          |
	 *                 | | |  Page 3 is     | | |              |                    |
	 *                 | | |  only content  | | |              |                    |
	 *                 | | |                |&lt;-----------------|                    |
	 *                 | | |                | | |              |                    |
	 *                 | | |                | | |              |                    |
	 *                 | +------------------|-+ |              |                    |
	 *                 | | Footer           |-|-+              |                    |
	 *                 | +------------------|-+                |                    |
	 *                 +--------------------+                  +--------------------+
	 *
	 *           +--------------------+    +--------------------+    +--------------------+
	 *           | Header             |    | Content            |    | Content            |
	 *           +--------------------+    |                    |    |                    |
	 *           | Content            |    |                    |    |                    |
	 *           |                    |    |                    |    |                    |
	 *           |                    |    |                    |    |                    |
	 *           |                    |    |                    |    |                    |
	 *           |                    |    |                    |    |                    |
	 *           |                    |    |                    |    |                    |
	 *           |                    |    |                    |    |                    |
	 *           |                    |    |                    |    |                    |
	 *           |                    |    +--------------------+    |                    |
	 *           |                    |    | Footer             |    |                    |
	 *           +--------------------+    +--------------------+    +--------------------+
	 *
	 *   </pre>
	 * </div>
	 *
	 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
	 */
	var Nav = (function (_super) {
	    __extends(Nav, _super);
	    function Nav(hostNavCtrl, viewCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd) {
	        _super.call(this, hostNavCtrl, app, config, keyboard, elementRef, 'contents', compiler, viewManager, zone, renderer, cd);
	        if (viewCtrl) {
	            // an ion-nav can also act as an ion-page within a parent ion-nav
	            // this would happen when an ion-nav nests a child ion-nav.
	            viewCtrl.setContent(this);
	            viewCtrl.setContentRef(elementRef);
	        }
	    }
	    /**
	     * @private
	     */
	    Nav.prototype.ngOnInit = function () {
	        _super.prototype.ngOnInit.call(this);
	        if (this.root) {
	            if (typeof this.root !== 'function') {
	                throw 'The [root] property in <ion-nav> must be given a reference to a component class from within the constructor.';
	            }
	            this.push(this.root);
	        }
	        // default the swipe back to be enabled
	        this.isSwipeBackEnabled((this.swipeBackEnabled || '').toString() !== 'false');
	    };
	    Nav = __decorate([
	        decorators_1.ConfigComponent({
	            selector: 'ion-nav',
	            inputs: [
	                'root'
	            ],
	            defaultInputs: {
	                'swipeBackEnabled': true
	            },
	            template: '<template #contents></template>'
	        }),
	        __param(0, core_1.Optional()),
	        __param(1, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _a) || Object, (typeof (_b = typeof view_controller_1.ViewController !== 'undefined' && view_controller_1.ViewController) === 'function' && _b) || Object, (typeof (_c = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _c) || Object, (typeof (_d = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _d) || Object, (typeof (_e = typeof keyboard_1.Keyboard !== 'undefined' && keyboard_1.Keyboard) === 'function' && _e) || Object, (typeof (_f = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _f) || Object, (typeof (_g = typeof core_1.Compiler !== 'undefined' && core_1.Compiler) === 'function' && _g) || Object, (typeof (_h = typeof core_1.AppViewManager !== 'undefined' && core_1.AppViewManager) === 'function' && _h) || Object, (typeof (_j = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _j) || Object, (typeof (_k = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _k) || Object, (typeof (_l = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _l) || Object])
	    ], Nav);
	    return Nav;
	    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
	})(nav_controller_1.NavController);
	exports.Nav = Nav;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var nav_controller_1 = __webpack_require__(21);
	var nav_registry_1 = __webpack_require__(35);
	/**
	 * Directive for declaratively linking to a new page instead of using
	 * [NavController.push()](../NavController/#push). Similar to ui-router's `ui-sref`.
	 *
	 * Basic usage:
	 * ```html
	 * <button [nav-push]="pushPage"></button>
	 * ```
	 * To specify parameters you can use array syntax or the `nav-params` property:
	 * ```html
	 * <button [nav-push]="pushPage" [nav-params]="params"></button>
	 * ```
	 * Where `pushPage` and `params` are specified in your component, and `pushPage`
	 * contains a reference to a [@Page component](../../../config/Page/):
	 *
	 * ```ts
	 * import {LoginPage} from 'login';
	 * @Page({
	 *   template: `<button [nav-push]="pushPage" [nav-params]="params"></button>`
	 * })
	 * class MyPage {
	 *   constructor(){
	 *     this.pushPage = LoginPage;
	 *     this.params = { id: 42 };
	 *   }
	 * }
	 * ```
	 *
	 * ### Alternate syntax
	 * You can also use syntax similar to Angular2's router, passing an array to
	 * NavPush:
	 * ```html
	 * <button [nav-push]="[pushPage, params]"></button>
	 * ```
	 * @demo /docs/v2/demos/nav-push-pop/
	 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
	 * @see {@link ../NavPop NavPop API Docs}
	 */
	var NavPush = (function () {
	    /**
	     * TODO
	     * @param {NavController} nav  TODO
	     */
	    function NavPush(nav, registry) {
	        this.nav = nav;
	        this.registry = registry;
	        if (!nav) {
	            console.error('nav-push must be within a NavController');
	        }
	    }
	    NavPush.prototype.onClick = function () {
	        var destination, params;
	        if (this.instruction instanceof Array) {
	            if (this.instruction.length > 2) {
	                throw 'Too many [nav-push] arguments, expects [View, { params }]';
	            }
	            destination = this.instruction[0];
	            params = this.instruction[1] || this.params;
	        }
	        else {
	            destination = this.instruction;
	            params = this.params;
	        }
	        if (typeof destination === "string") {
	            destination = this.registry.get(destination);
	        }
	        this.nav && this.nav.push(destination, params);
	    };
	    NavPush = __decorate([
	        core_1.Directive({
	            selector: '[nav-push]',
	            inputs: [
	                'instruction: navPush',
	                'params: navParams'
	            ],
	            host: {
	                '(click)': 'onClick()',
	                'role': 'link'
	            }
	        }),
	        __param(0, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _a) || Object, (typeof (_b = typeof nav_registry_1.NavRegistry !== 'undefined' && nav_registry_1.NavRegistry) === 'function' && _b) || Object])
	    ], NavPush);
	    return NavPush;
	    var _a, _b;
	})();
	exports.NavPush = NavPush;
	/**
	 * TODO
	 * @demo /docs/v2/demos/nav-push-pop/
	 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
	 * @see {@link ../NavPush NavPush API Docs}
	 */
	var NavPop = (function () {
	    /**
	     * TODO
	     * @param {NavController} nav  TODO
	     */
	    function NavPop(nav) {
	        this.nav = nav;
	        if (!nav) {
	            console.error('nav-pop must be within a NavController');
	        }
	    }
	    NavPop.prototype.onClick = function () {
	        this.nav && this.nav.pop();
	    };
	    NavPop = __decorate([
	        core_1.Directive({
	            selector: '[nav-pop]',
	            host: {
	                '(click)': 'onClick()',
	                'role': 'link'
	            }
	        }),
	        __param(0, core_1.Optional()), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _a) || Object])
	    ], NavPop);
	    return NavPop;
	    var _a;
	})();
	exports.NavPop = NavPop;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var router_1 = __webpack_require__(4);
	var nav_1 = __webpack_require__(74);
	/**
	 * TODO
	 */
	var NavRouter = (function (_super) {
	    __extends(NavRouter, _super);
	    /**
	     * TODO
	     * @param {ElementRef} _elementRef  TODO
	     * @param {DynamicComponentLoader} _loader  TODO
	     * @param {Router} _parentRouter  TODO
	     * @param {string} nameAttr  Value of the element's 'name' attribute
	     * @param {Nav} nav  TODO
	     */
	    function NavRouter(_elementRef, _loader, _parentRouter, nameAttr, nav) {
	        _super.call(this, _elementRef, _loader, _parentRouter, nameAttr);
	        // Nav is Ionic's NavController, which we injected into this class
	        this.nav = nav;
	        // register this router with Ionic's NavController
	        // Ionic's NavController will call this NavRouter's "stateChange"
	        // method when the NavController has...changed its state
	        nav.registerRouter(this);
	    }
	    /**
	     * @private
	     * TODO
	     * @param {ComponentInstruction} instruction  TODO
	     */
	    NavRouter.prototype.activate = function (nextInstruction) {
	        var previousInstruction = this._currentInstruction;
	        this._currentInstruction = nextInstruction;
	        var componentType = nextInstruction.componentType;
	        var childRouter = this._parentRouter.childRouter(componentType);
	        // prevent double navigations to the same view
	        var lastView = this.nav.last();
	        if (this.nav.isTransitioning() || lastView && lastView.componentType === componentType && lastView.params.data === nextInstruction.params) {
	            return Promise.resolve();
	        }
	        // tell the NavController which componentType, and it's params, to navigate to
	        return this.nav.push(componentType, nextInstruction.params);
	    };
	    NavRouter.prototype.reuse = function (nextInstruction) {
	        return Promise.resolve();
	    };
	    /**
	     * TODO
	     * @param {TODO} type  TODO
	     * @param {TODO} viewCtrl  TODO
	     */
	    NavRouter.prototype.stateChange = function (type, viewCtrl) {
	        // stateChange is called by Ionic's NavController
	        // type could be "push" or "pop"
	        // viewCtrl is Ionic's ViewController class, which has the properties "componentType" and "params"
	        // only do an update if there's an actual view change
	        if (!viewCtrl || this._activeViewId === viewCtrl.id)
	            return;
	        this._activeViewId = viewCtrl.id;
	        // get the best PathRecognizer for this view's componentType
	        var pathRecognizer = this.getPathRecognizerByComponent(viewCtrl.componentType);
	        if (pathRecognizer) {
	            // generate a componentInstruction from the view's PathRecognizer and params
	            var componentInstruction = pathRecognizer.generate(viewCtrl.params.data);
	            // create a ResolvedInstruction from the componentInstruction
	            var instruction = new ResolvedInstruction(componentInstruction, null);
	            this._parentRouter.navigateByInstruction(instruction);
	        }
	    };
	    /**
	     * TODO
	     * @param {TODO} componentType  TODO
	     * @returns {TODO} TODO
	     */
	    NavRouter.prototype.getPathRecognizerByComponent = function (componentType) {
	        // given a componentType, figure out the best PathRecognizer to use
	        var rules = this._parentRouter.registry._rules;
	        var pathRecognizer = null;
	        rules.forEach(function (rule) {
	            pathRecognizer = rule.matchers.find(function (matcherPathRecognizer) {
	                return (matcherPathRecognizer.handler.componentType === componentType);
	            });
	        });
	        return pathRecognizer;
	    };
	    NavRouter = __decorate([
	        core_1.Directive({
	            selector: 'ion-nav'
	        }),
	        __param(3, core_1.Attribute('name')), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.DynamicComponentLoader !== 'undefined' && core_1.DynamicComponentLoader) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object, String, (typeof (_d = typeof nav_1.Nav !== 'undefined' && nav_1.Nav) === 'function' && _d) || Object])
	    ], NavRouter);
	    return NavRouter;
	    var _a, _b, _c, _d;
	})(router_1.RouterOutlet);
	exports.NavRouter = NavRouter;
	// TODO: hacked from
	// https://github.com/angular/angular/blob/6ddfff5cd59aac9099aa6da5118c5598eea7ea11/modules/angular2/src/router/instruction.ts#L207
	var ResolvedInstruction = (function (_super) {
	    __extends(ResolvedInstruction, _super);
	    function ResolvedInstruction(component, child, auxInstruction) {
	        _super.call(this);
	        this.component = component;
	        this.child = child;
	        this.auxInstruction = auxInstruction;
	    }
	    ResolvedInstruction.prototype.resolveComponent = function () {
	        return Promise.resolve(this.component);
	    };
	    return ResolvedInstruction;
	})(router_1.Instruction);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var platform_1 = __webpack_require__(9);
	var DisplayWhen = (function () {
	    function DisplayWhen(conditions, platform, ngZone) {
	        var _this = this;
	        this.isMatch = false;
	        this.platform = platform;
	        if (!conditions)
	            return;
	        this.conditions = conditions.split(',');
	        // check if its one of the matching platforms first
	        // a platform does not change during the life of an app
	        for (var i = 0; i < this.conditions.length; i++) {
	            if (this.conditions[i] && platform.is(this.conditions[i])) {
	                this.isMatch = true;
	                return;
	            }
	        }
	        if (this.orientation()) {
	            // add window resize listener
	            platform.onResize(function () {
	                ngZone.run(function () {
	                    _this.orientation();
	                });
	            });
	            return;
	        }
	    }
	    DisplayWhen.prototype.orientation = function () {
	        for (var i = 0; i < this.conditions.length; i++) {
	            if (this.conditions[i] == 'portrait') {
	                this.isMatch = this.platform.isPortrait();
	                return true;
	            }
	            if (this.conditions[i] == 'landscape') {
	                this.isMatch = this.platform.isLandscape();
	                return true;
	            }
	        }
	    };
	    return DisplayWhen;
	})();
	exports.DisplayWhen = DisplayWhen;
	/**
	 *
	 * The `show-when` attribute takes a string that represents a plaform or screen orientation.
	 * The element the attribute is added to will only be shown when that platform or screen orientation is active.
	 * Complements the [hide-when attribute](../HideWhen).
	 * @usage
	 * ```html
	 * <div show-when="ios">I am only visible on iOS!</div>
	 * ```
	 * @demo /docs/v2/demos/show-when/
	 * @see {@link ../HideWhen HideWhen API Docs}
	 */
	var ShowWhen = (function (_super) {
	    __extends(ShowWhen, _super);
	    function ShowWhen(showWhen, platform, ngZone) {
	        _super.call(this, showWhen, platform, ngZone);
	    }
	    Object.defineProperty(ShowWhen.prototype, "hidden", {
	        /**
	         * @private
	         */
	        get: function () {
	            return !this.isMatch;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ShowWhen = __decorate([
	        core_1.Directive({
	            selector: '[show-when]',
	            host: {
	                '[hidden]': 'hidden'
	            }
	        }),
	        __param(0, core_1.Attribute('show-when')), 
	        __metadata('design:paramtypes', [String, (typeof (_a = typeof platform_1.Platform !== 'undefined' && platform_1.Platform) === 'function' && _a) || Object, (typeof (_b = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _b) || Object])
	    ], ShowWhen);
	    return ShowWhen;
	    var _a, _b;
	})(DisplayWhen);
	exports.ShowWhen = ShowWhen;
	/**
	 *
	 * The `hide-when` attribute takes a string that represents a plaform or screen orientation.
	 * The element the attribute is added to will only be hidden when that platform or screen orientation is active.
	 * Complements the [show-when attribute](../ShowWhen).
	 * @usage
	 * ```html
	 * <div hide-when="android">I am hidden on Android!</div>
	 * ```
	 * @demo /docs/v2/demos/hide-when/
	 * @see {@link ../ShowWhen ShowWhen API Docs}
	 */
	var HideWhen = (function (_super) {
	    __extends(HideWhen, _super);
	    function HideWhen(hideWhen, platform, ngZone) {
	        _super.call(this, hideWhen, platform, ngZone);
	    }
	    Object.defineProperty(HideWhen.prototype, "hidden", {
	        /**
	         * @private
	         */
	        get: function () {
	            return this.isMatch;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    HideWhen = __decorate([
	        core_1.Directive({
	            selector: '[hide-when]',
	            host: {
	                '[hidden]': 'hidden'
	            }
	        }),
	        __param(0, core_1.Attribute('hide-when')), 
	        __metadata('design:paramtypes', [String, (typeof (_a = typeof platform_1.Platform !== 'undefined' && platform_1.Platform) === 'function' && _a) || Object, (typeof (_b = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _b) || Object])
	    ], HideWhen);
	    return HideWhen;
	    var _a, _b;
	})(DisplayWhen);
	exports.HideWhen = HideWhen;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var core_1 = __webpack_require__(3);
	var directives_1 = __webpack_require__(44);
	/**
	 * _For more information on how pages are created, see the [NavController API
	 * reference](../../components/nav/NavController/#creating_pages)._
	 *
	 * The Page decorator indicates that the decorated class is an Ionic
	 * navigation component, meaning it can be navigated to using a NavController.
	 *
	 * Pages have all [IONIC_DIRECTIVES](../IONIC_DIRECTIVES/), which include
	 * all Ionic components and directives, as well as Angular's [CORE_DIRECTIVES](https://angular.io/docs/js/latest/api/core/CORE_DIRECTIVES-const.html)
	 * and [FORM_DIRECTIVES](https://angular.io/docs/js/latest/api/core/FORM_DIRECTIVES-const.html),
	 * already provided to them, so you only need to supply custom components and
	 * directives to your pages:
	 *
	 * ```ts
	 * @Page({
	 *   template: `
	 *     <ion-checkbox my-custom-dir>
	 *     </ion-checkbox>`
	 *   directives: [MyCustomDirective]
	 * })
	 * class MyPage {}
	 * ```
	 * Here [Checkbox](../../../components/checkbox/Checkbox/) will load because
	 * it is in IONIC_DIRECTIVES, so there is no need to add it to the `directives`
	 * array.
	 *
	 * For custom components that use Ionic components, you will need to include
	 * IONIC_DIRECTIVES in the `directives` array:
	 *
	 * ```ts
	 * import {IONIC_DIRECTIVES} from 'ionic/ionic';
	 * @Component({
	 *   selector: 'my-component'
	 *   template: `<div class="my-style">
	 *   						  <ion-checkbox></ion-checkbox>
	 *   						</div>`,
	 *   directives: [IONIC_DIRECTIVES]
	 * })
	 * class MyCustomCheckbox {}
	 *```
	 * Alternatively, you could:
	 * ```ts
	 * import {Checkbox, Icon} from 'ionic/ionic'
	 * ```
	 * along with any other components and add them individually:
	 * ```
	 * @Component({
	 *   ...
	 *   directives: [Checkbox, Icon]
	 * })
	 * ```
	 * However, using IONIC_DIRECTIVES will always *Just Work* with no
	 * performance overhead, so there is really no reason to not always use it.
	 *
	 * Pages have their content automatically wrapped in `<ion-view>`, so although
	 * you may see these tags if you inspect your markup, you don't need to include
	 * them in your templates.
	 */
	function Page(config) {
	    if (config === void 0) { config = {}; }
	    return function (cls) {
	        config.selector = 'ion-page';
	        config.directives = config.directives ? config.directives.concat(directives_1.IONIC_DIRECTIVES) : directives_1.IONIC_DIRECTIVES;
	        config.host = config.host || {};
	        config.host['[hidden]'] = '_hidden';
	        config.host['[class.tab-subpage]'] = '_tabSubPage';
	        var annotations = Reflect.getMetadata('annotations', cls) || [];
	        annotations.push(new core_1.Component(config));
	        Reflect.defineMetadata('annotations', annotations, cls);
	        return cls;
	    };
	}
	exports.Page = Page;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(6));
	__export(__webpack_require__(60));
	__export(__webpack_require__(17));
	__export(__webpack_require__(52));
	__export(__webpack_require__(33));
	__export(__webpack_require__(67));
	__export(__webpack_require__(53));
	__export(__webpack_require__(19));
	__export(__webpack_require__(65));
	__export(__webpack_require__(66));
	__export(__webpack_require__(46));
	__export(__webpack_require__(80));
	__export(__webpack_require__(48));
	__export(__webpack_require__(51));
	__export(__webpack_require__(69));
	__export(__webpack_require__(70));
	__export(__webpack_require__(62));
	__export(__webpack_require__(77));
	__export(__webpack_require__(31));
	__export(__webpack_require__(74));
	__export(__webpack_require__(21));
	__export(__webpack_require__(24));
	__export(__webpack_require__(75));
	__export(__webpack_require__(76));
	__export(__webpack_require__(49));
	__export(__webpack_require__(45));
	__export(__webpack_require__(32));
	__export(__webpack_require__(57));
	__export(__webpack_require__(72));
	__export(__webpack_require__(55));
	__export(__webpack_require__(56));
	__export(__webpack_require__(73));
	__export(__webpack_require__(71));
	__export(__webpack_require__(59));
	__export(__webpack_require__(61));
	__export(__webpack_require__(38));
	__export(__webpack_require__(68));
	__export(__webpack_require__(50));

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var menu_1 = __webpack_require__(46);
	var animation_1 = __webpack_require__(20);
	/**
	 * Menu Type
	 * Base class which is extended by the various types. Each
	 * type will provide their own animations for open and close
	 * and registers itself with Menu.
	 * @private
	 */
	var MenuType = (function () {
	    function MenuType() {
	        this.open = new animation_1.Animation();
	        this.close = new animation_1.Animation();
	    }
	    MenuType.prototype.setOpen = function (shouldOpen) {
	        var _this = this;
	        return new Promise(function (resolve) {
	            if (shouldOpen) {
	                _this.open.playbackRate(1).onFinish(resolve, true).play();
	            }
	            else {
	                _this.close.playbackRate(1).onFinish(resolve, true).play();
	            }
	        });
	    };
	    MenuType.prototype.setProgressStart = function (isOpen) {
	        this.isOpening = !isOpen;
	        this.seek && this.seek.dispose();
	        // clone the correct animation depending on open/close
	        if (this.isOpening) {
	            this.seek = this.open.clone();
	        }
	        else {
	            this.seek = this.close.clone();
	        }
	        // the cloned animation should not use an easing curve during seek
	        this.seek.easing('linear').progressStart();
	    };
	    MenuType.prototype.setProgess = function (value) {
	        // adjust progress value depending if it opening or closing
	        if (!this.isOpening) {
	            value = 1 - value;
	        }
	        this.seek.progress(value);
	    };
	    MenuType.prototype.setProgressEnd = function (shouldComplete) {
	        var _this = this;
	        var resolve;
	        var promise = new Promise(function (res) { resolve = res; });
	        var isOpen = (this.isOpening && shouldComplete);
	        if (!this.isOpening && !shouldComplete) {
	            isOpen = true;
	        }
	        this.seek.progressEnd(shouldComplete).then(function () {
	            _this.isOpening = false;
	            resolve(isOpen);
	        });
	        return promise;
	    };
	    MenuType.prototype.ngOnDestroy = function () {
	        this.open && this.open.dispose();
	        this.close && this.close.dispose();
	        this.seek && this.seek.dispose();
	    };
	    return MenuType;
	})();
	exports.MenuType = MenuType;
	/**
	 * Menu Reveal Type
	 * The content slides over to reveal the menu underneath.
	 * The menu itself, which is under the content, does not move.
	 */
	var MenuRevealType = (function (_super) {
	    __extends(MenuRevealType, _super);
	    function MenuRevealType(menu) {
	        _super.call(this);
	        var easing = 'ease';
	        var duration = 250;
	        var openedX = (menu.width() * (menu.side == 'right' ? -1 : 1)) + 'px';
	        var closedX = '0px';
	        this.open.easing(easing).duration(duration);
	        this.close.easing(easing).duration(duration);
	        var contentOpen = new animation_1.Animation(menu.getContentElement());
	        contentOpen.fromTo(TRANSLATE_X, closedX, openedX);
	        this.open.add(contentOpen);
	        var contentClose = new animation_1.Animation(menu.getContentElement());
	        contentClose.fromTo(TRANSLATE_X, openedX, closedX);
	        this.close.add(contentClose);
	    }
	    return MenuRevealType;
	})(MenuType);
	menu_1.Menu.register('reveal', MenuRevealType);
	/**
	 * Menu Push Type
	 * The content slides over to reveal the menu underneath.
	 * The menu itself also slides over to reveal its bad self.
	 */
	var MenuPushType = (function (_super) {
	    __extends(MenuPushType, _super);
	    function MenuPushType(menu) {
	        _super.call(this);
	        var easing = 'ease';
	        var duration = 250;
	        var contentOpenedX, menuClosedX, menuOpenedX;
	        if (menu.side == 'right') {
	            contentOpenedX = -menu.width() + 'px';
	            menuOpenedX = (menu.platform.width() - menu.width()) + 'px';
	            menuClosedX = menu.platform.width() + 'px';
	        }
	        else {
	            contentOpenedX = menu.width() + 'px';
	            menuOpenedX = '0px';
	            menuClosedX = -menu.width() + 'px';
	        }
	        // left side
	        this.open.easing(easing).duration(duration);
	        this.close.easing(easing).duration(duration);
	        var menuOpen = new animation_1.Animation(menu.getMenuElement());
	        menuOpen.fromTo(TRANSLATE_X, menuClosedX, menuOpenedX);
	        this.open.add(menuOpen);
	        var contentOpen = new animation_1.Animation(menu.getContentElement());
	        contentOpen.fromTo(TRANSLATE_X, '0px', contentOpenedX);
	        this.open.add(contentOpen);
	        var menuClose = new animation_1.Animation(menu.getMenuElement());
	        menuClose.fromTo(TRANSLATE_X, menuOpenedX, menuClosedX);
	        this.close.add(menuClose);
	        var contentClose = new animation_1.Animation(menu.getContentElement());
	        contentClose.fromTo(TRANSLATE_X, contentOpenedX, '0px');
	        this.close.add(contentClose);
	    }
	    return MenuPushType;
	})(MenuType);
	menu_1.Menu.register('push', MenuPushType);
	/**
	 * Menu Overlay Type
	 * The menu slides over the content. The content
	 * itself, which is under the menu, does not move.
	 */
	var MenuOverlayType = (function (_super) {
	    __extends(MenuOverlayType, _super);
	    function MenuOverlayType(menu) {
	        _super.call(this);
	        var easing = 'ease';
	        var duration = 250;
	        var backdropOpacity = 0.35;
	        var closedX, openedX;
	        if (menu.side == 'right') {
	            // right side
	            closedX = menu.platform.width() + 'px';
	            openedX = (menu.platform.width() - menu.width() - 8) + 'px';
	        }
	        else {
	            // left side
	            closedX = -menu.width() + 'px';
	            openedX = '8px';
	        }
	        this.open.easing(easing).duration(duration);
	        this.close.easing(easing).duration(duration);
	        var menuOpen = new animation_1.Animation(menu.getMenuElement());
	        menuOpen.fromTo(TRANSLATE_X, closedX, openedX);
	        this.open.add(menuOpen);
	        var backdropOpen = new animation_1.Animation(menu.getBackdropElement());
	        backdropOpen.fromTo(OPACITY, 0.01, backdropOpacity);
	        this.open.add(backdropOpen);
	        var menuClose = new animation_1.Animation(menu.getMenuElement());
	        menuClose.fromTo(TRANSLATE_X, openedX, closedX);
	        this.close.add(menuClose);
	        var backdropClose = new animation_1.Animation(menu.getBackdropElement());
	        backdropClose.fromTo(OPACITY, backdropOpacity, 0.01);
	        this.close.add(backdropClose);
	    }
	    return MenuOverlayType;
	})(MenuType);
	menu_1.Menu.register('overlay', MenuOverlayType);
	var OPACITY = 'opacity';
	var TRANSLATE_X = 'translateX';

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(82));
	__export(__webpack_require__(83));
	__export(__webpack_require__(84));

/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * Storage is an easy way to store key/value pairs and other complicated
	 * data in a way that uses a variety of storage engines underneath.
	 *
	 * For most cases, we recommend the SqlStorage system as it will store
	 * data in a file in the app's sandbox. LocalStorage should ONLY be used
	 * for temporary data as it may be "cleaned up" by the operation system
	 * during low disk space situations.
	 */
	/**
	 * @private
	*/
	var Storage = (function () {
	    function Storage(strategyCls, options) {
	        this._strategy = new strategyCls(options);
	    }
	    Storage.prototype.get = function (key) {
	        return this._strategy.get(key);
	    };
	    Storage.prototype.getJson = function (key) {
	        try {
	            return JSON.parse(this._strategy.get(key));
	        }
	        catch (e) {
	            console.warn('Storage getJson(): unable to parse value for key', key, ' as JSON');
	            return null;
	        }
	    };
	    Storage.prototype.set = function (key, value) {
	        return this._strategy.set(key, value);
	    };
	    Storage.prototype.remove = function (key) {
	        return this._strategy.remove(key);
	    };
	    Storage.prototype.query = function (query, params) {
	        return this._strategy.query(query, params);
	    };
	    return Storage;
	})();
	exports.Storage = Storage;
	/**
	 * @private
	*/
	var StorageEngine = (function () {
	    function StorageEngine() {
	    }
	    StorageEngine.prototype.get = function (key, value) {
	        throw Error("get() not implemented for this storage engine");
	    };
	    StorageEngine.prototype.set = function (key, value) {
	        throw Error("set() not implemented for this storage engine");
	    };
	    StorageEngine.prototype.remove = function (key) {
	        throw Error("remove() not implemented for this storage engine");
	    };
	    StorageEngine.prototype.query = function (query, params) {
	        throw Error("query() not implemented for this storage engine");
	    };
	    return StorageEngine;
	})();
	exports.StorageEngine = StorageEngine;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var storage_1 = __webpack_require__(82);
	/**
	 * The LocalStorage storage engine uses the browser's local storage system for
	 * storing key/value pairs.
	 *
	 * Note: LocalStorage should ONLY be used for temporary data that you can afford to lose.
	 * Given disk space constraints on a mobile device, local storage might be "cleaned up"
	 * by the operating system (iOS).
	 *
	 * For guaranteed, long-term storage, use the SqlStorage engine which stores data in a file.
	 * @demo /docs/v2/demos/local-storage/
	 * @see {@link /docs/v2/platform/storage/ Storage Platform Docs}
	 */
	var LocalStorage = (function (_super) {
	    __extends(LocalStorage, _super);
	    function LocalStorage() {
	        _super.call(this);
	    }
	    LocalStorage.prototype.get = function (key) {
	        return new Promise(function (resolve, reject) {
	            try {
	                var value = window.localStorage.getItem(key);
	                resolve(value);
	            }
	            catch (e) {
	                reject(e);
	            }
	        });
	    };
	    LocalStorage.prototype.set = function (key, value) {
	        return new Promise(function (resolve, reject) {
	            try {
	                window.localStorage.setItem(key, value);
	                resolve();
	            }
	            catch (e) {
	                reject(e);
	            }
	        });
	    };
	    LocalStorage.prototype.remove = function (key) {
	        return new Promise(function (resolve, reject) {
	            try {
	                window.localStorage.removeItem(key);
	                resolve();
	            }
	            catch (e) {
	                reject(e);
	            }
	        });
	    };
	    return LocalStorage;
	})(storage_1.StorageEngine);
	exports.LocalStorage = LocalStorage;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var storage_1 = __webpack_require__(82);
	var util = __webpack_require__(14);
	var DB_NAME = '__ionicstorage';
	/**
	 * SqlStorage uses SQLite or WebSQL (development only!) to store data in a
	 * persistent SQL store on the filesystem.
	 *
	 * This is the preferred storage engine, as data will be stored in appropriate
	 * app storage, unlike Local Storage which is treated differently by the OS.
	 *
	 * For convenience, the engine supports key/value storage for simple get/set and blob
	 * storage. The full SQL engine is exposed underneath through the `query` method.
	 *
	 * @usage
	 ```js
	 * let storage = new Storage(SqlStorage, options);
	 * storage.set('name', 'Max');
	 * storage.get('name').then((name) => {
	 * });
	 *
	 * // Sql storage also exposes the full engine underneath
	 * storage.query('insert into projects(name, data) values('Cool Project', 'blah')');
	 * storage.query('select * from projects').then((resp) => {})
	 * ```
	 *
	 * The `SqlStorage` service supports these options:
	 * {
	 *   name: the name of the database (__ionicstorage by default)
	 *   backupFlag: // where to store the file, default is BACKUP_LOCAL which DOES NOT store to iCloud. Other options: BACKUP_LIBRARY, BACKUP_DOCUMENTS
	 *   existingDatabase: whether to load this as an existing database (default is false)
	 * }
	 *
	 */
	var SqlStorage = (function (_super) {
	    __extends(SqlStorage, _super);
	    function SqlStorage(options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this);
	        var dbOptions = util.defaults(options, {
	            name: DB_NAME,
	            backupFlag: SqlStorage.BACKUP_LOCAL,
	            existingDatabase: false
	        });
	        if (window.sqlitePlugin) {
	            var location = this._getBackupLocation(dbOptions.backupFlag);
	            this._db = window.sqlitePlugin.openDatabase(util.extend({
	                name: dbOptions.name,
	                location: location,
	                createFromLocation: dbOptions.existingDatabase ? 1 : 0
	            }, dbOptions));
	        }
	        else {
	            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
	            this._db = window.openDatabase(dbOptions.name, '1.0', 'database', 5 * 1024 * 1024);
	        }
	        this._tryInit();
	    }
	    SqlStorage.prototype._getBackupLocation = function (dbFlag) {
	        switch (dbFlag) {
	            case SqlStorage.BACKUP_LOCAL:
	                return 2;
	            case SqlStorage.BACKUP_LIBRARY:
	                return 1;
	            case SqlStorage.BACKUP_DOCUMENTS:
	                return 0;
	            default:
	                throw Error('Invalid backup flag: ' + dbFlag);
	        }
	    };
	    // Initialize the DB with our required tables
	    SqlStorage.prototype._tryInit = function () {
	        this._db.transaction(function (tx) {
	            tx.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', [], function (tx, res) {
	            }, function (tx, err) {
	                console.error('Storage: Unable to create initial storage tables', tx, err);
	            });
	        });
	    };
	    /**
	     * Perform an arbitrary SQL operation on the database. Use this method
	     * to have full control over the underlying database through SQL operations
	     * like SELECT, INSERT, and UPDATE.
	     *
	     * @param {string} query the query to run
	     * @param {array} params the additional params to use for query placeholders
	     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
	     */
	    SqlStorage.prototype.query = function (query) {
	        var _this = this;
	        var params = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            params[_i - 1] = arguments[_i];
	        }
	        return new Promise(function (resolve, reject) {
	            try {
	                _this._db.transaction(function (tx) {
	                    tx.executeSql(query, params, function (tx, res) {
	                        resolve({
	                            tx: tx,
	                            res: res
	                        });
	                    }, function (tx, err) {
	                        reject({
	                            tx: tx,
	                            err: err
	                        });
	                    });
	                }, function (err) {
	                    reject(err);
	                });
	            }
	            catch (e) {
	                reject(e);
	            }
	        });
	    };
	    /**
	     * Get the value in the database identified by the given key.
	     * @param {string} key the key
	     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
	     */
	    SqlStorage.prototype.get = function (key) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            try {
	                _this._db.transaction(function (tx) {
	                    tx.executeSql("select key, value from kv where key = ? limit 1", [key], function (tx, res) {
	                        if (res.rows.length > 0) {
	                            var item = res.rows.item(0);
	                            resolve(item.value);
	                        }
	                        resolve(null);
	                    }, function (tx, err) {
	                        reject({
	                            tx: tx,
	                            err: err
	                        });
	                    });
	                }, function (err) {
	                    reject(err);
	                });
	            }
	            catch (e) {
	                reject(e);
	            }
	        });
	    };
	    /**
	    * Set the value in the database for the given key. Existing values will be overwritten.
	    * @param {string} key the key
	    * @param {string} value The value (as a string)
	    * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
	    */
	    SqlStorage.prototype.set = function (key, value) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            try {
	                _this._db.transaction(function (tx) {
	                    tx.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value], function (tx, res) {
	                        resolve();
	                    }, function (tx, err) {
	                        reject({
	                            tx: tx,
	                            err: err
	                        });
	                    });
	                }, function (err) {
	                    reject(err);
	                });
	            }
	            catch (e) {
	                reject(e);
	            }
	        });
	    };
	    /**
	    * Remove the value in the database for the given key.
	    * @param {string} key the key
	    * @param {string} value The value (as a string)
	    * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
	    */
	    SqlStorage.prototype.remove = function (key) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            try {
	                _this._db.transaction(function (tx) {
	                    tx.executeSql('delete from kv where key = ?', [key], function (tx, res) {
	                        resolve();
	                    }, function (tx, err) {
	                        reject({
	                            tx: tx,
	                            err: err
	                        });
	                    });
	                }, function (err) {
	                    reject(err);
	                });
	            }
	            catch (e) {
	                reject(e);
	            }
	        });
	    };
	    SqlStorage.BACKUP_LOCAL = 2;
	    SqlStorage.BACKUP_LIBRARY = 1;
	    SqlStorage.BACKUP_DOCUMENTS = 0;
	    return SqlStorage;
	})(storage_1.StorageEngine);
	exports.SqlStorage = SqlStorage;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var translate_1 = __webpack_require__(36);
	/**
	 * @private
	 * The Translate pipe makes it easy to translate strings.
	 *
	 * @usage
	 * Translate using the current language or language set through Translate.setLanguage
	 * {{ 'Please enter your location' | translate }}
	 *
	 * Translate using a specific language
	 * {{ 'Please enter your location' | translate:"de" }}
	 */
	var TranslatePipe = (function () {
	    function TranslatePipe(translate) {
	        this.translate = translate;
	    }
	    TranslatePipe.prototype.transform = function (value, args) {
	        var lang;
	        if (args.length > 0) {
	            lang = args[0];
	        }
	        return this.translate.translate(value, lang);
	    };
	    TranslatePipe.prototype.supports = function (obj) { return true; };
	    TranslatePipe = __decorate([
	        core_1.Pipe({ name: 'translate' }),
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof translate_1.Translate !== 'undefined' && translate_1.Translate) === 'function' && _a) || Object])
	    ], TranslatePipe);
	    return TranslatePipe;
	    var _a;
	})();
	exports.TranslatePipe = TranslatePipe;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var config_1 = __webpack_require__(8);
	// iOS Mode Settings
	config_1.Config.setModeConfig('ios', {
	    activator: 'highlight',
	    actionSheetEnter: 'action-sheet-slide-in',
	    actionSheetLeave: 'action-sheet-slide-out',
	    actionSheetCancelIcon: '',
	    actionSheetDestructiveIcon: '',
	    backButtonText: 'Back',
	    backButtonIcon: 'ion-ios-arrow-back',
	    iconMode: 'ios',
	    menuType: 'reveal',
	    modalEnter: 'modal-slide-in',
	    modalLeave: 'modal-slide-out',
	    pageTransition: 'ios-transition',
	    pageTransitionDelay: 16,
	    popupEnter: 'popup-pop-in',
	    popupLeave: 'popup-pop-out',
	    tabbarPlacement: 'bottom',
	});
	// Material Design Mode Settings
	config_1.Config.setModeConfig('md', {
	    activator: 'ripple',
	    actionSheetEnter: 'action-sheet-md-slide-in',
	    actionSheetLeave: 'action-sheet-md-slide-out',
	    actionSheetCancelIcon: 'ion-md-close',
	    actionSheetDestructiveIcon: 'ion-md-trash',
	    backButtonText: '',
	    backButtonIcon: 'ion-md-arrow-back',
	    iconMode: 'md',
	    menuType: 'overlay',
	    modalEnter: 'modal-md-slide-in',
	    modalLeave: 'modal-md-slide-out',
	    pageTransition: 'md-transition',
	    pageTransitionDelay: 120,
	    popupEnter: 'popup-md-pop-in',
	    popupLeave: 'popup-md-pop-out',
	    tabbarHighlight: true,
	    tabbarPlacement: 'top',
	    tabSubPages: true,
	});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var platform_1 = __webpack_require__(9);
	var dom_1 = __webpack_require__(11);
	platform_1.Platform.register({
	    name: 'core',
	    settings: {
	        mode: 'ios',
	        keyboardHeight: 290,
	    }
	});
	platform_1.Platform.setDefault('core');
	platform_1.Platform.register({
	    name: 'mobile'
	});
	platform_1.Platform.register({
	    name: 'phablet',
	    isMatch: function (p) {
	        var smallest = Math.min(p.width(), p.height());
	        var largest = Math.max(p.width(), p.height());
	        return (smallest > 390 && smallest < 520) &&
	            (largest > 620 && largest < 800);
	    }
	});
	platform_1.Platform.register({
	    name: 'tablet',
	    isMatch: function (p) {
	        var smallest = Math.min(p.width(), p.height());
	        var largest = Math.max(p.width(), p.height());
	        return (smallest > 460 && smallest < 820) &&
	            (largest > 780 && largest < 1400);
	    }
	});
	platform_1.Platform.register({
	    name: 'android',
	    superset: 'mobile',
	    subsets: [
	        'phablet',
	        'tablet'
	    ],
	    settings: {
	        activator: function (p) {
	            // md mode defaults to use ripple activator
	            // however, under-powered devices shouldn't use ripple
	            // if this a linux device, and is using Android Chrome v36 (Android 5.0)
	            // or above then use ripple, otherwise do not use a ripple effect
	            if (p.testNavigatorPlatform(/linux/i)) {
	                var chromeVersion = p.matchUserAgentVersion(/Chrome\/(\d+).(\d+)?/);
	                if (chromeVersion) {
	                    // linux android device using modern android chrome browser gets ripple
	                    return (parseInt(chromeVersion.major, 10) < 36 ? 'none' : 'ripple');
	                }
	                // linux android device not using chrome browser checks just android's version
	                if (p.version().major < 5) {
	                    return 'none';
	                }
	            }
	            // fallback to always use ripple
	            return 'ripple';
	        },
	        hoverCSS: false,
	        keyboardHeight: 300,
	        mode: 'md',
	        scrollAssist: true,
	    },
	    isMatch: function (p) {
	        return p.isPlatform('android', 'android|silk');
	    },
	    versionParser: function (p) {
	        return p.matchUserAgentVersion(/Android (\d+).(\d+)?/);
	    }
	});
	platform_1.Platform.register({
	    name: 'ios',
	    superset: 'mobile',
	    subsets: [
	        'ipad',
	        'iphone'
	    ],
	    settings: {
	        clickBlock: true,
	        hoverCSS: false,
	        keyboardHeight: 300,
	        mode: 'ios',
	        scrollAssist: isIOSDevice,
	        swipeBackEnabled: isIOSDevice,
	        swipeBackThreshold: 40,
	        tapPolyfill: isIOSDevice,
	    },
	    isMatch: function (p) {
	        return p.isPlatform('ios', 'iphone|ipad|ipod');
	    },
	    versionParser: function (p) {
	        return p.matchUserAgentVersion(/OS (\d+)_(\d+)?/);
	    }
	});
	platform_1.Platform.register({
	    name: 'ipad',
	    superset: 'tablet',
	    settings: {
	        keyboardHeight: 500,
	    },
	    isMatch: function (p) {
	        return p.isPlatform('ipad');
	    }
	});
	platform_1.Platform.register({
	    name: 'iphone',
	    subsets: [
	        'phablet'
	    ],
	    isMatch: function (p) {
	        return p.isPlatform('iphone');
	    }
	});
	platform_1.Platform.register({
	    name: 'windowsphone',
	    superset: 'mobile',
	    subsets: [
	        'phablet',
	        'tablet'
	    ],
	    settings: {
	        mode: 'md',
	    },
	    isMatch: function (p) {
	        return p.isPlatform('windowsphone', 'windows phone');
	    },
	    versionParser: function (p) {
	        return p.matchUserAgentVersion(/Windows Phone (\d+).(\d+)?/);
	    }
	});
	platform_1.Platform.register({
	    name: 'cordova',
	    isEngine: true,
	    methods: {
	        ready: function (resolve) {
	            function isReady() {
	                document.removeEventListener('deviceready', isReady);
	                resolve();
	            }
	            dom_1.windowLoad(function () {
	                document.addEventListener('deviceready', isReady);
	            });
	        }
	    },
	    isMatch: function () {
	        return !!(window.cordova || window.PhoneGap || window.phonegap);
	    }
	});
	function isIOSDevice(p) {
	    // shortcut function to be reused internally
	    // checks navigator.platform to see if it's an actual iOS device
	    // this does not use the user-agent string because it is often spoofed
	    // an actual iPad will return true, a chrome dev tools iPad will return false
	    return p.testNavigatorPlatform(/iphone|ipad|ipod/i);
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var animation_1 = __webpack_require__(20);
	var SlideIn = (function (_super) {
	    __extends(SlideIn, _super);
	    function SlideIn(element) {
	        _super.call(this, element);
	        this
	            .easing('cubic-bezier(0.1,0.7,0.1,1)')
	            .duration(400)
	            .fromTo('translateY', '100%', '0%');
	    }
	    return SlideIn;
	})(animation_1.Animation);
	animation_1.Animation.register('slide-in', SlideIn);
	var SlideOut = (function (_super) {
	    __extends(SlideOut, _super);
	    function SlideOut(element) {
	        _super.call(this, element);
	        this
	            .easing('ease-out')
	            .duration(250)
	            .fromTo('translateY', '0%', '100%');
	    }
	    return SlideOut;
	})(animation_1.Animation);
	animation_1.Animation.register('slide-out', SlideOut);
	var FadeIn = (function (_super) {
	    __extends(FadeIn, _super);
	    function FadeIn(element) {
	        _super.call(this, element);
	        this
	            .easing('ease-in')
	            .duration(400)
	            .fadeIn();
	    }
	    return FadeIn;
	})(animation_1.Animation);
	animation_1.Animation.register('fade-in', FadeIn);
	var FadeOut = (function (_super) {
	    __extends(FadeOut, _super);
	    function FadeOut(element) {
	        _super.call(this, element);
	        this
	            .easing('ease-out')
	            .duration(250)
	            .fadeOut();
	    }
	    return FadeOut;
	})(animation_1.Animation);
	animation_1.Animation.register('fade-out', FadeOut);

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var animation_1 = __webpack_require__(20);
	var DURATION = 550;
	var EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
	var OPACITY = 'opacity';
	var TRANSLATEX = 'translateX';
	var OFF_RIGHT = '99.5%';
	var OFF_LEFT = '-33%';
	var CENTER = '0%';
	var OFF_OPACITY = 0.8;
	var SHOW_BACK_BTN_CSS = 'show-back-button';
	var IOSTransition = (function (_super) {
	    __extends(IOSTransition, _super);
	    function IOSTransition(enteringView, leavingView, opts) {
	        _super.call(this, null, opts);
	        this.duration(DURATION);
	        this.easing(EASING);
	        // what direction is the transition going
	        var backDirection = (opts.direction === 'back');
	        // do they have navbars?
	        var enteringHasNavbar = enteringView.hasNavbar();
	        var leavingHasNavbar = leavingView && leavingView.hasNavbar();
	        var enteringPage = new animation_1.Animation(enteringView.pageRef());
	        enteringPage.before.addClass('show-page');
	        this.add(enteringPage);
	        // entering content
	        var enteringContent = new animation_1.Animation(enteringView.contentRef());
	        this.add(enteringContent);
	        if (backDirection) {
	            // entering content, back direction
	            enteringContent
	                .fromTo(TRANSLATEX, OFF_LEFT, CENTER)
	                .fromTo(OPACITY, OFF_OPACITY, 1);
	        }
	        else {
	            // entering content, forward direction
	            enteringContent
	                .fromTo(TRANSLATEX, OFF_RIGHT, CENTER)
	                .fromTo(OPACITY, 1, 1);
	        }
	        if (enteringHasNavbar) {
	            // entering page has a navbar
	            var enteringNavBar = new animation_1.Animation(enteringView.navbarRef());
	            this.add(enteringNavBar);
	            var enteringTitle = new animation_1.Animation(enteringView.titleRef());
	            var enteringNavbarItems = new animation_1.Animation(enteringView.navbarItemRefs());
	            var enteringNavbarBg = new animation_1.Animation(enteringView.navbarBgRef());
	            var enteringBackButton = new animation_1.Animation(enteringView.backBtnRef());
	            enteringNavBar
	                .add(enteringTitle)
	                .add(enteringNavbarItems)
	                .add(enteringNavbarBg)
	                .add(enteringBackButton);
	            enteringTitle.fadeIn();
	            enteringNavbarItems.fadeIn();
	            // set properties depending on direction
	            if (backDirection) {
	                // entering navbar, back direction
	                enteringTitle.fromTo(TRANSLATEX, OFF_LEFT, CENTER);
	                if (enteringView.enableBack()) {
	                    // back direction, entering page has a back button
	                    enteringBackButton
	                        .before.addClass(SHOW_BACK_BTN_CSS)
	                        .fadeIn();
	                }
	            }
	            else {
	                // entering navbar, forward direction
	                enteringTitle.fromTo(TRANSLATEX, OFF_RIGHT, CENTER);
	                if (leavingHasNavbar) {
	                    // entering navbar, forward direction, and there's a leaving navbar
	                    // should just fade in, no sliding
	                    enteringNavbarBg
	                        .fromTo(TRANSLATEX, CENTER, CENTER)
	                        .fadeIn();
	                }
	                else {
	                    // entering navbar, forward direction, and there's no leaving navbar
	                    // should just slide in, no fading in
	                    enteringNavbarBg
	                        .fromTo(TRANSLATEX, OFF_RIGHT, CENTER)
	                        .fromTo(OPACITY, 1, 1);
	                }
	                if (enteringView.enableBack()) {
	                    // forward direction, entering page has a back button
	                    enteringBackButton
	                        .before.addClass(SHOW_BACK_BTN_CSS)
	                        .fadeIn();
	                    var enteringBackBtnText = new animation_1.Animation(enteringView.backBtnTextRef());
	                    enteringBackBtnText.fromTo(TRANSLATEX, '100px', '0px');
	                    enteringNavBar.add(enteringBackBtnText);
	                }
	                else {
	                    enteringBackButton.before.removeClass(SHOW_BACK_BTN_CSS);
	                }
	            }
	        }
	        // setup leaving view
	        if (leavingView) {
	            // leaving content
	            var leavingContent = new animation_1.Animation(leavingView.contentRef());
	            this.add(leavingContent);
	            if (backDirection) {
	                // leaving content, back direction
	                leavingContent
	                    .fromTo(TRANSLATEX, CENTER, '100%')
	                    .fromTo(OPACITY, 1, 1);
	            }
	            else {
	                // leaving content, forward direction
	                leavingContent
	                    .fromTo(TRANSLATEX, CENTER, OFF_LEFT)
	                    .fromTo(OPACITY, 1, OFF_OPACITY);
	            }
	            if (leavingHasNavbar) {
	                // leaving page has a navbar
	                var leavingNavBar = new animation_1.Animation(leavingView.navbarRef());
	                var leavingBackButton = new animation_1.Animation(leavingView.backBtnRef());
	                var leavingTitle = new animation_1.Animation(leavingView.titleRef());
	                var leavingNavbarItems = new animation_1.Animation(leavingView.navbarItemRefs());
	                var leavingNavbarBg = new animation_1.Animation(leavingView.navbarBgRef());
	                leavingNavBar
	                    .add(leavingBackButton)
	                    .add(leavingTitle)
	                    .add(leavingNavbarItems)
	                    .add(leavingNavbarBg);
	                this.add(leavingNavBar);
	                // fade out leaving navbar items
	                leavingBackButton.fadeOut();
	                leavingTitle.fadeOut();
	                leavingNavbarItems.fadeOut();
	                if (backDirection) {
	                    // leaving navbar, back direction
	                    leavingTitle.fromTo(TRANSLATEX, CENTER, '100%');
	                    if (enteringHasNavbar) {
	                        // leaving navbar, back direction, and there's an entering navbar
	                        // should just fade out, no sliding
	                        leavingNavbarBg
	                            .fromTo(TRANSLATEX, CENTER, CENTER)
	                            .fadeOut();
	                    }
	                    else {
	                        // leaving navbar, back direction, and there's no entering navbar
	                        // should just slide out, no fading out
	                        leavingNavbarBg
	                            .fromTo(TRANSLATEX, CENTER, '100%')
	                            .fromTo(OPACITY, 1, 1);
	                    }
	                    var leavingBackBtnText = new animation_1.Animation(leavingView.backBtnTextRef());
	                    leavingBackBtnText.fromTo(TRANSLATEX, CENTER, (300) + 'px');
	                    leavingNavBar.add(leavingBackBtnText);
	                }
	                else {
	                    // leaving navbar, forward direction
	                    leavingTitle.fromTo(TRANSLATEX, CENTER, OFF_LEFT);
	                }
	            }
	        }
	    }
	    return IOSTransition;
	})(animation_1.Animation);
	animation_1.Animation.register('ios-transition', IOSTransition);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var animation_1 = __webpack_require__(20);
	var TRANSLATEY = 'translateY';
	var OFF_BOTTOM = '40px';
	var CENTER = '0px';
	var SHOW_BACK_BTN_CSS = 'show-back-button';
	var MDTransition = (function (_super) {
	    __extends(MDTransition, _super);
	    function MDTransition(enteringView, leavingView, opts) {
	        _super.call(this, null, opts);
	        // what direction is the transition going
	        var backDirection = (opts.direction === 'back');
	        // do they have navbars?
	        var enteringHasNavbar = enteringView.hasNavbar();
	        var leavingHasNavbar = leavingView && leavingView.hasNavbar();
	        // entering content item moves in bottom to center
	        var enteringPage = new animation_1.Animation(enteringView.pageRef());
	        enteringPage.before.addClass('show-page');
	        this.add(enteringPage);
	        if (backDirection) {
	            this.duration(200).easing('cubic-bezier(0.47,0,0.745,0.715)');
	            enteringPage.fromTo(TRANSLATEY, CENTER, CENTER);
	        }
	        else {
	            this.duration(280).easing('cubic-bezier(0.36,0.66,0.04,1)');
	            enteringPage
	                .fromTo(TRANSLATEY, OFF_BOTTOM, CENTER)
	                .fadeIn();
	        }
	        if (enteringHasNavbar) {
	            var enteringNavBar = new animation_1.Animation(enteringView.navbarRef());
	            this.add(enteringNavBar);
	            var enteringBackButton = new animation_1.Animation(enteringView.backBtnRef());
	            this.add(enteringBackButton);
	            if (enteringView.enableBack()) {
	                enteringBackButton.before.addClass(SHOW_BACK_BTN_CSS);
	            }
	            else {
	                enteringBackButton.before.removeClass(SHOW_BACK_BTN_CSS);
	            }
	        }
	        // setup leaving view
	        if (leavingView && backDirection) {
	            // leaving content
	            this.duration(200).easing('cubic-bezier(0.47,0,0.745,0.715)');
	            var leavingPage = new animation_1.Animation(leavingView.pageRef());
	            this.add(leavingPage.fromTo(TRANSLATEY, CENTER, OFF_BOTTOM).fadeOut());
	        }
	    }
	    return MDTransition;
	})(animation_1.Animation);
	animation_1.Animation.register('md-transition', MDTransition);

/***/ }
/******/ ]);