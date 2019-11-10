/*
* Jssor 19.0
* http://www.jssor.com/
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/MIT
* 
* TERMS OF USE - Jssor
* 
* Copyright 2014 Jssor
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*! Jssor */

//$JssorDebug$
var $JssorDebug$ = new function () {

    this.$DebugMode = true;

    // Methods

    this.$Log = function (msg, important) {
        var console = window.console || {};
        var debug = this.$DebugMode;

        if (debug && console.log) {
            console.log(msg);
        } else if (debug && important) {
            alert(msg);
        }
    };

    this.$Error = function (msg, e) {
        var console = window.console || {};
        var debug = this.$DebugMode;

        if (debug && console.error) {
            console.error(msg);
        } else if (debug) {
            alert(msg);
        }

        if (debug) {
            // since we're debugging, fail fast by crashing
            throw e || new Error(msg);
        }
    };

    this.$Fail = function (msg) {
        throw new Error(msg);
    };

    this.$Assert = function (value, msg) {
        var debug = this.$DebugMode;
        if (debug) {
            if (!value)
                throw new Error("Assert failed " + msg || "");
        }
    };

    this.$Trace = function (msg) {
        var console = window.console || {};
        var debug = this.$DebugMode;

        if (debug && console.log) {
            console.log(msg);
        }
    };

    this.$Execute = function (func) {
        var debug = this.$DebugMode;
        if (debug)
            func();
    };

    this.$LiveStamp = function (obj, id) {
        var debug = this.$DebugMode;
        if (debug) {
            var stamp = document.createElement("DIV");
            stamp.setAttribute("id", id);

            obj.$Live = stamp;
        }
    };

    this.$C_AbstractProperty = function () {
        ///	<summary>
        ///		Tells compiler the property is abstract, it should be implemented by subclass.
        ///	</summary>

        throw new Error("The property is abstract, it should be implemented by subclass.");
    };

    this.$C_AbstractMethod = function () {
        ///	<summary>
        ///		Tells compiler the method is abstract, it should be implemented by subclass.
        ///	</summary>

        throw new Error("The method is abstract, it should be implemented by subclass.");
    };

    function C_AbstractClass(instance) {
        ///	<summary>
        ///		Tells compiler the class is abstract, it should be implemented by subclass.
        ///	</summary>

        if (instance.constructor === C_AbstractClass.caller)
            throw new Error("Cannot create instance of an abstract class.");
    }

    this.$C_AbstractClass = C_AbstractClass;
};

//$JssorEasing$
var $JssorEasing$ = window.$JssorEasing$ = {
    $EaseSwing: function (t) {
        return -Math.cos(t * Math.PI) / 2 + .5;
    },
    $EaseLinear: function (t) {
        return t;
    },
    $EaseInQuad: function (t) {
        return t * t;
    },
    $EaseOutQuad: function (t) {
        return -t * (t - 2);
    },
    $EaseInOutQuad: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t : -1 / 2 * (--t * (t - 2) - 1);
    },
    $EaseInCubic: function (t) {
        return t * t * t;
    },
    $EaseOutCubic: function (t) {
        return (t -= 1) * t * t + 1;
    },
    $EaseInOutCubic: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t : 1 / 2 * ((t -= 2) * t * t + 2);
    },
    $EaseInQuart: function (t) {
        return t * t * t * t;
    },
    $EaseOutQuart: function (t) {
        return -((t -= 1) * t * t * t - 1);
    },
    $EaseInOutQuart: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t * t : -1 / 2 * ((t -= 2) * t * t * t - 2);
    },
    $EaseInQuint: function (t) {
        return t * t * t * t * t;
    },
    $EaseOutQuint: function (t) {
        return (t -= 1) * t * t * t * t + 1;
    },
    $EaseInOutQuint: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t * t * t : 1 / 2 * ((t -= 2) * t * t * t * t + 2);
    },
    $EaseInSine: function (t) {
        return 1 - Math.cos(t * Math.PI / 2);
    },
    $EaseOutSine: function (t) {
        return Math.sin(t * Math.PI / 2);
    },
    $EaseInOutSine: function (t) {
        return -1 / 2 * (Math.cos(Math.PI * t) - 1);
    },
    $EaseInExpo: function (t) {
        return t == 0 ? 0 : Math.pow(2, 10 * (t - 1));
    },
    $EaseOutExpo: function (t) {
        return t == 1 ? 1 : -Math.pow(2, -10 * t) + 1;
    },
    $EaseInOutExpo: function (t) {
        return t == 0 || t == 1 ? t : (t *= 2) < 1 ? 1 / 2 * Math.pow(2, 10 * (t - 1)) : 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
    },
    $EaseInCirc: function (t) {
        return -(Math.sqrt(1 - t * t) - 1);
    },
    $EaseOutCirc: function (t) {
        return Math.sqrt(1 - (t -= 1) * t);
    },
    $EaseInOutCirc: function (t) {
        return (t *= 2) < 1 ? -1 / 2 * (Math.sqrt(1 - t * t) - 1) : 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    $EaseInElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .3, s = .075;
        return -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p));
    },
    $EaseOutElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .3, s = .075;
        return Math.pow(2, -10 * t) * Math.sin((t - s) * 2 * Math.PI / p) + 1;
    },
    $EaseInOutElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .45, s = .1125;
        return (t *= 2) < 1 ? -.5 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p) : Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p) * .5 + 1;
    },
    $EaseInBack: function (t) {
        var s = 1.70158;
        return t * t * ((s + 1) * t - s);
    },
    $EaseOutBack: function (t) {
        var s = 1.70158;
        return (t -= 1) * t * ((s + 1) * t + s) + 1;
    },
    $EaseInOutBack: function (t) {
        var s = 1.70158;
        return (t *= 2) < 1 ? 1 / 2 * t * t * (((s *= 1.525) + 1) * t - s) : 1 / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
    },
    $EaseInBounce: function (t) {
        return 1 - $JssorEasing$.$EaseOutBounce(1 - t)
    },
    $EaseOutBounce: function (t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    },
    $EaseInOutBounce: function (t) {
        return t < 1 / 2 ? $JssorEasing$.$EaseInBounce(t * 2) * .5 : $JssorEasing$.$EaseOutBounce(t * 2 - 1) * .5 + .5;
    },
    $EaseGoBack: function (t) {
        return 1 - Math.abs((t *= 2) - 1);
    },
    $EaseInWave: function (t) {
        return 1 - Math.cos(t * Math.PI * 2)
    },
    $EaseOutWave: function (t) {
        return Math.sin(t * Math.PI * 2);
    },
    $EaseOutJump: function (t) {
        return 1 - (((t *= 2) < 1) ? (t = 1 - t) * t * t : (t -= 1) * t * t);
    },
    $EaseInJump: function (t) {
        return ((t *= 2) < 1) ? t * t * t : (t = 2 - t) * t * t;
    }
};

var $JssorDirection$ = window.$JssorDirection$ = {
    $TO_LEFT: 0x0001,
    $TO_RIGHT: 0x0002,
    $TO_TOP: 0x0004,
    $TO_BOTTOM: 0x0008,
    $HORIZONTAL: 0x0003,
    $VERTICAL: 0x000C,
    //$LEFTRIGHT: 0x0003,
    //$TOPBOTOM: 0x000C,
    //$TOPLEFT: 0x0005,
    //$TOPRIGHT: 0x0006,
    //$BOTTOMLEFT: 0x0009,
    //$BOTTOMRIGHT: 0x000A,
    //$AROUND: 0x000F,

    $GetDirectionHorizontal: function (direction) {
        return direction & 0x0003;
    },
    $GetDirectionVertical: function (direction) {
        return direction & 0x000C;
    },
    //$ChessHorizontal: function (direction) {
    //    return (~direction & 0x0003) + (direction & 0x000C);
    //},
    //$ChessVertical: function (direction) {
    //    return (~direction & 0x000C) + (direction & 0x0003);
    //},
    //$IsToLeft: function (direction) {
    //    return (direction & 0x0003) == 0x0001;
    //},
    //$IsToRight: function (direction) {
    //    return (direction & 0x0003) == 0x0002;
    //},
    //$IsToTop: function (direction) {
    //    return (direction & 0x000C) == 0x0004;
    //},
    //$IsToBottom: function (direction) {
    //    return (direction & 0x000C) == 0x0008;
    //},
    $IsHorizontal: function (direction) {
        return direction & 0x0003;
    },
    $IsVertical: function (direction) {
        return direction & 0x000C;
    }
};

var $JssorKeyCode$ = {
    $BACKSPACE: 8,
    $COMMA: 188,
    $DELETE: 46,
    $DOWN: 40,
    $END: 35,
    $ENTER: 13,
    $ESCAPE: 27,
    $HOME: 36,
    $LEFT: 37,
    $NUMPAD_ADD: 107,
    $NUMPAD_DECIMAL: 110,
    $NUMPAD_DIVIDE: 111,
    $NUMPAD_ENTER: 108,
    $NUMPAD_MULTIPLY: 106,
    $NUMPAD_SUBTRACT: 109,
    $PAGE_DOWN: 34,
    $PAGE_UP: 33,
    $PERIOD: 190,
    $RIGHT: 39,
    $SPACE: 32,
    $TAB: 9,
    $UP: 38
};

// $Jssor$ is a static class, so make it singleton instance
var $Jssor$ = window.$Jssor$ = new function () {
    var _This = this;

    //#region Constants
    var REGEX_WHITESPACE_GLOBAL = /\S+/g;
    var ROWSER_OTHER = -1;
    var ROWSER_UNKNOWN = 0;
    var BROWSER_IE = 1;
    var BROWSER_FIREFOX = 2;
    var BROWSER_SAFARI = 3;
    var BROWSER_CHROME = 4;
    var BROWSER_OPERA = 5;
    //var arrActiveX = ["Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP"];
    //#endregion

    //#region Variables
    var _Device;
    var _Browser = 0;
    var _BrowserRuntimeVersion = 0;
    var _BrowserEngineVersion = 0;
    var _BrowserJavascriptVersion = 0;
    var _WebkitVersion = 0;

    var _Navigator = navigator;
    var _AppName = _Navigator.appName;
    var _AppVersion = _Navigator.appVersion;
    var _UserAgent = _Navigator.userAgent;

    var _DocElmt = document.documentElement;
    var _TransformProperty;
    //#endregion

    function Device() {
        if (!_Device) {
            _Device = { $Touchable: "ontouchstart" in window || "createTouch" in document };

            var msPrefix;
            if ((_Navigator.pointerEnabled || (msPrefix = _Navigator.msPointerEnabled))) {
                _Device.$TouchActionAttr = msPrefix ? "msTouchAction" : "touchAction";
            }
        }

        return _Device;
    }

    function DetectBrowser(browser) {
        if (!_Browser) {
            _Browser = -1;

            if (_AppName == "Microsoft Internet Explorer" &&
                !!window.attachEvent && !!window.ActiveXObject) {

                var ieOffset = _UserAgent.indexOf("MSIE");
                _Browser = BROWSER_IE;
                _BrowserEngineVersion = ParseFloat(_UserAgent.substring(ieOffset + 5, _UserAgent.indexOf(";", ieOffset)));

                //check IE javascript version
                /*@cc_on
                _BrowserJavascriptVersion = @_jscript_version;
                @*/

                // update: for intranet sites and compat view list sites, IE sends
                // an IE7 User-Agent to the server to be interoperable, and even if
                // the page requests a later IE version, IE will still report the
                // IE7 UA to JS. we should be robust to self
                //var docMode = document.documentMode;
                //if (typeof docMode !== "undefined") {
                //    _BrowserRuntimeVersion = docMode;
                //}

                _BrowserRuntimeVersion = document.documentMode || _BrowserEngineVersion;

            }
            else if (_AppName == "Netscape" && !!window.addEventListener) {

                var ffOffset = _UserAgent.indexOf("Firefox");
                var saOffset = _UserAgent.indexOf("Safari");
                var chOffset = _UserAgent.indexOf("Chrome");
                var webkitOffset = _UserAgent.indexOf("AppleWebKit");

                if (ffOffset >= 0) {
                    _Browser = BROWSER_FIREFOX;
                    _BrowserRuntimeVersion = ParseFloat(_UserAgent.substring(ffOffset + 8));
                }
                else if (saOffset >= 0) {
                    var slash = _UserAgent.substring(0, saOffset).lastIndexOf("/");
                    _Browser = (chOffset >= 0) ? BROWSER_CHROME : BROWSER_SAFARI;
                    _BrowserRuntimeVersion = ParseFloat(_UserAgent.substring(slash + 1, saOffset));
                }
                else {
                    //(/Trident.*rv[ :]*11\./i
                    var match = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(_UserAgent);
                    if (match) {
                        _Browser = BROWSER_IE;
                        _BrowserRuntimeVersion = _BrowserEngineVersion = ParseFloat(match[1]);
                    }
                }

                if (webkitOffset >= 0)
                    _WebkitVersion = ParseFloat(_UserAgent.substring(webkitOffset + 12));
            }
            else {
                var match = /(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(_UserAgent);
                if (match) {
                    _Browser = BROWSER_OPERA;
                    _BrowserRuntimeVersion = ParseFloat(match[2]);
                }
            }
        }

        return browser == _Browser;
    }

    function IsBrowserIE() {
        return DetectBrowser(BROWSER_IE);
    }

    function IsBrowserIeQuirks() {
        return IsBrowserIE() && (_BrowserRuntimeVersion < 6 || document.compatMode == "BackCompat");   //Composite to "CSS1Compat"
    }

    function IsBrowserFireFox() {
        return DetectBrowser(BROWSER_FIREFOX);
    }

    function IsBrowserSafari() {
        return DetectBrowser(BROWSER_SAFARI);
    }

    function IsBrowserChrome() {
        return DetectBrowser(BROWSER_CHROME);
    }

    function IsBrowserOpera() {
        return DetectBrowser(BROWSER_OPERA);
    }

    function IsBrowserBadTransform() {
        return IsBrowserSafari() && (_WebkitVersion > 534) && (_WebkitVersion < 535);
    }

    function IsBrowserIe9Earlier() {
        return IsBrowserIE() && _BrowserRuntimeVersion < 9;
    }

    function GetTransformProperty(elmt) {

        if (!_TransformProperty) {
            // Note that in some versions of IE9 it is critical that
            // msTransform appear in this list before MozTransform

            Each(['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'], function (property) {
                if (elmt.style[property] != undefined) {
                    _TransformProperty = property;
                    return true;
                }
            });

            _TransformProperty = _TransformProperty || "transform";
        }

        return _TransformProperty;
    }

    // Helpers
    function getOffsetParent(elmt, isFixed) {
        // IE and Opera "fixed" position elements don't have offset parents.
        // regardless, if it's fixed, its offset parent is the body.
        if (isFixed && elmt != document.body) {
            return document.body;
        } else {
            return elmt.offsetParent;
        }
    }

    function toString(obj) {
        return {}.toString.call(obj);
    }

    // [[Class]] -> type pairs
    var _Class2type;

    function GetClass2Type() {
        if (!_Class2type) {
            _Class2type = {};
            Each(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"], function (name) {
                _Class2type["[object " + name + "]"] = name.toLowerCase();
            });
        }

        return _Class2type;
    }

    function Each(obj, callback) {
        if (toString(obj) == "[object Array]") {
            for (var i = 0; i < obj.length; i++) {
                if (callback(obj[i], i, obj)) {
                    return true;
                }
            }
        }
        else {
            for (var name in obj) {
                if (callback(obj[name], name, obj)) {
                    return true;
                }
            }
        }
    }

    function Type(obj) {
        return obj == null ? String(obj) : GetClass2Type()[toString(obj)] || "object";
    }

    function IsNotEmpty(obj) {
        for(var name in obj)
            return true;
    }

    function IsPlainObject(obj) {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        try {
            return Type(obj) == "object"
                && !obj.nodeType
                && obj != obj.window
                && (!obj.constructor || { }.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf"));
        }
        catch (e) { }
    }

    function Point(x, y) {
        return { x: x, y: y };
    }

    function Delay(code, delay) {
        setTimeout(code, delay || 0);
    }

    function RemoveByReg(str, reg) {
        var m = reg.exec(str);

        if (m) {
            var header = str.substr(0, m.index);
            var tailer = str.substr(m.lastIndex + 1, str.length - (m.lastIndex + 1));
            str = header + tailer;
        }

        return str;
    }

    function BuildNewCss(oldCss, removeRegs, replaceValue) {
        var css = (!oldCss || oldCss == "inherit") ? "" : oldCss;

        Each(removeRegs, function (removeReg) {
            var m = removeReg.exec(css);

            if (m) {
                var header = css.substr(0, m.index);
                var tailer = css.substr(m.lastIndex + 1, css.length - (m.lastIndex + 1));
                css = header + tailer;
            }
        });

        css = replaceValue + (css.indexOf(" ") != 0 ? " " : "") + css;

        return css;
    }

    function SetStyleFilterIE(elmt, value) {
        if (_BrowserRuntimeVersion < 9) {
            elmt.style.filter = value;
        }
    }

    function SetStyleMatrixIE(elmt, matrix, offset) {
        //matrix is not for ie9+ running in ie8- mode
        if (_BrowserJavascriptVersion < 9) {
            var oldFilterValue = elmt.style.filter;
            var matrixReg = new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g);
            var matrixValue = matrix ? "progid:DXImageTransform.Microsoft.Matrix(" + "M11=" + matrix[0][0] + ", M12=" + matrix[0][1] + ", M21=" + matrix[1][0] + ", M22=" + matrix[1][1] + ", SizingMethod='auto expand')" : "";

            var newFilterValue = BuildNewCss(oldFilterValue, [matrixReg], matrixValue);

            SetStyleFilterIE(elmt, newFilterValue);

            _This.$CssMarginTop(elmt, offset.y);
            _This.$CssMarginLeft(elmt, offset.x);
        }
    }

    // Methods

    _This.$Device = Device;

    _This.$IsBrowserIE = IsBrowserIE;

    _This.$IsBrowserIeQuirks = IsBrowserIeQuirks;

    _This.$IsBrowserFireFox = IsBrowserFireFox;

    _This.$IsBrowserSafari = IsBrowserSafari;

    _This.$IsBrowserChrome = IsBrowserChrome;

    _This.$IsBrowserOpera = IsBrowserOpera;

    _This.$IsBrowserBadTransform = IsBrowserBadTransform;

    _This.$IsBrowserIe9Earlier = IsBrowserIe9Earlier;

    _This.$BrowserVersion = function () {
        return _BrowserRuntimeVersion;
    };

    _This.$BrowserEngineVersion = function () {
        return _BrowserEngineVersion || _BrowserRuntimeVersion;
    };

    _This.$WebKitVersion = function () {
        DetectBrowser();

        return _WebkitVersion;
    };

    _This.$Delay = Delay;

    _This.$Inherit = function (instance, baseClass) {
        baseClass.call(instance);
        return Extend({}, instance);
    };

    function Construct(instance) {
        instance.constructor === Construct.caller && instance.$Construct && instance.$Construct.apply(instance, Construct.caller.arguments);
    }

    _This.$Construct = Construct;

    _This.$GetElement = function (elmt) {
        if (_This.$IsString(elmt)) {
            elmt = document.getElementById(elmt);
        }

        return elmt;
    };

    function GetEvent(event) {
        return event || window.event;
    }

    _This.$GetEvent = GetEvent;

    _This.$EvtSrc = function (event) {
        event = GetEvent(event);
        return event.target || event.srcElement || document;
    };

    _This.$EvtTarget = function (event) {
        event = GetEvent(event);
        return event.relatedTarget || event.toElement;
    };

    _This.$EvtWhich = function (event) {
        event = GetEvent(event);
        return event.which || [0, 1, 3, 0, 2][event.button] || event.charCode || event.keyCode;
    };

    _This.$MousePosition = function (event) {
        event = GetEvent(event);
        //var body = document.body;

        return {
            x: event.pageX || event.clientX/* + (_DocElmt.scrollLeft || body.scrollLeft || 0) - (_DocElmt.clientLeft || body.clientLeft || 0)*/ || 0,
            y: event.pageY || event.clientY/* + (_DocElmt.scrollTop || body.scrollTop || 0) - (_DocElmt.clientTop || body.clientTop || 0)*/ || 0
        };
    };

    _This.$PageScroll = function () {
        var body = document.body;

        return {
            x: (window.pageXOffset || _DocElmt.scrollLeft || body.scrollLeft || 0) - (_DocElmt.clientLeft || body.clientLeft || 0),
            y: (window.pageYOffset || _DocElmt.scrollTop || body.scrollTop || 0) - (_DocElmt.clientTop || body.clientTop || 0)
        };
    };

    _This.$WindowSize = function () {
        var body = document.body;

        return {
            x: body.clientWidth || _DocElmt.clientWidth,
            y: body.clientHeight || _DocElmt.clientHeight
        };
    };

    //_This.$GetElementPosition = function (elmt) {
    //    elmt = _This.$GetElement(elmt);
    //    var result = Point();

    //    // technique from:
    //    // http://www.quirksmode.org/js/findpos.html
    //    // with special check for "fixed" elements.

    //    while (elmt) {
    //        result.x += elmt.offsetLeft;
    //        result.y += elmt.offsetTop;

    //        var isFixed = _This.$GetElementStyle(elmt).position == "fixed";

    //        if (isFixed) {
    //            result = result.$Plus(_This.$PageScroll(window));
    //        }

    //        elmt = getOffsetParent(elmt, isFixed);
    //    }

    //    return result;
    //};

    //_This.$GetMouseScroll = function (event) {
    //    event = GetEvent(event);
    //    var delta = 0; // default value

    //    // technique from:
    //    // http://blog.paranoidferret.com/index.php/2007/10/31/javascript-tutorial-the-scroll-wheel/

    //    if (typeof (event.wheelDelta) == "number") {
    //        delta = event.wheelDelta;
    //    } else if (typeof (event.detail) == "number") {
    //        delta = event.detail * -1;
    //    } else {
    //        $JssorDebug$.$Fail("Unknown event mouse scroll, no known technique.");
    //    }

    //    // normalize value to [-1, 1]
    //    return delta ? delta / Math.abs(delta) : 0;
    //};

    //_This.$MakeAjaxRequest = function (url, callback) {
    //    var async = typeof (callback) == "function";
    //    var req = null;

    //    if (async) {
    //        var actual = callback;
    //        var callback = function () {
    //            Delay($Jssor$.$CreateCallback(null, actual, req), 1);
    //        };
    //    }

    //    if (window.ActiveXObject) {
    //        for (var i = 0; i < arrActiveX.length; i++) {
    //            try {
    //                req = new ActiveXObject(arrActiveX[i]);
    //                break;
    //            } catch (e) {
    //                continue;
    //            }
    //        }
    //    } else if (window.XMLHttpRequest) {
    //        req = new XMLHttpRequest();
    //    }

    //    if (!req) {
    //        $JssorDebug$.$Fail("Browser doesn't support XMLHttpRequest.");
    //    }

    //    if (async) {
    //        req.onreadystatechange = function () {
    //            if (req.readyState == 4) {
    //                // prevent memory leaks by breaking circular reference now
    //                req.onreadystatechange = new Function();
    //                callback();
    //            }
    //        };
    //    }

    //    try {
    //        req.open("GET", url, async);
    //        req.send(null);
    //    } catch (e) {
    //        $JssorDebug$.$Log(e.name + " while making AJAX request: " + e.message);

    //        req.onreadystatechange = null;
    //        req = null;

    //        if (async) {
    //            callback();
    //        }
    //    }

    //    return async ? null : req;
    //};

    //_This.$ParseXml = function (string) {
    //    var xmlDoc = null;

    //    if (window.ActiveXObject) {
    //        try {
    //            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    //            xmlDoc.async = false;
    //            xmlDoc.loadXML(string);
    //        } catch (e) {
    //            $JssorDebug$.$Log(e.name + " while parsing XML (ActiveX): " + e.message);
    //        }
    //    } else if (window.DOMParser) {
    //        try {
    //            var parser = new DOMParser();
    //            xmlDoc = parser.parseFromString(string, "text/xml");
    //        } catch (e) {
    //            $JssorDebug$.$Log(e.name + " while parsing XML (DOMParser): " + e.message);
    //        }
    //    } else {
    //        $JssorDebug$.$Fail("Browser doesn't support XML DOM.");
    //    }

    //    return xmlDoc;
    //};

    function Css(elmt, name, value) {
        ///	<summary>
        ///		access css
        ///     $Jssor$.$Css(elmt, name);         //get css value
        ///     $Jssor$.$Css(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" optional="true">
        ///		the value to set
        ///	</param>
        if (value != undefined) {
            elmt.style[name] = value;
        }
        else {
            var style = elmt.currentStyle || elmt.style;
            value = style[name];

            if (value == "" && window.getComputedStyle) {
                style = elmt.ownerDocument.defaultView.getComputedStyle(elmt, null);

                style && (value = style.getPropertyValue(name) || style[name]);
            }

            return value;
        }
    }

    function CssN(elmt, name, value, isDimensional) {
        ///	<summary>
        ///		access css as numeric
        ///     $Jssor$.$CssN(elmt, name);         //get css value
        ///     $Jssor$.$CssN(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" type="Number" optional="true">
        ///		the value to set
        ///	</param>
        if (value != undefined) {
            isDimensional && (value += "px");
            Css(elmt, name, value);
        }
        else {
            return ParseFloat(Css(elmt, name));
        }
    }

    function CssP(elmt, name, value) {
        ///	<summary>
        ///		access css in pixel as numeric, like 'top', 'left', 'width', 'height'
        ///     $Jssor$.$CssP(elmt, name);         //get css value
        ///     $Jssor$.$CssP(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" type="Number" optional="true">
        ///		the value to set
        ///	</param>
        return CssN(elmt, name, value, true);
    }

    function CssProxy(name, numericOrDimension) {
        ///	<summary>
        ///		create proxy to access css, CssProxy(name[, numericOrDimension]);
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="numericOrDimension" type="Number" optional="true">
        ///		not set: access original css, 1: access css as numeric, 2: access css in pixel as numeric
        ///	</param>
        var isDimensional = numericOrDimension & 2;
        var cssAccessor = numericOrDimension ? CssN : Css;
        return function (elmt, value) {
            return cssAccessor(elmt, name, value, isDimensional);
        };
    }

    function GetStyleOpacity(elmt) {
        if (IsBrowserIE() && _BrowserEngineVersion < 9) {
            var match = /opacity=([^)]*)/.exec(elmt.style.filter || "");
            return match ? (ParseFloat(match[1]) / 100) : 1;
        }
        else
            return ParseFloat(elmt.style.opacity || "1");
    }

    function SetStyleOpacity(elmt, opacity, ie9EarlierForce) {

        if (IsBrowserIE() && _BrowserEngineVersion < 9) {
            //var filterName = "filter"; // _BrowserEngineVersion < 8 ? "filter" : "-ms-filter";
            var finalFilter = elmt.style.filter || "";

            // for CSS filter browsers (IE), remove alpha filter if it's unnecessary.
            // update: doing _This always since IE9 beta seems to have broken the
            // behavior if we rely on the programmatic filters collection.
            var alphaReg = new RegExp(/[\s]*alpha\([^\)]*\)/g);

            // important: note the lazy star! _This protects against
            // multiple filters; we don't want to delete the other ones.
            // update: also trimming extra whitespace around filter.

            var ieOpacity = Math.round(100 * opacity);
            var alphaFilter = "";
            if (ieOpacity < 100 || ie9EarlierForce) {
                alphaFilter = "alpha(opacity=" + ieOpacity + ") ";
            }

            var newFilterValue = BuildNewCss(finalFilter, [alphaReg], alphaFilter);

            SetStyleFilterIE(elmt, newFilterValue);
        }
        else {
            elmt.style.opacity = opacity == 1 ? "" : Math.round(opacity * 100) / 100;
        }
    }

    function SetStyleTransformInternal(elmt, transform) {
        var rotate = transform.$Rotate || 0;
        var scale = transform.$Scale == undefined ? 1 : transform.$Scale;

        if (IsBrowserIe9Earlier()) {
            var matrix = _This.$CreateMatrix(rotate / 180 * Math.PI, scale, scale);
            SetStyleMatrixIE(elmt, (!rotate && scale == 1) ? null : matrix, _This.$GetMatrixOffset(matrix, transform.$OriginalWidth, transform.$OriginalHeight));
        }
        else {
            //rotate(15deg) scale(.5) translateZ(0)
            var transformProperty = GetTransformProperty(elmt);
            if (transformProperty) {
                var transformValue = "rotate(" + rotate % 360 + "deg) scale(" + scale + ")";

                //needed for touch device, no need for desktop device
                if (IsBrowserChrome() && _WebkitVersion > 535 && "ontouchstart" in window)
                    transformValue += " perspective(2000px)";

                elmt.style[transformProperty] = transformValue;
            }
        }
    }

    _This.$SetStyleTransform = function (elmt, transform) {
        if (IsBrowserBadTransform()) {
            Delay(_This.$CreateCallback(null, SetStyleTransformInternal, elmt, transform));
        }
        else {
            SetStyleTransformInternal(elmt, transform);
        }
    };

    _This.$SetStyleTransformOrigin = function (elmt, transformOrigin) {
        var transformProperty = GetTransformProperty(elmt);

        if (transformProperty)
            elmt.style[transformProperty + "Origin"] = transformOrigin;
    };

    _This.$CssScale = function (elmt, scale) {

        if (IsBrowserIE() && _BrowserEngineVersion < 9 || (_BrowserEngineVersion < 10 && IsBrowserIeQuirks())) {
            elmt.style.zoom = (scale == 1) ? "" : scale;
        }
        else {
            var transformProperty = GetTransformProperty(elmt);

            if (transformProperty) {
                //rotate(15deg) scale(.5)
                var transformValue = "scale(" + scale + ")";

                var oldTransformValue = elmt.style[transformProperty];
                var scaleReg = new RegExp(/[\s]*scale\(.*?\)/g);

                var newTransformValue = BuildNewCss(oldTransformValue, [scaleReg], transformValue);

                elmt.style[transformProperty] = newTransformValue;
            }
        }
    };

    _This.$EnableHWA = function (elmt) {
        if (!elmt.style[GetTransformProperty(elmt)] || elmt.style[GetTransformProperty(elmt)] == "none")
            elmt.style[GetTransformProperty(elmt)] = "perspective(2000px)";
    };

    _This.$DisableHWA = function (elmt) {
        elmt.style[GetTransformProperty(elmt)] = "none";
    };

    var ie8OffsetWidth = 0;
    var ie8OffsetHeight = 0;

    _This.$WindowResizeFilter = function (window, handler) {
        return IsBrowserIe9Earlier() ? function () {

            var trigger = true;

            var checkElement = (IsBrowserIeQuirks() ? window.document.body : window.document.documentElement);
            if (checkElement) {
                var widthChange = checkElement.offsetWidth - ie8OffsetWidth;
                var heightChange = checkElement.offsetHeight - ie8OffsetHeight;
                if (widthChange || heightChange) {
                    ie8OffsetWidth += widthChange;
                    ie8OffsetHeight += heightChange;
                }
                else
                    trigger = false;
            }

            trigger && handler();

        } : handler;
    };

    _This.$MouseOverOutFilter = function (handler, target) {
        ///	<param name="target" type="HTMLDomElement">
        ///		The target element to detect mouse over/out events. (for ie < 9 compatibility)
        ///	</param>

        $JssorDebug$.$Execute(function () {
            if (!target) {
                throw new Error("Null reference, parameter \"target\".");
            }
        });

        return function (event) {
            event = GetEvent(event);

            var eventName = event.type;
            var related = event.relatedTarget || (eventName == "mouseout" ? event.toElement : event.fromElement);

            if (!related || (related !== target && !_This.$IsChild(target, related))) {
                handler(event);
            }
        };
    };

    _This.$AddEvent = function (elmt, eventName, handler, useCapture) {
        elmt = _This.$GetElement(elmt);

        $JssorDebug$.$Execute(function () {
            if (!elmt) {
                $JssorDebug$.$Fail("Parameter 'elmt' not specified.");
            }

            if (!handler) {
                $JssorDebug$.$Fail("Parameter 'handler' not specified.");
            }

            if (!elmt.addEventListener && !elmt.attachEvent) {
                $JssorDebug$.$Fail("Unable to attach event handler, no known technique.");
            }
        });

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (elmt.addEventListener) {
            if (eventName == "mousewheel") {
                elmt.addEventListener("DOMMouseScroll", handler, useCapture);
            }
            // we are still going to add the mousewheel -- not a mistake!
            // _This is for opera, since it uses onmousewheel but needs addEventListener.
            elmt.addEventListener(eventName, handler, useCapture);
        }
        else if (elmt.attachEvent) {
            elmt.attachEvent("on" + eventName, handler);
            if (useCapture && elmt.setCapture) {
                elmt.setCapture();
            }
        }
    };

    _This.$RemoveEvent = function (elmt, eventName, handler, useCapture) {
        elmt = _This.$GetElement(elmt);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (elmt.removeEventListener) {
            if (eventName == "mousewheel") {
                elmt.removeEventListener("DOMMouseScroll", handler, useCapture);
            }
            // we are still going to remove the mousewheel -- not a mistake!
            // _This is for opera, since it uses onmousewheel but needs removeEventListener.
            elmt.removeEventListener(eventName, handler, useCapture);
        }
        else if (elmt.detachEvent) {
            elmt.detachEvent("on" + eventName, handler);
            if (useCapture && elmt.releaseCapture) {
                elmt.releaseCapture();
            }
        }
    };

    _This.$FireEvent = function (elmt, eventName) {
        //var document = elmt.document;

        $JssorDebug$.$Execute(function () {
            if (!document.createEvent && !document.createEventObject) {
                $JssorDebug$.$Fail("Unable to fire event, no known technique.");
            }

            if (!elmt.dispatchEvent && !elmt.fireEvent) {
                $JssorDebug$.$Fail("Unable to fire event, no known technique.");
            }
        });

        var evento;

        if (document.createEvent) {
            evento = document.createEvent("HTMLEvents");
            evento.initEvent(eventName, false, false);
            elmt.dispatchEvent(evento);
        }
        else {
            var ieEventName = "on" + eventName;
            evento = document.createEventObject();

            elmt.fireEvent(ieEventName, evento);
        }
    };

    _This.$CancelEvent = function (event) {
        event = GetEvent(event);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (event.preventDefault) {
            event.preventDefault();     // W3C for preventing default
        }

        event.cancel = true;            // legacy for preventing default
        event.returnValue = false;      // IE for preventing default
    };

    _This.$StopEvent = function (event) {
        event = GetEvent(event);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (event.stopPropagation) {
            event.stopPropagation();    // W3C for stopping propagation
        }

        event.cancelBubble = true;      // IE for stopping propagation
    };

    _This.$CreateCallback = function (object, method) {
        // create callback args
        var initialArgs = [].slice.call(arguments, 2);

        // create closure to apply method
        var callback = function () {
            // concatenate new args, but make a copy of initialArgs first
            var args = initialArgs.concat([].slice.call(arguments, 0));

            return method.apply(object, args);
        };

        //$JssorDebug$.$LiveStamp(callback, "callback_" + ($Jssor$.$GetNow() & 0xFFFFFF));

        return callback;
    };

    _This.$InnerText = function (elmt, text) {
        if (text == undefined)
            return elmt.textContent || elmt.innerText;

        var textNode = document.createTextNode(text);
        _This.$Empty(elmt);
        elmt.appendChild(textNode);
    };

    _This.$InnerHtml = function (elmt, html) {
        if (html == undefined)
            return elmt.innerHTML;

        elmt.innerHTML = html;
    };

    _This.$GetClientRect = function (elmt) {
        var rect = elmt.getBoundingClientRect();

        return { x: rect.left, y: rect.top, w: rect.right - rect.left, h: rect.bottom - rect.top };
    };

    _This.$ClearInnerHtml = function (elmt) {
        elmt.innerHTML = "";
    };

    _This.$EncodeHtml = function (text) {
        var div = _This.$CreateDiv();
        _This.$InnerText(div, text);
        return _This.$InnerHtml(div);
    };

    _This.$DecodeHtml = function (html) {
        var div = _This.$CreateDiv();
        _This.$InnerHtml(div, html);
        return _This.$InnerText(div);
    };

    _This.$SelectElement = function (elmt) {
        var userSelection;
        if (window.getSelection) {
            //W3C default
            userSelection = window.getSelection();
        }
        var theRange = null;
        if (document.createRange) {
            theRange = document.createRange();
            theRange.selectNode(elmt);
        }
        else {
            theRange = document.body.createTextRange();
            theRange.moveToElementText(elmt);
            theRange.select();
        }
        //set user selection
        if (userSelection)
            userSelection.addRange(theRange);
    };

    _This.$DeselectElements = function () {
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    };

    _This.$Children = function (elmt, includeAll) {
        var children = [];

        for (var tmpEl = elmt.firstChild; tmpEl; tmpEl = tmpEl.nextSibling) {
            if (includeAll || tmpEl.nodeType == 1) {
                children.push(tmpEl);
            }
        }

        return children;
    };

    function FindChild(elmt, attrValue, noDeep, attrName) {
        attrName = attrName || "u";

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (AttributeEx(elmt, attrName) == attrValue)
                    return elmt;

                if (!noDeep) {
                    var childRet = FindChild(elmt, attrValue, noDeep, attrName);
                    if (childRet)
                        return childRet;
                }
            }
        }
    }

    _This.$FindChild = FindChild;

    function FindChildren(elmt, attrValue, noDeep, attrName) {
        attrName = attrName || "u";

        var ret = [];

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (AttributeEx(elmt, attrName) == attrValue)
                    ret.push(elmt);

                if (!noDeep) {
                    var childRet = FindChildren(elmt, attrValue, noDeep, attrName);
                    if (childRet.length)
                        ret = ret.concat(childRet);
                }
            }
        }

        return ret;
    }

    _This.$FindChildren = FindChildren;

    function FindChildByTag(elmt, tagName, noDeep) {

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (elmt.tagName == tagName)
                    return elmt;

                if (!noDeep) {
                    var childRet = FindChildByTag(elmt, tagName, noDeep);
                    if (childRet)
                        return childRet;
                }
            }
        }
    }

    _This.$FindChildByTag = FindChildByTag;

    function FindChildrenByTag(elmt, tagName, noDeep) {
        var ret = [];

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (!tagName || elmt.tagName == tagName)
                    ret.push(elmt);

                if (!noDeep) {
                    var childRet = FindChildrenByTag(elmt, tagName, noDeep);
                    if (childRet.length)
                        ret = ret.concat(childRet);
                }
            }
        }

        return ret;
    }

    _This.$FindChildrenByTag = FindChildrenByTag;

    _This.$GetElementsByTag = function (elmt, tagName) {
        return elmt.getElementsByTagName(tagName);
    };

    //function Extend() {
    //    var args = arguments;
    //    var target;
    //    var options;
    //    var propName;
    //    var propValue;
    //    var targetPropValue;
    //    var purpose = 7 & args[0];
    //    var deep = 1 & purpose;
    //    var unextend = 2 & purpose;
    //    var i = purpose ? 2 : 1;
    //    target = args[i - 1] || {};

    //    for (; i < args.length; i++) {
    //        // Only deal with non-null/undefined values
    //        if (options = args[i]) {
    //            // Extend the base object
    //            for (propName in options) {
    //                propValue = options[propName];

    //                if (propValue !== undefined) {
    //                    propValue = options[propName];

    //                    if (unextend) {
    //                        targetPropValue = target[propName];
    //                        if (propValue === targetPropValue)
    //                            delete target[propName];
    //                        else if (deep && IsPlainObject(targetPropValue)) {
    //                            Extend(purpose, targetPropValue, propValue);
    //                        }
    //                    }
    //                    else {
    //                        target[propName] = (deep && IsPlainObject(target[propName])) ? Extend(purpose | 4, {}, propValue) : propValue;
    //                    }
    //                }
    //            }
    //        }
    //    }

    //    // Return the modified object
    //    return target;
    //}

    //function Unextend() {
    //    var args = arguments;
    //    var newArgs = [].slice.call(arguments);
    //    var purpose = 1 & args[0];

    //    purpose && newArgs.shift();
    //    newArgs.unshift(purpose | 2);

    //    return Extend.apply(null, newArgs);
    //}

    function Extend() {
        var args = arguments;
        var target;
        var options;
        var propName;
        var propValue;
        var deep = 1 & args[0];
        var i = 1 + deep;
        target = args[i - 1] || {};

        for (; i < args.length; i++) {
            // Only deal with non-null/undefined values
            if (options = args[i]) {
                // Extend the base object
                for (propName in options) {
                    propValue = options[propName];

                    if (propValue !== undefined) {
                        propValue = options[propName];
                        target[propName] = (deep && IsPlainObject(target[propName])) ? Extend(deep, {}, propValue) : propValue;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }

    _This.$Extend = Extend;

    function Unextend(target, option) {
        $JssorDebug$.$Assert(option);

        var unextended = {};
        var name;
        var targetProp;
        var optionProp;

        // Extend the base object
        for (name in target) {
            targetProp = target[name];
            optionProp = option[name];

            if (targetProp !== optionProp) {
                var exclude;

                if (IsPlainObject(targetProp) && IsPlainObject(optionProp)) {
                    targetProp = Unextend(optionProp);
                    exclude = !IsNotEmpty(targetProp);
                }
                
                !exclude && (unextended[name] = targetProp);
            }
        }

        // Return the modified object
        return unextended;
    }

    _This.$Unextend = Unextend;

    _This.$IsFunction = function (obj) {
        return Type(obj) == "function";
    };

    _This.$IsArray = function (obj) {
        return Type(obj) == "array";
    };

    _This.$IsString = function (obj) {
        return Type(obj) == "string";
    };

    _This.$IsNumeric = function (obj) {
        return !isNaN(ParseFloat(obj)) && isFinite(obj);
    };

    _This.$Type = Type;

    // args is for internal usage only
    _This.$Each = Each;

    _This.$IsNotEmpty = IsNotEmpty;

    _This.$IsPlainObject = IsPlainObject;

    function CreateElement(tagName) {
        return document.createElement(tagName);
    }

    _This.$CreateElement = CreateElement;

    _This.$CreateDiv = function () {
        return CreateElement("DIV");
    };

    _This.$CreateSpan = function () {
        return CreateElement("SPAN");
    };

    _This.$EmptyFunction = function () { };

    function Attribute(elmt, name, value) {
        if (value == undefined)
            return elmt.getAttribute(name);

        elmt.setAttribute(name, value);
    }

    function AttributeEx(elmt, name) {
        return Attribute(elmt, name) || Attribute(elmt, "data-" + name);
    }

    _This.$Attribute = Attribute;
    _This.$AttributeEx = AttributeEx;

    function ClassName(elmt, className) {
        if (className == undefined)
            return elmt.className;

        elmt.className = className;
    }

    _This.$ClassName = ClassName;

    function ToHash(array) {
        var hash = {};

        Each(array, function (item) {
            hash[item] = item;
        });

        return hash;
    }

    function Split(str, separator) {
        return str.match(separator || REGEX_WHITESPACE_GLOBAL);
    }

    function StringToHashObject(str, regExp) {
        return ToHash(Split(str || "", regExp));
    }

    _This.$ToHash = ToHash;
    _This.$Split = Split;

    function Join(separator, strings) {
        ///	<param name="separator" type="String">
        ///	</param>
        ///	<param name="strings" type="Array" value="['1']">
        ///	</param>

        var joined = "";

        Each(strings, function (str) {
            joined && (joined += separator);
            joined += str;
        });

        return joined;
    }

    function ReplaceClass(elmt, oldClassName, newClassName) {
        ClassName(elmt, Join(" ", Extend(Unextend(StringToHashObject(ClassName(elmt)), StringToHashObject(oldClassName)), StringToHashObject(newClassName))));
    }

    _This.$Join = Join;

    _This.$AddClass = function (elmt, className) {
        ReplaceClass(elmt, null, className);
    };

    _This.$RemoveClass = ReplaceClass;

    _This.$ReplaceClass = ReplaceClass;

    _This.$ParentNode = function (elmt) {
        return elmt.parentNode;
    };

    _This.$HideElement = function (elmt) {
        _This.$CssDisplay(elmt, "none");
    };

    _This.$EnableElement = function (elmt, notEnable) {
        if (notEnable) {
            _This.$Attribute(elmt, "disabled", true);
        }
        else {
            _This.$RemoveAttribute(elmt, "disabled");
        }
    };

    _This.$HideElements = function (elmts) {
        for (var i = 0; i < elmts.length; i++) {
            _This.$HideElement(elmts[i]);
        }
    };

    _This.$ShowElement = function (elmt, hide) {
        _This.$CssDisplay(elmt, hide ? "none" : "");
    };

    _This.$ShowElements = function (elmts, hide) {
        for (var i = 0; i < elmts.length; i++) {
            _This.$ShowElement(elmts[i], hide);
        }
    };

    _This.$RemoveAttribute = function (elmt, attrbuteName) {
        elmt.removeAttribute(attrbuteName);
    };

    _This.$CanClearClip = function () {
        return IsBrowserIE() && _BrowserRuntimeVersion < 10;
    };

    _This.$SetStyleClip = function (elmt, clip) {
        if (clip) {
            elmt.style.clip = "rect(" + Math.round(clip.$Top) + "px " + Math.round(clip.$Right) + "px " + Math.round(clip.$Bottom) + "px " + Math.round(clip.$Left) + "px)";
        }
        else {
            var cssText = elmt.style.cssText;
            var clipRegs = [
                new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i),
                new RegExp(/[\s]*cliptop: .*?[;]?/i),
                new RegExp(/[\s]*clipright: .*?[;]?/i),
                new RegExp(/[\s]*clipbottom: .*?[;]?/i),
                new RegExp(/[\s]*clipleft: .*?[;]?/i)
            ];

            var newCssText = BuildNewCss(cssText, clipRegs, "");

            $Jssor$.$CssCssText(elmt, newCssText);
        }
    };

    _This.$GetNow = function () {
        return new Date().getTime();
    };

    _This.$AppendChild = function (elmt, child) {
        elmt.appendChild(child);
    };

    _This.$AppendChildren = function (elmt, children) {
        Each(children, function (child) {
            _This.$AppendChild(elmt, child);
        });
    };

    _This.$InsertBefore = function (newNode, refNode, pNode) {
        ///	<summary>
        ///		Insert a node before a reference node
        ///	</summary>
        ///	<param name="newNode" type="HTMLElement">
        ///		A new node to insert
        ///	</param>
        ///	<param name="refNode" type="HTMLElement">
        ///		The reference node to insert a new node before
        ///	</param>
        ///	<param name="pNode" type="HTMLElement" optional="true">
        ///		The parent node to insert node to
        ///	</param>

        (pNode || refNode.parentNode).insertBefore(newNode, refNode);
    };

    _This.$InsertAfter = function (newNode, refNode, pNode) {
        ///	<summary>
        ///		Insert a node after a reference node
        ///	</summary>
        ///	<param name="newNode" type="HTMLElement">
        ///		A new node to insert
        ///	</param>
        ///	<param name="refNode" type="HTMLElement">
        ///		The reference node to insert a new node after
        ///	</param>
        ///	<param name="pNode" type="HTMLElement" optional="true">
        ///		The parent node to insert node to
        ///	</param>

        _This.$InsertBefore(newNode, refNode.nextSibling, pNode || refNode.parentNode);
    };

    _This.$InsertAdjacentHtml = function (elmt, where, html) {
        elmt.insertAdjacentHTML(where, html);
    };

    _This.$RemoveElement = function (elmt, pNode) {
        ///	<summary>
        ///		Remove element from parent node
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		The element to remove
        ///	</param>
        ///	<param name="pNode" type="HTMLElement" optional="true">
        ///		The parent node to remove elment from
        ///	</param>
        (pNode || elmt.parentNode).removeChild(elmt);
    };

    _This.$RemoveElements = function (elmts, pNode) {
        Each(elmts, function (elmt) {
            _This.$RemoveElement(elmt, pNode);
        });
    };

    _This.$Empty = function (elmt) {
        _This.$RemoveElements(_This.$Children(elmt, true), elmt);
    };

    _This.$ParseInt = function (str, radix) {
        return parseInt(str, radix || 10);
    };

    var ParseFloat = parseFloat;

    _This.$ParseFloat = ParseFloat;

    _This.$IsChild = function (elmtA, elmtB) {
        var body = document.body;

        while (elmtB && elmtA !== elmtB && body !== elmtB) {
            try {
                elmtB = elmtB.parentNode;
            } catch (e) {
                // Firefox sometimes fires events for XUL elements, which throws
                // a "permission denied" error. so this is not a child.
                return false;
            }
        }

        return elmtA === elmtB;
    };

    function CloneNode(elmt, noDeep, keepId) {
        var clone = elmt.cloneNode(!noDeep);
        if (!keepId) {
            _This.$RemoveAttribute(clone, "id");
        }

        return clone;
    }

    _This.$CloneNode = CloneNode;

    _This.$LoadImage = function (src, callback) {
        var image = new Image();

        function LoadImageCompleteHandler(event, abort) {
            _This.$RemoveEvent(image, "load", LoadImageCompleteHandler);
            _This.$RemoveEvent(image, "abort", ErrorOrAbortHandler);
            _This.$RemoveEvent(image, "error", ErrorOrAbortHandler);

            if (callback)
                callback(image, abort);
        }

        function ErrorOrAbortHandler(event) {
            LoadImageCompleteHandler(event, true);
        }

        if (IsBrowserOpera() && _BrowserRuntimeVersion < 11.6 || !src) {
            LoadImageCompleteHandler(!src);
        }
        else {

            _This.$AddEvent(image, "load", LoadImageCompleteHandler);
            _This.$AddEvent(image, "abort", ErrorOrAbortHandler);
            _This.$AddEvent(image, "error", ErrorOrAbortHandler);

            image.src = src;
        }
    };

    _This.$LoadImages = function (imageElmts, mainImageElmt, callback) {

        var _ImageLoading = imageElmts.length + 1;

        function LoadImageCompleteEventHandler(image, abort) {

            _ImageLoading--;
            if (mainImageElmt && image && image.src == mainImageElmt.src)
                mainImageElmt = image;
            !_ImageLoading && callback && callback(mainImageElmt);
        }

        Each(imageElmts, function (imageElmt) {
            _This.$LoadImage(imageElmt.src, LoadImageCompleteEventHandler);
        });

        LoadImageCompleteEventHandler();
    };

    _This.$BuildElement = function (template, tagName, replacer, createCopy) {
        if (createCopy)
            template = CloneNode(template);

        var templateHolders = FindChildren(template, tagName);
        if (!templateHolders.length)
            templateHolders = $Jssor$.$GetElementsByTag(template, tagName);

        for (var j = templateHolders.length - 1; j > -1; j--) {
            var templateHolder = templateHolders[j];
            var replaceItem = CloneNode(replacer);
            ClassName(replaceItem, ClassName(templateHolder));
            $Jssor$.$CssCssText(replaceItem, templateHolder.style.cssText);

            $Jssor$.$InsertBefore(replaceItem, templateHolder);
            $Jssor$.$RemoveElement(templateHolder);
        }

        return template;
    };

    function JssorButtonEx(elmt) {
        var _Self = this;

        var _OriginClassName = "";
        var _ToggleClassSuffixes = ["av", "pv", "ds", "dn"];
        var _ToggleClasses = [];
        var _ToggleClassName;

        var _IsMouseDown = 0;   //class name 'dn'
        var _IsSelected = 0;    //class name 1(active): 'av', 2(passive): 'pv'
        var _IsDisabled = 0;    //class name 'ds'

        function Highlight() {
            ReplaceClass(elmt, _ToggleClassName, _ToggleClasses[_IsDisabled || _IsMouseDown || (_IsSelected & 2) || _IsSelected]);
            $Jssor$.$Css(elmt, "pointer-events", _IsDisabled ? "none" : "");
        }

        function MouseUpOrCancelEventHandler(event) {
            _IsMouseDown = 0;

            Highlight();

            _This.$RemoveEvent(document, "mouseup", MouseUpOrCancelEventHandler);
            _This.$RemoveEvent(document, "touchend", MouseUpOrCancelEventHandler);
            _This.$RemoveEvent(document, "touchcancel", MouseUpOrCancelEventHandler);
        }

        function MouseDownEventHandler(event) {
            if (_IsDisabled) {
                _This.$CancelEvent(event);
            }
            else {

                _IsMouseDown = 4;

                Highlight();

                _This.$AddEvent(document, "mouseup", MouseUpOrCancelEventHandler);
                _This.$AddEvent(document, "touchend", MouseUpOrCancelEventHandler);
                _This.$AddEvent(document, "touchcancel", MouseUpOrCancelEventHandler);
            }
        }

        _Self.$Selected = function (activate) {
            if (activate != undefined) {
                _IsSelected = (activate & 2) || (activate & 1);

                Highlight();
            }
            else {
                return _IsSelected;
            }
        };

        _Self.$Enable = function (enable) {
            if (enable == undefined) {
                return !_IsDisabled;
            }

            _IsDisabled = enable ? 0 : 3;

            Highlight();
        };

        //JssorButtonEx Constructor
        {
            elmt = _This.$GetElement(elmt);

            var originalClassNameArray = $Jssor$.$Split(ClassName(elmt));
            if (originalClassNameArray)
                _OriginClassName = originalClassNameArray.shift();

            Each(_ToggleClassSuffixes, function (toggleClassSuffix) {
                _ToggleClasses.push(_OriginClassName +toggleClassSuffix);
            });

            _ToggleClassName = Join(" ", _ToggleClasses);

            _ToggleClasses.unshift("");

            _This.$AddEvent(elmt, "mousedown", MouseDownEventHandler);
            _This.$AddEvent(elmt, "touchstart", MouseDownEventHandler);
        }
    }

    _This.$Buttonize = function (elmt) {
        return new JssorButtonEx(elmt);
    };

    _This.$Css = Css;
    _This.$CssN = CssN;
    _This.$CssP = CssP;

    _This.$CssOverflow = CssProxy("overflow");

    _This.$CssTop = CssProxy("top", 2);
    _This.$CssLeft = CssProxy("left", 2);
    _This.$CssWidth = CssProxy("width", 2);
    _This.$CssHeight = CssProxy("height", 2);
    _This.$CssMarginLeft = CssProxy("marginLeft", 2);
    _This.$CssMarginTop = CssProxy("marginTop", 2);
    _This.$CssPosition = CssProxy("position");
    _This.$CssDisplay = CssProxy("display");
    _This.$CssZIndex = CssProxy("zIndex", 1);
    _This.$CssFloat = function (elmt, floatValue) {
        return Css(elmt, IsBrowserIE() ? "styleFloat" : "cssFloat", floatValue);
    };
    _This.$CssOpacity = function (elmt, opacity, ie9EarlierForce) {
        if (opacity != undefined) {
            SetStyleOpacity(elmt, opacity, ie9EarlierForce);
        }
        else {
            return GetStyleOpacity(elmt);
        }
    };

    _This.$CssCssText = function (elmt, text) {
        if (text != undefined) {
            elmt.style.cssText = text;
        }
        else {
            return elmt.style.cssText;
        }
    };

    var _StyleGetter = {
        $Opacity: _This.$CssOpacity,
        $Top: _This.$CssTop,
        $Left: _This.$CssLeft,
        $Width: _This.$CssWidth,
        $Height: _This.$CssHeight,
        $Position: _This.$CssPosition,
        $Display: _This.$CssDisplay,
        $ZIndex: _This.$CssZIndex
    };

    var _StyleSetterReserved;

    function StyleSetter() {
        if (!_StyleSetterReserved) {
            _StyleSetterReserved = Extend({
                $MarginTop: _This.$CssMarginTop,
                $MarginLeft: _This.$CssMarginLeft,
                $Clip: _This.$SetStyleClip,
                $Transform: _This.$SetStyleTransform
            }, _StyleGetter);
        }
        return _StyleSetterReserved;
    }

    function StyleSetterEx() {
        StyleSetter();

        //For Compression Only
        _StyleSetterReserved.$Transform = _StyleSetterReserved.$Transform;

        return _StyleSetterReserved;
    }

    _This.$StyleSetter = StyleSetter;

    _This.$StyleSetterEx = StyleSetterEx;

    _This.$GetStyles = function (elmt, originStyles) {
        StyleSetter();

        var styles = {};

        Each(originStyles, function (value, key) {
            if (_StyleGetter[key]) {
                styles[key] = _StyleGetter[key](elmt);
            }
        });

        return styles;
    };

    _This.$SetStyles = function (elmt, styles) {
        var styleSetter = StyleSetter();

        Each(styles, function (value, key) {
            styleSetter[key] && styleSetter[key](elmt, value);
        });
    };

    _This.$SetStylesEx = function (elmt, styles) {
        StyleSetterEx();

        _This.$SetStyles(elmt, styles);
    };

    var $JssorMatrix$ = new function () {
        var _ThisMatrix = this;

        function Multiply(ma, mb) {
            var acs = ma[0].length;
            var rows = ma.length;
            var cols = mb[0].length;

            var matrix = [];

            for (var r = 0; r < rows; r++) {
                var row = matrix[r] = [];
                for (var c = 0; c < cols; c++) {
                    var unitValue = 0;

                    for (var ac = 0; ac < acs; ac++) {
                        unitValue += ma[r][ac] * mb[ac][c];
                    }

                    row[c] = unitValue;
                }
            }

            return matrix;
        }

        _ThisMatrix.$ScaleX = function (matrix, sx) {
            return _ThisMatrix.$ScaleXY(matrix, sx, 0);
        };

        _ThisMatrix.$ScaleY = function (matrix, sy) {
            return _ThisMatrix.$ScaleXY(matrix, 0, sy);
        };

        _ThisMatrix.$ScaleXY = function (matrix, sx, sy) {
            return Multiply(matrix, [[sx, 0], [0, sy]]);
        };

        _ThisMatrix.$TransformPoint = function (matrix, p) {
            var pMatrix = Multiply(matrix, [[p.x], [p.y]]);

            return Point(pMatrix[0][0], pMatrix[1][0]);
        };
    };

    _This.$CreateMatrix = function (alpha, scaleX, scaleY) {
        var cos = Math.cos(alpha);
        var sin = Math.sin(alpha);
        //var r11 = cos;
        //var r21 = sin;
        //var r12 = -sin;
        //var r22 = cos;

        //var m11 = cos * scaleX;
        //var m12 = -sin * scaleY;
        //var m21 = sin * scaleX;
        //var m22 = cos * scaleY;

        return [[cos * scaleX, -sin * scaleY], [sin * scaleX, cos * scaleY]];
    };

    _This.$GetMatrixOffset = function (matrix, width, height) {
        var p1 = $JssorMatrix$.$TransformPoint(matrix, Point(-width / 2, -height / 2));
        var p2 = $JssorMatrix$.$TransformPoint(matrix, Point(width / 2, -height / 2));
        var p3 = $JssorMatrix$.$TransformPoint(matrix, Point(width / 2, height / 2));
        var p4 = $JssorMatrix$.$TransformPoint(matrix, Point(-width / 2, height / 2));

        return Point(Math.min(p1.x, p2.x, p3.x, p4.x) + width / 2, Math.min(p1.y, p2.y, p3.y, p4.y) + height / 2);
    };

    _This.$Cast = function (fromStyles, difStyles, interPosition, easings, durings, rounds, options) {

        var currentStyles = difStyles;

        if (fromStyles) {
            currentStyles = {};

            for (var key in difStyles) {

                var round = rounds[key] || 1;
                var during = durings[key] || [0, 1];
                var propertyInterPosition = (interPosition - during[0]) / during[1];
                propertyInterPosition = Math.min(Math.max(propertyInterPosition, 0), 1);
                propertyInterPosition = propertyInterPosition * round;
                var floorPosition = Math.floor(propertyInterPosition);
                if (propertyInterPosition != floorPosition)
                    propertyInterPosition -= floorPosition;

                var easing = easings[key] || easings.$Default || $JssorEasing$.$EaseSwing;
                var easingValue = easing(propertyInterPosition);
                var currentPropertyValue;
                var value = fromStyles[key];
                var toValue = difStyles[key];
                var difValue = difStyles[key];

                if ($Jssor$.$IsNumeric(difValue)) {
                    currentPropertyValue = value + difValue * easingValue;
                }
                else {
                    currentPropertyValue = $Jssor$.$Extend({ $Offset: {} }, fromStyles[key]);

                    $Jssor$.$Each(difValue.$Offset, function (rectX, n) {
                        var offsetValue = rectX * easingValue;
                        currentPropertyValue.$Offset[n] = offsetValue;
                        currentPropertyValue[n] += offsetValue;
                    });
                }
                currentStyles[key] = currentPropertyValue;
            }

            if (difStyles.$Zoom || difStyles.$Rotate) {
                currentStyles.$Transform = { $Rotate: currentStyles.$Rotate || 0, $Scale: currentStyles.$Zoom, $OriginalWidth: options.$OriginalWidth, $OriginalHeight: options.$OriginalHeight };
            }
        }

        if (difStyles.$Clip && options.$Move) {
            var styleFrameNClipOffset = currentStyles.$Clip.$Offset;

            var offsetY = (styleFrameNClipOffset.$Top || 0) + (styleFrameNClipOffset.$Bottom || 0);
            var offsetX = (styleFrameNClipOffset.$Left || 0) + (styleFrameNClipOffset.$Right || 0);

            currentStyles.$Left = (currentStyles.$Left || 0) + offsetX;
            currentStyles.$Top = (currentStyles.$Top || 0) + offsetY;
            currentStyles.$Clip.$Left -= offsetX;
            currentStyles.$Clip.$Right -= offsetX;
            currentStyles.$Clip.$Top -= offsetY;
            currentStyles.$Clip.$Bottom -= offsetY;
        }

        if (currentStyles.$Clip && $Jssor$.$CanClearClip() && !currentStyles.$Clip.$Top && !currentStyles.$Clip.$Left && (currentStyles.$Clip.$Right == options.$OriginalWidth) && (currentStyles.$Clip.$Bottom == options.$OriginalHeight))
            currentStyles.$Clip = null;

        return currentStyles;
    };
};

//$JssorObject$
function $JssorObject$() {
    var _ThisObject = this;
    // Fields

    var _Listeners = []; // dictionary of eventName --> array of handlers
    var _Listenees = [];

    // Private Methods
    function AddListener(eventName, handler) {

        $JssorDebug$.$Execute(function () {
            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }

            $Jssor$.$Each(_Listeners, function (listener) {
                if (listener.$EventName == eventName && listener.$Handler === handler) {
                    throw new Error("The handler listened to the event already, cannot listen to the same event of the same object with the same handler twice.");
                }
            });
        });

        _Listeners.push({ $EventName: eventName, $Handler: handler });
    }

    function RemoveListener(eventName, handler) {

        $JssorDebug$.$Execute(function () {
            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }
        });

        $Jssor$.$Each(_Listeners, function (listener, index) {
            if (listener.$EventName == eventName && listener.$Handler === handler) {
                _Listeners.splice(index, 1);
            }
        });
    }

    function ClearListeners() {
        _Listeners = [];
    }

    function ClearListenees() {

        $Jssor$.$Each(_Listenees, function (listenee) {
            $Jssor$.$RemoveEvent(listenee.$Obj, listenee.$EventName, listenee.$Handler);
        });

        _Listenees = [];
    }

    //Protected Methods
    _ThisObject.$Listen = function (obj, eventName, handler, useCapture) {

        $JssorDebug$.$Execute(function () {
            if (!obj)
                throw new Error("param 'obj' is null or empty.");

            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }

            $Jssor$.$Each(_Listenees, function (listenee) {
                if (listenee.$Obj === obj && listenee.$EventName == eventName && listenee.$Handler === handler) {
                    throw new Error("The handler listened to the event already, cannot listen to the same event of the same object with the same handler twice.");
                }
            });
        });

        $Jssor$.$AddEvent(obj, eventName, handler, useCapture);
        _Listenees.push({ $Obj: obj, $EventName: eventName, $Handler: handler });
    };

    _ThisObject.$Unlisten = function (obj, eventName, handler) {

        $JssorDebug$.$Execute(function () {
            if (!obj)
                throw new Error("param 'obj' is null or empty.");

            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }
        });

        $Jssor$.$Each(_Listenees, function (listenee, index) {
            if (listenee.$Obj === obj && listenee.$EventName == eventName && listenee.$Handler === handler) {
                $Jssor$.$RemoveEvent(obj, eventName, handler);
                _Listenees.splice(index, 1);
            }
        });
    };

    _ThisObject.$UnlistenAll = ClearListenees;

    // Public Methods
    _ThisObject.$On = _ThisObject.addEventListener = AddListener;

    _ThisObject.$Off = _ThisObject.removeEventListener = RemoveListener;

    _ThisObject.$TriggerEvent = function (eventName) {

        var args = [].slice.call(arguments, 1);

        $Jssor$.$Each(_Listeners, function (listener) {
            listener.$EventName == eventName && listener.$Handler.apply(window, args);
        });
    };

    _ThisObject.$Destroy = function () {
        ClearListenees();
        ClearListeners();

        for (var name in _ThisObject)
            delete _ThisObject[name];
    };

    $JssorDebug$.$C_AbstractClass(_ThisObject);
};

function $JssorAnimator$(delay, duration, options, elmt, fromStyles, difStyles) {
    delay = delay || 0;

    var _ThisAnimator = this;
    var _AutoPlay;
    var _Hiden;
    var _CombineMode;
    var _PlayToPosition;
    var _PlayDirection;
    var _NoStop;
    var _TimeStampLastFrame = 0;

    var _SubEasings;
    var _SubRounds;
    var _SubDurings;
    var _Callback;

    var _Shift = 0;
    var _Position_Current = 0;
    var _Position_Display = 0;
    var _Hooked;

    var _Position_InnerBegin = delay;
    var _Position_InnerEnd = delay + duration;
    var _Position_OuterBegin;
    var _Position_OuterEnd;
    var _LoopLength;

    var _NestedAnimators = [];
    var _StyleSetter;

    function GetPositionRange(position, begin, end) {
        var range = 0;

        if (position < begin)
            range = -1;

        else if (position > end)
            range = 1;

        return range;
    }

    function GetInnerPositionRange(position) {
        return GetPositionRange(position, _Position_InnerBegin, _Position_InnerEnd);
    }

    function GetOuterPositionRange(position) {
        return GetPositionRange(position, _Position_OuterBegin, _Position_OuterEnd);
    }

    function Shift(offset) {
        _Position_OuterBegin += offset;
        _Position_OuterEnd += offset;
        _Position_InnerBegin += offset;
        _Position_InnerEnd += offset;

        _Position_Current += offset;
        _Position_Display += offset;

        _Shift = offset;
    }

    function Locate(position, relative) {
        var offset = position - _Position_OuterBegin + delay * relative;

        Shift(offset);

        //$JssorDebug$.$Execute(function () {
        //    _ThisAnimator.$Position_InnerBegin = _Position_InnerBegin;
        //    _ThisAnimator.$Position_InnerEnd = _Position_InnerEnd;
        //    _ThisAnimator.$Position_OuterBegin = _Position_OuterBegin;
        //    _ThisAnimator.$Position_OuterEnd = _Position_OuterEnd;
        //});

        return _Position_OuterEnd;
    }

    function GoToPosition(positionOuter, force) {
        var trimedPositionOuter = positionOuter;

        if (_LoopLength && (trimedPositionOuter >= _Position_OuterEnd || trimedPositionOuter <= _Position_OuterBegin)) {
            trimedPositionOuter = ((trimedPositionOuter - _Position_OuterBegin) % _LoopLength + _LoopLength) % _LoopLength + _Position_OuterBegin;
        }

        if (!_Hooked || _NoStop || force || _Position_Current != trimedPositionOuter) {

            var positionToDisplay = Math.min(trimedPositionOuter, _Position_OuterEnd);
            positionToDisplay = Math.max(positionToDisplay, _Position_OuterBegin);

            if (!_Hooked || _NoStop || force || positionToDisplay != _Position_Display) {

                if (difStyles) {

                    var interPosition = (positionToDisplay - _Position_InnerBegin) / (duration || 1);

                    if (options.$Reverse)
                        interPosition = 1 - interPosition;

                    var currentStyles = $Jssor$.$Cast(fromStyles, difStyles, interPosition, _SubEasings, _SubDurings, _SubRounds, options);

                    $Jssor$.$Each(currentStyles, function (value, key) {
                        _StyleSetter[key] && _StyleSetter[key](elmt, value);
                    });
                }

                _ThisAnimator.$OnInnerOffsetChange(_Position_Display - _Position_InnerBegin, positionToDisplay - _Position_InnerBegin);

                _Position_Display = positionToDisplay;

                $Jssor$.$Each(_NestedAnimators, function (animator, i) {
                    var nestedAnimator = positionOuter < _Position_Current ? _NestedAnimators[_NestedAnimators.length - i - 1] : animator;
                    nestedAnimator.$GoToPosition(_Position_Display - _Shift, force);
                });

                var positionOld = _Position_Current;
                var positionNew = _Position_Display;

                _Position_Current = trimedPositionOuter;
                _Hooked = true;

                _ThisAnimator.$OnPositionChange(positionOld, positionNew);
            }
        }
    }

    function Join(animator, combineMode, noExpand) {
        ///	<summary>
        ///		Combine another animator as nested animator
        ///	</summary>
        ///	<param name="animator" type="$JssorAnimator$">
        ///		An instance of $JssorAnimator$
        ///	</param>
        ///	<param name="combineMode" type="int">
        ///		0: parallel - place the animator parallel to this animator.
        ///		1: chain - chain the animator at the _Position_InnerEnd of this animator.
        ///	</param>
        $JssorDebug$.$Execute(function () {
            if (combineMode !== 0 && combineMode !== 1)
                $JssorDebug$.$Fail("Argument out of range, the value of 'combineMode' should be either 0 or 1.");
        });

        if (combineMode)
            animator.$Locate(_Position_OuterEnd, 1);

        if (!noExpand) {
            _Position_OuterBegin = Math.min(_Position_OuterBegin, animator.$GetPosition_OuterBegin() + _Shift);
            _Position_OuterEnd = Math.max(_Position_OuterEnd, animator.$GetPosition_OuterEnd() + _Shift);
        }
        _NestedAnimators.push(animator);
    }

    var RequestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame;

    if ($Jssor$.$IsBrowserSafari() && $Jssor$.$BrowserVersion() < 7) {
        RequestAnimationFrame = null;

        //$JssorDebug$.$Log("Custom animation frame for safari before 7.");
    }

    RequestAnimationFrame = RequestAnimationFrame || function (callback) {
        $Jssor$.$Delay(callback, options.$Interval);
    };

    function ShowFrame() {
        if (_AutoPlay) {
            var now = $Jssor$.$GetNow();
            var timeOffset = Math.min(now - _TimeStampLastFrame, options.$IntervalMax);
            var timePosition = _Position_Current + timeOffset * _PlayDirection;
            _TimeStampLastFrame = now;

            if (timePosition * _PlayDirection >= _PlayToPosition * _PlayDirection)
                timePosition = _PlayToPosition;

            GoToPosition(timePosition);

            if (!_NoStop && timePosition * _PlayDirection >= _PlayToPosition * _PlayDirection) {
                Stop(_Callback);
            }
            else {
                RequestAnimationFrame(ShowFrame);
            }
        }
    }

    function PlayToPosition(toPosition, callback, noStop) {
        if (!_AutoPlay) {
            _AutoPlay = true;
            _NoStop = noStop
            _Callback = callback;
            toPosition = Math.max(toPosition, _Position_OuterBegin);
            toPosition = Math.min(toPosition, _Position_OuterEnd);
            _PlayToPosition = toPosition;
            _PlayDirection = _PlayToPosition < _Position_Current ? -1 : 1;
            _ThisAnimator.$OnStart();
            _TimeStampLastFrame = $Jssor$.$GetNow();
            RequestAnimationFrame(ShowFrame);
        }
    }

    function Stop(callback) {
        if (_AutoPlay) {
            _NoStop = _AutoPlay = _Callback = false;
            _ThisAnimator.$OnStop();

            if (callback)
                callback();
        }
    }

    _ThisAnimator.$Play = function (positionLength, callback, noStop) {
        PlayToPosition(positionLength ? _Position_Current + positionLength : _Position_OuterEnd, callback, noStop);
    };

    _ThisAnimator.$PlayToPosition = PlayToPosition;

    _ThisAnimator.$PlayToBegin = function (callback, noStop) {
        PlayToPosition(_Position_OuterBegin, callback, noStop);
    };

    _ThisAnimator.$PlayToEnd = function (callback, noStop) {
        PlayToPosition(_Position_OuterEnd, callback, noStop);
    };

    _ThisAnimator.$Stop = Stop;

    _ThisAnimator.$Continue = function (toPosition) {
        PlayToPosition(toPosition);
    };

    _ThisAnimator.$GetPosition = function () {
        return _Position_Current;
    };

    _ThisAnimator.$GetPlayToPosition = function () {
        return _PlayToPosition;
    };

    _ThisAnimator.$GetPosition_Display = function () {
        return _Position_Display;
    };

    _ThisAnimator.$GoToPosition = GoToPosition;

    _ThisAnimator.$GoToBegin = function () {
        GoToPosition(_Position_OuterBegin, true);
    };

    _ThisAnimator.$GoToEnd = function () {
        GoToPosition(_Position_OuterEnd, true);
    };

    _ThisAnimator.$Move = function (offset) {
        GoToPosition(_Position_Current + offset);
    };

    _ThisAnimator.$CombineMode = function () {
        return _CombineMode;
    };

    _ThisAnimator.$GetDuration = function () {
        return duration;
    };

    _ThisAnimator.$IsPlaying = function () {
        return _AutoPlay;
    };

    _ThisAnimator.$IsOnTheWay = function () {
        return _Position_Current > _Position_InnerBegin && _Position_Current <= _Position_InnerEnd;
    };

    _ThisAnimator.$SetLoopLength = function (length) {
        _LoopLength = length;
    };

    _ThisAnimator.$Locate = Locate;

    _ThisAnimator.$Shift = Shift;

    _ThisAnimator.$Join = Join;

    _ThisAnimator.$Combine = function (animator) {
        ///	<summary>
        ///		Combine another animator parallel to this animator
        ///	</summary>
        ///	<param name="animator" type="$JssorAnimator$">
        ///		An instance of $JssorAnimator$
        ///	</param>
        Join(animator, 0);
    };

    _ThisAnimator.$Chain = function (animator) {
        ///	<summary>
        ///		Chain another animator at the _Position_InnerEnd of this animator
        ///	</summary>
        ///	<param name="animator" type="$JssorAnimator$">
        ///		An instance of $JssorAnimator$
        ///	</param>
        Join(animator, 1);
    };

    _ThisAnimator.$GetPosition_InnerBegin = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_InnerBegin;
    };

    _ThisAnimator.$GetPosition_InnerEnd = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_InnerEnd;
    };

    _ThisAnimator.$GetPosition_OuterBegin = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_OuterBegin;
    };

    _ThisAnimator.$GetPosition_OuterEnd = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_OuterEnd;
    };

    _ThisAnimator.$OnPositionChange = _ThisAnimator.$OnStart = _ThisAnimator.$OnStop = _ThisAnimator.$OnInnerOffsetChange = $Jssor$.$EmptyFunction;
    _ThisAnimator.$Version = $Jssor$.$GetNow();

    //Constructor  1
    {
        options = $Jssor$.$Extend({
            $Interval: 16,
            $IntervalMax: 50
        }, options);

        //Sodo statement, for development time intellisence only
        $JssorDebug$.$Execute(function () {
            options = $Jssor$.$Extend({
                $LoopLength: undefined,
                $Setter: undefined,
                $Easing: undefined
            }, options);
        });

        _LoopLength = options.$LoopLength;

        _StyleSetter = $Jssor$.$Extend({}, $Jssor$.$StyleSetter(), options.$Setter);

        _Position_OuterBegin = _Position_InnerBegin = delay;
        _Position_OuterEnd = _Position_InnerEnd = delay + duration;

        _SubRounds = options.$Round || {};
        _SubDurings = options.$During || {};
        _SubEasings = $Jssor$.$Extend({ $Default: $Jssor$.$IsFunction(options.$Easing) && options.$Easing || $JssorEasing$.$EaseSwing }, options.$Easing);
    }
};

function $JssorPlayerClass$() {

    var _ThisPlayer = this;
    var _PlayerControllers = [];

    function PlayerController(playerElement) {
        var _SelfPlayerController = this;
        var _PlayerInstance;
        var _PlayerInstantces = [];

        function OnPlayerInstanceDataAvailable(event) {
            var srcElement = $Jssor$.$EvtSrc(event);
            _PlayerInstance = srcElement.pInstance;

            $Jssor$.$RemoveEvent(srcElement, "dataavailable", OnPlayerInstanceDataAvailable);
            $Jssor$.$Each(_PlayerInstantces, function (playerInstance) {
                if (playerInstance != _PlayerInstance) {
                    playerInstance.$Remove();
                }
            });

            playerElement.pTagName = _PlayerInstance.tagName;
            _PlayerInstantces = null;
        }

        function HandlePlayerInstance(playerInstanceElement) {
            var playerHandler;

            if (!playerInstanceElement.pInstance) {
                var playerHandlerAttribute = $Jssor$.$AttributeEx(playerInstanceElement, "pHandler");

                if ($JssorPlayer$[playerHandlerAttribute]) {
                    $Jssor$.$AddEvent(playerInstanceElement, "dataavailable", OnPlayerInstanceDataAvailable);
                    playerHandler = new $JssorPlayer$[playerHandlerAttribute](playerElement, playerInstanceElement);
                    _PlayerInstantces.push(playerHandler);

                    $JssorDebug$.$Execute(function () {
                        if ($Jssor$.$Type(playerHandler.$Remove) != "function") {
                            $JssorDebug$.$Fail("'pRemove' interface not implemented for player handler '" + playerHandlerAttribute + "'.");
                        }
                    });
                }
            }

            return playerHandler;
        }

        _SelfPlayerController.$InitPlayerController = function () {
            if (!playerElement.pInstance && !HandlePlayerInstance(playerElement)) {

                var playerInstanceElements = $Jssor$.$Children(playerElement);

                $Jssor$.$Each(playerInstanceElements, function (playerInstanceElement) {
                    HandlePlayerInstance(playerInstanceElement);
                });
            }
        };
    }

    _ThisPlayer.$EVT_SWITCH = 21;

    _ThisPlayer.$FetchPlayers = function (elmt) {
        elmt = elmt || document.body;

        var playerElements = $Jssor$.$FindChildren(elmt, "player");

        $Jssor$.$Each(playerElements, function (playerElement) {
            if (!_PlayerControllers[playerElement.pId]) {
                playerElement.pId = _PlayerControllers.length;
                _PlayerControllers.push(new PlayerController(playerElement));
            }
            var playerController = _PlayerControllers[playerElement.pId];
            playerController.$InitPlayerController();
        });
    };
}