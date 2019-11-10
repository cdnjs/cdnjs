(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Push = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorPrefix = "PushError:";exports.default = { errors: { incompatible: "PushError: Push.js is incompatible with browser.", invalid_plugin: "PushError: plugin class missing from plugin manifest (invalid plugin). Please check the documentation.", invalid_title: "PushError: title of notification must be a string", permission_denied: "PushError: permission request declined", sw_notification_error: "PushError: could not show a ServiceWorker notification due to the following reason: ", sw_registration_error: "PushError: could not register the ServiceWorker due to the following reason: ", unknown_interface: "PushError: unable to create notification: unknown interface" } };

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Permission = function () {
  function Permission(i) {
    _classCallCheck(this, Permission);

    this._win = i, this.DEFAULT = "default", this.GRANTED = "granted", this.DENIED = "denied", this._permissions = [this.GRANTED, this.DEFAULT, this.DENIED];
  }

  _createClass(Permission, [{
    key: "request",
    value: function request(i, t) {
      var _this = this;

      var s = this.get();var n = function n(s) {
        s === _this.GRANTED || 0 === s ? i && i() : t && t();
      };s !== this.DEFAULT ? n(s) : this._win.Notification && this._win.Notification.requestPermission ? this._win.Notification.requestPermission().then(n).catch(function () {
        t && t();
      }) : this._win.webkitNotifications && this._win.webkitNotifications.checkPermission ? this._win.webkitNotifications.requestPermission(n) : i && i();
    }
  }, {
    key: "has",
    value: function has() {
      return this.get() === this.GRANTED;
    }
  }, {
    key: "get",
    value: function get() {
      var i = void 0;return i = this._win.Notification && this._win.Notification.permission ? this._win.Notification.permission : this._win.webkitNotifications && this._win.webkitNotifications.checkPermission ? this._permissions[this._win.webkitNotifications.checkPermission()] : navigator.mozNotification ? this.GRANTED : this._win.external && this._win.external.msIsSiteMode ? this._win.external.msIsSiteMode() ? this.GRANTED : this.DEFAULT : this.GRANTED;
    }
  }]);

  return Permission;
}();

exports.default = Permission;
;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Messages = require("./Messages");

var _Messages2 = _interopRequireDefault(_Messages);

var _Permission = require("./Permission");

var _Permission2 = _interopRequireDefault(_Permission);

var _Util = require("./Util");

var _Util2 = _interopRequireDefault(_Util);

var _DesktopAgent = require("./agents/DesktopAgent");

var _DesktopAgent2 = _interopRequireDefault(_DesktopAgent);

var _MobileChromeAgent = require("./agents/MobileChromeAgent");

var _MobileChromeAgent2 = _interopRequireDefault(_MobileChromeAgent);

var _MobileFirefoxAgent = require("./agents/MobileFirefoxAgent");

var _MobileFirefoxAgent2 = _interopRequireDefault(_MobileFirefoxAgent);

var _MSAgent = require("./agents/MSAgent");

var _MSAgent2 = _interopRequireDefault(_MSAgent);

var _WebKitAgent = require("./agents/WebKitAgent");

var _WebKitAgent2 = _interopRequireDefault(_WebKitAgent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Push = function () {
  function Push(t) {
    _classCallCheck(this, Push);

    this._currentId = 0, this._notifications = {}, this._win = t, this.Permission = new _Permission2.default(t), this._agents = { desktop: new _DesktopAgent2.default(t), chrome: new _MobileChromeAgent2.default(t), firefox: new _MobileFirefoxAgent2.default(t), ms: new _MSAgent2.default(t), webkit: new _WebKitAgent2.default(t) }, this._configuration = { serviceWorker: "./serviceWorker.min.js", fallback: function fallback(t) {} };
  }

  _createClass(Push, [{
    key: "_closeNotification",
    value: function _closeNotification(t) {
      var i = !0;var e = this._notifications[t];if (void 0 !== e) {
        if (i = this._removeNotification(t), this._agents.desktop.isSupported()) this._agents.desktop.close(e);else if (this._agents.webkit.isSupported()) this._agents.webkit.close(e);else {
          if (!this._agents.ms.isSupported()) throw i = !1, new Error(_Messages2.default.errors.unknown_interface);this._agents.ms.close();
        }return i;
      }return !1;
    }
  }, {
    key: "_addNotification",
    value: function _addNotification(t) {
      var i = this._currentId;return this._notifications[i] = t, this._currentId++, i;
    }
  }, {
    key: "_removeNotification",
    value: function _removeNotification(t) {
      var i = !1;return this._notifications.hasOwnProperty(t) && (delete this._notifications[t], i = !0), i;
    }
  }, {
    key: "_prepareNotification",
    value: function _prepareNotification(t, i) {
      var _this = this;

      var e = void 0;return e = { get: function get() {
          return _this._notifications[t];
        }, close: function close() {
          _this._closeNotification(t);
        } }, i.timeout && setTimeout(function () {
        e.close();
      }, i.timeout), e;
    }
  }, {
    key: "_serviceWorkerCallback",
    value: function _serviceWorkerCallback(t, i, e) {
      var _this2 = this;

      var s = this._addNotification(t[t.length - 1]);navigator.serviceWorker.addEventListener("message", function (t) {
        var i = JSON.parse(t.data);"close" === i.action && Number.isInteger(i.id) && _this2._removeNotification(i.id);
      }), e(this._prepareNotification(s, i));
    }
  }, {
    key: "_createCallback",
    value: function _createCallback(t, i, e) {
      var _this3 = this;

      var s = void 0,
          o = null;if (i = i || {}, s = function s(t) {
        _this3._removeNotification(t), _Util2.default.isFunction(i.onClose) && i.onClose.call(_this3, o);
      }, this._agents.desktop.isSupported()) try {
        o = this._agents.desktop.create(t, i);
      } catch (s) {
        var _o = this._currentId,
            n = this.config().serviceWorker,
            r = function r(t) {
          return _this3._serviceWorkerCallback(t, i, e);
        };this._agents.chrome.isSupported() && this._agents.chrome.create(_o, t, i, n, r);
      } else this._agents.webkit.isSupported() ? o = this._agents.webkit.create(t, i) : this._agents.firefox.isSupported() ? this._agents.firefox.create(t, i) : this._agents.ms.isSupported() ? o = this._agents.ms.create(t, i) : (i.title = t, this.config().fallback(i));if (null !== o) {
        var _t = this._addNotification(o),
            _n = this._prepareNotification(_t, i);_Util2.default.isFunction(i.onShow) && o.addEventListener("show", i.onShow), _Util2.default.isFunction(i.onError) && o.addEventListener("error", i.onError), _Util2.default.isFunction(i.onClick) && o.addEventListener("click", i.onClick), o.addEventListener("close", function () {
          s(_t);
        }), o.addEventListener("cancel", function () {
          s(_t);
        }), e(_n);
      }e(null);
    }
  }, {
    key: "create",
    value: function create(t, i) {
      var _this4 = this;

      var e = void 0;if (!_Util2.default.isString(t)) throw new Error(_Messages2.default.errors.invalid_title);return e = this.Permission.has() ? function (e, s) {
        try {
          _this4._createCallback(t, i, e);
        } catch (t) {
          s(t);
        }
      } : function (e, s) {
        _this4.Permission.request(function () {
          try {
            _this4._createCallback(t, i, e);
          } catch (t) {
            s(t);
          }
        }, function () {
          s(_Messages2.default.errors.permission_denied);
        });
      }, new Promise(e);
    }
  }, {
    key: "count",
    value: function count() {
      var t = void 0,
          i = 0;for (t in this._notifications) {
        this._notifications.hasOwnProperty(t) && i++;
      }return i;
    }
  }, {
    key: "close",
    value: function close(t) {
      var i = void 0,
          e = void 0;for (i in this._notifications) {
        if (this._notifications.hasOwnProperty(i) && (e = this._notifications[i]).tag === t) return this._closeNotification(i);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      var t = void 0,
          i = !0;for (t in this._notifications) {
        this._notifications.hasOwnProperty(t) && (i = i && this._closeNotification(t));
      }return i;
    }
  }, {
    key: "supported",
    value: function supported() {
      var t = !1;for (var i in this._agents) {
        this._agents.hasOwnProperty(i) && (t = t || this._agents[i].isSupported());
      }return t;
    }
  }, {
    key: "config",
    value: function config(t) {
      return (void 0 !== t || null !== t && _Util2.default.isObject(t)) && _Util2.default.objectMerge(this._configuration, t), this._configuration;
    }
  }, {
    key: "extend",
    value: function extend(t) {
      var i,
          e = {}.hasOwnProperty;if (!e.call(t, "plugin")) throw new Error(_Messages2.default.errors.invalid_plugin);e.call(t, "config") && _Util2.default.isObject(t.config) && null !== t.config && this.config(t.config), i = new (0, t.plugin)(this.config());for (var s in i) {
        e.call(i, s) && _Util2.default.isFunction(i[s]) && (this[s] = i[s]);
      }
    }
  }]);

  return Push;
}();

exports.default = Push;
;

},{"./Messages":1,"./Permission":2,"./Util":4,"./agents/DesktopAgent":6,"./agents/MSAgent":7,"./agents/MobileChromeAgent":8,"./agents/MobileFirefoxAgent":9,"./agents/WebKitAgent":10}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: "isUndefined",
    value: function isUndefined(t) {
      return void 0 === t;
    }
  }, {
    key: "isString",
    value: function isString(t) {
      return "string" == typeof t;
    }
  }, {
    key: "isFunction",
    value: function isFunction(t) {
      return t && "[object Function]" === {}.toString.call(t);
    }
  }, {
    key: "isObject",
    value: function isObject(t) {
      return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
    }
  }, {
    key: "objectMerge",
    value: function objectMerge(t, i) {
      for (var e in i) {
        t.hasOwnProperty(e) && this.isObject(t[e]) && this.isObject(i[e]) ? this.objectMerge(t[e], i[e]) : t[e] = i[e];
      }
    }
  }]);

  return Util;
}();

exports.default = Util;
;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractAgent = function AbstractAgent(t) {
  _classCallCheck(this, AbstractAgent);

  this._win = t;
};

exports.default = AbstractAgent;
;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractAgent2 = require("./AbstractAgent");

var _AbstractAgent3 = _interopRequireDefault(_AbstractAgent2);

var _Util = require("../Util");

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DesktopAgent = function (_AbstractAgent) {
  _inherits(DesktopAgent, _AbstractAgent);

  function DesktopAgent() {
    _classCallCheck(this, DesktopAgent);

    return _possibleConstructorReturn(this, (DesktopAgent.__proto__ || Object.getPrototypeOf(DesktopAgent)).apply(this, arguments));
  }

  _createClass(DesktopAgent, [{
    key: "isSupported",
    value: function isSupported() {
      return void 0 !== this._win.Notification;
    }
  }, {
    key: "create",
    value: function create(t, i) {
      return new this._win.Notification(t, { icon: _Util2.default.isString(i.icon) || _Util2.default.isUndefined(i.icon) ? i.icon : i.icon.x32, body: i.body, tag: i.tag, requireInteraction: i.requireInteraction });
    }
  }, {
    key: "close",
    value: function close(t) {
      t.close();
    }
  }]);

  return DesktopAgent;
}(_AbstractAgent3.default);

exports.default = DesktopAgent;
;

},{"../Util":4,"./AbstractAgent":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractAgent2 = require("./AbstractAgent");

var _AbstractAgent3 = _interopRequireDefault(_AbstractAgent2);

var _Util = require("../Util");

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSAgent = function (_AbstractAgent) {
  _inherits(MSAgent, _AbstractAgent);

  function MSAgent() {
    _classCallCheck(this, MSAgent);

    return _possibleConstructorReturn(this, (MSAgent.__proto__ || Object.getPrototypeOf(MSAgent)).apply(this, arguments));
  }

  _createClass(MSAgent, [{
    key: "isSupported",
    value: function isSupported() {
      return void 0 !== this._win.external && void 0 !== this._win.external.msIsSiteMode;
    }
  }, {
    key: "create",
    value: function create(e, t) {
      return this._win.external.msSiteModeClearIconOverlay(), this._win.external.msSiteModeSetIconOverlay(_Util2.default.isString(t.icon) || _Util2.default.isUndefined(t.icon) ? t.icon : t.icon.x16, e), this._win.external.msSiteModeActivate(), null;
    }
  }, {
    key: "close",
    value: function close() {
      this._win.external.msSiteModeClearIconOverlay();
    }
  }]);

  return MSAgent;
}(_AbstractAgent3.default);

exports.default = MSAgent;
;

},{"../Util":4,"./AbstractAgent":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractAgent2 = require("./AbstractAgent");

var _AbstractAgent3 = _interopRequireDefault(_AbstractAgent2);

var _Util = require("../Util");

var _Util2 = _interopRequireDefault(_Util);

var _Messages = require("../Messages");

var _Messages2 = _interopRequireDefault(_Messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MobileChromeAgent = function (_AbstractAgent) {
  _inherits(MobileChromeAgent, _AbstractAgent);

  function MobileChromeAgent() {
    _classCallCheck(this, MobileChromeAgent);

    return _possibleConstructorReturn(this, (MobileChromeAgent.__proto__ || Object.getPrototypeOf(MobileChromeAgent)).apply(this, arguments));
  }

  _createClass(MobileChromeAgent, [{
    key: "isSupported",
    value: function isSupported() {
      return void 0 !== this._win.navigator && void 0 !== this._win.navigator.serviceWorker;
    }
  }, {
    key: "getFunctionBody",
    value: function getFunctionBody(t) {
      return t.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
    }
  }, {
    key: "create",
    value: function create(t, e, i, o, r) {
      var _this2 = this;

      this._win.navigator.serviceWorker.register(o), this._win.navigator.serviceWorker.ready.then(function (o) {
        var n = { id: t, link: i.link, origin: document.location.href, onClick: _Util2.default.isFunction(i.onClick) ? _this2.getFunctionBody(i.onClick) : "", onClose: _Util2.default.isFunction(i.onClose) ? _this2.getFunctionBody(i.onClose) : "" };void 0 !== i.data && null !== i.data && (n = Object.assign(n, i.data)), o.showNotification(e, { icon: i.icon, body: i.body, vibrate: i.vibrate, tag: i.tag, data: n, requireInteraction: i.requireInteraction, silent: i.silent }).then(function () {
          o.getNotifications().then(function (t) {
            o.active.postMessage(""), r(t);
          });
        }).catch(function (t) {
          throw new Error(_Messages2.default.errors.sw_notification_error + t.message);
        });
      }).catch(function (t) {
        throw new Error(_Messages2.default.errors.sw_registration_error + t.message);
      });
    }
  }, {
    key: "close",
    value: function close() {
      this._win.external.msSiteModeClearIconOverlay();
    }
  }]);

  return MobileChromeAgent;
}(_AbstractAgent3.default);

exports.default = MobileChromeAgent;
;

},{"../Messages":1,"../Util":4,"./AbstractAgent":5}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractAgent2 = require("./AbstractAgent");

var _AbstractAgent3 = _interopRequireDefault(_AbstractAgent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MobileFirefoxAgent = function (_AbstractAgent) {
  _inherits(MobileFirefoxAgent, _AbstractAgent);

  function MobileFirefoxAgent() {
    _classCallCheck(this, MobileFirefoxAgent);

    return _possibleConstructorReturn(this, (MobileFirefoxAgent.__proto__ || Object.getPrototypeOf(MobileFirefoxAgent)).apply(this, arguments));
  }

  _createClass(MobileFirefoxAgent, [{
    key: "isSupported",
    value: function isSupported() {
      return void 0 !== this._win.navigator.mozNotification;
    }
  }, {
    key: "create",
    value: function create(t, i) {
      var o = this._win.navigator.mozNotification.createNotification(t, i.body, i.icon);return o.show(), o;
    }
  }]);

  return MobileFirefoxAgent;
}(_AbstractAgent3.default);

exports.default = MobileFirefoxAgent;
;

},{"./AbstractAgent":5}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractAgent2 = require("./AbstractAgent");

var _AbstractAgent3 = _interopRequireDefault(_AbstractAgent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebKitAgent = function (_AbstractAgent) {
  _inherits(WebKitAgent, _AbstractAgent);

  function WebKitAgent() {
    _classCallCheck(this, WebKitAgent);

    return _possibleConstructorReturn(this, (WebKitAgent.__proto__ || Object.getPrototypeOf(WebKitAgent)).apply(this, arguments));
  }

  _createClass(WebKitAgent, [{
    key: "isSupported",
    value: function isSupported() {
      return void 0 !== this._win.webkitNotifications;
    }
  }, {
    key: "create",
    value: function create(t, e) {
      var i = this._win.webkitNotifications.createNotification(e.icon, t, e.body);return i.show(), i;
    }
  }, {
    key: "close",
    value: function close(t) {
      t.cancel();
    }
  }]);

  return WebKitAgent;
}(_AbstractAgent3.default);

exports.default = WebKitAgent;
;

},{"./AbstractAgent":5}],11:[function(require,module,exports){
"use strict";

var _Push = require("./classes/Push");

var _Push2 = _interopRequireDefault(_Push);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = new _Push2.default("undefined" != typeof window ? window : undefined);

},{"./classes/Push":3}]},{},[11])(11)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2xhc3Nlcy9NZXNzYWdlcy5qcyIsInNyYy9jbGFzc2VzL1Blcm1pc3Npb24uanMiLCJzcmMvY2xhc3Nlcy9QdXNoLmpzIiwic3JjL2NsYXNzZXMvVXRpbC5qcyIsInNyYy9jbGFzc2VzL2FnZW50cy9BYnN0cmFjdEFnZW50LmpzIiwic3JjL2NsYXNzZXMvYWdlbnRzL0Rlc2t0b3BBZ2VudC5qcyIsInNyYy9jbGFzc2VzL2FnZW50cy9NU0FnZW50LmpzIiwic3JjL2NsYXNzZXMvYWdlbnRzL01vYmlsZUNocm9tZUFnZW50LmpzIiwic3JjL2NsYXNzZXMvYWdlbnRzL01vYmlsZUZpcmVmb3hBZ2VudC5qcyIsInNyYy9jbGFzc2VzL2FnZW50cy9XZWJLaXRBZ2VudC5qcyIsInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsSUFBTSxjQUFjLGlDQUdsQixVQUNFLGtFQUNBLDBIQUNBLG9FQUNBLDZEQUNBLCtHQUNBLHdHQUNBOzs7Ozs7Ozs7Ozs7O0lDVmlCO0FBRW5CLHNCQUFZOzs7QUFDVixTQUFLLE9BQU8sR0FDWixLQUFLLFVBQVUsV0FDZixLQUFLLFVBQVUsV0FDZixLQUFLLFNBQVMsVUFDZCxLQUFLLGdCQUNILEtBQUssU0FDTCxLQUFLLFNBQ0wsS0FBSztBQVVUOzs7OzRCQUFRLEdBQVc7OztBQUNqQixVQUFNLElBQVcsS0FBSyxVQUVsQixJQUFXO0FBQ1QsY0FBVyxNQUFLLFdBQXNCLE1BQVgsSUFDekIsS0FBVyxNQUNOLEtBQVU7T0FIdkIsQ0FPSSxNQUFhLEtBQUssVUFDcEIsRUFBUSxVQUdJLEtBQUssZ0JBQWdCLEtBQUssS0FBSyxhQUFhLHlCQUNuRCxLQUFLLGFBQWEsb0JBQW9CLEtBQUssR0FBUyxNQUFNO0FBQ3pELGFBQVU7T0FEaEIsQ0FETyxHQU1BLEtBQUssS0FBSyx1QkFBdUIsS0FBSyxLQUFLLG9CQUFvQixr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QXFDRyxNQUFNLFVBQVM7QUFDaEIsY0FBTSxJQUFJLE1BQU0sbUJBQVMsT0FBTyx3QkFBd0IsRUFBTTs7QUFPbEU7Ozs7QUFDRSxXQUFLLEtBQUssU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25GaEIsQUFBbUI7Ozs7Ozs7Ozs7OztJQU1MLEFBQTJCLEFBTTlDOzs7Ozs7Ozs7Ozs7QUFDRSxrQkFBK0MsTUFBeEMsS0FBSyxLQUFLLFVBQVU7QUFTN0I7OzsyQkFBTyxHQUFPO0FBQ1osVUFBSSxJQUFlLEtBQUssS0FBSyxVQUFVLGdCQUFnQixtQkFDckQsR0FDQSxFQUFRLE1BQ1IsRUFBUSxNQUtWLE9BRkEsRUFBYSxRQUVOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0JKLEFBQW1COzs7Ozs7Ozs7Ozs7SUFLTCxBQUFvQixBQU12Qzs7Ozs7Ozs7Ozs7O0FBQ0Usa0JBQXlDLE1BQWxDLEtBQUssS0FBSztBQVNuQjs7OzJCQUFPLEdBQU87QUFDWixVQUFJLElBQWUsS0FBSyxLQUFLLG9CQUFvQixtQkFDL0MsRUFBUSxNQUNSLEdBQ0EsRUFBUSxNQUtWLE9BRkEsRUFBYSxRQUVOO0FBT1Q7OzswQkFBTTtBQUNKLFFBQWE7Ozs7Ozs7Ozs7Ozs7QUN0Q1YsQUFBVTs7Ozs7O0FBRWpCLE9BQU8sVUFBVSxBQUFJLG1CQUF1QixzQkFBWCxTQUF5QixBQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IGVycm9yUHJlZml4ID0gJ1B1c2hFcnJvcjonO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVycm9yczoge1xuICAgIGluY29tcGF0aWJsZTogYCR7ZXJyb3JQcmVmaXh9IFB1c2guanMgaXMgaW5jb21wYXRpYmxlIHdpdGggYnJvd3Nlci5gLFxuICAgIGludmFsaWRfcGx1Z2luOiBgJHtlcnJvclByZWZpeH0gcGx1Z2luIGNsYXNzIG1pc3NpbmcgZnJvbSBwbHVnaW4gbWFuaWZlc3QgKGludmFsaWQgcGx1Z2luKS4gUGxlYXNlIGNoZWNrIHRoZSBkb2N1bWVudGF0aW9uLmAsXG4gICAgaW52YWxpZF90aXRsZTogYCR7ZXJyb3JQcmVmaXh9IHRpdGxlIG9mIG5vdGlmaWNhdGlvbiBtdXN0IGJlIGEgc3RyaW5nYCxcbiAgICBwZXJtaXNzaW9uX2RlbmllZDogYCR7ZXJyb3JQcmVmaXh9IHBlcm1pc3Npb24gcmVxdWVzdCBkZWNsaW5lZGAsXG4gICAgc3dfbm90aWZpY2F0aW9uX2Vycm9yOiBgJHtlcnJvclByZWZpeH0gY291bGQgbm90IHNob3cgYSBTZXJ2aWNlV29ya2VyIG5vdGlmaWNhdGlvbiBkdWUgdG8gdGhlIGZvbGxvd2luZyByZWFzb246IGAsXG4gICAgc3dfcmVnaXN0cmF0aW9uX2Vycm9yOiBgJHtlcnJvclByZWZpeH0gY291bGQgbm90IHJlZ2lzdGVyIHRoZSBTZXJ2aWNlV29ya2VyIGR1ZSB0byB0aGUgZm9sbG93aW5nIHJlYXNvbjogYCxcbiAgICB1bmtub3duX2ludGVyZmFjZTogYCR7ZXJyb3JQcmVmaXh9IHVuYWJsZSB0byBjcmVhdGUgbm90aWZpY2F0aW9uOiB1bmtub3duIGludGVyZmFjZWAsXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcm1pc3Npb24ge1xuXG4gIGNvbnN0cnVjdG9yKHdpbikge1xuICAgIHRoaXMuX3dpbiA9IHdpbjtcbiAgICB0aGlzLkRFRkFVTFQgPSAnZGVmYXVsdCc7XG4gICAgdGhpcy5HUkFOVEVEID0gJ2dyYW50ZWQnO1xuICAgIHRoaXMuREVOSUVEID0gJ2RlbmllZCc7XG4gICAgdGhpcy5fcGVybWlzc2lvbnMgPSBbXG4gICAgICB0aGlzLkdSQU5URUQsXG4gICAgICB0aGlzLkRFRkFVTFQsXG4gICAgICB0aGlzLkRFTklFRFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdHMgcGVybWlzc2lvbiBmb3IgZGVza3RvcCBub3RpZmljYXRpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uR3JhbnRlZCAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgb25jZSBwZXJtaXNzaW9uIGlzIGdyYW50ZWRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25EZW5pZWQgLSBGdW5jdGlvbiB0byBleGVjdXRlIG9uY2UgcGVybWlzc2lvbiBpcyBkZW5pZWRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHJlcXVlc3Qob25HcmFudGVkLCBvbkRlbmllZCkge1xuICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5nZXQoKTtcblxuICAgIHZhciByZXNvbHZlID0gKHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gdGhpcy5HUkFOVEVEIHx8IHJlc3VsdCA9PT0gMCkge1xuICAgICAgICBpZiAob25HcmFudGVkKSBvbkdyYW50ZWQoKTtcbiAgICAgIH0gZWxzZSBpZiAob25EZW5pZWQpIG9uRGVuaWVkKCk7XG4gICAgfVxuXG4gICAgLyogUGVybWlzc2lvbnMgYWxyZWFkeSBzZXQgKi9cbiAgICBpZiAoZXhpc3RpbmcgIT09IHRoaXMuREVGQVVMVCkge1xuICAgICAgcmVzb2x2ZShleGlzdGluZyk7XG4gICAgfVxuICAgIC8qIFNhZmFyaSA2KywgQ2hyb21lIDIzKyAqL1xuICAgIGVsc2UgaWYgKHRoaXMuX3dpbi5Ob3RpZmljYXRpb24gJiYgdGhpcy5fd2luLk5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbikge1xuICAgICAgdGhpcy5fd2luLk5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAob25EZW5pZWQpIG9uRGVuaWVkKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyogTGVnYWN5IHdlYmtpdCBicm93c2VycyAqL1xuICAgIGVsc2UgaWYgKHRoaXMuX3dpbi53ZWJraXROb3RpZmljYXRpb25zICYmIHRoaXMuX3dpbi53ZWJraXROb3RpZmljYXRpb25zLmNoZWNrUGVybWlzc2lvbilcbiAgICAgIHRoaXMuX3dpbi53ZWJraXROb3RpZmljYXRpb25zLnJlcXVlc3RQZXJtaXNzaW9uKHJlc29sdmUpO1xuICAgIC8qIExldCB0aGUgdXNlciBjb250aW51ZSBieSBkZWZhdWx0ICovXG4gICAgZWxzZSBpZiAob25HcmFudGVkKSBvbkdyYW50ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgUHVzaCBoYXMgYmVlbiBncmFudGVkIHBlcm1pc3Npb24gdG8gcnVuXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBoYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCkgPT09IHRoaXMuR1JBTlRFRDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwZXJtaXNzaW9uIGxldmVsXG4gICAqIEByZXR1cm4ge1Blcm1pc3Npb259IFRoZSBwZXJtaXNzaW9uIGxldmVsXG4gICAqL1xuICBnZXQoKSB7XG4gICAgbGV0IHBlcm1pc3Npb247XG5cbiAgICAvKiBTYWZhcmkgNissIENocm9tZSAyMysgKi9cbiAgICBpZiAodGhpcy5fd2luLk5vdGlmaWNhdGlvbiAmJiB0aGlzLl93aW4uTm90aWZpY2F0aW9uLnBlcm1pc3Npb24pXG4gICAgICBwZXJtaXNzaW9uID0gdGhpcy5fd2luLk5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uO1xuXG4gICAgLyogTGVnYWN5IHdlYmtpdCBicm93c2VycyAqL1xuICAgIGVsc2UgaWYgKHRoaXMuX3dpbi53ZWJraXROb3RpZmljYXRpb25zICYmIHRoaXMuX3dpbi53ZWJraXROb3RpZmljYXRpb25zLmNoZWNrUGVybWlzc2lvbilcbiAgICAgIHBlcm1pc3Npb24gPSB0aGlzLl9wZXJtaXNzaW9uc1t0aGlzLl93aW4ud2Via2l0Tm90aWZpY2F0aW9ucy5jaGVja1Blcm1pc3Npb24oKV07XG5cbiAgICAvKiBGaXJlZm94IE1vYmlsZSAqL1xuICAgIGVsc2UgaWYgKG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb24pXG4gICAgICBwZXJtaXNzaW9uID0gdGhpcy5HUkFOVEVEO1xuXG4gICAgLyogSUU5KyAqL1xuICAgIGVsc2UgaWYgKHRoaXMuX3dpbi5leHRlcm5hbCAmJiB0aGlzLl93aW4uZXh0ZXJuYWwubXNJc1NpdGVNb2RlKVxuICAgICAgcGVybWlzc2lvbiA9IHRoaXMuX3dpbi5leHRlcm5hbC5tc0lzU2l0ZU1vZGUoKSA/IHRoaXMuR1JBTlRFRCA6IHRoaXMuREVGQVVMVDtcblxuICAgIGVsc2VcbiAgICAgIHBlcm1pc3Npb24gPSB0aGlzLkdSQU5URUQ7XG5cbiAgICByZXR1cm4gcGVybWlzc2lvbjtcbiAgfVxufVxuIiwiaW1wb3J0IE1lc3NhZ2VzIGZyb20gXCIuL01lc3NhZ2VzXCI7XG5pbXBvcnQgUGVybWlzc2lvbiBmcm9tIFwiLi9QZXJtaXNzaW9uXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi9VdGlsXCI7XG4vKiBJbXBvcnQgbm90aWZpY2F0aW9uIGFnZW50cyAqL1xuaW1wb3J0IERlc2t0b3BBZ2VudCBmcm9tIFwiLi9hZ2VudHMvRGVza3RvcEFnZW50XCI7XG5pbXBvcnQgTW9iaWxlQ2hyb21lQWdlbnQgZnJvbSBcIi4vYWdlbnRzL01vYmlsZUNocm9tZUFnZW50XCI7XG5pbXBvcnQgTW9iaWxlRmlyZWZveEFnZW50IGZyb20gXCIuL2FnZW50cy9Nb2JpbGVGaXJlZm94QWdlbnRcIjtcbmltcG9ydCBNU0FnZW50IGZyb20gXCIuL2FnZW50cy9NU0FnZW50XCI7XG5pbXBvcnQgV2ViS2l0QWdlbnQgZnJvbSBcIi4vYWdlbnRzL1dlYktpdEFnZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1c2gge1xuXG4gIGNvbnN0cnVjdG9yKHdpbikge1xuICAgIC8qIFByaXZhdGUgdmFyaWFibGVzICovXG5cbiAgICAvKiBJRCB0byB1c2UgZm9yIG5ldyBub3RpZmljYXRpb25zICovXG4gICAgdGhpcy5fY3VycmVudElkID0gMDtcblxuICAgIC8qIE1hcCBvZiBvcGVuIG5vdGlmaWNhdGlvbnMgKi9cbiAgICB0aGlzLl9ub3RpZmljYXRpb25zID0ge307XG5cbiAgICAvKiBXaW5kb3cgb2JqZWN0ICovXG4gICAgdGhpcy5fd2luID0gd2luO1xuXG4gICAgLyogUHVibGljIHZhcmlhYmxlcyAqL1xuICAgIHRoaXMuUGVybWlzc2lvbiA9IG5ldyBQZXJtaXNzaW9uKHdpbik7XG5cbiAgICAvKiBBZ2VudHMgKi9cbiAgICB0aGlzLl9hZ2VudHMgPSB7XG4gICAgICBkZXNrdG9wOiBuZXcgRGVza3RvcEFnZW50KHdpbiksXG4gICAgICBjaHJvbWU6IG5ldyBNb2JpbGVDaHJvbWVBZ2VudCh3aW4pLFxuICAgICAgZmlyZWZveDogbmV3IE1vYmlsZUZpcmVmb3hBZ2VudCh3aW4pLFxuICAgICAgbXM6IG5ldyBNU0FnZW50KHdpbiksXG4gICAgICB3ZWJraXQ6IG5ldyBXZWJLaXRBZ2VudCh3aW4pXG4gICAgfTtcblxuICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24gPSB7XG4gICAgICBzZXJ2aWNlV29ya2VyOiAnLi9zZXJ2aWNlV29ya2VyLm1pbi5qcycsXG4gICAgICBmYWxsYmFjazogZnVuY3Rpb24ocGF5bG9hZCkge31cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIGEgbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB7Tm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gYm9vbGVhbiBkZW5vdGluZyB3aGV0aGVyIHRoZSBvcGVyYXRpb24gd2FzIHN1Y2Nlc3NmdWxcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jbG9zZU5vdGlmaWNhdGlvbihpZCkge1xuICAgIGxldCBzdWNjZXNzID0gdHJ1ZTtcbiAgICBjb25zdCBub3RpZmljYXRpb24gPSB0aGlzLl9ub3RpZmljYXRpb25zW2lkXTtcblxuICAgIGlmIChub3RpZmljYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3VjY2VzcyA9IHRoaXMuX3JlbW92ZU5vdGlmaWNhdGlvbihpZCk7XG5cbiAgICAgIC8qIFNhZmFyaSA2KywgRmlyZWZveCAyMissIENocm9tZSAyMissIE9wZXJhIDI1KyAqL1xuICAgICAgaWYgKHRoaXMuX2FnZW50cy5kZXNrdG9wLmlzU3VwcG9ydGVkKCkpXG4gICAgICAgIHRoaXMuX2FnZW50cy5kZXNrdG9wLmNsb3NlKG5vdGlmaWNhdGlvbik7XG5cbiAgICAgIC8qIExlZ2FjeSBXZWJLaXQgYnJvd3NlcnMgKi9cbiAgICAgIGVsc2UgaWYgKHRoaXMuX2FnZW50cy53ZWJraXQuaXNTdXBwb3J0ZWQoKSlcbiAgICAgICAgdGhpcy5fYWdlbnRzLndlYmtpdC5jbG9zZShub3RpZmljYXRpb24pO1xuXG4gICAgICAvKiBJRTkgKi9cbiAgICAgIGVsc2UgaWYgKHRoaXMuX2FnZW50cy5tcy5pc1N1cHBvcnRlZCgpKVxuICAgICAgICB0aGlzLl9hZ2VudHMubXMuY2xvc2UoKTtcblxuICAgICAgZWxzZSB7XG4gICAgICAgIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKE1lc3NhZ2VzLmVycm9ycy51bmtub3duX2ludGVyZmFjZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbm90aWZpY2F0aW9uIHRvIHRoZSBnbG9iYWwgZGljdGlvbmFyeSBvZiBub3RpZmljYXRpb25zXG4gICAqIEBwYXJhbSB7Tm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cbiAgICogQHJldHVybiB7SW50ZWdlcn0gRGljdGlvbmFyeSBrZXkgb2YgdGhlIG5vdGlmaWNhdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24pIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuX2N1cnJlbnRJZDtcbiAgICB0aGlzLl9ub3RpZmljYXRpb25zW2lkXSA9IG5vdGlmaWNhdGlvbjtcbiAgICB0aGlzLl9jdXJyZW50SWQrKztcbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIG5vdGlmaWNhdGlvbiB3aXRoIHRoZSBnaXZlbiBJRFxuICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBpZCAtIERpY3Rpb25hcnkga2V5L0lEIG9mIHRoZSBub3RpZmljYXRpb24gdG8gcmVtb3ZlXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IGJvb2xlYW4gZGVub3Rpbmcgc3VjY2Vzc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbW92ZU5vdGlmaWNhdGlvbihpZCkge1xuICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fbm90aWZpY2F0aW9ucy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICAgIC8qIFdlJ3JlIHN1Y2Nlc3NmdWwgaWYgd2Ugb21pdCB0aGUgZ2l2ZW4gSUQgZnJvbSB0aGUgbmV3IGFycmF5ICovXG4gICAgICBkZWxldGUgdGhpcy5fbm90aWZpY2F0aW9uc1tpZF07XG4gICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSB3cmFwcGVyIGZvciBhIGdpdmVuIG5vdGlmaWNhdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IGlkIC0gRGljdGlvbmFyeSBrZXkvSUQgb2YgdGhlIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge01hcH0gb3B0aW9ucyAtIE9wdGlvbnMgdXNlZCB0byBjcmVhdGUgdGhlIG5vdGlmaWNhdGlvblxuICAgKiBAcmV0dXJucyB7TWFwfSB3cmFwcGVyIGhhc2htYXAgb2JqZWN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcHJlcGFyZU5vdGlmaWNhdGlvbihpZCwgb3B0aW9ucykge1xuICAgIGxldCB3cmFwcGVyO1xuXG4gICAgLyogV3JhcHBlciB1c2VkIHRvIGdldC9jbG9zZSBub3RpZmljYXRpb24gbGF0ZXIgb24gKi9cbiAgICB3cmFwcGVyID0ge1xuICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3RpZmljYXRpb25zW2lkXTtcbiAgICAgIH0sXG5cbiAgICAgIGNsb3NlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2Nsb3NlTm90aWZpY2F0aW9uKGlkKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyogQXV0b2Nsb3NlIHRpbWVvdXQgKi9cbiAgICBpZiAob3B0aW9ucy50aW1lb3V0KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd3JhcHBlci5jbG9zZSgpO1xuICAgICAgfSwgb3B0aW9ucy50aW1lb3V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcHBlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBtb3N0IHJlY2VudCBub3RpZmljYXRpb24gZnJvbSBhIFNlcnZpY2VXb3JrZXIgYW5kIGFkZCBpdCB0byB0aGUgZ2xvYmFsIGFycmF5XG4gICAqIEBwYXJhbSBub3RpZmljYXRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2VydmljZVdvcmtlckNhbGxiYWNrKG5vdGlmaWNhdGlvbnMsIG9wdGlvbnMsIHJlc29sdmUpIHtcbiAgICBsZXQgaWQgPSB0aGlzLl9hZGROb3RpZmljYXRpb24obm90aWZpY2F0aW9uc1tub3RpZmljYXRpb25zLmxlbmd0aCAtIDFdKTtcblxuICAgIC8qIExpc3RlbiBmb3IgY2xvc2UgcmVxdWVzdHMgZnJvbSB0aGUgU2VydmljZVdvcmtlciAqL1xuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBldmVudCA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcblxuICAgICAgaWYgKGRhdGEuYWN0aW9uID09PSAnY2xvc2UnICYmIE51bWJlci5pc0ludGVnZXIoZGF0YS5pZCkpXG4gICAgICAgIHRoaXMuX3JlbW92ZU5vdGlmaWNhdGlvbihkYXRhLmlkKTtcbiAgICB9KTtcblxuICAgIHJlc29sdmUodGhpcy5fcHJlcGFyZU5vdGlmaWNhdGlvbihpZCwgb3B0aW9ucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgJ2NyZWF0ZScgbWV0aG9kXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY3JlYXRlQ2FsbGJhY2sodGl0bGUsIG9wdGlvbnMsIHJlc29sdmUpIHtcbiAgICBsZXQgbm90aWZpY2F0aW9uID0gbnVsbDtcbiAgICBsZXQgb25DbG9zZTtcblxuICAgIC8qIFNldCBlbXB0eSBzZXR0aW5ncyBpZiBub25lIGFyZSBzcGVjaWZpZWQgKi9cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIC8qIG9uQ2xvc2UgZXZlbnQgaGFuZGxlciAqL1xuICAgIG9uQ2xvc2UgPSAoaWQpID0+IHtcbiAgICAgIC8qIEEgYml0IHJlZHVuZGFudCwgYnV0IGNvdmVycyB0aGUgY2FzZXMgd2hlbiBjbG9zZSgpIGlzbid0IGV4cGxpY2l0bHkgY2FsbGVkICovXG4gICAgICB0aGlzLl9yZW1vdmVOb3RpZmljYXRpb24oaWQpO1xuICAgICAgaWYgKFV0aWwuaXNGdW5jdGlvbihvcHRpb25zLm9uQ2xvc2UpKSB7XG4gICAgICAgIG9wdGlvbnMub25DbG9zZS5jYWxsKHRoaXMsIG5vdGlmaWNhdGlvbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qIFNhZmFyaSA2KywgRmlyZWZveCAyMissIENocm9tZSAyMissIE9wZXJhIDI1KyAqL1xuICAgIGlmICh0aGlzLl9hZ2VudHMuZGVza3RvcC5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvKiBDcmVhdGUgYSBub3RpZmljYXRpb24gdXNpbmcgdGhlIEFQSSBpZiBwb3NzaWJsZSAqL1xuICAgICAgICBub3RpZmljYXRpb24gPSB0aGlzLl9hZ2VudHMuZGVza3RvcC5jcmVhdGUodGl0bGUsIG9wdGlvbnMpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuX2N1cnJlbnRJZDtcbiAgICAgICAgY29uc3Qgc3cgPSB0aGlzLmNvbmZpZygpLnNlcnZpY2VXb3JrZXI7XG4gICAgICAgIGNvbnN0IGNiID0gKG5vdGlmaWNhdGlvbnMpID0+IHRoaXMuX3NlcnZpY2VXb3JrZXJDYWxsYmFjayhub3RpZmljYXRpb25zLCBvcHRpb25zLCByZXNvbHZlKTtcblxuICAgICAgICAvKiBDcmVhdGUgYSBDaHJvbWUgU2VydmljZVdvcmtlciBub3RpZmljYXRpb24gaWYgaXQgaXNuJ3Qgc3VwcG9ydGVkICovXG4gICAgICAgIGlmICh0aGlzLl9hZ2VudHMuY2hyb21lLmlzU3VwcG9ydGVkKCkpXG4gICAgICAgICAgdGhpcy5fYWdlbnRzLmNocm9tZS5jcmVhdGUoaWQsIHRpdGxlLCBvcHRpb25zLCBzdywgY2IpO1xuICAgICAgfVxuICAgICAgLyogTGVnYWN5IFdlYktpdCBicm93c2VycyAqL1xuICAgIH0gZWxzZSBpZiAodGhpcy5fYWdlbnRzLndlYmtpdC5pc1N1cHBvcnRlZCgpKVxuICAgICAgbm90aWZpY2F0aW9uID0gdGhpcy5fYWdlbnRzLndlYmtpdC5jcmVhdGUodGl0bGUsIG9wdGlvbnMpO1xuXG4gICAgLyogRmlyZWZveCBNb2JpbGUgKi9cbiAgICBlbHNlIGlmICh0aGlzLl9hZ2VudHMuZmlyZWZveC5pc1N1cHBvcnRlZCgpKVxuICAgICAgdGhpcy5fYWdlbnRzLmZpcmVmb3guY3JlYXRlKHRpdGxlLCBvcHRpb25zKTtcblxuICAgIC8qIElFOSAqL1xuICAgIGVsc2UgaWYgKHRoaXMuX2FnZW50cy5tcy5pc1N1cHBvcnRlZCgpKVxuICAgICAgbm90aWZpY2F0aW9uID0gdGhpcy5fYWdlbnRzLm1zLmNyZWF0ZSh0aXRsZSwgb3B0aW9ucyk7XG5cbiAgICAvKiBEZWZhdWx0IGZhbGxiYWNrICovXG4gICAgZWxzZSB7XG4gICAgICBvcHRpb25zLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLmNvbmZpZygpLmZhbGxiYWNrKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChub3RpZmljYXRpb24gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5fYWRkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbik7XG4gICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy5fcHJlcGFyZU5vdGlmaWNhdGlvbihpZCwgb3B0aW9ucyk7XG5cbiAgICAgIC8qIE5vdGlmaWNhdGlvbiBjYWxsYmFja3MgKi9cbiAgICAgIGlmIChVdGlsLmlzRnVuY3Rpb24ob3B0aW9ucy5vblNob3cpKVxuICAgICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignc2hvdycsIG9wdGlvbnMub25TaG93KTtcblxuICAgICAgaWYgKFV0aWwuaXNGdW5jdGlvbihvcHRpb25zLm9uRXJyb3IpKVxuICAgICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvcHRpb25zLm9uRXJyb3IpO1xuXG4gICAgICBpZiAoVXRpbC5pc0Z1bmN0aW9uKG9wdGlvbnMub25DbGljaykpXG4gICAgICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wdGlvbnMub25DbGljayk7XG5cbiAgICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsICgpID0+IHtcbiAgICAgICAgb25DbG9zZShpZCk7XG4gICAgICB9KTtcblxuICAgICAgbm90aWZpY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbmNlbCcsICgpID0+IHtcbiAgICAgICAgb25DbG9zZShpZCk7XG4gICAgICB9KTtcblxuICAgICAgLyogUmV0dXJuIHRoZSB3cmFwcGVyIHNvIHRoZSB1c2VyIGNhbiBjYWxsIGNsb3NlKCkgKi9cbiAgICAgIHJlc29sdmUod3JhcHBlcik7XG4gICAgfVxuXG4gICAgLyogQnkgZGVmYXVsdCwgcGFzcyBhbiBlbXB0eSB3cmFwcGVyICovXG4gICAgcmVzb2x2ZShudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuZCBkaXNwbGF5cyBhIG5ldyBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgKi9cbiAgY3JlYXRlKHRpdGxlLCBvcHRpb25zKSB7XG4gICAgbGV0IHByb21pc2VDYWxsYmFjaztcblxuICAgIC8qIEZhaWwgaWYgbm8gb3IgYW4gaW52YWxpZCB0aXRsZSBpcyBwcm92aWRlZCAqL1xuICAgIGlmICghVXRpbC5pc1N0cmluZyh0aXRsZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihNZXNzYWdlcy5lcnJvcnMuaW52YWxpZF90aXRsZSk7XG4gICAgfVxuXG4gICAgLyogUmVxdWVzdCBwZXJtaXNzaW9uIGlmIGl0IGlzbid0IGdyYW50ZWQgKi9cbiAgICBpZiAoIXRoaXMuUGVybWlzc2lvbi5oYXMoKSkge1xuICAgICAgcHJvbWlzZUNhbGxiYWNrID0gKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLlBlcm1pc3Npb24ucmVxdWVzdCgoKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUNhbGxiYWNrKHRpdGxlLCBvcHRpb25zLCByZXNvbHZlKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KE1lc3NhZ2VzLmVycm9ycy5wZXJtaXNzaW9uX2RlbmllZCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZUNhbGxiYWNrID0gKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuX2NyZWF0ZUNhbGxiYWNrKHRpdGxlLCBvcHRpb25zLCByZXNvbHZlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocHJvbWlzZUNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBub3RpZmljYXRpb24gY291bnRcbiAgICogQHJldHVybiB7SW50ZWdlcn0gVGhlIG5vdGlmaWNhdGlvbiBjb3VudFxuICAgKi9cbiAgY291bnQoKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBsZXQga2V5O1xuXG4gICAgZm9yIChrZXkgaW4gdGhpcy5fbm90aWZpY2F0aW9ucylcbiAgICAgIGlmICh0aGlzLl9ub3RpZmljYXRpb25zLmhhc093blByb3BlcnR5KGtleSkpIGNvdW50Kys7XG5cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIGEgbm90aWZpY2F0aW9uIHdpdGggdGhlIGdpdmVuIHRhZ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gdGFnIC0gVGFnIG9mIHRoZSBub3RpZmljYXRpb24gdG8gY2xvc2VcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gYm9vbGVhbiBkZW5vdGluZyBzdWNjZXNzXG4gICAqL1xuICBjbG9zZSh0YWcpIHtcbiAgICBsZXQga2V5LCBub3RpZmljYXRpb247XG5cbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ub3RpZmljYXRpb25zKSB7XG4gICAgICBpZiAodGhpcy5fbm90aWZpY2F0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbiA9IHRoaXMuX25vdGlmaWNhdGlvbnNba2V5XTtcblxuICAgICAgICAvKiBSdW4gb25seSBpZiB0aGUgdGFncyBtYXRjaCAqL1xuICAgICAgICBpZiAobm90aWZpY2F0aW9uLnRhZyA9PT0gdGFnKSB7XG5cbiAgICAgICAgICAvKiBDYWxsIHRoZSBub3RpZmljYXRpb24ncyBjbG9zZSgpIG1ldGhvZCAqL1xuICAgICAgICAgIHJldHVybiB0aGlzLl9jbG9zZU5vdGlmaWNhdGlvbihrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgbm90aWZpY2F0aW9uc1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSBib29sZWFuIGRlbm90aW5nIHdoZXRoZXIgdGhlIGNsZWFyIHdhcyBzdWNjZXNzZnVsIGluIGNsb3NpbmcgYWxsIG5vdGlmaWNhdGlvbnNcbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGxldCBrZXksIHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgZm9yIChrZXkgaW4gdGhpcy5fbm90aWZpY2F0aW9ucylcbiAgICAgIGlmICh0aGlzLl9ub3RpZmljYXRpb25zLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIHN1Y2Nlc3MgPSBzdWNjZXNzICYmIHRoaXMuX2Nsb3NlTm90aWZpY2F0aW9uKGtleSk7XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZW5vdGVzIHdoZXRoZXIgUHVzaCBpcyBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgYnJvd3NlclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN1cHBvcnRlZCgpIHtcbiAgICBsZXQgc3VwcG9ydGVkID0gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBhZ2VudCBpbiB0aGlzLl9hZ2VudHMpXG4gICAgICBpZiAodGhpcy5fYWdlbnRzLmhhc093blByb3BlcnR5KGFnZW50KSlcbiAgICAgICAgc3VwcG9ydGVkID0gc3VwcG9ydGVkIHx8IHRoaXMuX2FnZW50c1thZ2VudF0uaXNTdXBwb3J0ZWQoKVxuXG4gICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb2RpZmllcyBzZXR0aW5ncyBvciByZXR1cm5zIGFsbCBzZXR0aW5ncyBpZiBubyBwYXJhbWV0ZXIgcGFzc2VkXG4gICAqIEBwYXJhbSBzZXR0aW5nc1xuICAgKi9cbiAgY29uZmlnKHNldHRpbmdzKSB7XG4gICAgaWYgKHR5cGVvZiBzZXR0aW5ncyAhPT0gJ3VuZGVmaW5lZCcgfHwgc2V0dGluZ3MgIT09IG51bGwgJiYgVXRpbC5pc09iamVjdChzZXR0aW5ncykpXG4gICAgICBVdGlsLm9iamVjdE1lcmdlKHRoaXMuX2NvbmZpZ3VyYXRpb24sIHNldHRpbmdzKTtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlndXJhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3BpZXMgdGhlIGZ1bmN0aW9ucyBmcm9tIGEgcGx1Z2luIHRvIHRoZSBtYWluIGxpYnJhcnlcbiAgICogQHBhcmFtIHBsdWdpblxuICAgKi9cbiAgZXh0ZW5kKG1hbmlmZXN0KSB7XG4gICAgdmFyIHBsdWdpbiwgUGx1Z2luLFxuICAgICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gICAgaWYgKCFoYXNQcm9wLmNhbGwobWFuaWZlc3QsICdwbHVnaW4nKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKE1lc3NhZ2VzLmVycm9ycy5pbnZhbGlkX3BsdWdpbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXNQcm9wLmNhbGwobWFuaWZlc3QsICdjb25maWcnKSAmJiBVdGlsLmlzT2JqZWN0KG1hbmlmZXN0LmNvbmZpZykgJiYgbWFuaWZlc3QuY29uZmlnICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuY29uZmlnKG1hbmlmZXN0LmNvbmZpZyk7XG4gICAgICB9XG5cbiAgICAgIFBsdWdpbiA9IG1hbmlmZXN0LnBsdWdpbjtcbiAgICAgIHBsdWdpbiA9IG5ldyBQbHVnaW4odGhpcy5jb25maWcoKSlcblxuICAgICAgZm9yICh2YXIgbWVtYmVyIGluIHBsdWdpbikge1xuICAgICAgICBpZiAoaGFzUHJvcC5jYWxsKHBsdWdpbiwgbWVtYmVyKSAmJiBVdGlsLmlzRnVuY3Rpb24ocGx1Z2luW21lbWJlcl0pKVxuICAgICAgICAgIHRoaXNbbWVtYmVyXSA9IHBsdWdpblttZW1iZXJdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbCB7XG4gIHN0YXRpYyBpc1VuZGVmaW5lZChvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBzdGF0aWMgaXNTdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xuICB9XG5cbiAgc3RhdGljIGlzRnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiB7fS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gIH1cblxuICBzdGF0aWMgaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG4gIH1cblxuICBzdGF0aWMgb2JqZWN0TWVyZ2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAodGFyZ2V0Lmhhc093blByb3BlcnR5KGtleSkgJiYgdGhpcy5pc09iamVjdCh0YXJnZXRba2V5XSkgJiYgdGhpcy5pc09iamVjdChzb3VyY2Vba2V5XSkpIHtcbiAgICAgICAgdGhpcy5vYmplY3RNZXJnZSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJzdHJhY3RBZ2VudCB7XG4gIGNvbnN0cnVjdG9yKHdpbikge1xuICAgIHRoaXMuX3dpbiA9IHdpbjtcbiAgfVxufVxuIiwiaW1wb3J0IEFic3RyYWN0QWdlbnQgZnJvbSAnLi9BYnN0cmFjdEFnZW50JztcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWwnO1xuXG4vKipcbiAqIE5vdGlmaWNhdGlvbiBhZ2VudCBmb3IgbW9kZXJuIGRlc2t0b3AgYnJvd3NlcnM6XG4gKiBTYWZhcmkgNissIEZpcmVmb3ggMjIrLCBDaHJvbWUgMjIrLCBPcGVyYSAyNStcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVza3RvcEFnZW50IGV4dGVuZHMgQWJzdHJhY3RBZ2VudCB7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGRlbm90aW5nIHN1cHBvcnRcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGJvb2xlYW4gZGVub3Rpbmcgd2hldGhlciB3ZWJraXQgbm90aWZpY2F0aW9ucyBhcmUgc3VwcG9ydGVkXG4gICAqL1xuICBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fd2luLk5vdGlmaWNhdGlvbiAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB0aXRsZSAtIG5vdGlmaWNhdGlvbiB0aXRsZVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIG5vdGlmaWNhdGlvbiBvcHRpb25zIGFycmF5XG4gICAqIEByZXR1cm5zIHtOb3RpZmljYXRpb259XG4gICAqL1xuICBjcmVhdGUodGl0bGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuX3dpbi5Ob3RpZmljYXRpb24oXG4gICAgICB0aXRsZSxcbiAgICAgIHtcbiAgICAgICAgaWNvbjogKFV0aWwuaXNTdHJpbmcob3B0aW9ucy5pY29uKSB8fCBVdGlsLmlzVW5kZWZpbmVkKG9wdGlvbnMuaWNvbikpID8gb3B0aW9ucy5pY29uIDogb3B0aW9ucy5pY29uLngzMixcbiAgICAgICAgYm9keTogb3B0aW9ucy5ib2R5LFxuICAgICAgICB0YWc6IG9wdGlvbnMudGFnLFxuICAgICAgICByZXF1aXJlSW50ZXJhY3Rpb246IG9wdGlvbnMucmVxdWlyZUludGVyYWN0aW9uXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSBhIGdpdmVuIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0gbm90aWZpY2F0aW9uIC0gbm90aWZpY2F0aW9uIHRvIGNsb3NlXG4gICAqL1xuICBjbG9zZShub3RpZmljYXRpb24pIHtcbiAgICBub3RpZmljYXRpb24uY2xvc2UoKTtcbiAgfVxufVxuIiwiaW1wb3J0IEFic3RyYWN0QWdlbnQgZnJvbSAnLi9BYnN0cmFjdEFnZW50JztcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWwnO1xuXG4vKipcbiAqIE5vdGlmaWNhdGlvbiBhZ2VudCBmb3IgSUU5XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1TQWdlbnQgZXh0ZW5kcyBBYnN0cmFjdEFnZW50IHtcblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gZGVub3Rpbmcgc3VwcG9ydFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYm9vbGVhbiBkZW5vdGluZyB3aGV0aGVyIHdlYmtpdCBub3RpZmljYXRpb25zIGFyZSBzdXBwb3J0ZWRcbiAgICovXG4gIGlzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiAodGhpcy5fd2luLmV4dGVybmFsICE9PSB1bmRlZmluZWQpICYmICh0aGlzLl93aW4uZXh0ZXJuYWwubXNJc1NpdGVNb2RlICE9PSB1bmRlZmluZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB0aXRsZSAtIG5vdGlmaWNhdGlvbiB0aXRsZVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIG5vdGlmaWNhdGlvbiBvcHRpb25zIGFycmF5XG4gICAqIEByZXR1cm5zIHtOb3RpZmljYXRpb259XG4gICAqL1xuICBjcmVhdGUodGl0bGUsIG9wdGlvbnMpIHtcbiAgICAvKiBDbGVhciBhbnkgcHJldmlvdXMgbm90aWZpY2F0aW9ucyAqL1xuICAgIHRoaXMuX3dpbi5leHRlcm5hbC5tc1NpdGVNb2RlQ2xlYXJJY29uT3ZlcmxheSgpO1xuXG4gICAgdGhpcy5fd2luLmV4dGVybmFsLm1zU2l0ZU1vZGVTZXRJY29uT3ZlcmxheShcbiAgICAgICgoVXRpbC5pc1N0cmluZyhvcHRpb25zLmljb24pIHx8IFV0aWwuaXNVbmRlZmluZWQob3B0aW9ucy5pY29uKSlcbiAgICAgICAgPyBvcHRpb25zLmljb25cbiAgICAgICAgOiBvcHRpb25zLmljb24ueDE2KSwgdGl0bGVcbiAgICApO1xuXG4gICAgdGhpcy5fd2luLmV4dGVybmFsLm1zU2l0ZU1vZGVBY3RpdmF0ZSgpO1xuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgYSBnaXZlbiBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIG5vdGlmaWNhdGlvbiAtIG5vdGlmaWNhdGlvbiB0byBjbG9zZVxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fd2luLmV4dGVybmFsLm1zU2l0ZU1vZGVDbGVhckljb25PdmVybGF5KClcbiAgfVxufVxuIiwiaW1wb3J0IEFic3RyYWN0QWdlbnQgZnJvbSAnLi9BYnN0cmFjdEFnZW50JztcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IE1lc3NhZ2VzIGZyb20gJy4uL01lc3NhZ2VzJztcblxuLyoqXG4gKiBOb3RpZmljYXRpb24gYWdlbnQgZm9yIG1vZGVybiBkZXNrdG9wIGJyb3dzZXJzOlxuICogU2FmYXJpIDYrLCBGaXJlZm94IDIyKywgQ2hyb21lIDIyKywgT3BlcmEgMjUrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vYmlsZUNocm9tZUFnZW50IGV4dGVuZHMgQWJzdHJhY3RBZ2VudCB7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGRlbm90aW5nIHN1cHBvcnRcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGJvb2xlYW4gZGVub3Rpbmcgd2hldGhlciB3ZWJraXQgbm90aWZpY2F0aW9ucyBhcmUgc3VwcG9ydGVkXG4gICAqL1xuICBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fd2luLm5hdmlnYXRvciAhPT0gdW5kZWZpbmVkICYmXG4gICAgICB0aGlzLl93aW4ubmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmdW5jdGlvbiBib2R5IGFzIGEgc3RyaW5nXG4gICAqIEBwYXJhbSBmdW5jXG4gICAqL1xuICBnZXRGdW5jdGlvbkJvZHkoZnVuYykge1xuICAgIHJldHVybiBmdW5jLnRvU3RyaW5nKCkubWF0Y2goL2Z1bmN0aW9uW157XStcXHsoW1xcc1xcU10qKVxcfSQvKVsxXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0gdGl0bGUgLSBub3RpZmljYXRpb24gdGl0bGVcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBub3RpZmljYXRpb24gb3B0aW9ucyBhcnJheVxuICAgKiBAcmV0dXJucyB7Tm90aWZpY2F0aW9ufVxuICAgKi9cbiAgY3JlYXRlKGlkLCB0aXRsZSwgb3B0aW9ucywgbGFzdFdvcmtlclBhdGgsIGNhbGxiYWNrKSB7XG4gICAgLyogUmVnaXN0ZXIgU2VydmljZVdvcmtlciB1c2luZyBsYXN0V29ya2VyUGF0aCAqL1xuICAgIHRoaXMuX3dpbi5uYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcihsYXN0V29ya2VyUGF0aCk7XG5cbiAgICB0aGlzLl93aW4ubmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVhZHkudGhlbihyZWdpc3RyYXRpb24gPT4ge1xuICAgICAgLyogTG9jYWwgZGF0YSB0aGUgc2VydmljZSB3b3JrZXIgd2lsbCB1c2UgKi9cbiAgICAgIGxldCBsb2NhbERhdGEgPSB7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgbGluazogb3B0aW9ucy5saW5rLFxuICAgICAgICBvcmlnaW46IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgIG9uQ2xpY2s6IChVdGlsLmlzRnVuY3Rpb24ob3B0aW9ucy5vbkNsaWNrKSkgPyB0aGlzLmdldEZ1bmN0aW9uQm9keShvcHRpb25zLm9uQ2xpY2spIDogJycsXG4gICAgICAgIG9uQ2xvc2U6IChVdGlsLmlzRnVuY3Rpb24ob3B0aW9ucy5vbkNsb3NlKSkgPyB0aGlzLmdldEZ1bmN0aW9uQm9keShvcHRpb25zLm9uQ2xvc2UpIDogJydcbiAgICAgIH07XG5cbiAgICAgIC8qIE1lcmdlIHRoZSBsb2NhbCBkYXRhIHdpdGggdXNlci1wcm92aWRlZCBkYXRhICovXG4gICAgICBpZiAob3B0aW9ucy5kYXRhICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5kYXRhICE9PSBudWxsKVxuICAgICAgICBsb2NhbERhdGEgPSBPYmplY3QuYXNzaWduKGxvY2FsRGF0YSwgb3B0aW9ucy5kYXRhKTtcblxuICAgICAgLyogU2hvdyB0aGUgbm90aWZpY2F0aW9uICovXG4gICAgICByZWdpc3RyYXRpb24uc2hvd05vdGlmaWNhdGlvbihcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHtcbiAgICAgICAgICBpY29uOiBvcHRpb25zLmljb24sXG4gICAgICAgICAgYm9keTogb3B0aW9ucy5ib2R5LFxuICAgICAgICAgIHZpYnJhdGU6IG9wdGlvbnMudmlicmF0ZSxcbiAgICAgICAgICB0YWc6IG9wdGlvbnMudGFnLFxuICAgICAgICAgIGRhdGE6IGxvY2FsRGF0YSxcbiAgICAgICAgICByZXF1aXJlSW50ZXJhY3Rpb246IG9wdGlvbnMucmVxdWlyZUludGVyYWN0aW9uLFxuICAgICAgICAgIHNpbGVudDogb3B0aW9ucy5zaWxlbnRcbiAgICAgICAgfVxuICAgICAgKS50aGVuKCgpID0+IHtcbiAgICAgICAgcmVnaXN0cmF0aW9uLmdldE5vdGlmaWNhdGlvbnMoKS50aGVuKG5vdGlmaWNhdGlvbnMgPT4ge1xuICAgICAgICAgIC8qIFNlbmQgYW4gZW1wdHkgbWVzc2FnZSBzbyB0aGUgU2VydmljZVdvcmtlciBrbm93cyB3aG8gdGhlIGNsaWVudCBpcyAqL1xuICAgICAgICAgIHJlZ2lzdHJhdGlvbi5hY3RpdmUucG9zdE1lc3NhZ2UoJycpO1xuXG4gICAgICAgICAgLyogVHJpZ2dlciBjYWxsYmFjayAqL1xuICAgICAgICAgIGNhbGxiYWNrKG5vdGlmaWNhdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihNZXNzYWdlcy5lcnJvcnMuc3dfbm90aWZpY2F0aW9uX2Vycm9yICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKE1lc3NhZ2VzLmVycm9ycy5zd19yZWdpc3RyYXRpb25fZXJyb3IgKyBlcnJvci5tZXNzYWdlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSBhbGwgbm90aWZpY2F0aW9uXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICB0aGlzLl93aW4uZXh0ZXJuYWwubXNTaXRlTW9kZUNsZWFySWNvbk92ZXJsYXkoKVxuICB9XG59XG4iLCJpbXBvcnQgQWJzdHJhY3RBZ2VudCBmcm9tICcuL0Fic3RyYWN0QWdlbnQnO1xuXG4vKipcbiAqIE5vdGlmaWNhdGlvbiBhZ2VudCBmb3IgbW9kZXJuIGRlc2t0b3AgYnJvd3NlcnM6XG4gKiBTYWZhcmkgNissIEZpcmVmb3ggMjIrLCBDaHJvbWUgMjIrLCBPcGVyYSAyNStcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9iaWxlRmlyZWZveEFnZW50IGV4dGVuZHMgQWJzdHJhY3RBZ2VudCB7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGRlbm90aW5nIHN1cHBvcnRcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGJvb2xlYW4gZGVub3Rpbmcgd2hldGhlciB3ZWJraXQgbm90aWZpY2F0aW9ucyBhcmUgc3VwcG9ydGVkXG4gICAqL1xuICBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fd2luLm5hdmlnYXRvci5tb3pOb3RpZmljYXRpb24gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0gdGl0bGUgLSBub3RpZmljYXRpb24gdGl0bGVcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBub3RpZmljYXRpb24gb3B0aW9ucyBhcnJheVxuICAgKiBAcmV0dXJucyB7Tm90aWZpY2F0aW9ufVxuICAgKi9cbiAgY3JlYXRlKHRpdGxlLCBvcHRpb25zKSB7XG4gICAgbGV0IG5vdGlmaWNhdGlvbiA9IHRoaXMuX3dpbi5uYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uLmNyZWF0ZU5vdGlmaWNhdGlvbihcbiAgICAgIHRpdGxlLFxuICAgICAgb3B0aW9ucy5ib2R5LFxuICAgICAgb3B0aW9ucy5pY29uXG4gICAgKTtcblxuICAgIG5vdGlmaWNhdGlvbi5zaG93KCk7XG5cbiAgICByZXR1cm4gbm90aWZpY2F0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQgQWJzdHJhY3RBZ2VudCBmcm9tICcuL0Fic3RyYWN0QWdlbnQnO1xuXG4vKipcbiAqIE5vdGlmaWNhdGlvbiBhZ2VudCBmb3Igb2xkIENocm9tZSB2ZXJzaW9ucyAoYW5kIHNvbWUpIEZpcmVmb3hcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViS2l0QWdlbnQgZXh0ZW5kcyBBYnN0cmFjdEFnZW50IHtcblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gZGVub3Rpbmcgc3VwcG9ydFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYm9vbGVhbiBkZW5vdGluZyB3aGV0aGVyIHdlYmtpdCBub3RpZmljYXRpb25zIGFyZSBzdXBwb3J0ZWRcbiAgICovXG4gIGlzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiB0aGlzLl93aW4ud2Via2l0Tm90aWZpY2F0aW9ucyAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB0aXRsZSAtIG5vdGlmaWNhdGlvbiB0aXRsZVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIG5vdGlmaWNhdGlvbiBvcHRpb25zIGFycmF5XG4gICAqIEByZXR1cm5zIHtOb3RpZmljYXRpb259XG4gICAqL1xuICBjcmVhdGUodGl0bGUsIG9wdGlvbnMpIHtcbiAgICBsZXQgbm90aWZpY2F0aW9uID0gdGhpcy5fd2luLndlYmtpdE5vdGlmaWNhdGlvbnMuY3JlYXRlTm90aWZpY2F0aW9uKFxuICAgICAgb3B0aW9ucy5pY29uLFxuICAgICAgdGl0bGUsXG4gICAgICBvcHRpb25zLmJvZHlcbiAgICApO1xuXG4gICAgbm90aWZpY2F0aW9uLnNob3coKTtcblxuICAgIHJldHVybiBub3RpZmljYXRpb247XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgYSBnaXZlbiBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIG5vdGlmaWNhdGlvbiAtIG5vdGlmaWNhdGlvbiB0byBjbG9zZVxuICAgKi9cbiAgY2xvc2Uobm90aWZpY2F0aW9uKSB7XG4gICAgbm90aWZpY2F0aW9uLmNhbmNlbCgpO1xuICB9XG59XG4iLCJpbXBvcnQgUHVzaCBmcm9tICcuL2NsYXNzZXMvUHVzaCc7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFB1c2godHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzKTtcbiJdfQ==
