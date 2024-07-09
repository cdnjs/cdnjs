/*!
 * DevExpress Gantt (dx-gantt)
 * Version: 4.1.56
 * Build date: Mon Jun 10 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExpress licensing here: https://www.devexpress.com/Support/EULAs
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DevExpress"] = factory();
	else
		root["DevExpress"] = root["DevExpress"] || {}, root["DevExpress"]["Gantt"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 9279:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Browser = void 0;
var Browser = (function () {
    function Browser() {
    }
    Browser.IdentUserAgent = function (userAgent, ignoreDocumentMode) {
        if (ignoreDocumentMode === void 0) { ignoreDocumentMode = false; }
        var browserTypesOrderedList = ['Mozilla', 'IE', 'Firefox', 'Netscape', 'Safari', 'Chrome', 'Opera', 'Opera10', 'Edge'];
        var defaultBrowserType = 'IE';
        var defaultPlatform = 'Win';
        var defaultVersions = { Safari: 2, Chrome: 0.1, Mozilla: 1.9, Netscape: 8, Firefox: 2, Opera: 9, IE: 6, Edge: 12 };
        if (!userAgent || userAgent.length === 0) {
            Browser.fillUserAgentInfo(browserTypesOrderedList, defaultBrowserType, defaultVersions[defaultBrowserType], defaultPlatform);
            return;
        }
        userAgent = userAgent.toLowerCase();
        Browser.indentPlatformMajorVersion(userAgent);
        try {
            var platformIdentStrings = {
                'Windows': 'Win',
                'Macintosh': 'Mac',
                'Mac OS': 'Mac',
                'Mac_PowerPC': 'Mac',
                'cpu os': 'MacMobile',
                'cpu iphone os': 'MacMobile',
                'Android': 'Android',
                '!Windows Phone': 'WinPhone',
                '!WPDesktop': 'WinPhone',
                '!ZuneWP': 'WinPhone'
            };
            var optSlashOrSpace = '(?:/|\\s*)?';
            var versionString = '(\\d+)(?:\\.((?:\\d+?[1-9])|\\d)0*?)?';
            var optVersion = '(?:' + versionString + ')?';
            var patterns = {
                Safari: 'applewebkit(?:.*?(?:version/' + versionString + '[\\.\\w\\d]*?(?:\\s+mobile/\\S*)?\\s+safari))?',
                Chrome: '(?:chrome|crios)(?!frame)' + optSlashOrSpace + optVersion,
                Mozilla: 'mozilla(?:.*rv:' + optVersion + '.*Gecko)?',
                Netscape: '(?:netscape|navigator)\\d*/?\\s*' + optVersion,
                Firefox: 'firefox' + optSlashOrSpace + optVersion,
                Opera: '(?:opera|\\sopr)' + optSlashOrSpace + optVersion,
                Opera10: 'opera.*\\s*version' + optSlashOrSpace + optVersion,
                IE: 'msie\\s*' + optVersion,
                Edge: 'edge' + optSlashOrSpace + optVersion
            };
            var browserType = null;
            var version = -1;
            for (var i = 0; i < browserTypesOrderedList.length; i++) {
                var browserTypeCandidate = browserTypesOrderedList[i];
                var regExp = new RegExp(patterns[browserTypeCandidate], 'i');
                var matches = regExp.exec(userAgent);
                if (matches && matches.index >= 0) {
                    if (browserType === 'IE' && version >= 11 && browserTypeCandidate === 'Safari')
                        continue;
                    browserType = browserTypeCandidate;
                    if (browserType === 'Opera10')
                        browserType = 'Opera';
                    var tridentPattern = 'trident' + optSlashOrSpace + optVersion;
                    version = Browser.GetBrowserVersion(userAgent, matches, tridentPattern, Browser.getIECompatibleVersionString());
                    if (browserType === 'Mozilla' && version >= 11)
                        browserType = 'IE';
                }
            }
            if (!browserType)
                browserType = defaultBrowserType;
            var browserVersionDetected = version !== -1;
            if (!browserVersionDetected)
                version = defaultVersions[browserType];
            var platform = null;
            var minOccurenceIndex = Number.MAX_VALUE;
            for (var identStr in platformIdentStrings) {
                if (!Object.prototype.hasOwnProperty.call(platformIdentStrings, identStr))
                    continue;
                var importantIdent = identStr.substr(0, 1) === '!';
                var occurenceIndex = userAgent.indexOf((importantIdent ? identStr.substr(1) : identStr).toLowerCase());
                if (occurenceIndex >= 0 && (occurenceIndex < minOccurenceIndex || importantIdent)) {
                    minOccurenceIndex = importantIdent ? 0 : occurenceIndex;
                    platform = platformIdentStrings[identStr];
                }
            }
            var samsungPattern = 'SM-[A-Z]';
            var m = userAgent.toUpperCase().match(samsungPattern);
            var isSamsungAndroidDevice = m && m.length > 0;
            if (platform === 'WinPhone' && version < 9)
                version = Math.floor(Browser.getVersionFromTrident(userAgent, 'trident' + optSlashOrSpace + optVersion));
            if (!ignoreDocumentMode && browserType === 'IE' && version > 7 && document.documentMode < version)
                version = document.documentMode;
            if (platform === 'WinPhone')
                version = Math.max(9, version);
            if (!platform)
                platform = defaultPlatform;
            if (platform === platformIdentStrings['cpu os'] && !browserVersionDetected)
                version = 4;
            Browser.fillUserAgentInfo(browserTypesOrderedList, browserType, version, platform, isSamsungAndroidDevice);
        }
        catch (e) {
            Browser.fillUserAgentInfo(browserTypesOrderedList, defaultBrowserType, defaultVersions[defaultBrowserType], defaultPlatform);
        }
    };
    Browser.GetBrowserVersion = function (userAgent, matches, tridentPattern, ieCompatibleVersionString) {
        var version = Browser.getVersionFromMatches(matches);
        if (ieCompatibleVersionString) {
            var versionFromTrident = Browser.getVersionFromTrident(userAgent, tridentPattern);
            if (ieCompatibleVersionString === 'edge' || parseInt(ieCompatibleVersionString) === versionFromTrident)
                return versionFromTrident;
        }
        return version;
    };
    Browser.getIECompatibleVersionString = function () {
        if (document.compatible) {
            for (var i = 0; i < document.compatible.length; i++) {
                if (document.compatible[i].userAgent === 'IE' && document.compatible[i].version)
                    return document.compatible[i].version.toLowerCase();
            }
        }
        return '';
    };
    Browser.isTouchEnabled = function () {
        return Browser.hasTouchStart() || Browser.hasMaxTouchPoints() || Browser.hasMsMaxTouchPoints();
    };
    Browser.hasTouchStart = function () {
        return ('ontouchstart' in window);
    };
    Browser.hasMaxTouchPoints = function () {
        return navigator['maxTouchPoints'] > 0;
    };
    Browser.hasMsMaxTouchPoints = function () {
        return navigator['msMaxTouchPoints'] > 0;
    };
    Browser.hasNavigator = function () {
        return typeof navigator !== 'undefined';
    };
    Browser.fillUserAgentInfo = function (browserTypesOrderedList, browserType, version, platform, isSamsungAndroidDevice) {
        if (isSamsungAndroidDevice === void 0) { isSamsungAndroidDevice = false; }
        for (var i = 0; i < browserTypesOrderedList.length; i++) {
            var type = browserTypesOrderedList[i];
            Browser[type] = type === browserType;
        }
        Browser.Version = Math.floor(10.0 * version) / 10.0;
        Browser.MajorVersion = Math.floor(Browser.Version);
        Browser.WindowsPlatform = platform === 'Win' || platform === 'WinPhone';
        Browser.MacOSMobilePlatform = platform === 'MacMobile' || (platform === 'Mac' && Browser.isTouchEnabled());
        Browser.MacOSPlatform = platform === 'Mac' && !Browser.MacOSMobilePlatform;
        Browser.AndroidMobilePlatform = platform === 'Android';
        Browser.WindowsPhonePlatform = platform === 'WinPhone';
        Browser.WebKitFamily = Browser.Safari || Browser.Chrome || Browser.Opera && Browser.MajorVersion >= 15;
        Browser.NetscapeFamily = Browser.Netscape || Browser.Mozilla || Browser.Firefox;
        Browser.WebKitTouchUI = Browser.MacOSMobilePlatform || Browser.AndroidMobilePlatform;
        var isIETouchUI = Browser.IE && Browser.MajorVersion > 9 && Browser.WindowsPlatform && Browser.UserAgent.toLowerCase().indexOf('touch') >= 0;
        Browser.MSTouchUI = isIETouchUI || (Browser.Edge && !!window.navigator.maxTouchPoints);
        Browser.TouchUI = Browser.WebKitTouchUI || Browser.MSTouchUI;
        Browser.MobileUI = Browser.WebKitTouchUI || Browser.WindowsPhonePlatform;
        Browser.AndroidDefaultBrowser = Browser.AndroidMobilePlatform && !Browser.Chrome;
        Browser.AndroidChromeBrowser = Browser.AndroidMobilePlatform && Browser.Chrome;
        if (isSamsungAndroidDevice)
            Browser.SamsungAndroidDevice = isSamsungAndroidDevice;
        if (Browser.MSTouchUI) {
            var isARMArchitecture = Browser.UserAgent.toLowerCase().indexOf('arm;') > -1;
            Browser.VirtualKeyboardSupported = isARMArchitecture || Browser.WindowsPhonePlatform;
        }
        else
            Browser.VirtualKeyboardSupported = Browser.WebKitTouchUI;
        Browser.fillDocumentElementBrowserTypeClassNames(browserTypesOrderedList);
    };
    Browser.indentPlatformMajorVersion = function (userAgent) {
        var regex = /(?:(?:windows nt|macintosh|mac os|cpu os|cpu iphone os|android|windows phone|linux) )(\d+)(?:[-0-9_.])*/;
        var matches = regex.exec(userAgent);
        if (matches)
            Browser.PlaformMajorVersion = matches[1];
    };
    Browser.getVersionFromMatches = function (matches) {
        var result = -1;
        var versionStr = '';
        if (matches) {
            if (matches[1]) {
                versionStr += matches[1];
                if (matches[2])
                    versionStr += '.' + matches[2];
            }
            if (versionStr !== '') {
                result = parseFloat(versionStr);
                if (isNaN(result))
                    result = -1;
            }
        }
        return result;
    };
    Browser.getVersionFromTrident = function (userAgent, tridentPattern) {
        var tridentDiffFromVersion = 4;
        var matches = new RegExp(tridentPattern, 'i').exec(userAgent);
        return Browser.getVersionFromMatches(matches) + tridentDiffFromVersion;
    };
    Browser.fillDocumentElementBrowserTypeClassNames = function (browserTypesOrderedList) {
        var documentElementClassName = '';
        var browserTypeslist = browserTypesOrderedList.concat(['WindowsPlatform', 'MacOSPlatform', 'MacOSMobilePlatform', 'AndroidMobilePlatform',
            'WindowsPhonePlatform', 'WebKitFamily', 'WebKitTouchUI', 'MSTouchUI', 'TouchUI', 'AndroidDefaultBrowser']);
        for (var i = 0; i < browserTypeslist.length; i++) {
            var type = browserTypeslist[i];
            if (Browser[type])
                documentElementClassName += 'dx' + type + ' ';
        }
        documentElementClassName += 'dxBrowserVersion-' + Browser.MajorVersion;
        if (typeof document !== 'undefined' && document && document.documentElement) {
            if (document.documentElement.className !== '')
                documentElementClassName = ' ' + documentElementClassName;
            document.documentElement.className += documentElementClassName;
            Browser.Info = documentElementClassName;
        }
    };
    Browser.getUserAgent = function () {
        return Browser.hasNavigator() && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
    };
    Browser.UserAgent = Browser.getUserAgent();
    Browser._foo = Browser.IdentUserAgent(Browser.UserAgent);
    return Browser;
}());
exports.Browser = Browser;


/***/ }),

/***/ 6799:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtendedMinMax = exports.ExtendedMax = exports.ExtendedMin = exports.MinMaxNumber = exports.MinMax = void 0;
var tslib_1 = __webpack_require__(655);
var MinMax = (function () {
    function MinMax(minElement, maxElement) {
        this.minElement = minElement;
        this.maxElement = maxElement;
    }
    return MinMax;
}());
exports.MinMax = MinMax;
var MinMaxNumber = (function (_super) {
    tslib_1.__extends(MinMaxNumber, _super);
    function MinMaxNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinMaxNumber.prototype, "length", {
        get: function () {
            return this.maxElement - this.minElement;
        },
        enumerable: false,
        configurable: true
    });
    return MinMaxNumber;
}(MinMax));
exports.MinMaxNumber = MinMaxNumber;
var ExtendedMin = (function () {
    function ExtendedMin(minElement, minValue) {
        this.minElement = minElement;
        this.minValue = minValue;
    }
    return ExtendedMin;
}());
exports.ExtendedMin = ExtendedMin;
var ExtendedMax = (function () {
    function ExtendedMax(maxElement, maxValue) {
        this.maxElement = maxElement;
        this.maxValue = maxValue;
    }
    return ExtendedMax;
}());
exports.ExtendedMax = ExtendedMax;
var ExtendedMinMax = (function (_super) {
    tslib_1.__extends(ExtendedMinMax, _super);
    function ExtendedMinMax(minElement, minValue, maxElement, maxValue) {
        var _this = _super.call(this, minElement, maxElement) || this;
        _this.minValue = minValue;
        _this.maxValue = maxValue;
        return _this;
    }
    return ExtendedMinMax;
}(MinMax));
exports.ExtendedMinMax = ExtendedMinMax;


/***/ }),

/***/ 3604:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Margins = void 0;
var tslib_1 = __webpack_require__(655);
var offsets_1 = __webpack_require__(4125);
var Margins = (function (_super) {
    tslib_1.__extends(Margins, _super);
    function Margins() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Margins.empty = function () {
        return new Margins(0, 0, 0, 0);
    };
    Margins.prototype.clone = function () {
        return new Margins(this.left, this.right, this.top, this.bottom);
    };
    return Margins;
}(offsets_1.Offsets));
exports.Margins = Margins;


/***/ }),

/***/ 5596:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Metrics = void 0;
var Metrics = (function () {
    function Metrics() {
    }
    Metrics.euclideanDistance = function (a, b) {
        var xDist = a.x - b.x;
        var yDist = a.y - b.y;
        return Math.sqrt(xDist * xDist + yDist * yDist);
    };
    Metrics.manhattanDistance = function (a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    };
    return Metrics;
}());
exports.Metrics = Metrics;


/***/ }),

/***/ 4125:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Offsets = void 0;
var Offsets = (function () {
    function Offsets(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }
    Offsets.empty = function () {
        return new Offsets(0, 0, 0, 0);
    };
    Object.defineProperty(Offsets.prototype, "horizontal", {
        get: function () {
            return this.left + this.right;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Offsets.prototype, "vertical", {
        get: function () {
            return this.top + this.bottom;
        },
        enumerable: false,
        configurable: true
    });
    Offsets.fromNumber = function (offset) {
        return new Offsets(offset, offset, offset, offset);
    };
    Offsets.fromOffsets = function (offsets) {
        return new Offsets(offsets.left, offsets.right, offsets.top, offsets.bottom);
    };
    Offsets.fromSide = function (horizontal, vertical) {
        return new Offsets(horizontal, horizontal, vertical, vertical);
    };
    Offsets.prototype.normalize = function () {
        this.left = Math.max(0, this.left);
        this.right = Math.max(0, this.right);
        this.top = Math.max(0, this.top);
        this.bottom = Math.max(0, this.bottom);
        return this;
    };
    Offsets.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Offsets.prototype.isEmpty = function () {
        return this.left === 0 && this.right === 0 && this.top === 0 && this.bottom === 0;
    };
    Offsets.prototype.offset = function (offset) {
        this.left += offset.left;
        this.right += offset.right;
        this.top += offset.top;
        this.bottom += offset.bottom;
        return this;
    };
    Offsets.prototype.multiply = function (multLeft, multRight, multTop, multBottom) {
        switch (arguments.length) {
            case 1: {
                this.left *= multLeft;
                this.right *= multLeft;
                this.top *= multLeft;
                this.bottom *= multLeft;
                return this;
            }
            case 2: {
                this.left *= multLeft;
                this.right *= multLeft;
                this.top *= multRight;
                this.bottom *= multRight;
                return this;
            }
            case 4: {
                this.left *= multLeft;
                this.right *= multRight;
                this.top *= multTop;
                this.bottom *= multBottom;
                return this;
            }
        }
        return this;
    };
    Offsets.prototype.clone = function () {
        return new Offsets(this.left, this.right, this.top, this.bottom);
    };
    Offsets.prototype.copyFrom = function (obj) {
        this.left = obj.left;
        this.right = obj.right;
        this.top = obj.top;
        this.bottom = obj.bottom;
    };
    Offsets.prototype.equals = function (obj) {
        return this.top === obj.top &&
            this.bottom === obj.bottom &&
            this.right === obj.right &&
            this.left === obj.left;
    };
    Offsets.prototype.applyConverter = function (converter) {
        this.left = converter(this.left);
        this.right = converter(this.right);
        this.top = converter(this.top);
        this.bottom = converter(this.bottom);
        return this;
    };
    return Offsets;
}());
exports.Offsets = Offsets;


/***/ }),

/***/ 8900:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Point = void 0;
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.zero = function () {
        return new Point(0, 0);
    };
    Point.fromNumber = function (num) {
        return new Point(num, num);
    };
    Point.prototype.isZero = function () {
        return this.x === 0 && this.y === 0;
    };
    Point.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Point.prototype.copyFrom = function (obj) {
        this.x = obj.x;
        this.y = obj.y;
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.equals = function (obj) {
        return this.x === obj.x && this.y === obj.y;
    };
    Point.prototype.offset = function (offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;
        return this;
    };
    Point.prototype.offsetByPoint = function (offset) {
        this.x += offset.x;
        this.y += offset.y;
        return this;
    };
    Point.prototype.multiply = function (multiplierX, multiplierY) {
        this.x *= multiplierX;
        this.y *= multiplierY;
        return this;
    };
    Point.prototype.negative = function () {
        this.x *= -1;
        this.y *= -1;
        return this;
    };
    Point.prototype.applyConverter = function (converter) {
        this.x = converter(this.x);
        this.y = converter(this.y);
        return this;
    };
    Point.plus = function (a, b) {
        return new Point(a.x + b.x, a.y + b.y);
    };
    Point.minus = function (a, b) {
        return new Point(a.x - b.x, a.y - b.y);
    };
    Point.xComparer = function (a, b) {
        return a.x - b.x;
    };
    Point.yComparer = function (a, b) {
        return a.y - b.y;
    };
    Point.equals = function (a, b) {
        return a.x === b.x && a.y === b.y;
    };
    return Point;
}());
exports.Point = Point;


/***/ }),

/***/ 6353:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Size = void 0;
var Size = (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    Size.empty = function () {
        return new Size(0, 0);
    };
    Size.fromNumber = function (num) {
        return new Size(num, num);
    };
    Size.initByCommonAction = function (action) {
        var widthAdp = function (s) { return s.width; };
        var heightAdp = function (s) { return s.height; };
        return new Size(action(widthAdp, heightAdp), action(heightAdp, widthAdp));
    };
    Size.prototype.isEmpty = function () {
        return this.width === 0 && this.height === 0;
    };
    Size.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Size.prototype.nonNegativeSize = function () {
        if (this.width < 0)
            this.width = 0;
        if (this.height < 0)
            this.height = 0;
        return this;
    };
    Size.prototype.offset = function (offsetWidth, offsetHeight) {
        this.width = this.width + offsetWidth;
        this.height = this.height + offsetHeight;
        return this;
    };
    Size.prototype.multiply = function (multiplierW, multiplierH) {
        this.width *= multiplierW;
        this.height *= multiplierH;
        return this;
    };
    Size.prototype.equals = function (obj) {
        return this.width === obj.width && this.height === obj.height;
    };
    Size.prototype.clone = function () {
        return new Size(this.width, this.height);
    };
    Size.prototype.copyFrom = function (obj) {
        this.width = obj.width;
        this.height = obj.height;
    };
    Size.prototype.applyConverter = function (conv) {
        this.width = conv(this.width);
        this.height = conv(this.height);
        return this;
    };
    Size.equals = function (a, b) {
        return a.width === b.width && a.height === b.height;
    };
    return Size;
}());
exports.Size = Size;


/***/ }),

/***/ 2217:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttrUtils = void 0;
var browser_1 = __webpack_require__(9279);
var AttrUtils = (function () {
    function AttrUtils() {
    }
    AttrUtils.setElementAttribute = function (obj, attrName, value) {
        if (obj.setAttribute) {
            if (browser_1.Browser.IE && browser_1.Browser.MajorVersion >= 11 && attrName.toLowerCase() === 'src')
                obj.setAttribute(attrName, '');
            obj.setAttribute(attrName, value);
        }
    };
    AttrUtils.setStyleAttribute = function (obj, attrName, value) {
        if (obj.setProperty)
            obj.setProperty(attrName, value, '');
    };
    AttrUtils.getElementAttribute = function (obj, attrName) {
        return obj.getAttribute(attrName);
    };
    AttrUtils.getStyleAttribute = function (obj, attrName) {
        if (obj.getPropertyValue) {
            if (browser_1.Browser.Firefox) {
                try {
                    return obj.getPropertyValue(attrName);
                }
                catch (e) {
                    return obj[attrName];
                }
            }
            return obj.getPropertyValue(attrName);
        }
        return null;
    };
    AttrUtils.removeElementAttribute = function (obj, attrName) {
        if (obj.removeAttribute)
            obj.removeAttribute(attrName);
    };
    AttrUtils.removeStyleAttribute = function (obj, attrName) {
        if (obj.removeProperty)
            obj.removeProperty(attrName);
    };
    AttrUtils.changeElementStyleAttribute = function (obj, attrName, newValue) {
        AttrUtils.saveStyleAttributeInElement(obj, attrName);
        AttrUtils.setStyleAttribute(obj.style, attrName, newValue);
    };
    AttrUtils.restoreElementStyleAttribute = function (obj, attrName) {
        var savedAttrName = "dxwu_saved" + attrName;
        var style = obj.style;
        if (AttrUtils.isExistsAttributeInElement(obj, savedAttrName)) {
            var oldValue = AttrUtils.getElementAttribute(obj, savedAttrName);
            if (oldValue === AttrUtils.emptyObject || oldValue === null)
                AttrUtils.removeStyleAttribute(style, attrName);
            else
                AttrUtils.setStyleAttribute(style, attrName, oldValue);
            AttrUtils.removeElementAttribute(obj, savedAttrName);
            return true;
        }
        return false;
    };
    AttrUtils.saveStyleAttributeInElement = function (obj, attrName) {
        var savedAttrName = "dxwu_saved" + attrName;
        var style = obj.style;
        if (!AttrUtils.isExistsAttributeInElement(obj, savedAttrName)) {
            var oldValue = AttrUtils.getStyleAttribute(style, attrName);
            AttrUtils.setElementAttribute(obj, savedAttrName, AttrUtils.isAttributeExists(oldValue) ? oldValue : AttrUtils.emptyObject);
        }
    };
    AttrUtils.isExistsAttributeInElement = function (obj, attrName) {
        var value = AttrUtils.getElementAttribute(obj, attrName);
        return AttrUtils.isAttributeExists(value);
    };
    AttrUtils.isAttributeExists = function (attrValue) {
        return attrValue !== null && attrValue !== '';
    };
    AttrUtils.emptyObject = 'DxEmptyValue';
    return AttrUtils;
}());
exports.AttrUtils = AttrUtils;


/***/ }),

/***/ 2491:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.numberToStringHex = exports.numberToStringBin = exports.isOdd = exports.isEven = exports.isNonNullString = exports.isString = exports.isNumber = exports.boolToString = exports.boolToInt = exports.isDefined = void 0;
var string_1 = __webpack_require__(49);
function isDefined(value) {
    return value !== undefined && value !== null;
}
exports.isDefined = isDefined;
function boolToInt(value) {
    return value ? 1 : 0;
}
exports.boolToInt = boolToInt;
function boolToString(value) {
    return value ? '1' : '0';
}
exports.boolToString = boolToString;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function isNonNullString(str) {
    return !!str;
}
exports.isNonNullString = isNonNullString;
function isEven(num) {
    return (num % 2) !== 0;
}
exports.isEven = isEven;
function isOdd(num) {
    return (num % 2) === 0;
}
exports.isOdd = isOdd;
function numberToStringBin(num, minLength) {
    if (minLength === void 0) { minLength = 0; }
    return string_1.StringUtils.padLeft(num.toString(2), minLength, '0');
}
exports.numberToStringBin = numberToStringBin;
function numberToStringHex(num, minLength) {
    if (minLength === void 0) { minLength = 0; }
    return string_1.StringUtils.padLeft(num.toString(16), minLength, '0');
}
exports.numberToStringHex = numberToStringHex;


/***/ }),

/***/ 4170:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Equals = exports.Comparers = void 0;
var Comparers = (function () {
    function Comparers() {
    }
    Comparers.number = function (a, b) {
        return a - b;
    };
    Comparers.string = function (a, b) {
        return ((a === b) ? 0 : ((a > b) ? 1 : -1));
    };
    Comparers.stringIgnoreCase = function (a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return ((a === b) ? 0 : ((a > b) ? 1 : -1));
    };
    return Comparers;
}());
exports.Comparers = Comparers;
var Equals = (function () {
    function Equals() {
    }
    Equals.simpleType = function (a, b) {
        return a === b;
    };
    Equals.object = function (a, b) {
        return a && b && (a === b || a.equals(b));
    };
    return Equals;
}());
exports.Equals = Equals;


/***/ }),

/***/ 6907:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomUtils = void 0;
var browser_1 = __webpack_require__(9279);
var common_1 = __webpack_require__(2491);
var math_1 = __webpack_require__(8679);
var string_1 = __webpack_require__(49);
var DomUtils = (function () {
    function DomUtils() {
    }
    DomUtils.clearInnerHtml = function (element) {
        while (element.firstChild)
            element.removeChild(element.firstChild);
    };
    DomUtils.setStylePosition = function (style, point) {
        style.left = math_1.MathUtils.round(point.x, 3) + 'px';
        style.top = math_1.MathUtils.round(point.y, 3) + 'px';
    };
    DomUtils.setStyleSize = function (style, size) {
        style.width = math_1.MathUtils.round(size.width, 3) + 'px';
        style.height = math_1.MathUtils.round(size.height, 3) + 'px';
    };
    DomUtils.setStyleSizeAndPosition = function (style, rectangle) {
        DomUtils.setStylePosition(style, rectangle);
        DomUtils.setStyleSize(style, rectangle);
    };
    DomUtils.hideNode = function (node) {
        if (node) {
            var parentNode = node.parentNode;
            if (parentNode)
                parentNode.removeChild(node);
        }
    };
    DomUtils.isHTMLElementNode = function (node) {
        return node.nodeType === Node.ELEMENT_NODE;
    };
    DomUtils.isTextNode = function (node) {
        return node.nodeType === Node.TEXT_NODE;
    };
    DomUtils.isElementNode = function (node) {
        return node.nodeType === Node.ELEMENT_NODE;
    };
    DomUtils.isHTMLTableRowElement = function (element) {
        return element.tagName === 'TR';
    };
    DomUtils.isItParent = function (parentElement, element) {
        if (!parentElement || !element)
            return false;
        while (element) {
            if (element === parentElement)
                return true;
            if (element.tagName === 'BODY')
                return false;
            element = element.parentNode;
        }
        return false;
    };
    DomUtils.getParentByTagName = function (element, tagName) {
        tagName = tagName.toUpperCase();
        while (element) {
            if (element.tagName === 'BODY')
                return null;
            if (element.tagName === tagName)
                return element;
            element = element.parentNode;
        }
        return null;
    };
    DomUtils.getDocumentScrollTop = function () {
        var isScrollBodyIE = browser_1.Browser.IE && DomUtils.getCurrentStyle(document.body).overflow === 'hidden' && document.body.scrollTop > 0;
        if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge || isScrollBodyIE) {
            if (browser_1.Browser.MacOSMobilePlatform)
                return window.pageYOffset;
            if (browser_1.Browser.WebKitFamily)
                return document.documentElement.scrollTop || document.body.scrollTop;
            return document.body.scrollTop;
        }
        else
            return document.documentElement.scrollTop;
    };
    DomUtils.getDocumentScrollLeft = function () {
        var isScrollBodyIE = browser_1.Browser.IE && DomUtils.getCurrentStyle(document.body).overflow === 'hidden' && document.body.scrollLeft > 0;
        if (browser_1.Browser.Edge || isScrollBodyIE)
            return document.body ? document.body.scrollLeft : document.documentElement.scrollLeft;
        if (browser_1.Browser.WebKitFamily)
            return document.documentElement.scrollLeft || document.body.scrollLeft;
        return document.documentElement.scrollLeft;
    };
    DomUtils.getCurrentStyle = function (element) {
        if (element.currentStyle)
            return element.currentStyle;
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            var result = document.defaultView.getComputedStyle(element, null);
            if (!result && browser_1.Browser.Firefox && window.frameElement) {
                var changes = [];
                var curElement = window.frameElement;
                while (!(result = document.defaultView.getComputedStyle(element, null))) {
                    changes.push([curElement, curElement.style.display]);
                    curElement.style.setProperty('display', 'block', 'important');
                    curElement = curElement.tagName === 'BODY' ? curElement.ownerDocument.defaultView.frameElement : curElement.parentNode;
                }
                result = cloneObject(result);
                for (var ch = void 0, i = 0; ch = changes[i]; i++)
                    ch[0].style.display = ch[1];
                document.body.offsetWidth;
            }
            return result;
        }
        return window.getComputedStyle(element, null);
    };
    DomUtils.setFocus = function (element) {
        function focusCore() {
            try {
                element.focus();
                if (browser_1.Browser.IE && document.activeElement !== element)
                    element.focus();
            }
            catch (e) {
            }
        }
        if (browser_1.Browser.MacOSMobilePlatform)
            focusCore();
        else {
            setTimeout(function () {
                focusCore();
            }, 100);
        }
    };
    DomUtils.hasClassName = function (element, className) {
        try {
            var classNames = className.split(' ');
            var classList = element.classList;
            if (classList) {
                for (var i = classNames.length - 1; i >= 0; i--) {
                    if (!classList.contains(classNames[i]))
                        return false;
                }
            }
            else {
                var elementClassName = element.getAttribute && element.getAttribute('class');
                if (!elementClassName)
                    return false;
                var elementClasses = elementClassName.split(' ');
                for (var i = classNames.length - 1; i >= 0; i--) {
                    if (elementClasses.indexOf(classNames[i]) < 0)
                        return false;
                }
            }
            return true;
        }
        catch (e) {
            return false;
        }
    };
    DomUtils.addClassName = function (element, className) {
        if (!DomUtils.hasClassName(element, className)) {
            var elementClassName = element.getAttribute && element.getAttribute('class');
            element.setAttribute('class', elementClassName === '' ? className : elementClassName + " " + className);
        }
    };
    DomUtils.removeClassName = function (element, className) {
        var elementClassName = element.getAttribute && element.getAttribute('class');
        var updClassName = " " + elementClassName + " ";
        var newClassName = updClassName.replace(" " + className + " ", ' ');
        if (updClassName.length !== newClassName.length)
            element.setAttribute('class', string_1.StringUtils.trim(newClassName));
    };
    DomUtils.toggleClassName = function (element, className, toggle) {
        if (toggle === undefined) {
            if (DomUtils.hasClassName(element, className))
                DomUtils.removeClassName(element, className);
            else
                DomUtils.addClassName(element, className);
        }
        else {
            if (toggle)
                DomUtils.addClassName(element, className);
            else
                DomUtils.removeClassName(element, className);
        }
    };
    DomUtils.pxToInt = function (px) {
        return pxToNumber(px, parseInt);
    };
    DomUtils.pxToFloat = function (px) {
        return pxToNumber(px, parseFloat);
    };
    DomUtils.getAbsolutePositionY = function (element) {
        function getAbsolutePositionY_IE(element) {
            return browser_1.Browser.IE && element.parentNode === null ?
                0 :
                element.getBoundingClientRect().top + DomUtils.getDocumentScrollTop();
        }
        function getAbsolutePositionY_FF3(element) {
            return Math.round(element.getBoundingClientRect().top + DomUtils.getDocumentScrollTop());
        }
        function getAbsolutePositionY_NS(curEl) {
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, false);
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetTop;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollTop;
                if (!isFirstCycle && browser_1.Browser.Firefox) {
                    var style = DomUtils.getCurrentStyle(curEl);
                    if (curEl.tagName === 'DIV' && style.overflow !== 'visible')
                        pos += DomUtils.pxToInt(style.borderTopWidth);
                }
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        function getAbsolutePositionY_Other(curEl) {
            var pos = 0;
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetTop;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollTop;
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        if (!element)
            return 0;
        if (browser_1.Browser.IE)
            return getAbsolutePositionY_IE(element);
        else if (browser_1.Browser.Firefox && browser_1.Browser.Version >= 3)
            return getAbsolutePositionY_FF3(element);
        else if (browser_1.Browser.NetscapeFamily && (!browser_1.Browser.Firefox || browser_1.Browser.Version < 3))
            return getAbsolutePositionY_NS(element);
        else if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge)
            return getAbsolutePositionY_FF3(element);
        return getAbsolutePositionY_Other(element);
    };
    DomUtils.getAbsolutePositionX = function (element) {
        function getAbsolutePositionX_IE(element) {
            return browser_1.Browser.IE && element.parentNode === null ?
                0 :
                element.getBoundingClientRect().left + DomUtils.getDocumentScrollLeft();
        }
        function getAbsolutePositionX_FF3(element) {
            return Math.round(element.getBoundingClientRect().left + DomUtils.getDocumentScrollLeft());
        }
        function getAbsolutePositionX_Opera(curEl) {
            var isFirstCycle = true;
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, true);
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle)
                    pos -= curEl.scrollLeft;
                curEl = curEl.offsetParent;
                isFirstCycle = false;
            }
            pos += document.body.scrollLeft;
            return pos;
        }
        function getAbsolutePositionX_NS(curEl) {
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, true);
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollLeft;
                if (!isFirstCycle && browser_1.Browser.Firefox) {
                    var style = DomUtils.getCurrentStyle(curEl);
                    if (curEl.tagName === 'DIV' && style.overflow !== 'visible')
                        pos += DomUtils.pxToInt(style.borderLeftWidth);
                }
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        function getAbsolutePositionX_Other(curEl) {
            var pos = 0;
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollLeft;
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        if (!element)
            return 0;
        if (browser_1.Browser.IE)
            return getAbsolutePositionX_IE(element);
        else if (browser_1.Browser.Firefox && browser_1.Browser.Version >= 3)
            return getAbsolutePositionX_FF3(element);
        else if (browser_1.Browser.Opera && browser_1.Browser.Version <= 12)
            return getAbsolutePositionX_Opera(element);
        else if (browser_1.Browser.NetscapeFamily && (!browser_1.Browser.Firefox || browser_1.Browser.Version < 3))
            return getAbsolutePositionX_NS(element);
        else if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge)
            return getAbsolutePositionX_FF3(element);
        else
            return getAbsolutePositionX_Other(element);
    };
    DomUtils.isInteractiveControl = function (element) {
        return ['A', 'INPUT', 'SELECT', 'OPTION', 'TEXTAREA', 'BUTTON', 'IFRAME'].indexOf(element.tagName) > -1;
    };
    DomUtils.getClearClientHeight = function (element) {
        return element.offsetHeight - (DomUtils.getTopBottomPaddings(element) + DomUtils.getVerticalBordersWidth(element));
    };
    DomUtils.getTopBottomPaddings = function (element, style) {
        var currentStyle = style ? style : DomUtils.getCurrentStyle(element);
        return DomUtils.pxToInt(currentStyle.paddingTop) + DomUtils.pxToInt(currentStyle.paddingBottom);
    };
    DomUtils.getVerticalBordersWidth = function (element, style) {
        if (!common_1.isDefined(style))
            style = (browser_1.Browser.IE && browser_1.Browser.MajorVersion !== 9 && window.getComputedStyle) ? window.getComputedStyle(element) : DomUtils.getCurrentStyle(element);
        var res = 0;
        if (style.borderTopStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderTopWidth);
        if (style.borderBottomStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderBottomWidth);
        return res;
    };
    DomUtils.getNodes = function (parent, predicate) {
        var collection = parent.all || parent.getElementsByTagName('*');
        var result = [];
        for (var i = 0; i < collection.length; i++) {
            var element = collection[i];
            if (predicate(element))
                result.push(element);
        }
        return result;
    };
    DomUtils.getChildNodes = function (parent, predicate) {
        var collection = parent.childNodes;
        var result = [];
        for (var i = 0; i < collection.length; i++) {
            var element = collection[i];
            if (predicate(element))
                result.push(element);
        }
        return result;
    };
    DomUtils.getNodesByClassName = function (parent, className) {
        if (parent.querySelectorAll) {
            var children = parent.querySelectorAll("." + className);
            var result_1 = [];
            children.forEach(function (element) { return result_1.push(element); });
            return result_1;
        }
        else
            return DomUtils.getNodes(parent, function (elem) { return DomUtils.hasClassName(elem, className); });
    };
    DomUtils.getChildNodesByClassName = function (parent, className) {
        function nodeListToArray(nodeList, filter) {
            var result = [];
            for (var i = 0; i < nodeList.length; i++) {
                var element = nodeList[i];
                if (filter(element))
                    result.push(element);
            }
            return result;
        }
        if (parent.querySelectorAll) {
            var children = parent.querySelectorAll("." + className);
            return nodeListToArray(children, function (element) { return element.parentNode === parent; });
        }
        else {
            return DomUtils.getChildNodes(parent, function (elem) {
                if (DomUtils.isElementNode(elem))
                    return common_1.isNonNullString(elem.className) && DomUtils.hasClassName(elem, elem.className);
                else
                    return false;
            });
        }
    };
    DomUtils.getVerticalScrollBarWidth = function () {
        if (DomUtils.verticalScrollBarWidth === undefined) {
            var container = document.createElement('DIV');
            container.style.cssText = 'position: absolute; top: 0px; left: 0px; visibility: hidden; width: 200px; height: 150px; overflow: hidden; box-sizing: content-box';
            document.body.appendChild(container);
            var child = document.createElement('P');
            container.appendChild(child);
            child.style.cssText = 'width: 100%; height: 200px;';
            var widthWithoutScrollBar = child.offsetWidth;
            container.style.overflow = 'scroll';
            var widthWithScrollBar = child.offsetWidth;
            if (widthWithoutScrollBar === widthWithScrollBar)
                widthWithScrollBar = container.clientWidth;
            DomUtils.verticalScrollBarWidth = widthWithoutScrollBar - widthWithScrollBar;
            document.body.removeChild(container);
        }
        return DomUtils.verticalScrollBarWidth;
    };
    DomUtils.getHorizontalBordersWidth = function (element, style) {
        if (!common_1.isDefined(style))
            style = (browser_1.Browser.IE && window.getComputedStyle) ? window.getComputedStyle(element) : DomUtils.getCurrentStyle(element);
        var res = 0;
        if (style.borderLeftStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderLeftWidth);
        if (style.borderRightStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderRightWidth);
        return res;
    };
    DomUtils.getFontFamiliesFromCssString = function (cssString) {
        return cssString.split(',').map(function (fam) { return string_1.StringUtils.trim(fam.replace(/'|"/gi, '')); });
    };
    DomUtils.getInnerText = function (container) {
        if (browser_1.Browser.Safari && browser_1.Browser.MajorVersion <= 5) {
            if (DomUtils.html2PlainTextFilter === null) {
                DomUtils.html2PlainTextFilter = document.createElement('DIV');
                DomUtils.html2PlainTextFilter.style.width = '0';
                DomUtils.html2PlainTextFilter.style.height = '0';
                DomUtils.html2PlainTextFilter.style.overflow = 'visible';
                DomUtils.html2PlainTextFilter.style.display = 'none';
                document.body.appendChild(DomUtils.html2PlainTextFilter);
            }
            var filter = DomUtils.html2PlainTextFilter;
            filter.innerHTML = container.innerHTML;
            filter.style.display = '';
            var innerText = filter.innerText;
            filter.style.display = 'none';
            return innerText;
        }
        else if (browser_1.Browser.NetscapeFamily || browser_1.Browser.WebKitFamily || (browser_1.Browser.IE && browser_1.Browser.Version >= 9) || browser_1.Browser.Edge)
            return container.textContent;
        else
            return container.innerText;
    };
    DomUtils.html2PlainTextFilter = null;
    DomUtils.verticalScrollBarWidth = undefined;
    return DomUtils;
}());
exports.DomUtils = DomUtils;
function cloneObject(srcObject) {
    if (typeof (srcObject) !== 'object' || !common_1.isDefined(srcObject))
        return srcObject;
    var newObject = {};
    for (var i in srcObject)
        newObject[i] = srcObject[i];
    return newObject;
}
function pxToNumber(px, parseFunction) {
    var result = 0;
    if (common_1.isDefined(px) && px !== '') {
        try {
            var indexOfPx = px.indexOf('px');
            if (indexOfPx > -1)
                result = parseFunction(px.substr(0, indexOfPx));
        }
        catch (e) { }
    }
    return result;
}
function getAbsoluteScrollOffset_OperaFF(curEl, isX) {
    var pos = 0;
    var isFirstCycle = true;
    while (curEl != null) {
        if (curEl.tagName === 'BODY')
            break;
        var style = DomUtils.getCurrentStyle(curEl);
        if (style.position === 'absolute')
            break;
        if (!isFirstCycle && curEl.tagName === 'DIV' && (style.position === '' || style.position === 'static'))
            pos -= isX ? curEl.scrollLeft : curEl.scrollTop;
        curEl = curEl.parentNode;
        isFirstCycle = false;
    }
    return pos;
}


/***/ }),

/***/ 9712:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EncodeUtils = void 0;
var EncodeUtils = (function () {
    function EncodeUtils() {
    }
    EncodeUtils.encodeHtml = function (text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };
    EncodeUtils.decodeHtml = function (text) {
        return text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    };
    EncodeUtils.prepareTextForRequest = function (text) {
        return text
            .replace(/%/g, '%25')
            .replace(/&/g, '%26amp;')
            .replace(/\+/g, '%2B')
            .replace(/</g, '%26lt;')
            .replace(/>/g, '%26gt;')
            .replace(/"/g, '%26quot;');
    };
    EncodeUtils.prepareTextForCallBackRequest = function (text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };
    EncodeUtils.decodeViaTextArea = function (html) {
        var textArea = document.createElement('TEXTAREA');
        textArea.innerHTML = html;
        return textArea.value;
    };
    return EncodeUtils;
}());
exports.EncodeUtils = EncodeUtils;


/***/ }),

/***/ 3714:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvtUtils = void 0;
var browser_1 = __webpack_require__(9279);
var common_1 = __webpack_require__(2491);
var dom_1 = __webpack_require__(6907);
var touch_1 = __webpack_require__(1632);
var EvtUtils = (function () {
    function EvtUtils() {
    }
    EvtUtils.preventEvent = function (evt) {
        if (!evt.cancelable)
            return;
        if (evt.preventDefault)
            evt.preventDefault();
        else
            evt.returnValue = false;
    };
    EvtUtils.getEventSource = function (evt) {
        return common_1.isDefined(evt) ? EvtUtils.getEventSourceCore(evt) : null;
    };
    EvtUtils.getEventSourceByPosition = function (evt) {
        if (!common_1.isDefined(evt))
            return null;
        if (!document.elementFromPoint)
            return EvtUtils.getEventSourceCore(evt);
        var clientX = EvtUtils.getEventX(evt) - (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom_1.DomUtils.getDocumentScrollLeft() : 0);
        var clientY = EvtUtils.getEventY(evt) - (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom_1.DomUtils.getDocumentScrollTop() : 0);
        if (clientX === undefined || clientY === undefined)
            return EvtUtils.getEventSourceCore(evt);
        return document.elementFromPoint(clientX, clientY);
    };
    EvtUtils.getEventSourceCore = function (evt) {
        return evt.srcElement ? evt.srcElement : evt.target;
    };
    EvtUtils.getMouseWheelEventName = function () {
        if (browser_1.Browser.Safari)
            return 'mousewheel';
        if (browser_1.Browser.NetscapeFamily && browser_1.Browser.MajorVersion < 17)
            return 'DOMMouseScroll';
        return 'wheel';
    };
    EvtUtils.isLeftButtonPressed = function (evt) {
        if (touch_1.TouchUtils.isTouchEvent(evt))
            return true;
        evt = (browser_1.Browser.IE && common_1.isDefined(event)) ? event : evt;
        if (!evt)
            return false;
        if (browser_1.Browser.IE && browser_1.Browser.Version < 11)
            return browser_1.Browser.MSTouchUI ? true : evt.button % 2 === 1;
        if (browser_1.Browser.WebKitFamily)
            return (evt.type === 'pointermove' || evt.type === 'pointerenter' || evt.type === 'pointerleave') ? evt.buttons === 1 : evt.which === 1;
        if (browser_1.Browser.NetscapeFamily || browser_1.Browser.Edge || (browser_1.Browser.IE && browser_1.Browser.Version >= 11))
            return EvtUtils.isMoveEventName(evt.type) ? evt.buttons === 1 : evt.which === 1;
        return browser_1.Browser.Opera ? evt.button === 0 : true;
    };
    EvtUtils.isMoveEventName = function (type) {
        return type === touch_1.TouchUtils.touchMouseMoveEventName || type === EvtUtils.getMoveEventName();
    };
    EvtUtils.getMoveEventName = function () {
        return window.PointerEvent ? 'pointermove' : (browser_1.Browser.TouchUI ? 'touchmove' : 'mousemove');
    };
    EvtUtils.preventEventAndBubble = function (evt) {
        EvtUtils.preventEvent(evt);
        if (evt.stopPropagation)
            evt.stopPropagation();
        evt.cancelBubble = true;
    };
    EvtUtils.clientEventRequiresDocScrollCorrection = function () {
        var isSafariVerLess3 = browser_1.Browser.Safari && browser_1.Browser.Version < 3;
        var isMacOSMobileVerLess51 = browser_1.Browser.MacOSMobilePlatform && browser_1.Browser.Version < 5.1;
        return browser_1.Browser.AndroidDefaultBrowser || browser_1.Browser.AndroidChromeBrowser || !(isSafariVerLess3 || isMacOSMobileVerLess51);
    };
    EvtUtils.getEventX = function (evt) {
        if (touch_1.TouchUtils.isTouchEvent(evt))
            return touch_1.TouchUtils.getEventX(evt);
        return evt.clientX + (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom_1.DomUtils.getDocumentScrollLeft() : 0);
    };
    EvtUtils.getEventY = function (evt) {
        if (touch_1.TouchUtils.isTouchEvent(evt))
            return touch_1.TouchUtils.getEventY(evt);
        return evt.clientY + (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom_1.DomUtils.getDocumentScrollTop() : 0);
    };
    EvtUtils.cancelBubble = function (evt) {
        evt.cancelBubble = true;
    };
    EvtUtils.getWheelDelta = function (evt) {
        var ret;
        if (browser_1.Browser.NetscapeFamily && browser_1.Browser.MajorVersion < 17)
            ret = -evt.detail;
        else if (browser_1.Browser.Safari)
            ret = evt.wheelDelta;
        else
            ret = -evt.deltaY;
        if (browser_1.Browser.Opera && browser_1.Browser.Version < 9)
            ret = -ret;
        return ret;
    };
    return EvtUtils;
}());
exports.EvtUtils = EvtUtils;


/***/ }),

/***/ 9937:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsonUtils = void 0;
var JsonUtils = (function () {
    function JsonUtils() {
    }
    JsonUtils.isValid = function (json) {
        return !(/[^,:{}[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(json.replace(/"(\\.|[^"\\])*"/g, '')));
    };
    return JsonUtils;
}());
exports.JsonUtils = JsonUtils;


/***/ }),

/***/ 2153:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyCode = exports.ModifierKey = exports.KeyUtils = void 0;
var browser_1 = __webpack_require__(9279);
var encode_1 = __webpack_require__(9712);
var string_1 = __webpack_require__(49);
var KeyUtils = (function () {
    function KeyUtils() {
    }
    KeyUtils.getKeyModifiers = function (evt) {
        var result = 0;
        if (evt.altKey)
            result |= ModifierKey.Alt;
        if (evt.ctrlKey)
            result |= ModifierKey.Ctrl;
        if (evt.shiftKey)
            result |= ModifierKey.Shift;
        if (evt.metaKey)
            result |= ModifierKey.Meta;
        return result;
    };
    KeyUtils.getShortcutCode = function (keyCode, isCtrlKey, isShiftKey, isAltKey, isMetaKey) {
        var value = keyCode;
        value |= isCtrlKey ? ModifierKey.Ctrl : 0;
        value |= isShiftKey ? ModifierKey.Shift : 0;
        value |= isAltKey ? ModifierKey.Alt : 0;
        value |= isMetaKey ? ModifierKey.Meta : 0;
        return value;
    };
    KeyUtils.getShortcutCodeByEvent = function (evt) {
        return KeyUtils.getShortcutCode(KeyUtils.getEventKeyCode(evt), evt.ctrlKey, evt.shiftKey, evt.altKey, browser_1.Browser.MacOSPlatform ? evt.metaKey : false);
    };
    KeyUtils.getEventKeyCode = function (evt) {
        return browser_1.Browser.NetscapeFamily || browser_1.Browser.Opera ? evt.which : evt.keyCode;
    };
    KeyUtils.parseShortcutString = function (shortcutString) {
        if (!shortcutString)
            return 0;
        var isCtrlKey = false;
        var isShiftKey = false;
        var isAltKey = false;
        var isMetaKey = false;
        var keyCode = null;
        var shcKeys = shortcutString.toString().split('+');
        if (shcKeys.length > 0) {
            for (var i = 0; i < shcKeys.length; i++) {
                var key = string_1.StringUtils.trim(shcKeys[i].toUpperCase());
                switch (key) {
                    case 'CONTROL':
                    case 'CONTROLKEY':
                    case 'CTRL':
                        isCtrlKey = true;
                        break;
                    case 'SHIFT':
                    case 'SHIFTKEY':
                        isShiftKey = true;
                        break;
                    case 'ALT':
                        isAltKey = true;
                        break;
                    case 'CMD':
                        isMetaKey = true;
                        break;
                    case 'F1':
                        keyCode = KeyCode.F1;
                        break;
                    case 'F2':
                        keyCode = KeyCode.F2;
                        break;
                    case 'F3':
                        keyCode = KeyCode.F3;
                        break;
                    case 'F4':
                        keyCode = KeyCode.F4;
                        break;
                    case 'F5':
                        keyCode = KeyCode.F5;
                        break;
                    case 'F6':
                        keyCode = KeyCode.F6;
                        break;
                    case 'F7':
                        keyCode = KeyCode.F7;
                        break;
                    case 'F8':
                        keyCode = KeyCode.F8;
                        break;
                    case 'F9':
                        keyCode = KeyCode.F9;
                        break;
                    case 'F10':
                        keyCode = KeyCode.F10;
                        break;
                    case 'F11':
                        keyCode = KeyCode.F11;
                        break;
                    case 'F12':
                        keyCode = KeyCode.F12;
                        break;
                    case 'RETURN':
                    case 'ENTER':
                        keyCode = KeyCode.Enter;
                        break;
                    case 'HOME':
                        keyCode = KeyCode.Home;
                        break;
                    case 'END':
                        keyCode = KeyCode.End;
                        break;
                    case 'LEFT':
                        keyCode = KeyCode.Left;
                        break;
                    case 'RIGHT':
                        keyCode = KeyCode.Right;
                        break;
                    case 'UP':
                        keyCode = KeyCode.Up;
                        break;
                    case 'DOWN':
                        keyCode = KeyCode.Down;
                        break;
                    case 'PAGEUP':
                        keyCode = KeyCode.PageUp;
                        break;
                    case 'PAGEDOWN':
                        keyCode = KeyCode.PageDown;
                        break;
                    case 'SPACE':
                        keyCode = KeyCode.Space;
                        break;
                    case 'TAB':
                        keyCode = KeyCode.Tab;
                        break;
                    case 'BACKSPACE':
                    case 'BACK':
                        keyCode = KeyCode.Backspace;
                        break;
                    case 'CONTEXT':
                        keyCode = KeyCode.ContextMenu;
                        break;
                    case 'ESCAPE':
                    case 'ESC':
                        keyCode = KeyCode.Esc;
                        break;
                    case 'DELETE':
                    case 'DEL':
                        keyCode = KeyCode.Delete;
                        break;
                    case 'INSERT':
                    case 'INS':
                        keyCode = KeyCode.Insert;
                        break;
                    case 'PLUS':
                        keyCode = '+'.charCodeAt(0);
                        break;
                    default:
                        keyCode = key.charCodeAt(0);
                        break;
                }
            }
        }
        else
            alert(encode_1.EncodeUtils.decodeViaTextArea('Invalid shortcut'));
        return KeyUtils.getShortcutCode(keyCode, isCtrlKey, isShiftKey, isAltKey, isMetaKey);
    };
    return KeyUtils;
}());
exports.KeyUtils = KeyUtils;
var ModifierKey;
(function (ModifierKey) {
    ModifierKey[ModifierKey["None"] = 0] = "None";
    ModifierKey[ModifierKey["Ctrl"] = 65536] = "Ctrl";
    ModifierKey[ModifierKey["Shift"] = 262144] = "Shift";
    ModifierKey[ModifierKey["Alt"] = 1048576] = "Alt";
    ModifierKey[ModifierKey["Meta"] = 16777216] = "Meta";
})(ModifierKey = exports.ModifierKey || (exports.ModifierKey = {}));
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
    KeyCode[KeyCode["Tab"] = 9] = "Tab";
    KeyCode[KeyCode["Enter"] = 13] = "Enter";
    KeyCode[KeyCode["Pause"] = 19] = "Pause";
    KeyCode[KeyCode["CapsLock"] = 20] = "CapsLock";
    KeyCode[KeyCode["Esc"] = 27] = "Esc";
    KeyCode[KeyCode["Space"] = 32] = "Space";
    KeyCode[KeyCode["PageUp"] = 33] = "PageUp";
    KeyCode[KeyCode["PageDown"] = 34] = "PageDown";
    KeyCode[KeyCode["End"] = 35] = "End";
    KeyCode[KeyCode["Home"] = 36] = "Home";
    KeyCode[KeyCode["Left"] = 37] = "Left";
    KeyCode[KeyCode["Up"] = 38] = "Up";
    KeyCode[KeyCode["Right"] = 39] = "Right";
    KeyCode[KeyCode["Down"] = 40] = "Down";
    KeyCode[KeyCode["Insert"] = 45] = "Insert";
    KeyCode[KeyCode["Delete"] = 46] = "Delete";
    KeyCode[KeyCode["Key_0"] = 48] = "Key_0";
    KeyCode[KeyCode["Key_1"] = 49] = "Key_1";
    KeyCode[KeyCode["Key_2"] = 50] = "Key_2";
    KeyCode[KeyCode["Key_3"] = 51] = "Key_3";
    KeyCode[KeyCode["Key_4"] = 52] = "Key_4";
    KeyCode[KeyCode["Key_5"] = 53] = "Key_5";
    KeyCode[KeyCode["Key_6"] = 54] = "Key_6";
    KeyCode[KeyCode["Key_7"] = 55] = "Key_7";
    KeyCode[KeyCode["Key_8"] = 56] = "Key_8";
    KeyCode[KeyCode["Key_9"] = 57] = "Key_9";
    KeyCode[KeyCode["Key_a"] = 65] = "Key_a";
    KeyCode[KeyCode["Key_b"] = 66] = "Key_b";
    KeyCode[KeyCode["Key_c"] = 67] = "Key_c";
    KeyCode[KeyCode["Key_d"] = 68] = "Key_d";
    KeyCode[KeyCode["Key_e"] = 69] = "Key_e";
    KeyCode[KeyCode["Key_f"] = 70] = "Key_f";
    KeyCode[KeyCode["Key_g"] = 71] = "Key_g";
    KeyCode[KeyCode["Key_h"] = 72] = "Key_h";
    KeyCode[KeyCode["Key_i"] = 73] = "Key_i";
    KeyCode[KeyCode["Key_j"] = 74] = "Key_j";
    KeyCode[KeyCode["Key_k"] = 75] = "Key_k";
    KeyCode[KeyCode["Key_l"] = 76] = "Key_l";
    KeyCode[KeyCode["Key_m"] = 77] = "Key_m";
    KeyCode[KeyCode["Key_n"] = 78] = "Key_n";
    KeyCode[KeyCode["Key_o"] = 79] = "Key_o";
    KeyCode[KeyCode["Key_p"] = 80] = "Key_p";
    KeyCode[KeyCode["Key_q"] = 81] = "Key_q";
    KeyCode[KeyCode["Key_r"] = 82] = "Key_r";
    KeyCode[KeyCode["Key_s"] = 83] = "Key_s";
    KeyCode[KeyCode["Key_t"] = 84] = "Key_t";
    KeyCode[KeyCode["Key_u"] = 85] = "Key_u";
    KeyCode[KeyCode["Key_v"] = 86] = "Key_v";
    KeyCode[KeyCode["Key_w"] = 87] = "Key_w";
    KeyCode[KeyCode["Key_x"] = 88] = "Key_x";
    KeyCode[KeyCode["Key_y"] = 89] = "Key_y";
    KeyCode[KeyCode["Key_z"] = 90] = "Key_z";
    KeyCode[KeyCode["Windows"] = 91] = "Windows";
    KeyCode[KeyCode["ContextMenu"] = 93] = "ContextMenu";
    KeyCode[KeyCode["Numpad_0"] = 96] = "Numpad_0";
    KeyCode[KeyCode["Numpad_1"] = 97] = "Numpad_1";
    KeyCode[KeyCode["Numpad_2"] = 98] = "Numpad_2";
    KeyCode[KeyCode["Numpad_3"] = 99] = "Numpad_3";
    KeyCode[KeyCode["Numpad_4"] = 100] = "Numpad_4";
    KeyCode[KeyCode["Numpad_5"] = 101] = "Numpad_5";
    KeyCode[KeyCode["Numpad_6"] = 102] = "Numpad_6";
    KeyCode[KeyCode["Numpad_7"] = 103] = "Numpad_7";
    KeyCode[KeyCode["Numpad_8"] = 104] = "Numpad_8";
    KeyCode[KeyCode["Numpad_9"] = 105] = "Numpad_9";
    KeyCode[KeyCode["Multiply"] = 106] = "Multiply";
    KeyCode[KeyCode["Add"] = 107] = "Add";
    KeyCode[KeyCode["Subtract"] = 109] = "Subtract";
    KeyCode[KeyCode["Decimal"] = 110] = "Decimal";
    KeyCode[KeyCode["Divide"] = 111] = "Divide";
    KeyCode[KeyCode["F1"] = 112] = "F1";
    KeyCode[KeyCode["F2"] = 113] = "F2";
    KeyCode[KeyCode["F3"] = 114] = "F3";
    KeyCode[KeyCode["F4"] = 115] = "F4";
    KeyCode[KeyCode["F5"] = 116] = "F5";
    KeyCode[KeyCode["F6"] = 117] = "F6";
    KeyCode[KeyCode["F7"] = 118] = "F7";
    KeyCode[KeyCode["F8"] = 119] = "F8";
    KeyCode[KeyCode["F9"] = 120] = "F9";
    KeyCode[KeyCode["F10"] = 121] = "F10";
    KeyCode[KeyCode["F11"] = 122] = "F11";
    KeyCode[KeyCode["F12"] = 123] = "F12";
    KeyCode[KeyCode["NumLock"] = 144] = "NumLock";
    KeyCode[KeyCode["ScrollLock"] = 145] = "ScrollLock";
    KeyCode[KeyCode["Semicolon"] = 186] = "Semicolon";
    KeyCode[KeyCode["Equals"] = 187] = "Equals";
    KeyCode[KeyCode["Comma"] = 188] = "Comma";
    KeyCode[KeyCode["Dash"] = 189] = "Dash";
    KeyCode[KeyCode["Period"] = 190] = "Period";
    KeyCode[KeyCode["ForwardSlash"] = 191] = "ForwardSlash";
    KeyCode[KeyCode["GraveAccent"] = 192] = "GraveAccent";
    KeyCode[KeyCode["OpenBracket"] = 219] = "OpenBracket";
    KeyCode[KeyCode["BackSlash"] = 220] = "BackSlash";
    KeyCode[KeyCode["CloseBracket"] = 221] = "CloseBracket";
    KeyCode[KeyCode["SingleQuote"] = 222] = "SingleQuote";
})(KeyCode = exports.KeyCode || (exports.KeyCode = {}));


/***/ }),

/***/ 2940:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListUtils = void 0;
var min_max_1 = __webpack_require__(6799);
var comparers_1 = __webpack_require__(4170);
var ListUtils = (function () {
    function ListUtils() {
    }
    ListUtils.remove = function (list, element) {
        var index = list.indexOf(element, 0);
        if (index >= 0)
            list.splice(index, 1);
    };
    ListUtils.removeBy = function (list, callback) {
        var len = list.length;
        for (var index = 0; index < len; index++) {
            if (callback(list[index], index))
                return list.splice(index, 1)[0];
        }
        return null;
    };
    ListUtils.shallowCopy = function (list) {
        return list.slice();
    };
    ListUtils.deepCopy = function (list) {
        return ListUtils.map(list, function (val) { return val.clone(); });
    };
    ListUtils.initByValue = function (numElements, initValue) {
        var result = [];
        for (; numElements > 0; numElements--)
            result.push(initValue);
        return result;
    };
    ListUtils.initByCallback = function (numElements, initCallback) {
        var result = [];
        for (var index = 0; index < numElements; index++)
            result.push(initCallback(index));
        return result;
    };
    ListUtils.forEachOnInterval = function (interval, callback) {
        var end = interval.end;
        for (var index = interval.start; index < end; index++)
            callback(index);
    };
    ListUtils.reverseForEachOnInterval = function (interval, callback) {
        var start = interval.start;
        for (var index = interval.end - 1; index >= start; index--)
            callback(index);
    };
    ListUtils.reducedMap = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++) {
            var newItem = callback(list[index], index);
            if (newItem !== null)
                result.push(newItem);
        }
        return result;
    };
    ListUtils.filter = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++) {
            var item = list[index];
            if (callback(item, index))
                result.push(item);
        }
        return result;
    };
    ListUtils.map = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++)
            result.push(callback(list[index], index));
        return result;
    };
    ListUtils.indexBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var ind = startIndex; ind < endIndex; ind++) {
            if (callback(list[ind], ind))
                return ind;
        }
        return -1;
    };
    ListUtils.reverseIndexBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var ind = startIndex; ind >= endIndex; ind--) {
            if (callback(list[ind], ind))
                return ind;
        }
        return -1;
    };
    ListUtils.elementBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var ind = ListUtils.indexBy(list, callback, startIndex, endIndex);
        return ind < 0 ? null : list[ind];
    };
    ListUtils.reverseElementBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        var ind = ListUtils.reverseIndexBy(list, callback, startIndex, endIndex);
        return ind < 0 ? null : list[ind];
    };
    ListUtils.last = function (list) {
        return list[list.length - 1];
    };
    ListUtils.setLast = function (list, newVal) {
        return list[list.length - 1] = newVal;
    };
    ListUtils.incLast = function (list) {
        return ++list[list.length - 1];
    };
    ListUtils.decLast = function (list) {
        return --list[list.length - 1];
    };
    ListUtils.equals = function (a, b) {
        return a.length === b.length && ListUtils.allOf2(a, b, function (a, b) { return a.equals(b); });
    };
    ListUtils.equalsByReference = function (a, b) {
        var aLen = a.length;
        var bLen = a.length;
        if (aLen !== bLen)
            return false;
        for (var i = 0; i < aLen; i++) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListUtils.unique = function (list, cmp, equal, finalizeObj) {
        if (equal === void 0) { equal = cmp; }
        if (finalizeObj === void 0) { finalizeObj = function () { }; }
        var len = list.length;
        if (len === 0)
            return [];
        list = list.sort(cmp);
        var prevValue = list[0];
        var result = ListUtils.reducedMap(list, function (v) {
            if (equal(prevValue, v) !== 0) {
                prevValue = v;
                return v;
            }
            finalizeObj(v);
            return null;
        }, 1, len);
        result.unshift(list[0]);
        return result;
    };
    ListUtils.uniqueNumber = function (list) {
        list = list.sort(comparers_1.Comparers.number);
        var prevValue = Number.NaN;
        for (var i = list.length - 1; i >= 0; i--) {
            if (prevValue === list[i])
                list.splice(i, 1);
            else
                prevValue = list[i];
        }
        return list;
    };
    ListUtils.forEach = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++)
            callback(list[index], index);
    };
    ListUtils.forEach2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++)
            callback(listA[index], listB[index], index);
    };
    ListUtils.reverseForEach = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--)
            callback(list[index], index);
    };
    ListUtils.reverseIndexOf = function (list, element, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            if (list[index] === element)
                return index;
        }
        return -1;
    };
    ListUtils.accumulate = function (list, initAccValue, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var acc = initAccValue;
        for (var ind = startIndex; ind < endIndex; ind++)
            acc = callback(acc, list[ind], ind);
        return acc;
    };
    ListUtils.accumulateNumber = function (list, callback, initAccValue, startIndex, endIndex) {
        if (initAccValue === void 0) { initAccValue = 0; }
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var acc = initAccValue;
        for (var ind = startIndex; ind < endIndex; ind++)
            acc += callback(list[ind], ind, acc);
        return acc;
    };
    ListUtils.anyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (callback(list[index], index))
                return true;
        }
        return false;
    };
    ListUtils.unsafeAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            var currResult = callback(list[index], index);
            if (currResult)
                return currResult;
        }
        return null;
    };
    ListUtils.reverseAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            if (callback(list[index], index))
                return true;
        }
        return false;
    };
    ListUtils.unsafeReverseAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            var currResult = callback(list[index], index);
            if (currResult)
                return currResult;
        }
        return null;
    };
    ListUtils.anyOf2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (callback(listA[index], listB[index], index))
                return true;
        }
        return false;
    };
    ListUtils.allOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (!callback(list[index], index))
                return false;
        }
        return true;
    };
    ListUtils.allOf2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (!callback(listA[index], listB[index], index))
                return false;
        }
        return true;
    };
    ListUtils.allOfOnInterval = function (interval, callback) {
        var endIndex = interval.end;
        for (var index = interval.start; index < endIndex; index++) {
            if (!callback(index))
                return false;
        }
        return true;
    };
    ListUtils.addListOnTail = function (resultList, addedList) {
        for (var i = 0, elem = void 0; elem = addedList[i]; i++)
            resultList.push(elem);
        return resultList;
    };
    ListUtils.joinLists = function (converter) {
        var lists = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            lists[_i - 1] = arguments[_i];
        }
        return ListUtils.accumulate(lists, [], function (accList, list) {
            ListUtils.addListOnTail(accList, converter(list));
            return accList;
        });
    };
    ListUtils.push = function (list, element) {
        list.push(element);
        return list;
    };
    ListUtils.countIf = function (list, callback) {
        return ListUtils.accumulateNumber(list, function (elem, ind) { return callback(elem, ind) ? 1 : 0; });
    };
    ListUtils.clear = function (list) {
        list.splice(0);
    };
    ListUtils.merge = function (list, cmp, shouldMerge, merge, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        list = list.slice(startIndex, endIndex);
        if (endIndex - startIndex < 2)
            return list;
        list = list.sort(cmp);
        var prevObj = list[startIndex];
        var result = [prevObj];
        for (var ind = startIndex + 1; ind < endIndex; ind++) {
            var obj = list[ind];
            if (shouldMerge(prevObj, obj))
                merge(prevObj, obj);
            else {
                prevObj = obj;
                result.push(prevObj);
            }
        }
        return result;
    };
    ListUtils.min = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.minExtended(list, getValue, startIndex, endIndex);
        return res ? res.minElement : null;
    };
    ListUtils.max = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.maxExtended(list, getValue, startIndex, endIndex);
        return res ? res.maxElement : null;
    };
    ListUtils.minMax = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.minMaxExtended(list, getValue, startIndex, endIndex);
        return res ? new min_max_1.MinMax(res.minElement, res.maxElement) : null;
    };
    ListUtils.minExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var minElement = list[startIndex];
        var minValue = getValue(minElement);
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue < minValue) {
                minValue = elemValue;
                minElement = elem;
            }
        }
        return new min_max_1.ExtendedMin(minElement, minValue);
    };
    ListUtils.maxExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var maxElement = list[startIndex];
        var maxValue = getValue(maxElement);
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue > maxValue) {
                maxValue = elemValue;
                maxElement = elem;
            }
        }
        return new min_max_1.ExtendedMax(maxElement, maxValue);
    };
    ListUtils.minMaxExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var minElement = list[startIndex];
        var maxElement = minElement;
        var minValue = getValue(minElement);
        var maxValue = minValue;
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue < minValue) {
                minValue = elemValue;
                minElement = elem;
            }
            else if (elemValue > maxValue) {
                maxValue = elemValue;
                maxElement = elem;
            }
        }
        return new min_max_1.ExtendedMinMax(minElement, minValue, maxElement, maxValue);
    };
    ListUtils.minByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var found = list[startIndex];
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            if (cmp(elem, found) < 0)
                found = elem;
        }
        return found;
    };
    ListUtils.maxByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var found = list[startIndex];
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            if (cmp(elem, found) > 0)
                found = elem;
        }
        return found;
    };
    ListUtils.minMaxByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var min = list[startIndex];
        var max = min;
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var res = cmp(elem, min);
            if (res > 0)
                max = elem;
            else if (res < 0)
                min = elem;
        }
        return new min_max_1.MinMax(min, max);
    };
    return ListUtils;
}());
exports.ListUtils = ListUtils;


/***/ }),

/***/ 8679:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MathUtils = void 0;
var list_1 = __webpack_require__(2940);
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.round = function (value, digits) {
        if (digits === void 0) { digits = 0; }
        var factor = MathUtils.powFactor[digits];
        return Math.round(value * factor) / factor;
    };
    MathUtils.numberCloseTo = function (num, to, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        return Math.abs(num - to) < accuracy;
    };
    MathUtils.restrictValue = function (val, minVal, maxVal) {
        if (maxVal < minVal)
            maxVal = minVal;
        if (val > maxVal)
            return maxVal;
        else if (val < minVal)
            return minVal;
        return val;
    };
    MathUtils.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    MathUtils.generateGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    MathUtils.powFactor = list_1.ListUtils.initByCallback(20, function (ind) { return Math.pow(10, ind); });
    MathUtils.somePrimes = [1009, 1013,
        1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069,
        1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151,
        1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223,
        1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291,
        1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373,
        1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451,
        1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511,
        1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583,
        1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657,
        1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733,
        1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811,
        1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889,
        1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987,
        1993, 1997, 1999, 2003];
    return MathUtils;
}());
exports.MathUtils = MathUtils;


/***/ }),

/***/ 49:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StringUtils = void 0;
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.isAlpha = function (ch) {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    };
    StringUtils.isDigit = function (ch) {
        return ch >= '0' && ch <= '9';
    };
    StringUtils.stringHashCode = function (str) {
        var hash = 0;
        if (str.length === 0)
            return hash;
        var strLen = str.length;
        for (var i = 0; i < strLen; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    };
    StringUtils.endsAt = function (str, template) {
        var strInd = str.length - 1;
        var tmplInd = template.length - 1;
        var strStartInd = strInd - tmplInd;
        if (strStartInd < 0)
            return false;
        for (; strInd >= strStartInd; strInd--, tmplInd--) {
            if (str[strInd] !== template[tmplInd])
                return false;
        }
        return true;
    };
    StringUtils.startsAt = function (str, template) {
        return str.substr(0, template.length) === template;
    };
    StringUtils.stringInLowerCase = function (str) {
        return str.toLowerCase() === str;
    };
    StringUtils.stringInUpperCase = function (str) {
        return str.toUpperCase() === str;
    };
    StringUtils.atLeastOneSymbolInUpperCase = function (str) {
        for (var i = 0, char = void 0; char = str[i]; i++) {
            if (StringUtils.stringInUpperCase(char) && !StringUtils.stringInLowerCase(char))
                return true;
        }
        return false;
    };
    StringUtils.getSymbolFromEnd = function (text, posFromEnd) {
        return text[text.length - posFromEnd];
    };
    StringUtils.trim = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, true, true);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("(^[" + joinedChars + "]*)|([" + joinedChars + "]*$)", 'g'), '');
        }
    };
    StringUtils.trimStart = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, true, false);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("^[" + joinedChars + "]*", 'g'), '');
        }
    };
    StringUtils.trimEnd = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, false, true);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("[" + joinedChars + "]*$", 'g'), '');
        }
    };
    StringUtils.getDecimalSeparator = function () {
        return (1.1).toLocaleString().substr(1, 1);
    };
    StringUtils.repeat = function (str, count) {
        return new Array(count <= 0 ? 0 : count + 1).join(str);
    };
    StringUtils.isNullOrEmpty = function (str) {
        return !str || !str.length;
    };
    StringUtils.padLeft = function (str, totalWidth, paddingChar) {
        return StringUtils.repeat(paddingChar, Math.max(0, totalWidth - str.length)) + str;
    };
    StringUtils.trimInternal = function (source, trimStart, trimEnd) {
        var len = source.length;
        if (!len)
            return source;
        if (len < 0xBABA1) {
            var result = source;
            if (trimStart)
                result = result.replace(/^\s+/, '');
            if (trimEnd)
                result = result.replace(/\s+$/, '');
            return result;
        }
        else {
            var start = 0;
            if (trimEnd) {
                while (len > 0 && /\s/.test(source[len - 1]))
                    len--;
            }
            if (trimStart && len > 0) {
                while (start < len && /\s/.test(source[start]))
                    start++;
            }
            return source.substring(start, len);
        }
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;


/***/ }),

/***/ 1632:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TouchUtils = void 0;
var browser_1 = __webpack_require__(9279);
var common_1 = __webpack_require__(2491);
var TouchUtils = (function () {
    function TouchUtils() {
    }
    TouchUtils.onEventAttachingToDocument = function (eventName, func) {
        if (browser_1.Browser.MacOSMobilePlatform && TouchUtils.isTouchEventName(eventName)) {
            if (!TouchUtils.documentTouchHandlers[eventName])
                TouchUtils.documentTouchHandlers[eventName] = [];
            TouchUtils.documentTouchHandlers[eventName].push(func);
            return TouchUtils.documentEventAttachingAllowed;
        }
        return true;
    };
    TouchUtils.isTouchEventName = function (eventName) {
        return browser_1.Browser.WebKitTouchUI && (eventName.indexOf('touch') > -1 || eventName.indexOf('gesture') > -1);
    };
    TouchUtils.isTouchEvent = function (evt) {
        return browser_1.Browser.WebKitTouchUI && common_1.isDefined(evt.changedTouches);
    };
    TouchUtils.getEventX = function (evt) {
        return browser_1.Browser.IE ? evt.pageX : evt.changedTouches[0].pageX;
    };
    TouchUtils.getEventY = function (evt) {
        return browser_1.Browser.IE ? evt.pageY : evt.changedTouches[0].pageY;
    };
    TouchUtils.touchMouseDownEventName = browser_1.Browser.WebKitTouchUI ? 'touchstart' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointerdown' : 'mousedown');
    TouchUtils.touchMouseUpEventName = browser_1.Browser.WebKitTouchUI ? 'touchend' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointerup' : 'mouseup');
    TouchUtils.touchMouseMoveEventName = browser_1.Browser.WebKitTouchUI ? 'touchmove' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointermove' : 'mousemove');
    TouchUtils.msTouchDraggableClassName = 'dxMSTouchDraggable';
    TouchUtils.documentTouchHandlers = {};
    TouchUtils.documentEventAttachingAllowed = true;
    return TouchUtils;
}());
exports.TouchUtils = TouchUtils;


/***/ }),

/***/ 8721:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 639:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BarManager = void 0;
var BarManager = (function () {
    function BarManager(commandManager, bars) {
        this.commandManager = commandManager;
        this.bars = bars;
    }
    BarManager.prototype.updateContextMenu = function () {
        for (var i = 0, bar = void 0; bar = this.bars[i]; i++)
            if (bar.isContextMenu()) {
                bar.updateItemsList();
                var commandKeys = bar.getCommandKeys();
                for (var j = 0; j < commandKeys.length; j++)
                    this.updateBarItem(bar, commandKeys[j]);
            }
    };
    BarManager.prototype.updateItemsState = function (queryCommands) {
        var anyQuerySended = !!queryCommands.length;
        var _loop_1 = function (i, bar) {
            if (bar.isVisible()) {
                var commandKeys_1 = bar.getCommandKeys();
                var _loop_2 = function (j) {
                    if (anyQuerySended && !queryCommands.filter(function (q) { return q == commandKeys_1[j]; }).length)
                        return "continue";
                    this_1.updateBarItem(bar, commandKeys_1[j]);
                };
                for (var j = 0; j < commandKeys_1.length; j++) {
                    _loop_2(j);
                }
                bar.completeUpdate();
            }
        };
        var this_1 = this;
        for (var i = 0, bar = void 0; bar = this.bars[i]; i++) {
            _loop_1(i, bar);
        }
    };
    BarManager.prototype.updateBarItem = function (bar, commandKey) {
        var command = this.commandManager.getCommand(commandKey);
        if (command) {
            var commandState = command.getState();
            bar.setItemVisible(commandKey, commandState.visible);
            if (commandState.visible) {
                bar.setItemEnabled(commandKey, commandState.enabled);
                bar.setItemValue(commandKey, commandState.value);
            }
        }
    };
    return BarManager;
}());
exports.BarManager = BarManager;


/***/ }),

/***/ 3290:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GanttClientCommand = void 0;
var GanttClientCommand;
(function (GanttClientCommand) {
    GanttClientCommand[GanttClientCommand["CreateTask"] = 0] = "CreateTask";
    GanttClientCommand[GanttClientCommand["CreateSubTask"] = 1] = "CreateSubTask";
    GanttClientCommand[GanttClientCommand["RemoveTask"] = 2] = "RemoveTask";
    GanttClientCommand[GanttClientCommand["RemoveDependency"] = 3] = "RemoveDependency";
    GanttClientCommand[GanttClientCommand["TaskInformation"] = 4] = "TaskInformation";
    GanttClientCommand[GanttClientCommand["TaskAddContextItem"] = 5] = "TaskAddContextItem";
    GanttClientCommand[GanttClientCommand["Undo"] = 6] = "Undo";
    GanttClientCommand[GanttClientCommand["Redo"] = 7] = "Redo";
    GanttClientCommand[GanttClientCommand["ZoomIn"] = 8] = "ZoomIn";
    GanttClientCommand[GanttClientCommand["ZoomOut"] = 9] = "ZoomOut";
    GanttClientCommand[GanttClientCommand["FullScreen"] = 10] = "FullScreen";
    GanttClientCommand[GanttClientCommand["CollapseAll"] = 11] = "CollapseAll";
    GanttClientCommand[GanttClientCommand["ExpandAll"] = 12] = "ExpandAll";
    GanttClientCommand[GanttClientCommand["ResourceManager"] = 13] = "ResourceManager";
    GanttClientCommand[GanttClientCommand["ToggleResources"] = 14] = "ToggleResources";
    GanttClientCommand[GanttClientCommand["ToggleDependencies"] = 15] = "ToggleDependencies";
})(GanttClientCommand = exports.GanttClientCommand || (exports.GanttClientCommand = {}));


/***/ }),

/***/ 3756:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollapseAllCommand = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var CollapseAllCommand = (function (_super) {
    tslib_1.__extends(CollapseAllCommand, _super);
    function CollapseAllCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollapseAllCommand.prototype.getState = function () {
        return new SimpleCommandState_1.SimpleCommandState(this.isEnabled());
    };
    CollapseAllCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    CollapseAllCommand.prototype.executeInternal = function () {
        this.control.collapseAll();
        return true;
    };
    CollapseAllCommand.prototype.isEnabled = function () {
        return true;
    };
    return CollapseAllCommand;
}(CommandBase_1.CommandBase));
exports.CollapseAllCommand = CollapseAllCommand;


/***/ }),

/***/ 6585:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpandAllCommand = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var ExpandAllCommand = (function (_super) {
    tslib_1.__extends(ExpandAllCommand, _super);
    function ExpandAllCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpandAllCommand.prototype.getState = function () {
        return new SimpleCommandState_1.SimpleCommandState(this.isEnabled());
    };
    ExpandAllCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    ExpandAllCommand.prototype.executeInternal = function () {
        this.control.expandAll();
        return true;
    };
    ExpandAllCommand.prototype.isEnabled = function () {
        return true;
    };
    return ExpandAllCommand;
}(CommandBase_1.CommandBase));
exports.ExpandAllCommand = ExpandAllCommand;


/***/ }),

/***/ 9687:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandBase = void 0;
var CommandBase = (function () {
    function CommandBase(control) {
        this.control = control;
    }
    Object.defineProperty(CommandBase.prototype, "modelManipulator", {
        get: function () { return this.control.modelManipulator; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "history", {
        get: function () { return this.control.history; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "validationController", {
        get: function () { return this.control.validationController; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "state", {
        get: function () {
            if (!this._state)
                this._state = this.getState();
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    CommandBase.prototype.execute = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        if (!this.state.enabled)
            return false;
        var executed = this.executeInternal.apply(this, parameters);
        if (executed)
            this.control.barManager.updateItemsState([]);
        return executed;
    };
    CommandBase.prototype.isEnabled = function () {
        return this.control.settings.editing.enabled;
    };
    CommandBase.prototype.executeInternal = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        throw new Error("Not implemented");
    };
    return CommandBase;
}());
exports.CommandBase = CommandBase;


/***/ }),

/***/ 7156:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandManager = void 0;
var ConfirmationDialog_1 = __webpack_require__(5237);
var ConstraintViolationDialog_1 = __webpack_require__(126);
var ResourcesDialog_1 = __webpack_require__(5477);
var TaskEditDialog_1 = __webpack_require__(6152);
var ClientCommand_1 = __webpack_require__(3290);
var CollapseAllCommand_1 = __webpack_require__(3756);
var ExpandAllCommand_1 = __webpack_require__(6585);
var CreateDependencyCommand_1 = __webpack_require__(4118);
var RemoveDependencyCommand_1 = __webpack_require__(3044);
var ToggleDependencies_1 = __webpack_require__(9762);
var FullScreenCommand_1 = __webpack_require__(7823);
var RedoCommand_1 = __webpack_require__(3250);
var UndoCommand_1 = __webpack_require__(9072);
var AssignResourceCommand_1 = __webpack_require__(1955);
var CreateResourceCommand_1 = __webpack_require__(1757);
var DeassignResourceCommand_1 = __webpack_require__(7977);
var ResourceColorCommand_1 = __webpack_require__(9793);
var RemoveResourceCommand_1 = __webpack_require__(358);
var ToggleResource_1 = __webpack_require__(9791);
var CreateSubTaskCommand_1 = __webpack_require__(3936);
var CreateTaskCommand_1 = __webpack_require__(5258);
var UpdateTaskCommand_1 = __webpack_require__(2018);
var RemoveTaskCommand_1 = __webpack_require__(4195);
var TaskAddContextItemCommand_1 = __webpack_require__(2714);
var ZoomInCommand_1 = __webpack_require__(299);
var ZoomOutCommand_1 = __webpack_require__(2231);
var CommandManager = (function () {
    function CommandManager(control) {
        this.control = control;
        this.commands = {};
        this.createCommand(ClientCommand_1.GanttClientCommand.CreateTask, this.createTaskCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.CreateSubTask, this.createSubTaskCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.RemoveTask, this.removeTaskCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.RemoveDependency, this.removeDependencyCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.TaskInformation, this.showTaskEditDialog);
        this.createCommand(ClientCommand_1.GanttClientCommand.ResourceManager, this.showResourcesDialog);
        this.createCommand(ClientCommand_1.GanttClientCommand.TaskAddContextItem, new TaskAddContextItemCommand_1.TaskAddContextItemCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.Undo, new UndoCommand_1.UndoCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.Redo, new RedoCommand_1.RedoCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.ZoomIn, new ZoomInCommand_1.ZoomInCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.ZoomOut, new ZoomOutCommand_1.ZoomOutCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.FullScreen, new FullScreenCommand_1.ToggleFullScreenCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.CollapseAll, new CollapseAllCommand_1.CollapseAllCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.ExpandAll, new ExpandAllCommand_1.ExpandAllCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.ToggleResources, this.toggleResources);
        this.createCommand(ClientCommand_1.GanttClientCommand.ToggleDependencies, this.toggleDependencies);
    }
    Object.defineProperty(CommandManager.prototype, "createTaskCommand", {
        get: function () { return new CreateTaskCommand_1.CreateTaskCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "createSubTaskCommand", {
        get: function () { return new CreateSubTaskCommand_1.CreateSubTaskCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "removeTaskCommand", {
        get: function () { return new RemoveTaskCommand_1.RemoveTaskCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "updateTaskCommand", {
        get: function () { return new UpdateTaskCommand_1.UpdateTaskCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "createDependencyCommand", {
        get: function () { return new CreateDependencyCommand_1.CreateDependencyCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "removeDependencyCommand", {
        get: function () { return new RemoveDependencyCommand_1.RemoveDependencyCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "createResourceCommand", {
        get: function () { return new CreateResourceCommand_1.CreateResourceCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "removeResourceCommand", {
        get: function () { return new RemoveResourceCommand_1.RemoveResourceCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "assignResourceCommand", {
        get: function () { return new AssignResourceCommand_1.AssignResourceCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "deassignResourceCommand", {
        get: function () { return new DeassignResourceCommand_1.DeassignResourceCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeResourceColorCommand", {
        get: function () { return new ResourceColorCommand_1.ResourceColorCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showTaskEditDialog", {
        get: function () { return new TaskEditDialog_1.TaskEditDialogCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showConstraintViolationDialog", {
        get: function () { return new ConstraintViolationDialog_1.ConstraintViolationDialogCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showConfirmationDialog", {
        get: function () { return new ConfirmationDialog_1.ConfirmationDialog(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showResourcesDialog", {
        get: function () { return new ResourcesDialog_1.ResourcesDialogCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "toggleResources", {
        get: function () { return new ToggleResource_1.ToggleResourceCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "toggleDependencies", {
        get: function () { return new ToggleDependencies_1.ToggleDependenciesCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    CommandManager.prototype.getCommand = function (key) {
        return this.commands[key];
    };
    CommandManager.prototype.createCommand = function (commandId, command) {
        this.commands[commandId] = command;
    };
    return CommandManager;
}());
exports.CommandManager = CommandManager;


/***/ }),

/***/ 4118:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateDependencyCommand = void 0;
var tslib_1 = __webpack_require__(655);
var Enums_1 = __webpack_require__(5950);
var DependencyInsertingArguments_1 = __webpack_require__(3279);
var InsertDependencyHistoryItem_1 = __webpack_require__(1211);
var DependencyCommandBase_1 = __webpack_require__(2291);
var CreateDependencyCommand = (function (_super) {
    tslib_1.__extends(CreateDependencyCommand, _super);
    function CreateDependencyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateDependencyCommand.prototype.execute = function (predecessorId, successorId, type) {
        return _super.prototype.execute.call(this, predecessorId, successorId, type);
    };
    CreateDependencyCommand.prototype.executeInternal = function (predecessorId, successorId, type) {
        if (this.control.viewModel.dependencies.items.filter(function (d) { return (d.predecessorId === predecessorId && d.successorId === successorId) ||
            (d.successorId === predecessorId && d.predecessorId === successorId); }).length)
            return false;
        var args = new DependencyInsertingArguments_1.DependencyInsertingArguments(predecessorId, successorId, type);
        this.modelManipulator.dispatcher.notifyDependencyInserting(args);
        if (args.cancel)
            return false;
        predecessorId = args.predecessorId;
        successorId = args.successorId;
        type = args.type;
        this.control.history.beginTransaction();
        this.history.addAndRedo(new InsertDependencyHistoryItem_1.InsertDependencyHistoryItem(this.modelManipulator, predecessorId, successorId, type));
        if (this.control.isValidateDependenciesRequired()) {
            var predecessorTask = this.control.viewModel.tasks.getItemById(predecessorId);
            if (type === Enums_1.DependencyType.SF || type === Enums_1.DependencyType.SS)
                this.control.validationController.moveStartDependTasks(predecessorId, predecessorTask.start);
            else
                this.control.validationController.moveEndDependTasks(predecessorId, predecessorTask.end);
        }
        this.control.history.endTransaction();
        return true;
    };
    CreateDependencyCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowDependencyInsert;
    };
    return CreateDependencyCommand;
}(DependencyCommandBase_1.DependencyCommandBase));
exports.CreateDependencyCommand = CreateDependencyCommand;


/***/ }),

/***/ 2291:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DependencyCommandBase = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var DependencyCommandBase = (function (_super) {
    tslib_1.__extends(DependencyCommandBase, _super);
    function DependencyCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DependencyCommandBase.prototype.getState = function () {
        return new SimpleCommandState_1.SimpleCommandState(this.isEnabled());
    };
    return DependencyCommandBase;
}(CommandBase_1.CommandBase));
exports.DependencyCommandBase = DependencyCommandBase;


/***/ }),

/***/ 3044:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveDependencyCommand = void 0;
var tslib_1 = __webpack_require__(655);
var DialogEnums_1 = __webpack_require__(9544);
var ConfirmationDialogParameters_1 = __webpack_require__(5139);
var DependencyRemovingArguments_1 = __webpack_require__(4797);
var RemoveDependencyHistoryItem_1 = __webpack_require__(5865);
var DependencyCommandBase_1 = __webpack_require__(2291);
var RemoveDependencyCommand = (function (_super) {
    tslib_1.__extends(RemoveDependencyCommand, _super);
    function RemoveDependencyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveDependencyCommand.prototype.execute = function (id, confirmRequired) {
        var _this = this;
        if (confirmRequired === void 0) { confirmRequired = true; }
        if (confirmRequired) {
            this.control.commandManager.showConfirmationDialog.execute(new ConfirmationDialogParameters_1.ConfirmationDialogParameters(DialogEnums_1.ConfirmationType.DependencyDelete, function () { _this.executeInternal(id); }));
            return false;
        }
        return _super.prototype.execute.call(this, id);
    };
    RemoveDependencyCommand.prototype.executeInternal = function (id) {
        id = id || this.control.taskEditController.dependencyId;
        if (id != null) {
            var dependency = this.control.viewModel.dependencies.items.filter(function (d) { return d.internalId === id; })[0];
            if (dependency) {
                var args = new DependencyRemovingArguments_1.DependencyRemovingArguments(dependency);
                this.modelManipulator.dispatcher.notifyDependencyRemoving(args);
                if (!args.cancel) {
                    this.history.addAndRedo(new RemoveDependencyHistoryItem_1.RemoveDependencyHistoryItem(this.modelManipulator, id));
                    if (id === this.control.taskEditController.dependencyId)
                        this.control.taskEditController.selectDependency(null);
                    this.control.barManager.updateItemsState([]);
                    return true;
                }
            }
        }
        return false;
    };
    RemoveDependencyCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowDependencyDelete;
    };
    RemoveDependencyCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        state.visible = state.enabled && this.control.taskEditController.dependencyId != null;
        return state;
    };
    return RemoveDependencyCommand;
}(DependencyCommandBase_1.DependencyCommandBase));
exports.RemoveDependencyCommand = RemoveDependencyCommand;


/***/ }),

/***/ 9762:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToggleDependenciesCommand = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var ToggleDependenciesCommand = (function (_super) {
    tslib_1.__extends(ToggleDependenciesCommand, _super);
    function ToggleDependenciesCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleDependenciesCommand.prototype.getState = function () {
        return new SimpleCommandState_1.SimpleCommandState(true);
    };
    ToggleDependenciesCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    ToggleDependenciesCommand.prototype.executeInternal = function () {
        this.control.toggleDependencies();
        return true;
    };
    return ToggleDependenciesCommand;
}(CommandBase_1.CommandBase));
exports.ToggleDependenciesCommand = ToggleDependenciesCommand;


/***/ }),

/***/ 7823:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToggleFullScreenCommand = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var ToggleFullScreenCommand = (function (_super) {
    tslib_1.__extends(ToggleFullScreenCommand, _super);
    function ToggleFullScreenCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isInFullScreenMode = false;
        _this.fullScreenTempVars = {};
        return _this;
    }
    ToggleFullScreenCommand.prototype.getState = function () {
        var state = new SimpleCommandState_1.SimpleCommandState(true);
        state.value = this.control.fullScreenModeHelper.isInFullScreenMode;
        return state;
    };
    ToggleFullScreenCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    ToggleFullScreenCommand.prototype.executeInternal = function () {
        this.control.fullScreenModeHelper.toggle();
        return true;
    };
    return ToggleFullScreenCommand;
}(CommandBase_1.CommandBase));
exports.ToggleFullScreenCommand = ToggleFullScreenCommand;


/***/ }),

/***/ 3250:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedoCommand = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var RedoCommand = (function (_super) {
    tslib_1.__extends(RedoCommand, _super);
    function RedoCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedoCommand.prototype.getState = function () {
        var state = new SimpleCommandState_1.SimpleCommandState(this.isEnabled());
        state.visible = this.control.settings.editing.enabled;
        return state;
    };
    RedoCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    RedoCommand.prototype.executeInternal = function () {
        this.history.redo();
        return true;
    };
    RedoCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.history.canRedo();
    };
    return RedoCommand;
}(CommandBase_1.CommandBase));
exports.RedoCommand = RedoCommand;


/***/ }),

/***/ 9072:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UndoCommand = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var UndoCommand = (function (_super) {
    tslib_1.__extends(UndoCommand, _super);
    function UndoCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UndoCommand.prototype.getState = function () {
        var state = new SimpleCommandState_1.SimpleCommandState(this.isEnabled());
        state.visible = this.control.settings.editing.enabled;
        return state;
    };
    UndoCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    UndoCommand.prototype.executeInternal = function () {
        this.history.undo();
        return true;
    };
    UndoCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.history.canUndo();
    };
    return UndoCommand;
}(CommandBase_1.CommandBase));
exports.UndoCommand = UndoCommand;


/***/ }),

/***/ 1955:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssignResourceCommand = void 0;
var tslib_1 = __webpack_require__(655);
var ResourceAssigningArguments_1 = __webpack_require__(1389);
var AssignResourceHistoryItem_1 = __webpack_require__(3683);
var ResourceCommandBase_1 = __webpack_require__(200);
var AssignResourceCommand = (function (_super) {
    tslib_1.__extends(AssignResourceCommand, _super);
    function AssignResourceCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssignResourceCommand.prototype.execute = function (resourceId, taskId) {
        return _super.prototype.execute.call(this, resourceId, taskId);
    };
    AssignResourceCommand.prototype.executeInternal = function (resourceId, taskId) {
        var assignment = this.control.viewModel.assignments.items.filter(function (r) { return r.resourceId === resourceId && r.taskId === taskId; })[0];
        if (!assignment) {
            var converter = this.control.viewModel;
            var args = new ResourceAssigningArguments_1.ResourceAssigningArguments(converter.convertInternalToPublicKey("resource", resourceId), converter.convertInternalToPublicKey("task", taskId));
            this.modelManipulator.dispatcher.notifyResourceAssigning(args);
            if (!args.cancel) {
                this.history.addAndRedo(new AssignResourceHistoryItem_1.AssignResourceHistoryItem(this.modelManipulator, converter.convertPublicToInternalKey("resource", args.resourceId), converter.convertPublicToInternalKey("task", args.taskId)));
                return true;
            }
        }
        return false;
    };
    AssignResourceCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowTaskResourceUpdate;
    };
    return AssignResourceCommand;
}(ResourceCommandBase_1.ResourceCommandBase));
exports.AssignResourceCommand = AssignResourceCommand;


/***/ }),

/***/ 1757:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateResourceCommand = void 0;
var tslib_1 = __webpack_require__(655);
var ResourceInsertingArguments_1 = __webpack_require__(990);
var CreateResourceHistoryItem_1 = __webpack_require__(2961);
var ResourceCommandBase_1 = __webpack_require__(200);
var CreateResourceCommand = (function (_super) {
    tslib_1.__extends(CreateResourceCommand, _super);
    function CreateResourceCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateResourceCommand.prototype.execute = function (text, color, callback) {
        if (color === void 0) { color = ""; }
        return _super.prototype.execute.call(this, text, color, callback);
    };
    CreateResourceCommand.prototype.executeInternal = function (text, color, callback) {
        if (color === void 0) { color = ""; }
        var args = new ResourceInsertingArguments_1.ResourceInsertingArguments(text, color);
        this.modelManipulator.dispatcher.notifyResourceCreating(args);
        if (!args.cancel)
            this.history.addAndRedo(new CreateResourceHistoryItem_1.CreateResourceHistoryItem(this.modelManipulator, args.text, args.color, callback));
        return !args.cancel;
    };
    CreateResourceCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowResourceInsert;
    };
    return CreateResourceCommand;
}(ResourceCommandBase_1.ResourceCommandBase));
exports.CreateResourceCommand = CreateResourceCommand;


/***/ }),

/***/ 7977:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeassignResourceCommand = void 0;
var tslib_1 = __webpack_require__(655);
var DeassignResourceHistoryItem_1 = __webpack_require__(1493);
var ResourceCommandBase_1 = __webpack_require__(200);
var DeassignResourceCommand = (function (_super) {
    tslib_1.__extends(DeassignResourceCommand, _super);
    function DeassignResourceCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeassignResourceCommand.prototype.execute = function (assignmentId) {
        return _super.prototype.execute.call(this, assignmentId);
    };
    DeassignResourceCommand.prototype.executeInternal = function (assignmentId) {
        var assignment = this.control.viewModel.assignments.items.filter(function (r) { return r.internalId === assignmentId; })[0];
        if (assignment && this.modelManipulator.dispatcher.fireResourceUnassigning(assignment)) {
            this.history.addAndRedo(new DeassignResourceHistoryItem_1.DeassignResourceHistoryItem(this.modelManipulator, assignmentId));
            return true;
        }
        return false;
    };
    DeassignResourceCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowTaskResourceUpdate;
    };
    return DeassignResourceCommand;
}(ResourceCommandBase_1.ResourceCommandBase));
exports.DeassignResourceCommand = DeassignResourceCommand;


/***/ }),

/***/ 9793:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceColorCommand = void 0;
var tslib_1 = __webpack_require__(655);
var ResourceColorHistoryItem_1 = __webpack_require__(4641);
var ResourcePropertyCommandBase_1 = __webpack_require__(9876);
var ResourceColorCommand = (function (_super) {
    tslib_1.__extends(ResourceColorCommand, _super);
    function ResourceColorCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceColorCommand.prototype.execute = function (id, value) {
        return _super.prototype.execute.call(this, id, value);
    };
    ResourceColorCommand.prototype.executeInternal = function (id, value) {
        var oldColor = this.control.viewModel.resources.getItemById(id).color;
        if (oldColor === value)
            return false;
        this.history.addAndRedo(new ResourceColorHistoryItem_1.ResourceColorHistoryItem(this.modelManipulator, id, value));
        return true;
    };
    return ResourceColorCommand;
}(ResourcePropertyCommandBase_1.ResourcePropertyCommandBase));
exports.ResourceColorCommand = ResourceColorCommand;


/***/ }),

/***/ 9876:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourcePropertyCommandBase = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var ResourcePropertyCommandBase = (function (_super) {
    tslib_1.__extends(ResourcePropertyCommandBase, _super);
    function ResourcePropertyCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourcePropertyCommandBase.prototype.getState = function () {
        return new SimpleCommandState_1.SimpleCommandState(this.isEnabled());
    };
    ResourcePropertyCommandBase.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowResourceUpdate;
    };
    return ResourcePropertyCommandBase;
}(CommandBase_1.CommandBase));
exports.ResourcePropertyCommandBase = ResourcePropertyCommandBase;


/***/ }),

/***/ 358:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveResourceCommand = void 0;
var tslib_1 = __webpack_require__(655);
var ResourceRemovingArguments_1 = __webpack_require__(9748);
var RemoveResourceHistoryItem_1 = __webpack_require__(7466);
var DeassignResourceHistoryItem_1 = __webpack_require__(1493);
var ResourceCommandBase_1 = __webpack_require__(200);
var RemoveResourceCommand = (function (_super) {
    tslib_1.__extends(RemoveResourceCommand, _super);
    function RemoveResourceCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveResourceCommand.prototype.execute = function (id) {
        return _super.prototype.execute.call(this, id);
    };
    RemoveResourceCommand.prototype.executeInternal = function (id) {
        var _this = this;
        var resource = this.control.viewModel.resources.items.filter(function (r) { return r.internalId === id; })[0];
        if (resource) {
            var args = new ResourceRemovingArguments_1.ResourceRemovingArguments(resource);
            this.modelManipulator.dispatcher.notifyResourceRemoving(args);
            if (!args.cancel) {
                var removeResourceHistoryItem_1 = new RemoveResourceHistoryItem_1.RemoveResourceHistoryItem(this.modelManipulator, id);
                var assignments = this.control.viewModel.assignments.items.filter(function (a) { return a.resourceId === id; });
                assignments.forEach(function (a) {
                    if (_this.modelManipulator.dispatcher.fireResourceUnassigning(a))
                        removeResourceHistoryItem_1.add(new DeassignResourceHistoryItem_1.DeassignResourceHistoryItem(_this.modelManipulator, a.internalId));
                });
                this.history.addAndRedo(removeResourceHistoryItem_1);
                return true;
            }
        }
        return false;
    };
    RemoveResourceCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowResourceDelete;
    };
    return RemoveResourceCommand;
}(ResourceCommandBase_1.ResourceCommandBase));
exports.RemoveResourceCommand = RemoveResourceCommand;


/***/ }),

/***/ 200:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceCommandBase = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var ResourceCommandBase = (function (_super) {
    tslib_1.__extends(ResourceCommandBase, _super);
    function ResourceCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceCommandBase.prototype.getState = function () {
        return new SimpleCommandState_1.SimpleCommandState(this.isEnabled());
    };
    return ResourceCommandBase;
}(CommandBase_1.CommandBase));
exports.ResourceCommandBase = ResourceCommandBase;


/***/ }),

/***/ 9791:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToggleResourceCommand = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var ToggleResourceCommand = (function (_super) {
    tslib_1.__extends(ToggleResourceCommand, _super);
    function ToggleResourceCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleResourceCommand.prototype.getState = function () {
        return new SimpleCommandState_1.SimpleCommandState(true);
    };
    ToggleResourceCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    ToggleResourceCommand.prototype.executeInternal = function () {
        this.control.toggleResources();
        return true;
    };
    return ToggleResourceCommand;
}(CommandBase_1.CommandBase));
exports.ToggleResourceCommand = ToggleResourceCommand;


/***/ }),

/***/ 4409:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SimpleCommandState = void 0;
var SimpleCommandState = (function () {
    function SimpleCommandState(enabled, value) {
        this.visible = true;
        this.enabled = enabled;
        this.value = value;
    }
    return SimpleCommandState;
}());
exports.SimpleCommandState = SimpleCommandState;


/***/ }),

/***/ 3936:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSubTaskCommand = void 0;
var tslib_1 = __webpack_require__(655);
var TaskInsertingArguments_1 = __webpack_require__(4605);
var CreateTaskHistoryItem_1 = __webpack_require__(1284);
var TaskCommandBase_1 = __webpack_require__(9254);
var CreateSubTaskCommand = (function (_super) {
    tslib_1.__extends(CreateSubTaskCommand, _super);
    function CreateSubTaskCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateSubTaskCommand.prototype.execute = function (parentId) {
        return _super.prototype.execute.call(this, parentId);
    };
    CreateSubTaskCommand.prototype.executeInternal = function (parentId) {
        parentId = parentId || this.control.currentSelectedTaskID;
        var selectedItem = this.control.viewModel.findItem(parentId);
        if (selectedItem.selected) {
            var data = {
                start: new Date(selectedItem.task.start.getTime()),
                end: new Date(selectedItem.task.end.getTime()),
                title: "New task",
                progress: 0,
                parentId: parentId
            };
            var args = new TaskInsertingArguments_1.TaskInsertingArguments(null, data);
            this.modelManipulator.dispatcher.notifyTaskCreating(args);
            if (!args.cancel) {
                this.history.addAndRedo(new CreateTaskHistoryItem_1.CreateTaskHistoryItem(this.modelManipulator, args));
                var parentItem = this.control.viewModel.findItem(data.parentId);
                _super.prototype.updateParent.call(this, parentItem);
            }
            return !args.cancel;
        }
        return false;
    };
    CreateSubTaskCommand.prototype.isEnabled = function () {
        var gantt = this.control;
        var selectedItem = gantt.viewModel.findItem(gantt.currentSelectedTaskID);
        return _super.prototype.isEnabled.call(this) && !!selectedItem && selectedItem.selected;
    };
    CreateSubTaskCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        var gantt = this.control;
        state.visible = state.visible && gantt.settings.editing.allowTaskInsert;
        return state;
    };
    return CreateSubTaskCommand;
}(TaskCommandBase_1.TaskCommandBase));
exports.CreateSubTaskCommand = CreateSubTaskCommand;


/***/ }),

/***/ 5258:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTaskCommand = void 0;
var tslib_1 = __webpack_require__(655);
var TaskInsertingArguments_1 = __webpack_require__(4605);
var CreateTaskHistoryItem_1 = __webpack_require__(1284);
var TaskCommandBase_1 = __webpack_require__(9254);
var CreateTaskCommand = (function (_super) {
    tslib_1.__extends(CreateTaskCommand, _super);
    function CreateTaskCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateTaskCommand.prototype.execute = function (data) {
        return _super.prototype.execute.call(this, data);
    };
    CreateTaskCommand.prototype.executeInternal = function (data) {
        var _a, _b;
        data !== null && data !== void 0 ? data : (data = {});
        if (!data.parentId) {
            var item = this.control.viewModel.findItem(this.control.currentSelectedTaskID);
            var selectedTask = item && item.task;
            if (selectedTask)
                data.parentId = selectedTask.parentId;
        }
        var referenceItem = this.control.viewModel.findItem(data.parentId) || this.control.viewModel.items[0];
        var referenceTask = referenceItem && referenceItem.task;
        if (!data.start)
            data.start = referenceTask ? new Date(referenceTask.start.getTime()) : new Date(this.control.range.start.getTime());
        if (!data.end)
            data.end = referenceTask ? new Date(referenceTask.end.getTime()) : new Date(this.control.range.end.getTime());
        (_a = data.title) !== null && _a !== void 0 ? _a : (data.title = "New task");
        (_b = data.progress) !== null && _b !== void 0 ? _b : (data.progress = 0);
        var args = new TaskInsertingArguments_1.TaskInsertingArguments(null, data);
        this.modelManipulator.dispatcher.notifyTaskCreating(args);
        if (!args.cancel) {
            this.history.addAndRedo(new CreateTaskHistoryItem_1.CreateTaskHistoryItem(this.modelManipulator, args));
            var parentItem = this.control.viewModel.findItem(data.parentId);
            _super.prototype.updateParent.call(this, parentItem);
        }
        return !args.cancel;
    };
    CreateTaskCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        state.visible = state.visible && this.control.settings.editing.allowTaskInsert;
        return state;
    };
    return CreateTaskCommand;
}(TaskCommandBase_1.TaskCommandBase));
exports.CreateTaskCommand = CreateTaskCommand;


/***/ }),

/***/ 4195:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveTaskCommand = void 0;
var tslib_1 = __webpack_require__(655);
var DialogEnums_1 = __webpack_require__(9544);
var ConfirmationDialogParameters_1 = __webpack_require__(5139);
var TaskRemovingArguments_1 = __webpack_require__(4642);
var RemoveDependencyHistoryItem_1 = __webpack_require__(5865);
var DeassignResourceHistoryItem_1 = __webpack_require__(1493);
var RemoveTaskHistoryItem_1 = __webpack_require__(9599);
var TaskCommandBase_1 = __webpack_require__(9254);
var RemoveTaskCommand = (function (_super) {
    tslib_1.__extends(RemoveTaskCommand, _super);
    function RemoveTaskCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveTaskCommand.prototype.execute = function (id, confirmRequired, isApiCall, isUpdateParentTaskRequired, historyItem, pendingDependencyIds) {
        var _this = this;
        if (confirmRequired === void 0) { confirmRequired = true; }
        if (isApiCall === void 0) { isApiCall = false; }
        if (isUpdateParentTaskRequired === void 0) { isUpdateParentTaskRequired = true; }
        this.isApiCall = isApiCall;
        this.isUpdateParentTaskRequired = isUpdateParentTaskRequired;
        if (confirmRequired) {
            this.control.commandManager.showConfirmationDialog.execute(new ConfirmationDialogParameters_1.ConfirmationDialogParameters(DialogEnums_1.ConfirmationType.TaskDelete, function () { _this.executeInternal(id, historyItem, pendingDependencyIds); }));
            return false;
        }
        return _super.prototype.execute.call(this, id, historyItem, pendingDependencyIds);
    };
    RemoveTaskCommand.prototype.executeInternal = function (id, historyItem, pendingDependencyIds) {
        var _this = this;
        var pendingDependencyKeys = pendingDependencyIds || [];
        id = id || this.control.currentSelectedTaskID;
        var item = this.control.viewModel.findItem(id);
        var task = item ? item.task : this.control.viewModel.tasks.getItemById(id);
        var args = new TaskRemovingArguments_1.TaskRemovingArguments(task);
        this.modelManipulator.dispatcher.notifyTaskRemoving(args);
        if (args.cancel)
            return false;
        var history = this.history;
        var viewModel = this.control.viewModel;
        history.beginTransaction();
        viewModel.beginUpdate();
        var isRecursiveCall = !!historyItem;
        var removeTaskHistoryItem = new RemoveTaskHistoryItem_1.RemoveTaskHistoryItem(this.modelManipulator, id);
        var childTasks = viewModel.tasks.items.filter(function (t) { return t.parentId === id; });
        var childIds = childTasks.map(function (t) { return t.internalId; });
        var dependencies = viewModel.dependencies.items.filter(function (d) {
            return pendingDependencyKeys.indexOf(d.internalId) === -1 && (d.predecessorId === id || d.successorId === id) && !childIds.some(function (k) { return d.predecessorId === k || d.successorId === k; });
        });
        if (dependencies.length) {
            if (!this.control.settings.editing.allowDependencyDelete)
                return false;
            dependencies.forEach(function (d) {
                removeTaskHistoryItem.add(new RemoveDependencyHistoryItem_1.RemoveDependencyHistoryItem(_this.modelManipulator, d.internalId));
                pendingDependencyKeys.push(d.internalId);
            });
        }
        var assignments = viewModel.assignments.items.filter(function (a) { return a.taskId === id; });
        assignments.forEach(function (a) {
            if (_this.modelManipulator.dispatcher.fireResourceUnassigning(a))
                removeTaskHistoryItem.add(new DeassignResourceHistoryItem_1.DeassignResourceHistoryItem(_this.modelManipulator, a.internalId));
        });
        childTasks.reverse().forEach(function (t) { return new RemoveTaskCommand(_this.control).execute(t.internalId, false, true, false, removeTaskHistoryItem, pendingDependencyKeys); });
        if (!isRecursiveCall)
            history.addAndRedo(removeTaskHistoryItem);
        else
            historyItem.add(removeTaskHistoryItem);
        if (this.isUpdateParentTaskRequired) {
            var parent_1 = this.control.viewModel.findItem(task.parentId);
            _super.prototype.updateParent.call(this, parent_1);
        }
        history.endTransaction();
        viewModel.endUpdate();
        return true;
    };
    RemoveTaskCommand.prototype.isEnabled = function () {
        var gantt = this.control;
        var selectedItem = gantt.viewModel.findItem(gantt.currentSelectedTaskID);
        var result = _super.prototype.isEnabled.call(this) && (!!selectedItem && selectedItem.selected || this.isApiCall);
        return result;
    };
    RemoveTaskCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        var gantt = this.control;
        state.visible = state.visible && gantt.settings.editing.allowTaskDelete;
        return state;
    };
    return RemoveTaskCommand;
}(TaskCommandBase_1.TaskCommandBase));
exports.RemoveTaskCommand = RemoveTaskCommand;


/***/ }),

/***/ 2714:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAddContextItemCommand = void 0;
var tslib_1 = __webpack_require__(655);
var TaskCommandBase_1 = __webpack_require__(9254);
var TaskAddContextItemCommand = (function (_super) {
    tslib_1.__extends(TaskAddContextItemCommand, _super);
    function TaskAddContextItemCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskAddContextItemCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        state.visible = state.visible && this.control.settings.editing.allowTaskInsert;
        return state;
    };
    TaskAddContextItemCommand.prototype.execute = function () {
        return false;
    };
    return TaskAddContextItemCommand;
}(TaskCommandBase_1.TaskCommandBase));
exports.TaskAddContextItemCommand = TaskAddContextItemCommand;


/***/ }),

/***/ 9254:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskCommandBase = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var TaskCommandBase = (function (_super) {
    tslib_1.__extends(TaskCommandBase, _super);
    function TaskCommandBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isApiCall = false;
        return _this;
    }
    TaskCommandBase.prototype.getState = function () {
        var state = new SimpleCommandState_1.SimpleCommandState(this.isEnabled());
        state.visible = this.control.settings.editing.enabled && !this.control.taskEditController.dependencyId;
        return state;
    };
    TaskCommandBase.prototype.updateParent = function (parent) {
        var isAutoUpdateParentTask = this.validationController._parentAutoCalc;
        if (isAutoUpdateParentTask && parent && parent.children.length > 0)
            this.control.validationController.updateParentsIfRequired(parent.children[0].task.internalId);
    };
    return TaskCommandBase;
}(CommandBase_1.CommandBase));
exports.TaskCommandBase = TaskCommandBase;


/***/ }),

/***/ 2018:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTaskCommand = void 0;
var tslib_1 = __webpack_require__(655);
var common_1 = __webpack_require__(2491);
var DialogEnums_1 = __webpack_require__(9544);
var ConstraintViolationDialogParameters_1 = __webpack_require__(3433);
var RemoveDependencyHistoryItem_1 = __webpack_require__(5865);
var UpdateTaskHistoryItem_1 = __webpack_require__(9496);
var DateUtils_1 = __webpack_require__(9201);
var TaskCommandBase_1 = __webpack_require__(9254);
var UpdateTaskCommand = (function (_super) {
    tslib_1.__extends(UpdateTaskCommand, _super);
    function UpdateTaskCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateTaskCommand.prototype.execute = function (id, newValues) {
        return _super.prototype.execute.call(this, id, newValues);
    };
    UpdateTaskCommand.prototype.executeInternal = function (id, newValues) {
        var task = this.control.viewModel.tasks.getItemById(id);
        if (!task)
            return false;
        var success = this.control.modelManipulator.dispatcher.raiseTaskUpdating(task, newValues, function (changedNewValues) {
            newValues.title = changedNewValues.title;
            newValues.progress = changedNewValues.progress;
            newValues.start = changedNewValues.start;
            newValues.end = changedNewValues.end;
            newValues.color = changedNewValues.color;
        });
        if (success) {
            if ((0, common_1.isDefined)(newValues.start) && (0, common_1.isDefined)(newValues.end) && newValues.end.getTime() < newValues.start.getTime())
                newValues.end = newValues.start;
            if ((0, common_1.isDefined)(newValues["progress"]))
                newValues["progress"] = Math.max(Math.min(newValues["progress"], 100), 0);
            var updated = this.filterChangedValues(newValues, task);
            this.processDependecyValidation(updated, task);
        }
        return success;
    };
    UpdateTaskCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowTaskUpdate;
    };
    UpdateTaskCommand.prototype.filterChangedValues = function (newValues, task) {
        if (!newValues)
            return null;
        var result = {};
        for (var key in task) {
            if (!Object.prototype.hasOwnProperty.call(task, key))
                continue;
            if ((0, common_1.isDefined)(newValues[key]) && task[key] !== newValues[key])
                result[key] = newValues[key];
        }
        return result;
    };
    UpdateTaskCommand.prototype.processDependecyValidation = function (newValues, task) {
        var _this = this;
        var callback = function (parameters) {
            _this.onAfterValidationCallback(newValues, task, parameters);
        };
        var validationRequired = this.control.isValidateDependenciesRequired();
        if (validationRequired) {
            var validationErrors = [];
            var startChanged = (0, common_1.isDefined)(newValues.start) && newValues.start !== task.start;
            var endChanged = (0, common_1.isDefined)(newValues.end) && newValues.end !== task.end;
            if (startChanged && validationRequired)
                validationErrors = validationErrors.concat(this.control.validationController.checkStartDependencies(task.internalId, newValues.start));
            if (endChanged && validationRequired)
                validationErrors = validationErrors.concat(this.control.validationController.checkEndDependencies(task.internalId, newValues.end));
            if (validationErrors.length > 0)
                this.control.commandManager.showConstraintViolationDialog.execute(new ConstraintViolationDialogParameters_1.ConstraintViolationDialogParameters(validationErrors, callback));
            else
                callback(null);
        }
        else
            callback(null);
    };
    UpdateTaskCommand.prototype.onAfterValidationCallback = function (updated, task, parameters) {
        var _this = this;
        var canUpdateStartEnd = !parameters || parameters.option !== DialogEnums_1.ConstraintViolationOption.DoNothing;
        if (!canUpdateStartEnd) {
            delete updated.start;
            delete updated.end;
        }
        if (Object.keys(updated).length > 0) {
            this.history.beginTransaction();
            if ((parameters === null || parameters === void 0 ? void 0 : parameters.option) === DialogEnums_1.ConstraintViolationOption.RemoveDependency)
                parameters.validationErrors.forEach(function (ve) { return _this.history.addAndRedo(new RemoveDependencyHistoryItem_1.RemoveDependencyHistoryItem(_this.modelManipulator, ve.dependencyId)); });
            var moveRelatedTaskRequired = this.control.isValidateDependenciesRequired();
            var id = task.internalId;
            var oldStart = task.start;
            var oldEnd = task.end;
            this.history.addAndRedo(new UpdateTaskHistoryItem_1.UpdateTaskHistoryItem(this.modelManipulator, id, updated));
            if ((0, common_1.isDefined)(updated["start"]) && moveRelatedTaskRequired)
                this.control.validationController.moveStartDependTasks(id, oldStart);
            if ((0, common_1.isDefined)(updated["end"]) && moveRelatedTaskRequired)
                this.control.validationController.moveEndDependTasks(id, oldEnd);
            this.processAutoParentUpdate(id, updated, oldStart, oldEnd);
            this.history.endTransaction();
            if ((parameters === null || parameters === void 0 ? void 0 : parameters.option) === DialogEnums_1.ConstraintViolationOption.RemoveDependency || (parameters === null || parameters === void 0 ? void 0 : parameters.option) === DialogEnums_1.ConstraintViolationOption.KeepDependency)
                this.control.updateBarManager();
            this.control.updateViewDataRange();
        }
    };
    UpdateTaskCommand.prototype.processAutoParentUpdate = function (id, newValues, oldStart, oldEnd) {
        var hasNewStart = (0, common_1.isDefined)(newValues.start);
        var hasNewEnd = (0, common_1.isDefined)(newValues.end);
        var needRecalculateParents = (0, common_1.isDefined)(newValues.progress) || hasNewStart || hasNewEnd;
        var startDelta = hasNewStart ? newValues.start.getTime() - oldStart.getTime() : null;
        var endDelta = hasNewEnd ? newValues.end.getTime() - oldEnd.getTime() : null;
        var startCrossedDST = hasNewStart && DateUtils_1.DateUtils.getTimezoneOffsetDiff(oldStart, newValues.start) !== 0;
        var endCrossedDST = hasNewEnd && DateUtils_1.DateUtils.getTimezoneOffsetDiff(oldEnd, newValues.end) !== 0;
        var taskCrossedDSTPoint = (startCrossedDST || endCrossedDST) && Math.abs(endDelta - startDelta) === DateUtils_1.DateUtils.msPerHour;
        var isMove = startDelta !== 0 && (startDelta === endDelta || taskCrossedDSTPoint);
        if (needRecalculateParents)
            if (isMove)
                this.validationController.correctParentsOnChildMoving(id, startDelta);
            else
                this.validationController.updateParentsIfRequired(id);
        else
            this.control.updateOwnerInAutoParentMode();
    };
    return UpdateTaskCommand;
}(TaskCommandBase_1.TaskCommandBase));
exports.UpdateTaskCommand = UpdateTaskCommand;


/***/ }),

/***/ 299:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZoomInCommand = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var ZoomInCommand = (function (_super) {
    tslib_1.__extends(ZoomInCommand, _super);
    function ZoomInCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZoomInCommand.prototype.getState = function () {
        return new SimpleCommandState_1.SimpleCommandState(true);
    };
    ZoomInCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    ZoomInCommand.prototype.executeInternal = function () {
        this.control.zoomIn();
        return true;
    };
    return ZoomInCommand;
}(CommandBase_1.CommandBase));
exports.ZoomInCommand = ZoomInCommand;


/***/ }),

/***/ 2231:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZoomOutCommand = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var ZoomOutCommand = (function (_super) {
    tslib_1.__extends(ZoomOutCommand, _super);
    function ZoomOutCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZoomOutCommand.prototype.getState = function () {
        return new SimpleCommandState_1.SimpleCommandState(true);
    };
    ZoomOutCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    ZoomOutCommand.prototype.executeInternal = function () {
        this.control.zoomOut();
        return true;
    };
    return ZoomOutCommand;
}(CommandBase_1.CommandBase));
exports.ZoomOutCommand = ZoomOutCommand;


/***/ }),

/***/ 5237:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmationDialog = void 0;
var tslib_1 = __webpack_require__(655);
var DialogBase_1 = __webpack_require__(4730);
var ConfirmationDialog = (function (_super) {
    tslib_1.__extends(ConfirmationDialog, _super);
    function ConfirmationDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfirmationDialog.prototype.applyParameters = function (_newParameters, oldParameters) {
        this.history.beginTransaction();
        oldParameters.callback();
        this.history.endTransaction();
        this.control.barManager.updateItemsState([]);
        return true;
    };
    ConfirmationDialog.prototype.createParameters = function (options) {
        return options;
    };
    ConfirmationDialog.prototype.getDialogName = function () {
        return "Confirmation";
    };
    return ConfirmationDialog;
}(DialogBase_1.DialogBase));
exports.ConfirmationDialog = ConfirmationDialog;


/***/ }),

/***/ 126:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConstraintViolationDialogCommand = void 0;
var tslib_1 = __webpack_require__(655);
var DialogBase_1 = __webpack_require__(4730);
var ConstraintViolationDialogCommand = (function (_super) {
    tslib_1.__extends(ConstraintViolationDialogCommand, _super);
    function ConstraintViolationDialogCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConstraintViolationDialogCommand.prototype.applyParameters = function (newParameters, oldParameters) {
        oldParameters.callback(newParameters);
        return true;
    };
    ConstraintViolationDialogCommand.prototype.createParameters = function (options) {
        return options;
    };
    ConstraintViolationDialogCommand.prototype.getDialogName = function () {
        return "ConstraintViolation";
    };
    return ConstraintViolationDialogCommand;
}(DialogBase_1.DialogBase));
exports.ConstraintViolationDialogCommand = ConstraintViolationDialogCommand;


/***/ }),

/***/ 4730:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DialogBase = void 0;
var tslib_1 = __webpack_require__(655);
var CommandBase_1 = __webpack_require__(9687);
var SimpleCommandState_1 = __webpack_require__(4409);
var DialogBase = (function (_super) {
    tslib_1.__extends(DialogBase, _super);
    function DialogBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isApiCall = false;
        _this._canRefresh = true;
        return _this;
    }
    DialogBase.prototype.execute = function (options, isApiCall) {
        if (options === void 0) { options = undefined; }
        if (isApiCall === void 0) { isApiCall = false; }
        this.isApiCall = isApiCall;
        return _super.prototype.execute.call(this, options);
    };
    DialogBase.prototype.executeInternal = function (options) {
        this.options = options;
        return this.showDialog(options);
    };
    Object.defineProperty(DialogBase.prototype, "canRefresh", {
        get: function () { return this._canRefresh; },
        enumerable: false,
        configurable: true
    });
    DialogBase.prototype.refresh = function () {
        this.showDialog(this.options);
    };
    DialogBase.prototype.showDialog = function (options) {
        var _this = this;
        var params = this.createParameters(options);
        var initParams = params.clone();
        if (!this.onBeforeDialogShow(params))
            return false;
        DialogBase.activeInstance = this;
        this.control.showDialog(this.getDialogName(), params, function (result) {
            if (result) {
                _this._canRefresh = false;
                _this.applyParameters(result, initParams);
                _this._canRefresh = true;
            }
        }, function () {
            delete DialogBase.activeInstance;
            _this.afterClosing();
        });
        return true;
    };
    DialogBase.prototype.onBeforeDialogShow = function (params) {
        return true;
    };
    DialogBase.prototype.applyParameters = function (_newParameters, _oldParameters) {
        return false;
    };
    DialogBase.prototype.afterClosing = function () { };
    DialogBase.prototype.getState = function () {
        return new SimpleCommandState_1.SimpleCommandState(this.isEnabled());
    };
    DialogBase.activeInstance = null;
    return DialogBase;
}(CommandBase_1.CommandBase));
exports.DialogBase = DialogBase;


/***/ }),

/***/ 9544:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConstraintViolationOption = exports.ConfirmationType = void 0;
var ConfirmationType;
(function (ConfirmationType) {
    ConfirmationType[ConfirmationType["TaskDelete"] = 0] = "TaskDelete";
    ConfirmationType[ConfirmationType["DependencyDelete"] = 1] = "DependencyDelete";
    ConfirmationType[ConfirmationType["ResourcesDelete"] = 2] = "ResourcesDelete";
})(ConfirmationType = exports.ConfirmationType || (exports.ConfirmationType = {}));
var ConstraintViolationOption;
(function (ConstraintViolationOption) {
    ConstraintViolationOption[ConstraintViolationOption["DoNothing"] = 0] = "DoNothing";
    ConstraintViolationOption[ConstraintViolationOption["RemoveDependency"] = 1] = "RemoveDependency";
    ConstraintViolationOption[ConstraintViolationOption["KeepDependency"] = 2] = "KeepDependency";
})(ConstraintViolationOption = exports.ConstraintViolationOption || (exports.ConstraintViolationOption = {}));


/***/ }),

/***/ 5139:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmationDialogParameters = void 0;
var tslib_1 = __webpack_require__(655);
var DialogParametersBase_1 = __webpack_require__(9705);
var ConfirmationDialogParameters = (function (_super) {
    tslib_1.__extends(ConfirmationDialogParameters, _super);
    function ConfirmationDialogParameters(type, callback) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.callback = callback;
        return _this;
    }
    ConfirmationDialogParameters.prototype.clone = function () {
        var result = new ConfirmationDialogParameters(this.type, this.callback);
        result.message = this.message;
        return result;
    };
    return ConfirmationDialogParameters;
}(DialogParametersBase_1.DialogParametersBase));
exports.ConfirmationDialogParameters = ConfirmationDialogParameters;


/***/ }),

/***/ 3433:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConstraintViolationDialogParameters = void 0;
var tslib_1 = __webpack_require__(655);
var DialogParametersBase_1 = __webpack_require__(9705);
var ConstraintViolationDialogParameters = (function (_super) {
    tslib_1.__extends(ConstraintViolationDialogParameters, _super);
    function ConstraintViolationDialogParameters(validationErrors, callback) {
        var _this = _super.call(this) || this;
        _this.validationErrors = validationErrors;
        _this.callback = callback;
        return _this;
    }
    ConstraintViolationDialogParameters.prototype.clone = function () {
        var result = new ConstraintViolationDialogParameters(this.validationErrors, this.callback);
        result.option = this.option;
        return result;
    };
    Object.defineProperty(ConstraintViolationDialogParameters.prototype, "hasCriticalErrors", {
        get: function () {
            var _a;
            return (_a = this.validationErrors) === null || _a === void 0 ? void 0 : _a.some(function (ve) { return ve.critical; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConstraintViolationDialogParameters.prototype, "errorsCount", {
        get: function () {
            var _a;
            return (_a = this.validationErrors) === null || _a === void 0 ? void 0 : _a.length;
        },
        enumerable: false,
        configurable: true
    });
    return ConstraintViolationDialogParameters;
}(DialogParametersBase_1.DialogParametersBase));
exports.ConstraintViolationDialogParameters = ConstraintViolationDialogParameters;


/***/ }),

/***/ 9705:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DialogParametersBase = void 0;
var DialogParametersBase = (function () {
    function DialogParametersBase() {
    }
    return DialogParametersBase;
}());
exports.DialogParametersBase = DialogParametersBase;


/***/ }),

/***/ 6711:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourcesDialogParameters = void 0;
var tslib_1 = __webpack_require__(655);
var ResourceCollection_1 = __webpack_require__(8828);
var DialogParametersBase_1 = __webpack_require__(9705);
var ResourcesDialogParameters = (function (_super) {
    tslib_1.__extends(ResourcesDialogParameters, _super);
    function ResourcesDialogParameters() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourcesDialogParameters.prototype.clone = function () {
        var clone = new ResourcesDialogParameters();
        clone.resources = new ResourceCollection_1.ResourceCollection();
        clone.resources.addRange(this.resources.items);
        return clone;
    };
    return ResourcesDialogParameters;
}(DialogParametersBase_1.DialogParametersBase));
exports.ResourcesDialogParameters = ResourcesDialogParameters;


/***/ }),

/***/ 1563:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskEditParameters = void 0;
var tslib_1 = __webpack_require__(655);
var ResourceCollection_1 = __webpack_require__(8828);
var DialogParametersBase_1 = __webpack_require__(9705);
var TaskEditParameters = (function (_super) {
    tslib_1.__extends(TaskEditParameters, _super);
    function TaskEditParameters() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enableEdit = true;
        _this.enableRangeEdit = true;
        _this.isValidationRequired = false;
        _this.hiddenFields = [];
        _this.readOnlyFields = [];
        return _this;
    }
    TaskEditParameters.prototype.clone = function () {
        var clone = new TaskEditParameters();
        clone.id = this.id;
        clone.title = this.title;
        clone.progress = this.progress;
        clone.start = this.start;
        clone.end = this.end;
        clone.assigned = new ResourceCollection_1.ResourceCollection();
        clone.assigned.addRange(this.assigned.items);
        clone.resources = new ResourceCollection_1.ResourceCollection();
        clone.resources.addRange(this.resources.items);
        clone.showResourcesDialogCommand = this.showResourcesDialogCommand;
        clone.showTaskEditDialogCommand = this.showTaskEditDialogCommand;
        clone.enableEdit = this.enableEdit;
        clone.enableRangeEdit = this.enableRangeEdit;
        clone.hiddenFields = this.hiddenFields.slice();
        clone.readOnlyFields = this.readOnlyFields.slice();
        clone.isValidationRequired = this.isValidationRequired;
        clone.getCorrectDateRange = this.getCorrectDateRange;
        return clone;
    };
    return TaskEditParameters;
}(DialogParametersBase_1.DialogParametersBase));
exports.TaskEditParameters = TaskEditParameters;


/***/ }),

/***/ 5477:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourcesDialogCommand = void 0;
var tslib_1 = __webpack_require__(655);
var ResourceCollection_1 = __webpack_require__(8828);
var DialogBase_1 = __webpack_require__(4730);
var DialogEnums_1 = __webpack_require__(9544);
var ConfirmationDialogParameters_1 = __webpack_require__(5139);
var ResourcesDialogParameters_1 = __webpack_require__(6711);
var ResourcesDialogCommand = (function (_super) {
    tslib_1.__extends(ResourcesDialogCommand, _super);
    function ResourcesDialogCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resourcesForDelete = [];
        return _this;
    }
    ResourcesDialogCommand.prototype.onBeforeDialogShow = function (params) {
        return this.modelManipulator.dispatcher.raiseResourceManagerDialogShowing(params, function (args) {
            params.resources = args.values.resources;
        });
    };
    ResourcesDialogCommand.prototype.applyParameters = function (newParameters, oldParameters) {
        this.history.beginTransaction();
        for (var i = 0; i < newParameters.resources.length; i++) {
            var resource = oldParameters.resources.getItemById(newParameters.resources.getItem(i).internalId);
            if (!resource)
                this.control.commandManager.createResourceCommand.execute(newParameters.resources.getItem(i).text);
        }
        for (var i = 0; i < oldParameters.resources.length; i++) {
            var resource = newParameters.resources.getItemById(oldParameters.resources.getItem(i).internalId);
            if (!resource)
                this.resourcesForDelete.push(oldParameters.resources.getItem(i));
        }
        this.history.endTransaction();
        return false;
    };
    ResourcesDialogCommand.prototype.createParameters = function (callBack) {
        this.callBack = callBack;
        var param = new ResourcesDialogParameters_1.ResourcesDialogParameters();
        param.resources = new ResourceCollection_1.ResourceCollection();
        param.resources.addRange(this.control.viewModel.resources.items);
        return param;
    };
    ResourcesDialogCommand.prototype.afterClosing = function () {
        var _this = this;
        if (this.resourcesForDelete.length) {
            var confirmationDialog = this.control.commandManager.showConfirmationDialog;
            var confirmationDialogParameters = new ConfirmationDialogParameters_1.ConfirmationDialogParameters(DialogEnums_1.ConfirmationType.ResourcesDelete, function () {
                _this.history.beginTransaction();
                for (var i = 0; i < _this.resourcesForDelete.length; i++)
                    _this.control.commandManager.removeResourceCommand.execute(_this.resourcesForDelete[i].internalId);
                _this.history.endTransaction();
            });
            confirmationDialogParameters.message = this.resourcesForDelete.reduce(function (a, b) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], a, true), [b.text], false); }, []).join(", ");
            if (this.callBack)
                confirmationDialog.afterClosing = function () {
                    delete DialogBase_1.DialogBase.activeInstance;
                    _this.callBack();
                };
            confirmationDialog.execute(confirmationDialogParameters);
        }
        else if (this.callBack)
            this.callBack();
    };
    ResourcesDialogCommand.prototype.getDialogName = function () {
        return "Resources";
    };
    return ResourcesDialogCommand;
}(DialogBase_1.DialogBase));
exports.ResourcesDialogCommand = ResourcesDialogCommand;


/***/ }),

/***/ 6152:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskEditDialogCommand = void 0;
var tslib_1 = __webpack_require__(655);
var ResourceCollection_1 = __webpack_require__(8828);
var ResourceAssigningArguments_1 = __webpack_require__(1389);
var AssignResourceHistoryItem_1 = __webpack_require__(3683);
var DeassignResourceHistoryItem_1 = __webpack_require__(1493);
var DialogBase_1 = __webpack_require__(4730);
var TaskEditParameters_1 = __webpack_require__(1563);
var common_1 = __webpack_require__(2491);
var TaskEditDialogCommand = (function (_super) {
    tslib_1.__extends(TaskEditDialogCommand, _super);
    function TaskEditDialogCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskEditDialogCommand.prototype.onBeforeDialogShow = function (params) {
        return this.modelManipulator.dispatcher.raiseTaskTaskEditDialogShowing(params, function (args) {
            var newValues = args.values;
            params.start = newValues.start;
            params.end = newValues.end;
            params.progress = newValues.progress;
            params.title = newValues.title;
            params.readOnlyFields = args.readOnlyFields;
            params.hiddenFields = args.hiddenFields;
        });
    };
    TaskEditDialogCommand.prototype.applyParameters = function (newParameters, oldParameters) {
        var _this = this;
        this.history.beginTransaction();
        var updated = this.getUpdatedTaskData(newParameters, oldParameters);
        if (Object.keys(updated).length > 0)
            setTimeout(function () { return _this.control.commandManager.updateTaskCommand.execute(oldParameters.id, updated); }, 0);
        for (var i = 0; i < newParameters.assigned.length; i++) {
            var resource = oldParameters.assigned.getItemById(newParameters.assigned.getItem(i).internalId);
            if (!resource) {
                var resourceId = newParameters.assigned.getItem(i).internalId;
                var taskId = oldParameters.id;
                var args = new ResourceAssigningArguments_1.ResourceAssigningArguments(resourceId, taskId);
                this.modelManipulator.dispatcher.notifyResourceAssigning(args);
                if (!args.cancel)
                    this.history.addAndRedo(new AssignResourceHistoryItem_1.AssignResourceHistoryItem(this.modelManipulator, args.resourceId, args.taskId));
            }
        }
        var _loop_1 = function (i) {
            var assigned = oldParameters.assigned.getItem(i);
            var resource = newParameters.assigned.getItemById(assigned.internalId);
            if (!resource) {
                var assignment = this_1.control.viewModel.assignments.items.filter(function (assignment) { return assignment.resourceId === assigned.internalId && assignment.taskId === oldParameters.id; })[0];
                if (this_1.modelManipulator.dispatcher.fireResourceUnassigning(assignment))
                    this_1.history.addAndRedo(new DeassignResourceHistoryItem_1.DeassignResourceHistoryItem(this_1.modelManipulator, assignment.internalId));
            }
        };
        var this_1 = this;
        for (var i = 0; i < oldParameters.assigned.length; i++) {
            _loop_1(i);
        }
        this.history.endTransaction();
        return false;
    };
    TaskEditDialogCommand.prototype.getUpdatedTaskData = function (newParameters, oldParameters) {
        var updated = {};
        if ((0, common_1.isDefined)(newParameters.title) && oldParameters.title !== newParameters.title)
            updated.title = newParameters.title;
        if ((0, common_1.isDefined)(newParameters.progress) && oldParameters.progress !== newParameters.progress)
            updated.progress = newParameters.progress;
        if ((0, common_1.isDefined)(newParameters.start) && oldParameters.start !== newParameters.start)
            updated.start = newParameters.start;
        if ((0, common_1.isDefined)(newParameters.end) && oldParameters.end !== newParameters.end)
            updated.end = newParameters.end;
        return updated;
    };
    TaskEditDialogCommand.prototype.createParameters = function (options) {
        var _this = this;
        options = options || this.control.viewModel.tasks.getItemById(this.control.currentSelectedTaskID);
        var param = new TaskEditParameters_1.TaskEditParameters();
        param.id = options.internalId;
        param.title = options.title;
        param.progress = options.progress;
        param.start = options.start;
        param.end = options.end;
        param.assigned = this.control.viewModel.getAssignedResources(options);
        param.resources = new ResourceCollection_1.ResourceCollection();
        param.resources.addRange(this.control.viewModel.resources.items);
        param.showResourcesDialogCommand = this.control.commandManager.showResourcesDialog;
        param.showTaskEditDialogCommand = this.control.commandManager.showTaskEditDialog;
        param.enableEdit = this.isTaskEditEnabled();
        param.enableRangeEdit = this.isTaskRangeEditEnabled(options);
        param.isValidationRequired = this.control.isValidateDependenciesRequired();
        param.getCorrectDateRange = function (taskId, startDate, endDate) { return _this.control.validationController.getCorrectDateRange(taskId, startDate, endDate); };
        return param;
    };
    TaskEditDialogCommand.prototype.isTaskEditEnabled = function () {
        var settings = this.control.settings;
        return settings.editing.enabled && settings.editing.allowTaskUpdate;
    };
    TaskEditDialogCommand.prototype.isTaskRangeEditEnabled = function (task) {
        return !this.control.viewModel.isTaskToCalculateByChildren(task.internalId);
    };
    TaskEditDialogCommand.prototype.isEnabled = function () {
        var gantt = this.control;
        var selectedItem = gantt.viewModel.findItem(gantt.currentSelectedTaskID);
        return (!!selectedItem && selectedItem.selected) || this.isApiCall;
    };
    TaskEditDialogCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        state.visible = state.visible && !this.control.taskEditController.dependencyId;
        return state;
    };
    TaskEditDialogCommand.prototype.getDialogName = function () {
        return "TaskEdit";
    };
    return TaskEditDialogCommand;
}(DialogBase_1.DialogBase));
exports.TaskEditDialogCommand = TaskEditDialogCommand;


/***/ }),

/***/ 6893:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GanttExportCalculator = void 0;
var point_1 = __webpack_require__(8900);
var dom_1 = __webpack_require__(6907);
var Enums_1 = __webpack_require__(2449);
var GridLayoutCalculator_1 = __webpack_require__(1855);
var DependencyLineInfo_1 = __webpack_require__(4991);
var TaskResourcesInfo_1 = __webpack_require__(2485);
var TaskInfo_1 = __webpack_require__(3917);
var Color_1 = __webpack_require__(405);
var StyleDef_1 = __webpack_require__(6995);
var Margin_1 = __webpack_require__(5063);
var CellDef_1 = __webpack_require__(6032);
var TaskAreaHelper_1 = __webpack_require__(8603);
var Props_1 = __webpack_require__(6997);
var Interfaces_1 = __webpack_require__(8935);
var size_1 = __webpack_require__(6353);
var Paginator_1 = __webpack_require__(3424);
var ScalingHelper_1 = __webpack_require__(5763);
var TimeMarkerInfo_1 = __webpack_require__(7802);
var Enums_2 = __webpack_require__(9895);
var PredefinedStyles_1 = __webpack_require__(2642);
var GanttExportCalculator = (function () {
    function GanttExportCalculator(owner, props) {
        var _a;
        var _b;
        this._owner = owner;
        this._props = new Props_1.GanttPdfExportProps(props);
        (_a = (_b = this._props).margins) !== null && _a !== void 0 ? _a : (_b.margins = new Margin_1.Margin(GanttExportCalculator._defaultPageMargin));
    }
    Object.defineProperty(GanttExportCalculator.prototype, "chartTableScaleTopMatrix", {
        get: function () {
            var _a;
            (_a = this._chartTableScaleTopMatrix) !== null && _a !== void 0 ? _a : (this._chartTableScaleTopMatrix = this.calculateChartScaleMatrix(0));
            return this._chartTableScaleTopMatrix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "chartTableScaleBottomMatrix", {
        get: function () {
            var _a;
            (_a = this._chartTableScaleBottomMatrix) !== null && _a !== void 0 ? _a : (this._chartTableScaleBottomMatrix = this.calculateChartScaleMatrix(1));
            return this._chartTableScaleBottomMatrix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "chartTableBodyMatrix", {
        get: function () {
            if (!this._chartTableBodyMatrix)
                this.calculateChartTableBodyMatrix();
            return this._chartTableBodyMatrix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "treeListHeaderMatrix", {
        get: function () {
            if (!this._treeListHeaderMatrix)
                this.calculateTreeListTableHeaderMatrix();
            return this._treeListHeaderMatrix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "treeListBodyMatrix", {
        get: function () {
            if (!this._treeListBodyMatrix)
                this.calculateTreeListTableBodyMatrix();
            return this._treeListBodyMatrix;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.getPages = function (pdfDoc) {
        var paginator = new Paginator_1.PdfGanttPaginator(pdfDoc, this.settings, this.createGlobalInfo());
        return paginator.getPages();
    };
    Object.defineProperty(GanttExportCalculator.prototype, "settings", {
        get: function () {
            return this.settingsForPaging;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "layoutCalculator", {
        get: function () {
            return this._taskAreaHelper.layoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "taskAreaHelper", {
        get: function () {
            var _a;
            (_a = this._taskAreaHelper) !== null && _a !== void 0 ? _a : (this._taskAreaHelper = new TaskAreaHelper_1.TaskAreaExportHelper(this._owner, this._props));
            return this._taskAreaHelper;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "scalingHelper", {
        get: function () {
            var _a, _b;
            (_a = this._scalingHelper) !== null && _a !== void 0 ? _a : (this._scalingHelper = new ScalingHelper_1.ScalingHelper((_b = this._props) === null || _b === void 0 ? void 0 : _b.pdfDoc));
            return this._scalingHelper;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "visibleTaskIndices", {
        get: function () {
            return this.taskAreaHelper.visibleTaskIndices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "baseCellWidth", {
        get: function () {
            return this.taskAreaHelper.baseCellSize.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "baseCellHeight", {
        get: function () {
            return this.taskAreaHelper.baseCellHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "chartScaleTableStyle", {
        get: function () {
            var _a;
            (_a = this._chartScaleTableStyle) !== null && _a !== void 0 ? _a : (this._chartScaleTableStyle = this.getChartScaleTableStyle());
            return this._chartScaleTableStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "chartMainTableStyle", {
        get: function () {
            var _a;
            (_a = this._chartMainTableStyle) !== null && _a !== void 0 ? _a : (this._chartMainTableStyle = this.getChartMainTableStyle());
            return this._chartMainTableStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "treeListTableStyle", {
        get: function () {
            if (!this._treeListTableStyle)
                this.calculateTreeListTableStyle();
            return this._treeListTableStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "pageTopMargin", {
        get: function () {
            return this._props.margins.top;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "pageLeftMargin", {
        get: function () {
            return this._props.margins.left;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "pageRightMargin", {
        get: function () {
            return this._props.margins.right;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "pageBottomMargin", {
        get: function () {
            return this._props.margins.bottom;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "headerTableTop", {
        get: function () {
            var _a;
            (_a = this._headerTableTop) !== null && _a !== void 0 ? _a : (this._headerTableTop = this.pageTopMargin);
            return this._headerTableTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "mainTableTop", {
        get: function () {
            var _a;
            (_a = this._mainTableTop) !== null && _a !== void 0 ? _a : (this._mainTableTop = this.getMainTableTop());
            return this._mainTableTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "exportDataMode", {
        get: function () {
            return this._props.exportDataMode;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.getMainTableTop = function () {
        return this.headerTableTop + this.headerTableHeight - this.taskAreaHelper.offsetTop;
    };
    Object.defineProperty(GanttExportCalculator.prototype, "chartLeft", {
        get: function () {
            var _a;
            (_a = this._chartLeft) !== null && _a !== void 0 ? _a : (this._chartLeft = this.getChartLeft());
            return this._chartLeft;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.getChartLeft = function () {
        var _a;
        var mode = ((_a = this._props) === null || _a === void 0 ? void 0 : _a.exportMode) || Enums_2.ExportMode.all;
        var visibleLeft = mode === Enums_2.ExportMode.chart ? this.pageLeftMargin : this.treeListLeft + this.treeListWidth;
        var left = visibleLeft - this.taskAreaHelper.offsetLeft;
        return left;
    };
    Object.defineProperty(GanttExportCalculator.prototype, "treeListLeft", {
        get: function () {
            var _a;
            (_a = this._treeListLeft) !== null && _a !== void 0 ? _a : (this._treeListLeft = this.pageLeftMargin);
            return this._treeListLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "headerTableHeight", {
        get: function () {
            return 2 * this.taskAreaHelper.headerRowHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "mainTableHeight", {
        get: function () {
            var _a;
            (_a = this._mainTableHeight) !== null && _a !== void 0 ? _a : (this._mainTableHeight = this.taskAreaHelper.taskAreaHeight);
            return this._mainTableHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "treeListWidth", {
        get: function () {
            var _a;
            (_a = this._treeListWidth) !== null && _a !== void 0 ? _a : (this._treeListWidth = this.getTreeListTableWidth());
            return this._treeListWidth;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.getTreeListTableWidth = function () {
        var _this = this;
        var _a;
        var headerWidths = this.treeListHeaderMatrix[0].map(function (c, i) { return _this.getTreeListColumnWidth(i); });
        return (_a = headerWidths === null || headerWidths === void 0 ? void 0 : headerWidths.reduce(function (acc, v) { return acc += v; }, 0)) !== null && _a !== void 0 ? _a : 0;
    };
    Object.defineProperty(GanttExportCalculator.prototype, "chartWidth", {
        get: function () {
            var _this = this;
            if (!this._chartWidth) {
                var row = this.chartTableScaleBottomMatrix[0];
                this._chartWidth = row.reduce(function (acc, v) {
                    return acc += v.styles.cellWidth.hasValue() ? v.styles.cellWidth.getValue() : _this.baseCellWidth;
                }, 0);
            }
            return this._chartWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "settingsForPaging", {
        get: function () {
            if (!this._settingsForPaging) {
                this._settingsForPaging = new Props_1.GanttPdfExportProps(this._props);
                this.prepareAutoFormat(this._settingsForPaging);
                this.scalingHelper.scalePageMargins(this._settingsForPaging);
            }
            return this._settingsForPaging;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.prepareAutoFormat = function (settings) {
        if (settings.format === Props_1.GanttPdfExportProps.autoFormatKey) {
            settings.format = null;
            var landscape = settings.landscape;
            var width = this.autoFormatWidth;
            var height = this.autoFormatHeight;
            var rotateLanscape = (landscape && height > width) || (!landscape && height < width);
            if (rotateLanscape)
                settings.landscape = !landscape;
            settings.pageSize = new size_1.Size(width, height);
        }
    };
    Object.defineProperty(GanttExportCalculator.prototype, "autoFormatWidth", {
        get: function () {
            var _a;
            var mode = ((_a = this._props) === null || _a === void 0 ? void 0 : _a.exportMode) || Enums_2.ExportMode.all;
            var hasChart = mode !== Enums_2.ExportMode.treeList;
            var width = this.pageRightMargin;
            if (hasChart)
                width += this.chartLeft + this.chartWidth;
            else
                width += this.treeListLeft + this.treeListWidth;
            return width + GanttExportCalculator._autoFormatWidthAddStock;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "autoFormatHeight", {
        get: function () {
            return this.mainTableTop + this.mainTableHeight + this.pageBottomMargin;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.createGlobalInfo = function () {
        var info = {
            objects: this._canExportChart() ? this.getGanttObjectsInfo() : null,
            tables: this.getTablesInfo()
        };
        this.scalingHelper.scaleSizes(info);
        return info;
    };
    GanttExportCalculator.prototype.getTablesInfo = function () {
        var info = {};
        if (this._canExportTreelist()) {
            info[Interfaces_1.PdfPageTableNames.treeListHeader] = this.createTreeListHeaderTableInfo();
            info[Interfaces_1.PdfPageTableNames.treeListMain] = this.createTreeListMainTableInfo();
        }
        if (this._canExportChart()) {
            info[Interfaces_1.PdfPageTableNames.chartMain] = this.createChartMainTableInfo();
            info[Interfaces_1.PdfPageTableNames.chartScaleTop] = this._createChartScaleTopInfo();
            info[Interfaces_1.PdfPageTableNames.chartScaleBottom] = this._createChartScaleBottomInfo();
        }
        return info;
    };
    Object.defineProperty(GanttExportCalculator.prototype, "exportMode", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this._props) === null || _a === void 0 ? void 0 : _a.exportMode) !== null && _b !== void 0 ? _b : Enums_2.ExportMode.all;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype._canExportTreelist = function () {
        return this.exportMode === Enums_2.ExportMode.all || this.exportMode === Enums_2.ExportMode.treeList;
    };
    GanttExportCalculator.prototype._canExportChart = function () {
        return this.exportMode === Enums_2.ExportMode.all || this.exportMode === Enums_2.ExportMode.chart;
    };
    Object.defineProperty(GanttExportCalculator.prototype, "_predefinedFont", {
        get: function () {
            var _a, _b, _c, _d;
            var font = (_b = (_a = this._props) === null || _a === void 0 ? void 0 : _a.pdfDoc) === null || _b === void 0 ? void 0 : _b.getFont();
            return (font === null || font === void 0 ? void 0 : font.fontName) || ((_d = (_c = this._props) === null || _c === void 0 ? void 0 : _c.font) === null || _d === void 0 ? void 0 : _d.name);
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype._createChartScaleTopInfo = function () {
        return {
            name: Interfaces_1.PdfPageTableNames.chartScaleTop,
            size: new size_1.Size(this.chartWidth, this.taskAreaHelper.headerRowHeight),
            position: new point_1.Point(this.chartLeft, this.headerTableTop),
            style: this.chartScaleTableStyle,
            baseCellSize: new size_1.Size(this.baseCellWidth, this.taskAreaHelper.headerRowHeight),
            cells: this.chartTableScaleTopMatrix
        };
    };
    GanttExportCalculator.prototype._createChartScaleBottomInfo = function () {
        var rowHeight = this.taskAreaHelper.headerRowHeight;
        return {
            name: Interfaces_1.PdfPageTableNames.chartScaleBottom,
            size: new size_1.Size(this.chartWidth, rowHeight),
            position: new point_1.Point(this.chartLeft, this.headerTableTop + rowHeight),
            style: this.chartScaleTableStyle,
            baseCellSize: new size_1.Size(this.baseCellWidth, rowHeight),
            cells: this.chartTableScaleBottomMatrix
        };
    };
    GanttExportCalculator.prototype.createChartMainTableInfo = function () {
        var info = {
            name: Interfaces_1.PdfPageTableNames.chartMain,
            size: new size_1.Size(this.chartWidth, this.mainTableHeight),
            position: new point_1.Point(this.chartLeft, this.mainTableTop),
            style: this.chartMainTableStyle,
            baseCellSize: new size_1.Size(this.baseCellWidth, this.baseCellHeight),
            cells: this.chartTableBodyMatrix,
            hideRowLines: !this._owner.settings.areHorizontalBordersEnabled
        };
        return info;
    };
    GanttExportCalculator.prototype.createTreeListHeaderTableInfo = function () {
        var info = {
            name: Interfaces_1.PdfPageTableNames.treeListHeader,
            size: new size_1.Size(this.treeListWidth, this.headerTableHeight),
            position: new point_1.Point(this.treeListLeft, this.headerTableTop),
            style: this.treeListTableStyle,
            baseCellSize: new size_1.Size(null, this.headerTableHeight),
            cells: this.treeListHeaderMatrix
        };
        return info;
    };
    GanttExportCalculator.prototype.createTreeListMainTableInfo = function () {
        var info = {
            name: Interfaces_1.PdfPageTableNames.treeListMain,
            size: new size_1.Size(this.treeListWidth, this.mainTableHeight),
            position: new point_1.Point(this.treeListLeft, this.mainTableTop),
            style: this.treeListTableStyle,
            baseCellSize: new size_1.Size(null, this.baseCellHeight),
            cells: this.treeListBodyMatrix,
            hideRowLines: !this._owner.settings.areHorizontalBordersEnabled
        };
        return info;
    };
    GanttExportCalculator.prototype.calculateChartScaleMatrix = function (index) {
        var helper = this.taskAreaHelper;
        var ranges = helper.scaleRanges;
        var row = new Array();
        var start = ranges[index][0];
        var end = ranges[index][1];
        for (var j = start; j <= end; j++) {
            var start_1 = this.layoutCalculator.getScaleItemStart(j, helper.scales[index]);
            var cell = new CellDef_1.CellDef(this._owner.renderHelper.getScaleItemTextByStart(start_1, helper.scales[index]));
            cell.styles.cellPadding.assign(0);
            cell.styles.minCellHeight = this.taskAreaHelper.headerRowHeight;
            var cellWidth = index === 0 ? helper.scaleTopWidths[j] : helper.scaleBottomWidths[j];
            cell.styles.cellWidth.assign(cellWidth);
            row.push(cell);
        }
        return [row];
    };
    GanttExportCalculator.prototype.calculateChartTableBodyMatrix = function () {
        var _this = this;
        this._chartTableBodyMatrix = new Array();
        if (this.visibleTaskIndices.length > 0)
            this.visibleTaskIndices.forEach(function (i) { return _this._chartTableBodyMatrix.push(_this.createChartTableBodyRow(i)); });
        else
            this._chartTableBodyMatrix.push(this.createChartTableBodyRow(-1));
    };
    GanttExportCalculator.prototype.createChartTableBodyRow = function (index) {
        var etalon = new CellDef_1.CellDef();
        if (this.rowHasChildren(index))
            etalon.styles.fillColor.assign(this.taskAreaHelper.parentRowBackColor);
        return this.chartTableScaleBottomMatrix[0].map(function (c) {
            var cell = new CellDef_1.CellDef(etalon);
            cell.styles.cellWidth.assign(c.styles.cellWidth);
            return cell;
        });
    };
    GanttExportCalculator.prototype.rowHasSelection = function (index) {
        return this._owner.rowHasSelection(index);
    };
    GanttExportCalculator.prototype.rowHasChildren = function (index) {
        return this._owner.rowHasChildren(index);
    };
    GanttExportCalculator.prototype.calculateTreeListTableHeaderMatrix = function () {
        this._treeListHeaderMatrix = new Array();
        var owner = this._owner;
        var colCount = owner.getTreeListColCount();
        var row = new Array();
        for (var j = 0; j < colCount; j++) {
            var cell = new CellDef_1.CellDef(owner.getTreeListHeaderInfo(j));
            cell.styles.minCellHeight = 2 * this.taskAreaHelper.headerRowHeight;
            row.push(cell);
        }
        this._treeListHeaderMatrix.push(row);
    };
    GanttExportCalculator.prototype.calculateTreeListTableBodyMatrix = function () {
        this._treeListBodyMatrix = new Array();
        var hasTasks = this.visibleTaskIndices.length > 0;
        if (hasTasks)
            this.fillTreeListTableBodyMatrix(this._treeListBodyMatrix);
        else
            this.fillTreeListEmptyTableBodyMatrix(this._treeListBodyMatrix);
    };
    GanttExportCalculator.prototype.fillTreeListTableBodyMatrix = function (matrix) {
        var _a;
        var visibleTaskIndices = this.visibleTaskIndices;
        var colCount = this.treeListHeaderMatrix[0].length;
        for (var i = 0; i < visibleTaskIndices.length; i++) {
            var row = new Array();
            var visibleIndex = visibleTaskIndices[i];
            var taskKey = (_a = this._owner.getTask(visibleIndex)) === null || _a === void 0 ? void 0 : _a.id;
            for (var j = 0; j < colCount; j++) {
                var cell = new CellDef_1.CellDef(this._owner.getTreeListCellInfo(visibleIndex, j, taskKey));
                if (!cell.styles.cellWidth.hasValue())
                    cell.styles.cellWidth.assign(this.getTreeListColumnWidth(j));
                if (this.rowHasChildren(visibleTaskIndices[i]))
                    cell.styles.fillColor.assign(this.taskAreaHelper.parentRowBackColor);
                row.push(cell);
            }
            matrix.push(row);
        }
    };
    GanttExportCalculator.prototype.fillTreeListEmptyTableBodyMatrix = function (matrix) {
        var row = new Array();
        var cell = new CellDef_1.CellDef(this._owner.getTreeListEmptyDataCellInfo());
        cell.styles.cellWidth.assign(this.treeListWidth);
        cell.styles.halign = PredefinedStyles_1.PredefinedStyles.horizontalAlign[1];
        cell.styles.valign = PredefinedStyles_1.PredefinedStyles.verticalAlign[1];
        row.push(cell);
        matrix.push(row);
    };
    GanttExportCalculator.prototype.getTreeListColumnWidth = function (colIndex) {
        var info = this.treeListHeaderMatrix[0][colIndex];
        var style = info && info.styles;
        var numWidth = style.cellWidth.getValue();
        return numWidth || style.minCellWidth || 0;
    };
    GanttExportCalculator.prototype.getObjectsLeftOffset = function (isTask) {
        if (isTask === void 0) { isTask = false; }
        var offset = this.dataObjectLeftDelta;
        if (!isTask)
            offset += this.taskAreaHelper.customRangeLeftOffset;
        return offset;
    };
    Object.defineProperty(GanttExportCalculator.prototype, "dataObjectLeftDelta", {
        get: function () {
            var _a;
            (_a = this._dataObjectLeftDelta) !== null && _a !== void 0 ? _a : (this._dataObjectLeftDelta = this.getDataObjectLeftDelta());
            return this._dataObjectLeftDelta;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "dataObjectTopDelta", {
        get: function () {
            var _a;
            (_a = this._dataObjectTopDelta) !== null && _a !== void 0 ? _a : (this._dataObjectTopDelta = this.getDataObjectTopDelta());
            return this._dataObjectTopDelta;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.getChartScaleTableStyle = function () {
        var style = new StyleDef_1.StyleDef(this.taskAreaHelper.scaleTableStyle);
        if (this._predefinedFont)
            style.font = this._predefinedFont;
        return style;
    };
    GanttExportCalculator.prototype.getChartMainTableStyle = function () {
        var style = new StyleDef_1.StyleDef(this.taskAreaHelper.chartMainTableStyle);
        if (this._predefinedFont)
            style.font = this._predefinedFont;
        return style;
    };
    GanttExportCalculator.prototype.calculateTreeListTableStyle = function () {
        this._treeListTableStyle = new StyleDef_1.StyleDef(this._owner.getTreeListTableStyle());
        this._treeListTableStyle.fillColor.assign(this.chartMainTableStyle.fillColor);
        this._treeListTableStyle.lineColor.assign(this.chartMainTableStyle.lineColor);
        if (this._predefinedFont)
            this._treeListTableStyle.font = this._predefinedFont;
    };
    GanttExportCalculator.prototype.getGanttObjectsInfo = function () {
        return {
            tasks: this.tasksInfo,
            dependencies: this.dependenciesInfo,
            resources: this.resourcesInfo,
            timeMarkers: this.timeMarkersInfo
        };
    };
    Object.defineProperty(GanttExportCalculator.prototype, "tasksInfo", {
        get: function () {
            var _a;
            (_a = this._tasksInfo) !== null && _a !== void 0 ? _a : (this._tasksInfo = this.calculateTasksInfo());
            return this._tasksInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "dependenciesInfo", {
        get: function () {
            var _a;
            (_a = this._dependenciesInfo) !== null && _a !== void 0 ? _a : (this._dependenciesInfo = this.calculateDependenciesInfo());
            return this._dependenciesInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "resourcesInfo", {
        get: function () {
            var _a;
            (_a = this._resourcesInfo) !== null && _a !== void 0 ? _a : (this._resourcesInfo = this.calculateResourcesInfo());
            return this._resourcesInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "timeMarkersInfo", {
        get: function () {
            var _a;
            (_a = this._timeMarkersInfo) !== null && _a !== void 0 ? _a : (this._timeMarkersInfo = this.calculateTimeMarkersInfoInfo());
            return this._timeMarkersInfo;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.getDataObjectLeftDelta = function () {
        return this.chartLeft - this.taskAreaHelper.objectsLeftDelta;
    };
    GanttExportCalculator.prototype.getDataObjectTopDelta = function () {
        return this.headerTableTop + this.headerTableHeight - this.taskAreaHelper.objectsTopDelta;
    };
    GanttExportCalculator.prototype.calculateTasksInfo = function () {
        var _this = this;
        var result = new Array();
        this.visibleTaskIndices.forEach(function (i) { return result.push(_this.calculateTaskInfo(i)); });
        return result;
    };
    GanttExportCalculator.prototype.calculateTaskInfo = function (index) {
        var info = new TaskInfo_1.PdfTaskInfo();
        var taskElementInfo = this.layoutCalculator.getTaskElementInfo(index);
        info.taskColor = this.getTaskColor(index);
        info.sidePoints = this.getTaskSidePoints(index);
        info.isMilestone = taskElementInfo.className.indexOf(GridLayoutCalculator_1.GridLayoutCalculator.milestoneClassName) > 0;
        if (!info.isMilestone) {
            info.isSmallTask = taskElementInfo.className.indexOf(GridLayoutCalculator_1.GridLayoutCalculator.smallTaskClassName) > 0;
            info.isParent = taskElementInfo.className.indexOf(GridLayoutCalculator_1.GridLayoutCalculator.parentTaskClassName) > 0;
            this.appendTaskTitle(info, index);
            this.appendTaskProgress(info, index);
        }
        return info;
    };
    GanttExportCalculator.prototype.appendTaskTitle = function (info, index) {
        var textPosition = this._owner.settings.taskTitlePosition;
        var isTextHidden = info.isSmallTask && textPosition !== Enums_1.TaskTitlePosition.Outside || textPosition === Enums_1.TaskTitlePosition.None;
        if (!isTextHidden) {
            info.text = this._owner.getTaskText(index);
            info.textPosition = textPosition;
            info.textStyle = this.getTaskTextStyle(index);
        }
    };
    GanttExportCalculator.prototype.appendTaskProgress = function (info, index) {
        var progressInfo = this.layoutCalculator.getTaskProgressElementInfo(index);
        info.progressWidth = progressInfo.size.width;
        info.progressColor = this.getTaskProgressColor(index);
        info.progressColor.applyOpacityToBackground(info.taskColor);
    };
    GanttExportCalculator.prototype.getTaskSidePoints = function (index) {
        var _this = this;
        var points = this.layoutCalculator.getTaskSidePoints(index);
        points.forEach(function (p) {
            p.x += _this.getObjectsLeftOffset(true);
            p.y += _this.dataObjectTopDelta;
        });
        return points;
    };
    GanttExportCalculator.prototype.getTaskColor = function (index) {
        var color = this.taskAreaHelper.getTaskElementBackColor(index, GridLayoutCalculator_1.GridLayoutCalculator.taskClassName);
        return new Color_1.Color(color);
    };
    GanttExportCalculator.prototype.getTaskProgressColor = function (index) {
        return new Color_1.Color(this.taskAreaHelper.getTaskElementBackColor(index, GridLayoutCalculator_1.GridLayoutCalculator.taskProgressClassName));
    };
    GanttExportCalculator.prototype.getTaskTextStyle = function (index) {
        var style = new StyleDef_1.StyleDef();
        style.cellPadding.assign(0);
        style.assign(this.taskAreaHelper.getTaskElementStyle(index, GridLayoutCalculator_1.GridLayoutCalculator.taskTitleClassName));
        return style;
    };
    GanttExportCalculator.prototype.calculateDependenciesInfo = function () {
        var _this = this;
        var result = new Array();
        var helper = this.taskAreaHelper;
        var fillColor = new Color_1.Color(helper.dependencyColor);
        helper.connectorLines.forEach(function (line) { return result.push(_this.createLineInfo(line, fillColor, helper.arrowWidth)); });
        return result;
    };
    GanttExportCalculator.prototype.createLineInfo = function (line, fillColor, arrowWidth) {
        var info = new DependencyLineInfo_1.PdfDependencyLineInfo();
        info.fillColor = fillColor;
        var isArrow = line.className.indexOf(GridLayoutCalculator_1.GridLayoutCalculator.arrowClassName) > -1;
        if (isArrow) {
            var position = this.layoutCalculator.getArrowPositionByClassName(line.className);
            info.arrowInfo = { position: position, width: arrowWidth };
            info.points = [this.getArrowTopCorner(line, position, arrowWidth)];
        }
        else
            info.points = this.getLinePoints(line);
        return info;
    };
    GanttExportCalculator.prototype.getArrowTopCorner = function (info, position, width) {
        var x = info.position.x + this.getObjectsLeftOffset();
        var y = info.position.y + this.dataObjectTopDelta;
        switch (position) {
            case Enums_1.Position.Left:
                x += width;
                break;
            case Enums_1.Position.Top:
                y += width;
        }
        return new point_1.Point(x, y);
    };
    GanttExportCalculator.prototype.getLinePoints = function (line) {
        var x1 = line.position.x + this.getObjectsLeftOffset();
        var y1 = line.position.y + this.dataObjectTopDelta;
        var x2 = x1 + line.size.width;
        var y2 = y1 + line.size.height;
        return [new point_1.Point(x1, y1), new point_1.Point(x2, y2)];
    };
    GanttExportCalculator.prototype.calculateResourcesInfo = function () {
        var _this = this;
        var result = new Array();
        this.taskAreaHelper.resourcesElements.forEach(function (rw) { return result = result.concat(_this.calculateResourcesInLine(rw)); });
        return result;
    };
    GanttExportCalculator.prototype.calculateResourcesInLine = function (wrapper) {
        var result = new Array();
        if (wrapper) {
            var left = dom_1.DomUtils.pxToInt(wrapper.style.left) + this.getObjectsLeftOffset();
            var top_1 = dom_1.DomUtils.pxToInt(wrapper.style.top) + this.dataObjectTopDelta;
            var resources = wrapper.getElementsByClassName(GridLayoutCalculator_1.GridLayoutCalculator.taskResourceClassName);
            for (var i = 0; i < resources.length; i++) {
                var resource = resources[i];
                if (this.taskAreaHelper.isElementVisible(resource)) {
                    var style = getComputedStyle(resource);
                    left += this.getMargin(style).left;
                    result.push(new TaskResourcesInfo_1.PdfTaskResourcesInfo(resource.textContent, new StyleDef_1.StyleDef(style), left, top_1));
                    left += dom_1.DomUtils.pxToInt(style.width);
                }
            }
        }
        return result;
    };
    GanttExportCalculator.prototype.calculateTimeMarkersInfoInfo = function () {
        var _this = this;
        var result = new Array();
        var stripLines = this.taskAreaHelper.stripLinesElements;
        stripLines.forEach(function (s) { return result.push(_this.createTimeMarkerInfo(s, true)); });
        var noWorkIntervals = this.taskAreaHelper.noWorkingIntervalsElements;
        noWorkIntervals.forEach(function (s) { return result.push(_this.createTimeMarkerInfo(s, false)); });
        return result;
    };
    GanttExportCalculator.prototype.createTimeMarkerInfo = function (element, isStripLine) {
        var style = getComputedStyle(element);
        var left = dom_1.DomUtils.pxToInt(style.left) + this.getObjectsLeftOffset();
        var top = dom_1.DomUtils.pxToInt(style.top) + this.dataObjectTopDelta;
        var width = dom_1.DomUtils.pxToInt(style.width);
        var height = dom_1.DomUtils.pxToInt(style.height);
        return new TimeMarkerInfo_1.PdfTimeMarkerInfo(new point_1.Point(left, top), new size_1.Size(width, height), new Color_1.Color(style.backgroundColor), new Color_1.Color(style.borderLeftColor), isStripLine);
    };
    GanttExportCalculator.prototype.getMargin = function (style) {
        var margin = new Margin_1.Margin(0);
        if (style) {
            var marginCss = style.margin;
            if (!marginCss) {
                marginCss += style.marginTop || "0";
                marginCss += " " + style.marginRight || 0;
                marginCss += " " + style.marginBottom || 0;
                marginCss += " " + style.marginLeft || 0;
            }
            margin.assign(marginCss);
        }
        return margin;
    };
    GanttExportCalculator._defaultPageMargin = 10;
    GanttExportCalculator._autoFormatWidthAddStock = 1;
    return GanttExportCalculator;
}());
exports.GanttExportCalculator = GanttExportCalculator;


/***/ }),

/***/ 4991:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfDependencyLineInfo = void 0;
var point_1 = __webpack_require__(8900);
var Color_1 = __webpack_require__(405);
var PdfDependencyLineInfo = (function () {
    function PdfDependencyLineInfo() {
    }
    PdfDependencyLineInfo.prototype.assign = function (source) {
        var _a;
        this._copyPoints(source.points);
        this.arrowInfo = source.arrowInfo;
        (_a = this.fillColor) !== null && _a !== void 0 ? _a : (this.fillColor = new Color_1.Color());
        this.fillColor.assign(source.fillColor);
    };
    PdfDependencyLineInfo.prototype._copyPoints = function (source) {
        var _this = this;
        this.points = new Array();
        source === null || source === void 0 ? void 0 : source.forEach(function (p) { return _this.points.push(new point_1.Point(p.x, p.y)); });
    };
    return PdfDependencyLineInfo;
}());
exports.PdfDependencyLineInfo = PdfDependencyLineInfo;


/***/ }),

/***/ 266:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfObjectDrawer = void 0;
var Enums_1 = __webpack_require__(2449);
var Ellipsis_1 = __webpack_require__(817);
var TaskInfo_1 = __webpack_require__(3917);
var PdfObjectDrawer = (function () {
    function PdfObjectDrawer(pdfDoc, info) {
        this._FONT_ROW_RATIO = 1.15;
        this._info = info;
        this._pdfDoc = pdfDoc;
    }
    PdfObjectDrawer.prototype.draw = function () {
        this.drawTimeMarkers();
        this.drawDependencies();
        this.drawTasks();
        this.drawResources();
    };
    PdfObjectDrawer.prototype.drawTasks = function () {
        var _this = this;
        var _a;
        var tasks = (_a = this._info) === null || _a === void 0 ? void 0 : _a.tasks;
        if (tasks)
            tasks.forEach(function (t) { return _this.drawTask(t); });
    };
    PdfObjectDrawer.prototype.drawTask = function (info) {
        var pdfDoc = this._pdfDoc;
        pdfDoc.setFillColor.apply(pdfDoc, info.taskColor.getRBGColor());
        pdfDoc.setDrawColor.apply(pdfDoc, info.taskColor.getRBGColor());
        if (info.isMilestone)
            this.drawMilestone(info);
        else
            this.drawRegularTask(info);
    };
    PdfObjectDrawer.prototype.drawMilestone = function (info) {
        var pdfDoc = this._pdfDoc;
        var x1 = info.sidePoints[0].x;
        var y1 = info.sidePoints[0].y;
        var x2 = info.sidePoints[1].x;
        var y2 = info.sidePoints[1].y;
        var x3 = info.sidePoints[2].x;
        var y3 = info.sidePoints[2].y;
        var x4 = info.sidePoints[3].x;
        var y4 = info.sidePoints[3].y;
        pdfDoc.triangle(x1, y1, x2, y2, x3, y3, "FD");
        pdfDoc.triangle(x1, y1, x4, y4, x3, y3, "FD");
    };
    PdfObjectDrawer.prototype.drawRegularTask = function (info) {
        var pdfDoc = this._pdfDoc;
        pdfDoc.rect(info.left, info.top, info.width, info.height, "FD");
        if (info.isParent)
            this.drawParentBorder(info);
        if (info.progressWidth) {
            pdfDoc.setFillColor.apply(pdfDoc, info.progressColor.getRBGColor());
            pdfDoc.rect(info.left, info.top, info.progressWidth, info.height, "F");
        }
        if (info.text)
            this.printTaskTitle(info);
    };
    PdfObjectDrawer.prototype.drawParentBorder = function (info) {
        var pdfDoc = this._pdfDoc;
        var left = info.sidePoints[0].x;
        var top = info.sidePoints[1].y;
        var bottom = info.sidePoints[3].y;
        var right = info.sidePoints[2].x;
        var height = info.sidePoints[3].y - info.sidePoints[1].y;
        var leftBorderColor = info.progressWidth > height ? info.progressColor.getRBGColor() : info.taskColor.getRBGColor();
        pdfDoc.setFillColor.apply(pdfDoc, leftBorderColor);
        pdfDoc.triangle(left, top, left, bottom, left + height, top, "FD");
        pdfDoc.setFillColor.apply(pdfDoc, info.taskColor.getRBGColor());
        pdfDoc.triangle(right, top, right, bottom, right - height, top, "FD");
    };
    PdfObjectDrawer.prototype.printTaskTitle = function (info) {
        var pdfDoc = this._pdfDoc;
        var style = info.textStyle;
        var colorArray = style && style.textColor.getRBGColor();
        var fontSize = style && style.fontSize;
        pdfDoc.setTextColor.apply(pdfDoc, colorArray);
        pdfDoc.setFontSize(fontSize);
        var textPosX;
        var textPosY = info.top + fontSize * this._FONT_ROW_RATIO / pdfDoc.internal.scaleFactor;
        if (info.isParent)
            textPosY -= TaskInfo_1.PdfTaskInfo.defaultParentHeightCorrection;
        var leftPadding = style && style.cellPadding.left || 0;
        var rightPadding = style && style.cellPadding.right || 0;
        if (info.textPosition === Enums_1.TaskTitlePosition.Inside) {
            var textWidth = info.width - leftPadding - rightPadding;
            textPosX = info.left + leftPadding;
            pdfDoc.text(Ellipsis_1.EllipsisHelper.limitPdfTextWithEllipsis(info.text, pdfDoc, textWidth), textPosX, textPosY);
        }
        else {
            textPosX = info.left - rightPadding;
            pdfDoc.text(info.text, textPosX, textPosY, { align: "right" });
        }
    };
    PdfObjectDrawer.prototype.drawDependencies = function () {
        var _this = this;
        var _a;
        var dependencies = (_a = this._info) === null || _a === void 0 ? void 0 : _a.dependencies;
        if (dependencies)
            dependencies.forEach(function (d) { return _this.drawDependencyLine(d); });
    };
    PdfObjectDrawer.prototype.drawDependencyLine = function (line) {
        var _a, _b;
        (_a = this._pdfDoc).setFillColor.apply(_a, line.fillColor.getRBGColor());
        (_b = this._pdfDoc).setDrawColor.apply(_b, line.fillColor.getRBGColor());
        if (line.arrowInfo)
            this.drawArrow(line);
        else {
            var points = line.points;
            this._pdfDoc.line(points[0].x, points[0].y, points[1].x, points[1].y);
        }
    };
    PdfObjectDrawer.prototype.isValidLine = function (line) {
        var points = line.points;
        return !isNaN(points[0].x) && !isNaN(points[0].y) && !isNaN(points[1].x) && !isNaN(points[1].y);
    };
    PdfObjectDrawer.prototype.drawArrow = function (line) {
        var width = line.arrowInfo.width || 0;
        var left = line.points[0].x;
        var top = line.points[0].y;
        switch (line.arrowInfo.position) {
            case Enums_1.Position.Left:
                this._pdfDoc.triangle(left, top + width, left + width, top, left + width, top + 2 * width, "FD");
                break;
            case Enums_1.Position.Right:
                this._pdfDoc.triangle(left, top, left, top + 2 * width, left + width, top + width, "FD");
                break;
            case Enums_1.Position.Top:
                this._pdfDoc.triangle(left, top + width, left + width, top, left + 2 * width, top + width, "FD");
                break;
            case Enums_1.Position.Bottom:
                this._pdfDoc.triangle(left, top, left + width, top + width, left + 2 * width, top, "FD");
                break;
        }
    };
    PdfObjectDrawer.prototype.drawResources = function () {
        var _this = this;
        var _a;
        var pdfDoc = this._pdfDoc;
        var resources = (_a = this._info) === null || _a === void 0 ? void 0 : _a.resources;
        if (resources)
            resources.forEach(function (r) {
                var _a, _b, _c;
                pdfDoc.setFontSize((_a = r.style.fontSize) !== null && _a !== void 0 ? _a : 11);
                var textPosY = r.y + r.style.fontSize * _this._FONT_ROW_RATIO / pdfDoc.internal.scaleFactor;
                var paddingLeft = (_b = r.style.cellPadding.left) !== null && _b !== void 0 ? _b : 0;
                var paddingRight = (_c = r.style.cellPadding.right) !== null && _c !== void 0 ? _c : 1;
                var resWidth = Math.max(r.style.cellWidth.getValue(), paddingLeft + pdfDoc.getTextWidth(r.text) + paddingRight);
                pdfDoc.setFillColor.apply(pdfDoc, r.style.fillColor.getRBGColor());
                pdfDoc.rect(r.x, r.y, resWidth, r.style.minCellHeight, "F");
                pdfDoc.setTextColor.apply(pdfDoc, r.style.textColor.getRBGColor());
                pdfDoc.text(r.text, r.x + paddingLeft, textPosY);
            });
    };
    PdfObjectDrawer.prototype.drawTimeMarkers = function () {
        var _this = this;
        var _a;
        var markers = (_a = this._info) === null || _a === void 0 ? void 0 : _a.timeMarkers;
        markers === null || markers === void 0 ? void 0 : markers.forEach(function (m) { return _this.drawTimeMarker(m); });
    };
    PdfObjectDrawer.prototype.drawTimeMarker = function (marker) {
        var _a;
        var _b;
        var pdfDoc = this._pdfDoc;
        var isInterval = marker.size.width > 1;
        var x = marker.start.x;
        var y = marker.start.y;
        var width = marker.size.width;
        var height = marker.size.height;
        var needDrawBorders = marker.isStripLine;
        if (isInterval) {
            pdfDoc.setFillColor.apply(pdfDoc, marker.color.getRBGColor());
            pdfDoc.saveGraphicsState();
            pdfDoc.setGState(new pdfDoc.GState({ opacity: (_b = marker.color.opacity) !== null && _b !== void 0 ? _b : 1 }));
            pdfDoc.rect(x, y, width, height, "F");
            pdfDoc.restoreGraphicsState();
        }
        if (needDrawBorders) {
            this._pdfDoc.setLineDashPattern([3]);
            (_a = this._pdfDoc).setDrawColor.apply(_a, marker.lineColor.getRBGColor());
            if (isInterval)
                this._pdfDoc.line(x + width, y, x + width, y + height, "S");
            this._pdfDoc.line(x, y, x, y + height, "S");
            this._pdfDoc.setLineDashPattern();
        }
    };
    return PdfObjectDrawer;
}());
exports.PdfObjectDrawer = PdfObjectDrawer;


/***/ }),

/***/ 3917:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfTaskInfo = void 0;
var point_1 = __webpack_require__(8900);
var Color_1 = __webpack_require__(405);
var StyleDef_1 = __webpack_require__(6995);
var PdfTaskInfo = (function () {
    function PdfTaskInfo() {
    }
    Object.defineProperty(PdfTaskInfo.prototype, "left", {
        get: function () {
            var _a;
            return ((_a = this.sidePoints) === null || _a === void 0 ? void 0 : _a.length) > 3 ? this.sidePoints[0].x : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfTaskInfo.prototype, "top", {
        get: function () {
            var _a;
            return ((_a = this.sidePoints) === null || _a === void 0 ? void 0 : _a.length) > 3 ? this.sidePoints[1].y : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfTaskInfo.prototype, "right", {
        get: function () {
            var _a;
            return ((_a = this.sidePoints) === null || _a === void 0 ? void 0 : _a.length) > 3 ? this.sidePoints[2].x : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfTaskInfo.prototype, "bottom", {
        get: function () {
            var _a;
            return ((_a = this.sidePoints) === null || _a === void 0 ? void 0 : _a.length) > 3 ? this.sidePoints[3].y : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfTaskInfo.prototype, "width", {
        get: function () { return this.right - this.left; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfTaskInfo.prototype, "height", {
        get: function () {
            var height = this.bottom - this.top;
            if (this.isParent)
                height -= PdfTaskInfo.defaultParentHeightCorrection;
            return height;
        },
        enumerable: false,
        configurable: true
    });
    PdfTaskInfo.prototype.assign = function (source) {
        var _a, _b, _c;
        this.isMilestone = source.isMilestone;
        this._copyPoints(source.sidePoints);
        this.progressWidth = source.progressWidth;
        this.isSmallTask = source.isSmallTask;
        this.text = source.text;
        this.textPosition = source.textPosition;
        (_a = this.progressColor) !== null && _a !== void 0 ? _a : (this.progressColor = new Color_1.Color());
        this.progressColor.assign(source.progressColor);
        (_b = this.taskColor) !== null && _b !== void 0 ? _b : (this.taskColor = new Color_1.Color());
        this.taskColor.assign(source.taskColor);
        (_c = this.textStyle) !== null && _c !== void 0 ? _c : (this.textStyle = new StyleDef_1.StyleDef());
        this.textStyle.assign(source.textStyle);
        this.isParent = source.isParent;
    };
    PdfTaskInfo.prototype._copyPoints = function (source) {
        var _this = this;
        this.sidePoints = new Array();
        source === null || source === void 0 ? void 0 : source.forEach(function (p) { return _this.sidePoints.push(new point_1.Point(p.x, p.y)); });
    };
    PdfTaskInfo.defaultParentHeightCorrection = 4;
    return PdfTaskInfo;
}());
exports.PdfTaskInfo = PdfTaskInfo;


/***/ }),

/***/ 2485:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfTaskResourcesInfo = void 0;
var common_1 = __webpack_require__(2491);
var StyleDef_1 = __webpack_require__(6995);
var PdfTaskResourcesInfo = (function () {
    function PdfTaskResourcesInfo(text, style, x, y) {
        if (text)
            this.text = text;
        if (style)
            this.style = new StyleDef_1.StyleDef(style);
        if ((0, common_1.isDefined)(x))
            this.x = x;
        if ((0, common_1.isDefined)(y))
            this.y = y;
    }
    PdfTaskResourcesInfo.prototype.assign = function (source) {
        this.text = source.text;
        this.style = new StyleDef_1.StyleDef(source.style);
        this.x = source.x;
        this.y = source.y;
    };
    return PdfTaskResourcesInfo;
}());
exports.PdfTaskResourcesInfo = PdfTaskResourcesInfo;


/***/ }),

/***/ 7802:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfTimeMarkerInfo = void 0;
var point_1 = __webpack_require__(8900);
var size_1 = __webpack_require__(6353);
var common_1 = __webpack_require__(2491);
var Color_1 = __webpack_require__(405);
var PdfTimeMarkerInfo = (function () {
    function PdfTimeMarkerInfo(start, size, color, lineColor, isStripLine) {
        this.lineColor = new Color_1.Color();
        this.color = new Color_1.Color();
        if (start)
            this.start = new point_1.Point(start.x, start.y);
        if (size)
            this.size = new size_1.Size(size.width, size.height);
        if (color)
            this.color.assign(color);
        if (lineColor)
            this.lineColor.assign(lineColor);
        if ((0, common_1.isDefined)(isStripLine))
            this.isStripLine = isStripLine;
    }
    PdfTimeMarkerInfo.prototype.assign = function (source) {
        var _a, _b, _c, _d;
        if (source) {
            this.start = new point_1.Point((_a = source.start) === null || _a === void 0 ? void 0 : _a.x, (_b = source.start) === null || _b === void 0 ? void 0 : _b.y);
            this.size = new size_1.Size((_c = source.size) === null || _c === void 0 ? void 0 : _c.width, (_d = source.size) === null || _d === void 0 ? void 0 : _d.height);
            this.isStripLine = source.isStripLine;
            this.color.assign(source.color);
            this.lineColor.assign(source.lineColor);
        }
    };
    return PdfTimeMarkerInfo;
}());
exports.PdfTimeMarkerInfo = PdfTimeMarkerInfo;


/***/ }),

/***/ 2978:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfGanttExporter = void 0;
var PageDrawer_1 = __webpack_require__(4970);
var PdfGanttExporter = (function () {
    function PdfGanttExporter(info) {
        if (!info.settings.pdfDoc && !info.settings.docCreateMethod)
            throw new Error("Cannot convert gantt to pdf without document instance!");
        this._info = info;
    }
    PdfGanttExporter.prototype.export = function () {
        var _a, _b;
        var pdfDoc = this.pdfDoc;
        this.applyCustomFont();
        var info = this._info;
        var drawer = new PageDrawer_1.PdfGanttPageDrawer(pdfDoc, info.settings);
        var pages = info.getPages(pdfDoc);
        var count = pages.length;
        for (var i = 0; i < count; i++) {
            if (i > 0)
                pdfDoc.addPage(this.getDocumentFormat(), this.getOrientation());
            var page = pages[i];
            drawer.drawPage(page);
        }
        if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.fileName)
            pdfDoc.save((_b = this.props) === null || _b === void 0 ? void 0 : _b.fileName);
        return pdfDoc;
    };
    Object.defineProperty(PdfGanttExporter.prototype, "pdfDoc", {
        get: function () {
            var _a, _b;
            (_a = this._pdfDoc) !== null && _a !== void 0 ? _a : (this._pdfDoc = (_b = this._info.settings.pdfDoc) !== null && _b !== void 0 ? _b : this.createDoc());
            return this._pdfDoc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttExporter.prototype, "props", {
        get: function () {
            return this._info.settings;
        },
        enumerable: false,
        configurable: true
    });
    PdfGanttExporter.prototype.createDoc = function () {
        var jsPDFProps = this.getJsPDFProps();
        return this._info.settings.docCreateMethod(jsPDFProps);
    };
    PdfGanttExporter.prototype.getJsPDFProps = function () {
        var props = { putOnlyUsedFonts: true, unit: "px", hotfixes: ["px_scaling"] };
        props["orientation"] = this.getOrientation();
        props["format"] = this.getDocumentFormat();
        return props;
    };
    PdfGanttExporter.prototype.getOrientation = function () {
        var _a;
        return ((_a = this.props) === null || _a === void 0 ? void 0 : _a.landscape) ? "l" : "p";
    };
    PdfGanttExporter.prototype.getDocumentFormat = function () {
        var _a, _b, _c, _d;
        if (!((_a = this.props) === null || _a === void 0 ? void 0 : _a.format) && !((_b = this.props) === null || _b === void 0 ? void 0 : _b.pageSize))
            return "a4";
        if ((_c = this.props) === null || _c === void 0 ? void 0 : _c.pageSize)
            return [this.props.pageSize.height, this.props.pageSize.width];
        return (_d = this.props) === null || _d === void 0 ? void 0 : _d.format;
    };
    PdfGanttExporter.prototype.applyCustomFont = function () {
        if (this.props.font)
            this.props.font.applyToDoc(this.pdfDoc);
    };
    return PdfGanttExporter;
}());
exports.PdfGanttExporter = PdfGanttExporter;


/***/ }),

/***/ 8935:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfPageTableNames = void 0;
var PdfPageTableNames = (function () {
    function PdfPageTableNames() {
    }
    PdfPageTableNames.treeListHeader = "treeListHeader";
    PdfPageTableNames.treeListMain = "treeListMain";
    PdfPageTableNames.chartMain = "chartMain";
    PdfPageTableNames.chartScaleTop = "chartScaleTop";
    PdfPageTableNames.chartScaleBottom = "chartScaleBottom";
    return PdfPageTableNames;
}());
exports.PdfPageTableNames = PdfPageTableNames;


/***/ }),

/***/ 4970:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfGanttPageDrawer = void 0;
var point_1 = __webpack_require__(8900);
var Drawer_1 = __webpack_require__(266);
var Interfaces_1 = __webpack_require__(8935);
var Enums_1 = __webpack_require__(9895);
var Drawer_2 = __webpack_require__(5510);
var PdfGanttPageDrawer = (function () {
    function PdfGanttPageDrawer(pdfDoc, props) {
        this._pdfDoc = pdfDoc;
        this._props = props;
    }
    PdfGanttPageDrawer.prototype.drawPage = function (info) {
        var pdfDoc = this._pdfDoc;
        var tableDrawer = new Drawer_2.PdfGanttTableDrawer(pdfDoc);
        if (this.needDrawChart()) {
            tableDrawer.drawTable(info.tables[Interfaces_1.PdfPageTableNames.chartMain]);
            var objectDrawer = new Drawer_1.PdfObjectDrawer(pdfDoc, info.objects);
            objectDrawer.draw();
            tableDrawer.drawTable(info.tables[Interfaces_1.PdfPageTableNames.chartScaleTop]);
            tableDrawer.drawTable(info.tables[Interfaces_1.PdfPageTableNames.chartScaleBottom]);
        }
        if (this.needDrawTreeList()) {
            tableDrawer.drawTable(info.tables[Interfaces_1.PdfPageTableNames.treeListMain]);
            tableDrawer.drawTable(info.tables[Interfaces_1.PdfPageTableNames.treeListHeader]);
        }
        this.drawMargins(info);
        return pdfDoc;
    };
    PdfGanttPageDrawer.prototype.needDrawChart = function () {
        return !this._props || this._props.exportMode === Enums_1.ExportMode.all || this._props.exportMode === Enums_1.ExportMode.chart;
    };
    PdfGanttPageDrawer.prototype.needDrawTreeList = function () {
        return !this._props || this._props.exportMode === Enums_1.ExportMode.all || this._props.exportMode === Enums_1.ExportMode.treeList;
    };
    PdfGanttPageDrawer.prototype.getContentRightBottom = function (info) {
        var p = new point_1.Point(0, 0);
        for (var key in info.tables)
            if (Object.prototype.hasOwnProperty.call(info.tables, key)) {
                var table = info.tables[key];
                p.x = Math.max(p.x, table.position.x + table.size.width);
                p.y = Math.max(p.y, table.position.y + table.size.height);
            }
        return p;
    };
    PdfGanttPageDrawer.prototype.drawMargins = function (info) {
        var pdfDoc = this._pdfDoc;
        var props = this._props;
        var docWidth = pdfDoc.getPageWidth();
        var docHeight = pdfDoc.getPageHeight();
        var p = this.getContentRightBottom(info);
        pdfDoc.setFillColor(255, 255, 255);
        pdfDoc.rect(0, 0, props.margins.left, docHeight, "F");
        pdfDoc.rect(0, 0, docWidth, props.margins.top, "F");
        pdfDoc.rect(p.x, 0, docWidth, docHeight, "F");
        pdfDoc.rect(0, p.y, docWidth, docHeight, "F");
    };
    return PdfGanttPageDrawer;
}());
exports.PdfGanttPageDrawer = PdfGanttPageDrawer;


/***/ }),

/***/ 4429:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageNavigation = void 0;
var PageNavigation = (function () {
    function PageNavigation(borders, vIndex, hIndex, pageX, pageY, correctedBottoms) {
        this._correctedBottoms = new Array();
        this.vIndex = 0;
        this.hIndex = 0;
        this.pageX = 0;
        this.pageY = 0;
        this._top = borders === null || borders === void 0 ? void 0 : borders.top;
        this._left = borders === null || borders === void 0 ? void 0 : borders.left;
        this._bottom = borders === null || borders === void 0 ? void 0 : borders.bottom;
        this._right = borders === null || borders === void 0 ? void 0 : borders.right;
        this.vIndex = vIndex !== null && vIndex !== void 0 ? vIndex : this.vIndex;
        this.hIndex = hIndex !== null && hIndex !== void 0 ? hIndex : this.hIndex;
        this.pageX = pageX !== null && pageX !== void 0 ? pageX : this.pageX;
        this.pageY = pageY !== null && pageY !== void 0 ? pageY : this.pageY;
        if (correctedBottoms)
            this._correctedBottoms = correctedBottoms;
    }
    PageNavigation.prototype.offset = function (offsetX, offsetY) {
        if (offsetX)
            this.offsetOneD(offsetX);
        if (offsetY)
            this.offsetOneD(offsetY, true);
    };
    PageNavigation.prototype.offsetOneD = function (delta, isVertical) {
        var unplacedSize = delta;
        var spaceToBorder = this.getSpaceToBorder(isVertical);
        while (spaceToBorder < unplacedSize) {
            if (isVertical) {
                this.vIndex++;
                this.pageY = this._top;
            }
            else {
                this.hIndex++;
                this.pageX = this._left;
            }
            unplacedSize -= spaceToBorder;
            spaceToBorder = this.getSpaceToBorder(isVertical);
        }
        if (isVertical)
            this.pageY += unplacedSize;
        else
            this.pageX += unplacedSize;
    };
    Object.defineProperty(PageNavigation.prototype, "defaultPageHeight", {
        get: function () {
            return this.getCurrentPageBottom() - this._top;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PageNavigation.prototype, "defaultPageWidth", {
        get: function () {
            return this._right - this._left;
        },
        enumerable: false,
        configurable: true
    });
    PageNavigation.prototype.getPageEnd = function (isVertical) {
        return isVertical ? this.getCurrentPageBottom() : this._right;
    };
    PageNavigation.prototype.getPageStart = function (isVertical) {
        return isVertical ? this._top : this._left;
    };
    PageNavigation.prototype.getPageSize = function (isVertical, index) {
        return isVertical ? this.getPageHeight(index) : this.defaultPageWidth;
    };
    PageNavigation.prototype.getSpaceToBorder = function (isVertical) {
        return isVertical ? this.getCurrentPageBottom() - this.pageY : this._right - this.pageX;
    };
    PageNavigation.prototype.getPageGlobalOffset = function (index, isVertical) {
        if (!isVertical)
            return index * this.defaultPageWidth;
        var offset = 0;
        for (var i = 1; i <= index; i++)
            offset += this.getPageHeight(i - 1);
        return offset;
    };
    PageNavigation.prototype.assign = function (src) {
        this._top = src._top;
        this._left = src._left;
        this._bottom = src._bottom;
        this._right = src._right;
        this._correctedBottoms = src._correctedBottoms;
        this.vIndex = src.vIndex;
        this.hIndex = src.hIndex;
        this.pageX = src.pageX;
        this.pageY = src.pageY;
    };
    PageNavigation.createFrom = function (src) {
        var instance = new PageNavigation();
        instance.assign(src);
        return instance;
    };
    PageNavigation.prototype.clone = function () {
        var instance = new PageNavigation();
        instance.assign(this);
        return instance;
    };
    PageNavigation.prototype.getCurrentPageBottom = function () {
        return this.getPageBottom(this.vIndex);
    };
    PageNavigation.prototype.getPageBottom = function (index) {
        var _a;
        return (_a = this._correctedBottoms[index]) !== null && _a !== void 0 ? _a : this._bottom;
    };
    PageNavigation.prototype.getPageHeight = function (index) {
        return this.getPageBottom(index) - this._top;
    };
    return PageNavigation;
}());
exports.PageNavigation = PageNavigation;


/***/ }),

/***/ 3424:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfGanttPaginator = void 0;
var point_1 = __webpack_require__(8900);
var size_1 = __webpack_require__(6353);
var DependencyLineInfo_1 = __webpack_require__(4991);
var TaskInfo_1 = __webpack_require__(3917);
var TaskResourcesInfo_1 = __webpack_require__(2485);
var TimeMarkerInfo_1 = __webpack_require__(7802);
var Interfaces_1 = __webpack_require__(8935);
var CellDef_1 = __webpack_require__(6032);
var PageNavigation_1 = __webpack_require__(4429);
var CellNavigationInfo = (function () {
    function CellNavigationInfo(pageHorIndex, pageVerIndex, cellRowIndexOnPage, cellColIndexOnPage, cell) {
        this.pageVerIndex = pageVerIndex;
        this.pageHorIndex = pageHorIndex;
        this.cellRowIndexOnPage = cellRowIndexOnPage;
        this.cellColIndexOnPage = cellColIndexOnPage;
        this.cell = cell;
    }
    return CellNavigationInfo;
}());
var VectorInfo = (function () {
    function VectorInfo(pageIndex, globalCellIndex, pageOffset, cutSize) {
        this.pageIndex = pageIndex;
        this.globalCellIndex = globalCellIndex;
        this.pageOffset = pageOffset;
        this.cutSize = cutSize;
    }
    Object.defineProperty(VectorInfo.prototype, "isCutted", {
        get: function () {
            return this.cutSize > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VectorInfo.prototype, "cellIndexOnPage", {
        get: function () {
            return this.globalCellIndex - this.pageOffset;
        },
        enumerable: false,
        configurable: true
    });
    return VectorInfo;
}());
var PdfGanttPaginator = (function () {
    function PdfGanttPaginator(pdfDoc, props, globalInfo) {
        this._pdfDoc = pdfDoc;
        this._props = props;
        this._globalInfo = globalInfo;
    }
    PdfGanttPaginator.prototype.getPages = function () {
        delete this._pages;
        this._paginateTables();
        this._paginateObjects();
        return this.pageMatrixToArray;
    };
    PdfGanttPaginator.prototype._paginateTables = function () {
        this._paginateTable(Interfaces_1.PdfPageTableNames.treeListHeader);
        this._paginateTable(Interfaces_1.PdfPageTableNames.treeListMain);
        this._paginateTable(Interfaces_1.PdfPageTableNames.chartScaleBottom);
        this._paginateTable(Interfaces_1.PdfPageTableNames.chartScaleTop);
        this._paginateTable(Interfaces_1.PdfPageTableNames.chartMain);
    };
    PdfGanttPaginator.prototype._paginateObjects = function () {
        this._paginateTasks();
        this._paginateDependencies();
        this._paginateResources();
        this._paginateTimeMarkers();
    };
    Object.defineProperty(PdfGanttPaginator.prototype, "pageMatrixToArray", {
        get: function () {
            var _a;
            var result = new Array();
            (_a = this._pages) === null || _a === void 0 ? void 0 : _a.forEach(function (row) {
                result = result.concat(row);
            });
            return result;
        },
        enumerable: false,
        configurable: true
    });
    PdfGanttPaginator.prototype._paginateTasks = function () {
        var _this = this;
        var _a, _b;
        (_b = (_a = this._globalInfo.objects) === null || _a === void 0 ? void 0 : _a.tasks) === null || _b === void 0 ? void 0 : _b.forEach(function (t) { return _this._paginateTask(t); });
    };
    PdfGanttPaginator.prototype._paginateDependencies = function () {
        var _this = this;
        var _a, _b;
        (_b = (_a = this._globalInfo.objects) === null || _a === void 0 ? void 0 : _a.dependencies) === null || _b === void 0 ? void 0 : _b.forEach(function (d) {
            if (d.arrowInfo)
                _this._paginateArrow(d);
            else
                _this._paginateDependencyLine(d);
        });
    };
    PdfGanttPaginator.prototype._paginateResources = function () {
        var _this = this;
        var _a, _b;
        (_b = (_a = this._globalInfo.objects) === null || _a === void 0 ? void 0 : _a.resources) === null || _b === void 0 ? void 0 : _b.forEach(function (r) { return _this._paginateResource(r); });
    };
    PdfGanttPaginator.prototype._paginateTimeMarkers = function () {
        var _this = this;
        var _a, _b;
        (_b = (_a = this._globalInfo.objects) === null || _a === void 0 ? void 0 : _a.timeMarkers) === null || _b === void 0 ? void 0 : _b.forEach(function (m) { return _this._paginateTimeMarker(m); });
    };
    PdfGanttPaginator.prototype._paginateTable = function (tableKey) {
        var _a;
        var table = (_a = this._globalInfo) === null || _a === void 0 ? void 0 : _a.tables[tableKey];
        if (table) {
            var start = this._getTableStart(table);
            var matrix = this._preparePagesNavigationMatrixForTable(start, table);
            var rowCount = matrix.length;
            for (var i = 0; i < rowCount; i++) {
                var colCount = matrix[i].length;
                for (var j = 0; j < colCount; j++) {
                    var navInfo = matrix[i][j];
                    var page = this._getPage(navInfo.pageVerIndex, navInfo.pageHorIndex, true);
                    var tablePositionX = navInfo.pageHorIndex === start.hIndex ? start.pageX : this.pageLeft;
                    var tablePositionY = navInfo.pageVerIndex === start.vIndex ? start.pageY : this.pageTop;
                    this._setTablePositionOnPage(page, tableKey, tablePositionX, tablePositionY);
                    this._addCellToPage(page, tableKey, navInfo);
                }
            }
            this._updateTableSizeOnPages(tableKey);
        }
    };
    PdfGanttPaginator.prototype._paginateTask = function (task) {
        var hOffsets = this._getTaskPagination(task);
        var vOffsets = this._getTaskPagination(task, true);
        for (var i = 0; i < vOffsets.length; i++)
            for (var j = 0; j < hOffsets.length; j++) {
                var newTask = new TaskInfo_1.PdfTaskInfo();
                newTask.assign(task);
                this._offsetPoints(newTask.sidePoints, hOffsets[j].offset, vOffsets[i].offset);
                this._addTaskToPage(vOffsets[i].pageIndex, hOffsets[j].pageIndex, newTask);
            }
    };
    PdfGanttPaginator.prototype._paginateArrow = function (dependency) {
        var pointInfo = this._getPointPageInfo(dependency.points[0]);
        var newDependency = new DependencyLineInfo_1.PdfDependencyLineInfo();
        newDependency.assign(dependency);
        this._offsetPoints(newDependency.points, pointInfo.offsetX, pointInfo.offsetY);
        this._addDependencyToPage(pointInfo.pageVerIndex, pointInfo.pageHorIndex, newDependency);
    };
    PdfGanttPaginator.prototype._paginateDependencyLine = function (dependency) {
        var hPagination = this._getDependencyLinePagination(dependency);
        var vPagination = this._getDependencyLinePagination(dependency, true);
        for (var i = 0; i < vPagination.length; i++)
            for (var j = 0; j < hPagination.length; j++) {
                var newDependency = new DependencyLineInfo_1.PdfDependencyLineInfo();
                newDependency.assign(dependency);
                this._offsetPoints(newDependency.points, hPagination[j].offset, vPagination[i].offset);
                this._addDependencyToPage(vPagination[i].pageIndex, hPagination[j].pageIndex, newDependency);
            }
    };
    PdfGanttPaginator.prototype._paginateResource = function (resource) {
        var pointInfo = this._getPointPageInfo(new point_1.Point(resource.x, resource.y));
        var newResource = new TaskResourcesInfo_1.PdfTaskResourcesInfo();
        newResource.assign(resource);
        newResource.x -= pointInfo.offsetX;
        newResource.y -= pointInfo.offsetY;
        this._addResourceToPage(pointInfo.pageVerIndex, pointInfo.pageHorIndex, newResource);
    };
    PdfGanttPaginator.prototype._paginateTimeMarker = function (timeMarker) {
        var hPagination = this._getTimeMarkerPagination(timeMarker);
        var vPagination = this._getTimeMarkerPagination(timeMarker, true);
        for (var i = 0; i < vPagination.length; i++)
            for (var j = 0; j < hPagination.length; j++) {
                var newMarker = new TimeMarkerInfo_1.PdfTimeMarkerInfo();
                newMarker.assign(timeMarker);
                newMarker.start.x -= hPagination[j].offset;
                newMarker.start.y -= vPagination[i].offset;
                this._addTimeMarkerToPage(vPagination[i].pageIndex, hPagination[j].pageIndex, newMarker);
            }
    };
    PdfGanttPaginator.prototype._getTableStart = function (table) {
        var start = new PageNavigation_1.PageNavigation(this.pageBorders, 0, 0, 0, 0, this.correctedPageBottoms);
        start.offset(table.position.x, table.position.y);
        return start;
    };
    PdfGanttPaginator.prototype._getPage = function (rowIndex, colIndex, forceCreate) {
        if (forceCreate)
            this._extendPageMatrixIfRequired(rowIndex, colIndex);
        return this._pages[rowIndex] && this._pages[rowIndex][colIndex];
    };
    PdfGanttPaginator.prototype._getTableOrCreate = function (page, tableKey) {
        var _a;
        var _b;
        (_a = (_b = page.tables)[tableKey]) !== null && _a !== void 0 ? _a : (_b[tableKey] = this._createTable(tableKey));
        return page.tables[tableKey];
    };
    PdfGanttPaginator.prototype._preparePagesNavigationMatrixForTable = function (start, table) {
        var matrix = new Array();
        var verticalVector = this._getTableNavigationVector(start, table, true);
        var rowCount = verticalVector.length;
        for (var i = 0; i < rowCount; i++) {
            var row = new Array();
            var vInfo = verticalVector[i];
            var horizontalVector = this._getTableNavigationVector(start, table, false, vInfo.globalCellIndex);
            var colCount = horizontalVector.length;
            for (var j = 0; j < colCount; j++) {
                var hInfo = horizontalVector[j];
                var cancelTextCut = table.name === Interfaces_1.PdfPageTableNames.chartScaleTop;
                var cell = this._prepareCuttedCell(table.cells[vInfo.globalCellIndex][hInfo.globalCellIndex], hInfo, vInfo, cancelTextCut);
                var info = new CellNavigationInfo(hInfo.pageIndex, vInfo.pageIndex, vInfo.cellIndexOnPage, hInfo.cellIndexOnPage, cell);
                row.push(info);
            }
            matrix.push(row);
        }
        return matrix;
    };
    PdfGanttPaginator.prototype._setTablePositionOnPage = function (page, tableKey, x, y) {
        var table = this._getTableOrCreate(page, tableKey);
        table.position = new point_1.Point(x, y);
    };
    PdfGanttPaginator.prototype._extendPageMatrixIfRequired = function (rowIndex, colIndex) {
        var _a;
        (_a = this._pages) !== null && _a !== void 0 ? _a : (this._pages = new Array());
        for (var i = this._pages.length; i <= rowIndex; i++)
            this._pages.push(new Array());
        var row = this._pages[rowIndex];
        for (var i = row.length; i <= colIndex; i++)
            row.push(this._createPage());
    };
    PdfGanttPaginator.prototype._getTableAndExtendIfRequired = function (page, tableKey, rowIndex, colIndex) {
        var table = this._getTableOrCreate(page, tableKey);
        var cells = table.cells;
        for (var i = cells.length; i <= rowIndex; i++)
            cells.push(new Array());
        var row = cells[rowIndex];
        for (var i = row.length; i <= colIndex; i++)
            row.push(new CellDef_1.CellDef());
        return table;
    };
    PdfGanttPaginator.prototype._createPage = function () {
        return {
            objects: {
                tasks: null,
                dependencies: null,
                resources: null,
                timeMarkers: null
            },
            tables: {}
        };
    };
    PdfGanttPaginator.prototype._createTable = function (tableKey) {
        var _a;
        var globalTableInfo = (_a = this._globalInfo) === null || _a === void 0 ? void 0 : _a.tables[tableKey];
        return {
            name: tableKey,
            size: null,
            position: null,
            style: globalTableInfo.style,
            baseCellSize: globalTableInfo.baseCellSize,
            cells: new Array(),
            hideRowLines: globalTableInfo.hideRowLines
        };
    };
    PdfGanttPaginator.prototype._addCellToPage = function (page, tableKey, cellInfo) {
        var rowIndex = cellInfo.cellRowIndexOnPage;
        var colIndex = cellInfo.cellColIndexOnPage;
        var table = this._getTableAndExtendIfRequired(page, tableKey, rowIndex, colIndex);
        table.cells[rowIndex][colIndex].assign(cellInfo.cell);
    };
    PdfGanttPaginator.prototype._updateTableSizeOnPages = function (tableKey) {
        var _a;
        var colCount = (_a = this._pages[0]) === null || _a === void 0 ? void 0 : _a.length;
        var rowCount = this._pages.length;
        for (var i = 0; i < rowCount; i++)
            for (var j = 0; j < colCount; j++)
                this._updateTableSizeOnPage(this._pages[i][j], tableKey);
    };
    PdfGanttPaginator.prototype._updateTableSizeOnPage = function (page, tableKey) {
        var _this = this;
        var _a;
        var table = page === null || page === void 0 ? void 0 : page.tables[tableKey];
        if (table) {
            var rowCount = table.cells.length;
            var height = rowCount * table.baseCellSize.height || 0;
            var width = ((_a = table.cells[0]) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, v, i) { return acc += _this._getCellWidth(table, 0, i); }, 0)) || 0;
            table.size = new size_1.Size(width, height);
        }
    };
    PdfGanttPaginator.prototype._getTableNavigationVector = function (start, table, isVertical, rowIndex) {
        var _a, _b;
        if (isVertical === void 0) { isVertical = false; }
        if (rowIndex === void 0) { rowIndex = 0; }
        var vector = new Array();
        var pageNav = PageNavigation_1.PageNavigation.createFrom(start);
        var length = isVertical ? (_a = table.cells) === null || _a === void 0 ? void 0 : _a.length : (_b = table.cells[rowIndex]) === null || _b === void 0 ? void 0 : _b.length;
        for (var i = 0; i < length; i++) {
            var cellSize = isVertical ? table.baseCellSize.height : this._getCellWidth(table, rowIndex, i);
            this._placeCell(vector, pageNav, i, cellSize, isVertical);
        }
        return vector;
    };
    PdfGanttPaginator.prototype._placeCell = function (vector, pageNav, cellGlobalIndex, size, isVertical) {
        var _a, _b;
        var startPageIndex = isVertical ? pageNav.vIndex : pageNav.hIndex;
        var pageOffsetIndex = (_b = (_a = vector[vector.length - 1]) === null || _a === void 0 ? void 0 : _a.pageOffset) !== null && _b !== void 0 ? _b : cellGlobalIndex;
        var unplacedSize = size;
        var spaceToBorder = pageNav.getSpaceToBorder(isVertical);
        pageNav.offsetOneD(size, isVertical);
        var endPageIndex = isVertical ? pageNav.vIndex : pageNav.hIndex;
        if (!isVertical)
            for (var i = startPageIndex; i < endPageIndex; i++) {
                var info_1 = new VectorInfo(i, cellGlobalIndex, pageOffsetIndex, spaceToBorder);
                pageOffsetIndex = cellGlobalIndex;
                vector.push(info_1);
                unplacedSize -= spaceToBorder;
                spaceToBorder = pageNav.getPageSize(isVertical);
            }
        if (endPageIndex !== startPageIndex)
            pageOffsetIndex = cellGlobalIndex;
        var isCutted = unplacedSize !== size;
        var info = new VectorInfo(endPageIndex, cellGlobalIndex, pageOffsetIndex, isCutted ? unplacedSize : null);
        vector.push(info);
    };
    PdfGanttPaginator.prototype._prepareCuttedCell = function (originCell, hInfo, vInfo, cancelTextCut) {
        var cell = new CellDef_1.CellDef(originCell);
        if (hInfo.isCutted) {
            var width = hInfo.cutSize;
            if (!cancelTextCut) {
                var text = cell.content;
                var style = originCell.styles;
                var leftPadding = style && style.cellPadding.left || 0;
                var rightPadding = style && style.cellPadding.right || 0;
                var textWidth = width - leftPadding - rightPadding;
                var parts = this._pdfDoc.splitTextToSize(text, textWidth);
                originCell.content = text.replace(parts[0], "");
                cell.content = parts[0];
            }
            cell.styles.cellWidth.assign(width);
        }
        if (vInfo.isCutted)
            cell.styles.minCellHeight = vInfo.cutSize;
        return cell;
    };
    PdfGanttPaginator.prototype._getCellWidth = function (table, rowIndex, colIndex) {
        var _a;
        var cell = table.cells[rowIndex][colIndex];
        var style = cell.styles;
        var numWidth = style.cellWidth.getValue();
        var width = numWidth !== null && numWidth !== void 0 ? numWidth : style.minCellWidth;
        return width !== null && width !== void 0 ? width : table.baseCellSize.width * ((_a = cell.colSpan) !== null && _a !== void 0 ? _a : 1);
    };
    PdfGanttPaginator.prototype._getTaskPagination = function (task, isVertical) {
        var size = isVertical ? task.height : task.width;
        var startPos = isVertical ? task.top : task.left;
        return this._getLinePagination(startPos, size, isVertical);
    };
    PdfGanttPaginator.prototype._getDependencyLinePagination = function (dependency, isVertical) {
        var lineStart = dependency.points[0];
        var lineEnd = dependency.points[1];
        var size = isVertical ? lineEnd.y - lineStart.y : lineEnd.x - lineStart.x;
        var startPos = isVertical ? lineStart.y : lineStart.x;
        return this._getLinePagination(startPos, size, isVertical);
    };
    PdfGanttPaginator.prototype._getTimeMarkerPagination = function (timeMarker, isVertical) {
        var size = isVertical ? timeMarker.size.height : timeMarker.size.width;
        var start = isVertical ? timeMarker.start.y : timeMarker.start.x;
        return this._getLinePagination(start, size, isVertical);
    };
    PdfGanttPaginator.prototype._getLinePagination = function (globalStart, size, isVertical) {
        var result = new Array();
        var pageNav = this.pageNavigator.clone();
        pageNav.offsetOneD(globalStart, isVertical);
        var startPageIndex = isVertical ? pageNav.vIndex : pageNav.hIndex;
        pageNav.offsetOneD(size, isVertical);
        var endPageIndex = isVertical ? pageNav.vIndex : pageNav.hIndex;
        for (var i = startPageIndex; i <= endPageIndex; i++)
            result.push({
                offset: pageNav.getPageGlobalOffset(i, isVertical),
                pageIndex: i
            });
        return result;
    };
    PdfGanttPaginator.prototype._getPointPageInfo = function (p) {
        var pageNav = this.pageNavigator.clone();
        pageNav.offset(p.x, p.y);
        return {
            offsetX: pageNav.getPageGlobalOffset(pageNav.hIndex),
            offsetY: pageNav.getPageGlobalOffset(pageNav.vIndex, true),
            pageHorIndex: pageNav.hIndex,
            pageVerIndex: pageNav.vIndex
        };
    };
    Object.defineProperty(PdfGanttPaginator.prototype, "pageWidth", {
        get: function () {
            var _a;
            return (_a = this._pdfDoc) === null || _a === void 0 ? void 0 : _a.getPageWidth();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageHeight", {
        get: function () {
            var _a;
            return (_a = this._pdfDoc) === null || _a === void 0 ? void 0 : _a.getPageHeight();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageLeftMargin", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.margins.left;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageTopMargin", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.margins.top;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageRightMargin", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.margins.right;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageBottomMargin", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.margins.bottom;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageLeft", {
        get: function () {
            var _a;
            (_a = this._pageLeft) !== null && _a !== void 0 ? _a : (this._pageLeft = this.pageLeftMargin);
            return this._pageLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageRight", {
        get: function () {
            var _a;
            (_a = this._pageRight) !== null && _a !== void 0 ? _a : (this._pageRight = this.pageWidth - this.pageRightMargin);
            return this._pageRight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageTop", {
        get: function () {
            var _a;
            (_a = this._pageTop) !== null && _a !== void 0 ? _a : (this._pageTop = this.pageTopMargin);
            return this._pageTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageBottom", {
        get: function () {
            var _a;
            (_a = this._pageBottom) !== null && _a !== void 0 ? _a : (this._pageBottom = this.pageHeight - this.pageBottomMargin);
            return this._pageBottom;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageBorders", {
        get: function () {
            return {
                left: this.pageLeft,
                top: this.pageTop,
                bottom: this.pageBottom,
                right: this.pageRight
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "correctedPageBottoms", {
        get: function () {
            var _a;
            (_a = this._correctedPageBottoms) !== null && _a !== void 0 ? _a : (this._correctedPageBottoms = this._getCorrectedPagesBottom());
            return this._correctedPageBottoms;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageNavigator", {
        get: function () {
            var _a;
            (_a = this._pageNavigator) !== null && _a !== void 0 ? _a : (this._pageNavigator = new PageNavigation_1.PageNavigation(this.pageBorders, 0, 0, 0, 0, this.correctedPageBottoms));
            return this._pageNavigator;
        },
        enumerable: false,
        configurable: true
    });
    PdfGanttPaginator.prototype._getCorrectedPagesBottom = function () {
        var _a, _b, _c, _d;
        var result = new Array();
        var tables = (_a = this._globalInfo) === null || _a === void 0 ? void 0 : _a.tables;
        var referenceTable = (_b = tables[Interfaces_1.PdfPageTableNames.treeListMain]) !== null && _b !== void 0 ? _b : tables[Interfaces_1.PdfPageTableNames.chartMain];
        var nav = new PageNavigation_1.PageNavigation(this.pageBorders);
        nav.pageY = referenceTable.position.y;
        for (var i = 0; i < referenceTable.cells.length; i++) {
            var cell = referenceTable.cells[i][0];
            var height = (_d = (_c = cell.styles) === null || _c === void 0 ? void 0 : _c.minCellHeight) !== null && _d !== void 0 ? _d : referenceTable.baseCellSize.height;
            var prevPageIndex = nav.vIndex;
            var prevPageY = nav.pageY;
            nav.offsetOneD(height, true);
            if (prevPageIndex !== nav.vIndex) {
                result.push(prevPageY);
                nav.pageY = nav.getPageStart(true) + height;
            }
        }
        return result;
    };
    PdfGanttPaginator.prototype._addTaskToPage = function (pageVIndex, pageHIndex, task) {
        var _a;
        var _b;
        var page = this._getPage(pageVIndex, pageHIndex);
        if (page) {
            (_a = (_b = page.objects).tasks) !== null && _a !== void 0 ? _a : (_b.tasks = new Array());
            page.objects.tasks.push(task);
        }
    };
    PdfGanttPaginator.prototype._addDependencyToPage = function (pageVIndex, pageHIndex, dependency) {
        var _a;
        var _b;
        var page = this._getPage(pageVIndex, pageHIndex);
        if (page) {
            (_a = (_b = page.objects).dependencies) !== null && _a !== void 0 ? _a : (_b.dependencies = new Array());
            page.objects.dependencies.push(dependency);
        }
    };
    PdfGanttPaginator.prototype._addResourceToPage = function (pageVIndex, pageHIndex, resource) {
        var _a;
        var _b;
        var page = this._getPage(pageVIndex, pageHIndex);
        if (page) {
            (_a = (_b = page.objects).resources) !== null && _a !== void 0 ? _a : (_b.resources = new Array());
            page.objects.resources.push(resource);
        }
    };
    PdfGanttPaginator.prototype._addTimeMarkerToPage = function (pageVIndex, pageHIndex, timeMarker) {
        var _a;
        var _b;
        var page = this._getPage(pageVIndex, pageHIndex);
        if (page) {
            (_a = (_b = page.objects).timeMarkers) !== null && _a !== void 0 ? _a : (_b.timeMarkers = new Array());
            page.objects.timeMarkers.push(timeMarker);
        }
    };
    PdfGanttPaginator.prototype._offsetPoints = function (points, offsetX, offsetY) {
        points.forEach(function (p) {
            p.x -= offsetX;
            p.y -= offsetY;
        });
    };
    return PdfGanttPaginator;
}());
exports.PdfGanttPaginator = PdfGanttPaginator;


/***/ }),

/***/ 5763:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScalingHelper = void 0;
var Interfaces_1 = __webpack_require__(8935);
var ScalingHelper = (function () {
    function ScalingHelper(doc) {
        this._doc = doc;
    }
    Object.defineProperty(ScalingHelper.prototype, "_docScaleFactor", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this._doc) === null || _a === void 0 ? void 0 : _a.internal) === null || _b === void 0 ? void 0 : _b.scaleFactor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScalingHelper.prototype, "_correctScaleNeeded", {
        get: function () {
            return this._docScaleFactor && Math.abs(this._docScaleFactor - ScalingHelper._defaultScaleFactor) > Number.EPSILON;
        },
        enumerable: false,
        configurable: true
    });
    ScalingHelper.prototype.getScaledSize = function (size) {
        var size_in_pt = size * ScalingHelper._defaultScaleFactor;
        return size_in_pt / this._docScaleFactor;
    };
    ScalingHelper.prototype.scalePageMargins = function (settings) {
        var _a, _b, _c, _d;
        if (this._correctScaleNeeded) {
            if ((_a = settings === null || settings === void 0 ? void 0 : settings.margins) === null || _a === void 0 ? void 0 : _a.left)
                settings.margins.left = this.getScaledSize(settings.margins.left);
            if ((_b = settings === null || settings === void 0 ? void 0 : settings.margins) === null || _b === void 0 ? void 0 : _b.right)
                settings.margins.right = this.getScaledSize(settings.margins.right);
            if ((_c = settings === null || settings === void 0 ? void 0 : settings.margins) === null || _c === void 0 ? void 0 : _c.top)
                settings.margins.top = this.getScaledSize(settings.margins.top);
            if ((_d = settings === null || settings === void 0 ? void 0 : settings.margins) === null || _d === void 0 ? void 0 : _d.bottom)
                settings.margins.bottom = this.getScaledSize(settings.margins.bottom);
        }
    };
    ScalingHelper.prototype.scaleSizes = function (info) {
        if (this._correctScaleNeeded) {
            this.scaleTables(info);
            this.scaleObjects(info.objects);
        }
    };
    ScalingHelper.prototype.scaleTables = function (info) {
        if (info === null || info === void 0 ? void 0 : info.tables) {
            this.scaleTable(info.tables[Interfaces_1.PdfPageTableNames.treeListHeader]);
            this.scaleTable(info.tables[Interfaces_1.PdfPageTableNames.treeListMain]);
            this.scaleTable(info.tables[Interfaces_1.PdfPageTableNames.chartMain]);
            this.scaleTable(info.tables[Interfaces_1.PdfPageTableNames.chartScaleTop]);
            this.scaleTable(info.tables[Interfaces_1.PdfPageTableNames.chartScaleBottom]);
        }
    };
    ScalingHelper.prototype.scaleTable = function (table) {
        var _a, _b, _c, _d, _e, _f;
        if (!table)
            return;
        if ((_a = table.size) === null || _a === void 0 ? void 0 : _a.width)
            table.size.width = this.getScaledSize(table.size.width);
        if ((_b = table.size) === null || _b === void 0 ? void 0 : _b.height)
            table.size.height = this.getScaledSize(table.size.height);
        if ((_c = table.position) === null || _c === void 0 ? void 0 : _c.x)
            table.position.x = this.getScaledSize(table.position.x);
        if ((_d = table.position) === null || _d === void 0 ? void 0 : _d.y)
            table.position.y = this.getScaledSize(table.position.y);
        if ((_e = table.baseCellSize) === null || _e === void 0 ? void 0 : _e.width)
            table.baseCellSize.width = this.getScaledSize(table.baseCellSize.width);
        if ((_f = table.baseCellSize) === null || _f === void 0 ? void 0 : _f.height)
            table.baseCellSize.height = this.getScaledSize(table.baseCellSize.height);
        if (table.cells)
            for (var i = 0; i < table.cells.length; i++) {
                var row = table.cells[i];
                for (var j = 0; j < row.length; j++) {
                    var cell = row[j];
                    this.scaleStyle(cell.styles);
                }
            }
    };
    ScalingHelper.prototype.scaleObjects = function (objects) {
        this.scaleTasks(objects === null || objects === void 0 ? void 0 : objects.tasks);
        this.scaleDependencies(objects === null || objects === void 0 ? void 0 : objects.dependencies);
        this.scaleResources(objects === null || objects === void 0 ? void 0 : objects.resources);
        this.scaleTimeMarkers(objects === null || objects === void 0 ? void 0 : objects.timeMarkers);
    };
    ScalingHelper.prototype.scaleTasks = function (tasks) {
        var _this = this;
        tasks === null || tasks === void 0 ? void 0 : tasks.forEach(function (t) {
            _this.scalePoints(t.sidePoints);
            t.progressWidth = _this.getScaledSize(t.progressWidth);
            _this.scaleStyle(t.textStyle);
        });
    };
    ScalingHelper.prototype.scaleDependencies = function (dependencies) {
        var _this = this;
        dependencies === null || dependencies === void 0 ? void 0 : dependencies.forEach(function (d) {
            var _a;
            _this.scalePoints(d.points);
            if ((_a = d.arrowInfo) === null || _a === void 0 ? void 0 : _a.width)
                d.arrowInfo.width = _this.getScaledSize(d.arrowInfo.width);
        });
    };
    ScalingHelper.prototype.scaleResources = function (resources) {
        var _this = this;
        resources === null || resources === void 0 ? void 0 : resources.forEach(function (r) {
            r.x = _this.getScaledSize(r.x);
            r.y = _this.getScaledSize(r.y);
            _this.scaleStyle(r.style);
        });
    };
    ScalingHelper.prototype.scaleTimeMarkers = function (timeMarkers) {
        var _this = this;
        timeMarkers === null || timeMarkers === void 0 ? void 0 : timeMarkers.forEach(function (m) {
            m.start.x = _this.getScaledSize(m.start.x);
            m.start.y = _this.getScaledSize(m.start.y);
            m.size.width = _this.getScaledSize(m.size.width);
            m.size.height = _this.getScaledSize(m.size.height);
        });
    };
    ScalingHelper.prototype.scaleStyle = function (style) {
        var _a, _b, _c, _d;
        if (style) {
            var cellWidth = style.cellWidth;
            if (cellWidth === null || cellWidth === void 0 ? void 0 : cellWidth.hasValue()) {
                var scaled = this.getScaledSize(Number(cellWidth.getValue()));
                cellWidth.assign(scaled);
            }
            if (style.minCellHeight)
                style.minCellHeight = this.getScaledSize(style.minCellHeight);
            if (style.minCellWidth)
                style.minCellWidth = this.getScaledSize(style.minCellWidth);
            if ((_a = style.cellPadding) === null || _a === void 0 ? void 0 : _a.left)
                style.cellPadding.left = this.getScaledSize(style.cellPadding.left);
            if ((_b = style.cellPadding) === null || _b === void 0 ? void 0 : _b.right)
                style.cellPadding.right = this.getScaledSize(style.cellPadding.right);
            if ((_c = style.cellPadding) === null || _c === void 0 ? void 0 : _c.top)
                style.cellPadding.top = this.getScaledSize(style.cellPadding.top);
            if ((_d = style.cellPadding) === null || _d === void 0 ? void 0 : _d.bottom)
                style.cellPadding.bottom = this.getScaledSize(style.cellPadding.bottom);
        }
    };
    ScalingHelper.prototype.scalePoints = function (points) {
        var _this = this;
        points === null || points === void 0 ? void 0 : points.forEach(function (p) {
            p.x = _this.getScaledSize(p.x);
            p.y = _this.getScaledSize(p.y);
        });
    };
    ScalingHelper._defaultScaleFactor = 72 / 96;
    return ScalingHelper;
}());
exports.ScalingHelper = ScalingHelper;


/***/ }),

/***/ 7223:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfCustomFontSettings = void 0;
var common_1 = __webpack_require__(2491);
var PdfCustomFontSettings = (function () {
    function PdfCustomFontSettings(source) {
        this.style = "normal";
        if (source)
            this.assign(source);
    }
    PdfCustomFontSettings.prototype.assign = function (source) {
        if ((0, common_1.isDefined)(source.fontObject))
            this.fontObject = source.fontObject;
        if ((0, common_1.isDefined)(source.name))
            this.name = source.name;
        if ((0, common_1.isDefined)(source.style))
            this.style = source.style;
        if ((0, common_1.isDefined)(source.weight))
            this.weight = source.weight;
    };
    PdfCustomFontSettings.prototype.applyToDoc = function (pdfDoc) {
        try {
            if (pdfDoc && this.fontObject && this.name) {
                var fontFileName = this.name + "-" + this.style + ".ttf";
                pdfDoc.addFileToVFS(fontFileName, this.fontObject);
                pdfDoc.addFont(fontFileName, this.name, this.style, this.weight);
                pdfDoc.setFont(this.name);
            }
        }
        catch (e) { }
    };
    return PdfCustomFontSettings;
}());
exports.PdfCustomFontSettings = PdfCustomFontSettings;


/***/ }),

/***/ 6431:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfDataRange = void 0;
var common_1 = __webpack_require__(2491);
var PdfDataRange = (function () {
    function PdfDataRange(start, endDate, startIndex, endIndex) {
        var source = !start || start instanceof Date ? { startDate: start, endDate: endDate, startIndex: startIndex, endIndex: endIndex } : start;
        if (source)
            this.assign(source);
    }
    PdfDataRange.prototype.assign = function (source) {
        if ((0, common_1.isDefined)(source.startDate))
            this.startDate = source.startDate instanceof Date ? source.startDate : new Date(source.startDate);
        if ((0, common_1.isDefined)(source.endDate))
            this.endDate = source.endDate instanceof Date ? source.endDate : new Date(source.endDate);
        if ((0, common_1.isDefined)(source.startIndex))
            this.startIndex = parseInt(source.startIndex);
        if ((0, common_1.isDefined)(source.endIndex))
            this.endIndex = parseInt(source.endIndex);
    };
    return PdfDataRange;
}());
exports.PdfDataRange = PdfDataRange;


/***/ }),

/***/ 9895:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataExportMode = exports.ExportMode = void 0;
var ExportMode;
(function (ExportMode) {
    ExportMode[ExportMode["all"] = 0] = "all";
    ExportMode[ExportMode["treeList"] = 1] = "treeList";
    ExportMode[ExportMode["chart"] = 2] = "chart";
})(ExportMode = exports.ExportMode || (exports.ExportMode = {}));
var DataExportMode;
(function (DataExportMode) {
    DataExportMode[DataExportMode["all"] = 0] = "all";
    DataExportMode[DataExportMode["visible"] = 1] = "visible";
})(DataExportMode = exports.DataExportMode || (exports.DataExportMode = {}));


/***/ }),

/***/ 6997:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GanttPdfExportProps = void 0;
var size_1 = __webpack_require__(6353);
var common_1 = __webpack_require__(2491);
var Margin_1 = __webpack_require__(5063);
var DataRange_1 = __webpack_require__(6431);
var CustomFont_1 = __webpack_require__(7223);
var Enums_1 = __webpack_require__(9895);
var GanttPdfExportProps = (function () {
    function GanttPdfExportProps(props) {
        this.landscape = false;
        this.margins = null;
        this.exportMode = Enums_1.ExportMode.all;
        this.exportDataMode = Enums_1.DataExportMode.visible;
        if (props)
            this.assign(props);
    }
    GanttPdfExportProps.prototype.assign = function (source) {
        if (!source)
            return;
        if ((0, common_1.isDefined)(source["pdfDocument"]))
            this.pdfDoc = source["pdfDocument"];
        if ((0, common_1.isDefined)(source.pdfDoc))
            this.pdfDoc = source.pdfDoc;
        this.docCreateMethod = source.docCreateMethod;
        if ((0, common_1.isDefined)(source.fileName))
            this.fileName = source.fileName;
        this.landscape = !!source.landscape;
        if ((0, common_1.isDefined)(source.margins))
            this.margins = new Margin_1.Margin(source.margins);
        if ((0, common_1.isDefined)(source.format)) {
            var formatSrc = source.format;
            if (typeof formatSrc === "string")
                this.format = formatSrc;
            else {
                var width = parseInt(formatSrc.width);
                var height = parseInt(formatSrc.height);
                this.pageSize = new size_1.Size(width, height);
            }
        }
        else if ((0, common_1.isDefined)(source.pageSize)) {
            var size = source.pageSize;
            this.pageSize = size instanceof size_1.Size ? size.clone() : new size_1.Size(size.width, size.height);
        }
        if ((0, common_1.isDefined)(source.exportMode))
            this.exportMode = this.getEnumValue(Enums_1.ExportMode, source.exportMode);
        if ((0, common_1.isDefined)(source.dateRange)) {
            var rangeSrc = source.dateRange;
            var isEnum = typeof rangeSrc === "number" || typeof rangeSrc === "string";
            if (isEnum)
                this.exportDataMode = this.getEnumValue(Enums_1.DataExportMode, rangeSrc);
            else
                this.dateRange = new DataRange_1.PdfDataRange(rangeSrc);
        }
        if ((0, common_1.isDefined)(source.font))
            this.font = new CustomFont_1.PdfCustomFontSettings(source.font);
    };
    GanttPdfExportProps.prototype.getEnumValue = function (type, value) {
        if (!(0, common_1.isDefined)(type[value]))
            return null;
        var num = parseInt(value);
        if (!isNaN(num))
            return num;
        return type[value];
    };
    GanttPdfExportProps.autoFormatKey = "auto";
    return GanttPdfExportProps;
}());
exports.GanttPdfExportProps = GanttPdfExportProps;


/***/ }),

/***/ 6032:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CellDef = void 0;
var common_1 = __webpack_require__(2491);
var StyleDef_1 = __webpack_require__(6995);
var CellDef = (function () {
    function CellDef(content, colSpan, styles) {
        this.content = "";
        if (typeof content === "string") {
            this.content = content;
            this.colSpan = colSpan;
            if (styles)
                this.appendStyles(styles);
        }
        else if (content)
            this.assign(content);
    }
    Object.defineProperty(CellDef.prototype, "styles", {
        get: function () {
            if (!this._styles)
                this._styles = new StyleDef_1.StyleDef();
            return this._styles;
        },
        enumerable: false,
        configurable: true
    });
    CellDef.prototype.assign = function (source) {
        if ((0, common_1.isDefined)(source["content"]))
            this.content = source["content"];
        if ((0, common_1.isDefined)(source["colSpan"]))
            this.colSpan = source["colSpan"];
        if (source["styles"])
            this.appendStyles(source["styles"]);
    };
    CellDef.prototype.appendStyles = function (source) {
        if (source)
            this.styles.assign(source);
    };
    CellDef.prototype.hasValue = function () { return true; };
    CellDef.prototype.getValue = function () {
        var result = {};
        result["content"] = this.content;
        if (this.colSpan > 1)
            result["colSpan"] = this.colSpan;
        if (this._styles)
            result["styles"] = this._styles.getValue();
        return result;
    };
    return CellDef;
}());
exports.CellDef = CellDef;


/***/ }),

/***/ 405:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Color = void 0;
var common_1 = __webpack_require__(2491);
var Color = (function () {
    function Color(color) {
        this._num = null;
        this._opacity = 1;
        this._rgb = null;
        this.assign(color);
    }
    Object.defineProperty(Color.prototype, "opacity", {
        get: function () {
            return this._opacity;
        },
        enumerable: false,
        configurable: true
    });
    Color.prototype.hasValue = function () {
        return (0, common_1.isDefined)(this._num) || !!this._rgb || this._opacity === 0;
    };
    Color.prototype.getValue = function () {
        if (this._opacity === 0 && !this._rgb)
            return false;
        if ((0, common_1.isDefined)(this._num))
            return this._num;
        if (this._rgb)
            return this.getRBGColor();
        return null;
    };
    Color.prototype.assign = function (source) {
        this.reset();
        if (typeof source === "string")
            this.assignFromString(source);
        if (typeof source === "number")
            this._num = source;
        if (source instanceof Array)
            this.assignFromRgbArray(source);
        if (source instanceof Color)
            this.assignFromColor(source);
    };
    Color.prototype.reset = function () {
        this._opacity = 1;
        this._num = null;
        this._rgb = null;
    };
    Color.prototype.assignFromString = function (color) {
        if (!color)
            return;
        if (color === "transparent")
            this._opacity = 0;
        if (color.indexOf("#") === 0)
            this.assignFromHexString(color);
        if (color.substr(0, 3).toLowerCase() === "rgb")
            this.assignFromRgbString(color);
    };
    Color.prototype.assignFromHexString = function (hex) {
        if (hex.length === 4)
            hex = "#" + hex[1].repeat(2) + hex[2].repeat(2) + hex[3].repeat(2);
        if (hex.length > 6) {
            var r = parseInt(hex.substr(1, 2), 16);
            var g = parseInt(hex.substr(3, 2), 16);
            var b = parseInt(hex.substr(5, 2), 16);
            this._rgb = [r, g, b];
        }
    };
    Color.prototype.assignFromRgbString = function (rgb) {
        var isRGBA = rgb.substr(0, 4).toLowerCase() === "rgba";
        var regResult = rgb.toLowerCase().match(isRGBA ? Color.rgbaRegexp : Color.rgbRegexp);
        if (regResult) {
            var r = parseInt(regResult[1]);
            var g = parseInt(regResult[2]);
            var b = parseInt(regResult[3]);
            this._rgb = [r, g, b];
            if (isRGBA)
                this._opacity = parseFloat(regResult[4]);
        }
    };
    Color.prototype.assignFromRgbArray = function (rgb) {
        if (rgb && rgb.length > 2) {
            this._rgb = [rgb[0], rgb[1], rgb[2]];
            if ((0, common_1.isDefined)(rgb[3]))
                this._opacity = rgb[3];
        }
    };
    Color.prototype.assignFromColor = function (source) {
        this._opacity = source._opacity;
        this._num = source._num;
        this._rgb = source._rgb;
    };
    Color.prototype.getRBGColor = function () {
        return this._rgb ? this._rgb : [0, 0, 0];
    };
    Color.prototype.applyOpacityToBackground = function (source) {
        if (this._opacity === 1)
            return;
        var background = source instanceof Color ? source : new Color(source);
        var backRGB = background.getValue();
        if (backRGB instanceof Array) {
            var alpha = this.opacity;
            var r = Math.round((1 - alpha) * backRGB[0] + alpha * this._rgb[0]);
            var g = Math.round((1 - alpha) * backRGB[1] + alpha * this._rgb[1]);
            var b = Math.round((1 - alpha) * backRGB[2] + alpha * this._rgb[2]);
            this._rgb = [r, g, b];
        }
    };
    Color.rgbRegexp = /rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/;
    Color.rgbaRegexp = /rgba?\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,?\s*([0-9]*\.?[0-9]*)\s*\)/;
    return Color;
}());
exports.Color = Color;


/***/ }),

/***/ 5510:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfGanttTableDrawer = void 0;
var common_1 = __webpack_require__(2491);
var Interfaces_1 = __webpack_require__(8935);
var Ellipsis_1 = __webpack_require__(817);
var TableOptions_1 = __webpack_require__(7624);
var PdfGanttTableDrawer = (function () {
    function PdfGanttTableDrawer(pdfDoc) {
        this._pdfDoc = pdfDoc;
    }
    PdfGanttTableDrawer.prototype.drawTable = function (info) {
        var _a, _b;
        if (info) {
            var options = this.createTableOptions(info);
            if ((_a = info.style) === null || _a === void 0 ? void 0 : _a.fontSize)
                this._pdfDoc.setFontSize((_b = info.style) === null || _b === void 0 ? void 0 : _b.fontSize);
            this._pdfDoc.autoTable(options.getValue());
        }
    };
    PdfGanttTableDrawer.prototype.createTableOptions = function (info) {
        var options = this.createDefaultTableOptions();
        this.addTableCommonSettings(info, options);
        this.addCommonTableStyles(info, options);
        this.prepareBodyCells(info);
        options.addBody(info.cells);
        if (info.hideRowLines)
            this.hideRowLines(options);
        return options;
    };
    PdfGanttTableDrawer.prototype.createDefaultTableOptions = function () {
        var options = new TableOptions_1.TableOptions();
        options.pageBreak = "auto";
        options.margin.assign(0);
        options.tableWidth.assign("auto");
        options.styles.cellPadding.assign(0);
        options.styles.halign = "center";
        options.styles.valign = "middle";
        options.styles.lineWidth = 1;
        options.styles.overflow = "hidden";
        return options;
    };
    PdfGanttTableDrawer.prototype.addTableCommonSettings = function (info, options) {
        options.startY = info.position.y;
        options.margin.assign({ left: info.position.x });
        options.tableWidth.assign(info.size.width);
    };
    PdfGanttTableDrawer.prototype.addCommonTableStyles = function (info, tableInfo) {
        var styles = tableInfo.styles;
        styles.assign(info.style);
        if (styles.fillColor.opacity === 0)
            styles.fillColor.assign("#FFFFFF");
        styles.minCellHeight = info.baseCellSize.height;
        tableInfo.alternateRowStyles.minCellHeight = tableInfo.styles.minCellHeight;
        tableInfo.alternateRowStyles.fillColor.assign(tableInfo.styles.fillColor);
        if ((0, common_1.isDefined)(info.baseCellSize.width))
            styles.cellWidth.assign(info.baseCellSize.width);
    };
    PdfGanttTableDrawer.prototype.prepareBodyCells = function (info) {
        var _a, _b, _c;
        var needCheckText = info.name === Interfaces_1.PdfPageTableNames.treeListMain || info.name === Interfaces_1.PdfPageTableNames.chartScaleTop || info.name === Interfaces_1.PdfPageTableNames.chartScaleBottom;
        if (needCheckText) {
            var source = info.cells;
            for (var i = 0; i < source.length; i++) {
                var sourceRow = source[i];
                for (var j = 0; j < sourceRow.length; j++) {
                    var cell = sourceRow[j];
                    var styles = cell.styles;
                    var width = ((_a = styles === null || styles === void 0 ? void 0 : styles.cellWidth) === null || _a === void 0 ? void 0 : _a.getValue()) || info.baseCellSize.width || 0;
                    var leftPadding = (_b = styles === null || styles === void 0 ? void 0 : styles.cellPadding.left) !== null && _b !== void 0 ? _b : 0;
                    var rightPadding = (_c = styles === null || styles === void 0 ? void 0 : styles.cellPadding.right) !== null && _c !== void 0 ? _c : 0;
                    var textWidth = Math.max(width - leftPadding - rightPadding - PdfGanttTableDrawer.cellEllipsisSpace, 0);
                    cell.content = Ellipsis_1.EllipsisHelper.limitPdfTextWithEllipsis(cell.content, this._pdfDoc, textWidth);
                }
            }
        }
    };
    PdfGanttTableDrawer.prototype.hideRowLines = function (options) {
        options.styles.lineWidth = 0;
        options.onDrawCellCallback = function (data) {
            var cell = data.cell;
            var doc = data.doc;
            var color = cell.styles.lineColor;
            var left = cell.x;
            var right = cell.x + cell.styles.cellWidth;
            var top = cell.y;
            var bottom = cell.y + data.row.height;
            var isLastColumn = data.column.index === data.table.columns.length - 1;
            var isLastRow = data.row.index === data.table.body.length - 1;
            var isFirstRow = data.row.index === 0;
            doc.setDrawColor(color[0], color[1], color[2]);
            doc.setLineWidth(1);
            doc.line(left, bottom, left, top);
            if (isLastColumn)
                doc.line(right, bottom, right, top);
            if (isFirstRow)
                doc.line(left, top, right, top);
            if (isLastRow)
                doc.line(left, bottom, right, bottom);
        };
    };
    PdfGanttTableDrawer.cellEllipsisSpace = 3;
    return PdfGanttTableDrawer;
}());
exports.PdfGanttTableDrawer = PdfGanttTableDrawer;


/***/ }),

/***/ 817:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EllipsisHelper = void 0;
var EllipsisHelper = (function () {
    function EllipsisHelper() {
    }
    EllipsisHelper.limitPdfTextWithEllipsis = function (text, pdfDoc, size) {
        if (!(pdfDoc === null || pdfDoc === void 0 ? void 0 : pdfDoc.getTextWidth) || !size)
            return text;
        var pdfTextWidth = pdfDoc.getTextWidth(text.toString());
        if (pdfTextWidth > size) {
            var outputText = text;
            var pos = text.length - 1;
            while (pdfDoc.getTextWidth(outputText) > size && pos > 0) {
                outputText = outputText.substring(0, pos) + EllipsisHelper.ellipsis;
                pos--;
            }
            return outputText;
        }
        return text;
    };
    EllipsisHelper.ellipsis = "...";
    return EllipsisHelper;
}());
exports.EllipsisHelper = EllipsisHelper;


/***/ }),

/***/ 5063:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Margin = void 0;
var common_1 = __webpack_require__(2491);
var dom_1 = __webpack_require__(6907);
var Margin = (function () {
    function Margin(values) {
        this.assign(values);
    }
    Margin.prototype.assign = function (values) {
        if (!(0, common_1.isDefined)(values))
            return;
        if (typeof values === "string")
            this.assignFromString(values);
        else if (typeof values === "number" || values instanceof Array)
            this.assignWithValues(values);
        else {
            var source = values || values;
            this.assignWithMargin(source);
        }
    };
    Margin.prototype.assignFromString = function (source) {
        var values = source.split(" ").map(function (p) { return dom_1.DomUtils.pxToInt(p); });
        this.assignWithValues(values);
    };
    Margin.prototype.assignWithMargin = function (source) {
        if ((0, common_1.isDefined)(source.top))
            this.top = source.top;
        if ((0, common_1.isDefined)(source.right))
            this.right = source.right;
        if ((0, common_1.isDefined)(source.bottom))
            this.bottom = source.bottom;
        if ((0, common_1.isDefined)(source.left))
            this.left = source.left;
    };
    Margin.prototype.assignWithValues = function (values) {
        var numbers = this.getCorrectedValues(values);
        this.top = numbers[0];
        this.right = numbers[1];
        this.bottom = numbers[2];
        this.left = numbers[3];
    };
    Margin.prototype.getCorrectedValues = function (values) {
        var result = [this.top, this.right, this.bottom, this.left];
        if (typeof values === "number") {
            var num = values;
            result = [num, num, num, num];
        }
        else {
            var numbers = values;
            switch (numbers.length) {
                case 1:
                    result = [numbers[0], numbers[0], numbers[0], numbers[0]];
                    break;
                case 2:
                    result = [numbers[0], numbers[1], numbers[0], numbers[1]];
                    break;
                case 3:
                    result = [numbers[0], numbers[1], numbers[2], numbers[1]];
                    break;
                default:
                    numbers.forEach(function (v, i) { return result[i] = v; });
                    break;
            }
        }
        return result;
    };
    Margin.prototype.hasValue = function () {
        return (0, common_1.isDefined)(this.top) || (0, common_1.isDefined)(this.left) || (0, common_1.isDefined)(this.right) || (0, common_1.isDefined)(this.bottom);
    };
    Margin.prototype.getValue = function () {
        if (!this.hasValue())
            return null;
        if (this.top === this.bottom && this.left === this.right && this.top === this.left)
            return this.top;
        var result = {};
        if ((0, common_1.isDefined)(this.top))
            result["top"] = this.top;
        if ((0, common_1.isDefined)(this.left))
            result["left"] = this.left;
        if ((0, common_1.isDefined)(this.right))
            result["right"] = this.right;
        if ((0, common_1.isDefined)(this.bottom))
            result["bottom"] = this.bottom;
        return result;
    };
    return Margin;
}());
exports.Margin = Margin;


/***/ }),

/***/ 2642:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PredefinedStyles = void 0;
var PredefinedStyles = (function () {
    function PredefinedStyles() {
    }
    PredefinedStyles.getPredefinedStringOrUndefined = function (value, predefined) {
        var valueToCheck = value && predefined && value.toLowerCase() || undefined;
        return valueToCheck && (predefined.filter(function (f) { return f.toLowerCase() === valueToCheck; })[0] || predefined.filter(function (f) { return valueToCheck.indexOf(f.toLowerCase()) > -1; })[0]);
    };
    PredefinedStyles.fontFamilies = ["helvetica", "times", "courier"];
    PredefinedStyles.fontStyles = ["normal", "bold", "italic", "bolditalic"];
    PredefinedStyles.headerFooterVisibility = ["everyPage", "firstPage", "never"];
    PredefinedStyles.horizontalAlign = ["left", "center", "right"];
    PredefinedStyles.overflow = ["linebreak", "ellipsize", "visible", "hidden"];
    PredefinedStyles.pageBreak = ["auto", "avoid", "always"];
    PredefinedStyles.rowPageBreak = ["auto", "avoid"];
    PredefinedStyles.verticalAlign = ["top", "middle", "bottom"];
    PredefinedStyles.width = ["auto", "wrap"];
    return PredefinedStyles;
}());
exports.PredefinedStyles = PredefinedStyles;


/***/ }),

/***/ 6995:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StyleDef = void 0;
var common_1 = __webpack_require__(2491);
var dom_1 = __webpack_require__(6907);
var Color_1 = __webpack_require__(405);
var PredefinedStyles_1 = __webpack_require__(2642);
var Margin_1 = __webpack_require__(5063);
var Width_1 = __webpack_require__(7343);
var StyleDef = (function () {
    function StyleDef(source) {
        this._fillColor = new Color_1.Color();
        this._textColor = new Color_1.Color();
        this._lineColor = new Color_1.Color();
        this._cellWidth = new Width_1.Width();
        this._cellPadding = new Margin_1.Margin();
        if (source)
            this.assign(source);
    }
    Object.defineProperty(StyleDef.prototype, "font", {
        get: function () { return this._fontFamily; },
        set: function (value) { this._fontFamily = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.fontFamilies) || value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "fontStyle", {
        get: function () { return this._fontStyle; },
        set: function (value) { this._fontStyle = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.fontStyles); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "fontSize", {
        get: function () { return this._fontSize; },
        set: function (value) { this._fontSize = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "overflow", {
        get: function () { return this._overflow; },
        set: function (value) { this._overflow = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.overflow); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "halign", {
        get: function () { return this._horizontalAlign; },
        set: function (value) { this._horizontalAlign = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.horizontalAlign); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "valign", {
        get: function () { return this._verticalAlign; },
        set: function (value) { this._verticalAlign = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.verticalAlign); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "fillColor", {
        get: function () { return this._fillColor; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "textColor", {
        get: function () { return this._textColor; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "lineColor", {
        get: function () { return this._lineColor; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "cellWidth", {
        get: function () { return this._cellWidth; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "cellPadding", {
        get: function () { return this._cellPadding; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "lineWidth", {
        get: function () { return this._lineWidth; },
        set: function (value) { this._lineWidth = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "minCellWidth", {
        get: function () { return this._minCellWidth; },
        set: function (value) { this._minCellWidth = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "minCellHeight", {
        get: function () { return this._minCellHeight; },
        set: function (value) { this._minCellHeight = value; },
        enumerable: false,
        configurable: true
    });
    StyleDef.prototype.assign = function (source) {
        if (!source)
            return;
        if (source instanceof StyleDef) {
            if ((0, common_1.isDefined)(source["font"]))
                this.font = source["font"];
            if ((0, common_1.isDefined)(source["fontStyle"]))
                this.fontStyle = source["fontStyle"];
            if ((0, common_1.isDefined)(source["overflow"]))
                this.overflow = source["overflow"];
            if ((0, common_1.isDefined)(source["halign"]))
                this.halign = source["halign"];
            if ((0, common_1.isDefined)(source["valign"]))
                this.valign = source["valign"];
            if ((0, common_1.isDefined)(source["fontSize"]))
                this.fontSize = source["fontSize"];
            if ((0, common_1.isDefined)(source["lineWidth"]))
                this.lineWidth = source["lineWidth"];
            if ((0, common_1.isDefined)(source["minCellWidth"]))
                this.minCellWidth = source["minCellWidth"];
            if ((0, common_1.isDefined)(source["minCellHeight"]))
                this.minCellHeight = source["minCellHeight"];
            if ((0, common_1.isDefined)(source["fillColor"]))
                this.fillColor.assign(source["fillColor"]);
            if ((0, common_1.isDefined)(source["textColor"]))
                this.textColor.assign(source["textColor"]);
            if ((0, common_1.isDefined)(source["lineColor"]))
                this.lineColor.assign(source["lineColor"]);
            if ((0, common_1.isDefined)(source["cellWidth"]))
                this.cellWidth.assign(source["cellWidth"]);
            if ((0, common_1.isDefined)(source["cellPadding"]))
                this.cellPadding.assign(source["cellPadding"]);
        }
        else
            this.assignFromCssStyle(source);
    };
    StyleDef.prototype.assignFromCssStyle = function (source) {
        if (source.fontFamily)
            this.font = this.getPdfFontFamily(source);
        this.fontStyle = this.getPdfFontStyle(source);
        if ((0, common_1.isDefined)(source.fontSize))
            this.fontSize = this.getPfrFontSize(source.fontSize);
        if (source.textAlign)
            this.halign = source.textAlign;
        if (source.verticalAlign)
            this.valign = source.verticalAlign;
        if ((0, common_1.isDefined)(source.borderWidth))
            this.lineWidth = source.borderWidth;
        if ((0, common_1.isDefined)(source.cellWidth))
            this.cellWidth.assign(source.cellWidth);
        if ((0, common_1.isDefined)(source.width))
            this.minCellWidth = typeof source.width === "number" ? source.width : dom_1.DomUtils.pxToInt(source.width);
        if ((0, common_1.isDefined)(source.height))
            this.minCellHeight = typeof source.height === "number" ? source.height : dom_1.DomUtils.pxToInt(source.height);
        if (source.backgroundColor)
            this.fillColor.assign(source.backgroundColor);
        if (source.color)
            this.textColor.assign(source.color);
        if (source.borderColor)
            this.lineColor.assign(source.borderColor);
        if ((0, common_1.isDefined)(source.width))
            this.cellWidth.assign(source.width);
        this.assignPaddingFromCss(source);
        if ((0, common_1.isDefined)(source.extraLeftPadding)) {
            var currentLeftPadding = this._cellPadding.left;
            this._cellPadding.left = currentLeftPadding ? currentLeftPadding + source.extraLeftPadding : source.extraLeftPadding;
        }
    };
    StyleDef.prototype.getPdfFontStyle = function (style) {
        var fontWeight = style.fontWeight;
        var numeric = parseInt(fontWeight);
        var isBold = fontWeight === "bold" || !isNaN(numeric) && numeric > 500;
        var isItalic = style.fontStyle === "italic";
        var result = isBold ? "bold" : "normal";
        if (isItalic)
            result = isBold ? "bolditalic" : "italic";
        return result;
    };
    StyleDef.prototype.getPdfFontFamily = function (style) {
        var fontFamily = style.fontFamily && style.fontFamily.toLowerCase();
        var result = "helvetica";
        if (fontFamily.indexOf("times") > -1)
            result = "times";
        if (fontFamily.indexOf("courier") > -1)
            result = "courier";
        return result;
    };
    StyleDef.prototype.getPfrFontSize = function (fontSize) {
        var size = dom_1.DomUtils.pxToInt(fontSize);
        if (!isNaN(size))
            return Math.ceil(size / 96 * 72);
    };
    StyleDef.prototype.assignPaddingFromCss = function (source) {
        if (source.padding)
            this._cellPadding.assign(source.padding);
        else {
            var padding = {};
            if (source.paddingLeft)
                padding["left"] = dom_1.DomUtils.pxToInt(source.paddingLeft);
            if (source.paddingTop)
                padding["top"] = dom_1.DomUtils.pxToInt(source.paddingTop);
            if (source.paddingRight)
                padding["right"] = dom_1.DomUtils.pxToInt(source.paddingRight);
            if (source.paddingBottom)
                padding["bottom"] = dom_1.DomUtils.pxToInt(source.paddingBottom);
            this._cellPadding.assign(padding);
        }
    };
    StyleDef.prototype.hasValue = function () {
        return true;
    };
    StyleDef.prototype.getValue = function () {
        var _this = this;
        var style = {};
        if ((0, common_1.isDefined)(this.font))
            style["font"] = this.font;
        if ((0, common_1.isDefined)(this.fontStyle))
            style["fontStyle"] = this.fontStyle;
        if ((0, common_1.isDefined)(this.fontSize))
            style["fontSize"] = this.fontSize;
        if ((0, common_1.isDefined)(this.overflow))
            style["overflow"] = this.overflow;
        if ((0, common_1.isDefined)(this.halign))
            style["halign"] = this.halign;
        if ((0, common_1.isDefined)(this.valign))
            style["valign"] = this.valign;
        if ((0, common_1.isDefined)(this.lineWidth))
            style["lineWidth"] = this.lineWidth;
        if ((0, common_1.isDefined)(this.minCellWidth))
            style["minCellWidth"] = this.minCellWidth;
        if ((0, common_1.isDefined)(this.minCellHeight))
            style["minCellHeight"] = this.minCellHeight;
        this.getJsPdfProviderProps().forEach(function (key) {
            var prop = _this[key];
            if (prop && prop.hasValue())
                style[key] = prop.getValue();
        });
        return style;
    };
    StyleDef.prototype.getJsPdfProviderProps = function () {
        return [
            "fillColor",
            "textColor",
            "lineColor",
            "cellWidth",
            "cellPadding"
        ];
    };
    return StyleDef;
}());
exports.StyleDef = StyleDef;


/***/ }),

/***/ 7624:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TableOptions = void 0;
var common_1 = __webpack_require__(2491);
var CellDef_1 = __webpack_require__(6032);
var Color_1 = __webpack_require__(405);
var PredefinedStyles_1 = __webpack_require__(2642);
var Margin_1 = __webpack_require__(5063);
var StyleDef_1 = __webpack_require__(6995);
var Width_1 = __webpack_require__(7343);
var TableOptions = (function () {
    function TableOptions() {
        this._margin = new Margin_1.Margin();
        this._tableLineColor = new Color_1.Color();
        this._tableWidth = new Width_1.Width();
        this._styles = new StyleDef_1.StyleDef();
        this._alternateRowStyles = new StyleDef_1.StyleDef();
    }
    Object.defineProperty(TableOptions.prototype, "pageBreak", {
        get: function () { return this._pageBreak; },
        set: function (value) { this._pageBreak = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.pageBreak); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "rowPageBreak", {
        get: function () { return this._rowPageBreak; },
        set: function (value) { this._rowPageBreak = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.rowPageBreak); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "showHead", {
        get: function () { return this._showHead; },
        set: function (value) { this._showHead = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.headerFooterVisibility); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "showFoot", {
        get: function () { return this._showFoot; },
        set: function (value) { this._showFoot = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.headerFooterVisibility); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "startY", {
        get: function () { return this._startY; },
        set: function (value) { this._startY = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "tableLineWidth", {
        get: function () { return this._tableLineWidth; },
        set: function (value) { this._tableLineWidth = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "margin", {
        get: function () { return this._margin; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "tableLineColor", {
        get: function () { return this._tableLineColor; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "tableWidth", {
        get: function () { return this._tableWidth; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "body", {
        get: function () { return this._body; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "styles", {
        get: function () { return this._styles; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "alternateRowStyles", {
        get: function () { return this._alternateRowStyles; },
        enumerable: false,
        configurable: true
    });
    TableOptions.prototype.hasValue = function () { return true; };
    TableOptions.prototype.getValue = function () {
        var _this = this;
        var options = {};
        options["pageBreak"] = this.pageBreak;
        options["rowPageBreak"] = this.rowPageBreak;
        options["showFoot"] = this.showFoot;
        options["showHead"] = this.showHead;
        options["startY"] = this.startY;
        options["tableLineWidth"] = this.tableLineWidth;
        this.getJsPdfProviderProps().forEach(function (key) {
            var prop = _this[key];
            if (prop && prop.hasValue())
                options[key] = prop.getValue();
        });
        options["body"] = this.getBodyForJsPdf();
        options["columnStyles"] = this.getColumnStylesForJsPdf();
        if (this.onDrawCellCallback)
            options["didDrawCell"] = this.onDrawCellCallback;
        return options;
    };
    TableOptions.prototype.getJsPdfProviderProps = function () {
        return [
            "margin",
            "tableLineColor",
            "tableWidth",
            "styles",
            "alternateRowStyles"
        ];
    };
    TableOptions.prototype.getBodyForJsPdf = function () {
        var result = [];
        for (var i = 0; i < this._body.length; i++) {
            var sourceRow = this._body[i];
            var row = [];
            for (var j = 0; j < sourceRow.length; j++)
                row.push(sourceRow[j].getValue());
            result.push(row);
        }
        return result;
    };
    TableOptions.prototype.assign = function (source) {
        if (!source)
            return;
        if ((0, common_1.isDefined)(source["margin"]))
            this.margin.assign(source["margin"]);
        if ((0, common_1.isDefined)(source["pageBreak"]))
            this.pageBreak = source["pageBreak"];
        if ((0, common_1.isDefined)(source["rowPageBreak"]))
            this.rowPageBreak = source["rowPageBreak"];
        if ((0, common_1.isDefined)(source["showFoot"]))
            this.showFoot = source["showFoot"];
        if ((0, common_1.isDefined)(source["showHead"]))
            this.showHead = source["showHead"];
        if ((0, common_1.isDefined)(source["startY"]))
            this.startY = source["startY"];
        if ((0, common_1.isDefined)(source["tableLineWidth"]))
            this.tableLineWidth = source["tableLineWidth"];
        if ((0, common_1.isDefined)(source["tableLineColor"]))
            this.tableLineColor.assign(source["tableLineColor"]);
        if ((0, common_1.isDefined)(source["tableWidth"]))
            this.tableWidth.assign(source["tableWidth"]);
    };
    TableOptions.prototype.addBody = function (source) {
        if (!source)
            return;
        this._body = new Array();
        this.addCells(source, this._body);
    };
    TableOptions.prototype.addCells = function (source, target) {
        var tableBackColor = this.styles.fillColor;
        for (var i = 0; i < source.length; i++) {
            var sourceRow = source[i];
            var row = new Array();
            for (var j = 0; j < sourceRow.length; j++) {
                var cell = new CellDef_1.CellDef(sourceRow[j]);
                if (tableBackColor.hasValue() && cell.styles && cell.styles.fillColor.hasValue())
                    cell.styles.fillColor.applyOpacityToBackground(tableBackColor);
                row.push(cell);
            }
            target.push(row);
        }
    };
    TableOptions.prototype.applyColumnStyle = function (key, style) {
        var _a;
        (_a = this._columnStyles) !== null && _a !== void 0 ? _a : (this._columnStyles = new Array());
        this._columnStyles[key] = new StyleDef_1.StyleDef(style);
    };
    TableOptions.prototype.getColumnStylesForJsPdf = function () {
        if (this._columnStyles) {
            var result_1 = {};
            this._columnStyles.forEach(function (v, i) {
                if (v)
                    result_1[i] = v.getValue();
            });
            return result_1;
        }
        return null;
    };
    return TableOptions;
}());
exports.TableOptions = TableOptions;


/***/ }),

/***/ 7343:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Width = void 0;
var PredefinedStyles_1 = __webpack_require__(2642);
var dom_1 = __webpack_require__(6907);
var Width = (function () {
    function Width(width) {
        this.assign(width);
    }
    Width.prototype.assign = function (source) {
        if (source instanceof Width)
            this._widthInternal = source._widthInternal;
        else {
            var num = typeof source === "number" ? source : parseInt(source);
            if (!isNaN(num))
                this._widthInternal = num;
            else
                this.assignFromString(source);
        }
    };
    Width.prototype.assignFromString = function (source) {
        if (source) {
            var px = dom_1.DomUtils.pxToInt(source);
            if (px)
                this._widthInternal = px;
            else
                this._widthInternal = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(source, PredefinedStyles_1.PredefinedStyles.width);
        }
    };
    Width.prototype.hasValue = function () {
        return !!this._widthInternal;
    };
    Width.prototype.getValue = function () {
        return this._widthInternal;
    };
    return Width;
}());
exports.Width = Width;


/***/ }),

/***/ 8603:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaExportHelper = void 0;
var dom_1 = __webpack_require__(6907);
var DateRange_1 = __webpack_require__(858);
var GridLayoutCalculator_1 = __webpack_require__(1855);
var DateUtils_1 = __webpack_require__(9201);
var Color_1 = __webpack_require__(405);
var Enums_1 = __webpack_require__(9895);
var TaskAreaExportHelper = (function () {
    function TaskAreaExportHelper(owner, props) {
        this._owner = owner;
        this._props = props;
    }
    Object.defineProperty(TaskAreaExportHelper.prototype, "customRangeLeftOffset", {
        get: function () {
            var _a;
            (_a = this._customRangeLeftOffset) !== null && _a !== void 0 ? _a : (this._customRangeLeftOffset = this.layoutCalculator.getWidthByDateRange(this.startDate, this.ownerStartDate));
            return this._customRangeLeftOffset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "baseCellSize", {
        get: function () { return this._owner.tickSize; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "objectsLeftDelta", {
        get: function () {
            return this.renderedScaleLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "objectsTopDelta", {
        get: function () {
            if (!this.hasTasks)
                return 0;
            var firstIndex = this.visibleTaskIndices[0];
            return this.getCellTop(firstIndex) + this.getTaskCellOffsetTop(firstIndex);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "offsetLeft", {
        get: function () {
            var _a;
            (_a = this._offsetLeft) !== null && _a !== void 0 ? _a : (this._offsetLeft = Math.max(this.visibleLeft - this.renderedScaleLeft, 0));
            return this._offsetLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "offsetTop", {
        get: function () {
            var _a;
            (_a = this._offsetTop) !== null && _a !== void 0 ? _a : (this._offsetTop = this.getOffsetTop());
            return this._offsetTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scales", {
        get: function () {
            var viewType = this.settings.viewType;
            return [DateUtils_1.DateUtils.ViewTypeToScaleMap[viewType], viewType];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleRanges", {
        get: function () {
            var _a;
            (_a = this._scaleRanges) !== null && _a !== void 0 ? _a : (this._scaleRanges = this.layoutCalculator.getScaleRangesInArea(this.scaleLeft, this.scaleRight));
            return this._scaleRanges;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleBottomStartIndex", {
        get: function () {
            return this.scaleRanges[1][0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleBottomEndIndex", {
        get: function () {
            return this.scaleRanges[1][1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleTopStartIndex", {
        get: function () {
            return this.scaleRanges[0][0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleTopEndIndex", {
        get: function () {
            return this.scaleRanges[0][1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleTopWidths", {
        get: function () {
            var _a;
            (_a = this._scaleTopWidths) !== null && _a !== void 0 ? _a : (this._scaleTopWidths = this.getScaleTopWidths());
            return this._scaleTopWidths;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleBottomWidths", {
        get: function () {
            var _a;
            (_a = this._scaleBottomWidths) !== null && _a !== void 0 ? _a : (this._scaleBottomWidths = this.getScaleBottomWidths());
            return this._scaleBottomWidths;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "headerRowHeight", {
        get: function () {
            if (!this._headerRowHeight) {
                var element = this.scaleElements[0].filter(function (el) { return !!el; })[0];
                this._headerRowHeight = element === null || element === void 0 ? void 0 : element.offsetHeight;
            }
            return this._headerRowHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleTaskIndices", {
        get: function () {
            var _a;
            (_a = this._visibleTaskIndices) !== null && _a !== void 0 ? _a : (this._visibleTaskIndices = this.getTaskIndices());
            return this._visibleTaskIndices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "baseCellHeight", {
        get: function () {
            return this.hasTasks ? this.baseCellSize.height : this.taskAreaHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "taskAreaHeight", {
        get: function () {
            return this.hasTasks ? this.visibleTaskIndices.length * this.baseCellHeight : this._owner.renderHelper.taskArea.offsetHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleTableStyle", {
        get: function () {
            var _a;
            (_a = this._scaleTableStyle) !== null && _a !== void 0 ? _a : (this._scaleTableStyle = this.getScaleTableStyle());
            return this._scaleTableStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "chartMainTableStyle", {
        get: function () {
            var _a;
            (_a = this._chartMainTableStyle) !== null && _a !== void 0 ? _a : (this._chartMainTableStyle = this.getChartMainTableStyle());
            return this._chartMainTableStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "parentRowBackColor", {
        get: function () {
            var _a;
            (_a = this._parentRowBackColor) !== null && _a !== void 0 ? _a : (this._parentRowBackColor = this.getParentBackColor());
            return this._parentRowBackColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "arrowWidth", {
        get: function () {
            var _a;
            (_a = this._arrowWidth) !== null && _a !== void 0 ? _a : (this._arrowWidth = this.getArrowWidth());
            return this._arrowWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "dependencyColor", {
        get: function () {
            var _a;
            (_a = this._dependencyColor) !== null && _a !== void 0 ? _a : (this._dependencyColor = this.getDependencyColor());
            return this._dependencyColor;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getTaskElementBackColor = function (taskIndex, className) {
        var style = this.getTaskElementStyle(taskIndex, className);
        return style === null || style === void 0 ? void 0 : style.backgroundColor;
    };
    TaskAreaExportHelper.prototype.getTaskElementStyle = function (taskIndex, className) {
        var taskWrapper = this.getTaskWrapper(taskIndex);
        return this.getElementStyle(taskWrapper.getElementsByClassName(className)[0]);
    };
    TaskAreaExportHelper.prototype.isElementVisible = function (element) {
        return element && getComputedStyle(element).display !== "none";
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "hasTasks", {
        get: function () {
            return this.visibleTaskIndices.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleLeft", {
        get: function () {
            var _a;
            (_a = this._visibleLeft) !== null && _a !== void 0 ? _a : (this._visibleLeft = this.isVisibleMode ? this.container.scrollLeft : 0);
            return this._visibleLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleTop", {
        get: function () {
            var _a;
            (_a = this._visibleTop) !== null && _a !== void 0 ? _a : (this._visibleTop = this.isVisibleMode ? this.container.scrollTop : 0);
            return this._visibleTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleRight", {
        get: function () {
            var _a;
            (_a = this._visibleRight) !== null && _a !== void 0 ? _a : (this._visibleRight = this.getVisibleRight());
            return this._visibleRight;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getVisibleRight = function () {
        var width = this.container.getElement().offsetWidth;
        return this.visibleLeft + width;
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleBottom", {
        get: function () {
            var _a;
            (_a = this._visibleBottom) !== null && _a !== void 0 ? _a : (this._visibleBottom = this.getVisibleBottom());
            return this._visibleBottom;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getVisibleBottom = function () {
        if (!this.isVisibleMode)
            return this.visibleTaskIndices.length * this.baseCellSize.height;
        return this.visibleTop + this.container.getHeight();
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleLeft", {
        get: function () {
            var _a;
            (_a = this._scaleLeft) !== null && _a !== void 0 ? _a : (this._scaleLeft = this.isVisibleMode ? this.visibleLeft : this.getPosByDate(this.startDate));
            return this._scaleLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleRight", {
        get: function () {
            var _a;
            (_a = this._scaleRight) !== null && _a !== void 0 ? _a : (this._scaleRight = this.isVisibleMode ? this.visibleRight : this.getPosByDate(this.endDate) - 1);
            return this._scaleRight;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getScaleTopWidths = function () {
        var widths = this.getScaleWidths(this.scaleTopStartIndex, this.scaleTopEndIndex, this.scales[0]);
        var calc = this.layoutCalculator;
        var firstBottom = calc.getScaleItemInfo(this.scaleBottomStartIndex, this.scales[1]);
        var firstTop = calc.getScaleItemInfo(this.scaleTopStartIndex, this.scales[0]);
        var delta = Math.max(firstBottom.position.x - firstTop.position.x, 0);
        widths[this.scaleTopStartIndex] -= delta;
        var lastTop = calc.getScaleItemInfo(this.scaleTopEndIndex, this.scales[0]);
        var lastBottom = calc.getScaleItemInfo(this.scaleBottomEndIndex, this.scales[1]);
        delta = Math.max(lastTop.position.x + lastTop.size.width - lastBottom.position.x - lastBottom.size.width, 0);
        widths[this.scaleTopEndIndex] -= delta;
        return widths;
    };
    TaskAreaExportHelper.prototype.getScaleBottomWidths = function () {
        return this.getScaleWidths(this.scaleBottomStartIndex, this.scaleBottomEndIndex, this.scales[1]);
    };
    TaskAreaExportHelper.prototype.getScaleWidths = function (start, end, scaleType) {
        var widths = new Array();
        for (var i = start; i <= end; i++)
            widths[i] = this.layoutCalculator.getScaleItemInfo(i, scaleType).size.width;
        return widths;
    };
    TaskAreaExportHelper.prototype.getOffsetTop = function () {
        return this.isVisibleMode && this.hasTasks ? this.getTaskCellOffsetTop(this.visibleTaskIndices[0]) : 0;
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "renderedScaleLeft", {
        get: function () {
            return this.getCellLeft(this.scaleBottomStartIndex);
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getTaskCellOffsetTop = function (taskIndex) {
        var point = this.getCellTop(taskIndex);
        return Math.max(this.visibleTop - point, 0);
    };
    TaskAreaExportHelper.prototype.getCellTop = function (index) {
        var point = this.layoutCalculator.getGridBorderPosition(index - 1, false);
        return point.y;
    };
    TaskAreaExportHelper.prototype.getCellLeft = function (index) {
        var point = this.layoutCalculator.getScaleItemInfo(index, this.scales[1]).position;
        return point.x;
    };
    TaskAreaExportHelper.prototype.getTaskIndices = function () {
        var _a, _b;
        if (this.dataMode === Enums_1.DataExportMode.all || this.exportRange)
            return this._owner.getAllVisibleTaskIndices((_a = this.exportRange) === null || _a === void 0 ? void 0 : _a.startIndex, (_b = this.exportRange) === null || _b === void 0 ? void 0 : _b.endIndex);
        return this.getVisibleTaskIndices();
    };
    TaskAreaExportHelper.prototype.getVisibleTaskIndices = function () {
        var _this = this;
        var indices = [];
        this.taskElements.forEach(function (t, i) {
            if (t) {
                var taskTop = dom_1.DomUtils.pxToInt(t.style.top);
                var taskBottom = taskTop + t.offsetHeight;
                var topInArea = taskTop >= _this.visibleTop && taskTop <= _this.visibleBottom;
                var bottomInArea = taskBottom >= _this.visibleTop && taskBottom <= _this.visibleBottom;
                if (topInArea || bottomInArea)
                    indices.push(i);
            }
        });
        return indices;
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleElements", {
        get: function () {
            return this._owner.renderHelper.scaleElements.slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleBorders", {
        get: function () {
            return this._owner.renderHelper.scaleBorders.slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "hlRowElements", {
        get: function () {
            return this._owner.renderHelper.hlRowElements.filter(function (el) { return !!el; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "selectionElements", {
        get: function () {
            return this._owner.renderHelper.selectionElements.filter(function (el) { return !!el; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "taskElements", {
        get: function () {
            return this._owner.renderHelper.taskElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "connectorLines", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._connectorLines) !== null && _a !== void 0 ? _a : (this._connectorLines = this._owner.renderHelper.allConnectorLines.filter(function (l) { return _this.isLineVisible(l); }));
            return this._connectorLines;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.isLineVisible = function (line) {
        if (this.dataMode === Enums_1.DataExportMode.all)
            return true;
        var id = line.attr["dependency-id"];
        return this.visibleDependencyKeys.indexOf(id) > -1;
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleDependencyKeys", {
        get: function () {
            var _a;
            (_a = this._visibleDependencyKeys) !== null && _a !== void 0 ? _a : (this._visibleDependencyKeys = this._owner.getVisibleDependencyKeysByTaskRange(this.visibleTaskIndices));
            return this._visibleDependencyKeys;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "resourcesElements", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._resourcesElements) !== null && _a !== void 0 ? _a : (this._resourcesElements = this.visibleTaskIndices.map(function (tIndex) { return _this._owner.renderHelper.resourcesElements[tIndex]; }).filter(function (r) { return _this.isElementVisible(r) && r.parentElement; }));
            return this._resourcesElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "stripLinesElements", {
        get: function () {
            if (!this._stripLinesElements) {
                var elements = this._owner.renderHelper.stripLinesMap.filter(function (s) { return !!s; }).map(function (s) { return s; });
                this._stripLinesElements = elements.map(function (e) { return e; });
            }
            return this._stripLinesElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "noWorkingIntervalsElements", {
        get: function () {
            if (!this._noWorkingIntervalsElements) {
                this._noWorkingIntervalsElements = [];
                var hash = this._owner.renderHelper.noWorkingIntervalsToElementsMap;
                for (var key in hash) {
                    if (!Object.prototype.hasOwnProperty.call(hash, key))
                        continue;
                    this._noWorkingIntervalsElements.push(hash[key]);
                }
            }
            return this._noWorkingIntervalsElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "taskArea", {
        get: function () {
            return this._owner.renderHelper.taskArea;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "settings", {
        get: function () { return this._owner.settings; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "dataMode", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.exportDataMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "exportRange", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.dateRange;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "isVisibleMode", {
        get: function () {
            return this.dataMode === Enums_1.DataExportMode.visible && !this.exportRange;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "ownerStartDate", {
        get: function () {
            return this._owner.range.start;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "ownerEndDate", {
        get: function () {
            return this._owner.range.end;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "startDate", {
        get: function () {
            var _a, _b, _c, _d;
            if (((_a = this.exportRange) === null || _a === void 0 ? void 0 : _a.startDate) && ((_b = this.exportRange) === null || _b === void 0 ? void 0 : _b.endDate)) {
                var min = Math.min((_c = this.exportRange) === null || _c === void 0 ? void 0 : _c.startDate.getTime(), (_d = this.exportRange) === null || _d === void 0 ? void 0 : _d.endDate.getTime());
                return new Date(min);
            }
            return this.ownerStartDate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "endDate", {
        get: function () {
            var _a, _b, _c, _d;
            if (((_a = this.exportRange) === null || _a === void 0 ? void 0 : _a.startDate) && ((_b = this.exportRange) === null || _b === void 0 ? void 0 : _b.endDate)) {
                var max = Math.max((_c = this.exportRange) === null || _c === void 0 ? void 0 : _c.startDate.getTime(), (_d = this.exportRange) === null || _d === void 0 ? void 0 : _d.endDate.getTime());
                return new Date(max);
            }
            return this.ownerEndDate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "hasCustomRangeOutOfRender", {
        get: function () {
            return this.startDate.getTime() !== this.ownerStartDate.getTime() || this.endDate.getTime() !== this.ownerEndDate.getTime();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "layoutCalculator", {
        get: function () {
            if (!this._layoutCalculator) {
                var calc = this._owner.renderHelper.gridLayoutCalculator;
                if (this.hasCustomRangeOutOfRender) {
                    this._layoutCalculator = new GridLayoutCalculator_1.GridLayoutCalculator();
                    this._layoutCalculator.setSettings(calc.visibleTaskAreaSize, calc.tickSize, calc.elementSizeValues, new DateRange_1.DateRange(this.startDate, this.endDate), calc.viewModel, calc.viewType, calc.scrollBarHeight, this._owner.settings.firstDayOfWeek);
                }
                else
                    this._layoutCalculator = calc;
            }
            return this._layoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "container", {
        get: function () {
            return this._owner.renderHelper.taskAreaContainer;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getPosByDate = function (date) {
        return this.layoutCalculator.getPosByDate(date);
    };
    TaskAreaExportHelper.prototype.getScaleTableStyle = function () {
        var result = {};
        var visibleScaleItem = this.scaleElements[0].filter(function (el) { return !!el; })[0];
        var style = this.getElementStyle(visibleScaleItem);
        result["backgroundColor"] = this.findElementBackColor(visibleScaleItem);
        result["borderColor"] = this.getChartTableBorderColor();
        result["verticalAlign"] = "middle";
        result["textAlign"] = "center";
        result["fontSize"] = style.fontSize;
        result["fontFamily"] = style.fontFamily;
        result["fontWeight"] = style.fontWeight;
        result["fontStyle"] = style.fontStyle;
        result["color"] = style.color;
        return result;
    };
    TaskAreaExportHelper.prototype.getChartMainTableStyle = function () {
        var result = {};
        result["backgroundColor"] = this.findElementBackColor(this.taskArea);
        result["borderColor"] = this.getChartTableBorderColor();
        return result;
    };
    TaskAreaExportHelper.prototype.findElementBackColor = function (element) {
        if (!element)
            return null;
        var parent = element;
        var color = new Color_1.Color("transparent");
        while (color.opacity === 0 && parent) {
            var style = this.getElementStyle(parent);
            color.assign(style.backgroundColor);
            parent = parent.parentElement;
        }
        return color;
    };
    TaskAreaExportHelper.prototype.getChartTableBorderColor = function () {
        var style = this.getElementStyle(this.scaleBorders[0].filter(function (el) { return !!el; })[0]);
        return style === null || style === void 0 ? void 0 : style.borderColor;
    };
    TaskAreaExportHelper.prototype.getParentBackColor = function () {
        var style = this.getElementStyle(this.hlRowElements[0]);
        return style === null || style === void 0 ? void 0 : style.backgroundColor;
    };
    TaskAreaExportHelper.prototype.getArrowWidth = function () {
        var style = this.getDependencyLineStyle(GridLayoutCalculator_1.GridLayoutCalculator.arrowClassName);
        var borderWidth = style.borderWidth || style.borderLeftWidth || style.borderRightWidth || style.borderTopWidth || style.borderBottomWidth;
        return style && dom_1.DomUtils.pxToInt(borderWidth);
    };
    TaskAreaExportHelper.prototype.getDependencyColor = function () {
        var style = this.getDependencyLineStyle(GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_HORIZONTAL);
        return style === null || style === void 0 ? void 0 : style.borderColor;
    };
    TaskAreaExportHelper.prototype.getDependencyLineStyle = function (className) {
        return this.getElementStyle(this.taskArea.getElementsByClassName(className)[0]);
    };
    TaskAreaExportHelper.prototype.getElementStyle = function (element) {
        return element && getComputedStyle(element);
    };
    TaskAreaExportHelper.prototype.getTaskWrapper = function (index) {
        if (this.isTaskTemplateMode)
            return this._owner.renderHelper.fakeTaskWrapper;
        if (!this.taskElements[index])
            this._owner.renderHelper.createDefaultTaskElement(index);
        return this.taskElements[index];
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "isTaskTemplateMode", {
        get: function () {
            return !!this._owner.settings.taskContentTemplate;
        },
        enumerable: false,
        configurable: true
    });
    return TaskAreaExportHelper;
}());
exports.TaskAreaExportHelper = TaskAreaExportHelper;


/***/ }),

/***/ 6057:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollectionBase = void 0;
var common_1 = __webpack_require__(2491);
var GanttJsonUtils_1 = __webpack_require__(2601);
var CollectionBase = (function () {
    function CollectionBase() {
        this._items = new Array();
        this._isGanttCollection = true;
    }
    CollectionBase.prototype.add = function (element) {
        if (!(0, common_1.isDefined)(element))
            return;
        if (this.getItemById(element.internalId))
            throw "The collection item with id ='" + element.internalId + "' already exists.";
        this._addItem(element);
    };
    CollectionBase.prototype.addRange = function (range) {
        for (var i = 0; i < range.length; i++)
            this.add(range[i]);
    };
    CollectionBase.prototype.remove = function (element) {
        var index = this._items.indexOf(element);
        if (index > -1 && index < this._items.length)
            this._removeItems(index, 1);
    };
    CollectionBase.prototype.clear = function () {
        this._removeItems(0, this._items.length);
    };
    CollectionBase.prototype.invalidate = function () {
        delete this._invertedItems;
    };
    CollectionBase.prototype._addItem = function (element) {
        this._items.push(element);
        delete this._invertedItems;
    };
    CollectionBase.prototype._removeItems = function (start, count) {
        this._items.splice(start, count);
        delete this._invertedItems;
    };
    Object.defineProperty(CollectionBase.prototype, "items", {
        get: function () {
            return this._items.slice();
        },
        set: function (value) {
            if (value)
                this._items = value.slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CollectionBase.prototype, "length", {
        get: function () {
            return this._items.length;
        },
        enumerable: false,
        configurable: true
    });
    CollectionBase.prototype.getItem = function (index) {
        if (index > -1 && index < this._items.length)
            return this._items[index];
        return null;
    };
    Object.defineProperty(CollectionBase.prototype, "invertedItems", {
        get: function () {
            var _a;
            (_a = this._invertedItems) !== null && _a !== void 0 ? _a : (this._invertedItems = this._createInvertedItems());
            return this._invertedItems;
        },
        enumerable: false,
        configurable: true
    });
    CollectionBase.prototype._createInvertedItems = function () {
        var result = {};
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            result[item.internalId] = item;
        }
        return result;
    };
    CollectionBase.prototype.getItemById = function (id) {
        return this.invertedItems[id];
    };
    CollectionBase.prototype.getItemByPublicId = function (id) {
        return this._items.filter(function (val) { return val.id === id || val.id.toString() === id; })[0];
    };
    CollectionBase.prototype.assign = function (sourceCollection) {
        if (!(0, common_1.isDefined)(sourceCollection))
            return;
        this.items = sourceCollection.items;
    };
    CollectionBase.prototype.importFromObject = function (source) {
        if (!(0, common_1.isDefined)(source))
            return;
        this.clear();
        if (source._isGanttCollection)
            this.assign(source);
        else if (source instanceof Array)
            this.importFromArray(source);
        else
            this.createItemFromObjectAndAdd(source);
    };
    CollectionBase.prototype.createItemFromObjectAndAdd = function (source) {
        if ((0, common_1.isDefined)(source) && Object.keys(source).length > 0) {
            var item = this.createItem();
            item.assignFromObject(source);
            this.add(item);
        }
    };
    CollectionBase.prototype.importFromArray = function (values) {
        for (var i = 0; i < values.length; i++)
            this.createItemFromObjectAndAdd(values[i]);
    };
    CollectionBase.prototype.importFromJSON = function (json) {
        this.importFromObject(GanttJsonUtils_1.GanttJsonUtils.parseJson(json));
    };
    return CollectionBase;
}());
exports.CollectionBase = CollectionBase;


/***/ }),

/***/ 7380:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DependencyCollection = void 0;
var tslib_1 = __webpack_require__(655);
var CollectionBase_1 = __webpack_require__(6057);
var Dependency_1 = __webpack_require__(7352);
var DependencyCollection = (function (_super) {
    tslib_1.__extends(DependencyCollection, _super);
    function DependencyCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DependencyCollection.prototype.createItem = function () { return new Dependency_1.Dependency(); };
    return DependencyCollection;
}(CollectionBase_1.CollectionBase));
exports.DependencyCollection = DependencyCollection;


/***/ }),

/***/ 4432:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkingDayRuleCollection = void 0;
var tslib_1 = __webpack_require__(655);
var CollectionBase_1 = __webpack_require__(6057);
var WorkingTimeRule_1 = __webpack_require__(8401);
var WorkingDayRuleCollection = (function (_super) {
    tslib_1.__extends(WorkingDayRuleCollection, _super);
    function WorkingDayRuleCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkingDayRuleCollection.prototype.createItem = function () { return new WorkingTimeRule_1.WorkingTimeRule(); };
    return WorkingDayRuleCollection;
}(CollectionBase_1.CollectionBase));
exports.WorkingDayRuleCollection = WorkingDayRuleCollection;


/***/ }),

/***/ 9883:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceAssignmentCollection = void 0;
var tslib_1 = __webpack_require__(655);
var CollectionBase_1 = __webpack_require__(6057);
var ResourceAssignment_1 = __webpack_require__(7437);
var ResourceAssignmentCollection = (function (_super) {
    tslib_1.__extends(ResourceAssignmentCollection, _super);
    function ResourceAssignmentCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceAssignmentCollection.prototype.createItem = function () { return new ResourceAssignment_1.ResourceAssignment(); };
    return ResourceAssignmentCollection;
}(CollectionBase_1.CollectionBase));
exports.ResourceAssignmentCollection = ResourceAssignmentCollection;


/***/ }),

/***/ 8828:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceCollection = void 0;
var tslib_1 = __webpack_require__(655);
var CollectionBase_1 = __webpack_require__(6057);
var Resource_1 = __webpack_require__(2301);
var ResourceCollection = (function (_super) {
    tslib_1.__extends(ResourceCollection, _super);
    function ResourceCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceCollection.prototype.createItem = function () { return new Resource_1.Resource(); };
    return ResourceCollection;
}(CollectionBase_1.CollectionBase));
exports.ResourceCollection = ResourceCollection;


/***/ }),

/***/ 9504:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskCollection = void 0;
var tslib_1 = __webpack_require__(655);
var Task_1 = __webpack_require__(8492);
var CollectionBase_1 = __webpack_require__(6057);
var TaskCollection = (function (_super) {
    tslib_1.__extends(TaskCollection, _super);
    function TaskCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskCollection.prototype.createItem = function () { return new Task_1.Task(); };
    return TaskCollection;
}(CollectionBase_1.CollectionBase));
exports.TaskCollection = TaskCollection;


/***/ }),

/***/ 5594:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventDispatcher = void 0;
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.listeners = [];
    }
    EventDispatcher.prototype.add = function (listener) {
        if (!listener)
            throw new Error("Error");
        if (!this.hasEventListener(listener))
            this.listeners.push(listener);
    };
    EventDispatcher.prototype.remove = function (listener) {
        for (var i = 0, currentListener = void 0; currentListener = this.listeners[i]; i++)
            if (currentListener === listener) {
                this.listeners.splice(i, 1);
                break;
            }
    };
    EventDispatcher.prototype.raise = function (funcName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0, listener = void 0; listener = this.listeners[i]; i++) {
            var func = listener[funcName];
            func === null || func === void 0 ? void 0 : func.apply(listener, args);
        }
    };
    EventDispatcher.prototype.hasEventListener = function (listener) {
        for (var i = 0, l = this.listeners.length; i < l; i++)
            if (this.listeners[i] === listener)
                return true;
        return false;
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;


/***/ }),

/***/ 3452:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelChangesDispatcher = void 0;
var ResourceManagerDialogShowingArguments_1 = __webpack_require__(255);
var TaskEditDialogShowingArguments_1 = __webpack_require__(8403);
var ResourceUnassigningArguments_1 = __webpack_require__(8738);
var TaskUpdatingArguments_1 = __webpack_require__(9669);
var EventDispatcher_1 = __webpack_require__(5594);
var ModelChangesDispatcher = (function () {
    function ModelChangesDispatcher() {
        this.onModelChanged = new EventDispatcher_1.EventDispatcher();
        this.isLocked = false;
    }
    ModelChangesDispatcher.prototype.notifyTaskCreating = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskCreating", args);
    };
    ModelChangesDispatcher.prototype.notifyTaskCreated = function (task, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskCreated", task, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyTaskRemoving = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskRemoving", args);
    };
    ModelChangesDispatcher.prototype.notifyTaskRemoved = function (taskID, errorCallback, task) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskRemoved", taskID, errorCallback, task);
    };
    ModelChangesDispatcher.prototype.notifyTaskUpdating = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskUpdating", args);
    };
    ModelChangesDispatcher.prototype.notifyTaskMoving = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskMoving", args);
    };
    ModelChangesDispatcher.prototype.notifyTaskEditDialogShowing = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskEditDialogShowing", args);
    };
    ModelChangesDispatcher.prototype.notifyResourceManagerDialogShowing = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceManagerDialogShowing", args);
    };
    ModelChangesDispatcher.prototype.notifyTaskUpdated = function (taskID, newValues, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskUpdated", taskID, newValues, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyParentTaskUpdated = function (task, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyParentTaskUpdated", task, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyDependencyInserting = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyDependencyInserting", args);
    };
    ModelChangesDispatcher.prototype.notifyDependencyInserted = function (dependency, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyDependencyInserted", dependency, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyDependencyRemoving = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyDependencyRemoving", args);
    };
    ModelChangesDispatcher.prototype.notifyDependencyRemoved = function (dependencyID, errorCallback, dependency) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyDependencyRemoved", dependencyID, errorCallback, dependency);
    };
    ModelChangesDispatcher.prototype.notifyResourceCreating = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceCreating", args);
    };
    ModelChangesDispatcher.prototype.notifyResourceCreated = function (resource, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceCreated", resource, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyResourceRemoving = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceRemoving", args);
    };
    ModelChangesDispatcher.prototype.notifyResourceRemoved = function (resourceID, errorCallback, resource) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceRemoved", resourceID, errorCallback, resource);
    };
    ModelChangesDispatcher.prototype.notifyResourceColorChanged = function (resourceID, newValue, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceColorChanged", resourceID, newValue, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyResourceAssigning = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceAssigning", args);
    };
    ModelChangesDispatcher.prototype.notifyResourceAssigned = function (assignment, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceAssigned", assignment, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyResourceUnassigning = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceUnassigning", args);
    };
    ModelChangesDispatcher.prototype.notifyResourceUnassigned = function (assignmentID, errorCallback, assignment) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceUnassigned", assignmentID, errorCallback, assignment);
    };
    ModelChangesDispatcher.prototype.notifyParentDataRecalculated = function (data) {
        this.onModelChanged.raise("NotifyParentDataRecalculated", data);
    };
    ModelChangesDispatcher.prototype.notifyScaleCellPrepared = function (data) {
        this.onModelChanged.raise("NotifyScaleCellPrepared", data);
    };
    ModelChangesDispatcher.prototype.notifyGanttViewUpdated = function () {
        this.onModelChanged.raise("NotifyGanttViewUpdated");
    };
    ModelChangesDispatcher.prototype.fireResourceUnassigning = function (assignment) {
        var args = new ResourceUnassigningArguments_1.ResourceUnassigningArguments(assignment);
        this.notifyResourceUnassigning(args);
        return !args.cancel;
    };
    ModelChangesDispatcher.prototype.raiseTaskUpdating = function (task, newValues, callback) {
        var args = new TaskUpdatingArguments_1.TaskUpdatingArguments(task, newValues);
        this.notifyTaskUpdating(args);
        if (!args.cancel) {
            callback(args.newValues);
            return true;
        }
        return false;
    };
    ModelChangesDispatcher.prototype.raiseTaskMoving = function (task, newStart, newEnd, callback) {
        var args = new TaskUpdatingArguments_1.TaskUpdatingArguments(task, { start: newStart, end: newEnd });
        this.notifyTaskMoving(args);
        if (!args.cancel) {
            callback(args["start"], args["end"]);
            return true;
        }
        return false;
    };
    ModelChangesDispatcher.prototype.raiseTaskTaskEditDialogShowing = function (params, callback) {
        var args = new TaskEditDialogShowingArguments_1.TaskEditDialogShowingArguments(params);
        this.notifyTaskEditDialogShowing(args);
        if (!args.cancel) {
            callback(args);
            return true;
        }
        return false;
    };
    ModelChangesDispatcher.prototype.raiseResourceManagerDialogShowing = function (params, callback) {
        var args = new ResourceManagerDialogShowingArguments_1.ResourceManagerDialogShowingArguments(params);
        this.notifyResourceManagerDialogShowing(args);
        if (!args.cancel) {
            callback(args);
            return true;
        }
        return false;
    };
    ModelChangesDispatcher.prototype.lock = function () { this.isLocked = true; };
    ModelChangesDispatcher.prototype.unlock = function () { this.isLocked = false; };
    return ModelChangesDispatcher;
}());
exports.ModelChangesDispatcher = ModelChangesDispatcher;


/***/ }),

/***/ 6124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GanttDataObjectNames = exports.DataObject = void 0;
var common_1 = __webpack_require__(2491);
var math_1 = __webpack_require__(8679);
var DataObject = (function () {
    function DataObject() {
        this.internalId = math_1.MathUtils.generateGuid();
    }
    DataObject.prototype.assignFromObject = function (sourceObj) {
        if (!(0, common_1.isDefined)(sourceObj))
            return;
        if ((0, common_1.isDefined)(sourceObj.id))
            this.updateId(sourceObj.id);
    };
    DataObject.prototype.updateId = function (newKey) {
        this.id = newKey;
        this.internalId = String(newKey);
    };
    return DataObject;
}());
exports.DataObject = DataObject;
exports.GanttDataObjectNames = {
    task: "task",
    dependency: "dependency",
    resource: "resource",
    resourceAssignment: "assignment"
};


/***/ }),

/***/ 7352:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Dependency = void 0;
var tslib_1 = __webpack_require__(655);
var common_1 = __webpack_require__(2491);
var DataObject_1 = __webpack_require__(6124);
var Enums_1 = __webpack_require__(5950);
var Dependency = (function (_super) {
    tslib_1.__extends(Dependency, _super);
    function Dependency() {
        var _this = _super.call(this) || this;
        _this.predecessorId = "";
        _this.successorId = "";
        _this.type = null;
        return _this;
    }
    Object.defineProperty(Dependency.prototype, "isStartDependency", {
        get: function () {
            return this.type === Enums_1.DependencyType.SS || this.type === Enums_1.DependencyType.SF;
        },
        enumerable: false,
        configurable: true
    });
    Dependency.prototype.assignFromObject = function (sourceObj) {
        if ((0, common_1.isDefined)(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.predecessorId = String(sourceObj.predecessorId);
            this.successorId = String(sourceObj.successorId);
            this.type = this.parseType(sourceObj.type);
        }
    };
    Dependency.prototype.parseType = function (type) {
        if ((0, common_1.isDefined)(type)) {
            var text = type.toString().toUpperCase();
            switch (text) {
                case "SS":
                case "1":
                    return Enums_1.DependencyType.SS;
                case "FF":
                case "2":
                    return Enums_1.DependencyType.FF;
                case "SF":
                case "3":
                    return Enums_1.DependencyType.SF;
                default: return Enums_1.DependencyType.FS;
            }
        }
        else
            return Enums_1.DependencyType.FS;
    };
    return Dependency;
}(DataObject_1.DataObject));
exports.Dependency = Dependency;


/***/ }),

/***/ 5950:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DependencyType = exports.TaskType = void 0;
var TaskType;
(function (TaskType) {
    TaskType[TaskType["Regular"] = 0] = "Regular";
    TaskType[TaskType["Summary"] = 1] = "Summary";
    TaskType[TaskType["Milestone"] = 2] = "Milestone";
})(TaskType = exports.TaskType || (exports.TaskType = {}));
var DependencyType;
(function (DependencyType) {
    DependencyType[DependencyType["FS"] = 0] = "FS";
    DependencyType[DependencyType["SS"] = 1] = "SS";
    DependencyType[DependencyType["FF"] = 2] = "FF";
    DependencyType[DependencyType["SF"] = 3] = "SF";
})(DependencyType = exports.DependencyType || (exports.DependencyType = {}));


/***/ }),

/***/ 2301:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Resource = void 0;
var tslib_1 = __webpack_require__(655);
var common_1 = __webpack_require__(2491);
var DataObject_1 = __webpack_require__(6124);
var Resource = (function (_super) {
    tslib_1.__extends(Resource, _super);
    function Resource() {
        var _this = _super.call(this) || this;
        _this.text = "";
        _this.color = "";
        return _this;
    }
    Resource.prototype.assignFromObject = function (sourceObj) {
        if ((0, common_1.isDefined)(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.text = sourceObj.text;
            if ((0, common_1.isDefined)(sourceObj.color))
                this.color = sourceObj.color;
        }
    };
    return Resource;
}(DataObject_1.DataObject));
exports.Resource = Resource;


/***/ }),

/***/ 7437:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceAssignment = void 0;
var tslib_1 = __webpack_require__(655);
var common_1 = __webpack_require__(2491);
var DataObject_1 = __webpack_require__(6124);
var ResourceAssignment = (function (_super) {
    tslib_1.__extends(ResourceAssignment, _super);
    function ResourceAssignment() {
        var _this = _super.call(this) || this;
        _this.taskId = "";
        _this.resourceId = "";
        return _this;
    }
    ResourceAssignment.prototype.assignFromObject = function (sourceObj) {
        if ((0, common_1.isDefined)(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.taskId = String(sourceObj.taskId);
            this.resourceId = String(sourceObj.resourceId);
        }
    };
    return ResourceAssignment;
}(DataObject_1.DataObject));
exports.ResourceAssignment = ResourceAssignment;


/***/ }),

/***/ 8492:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Task = void 0;
var tslib_1 = __webpack_require__(655);
var common_1 = __webpack_require__(2491);
var DataObject_1 = __webpack_require__(6124);
var invalidDateMillseconds = -8000000000000000;
var Task = (function (_super) {
    tslib_1.__extends(Task, _super);
    function Task() {
        var _this = _super.call(this) || this;
        _this.start = null;
        _this.end = null;
        _this.duration = null;
        _this.description = "";
        _this.parentId = null;
        _this.title = "";
        _this.owner = null;
        _this.progress = 0;
        _this.taskType = null;
        _this.customFields = {};
        _this.expanded = true;
        _this.color = "";
        return _this;
    }
    Object.defineProperty(Task.prototype, "normalizedProgress", {
        get: function () {
            return Math.max(Math.min(this.progress, 100), 0);
        },
        enumerable: false,
        configurable: true
    });
    Task.prototype.assignFromObject = function (sourceObj) {
        if ((0, common_1.isDefined)(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.owner = sourceObj.owner;
            this.parentId = (0, common_1.isDefined)(sourceObj.parentId) ? String(sourceObj.parentId) : null;
            this.rawParentId = sourceObj.parentId;
            this.description = sourceObj.description;
            this.title = sourceObj.title;
            this.start = typeof sourceObj.start === "string" ? new Date(sourceObj.start) : sourceObj.start || this.createInvalidDate();
            this.end = typeof sourceObj.end === "string" ? new Date(sourceObj.end) : sourceObj.end || this.createInvalidDate();
            this.duration = sourceObj.duration;
            this.progress = sourceObj.progress;
            this.taskType = sourceObj.taskType;
            if ((0, common_1.isDefined)(sourceObj.expanded))
                this.expanded = !!sourceObj.expanded;
            if ((0, common_1.isDefined)(sourceObj.color))
                this.color = sourceObj.color;
            this.assignCustomFields(sourceObj.customFields);
        }
    };
    Task.prototype.assignCustomFields = function (sourceObj) {
        if (!sourceObj)
            return;
        for (var property in sourceObj) {
            if (!Object.prototype.hasOwnProperty.call(sourceObj, property))
                continue;
            this.customFields[property] = sourceObj[property];
        }
    };
    Task.prototype.isMilestone = function () {
        return this.start.getTime() === this.end.getTime();
    };
    Task.prototype.getDuration = function () {
        return this.end.getTime() - this.start.getTime();
    };
    Task.prototype.isValidStart = function () { return this.isValidTaskaDte(this.start); };
    Task.prototype.isValidEnd = function () { return this.isValidTaskaDte(this.end); };
    Task.prototype.isValid = function () {
        return this.isValidStart() && this.isValidEnd();
    };
    Task.prototype.createInvalidDate = function () { return new Date(invalidDateMillseconds); };
    Task.prototype.isValidTaskaDte = function (value) {
        return !!value && value.getTime() !== invalidDateMillseconds;
    };
    return Task;
}(DataObject_1.DataObject));
exports.Task = Task;


/***/ }),

/***/ 8774:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseArguments = void 0;
var BaseArguments = (function () {
    function BaseArguments(key) {
        this.cancel = false;
        this.values = {};
        this.key = key;
    }
    return BaseArguments;
}());
exports.BaseArguments = BaseArguments;


/***/ }),

/***/ 3279:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DependencyInsertingArguments = void 0;
var tslib_1 = __webpack_require__(655);
var BaseArguments_1 = __webpack_require__(8774);
var DependencyInsertingArguments = (function (_super) {
    tslib_1.__extends(DependencyInsertingArguments, _super);
    function DependencyInsertingArguments(predecessorId, successorId, type) {
        var _this = _super.call(this, null) || this;
        _this.values = {
            predecessorId: predecessorId,
            successorId: successorId,
            type: type
        };
        return _this;
    }
    Object.defineProperty(DependencyInsertingArguments.prototype, "predecessorId", {
        get: function () { return this.values.predecessorId; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DependencyInsertingArguments.prototype, "successorId", {
        get: function () { return this.values.successorId; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DependencyInsertingArguments.prototype, "type", {
        get: function () { return this.values.type; },
        enumerable: false,
        configurable: true
    });
    return DependencyInsertingArguments;
}(BaseArguments_1.BaseArguments));
exports.DependencyInsertingArguments = DependencyInsertingArguments;


/***/ }),

/***/ 4797:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DependencyRemovingArguments = void 0;
var tslib_1 = __webpack_require__(655);
var BaseArguments_1 = __webpack_require__(8774);
var DependencyRemovingArguments = (function (_super) {
    tslib_1.__extends(DependencyRemovingArguments, _super);
    function DependencyRemovingArguments(dependency) {
        var _this = _super.call(this, dependency.id) || this;
        _this.values = dependency;
        return _this;
    }
    return DependencyRemovingArguments;
}(BaseArguments_1.BaseArguments));
exports.DependencyRemovingArguments = DependencyRemovingArguments;


/***/ }),

/***/ 255:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceManagerDialogShowingArguments = void 0;
var tslib_1 = __webpack_require__(655);
var BaseArguments_1 = __webpack_require__(8774);
var ResourceManagerDialogShowingArguments = (function (_super) {
    tslib_1.__extends(ResourceManagerDialogShowingArguments, _super);
    function ResourceManagerDialogShowingArguments(params) {
        var _this = _super.call(this, undefined) || this;
        _this.values.resources = params.resources;
        return _this;
    }
    return ResourceManagerDialogShowingArguments;
}(BaseArguments_1.BaseArguments));
exports.ResourceManagerDialogShowingArguments = ResourceManagerDialogShowingArguments;


/***/ }),

/***/ 8403:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskEditDialogShowingArguments = void 0;
var tslib_1 = __webpack_require__(655);
var BaseArguments_1 = __webpack_require__(8774);
var TaskEditDialogShowingArguments = (function (_super) {
    tslib_1.__extends(TaskEditDialogShowingArguments, _super);
    function TaskEditDialogShowingArguments(params) {
        var _this = _super.call(this, params.id) || this;
        _this.values = {
            start: params.start,
            end: params.end,
            title: params.title,
            progress: params.progress
        };
        _this.hiddenFields = params.hiddenFields;
        _this.readOnlyFields = params.readOnlyFields;
        return _this;
    }
    return TaskEditDialogShowingArguments;
}(BaseArguments_1.BaseArguments));
exports.TaskEditDialogShowingArguments = TaskEditDialogShowingArguments;


/***/ }),

/***/ 1389:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceAssigningArguments = void 0;
var tslib_1 = __webpack_require__(655);
var BaseArguments_1 = __webpack_require__(8774);
var ResourceAssigningArguments = (function (_super) {
    tslib_1.__extends(ResourceAssigningArguments, _super);
    function ResourceAssigningArguments(resourceId, taskId) {
        var _this = _super.call(this, null) || this;
        _this.values = {
            resourceId: resourceId,
            taskId: taskId
        };
        return _this;
    }
    Object.defineProperty(ResourceAssigningArguments.prototype, "resourceId", {
        get: function () { return this.values.resourceId; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResourceAssigningArguments.prototype, "taskId", {
        get: function () { return this.values.taskId; },
        enumerable: false,
        configurable: true
    });
    return ResourceAssigningArguments;
}(BaseArguments_1.BaseArguments));
exports.ResourceAssigningArguments = ResourceAssigningArguments;


/***/ }),

/***/ 8738:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceUnassigningArguments = void 0;
var tslib_1 = __webpack_require__(655);
var BaseArguments_1 = __webpack_require__(8774);
var ResourceUnassigningArguments = (function (_super) {
    tslib_1.__extends(ResourceUnassigningArguments, _super);
    function ResourceUnassigningArguments(assignment) {
        var _this = _super.call(this, assignment.internalId) || this;
        _this.values = assignment;
        return _this;
    }
    return ResourceUnassigningArguments;
}(BaseArguments_1.BaseArguments));
exports.ResourceUnassigningArguments = ResourceUnassigningArguments;


/***/ }),

/***/ 990:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceInsertingArguments = void 0;
var tslib_1 = __webpack_require__(655);
var BaseArguments_1 = __webpack_require__(8774);
var ResourceInsertingArguments = (function (_super) {
    tslib_1.__extends(ResourceInsertingArguments, _super);
    function ResourceInsertingArguments(text, color) {
        if (color === void 0) { color = ""; }
        var _this = _super.call(this, null) || this;
        _this.values = {
            text: text,
            color: color
        };
        return _this;
    }
    Object.defineProperty(ResourceInsertingArguments.prototype, "text", {
        get: function () { return this.values.text; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResourceInsertingArguments.prototype, "color", {
        get: function () { return this.values.color; },
        enumerable: false,
        configurable: true
    });
    return ResourceInsertingArguments;
}(BaseArguments_1.BaseArguments));
exports.ResourceInsertingArguments = ResourceInsertingArguments;


/***/ }),

/***/ 9748:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceRemovingArguments = void 0;
var tslib_1 = __webpack_require__(655);
var BaseArguments_1 = __webpack_require__(8774);
var ResourceRemovingArguments = (function (_super) {
    tslib_1.__extends(ResourceRemovingArguments, _super);
    function ResourceRemovingArguments(resource) {
        var _this = _super.call(this, resource.id) || this;
        _this.values = resource;
        return _this;
    }
    return ResourceRemovingArguments;
}(BaseArguments_1.BaseArguments));
exports.ResourceRemovingArguments = ResourceRemovingArguments;


/***/ }),

/***/ 4605:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskInsertingArguments = void 0;
var tslib_1 = __webpack_require__(655);
var BaseArguments_1 = __webpack_require__(8774);
var TaskInsertingArguments = (function (_super) {
    tslib_1.__extends(TaskInsertingArguments, _super);
    function TaskInsertingArguments(key, data) {
        var _this = _super.call(this, key) || this;
        _this.values = data !== null && data !== void 0 ? data : {};
        return _this;
    }
    Object.defineProperty(TaskInsertingArguments.prototype, "start", {
        get: function () { return this.values.start; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskInsertingArguments.prototype, "end", {
        get: function () { return this.values.end; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskInsertingArguments.prototype, "title", {
        get: function () { return this.values.title; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskInsertingArguments.prototype, "progress", {
        get: function () { return this.values.progress; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskInsertingArguments.prototype, "parentId", {
        get: function () { return this.values.parentId; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskInsertingArguments.prototype, "color", {
        get: function () { return this.values.color; },
        enumerable: false,
        configurable: true
    });
    return TaskInsertingArguments;
}(BaseArguments_1.BaseArguments));
exports.TaskInsertingArguments = TaskInsertingArguments;


/***/ }),

/***/ 4642:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskRemovingArguments = void 0;
var tslib_1 = __webpack_require__(655);
var BaseArguments_1 = __webpack_require__(8774);
var TaskRemovingArguments = (function (_super) {
    tslib_1.__extends(TaskRemovingArguments, _super);
    function TaskRemovingArguments(task) {
        var _this = _super.call(this, task.id) || this;
        _this.values = task;
        return _this;
    }
    return TaskRemovingArguments;
}(BaseArguments_1.BaseArguments));
exports.TaskRemovingArguments = TaskRemovingArguments;


/***/ }),

/***/ 9669:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskUpdatingArguments = void 0;
var tslib_1 = __webpack_require__(655);
var BaseArguments_1 = __webpack_require__(8774);
var TaskUpdatingArguments = (function (_super) {
    tslib_1.__extends(TaskUpdatingArguments, _super);
    function TaskUpdatingArguments(task, newValues) {
        var _this = _super.call(this, task.id) || this;
        _this.values = task;
        _this.createNewValues(newValues);
        return _this;
    }
    TaskUpdatingArguments.prototype.createNewValues = function (newValues) {
        var _this = this;
        this.newValues = {};
        var _loop_1 = function (key) {
            if (Object.prototype.hasOwnProperty.call(newValues, key)) {
                this_1.newValues[key] = newValues[key];
                Object.defineProperty(this_1, key, {
                    get: function () { return _this.newValues[key]; }
                });
            }
        };
        var this_1 = this;
        for (var key in newValues) {
            _loop_1(key);
        }
    };
    return TaskUpdatingArguments;
}(BaseArguments_1.BaseArguments));
exports.TaskUpdatingArguments = TaskUpdatingArguments;


/***/ }),

/***/ 8725:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.History = void 0;
var HistoryItemInfo_1 = __webpack_require__(5221);
var CompositionHistoryItem_1 = __webpack_require__(9751);
var History = (function () {
    function History(listener) {
        this.historyItems = [];
        this.currentIndex = -1;
        this.currentProcessingItemInfo = null;
        this.transaction = null;
        this.transactionLevel = -1;
        this._listener = listener;
    }
    History.prototype.undo = function () {
        if (this.canUndo()) {
            this.activateItem(this.historyItems[this.currentIndex], true);
            this.currentIndex--;
        }
    };
    History.prototype.redo = function () {
        if (this.canRedo()) {
            this.currentIndex++;
            this.activateItem(this.historyItems[this.currentIndex]);
        }
    };
    History.prototype.beginTransaction = function () {
        var _a;
        this.transactionLevel++;
        if (this.transactionLevel == 0) {
            this.transaction = new CompositionHistoryItem_1.CompositionHistoryItem();
            (_a = this._listener) === null || _a === void 0 ? void 0 : _a.onTransactionStart();
        }
    };
    History.prototype.endTransaction = function () {
        var _a;
        if (--this.transactionLevel >= 0)
            return;
        var transactionLength = this.transaction.historyItems.length;
        if (transactionLength > 1)
            this.addInternal(this.transaction);
        else if (transactionLength == 1)
            this.addInternal(this.transaction.historyItems.pop());
        this.transaction = null;
        (_a = this._listener) === null || _a === void 0 ? void 0 : _a.onTransactionEnd();
    };
    History.prototype.addAndRedo = function (historyItem) {
        this.add(historyItem);
        this.activateItem(historyItem);
    };
    History.prototype.add = function (historyItem) {
        if (this.transactionLevel >= 0)
            this.transaction.add(historyItem);
        else
            this.addInternal(historyItem);
    };
    History.prototype.canUndo = function () {
        return this.currentIndex >= 0;
    };
    History.prototype.canRedo = function () {
        return this.currentIndex < this.historyItems.length - 1;
    };
    History.prototype.addInternal = function (historyItem) {
        if (this.currentIndex < this.historyItems.length - 1)
            this.historyItems.splice(this.currentIndex + 1);
        this.historyItems.push(historyItem);
        this.currentIndex++;
        this.deleteOldItems();
    };
    History.prototype.deleteOldItems = function () {
        var exceedItemsCount = this.historyItems.length - History.MAX_HISTORY_ITEM_COUNT;
        if (exceedItemsCount > 0 && this.currentIndex > exceedItemsCount) {
            this.historyItems.splice(0, exceedItemsCount);
            this.currentIndex -= exceedItemsCount;
        }
    };
    History.prototype.clear = function () {
        this.currentIndex = -1;
        this.historyItems = [];
    };
    History.prototype.activateItem = function (historyItem, isUndo) {
        if (isUndo === void 0) { isUndo = false; }
        this.currentProcessingItemInfo = new HistoryItemInfo_1.HistoryItemInfo(historyItem, isUndo);
        if (isUndo)
            historyItem.undo();
        else
            historyItem.redo();
        this.currentProcessingItemInfo = null;
    };
    History.prototype.getCurrentProcessingItemInfo = function () {
        return this.currentProcessingItemInfo;
    };
    History.prototype.rollBackAndRemove = function (info) {
        var item = info.item;
        if (!this.checkAndRemoveItem(item))
            return;
        if (info.isUndo)
            item.redo();
        else if (item instanceof CompositionHistoryItem_1.CompositionHistoryItem)
            item.undoItemsQuery();
        else
            item.undo();
    };
    History.prototype.checkAndRemoveItem = function (item) {
        var index = this.historyItems.indexOf(item);
        if (index > -1) {
            this.historyItems.splice(index, 1);
            this.currentIndex--;
        }
        else if (this.transaction) {
            index = this.transaction.historyItems.indexOf(item);
            if (index > -1)
                this.transaction.historyItems.splice(index, 1);
        }
        return index > -1;
    };
    History.prototype.updateObsoleteInsertedKey = function (oldKey, newKey, type) {
        if (this.transaction)
            this.updateItemsObsoleteInsertedKey(oldKey, newKey, type, [this.transaction]);
        this.updateItemsObsoleteInsertedKey(oldKey, newKey, type, this.historyItems);
    };
    History.prototype.updateItemsObsoleteInsertedKey = function (oldKey, newKey, type, historyItems) {
        if (historyItems)
            for (var i = 0; i < historyItems.length; i++) {
                var item = historyItems[i];
                var keyUpdaters = item.keyUpdaters.filter(function (k) { return k.getKey() === oldKey && k.objectType === type; });
                keyUpdaters.forEach(function (k) { return k.updateKey(newKey); });
                if (item instanceof CompositionHistoryItem_1.CompositionHistoryItem)
                    this.updateItemsObsoleteInsertedKey(oldKey, newKey, type, item.historyItems);
            }
    };
    History.MAX_HISTORY_ITEM_COUNT = 100;
    return History;
}());
exports.History = History;


/***/ }),

/***/ 9751:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompositionHistoryItem = void 0;
var tslib_1 = __webpack_require__(655);
var HistoryItem_1 = __webpack_require__(7917);
var CompositionHistoryItem = (function (_super) {
    tslib_1.__extends(CompositionHistoryItem, _super);
    function CompositionHistoryItem() {
        var _this = _super.call(this, null) || this;
        _this.historyItems = [];
        return _this;
    }
    CompositionHistoryItem.prototype.redo = function () {
        var item;
        for (var i = 0; item = this.historyItems[i]; i++)
            item.redo();
    };
    CompositionHistoryItem.prototype.undo = function () {
        var item;
        for (var i = this.historyItems.length - 1; item = this.historyItems[i]; i--)
            item.undo();
    };
    CompositionHistoryItem.prototype.add = function (historyItem) {
        if (historyItem == null)
            throw new Error("Can't add null HistoryItem");
        this.historyItems.push(historyItem);
    };
    CompositionHistoryItem.prototype.undoItemsQuery = function () {
        this.undo();
    };
    CompositionHistoryItem.prototype.setModelManipulator = function (modelManipulator) {
        _super.prototype.setModelManipulator.call(this, modelManipulator);
        if (this.historyItems)
            for (var i = 0; i < this.historyItems.length; i++)
                this.historyItems[i].setModelManipulator(modelManipulator);
    };
    return CompositionHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.CompositionHistoryItem = CompositionHistoryItem;


/***/ }),

/***/ 1211:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsertDependencyHistoryItem = void 0;
var tslib_1 = __webpack_require__(655);
var math_1 = __webpack_require__(8679);
var DataObject_1 = __webpack_require__(6124);
var HistoryItem_1 = __webpack_require__(7917);
var InsertDependencyHistoryItem = (function (_super) {
    tslib_1.__extends(InsertDependencyHistoryItem, _super);
    function InsertDependencyHistoryItem(modelManipulator, predecessorId, successorId, type) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.predecessorId = predecessorId;
        _this.successorId = successorId;
        _this.type = type;
        return _this;
    }
    InsertDependencyHistoryItem.prototype.redo = function () {
        var _a;
        (_a = this.insertedKey) !== null && _a !== void 0 ? _a : (this.insertedKey = math_1.MathUtils.generateGuid());
        this.modelManipulator.dependency.insertDependency(this.predecessorId, this.successorId, this.type, this.insertedKey);
    };
    InsertDependencyHistoryItem.prototype.undo = function () {
        this.modelManipulator.dependency.removeDependency(this.insertedKey);
    };
    Object.defineProperty(InsertDependencyHistoryItem.prototype, "keyUpdaters", {
        get: function () {
            var _this = this;
            return [
                {
                    objectType: DataObject_1.GanttDataObjectNames.dependency,
                    getKey: function () { return _this.insertedKey; },
                    updateKey: function (value) { return _this.insertedKey = value; }
                },
                {
                    objectType: DataObject_1.GanttDataObjectNames.task,
                    getKey: function () { return _this.predecessorId; },
                    updateKey: function (value) { return _this.predecessorId = value; }
                },
                {
                    objectType: DataObject_1.GanttDataObjectNames.task,
                    getKey: function () { return _this.successorId; },
                    updateKey: function (value) { return _this.successorId = value; }
                }
            ];
        },
        enumerable: false,
        configurable: true
    });
    return InsertDependencyHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.InsertDependencyHistoryItem = InsertDependencyHistoryItem;


/***/ }),

/***/ 5865:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveDependencyHistoryItem = void 0;
var tslib_1 = __webpack_require__(655);
var DataObject_1 = __webpack_require__(6124);
var HistoryItem_1 = __webpack_require__(7917);
var RemoveDependencyHistoryItem = (function (_super) {
    tslib_1.__extends(RemoveDependencyHistoryItem, _super);
    function RemoveDependencyHistoryItem(modelManipulator, dependencyId) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.dependencyId = dependencyId;
        return _this;
    }
    RemoveDependencyHistoryItem.prototype.redo = function () {
        this.dependency = this.modelManipulator.dependency.removeDependency(this.dependencyId);
    };
    RemoveDependencyHistoryItem.prototype.undo = function () {
        this.modelManipulator.dependency.insertDependency(this.dependency.predecessorId, this.dependency.successorId, this.dependency.type, this.dependencyId);
    };
    Object.defineProperty(RemoveDependencyHistoryItem.prototype, "keyUpdaters", {
        get: function () {
            var _this = this;
            return [
                {
                    objectType: DataObject_1.GanttDataObjectNames.dependency,
                    getKey: function () { return _this.dependencyId; },
                    updateKey: function (value) { return _this.dependencyId = value; }
                },
                {
                    objectType: DataObject_1.GanttDataObjectNames.task,
                    getKey: function () { var _a; return (_a = _this.dependency) === null || _a === void 0 ? void 0 : _a.predecessorId; },
                    updateKey: function (value) { return _this.dependency.predecessorId = value; }
                },
                {
                    objectType: DataObject_1.GanttDataObjectNames.task,
                    getKey: function () { var _a; return (_a = _this.dependency) === null || _a === void 0 ? void 0 : _a.successorId; },
                    updateKey: function (value) { return _this.dependency.successorId = value; }
                }
            ];
        },
        enumerable: false,
        configurable: true
    });
    return RemoveDependencyHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.RemoveDependencyHistoryItem = RemoveDependencyHistoryItem;


/***/ }),

/***/ 7917:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HistoryItem = void 0;
var HistoryItem = (function () {
    function HistoryItem(modelManipulator) {
        this.setModelManipulator(modelManipulator);
    }
    HistoryItem.prototype.setModelManipulator = function (modelManipulator) {
        this.modelManipulator = modelManipulator;
    };
    Object.defineProperty(HistoryItem.prototype, "keyUpdaters", {
        get: function () { return []; },
        enumerable: false,
        configurable: true
    });
    return HistoryItem;
}());
exports.HistoryItem = HistoryItem;


/***/ }),

/***/ 5221:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HistoryItemInfo = void 0;
var HistoryItemInfo = (function () {
    function HistoryItemInfo(item, isUndo) {
        if (isUndo === void 0) { isUndo = false; }
        this.item = item;
        this.isUndo = isUndo;
    }
    return HistoryItemInfo;
}());
exports.HistoryItemInfo = HistoryItemInfo;


/***/ }),

/***/ 3064:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HistoryItemState = void 0;
var HistoryItemState = (function () {
    function HistoryItemState(id, value) {
        this.id = id;
        this.value = value;
    }
    return HistoryItemState;
}());
exports.HistoryItemState = HistoryItemState;


/***/ }),

/***/ 3683:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssignResourceHistoryItem = void 0;
var tslib_1 = __webpack_require__(655);
var HistoryItem_1 = __webpack_require__(7917);
var DataObject_1 = __webpack_require__(6124);
var math_1 = __webpack_require__(8679);
var AssignResourceHistoryItem = (function (_super) {
    tslib_1.__extends(AssignResourceHistoryItem, _super);
    function AssignResourceHistoryItem(modelManipulator, resourceId, taskId) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.resourceId = resourceId;
        _this.taskId = taskId;
        return _this;
    }
    AssignResourceHistoryItem.prototype.redo = function () {
        var _a;
        (_a = this.insertedKey) !== null && _a !== void 0 ? _a : (this.insertedKey = math_1.MathUtils.generateGuid());
        this.modelManipulator.resource.assign(this.resourceId, this.taskId, this.insertedKey);
    };
    AssignResourceHistoryItem.prototype.undo = function () {
        this.modelManipulator.resource.deassig(this.insertedKey);
    };
    Object.defineProperty(AssignResourceHistoryItem.prototype, "keyUpdaters", {
        get: function () {
            var _this = this;
            return [
                {
                    objectType: DataObject_1.GanttDataObjectNames.resourceAssignment,
                    getKey: function () { return _this.insertedKey; },
                    updateKey: function (value) { return _this.insertedKey = value; }
                },
                {
                    objectType: DataObject_1.GanttDataObjectNames.task,
                    getKey: function () { return _this.taskId; },
                    updateKey: function (value) { return _this.taskId = value; }
                },
                {
                    objectType: DataObject_1.GanttDataObjectNames.resource,
                    getKey: function () { return _this.resourceId; },
                    updateKey: function (value) { return _this.resourceId = value; }
                }
            ];
        },
        enumerable: false,
        configurable: true
    });
    return AssignResourceHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.AssignResourceHistoryItem = AssignResourceHistoryItem;


/***/ }),

/***/ 1493:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeassignResourceHistoryItem = void 0;
var tslib_1 = __webpack_require__(655);
var HistoryItem_1 = __webpack_require__(7917);
var DataObject_1 = __webpack_require__(6124);
var DeassignResourceHistoryItem = (function (_super) {
    tslib_1.__extends(DeassignResourceHistoryItem, _super);
    function DeassignResourceHistoryItem(modelManipulator, assignmentId) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.assignmentId = assignmentId;
        return _this;
    }
    DeassignResourceHistoryItem.prototype.redo = function () {
        this.assignment = this.modelManipulator.resource.deassig(this.assignmentId);
    };
    DeassignResourceHistoryItem.prototype.undo = function () {
        this.modelManipulator.resource.assign(this.assignment.resourceId, this.assignment.taskId, this.assignmentId);
    };
    Object.defineProperty(DeassignResourceHistoryItem.prototype, "keyUpdaters", {
        get: function () {
            var _this = this;
            return [
                {
                    objectType: DataObject_1.GanttDataObjectNames.resourceAssignment,
                    getKey: function () { return _this.assignmentId; },
                    updateKey: function (value) { return _this.assignmentId = value; }
                },
                {
                    objectType: DataObject_1.GanttDataObjectNames.task,
                    getKey: function () { var _a; return (_a = _this.assignment) === null || _a === void 0 ? void 0 : _a.taskId; },
                    updateKey: function (value) { return _this.assignment.taskId = value; }
                },
                {
                    objectType: DataObject_1.GanttDataObjectNames.resource,
                    getKey: function () { var _a; return (_a = _this.assignment) === null || _a === void 0 ? void 0 : _a.resourceId; },
                    updateKey: function (value) { return _this.assignment.resourceId = value; }
                }
            ];
        },
        enumerable: false,
        configurable: true
    });
    return DeassignResourceHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.DeassignResourceHistoryItem = DeassignResourceHistoryItem;


/***/ }),

/***/ 2961:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateResourceHistoryItem = void 0;
var tslib_1 = __webpack_require__(655);
var HistoryItem_1 = __webpack_require__(7917);
var DataObject_1 = __webpack_require__(6124);
var math_1 = __webpack_require__(8679);
var CreateResourceHistoryItem = (function (_super) {
    tslib_1.__extends(CreateResourceHistoryItem, _super);
    function CreateResourceHistoryItem(modelManipulator, text, color, callback) {
        if (color === void 0) { color = ""; }
        var _this = _super.call(this, modelManipulator) || this;
        _this.text = text;
        _this.color = color;
        _this.createCallback = callback;
        return _this;
    }
    CreateResourceHistoryItem.prototype.redo = function () {
        var _a;
        (_a = this.insertedKey) !== null && _a !== void 0 ? _a : (this.insertedKey = math_1.MathUtils.generateGuid());
        this.modelManipulator.resource.create(this.text, this.color, this.insertedKey, this.createCallback);
    };
    CreateResourceHistoryItem.prototype.undo = function () {
        this.modelManipulator.resource.remove(this.insertedKey);
    };
    Object.defineProperty(CreateResourceHistoryItem.prototype, "keyUpdaters", {
        get: function () {
            var _this = this;
            return [
                {
                    objectType: DataObject_1.GanttDataObjectNames.resource,
                    getKey: function () { return _this.insertedKey; },
                    updateKey: function (value) { return _this.insertedKey = value; }
                }
            ];
        },
        enumerable: false,
        configurable: true
    });
    return CreateResourceHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.CreateResourceHistoryItem = CreateResourceHistoryItem;


/***/ }),

/***/ 4641:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceColorHistoryItem = void 0;
var tslib_1 = __webpack_require__(655);
var ResourcePropertiesHistoryItemBase_1 = __webpack_require__(7049);
var ResourceColorHistoryItem = (function (_super) {
    tslib_1.__extends(ResourceColorHistoryItem, _super);
    function ResourceColorHistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceColorHistoryItem.prototype.getPropertiesManipulator = function () {
        return this.modelManipulator.resource.properties.color;
    };
    return ResourceColorHistoryItem;
}(ResourcePropertiesHistoryItemBase_1.ResourcePropertiesHistoryItemBase));
exports.ResourceColorHistoryItem = ResourceColorHistoryItem;


/***/ }),

/***/ 7049:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourcePropertiesHistoryItemBase = void 0;
var tslib_1 = __webpack_require__(655);
var DataObject_1 = __webpack_require__(6124);
var HistoryItem_1 = __webpack_require__(7917);
var ResourcePropertiesHistoryItemBase = (function (_super) {
    tslib_1.__extends(ResourcePropertiesHistoryItemBase, _super);
    function ResourcePropertiesHistoryItemBase(modelManipulator, resourceId, newValue) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.resourceId = resourceId;
        _this.newValue = newValue;
        return _this;
    }
    ResourcePropertiesHistoryItemBase.prototype.redo = function () {
        this.oldState = this.getPropertiesManipulator().setValue(this.resourceId, this.newValue);
    };
    ResourcePropertiesHistoryItemBase.prototype.undo = function () {
        this.getPropertiesManipulator().restoreValue(this.oldState);
    };
    ResourcePropertiesHistoryItemBase.prototype.getPropertiesManipulator = function () {
        throw new Error("Not Implemented");
    };
    Object.defineProperty(ResourcePropertiesHistoryItemBase.prototype, "keyUpdaters", {
        get: function () {
            var _this = this;
            return [
                {
                    objectType: DataObject_1.GanttDataObjectNames.resource,
                    getKey: function () { return _this.resourceId; },
                    updateKey: function (value) { return _this.resourceId = value; }
                }
            ];
        },
        enumerable: false,
        configurable: true
    });
    return ResourcePropertiesHistoryItemBase;
}(HistoryItem_1.HistoryItem));
exports.ResourcePropertiesHistoryItemBase = ResourcePropertiesHistoryItemBase;


/***/ }),

/***/ 7466:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveResourceHistoryItem = void 0;
var tslib_1 = __webpack_require__(655);
var CompositionHistoryItem_1 = __webpack_require__(9751);
var DataObject_1 = __webpack_require__(6124);
var RemoveResourceHistoryItem = (function (_super) {
    tslib_1.__extends(RemoveResourceHistoryItem, _super);
    function RemoveResourceHistoryItem(modelManipulator, resourceId) {
        var _this = _super.call(this) || this;
        _this.modelManipulator = modelManipulator;
        _this.resourceId = resourceId;
        return _this;
    }
    RemoveResourceHistoryItem.prototype.redo = function () {
        _super.prototype.redo.call(this);
        this.resource = this.modelManipulator.resource.remove(this.resourceId);
    };
    RemoveResourceHistoryItem.prototype.undo = function () {
        var _this = this;
        this.modelManipulator.resource.create(this.resource.text, this.resource.color, this.resourceId, function () {
            if (_this.resource.color)
                _this.modelManipulator.resource.properties.color.setValue(_this.resource.internalId, _this.resource.color);
            window.setTimeout(function () { return _super.prototype.undo.call(_this); }, 0);
        });
    };
    RemoveResourceHistoryItem.prototype.undoItemsQuery = function () {
        this.modelManipulator.resource.create(this.resource.text, this.resource.color, this.resourceId, function () { });
        if (this.resource.color)
            this.modelManipulator.resource.properties.color.setValue(this.resource.internalId, this.resource.color);
        _super.prototype.undo.call(this);
    };
    Object.defineProperty(RemoveResourceHistoryItem.prototype, "keyUpdaters", {
        get: function () {
            var _this = this;
            return [
                {
                    objectType: DataObject_1.GanttDataObjectNames.resource,
                    getKey: function () { return _this.resourceId; },
                    updateKey: function (value) { return _this.resourceId = value; }
                }
            ];
        },
        enumerable: false,
        configurable: true
    });
    return RemoveResourceHistoryItem;
}(CompositionHistoryItem_1.CompositionHistoryItem));
exports.RemoveResourceHistoryItem = RemoveResourceHistoryItem;


/***/ }),

/***/ 1284:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTaskHistoryItem = void 0;
var tslib_1 = __webpack_require__(655);
var math_1 = __webpack_require__(8679);
var DataObject_1 = __webpack_require__(6124);
var HistoryItem_1 = __webpack_require__(7917);
var CreateTaskHistoryItem = (function (_super) {
    tslib_1.__extends(CreateTaskHistoryItem, _super);
    function CreateTaskHistoryItem(modelManipulator, data) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.data = data;
        return _this;
    }
    CreateTaskHistoryItem.prototype.redo = function () {
        var _a;
        (_a = this.insertedKey) !== null && _a !== void 0 ? _a : (this.insertedKey = math_1.MathUtils.generateGuid());
        this.modelManipulator.task.create(this.data, this.insertedKey);
    };
    CreateTaskHistoryItem.prototype.undo = function () {
        this.modelManipulator.task.remove(this.insertedKey);
    };
    Object.defineProperty(CreateTaskHistoryItem.prototype, "keyUpdaters", {
        get: function () {
            var _this = this;
            var _a;
            var result = [
                {
                    objectType: DataObject_1.GanttDataObjectNames.task,
                    getKey: function () { return _this.insertedKey; },
                    updateKey: function (value) { return _this.insertedKey = value; }
                }
            ];
            if ((_a = this.data) === null || _a === void 0 ? void 0 : _a.parentId)
                result.push({
                    objectType: DataObject_1.GanttDataObjectNames.task,
                    getKey: function () { var _a; return (_a = _this.data) === null || _a === void 0 ? void 0 : _a.parentId; },
                    updateKey: function (value) { return _this.data.parentId = value; }
                });
            return result;
        },
        enumerable: false,
        configurable: true
    });
    return CreateTaskHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.CreateTaskHistoryItem = CreateTaskHistoryItem;


/***/ }),

/***/ 9599:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveTaskHistoryItem = void 0;
var tslib_1 = __webpack_require__(655);
var DataObject_1 = __webpack_require__(6124);
var CompositionHistoryItem_1 = __webpack_require__(9751);
var RemoveTaskHistoryItem = (function (_super) {
    tslib_1.__extends(RemoveTaskHistoryItem, _super);
    function RemoveTaskHistoryItem(modelManipulator, taskId) {
        var _this = _super.call(this) || this;
        _this.modelManipulator = modelManipulator;
        _this.taskId = taskId;
        return _this;
    }
    RemoveTaskHistoryItem.prototype.redo = function () {
        _super.prototype.redo.call(this);
        this.task = this.modelManipulator.task.remove(this.taskId);
    };
    RemoveTaskHistoryItem.prototype.undo = function () {
        var _this = this;
        this.modelManipulator.task.create(this.task, this.taskId, function () {
            window.setTimeout(function () { return _super.prototype.undo.call(_this); }, 0);
        });
    };
    RemoveTaskHistoryItem.prototype.undoItemsQuery = function () {
        this.modelManipulator.task.create(this.task, this.taskId);
        var item;
        for (var i = this.historyItems.length - 1; item = this.historyItems[i]; i--)
            if (item instanceof CompositionHistoryItem_1.CompositionHistoryItem)
                item.undoItemsQuery();
            else
                item.undo();
    };
    Object.defineProperty(RemoveTaskHistoryItem.prototype, "keyUpdaters", {
        get: function () {
            var _this = this;
            return [
                {
                    objectType: DataObject_1.GanttDataObjectNames.task,
                    getKey: function () { return _this.taskId; },
                    updateKey: function (value) { return _this.taskId = value; }
                },
                {
                    objectType: DataObject_1.GanttDataObjectNames.task,
                    getKey: function () { var _a; return (_a = _this.task) === null || _a === void 0 ? void 0 : _a.parentId; },
                    updateKey: function (value) { return _this.task.parentId = value; }
                }
            ];
        },
        enumerable: false,
        configurable: true
    });
    return RemoveTaskHistoryItem;
}(CompositionHistoryItem_1.CompositionHistoryItem));
exports.RemoveTaskHistoryItem = RemoveTaskHistoryItem;


/***/ }),

/***/ 9496:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTaskHistoryItem = void 0;
var tslib_1 = __webpack_require__(655);
var DataObject_1 = __webpack_require__(6124);
var HistoryItem_1 = __webpack_require__(7917);
var HistoryItemState_1 = __webpack_require__(3064);
var UpdateTaskHistoryItem = (function (_super) {
    tslib_1.__extends(UpdateTaskHistoryItem, _super);
    function UpdateTaskHistoryItem(modelManipulator, taskId, newValues) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.taskId = taskId;
        _this.newValues = newValues;
        return _this;
    }
    UpdateTaskHistoryItem.prototype.redo = function () {
        var oldTaskState = this.modelManipulator.task.update(this.taskId, this.newValues);
        this.oldState = new HistoryItemState_1.HistoryItemState(this.taskId, oldTaskState);
    };
    UpdateTaskHistoryItem.prototype.undo = function () {
        this.modelManipulator.task.update(this.taskId, this.oldState.value);
    };
    Object.defineProperty(UpdateTaskHistoryItem.prototype, "keyUpdaters", {
        get: function () {
            var _this = this;
            return [
                {
                    objectType: DataObject_1.GanttDataObjectNames.task,
                    getKey: function () { return _this.taskId; },
                    updateKey: function (value) { return _this.taskId = value; }
                }
            ];
        },
        enumerable: false,
        configurable: true
    });
    return UpdateTaskHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.UpdateTaskHistoryItem = UpdateTaskHistoryItem;


/***/ }),

/***/ 6382:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseManipulator = void 0;
var BaseManipulator = (function () {
    function BaseManipulator(viewModel, dispatcher) {
        this.viewModel = viewModel;
        this.dispatcher = dispatcher;
    }
    BaseManipulator.prototype.getErrorCallback = function () {
        return this.viewModel.getDataUpdateErrorCallback();
    };
    Object.defineProperty(BaseManipulator.prototype, "renderHelper", {
        get: function () {
            return this.viewModel.owner.renderHelper;
        },
        enumerable: false,
        configurable: true
    });
    return BaseManipulator;
}());
exports.BaseManipulator = BaseManipulator;


/***/ }),

/***/ 1178:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskDependencyManipulator = void 0;
var tslib_1 = __webpack_require__(655);
var DataObject_1 = __webpack_require__(6124);
var BaseManipulator_1 = __webpack_require__(6382);
var TaskDependencyManipulator = (function (_super) {
    tslib_1.__extends(TaskDependencyManipulator, _super);
    function TaskDependencyManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskDependencyManipulator.prototype.insertDependency = function (predecessorId, successorId, type, id) {
        var viewModel = this.viewModel;
        viewModel.onBeginDataObjectCreate();
        var dependency = viewModel.dependencies.createItem();
        dependency.predecessorId = predecessorId;
        dependency.successorId = successorId;
        dependency.type = type;
        if (id)
            dependency.internalId = id;
        dependency.id = dependency.internalId;
        viewModel.dependencies.add(dependency);
        var callback = function (newKey) {
            var oldKey = dependency.internalId;
            dependency.updateId(newKey);
            viewModel.processServerInsertedKey(oldKey, dependency.internalId, DataObject_1.GanttDataObjectNames.dependency);
        };
        viewModel.updateVisibleItemDependencies();
        this.renderHelper.recreateConnectorLineElement(dependency.internalId, true);
        this.dispatcher.notifyDependencyInserted(this.getObjectForDataSource(dependency), callback, this.getErrorCallback());
        viewModel.onEndDataObjectCreate();
        return dependency;
    };
    TaskDependencyManipulator.prototype.removeDependency = function (dependencyId) {
        var dependency = this.viewModel.dependencies.getItemById(dependencyId);
        this.viewModel.dependencies.remove(dependency);
        this.dispatcher.notifyDependencyRemoved(dependency.id, this.getErrorCallback(), this.viewModel.getDependencyObjectForDataSource(dependency));
        this.viewModel.updateVisibleItemDependencies();
        this.renderHelper.recreateConnectorLineElement(dependency.internalId);
        return dependency;
    };
    TaskDependencyManipulator.prototype.getObjectForDataSource = function (dependency) {
        var predecessor = this.viewModel.tasks.getItemById(dependency.predecessorId);
        var successor = this.viewModel.tasks.getItemById(dependency.successorId);
        var dependencyObject = {
            id: dependency.id,
            predecessorId: predecessor.id,
            successorId: successor.id,
            type: dependency.type
        };
        return dependencyObject;
    };
    return TaskDependencyManipulator;
}(BaseManipulator_1.BaseManipulator));
exports.TaskDependencyManipulator = TaskDependencyManipulator;


/***/ }),

/***/ 9650:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelManipulator = void 0;
var DependencyManipulator_1 = __webpack_require__(1178);
var ResourcesManipulator_1 = __webpack_require__(7518);
var TaskManipulator_1 = __webpack_require__(728);
var ModelManipulator = (function () {
    function ModelManipulator(viewModel, dispatcher) {
        this.task = new TaskManipulator_1.TaskManipulator(viewModel, dispatcher);
        this.dependency = new DependencyManipulator_1.TaskDependencyManipulator(viewModel, dispatcher);
        this.resource = new ResourcesManipulator_1.ResourcesManipulator(viewModel, dispatcher);
        this.dispatcher = dispatcher;
    }
    return ModelManipulator;
}());
exports.ModelManipulator = ModelManipulator;


/***/ }),

/***/ 4596:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceColorManipulator = void 0;
var tslib_1 = __webpack_require__(655);
var ResourcePropertyManipulator_1 = __webpack_require__(7470);
var ResourceColorManipulator = (function (_super) {
    tslib_1.__extends(ResourceColorManipulator, _super);
    function ResourceColorManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceColorManipulator.prototype.getPropertyValue = function (resource) {
        return resource.color;
    };
    ResourceColorManipulator.prototype.setPropertyValue = function (resource, value) {
        resource.color = value;
        this.dispatcher.notifyResourceColorChanged(resource.id, value, this.getErrorCallback());
    };
    return ResourceColorManipulator;
}(ResourcePropertyManipulator_1.ResourcePropertyManipulator));
exports.ResourceColorManipulator = ResourceColorManipulator;


/***/ }),

/***/ 79:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourcePropertiesManipulator = void 0;
var tslib_1 = __webpack_require__(655);
var BaseManipulator_1 = __webpack_require__(6382);
var ResourceColorManipulator_1 = __webpack_require__(4596);
var ResourcePropertiesManipulator = (function (_super) {
    tslib_1.__extends(ResourcePropertiesManipulator, _super);
    function ResourcePropertiesManipulator(viewModel, dispatcher) {
        var _this = _super.call(this, viewModel, dispatcher) || this;
        _this.color = new ResourceColorManipulator_1.ResourceColorManipulator(viewModel, dispatcher);
        return _this;
    }
    return ResourcePropertiesManipulator;
}(BaseManipulator_1.BaseManipulator));
exports.ResourcePropertiesManipulator = ResourcePropertiesManipulator;


/***/ }),

/***/ 7470:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourcePropertyManipulator = void 0;
var tslib_1 = __webpack_require__(655);
var HistoryItemState_1 = __webpack_require__(3064);
var BaseManipulator_1 = __webpack_require__(6382);
var ResourcePropertyManipulator = (function (_super) {
    tslib_1.__extends(ResourcePropertyManipulator, _super);
    function ResourcePropertyManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourcePropertyManipulator.prototype.setValue = function (id, newValue) {
        var _this = this;
        var resource = this.viewModel.resources.getItemById(id);
        var oldState = new HistoryItemState_1.HistoryItemState(id, this.getPropertyValue(resource));
        this.setPropertyValue(resource, newValue);
        var assignments = this.viewModel.assignments.items.filter(function (a) { return a.resourceId === resource.internalId; });
        assignments.forEach(function (a) {
            var viewItem = _this.viewModel.findItem(a.taskId);
            var index = viewItem.visibleIndex;
            _this.renderHelper.recreateTaskElement(index);
        });
        return oldState;
    };
    ResourcePropertyManipulator.prototype.restoreValue = function (state) {
        var _this = this;
        if (!state)
            return;
        var stateValue = state.value;
        var resource = this.viewModel.resources.getItemById(state.id);
        this.setPropertyValue(resource, stateValue);
        var assignments = this.viewModel.assignments.items.filter(function (a) { return a.resourceId === resource.internalId; });
        assignments.forEach(function (a) {
            var viewItem = _this.viewModel.findItem(a.taskId);
            var index = viewItem.visibleIndex;
            _this.renderHelper.recreateTaskElement(index);
        });
    };
    return ResourcePropertyManipulator;
}(BaseManipulator_1.BaseManipulator));
exports.ResourcePropertyManipulator = ResourcePropertyManipulator;


/***/ }),

/***/ 7518:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourcesManipulator = void 0;
var tslib_1 = __webpack_require__(655);
var DataObject_1 = __webpack_require__(6124);
var BaseManipulator_1 = __webpack_require__(6382);
var ResourcePropertiesManipulator_1 = __webpack_require__(79);
var ResourcesManipulator = (function (_super) {
    tslib_1.__extends(ResourcesManipulator, _super);
    function ResourcesManipulator(viewModel, dispatcher) {
        var _this = _super.call(this, viewModel, dispatcher) || this;
        _this.properties = new ResourcePropertiesManipulator_1.ResourcePropertiesManipulator(viewModel, dispatcher);
        return _this;
    }
    ResourcesManipulator.prototype.create = function (text, color, id, callback) {
        var viewModel = this.viewModel;
        viewModel.onBeginDataObjectCreate();
        var resource = viewModel.resources.createItem();
        resource.text = text;
        if (color)
            resource.color = color;
        if (id)
            resource.internalId = id;
        resource.id = resource.internalId;
        this.viewModel.resources.add(resource);
        this.dispatcher.notifyResourceCreated(this.getResourceObjectForDataSource(resource), function (id) {
            var oldKey = resource.internalId;
            resource.updateId(id);
            viewModel.processServerInsertedKey(oldKey, resource.internalId, DataObject_1.GanttDataObjectNames.resource);
            if (callback)
                callback(id);
        }, this.getErrorCallback());
        viewModel.onEndDataObjectCreate();
        return resource;
    };
    ResourcesManipulator.prototype.remove = function (resourceId) {
        var resource = this.viewModel.resources.getItemById(resourceId);
        if (!resource)
            throw new Error("Invalid resource id");
        var assignments = this.viewModel.assignments.items.filter(function (a) { return a.resourceId === resourceId; });
        if (assignments.length)
            throw new Error("Can't delete assigned resource");
        this.viewModel.resources.remove(resource);
        this.dispatcher.notifyResourceRemoved(resource.id, this.getErrorCallback(), this.viewModel.getResourceObjectForDataSource(resource));
        return resource;
    };
    ResourcesManipulator.prototype.assign = function (resourceID, taskId, id) {
        var viewModel = this.viewModel;
        viewModel.onBeginDataObjectCreate();
        var assignment = viewModel.assignments.createItem();
        assignment.resourceId = resourceID;
        assignment.taskId = taskId;
        if (id)
            assignment.internalId = id;
        assignment.id = assignment.internalId;
        this.viewModel.assignments.add(assignment);
        this.dispatcher.notifyResourceAssigned(this.getResourceAssignmentObjectForDataSource(assignment), function (id) {
            var oldKey = assignment.internalId;
            assignment.updateId(id);
            viewModel.processServerInsertedKey(oldKey, assignment.internalId, DataObject_1.GanttDataObjectNames.resourceAssignment);
        }, this.getErrorCallback());
        this.viewModel.updateModel();
        viewModel.onEndDataObjectCreate();
        this.viewModel.owner.resetAndUpdate();
        return assignment;
    };
    ResourcesManipulator.prototype.deassig = function (assignmentId) {
        var assignment = this.viewModel.assignments.getItemById(assignmentId);
        this.viewModel.assignments.remove(assignment);
        this.dispatcher.notifyResourceUnassigned(assignment.id, this.getErrorCallback(), this.viewModel.getResourceAssignmentObjectForDataSource(assignment));
        this.viewModel.updateModel();
        this.viewModel.owner.resetAndUpdate();
        return assignment;
    };
    ResourcesManipulator.prototype.getResourceObjectForDataSource = function (resource) {
        return {
            id: resource.id,
            text: resource.text
        };
    };
    ResourcesManipulator.prototype.getResourceAssignmentObjectForDataSource = function (resourceAssignment) {
        return {
            id: resourceAssignment.id,
            taskId: this.viewModel.tasks.getItemById(resourceAssignment.taskId).id,
            resourceId: this.viewModel.resources.getItemById(resourceAssignment.resourceId).id
        };
    };
    return ResourcesManipulator;
}(BaseManipulator_1.BaseManipulator));
exports.ResourcesManipulator = ResourcesManipulator;


/***/ }),

/***/ 728:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskManipulator = void 0;
var tslib_1 = __webpack_require__(655);
var common_1 = __webpack_require__(2491);
var DataObject_1 = __webpack_require__(6124);
var BaseManipulator_1 = __webpack_require__(6382);
var TaskManipulator = (function (_super) {
    tslib_1.__extends(TaskManipulator, _super);
    function TaskManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskManipulator.prototype.create = function (data, id, callback) {
        var _this = this;
        var viewModel = this.viewModel;
        viewModel.onBeginDataObjectCreate();
        var task = viewModel.tasks.createItem();
        task.start = data.start;
        task.end = data.end;
        task.title = data.title;
        task.progress = data.progress;
        if (data.color)
            task.color = data.color;
        var parentItem = viewModel.tasks.getItemById(data.parentId);
        if (parentItem)
            parentItem.expanded = true;
        task.parentId = data.parentId;
        if (id)
            task.internalId = id;
        task.id = task.internalId;
        viewModel.tasks.add(task);
        viewModel.updateModel();
        this.dispatcher.notifyTaskCreated(this.getObjectForDataSource(task), function (id) {
            var oldKey = task.internalId;
            task.updateId(id);
            viewModel.processServerInsertedKey(oldKey, task.internalId, DataObject_1.GanttDataObjectNames.task);
            if (callback)
                callback();
            if (_this.viewModel.requireFirstLoadParentAutoCalc) {
                var data_1 = viewModel.getCurrentTaskData().map(function (t) {
                    if (t.parentId === "")
                        t.parentId = null;
                    return t;
                });
                _this.dispatcher.notifyParentDataRecalculated(data_1);
            }
        }, this.getErrorCallback());
        viewModel.onEndDataObjectCreate();
        viewModel.owner.resetAndUpdate();
        return task;
    };
    TaskManipulator.prototype.remove = function (taskId) {
        var task = this.viewModel.tasks.getItemById(taskId);
        if (!task)
            throw new Error("Invalid task id");
        var dependencies = this.viewModel.dependencies.items.filter(function (d) { return d.predecessorId == taskId || d.successorId == taskId; });
        if (dependencies.length)
            throw new Error("Can't delete task with dependency");
        var assignments = this.viewModel.assignments.items.filter(function (a) { return a.taskId == taskId; });
        if (assignments.length)
            throw new Error("Can't delete task with assigned resource");
        this.viewModel.tasks.remove(task);
        this.dispatcher.notifyTaskRemoved(task.id, this.getErrorCallback(), this.viewModel.getTaskObjectForDataSource(task));
        this.viewModel.updateModel();
        this.viewModel.owner.resetAndUpdate();
        return task;
    };
    TaskManipulator.prototype.update = function (taskId, newValues) {
        var task = this.viewModel.tasks.getItemById(taskId);
        var oldState = {};
        Object.keys(newValues).forEach(function (key) {
            if ((0, common_1.isDefined)(task[key])) {
                oldState[key] = task[key];
                task[key] = newValues[key];
            }
        });
        var viewItem = this.viewModel.findItem(taskId);
        if (viewItem)
            this.renderHelper.recreateTaskElement(viewItem.visibleIndex);
        this.dispatcher.notifyTaskUpdated(task.id, newValues, this.getErrorCallback());
        return oldState;
    };
    TaskManipulator.prototype.getObjectForDataSource = function (task) {
        return this.viewModel.getTaskObjectForDataSource(task);
    };
    return TaskManipulator;
}(BaseManipulator_1.BaseManipulator));
exports.TaskManipulator = TaskManipulator;


/***/ }),

/***/ 2601:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GanttJsonUtils = void 0;
var json_1 = __webpack_require__(9937);
var GanttJsonUtils = (function () {
    function GanttJsonUtils() {
    }
    GanttJsonUtils.parseJson = function (json) {
        return json_1.JsonUtils.isValid(json) ? JSON.parse(json) : null;
    };
    return GanttJsonUtils;
}());
exports.GanttJsonUtils = GanttJsonUtils;


/***/ }),

/***/ 8478:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationController = void 0;
var tslib_1 = __webpack_require__(655);
var common_1 = __webpack_require__(2491);
var DateUtils_1 = __webpack_require__(9201);
var Enums_1 = __webpack_require__(5950);
var UpdateTaskHistoryItem_1 = __webpack_require__(9496);
var DateRange_1 = __webpack_require__(858);
var DateTimeUtils_1 = __webpack_require__(7880);
var ValidationError_1 = __webpack_require__(4927);
var ValidationController = (function () {
    function ValidationController(settings) {
        this.lockPredecessorToSuccessor = true;
        this.settings = settings;
    }
    Object.defineProperty(ValidationController.prototype, "viewModel", {
        get: function () {
            return this.settings.getViewModel();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationController.prototype, "history", {
        get: function () {
            return this.settings.getHistory();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationController.prototype, "modelManipulator", {
        get: function () {
            return this.settings.getModelManipulator();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationController.prototype, "range", {
        get: function () {
            return this.settings.getRange();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationController.prototype, "validationSettings", {
        get: function () {
            return this.settings.getValidationSettings();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationController.prototype, "_parentAutoCalc", {
        get: function () {
            return this.viewModel.parentAutoCalc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationController.prototype, "enablePredecessorGap", {
        get: function () {
            return this.viewModel.enablePredecessorGap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationController.prototype, "isValidateDependenciesRequired", {
        get: function () {
            return this.settings.getIsValidateDependenciesRequired();
        },
        enumerable: false,
        configurable: true
    });
    ValidationController.prototype.updateOwnerInAutoParentMode = function () {
        this.settings.updateOwnerInAutoParentMode();
    };
    ValidationController.prototype.checkStartDependencies = function (taskId, date) {
        var _this = this;
        var result = [];
        var task = this.viewModel.tasks.getItemById(taskId);
        var dependencies = this.viewModel.dependencies.items.filter(function (d) { return d.successorId === taskId; });
        dependencies.forEach(function (dep) {
            var predecessorTask = _this.viewModel.tasks.getItemById(dep.predecessorId);
            if (dep.type === Enums_1.DependencyType.FS && predecessorTask.end > date
                || dep.type === Enums_1.DependencyType.SS && predecessorTask.start > date)
                result.push(new ValidationError_1.ValidationError(dep.internalId, true));
            if (dep.type === Enums_1.DependencyType.FS && predecessorTask.end.valueOf() === task.start.valueOf() && date > predecessorTask.end ||
                dep.type === Enums_1.DependencyType.SS && predecessorTask.start.valueOf() === task.start.valueOf() && date > predecessorTask.start)
                result.push(new ValidationError_1.ValidationError(dep.internalId));
        });
        return result;
    };
    ValidationController.prototype.checkEndDependencies = function (taskId, date) {
        var _this = this;
        var result = [];
        var task = this.viewModel.tasks.getItemById(taskId);
        var dependencies = this.viewModel.dependencies.items.filter(function (d) { return d.successorId === taskId; });
        dependencies.forEach(function (dep) {
            var predecessorTask = _this.viewModel.tasks.getItemById(dep.predecessorId);
            if (dep.type === Enums_1.DependencyType.SF && predecessorTask.start > date
                || dep.type === Enums_1.DependencyType.FF && predecessorTask.end > date)
                result.push(new ValidationError_1.ValidationError(dep.internalId, true));
            if ((dep.type === Enums_1.DependencyType.SF && predecessorTask.start.valueOf() === task.end.valueOf() && date > predecessorTask.start) ||
                (dep.type === Enums_1.DependencyType.FF && predecessorTask.end.valueOf() === task.end.valueOf() && date > predecessorTask.end))
                result.push(new ValidationError_1.ValidationError(dep.internalId));
        });
        return result;
    };
    ValidationController.prototype.moveEndDependTasks = function (predecessorTaskId, predecessorPreviousEndDate, moveInitiatorId) {
        var _this = this;
        if (moveInitiatorId === void 0) { moveInitiatorId = null; }
        var dependencies = this.viewModel.dependencies.items.filter(function (d) { return d.predecessorId === predecessorTaskId && !d.isStartDependency; });
        var predecessorTask = this.viewModel.tasks.getItemById(predecessorTaskId);
        dependencies.forEach(function (dependency) {
            var successorTask = _this.viewModel.tasks.getItemById(dependency.successorId);
            var isMoveNotRequired = !successorTask || (moveInitiatorId && _this.viewModel.checkParent(successorTask.internalId, moveInitiatorId)) || (successorTask.parentId === predecessorTask.id);
            if (isMoveNotRequired)
                return;
            var successorRangeBeforeMove = new DateRange_1.DateRange(new Date(successorTask.start.getTime()), new Date(successorTask.end.getTime()));
            var validTaskRange = new DateRange_1.DateRange(new Date(successorTask.start.getTime()), new Date(successorTask.end.getTime()));
            var delta = predecessorTask.end.getTime() - predecessorPreviousEndDate.getTime();
            var predecessorEnd = _this.enablePredecessorGap ? predecessorTask.end : predecessorPreviousEndDate;
            if (dependency.type === Enums_1.DependencyType.FS
                && (successorTask.start < predecessorEnd
                    || (_this.lockPredecessorToSuccessor && successorTask.start.getTime() === predecessorPreviousEndDate.getTime()))) {
                validTaskRange.start.setTime(predecessorTask.end.getTime());
                validTaskRange.end.setTime(validTaskRange.start.getTime() + (successorTask.end.getTime() - successorTask.start.getTime()));
                _this.correctMoving(successorTask.internalId, validTaskRange);
            }
            else if (dependency.type === Enums_1.DependencyType.FF
                && (successorTask.end < predecessorEnd
                    || (_this.lockPredecessorToSuccessor && successorTask.end.getTime() === predecessorPreviousEndDate.getTime()))) {
                validTaskRange.start.setTime(predecessorTask.end.getTime() - (successorTask.end.getTime() - successorTask.start.getTime()));
                validTaskRange.end.setTime(predecessorTask.end.getTime());
                _this.correctMoving(successorTask.internalId, validTaskRange);
            }
            else if (!_this.enablePredecessorGap) {
                validTaskRange.start.setTime(successorTask.start.getTime() + delta);
                validTaskRange.end.setTime(successorTask.end.getTime() + delta);
            }
            if (!successorRangeBeforeMove.equal(validTaskRange)) {
                var data = { start: validTaskRange.start, end: validTaskRange.end };
                _this.history.addAndRedo(new UpdateTaskHistoryItem_1.UpdateTaskHistoryItem(_this.modelManipulator, dependency.successorId, data));
                _this.moveRelatedTasks(dependency, successorRangeBeforeMove, successorTask, validTaskRange);
            }
        });
    };
    ValidationController.prototype.moveStartDependTasks = function (predecessorTaskId, predecessorPreviousStartDate, moveInitiatorId) {
        var _this = this;
        if (moveInitiatorId === void 0) { moveInitiatorId = null; }
        var dependencies = this.viewModel.dependencies.items.filter(function (d) { return d.predecessorId === predecessorTaskId && d.isStartDependency; });
        var predecessorTask = this.viewModel.tasks.getItemById(predecessorTaskId);
        dependencies.forEach(function (dependency) {
            var successorTask = _this.viewModel.tasks.getItemById(dependency.successorId);
            var isMoveNotRequired = !successorTask || (moveInitiatorId && _this.viewModel.checkParent(successorTask.internalId, moveInitiatorId)) || (successorTask.parentId === predecessorTask.id);
            if (isMoveNotRequired)
                return;
            var successorRangeBeforeMove = new DateRange_1.DateRange(new Date(successorTask.start.getTime()), new Date(successorTask.end.getTime()));
            var validTaskRange = new DateRange_1.DateRange(new Date(successorTask.start.getTime()), new Date(successorTask.end.getTime()));
            var delta = predecessorTask.start.getTime() - predecessorPreviousStartDate.getTime();
            var predecessorStart = _this.enablePredecessorGap ? predecessorTask.start : predecessorPreviousStartDate;
            if (dependency.type === Enums_1.DependencyType.SF
                && (successorTask.end < predecessorStart
                    || (_this.lockPredecessorToSuccessor && successorTask.end.getTime() === predecessorPreviousStartDate.getTime()))) {
                validTaskRange.start.setTime(predecessorTask.start.getTime() - (successorTask.end.getTime() - successorTask.start.getTime()));
                validTaskRange.end.setTime(predecessorTask.start.getTime());
                _this.correctMoving(successorTask.internalId, validTaskRange);
            }
            else if (dependency.type === Enums_1.DependencyType.SS
                && (successorTask.start < predecessorStart
                    || (_this.lockPredecessorToSuccessor && successorTask.start.getTime() === predecessorPreviousStartDate.getTime()))) {
                validTaskRange.start.setTime(predecessorTask.start.getTime());
                validTaskRange.end.setTime(predecessorTask.start.getTime() + (successorTask.end.getTime() - successorTask.start.getTime()));
                _this.correctMoving(successorTask.internalId, validTaskRange);
            }
            else if (!_this.enablePredecessorGap) {
                validTaskRange.start.setTime(successorTask.start.getTime() + delta);
                validTaskRange.end.setTime(successorTask.end.getTime() + delta);
            }
            if (!successorRangeBeforeMove.equal(validTaskRange)) {
                var data = { start: validTaskRange.start, end: validTaskRange.end };
                _this.history.addAndRedo(new UpdateTaskHistoryItem_1.UpdateTaskHistoryItem(_this.modelManipulator, dependency.successorId, data));
                _this.moveRelatedTasks(dependency, successorRangeBeforeMove, successorTask, validTaskRange);
            }
        });
    };
    ValidationController.prototype.moveRelatedTasks = function (dependency, successorRangeBeforeMove, successorTask, validTaskRange) {
        var delta = validTaskRange.start.getTime() - successorRangeBeforeMove.start.getTime();
        this.correctParentsOnChildMoving(successorTask.internalId, delta);
        this.moveStartDependTasks(dependency.successorId, successorRangeBeforeMove.start);
        this.moveEndDependTasks(dependency.successorId, successorRangeBeforeMove.end);
    };
    ValidationController.prototype.getCorrectDateRange = function (taskId, startDate, endDate) {
        var _this = this;
        var dateRange = new DateRange_1.DateRange(new Date(startDate), new Date(endDate));
        var validationErrors = tslib_1.__spreadArray(tslib_1.__spreadArray([], this.checkStartDependencies(taskId, dateRange.start), true), this.checkEndDependencies(taskId, dateRange.end), true);
        var criticalErrors = validationErrors.filter(function (e) { return e.critical; });
        criticalErrors.forEach(function (error) {
            var dependency = _this.viewModel.dependencies.getItemById(error.dependencyId);
            var predecessorTask = _this.viewModel.tasks.getItemById(dependency.predecessorId);
            if (dependency.type === Enums_1.DependencyType.FS)
                if (dateRange.start < predecessorTask.end)
                    dateRange.start.setTime(predecessorTask.end.getTime());
            if (dependency.type === Enums_1.DependencyType.SS)
                if (dateRange.start < predecessorTask.start)
                    dateRange.start.setTime(predecessorTask.start.getTime());
            if (dependency.type === Enums_1.DependencyType.FF)
                if (dateRange.end < predecessorTask.end)
                    dateRange.end.setTime(predecessorTask.end.getTime());
            if (dependency.type === Enums_1.DependencyType.SF)
                if (dateRange.end < predecessorTask.start)
                    dateRange.end.setTime(predecessorTask.start.getTime());
        });
        return dateRange;
    };
    ValidationController.prototype.correctMoving = function (taskId, dateRange) {
        var _this = this;
        var deltaDate = dateRange.end.getTime() - dateRange.start.getTime();
        var validationErrors = tslib_1.__spreadArray(tslib_1.__spreadArray([], this.checkStartDependencies(taskId, dateRange.start), true), this.checkEndDependencies(taskId, dateRange.end), true);
        var criticalErrors = validationErrors.filter(function (e) { return e.critical; });
        criticalErrors.forEach(function (error) {
            var dependency = _this.viewModel.dependencies.getItemById(error.dependencyId);
            var predecessorTask = _this.viewModel.tasks.getItemById(dependency.predecessorId);
            if (dependency.type === Enums_1.DependencyType.FS)
                if (dateRange.start < predecessorTask.end) {
                    dateRange.start.setTime(predecessorTask.end.getTime());
                    dateRange.end.setTime(dateRange.start.getTime() + deltaDate);
                }
            if (dependency.type === Enums_1.DependencyType.SS)
                if (dateRange.start < predecessorTask.start) {
                    dateRange.start.setTime(predecessorTask.start.getTime());
                    dateRange.end.setTime(dateRange.start.getTime() + deltaDate);
                }
            if (dependency.type === Enums_1.DependencyType.FF)
                if (dateRange.end < predecessorTask.end) {
                    dateRange.end.setTime(predecessorTask.end.getTime());
                    dateRange.start.setTime(dateRange.end.getTime() - deltaDate);
                }
            if (dependency.type === Enums_1.DependencyType.SF)
                if (dateRange.end < predecessorTask.start) {
                    dateRange.end.setTime(predecessorTask.start.getTime());
                    dateRange.start.setTime(dateRange.end.getTime() - deltaDate);
                }
        });
        return dateRange;
    };
    ValidationController.prototype.recalculateParents = function (child, calcStepCallback) {
        var parent = child && child.parent;
        while (parent && parent.task) {
            var children = parent.children;
            var start = this.range.end;
            var end = this.range.start;
            var progress = 0;
            var totalDuration = 0;
            var data = { id: parent.task.internalId };
            for (var i = 0; i < children.length; i++) {
                var childTask = children[i].task;
                if (!childTask.isValid())
                    continue;
                start = DateTimeUtils_1.DateTimeUtils.getMinDate(start, childTask.start);
                end = DateTimeUtils_1.DateTimeUtils.getMaxDate(end, childTask.end);
                var duration = childTask.getDuration();
                progress += childTask.progress * duration;
                totalDuration += duration;
            }
            if (!DateTimeUtils_1.DateTimeUtils.areDatesEqual(parent.task.start, start))
                data["start"] = start;
            if (!DateTimeUtils_1.DateTimeUtils.areDatesEqual(parent.task.end, end))
                data["end"] = end;
            data["oldStart"] = parent.task.start;
            data["oldEnd"] = parent.task.end;
            progress = totalDuration > 0 ? Math.round(progress / totalDuration) : 0;
            if (progress !== parent.task.progress)
                data["progress"] = progress;
            calcStepCallback(data);
            parent = parent.parent;
        }
    };
    ValidationController.prototype.updateParentsRangeByChild = function (taskId) {
        var _this = this;
        this.recalculateParents(this.viewModel.findItem(taskId), function (data) {
            if (!(0, common_1.isDefined)(data.id))
                return;
            var history = _this.history;
            var manipulator = _this.modelManipulator;
            if ((0, common_1.isDefined)(data.start)) {
                history.addAndRedo(new UpdateTaskHistoryItem_1.UpdateTaskHistoryItem(manipulator, data.id, { start: data.start }));
                _this.moveStartDependTasks(data.id, data.oldStart);
            }
            if ((0, common_1.isDefined)(data.end)) {
                history.addAndRedo(new UpdateTaskHistoryItem_1.UpdateTaskHistoryItem(manipulator, data.id, { end: data.end }));
                _this.moveEndDependTasks(data.id, data.oldEnd);
            }
            if ((0, common_1.isDefined)(data.progress))
                history.addAndRedo(new UpdateTaskHistoryItem_1.UpdateTaskHistoryItem(manipulator, data.id, { progress: data.progress }));
        });
    };
    ValidationController.prototype.updateChildRangeByParent = function (parentId, delta, changedTasks) {
        var item = this.viewModel.findItem(parentId);
        if (!item || item.children.length === 0)
            return;
        var children = item.children;
        for (var i = 0; i < children.length; i++) {
            var childTask = children[i].task;
            var newStart = new Date(childTask.start.getTime() + delta);
            var taskPeriod = DateUtils_1.DateUtils.getRangeMSPeriod(childTask.start, childTask.end);
            var newEnd = DateUtils_1.DateUtils.getDSTCorrectedTaskEnd(newStart, taskPeriod);
            changedTasks.push({ id: childTask.internalId, start: childTask.start, end: childTask.end });
            this.history.addAndRedo(new UpdateTaskHistoryItem_1.UpdateTaskHistoryItem(this.modelManipulator, childTask.internalId, { start: newStart, end: newEnd }));
            this.updateChildRangeByParent(childTask.internalId, delta, changedTasks);
        }
    };
    ValidationController.prototype.updateParentsIfRequired = function (childId) {
        if (this._parentAutoCalc) {
            this.updateParentsRangeByChild(childId);
            this.updateOwnerInAutoParentMode();
        }
    };
    ValidationController.prototype.correctParentsOnChildMoving = function (taskId, delta) {
        var _this = this;
        if (this._parentAutoCalc && delta !== 0) {
            this.updateParentsRangeByChild(taskId);
            var changedTasks = [];
            this.updateChildRangeByParent(taskId, delta, changedTasks);
            if (this.isValidateDependenciesRequired)
                changedTasks.forEach(function (i) {
                    _this.moveStartDependTasks(i.id, i.start, taskId);
                    _this.moveEndDependTasks(i.id, i.end, taskId);
                });
            this.updateOwnerInAutoParentMode();
        }
    };
    ValidationController.prototype.canCreateDependency = function (predecessorId, successorId) {
        return this.viewModel.canCreateDependency(predecessorId, successorId);
    };
    return ValidationController;
}());
exports.ValidationController = ValidationController;


/***/ }),

/***/ 4927:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationError = void 0;
var ValidationError = (function () {
    function ValidationError(dependencyId, critical) {
        if (critical === void 0) { critical = false; }
        this.dependencyId = dependencyId;
        this.critical = critical;
    }
    return ValidationError;
}());
exports.ValidationError = ValidationError;


/***/ }),

/***/ 6350:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViewVisualModelDependencyInfo = void 0;
var ViewVisualModelDependencyInfo = (function () {
    function ViewVisualModelDependencyInfo(id, predecessor, type) {
        this.id = id;
        this.predecessor = predecessor;
        this.type = type;
    }
    return ViewVisualModelDependencyInfo;
}());
exports.ViewVisualModelDependencyInfo = ViewVisualModelDependencyInfo;


/***/ }),

/***/ 3562:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViewVisualModelItem = void 0;
var common_1 = __webpack_require__(2491);
var size_1 = __webpack_require__(6353);
var ViewVisualModelItem = (function () {
    function ViewVisualModelItem(task, resources) {
        this.dependencies = new Array();
        this.parent = null;
        this.visible = true;
        this.selected = false;
        this.visibleIndex = -1;
        this.task = task;
        this.resources = resources;
        this.children = new Array();
        this.isCustom = false;
        this.size = new size_1.Size(0, 0);
    }
    Object.defineProperty(ViewVisualModelItem.prototype, "resourceText", {
        get: function () {
            var text = "";
            this.resources.items.forEach(function (r) { return text += r.text + " "; });
            return text;
        },
        enumerable: false,
        configurable: true
    });
    ViewVisualModelItem.prototype.addChild = function (child) {
        if ((0, common_1.isDefined)(child) && this.children.indexOf(child) < 0)
            this.children.push(child);
    };
    ViewVisualModelItem.prototype.removeChild = function (child) {
        var index = this.children.indexOf(child);
        if (index > -1)
            this.children.splice(index, 1);
    };
    ViewVisualModelItem.prototype.getExpanded = function () {
        return !!this.task && this.task.expanded;
    };
    ViewVisualModelItem.prototype.getVisible = function () {
        if (!this.visible)
            return false;
        var parentItem = this.parent;
        while (parentItem) {
            if (!parentItem.visible)
                return false;
            parentItem = parentItem.parent;
        }
        return true;
    };
    ViewVisualModelItem.prototype.changeVisibility = function (visible) {
        this.visible = visible;
    };
    ViewVisualModelItem.prototype.changeSelection = function (selected) {
        this.selected = selected;
    };
    ViewVisualModelItem.prototype.setDependencies = function (dependencies) {
        if (dependencies)
            this.dependencies = dependencies.slice();
    };
    return ViewVisualModelItem;
}());
exports.ViewVisualModelItem = ViewVisualModelItem;


/***/ }),

/***/ 1408:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViewVisualModel = void 0;
var ResourceCollection_1 = __webpack_require__(8828);
var TaskCollection_1 = __webpack_require__(9504);
var DependencyCollection_1 = __webpack_require__(7380);
var ResourceAssignmentCollection_1 = __webpack_require__(9883);
var ViewVisualModelItem_1 = __webpack_require__(3562);
var ViewVisualModelDependencyInfo_1 = __webpack_require__(6350);
var WorkingTimeCalculator_1 = __webpack_require__(21);
var common_1 = __webpack_require__(2491);
var DataObject_1 = __webpack_require__(6124);
var Dependency_1 = __webpack_require__(7352);
var Resource_1 = __webpack_require__(2301);
var ResourceAssignment_1 = __webpack_require__(7437);
var ViewVisualModel = (function () {
    function ViewVisualModel(owner, tasks, dependencies, resources, assignments, dateRange, workTimeRules) {
        this._fLockCount = 0;
        this.lockChangesProcessing = false;
        this.owner = owner;
        this.tasks = new TaskCollection_1.TaskCollection();
        this.tasks.importFromObject(tasks);
        this.dependencies = new DependencyCollection_1.DependencyCollection();
        this.dependencies.importFromObject(dependencies);
        this.resources = new ResourceCollection_1.ResourceCollection();
        this.resources.importFromObject(resources);
        this.assignments = new ResourceAssignmentCollection_1.ResourceAssignmentCollection();
        this.assignments.importFromObject(assignments);
        this._itemList = new Array();
        this._viewItemList = new Array();
        this._workTimeCalculator = new WorkingTimeCalculator_1.WorkingTimeCalculator(dateRange, workTimeRules);
        this.updateModel(true);
    }
    Object.defineProperty(ViewVisualModel.prototype, "renderHelper", {
        get: function () {
            return this.owner.renderHelper;
        },
        enumerable: false,
        configurable: true
    });
    ViewVisualModel.prototype.updateModel = function (isFirstLoad) {
        this._itemList.splice(0, this._itemList.length);
        var tasks = this.tasks.items;
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            if (task)
                this._itemList.push(new ViewVisualModelItem_1.ViewVisualModelItem(task, this.getAssignedResources(task)));
        }
        this.createHierarchy(isFirstLoad);
        this.populateItemsForView();
        if (this.owner && this.owner.currentSelectedTaskID)
            this.changeTaskSelected(this.owner.currentSelectedTaskID, true);
    };
    ViewVisualModel.prototype.createHierarchy = function (isFirstLoad) {
        var _this = this;
        this.root = new ViewVisualModelItem_1.ViewVisualModelItem(null, null);
        var list = this._itemList;
        var inverted = list.reduce(function (previous, item) {
            var _a;
            var key = (_a = item.task) === null || _a === void 0 ? void 0 : _a.internalId;
            if ((0, common_1.isDefined)(key))
                previous[key] = item;
            return previous;
        }, {});
        var recalculateParentRequired = this.requireFirstLoadParentAutoCalc && isFirstLoad;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var parentId = item.task.parentId;
            var parentItem = inverted[parentId] || this.root;
            item.parent = parentItem;
            parentItem.addChild(item);
            if (recalculateParentRequired)
                this.owner.validationController.recalculateParents(item, function (data) {
                    if (!(0, common_1.isDefined)(data.id))
                        return;
                    var task = _this.tasks.getItemById(data.id);
                    if ((0, common_1.isDefined)(data.start))
                        task.start = data.start;
                    if ((0, common_1.isDefined)(data.end))
                        task.end = data.end;
                    if ((0, common_1.isDefined)(data.progress))
                        task.progress = data.progress;
                });
        }
        if (recalculateParentRequired)
            this.owner.dispatcher.notifyParentDataRecalculated(this.getCurrentTaskData());
    };
    ViewVisualModel.prototype.getCurrentTaskData = function () {
        var _this = this;
        return this.tasks.items.map(function (t) { return _this.getTaskObjectForDataSource(t); });
    };
    ViewVisualModel.prototype.getTaskObjectForDataSource = function (task) {
        var parentTask = task.parentId && this.tasks.getItemById(task.parentId);
        var rootId = this.getRootTaskId();
        var isRootLevelTask = rootId && task.parentId === rootId;
        var parentId = isRootLevelTask ? this.getRootRawValue() : parentTask === null || parentTask === void 0 ? void 0 : parentTask.id;
        var taskObject = {
            id: task.id,
            start: task.isValidStart() ? task.start : null,
            end: task.isValidEnd() ? task.end : null,
            duration: task.duration,
            description: task.description,
            parentId: parentId,
            progress: task.progress,
            color: task.color,
            taskType: task.taskType,
            title: task.title,
            customFields: task.customFields,
            expanded: task.expanded
        };
        return taskObject;
    };
    ViewVisualModel.prototype.getDependencyObjectForDataSource = function (key) {
        var dependency = key instanceof Dependency_1.Dependency ? key : this.getItemByPublicId("dependency", key);
        if (dependency) {
            var predecessorId = this.convertInternalToPublicKey("task", dependency.predecessorId);
            var successorId = this.convertInternalToPublicKey("task", dependency.successorId);
            return {
                id: dependency.id,
                predecessorId: (0, common_1.isDefined)(predecessorId) ? predecessorId : dependency.predecessorId,
                successorId: (0, common_1.isDefined)(successorId) ? successorId : dependency.successorId,
                type: dependency.type
            };
        }
        return null;
    };
    ViewVisualModel.prototype.getResourceObjectForDataSource = function (key) {
        var resource = key instanceof Resource_1.Resource ? key : this.getItemByPublicId("resource", key);
        if (resource)
            return {
                id: resource.id,
                text: resource.text,
                color: resource.color
            };
        return null;
    };
    ViewVisualModel.prototype.getResourceAssignmentObjectForDataSource = function (key) {
        var assignment = key instanceof ResourceAssignment_1.ResourceAssignment ? key : this.getItemByPublicId("assignment", key);
        if (assignment) {
            var taskId = this.convertInternalToPublicKey("task", assignment.taskId);
            var resourceId = this.convertInternalToPublicKey("resource", assignment.resourceId);
            return {
                id: assignment.id,
                taskId: (0, common_1.isDefined)(taskId) ? taskId : assignment.taskId,
                resourceId: (0, common_1.isDefined)(resourceId) ? resourceId : assignment.resourceId
            };
        }
        return null;
    };
    ViewVisualModel.prototype.getRootRawValue = function () {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.root.children[0]) === null || _a === void 0 ? void 0 : _a.task) === null || _b === void 0 ? void 0 : _b.rawParentId) !== null && _c !== void 0 ? _c : null;
    };
    ViewVisualModel.prototype.populateItemsForView = function () {
        this._viewItemList.splice(0, this._viewItemList.length);
        this.populateVisibleItems(this.root);
        this.updateVisibleItemDependencies();
    };
    ViewVisualModel.prototype.populateVisibleItems = function (item) {
        var _this = this;
        var isRoot = item === this.root;
        if (!item || (!item.task && !isRoot))
            return;
        if (!isRoot) {
            this._viewItemList.push(item);
            item.visibleIndex = this._viewItemList.length - 1;
        }
        if (item.getExpanded() || item === this.root)
            item.children.forEach(function (n) { return _this.populateVisibleItems(n); });
    };
    ViewVisualModel.prototype.updateVisibleItemDependencies = function () {
        var list = this._viewItemList;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var visibleDependencies = this.getTasVisibleDependencies(item.task);
            item.setDependencies(visibleDependencies);
        }
    };
    ViewVisualModel.prototype.getAssignedResources = function (task) {
        var _this = this;
        var res = new ResourceCollection_1.ResourceCollection();
        var assignments = this.assignments.items.filter(function (value) { return value.taskId == task.internalId; });
        assignments.forEach(function (assignment) { res.add(_this.resources.getItemById(assignment.resourceId)); });
        return res;
    };
    ViewVisualModel.prototype.getTasVisibleDependencies = function (task) {
        var res = new Array();
        var id = task.internalId;
        var dependencies = this.dependencies.items.filter(function (value) { return value.successorId == id; });
        for (var i = 0; i < dependencies.length; i++) {
            var dependency = dependencies[i];
            var item = this.findItem(dependency.predecessorId);
            if (item && item.getVisible())
                res.push(new ViewVisualModelDependencyInfo_1.ViewVisualModelDependencyInfo(dependency.internalId, item, dependency.type));
        }
        return res;
    };
    ViewVisualModel.prototype.changeTaskExpanded = function (id, expanded) {
        var task = this.tasks.getItemById(String(id));
        if (task) {
            task.expanded = expanded;
            this.changed();
        }
    };
    ViewVisualModel.prototype.changeTaskVisibility = function (id, visible) {
        var item = this.findItem(id);
        if (item) {
            item.visible = visible;
            this.changed();
        }
    };
    ViewVisualModel.prototype.changeTaskSelected = function (id, selected) {
        var item = this._itemList.filter(function (value) { return value.task && value.task.internalId === id; })[0];
        if (item) {
            item.selected = selected;
            var viewItem = this.findItem(id);
            var taskIndex = viewItem && viewItem.visibleIndex;
            if (taskIndex > -1)
                this.renderHelper.recreateTaskElement(taskIndex);
        }
    };
    ViewVisualModel.prototype.beginUpdate = function () {
        this._fLockCount++;
    };
    ViewVisualModel.prototype.endUpdate = function () {
        this._fLockCount--;
        if (this._fLockCount == 0)
            this.changed();
    };
    ViewVisualModel.prototype.compareTaskOrder = function (taskModel) {
        var newTasks = new TaskCollection_1.TaskCollection();
        newTasks.importFromObject(taskModel);
        var newItems = newTasks.items;
        var oldItems = this.tasks.items;
        if (newItems.length !== oldItems.length)
            return false;
        for (var i = 0; i < newItems.length; i++) {
            var newTask = newItems[i];
            var oldTask = oldItems[i];
            if (newTask.id !== oldTask.id)
                return false;
        }
        return true;
    };
    ViewVisualModel.prototype.refreshTaskDataIfRequires = function (tasks) {
        var changed = !this.lockChangesProcessing && !this.compareTaskOrder(tasks);
        if (changed) {
            var hash = this.saveTaskInternalIds();
            this.tasks.importFromObject(tasks);
            this.restoreTaskInternalIds(hash);
            this.updateModel();
        }
        return changed;
    };
    ViewVisualModel.prototype.saveTaskInternalIds = function () {
        var hash = {};
        this.tasks.items.map(function (t) { return hash[t.id] = t.internalId; });
        return hash;
    };
    ViewVisualModel.prototype.restoreTaskInternalIds = function (hash) {
        for (var id in hash) {
            if (!Object.prototype.hasOwnProperty.call(hash, id))
                continue;
            var task = this.tasks.getItemByPublicId(id);
            if (task)
                task.internalId = hash[id];
        }
    };
    ViewVisualModel.prototype.canCreateDependency = function (predecessorId, successorId) {
        if (!predecessorId || !successorId || predecessorId === successorId)
            return false;
        var hasLink = false;
        if (this.enableDependencyValidation) {
            var hash = this.getDependentTasksHash();
            if (this.parentAutoCalc)
                hasLink = this.checkTasksInterdependence(predecessorId, successorId, hash) || this.checkParent(predecessorId, successorId) || this.checkParent(successorId, predecessorId);
            else
                hasLink = this.checkDependencyChain([predecessorId], [successorId], hash, []);
        }
        return !hasLink;
    };
    ViewVisualModel.prototype.checkParent = function (childId, parentId) {
        return this.getTaskTreeLine(childId).indexOf(parentId) > -1;
    };
    ViewVisualModel.prototype.getTaskTreeLine = function (taskId) {
        var result = [taskId];
        var item = this.findItem(taskId);
        if (item) {
            item = item.parent;
            while (item === null || item === void 0 ? void 0 : item.task) {
                result.push(item === null || item === void 0 ? void 0 : item.task.internalId);
                item = item.parent;
            }
        }
        else {
            var task = this.tasks.getItemById(taskId);
            var parent_1 = this.tasks.getItemById(task === null || task === void 0 ? void 0 : task.parentId);
            while (parent_1) {
                result.push(parent_1.id);
                parent_1 = this.tasks.getItemById(parent_1.parentId);
            }
        }
        return result;
    };
    ViewVisualModel.prototype.getDependentTasksHash = function () {
        var result = {};
        this.dependencies.items.forEach(function (d) {
            var _a, _b;
            var id1 = d.predecessorId;
            var id2 = d.successorId;
            (_a = result[id1]) !== null && _a !== void 0 ? _a : (result[id1] = []);
            if (result[id1].indexOf(id2) < 0)
                result[id1].push(id2);
            (_b = result[id2]) !== null && _b !== void 0 ? _b : (result[id2] = []);
            if (result[id2].indexOf(id1) < 0)
                result[id2].push(id1);
        });
        return result;
    };
    ViewVisualModel.prototype.checkTasksInterdependence = function (id1, id2, depHash) {
        var treeLine1 = this.getTaskTreeLine(id1).reverse();
        var treeLine2 = this.getTaskTreeLine(id2).reverse();
        var group1Root;
        var group2Root;
        for (var i = 0; i < treeLine1.length - 1; i++) {
            var id = treeLine1[i];
            var index = treeLine2.indexOf(id);
            if (index > -1) {
                group1Root = treeLine1[i + 1];
                group2Root = treeLine2[index + 1];
            }
        }
        if (!group1Root && !group2Root) {
            group1Root = treeLine1[0];
            group2Root = treeLine2[0];
        }
        return this.checkDependencyChain(this.getBranchIds(group1Root), this.getBranchIds(group2Root), depHash, []);
    };
    ViewVisualModel.prototype.checkDependencyChain = function (group1, group2, depHash, checked) {
        if (group1.some(function (id) { return group2.indexOf(id) > -1; }))
            return true;
        checked.push.apply(checked, group1);
        for (var i = 0; i < group1.length; i++) {
            var id1 = group1[i];
            var dependent = depHash[id1];
            if (dependent && this.checkDependencyChain(dependent.filter(function (id) { return checked.indexOf(id) === -1; }), group2, depHash, checked))
                return true;
        }
        return false;
    };
    ViewVisualModel.prototype.getBranchIds = function (id) {
        var _this = this;
        var result = [id];
        var item = this.findItem(id);
        var children = item === null || item === void 0 ? void 0 : item.children;
        if (children)
            children.forEach(function (vi) {
                var _a;
                var key = (_a = vi.task) === null || _a === void 0 ? void 0 : _a.internalId;
                if (key)
                    result = result.concat(_this.getBranchIds(key));
            });
        return result;
    };
    ViewVisualModel.prototype.getTasksExpandedState = function () {
        var items = this.tasks.items;
        var state = {};
        items.forEach(function (t) { return state[t.id] = t.expanded; });
        return state;
    };
    ViewVisualModel.prototype.applyTasksExpandedState = function (state) {
        if (!state)
            return;
        this.beginUpdate();
        for (var key in state)
            if (Object.prototype.hasOwnProperty.call(state, key))
                this.changeTaskExpanded(key, state[key]);
        this.endUpdate();
    };
    ViewVisualModel.prototype.changed = function () {
        if (this._fLockCount !== 0)
            return;
        this.populateItemsForView();
        if (this.owner && this.owner.onVisualModelChanged)
            this.owner.onVisualModelChanged();
    };
    ViewVisualModel.prototype.findItem = function (taskId) {
        return this._viewItemList.filter(function (value) { return value.task && value.task.internalId === taskId; })[0];
    };
    Object.defineProperty(ViewVisualModel.prototype, "items", {
        get: function () { return this._viewItemList; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewVisualModel.prototype, "itemCount", {
        get: function () { return this.items.length; },
        enumerable: false,
        configurable: true
    });
    ViewVisualModel.prototype.getTaskVisibility = function (id) {
        var item = this.findItem(id);
        return !!item && item.getVisible();
    };
    ViewVisualModel.prototype.getTaskSelected = function (id) {
        var item = this.findItem(id);
        return !!item && item.selected;
    };
    Object.defineProperty(ViewVisualModel.prototype, "noWorkingIntervals", {
        get: function () { return this._workTimeCalculator.noWorkingIntervals; },
        enumerable: false,
        configurable: true
    });
    ViewVisualModel.prototype.updateRange = function (range) { this._workTimeCalculator.updateRange(range); };
    ViewVisualModel.prototype.taskHasChildrenByIndex = function (index) { return this._viewItemList[index].children.length > 0; };
    ViewVisualModel.prototype.taskHasChildren = function (id) {
        var item = this.findItem(id);
        return item && item.children.length > 0;
    };
    Object.defineProperty(ViewVisualModel.prototype, "enableDependencyValidation", {
        get: function () {
            var _a;
            var settings = this.owner && this.owner.settings;
            return (_a = settings === null || settings === void 0 ? void 0 : settings.validation) === null || _a === void 0 ? void 0 : _a.validateDependencies;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewVisualModel.prototype, "parentAutoCalc", {
        get: function () {
            var settings = this.owner && this.owner.settings;
            return settings && settings.validation && settings.validation.autoUpdateParentTasks;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewVisualModel.prototype, "enablePredecessorGap", {
        get: function () {
            var settings = this.owner && this.owner.settings;
            return settings && settings.validation && settings.validation.enablePredecessorGap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewVisualModel.prototype, "requireFirstLoadParentAutoCalc", {
        get: function () { return this.parentAutoCalc && this.owner.requireFirstLoadParentAutoCalc(); },
        enumerable: false,
        configurable: true
    });
    ViewVisualModel.prototype.isTaskToCalculateByChildren = function (id) { return this.parentAutoCalc && this.taskHasChildren(id); };
    ViewVisualModel.prototype.hasTasks = function () { return this.tasks.length > 0; };
    ViewVisualModel.prototype.getDataUpdateErrorCallback = function () {
        return this.owner.getDataUpdateErrorCallback && this.owner.getDataUpdateErrorCallback();
    };
    ViewVisualModel.prototype.convertPublicToInternalKey = function (dataType, publicKey) {
        var item = this.getItemByPublicId(dataType, publicKey);
        return item && item.internalId;
    };
    ViewVisualModel.prototype.convertInternalToPublicKey = function (dataType, internalId) {
        var item = this.getItemByInternalId(dataType, internalId);
        return item && item.id;
    };
    ViewVisualModel.prototype.getItemByPublicId = function (dataType, publicKey) {
        var strKey = publicKey.toString();
        switch (dataType) {
            case "task":
                return this.tasks.getItemByPublicId(strKey);
            case "dependency":
                return this.dependencies.getItemByPublicId(strKey);
            case "resource":
                return this.resources.getItemByPublicId(strKey);
            case "assignment":
                return this.assignments.getItemByPublicId(strKey);
        }
        return null;
    };
    ViewVisualModel.prototype.getItemByInternalId = function (dataType, internalId) {
        switch (dataType) {
            case "task":
                return this.tasks.getItemById(internalId);
            case "dependency":
                return this.dependencies.getItemById(internalId);
            case "resource":
                return this.resources.getItemById(internalId);
            case "assignment":
                return this.assignments.getItemById(internalId);
        }
        return null;
    };
    ViewVisualModel.prototype.findAssignment = function (resourceKey, taskKey) {
        var resourceInternalKey = this.convertPublicToInternalKey("resource", resourceKey);
        var taskInternalKey = this.convertPublicToInternalKey("task", taskKey);
        return this.assignments.items.filter(function (val) { return val.resourceId === resourceInternalKey && val.taskId === taskInternalKey; })[0];
    };
    ViewVisualModel.prototype.findAllTaskAssignments = function (taskInternalKey) {
        return this.assignments.items.filter(function (val) { return val.taskId === taskInternalKey; });
    };
    ViewVisualModel.prototype.getAllVisibleTaskIndices = function (start, end) {
        var _a;
        var result = [];
        start !== null && start !== void 0 ? start : (start = 0);
        end !== null && end !== void 0 ? end : (end = this._viewItemList.length - 1);
        for (var i = start; i <= end; i++) {
            var item = this._viewItemList[i];
            if ((item === null || item === void 0 ? void 0 : item.getVisible()) && ((_a = item === null || item === void 0 ? void 0 : item.task) === null || _a === void 0 ? void 0 : _a.isValid()))
                result.push(i);
        }
        return result;
    };
    ViewVisualModel.prototype.getVisibleTasks = function () {
        var _this = this;
        return this.tasks.items.filter(function (t) { return t && _this.getTaskVisibility(t.internalId) && t.isValid(); });
    };
    ViewVisualModel.prototype.getVisibleDependencies = function () {
        var visibleTasksKeys = this.getVisibleTasks().map(function (t) { return t.internalId; });
        return this.dependencies.items.filter(function (d) { return d && visibleTasksKeys.indexOf(d.successorId) > -1 && visibleTasksKeys.indexOf(d.predecessorId) > -1; });
    };
    ViewVisualModel.prototype.getVisibleResourceAssignments = function () {
        var visibleTasksKeys = this.getVisibleTasks().map(function (t) { return t.internalId; });
        return this.assignments.items.filter(function (a) { return a && visibleTasksKeys.indexOf(a.taskId) > -1; });
    };
    ViewVisualModel.prototype.getVisibleResources = function () {
        var visibleResources = [];
        var visibleAssignments = this.getVisibleResourceAssignments();
        for (var i = 0; i < visibleAssignments.length; i++) {
            var resource = this.getItemByInternalId("resource", visibleAssignments[i].resourceId);
            if (resource && visibleResources.indexOf(resource) === -1)
                visibleResources.push(resource);
        }
        return visibleResources;
    };
    ViewVisualModel.prototype.getRootTaskId = function () {
        var _a;
        (_a = this.rootTaskId) !== null && _a !== void 0 ? _a : (this.rootTaskId = this.calculateRootTaskId());
        return this.rootTaskId;
    };
    ViewVisualModel.prototype.calculateRootTaskId = function () {
        var item = this.items[0];
        if (!item)
            return null;
        while (item.parent && item.task)
            item = item.parent;
        return item.children[0].task.parentId;
    };
    ViewVisualModel.prototype.getTaskMinStart = function () {
        var min = this.owner.dataRange.start;
        this.tasks.items.forEach(function (t) {
            if (t.isValid() && t.start.getTime() < min.getTime())
                min = t.start;
        });
        return min;
    };
    ViewVisualModel.prototype.getTaskMaxEnd = function () {
        var max = this.owner.dataRange.end;
        this.tasks.items.forEach(function (t) {
            if (t.isValid() && t.end.getTime() > max.getTime())
                max = t.end;
        });
        return max;
    };
    ViewVisualModel.prototype.processServerInsertedKey = function (oldKey, newKey, type) {
        var _a;
        if (type === DataObject_1.GanttDataObjectNames.task)
            this.tasks.invalidate();
        if (type === DataObject_1.GanttDataObjectNames.dependency) {
            this.dependencies.invalidate();
            this.updateVisibleItemDependencies();
        }
        if (type === DataObject_1.GanttDataObjectNames.resource)
            this.resources.invalidate();
        if (type === DataObject_1.GanttDataObjectNames.resourceAssignment)
            this.assignments.invalidate();
        (_a = this.owner) === null || _a === void 0 ? void 0 : _a.updateHistoryObsoleteInsertedKey(oldKey, newKey, type);
    };
    ViewVisualModel.prototype.onBeginDataObjectCreate = function () { var _a, _b; (_b = (_a = this.owner).lockUpdateWithReload) === null || _b === void 0 ? void 0 : _b.call(_a); };
    ViewVisualModel.prototype.onEndDataObjectCreate = function () { var _a, _b; (_b = (_a = this.owner).unlockUpdateWithReload) === null || _b === void 0 ? void 0 : _b.call(_a); };
    return ViewVisualModel;
}());
exports.ViewVisualModel = ViewVisualModel;


/***/ }),

/***/ 858:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateRange = void 0;
var DateRange = (function () {
    function DateRange(start, end) {
        this.start = start;
        this.end = end;
    }
    DateRange.prototype.equal = function (date) {
        var result = true;
        result = result && this.start.getTime() === date.start.getTime();
        result = result && this.end.getTime() === date.end.getTime();
        return result;
    };
    return DateRange;
}());
exports.DateRange = DateRange;


/***/ }),

/***/ 7880:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateTimeUtils = void 0;
var Time_1 = __webpack_require__(2753);
var TimeRange_1 = __webpack_require__(9331);
var common_1 = __webpack_require__(2491);
var DateRange_1 = __webpack_require__(858);
var DayOfWeekMonthlyOccurrence_1 = __webpack_require__(7812);
var DateTimeUtils = (function () {
    function DateTimeUtils() {
    }
    DateTimeUtils.compareDates = function (date1, date2) {
        if (!date1 || !date2)
            return -1;
        return date2.getTime() - date1.getTime();
    };
    DateTimeUtils.areDatesEqual = function (date1, date2) {
        return this.compareDates(date1, date2) == 0;
    };
    DateTimeUtils.getMaxDate = function (date1, date2) {
        if (!date1 && !date2)
            return null;
        if (!date1)
            return date2;
        if (!date2)
            return date1;
        var diff = this.compareDates(date1, date2);
        return diff > 0 ? date2 : date1;
    };
    DateTimeUtils.getMinDate = function (date1, date2) {
        if (!date1 && !date2)
            return null;
        if (!date1)
            return date2;
        if (!date2)
            return date1;
        var diff = this.compareDates(date1, date2);
        return diff > 0 ? date1 : date2;
    };
    DateTimeUtils.getDaysBetween = function (start, end) {
        var diff = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(diff / this.msInDay);
    };
    DateTimeUtils.getWeeksBetween = function (start, end) {
        var daysBetween = this.getDaysBetween(start, end);
        var numWeeks = Math.floor(daysBetween / 7);
        if (start.getDay() > end.getDay())
            numWeeks++;
        return numWeeks;
    };
    DateTimeUtils.getMonthsDifference = function (start, end) {
        var dateDiff = this.compareDates(start, end);
        var from = dateDiff >= 0 ? start : end;
        var to = dateDiff >= 0 ? end : start;
        var yearsDiff = to.getFullYear() - from.getFullYear();
        var monthDiff = yearsDiff * 12 + (to.getMonth() - from.getMonth());
        return monthDiff;
    };
    DateTimeUtils.getYearsDifference = function (start, end) {
        return Math.abs(end.getFullYear() - start.getFullYear());
    };
    DateTimeUtils.getDayNumber = function (date) {
        return Math.ceil(date.getTime() / this.msInDay);
    };
    DateTimeUtils.getDateByDayNumber = function (num) {
        var date = new Date(num * this.msInDay);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    };
    DateTimeUtils.addDays = function (date, days) {
        return new Date(date.getTime() + days * this.msInDay);
    };
    DateTimeUtils.checkDayOfMonth = function (day, date) {
        return day == date.getDate();
    };
    DateTimeUtils.checkDayOfWeek = function (day, date) {
        return day == date.getDay();
    };
    DateTimeUtils.checkMonth = function (month, date) {
        return month == date.getMonth();
    };
    DateTimeUtils.checkYear = function (year, date) {
        return year == date.getFullYear();
    };
    DateTimeUtils.checkDayOfWeekOccurrenceInMonth = function (date, dayOfWeek, occurrence) {
        var dayOfWeekInMonthDates = this.getSpecificDayOfWeekInMonthDates(dayOfWeek, date.getFullYear(), date.getMonth());
        if (occurrence == DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence.Last)
            return this.areDatesEqual(date, dayOfWeekInMonthDates[dayOfWeekInMonthDates.length - 1]);
        return this.areDatesEqual(date, dayOfWeekInMonthDates[occurrence]);
    };
    DateTimeUtils.getFirstDayOfWeekInMonth = function (year, month) {
        var date = new Date(year, month, 1);
        return date.getDay();
    };
    DateTimeUtils.getSpecificDayOfWeekInMonthDates = function (dayOfWeek, year, month) {
        var firstDayOfWeekInMonth = this.getFirstDayOfWeekInMonth(year, month);
        var diffDays = dayOfWeek >= firstDayOfWeekInMonth ? dayOfWeek - firstDayOfWeekInMonth : dayOfWeek + 7 - firstDayOfWeekInMonth;
        var res = new Array();
        var specificDayOfWeekDate = new Date(year, month, diffDays + 1);
        while (specificDayOfWeekDate.getMonth() == month) {
            res.push(specificDayOfWeekDate);
            specificDayOfWeekDate = this.addDays(specificDayOfWeekDate, 7);
        }
        return res;
    };
    DateTimeUtils.getSpecificDayOfWeekInMonthDate = function (dayOfWeek, year, month, occurrence) {
        var dates = this.getSpecificDayOfWeekInMonthDates(dayOfWeek, year, month);
        if (occurrence == DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence.Last)
            return dates[dates.length - 1];
        return dates[occurrence];
    };
    DateTimeUtils.checkValidDayInMonth = function (year, month, day) {
        if (day < 1 || day > 31 || (new Date(year, month, day)).getMonth() != month)
            return false;
        return true;
    };
    DateTimeUtils.getNextMonth = function (month, inc) {
        if (inc === void 0) { inc = 1; }
        return (month + inc) % 12;
    };
    DateTimeUtils.convertToDate = function (src) {
        if (src instanceof Date)
            return new Date(src);
        var ms = Date.parse(src);
        if (!isNaN(ms))
            return new Date(ms);
        return null;
    };
    DateTimeUtils.convertTimeRangeToDateRange = function (timeRange, dayNumber) {
        var date = this.getDateByDayNumber(dayNumber);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var startT = timeRange.start;
        var start = new Date(year, month, day, startT.hour, startT.min, startT.sec, startT.msec);
        var endT = timeRange.end;
        var end = new Date(year, month, day, endT.hour, endT.min, endT.sec, endT.msec);
        return new DateRange_1.DateRange(start, end);
    };
    DateTimeUtils.convertToTimeRanges = function (src) {
        var _this = this;
        if (src instanceof Array)
            return src.map(function (x) { return _this.convertToTimeRange(x); });
        return this.parseTimeRanges(src);
    };
    DateTimeUtils.convertToTimeRange = function (src) {
        if (!src)
            return null;
        if (src instanceof TimeRange_1.TimeRange)
            return src;
        if ((0, common_1.isDefined)(src.start) && (0, common_1.isDefined)(src.end))
            return new TimeRange_1.TimeRange(this.convertToTime(src.start), this.convertToTime(src.end));
        return this.parseTimeRange(src);
    };
    DateTimeUtils.convertToTime = function (src) {
        if (!src)
            return null;
        if (src instanceof Time_1.Time)
            return src;
        if (src instanceof Date)
            return this.getTimeGromJsDate(src);
        return this.parseTime(src);
    };
    DateTimeUtils.parseTimeRanges = function (src) {
        var _this = this;
        if (!src)
            return null;
        var parts = src.split(/;|,/);
        return parts.map(function (p) { return _this.parseTimeRange(p); }).filter(function (r) { return !!r; });
    };
    DateTimeUtils.parseTimeRange = function (src) {
        if (!src)
            return null;
        var parts = src.split("-");
        var start = parts[0];
        var end = parts[1];
        if ((0, common_1.isDefined)(start) && (0, common_1.isDefined)(end))
            return new TimeRange_1.TimeRange(this.parseTime(start), this.parseTime(end));
        return null;
    };
    DateTimeUtils.parseTime = function (src) {
        if (!src)
            return null;
        var parts = src.split(":");
        var h = parseInt(parts[0]) || 0;
        var m = parseInt(parts[1]) || 0;
        var s = parseInt(parts[2]) || 0;
        var ms = parseInt(parts[3]) || 0;
        return new Time_1.Time(h, m, s, ms);
    };
    DateTimeUtils.getTimeGromJsDate = function (date) {
        if (!date)
            return null;
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var ms = date.getMilliseconds();
        return new Time_1.Time(h, m, s, ms);
    };
    DateTimeUtils.caclTimeDifference = function (time1, time2) {
        return time2.getTimeInMilleconds() - time1.getTimeInMilleconds();
    };
    DateTimeUtils.areTimesEqual = function (time1, time2) {
        return this.caclTimeDifference(time1, time2) == 0;
    };
    DateTimeUtils.getMaxTime = function (time1, time2) {
        if (!time1 && !time2)
            return null;
        if (!time1)
            return time2;
        if (!time2)
            return time1;
        var diff = this.caclTimeDifference(time1, time2);
        return diff > 0 ? time2 : time1;
    };
    DateTimeUtils.getMinTime = function (time1, time2) {
        if (!time1 && !time2)
            return null;
        if (!time1)
            return time2;
        if (!time2)
            return time1;
        var diff = this.caclTimeDifference(time1, time2);
        return diff > 0 ? time1 : time2;
    };
    DateTimeUtils.getLastTimeOfDay = function () {
        return new Time_1.Time(23, 59, 59, 999);
    };
    DateTimeUtils.msInDay = 24 * 3600 * 1000;
    return DateTimeUtils;
}());
exports.DateTimeUtils = DateTimeUtils;


/***/ }),

/***/ 8719:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DayOfWeek = void 0;
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));


/***/ }),

/***/ 7812:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DayOfWeekMonthlyOccurrence = void 0;
var DayOfWeekMonthlyOccurrence;
(function (DayOfWeekMonthlyOccurrence) {
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["First"] = 0] = "First";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Second"] = 1] = "Second";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Third"] = 2] = "Third";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Forth"] = 3] = "Forth";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Last"] = 4] = "Last";
})(DayOfWeekMonthlyOccurrence = exports.DayOfWeekMonthlyOccurrence || (exports.DayOfWeekMonthlyOccurrence = {}));


/***/ }),

/***/ 1805:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DayWorkingTimeInfo = void 0;
var TimeRange_1 = __webpack_require__(9331);
var DateTimeUtils_1 = __webpack_require__(7880);
var Time_1 = __webpack_require__(2753);
var DayWorkingTimeInfo = (function () {
    function DayWorkingTimeInfo(dayNumber, isWorkDay, intervals) {
        if (dayNumber === void 0) { dayNumber = 0; }
        if (isWorkDay === void 0) { isWorkDay = true; }
        if (intervals === void 0) { intervals = null; }
        this._workingIntervals = new Array();
        this.dayNumber = dayNumber;
        this.isWorkDay = isWorkDay;
        this.addWorkingIntervals(intervals);
    }
    DayWorkingTimeInfo.prototype.addWorkingIntervals = function (intervals) {
        if (!intervals)
            return;
        this._workingIntervals = this._workingIntervals.concat(intervals.filter(function (r) { return !!r; }));
        this.rearrangeWorkingIntervals();
    };
    DayWorkingTimeInfo.prototype.rearrangeWorkingIntervals = function () {
        for (var i = 0; i < this._workingIntervals.length; i++)
            this.concatWithIntersectedRanges(this._workingIntervals[i]);
        this.sortIntervals();
    };
    DayWorkingTimeInfo.prototype.concatWithIntersectedRanges = function (range) {
        var _this = this;
        var intersectedRanges = this.getIntersectedIntervals(range);
        intersectedRanges.forEach(function (r) {
            range.concatWith(r);
            _this.removeInterval(r);
        });
    };
    DayWorkingTimeInfo.prototype.getIntersectedIntervals = function (range) {
        return this._workingIntervals.filter(function (r) { return r.hasIntersect(range) && r !== range; });
    };
    DayWorkingTimeInfo.prototype.sortIntervals = function () {
        this._workingIntervals.sort(function (r1, r2) { return DateTimeUtils_1.DateTimeUtils.caclTimeDifference(r2.start, r1.start); });
    };
    DayWorkingTimeInfo.prototype.removeInterval = function (element) {
        var index = this._workingIntervals.indexOf(element);
        if (index > -1 && index < this._workingIntervals.length)
            this._workingIntervals.splice(index, 1);
    };
    DayWorkingTimeInfo.prototype.clearIntervals = function () {
        this._workingIntervals.splice(0, this._workingIntervals.length);
    };
    Object.defineProperty(DayWorkingTimeInfo.prototype, "workingIntervals", {
        get: function () { return this._workingIntervals.slice(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayWorkingTimeInfo.prototype, "noWorkingIntervals", {
        get: function () {
            var res = new Array();
            if (this.isWorkDay && this._workingIntervals.length === 0)
                return res;
            var starts = this._workingIntervals.map(function (r) { return r.end; });
            starts.splice(0, 0, new Time_1.Time());
            var ends = this._workingIntervals.map(function (r) { return r.start; });
            ends.push(DateTimeUtils_1.DateTimeUtils.getLastTimeOfDay());
            for (var i = 0; i < starts.length; i++) {
                var start = starts[i];
                var end = ends[i];
                if (!DateTimeUtils_1.DateTimeUtils.areTimesEqual(start, end))
                    res.push(new TimeRange_1.TimeRange(start, end));
            }
            return res;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayWorkingTimeInfo.prototype, "isWorkDay", {
        get: function () { return this._isWorkDay; },
        set: function (value) {
            this._isWorkDay = value;
            if (!value)
                this.clearIntervals();
        },
        enumerable: false,
        configurable: true
    });
    return DayWorkingTimeInfo;
}());
exports.DayWorkingTimeInfo = DayWorkingTimeInfo;


/***/ }),

/***/ 3110:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Month = void 0;
var Month;
(function (Month) {
    Month[Month["January"] = 0] = "January";
    Month[Month["February"] = 1] = "February";
    Month[Month["March"] = 2] = "March";
    Month[Month["April"] = 3] = "April";
    Month[Month["May"] = 4] = "May";
    Month[Month["June"] = 5] = "June";
    Month[Month["July"] = 6] = "July";
    Month[Month["August"] = 7] = "August";
    Month[Month["September"] = 8] = "September";
    Month[Month["October"] = 9] = "October";
    Month[Month["November"] = 10] = "November";
    Month[Month["December"] = 11] = "December";
})(Month = exports.Month || (exports.Month = {}));


/***/ }),

/***/ 7872:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MonthInfo = void 0;
var DateTimeUtils_1 = __webpack_require__(7880);
var MonthInfo = (function () {
    function MonthInfo(month, year) {
        this.month = month;
        this.year = year;
    }
    MonthInfo.prototype.addMonths = function (months) {
        var nextMonth = DateTimeUtils_1.DateTimeUtils.getNextMonth(this.month, months);
        var yearInc = Math.floor(months / 12);
        if (nextMonth < this.month)
            ++yearInc;
        this.month = nextMonth;
        this.year += yearInc;
    };
    return MonthInfo;
}());
exports.MonthInfo = MonthInfo;


/***/ }),

/***/ 4902:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Daily = void 0;
var tslib_1 = __webpack_require__(655);
var RecurrenceBase_1 = __webpack_require__(1789);
var DateTimeUtils_1 = __webpack_require__(7880);
var Daily = (function (_super) {
    tslib_1.__extends(Daily, _super);
    function Daily() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Daily.prototype.checkDate = function (date) { return true; };
    Daily.prototype.checkInterval = function (date) {
        return DateTimeUtils_1.DateTimeUtils.getDaysBetween(this.start, date) % this.interval == 0;
    };
    Daily.prototype.calculatePointByInterval = function (date) {
        var daysToAdd = this.interval;
        if (!this.isRecurrencePoint(date))
            daysToAdd -= DateTimeUtils_1.DateTimeUtils.getDaysBetween(this.start, date) % this.interval;
        return DateTimeUtils_1.DateTimeUtils.addDays(date, daysToAdd);
    };
    Daily.prototype.calculateNearestPoint = function (date) {
        return DateTimeUtils_1.DateTimeUtils.addDays(date, 1);
    };
    return Daily;
}(RecurrenceBase_1.RecurrenceBase));
exports.Daily = Daily;


/***/ }),

/***/ 4390:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Monthly = void 0;
var tslib_1 = __webpack_require__(655);
var RecurrenceBase_1 = __webpack_require__(1789);
var DateTimeUtils_1 = __webpack_require__(7880);
var MonthInfo_1 = __webpack_require__(7872);
var Monthly = (function (_super) {
    tslib_1.__extends(Monthly, _super);
    function Monthly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Monthly.prototype.checkDate = function (date) {
        if (this._calculateByDayOfWeek)
            return DateTimeUtils_1.DateTimeUtils.checkDayOfWeekOccurrenceInMonth(date, this.dayOfWeekInternal, this.dayOfWeekOccurrenceInternal);
        return DateTimeUtils_1.DateTimeUtils.checkDayOfMonth(this.dayInternal, date);
    };
    Monthly.prototype.checkInterval = function (date) {
        return DateTimeUtils_1.DateTimeUtils.getMonthsDifference(this.start, date) % this.interval == 0;
    };
    Monthly.prototype.calculatePointByInterval = function (date) {
        var start = this.start;
        var monthFromStart = DateTimeUtils_1.DateTimeUtils.getMonthsDifference(start, date);
        var monthToAdd = Math.floor(monthFromStart / this.interval) * this.interval;
        var info = new MonthInfo_1.MonthInfo(start.getMonth(), start.getFullYear());
        info.addMonths(monthToAdd);
        var point = this.getSpecDayInMonth(info.year, info.month);
        if (DateTimeUtils_1.DateTimeUtils.compareDates(point, date) >= 0) {
            info.addMonths(this.interval);
            point = this.getSpecDayInMonth(info.year, info.month);
        }
        return point;
    };
    Monthly.prototype.calculateNearestPoint = function (date) {
        var month = date.getMonth();
        var year = date.getFullYear();
        var point = this.getSpecDayInMonth(year, month);
        if (DateTimeUtils_1.DateTimeUtils.compareDates(point, date) >= 0) {
            var info = new MonthInfo_1.MonthInfo(month, year);
            info.addMonths(1);
            point = this.getSpecDayInMonth(info.year, info.month);
        }
        return point;
    };
    Object.defineProperty(Monthly.prototype, "day", {
        get: function () { return this.dayInternal; },
        set: function (value) { this.dayInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Monthly.prototype, "dayOfWeek", {
        get: function () { return this.dayOfWeekInternal; },
        set: function (value) { this.dayOfWeekInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Monthly.prototype, "dayOfWeekOccurrence", {
        get: function () { return this.dayOfWeekOccurrenceInternal; },
        set: function (value) { this.dayOfWeekOccurrenceInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Monthly.prototype, "calculateByDayOfWeek", {
        get: function () { return this._calculateByDayOfWeek; },
        set: function (value) { this._calculateByDayOfWeek = value; },
        enumerable: false,
        configurable: true
    });
    return Monthly;
}(RecurrenceBase_1.RecurrenceBase));
exports.Monthly = Monthly;


/***/ }),

/***/ 1789:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RecurrenceBase = void 0;
var tslib_1 = __webpack_require__(655);
var DayOfWeek_1 = __webpack_require__(8719);
var DayOfWeekMonthlyOccurrence_1 = __webpack_require__(7812);
var Month_1 = __webpack_require__(3110);
var common_1 = __webpack_require__(2491);
var DateTimeUtils_1 = __webpack_require__(7880);
var RecurrenceFactory_1 = __webpack_require__(9612);
var DataObject_1 = __webpack_require__(6124);
var RecurrenceBase = (function (_super) {
    tslib_1.__extends(RecurrenceBase, _super);
    function RecurrenceBase(start, end, interval, occurrenceCount) {
        if (start === void 0) { start = null; }
        if (end === void 0) { end = null; }
        if (interval === void 0) { interval = 1; }
        if (occurrenceCount === void 0) { occurrenceCount = 0; }
        var _this = _super.call(this) || this;
        _this._start = null;
        _this._end = null;
        _this._interval = 1;
        _this._occurrenceCount = 0;
        _this._dayOfWeek = 0;
        _this._day = 1;
        _this._dayOfWeekOccurrence = 0;
        _this._month = 0;
        _this._calculateByDayOfWeek = false;
        _this.start = start;
        _this.end = end;
        _this.interval = interval;
        _this.occurrenceCount = occurrenceCount;
        return _this;
    }
    RecurrenceBase.prototype.assignFromObject = function (sourceObj) {
        if ((0, common_1.isDefined)(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.start = DateTimeUtils_1.DateTimeUtils.convertToDate(sourceObj.start);
            this.end = DateTimeUtils_1.DateTimeUtils.convertToDate(sourceObj.end);
            if ((0, common_1.isDefined)(sourceObj.interval))
                this.interval = sourceObj.interval;
            if ((0, common_1.isDefined)(sourceObj.occurrenceCount))
                this.occurrenceCount = sourceObj.occurrenceCount;
            if ((0, common_1.isDefined)(sourceObj.dayOfWeek))
                this.dayOfWeekInternal = RecurrenceFactory_1.RecurrenceFactory.getEnumValue(DayOfWeek_1.DayOfWeek, sourceObj.dayOfWeek);
            if ((0, common_1.isDefined)(sourceObj.day))
                this.dayInternal = sourceObj.day;
            if ((0, common_1.isDefined)(sourceObj.dayOfWeekOccurrence))
                this.dayOfWeekOccurrenceInternal = RecurrenceFactory_1.RecurrenceFactory.getEnumValue(DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence, sourceObj.dayOfWeekOccurrence);
            if ((0, common_1.isDefined)(sourceObj.month))
                this.monthInternal = RecurrenceFactory_1.RecurrenceFactory.getEnumValue(Month_1.Month, sourceObj.month);
            if ((0, common_1.isDefined)(sourceObj.calculateByDayOfWeek))
                this._calculateByDayOfWeek = !!sourceObj.calculateByDayOfWeek;
        }
    };
    RecurrenceBase.prototype.calculatePoints = function (start, end) {
        if (!start || !end)
            return new Array();
        var from = DateTimeUtils_1.DateTimeUtils.getMaxDate(start, this._start);
        var to = DateTimeUtils_1.DateTimeUtils.getMinDate(end, this._end);
        if (this._occurrenceCount > 0)
            return this.calculatePointsByOccurrenceCount(from, to);
        return this.calculatePointsByDateRange(from, to);
    };
    RecurrenceBase.prototype.calculatePointsByOccurrenceCount = function (start, end) {
        var points = new Array();
        var point = this.getFirstPoint(start);
        while (!!point && points.length < this._occurrenceCount && DateTimeUtils_1.DateTimeUtils.compareDates(point, end) >= 0) {
            if (this.isRecurrencePoint(point))
                points.push(point);
            point = this.getNextPoint(point);
        }
        return points;
    };
    RecurrenceBase.prototype.calculatePointsByDateRange = function (start, end) {
        var points = new Array();
        var point = this.getFirstPoint(start);
        while (!!point && DateTimeUtils_1.DateTimeUtils.compareDates(point, end) >= 0) {
            if (this.isRecurrencePoint(point))
                points.push(point);
            point = this.getNextPoint(point);
        }
        return points;
    };
    RecurrenceBase.prototype.getFirstPoint = function (start) {
        if (this.isRecurrencePoint(start))
            return start;
        return this.getNextPoint(start);
    };
    RecurrenceBase.prototype.isRecurrencePoint = function (date) {
        return this.isDateInRange(date) && this.checkDate(date) && (!this.useIntervalInCalc() || this.checkInterval(date));
    };
    RecurrenceBase.prototype.isDateInRange = function (date) {
        if (!date)
            return false;
        if (this._start && DateTimeUtils_1.DateTimeUtils.compareDates(this.start, date) < 0)
            return false;
        if (this._occurrenceCount == 0 && this.end && DateTimeUtils_1.DateTimeUtils.compareDates(date, this.end) < 0)
            return false;
        return true;
    };
    RecurrenceBase.prototype.useIntervalInCalc = function () {
        return this.interval > 1 && !!this._start;
    };
    RecurrenceBase.prototype.getNextPoint = function (date) {
        if (!this.isDateInRange(date))
            return null;
        if (this.useIntervalInCalc())
            return this.calculatePointByInterval(date);
        return this.calculateNearestPoint(date);
    };
    RecurrenceBase.prototype.getSpecDayInMonth = function (year, month) {
        var date;
        if (this._calculateByDayOfWeek)
            date = DateTimeUtils_1.DateTimeUtils.getSpecificDayOfWeekInMonthDate(this.dayOfWeekInternal, year, month, this.dayOfWeekOccurrenceInternal);
        else
            date = new Date(year, month, this.dayInternal);
        return date;
    };
    Object.defineProperty(RecurrenceBase.prototype, "dayInternal", {
        get: function () { return this._day; },
        set: function (value) {
            if (value > 0 && value <= 31)
                this._day = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "dayOfWeekInternal", {
        get: function () { return this._dayOfWeek; },
        set: function (dayOfWeek) {
            if (dayOfWeek >= DayOfWeek_1.DayOfWeek.Sunday && dayOfWeek <= DayOfWeek_1.DayOfWeek.Saturday)
                this._dayOfWeek = dayOfWeek;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "dayOfWeekOccurrenceInternal", {
        get: function () {
            return this._dayOfWeekOccurrence;
        },
        set: function (value) {
            if (value >= DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence.First && value <= DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence.Last)
                this._dayOfWeekOccurrence = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "monthInternal", {
        get: function () { return this._month; },
        set: function (value) {
            if (value >= Month_1.Month.January && value <= Month_1.Month.December)
                this._month = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "start", {
        get: function () { return this._start; },
        set: function (date) {
            if (!date)
                return;
            this._start = date;
            if (!!this._end && date > this._end)
                this._end = date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "end", {
        get: function () { return this._end; },
        set: function (date) {
            if (!date)
                return;
            this._end = date;
            if (!!this._start && date < this._start)
                this._start = date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "occurrenceCount", {
        get: function () { return this._occurrenceCount; },
        set: function (value) {
            if (value < 0)
                value = 0;
            this._occurrenceCount = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "interval", {
        get: function () { return this._interval; },
        set: function (value) {
            if (value > 0)
                this._interval = value;
        },
        enumerable: false,
        configurable: true
    });
    return RecurrenceBase;
}(DataObject_1.DataObject));
exports.RecurrenceBase = RecurrenceBase;


/***/ }),

/***/ 9612:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RecurrenceFactory = void 0;
var common_1 = __webpack_require__(2491);
var Daily_1 = __webpack_require__(4902);
var Weekly_1 = __webpack_require__(5475);
var Monthly_1 = __webpack_require__(4390);
var Yearly_1 = __webpack_require__(7515);
var RecurrenceFactory = (function () {
    function RecurrenceFactory() {
    }
    RecurrenceFactory.createRecurrenceByType = function (type) {
        if (!type)
            return null;
        var correctedType = type.toLowerCase();
        switch (correctedType) {
            case "daily":
                return new Daily_1.Daily();
            case "weekly":
                return new Weekly_1.Weekly();
            case "monthly":
                return new Monthly_1.Monthly();
            case "yearly":
                return new Yearly_1.Yearly();
        }
        return null;
    };
    RecurrenceFactory.createRecurrenceFromObject = function (sourceObj) {
        if (!sourceObj)
            return null;
        var recurrence = this.createRecurrenceByType(sourceObj.type);
        if (recurrence)
            recurrence.assignFromObject(sourceObj);
        return recurrence;
    };
    RecurrenceFactory.getEnumValue = function (type, value) {
        if (!(0, common_1.isDefined)(type[value]))
            return null;
        var num = parseInt(value);
        if (!isNaN(num))
            return num;
        return type[value];
    };
    return RecurrenceFactory;
}());
exports.RecurrenceFactory = RecurrenceFactory;


/***/ }),

/***/ 5475:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Weekly = void 0;
var tslib_1 = __webpack_require__(655);
var RecurrenceBase_1 = __webpack_require__(1789);
var DateTimeUtils_1 = __webpack_require__(7880);
var Weekly = (function (_super) {
    tslib_1.__extends(Weekly, _super);
    function Weekly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Weekly.prototype.checkDate = function (date) {
        return DateTimeUtils_1.DateTimeUtils.checkDayOfWeek(this.dayOfWeekInternal, date);
    };
    Weekly.prototype.checkInterval = function (date) {
        return DateTimeUtils_1.DateTimeUtils.getWeeksBetween(this.start, date) % this.interval == 0;
    };
    Weekly.prototype.calculatePointByInterval = function (date) {
        var weeksFromStart = DateTimeUtils_1.DateTimeUtils.getWeeksBetween(this.start, date);
        var intervalCount = Math.floor(weeksFromStart / this.interval);
        var remainder = weeksFromStart % this.interval;
        var isPointOnNewWeek = remainder > 0 || date.getDay() >= this.dayOfWeekInternal;
        if (isPointOnNewWeek)
            intervalCount++;
        var weeksToAdd = intervalCount * this.interval;
        return this.calcNextPointWithWeekCount(this.start, weeksToAdd);
    };
    Weekly.prototype.calculateNearestPoint = function (date) {
        var diff = this.dayOfWeekInternal - date.getDay();
        if (diff > 0)
            return DateTimeUtils_1.DateTimeUtils.addDays(new Date(date), diff);
        return this.calcNextPointWithWeekCount(date, 1);
    };
    Weekly.prototype.calcNextPointWithWeekCount = function (date, weekCount) {
        if (weekCount === void 0) { weekCount = 1; }
        var daysToAdd = weekCount * 7 + this.dayOfWeekInternal - date.getDay();
        return DateTimeUtils_1.DateTimeUtils.addDays(new Date(date), daysToAdd);
    };
    Object.defineProperty(Weekly.prototype, "dayOfWeek", {
        get: function () { return this.dayOfWeekInternal; },
        set: function (value) { this.dayOfWeekInternal = value; },
        enumerable: false,
        configurable: true
    });
    return Weekly;
}(RecurrenceBase_1.RecurrenceBase));
exports.Weekly = Weekly;


/***/ }),

/***/ 7515:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Yearly = void 0;
var tslib_1 = __webpack_require__(655);
var RecurrenceBase_1 = __webpack_require__(1789);
var DateTimeUtils_1 = __webpack_require__(7880);
var Yearly = (function (_super) {
    tslib_1.__extends(Yearly, _super);
    function Yearly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Yearly.prototype.checkDate = function (date) {
        if (!DateTimeUtils_1.DateTimeUtils.checkMonth(this.month, date))
            return false;
        if (this._calculateByDayOfWeek)
            return DateTimeUtils_1.DateTimeUtils.checkDayOfWeekOccurrenceInMonth(date, this.dayOfWeekInternal, this.dayOfWeekOccurrenceInternal);
        return DateTimeUtils_1.DateTimeUtils.checkDayOfMonth(this.dayInternal, date);
    };
    Yearly.prototype.checkInterval = function (date) {
        return DateTimeUtils_1.DateTimeUtils.getYearsDifference(this.start, date) % this.interval == 0;
    };
    Yearly.prototype.calculatePointByInterval = function (date) {
        var yearFromStart = DateTimeUtils_1.DateTimeUtils.getYearsDifference(this.start, date);
        var yearInc = Math.floor(yearFromStart / this.interval) * this.interval;
        var newYear = this.start.getFullYear() + yearInc;
        var point = this.getSpecDayInMonth(newYear, this.monthInternal);
        if (DateTimeUtils_1.DateTimeUtils.compareDates(point, date) >= 0) {
            newYear += this.interval;
            point = this.getSpecDayInMonth(newYear, this.monthInternal);
        }
        return point;
    };
    Yearly.prototype.calculateNearestPoint = function (date) {
        var year = date.getFullYear();
        var point = this.getSpecDayInMonth(year, this.monthInternal);
        if (DateTimeUtils_1.DateTimeUtils.compareDates(point, date) >= 0)
            point = this.getSpecDayInMonth(++year, this.monthInternal);
        return point;
    };
    Object.defineProperty(Yearly.prototype, "month", {
        get: function () { return this.monthInternal; },
        set: function (value) { this.monthInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Yearly.prototype, "day", {
        get: function () { return this.dayInternal; },
        set: function (value) { this.dayInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Yearly.prototype, "dayOfWeek", {
        get: function () { return this.dayOfWeekInternal; },
        set: function (value) { this.dayOfWeekInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Yearly.prototype, "dayOfWeekOccurrence", {
        get: function () { return this.dayOfWeekOccurrenceInternal; },
        set: function (value) { this.dayOfWeekOccurrenceInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Yearly.prototype, "calculateByDayOfWeek", {
        get: function () { return this._calculateByDayOfWeek; },
        set: function (value) { this._calculateByDayOfWeek = value; },
        enumerable: false,
        configurable: true
    });
    return Yearly;
}(RecurrenceBase_1.RecurrenceBase));
exports.Yearly = Yearly;


/***/ }),

/***/ 2753:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Time = void 0;
var Time = (function () {
    function Time(h, min, sec, msec) {
        if (h === void 0) { h = 0; }
        if (min === void 0) { min = 0; }
        if (sec === void 0) { sec = 0; }
        if (msec === void 0) { msec = 0; }
        this._hour = 0;
        this._min = 0;
        this._sec = 0;
        this._msec = 0;
        this._fullmsec = 0;
        this.hour = h;
        this.min = min;
        this.sec = sec;
        this.msec = msec;
    }
    Object.defineProperty(Time.prototype, "hour", {
        get: function () { return this._hour; },
        set: function (h) {
            if (h >= 0 && h < 24) {
                this._hour = h;
                this.updateFullMilleconds();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time.prototype, "min", {
        get: function () { return this._min; },
        set: function (m) {
            if (m >= 0 && m < 60) {
                this._min = m;
                this.updateFullMilleconds();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time.prototype, "sec", {
        get: function () { return this._sec; },
        set: function (s) {
            if (s >= 0 && s < 60) {
                this._sec = s;
                this.updateFullMilleconds();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time.prototype, "msec", {
        get: function () { return this._msec; },
        set: function (ms) {
            if (ms >= 0 && ms < 1000) {
                this._msec = ms;
                this.updateFullMilleconds();
            }
        },
        enumerable: false,
        configurable: true
    });
    Time.prototype.updateFullMilleconds = function () {
        var minutes = this._hour * 60 + this._min;
        var sec = minutes * 60 + this._sec;
        this._fullmsec = sec * 1000 + this._msec;
    };
    Time.prototype.getTimeInMilleconds = function () {
        return this._fullmsec;
    };
    return Time;
}());
exports.Time = Time;


/***/ }),

/***/ 9331:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeRange = void 0;
var DateTimeUtils_1 = __webpack_require__(7880);
var TimeRange = (function () {
    function TimeRange(start, end) {
        var diff = DateTimeUtils_1.DateTimeUtils.caclTimeDifference(start, end);
        if (diff >= 0) {
            this._start = start;
            this._end = end;
        }
        else {
            this._start = end;
            this._end = start;
        }
    }
    Object.defineProperty(TimeRange.prototype, "start", {
        get: function () { return this._start; },
        set: function (time) {
            if (time && DateTimeUtils_1.DateTimeUtils.caclTimeDifference(time, this._end) >= 0)
                this._start = time;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeRange.prototype, "end", {
        get: function () { return this._end; },
        set: function (time) {
            if (time && DateTimeUtils_1.DateTimeUtils.caclTimeDifference(this._start, time) >= 0)
                this._end = time;
        },
        enumerable: false,
        configurable: true
    });
    TimeRange.prototype.isTimeInRange = function (time) {
        return DateTimeUtils_1.DateTimeUtils.caclTimeDifference(this._start, time) >= 0 && DateTimeUtils_1.DateTimeUtils.caclTimeDifference(time, this._end) >= 0;
    };
    TimeRange.prototype.hasIntersect = function (range) {
        return this.isTimeInRange(range.start) || this.isTimeInRange(range.end) || range.isTimeInRange(this.start) || range.isTimeInRange(this.end);
    };
    TimeRange.prototype.concatWith = function (range) {
        if (!this.hasIntersect(range))
            return false;
        this.start = DateTimeUtils_1.DateTimeUtils.getMinTime(this.start, range.start);
        this.end = DateTimeUtils_1.DateTimeUtils.getMaxTime(this.end, range.end);
        return true;
    };
    return TimeRange;
}());
exports.TimeRange = TimeRange;


/***/ }),

/***/ 21:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkingTimeCalculator = void 0;
var GanttWorkingDayRuleCollection_1 = __webpack_require__(4432);
var DayWorkingTimeInfo_1 = __webpack_require__(1805);
var DateTimeUtils_1 = __webpack_require__(7880);
var WorkingTimeCalculator = (function () {
    function WorkingTimeCalculator(range, rules) {
        this._workingRules = new GanttWorkingDayRuleCollection_1.WorkingDayRuleCollection();
        this._workDayList = new Array();
        this._calculationRange = range;
        this._workingRules.importFromObject(rules);
    }
    WorkingTimeCalculator.prototype.calculateWorkDayList = function () {
        if (!this._calculationRange)
            return;
        this.clearList();
        var rules = this._workingRules.items;
        for (var i = 0; i < rules.length; i++)
            this.processRule(rules[i]);
        this.sortList();
    };
    WorkingTimeCalculator.prototype.processRule = function (rule) {
        var points = rule.recurrence.calculatePoints(this._calculationRange.start, this._calculationRange.end);
        var _loop_1 = function (i) {
            var point = points[i];
            var dayNum = DateTimeUtils_1.DateTimeUtils.getDayNumber(point);
            var dayInfo = this_1._workDayList.filter(function (i) { return i.dayNumber == dayNum; })[0];
            if (dayInfo) {
                dayInfo.isWorkDay = dayInfo.isWorkDay && rule.isWorkDay;
                dayInfo.addWorkingIntervals(rule.workTimeRanges);
            }
            else
                this_1._workDayList.push(new DayWorkingTimeInfo_1.DayWorkingTimeInfo(dayNum, rule.isWorkDay, rule.workTimeRanges));
        };
        var this_1 = this;
        for (var i = 0; i < points.length; i++) {
            _loop_1(i);
        }
    };
    WorkingTimeCalculator.prototype.sortList = function () {
        this._workDayList.sort(function (d1, d2) { return d1.dayNumber - d2.dayNumber; });
    };
    WorkingTimeCalculator.prototype.clearList = function () {
        this._workDayList.splice(0, this._workDayList.length);
    };
    WorkingTimeCalculator.prototype.calculateNoWorkTimeIntervals = function () {
        var _this = this;
        var res = new Array();
        if (this._workDayList.length == 0)
            this.calculateWorkDayList();
        this._workDayList.forEach(function (d) { return res = res.concat(_this.getNoWorkTimeRangesFromDay(d)); });
        return this.concatJointedRanges(res);
    };
    WorkingTimeCalculator.prototype.concatJointedRanges = function (list) {
        var res = new Array();
        for (var i = 0; i < list.length; i++) {
            var interval = list[i];
            var needExpandPrevInterval = res.length > 0 && DateTimeUtils_1.DateTimeUtils.compareDates(res[res.length - 1].end, interval.start) < 2;
            if (needExpandPrevInterval)
                res[res.length - 1].end = interval.end;
            else
                res.push(interval);
        }
        return res;
    };
    WorkingTimeCalculator.prototype.getNoWorkTimeRangesFromDay = function (day) {
        return day.noWorkingIntervals.map(function (i) { return DateTimeUtils_1.DateTimeUtils.convertTimeRangeToDateRange(i, day.dayNumber); });
    };
    Object.defineProperty(WorkingTimeCalculator.prototype, "noWorkingIntervals", {
        get: function () {
            if (!this._noWorkingIntervals)
                this._noWorkingIntervals = this.calculateNoWorkTimeIntervals();
            return this._noWorkingIntervals.slice();
        },
        enumerable: false,
        configurable: true
    });
    WorkingTimeCalculator.prototype.updateRange = function (range) {
        this._calculationRange = range;
        this.invalidate();
    };
    WorkingTimeCalculator.prototype.invalidate = function () {
        this._noWorkingIntervals = null;
        this.clearList();
    };
    return WorkingTimeCalculator;
}());
exports.WorkingTimeCalculator = WorkingTimeCalculator;


/***/ }),

/***/ 8401:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkingTimeRule = void 0;
var tslib_1 = __webpack_require__(655);
var DataObject_1 = __webpack_require__(6124);
var common_1 = __webpack_require__(2491);
var DateTimeUtils_1 = __webpack_require__(7880);
var RecurrenceFactory_1 = __webpack_require__(9612);
var Daily_1 = __webpack_require__(4902);
var WorkingTimeRule = (function (_super) {
    tslib_1.__extends(WorkingTimeRule, _super);
    function WorkingTimeRule(recurrence, isWorkDay, workTimeRanges) {
        if (recurrence === void 0) { recurrence = null; }
        if (isWorkDay === void 0) { isWorkDay = true; }
        if (workTimeRanges === void 0) { workTimeRanges = null; }
        var _this = _super.call(this) || this;
        _this.isWorkDay = true;
        _this.workTimeRanges = new Array();
        _this.recurrence = recurrence;
        _this.isWorkDay = isWorkDay;
        if (workTimeRanges)
            _this.workTimeRanges.concat(workTimeRanges);
        return _this;
    }
    WorkingTimeRule.prototype.assignFromObject = function (sourceObj) {
        if ((0, common_1.isDefined)(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.recurrence = RecurrenceFactory_1.RecurrenceFactory.createRecurrenceByType(sourceObj.recurrenceType) || new Daily_1.Daily();
            if ((0, common_1.isDefined)(sourceObj.recurrence))
                this.recurrence.assignFromObject(sourceObj.recurrence);
            if ((0, common_1.isDefined)(sourceObj.isWorkDay))
                this.isWorkDay = !!sourceObj.isWorkDay;
            var ranges = DateTimeUtils_1.DateTimeUtils.convertToTimeRanges(sourceObj.workTimeRanges);
            if (ranges)
                this.workTimeRanges = ranges;
        }
    };
    return WorkingTimeRule;
}(DataObject_1.DataObject));
exports.WorkingTimeRule = WorkingTimeRule;


/***/ }),

/***/ 6626:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GanttViewApi = void 0;
var GanttViewApi = (function () {
    function GanttViewApi(ganttView) {
        this.maxZoom = 3;
        this._ganttView = ganttView;
    }
    Object.defineProperty(GanttViewApi.prototype, "currentZoom", {
        get: function () {
            return this._ganttView.currentZoom;
        },
        set: function (value) {
            this._ganttView.currentZoom = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttViewApi.prototype, "renderHelper", {
        get: function () {
            return this._ganttView.renderHelper;
        },
        enumerable: false,
        configurable: true
    });
    GanttViewApi.prototype.getTaskAreaContainerWidth = function () {
        return this.renderHelper.getTaskAreaContainerWidth();
    };
    GanttViewApi.prototype.updateTickSizeWidth = function () {
        this._ganttView.updateTickSizeWidth();
    };
    Object.defineProperty(GanttViewApi.prototype, "settings", {
        get: function () {
            return this._ganttView.settings;
        },
        enumerable: false,
        configurable: true
    });
    GanttViewApi.prototype.resetAndUpdate = function () {
        this._ganttView.resetAndUpdate();
    };
    GanttViewApi.prototype.scrollToDateCore = function (date, addLeftPos) {
        this._ganttView.scrollToDateCore(date, addLeftPos);
    };
    Object.defineProperty(GanttViewApi.prototype, "ganttOwner", {
        get: function () {
            return this._ganttView.ganttOwner;
        },
        enumerable: false,
        configurable: true
    });
    GanttViewApi.prototype.scrollLeftByViewType = function () {
        this._ganttView.scrollLeftByViewType();
    };
    Object.defineProperty(GanttViewApi.prototype, "dataRange", {
        get: function () {
            return this._ganttView.dataRange;
        },
        enumerable: false,
        configurable: true
    });
    GanttViewApi.prototype.calculateAutoViewType = function (startDate, endDate) {
        return this._ganttView.calculateAutoViewType(startDate, endDate);
    };
    GanttViewApi.prototype.zoomIn = function (leftPos) {
        if (leftPos === void 0) { leftPos = this.getTaskAreaContainerWidth() / 2; }
        var targetDate = this.renderHelper.getTargetDateByPos(leftPos);
        var viewTypeRangeStart = this.settings.viewTypeRange.min;
        if (this.currentZoom < this.maxZoom) {
            this.currentZoom++;
            this.updateTickSizeWidth();
            this.resetAndUpdate();
        }
        else if (this.settings.viewType > viewTypeRangeStart) {
            this.currentZoom = 1;
            this.setViewType(this.settings.viewType - 1, false);
        }
        this.scrollToDateCore(targetDate, -leftPos);
    };
    GanttViewApi.prototype.zoomOut = function (leftPos) {
        if (leftPos === void 0) { leftPos = this.renderHelper.getTaskAreaContainerWidth() / 2; }
        var targetDate = this.renderHelper.getTargetDateByPos(leftPos);
        var viewTypeRangeEnd = this.settings.viewTypeRange.max;
        if (this.currentZoom > 1) {
            this.currentZoom--;
            this.updateTickSizeWidth();
            this.resetAndUpdate();
        }
        else if (this.settings.viewType < viewTypeRangeEnd) {
            this.currentZoom = this.maxZoom;
            this.setViewType(this.settings.viewType + 1, false);
        }
        this.scrollToDateCore(targetDate, -leftPos);
    };
    GanttViewApi.prototype.setViewType = function (viewType, autoPositioning) {
        if (autoPositioning === void 0) { autoPositioning = true; }
        if (viewType == undefined)
            viewType = this.calculateAutoViewType(this.dataRange.start, this.dataRange.end);
        if (this.settings.viewType !== viewType) {
            this.settings.viewType = viewType;
            this.updateTickSizeWidth();
            this.resetAndUpdate();
            if (autoPositioning)
                this.scrollLeftByViewType();
            if (this.ganttOwner.updateGanttViewType)
                this.ganttOwner.updateGanttViewType(viewType);
        }
    };
    GanttViewApi.prototype.setViewTypeRange = function (min, max) {
        if (min !== undefined)
            this.settings.viewTypeRange.min = Math.min(min, max);
        if (max !== undefined)
            this.settings.viewTypeRange.max = Math.max(min, max);
        var viewTypeRangeMin = this.settings.viewTypeRange.min;
        var viewTypeRangeMax = this.settings.viewTypeRange.max;
        var viewType = this.settings.viewType;
        if (viewTypeRangeMin > viewType)
            this.setViewType(viewTypeRangeMin);
        else if (viewTypeRangeMax < viewType)
            this.setViewType(viewTypeRangeMax);
    };
    return GanttViewApi;
}());
exports.GanttViewApi = GanttViewApi;


/***/ }),

/***/ 5098:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskEditController = void 0;
var Enums_1 = __webpack_require__(2449);
var DateRange_1 = __webpack_require__(858);
var dom_1 = __webpack_require__(6907);
var browser_1 = __webpack_require__(9279);
var TaskEditTooltip_1 = __webpack_require__(1886);
var TooltipSettings_1 = __webpack_require__(9080);
var DateUtils_1 = __webpack_require__(9201);
var TaskEditController = (function () {
    function TaskEditController(settings) {
        this.showInfoDelay = 1000;
        this.taskIndex = -1;
        this.successorIndex = -1;
        this.isEditingInProgress = false;
        this.disableTaskEditBox = false;
        this.isTaskEditBoxShown = false;
        this.settings = settings;
        this.createElements();
    }
    Object.defineProperty(TaskEditController.prototype, "taskId", {
        get: function () {
            return this.viewModel.items[this.taskIndex].task.internalId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "successorId", {
        get: function () {
            return this.viewModel.items[this.successorIndex].task.internalId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "task", {
        get: function () {
            return this.viewItem.task;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "viewItem", {
        get: function () {
            return this.viewModel.items[this.taskIndex];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "renderHelper", {
        get: function () {
            return this.settings.getRenderHelper();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "ganttSettings", {
        get: function () {
            return this.settings.getGanttSettings();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "viewModel", {
        get: function () {
            return this.settings.getViewModel();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "commandManager", {
        get: function () {
            return this.settings.getCommandManager();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "updateTaskCommand", {
        get: function () {
            return this.commandManager.updateTaskCommand;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "validationController", {
        get: function () {
            return this.settings.getValidationController();
        },
        enumerable: false,
        configurable: true
    });
    TaskEditController.prototype.raiseTaskMoving = function (task, newStart, newEnd, callback) {
        return this.settings.getModelManipulator().dispatcher.raiseTaskMoving(task, newStart, newEnd, callback);
    };
    Object.defineProperty(TaskEditController.prototype, "tooltip", {
        get: function () {
            var _a;
            (_a = this._tooltip) !== null && _a !== void 0 ? _a : (this._tooltip = new TaskEditTooltip_1.TaskEditTooltip(this.baseElement, this.tooltipSettings, this.renderHelper.elementTextHelperCultureInfo));
            this._tooltip.tooltipSettings = this.tooltipSettings;
            return this._tooltip;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "tooltipSettings", {
        get: function () {
            var _this = this;
            var tooltipSettings = TooltipSettings_1.TooltipSettings.parse({
                getHeaderHeight: this.settings.getRenderHelper().header.clientHeight,
                getTaskProgressTooltipContentTemplate: this.ganttSettings.taskProgressTooltipContentTemplate,
                getTaskTimeTooltipContentTemplate: this.ganttSettings.taskTimeTooltipContentTemplate,
                getTaskTooltipContentTemplate: this.ganttSettings.taskTooltipContentTemplate,
                destroyTemplate: function (container) { _this.settings.destroyTemplate(container); },
                formatDate: function (date) { return _this.settings.formatDate(date); },
                getTaskAreaContainer: function () { return _this.settings.getRenderHelper().taskAreaContainer; }
            });
            return tooltipSettings;
        },
        enumerable: false,
        configurable: true
    });
    TaskEditController.prototype.show = function (taskIndex) {
        if (this.isEditingInProgress || this.disableTaskEditBox)
            return;
        this.taskIndex = taskIndex;
        this.hide();
        this.changeWrapInfo();
        this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
        this.displayDependency();
        if (this.task.isMilestone() && !this.viewItem.isCustom)
            this.baseElement.className = this.baseElement.className + " milestone";
        else {
            if (!this.isTaskUpdateAllowed())
                this.baseElement.className = this.baseElement.className + " " + TaskEditController.CLASSNAMES.TASK_EDIT_HIDE_UPDATING;
            if (this.viewItem.isCustom)
                this.baseElement.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_BOX_CUSTOM);
        }
        var delay = this.settings.getGanttSettings().editing.taskHoverDelay || 0;
        this.taskDateRange = new DateRange_1.DateRange(this.task.start, this.task.end);
        this.displayTaskEditBox(delay);
        this.displayProgressEdit();
        this.displayStartEndEditElements();
    };
    TaskEditController.prototype.displayStartEndEditElements = function () {
        var showElements = !this.task.isMilestone() && this.isTaskUpdateAllowed() && this.canUpdateTask();
        if (!showElements) {
            this.startEdit.style.display = "none";
            this.endEdit.style.display = "none";
        }
        else {
            this.startEdit.style.display = "block";
            this.endEdit.style.display = "block";
        }
    };
    TaskEditController.prototype.displayProgressEdit = function () {
        if (!this.viewItem.isCustom && this.canUpdateTask() && this.isTaskUpdateAllowed() && this.wrapInfo.size.width > this.wrapInfo.size.height) {
            this.progressEdit.style.display = "block";
            this.progressEdit.style.left = ((this.task.normalizedProgress / 100) * this.wrapInfo.size.width - (this.progressEdit.offsetWidth / 2)) + "px";
        }
        else
            this.progressEdit.style.display = "none";
    };
    TaskEditController.prototype.displayDependency = function () {
        if (!this.ganttSettings.editing.enabled || !this.ganttSettings.editing.allowDependencyInsert || !this.ganttSettings.showDependencies)
            this.baseElement.className = this.baseElement.className + " hide-dependency";
    };
    TaskEditController.prototype.changeWrapInfo = function () {
        this.updateWrapInfo();
        this.wrapInfo.assignPosition(this.baseElement);
        this.wrapInfo.assignSize(this.baseElement);
    };
    TaskEditController.prototype.displayTaskEditBox = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        var showFunc = function () {
            _this.renderHelper.taskArea.appendChild(_this.baseElement);
            _this.isTaskEditBoxShown = true;
        };
        if (delay)
            this.timerId = setTimeout(showFunc, delay);
        else
            showFunc();
    };
    TaskEditController.prototype.endEditing = function () {
        this.isEditingInProgress = false;
        this.hide();
    };
    TaskEditController.prototype.hide = function () {
        this.isTaskEditBoxShown = false;
        var parentNode = this.baseElement.parentNode;
        if (parentNode)
            parentNode.removeChild(this.baseElement);
        this.tooltip.hide();
        clearTimeout(this.timerId);
    };
    TaskEditController.prototype.cancel = function () {
        clearTimeout(this.timerId);
    };
    TaskEditController.prototype.showTaskInfo = function (posX, delay) {
        if (delay === void 0) { delay = 500; }
        if (this.timerId)
            delay = this.showInfoDelay;
        this.tooltip.showInfo(this.task, posX, delay);
    };
    TaskEditController.prototype.updateWrapInfo = function () {
        this.wrapInfo = this.getTaskWrapperElementInfo(this.taskIndex);
        this.wrapInfo.position.x--;
    };
    TaskEditController.prototype.isAllowedToConnectTasks = function (taskIndex) {
        var _a;
        var successorViewItem = this.viewModel.items[taskIndex];
        return this.validationController.canCreateDependency(this.taskId, (_a = successorViewItem.task) === null || _a === void 0 ? void 0 : _a.internalId);
    };
    TaskEditController.prototype.showDependencySuccessor = function (taskIndex) {
        if (this.isAllowedToConnectTasks(taskIndex)) {
            this.successorIndex = taskIndex;
            var wrapInfo = this.getTaskWrapperElementInfo(taskIndex);
            wrapInfo.assignPosition(this.dependencySuccessorBaseElement);
            wrapInfo.assignSize(this.dependencySuccessorBaseElement);
            wrapInfo.assignSize(this.dependencySuccessorFrame);
            this.renderHelper.taskArea.appendChild(this.dependencySuccessorBaseElement);
        }
    };
    TaskEditController.prototype.hideDependencySuccessor = function () {
        var parentNode = this.dependencySuccessorBaseElement.parentNode;
        if (parentNode)
            parentNode.removeChild(this.dependencySuccessorBaseElement);
        this.successorIndex = -1;
    };
    TaskEditController.prototype.processProgress = function (position) {
        if (!this.isTaskUpdateAllowed())
            return;
        this.isEditingInProgress = true;
        var progressOffset = position.x - this.wrapInfo.position.x;
        var progress = 0;
        if (position.x > this.wrapInfo.position.x)
            if (position.x < this.wrapInfo.position.x + this.wrapInfo.size.width)
                progress = Math.round((progressOffset) / this.baseElement.clientWidth * 100);
            else
                progress = 100;
        this.progressEdit.style.left = ((progress / 100) *
            this.wrapInfo.size.width - (this.progressEdit.offsetWidth / 2)) + "px";
        this.tooltip.showProgress(progress, dom_1.DomUtils.getAbsolutePositionX(this.progressEdit) + this.progressEdit.offsetWidth / 2);
    };
    TaskEditController.prototype.confirmProgress = function () {
        if (this.isTaskUpdateAllowed()) {
            this.isEditingInProgress = false;
            var progress = Math.round((this.progressEdit.offsetLeft + (this.progressEdit.offsetWidth / 2)) / this.wrapInfo.size.width * 100);
            this.updateTaskCommand.execute(this.taskId, { progress: progress });
        }
    };
    TaskEditController.prototype.processEnd = function (position) {
        if (!this.isTaskUpdateAllowed())
            return;
        this.baseElement.className = this.baseElement.className + " move";
        this.isEditingInProgress = true;
        var positionX = position.x > this.wrapInfo.position.x ? position.x : this.wrapInfo.position.x;
        var width = positionX - this.wrapInfo.position.x;
        this.baseElement.style.width = (width < 1 ? 0 : width) + "px";
        var startDate = this.task.start;
        var date = this.renderHelper.gridLayoutCalculator.getDateByPos(positionX);
        date.setSeconds(0);
        if (date < startDate || width < 1)
            this.taskDateRange.end.setTime(startDate.getTime());
        else
            this.taskDateRange.end = this.getCorrectedDate(this.task.end, date);
        this.tooltip.showTime(startDate, this.taskDateRange.end, dom_1.DomUtils.getAbsolutePositionX(this.baseElement) + this.baseElement.clientWidth);
    };
    TaskEditController.prototype.confirmEnd = function () {
        if (this.isTaskUpdateAllowed()) {
            this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
            this.isEditingInProgress = false;
            this.updateTaskCommand.execute(this.taskId, { end: this.taskDateRange.end });
            this.hide();
            this.updateWrapInfo();
        }
    };
    TaskEditController.prototype.processStart = function (position) {
        if (!this.isTaskUpdateAllowed())
            return;
        this.baseElement.className = this.baseElement.className + " move";
        this.isEditingInProgress = true;
        var positionX = position.x < this.wrapInfo.position.x + this.wrapInfo.size.width ? position.x : this.wrapInfo.position.x + this.wrapInfo.size.width;
        var width = this.wrapInfo.size.width - (positionX - this.wrapInfo.position.x);
        this.baseElement.style.left = positionX + "px";
        this.baseElement.style.width = (width < 1 ? 0 : width) + "px";
        var endDate = this.task.end;
        var date = this.renderHelper.gridLayoutCalculator.getDateByPos(positionX);
        date.setSeconds(0);
        if (date > endDate || width < 1)
            this.taskDateRange.start.setTime(endDate.getTime());
        else
            this.taskDateRange.start = this.getCorrectedDate(this.task.start, date);
        this.tooltip.showTime(this.taskDateRange.start, endDate, dom_1.DomUtils.getAbsolutePositionX(this.baseElement));
    };
    TaskEditController.prototype.confirmStart = function () {
        if (this.isTaskUpdateAllowed()) {
            this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
            this.isEditingInProgress = false;
            this.updateTaskCommand.execute(this.taskId, { start: this.taskDateRange.start });
            this.hide();
            this.updateWrapInfo();
        }
    };
    TaskEditController.prototype.processMove = function (delta) {
        if (this.isTaskUpdateAllowed() && this.isTaskEditBoxShown) {
            this.baseElement.className = this.baseElement.className + " move";
            var left = this.baseElement.offsetLeft + delta;
            this.baseElement.style.left = left + "px";
            var startDate = this.renderHelper.gridLayoutCalculator.getDateByPos(left);
            this.taskDateRange.start = this.getCorrectedDate(this.task.start, startDate);
            var taskPeriod = DateUtils_1.DateUtils.getRangeMSPeriod(this.task.start, this.task.end);
            this.taskDateRange.end = DateUtils_1.DateUtils.getDSTCorrectedTaskEnd(this.taskDateRange.start, taskPeriod);
            this.isEditingInProgress = this.raiseTaskMoving(this.task, this.taskDateRange.start, this.taskDateRange.end, this.onTaskMovingCallback.bind(this));
            if (this.isEditingInProgress)
                this.tooltip.showTime(this.taskDateRange.start, this.taskDateRange.end, dom_1.DomUtils.getAbsolutePositionX(this.baseElement));
            return this.isEditingInProgress;
        }
        return true;
    };
    TaskEditController.prototype.onTaskMovingCallback = function (newStart, newEnd) {
        if (this.taskDateRange.start === newStart && this.taskDateRange.end === newEnd)
            return;
        var calculator = this.renderHelper.gridLayoutCalculator;
        var newLeft = calculator.getPosByDate(newStart);
        var newWidth = calculator.getPosByDate(newEnd) - newLeft;
        this.baseElement.style.left = newLeft + "px";
        this.baseElement.style.width = (newWidth < 1 ? 0 : newWidth) + "px";
        this.taskDateRange.start = newStart;
        this.taskDateRange.end = newEnd;
    };
    TaskEditController.prototype.confirmMove = function () {
        if (this.isTaskUpdateAllowed()) {
            if (!this.ganttSettings.editing.allowDependencyInsert)
                this.baseElement.className = this.baseElement.className + " hide-dependency";
            if (this.isEditingInProgress) {
                this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
                this.updateTaskCommand.execute(this.taskId, { start: this.taskDateRange.start, end: this.taskDateRange.end });
                this.updateWrapInfo();
                this.hide();
                this.isEditingInProgress = false;
            }
        }
    };
    TaskEditController.prototype.getCorrectedDate = function (referenceDate, newDate) {
        if (this.ganttSettings.viewType > Enums_1.ViewType.SixHours) {
            var year = newDate.getFullYear();
            var month = newDate.getMonth();
            var day = newDate.getDate();
            var hours = this.ganttSettings.viewType === Enums_1.ViewType.Days ? newDate.getHours() : referenceDate.getHours();
            var minutes = referenceDate.getMinutes();
            var sec = referenceDate.getSeconds();
            var msec = referenceDate.getMilliseconds();
            return new Date(year, month, day, hours, minutes, sec, msec);
        }
        return newDate;
    };
    TaskEditController.prototype.startDependency = function (pos) {
        this.dependencyLine = document.createElement("DIV");
        this.dependencyLine.className = TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_LINE;
        this.renderHelper.taskArea.appendChild(this.dependencyLine);
        this.startPosition = pos;
    };
    TaskEditController.prototype.processDependency = function (pos) {
        this.isEditingInProgress = true;
        this.drawline(this.startPosition, pos);
    };
    TaskEditController.prototype.endDependency = function (type) {
        this.isEditingInProgress = false;
        if (type != null)
            this.commandManager.createDependencyCommand.execute(this.task.internalId, this.successorId, type);
        var parentNode = this.dependencyLine.parentNode;
        if (parentNode)
            parentNode.removeChild(this.dependencyLine);
        this.dependencyLine = null;
        this.hideDependencySuccessor();
        this.hide();
    };
    TaskEditController.prototype.selectDependency = function (id) {
        if (this.ganttSettings.editing.allowDependencyDelete)
            this.dependencyId = id;
    };
    TaskEditController.prototype.isDependencySelected = function (id) {
        return this.dependencyId && this.dependencyId === id;
    };
    TaskEditController.prototype.deleteSelectedDependency = function () {
        if (this.dependencyId)
            this.commandManager.removeDependencyCommand.execute(this.dependencyId);
    };
    TaskEditController.prototype.getTaskWrapperElementInfo = function (taskIndex) {
        var calculator = this.renderHelper.gridLayoutCalculator;
        var info = calculator.getTaskWrapperElementInfo(taskIndex);
        info.size.width = calculator.getTaskWidth(taskIndex);
        info.size.height = calculator.getTaskHeight(taskIndex);
        return info;
    };
    TaskEditController.prototype.createElements = function () {
        this.baseElement = document.createElement("DIV");
        this.baseFrame = document.createElement("DIV");
        this.baseFrame.className = TaskEditController.CLASSNAMES.TASK_EDIT_FRAME;
        this.baseElement.appendChild(this.baseFrame);
        this.progressEdit = document.createElement("DIV");
        this.progressEdit.className = TaskEditController.CLASSNAMES.TASK_EDIT_PROGRESS;
        this.baseFrame.appendChild(this.progressEdit);
        this.progressEdit.appendChild(document.createElement("DIV"));
        this.dependencyFinish = document.createElement("DIV");
        this.dependencyFinish.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_RIGTH);
        if (browser_1.Browser.TouchUI)
            this.dependencyFinish.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_TOUCH);
        this.baseFrame.appendChild(this.dependencyFinish);
        this.dependencyStart = document.createElement("DIV");
        this.dependencyStart.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_LEFT);
        if (browser_1.Browser.TouchUI)
            this.dependencyStart.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_TOUCH);
        this.baseFrame.appendChild(this.dependencyStart);
        this.startEdit = document.createElement("DIV");
        this.startEdit.className = TaskEditController.CLASSNAMES.TASK_EDIT_START;
        this.baseFrame.appendChild(this.startEdit);
        this.endEdit = document.createElement("DIV");
        this.endEdit.className = TaskEditController.CLASSNAMES.TASK_EDIT_END;
        this.baseFrame.appendChild(this.endEdit);
        this.dependencySuccessorBaseElement = document.createElement("DIV");
        this.dependencySuccessorBaseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX_SUCCESSOR;
        this.dependencySuccessorFrame = document.createElement("DIV");
        this.dependencySuccessorFrame.className = TaskEditController.CLASSNAMES.TASK_EDIT_FRAME_SUCCESSOR;
        this.dependencySuccessorBaseElement.appendChild(this.dependencySuccessorFrame);
        this.dependencySuccessorStart = document.createElement("DIV");
        this.dependencySuccessorStart.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_SUCCESSOR_DEPENDENCY_RIGTH);
        if (browser_1.Browser.TouchUI)
            this.dependencySuccessorStart.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_TOUCH);
        this.dependencySuccessorFrame.appendChild(this.dependencySuccessorStart);
        this.dependencySuccessorFinish = document.createElement("DIV");
        this.dependencySuccessorFinish.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_SUCCESSOR_DEPENDENCY_LEFT);
        if (browser_1.Browser.TouchUI)
            this.dependencySuccessorFinish.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_TOUCH);
        this.dependencySuccessorFrame.appendChild(this.dependencySuccessorFinish);
        this._tooltip = new TaskEditTooltip_1.TaskEditTooltip(this.baseElement, this.tooltipSettings, this.renderHelper.elementTextHelperCultureInfo);
        this.attachEvents();
    };
    TaskEditController.prototype.attachEvents = function () {
        this.onMouseLeaveHandler = function () {
            if (!this.isEditingInProgress)
                this.hide();
        }.bind(this);
        this.baseElement.addEventListener("mouseleave", this.onMouseLeaveHandler);
    };
    TaskEditController.prototype.drawline = function (start, end) {
        if (start.x > end.x) {
            var temp = end;
            end = start;
            start = temp;
        }
        var angle = Math.atan((start.y - end.y) / (end.x - start.x));
        angle = (angle * 180 / Math.PI);
        angle = -angle;
        var length = Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y));
        this.dependencyLine.style.left = start.x + "px";
        this.dependencyLine.style.top = start.y + "px";
        this.dependencyLine.style.width = length + "px";
        this.dependencyLine.style.transform = "rotate(" + angle + "deg)";
    };
    TaskEditController.prototype.canUpdateTask = function () {
        return !this.viewModel.isTaskToCalculateByChildren(this.task.internalId);
    };
    TaskEditController.prototype.isTaskUpdateAllowed = function () {
        var settings = this.ganttSettings.editing;
        return settings.enabled && settings.allowTaskUpdate;
    };
    TaskEditController.prototype.detachEvents = function () {
        var _a;
        (_a = this.baseElement) === null || _a === void 0 ? void 0 : _a.removeEventListener("mouseleave", this.onMouseLeaveHandler);
    };
    TaskEditController.CLASSNAMES = {
        TASK_EDIT_BOX: "dx-gantt-task-edit-wrapper",
        TASK_EDIT_BOX_CUSTOM: "dx-gantt-task-edit-wrapper-custom",
        TASK_EDIT_FRAME: "dx-gantt-task-edit-frame",
        TASK_EDIT_PROGRESS: "dx-gantt-task-edit-progress",
        TASK_EDIT_DEPENDENCY_RIGTH: "dx-gantt-task-edit-dependency-r",
        TASK_EDIT_DEPENDENCY_LEFT: "dx-gantt-task-edit-dependency-l",
        TASK_EDIT_START: "dx-gantt-task-edit-start",
        TASK_EDIT_END: "dx-gantt-task-edit-end",
        TASK_EDIT_DEPENDENCY_LINE: "dx-gantt-task-edit-dependency-line",
        TASK_EDIT_BOX_SUCCESSOR: "dx-gantt-task-edit-wrapper-successor",
        TASK_EDIT_FRAME_SUCCESSOR: "dx-gantt-task-edit-frame-successor",
        TASK_EDIT_SUCCESSOR_DEPENDENCY_RIGTH: "dx-gantt-task-edit-successor-dependency-r",
        TASK_EDIT_SUCCESSOR_DEPENDENCY_LEFT: "dx-gantt-task-edit-successor-dependency-l",
        TASK_EDIT_TOUCH: "dx-gantt-edit-touch",
        TASK_EDIT_HIDE_UPDATING: "hide-updating"
    };
    return TaskEditController;
}());
exports.TaskEditController = TaskEditController;


/***/ }),

/***/ 1886:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskEditTooltip = void 0;
var dom_1 = __webpack_require__(6907);
var TaskEditTooltip = (function () {
    function TaskEditTooltip(parentElement, tooltipSettings, cultureInfo) {
        this.parentElement = parentElement;
        this.cultureInfo = cultureInfo;
        this.tooltipSettings = tooltipSettings;
    }
    Object.defineProperty(TaskEditTooltip.prototype, "baseElement", {
        get: function () {
            if (!this._baseElement)
                this.createTooltipContainer();
            return this._baseElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditTooltip.prototype, "headerHeight", {
        get: function () {
            return this.tooltipSettings.getHeaderHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditTooltip.prototype, "taskAreaContainer", {
        get: function () {
            return this.tooltipSettings.getTaskAreaContainer();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditTooltip.prototype, "taskTooltipContentTemplate", {
        get: function () {
            return this.tooltipSettings.getTaskTooltipContentTemplate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditTooltip.prototype, "taskProgressTooltipContentTemplate", {
        get: function () {
            return this.tooltipSettings.getTaskProgressTooltipContentTemplate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditTooltip.prototype, "taskTimeTooltipContentTemplate", {
        get: function () {
            return this.tooltipSettings.getTaskTimeTooltipContentTemplate;
        },
        enumerable: false,
        configurable: true
    });
    TaskEditTooltip.prototype.destroyTemplate = function (container) {
        this.tooltipSettings.destroyTemplate(container);
    };
    TaskEditTooltip.prototype.formatDate = function (date) {
        return this.tooltipSettings.formatDate(date);
    };
    TaskEditTooltip.prototype.createTooltipContainer = function () {
        this._baseElement = document.createElement("DIV");
        this._baseElement.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_PROGRESS_STATUS;
        this.parentElement.appendChild(this._baseElement);
    };
    TaskEditTooltip.prototype.setDefaultTooltip = function (task) {
        this.defaultTooltip = document.createElement("DIV");
        this.defaultTooltip.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_DEFAULT;
        var titleWrapper = document.createElement("DIV");
        titleWrapper.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_TASK_TITLE;
        var title = document.createElement("SPAN");
        titleWrapper.appendChild(title);
        this.defaultTooltip.appendChild(titleWrapper);
        title.innerText = task.title;
        this.defaultTooltip.appendChild(this.getTimeContent(task.start, task.end));
        if (!isNaN(task.progress)) {
            var progressElement = document.createElement("DIV");
            progressElement.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_PROGRESS_STATUS_TIME;
            var progressTitle = document.createElement("SPAN");
            var progressValue = document.createElement("SPAN");
            progressElement.appendChild(progressTitle);
            progressElement.appendChild(progressValue);
            this.defaultTooltip.appendChild(progressElement);
            progressTitle.innerText = (this.cultureInfo.progress ? this.cultureInfo.progress : "Progress") + ": ";
            progressValue.innerText = task.progress + "%";
        }
        this.baseElement.appendChild(this.defaultTooltip);
    };
    TaskEditTooltip.prototype.setDefaultProgressTooltip = function (progress) {
        this.defaultTooltip = document.createElement("DIV");
        this.defaultTooltip.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_DEFAULT;
        this.defaultTooltip.innerText = progress + "%";
        this.baseElement.appendChild(this.defaultTooltip);
    };
    TaskEditTooltip.prototype.setDefaultTimeTooltip = function (start, end) {
        this.defaultTooltip = document.createElement("DIV");
        this.defaultTooltip.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_DEFAULT;
        this.defaultTooltip.appendChild(this.getTimeContent(start, end));
        this.baseElement.appendChild(this.defaultTooltip);
    };
    TaskEditTooltip.prototype.showInfo = function (task, posX, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        var tooltipTemplateFunction = this.taskTooltipContentTemplate;
        this.destroyTemplate(this.baseElement);
        if (tooltipTemplateFunction)
            tooltipTemplateFunction(this.baseElement, task, function () { _this.showTooltip(posX, false, delay); });
        else {
            this.setDefaultTooltip(task);
            this.showTooltip(posX, false, delay);
        }
    };
    TaskEditTooltip.prototype.showProgress = function (progress, posX) {
        var _this = this;
        var tooltipTemplateFunction = this.taskProgressTooltipContentTemplate;
        this.destroyTemplate(this.baseElement);
        if (tooltipTemplateFunction)
            tooltipTemplateFunction(this.baseElement, { progress: progress }, function () { _this.showTooltip(posX); });
        else {
            this.setDefaultProgressTooltip(progress);
            this.show(posX);
        }
    };
    TaskEditTooltip.prototype.showTime = function (start, end, posX) {
        var _this = this;
        var tooltipTemplateFunction = this.taskTimeTooltipContentTemplate;
        this.destroyTemplate(this.baseElement);
        if (tooltipTemplateFunction)
            tooltipTemplateFunction(this.baseElement, { start: start, end: end }, function () { _this.showTooltip(posX); });
        else {
            this.setDefaultTimeTooltip(start, end);
            this.show(posX);
        }
    };
    TaskEditTooltip.prototype.showTooltip = function (posX, autoHide, delay) {
        var _this = this;
        var _a;
        if (autoHide === void 0) { autoHide = true; }
        if (delay === void 0) { delay = 0; }
        if ((_a = this.baseElement) === null || _a === void 0 ? void 0 : _a.innerHTML) {
            var showInfoFunc = function () {
                _this.show(posX, autoHide);
            };
            if (delay)
                this.timerId = setTimeout(showInfoFunc, delay);
            else
                showInfoFunc();
        }
    };
    TaskEditTooltip.prototype.show = function (posX, autoHide) {
        var _this = this;
        var _a, _b, _c;
        if (autoHide === void 0) { autoHide = true; }
        (_a = this.defaultTooltip) === null || _a === void 0 ? void 0 : _a.classList.remove(TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_ARROW_AFTER);
        (_b = this.defaultTooltip) === null || _b === void 0 ? void 0 : _b.classList.remove(TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_ARROW_BEFORE);
        this.baseElement.style.display = "block";
        var leftPosition = this.getLeftPosition(posX);
        var isShowingUnder = this.needToShowUnderParent();
        var topPosition = this.getTopPosition(isShowingUnder);
        var arrowClassName = isShowingUnder ? TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_ARROW_AFTER : TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_ARROW_BEFORE;
        (_c = this.defaultTooltip) === null || _c === void 0 ? void 0 : _c.classList.add(arrowClassName);
        this.baseElement.style.left = leftPosition + "px";
        this.baseElement.style.top = topPosition + "px";
        if (autoHide) {
            if (this.timerId)
                clearTimeout(this.timerId);
            this.timerId = setTimeout(function () {
                _this.hide();
            }, 1500);
        }
    };
    TaskEditTooltip.prototype.hide = function () {
        this.baseElement.style.display = "none";
        this.destroyTemplate(this.baseElement);
        clearTimeout(this.timerId);
    };
    TaskEditTooltip.prototype.getTimeContent = function (start, end) {
        var timeElement = document.createElement("TABLE");
        timeElement.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_PROGRESS_STATUS_TIME;
        var body = document.createElement("TBODY");
        timeElement.appendChild(body);
        var startEl = document.createElement("TR");
        var startTitle = document.createElement("TD");
        var startValue = document.createElement("TD");
        var endEl = document.createElement("TR");
        var endTitle = document.createElement("TD");
        var endValue = document.createElement("TD");
        startEl.appendChild(startTitle);
        startEl.appendChild(startValue);
        endEl.appendChild(endTitle);
        endEl.appendChild(endValue);
        body.appendChild(startEl);
        body.appendChild(endEl);
        startTitle.innerText = (this.cultureInfo.start ? this.cultureInfo.start : "Start") + ": ";
        startValue.innerText = this.formatDate(start);
        endTitle.innerText = (this.cultureInfo.end ? this.cultureInfo.end : "End") + ": ";
        endValue.innerText = this.formatDate(end);
        return timeElement;
    };
    TaskEditTooltip.prototype.getLeftPosition = function (absolutePosition) {
        var parentAbsoluteX = dom_1.DomUtils.getAbsolutePositionX(this.parentElement);
        var leftPosition = absolutePosition - parentAbsoluteX - 2 * TaskEditTooltip.defaultArrowHeight;
        if (this.taskAreaContainer) {
            var rightBorder = dom_1.DomUtils.getAbsolutePositionX(this.taskAreaContainer.getElement()) + this.taskAreaContainer.getWidth();
            var rightOverflow = absolutePosition + this.baseElement.clientWidth - rightBorder;
            if (rightOverflow > 0)
                leftPosition -= rightOverflow;
        }
        return leftPosition;
    };
    TaskEditTooltip.prototype.getTopPosition = function (isShowingUnder) {
        return isShowingUnder ? this.parentElement.clientHeight + TaskEditTooltip.defaultArrowHeight : -this.baseElement.clientHeight - TaskEditTooltip.defaultArrowHeight;
    };
    TaskEditTooltip.prototype.needToShowUnderParent = function () {
        var _a;
        var absolutePositionY = dom_1.DomUtils.getAbsolutePositionY(this.parentElement);
        var distanceToScreenTop = absolutePositionY - this.headerHeight - dom_1.DomUtils.getDocumentScrollTop() - TaskEditTooltip.defaultHeightOffset;
        var taskAreaContScrollTop = ((_a = this.taskAreaContainer) === null || _a === void 0 ? void 0 : _a.scrollTop) || 0;
        var distanceToTaskAreaTop = this.parentElement.offsetTop - taskAreaContScrollTop;
        return this.baseElement.clientHeight > distanceToScreenTop || this.baseElement.clientHeight > distanceToTaskAreaTop;
    };
    TaskEditTooltip.CLASSNAMES = {
        TASK_EDIT_PROGRESS_STATUS: "dx-gantt-task-edit-tooltip",
        TASK_EDIT_TOOLTIP_DEFAULT: "dx-gantt-task-edit-tooltip-default",
        TASK_EDIT_TASK_TITLE: "dx-gantt-task-title",
        TASK_EDIT_PROGRESS_STATUS_TIME: "dx-gantt-status-time",
        TASK_EDIT_TOOLTIP_ARROW_BEFORE: "dx-gantt-task-edit-tooltip-before",
        TASK_EDIT_TOOLTIP_ARROW_AFTER: "dx-gantt-task-edit-tooltip-after"
    };
    TaskEditTooltip.defaultArrowHeight = 5;
    TaskEditTooltip.defaultHeightOffset = 15;
    return TaskEditTooltip;
}());
exports.TaskEditTooltip = TaskEditTooltip;


/***/ }),

/***/ 3336:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GanttMovingHelper = void 0;
var browser_1 = __webpack_require__(9279);
var evt_1 = __webpack_require__(3714);
var GanttMovingHelper = (function () {
    function GanttMovingHelper(taskAreaContainer) {
        this.taskAreaContainer = taskAreaContainer;
        this.movingInfo = null;
    }
    GanttMovingHelper.prototype.startMoving = function (e) {
        this.movingInfo = this.calcMovingInfo(e);
        this.updateGanttAreaCursor(true);
    };
    GanttMovingHelper.prototype.cancelMoving = function () {
        this.movingInfo = null;
    };
    GanttMovingHelper.prototype.onMouseMove = function (e) {
        this.move(e);
    };
    GanttMovingHelper.prototype.onMouseUp = function (e) {
        this.cancelMoving();
        this.updateGanttAreaCursor(false);
    };
    GanttMovingHelper.prototype.move = function (e) {
        this.updateScrollPosition(e);
    };
    GanttMovingHelper.prototype.updateScrollPosition = function (e) {
        var newEventX = Math.round(evt_1.EvtUtils.getEventX(e));
        var newEventY = Math.round(evt_1.EvtUtils.getEventY(e));
        var deltaX = newEventX - this.movingInfo.eventX;
        var deltaY = newEventY - this.movingInfo.eventY;
        var dirX = deltaX < 0 ? -1 : 1;
        var dirY = deltaY < 0 ? -1 : 1;
        var maxDeltaX = dirX < 0 ? this.movingInfo.maxRightDelta : this.movingInfo.maxLeftDelta;
        var maxDeltaY = dirY < 0 ? this.movingInfo.maxBottomDelta : this.movingInfo.maxTopDelta;
        if (Math.abs(deltaX) > maxDeltaX)
            deltaX = maxDeltaX * dirX;
        if (Math.abs(deltaY) > maxDeltaY)
            deltaY = maxDeltaY * dirY;
        var newScrollLeft = this.movingInfo.scrollLeft - deltaX;
        var newScrollTop = this.movingInfo.scrollTop - deltaY;
        var taskAreaContainer = this.taskAreaContainer;
        if (taskAreaContainer.scrollLeft !== newScrollLeft)
            taskAreaContainer.scrollLeft = newScrollLeft;
        if (taskAreaContainer.scrollTop !== newScrollTop)
            taskAreaContainer.scrollTop = newScrollTop;
    };
    GanttMovingHelper.prototype.calcMovingInfo = function (e) {
        var taskAreaContainer = this.taskAreaContainer;
        return {
            eventX: evt_1.EvtUtils.getEventX(e),
            eventY: evt_1.EvtUtils.getEventY(e),
            scrollLeft: taskAreaContainer.scrollLeft,
            scrollTop: taskAreaContainer.scrollTop,
            maxLeftDelta: taskAreaContainer.scrollLeft,
            maxRightDelta: taskAreaContainer.scrollWidth - taskAreaContainer.scrollLeft - taskAreaContainer.getElement().offsetWidth,
            maxTopDelta: taskAreaContainer.scrollTop,
            maxBottomDelta: taskAreaContainer.scrollHeight - taskAreaContainer.scrollTop - taskAreaContainer.getElement().offsetHeight
        };
    };
    GanttMovingHelper.prototype.updateGanttAreaCursor = function (drag) {
        var moveCursor = browser_1.Browser.IE ? "move" : "grabbing";
        this.taskAreaContainer.getElement().style.cursor = drag ? moveCursor : "default";
    };
    return GanttMovingHelper;
}());
exports.GanttMovingHelper = GanttMovingHelper;


/***/ }),

/***/ 6958:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaStateController = void 0;
var point_1 = __webpack_require__(8900);
var dom_1 = __webpack_require__(6907);
var evt_1 = __webpack_require__(3714);
var TaskEditController_1 = __webpack_require__(5098);
var Enums_1 = __webpack_require__(2449);
var TaskAreaDefaultState_1 = __webpack_require__(5376);
var TaskAreaDependencyState_1 = __webpack_require__(4264);
var TaskAreaDomHelper_1 = __webpack_require__(9155);
var TaskAreaScrollState_1 = __webpack_require__(125);
var TaskAreaStateEventNames_1 = __webpack_require__(1404);
var TaskAreaZoomState_1 = __webpack_require__(6591);
var TaskEditState_1 = __webpack_require__(2395);
var TaskMoveState_1 = __webpack_require__(7295);
var TaskAreaStateController = (function () {
    function TaskAreaStateController(listener, taskArea, cellSize) {
        var _this = this;
        this.position = new point_1.Point(-1, -1);
        this._pointers = {};
        this._listener = listener;
        this._listener.setHandler(TaskAreaStateEventNames_1.TaskAreaStateEventNames.STATE_EXIT, function () { _this.switchToDefaultState(); });
        this._listener.setHandler(TaskAreaStateEventNames_1.TaskAreaStateEventNames.GET_POINTERS_INFO, function (args) { return _this.getPointersInfo(args.triggerEvent); });
        this._taskArea = taskArea;
        this._cellSize = cellSize;
        this.switchToDefaultState();
    }
    TaskAreaStateController.prototype.onKeyDown = function (evt) { this._state.onKeyDown(evt); };
    TaskAreaStateController.prototype.onScroll = function (evt) { this._state.onScroll(evt); };
    TaskAreaStateController.prototype.onContextMenu = function (evt) { this._state.onContextMenu(evt); };
    TaskAreaStateController.prototype.onMouseWheel = function (evt) {
        if (evt.ctrlKey) {
            evt.preventDefault();
            evt.stopPropagation();
            this.switchState(TaskAreaZoomState_1.TaskAreaZoomState);
        }
        this._state.onMouseWheel(evt);
    };
    Object.defineProperty(TaskAreaStateController.prototype, "currentState", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaStateController.prototype.onTaskPointerEnter = function (evt) { this._state.onTaskPointerEnter(evt); };
    TaskAreaStateController.prototype.onTaskAreaPointerLeave = function (evt) { this._state.onTaskAreaLeave(evt); };
    TaskAreaStateController.prototype.onDocumentPointerCancel = function (evt) { this._clearPointerInfo(evt); };
    TaskAreaStateController.prototype.onDocumentPointerDown = function (evt) {
        this._updatePinterInfo(evt);
        this.toggleStateOnPointerDown(evt);
        this._state.onDocumentPointerDown(evt);
    };
    TaskAreaStateController.prototype.onDocumentPointerMove = function (evt) {
        this._updatePinterInfo(evt);
        this.toggleStateOnPointerMove(evt);
        this._state.onDocumentPointerMove(evt);
    };
    TaskAreaStateController.prototype.onDocumentPointerUp = function (evt) {
        this._clearPointerInfo(evt);
        this._state.onDocumentPointerUp(evt);
    };
    TaskAreaStateController.prototype.onTaskTouchStart = function (evt) { this._state.onTaskTouchStart(evt); };
    TaskAreaStateController.prototype.onTouchStart = function (evt) {
        this.toggleStateOnPointerDown(evt);
        this._state.onTouchStart(evt);
    };
    TaskAreaStateController.prototype.onTouchEnd = function (evt) {
        this._state.onTouchEnd(evt);
    };
    TaskAreaStateController.prototype.onTouchMove = function (evt) {
        this.toggleStateOnPointerMove(evt);
        this._state.onTouchMove(evt);
    };
    TaskAreaStateController.prototype.onClick = function (evt) { this._state.onClick(evt); };
    TaskAreaStateController.prototype.onDblClick = function (evt) { this._state.onDblClick(evt); };
    TaskAreaStateController.prototype.onTaskAreaMouseLeave = function (evt) { this._state.onTaskAreaLeave(evt); };
    TaskAreaStateController.prototype.onTaskElementHover = function (evt) { this._state.onTaskHover(evt); };
    TaskAreaStateController.prototype.onTaskElementLeave = function (evt) { this._state.onTaskLeave(evt); };
    TaskAreaStateController.prototype.onMouseUp = function (evt) { this._state.onMouseUp(evt); };
    TaskAreaStateController.prototype.onMouseMove = function (evt) { this._state.onMouseMove(evt); };
    TaskAreaStateController.prototype.onMouseDown = function (evt) {
        var source = this.getTaskAreaEventSource(evt);
        switch (source) {
            case Enums_1.TaskAreaEventSource.TaskArea:
                this.processMouseDownOnTaskArea(evt);
                break;
            case Enums_1.TaskAreaEventSource.TaskEdit_Frame:
                this.switchState(TaskMoveState_1.TaskMoveState);
                break;
            case Enums_1.TaskAreaEventSource.TaskEdit_Progress:
            case Enums_1.TaskAreaEventSource.TaskEdit_Start:
            case Enums_1.TaskAreaEventSource.TaskEdit_End:
                this.switchState(TaskEditState_1.TaskEditState);
                break;
            case Enums_1.TaskAreaEventSource.TaskEdit_DependencyStart:
            case Enums_1.TaskAreaEventSource.TaskEdit_DependencyFinish:
                this.switchState(TaskAreaDependencyState_1.TaskAreaDependencyState);
                break;
        }
        this._state.onMouseDown(evt);
    };
    Object.defineProperty(TaskAreaStateController.prototype, "taskArea", {
        get: function () {
            return this._taskArea;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaStateController.prototype.switchToDefaultState = function () {
        this._state = new TaskAreaDefaultState_1.TaskAreaDefaultState(this._listener, this.taskArea, this._cellSize);
    };
    TaskAreaStateController.prototype.switchState = function (type) {
        if (this._state instanceof type)
            return;
        if (this._state)
            this._state.finish();
        this._state = new type(this._listener, this.taskArea, this._cellSize);
        this._state.start();
    };
    TaskAreaStateController.prototype.processMouseDownOnTaskArea = function (evt) {
        if (evt_1.EvtUtils.isLeftButtonPressed(evt) && !TaskAreaDomHelper_1.TaskAreaDomHelper.isConnectorLine(evt))
            this.switchState(TaskAreaScrollState_1.TaskAreaScrollState);
    };
    TaskAreaStateController.prototype.toggleStateOnPointerDown = function (evt) {
        var touchProcessed = this.toggleStateWhenMultiOrOutsideTouch(evt);
        this.position = new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt));
        if (!touchProcessed && this._canStartDrag(evt)) {
            var source = this.getTaskAreaEventSource(evt);
            switch (source) {
                case Enums_1.TaskAreaEventSource.TaskEdit_DependencyStart:
                case Enums_1.TaskAreaEventSource.TaskEdit_DependencyFinish:
                    this.switchState(TaskAreaDependencyState_1.TaskAreaDependencyState);
                    break;
                case Enums_1.TaskAreaEventSource.TaskEdit_Progress:
                case Enums_1.TaskAreaEventSource.TaskEdit_Start:
                case Enums_1.TaskAreaEventSource.TaskEdit_End:
                    this.switchState(TaskEditState_1.TaskEditState);
                    break;
            }
        }
    };
    TaskAreaStateController.prototype.toggleStateOnPointerMove = function (evt) {
        var touchProcessed = this.toggleStateWhenMultiOrOutsideTouch(evt);
        var isMove = Math.abs(this.position.x - evt_1.EvtUtils.getEventX(evt)) > 1 || Math.abs(this.position.y - evt_1.EvtUtils.getEventY(evt)) > 1;
        if (!touchProcessed && isMove && this._canStartDrag(evt) && this._state instanceof TaskAreaDefaultState_1.TaskAreaDefaultState)
            switch (this.getTaskAreaEventSource(evt)) {
                case Enums_1.TaskAreaEventSource.TaskArea:
                    if (this.checkEventInTaskEditFrameArea(evt))
                        this.switchState(TaskMoveState_1.TaskMoveState);
                    else
                        this.switchState(TaskAreaScrollState_1.TaskAreaScrollState);
                    break;
                case Enums_1.TaskAreaEventSource.TaskEdit_Frame:
                    if (!this.isTaskUpdateDisabled())
                        this.switchState(TaskMoveState_1.TaskMoveState);
                    else
                        this.switchState(TaskAreaScrollState_1.TaskAreaScrollState);
                    break;
                case Enums_1.TaskAreaEventSource.TaskEdit_Progress:
                case Enums_1.TaskAreaEventSource.TaskEdit_Start:
                case Enums_1.TaskAreaEventSource.TaskEdit_End:
                    this.switchState(TaskEditState_1.TaskEditState);
                    break;
            }
    };
    TaskAreaStateController.prototype.toggleStateWhenMultiOrOutsideTouch = function (evt) {
        var touchCount = this._getActivePointersCount(evt);
        var isOutside = !this.isInTaskArea(evt);
        var processed = touchCount >= 2 || isOutside;
        if (touchCount > 2 || isOutside)
            this.switchState(TaskAreaDefaultState_1.TaskAreaDefaultState);
        else if (touchCount === 2)
            this.switchState(TaskAreaZoomState_1.TaskAreaZoomState);
        return processed;
    };
    TaskAreaStateController.prototype.checkEventInTaskEditFrameArea = function (evt) {
        var _a, _b;
        var frame = this.getTaskEditFrameElement();
        if (this.isTaskUpdateDisabled() || !frame)
            return false;
        var eventX = (evt === null || evt === void 0 ? void 0 : evt.clientX) || ((_a = evt === null || evt === void 0 ? void 0 : evt.touches[0]) === null || _a === void 0 ? void 0 : _a.clientX);
        var eventY = (evt === null || evt === void 0 ? void 0 : evt.clientY) || ((_b = evt === null || evt === void 0 ? void 0 : evt.touches[0]) === null || _b === void 0 ? void 0 : _b.clientY);
        var rect = frame.getBoundingClientRect();
        return eventX >= rect.left && eventX <= rect.left + rect.width && eventY >= rect.top && eventY <= rect.top + rect.height;
    };
    TaskAreaStateController.prototype.isTaskUpdateDisabled = function () {
        return this._taskArea.getAttribute("task-edit-enabled") === "false";
    };
    TaskAreaStateController.prototype.isInTaskArea = function (evt) {
        return dom_1.DomUtils.isItParent(this._taskArea, evt_1.EvtUtils.getEventSource(evt));
    };
    TaskAreaStateController.prototype.getTaskEditFrameElement = function () {
        return this._taskArea.getElementsByClassName(TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_FRAME)[0];
    };
    TaskAreaStateController.prototype._updatePinterInfo = function (evt) {
        var key = evt.pointerId;
        this._pointers[key] = {
            pageX: evt.pageX,
            pageY: evt.pageY,
            pointerType: evt.pointerType
        };
    };
    TaskAreaStateController.prototype._clearPointerInfo = function (evt) {
        var key = evt.pointerId;
        delete this._pointers[key];
    };
    TaskAreaStateController.prototype.isTouchEvent = function (evt) { return TaskAreaDomHelper_1.TaskAreaDomHelper.isTouchEvent(evt); };
    TaskAreaStateController.prototype.isPointerEvent = function (evt) { return TaskAreaDomHelper_1.TaskAreaDomHelper.isPointerEvent(evt); };
    TaskAreaStateController.prototype._getActivePointersCount = function (evt) {
        var _this = this;
        if (this.isTouchEvent(evt))
            return evt.touches.length;
        return Object.keys(this._pointers).filter(function (p) { return _this._pointers[p].pointerType === evt.pointerType; }).length;
    };
    TaskAreaStateController.prototype.getPointersInfo = function (evt) {
        var _this = this;
        var pointerType = evt === null || evt === void 0 ? void 0 : evt.pointerType;
        var pointers = Object.keys(this._pointers).map(function (k) { return _this._pointers[k]; });
        if (pointerType)
            pointers = pointers.filter(function (p) { return p.pointerType === pointerType; });
        return pointers;
    };
    TaskAreaStateController.prototype._canStartDrag = function (evt) {
        if (this._getActivePointersCount(evt) > 1)
            return false;
        var isMouse = TaskAreaDomHelper_1.TaskAreaDomHelper.isMousePointer(evt);
        if (isMouse && evt.buttons !== 1)
            return false;
        if (TaskAreaDomHelper_1.TaskAreaDomHelper.isConnectorLine(evt))
            return false;
        return true;
    };
    TaskAreaStateController.prototype.getTaskAreaEventSource = function (evt) {
        return TaskAreaDomHelper_1.TaskAreaDomHelper.getEventSource(evt_1.EvtUtils.getEventSource(evt));
    };
    return TaskAreaStateController;
}());
exports.TaskAreaStateController = TaskAreaStateController;


/***/ }),

/***/ 5376:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaDefaultState = void 0;
var tslib_1 = __webpack_require__(655);
var evt_1 = __webpack_require__(3714);
var TaskAreaDomHelper_1 = __webpack_require__(9155);
var TaskAreaStateBase_1 = __webpack_require__(5867);
var TaskAreaStateEventNames_1 = __webpack_require__(1404);
var TaskAreaDefaultState = (function (_super) {
    tslib_1.__extends(TaskAreaDefaultState, _super);
    function TaskAreaDefaultState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskAreaDefaultState.prototype.finish = function () {
        this.clearTimers();
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.CONTEXTMENU_HIDE);
    };
    TaskAreaDefaultState.prototype.onMouseDownInternal = function (evt) { this.onPointerDownBase(evt); };
    TaskAreaDefaultState.prototype.onDocumentPointerDownInternal = function (evt) { this.onPointerDownBase(evt); };
    TaskAreaDefaultState.prototype.onDocumentPointerUpInternal = function (evt) { this.onPointerUpBase(evt); };
    TaskAreaDefaultState.prototype.onDocumentPointerMoveInternal = function (evt) { this.clearTimers(); };
    TaskAreaDefaultState.prototype.onTouchStartInternal = function (evt) { this.onPointerDownBase(evt); };
    TaskAreaDefaultState.prototype.onTouchEndInternal = function (evt) { this.onPointerUpBase(evt); };
    TaskAreaDefaultState.prototype.onTouchMoveInternal = function (evt) { this.clearTimers(); };
    TaskAreaDefaultState.prototype.onPointerDownBase = function (evt) {
        var _this = this;
        evt.preventDefault();
        this._lastTouchRowIndex = this.getClickedRowIndex(evt);
        var isMouse = this.isPointerEvent(evt) ? TaskAreaDomHelper_1.TaskAreaDomHelper.isMousePointer(evt) : this.isMouseEvent(evt);
        if (isMouse)
            this.changeSelectionOnTouchDown(evt);
        else {
            setTimeout(function () {
                if (!TaskAreaDomHelper_1.TaskAreaDomHelper.isMousePointer(evt))
                    _this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.CONTEXTMENU_HIDE, evt);
                _this.changeSelectionOnTouchDown(evt);
            }, 0);
            clearTimeout(this._contextMenuTimer);
            this._contextMenuTimer = setTimeout(function () { return _this.showContextMenuOnTouchDown(evt); }, TaskAreaDefaultState.defaultContextMenuTimeout);
        }
    };
    TaskAreaDefaultState.prototype.onPointerUpBase = function (evt) {
        var _this = this;
        clearTimeout(this._contextMenuTimer);
        evt.preventDefault();
        if (this.canToEmulateClick(evt)) {
            var rowIndex = this.getClickedRowIndex(evt);
            var now = new Date();
            if (!this._lastEmulatedClickTime) {
                var clickCanceled = !this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_CLICK, evt, rowIndex);
                clearTimeout(this._dblClickClearTimer);
                if (TaskAreaDomHelper_1.TaskAreaDomHelper.isMousePointer(evt))
                    this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.CONTEXTMENU_HIDE, evt);
                if (!clickCanceled) {
                    this._lastEmulatedClickTime = now;
                    this._dblClickClearTimer = setTimeout(function () { delete _this._lastEmulatedClickTime; }, TaskAreaDefaultState.defaultDblClickClearTimeout);
                }
            }
            else if (now.getTime() - this._lastEmulatedClickTime.getTime() < TaskAreaDefaultState.defaultDblClickTimeout) {
                this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_DBLCLICK, evt, rowIndex);
                delete this._lastEmulatedClickTime;
            }
        }
    };
    TaskAreaDefaultState.prototype.canToEmulateClick = function (evt) {
        var isDependency = TaskAreaDomHelper_1.TaskAreaDomHelper.isConnectorLine(evt);
        var canEmulate = !isDependency && this.getClickedRowIndex(evt) === this._lastTouchRowIndex;
        if (canEmulate && TaskAreaDomHelper_1.TaskAreaDomHelper.isMousePointer(evt))
            canEmulate && (canEmulate = evt.button !== 2);
        return canEmulate;
    };
    TaskAreaDefaultState.prototype.changeSelectionOnTouchDown = function (evt) {
        var isDependency = TaskAreaDomHelper_1.TaskAreaDomHelper.isConnectorLine(evt);
        if (!isDependency)
            this.raiseTaskSelection(evt, this.getClickedRowIndex(evt));
        this.raiseDependencySelection(evt, isDependency ? evt_1.EvtUtils.getEventSource(evt).getAttribute("dependency-id") : null);
    };
    TaskAreaDefaultState.prototype.showContextMenuOnTouchDown = function (evt) {
        var isDependency = TaskAreaDomHelper_1.TaskAreaDomHelper.isConnectorLine(evt);
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.CONTEXTMENU_SHOW, evt, this.getClickedRowIndex(evt), { type: isDependency ? "dependency" : "task" });
    };
    TaskAreaDefaultState.prototype.clearTimers = function () {
        clearTimeout(this._contextMenuTimer);
        clearTimeout(this._dblClickClearTimer);
        delete this._lastEmulatedClickTime;
    };
    TaskAreaDefaultState.defaultContextMenuTimeout = 3000;
    TaskAreaDefaultState.defaultDblClickTimeout = 500;
    TaskAreaDefaultState.defaultDblClickClearTimeout = TaskAreaDefaultState.defaultDblClickTimeout + 100;
    return TaskAreaDefaultState;
}(TaskAreaStateBase_1.TaskAreaStateBase));
exports.TaskAreaDefaultState = TaskAreaDefaultState;


/***/ }),

/***/ 4264:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaDependencyState = exports.dependencyMap = void 0;
var tslib_1 = __webpack_require__(655);
var point_1 = __webpack_require__(8900);
var dom_1 = __webpack_require__(6907);
var evt_1 = __webpack_require__(3714);
var Enums_1 = __webpack_require__(5950);
var Enums_2 = __webpack_require__(2449);
var TaskAreaDomHelper_1 = __webpack_require__(9155);
var TaskAreaStateBase_1 = __webpack_require__(5867);
var TaskAreaStateEventNames_1 = __webpack_require__(1404);
exports.dependencyMap = [];
exports.dependencyMap[Enums_2.TaskAreaEventSource.TaskEdit_DependencyStart] = [];
exports.dependencyMap[Enums_2.TaskAreaEventSource.TaskEdit_DependencyFinish] = [];
exports.dependencyMap[Enums_2.TaskAreaEventSource.TaskEdit_DependencyStart][Enums_2.TaskAreaEventSource.Successor_DependencyStart] = Enums_1.DependencyType.SS;
exports.dependencyMap[Enums_2.TaskAreaEventSource.TaskEdit_DependencyStart][Enums_2.TaskAreaEventSource.Successor_DependencyFinish] = Enums_1.DependencyType.SF;
exports.dependencyMap[Enums_2.TaskAreaEventSource.TaskEdit_DependencyFinish][Enums_2.TaskAreaEventSource.Successor_DependencyStart] = Enums_1.DependencyType.FS;
exports.dependencyMap[Enums_2.TaskAreaEventSource.TaskEdit_DependencyFinish][Enums_2.TaskAreaEventSource.Successor_DependencyFinish] = Enums_1.DependencyType.FF;
var TaskAreaDependencyState = (function (_super) {
    tslib_1.__extends(TaskAreaDependencyState, _super);
    function TaskAreaDependencyState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskAreaDependencyState.prototype.onMouseUp = function (evt) { this.onDependencyEndByMouse(evt); };
    TaskAreaDependencyState.prototype.onMouseDownInternal = function (evt) { this.onDependencyStart(evt); };
    TaskAreaDependencyState.prototype.onMouseMoveInternal = function (evt) { this.onDependencyMoveStep(evt); };
    TaskAreaDependencyState.prototype.onTouchStartInternal = function (evt) { this.onDependencyStart(evt); };
    TaskAreaDependencyState.prototype.onTouchEndInternal = function (evt) { this.onDependencyEndByTouch(evt); };
    TaskAreaDependencyState.prototype.onTouchMoveInternal = function (evt) { this.onDependencyMoveStep(evt); };
    TaskAreaDependencyState.prototype.onDocumentPointerDownInternal = function (evt) { this.onDependencyStart(evt); };
    TaskAreaDependencyState.prototype.onDocumentPointerUpInternal = function (evt) { this.onDependencyEndByTouch(evt); };
    TaskAreaDependencyState.prototype.onDocumentPointerMoveInternal = function (evt) { this.onDependencyMoveStep(evt); };
    TaskAreaDependencyState.prototype.onDependencyStart = function (evt) {
        var sourceElement = evt_1.EvtUtils.getEventSource(evt);
        this.source = TaskAreaDomHelper_1.TaskAreaDomHelper.getEventSource(sourceElement);
        var pos = this.getRelativePos(new point_1.Point(dom_1.DomUtils.getAbsolutePositionX(sourceElement) + sourceElement.clientWidth / 2, dom_1.DomUtils.getAbsolutePositionY(sourceElement) + sourceElement.clientHeight / 2));
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.DEPENDENCY_START, evt, null, { pos: pos });
    };
    TaskAreaDependencyState.prototype.onDependencyMoveStep = function (evt) {
        evt.preventDefault();
        var relativePos = this.getRelativePos(new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt)));
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.DEPENDENCY_PROCESS, evt, this.getClickedRowIndex(evt), { pos: relativePos });
    };
    TaskAreaDependencyState.prototype.onDependencyEndByMouse = function (evt) {
        var target = TaskAreaDomHelper_1.TaskAreaDomHelper.getEventSource(evt_1.EvtUtils.getEventSource(evt));
        var type = target === Enums_2.TaskAreaEventSource.Successor_DependencyStart || target === Enums_2.TaskAreaEventSource.Successor_DependencyFinish ?
            exports.dependencyMap[this.source][target] : null;
        this.processEndDependency(evt, type);
    };
    TaskAreaDependencyState.prototype.onDependencyEndByTouch = function (evt) {
        var dependencyPoints = this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.GET_DEPENDENCY_POINTS, evt);
        var relativePosStart = this.getRelativePos(dependencyPoints["successorStart"]);
        var relativePosEnd = this.getRelativePos(dependencyPoints["successorFinish"]);
        var relativeTouchPos = this.getRelativePos(new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt)));
        var target = this.isTouchNearby(relativeTouchPos, relativePosStart) ? Enums_2.TaskAreaEventSource.Successor_DependencyStart :
            this.isTouchNearby(relativeTouchPos, relativePosEnd) ? Enums_2.TaskAreaEventSource.Successor_DependencyFinish : null;
        var type = target === Enums_2.TaskAreaEventSource.Successor_DependencyStart || target === Enums_2.TaskAreaEventSource.Successor_DependencyFinish ?
            exports.dependencyMap[this.source][target] : null;
        this.processEndDependency(evt, type);
    };
    TaskAreaDependencyState.prototype.onTaskAreaLeaveInternal = function (evt) {
        this.processEndDependency(evt, null);
    };
    TaskAreaDependencyState.prototype.processEndDependency = function (evt, type) {
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.DEPENDENCY_END, evt, null, { type: type });
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.STATE_EXIT, evt);
    };
    TaskAreaDependencyState.prototype.isTouchNearby = function (touchPos, elementPos) {
        if (Math.abs(elementPos.x - touchPos.x) <= 20 && Math.abs(elementPos.y - touchPos.y) <= 20)
            return true;
        return false;
    };
    return TaskAreaDependencyState;
}(TaskAreaStateBase_1.TaskAreaStateBase));
exports.TaskAreaDependencyState = TaskAreaDependencyState;


/***/ }),

/***/ 9155:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaDomHelper = void 0;
var dom_1 = __webpack_require__(6907);
var evt_1 = __webpack_require__(3714);
var TaskEditController_1 = __webpack_require__(5098);
var Enums_1 = __webpack_require__(2449);
var GridLayoutCalculator_1 = __webpack_require__(1855);
var TaskAreaDomHelper = (function () {
    function TaskAreaDomHelper() {
    }
    TaskAreaDomHelper.getEventSource = function (initSource) {
        var _a;
        var source = initSource.nodeType === ((_a = window === null || window === void 0 ? void 0 : window.Node) === null || _a === void 0 ? void 0 : _a.ELEMENT_NODE) ? initSource : initSource.parentNode;
        var className = source.classList[0];
        return TaskAreaDomHelper.classToSource[className] || Enums_1.TaskAreaEventSource.TaskArea;
    };
    TaskAreaDomHelper.isConnectorLine = function (evt) {
        var source = evt_1.EvtUtils.getEventSource(evt);
        return dom_1.DomUtils.hasClassName(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_HORIZONTAL) ||
            dom_1.DomUtils.hasClassName(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_VERTICAL);
    };
    TaskAreaDomHelper.isTaskElement = function (evt) {
        var sourceElement = evt_1.EvtUtils.getEventSource(evt);
        var source = TaskAreaDomHelper.classToSource[sourceElement.classList[0]];
        return source === Enums_1.TaskAreaEventSource.TaskEdit_Frame ||
            source === Enums_1.TaskAreaEventSource.TaskEdit_Progress ||
            source === Enums_1.TaskAreaEventSource.TaskEdit_Start ||
            source === Enums_1.TaskAreaEventSource.TaskEdit_End ||
            source === Enums_1.TaskAreaEventSource.TaskEdit_DependencyStart ||
            source === Enums_1.TaskAreaEventSource.TaskEdit_DependencyFinish;
    };
    TaskAreaDomHelper.isMouseEvent = function (evt) { return evt instanceof MouseEvent; };
    TaskAreaDomHelper.isTouchEvent = function (evt) { return window.TouchEvent && (evt instanceof TouchEvent); };
    TaskAreaDomHelper.isPointerEvent = function (evt) { return window.PointerEvent && (evt instanceof PointerEvent); };
    TaskAreaDomHelper.isMousePointer = function (evt) { return this.isPointerEvent(evt) && evt.pointerType === "mouse"; };
    TaskAreaDomHelper.classToSource = (_a = {},
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_PROGRESS] = Enums_1.TaskAreaEventSource.TaskEdit_Progress,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_START] = Enums_1.TaskAreaEventSource.TaskEdit_Start,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_END] = Enums_1.TaskAreaEventSource.TaskEdit_End,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_FRAME] = Enums_1.TaskAreaEventSource.TaskEdit_Frame,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_RIGTH] = Enums_1.TaskAreaEventSource.TaskEdit_DependencyStart,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_LEFT] = Enums_1.TaskAreaEventSource.TaskEdit_DependencyFinish,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_SUCCESSOR_DEPENDENCY_RIGTH] = Enums_1.TaskAreaEventSource.Successor_DependencyStart,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_SUCCESSOR_DEPENDENCY_LEFT] = Enums_1.TaskAreaEventSource.Successor_DependencyFinish,
        _a);
    return TaskAreaDomHelper;
}());
exports.TaskAreaDomHelper = TaskAreaDomHelper;


/***/ }),

/***/ 125:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaScrollState = void 0;
var tslib_1 = __webpack_require__(655);
var TaskAreaStateBase_1 = __webpack_require__(5867);
var TaskAreaStateEventNames_1 = __webpack_require__(1404);
var TaskAreaScrollState = (function (_super) {
    tslib_1.__extends(TaskAreaScrollState, _super);
    function TaskAreaScrollState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isStarted = false;
        return _this;
    }
    TaskAreaScrollState.prototype.finish = function () { this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_END_MOVE, null); };
    TaskAreaScrollState.prototype.onMouseUp = function (evt) { this.onEnd(evt); };
    TaskAreaScrollState.prototype.onMouseDownInternal = function (evt) { this.onBeforeStart(evt); };
    TaskAreaScrollState.prototype.onMouseMoveInternal = function (evt) { this.onMove(evt); };
    TaskAreaScrollState.prototype.onDocumentPointerUpInternal = function (evt) { this.onEnd(evt); };
    TaskAreaScrollState.prototype.onDocumentPointerMoveInternal = function (evt) { this.onMoveByPointer(evt); };
    TaskAreaScrollState.prototype.onTouchEndInternal = function (evt) { this.onEnd(evt); };
    TaskAreaScrollState.prototype.onTouchMoveInternal = function (evt) { this.onMoveByPointer(evt); };
    TaskAreaScrollState.prototype.onBeforeStart = function (evt) {
        evt.preventDefault();
        this.raiseDependencySelection(evt, null);
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_EDIT_END, evt);
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_START_MOVE, evt);
        this._isStarted = true;
    };
    TaskAreaScrollState.prototype.onMoveByPointer = function (evt) {
        if (!this._isStarted)
            this.onBeforeStart(evt);
        else
            this.onMove(evt);
    };
    TaskAreaScrollState.prototype.onMove = function (evt) {
        evt.preventDefault();
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_PROCESS_MOVE, evt);
    };
    TaskAreaScrollState.prototype.onEnd = function (evt) {
        evt.preventDefault();
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_END_MOVE, evt);
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.STATE_EXIT, evt);
        this._isStarted = false;
    };
    return TaskAreaScrollState;
}(TaskAreaStateBase_1.TaskAreaStateBase));
exports.TaskAreaScrollState = TaskAreaScrollState;


/***/ }),

/***/ 5867:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaStateBase = void 0;
var browser_1 = __webpack_require__(9279);
var point_1 = __webpack_require__(8900);
var dom_1 = __webpack_require__(6907);
var evt_1 = __webpack_require__(3714);
var key_1 = __webpack_require__(2153);
var TaskAreaEventArgs_1 = __webpack_require__(3461);
var TaskAreaDomHelper_1 = __webpack_require__(9155);
var TaskAreaStateEventNames_1 = __webpack_require__(1404);
var TaskAreaStateBase = (function () {
    function TaskAreaStateBase(listener, taskArea, cellSize) {
        this.position = new point_1.Point(-1, -1);
        this.isCursorInArea = false;
        this._listener = listener;
        this._taskArea = taskArea;
        this._cellSize = cellSize;
    }
    TaskAreaStateBase.prototype.start = function () { };
    TaskAreaStateBase.prototype.finish = function () { };
    TaskAreaStateBase.prototype.isTouchEvent = function (evt) { return TaskAreaDomHelper_1.TaskAreaDomHelper.isTouchEvent(evt); };
    TaskAreaStateBase.prototype.isPointerEvent = function (evt) { return TaskAreaDomHelper_1.TaskAreaDomHelper.isPointerEvent(evt); };
    TaskAreaStateBase.prototype.isMouseEvent = function (evt) { return TaskAreaDomHelper_1.TaskAreaDomHelper.isMouseEvent(evt); };
    TaskAreaStateBase.prototype.onMouseWheel = function (evt) { };
    TaskAreaStateBase.prototype.onScroll = function (evt) { this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_SCROLL); };
    TaskAreaStateBase.prototype.onKeyDown = function (evt) {
        if (this.isCursorInArea)
            this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_KEY_DOWN, evt, null, { code: this.getShortcutCode(evt) });
    };
    TaskAreaStateBase.prototype.onContextMenu = function (evt) {
        var rowIndex = this.getClickedRowIndex(evt);
        var isDependency = TaskAreaDomHelper_1.TaskAreaDomHelper.isConnectorLine(evt);
        if (!isDependency)
            this.raiseTaskSelection(evt, rowIndex);
        evt.stopPropagation();
        evt.preventDefault();
        if (browser_1.Browser.WebKitFamily)
            evt.returnValue = false;
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.CONTEXTMENU_SHOW, evt, rowIndex, { type: isDependency ? "dependency" : "task" });
    };
    TaskAreaStateBase.prototype.onTaskPointerEnter = function (evt) { this.onTaskPointerEnterBase(evt); };
    TaskAreaStateBase.prototype.onDocumentPointerMove = function (evt) { this.processPointerMove(evt); };
    TaskAreaStateBase.prototype.onDocumentPointerDown = function (evt) { this.processPointerDown(evt); };
    TaskAreaStateBase.prototype.onDocumentPointerUp = function (evt) { this.processPointerUp(evt); };
    TaskAreaStateBase.prototype.onTaskTouchStart = function (evt) { this.onTaskPointerEnterBase(evt); };
    TaskAreaStateBase.prototype.onTouchMove = function (evt) { this.processPointerMove(evt); };
    TaskAreaStateBase.prototype.onTouchStart = function (evt) { this.processPointerDown(evt); };
    TaskAreaStateBase.prototype.onTouchEnd = function (evt) { this.processPointerUp(evt); };
    TaskAreaStateBase.prototype.onMouseDown = function (evt) { this.processPointerDown(evt); };
    TaskAreaStateBase.prototype.onMouseUp = function (evt) { };
    TaskAreaStateBase.prototype.onMouseMove = function (evt) { this.processPointerMove(evt); };
    TaskAreaStateBase.prototype.onTaskHover = function (evt) { this.onTaskPointerEnterBase(evt); };
    TaskAreaStateBase.prototype.onTaskLeave = function (evt) { this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_LEAVE, evt, this.getClickedRowIndex(evt)); };
    TaskAreaStateBase.prototype.onClick = function (evt) {
        var rowIndex = this.getClickedRowIndex(evt);
        this.raiseTaskSelection(evt, rowIndex);
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_CLICK, evt, rowIndex);
    };
    TaskAreaStateBase.prototype.onDblClick = function (evt) {
        evt.preventDefault();
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_DBLCLICK, evt, this.getClickedRowIndex(evt));
    };
    TaskAreaStateBase.prototype.onTaskAreaLeave = function (evt) {
        var isMouseLeave = this.isPointerEvent(evt) ? TaskAreaDomHelper_1.TaskAreaDomHelper.isMousePointer(evt) : true;
        if (isMouseLeave) {
            this.isCursorInArea = false;
            this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_EDIT_END, evt);
        }
        this.onTaskAreaLeaveInternal(evt);
    };
    TaskAreaStateBase.prototype.onTaskPointerEnterBase = function (evt) {
        if (!this.isTouchEvent(evt) && !this.isPointerEvent(evt))
            evt.preventDefault();
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_EDIT_START, evt, this.getClickedRowIndex(evt));
    };
    TaskAreaStateBase.prototype.processPointerDown = function (evt) {
        var isTouchEvent = this.isTouchEvent(evt);
        var isPointerEvent = this.isPointerEvent(evt);
        var isOutsideTouch = (isTouchEvent || isPointerEvent) && this.checkAndProcessTouchOutsideArea(evt);
        if (isOutsideTouch)
            return;
        this.position = new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt));
        if (isTouchEvent || isPointerEvent)
            evt.preventDefault();
        if (isTouchEvent)
            this.onTouchStartInternal(evt);
        else if (isPointerEvent)
            this.onDocumentPointerDownInternal(evt);
        else
            this.onMouseDownInternal(evt);
    };
    TaskAreaStateBase.prototype.processPointerMove = function (evt) {
        var _a;
        var isTouchEvent = this.isTouchEvent(evt);
        var isPointerEvent = this.isPointerEvent(evt);
        (_a = this.position) !== null && _a !== void 0 ? _a : (this.position = new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt)));
        var isMove = Math.abs(this.position.x - evt_1.EvtUtils.getEventX(evt)) > 2 || Math.abs(this.position.y - evt_1.EvtUtils.getEventY(evt)) > 2;
        var isOutsideTouch = (isTouchEvent || isPointerEvent) && this.checkAndProcessTouchOutsideArea(evt);
        if (isOutsideTouch || !isMove)
            return;
        if (isTouchEvent || isPointerEvent)
            evt.preventDefault();
        if (this.isTouchEvent(evt))
            this.onTouchMoveInternal(evt);
        else if (this.isPointerEvent(evt))
            this.onDocumentPointerMoveInternal(evt);
        else {
            this.isCursorInArea = true;
            this.onMouseMoveInternal(evt);
        }
    };
    TaskAreaStateBase.prototype.processPointerUp = function (evt) {
        if (!this.checkAndProcessTouchOutsideArea(evt)) {
            evt.preventDefault();
            if (this.isTouchEvent(evt))
                this.onTouchEndInternal(evt);
            else
                this.onDocumentPointerUpInternal(evt);
        }
    };
    TaskAreaStateBase.prototype.onMouseDownInternal = function (evt) { };
    TaskAreaStateBase.prototype.onMouseMoveInternal = function (evt) { };
    TaskAreaStateBase.prototype.onDocumentPointerUpInternal = function (evt) { };
    TaskAreaStateBase.prototype.onDocumentPointerDownInternal = function (evt) { };
    TaskAreaStateBase.prototype.onDocumentPointerMoveInternal = function (evt) { };
    TaskAreaStateBase.prototype.onTouchStartInternal = function (evt) { };
    TaskAreaStateBase.prototype.onTouchEndInternal = function (evt) { };
    TaskAreaStateBase.prototype.onTouchMoveInternal = function (evt) { };
    TaskAreaStateBase.prototype.onTaskAreaLeaveInternal = function (evt) { };
    TaskAreaStateBase.prototype.checkAndProcessTouchOutsideArea = function (evt) {
        var isOutside = !this.isInTaskArea(evt);
        if (isOutside)
            this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_EDIT_END, evt);
        this.isCursorInArea = !isOutside;
        return isOutside;
    };
    TaskAreaStateBase.prototype.raiseEvent = function (eventKey, domEvent, rowIndex, data) {
        var args = new TaskAreaEventArgs_1.TaskAreaEventArgs(eventKey, domEvent, rowIndex, data);
        var handler = this._listener.getHandler(eventKey);
        return handler && handler(args);
    };
    TaskAreaStateBase.prototype.raiseDependencySelection = function (evt, key) {
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.DEPENDENCY_SELECTION, evt, null, { key: key });
    };
    TaskAreaStateBase.prototype.raiseTaskSelection = function (evt, index) {
        var isFocus = dom_1.DomUtils.isItParent(this._taskArea, evt_1.EvtUtils.getEventSource(evt));
        if (isFocus && !TaskAreaDomHelper_1.TaskAreaDomHelper.isConnectorLine(evt))
            this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_SELECTION, evt, index);
    };
    TaskAreaStateBase.prototype.getClickedRowIndex = function (evt) {
        if (!evt)
            return -1;
        var y = evt_1.EvtUtils.getEventY(evt);
        var taskAreaY = dom_1.DomUtils.getAbsolutePositionY(this._taskArea);
        var relativeY = y - taskAreaY;
        return Math.floor(relativeY / this._cellSize.height);
    };
    TaskAreaStateBase.prototype.getRelativePos = function (absolutePos) {
        var taskAreaX = dom_1.DomUtils.getAbsolutePositionX(this._taskArea);
        var taskAreaY = dom_1.DomUtils.getAbsolutePositionY(this._taskArea);
        return new point_1.Point(absolutePos.x - taskAreaX, absolutePos.y - taskAreaY);
    };
    TaskAreaStateBase.prototype.isInTaskArea = function (evt) {
        return dom_1.DomUtils.isItParent(this._taskArea, evt_1.EvtUtils.getEventSource(evt));
    };
    TaskAreaStateBase.prototype.getShortcutCode = function (evt) {
        var keyCode = key_1.KeyUtils.getEventKeyCode(evt);
        var modifiers = 0;
        if (evt.altKey)
            modifiers |= key_1.ModifierKey.Alt;
        if (evt.ctrlKey)
            modifiers |= key_1.ModifierKey.Ctrl;
        if (evt.shiftKey)
            modifiers |= key_1.ModifierKey.Shift;
        if (evt.metaKey && browser_1.Browser.MacOSPlatform)
            modifiers |= key_1.ModifierKey.Meta;
        return modifiers | keyCode;
    };
    return TaskAreaStateBase;
}());
exports.TaskAreaStateBase = TaskAreaStateBase;


/***/ }),

/***/ 1404:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaStateEventNames = void 0;
var TaskAreaStateEventNames = (function () {
    function TaskAreaStateEventNames() {
    }
    TaskAreaStateEventNames.TASK_AREA_CLICK = "taskAreaClick";
    TaskAreaStateEventNames.TASK_AREA_DBLCLICK = "taskAreaDblClick";
    TaskAreaStateEventNames.TASK_AREA_SCROLL = "taskAreaScroll";
    TaskAreaStateEventNames.TASK_AREA_START_MOVE = "taskAreaStartMove";
    TaskAreaStateEventNames.TASK_AREA_PROCESS_MOVE = "taskAreaProcessMove";
    TaskAreaStateEventNames.TASK_AREA_END_MOVE = "taskAreaEndMove";
    TaskAreaStateEventNames.TASK_AREA_ZOOM_IN = "taskAreaZoomIn";
    TaskAreaStateEventNames.TASK_AREA_ZOOM_OUT = "taskAreaZoomOut";
    TaskAreaStateEventNames.CONTEXTMENU_SHOW = "contextMenuShow";
    TaskAreaStateEventNames.CONTEXTMENU_HIDE = "contextMenuHide";
    TaskAreaStateEventNames.DEPENDENCY_SELECTION = "dependencySelection";
    TaskAreaStateEventNames.STATE_EXIT = "stateExit";
    TaskAreaStateEventNames.TASK_SELECTION = "taskSelection";
    TaskAreaStateEventNames.TASK_EDIT_START = "taskEditStart";
    TaskAreaStateEventNames.TASK_EDIT_END = "taskEditEnd";
    TaskAreaStateEventNames.TASK_LEAVE = "taskLeave";
    TaskAreaStateEventNames.TASK_PROCESS_MOVE = "taskProcessMove";
    TaskAreaStateEventNames.TASK_END_MOVE = "taskEndMove";
    TaskAreaStateEventNames.TASK_PROCESS_PROGRESS = "taskProcessProgress";
    TaskAreaStateEventNames.TASK_END_PROGRESS = "taskEndProgress";
    TaskAreaStateEventNames.TASK_PROCESS_START = "taskProcessStart";
    TaskAreaStateEventNames.TASK_CONFIRM_START = "taskConfirmStart";
    TaskAreaStateEventNames.TASK_PROCESS_END = "taskProcessEnd";
    TaskAreaStateEventNames.TASK_CONFIRM_END = "taskConfirmEnd";
    TaskAreaStateEventNames.GET_DEPENDENCY_POINTS = "getDependencyPoints";
    TaskAreaStateEventNames.DEPENDENCY_START = "dependencyStart";
    TaskAreaStateEventNames.DEPENDENCY_PROCESS = "dependencyProcess";
    TaskAreaStateEventNames.DEPENDENCY_END = "dependencyEnd";
    TaskAreaStateEventNames.TASK_AREA_KEY_DOWN = "taskAreaKeyDown";
    TaskAreaStateEventNames.GET_POINTERS_INFO = "getPointersInfo";
    TaskAreaStateEventNames.GET_COORDINATES_REF_POINT = "getCoordinatesRefPoint";
    return TaskAreaStateEventNames;
}());
exports.TaskAreaStateEventNames = TaskAreaStateEventNames;


/***/ }),

/***/ 6591:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaZoomState = void 0;
var tslib_1 = __webpack_require__(655);
var point_1 = __webpack_require__(8900);
var evt_1 = __webpack_require__(3714);
var metrics_1 = __webpack_require__(5596);
var TaskAreaStateBase_1 = __webpack_require__(5867);
var TaskAreaStateEventNames_1 = __webpack_require__(1404);
var PINCH_CHANGE_DISTANCE = 3;
var MOUSE_ZOOM_LOCK_TIMEOUT = 50;
var TOUCH_ZOOM_LOCK_TIMEOUT = 1000;
var TaskAreaZoomState = (function (_super) {
    tslib_1.__extends(TaskAreaZoomState, _super);
    function TaskAreaZoomState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isInZooming = false;
        return _this;
    }
    TaskAreaZoomState.prototype.onMouseWheel = function (evt) {
        if (evt.ctrlKey) {
            evt.preventDefault();
            evt.stopPropagation();
            if (!this._isInZooming)
                this.processZoom(evt, evt_1.EvtUtils.getWheelDelta(evt) > 0, MOUSE_ZOOM_LOCK_TIMEOUT);
        }
    };
    TaskAreaZoomState.prototype.onDocumentPointerUpInternal = function (evt) { this.onEndZoom(evt); };
    TaskAreaZoomState.prototype.onDocumentPointerMoveInternal = function (evt) { this.onTouchZoom(evt); };
    TaskAreaZoomState.prototype.onTouchEndInternal = function (evt) { this.onEndZoom(evt); };
    TaskAreaZoomState.prototype.onTouchMoveInternal = function (evt) { this.onTouchZoom(evt); };
    TaskAreaZoomState.prototype.onTouchZoom = function (evt) {
        var _a;
        evt.stopPropagation();
        evt.preventDefault();
        if (!this._isInZooming) {
            var distance = this.getTouchDistance(evt);
            (_a = this.prevDistance) !== null && _a !== void 0 ? _a : (this.prevDistance = distance);
            var diff = this.prevDistance - distance;
            if (Math.abs(diff) > PINCH_CHANGE_DISTANCE) {
                this.processZoom(evt, diff > 0, TOUCH_ZOOM_LOCK_TIMEOUT);
                this.prevDistance = distance;
            }
        }
    };
    TaskAreaZoomState.prototype.processZoom = function (evt, increase, lockTimeout) {
        var _this = this;
        this._isInZooming = true;
        setTimeout(function () { _this._isInZooming = false; }, lockTimeout);
        var eventKey = increase ? TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_ZOOM_IN : TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_ZOOM_OUT;
        this.raiseEvent(eventKey, evt, null, { leftPos: this.getLeftPosition(evt) });
    };
    TaskAreaZoomState.prototype.onEndZoom = function (evt) {
        this.prevDistance = null;
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.STATE_EXIT, evt);
    };
    TaskAreaZoomState.prototype.getTouchDistance = function (evt) {
        var points = this.GetTouchPoints(evt);
        return this.getDistance(points[0], points[1]);
    };
    TaskAreaZoomState.prototype.GetTouchPoints = function (evt) {
        var _a, _b, _c, _d;
        if (this.isTouchEvent(evt)) {
            var touches = evt.touches;
            return [
                new point_1.Point(touches[0].pageX, touches[0].pageY),
                new point_1.Point(touches[1].pageX, touches[1].pageY)
            ];
        }
        var pointers = this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.GET_POINTERS_INFO, evt);
        return [
            new point_1.Point((_a = pointers[0]) === null || _a === void 0 ? void 0 : _a.pageX, (_b = pointers[0]) === null || _b === void 0 ? void 0 : _b.pageY),
            new point_1.Point((_c = pointers[1]) === null || _c === void 0 ? void 0 : _c.pageX, (_d = pointers[1]) === null || _d === void 0 ? void 0 : _d.pageY)
        ];
    };
    TaskAreaZoomState.prototype.getDistance = function (a, b) {
        return metrics_1.Metrics.euclideanDistance(a, b);
    };
    TaskAreaZoomState.prototype.getLeftPosition = function (evt) {
        var leftPos = 0;
        if (this.isTouchEvent(evt) || this.isPointerEvent(evt))
            leftPos = this.getZoomMiddlePoint(evt).x;
        else if (this.isMouseEvent(evt))
            leftPos = this.getMouseZoomLeftPos(evt);
        return leftPos;
    };
    TaskAreaZoomState.prototype.getMouseZoomLeftPos = function (evt) {
        var ref = this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.GET_COORDINATES_REF_POINT);
        return evt_1.EvtUtils.getEventX(evt) - ref.x;
    };
    TaskAreaZoomState.prototype.getZoomMiddlePoint = function (evt) {
        var ref = this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.GET_COORDINATES_REF_POINT);
        var points = this.GetTouchPoints(evt);
        var point1 = this.convertScreenToChartCoordinates(points[0], ref);
        var point2 = this.convertScreenToChartCoordinates(points[1], ref);
        return new point_1.Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
    };
    TaskAreaZoomState.prototype.convertScreenToChartCoordinates = function (p, ref) { return new point_1.Point(p.x - ref.x, p.y - ref.y); };
    return TaskAreaZoomState;
}(TaskAreaStateBase_1.TaskAreaStateBase));
exports.TaskAreaZoomState = TaskAreaZoomState;


/***/ }),

/***/ 6262:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskDragBaseState = void 0;
var tslib_1 = __webpack_require__(655);
var point_1 = __webpack_require__(8900);
var evt_1 = __webpack_require__(3714);
var TaskAreaStateBase_1 = __webpack_require__(5867);
var TaskAreaStateEventNames_1 = __webpack_require__(1404);
var TaskDragBaseState = (function (_super) {
    tslib_1.__extends(TaskDragBaseState, _super);
    function TaskDragBaseState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskDragBaseState.prototype.onMouseDownInternal = function (evt) { this.onStart(evt); };
    TaskDragBaseState.prototype.onMouseUp = function (evt) { this.onEnd(evt); };
    TaskDragBaseState.prototype.onMouseMoveInternal = function (evt) { this.onDrag(evt); };
    TaskDragBaseState.prototype.onTouchStartInternal = function (evt) { this.onStart(evt); };
    TaskDragBaseState.prototype.onTouchEndInternal = function (evt) { this.onEnd(evt); };
    TaskDragBaseState.prototype.onTouchMoveInternal = function (evt) { this.onDrag(evt); };
    TaskDragBaseState.prototype.onDocumentPointerDownInternal = function (evt) { this.onStart(evt); };
    TaskDragBaseState.prototype.onDocumentPointerUpInternal = function (evt) { this.onEnd(evt); };
    TaskDragBaseState.prototype.onDocumentPointerMoveInternal = function (evt) { this.onDrag(evt); };
    TaskDragBaseState.prototype.onStart = function (evt) {
        this.currentPosition = new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt));
        this.raiseDependencySelection(evt, null);
        this.onStartInternal(evt);
    };
    TaskDragBaseState.prototype.onDrag = function (evt) {
        var _a;
        evt.preventDefault();
        var position = new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt));
        (_a = this.currentPosition) !== null && _a !== void 0 ? _a : (this.currentPosition = position);
        this.onDragInternal(position);
        this.currentPosition = position;
    };
    TaskDragBaseState.prototype.onEnd = function (evt) {
        this.onEndInternal(evt);
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.STATE_EXIT, evt);
    };
    TaskDragBaseState.prototype.onStartInternal = function (_evt) { };
    TaskDragBaseState.prototype.onEndInternal = function (_evt) { };
    TaskDragBaseState.prototype.onDragInternal = function (_position) { };
    TaskDragBaseState.prototype.finish = function () {
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_EDIT_END);
    };
    return TaskDragBaseState;
}(TaskAreaStateBase_1.TaskAreaStateBase));
exports.TaskDragBaseState = TaskDragBaseState;


/***/ }),

/***/ 2395:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskEditState = void 0;
var tslib_1 = __webpack_require__(655);
var evt_1 = __webpack_require__(3714);
var Enums_1 = __webpack_require__(2449);
var TaskAreaDomHelper_1 = __webpack_require__(9155);
var TaskAreaStateEventNames_1 = __webpack_require__(1404);
var TaskDragBaseState_1 = __webpack_require__(6262);
var TaskEditState = (function (_super) {
    tslib_1.__extends(TaskEditState, _super);
    function TaskEditState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskEditState.prototype.onStartInternal = function (evt) {
        var _a;
        (_a = this._source) !== null && _a !== void 0 ? _a : (this._source = TaskAreaDomHelper_1.TaskAreaDomHelper.getEventSource(evt_1.EvtUtils.getEventSource(evt)));
    };
    TaskEditState.prototype.onEndInternal = function (_evt) { this.raiseEvent(this.getEventOnEndKey(), _evt); };
    TaskEditState.prototype.onDragInternal = function (position) {
        var relativePosition = this.getRelativePos(position);
        this.raiseEvent(this.getEventOnDragKey(), null, null, { position: relativePosition });
    };
    TaskEditState.prototype.getEventOnDragKey = function () {
        switch (this._source) {
            case Enums_1.TaskAreaEventSource.TaskEdit_Start:
                return TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_PROCESS_START;
                break;
            case Enums_1.TaskAreaEventSource.TaskEdit_End:
                return TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_PROCESS_END;
                break;
            case Enums_1.TaskAreaEventSource.TaskEdit_Progress:
                return TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_PROCESS_PROGRESS;
                break;
        }
    };
    TaskEditState.prototype.getEventOnEndKey = function () {
        switch (this._source) {
            case Enums_1.TaskAreaEventSource.TaskEdit_Start:
                return TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_CONFIRM_START;
                break;
            case Enums_1.TaskAreaEventSource.TaskEdit_End:
                return TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_CONFIRM_END;
                break;
            case Enums_1.TaskAreaEventSource.TaskEdit_Progress:
                return TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_END_PROGRESS;
                break;
        }
    };
    return TaskEditState;
}(TaskDragBaseState_1.TaskDragBaseState));
exports.TaskEditState = TaskEditState;


/***/ }),

/***/ 7295:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskMoveState = void 0;
var tslib_1 = __webpack_require__(655);
var TaskAreaStateEventNames_1 = __webpack_require__(1404);
var TaskDragBaseState_1 = __webpack_require__(6262);
var TaskMoveState = (function (_super) {
    tslib_1.__extends(TaskMoveState, _super);
    function TaskMoveState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskMoveState.prototype.onEndInternal = function (_evt) {
        this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_END_MOVE, _evt);
    };
    TaskMoveState.prototype.onDragInternal = function (position) {
        if (!this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_PROCESS_MOVE, null, null, { delta: position.x - this.currentPosition.x }))
            this.raiseEvent(TaskAreaStateEventNames_1.TaskAreaStateEventNames.STATE_EXIT);
    };
    return TaskMoveState;
}(TaskDragBaseState_1.TaskDragBaseState));
exports.TaskMoveState = TaskMoveState;


/***/ }),

/***/ 3461:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaEventArgs = void 0;
var common_1 = __webpack_require__(2491);
var TaskAreaEventArgs = (function () {
    function TaskAreaEventArgs(eventName, evt, rowIndex, info) {
        this.rowIndex = -1;
        this.info = {};
        this.eventName = eventName;
        this.triggerEvent = evt;
        if ((0, common_1.isDefined)(rowIndex))
            this.rowIndex = rowIndex;
        if (info)
            this.info = info;
    }
    return TaskAreaEventArgs;
}());
exports.TaskAreaEventArgs = TaskAreaEventArgs;


/***/ }),

/***/ 8269:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaEventsListener = void 0;
var point_1 = __webpack_require__(8900);
var common_1 = __webpack_require__(2491);
var dom_1 = __webpack_require__(6907);
var evt_1 = __webpack_require__(3714);
var key_1 = __webpack_require__(2153);
var MovingHelper_1 = __webpack_require__(3336);
var TaskAreaStateEventNames_1 = __webpack_require__(1404);
var TaskAreaEventsListener = (function () {
    function TaskAreaEventsListener(owner) {
        this._owner = owner;
    }
    Object.defineProperty(TaskAreaEventsListener.prototype, "taskEditController", {
        get: function () {
            var _a;
            return (_a = this._owner) === null || _a === void 0 ? void 0 : _a.taskEditController;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaEventsListener.prototype, "renderHelper", {
        get: function () {
            var _a;
            return (_a = this._owner) === null || _a === void 0 ? void 0 : _a.renderHelper;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaEventsListener.prototype.getHandler = function (eventKey) {
        return this.handlers[eventKey];
    };
    TaskAreaEventsListener.prototype.setHandler = function (eventKey, handler) {
        this.handlers[eventKey] = handler;
    };
    Object.defineProperty(TaskAreaEventsListener.prototype, "handlers", {
        get: function () {
            var _a;
            (_a = this._handlers) !== null && _a !== void 0 ? _a : (this._handlers = this.createTaskAreaEventHandlers());
            return this._handlers;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaEventsListener.prototype.createTaskAreaEventHandlers = function () {
        var handlers = {};
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_CLICK] = this.taskAreaClickHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_DBLCLICK] = this.taskAreaDblClickHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_SCROLL] = this.taskAreaScrollHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_START_MOVE] = this.taskAreaStartMoveHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_PROCESS_MOVE] = this.taskAreaProcessMoveHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_END_MOVE] = this.taskAreaEndMoveHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_ZOOM_IN] = this.taskAreaZoomInHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_ZOOM_OUT] = this.taskAreaZoomOutHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.CONTEXTMENU_SHOW] = this.taskAreaContextMenuShowHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.CONTEXTMENU_HIDE] = this.taskAreaContextMenuHideHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_SELECTION] = this.taskSelectionHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.DEPENDENCY_SELECTION] = this.dependencySelectionHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_EDIT_START] = this.taskEditStartHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_EDIT_END] = this.taskEditEndHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_LEAVE] = this.taskLeaveHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_PROCESS_MOVE] = this.taskProcessMoveHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_END_MOVE] = this.taskEndMoveHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_PROCESS_PROGRESS] = this.taskProcessProgressHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_END_PROGRESS] = this.taskEndProgressHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_PROCESS_START] = this.taskProcessStartHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_CONFIRM_START] = this.taskConfirmStartHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_PROCESS_END] = this.taskProcessEndHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_CONFIRM_END] = this.taskConfirmEndHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.GET_DEPENDENCY_POINTS] = this.getDependencyPoints.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.DEPENDENCY_START] = this.dependencyStartHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.DEPENDENCY_END] = this.dependencyEndHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.DEPENDENCY_PROCESS] = this.dependencyProcessHandler.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.TASK_AREA_KEY_DOWN] = this.onTaskAreaKeyDown.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.GET_COORDINATES_REF_POINT] = this.getCoordinatesRefPoint.bind(this);
        handlers[TaskAreaStateEventNames_1.TaskAreaStateEventNames.STATE_EXIT] = function () { };
        return handlers;
    };
    TaskAreaEventsListener.prototype.taskAreaClickHandler = function (args) {
        return this._owner.onTaskAreaClick(args.rowIndex, args.triggerEvent);
    };
    TaskAreaEventsListener.prototype.taskAreaDblClickHandler = function (args) {
        this._owner.onTaskAreaDblClick(args.rowIndex, args.triggerEvent);
    };
    TaskAreaEventsListener.prototype.taskSelectionHandler = function (args) {
        this._owner.onTaskSelectionChanged(args.rowIndex, args.triggerEvent);
    };
    TaskAreaEventsListener.prototype.taskAreaContextMenuShowHandler = function (args) {
        this._owner.onTaskAreaContextMenu(args.rowIndex, args.triggerEvent, args.info["type"]);
    };
    TaskAreaEventsListener.prototype.taskAreaContextMenuHideHandler = function () {
        this._owner.hidePopupMenu();
    };
    TaskAreaEventsListener.prototype.taskAreaScrollHandler = function (args) {
        this._owner.updateView();
    };
    TaskAreaEventsListener.prototype.dependencySelectionHandler = function (args) {
        var key = args.info["key"];
        var currentSelectedKey = this.taskEditController.dependencyId;
        var needChangeSelection = key !== currentSelectedKey || (!key && (0, common_1.isDefined)(currentSelectedKey));
        if (needChangeSelection)
            this._owner.selectDependency(key);
    };
    Object.defineProperty(TaskAreaEventsListener.prototype, "ganttMovingHelper", {
        get: function () {
            var _a;
            (_a = this._ganttMovingHelper) !== null && _a !== void 0 ? _a : (this._ganttMovingHelper = new MovingHelper_1.GanttMovingHelper(this._owner.renderHelper.taskAreaContainer));
            return this._ganttMovingHelper;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaEventsListener.prototype.taskAreaStartMoveHandler = function (args) {
        this.ganttMovingHelper.startMoving(args.triggerEvent);
    };
    TaskAreaEventsListener.prototype.taskAreaProcessMoveHandler = function (args) {
        if (this.ganttMovingHelper.movingInfo) {
            this.ganttMovingHelper.onMouseMove(args.triggerEvent);
            args.triggerEvent.preventDefault();
        }
    };
    TaskAreaEventsListener.prototype.taskAreaEndMoveHandler = function (args) {
        this.ganttMovingHelper.onMouseUp(args.triggerEvent);
    };
    TaskAreaEventsListener.prototype.taskAreaZoomInHandler = function (args) {
        this._owner.zoomIn(args.info["leftPos"]);
    };
    TaskAreaEventsListener.prototype.taskAreaZoomOutHandler = function (args) {
        this._owner.zoomOut(args.info["leftPos"]);
    };
    TaskAreaEventsListener.prototype.getCoordinatesRefPoint = function (args) {
        var x = dom_1.DomUtils.getAbsolutePositionX(this.renderHelper.taskAreaContainer.getElement());
        var y = dom_1.DomUtils.getAbsolutePositionY(this.renderHelper.taskAreaContainer.getElement());
        return new point_1.Point(x, y);
    };
    TaskAreaEventsListener.prototype.taskEditStartHandler = function (args) {
        this.taskEditController.show(args.rowIndex);
        this.taskEditController.showTaskInfo(evt_1.EvtUtils.getEventX(args.triggerEvent));
    };
    TaskAreaEventsListener.prototype.taskLeaveHandler = function (args) {
        this.taskEditController.cancel();
    };
    TaskAreaEventsListener.prototype.taskEditEndHandler = function (args) {
        this.taskEditController.endEditing();
    };
    TaskAreaEventsListener.prototype.taskEndMoveHandler = function (args) {
        this.taskEditController.confirmMove();
    };
    TaskAreaEventsListener.prototype.taskProcessMoveHandler = function (args) {
        var _a;
        return this.taskEditController.processMove((_a = args.info["delta"]) !== null && _a !== void 0 ? _a : 0);
    };
    TaskAreaEventsListener.prototype.taskEndProgressHandler = function (args) {
        this.taskEditController.confirmProgress();
    };
    TaskAreaEventsListener.prototype.taskProcessProgressHandler = function (args) {
        this.taskEditController.processProgress(args.info["position"]);
    };
    TaskAreaEventsListener.prototype.taskProcessStartHandler = function (args) {
        this.taskEditController.processStart(args.info["position"]);
    };
    TaskAreaEventsListener.prototype.taskConfirmStartHandler = function (args) {
        this.taskEditController.confirmStart();
    };
    TaskAreaEventsListener.prototype.taskProcessEndHandler = function (args) {
        this.taskEditController.processEnd(args.info["position"]);
    };
    TaskAreaEventsListener.prototype.taskConfirmEndHandler = function (args) {
        this.taskEditController.confirmEnd();
    };
    TaskAreaEventsListener.prototype.getDependencyPoints = function (args) {
        var info = {};
        info["successorStart"] = new point_1.Point(dom_1.DomUtils.getAbsolutePositionX(this.taskEditController.dependencySuccessorStart) + this.taskEditController.dependencySuccessorStart.clientWidth / 2, dom_1.DomUtils.getAbsolutePositionY(this.taskEditController.dependencySuccessorStart) + this.taskEditController.dependencySuccessorStart.clientHeight / 2);
        info["successorFinish"] = new point_1.Point(dom_1.DomUtils.getAbsolutePositionX(this.taskEditController.dependencySuccessorFinish) + this.taskEditController.dependencySuccessorFinish.clientWidth / 2, dom_1.DomUtils.getAbsolutePositionY(this.taskEditController.dependencySuccessorFinish) + this.taskEditController.dependencySuccessorFinish.clientHeight / 2);
        return info;
    };
    TaskAreaEventsListener.prototype.dependencyStartHandler = function (args) {
        this.taskEditController.startDependency(args.info["pos"]);
    };
    TaskAreaEventsListener.prototype.dependencyEndHandler = function (args) {
        this.taskEditController.endDependency(args.info["type"]);
    };
    TaskAreaEventsListener.prototype.dependencyProcessHandler = function (args) {
        this.taskEditController.processDependency(args.info["pos"]);
        if (this._owner.viewModel.tasks.items[args.rowIndex])
            this.taskEditController.showDependencySuccessor(args.rowIndex);
    };
    TaskAreaEventsListener.prototype.onTaskAreaKeyDown = function (args) {
        var code = args.info["code"];
        if (code == (key_1.ModifierKey.Ctrl | key_1.KeyCode.Key_z))
            this._owner.history.undo();
        if (code == (key_1.ModifierKey.Ctrl | key_1.KeyCode.Key_y))
            this._owner.history.redo();
        if (code == key_1.KeyCode.Delete)
            this.taskEditController.deleteSelectedDependency();
    };
    return TaskAreaEventsListener;
}());
exports.TaskAreaEventsListener = TaskAreaEventsListener;


/***/ }),

/***/ 3682:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaManager = exports.TOUCH_ACTION_NONE = void 0;
var browser_1 = __webpack_require__(9279);
var dom_1 = __webpack_require__(6907);
var evt_1 = __webpack_require__(3714);
var StateController_1 = __webpack_require__(6958);
exports.TOUCH_ACTION_NONE = "dx-gantt-touch-action";
var TaskAreaManager = (function () {
    function TaskAreaManager(listener, taskArea, cellSize) {
        this._eventListener = listener;
        this._taskArea = taskArea;
        this._cellSize = cellSize;
        this.attachEvents();
    }
    TaskAreaManager.prototype.attachEvents = function () {
        if (window.PointerEvent)
            this.attachPointerEvents();
        else if (browser_1.Browser.TouchUI)
            this.attachTouchEvents();
        else
            this.attachMouseEvents();
        this.attachCommonEvents();
    };
    TaskAreaManager.prototype.detachEvents = function () {
        if (window.PointerEvent)
            this.detachPointerEvents();
        else if (browser_1.Browser.TouchUI)
            this.detachTouchEvents();
        else
            this.detachMouseEvents();
        this.detachCommonEvents();
    };
    TaskAreaManager.prototype.attachEventsOnTask = function (taskElement) {
        if (window.PointerEvent)
            taskElement === null || taskElement === void 0 ? void 0 : taskElement.addEventListener("pointerenter", this.onTaskPointerEnterHandler);
        else if (browser_1.Browser.TouchUI)
            taskElement === null || taskElement === void 0 ? void 0 : taskElement.addEventListener("touchstart", this.onTaskTouchStartHandler);
        else {
            taskElement === null || taskElement === void 0 ? void 0 : taskElement.addEventListener("mouseenter", this.onTaskMouseEnterHandler);
            taskElement === null || taskElement === void 0 ? void 0 : taskElement.addEventListener("mouseleave", this.onTaskMouseLeaveHandler);
        }
    };
    TaskAreaManager.prototype.detachEventsOnTask = function (taskElement) {
        if (window.PointerEvent)
            taskElement === null || taskElement === void 0 ? void 0 : taskElement.removeEventListener("pointerenter", this.onTaskPointerEnterHandler);
        else if (browser_1.Browser.TouchUI)
            taskElement === null || taskElement === void 0 ? void 0 : taskElement.removeEventListener("touchstart", this.onTaskTouchStartHandler);
        else {
            taskElement === null || taskElement === void 0 ? void 0 : taskElement.removeEventListener("mouseenter", this.onTaskMouseEnterHandler);
            taskElement === null || taskElement === void 0 ? void 0 : taskElement.removeEventListener("mouseleave", this.onTaskMouseLeaveHandler);
        }
    };
    TaskAreaManager.prototype.attachCommonEvents = function () {
        this.taskAreaAddEventListener("contextmenu", this.onContextMenuHandler);
        this.taskAreaAddEventListener(evt_1.EvtUtils.getMouseWheelEventName(), this.onMouseWheelHandler);
        this.taskAreaAddEventListener("scroll", this.onScrollHandler);
        document.addEventListener("keydown", this.onKeyDownHandler);
    };
    TaskAreaManager.prototype.detachCommonEvents = function () {
        this.taskAreaRemoveEventListener("contextmenu", this.onContextMenuHandler);
        this.taskAreaRemoveEventListener(evt_1.EvtUtils.getMouseWheelEventName(), this.onMouseWheelHandler);
        this.taskAreaRemoveEventListener("scroll", this.onScrollHandler);
        document.removeEventListener("keydown", this.onKeyDownHandler);
    };
    TaskAreaManager.prototype.attachPointerEvents = function () {
        dom_1.DomUtils.addClassName(this.taskArea, exports.TOUCH_ACTION_NONE);
        document.addEventListener("pointerdown", this.onDocumentPointerDownHandler);
        document.addEventListener("pointerup", this.onDocumentPointerUpHandler);
        document.addEventListener("pointermove", this.onDocumentPointerMoveHandler);
        document.addEventListener("pointercancel", this.onDocumentPointerCancelUpHandler);
        this.taskAreaAddEventListener("pointerleave", this.onTaskAreaPointerLeaveHandler);
    };
    TaskAreaManager.prototype.detachPointerEvents = function () {
        document.removeEventListener("pointerdown", this.onDocumentPointerDownHandler);
        document.removeEventListener("pointerup", this.onDocumentPointerUpHandler);
        document.removeEventListener("pointermove", this.onDocumentPointerMoveHandler);
        document.removeEventListener("pointercancel ", this.onDocumentPointerCancelUpHandler);
        this.taskAreaRemoveEventListener("pointerleave", this.onTaskAreaPointerLeaveHandler);
        dom_1.DomUtils.removeClassName(this.taskArea, exports.TOUCH_ACTION_NONE);
    };
    TaskAreaManager.prototype.attachTouchEvents = function () {
        dom_1.DomUtils.addClassName(this.taskArea, exports.TOUCH_ACTION_NONE);
        document.addEventListener("touchstart", this.onTouchStartHandler);
        document.addEventListener("touchend", this.onTouchEndHandler);
        document.addEventListener("touchmove", this.onTouchMoveHandler);
    };
    TaskAreaManager.prototype.detachTouchEvents = function () {
        document.removeEventListener("touchstart", this.onTouchStartHandler);
        document.removeEventListener("touchend", this.onTouchEndHandler);
        document.removeEventListener("touchmove", this.onTouchMoveHandler);
        dom_1.DomUtils.removeClassName(this.taskArea, exports.TOUCH_ACTION_NONE);
    };
    TaskAreaManager.prototype.attachMouseEvents = function () {
        this.taskAreaAddEventListener("click", this.onMouseClickHandler);
        this.taskAreaAddEventListener("dblclick", this.onMouseDblClickHandler);
        this.taskAreaAddEventListener("mousedown", this.onMouseDownHandler);
        this.taskAreaAddEventListener("mouseleave", this.onTaskAreaMouseLeaveHandler);
        document.addEventListener("mousemove", this.onMouseMoveHandler);
        document.addEventListener("mouseup", this.onMouseUpHandler);
    };
    TaskAreaManager.prototype.detachMouseEvents = function () {
        this.taskAreaRemoveEventListener("click", this.onMouseClickHandler);
        this.taskAreaRemoveEventListener("dblclick", this.onMouseDblClickHandler);
        this.taskAreaRemoveEventListener("mouseleave", this.onTaskAreaMouseLeaveHandler);
        this.taskAreaRemoveEventListener("mousedown", this.onMouseDownHandler);
        document.removeEventListener("mousemove", this.onMouseMoveHandler);
        document.removeEventListener("mouseup", this.onMouseUpHandler);
    };
    Object.defineProperty(TaskAreaManager.prototype, "stateController", {
        get: function () {
            var _a;
            (_a = this._stateController) !== null && _a !== void 0 ? _a : (this._stateController = new StateController_1.TaskAreaStateController(this._eventListener, this._taskArea, this._cellSize));
            return this._stateController;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "taskArea", {
        get: function () {
            return this._taskArea;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaManager.prototype.taskAreaAddEventListener = function (type, eventHandler) {
        this.taskArea.addEventListener(type, eventHandler);
    };
    TaskAreaManager.prototype.taskAreaRemoveEventListener = function (type, eventHandler) {
        this.taskArea.removeEventListener(type, eventHandler);
    };
    Object.defineProperty(TaskAreaManager.prototype, "onContextMenuHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onContextMenuHandler) !== null && _a !== void 0 ? _a : (this._onContextMenuHandler = function (evt) { _this.stateController.onContextMenu(evt); });
            return this._onContextMenuHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onMouseWheelHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onMouseWheelHandler) !== null && _a !== void 0 ? _a : (this._onMouseWheelHandler = function (evt) { _this.stateController.onMouseWheel(evt); });
            return this._onMouseWheelHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onScrollHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onScrollHandler) !== null && _a !== void 0 ? _a : (this._onScrollHandler = function (evt) { _this.stateController.onScroll(evt); });
            return this._onScrollHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onKeyDownHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onKeyDownHandler) !== null && _a !== void 0 ? _a : (this._onKeyDownHandler = function (evt) { _this.stateController.onKeyDown(evt); });
            return this._onKeyDownHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onTaskPointerEnterHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onTaskPointerEnterHandler) !== null && _a !== void 0 ? _a : (this._onTaskPointerEnterHandler = function (evt) { _this.stateController.onTaskPointerEnter(evt); });
            return this._onTaskPointerEnterHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onTaskAreaPointerLeaveHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onTaskAreaPointerLeaveHandler) !== null && _a !== void 0 ? _a : (this._onTaskAreaPointerLeaveHandler = function (evt) { _this.stateController.onTaskAreaPointerLeave(evt); });
            return this._onTaskAreaPointerLeaveHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onDocumentPointerDownHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onDocumentPointerDownHandler) !== null && _a !== void 0 ? _a : (this._onDocumentPointerDownHandler = function (evt) { _this.stateController.onDocumentPointerDown(evt); });
            return this._onDocumentPointerDownHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onDocumentPointerUpHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onDocumentPointerUpHandler) !== null && _a !== void 0 ? _a : (this._onDocumentPointerUpHandler = function (evt) { _this.stateController.onDocumentPointerUp(evt); });
            return this._onDocumentPointerUpHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onDocumentPointerCancelUpHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onDocumentPointerCancelHandler) !== null && _a !== void 0 ? _a : (this._onDocumentPointerCancelHandler = function (evt) { _this.stateController.onDocumentPointerCancel(evt); });
            return this._onDocumentPointerCancelHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onDocumentPointerMoveHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onDocumentPointerMoveHandler) !== null && _a !== void 0 ? _a : (this._onDocumentPointerMoveHandler = function (evt) { _this.stateController.onDocumentPointerMove(evt); });
            return this._onDocumentPointerMoveHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onTouchStartHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onTouchStartHandler) !== null && _a !== void 0 ? _a : (this._onTouchStartHandler = function (evt) { _this.stateController.onTouchStart(evt); });
            return this._onTouchStartHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onTouchEndHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onTouchEndHandler) !== null && _a !== void 0 ? _a : (this._onTouchEndHandler = function (evt) { _this.stateController.onTouchEnd(evt); });
            return this._onTouchEndHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onTouchMoveHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onTouchMoveHandler) !== null && _a !== void 0 ? _a : (this._onTouchMoveHandler = function (evt) { _this.stateController.onTouchMove(evt); });
            return this._onTouchMoveHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onTaskTouchStartHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onTaskTouchStartHandler) !== null && _a !== void 0 ? _a : (this._onTaskTouchStartHandler = function (evt) { _this.stateController.onTaskTouchStart(evt); });
            return this._onTaskTouchStartHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onMouseClickHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onMouseClickHandler) !== null && _a !== void 0 ? _a : (this._onMouseClickHandler = function (evt) { _this.stateController.onClick(evt); });
            return this._onMouseClickHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onMouseDblClickHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onMouseDblClickHandler) !== null && _a !== void 0 ? _a : (this._onMouseDblClickHandler = function (evt) { _this.stateController.onDblClick(evt); });
            return this._onMouseDblClickHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onMouseDownHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onMouseDownHandler) !== null && _a !== void 0 ? _a : (this._onMouseDownHandler = function (evt) { _this.stateController.onMouseDown(evt); });
            return this._onMouseDownHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onTaskAreaMouseLeaveHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onTaskAreaMouseLeaveHandler) !== null && _a !== void 0 ? _a : (this._onTaskAreaMouseLeaveHandler = function (evt) { _this.stateController.onTaskAreaMouseLeave(evt); });
            return this._onTaskAreaMouseLeaveHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onMouseMoveHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onMouseMoveHandler) !== null && _a !== void 0 ? _a : (this._onMouseMoveHandler = function (evt) { _this.stateController.onMouseMove(evt); });
            return this._onMouseMoveHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onMouseUpHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onMouseUpHandler) !== null && _a !== void 0 ? _a : (this._onMouseUpHandler = function (evt) { _this.stateController.onMouseUp(evt); });
            return this._onMouseUpHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onTaskMouseEnterHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onTaskMouseEnterHandler) !== null && _a !== void 0 ? _a : (this._onTaskMouseEnterHandler = function (evt) { _this.stateController.onTaskElementHover(evt); });
            return this._onTaskMouseEnterHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaManager.prototype, "onTaskMouseLeaveHandler", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._onTaskMouseLeaveHandler) !== null && _a !== void 0 ? _a : (this._onTaskMouseLeaveHandler = function (evt) { _this.stateController.onTaskElementLeave(evt); });
            return this._onTaskMouseLeaveHandler;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaManager.DBLCLICK_INTERVAL = 300;
    TaskAreaManager.MS_POINTER_ACTIVE_CLASS = "ms-pointer-active";
    return TaskAreaManager;
}());
exports.TaskAreaManager = TaskAreaManager;


/***/ }),

/***/ 2366:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GanttView = void 0;
var BarManager_1 = __webpack_require__(639);
var browser_1 = __webpack_require__(9279);
var CommandManager_1 = __webpack_require__(7156);
var CreateTaskHistoryItem_1 = __webpack_require__(1284);
var DateRange_1 = __webpack_require__(858);
var DateTimeUtils_1 = __webpack_require__(7880);
var DateUtils_1 = __webpack_require__(9201);
var FullScreenHelperSettings_1 = __webpack_require__(9954);
var FullScreenModeHelper_1 = __webpack_require__(8695);
var Calculator_1 = __webpack_require__(6893);
var History_1 = __webpack_require__(8725);
var common_1 = __webpack_require__(2491);
var ModelChangesDispatcher_1 = __webpack_require__(3452);
var ModelManipulator_1 = __webpack_require__(9650);
var Exporter_1 = __webpack_require__(2978);
var RenderHelper_1 = __webpack_require__(1074);
var Settings_1 = __webpack_require__(5351);
var size_1 = __webpack_require__(6353);
var StripLineSettings_1 = __webpack_require__(9057);
var TaskEditController_1 = __webpack_require__(5098);
var TaskEditSettings_1 = __webpack_require__(9640);
var ValidationController_1 = __webpack_require__(8478);
var ValidationControllerSettings_1 = __webpack_require__(5846);
var Enums_1 = __webpack_require__(2449);
var VisualModel_1 = __webpack_require__(1408);
var GanttViewApi_1 = __webpack_require__(6626);
var evt_1 = __webpack_require__(3714);
var dom_1 = __webpack_require__(6907);
var point_1 = __webpack_require__(8900);
var TaskAreaEventsListener_1 = __webpack_require__(8269);
var DialogBase_1 = __webpack_require__(4730);
var DataObject_1 = __webpack_require__(6124);
var GanttView = (function () {
    function GanttView(element, ganttOwner, settings) {
        var _this = this;
        this.currentSelectedTaskID = "";
        this.isFocus = false;
        this._updateWithModelReloadLockedCounter = 0;
        this.scaleCount = 2;
        this.tickSize = new size_1.Size(0, 0);
        this.currentZoom = 1;
        this.stripLinesUpdaterId = null;
        this.ganttOwner = ganttOwner;
        this.settings = Settings_1.Settings.parse(settings);
        this.initValidationController();
        this.renderHelper = new RenderHelper_1.RenderHelper(this);
        this.renderHelper.initMarkup(element);
        this.loadOptionsFromGanttOwner();
        this.renderHelper.init(this.tickSize, this.range, this.settings.viewType, this.viewModel, this.settings.firstDayOfWeek);
        this.commandManager = new CommandManager_1.CommandManager(this);
        this.barManager = new BarManager_1.BarManager(this.commandManager, this.ganttOwner.bars);
        this.initTaskEditController();
        this.history = new History_1.History(this._getHistoryListener());
        this.initFullScreenModeHelper();
        this.updateView();
        this._scrollTimeOut = setTimeout(function () {
            _this.scrollLeftByViewType();
        }, 0);
        this.initializeStripLinesUpdater();
        this.initGanttViewApi();
    }
    GanttView.prototype.initGanttViewApi = function () {
        this.ganttViewApi = new GanttViewApi_1.GanttViewApi(this);
    };
    GanttView.prototype._getHistoryListener = function () {
        var listener = {
            onTransactionStart: this.onHistoryTransactionStart.bind(this),
            onTransactionEnd: this.onHistoryTransactionEnd.bind(this),
        };
        return listener;
    };
    GanttView.prototype.onHistoryTransactionStart = function () { this.lockUpdateWithReload(); };
    GanttView.prototype.onHistoryTransactionEnd = function () { this.unlockUpdateWithReload(); };
    GanttView.prototype.lockUpdateWithReload = function () {
        this._updateWithModelReloadLockedCounter++;
    };
    GanttView.prototype.unlockUpdateWithReload = function () {
        this._updateWithModelReloadLockedCounter--;
        if (this._updateWithModelReloadLockedCounter === 0 && this._pendingUpdateInfo) {
            this.updateWithDataReload(this._pendingUpdateInfo.keepExpandState);
            this._pendingUpdateInfo = null;
        }
    };
    GanttView.prototype.initValidationController = function () {
        var _this = this;
        var validationControllerSettings = ValidationControllerSettings_1.ValidationControllerSettings.parse({
            getViewModel: function () { return _this.viewModel; },
            getHistory: function () { return _this.history; },
            getModelManipulator: function () { return _this.modelManipulator; },
            getRange: function () { return _this.range; },
            getValidationSettings: function () { return _this.settings.validation; },
            updateOwnerInAutoParentMode: function () { _this.updateOwnerInAutoParentMode(); },
            getIsValidateDependenciesRequired: function () { return _this.isValidateDependenciesRequired(); }
        });
        this.validationController = new ValidationController_1.ValidationController(validationControllerSettings);
    };
    GanttView.prototype.initTaskEditController = function () {
        var _this = this;
        var taskEditSettings = TaskEditSettings_1.TaskEditSettings.parse({
            destroyTemplate: function (container) { _this.destroyTemplate(container); },
            formatDate: function (date) { return _this.getDateFormat(date); },
            getRenderHelper: function () { return _this.renderHelper; },
            getGanttSettings: function () { return _this.settings; },
            getViewModel: function () { return _this.viewModel; },
            getCommandManager: function () { return _this.commandManager; },
            getModelManipulator: function () { return _this.modelManipulator; },
            getValidationController: function () { return _this.validationController; }
        });
        this.taskEditController = new TaskEditController_1.TaskEditController(taskEditSettings);
    };
    Object.defineProperty(GanttView.prototype, "taskAreaEventsListener", {
        get: function () {
            var _a;
            (_a = this._taskAreaEventsListener) !== null && _a !== void 0 ? _a : (this._taskAreaEventsListener = new TaskAreaEventsListener_1.TaskAreaEventsListener(this));
            return this._taskAreaEventsListener;
        },
        enumerable: false,
        configurable: true
    });
    GanttView.prototype.initFullScreenModeHelper = function () {
        var _this = this;
        var fullScreenModeSeettings = FullScreenHelperSettings_1.FullScreenHelperSettings.parse({
            getMainElement: function () { return _this.getOwnerControlMainElement(); },
            adjustControl: function () { _this.adjustOwnerControl(); }
        });
        this.fullScreenModeHelper = new FullScreenModeHelper_1.FullScreenModeHelper(fullScreenModeSeettings);
    };
    GanttView.prototype.getDateRange = function (modelStartDate, modelEndDate) {
        var visibleAreaTime = this.getVisibleAreaTime();
        var start = this.settings.startDateRange || DateUtils_1.DateUtils.adjustStartDateByViewType(new Date(modelStartDate.getTime() - visibleAreaTime), this.settings.viewType, this.settings.firstDayOfWeek);
        var end = this.settings.endDateRange || DateUtils_1.DateUtils.adjustEndDateByViewType(new Date(modelEndDate.getTime() + visibleAreaTime), this.settings.viewType, this.settings.firstDayOfWeek);
        if (this.settings.startDateRange && start > end)
            end = start;
        else if (this.settings.endDateRange && start > end)
            start = end;
        return new DateRange_1.DateRange(start, end);
    };
    GanttView.prototype.getVisibleAreaTime = function () {
        var visibleTickCount = Math.ceil(this.renderHelper.getTaskAreaContainerWidth() / this.tickSize.width);
        return visibleTickCount * DateUtils_1.DateUtils.getTickTimeSpan(this.settings.viewType);
    };
    GanttView.prototype.zoomIn = function (leftPos) {
        if (leftPos === void 0) { leftPos = this.renderHelper.getTaskAreaContainerWidth() / 2; }
        this.ganttViewApi.zoomIn(leftPos);
    };
    GanttView.prototype.zoomOut = function (leftPos) {
        if (leftPos === void 0) { leftPos = this.renderHelper.getTaskAreaContainerWidth() / 2; }
        this.ganttViewApi.zoomOut(leftPos);
    };
    GanttView.prototype.scrollToDate = function (date) {
        if (date) {
            var scrollDate = date instanceof Date ? DateUtils_1.DateUtils.getOrCreateUTCDate(date) : DateUtils_1.DateUtils.parse(date);
            this.scrollToDateCore(scrollDate, 0);
        }
    };
    GanttView.prototype.showDialog = function (name, parameters, callback, afterClosing) {
        this.ganttOwner.showDialog(name, parameters, callback, afterClosing);
    };
    GanttView.prototype.showPopupMenu = function (info) {
        this.ganttOwner.showPopupMenu(info);
    };
    GanttView.prototype.hidePopupMenu = function () {
        if (this.ganttOwner.hidePopupMenu)
            this.ganttOwner.hidePopupMenu();
    };
    GanttView.prototype.collapseAll = function () {
        this.ganttOwner.collapseAll();
    };
    GanttView.prototype.expandAll = function () {
        this.ganttOwner.expandAll();
    };
    GanttView.prototype.onGanttViewContextMenu = function (evt, key, type) {
        return this.ganttOwner.onGanttViewContextMenu(evt, key, type);
    };
    GanttView.prototype.changeGanttTaskSelection = function (id, selected) {
        this.ganttOwner.changeGanttTaskSelection(id, selected);
    };
    GanttView.prototype.hideTaskEditControl = function () {
        this.taskEditController.hide();
    };
    GanttView.prototype.scrollLeftByViewType = function () {
        var adjustedStartDate = DateUtils_1.DateUtils.roundStartDate(this.dataRange.start, this.settings.viewType);
        this.scrollToDateCore(adjustedStartDate, 1);
    };
    GanttView.prototype.scrollToDateCore = function (date, addLeftPos) {
        this.renderHelper.setTaskAreaContainerScrollLeftToDate(date, addLeftPos);
    };
    GanttView.prototype.onVisualModelChanged = function () {
        this.resetAndUpdate();
    };
    GanttView.prototype.initializeStripLinesUpdater = function () {
        var _this = this;
        if (this.settings.stripLines.showCurrentTime)
            this.stripLinesUpdaterId = setInterval(function () {
                _this.renderHelper.recreateStripLines();
            }, Math.max(this.settings.stripLines.currentTimeUpdateInterval, 100));
    };
    GanttView.prototype.clearStripLinesUpdater = function () {
        if (this.stripLinesUpdaterId)
            clearInterval(this.stripLinesUpdaterId);
        this.stripLinesUpdaterId = null;
    };
    GanttView.prototype.getGanttViewStartDate = function (tasks) {
        if (!tasks)
            return new Date();
        var dates = tasks.map(function (t) { return typeof t.start === "string" ? new Date(t.start) : t.start; }).filter(function (d) { return (0, common_1.isDefined)(d); });
        return dates.length > 0 ? dates.reduce(function (min, d) { return d < min ? d : min; }, dates[0]) : new Date();
    };
    GanttView.prototype.getGanttViewEndDate = function (tasks) {
        if (!tasks)
            return new Date();
        var dates = tasks.map(function (t) { return typeof t.end === "string" ? new Date(t.end) : t.end; }).filter(function (d) { return (0, common_1.isDefined)(d); });
        return dates.length > 0 ? dates.reduce(function (max, d) { return d > max ? d : max; }, dates[0]) : new Date();
    };
    GanttView.prototype.getTask = function (index) {
        var item = this.getViewItem(index);
        return item === null || item === void 0 ? void 0 : item.task;
    };
    GanttView.prototype.getViewItem = function (index) {
        var _a;
        return (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.items[index];
    };
    GanttView.prototype.isValidateDependenciesRequired = function () {
        return this.settings.validation.validateDependencies && this.settings.showDependencies;
    };
    GanttView.prototype.updateTickSizeWidth = function () {
        this.tickSize.width = this.renderHelper.etalonScaleItemWidths * this.currentZoom;
    };
    GanttView.prototype.updateView = function () {
        this.onBeginUpdateView();
        this.renderHelper.setTimeScaleContainerScrollLeft(this.taskAreaContainerScrollLeft);
        this.processScroll(false);
        this.processScroll(true);
        this.ganttOwner.onGanttScroll(this.taskAreaContainerScrollTop);
        this.onEndUpdateView();
    };
    GanttView.prototype.onBeginUpdateView = function () {
        this[GanttView.taskAreaScrollTopKey] = this.renderHelper.taskAreaContainerScrollTop;
        this[GanttView.taskAreaScrollLeftKey] = this.renderHelper.taskAreaContainerScrollLeft;
    };
    GanttView.prototype.onEndUpdateView = function () {
        delete this[GanttView.taskAreaScrollTopKey];
        delete this[GanttView.taskAreaScrollLeftKey];
        delete this[GanttView.taskTextHeightKey];
    };
    Object.defineProperty(GanttView.prototype, "taskAreaContainerScrollTop", {
        get: function () {
            var _a;
            return (_a = this[GanttView.taskAreaScrollTopKey]) !== null && _a !== void 0 ? _a : this.renderHelper.taskAreaContainerScrollTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttView.prototype, "taskAreaContainerScrollLeft", {
        get: function () {
            var _a;
            return (_a = this[GanttView.taskAreaScrollLeftKey]) !== null && _a !== void 0 ? _a : this.renderHelper.taskAreaContainerScrollLeft;
        },
        enumerable: false,
        configurable: true
    });
    GanttView.prototype.processScroll = function (isVertical) {
        this.hideTaskEditControl();
        this.renderHelper.processScroll(isVertical);
    };
    GanttView.prototype.allowTaskAreaBorders = function (isVerticalScroll) {
        return isVerticalScroll ? this.settings.areHorizontalBordersEnabled : this.settings.areVerticalBordersEnabled;
    };
    GanttView.prototype.getScaleItemText = function (index, scale) {
        return this.renderHelper.getScaleItemText(index, scale);
    };
    GanttView.prototype.getTaskText = function (index) {
        return this.renderHelper.getTaskText(index);
    };
    GanttView.prototype.rowHasChildren = function (index) {
        var item = this.getViewItem(index);
        return (item === null || item === void 0 ? void 0 : item.children.length) > 0;
    };
    GanttView.prototype.rowHasSelection = function (index) {
        var item = this.getViewItem(index);
        return item === null || item === void 0 ? void 0 : item.selected;
    };
    GanttView.prototype.getAllVisibleTaskIndices = function (start, end) { return this.viewModel.getAllVisibleTaskIndices(start, end); };
    GanttView.prototype.getVisibleDependencyKeysByTaskRange = function (indices) {
        if (!this.settings.showDependencies)
            return [];
        var model = this.viewModel;
        var taskKeys = indices.map(function (i) { return model.tasks.items[i].internalId; });
        var dependencies = model.dependencies.items;
        return dependencies.filter(function (d) { return taskKeys.indexOf(d.successorId) > -1 || taskKeys.indexOf(d.predecessorId) > -1; }).map(function (d) { return d.internalId; });
    };
    GanttView.prototype.getTreeListTableStyle = function () {
        var _a, _b;
        return (_b = (_a = this.ganttOwner).getTreeListTableStyle) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    GanttView.prototype.getTreeListColCount = function () {
        var _a, _b;
        return (_b = (_a = this.ganttOwner).getTreeListColCount) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    GanttView.prototype.getTreeListHeaderInfo = function (colIndex) {
        var _a, _b;
        return (_b = (_a = this.ganttOwner).getTreeListHeaderInfo) === null || _b === void 0 ? void 0 : _b.call(_a, colIndex);
    };
    GanttView.prototype.getTreeListCellInfo = function (rowIndex, colIndex, key) {
        var _a, _b;
        return (_b = (_a = this.ganttOwner).getTreeListCellInfo) === null || _b === void 0 ? void 0 : _b.call(_a, rowIndex, colIndex, key);
    };
    GanttView.prototype.getTreeListEmptyDataCellInfo = function () {
        var _a, _b;
        return (_b = (_a = this.ganttOwner).getTreeListEmptyDataCellInfo) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    GanttView.prototype.exportToPdf = function (options) {
        var _a;
        (_a = options["docCreateMethod"]) !== null && _a !== void 0 ? _a : (options["docCreateMethod"] = this.getDefaultPdfDocCreateMethod());
        var exporter = new Exporter_1.PdfGanttExporter(new Calculator_1.GanttExportCalculator(this, options));
        return exporter.export();
    };
    GanttView.prototype.getDefaultPdfDocCreateMethod = function () {
        var _a;
        return (_a = window["jspdf"]) === null || _a === void 0 ? void 0 : _a["jsPDF"];
    };
    GanttView.prototype.getTaskDependencies = function (taskInternalId) {
        return this.viewModel.dependencies.items.filter(function (d) { return d.predecessorId == taskInternalId || d.successorId == taskInternalId; });
    };
    GanttView.prototype.isHighlightRowElementAllowed = function (index) {
        var viewItem = this.getViewItem(index);
        return index % 2 !== 0 && this.settings.areAlternateRowsEnabled || (viewItem === null || viewItem === void 0 ? void 0 : viewItem.children.length) > 0;
    };
    GanttView.prototype.calculateAutoViewType = function (startDate, endDate) {
        var diffInHours = (endDate.getTime() - startDate.getTime()) / (1000 * 3600);
        if (diffInHours > 24 * 365)
            return Enums_1.ViewType.Years;
        if (diffInHours > 24 * 30)
            return Enums_1.ViewType.Months;
        if (diffInHours > 24 * 7)
            return Enums_1.ViewType.Weeks;
        if (diffInHours > 24)
            return Enums_1.ViewType.Days;
        if (diffInHours > 6)
            return Enums_1.ViewType.SixHours;
        if (diffInHours > 1)
            return Enums_1.ViewType.Hours;
        return Enums_1.ViewType.TenMinutes;
    };
    GanttView.prototype.getExternalTaskAreaContainer = function (parent) {
        return this.ganttOwner.getExternalTaskAreaContainer(parent);
    };
    GanttView.prototype.prepareExternalTaskAreaContainer = function (element, info) {
        return this.ganttOwner.prepareExternalTaskAreaContainer(element, info);
    };
    GanttView.prototype.getHeaderHeight = function () {
        return this.ganttOwner.getHeaderHeight();
    };
    GanttView.prototype.changeTaskExpanded = function (publicId, expanded) {
        var task = this.getTaskByPublicId(publicId);
        if (task)
            this.viewModel.changeTaskExpanded(task.internalId, expanded);
    };
    GanttView.prototype.expandTask = function (id) { this.viewModel.changeTaskExpanded(id, true); };
    GanttView.prototype.collapseTask = function (id) { this.viewModel.changeTaskExpanded(id, false); };
    GanttView.prototype.showTask = function (id) { this.viewModel.changeTaskVisibility(id, true); };
    GanttView.prototype.hideTask = function (id) { this.viewModel.changeTaskVisibility(id, false); };
    GanttView.prototype.getTaskVisibility = function (id) { return this.viewModel.getTaskVisibility(id); };
    GanttView.prototype.unselectCurrentSelectedTask = function () { this.unselectTask(this.currentSelectedTaskID); };
    GanttView.prototype.getTaskSelected = function (id) { return this.viewModel.getTaskSelected(id); };
    GanttView.prototype.setViewType = function (viewType, autoPositioning) {
        if (autoPositioning === void 0) { autoPositioning = true; }
        this.ganttViewApi.setViewType(viewType, autoPositioning);
    };
    GanttView.prototype.setViewTypeRange = function (min, max) {
        this.ganttViewApi.setViewTypeRange(min, max);
    };
    GanttView.prototype.setTaskTitlePosition = function (taskTitlePosition) {
        if (this.settings.taskTitlePosition !== taskTitlePosition) {
            this.settings.taskTitlePosition = taskTitlePosition;
            this.resetAndUpdate();
        }
    };
    GanttView.prototype.setShowResources = function (showResources) {
        if (this.settings.showResources !== showResources) {
            this.settings.showResources = showResources;
            this.resetAndUpdate();
        }
    };
    GanttView.prototype.toggleResources = function () {
        this.setShowResources(!this.settings.showResources);
    };
    GanttView.prototype.setShowDependencies = function (showDependencies) {
        if (this.settings.showDependencies !== showDependencies) {
            this.settings.showDependencies = showDependencies;
            this.resetAndUpdate();
        }
    };
    GanttView.prototype.toggleDependencies = function () {
        this.setShowDependencies(!this.settings.showDependencies);
    };
    GanttView.prototype.setFirstDayOfWeek = function (firstDayOfWeek) {
        if (this.settings.firstDayOfWeek !== firstDayOfWeek) {
            this.settings.firstDayOfWeek = firstDayOfWeek;
            this.resetAndUpdate();
        }
    };
    GanttView.prototype.setStartDateRange = function (start) {
        if (!DateTimeUtils_1.DateTimeUtils.areDatesEqual(this.settings.startDateRange, start)) {
            this.settings.startDateRange = new Date(start);
            this.resetAndUpdate();
        }
    };
    GanttView.prototype.setEndDateRange = function (end) {
        if (!DateTimeUtils_1.DateTimeUtils.areDatesEqual(this.settings.endDateRange, end)) {
            this.settings.endDateRange = new Date(end);
            this.resetAndUpdate();
        }
    };
    GanttView.prototype.loadOptionsFromGanttOwner = function () {
        var _this = this;
        var _a;
        this.tickSize.height = this.ganttOwner.getRowHeight();
        var tasksData = this.ganttOwner.getGanttTasksData();
        this.dataRange = new DateRange_1.DateRange(this.getGanttViewStartDate(tasksData), this.getGanttViewEndDate(tasksData));
        if (this.settings.viewType == undefined)
            this.settings.viewType = this.calculateAutoViewType(this.dataRange.start, this.dataRange.end);
        this.updateTickSizeWidth();
        this.range = this.getDateRange(this.dataRange.start, this.dataRange.end);
        this.dispatcher = new ModelChangesDispatcher_1.ModelChangesDispatcher();
        var modelChangesListener = this.ganttOwner.getModelChangesListener();
        if (modelChangesListener)
            this.dispatcher.onModelChanged.add(modelChangesListener);
        this.viewModel = new VisualModel_1.ViewVisualModel(this, tasksData, this.ganttOwner.getGanttDependenciesData(), this.ganttOwner.getGanttResourcesData(), this.ganttOwner.getGanttResourceAssignmentsData(), this.range, this.ganttOwner.getGanttWorkTimeRules());
        this.modelManipulator = new ModelManipulator_1.ModelManipulator(this.viewModel, this.dispatcher);
        (_a = this.history) === null || _a === void 0 ? void 0 : _a.historyItems.forEach(function (i) { return i.setModelManipulator(_this.modelManipulator); });
    };
    GanttView.prototype.resetAndUpdate = function () {
        this.range = this.getDateRange(this.dataRange.start, this.dataRange.end);
        this.viewModel.updateRange(this.range);
        this.renderHelper.resetAndUpdate(this.tickSize, this.range, this.settings.viewType, this.viewModel, this.settings.firstDayOfWeek);
        if (browser_1.Browser.IE)
            this.taskEditController.createElements();
        this.updateView();
    };
    GanttView.prototype.cleanMarkup = function () {
        this.setNormalScreenMode();
        this.renderHelper.taskAreaManagerDetachEvents();
        this.taskEditController.detachEvents();
        this.clearStripLinesUpdater();
        this.renderHelper.reset();
        clearTimeout(this._scrollTimeOut);
    };
    GanttView.prototype.checkAndProcessModelChanges = function () {
        var tasks = this.ganttOwner.getGanttTasksData();
        var changed = this.viewModel.refreshTaskDataIfRequires(tasks);
        if (changed)
            this.resetAndUpdate();
        return changed;
    };
    GanttView.prototype.updateHistoryObsoleteInsertedKey = function (oldKey, newKey, type) {
        var _a;
        (_a = this.history) === null || _a === void 0 ? void 0 : _a.updateObsoleteInsertedKey(oldKey, newKey, type);
        if (type === DataObject_1.GanttDataObjectNames.dependency)
            this.renderHelper.updateRenderedConnectorLinesId(oldKey, newKey);
    };
    GanttView.prototype.updateRowHeights = function (height) {
        if (this.tickSize.height !== height) {
            this.tickSize.height = height;
            var leftPosition = this.renderHelper.getTaskAreaContainerScrollLeft();
            this.resetAndUpdate();
            this.renderHelper.setTaskAreaContainerScrollLeft(leftPosition);
        }
    };
    GanttView.prototype.selectTask = function (id) {
        this.selectDependency(null);
        this.viewModel.changeTaskSelected(id, true);
        this.currentSelectedTaskID = id;
        this.updateBarManager();
    };
    GanttView.prototype.unselectTask = function (id) {
        this.viewModel.changeTaskSelected(id, false);
        this.updateBarManager();
    };
    GanttView.prototype.selectTaskById = function (publicId) {
        this.unselectCurrentSelectedTask();
        var task = this.getTaskByPublicId(publicId);
        if (task)
            this.selectTask(task.internalId);
    };
    GanttView.prototype.selectDependency = function (id) {
        this.taskEditController.selectDependency(id);
        this.renderHelper.createConnectorLines();
    };
    GanttView.prototype.getTaskAreaContainer = function () {
        return this.renderHelper.taskAreaContainer;
    };
    GanttView.prototype.setWidth = function (value) {
        this.renderHelper.setMainElementWidth(value);
    };
    GanttView.prototype.setHeight = function (value) {
        this.renderHelper.setMainElementHeight(value);
    };
    GanttView.prototype.setAllowSelection = function (value) {
        this.settings.allowSelectTask = value;
    };
    GanttView.prototype.setEditingSettings = function (value) {
        this.settings.editing = value;
        this.updateBarManager();
    };
    GanttView.prototype.setValidationSettings = function (value) {
        this.settings.validation = value;
    };
    GanttView.prototype.setRowLinesVisible = function (value) {
        this.settings.areHorizontalBordersEnabled = value;
        this.renderHelper.prepareTaskAreaContainer();
        this.resetAndUpdate();
    };
    GanttView.prototype.setStripLines = function (stripLines) {
        this.settings.stripLines = StripLineSettings_1.StripLineSettings.parse(stripLines);
        this.clearStripLinesUpdater();
        this.initializeStripLinesUpdater();
        this.renderHelper.recreateStripLines();
    };
    GanttView.prototype.deleteTask = function (key) {
        var task = this.getTaskByPublicId(key.toString());
        if (task)
            this.commandManager.removeTaskCommand.execute(task.internalId, false, true);
    };
    GanttView.prototype.insertTask = function (data) {
        if (data) {
            var parentId = data.parentId != null ? String(data.parentId) : null;
            var parent_1 = this.getTaskByPublicId(parentId);
            var rootId = this.viewModel.getRootTaskId();
            var start = typeof data.start === "string" ? new Date(data.start) : data.start;
            var end = typeof data.end === "string" ? new Date(data.end) : data.end;
            var taskData = {
                parentId: rootId && parentId === rootId ? parentId : parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.internalId,
                title: data.title,
                start: start,
                end: end,
                progress: parseInt(data.progress) || 0,
                color: data.color
            };
            if (this.commandManager.createTaskCommand.execute(taskData))
                return this.getLastInsertedTaskId();
        }
        return "";
    };
    GanttView.prototype.updateTask = function (key, data) {
        var task = this.getTaskByPublicId(key.toString());
        var dataToExecute = this._getTaskDataForUpdate(data, task);
        if (dataToExecute)
            this.commandManager.updateTaskCommand.execute(task.internalId, dataToExecute);
    };
    GanttView.prototype.getTaskData = function (key) {
        var task = this.getTaskByPublicId(key.toString());
        if (task)
            return this.viewModel.getTaskObjectForDataSource(task);
    };
    GanttView.prototype.insertDependency = function (data) {
        if (!data)
            return;
        var predecessorId = String(data.predecessorId);
        var predecessor = this.getTaskByPublicId(predecessorId);
        var successorId = String(data.successorId);
        var successor = this.getTaskByPublicId(successorId);
        var type = data.type;
        if (predecessor && successor && this.validationController.canCreateDependency(predecessorId, successorId))
            this.commandManager.createDependencyCommand.execute(predecessor.internalId, successor.internalId, type);
    };
    GanttView.prototype.deleteDependency = function (key) {
        var internalKey = this.viewModel.convertPublicToInternalKey("dependency", key);
        if ((0, common_1.isDefined)(internalKey))
            this.commandManager.removeDependencyCommand.execute(internalKey);
    };
    GanttView.prototype.getDependencyData = function (key) {
        return this.viewModel.getDependencyObjectForDataSource(key);
    };
    GanttView.prototype.insertResource = function (data, taskKeys) {
        var _this = this;
        if (data) {
            var callback = function (id) {
                if ((0, common_1.isDefined)(taskKeys))
                    for (var i = 0; i < taskKeys.length; i++)
                        _this.assignResourceToTask(id, taskKeys[i]);
            };
            this.commandManager.createResourceCommand.execute(String(data.text), data.color && String(data.color), callback);
        }
    };
    GanttView.prototype.deleteResource = function (key) {
        var internalKey = this.viewModel.convertPublicToInternalKey("resource", key);
        if ((0, common_1.isDefined)(internalKey))
            this.commandManager.removeResourceCommand.execute(internalKey);
    };
    GanttView.prototype.assignResourceToTask = function (resourceKey, taskKey) {
        var resourceInternalKey = this.viewModel.convertPublicToInternalKey("resource", resourceKey);
        var taskInternalKey = this.viewModel.convertPublicToInternalKey("task", taskKey);
        if ((0, common_1.isDefined)(resourceInternalKey) && (0, common_1.isDefined)(taskInternalKey))
            this.commandManager.assignResourceCommand.execute(resourceInternalKey, taskInternalKey);
    };
    GanttView.prototype.unassignResourceFromTask = function (resourceKey, taskKey) {
        var assignment = this.viewModel.findAssignment(resourceKey, taskKey);
        if (assignment)
            this.commandManager.deassignResourceCommand.execute(assignment.internalId);
    };
    GanttView.prototype.unassignAllResourcesFromTask = function (taskPublicKey) {
        var _this = this;
        var taskInternalKey = this.viewModel.convertPublicToInternalKey("task", taskPublicKey);
        var assignments = this.viewModel.findAllTaskAssignments(taskInternalKey);
        assignments.forEach(function (assignment) { return _this.commandManager.deassignResourceCommand.execute(assignment.internalId); });
    };
    GanttView.prototype.getResourceData = function (key) {
        return this.viewModel.getResourceObjectForDataSource(key);
    };
    GanttView.prototype.getResourceAssignmentData = function (key) {
        return this.viewModel.getResourceAssignmentObjectForDataSource(key);
    };
    GanttView.prototype.getTaskResources = function (key) {
        var model = this.viewModel;
        var task = model.getItemByPublicId("task", key);
        return (task && model.getAssignedResources(task).items) || [];
    };
    GanttView.prototype.getVisibleTaskKeys = function () { return this.viewModel.getVisibleTasks().map(function (t) { return t.id; }); };
    GanttView.prototype.getVisibleDependencyKeys = function () { return this.viewModel.getVisibleDependencies().map(function (d) { return d.id; }); };
    GanttView.prototype.getVisibleResourceKeys = function () { return this.viewModel.getVisibleResources().map(function (r) { return r.id; }); };
    GanttView.prototype.getVisibleResourceAssignmentKeys = function () { return this.viewModel.getVisibleResourceAssignments().map(function (a) { return a.id; }); };
    GanttView.prototype.getTasksExpandedState = function () { return this.viewModel.getTasksExpandedState(); };
    GanttView.prototype.applyTasksExpandedState = function (state) { this.viewModel.applyTasksExpandedState(state); };
    GanttView.prototype.updateWithDataReload = function (keepExpandState) {
        if (this._updateWithModelReloadLockedCounter > 0) {
            this._pendingUpdateInfo = { keepExpandState: keepExpandState };
            return;
        }
        var state = keepExpandState && this.getTasksExpandedState();
        this.loadOptionsFromGanttOwner();
        if (keepExpandState)
            this.applyTasksExpandedState(state);
        else
            this.resetAndUpdate();
        var activeDialog = DialogBase_1.DialogBase.activeInstance;
        if (activeDialog && activeDialog.canRefresh && activeDialog.getDialogName() === "TaskEdit")
            activeDialog.refresh();
        this.dispatcher.notifyGanttViewUpdated();
    };
    GanttView.prototype.onBrowserWindowResize = function () {
        if (this.fullScreenModeHelper.isInFullScreenMode)
            this.fullScreenModeHelper.adjustControlInFullScreenMode();
        else
            this.adjustOwnerControl();
    };
    GanttView.prototype.getTaskTreeLine = function (taskKey) {
        return this.viewModel.getTaskTreeLine(taskKey).reverse();
    };
    GanttView.prototype.isInFullScreenMode = function () {
        var _a;
        return !!((_a = this.fullScreenModeHelper) === null || _a === void 0 ? void 0 : _a.isInFullScreenMode);
    };
    GanttView.prototype.setFullScreenMode = function () {
        if (!this.isInFullScreenMode())
            this.fullScreenModeHelper.toggle();
    };
    GanttView.prototype.setNormalScreenMode = function () {
        if (this.isInFullScreenMode())
            this.fullScreenModeHelper.toggle();
    };
    GanttView.prototype.setTaskValue = function (id, fieldName, newValue) {
        var command = this.commandManager.updateTaskCommand;
        var task = this.getTaskByPublicId(id);
        var data = {};
        if (task) {
            if (fieldName === "title")
                data[fieldName] = newValue ? newValue : "";
            if (fieldName === "progress")
                data[fieldName] = newValue;
            if (fieldName === "start")
                data[fieldName] = DateTimeUtils_1.DateTimeUtils.getMinDate(newValue, task.end);
            if (fieldName === "end")
                data[fieldName] = DateTimeUtils_1.DateTimeUtils.getMaxDate(newValue, task.start);
        }
        return Object.keys(data).length > 0 ? command.execute(task.internalId, data) : false;
    };
    GanttView.prototype.getLastInsertedTaskId = function () {
        var createTaskItems = this.history.historyItems.filter(function (i) { return i instanceof CreateTaskHistoryItem_1.CreateTaskHistoryItem; });
        var lastItem = createTaskItems[createTaskItems.length - 1];
        return lastItem && lastItem.insertedKey;
    };
    GanttView.prototype.getTaskByPublicId = function (id) {
        return this.viewModel.tasks.getItemByPublicId(id);
    };
    GanttView.prototype.getPrevTask = function (taskId) {
        var item = this.viewModel.findItem(taskId);
        if (!item)
            return null;
        var parent = item.parent || this.viewModel.root;
        var index = parent.children.indexOf(item) - 1;
        return index > -1 ? item.parent.children[index].task : item.parent.task;
    };
    GanttView.prototype.getTaskIdByInternalId = function (internalId) {
        var item = this.viewModel.findItem(internalId);
        var task = item && item.task;
        return task ? task.id : null;
    };
    GanttView.prototype.isTaskHasChildren = function (taskId) {
        var item = this.viewModel.findItem(taskId);
        return item && item.children.length > 0;
    };
    GanttView.prototype.requireFirstLoadParentAutoCalc = function () {
        var owner = this.ganttOwner;
        return owner.getRequireFirstLoadParentAutoCalc && owner.getRequireFirstLoadParentAutoCalc();
    };
    GanttView.prototype.updateOwnerInAutoParentMode = function () {
        if (this.viewModel.parentAutoCalc)
            this.dispatcher.notifyParentDataRecalculated(this.viewModel.getCurrentTaskData());
    };
    GanttView.prototype.getOwnerControlMainElement = function () {
        var owner = this.ganttOwner;
        return owner.getMainElement && owner.getMainElement();
    };
    GanttView.prototype.adjustOwnerControl = function () {
        var owner = this.ganttOwner;
        if (owner.adjustControl)
            owner.adjustControl();
    };
    GanttView.prototype.applySettings = function (settings, preventViewUpdate) {
        if (preventViewUpdate === void 0) { preventViewUpdate = false; }
        var ganttSettings = Settings_1.Settings.parse(settings);
        var preventUpdate = preventViewUpdate || this.settings.equal(ganttSettings);
        this.settings = ganttSettings;
        if (!preventUpdate)
            this.resetAndUpdate();
    };
    GanttView.prototype.getDataUpdateErrorCallback = function () {
        var _this = this;
        var history = this.history;
        var currentHistoryItemInfo = history.getCurrentProcessingItemInfo();
        return function () {
            _this.dispatcher.lock();
            history.rollBackAndRemove(currentHistoryItemInfo);
            _this.dispatcher.unlock();
            _this.updateBarManager();
        };
    };
    GanttView.prototype.setTaskTooltipContentTemplate = function (taskTooltipContentTemplate) {
        this.settings.taskTooltipContentTemplate = taskTooltipContentTemplate;
    };
    GanttView.prototype.setTaskProgressTooltipContentTemplate = function (taskProgressTooltipContentTemplate) {
        this.settings.taskProgressTooltipContentTemplate = taskProgressTooltipContentTemplate;
    };
    GanttView.prototype.setTaskTimeTooltipContentTemplate = function (taskTimeTooltipContentTemplate) {
        this.settings.taskTimeTooltipContentTemplate = taskTimeTooltipContentTemplate;
    };
    GanttView.prototype.setTaskContentTemplate = function (taskContentTemplate) {
        this.settings.taskContentTemplate = taskContentTemplate;
    };
    GanttView.prototype.updateBarManager = function () {
        this.barManager.updateItemsState([]);
    };
    GanttView.prototype.onTaskAreaClick = function (rowIndex, evt) {
        var _a;
        var clickedItem = this.viewModel.items[rowIndex];
        return clickedItem && this.onTaskClick((_a = clickedItem.task) === null || _a === void 0 ? void 0 : _a.id, evt);
    };
    GanttView.prototype.onTaskAreaDblClick = function (rowIndex, evt) {
        var clickedItem = this.viewModel.items[rowIndex];
        if (clickedItem && this.onTaskDblClick(clickedItem.task.id, evt))
            this.commandManager.showTaskEditDialog.execute(clickedItem.task);
    };
    GanttView.prototype.onTaskAreaContextMenu = function (rowIndex, evt, type) {
        var _a, _b;
        var isDependency = type === "dependency";
        var event = evt;
        var model = this.viewModel;
        var key = isDependency ? model.convertInternalToPublicKey("dependency", evt_1.EvtUtils.getEventSource(evt).getAttribute("dependency-id")) : (_b = (_a = model.items[rowIndex]) === null || _a === void 0 ? void 0 : _a.task) === null || _b === void 0 ? void 0 : _b.id;
        if (this.onGanttViewContextMenu(evt, key, type)) {
            var info = {
                event: evt,
                type: type,
                key: key,
                position: new point_1.Point(evt_1.EvtUtils.getEventX(event), evt_1.EvtUtils.getEventY(event))
            };
            this.showPopupMenu(info);
        }
    };
    GanttView.prototype.onTaskSelectionChanged = function (rowIndex, evt) {
        var _this = this;
        var clickedTask = this.viewModel.items[rowIndex];
        this.isFocus = dom_1.DomUtils.isItParent(this.renderHelper.taskArea, evt_1.EvtUtils.getEventSource(evt));
        if (clickedTask && this.isFocus && this.settings.allowSelectTask)
            setTimeout(function () { _this.changeGanttTaskSelection(clickedTask.task.id, true); }, 0);
    };
    GanttView.prototype.onTaskClick = function (key, evt) {
        if (!this.ganttOwner.onTaskClick)
            return true;
        return this.ganttOwner.onTaskClick(key, evt);
    };
    GanttView.prototype.onTaskDblClick = function (key, evt) {
        if (!this.ganttOwner.onTaskDblClick)
            return true;
        return this.ganttOwner.onTaskDblClick(key, evt);
    };
    GanttView.prototype.getDateFormat = function (date) {
        return this.ganttOwner.getFormattedDateText ? this.ganttOwner.getFormattedDateText(date) : this.getDefaultDateFormat(date);
    };
    GanttView.prototype.getDefaultDateFormat = function (date) {
        return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    };
    GanttView.prototype.destroyTemplate = function (container) {
        this.ganttOwner.destroyTemplate ? this.ganttOwner.destroyTemplate(container) : container.innerHTML = "";
    };
    GanttView.prototype.onTaskAreaSizeChanged = function (info) {
        if (this.ganttOwner.onTaskAreaSizeChanged)
            this.ganttOwner.onTaskAreaSizeChanged(info);
    };
    GanttView.prototype.showTaskEditDialog = function () {
        this.commandManager.showTaskEditDialog.execute();
    };
    GanttView.prototype.showTaskDetailsDialog = function (taskPublicKey) {
        var task = this.getTaskByPublicId(taskPublicKey);
        if (task)
            this.commandManager.showTaskEditDialog.execute(task, true);
    };
    GanttView.prototype.showResourcesDialog = function () {
        this.commandManager.showResourcesDialog.execute();
    };
    GanttView.prototype.getCommandByKey = function (key) {
        return this.commandManager.getCommand(key);
    };
    GanttView.prototype._getTaskDataForUpdate = function (data, task) {
        var result = {};
        if (task && data) {
            if ((0, common_1.isDefined)(data.title) && data.title !== task.title)
                result["title"] = data.title;
            if ((0, common_1.isDefined)(data.progress) && data.progress !== task.progress)
                result["progress"] = data.progress;
            if ((0, common_1.isDefined)(data.start) && data.start !== task.start)
                result["start"] = data.start;
            if ((0, common_1.isDefined)(data.end) && data.end !== task.end)
                result["end"] = data.end;
            if ((0, common_1.isDefined)(data.color) && data.color !== task.color)
                result["color"] = data.color;
        }
        return Object.keys(result).length > 0 ? result : null;
    };
    GanttView.prototype.updateViewDataRange = function () {
        var model = this.viewModel;
        var minStart = model.getTaskMinStart();
        var maxEnd = model.getTaskMaxEnd();
        var startChanged = minStart.getTime() < this.dataRange.start.getTime();
        var endChanged = maxEnd.getTime() > this.dataRange.end.getTime();
        if (startChanged)
            this.dataRange.start = minStart;
        if (endChanged)
            this.dataRange.end = maxEnd;
        if (startChanged || endChanged)
            this.resetAndUpdate();
    };
    GanttView.cachedPrefix = "cached_";
    GanttView.taskAreaScrollLeftKey = GanttView.cachedPrefix + "taskAreaScrollLeft";
    GanttView.taskAreaScrollTopKey = GanttView.cachedPrefix + "taskAreaScrollTop";
    GanttView.taskTextHeightKey = GanttView.cachedPrefix + "taskTextHeight";
    return GanttView;
}());
exports.GanttView = GanttView;


/***/ }),

/***/ 2449:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaEventSource = exports.TaskTitlePosition = exports.Position = exports.ViewType = void 0;
var ViewType;
(function (ViewType) {
    ViewType[ViewType["TenMinutes"] = 0] = "TenMinutes";
    ViewType[ViewType["Hours"] = 1] = "Hours";
    ViewType[ViewType["SixHours"] = 2] = "SixHours";
    ViewType[ViewType["Days"] = 3] = "Days";
    ViewType[ViewType["Weeks"] = 4] = "Weeks";
    ViewType[ViewType["Months"] = 5] = "Months";
    ViewType[ViewType["Quarter"] = 6] = "Quarter";
    ViewType[ViewType["Years"] = 7] = "Years";
    ViewType[ViewType["FiveYears"] = 8] = "FiveYears";
})(ViewType = exports.ViewType || (exports.ViewType = {}));
var Position;
(function (Position) {
    Position[Position["Left"] = 0] = "Left";
    Position[Position["Top"] = 1] = "Top";
    Position[Position["Right"] = 2] = "Right";
    Position[Position["Bottom"] = 3] = "Bottom";
})(Position = exports.Position || (exports.Position = {}));
var TaskTitlePosition;
(function (TaskTitlePosition) {
    TaskTitlePosition[TaskTitlePosition["Inside"] = 0] = "Inside";
    TaskTitlePosition[TaskTitlePosition["Outside"] = 1] = "Outside";
    TaskTitlePosition[TaskTitlePosition["None"] = 2] = "None";
})(TaskTitlePosition = exports.TaskTitlePosition || (exports.TaskTitlePosition = {}));
var TaskAreaEventSource;
(function (TaskAreaEventSource) {
    TaskAreaEventSource[TaskAreaEventSource["TaskArea"] = 0] = "TaskArea";
    TaskAreaEventSource[TaskAreaEventSource["TaskEdit_Frame"] = 1] = "TaskEdit_Frame";
    TaskAreaEventSource[TaskAreaEventSource["TaskEdit_Progress"] = 2] = "TaskEdit_Progress";
    TaskAreaEventSource[TaskAreaEventSource["TaskEdit_Start"] = 3] = "TaskEdit_Start";
    TaskAreaEventSource[TaskAreaEventSource["TaskEdit_End"] = 4] = "TaskEdit_End";
    TaskAreaEventSource[TaskAreaEventSource["TaskEdit_DependencyStart"] = 5] = "TaskEdit_DependencyStart";
    TaskAreaEventSource[TaskAreaEventSource["TaskEdit_DependencyFinish"] = 6] = "TaskEdit_DependencyFinish";
    TaskAreaEventSource[TaskAreaEventSource["Successor_Wrapper"] = 7] = "Successor_Wrapper";
    TaskAreaEventSource[TaskAreaEventSource["Successor_DependencyStart"] = 8] = "Successor_DependencyStart";
    TaskAreaEventSource[TaskAreaEventSource["Successor_DependencyFinish"] = 9] = "Successor_DependencyFinish";
})(TaskAreaEventSource = exports.TaskAreaEventSource || (exports.TaskAreaEventSource = {}));


/***/ }),

/***/ 8877:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EtalonSizeValues = void 0;
var EtalonSizeValues = (function () {
    function EtalonSizeValues() {
        this.scaleItemWidths = {};
    }
    return EtalonSizeValues;
}());
exports.EtalonSizeValues = EtalonSizeValues;


/***/ }),

/***/ 8695:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FullScreenModeHelper = void 0;
var browser_1 = __webpack_require__(9279);
var attr_1 = __webpack_require__(2217);
var dom_1 = __webpack_require__(6907);
var FullScreenModeHelper = (function () {
    function FullScreenModeHelper(settings) {
        this._isInFullScreenMode = false;
        this.fullScreenTempVars = {};
        this.settings = settings;
    }
    Object.defineProperty(FullScreenModeHelper.prototype, "isInFullScreenMode", {
        get: function () { return this._isInFullScreenMode; },
        enumerable: false,
        configurable: true
    });
    FullScreenModeHelper.prototype.getMainElement = function () {
        return this.settings.getMainElement();
    };
    FullScreenModeHelper.prototype.adjustControl = function () {
        this.settings.adjustControl();
    };
    FullScreenModeHelper.prototype.toggle = function () {
        this._isInFullScreenMode = !this._isInFullScreenMode;
        if (this._isInFullScreenMode)
            this.setFullScreenMode();
        else
            this.setNormalMode();
        return true;
    };
    FullScreenModeHelper.prototype.setFullScreenMode = function () {
        this.prepareFullScreenMode();
        this.adjustControlInFullScreenMode();
    };
    FullScreenModeHelper.prototype.prepareFullScreenMode = function () {
        var mainElement = this.getMainElement();
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "border-top-width", "0px");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "border-left-width", "0px");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "border-right-width", "0px");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "border-bottom-width", "0px");
        this.fullScreenTempVars.scrollTop = dom_1.DomUtils.getDocumentScrollTop();
        this.fullScreenTempVars.scrollLeft = dom_1.DomUtils.getDocumentScrollLeft();
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "background-color", "white");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "position", "fixed");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "top", "0px");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "left", "0px");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "z-index", "1010");
        attr_1.AttrUtils.changeElementStyleAttribute(document.documentElement, "position", "static");
        attr_1.AttrUtils.changeElementStyleAttribute(document.documentElement, "overflow", "hidden");
        this.fullScreenTempVars.bodyMargin = document.body.style.margin;
        document.body.style.margin = "0";
        this.fullScreenTempVars.width = mainElement.style.width;
        this.fullScreenTempVars.height = mainElement.style.height || mainElement.clientHeight;
        if (window.self !== window.top)
            this.requestFullScreen(document.body);
    };
    FullScreenModeHelper.prototype.setNormalMode = function () {
        this.cancelFullScreen(document);
        var mainElement = this.getMainElement();
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "left");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "top");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "background-color");
        attr_1.AttrUtils.restoreElementStyleAttribute(document.documentElement, "overflow");
        attr_1.AttrUtils.restoreElementStyleAttribute(document.documentElement, "position");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "z-index");
        document.body.style.margin = this.fullScreenTempVars.bodyMargin;
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "position");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "border-top-width");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "border-left-width");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "border-right-width");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "border-bottom-width");
        this.setHeight(this.fullScreenTempVars.height);
        this.setWidth(this.fullScreenTempVars.width);
        document.documentElement.scrollTop = this.fullScreenTempVars.scrollTop;
        document.documentElement.scrollLeft = this.fullScreenTempVars.scrollLeft;
        this.adjustControl();
    };
    FullScreenModeHelper.prototype.adjustControlInFullScreenMode = function () {
        var documentWidth = document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth;
        var documentHeight = document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
        this.setWidth(documentWidth);
        this.setHeight(documentHeight);
        this.adjustControl();
    };
    FullScreenModeHelper.prototype.requestFullScreen = function (element) {
        if (element.requestFullscreen)
            element.requestFullscreen();
        else if (element.mozRequestFullScreen)
            element.mozRequestFullScreen();
        else if (element.webkitRequestFullscreen)
            element.webkitRequestFullscreen();
        else if (element.msRequestFullscreen)
            element.msRequestFullscreen();
    };
    FullScreenModeHelper.prototype.cancelFullScreen = function (document) {
        if (browser_1.Browser.Firefox && !this.getFullScreenElement(document))
            return;
        if (document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if (document.msExitFullscreen)
            document.msExitFullscreen();
        else if (document.exitFullscreen)
            document.exitFullscreen();
    };
    FullScreenModeHelper.prototype.getFullScreenElement = function (document) {
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    };
    FullScreenModeHelper.prototype.setWidth = function (width) {
        var mainElement = this.getMainElement();
        mainElement.style.width = this.isNumber(width) ? width + "px" : width;
    };
    FullScreenModeHelper.prototype.setHeight = function (height) {
        var mainElement = this.getMainElement();
        mainElement.style.height = this.isNumber(height) ? height + "px" : height;
    };
    FullScreenModeHelper.prototype.isNumber = function (str) {
        return !isNaN(parseFloat(str)) && isFinite(str);
    };
    return FullScreenModeHelper;
}());
exports.FullScreenModeHelper = FullScreenModeHelper;


/***/ }),

/***/ 1391:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridElementInfo = void 0;
var point_1 = __webpack_require__(8900);
var size_1 = __webpack_require__(6353);
var margins_1 = __webpack_require__(3604);
var GridElementInfo = (function () {
    function GridElementInfo(className, position, size) {
        this.id = GridElementInfo.id++;
        this.position = new point_1.Point(undefined, undefined);
        this.size = new size_1.Size(0, 0);
        this.margins = new margins_1.Margins(undefined, undefined, undefined, undefined);
        this.attr = {};
        this.style = {};
        this.additionalInfo = {};
        if (className)
            this.className = className;
        if (position)
            this.setPosition(position);
        if (size)
            this.setSize(size);
    }
    GridElementInfo.prototype.setSize = function (size) {
        this.size.width = size.width;
        this.size.height = size.height;
    };
    GridElementInfo.prototype.setPosition = function (position) {
        this.position.x = position.x;
        this.position.y = position.y;
    };
    GridElementInfo.prototype.assignToElement = function (element) {
        this.assignPosition(element);
        this.assignSize(element);
        this.assignMargins(element);
        if (this.className)
            element.className = this.className;
    };
    GridElementInfo.prototype.assignPosition = function (element) {
        if (this.position.x != null)
            element.style.left = this.position.x + "px";
        if (this.position.y != null)
            element.style.top = this.position.y + "px";
    };
    GridElementInfo.prototype.assignSize = function (element) {
        if (this.size.width)
            element.style.width = this.size.width + "px";
        if (this.size.height)
            element.style.height = this.size.height + "px";
    };
    GridElementInfo.prototype.assignMargins = function (element) {
        if (this.margins.left)
            element.style.marginLeft = this.margins.left + "px";
        if (this.margins.top)
            element.style.marginTop = this.margins.top + "px";
        if (this.margins.right)
            element.style.marginRight = this.margins.right + "px";
        if (this.margins.bottom)
            element.style.marginBottom = this.margins.bottom + "px";
    };
    GridElementInfo.prototype.setAttribute = function (name, value) {
        this.attr[name] = value;
    };
    GridElementInfo.id = 0;
    return GridElementInfo;
}());
exports.GridElementInfo = GridElementInfo;


/***/ }),

/***/ 1855:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridLayoutCalculator = void 0;
var size_1 = __webpack_require__(6353);
var DateRange_1 = __webpack_require__(858);
var Enums_1 = __webpack_require__(2449);
var GridElementInfo_1 = __webpack_require__(1391);
var point_1 = __webpack_require__(8900);
var DateUtils_1 = __webpack_require__(9201);
var StripLine_1 = __webpack_require__(1442);
var Enums_2 = __webpack_require__(5950);
var ScaleCalculator_1 = __webpack_require__(7072);
var common_1 = __webpack_require__(2491);
var GridLayoutCalculator = (function () {
    function GridLayoutCalculator() {
        this.tileToDependencyMap = [];
        this.tileToNoWorkingIntervalsMap = [];
        this.minLineLength = 10;
        this.resourceMaxWidth = 500;
        this.minTaskWidth = 2;
        this._taskWrapperPoints = Array();
        this._taskElementInfoList = Array();
        this._scaleCalculator = new ScaleCalculator_1.ScaleCalculator();
    }
    GridLayoutCalculator.prototype.setSettings = function (visibleTaskAreaSize, tickSize, elementSizeValues, range, viewModel, viewType, scrollBarHeight, firstDayOfWeek) {
        if (scrollBarHeight === void 0) { scrollBarHeight = 0; }
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        this.visibleTaskAreaSize = visibleTaskAreaSize;
        this.tickSize = tickSize;
        this._viewType = viewType;
        this.range = range;
        this.verticalTickCount = viewModel.itemCount;
        this.viewModel = viewModel;
        this.elementSizeValues = elementSizeValues;
        this.taskHeight = elementSizeValues.taskHeight;
        this.parentTaskHeight = elementSizeValues.parentTaskHeight;
        this.milestoneWidth = elementSizeValues.milestoneWidth;
        this.scaleHeight = elementSizeValues.scaleItemHeight;
        this.arrowSize = new size_1.Size(elementSizeValues.connectorArrowWidth, elementSizeValues.connectorArrowWidth);
        this.lineThickness = elementSizeValues.connectorLineThickness;
        this.minConnectorSpaceFromTask = (this.tickSize.height - this.taskHeight) / 2;
        this.tickTimeSpan = DateUtils_1.DateUtils.getTickTimeSpan(viewType);
        this.scrollBarHeight = scrollBarHeight;
        this.createTileToNonWorkingIntervalsMap();
        this._scaleCalculator.setSettings(range, viewType, tickSize, firstDayOfWeek);
        this.reset();
    };
    Object.defineProperty(GridLayoutCalculator.prototype, "viewType", {
        get: function () { return this._viewType; },
        set: function (value) {
            if (this._viewType !== value) {
                this._viewType = value;
                this._scaleCalculator.setViewType(value);
            }
        },
        enumerable: false,
        configurable: true
    });
    GridLayoutCalculator.prototype.reset = function () {
        this._taskWrapperPoints = new Array();
        this._taskElementInfoList = Array();
    };
    GridLayoutCalculator.prototype.resetTaskInfo = function (index) {
        delete this._taskWrapperPoints[index];
        delete this._taskElementInfoList[index];
    };
    GridLayoutCalculator.prototype.getTaskAreaBorderInfo = function (index, isVertical) {
        var sizeValue = isVertical ? this.getVerticalGridLineHeight() : this.getTotalWidth();
        return this.getGridBorderInfo(index, isVertical, sizeValue);
    };
    GridLayoutCalculator.prototype.getTotalWidth = function () {
        return this._scaleCalculator.scaleWidth;
    };
    GridLayoutCalculator.prototype.getScaleBorderInfo = function (index, scaleType) {
        var result = new GridElementInfo_1.GridElementInfo();
        var calc = this._scaleCalculator;
        result.setPosition(new point_1.Point(calc.getScaleBorderPosition(index, scaleType), undefined));
        result.setSize(new size_1.Size(0, this.scaleHeight));
        result.className = "dx-gantt-vb";
        return result;
    };
    GridLayoutCalculator.prototype.getGridBorderInfo = function (index, isVertical, size) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.setPosition(this.getGridBorderPosition(index, isVertical));
        if (size)
            result.setSize(this.getGridBorderSize(isVertical, size));
        result.className = isVertical ? "dx-gantt-vb" : "dx-gantt-hb";
        return result;
    };
    GridLayoutCalculator.prototype.getGridBorderPosition = function (index, isVertical) {
        var result = new point_1.Point(undefined, undefined);
        var calc = this._scaleCalculator;
        var posValue = isVertical ? calc.getScaleBorderPosition(index, this.viewType) : (index + 1) * this.tickSize.height;
        if (isVertical)
            result.x = posValue;
        else
            result.y = posValue;
        return result;
    };
    GridLayoutCalculator.prototype.getGridBorderSize = function (isVertical, sizeValue) {
        var result = new size_1.Size(0, 0);
        if (isVertical)
            result.height = sizeValue;
        else
            result.width = sizeValue;
        return result;
    };
    GridLayoutCalculator.prototype.getScaleElementInfo = function (index, scaleType) {
        var result = new GridElementInfo_1.GridElementInfo();
        var item = this.getScaleItemInfo(index, scaleType);
        if (item) {
            result.setPosition(item.position);
            result.setSize(item.size);
            result.className = this.getScaleItemClassName(scaleType, result, this.getRenderedNoWorkingIntervals(result.position.x));
            var calc = this._scaleCalculator;
            var items = calc.getScaleItems(scaleType);
            var needEllipsis = index === 0 || index === items.length - 1;
            if (needEllipsis) {
                result.style["overflowX"] = "hidden";
                result.style["textOverflow"] = "ellipsis";
            }
            result.additionalInfo["range"] = new DateRange_1.DateRange(item.start, item.end);
        }
        return result;
    };
    GridLayoutCalculator.prototype.getScaleItemStart = function (index, scaleType) {
        return this._scaleCalculator.getScaleItemAdjustedStart(index, scaleType);
    };
    GridLayoutCalculator.prototype.getScaleItemClassName = function (scaleType, scaleItemInfo, noWorkingIntervals) {
        var result = "dx-gantt-si";
        if (scaleType.valueOf() == this.viewType.valueOf() && this.isScaleItemInsideNoWorkingInterval(scaleItemInfo, noWorkingIntervals))
            result += " dx-gantt-holiday-scaleItem";
        return result;
    };
    GridLayoutCalculator.prototype.getScaleItemInfo = function (index, scaleType) {
        return this._scaleCalculator.getScaleItem(index, scaleType);
    };
    GridLayoutCalculator.prototype.getScaleRangesInArea = function (left, right) {
        var topScale = DateUtils_1.DateUtils.ViewTypeToScaleMap[this.viewType];
        var calc = this._scaleCalculator;
        var topStartIndex = Math.max(calc.getScaleIndexByPos(left, topScale), 0);
        var topEndIndex = calc.getScaleIndexByPos(right, topScale);
        if (topEndIndex === -1)
            topEndIndex = calc.topScaleItems.length - 1;
        var bottomStartIndex = Math.max(calc.getScaleIndexByPos(left), 0);
        var bottomEndIndex = calc.getScaleIndexByPos(right);
        if (bottomEndIndex === -1)
            bottomEndIndex = calc.bottomScaleItems.length - 1;
        return [
            [topStartIndex, topEndIndex],
            [bottomStartIndex, bottomEndIndex]
        ];
    };
    GridLayoutCalculator.prototype.isScaleItemInsideNoWorkingInterval = function (scaleItemInfo, noWorkingIntervals) {
        var scaleItemLeft = scaleItemInfo.position.x;
        var scaleItemRight = scaleItemInfo.position.x + scaleItemInfo.size.width;
        for (var i = 0; i < noWorkingIntervals.length; i++) {
            var noWorkingIntervalLeft = noWorkingIntervals[i].position.x;
            var noWorkingIntervalRight = noWorkingIntervals[i].position.x + noWorkingIntervals[i].size.width;
            if (scaleItemLeft >= noWorkingIntervalLeft && scaleItemRight <= noWorkingIntervalRight)
                return true;
        }
        return false;
    };
    GridLayoutCalculator.prototype.getScaleItemColSpan = function (scaleType) {
        return this._scaleCalculator.getScaleItemColSpan(scaleType);
    };
    GridLayoutCalculator.prototype.getTaskWrapperElementInfo = function (index) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = this.getTaskWrapperClassName(index);
        result.setPosition(this.getTaskWrapperPoint(index));
        result.setAttribute("task-index", index);
        return result;
    };
    GridLayoutCalculator.prototype.getTaskWrapperClassName = function (index) {
        var result = "dx-gantt-taskWrapper";
        var viewItem = this.getViewItem(index);
        if (viewItem.task.isMilestone() && !viewItem.isCustom)
            result = "dx-gantt-milestoneWrapper";
        if (viewItem.selected)
            result += " dx-gantt-selectedTask";
        return result;
    };
    GridLayoutCalculator.prototype.getTaskWrapperPoint = function (index) {
        if (!(0, common_1.isDefined)(this._taskWrapperPoints[index])) {
            var viewItem = this.getViewItem(index);
            var height = this.getTaskHeight(index);
            var y = index * this.tickSize.height + (this.tickSize.height - height) / 2;
            var result = new point_1.Point(this.getPosByDate(viewItem.task.start), y);
            if (viewItem.task.isMilestone() && !viewItem.isCustom)
                result.x -= height / 2;
            this._taskWrapperPoints[index] = result;
        }
        return this._taskWrapperPoints[index].clone();
    };
    GridLayoutCalculator.prototype.getTaskElementInfo = function (index, textOutsideTask) {
        if (textOutsideTask === void 0) { textOutsideTask = false; }
        if (!(0, common_1.isDefined)(this._taskElementInfoList[index])) {
            var result = new GridElementInfo_1.GridElementInfo();
            var task = this.getTask(index);
            var autoCalculatedParent = this.viewModel.parentAutoCalc && this.viewModel.taskHasChildrenByIndex(index);
            if (!task.isMilestone()) {
                var defWidth = this.getTaskWidth(index);
                result.size.width = this.getCorrectedTaskWidthByRange(index, defWidth);
                if (result.size.width < defWidth)
                    result.additionalInfo["taskCut"] = true;
                if (textOutsideTask)
                    result.size.height = this.getTaskHeight(index);
            }
            result.className = this.getTaskClassName(index, result.size.width);
            if (task.color) {
                result.style.backgroundColor = task.color;
                if (autoCalculatedParent) {
                    result.style.borderLeftColor = task.color;
                    result.style.borderRightColor = task.color;
                    result.style.borderTopColor = task.color;
                }
            }
            this._taskElementInfoList[index] = result;
        }
        return this._taskElementInfoList[index];
    };
    GridLayoutCalculator.prototype.getTaskClassName = function (index, taskWidth) {
        var result = GridLayoutCalculator.taskClassName;
        var viewItem = this.getViewItem(index);
        var autoCalculatedParent = this.viewModel.parentAutoCalc && this.viewModel.taskHasChildrenByIndex(index);
        if (viewItem.task.isMilestone() && !viewItem.isCustom)
            result += " " + GridLayoutCalculator.milestoneClassName;
        else {
            if (taskWidth <= this.elementSizeValues.smallTaskWidth)
                result += " " + GridLayoutCalculator.smallTaskClassName;
            if (autoCalculatedParent)
                result += this.getAutoCalcParentTaskClassName(viewItem.task);
        }
        return result;
    };
    GridLayoutCalculator.prototype.getAutoCalcParentTaskClassName = function (task) {
        var result = " " + GridLayoutCalculator.parentTaskClassName;
        if (task.progress == 0)
            result += " dx-gantt-noPrg";
        if (task.progress >= 100)
            result += " dx-gantt-cmpl";
        return result;
    };
    GridLayoutCalculator.prototype.getTaskPoint = function (index) {
        var result = this.getTaskWrapperPoint(index);
        if (!this.getTask(index).isMilestone())
            result.y += this.elementSizeValues.taskWrapperTopPadding;
        return result;
    };
    GridLayoutCalculator.prototype.getTaskSize = function (index) {
        return new size_1.Size(this.getTaskWidth(index), this.getTaskHeight(index));
    };
    GridLayoutCalculator.prototype.getTaskWidth = function (index) {
        var viewItem = this.getViewItem(index);
        if (viewItem.isCustom && viewItem.size.width)
            return viewItem.size.width;
        return viewItem.task.isMilestone() && !viewItem.isCustom ? this.getTaskHeight(index) : Math.max(this.getWidthByDateRange(viewItem.task.start, viewItem.task.end), this.minTaskWidth);
    };
    GridLayoutCalculator.prototype.getTaskHeight = function (index) {
        var viewItem = this.getViewItem(index);
        if (viewItem.task.isMilestone() && !viewItem.isCustom)
            return this.milestoneWidth;
        if (this.viewModel.isTaskToCalculateByChildren(viewItem.task.internalId))
            return this.parentTaskHeight;
        return (viewItem.isCustom && viewItem.size.height) ? viewItem.size.height : this.taskHeight;
    };
    GridLayoutCalculator.prototype.getTask = function (index) {
        var item = this.getViewItem(index);
        return item === null || item === void 0 ? void 0 : item.task;
    };
    GridLayoutCalculator.prototype.getViewItem = function (index) {
        return this.viewModel.items[index];
    };
    GridLayoutCalculator.prototype.getTaskProgressElementInfo = function (index) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = GridLayoutCalculator.taskProgressClassName;
        result.setSize(this.getTaskProgressSize(index));
        return result;
    };
    GridLayoutCalculator.prototype.getTaskProgressSize = function (index) {
        var width = this.getTaskProgressWidth(index);
        if (this.isTaskCutByRange(index))
            width = this.getCorrectedTaskWidthByRange(index, width);
        return new size_1.Size(width, 0);
    };
    GridLayoutCalculator.prototype.getTaskProgressWidth = function (index) {
        return this.getTaskWidth(index) * this.getTask(index).normalizedProgress / 100;
    };
    GridLayoutCalculator.prototype.getTaskTextElementInfo = function (index, isInsideText) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = this.getTaskTextElementClassName(isInsideText);
        if (!isInsideText) {
            var taskX = this.getTaskPoint(index).x;
            if (taskX < this.elementSizeValues.outsideTaskTextDefaultWidth) {
                var width = Math.max(taskX, 0);
                result.size.width = width;
                if (width > 0)
                    result.margins.left = -width;
                else
                    result.additionalInfo["hidden"] = true;
            }
        }
        return result;
    };
    GridLayoutCalculator.prototype.getTaskTextElementClassName = function (isInsideText) {
        return GridLayoutCalculator.taskTitleClassName.concat(" ", isInsideText ? GridLayoutCalculator.titleInClassName : GridLayoutCalculator.titleOutClassName);
    };
    GridLayoutCalculator.prototype.getTaskResourcesWrapperElementInfo = function (index) {
        var result = new GridElementInfo_1.GridElementInfo();
        var width = this.getTaskSize(index).width;
        result.className = "dx-gantt-taskResWrapper";
        result.setPosition(this.getTaskWrapperPoint(index));
        result.position.x = result.position.x + width;
        return result;
    };
    GridLayoutCalculator.prototype.getTaskResourceElementInfo = function () {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = GridLayoutCalculator.taskResourceClassName;
        return result;
    };
    GridLayoutCalculator.prototype.getSelectionElementInfo = function (index) {
        return this.getRowElementInfo(index, "dx-gantt-sel");
    };
    GridLayoutCalculator.prototype.getSelectionPosition = function (index) {
        var result = new point_1.Point(undefined, undefined);
        result.y = index * this.tickSize.height;
        return result;
    };
    GridLayoutCalculator.prototype.getSelectionSize = function () {
        return new size_1.Size(this.getTotalWidth(), this.tickSize.height);
    };
    GridLayoutCalculator.prototype.getHighlightRowInfo = function (index) {
        return this.getRowElementInfo(index, "dx-gantt-altRow");
    };
    GridLayoutCalculator.prototype.getRowElementInfo = function (index, className) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = className;
        result.setPosition(this.getSelectionPosition(index));
        result.setSize(this.getSelectionSize());
        return result;
    };
    GridLayoutCalculator.prototype.getNoWorkingIntervalInfo = function (noWorkingDateRange) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = "dx-gantt-nwi";
        result.setPosition(this.getNoWorkingIntervalPosition(noWorkingDateRange.start));
        result.setSize(this.getNoWorkingIntervalSize(noWorkingDateRange));
        return result;
    };
    GridLayoutCalculator.prototype.getNoWorkingIntervalPosition = function (intervalStart) {
        var result = new point_1.Point(undefined, undefined);
        result.x = this.getPosByDate(intervalStart);
        return result;
    };
    GridLayoutCalculator.prototype.getNoWorkingIntervalSize = function (noWorkingInterval) {
        return new size_1.Size(this.getWidthByDateRange(noWorkingInterval.start, noWorkingInterval.end), this.getVerticalGridLineHeight());
    };
    GridLayoutCalculator.prototype.getVerticalGridLineHeight = function () {
        return Math.max(this.visibleTaskAreaSize.height - this.scrollBarHeight, this.tickSize.height * this.verticalTickCount);
    };
    GridLayoutCalculator.prototype.getConnectorInfo = function (id, predessorIndex, successorIndex, connectorType) {
        var result = new Array();
        var connectorPoints = this.getConnectorPoints(predessorIndex, successorIndex, connectorType);
        for (var i = 0; i < connectorPoints.length - 1; i++)
            result.push(this.getConnectorLineInfo(id, connectorPoints[i], connectorPoints[i + 1], i == 0 || i == connectorPoints.length - 2));
        result.push(this.getArrowInfo(id, connectorPoints, result, predessorIndex, successorIndex));
        this.checkAndCorrectConnectorLinesByRange(result);
        return result.filter(function (c) { return !!c; });
    };
    GridLayoutCalculator.prototype.getConnectorLineInfo = function (id, startPoint, endPoint, isEdgeLine) {
        var result = new GridElementInfo_1.GridElementInfo();
        var isVertical = startPoint.x == endPoint.x;
        result.className = this.getConnectorClassName(isVertical);
        result.setPosition(this.getConnectorPosition(startPoint, endPoint));
        result.setSize(this.getConnectorSize(startPoint, endPoint, isVertical, isEdgeLine));
        result.setAttribute("dependency-id", id);
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorClassName = function (isVertical) {
        return isVertical ? GridLayoutCalculator.CLASSNAMES.CONNECTOR_VERTICAL : GridLayoutCalculator.CLASSNAMES.CONNECTOR_HORIZONTAL;
    };
    GridLayoutCalculator.prototype.getConnectorPosition = function (startPoint, endPoint) {
        return new point_1.Point(Math.min(startPoint.x, endPoint.x), Math.min(startPoint.y, endPoint.y));
    };
    GridLayoutCalculator.prototype.getConnectorSize = function (startPoint, endPoint, isVertical, isEdgeLine) {
        var result = new size_1.Size(0, 0);
        var sizeCorrection = isEdgeLine ? 0 : 1;
        if (isVertical)
            result.height = Math.abs(endPoint.y - startPoint.y) + sizeCorrection;
        else
            result.width = Math.abs(endPoint.x - startPoint.x) + sizeCorrection;
        return result;
    };
    GridLayoutCalculator.prototype.getArrowInfo = function (id, connectorPoints, connectorLines, predessorIndex, successorIndex) {
        var result = new GridElementInfo_1.GridElementInfo();
        var lineInfo = this.findArrowLineInfo(connectorLines, predessorIndex, successorIndex);
        var arrowPosition = this.getArrowPosition(connectorPoints, predessorIndex, successorIndex);
        result.className = this.getArrowClassName(arrowPosition);
        result.setPosition(this.getArrowPoint(lineInfo, arrowPosition));
        result.setAttribute("dependency-id", id);
        return result;
    };
    GridLayoutCalculator.prototype.findArrowLineInfo = function (connectorLines, predessorIndex, successorIndex) {
        var arrowLineIndex = predessorIndex < successorIndex ? connectorLines.length - 1 : 0;
        return connectorLines[arrowLineIndex];
    };
    GridLayoutCalculator.prototype.getArrowPosition = function (connectorPoints, predessorIndex, successorIndex) {
        var prevLastPoint = connectorPoints[predessorIndex < successorIndex ? connectorPoints.length - 2 : 1];
        var lastPoint = connectorPoints[predessorIndex < successorIndex ? connectorPoints.length - 1 : 0];
        if (prevLastPoint.x == lastPoint.x)
            return prevLastPoint.y > lastPoint.y ? Enums_1.Position.Top : Enums_1.Position.Bottom;
        return prevLastPoint.x > lastPoint.x ? Enums_1.Position.Left : Enums_1.Position.Right;
    };
    GridLayoutCalculator.prototype.getArrowClassName = function (arrowPosition) {
        var result = GridLayoutCalculator.arrowClassName;
        switch (arrowPosition) {
            case Enums_1.Position.Left:
                result = result.concat(" ", GridLayoutCalculator.leftArrowClassName);
                break;
            case Enums_1.Position.Top:
                result = result.concat(" ", GridLayoutCalculator.topArrowClassName);
                break;
            case Enums_1.Position.Right:
                result = result.concat(" ", GridLayoutCalculator.rightArrowClassName);
                break;
            case Enums_1.Position.Bottom:
                result = result.concat(" ", GridLayoutCalculator.bottomArrowClassName);
                break;
        }
        return result;
    };
    GridLayoutCalculator.prototype.getArrowPositionByClassName = function (className) {
        if (className.indexOf(GridLayoutCalculator.leftArrowClassName) > -1)
            return Enums_1.Position.Left;
        if (className.indexOf(GridLayoutCalculator.topArrowClassName) > -1)
            return Enums_1.Position.Top;
        if (className.indexOf(GridLayoutCalculator.rightArrowClassName) > -1)
            return Enums_1.Position.Right;
        if (className.indexOf(GridLayoutCalculator.bottomArrowClassName) > -1)
            return Enums_1.Position.Bottom;
    };
    GridLayoutCalculator.prototype.getArrowPoint = function (lineInfo, arrowPosition) {
        return new point_1.Point(this.getArrowX(lineInfo, arrowPosition), this.getArrowY(lineInfo, arrowPosition));
    };
    GridLayoutCalculator.prototype.getArrowX = function (lineInfo, arrowPosition) {
        switch (arrowPosition) {
            case Enums_1.Position.Left:
                return lineInfo.position.x - this.arrowSize.width / 2;
            case Enums_1.Position.Right:
                return lineInfo.position.x + lineInfo.size.width - this.arrowSize.width / 2;
            case Enums_1.Position.Top:
            case Enums_1.Position.Bottom:
                return lineInfo.position.x - (this.arrowSize.width - this.lineThickness) / 2;
        }
    };
    GridLayoutCalculator.prototype.getArrowY = function (lineInfo, arrowPosition) {
        switch (arrowPosition) {
            case Enums_1.Position.Top:
                return lineInfo.position.y - this.arrowSize.height / 2;
            case Enums_1.Position.Bottom:
                return lineInfo.position.y + lineInfo.size.height - this.arrowSize.height / 2;
            case Enums_1.Position.Left:
            case Enums_1.Position.Right:
                return lineInfo.position.y - (this.arrowSize.height - this.lineThickness) / 2;
        }
    };
    GridLayoutCalculator.prototype.getPosByDate = function (date) {
        return this.getWidthByDateRange(this.range.start, date);
    };
    GridLayoutCalculator.prototype.getWidthByDateRange = function (start, end) {
        return DateUtils_1.DateUtils.getRangeTickCount(start, end, this.viewType) * this.tickSize.width;
    };
    GridLayoutCalculator.prototype.getDateByPos = function (position) {
        if (this.viewType === Enums_1.ViewType.Months || this.viewType === Enums_1.ViewType.Quarter)
            return this.getDateByPosInMonthBasedViewTypes(position);
        var preResult = position / this.tickSize.width;
        var start = new Date(this.range.start);
        return DateUtils_1.DateUtils.getDSTCorrectedTaskEnd(start, preResult * this.tickTimeSpan);
    };
    GridLayoutCalculator.prototype.getDateByPosInMonthBasedViewTypes = function (position) {
        return this._scaleCalculator.getDateInScale(position);
    };
    GridLayoutCalculator.prototype.getConnectorPoints = function (predessorIndex, successorIndex, connectorType) {
        switch (connectorType) {
            case Enums_2.DependencyType.FS:
                return this.getFinishToStartConnectorPoints(predessorIndex, successorIndex);
            case Enums_2.DependencyType.SF:
                return this.getStartToFinishConnectorPoints(predessorIndex, successorIndex);
            case Enums_2.DependencyType.SS:
                return this.getStartToStartConnectorPoints(predessorIndex, successorIndex);
            case Enums_2.DependencyType.FF:
                return this.getFinishToFinishConnectorPoints(predessorIndex, successorIndex);
            default:
                return new Array();
        }
    };
    GridLayoutCalculator.prototype.getFinishToStartConnectorPoints = function (predessorIndex, successorIndex) {
        if (predessorIndex < successorIndex) {
            if (this.getTask(predessorIndex).end <= this.getTask(successorIndex).start)
                return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskTopSide(predessorIndex, successorIndex, false);
            return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskLeftSide(predessorIndex, successorIndex, false);
        }
        if (this.getTask(predessorIndex).end <= this.getTask(successorIndex).start)
            return this.getConnectorPoints_FromTopTaskBottomSide_ToBottomTaskRightSide(successorIndex, predessorIndex, false);
        return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskRightSide(successorIndex, predessorIndex, true);
    };
    GridLayoutCalculator.prototype.getFinishToFinishConnectorPoints = function (predessorIndex, successorIndex) {
        if (predessorIndex < successorIndex)
            return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskRightSide(predessorIndex, successorIndex);
        return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskRightSide(successorIndex, predessorIndex);
    };
    GridLayoutCalculator.prototype.getStartToStartConnectorPoints = function (predessorIndex, successorIndex) {
        if (predessorIndex < successorIndex)
            return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskLeftSide(predessorIndex, successorIndex);
        return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskLeftSide(successorIndex, predessorIndex);
    };
    GridLayoutCalculator.prototype.getStartToFinishConnectorPoints = function (predessorIndex, successorIndex) {
        if (predessorIndex < successorIndex) {
            if (this.getTask(predessorIndex).start >= this.getTask(successorIndex).end)
                return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskTopSide(predessorIndex, successorIndex, true);
            return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskRightSide(predessorIndex, successorIndex, false);
        }
        if (this.getTask(predessorIndex).start >= this.getTask(successorIndex).end)
            return this.getConnectorPoints_FromTopTaskBottomSide_ToBottomTaskLeftSide(successorIndex, predessorIndex, true);
        return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskLeftSide(successorIndex, predessorIndex, true);
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskTopSide = function (topTaskIndex, bottomTaskIndex, shiftEndPointToRight) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskRightCenter = this.getTaskRightCenter(topTaskPoint, topTaskIndex);
        var isBottomMilestone = this.getTask(bottomTaskIndex).isMilestone();
        var bottomTaskTopCenter = this.getTaskTopCenter(bottomTaskPoint, bottomTaskIndex);
        var endPointIndent = this.getHorizontalIndentFromTaskEdge(bottomTaskIndex, shiftEndPointToRight);
        result.push(new point_1.Point(Math.floor(topTaskRightCenter.x), Math.floor(topTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(isBottomMilestone ? bottomTaskTopCenter.x : bottomTaskPoint.x + endPointIndent), Math.floor(result[0].y)));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskTopCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskRightSide = function (topTaskIndex, bottomTaskIndex) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskRightCenter = this.getTaskRightCenter(topTaskPoint, topTaskIndex);
        var bottomTaskRightCenter = this.getTaskRightCenter(bottomTaskPoint, bottomTaskIndex);
        result.push(new point_1.Point(Math.floor(topTaskRightCenter.x), Math.floor(topTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(Math.max(topTaskRightCenter.x, bottomTaskRightCenter.x) + this.minLineLength), Math.floor(result[0].y)));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskRightCenter.x), Math.floor(bottomTaskRightCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskLeftSide = function (topTaskIndex, bottomTaskIndex, shiftToTop) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskRightCenter = this.getTaskRightCenter(topTaskPoint, topTaskIndex);
        var topTaskBottomCenter = this.getTaskBottomCenter(topTaskPoint, topTaskIndex);
        var bottomTaskLeftCenter = this.getTaskLeftCenter(bottomTaskPoint, bottomTaskIndex);
        var bottomTaskTopCenter = this.getTaskTopCenter(bottomTaskPoint, bottomTaskIndex);
        var viewItem = shiftToTop ? this.getViewItem(topTaskIndex) : this.getViewItem(bottomTaskIndex);
        var connectorSpace = viewItem.isCustom ? (this.tickSize.height - viewItem.size.height) / 2 : this.minConnectorSpaceFromTask;
        result.push(new point_1.Point(Math.floor(topTaskRightCenter.x), Math.floor(topTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(result[0].x + this.minLineLength), Math.floor(result[0].y)));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(shiftToTop ?
            topTaskBottomCenter.y + connectorSpace
            : bottomTaskTopCenter.y - connectorSpace)));
        result.push(new point_1.Point(Math.floor(bottomTaskLeftCenter.x - this.minLineLength), Math.floor(result[2].y)));
        result.push(new point_1.Point(Math.floor(result[3].x), Math.floor(bottomTaskLeftCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskLeftCenter.x), Math.floor(bottomTaskLeftCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskBottomSide_ToBottomTaskRightSide = function (topTaskIndex, bottomTaskIndex, shiftStartPointToRight) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskBottomCenter = this.getTaskBottomCenter(topTaskPoint, topTaskIndex);
        var isTopMilestone = this.getTask(topTaskIndex).isMilestone();
        var bottomTaskRightCenter = this.getTaskRightCenter(bottomTaskPoint, bottomTaskIndex);
        var startPointIndent = this.getHorizontalIndentFromTaskEdge(topTaskIndex, shiftStartPointToRight);
        result.push(new point_1.Point(Math.floor(isTopMilestone ? topTaskBottomCenter.x : topTaskPoint.x + startPointIndent), Math.floor(topTaskBottomCenter.y)));
        result.push(new point_1.Point(Math.floor(result[0].x), Math.floor(bottomTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskRightCenter.x), Math.floor(bottomTaskRightCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskBottomSide_ToBottomTaskLeftSide = function (topTaskIndex, bottomTaskIndex, shiftStartPointToRight) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskBottomCenter = this.getTaskBottomCenter(topTaskPoint, topTaskIndex);
        var isTopMilestone = this.getTask(topTaskIndex).isMilestone();
        var bottomTaskLeftCenter = this.getTaskLeftCenter(bottomTaskPoint, bottomTaskIndex);
        var startPointIndent = this.getHorizontalIndentFromTaskEdge(topTaskIndex, shiftStartPointToRight);
        result.push(new point_1.Point(Math.floor(isTopMilestone ? topTaskBottomCenter.x : topTaskPoint.x + startPointIndent), Math.floor(topTaskBottomCenter.y)));
        result.push(new point_1.Point(Math.floor(result[0].x), Math.floor(bottomTaskLeftCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskLeftCenter.x), Math.floor(bottomTaskLeftCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskTopSide = function (topTaskIndex, bottomTaskIndex, shiftEndPointToRight) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskLeftCenter = this.getTaskLeftCenter(topTaskPoint, topTaskIndex);
        var bottomTaskTopCenter = this.getTaskTopCenter(bottomTaskPoint, bottomTaskIndex);
        var isBottomMilestone = this.getTask(bottomTaskIndex).isMilestone();
        var endPointIndent = this.getHorizontalIndentFromTaskEdge(bottomTaskIndex, shiftEndPointToRight);
        result.push(new point_1.Point(Math.floor(topTaskLeftCenter.x), Math.floor(topTaskLeftCenter.y)));
        result.push(new point_1.Point(Math.floor(isBottomMilestone ? bottomTaskTopCenter.x : bottomTaskPoint.x + endPointIndent), Math.floor(result[0].y)));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskTopCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskRightSide = function (topTaskIndex, bottomTaskIndex, shiftToTop) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskLeftCenter = this.getTaskLeftCenter(topTaskPoint, topTaskIndex);
        var topTaskBottomCenter = this.getTaskBottomCenter(topTaskPoint, topTaskIndex);
        var bottomTaskRightCenter = this.getTaskRightCenter(bottomTaskPoint, bottomTaskIndex);
        var bottomTaskTopCenter = this.getTaskTopCenter(bottomTaskPoint, bottomTaskIndex);
        var viewItem = shiftToTop ? this.getViewItem(topTaskIndex) : this.getViewItem(bottomTaskIndex);
        var connectorSpace = viewItem.isCustom ? (this.tickSize.height - viewItem.size.height) / 2 : this.minConnectorSpaceFromTask;
        result.push(new point_1.Point(Math.floor(topTaskLeftCenter.x), topTaskLeftCenter.y));
        result.push(new point_1.Point(Math.floor(result[0].x - this.minLineLength), result[0].y));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(shiftToTop ?
            topTaskBottomCenter.y + connectorSpace
            : bottomTaskTopCenter.y - connectorSpace)));
        result.push(new point_1.Point(Math.floor(bottomTaskRightCenter.x + this.minLineLength), Math.floor(result[2].y)));
        result.push(new point_1.Point(Math.floor(result[3].x), Math.floor(bottomTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskRightCenter.x), Math.floor(bottomTaskRightCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskLeftSide = function (topTaskIndex, bottomTaskIndex) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskLeftCenter = this.getTaskLeftCenter(topTaskPoint, topTaskIndex);
        var bottomTaskLeftCenter = this.getTaskLeftCenter(bottomTaskPoint, bottomTaskIndex);
        result.push(new point_1.Point(Math.floor(topTaskLeftCenter.x), Math.floor(topTaskLeftCenter.y)));
        result.push(new point_1.Point(Math.floor(Math.min(topTaskLeftCenter.x, bottomTaskLeftCenter.x) - this.minLineLength), Math.floor(result[0].y)));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskLeftCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskLeftCenter.x), Math.floor(bottomTaskLeftCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getTaskSidePoints = function (index) {
        var point = this.getTaskPoint(index);
        return [
            this.getTaskLeftCenter(point, index),
            this.getTaskTopCenter(point, index),
            this.getTaskRightCenter(point, index),
            this.getTaskBottomCenter(point, index)
        ];
    };
    GridLayoutCalculator.prototype.getTaskLeftCenter = function (taskPoint, index) {
        return new point_1.Point(taskPoint.x - this.getTaskEdgeCorrection(index), taskPoint.y + this.getTaskHeight(index) / 2);
    };
    GridLayoutCalculator.prototype.getTaskRightCenter = function (taskPoint, index) {
        return new point_1.Point(taskPoint.x + this.getTaskWidth(index) + this.getTaskEdgeCorrection(index), taskPoint.y + this.getTaskHeight(index) / 2);
    };
    GridLayoutCalculator.prototype.getTaskTopCenter = function (taskPoint, index) {
        return new point_1.Point(taskPoint.x + this.getTaskWidth(index) / 2, taskPoint.y - this.getTaskEdgeCorrection(index));
    };
    GridLayoutCalculator.prototype.getTaskBottomCenter = function (taskPoint, index) {
        return new point_1.Point(taskPoint.x + this.getTaskWidth(index) / 2, taskPoint.y + this.getTaskHeight(index) + this.getTaskEdgeCorrection(index));
    };
    GridLayoutCalculator.prototype.getTaskEdgeCorrection = function (index) {
        var viewItem = this.getViewItem(index);
        var isMilestone = viewItem.task.isMilestone() && !viewItem.isCustom;
        return isMilestone ? this.getTaskHeight(index) * (Math.sqrt(2) - 1) / 2 : 0;
    };
    GridLayoutCalculator.prototype.getHorizontalIndentFromTaskEdge = function (index, shiftToRight) {
        if (shiftToRight === void 0) { shiftToRight = false; }
        var taskWidth = this.getTaskWidth(index);
        var indentFromEdge = this.minLineLength < taskWidth / 3 ? this.minLineLength : 0.2 * taskWidth;
        return shiftToRight ? taskWidth - indentFromEdge : indentFromEdge;
    };
    GridLayoutCalculator.prototype.getRenderedRowColumnIndices = function (scrollPos, isVertical) {
        var visibleAreaSizeValue = isVertical ? this.visibleTaskAreaSize.height : this.visibleTaskAreaSize.width;
        var firstVisibleIndex = isVertical ? this.getFirstVisibleGridCellIndex(scrollPos, this.tickSize.height) : this.getFirstScaleVisibleIndex(scrollPos);
        var lastVisibleIndex = isVertical ? this.getLastVisibleGridCellIndex(scrollPos, this.tickSize.height, visibleAreaSizeValue, this.verticalTickCount) : this.getLastScaleVisibleIndex(scrollPos);
        var result = new Array();
        for (var i = firstVisibleIndex; i <= lastVisibleIndex; i++)
            result.push(i);
        return result;
    };
    GridLayoutCalculator.prototype.getRenderedScaleItemIndices = function (scaleType, renderedColIndices) {
        var isBottomScale = scaleType === this.viewType;
        var calc = this._scaleCalculator;
        var firstRenderedIndex = renderedColIndices[0];
        var lastRenderedIndex = renderedColIndices[renderedColIndices.length - 1];
        var firstVisibleIndex = isBottomScale ? firstRenderedIndex : calc.getTopScaleIndexByBottomIndex(firstRenderedIndex);
        var lastVisibleIndex = isBottomScale ? lastRenderedIndex : calc.getTopScaleIndexByBottomIndex(lastRenderedIndex);
        var result = new Array();
        for (var i = firstVisibleIndex; i <= lastVisibleIndex; i++)
            result.push(i);
        return result;
    };
    GridLayoutCalculator.prototype.getFirstScaleVisibleIndex = function (scrollPos) {
        return this._scaleCalculator.getFirstScaleIndexForRender(scrollPos);
    };
    GridLayoutCalculator.prototype.getLastScaleVisibleIndex = function (scrollPos) {
        return this._scaleCalculator.getLastScaleIndexForRender(scrollPos + this.visibleTaskAreaSize.width);
    };
    GridLayoutCalculator.prototype.getFirstVisibleGridCellIndex = function (scrollPos, tickSizeValue) {
        var result = Math.floor(scrollPos / tickSizeValue);
        result = Math.max(result - 10, 0);
        return result;
    };
    GridLayoutCalculator.prototype.getLastVisibleGridCellIndex = function (scrollPos, tickSizeValue, visibleAreaSizeValue, tickCount) {
        var result = Math.floor((scrollPos + visibleAreaSizeValue) / tickSizeValue);
        result = Math.min(result + 10, tickCount - 1);
        return result;
    };
    GridLayoutCalculator.prototype.createTileToConnectorLinesMap = function () {
        this.tileToDependencyMap = [];
        for (var i = 0; i < this.viewModel.items.length; i++)
            for (var j = 0; j < this.viewModel.items[i].dependencies.length; j++)
                this.createConnecotInfo(this.viewModel.items[i].dependencies[j], this.viewModel.items[i].visibleIndex);
    };
    GridLayoutCalculator.prototype.updateTileToConnectorLinesMap = function (dependencyId) {
        this.tileToDependencyMap.forEach(function (map, index, tileToDependencyMap) {
            tileToDependencyMap[index] = map.filter(function (info) { return info.attr["dependency-id"] != dependencyId; });
        });
        var result = [];
        var item = this.viewModel.items.filter(function (item) { return item.dependencies.filter(function (d) { return d.id == dependencyId; }).length > 0; })[0];
        if (item) {
            var dependency = item.dependencies.filter(function (d) { return d.id === dependencyId; })[0];
            result = this.createConnecotInfo(dependency, item.visibleIndex);
        }
        return result;
    };
    GridLayoutCalculator.prototype.createConnecotInfo = function (dependencyInfo, successorIndex) {
        var _this = this;
        var predessorIndex = dependencyInfo.predecessor.visibleIndex;
        var type = dependencyInfo.type;
        var id = dependencyInfo.id;
        var connectorInfo = this.getConnectorInfo(id, predessorIndex, successorIndex, type);
        connectorInfo.forEach(function (connectorLine) {
            _this.addElementInfoToTileMap(connectorLine, _this.tileToDependencyMap, true);
        });
        return connectorInfo;
    };
    GridLayoutCalculator.prototype.createTileToNonWorkingIntervalsMap = function () {
        this.tileToNoWorkingIntervalsMap = [];
        for (var i = 0; i < this.viewModel.noWorkingIntervals.length; i++) {
            var noWorkingDateRange = this.getAdjustedNoWorkingInterval(this.viewModel.noWorkingIntervals[i]);
            if (!noWorkingDateRange)
                continue;
            var noWorkingIntervalInfo = this.getNoWorkingIntervalInfo(noWorkingDateRange);
            this.addElementInfoToTileMap(noWorkingIntervalInfo, this.tileToNoWorkingIntervalsMap, false);
        }
    };
    GridLayoutCalculator.prototype.getAdjustedNoWorkingInterval = function (modelInterval) {
        if (modelInterval.end.getTime() - modelInterval.start.getTime() < this.tickTimeSpan - 1)
            return null;
        return new DateRange_1.DateRange(DateUtils_1.DateUtils.getNearestScaleTickDate(modelInterval.start, this.range, this.tickTimeSpan, this.viewType), DateUtils_1.DateUtils.getNearestScaleTickDate(modelInterval.end, this.range, this.tickTimeSpan, this.viewType));
    };
    GridLayoutCalculator.prototype.addElementInfoToTileMap = function (info, map, isVerticalTile) {
        var infoPointValue = isVerticalTile ? info.position.y : info.position.x;
        var infoSizeValue = isVerticalTile ? info.size.height : info.size.width;
        var tileSizeValue = (isVerticalTile ? this.visibleTaskAreaSize.height : this.visibleTaskAreaSize.width) * 2;
        if (tileSizeValue > 0) {
            var firstTileIndex = Math.floor(infoPointValue / tileSizeValue);
            var lastTileIndex = Math.floor((infoPointValue + infoSizeValue) / tileSizeValue);
            for (var i = firstTileIndex; i <= lastTileIndex; i++) {
                if (!map[i])
                    map[i] = new Array();
                map[i].push(info);
            }
        }
    };
    GridLayoutCalculator.prototype.getRenderedConnectorLines = function (scrollPos) {
        return this.getElementsInRenderedTiles(this.tileToDependencyMap, true, scrollPos);
    };
    GridLayoutCalculator.prototype.getRenderedNoWorkingIntervals = function (scrollPos) {
        return this.getElementsInRenderedTiles(this.tileToNoWorkingIntervalsMap, false, scrollPos);
    };
    GridLayoutCalculator.prototype.getRenderedStripLines = function (settings) {
        var result = new Array();
        var stripLines = settings.stripLines.map(function (t) { return t.clone(); });
        if (settings.showCurrentTime)
            stripLines.push(new StripLine_1.StripLine(new Date(), null, settings.currentTimeTitle, settings.currentTimeCssClass, true));
        for (var i = 0, stripLine = void 0; stripLine = stripLines[i]; i++) {
            var start = DateUtils_1.DateUtils.parse(stripLine.start);
            var end = stripLine.end ? DateUtils_1.DateUtils.parse(stripLine.end) : null;
            if (start >= this.range.start && start <= this.range.end || (end && end >= this.range.start && end <= this.range.end)) {
                var renderedStart = start > this.range.start ? start : this.range.start;
                var info = new GridElementInfo_1.GridElementInfo();
                info.size.height = this.getVerticalGridLineHeight();
                info.position.x = this.getPosByDate(renderedStart);
                info.size.width = end ? this.getWidthByDateRange(renderedStart, end < this.range.end ? end : this.range.end) : 0;
                info.className = stripLine.isCurrent ? "dx-gantt-tc" : end ? "dx-gantt-ti" : "dx-gantt-tm";
                info.className += stripLine.cssClass ? " " + stripLine.cssClass : "";
                info.attr.title = stripLine.title;
                result.push(info);
            }
        }
        return result;
    };
    GridLayoutCalculator.prototype.getElementsInRenderedTiles = function (map, isVerticalTile, scrollPos) {
        var result = new Array();
        var visibleAreaSizeValue = isVerticalTile ? this.visibleTaskAreaSize.height : this.visibleTaskAreaSize.width;
        if (visibleAreaSizeValue > 0) {
            var firstVisibleTileIndex = Math.floor(scrollPos / (visibleAreaSizeValue * 2));
            var lastVisibleTileIndex = Math.floor((scrollPos + visibleAreaSizeValue) / (visibleAreaSizeValue * 2));
            for (var i = firstVisibleTileIndex; i <= lastVisibleTileIndex; i++) {
                if (!map[i])
                    continue;
                map[i].forEach(function (info) {
                    if (result.indexOf(info) === -1)
                        result.push(info);
                });
            }
        }
        return result;
    };
    GridLayoutCalculator.prototype.isTaskInRenderedRange = function (index) {
        var item = this.getViewItem(index);
        var point = this.getTaskPoint(index);
        if (!item.task.isMilestone())
            return point.x < this.getTotalWidth();
        else
            return point.x + this.getTaskWidth(index) < this.getTotalWidth();
    };
    GridLayoutCalculator.prototype.isTaskCutByRange = function (index) {
        var info = this.getTaskElementInfo(index);
        return !!info.additionalInfo["taskCut"];
    };
    GridLayoutCalculator.prototype.checkAndCorrectElementDisplayByRange = function (element) {
        var side = element.parentElement.offsetLeft + element.offsetLeft + element.offsetWidth;
        if (side > this.getTotalWidth())
            element.style.display = "none";
    };
    GridLayoutCalculator.prototype.checkAndCorrectArrowElementDisplayByRange = function (element) {
        var side = element.offsetLeft + element.offsetWidth;
        if (side > this.getTotalWidth())
            element.style.display = "none";
    };
    GridLayoutCalculator.prototype.checkAndCorrectConnectorLinesByRange = function (lines) {
        if (!(lines === null || lines === void 0 ? void 0 : lines.length))
            return;
        var totalWidth = this.getTotalWidth();
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var isVertical = !line.size.width;
            if (line.position.x > totalWidth)
                delete lines[i];
            else if (!isVertical && line.position.x + line.size.width > totalWidth)
                line.size.width = totalWidth - line.position.x;
        }
    };
    GridLayoutCalculator.prototype.getCorrectedTaskWidthByRange = function (index, width) {
        var limitWidth = this.getTotalWidth() - this.getTaskPoint(index).x;
        return Math.min(limitWidth, width);
    };
    GridLayoutCalculator.dxGanttPrefix = "dx-gantt-";
    GridLayoutCalculator.taskClassName = GridLayoutCalculator.dxGanttPrefix + "task";
    GridLayoutCalculator.milestoneClassName = GridLayoutCalculator.dxGanttPrefix + "milestone";
    GridLayoutCalculator.smallTaskClassName = GridLayoutCalculator.dxGanttPrefix + "smallTask";
    GridLayoutCalculator.parentTaskClassName = GridLayoutCalculator.dxGanttPrefix + "parent";
    GridLayoutCalculator.taskProgressClassName = GridLayoutCalculator.dxGanttPrefix + "tPrg";
    GridLayoutCalculator.taskTitleClassName = GridLayoutCalculator.dxGanttPrefix + "taskTitle";
    GridLayoutCalculator.titleInClassName = GridLayoutCalculator.dxGanttPrefix + "titleIn";
    GridLayoutCalculator.titleOutClassName = GridLayoutCalculator.dxGanttPrefix + "titleOut";
    GridLayoutCalculator.taskResourceClassName = GridLayoutCalculator.dxGanttPrefix + "taskRes";
    GridLayoutCalculator.arrowClassName = GridLayoutCalculator.dxGanttPrefix + "arrow";
    GridLayoutCalculator.leftArrowClassName = GridLayoutCalculator.dxGanttPrefix + "LA";
    GridLayoutCalculator.topArrowClassName = GridLayoutCalculator.dxGanttPrefix + "TA";
    GridLayoutCalculator.rightArrowClassName = GridLayoutCalculator.dxGanttPrefix + "RA";
    GridLayoutCalculator.bottomArrowClassName = GridLayoutCalculator.dxGanttPrefix + "BA";
    GridLayoutCalculator.CLASSNAMES = {
        CONNECTOR_VERTICAL: "dx-gantt-conn-v",
        CONNECTOR_HORIZONTAL: "dx-gantt-conn-h"
    };
    return GridLayoutCalculator;
}());
exports.GridLayoutCalculator = GridLayoutCalculator;


/***/ }),

/***/ 7072:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScaleCalculator = exports.ScaleItemInfo = void 0;
var point_1 = __webpack_require__(8900);
var size_1 = __webpack_require__(6353);
var DateUtils_1 = __webpack_require__(9201);
var Enums_1 = __webpack_require__(2449);
var ScaleItemInfo = (function () {
    function ScaleItemInfo(start, end, position, size) {
        this.start = start;
        this.end = end;
        this.position = position;
        this.size = size;
    }
    return ScaleItemInfo;
}());
exports.ScaleItemInfo = ScaleItemInfo;
var ScaleCalculator = (function () {
    function ScaleCalculator() {
        this.firstDayOfWeek = 0;
    }
    ScaleCalculator.prototype.setSettings = function (range, viewType, tickSize, firstDayOfWeek) {
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        this.range = range;
        this.viewType = viewType;
        this.tickSize = tickSize;
        this.firstDayOfWeek = firstDayOfWeek;
        this.reset();
    };
    ScaleCalculator.prototype.setViewType = function (viewType) {
        this.viewType = viewType;
        this.reset();
    };
    ScaleCalculator.prototype.reset = function () {
        delete this._bottomScaleItems;
        delete this._topScaleItems;
        delete this._scaleWidth;
    };
    ScaleCalculator.prototype.getScaleIndexByPos = function (pos, scaleType) {
        scaleType !== null && scaleType !== void 0 ? scaleType : (scaleType = this.viewType);
        var items = scaleType === this.viewType ? this.bottomScaleItems : this.topScaleItems;
        var index = -1;
        if (items.findIndex)
            index = items.findIndex(function (i) { return pos >= i.position.x && pos <= i.position.x + i.size.width; });
        else {
            var item = items.filter(function (i) { return pos >= i.position.x && pos <= i.position.x + i.size.width; })[0];
            if (item)
                index = items.indexOf(item);
        }
        return index;
    };
    ScaleCalculator.prototype.getScaleBorderPosition = function (index, scaleType) {
        var item = this.getScaleItems(scaleType)[index];
        if (item)
            return item.position.x + item.size.width;
    };
    ScaleCalculator.prototype.getScaleItems = function (scaleType) {
        if (scaleType === this.viewType)
            return this.bottomScaleItems;
        if (scaleType === DateUtils_1.DateUtils.ViewTypeToScaleMap[this.viewType])
            return this.topScaleItems;
        return null;
    };
    ScaleCalculator.prototype.getScaleItem = function (index, scaleType) {
        return this.getScaleItems(scaleType)[index];
    };
    ScaleCalculator.prototype.getScaleItemAdjustedStart = function (index, scaleType) {
        var item = this.getScaleItems(scaleType)[index];
        if (index > 0)
            return item.start;
        var isTopScale = scaleType !== this.viewType;
        var date = isTopScale ? DateUtils_1.DateUtils.adjustStartDateByViewType(this.range.start, this.viewType, this.firstDayOfWeek) : this.getAdjustedBottomScaleItemStart(item.start, scaleType, this.firstDayOfWeek);
        if (isTopScale && scaleType === Enums_1.ViewType.Months) {
            var ref = this.range.start;
            date = new Date(ref.getFullYear(), ref.getMonth(), 1);
        }
        if (isTopScale && scaleType === Enums_1.ViewType.FiveYears) {
            var year = Math.trunc(date.getFullYear() / 5) * 5;
            date = new Date(year, date.getMonth(), date.getDate());
        }
        return date;
    };
    Object.defineProperty(ScaleCalculator.prototype, "topScaleItems", {
        get: function () {
            var _a;
            (_a = this._topScaleItems) !== null && _a !== void 0 ? _a : (this._topScaleItems = this.calculateTopScale(DateUtils_1.DateUtils.ViewTypeToScaleMap[this.viewType]));
            return this._topScaleItems;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleCalculator.prototype, "bottomScaleItems", {
        get: function () {
            var _a;
            (_a = this._bottomScaleItems) !== null && _a !== void 0 ? _a : (this._bottomScaleItems = this.calculateBottomScale(this.viewType));
            return this._bottomScaleItems;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleCalculator.prototype, "scaleWidth", {
        get: function () {
            var _a;
            (_a = this._scaleWidth) !== null && _a !== void 0 ? _a : (this._scaleWidth = this.calculateScaleWidth());
            return this._scaleWidth;
        },
        enumerable: false,
        configurable: true
    });
    ScaleCalculator.prototype.getFirstScaleIndexForRender = function (startPos) {
        var result = this.getScaleIndexByPos(startPos);
        result = Math.max(result - 10, 0);
        return result;
    };
    ScaleCalculator.prototype.getLastScaleIndexForRender = function (endPos) {
        var result = this.getScaleIndexByPos(endPos);
        if (result === -1)
            result = this.bottomScaleItems.length - 1;
        else
            result = Math.min(result + 10, this.bottomScaleItems.length - 1);
        return result;
    };
    ScaleCalculator.prototype.getTopScaleIndexByBottomIndex = function (index) {
        var bottomItem = this.bottomScaleItems[index];
        return bottomItem ? this.getScaleIndexByPos(bottomItem.position.x, DateUtils_1.DateUtils.ViewTypeToScaleMap[this.viewType]) : -1;
    };
    ScaleCalculator.prototype.calculateBottomScale = function (scaleType) {
        var items = new Array();
        var defWidth = this.tickSize.width;
        var currentDate = this.range.start;
        var x = 0;
        while (currentDate.getTime() < this.range.end.getTime()) {
            var nextDate = this.getNextScaleDate(currentDate, scaleType);
            var isStart = currentDate.getTime() === this.range.start.getTime();
            var isEnd = nextDate.getTime() >= this.range.end.getTime();
            var needWidthCorrection = isStart || isEnd || (scaleType > Enums_1.ViewType.Hours && DateUtils_1.DateUtils.hasDST());
            var width = needWidthCorrection ? this.getRangeTickCount(currentDate, nextDate) * defWidth : defWidth;
            items.push(new ScaleItemInfo(currentDate, nextDate, new point_1.Point(x, undefined), new size_1.Size(width, 0)));
            currentDate = nextDate;
            x += width;
        }
        return items;
    };
    ScaleCalculator.prototype.calculateTopScale = function (scaleType) {
        var items = new Array();
        var endRangeTime = this.range.end.getTime();
        var itemStartDate = this.range.start;
        var itemStartPos = 0;
        var lastBottomIndex = 0;
        while (itemStartDate.getTime() < endRangeTime) {
            var itemNextDate = this.getNextScaleDate(itemStartDate, scaleType);
            var nextDateTime = itemNextDate.getTime();
            for (var i = lastBottomIndex; i < this.bottomScaleItems.length; i++) {
                var item = this.bottomScaleItems[i];
                var startTime = item.start.getTime();
                var endTime = item.end.getTime();
                var isNextDateInItem = nextDateTime >= startTime && nextDateTime <= endTime;
                if (isNextDateInItem) {
                    var itemEndPos = (nextDateTime - startTime) / (endTime - startTime) * item.size.width + item.position.x;
                    items.push(new ScaleItemInfo(itemStartDate, itemNextDate, new point_1.Point(itemStartPos, undefined), new size_1.Size(itemEndPos - itemStartPos, 0)));
                    lastBottomIndex = i;
                    itemStartPos = itemEndPos;
                    itemStartDate = itemNextDate;
                    break;
                }
            }
        }
        return items;
    };
    ScaleCalculator.prototype.getDateInScale = function (pos) {
        if (pos < 0) {
            var timeOffset = pos / this.tickSize.width;
            var timeSpan = DateUtils_1.DateUtils.getTickTimeSpan(this.viewType);
            return new Date(this.range.start.getTime() + timeOffset * timeSpan);
        }
        for (var i = 0; i < this.bottomScaleItems.length; i++) {
            var item = this.bottomScaleItems[i];
            var width = item.size.width;
            var left = item.position.x;
            if (pos >= left && pos <= left + width) {
                var startTime = item.start.getTime();
                var endTime = item.end.getTime();
                var timeOffset = (pos - left) / width * (endTime - startTime);
                return new Date(item.start.getTime() + timeOffset);
            }
        }
        return new Date(this.range.end);
    };
    ScaleCalculator.prototype.getNextScaleDate = function (start, scaleType) {
        var date;
        switch (scaleType) {
            case Enums_1.ViewType.TenMinutes:
                date = this.getNextDateInTenMinutesScale(start);
                break;
            case Enums_1.ViewType.Hours:
                date = this.getNextDateInHoursScale(start);
                break;
            case Enums_1.ViewType.SixHours:
                date = this.getNextDateInSixHoursScale(start);
                break;
            case Enums_1.ViewType.Days:
                date = this.getNextDateInDaysScale(start);
                break;
            case Enums_1.ViewType.Weeks:
                date = this.getNextDateInWeeksScale(start, this.firstDayOfWeek);
                break;
            case Enums_1.ViewType.Months:
                date = this.getNextDateInMonthsScale(start);
                break;
            case Enums_1.ViewType.Quarter:
                date = this.getNextDateInQuartersScale(start);
                break;
            case Enums_1.ViewType.Years:
                date = this.getNextDateInYearsScale(start);
                break;
            case Enums_1.ViewType.FiveYears:
                date = this.getNextDateInFiveYearsScale(start);
                break;
        }
        if (date.getTime() > this.range.end.getTime())
            date = this.range.end;
        return date;
    };
    ScaleCalculator.prototype.getNextTimeBySpan = function (value, span) {
        var k = Math.trunc(value / span);
        return (k + 1) * span;
    };
    ScaleCalculator.prototype.getNextDateInTenMinutesScale = function (date) {
        var minutes = this.getNextTimeBySpan(date.getMinutes(), 10);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), minutes);
    };
    ScaleCalculator.prototype.getNextDateInHoursScale = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1);
    };
    ScaleCalculator.prototype.getNextDateInSixHoursScale = function (date) {
        var hours = this.getNextTimeBySpan(date.getHours(), 6);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours);
    };
    ScaleCalculator.prototype.getNextDateInDaysScale = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    };
    ScaleCalculator.prototype.getNextDateInWeeksScale = function (date, firstDayOfWeek) {
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + firstDayOfWeek + 7);
    };
    ScaleCalculator.prototype.getNextDateInMonthsScale = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    };
    ScaleCalculator.prototype.getNextDateInQuartersScale = function (date) {
        var months = this.getNextTimeBySpan(date.getMonth(), 3);
        return new Date(date.getFullYear(), months, 1);
    };
    ScaleCalculator.prototype.getNextDateInYearsScale = function (date) {
        return new Date(date.getFullYear() + 1, 0, 1);
    };
    ScaleCalculator.prototype.getNextDateInFiveYearsScale = function (date) {
        var years = this.getNextTimeBySpan(date.getFullYear(), 5);
        return new Date(years, 0, 1);
    };
    ScaleCalculator.prototype.getAdjustedBottomScaleItemStart = function (date, viewType, firstDayOfWeek) {
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        switch (viewType) {
            case Enums_1.ViewType.TenMinutes:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), Math.floor(date.getMinutes() / 10) * 10);
            case Enums_1.ViewType.SixHours:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(date.getHours() / 6) * 6);
            case Enums_1.ViewType.Hours:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
            case Enums_1.ViewType.Days:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate());
            case Enums_1.ViewType.Weeks:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + firstDayOfWeek);
            case Enums_1.ViewType.Months:
                return new Date(date.getFullYear(), date.getMonth(), 1);
            case Enums_1.ViewType.Quarter:
                return new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 1);
            case Enums_1.ViewType.Years:
                return new Date(date.getFullYear(), 0, 1);
            default:
                return new Date();
        }
    };
    ScaleCalculator.prototype.calculateScaleWidth = function () {
        return this.bottomScaleItems.reduce(function (sum, item) { return sum += item.size.width; }, 0);
    };
    ScaleCalculator.prototype.getScaleItemColSpan = function (scaleType) {
        if (scaleType.valueOf() === this.viewType.valueOf())
            return 1;
        if (this.viewType === Enums_1.ViewType.TenMinutes)
            return 6;
        if (this.viewType === Enums_1.ViewType.Hours)
            return 24;
        if (this.viewType === Enums_1.ViewType.SixHours)
            return 4;
        if (this.viewType === Enums_1.ViewType.Days)
            return 7;
        if (this.viewType === Enums_1.ViewType.Weeks)
            return 4.29;
        if (this.viewType === Enums_1.ViewType.Months)
            return 12;
        if (this.viewType === Enums_1.ViewType.Quarter)
            return 4;
        if (this.viewType === Enums_1.ViewType.Years)
            return 5;
        return 1;
    };
    ScaleCalculator.prototype.getRangeTickCount = function (start, end) {
        return DateUtils_1.DateUtils.getRangeTickCount(start, end, this.viewType);
    };
    return ScaleCalculator;
}());
exports.ScaleCalculator = ScaleCalculator;


/***/ }),

/***/ 9377:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaContainer = void 0;
var TaskAreaContainer = (function () {
    function TaskAreaContainer(element, ganttView) {
        this.element = element;
        this.onScrollHandler = function () { ganttView.updateView(); };
        this.element.addEventListener("scroll", this.onScrollHandler);
    }
    Object.defineProperty(TaskAreaContainer.prototype, "scrollTop", {
        get: function () {
            return this.element.scrollTop;
        },
        set: function (value) {
            this.element.scrollTop = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "scrollLeft", {
        get: function () {
            return this.element.scrollLeft;
        },
        set: function (value) {
            this.element.scrollLeft = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "scrollWidth", {
        get: function () {
            return this.element.scrollWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "scrollHeight", {
        get: function () {
            return this.element.scrollHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "isExternal", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaContainer.prototype.getWidth = function () {
        return this.element.offsetWidth;
    };
    TaskAreaContainer.prototype.getHeight = function () {
        return this.element.offsetHeight;
    };
    TaskAreaContainer.prototype.getElement = function () {
        return this.element;
    };
    TaskAreaContainer.prototype.detachEvents = function () {
        this.element.removeEventListener("scroll", this.onScrollHandler);
    };
    return TaskAreaContainer;
}());
exports.TaskAreaContainer = TaskAreaContainer;


/***/ }),

/***/ 6923:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectorLinesRender = void 0;
var RenderElementUtils_1 = __webpack_require__(658);
var GridLayoutCalculator_1 = __webpack_require__(1855);
var ConnectorLinesRender = (function () {
    function ConnectorLinesRender(renderHelepr) {
        this._connectorLinesToElementsMap = {};
        this._renderedConnectorLines = [];
        this._renderHelper = renderHelepr;
    }
    Object.defineProperty(ConnectorLinesRender.prototype, "taskEditController", {
        get: function () {
            return this._renderHelper.taskEditController;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorLinesRender.prototype, "taskAreaContainerScrollTop", {
        get: function () {
            return this._renderHelper.ganttViewTaskAreaContainerScrollTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorLinesRender.prototype, "gridLayoutCalculator", {
        get: function () {
            return this._renderHelper.gridLayoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorLinesRender.prototype, "connectorLinesToElementsMap", {
        get: function () {
            return this._connectorLinesToElementsMap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorLinesRender.prototype, "taskArea", {
        get: function () {
            return this._renderHelper.taskArea;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorLinesRender.prototype, "invalidTaskDependencies", {
        get: function () {
            return this._renderHelper.invalidTaskDependencies;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorLinesRender.prototype, "showDependencies", {
        get: function () {
            return this._renderHelper.showDependencies;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorLinesRender.prototype, "renderedConnectorLines", {
        get: function () {
            return this._renderedConnectorLines;
        },
        enumerable: false,
        configurable: true
    });
    ConnectorLinesRender.prototype.reset = function () {
        this._connectorLinesToElementsMap = {};
        this._renderedConnectorLines = [];
    };
    ConnectorLinesRender.prototype.createConnectorLineElement = function (info) {
        if (!this.showDependencies)
            return;
        var dependencyId = info.attr["dependency-id"];
        var isInvalid = this.invalidTaskDependencies.some(function (d) { return d.id == dependencyId; });
        if (isInvalid)
            return;
        if (this.taskEditController.isDependencySelected(dependencyId))
            info.className = info.className + " active";
        var isArrow = info.className.indexOf(GridLayoutCalculator_1.GridLayoutCalculator.arrowClassName) > -1;
        var element = RenderElementUtils_1.RenderElementUtils.create(info, null, this.taskArea, this.connectorLinesToElementsMap);
        if (isArrow)
            this.gridLayoutCalculator.checkAndCorrectArrowElementDisplayByRange(element);
        return element;
    };
    ConnectorLinesRender.prototype.removeConnectorLineElement = function (info) {
        RenderElementUtils_1.RenderElementUtils.remove(info, null, this.taskArea, this.connectorLinesToElementsMap);
    };
    ConnectorLinesRender.prototype.recreateConnectorLineElement = function (dependencyId, forceRender) {
        var _this = this;
        if (forceRender === void 0) { forceRender = false; }
        var infos = [];
        this._renderedConnectorLines = this.renderedConnectorLines.filter(function (info) {
            if (info.attr["dependency-id"] != dependencyId)
                return true;
            infos.push(info);
            return false;
        });
        var isRendered = infos.length > 0;
        infos.forEach(function (info) { _this.removeConnectorLineElement(info); });
        infos = this.gridLayoutCalculator.updateTileToConnectorLinesMap(dependencyId);
        if (isRendered || forceRender)
            infos.forEach(function (info) { _this.createConnectorLineElement(info); _this.renderedConnectorLines.push(info); });
    };
    ConnectorLinesRender.prototype.recreateConnectorLineElements = function () {
        var _this = this;
        var newRenderedConnectorLines = this.gridLayoutCalculator.getRenderedConnectorLines(this.taskAreaContainerScrollTop);
        RenderElementUtils_1.RenderElementUtils.recreate(this.renderedConnectorLines, newRenderedConnectorLines, function (info) { _this.removeConnectorLineElement(info); }, function (info) { _this.createConnectorLineElement(info); });
        this._renderedConnectorLines = newRenderedConnectorLines;
    };
    ConnectorLinesRender.prototype.updateRenderedConnectorLinesId = function (oldId, newKey) {
        this._renderedConnectorLines.forEach(function (line) {
            if (line.attr["dependency-id"] === oldId)
                line.attr["dependency-id"] = newKey;
        });
        for (var key in this.connectorLinesToElementsMap) {
            if (!Object.prototype.hasOwnProperty.call(this.connectorLinesToElementsMap, key))
                continue;
            var element = this.connectorLinesToElementsMap[key];
            if (element.getAttribute("dependency-id") === oldId)
                element.setAttribute("dependency-id", newKey);
        }
        this.gridLayoutCalculator.updateTileToConnectorLinesMap(oldId);
        this.gridLayoutCalculator.updateTileToConnectorLinesMap(newKey);
    };
    return ConnectorLinesRender;
}());
exports.ConnectorLinesRender = ConnectorLinesRender;


/***/ }),

/***/ 1419:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomTaskRender = void 0;
var Enums_1 = __webpack_require__(2449);
var RenderElementUtils_1 = __webpack_require__(658);
var CustomTaskRender = (function () {
    function CustomTaskRender(renderHelepr, taskRender) {
        this._pendingTemplateFuncsToRender = [];
        this._renderHelper = renderHelepr;
        this._taskRender = taskRender;
    }
    Object.defineProperty(CustomTaskRender.prototype, "gridLayoutCalculator", {
        get: function () {
            return this._renderHelper.gridLayoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomTaskRender.prototype, "tickSize", {
        get: function () {
            return this._renderHelper.tickSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomTaskRender.prototype, "taskTitlePosition", {
        get: function () {
            return this._renderHelper.taskTitlePosition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomTaskRender.prototype, "taskElements", {
        get: function () {
            return this._taskRender.taskElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomTaskRender.prototype, "taskArea", {
        get: function () {
            return this._renderHelper.taskArea;
        },
        enumerable: false,
        configurable: true
    });
    CustomTaskRender.prototype.getViewItem = function (index) {
        return this._renderHelper.getViewItem(index);
    };
    CustomTaskRender.prototype.getTask = function (index) {
        return this._renderHelper.getTask(index);
    };
    CustomTaskRender.prototype.destroyTemplate = function (container) {
        this._renderHelper.destroyTemplate(container);
    };
    CustomTaskRender.prototype.getTaskDependencies = function (taskInternalId) {
        return this._renderHelper.getTaskDependencies(taskInternalId);
    };
    CustomTaskRender.prototype.getTaskResources = function (key) {
        return this._renderHelper.getTaskResources(key);
    };
    CustomTaskRender.prototype.attachEventsOnTask = function (taskIndex) {
        this._renderHelper.attachEventsOnTask(taskIndex);
    };
    CustomTaskRender.prototype.recreateConnectorLineElement = function (dependencyId, forceRender) {
        if (forceRender === void 0) { forceRender = false; }
        this._renderHelper.recreateConnectorLineElement(dependencyId, forceRender);
    };
    CustomTaskRender.prototype.createTaskSelectionElement = function (taskIndex) {
        this._taskRender.createTaskSelectionElement(taskIndex);
    };
    CustomTaskRender.prototype.createCustomTaskElement = function (index, taskTemplateFunction) {
        this._saveTemplateFuncToStack(index, taskTemplateFunction);
        if (this._hasRepeatedTemplateRenderCall(index))
            return;
        var viewItem = this.getViewItem(index);
        viewItem.isCustom = false;
        var taskTemplateContainer = document.createElement("DIV");
        var taskInformation = this.createCustomTaskInformation(index);
        viewItem.isCustom = true;
        taskTemplateFunction(taskTemplateContainer, taskInformation, this.onTaskTemplateContainerRendered.bind(this), index);
    };
    CustomTaskRender.prototype.onTaskTemplateContainerRendered = function (taskTemplateContainer, taskIndex) {
        var _this = this;
        if (this._hasRepeatedTemplateRenderCall(taskIndex)) {
            if (taskTemplateContainer)
                this._renderHelper.destroyTemplate(taskTemplateContainer);
            var templateFunc_1 = this._getLastPendingTemplateFunc(taskIndex);
            setTimeout(function () { return _this.createCustomTaskElement(taskIndex, templateFunc_1); });
        }
        else
            this.drawCustomTask(taskTemplateContainer, taskIndex);
        this._clearTemplateFuncsStack(taskIndex);
    };
    CustomTaskRender.prototype._saveTemplateFuncToStack = function (index, taskTemplateFunction) {
        var _a;
        var _b;
        (_a = (_b = this._pendingTemplateFuncsToRender)[index]) !== null && _a !== void 0 ? _a : (_b[index] = []);
        this._pendingTemplateFuncsToRender[index].push(taskTemplateFunction);
    };
    CustomTaskRender.prototype._clearTemplateFuncsStack = function (index) { this._pendingTemplateFuncsToRender[index] = []; };
    CustomTaskRender.prototype._hasRepeatedTemplateRenderCall = function (index) { return this._pendingTemplateFuncsToRender[index].length > 1; };
    CustomTaskRender.prototype._getLastPendingTemplateFunc = function (index) {
        var pendingStack = this._pendingTemplateFuncsToRender[index];
        return pendingStack[pendingStack.length - 1];
    };
    CustomTaskRender.prototype.createCustomTaskWrapperElement = function (index, taskWrapperInfo) {
        RenderElementUtils_1.RenderElementUtils.create(taskWrapperInfo, index, this.taskArea, this.taskElements);
    };
    CustomTaskRender.prototype.createCustomTaskVisualElement = function (index, taskElementInfo) {
        var taskElement = RenderElementUtils_1.RenderElementUtils.create(taskElementInfo, index, this.taskElements[index]);
        return taskElement;
    };
    CustomTaskRender.prototype.drawCustomTask = function (taskTemplateContainer, taskIndex) {
        var _this = this;
        if (!this.taskElements[taskIndex])
            return;
        var viewItem = this.getViewItem(taskIndex);
        viewItem.visible = !!taskTemplateContainer.innerHTML;
        this.taskElements[taskIndex].innerHTML = taskTemplateContainer.innerHTML;
        viewItem.size.height = this.taskElements[taskIndex].offsetHeight;
        viewItem.size.width = this.taskElements[taskIndex].offsetWidth;
        this.destroyTemplate(this.taskElements[taskIndex]);
        this._taskRender.removeTaskElement(taskIndex);
        if (viewItem.visible) {
            var taskWrapperInfo = this.gridLayoutCalculator.getTaskWrapperElementInfo(taskIndex);
            this.createCustomTaskWrapperElement(taskIndex, taskWrapperInfo);
            this.taskElements[taskIndex].appendChild(taskTemplateContainer);
            this.attachEventsOnTask(taskIndex);
        }
        else {
            var taskDependencies = this.getTaskDependencies(viewItem.task.internalId);
            if (taskDependencies.length) {
                this._taskRender.addInvalidTaskDependencies(taskDependencies);
                taskDependencies.forEach(function (d) { return _this.recreateConnectorLineElement(d.internalId, true); });
            }
        }
        if (this._taskRender.isHighlightRowElementAllowed(taskIndex))
            this._taskRender.createHighlightRowElement(taskIndex);
        if (viewItem.selected)
            this.createTaskSelectionElement(taskIndex);
    };
    CustomTaskRender.prototype.createCustomTaskInformation = function (index) {
        var task = this.getTask(index);
        var viewItem = this.getViewItem(index);
        var taskWrapperInfo = this.gridLayoutCalculator.getTaskWrapperElementInfo(index);
        var taskElementInfo = this.gridLayoutCalculator.getTaskElementInfo(index, this.taskTitlePosition !== Enums_1.TaskTitlePosition.Inside);
        this.createCustomTaskWrapperElement(index, taskWrapperInfo);
        var taskVisualElement = this.createCustomTaskVisualElement(index, taskElementInfo);
        this._taskRender.createTaskTextElement(index, taskVisualElement);
        var taskResources = this.getTaskResources(task.id);
        var taskInformation = {
            cellSize: this.tickSize,
            isMilestone: task.isMilestone(),
            isParent: !!(viewItem === null || viewItem === void 0 ? void 0 : viewItem.children.length),
            taskData: task,
            taskHTML: taskVisualElement,
            taskPosition: taskWrapperInfo.position,
            taskResources: taskResources,
            taskSize: taskElementInfo.size,
        };
        return taskInformation;
    };
    return CustomTaskRender;
}());
exports.CustomTaskRender = CustomTaskRender;


/***/ }),

/***/ 9385:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EtalonsHelper = void 0;
var dom_1 = __webpack_require__(6907);
var Enums_1 = __webpack_require__(2449);
var GridElementInfo_1 = __webpack_require__(1391);
var RenderElementUtils_1 = __webpack_require__(658);
var EtalonsHelper = (function () {
    function EtalonsHelper(renderHelepr) {
        this._renderHelper = renderHelepr;
    }
    Object.defineProperty(EtalonsHelper.prototype, "mainElement", {
        get: function () {
            return this._renderHelper.mainElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EtalonsHelper.prototype, "etalonSizeValues", {
        get: function () {
            return this._renderHelper.etalonSizeValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EtalonsHelper.prototype, "scaleCount", {
        get: function () {
            return this._renderHelper.scaleCount;
        },
        enumerable: false,
        configurable: true
    });
    EtalonsHelper.prototype.getScaleItemTextTemplate = function (viewType) {
        return this._renderHelper.getScaleItemTextTemplate(viewType);
    };
    EtalonsHelper.prototype.getHeaderHeight = function () {
        return this._renderHelper.getHeaderHeight();
    };
    EtalonsHelper.prototype.getSmallTaskWidth = function (etalonPaddingLeft) {
        return this._renderHelper.getSmallTaskWidth(etalonPaddingLeft);
    };
    EtalonsHelper.prototype.createEtalonElementsContainer = function () {
        var result = document.createElement("DIV");
        result.style.visibility = "hidden";
        result.style.position = "absolute";
        result.style.left = "-1000px";
        this.mainElement.appendChild(result);
        return result;
    };
    EtalonsHelper.prototype.createEtalonElements = function (parent) {
        var etalonElements = [];
        var wrapper = RenderElementUtils_1.RenderElementUtils.create(new GridElementInfo_1.GridElementInfo("dx-gantt-taskWrapper"), null, parent);
        var task = RenderElementUtils_1.RenderElementUtils.create(new GridElementInfo_1.GridElementInfo("dx-gantt-task"), null, wrapper);
        var taskTitle = RenderElementUtils_1.RenderElementUtils.create(new GridElementInfo_1.GridElementInfo("dx-gantt-taskTitle dx-gantt-titleIn"), null, task);
        taskTitle.innerText = "WWW";
        etalonElements.push(wrapper);
        var milestoneWrapper = RenderElementUtils_1.RenderElementUtils.create(new GridElementInfo_1.GridElementInfo("dx-gantt-taskWrapper"), null, parent);
        RenderElementUtils_1.RenderElementUtils.create(new GridElementInfo_1.GridElementInfo("dx-gantt-task dx-gantt-milestone"), null, milestoneWrapper);
        etalonElements.push(milestoneWrapper);
        var etalonElementClassNames = ["dx-gantt-conn-h", "dx-gantt-arrow", "dx-gantt-si", "dx-gantt-taskTitle dx-gantt-titleOut"];
        for (var i = 0; i < etalonElementClassNames.length; i++) {
            var etalonElementInfo = new GridElementInfo_1.GridElementInfo(etalonElementClassNames[i]);
            etalonElements.push(RenderElementUtils_1.RenderElementUtils.create(etalonElementInfo, null, parent));
        }
        var parentWrapper = RenderElementUtils_1.RenderElementUtils.create(new GridElementInfo_1.GridElementInfo("dx-gantt-taskWrapper"), null, parent);
        var parentTask = RenderElementUtils_1.RenderElementUtils.create(new GridElementInfo_1.GridElementInfo("dx-gantt-task dx-gantt-parent"), null, parentWrapper);
        var parentTaskTitle = RenderElementUtils_1.RenderElementUtils.create(new GridElementInfo_1.GridElementInfo("dx-gantt-taskTitle dx-gantt-titleIn"), null, parentTask);
        parentTaskTitle.innerText = "WWW";
        etalonElements.push(parentWrapper);
        return etalonElements;
    };
    EtalonsHelper.prototype.calculateEtalonSizeValues = function () {
        var etalonElementsContainer = this.createEtalonElementsContainer();
        var etalonElements = this.createEtalonElements(etalonElementsContainer);
        this.calculateEtalonSizeValuesCore(etalonElements);
        this.mainElement.removeChild(etalonElementsContainer);
    };
    EtalonsHelper.prototype.calculateEtalonSizeValuesCore = function (etalonElements) {
        this.etalonSizeValues.taskHeight = etalonElements[0].firstChild.offsetHeight;
        this.etalonSizeValues.milestoneWidth = etalonElements[1].firstChild.offsetWidth;
        this.etalonSizeValues.taskWrapperTopPadding = dom_1.DomUtils.pxToInt(dom_1.DomUtils.getCurrentStyle(etalonElements[0]).paddingTop);
        this.etalonSizeValues.connectorLineThickness = dom_1.DomUtils.getVerticalBordersWidth(etalonElements[2]);
        this.etalonSizeValues.connectorArrowWidth = dom_1.DomUtils.getHorizontalBordersWidth(etalonElements[3]);
        for (var i = 0; i <= Enums_1.ViewType.Years; i++) {
            etalonElements[4].innerText = this.getScaleItemTextTemplate(i);
            this.etalonSizeValues.scaleItemWidths[i] = etalonElements[4].offsetWidth;
        }
        this.etalonSizeValues.smallTaskWidth = this.getSmallTaskWidth(dom_1.DomUtils.getCurrentStyle(etalonElements[0].firstChild.firstChild).paddingLeft);
        this.etalonSizeValues.outsideTaskTextDefaultWidth = dom_1.DomUtils.pxToFloat(dom_1.DomUtils.getCurrentStyle(etalonElements[5]).width);
        this.etalonSizeValues.scaleItemHeight = this.getHeaderHeight() / this.scaleCount;
        this.etalonSizeValues.parentTaskHeight = etalonElements[etalonElements.length - 1].firstChild.offsetHeight;
    };
    return EtalonsHelper;
}());
exports.EtalonsHelper = EtalonsHelper;


/***/ }),

/***/ 4289:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScaleCellPreparedArguments = void 0;
var ScaleCellPreparedArguments = (function () {
    function ScaleCellPreparedArguments(info) {
        this.info = info;
    }
    Object.defineProperty(ScaleCellPreparedArguments.prototype, "scaleIndex", {
        get: function () { var _a; return (_a = this.info) === null || _a === void 0 ? void 0 : _a.scaleIndex; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleCellPreparedArguments.prototype, "scaleType", {
        get: function () { var _a; return (_a = this.info) === null || _a === void 0 ? void 0 : _a.scaleType; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleCellPreparedArguments.prototype, "start", {
        get: function () { var _a, _b; return (_b = (_a = this.info) === null || _a === void 0 ? void 0 : _a.range) === null || _b === void 0 ? void 0 : _b.start; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleCellPreparedArguments.prototype, "end", {
        get: function () { var _a, _b; return (_b = (_a = this.info) === null || _a === void 0 ? void 0 : _a.range) === null || _b === void 0 ? void 0 : _b.end; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleCellPreparedArguments.prototype, "scaleElement", {
        get: function () { var _a; return (_a = this.info) === null || _a === void 0 ? void 0 : _a.scaleElement; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleCellPreparedArguments.prototype, "separatorElement", {
        get: function () { var _a; return (_a = this.info) === null || _a === void 0 ? void 0 : _a.separatorElement; },
        enumerable: false,
        configurable: true
    });
    return ScaleCellPreparedArguments;
}());
exports.ScaleCellPreparedArguments = ScaleCellPreparedArguments;


/***/ }),

/***/ 2121:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainElementsRender = void 0;
var MainElementsRender = (function () {
    function MainElementsRender() {
    }
    MainElementsRender.prototype.createMainElement = function (parent) {
        var mainElement = document.createElement("DIV");
        mainElement.style.width = parent.offsetWidth + "px";
        mainElement.style.height = parent.offsetHeight + "px";
        return mainElement;
    };
    MainElementsRender.prototype.createHeader = function () {
        var header = document.createElement("DIV");
        header.className = "dx-gantt-header";
        return header;
    };
    return MainElementsRender;
}());
exports.MainElementsRender = MainElementsRender;


/***/ }),

/***/ 1027:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoWorkingIntervalRender = void 0;
var RenderElementUtils_1 = __webpack_require__(658);
var NoWorkingIntervalRender = (function () {
    function NoWorkingIntervalRender(renderHelepr) {
        this._noWorkingIntervalsToElementsMap = {};
        this._renderedNoWorkingIntervals = [];
        this._renderHelper = renderHelepr;
    }
    Object.defineProperty(NoWorkingIntervalRender.prototype, "noWorkingIntervalsToElementsMap", {
        get: function () {
            return this._noWorkingIntervalsToElementsMap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoWorkingIntervalRender.prototype, "taskAreaContainerScrollLeft", {
        get: function () {
            return this._renderHelper.ganttTaskAreaContainerScrollLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoWorkingIntervalRender.prototype, "gridLayoutCalculator", {
        get: function () {
            return this._renderHelper.gridLayoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoWorkingIntervalRender.prototype, "taskArea", {
        get: function () {
            return this._renderHelper.taskArea;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoWorkingIntervalRender.prototype, "renderedNoWorkingIntervals", {
        get: function () {
            return this._renderedNoWorkingIntervals;
        },
        set: function (renderedNoWorkingIntervals) {
            this._renderedNoWorkingIntervals = renderedNoWorkingIntervals;
        },
        enumerable: false,
        configurable: true
    });
    NoWorkingIntervalRender.prototype.reset = function () {
        this._noWorkingIntervalsToElementsMap = {};
        this._renderedNoWorkingIntervals = [];
    };
    NoWorkingIntervalRender.prototype.createNoWorkingIntervalElement = function (info) {
        return RenderElementUtils_1.RenderElementUtils.create(info, null, this.taskArea, this.noWorkingIntervalsToElementsMap);
    };
    NoWorkingIntervalRender.prototype.removeNoWorkingIntervalElement = function (info) {
        RenderElementUtils_1.RenderElementUtils.remove(info, null, this.taskArea, this.noWorkingIntervalsToElementsMap);
    };
    NoWorkingIntervalRender.prototype.recreateNoWorkingIntervalElements = function () {
        var _this = this;
        var newRenderedNoWorkingIntervals = this.gridLayoutCalculator.getRenderedNoWorkingIntervals(this.taskAreaContainerScrollLeft);
        RenderElementUtils_1.RenderElementUtils.recreate(this.renderedNoWorkingIntervals, newRenderedNoWorkingIntervals, function (info) { _this.removeNoWorkingIntervalElement(info); }, function (info) { _this.createNoWorkingIntervalElement(info); });
        this.renderedNoWorkingIntervals = newRenderedNoWorkingIntervals;
    };
    return NoWorkingIntervalRender;
}());
exports.NoWorkingIntervalRender = NoWorkingIntervalRender;


/***/ }),

/***/ 658:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RenderElementUtils = void 0;
var RenderElementUtils = (function () {
    function RenderElementUtils() {
    }
    RenderElementUtils.create = function (info, index, parent, dictionary) {
        var element = document.createElement("DIV");
        info.assignToElement(element);
        parent.appendChild(element);
        if (dictionary)
            if (dictionary instanceof Array && index !== null)
                dictionary[index] = element;
            else
                dictionary[info.id] = element;
        for (var key in info.attr)
            if (Object.prototype.hasOwnProperty.call(info.attr, key))
                element.setAttribute(key, info.attr[key]);
        for (var key in info.style)
            if (Object.prototype.hasOwnProperty.call(info.style, key))
                element.style[key] = info.style[key];
        return element;
    };
    RenderElementUtils.remove = function (info, index, parent, dictionary) {
        var element;
        if (dictionary instanceof Array && index !== null) {
            element = dictionary[index];
            delete dictionary[index];
        }
        else {
            element = dictionary[info.id];
            delete dictionary[info.id];
        }
        if (element && element.parentNode == parent)
            parent.removeChild(element);
    };
    RenderElementUtils.recreate = function (oldRenderedElementsInfo, newRenderedelementsInfo, removeAction, createAction) {
        oldRenderedElementsInfo
            .filter(function (info) { return newRenderedelementsInfo.indexOf(info) === -1; })
            .forEach(function (info) { removeAction(info); });
        newRenderedelementsInfo
            .filter(function (info) { return oldRenderedElementsInfo.indexOf(info) === -1; })
            .forEach(function (info) { createAction(info); });
    };
    return RenderElementUtils;
}());
exports.RenderElementUtils = RenderElementUtils;


/***/ }),

/***/ 1074:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RenderHelper = void 0;
var ConnectorLinesRender_1 = __webpack_require__(6923);
var EtalonsHelper_1 = __webpack_require__(9385);
var EtalonSizeValues_1 = __webpack_require__(8877);
var GanttView_1 = __webpack_require__(2366);
var GridLayoutCalculator_1 = __webpack_require__(1855);
var NoWorkingIntervalRender_1 = __webpack_require__(1027);
var ResourceRender_1 = __webpack_require__(4966);
var ScaleRender_1 = __webpack_require__(6700);
var StripLinesRender_1 = __webpack_require__(8148);
var TaskAreaManager_1 = __webpack_require__(3682);
var TaskAreaRender_1 = __webpack_require__(2349);
var TaskRender_1 = __webpack_require__(2290);
var MainElementsRender_1 = __webpack_require__(2121);
var size_1 = __webpack_require__(6353);
var TaskAreaContainer_1 = __webpack_require__(9377);
var ElementTextHelper_1 = __webpack_require__(8380);
var RenderHelper = (function () {
    function RenderHelper(ganttView) {
        this.hlRowElements = [];
        this.renderedColIndices = [];
        this.renderedRowIndices = [];
        this.invalidTaskDependencies = [];
        this.etalonSizeValues = new EtalonSizeValues_1.EtalonSizeValues();
        this._gridLayoutCalculator = new GridLayoutCalculator_1.GridLayoutCalculator();
        this._ganttView = ganttView;
        this._connectorLinesRender = new ConnectorLinesRender_1.ConnectorLinesRender(this);
        this._etalonsHelper = new EtalonsHelper_1.EtalonsHelper(this);
        this._noWorkingIntervalRender = new NoWorkingIntervalRender_1.NoWorkingIntervalRender(this);
        this._resourceRender = new ResourceRender_1.ResourseRender(this);
        this._scaleRender = new ScaleRender_1.ScaleRender(this);
        this._stripLinesRender = new StripLinesRender_1.StripLinesRender(this);
        this._taskAreaRender = new TaskAreaRender_1.TaskAreaRender(this);
        this._taskRender = new TaskRender_1.TaskRender(this);
        this._mainElementsRender = new MainElementsRender_1.MainElementsRender();
    }
    RenderHelper.prototype.reset = function () {
        this.invalidTaskDependencies = [];
        this._taskAreaRender.reset();
        this._taskRender.reset();
        this._taskArea.innerHTML = "";
        this._scaleRender.reset();
        this.hlRowElements = [];
        this.renderedRowIndices = [];
        this.renderedColIndices = [];
        this._connectorLinesRender.reset();
        this._stripLinesRender.reset();
        this._noWorkingIntervalRender.reset();
    };
    RenderHelper.prototype.createMainElement = function (parent) {
        this.mainElement = this._mainElementsRender.createMainElement(parent);
        parent.appendChild(this.mainElement);
    };
    RenderHelper.prototype.createHeader = function () {
        this.header = this._mainElementsRender.createHeader();
        this.mainElement.appendChild(this.header);
    };
    RenderHelper.prototype.init = function (tickSize, range, viewType, viewModel, firstDayOfWeek) {
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        this._elementTextHelper.setFont(this.mainElement);
        this.setupHelpers(tickSize, range, viewType, viewModel, firstDayOfWeek);
        this.setSizeForTaskArea();
        this.createTimeScale();
        this._taskAreaManager = new TaskAreaManager_1.TaskAreaManager(this._ganttView.taskAreaEventsListener, this.taskArea, this.tickSize);
    };
    RenderHelper.prototype.initMarkup = function (element) {
        this._elementTextHelper = new ElementTextHelper_1.ElementTextHelper(this.ganttViewSettings.cultureInfo);
        this.createMainElement(element);
        this.createHeader();
        this._etalonsHelper.calculateEtalonSizeValues();
        this._taskAreaRender.createTaskAreaContainer();
    };
    RenderHelper.prototype.processScroll = function (isVertical) {
        this._taskAreaRender.recreateTaskAreaBordersAndTaskElements(isVertical);
        if (isVertical)
            this._connectorLinesRender.recreateConnectorLineElements();
        else {
            this._noWorkingIntervalRender.recreateNoWorkingIntervalElements();
            this._stripLinesRender.recreateStripLines();
            this._scaleRender.recreateScalesElements();
        }
    };
    Object.defineProperty(RenderHelper.prototype, "ganttViewSettings", {
        get: function () {
            return this._ganttView.settings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "taskTextHeightKey", {
        get: function () {
            return GanttView_1.GanttView.taskTextHeightKey;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "showResources", {
        get: function () {
            return this.ganttViewSettings.showResources;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "showDependencies", {
        get: function () {
            return this.ganttViewSettings.showDependencies;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "viewModelItems", {
        get: function () {
            return this._ganttView.viewModel.items;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "stripLines", {
        get: function () {
            return this.ganttViewSettings.stripLines;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "range", {
        get: function () {
            return this._ganttView.range;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "viewType", {
        get: function () {
            return this.ganttViewSettings.viewType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "taskTitlePosition", {
        get: function () {
            return this.ganttViewSettings.taskTitlePosition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "tickSize", {
        get: function () {
            return this._ganttView.tickSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "ganttViewTaskAreaContainerScrollTop", {
        get: function () {
            return this._ganttView.taskAreaContainerScrollTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "ganttTaskAreaContainerScrollLeft", {
        get: function () {
            return this._ganttView.taskAreaContainerScrollLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "scaleCount", {
        get: function () {
            return this._ganttView.scaleCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "areHorizontalBordersEnabled", {
        get: function () {
            return this.ganttViewSettings.areHorizontalBordersEnabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "taskEditController", {
        get: function () {
            return this._ganttView.taskEditController;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "dispatcher", {
        get: function () {
            return this._ganttView.dispatcher;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "taskArea", {
        get: function () {
            return this._taskArea;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "taskAreaManager", {
        get: function () {
            var _a;
            (_a = this._taskAreaManager) !== null && _a !== void 0 ? _a : (this._taskAreaManager = new TaskAreaManager_1.TaskAreaManager(this._ganttView.taskAreaEventsListener, this.taskArea, this.tickSize));
            return this._taskAreaManager;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "taskAreaContainerScrollTop", {
        get: function () {
            return this._taskAreaRender.taskAreaContainer.scrollTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "taskAreaContainerScrollLeft", {
        get: function () {
            return this._taskAreaRender.taskAreaContainer.scrollLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "taskAreaContainer", {
        get: function () {
            return this._taskAreaRender.taskAreaContainer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "isExternalTaskAreaContainer", {
        get: function () {
            return this._taskAreaRender.taskAreaContainer.isExternal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "fakeTaskWrapper", {
        get: function () {
            return this._taskRender.fakeTaskWrapper;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "taskElements", {
        get: function () {
            return this._taskRender.taskElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "selectionElements", {
        get: function () {
            return this._taskRender.selectionElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "scaleElements", {
        get: function () {
            return this._scaleRender.scaleElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "scaleBorders", {
        get: function () {
            return this._scaleRender.scaleBorders;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "timeScaleContainer", {
        get: function () {
            return this._scaleRender.timeScaleContainer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "gridLayoutCalculator", {
        get: function () {
            return this._gridLayoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "etalonScaleItemWidths", {
        get: function () {
            return this.etalonSizeValues.scaleItemWidths[this.viewType];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "elementTextHelperCultureInfo", {
        get: function () {
            return this._elementTextHelper.cultureInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "noWorkingIntervalsToElementsMap", {
        get: function () {
            return this._noWorkingIntervalRender.noWorkingIntervalsToElementsMap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "stripLinesMap", {
        get: function () {
            return this._stripLinesRender.stripLinesMap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "renderedConnectorLines", {
        get: function () {
            return this._connectorLinesRender.renderedConnectorLines;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "allConnectorLines", {
        get: function () {
            var lines = this.gridLayoutCalculator.tileToDependencyMap.reduce(function (acc, tile) { return acc = acc.concat(tile); }, []);
            return lines;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderHelper.prototype, "resourcesElements", {
        get: function () {
            return this._resourceRender.resourcesElements;
        },
        enumerable: false,
        configurable: true
    });
    RenderHelper.prototype.setupHelpers = function (tickSize, range, viewType, viewModel, firstDayOfWeek) {
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        var size = new size_1.Size(this._taskAreaRender.taskAreaContainer.getWidth(), this._taskAreaRender.taskAreaContainer.getHeight());
        var scrollBarHeight = this._taskAreaRender.taskAreaContainer.getHeight() - this._taskAreaRender.taskAreaContainer.getElement().clientHeight;
        this._gridLayoutCalculator.setSettings(size, tickSize, this.etalonSizeValues, range, viewModel, viewType, scrollBarHeight, firstDayOfWeek);
        this._elementTextHelper.setSettings(range.start.getTime(), viewType, viewModel.items);
    };
    RenderHelper.prototype.resetAndUpdate = function (tickSize, range, viewType, viewModel, firstDayOfWeek) {
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        var leftPosition = this.getTaskAreaContainerScrollLeft();
        this.reset();
        this.setupHelpers(tickSize, range, viewType, viewModel, firstDayOfWeek);
        this._scaleRender.createTimeScaleAreas();
        this.setSizeForTaskArea();
        this.setTaskAreaContainerScrollLeft(leftPosition);
    };
    RenderHelper.prototype.createConnectorLines = function () {
        this._gridLayoutCalculator.createTileToConnectorLinesMap();
        this._connectorLinesRender.recreateConnectorLineElements();
    };
    RenderHelper.prototype.getTargetDateByPos = function (leftPos) {
        return this._gridLayoutCalculator.getDateByPos(this._taskAreaRender.taskAreaContainer.scrollLeft + leftPos);
    };
    RenderHelper.prototype.getExternalTaskAreaContainer = function (parent) {
        return this._ganttView.getExternalTaskAreaContainer(parent);
    };
    RenderHelper.prototype.prepareExternalTaskAreaContainer = function (element, info) {
        return this._ganttView.prepareExternalTaskAreaContainer(element, info);
    };
    RenderHelper.prototype.isAllowTaskAreaBorders = function (isVerticalScroll) {
        return this._ganttView.allowTaskAreaBorders(isVerticalScroll);
    };
    RenderHelper.prototype.getHeaderHeight = function () {
        return this._ganttView.getHeaderHeight();
    };
    RenderHelper.prototype.getViewItem = function (index) {
        return this._ganttView.getViewItem(index);
    };
    RenderHelper.prototype.getTask = function (index) {
        return this._ganttView.getTask(index);
    };
    RenderHelper.prototype.hasTaskTemplate = function () {
        return !!this._ganttView.settings.taskContentTemplate;
    };
    RenderHelper.prototype.destroyTemplate = function (container) {
        this._ganttView.destroyTemplate(container);
    };
    RenderHelper.prototype.getTaskDependencies = function (taskInternalId) {
        return this._ganttView.getTaskDependencies(taskInternalId);
    };
    RenderHelper.prototype.getTaskResources = function (key) {
        return this._ganttView.getTaskResources(key);
    };
    RenderHelper.prototype.isHighlightRowElementAllowed = function (index) {
        return this._ganttView.isHighlightRowElementAllowed(index);
    };
    RenderHelper.prototype.updateRenderedConnectorLinesId = function (oldId, newKey) {
        this._connectorLinesRender.updateRenderedConnectorLinesId(oldId, newKey);
    };
    RenderHelper.prototype.recreateConnectorLineElement = function (dependencyId, forceRender) {
        if (forceRender === void 0) { forceRender = false; }
        this._connectorLinesRender.recreateConnectorLineElement(dependencyId, forceRender);
    };
    RenderHelper.prototype.recreateConnectorLineElemensts = function () {
        this._connectorLinesRender.recreateConnectorLineElements();
    };
    RenderHelper.prototype.setMainElementWidth = function (value) {
        this.mainElement.style.width = value + "px";
    };
    RenderHelper.prototype.setMainElementHeight = function (value) {
        this.mainElement.style.height = value + "px";
    };
    RenderHelper.prototype.createResources = function (index) {
        this._resourceRender.createResourcesWrapperElement(index);
        this._resourceRender.createResources(index);
    };
    RenderHelper.prototype.createTimeScale = function () {
        this._scaleRender.createTimeScaleContainer(this.header);
        this._scaleRender.createTimeScaleAreas();
    };
    RenderHelper.prototype.setTimeScaleContainerScrollLeft = function (value) {
        this._scaleRender.setTimeScaleContainerScrollLeft(value);
    };
    RenderHelper.prototype.recreateStripLines = function () {
        if (this._stripLinesRender.recreateStripLines)
            this._stripLinesRender.recreateStripLines();
    };
    RenderHelper.prototype.createTaskArea = function (parent) {
        this._taskArea = this._taskAreaRender.createTaskArea();
        this._taskArea.setAttribute("task-edit-enabled", this.isTaskUpdateAllowed().toString());
        parent.appendChild(this._taskArea);
    };
    RenderHelper.prototype.isTaskUpdateAllowed = function () {
        var settings = this.ganttViewSettings.editing;
        return settings.enabled && settings.allowTaskUpdate;
    };
    RenderHelper.prototype.setSizeForTaskArea = function () {
        var width = this.getTaskAreaWidth();
        var height = this.getTaskAreaHeight();
        this._taskAreaRender.setSizeForTaskArea(width, height);
        this._ganttView.onTaskAreaSizeChanged({ width: width, height: height });
    };
    RenderHelper.prototype.getTaskAreaWidth = function () {
        return this.gridLayoutCalculator.getTotalWidth();
    };
    RenderHelper.prototype.getTaskAreaHeight = function () {
        return this.gridLayoutCalculator.getVerticalGridLineHeight();
    };
    RenderHelper.prototype.getTaskAreaContainerScrollLeft = function () {
        return this._taskAreaRender.taskAreaContainer.scrollLeft;
    };
    RenderHelper.prototype.setTaskAreaContainerScrollLeft = function (leftPosition) {
        this._taskAreaRender.taskAreaContainer.scrollLeft = leftPosition;
    };
    RenderHelper.prototype.setTaskAreaContainerScrollLeftToDate = function (date, addLeftPos) {
        this._taskAreaRender.taskAreaContainer.scrollLeft = Math.round(this._gridLayoutCalculator.getPosByDate(date)) + addLeftPos;
    };
    RenderHelper.prototype.getTaskAreaContainer = function (element) {
        return new TaskAreaContainer_1.TaskAreaContainer(element, this._ganttView);
    };
    RenderHelper.prototype.prepareTaskAreaContainer = function () {
        this._taskAreaRender.prepareTaskAreaContainer();
    };
    RenderHelper.prototype.getTaskAreaContainerWidth = function () {
        return this._taskAreaRender.taskAreaContainer.getWidth();
    };
    RenderHelper.prototype.createHighlightRowElement = function (index) {
        this._taskAreaRender.createHighlightRowElement(index);
    };
    RenderHelper.prototype.getSmallTaskWidth = function (etalonPaddingLeft) {
        return this._taskRender.getSmallTaskWidth(etalonPaddingLeft);
    };
    RenderHelper.prototype.createTaskElement = function (index) {
        this._taskRender.createTaskElement(index, this._ganttView.settings.taskContentTemplate);
    };
    RenderHelper.prototype.removeTaskElement = function (index) {
        this._taskRender.removeTaskElement(index);
    };
    RenderHelper.prototype.recreateTaskElement = function (index) {
        this._taskRender.recreateTaskElement(index);
    };
    RenderHelper.prototype.createDefaultTaskElement = function (index) {
        this._taskRender.createDefaultTaskElement(index);
    };
    RenderHelper.prototype.getScaleItemText = function (index, scaleType) {
        var start = this._gridLayoutCalculator.getScaleItemStart(index, scaleType);
        return this.getScaleItemTextByStart(start, scaleType);
    };
    RenderHelper.prototype.getScaleItemTextByStart = function (start, scaleType) {
        return this._elementTextHelper.getScaleItemText(start, scaleType);
    };
    RenderHelper.prototype.getTextWidth = function (text) {
        return this._elementTextHelper.getTextWidth(text);
    };
    RenderHelper.prototype.getTaskVisibility = function (index) {
        return this.gridLayoutCalculator.isTaskInRenderedRange(index) && this._elementTextHelper.getTaskVisibility(index);
    };
    RenderHelper.prototype.getTaskResourcesVisibility = function (index) {
        return this.getTaskVisibility(index) && !this.gridLayoutCalculator.isTaskCutByRange(index);
    };
    RenderHelper.prototype.getScaleItemTextTemplate = function (viewType) {
        return this._elementTextHelper.getScaleItemTextTemplate(viewType);
    };
    RenderHelper.prototype.getTaskText = function (index) {
        return this._elementTextHelper.getTaskText(index);
    };
    RenderHelper.prototype.taskAreaManagerDetachEvents = function () {
        this.taskAreaManager.detachEvents();
    };
    RenderHelper.prototype.attachEventsOnTask = function (taskIndex) {
        this.taskAreaManager.attachEventsOnTask(this._taskRender.taskElements[taskIndex]);
    };
    RenderHelper.prototype.detachEventsOnTask = function (taskIndex) {
        this.taskAreaManager.detachEventsOnTask(this._taskRender.taskElements[taskIndex]);
    };
    return RenderHelper;
}());
exports.RenderHelper = RenderHelper;


/***/ }),

/***/ 4966:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourseRender = void 0;
var RenderElementUtils_1 = __webpack_require__(658);
var ResourseRender = (function () {
    function ResourseRender(renderHelepr) {
        this._resourcesElements = [];
        this._renderHelper = renderHelepr;
    }
    Object.defineProperty(ResourseRender.prototype, "gridLayoutCalculator", {
        get: function () {
            return this._renderHelper.gridLayoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResourseRender.prototype, "taskArea", {
        get: function () {
            return this._renderHelper.taskArea;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResourseRender.prototype, "resourcesElements", {
        get: function () {
            return this._resourcesElements;
        },
        enumerable: false,
        configurable: true
    });
    ResourseRender.prototype.getViewItem = function (index) {
        return this._renderHelper.getViewItem(index);
    };
    ResourseRender.prototype.getTaskResourcesVisibility = function (index) {
        return this._renderHelper.getTaskResourcesVisibility(index);
    };
    ResourseRender.prototype.createResources = function (index) {
        var viewItem = this.getViewItem(index);
        var resources = viewItem.resources.items;
        for (var i = 0; i < resources.length; i++)
            this.createResourceElement(index, resources[i]);
    };
    ResourseRender.prototype.createResourcesWrapperElement = function (index) {
        var resourcesWrapperElementInfo = this.gridLayoutCalculator.getTaskResourcesWrapperElementInfo(index);
        RenderElementUtils_1.RenderElementUtils.create(resourcesWrapperElementInfo, index, this.taskArea, this.resourcesElements);
        this.resourcesElements[index].style.display = this.getTaskResourcesVisibility(index) ? "" : "none";
    };
    ResourseRender.prototype.createResourceElement = function (index, resource) {
        var resourceElementInfo = this.gridLayoutCalculator.getTaskResourceElementInfo();
        if (resource.color)
            resourceElementInfo.style.backgroundColor = resource.color;
        var resElement = RenderElementUtils_1.RenderElementUtils.create(resourceElementInfo, index, this.resourcesElements[index]);
        resElement.innerText = resource.text;
        this.gridLayoutCalculator.checkAndCorrectElementDisplayByRange(resElement);
    };
    return ResourseRender;
}());
exports.ResourseRender = ResourseRender;


/***/ }),

/***/ 6700:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScaleRender = void 0;
var dom_1 = __webpack_require__(6907);
var Enums_1 = __webpack_require__(2449);
var DateUtils_1 = __webpack_require__(9201);
var ScaleCellPreparedArguments_1 = __webpack_require__(4289);
var RenderElementUtils_1 = __webpack_require__(658);
var ScaleRender = (function () {
    function ScaleRender(renderHelper) {
        this._scaleBorders = [];
        this._scaleElements = [];
        this._renderedScaleItemIndices = [];
        this._timeScaleAreas = new Array();
        this._renderHelper = renderHelper;
    }
    Object.defineProperty(ScaleRender.prototype, "gridLayoutCalculator", {
        get: function () {
            return this._renderHelper.gridLayoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleRender.prototype, "etalonSizeValues", {
        get: function () {
            return this._renderHelper.etalonSizeValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleRender.prototype, "timeScaleContainer", {
        get: function () {
            return this._timeScaleContainer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleRender.prototype, "scaleCount", {
        get: function () {
            return this._renderHelper.scaleCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleRender.prototype, "range", {
        get: function () {
            return this._renderHelper.range;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleRender.prototype, "viewType", {
        get: function () {
            return this._renderHelper.viewType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleRender.prototype, "timeScaleAreas", {
        get: function () {
            return this._timeScaleAreas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleRender.prototype, "scaleElements", {
        get: function () {
            return this._scaleElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleRender.prototype, "scaleBorders", {
        get: function () {
            return this._scaleBorders;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleRender.prototype, "renderedColIndices", {
        get: function () {
            return this._renderHelper.renderedColIndices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScaleRender.prototype, "renderedScaleItemIndices", {
        get: function () {
            return this._renderedScaleItemIndices;
        },
        enumerable: false,
        configurable: true
    });
    ScaleRender.prototype.getScaleItemText = function (index, scaleType) {
        return this._renderHelper.getScaleItemText(index, scaleType);
    };
    ScaleRender.prototype.getTaskAreaWidth = function () {
        return this._renderHelper.getTaskAreaWidth();
    };
    ScaleRender.prototype.reset = function () {
        this._scaleBorders = [];
        this._scaleElements = [];
        this._renderedScaleItemIndices = [];
        this._timeScaleAreas = [];
        this._timeScaleContainer.innerHTML = "";
    };
    ScaleRender.prototype.setTimeScaleContainerScrollLeft = function (value) {
        this._timeScaleContainer.scrollLeft = value;
    };
    ScaleRender.prototype.createTimeScaleContainer = function (header) {
        var timeScaleContainer = document.createElement("DIV");
        timeScaleContainer.className = "dx-gantt-tsac";
        timeScaleContainer.style.height = this.etalonSizeValues.scaleItemHeight * this.scaleCount + "px";
        this._timeScaleContainer = timeScaleContainer;
        header.appendChild(this.timeScaleContainer);
    };
    ScaleRender.prototype.createTimeScaleArea = function () {
        var timeScaleArea = document.createElement("DIV");
        timeScaleArea.className = "dx-gantt-tsa";
        timeScaleArea.style.width = this.getTaskAreaWidth() + "px";
        timeScaleArea.style.height = this.etalonSizeValues.scaleItemHeight + "px";
        this.timeScaleContainer.appendChild(timeScaleArea);
        this.timeScaleAreas.unshift(timeScaleArea);
        return timeScaleArea;
    };
    ScaleRender.prototype.createTimeScaleAreas = function () {
        for (var i = 0; i < this.scaleCount; i++)
            this.createTimeScaleArea();
    };
    ScaleRender.prototype.createScaleElementCore = function (index, info, scaleIndex, dictionary) {
        if (!dictionary[scaleIndex])
            dictionary[scaleIndex] = [];
        return RenderElementUtils_1.RenderElementUtils.create(info, index, this.timeScaleAreas[scaleIndex], dictionary[scaleIndex]);
    };
    ScaleRender.prototype.createScaleElement = function (index, scaleIndex, scaleType, info) {
        var charWidth = this._renderHelper.getTextWidth("a");
        var scaleElement = this.createScaleElementCore(index, info, scaleIndex, this.scaleElements);
        scaleElement.style.lineHeight = this.etalonSizeValues.scaleItemHeight + "px";
        if ((info === null || info === void 0 ? void 0 : info.size.width) > charWidth * 5) {
            var text = this.getScaleItemText(index, scaleType);
            scaleElement.innerText = text;
            if (scaleType === Enums_1.ViewType.Quarter)
                scaleElement.style.padding = "0";
            var style = getComputedStyle(scaleElement);
            var avaliableTextWidth = info.size.width - dom_1.DomUtils.pxToInt(style.paddingLeft) - dom_1.DomUtils.pxToInt(style.paddingRight);
            if (avaliableTextWidth < this._renderHelper.getTextWidth(text))
                scaleElement.title = text;
        }
        return scaleElement;
    };
    ScaleRender.prototype.createScaleBorder = function (index, scaleIndex, scaleType) {
        var info = this.gridLayoutCalculator.getScaleBorderInfo(index, scaleType);
        return this.createScaleElementCore(index, info, scaleIndex, this.scaleBorders);
    };
    ScaleRender.prototype.createScaleElementAndBorder = function (index, scaleIndex, scaleType) {
        var scaleLemenentInfo = this.gridLayoutCalculator.getScaleElementInfo(index, scaleType);
        var scaleElement = this.createScaleElement(index, scaleIndex, scaleType, scaleLemenentInfo);
        var borderElement = this.createScaleBorder(index, scaleIndex, scaleType);
        this.onScaleCellPrepared(scaleType, scaleIndex, scaleElement, borderElement, scaleLemenentInfo.additionalInfo["range"]);
    };
    ScaleRender.prototype.removeScaleElementAndBorder = function (index, scaleIndex) {
        RenderElementUtils_1.RenderElementUtils.remove(null, index, this.timeScaleAreas[scaleIndex], this.scaleElements[scaleIndex]);
        RenderElementUtils_1.RenderElementUtils.remove(null, index, this.timeScaleAreas[scaleIndex], this.scaleBorders[scaleIndex]);
    };
    ScaleRender.prototype.recreateScalesElements = function () {
        this.recreateScaleElements(this.viewType, 0);
        this.recreateScaleElements(DateUtils_1.DateUtils.ViewTypeToScaleMap[this.viewType], 1);
    };
    ScaleRender.prototype.recreateScaleElements = function (scaleType, scaleIndex) {
        var _this = this;
        var newRenderedIndices = this.gridLayoutCalculator.getRenderedScaleItemIndices(scaleType, this.renderedColIndices);
        var renderedIndices = this.renderedScaleItemIndices[scaleType - this.viewType] || [];
        RenderElementUtils_1.RenderElementUtils.recreate(renderedIndices, newRenderedIndices, function (index) { _this.removeScaleElementAndBorder(index, scaleIndex); }, function (index) { _this.createScaleElementAndBorder(index, scaleIndex, scaleType); });
        this.renderedScaleItemIndices[scaleType - this.viewType] = newRenderedIndices;
    };
    Object.defineProperty(ScaleRender.prototype, "dispatcher", {
        get: function () {
            return this._renderHelper.dispatcher;
        },
        enumerable: false,
        configurable: true
    });
    ScaleRender.prototype.onScaleCellPrepared = function (scaleType, scaleIndex, scaleElement, separatorElement, range) {
        var args = new ScaleCellPreparedArguments_1.ScaleCellPreparedArguments({ scaleType: scaleType, scaleIndex: scaleIndex, range: range, scaleElement: scaleElement, separatorElement: separatorElement });
        this.dispatcher.notifyScaleCellPrepared(args);
    };
    return ScaleRender;
}());
exports.ScaleRender = ScaleRender;


/***/ }),

/***/ 8148:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StripLinesRender = void 0;
var RenderElementUtils_1 = __webpack_require__(658);
var StripLinesRender = (function () {
    function StripLinesRender(renderHelepr) {
        this._stripLinesMap = [];
        this._renderedStripLines = [];
        this._renderHelper = renderHelepr;
    }
    Object.defineProperty(StripLinesRender.prototype, "gridLayoutCalculator", {
        get: function () {
            return this._renderHelper.gridLayoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StripLinesRender.prototype, "taskArea", {
        get: function () {
            return this._renderHelper.taskArea;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StripLinesRender.prototype, "stripLinesMap", {
        get: function () {
            return this._stripLinesMap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StripLinesRender.prototype, "renderedStripLines", {
        get: function () {
            return this._renderedStripLines;
        },
        set: function (renderedStripLines) {
            this._renderedStripLines = renderedStripLines;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StripLinesRender.prototype, "stripLines", {
        get: function () {
            return this._renderHelper.stripLines;
        },
        enumerable: false,
        configurable: true
    });
    StripLinesRender.prototype.reset = function () {
        this._renderedStripLines = [];
    };
    StripLinesRender.prototype.recreateStripLines = function () {
        var _this = this;
        var newRenderedStripLines = this.gridLayoutCalculator.getRenderedStripLines(this.stripLines);
        RenderElementUtils_1.RenderElementUtils.recreate(this.renderedStripLines, newRenderedStripLines, function (info) { RenderElementUtils_1.RenderElementUtils.remove(info, null, _this.taskArea, _this.stripLinesMap); }, function (info) { return RenderElementUtils_1.RenderElementUtils.create(info, null, _this.taskArea, _this.stripLinesMap); });
        this.renderedStripLines = newRenderedStripLines;
    };
    return StripLinesRender;
}());
exports.StripLinesRender = StripLinesRender;


/***/ }),

/***/ 2349:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskAreaRender = void 0;
var dom_1 = __webpack_require__(6907);
var RenderElementUtils_1 = __webpack_require__(658);
var TaskAreaRender = (function () {
    function TaskAreaRender(renderHelepr) {
        this._vertTaskAreaBorders = [];
        this._horTaskAreaBorders = [];
        this._isExternalTaskAreaContainer = false;
        this._renderHelper = renderHelepr;
    }
    Object.defineProperty(TaskAreaRender.prototype, "gridLayoutCalculator", {
        get: function () {
            return this._renderHelper.gridLayoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "taskArea", {
        get: function () {
            return this._renderHelper.taskArea;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "mainElement", {
        get: function () {
            return this._renderHelper.mainElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "etalonSizeValues", {
        get: function () {
            return this._renderHelper.etalonSizeValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "scaleCount", {
        get: function () {
            return this._renderHelper.scaleCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "tickSize", {
        get: function () {
            return this._renderHelper.tickSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "taskAreaContainerScrollTop", {
        get: function () {
            return this._renderHelper.ganttViewTaskAreaContainerScrollTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "taskAreaContainerScrollLeft", {
        get: function () {
            return this._renderHelper.ganttTaskAreaContainerScrollLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "areHorizontalBordersEnabled", {
        get: function () {
            return this._renderHelper.areHorizontalBordersEnabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "renderedRowIndices", {
        get: function () {
            return this._renderHelper.renderedRowIndices;
        },
        set: function (renderedRowIndices) {
            this._renderHelper.renderedRowIndices = renderedRowIndices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "renderedColIndices", {
        get: function () {
            return this._renderHelper.renderedColIndices;
        },
        set: function (renderedColIndices) {
            this._renderHelper.renderedColIndices = renderedColIndices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "vertTaskAreaBorders", {
        get: function () {
            return this._vertTaskAreaBorders;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "horTaskAreaBorders", {
        get: function () {
            return this._horTaskAreaBorders;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "hlRowElements", {
        get: function () {
            return this._renderHelper.hlRowElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaRender.prototype, "taskAreaContainer", {
        get: function () {
            return this._taskAreaContainer;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaRender.prototype.getExternalTaskAreaContainer = function (parent) {
        return this._renderHelper.getExternalTaskAreaContainer(parent);
    };
    TaskAreaRender.prototype.prepareExternalTaskAreaContainer = function (element, info) {
        return this._renderHelper.prepareExternalTaskAreaContainer(element, info);
    };
    TaskAreaRender.prototype.isAllowTaskAreaBorders = function (isVerticalScroll) {
        return this._renderHelper.isAllowTaskAreaBorders(isVerticalScroll);
    };
    TaskAreaRender.prototype.getTaskAreaContainerElement = function () {
        return this._taskAreaContainer.getElement();
    };
    TaskAreaRender.prototype.initTaskAreaContainer = function (element) {
        this._renderHelper.createTaskArea(element);
        this._taskAreaContainer = this.getExternalTaskAreaContainer(element);
        this._isExternalTaskAreaContainer = !!this._taskAreaContainer;
        if (this.taskAreaContainer == null)
            this._taskAreaContainer = this._renderHelper.getTaskAreaContainer(element);
    };
    TaskAreaRender.prototype.createTaskElement = function (index) {
        this._renderHelper.createTaskElement(index);
    };
    TaskAreaRender.prototype.removeTaskElement = function (index) {
        this._renderHelper.removeTaskElement(index);
    };
    TaskAreaRender.prototype.reset = function () {
        this._horTaskAreaBorders = [];
        this._vertTaskAreaBorders = [];
    };
    TaskAreaRender.prototype.prepareTaskAreaContainer = function () {
        var className = "dx-gantt-tac-hb";
        var element = this.getTaskAreaContainerElement();
        this.areHorizontalBordersEnabled ?
            dom_1.DomUtils.addClassName(element, className) : dom_1.DomUtils.removeClassName(element, className);
        var marginTop = parseInt(getComputedStyle(element).getPropertyValue("margin-top")) || 0;
        var height = "calc(100% - ".concat(this.etalonSizeValues.scaleItemHeight * this.scaleCount + marginTop, "px)");
        if (this._isExternalTaskAreaContainer)
            this.prepareExternalTaskAreaContainer(element, { height: height });
        else
            element.style.height = height;
    };
    TaskAreaRender.prototype.createTaskAreaContainer = function () {
        var element = document.createElement("DIV");
        element.className = "dx-gantt-tac";
        this.mainElement.appendChild(element);
        this.initTaskAreaContainer(element);
        this.prepareTaskAreaContainer();
    };
    TaskAreaRender.prototype.createTaskAreaBorder = function (index, isVertical) {
        var info = this.gridLayoutCalculator.getTaskAreaBorderInfo(index, isVertical);
        RenderElementUtils_1.RenderElementUtils.create(info, index, this.taskArea, this.getTaskAreaBordersDictionary(isVertical));
    };
    TaskAreaRender.prototype.createTaskArea = function () {
        var taskArea = document.createElement("DIV");
        taskArea.id = "dx-gantt-ta";
        return taskArea;
    };
    TaskAreaRender.prototype.removeTaskAreaBorder = function (index, isVertical) {
        RenderElementUtils_1.RenderElementUtils.remove(null, index, this.taskArea, this.getTaskAreaBordersDictionary(isVertical));
    };
    TaskAreaRender.prototype.createTaskAreaBorderAndTaskElement = function (index, isVerticalScroll) {
        if (this.isAllowTaskAreaBorders(isVerticalScroll))
            this.createTaskAreaBorder(index, !isVerticalScroll);
        if (isVerticalScroll)
            this.createTaskElement(index);
    };
    TaskAreaRender.prototype.removeTaskAreaBorderAndTaskElement = function (index, isVerticalScroll) {
        if (this.isAllowTaskAreaBorders(isVerticalScroll))
            this.removeTaskAreaBorder(index, !isVerticalScroll);
        if (isVerticalScroll)
            this.removeTaskElement(index);
    };
    TaskAreaRender.prototype.recreateTaskAreaBordersAndTaskElements = function (isVertical) {
        var _this = this;
        var scrollPos = isVertical ? this.taskAreaContainerScrollTop : this.taskAreaContainerScrollLeft;
        var newRenderedIndices = this.gridLayoutCalculator.getRenderedRowColumnIndices(scrollPos, isVertical);
        var renderedIndices = isVertical ? this.renderedRowIndices : this.renderedColIndices;
        RenderElementUtils_1.RenderElementUtils.recreate(renderedIndices, newRenderedIndices, function (index) { _this.removeTaskAreaBorderAndTaskElement(index, isVertical); }, function (index) { _this.createTaskAreaBorderAndTaskElement(index, isVertical); });
        if (isVertical)
            this.renderedRowIndices = newRenderedIndices;
        else
            this.renderedColIndices = newRenderedIndices;
        this.gridLayoutCalculator.createTileToConnectorLinesMap();
    };
    TaskAreaRender.prototype.getTaskAreaBordersDictionary = function (isVertical) {
        return isVertical ? this.vertTaskAreaBorders : this.horTaskAreaBorders;
    };
    TaskAreaRender.prototype.setSizeForTaskArea = function (width, height) {
        this.taskArea.style.width = width + "px";
        this.taskArea.style.height = height + "px";
    };
    TaskAreaRender.prototype.createHighlightRowElement = function (index) {
        var hlRowInfo = this.gridLayoutCalculator.getHighlightRowInfo(index);
        RenderElementUtils_1.RenderElementUtils.create(hlRowInfo, index, this.taskArea, this.hlRowElements);
    };
    return TaskAreaRender;
}());
exports.TaskAreaRender = TaskAreaRender;


/***/ }),

/***/ 2290:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskRender = void 0;
var dom_1 = __webpack_require__(6907);
var Enums_1 = __webpack_require__(2449);
var CustomTaskRender_1 = __webpack_require__(1419);
var RenderElementUtils_1 = __webpack_require__(658);
var TaskRender = (function () {
    function TaskRender(renderHelper) {
        this._selectionElements = [];
        this._taskElements = [];
        this._renderHelper = renderHelper;
        this.customTaskRender = new CustomTaskRender_1.CustomTaskRender(renderHelper, this);
    }
    Object.defineProperty(TaskRender.prototype, "gridLayoutCalculator", {
        get: function () {
            return this._renderHelper.gridLayoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "taskElements", {
        get: function () {
            return this._taskElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "selectionElements", {
        get: function () {
            return this._selectionElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "taskArea", {
        get: function () {
            return this._renderHelper.taskArea;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "isExternalTaskAreaContainer", {
        get: function () {
            return this._renderHelper.isExternalTaskAreaContainer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "resourcesElements", {
        get: function () {
            return this._renderHelper.resourcesElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "hlRowElements", {
        get: function () {
            return this._renderHelper.hlRowElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "renderedRowIndices", {
        get: function () {
            return this._renderHelper.renderedRowIndices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "taskTitlePosition", {
        get: function () {
            return this._renderHelper.taskTitlePosition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "showResources", {
        get: function () {
            return this._renderHelper.showResources;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "areHorizontalBordersEnabled", {
        get: function () {
            return this._renderHelper.areHorizontalBordersEnabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "taskTextHeightKey", {
        get: function () {
            return this._renderHelper.taskTextHeightKey;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "viewModelItems", {
        get: function () {
            return this._renderHelper.viewModelItems;
        },
        enumerable: false,
        configurable: true
    });
    TaskRender.prototype.isHighlightRowElementAllowed = function (index) {
        return this._renderHelper.isHighlightRowElementAllowed(index);
    };
    TaskRender.prototype.getTaskVisibility = function (index) {
        return this._renderHelper.getTaskVisibility(index);
    };
    TaskRender.prototype.getTaskText = function (index) {
        return this._renderHelper.getTaskText(index);
    };
    Object.defineProperty(TaskRender.prototype, "invalidTaskDependencies", {
        get: function () {
            return this._renderHelper.invalidTaskDependencies;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskRender.prototype, "fakeTaskWrapper", {
        get: function () {
            var _a;
            (_a = this._fakeTaskWrapper) !== null && _a !== void 0 ? _a : (this._fakeTaskWrapper = this.createFakeTaskWrapper());
            return this._fakeTaskWrapper;
        },
        enumerable: false,
        configurable: true
    });
    TaskRender.prototype.getViewItem = function (index) {
        return this._renderHelper.getViewItem(index);
    };
    TaskRender.prototype.getTask = function (index) {
        return this._renderHelper.getTask(index);
    };
    TaskRender.prototype.createHighlightRowElement = function (index) {
        this._renderHelper.createHighlightRowElement(index);
    };
    TaskRender.prototype.getTaskDependencies = function (taskInternalId) {
        return this._renderHelper.getTaskDependencies(taskInternalId);
    };
    TaskRender.prototype.addInvalidTaskDependencies = function (taskDependencies) {
        this._renderHelper.invalidTaskDependencies = this._renderHelper.invalidTaskDependencies.concat(taskDependencies);
    };
    TaskRender.prototype.removeInvalidTaskDependencies = function (taskId) {
        this._renderHelper.invalidTaskDependencies = this._renderHelper.invalidTaskDependencies.filter(function (d) { return d.predecessorId != taskId || d.successorId != taskId; });
    };
    TaskRender.prototype.createResources = function (index) {
        if (this.showResources)
            this._renderHelper.createResources(index);
    };
    TaskRender.prototype.attachEventsOnTask = function (taskIndex) {
        this._renderHelper.attachEventsOnTask(taskIndex);
    };
    TaskRender.prototype.detachEventsOnTask = function (taskIndex) {
        this._renderHelper.detachEventsOnTask(taskIndex);
    };
    TaskRender.prototype.recreateConnectorLineElement = function (dependencyId, forceRender) {
        if (forceRender === void 0) { forceRender = false; }
        this._renderHelper.recreateConnectorLineElement(dependencyId, forceRender);
    };
    TaskRender.prototype.renderTaskElement = function (index) {
        this._renderHelper.createTaskElement(index);
    };
    TaskRender.prototype.reset = function () {
        var _this = this;
        this._taskElements.forEach(function (el, i) { return _this.removeTaskElement(i); });
        this._selectionElements = [];
        this._taskElements = [];
    };
    TaskRender.prototype.createTaskWrapperElement = function (index) {
        var taskWrapperInfo = this.gridLayoutCalculator.getTaskWrapperElementInfo(index);
        RenderElementUtils_1.RenderElementUtils.create(taskWrapperInfo, index, this.taskArea, this.taskElements);
        this.taskElements[index].style.display = this.getTaskVisibility(index) ? "" : "none";
    };
    TaskRender.prototype.createTaskElement = function (index, taskTemplateFunction) {
        var viewItem = this.getViewItem(index);
        if (taskTemplateFunction)
            this.customTaskRender.createCustomTaskElement(index, taskTemplateFunction);
        if (!viewItem.task.isValid() || !viewItem.visible) {
            var taskDependencies = this.getTaskDependencies(viewItem.task.internalId);
            this.addInvalidTaskDependencies(taskDependencies);
            if (viewItem.selected)
                this.createTaskSelectionElement(index);
            return;
        }
        if (!viewItem.isCustom)
            this.createDefaultTaskElement(index);
    };
    TaskRender.prototype.createTaskVisualElement = function (index) {
        var taskElementInfo = this.gridLayoutCalculator.getTaskElementInfo(index, this.taskTitlePosition !== Enums_1.TaskTitlePosition.Inside);
        var taskElement = RenderElementUtils_1.RenderElementUtils.create(taskElementInfo, index, this.taskElements[index]);
        this.attachEventsOnTask(index);
        return taskElement;
    };
    TaskRender.prototype.createDefaultTaskElement = function (index) {
        var viewItem = this.getViewItem(index);
        if (this.isHighlightRowElementAllowed(index))
            this.createHighlightRowElement(index);
        if (viewItem.selected)
            this.createTaskSelectionElement(index);
        this.createTaskWrapperElement(index);
        if (this.taskTitlePosition === Enums_1.TaskTitlePosition.Outside)
            this.createTaskTextElement(index, this.taskElements[index]);
        var taskVisualElement = this.createTaskVisualElement(index);
        if (!viewItem.task.isMilestone()) {
            if (this.taskTitlePosition === Enums_1.TaskTitlePosition.Inside)
                this.createTaskTextElement(index, taskVisualElement);
            this.createTaskProgressElement(index, taskVisualElement);
        }
        this.createResources(index);
    };
    TaskRender.prototype.removeTaskElement = function (index) {
        var task = this.getTask(index);
        if (task)
            this.removeInvalidTaskDependencies(task.id);
        this.detachEventsOnTask(index);
        if (this._renderHelper.hasTaskTemplate()) {
            var taskWrapper = this.taskElements[index];
            var taskTemplateContainer = taskWrapper === null || taskWrapper === void 0 ? void 0 : taskWrapper.firstElementChild;
            if (taskTemplateContainer) {
                this._renderHelper.destroyTemplate(taskTemplateContainer);
                taskWrapper.removeChild(taskTemplateContainer);
            }
        }
        RenderElementUtils_1.RenderElementUtils.remove(null, index, this.taskArea, this.taskElements);
        RenderElementUtils_1.RenderElementUtils.remove(null, index, this.taskArea, this.resourcesElements);
        RenderElementUtils_1.RenderElementUtils.remove(null, index, this.taskArea, this.selectionElements);
        if (this.isHighlightRowElementAllowed(index))
            RenderElementUtils_1.RenderElementUtils.remove(null, index, this.taskArea, this.hlRowElements);
        this.gridLayoutCalculator.resetTaskInfo(index);
    };
    TaskRender.prototype.recreateTaskElement = function (index) {
        var _this = this;
        var isVisible = this.renderedRowIndices.filter(function (r) { return r === index; }).length > 0;
        var task = this.getTask(index);
        if (!task)
            return;
        if (isVisible) {
            this.removeTaskElement(index);
            this.renderTaskElement(index);
        }
        var dependencies = this.getTaskDependencies(task.internalId);
        if (dependencies.length)
            dependencies.forEach(function (d) { return _this.recreateConnectorLineElement(d.internalId, true); });
    };
    TaskRender.prototype.createFakeTaskWrapper = function () {
        var _a, _b;
        var index = (_b = (_a = this.viewModelItems.filter(function (v) { return v.task && !v.task.isMilestone; })[0]) === null || _a === void 0 ? void 0 : _a.visibleIndex) !== null && _b !== void 0 ? _b : 0;
        var calc = this.gridLayoutCalculator;
        var fakeWrapper = RenderElementUtils_1.RenderElementUtils.create(calc.getTaskWrapperElementInfo(index), null, this.taskArea);
        var taskVisualElement = RenderElementUtils_1.RenderElementUtils.create(calc.getTaskElementInfo(index), null, fakeWrapper);
        this.createTaskTextElement(index, taskVisualElement);
        this.createTaskProgressElement(index, taskVisualElement);
        fakeWrapper.style.display = "none";
        return fakeWrapper;
    };
    TaskRender.prototype.createTaskProgressElement = function (index, parent) {
        var taskProgressInfo = this.gridLayoutCalculator.getTaskProgressElementInfo(index);
        RenderElementUtils_1.RenderElementUtils.create(taskProgressInfo, index, parent);
    };
    TaskRender.prototype.getTextWidth = function (text) {
        return this._renderHelper.getTextWidth(text);
    };
    Object.defineProperty(TaskRender.prototype, "minTextWidth", {
        get: function () {
            var _a;
            (_a = this._minTextWidth) !== null && _a !== void 0 ? _a : (this._minTextWidth = 5 * this.getTextWidth("a"));
            return this._minTextWidth;
        },
        enumerable: false,
        configurable: true
    });
    TaskRender.prototype.createTaskTextElement = function (index, parent) {
        var _a;
        var _b;
        var taskTextInfo = this.gridLayoutCalculator.getTaskTextElementInfo(index, this.taskTitlePosition === Enums_1.TaskTitlePosition.Inside);
        if (taskTextInfo.additionalInfo["hidden"])
            return;
        var taskTextElement = RenderElementUtils_1.RenderElementUtils.create(taskTextInfo, index, parent);
        var text = this.getTaskText(index);
        if (this.taskTitlePosition === Enums_1.TaskTitlePosition.Outside && taskTextInfo.size.width > 0) {
            var style = getComputedStyle(taskTextElement);
            var avaliableTextWidth = taskTextInfo.size.width - dom_1.DomUtils.pxToInt(style.paddingLeft);
            if (avaliableTextWidth >= this.minTextWidth) {
                var rightPadding = dom_1.DomUtils.pxToInt(style.paddingRight);
                var textWidth = text ? this.getTextWidth(text) : 0;
                if (rightPadding && textWidth > avaliableTextWidth - rightPadding) {
                    rightPadding = Math.min(TaskRender.minTitleOutRightPadding, avaliableTextWidth - this.minTextWidth);
                    taskTextElement.style.paddingRight = rightPadding + "px";
                }
                if (textWidth > avaliableTextWidth - rightPadding) {
                    taskTextElement.style.overflowX = "hidden";
                    taskTextElement.style.textOverflow = "ellipsis";
                }
            }
            else
                taskTextElement.style.display = "none";
        }
        if (!text) {
            (_a = this[_b = this.taskTextHeightKey]) !== null && _a !== void 0 ? _a : (this[_b] = this.getTaskTextHeight(taskTextElement));
            taskTextElement.style.height = this[this.taskTextHeightKey];
        }
        taskTextElement.innerText = text;
    };
    TaskRender.prototype.createTaskSelectionElement = function (index) {
        var selectionInfo = this.gridLayoutCalculator.getSelectionElementInfo(index);
        if (this.isExternalTaskAreaContainer && !this.areHorizontalBordersEnabled)
            selectionInfo.size.height++;
        RenderElementUtils_1.RenderElementUtils.create(selectionInfo, index, this.taskArea, this.selectionElements);
    };
    TaskRender.prototype.getTaskTextHeight = function (textElement) {
        textElement.innerText = "WWW";
        var height = getComputedStyle(textElement).height;
        textElement.innerText = "";
        return height;
    };
    TaskRender.prototype.getSmallTaskWidth = function (etalonPaddingLeft) {
        var result = 0;
        if (etalonPaddingLeft != null && etalonPaddingLeft !== "") {
            var indexOfRem = etalonPaddingLeft.indexOf("rem");
            if (indexOfRem > -1)
                try {
                    var remSize = parseFloat(etalonPaddingLeft.substr(0, indexOfRem));
                    result = remSize * parseFloat(getComputedStyle(document.documentElement).fontSize);
                }
                catch (e) { }
            else
                result = dom_1.DomUtils.pxToInt(etalonPaddingLeft);
        }
        return result * 2;
    };
    TaskRender.minTitleOutRightPadding = 5;
    return TaskRender;
}());
exports.TaskRender = TaskRender;


/***/ }),

/***/ 2990:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditingSettings = void 0;
var common_1 = __webpack_require__(2491);
var EditingSettings = (function () {
    function EditingSettings() {
        this.enabled = false;
        this.allowDependencyDelete = true;
        this.allowDependencyInsert = true;
        this.allowTaskDelete = true;
        this.allowTaskInsert = true;
        this.allowTaskUpdate = true;
        this.allowResourceDelete = true;
        this.allowResourceInsert = true;
        this.allowResourceUpdate = true;
        this.allowTaskResourceUpdate = true;
        this.taskHoverDelay = 0;
    }
    EditingSettings.parse = function (settings) {
        var result = new EditingSettings();
        if (settings) {
            if ((0, common_1.isDefined)(settings.enabled))
                result.enabled = settings.enabled;
            if ((0, common_1.isDefined)(settings.allowDependencyDelete))
                result.allowDependencyDelete = settings.allowDependencyDelete;
            if ((0, common_1.isDefined)(settings.allowDependencyInsert))
                result.allowDependencyInsert = settings.allowDependencyInsert;
            if ((0, common_1.isDefined)(settings.allowTaskDelete))
                result.allowTaskDelete = settings.allowTaskDelete;
            if ((0, common_1.isDefined)(settings.allowTaskInsert))
                result.allowTaskInsert = settings.allowTaskInsert;
            if ((0, common_1.isDefined)(settings.allowTaskUpdate))
                result.allowTaskUpdate = settings.allowTaskUpdate;
            if ((0, common_1.isDefined)(settings.allowResourceDelete))
                result.allowResourceDelete = settings.allowResourceDelete;
            if ((0, common_1.isDefined)(settings.allowResourceInsert))
                result.allowResourceInsert = settings.allowResourceInsert;
            if ((0, common_1.isDefined)(settings.allowResourceUpdate))
                result.allowResourceUpdate = settings.allowResourceUpdate;
            if ((0, common_1.isDefined)(settings.allowTaskResourceUpdate))
                result.allowTaskResourceUpdate = settings.allowTaskResourceUpdate;
            if ((0, common_1.isDefined)(settings.taskHoverDelay))
                result.taskHoverDelay = settings.taskHoverDelay;
        }
        return result;
    };
    EditingSettings.prototype.equal = function (settings) {
        var result = true;
        result = result && this.enabled === settings.enabled;
        result = result && this.allowDependencyDelete === settings.allowDependencyDelete;
        result = result && this.allowDependencyInsert === settings.allowDependencyInsert;
        result = result && this.allowTaskDelete === settings.allowTaskDelete;
        result = result && this.allowTaskInsert === settings.allowTaskInsert;
        result = result && this.allowTaskUpdate === settings.allowTaskUpdate;
        result = result && this.allowResourceDelete === settings.allowResourceDelete;
        result = result && this.allowResourceInsert === settings.allowResourceInsert;
        result = result && this.allowResourceUpdate === settings.allowResourceUpdate;
        result = result && this.allowTaskResourceUpdate === settings.allowTaskResourceUpdate;
        return result;
    };
    return EditingSettings;
}());
exports.EditingSettings = EditingSettings;


/***/ }),

/***/ 9954:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FullScreenHelperSettings = void 0;
var common_1 = __webpack_require__(2491);
var FullScreenHelperSettings = (function () {
    function FullScreenHelperSettings() {
    }
    FullScreenHelperSettings.parse = function (settings) {
        var result = new FullScreenHelperSettings();
        if (settings) {
            if ((0, common_1.isDefined)(settings.getMainElement))
                result.getMainElement = settings.getMainElement;
            if ((0, common_1.isDefined)(settings.adjustControl))
                result.adjustControl = settings.adjustControl;
        }
        return result;
    };
    return FullScreenHelperSettings;
}());
exports.FullScreenHelperSettings = FullScreenHelperSettings;


/***/ }),

/***/ 9640:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskEditSettings = void 0;
var tslib_1 = __webpack_require__(655);
var common_1 = __webpack_require__(2491);
var TooltipSettings_1 = __webpack_require__(9080);
var TaskEditSettings = (function (_super) {
    tslib_1.__extends(TaskEditSettings, _super);
    function TaskEditSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskEditSettings.parse = function (settings) {
        var result = new TaskEditSettings();
        if (settings) {
            if ((0, common_1.isDefined)(settings.getCommandManager))
                result.getCommandManager = settings.getCommandManager;
            if ((0, common_1.isDefined)(settings.getViewModel))
                result.getViewModel = settings.getViewModel;
            if ((0, common_1.isDefined)(settings.getGanttSettings))
                result.getGanttSettings = settings.getGanttSettings;
            if ((0, common_1.isDefined)(settings.getRenderHelper))
                result.getRenderHelper = settings.getRenderHelper;
            if ((0, common_1.isDefined)(settings.destroyTemplate))
                result.destroyTemplate = settings.destroyTemplate;
            if ((0, common_1.isDefined)(settings.formatDate))
                result.formatDate = settings.formatDate;
            if ((0, common_1.isDefined)(settings.getModelManipulator))
                result.getModelManipulator = settings.getModelManipulator;
            if ((0, common_1.isDefined)(settings.getValidationController))
                result.getValidationController = settings.getValidationController;
        }
        return result;
    };
    return TaskEditSettings;
}(TooltipSettings_1.TooltipSettings));
exports.TaskEditSettings = TaskEditSettings;


/***/ }),

/***/ 9080:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TooltipSettings = void 0;
var common_1 = __webpack_require__(2491);
var TooltipSettings = (function () {
    function TooltipSettings() {
    }
    TooltipSettings.parse = function (settings) {
        var result = new TooltipSettings();
        if (settings) {
            if ((0, common_1.isDefined)(settings.getHeaderHeight))
                result.getHeaderHeight = settings.getHeaderHeight;
            if ((0, common_1.isDefined)(settings.getTaskTooltipContentTemplate))
                result.getTaskTooltipContentTemplate = settings.getTaskTooltipContentTemplate;
            if ((0, common_1.isDefined)(settings.getTaskProgressTooltipContentTemplate))
                result.getTaskProgressTooltipContentTemplate = settings.getTaskProgressTooltipContentTemplate;
            if ((0, common_1.isDefined)(settings.getTaskTimeTooltipContentTemplate))
                result.getTaskTimeTooltipContentTemplate = settings.getTaskTimeTooltipContentTemplate;
            if ((0, common_1.isDefined)(settings.destroyTemplate))
                result.destroyTemplate = settings.destroyTemplate;
            if ((0, common_1.isDefined)(settings.formatDate))
                result.formatDate = settings.formatDate;
            if ((0, common_1.isDefined)(settings.getTaskAreaContainer))
                result.getTaskAreaContainer = settings.getTaskAreaContainer;
        }
        return result;
    };
    return TooltipSettings;
}());
exports.TooltipSettings = TooltipSettings;


/***/ }),

/***/ 5846:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationControllerSettings = void 0;
var common_1 = __webpack_require__(2491);
var ValidationControllerSettings = (function () {
    function ValidationControllerSettings() {
    }
    ValidationControllerSettings.parse = function (settings) {
        var result = new ValidationControllerSettings();
        if (settings) {
            if ((0, common_1.isDefined)(settings.getViewModel))
                result.getViewModel = settings.getViewModel;
            if ((0, common_1.isDefined)(settings.getHistory))
                result.getHistory = settings.getHistory;
            if ((0, common_1.isDefined)(settings.getModelManipulator))
                result.getModelManipulator = settings.getModelManipulator;
            if ((0, common_1.isDefined)(settings.getRange))
                result.getRange = settings.getRange;
            if ((0, common_1.isDefined)(settings.getValidationSettings))
                result.getValidationSettings = settings.getValidationSettings;
            if ((0, common_1.isDefined)(settings.updateOwnerInAutoParentMode))
                result.updateOwnerInAutoParentMode = settings.updateOwnerInAutoParentMode;
            if ((0, common_1.isDefined)(settings.getIsValidateDependenciesRequired))
                result.getIsValidateDependenciesRequired = settings.getIsValidateDependenciesRequired;
        }
        return result;
    };
    return ValidationControllerSettings;
}());
exports.ValidationControllerSettings = ValidationControllerSettings;


/***/ }),

/***/ 5351:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Settings = void 0;
var common_1 = __webpack_require__(2491);
var DateTimeUtils_1 = __webpack_require__(7880);
var Enums_1 = __webpack_require__(2449);
var EditingSettings_1 = __webpack_require__(2990);
var StripLineSettings_1 = __webpack_require__(9057);
var ValidationSettings_1 = __webpack_require__(2762);
var ViewTypeRange_1 = __webpack_require__(9820);
var Settings = (function () {
    function Settings() {
        this.viewType = undefined;
        this.taskTitlePosition = Enums_1.TaskTitlePosition.Inside;
        this.showResources = true;
        this.showDependencies = true;
        this.areHorizontalBordersEnabled = true;
        this.areVerticalBordersEnabled = true;
        this.areAlternateRowsEnabled = true;
        this.allowSelectTask = true;
        this.firstDayOfWeek = 0;
        this.editing = new EditingSettings_1.EditingSettings();
        this.validation = new ValidationSettings_1.ValidationSettings();
        this.stripLines = new StripLineSettings_1.StripLineSettings();
        this.viewTypeRange = new ViewTypeRange_1.ViewTypeRangeSettings();
    }
    Settings.parse = function (settings) {
        var result = new Settings();
        if (settings) {
            if ((0, common_1.isDefined)(settings.viewType))
                result.viewType = settings.viewType;
            if ((0, common_1.isDefined)(settings.taskTitlePosition))
                result.taskTitlePosition = settings.taskTitlePosition;
            if ((0, common_1.isDefined)(settings.showResources))
                result.showResources = settings.showResources;
            if ((0, common_1.isDefined)(settings.showDependencies))
                result.showDependencies = settings.showDependencies;
            if ((0, common_1.isDefined)(settings.areHorizontalBordersEnabled))
                result.areHorizontalBordersEnabled = settings.areHorizontalBordersEnabled;
            if ((0, common_1.isDefined)(settings.areVerticalBordersEnabled))
                result.areHorizontalBordersEnabled = settings.areHorizontalBordersEnabled;
            if ((0, common_1.isDefined)(settings.areAlternateRowsEnabled))
                result.areAlternateRowsEnabled = settings.areAlternateRowsEnabled;
            if ((0, common_1.isDefined)(settings.allowSelectTask))
                result.allowSelectTask = settings.allowSelectTask;
            if ((0, common_1.isDefined)(settings.firstDayOfWeek))
                result.firstDayOfWeek = settings.firstDayOfWeek;
            if ((0, common_1.isDefined)(settings.startDateRange))
                result.startDateRange = new Date(settings.startDateRange);
            if ((0, common_1.isDefined)(settings.endDateRange))
                result.endDateRange = new Date(settings.endDateRange);
            if ((0, common_1.isDefined)(settings.editing))
                result.editing = EditingSettings_1.EditingSettings.parse(settings.editing);
            if ((0, common_1.isDefined)(settings.validation))
                result.validation = ValidationSettings_1.ValidationSettings.parse(settings.validation);
            if ((0, common_1.isDefined)(settings.stripLines))
                result.stripLines = StripLineSettings_1.StripLineSettings.parse(settings.stripLines);
            if ((0, common_1.isDefined)(settings.viewTypeRange))
                result.viewTypeRange = ViewTypeRange_1.ViewTypeRangeSettings.parse(settings.viewTypeRange);
            if ((0, common_1.isDefined)(settings.taskTooltipContentTemplate))
                result.taskTooltipContentTemplate = settings.taskTooltipContentTemplate;
            if ((0, common_1.isDefined)(settings.taskProgressTooltipContentTemplate))
                result.taskProgressTooltipContentTemplate = settings.taskProgressTooltipContentTemplate;
            if ((0, common_1.isDefined)(settings.taskTimeTooltipContentTemplate))
                result.taskTimeTooltipContentTemplate = settings.taskTimeTooltipContentTemplate;
            if ((0, common_1.isDefined)(settings.taskContentTemplate))
                result.taskContentTemplate = settings.taskContentTemplate;
            if ((0, common_1.isDefined)(settings.cultureInfo))
                result.cultureInfo = settings.cultureInfo;
        }
        return result;
    };
    Settings.prototype.equal = function (settings) {
        var result = true;
        result = result && this.viewType === settings.viewType;
        result = result && this.taskTitlePosition === settings.taskTitlePosition;
        result = result && this.showResources === settings.showResources;
        result = result && this.showDependencies === settings.showDependencies;
        result = result && this.areHorizontalBordersEnabled === settings.areHorizontalBordersEnabled;
        result = result && this.areAlternateRowsEnabled === settings.areAlternateRowsEnabled;
        result = result && this.allowSelectTask === settings.allowSelectTask;
        result = result && this.editing.equal(settings.editing);
        result = result && this.validation.equal(settings.validation);
        result = result && this.stripLines.equal(settings.stripLines);
        result = result && DateTimeUtils_1.DateTimeUtils.areDatesEqual(this.startDateRange, settings.startDateRange);
        result = result && DateTimeUtils_1.DateTimeUtils.areDatesEqual(this.endDateRange, settings.endDateRange);
        return result;
    };
    return Settings;
}());
exports.Settings = Settings;


/***/ }),

/***/ 1442:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StripLine = void 0;
var common_1 = __webpack_require__(2491);
var StripLine = (function () {
    function StripLine(start, end, title, cssClass, isCurrent) {
        this.isCurrent = false;
        this.start = start;
        this.end = end;
        this.title = title;
        this.cssClass = cssClass;
        this.isCurrent = isCurrent;
    }
    StripLine.parse = function (settings) {
        var result = new StripLine();
        if (settings) {
            if ((0, common_1.isDefined)(settings.start))
                result.start = settings.start;
            if ((0, common_1.isDefined)(settings.end))
                result.end = settings.end;
            if ((0, common_1.isDefined)(settings.title))
                result.title = settings.title;
            if ((0, common_1.isDefined)(settings.cssClass))
                result.cssClass = settings.cssClass;
        }
        return result;
    };
    StripLine.prototype.clone = function () {
        return new StripLine(this.start, this.end, this.title, this.cssClass, this.isCurrent);
    };
    StripLine.prototype.equal = function (stripLine) {
        var result = true;
        result = result && this.start == stripLine.start;
        result = result && this.end == stripLine.end;
        result = result && this.title == stripLine.title;
        result = result && this.cssClass == stripLine.cssClass;
        return result;
    };
    return StripLine;
}());
exports.StripLine = StripLine;


/***/ }),

/***/ 9057:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StripLineSettings = void 0;
var common_1 = __webpack_require__(2491);
var StripLine_1 = __webpack_require__(1442);
var StripLineSettings = (function () {
    function StripLineSettings() {
        this.showCurrentTime = false;
        this.currentTimeUpdateInterval = 60000;
        this.stripLines = [];
    }
    StripLineSettings.parse = function (settings) {
        var result = new StripLineSettings();
        if (settings) {
            if ((0, common_1.isDefined)(settings.showCurrentTime))
                result.showCurrentTime = settings.showCurrentTime;
            if ((0, common_1.isDefined)(settings.currentTimeUpdateInterval))
                result.currentTimeUpdateInterval = settings.currentTimeUpdateInterval;
            if ((0, common_1.isDefined)(settings.currentTimeTitle))
                result.currentTimeTitle = settings.currentTimeTitle;
            if ((0, common_1.isDefined)(settings.currentTimeCssClass))
                result.currentTimeCssClass = settings.currentTimeCssClass;
            if ((0, common_1.isDefined)(settings.stripLines))
                for (var i = 0; i < settings.stripLines.length; i++)
                    result.stripLines.push(StripLine_1.StripLine.parse(settings.stripLines[i]));
        }
        return result;
    };
    StripLineSettings.prototype.equal = function (settings) {
        var result = true;
        result = result && this.showCurrentTime == settings.showCurrentTime;
        result = result && this.currentTimeUpdateInterval == settings.currentTimeUpdateInterval;
        result = result && this.currentTimeTitle == settings.currentTimeTitle;
        result = result && this.currentTimeCssClass == settings.currentTimeCssClass;
        result = result && this.stripLines.length === settings.stripLines.length;
        if (result)
            for (var i = 0; i < settings.stripLines.length; i++)
                result = result && this.stripLines[i].equal(settings.stripLines[i]);
        return result;
    };
    return StripLineSettings;
}());
exports.StripLineSettings = StripLineSettings;


/***/ }),

/***/ 2762:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationSettings = void 0;
var common_1 = __webpack_require__(2491);
var ValidationSettings = (function () {
    function ValidationSettings() {
        this.validateDependencies = false;
        this.autoUpdateParentTasks = false;
        this.enablePredecessorGap = false;
    }
    ValidationSettings.parse = function (settings) {
        var result = new ValidationSettings();
        if (settings) {
            if ((0, common_1.isDefined)(settings.validateDependencies))
                result.validateDependencies = settings.validateDependencies;
            if ((0, common_1.isDefined)(settings.autoUpdateParentTasks))
                result.autoUpdateParentTasks = settings.autoUpdateParentTasks;
            if ((0, common_1.isDefined)(settings.enablePredecessorGap))
                result.enablePredecessorGap = settings.enablePredecessorGap;
        }
        return result;
    };
    ValidationSettings.prototype.equal = function (settings) {
        var result = true;
        result = result && this.validateDependencies === settings.validateDependencies;
        result = result && this.autoUpdateParentTasks === settings.autoUpdateParentTasks;
        result = result && this.enablePredecessorGap === settings.enablePredecessorGap;
        return result;
    };
    return ValidationSettings;
}());
exports.ValidationSettings = ValidationSettings;


/***/ }),

/***/ 9820:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViewTypeRangeSettings = void 0;
var common_1 = __webpack_require__(2491);
var Enums_1 = __webpack_require__(2449);
var ViewTypeRangeSettings = (function () {
    function ViewTypeRangeSettings() {
        this.min = Enums_1.ViewType.TenMinutes;
        this.max = Enums_1.ViewType.Years;
    }
    ViewTypeRangeSettings.parse = function (settings) {
        var result = new ViewTypeRangeSettings();
        if (settings) {
            if ((0, common_1.isDefined)(settings.min))
                result.min = settings.min;
            if ((0, common_1.isDefined)(settings.max))
                result.max = settings.max;
        }
        return result;
    };
    ViewTypeRangeSettings.prototype.equal = function (settings) {
        var result = true;
        result = result && this.min === settings.min;
        result = result && this.max === settings.max;
        return result;
    };
    return ViewTypeRangeSettings;
}());
exports.ViewTypeRangeSettings = ViewTypeRangeSettings;


/***/ }),

/***/ 9201:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateUtils = void 0;
var Enums_1 = __webpack_require__(2449);
var DateUtils = (function () {
    function DateUtils() {
    }
    DateUtils.getDaysInQuarter = function (start) {
        var month = Math.floor(start.getMonth() / 3) * 3;
        var quarterMonths = [month, month + 1, month + 2];
        return quarterMonths.reduce(function (acc, m) { return acc += DateUtils.getDaysInMonth(m, start.getFullYear()); }, 0);
    };
    DateUtils.getDaysInMonth = function (month, year) {
        var d = new Date(year, month + 1, 0);
        return d.getDate();
    };
    DateUtils.getOffsetInMonths = function (start, end) {
        return (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
    };
    DateUtils.getOffsetInQuarters = function (start, end) {
        return (end.getFullYear() - start.getFullYear()) * 4 + Math.floor(end.getMonth() / 3) - Math.floor(start.getMonth() / 3);
    };
    DateUtils.getNearestScaleTickDate = function (date, range, tickTimeSpan, viewType) {
        var result = new Date();
        var rangeStartTime = range.start.getTime();
        var rangeEndTime = range.end.getTime();
        result.setTime(date.getTime());
        if (date.getTime() < rangeStartTime)
            result.setTime(rangeStartTime);
        else if (date.getTime() > rangeEndTime)
            result.setTime(rangeEndTime);
        else if (this.needCorrectDate(date, rangeStartTime, tickTimeSpan, viewType)) {
            var nearestLeftTickTime = this.getNearestLeftTickTime(date, rangeStartTime, tickTimeSpan, viewType);
            var nearestRightTickTime = this.getNextTickTime(nearestLeftTickTime, tickTimeSpan, viewType);
            if (Math.abs(date.getTime() - nearestLeftTickTime) > Math.abs(date.getTime() - nearestRightTickTime))
                result.setTime(nearestRightTickTime);
            else
                result.setTime(nearestLeftTickTime);
        }
        return result;
    };
    DateUtils.needCorrectDate = function (date, rangeStartTime, tickTimeSpan, viewType) {
        if (viewType == Enums_1.ViewType.Months)
            return date.getTime() !== new Date(date.getFullYear(), date.getMonth(), 1).getTime();
        return (date.getTime() - rangeStartTime) % tickTimeSpan !== 0;
    };
    DateUtils.getNearestLeftTickTime = function (date, rangeStartTime, tickTimeSpan, viewType) {
        if (viewType == Enums_1.ViewType.Months)
            return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
        var tickCountAtLeft = Math.floor((date.getTime() - rangeStartTime) / tickTimeSpan);
        return rangeStartTime + tickCountAtLeft * tickTimeSpan;
    };
    DateUtils.getNextTickTime = function (currentTickTime, tickTimeSpan, viewType) {
        if (viewType == Enums_1.ViewType.Months) {
            var nextTickDate = new Date();
            nextTickDate.setTime(currentTickTime);
            nextTickDate.setMonth(nextTickDate.getMonth() + 1);
            return nextTickDate.getTime();
        }
        return currentTickTime + tickTimeSpan;
    };
    DateUtils.adjustStartDateByViewType = function (date, viewType, firstDayOfWeek) {
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        switch (viewType) {
            case Enums_1.ViewType.TenMinutes:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
            case Enums_1.ViewType.SixHours:
            case Enums_1.ViewType.Hours:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate());
            case Enums_1.ViewType.Days:
            case Enums_1.ViewType.Weeks:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + firstDayOfWeek);
            case Enums_1.ViewType.Months:
            case Enums_1.ViewType.Quarter:
            case Enums_1.ViewType.Years:
                return new Date(date.getFullYear(), 0, 1);
            default:
                return new Date();
        }
    };
    DateUtils.adjustEndDateByViewType = function (date, viewType, firstDayOfWeek) {
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        switch (viewType) {
            case Enums_1.ViewType.TenMinutes:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1);
            case Enums_1.ViewType.SixHours:
            case Enums_1.ViewType.Hours:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
            case Enums_1.ViewType.Days:
            case Enums_1.ViewType.Weeks:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 - date.getDay() + firstDayOfWeek);
            case Enums_1.ViewType.Months:
            case Enums_1.ViewType.Quarter:
            case Enums_1.ViewType.Years:
                return new Date(date.getFullYear() + 1, 0, 1);
            default:
                return new Date();
        }
    };
    DateUtils.roundStartDate = function (date, viewType) {
        switch (viewType) {
            case Enums_1.ViewType.TenMinutes:
            case Enums_1.ViewType.Hours:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - 1);
            case Enums_1.ViewType.SixHours:
            case Enums_1.ViewType.Days:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
            case Enums_1.ViewType.Weeks:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
            case Enums_1.ViewType.Months:
                return new Date(date.getFullYear(), date.getMonth() - 1);
            case Enums_1.ViewType.Quarter:
            case Enums_1.ViewType.Years:
                return new Date(date.getFullYear() - 1, 0, 1);
            default:
                return new Date();
        }
    };
    DateUtils.getTickTimeSpan = function (viewType) {
        switch (viewType) {
            case Enums_1.ViewType.TenMinutes:
                return DateUtils.msPerHour / 6;
            case Enums_1.ViewType.Hours:
                return DateUtils.msPerHour;
            case Enums_1.ViewType.SixHours:
                return DateUtils.msPerHour * 6;
            case Enums_1.ViewType.Days:
                return DateUtils.msPerDay;
            case Enums_1.ViewType.Weeks:
                return DateUtils.msPerWeek;
            case Enums_1.ViewType.Months:
                return DateUtils.msPerMonth;
            case Enums_1.ViewType.Quarter:
                return DateUtils.msPerMonth * 3;
            case Enums_1.ViewType.Years:
                return DateUtils.msPerYear;
        }
    };
    DateUtils.getRangeTickCount = function (start, end, scaleType) {
        if (scaleType === Enums_1.ViewType.Months)
            return this.getRangeTickCountInMonthsViewType(start, end);
        if (scaleType === Enums_1.ViewType.Quarter)
            return this.getRangeTickCountInQuarterViewType(start, end);
        return DateUtils.getRangeMSPeriod(start, end) / DateUtils.getTickTimeSpan(scaleType);
    };
    DateUtils.getRangeMSPeriod = function (start, end) {
        return end.getTime() - DateUtils.getDSTTotalDelta(start, end) - start.getTime();
    };
    DateUtils.getRangeTickCountInMonthsViewType = function (start, end) {
        var startMonthStartDate = new Date(start.getFullYear(), start.getMonth(), 1);
        var endMonthStartDate = new Date(end.getFullYear(), end.getMonth(), 1);
        var monthOffset = DateUtils.getOffsetInMonths(startMonthStartDate, endMonthStartDate);
        var endFromMonthStartDateOffset = end.getTime() - endMonthStartDate.getTime();
        var msInEndMonth = DateUtils.getDaysInMonth(end.getMonth(), end.getFullYear()) * DateUtils.msPerDay;
        var startFromMonthStartDateOffset = start.getTime() - startMonthStartDate.getTime();
        var msInStartMonth = DateUtils.getDaysInMonth(start.getMonth(), start.getFullYear()) * DateUtils.msPerDay;
        return monthOffset + endFromMonthStartDateOffset / msInEndMonth - startFromMonthStartDateOffset / msInStartMonth;
    };
    DateUtils.getRangeTickCountInQuarterViewType = function (start, end) {
        var startQuarterStartDate = new Date(start.getFullYear(), Math.floor(start.getMonth() / 3) * 3, 1);
        var endQuarterStartDate = new Date(end.getFullYear(), Math.floor(end.getMonth() / 3) * 3, 1);
        var quarterOffset = DateUtils.getOffsetInQuarters(startQuarterStartDate, endQuarterStartDate);
        var endFromQuarterStartDateOffset = end.getTime() - endQuarterStartDate.getTime();
        var msInEndQuarter = DateUtils.getDaysInQuarter(endQuarterStartDate) * DateUtils.msPerDay;
        var startFromQuarterStartDateOffset = start.getTime() - startQuarterStartDate.getTime();
        var msInStartQuarter = DateUtils.getDaysInQuarter(startQuarterStartDate) * DateUtils.msPerDay;
        return quarterOffset + endFromQuarterStartDateOffset / msInEndQuarter - startFromQuarterStartDateOffset / msInStartQuarter;
    };
    DateUtils.parse = function (data) {
        return typeof data === "function" ? new Date(data()) : new Date(data);
    };
    DateUtils.getOrCreateUTCDate = function (date) {
        var timezoneOffset = date.getTimezoneOffset();
        return timezoneOffset ? new Date(date.valueOf() + timezoneOffset * 60000) : date;
    };
    DateUtils.getTimezoneOffsetDiff = function (data1, data2) {
        return data2.getTimezoneOffset() - data1.getTimezoneOffset();
    };
    DateUtils.getDSTDelta = function (start, end) {
        var timeZoneDiff = DateUtils.getTimezoneOffsetDiff(start, end) * DateUtils.msPerMinute;
        return timeZoneDiff > 0 ? timeZoneDiff : 0;
    };
    DateUtils.getDSTTotalDelta = function (start, end) {
        if (!DateUtils.hasDST())
            return 0;
        var refDate = start;
        var delta = 0;
        var year = refDate.getFullYear();
        var month = refDate.getMonth();
        while (refDate < end) {
            if (month >= 5) {
                year++;
                month = 0;
            }
            else
                month = 5;
            var newRefDate = new Date(year, month, 1);
            if (newRefDate > end)
                newRefDate = end;
            delta += DateUtils.getDSTDelta(refDate, newRefDate);
            refDate = newRefDate;
        }
        return delta;
    };
    DateUtils.getDSTCorrectedTaskEnd = function (start, period) {
        var time = start.getTime() + period;
        var delta = DateUtils.getDSTTotalDelta(start, new Date(time));
        return new Date(time + delta);
    };
    DateUtils.hasDST = function () {
        var year = (new Date()).getFullYear();
        var firstJan = new Date(year, 0, 1);
        var firstJune = new Date(year, 5, 1);
        return DateUtils.getTimezoneOffsetDiff(firstJan, firstJune) !== 0;
    };
    DateUtils.msPerMinute = 60 * 1000;
    DateUtils.msPerHour = 3600000;
    DateUtils.msPerDay = 24 * DateUtils.msPerHour;
    DateUtils.msPerWeek = 7 * DateUtils.msPerDay;
    DateUtils.msPerMonth = 30 * DateUtils.msPerDay;
    DateUtils.msPerYear = 365 * DateUtils.msPerDay;
    DateUtils.ViewTypeToScaleMap = createViewTypeToScaleMap();
    return DateUtils;
}());
exports.DateUtils = DateUtils;
function createViewTypeToScaleMap() {
    var result = {};
    result[Enums_1.ViewType.TenMinutes] = Enums_1.ViewType.Hours;
    result[Enums_1.ViewType.Hours] = Enums_1.ViewType.Days;
    result[Enums_1.ViewType.SixHours] = Enums_1.ViewType.Days;
    result[Enums_1.ViewType.Days] = Enums_1.ViewType.Weeks;
    result[Enums_1.ViewType.Weeks] = Enums_1.ViewType.Months;
    result[Enums_1.ViewType.Months] = Enums_1.ViewType.Years;
    result[Enums_1.ViewType.Quarter] = Enums_1.ViewType.Years;
    result[Enums_1.ViewType.Years] = Enums_1.ViewType.FiveYears;
    return result;
}


/***/ }),

/***/ 8380:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ElementTextHelper = void 0;
var dom_1 = __webpack_require__(6907);
var Enums_1 = __webpack_require__(2449);
var DateUtils_1 = __webpack_require__(9201);
var ElementTextHelper = (function () {
    function ElementTextHelper(cultureInfo) {
        this.longestAbbrMonthName = null;
        this.longestMonthName = null;
        this.longestAbbrDayName = null;
        var canvas = document.createElement("canvas");
        this.textMeasureContext = canvas.getContext("2d");
        this.cultureInfo = cultureInfo;
    }
    ElementTextHelper.prototype.setFont = function (fontHolder) {
        var computedStyle = dom_1.DomUtils.getCurrentStyle(fontHolder);
        var font = computedStyle.font ? computedStyle.font :
            computedStyle.fontStyle + " " + computedStyle.fontVariant + " " + computedStyle.fontWeight + " "
                + computedStyle.fontSize + " / " + computedStyle.lineHeight + " " + computedStyle.fontFamily;
        this.textMeasureContext.font = font;
    };
    ElementTextHelper.prototype.setSettings = function (startTime, viewType, modelItems) {
        this.startTime = startTime;
        this.viewType = viewType;
        this.modelItems = modelItems;
    };
    ElementTextHelper.prototype.getScaleItemText = function (date, scaleType) {
        var isViewTypeScale = this.viewType.valueOf() === scaleType.valueOf();
        switch (scaleType) {
            case Enums_1.ViewType.TenMinutes:
                return this.getTenMinutesScaleItemText(date);
            case Enums_1.ViewType.Hours:
            case Enums_1.ViewType.SixHours:
                return this.getHoursScaleItemText(date);
            case Enums_1.ViewType.Days:
                return this.getDaysScaleItemText(date, isViewTypeScale);
            case Enums_1.ViewType.Weeks:
                return this.getWeeksScaleItemText(date, isViewTypeScale);
            case Enums_1.ViewType.Months:
                return this.getMonthsScaleItemText(date, isViewTypeScale);
            case Enums_1.ViewType.Quarter:
                return this.getQuarterScaleItemText(date, isViewTypeScale);
            case Enums_1.ViewType.Years:
                return this.getYearsScaleItemText(date);
            case Enums_1.ViewType.FiveYears:
                return this.getFiveYearsScaleItemText(date);
        }
    };
    ElementTextHelper.prototype.getTenMinutesScaleItemText = function (scaleItemDate) {
        var minutes = scaleItemDate.getMinutes() + 1;
        return (Math.ceil(minutes / 10) * 10).toString();
    };
    ElementTextHelper.prototype.getThirtyMinutesScaleItemText = function (scaleItemDate) {
        var minutes = scaleItemDate.getMinutes();
        return minutes < 30 ? "30" : "60";
    };
    ElementTextHelper.prototype.getHoursScaleItemText = function (scaleItemDate) {
        var hours = scaleItemDate.getHours();
        var hourDisplayText = this.getHourDisplayText(hours);
        var amPmText = hours < 12 ? this.getAmText() : this.getPmText();
        return this.getHoursScaleItemTextCore(hourDisplayText, amPmText);
    };
    ElementTextHelper.prototype.getDaysScaleItemText = function (scaleItemDate, isViewTypeScale) {
        return this.getDayTotalText(scaleItemDate, true, isViewTypeScale, isViewTypeScale, !isViewTypeScale);
    };
    ElementTextHelper.prototype.getWeeksScaleItemText = function (scaleItemDate, isViewTypeScale) {
        var weekLastDayDate = DateUtils_1.DateUtils.getDSTCorrectedTaskEnd(scaleItemDate, DateUtils_1.DateUtils.msPerWeek - DateUtils_1.DateUtils.msPerDay);
        return this.getWeeksScaleItemTextCore(this.getDayTotalText(scaleItemDate, isViewTypeScale, true, isViewTypeScale, !isViewTypeScale), this.getDayTotalText(weekLastDayDate, isViewTypeScale, true, isViewTypeScale, !isViewTypeScale));
    };
    ElementTextHelper.prototype.getMonthsScaleItemText = function (scaleItemDate, isViewTypeScale) {
        var monthNames = this.getMonthNames();
        var yearDisplayText = !isViewTypeScale ? scaleItemDate.getFullYear().toString() : "";
        return this.getMonthsScaleItemTextCore(monthNames[scaleItemDate.getMonth()], yearDisplayText);
    };
    ElementTextHelper.prototype.getQuarterScaleItemText = function (scaleItemDate, isViewTypeScale) {
        var quarterNames = this.getQuarterNames();
        var yearDisplayText = !isViewTypeScale ? scaleItemDate.getFullYear().toString() : "";
        return this.getMonthsScaleItemTextCore(quarterNames[Math.floor(scaleItemDate.getMonth() / 3)], yearDisplayText);
    };
    ElementTextHelper.prototype.getYearsScaleItemText = function (scaleItemDate) {
        return scaleItemDate.getFullYear().toString();
    };
    ElementTextHelper.prototype.getFiveYearsScaleItemText = function (scaleItemDate) {
        return scaleItemDate.getFullYear().toString() + " - " + (scaleItemDate.getFullYear() + 4).toString();
    };
    ElementTextHelper.prototype.getHourDisplayText = function (hours) {
        if (this.hasAmPm())
            return (hours == 0 ? 12 : (hours <= 12 ? hours : hours - 12)).toString();
        return hours < 10 ? "0" + hours : hours.toString();
    };
    ElementTextHelper.prototype.getDayTotalText = function (scaleItemDate, displayDayName, useAbbrDayNames, useAbbrMonthNames, displayYear) {
        var monthNames = useAbbrMonthNames ? this.getAbbrMonthNames() : this.getMonthNames();
        var dayNames = useAbbrDayNames ? this.getAbbrDayNames() : this.getDayNames();
        var dayNameDisplayText = displayDayName ? dayNames[scaleItemDate.getDay()] : "";
        var day = scaleItemDate.getDate();
        var monthName = monthNames[scaleItemDate.getMonth()];
        var yearDisplayText = displayYear ? scaleItemDate.getFullYear().toString() : "";
        return this.getDayTotalTextCore(dayNameDisplayText, day.toString(), monthName, yearDisplayText);
    };
    ElementTextHelper.prototype.getTaskText = function (index) {
        var item = this.modelItems[index];
        return item ? item.task.title : "";
    };
    ElementTextHelper.prototype.getTaskVisibility = function (index) {
        var item = this.modelItems[index];
        return !!item && item.getVisible();
    };
    ElementTextHelper.prototype.hasAmPm = function () {
        return this.getAmText().length > 0 || this.getPmText().length > 0;
    };
    ElementTextHelper.prototype.getScaleItemTextTemplate = function (viewType) {
        switch (viewType) {
            case Enums_1.ViewType.TenMinutes:
                return "00";
            case Enums_1.ViewType.Hours:
            case Enums_1.ViewType.SixHours:
                return this.getHoursScaleItemTextCore("00", this.getAmText());
            case Enums_1.ViewType.Days:
                return this.getDayTextTemplate();
            case Enums_1.ViewType.Weeks:
                return this.getWeekTextTemplate();
            case Enums_1.ViewType.Months:
                return this.getMonthsScaleItemTextCore(this.getLongestMonthName(), "");
            case Enums_1.ViewType.Quarter:
                return "Q4";
            case Enums_1.ViewType.Years:
                return "0000";
        }
    };
    ElementTextHelper.prototype.getDayTextTemplate = function () {
        return this.getDayTotalTextCore(this.getLongestAbbrDayName(), "00", this.getLongestAbbrMonthName(), "");
    };
    ElementTextHelper.prototype.getWeekTextTemplate = function () {
        var dayTextTemplate = this.getDayTextTemplate();
        return this.getWeeksScaleItemTextCore(dayTextTemplate, dayTextTemplate);
    };
    ElementTextHelper.prototype.getHoursScaleItemTextCore = function (hourDisplayText, amPmText) {
        return hourDisplayText + ":00" + (this.hasAmPm() ? " " + amPmText : "");
    };
    ElementTextHelper.prototype.getDayTotalTextCore = function (dayName, dayValueString, monthName, yearValueString) {
        var result = dayName.length > 0 ? dayName + ", " : "";
        result += dayValueString + " " + monthName;
        result += yearValueString.length > 0 ? " " + yearValueString : "";
        return result;
    };
    ElementTextHelper.prototype.getWeeksScaleItemTextCore = function (firstDayOfWeekString, lastDayOfWeekString) {
        return firstDayOfWeekString + " - " + lastDayOfWeekString;
    };
    ElementTextHelper.prototype.getMonthsScaleItemTextCore = function (monthName, yearValueString) {
        var result = monthName;
        if (yearValueString.length > 0)
            result += " " + yearValueString;
        return result;
    };
    ElementTextHelper.prototype.getLongestAbbrMonthName = function () {
        if (this.longestAbbrMonthName == null)
            this.longestAbbrMonthName = this.getLongestText(this.getAbbrMonthNames());
        return this.longestAbbrMonthName;
    };
    ElementTextHelper.prototype.getLongestMonthName = function () {
        if (this.longestMonthName == null)
            this.longestMonthName = this.getLongestText(this.getMonthNames());
        return this.longestMonthName;
    };
    ElementTextHelper.prototype.getLongestAbbrDayName = function () {
        if (this.longestAbbrDayName == null)
            this.longestAbbrDayName = this.getLongestText(this.getAbbrDayNames());
        return this.longestAbbrDayName;
    };
    ElementTextHelper.prototype.getLongestText = function (texts) {
        var _this = this;
        var result = "";
        var longestTextWidth = 0;
        texts.forEach(function (text) {
            var textWidth = _this.getTextWidth(text);
            if (textWidth > longestTextWidth) {
                longestTextWidth = textWidth;
                result = text;
            }
        });
        return result;
    };
    ElementTextHelper.prototype.getTextWidth = function (text) {
        return Math.round(this.textMeasureContext.measureText(text).width);
    };
    ElementTextHelper.prototype.getAmText = function () {
        return this.cultureInfo.amText;
    };
    ElementTextHelper.prototype.getPmText = function () {
        return this.cultureInfo.pmText;
    };
    ElementTextHelper.prototype.getQuarterNames = function () {
        return this.cultureInfo.quarterNames;
    };
    ElementTextHelper.prototype.getMonthNames = function () {
        return this.cultureInfo.monthNames;
    };
    ElementTextHelper.prototype.getDayNames = function () {
        return this.cultureInfo.dayNames;
    };
    ElementTextHelper.prototype.getAbbrMonthNames = function () {
        return this.cultureInfo.abbrMonthNames;
    };
    ElementTextHelper.prototype.getAbbrDayNames = function () {
        return this.cultureInfo.abbrDayNames;
    };
    return ElementTextHelper;
}());
exports.ElementTextHelper = ElementTextHelper;


/***/ }),

/***/ 655:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GanttView = exports["default"] = void 0;
__webpack_require__(8721);
var GanttView_1 = __webpack_require__(2366);
Object.defineProperty(exports, "default", ({ enumerable: true, get: function () { return GanttView_1.GanttView; } }));
Object.defineProperty(exports, "GanttView", ({ enumerable: true, get: function () { return GanttView_1.GanttView; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});