(function(angular) {
"use strict";
angular.module("ng.deviceDetector",[])
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
.service("detectUtils", ["deviceDetector", "DEVICES", "BROWSERS", "OS",
    function(deviceDetector, DEVICES, BROWSERS, OS) {
        var deviceInfo = deviceDetector;

        this.isMobile = function () {
            return deviceInfo.device !== 'unknown';
        };

        this.isAndroid = function(){
            return (deviceInfo.device === DEVICES.ANDROID || deviceInfo.OS === OS.ANDROID);
        };

        this.isIOS = function(){
            return (deviceInfo.os === OS.IOS || deviceInfo.device === DEVICES.IPOD || deviceInfo.device === DEVICES.IPHONE);
        };
    }
])
.factory("deviceDetector", ["$window", "DEVICES", "BROWSERS", "OS",
	function ($window, DEVICES, BROWSERS, OS) {
		var ua=$window.navigator.userAgent;

		var deviceInfo = {
		    raw: {
		        userAgent: ua,
		        os:{},
		        browser:{},
		        device:{}
			}
		};

		deviceInfo.raw.os[OS.WINDOWS]=/\bWindows\b/.test(ua) && !/\bWindows Phone\b/.test(ua);
		deviceInfo.raw.os[OS.MAC]=/\bMac OS\b/.test(ua);
		deviceInfo.raw.os[OS.IOS]=/\biPad\b/.test(ua) || /\biPhone\b/.test(ua) || /\biPod\b/.test(ua);
		deviceInfo.raw.os[OS.ANDROID]=/\bAndroid\b/.test(ua);
		deviceInfo.raw.os[OS.LINUX]=/\bLinux\b/.test(ua);
		deviceInfo.raw.os[OS.UNIX]=/\bUNIX\b/.test(ua);
		deviceInfo.raw.os[OS.FIREFOXOS]=/\bFirefox\b/.test(ua) && /\Mobile\b/.test(ua);
		deviceInfo.raw.os[OS.WINDOWSPHONE]=/\bIEMobile\b/.test(ua);
		deviceInfo.raw.os[OS.PS4]=/\bMozilla\/5.0 \(PlayStation 4\b/.test(ua);
        deviceInfo.raw.os[OS.VITA]=/\bMozilla\/5.0 \(Play(S|s)tation Vita\b/.test(ua);

		deviceInfo.raw.browser[BROWSERS.CHROME]=/\bChrome\b/.test(ua) || /\bCriOS\b/.test(ua);
		deviceInfo.raw.browser[BROWSERS.FIREFOX]=/\Firefox\b/.test(ua);
		deviceInfo.raw.browser[BROWSERS.SAFARI]=/^((?!CriOS).)*\Safari\b.*$/.test(ua);
		deviceInfo.raw.browser[BROWSERS.OPERA]=/\Opera\b/.test(ua);
		deviceInfo.raw.browser[BROWSERS.IE]=/\bMSIE\b/.test(ua) || /\Trident\b/.test(ua);
		deviceInfo.raw.browser[BROWSERS.PS4]=/\bMozilla\/5.0 \(PlayStation 4\b/.test(ua);
		deviceInfo.raw.browser[BROWSERS.VITA]=/\bMozilla\/5.0 \(Play(S|s)tation Vita\b/.test(ua);

		deviceInfo.raw.device[DEVICES.ANDROID]=/\bAndroid\b/.test(ua);
		deviceInfo.raw.device[DEVICES.IPAD]=/\biPad\b/.test(ua);
		deviceInfo.raw.device[DEVICES.IPHONE]=/\biPhone\b/.test(ua);
		deviceInfo.raw.device[DEVICES.IPOD]=/\biPod\b/.test(ua);
		deviceInfo.raw.device[DEVICES.BLACKBERRY]=/\bblackberry\b/.test(ua);
		deviceInfo.raw.device[DEVICES.FIREFOXOS]=/\bFirefox\b/.test(ua) && /\Mobile\b/.test(ua);
		deviceInfo.raw.device[DEVICES.WINDOWSPHONE]=/\bIEMobile\b/.test(ua);
		deviceInfo.raw.device[DEVICES.PS4]=/\bMozilla\/5.0 \(PlayStation 4\b/.test(ua);
        deviceInfo.raw.device[DEVICES.VITA]=/\bMozilla\/5.0 \(Play(S|s)tation Vita\b/.test(ua);

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
			].reduce(function(previousValue, currentValue) {
			return (previousValue===OS.UNKNOWN && deviceInfo.raw.os[currentValue])? currentValue : previousValue;
		},OS.UNKNOWN);

		deviceInfo.browser = [
			BROWSERS.CHROME,
			BROWSERS.FIREFOX,
			BROWSERS.SAFARI,
			BROWSERS.OPERA,
			BROWSERS.IE,
			BROWSERS.PS4,
			BROWSERS.VITA
		].reduce(function(previousValue, currentValue) {
			return (previousValue===BROWSERS.UNKNOWN && deviceInfo.raw.browser[currentValue])? currentValue : previousValue;
		},BROWSERS.UNKNOWN);

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
		].reduce(function(previousValue, currentValue) {
			return (previousValue===DEVICES.UNKNOWN && deviceInfo.raw.device[currentValue])? currentValue : previousValue;
		},DEVICES.UNKNOWN);

		deviceInfo.isMobile= function () {
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
				return deviceInfo.device==item;
			});
		};

		deviceInfo.isTablet= function () {
			return [
				DEVICES.IPAD,
				DEVICES.FIREFOXOS
			].some(function (item) {
					return deviceInfo.device==item;
				});
		};

		deviceInfo.isDesktop= function () {
			return [
				DEVICES.PS4,
				DEVICES.UNKNOWN
			].some(function (item) {
					return deviceInfo.device==item;
				});
		};

		return deviceInfo;
	}
])
.directive('deviceDetector', ["deviceDetector",function (deviceDetector) {
	return {
		restrict: "A",
		link: function (scope, elm/*, attrs*/) {
			elm.addClass('os-'+deviceDetector.os);
			elm.addClass('browser-'+deviceDetector.browser);
			elm.addClass('device-'+deviceDetector.device);
		}
	};
}]);
})(angular);
