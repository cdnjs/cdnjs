(function (angular) {
    "use strict";
    angular.module("ng.deviceDetector", [])
        .constant("BROWSERS", {
            CHROME: "chrome",
            FIREFOX: "firefox",
            SAFARI: "safari",
            OPERA: "opera",
            IE: "ie",
            PS4: "ps4",
            VITA: "vita",
            UNKNOWN: "unknown"
        })
        .constant("DEVICES", {
            ANDROID: "android",
            IPAD: "ipad",
            IPHONE: "iphone",
            IPOD: "ipod",
            BLACKBERRY: "blackberry",
            FIREFOXOS: "firefoxos",
            WINDOWSPHONE: "windows-phone",
            PS4: "ps4",
            VITA: "vita",
            UNKNOWN: "unknown"
        })
        .constant("OS", {
            WINDOWS: "windows",
            MAC: "mac",
            IOS: "ios",
            ANDROID: "android",
            LINUX: "linux",
            UNIX: "unix",
            FIREFOXOS: "firefoxos",
            WINDOWSPHONE: "windows-phone",
            PS4: "ps4",
            VITA: "vita",
            UNKNOWN: "unknown"
        })
        .constant("OS_VERSIONS", {
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
            WINDOWS_NT_4_0: "windows-nt-4-0",
            UNKNOWN: "unknown"
        })
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
                    return (deviceInfo.os === OS.IOS || deviceInfo.device === DEVICES.IPOD || deviceInfo.device === DEVICES.IPHONE);
                };
            }
        ])
        .factory("deviceDetector", ["$window", "DEVICES", "BROWSERS", "OS", "OS_VERSIONS",
            function ($window, DEVICES, BROWSERS, OS, OS_VERSIONS) {

                var OS_RE = {
                    WINDOWS: {and: [{or: [/\bWindows|(Win\d\d)\b/, /\bWin 9x\b/]}, {not: /\bWindows Phone\b/}]},
                    MAC: /\bMac OS\b/,
                    IOS: {or: [/\biPad\b/, /\biPhone\b/, /\biPod\b/]},
                    ANDROID: /\bAndroid\b/,
                    LINUX: /\bLinux\b/,
                    UNIX: /\bUNIX\b/,
                    FIREFOXOS: {and: [/\bFirefox\b/, /Mobile\b/]},
                    WINDOWSPHONE: /\bIEMobile\b/,
                    PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
                    VITA: /\bMozilla\/5.0 \(Play(S|s)tation Vita\b/
                };

                var BROWSERS_RE = {
                    CHROME: {and:[{or: [/\bChrome\b/, /\bCriOS\b/]},{not:/\bOPR\b/}]},
                    FIREFOX: /\bFirefox\b/,
                    SAFARI: {and:[/^((?!CriOS).)*\Safari\b.*$/,{not:/\bOPR\b/}]},
                    OPERA: {or:[/Opera\b/,/\bOPR\b/]},
                    IE: {or: [/\bMSIE\b/, /\bTrident\b/]},
                    PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
                    VITA: /\bMozilla\/5.0 \(Play(S|s)tation Vita\b/
                };

                var DEVICES_RE = {
                    ANDROID: /\bAndroid\b/,
                    IPAD: /\biPad\b/,
                    IPHONE: /\biPhone\b/,
                    IPOD: /\biPod\b/,
                    BLACKBERRY: /\bblackberry\b/,
                    FIREFOXOS: {and: [/\bFirefox\b/, /\bMobile\b/]},
                    WINDOWSPHONE: /\bIEMobile\b/,
                    PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
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
                    WINDOWS_NT_4_0: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
                };

                var BROWSER_VERSIONS_RE_MAP = {
                    CHROME:/\bChrome\/([\d\.]+)\b/,
                    FIREFOX:/\bFirefox\/([\d\.]+)\b/,
                    SAFARI:/\bVersion\/([\d\.]+)\b/,
                    OPERA:[/\bVersion\/([\d\.]+)\b/,/\bOPR\/([\d\.]+)\b/],
                    IE:[/\bMSIE ([\d\.]+\w?)\b/,/\brv:([\d\.]+\w?)\b/]
                };

                var BROWSER_VERSIONS_RE = Object.keys(BROWSER_VERSIONS_RE_MAP).reduce(function (obj, key) {
                    obj[BROWSERS[key]]=BROWSER_VERSIONS_RE_MAP[key];
                    return obj;
                },{});

                function test(string, regex) {
                    if (regex instanceof RegExp) {
                        return regex.test(string);
                    }
                    else if (regex && Array.isArray(regex.and)) {
                        return regex.and.every(function (item) {
                            return test(string, item);
                        });
                    }
                    else if (regex && Array.isArray(regex.or)) {
                        return regex.or.some(function (item) {
                            return test(string, item);
                        });
                    }
                    else if (regex && regex.not) {
                        return !test(string, regex.not);
                    }
                    else {
                        return false;
                    }
                }

                function exec(string, regex) {
                    if (regex instanceof RegExp) {
                        return regex.exec(string);
                    }
                    else if (regex && Array.isArray(regex)) {
                        return regex.reduce(function (res,item) {
                            return (!!res)?res:exec(string, item);
                        },null);
                    }
                    else {
                        return null;
                    }
                }

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
                    obj[OS[item]] = test(ua, OS_RE[item]);
                    return obj;
                }, {});

                deviceInfo.raw.browser = Object.keys(BROWSERS).reduce(function (obj, item) {
                    obj[BROWSERS[item]] = test(ua, BROWSERS_RE[item]);
                    return obj;
                }, {});

                deviceInfo.raw.device = Object.keys(DEVICES).reduce(function (obj, item) {
                    obj[DEVICES[item]] = test(ua, DEVICES_RE[item]);
                    return obj;
                }, {});

                deviceInfo.raw.os_version = Object.keys(OS_VERSIONS).reduce(function (obj, item) {
                    obj[OS_VERSIONS[item]] = test(ua, OS_VERSIONS_RE[item]);
                    return obj;
                }, {});

                deviceInfo.os = [
                    OS.WINDOWS,
                    OS.IOS,
                    OS.MAC,
                    OS.ANDROID,
                    OS.LINUX,
                    OS.UNIX,
                    OS.FIREFOXOS,
                    OS.WINDOWSPHONE,
                    OS.PS4,
                    OS.VITA
                ].reduce(function (previousValue, currentValue) {
                        return (previousValue === OS.UNKNOWN && deviceInfo.raw.os[currentValue]) ? currentValue : previousValue;
                    }, OS.UNKNOWN);

                deviceInfo.browser = [
                    BROWSERS.CHROME,
                    BROWSERS.FIREFOX,
                    BROWSERS.SAFARI,
                    BROWSERS.OPERA,
                    BROWSERS.IE,
                    BROWSERS.PS4,
                    BROWSERS.VITA
                ].reduce(function (previousValue, currentValue) {
                        return (previousValue === BROWSERS.UNKNOWN && deviceInfo.raw.browser[currentValue]) ? currentValue : previousValue;
                    }, BROWSERS.UNKNOWN);

                deviceInfo.device = [
                    DEVICES.ANDROID,
                    DEVICES.IPAD,
                    DEVICES.IPHONE,
                    DEVICES.IPOD,
                    DEVICES.BLACKBERRY,
                    DEVICES.FIREFOXOS,
                    DEVICES.WINDOWSPHONE,
                    DEVICES.PS4,
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
                    OS_VERSIONS.WINDOWS_NT_4_0
                ].reduce(function (previousValue, currentValue) {
                        return (previousValue === OS_VERSIONS.UNKNOWN && deviceInfo.raw.os_version[currentValue]) ? currentValue : previousValue;
                    }, OS_VERSIONS.UNKNOWN);

                deviceInfo.browser_version = "0";
                if (deviceInfo.browser !== BROWSERS.UNKNOWN) {
                    var re = BROWSER_VERSIONS_RE[deviceInfo.browser];
                    var res = exec(ua,re);
                    if (!!res) {
                        deviceInfo.browser_version = res[1];
                    }
                }

                deviceInfo.isMobile = function () {
                    return [
                        DEVICES.ANDROID,
                        DEVICES.IPAD,
                        DEVICES.IPHONE,
                        DEVICES.IPOD,
                        DEVICES.BLACKBERRY,
                        DEVICES.FIREFOXOS,
                        DEVICES.WINDOWSPHONE,
                        DEVICES.VITA
                    ].some(function (item) {
                            return deviceInfo.device == item;
                        });
                };

                deviceInfo.isTablet = function () {
                    return [
                        DEVICES.IPAD,
                        DEVICES.FIREFOXOS
                    ].some(function (item) {
                            return deviceInfo.device == item;
                        });
                };

                deviceInfo.isDesktop = function () {
                    return [
                        DEVICES.PS4,
                        DEVICES.UNKNOWN
                    ].some(function (item) {
                            return deviceInfo.device == item;
                        });
                };

                return deviceInfo;
            }
        ])
        .directive('deviceDetector', ["deviceDetector", function (deviceDetector) {
            return {
                restrict: "A",
                link: function (scope, elm/*, attrs*/) {
                    elm.addClass('os-' + deviceDetector.os);
                    elm.addClass('browser-' + deviceDetector.browser);
                    elm.addClass('device-' + deviceDetector.device);
                }
            };
        }]);
})(angular);
