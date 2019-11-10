(function (angular) {
    "use strict";

    var BROWSERS = {
        CHROME: "chrome",
        FIREFOX: "firefox",
        SAFARI: "safari",
        OPERA: "opera",
        IE: "ie",
        MS_EDGE: "ms-edge",
        FB_MESSENGER: "fb-messenger",
        CORDOVA: "cordova",
        UNKNOWN: "unknown"
    };

    var DEVICES = {
        ANDROID: "android",
        I_PAD: "ipad",
        IPHONE: "iphone",
        I_POD: "ipod",
        BLACKBERRY: "blackberry",
        FIREFOX_OS: "firefox-os",
        CHROME_BOOK: "chrome-book",
        WINDOWS_PHONE: "windows-phone",
        PS4: "ps4",
        VITA: "vita",
        CHROMECAST: "chromecast",
        APPLE_TV: "apple-tv",
        GOOGLE_TV: "google-tv",
        UNKNOWN: "unknown"
    };

    var OS = {
        WINDOWS: "windows",
        MAC: "mac",
        IOS: "ios",
        ANDROID: "android",
        LINUX: "linux",
        UNIX: "unix",
        FIREFOX_OS: "firefox-os",
        CHROME_OS: "chrome-os",
        WINDOWS_PHONE: "windows-phone",
        UNKNOWN: "unknown"
    };

    var OS_VERSIONS = {
        WINDOWS_3_11: "windows-3-11",
        WINDOWS_95: "windows-95",
        WINDOWS_ME: "windows-me",
        WINDOWS_98: "windows-98",
        WINDOWS_CE: "windows-ce",
        WINDOWS_2000: "windows-2000",
        WINDOWS_XP: "windows-xp",
        WINDOWS_SERVER_2003: "windows-server-2003",
        WINDOWS_VISTA: "windows-vista",
        WINDOWS_7: "windows-7",
        WINDOWS_8_1: "windows-8-1",
        WINDOWS_8: "windows-8",
        WINDOWS_10: "windows-10",
        WINDOWS_PHONE_7_5: "windows-phone-7-5",
        WINDOWS_PHONE_8_1: "windows-phone-8-1",
        WINDOWS_PHONE_10: "windows-phone-10",
        WINDOWS_NT_4_0: "windows-nt-4-0",
        MACOSX_15: "mac-os-x-15",
        MACOSX_14: "mac-os-x-14",
        MACOSX_13: "mac-os-x-13",
        MACOSX_12: "mac-os-x-12",
        MACOSX_11: "mac-os-x-11",
        MACOSX_10: "mac-os-x-10",
        MACOSX_9: "mac-os-x-9",
        MACOSX_8: "mac-os-x-8",
        MACOSX_7: "mac-os-x-7",
        MACOSX_6: "mac-os-x-6",
        MACOSX_5: "mac-os-x-5",
        MACOSX_4: "mac-os-x-4",
        MACOSX_3: "mac-os-x-3",
        MACOSX_2: "mac-os-x-2",
        MACOSX: "mac-os-x",
        UNKNOWN: "unknown"
    };

    var OS_RE = {
        WINDOWS: {and: [{or: [/\bWindows|(Win\d\d)\b/, /\bWin 9x\b/]}, {not: /\bWindows Phone\b/}]},
        MAC: {and: [/\bMac OS\b/, {not: /Windows Phone/}]},
        IOS: {and: [{or: [/\biPad\b/, /\biPhone\b/, /\biPod\b/]}, {not: /Windows Phone/}]},
        ANDROID: {and: [/\bAndroid\b/, {not: /Windows Phone/}]},
        LINUX: /\bLinux\b/,
        UNIX: /\bUNIX\b/,
        FIREFOX_OS: {and: [/\bFirefox\b/, /Mobile\b/]},
        CHROME_OS: /\bCrOS\b/,
        WINDOWS_PHONE: {or: [/\bIEMobile\b/, /\bWindows Phone\b/]},
        PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
        VITA: /\bMozilla\/5.0 \(Play(S|s)tation Vita\b/
    };

    var BROWSERS_RE = {
        CHROME: {and: [{or: [/\bChrome\b/, /\bCriOS\b/]}, {not: {or: [/\bOPR\b/, /\bEdge\b/, /\bCordova\b/]}}]},
        FIREFOX: {and: [{or: [/\bFirefox\b/, /\bFxiOS\b/]}, {not: /\bCordova\b/}]},
        SAFARI: {and: [/^((?!CriOS).)*\Safari\b.*$/, {not: {or: [/\bOPR\b/, /\bEdge\b/, /Windows Phone/, /\bCordova\b/,/\bChrome\b/]}}]},
        OPERA: {or: [/Opera\b/, /\bOPR\b/]},
        IE: {or: [/\bMSIE\b/, /\bTrident\b/, /^Mozilla\/5\.0 \(Windows NT 10\.0; Win64; x64\)$/]},
        MS_EDGE: {or: [/\bEdge\b/]},
        PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
        VITA: /\bMozilla\/5.0 \(Play(S|s)tation Vita\b/,
        CORDOVA: /\bCordova\b/,
        FB_MESSENGER: /\bFBAN\/MessengerForiOS\b/
    };

    var DEVICES_RE = {
        ANDROID: {and: [/\bAndroid\b/, {not: /Windows Phone/}]},
        I_PAD: /\biPad\b/,
        IPHONE: {and: [/\biPhone\b/, {not: /Windows Phone/}]},
        I_POD: /\biPod\b/,
        BLACKBERRY: /\bblackberry\b/,
        FIREFOX_OS: {and: [/\bFirefox\b/, /\bMobile\b/]},
        CHROME_BOOK: /\bCrOS\b/,
        WINDOWS_PHONE: {or: [/\bIEMobile\b/, /\bWindows Phone\b/]},
        PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
        CHROMECAST: /\bCrKey\b/,
        APPLE_TV: /^iTunes-AppleTV\/4.1$/,
        GOOGLE_TV: /\bGoogleTV\b/,
        VITA: /\bMozilla\/5.0 \(Play(S|s)tation Vita\b/
    };

    var OS_VERSIONS_RE = {
        WINDOWS_3_11: /Win16/,
        WINDOWS_95: /(Windows 95|Win95|Windows_95)/,
        WINDOWS_ME: /(Win 9x 4.90|Windows ME)/,
        WINDOWS_98: /(Windows 98|Win98)/,
        WINDOWS_CE: /Windows CE/,
        WINDOWS_2000: /(Windows NT 5.0|Windows 2000)/,
        WINDOWS_XP: /(Windows NT 5.1|Windows XP)/,
        WINDOWS_SERVER_2003: /Windows NT 5.2/,
        WINDOWS_VISTA: /Windows NT 6.0/,
        WINDOWS_7: /(Windows 7|Windows NT 6.1)/,
        WINDOWS_8_1: /(Windows 8.1|Windows NT 6.3)/,
        WINDOWS_8: /(Windows 8|Windows NT 6.2)/,
        WINDOWS_10: /(Windows NT 10.0)/,
        WINDOWS_PHONE_7_5: /(Windows Phone OS 7.5)/,
        WINDOWS_PHONE_8_1: /(Windows Phone 8.1)/,
        WINDOWS_PHONE_10: /(Windows Phone 10)/,
        WINDOWS_NT_4_0: {and: [/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/, {not: /Windows NT 10.0/}]},
        MACOSX: /(MAC OS X\s*[^ 0-9])/,
        MACOSX_3: /(Darwin 10.3|Mac OS X 10.3)/,
        MACOSX_4: /(Darwin 10.4|Mac OS X 10.4)/,
        MACOSX_5: /(Mac OS X 10.5)/,
        MACOSX_6: /(Mac OS X 10.6)/,
        MACOSX_7: /(Mac OS X 10.7)/,
        MACOSX_8: /(Mac OS X 10.8)/,
        MACOSX_9: /(Mac OS X 10.9)/,
        MACOSX_10: /(Mac OS X 10.10)/,
        MACOSX_11: /(Mac OS X 10.11)/,
        MACOSX_12: /(Mac OS X 10.12)/,
        MACOSX_13: /(Mac OS X 10.13)/,
        MACOSX_14: /(Mac OS X 10.14)/,
        MACOSX_15: /(Mac OS X 10.15)/
    };

    var BROWSER_VERSIONS_RE_MAP = {
        CHROME: [/\bChrome\/([\d\.]+)\b/, /\bCriOS\/([\d\.]+)\b/],
        FIREFOX: [/\bFirefox\/([\d\.]+)\b/, /\bFxiOS\/([\d\.]+)\b/],
        SAFARI: /\bVersion\/([\d\.]+)\b/,
        OPERA: [/\bVersion\/([\d\.]+)\b/, /\bOPR\/([\d\.]+)\b/],
        IE: [/\bMSIE ([\d\.]+\w?)\b/, /\brv:([\d\.]+\w?)\b/],
        CORDOVA: /\bCordova\/([\d\.]+)\b/,
        MS_EDGE: /\bEdge\/([\d\.]+)\b/
    };

    var BROWSER_VERSIONS_RE = Object.keys(BROWSER_VERSIONS_RE_MAP).reduce(function (obj, key) {
        obj[BROWSERS[key]] = BROWSER_VERSIONS_RE_MAP[key];
        return obj;
    }, {});

    angular.module("ng.deviceDetector", ["reTree"])
        .constant("OS_RE", OS_RE)

        .constant("BROWSERS_RE", BROWSERS_RE)

        .constant("DEVICES_RE", DEVICES_RE)

        .constant("OS_VERSIONS_RE", OS_VERSIONS_RE)

        .constant("BROWSER_VERSIONS_RE_MAP", BROWSER_VERSIONS_RE_MAP)

        .constant("BROWSER_VERSIONS_RE", BROWSER_VERSIONS_RE)

        .constant("BROWSERS", BROWSERS)

        .constant("DEVICES", DEVICES)

        .constant("OS", OS)

        .constant("OS_VERSIONS", OS_VERSIONS)
        
        .service("detectUtils", ["deviceDetector", "DEVICES", "BROWSERS", "OS",
            function (deviceDetector, DEVICES, BROWSERS, OS) {
                var deviceInfo = deviceDetector;

                this.isMobile = function () {
                    return deviceInfo.device !== 'unknown';
                };

                this.isAndroid = function () {
                    return (deviceInfo.device === DEVICES.ANDROID || deviceInfo.OS === OS.ANDROID);
                };

                this.isIOS = function () {
                    return (deviceInfo.os === OS.IOS || deviceInfo.device === DEVICES.I_POD || deviceInfo.device === DEVICES.IPHONE);
                };
            }
        ])
        .provider("deviceDetector", function () {
                var customDetectors = [];
                this.addCustom = function (customDetectorName, customDetectorRE) {
                    customDetectors.push({name: customDetectorName, re: customDetectorRE});
                };
                this.$get = [
                    "$window", 
                    "DEVICES", 
                    "BROWSERS", 
                    "OS", 
                    "OS_VERSIONS", 
                    "reTree",
                    "OS_RE",
                    "BROWSERS_RE",
                    "DEVICES_RE",
                    "OS_VERSIONS_RE",
                    "BROWSER_VERSIONS_RE_MAP",
                    "BROWSER_VERSIONS_RE",
                    function (
                        $window, 
                        DEVICES, 
                        BROWSERS, 
                        OS, 
                        OS_VERSIONS, 
                        reTree,
                        OS_RE,
                        BROWSERS_RE,
                        DEVICES_RE,
                        OS_VERSIONS_RE,
                        BROWSER_VERSIONS_RE_MAP,
                        BROWSER_VERSIONS_RE
                    ) {
                    /* ES5 polyfills Start*/

                    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
                    if (!Object.keys) {
                        Object.keys = (function () {
                            'use strict';
                            var hasOwnProperty = Object.prototype.hasOwnProperty,
                                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                                dontEnums = [
                                    'toString',
                                    'toLocaleString',
                                    'valueOf',
                                    'hasOwnProperty',
                                    'isPrototypeOf',
                                    'propertyIsEnumerable',
                                    'constructor'
                                ],
                                dontEnumsLength = dontEnums.length;

                            return function (obj) {
                                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                                    throw new TypeError('Object.keys called on non-object');
                                }

                                var result = [], prop, i;

                                for (prop in obj) {
                                    if (hasOwnProperty.call(obj, prop)) {
                                        result.push(prop);
                                    }
                                }

                                if (hasDontEnumBug) {
                                    for (i = 0; i < dontEnumsLength; i++) {
                                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                                            result.push(dontEnums[i]);
                                        }
                                    }
                                }
                                return result;
                            };
                        }());
                    }

                    // Production steps of ECMA-262, Edition 5, 15.4.4.21
                    // Reference: http://es5.github.io/#x15.4.4.21
                    if (!Array.prototype.reduce) {
                        Array.prototype.reduce = function (callback /*, initialValue*/) {
                            'use strict';
                            if (this == null) {
                                throw new TypeError('Array.prototype.reduce called on null or undefined');
                            }
                            if (typeof callback !== 'function') {
                                throw new TypeError(callback + ' is not a function');
                            }
                            var t = Object(this), len = t.length >>> 0, k = 0, value;
                            if (arguments.length == 2) {
                                value = arguments[1];
                            } else {
                                while (k < len && !(k in t)) {
                                    k++;
                                }
                                if (k >= len) {
                                    throw new TypeError('Reduce of empty array with no initial value');
                                }
                                value = t[k++];
                            }
                            for (; k < len; k++) {
                                if (k in t) {
                                    value = callback(value, t[k], k, t);
                                }
                            }
                            return value;
                        };
                    }
                    /* ES5 polyfills End*/

                    var ua = $window.navigator.userAgent;

                    var deviceInfo = {
                        raw: {
                            userAgent: ua,
                            os: {},
                            browser: {},
                            device: {}
                        }
                    };

                    deviceInfo.raw.os = Object.keys(OS).reduce(function (obj, item) {
                        obj[OS[item]] = reTree.test(ua, OS_RE[item]);
                        return obj;
                    }, {});

                    deviceInfo.raw.browser = Object.keys(BROWSERS).reduce(function (obj, item) {
                        obj[BROWSERS[item]] = reTree.test(ua, BROWSERS_RE[item]);
                        return obj;
                    }, {});

                    deviceInfo.raw.device = Object.keys(DEVICES).reduce(function (obj, item) {
                        obj[DEVICES[item]] = reTree.test(ua, DEVICES_RE[item]);
                        return obj;
                    }, {});

                    deviceInfo.raw.os_version = Object.keys(OS_VERSIONS).reduce(function (obj, item) {
                        obj[OS_VERSIONS[item]] = reTree.test(ua, OS_VERSIONS_RE[item]);
                        return obj;
                    }, {});

                    deviceInfo.os = [
                        OS.WINDOWS,
                        OS.IOS,
                        OS.MAC,
                        OS.ANDROID,
                        OS.LINUX,
                        OS.UNIX,
                        OS.FIREFOX_OS,
                        OS.CHROME_OS,
                        OS.WINDOWS_PHONE
                    ].reduce(function (previousValue, currentValue) {
                        return (previousValue === OS.UNKNOWN && deviceInfo.raw.os[currentValue]) ? currentValue : previousValue;
                    }, OS.UNKNOWN);

                    deviceInfo.browser = [
                        BROWSERS.CHROME,
                        BROWSERS.FIREFOX,
                        BROWSERS.SAFARI,
                        BROWSERS.OPERA,
                        BROWSERS.IE,
                        BROWSERS.MS_EDGE,
                        BROWSERS.CORDOVA,
                        BROWSERS.FB_MESSENGER
                    ].reduce(function (previousValue, currentValue) {
                        return (previousValue === BROWSERS.UNKNOWN && deviceInfo.raw.browser[currentValue]) ? currentValue : previousValue;
                    }, BROWSERS.UNKNOWN);

                    deviceInfo.device = [
                        DEVICES.ANDROID,
                        DEVICES.I_PAD,
                        DEVICES.IPHONE,
                        DEVICES.I_POD,
                        DEVICES.BLACKBERRY,
                        DEVICES.FIREFOX_OS,
                        DEVICES.CHROME_BOOK,
                        DEVICES.WINDOWS_PHONE,
                        DEVICES.PS4,
                        DEVICES.CHROMECAST,
                        DEVICES.APPLE_TV,
                        DEVICES.GOOGLE_TV,
                        DEVICES.VITA
                    ].reduce(function (previousValue, currentValue) {
                        return (previousValue === DEVICES.UNKNOWN && deviceInfo.raw.device[currentValue]) ? currentValue : previousValue;
                    }, DEVICES.UNKNOWN);

                    deviceInfo.os_version = [
                        OS_VERSIONS.WINDOWS_3_11,
                        OS_VERSIONS.WINDOWS_95,
                        OS_VERSIONS.WINDOWS_ME,
                        OS_VERSIONS.WINDOWS_98,
                        OS_VERSIONS.WINDOWS_CE,
                        OS_VERSIONS.WINDOWS_2000,
                        OS_VERSIONS.WINDOWS_XP,
                        OS_VERSIONS.WINDOWS_SERVER_2003,
                        OS_VERSIONS.WINDOWS_VISTA,
                        OS_VERSIONS.WINDOWS_7,
                        OS_VERSIONS.WINDOWS_8_1,
                        OS_VERSIONS.WINDOWS_8,
                        OS_VERSIONS.WINDOWS_10,
                        OS_VERSIONS.WINDOWS_PHONE_7_5,
                        OS_VERSIONS.WINDOWS_PHONE_8_1,
                        OS_VERSIONS.WINDOWS_PHONE_10,
                        OS_VERSIONS.WINDOWS_NT_4_0,
                        OS_VERSIONS.MACOSX,
                        OS_VERSIONS.MACOSX_3,
                        OS_VERSIONS.MACOSX_4,
                        OS_VERSIONS.MACOSX_5,
                        OS_VERSIONS.MACOSX_6,
                        OS_VERSIONS.MACOSX_7,
                        OS_VERSIONS.MACOSX_8,
                        OS_VERSIONS.MACOSX_9,
                        OS_VERSIONS.MACOSX_10,
                        OS_VERSIONS.MACOSX_11,
                        OS_VERSIONS.MACOSX_12,
                        OS_VERSIONS.MACOSX_13,
                        OS_VERSIONS.MACOSX_14,
                        OS_VERSIONS.MACOSX_15
                    ].reduce(function (previousValue, currentValue) {
                        return (previousValue === OS_VERSIONS.UNKNOWN && deviceInfo.raw.os_version[currentValue]) ? currentValue : previousValue;
                    }, OS_VERSIONS.UNKNOWN);

                    deviceInfo.browser_version = "0";
                    if (deviceInfo.browser !== BROWSERS.UNKNOWN) {
                        var re = BROWSER_VERSIONS_RE[deviceInfo.browser];
                        var res = reTree.exec(ua, re);
                        if (!!res) {
                            deviceInfo.browser_version = res[1];
                        }
                    }

                    deviceInfo.isMobile = function () {
                        return [
                            DEVICES.ANDROID,
                            DEVICES.I_PAD,
                            DEVICES.IPHONE,
                            DEVICES.I_POD,
                            DEVICES.BLACKBERRY,
                            DEVICES.FIREFOX_OS,
                            DEVICES.WINDOWS_PHONE,
                            DEVICES.VITA
                        ].some(function (item) {
                            return deviceInfo.device == item;
                        });
                    };

                    deviceInfo.isTablet = function () {
                        return [
                            DEVICES.I_PAD,
                            DEVICES.FIREFOX_OS
                        ].some(function (item) {
                            return deviceInfo.device == item;
                        });
                    };

                    deviceInfo.isDesktop = function () {
                        return [
                            DEVICES.PS4,
                            DEVICES.CHROME_BOOK,
                            DEVICES.UNKNOWN
                        ].some(function (item) {
                            return deviceInfo.device == item;
                        });
                    };

                    deviceInfo.custom = customDetectors.reduce(function (custom, customDetector) {
                        custom[customDetector.name] = reTree.test(ua, customDetector.re);
                        return custom;
                    }, {});
                    return deviceInfo;
                }];
            }
        )
        .directive('deviceDetector', ["deviceDetector", function (deviceDetector) {
            function customClassName(name) {
                return 'is-' + name.toLowerCase().replace(/[^0-9a-z]+/g, '-');
            }

            return {
                restrict: "A",
                link: function (scope, elm/*, attrs*/) {
                    elm.addClass('os-' + deviceDetector.os);
                    elm.addClass('browser-' + deviceDetector.browser);
                    elm.addClass('device-' + deviceDetector.device);
                    elm.toggleClass('is-mobile', deviceDetector.isMobile());
                    elm.toggleClass('is-tablet', deviceDetector.isTablet());
                    elm.toggleClass('is-desktop', deviceDetector.isDesktop());
                    Object.keys(deviceDetector.custom).forEach(function (customKey) {
                        elm.toggleClass(customClassName(customKey), deviceDetector.custom[customKey]);
                    });
                }
            };
        }]);
})(angular);
