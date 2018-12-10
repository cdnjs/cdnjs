(function (angular) {
    "use strict";

    angular.module("ng.deviceDetector", ["reTree", "uaDeviceDetector"])
        .service("detectUtils", ["deviceDetector", "uaDeviceDetector",
            function (deviceDetector, uaDeviceDetector) {
                var deviceInfo = deviceDetector;

                this.isMobile = function () {
                    return deviceInfo.device !== 'unknown';
                };

                this.isAndroid = function () {
                    return (deviceInfo.device === uaDeviceDetector.DEVICES.ANDROID || deviceInfo.OS === uaDeviceDetector.OS.ANDROID);
                };

                this.isIOS = function () {
                    return (deviceInfo.os === uaDeviceDetector.OS.IOS || deviceInfo.device === uaDeviceDetector.DEVICES.I_POD ||
                        deviceInfo.device === uaDeviceDetector.DEVICES.IPHONE);
                };
            }
        ])
        .provider("deviceDetector", function () {
            var customDetectors = [];
            this.addCustom = function (customDetectorName, customDetectorRE) {
                customDetectors.push({ name: customDetectorName, re: customDetectorRE });
            };
            this.$get = [
                "$window",
                "uaDeviceDetector",
                "reTree",
                function (
                    $window,
                    uaDeviceDetector,
                    reTree
                ) {
                    var ua = $window.navigator.userAgent;
                    var deviceInfo = uaDeviceDetector.parseUserAgent(ua, customDetectors);
                    deviceInfo.parseUserAgent = function (ua) { return uaDeviceDetector.parseUserAgent(ua, customDetectors) };
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
