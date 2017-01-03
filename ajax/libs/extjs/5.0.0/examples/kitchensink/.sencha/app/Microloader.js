// here, the extra check for window['Ext'] is needed for use with cmd-test
// code injection.  we need to make that this file will sync up with page global
// scope to avoid duplicate Ext.Boot state.  That check is after the initial Ext check
// to allow the sandboxing template to inject an appropriate Ext var and prevent the
// global detection.
var Ext = Ext || window['Ext'] || {};


//<editor-fold desc="Microloader">
/**
 * @Class Ext.Microloader
 * @singleton
 */
Ext.Microloader = Ext.Microloader || (function () {
    var apply = function (dest, src, defaults) {
            if (defaults) {
                apply(dest, defaults);
            }

            if (dest && src && typeof src == 'object') {
                for (var key in src) {
                    dest[key] = src[key];
                }
            }
            return dest;
        },
        Boot = Ext.Boot,
        _listeners = [],
        _loaded = false,
        _tags = {},
        Microloader = {

            /**
             * the global map of tags used
             */
            platformTags: _tags,

            /**
             * The defult function that detects various platforms and sets tags
             * in the platform map accrodingly.  Examples are iOS, android, tablet, etc.
             * @param tags the set of tags to populate
             */
            detectPlatformTags: function () {
                var ua = navigator.userAgent,
                    isMobile = _tags.isMobile = /Mobile(\/|\s)/.test(ua),
                    isPhone, isDesktop, isTablet, touchSupported, isIE10, isBlackberry,
                    element = document.createElement('div'),
                    uaTagChecks = [
                        'iPhone',
                        'iPod',
                        'Android',
                        'Silk',
                        'Android 2',
                        'BlackBerry',
                        'BB',
                        'iPad',
                        'RIM Tablet OS',
                        'MSIE 10',
                        'Trident',
                        'Chrome',
                        'Tizen',
                        'Firefox',
                        'Safari',
                        'Windows Phone'
                    ],
                    isEventSupported = function(name, tag) {
                        if (tag === undefined) {
                            tag = window;
                        }

                        var eventName = 'on' + name.toLowerCase(),
                            isSupported = (eventName in element);

                        if (!isSupported) {
                            if (element.setAttribute && element.removeAttribute) {
                                element.setAttribute(eventName, '');
                                isSupported = typeof element[eventName] === 'function';

                                if (typeof element[eventName] !== 'undefined') {
                                    element[eventName] = undefined;
                                }

                                element.removeAttribute(eventName);
                            }
                        }

                        return isSupported;
                    },
                    uaTags = {},
                    len = uaTagChecks.length, check, c;

                for (c = 0; c < len; c++) {
                    check = uaTagChecks[c];
                    uaTags[check] = new RegExp(check).test(ua);
                }

                isPhone =
                    (uaTags.iPhone || uaTags.iPod) ||
                        (!uaTags.Silk && (uaTags.Android && (uaTags['Android 2'] || isMobile))) ||
                        ((uaTags.BlackBerry || uaTags.BB) && uaTags.isMobile) ||
                        (uaTags['Windows Phone']);

                isTablet =
                    (!_tags.isPhone) && (
                        uaTags.iPad ||
                            uaTags.Android ||
                            uaTags.Silk ||
                            uaTags['RIM Tablet OS'] ||
                            (uaTags['MSIE 10'] && /; Touch/.test(ua))
                        );

                touchSupported =
                    // if the browser has touch events we can be reasonably sure the device has
                    // a touch screen
                    isEventSupported('touchend') ||
                        // browsers that use pointer event have maxTouchPoints > 0 if the
                        // device supports touch input
                        // http://www.w3.org/TR/pointerevents/#widl-Navigator-maxTouchPoints
                        navigator.maxTouchPoints ||
                        // IE10 uses a vendor-prefixed maxTouchPoints property
                        navigator.msMaxTouchPoints;

                isDesktop = !isPhone && !isTablet;
                isIE10 = uaTags['MSIE 10'];
                isBlackberry = uaTags.Blackberry || uaTags.BB;

                apply(_tags, Microloader.loadPlatformsParam(), {
                    phone: isPhone,
                    tablet: isTablet,
                    desktop: isDesktop,
                    touch: touchSupported,
                    ios: (uaTags.iPad || uaTags.iPhone || uaTags.iPod),
                    android: uaTags.Android || uaTags.Silk,
                    blackberry: isBlackberry,
                    safari: uaTags.Safari && isBlackberry,
                    chrome: uaTags.Chrome,
                    ie10: isIE10,
                    windows: isIE10 || uaTags.Trident,
                    tizen: uaTags.Tizen,
                    firefox: uaTags.Firefox
                });

                if (Ext.beforeLoad) {
                    Ext.beforeLoad(_tags);
                }
            },

            /**
             * Extracts user supplied platform tags from the "platformTags" query parameter
             * of the form:
             *
             * ?platformTags=name:state,name:state,...
             *
             * (each tag defaults to true when state is unspecified)
             *
             * Example:
             * ?platformTags=isTablet,isPhone:false,isDesktop:0,iOS:1,Safari:true, ...
             *
             * @returns {Object} the platform tags supplied by the query string
             */
            loadPlatformsParam: function () {
                // Check if the ?platform parameter is set in the URL
                var paramsString = window.location.search.substr(1),
                    paramsArray = paramsString.split("&"),
                    params = {}, i,
                    platforms = {},
                    tmpArray, tmplen, platform, name, enabled;

                for (i = 0; i < paramsArray.length; i++) {
                    tmpArray = paramsArray[i].split("=");
                    params[tmpArray[0]] = tmpArray[1];
                }

                if (params.platformTags) {
                    tmpArray = params.platform.split(/\W/);
                    for (tmplen = tmpArray.length, i = 0; i < tmplen; i++) {
                        platform = tmpArray[i].split(":");
                        name = platform[0];
                        if (platform.length > 1) {
                            enabled = platform[1];
                            if (enabled === 'false' || enabled === '0') {
                                enabled = false;
                            } else {
                                enabled = true;
                            }
                        }
                        platforms[name] = enabled;
                    }
                }
                return platform;
            },

            initPlatformTags: function () {
                Microloader.detectPlatformTags();
            },

            getPlatformTags: function () {
                return Microloader.platformTags;
            },

            filterPlatform: function (platform) {
                platform = [].concat(platform);
                var tags = Microloader.getPlatformTags(),
                    len, p, tag;

                for (len = platform.length, p = 0; p < len; p++) {
                    tag = platform[p];
                    if (tags.hasOwnProperty(tag)) {
                        return !!tags[tag];
                    }
                }
                return false;
            },

            init: function () {
                Microloader.initPlatformTags();
                Ext.filterPlatform = Microloader.filterPlatform;
            },

            initManifest: function (manifest) {
                Microloader.init();
                var tmpManifest = manifest || Ext.manifest;

                if (typeof tmpManifest === "string") {
                    var url = Boot.baseUrl + tmpManifest + ".json",
                        content = Boot.fetchSync(url);
                    tmpManifest = JSON.parse(content.content);
                }

                Ext.manifest = tmpManifest;
                return tmpManifest;
            },

            /**
             *
             * @param manifestDef
             */
            load: function (manifestDef) {
                var manifest = Microloader.initManifest(manifestDef),
                    loadOrder = manifest.loadOrder,
                    loadOrderMap = (loadOrder) ? Boot.createLoadOrderMap(loadOrder) : null,
                    urls = [],
                    js = manifest.js || [],
                    css = manifest.css || [],
                    resources = js.concat(css),
                    resource, i, len, include,
                    loadedFn = function () {
                        _loaded = true;
                        Microloader.notify();
                    };

                for (len = resources.length, i = 0; i < len; i++) {
                    resource = resources[i];
                    include = true;
                    if (resource.platform && !Microloader.filterPlatform(resource.platform)) {
                        include = false;
                    }
                    if (include) {
                        urls.push(resource.path);
                    }
                }


                if (loadOrder) {
                    manifest.loadOrderMap = loadOrderMap;
                }

                Boot.load({
                    url: urls,
                    loadOrder: loadOrder,
                    loadOrderMap: loadOrderMap,
                    sequential: true,
                    success: loadedFn,
                    failure: loadedFn
                });
            },

            onMicroloaderReady: function (listener) {
                if (_loaded) {
                    listener();
                } else {
                    _listeners.push(listener);
                }
            },

            /**
             * @private
             */
            notify: function () {
                var listener;
                while((listener = _listeners.shift())) {
                    listener();
                }
            }
        };

    return Microloader;
}());

//</editor-fold>

/**
 * the current application manifest
 *
 *
 * {
 *  name: 'name',
 *  version: <checksum>,
 *  debug: {
 *      hooks: {
 *          "*": true
 *      }
 *  },
 *  localStorage: false,
 *  mode: production,
 *  js: [
 *      ...
 *      {
 *          path: '../boo/baz.js',
 *          version: <checksum>,
 *          update: full | delta | <falsy>,
 *          platform: ['phone', 'ios', 'android']
 *      },
 *      {
 *          path: 'http://some.domain.com/api.js',
 *          remote: true
 *      },
 *      ...
 *  ],
 *  css: [
 *      ...
 *      {
 *          path: '../boo/baz.css',
 *          version: <checksum>,
 *          update: full | delta | <falsy>,
 *          platform: ['phone', 'ios', 'android']
 *      },
 *      ...
 *  ],
 *  localStorage: false,
 *  paths: {...},
 *  loadOrder: [
 *      ...
 *      {
 *          path: '../foo/bar.js",
 *          idx: 158,
 *          requires; [1,2,3,...,145,157],
 *          uses: [182, 193]
 *      },
 *      ...
 *  ],
 *  classes: {
 *      ...
 *      'Ext.panel.Panel': {
 *          requires: [...],
 *          uses: [...],
 *          aliases: [...],
 *          alternates: [...],
 *          mixins: [...]
 *      },
 *      'Ext.rtl.util.Renderable': {
 *          requires: [...],
 *          uses: [...],
 *          aliases: [...],
 *          alternates: [...],
 *          mixins: [...]
 *          override: 'Ext.util.Renderable'
 *      },
 *      ...
 *  },
 *  packages: {
 *      ...
 *      "sencha-core": {
 *          version: '1.2.3.4',
 *          requires: []
 *      },
 *      "ext": {
 *          version: '5.0.0.0',
 *          requires: ["sencha-core"]
 *      }.
 *      ...
 *  }
 * }
 *
 *
 * @type {String/Object}
 */
Ext.manifest = Ext.manifest || "bootstrap";

Ext.Microloader.load();