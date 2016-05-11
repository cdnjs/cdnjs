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
	__export(__webpack_require__(7));
	__export(__webpack_require__(24));
	__export(__webpack_require__(83));
	__export(__webpack_require__(84));
	__export(__webpack_require__(85));
	__export(__webpack_require__(8));
	__export(__webpack_require__(89));
	__export(__webpack_require__(6));
	__export(__webpack_require__(11));
	__export(__webpack_require__(16));
	__export(__webpack_require__(13));
	__export(__webpack_require__(47));
	__export(__webpack_require__(46));
	__export(__webpack_require__(23));
	__export(__webpack_require__(93));
	// these modules don't export anything
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	__webpack_require__(97);
	__webpack_require__(98);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var core_1 = __webpack_require__(3);
	var router_1 = __webpack_require__(4);
	var http_1 = __webpack_require__(5);
	var click_block_1 = __webpack_require__(6);
	var config_1 = __webpack_require__(7);
	var events_1 = __webpack_require__(11);
	var feature_detect_1 = __webpack_require__(12);
	var form_1 = __webpack_require__(13);
	var app_1 = __webpack_require__(14);
	var keyboard_1 = __webpack_require__(16);
	var menu_controller_1 = __webpack_require__(17);
	var nav_registry_1 = __webpack_require__(18);
	var platform_1 = __webpack_require__(8);
	var dom_1 = __webpack_require__(10);
	var scroll_to_1 = __webpack_require__(19);
	var tap_click_1 = __webpack_require__(20);
	var translate_1 = __webpack_require__(23);
	/**
	 * @private
	 */
	function ionicProviders(args) {
	    if (args === void 0) { args = {}; }
	    var platform = new platform_1.Platform();
	    var navRegistry = new nav_registry_1.NavRegistry(args.pages);
	    var config = args.config;
	    if (!(config instanceof config_1.Config)) {
	        config = new config_1.Config(config);
	    }
	    platform.setUrl(window.location.href);
	    platform.setUserAgent(window.navigator.userAgent);
	    platform.setNavigatorPlatform(window.navigator.platform);
	    platform.load();
	    config.setPlatform(platform);
	    var clickBlock = new click_block_1.ClickBlock();
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
	        menu_controller_1.MenuController,
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
	    // language and direction
	    platform.setDir(document.documentElement.dir, false);
	    platform.setLang(document.documentElement.lang, false);
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
	            var scrollTo = new scroll_to_1.ScrollTo(content);
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
	        this._enabled = false;
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @ngdoc service
	* @name Config
	* @module ionic
	* @description
	* Config allows you to set the modes of your components
	*/
	var platform_1 = __webpack_require__(8);
	var util_1 = __webpack_require__(9);
	/**
	 * @name Config
	 * @demo /docs/v2/demos/config/
	 * @description
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
	 * Or change the whole mode
	 *
	 * ```ts
	 * @App({
	 *   template: `<ion-nav [root]="root"></ion-nav>`
	 *   config: {
	 *     mode: 'md'
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
	 * <ion-tabs tabbarPlacement="top">
	 *    <ion-tab tabTitle="Dash" tabIcon="pulse" [root]="tabRoot"></ion-tab>
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
	 * Custom values can be added to config, and looked up at a later point in time.
	 *
	 * ``` javascript
	 * config.set('ios', 'favoriteColor', 'green');
	 * // from any page in your app:
	 * config.get('favoriteColor'); // 'green'
	 * ```
	 *
	 *
	 * A config value can come from anywhere and be anything, but there are a default set of values.
	 *
	 *
	 * | Config property            | Default iOS Value      | Default MD Value          |
	 * |----------------------------|------------------------|---------------------------|
	 * | activator                  | highlight              | ripple                    |
	 * | actionSheetEnter           | action-sheet-slide-in  | action-sheet-md-slide-in  |
	 * | actionSheetLeave           | action-sheet-slide-out | action-sheet-md-slide-out |
	 * | alertEnter                 | alert-pop-in           | alert-md-pop-in           |
	 * | alertLeave                 | alert-pop-out          | alert-md-pop-out          |
	 * | backButtonText             | Back                   |                           |
	 * | backButtonIcon             | ion-ios-arrow-back     | ion-md-arrow-back         |
	 * | iconMode                   | ios                    | md                        |
	 * | menuType                   | reveal                 | overlay                   |
	 * | modalEnter                 | modal-slide-in         | modal-md-slide-in         |
	 * | modalLeave                 | modal-slide-out        | modal-md-slide-out        |
	 * | pageTransition             | ios-transition         | md-transition             |
	 * | pageTransitionDelay        | 16                     | 120                       |
	 * | tabbarPlacement            | bottom                 | top                       |
	 * | tabbarHighlight            |                        | top                       |
	 * | tabSubPages                |                        | true                      |
	 *
	**/
	var Config = (function () {
	    function Config(config) {
	        this._c = {};
	        this._s = {};
	        this._s = config && util_1.isObject(config) && !util_1.isArray(config) ? config : {};
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
	     * @name set
	     * @description
	     * Sets a single config value.
	     *
	     * @param {string} [platform] - The platform (either 'ios' or 'android') that the config value should apply to. Leaving this blank will apply the config value to all platforms.
	     * @param {string} [key] - The key used to look up the value at a later point in time.
	     * @param {string} [value] - The config value being stored.
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
	     * @name get
	     * @description
	     * Returns a single config value, given a key.
	     *
	     * @param {string} [key] - the key for the config value
	     */
	    Config.prototype.get = function (key) {
	        if (!util_1.isDefined(this._c[key])) {
	            if (!util_1.isDefined(key)) {
	                throw 'config key is not defined';
	            }
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
	            if (this.platform) {
	                var queryStringValue = this.platform.query('ionic' + key.toLowerCase());
	                if (util_1.isDefined(queryStringValue)) {
	                    return this._c[key] = (queryStringValue === 'true' ? true : queryStringValue === 'false' ? false : queryStringValue);
	                }
	                // check the platform settings object for this value
	                // loop though each of the active platforms
	                // array of active platforms, which also knows the hierarchy,
	                // with the last one the most important
	                var activePlatformKeys = this.platform.platforms();
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
	            return this._c[key](this.platform);
	        }
	        return this._c[key];
	    };
	    /**
	     * @name getBoolean
	     * @description
	     * Same as `get()`, however always returns a boolean value.
	     *
	     * @param {string} [key] - the key for the config value
	     */
	    Config.prototype.getBoolean = function (key) {
	        var val = this.get(key);
	        return (val || val === 'true') ? true : false;
	    };
	    /**
	     * @private
	     */
	    Config.prototype.setPlatform = function (platform) {
	        this.platform = platform;
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var util_1 = __webpack_require__(9);
	var dom_1 = __webpack_require__(10);
	/**
	 * @name Platform
	 * @description
	 * Platform returns the availble information about your current platform.
	 * Platforms in Ionic 2 are much more complex then in V1, returns not just a single platform,
	 * but a hierarchy of information, such as a devices OS, phone vs tablet, or mobile vs browser.
	 * With this information you can completely custimize your app to fit any device and platform.
	 *
	 * @usage
	 * ```ts
	 * import {Platform} 'ionic/ionic';
	 * export MyClass {
	 *    constructor(platform: Platform){
	 *      this.platform = platform;
	 *    }
	 * }
	 * ```
	 * @demo /docs/v2/demos/platform/
	 */
	var Platform = (function () {
	    function Platform(platforms) {
	        var _this = this;
	        if (platforms === void 0) { platforms = []; }
	        this._versions = {};
	        this._onResizes = [];
	        this._platforms = platforms;
	        this._readyPromise = new Promise(function (res) { _this._readyResolve = res; });
	    }
	    // Methods
	    // **********************************************
	    /**
	     * @param {string} platformName
	     * @returns {boolean} returns true/false based on platform you place
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
	     * Returns an object containing information about the paltform
	     *
	     * ```
	     * import {Platform} 'ionic/ionic';
	     * export MyClass {
	     *    constructor(platform: Platform){
	     *      this.platform = platform;
	     *      console.log(this.platform.versions());
	     *    }
	     * }
	     * ```
	  
	     * @param {string} [platformName] optional platformName
	     * @returns {object} An object with various platform info
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
	    /**
	     * @private
	     */
	    Platform.prototype.version = function () {
	        for (var platformName in this._versions) {
	            if (this._versions[platformName]) {
	                return this._versions[platformName];
	            }
	        }
	        return {};
	    };
	    /**
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
	     * @returns {promise} Returns a promsie when device ready has fired
	     */
	    Platform.prototype.ready = function () {
	        return this._readyPromise;
	    };
	    /**
	     * @private
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
	    /**
	    * Set the app's language direction, which will update the `dir` attribute
	    * on the app's root `<html>` element. We recommend the app's `index.html`
	    * file already has the correct `dir` attribute value set, such as
	    * `<html dir="ltr">` or `<html dir="rtl">`. This method is useful if the
	    * direction needs to be dynamically changed per user/session.
	    * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
	    * @param {string} dir  Examples: `rtl`, `ltr`
	    */
	    Platform.prototype.setDir = function (dir, updateDocument) {
	        this._dir = (dir || '').toLowerCase();
	        if (updateDocument !== false) {
	            document.documentElement.setAttribute('dir', dir);
	        }
	    };
	    /**
	     * Returns app's language direction.
	     * We recommend the app's `index.html` file already has the correct `dir`
	     * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
	     * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
	     * @returns {string}
	     */
	    Platform.prototype.dir = function () {
	        return this._dir;
	    };
	    /**
	     * Returns if this app is using right-to-left language direction or not.
	     * We recommend the app's `index.html` file already has the correct `dir`
	     * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
	     * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
	     * @returns {boolean}
	     */
	    Platform.prototype.isRTL = function () {
	        return (this._dir === 'rtl');
	    };
	    /**
	    * Set the app's language and optionally the country code, which will update
	    * the `lang` attribute on the app's root `<html>` element.
	    * We recommend the app's `index.html` file already has the correct `lang`
	    * attribute value set, such as `<html lang="en">`. This method is useful if
	    * the language needs to be dynamically changed per user/session.
	    * [W3C: Declaring language in HTML](http://www.w3.org/International/questions/qa-html-language-declarations)
	    * @param {string} language  Examples: `en-US`, `en-GB`, `ar`, `de`, `zh`, `es-MX`
	    */
	    Platform.prototype.setLang = function (language, updateDocument) {
	        this._lang = language;
	        if (updateDocument !== false) {
	            document.documentElement.setAttribute('lang', language);
	        }
	    };
	    /**
	     * Returns app's language and optional country code.
	     * We recommend the app's `index.html` file already has the correct `lang`
	     * attribute value set, such as `<html lang="en">`.
	     * [W3C: Declaring language in HTML](http://www.w3.org/International/questions/qa-html-language-declarations)
	     * @returns {string}
	     */
	    Platform.prototype.lang = function () {
	        return this._lang;
	    };
	    // Methods meant to be overridden by the engine
	    // **********************************************
	    // Provided NOOP methods so they do not error when
	    // called by engines (the browser) doesn't provide them
	    /**
	    * @private
	    */
	    Platform.prototype.on = function () { };
	    /**
	    * @private
	    */
	    Platform.prototype.onHardwareBackButton = function () { };
	    /**
	    * @private
	    */
	    Platform.prototype.registerBackButtonAction = function () { };
	    /**
	    * @private
	    */
	    Platform.prototype.exitApp = function () { };
	    /**
	    * @private
	    */
	    Platform.prototype.fullScreen = function () { };
	    /**
	    * @private
	    */
	    Platform.prototype.showStatusBar = function () { };
	    // Getter/Setter Methods
	    // **********************************************
	    /**
	    * @private
	    */
	    Platform.prototype.setUrl = function (url) {
	        this._url = url;
	        this._qs = util_1.getQuerystring(url);
	    };
	    /**
	    * @private
	    */
	    Platform.prototype.url = function () {
	        return this._url;
	    };
	    /**
	    * @private
	    */
	    Platform.prototype.query = function (key) {
	        return (this._qs || {})[key];
	    };
	    /**
	    * @private
	    */
	    Platform.prototype.setUserAgent = function (userAgent) {
	        this._ua = userAgent;
	    };
	    /**
	    * @private
	    */
	    Platform.prototype.userAgent = function () {
	        return this._ua || '';
	    };
	    /**
	    * @private
	    */
	    Platform.prototype.setNavigatorPlatform = function (navigatorPlatform) {
	        this._bPlt = navigatorPlatform;
	    };
	    /**
	    * @private
	    */
	    Platform.prototype.navigatorPlatform = function () {
	        return this._bPlt || '';
	    };
	    /**
	    * @private
	    */
	    Platform.prototype.width = function () {
	        return dom_1.windowDimensions().width;
	    };
	    /**
	    * @private
	    */
	    Platform.prototype.height = function () {
	        return dom_1.windowDimensions().height;
	    };
	    /**
	    * @private
	    */
	    Platform.prototype.isPortrait = function () {
	        return this.width() < this.height();
	    };
	    /**
	    * @private
	    */
	    Platform.prototype.isLandscape = function () {
	        return !this.isPortrait();
	    };
	    /**
	    * @private
	    */
	    Platform.prototype.windowResize = function () {
	        var self = this;
	        clearTimeout(self._resizeTm);
	        self._resizeTm = setTimeout(function () {
	            dom_1.flushDimensionCache();
	            for (var i = 0; i < self._onResizes.length; i++) {
	                try {
	                    self._onResizes[i]();
	                }
	                catch (e) {
	                    void 0;
	                }
	            }
	        }, 200);
	    };
	    /**
	     * @private
	     * @returns Unregister function
	     */
	    Platform.prototype.onResize = function (cb) {
	        var self = this;
	        self._onResizes.push(cb);
	        return function () {
	            var index = self._onResizes.indexOf(cb);
	            if (index > -1) {
	                self._onResizes.splice(index, 1);
	            }
	        };
	    };
	    // Platform Registry
	    // **********************************************
	    /**
	     * @private
	     */
	    Platform.register = function (platformConfig) {
	        platformRegistry[platformConfig.name] = platformConfig;
	    };
	    /**
	    * @private
	    */
	    Platform.registry = function () {
	        return platformRegistry;
	    };
	    /**
	     * @private
	     */
	    Platform.get = function (platformName) {
	        return platformRegistry[platformName] || {};
	    };
	    /**
	     * @private
	     */
	    Platform.setDefault = function (platformName) {
	        platformDefault = platformName;
	    };
	    /**
	     * @private
	     */
	    Platform.prototype.testQuery = function (queryValue, queryTestValue) {
	        var valueSplit = queryValue.toLowerCase().split(';');
	        return valueSplit.indexOf(queryTestValue) > -1;
	    };
	    /**
	     * @private
	     */
	    Platform.prototype.testUserAgent = function (userAgentExpression) {
	        var rgx = new RegExp(userAgentExpression, 'i');
	        return rgx.test(this._ua || '');
	    };
	    /**
	     * @private
	     */
	    Platform.prototype.testNavigatorPlatform = function (navigatorPlatformExpression) {
	        var rgx = new RegExp(navigatorPlatformExpression, 'i');
	        return rgx.test(this._bPlt);
	    };
	    /**
	     * @private
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
	     * @private
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
	     * @private
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
	                engineNode.child = rootPlatformNode;
	                rootPlatformNode.parent = engineNode;
	                rootPlatformNode = engineNode;
	                // add any events which the engine would provide
	                // for example, Cordova provides its own ready event
	                var engineMethods = engineNode.methods();
	                engineMethods._engineReady = engineMethods.ready;
	                delete engineMethods.ready;
	                util_1.assign(this, engineMethods);
	            }
	            var platformNode = rootPlatformNode;
	            while (platformNode) {
	                insertSuperset(platformNode);
	                platformNode = platformNode.child;
	            }
	            // make sure the root noot is actually the root
	            // incase a node was inserted before the root
	            platformNode = rootPlatformNode.parent;
	            while (platformNode) {
	                rootPlatformNode = platformNode;
	                platformNode = platformNode.parent;
	            }
	            platformNode = rootPlatformNode;
	            while (platformNode) {
	                // set the array of active platforms with
	                // the last one in the array the most important
	                this._platforms.push(platformNode.name());
	                // get the platforms version if a version parser was provided
	                this._versions[platformNode.name()] = platformNode.version(this);
	                // go to the next platform child
	                platformNode = platformNode.child;
	            }
	        }
	        if (this._platforms.indexOf('mobile') > -1 && this._platforms.indexOf('cordova') === -1) {
	            this._platforms.push('mobileweb');
	        }
	    };
	    /**
	     * @private
	     */
	    Platform.prototype.matchPlatform = function (platformName) {
	        // build a PlatformNode and assign config data to it
	        // use it's getRoot method to build up its hierarchy
	        // depending on which platforms match
	        var platformNode = new PlatformNode(platformName);
	        var rootNode = platformNode.getRoot(this);
	        if (rootNode) {
	            rootNode.depth = 0;
	            var childPlatform = rootNode.child;
	            while (childPlatform) {
	                rootNode.depth++;
	                childPlatform = childPlatform.child;
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
	        supersetPlatform.parent = platformNode.parent;
	        supersetPlatform.child = platformNode;
	        if (supersetPlatform.parent) {
	            supersetPlatform.parent.child = supersetPlatform;
	        }
	        platformNode.parent = supersetPlatform;
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
	                platform.child = this;
	                rootPlatform = platform.getRoot(p);
	                if (rootPlatform) {
	                    this.parent = platform;
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
/* 9 */
/***/ function(module, exports) {

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
	 * The assign() method is used to copy the values of all enumerable own
	 * properties from one or more source objects to a target object. It will
	 * return the target object. When available, this method will use
	 * `Object.assign()` under-the-hood.
	 * @param target  The target object
	 * @param source(s)  The source object
	 */
	function assign() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i - 0] = arguments[_i];
	    }
	    if (typeof Object.assign !== 'function') {
	        // use the old-school shallow extend method
	        return _baseExtend(args[0], [].slice.call(args, 1), false);
	    }
	    // use the built in ES6 Object.assign method
	    return Object.assign.apply(null, args);
	}
	exports.assign = assign;
	/**
	 * Do a deep extend (merge).
	 * @param dst the destination
	 * @param ... the param objects
	 */
	function merge(dst) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
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
	function debounce(fn, wait, immediate) {
	    if (immediate === void 0) { immediate = false; }
	    var timeout, args, context, timestamp, result;
	    return function () {
	        context = this;
	        args = arguments;
	        timestamp = Date.now();
	        var later = function () {
	            var last = Date.now() - timestamp;
	            if (last < wait) {
	                timeout = setTimeout(later, wait - last);
	            }
	            else {
	                timeout = null;
	                if (!immediate)
	                    result = fn.apply(context, args);
	            }
	        };
	        var callNow = immediate && !timeout;
	        if (!timeout) {
	            timeout = setTimeout(later, wait);
	        }
	        if (callNow)
	            result = fn.apply(context, args);
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
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
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
	exports.isTrueProperty = function (val) {
	    if (typeof val === 'string') {
	        val = val.toLowerCase().trim();
	        return (val === 'true' || val === '');
	    }
	    return !!val;
	};
	/**
	 * Convert a string in the format thisIsAString to a slug format this-is-a-string
	 */
	function pascalCaseToDashCase(val) {
	    if (val === void 0) { val = ''; }
	    return val.charAt(0).toLowerCase() + val.substring(1).replace(/[A-Z]/g, function (match) {
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
	 * Grab all query strings keys and values.
	 * @param url
	 */
	function getQuerystring(url) {
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
	    }
	    return queryParams;
	}
	exports.getQuerystring = getQuerystring;
	/**
	 * Throttle the given fun, only allowing it to be
	 * called at most every `wait` ms.
	 */
	function throttle(fn, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    options || (options = {});
	    var later = function () {
	        previous = options.leading === false ? 0 : Date.now();
	        timeout = null;
	        result = fn.apply(context, args);
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
	            result = fn.apply(context, args);
	        }
	        else if (!timeout && options.trailing !== false) {
	            timeout = setTimeout(later, remaining);
	        }
	        return result;
	    };
	}
	exports.throttle = throttle;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var win = window;
	var doc = document;
	var docEle = doc.documentElement;
	// RequestAnimationFrame Polyfill (Android 4.3 and below)
	/*! @author Paul Irish */
	/*! @source https://gist.github.com/paulirish/1579671 */
	(function () {
	    var rafLastTime = 0;
	    if (!win.requestAnimationFrame) {
	        win.requestAnimationFrame = function (callback, element) {
	            var currTime = Date.now();
	            var timeToCall = Math.max(0, 16 - (currTime - rafLastTime));
	            var id = window.setTimeout(function () {
	                callback(currTime + timeToCall);
	            }, timeToCall);
	            rafLastTime = currTime + timeToCall;
	            return id;
	        };
	    }
	    if (!win.cancelAnimationFrame) {
	        win.cancelAnimationFrame = function (id) { clearTimeout(id); };
	    }
	})();
	exports.raf = win.requestAnimationFrame.bind(win);
	exports.cancelRaf = win.cancelAnimationFrame.bind(win);
	function rafFrames(framesToWait, callback) {
	    framesToWait = Math.ceil(framesToWait);
	    if (framesToWait < 2) {
	        exports.raf(callback);
	    }
	    else {
	        setTimeout(function () {
	            exports.raf(callback);
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
	        if (docEle.style[keys[i]] !== undefined) {
	            exports.CSS.transform = keys[i];
	            break;
	        }
	    }
	    // transition
	    keys = ['webkitTransition', 'mozTransition', 'msTransition', 'transition'];
	    for (i = 0; i < keys.length; i++) {
	        if (docEle.style[keys[i]] !== undefined) {
	            exports.CSS.transition = keys[i];
	            break;
	        }
	    }
	    // The only prefix we care about is webkit for transitions.
	    var isWebkit = exports.CSS.transition.indexOf('webkit') > -1;
	    // transition duration
	    exports.CSS.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration';
	    // transition timing function
	    exports.CSS.transitionTimingFn = (isWebkit ? '-webkit-' : '') + 'transition-timing-function';
	    // To be sure transitionend works everywhere, include *both* the webkit and non-webkit events
	    exports.CSS.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend';
	})();
	function transitionEnd(el, callback) {
	    if (el) {
	        function unregister() {
	            exports.CSS.transitionEnd.split(' ').forEach(function (eventName) {
	                el.removeEventListener(eventName, onEvent);
	            });
	        }
	        function onEvent(ev) {
	            if (el === ev.target) {
	                unregister();
	                callback(ev);
	            }
	        }
	        exports.CSS.transitionEnd.split(' ').forEach(function (eventName) {
	            el.addEventListener(eventName, onEvent);
	        });
	        return unregister;
	    }
	}
	exports.transitionEnd = transitionEnd;
	function ready(callback) {
	    var promise = null;
	    if (!callback) {
	        // a callback wasn't provided, so let's return a promise instead
	        promise = new Promise(function (resolve) { callback = resolve; });
	    }
	    if (doc.readyState === 'complete' || doc.readyState === 'interactive') {
	        callback();
	    }
	    else {
	        function completed() {
	            doc.removeEventListener('DOMContentLoaded', completed, false);
	            win.removeEventListener('load', completed, false);
	            callback();
	        }
	        doc.addEventListener('DOMContentLoaded', completed, false);
	        win.addEventListener('load', completed, false);
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
	    if (doc.readyState === 'complete') {
	        callback();
	    }
	    else {
	        function completed() {
	            win.removeEventListener('load', completed, false);
	            callback();
	        }
	        win.addEventListener('load', completed, false);
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
	    return !!(ele && (doc.activeElement === ele));
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
	    var ele = doc.activeElement;
	    if (isTextInput(ele)) {
	        return (ele.parentElement.querySelector(':focus') === ele);
	    }
	    return false;
	}
	exports.hasFocusedTextInput = hasFocusedTextInput;
	var skipInputAttrsReg = /^(value|checked|disabled|type|class|style|id)$/i;
	function copyInputAttributes(srcElement, destElement) {
	    // copy attributes from one element to another
	    // however, skip over a few of them as they're already
	    // handled in the angular world
	    var attrs = srcElement.attributes;
	    for (var i = 0; i < attrs.length; i++) {
	        var attr = attrs[i];
	        if (!skipInputAttrsReg.test(attr.name)) {
	            destElement.setAttribute(attr.name, attr.value);
	        }
	    }
	}
	exports.copyInputAttributes = copyInputAttributes;
	var matchesFn;
	var matchesMethods = ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector'];
	matchesMethods.some(function (fn) {
	    if (typeof docEle[fn] == 'function') {
	        matchesFn = fn;
	        return true;
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
	/**
	 * Get the element offsetWidth and offsetHeight. Values are cached
	 * to reduce DOM reads. Cache is cleared on a window resize.
	 * @param {TODO} ele  TODO
	 */
	function getDimensions(ele, id) {
	    var dimensions = dimensionCache[id];
	    if (!dimensions) {
	        // make sure we got good values before caching
	        if (ele.offsetWidth && ele.offsetHeight) {
	            dimensions = dimensionCache[id] = {
	                width: ele.offsetWidth,
	                height: ele.offsetHeight,
	                left: ele.offsetLeft,
	                top: ele.offsetTop
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
	        if (win.innerWidth && win.innerHeight) {
	            dimensionCache.win = {
	                width: win.innerWidth,
	                height: win.innerHeight
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


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * @name Events
	 * @description
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
	 * @demo /docs/v2/demos/events/
	 */
	var Events = (function () {
	    function Events() {
	        this._channels = [];
	    }
	    /**
	     * Subscribe to an event topic. Events that get posted to that topic will trigger the provided handler.
	     *
	     * @param {string} topic the topic to subscribe to
	     * @param {function} handler the event handler
	     */
	    Events.prototype.subscribe = function (topic) {
	        var _this = this;
	        var handlers = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            handlers[_i - 1] = arguments[_i];
	        }
	        if (!this._channels[topic]) {
	            this._channels[topic] = [];
	        }
	        handlers.forEach(function (handler) {
	            _this._channels[topic].push(handler);
	        });
	    };
	    /**
	     * Unsubscribe from the given topic. Your handler will no longer receive events published to this topic.
	     *
	     * @param {string} topic the topic to unsubscribe from
	     * @param {function} handler the event handler
	     *
	     * @return true if a handler was removed
	     */
	    Events.prototype.unsubscribe = function (topic, handler) {
	        var t = this._channels[topic];
	        if (!t) {
	            // Wasn't found, wasn't removed
	            return false;
	        }
	        if (!handler) {
	            // Remove all handlers for this topic
	            delete this._channels[topic];
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
	            delete this._channels[topic];
	        }
	        return true;
	    };
	    /**
	     * Publish an event to the given topic.
	     *
	     * @param {string} topic the topic to publish to
	     * @param {any} eventData the data to send as the event
	     */
	    Events.prototype.publish = function (topic) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var t = this._channels[topic];
	        if (!t) {
	            return null;
	        }
	        var responses = [];
	        t.forEach(function (handler) {
	            responses.push(handler(args));
	        });
	        return responses;
	    };
	    return Events;
	})();
	exports.Events = Events;


/***/ },
/* 12 */
/***/ function(module, exports) {

	var FeatureDetect = (function () {
	    function FeatureDetect() {
	        this._results = {};
	    }
	    FeatureDetect.prototype.run = function (window, document) {
	        for (var name_1 in featureDetects) {
	            this._results[name_1] = featureDetects[name_1](window, document, document.body);
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
/* 13 */
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
	 */
	var Form = (function () {
	    function Form() {
	        this._focused = null;
	        this._ids = -1;
	        this._inputs = [];
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
	        void 0;
	        var activeElement = document.activeElement;
	        if (activeElement) {
	            activeElement.blur();
	        }
	        this._blur.focus();
	    };
	    Form.prototype.setAsFocused = function (input) {
	        this._focused = input;
	    };
	    /**
	     * Focuses the next input element, if it exists.
	     */
	    Form.prototype.tabFocus = function (currentInput) {
	        var index = this._inputs.indexOf(currentInput);
	        if (index > -1 && (index + 1) < this._inputs.length) {
	            var nextInput = this._inputs[index + 1];
	            if (nextInput !== this._focused) {
	                void 0;
	                return nextInput.initFocus();
	            }
	        }
	        index = this._inputs.indexOf(this._focused);
	        if (index > 0) {
	            var previousInput = this._inputs[index - 1];
	            if (previousInput) {
	                void 0;
	                previousInput.initFocus();
	            }
	        }
	    };
	    Form.prototype.nextId = function () {
	        return ++this._ids;
	    };
	    Form = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Form);
	    return Form;
	})();
	exports.Form = Form;


/***/ },
/* 14 */
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
	var browser_1 = __webpack_require__(15);
	var config_1 = __webpack_require__(7);
	var click_block_1 = __webpack_require__(6);
	var dom_1 = __webpack_require__(10);
	/**
	 * @private
	 * Component registry service.  For more information on registering
	 * components see the [IdRef API reference](../id/IdRef/).
	 */
	var IonicApp = (function () {
	    function IonicApp(_config, _clickBlock, _zone) {
	        this._config = _config;
	        this._clickBlock = _clickBlock;
	        this._zone = _zone;
	        this._titleSrv = new browser_1.Title();
	        this._title = '';
	        this._disTime = 0;
	        this._scrollTime = 0;
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
	     * @private
	     * Sets if the app is currently enabled or not, meaning if it's
	     * available to accept new user commands. For example, this is set to `false`
	     * while views transition, a modal slides up, an action-sheet
	     * slides up, etc. After the transition completes it is set back to `true`.
	     * @param {boolean} isEnabled
	     * @param {boolean} fallback  When `isEnabled` is set to `false`, this argument
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
	     * @private
	     * Boolean if the app is actively enabled or not.
	     * @return {boolean}
	     */
	    IonicApp.prototype.isEnabled = function () {
	        return (this._disTime < Date.now());
	    };
	    /**
	     * @private
	     */
	    IonicApp.prototype.setScrolling = function () {
	        this._scrollTime = Date.now();
	    };
	    /**
	     * @private
	     * Boolean if the app is actively scrolling or not.
	     * @return {boolean}
	     */
	    IonicApp.prototype.isScrolling = function () {
	        return (this._scrollTime + 64 > Date.now());
	    };
	    /**
	     * @private
	     * Register a known component with a key, for easy lookups later.
	     * @param {string} id  The id to use to register the component
	     * @param {object} component  The component to register
	     */
	    IonicApp.prototype.register = function (id, component) {
	        this.components[id] = component;
	    };
	    /**
	     * @private
	     * Unregister a known component with a key.
	     * @param {string} id  The id to use to unregister
	     */
	    IonicApp.prototype.unregister = function (id) {
	        delete this.components[id];
	    };
	    /**
	     * @private
	     * Get a registered component with the given type (returns the first)
	     * @param {object} cls the type to search for
	     * @return {object} the matching component, or undefined if none was found
	     */
	    IonicApp.prototype.getRegisteredComponent = function (cls) {
	        for (var key in this.components) {
	            var component = this.components[key];
	            if (component instanceof cls) {
	                return component;
	            }
	        }
	    };
	    /**
	     * @private
	     * Get the component for the given key.
	     * @param {string} id  TODO
	     * @return {object} TODO
	     */
	    IonicApp.prototype.getComponent = function (id) {
	        // deprecated warning
	        if (/menu/i.test(id)) {
	            void 0;
	        }
	        return this.components[id];
	    };
	    IonicApp = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [config_1.Config, click_block_1.ClickBlock, core_1.NgZone])
	    ], IonicApp);
	    return IonicApp;
	})();
	exports.IonicApp = IonicApp;


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("angular2")["platform"]["browser"];

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
	var config_1 = __webpack_require__(7);
	var form_1 = __webpack_require__(13);
	var dom_1 = __webpack_require__(10);
	/**
	 * @name Keyboard
	 * @description
	 * The `Keyboard` class allows you to work with the keyboard events provide by the Ionic keyboard plugin.
	 *
	 * @usage
	 * ```ts
	 * export class MyClass{
	 *  constructor(keyboard: Keyboard){
	 *    this.keyboard = keyboard;
	 *  }
	 * }
	 *
	 * ```
	 */
	var Keyboard = (function () {
	    function Keyboard(config, _form, _zone) {
	        var _this = this;
	        this._form = _form;
	        this._zone = _zone;
	        _zone.runOutsideAngular(function () {
	            _this.focusOutline(config.get('focusOutline'), document);
	        });
	    }
	    /**
	     * Chech to see if the keyboard is open or not.
	     *
	     * ```ts
	     * export class MyClass{
	     *  constructor(keyboard: Keyboard){
	     *    this.keyboard = keyboard;
	     *  }
	     *  keyboardCheck(){
	     *    setTimeout(()  => console.log('is the keyboard open ', this.keyboard.isOpen()));
	     *  }
	     * }
	     *
	     * ```
	     *
	     * @return {boolean} returns a true or flase value if the keyboard is open or not
	     */
	    Keyboard.prototype.isOpen = function () {
	        return dom_1.hasFocusedTextInput();
	    };
	    /**
	     * When the keyboard is closed, call any methods you want
	     *
	     * ```ts
	     * export class MyClass{
	     *  constructor(keyboard: Keyboard){
	     *    this.keyboard = keyboard;
	     *    this.keyboard.onClose(this.closeCallback);
	     *  }
	     *  closeCallback(){
	     *     // call what ever functionality you want on keyboard close
	     *     console.log('Closing time");
	     *  }
	     * }
	     *
	     * ```
	     * @param {function} callback method you want to call when the keyboard has been closed
	     * @return {function} returns a callback that gets fired when the keyboard is closed
	     */
	    Keyboard.prototype.onClose = function (callback, pollingInternval) {
	        if (pollingInternval === void 0) { pollingInternval = KEYBOARD_CLOSE_POLLING; }
	        void 0;
	        var self = this;
	        var checks = 0;
	        var promise = null;
	        if (!callback) {
	            // a callback wasn't provided, so let's return a promise instead
	            promise = new Promise(function (resolve) { callback = resolve; });
	        }
	        self._zone.runOutsideAngular(function () {
	            function checkKeyboard() {
	                void 0;
	                if (!self.isOpen() || checks > 100) {
	                    dom_1.rafFrames(30, function () {
	                        self._zone.run(function () {
	                            void 0;
	                            callback();
	                        });
	                    });
	                }
	                else {
	                    setTimeout(checkKeyboard, pollingInternval);
	                }
	                checks++;
	            }
	            setTimeout(checkKeyboard, pollingInternval);
	        });
	        return promise;
	    };
	    /**
	     * Progamatically close they keyboard
	     *
	     */
	    Keyboard.prototype.close = function () {
	        var _this = this;
	        void 0;
	        dom_1.raf(function () {
	            if (dom_1.hasFocusedTextInput()) {
	                // only focus out when a text input has focus
	                _this._form.focusOut();
	            }
	        });
	    };
	    /**
	     * @private
	     */
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
	            self._zone.runOutsideAngular(function () {
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
	        __metadata('design:paramtypes', [config_1.Config, form_1.Form, core_1.NgZone])
	    ], Keyboard);
	    return Keyboard;
	})();
	exports.Keyboard = Keyboard;
	var KEYBOARD_CLOSE_POLLING = 150;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * @name Menu
	 * @description
	 * _For basic Menu usage, see the [Menu section](../../../../components/#menus)
	 * of the Component docs._
	 *
	 * Menu is a side-menu interface that can be dragged out or toggled to open or closed.
	 * An Ionic app can have numerous menus, all of which can be controlled within
	 * template HTML, or programmatically.
	 *
	 * @usage
	 * In order to use Menu, you must specify a [reference](https://angular.io/docs/ts/latest/guide/user-input.html#local-variables)
	 * to the content element that Menu should listen on for drag events, using the `content` property.
	 * This is telling the menu which content the menu is attached to, so it knows which element to
	 * move over, and to respond to drag events. Note that a **menu is a sibling to its content**.
	 *
	 * ```html
	 * <ion-menu [content]="mycontent">
	 *   <ion-content>
	 *     <ion-list>
	 *     ...
	 *     </ion-list>
	 *   </ion-content>
	 * </ion-menu>
	 *
	 * <ion-nav #mycontent [root]="rootPage"></ion-nav>
	 * ```
	 *
	 * By default, Menus are on the left, but this can be overridden with the `side`
	 * property:
	 *
	 * ```html
	 * <ion-menu side="right" [content]="mycontent">...</ion-menu>
	 * ```
	 *
	 *
	 * ### Programmatic Interaction
	 *
	 * To programmatically interact with any menu, you can inject the `MenuController`
	 * provider into any component or directive. This makes it easy get ahold of and
	 * control the correct menu instance. By default Ionic will find the app's menu
	 * without requiring a menu ID.
	 *
	 * ```ts
	 * import{Page, MenuController} from 'ionic/ionic';
	 * @Page({...})
	 * export class MyPage {
	 *  constructor(menu: MenuController) {
	 *    this.menu = menu;
	 *  }
	 *
	 *  openMenu() {
	 *    this.menu.open();
	 *  }
	 *
	 * }
	 * ```
	 *
	 * Note that if you want to easily toggle or close a menu just from a page's
	 * template, you can use `menuToggle` and/or `menuClose` to accomplish the same
	 * tasks as above.
	 *
	 *
	 * ### Apps With Left And Right Menus
	 *
	 * For apps with a left and right menu, you can control the desired
	 * menu by passing in the side of the menu.
	 *
	 * ```html
	 * <ion-menu side="left" [content]="mycontent">...</ion-menu>
	 * <ion-menu side="right" [content]="mycontent">...</ion-menu>
	 * <ion-nav #mycontent [root]="rootPage"></ion-nav>
	 * ```
	 *
	 * ```ts
	 *  openLeftMenu() {
	 *    this.menu.open('left');
	 *  }
	 *
	 *  closeRightMenu() {
	 *    this.menu.close('right');
	 *  }
	 * ```
	 *
	 *
	 * ### Apps With Multiple, Same Side Menus
	 *
	 * Since more than one menu on a the same side is possible, and you wouldn't want
	 * both to be open at the same time, an app can decide which menu should be enabled.
	 * For apps with multiple menus on the same side, it's required to give each menu a
	 * unique ID. In the example below, we're saying that the left menu with the
	 * `authenticated` id should be enabled, and the left menu with the `unauthenticated`
	 * id be disabled.
	 *
	 * ```html
	 * <ion-menu id="authenticated" side="left" [content]="mycontent">...</ion-menu>
	 * <ion-menu id="unauthenticated" side="left" [content]="mycontent">...</ion-menu>
	 * <ion-nav #mycontent [root]="rootPage"></ion-nav>
	 * ```
	 *
	 * ```ts
	 *  enableAuthenticatedMenu() {
	 *    this.menu.enable(true, 'authenticated');
	 *    this.menu.enable(false, 'unauthenticated');
	 *  }
	 * ```
	 *
	 * Note that if an app only had one menu, there is no reason to pass a menu id.
	 *
	 *
	 * ### Menu Types
	 *
	 * Menu supports two display types: `overlay`, `reveal` and `push`. Overlay
	 * is the traditional Material Design drawer type, and Reveal is the traditional
	 * iOS type. By default, menus will use to the correct type for the platform,
	 * but this can be overriden using the `type` property:
	 *
	 * ```html
	 * <ion-menu type="overlay" [content]="mycontent">...</ion-menu>
	 * ```
	 *
	 *
	 * ### Persistent Menus
	 *
	 * By default, menus, and specifically their menu toggle buttons in the navbar,
	 * only show on the root page within its `NavController`. For example, on Page 1
	 * the menu toggle will show in the navbar. However, when navigating to Page 2,
	 * because it is not the root Page for that `NavController`, the menu toggle
	 * will not show in the navbar.
	 *
	 * Not showing the menu toggle button in the navbar is commonly seen within
	 * native apps after navigating past the root Page. However, it is still possible
	 * to always show the menu toggle button in the navbar by setting
	 * `persistent="true"` on the `ion-menu` component.
	 *
	 * ```html
	 * <ion-menu persistent="true" [content]="content">...</ion-menu>
	 * ```
	 *
	 * @demo /docs/v2/demos/menu/
	 *
	 * @see {@link /docs/v2/components#menus Menu Component Docs}
	 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
	 * @see {@link ../../nav/Nav Nav API Docs}
	 *
	 */
	var MenuController = (function () {
	    function MenuController() {
	        this._menus = [];
	    }
	    /**
	     * Progamatically open the Menu.
	     * @return {Promise} returns a promise when the menu is fully opened
	     */
	    MenuController.prototype.open = function (menuId) {
	        var menu = this.get(menuId);
	        if (menu) {
	            return menu.open();
	        }
	        return Promise.resolve(false);
	    };
	    /**
	     * Progamatically close the Menu. If no `menuId` is given as the first
	     * argument then it'll close any menu which is open. If a `menuId`
	     * is given then it'll close that exact menu.
	     * @param {string} [menuId]  Optionally get the menu by its id, or side.
	     * @return {Promise} returns a promise when the menu is fully closed
	     */
	    MenuController.prototype.close = function (menuId) {
	        var menu;
	        if (menuId) {
	            // find the menu by its id
	            menu = this.get(menuId);
	        }
	        else {
	            // find the menu that is open
	            menu = this._menus.find(function (m) { return m.isOpen; });
	        }
	        if (menu) {
	            // close the menu
	            return menu.close();
	        }
	        return Promise.resolve(false);
	    };
	    /**
	     * Toggle the menu. If it's closed, it will open, and if opened, it
	     * will close.
	     * @param {string} [menuId]  Optionally get the menu by its id, or side.
	     * @return {Promise} returns a promise when the menu has been toggled
	     */
	    MenuController.prototype.toggle = function (menuId) {
	        var menu = this.get(menuId);
	        if (menu) {
	            return menu.toggle();
	        }
	        return Promise.resolve(false);
	    };
	    /**
	     * Used to enable or disable a menu. For example, there could be multiple
	     * left menus, but only one of them should be able to be dragged open.
	     * @param {boolean} shouldEnable  True if it should be enabled, false if not.
	     * @param {string} [menuId]  Optionally get the menu by its id, or side.
	     * @return {Menu}  Returns the instance of the menu, which is useful for chaining.
	     */
	    MenuController.prototype.enable = function (shouldEnable, menuId) {
	        var menu = this.get(menuId);
	        if (menu) {
	            return menu.enable(shouldEnable);
	        }
	    };
	    /**
	     * Used to enable or disable the ability to swipe open the menu.
	     * @param {boolean} shouldEnable  True if it should be swipe-able, false if not.
	     * @param {string} [menuId]  Optionally get the menu by its id, or side.
	     * @return {Menu}  Returns the instance of the menu, which is useful for chaining.
	     */
	    MenuController.prototype.swipeEnable = function (shouldEnable, menuId) {
	        var menu = this.get(menuId);
	        if (menu) {
	            return menu.swipeEnable(shouldEnable);
	        }
	    };
	    /**
	     * @return {boolean} Returns true if the menu is currently open, otherwise false.
	     */
	    MenuController.prototype.isOpen = function (menuId) {
	        var menu = this.get(menuId);
	        return menu && menu.isOpen || false;
	    };
	    /**
	     * @return {boolean} Returns true if the menu is currently enabled, otherwise false.
	     */
	    MenuController.prototype.isEnabled = function (menuId) {
	        var menu = this.get(menuId);
	        return menu && menu.enabled || false;
	    };
	    /**
	     * Used to get a menu instance. If a `menuId` is not provided then it'll return
	     * the first menu found. If a `menuId` is provided, then it'll first try to find
	     * the menu using the menu's `id` attribute. If a menu is not found using the `id`
	     * attribute, then it'll try to find the menu by its `side` name.
	     * @param {string} [menuId]  Optionally get the menu by its id, or side.
	     * @return {Menu}  Returns the instance of the menu if found, otherwise `null`.
	     */
	    MenuController.prototype.get = function (menuId) {
	        if (menuId) {
	            // first try by "id"
	            var menu = this._menus.find(function (m) { return m.id === menuId; });
	            if (menu)
	                return menu;
	            // not found by "id", next try by "side"
	            menu = this._menus.find(function (m) { return m.side === menuId; });
	            if (menu)
	                return menu;
	        }
	        // get the first menu in the array, if one exists
	        return (this._menus.length ? this._menus[0] : null);
	    };
	    /**
	     * @return {Array<Menu>}  Returns an array of all menu instances.
	     */
	    MenuController.prototype.getMenus = function () {
	        return this._menus;
	    };
	    /**
	     * @private
	     */
	    MenuController.prototype.register = function (menu) {
	        this._menus.push(menu);
	    };
	    /**
	     * @private
	     */
	    MenuController.prototype.unregister = function (menu) {
	        var index = this._menus.indexOf(menu);
	        if (index > -1) {
	            this._menus.splice(index, 1);
	        }
	    };
	    /**
	     * @private
	     */
	    MenuController.registerType = function (name, cls) {
	        menuTypes[name] = cls;
	    };
	    /**
	     * @private
	     */
	    MenuController.create = function (type, menuCmp) {
	        return new menuTypes[type](menuCmp);
	    };
	    return MenuController;
	})();
	exports.MenuController = MenuController;
	var menuTypes = {};


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * @private
	 * Map of possible pages that can be navigated to using an Ionic NavController
	 */
	var NavRegistry = (function () {
	    function NavRegistry(pages) {
	        if (pages === void 0) { pages = []; }
	        var pagePairs = pages.map(function (page) { return [page['name'], page]; });
	        this._pages = new Map();
	        for (var i = 0; i < pagePairs.length; i++) {
	            var pair = pagePairs[i];
	            this._pages.set(pair[0], pair[1]);
	        }
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var dom_1 = __webpack_require__(10);
	var ScrollTo = (function () {
	    function ScrollTo(ele) {
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
	        void 0;
	        if (yDistance <= tolerance && xDistance <= tolerance) {
	            // prevent scrolling if already close to there
	            self._el = null;
	            return Promise.resolve();
	        }
	        return new Promise(function (resolve, reject) {
	            var startTime;
	            // scroll loop
	            function step() {
	                if (!self._el) {
	                    return resolve();
	                }
	                var time = Math.min(1, ((Date.now() - startTime) / duration));
	                // where .5 would be 50% of time on a linear scale easedT gives a
	                // fraction based on the easing method
	                var easedT = easeOutCubic(time);
	                if (fromY != y) {
	                    self._el.scrollTop = (easedT * (y - fromY)) + fromY;
	                }
	                if (fromX != x) {
	                    self._el.scrollLeft = Math.round((easedT * (x - fromX)) + fromX);
	                }
	                void 0;
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
	                    void 0;
	                    resolve();
	                }
	            }
	            // start scroll loop
	            self.isPlaying = true;
	            // chill out for a frame first
	            dom_1.raf(function () {
	                startTime = Date.now();
	                dom_1.raf(step);
	            });
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
/* 20 */
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
	var app_1 = __webpack_require__(14);
	var config_1 = __webpack_require__(7);
	var dom_1 = __webpack_require__(10);
	var activator_1 = __webpack_require__(21);
	var ripple_1 = __webpack_require__(22);
	/**
	 * @private
	 */
	var TapClick = (function () {
	    function TapClick(config, app, zone) {
	        this.app = app;
	        this.zone = zone;
	        this.lastTouch = 0;
	        this.disableClick = 0;
	        this.lastActivated = 0;
	        var self = this;
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
	            // only dispatch mouse click events from a touchend event
	            // when tapPolyfill config is true, and the startCoordand endCoord
	            // are not too far off from each other
	            var endCoord = dom_1.pointerCoord(ev);
	            if (!dom_1.hasPointerMoved(POINTER_TOLERANCE, this.startCoord, endCoord)) {
	                // prevent native mouse click events for XX amount of time
	                this.disableClick = this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT;
	                if (this.app.isScrolling()) {
	                    // do not fire off a click event while the app was scrolling
	                    void 0;
	                }
	                else {
	                    // dispatch a mouse click event
	                    void 0;
	                    var clickEvent = document.createEvent('MouseEvents');
	                    clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0, endCoord.x, endCoord.y, false, false, false, false, 0, null);
	                    clickEvent.isIonicTap = true;
	                    ev.target.dispatchEvent(clickEvent);
	                }
	            }
	        }
	        this.pointerEnd(ev);
	    };
	    TapClick.prototype.mouseDown = function (ev) {
	        if (this.isDisabledNativeClick()) {
	            void 0;
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
	            void 0;
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
	        var activatableEle = getActivatableTarget(ev.target);
	        if (activatableEle) {
	            this.activator && this.activator.upAction(ev, activatableEle, this.startCoord.x, this.startCoord.y);
	        }
	        this.moveListeners(false);
	    };
	    TapClick.prototype.pointerCancel = function (ev) {
	        void 0;
	        this.activator && this.activator.clearState();
	        this.moveListeners(false);
	    };
	    TapClick.prototype.moveListeners = function (shouldAdd) {
	        removeListener(this.usePolyfill ? 'touchmove' : 'mousemove', this.pointerMove);
	        if (shouldAdd) {
	            addListener(this.usePolyfill ? 'touchmove' : 'mousemove', this.pointerMove);
	        }
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
	            void 0;
	            ev.preventDefault();
	            ev.stopPropagation();
	        }
	    };
	    TapClick.prototype.isDisabledNativeClick = function () {
	        return this.disableClick > Date.now();
	    };
	    TapClick = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [config_1.Config, app_1.IonicApp, core_1.NgZone])
	    ], TapClick);
	    return TapClick;
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var dom_1 = __webpack_require__(10);
	var Activator = (function () {
	    function Activator(app, config, _zone) {
	        this.app = app;
	        this._zone = _zone;
	        this._queue = [];
	        this._active = [];
	        this._css = config.get('activatedClass') || 'activated';
	    }
	    Activator.prototype.downAction = function (ev, activatableEle, pointerX, pointerY) {
	        // the user just pressed down
	        var self = this;
	        if (self.disableActivated(ev)) {
	            return;
	        }
	        // queue to have this element activated
	        self._queue.push(activatableEle);
	        this._zone.runOutsideAngular(function () {
	            dom_1.rafFrames(2, function () {
	                var activatableEle;
	                for (var i = 0; i < self._queue.length; i++) {
	                    activatableEle = self._queue[i];
	                    if (activatableEle && activatableEle.parentNode) {
	                        self._active.push(activatableEle);
	                        activatableEle.classList.add(self._css);
	                    }
	                }
	                self._queue = [];
	            });
	        });
	    };
	    Activator.prototype.upAction = function (ev, activatableEle, pointerX, pointerY) {
	        // the user was pressing down, then just let up
	        var self = this;
	        function activateUp() {
	            self.clearState();
	        }
	        this._zone.runOutsideAngular(function () {
	            dom_1.rafFrames(CLEAR_STATE_DEFERS, activateUp);
	        });
	    };
	    Activator.prototype.clearState = function () {
	        var _this = this;
	        // all states should return to normal
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
	        self._queue = [];
	        dom_1.rafFrames(2, function () {
	            for (var i = 0; i < self._active.length; i++) {
	                self._active[i].classList.remove(self._css);
	            }
	            self._active = [];
	        });
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
	var CLEAR_STATE_DEFERS = 5;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var activator_1 = __webpack_require__(21);
	var dom_1 = __webpack_require__(10);
	var win = window;
	/**
	 * @private
	 */
	var RippleActivator = (function (_super) {
	    __extends(RippleActivator, _super);
	    function RippleActivator(app, config, zone) {
	        _super.call(this, app, config, zone);
	    }
	    RippleActivator.prototype.downAction = function (ev, activatableEle, pointerX, pointerY) {
	        var self = this;
	        if (self.disableActivated(ev)) {
	            return;
	        }
	        // queue to have this element activated
	        self._queue.push(activatableEle);
	        this._zone.runOutsideAngular(function () {
	            dom_1.raf(function () {
	                var i;
	                for (i = 0; i < self._queue.length; i++) {
	                    var queuedEle = self._queue[i];
	                    if (queuedEle && queuedEle.parentNode) {
	                        self._active.push(queuedEle);
	                        // DOM WRITE
	                        queuedEle.classList.add(self._css);
	                        var j = queuedEle.childElementCount;
	                        while (j--) {
	                            var rippleEle = queuedEle.children[j];
	                            if (rippleEle.tagName === 'ION-BUTTON-EFFECT') {
	                                // DOM WRITE
	                                rippleEle.style.left = '-9999px';
	                                rippleEle.style.opacity = '';
	                                rippleEle.style[dom_1.CSS.transform] = 'scale(0.001) translateZ(0px)';
	                                rippleEle.style[dom_1.CSS.transition] = '';
	                                // DOM READ
	                                var clientRect = activatableEle.getBoundingClientRect();
	                                rippleEle.$top = clientRect.top;
	                                rippleEle.$left = clientRect.left;
	                                rippleEle.$width = clientRect.width;
	                                rippleEle.$height = clientRect.height;
	                                break;
	                            }
	                        }
	                    }
	                }
	                self._queue = [];
	            });
	        });
	    };
	    RippleActivator.prototype.upAction = function (ev, activatableEle, pointerX, pointerY) {
	        var self = this;
	        var i = activatableEle.childElementCount;
	        while (i--) {
	            var rippleEle = activatableEle.children[i];
	            if (rippleEle.tagName === 'ION-BUTTON-EFFECT') {
	                var clientPointerX = (pointerX - rippleEle.$left);
	                var clientPointerY = (pointerY - rippleEle.$top);
	                var x = Math.max(Math.abs(rippleEle.$width - clientPointerX), clientPointerX) * 2;
	                var y = Math.max(Math.abs(rippleEle.$height - clientPointerY), clientPointerY) * 2;
	                var diameter = Math.min(Math.max(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), 64), 240);
	                if (activatableEle.hasAttribute('ion-item')) {
	                    diameter = Math.min(diameter, 140);
	                }
	                var radius = Math.sqrt(rippleEle.$width + rippleEle.$height);
	                var scaleTransitionDuration = Math.max(1600 * Math.sqrt(radius / TOUCH_DOWN_ACCEL) + 0.5, 260);
	                var opacityTransitionDuration = scaleTransitionDuration * 0.7;
	                var opacityTransitionDelay = scaleTransitionDuration - opacityTransitionDuration;
	                // DOM WRITE
	                rippleEle.style.width = rippleEle.style.height = diameter + 'px';
	                rippleEle.style.marginTop = rippleEle.style.marginLeft = -(diameter / 2) + 'px';
	                rippleEle.style.left = clientPointerX + 'px';
	                rippleEle.style.top = clientPointerY + 'px';
	                rippleEle.style.opacity = '0';
	                rippleEle.style[dom_1.CSS.transform] = 'scale(1) translateZ(0px)';
	                rippleEle.style[dom_1.CSS.transition] = 'transform ' +
	                    scaleTransitionDuration +
	                    'ms,opacity ' +
	                    opacityTransitionDuration +
	                    'ms ' +
	                    opacityTransitionDelay + 'ms';
	            }
	        }
	        _super.prototype.upAction.call(this, ev, activatableEle, pointerX, pointerY);
	    };
	    RippleActivator.prototype.deactivate = function () {
	        // remove the active class from all active elements
	        var self = this;
	        self._queue = [];
	        dom_1.rafFrames(2, function () {
	            for (var i = 0; i < self._active.length; i++) {
	                self._active[i].classList.remove(self._css);
	            }
	            self._active = [];
	        });
	    };
	    return RippleActivator;
	})(activator_1.Activator);
	exports.RippleActivator = RippleActivator;
	var TOUCH_DOWN_ACCEL = 300;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * @private
	 * Provide multi-language and i18n support in your app. Translate works by
	 * mapping full strings to language translated ones. That means that you don't
	 * need to provide strings for your default language, just new languages.
	 *
	 * Note: The Angular team will be building an
	 * [Localization/Internationalization](https://docs.google.com/document/d/1mwyOFsAD-bPoXTk3Hthq0CAcGXCUw-BtTJMR4nGTY-0/view#heading=h.ixg45w3363q)
	 * provider, so this Translation provider may not be further developed.
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
	        this._language = {};
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
	            void 0;
	            return '';
	        }
	        return this._getTranslation(map, key);
	    };
	    Translate.prototype._getTranslation = function (map, key) {
	        return map && map[key] || '';
	    };
	    return Translate;
	})();
	exports.Translate = Translate;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(25);
	var overlay_1 = __webpack_require__(26);
	var menu_1 = __webpack_require__(27);
	var menu_toggle_1 = __webpack_require__(36);
	var menu_close_1 = __webpack_require__(48);
	var badge_1 = __webpack_require__(49);
	var button_1 = __webpack_require__(42);
	var blur_1 = __webpack_require__(50);
	var content_1 = __webpack_require__(51);
	var scroll_1 = __webpack_require__(52);
	var pull_to_refresh_1 = __webpack_require__(53);
	var slides_1 = __webpack_require__(54);
	var tabs_1 = __webpack_require__(56);
	var tab_1 = __webpack_require__(58);
	var list_1 = __webpack_require__(60);
	var item_1 = __webpack_require__(63);
	var item_sliding_1 = __webpack_require__(65);
	var toolbar_1 = __webpack_require__(41);
	var icon_1 = __webpack_require__(40);
	var checkbox_1 = __webpack_require__(66);
	var select_1 = __webpack_require__(67);
	var option_1 = __webpack_require__(69);
	var toggle_1 = __webpack_require__(70);
	var input_1 = __webpack_require__(71);
	var label_1 = __webpack_require__(64);
	var segment_1 = __webpack_require__(74);
	var radio_button_1 = __webpack_require__(75);
	var radio_group_1 = __webpack_require__(76);
	var searchbar_1 = __webpack_require__(77);
	var nav_1 = __webpack_require__(78);
	var nav_push_1 = __webpack_require__(79);
	var nav_router_1 = __webpack_require__(80);
	var navbar_1 = __webpack_require__(39);
	var id_1 = __webpack_require__(81);
	var show_hide_when_1 = __webpack_require__(82);
	/**
	 * @name IONIC_DIRECTIVES
	 * @private
	 * @description
	 * The core Ionic directives as well as Angular's CORE_DIRECTIVES and
	 * FORM_DIRECTIVES.  Automatically available in every [@Page](../Page/) template.
	 *
	 * **Angular**
	 * - CORE_DIRECTIVES
	 * - FORM_DIRECTIVES
	 *
	 * **Content**
	 * -  Menu
	 * -  MenuToggle
	 * -  MenuClose
	 *
	 * -  Button
	 * -  Blur
	 * -  Content
	 * -  Scroll
	 * -  Refresher
	 *
	 * **Lists**
	 * -  List
	 * -  ListHeader
	 * -  Item
	 * -  ItemSliding
	 *
	 * **Slides**
	 * -  Slides
	 * -  Slide
	 * -  SlideLazy
	 *
	 * **Tabs**
	 * -  Tabs
	 * -  Tab
	 *
	 * **Toolbar**
	 * -  Toolbar
	 * -  ToolbarTitle
	 * -  ToolbarItem
	 *
	 * **Media**
	 * -  Icon
	 *
	 * **Forms**
	 * -  Searchbar
	 * -  Segment
	 * -  SegmentButton
	 * -  Checkbox
	 * -  RadioGroup
	 * -  RadioButton
	 * -  Select
	 * -  Option
	 * -  Toggle
	 * -  TextInput
	 * -  Label
	 *
	 * **Nav**
	 * -  Nav
	 * -  NavbarTemplate
	 * -  Navbar
	 * -  NavPush
	 * -  NavPop
	 * -  NavRouter
	 * -  IdRef
	 *
	 * -  ShowWhen
	 * -  HideWhen
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
	    badge_1.Badge,
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
	    searchbar_1.SearchbarInput,
	    segment_1.Segment,
	    segment_1.SegmentButton,
	    checkbox_1.Checkbox,
	    radio_group_1.RadioGroup,
	    radio_button_1.RadioButton,
	    select_1.Select,
	    option_1.Option,
	    toggle_1.Toggle,
	    input_1.TextArea,
	    input_1.TextInput,
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
/* 25 */
/***/ function(module, exports) {

	module.exports = require("angular2")["common"];

/***/ },
/* 26 */
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
	 */
	var OverlayNav = (function () {
	    function OverlayNav() {
	        // deprecated warning
	        void 0;
	        void 0;
	        void 0;
	    }
	    OverlayNav = __decorate([
	        core_1.Directive({
	            selector: 'ion-overlay'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], OverlayNav);
	    return OverlayNav;
	})();
	exports.OverlayNav = OverlayNav;


/***/ },
/* 27 */
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
	var ion_1 = __webpack_require__(28);
	var config_1 = __webpack_require__(7);
	var platform_1 = __webpack_require__(8);
	var keyboard_1 = __webpack_require__(16);
	var menu_gestures_1 = __webpack_require__(29);
	var menu_controller_1 = __webpack_require__(17);
	var util_1 = __webpack_require__(9);
	/**
	 * @private
	 */
	var Menu = (function (_super) {
	    __extends(Menu, _super);
	    function Menu(_menuCtrl, _elementRef, _config, _platform, _renderer, _keyboard, _zone) {
	        _super.call(this, _elementRef);
	        this._menuCtrl = _menuCtrl;
	        this._elementRef = _elementRef;
	        this._config = _config;
	        this._platform = _platform;
	        this._renderer = _renderer;
	        this._keyboard = _keyboard;
	        this._zone = _zone;
	        this._preventTime = 0;
	        this._isEnabled = true;
	        this._isSwipeEnabled = true;
	        this._isPers = false;
	        this._init = false;
	        /**
	         * @private
	         */
	        this.isOpen = false;
	        /**
	         * @private
	         */
	        this.opening = new core_1.EventEmitter();
	    }
	    Object.defineProperty(Menu.prototype, "enabled", {
	        /**
	         * @private
	         */
	        get: function () {
	            return this._isEnabled;
	        },
	        set: function (val) {
	            this._isEnabled = util_1.isTrueProperty(val);
	            this._setListeners();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Menu.prototype, "swipeEnabled", {
	        /**
	         * @private
	         */
	        get: function () {
	            return this._isSwipeEnabled;
	        },
	        set: function (val) {
	            this._isSwipeEnabled = util_1.isTrueProperty(val);
	            this._setListeners();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Menu.prototype, "persistent", {
	        /**
	         * @private
	         */
	        get: function () {
	            return this._isPers;
	        },
	        set: function (val) {
	            this._isPers = util_1.isTrueProperty(val);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    Menu.prototype.ngOnInit = function () {
	        var self = this;
	        self._init = true;
	        var content = self.content;
	        self._cntEle = (content instanceof Node) ? content : content && content.getNativeElement && content.getNativeElement();
	        // requires content element
	        if (!self._cntEle) {
	            return void 0;
	        }
	        // normalize the "side"
	        if (self.side !== 'left' && self.side !== 'right') {
	            self.side = 'left';
	        }
	        self._renderer.setElementAttribute(self._elementRef.nativeElement, 'side', self.side);
	        // normalize the "type"
	        if (!self.type) {
	            self.type = self._config.get('menuType');
	        }
	        self._renderer.setElementAttribute(self._elementRef.nativeElement, 'type', self.type);
	        // add the gestures
	        self._cntGesture = new menu_gestures_1.MenuContentGesture(self, self.getContentElement());
	        self._menuGesture = new menu_gestures_1.MenuTargetGesture(self, self.getNativeElement());
	        // register listeners if this menu is enabled
	        // check if more than one menu is on the same side
	        var hasEnabledSameSideMenu = self._menuCtrl.getMenus().some(function (m) {
	            return m.side === self.side && m.enabled;
	        });
	        if (hasEnabledSameSideMenu) {
	            // auto-disable if another menu on the same side is already enabled
	            self._isEnabled = false;
	        }
	        self._setListeners();
	        // create a reusable click handler on this instance, but don't assign yet
	        self.onContentClick = function (ev) {
	            if (self._isEnabled) {
	                ev.preventDefault();
	                ev.stopPropagation();
	                self.close();
	            }
	        };
	        self._cntEle.classList.add('menu-content');
	        self._cntEle.classList.add('menu-content-' + self.type);
	        // register this menu with the app's menu controller
	        self._menuCtrl.register(self);
	    };
	    /**
	     * @private
	     */
	    Menu.prototype._setListeners = function () {
	        var self = this;
	        if (self._init) {
	            // only listen/unlisten if the menu has initialized
	            if (self._isEnabled && self._isSwipeEnabled && !self._cntGesture.isListening) {
	                // should listen, but is not currently listening
	                void 0;
	                self._zone.runOutsideAngular(function () {
	                    self._cntGesture.listen();
	                    self._menuGesture.listen();
	                });
	            }
	            else if (self._cntGesture.isListening && (!self._isEnabled || !self._isSwipeEnabled)) {
	                // should not listen, but is currently listening
	                void 0;
	                self._cntGesture.unlisten();
	                self._menuGesture.unlisten();
	            }
	        }
	    };
	    /**
	     * @private
	     */
	    Menu.prototype._getType = function () {
	        if (!this._type) {
	            this._type = menu_controller_1.MenuController.create(this.type, this);
	            if (this._config.get('animate') === false) {
	                this._type.ani.duration(0);
	            }
	        }
	        return this._type;
	    };
	    /**
	     * Sets the state of the Menu to open or not.
	     * @param {boolean} shouldOpen  If the Menu is open or not.
	     * @return {Promise} returns a promise once set
	     */
	    Menu.prototype.setOpen = function (shouldOpen) {
	        var _this = this;
	        // _isPrevented is used to prevent unwanted opening/closing after swiping open/close
	        // or swiping open the menu while pressing down on the menuToggle button
	        if ((shouldOpen && this.isOpen) || this._isPrevented()) {
	            return Promise.resolve(this.isOpen);
	        }
	        this._before();
	        return new Promise(function (resolve) {
	            _this._getType().setOpen(shouldOpen, function () {
	                _this._after(shouldOpen);
	                resolve(_this.isOpen);
	            });
	        });
	    };
	    /**
	     * @private
	     */
	    Menu.prototype.swipeStart = function () {
	        // user started swiping the menu open/close
	        if (this._isPrevented() || !this._isEnabled || !this._isSwipeEnabled)
	            return;
	        this._before();
	        this._getType().setProgressStart(this.isOpen);
	    };
	    /**
	     * @private
	     */
	    Menu.prototype.swipeProgress = function (stepValue) {
	        // user actively dragging the menu
	        if (this._isEnabled && this._isSwipeEnabled) {
	            this._prevent();
	            this._getType().setProgessStep(stepValue);
	            this.opening.next(stepValue);
	        }
	    };
	    /**
	     * @private
	     */
	    Menu.prototype.swipeEnd = function (shouldComplete, currentStepValue) {
	        var _this = this;
	        // user has finished dragging the menu
	        if (this._isEnabled && this._isSwipeEnabled) {
	            this._prevent();
	            this._getType().setProgressEnd(shouldComplete, currentStepValue, function (isOpen) {
	                void 0;
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
	        if (this._isEnabled) {
	            this.getNativeElement().classList.add('show-menu');
	            this.getBackdropElement().classList.add('show-backdrop');
	            this._prevent();
	            this._keyboard.close();
	        }
	    };
	    /**
	     * @private
	     */
	    Menu.prototype._after = function (isOpen) {
	        // keep opening/closing the menu disabled for a touch more yet
	        // only add listeners/css if it's enabled and isOpen
	        // and only remove listeners/css if it's not open
	        if ((this._isEnabled && isOpen) || !isOpen) {
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
	        // or swiping open the menu while pressing down on the menuToggle
	        this._preventTime = Date.now() + 20;
	    };
	    /**
	     * @private
	     */
	    Menu.prototype._isPrevented = function () {
	        return this._preventTime > Date.now();
	    };
	    /**
	     * Progamatically open the Menu.
	     * @return {Promise} returns a promise when the menu is fully opened.
	     */
	    Menu.prototype.open = function () {
	        return this.setOpen(true);
	    };
	    /**
	     * Progamatically close the Menu.
	     * @return {Promise} returns a promise when the menu is fully closed.
	     */
	    Menu.prototype.close = function () {
	        return this.setOpen(false);
	    };
	    /**
	     * Toggle the menu. If it's closed, it will open, and if opened, it will close.
	     * @return {Promise} returns a promise when the menu has been toggled.
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
	        this.enabled = shouldEnable;
	        if (!shouldEnable && this.isOpen) {
	            this.close();
	        }
	        return this;
	    };
	    /**
	     * Used to enable or disable the ability to swipe open the menu.
	     * @param {boolean} shouldEnable  True if it should be swipe-able, false if not.
	     * @return {Menu}  Returns the instance of the menu, which is useful for chaining.
	     */
	    Menu.prototype.swipeEnable = function (shouldEnable) {
	        this.swipeEnabled = shouldEnable;
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
	    Menu.prototype.ngOnDestroy = function () {
	        this._menuCtrl.unregister(this);
	        this._cntGesture && this._cntGesture.destroy();
	        this._menuGesture && this._menuGesture.destroy();
	        this._type && this._type.destroy();
	        this._resizeUnreg && this._resizeUnreg();
	        this._cntEle = null;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Menu.prototype, "content", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Menu.prototype, "id", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Menu.prototype, "side", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Menu.prototype, "type", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Menu.prototype, "enabled", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Menu.prototype, "swipeEnabled", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Menu.prototype, "persistent", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Menu.prototype, "maxEdgeStart", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Menu.prototype, "opening", void 0);
	    Menu = __decorate([
	        core_1.Component({
	            selector: 'ion-menu',
	            host: {
	                'role': 'navigation'
	            },
	            template: '<ng-content></ng-content>' +
	                '<div tappable disable-activated class="backdrop"></div>',
	            directives: [core_1.forwardRef(function () { return MenuBackdrop; })]
	        }), 
	        __metadata('design:paramtypes', [menu_controller_1.MenuController, core_1.ElementRef, config_1.Config, platform_1.Platform, core_1.Renderer, keyboard_1.Keyboard, core_1.NgZone])
	    ], Menu);
	    return Menu;
	})(ion_1.Ion);
	exports.Menu = Menu;
	/**
	 * @private
	 */
	var MenuBackdrop = (function () {
	    function MenuBackdrop(_menuCtrl, elementRef) {
	        this._menuCtrl = _menuCtrl;
	        this.elementRef = elementRef;
	        _menuCtrl.backdrop = this;
	    }
	    /**
	     * @private
	     */
	    MenuBackdrop.prototype.clicked = function (ev) {
	        void 0;
	        ev.preventDefault();
	        ev.stopPropagation();
	        this._menuCtrl.close();
	    };
	    MenuBackdrop = __decorate([
	        core_1.Directive({
	            selector: '.backdrop',
	            host: {
	                '(click)': 'clicked($event)',
	            }
	        }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [Menu, core_1.ElementRef])
	    ], MenuBackdrop);
	    return MenuBackdrop;
	})();
	exports.MenuBackdrop = MenuBackdrop;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var dom = __webpack_require__(10);
	var ids = 0;
	/**
	 * Base class for all Ionic components. Exposes some common functionality
	 * that all Ionic components need, such as accessing underlying native elements and
	 * sending/receiving app-level events.
	 */
	var Ion = (function () {
	    function Ion(elementRef) {
	        this.elementRef = elementRef;
	        this._id = 'i' + ids++;
	    }
	    Ion.prototype.getElementRef = function () {
	        return this.elementRef;
	    };
	    Ion.prototype.getNativeElement = function () {
	        return this.elementRef.nativeElement;
	    };
	    Ion.prototype.getDimensions = function () {
	        return dom.getDimensions(this.elementRef.nativeElement, this._id);
	    };
	    Ion.prototype.width = function () {
	        return dom.getDimensions(this.elementRef.nativeElement, this._id).width;
	    };
	    Ion.prototype.height = function () {
	        return dom.getDimensions(this.elementRef.nativeElement, this._id).height;
	    };
	    return Ion;
	})();
	exports.Ion = Ion;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var slide_edge_gesture_1 = __webpack_require__(30);
	var util_1 = __webpack_require__(9);
	/**
	 * Gesture attached to the content which the menu is assigned to
	 */
	var MenuContentGesture = (function (_super) {
	    __extends(MenuContentGesture, _super);
	    function MenuContentGesture(menu, contentEle, options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this, contentEle, util_1.assign({
	            direction: 'x',
	            edge: menu.side,
	            threshold: 0,
	            maxEdgeStart: menu.maxEdgeStart || 75
	        }, options));
	        this.menu = menu;
	    }
	    MenuContentGesture.prototype.canStart = function (ev) {
	        var menu = this.menu;
	        if (!menu.enabled || !menu.swipeEnabled) {
	            void 0;
	            return false;
	        }
	        if (ev.distance > 50) {
	            // the distance is longer than you'd expect a side menu swipe to be
	            void 0;
	            return false;
	        }
	        void 0;
	        if (menu.side === 'right') {
	            // right side
	            if (menu.isOpen) {
	                // right side, opened
	                return true;
	            }
	            else {
	                // right side, closed
	                if ((ev.angle > 140 && ev.angle <= 180) || (ev.angle > -140 && ev.angle <= -180)) {
	                    return _super.prototype.canStart.call(this, ev);
	                }
	            }
	        }
	        else {
	            // left side
	            if (menu.isOpen) {
	                // left side, opened
	                return true;
	            }
	            else {
	                // left side, closed
	                if (ev.angle > -40 && ev.angle < 40) {
	                    return _super.prototype.canStart.call(this, ev);
	                }
	            }
	        }
	        // didn't pass the test, don't open this menu
	        return false;
	    };
	    // Set CSS, then wait one frame for it to apply before sliding starts
	    MenuContentGesture.prototype.onSlideBeforeStart = function (slide, ev) {
	        void 0;
	        this.menu.swipeStart();
	    };
	    MenuContentGesture.prototype.onSlide = function (slide, ev) {
	        var z = (this.menu.side === 'right' ? slide.min : slide.max);
	        var stepValue = (slide.distance / z);
	        void 0;
	        this.menu.swipeProgress(stepValue);
	    };
	    MenuContentGesture.prototype.onSlideEnd = function (slide, ev) {
	        var z = (this.menu.side === 'right' ? slide.min : slide.max);
	        var shouldComplete = (Math.abs(ev.velocityX) > 0.2) ||
	            (Math.abs(slide.delta) > Math.abs(z) * 0.5);
	        var currentStepValue = (slide.distance / z);
	        void 0;
	        this.menu.swipeEnd(shouldComplete, currentStepValue);
	    };
	    MenuContentGesture.prototype.getElementStartPos = function (slide, ev) {
	        if (this.menu.side === 'right') {
	            // right menu
	            return this.menu.isOpen ? slide.min : slide.max;
	        }
	        // left menu
	        return this.menu.isOpen ? slide.max : slide.min;
	    };
	    MenuContentGesture.prototype.getSlideBoundaries = function () {
	        if (this.menu.side === 'right') {
	            // right menu
	            return {
	                min: -this.menu.width(),
	                max: 0
	            };
	        }
	        // left menu
	        return {
	            min: 0,
	            max: this.menu.width()
	        };
	    };
	    return MenuContentGesture;
	})(slide_edge_gesture_1.SlideEdgeGesture);
	exports.MenuContentGesture = MenuContentGesture;
	/**
	 * Gesture attached to the actual menu itself
	 */
	var MenuTargetGesture = (function (_super) {
	    __extends(MenuTargetGesture, _super);
	    function MenuTargetGesture(menu, menuEle) {
	        _super.call(this, menu, menuEle, {
	            maxEdgeStart: 0
	        });
	    }
	    return MenuTargetGesture;
	})(MenuContentGesture);
	exports.MenuTargetGesture = MenuTargetGesture;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var slide_gesture_1 = __webpack_require__(31);
	var util_1 = __webpack_require__(9);
	var dom_1 = __webpack_require__(10);
	var SlideEdgeGesture = (function (_super) {
	    __extends(SlideEdgeGesture, _super);
	    function SlideEdgeGesture(element, opts) {
	        if (opts === void 0) { opts = {}; }
	        util_1.defaults(opts, {
	            edge: 'left',
	            maxEdgeStart: 50
	        });
	        _super.call(this, element, opts);
	        // Can check corners through use of eg 'left top'
	        this.edges = opts.edge.split(' ');
	        this.maxEdgeStart = opts.maxEdgeStart;
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
	            case 'left': return pos.x <= this._d.left + this.maxEdgeStart;
	            case 'right': return pos.x >= this._d.width - this.maxEdgeStart;
	            case 'top': return pos.y <= this._d.top + this.maxEdgeStart;
	            case 'bottom': return pos.y >= this._d.height - this.maxEdgeStart;
	        }
	    };
	    return SlideEdgeGesture;
	})(slide_gesture_1.SlideGesture);
	exports.SlideEdgeGesture = SlideEdgeGesture;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var drag_gesture_1 = __webpack_require__(32);
	var util_1 = __webpack_require__(34);
	var SlideGesture = (function (_super) {
	    __extends(SlideGesture, _super);
	    function SlideGesture(element, opts) {
	        if (opts === void 0) { opts = {}; }
	        _super.call(this, element, opts);
	        this.slide = null;
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
	    SlideGesture.prototype.canStart = function (ev) {
	        return true;
	    };
	    SlideGesture.prototype.onDragStart = function (ev) {
	        if (!this.canStart(ev)) {
	            return false;
	        }
	        this.slide = {};
	        this.onSlideBeforeStart(this.slide, ev);
	        var _a = this.getSlideBoundaries(this.slide, ev), min = _a.min, max = _a.max;
	        this.slide.min = min;
	        this.slide.max = max;
	        this.slide.elementStartPos = this.getElementStartPos(this.slide, ev);
	        this.slide.pointerStartPos = ev.center[this.direction];
	        this.slide.started = true;
	        this.onSlideStart(this.slide, ev);
	        return true;
	    };
	    SlideGesture.prototype.onDrag = function (ev) {
	        if (!this.slide || !this.slide.started) {
	            return false;
	        }
	        this.slide.pos = ev.center[this.direction];
	        this.slide.distance = util_1.clamp(this.slide.min, this.slide.pos - this.slide.pointerStartPos + this.slide.elementStartPos, this.slide.max);
	        this.slide.delta = this.slide.pos - this.slide.pointerStartPos;
	        this.onSlide(this.slide, ev);
	        return true;
	    };
	    SlideGesture.prototype.onDragEnd = function (ev) {
	        if (!this.slide || !this.slide.started)
	            return;
	        this.onSlideEnd(this.slide, ev);
	        this.slide = null;
	    };
	    SlideGesture.prototype.onSlideBeforeStart = function (slide, ev) { };
	    SlideGesture.prototype.onSlideStart = function (slide, ev) { };
	    SlideGesture.prototype.onSlide = function (slide, ev) { };
	    SlideGesture.prototype.onSlideEnd = function (slide, ev) { };
	    return SlideGesture;
	})(drag_gesture_1.DragGesture);
	exports.SlideGesture = SlideGesture;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var gesture_1 = __webpack_require__(33);
	var util_1 = __webpack_require__(34);
	var DragGesture = (function (_super) {
	    __extends(DragGesture, _super);
	    function DragGesture(element, opts) {
	        if (opts === void 0) { opts = {}; }
	        util_1.defaults(opts, {});
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
	    };
	    DragGesture.prototype.onDrag = function (ev) { return true; };
	    DragGesture.prototype.onDragStart = function (ev) { return true; };
	    DragGesture.prototype.onDragEnd = function (ev) { };
	    return DragGesture;
	})(gesture_1.Gesture);
	exports.DragGesture = DragGesture;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var util_1 = __webpack_require__(34);
	var hammer_1 = __webpack_require__(35);
	/**
	 * A gesture recognizer class.
	 *
	 * TODO(mlynch): Re-enable the DOM event simulation that was causing issues (or verify hammer does this already, it might);
	 */
	var Gesture = (function () {
	    function Gesture(element, opts) {
	        if (opts === void 0) { opts = {}; }
	        this._callbacks = {};
	        this.isListening = false;
	        util_1.defaults(opts, {
	            domEvents: true
	        });
	        this.element = element;
	        // Map 'x' or 'y' string to hammerjs opts
	        this.direction = opts.direction || 'x';
	        opts.direction = this.direction === 'x' ?
	            hammer_1.DIRECTION_HORIZONTAL :
	            hammer_1.DIRECTION_VERTICAL;
	        this._options = opts;
	    }
	    Gesture.prototype.options = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        util_1.assign(this._options, opts);
	    };
	    Gesture.prototype.on = function (type, cb) {
	        if (type == 'pinch' || type == 'rotate') {
	            this._hammer.get('pinch').set({ enable: true });
	        }
	        this._hammer.on(type, cb);
	        (this._callbacks[type] || (this._callbacks[type] = [])).push(cb);
	    };
	    Gesture.prototype.off = function (type, cb) {
	        this._hammer.off(type, this._callbacks[type] ? cb : null);
	    };
	    Gesture.prototype.listen = function () {
	        if (!this.isListening) {
	            this._hammer = hammer_1.Hammer(this.element, this._options);
	        }
	        this.isListening = true;
	    };
	    Gesture.prototype.unlisten = function () {
	        var type, i;
	        if (this._hammer && this.isListening) {
	            for (type in this._callbacks) {
	                for (i = 0; i < this._callbacks[type].length; i++) {
	                    this._hammer.off(type, this._callbacks[type]);
	                }
	            }
	            this._hammer.destroy();
	        }
	        this._callbacks = {};
	        this.isListening = false;
	    };
	    Gesture.prototype.destroy = function () {
	        this.unlisten();
	        this._hammer = this.element = this._options = null;
	    };
	    return Gesture;
	})();
	exports.Gesture = Gesture;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var domUtil = __webpack_require__(10);
	exports.dom = domUtil;
	__export(__webpack_require__(9));


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var util_1 = __webpack_require__(9);
	var win = window;
	var doc = document;
	/*! Hammer.JS - v2.0.6 - 2015-12-23
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2015 Jorik Tangelder;
	 * Licensed under the  license */
	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = doc.createElement('div');
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
	        util_1.assign(childP, properties);
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
	                return a[key] > b[key] ? 1 : 0;
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
	    var doc = element.ownerDocument || element;
	    return (doc.defaultView || doc.parentWindow || window);
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
	exports.DIRECTION_LEFT = 2;
	exports.DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;
	exports.DIRECTION_HORIZONTAL = exports.DIRECTION_LEFT | exports.DIRECTION_RIGHT;
	exports.DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = exports.DIRECTION_HORIZONTAL | exports.DIRECTION_VERTICAL;
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
	    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	    input.overallVelocityX = overallVelocity.x;
	    input.overallVelocityY = overallVelocity.y;
	    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;
	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);
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
	        var deltaX = input.deltaX - last.deltaX;
	        var deltaY = input.deltaY - last.deltaY;
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
	        return x < 0 ? exports.DIRECTION_LEFT : exports.DIRECTION_RIGHT;
	    }
	    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
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
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
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
	function MouseInput(manager, handler) {
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
	if (win.MSPointerEvent && !win.PointerEvent) {
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
	function TouchInput(manager, handler) {
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
	        if (NATIVE_TOUCH_ACTION && this.manager.element.style) {
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
	        if (hasNone) {
	            //do not prevent defaults if this is a tap gesture
	            var isTapPointer = input.pointers.length === 1;
	            var isTapMovement = input.distance < 2;
	            var isTapTouchTime = input.deltaTime < 250;
	            if (isTapPointer && isTapMovement && isTapTouchTime) {
	                return;
	            }
	        }
	        if (hasPanX && hasPanY) {
	            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	            return;
	        }
	        if (hasNone ||
	            (hasPanY && direction & exports.DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & exports.DIRECTION_VERTICAL)) {
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
	    // if both pan-x and pan-y are set (different recognizers
	    // for different directions, e.g. horizontal pan but vertical swipe?)
	    // we need none (as otherwise with pan-x pan-y combined none of these
	    // recognizers will work, since the browser would handle all panning
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_NONE;
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
	    this.options = util_1.assign({}, this.defaults, options || {});
	    this.id = uniqueId();
	    this.manager = null;
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
	        util_1.assign(this.options, options);
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
	        function emit(event) {
	            self.manager.emit(event, input);
	        }
	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	        emit(self.options.event); // simple 'eventName' events
	        if (input.additionalEvent) {
	            emit(input.additionalEvent);
	        }
	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
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
	        var inputDataClone = util_1.assign({}, inputData);
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
	    else if (direction == exports.DIRECTION_LEFT) {
	        return 'left';
	    }
	    else if (direction == exports.DIRECTION_RIGHT) {
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
	        if (direction & exports.DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & exports.DIRECTION_VERTICAL) {
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
	            if (options.direction & exports.DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? exports.DIRECTION_LEFT : exports.DIRECTION_RIGHT;
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
	            input.additionalEvent = this.options.event + direction;
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
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            input.additionalEvent = this.options.event + inOut;
	        }
	        this._super.emit.call(this, input);
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
	        time: 251,
	        threshold: 9 // a minimal movement is ok, but keep it low
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
	        velocity: 0.3,
	        direction: exports.DIRECTION_HORIZONTAL | exports.DIRECTION_VERTICAL,
	        pointers: 1
	    },
	    getTouchAction: function () {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },
	    attrTest: function (input) {
	        var direction = this.options.direction;
	        var velocity;
	        if (direction & (exports.DIRECTION_HORIZONTAL | exports.DIRECTION_VERTICAL)) {
	            velocity = input.overallVelocity;
	        }
	        else if (direction & exports.DIRECTION_HORIZONTAL) {
	            velocity = input.overallVelocityX;
	        }
	        else if (direction & exports.DIRECTION_VERTICAL) {
	            velocity = input.overallVelocityY;
	        }
	        return this._super.attrTest.call(this, input) &&
	            direction & input.offsetDirection &&
	            input.distance > this.options.threshold &&
	            input.maxPointers == this.options.pointers &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },
	    emit: function (input) {
	        var direction = directionStr(input.offsetDirection);
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
	        threshold: 9,
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
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, _defaults.preset);
	    return new Manager(element, options);
	}
	exports.Hammer = Hammer;
	/**
	 * @const {string}
	 */
	var VERSION = '2.0.6';
	/**
	 * default settings
	 * @namespace
	 */
	var _defaults = {
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
	        [SwipeRecognizer, { direction: exports.DIRECTION_HORIZONTAL }],
	        [PanRecognizer, { direction: exports.DIRECTION_HORIZONTAL }, ['swipe']],
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
	    this.options = util_1.assign({}, _defaults, options || {});
	    this.options.inputTarget = this.options.inputTarget || element;
	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);
	    toggleCssProps(this, true);
	    each(this.options.recognizers, function (item) {
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
	        util_1.assign(this.options, options);
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
	        recognizer = this.get(recognizer);
	        // let's make sure this recognizer exists
	        if (recognizer) {
	            var recognizers = this.recognizers;
	            var index = inArray(recognizers, recognizer);
	            if (index !== -1) {
	                recognizers.splice(index, 1);
	                this.touchAction.update();
	            }
	        }
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
	                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
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
	    if (!element.style) {
	        return;
	    }
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
	    var gestureEvent = doc.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}
	util_1.assign(Hammer, {
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
	    DIRECTION_LEFT: exports.DIRECTION_LEFT,
	    DIRECTION_RIGHT: exports.DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: exports.DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: exports.DIRECTION_VERTICAL,
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
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});
	win.Hammer = Hammer;


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
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var view_controller_1 = __webpack_require__(37);
	var navbar_1 = __webpack_require__(39);
	var menu_controller_1 = __webpack_require__(17);
	/**
	 * @name MenuToggle
	 * @description
	 * The `menuToggle` directive can be placed on any button to
	 * automatically close an open menu.
	 *
	 * @usage
	 * ```html
	 * <button menuToggle>Toggle Menu</button>
	 * ```
	 *
	 * To toggle a certain menu by its id or side, give the `menuToggle`
	 * directive a value.
	 *
	 * ```html
	 * <button menuToggle="right">Toggle Right Menu</button>
	 * ```
	 *
	 * @demo /docs/v2/demos/menu/
	 * @see {@link /docs/v2/components#menus Menu Component Docs}
	 * @see {@link ../../menu/Menu Menu API Docs}
	 */
	var MenuToggle = (function () {
	    function MenuToggle(_menu, elementRef, _viewCtrl, _navbar) {
	        this._menu = _menu;
	        this._viewCtrl = _viewCtrl;
	        this._navbar = _navbar;
	        this._inNavbar = !!_navbar;
	    }
	    /**
	    * @private
	    */
	    MenuToggle.prototype.toggle = function () {
	        var menu = this._menu.get(this.menuToggle);
	        menu && menu.toggle();
	    };
	    Object.defineProperty(MenuToggle.prototype, "isHidden", {
	        /**
	        * @private
	        */
	        get: function () {
	            if (this._inNavbar && this._viewCtrl) {
	                if (this._viewCtrl.isRoot()) {
	                    // this is the root view, so it should always show
	                    return false;
	                }
	                var menu = this._menu.get(this.menuToggle);
	                if (menu) {
	                    // this is not the root view, so see if this menu
	                    // is configured to still be enabled if it's not the root view
	                    return !menu.persistent;
	                }
	            }
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], MenuToggle.prototype, "menuToggle", void 0);
	    __decorate([
	        core_1.HostListener('click'), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', void 0)
	    ], MenuToggle.prototype, "toggle", null);
	    MenuToggle = __decorate([
	        core_1.Directive({
	            selector: '[menuToggle]',
	            host: {
	                '[hidden]': 'isHidden',
	                'menuToggle': '' //ensures the attr is there for css when using [menuToggle]
	            }
	        }),
	        __param(2, core_1.Optional()),
	        __param(3, core_1.Optional()), 
	        __metadata('design:paramtypes', [menu_controller_1.MenuController, core_1.ElementRef, view_controller_1.ViewController, navbar_1.Navbar])
	    ], MenuToggle);
	    return MenuToggle;
	})();
	exports.MenuToggle = MenuToggle;


/***/ },
/* 37 */
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
	var nav_params_1 = __webpack_require__(38);
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
	    function ViewController(componentType, data) {
	        if (data === void 0) { data = {}; }
	        this.componentType = componentType;
	        this._destroys = [];
	        this._hdAttr = null;
	        this._leavingOpts = null;
	        this._loaded = false;
	        this._onDismiss = null;
	        /**
	         * @private
	         */
	        this.instance = {};
	        /**
	         * @private
	         */
	        this.state = '';
	        /**
	         * @private
	         */
	        this.viewType = '';
	        /**
	         * @private
	         */
	        this._emitter = new core_1.EventEmitter();
	        // passed in data could be NavParams, but all we care about is its data object
	        this.data = (data instanceof nav_params_1.NavParams ? data.data : data);
	    }
	    ViewController.prototype.subscribe = function (generatorOrNext) {
	        return this._emitter.subscribe(generatorOrNext);
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.emit = function (data) {
	        this._emitter.emit(data);
	    };
	    ViewController.prototype.onDismiss = function (callback) {
	        this._onDismiss = callback;
	    };
	    ViewController.prototype.dismiss = function (data, role) {
	        this._onDismiss && this._onDismiss(data, role);
	        return this._nav.remove(this._nav.indexOf(this), 1, this._leavingOpts);
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.setNav = function (navCtrl) {
	        this._nav = navCtrl;
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.getTransitionName = function (direction) {
	        return this._nav && this._nav.config.get('pageTransition');
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.getNavParams = function () {
	        return new nav_params_1.NavParams(this.data);
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.setLeavingOpts = function (opts) {
	        this._leavingOpts = opts;
	    };
	    /**
	     * Check to see if you can go back in the navigation stack
	     * @param {boolean} Check whether or not you can go back from this page
	     * @returns {boolean} Returns if it's possible to go back from this Page.
	     */
	    ViewController.prototype.enableBack = function () {
	        // update if it's possible to go back from this nav item
	        if (this._nav) {
	            var previousItem = this._nav.getPrevious(this);
	            // the previous view may exist, but if it's about to be destroyed
	            // it shouldn't be able to go back to
	            return !!(previousItem);
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
	            return this.componentType ? this.componentType['name'] : '';
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
	         * @returns {number} Returns the index of this page within its NavController.
	         */
	        get: function () {
	            return (this._nav ? this._nav.indexOf(this) : -1);
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
	    ViewController.prototype.domCache = function (shouldShow, renderer) {
	        // using hidden element attribute to display:none and not render views
	        // renderAttr of '' means the hidden attribute will be added
	        // renderAttr of null means the hidden attribute will be removed
	        // doing checks to make sure we only make an update to the element when needed
	        if (this._pgRef &&
	            (shouldShow && this._hdAttr === '' ||
	                !shouldShow && this._hdAttr !== '')) {
	            this._hdAttr = (shouldShow ? null : '');
	            renderer.setElementAttribute(this._pgRef.nativeElement, 'hidden', this._hdAttr);
	            var navbarRef = this.navbarRef();
	            if (navbarRef) {
	                renderer.setElementAttribute(navbarRef.nativeElement, 'hidden', this._hdAttr);
	            }
	        }
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.setZIndex = function (zIndex, renderer) {
	        if (this._pgRef && zIndex !== this.zIndex) {
	            this.zIndex = zIndex;
	            renderer.setElementStyle(this._pgRef.nativeElement, 'z-index', zIndex.toString());
	        }
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
	     * @returns {elementRef} Returns the Page's ElementRef
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
	     * @returns {elementRef} Returns the Page's Content ElementRef
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
	     * @returns {component} Returns the Page's Content component reference.
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
	            navbar.setBackButtonText(val);
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
	        ctrlFn(this, 'onPageLoaded');
	    };
	    /**
	     * @private
	     * The view is about to enter and become the active view.
	     */
	    ViewController.prototype.willEnter = function () {
	        ctrlFn(this, 'onPageWillEnter');
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
	     */
	    ViewController.prototype.addDestroy = function (destroyFn) {
	        this._destroys.push(destroyFn);
	    };
	    /**
	     * @private
	     */
	    ViewController.prototype.destroy = function () {
	        ctrlFn(this, 'onPageDidUnload');
	        for (var i = 0; i < this._destroys.length; i++) {
	            this._destroys[i]();
	        }
	        this._destroys = [];
	    };
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], ViewController.prototype, "_emitter", void 0);
	    return ViewController;
	})();
	exports.ViewController = ViewController;
	function ctrlFn(viewCtrl, fnName) {
	    if (viewCtrl.instance && viewCtrl.instance[fnName]) {
	        try {
	            viewCtrl.instance[fnName]();
	        }
	        catch (e) {
	            void 0;
	        }
	    }
	}


/***/ },
/* 38 */
/***/ function(module, exports) {

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
	        if (data === void 0) { data = {}; }
	        this.data = data;
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
/* 39 */
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
	var ion_1 = __webpack_require__(28);
	var icon_1 = __webpack_require__(40);
	var toolbar_1 = __webpack_require__(41);
	var config_1 = __webpack_require__(7);
	var app_1 = __webpack_require__(14);
	var view_controller_1 = __webpack_require__(37);
	var nav_controller_1 = __webpack_require__(43);
	var BackButton = (function (_super) {
	    __extends(BackButton, _super);
	    function BackButton(_nav, elementRef, navbar) {
	        _super.call(this, elementRef);
	        this._nav = _nav;
	        navbar && navbar.setBackButtonRef(elementRef);
	    }
	    BackButton.prototype.goBack = function (ev) {
	        ev.stopPropagation();
	        ev.preventDefault();
	        this._nav && this._nav.pop();
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
	        __metadata('design:paramtypes', [nav_controller_1.NavController, core_1.ElementRef, Navbar])
	    ], BackButton);
	    return BackButton;
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
	        __metadata('design:paramtypes', [core_1.ElementRef, Navbar])
	    ], BackButtonText);
	    return BackButtonText;
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
	        __metadata('design:paramtypes', [core_1.ElementRef, Navbar])
	    ], ToolbarBackground);
	    return ToolbarBackground;
	})();
	/**
	 * @name Navbar
	 * @description
	 * Navbar is a global level toolbar that gets updated every time a page gets
	 * loaded. You can pass the navbar a `ion-title` or any number of buttons.
	 *
	 * @usage
	 * ```html
	 * <ion-navbar *navbar>
	 *
	 *   <ion-buttons start>
	 *     <button (click)="toggleItems()">
	 *       toggle
	 *     </button>
	 *   </ion-buttons>
	 *
	 *   <ion-title>
	 *     Page Title
	 *   </ion-title>
	 *
	 *   <ion-buttons end>
	 *     <button (click)="openModal()">
	 *       Modal
	 *     </button>
	 *   </ion-buttons>
	 * </ion-navbar>
	 * ```
	 *
	 * @demo /docs/v2/demos/navbar/
	 * @see {@link ../../toolbar/Toolbar/ Toolbar API Docs}
	 */
	var Navbar = (function (_super) {
	    __extends(Navbar, _super);
	    function Navbar(_app, viewCtrl, elementRef, config, _renderer) {
	        _super.call(this, elementRef);
	        this._app = _app;
	        this._renderer = _renderer;
	        viewCtrl && viewCtrl.setNavbar(this);
	        this._bbIcon = config.get('backButtonIcon');
	        this._bbText = config.get('backButtonText');
	    }
	    /**
	     * @private
	     */
	    Navbar.prototype.ngOnInit = function () {
	        var hideBackButton = this.hideBackButton;
	        if (typeof hideBackButton === 'string') {
	            this.hideBackButton = (hideBackButton === '' || hideBackButton === 'true');
	        }
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.setBackButtonText = function (text) {
	        this._bbText = text;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.getBackButtonRef = function () {
	        return this._bbRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.setBackButtonRef = function (backButtonElementRef) {
	        this._bbRef = backButtonElementRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.getBackButtonTextRef = function () {
	        return this._bbtRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.setBackButtonTextRef = function (backButtonTextElementRef) {
	        this._bbtRef = backButtonTextElementRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.setBackgroundRef = function (backgrouneElementRef) {
	        this._bgRef = backgrouneElementRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.getBackgroundRef = function () {
	        return this._bgRef;
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.didEnter = function () {
	        try {
	            this._app.setTitle(this.getTitleText());
	        }
	        catch (e) {
	            void 0;
	        }
	    };
	    /**
	     * @private
	     */
	    Navbar.prototype.setHidden = function (isHidden) {
	        // used to display none/block the navbar
	        this._hidden = isHidden;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Navbar.prototype, "hideBackButton", void 0);
	    Navbar = __decorate([
	        core_1.Component({
	            selector: 'ion-navbar',
	            template: '<div class="toolbar-background"></div>' +
	                '<button class="back-button bar-button bar-button-default" [hidden]="hideBackButton">' +
	                '<span class="button-inner">' +
	                '<ion-icon class="back-button-icon" [name]="_bbIcon"></ion-icon>' +
	                '<span class="back-button-text">' +
	                '<span class="back-default">{{_bbText}}</span>' +
	                '</span>' +
	                '</span>' +
	                '<ion-button-effect></ion-button-effect>' +
	                '</button>' +
	                '<ng-content select="[menuToggle],ion-buttons[left]"></ng-content>' +
	                '<ng-content select="ion-buttons[start]"></ng-content>' +
	                '<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>' +
	                '<div class="toolbar-content">' +
	                '<ng-content></ng-content>' +
	                '</div>',
	            host: {
	                '[hidden]': '_hidden',
	                'class': 'toolbar'
	            },
	            directives: [BackButton, BackButtonText, icon_1.Icon, ToolbarBackground]
	        }),
	        __param(1, core_1.Optional()), 
	        __metadata('design:paramtypes', [app_1.IonicApp, view_controller_1.ViewController, core_1.ElementRef, config_1.Config, core_1.Renderer])
	    ], Navbar);
	    return Navbar;
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
	        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef, view_controller_1.ViewController])
	    ], NavbarTemplate);
	    return NavbarTemplate;
	})();
	exports.NavbarTemplate = NavbarTemplate;


/***/ },
/* 40 */
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
	var config_1 = __webpack_require__(7);
	/**
	 * @name Icon
	 * @description
	 * Icons can be used on their own, or inside of a number of Ionic components.
	 * For a full list of available icons, check out the
	 * [Ionicons resource docs](../../../../resources/ionicons).
	 *
	 * One feature of Ionicons is that when icon names are set, the actual icon
	 * which is rendered can change slightly depending on the mode the app is
	 * running from. For example, by setting the icon name of `alarm`, on iOS the
	 * icon will automatically apply `ios-alarm`, and on Material Design it will
	 * automatically apply `md-alarm`. This allow the developer to write the
	 * markup once, and let Ionic automatically apply the appropriate icon.
	 *
	 * @usage
	 * ```html
	 * <!-- automatically uses the correct "star" icon depending on the mode -->
	 * <ion-icon name="star"></ion-icon>
	 *
	 * <!-- explicity set the icon for each mode -->
	 * <ion-icon ios="ios-home" md="md-home"></ion-icon>
	 *
	 * <!-- always use the same icon, no matter what the mode -->
	 * <ion-icon name="ios-clock"></ion-icon>
	 * <ion-icon name="logo-twitter"></ion-icon>
	 * ```
	 *
	 * @demo /docs/v2/demos/icon/
	 * @see {@link /docs/v2/components#icons Icon Component Docs}
	 *
	 */
	var Icon = (function () {
	    function Icon(config, _elementRef, _renderer) {
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        this._name = '';
	        this._ios = '';
	        this._md = '';
	        this._css = '';
	        this.mode = config.get('iconMode');
	        if (_elementRef.nativeElement.tagName === 'ICON') {
	            // deprecated warning
	            void 0;
	            void 0;
	            void 0;
	        }
	    }
	    /**
	     * @private
	     */
	    Icon.prototype.ngOnDestroy = function () {
	        if (this._css) {
	            this._renderer.setElementClass(this._elementRef.nativeElement, this._css, false);
	        }
	    };
	    Object.defineProperty(Icon.prototype, "name", {
	        /**
	         * @input {string} Icon to use. Will load the appropriate icon for each mode
	         */
	        get: function () {
	            return this._name;
	        },
	        set: function (val) {
	            if (!(/^md-|^ios-|^logo-/.test(val))) {
	                // this does not have one of the defaults
	                // so lets auto add in the mode prefix for them
	                val = this.mode + '-' + val;
	            }
	            this._name = val;
	            this.update();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Icon.prototype, "ios", {
	        /**
	         * @input {string} Explicitly set the icon to use on iOS
	         */
	        get: function () {
	            return this._ios;
	        },
	        set: function (val) {
	            this._ios = val;
	            this.update();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Icon.prototype, "md", {
	        /**
	         * @input {string} Explicitly set the icon to use on MD
	         */
	        get: function () {
	            return this._md;
	        },
	        set: function (val) {
	            this._md = val;
	            this.update();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Icon.prototype, "isActive", {
	        /**
	         * @input {bool} Whether or not the icon has an "active" appearance. On iOS an active icon is filled in or full appearance, and an inactive icon on iOS will use an outlined version of the icon same icon. Material Design icons do not change appearance depending if they're active or not. The `isActive` property is largely used by the tabbar.
	         */
	        get: function () {
	            return (this._isActive === undefined || this._isActive === true || this._isActive === 'true');
	        },
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
	        var css = 'ion-';
	        if (this._ios && this.mode === 'ios') {
	            css += this._ios;
	        }
	        else if (this._md && this.mode === 'md') {
	            css += this._md;
	        }
	        else {
	            css += this._name;
	        }
	        if (this.mode == 'ios' && !this.isActive) {
	            css += '-outline';
	        }
	        if (this._css !== css) {
	            if (this._css) {
	                this._renderer.setElementClass(this._elementRef.nativeElement, this._css, false);
	            }
	            this._css = css;
	            this._renderer.setElementClass(this._elementRef.nativeElement, css, true);
	            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-label', css.replace('ion-', '').replace('ios-', '').replace('md-', '').replace('-', ' '));
	        }
	    };
	    /**
	     * @private
	     * @param {string} add class name
	     */
	    Icon.prototype.addClass = function (className) {
	        this._renderer.setElementClass(this._elementRef.nativeElement, className, true);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Icon.prototype, "name", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Icon.prototype, "ios", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Icon.prototype, "md", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Icon.prototype, "isActive", null);
	    Icon = __decorate([
	        core_1.Directive({
	            selector: 'ion-icon,icon',
	            host: {
	                'role': 'img'
	            }
	        }), 
	        __metadata('design:paramtypes', [config_1.Config, core_1.ElementRef, core_1.Renderer])
	    ], Icon);
	    return Icon;
	})();
	exports.Icon = Icon;


/***/ },
/* 41 */
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
	var ion_1 = __webpack_require__(28);
	var navbar_1 = __webpack_require__(39);
	var button_1 = __webpack_require__(42);
	/**
	 * @private
	 */
	var ToolbarBase = (function (_super) {
	    __extends(ToolbarBase, _super);
	    function ToolbarBase(elementRef) {
	        _super.call(this, elementRef);
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
	     * Returns the toolbar title text if it exists or an empty string
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
	 * Since it's based on flexbox, you can place the toolbar where you
	 * need it and flexbox will handle everything else. Toolbars will automatically
	 * assume they should be placed before an `ion-content`, so to specify that you want it
	 * below, you can add the property `position="bottom"`. This will change the flex order
	 * property.
	 *
	 * @usage
	 * ```html
	 * <ion-toolbar>
	 *   <ion-title>My Toolbar Title</ion-title>
	 * </ion-toolbar>
	 *
	 * <ion-toolbar>
	 *   <ion-title>I'm a subheader</ion-title>
	 * </ion-toolbar>
	 *
	 *  <ion-content></ion-content>
	 *
	 * <ion-toolbar position="bottom">
	 *   <ion-title>I'm a subfooter</ion-title>
	 * </ion-toolbar>
	 *
	 * <ion-toolbar position="bottom">
	 *   <ion-title>I'm a footer</ion-title>
	 * </ion-toolbar>
	 *
	 *  ```
	 *
	 * @property {any} [position] - set position of the toolbar, top or bottom. If not set, defautls to top.
	 * @demo /docs/v2/demos/toolbar/
	 * @see {@link ../../navbar/Navbar/ Navbar API Docs}
	 */
	var Toolbar = (function (_super) {
	    __extends(Toolbar, _super);
	    function Toolbar(elementRef) {
	        _super.call(this, elementRef);
	    }
	    Toolbar = __decorate([
	        core_1.Component({
	            selector: 'ion-toolbar',
	            template: '<div class="toolbar-background"></div>' +
	                '<ng-content select="[menuToggle],ion-buttons[left]"></ng-content>' +
	                '<ng-content select="ion-buttons[start]"></ng-content>' +
	                '<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>' +
	                '<div class="toolbar-content">' +
	                '<ng-content></ng-content>' +
	                '</div>',
	            host: {
	                'class': 'toolbar'
	            }
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], Toolbar);
	    return Toolbar;
	})(ToolbarBase);
	exports.Toolbar = Toolbar;
	/**
	 * @name Title
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
	 * @demo /docs/v2/demos/title/
	 */
	var ToolbarTitle = (function (_super) {
	    __extends(ToolbarTitle, _super);
	    function ToolbarTitle(elementRef, toolbar, navbar) {
	        _super.call(this, elementRef);
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
	        __metadata('design:paramtypes', [core_1.ElementRef, Toolbar, navbar_1.Navbar])
	    ], ToolbarTitle);
	    return ToolbarTitle;
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
	                void 0;
	                elementRef.nativeElement.setAttribute('start', '');
	            }
	            else if (elementRef.nativeElement.hasAttribute('secondary')) {
	                void 0;
	                elementRef.nativeElement.setAttribute('end', '');
	            }
	            else {
	                void 0;
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
	            selector: 'ion-buttons,[menuToggle],ion-nav-items'
	        }),
	        __param(1, core_1.Optional()),
	        __param(2, core_1.Optional()),
	        __param(2, core_1.Inject(core_1.forwardRef(function () { return navbar_1.Navbar; }))), 
	        __metadata('design:paramtypes', [core_1.ElementRef, Toolbar, navbar_1.Navbar])
	    ], ToolbarItem);
	    return ToolbarItem;
	})();
	exports.ToolbarItem = ToolbarItem;


/***/ },
/* 42 */
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
	var config_1 = __webpack_require__(7);
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
	  * @property [disabled] - disables the button
	  * @property [fab] - for a floating action button
	  * @property [fab-left] - position a fab button to the left
	  * @property [fab-right] - position a fab button to the right
	  * @property [fab-center] - position a fab button towards the center
	  * @property [fab-top] - position a fab button towards the top
	  * @property [fab-bottom] - position a fab button towards the bottom
	  * @property [color] - Dynamically set which color attribute this button should use.
	  * @description
	  * Buttons are simple components in Ionic, can consist of text, an icon, or both, and can be enhanced with a wide range of attributes.
	  * @demo /docs/v2/demos/button/
	  * @see {@link /docs/v2/components#buttons Button Component Docs}

	 */
	var Button = (function () {
	    function Button(config, _elementRef, _renderer, ionItem) {
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        this._role = 'button'; // bar-button/item-button
	        this._size = null; // large/small
	        this._style = 'default'; // outline/clear/solid
	        this._shape = null; // round/fab
	        this._display = null; // block/full
	        this._lastColor = null;
	        this._colors = []; // primary/secondary
	        this._icon = null; // left/right/only
	        this._disabled = false; // disabled
	        this.isItem = (ionItem === '');
	        var element = _elementRef.nativeElement;
	        if (config.get('hoverCSS') === false) {
	            _renderer.setElementClass(_elementRef.nativeElement, 'disable-hover', true);
	        }
	        if (element.hasAttribute('ion-item')) {
	            // no need to put on these classes for an ion-item
	            this._role = null;
	            return;
	        }
	        if (element.hasAttribute('disabled')) {
	            this._disabled = true;
	        }
	        this._readAttrs(element);
	    }
	    /**
	     * @private
	     */
	    Button.prototype.ngAfterContentInit = function () {
	        this._lastColor = this.color;
	        if (this.color) {
	            this._colors = [this.color];
	        }
	        this._readIcon(this._elementRef.nativeElement);
	        this._assignCss(true);
	    };
	    /**
	     * @private
	     */
	    Button.prototype.ngAfterContentChecked = function () {
	        if (this._lastColor !== this.color) {
	            this._assignCss(false);
	            this._lastColor = this.color;
	            this._colors = [this.color];
	            this._assignCss(true);
	        }
	    };
	    /**
	     * @private
	     */
	    Button.prototype.addClass = function (className) {
	        this._renderer.setElementClass(this._elementRef.nativeElement, className, true);
	    };
	    /**
	     * @private
	     */
	    Button.prototype.setRole = function (val) {
	        this._role = val;
	    };
	    /**
	     * @private
	     */
	    Button.prototype._readIcon = function (element) {
	        // figure out if and where the icon lives in the button
	        var childNodes = element.childNodes;
	        if (childNodes.length > 0) {
	            childNodes = childNodes[0].childNodes;
	        }
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
	                if (childNode.nodeName === 'ION-ICON') {
	                    // icon element node
	                    nodes.push(ICON);
	                }
	                else {
	                    // element other than an <ion-icon>
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
	    /**
	     * @private
	     */
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
	    /**
	     * @private
	     */
	    Button.prototype._assignCss = function (assignCssClass) {
	        var _this = this;
	        var role = this._role;
	        if (role) {
	            this._renderer.setElementClass(this._elementRef.nativeElement, role, assignCssClass); // button
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
	    /**
	     * @private
	     */
	    Button.prototype._setClass = function (type, assignCssClass) {
	        if (type) {
	            this._renderer.setElementClass(this._elementRef.nativeElement, this._role + '-' + type, assignCssClass);
	        }
	    };
	    /**
	     * @private
	     */
	    Button.setRoles = function (contentButtonChildren, role) {
	        var buttons = contentButtonChildren.toArray();
	        buttons.forEach(function (button) {
	            button.setRole(role);
	        });
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Button.prototype, "color", void 0);
	    Button = __decorate([
	        core_1.Component({
	            selector: 'button:not([ion-item]),[button]',
	            template: '<span class="button-inner">' +
	                '<ng-content></ng-content>' +
	                '</span>' +
	                '<ion-button-effect></ion-button-effect>'
	        }),
	        __param(3, core_1.Attribute('ion-item')), 
	        __metadata('design:paramtypes', [config_1.Config, core_1.ElementRef, core_1.Renderer, String])
	    ], Button);
	    return Button;
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
/* 43 */
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
	var instrumentation_1 = __webpack_require__(44);
	var ion_1 = __webpack_require__(28);
	var nav_params_1 = __webpack_require__(38);
	var util_1 = __webpack_require__(9);
	var swipe_back_1 = __webpack_require__(45);
	var transition_1 = __webpack_require__(46);
	var view_controller_1 = __webpack_require__(37);
	/**
	 * @name NavController
	 * @description
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
	 * reference](../../../decorators/Page/)._
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
	    function NavController(parent, _app, config, _keyboard, elementRef, _anchorName, _compiler, _viewManager, _zone, _renderer) {
	        _super.call(this, elementRef);
	        this._app = _app;
	        this._keyboard = _keyboard;
	        this._anchorName = _anchorName;
	        this._compiler = _compiler;
	        this._viewManager = _viewManager;
	        this._zone = _zone;
	        this._renderer = _renderer;
	        this._transIds = 0;
	        this._init = false;
	        this._ids = -1;
	        this._trnsTime = 0;
	        this._views = [];
	        this.parent = parent;
	        this.config = config;
	        this._trnsDelay = config.get('pageTransitionDelay');
	        this._sbEnabled = config.getBoolean('swipeBackEnabled') || false;
	        this._sbThreshold = config.get('swipeBackThreshold') || 40;
	        this.id = ++ctrlIds;
	        // build a new injector for child ViewControllers to use
	        this.providers = core_1.Injector.resolve([
	            core_1.provide(NavController, { useValue: this })
	        ]);
	    }
	    /**
	     * Set the root for the current navigation stack
	     * @param {Type} page  The name of the component you want to push on the navigation stack
	     * @param {object} [params={}] Any nav-params you want to pass along to the next view
	     * @param {object} [opts={}] Any options you want to use pass to transtion
	     * @returns {Promise} Returns a promise when done
	     */
	    NavController.prototype.setRoot = function (page, params, opts) {
	        if (params === void 0) { params = {}; }
	        if (opts === void 0) { opts = {}; }
	        return this.setPages([{ page: page, params: params }], opts);
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
	     *      this.nav.setPages([ {page: List}, {page: Detail}, {page:Info} ]);
	     *    }
	     *  }
	     *```
	     *
	     *
	     *In this example, we're giving the current nav stack an array of pages. Then the navigation stack will navigate to the last view in the array and remove the orignal view you came from.
	     *
	     * By default, animations are disabled, but they can be enabled by passing options to the navigation controller
	     *
	     *
	     *```typescript
	     * import {Page, NavController} from 'ionic/ionic'
	     * import {Detail} from '../detail/detail'
	     *
	     *  export class Home {
	     *    constructor(nav: NavController) {
	     *      this.nav = nav;
	     *    }
	     *    setPages() {
	     *      this.nav.setPages([ {page: List}, {page: Detail} ], {
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
	     * import {Page, NavController} from 'ionic/ionic';
	     * import {Info} from '../info/info';
	     * import {List} from '../list/list';
	     * import {Detail} from '../detail/detail';
	     *
	     *  export class Home {
	     *    constructor(nav: NavController) {
	     *      this.nav = nav;
	     *    }
	     *    setPages() {
	     *      this.nav.setPages([{
	     *        page: Info
	     *      }, {
	     *        page: List,
	     *        params: {tags: 'css'}
	     *      }, {
	     *        page: Detail,
	     *        params: {id: 325}
	     *      }]);
	     *    }
	     *  }
	     *```
	     *
	     * @param {array<Type>} pages  An arry of page components and their params to load in the stack
	     * @param {object} [opts={}] Any options you want to use pass
	     * @returns {Promise} Returns a promise when the pages are set
	     */
	    NavController.prototype.setPages = function (pages, opts) {
	        if (opts === void 0) { opts = {}; }
	        if (!pages || !pages.length) {
	            return Promise.resolve(false);
	        }
	        // deprecated warning
	        pages.forEach(function (pg) {
	            if (pg['componentType']) {
	                pg.page = pg['componentType'];
	                void 0;
	            }
	            else if (!pg['page']) {
	                void 0;
	            }
	        });
	        // remove existing views
	        var leavingView = this._remove(0, this._views.length);
	        // create view controllers out of the pages and insert the new views
	        var views = pages.map(function (p) { return new view_controller_1.ViewController(p.page, p.params); });
	        var enteringView = this._insert(0, views);
	        // if animation wasn't set to true then default it to NOT animate
	        if (opts.animate !== true) {
	            opts.animate = false;
	        }
	        // set the nav direction to "back" if it wasn't set
	        opts.direction = opts.direction || 'back';
	        var resolve;
	        var promise = new Promise(function (res) { resolve = res; });
	        // start the transition, fire resolve when done...
	        this._transition(enteringView, leavingView, opts, function (hasCompleted) {
	            // transition has completed!!
	            resolve(hasCompleted);
	        });
	        return promise;
	    };
	    /**
	     * @private
	     */
	    NavController.prototype.setViews = function (components, opts) {
	        if (opts === void 0) { opts = {}; }
	        void 0;
	        return this.setPages(components, opts);
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
	     *    constructor(nav: NavController){
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
	     *       direction: 'back'
	     *      });
	     *    }
	     * }
	     * ```
	     * @param {Type} page  The page component class you want to push on to the navigation stack
	     * @param {object} [params={}] Any nav-params you want to pass along to the next view
	     * @param {object} [opts={}] Any options you want to use pass to transtion
	     * @returns {Promise} Returns a promise, which resolves when the transition has completed
	     */
	    NavController.prototype.push = function (page, params, opts) {
	        if (params === void 0) { params = {}; }
	        if (opts === void 0) { opts = {}; }
	        return this.insertPages(-1, [{ page: page, params: params }], opts);
	    };
	    /**
	     * Present is how we display overlays on top of the content, from within the
	     * root level `NavController`. The `present` method is used by overlays, such
	     * as `ActionSheet`, `Alert`, and `Modal`. The main difference between `push`
	     * and `present`, is that `present` takes a `ViewController` instance, whereas
	     * `push` takes a `Page` component class. Additionally, `present` will place
	     * the overlay in the root NavController's stack.
	     *
	     * ```typescript
	     * class MyClass{
	     *    constructor(nav: NavController) {
	     *      this.nav = nav;
	     *    }
	     *
	     *    presentModal() {
	     *      let modal = Modal.create(ProfilePage);
	     *      this.nav.present(modal);
	     *    }
	     * }
	     * ```
	     *
	     * @param {ViewController} enteringView The name of the component you want to push on the navigation stack
	     * @param {object} [opts={}] Any options you want to use pass to transtion
	     * @returns {Promise} Returns a promise, which resolves when the transition has completed
	     */
	    NavController.prototype.present = function (enteringView, opts) {
	        if (opts === void 0) { opts = {}; }
	        var rootNav = this.rootNav;
	        if (rootNav['_tabs']) {
	            // TODO: must have until this goes in
	            // https://github.com/angular/angular/issues/5481
	            void 0;
	            return;
	        }
	        enteringView.setNav(rootNav);
	        opts.keyboardClose = false;
	        opts.direction = 'forward';
	        if (!opts.animation) {
	            opts.animation = enteringView.getTransitionName('forward');
	        }
	        enteringView.setLeavingOpts({
	            keyboardClose: false,
	            direction: 'back',
	            animation: enteringView.getTransitionName('back')
	        });
	        // start the transition
	        return rootNav._insertViews(-1, [enteringView], opts);
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
	     *    insertPage(){
	     *      this.nav.insert(1, Info);
	     *    }
	     *  }
	     * ```
	     *
	     * This will insert the `Info` page into the second slot of our navigation stack
	     *
	     * @param {number} insertIndex  The index where you want to insert the page
	     * @param {Type} page  The name of the component you want to insert into the nav stack
	     * @param {object} [params={}] Any nav-params you want to pass along to the next page
	     * @param {object} [opts={}] Any options you want to use pass to transtion
	     * @returns {Promise} Returns a promise when the page has been inserted into the navigation stack
	     */
	    NavController.prototype.insert = function (insertIndex, page, params, opts) {
	        if (params === void 0) { params = {}; }
	        if (opts === void 0) { opts = {}; }
	        return this.insertPages(insertIndex, [{ page: page, params: params }], opts);
	    };
	    /**
	     * Inserts multiple pages into the nav stack at the specified index.
	     *
	     * ```typescript
	     * export class Detail {
	     *    constructor(nav: NavController) {
	     *      this.nav = nav;
	     *    }
	     *    insertPages(){
	     *      let pages = [
	     *        { page: Info },
	     *        { page: ProfileList },
	     *        { page: ProfileDetail, params: {userId:5} }
	     *      ];
	     *      this.nav.insertPages(2, pages);
	     *    }
	     *  }
	     * ```
	     *
	     * This will insert each of the pages in the array, starting at the third slot
	     * (second index) of the nav stack. The last page in the array will animate
	     * in and become the active page.
	     *
	     * @param {number} insertIndex  The index where you want to insert the page
	     * @param {array<{page: Type, params=: any}>} insertPages  An array of objects, each with a `page` and optionally `params` property
	     * @param {object} [opts={}] Any options you want to use pass to transtion
	     * @returns {Promise} Returns a promise when the pages have been inserted into the navigation stack
	     */
	    NavController.prototype.insertPages = function (insertIndex, insertPages, opts) {
	        if (opts === void 0) { opts = {}; }
	        var views = insertPages.map(function (p) { return new view_controller_1.ViewController(p.page, p.params); });
	        return this._insertViews(insertIndex, views, opts);
	    };
	    NavController.prototype._insertViews = function (insertIndex, insertViews, opts) {
	        if (opts === void 0) { opts = {}; }
	        if (!insertViews || !insertViews.length) {
	            return Promise.reject('invalid pages');
	        }
	        // insert the new page into the stack
	        // returns the newly created entering view
	        var enteringView = this._insert(insertIndex, insertViews);
	        // set the nav direction to "forward" if it wasn't set
	        opts.direction = opts.direction || 'forward';
	        // set which animation it should use if it wasn't set yet
	        if (!opts.animation) {
	            opts.animation = enteringView.getTransitionName(opts.direction);
	        }
	        var resolve;
	        var promise = new Promise(function (res) { resolve = res; });
	        // it's possible that the newly added view doesn't need to
	        // transition in, but was simply inserted somewhere in the stack
	        // go backwards through the stack and find the first active view
	        // which could be active or one ready to enter
	        for (var i = this._views.length - 1; i >= 0; i--) {
	            if (this._views[i].state === STATE_ACTIVE || this._views[i].state === STATE_INIT_ENTER) {
	                // found the view at the end of the stack that's either
	                // already active or it is about to enter
	                if (this._views[i] === enteringView) {
	                    // cool, so the last valid view is also our entering view!!
	                    // this means we should animate that bad boy in so its the active view
	                    // return a promise and resolve when the transition has completed
	                    // get the leaving view which the _insert() already set
	                    var leavingView = this.getByState(STATE_INIT_LEAVE);
	                    // start the transition, fire resolve when done...
	                    this._transition(enteringView, leavingView, opts, function (hasCompleted) {
	                        // transition has completed!!
	                        resolve(hasCompleted);
	                    });
	                    return promise;
	                }
	                break;
	            }
	        }
	        // the page was not pushed onto the end of the stack
	        // but rather inserted somewhere in the middle or beginning
	        // Since there are views after this new one, don't transition in
	        // auto resolve cuz there was is no need for an animation
	        return Promise.resolve(enteringView);
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._insert = function (insertIndex, insertViews) {
	        // when this is done, there should only be at most
	        // 1 STATE_INIT_ENTER and 1 STATE_INIT_LEAVE
	        // there should not be any that are STATE_ACTIVE after this is done
	        var _this = this;
	        // allow -1 to be passed in to auto push it on the end
	        // and clean up the index if it's larger then the size of the stack
	        if (insertIndex < 0 || insertIndex > this._views.length) {
	            insertIndex = this._views.length;
	        }
	        // first see if there's an active view
	        var view = this.getActive();
	        if (view) {
	            // there's an active view, set that it's initialized to leave
	            view.state = STATE_INIT_LEAVE;
	        }
	        else if (view = this.getByState(STATE_INIT_ENTER)) {
	            // oh no, there's already a transition initalized ready to enter!
	            // but it actually hasn't entered yet at all so lets
	            // just keep it in the array, but not render or animate it in
	            view.state = STATE_INACTIVE;
	        }
	        // insert each of the views in the pages array
	        var insertView = null;
	        insertViews.forEach(function (view, i) {
	            insertView = view;
	            // create the new entering view
	            view.setNav(_this);
	            view.state = STATE_INACTIVE;
	            // give this inserted view an ID
	            _this._incId(view);
	            // insert the entering view into the correct index in the stack
	            _this._views.splice(insertIndex + i, 0, view);
	        });
	        if (insertView) {
	            insertView.state = STATE_INIT_ENTER;
	        }
	        return insertView;
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
	     * @param {object} [opts={}] Any options you want to use pass to transtion
	     * @returns {Promise} Returns a promise when the transition is completed
	     */
	    NavController.prototype.pop = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        // get the index of the active view
	        // which will become the view to be leaving
	        var activeView = this.getByState(STATE_TRANS_ENTER) ||
	            this.getByState(STATE_INIT_ENTER) ||
	            this.getActive();
	        return this.remove(this.indexOf(activeView), 1, opts);
	    };
	    /**
	     * Similar to `pop()`, this method let's you navigate back to the root of the stack, no matter how many views that is
	     * @param {object} [opts={}] Any options you want to use pass to transtion
	     */
	    NavController.prototype.popToRoot = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        return this.popTo(this.first(), opts);
	    };
	    /**
	     * Pop to a specific view in the history stack
	     * @param {ViewController} view  to pop to
	     * @param {object} [opts={}]  Any options you want to use pass to transtion
	     */
	    NavController.prototype.popTo = function (view, opts) {
	        if (opts === void 0) { opts = {}; }
	        var startIndex = this.indexOf(view);
	        var activeView = this.getByState(STATE_TRANS_ENTER) ||
	            this.getByState(STATE_INIT_ENTER) ||
	            this.getActive();
	        var removeCount = this.indexOf(activeView) - startIndex;
	        return this.remove(startIndex + 1, removeCount, opts);
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
	     *      this.nav.remove(1);
	     *    }
	     *  }
	     * ```
	     *
	     * @param {number} [startIndex]  The starting index to remove pages from the stack. Default is the index of the last page.
	     * @param {number} [removeCount]  The number of pages to remove, defaults to remove `1`.
	     * @param {object} [opts={}] Any options you want to use pass to transtion.
	     * @returns {Promise} Returns a promise when the page has been removed.
	     */
	    NavController.prototype.remove = function (startIndex, removeCount, opts) {
	        var _this = this;
	        if (startIndex === void 0) { startIndex = -1; }
	        if (removeCount === void 0) { removeCount = 1; }
	        if (opts === void 0) { opts = {}; }
	        if (startIndex === -1) {
	            startIndex = this._views.length - 1;
	        }
	        else if (startIndex < 0 || startIndex >= this._views.length) {
	            return Promise.reject("remove index out of range");
	        }
	        // default the direction to "back"
	        opts.direction = opts.direction || 'back';
	        // figure out the states of each view in the stack
	        var leavingView = this._remove(startIndex, removeCount);
	        if (!leavingView) {
	            var forcedActive = this.getByState(STATE_FORCE_ACTIVE);
	            if (forcedActive) {
	                // this scenario happens when a remove is going on
	                // during a transition
	                var resolve;
	                var promise = new Promise(function (res) { resolve = res; });
	                if (!opts.animation) {
	                    opts.animation = forcedActive.getTransitionName(opts.direction);
	                }
	                if (this._trans) {
	                    this._trans
	                        .onFinish(function () {
	                        opts.animate = false;
	                        _this._transition(forcedActive, null, opts, function (hasCompleted) {
	                            // transition has completed!!
	                            resolve(hasCompleted);
	                        });
	                    }, false, true)
	                        .stop();
	                    this._trans.destroy();
	                    this._trans = null;
	                }
	                else {
	                    resolve(false);
	                }
	                return promise;
	            }
	        }
	        if (leavingView) {
	            // there is a view ready to leave, meaning that a transition needs
	            // to happen and the previously active view is going to animate out
	            var resolve;
	            var promise = new Promise(function (res) { resolve = res; });
	            if (!opts.animation) {
	                opts.animation = leavingView.getTransitionName(opts.direction);
	            }
	            // get the view thats ready to enter
	            var enteringView = this.getByState(STATE_INIT_ENTER);
	            // start the transition, fire resolve when done...
	            this._transition(enteringView, leavingView, opts, function (hasCompleted) {
	                // transition has completed!!
	                resolve(hasCompleted);
	            });
	            return promise;
	        }
	        // no need to transition when the active view isn't being removed
	        // there's still an active view after _remove() figured out states
	        // so this means views that were only removed before the active
	        // view, so auto-resolve since no transition needs to happen
	        return Promise.resolve(false);
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._remove = function (startIndex, removeCount) {
	        var _this = this;
	        // when this is done, there should only be at most
	        // 1 STATE_INIT_ENTER and 1 STATE_INIT_LEAVE
	        // there should not be any that are STATE_ACTIVE after this is done
	        var view = null;
	        // loop through each view that is set to be removed
	        for (var i = startIndex, ii = removeCount + startIndex; i < ii; i++) {
	            view = this.getByIndex(i);
	            if (!view)
	                break;
	            if (view.state === STATE_TRANS_ENTER || view.state === STATE_TRANS_LEAVE) {
	                // oh no!!! this view should be removed, but it's
	                // actively transitioning in at the moment!!
	                // since it's viewable right now, let's just set that
	                // it should be removed after the transition
	                view.state = STATE_REMOVE_AFTER_TRANS;
	            }
	            else {
	                // if this view is already leaving then no need to immediately
	                // remove it, otherwise set the remove state
	                // this is useful if the view being removed isn't going to
	                // animate out, but just removed from the stack, no transition
	                view.state = STATE_REMOVE;
	            }
	        }
	        if (view = this.getByState(STATE_INIT_LEAVE)) {
	            // looks like there's already an active leaving view
	            // reassign previous entering view to just be inactive
	            var enteringView = this.getByState(STATE_INIT_ENTER);
	            if (enteringView) {
	                enteringView.state = STATE_INACTIVE;
	            }
	            // from the index of the leaving view, go backwards and
	            // find the first view that is inactive
	            for (var i = this.indexOf(view) - 1; i >= 0; i--) {
	                if (this._views[i].state === STATE_INACTIVE) {
	                    this._views[i].state = STATE_INIT_ENTER;
	                    break;
	                }
	            }
	        }
	        else if (view = this.getByState(STATE_TRANS_LEAVE)) {
	            // an active transition is happening, but a new transition
	            // still needs to happen force this view to be the active one
	            view.state = STATE_FORCE_ACTIVE;
	        }
	        else if (view = this.getByState(STATE_REMOVE)) {
	            // there is no active transition about to happen
	            // find the first view that is supposed to be removed and
	            // set that it is the init leaving view
	            // the first view to be removed, it should init leave
	            view.state = STATE_INIT_LEAVE;
	            view.willUnload();
	            // from the index of the leaving view, go backwards and
	            // find the first view that is inactive so it can be the entering
	            for (var i = this.indexOf(view) - 1; i >= 0; i--) {
	                if (this._views[i].state === STATE_INACTIVE) {
	                    this._views[i].state = STATE_INIT_ENTER;
	                    break;
	                }
	            }
	        }
	        // if there is still an active view, then it wasn't one that was
	        // set to be removed, so there actually won't be a transition at all
	        view = this.getActive();
	        if (view) {
	            // the active view remains untouched, so all the removes
	            // must have happened before it, so really no need for transition
	            view = this.getByState(STATE_INIT_ENTER);
	            if (view) {
	                // if it was going to enter, then just make inactive
	                view.state = STATE_INACTIVE;
	            }
	            view = this.getByState(STATE_INIT_LEAVE);
	            if (view) {
	                // this was going to leave, so just remove it completely
	                view.state = STATE_REMOVE;
	            }
	        }
	        // remove views that have been set to be removed, but not
	        // apart of any transitions that will eventually happen
	        this._views.filter(function (v) { return v.state === STATE_REMOVE; }).forEach(function (view) {
	            view.willLeave();
	            view.didLeave();
	            _this._views.splice(_this.indexOf(view), 1);
	            view.destroy();
	        });
	        return this.getByState(STATE_INIT_LEAVE);
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._transition = function (enteringView, leavingView, opts, done) {
	        var _this = this;
	        var transId = ++this._transIds;
	        if (enteringView === leavingView) {
	            // if the entering view and leaving view are the same thing don't continue
	            this._transFinish(transId, enteringView, leavingView, null, false);
	            return done(false);
	        }
	        // lets time this sucker, ready go
	        var wtfScope = instrumentation_1.wtfStartTimeRange('NavController#_transition', (enteringView && enteringView.name));
	        if (this.config.get('animate') === false ||
	            (this._views.length === 1 && !this._init)) {
	            opts.animate = false;
	        }
	        if (!leavingView) {
	            // if no leaving view then create a bogus one
	            leavingView = new view_controller_1.ViewController();
	        }
	        if (!enteringView) {
	            // if no entering view then create a bogus one
	            enteringView = new view_controller_1.ViewController();
	            enteringView.loaded();
	        }
	        /* Async steps to complete a transition
	          1. _render: compile the view and render it in the DOM. Load page if it hasn't loaded already. When done call postRender
	          2. _postRender: Run willEnter/willLeave, then wait a frame (change detection happens), then call beginTransition
	          3. _beforeTrans: Create the transition's animation, play the animation, wait for it to end
	          4. _afterTrans: Run didEnter/didLeave, call _transComplete()
	          5. _transComplete: Cleanup, remove cache views, then call the final callback
	        */
	        // begin the multiple async process of transitioning to the entering view
	        this._render(transId, enteringView, leavingView, opts, function (hasCompleted) {
	            _this._transFinish(transId, enteringView, leavingView, opts.direction, hasCompleted);
	            instrumentation_1.wtfEndTimeRange(wtfScope);
	            done(hasCompleted);
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._render = function (transId, enteringView, leavingView, opts, done) {
	        // compile/load the view into the DOM
	        var _this = this;
	        if (enteringView.state === STATE_INACTIVE) {
	            // this entering view is already set to inactive, so this
	            // transition must be canceled, so don't continue
	            return done();
	        }
	        enteringView.state = STATE_INIT_ENTER;
	        leavingView.state = STATE_INIT_LEAVE;
	        // remember if this nav is already transitioning or not
	        var isAlreadyTransitioning = this.isTransitioning();
	        if (enteringView.isLoaded()) {
	            // already compiled this view, do not load again and continue
	            this._postRender(transId, enteringView, leavingView, isAlreadyTransitioning, opts, done);
	        }
	        else {
	            // view has not been compiled/loaded yet
	            // continue once the view has finished compiling
	            // DOM WRITE
	            this.setTransitioning(true, 500);
	            this.loadPage(enteringView, null, opts, function () {
	                if (enteringView.onReady) {
	                    // this entering view needs to wait for it to be ready
	                    // this is used by Tabs to wait for the first page of
	                    // the first selected tab to be loaded
	                    enteringView.onReady(function () {
	                        enteringView.loaded();
	                        _this._postRender(transId, enteringView, leavingView, isAlreadyTransitioning, opts, done);
	                    });
	                }
	                else {
	                    enteringView.loaded();
	                    _this._postRender(transId, enteringView, leavingView, isAlreadyTransitioning, opts, done);
	                }
	            });
	        }
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._postRender = function (transId, enteringView, leavingView, isAlreadyTransitioning, opts, done) {
	        // called after _render has completed and the view is compiled/loaded
	        var _this = this;
	        if (enteringView.state === STATE_INACTIVE) {
	            // this entering view is already set to inactive, so this
	            // transition must be canceled, so don't continue
	            return done();
	        }
	        if (!opts.preload) {
	            // the enteringView will become the active view, and is not being preloaded
	            // set the correct zIndex for the entering and leaving views
	            // if there's already another trans_enter happening then
	            // the zIndex for the entering view should go off of that one
	            // DOM WRITE
	            var lastestLeavingView = this.getByState(STATE_TRANS_ENTER) || leavingView;
	            this._setZIndex(enteringView, lastestLeavingView, opts.direction);
	            // make sure the entering and leaving views are showing
	            // DOM WRITE
	            if (isAlreadyTransitioning) {
	                // the previous transition was still going when this one started
	                // so to be safe, only update showing the entering/leaving
	                // don't hide the others when they could still be transitioning
	                enteringView.domCache(true, this._renderer);
	                leavingView.domCache(true, this._renderer);
	            }
	            else {
	                // there are no other transitions happening but this one
	                // only entering/leaving should show, all others hidden
	                this._views.forEach(function (view) {
	                    var shouldShow = (view === enteringView) || (view === leavingView);
	                    view.domCache(shouldShow, _this._renderer);
	                });
	            }
	            // call each view's lifecycle events
	            enteringView.willEnter();
	            leavingView.willLeave();
	        }
	        else {
	            // this view is being preloaded, don't call lifecycle events
	            // transition does not need to animate
	            opts.animate = false;
	        }
	        this._beforeTrans(enteringView, leavingView, opts, done);
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._beforeTrans = function (enteringView, leavingView, opts, done) {
	        // called after one raf from postRender()
	        // create the transitions animation, play the animation
	        // when the transition ends call wait for it to end
	        var _this = this;
	        if (enteringView.state === STATE_INACTIVE) {
	            // this entering view is already set to inactive, so this
	            // transition must be canceled, so don't continue
	            return done();
	        }
	        enteringView.state = STATE_TRANS_ENTER;
	        leavingView.state = STATE_TRANS_LEAVE;
	        // everything during the transition should runOutsideAngular
	        this._zone.runOutsideAngular(function () {
	            // init the transition animation
	            var transitionOpts = {
	                animation: opts.animation,
	                direction: opts.direction,
	                duration: opts.duration,
	                easing: opts.easing,
	                renderDelay: opts.transitionDelay || _this._trnsDelay,
	                isRTL: _this.config.platform.isRTL()
	            };
	            var transAnimation = transition_1.Transition.createTransition(enteringView, leavingView, transitionOpts);
	            _this._trans && _this._trans.destroy();
	            _this._trans = transAnimation;
	            if (opts.animate === false) {
	                // force it to not animate the elements, just apply the "to" styles
	                transAnimation.duration(0);
	            }
	            var duration = transAnimation.getDuration();
	            var enableApp = (duration < 64);
	            // block any clicks during the transition and provide a
	            // fallback to remove the clickblock if something goes wrong
	            _this._app.setEnabled(enableApp, duration);
	            _this.setTransitioning(!enableApp, duration);
	            if (enteringView.viewType) {
	                transAnimation.before.addClass(enteringView.viewType);
	            }
	            // create a callback for when the animation is done
	            transAnimation.onFinish(function (hasCompleted) {
	                // transition animation has ended
	                // destroy the animation and it's element references
	                transAnimation.destroy();
	                _this._afterTrans(enteringView, leavingView, opts, hasCompleted, done);
	            });
	            // cool, let's do this, start the transition
	            if (opts.progressAnimation) {
	                // this is a swipe to go back, just get the transition progress ready
	                // kick off the swipe animation start
	                transAnimation.progressStart();
	            }
	            else {
	                // this is a normal animation
	                // kick it off and let it play through
	                transAnimation.play();
	            }
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._afterTrans = function (enteringView, leavingView, opts, hasCompleted, done) {
	        // transition has completed, update each view's state
	        // place back into the zone, run didEnter/didLeave
	        // call the final callback when done
	        var _this = this;
	        // run inside of the zone again
	        this._zone.run(function () {
	            if (!opts.preload && hasCompleted) {
	                enteringView.didEnter();
	                leavingView.didLeave();
	            }
	            if (enteringView.state === STATE_INACTIVE) {
	                // this entering view is already set to inactive, so this
	                // transition must be canceled, so don't continue
	                return done(hasCompleted);
	            }
	            if (opts.keyboardClose !== false && _this._keyboard.isOpen()) {
	                // the keyboard is still open!
	                // no problem, let's just close for them
	                _this._keyboard.close();
	                _this._keyboard.onClose(function () {
	                    // keyboard has finished closing, transition complete
	                    done(hasCompleted);
	                }, 32);
	            }
	            else {
	                // all good, transition complete
	                done(hasCompleted);
	            }
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._transFinish = function (transId, enteringView, leavingView, direction, hasCompleted) {
	        // a transition has completed, but not sure if it's the last one or not
	        // check if this transition is the most recent one or not
	        var _this = this;
	        if (transId === this._transIds) {
	            // ok, good news, there were no other transitions that kicked
	            // off during the time this transition started and ended
	            if (hasCompleted) {
	                // this transition has completed as normal
	                // so the entering one is now the active view
	                // and the leaving view is now just inactive
	                if (enteringView.state !== STATE_REMOVE_AFTER_TRANS) {
	                    enteringView.state = STATE_ACTIVE;
	                }
	                if (leavingView.state !== STATE_REMOVE_AFTER_TRANS) {
	                    leavingView.state = STATE_INACTIVE;
	                }
	                // only need to do all this clean up if the transition
	                // completed, otherwise nothing actually changed
	                // destroy all of the views that come after the active view
	                this._cleanup();
	                // make sure only this entering view and PREVIOUS view are the
	                // only two views that are not display:none
	                leavingView = this.getPrevious(enteringView);
	                this._views.forEach(function (view) {
	                    var shouldShow = (view === enteringView) || (view === leavingView);
	                    view.domCache(shouldShow, _this._renderer);
	                });
	                // this check only needs to happen once, which will add the css
	                // class to the nav when it's finished its first transition
	                if (!this._init) {
	                    this._init = true;
	                    this._renderer.setElementClass(this.elementRef.nativeElement, 'has-views', true);
	                }
	            }
	            else {
	                // this transition has not completed, meaning the
	                // entering view did not end up as the active view
	                // this would happen when swipe to go back started
	                // but the user did not complete the swipe and the
	                // what was the active view stayed as the active view
	                leavingView.state = STATE_ACTIVE;
	                enteringView.state = STATE_INACTIVE;
	            }
	            // allow clicks and enable the app again
	            this._app && this._app.setEnabled(true);
	            this.setTransitioning(false);
	            if (this.router && direction !== null && hasCompleted) {
	                // notify router of the state change if a direction was provided
	                this.router.stateChange(direction, enteringView);
	            }
	            // see if we should add the swipe back gesture listeners or not
	            this._sbCheck();
	        }
	        else {
	            // darn, so this wasn't the most recent transition
	            // so while this one did end, there's another more recent one
	            // still going on. Because a new transition is happening,
	            // then this entering view isn't actually going to be the active
	            // one, so only update the state to active/inactive if the state
	            // wasn't already updated somewhere else during its transition
	            if (enteringView.state === STATE_TRANS_ENTER) {
	                enteringView.state = STATE_INACTIVE;
	            }
	            if (leavingView.state === STATE_TRANS_LEAVE) {
	                leavingView.state = STATE_INACTIVE;
	            }
	        }
	    };
	    NavController.prototype._cleanup = function () {
	        var _this = this;
	        // ok, cleanup time!! Destroy all of the views that are
	        // INACTIVE and come after the active view
	        var activeViewIndex = this.indexOf(this.getActive());
	        var destroys = this._views.filter(function (v) { return v.state === STATE_REMOVE_AFTER_TRANS; });
	        for (var i = activeViewIndex + 1; i < this._views.length; i++) {
	            if (this._views[i].state === STATE_INACTIVE) {
	                destroys.push(this._views[i]);
	            }
	        }
	        // all pages being destroyed should be removed from the list of
	        // pages and completely removed from the dom
	        destroys.forEach(function (view) {
	            _this._views.splice(_this.indexOf(view), 1);
	            view.destroy();
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype.loadPage = function (view, navbarContainerRef, opts, done) {
	        var _this = this;
	        var wtfTimeRangeScope = instrumentation_1.wtfStartTimeRange('NavController#loadPage', view.name);
	        // guts of DynamicComponentLoader#loadIntoLocation
	        this._compiler && this._compiler.compileInHost(view.componentType).then(function (hostProtoViewRef) {
	            var wtfScope = instrumentation_1.wtfCreateScope('NavController#loadPage_After_Compile')();
	            var providers = _this.providers.concat(core_1.Injector.resolve([
	                core_1.provide(view_controller_1.ViewController, { useValue: view }),
	                core_1.provide(nav_params_1.NavParams, { useValue: view.getNavParams() })
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
	            var cssClassName = util_1.pascalCaseToDashCase(view.componentType['name']);
	            _this._renderer.setElementClass(pageElementRef.nativeElement, cssClassName, true);
	            view.addDestroy(function () {
	                // ensure the element is cleaned up for when the view pool reuses this element
	                _this._renderer.setElementAttribute(pageElementRef.nativeElement, 'class', null);
	                _this._renderer.setElementAttribute(pageElementRef.nativeElement, 'style', null);
	                // remove the page from its container
	                var index = viewContainer.indexOf(hostViewRef);
	                if (!hostViewRef.destroyed && index !== -1) {
	                    viewContainer.remove(index);
	                }
	            });
	            // a new ComponentRef has been created
	            // set the ComponentRef's instance to this ViewController
	            view.setInstance(component);
	            // remember the ElementRef to the ion-page elementRef that was just created
	            view.setPageRef(pageElementRef);
	            if (!navbarContainerRef) {
	                navbarContainerRef = view.getNavbarViewRef();
	            }
	            var navbarTemplateRef = view.getNavbarTemplateRef();
	            if (navbarContainerRef && navbarTemplateRef) {
	                var navbarViewRef = navbarContainerRef.createEmbeddedView(navbarTemplateRef);
	                view.addDestroy(function () {
	                    var index = navbarContainerRef.indexOf(navbarViewRef);
	                    if (!navbarViewRef.destroyed && index > -1) {
	                        navbarContainerRef.remove(index);
	                    }
	                });
	            }
	            opts.postLoad && opts.postLoad(view);
	            instrumentation_1.wtfEndTimeRange(wtfTimeRangeScope);
	            instrumentation_1.wtfLeave(wtfScope);
	            done(view);
	        });
	    };
	    /**
	     * @private
	     */
	    NavController.prototype.swipeBackStart = function () {
	        // default the direction to "back"
	        var opts = {
	            direction: 'back',
	            progressAnimation: true
	        };
	        // figure out the states of each view in the stack
	        var leavingView = this._remove(this._views.length - 1, 1);
	        if (leavingView) {
	            opts.animation = leavingView.getTransitionName(opts.direction);
	            // get the view thats ready to enter
	            var enteringView = this.getByState(STATE_INIT_ENTER);
	            // start the transition, fire callback when done...
	            this._transition(enteringView, leavingView, opts, function (hasCompleted) {
	                // swipe back has finished!!
	                void 0;
	            });
	        }
	    };
	    /**
	     * @private
	     */
	    NavController.prototype.swipeBackProgress = function (stepValue) {
	        if (this._trans && this._sbGesture) {
	            // continue to disable the app while actively dragging
	            this._app.setEnabled(false, 4000);
	            this.setTransitioning(true, 4000);
	            // set the transition animation's progress
	            this._trans.progressStep(stepValue);
	        }
	    };
	    /**
	     * @private
	     */
	    NavController.prototype.swipeBackEnd = function (shouldComplete, currentStepValue) {
	        if (this._trans && this._sbGesture) {
	            // the swipe back gesture has ended
	            this._trans.progressEnd(shouldComplete, currentStepValue);
	        }
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._sbCheck = function () {
	        var _this = this;
	        if (this._sbEnabled) {
	            // this nav controller can have swipe to go back
	            if (!this._sbGesture) {
	                // create the swipe back gesture if we haven't already
	                var opts = {
	                    edge: 'left',
	                    threshold: this._sbThreshold
	                };
	                this._sbGesture = new swipe_back_1.SwipeBackGesture(this.getNativeElement(), opts, this);
	            }
	            if (this.canSwipeBack()) {
	                // it is be possible to swipe back
	                if (!this._sbGesture.isListening) {
	                    this._zone.runOutsideAngular(function () {
	                        // start listening if it's not already
	                        void 0;
	                        _this._sbGesture.listen();
	                    });
	                }
	            }
	            else if (this._sbGesture.isListening) {
	                // it should not be possible to swipe back
	                // but the gesture is still listening
	                void 0;
	                this._sbGesture.unlisten();
	            }
	        }
	    };
	    Object.defineProperty(NavController.prototype, "swipeBackEnabled", {
	        /**
	         * @input {boolean} Whether it's possible to swipe-to-go-back on this nav controller or not.
	         */
	        get: function () {
	            return this._sbEnabled;
	        },
	        set: function (val) {
	            this._sbEnabled = util_1.isTrueProperty(val);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * If it's possible to use swipe back or not. If it's not possible
	     * to go back, or swipe back is not enable then this will return false.
	     * If it is possible to go back, and swipe back is enabled, then this
	     * will return true.
	     * @returns {boolean} Whether you can swipe to go back
	     */
	    NavController.prototype.canSwipeBack = function () {
	        return (this._sbEnabled && !this.isTransitioning() && this._app.isEnabled() && this.canGoBack());
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
	     * Boolean if the nav controller is actively transitioning or not.
	     * @private
	     * @return {boolean}
	     */
	    NavController.prototype.isTransitioning = function () {
	        return (this._trnsTime > Date.now());
	    };
	    /**
	     * @private
	     * @return {boolean}
	     */
	    NavController.prototype.setTransitioning = function (isTransitioning, fallback) {
	        if (fallback === void 0) { fallback = 700; }
	        this._trnsTime = (isTransitioning ? Date.now() + fallback : 0);
	    };
	    /**
	     * @private
	     * @returns {ViewController}
	     */
	    NavController.prototype.getByState = function (state) {
	        for (var i = this._views.length - 1; i >= 0; i--) {
	            if (this._views[i].state === state) {
	                return this._views[i];
	            }
	        }
	        return null;
	    };
	    /**
	     * @param {number} index  The index of the page you want to get
	     * @returns {ViewController} Returns the component that matches the index given
	     */
	    NavController.prototype.getByIndex = function (index) {
	        return (index < this._views.length && index > -1 ? this._views[index] : null);
	    };
	    /**
	     * @returns {ViewController} Returns the active page's view controller.
	     */
	    NavController.prototype.getActive = function () {
	        return this.getByState(STATE_ACTIVE);
	    };
	    /**
	     * @param {ViewController} view
	     * @returns {boolean}
	     */
	    NavController.prototype.isActive = function (view) {
	        return !!(view && view.state === STATE_ACTIVE);
	    };
	    /**
	     * @param {ViewController} view  The ViewController to get the previous view to
	     * @returns {viewController}
	     */
	    NavController.prototype.getPrevious = function (view) {
	        return this.getByIndex(this.indexOf(view) - 1);
	    };
	    /**
	     * First page in this nav controller's stack.
	     * @returns {ViewController} Returns the first component page in the current stack
	     */
	    NavController.prototype.first = function () {
	        return (this._views.length ? this._views[0] : null);
	    };
	    /**
	     * Last page in this nav controller's stack. This would not return a page which is about to be destroyed.
	     * @returns {ViewController} Returns the last component page in the current stack
	     */
	    NavController.prototype.last = function () {
	        return (this._views.length ? this._views[this._views.length - 1] : null);
	    };
	    /**
	     * @param {ViewController} view
	     * @returns {number} Returns the index number of the view
	     */
	    NavController.prototype.indexOf = function (view) {
	        return this._views.indexOf(view);
	    };
	    /**
	     * Number of sibling views in the nav controller.
	     * @returns {number} The number of views in stack, including the current view
	     */
	    NavController.prototype.length = function () {
	        return this._views.length;
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
	    /**
	     * @private
	     */
	    NavController.prototype._incId = function (view) {
	        view.id = this.id + '-' + (++this._ids);
	    };
	    /**
	     * @private
	     */
	    NavController.prototype._setZIndex = function (enteringView, leavingView, direction) {
	        if (enteringView) {
	            // get the leaving view, which could be in various states
	            if (!leavingView || !leavingView.isLoaded()) {
	                enteringView.setZIndex(INIT_ZINDEX, this._renderer);
	            }
	            else if (direction === 'back') {
	                // moving back
	                enteringView.setZIndex(leavingView.zIndex - 1, this._renderer);
	            }
	            else {
	                // moving forward
	                enteringView.setZIndex(leavingView.zIndex + 1, this._renderer);
	            }
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], NavController.prototype, "swipeBackEnabled", null);
	    return NavController;
	})(ion_1.Ion);
	exports.NavController = NavController;
	var STATE_ACTIVE = 'active';
	var STATE_INACTIVE = 'inactive';
	var STATE_INIT_ENTER = 'init_enter';
	var STATE_INIT_LEAVE = 'init_leave';
	var STATE_TRANS_ENTER = 'trans_enter';
	var STATE_TRANS_LEAVE = 'trans_leave';
	var STATE_REMOVE = 'remove';
	var STATE_REMOVE_AFTER_TRANS = 'remove_after_trans';
	var STATE_FORCE_ACTIVE = 'force_active';
	var INIT_ZINDEX = 10;
	var ctrlIds = -1;


/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("angular2")["instrumentation"];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var slide_edge_gesture_1 = __webpack_require__(30);
	var util_1 = __webpack_require__(9);
	var SwipeBackGesture = (function (_super) {
	    __extends(SwipeBackGesture, _super);
	    function SwipeBackGesture(element, options, _nav) {
	        _super.call(this, element, util_1.assign({
	            direction: 'x',
	            maxEdgeStart: 75
	        }, options));
	        this._nav = _nav;
	    }
	    SwipeBackGesture.prototype.canStart = function (ev) {
	        // the gesture swipe angle must be mainly horizontal and the
	        // gesture distance would be relatively short for a swipe back
	        // and swipe back must be possible on this nav controller
	        if (ev.angle > -40 &&
	            ev.angle < 40 &&
	            ev.distance < 50 &&
	            this._nav.canSwipeBack()) {
	            // passed the tests, now see if the super says it's cool or not
	            return _super.prototype.canStart.call(this, ev);
	        }
	        // nerp, not today
	        return false;
	    };
	    SwipeBackGesture.prototype.onSlideBeforeStart = function () {
	        void 0;
	        this._nav.swipeBackStart();
	    };
	    SwipeBackGesture.prototype.onSlide = function (slide) {
	        var stepValue = (slide.distance / slide.max);
	        void 0;
	        this._nav.swipeBackProgress(stepValue);
	    };
	    SwipeBackGesture.prototype.onSlideEnd = function (slide, ev) {
	        var shouldComplete = (Math.abs(ev.velocityX) > 0.2 || Math.abs(slide.delta) > Math.abs(slide.max) * 0.5);
	        var currentStepValue = (slide.distance / slide.max);
	        void 0;
	        this._nav.swipeBackEnd(shouldComplete, currentStepValue);
	    };
	    return SwipeBackGesture;
	})(slide_edge_gesture_1.SlideEdgeGesture);
	exports.SwipeBackGesture = SwipeBackGesture;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var animation_1 = __webpack_require__(47);
	/**
	 * @private
	 **/
	var Transition = (function (_super) {
	    __extends(Transition, _super);
	    function Transition(opts) {
	        _super.call(this, null, {
	            renderDelay: opts.renderDelay
	        });
	    }
	    Transition.createTransition = function (enteringView, leavingView, opts) {
	        var TransitionClass = TransitionRegistry[opts.animation];
	        if (!TransitionClass) {
	            // didn't find a transition animation, default to ios-transition
	            TransitionClass = TransitionRegistry['ios-transition'];
	        }
	        return new TransitionClass(enteringView, leavingView, opts);
	    };
	    Transition.register = function (name, TransitionClass) {
	        TransitionRegistry[name] = TransitionClass;
	    };
	    return Transition;
	})(animation_1.Animation);
	exports.Transition = Transition;
	var TransitionRegistry = {};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var dom_1 = __webpack_require__(10);
	var util_1 = __webpack_require__(9);
	/**
	 * @private
	 **/
	var Animation = (function () {
	    function Animation(ele, opts) {
	        if (opts === void 0) { opts = {}; }
	        this._wChg = false;
	        this._lastUpd = 0;
	        this._reset();
	        this.element(ele);
	        this._opts = util_1.assign({
	            renderDelay: 24
	        }, opts);
	    }
	    Animation.prototype._reset = function () {
	        this._el = [];
	        this._c = [];
	        this._fx = {};
	        this._bfSty = {};
	        this._bfAdd = [];
	        this._bfRmv = [];
	        this._afSty = {};
	        this._afAdd = [];
	        this._afRmv = [];
	        this._pFns = [];
	        this._fFns = [];
	        this._fOnceFns = [];
	        this._clearAsync();
	        this.isPlaying = this.hasTween = this._rv = false;
	        this._easing = this._dur = null;
	    };
	    Animation.prototype.element = function (ele) {
	        var i;
	        if (ele) {
	            if (Array.isArray(ele)) {
	                for (i = 0; i < ele.length; i++) {
	                    this._addEle(ele[i]);
	                }
	            }
	            else if (typeof ele === 'string') {
	                ele = doc.querySelector(ele);
	                for (i = 0; i < ele.length; i++) {
	                    this._addEle(ele[i]);
	                }
	            }
	            else {
	                this._addEle(ele);
	            }
	        }
	        return this;
	    };
	    Animation.prototype._addEle = function (ele) {
	        if (ele.nativeElement) {
	            ele = ele.nativeElement;
	        }
	        if (ele.nodeType === 1) {
	            this._el.push(ele);
	            // does this element suport will-change property?
	            this._wChg = (typeof ele.style.willChange !== 'undefined');
	        }
	    };
	    Animation.prototype.parent = function (parentAnimation) {
	        this._parent = parentAnimation;
	        return this;
	    };
	    Animation.prototype.add = function (childAnimation) {
	        childAnimation.parent(this);
	        this._c.push(childAnimation);
	        return this;
	    };
	    Animation.prototype.getDuration = function () {
	        return this._dur !== null ? this._dur : (this._parent && this._parent.getDuration()) || 0;
	    };
	    Animation.prototype.duration = function (milliseconds) {
	        this._dur = milliseconds;
	        return this;
	    };
	    Animation.prototype.getEasing = function () {
	        return this._easing !== null ? this._easing : (this._parent && this._parent.getEasing()) || null;
	    };
	    Animation.prototype.easing = function (name) {
	        this._easing = name;
	        return this;
	    };
	    Animation.prototype.from = function (prop, val) {
	        this._addProp('from', prop, val);
	        return this;
	    };
	    Animation.prototype.to = function (prop, val, clearProperyAfterTransition) {
	        var fx = this._addProp('to', prop, val);
	        if (clearProperyAfterTransition) {
	            // if this effect is a transform then clear the transform effect
	            // otherwise just clear the actual property
	            this.after.clearStyles([fx.trans ? dom_1.CSS.transform : prop]);
	        }
	        return this;
	    };
	    Animation.prototype.fromTo = function (prop, fromVal, toVal, clearProperyAfterTransition) {
	        return this.from(prop, fromVal).to(prop, toVal, clearProperyAfterTransition);
	    };
	    Animation.prototype._addProp = function (state, prop, val) {
	        var fxProp = this._fx[prop];
	        if (!fxProp) {
	            // first time we've see this EffectProperty
	            fxProp = this._fx[prop] = {
	                trans: (typeof TRANSFORMS[prop] !== 'undefined'),
	                wc: ''
	            };
	            // add the will-change property fo transforms or opacity
	            if (fxProp.trans) {
	                fxProp.wc = dom_1.CSS.transform;
	            }
	            else if (prop === 'opacity') {
	                fxProp.wc = prop;
	            }
	        }
	        // add from/to EffectState to the EffectProperty
	        var fxState = fxProp[state] = {
	            val: val,
	            num: null,
	            unit: '',
	        };
	        if (typeof val === 'string' && val.indexOf(' ') < 0) {
	            var r = val.match(cssValueRegex);
	            var num = parseFloat(r[1]);
	            if (!isNaN(num)) {
	                fxState.num = num;
	            }
	            fxState.unit = (r[0] != r[2] ? r[2] : '');
	        }
	        else if (typeof val === 'number') {
	            fxState.num = val;
	        }
	        return fxProp;
	    };
	    Animation.prototype.fadeIn = function () {
	        return this.fromTo('opacity', 0.001, 1, true);
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
	                },
	                clearStyles: function (propertyNames) {
	                    for (var i = 0; i < propertyNames.length; i++) {
	                        _this._bfSty[propertyNames[i]] = '';
	                    }
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
	                },
	                setStyles: function (styles) {
	                    _this._afSty = styles;
	                    return _this;
	                },
	                clearStyles: function (propertyNames) {
	                    for (var i = 0; i < propertyNames.length; i++) {
	                        _this._afSty[propertyNames[i]] = '';
	                    }
	                    return _this;
	                }
	            };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Animation.prototype.play = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        var self = this;
	        var i;
	        var duration = util_1.isDefined(opts.duration) ? opts.duration : self._dur;
	        void 0;
	        // always default that an animation does not tween
	        // a tween requires that an Animation class has an element
	        // and that it has at least one FROM/TO effect
	        // and that the FROM/TO effect can tween numeric values
	        self.hasTween = false;
	        // fire off all the onPlays
	        for (i = 0; i < self._pFns.length; i++) {
	            self._pFns[i]();
	        }
	        this.isPlaying = true;
	        // this is the top level animation and is in full control
	        // of when the async play() should actually kick off
	        // if there is no duration then it'll set the TO property immediately
	        // if there is a duration, then it'll stage all animations at the
	        // FROM property and transition duration, wait a few frames, then
	        // kick off the animation by setting the TO property for each animation
	        // stage all of the before css classes and inline styles
	        // will recursively stage all child elements
	        self._before();
	        // ensure all past transition end events have been cleared
	        this._clearAsync();
	        if (duration > 30) {
	            // this animation has a duration, so it should animate
	            // place all the elements with their FROM properties
	            // set the FROM properties
	            self._progress(0);
	            self._willChange(true);
	            // set the async TRANSITION END event
	            // and run onFinishes when the transition ends
	            self._asyncEnd(duration, true);
	            // begin each animation when everything is rendered in their place
	            // and the transition duration/easing is ready to go
	            dom_1.rafFrames(self._opts.renderDelay / 16, function () {
	                // there's been a moment and the elements are in place
	                // now set the TRANSITION duration/easing
	                self._setTrans(duration, false);
	                // wait a few moments again to wait for the transition
	                // info to take hold in the DOM
	                dom_1.rafFrames(2, function () {
	                    // browser had some time to render everything in place
	                    // and the transition duration/easing is set
	                    // now set the TO properties
	                    // which will trigger the transition to begin
	                    self._progress(1);
	                });
	            });
	        }
	        else {
	            // this animation does not have a duration, so it should not animate
	            // just go straight to the TO properties and call it done
	            self._progress(1);
	            // since there was no animation, immediately run the after
	            self._after();
	            // since there was no animation, it's done
	            // fire off all the onFinishes
	            self._onFinish(true);
	        }
	    };
	    Animation.prototype.stop = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        var self = this;
	        var duration = util_1.isDefined(opts.duration) ? opts.duration : 0;
	        var stepValue = util_1.isDefined(opts.stepValue) ? opts.stepValue : 1;
	        // ensure all past transition end events have been cleared
	        this._clearAsync();
	        // set the TO properties
	        self._progress(stepValue);
	        if (duration > 30) {
	            // this animation has a duration, so it should animate
	            // place all the elements with their TO properties
	            // now set the TRANSITION duration
	            self._setTrans(duration, true);
	            // set the async TRANSITION END event
	            // and run onFinishes when the transition ends
	            self._asyncEnd(duration, false);
	        }
	        else {
	            // this animation does not have a duration, so it should not animate
	            // just go straight to the TO properties and call it done
	            self._after();
	            // since there was no animation, it's done
	            // fire off all the onFinishes
	            self._onFinish(false);
	        }
	    };
	    Animation.prototype._asyncEnd = function (duration, shouldComplete) {
	        var self = this;
	        function onTransitionEnd(ev) {
	            void 0;
	            // ensure transition end events and timeouts have been cleared
	            self._clearAsync();
	            // set the after styles
	            self._after();
	            self._willChange(false);
	            self._onFinish(shouldComplete);
	        }
	        // set the TRANSITION END event on one of the transition elements
	        self._unregTrans = dom_1.transitionEnd(self._transEl(), onTransitionEnd);
	        // set a fallback timeout if the transition end event never fires
	        self._tmr = setTimeout(onTransitionEnd, duration + 300);
	    };
	    Animation.prototype._clearAsync = function () {
	        this._unregTrans && this._unregTrans();
	        clearTimeout(this._tmr);
	    };
	    Animation.prototype._progress = function (stepValue) {
	        // bread 'n butter
	        var i, prop, fx, val, transforms, tweenEffect;
	        for (i = 0; i < this._c.length; i++) {
	            this._c[i]._progress(stepValue);
	        }
	        if (this._el.length) {
	            // flip the number if we're going in reverse
	            if (this._rv) {
	                stepValue = ((stepValue * -1) + 1);
	            }
	            transforms = [];
	            for (prop in this._fx) {
	                fx = this._fx[prop];
	                if (fx.from && fx.to) {
	                    tweenEffect = (fx.from.num !== fx.to.num);
	                    if (tweenEffect) {
	                        this.hasTween = true;
	                    }
	                    if (stepValue === 0) {
	                        // FROM
	                        val = fx.from.val;
	                    }
	                    else if (stepValue === 1) {
	                        // TO
	                        val = fx.to.val;
	                    }
	                    else if (tweenEffect) {
	                        // EVERYTHING IN BETWEEN
	                        val = (((fx.to.num - fx.from.num) * stepValue) + fx.from.num) + fx.to.unit;
	                    }
	                    else {
	                        val = null;
	                    }
	                    if (val !== null) {
	                        if (fx.trans) {
	                            transforms.push(prop + '(' + val + ')');
	                        }
	                        else {
	                            for (i = 0; i < this._el.length; i++) {
	                                this._el[i].style[prop] = val;
	                            }
	                        }
	                    }
	                }
	            }
	            // place all transforms on the same property
	            if (transforms.length) {
	                if (!this._wChg) {
	                    // if the element doesn't support will-change
	                    // then auto add translateZ for transform properties
	                    transforms.push('translateZ(0px)');
	                }
	                for (i = 0; i < this._el.length; i++) {
	                    this._el[i].style[dom_1.CSS.transform] = transforms.join(' ');
	                }
	            }
	        }
	    };
	    Animation.prototype._setTrans = function (duration, forcedLinearEasing) {
	        var i, easing;
	        // set the TRANSITION properties inline on the element
	        for (i = 0; i < this._c.length; i++) {
	            this._c[i]._setTrans(duration, forcedLinearEasing);
	        }
	        if (Object.keys(this._fx).length) {
	            for (i = 0; i < this._el.length; i++) {
	                // all parent/child animations should have the same duration
	                this._el[i].style[dom_1.CSS.transitionDuration] = duration + 'ms';
	                // each animation can have a different easing
	                easing = (forcedLinearEasing ? 'linear' : this.getEasing());
	                if (easing) {
	                    this._el[i].style[dom_1.CSS.transitionTimingFn] = easing;
	                }
	            }
	        }
	    };
	    Animation.prototype._willChange = function (addWillChange) {
	        var i, wc, prop;
	        for (i = 0; i < this._c.length; i++) {
	            this._c[i]._willChange(addWillChange);
	        }
	        if (this._wChg) {
	            wc = [];
	            if (addWillChange) {
	                for (prop in this._fx) {
	                    if (this._fx[prop].wc !== '') {
	                        wc.push(this._fx[prop].wc);
	                    }
	                }
	            }
	            for (i = 0; i < this._el.length; i++) {
	                this._el[i].style['willChange'] = wc.join(',');
	            }
	        }
	    };
	    Animation.prototype._before = function () {
	        // before the RENDER_DELAY
	        // before the animations have started
	        var i, j, prop, ele;
	        // stage all of the child animations
	        for (i = 0; i < this._c.length; i++) {
	            this._c[i]._before();
	        }
	        if (!this._rv) {
	            for (i = 0; i < this._el.length; i++) {
	                ele = this._el[i];
	                // css classes to add before the animation
	                for (j = 0; j < this._bfAdd.length; j++) {
	                    ele.classList.add(this._bfAdd[j]);
	                }
	                // css classes to remove before the animation
	                for (j = 0; j < this._bfRmv.length; j++) {
	                    ele.classList.remove(this._bfRmv[j]);
	                }
	                // inline styles to add before the animation
	                for (prop in this._bfSty) {
	                    ele.style[prop] = this._bfSty[prop];
	                }
	            }
	        }
	    };
	    Animation.prototype._after = function () {
	        // after the animations have finished
	        var i, j, prop, ele;
	        for (i = 0; i < this._c.length; i++) {
	            this._c[i]._after();
	        }
	        for (i = 0; i < this._el.length; i++) {
	            ele = this._el[i];
	            // remove the transition duration/easing
	            ele.style[dom_1.CSS.transitionDuration] = '';
	            ele.style[dom_1.CSS.transitionTimingFn] = '';
	            if (this._rv) {
	                // finished in reverse direction
	                // css classes that were added before the animation should be removed
	                for (j = 0; j < this._bfAdd.length; j++) {
	                    ele.classList.remove(this._bfAdd[j]);
	                }
	                // css classes that were removed before the animation should be added
	                for (j = 0; j < this._bfRmv.length; j++) {
	                    ele.classList.add(this._bfRmv[j]);
	                }
	                // inline styles that were added before the animation should be removed
	                for (prop in this._bfSty) {
	                    ele.style[prop] = '';
	                }
	            }
	            else {
	                // finished in forward direction
	                // css classes to add after the animation
	                for (j = 0; j < this._afAdd.length; j++) {
	                    ele.classList.add(this._afAdd[j]);
	                }
	                // css classes to remove after the animation
	                for (j = 0; j < this._afRmv.length; j++) {
	                    ele.classList.remove(this._afRmv[j]);
	                }
	                // inline styles to add after the animation
	                for (prop in this._afSty) {
	                    ele.style[prop] = this._afSty[prop];
	                }
	            }
	        }
	    };
	    Animation.prototype.progressStart = function () {
	        for (var i = 0; i < this._c.length; i++) {
	            this._c[i].progressStart();
	        }
	        this._before();
	        // force no duration, linear easing
	        this._setTrans(0, true);
	    };
	    Animation.prototype.progressStep = function (stepValue) {
	        var now = Date.now();
	        // only update if the last update was more than 16ms ago
	        if (now - 16 > this._lastUpd) {
	            this._lastUpd = now;
	            stepValue = Math.min(1, Math.max(0, stepValue));
	            for (var i = 0; i < this._c.length; i++) {
	                this._c[i].progressStep(stepValue);
	            }
	            if (this._rv) {
	                // if the animation is going in reverse then
	                // flip the step value: 0 becomes 1, 1 becomes 0
	                stepValue = ((stepValue * -1) + 1);
	            }
	            this._progress(stepValue);
	        }
	    };
	    Animation.prototype.progressEnd = function (shouldComplete, currentStepValue) {
	        void 0;
	        for (var i = 0; i < this._c.length; i++) {
	            this._c[i].progressEnd(shouldComplete, currentStepValue);
	        }
	        // set all the animations to their final position
	        this._progress(shouldComplete ? 1 : 0);
	        // if it's already at the final position, or close, then it's done
	        // otherwise we need to add a transition end event listener
	        if (currentStepValue < 0.05 || currentStepValue > 0.95) {
	            // the progress was already left off at the point that is finished
	            // for example, the left menu was dragged all the way open already
	            this._after();
	            this._willChange(false);
	            this._onFinish(shouldComplete);
	        }
	        else {
	            // the stepValue was left off at a point when it needs to finish transition still
	            // for example, the left menu was opened 75% and needs to finish opening
	            this._asyncEnd(64, shouldComplete);
	            // force quick duration, linear easing
	            this._setTrans(64, true);
	        }
	    };
	    Animation.prototype.onPlay = function (callback) {
	        this._pFns.push(callback);
	        return this;
	    };
	    Animation.prototype.onFinish = function (callback, onceTimeCallback, clearOnFinishCallacks) {
	        if (onceTimeCallback === void 0) { onceTimeCallback = false; }
	        if (clearOnFinishCallacks === void 0) { clearOnFinishCallacks = false; }
	        if (clearOnFinishCallacks) {
	            this._fFns = [];
	            this._fOnceFns = [];
	        }
	        if (onceTimeCallback) {
	            this._fOnceFns.push(callback);
	        }
	        else {
	            this._fFns.push(callback);
	        }
	        return this;
	    };
	    Animation.prototype._onFinish = function (hasCompleted) {
	        this.isPlaying = false;
	        var i;
	        for (i = 0; i < this._fFns.length; i++) {
	            this._fFns[i](hasCompleted);
	        }
	        for (i = 0; i < this._fOnceFns.length; i++) {
	            this._fOnceFns[i](hasCompleted);
	        }
	        this._fOnceFns = [];
	    };
	    Animation.prototype.reverse = function (shouldReverse) {
	        if (shouldReverse === void 0) { shouldReverse = true; }
	        for (var i = 0; i < this._c.length; i++) {
	            this._c[i].reverse(shouldReverse);
	        }
	        this._rv = shouldReverse;
	        return this;
	    };
	    Animation.prototype.destroy = function (removeElement) {
	        var i, ele;
	        for (i = 0; i < this._c.length; i++) {
	            this._c[i].destroy(removeElement);
	        }
	        if (removeElement) {
	            for (i = 0; i < this._el.length; i++) {
	                ele = this._el[i];
	                ele.parentNode && ele.parentNode.removeChild(ele);
	            }
	        }
	        this._reset();
	    };
	    Animation.prototype._transEl = function () {
	        // get the lowest level element that has an Animation
	        var i, targetEl;
	        for (i = 0; i < this._c.length; i++) {
	            targetEl = this._c[i]._transEl();
	            if (targetEl) {
	                return targetEl;
	            }
	        }
	        return (this.hasTween && this._el.length ? this._el[0] : null);
	    };
	    /*
	     STATIC CLASSES
	     */
	    Animation.create = function (name, opts) {
	        if (opts === void 0) { opts = {}; }
	        var AnimationClass = AnimationRegistry[name];
	        if (!AnimationClass) {
	            // couldn't find an animation by the given name
	            // fallback to just the base Animation class
	            AnimationClass = Animation;
	        }
	        return new AnimationClass(null, opts);
	    };
	    Animation.register = function (name, AnimationClass) {
	        AnimationRegistry[name] = AnimationClass;
	    };
	    return Animation;
	})();
	exports.Animation = Animation;
	var doc = document;
	var TRANSFORMS = {
	    'translateX': 1, 'translateY': 1, 'translateZ': 1,
	    'scale': 1, 'scaleX': 1, 'scaleY': 1, 'scaleZ': 1,
	    'rotate': 1, 'rotateX': 1, 'rotateY': 1, 'rotateZ': 1,
	    'skewX': 1, 'skewY': 1, 'perspective': 1
	};
	var cssValueRegex = /(^-?\d*\.?\d*)(.*)/;
	var AnimationRegistry = {};


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
	var core_1 = __webpack_require__(3);
	var menu_controller_1 = __webpack_require__(17);
	/**
	 * @name MenuClose
	 * @description
	 * The `menuClose` directive can be placed on any button to
	 * automatically close an open menu.
	 *
	 * @usage
	 * ```html
	 * <button menuClose>Close Menu</button>
	 * ```
	 *
	 * To close a certain menu by its id or side, give the `menuClose`
	 * directive a value.
	 *
	 * ```html
	 * <button menuClose="left">Close Left Menu</button>
	 * ```
	 *
	 * @demo /docs/v2/demos/menu/
	 * @see {@link /docs/v2/components#menus Menu Component Docs}
	 * @see {@link ../../menu/Menu Menu API Docs}
	 */
	var MenuClose = (function () {
	    function MenuClose(_menu) {
	        this._menu = _menu;
	    }
	    /**
	    * @private
	    */
	    MenuClose.prototype.close = function () {
	        var menu = this._menu.get(this.menuClose);
	        menu && menu.close();
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], MenuClose.prototype, "menuClose", void 0);
	    __decorate([
	        core_1.HostListener('click'), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', void 0)
	    ], MenuClose.prototype, "close", null);
	    MenuClose = __decorate([
	        core_1.Directive({
	            selector: '[menuClose]'
	        }), 
	        __metadata('design:paramtypes', [menu_controller_1.MenuController])
	    ], MenuClose);
	    return MenuClose;
	})();
	exports.MenuClose = MenuClose;


/***/ },
/* 49 */
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
	var config_1 = __webpack_require__(7);
	/**
	  * @name Badge
	  * @module ionic
	  * @description
	  * Badges are simple components in Ionic containing numbers or text. You can display a badge to indicate that there is new information associated with the item it is on.
	  * @see {@link /docs/v2/components/#badges Badges Component Docs}

	 */
	var Badge = (function () {
	    function Badge(config, _elementRef, _renderer) {
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        var element = _elementRef.nativeElement;
	        this._readAttrs(element);
	    }
	    /**
	     * @private
	     */
	    Badge.prototype._readAttrs = function (element) {
	        var elementAttrs = element.attributes;
	        var attrName;
	        for (var i = 0, l = elementAttrs.length; i < l; i++) {
	            if (elementAttrs[i].value !== '')
	                continue;
	            attrName = elementAttrs[i].name;
	            // Ignore attributes item-left, item-right
	            if (attrName.indexOf('item') == -1) {
	                this._setClass(attrName);
	            }
	        }
	    };
	    /**
	     * @private
	     */
	    Badge.prototype._setClass = function (color) {
	        this._renderer.setElementClass(this._elementRef.nativeElement, 'badge-' + color, true);
	    };
	    Badge = __decorate([
	        core_1.Directive({
	            selector: 'ion-badge'
	        }), 
	        __metadata('design:paramtypes', [config_1.Config, core_1.ElementRef, core_1.Renderer])
	    ], Badge);
	    return Badge;
	})();
	exports.Badge = Badge;


/***/ },
/* 50 */
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
	 * @name Blur
	 * @description
	 * The blur attribute applies the CSS blur attribute to an element. Safari only.
	 *
	 * @usage
	 * ```html
	 * <ion-card blur>
	 *    This card will blur the content behind it.
	 * </ion-card>
	 * ```
	 *
	 * @demo /docs/v2/demos/blur/
	 * @private
	 */
	var Blur = (function () {
	    function Blur(_elementRef, _renderer) {
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        _renderer.setElementStyle(_elementRef.nativeElement, '-webkit-backdrop-filter', 'blur(10px)');
	    }
	    Blur = __decorate([
	        core_1.Directive({
	            selector: '[blur]'
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
	    ], Blur);
	    return Blur;
	})();
	exports.Blur = Blur;


/***/ },
/* 51 */
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
	var ion_1 = __webpack_require__(28);
	var app_1 = __webpack_require__(14);
	var config_1 = __webpack_require__(7);
	var dom_1 = __webpack_require__(10);
	var view_controller_1 = __webpack_require__(37);
	var scroll_to_1 = __webpack_require__(19);
	/**
	 * @name Content
	 * @description
	 * The Content component provides an easy to use content area that can be configured to use Ionic's custom Scroll View, or the built in overflow scrolling of the browser.
	 *
	 * While we recommend using the custom Scroll features in Ionic in most cases, sometimes (for performance reasons) only the browser's native overflow scrolling will suffice, and so we've made it easy to toggle between the Ionic scroll implementation and overflow scrolling.
	 *
	 * You can implement pull-to-refresh with the [Refresher](../../scroll/Refresher) component.
	 *
	 * @usage
	 * ```html
	 * <ion-content id="myContent">
	 *   Add your content here!
	 * </ion-content>
	 * ```
	 *
	 */
	var Content = (function (_super) {
	    __extends(Content, _super);
	    /**
	     * @param {elementRef} elementRef  A reference to the component's DOM element.
	     * @param {config} config  The config object to change content's default settings.
	     */
	    function Content(_elementRef, _config, _app, _zone, viewCtrl) {
	        _super.call(this, _elementRef);
	        this._elementRef = _elementRef;
	        this._config = _config;
	        this._app = _app;
	        this._zone = _zone;
	        this._padding = 0;
	        if (viewCtrl) {
	            viewCtrl.setContent(this);
	            viewCtrl.setContentRef(_elementRef);
	        }
	    }
	    /**
	     * @private
	     */
	    Content.prototype.ngOnInit = function () {
	        var self = this;
	        self.scrollElement = self._elementRef.nativeElement.children[0];
	        self._onScroll = function (ev) {
	            self._app.setScrolling();
	        };
	        if (self._config.get('tapPolyfill') === true) {
	            self._zone.runOutsideAngular(function () {
	                self.scrollElement.addEventListener('scroll', self._onScroll);
	            });
	        }
	    };
	    /**
	     * @private
	     */
	    Content.prototype.ngOnDestroy = function () {
	        this.scrollElement.removeEventListener('scroll', this._onScroll);
	    };
	    /**
	     * @private
	     * Adds the specified scroll handler to the content' scroll element.
	     *
	     * ```ts
	     * @Page({
	     *   template: `<ion-content id="my-content"></ion-content>`
	     * )}
	     * export class MyPage{
	     *    constructor(app: IonicApp){
	     *        this.app = app;
	     *    }
	     *   // Need to wait until the component has been initialized
	     *   ngAfterViewInit() {
	     *     // Here 'my-content' is the ID of my ion-content
	     *     this.content = this.app.getComponent('my-content');
	     *     this.content.addScrollEventListener(this.myScroll);
	     *   }
	     *     myScroll() {
	     *      console.info('They see me scrolling...');
	     *    }
	     * }
	     * ```
	     * @param {Function} handler  The method you want perform when scrolling
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
	    /**
	     * Call a method when scrolling has stopped
	     *
	     * @param {Function} callback The method you want perform when scrolling has ended
	     */
	    Content.prototype.onScrollEnd = function (callback) {
	        var lastScrollTop = null;
	        var framesUnchanged = 0;
	        var _scrollEle = this.scrollElement;
	        function next() {
	            var currentScrollTop = _scrollEle.scrollTop;
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
	     * @private
	     * Adds the specified touchmove handler to the content's scroll element.
	     *
	     * ```ts
	     * @Page({
	     *   template: `<ion-content id="my-content"></ion-content>`
	     * )}
	     * export class MyPage{
	     *    constructor(app: IonicApp){
	     *        this.app = app;
	     *    }
	     *   // Need to wait until the component has been initialized
	     *   ngAfterViewInit() {
	     *     // Here 'my-content' is the ID of my ion-content
	     *     this.content = this.app.getComponent('my-content');
	     *     this.content.addTouchMoveListener(this.touchHandler);
	     *   }
	     *    touchHandler() {
	     *      console.log("I'm touching all the magazines!!");
	     *    }
	     * }
	     * ```
	     * @param {Function} handler  The method you want to perform when touchmove is firing
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
	     *
	     * ```ts
	     * @Page({
	     *   template: `<ion-content id="my-content">
	     *      <button (click)="scrollTo()"> Down 500px</button>
	     *   </ion-content>`
	     * )}
	     * export class MyPage{
	     *    constructor(app: IonicApp){
	     *        this.app = app;
	     *    }
	     *   // Need to wait until the component has been initialized
	     *   ngAfterViewInit() {
	     *     // Here 'my-content' is the ID of my ion-content
	     *     this.content = this.app.getComponent('my-content');
	     *   }
	     *    scrollTo() {
	     *      this.content.scrollTo(0, 500, 200);
	     *    }
	     * }
	     * ```
	     * @param {number} x  The x-value to scroll to.
	     * @param {number} y  The y-value to scroll to.
	     * @param {number} duration  Duration of the scroll animation in ms.
	     * @param {TODO} tolerance  TODO
	     * @returns {Promise} Returns a promise when done
	     */
	    Content.prototype.scrollTo = function (x, y, duration, tolerance) {
	        if (this._scrollTo) {
	            this._scrollTo.dispose();
	        }
	        this._scrollTo = new scroll_to_1.ScrollTo(this.scrollElement);
	        return this._scrollTo.start(x, y, duration, tolerance);
	    };
	    /**
	     * Scroll to the specified position.
	     *
	     * ```ts
	     * @Page({
	     *   template: `<ion-content id="my-content">
	     *      <button (click)="scrollTop()"> Down 500px</button>
	     *   </ion-content>`
	     * )}
	     * export class MyPage{
	     *    constructor(app: IonicApp){
	     *        this.app = app;
	     *    }
	     *   // Need to wait until the component has been initialized
	     *   ngAfterViewInit() {
	     *     // Here 'my-content' is the ID of my ion-content
	     *     this.content = this.app.getComponent('my-content');
	     *   }
	     *    scrollTop() {
	     *      this.content.scrollTop();
	     *    }
	     * }
	     * ```
	     * @returns {Promise} Returns a promise when done
	     */
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
	     * @returns {object} dimensions  The content and scroll elements' dimensions
	     * {number} dimensions.contentHeight  content offsetHeight
	     * {number} dimensions.contentTop  content offsetTop
	     * {number} dimensions.contentBottom  content offsetTop+offsetHeight
	     * {number} dimensions.contentWidth  content offsetWidth
	     * {number} dimensions.contentLeft  content offsetLeft
	     * {number} dimensions.contentRight  content offsetLeft + offsetWidth
	     * {number} dimensions.scrollHeight  scroll scrollHeight
	     * {number} dimensions.scrollTop  scroll scrollTop
	     * {number} dimensions.scrollBottom  scroll scrollTop + scrollHeight
	     * {number} dimensions.scrollWidth  scroll scrollWidth
	     * {number} dimensions.scrollLeft  scroll scrollLeft
	     * {number} dimensions.scrollRight  scroll scrollLeft + scrollWidth
	     */
	    Content.prototype.getContentDimensions = function () {
	        var _scrollEle = this.scrollElement;
	        var parentElement = _scrollEle.parentElement;
	        return {
	            contentHeight: parentElement.offsetHeight,
	            contentTop: parentElement.offsetTop,
	            contentBottom: parentElement.offsetTop + parentElement.offsetHeight,
	            contentWidth: parentElement.offsetWidth,
	            contentLeft: parentElement.offsetLeft,
	            contentRight: parentElement.offsetLeft + parentElement.offsetWidth,
	            scrollHeight: _scrollEle.scrollHeight,
	            scrollTop: _scrollEle.scrollTop,
	            scrollBottom: _scrollEle.scrollTop + _scrollEle.scrollHeight,
	            scrollWidth: _scrollEle.scrollWidth,
	            scrollLeft: _scrollEle.scrollLeft,
	            scrollRight: _scrollEle.scrollLeft + _scrollEle.scrollWidth,
	        };
	    };
	    /**
	     * @private
	     * Adds padding to the bottom of the scroll element when the keyboard is open
	     * so content below the keyboard can be scrolled into view.
	     */
	    Content.prototype.addScrollPadding = function (newPadding) {
	        if (newPadding > this._padding) {
	            void 0;
	            this._padding = newPadding;
	            this.scrollElement.style.paddingBottom = newPadding + 'px';
	        }
	    };
	    Content = __decorate([
	        core_1.Component({
	            selector: 'ion-content',
	            template: '<scroll-content>' +
	                '<ng-content></ng-content>' +
	                '</scroll-content>'
	        }),
	        __param(4, core_1.Optional()), 
	        __metadata('design:paramtypes', [core_1.ElementRef, config_1.Config, app_1.IonicApp, core_1.NgZone, view_controller_1.ViewController])
	    ], Content);
	    return Content;
	})(ion_1.Ion);
	exports.Content = Content;


/***/ },
/* 52 */
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
	var ion_1 = __webpack_require__(28);
	/**
	 * @name Scroll
	 * @description
	 * Scroll is a non-flexboxed scroll area that can scroll horizontally or vertically. `ion-Scroll` Can be used in places were you may not need a full page scroller, but a highly customized one, such as image scubber or comment scroller.
	 * @usage
	 * ```html
	 * <ion-scroll scrollX="true">
	 * </ion-scroll>
	 *
	 * <ion-scroll scrollY="true">
	 * </ion-scroll>
	 *
	 * <ion-scroll scrollX="true" scrollY="true">
	 * </ion-scroll>
	 * ```
	 *@property {boolean} [scrollX] - whether to enable scrolling along the X axis
	 *@property {boolean} [scrollY] - whether to enable scrolling along the Y axis
	 *@property {boolean} [zoom] - whether to enable zooming
	 *@property {number} [maxZoom] - set the max zoom amount for ion-scroll
	 * @demo /docs/v2/demos/scroll/
	 */
	var Scroll = (function (_super) {
	    __extends(Scroll, _super);
	    function Scroll(elementRef) {
	        _super.call(this, elementRef);
	        /**
	         * @private
	         */
	        this.maxScale = 3;
	        /**
	         * @private
	         */
	        this.zoomDuration = 250;
	    }
	    /**
	     * @private
	     */
	    Scroll.prototype.ngOnInit = function () {
	        this.scrollElement = this.getNativeElement().children[0];
	    };
	    /**
	     * @private
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
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], Scroll);
	    return Scroll;
	})(ion_1.Ion);
	exports.Scroll = Scroll;


/***/ },
/* 53 */
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
	var common_1 = __webpack_require__(25);
	var content_1 = __webpack_require__(51);
	var icon_1 = __webpack_require__(40);
	var util_1 = __webpack_require__(9);
	var dom_1 = __webpack_require__(10);
	/**
	 * @name Refresher
	 * @description
	 * Allows you to add pull-to-refresh to an Content component.
	 * Place it as the first child of your Content or Scroll element.
	 *
	 * When refreshing is complete, call `refresher.complete()` from your controller.
	 *
	 *  @usage
	 *  ```html
	 *  <ion-content>
	 *    <ion-refresher (start)="doStart($event)"
	 *                   (refresh)="doRefresh($event)"
	 *                   (pulling)="doPulling($event)">
	 *    </ion-refresher>
	 *
	 *  </ion-content>

	 *  ```
	 *
	 *  ```ts
	 *  export class MyClass {
	 *
	 *    doRefresh(refresher) {
	 *      console.log('Doing Refresh', refresher)
	 *
	 *      setTimeout(() => {
	 *        refresher.complete();
	 *        console.log("Complete");
	 *      }, 5000);
	 *    }
	 *
	 *    doStart(refresher) {
	 *      console.log('Doing Start', refresher);
	 *    }
	 *
	 *    doPulling(refresher) {
	 *      console.log('Pulling', refresher);
	 *    }
	 *
	 *  }
	 *  ```
	 *  @demo /docs/v2/demos/refresher/
	 *
	 */
	var Refresher = (function () {
	    function Refresher(_content, _element) {
	        this._content = _content;
	        /**
	         * @private
	         */
	        this.isDragging = false;
	        /**
	         * @private
	         */
	        this.isOverscrolling = false;
	        /**
	         * @private
	         */
	        this.dragOffset = 0;
	        /**
	         * @private
	         */
	        this.lastOverscroll = 0;
	        /**
	         * @private
	         */
	        this.ptrThreshold = 0;
	        /**
	         * @private
	         */
	        this.activated = false;
	        /**
	         * @private
	         */
	        this.scrollTime = 500;
	        /**
	         * @private
	         */
	        this.canOverscroll = true;
	        /**
	         * @output {event} When you are pulling down
	         */
	        this.pulling = new core_1.EventEmitter();
	        /**
	         * @output {event} When you are refreshing
	         */
	        this.refresh = new core_1.EventEmitter();
	        /**
	         * @output {event} When you start pulling down
	         */
	        this.start = new core_1.EventEmitter();
	        this._ele = _element.nativeElement;
	        this._ele.classList.add('content');
	    }
	    /**
	     * @private
	     */
	    Refresher.prototype.ngOnInit = function () {
	        var sp = this._content.getNativeElement();
	        var sc = this._content.scrollElement;
	        this.startY = null;
	        this.deltaY = null;
	        this.scrollHost = sp;
	        this.scrollChild = sc;
	        util_1.defaults(this, {
	            pullingIcon: 'md-arrow-down',
	            refreshingIcon: 'ionic'
	        });
	        this.showSpinner = !util_1.isDefined(this.refreshingIcon) && this.spinner != 'none';
	        this.showIcon = util_1.isDefined(this.refreshingIcon);
	        this._touchMoveListener = this._handleTouchMove.bind(this);
	        this._touchEndListener = this._handleTouchEnd.bind(this);
	        this._handleScrollListener = this._handleScroll.bind(this);
	        sc.addEventListener('touchmove', this._touchMoveListener);
	        sc.addEventListener('touchend', this._touchEndListener);
	        sc.addEventListener('scroll', this._handleScrollListener);
	    };
	    /**
	     * @private
	     */
	    Refresher.prototype.ngOnDestroy = function () {
	        var sc = this._content.scrollElement;
	        sc.removeEventListener('touchmove', this._touchMoveListener);
	        sc.removeEventListener('touchend', this._touchEndListener);
	        sc.removeEventListener('scroll', this._handleScrollListener);
	    };
	    /**
	     * @private
	     * @param {TODO} val  TODO
	     */
	    Refresher.prototype.overscroll = function (val) {
	        this.scrollChild.style[dom_1.CSS.transform] = 'translateY(' + val + 'px)';
	        this.lastOverscroll = val;
	    };
	    /**
	     * @private
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
	     * @private
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
	     * @private
	     */
	    Refresher.prototype.activate = function () {
	        //this.ele.classList.add('active');
	        this.isActive = true;
	        this.start.emit(this);
	    };
	    /**
	     * @private
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
	    /**
	     * @private
	     */
	    Refresher.prototype.startRefresh = function () {
	        // startCallback
	        this.isRefreshing = true;
	        this.refresh.emit(this);
	    };
	    /**
	     * @private
	     */
	    Refresher.prototype.show = function () {
	        // showCallback
	        this._ele.classList.remove('invisible');
	    };
	    /**
	     * @private
	     */
	    Refresher.prototype.hide = function () {
	        // showCallback
	        this._ele.classList.add('invisible');
	    };
	    /**
	     * @private
	     */
	    Refresher.prototype.tail = function () {
	        // tailCallback
	        this._ele.classList.add('refreshing-tail');
	    };
	    /**
	     * @private
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
	     * @private
	     * @param {TODO} Y  TODO
	     * @param {TODO} duration  TODO
	     * @param {Function} callback  TODO
	     */
	    Refresher.prototype.scrollTo = function (Y, duration, callback) {
	        // scroll animation loop w/ easing
	        // credit https://gist.github.com/dezinezync/5487119
	        var start = Date.now(), from = this.lastOverscroll;
	        if (from === Y) {
	            callback && callback();
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
	            this.overscroll(Math.round((easedT * (Y - from)) + from));
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
	        //console.debug('TOUCHMOVE', e);
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
	                this.nativescroll(this.scrollHost, Math.round(this.deltaY - this.dragOffset) * -1);
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
	        this.overscroll(Math.round((this.deltaY - this.dragOffset) / 3));
	        // Pass the refresher to the EventEmitter
	        this.pulling.emit(this);
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
	        void 0;
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
	                this.startRefresh();
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
	        void 0;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Refresher.prototype, "pullingIcon", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Refresher.prototype, "pullingText", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Refresher.prototype, "refreshingIcon", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Refresher.prototype, "refreshingText", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Refresher.prototype, "spinner", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Refresher.prototype, "pulling", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Refresher.prototype, "refresh", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Refresher.prototype, "start", void 0);
	    Refresher = __decorate([
	        core_1.Component({
	            selector: 'ion-refresher',
	            host: {
	                '[class.active]': 'isActive',
	                '[class.refreshing]': 'isRefreshing',
	                '[class.refreshingTail]': 'isRefreshingTail'
	            },
	            template: '<div class="refresher-content" [class.refresher-with-text]="pullingText || refreshingText">' +
	                '<div class="icon-pulling">' +
	                '<ion-icon [name]="pullingIcon"></ion-icon>' +
	                '</div>' +
	                '<div class="text-pulling" [innerHTML]="pullingText" *ngIf="pullingText"></div>' +
	                '<div class="icon-refreshing">' +
	                '<ion-icon [name]="refreshingIcon"></ion-icon>' +
	                '</div>' +
	                '<div class="text-refreshing" [innerHTML]="refreshingText" *ngIf="refreshingText"></div>' +
	                '</div>',
	            directives: [common_1.NgIf, common_1.NgClass, icon_1.Icon]
	        }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [content_1.Content, core_1.ElementRef])
	    ], Refresher);
	    return Refresher;
	})();
	exports.Refresher = Refresher;


/***/ },
/* 54 */
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
	var common_1 = __webpack_require__(25);
	var ion_1 = __webpack_require__(28);
	var animation_1 = __webpack_require__(47);
	var gesture_1 = __webpack_require__(33);
	var util_1 = __webpack_require__(34);
	var dom_1 = __webpack_require__(10);
	var util_2 = __webpack_require__(9);
	var swiper_widget_1 = __webpack_require__(55);
	/**
	 * @name Slides
	 * @description
	 * Slides is a slide box implementation based on Swiper.js
	 *
	 * @usage
	 * ```ts
	 * @Page({
	 *  template: `
	 *     <ion-slides pager (change)="onSlideChanged($event)" (move)="onSlideMove($event)" loop="true" autoplay="true">
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
	 * @demo /docs/v2/demos/slides/
	 * @see {@link /docs/v2/components#slides Slides Component Docs}
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
	 */
	var Slides = (function (_super) {
	    __extends(Slides, _super);
	    /**
	     * @private
	     * @param {ElementRef} elementRef  TODO
	     */
	    function Slides(elementRef) {
	        var _this = this;
	        _super.call(this, elementRef);
	        /**
	         * @output {any} expression to evaluate when a slide has been changed
	         */
	        this.change = new core_1.EventEmitter();
	        /**
	         * @output {any} expression to evaluate when a slide change starts
	         */
	        this.slideChangeStart = new core_1.EventEmitter();
	        /**
	         * @output {any} expression to evaluate when a slide moves
	         */
	        this.move = new core_1.EventEmitter();
	        this.rapidUpdate = util_2.debounce(function () {
	            _this.update();
	        }, 10);
	    }
	    /**
	     * @private
	     */
	    Slides.prototype.ngOnInit = function () {
	        var _this = this;
	        if (!this.options) {
	            this.options = {};
	        }
	        this.showPager = util_2.isTrueProperty(this.pager);
	        var options = util_2.defaults({
	            pagination: '.swiper-pagination',
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
	            _this.slideChangeStart.emit(swiper);
	            return _this.options.onSlideChangeStart && _this.options.onSlideChangeStart(swiper);
	        };
	        options.onSlideChangeEnd = function (swiper) {
	            _this.change.emit(swiper);
	            return _this.options.onSlideChangeEnd && _this.options.onSlideChangeEnd(swiper);
	        };
	        options.onLazyImageLoad = function (swiper, slide, img) {
	            return _this.options.onLazyImageLoad && _this.options.onLazyImageLoad(swiper, slide, img);
	        };
	        options.onLazyImageReady = function (swiper, slide, img) {
	            return _this.options.onLazyImageReady && _this.options.onLazyImageReady(swiper, slide, img);
	        };
	        options.onSliderMove = function (swiper, e) {
	            _this.move.emit(swiper);
	            return _this.options.onSliderMove && _this.options.onSliderMove(swiper, e);
	        };
	        setTimeout(function () {
	            var swiper = new swiper_widget_1.Swiper(_this.getNativeElement().children[0], options);
	            _this.slider = swiper;
	        });
	        /*
	        * TODO: Finish this
	        if (util.isTrueProperty(this.zoom)) {
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
	            void 0;
	        });
	        this.zoomGesture.on('pinch', function (e) {
	            _this.scale = Math.max(1, Math.min(last_scale * e.scale, 10));
	            void 0;
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
	        void 0;
	        if (!this.enableZoom) {
	            return;
	        }
	        void 0;
	        /*
	        let x = e.pointers[0].clientX;
	        let y = e.pointers[0].clientY;
	    
	        let mx = this.viewportWidth / 2;
	        let my = this.viewportHeight / 2;
	    
	        let tx, ty;
	    
	        if (x > mx) {
	          // Greater than half
	          tx = -x;
	        } else {
	          // Less than or equal to half
	          tx = (this.viewportWidth - x);
	        }
	        if (y > my) {
	          ty = -y;
	        } else {
	          ty = y-my;
	        }
	    
	        console.debug(y);
	        */
	        var zi = new animation_1.Animation(this.touch.target.children[0])
	            .duration(this.zoomDuration)
	            .easing('linear');
	        var zw = new animation_1.Animation(this.touch.target.children[0])
	            .duration(this.zoomDuration)
	            .easing('linear');
	        var za = new animation_1.Animation();
	        za.add(zi);
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
	    Slides.prototype.onTransitionStart = function (swiper, e) {
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onTransitionEnd = function (swiper, e) {
	    };
	    /**
	     * @private
	     */
	    Slides.prototype.onTouchStart = function (e) {
	        void 0;
	        //TODO: Support mice as well
	        var target = util_1.dom.closest(e.target, '.slide').children[0].children[0];
	        this.touch = {
	            x: null,
	            y: null,
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
	        void 0;
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
	        void 0;
	        if (this.scale <= 1) {
	            return;
	        }
	        void 0;
	        // Move image
	        this.touch.x = this.touch.deltaX + this.touch.lastX;
	        this.touch.y = this.touch.deltaY + this.touch.lastY;
	        if (this.touch.x < x1) {
	            void 0;
	        }
	        if (this.touch.x > x2) {
	            void 0;
	        }
	        if (this.touch.x > this.viewportWidth) {
	        }
	        else if (-this.touch.x > this.viewportWidth) {
	        }
	        else {
	            void 0;
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
	        void 0;
	        if (this.scale > 1) {
	            if (Math.abs(this.touch.x) > this.viewportWidth) {
	                // TODO what is posX?
	                var posX = posX > 0 ? this.viewportWidth - 1 : -(this.viewportWidth - 1);
	                void 0;
	            }
	            /*
	            if (posY > this.viewportHeight/2) {
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
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Slides.prototype, "pager", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Slides.prototype, "options", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Slides.prototype, "zoom", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Slides.prototype, "zoomDuration", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Slides.prototype, "zoomMax", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Slides.prototype, "change", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Slides.prototype, "slideChangeStart", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Slides.prototype, "move", void 0);
	    Slides = __decorate([
	        core_1.Component({
	            selector: 'ion-slides',
	            template: '<div class="swiper-container">' +
	                '<div class="swiper-wrapper">' +
	                '<ng-content></ng-content>' +
	                '</div>' +
	                '<div [class.hide]="!showPager" class="swiper-pagination"></div>' +
	                '</div>',
	            directives: [common_1.NgClass]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], Slides);
	    return Slides;
	})(ion_1.Ion);
	exports.Slides = Slides;
	/**
	 * @name Slide
	 * @description
	 * `ion-slide` is a child component of `ion-slides` and is where all your individule slide content will be rendered too.
	 *
	 * @demo /docs/v2/demos/slides/
	 * @see {@link /docs/v2/api/components/slides/Slides/ Slides API Docs}
	 */
	var Slide = (function () {
	    function Slide(elementRef, slides) {
	        this.ele = elementRef.nativeElement;
	        this.ele.classList.add('swiper-slide');
	        slides.rapidUpdate();
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Slide.prototype, "zoom", void 0);
	    Slide = __decorate([
	        core_1.Component({
	            selector: 'ion-slide',
	            template: '<div class="slide-zoom"><ng-content></ng-content></div>'
	        }),
	        __param(1, core_1.Host()), 
	        __metadata('design:paramtypes', [core_1.ElementRef, Slides])
	    ], Slide);
	    return Slide;
	})();
	exports.Slide = Slide;
	/**
	 * @private
	 */
	var SlideLazy = (function () {
	    function SlideLazy() {
	    }
	    SlideLazy = __decorate([
	        core_1.Directive({
	            selector: 'slide-lazy',
	            host: {
	                'class': 'swiper-lazy'
	            }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], SlideLazy);
	    return SlideLazy;
	})();
	exports.SlideLazy = SlideLazy;


/***/ },
/* 55 */
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
	module.exports.Swiper = Swiper;

	function Swiper(container, params) {


	      if (!(this instanceof Swiper)) return new Swiper(container, params);

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
	          effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow'
	          coverflow: {
	              rotate: 50,
	              stretch: 0,
	              depth: 100,
	              modifier: 1,
	              slideShadows : true
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
	          slidesOffsetBefore: 0, // in px
	          slidesOffsetAfter: 0, // in px
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
	          controlBy: 'slide', //or 'container'
	          // Swiping/no swiping
	          allowSwipeToPrev: true,
	          allowSwipeToNext: true,
	          swipeHandler: null, //'.swipe-handler',
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
	          /*
	          Callbacks:
	          onInit: function (swiper)
	          onDestroy: function (swiper)
	          onClick: function (swiper, e)
	          onTap: function (swiper, e)
	          onDoubleTap: function (swiper, e)
	          onSliderMove: function (swiper, e)
	          onSlideChangeStart: function (swiper)
	          onSlideChangeEnd: function (swiper)
	          onTransitionStart: function (swiper)
	          onTransitionEnd: function (swiper)
	          onImagesReady: function (swiper)
	          onProgress: function (swiper, progress)
	          onTouchStart: function (swiper, e)
	          onTouchMove: function (swiper, e)
	          onTouchMoveOpposite: function (swiper, e)
	          onTouchEnd: function (swiper, e)
	          onReachBeginning: function (swiper)
	          onReachEnd: function (swiper)
	          onSetTransition: function (swiper, duration)
	          onSetTranslate: function (swiper, translate)
	          onAutoplayStart: function (swiper)
	          onAutoplayStop: function (swiper),
	          onLazyImageLoad: function (swiper, slide, image)
	          onLazyImageReady: function (swiper, slide, image)
	          */

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
	      if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
	          $ = Dom7;
	      }
	      if (typeof $ === 'undefined') {
	          if (typeof Dom7 === 'undefined') {
	              $ = window.Dom7 || window.Zepto || window.jQuery;
	          }
	          else {
	              $ = Dom7;
	          }
	          if (!$) return;
	      }
	      // Export it to Swiper instance
	      s.$ = $;

	      /*=========================
	        Preparation - Define Container, Wrapper and Pagination
	        ===========================*/
	      s.container = $(container);
	      if (s.container.length === 0) return;
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
	          function onReady () {
	              if (callback) callback();
	          }
	          if (!imgElement.complete || !checkForComplete) {
	              if (src) {
	                  image = new window.Image();
	                  image.onload = onReady;
	                  image.onerror = onReady;
	                  image.src = src;
	              } else {
	                  onReady();
	              }

	          } else {//image already loaded...
	              onReady();
	          }
	      };
	      s.preloadImages = function () {
	          s.imagesToLoad = s.container.find('img');
	          function _onReady() {
	              if (typeof s === 'undefined' || s === null) return;
	              if (s.imagesLoaded !== undefined) s.imagesLoaded++;
	              if (s.imagesLoaded === s.imagesToLoad.length) {
	                  if (s.params.updateOnImagesReady) s.update();
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
	          if (typeof s.autoplayTimeoutId !== 'undefined') return false;
	          if (!s.params.autoplay) return false;
	          if (s.autoplaying) return false;
	          s.autoplaying = true;
	          s.emit('onAutoplayStart', s);
	          autoplay();
	      };
	      s.stopAutoplay = function (internal) {
	          if (!s.autoplayTimeoutId) return;
	          if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
	          s.autoplaying = false;
	          s.autoplayTimeoutId = undefined;
	          s.emit('onAutoplayStop', s);
	      };
	      s.pauseAutoplay = function (speed) {
	          if (s.autoplayPaused) return;
	          if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
	          s.autoplayPaused = true;
	          if (speed === 0) {
	              s.autoplayPaused = false;
	              autoplay();
	          }
	          else {
	              s.wrapper.transitionEnd(function () {
	                  if (!s) return;
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

	          var spaceBetween = s.params.spaceBetween,
	              slidePosition = -s.params.slidesOffsetBefore,
	              i,
	              prevSlideSize = 0,
	              index = 0;
	          if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
	              spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
	          }

	          s.virtualSize = -spaceBetween;
	          // reset margins
	          if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
	          else s.slides.css({marginRight: '', marginBottom: ''});

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
	                      if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
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
	              if (slide.css('display') === 'none') continue;
	              if (s.params.slidesPerView === 'auto') {
	                  slideSize = isH() ? slide.outerWidth(true) : slide.outerHeight(true);
	                  if (s.params.roundLengths) slideSize = round(slideSize);
	              }
	              else {
	                  slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
	                  if (s.params.roundLengths) slideSize = round(slideSize);

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
	                  if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
	                  if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
	                  if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
	                  s.slidesGrid.push(slidePosition);
	              }
	              else {
	                  if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
	                  s.slidesGrid.push(slidePosition);
	                  slidePosition = slidePosition + slideSize + spaceBetween;
	              }

	              s.virtualSize += slideSize + spaceBetween;

	              prevSlideSize = slideSize;

	              index ++;
	          }
	          s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;

	          var newSlidesGrid;

	          if (
	              s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
	              s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	          }
	          if (!s.support.flexbox || s.params.setWrapperSize) {
	              if (isH()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	              else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
	          }

	          if (s.params.slidesPerColumn > 1) {
	              s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
	              s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
	              s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	              if (s.params.centeredSlides) {
	                  newSlidesGrid = [];
	                  for (i = 0; i < s.snapGrid.length; i++) {
	                      if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
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
	          if (s.snapGrid.length === 0) s.snapGrid = [0];

	          if (s.params.spaceBetween !== 0) {
	              if (isH()) {
	                  if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
	                  else s.slides.css({marginRight: spaceBetween + 'px'});
	              }
	              else s.slides.css({marginBottom: spaceBetween + 'px'});
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
	          if (s.slides.length === 0) return;
	          if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();

	          var offsetCenter = -translate;
	          if (s.rtl) offsetCenter = translate;

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
	                  var isVisible =
	                      (slideBefore >= 0 && slideBefore < s.size) ||
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
	          if (s.isBeginning) s.emit('onReachBeginning', s);
	          if (s.isEnd) s.emit('onReachEnd', s);

	          if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
	          s.emit('onProgress', s, s.progress);
	      };
	      s.updateActiveIndex = function () {
	          var translate = s.rtl ? s.translate : -s.translate;
	          var newActiveIndex, i, snapIndex;
	          for (i = 0; i < s.slidesGrid.length; i ++) {
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
	          if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
	          // for (i = 0; i < s.slidesGrid.length; i++) {
	              // if (- translate >= s.slidesGrid[i]) {
	                  // newActiveIndex = i;
	              // }
	          // }
	          snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
	          if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;

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
	                  bulletIndex = Math.ceil(s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup;
	                  if (bulletIndex > s.slides.length - 1 - s.loopedSlides * 2) {
	                      bulletIndex = bulletIndex - (s.slides.length - s.loopedSlides * 2);
	                  }
	                  if (bulletIndex > s.bullets.length - 1) bulletIndex = bulletIndex - s.bullets.length;
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
	                      if ($(this).index() === bulletIndex) $(this).addClass(s.params.bulletActiveClass);
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
	                      if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.prevButton));
	                  }
	                  else {
	                      $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
	                      if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.prevButton));
	                  }
	              }
	              if (s.params.nextButton) {
	                  if (s.isEnd) {
	                      $(s.params.nextButton).addClass(s.params.buttonDisabledClass);
	                      if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.nextButton));
	                  }
	                  else {
	                      $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
	                      if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.nextButton));
	                  }
	              }
	          }
	      };

	      /*=========================
	        Pagination
	        ===========================*/
	      s.updatePagination = function () {
	          if (!s.params.pagination) return;
	          if (s.paginationContainer && s.paginationContainer.length > 0) {
	              var bulletsHTML = '';
	              var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
	              for (var i = 0; i < numberOfBullets; i++) {
	                  if (s.params.paginationBulletRender) {
	                      bulletsHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
	                  }
	                  else {
	                      bulletsHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
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
	          if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
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
	      if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
	      else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
	      s.touchEvents = {
	          start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
	          move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
	          end : s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
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
	              if (s.params.a11y && s.a11y) $(s.params.nextButton)[actionDom]('keydown', s.a11y.onEnterKey);
	          }
	          if (s.params.prevButton) {
	              $(s.params.prevButton)[actionDom]('click', s.onClickPrev);
	              if (s.params.a11y && s.a11y) $(s.params.prevButton)[actionDom]('keydown', s.a11y.onEnterKey);
	          }
	          if (s.params.pagination && s.params.paginationClickable) {
	              $(s.paginationContainer)[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
	              if (s.params.a11y && s.a11y) $(s.paginationContainer)[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
	          }

	          // Prevent Links Clicks
	          if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
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
	              if (s.params.preventClicks) e.preventDefault();
	              if (s.params.preventClicksPropagation && s.animating) {
	                  e.stopPropagation();
	                  e.stopImmediatePropagation();
	              }
	          }
	      };
	      // Clicks
	      s.onClickNext = function (e) {
	          e.preventDefault();
	          if (s.isEnd && !s.params.loop) return;
	          s.slideNext();
	      };
	      s.onClickPrev = function (e) {
	          e.preventDefault();
	          if (s.isBeginning && !s.params.loop) return;
	          s.slidePrev();
	      };
	      s.onClickIndex = function (e) {
	          e.preventDefault();
	          var index = $(this).index() * s.params.slidesPerGroup;
	          if (s.params.loop) index = index + s.loopedSlides;
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
	                      if (_el === selector) found = selector;
	                  });
	                  if (!found) return undefined;
	                  else return selector;
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
	                  if (s.slides[i] === slide) slideFound = true;
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
	              var slideToIndex = s.clickedIndex,
	                  realIndex;
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

	      var isTouched,
	          isMoved,
	          touchStartTime,
	          isScrolling,
	          currentTranslate,
	          startTranslate,
	          allowThresholdMove,
	          // Form elements to match
	          formElements = 'input, select, textarea, button',
	          // Last click time
	          lastClickTime = Date.now(), clickTimeout,
	          //Velocities
	          velocities = [],
	          allowMomentumBounce;

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
	          if (e.originalEvent) e = e.originalEvent;
	          isTouchEvent = e.type === 'touchstart';
	          if (!isTouchEvent && 'which' in e && e.which === 3) return;
	          if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
	              s.allowClick = true;
	              return;
	          }
	          if (s.params.swipeHandler) {
	              if (!findElementInEvent(e, s.params.swipeHandler)) return;
	          }

	          var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
	          var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

	          // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
	          if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
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
	          if (s.params.threshold > 0) allowThresholdMove = false;
	          if (e.type !== 'touchstart') {
	              var preventDefault = true;
	              if ($(e.target).is(formElements)) preventDefault = false;
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
	          if (e.originalEvent) e = e.originalEvent;
	          if (isTouchEvent && e.type === 'mousemove') return;
	          if (e.preventedByNestedSwiper) return;
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

	          if (e.targetTouches && e.targetTouches.length > 1) return;

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
	          if (!isTouched) return;
	          if (isScrolling)  {
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
	          if (s.rtl) diff = -diff;

	          s.swipeDirection = diff > 0 ? 'prev' : 'next';
	          currentTranslate = diff + startTranslate;

	          var disableParentSwiper = true;
	          if ((diff > 0 && currentTranslate > s.minTranslate())) {
	              disableParentSwiper = false;
	              if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
	          }
	          else if (diff < 0 && currentTranslate < s.maxTranslate()) {
	              disableParentSwiper = false;
	              if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
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

	          if (!s.params.followFinger) return;

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
	          if (e.originalEvent) e = e.originalEvent;
	          s.emit('onTouchEnd', s, e);
	          if (!isTouched) return;
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
	                  if (clickTimeout) clearTimeout(clickTimeout);
	                  clickTimeout = setTimeout(function () {
	                      if (!s) return;
	                      if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
	                          s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
	                      }
	                      s.emit('onClick', s, e);
	                  }, 300);

	              }
	              if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
	                  if (clickTimeout) clearTimeout(clickTimeout);
	                  s.emit('onDoubleTap', s, e);
	              }
	          }

	          lastClickTime = Date.now();
	          setTimeout(function () {
	              if (s) s.allowClick = true;
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
	                  } else {
	                      s.velocity = 0;
	                  }

	                  velocities.length = 0;
	                  var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
	                  var momentumDistance = s.velocity * momentumDuration;

	                  var newPosition = s.translate + momentumDistance;
	                  if (s.rtl) newPosition = - newPosition;
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
	                      var j = 0,
	                          nextSlide;
	                      for (j = 0; j < s.snapGrid.length; j += 1) {
	                          if (s.snapGrid[j] > -newPosition) {
	                              nextSlide = j;
	                              break;
	                          }

	                      }
	                      if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
	                          newPosition = s.snapGrid[nextSlide];
	                      } else {
	                          newPosition = s.snapGrid[nextSlide - 1];
	                      }
	                      if (!s.rtl) newPosition = - newPosition;
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
	                          if (!s || !allowMomentumBounce) return;
	                          s.emit('onMomentumBounce', s);

	                          s.setWrapperTransition(s.params.speed);
	                          s.setWrapperTranslate(afterBouncePosition);
	                          s.wrapper.transitionEnd(function () {
	                              if (!s) return;
	                              s.onTransitionEnd();
	                          });
	                      });
	                  } else if (s.velocity) {
	                      s.updateProgress(newPosition);
	                      s.setWrapperTransition(momentumDuration);
	                      s.setWrapperTranslate(newPosition);
	                      s.onTransitionStart();
	                      if (!s.animating) {
	                          s.animating = true;
	                          s.wrapper.transitionEnd(function () {
	                              if (!s) return;
	                              s.onTransitionEnd();
	                          });
	                      }

	                  } else {
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
	                  if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
	                  else s.slideTo(stopIndex);

	              }
	              if (s.swipeDirection === 'prev') {
	                  if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
	                  else s.slideTo(stopIndex);
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
	          if (typeof runCallbacks === 'undefined') runCallbacks = true;
	          if (typeof slideIndex === 'undefined') slideIndex = 0;
	          if (slideIndex < 0) slideIndex = 0;
	          s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
	          if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;

	          var translate = - s.snapGrid[s.snapIndex];

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
	              if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
	                  slideIndex = i;
	              }
	          }

	          // Directions locks
	          if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
	              return false;
	          }
	          if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
	              if ((s.activeIndex || 0) !== slideIndex ) return false;
	          }

	          // Update Index
	          if (typeof speed === 'undefined') speed = s.params.speed;
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
	                      if (!s) return;
	                      s.onTransitionEnd(runCallbacks);
	                  });
	              }

	          }

	          return true;
	      };

	      s.onTransitionStart = function (runCallbacks) {
	          if (typeof runCallbacks === 'undefined') runCallbacks = true;
	          if (s.lazy) s.lazy.onTransitionStart();
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
	          if (typeof runCallbacks === 'undefined') runCallbacks = true;
	          if (s.lazy) s.lazy.onTransitionEnd();
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
	              if (s.animating) return false;
	              s.fixLoop();
	              var clientLeft = s.container[0].clientLeft;
	              return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
	          }
	          else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
	      };
	      s._slideNext = function (speed) {
	          return s.slideNext(true, speed, true);
	      };
	      s.slidePrev = function (runCallbacks, speed, internal) {
	          if (s.params.loop) {
	              if (s.animating) return false;
	              s.fixLoop();
	              var clientLeft = s.container[0].clientLeft;
	              return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
	          }
	          else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
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
	              if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
	              else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
	          }

	          s.translate = isH() ? x : y;

	          if (updateActiveIndex) s.updateActiveIndex();
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
	              transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
	              matrix = transformMatrix.toString().split(',');
	          }

	          if (axis === 'x') {
	              //Latest Chrome and webkits Fix
	              if (window.WebKitCSSMatrix)
	                  curTransform = transformMatrix.m41;
	              //Crazy IE10 Matrix
	              else if (matrix.length === 16)
	                  curTransform = parseFloat(matrix[12]);
	              //Normal Browsers
	              else
	                  curTransform = parseFloat(matrix[4]);
	          }
	          if (axis === 'y') {
	              //Latest Chrome and webkits Fix
	              if (window.WebKitCSSMatrix)
	                  curTransform = transformMatrix.m42;
	              //Crazy IE10 Matrix
	              else if (matrix.length === 16)
	                  curTransform = parseFloat(matrix[13]);
	              //Normal Browsers
	              else
	                  curTransform = parseFloat(matrix[5]);
	          }
	          if (s.rtl && curTransform) curTransform = -curTransform;
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
	          initObserver(s.container[0], {childList: false});

	          // Observe wrapper
	          initObserver(s.wrapper[0], {attributes: false});
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

	          if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;

	          s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
	          s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
	          if (s.loopedSlides > slides.length) {
	              s.loopedSlides = slides.length;
	          }

	          var prependSlides = [], appendSlides = [], i;
	          slides.each(function (index, el) {
	              var slide = $(this);
	              if (index < s.loopedSlides) appendSlides.push(el);
	              if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
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
	          //Fix For Positive Oversliding
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
	                  if (slides[i]) s.wrapper.append(slides[i]);
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
	                  if (slides[i]) s.wrapper.prepend(slides[i]);
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
	          var newActiveIndex = s.activeIndex,
	              indexToRemove;
	          if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
	              for (var i = 0; i < slidesIndexes.length; i++) {
	                  indexToRemove = slidesIndexes[i];
	                  if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
	                  if (indexToRemove < newActiveIndex) newActiveIndex--;
	              }
	              newActiveIndex = Math.max(newActiveIndex, 0);
	          }
	          else {
	              indexToRemove = slidesIndexes;
	              if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
	              if (indexToRemove < newActiveIndex) newActiveIndex--;
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
	                      if (!s.params.virtualTranslate) tx = tx - s.translate;
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
	                          if (eventTriggered) return;
	                          if (!s) return;
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
	                          cubeShadow.css({height: s.width + 'px'});
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
	                          tx = - round * 4 * s.size;
	                          tz = 0;
	                      }
	                      else if ((i - 1) % 4 === 0) {
	                          tx = 0;
	                          tz = - round * 4 * s.size;
	                      }
	                      else if ((i - 2) % 4 === 0) {
	                          tx = s.size + round * 4 * s.size;
	                          tz = s.size;
	                      }
	                      else if ((i - 3) % 4 === 0) {
	                          tx = - s.size;
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
	                          if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
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
	                          if (shadowBefore.length) shadowBefore[0].style.opacity = -slide[0].progress;
	                          if (shadowAfter.length) shadowAfter[0].style.opacity = slide[0].progress;
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
	                          var scale1 = s.params.cube.shadowScale,
	                              scale2 = s.params.cube.shadowScale / multiplier,
	                              offset = s.params.cube.shadowOffset;
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
	                  var rotate = isH() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
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
	                      if (Math.abs(translateX) < 0.001) translateX = 0;
	                      if (Math.abs(translateY) < 0.001) translateY = 0;
	                      if (Math.abs(translateZ) < 0.001) translateZ = 0;
	                      if (Math.abs(rotateY) < 0.001) rotateY = 0;
	                      if (Math.abs(rotateX) < 0.001) rotateX = 0;

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
	                          if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
	                          if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
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
	              if (typeof index === 'undefined') return;
	              if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
	              if (s.slides.length === 0) return;

	              var slide = s.slides.eq(index);
	              var img = slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
	              if (slide.hasClass('swiper-lazy') && !slide.hasClass('swiper-lazy-loaded') && !slide.hasClass('swiper-lazy-loading')) {
	                  img.add(slide[0]);
	              }
	              if (img.length === 0) return;

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
	                      for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView ; i++) {
	                          if (s.slides[i]) s.lazy.loadImageInSlide(i);
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
	                          if (s.slides[i]) s.lazy.loadImageInSlide(i);
	                      }
	                      // Prev Slides
	                      for (i = s.activeIndex - s.params.slidesPerView; i < s.activeIndex ; i++) {
	                          if (s.slides[i]) s.lazy.loadImageInSlide(i);
	                      }
	                  }
	                  else {
	                      var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
	                      if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());

	                      var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
	                      if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
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
	              if (!s.params.scrollbar) return;
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
	              if (!s.params.scrollbar) return;
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
	              if (!s.params.scrollbar) return;
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
	                  if (!x2) return 0;

	                  // Get the indexes of x1 and x3 (the array indexes before and after given x2):
	                  i3 = binarySearch(this.x, x2);
	                  i1 = i3 - 1;

	                  // We have our indexes i1 & i3, so we can calculate already:
	                  // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
	                  return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
	              };

	              var binarySearch = (function() {
	                  var maxIndex, minIndex, guess;
	                  return function(array, val) {
	                      minIndex = -1;
	                      maxIndex = array.length;
	                      while (maxIndex - minIndex > 1)
	                          if (array[guess = maxIndex + minIndex >> 1] <= val) {
	                              minIndex = guess;
	                          } else {
	                              maxIndex = guess;
	                          }
	                      return maxIndex;
	                  };
	              })();
	          },
	          //xxx: for now i will just save one spline function to to
	          getInterpolateFunction: function(c){
	              if(!s.controller.spline) s.controller.spline = s.params.loop ?
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

	                  if(!controlledTranslate || s.params.controlBy === 'container'){
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
	                      c.wrapper.transitionEnd(function(){
	                          if (!controlled) return;
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
	              if (!s.params.hashnav) return;
	              s.hashnav.initialized = true;
	              var hash = document.location.hash.replace('#', '');
	              if (!hash) return;
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
	              if (!s.hashnav.initialized || !s.params.hashnav) return;
	              document.location.hash = s.slides.eq(s.activeIndex).attr('data-hash') || '';
	          }
	      };

	      /*=========================
	        Keyboard Control
	        ===========================*/
	      function handleKeyboard(e) {
	          if (e.originalEvent) e = e.originalEvent; //jquery fix
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
	              if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
	              var swiperCoord = [
	                  [swiperOffset.left, swiperOffset.top],
	                  [swiperOffset.left + s.width, swiperOffset.top],
	                  [swiperOffset.left, swiperOffset.top + s.height],
	                  [swiperOffset.left + s.width, swiperOffset.top + s.height]
	              ];
	              for (var i = 0; i < swiperCoord.length; i++) {
	                  var point = swiperCoord[i];
	                  if (
	                      point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
	                      point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
	                  ) {
	                      inView = true;
	                  }

	              }
	              if (!inView) return;
	          }
	          if (isH()) {
	              if (kc === 37 || kc === 39) {
	                  if (e.preventDefault) e.preventDefault();
	                  else e.returnValue = false;
	              }
	              if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
	              if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
	          }
	          else {
	              if (kc === 38 || kc === 40) {
	                  if (e.preventDefault) e.preventDefault();
	                  else e.returnValue = false;
	              }
	              if (kc === 40) s.slideNext();
	              if (kc === 38) s.slidePrev();
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
	          } catch (e) {}

	          if (!s.mousewheel.event && document.onmousewheel !== undefined) {
	              s.mousewheel.event = 'mousewheel';
	          }
	          if (!s.mousewheel.event) {
	              s.mousewheel.event = 'DOMMouseScroll';
	          }
	      }
	      function handleMousewheel(e) {
	          if (e.originalEvent) e = e.originalEvent; //jquery fix
	          var we = s.mousewheel.event;
	          var delta = 0;
	          //Opera & IE
	          if (e.detail) delta = -e.detail;
	          //WebKits
	          else if (we === 'mousewheel') {
	              if (s.params.mousewheelForceToAxis) {
	                  if (isH()) {
	                      if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) delta = e.wheelDeltaX;
	                      else return;
	                  }
	                  else {
	                      if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)) delta = e.wheelDeltaY;
	                      else return;
	                  }
	              }
	              else {
	                  delta = e.wheelDelta;
	              }
	          }
	          //Old FireFox
	          else if (we === 'DOMMouseScroll') delta = -e.detail;
	          //New FireFox
	          else if (we === 'wheel') {
	              if (s.params.mousewheelForceToAxis) {
	                  if (isH()) {
	                      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = -e.deltaX;
	                      else return;
	                  }
	                  else {
	                      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) delta = -e.deltaY;
	                      else return;
	                  }
	              }
	              else {
	                  delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? - e.deltaX : - e.deltaY;
	              }
	          }

	          if (s.params.mousewheelInvert) delta = -delta;

	          if (!s.params.freeMode) {
	              if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
	                  if (delta < 0) {
	                      if ((!s.isEnd || s.params.loop) && !s.animating) s.slideNext();
	                      else if (s.params.mousewheelReleaseOnEdges) return true;
	                  }
	                  else {
	                      if ((!s.isBeginning || s.params.loop) && !s.animating) s.slidePrev();
	                      else if (s.params.mousewheelReleaseOnEdges) return true;
	                  }
	              }
	              s.mousewheel.lastScrollTime = (new window.Date()).getTime();

	          }
	          else {
	              //Freemode or scrollContainer:

	              var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;

	              if (position > 0) position = 0;
	              if (position < s.maxTranslate()) position = s.maxTranslate();

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
	              if (position === 0 || position === s.maxTranslate()) return;
	          }
	          if (s.params.autoplay) s.stopAutoplay();

	          if (e.preventDefault) e.preventDefault();
	          else e.returnValue = false;
	          return false;
	      }
	      s.disableMousewheelControl = function () {
	          if (!s.mousewheel.event) return false;
	          s.container.off(s.mousewheel.event, handleMousewheel);
	          return true;
	      };

	      s.enableMousewheelControl = function () {
	          if (!s.mousewheel.event) return false;
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
	              pX = pX * progress + 'px' ;
	          }
	          if ((pY).indexOf('%') >= 0) {
	              pY = parseInt(pY, 10) * progress + '%';
	          }
	          else {
	              pY = pY * progress + 'px' ;
	          }
	          el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
	      }
	      s.parallax = {
	          setTranslate: function () {
	              s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
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
	              if (typeof duration === 'undefined') duration = s.params.speed;
	              s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
	                  var el = $(this);
	                  var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
	                  if (duration === 0) parallaxDuration = 0;
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
	          if (p) s._plugins.push(p);
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
	      function normalizeEventName (eventName) {
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
	      s.emitterEventListeners = {

	      };
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
	          if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	      };
	      s.on = function (eventName, handler) {
	          eventName = normalizeEventName(eventName);
	          if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
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
	          if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
	          for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
	              if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
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
	              if (event.keyCode !== 13) return;
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
	              if (notification.length === 0) return;
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
	              if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
	          }
	      };


	      /*=========================
	        Init/Destroy
	        ===========================*/
	      s.init = function () {
	          if (s.params.loop) s.createLoop();
	          s.updateContainerSize();
	          s.updateSlidesSize();
	          s.updatePagination();
	          if (s.params.scrollbar && s.scrollbar) {
	              s.scrollbar.set();
	          }
	          if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	              if (!s.params.loop) s.updateProgress();
	              s.effects[s.params.effect].setTranslate();
	          }
	          if (s.params.loop) {
	              s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
	          }
	          else {
	              s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
	              if (s.params.initialSlide === 0) {
	                  if (s.parallax && s.params.parallax) s.parallax.setTranslate();
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
	              if (s.enableKeyboardControl) s.enableKeyboardControl();
	          }
	          if (s.params.mousewheelControl) {
	              if (s.enableMousewheelControl) s.enableMousewheelControl();
	          }
	          if (s.params.hashnav) {
	              if (s.hashnav) s.hashnav.init();
	          }
	          if (s.params.a11y && s.a11y) s.a11y.init();
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
	          if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
	          if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);

	          // Scrollbar
	          if (s.params.scrollbar && s.scrollbar) {
	              if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
	              if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
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
	              if (s.disableKeyboardControl) s.disableKeyboardControl();
	          }
	          if (s.params.mousewheelControl) {
	              if (s.disableMousewheelControl) s.disableMousewheelControl();
	          }
	          // Disable a11y
	          if (s.params.a11y && s.a11y) s.a11y.destroy();
	          // Destroy callback
	          s.emit('onDestroy');
	          // Delete instance
	          if (deleteInstance !== false) s = null;
	      };

	      s.init();



	      // Return swiper instance
	      return s;
	  };


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
	          touch : (window.Modernizr && Modernizr.touch === true) || (function () {
	              return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	          })(),

	          transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
	              var div = document.createElement('div').style;
	              return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
	          })(),

	          flexbox: (function () {
	              var div = document.createElement('div').style;
	              var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
	              for (var i = 0; i < styles.length; i++) {
	                  if (styles[i] in div) return true;
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
	                      if (html.indexOf('<li') === 0) toCreate = 'ul';
	                      if (html.indexOf('<tr') === 0) toCreate = 'tbody';
	                      if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
	                      if (html.indexOf('<tbody') === 0) toCreate = 'table';
	                      if (html.indexOf('<option') === 0) toCreate = 'select';
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
	                          if (els[i]) arr.push(els[i]);
	                      }
	                  }
	              }
	              // Node/element
	              else if (selector.nodeType || selector === window || selector === document) {
	                  arr.push(selector);
	              }
	              //Array of elements or instance of Dom
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
	              if (!this[0]) return false;
	              else return this[0].classList.contains(className);
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
	                  if (this[0]) return this[0].getAttribute(attrs);
	                  else return undefined;
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
	                      if (dataKey) return dataKey;
	                      else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
	                      else return undefined;
	                  }
	                  else return undefined;
	              }
	              else {
	                  // Set value
	                  for (var i = 0; i < this.length; i++) {
	                      var el = this[i];
	                      if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
	                      el.dom7ElementDataStorage[key] = value;
	                  }
	                  return this;
	              }
	          },
	          // Transforms
	          transform : function (transform) {
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
	                  if ($(target).is(targetSelector)) listener.call(target, e);
	                  else {
	                      var parents = $(target).parents();
	                      for (var k = 0; k < parents.length; k++) {
	                          if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
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
	                          if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
	                          this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
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
	                      evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
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
	              var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	                  i, j, dom = this;
	              function fireCallBack(e) {
	                  /*jshint validthis:true */
	                  if (e.target !== this) return;
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
	              else return null;
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
	              else return null;
	          },
	          offset: function () {
	              if (this.length > 0) {
	                  var el = this[0];
	                  var box = el.getBoundingClientRect();
	                  var body = document.body;
	                  var clientTop  = el.clientTop  || body.clientTop  || 0;
	                  var clientLeft = el.clientLeft || body.clientLeft || 0;
	                  var scrollTop  = window.pageYOffset || el.scrollTop;
	                  var scrollLeft = window.pageXOffset || el.scrollLeft;
	                  return {
	                      top: box.top  + scrollTop  - clientTop,
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
	                      if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
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
	              if (!this[0]) return false;
	              var compareWith, i;
	              if (typeof selector === 'string') {
	                  var el = this[0];
	                  if (el === document) return selector === document;
	                  if (el === window) return selector === window;

	                  if (el.matches) return el.matches(selector);
	                  else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
	                  else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
	                  else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
	                  else {
	                      compareWith = $(selector);
	                      for (i = 0; i < compareWith.length; i++) {
	                          if (compareWith[i] === this[0]) return true;
	                      }
	                      return false;
	                  }
	              }
	              else if (selector === document) return this[0] === document;
	              else if (selector === window) return this[0] === window;
	              else {
	                  if (selector.nodeType || selector instanceof Dom7) {
	                      compareWith = selector.nodeType ? [selector] : selector;
	                      for (i = 0; i < compareWith.length; i++) {
	                          if (compareWith[i] === this[0]) return true;
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
	                      if (child.nodeType === 1) i++;
	                  }
	                  return i;
	              }
	              else return undefined;
	          },
	          eq: function (index) {
	              if (typeof index === 'undefined') return this;
	              var length = this.length;
	              var returnIndex;
	              if (index > length - 1) {
	                  return new Dom7([]);
	              }
	              if (index < 0) {
	                  returnIndex = length + index;
	                  if (returnIndex < 0) return new Dom7([]);
	                  else return new Dom7([this[returnIndex]]);
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
	                      // this[i].insertAdjacentHTML('afterbegin', newChild);
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
	                      if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
	                      else return new Dom7([]);
	                  }
	                  else {
	                      if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
	                      else return new Dom7([]);
	                  }
	              }
	              else return new Dom7([]);
	          },
	          nextAll: function (selector) {
	              var nextEls = [];
	              var el = this[0];
	              if (!el) return new Dom7([]);
	              while (el.nextElementSibling) {
	                  var next = el.nextElementSibling;
	                  if (selector) {
	                      if($(next).is(selector)) nextEls.push(next);
	                  }
	                  else nextEls.push(next);
	                  el = next;
	              }
	              return new Dom7(nextEls);
	          },
	          prev: function (selector) {
	              if (this.length > 0) {
	                  if (selector) {
	                      if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
	                      else return new Dom7([]);
	                  }
	                  else {
	                      if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
	                      else return new Dom7([]);
	                  }
	              }
	              else return new Dom7([]);
	          },
	          prevAll: function (selector) {
	              var prevEls = [];
	              var el = this[0];
	              if (!el) return new Dom7([]);
	              while (el.previousElementSibling) {
	                  var prev = el.previousElementSibling;
	                  if (selector) {
	                      if($(prev).is(selector)) prevEls.push(prev);
	                  }
	                  else prevEls.push(prev);
	                  el = prev;
	              }
	              return new Dom7(prevEls);
	          },
	          parent: function (selector) {
	              var parents = [];
	              for (var i = 0; i < this.length; i++) {
	                  if (selector) {
	                      if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
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
	                          if ($(parent).is(selector)) parents.push(parent);
	                      }
	                      else {
	                          parents.push(parent);
	                      }
	                      parent = parent.parentNode;
	                  }
	              }
	              return $($.unique(parents));
	          },
	          find : function (selector) {
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
	                          if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
	                      }
	                      else {
	                          if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
	                      }
	                  }
	              }
	              return new Dom7($.unique(children));
	          },
	          remove: function () {
	              for (var i = 0; i < this.length; i++) {
	                  if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
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
	              if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
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
	              if (!firstInstance) firstInstance = s;
	          });
	          return firstInstance;
	      };
	  }

	  if (domLib) {
	      if (!('transitionEnd' in domLib.fn)) {
	          domLib.fn.transitionEnd = function (callback) {
	              var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	                  i, j, dom = this;
	              function fireCallBack(e) {
	                  /*jshint validthis:true */
	                  if (e.target !== this) return;
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
/* 56 */
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
	var common_1 = __webpack_require__(25);
	var app_1 = __webpack_require__(14);
	var config_1 = __webpack_require__(7);
	var tab_button_1 = __webpack_require__(57);
	var tab_highlight_1 = __webpack_require__(59);
	var ion_1 = __webpack_require__(28);
	var platform_1 = __webpack_require__(8);
	var nav_controller_1 = __webpack_require__(43);
	var view_controller_1 = __webpack_require__(37);
	var icon_1 = __webpack_require__(40);
	var util_1 = __webpack_require__(9);
	/**
	 * @name Tabs
	 * @description
	 * _For basic Tabs usage, see the [Tabs section](../../../../components/#tabs)
	 * of the Component docs._
	 *
	 * The Tabs component is a container with a TabBar and any number of
	 * individual Tab components. On iOS, the TabBar is placed on the bottom of
	 * the screen, while on Android it is at the top.
	 *
	 * @usage
	 * ```html
	 * <ion-tabs>
	 *   <ion-tab [root]="tabRoot"></ion-tab>
	 * </ion-tabs>
	 * ```
	 *
	 * @demo /docs/v2/demos/tabs/
	 *
	 * @see {@link /docs/v2/components#tabs Tabs Component Docs}
	 * @see {@link ../Tab Tab API Docs}
	 *
	 */
	var Tabs = (function (_super) {
	    __extends(Tabs, _super);
	    function Tabs(viewCtrl, parent, _app, _config, _elementRef, _platform, _renderer) {
	        var _this = this;
	        _super.call(this, _elementRef);
	        this._app = _app;
	        this._config = _config;
	        this._elementRef = _elementRef;
	        this._platform = _platform;
	        this._renderer = _renderer;
	        this._ids = -1;
	        this._preloadTabs = null;
	        this._tabs = [];
	        this._onReady = null;
	        /**
	         * @input {any} expression you want to evaluate when the tabs change
	         */
	        this.change = new core_1.EventEmitter();
	        this.parent = parent;
	        this.id = ++tabIds;
	        this.subPages = _config.getBoolean('tabSubPages');
	        this._useHighlight = _config.getBoolean('tabbarHighlight');
	        // Tabs may also be an actual ViewController which was navigated to
	        // if Tabs is static and not navigated to within a NavController
	        // then skip this and don't treat it as it's own ViewController
	        if (viewCtrl) {
	            viewCtrl.setContent(this);
	            viewCtrl.setContentRef(_elementRef);
	            viewCtrl.onReady = function (done) {
	                _this._onReady = done;
	            };
	        }
	    }
	    /**
	     * @private
	     */
	    Tabs.prototype.ngAfterViewInit = function () {
	        var _this = this;
	        this._setConfig('tabbarPlacement', 'bottom');
	        this._setConfig('tabbarIcons', 'top');
	        if (this._useHighlight) {
	            this._platform.onResize(function () {
	                _this._highlight.select(_this.getSelected());
	            });
	        }
	        this._btns.toArray().forEach(function (tabButton) {
	            tabButton.select.subscribe(function (tab) {
	                _this.select(tab);
	            });
	        });
	    };
	    /**
	     * @private
	     */
	    Tabs.prototype.ngAfterContentInit = function () {
	        var _this = this;
	        var selectedIndex = this.selectedIndex ? parseInt(this.selectedIndex, 10) : 0;
	        var preloadTabs = (util_1.isUndefined(this.preloadTabs) ? this._config.getBoolean('preloadTabs') : util_1.isTrueProperty(this.preloadTabs));
	        this._tabs.forEach(function (tab, index) {
	            if (index === selectedIndex) {
	                _this.select(tab);
	            }
	            else if (preloadTabs) {
	                tab.preload(1000 * index);
	            }
	        });
	    };
	    /**
	     * @private
	     */
	    Tabs.prototype._setConfig = function (attrKey, fallback) {
	        var val = this[attrKey];
	        if (util_1.isUndefined(val)) {
	            val = this._config.get(attrKey);
	        }
	        this._renderer.setElementAttribute(this._elementRef.nativeElement, attrKey, val);
	    };
	    /**
	     * @private
	     */
	    Tabs.prototype.add = function (tab) {
	        tab.id = this.id + '-' + (++this._ids);
	        this._tabs.push(tab);
	    };
	    /**
	     * @param {number} index Index of the tab you want to select
	     */
	    Tabs.prototype.select = function (tabOrIndex) {
	        var _this = this;
	        var selectedTab = (typeof tabOrIndex === 'number' ? this.getByIndex(tabOrIndex) : tabOrIndex);
	        if (!selectedTab) {
	            return;
	        }
	        var deselectedTab = this.getSelected();
	        if (selectedTab === deselectedTab) {
	            // no change
	            return this._touchActive(selectedTab);
	        }
	        void 0;
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
	            selectedTab.select.emit(selectedTab);
	            _this.change.emit(selectedTab);
	            if (selectedTab.root) {
	                // only show the selectedTab if it has a root
	                // it's possible the tab is only for opening modal's or signing out
	                // and doesn't actually have content. In the case there's no content
	                // for a tab then do nothing and leave the current view as is
	                _this._tabs.forEach(function (tab) {
	                    tab.setSelected(tab === selectedTab);
	                });
	                if (_this._useHighlight) {
	                    _this._highlight.select(selectedTab);
	                }
	            }
	            selectedPage && selectedPage.didEnter();
	            deselectedPage && deselectedPage.didLeave();
	            if (_this._onReady) {
	                _this._onReady();
	                _this._onReady = null;
	            }
	        });
	    };
	    /**
	     * @param {number} index Index of the tab you want to get
	     * @returns {Tab} Returns the tab who's index matches the one passed
	     */
	    Tabs.prototype.getByIndex = function (index) {
	        if (index < this._tabs.length && index > -1) {
	            return this._tabs[index];
	        }
	        return null;
	    };
	    /**
	     * @return {Tab} Returns the currently selected tab
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
	         * @private
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
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Tabs.prototype, "selectedIndex", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Tabs.prototype, "preloadTabs", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Tabs.prototype, "tabbarIcons", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Tabs.prototype, "tabbarPlacement", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Tabs.prototype, "change", void 0);
	    __decorate([
	        core_1.ViewChild(tab_highlight_1.TabHighlight), 
	        __metadata('design:type', tab_highlight_1.TabHighlight)
	    ], Tabs.prototype, "_highlight", void 0);
	    __decorate([
	        core_1.ViewChildren(tab_button_1.TabButton), 
	        __metadata('design:type', Object)
	    ], Tabs.prototype, "_btns", void 0);
	    Tabs = __decorate([
	        core_1.Component({
	            selector: 'ion-tabs',
	            template: '<ion-navbar-section>' +
	                '<template navbar-anchor></template>' +
	                '</ion-navbar-section>' +
	                '<ion-tabbar-section>' +
	                '<tabbar role="tablist">' +
	                '<a *ngFor="#t of _tabs" [tab]="t" class="tab-button" role="tab">' +
	                '<ion-icon *ngIf="t.tabIcon" [name]="t.tabIcon" [isActive]="t.isSelected" class="tab-button-icon"></ion-icon>' +
	                '<span *ngIf="t.tabTitle" class="tab-button-text">{{t.tabTitle}}</span>' +
	                '<ion-badge *ngIf="t.tabBadge" class="tab-badge" [ngClass]="\'badge-\' + t.tabBadgeStyle">{{t.tabBadge}}</ion-badge>' +
	                '<ion-button-effect></ion-button-effect>' +
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
	                tab_button_1.TabButton,
	                tab_highlight_1.TabHighlight,
	                core_1.forwardRef(function () { return TabNavBarAnchor; })
	            ]
	        }),
	        __param(0, core_1.Optional()),
	        __param(1, core_1.Optional()), 
	        __metadata('design:paramtypes', [view_controller_1.ViewController, nav_controller_1.NavController, app_1.IonicApp, config_1.Config, core_1.ElementRef, platform_1.Platform, core_1.Renderer])
	    ], Tabs);
	    return Tabs;
	})(ion_1.Ion);
	exports.Tabs = Tabs;
	var tabIds = -1;
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
	        __metadata('design:paramtypes', [Tabs, core_1.ViewContainerRef])
	    ], TabNavBarAnchor);
	    return TabNavBarAnchor;
	})();


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
	var core_1 = __webpack_require__(3);
	var tab_1 = __webpack_require__(58);
	var ion_1 = __webpack_require__(28);
	var config_1 = __webpack_require__(7);
	/**
	 * @private
	 */
	var TabButton = (function (_super) {
	    __extends(TabButton, _super);
	    function TabButton(config, elementRef) {
	        _super.call(this, elementRef);
	        this.select = new core_1.EventEmitter();
	        this.disHover = (config.get('hoverCSS') === false);
	    }
	    TabButton.prototype.ngOnInit = function () {
	        this.tab.btn = this;
	        this.hasTitle = !!this.tab.tabTitle;
	        this.hasIcon = !!this.tab.tabIcon;
	        this.hasTitleOnly = (this.hasTitle && !this.hasIcon);
	        this.hasIconOnly = (this.hasIcon && !this.hasTitle);
	        this.hasBadge = !!this.tab.tabBadge;
	    };
	    TabButton.prototype.onClick = function () {
	        this.select.emit(this.tab);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', tab_1.Tab)
	    ], TabButton.prototype, "tab", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], TabButton.prototype, "select", void 0);
	    __decorate([
	        core_1.HostListener('click'), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', void 0)
	    ], TabButton.prototype, "onClick", null);
	    TabButton = __decorate([
	        core_1.Directive({
	            selector: '.tab-button',
	            host: {
	                '[attr.id]': 'tab._btnId',
	                '[attr.aria-controls]': 'tab._panelId',
	                '[attr.aria-selected]': 'tab.isSelected',
	                '[class.has-title]': 'hasTitle',
	                '[class.has-icon]': 'hasIcon',
	                '[class.has-title-only]': 'hasTitleOnly',
	                '[class.icon-only]': 'hasIconOnly',
	                '[class.has-badge]': 'hasBadge',
	                '[class.disable-hover]': 'disHover'
	            }
	        }), 
	        __metadata('design:paramtypes', [config_1.Config, core_1.ElementRef])
	    ], TabButton);
	    return TabButton;
	})(ion_1.Ion);
	exports.TabButton = TabButton;


/***/ },
/* 58 */
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
	var core_2 = __webpack_require__(3);
	var app_1 = __webpack_require__(14);
	var config_1 = __webpack_require__(7);
	var keyboard_1 = __webpack_require__(16);
	var nav_controller_1 = __webpack_require__(43);
	var tabs_1 = __webpack_require__(56);
	/**
	 * @name Tab
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
	 * @usage
	 * For most cases, you can give tab a `[root]` property along with the component you want to load.
	 *
	 * ```html
	 * <ion-tabs>
	 *  <ion-tab [root]="chatRoot" tabTitle="Chat" tabIcon="chat"><ion-tab>
	 * </ion-tabs>
	 * ```
	 *
	 * ```ts
	 * import {Chat} from '../chat/chat';
	 * export class Tabs {
	 *    constructor(){
	 *      // here we'll set the property of chatRoot to
	 *      // the imported class of Chat
	 *      this.chatRoot = Chat
	 *    }
	 * }
	 * ```
	 *
	 * In other cases, you may not want to navigate to a new component, but just
	 * call a method. You can use the `(select)` event to call a method on your
	 * class. Below is an example of presenting a modal from one of the tabs.
	 *
	 * ```html
	 * <ion-tabs preloadTabs="false">
	 *   <ion-tab (select)="chat()"></ion-tab>
	 * </ion-tabs>
	 * ```
	 *
	 * ```ts
	 * export class Tabs {
	 *   constructor(nav: NavController){
	 *     this.nav = nav;
	 *   }
	 *   chat() {
	 *     let modal = Modal.create(ChatPage);
	 *     this.nav.present(modal);
	 *   }
	 * }
	 * ```
	 *
	 *
	 *
	 * @demo /docs/v2/demos/tabs/
	 */
	var Tab = (function (_super) {
	    __extends(Tab, _super);
	    function Tab(parentTabs, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer) {
	        // A Tab is a NavController for its child pages
	        _super.call(this, parentTabs, app, config, keyboard, elementRef, 'contents', compiler, viewManager, zone, renderer);
	        /**
	         * @output {Tab} Method to call when the current tab is selected
	         */
	        this.select = new core_2.EventEmitter();
	        parentTabs.add(this);
	        this._panelId = 'tabpanel-' + this.id;
	        this._btnId = 'tab-' + this.id;
	    }
	    /**
	     * @private
	     */
	    Tab.prototype.ngOnInit = function () {
	        this.tabBadgeStyle = this.tabBadgeStyle ? this.tabBadgeStyle : 'default';
	    };
	    /**
	     * @private
	     */
	    Tab.prototype.load = function (opts, done) {
	        if (!this._loaded && this.root) {
	            this.push(this.root, this.rootParams, opts).then(function () {
	                done();
	            });
	            this._loaded = true;
	        }
	        else {
	            done();
	        }
	    };
	    /**
	     * @private
	     */
	    Tab.prototype.preload = function (wait) {
	        var _this = this;
	        this._loadTimer = setTimeout(function () {
	            if (!_this._loaded) {
	                void 0;
	                _this.load({
	                    animate: false,
	                    preload: true,
	                    postLoad: function (viewCtrl) {
	                        var navbar = viewCtrl.getNavbar();
	                        navbar && navbar.setHidden(true);
	                    }
	                }, function () { });
	            }
	        }, wait);
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
	         * @private
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
	    __decorate([
	        core_2.Input(), 
	        __metadata('design:type', core_1.Type)
	    ], Tab.prototype, "root", void 0);
	    __decorate([
	        core_2.Input(), 
	        __metadata('design:type', Object)
	    ], Tab.prototype, "rootParams", void 0);
	    __decorate([
	        core_2.Input(), 
	        __metadata('design:type', String)
	    ], Tab.prototype, "tabTitle", void 0);
	    __decorate([
	        core_2.Input(), 
	        __metadata('design:type', String)
	    ], Tab.prototype, "tabIcon", void 0);
	    __decorate([
	        core_2.Input(), 
	        __metadata('design:type', String)
	    ], Tab.prototype, "tabBadge", void 0);
	    __decorate([
	        core_2.Input(), 
	        __metadata('design:type', String)
	    ], Tab.prototype, "tabBadgeStyle", void 0);
	    __decorate([
	        core_2.Output(), 
	        __metadata('design:type', core_2.EventEmitter)
	    ], Tab.prototype, "select", void 0);
	    Tab = __decorate([
	        core_1.Component({
	            selector: 'ion-tab',
	            host: {
	                '[class.show-tab]': 'isSelected',
	                '[attr.id]': '_panelId',
	                '[attr.aria-labelledby]': '_btnId',
	                'role': 'tabpanel'
	            },
	            template: '<div #contents></div>'
	        }),
	        __param(0, core_1.Inject(core_1.forwardRef(function () { return tabs_1.Tabs; }))), 
	        __metadata('design:paramtypes', [tabs_1.Tabs, app_1.IonicApp, config_1.Config, keyboard_1.Keyboard, core_1.ElementRef, core_1.Compiler, core_1.AppViewManager, core_1.NgZone, core_1.Renderer])
	    ], Tab);
	    return Tab;
	})(nav_controller_1.NavController);
	exports.Tab = Tab;


/***/ },
/* 59 */
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
	var dom_1 = __webpack_require__(10);
	/**
	 * @private
	 */
	var TabHighlight = (function () {
	    function TabHighlight(_elementRef) {
	        this._elementRef = _elementRef;
	    }
	    TabHighlight.prototype.select = function (tab) {
	        var _this = this;
	        dom_1.rafFrames(3, function () {
	            var d = tab.btn.getDimensions();
	            var ele = _this._elementRef.nativeElement;
	            ele.style.transform = 'translate3d(' + d.left + 'px,0,0) scaleX(' + d.width + ')';
	            if (!_this._init) {
	                _this._init = true;
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
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], TabHighlight);
	    return TabHighlight;
	})();
	exports.TabHighlight = TabHighlight;


/***/ },
/* 60 */
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
	var ion_1 = __webpack_require__(28);
	var virtual_1 = __webpack_require__(61);
	var item_sliding_gesture_1 = __webpack_require__(62);
	var util_1 = __webpack_require__(34);
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
	 */
	var List = (function (_super) {
	    __extends(List, _super);
	    function List(elementRef, _zone) {
	        _super.call(this, elementRef);
	        this._zone = _zone;
	        this._enableSliding = false;
	        this.ele = elementRef.nativeElement;
	    }
	    /**
	     * @private
	     */
	    List.prototype.ngOnInit = function () {
	        if (util_1.isDefined(this.virtual)) {
	            void 0;
	            void 0;
	            void 0;
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
	    /**
	     * Enable sliding items if your page has them
	     *
	     * ```ts
	     * export class MyClass {
	     *    constructor(app: IonicApp){
	     *      this.app = app;
	     *      this.list = this.app.getComponent('my-list');
	     *    }
	     *    stopSliding(){
	     *      this.list.enableSlidingItems(false);
	     *    }
	     * }
	     * ```
	     * @param {boolean} shouldEnable whether the item-sliding should be enabled or not
	     */
	    List.prototype.enableSlidingItems = function (shouldEnable) {
	        var _this = this;
	        if (this._enableSliding !== shouldEnable) {
	            this._enableSliding = shouldEnable;
	            if (shouldEnable) {
	                void 0;
	                this._zone.runOutsideAngular(function () {
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
	    /**
	     * Enable sliding items if your page has
	     *
	     * ```ts
	     * export class MyClass {
	     *    constructor(app: IonicApp){
	     *      this.app = app;
	     *      this.list = this.app.getComponent('my-list');
	     *    }
	     *    // Here we have some method that will close the items
	     *    // when called
	     *    closeItmes(){
	     *      this.list.closeSlidingItems();
	     *    }
	     * }
	     * ```
	     */
	    List.prototype.closeSlidingItems = function () {
	        this.slidingGesture && this.slidingGesture.closeOpened();
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], List.prototype, "items", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], List.prototype, "virtual", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], List.prototype, "content", void 0);
	    List = __decorate([
	        core_1.Directive({
	            selector: 'ion-list'
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone])
	    ], List);
	    return List;
	})(ion_1.Ion);
	exports.List = List;
	/**
	 * @private
	 */
	var ListHeader = (function () {
	    function ListHeader(_renderer, _elementRef, id) {
	        this._renderer = _renderer;
	        this._elementRef = _elementRef;
	        this._id = id;
	    }
	    Object.defineProperty(ListHeader.prototype, "id", {
	        get: function () {
	            return this._id;
	        },
	        set: function (val) {
	            this._id = val;
	            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'id', val);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ListHeader = __decorate([
	        core_1.Directive({
	            selector: 'ion-list-header'
	        }),
	        __param(2, core_1.Attribute('id')), 
	        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, String])
	    ], ListHeader);
	    return ListHeader;
	})();
	exports.ListHeader = ListHeader;


/***/ },
/* 61 */
/***/ function(module, exports) {

	var ListVirtualScroll = (function () {
	    function ListVirtualScroll(list) {
	        var _this = this;
	        this.itemHeight = 60;
	        this.shownItems = {};
	        this.enteringItems = [];
	        this.leavingItems = [];
	        this.list = list;
	        this.content = this.list.content;
	        this.viewportHeight = this.content.height();
	        this.viewContainer = this.list.itemTemplate.viewContainer;
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
	        void 0;
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
	            void 0;
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
	            void 0;
	            this.viewContainer.remove(itemRef.realIndex);
	        }
	        void 0;
	        void 0;
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var hammer_1 = __webpack_require__(35);
	var drag_gesture_1 = __webpack_require__(32);
	var dom_1 = __webpack_require__(10);
	var ItemSlidingGesture = (function (_super) {
	    __extends(ItemSlidingGesture, _super);
	    function ItemSlidingGesture(list, listEle) {
	        var _this = this;
	        _super.call(this, listEle, {
	            direction: 'x',
	            threshold: DRAG_THRESHOLD
	        });
	        this.list = list;
	        this.listEle = listEle;
	        this.canDrag = true;
	        this.data = {};
	        this.openItems = 0;
	        this.preventDrag = false;
	        this.dragEnded = true;
	        this.listen();
	        this.onTap = function (ev) {
	            if (!isFromOptionButtons(ev.target)) {
	                var didClose = _this.closeOpened();
	                if (didClose) {
	                    void 0;
	                    preventDefault(ev);
	                }
	            }
	        };
	        this.onMouseOut = function (ev) {
	            if (ev.target.tagName === 'ION-ITEM-SLIDING') {
	                void 0;
	                _this.onDragEnd(ev);
	            }
	        };
	    }
	    ItemSlidingGesture.prototype.onDragStart = function (ev) {
	        var itemContainerEle = getItemConatiner(ev.target);
	        if (!itemContainerEle) {
	            void 0;
	            return false;
	        }
	        this.closeOpened(itemContainerEle);
	        var openAmout = this.getOpenAmount(itemContainerEle);
	        var itemData = this.get(itemContainerEle);
	        this.preventDrag = (openAmout > 0);
	        if (this.preventDrag) {
	            this.closeOpened();
	            void 0;
	            preventDefault(ev);
	            return;
	        }
	        itemContainerEle.classList.add('active-slide');
	        this.set(itemContainerEle, 'offsetX', openAmout);
	        this.set(itemContainerEle, 'startX', ev.center[this.direction]);
	        this.dragEnded = false;
	        return true;
	    };
	    ItemSlidingGesture.prototype.onDrag = function (ev) {
	        var _this = this;
	        if (this.dragEnded || this.preventDrag || Math.abs(ev.deltaY) > 30) {
	            void 0;
	            this.preventDrag = true;
	            return;
	        }
	        var itemContainerEle = getItemConatiner(ev.target);
	        if (!itemContainerEle || !isActive(itemContainerEle)) {
	            void 0;
	            return;
	        }
	        var itemData = this.get(itemContainerEle);
	        if (!itemData.optsWidth) {
	            itemData.optsWidth = getOptionsWidth(itemContainerEle);
	            if (!itemData.optsWidth) {
	                void 0;
	                return;
	            }
	        }
	        var x = ev.center[this.direction];
	        var delta = x - itemData.startX;
	        var newX = Math.max(0, itemData.offsetX - delta);
	        if (newX > itemData.optsWidth) {
	            // Calculate the new X position, capped at the top of the buttons
	            newX = -Math.min(-itemData.optsWidth, -itemData.optsWidth + (((delta + itemData.optsWidth) * 0.4)));
	        }
	        if (newX > 5 && ev.srcEvent.type.indexOf('mouse') > -1 && !itemData.hasMouseOut) {
	            itemContainerEle.addEventListener('mouseout', this.onMouseOut);
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
	        if (!itemContainerEle || !isActive(itemContainerEle)) {
	            void 0;
	            return;
	        }
	        // If we are currently dragging, we want to snap back into place
	        // The final resting point X will be the width of the exposed buttons
	        var itemData = this.get(itemContainerEle);
	        var restingPoint = itemData.optsWidth;
	        // Check if the drag didn't clear the buttons mid-point
	        // and we aren't moving fast enough to swipe open
	        if (this.getOpenAmount(itemContainerEle) < (restingPoint / 2)) {
	            // If we are going left but too slow, or going right, go back to resting
	            if (ev.direction & hammer_1.DIRECTION_RIGHT || Math.abs(ev.velocityX) < 0.3) {
	                restingPoint = 0;
	            }
	        }
	        itemContainerEle.removeEventListener('mouseout', this.onMouseOut);
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
	        if (!slidingEle) {
	            void 0;
	            return;
	        }
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
	                this.on('tap', this.onTap);
	            }
	            else {
	                this.off('tap', this.onTap);
	            }
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
	    void 0;
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
/* 63 */
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
	var common_1 = __webpack_require__(25);
	var button_1 = __webpack_require__(42);
	var form_1 = __webpack_require__(13);
	var icon_1 = __webpack_require__(40);
	var label_1 = __webpack_require__(64);
	/**
	 * @name Item
	 * @description
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
	 * </ion-list>
	 *
	 *  ```
	 * @demo /docs/v2/demos/item/
	 * @see {@link /docs/v2/components#lists List Component Docs}
	 * @see {@link ../../list/List List API Docs}
	 */
	var Item = (function () {
	    function Item(form, _renderer, _elementRef) {
	        this._renderer = _renderer;
	        this._elementRef = _elementRef;
	        this._ids = -1;
	        this._inputs = [];
	        this._viewLabel = true;
	        /**
	         * @private
	         */
	        this.labelId = null;
	        this.id = form.nextId().toString();
	    }
	    /**
	     * @private
	     */
	    Item.prototype.registerInput = function (type) {
	        this._inputs.push(type);
	        return this.id + '-' + (++this._ids);
	    };
	    /**
	     * @private
	     */
	    Item.prototype.ngAfterContentInit = function () {
	        if (this._viewLabel && this._inputs.length) {
	            var labelText = this.getLabelText().trim();
	            this._viewLabel = (labelText.length > 0);
	        }
	        if (this._inputs.length > 1) {
	            this.setCssClass('item-multiple-inputs', true);
	        }
	    };
	    /**
	     * @private
	     */
	    Item.prototype.setCssClass = function (cssClass, shouldAdd) {
	        this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
	    };
	    /**
	     * @private
	     */
	    Item.prototype.getLabelText = function () {
	        return this._label ? this._label.text : '';
	    };
	    Object.defineProperty(Item.prototype, "contentLabel", {
	        /**
	         * @private
	         */
	        set: function (label) {
	            if (label) {
	                this._label = label;
	                this.labelId = label.id = ('lbl-' + this.id);
	                if (label.type) {
	                    this.setCssClass('item-label-' + label.type, true);
	                }
	                this._viewLabel = false;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Item.prototype, "viewLabel", {
	        /**
	         * @private
	         */
	        set: function (label) {
	            if (!this._label) {
	                this._label = label;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Item.prototype, "_buttons", {
	        /**
	         * @private
	         */
	        set: function (buttons) {
	            buttons.toArray().forEach(function (button) {
	                if (!button.isItem) {
	                    button.addClass('item-button');
	                }
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Item.prototype, "_icons", {
	        /**
	         * @private
	         */
	        set: function (icons) {
	            icons.toArray().forEach(function (icon) {
	                icon.addClass('item-icon');
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate([
	        core_1.ContentChild(label_1.Label), 
	        __metadata('design:type', label_1.Label), 
	        __metadata('design:paramtypes', [label_1.Label])
	    ], Item.prototype, "contentLabel", null);
	    __decorate([
	        core_1.ViewChild(label_1.Label), 
	        __metadata('design:type', label_1.Label), 
	        __metadata('design:paramtypes', [label_1.Label])
	    ], Item.prototype, "viewLabel", null);
	    __decorate([
	        core_1.ContentChildren(button_1.Button), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], Item.prototype, "_buttons", null);
	    __decorate([
	        core_1.ContentChildren(icon_1.Icon), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], Item.prototype, "_icons", null);
	    Item = __decorate([
	        core_1.Component({
	            selector: 'ion-item,[ion-item]',
	            template: '<ng-content select="[item-left],ion-checkbox"></ng-content>' +
	                '<div class="item-inner">' +
	                '<ng-content select="ion-label"></ng-content>' +
	                '<ion-label *ngIf="_viewLabel">' +
	                '<ng-content></ng-content>' +
	                '</ion-label>' +
	                '<ng-content select="[item-right],ion-radio,ion-toggle,ion-select,ion-input,ion-textarea"></ng-content>' +
	                '</div>' +
	                '<ion-button-effect></ion-button-effect>',
	            host: {
	                'class': 'item'
	            },
	            directives: [common_1.NgIf, label_1.Label]
	        }), 
	        __metadata('design:paramtypes', [form_1.Form, core_1.Renderer, core_1.ElementRef])
	    ], Item);
	    return Item;
	})();
	exports.Item = Item;


/***/ },
/* 64 */
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
	/**
	 * @name Label
	 * @description
	 * Labels describe the data that the user should enter in to an input
	 * element. You can give `ion-label` attributes to tell it how to
	 * handle its display type, which is especially useful for an
	 * `ion-item` which contains a text input.
	 *
	 * @property [fixed] - a persistant label that sits next the the input
	 * @property [floating] - a label that will float about the input if the input is empty of looses focus
	 * @property [stacked] - A stacked label will always appear on top of the input

	 *
	 * @usage
	 * ```html
	 *  <ion-item>
	 *    <ion-label>Username</ion-label>
	 *    <ion-input></ion-input>
	 *  </ion-item>
	 *
	 *  <ion-item>
	 *    <ion-labe fixed>Website</ion-label>
	 *    <ion-input type="url"></ion-input>
	 *  </ion-item>
	 *
	 *  <ion-item>
	 *    <ion-label floating>Email</ion-label>
	 *    <ion-input type="email"></ion-input>
	 *  </ion-item>
	 *
	 *  <ion-item>
	 *    <ion-label stacked>Phone</ion-label>
	 *    <ion-input type="tel"></ion-input>
	 *  </ion-item>
	 *
	 * ```
	 *
	 * @demo /docs/v2/demos/label/
	 * @see {@link ../../../../components#inputs Input Component Docs}
	 * @see {@link ../Input Input API Docs}
	 *
	 */
	var Label = (function () {
	    function Label(_elementRef, _renderer, isFloating, isStacked, isFixed, isInset) {
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        this.type = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
	    }
	    Object.defineProperty(Label.prototype, "id", {
	        /**
	         * @private
	         */
	        get: function () {
	            return this._id;
	        },
	        set: function (val) {
	            this._id = val;
	            if (val) {
	                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'id', val);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Label.prototype, "text", {
	        /**
	         * @private
	         */
	        get: function () {
	            return this._elementRef.nativeElement.textContent || '';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     * @param {string} add class name
	     */
	    Label.prototype.addClass = function (className) {
	        this._renderer.setElementClass(this._elementRef.nativeElement, className, true);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Label.prototype, "id", null);
	    Label = __decorate([
	        core_1.Directive({
	            selector: 'ion-label'
	        }),
	        __param(2, core_1.Attribute('floating')),
	        __param(3, core_1.Attribute('stacked')),
	        __param(4, core_1.Attribute('fixed')),
	        __param(5, core_1.Attribute('inset')), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, String, String, String, String])
	    ], Label);
	    return Label;
	})();
	exports.Label = Label;


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
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(3);
	var list_1 = __webpack_require__(60);
	/**
	 * @name ItemSliding
	 *
	 * @description
	 * Creates a list-item that can easily be swiped, deleted, reordered, edited, and more.
	 *
	 * @usage
	 * ```html
	 * <ion-list>
	 *   <ion-item-sliding *ngFor="#item of items">
	 *     <button ion-item (click)="itemTapped(item)">
	 *       {{item.title}}
	 *     </button>
	 *     <ion-item-options>
	 *       <button (click)="favorite(item)">Favorite</button>
	 *       <button (click)="share(item)">Share</button>
	 *     </ion-item-options>
	 *   </ion-item-sliding>
	 * </ion-list>
	 * ```
	 * @demo /docs/v2/demos/item-sliding/
	 * @see {@link /docs/v2/components#lists List Component Docs}
	 * @see {@link ../../list/List List API Docs}
	 */
	var ItemSliding = (function () {
	    function ItemSliding(_list, elementRef) {
	        this._list = _list;
	        _list.enableSlidingItems(true);
	        elementRef.nativeElement.$ionSlide = ++slideIds;
	    }
	    /**
	     * @private
	     */
	    ItemSliding.prototype.close = function () {
	        this._list.closeSlidingItems();
	    };
	    ItemSliding = __decorate([
	        core_1.Component({
	            selector: 'ion-item-sliding',
	            template: '<ng-content select="ion-item,[ion-item]"></ng-content>' +
	                '<ng-content select="ion-item-options"></ng-content>'
	        }),
	        __param(0, core_1.Optional()), 
	        __metadata('design:paramtypes', [list_1.List, core_1.ElementRef])
	    ], ItemSliding);
	    return ItemSliding;
	})();
	exports.ItemSliding = ItemSliding;
	var slideIds = 0;


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
	var common_1 = __webpack_require__(25);
	var form_1 = __webpack_require__(13);
	var item_1 = __webpack_require__(63);
	var util_1 = __webpack_require__(9);
	var CHECKBOX_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return Checkbox; }), multi: true });
	/**
	 * The checkbox is no different than the HTML checkbox input, except
	 * it's styled accordingly to the the platform and design mode, such
	 * as iOS or Material Design.
	 *
	 * See the [Angular 2 Docs](https://angular.io/docs/ts/latest/guide/forms.html)
	 * for more info on forms and inputs.
	 *
	 *
	 * @usage
	 * ```html
	 *
	 *  <ion-list>
	 *
	 *    <ion-item>
	 *      <ion-label>Pepperoni</ion-label>
	 *      <ion-checkbox [(ngModel)]="pepperoni"></ion-checkbox>
	 *    </ion-item>
	 *
	 *    <ion-item>
	 *      <ion-label>Sausage</ion-label>
	 *      <ion-checkbox [(ngModel)]="sausage" disabled="true"></ion-checkbox>
	 *    </ion-item>
	 *
	 *    <ion-item>
	 *      <ion-label>Mushrooms</ion-label>
	 *      <ion-checkbox [(ngModel)]="mushrooms"></ion-checkbox>
	 *    </ion-item>
	 *
	 *  </ion-list>
	 * ```
	 * @demo /docs/v2/demos/checkbox/
	 * @see {@link /docs/v2/components#checkbox Checkbox Component Docs}
	 */
	var Checkbox = (function () {
	    function Checkbox(_form, _item) {
	        this._form = _form;
	        this._item = _item;
	        this._checked = false;
	        this._disabled = false;
	        _form.register(this);
	        if (_item) {
	            this.id = 'chk-' + _item.registerInput('checkbox');
	            this._labelId = 'lbl-' + _item.id;
	            this._item.setCssClass('item-checkbox', true);
	        }
	    }
	    /**
	     * @private
	     */
	    Checkbox.prototype._click = function (ev) {
	        void 0;
	        ev.preventDefault();
	        ev.stopPropagation();
	        this.onChange(!this._checked);
	    };
	    Object.defineProperty(Checkbox.prototype, "checked", {
	        /**
	         * @input {boolean} whether or not the checkbox is checked (defaults to false)
	         */
	        get: function () {
	            return this._checked;
	        },
	        set: function (val) {
	            this._setChecked(util_1.isTrueProperty(val));
	            this.onChange(this._checked);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    Checkbox.prototype._setChecked = function (isChecked) {
	        this._checked = isChecked;
	        this._item && this._item.setCssClass('item-checkbox-checked', isChecked);
	    };
	    /**
	     * @private
	     */
	    Checkbox.prototype.writeValue = function (val) {
	        this._setChecked(util_1.isTrueProperty(val));
	    };
	    /**
	     * @private
	     */
	    Checkbox.prototype.registerOnChange = function (fn) {
	        var _this = this;
	        this._fn = fn;
	        this.onChange = function (isChecked) {
	            void 0;
	            fn(isChecked);
	            _this._setChecked(isChecked);
	            _this.onTouched();
	        };
	    };
	    /**
	     * @private
	     */
	    Checkbox.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    Object.defineProperty(Checkbox.prototype, "disabled", {
	        /**
	         * @input {boolean} whether or not the checkbox is disabled or not.
	         */
	        get: function () {
	            return this._disabled;
	        },
	        set: function (val) {
	            this._disabled = util_1.isTrueProperty(val);
	            this._item && this._item.setCssClass('item-checkbox-disabled', this._disabled);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    Checkbox.prototype.onChange = function (_) { };
	    /**
	     * @private
	     */
	    Checkbox.prototype.onTouched = function () { };
	    /**
	     * @private
	     */
	    Checkbox.prototype.ngOnDestroy = function () {
	        this._form.deregister(this);
	    };
	    __decorate([
	        core_1.HostListener('click', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Checkbox.prototype, "_click", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Checkbox.prototype, "checked", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Checkbox.prototype, "disabled", null);
	    Checkbox = __decorate([
	        core_1.Component({
	            selector: 'ion-checkbox',
	            template: '<div class="checkbox-icon" [class.checkbox-checked]="_checked">' +
	                '<div class="checkbox-inner"></div>' +
	                '</div>' +
	                '<button role="checkbox" ' +
	                '[id]="id" ' +
	                '[attr.aria-checked]="_checked" ' +
	                '[attr.aria-labelledby]="_labelId" ' +
	                '[attr.aria-disabled]="_disabled" ' +
	                'class="item-cover">' +
	                '</button>',
	            host: {
	                '[class.checkbox-disabled]': '_disabled'
	            },
	            providers: [CHECKBOX_VALUE_ACCESSOR]
	        }),
	        __param(1, core_1.Optional()), 
	        __metadata('design:paramtypes', [form_1.Form, item_1.Item])
	    ], Checkbox);
	    return Checkbox;
	})();
	exports.Checkbox = Checkbox;


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
	var common_1 = __webpack_require__(25);
	var alert_1 = __webpack_require__(68);
	var form_1 = __webpack_require__(13);
	var item_1 = __webpack_require__(63);
	var util_1 = __webpack_require__(9);
	var nav_controller_1 = __webpack_require__(43);
	var option_1 = __webpack_require__(69);
	var SELECT_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return Select; }), multi: true });
	/**
	 * @name Select
	 * @description
	 * The `ion-select` component is similar to an HTML `<select>` element, however,
	 * Ionic's select component makes it easier for users to sort through and select
	 * the preferred option or options. When users tap the select component, a
	 * dialog will appear with all of the options in a large, easy to select list
	 * for users.
	 *
	 * Under-the-hood the `ion-select` actually uses the
	 * {@link ../../alert/Alert Alert API} to open up the overlay of options
	 * which the user is presented with. Select can take numerous child
	 * `ion-option` components. If `ion-option` is not given a `value` attribute
	 * then it will use its text as the value.
	 *
	 * ### Single Value: Radio Buttons
	 *
	 * The standard `ion-select` component allows the user to select only one
	 * option. When selecting only one option the alert overlay presents users with
	 * a radio button styled list of options. The `ion-select` component's value
	 * receives the value of the selected option's value.
	 *
	 * ```html
	 * <ion-item>
	 *   <ion-label>Gender</ion-label>
	 *   <ion-select [(ngModel)]="gender">
	 *     <ion-option value="f" checked="true">Female</ion-option>
	 *     <ion-option value="m">Male</ion-option>
	 *   </ion-select>
	 * </ion-item>
	 * ```
	 *
	 * ### Multiple Value: Checkboxes
	 *
	 * By adding the `multiple="true"` attribute to `ion-select`, users are able
	 * to select multiple options. When multiple options can be selected, the alert
	 * overlay presents users with a checkbox styled list of options. The
	 * `ion-select multiple="true"` component's value receives an array of all the
	 * selected option values. In the example below, because each option is not given
	 * a `value`, then it'll use its text as the value instead.
	 *
	 * ```html
	 * <ion-item>
	 *   <ion-label>Toppings</ion-label>
	 *   <ion-select [(ngModel)]="toppings" multiple="true">
	 *     <ion-option>Bacon</ion-option>
	 *     <ion-option>Black Olives</ion-option>
	 *     <ion-option>Extra Cheese</ion-option>
	 *     <ion-option>Mushrooms</ion-option>
	 *     <ion-option>Pepperoni</ion-option>
	 *     <ion-option>Sausage</ion-option>
	 *   </ion-select>
	 * <ion-item>
	 * ```
	 *
	 * ### Alert Buttons
	 * By default, the two buttons read `Cancel` and `OK`. The each button's text
	 * can be customized using the `cancelText` and `okText` attributes:
	 *
	 * ```html
	 * <ion-select okText="Okay" cancelText="Dismiss">
	 *   ...
	 * </ion-select>
	 * ```
	 *
	 * ### Alert Options
	 *
	 * Remember how `ion-select` is really just a wrapper to `Alert`? By using
	 * the `alertOptions` property you can pass custom options to the alert
	 * overlay. This would be useful if there is a custom alert title,
	 * subtitle or message. {@link ../../alert/Alert Alert API}
	 *
	 * ```html
	 * <ion-select [alertOptions]="alertOptions">
	 *   ...
	 * </ion-select>
	 * ```
	 *
	 * ```ts
	 * this.alertOptions = {
	 *   title: 'Pizza Toppings',
	 *   subTitle: 'Select your toppings'
	 * };
	 * ```
	 *
	 * @demo /docs/v2/demos/select/
	 */
	var Select = (function () {
	    function Select(_form, _elementRef, _renderer, _item, _nav) {
	        this._form = _form;
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        this._item = _item;
	        this._nav = _nav;
	        this._disabled = false;
	        this._multi = false;
	        this._values = [];
	        this._texts = [];
	        this._text = '';
	        /**
	         * @private
	         * @input {string}  The text of the cancel button. Defatuls to `Cancel`
	         */
	        this.cancelText = 'Cancel';
	        /**
	         * @private
	         * @input {string} The text of the ok button. Defatuls to `OK`
	         */
	        this.okText = 'OK';
	        /**
	         * @private
	         * @input {any} Any addition options that an alert can take. Title, Subtitle, etc.
	         */
	        this.alertOptions = {};
	        /**
	         * @private
	         */
	        this.checked = false;
	        /**
	         * @output {any} Any expression you want to evaluate when the selection has changed
	         */
	        this.change = new core_1.EventEmitter();
	        /**
	         * @output {any} Any expression you want to evaluate when the selection was cancelled
	         */
	        this.cancel = new core_1.EventEmitter();
	        this._form.register(this);
	        if (_item) {
	            this.id = 'sel-' + _item.registerInput('select');
	            this._labelId = 'lbl-' + _item.id;
	            this._item.setCssClass('item-select', true);
	        }
	        if (!_nav) {
	            void 0;
	        }
	    }
	    /**
	     * @private
	     */
	    Select.prototype._click = function (ev) {
	        var _this = this;
	        ev.preventDefault();
	        ev.stopPropagation();
	        if (this._disabled)
	            return;
	        void 0;
	        // the user may have assigned some options specifically for the alert
	        var alertOptions = util_1.merge({}, this.alertOptions);
	        // make sure their buttons array is removed from the options
	        // and we create a new array for the alert's two buttons
	        alertOptions.buttons = [{
	                text: this.cancelText,
	                handler: function () {
	                    _this.cancel.emit(null);
	                }
	            }];
	        // if the alertOptions didn't provide an title then use the label's text
	        if (!alertOptions.title && this._item) {
	            alertOptions.title = this._item.getLabelText();
	        }
	        // user cannot provide inputs from alertOptions
	        // alert inputs must be created by ionic from ion-options
	        alertOptions.inputs = this._options.toArray().map(function (input) {
	            return {
	                type: (_this._multi ? 'checkbox' : 'radio'),
	                label: input.text,
	                value: input.value,
	                checked: input.checked
	            };
	        });
	        // create the alert instance from our built up alertOptions
	        var alert = alert_1.Alert.create(alertOptions);
	        if (this._multi) {
	            // use checkboxes
	            alert.setCssClass('select-alert multiple-select-alert');
	        }
	        else {
	            // use radio buttons
	            alert.setCssClass('select-alert single-select-alert');
	        }
	        alert.addButton({
	            text: this.okText,
	            handler: function (selectedValues) {
	                _this.onChange(selectedValues);
	                _this.change.emit(selectedValues);
	            }
	        });
	        this._nav.present(alert, alertOptions);
	    };
	    Object.defineProperty(Select.prototype, "multiple", {
	        /**
	         * @input {boolean} Whether or not the select component can accept multipl selections
	         */
	        get: function () {
	            return this._multi;
	        },
	        set: function (val) {
	            this._multi = util_1.isTrueProperty(val);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Select.prototype, "text", {
	        /**
	         * @private
	         */
	        get: function () {
	            return (this._multi ? this._texts : this._texts.join());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Select.prototype, "options", {
	        /**
	         * @private
	         */
	        set: function (val) {
	            this._options = val;
	            if (!this._values.length) {
	                // there are no values set at this point
	                // so check to see who should be checked
	                this._values = val.toArray().filter(function (o) { return o.checked; }).map(function (o) { return o.value; });
	            }
	            this._updOpts();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    Select.prototype._updOpts = function () {
	        var _this = this;
	        this._texts = [];
	        if (this._options) {
	            this._options.toArray().forEach(function (option) {
	                // check this option if the option's value is in the values array
	                option.checked = (_this._values.indexOf(option.value) > -1);
	                if (option.checked) {
	                    _this._texts.push(option.text);
	                }
	            });
	        }
	        this._text = this._texts.join(', ');
	    };
	    Object.defineProperty(Select.prototype, "disabled", {
	        /**
	         * @input {boolean} Whether or not the select component is disabled or not
	         */
	        get: function () {
	            return this._disabled;
	        },
	        set: function (val) {
	            this._disabled = util_1.isTrueProperty(val);
	            this._item && this._item.setCssClass('item-select-disabled', this._disabled);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    Select.prototype.writeValue = function (val) {
	        void 0;
	        this._values = (Array.isArray(val) ? val : util_1.isBlank(val) ? [] : [val]);
	        this._updOpts();
	    };
	    /**
	     * @private
	     */
	    Select.prototype.ngAfterContentInit = function () {
	        this._updOpts();
	    };
	    /**
	     * @private
	     */
	    Select.prototype.registerOnChange = function (fn) {
	        var _this = this;
	        this._fn = fn;
	        this.onChange = function (val) {
	            void 0;
	            fn(val);
	            _this._values = (Array.isArray(val) ? val : util_1.isBlank(val) ? [] : [val]);
	            _this._updOpts();
	            _this.onTouched();
	        };
	    };
	    /**
	     * @private
	     */
	    Select.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    /**
	     * @private
	     */
	    Select.prototype.onChange = function (_) { };
	    /**
	     * @private
	     */
	    Select.prototype.onTouched = function () { };
	    /**
	     * @private
	     */
	    Select.prototype.ngOnDestroy = function () {
	        this._form.deregister(this);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Select.prototype, "cancelText", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Select.prototype, "okText", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Select.prototype, "alertOptions", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Select.prototype, "checked", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Select.prototype, "change", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Select.prototype, "cancel", void 0);
	    __decorate([
	        core_1.HostListener('click', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Select.prototype, "_click", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Select.prototype, "multiple", null);
	    __decorate([
	        core_1.ContentChildren(option_1.Option), 
	        __metadata('design:type', core_1.QueryList), 
	        __metadata('design:paramtypes', [core_1.QueryList])
	    ], Select.prototype, "options", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Select.prototype, "disabled", null);
	    Select = __decorate([
	        core_1.Component({
	            selector: 'ion-select',
	            template: '<div class="select-text">{{_text}}</div>' +
	                '<div class="select-icon">' +
	                '<div class="select-icon-inner"></div>' +
	                '</div>' +
	                '<button aria-haspopup="true" ' +
	                '[id]="id" ' +
	                '[attr.aria-labelledby]="_labelId" ' +
	                '[attr.aria-disabled]="_disabled" ' +
	                'class="item-cover">' +
	                '</button>',
	            host: {
	                '[class.select-disabled]': '_disabled'
	            },
	            providers: [SELECT_VALUE_ACCESSOR]
	        }),
	        __param(3, core_1.Optional()),
	        __param(4, core_1.Optional()), 
	        __metadata('design:paramtypes', [form_1.Form, core_1.ElementRef, core_1.Renderer, item_1.Item, nav_controller_1.NavController])
	    ], Select);
	    return Select;
	})();
	exports.Select = Select;


/***/ },
/* 68 */
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
	var common_1 = __webpack_require__(25);
	var animation_1 = __webpack_require__(47);
	var transition_1 = __webpack_require__(46);
	var config_1 = __webpack_require__(7);
	var util_1 = __webpack_require__(9);
	var nav_params_1 = __webpack_require__(38);
	var view_controller_1 = __webpack_require__(37);
	/**
	 * @name Alert
	 * @description
	 * An Alert is a dialog that presents users with either information, or used
	 * to receive information from the user using inputs. An alert appears on top
	 * of the app's content, and must be manually dismissed by the user before
	 * they can resume interaction with the app.
	 *
	 * An alert is created from an array of `buttons` and optionally an array of
	 * `inputs`. Each button includes properties for its `text`, and optionally a
	 * `handler`. If a handler returns `false` then the alert will not be dismissed.
	 * An alert can also optionally have a `title`, `subTitle` and `message`.
	 *
	 * All buttons will show up in the order they have been added to the `buttons`
	 * array, from left to right. Note: The right most button (the last one in the
	 * array) is the main button.
	 *
	 * Optionally, a `role` property can be added to a button, such as `cancel`.
	 * If a `cancel` role is on one of the buttons, then if the alert is dismissed
	 * by tapping the backdrop, then it will fire the handler from the button
	 * with a cancel role.
	 *
	 * Alerts can also include inputs whos data can be passed back to the app.
	 * Inputs can be used to prompt users for information.
	 *
	 * Its shorthand is to add all the alert's options from within the
	 * `Alert.create(opts)` first argument. Otherwise the alert's instance
	 * has methods to add options, such as `setTitle()` or `addButton()`.
	 *
	 * @usage
	 * ```ts
	 * constructor(nav: NavController) {
	 *   this.nav = nav;
	 * }
	 *
	 * presentAlert() {
	 *   let alert = Alert.create({
	 *     title: 'Low battery',
	 *     subTitle: '10% of battery remaining',
	 *     buttons: ['Dismiss']
	 *   });
	 *   this.nav.present(alert);
	 * }
	 *
	 * presentConfirm() {
	 *   let alert = Alert.create({
	 *     title: 'Confirm purchase',
	 *     message: 'Do you want to buy this book?',
	 *     buttons: [
	 *       {
	 *         text: 'Cancel',
	 *         role: 'cancel',
	 *         handler: () => {
	 *           console.log('Cancel clicked');
	 *         }
	 *       },
	 *       {
	 *         text: 'Buy',
	 *         handler: () => {
	 *           console.log('Buy clicked');
	 *         }
	 *       }
	 *     ]
	 *   });
	 *   this.nav.present(alert);
	 * }
	 *
	 * presentPrompt() {
	 *   let alert = Alert.create({
	 *     title: 'Login',
	 *     inputs: [
	 *       {
	 *         name: 'username',
	 *         placeholder: 'Username'
	 *       },
	 *       {
	 *         name: 'password',
	 *         placeholder: 'Password',
	 *         type: 'password'
	 *       }
	 *     ],
	 *     buttons: [
	 *       {
	 *         text: 'Cancel',
	 *         role: 'cancel',
	 *         handler: data => {
	 *           console.log('Cancel clicked');
	 *         }
	 *       },
	 *       {
	 *         text: 'Login',
	 *         handler: data => {
	 *           if (User.isValid(data.username, data.password)) {
	 *             // logged in!
	 *           } else {
	 *             // invalid login
	 *             return false;
	 *           }
	 *         }
	 *       }
	 *     ]
	 *   });
	 *   this.nav.present(alert);
	 * }
	 * ```
	 *
	 * @demo /docs/v2/demos/alert/
	 */
	var Alert = (function (_super) {
	    __extends(Alert, _super);
	    function Alert(opts) {
	        if (opts === void 0) { opts = {}; }
	        opts.inputs = opts.inputs || [];
	        opts.buttons = opts.buttons || [];
	        opts.enableBackdropDismiss = util_1.isDefined(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
	        _super.call(this, AlertCmp, opts);
	        this.viewType = 'alert';
	    }
	    /**
	    * @private
	    */
	    Alert.prototype.getTransitionName = function (direction) {
	        var key = (direction === 'back' ? 'alertLeave' : 'alertEnter');
	        return this._nav && this._nav.config.get(key);
	    };
	    /**
	     * @param {string} title Alert title
	     */
	    Alert.prototype.setTitle = function (title) {
	        this.data.title = title;
	    };
	    /**
	     * @param {string} subTitle Alert subtitle
	     */
	    Alert.prototype.setSubTitle = function (subTitle) {
	        this.data.subTitle = subTitle;
	    };
	    /**
	     * @private
	     */
	    Alert.prototype.setBody = function (message) {
	        // deprecated warning
	        void 0;
	        this.setMessage(message);
	    };
	    /**
	     * @param {string} message  Alert message content
	     */
	    Alert.prototype.setMessage = function (message) {
	        this.data.message = message;
	    };
	    /**
	     * @param {object} input Alert input
	     */
	    Alert.prototype.addInput = function (input) {
	        this.data.inputs.push(input);
	    };
	    /**
	     * @param {any} button Alert button
	     */
	    Alert.prototype.addButton = function (button) {
	        this.data.buttons.push(button);
	    };
	    /**
	     * @param {string} cssClass CSS class name to add to the alert's outer wrapper
	     */
	    Alert.prototype.setCssClass = function (cssClass) {
	        this.data.cssClass = cssClass;
	    };
	    /**
	     * @param {object} opts Alert options
	     */
	    Alert.create = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        return new Alert(opts);
	    };
	    return Alert;
	})(view_controller_1.ViewController);
	exports.Alert = Alert;
	/**
	 * @private
	 */
	var AlertCmp = (function () {
	    function AlertCmp(_viewCtrl, _elementRef, _config, params, renderer) {
	        this._viewCtrl = _viewCtrl;
	        this._elementRef = _elementRef;
	        this._config = _config;
	        this.d = params.data;
	        if (this.d.cssClass) {
	            this.d.cssClass.split(' ').forEach(function (cssClass) {
	                renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
	            });
	        }
	        this.id = (++alertIds);
	        this.descId = '';
	        this.hdrId = 'alert-hdr-' + this.id;
	        this.subHdrId = 'alert-subhdr-' + this.id;
	        this.msgId = 'alert-msg-' + this.id;
	        this.activeId = '';
	        if (this.d.message) {
	            this.descId = this.msgId;
	        }
	        else if (this.d.subTitle) {
	            this.descId = this.subHdrId;
	        }
	        if (!this.d.message) {
	            this.d.message = '';
	        }
	    }
	    AlertCmp.prototype.onPageLoaded = function () {
	        var _this = this;
	        // normalize the data
	        var data = this.d;
	        if (data.body) {
	            // deprecated warning
	            void 0;
	            data.message = data.body;
	        }
	        data.buttons = data.buttons.map(function (button) {
	            if (typeof button === 'string') {
	                return { text: button };
	            }
	            return button;
	        });
	        data.inputs = data.inputs.map(function (input, index) {
	            return {
	                type: input.type || 'text',
	                name: util_1.isDefined(input.name) ? input.name : index,
	                placeholder: util_1.isDefined(input.placeholder) ? input.placeholder : '',
	                value: util_1.isDefined(input.value) ? input.value : '',
	                label: input.label,
	                checked: !!input.checked,
	                id: 'alert-input-' + _this.id + '-' + index
	            };
	        });
	        this.inputType = (data.inputs.length ? data.inputs[0].type : null);
	        var checkedInput = this.d.inputs.find(function (input) { return input.checked; });
	        if (checkedInput) {
	            this.activeId = checkedInput.id;
	        }
	        var self = this;
	        self.keyUp = function (ev) {
	            if (ev.keyCode === 13) {
	                void 0;
	                var button = self.d.buttons[self.d.buttons.length - 1];
	                self.btnClick(button);
	            }
	            else if (ev.keyCode === 27) {
	                void 0;
	                self.bdClick();
	            }
	        };
	        document.addEventListener('keyup', this.keyUp);
	    };
	    AlertCmp.prototype.onPageDidEnter = function () {
	        var activeElement = document.activeElement;
	        if (activeElement) {
	            activeElement.blur();
	        }
	        if (this.d.inputs.length) {
	            var firstInput = this._elementRef.nativeElement.querySelector('input');
	            if (firstInput) {
	                firstInput.focus();
	            }
	        }
	    };
	    AlertCmp.prototype.btnClick = function (button, dismissDelay) {
	        var _this = this;
	        var shouldDismiss = true;
	        if (button.handler) {
	            // a handler has been provided, execute it
	            // pass the handler the values from the inputs
	            if (button.handler(this.getValues()) === false) {
	                // if the return value of the handler is false then do not dismiss
	                shouldDismiss = false;
	            }
	        }
	        if (shouldDismiss) {
	            setTimeout(function () {
	                _this.dismiss(button.role);
	            }, dismissDelay || this._config.get('pageTransitionDelay'));
	        }
	    };
	    AlertCmp.prototype.rbClick = function (checkedInput) {
	        this.d.inputs.forEach(function (input) {
	            input.checked = (checkedInput === input);
	        });
	        this.activeId = checkedInput.id;
	    };
	    AlertCmp.prototype.cbClick = function (checkedInput) {
	        checkedInput.checked = !checkedInput.checked;
	    };
	    AlertCmp.prototype.bdClick = function () {
	        if (this.d.enableBackdropDismiss) {
	            var cancelBtn = this.d.buttons.find(function (b) { return b.role === 'cancel'; });
	            if (cancelBtn) {
	                this.btnClick(cancelBtn, 1);
	            }
	            else {
	                this.dismiss('backdrop');
	            }
	        }
	    };
	    AlertCmp.prototype.dismiss = function (role) {
	        return this._viewCtrl.dismiss(this.getValues(), role);
	    };
	    AlertCmp.prototype.getValues = function () {
	        if (this.inputType === 'radio') {
	            // this is an alert with radio buttons (single value select)
	            // return the one value which is checked, otherwise undefined
	            var checkedInput = this.d.inputs.find(function (i) { return i.checked; });
	            return checkedInput ? checkedInput.value : undefined;
	        }
	        if (this.inputType === 'checkbox') {
	            // this is an alert with checkboxes (multiple value select)
	            // return an array of all the checked values
	            return this.d.inputs.filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
	        }
	        // this is an alert with text inputs
	        // return an object of all the values with the input name as the key
	        var values = {};
	        this.d.inputs.forEach(function (i) {
	            values[i.name] = i.value;
	        });
	        return values;
	    };
	    AlertCmp.prototype.onPageWillLeave = function () {
	        document.removeEventListener('keyup', this.keyUp);
	    };
	    AlertCmp.prototype.ngOnDestroy = function () {
	        document.removeEventListener('keyup', this.keyUp);
	    };
	    AlertCmp = __decorate([
	        core_1.Component({
	            selector: 'ion-alert',
	            template: '<div (click)="bdClick()" tappable disable-activated class="backdrop" role="presentation"></div>' +
	                '<div class="alert-wrapper">' +
	                '<div class="alert-head">' +
	                '<h2 id="{{hdrId}}" class="alert-title" *ngIf="d.title" [innerHTML]="d.title"></h2>' +
	                '<h3 id="{{subHdrId}}" class="alert-sub-title" *ngIf="d.subTitle" [innerHTML]="d.subTitle"></h3>' +
	                '</div>' +
	                '<div id="{{msgId}}" class="alert-message" [innerHTML]="d.message"></div>' +
	                '<div *ngIf="d.inputs.length" [ngSwitch]="inputType">' +
	                '<template ngSwitchWhen="radio">' +
	                '<div class="alert-radio-group" role="radiogroup" [attr.aria-labelledby]="hdrId" [attr.aria-activedescendant]="activeId">' +
	                '<div *ngFor="#i of d.inputs" (click)="rbClick(i)" [attr.aria-checked]="i.checked" [attr.id]="i.id" class="alert-tappable alert-radio" tappable role="radio">' +
	                '<div class="alert-radio-icon"></div>' +
	                '<div class="alert-radio-label">' +
	                '{{i.label}}' +
	                '</div>' +
	                '</div>' +
	                '</div>' +
	                '</template>' +
	                '<template ngSwitchWhen="checkbox">' +
	                '<div class="alert-checkbox-group">' +
	                '<div *ngFor="#i of d.inputs" (click)="cbClick(i)" [attr.aria-checked]="i.checked" class="alert-tappable alert-checkbox" tappable role="checkbox">' +
	                '<div class="alert-checkbox-icon"><div class="alert-checkbox-inner"></div></div>' +
	                '<div class="alert-checkbox-label">' +
	                '{{i.label}}' +
	                '</div>' +
	                '</div>' +
	                '</div>' +
	                '</template>' +
	                '<template ngSwitchDefault>' +
	                '<div class="alert-input-group">' +
	                '<div *ngFor="#i of d.inputs" class="alert-input-wrapper">' +
	                '<input [placeholder]="i.placeholder" [(ngModel)]="i.value" [type]="i.type" class="alert-input">' +
	                '</div>' +
	                '</div>' +
	                '</template>' +
	                '</div>' +
	                '<div class="alert-button-group" [ngClass]="{vertical: d.buttons.length>2}">' +
	                '<button *ngFor="#b of d.buttons" (click)="btnClick(b)" [ngClass]="b.cssClass" class="alert-button">' +
	                '{{b.text}}' +
	                '<ion-button-effect></ion-button-effect>' +
	                '</button>' +
	                '</div>' +
	                '</div>',
	            host: {
	                'role': 'dialog',
	                '[attr.aria-labelledby]': 'hdrId',
	                '[attr.aria-describedby]': 'descId'
	            },
	            directives: [common_1.NgClass, common_1.NgSwitch, common_1.NgIf, common_1.NgFor]
	        }), 
	        __metadata('design:paramtypes', [view_controller_1.ViewController, core_1.ElementRef, config_1.Config, nav_params_1.NavParams, core_1.Renderer])
	    ], AlertCmp);
	    return AlertCmp;
	})();
	/**
	 * Animations for alerts
	 */
	var AlertPopIn = (function (_super) {
	    __extends(AlertPopIn, _super);
	    function AlertPopIn(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        var ele = enteringView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
	        wrapper.fromTo('opacity', '0.01', '1').fromTo('scale', '1.1', '1');
	        backdrop.fromTo('opacity', '0.01', '0.3');
	        this
	            .easing('ease-in-out')
	            .duration(200)
	            .add(backdrop)
	            .add(wrapper);
	    }
	    return AlertPopIn;
	})(transition_1.Transition);
	transition_1.Transition.register('alert-pop-in', AlertPopIn);
	var AlertPopOut = (function (_super) {
	    __extends(AlertPopOut, _super);
	    function AlertPopOut(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        var ele = leavingView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
	        wrapper.fromTo('opacity', '1', '0').fromTo('scale', '1', '0.9');
	        backdrop.fromTo('opacity', '0.3', '0');
	        this
	            .easing('ease-in-out')
	            .duration(200)
	            .add(backdrop)
	            .add(wrapper);
	    }
	    return AlertPopOut;
	})(transition_1.Transition);
	transition_1.Transition.register('alert-pop-out', AlertPopOut);
	var AlertMdPopIn = (function (_super) {
	    __extends(AlertMdPopIn, _super);
	    function AlertMdPopIn(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        var ele = enteringView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
	        wrapper.fromTo('opacity', '0.01', '1').fromTo('scale', '1.1', '1');
	        backdrop.fromTo('opacity', '0.01', '0.5');
	        this
	            .easing('ease-in-out')
	            .duration(200)
	            .add(backdrop)
	            .add(wrapper);
	    }
	    return AlertMdPopIn;
	})(transition_1.Transition);
	transition_1.Transition.register('alert-md-pop-in', AlertMdPopIn);
	var AlertMdPopOut = (function (_super) {
	    __extends(AlertMdPopOut, _super);
	    function AlertMdPopOut(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        var ele = leavingView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
	        wrapper.fromTo('opacity', '1', '0').fromTo('scale', '1', '0.9');
	        backdrop.fromTo('opacity', '0.5', '0');
	        this
	            .easing('ease-in-out')
	            .duration(200)
	            .add(backdrop)
	            .add(wrapper);
	    }
	    return AlertMdPopOut;
	})(transition_1.Transition);
	transition_1.Transition.register('alert-md-pop-out', AlertMdPopOut);
	var alertIds = -1;


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
	var core_1 = __webpack_require__(3);
	var util_1 = __webpack_require__(9);
	/**
	 * @name Option
	 * @description
	 * `ion-option` is a child component of `ion-select`. Similar to the native option element, `ion-option` can take a value and a checked property.
	 *
	 * @demo /docs/v2/demos/item-sliding/
	 */
	var Option = (function () {
	    function Option(_elementRef) {
	        this._elementRef = _elementRef;
	        this._checked = false;
	        /**
	         * @input {any} Event to evaluate when option has changed
	         */
	        this.select = new core_1.EventEmitter();
	    }
	    Object.defineProperty(Option.prototype, "checked", {
	        /**
	         * @input {boolean} Whether or not the option is already checked and selected
	         */
	        get: function () {
	            return this._checked;
	        },
	        set: function (val) {
	            this._checked = util_1.isTrueProperty(val);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Option.prototype, "value", {
	        /**
	         * @input {any} The value of the option
	         */
	        get: function () {
	            if (util_1.isDefined(this._value)) {
	                return this._value;
	            }
	            return this.text;
	        },
	        set: function (val) {
	            this._value = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Option.prototype, "text", {
	        /**
	         * @private
	         */
	        get: function () {
	            return this._elementRef.nativeElement.textContent;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Option.prototype, "select", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Option.prototype, "checked", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Option.prototype, "value", null);
	    Option = __decorate([
	        core_1.Directive({
	            selector: 'ion-option'
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], Option);
	    return Option;
	})();
	exports.Option = Option;


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
	var common_1 = __webpack_require__(25);
	var form_1 = __webpack_require__(13);
	var util_1 = __webpack_require__(9);
	var item_1 = __webpack_require__(63);
	var dom_1 = __webpack_require__(10);
	var TOGGLE_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return Toggle; }), multi: true });
	/**
	 * @name Toggle
	 * @description
	 * A toggle technically is the same thing as an HTML checkbox input,
	 * except it looks different and is easier to use on a touch device.
	 * Toggles can also have colors assigned to them, by adding any color
	 * attribute.
	 *
	 * See the [Angular 2 Docs](https://angular.io/docs/ts/latest/guide/forms.html)
	 * for more info on forms and inputs.
	 * @property {boolean} [checked] - whether the toggle it toggled or not
	 * @property {boolean} [disabled] - whether the toggle is disabled or not
	 *
	 * @usage
	 * ```html
	 *
	 *  <ion-list>
	 *
	 *    <ion-item>
	 *      <ion-label>Pepperoni</ion-label>
	 *      <ion-toggle [(ngModel)]="pepperoni"></ion-toggle>
	 *    </ion-item>
	 *
	 *    <ion-item>
	 *      <ion-label>Sausage</ion-label>
	 *      <ion-toggle [(ngModel)]="sausage" disabled="true"></ion-toggle>
	 *    </ion-item>
	 *
	 *    <ion-item>
	 *      <ion-label>Mushrooms</ion-label>
	 *      <ion-toggle [(ngModel)]="mushrooms"></ion-toggle>
	 *    </ion-item>
	 *
	 *  </ion-list>
	 * ```
	 *
	 * @demo /docs/v2/demos/toggle/
	 * @see {@link /docs/v2/components#toggle Toggle Component Docs}
	 */
	var Toggle = (function () {
	    function Toggle(_form, _elementRef, _renderer, _item) {
	        this._form = _form;
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        this._item = _item;
	        this._checked = false;
	        this._disabled = false;
	        this._activated = false;
	        this._msPrv = 0;
	        this._form.register(this);
	        if (_item) {
	            this.id = 'tgl-' + _item.registerInput('toggle');
	            this._labelId = 'lbl-' + _item.id;
	            this._item.setCssClass('item-toggle', true);
	        }
	    }
	    /**
	     * @private
	     */
	    Toggle.prototype.pointerDown = function (ev) {
	        if (this._isPrevented(ev)) {
	            return;
	        }
	        this._startX = dom_1.pointerCoord(ev).x;
	        this._activated = true;
	    };
	    /**
	     * @private
	     */
	    Toggle.prototype.pointerMove = function (ev) {
	        if (this._startX) {
	            if (this._isPrevented(ev)) {
	                return;
	            }
	            var currentX = dom_1.pointerCoord(ev).x;
	            void 0;
	            if (this._checked) {
	                if (currentX + 15 < this._startX) {
	                    this.onChange(false);
	                    this._startX = currentX;
	                    this._activated = true;
	                }
	            }
	            else if (currentX - 15 > this._startX) {
	                this.onChange(true);
	                this._startX = currentX;
	                this._activated = (currentX < this._startX + 5);
	            }
	        }
	    };
	    /**
	     * @private
	     */
	    Toggle.prototype.pointerUp = function (ev) {
	        if (this._startX) {
	            if (this._isPrevented(ev)) {
	                return;
	            }
	            var endX = dom_1.pointerCoord(ev).x;
	            if (this.checked) {
	                if (this._startX + 4 > endX) {
	                    this.onChange(false);
	                }
	            }
	            else if (this._startX - 4 < endX) {
	                this.onChange(true);
	            }
	            this._activated = false;
	            this._startX = null;
	        }
	    };
	    Object.defineProperty(Toggle.prototype, "checked", {
	        get: function () {
	            return this._checked;
	        },
	        set: function (val) {
	            this._setChecked(util_1.isTrueProperty(val));
	            this.onChange(this._checked);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    Toggle.prototype._setChecked = function (isChecked) {
	        this._checked = isChecked;
	        this._item && this._item.setCssClass('item-toggle-checked', isChecked);
	    };
	    /**
	     * @private
	     */
	    Toggle.prototype.writeValue = function (val) {
	        this._setChecked(util_1.isTrueProperty(val));
	    };
	    /**
	     * @private
	     */
	    Toggle.prototype.registerOnChange = function (fn) {
	        var _this = this;
	        this._fn = fn;
	        this.onChange = function (isChecked) {
	            void 0;
	            fn(isChecked);
	            _this._setChecked(isChecked);
	            _this.onTouched();
	        };
	    };
	    /**
	     * @private
	     */
	    Toggle.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    Object.defineProperty(Toggle.prototype, "disabled", {
	        get: function () {
	            return this._disabled;
	        },
	        set: function (val) {
	            this._disabled = util_1.isTrueProperty(val);
	            this._item && this._item.setCssClass('item-toggle-disabled', this._disabled);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    Toggle.prototype.onChange = function (_) { };
	    /**
	     * @private
	     */
	    Toggle.prototype.onTouched = function () { };
	    /**
	     * @private
	     */
	    Toggle.prototype.ngOnDestroy = function () {
	        this._form.deregister(this);
	    };
	    /**
	     * @private
	     */
	    Toggle.prototype._isPrevented = function (ev) {
	        if (ev.type.indexOf('touch') > -1) {
	            this._msPrv = Date.now() + 2000;
	        }
	        else if (this._msPrv > Date.now() && ev.type.indexOf('mouse') > -1) {
	            ev.preventDefault();
	            ev.stopPropagation();
	            return true;
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Toggle.prototype, "checked", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Toggle.prototype, "disabled", null);
	    Toggle = __decorate([
	        core_1.Component({
	            selector: 'ion-toggle',
	            template: '<div class="toggle-icon" [class.toggle-checked]="_checked" [class.toggle-activated]="_activated">' +
	                '<div class="toggle-inner"></div>' +
	                '</div>' +
	                '<button role="checkbox" ' +
	                '[id]="id" ' +
	                '[attr.aria-checked]="_checked" ' +
	                '[attr.aria-labelledby]="_labelId" ' +
	                '[attr.aria-disabled]="_disabled" ' +
	                '(touchstart)=pointerDown($event) ' +
	                '(touchmove)=pointerMove($event) ' +
	                '(mousemove)=pointerMove($event) ' +
	                '(mousedown)=pointerDown($event) ' +
	                '(touchend)=pointerUp($event) ' +
	                '(mouseup)=pointerUp($event) ' +
	                '(mouseout)=pointerUp($event) ' +
	                'class="item-cover">' +
	                '</button>',
	            host: {
	                '[class.toggle-disabled]': '_disabled'
	            },
	            providers: [TOGGLE_VALUE_ACCESSOR]
	        }),
	        __param(3, core_1.Optional()), 
	        __metadata('design:paramtypes', [form_1.Form, core_1.ElementRef, core_1.Renderer, item_1.Item])
	    ], Toggle);
	    return Toggle;
	})();
	exports.Toggle = Toggle;


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
	var common_1 = __webpack_require__(25);
	var button_1 = __webpack_require__(42);
	var config_1 = __webpack_require__(7);
	var content_1 = __webpack_require__(51);
	var form_1 = __webpack_require__(13);
	var input_base_1 = __webpack_require__(72);
	var app_1 = __webpack_require__(14);
	var item_1 = __webpack_require__(63);
	var native_input_1 = __webpack_require__(73);
	var nav_controller_1 = __webpack_require__(43);
	var platform_1 = __webpack_require__(8);
	/**
	 * @name Input
	 * @description
	 *
	 * `ion-input` is meant for text type inputs only, such as `text`,
	 * `password`, `email`, `number`, `search`, `tel`, and `url`. Ionic
	 * still uses an actual `<input type="text">` HTML element within the
	 * component, however, with Ionic wrapping the native HTML input
	 * element it's able to better handle the user experience and
	 * interactivity.
	 *
	 * Similarily, `<ion-textarea>` should be used in place of `<textarea>`.
	 *
	 * An `ion-input` is **not** used for non-text type inputs, such as a
	 * `checkbox`, `radio`, `toggle`, `range`, `select`, etc.
	 *
	 * @property [type] - The HTML input type (text, password, email, number, search, tel, or url)
	 * @property [clearInput] - A clear icon will appear in the input which clears it
	 *
	 * @usage
	 * ```html
	 *  <ion-item>
	 *    <ion-label>Username</ion-label>
	 *    <ion-input></ion-input>
	 *  </ion-item>
	 *
	 *  <ion-item>
	 *    <ion-labe fixed>Website</ion-label>
	 *    <ion-input type="url"></ion-input>
	 *  </ion-item>
	 *
	 *  <ion-item>
	 *    <ion-label floating>Email</ion-label>
	 *    <ion-input type="email"></ion-input>
	 *  </ion-item>
	 *
	 *  <ion-item>
	 *    <ion-label stacked>Phone</ion-label>
	 *    <ion-input type="tel"></ion-input>
	 *  </ion-item>
	 *
	 *  <ion-item clearInput>
	 *    <ion-input placeholder="Username"></ion-input>
	 *  </ion-item>
	 * ```
	 *
	 * @demo /docs/v2/demos/input/
	 */
	var TextInput = (function (_super) {
	    __extends(TextInput, _super);
	    function TextInput(config, form, item, app, platform, elementRef, scrollView, nav, ngControl) {
	        _super.call(this, config, form, item, app, platform, elementRef, scrollView, nav, ngControl);
	    }
	    TextInput = __decorate([
	        core_1.Component({
	            selector: 'ion-input',
	            template: '<input [type]="type" [(ngModel)]="_value" [placeholder]="placeholder" class="text-input">' +
	                '<input [type]="type" aria-hidden="true" next-input *ngIf="_useAssist">' +
	                '<button clear *ngIf="clearInput && value" class="text-input-clear-icon" (click)="clearTextInput()" (mousedown)="clearTextInput()"></button>' +
	                '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" *ngIf="_useAssist"></div>',
	            directives: [
	                common_1.NgIf,
	                native_input_1.NextInput,
	                native_input_1.NativeInput,
	                button_1.Button
	            ]
	        }),
	        __param(2, core_1.Optional()),
	        __param(6, core_1.Optional()),
	        __param(7, core_1.Optional()),
	        __param(8, core_1.Optional()), 
	        __metadata('design:paramtypes', [config_1.Config, form_1.Form, item_1.Item, app_1.IonicApp, platform_1.Platform, core_1.ElementRef, content_1.Content, nav_controller_1.NavController, common_1.NgControl])
	    ], TextInput);
	    return TextInput;
	})(input_base_1.InputBase);
	exports.TextInput = TextInput;
	/**
	 * @name TextArea
	 * @description
	 *
	 * `ion-textarea` is is used for multi-line text inputs. Ionic still
	 * uses an actual `<textarea>` HTML element within the component,
	 * however, with Ionic wrapping the native HTML textarea element then
	 * Ionic is able to better handle the user experience and interactivity.
	 *
	 * Not that `<ion-textarea>` must load its value from the `value` or
	 * `[(ngModel)]` attribute. Unlike the native `<textarea>` element,
	 * `<ion-textarea>` does not support loading its value from the
	 * textarea's inner content.
	 *
	 * When requiring only a single-line text input it's recommended
	 * to use `<ion-input>` instead.
	 *
	 * @usage
	 * ```html
	 *  <ion-item>
	 *    <ion-label>Comments</ion-label>
	 *    <ion-textarea></ion-textarea>
	 *  </ion-item>
	 *
	 *  <ion-item>
	 *    <ion-label stacked>Message</ion-label>
	 *    <ion-textarea [(ngModel)]="msg"></ion-textarea>
	 *  </ion-item>
	 *
	 *  <ion-item>
	 *    <ion-label floating>Description</ion-label>
	 *    <ion-textarea></ion-textarea>
	 *  </ion-item>
	 * ```
	 *
	 * @demo /docs/v2/demos/textarea/
	 */
	var TextArea = (function (_super) {
	    __extends(TextArea, _super);
	    function TextArea(config, form, item, app, platform, elementRef, scrollView, nav, ngControl) {
	        _super.call(this, config, form, item, app, platform, elementRef, scrollView, nav, ngControl);
	    }
	    /**
	     * @private
	     */
	    TextArea.prototype.ngOnInit = function () {
	        _super.prototype.ngOnInit.call(this);
	        if (this._item) {
	            this._item.setCssClass('item-textarea', true);
	        }
	    };
	    TextArea = __decorate([
	        core_1.Component({
	            selector: 'ion-textarea',
	            template: '<textarea [(ngModel)]="_value" [placeholder]="placeholder" class="text-input"></textarea>' +
	                '<input type="text" aria-hidden="true" next-input *ngIf="_useAssist">' +
	                '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>',
	            directives: [
	                common_1.NgIf,
	                native_input_1.NextInput,
	                native_input_1.NativeInput
	            ]
	        }),
	        __param(2, core_1.Optional()),
	        __param(6, core_1.Optional()),
	        __param(7, core_1.Optional()),
	        __param(8, core_1.Optional()), 
	        __metadata('design:paramtypes', [config_1.Config, form_1.Form, item_1.Item, app_1.IonicApp, platform_1.Platform, core_1.ElementRef, content_1.Content, nav_controller_1.NavController, common_1.NgControl])
	    ], TextArea);
	    return TextArea;
	})(input_base_1.InputBase);
	exports.TextArea = TextArea;


/***/ },
/* 72 */
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
	var util_1 = __webpack_require__(9);
	var dom_1 = __webpack_require__(10);
	var native_input_1 = __webpack_require__(73);
	var InputBase = (function () {
	    function InputBase(config, _form, _item, _app, _platform, _elementRef, _scrollView, _nav, ngControl) {
	        this._form = _form;
	        this._item = _item;
	        this._app = _app;
	        this._platform = _platform;
	        this._elementRef = _elementRef;
	        this._scrollView = _scrollView;
	        this._nav = _nav;
	        this._disabled = false;
	        this._type = 'text';
	        this._useAssist = true;
	        this._value = '';
	        this.placeholder = '';
	        this._useAssist = config.get('scrollAssist');
	        this._keyboardHeight = config.get('keyboardHeight');
	        if (ngControl) {
	            ngControl.valueAccessor = this;
	        }
	        _form.register(this);
	    }
	    InputBase.prototype.ngOnInit = function () {
	        if (this._item) {
	            this._item.setCssClass('item-input', true);
	            this._item.registerInput(this._type);
	        }
	        var clearInput = this.clearInput;
	        if (typeof clearInput === 'string') {
	            this.clearInput = (clearInput === '' || clearInput === 'true');
	        }
	    };
	    InputBase.prototype.ngAfterContentInit = function () {
	        var self = this;
	        self._scrollMove = function (ev) {
	            // scroll move event listener this instance can reuse
	            if (!(self._nav && self._nav.isTransitioning())) {
	                self.deregScrollMove();
	                if (self.hasFocus()) {
	                    self._native.hideFocus(true);
	                    self._scrollView.onScrollEnd(function () {
	                        self._native.hideFocus(false);
	                        if (self.hasFocus()) {
	                            // if it still has focus then keep listening
	                            self.regScrollMove();
	                        }
	                    });
	                }
	            }
	        };
	        this.setItemControlCss();
	    };
	    InputBase.prototype.ngAfterContentChecked = function () {
	        this.setItemControlCss();
	    };
	    InputBase.prototype.setItemControlCss = function () {
	        var item = this._item;
	        var nativeControl = this._native && this._native.ngControl;
	        if (item && nativeControl) {
	            item.setCssClass('ng-untouched', nativeControl.untouched);
	            item.setCssClass('ng-touched', nativeControl.touched);
	            item.setCssClass('ng-pristine', nativeControl.pristine);
	            item.setCssClass('ng-dirty', nativeControl.dirty);
	            item.setCssClass('ng-valid', nativeControl.valid);
	            item.setCssClass('ng-invalid', !nativeControl.valid);
	        }
	    };
	    InputBase.prototype.ngOnDestroy = function () {
	        this._form.deregister(this);
	    };
	    Object.defineProperty(InputBase.prototype, "value", {
	        get: function () {
	            return this._value;
	        },
	        set: function (val) {
	            this._value = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InputBase.prototype, "type", {
	        get: function () {
	            return this._type;
	        },
	        set: function (val) {
	            this._type = 'text';
	            if (val) {
	                val = val.toLowerCase();
	                if (/password|email|number|search|tel|url|date|month|time|week/.test(val)) {
	                    this._type = val;
	                }
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InputBase.prototype, "disabled", {
	        get: function () {
	            return this._disabled;
	        },
	        set: function (val) {
	            this._disabled = util_1.isTrueProperty(val);
	            this._item && this._item.setCssClass('item-input-disabled', this._disabled);
	            this._native && this._native.isDisabled(this._disabled);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InputBase.prototype, "_nativeInput", {
	        /**
	         * @private
	         */
	        set: function (nativeInput) {
	            var _this = this;
	            this._native = nativeInput;
	            if (this._item && this._item.labelId !== null) {
	                nativeInput.labelledBy(this._item.labelId);
	            }
	            nativeInput.valueChange.subscribe(function (inputValue) {
	                _this.onChange(inputValue);
	            });
	            this.focusChange(this.hasFocus());
	            nativeInput.focusChange.subscribe(function (textInputHasFocus) {
	                _this.focusChange(textInputHasFocus);
	                _this.checkHasValue(nativeInput.getValue());
	                if (!textInputHasFocus) {
	                    _this.onTouched(textInputHasFocus);
	                }
	            });
	            this.checkHasValue(nativeInput.getValue());
	            this.disabled = this._disabled;
	            // copy ion-input attributes to the native input element
	            dom_1.copyInputAttributes(this._elementRef.nativeElement, nativeInput.element());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InputBase.prototype, "_nextInput", {
	        /**
	         * @private
	         */
	        set: function (nextInput) {
	            var _this = this;
	            if (nextInput) {
	                nextInput.focused.subscribe(function () {
	                    _this._form.tabFocus(_this);
	                });
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     * Angular2 Forms API method called by the model (Control) on change to update
	     * the checked value.
	     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
	     */
	    InputBase.prototype.writeValue = function (val) {
	        this._value = val;
	        this.checkHasValue(val);
	    };
	    /**
	     * @private
	     */
	    InputBase.prototype.onChange = function (val) {
	        this.checkHasValue(val);
	    };
	    /**
	     * @private
	     */
	    InputBase.prototype.onTouched = function (val) { };
	    /**
	     * @private
	     */
	    InputBase.prototype.hasFocus = function () {
	        // check if an input has focus or not
	        return this._native.hasFocus();
	    };
	    /**
	     * @private
	     */
	    InputBase.prototype.checkHasValue = function (inputValue) {
	        if (this._item) {
	            this._item.setCssClass('input-has-value', !!(inputValue && inputValue !== ''));
	        }
	    };
	    /**
	     * @private
	     */
	    InputBase.prototype.focusChange = function (inputHasFocus) {
	        if (this._item) {
	            this._item.setCssClass('input-has-focus', inputHasFocus);
	        }
	        if (!inputHasFocus) {
	            this.deregScrollMove();
	        }
	    };
	    InputBase.prototype.pointerStart = function (ev) {
	        // input cover touchstart
	        void 0;
	        if (ev.type === 'touchstart') {
	            this._isTouch = true;
	        }
	        if ((this._isTouch || (!this._isTouch && ev.type === 'mousedown')) && this._app.isEnabled()) {
	            // remember where the touchstart/mousedown started
	            this._coord = dom_1.pointerCoord(ev);
	        }
	    };
	    InputBase.prototype.pointerEnd = function (ev) {
	        // input cover touchend/mouseup
	        void 0;
	        if ((this._isTouch && ev.type === 'mouseup') || !this._app.isEnabled()) {
	            // the app is actively doing something right now
	            // don't try to scroll in the input
	            ev.preventDefault();
	            ev.stopPropagation();
	        }
	        else if (this._coord) {
	            // get where the touchend/mouseup ended
	            var endCoord = dom_1.pointerCoord(ev);
	            // focus this input if the pointer hasn't moved XX pixels
	            // and the input doesn't already have focus
	            if (!dom_1.hasPointerMoved(8, this._coord, endCoord) && !this.hasFocus()) {
	                ev.preventDefault();
	                ev.stopPropagation();
	                // begin the input focus process
	                void 0;
	                this.initFocus();
	            }
	        }
	        this._coord = null;
	    };
	    /**
	     * @private
	     */
	    InputBase.prototype.initFocus = function () {
	        var _this = this;
	        // begin the process of setting focus to the inner input element
	        var scrollView = this._scrollView;
	        if (scrollView) {
	            // this input is inside of a scroll view
	            // find out if text input should be manually scrolled into view
	            var ele = this._elementRef.nativeElement;
	            var itemEle = dom_1.closest(ele, 'ion-item');
	            if (itemEle) {
	                ele = itemEle;
	            }
	            var scrollData = InputBase.getScrollData(ele.offsetTop, ele.offsetHeight, scrollView.getContentDimensions(), this._keyboardHeight, this._platform.height());
	            if (scrollData.scrollAmount > -3 && scrollData.scrollAmount < 3) {
	                // the text input is in a safe position that doesn't
	                // require it to be scrolled into view, just set focus now
	                this.setFocus();
	                this.regScrollMove();
	                return;
	            }
	            // add padding to the bottom of the scroll view (if needed)
	            scrollView.addScrollPadding(scrollData.scrollPadding);
	            // manually scroll the text input to the top
	            // do not allow any clicks while it's scrolling
	            var scrollDuration = getScrollAssistDuration(scrollData.scrollAmount);
	            this._app.setEnabled(false, scrollDuration);
	            this._nav && this._nav.setTransitioning(true, scrollDuration);
	            // temporarily move the focus to the focus holder so the browser
	            // doesn't freak out while it's trying to get the input in place
	            // at this point the native text input still does not have focus
	            this._native.relocate(true, scrollData.inputSafeY);
	            // scroll the input into place
	            scrollView.scrollTo(0, scrollData.scrollTo, scrollDuration).then(function () {
	                // the scroll view is in the correct position now
	                // give the native text input focus
	                _this._native.relocate(false, 0);
	                _this.setFocus();
	                // all good, allow clicks again
	                _this._app.setEnabled(true);
	                _this._nav && _this._nav.setTransitioning(false);
	                _this.regScrollMove();
	            });
	        }
	        else {
	            // not inside of a scroll view, just focus it
	            this.setFocus();
	            this.regScrollMove();
	        }
	    };
	    /**
	      * @private
	     */
	    InputBase.prototype.clearTextInput = function () {
	        void 0;
	    };
	    /**
	     * @private
	     */
	    InputBase.prototype.setFocus = function () {
	        // immediately set focus
	        this._form.setAsFocused(this);
	        // set focus on the actual input element
	        this._native.setFocus();
	        // ensure the body hasn't scrolled down
	        document.body.scrollTop = 0;
	    };
	    /**
	     * @private
	     * Angular2 Forms API method called by the view (NgControl) to register the
	     * onChange event handler that updates the model (Control).
	     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
	     * @param {Function} fn  the onChange event handler.
	     */
	    InputBase.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	    /**
	     * @private
	     * Angular2 Forms API method called by the the view (NgControl) to register
	     * the onTouched event handler that marks model (Control) as touched.
	     * @param {Function} fn  onTouched event handler.
	     */
	    InputBase.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    /**
	     * @private
	     */
	    InputBase.prototype.regScrollMove = function () {
	        var _this = this;
	        // register scroll move listener
	        if (this._useAssist && this._scrollView) {
	            setTimeout(function () {
	                _this.deregScrollMove();
	                _this._deregScroll = _this._scrollView.addScrollEventListener(_this._scrollMove);
	            }, 80);
	        }
	    };
	    /**
	     * @private
	     */
	    InputBase.prototype.deregScrollMove = function () {
	        // deregister the scroll move listener
	        this._deregScroll && this._deregScroll();
	    };
	    InputBase.prototype.focusNext = function () {
	        this._form.tabFocus(this);
	    };
	    /**
	     * @private
	     */
	    InputBase.getScrollData = function (inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, plaformHeight) {
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
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], InputBase.prototype, "clearInput", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], InputBase.prototype, "placeholder", void 0);
	    __decorate([
	        core_1.ViewChild(native_input_1.NativeInput), 
	        __metadata('design:type', native_input_1.NativeInput)
	    ], InputBase.prototype, "_native", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], InputBase.prototype, "value", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], InputBase.prototype, "type", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], InputBase.prototype, "disabled", null);
	    __decorate([
	        core_1.ViewChild(native_input_1.NativeInput), 
	        __metadata('design:type', native_input_1.NativeInput), 
	        __metadata('design:paramtypes', [native_input_1.NativeInput])
	    ], InputBase.prototype, "_nativeInput", null);
	    __decorate([
	        core_1.ViewChild(native_input_1.NextInput), 
	        __metadata('design:type', native_input_1.NextInput), 
	        __metadata('design:paramtypes', [native_input_1.NextInput])
	    ], InputBase.prototype, "_nextInput", null);
	    return InputBase;
	})();
	exports.InputBase = InputBase;
	var SCROLL_ASSIST_SPEED = 0.3;
	function getScrollAssistDuration(distanceToScroll) {
	    //return 3000;
	    distanceToScroll = Math.abs(distanceToScroll);
	    var duration = distanceToScroll / SCROLL_ASSIST_SPEED;
	    return Math.min(400, Math.max(150, duration));
	}


/***/ },
/* 73 */
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
	var common_1 = __webpack_require__(25);
	var dom_1 = __webpack_require__(10);
	/**
	 * @private
	 */
	var NativeInput = (function () {
	    function NativeInput(_elementRef, _renderer, ngControl) {
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        this.ngControl = ngControl;
	        this.focusChange = new core_1.EventEmitter();
	        this.valueChange = new core_1.EventEmitter();
	    }
	    /**
	     * @private
	     */
	    NativeInput.prototype._change = function (ev) {
	        this.valueChange.emit(ev.target.value);
	    };
	    /**
	     * @private
	     */
	    NativeInput.prototype._focus = function () {
	        this.focusChange.emit(true);
	    };
	    /**
	     * @private
	     */
	    NativeInput.prototype._blur = function () {
	        this.focusChange.emit(false);
	        this.hideFocus(false);
	    };
	    NativeInput.prototype.labelledBy = function (val) {
	        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-labelledby', val);
	    };
	    NativeInput.prototype.isDisabled = function (val) {
	        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', val ? '' : null);
	    };
	    /**
	     * @private
	     */
	    NativeInput.prototype.setFocus = function () {
	        this.element().focus();
	    };
	    /**
	     * @private
	     */
	    NativeInput.prototype.relocate = function (shouldRelocate, inputRelativeY) {
	        void 0;
	        if (this._relocated !== shouldRelocate) {
	            var focusedInputEle = this.element();
	            if (shouldRelocate) {
	                var clonedInputEle = cloneInput(focusedInputEle, 'cloned-focus');
	                focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
	                focusedInputEle.style[dom_1.CSS.transform] = "translate3d(-9999px," + inputRelativeY + "px,0)";
	                focusedInputEle.style.opacity = '0';
	                this.setFocus();
	                dom_1.raf(function () {
	                    focusedInputEle.classList.add('cloned-active');
	                });
	            }
	            else {
	                focusedInputEle.classList.remove('cloned-active');
	                focusedInputEle.style[dom_1.CSS.transform] = '';
	                focusedInputEle.style.opacity = '';
	                removeClone(focusedInputEle, 'cloned-focus');
	            }
	            this._relocated = shouldRelocate;
	        }
	    };
	    /**
	     * @private
	     */
	    NativeInput.prototype.hideFocus = function (shouldHideFocus) {
	        void 0;
	        var focusedInputEle = this.element();
	        if (shouldHideFocus) {
	            var clonedInputEle = cloneInput(focusedInputEle, 'cloned-move');
	            focusedInputEle.classList.add('cloned-active');
	            focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
	        }
	        else {
	            focusedInputEle.classList.remove('cloned-active');
	            removeClone(focusedInputEle, 'cloned-move');
	        }
	    };
	    NativeInput.prototype.hasFocus = function () {
	        return dom_1.hasFocus(this.element());
	    };
	    NativeInput.prototype.getValue = function () {
	        return this.element().value;
	    };
	    /**
	     * @private
	     */
	    NativeInput.prototype.element = function () {
	        return this._elementRef.nativeElement;
	    };
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], NativeInput.prototype, "focusChange", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], NativeInput.prototype, "valueChange", void 0);
	    __decorate([
	        core_1.HostListener('input', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], NativeInput.prototype, "_change", null);
	    __decorate([
	        core_1.HostListener('focus'), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', void 0)
	    ], NativeInput.prototype, "_focus", null);
	    __decorate([
	        core_1.HostListener('blur'), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', void 0)
	    ], NativeInput.prototype, "_blur", null);
	    NativeInput = __decorate([
	        core_1.Directive({
	            selector: '.text-input'
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, common_1.NgControl])
	    ], NativeInput);
	    return NativeInput;
	})();
	exports.NativeInput = NativeInput;
	function cloneInput(focusedInputEle, addCssClass) {
	    var clonedInputEle = focusedInputEle.cloneNode(true);
	    clonedInputEle.classList.add('cloned-input');
	    clonedInputEle.classList.add(addCssClass);
	    clonedInputEle.setAttribute('aria-hidden', true);
	    clonedInputEle.removeAttribute('aria-labelledby');
	    clonedInputEle.tabIndex = -1;
	    clonedInputEle.style.width = (focusedInputEle.offsetWidth + 10) + 'px';
	    return clonedInputEle;
	}
	function removeClone(focusedInputEle, queryCssClass) {
	    var clonedInputEle = focusedInputEle.parentElement.querySelector('.' + queryCssClass);
	    if (clonedInputEle) {
	        clonedInputEle.parentNode.removeChild(clonedInputEle);
	    }
	}
	/**
	 * @private
	 */
	var NextInput = (function () {
	    function NextInput() {
	        this.focused = new core_1.EventEmitter();
	    }
	    NextInput.prototype.receivedFocus = function () {
	        this.focused.emit(true);
	    };
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], NextInput.prototype, "focused", void 0);
	    __decorate([
	        core_1.HostListener('focus'), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', void 0)
	    ], NextInput.prototype, "receivedFocus", null);
	    NextInput = __decorate([
	        core_1.Directive({
	            selector: '[next-input]'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NextInput);
	    return NextInput;
	})();
	exports.NextInput = NextInput;


/***/ },
/* 74 */
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
	var common_1 = __webpack_require__(25);
	var util_1 = __webpack_require__(9);
	/**
	 * @name SegmentButton
	 * @description
	 * The child buttons of the `ion-segment` component. Each `ion-segment-button` must have a value.
	 * @usage
	 * ```html
	 * <ion-segment [(ngModel)]="relationship" primary>
	 *   <ion-segment-button value="friends" (select)="selectedFriends()">
	 *     Friends
	 *   </ion-segment-button>
	 *   <ion-segment-button value="enemies" (select)="selectedEnemies()">
	 *     Enemies
	 *   </ion-segment-button>
	 * </ion-segment>
	 *```
	 *
	 * Or with `FormBuilder`
	 *
	 *```html
	 * <form [ngFormModel]="myForm">
	 *   <ion-segment ngControl="mapStyle" danger>
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
	 *
	 * @demo /docs/v2/demos/segment/
	 * @see {@link /docs/v2/components#segment Segment Component Docs}
	 * @see {@link /docs/v2/api/components/segment/Segment/ Segment API Docs}
	 */
	var SegmentButton = (function () {
	    function SegmentButton(_renderer, _elementRef) {
	        this._renderer = _renderer;
	        this._elementRef = _elementRef;
	        /**
	         * @output {any} expression to evaluate when a segment button has been clicked
	         */
	        this.select = new core_1.EventEmitter();
	    }
	    /**
	     * @private
	     * On click of a SegmentButton
	     */
	    SegmentButton.prototype.onClick = function (ev) {
	        void 0;
	        this.select.emit(this);
	    };
	    /**
	     * @private
	     */
	    SegmentButton.prototype.ngOnInit = function () {
	        if (!util_1.isDefined(this.value)) {
	            void 0;
	        }
	    };
	    Object.defineProperty(SegmentButton.prototype, "isActive", {
	        /**
	         * @private
	         */
	        set: function (isActive) {
	            this._renderer.setElementClass(this._elementRef.nativeElement, 'segment-activated', isActive);
	            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-pressed', isActive);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], SegmentButton.prototype, "value", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], SegmentButton.prototype, "select", void 0);
	    __decorate([
	        core_1.HostListener('click', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], SegmentButton.prototype, "onClick", null);
	    SegmentButton = __decorate([
	        core_1.Component({
	            selector: 'ion-segment-button',
	            template: '<ng-content></ng-content>' +
	                '<ion-button-effect></ion-button-effect>',
	            host: {
	                'tappable': '',
	                'class': 'segment-button',
	                'role': 'button'
	            }
	        }), 
	        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
	    ], SegmentButton);
	    return SegmentButton;
	})();
	exports.SegmentButton = SegmentButton;
	/**
	 * @name Segment
	 * @description
	 * A Segment is a group of buttons, sometimes known as Segmented Controls, that allow the user to interact with a compact group of a number of controls.
	 * Segments provide functionality similar to tabs, selecting one will unselect all others. You should use a tab bar instead of a segmented control when you want to let the user move back and forth between distinct pages in your app.
	 * You could use Angular 2's `ngModel` or `FormBuilder` API. For an overview on how `FormBuilder` works, checkout [Angular 2 Forms](http://learnangular2.com/forms/), or [Angular FormBuilder](https://angular.io/docs/ts/latest/api/common/FormBuilder-class.html)
	 *
	 *
	 * @usage
	 * ```html
	 * <ion-segment [(ngModel)]="relationship" (change)="onSegmentChanged($event)" danger>
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
	 * <form [ngFormModel]="myForm">
	 *   <ion-segment ngControl="mapStyle" danger>
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
	 *
	 * @demo /docs/v2/demos/segment/
	 * @see {@link /docs/v2/components#segment Segment Component Docs}
	 * @see [Angular 2 Forms](http://learnangular2.com/forms/)
	 */
	var Segment = (function () {
	    function Segment(ngControl) {
	        /**
	         * @output {Any}  expression to evaluate when a segment button has been changed
	         */
	        this.change = new core_1.EventEmitter();
	        /**
	         * @private
	         */
	        this.onChange = function (_) { };
	        /**
	         * @private
	         */
	        this.onTouched = function (_) { };
	        if (ngControl) {
	            ngControl.valueAccessor = this;
	        }
	    }
	    /**
	     * @private
	     * Write a new value to the element.
	     */
	    Segment.prototype.writeValue = function (value) {
	        this.value = util_1.isDefined(value) ? value : '';
	        if (this._buttons) {
	            var buttons = this._buttons.toArray();
	            for (var _i = 0; _i < buttons.length; _i++) {
	                var button = buttons[_i];
	                button.isActive = (button.value === this.value);
	            }
	        }
	    };
	    /**
	     * @private
	     */
	    Segment.prototype.ngAfterViewInit = function () {
	        var _this = this;
	        var buttons = this._buttons.toArray();
	        for (var _i = 0; _i < buttons.length; _i++) {
	            var button = buttons[_i];
	            button.select.subscribe(function (selectedButton) {
	                _this.writeValue(selectedButton.value);
	                _this.onChange(selectedButton.value);
	                _this.change.emit(selectedButton);
	            });
	            if (util_1.isDefined(this.value)) {
	                button.isActive = (button.value === this.value);
	            }
	        }
	    };
	    /**
	     * @private
	     * Set the function to be called when the control receives a change event.
	     */
	    Segment.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	    /**
	     * @private
	     * Set the function to be called when the control receives a touch event.
	     */
	    Segment.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Segment.prototype, "change", void 0);
	    __decorate([
	        core_1.ContentChildren(SegmentButton), 
	        __metadata('design:type', core_1.QueryList)
	    ], Segment.prototype, "_buttons", void 0);
	    Segment = __decorate([
	        core_1.Directive({
	            selector: 'ion-segment'
	        }),
	        __param(0, core_1.Optional()), 
	        __metadata('design:paramtypes', [common_1.NgControl])
	    ], Segment);
	    return Segment;
	})();
	exports.Segment = Segment;


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
	var form_1 = __webpack_require__(13);
	var util_1 = __webpack_require__(9);
	var item_1 = __webpack_require__(63);
	var radio_group_1 = __webpack_require__(76);
	/**
	 * @description
	 * A radio button with a unique value. Note that all `<ion-radio>`
	 * components must be wrapped within a `<ion-list radio-group>`,
	 * and there must be at least two `<ion-radio>` components within
	 * the radio group.
	 *
	 * See the [Angular 2 Docs](https://angular.io/docs/ts/latest/guide/forms.html) for
	 * more info on forms and input.
	 *
	 * @usage
	 * ```html
	 *
	 * <ion-item>
	 *   <ion-label>Radio Label</ion-label>
	 *   <ion-radio value="radio-value"></ion-radio>
	 * </ion-item>
	 *
	 * ```
	 * @demo /docs/v2/demos/radio/
	 * @see {@link /docs/v2/components#radio Radio Component Docs}
	 */
	var RadioButton = (function () {
	    function RadioButton(_form, _item, _group) {
	        this._form = _form;
	        this._item = _item;
	        this._group = _group;
	        this._checked = false;
	        this._disabled = false;
	        this._value = null;
	        /**
	         * @output {any} expression to be evaluated when clicked
	         */
	        this.select = new core_1.EventEmitter();
	        _form.register(this);
	        if (_group) {
	            // register with the radiogroup
	            this.id = 'rb-' + _group.add(this);
	        }
	        if (_item) {
	            // register the input inside of the item
	            // reset to the item's id instead of the radiogroup id
	            this.id = 'rb-' + _item.registerInput('radio');
	            this._labelId = 'lbl-' + _item.id;
	            this._item.setCssClass('item-radio', true);
	        }
	    }
	    Object.defineProperty(RadioButton.prototype, "value", {
	        /**
	         * @private
	         */
	        get: function () {
	            // if the value is not defined then use it's unique id
	            return util_1.isBlank(this._value) ? this.id : this._value;
	        },
	        set: function (val) {
	            this._value = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RadioButton.prototype, "checked", {
	        /**
	         * @private
	         */
	        get: function () {
	            return this._checked;
	        },
	        set: function (isChecked) {
	            this._checked = util_1.isTrueProperty(isChecked);
	            if (this._item) {
	                this._item.setCssClass('item-radio-checked', this._checked);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RadioButton.prototype, "disabled", {
	        /**
	         * @private
	         */
	        get: function () {
	            return this._disabled;
	        },
	        set: function (val) {
	            this._disabled = util_1.isTrueProperty(val);
	            this._item && this._item.setCssClass('item-radio-disabled', this._disabled);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    RadioButton.prototype._click = function (ev) {
	        void 0;
	        ev.preventDefault();
	        ev.stopPropagation();
	        this.checked = true;
	        this.select.emit(this.value);
	    };
	    /**
	     * @private
	     */
	    RadioButton.prototype.ngOnInit = function () {
	        if (this._group && util_1.isDefined(this._group.value) && this._group.value === this.value) {
	            this.checked = true;
	        }
	    };
	    /**
	     * @private
	     */
	    RadioButton.prototype.ngOnDestroy = function () {
	        this._form.deregister(this);
	        this._group.remove(this);
	    };
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], RadioButton.prototype, "select", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], RadioButton.prototype, "value", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], RadioButton.prototype, "checked", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], RadioButton.prototype, "disabled", null);
	    __decorate([
	        core_1.HostListener('click', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], RadioButton.prototype, "_click", null);
	    RadioButton = __decorate([
	        core_1.Component({
	            selector: 'ion-radio',
	            template: '<div class="radio-icon" [class.radio-checked]="_checked">' +
	                '<div class="radio-inner"></div>' +
	                '</div>' +
	                '<button role="radio" ' +
	                '[id]="id" ' +
	                '[attr.aria-checked]="_checked" ' +
	                '[attr.aria-labelledby]="_labelId" ' +
	                '[attr.aria-disabled]="_disabled" ' +
	                'class="item-cover">' +
	                '</button>',
	            host: {
	                '[class.radio-disabled]': '_disabled'
	            }
	        }),
	        __param(1, core_1.Optional()),
	        __param(2, core_1.Optional()), 
	        __metadata('design:paramtypes', [form_1.Form, item_1.Item, radio_group_1.RadioGroup])
	    ], RadioButton);
	    return RadioButton;
	})();
	exports.RadioButton = RadioButton;


/***/ },
/* 76 */
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
	var common_1 = __webpack_require__(25);
	var list_1 = __webpack_require__(60);
	var RADIO_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return RadioGroup; }), multi: true });
	/**
	 * @name RadioGroup
	 * @description
	 * A radio group is a group of radio button components, and its value
	 * comes from the checked radio button's value. Selecting a radio
	 * button in the group unchecks all others in the group.
	 *
	 * See the [Angular 2 Docs](https://angular.io/docs/ts/latest/guide/forms.html)
	 * for more info on forms and inputs.
	 *
	 * @usage
	 * ```html
	 * <ion-list radio-group [(ngModel)]="autoManufacturers">
	 *
	 *   <ion-list-header>
	 *     Auto Manufacturers
	 *   </ion-list-header>
	 *
	 *   <ion-item>
	 *     <ion-label>Cord</ion-label>
	 *     <ion-radio value="cord"></ion-radio>
	 *   </ion-item>
	 *
	 *   <ion-item>
	 *     <ion-label>Duesenberg</ion-label>
	 *     <ion-radio value="duesenberg"></ion-radio>
	 *   </ion-item>
	 *
	 *   <ion-item>
	 *     <ion-label>Hudson</ion-label>
	 *     <ion-radio value="hudson"></ion-radio>
	 *   </ion-item>
	 *
	 *   <ion-item>
	 *     <ion-label>Packard</ion-label>
	 *     <ion-radio value="packard"></ion-radio>
	 *   </ion-item>
	 *
	 *   <ion-item>
	 *     <ion-label>Studebaker</ion-label>
	 *     <ion-radio value="studebaker"></ion-radio>
	 *   </ion-item>
	 *
	 * </ion-list>
	 * ```
	 *
	 * @demo /docs/v2/demos/radio/
	 * @see {@link /docs/v2/components#radio Radio Component Docs}
	*/
	var RadioGroup = (function () {
	    function RadioGroup(_renderer, _elementRef) {
	        this._renderer = _renderer;
	        this._elementRef = _elementRef;
	        this._btns = [];
	        this._ids = -1;
	        this._init = false;
	        /**
	         * @output {any} expression to be evaluated when selection has been changed
	         */
	        this.change = new core_1.EventEmitter();
	        this.id = ++radioGroupIds;
	    }
	    /**
	     * @private
	     */
	    RadioGroup.prototype.writeValue = function (val) {
	        void 0;
	        this.value = val;
	        if (this._init) {
	            this._update();
	            this.onTouched();
	            this.change.emit(val);
	        }
	        this._init = true;
	    };
	    /**
	     * @private
	     */
	    RadioGroup.prototype.ngAfterContentInit = function () {
	        var activeButton = this._btns.find(function (b) { return b.checked; });
	        if (activeButton) {
	            this._setActive(activeButton);
	        }
	    };
	    /**
	     * @private
	     */
	    RadioGroup.prototype.registerOnChange = function (fn) {
	        var _this = this;
	        this._fn = fn;
	        this.onChange = function (val) {
	            void 0;
	            fn(val);
	            _this.value = val;
	            _this._update();
	            _this.onTouched();
	            _this.change.emit(val);
	        };
	    };
	    /**
	     * @private
	     */
	    RadioGroup.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	    /**
	     * @private
	     */
	    RadioGroup.prototype._update = function () {
	        var _this = this;
	        // loop through each of the radiobuttons
	        this._btns.forEach(function (radioButton) {
	            // check this radiobutton if its value is
	            // the same as the radiogroups value
	            radioButton.checked = (radioButton.value === _this.value);
	            if (radioButton.checked) {
	                // if this button is checked, then set it as
	                // the radiogroup's active descendant
	                _this._setActive(radioButton);
	            }
	        });
	    };
	    RadioGroup.prototype._setActive = function (radioButton) {
	        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-activedescendant', radioButton.id);
	    };
	    /**
	     * @private
	     */
	    RadioGroup.prototype.add = function (button) {
	        var _this = this;
	        this._btns.push(button);
	        // listen for radiobutton select events
	        button.select.subscribe(function (val) {
	            // this radiobutton has been selected
	            _this.onChange(val);
	        });
	        return this.id + '-' + (++this._ids);
	    };
	    /**
	     * @private
	     */
	    RadioGroup.prototype.remove = function (button) {
	        var index = this._btns.indexOf(button);
	        if (index > -1) {
	            if (button.value === this.value) {
	                this.value = null;
	            }
	            this._btns.splice(index, 1);
	        }
	    };
	    Object.defineProperty(RadioGroup.prototype, "_header", {
	        /**
	         * @private
	         */
	        set: function (header) {
	            if (header) {
	                if (!header.id) {
	                    header.id = 'rg-hdr-' + this.id;
	                }
	                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-describedby', header.id);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @private
	     */
	    RadioGroup.prototype.onChange = function (_) { };
	    /**
	     * @private
	     */
	    RadioGroup.prototype.onTouched = function () { };
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], RadioGroup.prototype, "change", void 0);
	    __decorate([
	        core_1.ContentChild(list_1.ListHeader), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], RadioGroup.prototype, "_header", null);
	    RadioGroup = __decorate([
	        core_1.Directive({
	            selector: '[radio-group]',
	            host: {
	                '[attr.aria-activedescendant]': 'activeId',
	                'role': 'radiogroup'
	            },
	            providers: [RADIO_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
	    ], RadioGroup);
	    return RadioGroup;
	})();
	exports.RadioGroup = RadioGroup;
	var radioGroupIds = -1;


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
	var common_1 = __webpack_require__(25);
	var ion_1 = __webpack_require__(28);
	var config_1 = __webpack_require__(7);
	var icon_1 = __webpack_require__(40);
	var button_1 = __webpack_require__(42);
	var util_1 = __webpack_require__(9);
	/**
	* @private
	*/
	var SearchbarInput = (function () {
	    function SearchbarInput(_elementRef) {
	        this._elementRef = _elementRef;
	    }
	    SearchbarInput.prototype.stopInput = function (event) {
	        event.preventDefault();
	        event.stopPropagation();
	    };
	    __decorate([
	        core_1.HostListener('input', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], SearchbarInput.prototype, "stopInput", null);
	    SearchbarInput = __decorate([
	        core_1.Directive({
	            selector: '.searchbar-input',
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], SearchbarInput);
	    return SearchbarInput;
	})();
	exports.SearchbarInput = SearchbarInput;
	/**
	 * @name Searchbar
	 * @module ionic
	 * @description
	 * Manages the display of a Searchbar which can be used to search or filter items.
	 *
	 * @usage
	 * ```html
	 * <ion-searchbar [(ngModel)]="defaultSearch" (input)="triggerInput($event)" (cancel)="onCancelSearchbar($event)" (clear)="onClearSearchbar($event)"></ion-searchbar>
	 * ```
	 *
	 * @demo /docs/v2/demos/searchbar/
	 * @see {@link /docs/v2/components#searchbar Searchbar Component Docs}
	 */
	var Searchbar = (function (_super) {
	    __extends(Searchbar, _super);
	    function Searchbar(_elementRef, _config, ngControl) {
	        _super.call(this, _elementRef);
	        this._elementRef = _elementRef;
	        this._config = _config;
	        /**
	         * @output {event} When the Searchbar input has changed including cleared
	         */
	        this.input = new core_1.EventEmitter();
	        /**
	         * @output {event} When the Searchbar input has blurred
	         */
	        this.blur = new core_1.EventEmitter();
	        /**
	         * @output {event} When the Searchbar input has focused
	         */
	        this.focus = new core_1.EventEmitter();
	        /**
	         * @output {event} When the cancel button is clicked
	         */
	        this.cancel = new core_1.EventEmitter();
	        /**
	         * @output {event} When the clear input button is clicked
	         */
	        this.clear = new core_1.EventEmitter();
	        /**
	         * @private
	         */
	        this.value = '';
	        /**
	         * @private
	         */
	        this.blurInput = true;
	        /**
	         * @private
	         */
	        this.onChange = function (_) { };
	        /**
	         * @private
	         */
	        this.onTouched = function () { };
	        // If the user passed a ngControl we need to set the valueAccessor
	        if (ngControl) {
	            ngControl.valueAccessor = this;
	        }
	    }
	    /**
	     * @private
	     * On Initialization check for attributes
	     */
	    Searchbar.prototype.ngOnInit = function () {
	        this.mode = this._config.get('mode');
	        var hideCancelButton = this.hideCancelButton;
	        if (typeof hideCancelButton === 'string') {
	            this.hideCancelButton = (hideCancelButton === '' || hideCancelButton === 'true');
	        }
	        this.cancelButtonText = this.cancelButtonText || 'Cancel';
	        this.placeholder = this.placeholder || 'Search';
	        if (this.ngModel)
	            this.value = this.ngModel;
	        this.onChange(this.value);
	        this.shouldLeftAlign = this.value && this.value.trim() != '';
	        // Using querySelector instead of searchbarInput because at this point it doesn't exist
	        this.inputElement = this._elementRef.nativeElement.querySelector('.searchbar-input');
	        this.searchIconElement = this._elementRef.nativeElement.querySelector('.searchbar-search-icon');
	        this.setElementLeft();
	    };
	    /**
	     * @private
	     * After View Initialization check the value
	     */
	    Searchbar.prototype.ngAfterViewInit = function () {
	        // If the user passes an undefined variable to ngModel this will warn
	        // and set the value to an empty string
	        if (!util_1.isDefined(this.value)) {
	            void 0;
	            this.value = '';
	            this.onChange(this.value);
	        }
	    };
	    /**
	     * @private
	     * Determines whether or not to add style to the element
	     * to center it properly (ios only)
	     */
	    Searchbar.prototype.setElementLeft = function () {
	        if (this.mode !== 'ios')
	            return;
	        if (this.shouldLeftAlign) {
	            this.inputElement.removeAttribute("style");
	            this.searchIconElement.removeAttribute("style");
	        }
	        else {
	            this.addElementLeft();
	        }
	    };
	    /**
	     * @private
	     * Calculates the amount of padding/margin left for the elements
	     * in order to center them based on the placeholder width
	     */
	    Searchbar.prototype.addElementLeft = function () {
	        // Create a dummy span to get the placeholder width
	        var tempSpan = document.createElement('span');
	        tempSpan.innerHTML = this.placeholder;
	        document.body.appendChild(tempSpan);
	        // Get the width of the span then remove it
	        var textWidth = tempSpan.offsetWidth;
	        tempSpan.remove();
	        // Set the input padding left
	        var inputLeft = "calc(50% - " + (textWidth / 2) + "px)";
	        this.inputElement.style.paddingLeft = inputLeft;
	        // Set the icon margin left
	        var iconLeft = "calc(50% - " + ((textWidth / 2) + 30) + "px)";
	        this.searchIconElement.style.marginLeft = iconLeft;
	    };
	    /**
	     * @private
	     * Update the Searchbar input value when the input changes
	     */
	    Searchbar.prototype.inputChanged = function (ev) {
	        this.value = ev.target.value;
	        this.onChange(this.value);
	        this.input.emit(this);
	    };
	    /**
	     * @private
	     * Sets the Searchbar to focused and aligned left on input focus.
	     */
	    Searchbar.prototype.inputFocused = function () {
	        this.focus.emit(this);
	        this.isFocused = true;
	        this.shouldLeftAlign = true;
	        this.setElementLeft();
	    };
	    /**
	     * @private
	     * Sets the Searchbar to not focused and checks if it should align left
	     * based on whether there is a value in the searchbar or not.
	     */
	    Searchbar.prototype.inputBlurred = function () {
	        // blurInput determines if it should blur
	        // if we are clearing the input we still want to stay focused in the input
	        if (this.blurInput == false) {
	            this.searchbarInput._elementRef.nativeElement.focus();
	            this.blurInput = true;
	            return;
	        }
	        this.blur.emit(this);
	        this.isFocused = false;
	        this.shouldLeftAlign = this.value && this.value.trim() != '';
	        this.setElementLeft();
	    };
	    /**
	     * @private
	     * Clears the input field and triggers the control change.
	     */
	    Searchbar.prototype.clearInput = function () {
	        this.clear.emit(this);
	        this.value = '';
	        this.onChange(this.value);
	        this.input.emit(this);
	        this.blurInput = false;
	    };
	    /**
	     * @private
	     * Clears the input field and tells the input to blur since
	     * the clearInput function doesn't want the input to blur
	     * then calls the custom cancel function if the user passed one in.
	     */
	    Searchbar.prototype.cancelSearchbar = function () {
	        this.cancel.emit(this);
	        this.clearInput();
	        this.blurInput = true;
	    };
	    /**
	     * @private
	     * Write a new value to the element.
	     */
	    Searchbar.prototype.writeValue = function (value) {
	        this.value = value;
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
	    __decorate([
	        core_1.ViewChild(SearchbarInput), 
	        __metadata('design:type', Object)
	    ], Searchbar.prototype, "searchbarInput", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Searchbar.prototype, "cancelButtonText", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Searchbar.prototype, "hideCancelButton", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Searchbar.prototype, "placeholder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Searchbar.prototype, "ngModel", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Searchbar.prototype, "input", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Searchbar.prototype, "blur", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Searchbar.prototype, "focus", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Searchbar.prototype, "cancel", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Searchbar.prototype, "clear", void 0);
	    __decorate([
	        core_1.HostBinding('class.searchbar-focused'), 
	        __metadata('design:type', Object)
	    ], Searchbar.prototype, "isFocused", void 0);
	    __decorate([
	        core_1.HostBinding('class.searchbar-left-aligned'), 
	        __metadata('design:type', Object)
	    ], Searchbar.prototype, "shouldLeftAlign", void 0);
	    Searchbar = __decorate([
	        core_1.Component({
	            selector: 'ion-searchbar',
	            template: '<div class="searchbar-input-container">' +
	                '<button (click)="cancelSearchbar()" (mousedown)="cancelSearchbar()" clear dark class="searchbar-md-cancel">' +
	                '<ion-icon name="arrow-back"></ion-icon>' +
	                '</button>' +
	                '<div class="searchbar-search-icon"></div>' +
	                '<input [value]="value" (keyup)="inputChanged($event)" (blur)="inputBlurred()" (focus)="inputFocused()" class="searchbar-input" type="search" [attr.placeholder]="placeholder" autocomplete="off">' +
	                '<button clear *ngIf="value" class="searchbar-clear-icon" (click)="clearInput()" (mousedown)="clearInput()"></button>' +
	                '</div>' +
	                '<button clear (click)="cancelSearchbar()" (mousedown)="cancelSearchbar()" [hidden]="hideCancelButton" class="searchbar-ios-cancel">{{cancelButtonText}}</button>',
	            directives: [common_1.FORM_DIRECTIVES, common_1.NgIf, common_1.NgClass, icon_1.Icon, button_1.Button, SearchbarInput]
	        }),
	        __param(2, core_1.Optional()), 
	        __metadata('design:paramtypes', [core_1.ElementRef, config_1.Config, common_1.NgControl])
	    ], Searchbar);
	    return Searchbar;
	})(ion_1.Ion);
	exports.Searchbar = Searchbar;


/***/ },
/* 78 */
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
	var app_1 = __webpack_require__(14);
	var config_1 = __webpack_require__(7);
	var keyboard_1 = __webpack_require__(16);
	var nav_controller_1 = __webpack_require__(43);
	var view_controller_1 = __webpack_require__(37);
	/**
	 * @name Nav
	 * @description
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
	 * @usage
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
	 * @demo /docs/v2/demos/navigation/
	 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
	 */
	var Nav = (function (_super) {
	    __extends(Nav, _super);
	    function Nav(hostNavCtrl, viewCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer) {
	        _super.call(this, hostNavCtrl, app, config, keyboard, elementRef, 'contents', compiler, viewManager, zone, renderer);
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
	        if (this.root) {
	            if (typeof this.root !== 'function') {
	                throw 'The [root] property in <ion-nav> must be given a reference to a component class from within the constructor.';
	            }
	            this.push(this.root);
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', core_1.Type)
	    ], Nav.prototype, "root", void 0);
	    Nav = __decorate([
	        core_1.Component({
	            selector: 'ion-nav',
	            template: '<div #contents></div>'
	        }),
	        __param(0, core_1.Optional()),
	        __param(1, core_1.Optional()), 
	        __metadata('design:paramtypes', [nav_controller_1.NavController, view_controller_1.ViewController, app_1.IonicApp, config_1.Config, keyboard_1.Keyboard, core_1.ElementRef, core_1.Compiler, core_1.AppViewManager, core_1.NgZone, core_1.Renderer])
	    ], Nav);
	    return Nav;
	})(nav_controller_1.NavController);
	exports.Nav = Nav;


/***/ },
/* 79 */
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
	var nav_controller_1 = __webpack_require__(43);
	var nav_registry_1 = __webpack_require__(18);
	/**
	 * @name NavPush
	 * @description
	 * Directive for declaratively linking to a new page instead of using
	 * {@link ../NavController/#push NavController.push}. Similar to ui-router's `ui-sref`.
	 *
	 * @usage
	 * ```html
	 * <button [navPush]="pushPage"></button>
	 * ```
	 * To specify parameters you can use array syntax or the `nav-params` property:
	 * ```html
	 * <button [navPush]="pushPage" [navParams]="params"></button>
	 * ```
	 * Where `pushPage` and `params` are specified in your component, and `pushPage`
	 * contains a reference to a [@Page component](../../../config/Page/):
	 *
	 * ```ts
	 * import {LoginPage} from 'login';
	 * @Page({
	 *   template: `<button [navPush]="pushPage" [navParams]="params"></button>`
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
	 * <button [navPush]="[pushPage, params]"></button>
	 * ```
	 * @demo /docs/v2/demos/navigation/
	 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
	 * @see {@link ../NavPop NavPop API Docs}
	 */
	var NavPush = (function () {
	    function NavPush(_nav, registry) {
	        this._nav = _nav;
	        this.registry = registry;
	        if (!_nav) {
	            void 0;
	        }
	    }
	    /**
	     * @private
	     */
	    NavPush.prototype.onClick = function () {
	        var destination, params;
	        if (this.navPush instanceof Array) {
	            if (this.navPush.length > 2) {
	                throw 'Too many [navPush] arguments, expects [View, { params }]';
	            }
	            destination = this.navPush[0];
	            params = this.navPush[1] || this.navParams;
	        }
	        else {
	            destination = this.navPush;
	            params = this.navParams;
	        }
	        if (typeof destination === "string") {
	            destination = this.registry.get(destination);
	        }
	        this._nav && this._nav.push(destination, params);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NavPush.prototype, "navPush", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], NavPush.prototype, "navParams", void 0);
	    NavPush = __decorate([
	        core_1.Directive({
	            selector: '[navPush]',
	            host: {
	                '(click)': 'onClick()',
	                'role': 'link'
	            }
	        }),
	        __param(0, core_1.Optional()), 
	        __metadata('design:paramtypes', [nav_controller_1.NavController, nav_registry_1.NavRegistry])
	    ], NavPush);
	    return NavPush;
	})();
	exports.NavPush = NavPush;
	/**
	 * @name NavPop
	 * @description
	 * Directive for declaratively pop the current page off from the navigation stack.
	 *
	 * @usage
	 * ```html
	 * <ion-content>
	 *  <div block button nav-pop>go back</div>
	 * </ion-content>
	 * ```
	 * This will go back one page in the navigation stack
	 *
	 * Similar to {@link /docs/v2/api/components/nav/NavPush/ `NavPush` }
	 * @demo /docs/v2/demos/navigation/
	 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
	 * @see {@link ../NavPush NavPush API Docs}
	 */
	var NavPop = (function () {
	    /**
	     * TODO
	     * @param {NavController} nav  TODO
	     */
	    function NavPop(_nav) {
	        this._nav = _nav;
	        if (!_nav) {
	            void 0;
	        }
	    }
	    /**
	     * @private
	     */
	    NavPop.prototype.onClick = function () {
	        this._nav && this._nav.pop();
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
	        __metadata('design:paramtypes', [nav_controller_1.NavController])
	    ], NavPop);
	    return NavPop;
	})();
	exports.NavPop = NavPop;


/***/ },
/* 80 */
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
	var nav_1 = __webpack_require__(78);
	/**
	 * @private
	 */
	var NavRouter = (function (_super) {
	    __extends(NavRouter, _super);
	    function NavRouter(_elementRef, _loader, _parentRouter, nameAttr, _nav) {
	        _super.call(this, _elementRef, _loader, _parentRouter, nameAttr);
	        this._nav = _nav;
	        // register this router with Ionic's NavController
	        // Ionic's NavController will call this NavRouter's "stateChange"
	        // method when the NavController has...changed its state
	        _nav.registerRouter(this);
	    }
	    /**
	     * @private
	     * TODO
	     * @param {ComponentInstruction} instruction  TODO
	     */
	    NavRouter.prototype.activate = function (nextInstruction) {
	        var previousInstruction = this['_currentInstruction'];
	        this['_currentInstruction'] = nextInstruction;
	        var componentType = nextInstruction.componentType;
	        var childRouter = this['_parentRouter'].childRouter(componentType);
	        // prevent double navigations to the same view
	        var lastView = this._nav.last();
	        if (this._nav.isTransitioning() || lastView && lastView.componentType === componentType && lastView.data === nextInstruction.params) {
	            return Promise.resolve();
	        }
	        // tell the NavController which componentType, and it's params, to navigate to
	        return this._nav.push(componentType, nextInstruction.params);
	    };
	    NavRouter.prototype.reuse = function (nextInstruction) {
	        return Promise.resolve();
	    };
	    /**
	     * Called by Ionic after a transition has completed.
	     * @param {string} direction  The direction of the state change
	     * @param {ViewController} viewCtrl  The entering ViewController
	     */
	    NavRouter.prototype.stateChange = function (direction, viewCtrl) {
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
	            var componentInstruction = pathRecognizer.generate(viewCtrl.data);
	            // create a ResolvedInstruction from the componentInstruction
	            var instruction = new ResolvedInstruction(componentInstruction, null, null);
	            this['_parentRouter'].navigateByInstruction(instruction);
	        }
	    };
	    /**
	     * TODO
	     * @param {TODO} componentType  TODO
	     * @returns {TODO} TODO
	     */
	    NavRouter.prototype.getPathRecognizerByComponent = function (componentType) {
	        // given a componentType, figure out the best PathRecognizer to use
	        var rules = this['_parentRouter'].registry._rules;
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
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader, router_1.Router, String, nav_1.Nav])
	    ], NavRouter);
	    return NavRouter;
	})(router_1.RouterOutlet);
	exports.NavRouter = NavRouter;
	// TODO: hacked from
	// https://github.com/angular/angular/blob/6ddfff5cd59aac9099aa6da5118c5598eea7ea11/modules/angular2/src/router/instruction.ts#L207
	var ResolvedInstruction = (function (_super) {
	    __extends(ResolvedInstruction, _super);
	    function ResolvedInstruction(component, child, auxInstruction) {
	        _super.call(this, component, child, auxInstruction);
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
/* 81 */
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
	var app_1 = __webpack_require__(14);
	/**
	 * @name Id
	 * @description
	 * IdRef is an easy way to identify unique components in an app and access them
	 * no matter where in the UI heirarchy you are. For example, this makes toggling
	 * a global side menu feasible from any place in the application.
	 *
	 * See the [Menu section](http://ionicframework.com/docs/v2/components/#menus) of
	 * the Component docs for an example of how Menus rely on ID's.
	 *
	 * @usage
	 * To give any component an ID, simply set its `id` property:
	 * ```html
	 * <ion-checkbox id="myCheckbox"></ion-checkbox>
	 * ```
	 *
	 * To get a reference to the registered component, inject the [IonicApp](../IonicApp/)
	 * service:
	 * ```ts
	 * constructor(app: IonicApp) {
	 *    this.app = app
	 * }
	 * ngAfterViewInit{
	 *  var checkbox = this.app.getComponent("myCheckbox");
	 *  if (checkbox.checked) {
	 *    console.log('checkbox is checked');
	 *  }
	 * }
	 * ```
	 *
	 * *NOTE:* It is not recommended to use ID's across Pages, as there is often no
	 * guarantee that the registered component has not been destroyed if its Page
	 * has been navigated away from.
	 *
	 * @demo /docs/v2/demos/id/
	 */
	var IdRef = (function () {
	    function IdRef(_app, elementRef, appViewManager) {
	        this._app = _app;
	        // Grab the component this directive is attached to
	        this._component = appViewManager.getComponent(elementRef);
	    }
	    /**
	     * @private
	     */
	    IdRef.prototype.ngOnInit = function () {
	        this._app.register(this.id, this._component);
	    };
	    /**
	     * @private
	     */
	    IdRef.prototype.ngOnDestroy = function () {
	        this._app.unregister(this.id);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], IdRef.prototype, "id", void 0);
	    IdRef = __decorate([
	        core_1.Directive({
	            selector: '[id]'
	        }), 
	        __metadata('design:paramtypes', [app_1.IonicApp, core_1.ElementRef, core_1.AppViewManager])
	    ], IdRef);
	    return IdRef;
	})();
	exports.IdRef = IdRef;
	/**
	 * @private
	 */
	var Attr = (function () {
	    function Attr(_renderer, _elementRef) {
	        this._renderer = _renderer;
	        this._elementRef = _elementRef;
	    }
	    /**
	     * @private
	     */
	    Attr.prototype.ngOnInit = function () {
	        this._renderer.setElementAttribute(this._elementRef.nativeElement, this.attr, '');
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Attr.prototype, "attr", void 0);
	    Attr = __decorate([
	        core_1.Directive({
	            selector: '[attr]'
	        }), 
	        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
	    ], Attr);
	    return Attr;
	})();
	exports.Attr = Attr;


/***/ },
/* 82 */
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
	var platform_1 = __webpack_require__(8);
	/**
	 * @private
	 */
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
	 * @name ShowWhen
	 * @description
	 * The `showWhen` attribute takes a string that represents a plaform or screen orientation.
	 * The element the attribute is added to will only be shown when that platform or screen orientation is active.
	 * Complements the [hideWhen attribute](../HideWhen).
	 * @usage
	 * ```html
	 * <div showWhen="ios">I am only visible on iOS!</div>
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
	            selector: '[showWhen]',
	            host: {
	                '[hidden]': 'hidden'
	            }
	        }),
	        __param(0, core_1.Attribute('showWhen')), 
	        __metadata('design:paramtypes', [String, platform_1.Platform, core_1.NgZone])
	    ], ShowWhen);
	    return ShowWhen;
	})(DisplayWhen);
	exports.ShowWhen = ShowWhen;
	/**
	 * @name HideWhen
	 * @description
	 * The `hideWhen` attribute takes a string that represents a plaform or screen orientation.
	 * The element the attribute is added to will only be hidden when that platform or screen orientation is active.
	 * Complements the [showWhen attribute](../ShowWhen).
	 * @usage
	 * ```html
	 * <div hideWhen="android">I am hidden on Android!</div>
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
	            selector: '[hideWhen]',
	            host: {
	                '[hidden]': 'hidden'
	            }
	        }),
	        __param(0, core_1.Attribute('hideWhen')), 
	        __metadata('design:paramtypes', [String, platform_1.Platform, core_1.NgZone])
	    ], HideWhen);
	    return HideWhen;
	})(DisplayWhen);
	exports.HideWhen = HideWhen;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var core_1 = __webpack_require__(3);
	var browser_1 = __webpack_require__(15);
	var tap_click_1 = __webpack_require__(20);
	var bootstrap_1 = __webpack_require__(2);
	var directives_1 = __webpack_require__(24);
	var _reflect = Reflect;
	/**
	* @name App
	* @description
	* App is an Ionic decorator that bootstraps an application. It can be passed a
	* number of arguments that act as global config variables for the app.
	* `@App` is similar to Angular's `@Component` in which it can accept a `template`
	* property that has an inline template, or a `templateUrl` property that points
	* to an external html template.
	*
	* @usage
	* ```ts
	* import {App} from 'ionic/ionic';
	*
	* @App({
	*   templateUrl: 'app/app.html',
	*   providers: [DataService]
	* })
	*
	* export class MyApp{
	*   // Anything we would want to do at the root of our app
	* }
	* ```
	*
	* @property {object} [config] - the app's {@link /docs/v2/api/config/Config/ Config} object.
	* @property {boolean} [prodMode] - Enable Angular's production mode, which turns off assertions and other checks within the framework. Defaults to `false`.
	* @property {array}  [pipes] - any pipes for your app.
	* @property {array}  [providers] - any providers for your app.
	* @property {string} [template] - the template to use for the app root.
	* @property {string} [templateUrl] - a relative URL pointing to the template to use for the app root.
	*/
	function App(args) {
	    if (args === void 0) { args = {}; }
	    return function (cls) {
	        // get current annotations
	        var annotations = _reflect.getMetadata('annotations', cls) || [];
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
	        _reflect.defineMetadata('annotations', annotations, cls);
	        // define array of bootstrap providers
	        var providers = bootstrap_1.ionicProviders(args).concat(args.providers || []);
	        if (args.prodMode) {
	            core_1.enableProdMode();
	        }
	        browser_1.bootstrap(cls, providers).then(function (appRef) {
	            appRef.injector.get(tap_click_1.TapClick);
	        });
	        return cls;
	    };
	}
	exports.App = App;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var core_1 = __webpack_require__(3);
	var directives_1 = __webpack_require__(24);
	var _reflect = Reflect;
	/**
	 * @name Page
	 * @description
	 *
	 * The Page decorator indicates that the decorated class is an Ionic
	 * navigation component, meaning it can be navigated to using a NavController.
	 *
	 * Pages have all `IONIC_DIRECTIVES`, which include all Ionic components and directives,
	 * as well as Angular's [CORE_DIRECTIVES](https://angular.io/docs/js/latest/api/core/CORE_DIRECTIVES-const.html)
	 * and [FORM_DIRECTIVES](https://angular.io/docs/js/latest/api/core/FORM_DIRECTIVES-const.html),
	 * already provided to them, so you only need to supply custom components and directives to your pages:
	 *
	 * @usage
	 *
	 * ```ts
	 * @Page({
	 *   template: `
	 *    <ion-content>
	 *      I am a page!
	 *    </ion-content>
	 *   `
	 * })
	 * class MyPage {}
	 * ```
	 *
	 * Here [Content](../../../components/content/Content/) will load because
	 * it is in `IONIC_DIRECTIVES`, so there is no need to add a `directives` array.
	 *
	 *
	 * Say you built a custom component that uses the already existing Ionic component.
	 * In this case, you would add `IONIC_DIRECTIVES` to your directives array.
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
	 *
	 * ```ts
	 * import {Checkbox, Icon} from 'ionic/ionic'
	 * ```
	 *
	 * along with any other components and add them individually:
	 *
	 * ```
	 * @Component({
	 *   ...
	 *   directives: [Checkbox, Icon]
	 * })
	 * ```
	 *
	 * However, using IONIC_DIRECTIVES will always *Just Work* with no
	 * performance overhead, so there is really no reason to not always use it.
	 *
	 * Pages have their content automatically wrapped in `<ion-view>`, so although
	 * you may see these tags if you inspect your markup, you don't need to include
	 * them in your templates.
	 *
	 * For more information on how pages are created, see the [NavController API reference](../../components/nav/NavController/#creating_pages)
	 */
	function Page(config) {
	    return function (cls) {
	        config.selector = 'ion-page';
	        config.directives = config.directives ? config.directives.concat(directives_1.IONIC_DIRECTIVES) : directives_1.IONIC_DIRECTIVES;
	        config.host = config.host || {};
	        config.host['[hidden]'] = '_hidden';
	        config.host['[class.tab-subpage]'] = '_tabSubPage';
	        var annotations = _reflect.getMetadata('annotations', cls) || [];
	        annotations.push(new core_1.Component(config));
	        _reflect.defineMetadata('annotations', annotations, cls);
	        return cls;
	    };
	}
	exports.Page = Page;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(14));
	__export(__webpack_require__(81));
	__export(__webpack_require__(86));
	__export(__webpack_require__(68));
	__export(__webpack_require__(50));
	__export(__webpack_require__(42));
	__export(__webpack_require__(66));
	__export(__webpack_require__(51));
	__export(__webpack_require__(40));
	__export(__webpack_require__(71));
	__export(__webpack_require__(63));
	__export(__webpack_require__(65));
	__export(__webpack_require__(17));
	__export(__webpack_require__(27));
	__export(__webpack_require__(87));
	__export(__webpack_require__(36));
	__export(__webpack_require__(48));
	__export(__webpack_require__(64));
	__export(__webpack_require__(60));
	__export(__webpack_require__(82));
	__export(__webpack_require__(88));
	__export(__webpack_require__(78));
	__export(__webpack_require__(43));
	__export(__webpack_require__(37));
	__export(__webpack_require__(38));
	__export(__webpack_require__(79));
	__export(__webpack_require__(80));
	__export(__webpack_require__(39));
	__export(__webpack_require__(69));
	__export(__webpack_require__(26));
	__export(__webpack_require__(54));
	__export(__webpack_require__(75));
	__export(__webpack_require__(76));
	__export(__webpack_require__(52));
	__export(__webpack_require__(53));
	__export(__webpack_require__(77));
	__export(__webpack_require__(74));
	__export(__webpack_require__(67));
	__export(__webpack_require__(56));
	__export(__webpack_require__(58));
	__export(__webpack_require__(20));
	__export(__webpack_require__(70));
	__export(__webpack_require__(41));


/***/ },
/* 86 */
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
	var common_1 = __webpack_require__(25);
	var animation_1 = __webpack_require__(47);
	var transition_1 = __webpack_require__(46);
	var config_1 = __webpack_require__(7);
	var icon_1 = __webpack_require__(40);
	var util_1 = __webpack_require__(9);
	var nav_params_1 = __webpack_require__(38);
	var view_controller_1 = __webpack_require__(37);
	/**
	 * @name ActionSheet
	 * @description
	 * An Action Sheet is a dialog that lets the user choose from a set of
	 * options. It appears on top of the app's content, and must be manually
	 * dismissed by the user before they can resume interaction with the app.
	 * Dangerous (destructive) options are made obvious. There are easy
	 * ways to cancel out of the action sheet, such as tapping the backdrop or
	 * hitting the escape key on desktop.
	 *
	 * An action sheet is created from an array of `buttons`, with each button
	 * including properties for its `text`, and optionally a `handler` and `role`.
	 * If a handler returns `false` then the action sheet will not be dismissed. An
	 * action sheet can also optionally have a `title` and a `subTitle`.
	 *
	 * A button's `role` property can either be `destructive` or `cancel`. Buttons
	 * without a role property will have a default look for its platform. Buttons
	 * with the `cancel` role will always load as the bottom button, no matter where
	 * it shows up in the array. All other buttons will show up in the order they
	 * have been added to the `buttons` array. Note: We recommend that `destructive`
	 * buttons show be the first button in the array, making it the button on top.
	 * Additionally, if the action sheet is dismissed by tapping the backdrop, then
	 * it will fire the handler from the button with the cancel role.
	 *
	 * Its shorthand is to add all the action sheet's options from within the
	 * `ActionSheet.create(opts)` first argument. Otherwise the action sheet's
	 * instance has methods to add options, such as `setTitle()` or `addButton()`.
	 *
	 * @usage
	 * ```ts
	 * constructor(nav: NavController) {
	 *   this.nav = nav;
	 * }
	 *
	 * presentActionSheet() {
	 *   let actionSheet = ActionSheet.create({
	 *     title: 'Modify your album',
	 *     buttons: [
	 *       {
	 *         text: 'Destructive',
	 *         role: 'destructive',
	 *         handler: () => {
	 *           console.log('Destructive clicked');
	 *         }
	 *       },
	 *       {
	 *         text: 'Archive',
	 *         handler: () => {
	 *           console.log('Archive clicked');
	 *         }
	 *       },
	 *       {
	 *         text: 'Cancel',
	 *         role: 'cancel',
	 *         handler: () => {
	 *           console.log('Cancel clicked');
	 *         }
	 *       }
	 *     ]
	 *   });
	 *
	 *   this.nav.present(actionSheet);
	 * }
	 * ```
	 *
	 * @demo /docs/v2/demos/action-sheet/
	 * @see {@link /docs/v2/components#action-sheets ActionSheet Component Docs}
	 */
	var ActionSheet = (function (_super) {
	    __extends(ActionSheet, _super);
	    function ActionSheet(opts) {
	        if (opts === void 0) { opts = {}; }
	        opts.buttons = opts.buttons || [];
	        opts.enableBackdropDismiss = util_1.isDefined(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
	        _super.call(this, ActionSheetCmp, opts);
	        this.viewType = 'action-sheet';
	    }
	    /**
	    * @private
	    */
	    ActionSheet.prototype.getTransitionName = function (direction) {
	        var key = 'actionSheet' + (direction === 'back' ? 'Leave' : 'Enter');
	        return this._nav && this._nav.config.get(key);
	    };
	    /**
	     * @param {string} title Action sheet title
	     */
	    ActionSheet.prototype.setTitle = function (title) {
	        this.data.title = title;
	    };
	    /**
	     * @param {string} subTitle Action sheet subtitle
	     */
	    ActionSheet.prototype.setSubTitle = function (subTitle) {
	        this.data.subTitle = subTitle;
	    };
	    /**
	     * @param {object} button Action sheet button
	     */
	    ActionSheet.prototype.addButton = function (button) {
	        this.data.buttons.push(button);
	    };
	    /**
	     * @param {object} opts Action sheet options
	     */
	    ActionSheet.create = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        return new ActionSheet(opts);
	    };
	    return ActionSheet;
	})(view_controller_1.ViewController);
	exports.ActionSheet = ActionSheet;
	/**
	* @private
	*/
	var ActionSheetCmp = (function () {
	    function ActionSheetCmp(_viewCtrl, _config, elementRef, params, renderer) {
	        this._viewCtrl = _viewCtrl;
	        this._config = _config;
	        this.d = params.data;
	        if (this.d.cssClass) {
	            renderer.setElementClass(elementRef.nativeElement, this.d.cssClass, true);
	        }
	    }
	    ActionSheetCmp.prototype.onPageLoaded = function () {
	        var _this = this;
	        // normalize the data
	        var buttons = [];
	        this.d.buttons.forEach(function (button) {
	            if (typeof button === 'string') {
	                button = { text: button };
	            }
	            if (!button.cssClass) {
	                button.cssClass = '';
	            }
	            // deprecated warning
	            if (button.style) {
	                void 0;
	                button.role = button.style;
	            }
	            if (button.role === 'cancel') {
	                _this.d.cancelButton = button;
	            }
	            else {
	                if (button.role === 'destructive') {
	                    button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-destructive';
	                }
	                buttons.push(button);
	            }
	        });
	        this.d.buttons = buttons;
	        var self = this;
	        self.keyUp = function (ev) {
	            if (ev.keyCode === 27) {
	                void 0;
	                self.bdClick();
	            }
	        };
	        document.addEventListener('keyup', this.keyUp);
	    };
	    ActionSheetCmp.prototype.click = function (button, dismissDelay) {
	        var _this = this;
	        var shouldDismiss = true;
	        if (button.handler) {
	            // a handler has been provided, execute it
	            if (button.handler() === false) {
	                // if the return value of the handler is false then do not dismiss
	                shouldDismiss = false;
	            }
	        }
	        if (shouldDismiss) {
	            setTimeout(function () {
	                _this.dismiss(button.role);
	            }, dismissDelay || this._config.get('pageTransitionDelay'));
	        }
	    };
	    ActionSheetCmp.prototype.bdClick = function () {
	        if (this.d.enableBackdropDismiss) {
	            if (this.d.cancelButton) {
	                this.click(this.d.cancelButton, 1);
	            }
	            else {
	                this.dismiss('backdrop');
	            }
	        }
	    };
	    ActionSheetCmp.prototype.dismiss = function (role) {
	        return this._viewCtrl.dismiss(null, role);
	    };
	    ActionSheetCmp.prototype.onPageWillLeave = function () {
	        document.removeEventListener('keyup', this.keyUp);
	    };
	    ActionSheetCmp.prototype.ngOnDestroy = function () {
	        document.removeEventListener('keyup', this.keyUp);
	    };
	    ActionSheetCmp = __decorate([
	        core_1.Component({
	            selector: 'ion-action-sheet',
	            template: '<div (click)="bdClick()" tappable disable-activated class="backdrop" role="presentation"></div>' +
	                '<div class="action-sheet-wrapper">' +
	                '<div class="action-sheet-container">' +
	                '<div class="action-sheet-group">' +
	                '<div class="action-sheet-title" *ngIf="d.title">{{d.title}}</div>' +
	                '<div class="action-sheet-sub-title" *ngIf="d.subTitle">{{d.subTitle}}</div>' +
	                '<button (click)="click(b)" *ngFor="#b of d.buttons" class="action-sheet-button disable-hover" [ngClass]="b.cssClass">' +
	                '<ion-icon [name]="b.icon" *ngIf="b.icon" class="action-sheet-icon"></ion-icon> ' +
	                '{{b.text}}' +
	                '<ion-button-effect></ion-button-effect>' +
	                '</button>' +
	                '</div>' +
	                '<div class="action-sheet-group" *ngIf="d.cancelButton">' +
	                '<button (click)="click(d.cancelButton)" class="action-sheet-button action-sheet-cancel disable-hover" [ngClass]="d.cancelButton.cssClass">' +
	                '<ion-icon [name]="d.cancelButton.icon" *ngIf="d.cancelButton.icon" class="action-sheet-icon"></ion-icon> ' +
	                '{{d.cancelButton.text}}' +
	                '<ion-button-effect></ion-button-effect>' +
	                '</button>' +
	                '</div>' +
	                '</div>' +
	                '</div>',
	            host: {
	                'role': 'dialog'
	            },
	            directives: [common_1.NgFor, common_1.NgIf, icon_1.Icon]
	        }), 
	        __metadata('design:paramtypes', [view_controller_1.ViewController, config_1.Config, core_1.ElementRef, nav_params_1.NavParams, core_1.Renderer])
	    ], ActionSheetCmp);
	    return ActionSheetCmp;
	})();
	var ActionSheetSlideIn = (function (_super) {
	    __extends(ActionSheetSlideIn, _super);
	    function ActionSheetSlideIn(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        var ele = enteringView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
	        backdrop.fromTo('opacity', 0.01, 0.4);
	        wrapper.fromTo('translateY', '100%', '0%');
	        this.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(backdrop).add(wrapper);
	    }
	    return ActionSheetSlideIn;
	})(transition_1.Transition);
	transition_1.Transition.register('action-sheet-slide-in', ActionSheetSlideIn);
	var ActionSheetSlideOut = (function (_super) {
	    __extends(ActionSheetSlideOut, _super);
	    function ActionSheetSlideOut(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        var ele = leavingView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
	        backdrop.fromTo('opacity', 0.4, 0);
	        wrapper.fromTo('translateY', '0%', '100%');
	        this.easing('cubic-bezier(.36,.66,.04,1)').duration(300).add(backdrop).add(wrapper);
	    }
	    return ActionSheetSlideOut;
	})(transition_1.Transition);
	transition_1.Transition.register('action-sheet-slide-out', ActionSheetSlideOut);
	var ActionSheetMdSlideIn = (function (_super) {
	    __extends(ActionSheetMdSlideIn, _super);
	    function ActionSheetMdSlideIn(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        var ele = enteringView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
	        backdrop.fromTo('opacity', 0.01, 0.26);
	        wrapper.fromTo('translateY', '100%', '0%');
	        this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add(backdrop).add(wrapper);
	    }
	    return ActionSheetMdSlideIn;
	})(transition_1.Transition);
	transition_1.Transition.register('action-sheet-md-slide-in', ActionSheetMdSlideIn);
	var ActionSheetMdSlideOut = (function (_super) {
	    __extends(ActionSheetMdSlideOut, _super);
	    function ActionSheetMdSlideOut(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        var ele = leavingView.pageRef().nativeElement;
	        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
	        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
	        backdrop.fromTo('opacity', 0.26, 0);
	        wrapper.fromTo('translateY', '0%', '100%');
	        this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add(backdrop).add(wrapper);
	    }
	    return ActionSheetMdSlideOut;
	})(transition_1.Transition);
	transition_1.Transition.register('action-sheet-md-slide-out', ActionSheetMdSlideOut);


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var menu_controller_1 = __webpack_require__(17);
	var animation_1 = __webpack_require__(47);
	/**
	 * Menu Type
	 * Base class which is extended by the various types. Each
	 * type will provide their own animations for open and close
	 * and registers itself with Menu.
	 * @private
	 */
	var MenuType = (function () {
	    function MenuType() {
	        this.ani = new animation_1.Animation();
	    }
	    MenuType.prototype.setOpen = function (shouldOpen, done) {
	        this.ani
	            .onFinish(done, true)
	            .reverse(!shouldOpen)
	            .play();
	    };
	    MenuType.prototype.setProgressStart = function (isOpen) {
	        this.isOpening = !isOpen;
	        // the cloned animation should not use an easing curve during seek
	        this.ani
	            .reverse(isOpen)
	            .progressStart();
	    };
	    MenuType.prototype.setProgessStep = function (stepValue) {
	        // adjust progress value depending if it opening or closing
	        this.ani.progressStep(stepValue);
	    };
	    MenuType.prototype.setProgressEnd = function (shouldComplete, currentStepValue, done) {
	        var _this = this;
	        var isOpen = (this.isOpening && shouldComplete);
	        if (!this.isOpening && !shouldComplete) {
	            isOpen = true;
	        }
	        this.ani.onFinish(function () {
	            _this.isOpening = false;
	            done(isOpen);
	        }, true);
	        this.ani.progressEnd(shouldComplete, currentStepValue);
	    };
	    MenuType.prototype.destroy = function () {
	        this.ani && this.ani.destroy();
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
	        var openedX = (menu.width() * (menu.side == 'right' ? -1 : 1)) + 'px';
	        this.ani
	            .easing('ease')
	            .duration(250);
	        var contentOpen = new animation_1.Animation(menu.getContentElement());
	        contentOpen.fromTo('translateX', '0px', openedX);
	        this.ani.add(contentOpen);
	    }
	    return MenuRevealType;
	})(MenuType);
	menu_controller_1.MenuController.registerType('reveal', MenuRevealType);
	/**
	 * Menu Push Type
	 * The content slides over to reveal the menu underneath.
	 * The menu itself also slides over to reveal its bad self.
	 */
	var MenuPushType = (function (_super) {
	    __extends(MenuPushType, _super);
	    function MenuPushType(menu) {
	        _super.call(this);
	        this.ani
	            .easing('ease')
	            .duration(250);
	        var contentOpenedX, menuClosedX, menuOpenedX;
	        if (menu.side == 'right') {
	            contentOpenedX = -menu.width() + 'px';
	            menuOpenedX = (menu._platform.width() - menu.width()) + 'px';
	            menuClosedX = menu._platform.width() + 'px';
	        }
	        else {
	            contentOpenedX = menu.width() + 'px';
	            menuOpenedX = '0px';
	            menuClosedX = -menu.width() + 'px';
	        }
	        var menuAni = new animation_1.Animation(menu.getMenuElement());
	        menuAni.fromTo('translateX', menuClosedX, menuOpenedX);
	        this.ani.add(menuAni);
	        var contentApi = new animation_1.Animation(menu.getContentElement());
	        contentApi.fromTo('translateX', '0px', contentOpenedX);
	        this.ani.add(contentApi);
	    }
	    return MenuPushType;
	})(MenuType);
	menu_controller_1.MenuController.registerType('push', MenuPushType);
	/**
	 * Menu Overlay Type
	 * The menu slides over the content. The content
	 * itself, which is under the menu, does not move.
	 */
	var MenuOverlayType = (function (_super) {
	    __extends(MenuOverlayType, _super);
	    function MenuOverlayType(menu) {
	        _super.call(this);
	        this.ani
	            .easing('ease')
	            .duration(250);
	        var closedX, openedX;
	        if (menu.side == 'right') {
	            // right side
	            closedX = menu._platform.width() + 'px';
	            openedX = (menu._platform.width() - menu.width() - 8) + 'px';
	        }
	        else {
	            // left side
	            closedX = -menu.width() + 'px';
	            openedX = '8px';
	        }
	        var menuAni = new animation_1.Animation(menu.getMenuElement());
	        menuAni.fromTo('translateX', closedX, openedX);
	        this.ani.add(menuAni);
	        var backdropApi = new animation_1.Animation(menu.getBackdropElement());
	        backdropApi.fromTo('opacity', 0.01, 0.35);
	        this.ani.add(backdropApi);
	    }
	    return MenuOverlayType;
	})(MenuType);
	menu_controller_1.MenuController.registerType('overlay', MenuOverlayType);


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var view_controller_1 = __webpack_require__(37);
	var animation_1 = __webpack_require__(47);
	var transition_1 = __webpack_require__(46);
	/**
	 * @name Modal
	 * @description
	 * A Modal is a content pane that goes over the user's current page.
	 * Usually it is used for making a choice or editing an item. A modal uses the
	 * `NavController` to
	 * {@link /docs/v2/api/components/nav/NavController/#present present}
	 * itself in the root nav stack. It is added to the stack similar to how
	 * {@link /docs/v2/api/components/nav/NavController/#push NavController.push}
	 * works.
	 *
	 * When a modal (or any other overlay such as an alert or actionsheet) is
	 * "presented" to a nav controller, the overlay is added to the app's root nav.
	 * After the modal has been presented, from within the component instance The
	 * modal can later be closed or "dismissed" by using the ViewController's
	 * `dismiss` method. Additionally, you can dismiss any overlay by using `pop`
	 * on the root nav controller.
	 *
	 * Data can be passed to a new modal through `Modal.create()` as the second
	 * argument. The data can gen be accessed from the opened page by injecting
	 * `NavParams`. Note that the page, which opened as a modal, has no special
	 * "modal" logic within it, but uses `NavParams` no differently than a
	 * standard page.
	 *
	 * @usage
	 * ```ts
	 * import {Page, Modal, NavController, NavParams} from 'ionic/ionic';
	 *
	 * @Page(...)
	 * class HomePage {
	 *
	 *  constructor(nav: NavController) {
	 *    this.nav = nav;
	 *  }
	 *
	 *  presentProfileModal() {
	 *    let profileModal = Modal.create(Profile, { userId: 8675309 });
	 *    this.nav.present(profileModal);
	 *  }
	 *
	 * }
	 *
	 * @Page(...)
	 * class Profile {
	 *
	 *  constructor(params: NavParams) {
	 *    console.log('UserId', params.get('userId'));
	 *  }
	 *
	 * }
	 * ```
	 *
	 * A modal can also emit data, which is useful when it is used to add or edit
	 * data. For example, a profile page could slide up in a modal, and on submit,
	 * the submit button could pass the updated profile data, then dismiss the
	 * modal.
	 *
	 * ```ts
	 * import {Page, Modal, NavController} from 'ionic/ionic';
	 *
	 * @Page(...)
	 * class HomePage {
	 *
	 *  constructor(nav: NavController) {
	 *    this.nav = nav;
	 *  }
	 *
	 *  presentContactModal() {
	 *    let contactModal = Modal.create(ContactUs);
	 *    this.nav.present(contactModal);
	 *  }
	 *
	 *  presentProfileModal() {
	 *    let profileModal = Modal.create(Profile, { userId: 8675309 });
	 *    profileModal.onDismiss(data => {
	 *      console.log(data);
	 *    });
	 *    this.nav.present(profileModal);
	 *  }
	 *
	 * }
	 *
	 * @Page(...)
	 * class Profile {
	 *
	 *  constructor(viewCtrl: ViewController) {
	 *    this.viewCtrl = viewCtrl;
	 *  }
	 *
	 *  dismiss() {
	 *    let data = { 'foo': 'bar' };
	 *    this.viewCtrl.dismiss(data);
	 *  }
	 *
	 * }
	 * ```
	 * @demo /docs/v2/demos/modal/
	 * @see {@link /docs/v2/components#modals Modal Component Docs}
	 */
	var Modal = (function (_super) {
	    __extends(Modal, _super);
	    function Modal(componentType, data) {
	        if (data === void 0) { data = {}; }
	        _super.call(this, componentType, data);
	        this.viewType = 'modal';
	    }
	    /**
	    * @private
	    */
	    Modal.prototype.getTransitionName = function (direction) {
	        var key = (direction === 'back' ? 'modalLeave' : 'modalEnter');
	        return this._nav && this._nav.config.get(key);
	    };
	    /**
	     * @param {any} componentType Modal
	     * @param {object} data Modal options
	     */
	    Modal.create = function (componentType, data) {
	        if (data === void 0) { data = {}; }
	        return new Modal(componentType, data);
	    };
	    return Modal;
	})(view_controller_1.ViewController);
	exports.Modal = Modal;
	/**
	 * Animations for modals
	 */
	var ModalSlideIn = (function (_super) {
	    __extends(ModalSlideIn, _super);
	    function ModalSlideIn(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        this
	            .element(enteringView.pageRef())
	            .easing('cubic-bezier(0.36,0.66,0.04,1)')
	            .duration(400)
	            .fromTo('translateY', '100%', '0%')
	            .before.addClass('show-page');
	        if (enteringView.hasNavbar()) {
	            // entering page has a navbar
	            var enteringNavBar = new animation_1.Animation(enteringView.navbarRef());
	            enteringNavBar.before.addClass('show-navbar');
	            this.add(enteringNavBar);
	        }
	    }
	    return ModalSlideIn;
	})(transition_1.Transition);
	transition_1.Transition.register('modal-slide-in', ModalSlideIn);
	var ModalSlideOut = (function (_super) {
	    __extends(ModalSlideOut, _super);
	    function ModalSlideOut(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        this
	            .element(leavingView.pageRef())
	            .easing('ease-out')
	            .duration(250)
	            .fromTo('translateY', '0%', '100%');
	    }
	    return ModalSlideOut;
	})(transition_1.Transition);
	transition_1.Transition.register('modal-slide-out', ModalSlideOut);
	var ModalMDSlideIn = (function (_super) {
	    __extends(ModalMDSlideIn, _super);
	    function ModalMDSlideIn(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        this
	            .element(enteringView.pageRef())
	            .easing('cubic-bezier(0.36,0.66,0.04,1)')
	            .duration(280)
	            .fromTo('translateY', '40px', '0px')
	            .fadeIn()
	            .before.addClass('show-page');
	        if (enteringView.hasNavbar()) {
	            // entering page has a navbar
	            var enteringNavBar = new animation_1.Animation(enteringView.navbarRef());
	            enteringNavBar.before.addClass('show-navbar');
	            this.add(enteringNavBar);
	        }
	    }
	    return ModalMDSlideIn;
	})(transition_1.Transition);
	transition_1.Transition.register('modal-md-slide-in', ModalMDSlideIn);
	var ModalMDSlideOut = (function (_super) {
	    __extends(ModalMDSlideOut, _super);
	    function ModalMDSlideOut(enteringView, leavingView, opts) {
	        _super.call(this, opts);
	        this
	            .element(leavingView.pageRef())
	            .duration(200)
	            .easing('cubic-bezier(0.47,0,0.745,0.715)')
	            .fromTo('translateY', '0px', '40px')
	            .fadeOut();
	    }
	    return ModalMDSlideOut;
	})(transition_1.Transition);
	transition_1.Transition.register('modal-md-slide-out', ModalMDSlideOut);


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(90));
	__export(__webpack_require__(91));
	__export(__webpack_require__(92));


/***/ },
/* 90 */
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
	        return this.get(key).then(function (value) {
	            try {
	                return JSON.parse(value);
	            }
	            catch (e) {
	                void 0;
	                throw e; // rethrowing exception so it can be handled with .catch()
	            }
	        });
	    };
	    Storage.prototype.setJson = function (key, value) {
	        try {
	            return this.set(key, JSON.stringify(value));
	        }
	        catch (e) {
	            return Promise.reject(e);
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
	    function StorageEngine(options) {
	        if (options === void 0) { options = {}; }
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
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var storage_1 = __webpack_require__(90);
	/**
	 * @name LocalStorage
	 * @description
	 * The LocalStorage storage engine uses the browser's local storage system for
	 * storing key/value pairs.
	 *
	 * Note: LocalStorage should ONLY be used for temporary data that you can afford to lose.
	 * Given disk space constraints on a mobile device, local storage might be "cleaned up"
	 * by the operating system (iOS).
	 *
	 * For guaranteed, long-term storage, use the SqlStorage engine which stores data in a file.
	 *
	 * @usage
	 * ```ts
	 * import {Page, Storage, LocalStorage} from 'ionic/ionic';
	 * @Page({
	 *   template: `<ion-content></ion-content>`
	 * });
	 * export class MyClass{
	 *  constructor(){
	 *    this.local = new Storage(LocalStorage);
	 *    this.local.set('didTutorial', true);
	 *  }
	 *}
	 *```
	 * @demo /docs/v2/demos/local-storage/
	 * @see {@link /docs/v2/platform/storage/ Storage Platform Docs}
	 */
	var LocalStorage = (function (_super) {
	    __extends(LocalStorage, _super);
	    function LocalStorage(options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this);
	    }
	    /**
	     * Get the value of a key in LocalStorage
	     * @param {String} key the key you want to lookup in LocalStorage
	     */
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
	    /**
	     * Set a key value pair and save it to LocalStorage
	     * @param {String} key the key you want to save to LocalStorage
	     * @param {Any} value the value of the key you're saving
	     */
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
	    /**
	     * Remove a key from LocalStorage
	     * @param {String} key the key you want to remove from LocalStorage
	     */
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
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var storage_1 = __webpack_require__(90);
	var util_1 = __webpack_require__(9);
	var DB_NAME = '__ionicstorage';
	var win = window;
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
	        var dbOptions = util_1.defaults(options, {
	            name: DB_NAME,
	            backupFlag: SqlStorage.BACKUP_LOCAL,
	            existingDatabase: false
	        });
	        if (win.sqlitePlugin) {
	            var location_1 = this._getBackupLocation(dbOptions.backupFlag);
	            this._db = win.sqlitePlugin.openDatabase(util_1.assign({
	                name: dbOptions.name,
	                location: location_1,
	                createFromLocation: dbOptions.existingDatabase ? 1 : 0
	            }, dbOptions));
	        }
	        else {
	            void 0;
	            this._db = win.openDatabase(dbOptions.name, '1.0', 'database', 5 * 1024 * 1024);
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
	                void 0;
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
	    SqlStorage.prototype.query = function (query, params) {
	        var _this = this;
	        if (params === void 0) { params = []; }
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
/* 93 */
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
	var translate_1 = __webpack_require__(23);
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
	        this.translate = {};
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
	        __metadata('design:paramtypes', [translate_1.Translate])
	    ], TranslatePipe);
	    return TranslatePipe;
	})();
	exports.TranslatePipe = TranslatePipe;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var config_1 = __webpack_require__(7);
	// iOS Mode Settings
	config_1.Config.setModeConfig('ios', {
	    activator: 'highlight',
	    actionSheetEnter: 'action-sheet-slide-in',
	    actionSheetLeave: 'action-sheet-slide-out',
	    alertEnter: 'alert-pop-in',
	    alertLeave: 'alert-pop-out',
	    backButtonText: 'Back',
	    backButtonIcon: 'ios-arrow-back',
	    iconMode: 'ios',
	    menuType: 'reveal',
	    modalEnter: 'modal-slide-in',
	    modalLeave: 'modal-slide-out',
	    pageTransition: 'ios-transition',
	    pageTransitionDelay: 16,
	    tabbarPlacement: 'bottom',
	});
	// Material Design Mode Settings
	config_1.Config.setModeConfig('md', {
	    activator: 'ripple',
	    actionSheetEnter: 'action-sheet-md-slide-in',
	    actionSheetLeave: 'action-sheet-md-slide-out',
	    alertEnter: 'alert-md-pop-in',
	    alertLeave: 'alert-md-pop-out',
	    backButtonText: '',
	    backButtonIcon: 'md-arrow-back',
	    iconMode: 'md',
	    menuType: 'overlay',
	    modalEnter: 'modal-md-slide-in',
	    modalLeave: 'modal-md-slide-out',
	    pageTransition: 'md-transition',
	    pageTransitionDelay: 96,
	    tabbarHighlight: true,
	    tabbarPlacement: 'top',
	    tabSubPages: true,
	});


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var platform_1 = __webpack_require__(8);
	var dom_1 = __webpack_require__(10);
	var win = window;
	var doc = document;
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
	            if (p.testNavigatorPlatform('linux')) {
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
	        return p.isPlatform('ios', 'ipad');
	    }
	});
	platform_1.Platform.register({
	    name: 'iphone',
	    subsets: [
	        'phablet'
	    ],
	    isMatch: function (p) {
	        return p.isPlatform('ios', 'iphone');
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
	                doc.removeEventListener('deviceready', isReady);
	                resolve();
	            }
	            dom_1.windowLoad(function () {
	                doc.addEventListener('deviceready', isReady);
	            });
	        }
	    },
	    isMatch: function () {
	        return !!(win.cordova || win.PhoneGap || win.phonegap);
	    }
	});
	function isIOSDevice(p) {
	    // shortcut function to be reused internally
	    // checks navigator.platform to see if it's an actual iOS device
	    // this does not use the user-agent string because it is often spoofed
	    // an actual iPad will return true, a chrome dev tools iPad will return false
	    return p.testNavigatorPlatform('iphone|ipad|ipod');
	}


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var animation_1 = __webpack_require__(47);
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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var animation_1 = __webpack_require__(47);
	var transition_1 = __webpack_require__(46);
	var DURATION = 500;
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
	        _super.call(this, opts);
	        this.duration(opts.duration || DURATION);
	        this.easing(opts.easing || EASING);
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
	                .fromTo(TRANSLATEX, OFF_LEFT, CENTER, true)
	                .fromTo(OPACITY, OFF_OPACITY, 1, true);
	        }
	        else {
	            // entering content, forward direction
	            enteringContent
	                .before.clearStyles([OPACITY])
	                .fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
	        }
	        if (enteringHasNavbar) {
	            // entering page has a navbar
	            var enteringNavBar = new animation_1.Animation(enteringView.navbarRef());
	            enteringNavBar.before.addClass('show-navbar');
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
	                enteringTitle.fromTo(TRANSLATEX, OFF_LEFT, CENTER, true);
	                if (enteringView.enableBack()) {
	                    // back direction, entering page has a back button
	                    enteringBackButton
	                        .before.addClass(SHOW_BACK_BTN_CSS)
	                        .fadeIn();
	                }
	            }
	            else {
	                // entering navbar, forward direction
	                enteringTitle.fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
	                if (leavingHasNavbar) {
	                    // entering navbar, forward direction, and there's a leaving navbar
	                    // should just fade in, no sliding
	                    enteringNavbarBg
	                        .before.clearStyles([TRANSLATEX])
	                        .fadeIn();
	                }
	                else {
	                    // entering navbar, forward direction, and there's no leaving navbar
	                    // should just slide in, no fading in
	                    enteringNavbarBg
	                        .before.clearStyles([OPACITY])
	                        .fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
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
	                    .before.clearStyles([OPACITY])
	                    .fromTo(TRANSLATEX, CENTER, '100%');
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
	                            .before.clearStyles([TRANSLATEX])
	                            .fadeOut();
	                    }
	                    else {
	                        // leaving navbar, back direction, and there's no entering navbar
	                        // should just slide out, no fading out
	                        leavingNavbarBg
	                            .before.clearStyles([OPACITY])
	                            .fromTo(TRANSLATEX, CENTER, '100%');
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
	})(transition_1.Transition);
	transition_1.Transition.register('ios-transition', IOSTransition);


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var animation_1 = __webpack_require__(47);
	var transition_1 = __webpack_require__(46);
	var TRANSLATEY = 'translateY';
	var OFF_BOTTOM = '40px';
	var CENTER = '0px';
	var SHOW_BACK_BTN_CSS = 'show-back-button';
	var MDTransition = (function (_super) {
	    __extends(MDTransition, _super);
	    function MDTransition(enteringView, leavingView, opts) {
	        _super.call(this, opts);
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
	            this.duration(opts.duration || 200).easing('cubic-bezier(0.47,0,0.745,0.715)');
	            enteringPage.before.clearStyles([TRANSLATEY]);
	        }
	        else {
	            this.duration(opts.duration || 280).easing('cubic-bezier(0.36,0.66,0.04,1)');
	            enteringPage
	                .fromTo(TRANSLATEY, OFF_BOTTOM, CENTER, true)
	                .fadeIn();
	        }
	        if (enteringHasNavbar) {
	            var enteringNavBar = new animation_1.Animation(enteringView.navbarRef());
	            enteringNavBar.before.addClass('show-navbar');
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
	            this.duration(opts.duration || 200).easing('cubic-bezier(0.47,0,0.745,0.715)');
	            var leavingPage = new animation_1.Animation(leavingView.pageRef());
	            this.add(leavingPage.fromTo(TRANSLATEY, CENTER, OFF_BOTTOM).fadeOut());
	        }
	    }
	    return MDTransition;
	})(transition_1.Transition);
	transition_1.Transition.register('md-transition', MDTransition);


/***/ }
/******/ ]);